/* ─────────────────────────────────────────────────────────
   js/utils.js
   Shared utility functions used across all chart/component
   modules. No DOM interaction here — pure helpers only.
───────────────────────────────────────────────────────── */

// ── Number formatters ─────────────────────────────────────

/** Format a dollar value into compact notation: $1.2B, $42.5M, $300K */
function fmtM(v) {
  if (v >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
  if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
  if (v >= 1e3) return '$' + (v / 1e3).toFixed(0) + 'K';
  return '$' + v;
}

/** Format a count into compact notation: 1.4M, 21K */
function fmtNum(v) {
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(0) + 'K';
  return v;
}

// ── Animated counter ──────────────────────────────────────

/**
 * Animate a counter from 0 to `target` over `duration` ms.
 * @param {HTMLElement} el       - element to update
 * @param {number}      target   - final value
 * @param {Function}    fmt      - formatter: value => string
 * @param {number}      duration - animation duration in ms
 */
function animateCounter(el, target, fmt, duration = 2000) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
    el.textContent = fmt(Math.floor(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Chart.js shared defaults ──────────────────────────────

// Apply global Chart.js color defaults
Chart.defaults.color = 'rgba(240,236,227,0.4)';
Chart.defaults.borderColor = 'rgba(240,236,227,0.06)';

/** Base options object shared across most charts */
const baseOpts = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { font: { family: "'DM Mono'", size: 10 }, maxRotation: 45 },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { font: { family: "'DM Mono'", size: 10 } },
    },
  },
};

// ── Color constants ───────────────────────────────────────
// Mirror the CSS variables here for use in Chart.js (which
// cannot read CSS custom properties directly).
const COLOR = {
  GOLD:    '#c9a84c',
  TEAL:    '#1fa898',
  RED:     '#d63a2f',
  OFF:     '#f0ece3',
  GOLD_A:  (a) => `rgba(201,168,76,${a})`,
  TEAL_A:  (a) => `rgba(31,168,152,${a})`,
  OFF_A:   (a) => `rgba(240,236,227,${a})`,
};
