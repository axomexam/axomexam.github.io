#!/usr/bin/env node
"use strict";

/*
 * tools/add-book-details.js
 *
 * Writes the "Book details" card into every "Your Exams" book page
 * (exams/<id>/index.html and its /as/ twin), at the top of the page: right
 * under the book hero and above the subject cards.
 *
 * This is the crawler copy. js/app.src.js renders the same card from the same
 * data (examBookDetailsHTML) and replaces <main id="app"> on load, so this
 * block is what Googlebot sees with JavaScript off and the runtime card is
 * what the reader sees — identical markup, identical numbers.
 *
 * Every fact comes from data/exams/index.json: exam.book carries the code,
 * the recruiting body, its verified portal and the published / last-updated
 * dates; the subject and chapter counts are the leaf nodes of that exam's
 * section tree (the same tree the subject cards are built from), and the
 * question count is data/counts.json -> examSectionCounts, the manifest the
 * runtime prints in the hero. Nothing is typed in twice.
 *
 * Idempotent: the block is marker-guarded (data-axo-book-details) and is
 * stripped and re-inserted on every run, so a re-run reports 0 changes.
 *
 * Usage:
 *   node tools/add-book-details.js           # apply
 *   node tools/add-book-details.js --check   # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const EXAMS_INDEX = path.join(ROOT, "data", "exams", "index.json");
const APP_SRC = path.join(ROOT, "js", "app.src.js");
const COUNTS = path.join(ROOT, "data", "counts.json");

const LABELS = {
  en: {
    heading: "Book details",
    kicker: "পুথিৰ তথ্য",
    publisher: "Publisher",
    code: "Book code",
    edition: "Edition",
    language: "Language",
    exam: "Exam",
    authority: "Conducted by",
    subjects: "Subjects",
    chapters: "Chapters",
    questions: "Practice questions",
    format: "Format",
    published: "Published",
    updated: "Last updated",
    editionValue: "2026 web edition",
    languageValue: "English &amp; Assamese",
    formatValue: "Free online book",
    publisherUrl: "/about/",
    note: (authority) => `© axomexam.in &middot; Independent study platform &middot; not affiliated with ${authority}.`,
  },
  as: {
    heading: "পুথিৰ তথ্য",
    kicker: "Book details",
    publisher: "প্ৰকাশক",
    code: "পুথি ক'ড",
    edition: "সংস্কৰণ",
    language: "ভাষা",
    exam: "পৰীক্ষা",
    authority: "পৰিচালনা কৰে",
    subjects: "বিষয়",
    chapters: "অধ্যায়",
    questions: "অনুশীলন প্ৰশ্ন",
    format: "প্ৰকাৰ",
    published: "প্ৰকাশিত",
    updated: "শেহতীয়া আপডেট",
    editionValue: "২০২৬ ৱেব সংস্কৰণ",
    languageValue: "ইংৰাজী আৰু অসমীয়া",
    formatValue: "বিনামূলীয়া অনলাইন পুথি",
    publisherUrl: "/as/about/",
    note: (authority) => `© axomexam.in &middot; স্বতন্ত্ৰ অধ্যয়ন মঞ্চ &middot; ${authority}ৰ সৈতে সম্পৰ্ক নাই।`,
  },
};

const MARK_RE =
  /\n?[ \t]*<!-- axo-book-details:start -->[\s\S]*?<!-- axo-book-details:end -->\n?/;
/* The card is the tail of the book hero: it follows the description, inside
   .exam-cover-hero-info (or .page-head on pages built without a cover). */
const DESC_RE = /<p class="page-desc">[\s\S]*?<\/p>/;
/* The hero's own total line is replaced by the card's question count. */
const TOTAL_RE = /\n[ \t]*<p class="exam-book-total"[^>]*>[^<]*<\/p>/;
const HERO_TAG_RE = /<section class="exam-cover-hero"[^>]*>/;
const H1_RE = /<h1>[\s\S]*?<\/h1>/;
/* The bold total that sits directly under the book name. */
const TOTAL_BADGE_RE = /\n[ \t]*<p data-axo-book-total="1"[\s\S]*?<\/p>/;
/* The hero's "What you will prepare" label is replaced by the card itself. */
const CHOOSE_RE = /\n[ \t]*<p class="exams-choose">[^<]*<\/p>/;

const ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ENT[c]);
const langOf = (obj, key) => (!obj ? "" : typeof obj === "string" ? obj : obj[key] || obj.en || "");

/* Subject sections and chapter leaves for one book, from the same section
   tree the runtime renders its cards from. */
function bookStructure(exam) {
  const countLeaves = (nodes) => (nodes || []).reduce((n, node) => {
    const kids = Array.isArray(node.subcategories) ? node.subcategories : [];
    return n + (kids.length ? countLeaves(kids) : 1);
  }, 0);
  const sections = (exam.sections || []).filter((s) => s.type !== "syllabus");
  return {
    subjects: sections.length,
    chapters: sections.reduce((n, s) => n + countLeaves(s.subcategories), 0),
  };
}

function questionCount(id, manifest) {
  let n = 0;
  for (const [key, value] of Object.entries(manifest || {})) {
    if (key.startsWith(`${id}/`) && key.split("/").length === 2) n += Number(value) || 0;
  }
  return n;
}

function row(label, value) {
  return `            <div><span style="display:block; font-size:.6rem; letter-spacing:.07em; text-transform:uppercase; font-weight:800; color:var(--ink-faint,#94a3b8); margin-bottom:2px;">${label}</span><span style="display:block; font-size:.78rem; font-weight:600; line-height:1.35; color:var(--ink,#0f172a);">${value}</span></div>`;
}

function totalBadge(lang, questions) {
  const n = questions.toLocaleString("en-IN");
  const text = lang === "as" ? `${n} টা প্ৰশ্ন আৰু উত্তৰ উপলব্ধ` : `${n} questions & answers available`;
  return `\n        <p data-axo-book-total="1" style="display:inline-flex; align-items:center; gap:7px; margin:12px 0 10px; padding:6px 13px; border-radius:999px; border:1px solid var(--primary,#4f46e5); background:var(--bg-tint,rgba(79,70,229,.08)); color:var(--primary,#4f46e5); font-size:.76rem; font-weight:800; letter-spacing:.01em;">${esc(text)}</p>`;
}

function block({ id, lang, exam, stats, questions }) {
  const L = LABELS[lang];
  const num = (n) => n.toLocaleString("en-IN");
  const book = exam.book;
  const title = langOf(exam.title, lang);
  const subtitle = langOf(exam.subtitle, lang);
  const authorityName = langOf(book.authority, lang);

  const authority = book.authorityUrl
    ? `<a href="${book.authorityUrl}" rel="noopener nofollow" target="_blank" style="color:inherit; text-decoration:underline;">${esc(authorityName)}</a>`
    : esc(authorityName);

  const rows = [
    row(L.publisher, `<a href="${L.publisherUrl}" style="color:inherit; text-decoration:underline;">axomexam.in</a>`),
    row(L.code, esc(book.code)),
    row(L.edition, L.editionValue),
    row(L.language, L.languageValue),
    row(L.authority, authority),
    row(L.subjects, lang === "as" ? `${num(stats.subjects)} টা বিভাগ` : `${num(stats.subjects)} subject sections`),
    row(L.chapters, lang === "as" ? `${num(stats.chapters)} টা অধ্যায়` : `${num(stats.chapters)} chapters`),
    row(
      L.questions,
      lang === "as"
        ? `${num(questions)} টা — উত্তৰ আৰু ব্যাখ্যাৰ সৈতে`
        : `${num(questions)} with answers and explanations`
    ),
    row(L.format, L.formatValue),
    row(L.published, esc(langOf(book.published, lang))),
    row(L.updated, esc(langOf(book.updated, lang))),
  ];

  /* Inter has no Assamese glyphs, so every Assamese run needs the site's
     Bengali font or it renders as boxes. On the /as/ page the whole card is
     Assamese, so the font goes on the panel; on the English page only the
     kicker is. */
  const AS_FONT = "font-family:var(--font-as, 'Noto Sans Bengali', sans-serif);";
  const panelFont = lang === "as" ? AS_FONT : "";
  const kickerFont = lang === "as" ? "" : AS_FONT;

  return `        <!-- axo-book-details:start -->
        <div data-axo-book-details="1" style="width:100%; margin-top:14px; padding-top:12px; border-top:1px solid var(--border,#e2e8f0); text-align:left;${panelFont}">
          <p style="margin:0 0 10px; font-size:.64rem; letter-spacing:.09em; text-transform:uppercase; font-weight:800; color:var(--ink-faint,#94a3b8);">${L.heading} <span style="font-weight:700;${kickerFont}">${L.kicker}</span></p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px 18px;">
${rows.join("\n")}
          </div>
        </div>
        <!-- axo-book-details:end -->`;
}

/* The runtime only renders a book page for the books in EXAM_BOOKS_READY
   (js/app.src.js); the rest show "coming soon". Read the list from there so
   the static copy never promises a book the reader cannot open. */
function readyBooks() {
  const src = fs.readFileSync(APP_SRC, "utf8");
  const m = src.match(/const EXAM_BOOKS_READY = \[([^\]]*)\]/);
  if (!m) return null;
  return m[1].split(",").map((id) => id.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
}

function strip(file) {
  const html = fs.readFileSync(file, "utf8");
  const next = html.replace(MARK_RE, "");
  if (next === html) return false;
  if (!CHECK) fs.writeFileSync(file, next, "utf8");
  return true;
}

function apply(file, html, lang, exam, stats, questions) {
  const card = `\n${block({ id: exam.id, lang, exam, stats, questions })}\n`;
  let stripped = html
    .replace(MARK_RE, "")
    .replace(TOTAL_BADGE_RE, "")
    .replace(CHOOSE_RE, "")
    .replace(TOTAL_RE, "");
  /* Drop the flex-wrap this script used to add to the hero. */
  stripped = stripped.replace(HERO_TAG_RE, (tag) => tag.replace(/;?\s*flex-wrap:wrap;?/g, ""));

  const desc = stripped.match(DESC_RE);
  if (!desc) return "no-anchor";
  const at = desc.index + desc[0].length;

  const next = stripped.slice(0, at) + totalBadge(lang, questions) + card + stripped.slice(at);

  if (next === html) return "unchanged";
  if (!CHECK) fs.writeFileSync(file, next, "utf8");
  return "changed";
}

function main() {
  const index = JSON.parse(fs.readFileSync(EXAMS_INDEX, "utf8"));
  const manifest = JSON.parse(fs.readFileSync(COUNTS, "utf8")).examSectionCounts || {};
  const books = (index.exams || []).filter((e) => e.book && (e.sections || []).length);
  const ready = readyBooks();
  let changed = 0;
  let missingBook = 0;

  for (const exam of books) {
    const stats = bookStructure(exam);
    const questions = questionCount(exam.id, manifest);
    const live = !ready || ready.indexOf(exam.id) !== -1;
    for (const lang of ["en", "as"]) {
      const rel = lang === "as" ? `as/exams/${exam.id}/index.html` : `exams/${exam.id}/index.html`;
      const file = path.join(ROOT, rel);
      if (!fs.existsSync(file)) {
        console.log(`missing   ${rel}`);
        continue;
      }
      if (!live) {
        if (strip(file)) changed++;
        console.log(`not-live  ${rel}  (card removed; book is not in EXAM_BOOKS_READY)`);
        continue;
      }
      const result = apply(file, fs.readFileSync(file, "utf8"), lang, exam, stats, questions);
      if (result === "changed") changed++;
      console.log(
        `${result.padEnd(9)} ${rel}  (${stats.subjects} subjects, ${stats.chapters} chapters, ${questions} questions)`
      );
    }
  }

  for (const exam of index.exams || []) {
    if ((exam.sections || []).length && !exam.book) {
      missingBook++;
      console.log(`no book   data/exams/index.json -> ${exam.id} has no "book" record`);
    }
  }

  console.log(`\n${CHECK ? "Would change" : "Changed"}: ${changed} page(s)`);
  if (missingBook) console.log(`Missing "book" records: ${missingBook}`);
  if (changed && CHECK) process.exitCode = 1;
}

main();
