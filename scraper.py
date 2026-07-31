#!/usr/bin/env python3
"""
SWSL U15 Boys — Data Scraper
Scrapes standings and schedule from Soccer NB competitions portal.
Outputs JSON files for the website to consume.
"""

import json
import re
from datetime import datetime
from urllib.request import urlopen, Request


def fetch_page(url):
    """Fetch a page and return its HTML content."""
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=15) as resp:
        return resp.read().decode("utf-8", errors="replace")


def clean_cell(text):
    """Clean a table cell - remove HTML tags and extra whitespace."""
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def extract_rows(html):
    """Extract all rows and cells from HTML tables."""
    rows = []
    for row_match in re.finditer(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL):
        row_html = row_match.group(1)
        cells = []
        for cell_match in re.finditer(r'<t[hd][^>]*>(.*?)</t[hd]>', row_html, re.DOTALL):
            cells.append(clean_cell(cell_match.group(1)))
        if cells:
            rows.append(cells)
    return rows


def parse_standings(html):
    """Parse standings from HTML."""
    # Find the first table with class 'table hovered'
    table_match = re.search(r'<table[^>]*class="table hovered"[^>]*>(.*?)</table>', html, re.DOTALL)
    if not table_match:
        return []
    
    rows = extract_rows(table_match.group(1))
    standings = []
    
    for row in rows:
        # Skip header row
        if len(row) < 3 or row[0] == "TEAM":
            continue
        
        # Expected: TEAM, G, W, T, L, GF, GA, GD, SO, PTS
        if len(row) >= 10:
            team_name = re.sub(r'\(.*?\)', '', row[0]).strip()
            team_name = re.sub(r'^U15B SWSL\s+', '', team_name)
            
            try:
                standings.append({
                    "team": team_name,
                    "g": int(row[1]),
                    "w": int(row[2]),
                    "t": int(row[3]),
                    "l": int(row[4]),
                    "gf": int(row[5]),
                    "ga": int(row[6]),
                    "gd": int(row[7]),
                    "so": int(row[8]),
                    "pts": int(row[9]),
                })
            except (ValueError, IndexError):
                continue
    
    return standings


def parse_schedule(html):
    """Parse schedule from HTML."""
    table_match = re.search(r'<table[^>]*class="table hovered"[^>]*>(.*?)</table>', html, re.DOTALL)
    if not table_match:
        return []
    
    rows = extract_rows(table_match.group(1))
    schedule = []
    current_date = None
    
    for row in rows:
        # Check if this is a date header (single cell with colspan)
        if len(row) == 1:
            date_str = row[0]
            if re.match(r'(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)', date_str):
                try:
                    date_part = ", ".join(date_str.split(", ")[1:])
                    dt = datetime.strptime(date_part, "%B %d, %Y")
                    current_date = dt.strftime("%Y-%m-%d")
                except ValueError:
                    current_date = date_str
                continue
        
        # Game row
        if current_date and len(row) >= 4:
            home = row[0].strip()
            away = row[1].strip()
            time = row[2].strip()
            location = row[3].strip()
            notes = row[4].strip() if len(row) > 4 else ""
            
            # Extract map link if present
            map_link = ""
            map_match = re.search(r'\[MAP:(.*?)\]', location)
            if map_match:
                map_link = map_match.group(1)
                location = re.sub(r'\[MAP:.*?\]', '', location).strip()
            
            schedule.append({
                "date": current_date,
                "home": home,
                "away": away,
                "time": time,
                "location": location,
                "map": map_link,
                "notes": notes,
            })
    
    return schedule


def match_team_key(team_name):
    """Match a team name to our internal key."""
    name_lower = team_name.lower()
    
    if "western" in name_lower or "valley" in name_lower:
        return "western-valley"
    elif "fdsa" in name_lower:
        return "fdsa"
    elif "charlotte" in name_lower or "saint" in name_lower:
        return "charlotte"
    elif "fundy" in name_lower or "mustang" in name_lower:
        return "fundy"
    elif "oasa" in name_lower:
        return "oasa"
    elif "hampton" in name_lower:
        return "hampton"
    return "unknown"


def main():
    print("⚽ SWSL U15 Boys — Scraping data from Soccer NB...")
    
    base_url = "https://competitions.soccernb.org"
    
    # Fetch standings
    print("📊 Fetching standings...")
    try:
        standings_html = fetch_page(f"{base_url}/swsl-u15-boys-standings/")
        standings = parse_standings(standings_html)
        print(f"   Found {len(standings)} teams")
        
        # Add team keys
        for s in standings:
            s["key"] = match_team_key(s["team"])
        
    except Exception as e:
        print(f"   ❌ Error fetching standings: {e}")
        standings = []
    
    # Fetch schedule
    print("📅 Fetching schedule...")
    try:
        schedule_html = fetch_page(f"{base_url}/swsl-u15-boys-schedule/")
        schedule = parse_schedule(schedule_html)
        print(f"   Found {len(schedule)} games")
        
        # Add team keys
        for g in schedule:
            g["homeKey"] = match_team_key(g["home"])
            g["awayKey"] = match_team_key(g["away"])
        
    except Exception as e:
        print(f"   ❌ Error fetching schedule: {e}")
        schedule = []
    
    # Write JSON files
    output_dir = "data"
    
    with open(f"{output_dir}/standings.json", "w") as f:
        json.dump({
            "updated": datetime.now().isoformat(),
            "standings": standings,
        }, f, indent=2)
    print(f"✅ Wrote {output_dir}/standings.json")
    
    with open(f"{output_dir}/schedule.json", "w") as f:
        json.dump({
            "updated": datetime.now().isoformat(),
            "schedule": schedule,
        }, f, indent=2)
    print(f"✅ Wrote {output_dir}/schedule.json")
    
    # Summary
    print("\n📋 Standings:")
    for i, s in enumerate(standings):
        print(f"   {i+1}. {s['team']}: {s['pts']} pts ({s['w']}W {s['t']}T {s['l']}L)")
    
    print(f"\n🎮 Remaining games:")
    for g in schedule:
        print(f"   {g['date']}: {g['home']} vs {g['away']} @ {g['time']}")
    
    print("\n⚽ Done! Data ready for the website.")


if __name__ == "__main__":
    main()
