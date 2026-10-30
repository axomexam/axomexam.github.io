#!/usr/bin/env node
/* ============================================================
   axomexam — tools/sync-home-hero-count.js

   Keeps the question count in the committed homepage hero block in
   step with the data the site actually ships.

   The homepage number is rendered by js/app.js at runtime, but crawlers
   and no-JS visitors only ever see the value written into the committed
   index.html. That static value used to be edited by hand, so it went
   stale every time questions were added. This tool recomputes it from
   the same sources the runtime uses and rewrites the block:

     topicCounts (data/counts.json) + examsTotal (data/counts.json)
       + current-affairs questions + trending questions

   Run after any content change (see AGENTS.md build pipeline):

     node tools/sync-home-hero-count.js            # apply
     node tools/sync-home-hero-count.js --check    # report drift only
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HOME = path.join(ROOT, "index.html");
const CHECK = process.argv.includes("--check");

/* Same constant as tools/prerender.js and js/app.src.js. */
const PDF_NOTE_COUNT = 21;

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function countQuestionsFile(file) {
  const d = readJSON(file);
  if (Array.isArray(d)) return d.length;
  if (d && Array.isArray(d.questions)) return d.questions.length;
  return 0;
}

/* Every question file in a directory, ignoring the index.json manifest. */
function sumQuestionDir(dir) {
  let total = 0;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return 0;
  }
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!/\.json$/i.test(e.name) || /^index\.json$/i.test(e.name)) continue;
    total += countQuestionsFile(path.join(dir, e.name));
  }
  return total;
}

/* Mirrors homepageQuestionTotal() in tools/prerender.js. */
function homepageTotals() {
  const counts = readJSON(path.join(ROOT, "data", "counts.json")) || {};

  let questions = 0;
  const topicCounts = counts.topicCounts || {};
  for (const k of Object.keys(topicCounts)) questions += Number(topicCounts[k]) || 0;
  questions += Number(counts.examsTotal) || 0;

  const caDir = path.join(ROOT, "data", "current-affairs");
  try {
    for (const e of fs.readdirSync(caDir, { withFileTypes: true })) {
      if (e.isDirectory()) questions += sumQuestionDir(path.join(caDir, e.name));
    }
  } catch (e) {}

  const trendingDir = path.join(ROOT, "data", "trending-topics");
  let trendingFiles = [];
  try {
    trendingFiles = fs.readdirSync(trendingDir).filter((n) => /\.json$/i.test(n));
  } catch (e) {}
  for (const f of trendingFiles) questions += countQuestionsFile(path.join(trendingDir, f));

  const topics = Object.keys(topicCounts).length + trendingFiles.length;

  return { questions, topics, pdfs: PDF_NOTE_COUNT };
}

function fmt(n) {
  return n.toLocaleString("en-US");
}

/* Rebuild the block with the indentation it already has, so the edit is a
   pure number swap and never shifts the surrounding markup. */
function buildBlock(t, indent) {
  const i = indent;
  return `${i}<div class="hero-stats">
${i}  <div class="stat"><b>${fmt(t.questions)}+</b><span>Questions</span></div>
${i}  <div class="stat"><b>${fmt(t.topics)}+</b><span>Topics</span></div>
${i}  <div class="stat"><b>${fmt(t.pdfs)}+</b><span>PDFs</span></div>
${i}</div>`;
}

function main() {
  const totals = homepageTotals();
  const html = fs.readFileSync(HOME, "utf8");

  const re = /(^[ \t]*)<div class="hero-stats">[\s\S]*?<\/div>\s*<\/div>/m;
  const match = html.match(re);
  if (!match) {
    console.error("sync-home-hero-count: hero-stats block not found in index.html");
    process.exit(1);
  }

  const current = match[0];
  const desired = buildBlock(totals, match[1]);

  if (current === desired) {
    console.log(
      `sync-home-hero-count: up to date (${fmt(totals.questions)} questions, ` +
      `${fmt(totals.topics)} topics, ${fmt(totals.pdfs)} PDFs)`
    );
    return;
  }

  if (CHECK) {
    console.error("sync-home-hero-count: DRIFT");
    console.error("  current:\n" + current);
    console.error("  desired:\n" + desired);
    process.exit(1);
  }

  fs.writeFileSync(HOME, html.replace(re, desired), "utf8");
  console.log(
    `sync-home-hero-count: updated index.html hero to ` +
    `${fmt(totals.questions)} questions, ${fmt(totals.topics)} topics, ${fmt(totals.pdfs)} PDFs`
  );
}

main();
