function fakeShot(label, bg, extra = "") {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <rect width="640" height="360" fill="${bg}"/>
    <rect x="200" y="60" width="240" height="240" rx="12" fill="white"/>
    <rect x="270" y="80" width="100" height="30" fill="#1d4ed8"/>
    <rect x="220" y="140" width="200" height="30" fill="#e2e8f0"/>
    <rect x="220" y="185" width="200" height="30" fill="#e2e8f0"/>
    <rect x="220" y="235" width="200" height="35" fill="#1d4ed8"/>
    <text x="320" y="338" text-anchor="middle" font-size="18"
          fill="white" font-family="sans-serif">${label}</text>
    ${extra}
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const diffPatches = `
  <rect x="220" y="185" width="200" height="30" fill="red" fill-opacity="0.6"/>
  <rect x="220" y="235" width="200" height="35" fill="red" fill-opacity="0.6"/>
`;

export async function scanUrl(url) {
  await new Promise(r => setTimeout(r, 1500));

  return {
    suspect_url: url,
    brand: "Demo College Portal",
    score: 92,
    verdict: "likely_clone",
        form: {
      real_target: "college.edu/login",
      fake_target: "evil.com/collect.php"
    },
    summary:
      "This page copies 94% of the layout of Demo College Portal " +
      "but is hosted on a different domain. Its login form sends " +
      "your password to evil.com.",
    domains: {
      genuine: "college.edu",
      suspect: "c0llege-portal.com"
    },
    images: {
      genuine: fakeShot("Genuine", "#0f766e"),
      suspect: fakeShot("Suspect", "#7c2d12"),
      diff: fakeShot("Differences", "#334155", diffPatches)
    },
    reasons: [
      {
        severity: "critical",
        title: "Password goes to another website",
        detail: "The login form sends your password to evil.com, not to the real college site."
      },
      {
        severity: "high",
        title: "Page layout is copied",
        detail: "94% of the page structure matches the real login page."
      },
      {
        severity: "high",
        title: "Look-alike web address",
        detail: "c0llege-portal.com imitates college.edu."
      },
      {
        severity: "medium",
        title: "Logo copied from the real site",
        detail: "The logo is loaded directly from the real college server."
      }
    ],
    signals: [
      { label: "Visual look", points: 28, max: 30 },
      { label: "Page layout", points: 22, max: 25 },
      { label: "Login form", points: 20, max: 20 },
      { label: "Web address", points: 12, max: 15 },
      { label: "Logo and images", points: 10, max: 10 }
    ]
  };
}