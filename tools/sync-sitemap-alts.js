#!/usr/bin/env node
"use strict";

/*
 * tools/sync-sitemap-alts.js
 *
 * Keeps sitemap.xml honest about the English/Assamese twin pair.
 *
 * The book builders append only the English leaf route, so a page generated
 * after the last sitemap refresh lands without its three xhtml:link
 * alternates and its /as/ twin never lands at all. Search Console then sees
 * 125 English pages whose hreflang points at a URL that is not in the map,
 * and 125 Assamese pages that nothing advertises.
 *
 * This tool rebuilds the pairs from what is actually on disk:
 *   1. every sitemap URL that has an /as/ twin gets the en/as/x-default trio;
 *   2. every indexable /as/ twin missing from the map is inserted right after
 *      its English page, with its own lastmod and the same trio;
 *   3. noindex pages stay out of the map in both languages.
 *
 * Usage: node tools/sync-sitemap-alts.js [--check]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://axomexam.in";
const CHECK = process.argv.includes("--check");
const SITEMAP = path.join(ROOT, "sitemap.xml");

const NOINDEX_RE = /<meta\s+name="robots"\s+content="[^"]*noindex/i;

const toUrl = (relDir) => {
  const clean = relDir.replace(/\\/g, "/").replace(/^\./, "").replace(/\/$/, "");
  return `${BASE}${clean === "" ? "" : clean}/`;
};

const fileFor = (url) => path.join(ROOT, url.slice(BASE.length), "index.html");

function isIndexable(url) {
  const file = fileFor(url);
  if (!fs.existsSync(file)) return false;
  const html = fs.readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>") === -1 ? 4000 : html.indexOf("</head>"));
  return !NOINDEX_RE.test(head);
}

const lastmodOf = (url) => {
  const file = fileFor(url);
  if (!fs.existsSync(file)) return null;
  return new Date(fs.statSync(file).mtimeMs).toISOString().slice(0, 10);
};

function alternates(enUrl, asUrl) {
  return [
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="as" href="${asUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
  ].join("\n");
}

function block(url, lastmod, altText) {
  const lines = ["  <url>", `    <loc>${url}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (altText) lines.push(altText);
  lines.push("  </url>");
  return lines.join("\n");
}

const xml = fs.readFileSync(SITEMAP, "utf8");
const head = xml.slice(0, xml.indexOf("<url>")).replace(/[ \t]+$/, "");
const tail = xml.slice(xml.lastIndexOf("</urlset>"));
const rawBlocks = xml.slice(xml.indexOf("<url>"), xml.lastIndexOf("</urlset>"))
  .split(/(?=  <url>)/)
  .map((b) => b.trim())
  .filter(Boolean);

const locOf = (b) => {
  const m = /<loc>([^<]+)<\/loc>/.exec(b);
  return m ? m[1] : null;
};
const lastmodOfBlock = (b) => {
  const m = /<lastmod>([^<]+)<\/lastmod>/.exec(b);
  return m ? m[1] : null;
};

const present = new Set(rawBlocks.map(locOf).filter(Boolean));
const out = [];
let addedAlts = 0;
let addedTwins = 0;
let droppedNoindex = 0;

for (const b of rawBlocks) {
  const loc = locOf(b);
  if (!loc) continue;

  const isAs = loc.includes("/as/") || loc === `${BASE}/as/`;
  const enLoc = isAs ? loc.replace(`${BASE}/as`, BASE) : loc;
  const asLoc = isAs ? loc : loc.replace(BASE, `${BASE}/as`);

  if (!isIndexable(loc)) { droppedNoindex += 1; continue; }

  const hasTwin = isAs ? isIndexable(enLoc) : isIndexable(asLoc);

  const kept = b
    .replace(/\n[ \t]*<xhtml:link[^>]*\/>/g, "")
    .replace(/\n[ \t]*<\/url>/, `\n${hasTwin ? alternates(enLoc, asLoc) : ""}\n  </url>`)
    .replace(/\n\n  <\/url>/, "\n  </url>");

  if (hasTwin && !/<xhtml:link/.test(b)) addedAlts += 1;
  out.push(kept.replace(/\n{2,}/g, "\n").replace(/[ \t]+$/gm, ""));

  if (hasTwin && !present.has(asLoc)) {
    out.push(block(asLoc, lastmodOf(asLoc), alternates(enLoc, asLoc)));
    addedTwins += 1;
  }
}

const body = out.join("\n").replace(/^<url>/gm, "  <url>");
const rebuilt = `${head}${body}\n${tail}`;

if (CHECK) {
  const drift = rebuilt !== xml;
  console.log(`sitemap: ${present.size} urls | missing twins ${addedTwins} | missing alts ${addedAlts}`);
  console.log(drift ? "DRIFT: sitemap.xml is out of sync (run without --check)" : "OK: sitemap.xml is in sync");
  process.exit(drift ? 1 : 0);
}

fs.writeFileSync(SITEMAP, rebuilt);
console.log(`sitemap: ${present.size} urls in | ${out.length} out | +${addedTwins} twins | +${addedAlts} alt sets | -${droppedNoindex} noindex`);
