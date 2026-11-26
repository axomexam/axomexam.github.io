#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics3d.js
 *
 * Last top-up: one section for the medieval India page.
 * English only. Idempotent: marked with <!-- axo-deep3d:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (t) => `<p lang="en">${t}</p>`;
const UL = (items) => `<ul>\n${items.map((i) => `  <li lang="en">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/indian-history/medieval-indian-history-sec/medieval-india": [
    ["Where the medieval period is known from", [
      "Court chronicles carry most of the political narrative: Minhaj-us-Siraj's Tabakat-i-Nasiri for the early Sultanate, Ziauddin Barani's Tarikh-i-Firuz Shahi for the Khaljis and Tughlaqs, and Abul Fazl's Akbarnama for the Mughals.",
      "Travellers supply the outside view - Ibn Battuta in the fourteenth century, Abdur Razzaq at Vijayanagara in the fifteenth, and Francois Bernier under Aurangzeb. Inscriptions, coins and monuments fill in what the chronicles leave out, and regional literature in Marathi, Bengali and Assamese records the same centuries from below.",
    ]],
  ],
};

const FAQ_EN = /<h3[^>]*>\s*Frequently Asked Questions\s*<\/h3>/i;

function extraSpan(html) {
  const start = html.search(/<section[^>]*class="[^"]*axo-extra-content/);
  if (start < 0) return null;
  let depth = 0;
  const re = /<section\b|<\/section>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === "<section" ? 1 : -1;
    if (depth === 0) return [start, m.index + m[0].length];
  }
  return null;
}

let changed = 0;
const report = [];

for (const [rel, sections] of Object.entries(DATA)) {
  const file = path.join(ROOT, rel, "index.html");
  if (!fs.existsSync(file)) { report.push(`MISSING ${rel}`); continue; }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("<!-- axo-deep3d:1 -->")) { report.push(`skip ${rel}`); continue; }

  const span = extraSpan(html);
  if (!span) { report.push(`NO-EXTRA ${rel}`); continue; }
  const at = FAQ_EN.exec(html.slice(span[0], span[1]));
  if (!at) { report.push(`NO-FAQ ${rel}`); continue; }

  const block = sections.map(([h3, blocks]) => {
    const body = blocks.map((b) => (Array.isArray(b) ? UL(b) : P(b))).join("\n      ");
    return `      <h3>${h3}</h3>\n      ${body}`;
  }).join("\n");

  const pos = span[0] + at.index;
  html = html.slice(0, pos) + block + "\n      " + html.slice(pos);
  html = html.replace("</main>", "</main>\n<!-- axo-deep3d:1 -->");

  if (!DRY) fs.writeFileSync(file, html);
  changed++;
  report.push(`ok ${rel}`);
}

console.log(report.join("\n"));
console.log(`pages topped up (3d): ${changed}`);
