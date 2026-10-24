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
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Questions per category</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n          ${rows}\n        </ul>\n` +
      `        <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Where to begin</h3>\n` +
      `        <ul style="margin:8px 0 0 20px; line-height:1.9;">\n` +
      `          <li>Open the category that matches your exam syllabus first.</li>\n` +
      `          <li>Work topic by topic rather than jumping between categories.</li>\n` +
      `          <li>Use the language toggle to read the same question in Assamese or English.</li>\n` +
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
      `        </ul>`
  );
}

const BLOCKS = {
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
    if (before === null || before >= 800) continue;

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
