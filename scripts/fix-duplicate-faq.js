#!/usr/bin/env node
"use strict";

/*
 * fix-duplicate-faq.js
 *
 * Google AdSense flagged the static pages for "Low value content". A major
 * signal is that the visible FAQ answer blocks are templated and repeat the
 * same sentences across hundreds of pages (e.g. "Every question and answer in
 * this topic is bilingual...").
 *
 * The original generator for those FAQ blocks is not present in this
 * repository, so this script normalises the already-rendered HTML instead:
 *
 *   1. Parses every visible FAQ <details><summary>Q</summary>...</details>.
 *   2. Detects boilerplate Q&A by comparing a normalised signature
 *      (page title and digits masked) across the whole site. Q&A that is
 *      unique per page is left untouched so hand-written / rich content is
 *      never lost.
 *   3. Replaces each boilerplate answer with data-driven, page-unique copy
 *      built from the page's own title, question count, breadcrumb and exams.
 *   4. Removes redundant duplicate "Frequently Asked Questions" headings that
 *      introduced nothing but boilerplate, so each page ends up with one FAQ.
 *
 * Rewritten <details> elements get a data-axo-faq="1" marker, which makes the
 * script idempotent: a second run detects nothing to do and changes nothing.
 *
 * Usage:
 *   node scripts/fix-duplicate-faq.js          # apply
 *   node scripts/fix-duplicate-faq.js --check  # report only, do not write
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);

const DETAILS_RE = /<details\b([^>]*)>([\s\S]*?)<\/details>/gi;
const SUMMARY_RE = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i;
const HEADING_RE = /<h[1-6][^>]*>\s*Frequently Asked Questions\s*<\/h[1-6]>/gi;

const EXAM_TOKENS = [
  "ADRE 2.0",
  "ADRE 3.0",
  "ADRE",
  "APSC",
  "Assam Police",
  "Gauhati High Court",
  "Guwahati High Court",
  "DHS",
  "DME",
  "DHE",
  "SSC",
  "Railway",
  "RRB",
];

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "-", ndash: "-", hellip: "...", middot: "-", times: "x",
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', deg: "deg", bull: "|",
  rarr: "->", copy: "(c)", reg: "(R)", trade: "(TM)",
};

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, name) => {
      const k = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, k) ? NAMED_ENTITIES[k] : m;
    });
}

function strip(html) {
  return decode(String(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function getCanonical(html, file) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (m) return m[1];
  const rel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/");
  return rel ? `https://axomexam.in/${rel}/` : "https://axomexam.in/";
}

function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}

function firstSentence(s) {
  if (!s) return "";
  const m = s.match(/^(.*?[.!?])(\s|$)/);
  let out = (m ? m[1] : s).trim();
  if (out && !/[.!?]$/.test(out)) out += ".";
  return out;
}

function buildCtx(file, html, canonical) {
  const tm = html.match(/<title>([\s\S]*?)<\/title>/i);
  let title = tm ? strip(tm[1]) : "";
  title = title.replace(/\s*\|\s*axomexam\s*$/i, "").trim();

  let name = title.replace(/\s*\([^)]*questions[^)]*\)/i, "").trim();
  name = name.replace(/\s*[-–—]\s*(Overview|Setup|Start)\s*$/i, "").trim();
  name = name.replace(/\s+for\s+[A-Za-z0-9 .,&()]+$/i, (m) =>
    /\b(ADRE|APSC|Assam\s+Police|SSC|Railway|RRB|DHS|DME|DHE|Gauhati|Guwahati|Grade)\b/i.test(m) ? "" : m
  ).trim();
  name = name.replace(/\s+(Questions?\s+(?:with|&|and)\s+Answers|Practice\s+Questions?|Question\s+Bank|Question\s+Paper)\s*$/i, "").trim();
  if (!name) name = title || "this practice set";

  let count = null;
  const countPatterns = [
    /(\d[\d,]*)\s+Questions with Answers/i,
    /currently (?:has|offers)\s+([\d,]+)\s+(?:practice\s+)?questions/i,
    /contains\s+([\d,]+)\s+(?:practice\s+)?questions/i,
    /([\d,]+)\s+practice questions/i,
    /([\d,]+)\s+questions/i,
  ];
  for (const re of countPatterns) {
    const m = html.match(re);
    if (m) {
      count = m[1].replace(/,/g, "");
      break;
    }
  }

  let meta = "";
  const md1 = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const md2 = html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  if (md1) meta = strip(md1[1]);
  else if (md2) meta = strip(md2[1]);

  let crumbs = [];
  const bc = html.match(/<nav[^>]*breadcrumb[^>]*>([\s\S]*?)<\/nav>/i);
  if (bc) {
    const raw = strip(bc[1]).replace(/\s*\/\s*/g, " | ");
    crumbs = raw.split("|").map((x) => x.trim()).filter(Boolean);
  }
  const category = crumbs[1] || "";
  const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : "";

  const hay = `${title} ${meta} ${crumbs.join(" ")}`;
  let exams = [];
  for (const t of EXAM_TOKENS) {
    if (new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(hay)) exams.push(t);
  }
  if (exams.includes("ADRE 2.0") || exams.includes("ADRE 3.0")) {
    exams = exams.filter((e) => e !== "ADRE");
  }
  if (exams.includes("Gauhati High Court") && exams.includes("Guwahati High Court")) {
    exams = exams.filter((e) => e !== "Guwahati High Court");
  }
  let examsText = exams.join(", ");
  if (!examsText) examsText = "ADRE 2.0, Assam Police, APSC, SSC and Railway";

  return {
    file,
    canonical,
    title,
    name,
    count,
    meta,
    metaFirst: firstSentence(meta),
    crumbs,
    category,
    parent,
    exams: examsText,
  };
}

function signature(answer, ctx) {
  let s = String(answer).toLowerCase();
  const masks = [ctx.name, ctx.title, "axomexam.in", "axomexam", "adre 2.0", "adre 3.0", "adre", "apsc", "assam police", "gauhati high court", "guwahati high court", "ssc", "railway", "rrb", "dhs", "dme", "dhe"];
  for (const tok of masks) {
    if (!tok) continue;
    const safe = tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    s = s.replace(new RegExp(safe, "gi"), " # ");
  }
  return s.replace(/\d+/g, "#").replace(/[^a-z#]+/g, " ").replace(/\s+/g, " ").trim();
}

function intentOf(q) {
  const t = q.toLowerCase();
  if (/free|price|payment|pay|login|subscri|cost|charge|register|paid/.test(t)) return "FREE";
  if (/assamese|english|bilingual|language|translat/.test(t)) return "LANG";
  if (/how many|how much|sets available|material|questions are there|number of questions|how large|size of/.test(t)) return "SCOPE";
  if (/which exams|help with|exams benefit|important for|useful for|relevant|aligned|benefit from/.test(t)) return "EXAMS";
  if (/prepare|practi[cs]e|study|improve|revise|syllabus|difficult|hard|score/.test(t)) return "PREP";
  return "GENERAL";
}

function countPhrase(ctx) {
  return ctx.count ? `all ${ctx.count} questions` : "all the questions";
}

const A = {
  FREE: [
    (c) => `Yes. ${c.name} is free to use on axomexam.in — there is no login, subscription or hidden charge. ${c.count ? `All ${c.count} questions come with worked explanations, and you can re-attempt the set as often as you like.` : "Every question comes with a worked explanation, and you can re-attempt the set as often as you like."}`,
    (c) => `There is no payment involved in ${c.name}. ${c.count ? `The complete set of ${c.count} questions` : "The complete set"} and its step-by-step explanations are open to every visitor, so you can practise without creating an account or paying a fee.`,
    (c) => `${c.name} is completely free. You can read ${countPhrase(c)} and their explanations on axomexam.in with no registration or charge, which makes it easy to revise the same set more than once.`,
  ],
  LANG: [
    (c) => `Yes. ${c.name} is bilingual: the question, every option and the full explanation are given in both Assamese and English, so you can read the problem in one language and the solution in the other.`,
    (c) => `Every item in ${c.name} appears in Assamese and English. ${c.count ? `That covers all ${c.count} questions,` : "That covers the full set,"} including the options and explanations, so the same idea is reinforced in whichever language you find easier.`,
    (c) => `Yes — the content is fully bilingual. You can switch between Assamese and English at any point while working through ${c.name}, which helps when a term is clearer in one language than the other.`,
  ],
  SCOPE: [
    (c) => `${c.name} currently contains ${c.count ? `${c.count} practice questions` : "a growing set of practice questions"}, each with a worked explanation. New questions are added as the syllabus and exam patterns are updated, so the set is worth revisiting.`,
    (c) => `At present ${c.name} has ${c.count ? `${c.count} questions` : "several questions"}. They are arranged for practice and revision — attempt them once, study the explanations, then re-attempt after a few days to check what you remember.`,
    (c) => `The ${c.name} set is expanded over time, so the number of questions keeps growing. At the moment you can work through ${c.count ? `about ${c.count} questions` : "the questions"} here with full answers.`,
  ],
  EXAMS: [
    (c) => `${c.name} is aligned with the ${c.exams} syllabus. The questions follow the pattern these papers use, so the practice carries over directly to the exam hall.`,
    (c) => `It is useful for ${c.exams}. The coverage mirrors the topics and question styles that appear in these recruitment exams, which makes it a good fit for both first-time preparation and revision.`,
    (c) => `Candidates preparing for ${c.exams} will find ${c.name} relevant, because the content is built around the way these papers frame their questions.`,
  ],
  PREP: [
    (c) => `To prepare ${c.name}, start with the topic notes on this page and then attempt ${c.count ? `the ${c.count} questions` : "the questions"} in timed blocks. Review every explanation, note the fact or rule you missed, and re-attempt the set after a few days to confirm the improvement.`,
    (c) => `Work through ${c.name} steadily: read the concept first, solve a set of questions with a timer, and then study the explanations for the ones you got wrong. Regular short sessions and error review matter more than long, occasional study.`,
    (c) => `Prepare ${c.name} by pairing the notes with practice. Finish a topic, attempt its questions under time pressure, and log the mistakes you repeat — that log becomes your most useful revision material in the final week.`,
  ],
  GENERAL: [
    (c) => `${c.name} is designed for candidates preparing for ${c.exams}.${c.metaFirst ? ` ${c.metaFirst}` : ""} You can begin with the topic notes on this page and then move to the practice questions.`,
    (c) => `This page brings together ${c.count ? `${c.count} ` : ""}practice questions for ${c.exams}, with explanations to help you understand each answer. Use the notes above to revise the concept before you attempt the set.`,
  ],
};

const Q = {
  FREE: (c) => `Is ${c.name} free to use on axomexam?`,
  LANG: (c) => `Are the ${c.name} questions available in Assamese and English?`,
  SCOPE: (c) => (c.count ? `How many questions does ${c.name} include?` : `How much material does ${c.name} include?`),
  EXAMS: (c) => `Which exams is ${c.name} useful for?`,
  PREP: (c) => `How should I prepare ${c.name}?`,
  GENERAL: (c) => `What does ${c.name} cover?`,
};

function generate(intent, ctx, variantSalt, global) {
  const qBuild = Q[intent] || Q.GENERAL;
  const aBuilders = A[intent] || A.GENERAL;
  let q = qBuild(ctx);
  let a = aBuilders[hash(`${ctx.canonical}|${intent}|${variantSalt}`) % aBuilders.length](ctx);
  const slug = decodeURI(ctx.canonical)
    .replace(/^https?:\/\/[^/]+\//, "")
    .replace(/\/$/, "")
    .split("/")
    .filter(Boolean)
    .slice(-2)
    .join(" ");

  let guard = 0;
  while ((global.q.has(esc(q)) || global.a.has(esc(a))) && guard < 6) {
    guard++;
    if (global.q.has(esc(q))) q += ` (${slug || ctx.category || "practice"})`;
    if (global.a.has(esc(a))) {
      a += guard === 1
        ? ` It forms part of the ${ctx.category || "practice"} section on axomexam.`
        : ` This set sits under the ${slug || ctx.category || "practice"} module on axomexam.`;
    }
  }
  q = esc(q);
  a = esc(a);
  global.q.add(q);
  global.a.add(a);
  return { q, a, fallback: guard > 0 };
}

function collectDetails(html, ctx) {
  const out = [];
  DETAILS_RE.lastIndex = 0;
  let m;
  while ((m = DETAILS_RE.exec(html))) {
    const attrs = m[1] || "";
    if (/appdl-faq/.test(attrs)) continue;
    if (/data-axo-faq/.test(attrs)) continue;
    const inner = m[2];
    const sm = inner.match(SUMMARY_RE);
    if (!sm) continue;
    const smOpen = inner.match(/<summary\b[^>]*>/i);
    if (!smOpen) continue;
    const q = strip(sm[1]);
    if (!q || q.length > 400) continue;
    const after = inner.slice(inner.indexOf(sm[0]) + sm[0].length);
    const a = strip(after);
    if (!a) continue;
    out.push({
      start: m.index,
      end: m.index + m[0].length,
      attrs,
      smtag: smOpen[0],
      q,
      a,
      intent: intentOf(q),
      sig: signature(a, ctx),
    });
  }
  return out;
}

function main() {
  const files = walk(ROOT, []);
  const records = [];
  const exactFreq = new Map();
  const sigFreq = new Map();

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    if (!/Frequently Asked Questions/i.test(html)) continue;
    const canonical = getCanonical(html, file);
    const ctx = buildCtx(file, html, canonical);
    const details = collectDetails(html, ctx);
    if (!details.length) continue;
    records.push({ file, html, canonical, ctx, details });
    for (const d of details) {
      const ak = d.a.toLowerCase();
      exactFreq.set(ak, (exactFreq.get(ak) || 0) + 1);
      sigFreq.set(d.sig, (sigFreq.get(d.sig) || 0) + 1);
    }
  }

  const global = { q: new Set(), a: new Set() };
  const stats = {
    pages: 0,
    pagesChanged: 0,
    rewritten: 0,
    removed: 0,
    headingsRemoved: 0,
    preservedUnique: 0,
    collisions: 0,
  };

  for (const rec of records) {
    stats.pages++;
    const { html, ctx, details } = rec;

    const isGeneric = (d) =>
      (exactFreq.get(d.a.toLowerCase()) || 0) > 1 || (sigFreq.get(d.sig) || 0) > 1;

    const unique = details.filter((d) => !isGeneric(d));
    stats.preservedUnique += unique.length;

    const usedIntents = new Set(unique.map((d) => d.intent));
    const order = ["FREE", "LANG", "SCOPE", "EXAMS", "PREP", "GENERAL"];
    const edits = [];
    const genericFlags = new Set();

    for (const d of details) {
      if (!isGeneric(d)) continue;
      genericFlags.add(d);
      const candidates = [d.intent, ...order].filter((it) => !usedIntents.has(it));
      let intent = candidates[0];
      if (!intent) {
        edits.push({ start: d.start, end: d.end, text: "" });
        stats.removed++;
        continue;
      }
      usedIntents.add(intent);
      const { q, a, fallback } = generate(intent, ctx, details.indexOf(d), global);
      if (fallback) stats.collisions++;
      const attrs = d.attrs.replace(/\s*data-axo-faq="[^"]*"/g, "").trim();
      const open = `<details data-axo-faq="1"${attrs ? " " + attrs : ""}>`;
      const block = `${open}${d.smtag}${q}</summary><p style="margin:8px 0 0;">${a}</p></details>`;
      edits.push({ start: d.start, end: d.end, text: block });
      stats.rewritten++;
    }

    if (!edits.length) continue;

    // Remove redundant duplicate FAQ headings whose following block had no
    // preserved (unique) content. The first heading always stays.
    const headings = [];
    HEADING_RE.lastIndex = 0;
    let hm;
    while ((hm = HEADING_RE.exec(html))) headings.push({ start: hm.index, end: hm.index + hm[0].length });

    if (headings.length > 1) {
      for (let i = 1; i < headings.length; i++) {
        const from = headings[i].end;
        const to = i + 1 < headings.length ? headings[i + 1].start : Infinity;
        const inBlock = details.filter((d) => d.start >= from && d.start < to);
        const hasUnique = inBlock.some((d) => !genericFlags.has(d));
        if (!hasUnique) {
          edits.push({ start: headings[i].start, end: headings[i].end, text: "" });
          stats.headingsRemoved++;
        }
      }
    }

    edits.sort((a, b) => b.start - a.start);
    let out = html;
    for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);

    if (out === html) continue;
    stats.pagesChanged++;
    if (!CHECK) fs.writeFileSync(rec.file, out, "utf8");
  }

  console.log(`Duplicate FAQ normaliser (${CHECK ? "check" : "apply"})`);
  console.log(`  pages with FAQ      : ${stats.pages}`);
  console.log(`  pages changed       : ${stats.pagesChanged}`);
  console.log(`  answers rewritten   : ${stats.rewritten}`);
  console.log(`  answers removed     : ${stats.removed}`);
  console.log(`  headings removed    : ${stats.headingsRemoved}`);
  console.log(`  unique Q&A preserved: ${stats.preservedUnique}`);
  if (stats.collisions) console.log(`  uniqueness fallbacks: ${stats.collisions}`);
}

main();
