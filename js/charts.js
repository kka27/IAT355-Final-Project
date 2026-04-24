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

let stackedMode = 'both';

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
  initStackedToggle();
}

function configureChartDefaults() {
  Chart.defaults.font.family = 'DM Mono, monospace';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = themeText;
  Chart.defaults.backgroundColor = 'transparent';
  Chart.defaults.borderColor = 'rgba(240,236,227,0.06)';
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
        borderColor: 'rgba(201,168,76,0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: { grid: { color: 'rgba(240,236,227,0.05)' }, ticks: { color: themeSubtle } },
      y: { grid: { color: 'rgba(240,236,227,0.05)' }, ticks: { color: themeSubtle }, beginAtZero: true }
    }
  };
}

function renderGrowthChart() {
  if (growthChart) growthChart.destroy();
  const ctx = document.getElementById('growthChart').getContext('2d');
  growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: YEAR_DATA.map(d => d.year),
      datasets: [{
        label: 'Total prize money (USD)',
        data: YEAR_DATA.map(d => d.earnings),
        borderColor: GENRE_COLORS['MOBA'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['MOBA']),
        fill: 'start',
        tension: 0.32,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: themeText,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => 'Year ' + items[0].label,
            label: ctx => 'Prize money: ' + fmtM(ctx.raw)
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { color: themeSubtle, maxTicksLimit: 10 },
          title: { display: true, text: 'Year', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        },
        y: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: {
            color: themeSubtle,
            callback: function(v) { return fmtM(v); },
            maxTicksLimit: 6
          },
          beginAtZero: true,
          title: { display: true, text: 'Prize Money (USD)', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
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
        backgroundColor: rgba(GENRE_COLORS['Battle Royale'], 0.8),
        borderRadius: 3,
        barThickness: 14
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => 'Year ' + items[0].label,
            label: ctx => 'Tournaments: ' + fmtNum(ctx.raw)
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: themeSubtle, maxTicksLimit: 8 }, title: { display: true, text: 'Year', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } } },
        y: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtNum(v), color: themeSubtle },
          beginAtZero: true,
          title: { display: true, text: 'Tournaments', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
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
        label: 'Unique prize-winning players',
        data: YEAR_DATA.map(d => d.players),
        borderColor: GENRE_COLORS['First-Person Shooter'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['First-Person Shooter']),
        fill: 'start',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => 'Year ' + items[0].label,
            label: ctx => 'Players: ' + fmtNum(ctx.raw)
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(240,236,227,0.05)' }, ticks: { color: themeSubtle, maxTicksLimit: 8 }, title: { display: true, text: 'Year', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } } },
        y: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtNum(v), color: themeSubtle },
          beginAtZero: true,
          title: { display: true, text: 'Unique Players', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
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
        label: 'Total prize money (USD)',
        data: YEAR_DATA.map(d => d.earnings),
        borderColor: GENRE_COLORS['Strategy'],
        backgroundColor: createGradient(ctx, GENRE_COLORS['Strategy']),
        fill: 'start',
        tension: 0.35,
        pointRadius: labels.map((_, i) => i === 0 ? 9 : 3),
        pointBackgroundColor: labels.map((_, i) => i === 0 ? '#c9a84c' : rgba(themeText, 0.35)),
        pointBorderColor: labels.map((_, i) => i === 0 ? 'rgba(201,168,76,0.35)' : 'transparent'),
        pointBorderWidth: labels.map((_, i) => i === 0 ? 5 : 0),
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => 'Year ' + items[0].label,
            label: ctx => 'Prize money: ' + fmtM(ctx.raw)
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: themeSubtle, maxTicksLimit: 10 }, title: { display: true, text: 'Year', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } } },
        y: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtM(v), color: themeSubtle },
          beginAtZero: true,
          title: { display: true, text: 'Prize Money (USD)', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
      }
    }
  });
}

function renderTopTournamentsChart() {
  const ctx = document.getElementById('topTournamentsChart').getContext('2d');
  topTournamentsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: TOP_TOURNAMENTS.map(item =>
        item.name
          .replace('The International', 'TI')
          .replace('Fortnite World Cup Finals 2019 - ', 'FWC 2019 ')
          .replace('League of Legends World Championship', 'LoL Worlds')
      ),
      datasets: [{
        label: 'Prize pool (USD)',
        data: TOP_TOURNAMENTS.map(item => item.prize),
        backgroundColor: TOP_TOURNAMENTS.map(item => {
          const g = ALL_GAMES.find(g => g.game === item.game);
          return getGenreColor(g ? g.genre : 'Strategy');
        }),
        borderRadius: 3,
        barThickness: 18
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => TOP_TOURNAMENTS[items[0].dataIndex].name,
            label: ctx => 'Prize pool: ' + fmtM(ctx.raw),
            afterLabel: ctx => {
              const t = TOP_TOURNAMENTS[ctx.dataIndex];
              return t.game + ' \u00b7 ' + t.year + ' \u00b7 ' + t.location;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtM(v), color: themeSubtle },
          title: { display: true, text: 'Prize Pool (USD)', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        },
        y: {
          grid: { display: false },
          ticks: { color: themeSubtle, font: { size: 11 } },
          title: { display: true, text: 'Tournament', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
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
        label: 'Total earnings (USD)',
        data: topGames.map(g => g.totalEarnings),
        backgroundColor: topGames.map(g => getGenreColor(g.genre)),
        borderRadius: 3,
        barThickness: 16
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: items => items[0].label,
            label: ctx => 'Total earnings: ' + fmtM(ctx.raw)
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: themeSubtle }, title: { display: true, text: 'Game', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } } },
        y: {
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtM(v), color: themeSubtle },
          title: { display: true, text: 'Prize Money (USD)', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
      }
    }
  });
}

function renderOnlineOfflineChart() {
  const ctx = document.getElementById('onlineOfflineChart').getContext('2d');
  onlineOfflineChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Online', 'In-Person (LAN)'],
      datasets: [{
        data: [OVERALL_ONLINE_SHARE.online, OVERALL_ONLINE_SHARE.offline],
        backgroundColor: [GENRE_COLORS['Battle Royale'], GENRE_COLORS['MOBA']],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: { color: themeSubtle, font: { size: 11 }, padding: 14 }
        },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: ctx => {
              const total = OVERALL_ONLINE_SHARE.online + OVERALL_ONLINE_SHARE.offline;
              return ctx.label + ': ' + fmtM(ctx.raw) + ' (' + pct(ctx.raw, total) + '%)';
            }
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
          backgroundColor: rgba(GENRE_COLORS['Battle Royale'], 0.85),
          borderRadius: 3,
          stack: 'stack1'
        },
        {
          label: 'In-Person (LAN)',
          data: topGames.map(g => g.totalEarnings - g.onlineEarnings),
          backgroundColor: rgba(GENRE_COLORS['MOBA'], 0.75),
          borderRadius: 3,
          stack: 'stack1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: themeSubtle,
            font: { size: 11 },
            padding: 16,
            usePointStyle: true,
            pointStyleWidth: 10
          }
        },
        tooltip: {
          backgroundColor: 'rgba(8,10,14,0.95)',
          titleColor: themeText,
          bodyColor: themeText,
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            title: items => items[0].label,
            label: ctx => ' ' + ctx.dataset.label + ': ' + fmtM(ctx.raw),
            footer: items => {
              var total = items.reduce(function(s, i) { return s + i.raw; }, 0);
              return 'Total: ' + fmtM(total);
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: themeSubtle },
          title: { display: true, text: 'Game', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        },
        y: {
          stacked: true,
          grid: { color: 'rgba(240,236,227,0.05)' },
          ticks: { callback: v => fmtM(v), color: themeSubtle },
          title: { display: true, text: 'Prize Money (USD)', color: themeSubtle, font: { size: 11, family: 'DM Mono, monospace' } }
        }
      }
    }
  });
}

function initStackedToggle() {
  document.querySelectorAll('[data-stacked-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-stacked-toggle]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      stackedMode = btn.dataset.stackedToggle;
      updateStackedChart();
    });
  });
}

function updateStackedChart() {
  if (!onlineStackedChart) return;
  var ds = onlineStackedChart.data.datasets;
  if (stackedMode === 'online') {
    ds[0].hidden = false;
    ds[1].hidden = true;
  } else if (stackedMode === 'offline') {
    ds[0].hidden = true;
    ds[1].hidden = false;
  } else {
    ds[0].hidden = false;
    ds[1].hidden = false;
  }
  onlineStackedChart.update();
}

function updateScrollyChart(stepIndex) {
  if (!scrollyChart) return;
  var dataset = scrollyChart.data.datasets[0];
  dataset.pointRadius = YEAR_DATA.map(function(_, i) { return i === stepIndex ? 8 : 3; });
  dataset.pointBackgroundColor = YEAR_DATA.map(function(_, i) {
    return i === stepIndex ? '#c9a84c' : rgba(themeText, 0.3);
  });
  dataset.pointBorderColor = GENRE_COLORS['Strategy'];
  dataset.pointBorderWidth = 1.5;
  scrollyChart.update('none');
}