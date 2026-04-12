/* ─────────────────────────────────────────────────────────
   js/utils.js
   Formatting helpers and chart utility functions.
───────────────────────────────────────────────────────── */

const themeText = 'rgba(240,236,227,0.92)';
const themeSubtle = 'rgba(240,236,227,0.45)';
const themeGrid = 'rgba(240,236,227,0.08)';

function fmtNum(value) {
  if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
}

function fmtM(value) {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

function fmtMoney(value) {
  return `$${value.toLocaleString()}`;
}

function pct(value, total) {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}

function toRgb(color) {
  const match = color.match(/#([0-9a-f]{6})/i);
  if (!match) return color;
  const hex = match[1];
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4), 16)].join(',');
}

function rgba(color, alpha) {
  const rgb = toRgb(color);
  return `rgba(${rgb}, ${alpha})`;
}

function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, rgba(color, 0.25));
  gradient.addColorStop(1, rgba(color, 0.05));
  return gradient;
}

function getGenreColor(genre) {
  return GENRE_COLORS[genre] || '#f0ece3';
}

function buildValueLabel(value, label) {
  return `${label}: ${fmtM(value)}`;
}

function animateCounter(element, target, formatFn, duration = 1600) {
  if (!element || typeof formatFn !== 'function') return;
  const startTime = performance.now();
  const startValue = 0;

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.floor(startValue + (target - startValue) * progress);
    element.textContent = formatFn(current);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
