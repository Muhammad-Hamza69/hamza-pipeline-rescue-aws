import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const screenshotDir = "docs/screenshots";
await mkdir(screenshotDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const failedAssets = [];
const checks = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (asset) => { if (asset.url().includes("/_next/") && asset.status() >= 400) failedAssets.push(`${asset.status()} ${asset.url()}`); });
  const response = await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  assert.deepEqual(failedAssets, [], "Every Next.js CSS/JavaScript/font asset loads");
  assert.match(await page.title(), /Muhammad Hamza/);
  for (const id of ["home", "about", "skills", "work", "pipeline-rescue", "experience"]) assert.equal(await page.locator(`#${id}`).count(), 1);
  assert.equal(await page.getByRole("link", { name: "Portfolio source on GitHub" }).getAttribute("href"), "https://github.com/Muhammad-Hamza69/hamza-pipeline-rescue-aws");
  assert.equal(await page.locator('a[href="#"]').count(), 0, "No placeholder links");
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")).filter((href) => !document.getElementById(href.slice(1))));
  assert.deepEqual(brokenAnchors, []);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${screenshotDir}/portfolio-desktop.png` });
  checks.push("Public home, required sections, source link and all internal navigation targets");

  await page.getByRole("link", { name: /Hidden superpower/ }).click();
  const run = page.getByRole("button", { name: "Run pipeline", exact: true });
  assert.equal(await run.isDisabled(), true);
  await page.getByRole("button", { name: "Need a clue?" }).click();
  assert.match(await page.locator("#rescue-hint").innerText(), /retry should be safe/i);
  await page.getByRole("radio", { name: /Keep every message/ }).check();
  await run.click();
  assert.match(await page.getByRole("status").innerText(), /Not quite/);
  await page.getByRole("radio", { name: /Deduplicate by event ID/ }).check();
  await run.click();
  assert.match(await page.getByRole("status").innerText(), /\$77.00/);
  assert.equal(await page.getByTestId("personal-reveal").count(), 1);
  await page.locator("#pipeline-rescue").screenshot({ path: `${screenshotDir}/pipeline-rescue.png` });
  await page.getByRole("button", { name: /02 \/ Missing meaning/ }).click();
  await page.getByRole("radio", { name: /Validate and quarantine/ }).check();
  await run.click();
  assert.match(await page.getByRole("status").innerText(), /1 quarantined/);
  await page.getByRole("button", { name: /03 \/ Out of order/ }).click();
  await page.getByRole("radio", { name: /Sort by event time/ }).check();
  await run.click();
  assert.match(await page.locator("#pipeline-rescue").innerText(), /3 \/ 3 rescues complete/);
  await page.getByRole("button", { name: "Reset incident" }).click();
  assert.equal(await run.isDisabled(), true);
  assert.equal(await page.getByTestId("personal-reveal").count(), 0);
  checks.push("Creative feature: clue, incorrect patch, retry, all three successful transformations, personal reveals and reset");

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflow, false, `No horizontal page overflow at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/portfolio-mobile.png` });
  const menu = page.getByRole("button", { name: "Toggle menu" });
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.locator("#mobile-navigation").getByRole("link", { name: "Skills", exact: true }).click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert.equal(new URL(page.url()).hash, "#skills");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(new URL(page.url()).hash, "#skills", "Deep link survives refresh");
  await page.goto(`${base}/#pipeline-rescue`, { waitUntil: "networkidle" });
  await page.getByRole("radio", { name: /Deduplicate by event ID/ }).focus();
  await page.keyboard.press("Space");
  assert.equal(await page.getByRole("radio", { name: /Deduplicate by event ID/ }).isChecked(), true);
  await run.focus();
  await page.keyboard.press("Enter");
  assert.match(await page.getByRole("status").innerText(), /Pipeline recovered/);
  await page.locator("#pipeline-rescue").screenshot({ path: `${screenshotDir}/pipeline-rescue-mobile.png` });
  checks.push("320/390/768/1440px layouts, mobile menu, persistent deep links and keyboard operation");

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(base);
  assert.equal(await noJsPage.locator("#about").isVisible(), true);
  assert.equal(await noJsPage.locator("#work h2").isVisible(), true);
  await noJs.close();
  checks.push("Core portfolio remains readable with JavaScript disabled");
  assert.deepEqual(errors, [], "No browser runtime errors");
  await writeFile("docs/browser-verification.json", JSON.stringify({ url: base, checkedAt: new Date().toISOString(), checks, runtimeErrors: errors }, null, 2) + "\n");
  console.log(JSON.stringify({ result: "passed", checks, screenshots: screenshotDir }, null, 2));
} finally {
  await browser.close();
}
