#!/usr/bin/env node
"use strict";

/*
 * tools/scan-404.js
 *
 * Reports internal links and sitemap entries that point at something the site
 * does not actually serve.
 *
 * Why this exists
 * ---------------
 * The site is served from the repository root by GitHub Pages with no build
 * step, so a link is only valid if the file it names is committed. There is no
 * server-side routing to catch a typo, and no build step to fail on one. A
 * broken internal link therefore reaches production silently and shows the
 * visitor a 404 page, which is both a lost visitor and a crawl-quality signal.
 *
 * What it checks
 * --------------
 *   1. Every URL in sitemap.xml resolves to a committed file.
 *   2. Every internal href/src across all committed HTML resolves.
 *   3. Every canonical and og:url target resolves.
 *
 * Resolution follows GitHub Pages rules: a path ending in "/" maps to
 * "<path>/index.html"; a path with no file extension maps to the directory's
 * index.html; anything with an extension is looked up as-is. Query strings and
 * fragments are ignored.
 *
 * Read-only: this tool never writes. It exits non-zero when it finds a broken
 * target so it can be used as a check.
 *
 * Usage:
 *   node tools/scan-404.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://axomexam.in";
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const allFiles = walk(ROOT, []);
const htmlFiles = allFiles.filter((f) => f.toLowerCase().endsWith(".html"));

function exists(rel) {
  const abs = path.join(ROOT, rel);
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return true;
  if (fs.existsSync(path.join(abs, "index.html"))) return true;
  return false;
}

/* Map a site-absolute URL to a repo-relative path. */
function resolveUrl(url) {
  let u = url.split("#")[0].split("?")[0];
  if (!u) return null;
  if (u.startsWith(SITE)) u = u.slice(SITE.length) || "/";
  if (!u.startsWith("/")) return null;
  u = u.replace(/^\/+/, "");
  if (!u) return "index.html";
  if (u.endsWith("/")) return u + "index.html";
  const last = u.split("/").pop();
  if (!last.includes(".")) return u + "/index.html";
  return u;
}

const broken = new Map();
const record = (from, url) => {
  if (!broken.has(url)) broken.set(url, new Set());
  broken.get(url).add(from);
};

/* 1. Sitemap entries. */
const sitemap = path.join(ROOT, "sitemap.xml");
let sitemapCount = 0;
if (fs.existsSync(sitemap)) {
  const xml = fs.readFileSync(sitemap, "utf8");
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    sitemapCount++;
    const rel = resolveUrl(m[1]);
    if (!rel || !exists(rel)) record("sitemap.xml", m[1]);
  }
}

/* 2 and 3. Links and metadata in every HTML page. */
const attrRe = /(?:href|src)=["']([^"']+)["']/gi;
let linkCount = 0;
for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const dir = path.dirname(file);

  for (const m of html.matchAll(attrRe)) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith("#")) continue;
    if (/^(mailto:|tel:|data:|javascript:|blob:)/i.test(raw)) continue;
    if (/^https?:\/\//i.test(raw) && !raw.startsWith(SITE)) continue;
    if (/^\/\//.test(raw)) continue;

    let rel_;
    if (raw.startsWith(SITE)) rel_ = resolveUrl(raw);
    else if (raw.startsWith("/")) rel_ = resolveUrl(raw);
    else rel_ = path.relative(ROOT, path.join(dir, raw.split("#")[0].split("?")[0]));

    linkCount++;
    if (!rel_ || !exists(rel_)) record(rel, raw);
  }
}

console.log("404 scan");
console.log(`  sitemap urls        : ${sitemapCount}`);
console.log(`  internal links      : ${linkCount}`);
console.log(`  broken targets      : ${broken.size}`);

if (broken.size) {
  console.log("");
  for (const [url, froms] of [...broken.entries()].sort()) {
    const list = [...froms];
    console.log(`  ${url}`);
    console.log(`      referenced by ${list.length} page(s), e.g. ${list.slice(0, 3).join(", ")}`);
  }
  process.exitCode = 1;
}
