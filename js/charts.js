/* ─────────────────────────────────────────────────────────
   js/charts.js
   Static charts:
     growthChart         — prize money 1998–2023
     tournamentsChart    — tournaments per year
     winnersChart        — unique winners per year
     onlineStackedChart  — LAN vs online stacked
     tournamentsBarChart — top 20 tournaments by prize pool
   Depends on: data.js, utils.js
───────────────────────────────────────────────────────── */

(function () {

  // ── Prize money growth (1998–2023) ─────────────────────
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
        tension: 0.35,
        pointBackgroundColor: COLOR.GOLD,
        pointRadius: (ctx) => {
          // Highlight COVID dip year and 2019 peak
          const y = YEARS[ctx.dataIndex];
          return (y === 2019 || y === 2020 || y === 2013 || y === 2018) ? 5 : 2;
        },
        pointHoverRadius: 7,
      }],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        x: { ...baseOpts.scales.x, ticks: { ...baseOpts.scales.x.ticks, maxTicksLimit: 10, maxRotation: 45 } },
        y: { ...baseOpts.scales.y, ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtM(v) } },
      },
      plugins: {
        ...baseOpts.plugins,
        tooltip: { callbacks: { label: ctx => '  ' + fmtM(ctx.raw) + ' · ' + YEARS[ctx.dataIndex] } },
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
        backgroundColor: COLOR.TEAL_A(0.55),
        borderColor: COLOR.TEAL,
        borderWidth: 1,
        borderRadius: 2,
      }],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        x: { ...baseOpts.scales.x, ticks: { ...baseOpts.scales.x.ticks, maxTicksLimit: 8, maxRotation: 45 } },
        y: { ...baseOpts.scales.y, ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtNum(v) } },
      },
      plugins: {
        ...baseOpts.plugins,
        tooltip: { callbacks: { label: ctx => '  ' + ctx.raw.toLocaleString() + ' tournaments' } },
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
        x: { ...baseOpts.scales.x, ticks: { ...baseOpts.scales.x.ticks, maxTicksLimit: 8, maxRotation: 45 } },
        y: { ...baseOpts.scales.y, ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtNum(v) } },
      },
      plugins: {
        ...baseOpts.plugins,
        tooltip: { callbacks: { label: ctx => '  ' + ctx.raw.toLocaleString() + ' winners' } },
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
          backgroundColor: COLOR.GOLD_A(0.55),
          borderWidth: 0,
          borderRadius: 0,
          stack: 'stack0',
        },
        {
          label: 'Online Only',
          data: ANNUAL_ONLINE,
          backgroundColor: COLOR.TEAL_A(0.75),
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
        x: { ...baseOpts.scales.x, stacked: true, ticks: { ...baseOpts.scales.x.ticks, maxTicksLimit: 8, maxRotation: 45 } },
        y: { ...baseOpts.scales.y, stacked: true, ticks: { ...baseOpts.scales.y.ticks, callback: v => fmtM(v) } },
      },
      plugins: {
        ...baseOpts.plugins,
        legend: {
          display: true,
          labels: { color: COLOR.OFF_A(0.5), font: { family: "'DM Mono'", size: 10 }, boxWidth: 12 },
        },
        tooltip: { callbacks: { label: ctx => '  ' + ctx.dataset.label + ': ' + fmtM(ctx.raw) } },
      },
    },
  });

  // ── Top 20 tournaments horizontal bar ───────────────────
  const sorted = [...TOP_TOURNAMENTS].sort((a, b) => b.pool - a.pool).slice(0, 15);
  const gameColorMap = {
    'Dota 2':          COLOR.GOLD,
    'Fortnite':        COLOR.TEAL,
    'League of Legends': COLOR.OFF_A(0.7),
    'Rainbow Six Siege': COLOR.OFF_A(0.5),
    'Valorant':        COLOR.GOLD_A(0.6),
    'PUBG':            COLOR.TEAL_A(0.6),
  };

  new Chart(document.getElementById('topTournamentsChart'), {
    type: 'bar',
    data: {
      labels: sorted.map(t => t.name.length > 32 ? t.name.slice(0, 30) + '…' : t.name),
      datasets: [{
        data: sorted.map(t => t.pool),
        backgroundColor: sorted.map(t => gameColorMap[t.game] || COLOR.GOLD_A(0.4)),
        borderColor:     sorted.map(t => gameColorMap[t.game] || COLOR.GOLD_A(0.7)),
        borderWidth: 1,
        borderRadius: 3,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => '  ' + fmtM(ctx.raw),
            afterLabel: ctx => '  ' + sorted[ctx.dataIndex].game + ' · ' + sorted[ctx.dataIndex].year,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => fmtM(v), font: { family: "'DM Mono'", size: 10 } },
        },
        y: {
          grid: { display: false },
          ticks: { font: { family: "'DM Mono'", size: 9 } },
        },
      },
    },
  });

})();
