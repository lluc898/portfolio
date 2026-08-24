import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "dist");
const pages = [
  { path: "/", file: "index.html" },
  { path: "/404", file: "404.html" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function attribute(markup, name) {
  return markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function localTargetExists(target) {
  const url = new URL(target, "https://llucbosch.com");
  const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const candidates = url.pathname === "/"
    ? ["index.html"]
    : [relativePath, `${relativePath}.html`, `${relativePath}/index.html`];

  return candidates.some((candidate) => existsSync(resolve(dist, candidate)));
}

const loadedPages = await Promise.all(
  pages.map(async (page) => ({ ...page, html: await readFile(resolve(dist, page.file), "utf8") })),
);

for (const page of loadedPages) {
  const ids = new Set([...page.html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const links = [...page.html.matchAll(/<(?:a|link)\b[^>]*\bhref="([^"]+)"[^>]*>/g)];

  for (const [, href] of links) {
    assert(href.trim(), `${page.file} contains an empty link.`);

    if (href.startsWith("#")) {
      assert(ids.has(href.slice(1)), `${page.file} points to a missing anchor: ${href}`);
      continue;
    }

    if (href.startsWith("mailto:")) {
      assert(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(href), `${page.file} contains an invalid email link.`);
      continue;
    }

    const url = new URL(href, "https://llucbosch.com");
    if (url.origin === "https://llucbosch.com") {
      assert(localTargetExists(href), `${page.file} points to a missing local resource: ${href}`);
    }
  }

  for (const match of page.html.matchAll(/<a\b[^>]*>/g)) {
    const anchor = match[0];
    if (attribute(anchor, "target") !== "_blank") continue;

    const rel = new Set((attribute(anchor, "rel") ?? "").split(/\s+/));
    assert(rel.has("noopener") && rel.has("noreferrer"), `External link is missing rel protection: ${anchor}`);
  }
}

const homepage = loadedPages[0].html;
for (const requiredHref of [
  "#proyectos",
  "/cv-lluc-bosch-ramis.pdf",
  "mailto:lluc.bosch@gmail.com",
  "https://www.linkedin.com/in/lluc-bosch-ramis-80959b213/",
  "https://github.com/lluc898",
  "https://github.com/lluc898/neonweb",
  "https://neonledspain.llucbosch.com/",
]) {
  assert(homepage.includes(`href="${requiredHref}"`), `Required conversion link is missing: ${requiredHref}`);
}

assert(
  /<a\b[^>]*href="\/cv-lluc-bosch-ramis\.pdf"[^>]*download[^>]*>/.test(homepage),
  "The CV link must retain its download behavior.",
);

console.log("Link and CTA validation passed.");
