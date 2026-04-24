/* ─────────────────────────────────────────────────────────
   js/main.js
   App entry point. Handles hero counter animations and
   section reveal observer.
   Depends on: data.js, utils.js — load LAST.
───────────────────────────────────────────────────────── */

(function () {

  window.addEventListener('load', () => {
    setTimeout(() => {
      animateCounter(
        document.getElementById('hero-counter-earnings'),
        HERO_TOTALS.totalEarnings,
        v => fmtM(v),
        2400
      );
      animateCounter(
        document.getElementById('hero-counter-tournaments'),
        HERO_TOTALS.totalTournaments,
        v => fmtNum(v) + '+ Tournaments',
        2400
      );
      animateCounter(
        document.getElementById('hero-counter-winners'),
        HERO_TOTALS.totalWinners,
        v => fmtNum(v) + ' Winners',
        2400
      );
    }, 1200);

    initCharts();
    initScrolly();
    initGenreCards();
    initTable();
    buildTournamentLegend();
    initNavHighlight();
  });

  // Reveal sections on scroll
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  function buildTournamentLegend() {
    const container = document.getElementById('tournament-legend');
    if (!container) return;
    const seen = new Set();
    TOP_TOURNAMENTS.forEach(t => {
      const game = ALL_GAMES.find(g => g.game === t.game);
      const genre = game ? game.genre : 'Strategy';
      if (!seen.has(genre)) {
        seen.add(genre);
        const item = document.createElement('div');
        item.className = 'genre-legend-item';
        item.innerHTML = '<div class="genre-legend-dot" style="background:' + getGenreColor(genre) + '"></div>' + genre;
        container.appendChild(item);
      }
    });
  }

  function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = Array.from(document.querySelectorAll('section[id], div#scrolly'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.25 });
    sections.forEach(s => observer.observe(s));
  }

})();