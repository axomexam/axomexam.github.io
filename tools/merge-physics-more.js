#!/usr/bin/env node
"use strict";

/*
 * tools/merge-physics-more.js
 *
 * Appends tools/dhs-dme-technical.physics-more.js into the physics legacy
 * bank that build-dhs-dme-technical.js reads. The merge is keyed by id, so a
 * second run changes nothing and an edited item is replaced rather than
 * duplicated.
 *
 * Usage:
 *   node tools/merge-physics-more.js           # write
 *   node tools/merge-physics-more.js --check   # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const BANK = path.join(
  ROOT, "tools", "legacy-banks", "dhs-dme-technical",
  "technical-science", "physics", "question-001.json"
);

const { questions: extra } = require("./dhs-dme-technical.physics-more.js");
const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));

const byId = new Map(bank.map((q) => [q.id, q]));
let added = 0;
let replaced = 0;
for (const q of extra) {
  if (byId.has(q.id)) replaced++;
  else added++;
  byId.set(q.id, q);
}

const merged = [...byId.values()];
const before = fs.readFileSync(BANK, "utf8");
const after = JSON.stringify(merged, null, 2) + "\n";

if (CHECK) {
  console.log(
    `merge-physics-more: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced}) ${before === after ? "unchanged" : "would change"}`
  );
} else {
  fs.writeFileSync(BANK, after);
  console.log(
    `merge-physics-more: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced})`
  );
}
