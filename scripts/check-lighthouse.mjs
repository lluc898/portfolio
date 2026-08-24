import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const port = 4324;
const url = `http://127.0.0.1:${port}/`;
const categoryBudgets = {
  performance: 0.95,
  accessibility: 1,
  "best-practices": 1,
  seo: 1,
};

async function waitForServer(server) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) throw new Error("The Lighthouse static server exited before becoming ready.");

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(100);
  }

  throw new Error("Timed out while starting the Lighthouse static server.");
}

const server = spawn(process.execPath, ["scripts/serve-dist.mjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

let chrome;

try {
  await waitForServer(server);
  chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  const result = await lighthouse(url, {
    logLevel: "error",
    onlyCategories: Object.keys(categoryBudgets),
    output: "json",
    port: chrome.port,
  });

  if (!result) throw new Error("Lighthouse did not return an audit result.");

  const failures = [];
  for (const [category, minimum] of Object.entries(categoryBudgets)) {
    const score = result.lhr.categories[category]?.score ?? 0;
    console.log(`${category}: ${Math.round(score * 100)}`);
    if (score < minimum) failures.push(`${category} must score at least ${Math.round(minimum * 100)}`);
  }

  const lcp = result.lhr.audits["largest-contentful-paint"].numericValue;
  const cls = result.lhr.audits["cumulative-layout-shift"].numericValue;
  console.log(`largest-contentful-paint: ${Math.round(lcp)} ms`);
  console.log(`cumulative-layout-shift: ${cls.toFixed(3)}`);

  if (lcp > 2_500) failures.push("largest-contentful-paint must not exceed 2500 ms");
  if (cls > 0.1) failures.push("cumulative-layout-shift must not exceed 0.1");

  if (failures.length > 0) throw new Error(`Lighthouse budgets failed:\n- ${failures.join("\n- ")}`);
} finally {
  try {
    chrome?.kill();
  } catch (error) {
    const isWindowsTempCleanupError = process.platform === "win32" && error?.code === "EPERM";
    if (!isWindowsTempCleanupError) throw error;
    console.warn("Chrome closed, but Windows delayed removal of its temporary Lighthouse profile.");
  } finally {
    server.kill();
  }
}
