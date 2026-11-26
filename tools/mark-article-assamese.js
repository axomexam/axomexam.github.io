#!/usr/bin/env node
"use strict";

/*
 * tools/mark-article-assamese.js
 *
 * The served /category/<cat>/<sub>/read/ pages were committed before
 * tools/prerender.js learned to name the Assamese text of every article part.
 * The committed copies carry AdSense, gtag and hand-written descriptions that
 * the prerender output does not, so they cannot simply be regenerated. This
 * tool rewrites only the article body in place, from data/content/articles/
 * <sub>.json, using the same markup the prerender now emits:
 *
 *   <h2 data-axo-as="…">English question</h2>
 *   <p class="article-q-as" lang="as">Assamese question</p>
 *   <p data-axo-as="…">English answer</p>
 *   <p class="article-a-as" lang="as">Assamese answer</p>
 *   <div data-axo-as="…">English explanation</div>
 *   <div class="article-exp-as" lang="as">Assamese explanation</div>
 *
 * tools/build-as-twins.js swaps data-axo-as in and drops the `-as` copies, so
 * the Assamese URL serves the Assamese article instead of the English one.
 *
 * Idempotent: a page whose body already matches the generated markup is left
 * alone.
 *
 * Usage:
 *   node tools/mark-article-assamese.js            # apply
 *   node tools/mark-article-assamese.js --check    # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DATA_DIR = path.join(ROOT, "data", "content", "articles");
const OPEN = '<article style="max-width:860px; margin:0 auto;">';
const CLOSE = "</article>";

const escapeHtml = (str) =>
  String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttr = (str) =>
  String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function bodyHTML(items) {
  return items
    .map((it, i) => {
      const qEn = (it.q && it.q.en) || it.q;
      const qAs = it.q && it.q.as;
      const aEn = (it.a && it.a.en) || it.a;
      const aAs = it.a && it.a.as;
      const exp = it.explanation || {};
      return `<div class="article-part-block" style="margin-bottom:26px;">
        <h2${qAs ? ` data-axo-as="${escapeAttr(`${i + 1}. ${qAs}`)}"` : ""} style="font-size:1.2rem; font-weight:800; margin:0 0 10px 0;">${i + 1}. ${escapeHtml(String(qEn))}</h2>
        ${qAs ? `<p class="article-q-as" lang="as" style="color:#64748b;">${escapeHtml(String(qAs))}</p>` : ""}
        <p${aAs ? ` data-axo-as="${escapeAttr(aAs)}"` : ""} style="line-height:1.8;">${escapeHtml(String(aEn))}</p>
        ${aAs ? `<p class="article-a-as" lang="as" style="color:#334155; line-height:1.8;">${escapeHtml(String(aAs))}</p>` : ""}
        ${exp.en ? `<div${exp.as ? ` data-axo-as="${escapeAttr(exp.as)}"` : ""} style="border-left:4px solid #2563eb; padding:10px 14px; margin-top:10px; background:#f8fafc;">${escapeHtml(exp.en)}</div>` : ""}
        ${exp.as ? `<div class="article-exp-as" lang="as" style="border-left:4px solid #2563eb; padding:10px 14px; margin-top:10px; background:#f8fafc;">${escapeHtml(exp.as)}</div>` : ""}
      </div>`;
    })
    .join("");
}

let changed = 0;
let skipped = 0;

for (const file of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json")).sort()) {
  const sub = file.replace(/\.json$/, "");
  const page = path.join(ROOT, "category", "articles", sub, "read", "index.html");
  if (!fs.existsSync(page)) {
    console.log(`  NO PAGE  category/articles/${sub}/read/index.html`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
  const items = data.questions || [];
  if (!items.length) continue;

  const html = fs.readFileSync(page, "utf8");
  const open = html.indexOf(OPEN);
  const close = open < 0 ? -1 : html.indexOf(CLOSE, open);
  if (open < 0 || close < 0) {
    console.log(`  NO ARTICLE  category/articles/${sub}/read/index.html`);
    continue;
  }

  const next = html.slice(0, open + OPEN.length) + bodyHTML(items) + html.slice(close);
  if (next === html) {
    skipped++;
    continue;
  }
  if (CHECK) {
    console.log(`  DRIFT  category/articles/${sub}/read/index.html`);
    changed++;
    continue;
  }
  fs.writeFileSync(page, next);
  console.log(`  WROTE  category/articles/${sub}/read/index.html`);
  changed++;
}

console.log(`mark-article-assamese: ${changed} changed, ${skipped} already up to date`);
if (CHECK && changed) process.exit(1);
