import { chromium } from "playwright";

const browser = await chromium.launch();
const results = [];
const check = (name, pass, detail = "") =>
  results.push({ name, pass, detail });

// ---------- Desktop: FAQ accordion ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  const first = page.locator('[id^="faq-trigger-"]').first();
  const second = page.locator('[id^="faq-trigger-"]').nth(1);

  check("FAQ item 1 open by default", (await first.getAttribute("aria-expanded")) === "true");
  check("FAQ item 2 closed by default", (await second.getAttribute("aria-expanded")) === "false");

  await second.click();
  check("FAQ item 2 opens on click", (await second.getAttribute("aria-expanded")) === "true");
  check("FAQ item 1 closes (single-open)", (await first.getAttribute("aria-expanded")) === "false");

  const panel = page.locator('[id^="faq-panel-"]').nth(1);
  check("FAQ item 2 panel visible", await panel.isVisible());

  await second.click();
  check("FAQ item 2 toggles closed", (await second.getAttribute("aria-expanded")) === "false");

  await page.close();
}

// ---------- Desktop: contact form validation ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  // Scope to the contact form — the footer newsletter has a similar label.
  const form = page.locator("form").filter({ hasText: "Speak with an Investment Specialist" });
  const submit = form.getByRole("button", { name: "Submit Secure Request" });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();

  check("Empty submit blocked with name error", await form.getByText("Please enter your full name.").isVisible());
  check("Empty submit blocked with email error", await form.getByText("Please enter your email address.").isVisible());

  await form.getByLabel("Full Name").fill("Jane Doe");
  await form.getByLabel("Email Address", { exact: true }).fill("not-an-email");
  await form.getByLabel("Message / Inquiry Detail").fill("Interested in a gold IRA.");
  await submit.click();
  check("Invalid email rejected", await form.getByText("Please enter a valid email address.").isVisible());

  await form.getByLabel("Email Address", { exact: true }).fill("jane@example.com");
  await submit.click();
  await page.waitForTimeout(400);
  const notConnected = await form.getByText(/not connected yet/i).isVisible();
  check("Valid submit does NOT fake success", notConnected, "shows adapter notice instead");

  await page.close();
}

// ---------- Mobile: drawer ----------
{
  const page = await browser.newPage({ viewport: { width: 375, height: 780 } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Open menu" });
  check("Hamburger visible at 375px", await toggle.isVisible());

  const desktopNav = page.getByRole("navigation", { name: "Main" });
  check("Desktop nav hidden at 375px", !(await desktopNav.isVisible()));

  await toggle.click();
  const drawer = page.getByRole("navigation", { name: "Mobile" });
  check("Drawer opens", await drawer.isVisible());
  check("aria-expanded true", (await page.locator("#mobile-menu").isVisible()));

  const overflowLocked = await page.evaluate(() => document.body.style.overflow);
  check("Body scroll locked while open", overflowLocked === "hidden", `overflow=${overflowLocked}`);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check("Escape closes drawer", !(await drawer.isVisible()));

  await page.close();
}

// ---------- Links & anchors ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  const tel = await page.locator('a[href^="tel:"]').first().getAttribute("href");
  const mail = await page.locator('a[href^="mailto:"]').first().getAttribute("href");
  check("Phone link correct", tel === "tel:+13058450757", tel ?? "missing");
  check("Email link correct", mail === "mailto:sales@hunterhexcapital.com", mail ?? "missing");

  for (const id of ["products", "about", "services", "gallery", "testimonials", "faq", "contact"]) {
    check(`#${id} anchor target exists`, (await page.locator(`#${id}`).count()) === 1);
  }

  await page.getByRole("link", { name: "View More Products" }).click();
  await page.waitForURL("**/products");
  check("View More Products navigates to /products", page.url().endsWith("/products"));

  await page.close();
}

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
