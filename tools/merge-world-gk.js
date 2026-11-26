#!/usr/bin/env node
"use strict";

/* Merges tools/dhs-dme-technical.world-gk-extra.js into the legacy
   world-GK bank. Items whose id starts with "world-gk-extra-" are replaced,
   so a second run does not double the bank. */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BANK = path.join(
  ROOT, "tools", "legacy-banks", "dhs-dme-technical", "general-knowledge", "world-gk", "question-001.json"
);
const extra = require("./dhs-dme-technical.world-gk-extra.js").questions;

const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));
const kept = bank.filter((q) => !String(q.id).startsWith("world-gk-extra-"));
const out = kept.concat(extra);
fs.writeFileSync(BANK, JSON.stringify(out, null, 2) + "\n");

const per = {};
for (const q of out) per[q.leaf] = (per[q.leaf] || 0) + 1;
console.log("merge-world-gk: kept " + kept.length + " + " + extra.length + " = " + out.length);
for (const [k, v] of Object.entries(per)) console.log("  " + k.padEnd(26) + String(v).padStart(4));
