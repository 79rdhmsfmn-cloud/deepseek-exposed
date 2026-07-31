/* ========================================
   SWSL U15 Boys — App Logic
   ======================================== */

const TEAMS = {
  'western-valley': { name: 'Western Valley U15 Boys', short: 'Western Valley', abbr: 'WV', color: '#E63946' },
  'fdsa':           { name: 'FDSA U15 Division 1', short: 'FDSA', abbr: 'FD', color: '#FFD600' },
  'charlotte':      { name: 'Charlotte United Saints', short: 'Charlotte Saints', abbr: 'CS', color: '#1A1A1A' },
  'fundy':          { name: 'Fundy Downey Ford Mustangs', short: 'Fundy Mustangs', abbr: 'FM', color: '#1565C0' },
  'oasa':           { name: 'OASA U15 Boys Division 1', short: 'OASA', abbr: 'OA', color: '#FFC107' },
  'hampton':        { name: 'Hampton U15AA Boys', short: 'Hampton', abbr: 'HA', color: '#9E9E9E' },
};

const STANDINGS = [
  { team: 'FDSA U15 Division 1 Boys', key: 'fdsa', g: 9, w: 9, t: 0, l: 0, gf: 62, ga: 4, gd: 58, pts: 27 },
  { team: 'Charlotte United Saints', key: 'charlotte', g: 8, w: 7, t: 0, l: 1, gf: 50, ga: 7, gd: 43, pts: 21 },
  { team: 'Fundy Downey Ford Mustangs', key: 'fundy', g: 9, w: 3, t: 1, l: 5, gf: 19, ga: 45, gd: -26, pts: 10 },
  { team: 'Western Valley U15 Boys', key: 'western-valley', g: 8, w: 3, t: 0, l: 5, gf: 18, ga: 45, gd: -27, pts: 9 },
  { team: 'OASA U15 Boys Division 1', key: 'oasa', g: 8, w: 2, t: 1, l: 5, gf: 30, ga: 33, gd: -3, pts: 7 },
  { team: 'Hampton U15AA Boys', key: 'hampton', g: 8, w: 0, t: 0, l: 8, gf: 5, ga: 50, gd: -45, pts: 0 },
];

const SCHEDULE = [
  { date: '2026-08-04', home: 'OASA', homeKey: 'oasa', away: 'Hampton', awayKey: 'hampton', time: '6:30 PM' },
  { date: '2026-08-04', home: 'FDSA', homeKey: 'fdsa', away: 'Charlotte Saints', awayKey: 'charlotte', time: '7:00 PM' },
  { date: '2026-08-04', home: 'Fundy Mustangs', homeKey: 'fundy', away: 'Western Valley', awayKey: 'western-valley', time: '7:00 PM' },
  { date: '2026-08-06', home: 'Hampton', homeKey: 'hampton', away: 'Western Valley', awayKey: 'western-valley', time: '7:15 PM' },
];

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
  // Parse hex to RGB for the rgba vars
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

// ── Render Standings Page ────────────────

function renderStandingsFull() {
  renderStandings();
  // Also render schedule on standings page
  const container = document.getElementById('full-schedule');
  if (!container) return;
  // Group by date
  const grouped = {};
  SCHEDULE.forEach(g => {
    if (!grouped[g.date]) grouped[g.date] = [];
    grouped[g.date].push(g);
  });
  container.innerHTML = Object.entries(grouped).map(([date, games]) => {
    return `
      <div class="schedule-date-group">
        <div class="schedule-date-header">${formatDateLong(date)}</div>
        ${games.map(g => `
          <div class="schedule-item">
            <span class="si-matchup">${g.home} vs ${g.away}</span>
            <span class="si-time">${g.time}</span>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
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
