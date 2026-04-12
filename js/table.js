/* ─────────────────────────────────────────────────────────
   js/table.js
   Builds and sorts the leaderboard table.
───────────────────────────────────────────────────────── */

const SORT_KEY_MAP = {
  earnings: 'totalEarnings',
  tournaments: 'totalTournaments',
  winners: 'totalPlayers'
};

function initTable() {
  const filterButtons = document.querySelectorAll('#sort-tabs .filter-tab');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
      renderGamesTable(button.dataset.sort);
    });
  });

  renderGamesTable('earnings');
}

function renderGamesTable(sortKey = 'earnings') {
  const metric = SORT_KEY_MAP[sortKey] || SORT_KEY_MAP.earnings;
  const games = [...ALL_GAMES].sort((a, b) => b[metric] - a[metric]).slice(0, 15);
  const topValue = games[0] ? games[0][metric] : 1;
  const tbody = document.getElementById('games-tbody');
  tbody.innerHTML = '';

  games.forEach((entry, index) => {
    const share = pct(entry[metric], topValue);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="rank-cell">${index + 1}</td>
      <td class="game-name-cell">${entry.game}<span class="genre-tag">${entry.genre}</span></td>
      <td class="earnings-cell">${fmtM(entry.totalEarnings)}</td>
      <td class="tournaments-cell">${fmtNum(entry.totalTournaments)}</td>
      <td class="bar-cell">
        <div class="bar-bg"><div class="bar-fill" style="width:${share}%"></div></div>
        <div style="margin-top:0.45rem; color:${themeSubtle}; font-size:0.68rem;">${share}% of #1</div>
      </td>
    `;
    tbody.appendChild(row);
  });
}
