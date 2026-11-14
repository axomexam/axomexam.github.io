#!/usr/bin/env node
"use strict";

/*
 * tools/expand-quiz-schema.js
 *
 * Brings the Quiz.hasPart structured data back in line with the questions
 * that are actually visible in the page body.
 *
 * tools/inject-static-questions.js now renders the complete question bank
 * (up to 300 items) as static HTML, but the Quiz node in the JSON-LD was
 * generated earlier from a build that capped hasPart at 25 entries. The
 * mismatch means Google reads a page that shows 300 questions while the
 * structured data claims 25.
 *
 * This script reads the visible static questions and rewrites ONLY the
 * hasPart array of the Quiz node. Every other JSON-LD node (WebPage,
 * FAQPage, BreadcrumbList, LearningResource, ItemList, ...) and every
 * other property of the Quiz node is preserved byte-for-byte.
 *
 * Idempotent: a page whose hasPart already matches the visible question
 * count is left untouched.
 *
 * Usage:
 *   node tools/expand-quiz-schema.js          # apply
 *   node tools/expand-quiz-schema.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github", "_preview"]);

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "-", ndash: "-", hellip: "...", middot: "-", times: "x",
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', deg: "deg",
};

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, name) => {
      const k = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, k) ? NAMED_ENTITIES[k] : m;
    });
}

function strip(html) {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1).trim() + "\u2026" : str;
}

/* Same shape as the static qa-item markup written by
   tools/inject-static-questions.js. */
function extractFlashcards(html) {
  const cards = [];
  const parts = html.split('<div class="qa-item"');
  parts.shift();
  for (const p of parts) {
    const qm = p.match(/<div lang="en" style="font-weight:800;[^"]*">([\s\S]*?)<\/div>/);
    if (!qm) continue;
    const q = strip(qm[1]).replace(/^Q\d+\.\s*/, "");
    const am = p.match(/<strong>Answer:<\/strong>([\s\S]*?)<\/div>/);
    const a = am ? strip(am[1]) : "";
    if (q && a) cards.push({ q: truncate(q, 300), a: truncate(a, 500) });
  }
  return cards;
}

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

/* Locate the single JSON-LD block and rewrite the Quiz node's hasPart. */
function expandQuiz(html) {
  const open = html.indexOf('<script type="application/ld+json">');
  if (open === -1) return { html, changed: false, reason: "no-jsonld" };
  const start = open + '<script type="application/ld+json">'.length;
  const end = html.indexOf("</script>", start);
  if (end === -1) return { html, changed: false, reason: "no-jsonld" };

  let graph;
  try {
    graph = JSON.parse(html.slice(start, end));
  } catch (e) {
    return { html, changed: false, reason: "invalid-json" };
  }

  const nodes = Array.isArray(graph["@graph"]) ? graph["@graph"] : null;
  if (!nodes) return { html, changed: false, reason: "no-graph" };
  const quiz = nodes.find((n) => n && n["@type"] === "Quiz");
  if (!quiz) return { html, changed: false, reason: "no-quiz" };

  const cards = extractFlashcards(html);
  if (!cards.length) return { html, changed: false, reason: "no-questions" };

  const current = Array.isArray(quiz.hasPart) ? quiz.hasPart.length : 0;
  if (current === cards.length) return { html, changed: false, reason: "already-current", count: current };

  quiz.hasPart = cards.map((c) => ({
    "@type": "Question",
    eduQuestionType: "Flashcard",
    text: c.q,
    acceptedAnswer: { "@type": "Answer", text: c.a },
  }));

  const json = JSON.stringify(graph);
  return {
    html: html.slice(0, start) + json + html.slice(end),
    changed: true,
    from: current,
    to: cards.length,
  };
}

function main() {
  const files = walk(ROOT, []);
  let scanned = 0;
  let updated = 0;
  let expanded = 0;
  const reasons = {};

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    scanned++;
    const res = expandQuiz(html);
    if (!res.changed) {
      reasons[res.reason] = (reasons[res.reason] || 0) + 1;
      continue;
    }
    updated++;
    expanded += res.to - res.from;
    if (!CHECK) fs.writeFileSync(file, res.html, "utf8");
  }

  console.log(`${CHECK ? "[check] " : ""}Quiz schema expansion`);
  console.log(`  HTML scanned:      ${scanned}`);
  console.log(`  Quiz nodes grown:  ${updated}`);
  console.log(`  hasPart entries:   +${expanded}`);
  console.log(`  skipped:           ${JSON.stringify(reasons)}`);
}

main();
