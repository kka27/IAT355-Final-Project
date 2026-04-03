/* ─────────────────────────────────────────────────────────
   js/genre.js
   Builds the clickable genre grid (Chapter 03) and renders
   the detail panel charts when a genre is selected.

   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  let genreChart        = null;
  let onlineOfflineChart = null;

  // ── Build genre cards ─────────────────────────────────

  const genreGrid = document.getElementById('genre-grid');

  Object.entries(GENRE_DATA).forEach(([genre, data]) => {
    const card = document.createElement('div');
    card.className    = 'genre-card';
    card.dataset.genre = genre;
    card.innerHTML = `
      <div class="genre-name">${genre}</div>
      <div class="genre-earnings">${fmtM(data.earnings)}</div>
      <div class="genre-count">${data.tournaments.toLocaleString()} tournaments</div>
    `;
    card.addEventListener('click', () => selectGenre(genre, card));
    genreGrid.appendChild(card);
  });

  // ── Handle genre selection ────────────────────────────

  function selectGenre(genre, card) {
    // Update active card state
    document.querySelectorAll('.genre-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Re-trigger open animation by toggling class
    const panel = document.getElementById('genre-panel');
    panel.classList.remove('open');
    void panel.offsetWidth; // force reflow
    panel.classList.add('open');

    const gameSubset = GAMES.filter(g => g.genre === genre).slice(0, 5);

    document.getElementById('genre-chart-label').textContent =
      genre + ' — Top games by earnings';

    // Horizontal bar chart: top games by earnings
    if (genreChart) genreChart.destroy();
    genreChart = new Chart(document.getElementById('genreChart'), {
      type: 'bar',
      data: {
        labels: gameSubset.map(g => g.game),
        datasets: [{
          data: gameSubset.map(g => g.earnings),
          backgroundColor: COLOR.GOLD_A(0.65),
          borderColor: COLOR.GOLD,
          borderWidth: 1,
          borderRadius: 3,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ' ' + fmtM(ctx.raw) } },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { callback: v => fmtM(v), font: { family: "'DM Mono'", size: 10 } },
          },
          y: {
            grid: { display: false },
            ticks: { font: { family: "'DM Mono'", size: 10 } },
          },
        },
      },
    });

    // Doughnut: online vs offline split for selected genre
    if (onlineOfflineChart) onlineOfflineChart.destroy();
    const totalOnline  = gameSubset.reduce((s, g) => s + g.onlineEarnings, 0);
    const totalOffline = gameSubset.reduce((s, g) => s + (g.earnings - g.onlineEarnings), 0);

    onlineOfflineChart = new Chart(document.getElementById('onlineOfflineChart'), {
      type: 'doughnut',
      data: {
        labels: ['LAN / Offline', 'Online Only'],
        datasets: [{
          data: [totalOffline, totalOnline],
          backgroundColor: [COLOR.GOLD_A(0.7), COLOR.TEAL_A(0.7)],
          borderColor: [COLOR.GOLD, COLOR.TEAL],
          borderWidth: 1,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: COLOR.OFF_A(0.5),
              font: { family: "'DM Mono'", size: 10 },
              boxWidth: 12,
            },
          },
          tooltip: {
            callbacks: { label: ctx => ' ' + ctx.label + ': ' + fmtM(ctx.raw) },
          },
        },
      },
    });
  }

})();
