#!/usr/bin/env node
"use strict";

/*
 * tools/improve-titles.js
 *
 * Makes every question-bank page say, in its <title>, what the searcher gets
 * ("Questions with Answers" / "MCQs") and which exam it is for. Nothing else
 * changes: <title>, og:title and twitter:title only.
 *
 * Why this exists
 * ---------------
 * keyword-map.csv is generated from the whole site and drifts from the
 * committed pages between runs; the pages themselves are the source of truth
 * for the current title. This pass reads each page's own title, so it can
 * never replace a good title with a stale one.
 *
 * Rules, applied to indexable question-bank sections only
 *   broken   title ends mid-parenthetical -> rebuild from the page's <h1>
 *   intent   title has no Questions/MCQs/Paper/Notes word -> insert one
 *   short    title under 35 chars -> add the intent word and the exam list
 *
 * Every candidate is checked against the 60-char SERP limit, and the exam
 * label is shortened ("DHS & DME Non-Technical Grade III" -> "DHS DME Grade
 * III") only when the full label does not fit.
 *
 * Usage:
 *   node tools/improve-titles.js            # write
 *   node tools/improve-titles.js --check    # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const LIMIT = 60;

const SECTIONS = new Set(["topic", "exams", "category", "current-affairs"]);
const INTENT = /question|mcq|q&a|pyq|paper|notes|guide|mock test|quiz|practice|book/i;

const EXAM_NAME = {
  "assam-police": "Assam Police",
  "assam-police-si": "Assam Police SI",
  "adre-grade-3": "ADRE 3.0 Grade III",
  "adre-grade-4": "ADRE 3.0 Grade IV",
  "dhs-dme": "DHS DME Grade III",
  "dhs-dme-grade-4": "DHS DME Grade IV",
  "dhs-dme-technical": "DHS DME Technical",
  "apsc": "APSC",
  "assam-tet": "Assam TET",
  "guwahati-hc": "Guwahati High Court",
  "ssc": "SSC",
  "railway": "Railway",
  "rrb-ntpc": "RRB NTPC",
};

const SHORT_EXAM = [
  ["Assam Police Sub-Inspector (SI)", "Assam Police SI"],
  ["DHS & DME Non-Technical Grade III", "DHS DME Grade III"],
  ["DHS & DME Technical Grade III", "DHS DME Technical"],
  ["DHS & DME Grade IV", "DHS DME Grade IV"],
];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
const unescapeHtml = (s) => String(s).replace(/&(#?\w+);/g, (m, e) => (e in ENTITIES ? ENTITIES[e] : m));
const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if ([".git", "node_modules", "as", "tools", "scripts", "images", "data", "android", "app"].includes(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.name.endsWith(".html")) {
      out.push(path.relative(ROOT, path.join(dir, e.name)));
    }
  }
  return out;
}

function replaceTitle(html, value) {
  const m = html.match(/<title[^>]*>[\s\S]*?<\/title>/i);
  if (!m) return html;
  return html.slice(0, m.index) + `<title>${escapeAttr(value)}</title>` + html.slice(m.index + m[0].length);
}

function replaceMeta(html, marker, value) {
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (!tag.toLowerCase().includes(marker)) continue;
    const cm = tag.match(/content="([^"]*)"/i);
    if (!cm) return html;
    return html.slice(0, m.index) + tag.replace(cm[0], `content="${escapeAttr(value)}"`) + html.slice(m.index + tag.length);
  }
  return html;
}

/* "Vocabulary - General English - DHS & DME Technical Grade III" -> the topic
   is the first segment; the rest is context that can be shortened. */
function splitTitle(title) {
  let m = title.match(/^(.*?)\s+[—|]\s+(.+)$/);
  if (m) return { head: m[1].trim(), sep: " — ", tail: m[2].trim() };
  m = title.match(/^(.*?)\s+-\s+(.+)$/);
  if (m) return { head: m[1].trim(), sep: " - ", tail: m[2].trim() };
  m = title.match(/^(.*?)\s+for\s+(.+)$/i);
  if (m) return { head: m[1].trim(), sep: " for ", tail: m[2].trim() };
  return { head: title.trim(), sep: "", tail: "" };
}

function shortenExam(s) {
  let out = s;
  for (const [from, to] of SHORT_EXAM) out = out.split(from).join(to);
  return out;
}

function tailVariants(tail) {
  if (!tail) return [""];
  const out = [tail, shortenExam(tail)];
  /* Drop the middle segment ("General English") only when the whole tail does
     not fit: the exam name is what the searcher matches. */
  const parts = tail.split(/\s+[-—]\s+/);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    out.push(last, shortenExam(last));
  }
  /* "ADRE, APSC" is the site's default exam pair; one exam is enough when the
     topic name is long. */
  if (out.some((t) => /^ADRE, APSC$/.test(t))) out.push("ADRE");
  return [...new Set(out)];
}

function withIntent(head, sep, tail, intent) {
  const joined = tail ? sep + tail : "";
  return `${head}${intent}${joined}`;
}

function bestTitle(head, sep, tail, h1, exam) {
  const intents = [" Questions with Answers", " Questions", " MCQs with Answers", " MCQs"];
  const tails = tail ? tailVariants(tail) : [];
  /* Keep the topic as written first; drop a parenthetical only if nothing
     fits with it. */
  const heads = [head];
  const noParen = head.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
  if (noParen && noParen !== head) heads.push(noParen);
  if (h1) {
    const h1Clean = h1.replace(/\s*[:—|]\s*.*$/, "").trim();
    if (h1Clean && h1Clean.length >= 3 && h1Clean.length <= 45 && !heads.includes(h1Clean)) heads.push(h1Clean);
  }

  /* Keep the exam context while it fits; shorten it before weakening the
     intent word, because the exam name is what the query contains. */
  for (const h of heads) {
    for (const t of tails) {
      for (const intent of intents) {
        const cand = withIntent(h, sep, t, intent);
        if (cand.length <= LIMIT) return cand;
      }
    }
  }

  /* Nothing fits with the exam name: trim the topic so the exam still shows.
     Two pages must never end up on the same title, so an exam-less fallback
     is only used when the page has no exam of its own. */
  if (exam) {
    for (const h of heads) {
      for (const intent of intents) {
        const room = LIMIT - intent.length - 3 - exam.length;
        if (room < 12) continue;
        const cut = h.slice(0, room);
        const trimmed = cut.slice(0, cut.lastIndexOf(" ")).replace(/[ —,&|:;]+$/, "");
        if (trimmed.length >= 12) return `${trimmed}${intent} — ${exam}`;
      }
    }
    return null;
  }
  for (const h of heads) {
    for (const intent of intents) {
      const cand = `${h}${intent}`;
      if (cand.length <= LIMIT) return cand;
    }
  }
  return null;
}

const rows = [];
for (const rel of walk(ROOT, []).sort()) {
  const segs = rel.replace(/\/index\.html$/, "").split("/");
  if (!SECTIONS.has(segs[0])) continue;
  const html = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || [])[1] || "";
  if (/noindex/i.test(robots)) continue;
  if (/http-equiv="refresh"/i.test(html)) continue;
  const tm = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!tm) continue;
  let title = unescapeHtml(tm[1].replace(/\s+/g, " ").trim());
  /* "| axomexam" is a brand suffix, not exam context; it costs ~11 of the
     ~60 characters Google shows. */
  title = title.replace(/\s*\|\s*axomexam\s*$/i, "").trim();
  const hm = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = hm ? unescapeHtml(hm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) : "";
  /* Exam root pages are hand-written hubs, not question banks. */
  if (segs[0] === "exams" && segs.length <= 2) continue;
  /* A syllabus page is a topic list, not a question bank. */
  if (/syllabus/i.test(title) || /syllabus/i.test(h1)) continue;

  const broken = title.split("(").length !== title.split(")").length;
  const hasIntent = INTENT.test(title);
  const short = title.length < 35;
  if (!broken && hasIntent) continue;

  let head, sep, tail;
  if (broken) {
    ({ head, sep, tail } = splitTitle(title.replace(/\s*\([^)]*$/, "")));
  } else {
    ({ head, sep, tail } = splitTitle(title));
  }
  /* A page that names no exam gets the exam it belongs to, taken from its
     path; a topic page gets the site's default exam pair. */
  let exam = "";
  if (segs[0] === "topic") exam = "ADRE, APSC";
  else if (segs[0] === "exams" && EXAM_NAME[segs[1]]) exam = EXAM_NAME[segs[1]];
  if (exam && `${head} ${tail}`.toLowerCase().includes(exam.toLowerCase())) exam = "";
  if (!tail && exam) {
    tail = exam;
    sep = " — ";
  }
  const next = bestTitle(head, sep, tail, h1, exam);
  if (!next || next === title) continue;
  rows.push({ rel, title, next, broken, hasIntent, short, html });
}

for (const r of rows) {
  console.log(`${r.broken ? "BROKEN " : r.short ? "SHORT  " : "INTENT "} ${r.title}\n      -> ${r.next}  (${r.next.length})`);
}
console.log(`\nimprove-titles: ${rows.length} pages ${CHECK ? "would change" : "changed"}`);

if (!CHECK) {
  for (const r of rows) {
    let html = replaceTitle(r.html, r.next);
    html = replaceMeta(html, 'property="og:title"', r.next);
    html = replaceMeta(html, 'name="twitter:title"', r.next);
    fs.writeFileSync(path.join(ROOT, r.rel), html);
  }
}
