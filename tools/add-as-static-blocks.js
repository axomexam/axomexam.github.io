#!/usr/bin/env node
"use strict";

/*
 * Additive bilingual (Assamese) variants for the two static blocks that live
 * OUTSIDE <main id="app">:
 *
 *   1. <section class="section" data-axo-editorial-credit="1">  (author/source)
 *   2. <section class="section axo-extra-content" data-axo-extra="1"> (tips/FAQ)
 *
 * The existing English markup is left untouched; we only annotate it with
 * data-axo-lang="en" and append a sibling data-axo-lang="as" panel. CSS then
 * shows/hides the pair from body[data-lang]/body[data-ui-lang].
 *
 * Idempotent: files that already contain data-axo-lang="as" are skipped.
 *
 * Run from the repository root:
 *   node tools/add-as-static-blocks.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry-run");

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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&nbsp;/g, " ")
    .replace(/&bull;/g, "\u2022")
    .replace(/&amp;/g, "&");
}

const AS_MONTHS = {
  January: "জানুৱাৰী",
  February: "ফেব্ৰুৱাৰী",
  March: "মাৰ্চ",
  April: "এপ্ৰিল",
  May: "মে'",
  June: "জুন",
  July: "জুলাই",
  August: "আগষ্ট",
  September: "ছেপ্তেম্বৰ",
  October: "অক্টোবৰ",
  November: "নৱেম্বৰ",
  December: "ডিচেম্বৰ",
};

/* ---------------- route -> Assamese name map ---------------- */

const asNameByRoute = {};
const catsData = readJSON(path.join(ROOT, "data", "categories.json"));
const RAW_CATS = (catsData && catsData.categories) || [];

function nameAs(obj) {
  if (obj && obj.name && obj.name.as) return obj.name.as;
  if (obj && typeof obj.name === "string") return obj.name;
  return "";
}

function walkCat(cat) {
  asNameByRoute[`/category/${cat.id}`] = nameAs(cat);
  const subs = cat.subcategories || [];
  const secs = cat.sections || [];
  if (subs.length) {
    for (const sub of subs) {
      asNameByRoute[`/category/${cat.id}/${sub.id}`] = nameAs(sub);
      asNameByRoute[`/mock-test/${cat.id}/${sub.id}`] = nameAs(sub);
      const subSecs = sub.sections || [];
      if (subSecs.length) {
        for (const sec of subSecs) {
          asNameByRoute[`/category/${cat.id}/${sub.id}/${sec.id}`] = nameAs(sec);
          asNameByRoute[`/mock-test/${cat.id}/${sub.id}/${sec.id}`] = nameAs(sec);
          for (const tp of sec.topics || []) {
            asNameByRoute[`/topic/${cat.id}/${sub.id}/${sec.id}/${tp.id}`] = nameAs(tp);
          }
        }
      } else {
        for (const tp of sub.topics || []) {
          asNameByRoute[`/topic/${cat.id}/${sub.id}/${tp.id}`] = nameAs(tp);
        }
      }
    }
  } else if (secs.length) {
    for (const sec of secs) {
      asNameByRoute[`/category/${cat.id}/${sec.id}`] = nameAs(sec);
      asNameByRoute[`/mock-test/${cat.id}/${sec.id}`] = nameAs(sec);
      for (const tp of sec.topics || []) {
        asNameByRoute[`/topic/${cat.id}/${sec.id}/${tp.id}`] = nameAs(tp);
      }
    }
  } else {
    for (const tp of cat.topics || []) {
      asNameByRoute[`/topic/${cat.id}/${tp.id}`] = nameAs(tp);
    }
  }
  asNameByRoute[`/mock-test/${cat.id}`] = nameAs(cat);
}
RAW_CATS.forEach(walkCat);

try {
  const dir = path.join(ROOT, "data", "trending-topics");
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json")) continue;
    const d = readJSON(path.join(dir, f));
    if (!d) continue;
    const id = d.id || f.replace(/\.json$/, "");
    const nm = d.name && d.name.as ? d.name.as : d.title && d.title.as ? d.title.as : "";
    if (nm) asNameByRoute[`/topic/trending/${id}`] = nm;
  }
} catch (e) {}

/* ---------------- Assamese copy templates ---------------- */

const AS = {
  suffix: "অধ্যয়ন টোকা, অনুশীলন প্ৰশ্ন আৰু পৰীক্ষাৰ টিপছ",
  introP1: (t, n) =>
    `${t} — অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে ইংৰাজী আৰু অসমীয়া দুয়ো ভাষাত অনুশীলন প্ৰশ্ন, সঠিক উত্তৰ আৰু চমু ব্যাখ্যা ইয়াত একত্ৰিত কৰা হৈছে।` +
    (n ? ` এই পৃষ্ঠাত মুঠ ${n} টা প্ৰশ্ন আছে।` : ""),
  introP2:
    "ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ দৰে পৰীক্ষাৰ সাধাৰণ জ্ঞান আৰু বিষয়-ভিত্তিক অংশৰ প্ৰস্তুতিৰ বাবে এই সংহতিটো সহায়ক হ'ব।",
  coverageH: (t) => `${t} ত কি কি সামৰি লোৱা হৈছে`,
  coverage: [
    "প্ৰতিটো প্ৰশ্ন দুভাষিক — অসমীয়া আৰু ইংৰাজীত।",
    "প্ৰতিটো উত্তৰ লগে লগে দেখুওৱা হয়, যাতে আপুনি লগে লগে শিকিব পাৰে।",
    "সঠিক উত্তৰৰ সৈতে চমু ব্যাখ্যা দিয়া হৈছে।",
    "পৰীক্ষাৰ ধৰণ অনুসৰি প্ৰশ্নবোৰ সজোৱা হৈছে।",
    "বিষয়ভিত্তিক পুনৰালোচনাৰ বাবে উপযুক্ত।",
    "ম'বাইল আৰু ডেস্কটপ — য'তেই হয়, পঢ়িব পাৰি।",
    "কোনো শুল্ক বা পঞ্জীয়ন নাই — সম্পূৰ্ণ বিনামূলীয়া।",
    "সমল সময়ৰ লগে লগে উন্নত কৰা হয়।",
  ],
  sampleH: "নমুনা প্ৰশ্ন আৰু উত্তৰ",
  sampleP: (t) =>
    `তলত ${t} ৰ কিছুমান নমুনা প্ৰশ্ন আৰু সঠিক উত্তৰ দিয়া হৈছে:`,
  answerLabel: "উত্তৰ",
  whyH: (t) => `কিয় ${t} অসমৰ পৰীক্ষাৰ বাবে গুৰুত্বপূৰ্ণ`,
  whyP:
    "অসমৰ নিয়োগ পৰীক্ষাৰ সাধাৰণ জ্ঞান আৰু বিষয়-ভিত্তিক অংশত এই বিষয়ৰ প্ৰশ্ন নিয়মীয়াকৈ আহে। তথ্যসমূহ স্থিৰ আৰু বছৰ বছৰ ধৰি পুনৰাবৃত্তি হয়, গতিকে কেইবাবাৰো পুনৰালোচনা কৰিলেই এই নম্বৰবোৰ সুৰক্ষিত কৰিব পাৰি। অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত অনুশীলন কৰিলে পৰীক্ষাৰ দিনা একেখিনি তথ্য যিকোনো ভাষাত চিনি পাব।",
  prepH: (t) => `${t} — কেনেকৈ প্ৰস্তুতি ল'ব`,
  prepP: "এই প্ৰমাণিত কৌশলসমূহে আপোনাৰ পুনৰালোচনাক ফলপ্ৰসূ কৰি তুলিব:",
  tips: [
    "প্ৰথমে মূল পৰিভাষা আৰু তথ্যসমূহ মনত ৰাখি, তাৰ পিছত প্ৰশ্নৰ জৰিয়তে নিজকে পৰীক্ষা কৰক।",
    "মিল থকা তথ্যসমূহ একেলগে গোটাই পুনৰালোচনা কৰক, যাতে সম্পৰ্কিত উত্তৰ একেলগে মনত থাকে।",
    "বাৰেৰহণীয়াকৈ পাহৰি যোৱা তথ্যসমূহ লিখি ৰাখি সপ্তাহে সপ্তাহে পুনৰালোচনা কৰক।",
    "পুনৰালোচনাৰ পিছত প্ৰশ্নসমূহ পুনৰ সমাধান কৰি নিজৰ আগৰ স্ক'ৰৰ সৈতে তুলনা কৰক।",
  ],
  faqH: "সঘনাই সোধা প্ৰশ্ন",
  faqs: (t, n) => [
    [
      `${t} axomexam ত বিনামূলীয়া নেকি?`,
      `হয়। ${t} ৰ আটাইবোৰ প্ৰশ্ন আৰু সঠিক উত্তৰ axomexam.in ত বিনামূলীয়াকৈ পঢ়িব পাৰি — কোনো পঞ্জীয়ন বা শুল্ক নাই।${
        n ? ` এই পৃষ্ঠাত ${n} টা প্ৰশ্ন আছে।` : ""
      }`,
    ],
    [
      `${t} অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত উপলব্ধ নেকি?`,
      `হয়। ${t} দ্বিভাষিক — প্ৰতিটো প্ৰশ্ন, বিকল্প আৰু ব্যাখ্যা অসমীয়া তথা ইংৰাজী দুয়ো ভাষাত দিয়া হৈছে।`,
    ],
    [
      `${t} ত কিমানটা প্ৰশ্ন আছে?`,
      n
        ? `${t} ৰ সংহতি সময়ৰ লগে লগে বৃদ্ধি পায়। এতিয়া ইয়াত প্ৰায় ${n} টা প্ৰশ্ন আছে।`
        : `${t} ৰ প্ৰশ্নৰ সংখ্যা সময়ৰ লগে লগে বৃদ্ধি পায়।`,
    ],
  ],
};

function buildAsArticle(openTagAs, title, count, qa) {
  const parts = [];
  parts.push(`<h2>${escapeHtml(title)} \u2014 ${AS.suffix}</h2>`);
  parts.push(`<p>${escapeHtml(AS.introP1(title, count))}</p>`);
  parts.push(`<p>${escapeHtml(AS.introP2)}</p>`);

  parts.push(`<h3>${escapeHtml(AS.coverageH(title))}</h3>`);
  parts.push("<ul>" + AS.coverage.map((x) => `<li>${escapeHtml(x)}</li>`).join("") + "</ul>");

  if (qa && qa.length) {
    parts.push(`<h3>${escapeHtml(AS.sampleH)}</h3>`);
    parts.push(`<p>${escapeHtml(AS.sampleP(title))}</p>`);
    parts.push(
      "<ol>" +
        qa
          .map(
            (it) =>
              `<li><strong>${escapeHtml(it.q)}</strong><br><span>${escapeHtml(
                AS.answerLabel
              )}: </span>${escapeHtml(it.a)}</li>`
          )
          .join("") +
        "</ol>"
    );
  }

  parts.push(`<h3>${escapeHtml(AS.whyH(title))}</h3>`);
  parts.push(`<p>${escapeHtml(AS.whyP)}</p>`);

  parts.push(`<h3>${escapeHtml(AS.prepH(title))}</h3>`);
  parts.push(`<p>${escapeHtml(AS.prepP)}</p>`);
  parts.push("<ul>" + AS.tips.map((x) => `<li>${escapeHtml(x)}</li>`).join("") + "</ul>");

  parts.push(`<h3>${escapeHtml(AS.faqH)}</h3>`);
  for (const [q, a] of AS.faqs(title, count)) {
    parts.push(
      `<details data-axo-faq="1"><summary>${escapeHtml(q)}</summary><p style="margin:8px 0 0;">${escapeHtml(
        a
      )}</p></details>`
    );
  }

  return `${openTagAs}\n${parts.join("\n")}\n</article>`;
}
/* (openTagAs is the real <article ...> opening tag supplied by the caller) */

function buildAsCredit(openTagAs, dateStr) {
  const body =
    "এই পৃষ্ঠাৰ সমল অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে প্ৰস্তুত কৰা হৈছে। প্ৰতিটো প্ৰশ্ন দ্বিভাষিক আৰু প্ৰতিটো উত্তৰ চমুকৈ ব্যাখ্যা কৰা হৈছে। সমল মানক প্ৰসংগ পুথি আৰু বিশ্বাসযোগ্য অনলাইন উৎসৰ আধাৰত প্ৰস্তুত কৰা হয়।";
  const metaParts = [
    "<strong>লেখক:</strong> Axom Exam Team",
    "<strong>প্ৰসংগ উৎস:</strong> মানক প্ৰসংগ পুথি আৰু বিশ্বাসযোগ্য অনলাইন উৎস",
  ];
  if (dateStr) metaParts.push(`<strong>প্ৰকাশিত:</strong> ${escapeHtml(dateStr)}`);
  return (
    `${openTagAs}\n` +
    `<p style="margin:0 0 12px;">${escapeHtml(body)}</p>\n` +
    `<p style="margin:0; font-size:0.86rem; color:var(--ink-soft,#64748b); line-height:1.7;">${metaParts.join(
      ' &nbsp;&bull;&nbsp; '
    )}</p>\n` +
    `</div>`
  );
}

/* ---------------- extraction helpers ---------------- */

function parseTitleCount(articleHtml) {
  const m = articleHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const raw = decodeHtml(m ? m[1].replace(/<[^>]+>/g, "") : "").trim();
  let base;
  if (/ Question Bank/i.test(raw)) base = raw.split(/ Question Bank/i)[0].trim();
  else if (raw.includes(" \u2014 ")) base = raw.split(" \u2014 ")[0].trim();
  else base = raw.split(" (").at(0).trim();
  const cm = raw.match(/([\d,]+)\s*Questions?/i);
  const count = cm ? parseInt(cm[1].replace(/,/g, ""), 10) : 0;
  return { raw, base, count };
}

/* Extract a top-level <div ...class="info-panel"...>...</div> with balanced
   div nesting (the credit panel contains a nested editorial-meta <div>). */
function extractBalancedDiv(block) {
  const open = block.match(/<div\b[^>]*class="info-panel"[^>]*>/);
  if (!open) return null;
  const start = open.index;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  let depth = 0;
  let mm;
  while ((mm = re.exec(block))) {
    if (mm[0] === "</div>") {
      depth--;
      if (depth === 0) return { openTag: open[0], html: block.slice(start, mm.index + 6) };
    } else {
      depth++;
    }
  }
  return null;
}

function parseInlineQA(html, limit) {
  const out = [];
  const re =
    /<div class="qa-item"[^>]*>[\s\S]*?<div lang="en"[^>]*>[\s\S]*?<\/div>\s*<div lang="as"[^>]*>([\s\S]*?)<\/div>\s*<div lang="en"[^>]*>[\s\S]*?<\/div>\s*<div lang="as"[^>]*>([\s\S]*?)<\/div>/g;
  let m;
  while ((m = re.exec(html)) && out.length < limit) {
    const q = decodeHtml(m[1].replace(/<[^>]+>/g, "")).trim();
    const a = decodeHtml(m[2].replace(/<[^>]+>/g, "")).trim();
    if (q && a) out.push({ q, a });
  }
  return out;
}

function parseCreditDate(html) {
  const m = html.match(/Published:\s*(?:<\/strong>)?\s*([^<]+?)\s*</i);
  if (!m) return "";
  let d = decodeHtml(m[1]).trim();
  for (const [en, as] of Object.entries(AS_MONTHS)) {
    if (d.includes(en)) {
      d = d.replace(en, as);
      break;
    }
  }
  return d;
}

/* ---------------- processing ---------------- */

const stats = { files: 0, extra: 0, credit: 0, qaPages: 0, skipped: 0 };

function addLangAttr(openTag, lang) {
  if (/data-axo-lang=/.test(openTag)) {
    return openTag.replace(/data-axo-lang="[^"]*"/, `data-axo-lang="${lang}"`);
  }
  return openTag.replace(/^<(\w+)/, `<$1 data-axo-lang="${lang}"`);
}

function processFile(file) {
  let html = fs.readFileSync(file, "utf8");
  const original = html;

  const dirRel = path.relative(ROOT, path.dirname(file)).replace(/\\/g, "/");
  const routeKey = dirRel === "" ? "/" : "/" + dirRel;
  const asName = asNameByRoute[routeKey] || "";

  // ---- extra content block ----
  const extraRe = /<section class="section axo-extra-content"[\s\S]*?<\/section>/;
  const extra = html.match(extraRe);
  if (extra) {
    const block = extra[0];
    if (!/data-axo-lang="as"/.test(block)) {
      const artRe = /<article\b[^>]*class="info-panel"[^>]*>[\s\S]*?<\/article>/;
      const art = block.match(artRe);
      if (art) {
        const artHtml = art[0];
        const openTag = artHtml.match(/^<article\b[^>]*>/)[0];
        const openEn = addLangAttr(openTag, "en");
        const openAs = addLangAttr(openTag, "as");
        const { base, count } = parseTitleCount(artHtml);
        const title = asName || base;
        const qa = parseInlineQA(html, 6);
        if (qa.length) stats.qaPages++;
        const asPanel = buildAsArticle(openAs, title, count, qa);
        const enArticle = artHtml.replace(/^<article\b[^>]*>/, openEn);
        const newBlock = block.replace(artHtml, enArticle + "\n" + asPanel);
        html = html.replace(block, () => newBlock);
      }
    }
  }

  // ---- editorial credit block ----
  const credRe = /<section class="section" data-axo-editorial-credit="1"[\s\S]*?<\/section>/;
  const cred = html.match(credRe);
  if (cred) {
    const block = cred[0];
    if (!/data-axo-lang="as"/.test(block)) {
      const div = extractBalancedDiv(block);
      if (div) {
        const divHtml = div.html;
        const openEn = addLangAttr(div.openTag, "en");
        const openAs = addLangAttr(div.openTag, "as");
        const date = parseCreditDate(divHtml);
        const enDiv = divHtml.replace(/^<div\b[^>]*>/, openEn);
        const asDiv = buildAsCredit(openAs, date);
        const newBlock = block.replace(divHtml, enDiv + "\n" + asDiv);
        html = html.replace(block, () => newBlock);
      }
    }
  }

  if (html !== original) {
    if (!DRY) fs.writeFileSync(file, html, "utf8");
    stats.files++;
    if (extra && !/data-axo-lang="as"/.test(extra[0])) stats.extra++;
    if (cred && !/data-axo-lang="as"/.test(cred[0])) stats.credit++;
  } else {
    stats.skipped++;
  }
}

/* ---------------- walk ---------------- */

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") processFile(full);
  }
}

walk(ROOT);
console.log(JSON.stringify(stats, null, 2));
if (DRY) console.log("(dry run: no files written)");
