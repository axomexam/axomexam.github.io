#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics3b.js
 *
 * Final top-up for four pages of batch 3 that landed under the floor.
 * English only. Idempotent: marked with <!-- axo-deep3b:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (t) => `<p lang="en">${t}</p>`;
const UL = (items) => `<ul>\n${items.map((i) => `  <li lang="en">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/science/biology/human-body": [
    ["Cells, tissues and the levels of organisation", [
      "The body is organised in levels: cells, tissues, organs and systems. A human cell has a nucleus, cytoplasm and a cell membrane, with mitochondria for energy, ribosomes for protein synthesis and the endoplasmic reticulum for transport.",
      "There are four tissue types. Epithelial tissue covers and lines surfaces; connective tissue includes bone, cartilage, blood and fat; muscular tissue is of three kinds - skeletal, smooth and cardiac; and nervous tissue carries electrical signals.",
      "Traps: cardiac muscle is involuntary and striated; skeletal muscle is voluntary; the largest cell in the body is the ovum and the longest is the nerve cell; and the body contains roughly 37 trillion cells.",
    ]],
  ],
  "topic/gk/indian-history/ancient-indian-history-sec/ancient-india": [
    ["Mauryan administration and Ashoka's dhamma", [
      "The Mauryan state is described in the Arthashastra and in the edicts. The empire was divided into provinces governed from Taxila, Ujjain, Suvarnagiri, Tosali and Kalinga, with officials such as the mahamatras, the rajukas and the pradeshikas reporting to the centre. Spies, a standing army and state-controlled mines and forests gave the empire its reach.",
      "Ashoka's dhamma was a policy rather than a religion: respect for elders and teachers, tolerance between sects, welfare measures such as wells, rest houses and medical care, and the appointment of dhamma-mahamatras. The edicts are in Prakrit, Greek and Aramaic, which shows how far the audience stretched.",
      "The empire declined after Ashoka; Pushyamitra Sunga took power around 185 BCE, and the north-west passed to Indo-Greek rulers. That break is the standard dividing line between the Mauryan age and the post-Mauryan period.",
    ]],
  ],
  "topic/gk/indian-history/medieval-indian-history-sec/medieval-india": [
    ["Administration, economy and culture under the Sultanate", [
      "The Sultanate's administration rested on the iqta: an officer collected revenue from an assignment, kept part of it and paid his troops from the rest. Departments such as the diwan-i-wizarat for finance and the diwan-i-arz for the army gave the state its structure, and Persian became the language of government.",
      "Alauddin Khalji controlled prices in the Delhi market and paid soldiers in cash; Muhammad bin Tughlaq experimented with token currency and with moving the capital to Daulatabad, both of which failed; Firuz Shah built canals and towns. Those experiments are the most frequently asked administrative facts of the period.",
      "Culturally the period produced the Qutub Minar, the Alai Darwaza and Tughlaqabad, the poetry of Amir Khusrau and the music tradition he is credited with shaping, and a Bhakti-Sufi dialogue that ran through the whole subcontinent - Kabir, Nanak and the Chishti saints belong to it.",
    ]],
  ],
  "topic/gk/indian-history/modern-indian-history-sec/freedom-struggle": [
    ["Press, women and the last decade", [
      "The nationalist press was part of the movement: Amrita Bazar Patrika, Kesari, The Hindu and Gandhi's Young India and Harijan carried the argument to readers who never attended a meeting, and editors were jailed for it.",
      "Women moved from support roles to leadership. Sarojini Naidu presided over the Congress in 1925, Annie Besant in 1917, and in the 1930 and 1942 movements women led processions, ran underground networks and faced arrest in large numbers.",
      "The last decade ran quickly: the Indian National Army of Subhas Chandra Bose fought in 1943-45, the Cabinet Mission came in 1946, the Mountbatten Plan was announced in June 1947, and the Radcliffe Line drew the partition boundary. Independence came on 15 August 1947, and the princely states were integrated over the following two years.",
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
  if (html.includes("<!-- axo-deep3b:1 -->")) { report.push(`skip ${rel}`); continue; }

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
  html = html.replace("</main>", "</main>\n<!-- axo-deep3b:1 -->");

  if (!DRY) fs.writeFileSync(file, html);
  changed++;
  report.push(`ok ${rel}`);
}

console.log(report.join("\n"));
console.log(`pages topped up (3b): ${changed}`);
