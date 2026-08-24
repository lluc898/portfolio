import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const homepage = await readFile(resolve(root, "dist/index.html"), "utf8");
const notFoundPage = await readFile(resolve(root, "dist/404.html"), "utf8");
const robots = await readFile(resolve(root, "dist/robots.txt"), "utf8");
const sitemap = await readFile(resolve(root, "dist/sitemap-0.xml"), "utf8");
const socialImage = await readFile(resolve(root, "dist/og-image.png"));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getMeta(html, attribute, value) {
  const tag = html
    .match(/<meta\b[^>]*>/g)
    ?.find((candidate) => candidate.includes(`${attribute}="${value}"`));

  return tag?.match(/content="([^"]*)"/)?.[1];
}

assert(homepage.includes('<link rel="canonical" href="https://llucbosch.com/">'), "Homepage canonical URL is missing.");
assert(getMeta(homepage, "name", "description"), "Meta description is missing.");
assert(getMeta(homepage, "name", "author") === "Lluc Bosch Ramis", "Author metadata is invalid.");

for (const property of ["og:title", "og:description", "og:url", "og:image", "og:image:alt"]) {
  assert(getMeta(homepage, "property", property), `${property} is missing.`);
}

assert(getMeta(homepage, "property", "og:image:type") === "image/png", "Open Graph image type is invalid.");
assert(getMeta(homepage, "property", "og:image:width") === "1200", "Open Graph image width is invalid.");
assert(getMeta(homepage, "property", "og:image:height") === "630", "Open Graph image height is invalid.");
assert(getMeta(homepage, "name", "twitter:card") === "summary_large_image", "Twitter card type is invalid.");
assert(getMeta(homepage, "name", "twitter:image:alt"), "Twitter image alt text is missing.");

const schemaMatch = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(schemaMatch, "Profile structured data is missing.");

const schema = JSON.parse(schemaMatch[1]);
assert(schema["@type"] === "ProfilePage", "Structured data must describe a ProfilePage.");
assert(schema.mainEntity?.["@type"] === "Person", "ProfilePage mainEntity must be a Person.");
assert(schema.mainEntity?.name === "Lluc Bosch Ramis", "Structured person name is invalid.");
assert(schema.mainEntity?.sameAs?.length >= 2, "Structured social profiles are incomplete.");

assert(getMeta(notFoundPage, "name", "robots") === "noindex, nofollow", "404 page must be noindex.");
assert(!notFoundPage.includes('type="application/ld+json"'), "404 page must not contain profile structured data.");
assert(robots.includes("Sitemap: https://llucbosch.com/sitemap-index.xml"), "robots.txt sitemap URL is invalid.");
assert(sitemap.includes("<loc>https://llucbosch.com</loc>"), "Homepage is missing from the sitemap.");
assert(socialImage.readUInt32BE(16) === 1200 && socialImage.readUInt32BE(20) === 630, "Social image must be 1200x630.");

console.log("SEO validation passed.");
