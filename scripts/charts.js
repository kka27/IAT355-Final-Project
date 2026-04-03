/* ─────────────────────────────────────────────────────────
   js/charts.js
   Builds the four "static" charts:
     - growthChart       (section 1 — prize money over time)
     - tournamentsChart  (section 1 — tournaments per year)
     - winnersChart      (section 1 — unique winners per year)
     - onlineStackedChart(section 5 — LAN vs online stacked)

   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  // ── Prize money growth ──────────────────────────────────
  new Chart(document.getElementById('growthChart'), {
    type: 'line',
    data: {
      labels: YEARS,
      datasets: [{
        data: ANNUAL_EARNINGS,
        borderColor: COLOR.GOLD,
        backgroundColor: COLOR.GOLD_A(0.07),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: COLOR.GOLD,
        pointRadius: 3,
        pointHoverRadius: 6,
      }],
    },
    options: {
      ...baseOpts,
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

  // ── Tournaments per year ────────────────────────────────
  new Chart(document.getElementById('tournamentsChart'), {
    type: 'bar',
    data: {
      labels: YEARS,
      datasets: [{
        data: ANNUAL_TOURNAMENTS,
        backgroundColor: COLOR.TEAL_A(0.6),
        borderColor: COLOR.TEAL,
        borderWidth: 1,
        borderRadius: 2,
      }],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        y: {
          ...baseOpts.scales.y,
          ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtNum(v) },
        },
      },
      plugins: {
        ...baseOpts.plugins,
        tooltip: { callbacks: { label: ctx => ' ' + ctx.raw.toLocaleString() + ' tournaments' } },
      },
    },
  });

  // ── Unique winners per year ─────────────────────────────
  new Chart(document.getElementById('winnersChart'), {
    type: 'line',
    data: {
      labels: YEARS,
      datasets: [{
        data: ANNUAL_WINNERS,
        borderColor: COLOR.OFF,
        backgroundColor: COLOR.OFF_A(0.04),
        borderWidth: 1.5,
        fill: true,
        tension: 0.35,
        pointRadius: 2,
      }],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        y: {
          ...baseOpts.scales.y,
          ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtNum(v) },
        },
      },
      plugins: {
        ...baseOpts.plugins,
        tooltip: { callbacks: { label: ctx => ' ' + ctx.raw.toLocaleString() + ' winners' } },
      },
    },
  });

  // ── Online vs LAN stacked bar ───────────────────────────
  const ANNUAL_LAN = ANNUAL_EARNINGS.map((e, i) => e - ANNUAL_ONLINE[i]);

  new Chart(document.getElementById('onlineStackedChart'), {
    type: 'bar',
    data: {
      labels: YEARS,
      datasets: [
        {
          label: 'LAN / Offline',
          data: ANNUAL_LAN,
          backgroundColor: COLOR.GOLD_A(0.5),
          borderWidth: 0,
          borderRadius: 0,
          stack: 'stack0',
        },
        {
          label: 'Online Only',
          data: ANNUAL_ONLINE,
          backgroundColor: COLOR.TEAL_A(0.7),
          borderWidth: 0,
          borderRadius: 2,
          stack: 'stack0',
        },
      ],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        x: { ...baseOpts.scales.x, stacked: true },
        y: {
          ...baseOpts.scales.y,
          stacked: true,
          ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtM(v) },
        },
      },
      plugins: {
        ...baseOpts.plugins,
        legend: {
          display: true,
          labels: {
            color: COLOR.OFF_A(0.5),
            font: { family: "'DM Mono'", size: 10 },
            boxWidth: 12,
          },
        },
        tooltip: {
          callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + fmtM(ctx.raw) },
        },
      },
    },
  });

})();
