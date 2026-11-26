#!/usr/bin/env node
"use strict";

/*
 * tools/merge-biology-more.js
 *
 * Appends tools/dhs-dme-technical.biology-more.js into the biology legacy
 * bank that build-dhs-dme-technical.js reads. The merge is keyed by id, so a
 * second run changes nothing and an edited item is replaced rather than
 * duplicated.
 *
 * Usage:
 *   node tools/merge-biology-more.js           # write
 *   node tools/merge-biology-more.js --check   # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const BANK = path.join(
  ROOT, "tools", "legacy-banks", "dhs-dme-technical",
  "technical-science", "biology", "question-001.json"
);

const { questions: extra } = require("./dhs-dme-technical.biology-more.js");
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
    `merge-biology-more: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced}) ${before === after ? "unchanged" : "would change"}`
  );
} else {
  fs.writeFileSync(BANK, after);
  console.log(
    `merge-biology-more: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced})`
  );
}
