#!/usr/bin/env node
/*
 * balance-answer-keys.js — reorder the options of hand-uploaded question
 * banks so the correct key is not stuck in one slot.
 *
 * The generator-backed banks (history / polity / economy / english / gk) do
 * this at build time. The hand-uploaded banks — data/exams/adre-grade-4 and
 * data/exams/assam-police — do not, so a topic authored with the natural
 * answer first ends up 100% "option A".
 *
 * This tool rewrites the `options` array text in place (keeping every option's
 * own formatting) and updates `correct` to follow the moved answer. It never
 * invents an answer: the option that was correct stays the same option, only
 * its position changes. It refuses to touch a question whose options contain a
 * positional phrase ("all of these", "none of the above") or a figure, because
 * those only make sense in the written order.
 *
 * Usage:
 *   node tools/balance-answer-keys.js --check            # audit, no writes
 *   node tools/balance-answer-keys.js --book assam-police
 *   node tools/balance-answer-keys.js --book adre-grade-4 --topic logical-reasoning/verbal-reasoning/odd-one-out
 *   node tools/balance-answer-keys.js --book assam-police --min-share 0.5
 *
 * --check exits 1 when a topic still holds >=50% of its keys in one slot.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXAMS = path.join(ROOT, "data", "exams");

const args = process.argv.slice(2);
const getArg = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};
const CHECK = args.includes("--check");
const BOOK = getArg("--book", null);
const TOPIC = getArg("--topic", null);
const MIN_SHARE = Number(getArg("--min-share", "0.5"));
const POSITIONAL =
  /\b(all|none|both|neither)\s+(of\s+)?(the\s+)?(above|these|them)\b/i;

/* Same deterministic sequence the build-time generators use, so a re-run
 * produces the same order and the key is spread evenly over A/B/C/D. */
function balanceKeys(count) {
  const base = [];
  for (let i = 0; i < count; i++) base.push(i % 4);
  let seed = 20260101;
  const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base;
}

function matchBracket(text, open) {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "[" || c === "{") depth++;
    else if (c === "]" || c === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function topLevelItems(inner) {
  const items = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{" || c === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "}" || c === "]") {
      depth--;
      if (depth === 0) items.push({ start, end: i + 1 });
    }
  }
  return items;
}

const skipQuestion = (inner, items) =>
  items.length !== 4 ||
  items.some((it) => POSITIONAL.test(inner.slice(it.start, it.end))) ||
  items.some((it) => /"fig"\s*:/.test(inner.slice(it.start, it.end))) ||
  />\s*\(?[A-D]\)?\s*</.test(inner);

/* Rewrite every question's options in `raw`, returning the new text plus how
 * many questions moved and how many were deliberately left alone. */
function rebalanceText(raw) {
  const targets = balanceKeys((raw.match(/"options"\s*:/g) || []).length);
  let out = "";
  let pos = 0;
  let qi = 0;
  let moved = 0;
  let skipped = 0;
  while (true) {
    const key = raw.indexOf('"options"', pos);
    if (key === -1) {
      out += raw.slice(pos);
      break;
    }
    const arrStart = raw.indexOf("[", key);
    const arrEnd = matchBracket(raw, arrStart);
    const inner = raw.slice(arrStart + 1, arrEnd);
    const items = topLevelItems(inner);
    const cKey = raw.indexOf('"correct"', arrEnd);
    const cColon = raw.indexOf(":", cKey);
    const cNum = raw.slice(cColon + 1).match(/^\s*(\d+)/);
    const correct = cNum ? Number(cNum[1]) : -1;

    if (skipQuestion(inner, items) || correct < 0 || correct > 3) {
      skipped += 1;
      out += raw.slice(pos, arrEnd + 1);
      pos = arrEnd + 1;
      qi += 1;
      continue;
    }

    const target = targets[qi];
    qi += 1;
    const lead = inner.slice(0, items[0].start);
    const sep = inner.slice(items[0].end, items[1].start);
    const tail = inner.slice(items[items.length - 1].end);
    const texts = items.map((it) => inner.slice(it.start, it.end));
    const others = texts.filter((_, k) => k !== correct);
    const ordered = [];
    let oi = 0;
    for (let p = 0; p < 4; p++) ordered.push(p === target ? texts[correct] : others[oi++]);
    const newInner = lead + ordered.join(sep) + tail;
    const numToken = raw.slice(cColon + 1).match(/^\s*\d+/)[0];

    out += raw.slice(pos, arrStart + 1) + newInner + raw.slice(arrEnd, cColon + 1);
    out += numToken.replace(/\d+$/, String(target));
    pos = cColon + 1 + numToken.length;
    moved += 1;
  }
  return { text: out, moved, skipped };
}

function loadQuestions(file) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return Array.isArray(data) ? data : [data];
}

function distribution(file) {
  const c = [0, 0, 0, 0];
  let n = 0;
  for (const q of loadQuestions(file)) {
    if (q && Number.isInteger(q.correct)) {
      c[q.correct] += 1;
      n += 1;
    }
  }
  return { c, n };
}

function topicFiles(book, topicRel) {
  const dir = path.join(EXAMS, book, topicRel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^question-\d+\.json$/.test(f))
    .sort()
    .map((f) => path.join(dir, f));
}

function walkTopics(book) {
  const base = path.join(EXAMS, book);
  const topics = [];
  const walk = (dir) => {
    const files = topicFiles(book, path.relative(base, dir));
    if (files.length) {
      topics.push(path.relative(base, dir));
      return;
    }
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name));
    }
  };
  if (fs.existsSync(base)) walk(base);
  return topics.sort();
}

function main() {
  const books = BOOK ? [BOOK] : fs.readdirSync(EXAMS).filter((b) => fs.statSync(path.join(EXAMS, b)).isDirectory());
  let skewed = 0;
  for (const book of books) {
    const topics = TOPIC ? [TOPIC] : walkTopics(book);
    for (const topic of topics) {
      const files = topicFiles(book, topic);
      if (!files.length) continue;
      const before = { c: [0, 0, 0, 0], n: 0 };
      for (const f of files) {
        const d = distribution(f);
        for (let i = 0; i < 4; i++) before.c[i] += d.c[i];
        before.n += d.n;
      }
      if (!before.n) continue;
      const share = Math.max(...before.c) / before.n;
      if (share < MIN_SHARE) continue;
      skewed += 1;

      if (CHECK) {
        console.log(
          `  ${book}/${topic}  n=${before.n}  A/B/C/D=${before.c.join("/")}  share=${(share * 100).toFixed(0)}%`
        );
        continue;
      }

      let moved = 0;
      let skipped = 0;
      for (const f of files) {
        const raw = fs.readFileSync(f, "utf8");
        const res = rebalanceText(raw);
        if (res.text !== raw) fs.writeFileSync(f, res.text, "utf8");
        moved += res.moved;
        skipped += res.skipped;
      }
      const after = { c: [0, 0, 0, 0], n: 0 };
      for (const f of files) {
        const d = distribution(f);
        for (let i = 0; i < 4; i++) after.c[i] += d.c[i];
        after.n += d.n;
      }
      console.log(
        `  ${book}/${topic}  n=${after.n}  ${before.c.join("/")} -> ${after.c.join("/")}  moved=${moved} skipped=${skipped}`
      );
    }
  }
  if (CHECK) {
    console.log(`balance-answer-keys: ${skewed} topic(s) still skewed at >=${MIN_SHARE * 100}%`);
    if (skewed) process.exitCode = 1;
  }
}

main();
