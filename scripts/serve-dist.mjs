import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const host = "127.0.0.1";
const port = 4323;
const dist = resolve(process.cwd(), "dist");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function candidates(pathname) {
  if (pathname === "/") return [resolve(dist, "index.html")];

  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  const target = resolve(dist, relativePath);
  return [target, `${target}.html`, resolve(target, "index.html")];
}

async function findFile(pathname) {
  for (const candidate of candidates(pathname)) {
    if (candidate !== dist && !candidate.startsWith(`${dist}${sep}`)) continue;

    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next static-file candidate.
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url ?? "/", `http://${host}:${port}`).pathname;
    const file = await findFile(pathname);

    if (!file) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const body = await readFile(file);
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": contentTypes[extname(file)] ?? "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Internal server error");
  }
});

server.listen(port, host);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
