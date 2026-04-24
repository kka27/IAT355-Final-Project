/* ─────────────────────────────────────────────────────────
   js/scrolly.js
   Controls the scrollytelling module and syncs
   step activation with the highlight chart.
───────────────────────────────────────────────────────── */

function initScrolly() {
  const steps = Array.from(document.querySelectorAll('.step'));
  const chartLabel = document.getElementById('scrolly-chart-label');

  function setActive(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === stepIndex);
    });
    const currentStep = steps[stepIndex];
    if (currentStep) {
      const year = parseInt(currentStep.querySelector('.step-year')?.innerText);
      chartLabel.innerText = `Annual prize money in ${year}`;
      const dataIndex = YEAR_DATA.findIndex(d => d.year === year);
      updateScrollyChart(dataIndex);
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const stepIndex = Number(entry.target.dataset.step || 0);
      setActive(stepIndex);
    });
  }, { threshold: 0.5 });

  steps.forEach(step => observer.observe(step));
  setActive(0);
}
