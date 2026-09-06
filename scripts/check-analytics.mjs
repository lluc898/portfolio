import { readFile } from "node:fs/promises";
import { join } from "node:path";

const pages = ["index.html", "en/index.html", "404.html"];

for (const page of pages) {
  const html = await readFile(join("dist", page), "utf8");

  if (!html.includes("<vercel-analytics")) {
    throw new Error(`Vercel Analytics component is missing from dist/${page}.`);
  }

  if (!html.includes("/_vercel/insights/script.js")) {
    throw new Error(`Vercel Analytics script endpoint is missing from dist/${page}.`);
  }
}

console.log("Vercel Analytics integration validation passed.");
