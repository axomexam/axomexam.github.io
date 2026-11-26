#!/usr/bin/env node
"use strict";

/*
 * tools/merge-bank.js
 *
 * Merges an authored question file into a legacy bank that
 * build-dhs-dme-technical.js reads. Keyed by id, so a second run changes
 * nothing and an edited item is replaced rather than duplicated. Creates the
 * bank and its directory when the group has no bank yet.
 *
 * Usage:
 *   node tools/merge-bank.js <group> <authored-file>
 *   node tools/merge-bank.js <group> <authored-file> --check
 *
 *   <group>          biology | chemistry | physics | computer-awareness | ...
 *   <authored-file>  path relative to tools/, e.g. dhs-dme-technical.physics-more.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const CHECK = process.argv.includes("--check");

if (args.length !== 2) {
  console.error("usage: node tools/merge-bank.js <group> <authored-file> [--check]");
  process.exit(1);
}

const [group, authored] = args;
const BANK_DIR = path.join(
  ROOT, "tools", "legacy-banks", "dhs-dme-technical",
  "technical-science", group
);
const BANK = path.join(BANK_DIR, "question-001.json");

const { questions: extra } = require(path.join(ROOT, "tools", authored));

const bank = fs.existsSync(BANK) ? JSON.parse(fs.readFileSync(BANK, "utf8")) : [];
const before = fs.existsSync(BANK) ? fs.readFileSync(BANK, "utf8") : "";

const byId = new Map(bank.map((q) => [q.id, q]));
let added = 0;
let replaced = 0;
for (const q of extra) {
  if (byId.has(q.id)) replaced++;
  else added++;
  byId.set(q.id, q);
}

const merged = [...byId.values()];
const after = JSON.stringify(merged, null, 2) + "\n";
const label = path.basename(authored, ".js");

if (CHECK) {
  console.log(
    `${label}: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced}) ${before === after ? "unchanged" : "would change"}`
  );
} else {
  fs.mkdirSync(BANK_DIR, { recursive: true });
  fs.writeFileSync(BANK, after);
  console.log(
    `${label}: ${bank.length} -> ${merged.length} ` +
    `(added ${added}, replaced ${replaced})`
  );
}
