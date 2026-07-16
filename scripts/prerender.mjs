/**
 * Post-build prerender: serves dist/, renders every route in headless Chrome
 * and writes the resulting HTML back to dist/<route>/index.html.
 *
 * Search engines then get full content (text, meta, canonical, hreflang,
 * JSON-LD) without executing JavaScript. The SPA still hydrates on load.
 *
 * Keep ROUTES in sync with src/utils/routes.ts and public/sitemap.xml.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const DIST = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../dist"
);

const ROUTES = [
  "/",
  "/galeria",
  "/cennik",
  "/o-nas",
  "/kontakt",
  "/mobilny-bar-poznan",
  "/mobilny-bar-wroclaw",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

// The pristine Vite output — served for every route so each page renders
// from the empty SPA shell, not from an already-prerendered snapshot.
const template = await readFile(path.join(DIST, "index.html"));

// Static file server over dist/ with SPA fallback to the cached template.
const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  try {
    if (urlPath === "/" || urlPath === "/index.html") {
      res.writeHead(200, { "content-type": MIME[".html"] });
      res.end(template);
      return;
    }
    const filePath = path.join(DIST, urlPath);
    let body;
    let ext = path.extname(filePath);
    try {
      body = await readFile(filePath);
    } catch {
      body = template;
      ext = ".html";
    }
    res.writeHead(200, {
      "content-type": MIME[ext] ?? "application/octet-stream",
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
console.log(`Prerender server on http://127.0.0.1:${port} (dist: ${DIST})`);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  for (const route of ROUTES) {
    const url = `http://127.0.0.1:${port}${route}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
    await page.waitForSelector("h1", { timeout: 15_000 });
    // Let entrance animations (~0.8s) settle so opacity is baked at 1.
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const textLength = await page.evaluate(
      () => document.body.innerText.trim().length
    );
    if (textLength < 200) {
      throw new Error(
        `Prerender of ${route} produced almost no text (${textLength} chars) — page failed to render.`
      );
    }

    const html = await page.evaluate(
      () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
    );

    const outFile =
      route === "/"
        ? path.join(DIST, "index.html")
        : path.join(DIST, route.slice(1), "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    console.log(
      `✓ ${route} → ${path.relative(DIST, outFile)} (${textLength} chars of text)`
    );
  }
} finally {
  await browser.close();
  server.close();
}

console.log("Prerender complete.");
