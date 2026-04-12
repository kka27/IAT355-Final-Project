/* ─────────────────────────────────────────────────────────
   js/charts.js
   Renders the page charts and exposes chart references for
   interactive modules.
───────────────────────────────────────────────────────── */

let growthChart;
let tournamentsChart;
let winnersChart;
let scrollyChart;
let topTournamentsChart;
let genreChart;
let onlineOfflineChart;
let onlineStackedChart;


function initCharts() {
  configureChartDefaults();
  renderGrowthChart();
  renderTournamentsChart();
  renderWinnersChart();
  renderScrollyChart();
  renderTopTournamentsChart();
  renderGenreChart();
  renderOnlineOfflineChart();
  renderOnlineStackedChart();
}

function configureChartDefaults() {
  Chart.defaults.font.family = 'DM Mono, monospace';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = themeText;
  Chart.defaults.backgroundColor = 'transparent';
  Chart.defaults.borderColor = 'rgba(240,236,227,0.12)';
}

function baseOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(8,10,14,0.95)',
        titleColor: themeText,
        bodyColor: themeText,
        borderColor: themeGrid,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: ctx => {
            const value = ctx.dataset.data[ctx.dataIndex];
            return `${ctx.dataset.label || ''}: ${fmtM(value)}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { color: themeGrid }, ticks: { color: themeSubtle } },
      y: { grid: { color: themeGrid }, ticks: { color: themeSubtle }, beginAtZero: true }
    }
  };
}

function renderGrowthChart() {
  if (growthChart) growthChart.destroy();
  const ctx = document.getElementById('growthChart').getContext('2d');
  const data = YEAR_DATA.map(d => d.earnings);
  growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: YEAR_DATA.map(d => d.year),
      datasets: [{
        label: 'Prize money',
        data,
        borderColor: GENRE_COLORS['MOBA'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['MOBA']),
        fill: 'start',
        tension: 0.32,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: themeText,
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      height: 320,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: themeGrid,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => {
              const value = ctx.dataset.data[ctx.dataIndex];
              return `${ctx.dataset.label || ''}: ${fmtM(value)}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { color: themeGrid }, ticks: { color: themeSubtle } },
        y: { grid: { color: themeGrid }, ticks: { color: themeSubtle }, beginAtZero: true }
      }
    }
  });
}

function renderTournamentsChart() {
  if (tournamentsChart) tournamentsChart.destroy();
  const ctx = document.getElementById('tournamentsChart').getContext('2d');
  tournamentsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: YEAR_DATA.map(d => d.year),
      datasets: [{
        label: 'Tournaments',
        data: YEAR_DATA.map(d => d.tournaments),
        backgroundColor: rgba(GENRE_COLORS['Battle Royale'], 0.85),
        borderRadius: 4,
        barThickness: 18
      }]
    },
    options: {
      responsive: false,
      height: 320,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: themeGrid,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => {
              const value = ctx.dataset.data[ctx.dataIndex];
              return `${ctx.dataset.label || ''}: ${fmtM(value)}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: themeSubtle } },
        y: { grid: { color: themeGrid }, ticks: { callback: v => fmtNum(v), color: themeSubtle }, beginAtZero: true }
      }
    }
  });
}

function renderWinnersChart() {
  if (winnersChart) winnersChart.destroy();
  const ctx = document.getElementById('winnersChart').getContext('2d');
  winnersChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: YEAR_DATA.map(d => d.year),
      datasets: [{
        label: 'Players',
        data: YEAR_DATA.map(d => d.players),
        borderColor: GENRE_COLORS['First-Person Shooter'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['First-Person Shooter']),
        fill: 'start',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      height: 320,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: themeGrid,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => {
              const value = ctx.dataset.data[ctx.dataIndex];
              return `${ctx.dataset.label || ''}: ${fmtM(value)}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { color: themeGrid }, ticks: { color: themeSubtle } },
        y: { grid: { color: themeGrid }, ticks: { callback: v => fmtNum(v), color: themeSubtle }, beginAtZero: true }
      }
    }
  });
}

function renderScrollyChart() {
  const ctx = document.getElementById('scrollyChart').getContext('2d');
  const labels = YEAR_DATA.map(d => d.year);
  scrollyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Prize money',
        data: YEAR_DATA.map(d => d.earnings),
        borderColor: GENRE_COLORS['Strategy'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['Strategy']),
        fill: 'start',
        tension: 0.35,
        pointRadius: labels.map((year, index) => (index === 0 ? 4 : 2)),
        pointBackgroundColor: labels.map((year, index) => (index === 0 ? themeText : rgba(themeText, 0.35))),
        borderWidth: 3
      }]
    },
    options: {
      ...baseOptions(),
      scales: {
        x: { ...baseOptions().scales.x, grid: { display: false }, ticks: { color: themeSubtle } },
        y: { ...baseOptions().scales.y, ticks: { callback: v => fmtM(v), color: themeSubtle } }
      }
    }
  });
}

function renderTopTournamentsChart() {
  const ctx = document.getElementById('topTournamentsChart').getContext('2d');
  topTournamentsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: TOP_TOURNAMENTS.map(item => item.name),
      datasets: [{
        label: 'Prize pool',
        data: TOP_TOURNAMENTS.map(item => item.prize),
        backgroundColor: TOP_TOURNAMENTS.map(item => {
          const gameEntry = ALL_GAMES.find(g => g.game === item.game);
          return getGenreColor(gameEntry?.genre || 'Strategy');
        }),
        borderRadius: 6,
        barThickness: 20
      }]
    },
    options: {
      ...baseOptions(),
      indexAxis: 'y',
      scales: {
        x: { ...baseOptions().scales.x, ticks: { callback: v => fmtM(v), color: themeSubtle } },
        y: { ...baseOptions().scales.y, ticks: { color: themeSubtle }, grid: { display: false } }
      }
    }
  });
}

function renderGenreChart() {
  const ctx = document.getElementById('genreChart').getContext('2d');
  const topGames = [...ALL_GAMES].sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 8);
  genreChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topGames.map(g => g.game),
      datasets: [{
        label: 'Earnings',
        data: topGames.map(g => g.totalEarnings),
        backgroundColor: topGames.map(g => getGenreColor(g.genre)),
        borderRadius: 4,
        barThickness: 18
      }]
    },
    options: {
      ...baseOptions(),
      scales: {
        x: { ...baseOptions().scales.x, grid: { display: false }, ticks: { color: themeSubtle } },
        y: { ...baseOptions().scales.y, ticks: { callback: v => fmtM(v), color: themeSubtle } }
      }
    }
  });
}

function renderOnlineOfflineChart() {
  const ctx = document.getElementById('onlineOfflineChart').getContext('2d');
  onlineOfflineChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Online', 'Offline'],
      datasets: [{
        data: [OVERALL_ONLINE_SHARE.online, OVERALL_ONLINE_SHARE.offline],
        backgroundColor: [GENRE_COLORS['Battle Royale'], GENRE_COLORS['MOBA']],
        borderWidth: 0
      }]
    },
    options: {
      ...baseOptions(),
      plugins: {
        ...baseOptions().plugins,
        legend: { display: true, position: 'right', labels: { color: themeSubtle } },
        tooltip: {
          ...baseOptions().plugins.tooltip,
          callbacks: {
            label: ctx => `${ctx.label}: ${fmtM(ctx.raw)} (${pct(ctx.raw, OVERALL_ONLINE_SHARE.online + OVERALL_ONLINE_SHARE.offline)}%)`
          }
        }
      }
    }
  });
}

function renderOnlineStackedChart() {
  const ctx = document.getElementById('onlineStackedChart').getContext('2d');
  const topGames = [...ALL_GAMES].sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 8);
  onlineStackedChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topGames.map(g => g.game),
      datasets: [
        {
          label: 'Online',
          data: topGames.map(g => g.onlineEarnings),
          backgroundColor: rgba(GENRE_COLORS['Battle Royale'], 0.8),
          borderRadius: { topLeft: 4, topRight: 4 },
          stack: 'stack1'
        },
        {
          label: 'Offline',
          data: topGames.map(g => g.totalEarnings - g.onlineEarnings),
          backgroundColor: rgba(GENRE_COLORS['Strategy'], 0.55),
          borderRadius: { bottomLeft: 4, bottomRight: 4 },
          stack: 'stack1'
        }
      ]
    },
    options: {
      ...baseOptions(),
      plugins: {
        ...baseOptions().plugins,
        legend: { display: true, position: 'top', labels: { color: themeSubtle } }
      },
      scales: {
        x: { ...baseOptions().scales.x, stacked: true, grid: { display: false }, ticks: { color: themeSubtle } },
        y: { ...baseOptions().scales.y, stacked: true, ticks: { callback: v => fmtM(v), color: themeSubtle } }
      }
    }
  });
}

function updateScrollyChart(stepIndex) {
  if (!scrollyChart) return;
  const dataset = scrollyChart.data.datasets[0];
  dataset.pointRadius = YEAR_DATA.map((__, index) => index === stepIndex ? 8 : 3);
  dataset.pointBackgroundColor = YEAR_DATA.map((__, index) => index === stepIndex ? themeText : rgba(themeText, 0.3));
  scrollyChart.update('none');
}
