// Draws a round meter for a score from 0 to 100.
export function renderGauge(score) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  // green = safe, orange = suspicious, red = likely clone
  let color = "#22c55e";
  if (score >= 70) color = "#ef4444";
  else if (score >= 20) color = "#f59e0b";

  return `
    <div class="gauge">
      <svg viewBox="0 0 120 120" width="160" height="160">
        <circle cx="60" cy="60" r="54" fill="none"
                stroke="#334155" stroke-width="10"/>
        <circle cx="60" cy="60" r="54" fill="none"
                stroke="${color}" stroke-width="10"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                transform="rotate(-90 60 60)"/>
        <text x="60" y="68" text-anchor="middle"
              font-size="30" font-weight="bold"
              fill="${color}">${score}</text>
      </svg>
      <p>out of 100</p>
    </div>
  `;
}