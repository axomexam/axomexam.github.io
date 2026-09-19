#!/usr/bin/env node
/* ============================================================
   axomexam — tools/seo-indexing-fix.js

   Idempotent SEO/indexing repairs for the prerendered pages that
   are deployed from the repo root (run AFTER tools/enhance-meta.js).

   Fixes applied:

   1. Trailing-slash normalisation of internal links.
      GitHub Pages serves every directory route as /x/ and 301
      redirects /x -> /x/. The prerendered pages linked to /x
      while canonical/sitemap used /x/, producing thousands of
      unnecessary redirects ("Page with redirect" / "Redirect
      error" in Search Console). Every internal href and every
      axomexam.in JSON-LD URL is normalised to the canonical form.

   2. noindex for genuinely thin pages.
      Pages listed in NOINDEX below have no unique content (empty
      listing hubs / 1-5 question stubs). Google crawled and
      rejected them, and they drag down the site-wide quality
      signal, so they are explicitly set to "noindex, follow"
      until real content is added.

   3. Sitemap hygiene.
      Removes <changefreq>/<priority>, drops URLs that no longer
      exist on disk, drops the noindex routes, removes duplicates
      and guarantees a trailing slash on every <loc>.

   Usage:
     node tools/seo-indexing-fix.js --dry-run
     node tools/seo-indexing-fix.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://axomexam.in";
const DRY = process.argv.includes("--dry-run");

const SKIP_DIRS = new Set([
  ".git", "dist", "tools", "data", "js", "css",
  "node_modules", "images", "app",
]);

/* Routes that must not be indexed until they have real content. */
const NOINDEX = new Set([
  "/trending/",
  "/topic/trending/assam-gk-special/",
  "/topic/english/grammar-vocab/tenses/",
]);

/* -------------------- route discovery -------------------- */

function collectRoutes() {
  const routes = new Set(["/"]);
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      if (SKIP_DIRS.has(e.name)) continue;
      const full = path.join(dir, e.name);
      if (fs.existsSync(path.join(full, "index.html"))) {
        const rel = "/" + path.relative(ROOT, full).split(path.sep).join("/") + "/";
        routes.add(rel);
      }
      walk(full);
    }
  })(ROOT);
  return routes;
}

const ROUTES = collectRoutes();

function normalisePath(p) {
  if (!p.startsWith("/") || p.startsWith("//")) return p;
  if (p === "/") return p;
  if (p.endsWith("/")) return p;
  return ROUTES.has(p + "/") ? p + "/" : p;
}

function splitSuffix(v) {
  const m = /^([^?#]*)([?#].*)?$/.exec(v);
  return [m[1], m[2] || ""];
}

/* -------------------- per-file transforms -------------------- */

function processHtml(html) {
  let out = html;

  /* 1a. href="/..." -> trailing slash when it is a real route */
  out = out.replace(/href="([^"]*)"/g, (m, v) => {
    if (!v.startsWith("/") || v.startsWith("//")) return m;
    const [p, suffix] = splitSuffix(v);
    return `href="${normalisePath(p)}${suffix}"`;
  });

  /* 1b. absolute axomexam.in URLs inside JSON-LD (breadcrumb item etc.) */
  out = out.replace(/(https:\/\/axomexam\.in)(\/[^"'\s)]*)?/g, (m, host, p) => {
    if (!p) return host + "/";
    const [pp, suffix] = splitSuffix(p);
    return host + normalisePath(pp) + suffix;
  });

  return out;
}

function setRobots(html, content) {
  if (/<meta name="robots"[^>]*>/.test(html)) {
    return html.replace(
      /<meta name="robots"[^>]*>/,
      `<meta name="robots" content="${content}" />`
    );
  }
  return html;
}

/* -------------------- walk & apply -------------------- */

let changed = 0;
let scanned = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
      continue;
    }
    if (!e.name.endsWith(".html")) continue;
    const full = path.join(dir, e.name);
    const route = "/" + path.relative(ROOT, dir).split(path.sep).join("/") + "/";
    const isHome = full === path.join(ROOT, "index.html");
    scanned++;
    const before = fs.readFileSync(full, "utf8");
    let after = processHtml(before);
    if (NOINDEX.has(route)) after = setRobots(after, "noindex, follow");
    if (after !== before) {
      changed++;
      if (!DRY) fs.writeFileSync(full, after, "utf8");
    }
  }
}
walk(ROOT);

/* -------------------- sitemap -------------------- */

function buildSitemap() {
  const smPath = path.join(ROOT, "sitemap.xml");
  if (!fs.existsSync(smPath)) return null;
  const xml = fs.readFileSync(smPath, "utf8");
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  const seen = new Set();
  const kept = [];
  let dropped = 0;
  const lastmod = new Map();
  for (const b of blocks) {
    const locM = /<loc>([^<]+)<\/loc>/.exec(b);
    if (!locM) continue;
    let loc = locM[1].trim();
    const p = loc.replace(/^https?:\/\/[^/]+/, "");
    const [pp] = splitSuffix(p);
    const norm = normalisePath(pp);
    if (NOINDEX.has(norm)) { dropped++; continue; }
    if (norm !== "/" && !ROUTES.has(norm)) { dropped++; continue; }
    const key = BASE + norm;
    if (seen.has(key)) { dropped++; continue; }
    seen.add(key);
    const lm = /<lastmod>([^<]+)<\/lastmod>/.exec(b);
    kept.push({ loc: key, lastmod: lm ? lm[1] : null });
  }

  kept.sort((a, b) => a.loc.localeCompare(b.loc));
  const body = kept
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>` +
        (u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "") +
        `\n  </url>`
    )
    .join("\n");
  const out =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    body +
    `\n</urlset>\n`;
  return { out, kept: kept.length, dropped, total: blocks.length };
}

const sm = buildSitemap();
if (sm && !DRY) fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sm.out, "utf8");

/* -------------------- report -------------------- */

console.log(`${DRY ? "[DRY RUN] " : ""}SEO indexing fix`);
console.log(`  HTML scanned:   ${scanned}`);
console.log(`  HTML changed:   ${changed}`);
console.log(`  Routes known:   ${ROUTES.size}`);
if (sm) {
  console.log(`  Sitemap in:     ${sm.total} URLs`);
  console.log(`  Sitemap kept:   ${sm.kept} URLs`);
  console.log(`  Sitemap dropped:${sm.dropped} URLs`);
}
