/* ─────────────────────────────────────────────────────────
   js/scrolly.js
   Manages the sticky scrollytelling section (Chapter 02).
   Uses IntersectionObserver to detect which step is active
   and redraws the highlight bar chart accordingly.

   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  let scrollyChart = null;

  /**
   * Rebuild the scrolly bar chart, highlighting the year
   * that corresponds to the current active step index.
   * @param {number} stepIdx - index into SCROLLY_HIGHLIGHTS
   */
  function buildScrollyChart(stepIdx) {
    const item     = SCROLLY_HIGHLIGHTS[stepIdx];
    const yearIdx  = YEARS.indexOf(item.year);
    const colors   = ANNUAL_EARNINGS.map((_, i) =>
      i === yearIdx ? COLOR.GOLD : COLOR.GOLD_A(0.15)
    );

    if (scrollyChart) scrollyChart.destroy();

    scrollyChart = new Chart(document.getElementById('scrollyChart'), {
      type: 'bar',
      data: {
        labels: YEARS,
        datasets: [{
          data: ANNUAL_EARNINGS,
          backgroundColor: colors,
          borderWidth: 0,
          borderRadius: 2,
        }],
      },
      options: {
        ...baseOpts,
        animation: { duration: 400 },
        scales: {
          ...baseOpts.scales,
          y: {
            ...baseOpts.scales.y,
            ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtM(v) },
          },
        },
        plugins: {
          ...baseOpts.plugins,
          tooltip: { callbacks: { label: ctx => ' ' + fmtM(ctx.raw) } },
        },
      },
    });

    document.getElementById('scrolly-chart-label').textContent =
      `${item.year}: ${fmtM(item.pool)} in prize money`;
  }

  // Render initial state (step 0)
  buildScrollyChart(0);

  // Observe each step card and update on entry
  const stepEls = document.querySelectorAll('.step');

  const stepObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = parseInt(e.target.dataset.step, 10);
        stepEls.forEach(s => s.classList.remove('is-active'));
        e.target.classList.add('is-active');
        buildScrollyChart(idx);
      }
    });
  }, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' });

  stepEls.forEach(el => stepObs.observe(el));

})();
