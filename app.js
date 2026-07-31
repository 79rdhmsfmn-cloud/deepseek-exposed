/* ========================================
   SWSL U15 Boys — App Logic
   ======================================== */

const TEAMS = {
  'western-valley': { name: 'Western Valley', color: '#E63946' },
  'fdsa':           { name: 'FDSA', color: '#FFD600' },
  'charlotte':      { name: 'Charlotte Saints', color: '#1A1A1A' },
  'fundy':          { name: 'Fundy Mustangs', color: '#1565C0' },
  'oasa':           { name: 'OASA', color: '#FFC107' },
  'hampton':        { name: 'Hampton', color: '#9E9E9E' },
};

const STANDINGS = [
  { team: 'FDSA U15 Division 1 Boys', key: 'fdsa', g: 9, w: 9, t: 0, l: 0, gf: 62, ga: 4, gd: 58, pts: 27 },
  { team: 'Charlotte United Saints', key: 'charlotte', g: 8, w: 7, t: 0, l: 1, gf: 50, ga: 7, gd: 43, pts: 21 },
  { team: 'Fundy Downey Ford Mustangs', key: 'fundy', g: 9, w: 3, t: 1, l: 5, gf: 19, ga: 45, gd: -26, pts: 10 },
  { team: 'Western Valley U15 Boys', key: 'western-valley', g: 8, w: 3, t: 0, l: 5, gf: 18, ga: 45, gd: -27, pts: 9 },
  { team: 'OASA U15 Boys Division 1', key: 'oasa', g: 8, w: 2, t: 1, l: 5, gf: 30, ga: 33, gd: -3, pts: 7 },
  { team: 'Hampton U15AA Boys', key: 'hampton', g: 8, w: 0, t: 0, l: 8, gf: 5, ga: 50, gd: -45, pts: 0 },
];

const RESULTS = [
  { date: '2026-07-29', home: 'Western Valley', homeKey: 'western-valley', homeScore: 5, away: 'Fundy Mustangs', awayKey: 'fundy', awayScore: 1 },
  { date: '2026-07-29', home: 'Charlotte Saints', homeKey: 'charlotte', homeScore: 7, away: 'Western Valley', awayKey: 'western-valley', awayScore: 1 },
  { date: '2026-07-29', home: 'OASA', homeKey: 'oasa', homeScore: 2, away: 'FDSA', awayKey: 'fdsa', awayScore: 6 },
  { date: '2026-07-24', home: 'Western Valley', homeKey: 'western-valley', homeScore: 3, away: 'FDSA', awayKey: 'fdsa', awayScore: 8 },
  { date: '2026-07-24', home: 'Fundy Mustangs', homeKey: 'fundy', homeScore: 0, away: 'Charlotte Saints', awayKey: 'charlotte', awayScore: 5 },
];

// ── Team Selector ────────────────────────

function getSelectedTeam() {
  return localStorage.getItem('swsl-team') || 'western-valley';
}

function setSelectedTeam(key) {
  localStorage.setItem('swsl-team', key);
  applyTeamTheme(key);
}

function applyTeamTheme(key) {
  const team = TEAMS[key];
  if (!team) return;
  document.documentElement.style.setProperty('--accent', team.color);
  document.documentElement.style.setProperty('--accent-dim', team.color + '14');
  document.documentElement.style.setProperty('--accent-mid', team.color + '40');
  const sel = document.getElementById('team-select');
  if (sel) sel.value = key;
}

// ── Render Standings ─────────────────────

function renderStandings() {
  const tbody = document.getElementById('standings-body');
  if (!tbody) return;

  const yourTeam = getSelectedTeam();
  tbody.innerHTML = STANDINGS.map((row, i) => {
    const isYourTeam = row.key === yourTeam;
    const teamInfo = TEAMS[row.key];
    return `
      <tr class="${isYourTeam ? 'your-team' : ''}">
        <td>${i + 1}</td>
        <td>
          <div class="team-cell">
            <span class="team-dot" style="background:${teamInfo?.color || '#555'}"></span>
            ${row.team}
          </div>
        </td>
        <td>${row.g}</td>
        <td>${row.w}</td>
        <td>${row.t}</td>
        <td>${row.l}</td>
        <td>${row.gf}</td>
        <td>${row.ga}</td>
        <td>${row.gd > 0 ? '+' : ''}${row.gd}</td>
        <td class="pts">${row.pts}</td>
      </tr>
    `;
  }).join('');
}

// ── Render Results ───────────────────────

function renderResults() {
  const grid = document.getElementById('results-grid');
  if (!grid) return;

  const yourTeam = getSelectedTeam();
  grid.innerHTML = RESULTS.map(r => {
    const homeTeam = TEAMS[r.homeKey];
    const awayTeam = TEAMS[r.awayKey];
    const isHome = r.homeKey === yourTeam;
    const isAway = r.awayKey === yourTeam;

    let badge = '';
    if (isHome || isAway) {
      const yourScore = isHome ? r.homeScore : r.awayScore;
      const theirScore = isHome ? r.awayScore : r.homeScore;
      if (yourScore > theirScore) badge = '<span class="result-badge win">W</span>';
      else if (yourScore < theirScore) badge = '<span class="result-badge loss">L</span>';
      else badge = '<span class="result-badge draw">D</span>';
    }

    const dateObj = new Date(r.date + 'T12:00:00');
    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return `
      <div class="result-card">
        <div class="result-date">${dateStr}</div>
        <div class="result-score">
          <span class="result-team" style="color:${homeTeam?.color || '#fff'}">${r.home}</span>
          <span class="result-num">${r.homeScore}</span>
          <span class="result-divider">&ndash;</span>
          <span class="result-num">${r.awayScore}</span>
          <span class="result-team" style="color:${awayTeam?.color || '#fff'}">${r.away}</span>
        </div>
        ${badge ? `<div style="text-align:center">${badge}</div>` : ''}
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
      renderResults();
    });
  }
  applyTeamTheme(getSelectedTeam());
  renderStandings();
  renderResults();
});
