#!/usr/bin/env node
"use strict";

/*
 * tools/build-page-actions.js
 *
 * Turns keyword-map.csv into page-actions.csv — the per-page task list that
 * says exactly what to change on each of the site's indexable pages.
 *
 * One row per page. The `tasks` column is a "+"-joined set of flags:
 *
 *   TITLE      suggested title differs from the committed <title>
 *   META       suggested description differs from the committed meta
 *   H1         suggested H1 differs from the committed <h1>
 *   H1-MISSING the page has no <h1> at all
 *   H2-ADD     the page has fewer than 2 <h2> and its prose block is short of
 *              3 <h3> headings, so it has no scannable sub-headings
 *   THIN       fewer than 300 words of visible text (404 and /search/ exempt)
 *   NOINDEX    the page carries <meta name="robots" content="noindex…">
 *   SCHEMA     the page carries no application/ld+json block
 *   OK         nothing to do
 *
 * Runs after tools/build-keyword-map.js. Read-only with respect to page HTML.
 *
 * Usage:
 *   node tools/build-page-actions.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const KMAP = path.join(ROOT, "keyword-map.csv");
const OUT = path.join(ROOT, "page-actions.csv");

const THIN_WORDS = 300;
const EXEMPT = new Set(["404.html", "search/index.html"]);

function readCsv(p) {
  const text = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  const rows = [];
  let field = "";
  let row = [];
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += ch;
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

function csvCell(v) {
  const s = String(v == null ? "" : v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const unescapeHtml = (s) => String(s).replace(/&(#?\w+);/g, (m, e) => (e in ENTITIES ? ENTITIES[e] : m));

function textOf(html) {
  return unescapeHtml(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ").trim();
}

function visibleWords(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const extra = html.match(/<section[^>]*data-axo-extra="1"[^>]*>([\s\S]*?)<\/section>/i);
  const scope = (main ? main[1] : "") + " " + (extra ? extra[1] : "");
  return textOf(scope).split(/\s+/).filter(Boolean).length;
}

function count(html, tag) {
  return (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
}

/* Headings that describe the page's content live inside <main> and the
   prerendered prose block; nav/footer headings do not count. */
function contentScope(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const extra = html.match(/<section[^>]*data-axo-extra="1"[^>]*>([\s\S]*?)<\/section>/i);
  return (main ? main[1] : "") + "\n" + (extra ? extra[1] : "");
}

function firstH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? unescapeHtml(m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()) : "";
}

function metaDesc(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? unescapeHtml(m[1]) : "";
}

function titleOf(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? unescapeHtml(m[1].replace(/\s+/g, " ").trim()) : "";
}

const kmap = readCsv(KMAP);

const out = [];
for (const r of kmap) {
  const abs = path.join(ROOT, r.path);
  const html = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
  const words = visibleWords(html);
  const scope = contentScope(html);
  const h1n = count(html, "h1");
  const h2n = count(scope, "h2");
  const h3n = count(scope, "h3");

  const titleNow = titleOf(html);
  const metaNow = metaDesc(html);
  const h1Now = firstH1(html);
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const hasSchema = /application\/ld\+json/i.test(html);

  const tasks = [];
  if (!EXEMPT.has(r.path)) {
    if (r.suggested_title && r.suggested_title !== titleNow) tasks.push("TITLE");
    if (r.suggested_meta && r.suggested_meta !== metaNow) tasks.push("META");
    if (r.suggested_h1 && r.suggested_h1 !== h1Now) tasks.push("H1");
    if (h1n === 0) tasks.push("H1-MISSING");
    if (h2n + h3n < 3) tasks.push("H2-ADD");
    if (words < THIN_WORDS) tasks.push("THIN");
    if (noindex) tasks.push("NOINDEX");
    if (!hasSchema) tasks.push("SCHEMA");
  }

  out.push({
    path: r.path,
    section: r.section,
    words_now: words,
    title_now: titleNow,
    title_len_now: titleNow.length,
    title_new: r.suggested_title,
    meta_len_now: metaNow.length,
    meta_new: r.suggested_meta,
    h1_now: h1Now,
    h1_new: r.suggested_h1,
    h2_new: r.suggested_h2,
    primary_kw: r.primary_kw,
    tasks: tasks.length ? tasks.join("+") : "OK",
  });
}

const cols = ["path", "section", "words_now", "title_now", "title_len_now", "title_new",
  "meta_len_now", "meta_new", "h1_now", "h1_new", "h2_new", "primary_kw", "tasks"];
const lines = [cols.join(",")];
for (const r of out) lines.push(cols.map((c) => csvCell(r[c])).join(","));
fs.writeFileSync(OUT, lines.join("\n") + "\n");

const tally = {};
for (const r of out) for (const t of r.tasks.split("+")) tally[t] = (tally[t] || 0) + 1;
console.log(`build-page-actions: ${out.length} rows -> ${path.relative(ROOT, OUT)}`);
for (const k of ["TITLE", "META", "H1", "H1-MISSING", "H2-ADD", "THIN", "NOINDEX", "SCHEMA", "OK"]) {
  console.log(`  ${k.padEnd(11)}: ${tally[k] || 0}`);
}
