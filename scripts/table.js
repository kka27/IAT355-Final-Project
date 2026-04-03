/* ─────────────────────────────────────────────────────────
   js/table.js
   Renders and re-sorts the all-time leaderboard table
   (Chapter 04). Also manages the hover tooltip that appears
   on each game row.

   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  const maxEarnings = Math.max(...GAMES.map(g => g.earnings));
  const tooltip     = document.getElementById('tooltip');
  let currentSort   = 'earnings';

  // ── Table rendering ───────────────────────────────────

  function renderTable(sort) {
    const key = sort === 'earnings'    ? 'earnings'
              : sort === 'tournaments' ? 'tournaments'
              : 'winners';

    const sorted = [...GAMES].sort((a, b) => b[key] - a[key]);
    const tbody  = document.getElementById('games-tbody');
    tbody.innerHTML = '';

    sorted.forEach((g, i) => {
      const pct = (g.earnings / maxEarnings * 100).toFixed(1);
      const tr  = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td class="rank-cell">${i + 1}</td>
        <td class="game-name-cell">${g.game}</td>
        <td><span class="genre-tag">${g.genre}</span></td>
        <td class="earnings-cell">${fmtM(g.earnings)}</td>
        <td style="color:rgba(240,236,227,0.55);font-size:0.8rem;">${g.tournaments.toLocaleString()}</td>
        <td class="bar-cell">
          <div class="bar-bg">
            <div class="bar-fill" style="width:0%"></div>
          </div>
        </td>
      `;
      tr.addEventListener('mouseenter', e => showTooltip(e, g));
      tr.addEventListener('mousemove',  e => moveTooltip(e));
      tr.addEventListener('mouseleave', hideTooltip);
      tbody.appendChild(tr);

      // Set actual bar width after a short delay to trigger CSS transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          tr.querySelector('.bar-fill').style.width = pct + '%';
        }, 50);
      });
    });
  }

  // Initial render
  renderTable('earnings');

  // ── Sort tab listeners ────────────────────────────────

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSort = tab.dataset.sort;
      renderTable(currentSort);
    });
  });

  // ── Tooltip ───────────────────────────────────────────

  function showTooltip(e, g) {
    document.getElementById('tt-game').textContent     = g.game;
    document.getElementById('tt-earnings').textContent = fmtM(g.earnings) + ' total prize money';
    document.getElementById('tt-extra').textContent    =
      `${g.tournaments.toLocaleString()} tournaments · ${g.winners.toLocaleString()} winners`;
    tooltip.style.display = 'block';
    moveTooltip(e);
  }

  function moveTooltip(e) {
    tooltip.style.left = (e.clientX + 16) + 'px';
    tooltip.style.top  = (e.clientY - 10) + 'px';
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }

})();
