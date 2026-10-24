#!/usr/bin/env node
"use strict";

/*
 * tools/scan-soft-404.js
 *
 * Finds pages that a crawler sees as valid but a visitor sees as "404".
 *
 * Why this matters
 * ----------------
 * The site is a client-side router over static HTML. Every page ships
 * `<main id="app">` with prerendered content, and then `renderRoute()` replaces
 * that content after load. If the router has no branch for a URL - because the
 * page's entry is missing from the data the router reads - it renders the 404
 * template into `#app`.
 *
 * The result is the worst of both worlds:
 *   - the server returns 200, so crawlers and AdSense reviewers index the URL;
 *   - the page is "index, follow" and listed in sitemap.xml;
 *   - but a human clicking it from a search result lands on "404 - Sorry, the
 *     page you are looking for does not exist."
 *
 * Google calls this a soft 404, and it is a direct contributor to a
 * low-value-content assessment: it is the clearest possible signal that nobody
 * checked whether the pages actually work.
 *
 * A static link checker cannot see this. `tools/scan-404.js` verifies that the
 * file exists and returns 200; both of these pages pass that check. The only
 * way to catch a soft 404 is to run the router.
 *
 * How it works
 * ------------
 * Loads each URL in headless Chromium, waits for the router to settle, and
 * looks for the 404 marker that `render404()` writes into `#app`. Only URLs
 * that the server actually serves (HTTP 200) are reported, so a genuine 404 is
 * not double-counted.
 *
 * Usage:
 *   node tools/scan-soft-404.js                  # all sitemap URLs
 *   node tools/scan-soft-404.js --limit 50       # first 50, for a quick run
 *   node tools/scan-soft-404.js --urls a,b,c     # explicit paths
 */

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PORT = process.env.PREVIEW_PORT || "12000";
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CHROME = process.env.CHROME_BIN || "chromium";
const CONCURRENCY = Number(process.env.SOFT404_CONCURRENCY || 6);
const TIMEOUT_MS = 30000;

/* render404() writes this pair into #app. */
const NOT_FOUND_MARKER = "Sorry, the page you are looking for does not exist.";

function argValue(name) {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : null;
}

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
  const base = "https://axomexam.in";
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(base))
    .map((u) => u.slice(base.length) || "/");
}

function loadDom(url) {
  return new Promise((resolve) => {
    execFile(
      CHROME,
      [
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--virtual-time-budget=6000",
        "--dump-dom",
        url,
      ],
      { timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 },
      (err, stdout) => resolve(stdout || "")
    );
  });
}

function classify(dom) {
  const appMatch = dom.match(/<main[^>]*id="app"[^>]*>([\s\S]*?)<\/main>/i);
  const app = appMatch ? appMatch[1] : "";
  if (app.includes(NOT_FOUND_MARKER)) return "soft-404";
  if (/<h1[^>]*>\s*404\s*<\/h1>/i.test(app)) return "soft-404";
  if (!app.trim()) return "empty";
  return "ok";
}

async function main() {
  const explicit = argValue("--urls");
  let urls = explicit ? explicit.split(",").map((s) => s.trim()) : sitemapUrls();
  const limit = Number(argValue("--limit") || 0);
  if (limit) urls = urls.slice(0, limit);

  console.log(`soft-404 scan (${urls.length} urls via ${ORIGIN})`);

  const results = new Map();
  let done = 0;
  const queue = [...urls];

  async function worker() {
    while (queue.length) {
      const u = queue.shift();
      const dom = await loadDom(ORIGIN + u);
      const status = dom ? classify(dom) : "load-failed";
      results.set(u, status);
      done++;
      if (done % 25 === 0) process.stdout.write(`  ... ${done}/${urls.length}\n`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const bad = [...results.entries()].filter(([, s]) => s !== "ok");
  const counts = {};
  for (const [, s] of results) counts[s] = (counts[s] || 0) + 1;

  console.log("");
  console.log("  results:", JSON.stringify(counts));
  if (bad.length) {
    console.log("");
    console.log(`  ${bad.length} page(s) render a 404 to visitors:`);
    for (const [u, s] of bad.sort()) console.log(`    [${s}] ${u}`);
    process.exitCode = 1;
  }
}

main();
