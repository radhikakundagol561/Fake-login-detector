export function renderCompare(images) {
  return `
    <div class="card">
      <h3>Side-by-side comparison</h3>
      <div class="compare-grid">
        ${shot("Genuine page", images.genuine)}
        ${shot("Suspect page", images.suspect)}
        ${shot("Differences (red)", images.diff)}
      </div>
    </div>
  `;
}

function shot(title, src) {
  return `
    <figure class="shot">
      <img src="${src}" alt="${title}">
      <figcaption>${title}</figcaption>
    </figure>
  `;
}