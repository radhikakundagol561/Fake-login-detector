export function renderBreakdown(signals) {
  const rows = signals.map(s => {
    const pct = Math.round((s.points / s.max) * 100);
    return `
      <div class="bar-row">
        <div class="bar-label">
          <span>${s.label}</span>
          <span>${s.points} / ${s.max}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="card">
      <h3>Score breakdown</h3>
      ${rows}
    </div>
  `;
}