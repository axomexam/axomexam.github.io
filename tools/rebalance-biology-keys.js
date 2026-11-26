#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/rebalance-biology-keys.js

   The biology bank was authored with the natural answer first, so the
   published key sat on option A for most items. This tool rotates each
   item's options so that, within every leaf, the correct answers are
   spread evenly across A/B/C/D.

   Leaf membership is read from the built leaf files, which means the
   classification rules in build-dhs-dme-technical.js decide the groups
   and this tool never re-implements them. Only the option order and the
   `correct` index change; the stem, the options themselves and the
   explanation are untouched, so the meaning of every item is preserved.

   The target slot for each item is derived from a seeded shuffle, so a
   re-run reproduces identical bytes.

   Run:  node tools/rebalance-biology-keys.js
         node tools/rebalance-biology-keys.js --check
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const BANK = path.join(
  ROOT, "tools", "legacy-banks", "dhs-dme-technical",
  "technical-science", "biology", "question-001.json"
);
const BUILT = path.join(
  ROOT, "data", "exams", "dhs-dme-technical",
  "technical-science", "biology"
);

/* Deterministic shuffle so the target slots are spread but a rebuild is
   byte-identical. Same generator as the history builder. */
function shuffle(n, seed) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(i % 4);
  let s = seed;
  const rand = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));
const byId = new Map(bank.map((q) => [q.id, q]));

const leaves = fs
  .readdirSync(BUILT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let moved = 0;
let seed = 20260101;

for (const leaf of leaves) {
  const file = path.join(BUILT, leaf, "question-001.json");
  if (!fs.existsSync(file)) continue;
  const ids = JSON.parse(fs.readFileSync(file, "utf8")).map((q) => q.id);
  const targets = shuffle(ids.length, seed++);

  ids.forEach((id, i) => {
    const q = byId.get(id);
    if (!q) return;
    const target = targets[i];
    const shift = (q.correct - target + 4) % 4;
    if (shift === 0) return;
    q.options = q.options.slice(shift).concat(q.options.slice(0, shift));
    q.correct = target;
    moved++;
  });
}

const after = JSON.stringify([...byId.values()], null, 2) + "\n";
const before = fs.readFileSync(BANK, "utf8");

if (CHECK) {
  console.log(`rebalance-biology-keys: would rotate ${moved} item(s) ${before === after ? "(unchanged)" : ""}`);
} else {
  fs.writeFileSync(BANK, after);
  console.log(`rebalance-biology-keys: rotated ${moved} item(s)`);
}
