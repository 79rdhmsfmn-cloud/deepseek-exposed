/* ========================================
   SWSL U15 Boys — App Logic
   
   HOW TO EDIT THIS FILE:
   - Team names/colors: edit the TEAMS object below
   - Standings table data: edit the STANDINGS array
   - Schedule/games: edit the SCHEDULE array
   - See comments marked with [EDIT] for what to change
   ======================================== */

// ═══════════════════════════════════════════
// TEAM CONFIGURATION [EDIT]
// Change team names, abbreviations, and colors here.
// The "key" must match the <option value> in the HTML dropdowns.
// The "abbr" is the 2-letter code shown on the team crest badge.
// The "color" is a hex code that changes the entire site theme.
// ═══════════════════════════════════════════

const TEAMS = {
  'western-valley': {
    name: 'Western Valley U15 Boys',        // [EDIT] Full name (shown under short name)
    short: 'Western Valley',                 // [EDIT] Short name (shown in table)
    abbr: 'WV',                              // [EDIT] 2-letter crest code
    color: '#E63946'                         // [EDIT] Theme color (hex)
  },
  'fdsa': {
    name: 'FDSA U15 Division 1',
    short: 'FDSA',
    abbr: 'FD',
    color: '#FFD600'
  },
  'charlotte': {
    name: 'Charlotte United Saints',
    short: 'Charlotte Saints',
    abbr: 'CS',
    color: '#1A1A1A'
  },
  'fundy': {
    name: 'Fundy Downey Ford Mustangs',      // [EDIT] This is the long name — shows as "Fundy Mustangs" short
    short: 'Fundy Mustangs',
    abbr: 'FM',
    color: '#1565C0'
  },
  'oasa': {
    name: 'OASA U15 Boys Division 1',
    short: 'OASA',
    abbr: 'OA',
    color: '#FFC107'
  },
  'hampton': {
    name: 'Hampton U15AA Boys',
    short: 'Hampton',
    abbr: 'HA',
    color: '#9E9E9E'
  },
};

// ═══════════════════════════════════════════
// STANDINGS TABLE [EDIT]
// To update the table, edit each row in this array.
//
// Columns:
//   team  = team name (must match TEAMS key's name)
//   key   = must match a key in the TEAMS object above
//   g     = games played
//   w     = wins (3 pts each)
//   t     = draws/ties (1 pt each)
//   l     = losses (0 pts)
//   gf    = goals for (total goals scored)
//   ga    = goals against (total goals conceded)
//   gd    = goal difference (gf minus ga)
//   pts   = points (w*3 + t*1) — UPDATE THIS when you change w/t
//
// Order matters! First team = 1st place. Sort by PTS descending.
// ═══════════════════════════════════════════

const STANDINGS = [
  { team: 'FDSA U15 Division 1 Boys',        key: 'fdsa',          g: 9, w: 9, t: 0, l: 0, gf: 62, ga: 4,  gd: 58,  pts: 27 },
  { team: 'Charlotte United Saints',          key: 'charlotte',     g: 8, w: 7, t: 0, l: 1, gf: 50, ga: 7,  gd: 43,  pts: 21 },
  { team: 'Fundy Downey Ford Mustangs',       key: 'fundy',         g: 9, w: 3, t: 1, l: 5, gf: 19, ga: 45, gd: -26, pts: 10 },
  { team: 'Western Valley U15 Boys',          key: 'western-valley', g: 8, w: 3, t: 0, l: 5, gf: 18, ga: 45, gd: -27, pts: 9  },
  { team: 'OASA U15 Boys Division 1',         key: 'oasa',          g: 8, w: 2, t: 1, l: 5, gf: 30, ga: 33, gd: -3,  pts: 7  },
  { team: 'Hampton U15AA Boys',               key: 'hampton',       g: 8, w: 0, t: 0, l: 8, gf: 5,  ga: 50, gd: -45, pts: 0  },
];

// ═══════════════════════════════════════════
// SCHEDULE [EDIT]
// Add or remove games here. Used on the home page and schedule page.
//
// Columns:
//   date    = game date in YYYY-MM-DD format
//   home    = home team name (display text)
//   homeKey = must match a key in the TEAMS object above
//   away    = away team name (display text)
//   awayKey = must match a key in the TEAMS object above
//   time    = kickoff time
// ═══════════════════════════════════════════

const SCHEDULE = [
  { date: '2026-08-04', home: 'OASA',             homeKey: 'oasa',            away: 'Hampton',         awayKey: 'hampton',         time: '6:30 PM' },
  { date: '2026-08-04', home: 'FDSA',             homeKey: 'fdsa',            away: 'Charlotte Saints',awayKey: 'charlotte',       time: '7:00 PM' },
  { date: '2026-08-04', home: 'Fundy Mustangs',   homeKey: 'fundy',           away: 'Western Valley',  awayKey: 'western-valley',  time: '7:00 PM' },
  { date: '2026-08-06', home: 'Hampton',          homeKey: 'hampton',         away: 'Western Valley',  awayKey: 'western-valley',  time: '7:15 PM' },
];

// ═══════════════════════════════════════════
// EDITING GUIDE — Quick Reference
//
// TO ADD A NEW TEAM:
//   1. Add an entry to the TEAMS object (copy an existing one)
//   2. Add a matching <option value="new-key">New Team</option>
//      to every <select id="team-select"> in all 3 HTML files
//
// TO UPDATE STANDINGS AFTER A GAME:
//   1. Edit the relevant row in STANDINGS array
//   2. Update g (games played), w/t/l, gf, ga, gd, pts
//   3. PTS formula: (wins × 3) + (draws × 1)
//   4. GD = gf - ga
//   5. Reorder the array so 1st place is first
//
// TO ADD A NEW GAME TO SCHEDULE:
//   1. Add a new object to the SCHEDULE array
//   2. Use YYYY-MM-DD for the date
//   3. Make sure homeKey/awayKey match a TEAMS key
//
// TO REMOVE A TEAM:
//   1. Delete from TEAMS object
//   2. Delete from STANDINGS array
//   3. Delete matching <option> from all HTML selects
//
// TO CHANGE THE TEAM SELECTOR COLOR:
//   Edit the "color" field in TEAMS (hex code like '#E63946')
// ═══════════════════════════════════════════

// ── Helpers ──────────────────────────────

function getTeam(key) {
  return TEAMS[key] || { name: key, short: key, abbr: key.slice(0, 2).toUpperCase(), color: '#64748b' };
}

function getSelectedTeam() {
  return localStorage.getItem('swsl-team') || 'western-valley';
}

function setSelectedTeam(key) {
  localStorage.setItem('swsl-team', key);
  applyTeamTheme(key);
}

function applyTeamTheme(key) {
  const team = getTeam(key);
  const root = document.documentElement;
  root.style.setProperty('--accent', team.color);
  const hex = team.color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  const sel = document.getElementById('team-select');
  if (sel) sel.value = key;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateLong(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// ── Render Standings ─────────────────────

function renderStandings() {
  const tbody = document.getElementById('standings-body');
  if (!tbody) return;

  const yourTeam = getSelectedTeam();
  tbody.innerHTML = STANDINGS.map((row, i) => {
    const isYourTeam = row.key === yourTeam;
    const t = getTeam(row.key);
    const gdStr = row.gd > 0 ? `+${row.gd}` : `${row.gd}`;

    return `
      <tr class="${isYourTeam ? 'your-team' : ''}">
        <td>${i + 1}</td>
        <td>
          <div class="team-cell">
            <div class="team-crest" style="--team-color:${t.color}"><span>${t.abbr}</span></div>
            <div class="team-info">
              <span class="team-name-primary">${t.short}</span>
              <span class="team-name-full">${t.name}</span>
            </div>
          </div>
        </td>
        <td>${row.g}</td>
        <td>${row.w}</td>
        <td>${row.t}</td>
        <td>${row.l}</td>
        <td>${row.gf}</td>
        <td>${row.ga}</td>
        <td>${gdStr}</td>
        <td class="pts">${row.pts}</td>
      </tr>
    `;
  }).join('');
}

// ── Render Home Schedule ─────────────────

function renderHomeSchedule() {
  const container = document.getElementById('home-schedule');
  if (!container) return;

  const yourTeam = getSelectedTeam();
  container.innerHTML = SCHEDULE.map(g => {
    const isYourGame = g.homeKey === yourTeam || g.awayKey === yourTeam;
    return `
      <div class="schedule-item ${isYourGame ? 'your-game' : ''}">
        <span class="si-date">${formatDate(g.date)}</span>
        <span class="si-matchup">${g.home} vs ${g.away}</span>
        <span class="si-time">${g.time}</span>
      </div>
    `;
  }).join('');
}

// ── Render Standings Full Page ───────────

function renderStandingsFull() {
  renderStandings();
  const container = document.getElementById('full-schedule');
  if (!container) return;
  const grouped = {};
  SCHEDULE.forEach(g => {
    if (!grouped[g.date]) grouped[g.date] = [];
    grouped[g.date].push(g);
  });
  container.innerHTML = Object.entries(grouped).map(([date, games]) => `
    <div class="schedule-date-group">
      <div class="schedule-date-header">${formatDateLong(date)}</div>
      ${games.map(g => `
        <div class="schedule-item">
          <span class="si-matchup">${g.home} vs ${g.away}</span>
          <span class="si-time">${g.time}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ── Init ─────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('team-select');
  if (sel) {
    sel.value = getSelectedTeam();
    sel.addEventListener('change', (e) => {
      setSelectedTeam(e.target.value);
      renderStandings();
      renderHomeSchedule();
      renderStandingsFull();
    });
  }
  applyTeamTheme(getSelectedTeam());
  renderStandings();
  renderHomeSchedule();
  renderStandingsFull();
});
