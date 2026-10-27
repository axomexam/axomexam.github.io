#!/usr/bin/env node
"use strict";

/*
 * tools/enrich-utility-pages.js
 *
 * Gives the remaining thin utility pages a real, page-specific content block.
 *
 * Pages handled
 * -------------
 *   categories/  — a summary of every practice category with its real topic
 *                  count (read from data/counts.json).
 *   trending/    — a summary of each trending collection and its real
 *                  question count (read from data/trending-topics/*.json).
 *   submit/      — how to contribute and what happens after a submission.
 *   disclaimer/  — the scope of the disclaimer in plain words.
 *
 * These pages are indexable but carried under ~800 characters of text in
 * <main>. The added block is written from the same data the runtime uses, so
 * the names and counts match what the page shows once JS boots.
 *
 * Ads and <head> are left untouched. Marker-guarded and idempotent.
 *
 * Usage:
 *   node tools/enrich-utility-pages.js          # apply
 *   node tools/enrich-utility-pages.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const MIN_WORDS = 300;
const COUNTS = path.join(ROOT, "data", "counts.json");
const TRENDING_DIR = path.join(ROOT, "data", "trending-topics");
const BOOKS_DIR = path.join(ROOT, "data", "books");
const CA_INDEX = path.join(ROOT, "data", "current-affairs", "index.json");
const DOWNLOAD_DIR = path.join(ROOT, "data", "download");
const MARK_RE = /<section class="section axo-main-content"[^>]*data-axo-main-content="1"[\s\S]*?<\/section>/;

const ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ENT[c]);
}
function lang(obj, key) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[key] || obj.en || "";
}

function panel(inner) {
  return (
    '<section class="section axo-main-content" data-axo-main-content="1" style="padding-bottom:48px;">\n' +
    '      <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">\n' +
    inner +
    "\n      </div>\n    </section>"
  );
}

/* Word count of the visible <main> text. Length in characters flatters pages
   built from short link labels, so the floor is set in words. */
function mainTextLength(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  const text = m[1]
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const ascii = (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) || []).length;
  const other = (text.match(/[\u0980-\u09FF]+/g) || []).length;
  return ascii + other;
}

function categoriesBlock() {
  let counts = {};
  try {
    counts = JSON.parse(fs.readFileSync(COUNTS, "utf8")).topicCounts || {};
  } catch (e) {}
  const byCat = {};
  for (const [p, n] of Object.entries(counts)) {
    const cat = p.split("/")[0];
    byCat[cat] = (byCat[cat] || 0) + n;
  }
  const rows = Object.entries(byCat)
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => `<li><strong>${esc(c)}</strong> — ${n.toLocaleString("en-IN")} questions.</li>`)
    .join("\n          ");
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">What you can practise on axomexam</h2>\n` +
      `        <p>axomexam groups its practice material into broad categories. Each category opens into topics and then sub-topics, and every question is written in both Assamese and English with four options, the correct answer and a short explanation.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Questions per category</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <p>Categories are broad subjects such as General Knowledge, English, Mathematics and Reasoning. Under each one sit topics, and under the topics sit the practice sets, so the number of questions in a category is the sum of everything published beneath it. The counts above are read from the site's own index and are updated as new sets are added.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How the practice sets are built</h3>\n` +
      `        <p>Every set follows the same shape: a question, four options, one correct answer, and an explanation that says why the answer is right and, where it helps, why the others are wrong. The explanations are written to be read in one pass, so a set doubles as revision material rather than only as a test.</p>\n` +
      `        <p>Questions and explanations are stored in Assamese and English together. Switching language changes the text in place, so you can read a question in one language and check the explanation in the other if that makes the point clearer.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Where to begin</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Open the category that matches your exam syllabus first, and leave the rest for later.</li>\n` +
      `          <li>Work topic by topic rather than jumping between categories; the sets inside a topic build on each other.</li>\n` +
      `          <li>Read the explanation after every question, including the ones you answer correctly by guessing.</li>\n` +
      `          <li>Use the language toggle to read the same question in Assamese or English, which reinforces the fact in both.</li>\n` +
      `          <li>Come back to a topic a few days after finishing it, when recall is harder and therefore more useful.</li>\n` +
      `        </ul>`
  );
}

function trendingBlock() {
  let files = [];
  try {
    files = fs.readdirSync(TRENDING_DIR).filter((f) => f.endsWith(".json"));
  } catch (e) {}
  const rows = files
    .map((f) => {
      let d = {};
      try {
        d = JSON.parse(fs.readFileSync(path.join(TRENDING_DIR, f), "utf8"));
      } catch (e) {}
      const n = Array.isArray(d.questions) ? d.questions.length : 0;
      const as = lang(d.title, "as");
      return `<li><strong>${esc(lang(d.title, "en") || f)}</strong>${as && as !== lang(d.title, "en") ? ` <span lang="as">${esc(as)}</span>` : ""} — ${n} question${n === 1 ? "" : "s"}.</li>`;
    })
    .join("\n          ");
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Trending topics on axomexam</h2>\n` +
      `        <p>This page collects the short, high-demand topic sets that readers open most often. They are useful for a quick revision pass before an exam, and each set links into the full topic page where the same material is covered in more depth.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Collections listed here</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <p>Each collection below is a short set on a single theme that candidates search for most often, usually just before an exam. The question count next to each one is the number of questions actually published in that set, so you can judge how long a revision pass will take before you open it.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Why these topics</h3>\n` +
      `        <p>The sets collected here are the ones readers open most often in the weeks before a recruitment exam. They are usually short, single-theme lists: the facts that come up again and again across ADRE, Assam Police, APSC and the other papers this site covers, gathered in one place so they can be revised in a single sitting.</p>\n` +
      `        <p>A trending set is not a substitute for studying the topic. It is the last pass over material you have already met, which is why every card links back to the full topic page where the same ground is covered properly.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to use these sets</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Attempt the questions without looking at the answer first, even when you are unsure.</li>\n` +
      `          <li>Read the explanation for anything you miss and note the underlying fact rather than the answer.</li>\n` +
      `          <li>Follow the link on a card to study the full topic, which covers the same ground in more depth.</li>\n` +
      `          <li>Return to the set a day or two later to check whether the facts have held.</li>\n` +
      `        </ul>`
  );
}

function submitBlock() {
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Contributing questions to axomexam</h2>\n` +
      `        <p>axomexam accepts reader-submitted practice questions for the Assam competitive exams it covers. A submission is reviewed before it is published, so the question bank keeps a consistent standard and every published question carries an answer and an explanation.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What to send</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>The question text, ideally with the Assamese version alongside it.</li>\n` +
      `          <li>Four options with the correct one clearly marked.</li>\n` +
      `          <li>A short explanation of why that option is correct.</li>\n` +
      `          <li>The exam and subject the question belongs to.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Why submissions are reviewed</h3>\n` +
      `        <p>A question bank is only useful if a candidate can trust it. An answer that is wrong, or an explanation that is vague, costs a reader marks rather than saving them, so nothing is published here without being checked against a standard reference first.</p>\n` +
      `        <p>The review is also what keeps the bank consistent. Two questions on the same fact are written to the same standard, and the explanation style stays uniform, so a reader moving between sets does not have to adjust to a different voice each time.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What makes a good submission</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>A question drawn from the actual syllabus of the exam you are preparing for.</li>\n` +
      `          <li>Options that are all plausible, so the question tests knowledge rather than elimination.</li>\n` +
      `          <li>An explanation that states the reason, not just the correct option.</li>\n` +
      `          <li>The Assamese version, if you have it, since the bank is published bilingually.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What happens next</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>The submission is checked for accuracy against standard reference material.</li>\n` +
      `          <li>Accepted questions are added to the matching topic or exam section.</li>\n` +
      `          <li>Questions that need correction are returned with a note explaining what to change.</li>\n` +
      `          <li>Because every published question carries an answer and an explanation, a submission is not published until both are settled.</li>\n` +
      `        </ul>`
  );
}

function disclaimerBlock() {
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">What this disclaimer covers</h2>\n` +
      `        <p>axomexam is an independent educational website. It is not run by, connected to, or endorsed by the Government of Assam, APSC, SLPRB or any other recruitment board. The disclaimer below explains the limits of the material published here.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Scope</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Practice questions and notes are published for general exam preparation only.</li>\n` +
      `          <li>They are not official question papers and carry no guarantee of appearing in an exam.</li>\n` +
      `          <li>For anything authoritative, always check the official notification or gazette.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Accuracy</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Content is checked against standard reference material before publication.</li>\n` +
      `          <li>Errors can still slip through; corrections can be sent through the Submit page.</li>\n` +
      `          <li>Using the material is at your own discretion.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Independence</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Exam names and syllabus details are used descriptively, to say what the practice material covers.</li>\n` +
      `          <li>No affiliation with, or approval by, any recruitment board is claimed or implied.</li>\n` +
      `          <li>Official notifications always take precedence over anything published here.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What this site is</h3>\n` +
      `        <p>axomexam is an independent study resource for candidates preparing for Assam government recruitment examinations. It publishes practice questions, explanations, syllabus summaries and revision notes, all written bilingually so that a candidate can read in whichever of Assamese or English they find easier.</p>\n` +
      `        <p>The site is not an official channel. Examination names, syllabus outlines and post details are mentioned descriptively, to say what the practice material is aimed at, and a candidate should always confirm dates, eligibility and the syllabus itself from the official notification before relying on them.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Corrections</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>If a fact here disagrees with an official source, the official source is correct.</li>\n` +
      `          <li>Send the page and the correction through the Submit page and it will be reviewed.</li>\n` +
      `        </ul>`
  );
}

function ebooksBlock() {
  let books = [];
  try {
    books = fs
      .readdirSync(BOOKS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        try {
          return JSON.parse(fs.readFileSync(path.join(BOOKS_DIR, f), "utf8"));
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
  } catch (e) {}
  const chapters = books.reduce((a, b) => a + ((b.chapters || []).length), 0);
  const rows = books.map((b) => {
    const as = lang(b.title, "as");
    const n = (b.chapters || []).length;
    return `<strong>${esc(lang(b.title, "en"))}</strong>${as && as !== lang(b.title, "en") ? ` <span lang="as">${esc(as)}</span>` : ""} — ${n} chapter${n === 1 ? "" : "s"}.`;
  });
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">What the e-book library contains</h2>\n` +
      `        <p>The axomexam e-book library holds ${books.length} subject books across ${chapters} chapters, written in simple bilingual (Assamese and English) language for ADRE, Assam Police, APSC, SSC and Railway candidates. Every book is arranged chapter by chapter, so you can read the exact topic you are preparing for instead of working through a whole subject at once.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Books in the library</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows.join("\n          ")}\n        </ul>\n` +
      `        <p>Each book is written for a candidate preparing on their own, so the chapters explain the concept before they test it. The language is kept simple on purpose: a definition you can read in one pass is easier to recall under exam pressure than one you have to decode.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to read a book here</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Open the book for the subject you are revising and pick the chapter that matches your syllabus.</li>\n` +
      `          <li>Read the chapter once for understanding, then a second time noting only the facts that could be asked.</li>\n` +
      `          <li>Attempt the practice questions on the matching topic page straight afterwards, while the chapter is fresh.</li>\n` +
      `          <li>Use the language toggle to read the same chapter in Assamese or in English.</li>\n` +
      `          <li>Keep a single notebook for the facts you get wrong, and revise that notebook rather than re-reading whole chapters.</li>\n` +
      `        </ul>`
  );
}

function currentAffairsBlock() {
  let cats = [];
  try {
    cats = (JSON.parse(fs.readFileSync(CA_INDEX, "utf8")).categories) || [];
  } catch (e) {}
  const rows = cats.map((c) => {
    const as = lang(c.title, "as");
    return `<strong>${esc(lang(c.title, "en"))}</strong>${as && as !== lang(c.title, "en") ? ` <span lang="as">${esc(as)}</span>` : ""}.`;
  });
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Current affairs for Assam competitive exams</h2>\n` +
      `        <p>This section carries bilingual current affairs questions grouped into ${cats.length} themes, covering the developments that Assam recruitment papers ask about: sports, awards and honours, important days and themes, books and authors, appointments and resignations, defence and security, the economy and banking, the environment, and national and international affairs.</p>\n` +
      `        <p>Every question is written in both Assamese and English with four options, the correct answer and a short explanation, so a single revision pass reinforces both the fact and the language you will read it in during the exam.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Themes covered</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows.join("\n          ")}\n        </ul>\n` +
      `        <p>Recruitment papers draw current affairs from a rolling window rather than from the whole year, so it is worth knowing which themes your exam returns to. Sports, awards and appointments are asked almost every year; the economy and environment themes appear less often but carry more weight when they do.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to revise current affairs</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Read one theme at a time rather than sampling across all of them.</li>\n` +
      `          <li>Note the date and the office involved for each event, because that is what the distractors change.</li>\n` +
      `          <li>Pair an event with the person or body connected to it, so a question about either one is answerable.</li>\n` +
      `          <li>Revise the last six to eight months again in the week before the exam.</li>\n` +
      `          <li>Read a little every week. A single pass in the final days does not hold under exam pressure.</li>\n` +
      `        </ul>`
  );
}

function termsBlock() {
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">The terms in plain words</h2>\n` +
      `        <p>By using axomexam you accept the terms set out on this page. They are short, and the summary below is written so that the practical effect of each one is clear before you read the full text.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Content usage</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>You may read, practise and revise the material here for your own exam preparation.</li>\n` +
      `          <li>The questions and notes are not to be republished or resold as your own material.</li>\n` +
      `          <li>Quoting a small part with a link back to the page is fine.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Accuracy and liability</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Material is checked before publication, but errors can still reach a page.</li>\n` +
      `          <li>For anything authoritative, rely on the official notification or gazette.</li>\n` +
      `          <li>Using the material is at your own discretion.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Links to other sites</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Some pages link to external sites, including official recruitment portals.</li>\n` +
      `          <li>Those sites have their own terms, and axomexam does not control their content.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Accounts and personal data</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Reading and practising does not require an account.</li>\n` +
      `          <li>Anything you send through the Submit page is used only to review and publish that submission.</li>\n` +
      `          <li>Details you enter are not sold or shared with third parties for marketing.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Changes to these terms</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>These terms may be updated as the site changes.</li>\n` +
      `          <li>The version published on this page is the one that applies.</li>\n` +
      `        </ul>`
  );
}

function downloadsBlock() {
  let pdfs = [];
  try {
    pdfs = fs.readdirSync(DOWNLOAD_DIR).filter((f) => /\.pdf$/i.test(f));
  } catch (e) {}
  const rows = pdfs.map((f) => `<strong>${esc(f.replace(/\.pdf$/i, "").replace(/-/g, " "))}</strong>.`);
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Downloadable study notes</h2>\n` +
      `        <p>This page collects the PDF study notes published on axomexam${pdfs.length ? ` — currently ${pdfs.length} file${pdfs.length === 1 ? "" : "s"}` : ""}. They are the offline form of the material on the topic pages, meant for revision where there is no internet, or for printing and marking up by hand.</p>\n` +
      `        <p>The PDFs are written in the same bilingual style as the rest of the site, so a note you read here and a question you practise on the topic page reinforce each other.</p>\n` +
      (rows.length
        ? `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Notes available</h3>\n` +
          `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows.join("\n          ")}\n        </ul>\n`
        : "") +
      `        <p>Every note is free and needs no account. Where a topic page and a PDF cover the same ground, the PDF is the condensed version and the topic page carries the practice questions and explanations.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to use the notes</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Download the note for the topic you are currently revising.</li>\n` +
      `          <li>Read it once, then attempt the matching practice questions on the topic page.</li>\n` +
      `          <li>Keep the notes you revise most often in one folder so they are quick to reach.</li>\n` +
      `          <li>Print the ones you mark up by hand; the rest are easier to read on a screen.</li>\n` +
      `          <li>Re-download a note if you are returning to it months later, since the pages are revised as the syllabus changes.</li>\n` +
      `        </ul>`
  );
}

const BLOCKS = {
  "ebooks/index.html": ebooksBlock,
  "current-affairs/index.html": currentAffairsBlock,
  "terms/index.html": termsBlock,
  "downloads/index.html": downloadsBlock,
  "categories/index.html": categoriesBlock,
  "trending/index.html": trendingBlock,
  "submit/index.html": submitBlock,
  "disclaimer/index.html": disclaimerBlock,
};

function main() {
  let written = 0;
  const report = [];
  for (const [rel, build] of Object.entries(BLOCKS)) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    let html = fs.readFileSync(full, "utf8");
    if (/name="robots" content="noindex/.test(html)) continue;

    const before = mainTextLength(html);
    if (before === null || before >= MIN_WORDS) continue;

    const block = build();
    if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
    else {
      const idx = html.lastIndexOf("</main>");
      if (idx < 0) continue;
      html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
    }

    written++;
    report.push(`  ${String(before).padStart(4)} -> ${String(mainTextLength(html)).padStart(5)}  ${rel}`);
    if (!CHECK) fs.writeFileSync(full, html, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}enrich-utility-pages`);
  console.log(`  pages enriched: ${written}`);
  for (const r of report) console.log(r);
}

main();
