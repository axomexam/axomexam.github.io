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
const COUNTS = path.join(ROOT, "data", "counts.json");
const TRENDING_DIR = path.join(ROOT, "data", "trending-topics");
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

function mainTextLength(html) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html);
  if (!m) return null;
  return m[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
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
      `        <p>The two largest groups are General Knowledge and Reasoning Ability, because those carry the most weight in the Assam recruitment papers. General Knowledge covers Assam history, geography, culture, polity, economics and literature alongside Indian and world sections. Reasoning Ability covers verbal, non-verbal and analytical reasoning, which is where most candidates lose easy marks.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Questions per category</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Where to begin</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Open the category that matches your exam syllabus first.</li>\n` +
      `          <li>Work topic by topic rather than jumping between categories.</li>\n` +
      `          <li>Use the language toggle to read the same question in Assamese or English.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How the practice sets work</h3>\n` +
      `        <p>Each topic page holds a full question bank, not a fixed quiz. Answers and explanations are shown with the question, so the same page works for a first reading and for later revision. Once a topic feels comfortable, move to the mock-test section to attempt mixed sets under time pressure.</p>`
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
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">How to use these sets</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Attempt the questions without looking at the answer first.</li>\n` +
      `          <li>Read the explanation for anything you miss and note the fact.</li>\n` +
      `          <li>Follow the link on a card to study the full topic.</li>\n` +
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
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What happens next</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>The submission is checked for accuracy against standard reference material.</li>\n` +
      `          <li>Accepted questions are added to the matching topic or exam section.</li>\n` +
      `          <li>Questions that need correction are returned with a note.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Writing a good question</h3>\n` +
      `        <p>A useful practice question tests one clear fact or one clear step, and the wrong options should be plausible rather than obviously wrong. Where a fact has a number, a date or a name, check it against a standard reference before sending it, and say which reference you used. The same question written in both languages is especially welcome, because it can be published to the Assamese and English versions of the page together.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Corrections</h3>\n` +
      `        <p>If you spot a mistake in a published question, send the page link and the correction through the contact form. Corrections are checked the same way as new questions and are usually applied within a few days.</p>`
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
      `        </ul>`
  );
}

function termsBlock() {
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">Terms of use for axomexam</h2>\n` +
      `        <p>axomexam is a free, independent study website for the competitive examinations held in Assam. By using the site you agree to the terms below, which explain what you may do with the material and what the site does and does not promise.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Using the material</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Practice questions, notes and mock tests are free to read and use for your own exam preparation.</li>\n` +
      `          <li>You may print or save pages for personal study.</li>\n` +
      `          <li>Republishing the content on another website or app, or selling it, is not allowed without written permission.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Accuracy and liability</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Every effort is made to keep answers and explanations correct, but errors can still occur.</li>\n` +
      `          <li>The material is provided for general preparation and is not an official question paper.</li>\n` +
      `          <li>For anything authoritative, always rely on the official notification or gazette.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Advertising and links</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>The site is supported by advertising, which keeps the material free.</li>\n` +
      `          <li>Links to other websites are provided for convenience; their content is not controlled by axomexam.</li>\n` +
      `        </ul>`
  );
}

function downloadsBlock() {
  return panel(
    `        <h2 style="margin-top:0; color:var(--ink,#0f172a);">What you can download from axomexam</h2>\n` +
      `        <p>Every study file on axomexam is free and needs no account. The downloads fall into three groups: PDF study notes, exam e-books, and previous year solved papers. Each is written in both Assamese and English so you can revise in the language you are comfortable with.</p>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">PDF study notes</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Topic-wise notes that follow the Assam recruitment syllabus.</li>\n` +
      `          <li>Quick-revision points, formulae and key facts on each topic.</li>\n` +
      `          <li>Printable, so you can carry them offline.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Exam e-books</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Complete books for ADRE, Assam Police, APSC and other exams.</li>\n` +
      `          <li>Subject sections with solved questions and explanations.</li>\n` +
      `          <li>Read online or download for offline practice.</li>\n` +
      `        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Previous year papers</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Solved past papers arranged by exam and year.</li>\n` +
      `          <li>Useful for understanding the pattern and the weightage of each section.</li>\n` +
      `        </ul>`
  );
}

const BLOCKS = {
  "categories/index.html": categoriesBlock,
  "trending/index.html": trendingBlock,
  "submit/index.html": submitBlock,
  "disclaimer/index.html": disclaimerBlock,
  "terms/index.html": termsBlock,
  "downloads/index.html": downloadsBlock,
};

function main() {
  let written = 0;
  const report = [];
  for (const [rel, build] of Object.entries(BLOCKS)) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const original = fs.readFileSync(full, "utf8");
    let html = original;
    if (/name="robots" content="noindex/.test(html)) continue;

    const before = mainTextLength(html);
    /* The threshold is in words, not characters: a page under ~300 words is
       thin by Google's own yardstick, so it needs the block even when its
       markup-heavy <main> already runs past 800 characters. */
    if (before === null || before >= 1500) continue;

    const block = build();
    if (MARK_RE.test(html)) html = html.replace(MARK_RE, block);
    else {
      const idx = html.lastIndexOf("</main>");
      if (idx < 0) continue;
      html = html.slice(0, idx) + "\n" + block + "\n  " + html.slice(idx);
    }

    /* A block that is already present and current leaves the bytes untouched,
       so it is not counted as a change. */
    if (html === original) continue;

    written++;
    report.push(`  ${String(before).padStart(4)} -> ${String(mainTextLength(html)).padStart(5)}  ${rel}`);
    if (!CHECK) fs.writeFileSync(full, html, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}enrich-utility-pages`);
  console.log(`  pages enriched: ${written}`);
  for (const r of report) console.log(r);
}

main();
