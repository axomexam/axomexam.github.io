#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/add-book-hub-guides.js

   The DHS & DME Technical book has 27 navigation pages (the five
   section hubs, their group hubs and the book root) that were only a
   list of topic cards: 306 to 618 words each. This adds a bilingual
   study guide above the cards, built from the page's own topic list
   and question counts plus the per-section text in
   tools/dhs-dme-technical.hub-guides.js.

   Idempotent: an existing guide block is replaced, not duplicated.
   Usage: node tools/add-book-hub-guides.js [--book=<slug>] [--check]
   (default slug: dhs-dme-technical; guides come from tools/<slug>.hub-guides.js)
   ============================================================ */

const fs = require("fs");
const path = require("path");
const BOOK = (process.argv.find((a) => a.startsWith("--book=")) || "--book=dhs-dme-technical").split("=")[1];
const { SECTION, GROUP, ROOT } = require(`./${BOOK}.hub-guides`);

const ROOT_DIR = path.resolve(__dirname, "..");
const BOOK_DIRS = [`exams/${BOOK}`, `as/exams/${BOOK}`];
const DATA_DIR = path.join(ROOT_DIR, `data/exams/${BOOK}`);
const CHECK = process.argv.includes("--check");
const MARK = 'id="axo-hub-guide"';

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/* leaf folder -> number of questions published under it */
function countQuestions() {
  const counts = {};
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/^question-\d+\.json$/.test(entry.name)) {
        const leaf = path.basename(dir);
        try {
          const bank = JSON.parse(fs.readFileSync(full, "utf8"));
          if (Array.isArray(bank)) counts[leaf] = (counts[leaf] || 0) + bank.length;
        } catch { /* ignore malformed bank */ }
      }
    }
  };
  walk(DATA_DIR);
  return counts;
}

/* topic cards on the page: [leafId, englishTitle, assameseTitle] */
function topicsOn(html) {
  const out = [];
  const re = /<a class="sub-card[^"]*"[^>]*href="([^"]+)"[^>]*><b[^>]*>([\s\S]*?)<\/b><span[^>]*>([\s\S]*?)<\/span>/g;
  let m;
  while ((m = re.exec(html))) {
    const leaf = m[1].replace(/\/$/, "").split("/").pop();
    out.push([leaf, m[2].replace(/&amp;/g, "&").trim(), m[3].replace(/&amp;/g, "&").trim()]);
  }
  return out;
}

function whereMarksEn(topics, counts, total, showCounts = true) {
  if (!topics.length) return "";
  const ranked = topics.map(([leaf, en]) => [en, counts[leaf] || 0]).sort((a, b) => b[1] - a[1]);
  const heavy = ranked.slice(0, 3).filter(([, n]) => n > 0);
  const heavyNames = new Set(heavy.map(([name]) => name));
  const light = ranked.filter(([name, n]) => n > 0 && !heavyNames.has(name)).slice(-2);
  if (!heavy.length) return "";
  const list = heavy.map(([name, n]) => `${name} (${n})`).join(", ");
  const tail = light.length
    ? ` The shortest topics — ${light.map(([name, n]) => `${name} (${n})`).join(" and ")} — finish quickly on revision days.`
    : "";
  const lead = showCounts
    ? `This page holds ${topics.length} topics and ${total.toLocaleString("en-IN")} questions. `
    : "";
  return `${lead}The heaviest are ${list}; start with those, because they also carry the most repeated question types.${tail}`;
}

function whereMarksAs(topics, counts, total, showCounts = true) {
  if (!topics.length) return "";
  const ranked = topics.map(([leaf, , as]) => [as, counts[leaf] || 0]).sort((a, b) => b[1] - a[1]);
  const heavy = ranked.slice(0, 3).filter(([, n]) => n > 0);
  const heavyNames = new Set(heavy.map(([name]) => name));
  const light = ranked.filter(([name, n]) => n > 0 && !heavyNames.has(name)).slice(-2);
  if (!heavy.length) return "";
  const list = heavy.map(([name, n]) => `${name} (${n})`).join(", ");
  const tail = light.length
    ? ` আটাইতকৈ চুটি বিষয়বোৰ — ${light.map(([name, n]) => `${name} (${n})`).join(" আৰু ")} — পুনৰাবৃত্তিৰ দিনত সোনকালে শেষ হয়।`
    : "";
  const leadAs = showCounts
    ? `এই পৃষ্ঠাত ${topics.length} টা বিষয় আৰু ${total.toLocaleString("en-IN")} টা প্ৰশ্ন আছে। `
    : "";
  return `${leadAs}আটাইতকৈ ডাঙৰবোৰ — ${list} — ইয়াৰপৰা আৰম্ভ কৰা, কাৰণ ইয়াতেই সৰ্বাধিক পুনৰাবৃত্তি হোৱা প্ৰশ্ন আহে।${tail}`;
}

/* Published totals, counted from the rendered pages themselves so the guide
   text can never drift from the number in the hero. */
function publishedTotals() {
  const base = path.join(ROOT_DIR, `exams/${BOOK}`);
  let topics = 0;
  let questions = 0;
  const stack = [base];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { stack.push(full); continue; }
      if (entry.name !== "index.html") continue;
      const html = fs.readFileSync(full, "utf8");
      const n = (html.match(/class="qa-item"/g) || []).length;
      if (n) { topics += 1; questions += n; }
    }
  }
  return { topics, questions };
}

function block({ title, titleAs, guide, topics, counts, route }) {
  const headEn = route === "" ? "How to use this book" : `How to prepare ${esc(title)}`;
  const headAs = route === "" ? "এই কিতাপ কেনেকৈ ব্যৱহাৰ কৰিব" : `${esc(titleAs)} কেনেকৈ প্ৰস্তুতি ল'ব`;
  const total = topics.reduce((a, [leaf]) => a + (counts[leaf] || 0), 0);
  const asDigits = (v) => String(v).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
  const book = route === "" ? publishedTotals() : { topics: topics.length, questions: total };
  const fill = (text, digits) => text
    .replace("{topics}", digits ? asDigits(book.topics) : String(book.topics))
    .replace("{questions}", digits ? asDigits(book.questions.toLocaleString("en-IN")) : book.questions.toLocaleString("en-IN"));
  const introEn = fill(guide.intro[0], false);
  const introAs = fill(guide.intro[1], true);
  const showCounts = guide.counts !== false;
  const marksEn = whereMarksEn(topics, counts, total, showCounts);
  const marksAs = whereMarksAs(topics, counts, total, showCounts);
  const tips = guide.tips || [];
  const mistakes = guide.mistakes || [];
  const panel = "background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:18px auto 0; text-align:left;";
  const h2 = "margin-top:0; color:var(--ink,#0f172a);";
  const h3 = "margin-bottom:6px; color:var(--ink,#0f172a); font-size:1.02rem;";
  const ul = "margin:6px 0 0 20px; line-height:1.9;";
  return `<article lang="en" data-axo-lang="en" ${MARK} class="info-panel" style="${panel}">
          <h2 style="${h2}">${headEn}</h2>
          <p>${esc(introEn)}</p>${marksEn ? `\n          <p>${esc(marksEn)}</p>` : ""}
          ${tips.length ? `<h3 style="${h3}">Order that works</h3>\n          <ul style="${ul}">\n${tips.map(([en]) => `          <li>${esc(en)}</li>`).join("\n")}\n          </ul>` : ""}
          ${mistakes.length ? `<h3 style="${h3}">Where marks are lost</h3>\n          <ul style="${ul}">\n${mistakes.map(([en]) => `          <li>${esc(en)}</li>`).join("\n")}\n          </ul>` : ""}
        </article>
        <article lang="as" data-axo-lang="as" class="info-panel" style="${panel}">
          <h2 style="${h2}">${headAs}</h2>
          <p lang="as">${esc(introAs)}</p>${marksAs ? `\n          <p lang="as">${esc(marksAs)}</p>` : ""}
          ${tips.length ? `<h3 style="${h3}" lang="as">কামৰ ক্ৰম</h3>\n          <ul style="${ul}" lang="as">\n${tips.map(([, as]) => `          <li lang="as">${esc(as)}</li>`).join("\n")}\n          </ul>` : ""}
          ${mistakes.length ? `<h3 style="${h3}" lang="as">ক'ত নম্বৰ হেৰায়</h3>\n          <ul style="${ul}" lang="as">\n${mistakes.map(([, as]) => `          <li lang="as">${esc(as)}</li>`).join("\n")}\n          </ul>` : ""}
        </article>`;
}

function guideFor(route) {
  if (!route) return ROOT;
  return SECTION[route] || GROUP[route] || null;
}

function collectTitles() {
  const titles = {};
  for (const rel of BOOK_DIRS) {
    const base = path.join(ROOT_DIR, rel);
    if (!fs.existsSync(base)) continue;
    const isAs = rel.startsWith("as/");
    const stack = [base];
    while (stack.length) {
      const dir = stack.pop();
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { stack.push(full); continue; }
        if (entry.name !== "index.html") continue;
        const html = fs.readFileSync(full, "utf8");
        if (html.includes('class="qa-item"')) continue;
        const route = path.relative(base, dir).replace(/\\/g, "/");
        const head = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html);
        if (!head) continue;
        const text = head[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
        titles[route] = titles[route] || {};
        titles[route][isAs ? "as" : "en"] = text;
      }
    }
  }
  return titles;
}

function main() {
  const counts = countQuestions();
  const titles = collectTitles();
  let added = 0;
  let skipped = 0;
  for (const rel of BOOK_DIRS) {
    const base = path.join(ROOT_DIR, rel);
    if (!fs.existsSync(base)) continue;
    const stack = [base];
    while (stack.length) {
      const dir = stack.pop();
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { stack.push(full); continue; }
        if (entry.name !== "index.html") continue;
        let html = fs.readFileSync(full, "utf8");
        if (html.includes('class="qa-item"')) continue;
        const route = path.relative(base, dir).replace(/\\/g, "/");
        if (route === "syllabus" || route.startsWith("syllabus/")) continue;
        const guide = guideFor(route);
        if (!guide) { skipped += 1; continue; }
        const topics = topicsOn(html);
        if (!topics.length && route !== "") { skipped += 1; continue; }
        const names = titles[route] || {};
        const title = names.en || (topics.length ? topics[0][1] : "this section");
        const titleAs = (names.as || (topics.length ? topics[0][2] : title)).split("\u2014")[0].trim();
        const htmlBlock = block({ title, titleAs, guide, topics, counts, route });
        const existing = new RegExp(`\\n?\\s*<article[^>]*${MARK}[\\s\\S]*?</article>\\s*<article[^>]*data-axo-lang="as"[\\s\\S]*?</article>`, "");
        if (existing.test(html)) {
          html = html.replace(existing, `\n        ${htmlBlock}`);
        } else {
          html = html.replace(/\n\s*<\/main>/, `\n        ${htmlBlock}\n  </main>`);
        }
        if (!CHECK) fs.writeFileSync(full, html);
        added += 1;
      }
    }
  }
  console.log(`hub guides written: ${added} | pages without a guide: ${skipped}${CHECK ? " (check only)" : ""}`);
}

main();
