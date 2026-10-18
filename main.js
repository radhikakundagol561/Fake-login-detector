import { scanUrl } from "./api.js";
import { renderGauge } from "./gauge.js";
import { renderCompare } from "./compare.js";
import { renderReasons } from "./reasons.js";
import { renderBreakdown } from "./breakdown.js";
import { renderDomain } from "./domainHighlight.js";
import { renderAttackPath } from "./attackPath.js";
import { renderReportButtons, wireReportButtons } from "./report.js";

const input = document.getElementById("url-input");
const button = document.getElementById("scan-btn");
const results = document.getElementById("results");
const verdictBox = document.getElementById("verdict-box");
const compareBox = document.getElementById("compare-box");
const reasonsBox = document.getElementById("reasons-box");
const breakdownBox = document.getElementById("breakdown-box");

const domainBox = document.createElement("div");
domainBox.id = "domain-box";
verdictBox.after(domainBox);

const attackBox = document.createElement("div");
attackBox.id = "attack-box";
domainBox.after(attackBox);

const reportBox = document.createElement("div");
reportBox.id = "report-box";
breakdownBox.after(reportBox);

button.addEventListener("click", async () => {
  const url = input.value.trim();
  if (!url) {
    alert("Please paste a URL first");
    return;
  }

  button.disabled = true;
  button.textContent = "Scanning...";
  results.classList.remove("hidden");
  verdictBox.innerHTML = "<p>Checking the page, please wait...</p>";
  domainBox.innerHTML = "";
  attackBox.innerHTML = "";
  compareBox.innerHTML = "";
  reasonsBox.innerHTML = "";
  breakdownBox.innerHTML = "";
  reportBox.innerHTML = "";

  const data = await scanUrl(url);

  verdictBox.innerHTML = `
    <div class="card">
      <h2>${data.verdict.replace("_", " ").toUpperCase()}</h2>
      ${renderGauge(data.score)}
      <p>${data.summary}</p>
    </div>
  `;

  domainBox.innerHTML = renderDomain(data.domains.genuine, data.domains.suspect);
  attackBox.innerHTML = renderAttackPath(data.domains.suspect, data.form);
  compareBox.innerHTML = renderCompare(data.images);
  reasonsBox.innerHTML = renderReasons(data.reasons);
  breakdownBox.innerHTML = renderBreakdown(data.signals);

  reportBox.innerHTML = renderReportButtons();
  wireReportButtons(data);

  button.disabled = false;
  button.textContent = "Scan";
});
