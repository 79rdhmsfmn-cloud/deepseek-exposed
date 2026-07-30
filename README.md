# ⚽ SWSL U15 Boys Hub

Live standings, schedules, and results for the **South West Soccer League U15 Boys Division 1** in New Brunswick, Canada.

**🔗 Live Site:** [https://79rdhmsfmn-cloud.github.io/deepseek-exposed/](https://79rdhmsfmn-cloud.github.io/deepseek-exposed/)

## Features

- 📊 **Live Standings** — Updated automatically from Soccer NB
- 📅 **Full Schedule** — All games with dates, times, and Google Maps links
- ✅ **Recent Results** — Scores with W/L/D indicators
- 🎨 **Team Color Selector** — Pick your team and the whole site changes to their colors
- 📱 **Mobile-First** — Works on phones, tablets, and desktop
- 🌙 **Dark Mode** — Clean, modern ESPN-style design

## Teams

| Team | Color |
|------|-------|
| Western Valley | 🔴 Red |
| FDSA | 🔵 Blue |
| Charlotte Saints | ⚫ Black |
| Fundy Mustangs | 🟠 Orange |
| OASA | 🟢 Green |
| Hampton | ⚪ Grey |

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla — no frameworks)
- **Hosting:** GitHub Pages (free)
- **Data:** Scraped from [competitions.soccernb.org](https://competitions.soccernb.org)

## Data Updates

Standings and schedules are scraped from Soccer NB's competition portal. To update manually, run:

```bash
python3 scraper.py
```

Or it runs automatically via GitHub Actions every 6 hours.

## Built By

**High Tide Studios** — [cloudiai.site](https://cloudiai.site)

A project by Jaxon from Nackawic, New Brunswick 🇨🇦
