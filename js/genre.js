/* ─────────────────────────────────────────────────────────
   js/genre.js
   Builds genre cards and drives the genre detail charts.
───────────────────────────────────────────────────────── */

function initGenreCards() {
  const container = document.getElementById('genre-grid');
  const panel = document.getElementById('genre-panel');
  const label = document.getElementById('genre-chart-label');

  GENRE_SUMMARY.forEach(genreData => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'genre-card';
    card.innerHTML = `
      <div class="genre-name">${genreData.genre}</div>
      <div class="genre-earnings">${fmtM(genreData.totalEarnings)} total earnings</div>
      <div class="genre-count">${genreData.count} top titles · ${fmtNum(genreData.totalPlayers)} players tracked</div>
    `;
    card.addEventListener('click', () => selectGenre(genreData.genre, card));
    container.append(card);
  });

  if (GENRE_SUMMARY.length) {
    selectGenre(GENRE_SUMMARY[0].genre, container.firstElementChild);
  }

  function selectGenre(genre, card) {
    container.querySelectorAll('.genre-card').forEach(el => el.classList.toggle('active', el === card));
    label.innerText = `${genre} · Top scores by earnings`;
    panel.classList.add('open');

    const games = ALL_GAMES.filter(item => item.genre === genre).sort((a, b) => b.totalEarnings - a.totalEarnings);
    const topGames = games.slice(0, 6);
    const onlineTotal = games.reduce((sum, item) => sum + item.onlineEarnings, 0);
    const offlineTotal = games.reduce((sum, item) => sum + (item.totalEarnings - item.onlineEarnings), 0);

    if (genreChart) {
      genreChart.data.labels = topGames.map(item => item.game);
      genreChart.data.datasets[0].data = topGames.map(item => item.totalEarnings);
      genreChart.data.datasets[0].backgroundColor = topGames.map(item => getGenreColor(item.genre));
      genreChart.update();
    }

    if (onlineOfflineChart) {
      onlineOfflineChart.data.datasets[0].data = [onlineTotal, offlineTotal];
      onlineOfflineChart.options.plugins.tooltip.callbacks.label = ctx => `${ctx.label}: ${fmtM(ctx.raw)} (${pct(ctx.raw, onlineTotal + offlineTotal)}%)`;
      onlineOfflineChart.update();
    }
  }
}
