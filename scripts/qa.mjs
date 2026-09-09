import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.argv[2] ?? "qa-shots";
const WIDTHS = [1440, 1280, 1024, 768, 640, 390, 375];
const ROUTES = ["/", "/products"];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let problems = 0;

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto(`http://localhost:3000${route}`, { waitUntil: "load" });

    // next/image lazy-loads below-fold assets; scroll the page so they decode
    // before the full-page capture, otherwise the gallery shots come back blank.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      // Bounded wait — a never-resolving image must not hang the run.
      await Promise.race([
        Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => new Promise((r) => { img.onload = img.onerror = r; })),
        ),
        new Promise((r) => setTimeout(r, 3000)),
      ]);
    });
    await page.waitForTimeout(600);

    // Temporarily lift the overflow guard so real overflow is measurable.
    const metrics = await page.evaluate(() => {
      const prev = document.body.style.overflowX;
      document.body.style.overflowX = "visible";
      document.documentElement.style.overflowX = "visible";

      const vw = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 70),
            text: (el.textContent ?? "").trim().slice(0, 40),
            left: Math.round(r.left),
            right: Math.round(r.right),
          });
        }
      }

      const scrollWidth = document.documentElement.scrollWidth;
      document.body.style.overflowX = prev;
      document.documentElement.style.overflowX = "";
      // Report only the outermost offenders.
      return { vw, scrollWidth, offenders: offenders.slice(0, 6) };
    });

    const label = `${route.replace(/\//g, "_") || "_home"}-${width}`;
    await page.screenshot({ path: `${OUT}/${label}.png`, fullPage: true });

    const overflow = metrics.scrollWidth > metrics.vw + 1;
    if (overflow || errors.length) problems++;

    console.log(
      `${route} @${width}  scrollW=${metrics.scrollWidth} vw=${metrics.vw}` +
        `${overflow ? "  ** OVERFLOW **" : "  ok"}` +
        `${errors.length ? `  errors=${errors.length}` : ""}`,
    );
    if (overflow) {
      for (const o of metrics.offenders) {
        console.log(`      <${o.tag}> [${o.left}..${o.right}] "${o.text}" .${o.cls}`);
      }
    }
    for (const e of errors.slice(0, 3)) console.log(`      console: ${e.slice(0, 160)}`);

    await page.close();
  }
}

await browser.close();
console.log(problems === 0 ? "\nALL CLEAN" : `\n${problems} viewport(s) with problems`);
