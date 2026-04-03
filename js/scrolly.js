/* ─────────────────────────────────────────────────────────
   js/scrolly.js
   Sticky scrollytelling section (Chapter 02).
   Watches 7 step cards, highlights the active year
   in the bar chart, and syncs the label.
   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  let scrollyChart = null;

  function buildScrollyChart(stepIdx) {
    const item    = SCROLLY_HIGHLIGHTS[stepIdx];
    const yearIdx = YEARS.indexOf(item.year);
    const colors  = ANNUAL_EARNINGS.map((_, i) =>
      i === yearIdx ? COLOR.GOLD : COLOR.GOLD_A(0.12)
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
        animation: { duration: 350 },
        scales: {
          ...baseOpts.scales,
          x: {
            ...baseOpts.scales.x,
            ticks: {
              ...baseOpts.scales.x.ticks,
              maxTicksLimit: 8,
              maxRotation: 0,
            },
          },
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
      `${item.year} — ${fmtM(item.pool)} distributed`;
  }

  buildScrollyChart(0);

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
