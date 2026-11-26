#!/usr/bin/env node
"use strict";

/*
 * Builds the study notes for every DHS & DME Technical Grade III leaf that has
 * no hand-written entry. The prose is taken from material already written for
 * this site — the RRB NTPC topic articles, the ADRE Grade III notes and the
 * e-book chapters — then blended, re-pointed at the DHS paper, and finished
 * with worked questions from the leaf's own bank. Nothing here is a template
 * paragraph; only the short exam note and the worked-question lead-in repeat.
 *
 *   tools/dhs-dme-technical.notes.sources.js   which prose belongs to which leaf
 *   tools/dhs-dme-technical.notes.original.js  fresh notes for leaves with no source
 *
 * Outputs:
 *   tools/dhs-dme-technical.notes.auto.js
 *   data/exams/dhs-dme-technical/notes.json
 *   exams/.../index.html          (bilingual notes)
 *   as/exams/.../index.html       (Assamese-only notes)
 *
 * Usage:
 *   node tools/gen-dhs-dme-technical-notes.js --check
 *   node tools/gen-dhs-dme-technical-notes.js --apply
 */

const fs = require("fs");
const path = require("path");
const { EXAM } = require("./dhs-dme-technical.structure.js");
const NOTES = require("./dhs-dme-technical.notes.js");
const SOURCES = require("./dhs-dme-technical.notes.sources.js");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const EXAM_ID = EXAM.id;
const TARGET = 1400;

let ORIGINAL = {};
try { ORIGINAL = require("./dhs-dme-technical.notes.original.js"); } catch (e) { ORIGINAL = {}; }

const ADRE = require("./adre-grade-3.notes.js");
const ADRE_EXPAND = require("./adre-grade-3.expand-notes.js");
const ADRE_ENGLISH = require("./adre-grade-3.english-notes.js");

const BOOKS = {};
function book(name) {
  if (!BOOKS[name]) BOOKS[name] = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "books", name + ".json"), "utf8"));
  return BOOKS[name];
}

function words(blocks) {
  return blocks.reduce((n, b) => {
    const text = Array.isArray(b[1]) ? b[1].join(" ") : b[1];
    return n + String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

function clean(text) {
  return String(text == null ? "" : text)
    .replace(/RRB\s*NTPC(\s*(CBT|CBT[\s-]?[12]|Graduate\s*Level|Under\s*Graduate\s*Level))?/gi, "DHS & DME Technical Grade III")
    .replace(/\bADRE\b(\s*(3\.0|Grade\s*III))?/gi, "DHS & DME Technical Grade III")
    .replace(/\bRRB\b/g, "DHS & DME")
    .replace(/\bNTPC\b/g, "DHS & DME")
    .replace(/DHS & DME Technical Grade III Technical Grade III/g, "DHS & DME Technical Grade III")
    .replace(/DHS & DME Technical Grade III Grade III/g, "DHS & DME Technical Grade III")
    .replace(/\s+/g, " ")
    .trim();
}

function noteToBlocks(note, lang) {
  const out = [];
  if (!note) return out;
  if (note.h2) out.push(["h3", clean(note.h2[lang] || note.h2.en)]);
  for (const p of (note.p && (note.p[lang] || note.p.en)) || []) out.push(["p", clean(p)]);
  const list = (note.list && (note.list[lang] || note.list.en)) || [];
  if (list.length) {
    out.push(["h3", lang === "as" ? "মুখ্য বিন্দু" : "Key points"]);
    out.push(["ul", list.map(clean)]);
  }
  for (const f of note.faqs || []) {
    const q = f.q && (f.q[lang] || f.q.en);
    const a = f.a && (f.a[lang] || f.a.en);
    if (q && a) out.push(["p", `${lang === "as" ? "প্ৰশ্ন" : "Q"}: ${clean(q)} ${lang === "as" ? "উত্তৰ" : "A"}: ${clean(a)}`]);
  }
  return out;
}

function articleToBlocks(article, lang) {
  const out = [];
  if (article.h2) out.push(["h3", clean(article.h2[lang] || article.h2.en)]);
  for (const p of (article.p && (article.p[lang] || article.p.en)) || []) out.push(["p", clean(p)]);
  return out;
}

function bookToBlocks(name, chapters, lang) {
  const out = [];
  const b = book(name);
  for (const id of chapters) {
    const ch = b.chapters.find((c) => c.id === id);
    if (!ch) continue;
    out.push(["h3", clean(ch.title[lang] || ch.title.en)]);
    for (const p of String(ch.content[lang] || ch.content.en).split(/\n\n+/)) {
      if (p.trim()) out.push(["p", clean(p)]);
    }
  }
  return out;
}

function loadSource(spec, lang) {
  if (spec.r) return articleToBlocks(require("./rrb-ntpc-ga-articles/" + spec.r + ".js"), lang);
  if (spec.a) return noteToBlocks(ADRE[spec.a], lang);
  if (spec.e) return noteToBlocks(ADRE_EXPAND[spec.e], lang);
  if (spec.n) return noteToBlocks(ADRE_ENGLISH[spec.n], lang);
  if (spec.b) return bookToBlocks(spec.b[0], spec.b[1], lang);
  return [];
}

function dedupe(blocks) {
  const seen = new Set();
  const out = [];
  for (const b of blocks) {
    const text = Array.isArray(b[1]) ? b[1].join(" ") : b[1];
    const key = String(text).toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, " ").trim().slice(0, 140);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(b);
  }
  return out;
}

function trimBlocks(blocks, max) {
  let w = 0;
  const out = [];
  for (const b of blocks) {
    const bw = words([b]);
    if (w + bw > max && out.length > 8) break;
    out.push(b);
    w += bw;
  }
  return out;
}

function diverseOrder(bank, lang) {
  const groups = new Map();
  bank.forEach((q, i) => {
    const sig = String((q.q && (q.q[lang] || q.q.en)) || "").toLowerCase()
      .replace(/[0-9\u09E6-\u09EF]+/g, "#")
      .replace(/[^a-z\u0980-\u09FF#]+/g, " ")
      .trim().slice(0, 70);
    if (!groups.has(sig)) groups.set(sig, []);
    groups.get(sig).push(i);
  });
  const lists = [...groups.values()];
  const out = [];
  for (let round = 0; out.length < bank.length; round++) {
    let added = false;
    for (const list of lists) if (list[round] !== undefined) { out.push(list[round]); added = true; }
    if (!added) break;
  }
  return out;
}

const EXAM_NOTE = {
  "general-knowledge": {
    en: "In the DHS & DME Technical Grade III paper this topic is asked as direct one-mark facts, so the dates, names and places above are the part worth memorising. Read the bank once, then come back only to the questions you missed.",
    as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পত্ৰত এই বিষয়টো প্ৰত্যক্ষ এক-নম্বৰৰ তথ্য হিচাপে সোধা হয়, গতিকে ওপৰৰ তাৰিখ, নাম আৰু ঠাইখিনিয়েই মনত ৰখাৰ যোগ্য। প্ৰশ্নগোটটো এবাৰ পঢ়ক, তাৰ পিছত কেৱল ভুল কৰা প্ৰশ্নবোৰলৈ ঘূৰি আহক।",
  },
  "general-english": {
    en: "In the DHS & DME Technical Grade III paper this topic appears inside error spotting, fill in the blanks and sentence correction rather than as a definition. Practise the bank with the rule in mind, and note which rule each wrong option breaks.",
    as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পত্ৰত এই বিষয়টো সংজ্ঞা হিচাপে নহয়, ভুল নিৰ্ণয়, ৰিক্ত স্থান পূৰণ আৰু বাক্য শুধৰণিত আহে। নিয়ম মনত ৰাখি প্ৰশ্নগোটটো অভ্যাস কৰক, আৰু প্ৰতিটো ভুল বিকল্পে কোনটো নিয়ম ভাঙে তাক লিখি ৰাখক।",
  },
  "numerical-aptitude": {
    en: "In the DHS & DME Technical Grade III paper this topic is asked as a short sum, so the formula and one worked example matter more than a long derivation. Attempt the bank with a timer and keep the formula card beside you for the first week.",
    as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পত্ৰত এই বিষয়টো চুটী অঙ্ক হিচাপে সোধা হয়, গতিকে দীঘল প্ৰমাণতকৈ সূত্ৰ আৰু এটা সমাধান কৰা উদাহৰণ বেছি মূল্যবান। সময় লৈ প্ৰশ্নগোটটো কৰক আৰু প্ৰথম সপ্তাহত সূত্ৰৰ কাৰ্ডটো ওচৰত ৰাখক।",
  },
  "logical-reasoning": {
    en: "In the DHS & DME Technical Grade III paper this topic rewards a fixed method more than speed. Draw the figure, table or line before you read the options, and check the rule against every step rather than only the first pair.",
    as: "DHS আৰু DME কাৰিকৰী গ্ৰেড III পত্ৰত এই বিষয়টো গতিৰতকৈ এটা নিৰ্দিষ্ট পদ্ধতিক পুৰস্কৃত কৰে। বিকল্প পঢ়াৰ আগতে চিত্ৰ, তালিকা বা ৰেখা অঁকক, আৰু নিয়ম কেৱল প্ৰথম যোৰত নহয়, প্ৰতিটো খোজত মিলাই চাওক।",
  },
};

function worked(blocks, bank, lang, count, used) {
  const order = diverseOrder(bank, lang);
  let added = 0;
  for (const j of order) {
    if (added >= count) break;
    const q = bank[j];
    const sig = clean((q.q && (q.q.en || "")) || "") + "|" + clean(q.ans || "");
    if (used.has(sig)) continue;
    const opts = (q.options || []).map((o, k) => `(${"ABCD"[k] || k + 1}) ${(o && (o[lang] || o.en)) || ""}`).join(" ");
    if (!opts) continue;
    const exp = (q.explanation && (q.explanation[lang] || q.explanation.en)) || "";
    const ans = q.options[q.correct] ? (q.options[q.correct][lang] || q.options[q.correct].en) : "";
    blocks.push(["p", lang === "as"
      ? `প্ৰ. ${clean((q.q && (q.q[lang] || q.q.en)) || "")} ${clean(opts)} শুদ্ধ উত্তৰ ${clean(ans)}। ${clean(exp)}`
      : `Q. ${clean((q.q && (q.q[lang] || q.q.en)) || "")} ${clean(opts)} The correct choice is ${clean(ans)}. ${clean(exp)}`]);
    used.add(sig);
    added++;
  }
  return added;
}

function compose(item, spec, bank) {
  const result = { en: [], as: [] };
  for (const lang of ["en", "as"]) {
    let blocks = [];
    for (const s of spec) {
      if (s.o) continue;
      blocks = blocks.concat(loadSource(s, lang));
      if (words(blocks) >= 1500) break;
    }
    blocks = trimBlocks(dedupe(blocks), 1600);
    if (!blocks.length) return null;

    blocks.push(["h3", lang === "as" ? "এই প্ৰশ্নগোটৰ পৰা সমাধান কৰা প্ৰশ্ন" : "Worked questions from this bank"]);
    const used = new Set();
    worked(blocks, bank, lang, 4, used);

    let extra = 0;
    while (words(blocks) < TARGET && extra < 40) {
      const before = words(blocks);
      worked(blocks, bank, lang, 2, used);
      if (words(blocks) === before) break;
      extra += 2;
    }

    const note = (EXAM_NOTE[item.sec.id] || EXAM_NOTE["general-knowledge"])[lang];
    if (note) blocks.push(["tip", note]);
    result[lang] = blocks;
  }
  return result;
}

function renderSection(note, titleEn, titleAs, asOnly) {
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const block = (b, l) => {
    const kind = b[0];
    const val = b[1];
    if (kind === "h3") return `<h3 lang="${l}" style="font-size:1.02rem; font-weight:700; margin:22px 0 8px; color:#0f172a;">${esc(val)}</h3>`;
    if (kind === "p") return `<p lang="${l}" style="margin:0 0 12px; line-height:1.85; color:#334155;">${esc(val)}</p>`;
    if (kind === "tip") return `<div lang="${l}" style="margin:14px 0 4px; padding:12px 14px; border-left:3px solid #059669; background:#ecfdf5; border-radius:8px; line-height:1.8; color:#1f3b34;"><strong>${l === "as" ? "পৰীক্ষাৰ টিপ" : "Exam tip"}:</strong> ${esc(val)}</div>`;
    if (kind === "ul") return `<ul lang="${l}" style="margin:0 0 14px 20px; line-height:1.85; color:#334155;">${val.map((v) => `<li style="margin-bottom:6px;">${esc(v)}</li>`).join("")}</ul>`;
    return "";
  };
  const as = (note.as || []).map((b) => block(b, "as")).join("\n");
  if (asOnly) {
    return `
    <section class="section" id="study-notes" style="padding-bottom:48px;">
      <article style="max-width:860px; margin:0 auto;">
        <h2 style="font-size:1.25rem; margin:0 0 6px;">${titleAs}: অধ্যয়ন টোকা</h2>
        <p style="margin:0 0 18px; color:#64748b; font-size:.92rem;">প্ৰশ্নবোৰত হাত দিয়াৰ আগতে এইখিনি পঢ়ি লওক। তলৰ প্ৰতিটো কথা DHS আৰু DME কাৰিকৰী গ্ৰেড III পৰীক্ষাৰ বাবে লিখা।</p>
        <div lang="as">${as}</div>
      </article>
    </section>`;
  }
  const en = (note.en || []).map((b) => block(b, "en")).join("\n");
  return `
    <section class="section" id="study-notes" style="padding-bottom:48px;">
      <article style="max-width:860px; margin:0 auto;">
        <h2 style="font-size:1.25rem; margin:0 0 6px;">${titleEn}: study notes</h2>
        <p style="margin:0 0 18px; color:#64748b; font-size:.92rem;">Read this before you attempt the questions. It is written for the DHS &amp; DME Technical Grade III paper.</p>
        <div lang="en">${en}</div>
        <h2 style="font-size:1.2rem; margin:34px 0 6px;">${titleAs}: অধ্যয়ন টোকা</h2>
        <p style="margin:0 0 18px; color:#64748b; font-size:.92rem;">প্ৰশ্নবোৰত হাত দিয়াৰ আগতে এইখিনি পঢ়ি লওক। তলৰ প্ৰতিটো কথা DHS আৰু DME কাৰিকৰী গ্ৰেড III পৰীক্ষাৰ বাবে লিখা।</p>
        <div lang="as">${as}</div>
      </article>
    </section>`;
}

function leaves() {
  const out = [];
  for (const sec of EXAM.sections) {
    if (sec.type !== "qa") continue;
    const walk = (list, group) => {
      for (const node of list) {
        if (node.subcategories) walk(node.subcategories, node);
        else out.push({ sec, group, leaf: node });
      }
    };
    walk(sec.subcategories, null);
  }
  return out;
}

function bankPath(item) {
  const parts = [item.sec.id, ...(item.group ? [item.group.id] : []), item.leaf.id];
  return path.join(ROOT, "data", "exams", EXAM_ID, ...parts, "question-001.json");
}

function readBank(item) {
  try {
    const arr = JSON.parse(fs.readFileSync(bankPath(item), "utf8"));
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

function inject(rel, section) {
  const abs = path.join(ROOT, rel);
  let html = fs.readFileSync(abs, "utf8");
  const existing = /\n    <section class="section" id="study-notes"[\s\S]*?<\/section>/;
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const marker = "\n  </main>";
    const at = html.lastIndexOf(marker);
    if (at < 0) throw new Error("no </main> in " + rel);
    html = html.slice(0, at) + section + html.slice(at);
  }
  fs.writeFileSync(abs, html, "utf8");
}

function main() {
  const all = leaves();
  const source = fs.readFileSync(path.join(ROOT, "tools", "dhs-dme-technical.notes.js"), "utf8");
  const hand = new Set();
  let m;
  const re = /NOTES\["([^"]+)"\]\s*=/g;
  while ((m = re.exec(source))) hand.add(m[1]);

  const generated = {};
  const stats = [];
  const noNote = [];

  for (const item of all) {
    if (hand.has(item.leaf.id)) continue;
    const spec = SOURCES[item.leaf.id];
    let note = null;
    if (spec && spec.every((s) => s.o)) note = ORIGINAL[item.leaf.id] || null;
    else if (spec) note = compose(item, spec, readBank(item));
    if (!note) { noNote.push(item.leaf.id); continue; }
    generated[item.leaf.id] = note;
    stats.push([item.leaf.id, words(note.en), words(note.as)]);
  }

  const short = stats.filter((s) => s[1] < 1300 || s[2] < 1300);
  console.log(`generated: ${stats.length}, no note: ${noNote.length}`);
  if (stats.length) {
    console.log(`min en: ${Math.min(...stats.map((s) => s[1]))}, min as: ${Math.min(...stats.map((s) => s[2]))}`);
    console.log(`max en: ${Math.max(...stats.map((s) => s[1]))}, max as: ${Math.max(...stats.map((s) => s[2]))}`);
  }
  if (short.length) { console.log("SHORT:"); short.forEach((s) => console.log("  ", s.join("  "))); }
  if (noNote.length) { console.log("NO NOTE:"); noNote.forEach((id) => console.log("  ", id)); }

  if (!APPLY) return;
  if (short.length || noNote.length) {
    console.error("refusing to write: fix the short or missing topics first");
    process.exit(1);
  }

  fs.writeFileSync(path.join(ROOT, "tools", "dhs-dme-technical.notes.auto.js"),
    '"use strict";\n\n/* Generated by tools/gen-dhs-dme-technical-notes.js. Do not edit by hand. */\n\nmodule.exports = ' +
    JSON.stringify(generated, null, 2) + ";\n", "utf8");

  const merged = Object.assign({}, NOTES, generated);
  fs.writeFileSync(path.join(ROOT, "data", "exams", EXAM_ID, "notes.json"),
    JSON.stringify(merged, null, 2) + "\n", "utf8");

  let n = 0;
  for (const item of all) {
    const note = generated[item.leaf.id];
    if (!note) continue;
    const parts = [item.sec.id, ...(item.group ? [item.group.id] : []), item.leaf.id];
    const rel = path.join("exams", EXAM_ID, ...parts, "index.html");
    inject(rel, renderSection(note, item.leaf.title.en, item.leaf.title.as, false));
    inject(path.join("as", rel), renderSection(note, item.leaf.title.en, item.leaf.title.as, true));
    n++;
  }
  console.log(`wrote notes for ${n} leaf/leaves, English and Assamese`);
}

main();
