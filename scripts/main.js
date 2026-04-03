/* ─────────────────────────────────────────────────────────
   js/main.js
   App entry point. Handles:
     - Hero counter animations (run after page load)
     - IntersectionObserver for .reveal section fade-ins

   Depends on: utils.js
   Must be loaded LAST (after all other JS modules).
───────────────────────────────────────────────────────── */

(function () {

  // ── Hero counters ─────────────────────────────────────
  // Delay slightly so the hero entrance animation plays first

  window.addEventListener('load', () => {
    setTimeout(() => {
      animateCounter(
        document.getElementById('hero-counter-earnings'),
        1.8e9,
        v => fmtM(v),
        2200
      );
      animateCounter(
        document.getElementById('hero-counter-tournaments'),
        95000,
        v => fmtNum(v) + '+ Tournaments',
        2200
      );
      animateCounter(
        document.getElementById('hero-counter-winners'),
        180000,
        v => fmtNum(v) + ' Winners',
        2200
      );
    }, 1200);
  });

  // ── Section reveal on scroll ──────────────────────────

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Unobserve after reveal so it doesn't re-trigger
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

})();
