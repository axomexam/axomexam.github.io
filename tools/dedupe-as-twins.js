#!/usr/bin/env node
"use strict";

/*
 * tools/dedupe-as-twins.js
 *
 * Stops an Assamese twin from serving the English copy of its own body.
 *
 * tools/build-as-twins.js builds a /as/ page as a copy of the English markup.
 * Where a page ships *both* languages inside one document, the /as/ twin then
 * carried the English body verbatim and differed only in <title> and meta —
 * a near-duplicate that gave Google no reason to rank the Assamese URL. This
 * tool rebuilds the twin from the page's own Assamese data.
 *
 * Three passes, each scoped to exact paths:
 *
 *   1. E-book reader (/as/ebooks/<id>/) — drop the `<div lang="en">` wrapper
 *      holding the full English book. Marker: class="ebk-chapters".
 *
 *   2. Article reader (/as/category/articles/<cat>/read/) — rebuild the
 *      <article> Q&A list from data/content/articles/<cat>.json, Assamese
 *      fields only. The English question, answer and explanation are dropped,
 *      and the Assamese explanation is emitted (the English builder only ever
 *      wrote exp.en, so the Assamese one never reached the page).
 *
 *   3. Syllabus (/as/exams/<exam>/syllabus/) — the builder writes the whole
 *      syllabus twice, English then Assamese. Keep only the Assamese half,
 *      identified by the chapter heading whose text equals the JSON's
 *      title.as, and leave the trailing note paragraph in place.
 *
 * Safety:
 *   - Only files under /as/ are written; the English tree cannot change.
 *   - Every pass verifies that the page carries real Assamese text after the
 *     edit and skips the file otherwise — no page is left with an empty body.
 *   - Pass 2 refuses to run unless the static block order matches the JSON
 *     order item for item, so a stale page is never silently rewritten.
 *   - <title>, meta, canonical, hreflang, JSON-LD, breadcrumb and footer sit
 *     outside the edited regions and are untouched.
 *   - Visitors never see this markup: js/app.src.js re-renders <main> from
 *     data on load, so the static copy is the crawler / no-JS view.
 *
 * Idempotent: each pass detects its already-converted form and skips.
 *
 * Usage:
 *   node tools/dedupe-as-twins.js           # apply
 *   node tools/dedupe-as-twins.js --check   # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");

const HAS_ASSAMESE = /[\u0980-\u09FF]/;
const EBOOK_BODY_MARKER = 'class="ebk-chapters"';
const ARTICLE_OPEN = '<article style="max-width:860px; margin:0 auto;">';

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function write(abs, next) {
  if (CHECK) return "drift";
  fs.writeFileSync(abs, next);
  return "wrote";
}

/* ---------- shared: nesting-aware wrapper span ---------- */

function wrapperSpan(html, lang) {
  const open = new RegExp(`<div\\b[^>]*\\blang="${lang}"[^>]*>`, "i").exec(html);
  if (!open) return null;
  const tagRe = /<div\b[^>]*>|<\/div>/gi;
  tagRe.lastIndex = open.index + open[0].length;
  let depth = 1;
  let m;
  while ((m = tagRe.exec(html))) {
    if (m[0].slice(0, 2) === "</") {
      depth--;
      if (depth === 0) return { start: open.index, end: tagRe.lastIndex };
    } else {
      depth++;
    }
  }
  return null;
}

/* ---------- pass 1: e-book reader ---------- */

function dedupeEbook(abs) {
  const html = fs.readFileSync(abs, "utf8");
  const en = wrapperSpan(html, "en");
  if (!en) return "clean";

  const english = html.slice(en.start, en.end);
  if (!english.includes(EBOOK_BODY_MARKER)) return "skip";
  if (HAS_ASSAMESE.test(english)) return "skip";

  const rest = html.slice(0, en.start) + html.slice(en.end);
  const as = wrapperSpan(rest, "as");
  if (!as) return "skip";
  const assamese = rest.slice(as.start, as.end);
  if (!assamese.includes(EBOOK_BODY_MARKER) || !HAS_ASSAMESE.test(assamese)) return "skip";

  return write(abs, rest);
}

/* ---------- pass 2: article reader ---------- */

function articleBlocks(html) {
  const i = html.indexOf(ARTICLE_OPEN);
  if (i === -1) return null;
  const j = html.indexOf("</article>", i);
  if (j === -1) return null;
  const parts = html.slice(i, j).split(/(?=<div class="article-part-block")/);
  return { start: i, end: j + "</article>".length, blocks: parts.slice(1) };
}

function dedupeArticles(abs) {
  const html = fs.readFileSync(abs, "utf8");
  const cat = path.basename(path.dirname(path.dirname(abs)));
  const data = readJSON(path.join(ROOT, "data", "content", "articles", `${cat}.json`));
  if (!data || !Array.isArray(data.questions) || !data.questions.length) return "skip";
  const items = data.questions;
  if (items.some((it) => !(it.q && it.q.as && it.a && it.a.as))) return "skip";

  const art = articleBlocks(html);
  if (!art || !art.blocks.length) return "clean";
  /* Already converted: the English-only question paragraph is gone. */
  if (!/<p style="color:#64748b;">/.test(html.slice(art.start, art.end))) return "clean";
  if (art.blocks.length !== items.length) return "skip";

  /* Only rewrite when the static block order still matches the JSON, so a
     stale page is never silently rebuilt from different data. */
  const orderOk = art.blocks.every((b, k) => {
    const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(b);
    if (!h2) return false;
    const text = h2[1].replace(/<[^>]+>/g, "").replace(/^\s*\d+\.\s*/, "").trim();
    return text === String((items[k].q && items[k].q.en) || items[k].q || "");
  });
  if (!orderOk) return "skip";

  const rebuilt = items
    .map((it) => {
      const q = it.q.as;
      const a = it.a.as;
      const ex = (it.explanation && it.explanation.as) || "";
      return (
        `<div class="article-part-block" style="margin-bottom:26px;">\n` +
        `        <h2 style="font-size:1.2rem; font-weight:800; margin:0 0 10px 0;">${esc(q)}</h2>\n` +
        `        <p style="line-height:1.8;">${esc(a)}</p>\n` +
        (ex
          ? `        <div style="border-left:4px solid #2563eb; padding:10px 14px; margin-top:10px; background:#f8fafc;">${esc(ex)}</div>\n`
          : "") +
        `      </div>`
      );
    })
    .join("\n      ");

  if (!HAS_ASSAMESE.test(rebuilt)) return "skip";

  const next =
    html.slice(0, art.start) + ARTICLE_OPEN + rebuilt + "</article>" + html.slice(art.end);
  return write(abs, next);
}

/* ---------- pass 3: syllabus ---------- */

function dedupeSyllabus(abs) {
  const html = fs.readFileSync(abs, "utf8");
  const exam = path.basename(path.dirname(path.dirname(abs)));
  const data = readJSON(path.join(ROOT, "data", "exams", exam, "syllabus.json"));
  if (!data || !data.title || !data.title.as) return "skip";

  const open = /<article\b[^>]*class="info-panel"[^>]*>/.exec(html);
  if (!open) return "skip";
  const close = html.indexOf("</article>", open.index);
  if (close === -1) return "skip";
  const inner = html.slice(open.index + open[0].length, close);

  const cut = inner.indexOf(`<h3>${esc(data.title.as)}</h3>`);
  if (cut === -1) return "clean";
  /* Assamese half is already the only one when its heading is the first <h3>. */
  if (inner.indexOf("<h3>") === cut) return "clean";

  const note = inner.lastIndexOf('<p style="margin-top:22px;');
  if (note === -1 || note < cut) return "skip";

  const nextInner = inner.slice(cut, note) + inner.slice(note);
  if (!HAS_ASSAMESE.test(nextInner)) return "skip";

  const next = html.slice(0, open.index + open[0].length) + nextInner + html.slice(close);
  return write(abs, next);
}

/* ---------- pass 4: deep-article extra-content panel ---------- */

/* The deep-article injector writes a bilingual panel pair into a
   <section data-axo-extra="1"> block that follows `</main>` on every topic and
   exam page:
     <article|div lang="as" data-axo-lang="as" class="info-panel"> …Assamese…
     <article|div lang="en" data-axo-lang="en" class="info-panel"> …English…
   The Assamese twin copied both, so it served the full English article too.
   Drop the English panel, keeping the Assamese one. The wrapper is a <div> on
   most pages and an <article> on a few, so match either.

   The <section data-axo-editorial-credit="1"> block also holds a lang pair,
   but those panels follow the *interface* language toggle, so both halves must
   stay in the DOM and are never touched here. */
const DEEP_AS_OPEN = /<(article|div)\b[^>]*data-axo-lang="as"[^>]*class="info-panel"/g;
const DEEP_EN_OPEN = /<(article|div)\b[^>]*data-axo-lang="en"[^>]*class="info-panel"/g;
const EXTRA_OPEN = /<section\b[^>]*data-axo-extra="1"[^>]*>/;

/* [start,end) of the extra-content section, found by balancing <section>. */
function extraSection(html) {
  const m = EXTRA_OPEN.exec(html);
  if (!m) return null;
  const tagRe = /<section\b[^>]*>|<\/section>/g;
  tagRe.lastIndex = m.index + m[0].length;
  let depth = 1;
  let t;
  while ((t = tagRe.exec(html))) {
    if (t[0].slice(0, 2) === "</") {
      depth--;
      if (depth === 0) return { start: m.index, end: tagRe.lastIndex };
    } else depth++;
  }
  return null;
}

/* Spans of the info-panel elements of one language inside `html`. */
function panelSpans(html, re) {
  const out = [];
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(html))) {
    const close = `</${m[1]}>`;
    const j = html.indexOf(close, m.index);
    if (j === -1) continue;
    out.push({ start: m.index, end: j + close.length });
  }
  return out;
}

/* Question banks interleave Assamese option values into an otherwise English
   panel via inline <span lang="as"> nodes, and a few source articles carry a
   stray Assamese bullet. Neither makes the panel translated, so content is
   never used to decide. Inside the extra section the injector always writes the
   Assamese panel first, then the English one; if an Assamese panel is present
   the English sibling is redundant. */
function dedupeDeepPanel(abs) {
  let html = fs.readFileSync(abs, "utf8");
  let changed = false;

  for (;;) {
    const sec = extraSection(html);
    if (!sec) break;
    const body = html.slice(sec.start, sec.end);

    const as = panelSpans(body, DEEP_AS_OPEN)[0];
    if (!as || !HAS_ASSAMESE.test(body.slice(as.start, as.end))) break;

    const en = panelSpans(body, DEEP_EN_OPEN)[0];
    if (!en) break;

    /* Take the leading newline/indentation with the block so the file keeps
       its shape. */
    let start = sec.start + en.start;
    while (start > 0 && (html[start - 1] === " " || html[start - 1] === "\n")) start--;
    html = html.slice(0, start) + "\n" + html.slice(sec.start + en.end);
    changed = true;
  }

  if (!changed) return "clean";
  return write(abs, html);
}

/* ---------- drivers ---------- */

function allAsPages() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs);
      else if (e.name === "index.html") out.push(abs);
    }
  })(path.join(ROOT, "as"));
  return out.sort();
}

function readerPages(base) {
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(base, e.name, "index.html"))
    .filter((p) => fs.existsSync(p))
    .sort();
}

const jobs = [
  { label: "ebook", run: dedupeEbook, files: readerPages(path.join(ROOT, "as", "ebooks")) },
  {
    label: "article",
    run: dedupeArticles,
    files: ["computer", "english", "gk", "math", "reasoning", "science"]
      .map((c) => path.join(ROOT, "as", "category", "articles", c, "read", "index.html"))
      .filter((p) => fs.existsSync(p)),
  },
  {
    label: "syllabus",
    run: dedupeSyllabus,
    files: ["adre-grade-3", "adre-grade-4", "assam-police"]
      .map((e) => path.join(ROOT, "as", "exams", e, "syllabus", "index.html"))
      .filter((p) => fs.existsSync(p)),
  },
  { label: "deep-panel", run: dedupeDeepPanel, files: allAsPages() },
];

let drift = 0;
let wrote = 0;
let skipped = 0;

for (const job of jobs) {
  const before = wrote + drift + skipped;
  console.log(`\n${job.label} (${job.files.length})`);
  for (const abs of job.files) {
    const result = job.run(abs);
    const rel = path.relative(ROOT, abs);
    if (result === "wrote" || result === "drift") {
      console.log(`  ${result.toUpperCase()}  ${rel}`);
      result === "drift" ? drift++ : wrote++;
    } else {
      skipped++;
      /* "clean" is the expected steady state; log anything else so a page that
         cannot be converted is visible. */
      if (result !== "clean") console.log(`  skip (${result})  ${rel}`);
    }
  }
  if (job.files.length > 20 && wrote + drift + skipped === before) {
    console.log(`  (all ${job.files.length} already converted)`);
  }
}

console.log(`\n${wrote} written, ${drift} need updating, ${skipped} skipped.`);
if (CHECK) process.exit(drift ? 1 : 0);
