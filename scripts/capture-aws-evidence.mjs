import { readFile, writeFile, mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const evidence = JSON.parse((await readFile("docs/aws-deployment.json", "utf8")).replace(/^\uFEFF/, ""));
if (evidence.job.status !== "SUCCEED") throw new Error("Record a successful AWS deployment first.");
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>AWS deployment evidence — Pipeline Rescue</title><style>body{margin:0;background:#080d18;color:#e4e4e7;font:16px/1.6 system-ui,sans-serif}main{max-width:1100px;margin:50px auto;padding:40px;border:1px solid #263244;border-radius:20px;background:#0d1422}h1{margin:8px 0;font-size:36px;color:white}.badge{color:#6ee7b7;letter-spacing:2px;font-size:13px}a{color:#93c5fd}p{color:#a1a1aa}pre{padding:24px;border-radius:12px;background:#050910;white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.7 monospace}.note{font-size:13px}strong{color:white}</style><main><span class="badge">AWS AMPLIFY HOSTING / DEPLOYMENT SUCCEEDED</span><h1>Pipeline Rescue: AWS setup evidence</h1><p><strong>Live portfolio:</strong> <a href="${escape(evidence.url)}">${escape(evidence.url)}</a><br><strong>Region:</strong> ${escape(evidence.region)} · <strong>App:</strong> ${escape(evidence.app.name)}</p><p class="note">This report displays sanitized data returned by real AWS CLI calls. It is a project-generated configuration report, not the AWS Console. Account identity, credentials and upload URLs are excluded.</p><pre>${escape(JSON.stringify(evidence, null, 2))}</pre></main></html>`;
await mkdir("docs/screenshots", { recursive: true });
await writeFile("docs/aws-setup-evidence.html", html);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1360, height: 1100 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.screenshot({ path: "docs/screenshots/aws-setup.png", fullPage: true });
} finally { await browser.close(); }
console.log("Captured docs/screenshots/aws-setup.png from real AWS CLI configuration/job data.");
