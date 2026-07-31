# ⚽ League Hub — Standings & Schedule Template

**A clean, modern sports league website template.**

Dark mode, team color selector, responsive — drop in your teams and go.

## 🎨 Features

- **Dark mode** — clean navy/dark design with glassmorphism
- **Team color selector** — pick your team, entire site theme changes
- **Standings table** — sortable, highlighted "your team" row
- **Schedule view** — grouped by date, your games highlighted
- **Mobile-first** — looks great on phones (parents love this)
- **Zero dependencies** — pure HTML/CSS/JS, no build step

## 🚀 Quick Start

1. Edit `app.js` — update `TEAMS`, `STANDINGS`, and `SCHEDULE`
2. Update `<option>` tags in all 3 HTML files to match your teams
3. Open `index.html` in a browser — done!

## 📁 Files

```
├── index.html      ← Home (standings preview + next match + schedule)
├── standings.html  ← Full standings table + legend
├── schedule.html   ← Full schedule grouped by date
├── app.js          ← All data + rendering logic (EDIT THIS)
├── style.css       ← All styling (usually don't need to touch)
├── scraper.py      ← Optional: auto-scrape standings from a website
└── data/           ← Optional: scraped JSON data
```

## ✏️ What to Edit

Everything you need to change is in **`app.js`**:

- `TEAMS` — team names, abbreviations, colors
- `STANDINGS` — table data (points, wins, losses, etc.)
- `SCHEDULE` — game dates, times, locations

Comments marked `[EDIT]` show exactly what to change.

## 🎨 Customization

- Change team colors in the `TEAMS` object (hex codes)
- Edit `style.css` to change fonts, layout, or the overall vibe
- The `--accent` CSS variable updates automatically when you pick a team

## 📱 Hosting

Free options:
- **GitHub Pages** — push to a repo, enable Pages in settings
- **Netlify** — drag and drop the folder
- **Vercel** — connect your repo

## 🛠️ Optional: Auto-Update Scraper

`scraper.py` can scrape standings from a public league website and output JSON. Run it with a cron job to keep your site updated automatically.

---

Built with ☁️ by High Tide Studios
