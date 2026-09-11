import { chromium } from "playwright";

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/gallery",
  "/testimonials",
  "/faq",
  "/contact",
];

const b = await chromium.launch();
let problems = 0;

for (const route of ROUTES) {
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`http://localhost:3000${route}`, { waitUntil: "load" });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(800);

const report = await p.evaluate(() => {
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .map(h => ({ level: +h.tagName[1], text: h.textContent.trim().slice(0, 55) }));

  let skips = [];
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1)
      skips.push(`h${headings[i-1].level} -> h${headings[i].level} at "${headings[i].text}"`);
  }

  const imgs = [...document.images];
  const missingAlt = imgs.filter(i => i.alt === null || i.alt === undefined).length;
  const emptyAlt = imgs.filter(i => i.alt === "").map(i => i.currentSrc.split("/").pop()?.slice(0,40));

  // `input[type=hidden]` is not a labelable element — it carries a value the
  // user never sees or focuses, so a missing label is not a defect.
  const unlabeled = [...document.querySelectorAll("input,textarea,select")].filter(el => {
    if (el.type === "hidden") return false;
    if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return false;
    return !(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
  }).map(el => el.name || el.placeholder || el.type);

  const btnNoName = [...document.querySelectorAll("button,a")].filter(
    el => !el.textContent.trim() && !el.getAttribute("aria-label")
  ).length;

  return {
    h1Count: headings.filter(h => h.level === 1).length,
    total: headings.length,
    skips,
    outline: headings.map(h => `${"  ".repeat(h.level - 1)}h${h.level} ${h.text}`),
    images: imgs.length, missingAlt, emptyAlt,
    unlabeled, btnNoName,
    lang: document.documentElement.lang,
  };
});

// Exactly one h1, no skipped levels, every control named — anything else is
// a problem worth flagging.
const bad =
  report.h1Count !== 1 ||
  report.skips.length > 0 ||
  report.missingAlt > 0 ||
  report.unlabeled.length > 0 ||
  report.btnNoName > 0;
if (bad) problems++;

console.log(`=== ${route} === ${bad ? "** CHECK **" : "ok"}`);
console.log("lang:", report.lang);
console.log("h1 count:", report.h1Count, "| headings:", report.total);
console.log("heading skips:", report.skips.length ? report.skips : "none");
console.log("images:", report.images, "| missing alt attr:", report.missingAlt, "| decorative alt='':", report.emptyAlt);
console.log("unlabeled form controls:", report.unlabeled.length ? report.unlabeled : "none");
console.log("buttons/links with no accessible name:", report.btnNoName);
console.log("\n--- outline ---");
console.log(report.outline.join("\n"));

await p.close();
}

await b.close();
console.log(problems === 0 ? "ALL CLEAN" : `${problems} route(s) to check`);
