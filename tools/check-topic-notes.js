#!/usr/bin/env node
/* Guard for tools/dhs-dme-technical.notes.js: every topic that has notes must
   carry at least MIN words in both languages, and the block structure must be
   one the renderers understand. Run before every build. */
const NOTES = require("./dhs-dme-technical.notes.js");

const MIN = 1300;
const KINDS = new Set(["h3", "p", "tip", "ul"]);

function words(blocks) {
  return blocks.reduce((n, b) => {
    const text = Array.isArray(b[1]) ? b[1].join(" ") : b[1];
    return n + String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

let bad = 0;
const ids = Object.keys(NOTES);
for (const id of ids) {
  const note = NOTES[id];
  for (const lang of ["en", "as"]) {
    const blocks = note[lang];
    if (!Array.isArray(blocks) || !blocks.length) {
      console.log(`FAIL ${id}: missing ${lang}`);
      bad++;
      continue;
    }
    const unknown = blocks.filter((b) => !Array.isArray(b) || !KINDS.has(b[0]) || b[1] == null);
    if (unknown.length) {
      console.log(`FAIL ${id}/${lang}: ${unknown.length} malformed block(s)`);
      bad++;
    }
    const w = words(blocks);
    if (w < MIN) {
      console.log(`SHORT ${id}/${lang}: ${w} words (need ${MIN})`);
      bad++;
    }
  }
}
console.log(`notes: ${ids.length} topic(s), ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
