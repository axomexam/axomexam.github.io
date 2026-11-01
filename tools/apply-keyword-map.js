#!/usr/bin/env node
"use strict";

/*
 * tools/apply-keyword-map.js
 *
 * Writes the keyword map into the committed pages. For every row of
 * keyword-map.csv with a non-empty suggestion it rewrites, in the page's
 * existing markup, only:
 *
 *   <title>                      -> suggested_title
 *   <meta name="description">    -> suggested_meta
 *   <meta property="og:title">   -> suggested_title
 *   <meta property="og:description"> -> suggested_meta
 *   <meta name="twitter:title">  -> suggested_title
 *   <meta name="twitter:description"> -> suggested_meta
 *   <h1>…</h1> (first one)       -> suggested_h1
 *   <meta name="keywords">       -> primary + secondary (added if absent)
 *
 * Nothing else changes: canonical, robots, JSON-LD, links, body text and
 * attribute order all stay byte-identical. Run tools/build-keyword-map.js
 * first so the CSV is current.
 *
 * Usage:
 *   node tools/apply-keyword-map.js --check   # report drift, write nothing
 *   node tools/apply-keyword-map.js           # apply
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KMAP = path.join(ROOT, "keyword-map.csv");
const CHECK = process.argv.includes("--check");

function readCsv(p) {
  const text = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  const rows = [];
  let field = "", row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift();
  return rows.filter((r) => r.length && r.some((c) => c !== "")).map((r) => {
    const o = {};
    header.forEach((h, i) => (o[h] = r[i] == null ? "" : r[i]));
    return o;
  });
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const unescapeHtml = (s) => String(s).replace(/&(#?\w+);/g, (m, e) => (e in ENTITIES ? ENTITIES[e] : m));
/* Values in the CSV are plain text; the head carries entities only for & < > " */
const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Replace the text of the first <tag ...>…</tag> that matches `open`, keeping
   the original opening tag untouched. Returns the new HTML, or null if absent. */
function replaceElementText(html, openRe, newText) {
  const m = html.match(openRe);
  if (!m) return null;
  const start = m.index;
  const openEnd = html.indexOf(">", start) + 1;
  const closeRe = new RegExp(`</${m[1]}>`, "i");
  const rest = html.slice(openEnd);
  const cm = rest.match(closeRe);
  if (!cm) return null;
  const end = openEnd + cm.index;
  return html.slice(0, openEnd) + newText + html.slice(end);
}

/* Replace the content="…" of the first <meta> whose attribute list contains
   every marker in `markers`. */
function replaceMetaContent(html, markers, newValue) {
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (markers.every((k) => tag.toLowerCase().includes(k))) {
      const cm = tag.match(/content="([^"]*)"/i);
      if (!cm) return html;
      const replaced = tag.replace(cm[0], `content="${escapeAttr(newValue)}"`);
      return html.slice(0, m.index) + replaced + html.slice(m.index + tag.length);
    }
  }
  return html;
}

function hasMeta(html, markers) {
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (markers.every((k) => m[0].toLowerCase().includes(k))) return true;
  }
  return false;
}

/* Insert a <meta> right after </title>, indented like the title line. */
function insertAfterTitle(html, tag) {
  const m = html.match(/<title[^>]*>[\s\S]*?<\/title>/i);
  if (!m) return html;
  const end = m.index + m[0].length;
  return html.slice(0, end) + "\n  " + tag + html.slice(end);
}

const rows = readCsv(KMAP);
let changed = 0, skipped = 0;
const changedPaths = [];

for (const r of rows) {
  if (!r.suggested_title && !r.suggested_meta) { skipped++; continue; }
  const abs = path.join(ROOT, r.path);
  if (!fs.existsSync(abs)) continue;
  let html = fs.readFileSync(abs, "utf8");
  const before = html;

  if (r.suggested_title) {
    const t = replaceElementText(html, /<(title)[\s>]/i, escapeAttr(r.suggested_title));
    if (t) html = t;
    html = replaceMetaContent(html, ['property="og:title"'], r.suggested_title);
    html = replaceMetaContent(html, ['name="twitter:title"'], r.suggested_title);
  }
  if (r.suggested_meta) {
    if (hasMeta(html, ['name="description"'])) {
      html = replaceMetaContent(html, ['name="description"'], r.suggested_meta);
    } else {
      html = insertAfterTitle(html, `<meta name="description" content="${escapeAttr(r.suggested_meta)}" />`);
    }
    html = replaceMetaContent(html, ['property="og:description"'], r.suggested_meta);
    html = replaceMetaContent(html, ['name="twitter:description"'], r.suggested_meta);
  }
  if (r.suggested_h1) {
    const h = replaceElementText(html, /<(h1)[\s>]/i, escapeAttr(r.suggested_h1));
    if (h) html = h;
  }
  if (r.primary_kw) {
    const kw = [r.primary_kw, r.secondary_kw].filter(Boolean).join(", ");
    const tag = `<meta name="keywords" content="${escapeAttr(kw)}" />`;
    if (hasMeta(html, ['name="keywords"'])) {
      html = replaceMetaContent(html, ['name="keywords"'], kw);
    } else if (hasMeta(html, ['name="description"'])) {
      html = html.replace(/(<meta name="description"[^>]*>)/i, `$1\n  ${tag}`);
    } else {
      html = insertAfterTitle(html, tag);
    }
  }

  if (html !== before) {
    changed++;
    changedPaths.push(r.path);
    if (!CHECK) fs.writeFileSync(abs, html);
  }
}

console.log(`apply-keyword-map: ${changed} pages ${CHECK ? "would change" : "changed"}, ${skipped} skipped (no suggestion)`);
if (CHECK && changedPaths.length) {
  console.log("first 10:", changedPaths.slice(0, 10).join("\n           "));
}
