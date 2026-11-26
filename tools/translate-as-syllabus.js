#!/usr/bin/env node
"use strict";

/*
 * tools/translate-as-syllabus.js
 *
 * The served /as/ HTML for the ADRE Grade IV and Assam Police syllabus pages
 * was still the English article (only <head> and the first <h1> were swapped),
 * so a crawler that does not run JS read a full English body on an Assamese
 * URL. This tool replaces the <article class="info-panel"> body with the
 * Assamese article kept in data/i18n/syllabus-as.js.
 *
 * Idempotent: it always writes the Assamese article for the listed exams.
 *
 * Usage:
 *   node tools/translate-as-syllabus.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CONTENT = require(path.join(ROOT, "data", "i18n", "syllabus-as.js"));

let changed = 0;
for (const [examId, article] of Object.entries(CONTENT)) {
  const file = path.join(ROOT, "as", "exams", examId, "syllabus", "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const re = /(<article class="info-panel"[^>]*>)([\s\S]*?)(<\/article>)/;
  const m = re.exec(html);
  if (!m) continue;
  const next = m[1] + "\n" + article.trim() + "\n      " + m[3];
  if (next === m[0]) continue;
  fs.writeFileSync(file, html.slice(0, m.index) + next + html.slice(m.index + m[0].length));
  changed++;
}

console.log(`translate-as-syllabus: changed ${changed}`);
