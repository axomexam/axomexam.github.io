#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics3c.js
 *
 * Final top-up for three history pages of batch 3.
 * English only. Idempotent: marked with <!-- axo-deep3c:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (t) => `<p lang="en">${t}</p>`;
const UL = (items) => `<ul>\n${items.map((i) => `  <li lang="en">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/indian-history/ancient-indian-history-sec/ancient-india": [
    ["The Gupta age in one page", [
      "The Guptas are dated from Chandragupta I's assumption of the title Maharajadhiraja around 319-320 CE, the start of the Gupta era. Samudragupta's campaigns are recorded on the Allahabad pillar, and Chandragupta II extended the empire westwards to Gujarat, where the Mehrauli iron pillar inscription and the Udayagiri caves belong to his reign.",
      "The period is known for Sanskrit literature - Kalidasa, Vishakhadatta and the compilation of the Puranas - for mathematics and astronomy in the work of Aryabhata, and for temple architecture at Deogarh, Bhitargaon and Udayagiri. Fa-Hien's account describes a prosperous, lightly governed countryside.",
      "The label golden age is a nineteenth-century judgement; historians now point to rigid caste rules, land grants that weakened central control, and the Huna invasions that ended Gupta power in the sixth century.",
    ]],
  ],
  "topic/gk/indian-history/medieval-indian-history-sec/medieval-india": [
    ["Vijayanagara and Bahmani compared", [
      "The two Deccan powers were founded within eleven years of each other and fought for the same rivers. Vijayanagara (1336) controlled the Tungabhadra and the trade to the west coast; the Bahmani Sultanate (1347) controlled the Godavari and the Deccan plateau, with its capital first at Gulbarga and later at Bidar.",
      "Their rivalry produced the standard exam pairings: Krishnadevaraya of Vijayanagara against the Bahmani and later Bijapur forces, the battle of Talikota in 1565 that broke Vijayanagara, and the five successor states of the Bahmanis - Bijapur, Golconda, Ahmadnagar, Bidar and Berar.",
      "Traps: Vijayanagara's founders are Harihara and Bukka, not Krishnadevaraya; the Bahmani capital moved from Gulbarga to Bidar, not the other way; and Talikota is 1565, after Krishnadevaraya's death, not during his reign.",
    ]],
  ],
  "topic/gk/indian-history/modern-indian-history-sec/freedom-struggle": [
    ["Acts, missions and dates to keep straight", [
      [
        "1857 - revolt; 1858 - Crown rule begins, Company abolished.",
        "1885 - Indian National Congress founded; 1905 - partition of Bengal; 1911 - partition annulled.",
        "1909 - Morley-Minto reforms; 1919 - Montagu-Chelmsford reforms and Rowlatt Act.",
        "1919 - Jallianwala Bagh; 1920-22 - Non-Cooperation; 1930 - Dandi and Civil Disobedience.",
        "1935 - Government of India Act; 1942 - Quit India; 1946 - Cabinet Mission; 1947 - Mountbatten Plan and independence.",
      ],
      "Traps: the Congress's first session was in Bombay in 1885 with 72 delegates; the Muslim League was founded in 1906 at Dhaka; and the Indian Independence Act received royal assent on 18 July 1947, five weeks before 15 August.",
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
  if (html.includes("<!-- axo-deep3c:1 -->")) { report.push(`skip ${rel}`); continue; }

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
  html = html.replace("</main>", "</main>\n<!-- axo-deep3c:1 -->");

  if (!DRY) fs.writeFileSync(file, html);
  changed++;
  report.push(`ok ${rel}`);
}

console.log(report.join("\n"));
console.log(`pages topped up (3c): ${changed}`);
