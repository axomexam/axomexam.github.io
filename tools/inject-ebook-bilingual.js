#!/usr/bin/env node
"use strict";

/*
 * inject-ebook-bilingual.js
 *
 * Makes the FULL e-book text crawler-visible in BOTH languages.
 *
 * Every other page type ships its bilingual copy in the committed HTML:
 * topic / exam pages carry the English and Assamese Q&A plus an
 * <article data-axo-lang="as"> study block, and current-affairs pages carry
 * both languages. E-book reader pages were the exception: <div id="ebk-body">
 * held the English chapters only, so the entire Assamese book
 * (data/books/<id>.json -> chapters[].content.as) existed in the source JSON
 * and in the JS-rendered DOM but never in the served HTML.
 *
 * This tool rebuilds <div id="ebk-body"> so it contains both languages,
 * wrapped the same way the topic / exam / current-affairs pages wrap their
 * bilingual copy:
 *
 *   <div lang="en"> ... ebk-ch-N ... </div>
 *   <div lang="as"> ... ebk-ch-as-N ... </div>
 *
 * Only lang="…" is used (not data-axo-lang): css/style.css hides
 * [data-axo-lang=as] until body[data-lang=as], so tagging the block with
 * data-axo-lang would keep the Assamese text out of the crawler's view. With
 * plain lang wrappers both languages are rendered for crawlers, exactly like
 * the other page types. The runtime still swaps in its own single-language
 * view for visitors (renderRoute replaces #app on load).
 *
 * Everything outside #ebk-body is left byte-for-byte untouched: canonical,
 * robots, title, meta description, JSON-LD, breadcrumb, reader toolbar and
 * footer are all preserved.
 *
 * Idempotent: a file whose #ebk-body already matches the generated markup is
 * skipped.
 *
 * Usage:
 *   node tools/inject-ebook-bilingual.js            # apply
 *   node tools/inject-ebook-bilingual.js --check    # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const BOOKS_DIR = path.join(ROOT, "data", "books");
const EBOOKS_DIR = path.join(ROOT, "ebooks");

const BODY_OPEN = '<div id="ebk-body">';
const FOOT_OPEN = '<div class="ebk-reader-foot">';

/* ---------- helpers (mirror tools/prerender.js so output stays identical) ---------- */

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ebkLang(obj, lang) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  const l = lang || "en";
  if (obj[l] && String(obj[l]).trim()) return obj[l];
  return obj.en || obj.as || "";
}

function formatMath(str) {
  if (str == null) return "";
  let s = String(str);
  const hasLatex = /\$[^$]+\$|\\\([^\\]+\\\)/.test(s);
  if (!hasLatex) {
    s = escapeHtml(s);
    s = s.replace(/sqrt\(([^)]+)\)/gi, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
    s = s.replace(/√\(([^)]+)\)/g, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
    s = s.replace(/\^{([^}]+)}/g, "<sup>$1</sup>");
    s = s.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, "<sup>$1</sup>");
    s = s.replace(/_{([^}]+)}/g, "<sub>$1</sub>");
    s = s.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, "<sub>$1</sub>");
    s = s.replace(/\+\/-/g, "&plusmn;");
    s = s.replace(/&lt;=/g, "&le;").replace(/&gt;=/g, "&ge;");
  }
  return s;
}

function ebkContentHTML(text) {
  if (text == null) return "";
  const lines = String(text).split("\n");
  let html = "";
  let listOpen = false;
  const closeList = () => { if (listOpen) { html += "</ul>"; listOpen = false; } };
  lines.forEach((raw) => {
    const line = (raw || "").trim();
    if (!line) { closeList(); return; }
    const bullet = line.match(/^[-•*]\s+(.*)$/);
    if (bullet) {
      if (!listOpen) { html += '<ul class="ebk-list">'; listOpen = true; }
      html += `<li>${formatMath(bullet[1])}</li>`;
    } else {
      closeList();
      html += `<p class="ebk-para">${formatMath(line)}</p>`;
    }
  });
  closeList();
  return html;
}

/* Localised "Contents" heading, matching js/i18n.js ebooks.toc. */
const TOC_LABEL = { en: "Contents", as: "বিষয়-সূচী" };

function ebkReaderBodyHTML(book, lang, idPrefix) {
  const chapters = book.chapters || [];
  const prefix = String(idPrefix || "ebk-ch").replace(/[^A-Za-z0-9_-]/g, "");
  const tocLabel = TOC_LABEL[lang] || TOC_LABEL.en;
  const toc = chapters.map((c, i) => `
      <a class="ebk-toc-item" href="#${prefix}-${i}">
        <span class="ebk-toc-no">${i + 1}</span>
        <span>${escapeHtml(ebkLang(c.title, lang))}</span>
      </a>`).join("");
  const list = chapters.map((c, i) => `
      <section class="ebk-chapter" id="${prefix}-${i}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i + 1}</span>${escapeHtml(ebkLang(c.title, lang))}</h3>
        <div class="ebk-ch-body">${ebkContentHTML(ebkLang(c.content, lang))}</div>
      </section>`).join("");
  return `
      ${chapters.length > 1 ? `<nav class="ebk-toc" aria-label="${tocLabel}"><h4>${tocLabel}</h4>${toc}</nav>` : ""}
      <div class="ebk-chapters">${list}</div>`;
}

/* Both languages. This block sits INSIDE <main id="app">, which the runtime
   replaces on load, so it is the crawler / no-JS copy — the same convention
   topic, exam and current-affairs pages use: each language sits in its own
   lang="…" wrapper and BOTH are rendered, so Googlebot indexes the full
   bilingual book. Deliberately NOT data-axo-lang: css/style.css hides
   [data-axo-lang=as] until body[data-lang=as], which would keep the Assamese
   text out of the crawler's view. */
function bilingualBodyHTML(book) {
  return ["en", "as"].map((lang) =>
    `<div lang="${lang}">${ebkReaderBodyHTML(book, lang, lang === "en" ? "ebk-ch" : "ebk-ch-as")}</div>`
  ).join("");
}

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

/* Locate the <div id="ebk-body"> ... </div> span using the reader-foot
   marker that immediately follows it. Returns null when the page is not an
   e-book reader page. */
function bodySpan(page) {
  const open = page.indexOf(BODY_OPEN);
  if (open === -1) return null;
  const foot = page.indexOf(FOOT_OPEN, open);
  if (foot === -1) return null;
  return { start: open, innerStart: open + BODY_OPEN.length, innerEnd: foot };
}

function buildReplacement(book) {
  return `${bilingualBodyHTML(book)}</div>\n\n        `;
}

/* ---------- main ---------- */

const files = fs.readdirSync(BOOKS_DIR).filter((f) => f.endsWith(".json")).sort();
let changed = 0;
let skipped = 0;
let missing = 0;

for (const file of files) {
  const book = readJSON(path.join(BOOKS_DIR, file));
  if (!book || !book.id || !book.title || !(book.chapters || []).length) continue;

  const pagePath = path.join(EBOOKS_DIR, book.id, "index.html");
  if (!fs.existsSync(pagePath)) {
    console.log(`  MISSING PAGE  ebooks/${book.id}/index.html`);
    missing++;
    continue;
  }

  const page = fs.readFileSync(pagePath, "utf8");
  const span = bodySpan(page);
  if (!span) {
    console.log(`  NO #ebk-body  ebooks/${book.id}/index.html`);
    missing++;
    continue;
  }

  const replacement = buildReplacement(book);
  const next = page.slice(0, span.innerStart) + replacement + page.slice(span.innerEnd);

  if (next === page) {
    skipped++;
    continue;
  }

  if (CHECK) {
    console.log(`  DRIFT  ebooks/${book.id}/index.html`);
    changed++;
    continue;
  }

  fs.writeFileSync(pagePath, next);
  console.log(`  WROTE  ebooks/${book.id}/index.html`);
  changed++;
}

if (CHECK) {
  console.log(`\n${changed} file(s) need updating, ${skipped} already up to date, ${missing} skipped.`);
  process.exit(changed ? 1 : 0);
}
console.log(`\n${changed} file(s) updated, ${skipped} already up to date, ${missing} skipped.`);
