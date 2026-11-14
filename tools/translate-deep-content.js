#!/usr/bin/env node
"use strict";

/*
 * tools/translate-deep-content.js
 *
 * Rewrite the "seo-deep" block on the /as/ twins of the ten rich category
 * pages with the Assamese text from data/i18n/deep-content-as.json.
 *
 * scripts/build-deep-content.js renders that block from English data, and
 * tools/build-as-twins.js copies the English page, so without this step every
 * /as/ category page carries ~500 words of English study content. The block is
 * re-rendered here with the same markup so the two languages stay structurally
 * identical. Idempotent: it always renders from the JSON.
 *
 * Usage:
 *   node tools/translate-deep-content.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const AS_DATA = require(path.join(ROOT, "data", "i18n", "deep-content-as.json"));

/* Same page map as scripts/build-deep-content.js. */
const PAGES = {
  arithmetic: "category/math/arithmetic",
  "non-verbal-reasoning": "category/reasoning/non-verbal-reasoning",
  "verbal-reasoning": "category/reasoning/verbal-reasoning",
  "analytical-critical-reasoning": "category/reasoning/analytical-critical-reasoning",
  science: "category/science",
  english: "category/english",
  articles: "category/articles",
  math: "category/math",
  reasoning: "category/reasoning",
  computer: "category/computer"
};

const H3 = 'style="color:var(--ink,#0f172a); margin-top:22px;"';
const LIST = 'style="margin:8px 0 0 20px; line-height:1.9;"';
const DETAIL = 'style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"';
const SUMMARY = 'style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);"';

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sectionsHTML(sections) {
  return (sections || []).map((s) => {
    let html = "<h3 " + H3 + ">" + esc(s.h) + "</h3>";
    if (s.p && s.p.length) html += s.p.map((p) => "<p>" + esc(p) + "</p>").join("");
    if (s.list && s.list.length) {
      html += "<ul " + LIST + ">" + s.list.map((li) => "<li>" + esc(li) + "</li>").join("") + "</ul>";
    }
    return html;
  }).join("");
}

function faqHTML(faqs) {
  if (!faqs || !faqs.length) return "";
  return (
    "<h3 " + H3 + ">সঘনাই সোধা প্ৰশ্ন</h3>" +
    '<div class="seo-faq">' +
    faqs.map((f) =>
      "<details " + DETAIL + "><summary " + SUMMARY + ">" + esc(f.q) + "</summary>" +
      '<p style="margin:8px 0 0;">' + esc(f.a) + "</p></details>"
    ).join("") +
    "</div>"
  );
}

function renderSection(entry) {
  const lead = (entry.lead || []).map((p) => "<p>" + esc(p) + "</p>").join("");
  const h2 = entry.h2 || String(entry.title || "").replace(/\s*\|\s*axomexam\s*$/i, "");
  return (
    '<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;">' +
    '<div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">' +
    '<h2 style="margin-top:0; color:var(--ink,#0f172a);">' + esc(h2) + "</h2>" +
    lead +
    sectionsHTML(entry.sections) +
    faqHTML(entry.faqs) +
    "</div></section>"
  );
}

let changed = 0;
let scanned = 0;
for (const key of Object.keys(PAGES)) {
  const file = path.join(ROOT, "as", PAGES[key], "index.html");
  if (!fs.existsSync(file)) continue;
  scanned++;
  const entry = AS_DATA[key];
  if (!entry) continue;
  const html = fs.readFileSync(file, "utf8");
  if (!/data-axo-deep="1"/.test(html)) continue;
  const out = html.replace(/<section class="section seo-deep"[\s\S]*?<\/section>/, renderSection(entry));
  if (out === html) continue;
  fs.writeFileSync(file, out);
  changed++;
}

console.log(`as-deep-content: scanned ${scanned} | changed ${changed}`);
