#!/usr/bin/env node
"use strict";

/*
 * inject-static-questions.js
 *
 * Rebuilds the static (crawler-facing) question list inside <main id="app">
 * on every topic page so the full question bank from data/content/**\/*.json
 * is present in the served HTML instead of the truncated 25-question preview.
 *
 * The runtime app (js/app.src.js renderRoute) replaces #app with its own
 * paginated qa-card markup, so this block is only ever seen by crawlers and
 * by visitors without JavaScript. Rebuilding it changes nothing for regular
 * visitors: the page keeps its layout, styles, pagination and features.
 *
 * Everything outside the qa-list container is left byte-for-byte untouched,
 * including the axo-extra-content study article and the editorial credit.
 *
 * Usage:
 *   node tools/inject-static-questions.js            # apply
 *   node tools/inject-static-questions.js --check    # report drift only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const CONTENT = path.join(ROOT, "data", "content");
const TOPIC = path.join(ROOT, "topic");

const QA_LIST_OPEN = '<div class="qa-list" style="max-width:860px; margin:0 auto;">';

/* ---------- helpers ---------- */

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Decode entities and collapse whitespace so an already-correct block is
   recognised even when the previous writer encoded it differently
   (&#39; vs ', newlines between tags, and so on). */
function canonical(html) {
  return String(html)
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

function pickEn(v) {
  if (typeof v === "string") return v.trim();
  if (v && typeof v === "object" && typeof v.en === "string") return v.en;
  return "";
}

function pickAs(v) {
  if (v && typeof v === "object" && typeof v.as === "string") return v.as;
  return "";
}

/* Normalise both content shapes into { q, a, options, explanation } */
function normalizeQuestion(q) {
  if (!q || typeof q !== "object") return null;
  const qEn = pickEn(q.q) || (typeof q.question_en === "string" ? q.question_en : "");
  const qAs = pickAs(q.q) || (typeof q.question_as === "string" ? q.question_as : "");
  const aEn =
    pickEn(q.a) ||
    (typeof q.answer_en === "string" ? q.answer_en : "") ||
    (typeof q.answer === "string" ? q.answer : "");
  const aAs = pickAs(q.a) || (typeof q.answer_as === "string" ? q.answer_as : "");
  if (!qEn) return null;

  const options = [];
  const raw = q.options;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const en = Array.isArray(raw.en) ? raw.en : [];
    const as = Array.isArray(raw.as) ? raw.as : [];
    for (let i = 0; i < Math.max(en.length, as.length); i++) {
      const oEn = pickEn(en[i]) || (typeof en[i] === "string" ? en[i] : "");
      const oAs = pickAs(as[i]) || (typeof as[i] === "string" ? as[i] : "");
      if (oEn || oAs) options.push({ en: oEn, as: oAs });
    }
  } else if (Array.isArray(raw)) {
    for (const o of raw) {
      const oEn = pickEn(o);
      const oAs = pickAs(o);
      if (oEn || oAs) options.push({ en: oEn, as: oAs });
    }
  }

  return {
    q: { en: qEn, as: qAs },
    a: { en: aEn, as: aAs },
    options,
    ex: { en: pickEn(q.explanation), as: pickAs(q.explanation) },
  };
}

/* ---------- content index: slug -> questions ---------- */

function indexContent() {
  const map = new Map();
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.name.endsWith(".json")) {
        const slug = e.name.replace(/\.json$/, "");
        if (map.has(slug)) continue;
        try {
          const d = JSON.parse(fs.readFileSync(full, "utf8"));
          if (!Array.isArray(d.questions)) continue;
          const qs = d.questions.map(normalizeQuestion).filter(Boolean);
          if (qs.length) map.set(slug, qs);
        } catch (err) {
          /* ignore malformed files */
        }
      }
    }
  };
  walk(CONTENT);

  /* Trending topics live in their own directory but render as topic pages. */
  const trending = path.join(ROOT, "data", "trending-topics");
  try {
    for (const f of fs.readdirSync(trending)) {
      if (!f.endsWith(".json")) continue;
      const slug = f.replace(/\.json$/, "");
      if (map.has(slug)) continue;
      try {
        const d = JSON.parse(fs.readFileSync(path.join(trending, f), "utf8"));
        if (!Array.isArray(d.questions)) continue;
        const qs = d.questions.map(normalizeQuestion).filter(Boolean);
        if (qs.length) map.set(slug, qs);
      } catch (err) {}
    }
  } catch (e) {}

  return map;
}

/* ---------- markup ---------- */

function qaItemHTML(q, n) {
  const parts = [
    `<div lang="en" style="font-weight:800; font-size:1.02rem; line-height:1.5; margin-bottom:6px;">Q${n}. ${escapeHtml(
      q.q.en
    )}</div>`,
  ];
  if (q.q.as) {
    parts.push(
      `<div lang="as" style="color:#64748b; font-size:0.9rem; line-height:1.6; margin-bottom:8px;">${escapeHtml(
        q.q.as
      )}</div>`
    );
  }
  if (q.options && q.options.length) {
    const opts = q.options
      .map(
        (o, i) =>
          `<div lang="en" style="margin:2px 0;">(${String.fromCharCode(65 + i)}) ${escapeHtml(
            o.en
          )}${
            o.as
              ? ` <span lang="as" style="color:#64748b;">${escapeHtml(o.as)}</span>`
              : ""
          }</div>`
      )
      .join("");
    parts.push(`<div style="margin-top:8px; color:#334155;">${opts}</div>`);
  }
  parts.push(
    `<div lang="en" style="margin-top:8px;"><strong>Answer:</strong> <span>${escapeHtml(
      q.a.en
    )}</span></div>`
  );
  if (q.a.as) {
    parts.push(
      `<div lang="as" style="color:#64748b; font-size:0.9rem;">${escapeHtml(q.a.as)}</div>`
    );
  }
  if (q.ex && q.ex.en) {
    parts.push(
      `<div lang="en" style="margin-top:6px; font-size:0.9rem; color:#64748b;"><strong>Explanation:</strong> ${escapeHtml(
        q.ex.en
      )}</div>`
    );
  }
  if (q.ex && q.ex.as) {
    parts.push(
      `<div lang="as" style="font-size:0.9rem; color:#64748b;">${escapeHtml(q.ex.as)}</div>`
    );
  }
  return `<div class="qa-item" style="margin-bottom:22px;">${parts.join("")}</div>`;
}

function qaListInnerHTML(qs) {
  const head = `<h2 style="font-size:1.15rem; margin-bottom:18px;">${qs.length} Questions with Answers</h2>`;
  return head + qs.map((q, i) => qaItemHTML(q, i + 1)).join("");
}

/* Return [start,end) of the qa-list element including its closing tag. */
function findQaList(html) {
  const start = html.indexOf(QA_LIST_OPEN);
  if (start < 0) return null;
  const openEnd = start + QA_LIST_OPEN.length;
  const re = /<div\b[^>]*>|<\/div>/g;
  re.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].charAt(1) === "/") depth -= 1;
    else depth += 1;
    if (depth === 0) return { start, openEnd, end: re.lastIndex };
  }
  return null;
}

/* ---------- exam pages ----------
 * Exam book pages carry no static questions at all: the runtime builds every
 * card from data/exams/<exam>/<section>/<topic>/question-*.json, so crawlers
 * and JS-less visitors saw an empty shell. This pass writes the same questions
 * into the served HTML, guarded by a marker comment so it is idempotent.
 */

const EXAMS_DIR = path.join(ROOT, "exams");
const EXAM_DATA = path.join(ROOT, "data", "exams");
const EXAM_MARK = "<!-- axo-static-qa -->";

function normalizeExamQuestion(q) {
  if (!q || typeof q !== "object") return null;
  const qEn = pickEn(q.q);
  if (!qEn) return null;
  const options = Array.isArray(q.options)
    ? q.options.map((o) => ({ en: pickEn(o), as: pickAs(o) })).filter((o) => o.en)
    : [];

  let aEn = "";
  let aAs = "";
  const correct = Number.isInteger(q.correct) ? q.correct : -1;
  if (correct >= 0 && options[correct]) {
    const letter = String.fromCharCode(65 + correct);
    aEn = `${letter}) ${options[correct].en}`;
    aAs = options[correct].as ? `${letter}) ${options[correct].as}` : "";
  } else {
    aEn = pickEn(q.answer) || (typeof q.answer === "string" ? q.answer : "");
    aAs = pickAs(q.answer);
  }

  return {
    q: { en: qEn, as: pickAs(q.q) },
    options,
    a: { en: aEn, as: aAs },
    ex: { en: pickEn(q.explanation), as: pickAs(q.explanation) },
  };
}

function indexExamContent() {
  const map = new Map();
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else if (e.name === "index.json") {
        let d;
        try {
          d = JSON.parse(fs.readFileSync(full, "utf8"));
        } catch (err) {
          continue;
        }
        if (!d || !Array.isArray(d.files)) continue;
        const rel = path.relative(EXAM_DATA, path.dirname(full)).split(path.sep).join("/");
        const qs = [];
        for (const f of d.files) {
          try {
            const arr = JSON.parse(fs.readFileSync(path.join(path.dirname(full), f), "utf8"));
            if (Array.isArray(arr)) {
              for (const q of arr) {
                const n = normalizeExamQuestion(q);
                if (n) qs.push(n);
              }
            }
          } catch (err) {}
        }
        if (qs.length) map.set(rel, qs);
      }
    }
  };
  walk(EXAM_DATA);
  return map;
}

function examItemHTML(q, n) {
  const parts = [
    `<div lang="en" style="font-weight:800; font-size:1.02rem; line-height:1.5; margin-bottom:6px;">Q${n}. ${escapeHtml(
      q.q.en
    )}</div>`,
  ];
  if (q.q.as) {
    parts.push(
      `<div lang="as" style="color:#64748b; font-size:0.9rem; line-height:1.6; margin-bottom:8px;">${escapeHtml(
        q.q.as
      )}</div>`
    );
  }
  if (q.options.length) {
    const opts = q.options
      .map(
        (o, i) =>
          `<div lang="en" style="margin:2px 0;">(${String.fromCharCode(65 + i)}) ${escapeHtml(
            o.en
          )}${
            o.as
              ? ` <span lang="as" style="color:#64748b;">${escapeHtml(o.as)}</span>`
              : ""
          }</div>`
      )
      .join("");
    parts.push(`<div style="margin-top:8px; color:#334155;">${opts}</div>`);
  }
  if (q.a.en) {
    parts.push(
      `<div lang="en" style="margin-top:8px;"><strong>Answer:</strong> <span>${escapeHtml(
        q.a.en
      )}</span></div>`
    );
  }
  if (q.a.as) {
    parts.push(`<div lang="as" style="color:#64748b; font-size:0.9rem;">${escapeHtml(q.a.as)}</div>`);
  }
  if (q.ex.en) {
    parts.push(
      `<div lang="en" style="margin-top:6px; font-size:0.9rem; color:#64748b;"><strong>Explanation:</strong> ${escapeHtml(
        q.ex.en
      )}</div>`
    );
  }
  if (q.ex.as) {
    parts.push(
      `<div lang="as" style="font-size:0.9rem; color:#64748b;">${escapeHtml(q.ex.as)}</div>`
    );
  }
  return `<div class="qa-item" style="margin-bottom:22px;">${parts.join("")}</div>`;
}

function examSectionHTML(qs) {
  const inner = qaListInnerHTML(qs);
  return `<section class="section" style="padding-bottom:40px;">${EXAM_MARK}${QA_LIST_OPEN}${inner}</div></section>`;
}

/* ---------- current-affairs pages ----------
 * The runtime paints these into #ca-body, so the served HTML showed an empty
 * section. Write the same questions statically, marked for idempotency.
 */

const CA_DIR = path.join(ROOT, "current-affairs");
const CA_DATA = path.join(ROOT, "data", "current-affairs");
const CA_MARK = "<!-- axo-static-ca -->";

function normalizeCAQuestion(q) {
  if (!q || typeof q !== "object") return null;
  const qEn = q.question_en || pickEn(q.question) || "";
  if (!qEn) return null;
  return {
    q: { en: qEn, as: q.question_as || pickAs(q.question) },
    a: { en: q.answer_en || pickEn(q.answer) || "", as: q.answer_as || pickAs(q.answer) },
    options: [],
    ex: {
      en: q.explanation_en || pickEn(q.explanation),
      as: q.explanation_as || pickAs(q.explanation),
    },
  };
}

function indexCAContent() {
  const map = new Map();
  let entries;
  try {
    entries = fs.readdirSync(CA_DATA, { withFileTypes: true });
  } catch (e) {
    return map;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const dir = path.join(CA_DATA, e.name);
    const qs = [];
    for (const f of fs.readdirSync(dir).sort()) {
      if (!/^question-.*\.json$/i.test(f)) continue;
      const arr = readJSON(path.join(dir, f));
      if (Array.isArray(arr)) {
        for (const q of arr) {
          const n = normalizeCAQuestion(q);
          if (n) qs.push(n);
        }
      }
    }
    if (qs.length) map.set(e.name, qs);
  }
  return map;
}

/* ---------- main ---------- */

const content = indexContent();
const pages = [];
const walkPages = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkPages(full);
    else if (e.name === "index.html") pages.push(full);
  }
};
walkPages(TOPIC);

let changed = 0;
let already = 0;
let skippedNoData = 0;
let skippedNoBlock = 0;
let inserted = 0;
let totalBefore = 0;
let totalAfter = 0;
const report = [];

for (const file of pages) {
  const slug = path.basename(path.dirname(file));
  const qs = content.get(slug);
  const html = fs.readFileSync(file, "utf8");
  const loc = findQaList(html);

  if (!qs) {
    skippedNoData += 1;
    continue;
  }

  const before = loc ? (html.slice(loc.start, loc.end).match(/class="qa-item"/g) || []).length : 0;

  if (!loc) {
    /* Page has no static question block: add one just before </main>. */
    const mainEnd = html.indexOf("</main>");
    if (mainEnd < 0) {
      skippedNoBlock += 1;
      continue;
    }
    const section = `<section class="section" style="padding-bottom:40px;">${QA_LIST_OPEN}${qaListInnerHTML(
      qs
    )}</div></section>`;
    const out = html.slice(0, mainEnd) + section + html.slice(mainEnd);
    if (!CHECK) fs.writeFileSync(file, out, "utf8");
    inserted += 1;
    changed += 1;
    totalBefore += before;
    totalAfter += qs.length;
    report.push({ file, before, after: qs.length, action: "inserted" });
    continue;
  }

  const inner = html.slice(loc.openEnd, loc.end - "</div>".length);
  const rebuiltInner = qaListInnerHTML(qs);
  if (canonical(inner) === canonical(rebuiltInner)) {
    already += 1;
    totalBefore += before;
    totalAfter += before;
    continue;
  }

  const out = html.slice(0, loc.start) + QA_LIST_OPEN + rebuiltInner + "</div>" + html.slice(loc.end);
  if (!CHECK) fs.writeFileSync(file, out, "utf8");
  changed += 1;
  totalBefore += before;
  totalAfter += qs.length;
  report.push({ file: path.relative(ROOT, file), before, after: qs.length, action: "rewritten" });
}

report.sort((a, b) => b.after - b.before - (a.after - a.before));

console.log(CHECK ? "inject-static-questions: DRIFT CHECK" : "inject-static-questions: applied");
console.log("  topic pages scanned        :", pages.length);
console.log("  pages rewritten            :", changed - inserted);
console.log("  pages given a new qa block :", inserted);
console.log("  pages already complete     :", already);
console.log("  pages skipped (no content) :", skippedNoData);
console.log("  pages skipped (no <main>)  :", skippedNoBlock);
console.log("  questions in static HTML   :", totalBefore, "->", totalAfter);

if (report.length) {
  console.log("\n  top gains:");
  for (const r of report.slice(0, 12)) {
    console.log(`    ${String(r.before).padStart(4)} -> ${String(r.after).padStart(4)}  ${r.file}`);
  }
}
if (CHECK && changed) process.exitCode = 1;

/* ---------- exam pages pass ---------- */

const examContent = indexExamContent();
const examPages = [];
const walkExamPages = (dir) => {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkExamPages(full);
    else if (e.name === "index.html") examPages.push(full);
  }
};
walkExamPages(EXAMS_DIR);

let exChanged = 0;
let exAlready = 0;
let exNoData = 0;
let exNoMain = 0;
let exBefore = 0;
let exAfter = 0;
const exReport = [];

for (const file of examPages) {
  const rel = path.relative(EXAMS_DIR, path.dirname(file)).split(path.sep).join("/");
  const qs = examContent.get(rel);
  if (!qs) {
    exNoData += 1;
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const mainEnd = html.indexOf("</main>");
  if (mainEnd < 0) {
    exNoMain += 1;
    continue;
  }

  const existing = html.indexOf(EXAM_MARK);
  const loc = findQaList(html);
  const before = loc ? (html.slice(loc.start, loc.end).match(/class="qa-item"/g) || []).length : 0;
  const section = examSectionHTML(qs);

  let out;
  if (existing >= 0 && loc) {
    /* Replace the previously injected section in place. */
    const secStart = html.lastIndexOf("<section", existing);
    const secEnd = html.indexOf("</section>", existing);
    if (secStart < 0 || secEnd < 0) {
      exNoMain += 1;
      continue;
    }
    const currentInner = html.slice(loc.openEnd, loc.end - "</div>".length);
    if (canonical(currentInner) === canonical(qaListInnerHTML(qs))) {
      exAlready += 1;
      exBefore += before;
      exAfter += before;
      continue;
    }
    out = html.slice(0, secStart) + section + html.slice(secEnd + "</section>".length);
  } else {
    out = html.slice(0, mainEnd) + section + html.slice(mainEnd);
  }

  if (!CHECK) fs.writeFileSync(file, out, "utf8");
  exChanged += 1;
  exBefore += before;
  exAfter += qs.length;
  exReport.push({ file: path.relative(ROOT, file), before, after: qs.length });
}

console.log("\ninject-static-questions: exam pages");
console.log("  exam pages scanned         :", examPages.length);
console.log("  pages written              :", exChanged);
console.log("  pages already complete     :", exAlready);
console.log("  pages skipped (no content) :", exNoData);
console.log("  pages skipped (no <main>)  :", exNoMain);
console.log("  questions in static HTML   :", exBefore, "->", exAfter);

exReport.sort((a, b) => b.after - b.before - (a.after - a.before));
if (exReport.length) {
  console.log("\n  top gains:");
  for (const r of exReport.slice(0, 12)) {
    console.log(`    ${String(r.before).padStart(4)} -> ${String(r.after).padStart(4)}  ${r.file}`);
  }
}
if (CHECK && exChanged) process.exitCode = 1;

/* ---------- current-affairs pass ---------- */

const caContent = indexCAContent();
const caPages = [];
const walkCAPages = (dir) => {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkCAPages(full);
    else if (e.name === "index.html") caPages.push(full);
  }
};
walkCAPages(CA_DIR);

let caChanged = 0;
let caAlready = 0;
let caNoData = 0;
let caNoSlot = 0;
let caBefore = 0;
let caAfter = 0;

for (const file of caPages) {
  const rel = path.relative(CA_DIR, path.dirname(file)).split(path.sep).join("/");
  const qs = caContent.get(rel);
  if (!qs) {
    caNoData += 1;
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const mainEnd = html.indexOf("</main>");
  if (mainEnd < 0) {
    caNoSlot += 1;
    continue;
  }

  const existing = html.indexOf(CA_MARK);
  const loc = findQaList(html);
  const before = loc ? (html.slice(loc.start, loc.end).match(/class="qa-item"/g) || []).length : 0;
  const section = examSectionHTML(qs).replace(EXAM_MARK, CA_MARK);

  let out;
  if (existing >= 0 && loc) {
    const secStart = html.lastIndexOf("<section", existing);
    const secEnd = html.indexOf("</section>", existing);
    if (secStart < 0 || secEnd < 0) {
      caNoSlot += 1;
      continue;
    }
    if (canonical(html.slice(loc.openEnd, loc.end - 6)) === canonical(qaListInnerHTML(qs))) {
      caAlready += 1;
      caBefore += before;
      caAfter += before;
      continue;
    }
    out = html.slice(0, secStart) + section + html.slice(secEnd + "</section>".length);
  } else {
    /* The runtime paints into #ca-body; keep a static mirror in the empty
       section that precedes the noscript block. */
    const emptySection = html.lastIndexOf('<section class="section"', mainEnd);
    if (emptySection < 0) {
      caNoSlot += 1;
      continue;
    }
    const emptyEnd = html.indexOf("</section>", emptySection);
    out = html.slice(0, emptySection) + section + html.slice(emptyEnd + "</section>".length);
  }

  if (!CHECK) fs.writeFileSync(file, out, "utf8");
  caChanged += 1;
  caBefore += before;
  caAfter += qs.length;
}

console.log("\ninject-static-questions: current-affairs pages");
console.log("  pages scanned        :", caPages.length);
console.log("  pages written        :", caChanged);
console.log("  pages already complete:", caAlready);
console.log("  pages skipped (no data):", caNoData);
console.log("  pages skipped (no slot):", caNoSlot);
console.log("  questions in static HTML:", caBefore, "->", caAfter);
if (CHECK && caChanged) process.exitCode = 1;
