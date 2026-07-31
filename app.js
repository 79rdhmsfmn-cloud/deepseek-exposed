/* ================================================
   LEAGUE HUB — Template App Logic
   
   HOW TO USE THIS TEMPLATE:
   ─────────────────────────
   1. Edit the TEAMS object below with your team names/colors
   2. Edit the STANDINGS array with your table data
   3. Edit the SCHEDULE array with your game dates
   4. Update the <option> tags in all 3 HTML files to match your teams
   
   Everything else works automatically!
   ================================================ */

// ═══════════════════════════════════════════
// TEAM CONFIGURATION [EDIT]
// Change team names, abbreviations, and colors here.
// The "key" must match the <option value> in the HTML dropdowns.
// The "abbr" is the 2-letter code shown on the team crest badge.
// The "color" is a hex code that changes the entire site theme.
// ═══════════════════════════════════════════

const TEAMS = {
  'team-alpha': {
    name: 'Team Alpha FC',               // Full name (shown under short name)
    short: 'Alpha',                       // Short name (shown in table)
    abbr: 'AL',                           // 2-letter crest code
    color: '#E63946'                      // Theme color (hex)
  },
  'team-bravo': {
    name: 'Team Bravo United',
    short: 'Bravo',
    abbr: 'BR',
    color: '#1565C0'
  },
  'team-charlie': {
    name: 'Team Charlie City',
    short: 'Charlie',
    abbr: 'CH',
    color: '#FFD600'
  },
  'team-delta': {
    name: 'Team Delta Athletic',
    short: 'Delta',
    abbr: 'DL',
    color: '#2D6A4F'
  },
  'team-echo': {
    name: 'Team Echo Rangers',
    short: 'Echo',
    abbr: 'EC',
    color: '#9E9E9E'
  },
};

// ═══════════════════════════════════════════
// STANDINGS TABLE [EDIT]
// Edit each row with your actual data.
//
// MATH GUIDE:
//   g  = Games Played (should equal W + D + L)
//   w  = Wins    (each win = 3 pts)
//   d  = Draws   (each draw = 1 pt)
//   l  = Losses  (0 pts)
//   gf = Goals For (total goals scored)
//   ga = Goals Against (total goals conceded)
//   gd = Goal Difference (gf - ga, can be + or -)
//   pts = Points ((w × 3) + (d × 1))
//
// Sort the array: 1st place = first entry, descending by pts.
// ═══════════════════════════════════════════

const STANDINGS = [
  { team: 'Team Alpha FC',       key: 'team-alpha',    g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0,  pts: 0 },
  { team: 'Team Bravo United',   key: 'team-bravo',    g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0,  pts: 0 },
  { team: 'Team Charlie City',   key: 'team-charlie',  g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0,  pts: 0 },
  { team: 'Team Delta Athletic', key: 'team-delta',    g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0,  pts: 0 },
  { team: 'Team Echo Rangers',   key: 'team-echo',     g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0,  pts: 0 },
];

// ═══════════════════════════════════════════
// SCHEDULE [EDIT]
// Add your games here. Used on home page and schedule page.
//
//   date    = YYYY-MM-DD format
//   home    = Home team name (display text)
//   homeKey = Must match a key in TEAMS above
//   away    = Away team name (display text)
//   awayKey = Must match a key in TEAMS above
//   time    = Kickoff time (display text)
//   location = Venue name (optional, shown on schedule page)
// ═══════════════════════════════════════════

const SCHEDULE = [
  // Example games — replace with your real schedule:
  // { date: '2026-09-01', home: 'Alpha', homeKey: 'team-alpha', away: 'Bravo', awayKey: 'team-bravo', time: '7:00 PM', location: 'Main Field' },
  // { date: '2026-09-01', home: 'Charlie', homeKey: 'team-charlie', away: 'Delta', awayKey: 'team-delta', time: '7:00 PM', location: 'Secondary Field' },
  // { date: '2026-09-08', home: 'Echo', homeKey: 'team-echo', away: 'Alpha', awayKey: 'team-alpha', time: '6:30 PM', location: 'Park Stadium' },
];

// ═══════════════════════════════════════════
// EDITING GUIDE — Quick Reference
//
// TO ADD A NEW TEAM:
//   1. Add an entry to the TEAMS object (copy an existing one)
//   2. Add a matching <option value="new-key">New Team</option>
//      to every <select id="team-select"> in all 3 HTML files
//   3. Add a row to the STANDINGS array
//
// TO UPDATE STANDINGS AFTER A GAME:
//   1. Edit the relevant row in STANDINGS array
//   2. Update g, w/d/l, gf, ga, gd, pts
//   3. PTS = (wins × 3) + (draws × 1)
//   4. GD = gf - ga
//   5. Reorder the array so 1st place is first
//
// TO ADD A NEW GAME:
//   1. Add a new object to the SCHEDULE array
//   2. Use YYYY-MM-DD for the date
//   3. Make sure homeKey/awayKey match a TEAMS key
//
// TO REMOVE A TEAM:
//   1. Delete from TEAMS object
//   2. Delete from STANDINGS array
//   3. Delete matching <option> from all HTML selects
//
// TO CHANGE TEAM COLORS:
//   Edit the "color" field in TEAMS (hex code like '#E63946')
//   The whole site theme changes automatically!
// ═══════════════════════════════════════════

// ── Helpers ──────────────────────────────

function getTeam(key) {
  return TEAMS[key] || { name: key, short: key, abbr: key.slice(0, 2).toUpperCase(), color: '#64748b' };
}

function getSelectedTeam() {
  return localStorage.getItem('league-hub-team') || Object.keys(TEAMS)[0];
}

function setSelectedTeam(key) {
  localStorage.setItem('league-hub-team', key);
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
        <td>${row.d}</td>
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

  if (SCHEDULE.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:16px 0;">No games scheduled yet. Edit the SCHEDULE array in app.js to add games.</p>';
    return;
  }

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

  if (SCHEDULE.length === 0) {
    container.innerHTML = '';
    return;
  }

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

// ── Render Schedule Page ─────────────────

function renderSchedulePage() {
  const container = document.getElementById('schedule-container');
  if (!container) return;

  if (SCHEDULE.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:16px 0;">No games scheduled yet. Edit the SCHEDULE array in app.js to add games.</p>';
    return;
  }

  const yourTeam = getSelectedTeam();
  const grouped = {};
  SCHEDULE.forEach(g => {
    if (!grouped[g.date]) grouped[g.date] = [];
    grouped[g.date].push(g);
  });

  container.innerHTML = Object.entries(grouped).map(([date, games]) => `
    <div class="schedule-date-group">
      <div class="schedule-date-header">${formatDateLong(date)}</div>
      ${games.map(g => {
        const isYourGame = g.homeKey === yourTeam || g.awayKey === yourTeam;
        const ht = getTeam(g.homeKey);
        const at = getTeam(g.awayKey);
        return `
          <div class="schedule-item ${isYourGame ? 'your-game' : ''}">
            <div style="display:flex;align-items:center;gap:10px;flex:1;">
              <div class="team-crest" style="--team-color:${ht.color};width:28px;height:28px;"><span style="font-size:9px;">${ht.abbr}</span></div>
              <span style="font-weight:600;font-size:13px;">${g.home}</span>
              <span style="color:var(--text-muted);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">vs</span>
              <span style="font-weight:600;font-size:13px;">${g.away}</span>
              <div class="team-crest" style="--team-color:${at.color};width:28px;height:28px;"><span style="font-size:9px;">${at.abbr}</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:16px;">
              <span style="color:var(--text-muted);font-size:12px;min-width:70px;text-align:right;">${g.time}</span>
              <span style="color:var(--text-muted);font-size:12px;min-width:140px;">${g.location || ''}</span>
            </div>
          </div>
        `;
      }).join('')}
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
      renderSchedulePage();
    });
  }
  applyTeamTheme(getSelectedTeam());
  renderStandings();
  renderHomeSchedule();
  renderStandingsFull();
  renderSchedulePage();
});
