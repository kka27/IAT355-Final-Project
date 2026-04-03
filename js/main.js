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

})();
