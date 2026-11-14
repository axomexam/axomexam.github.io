#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/build-rrb-ntpc.js

   Builds the "RRB NTPC" exam book from tools/rrb-ntpc.structure.js and
   tools/rrb-ntpc.questions.js. For the book it writes, idempotently:

     data/exams/rrb-ntpc.json
     data/exams/rrb-ntpc/syllabus.json
     data/exams/rrb-ntpc/<section>.json
     data/exams/rrb-ntpc/<section>/<topic>/index.json
     data/exams/rrb-ntpc/<section>/<topic>/question-001.json
     data/exams/rrb-ntpc/<section>/<group>/index.json
     data/exams/rrb-ntpc/<section>/<group>/<topic>/index.json
     data/exams/rrb-ntpc/<section>/<group>/<topic>/question-001.json

   and splices the exam entry into data/exams/index.json in place, keeping
   the index's compact hand formatting.

   The book is registered with status "coming-soon", so the /exams/ listing
   keeps showing the "Coming Soon" chip while the tree and the one sample
   question per topic are published. Flip the status to "available" (and
   upload the full banks) when the content is ready.

   Usage:
     node tools/build-rrb-ntpc.js
     node tools/build-rrb-ntpc.js --dry-run
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { EXAM, SYLLABUS } = require("./rrb-ntpc.structure.js");
const { QUESTIONS } = require("./rrb-ntpc.questions.js");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const PRIMARY = "question-001.json";

let written = 0;
let skipped = 0;

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  const next = content.endsWith("\n") ? content : content + "\n";
  let prev = null;
  try { prev = fs.readFileSync(abs, "utf8"); } catch (e) {}
  if (prev === next) { skipped++; return; }
  if (!DRY) {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, next, "utf8");
  }
  written++;
}

function writeJSON(rel, obj) {
  write(rel, JSON.stringify(obj, null, 2));
}

/* JSON in the style of data/exams/index.json: objects whose values are all
   short strings collapse onto one line, deeper structures stay expanded. */
function compactJSON(value, indent) {
  const pad = " ".repeat(indent);
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const items = value.map((v) => pad + "  " + compactJSON(v, indent + 2));
    return "[\n" + items.join(",\n") + "\n" + pad + "]";
  }
  const keys = Object.keys(value);
  const inline = keys.every((k) => {
    const v = value[k];
    return v === null || typeof v !== "object";
  });
  const oneLine = "{" + keys.map((k) => ` ${JSON.stringify(k)}: ${JSON.stringify(value[k])}`).join(",") + " }";
  if (inline && oneLine.length + indent <= 150) return oneLine;
  const lines = keys.map((k) =>
    pad + "  " + JSON.stringify(k) + ": " + compactJSON(value[k], indent + 2)
  );
  return "{\n" + lines.join(",\n") + "\n" + pad + "}";
}

/* ---------------- exam entry + section files ---------------- */

function examEntry() {
  return {
    id: EXAM.id,
    title: EXAM.title,
    subtitle: EXAM.subtitle,
    note: EXAM.note,
    cover: EXAM.cover,
    logo: EXAM.logo,
    logoAlt: EXAM.logoAlt,
    coverAlt: EXAM.coverAlt,
    color: EXAM.color,
    icon: EXAM.icon,
    status: EXAM.status,
    sections: EXAM.sections.map((s) => {
      const out = { id: s.id, type: s.type, color: s.color, title: s.title };
      if (Array.isArray(s.subcategories)) out.subcategories = s.subcategories;
      return out;
    }),
  };
}

writeJSON(`data/exams/${EXAM.id}.json`, examEntry());
writeJSON(`data/exams/${EXAM.id}/syllabus.json`, SYLLABUS);

/* Collect every leaf (the deepest node, which carries a question bank) and
   every group node (a sub-category that only holds further sub-categories).
   The SPA router allows at most two sub-levels under a section, so the tree
   is never deeper than section → group → topic. */
const leaves = [];
const groups = [];

for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  writeJSON(`data/exams/${EXAM.id}/${sec.id}.json`, {
    id: sec.id,
    type: "qa",
    title: sec.title,
    subject: sec.title,
    description: {
      en: `Topic-wise question bank for the RRB NTPC examination - ${sec.title.en}.`,
      as: `RRB NTPC পৰীক্ষাৰ ${sec.title.as}ৰ বিষয়-ভিত্তিক প্ৰশ্ন-বেংক।`,
    },
    questions: [],
  });

  for (const sub of sec.subcategories || []) {
    const children = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    if (children.length) {
      groups.push({ sec, group: sub });
      for (const leaf of children) leaves.push({ sec, groups: [sub], leaf });
    } else {
      leaves.push({ sec, groups: [], leaf: sub });
    }
  }
}

function leafParts(item) {
  return [item.sec.id, ...item.groups.map((g) => g.id), item.leaf.id];
}

/* A group folder only holds sub-folders, so its manifest lists no direct
   question files — exactly like
   data/exams/adre-grade-3/history/assam-history/index.json. */
for (const g of groups) {
  const rel = ["data", "exams", EXAM.id, g.sec.id, g.group.id].join("/");
  writeJSON(`${rel}/index.json`, { subcategory: g.group.id, files: [] });
}

for (const item of leaves) {
  const rel = ["data", "exams", EXAM.id, ...leafParts(item)].join("/");
  const sample = QUESTIONS[item.leaf.id];
  const bank = sample ? [{ id: `${item.leaf.id}-001`, ...sample }] : [];
  writeJSON(`${rel}/${PRIMARY}`, bank);
  writeJSON(`${rel}/index.json`, { subcategory: item.leaf.id, files: [PRIMARY] });
}

/* ---------------- register in data/exams/index.json ----------------
   The index is hand-formatted with compact one-line sub-category objects.
   Re-serialising it would reformat every other exam, so the entry is
   spliced into the raw text and only this exam's block changes. The Railway
   block is reused in place, so the book takes Railway's slot in the listing. */
{
  const idxRel = "data/exams/index.json";
  const idxAbs = path.join(ROOT, idxRel);
  const raw = fs.readFileSync(idxAbs, "utf8");
  const entry = examEntry();

  const objEnd = (text, openIdx) => {
    let depth = 0;
    let inStr = false;
    let esc2 = false;
    for (let i = openIdx; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (esc2) esc2 = false;
        else if (ch === "\\") esc2 = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') inStr = true;
      else if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (!depth) return i; }
    }
    return -1;
  };

  const blockFor = (id) => {
    const key = `"id": "${id}"`;
    const at = raw.indexOf(key);
    if (at === -1) return null;
    const open = raw.lastIndexOf("{", at);
    const close = objEnd(raw, open);
    if (open === -1 || close === -1) return null;
    return { open, end: close + 1 };
  };

  const existing = blockFor(EXAM.id);
  const anchor = blockFor("railway");
  const text = "    " + compactJSON(entry, 4);
  if (existing) {
    write(idxRel, raw.slice(0, existing.open) + text.trimStart() + raw.slice(existing.end));
  } else if (anchor) {
    write(idxRel, raw.slice(0, anchor.end) + ",\n" + text + raw.slice(anchor.end));
  } else {
    throw new Error("Could not find a splice anchor in data/exams/index.json");
  }
}

/* ---------------- validate ---------------- */
{
  const leafIds = new Set(leaves.map((l) => l.leaf.id));
  const missing = [...leafIds].filter((id) => !QUESTIONS[id]);
  const unused = Object.keys(QUESTIONS).filter((id) => !leafIds.has(id));
  if (missing.length) throw new Error(`No sample question for leaf topic(s): ${missing.join(", ")}`);
  if (unused.length) throw new Error(`Sample question(s) not attached to a topic: ${unused.join(", ")}`);

  const texts = new Set();
  for (const item of leaves) {
    const t = QUESTIONS[item.leaf.id].q.en;
    if (texts.has(t)) throw new Error(`Duplicate sample question text: ${t}`);
    texts.add(t);
  }
}

console.log(
  `${DRY ? "[dry-run] " : ""}rrb-ntpc: ${leaves.length} topics, ${groups.length} groups, ` +
  `${written} file(s) written, ${skipped} unchanged`
);
