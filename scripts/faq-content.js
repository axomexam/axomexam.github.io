#!/usr/bin/env node
"use strict";

/*
 * faq-content.js
 *
 * Single source of truth for the small "Frequently Asked Questions" block and
 * the overview / "How to prepare" text inside each page's auto-generated SEO
 * panel.
 *
 * Why this exists
 * ---------------
 * That text used to be chosen by rotating two or three canned sentences per
 * question intent, keyed on a hash of the canonical URL. With a handful of
 * variants across hundreds of pages, whole sentences repeated site-wide:
 *
 *   109 pages  the same four-bullet "How to prepare" list
 *    87 pages  the same "is bilingual" answer
 *    77 pages  the same "is completely free" answer
 *    47 pages  the fixed filler sentence the old de-duplicator appended when
 *              two pages hashed to the same variant
 *
 * Simply widening the rotation would only move the collision, so the text is
 * now composed in two layers:
 *
 *   1. Per-page facts - the page's H1, its real question count, its real child
 *      topic names, its own meta description. These are already unique per
 *      page, so the *content* of every answer is unique.
 *   2. Structural choice - each answer is assembled from a small bank of
 *      interchangeable openers / cores / closers, selected by a hash of the
 *      canonical URL. With four choices in each of three slots that is 64
 *      shapes per question, so two pages rarely share even the skeleton, and
 *      they never share both skeleton and facts.
 *
 * Both the static rewriter (scripts/rebuild-faq.js) and the runtime renderer
 * (js/app.src.js, via the inlined copy) call these builders, so the HTML a
 * crawler reads and the DOM a visitor sees stay identical.
 */

/* Answers are capped so a long meta description cannot bloat the block. */
const MAX_CLAUSE = 170;

function clean(s) {
  return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
}

function decodeEntities(s) {
  return String(s == null ? "" : s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

/* FNV-1a. Small, fast and stable across runs, which is what makes the
   structural choice reproducible instead of random. */
function hash(str) {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* Deterministic pick. `salt` keeps the slots of one answer from moving
   together, which is what stops two pages from sharing a whole skeleton. */
function pick(list, seed, salt) {
  return list[hash(seed + "|" + salt) % list.length];
}

/* First sentence of the meta description, trimmed to a whole-word boundary. */
function firstClause(text) {
  let s = clean(decodeEntities(text));
  if (!s) return "";
  const stop = s.search(/[.!?](\s|$)/);
  if (stop > 30) s = s.slice(0, stop + 1);
  if (s.length > MAX_CLAUSE) {
    s = s.slice(0, MAX_CLAUSE);
    const cut = s.lastIndexOf(" ");
    if (cut > 60) s = s.slice(0, cut);
    s = s.replace(/[,;:\s]+$/, "") + "\u2026";
  }
  return s.trim();
}

/* Second sentence of the description, when there is one, so the language
   answer can carry different text from the coverage answer. */
function secondClause(text) {
  const s = clean(decodeEntities(text));
  if (!s) return "";
  const parts = s.split(/(?<=[.!?])\s+/).filter((x) => x.length > 25);
  if (parts.length < 2) return "";
  return firstClause(parts[1]);
}

/* Whatever the description says after its first sentence, so a page whose
   description is a single long sentence still contributes unique text to a
   second answer. */
function descRest(text) {
  const s = clean(decodeEntities(text));
  if (!s) return "";
  const first = firstClause(s);
  const rest = clean(s.slice(first.replace(/\u2026$/, "").length));
  return rest.length > 25 ? firstClause(rest) : "";
}

/* Exam names read better joined than comma-spliced into a sentence. */
function examList(exams) {
  const parts = String(exams || "").split(",").map(clean).filter(Boolean);
  if (parts.length <= 1) return parts.join("");
  if (parts.length === 2) return parts[0] + " and " + parts[1];
  return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
}

/* "A, B and C" - real child names, never invented. */
function joinNames(names, max) {
  const list = (names || []).map(clean).filter(Boolean).slice(0, max || 3);
  if (!list.length) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return list[0] + " and " + list[1];
  return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
}

function countLabel(ctx) {
  const n = ctx && ctx.count;
  if (!n) return "";
  const num = String(n).replace(/,/g, "");
  return /^\d+$/.test(num) ? Number(num).toLocaleString("en-IN") : String(n);
}

/* Child topic names that merely repeat the page's own H1 add nothing, so drop
   them ("Parts of Speech brings together Parts of Speech" reads as filler). */
function usefulItems(items, name) {
  const self = clean(name).toLowerCase();
  const seen = new Set();
  return (items || [])
    .map(clean)
    .filter(Boolean)
    .filter((t) => {
      const k = t.toLowerCase();
      if (k === self || self.indexOf(k) === 0 || k.indexOf(self) === 0) return false;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
}

/* Openers like "Yes." end in a full stop, so the clause that follows has to
   start with a capital letter or the sentence reads as broken. */
function cap(s) {
  const t = clean(s);
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
}

function sentence(s) {
  const t = clean(s);
  if (!t) return "";
  return /[.!?\u2026]$/.test(t) ? t : t + ".";
}

/* ------------------------------------------------------------------ FAQ -- */

const COST_OPEN = ["Yes.", "Yes \u2014", "Certainly.", "Yes, fully.", "It is free.", "Yes, and completely so."];
const COST_CORE = [
  (n) => n + " is free to read on axomexam.in",
  (n) => "there is no charge to read " + n + " on axomexam.in",
  (n) => "every part of " + n + " is free on axomexam.in",
  (n) => n + " costs nothing to use on axomexam.in",
];
const COST_NOBAR = [
  "there is no login, subscription or payment of any kind",
  "you do not need an account, a subscription or a payment",
  "no login or payment is asked for at any stage",
  "nothing has to be unlocked, bought or subscribed to",
  "no sign-up wall stands between you and the questions",
  "there is no paid tier, trial limit or hidden charge",
];
const COST_CLOSE_COUNT = [
  (n, c) => "All " + c + " questions include worked explanations, so you can re-attempt the set as often as you like while revising.",
  (n, c) => "The " + c + " questions each carry a worked explanation, which makes repeated attempts easy.",
  (n, c) => "Every one of the " + c + " questions comes with an explanation, so revision does not depend on guesswork.",
];
const COST_CLOSE_NONE = [
  () => "Every question includes a worked explanation, so the same material can be revised as often as you need.",
  () => "Each question is followed by an explanation, so you can revisit the material whenever you like.",
  () => "Explanations accompany the questions, which makes repeat practice worthwhile.",
];

const LANG_OPEN = ["Yes.", "Yes, throughout.", "That is right.", "Correct.",
  "Yes, always.", "Indeed.", "Yes, on every question.", "That is correct."];
const LANG_CORE = [
  (n) => "the question, every option and the full explanation in " + n + " are given in both Assamese and English",
  (n) => "questions, options and explanations in " + n + " all appear in Assamese as well as English",
  (n) => "you can read each " + n + " question, its options and its explanation in Assamese or in English",
  (n) => n + " is fully bilingual, with Assamese and English side by side throughout",
  (n) => "every " + n + " question is written twice, once in Assamese and once in English, options and explanation included",
  (n) => "the Assamese and English versions of each " + n + " question sit together on the page",
  (n) => n + " presents its questions, options and explanations in both languages at once",
  (n) => "nothing in " + n + " is English-only or Assamese-only",
];
const LANG_BENEFIT = [
  "so you can read the problem in one language and the solution in the other",
  "which helps when a term is clearer in one language than in the other",
  "so the same idea is reinforced whichever language you find easier",
  "so a doubt in one language can be settled by reading the other",
  "which is useful when the exam paper switches language between questions",
  "so revision is not interrupted by an unfamiliar word in either language",
  "which suits candidates who studied in Assamese but read English sources too",
  "so you can answer in the language you think in and check in the other",
];

const SCOPE_COUNT = [
  (n, c) => n + " currently includes " + c + " practice questions, each with a worked explanation.",
  (n, c) => "There are " + c + " practice questions in " + n + ", and every one carries a worked explanation.",
  (n, c) => n + " holds " + c + " practice questions, each followed by an explanation of the answer.",
];
const SCOPE_ITEMS = [
  (n, i) => n + " brings together " + i + ", with practice questions and explanations for each.",
  (n, i) => "The material on this page covers " + i + ", and each part has its own practice questions.",
  (n, i) => "You will find " + i + " here, each with questions and worked answers.",
];
const SCOPE_GENERIC = [
  (n) => n + " is arranged so that each block can be finished in one sitting.",
  (n) => "The " + n + " material is grouped into short blocks so that practice fits into a normal study session.",
  (n) => n + " is laid out as a sequence of small blocks rather than one long read.",
];
const SCOPE_EXAMS = [
  (e) => " The set is written for " + e + " aspirants.",
  (e) => " Questions follow the " + e + " pattern, so the practice transfers directly.",
  (e) => " It is aimed at candidates preparing for " + e + ".",
  (e) => " The material suits " + e + " preparation.",
];
const SCOPE_TAIL = [
  "Start with the notes on this page, then work through the linked sets so that revision stays active rather than passive.",
  "Read the notes first and attempt the questions afterwards, so that each attempt tests what you actually remember.",
  "Use the notes for the concept and the questions for the check; attempting them separately is what makes the revision stick.",
];

/*
 * Compose the FAQ for one page.
 *
 * ctx = {
 *   name      : page H1, cleaned
 *   count     : real question count on the page, or null
 *   items     : real child topic names listed on the page (may be empty)
 *   desc      : the page's own meta description (unique per page)
 *   exams     : comma-separated exam tokens already resolved for the page
 *   canonical : absolute canonical URL, used as the structural seed
 * }
 *
 * Deterministic: the same ctx always yields the same output, which is what
 * makes the rewriter idempotent.
 */
function buildFaqs(ctx) {
  const c = ctx || {};
  const seed = clean(c.canonical) || clean(c.name);
  const name = clean(c.name) || "this practice set";
  const count = countLabel(c);
  const desc = firstClause(c.desc);
  const desc2 = secondClause(c.desc) || descRest(c.desc);
  const items = joinNames(usefulItems(c.items, name), 3);
  const exams = examList(clean(c.exams));
  const out = [];

  /* 1. Cost. */
  const closeCost = count
    ? pick(COST_CLOSE_COUNT, seed, "cost-close")(name, count)
    : pick(COST_CLOSE_NONE, seed, "cost-close")(name, count);
  out.push({
    q: "Is " + name + " free to use on axomexam?",
    a: pick(COST_OPEN, seed, "cost-open") + " " +
       cap(pick(COST_CORE, seed, "cost-core")(name)) + " \u2014 " +
       pick(COST_NOBAR, seed, "cost-nobar") + ". " + closeCost,
  });

  /* 2. Language. Carries the page's own description. */
  const extra = desc2 ? " " + desc2 : desc && !items ? " " + desc : "";
  out.push({
    q: "Are the " + name + " questions available in Assamese and English?",
    a: pick(LANG_OPEN, seed, "lang-open") + " " +
       cap(pick(LANG_CORE, seed, "lang-core")(name)) + ", " +
       pick(LANG_BENEFIT, seed, "lang-benefit") + "." + extra,
  });

  /* 3. Coverage. Built from this page's own numbers or topics. */
  if (count) {
    out.push({
      q: "How many questions does " + name + " include?",
      a: cap(pick(SCOPE_COUNT, seed, "scope")(name, count)) +
         (items ? " They are organised under " + items + "." : "") +
         (exams ? pick(SCOPE_EXAMS, seed, "scope-exams")(exams) : ""),
    });
  } else if (items) {
    out.push({
      q: "What does " + name + " cover?",
      a: cap(pick(SCOPE_ITEMS, seed, "scope")(name, items)) +
         (exams ? pick(SCOPE_EXAMS, seed, "scope-exams")(exams) : ""),
    });
  } else {
    out.push({
      q: "What does " + name + " cover?",
      a: (desc ? desc + " " : "") +
         cap(pick(SCOPE_GENERIC, seed, "scope")(name)) + " " +
         (exams ? pick(SCOPE_EXAMS, seed, "scope-exams")(exams).trim() + " " : "") +
         cap(pick(SCOPE_TAIL, seed, "scope-tail")),
    });
  }

  return out;
}

/* --------------------------------------------------------------- overview -- */

const INFO_OPEN = [
  (n, d) => d,
  (n, d) => d,
  (n, d) => n + " \u2014 " + d.charAt(0).toLowerCase() + d.slice(1),
];
const INFO_COUNT = [
  (n, c) => "The page holds " + c + " practice questions, each with a worked explanation, which is enough for one full revision round.",
  (n, c) => "It carries " + c + " practice questions with worked explanations, so one pass through the page is a complete revision round.",
  (n, c) => "There are " + c + " questions here, every one explained, which covers a full revision round on its own.",
];
const INFO_ITEMS = [
  (i) => "It is arranged as " + i + ", so you can finish one block before moving to the next.",
  (i) => "The blocks run through " + i + ", each of which can be finished before you move on.",
  (i) => "Work is grouped into " + i + ", which keeps each study session short.",
];
const INFO_EXAMS = [
  (e) => "It is written for candidates preparing for " + e + ".",
  (e) => "The material is aimed at " + e + " aspirants.",
  (e) => "It suits preparation for " + e + ".",
];
const INFO_CLOSE = [
  "Read the concept first, then attempt the linked sets, so revision stays active instead of passive.",
  "Finish the notes before attempting the questions, so that each attempt is a real test of recall.",
  "Use the notes to settle the concept and the questions to check it, which is what makes revision stick.",
  "Read once for understanding, then practise, then return to the notes only for what you missed.",
];

function buildInfo(ctx) {
  const c = ctx || {};
  const seed = clean(c.canonical) || clean(c.name);
  const name = clean(c.name) || "This page";
  const desc = firstClause(c.desc);
  const count = countLabel(c);
  const items = joinNames(usefulItems(c.items, name), 4);
  const exams = examList(clean(c.exams));
  const parts = [];

  if (desc) parts.push(pick(INFO_OPEN, seed, "info-open")(name, desc));
  else parts.push(name + " is part of the free bilingual study material on axomexam.in.");
  if (count) parts.push(pick(INFO_COUNT, seed, "info-count")(name, count));
  if (items) parts.push(pick(INFO_ITEMS, seed, "info-items")(items));
  if (exams) parts.push(pick(INFO_EXAMS, seed, "info-exams")(exams));
  parts.push(pick(INFO_CLOSE, seed, "info-close"));
  return parts.join(" ");
}

/* ------------------------------------------------------------------ tips -- */

const TIP_ONE_COUNT = [
  (n, c) => "Attempt the " + c + " " + n + " questions in timed blocks, then read the explanation for every question you got wrong.",
  (n, c) => "Work through the " + c + " questions with a timer running, and study the explanation whenever an answer goes wrong.",
  (n, c) => "Take the " + c + " questions in timed sittings, keeping a note of the explanations behind your mistakes.",
];
const TIP_ONE_NONE = [
  (n) => "Read the " + n + " notes once, then attempt the linked questions without looking back at the page.",
  (n) => "Go through the " + n + " notes first and answer the questions only after closing the notes.",
  (n) => "Study the " + n + " notes, then test yourself on the questions without referring back.",
];
const TIP_TWO_MANY = [
  (i) => "Work through " + i + " one at a time, and re-attempt the block where your accuracy is lowest.",
  (i) => "Take " + i + " in order, and go back over whichever block gave the most wrong answers.",
  (i) => "Finish " + i + " one by one, re-attempting the weakest block before moving on.",
];
const TIP_TWO_ONE = [
  (i) => "Finish " + i + " completely before moving on, and re-attempt it after a few days to check what you retained.",
  (i) => "Complete " + i + " before starting anything else, then come back to it after a few days.",
  (i) => "Work through " + i + " to the end, and revisit it a few days later to see what stuck.",
];
const TIP_TWO_NONE = [
  (n) => "Keep a one-page note of the " + n + " facts or formulas you keep forgetting, and read it before each practice session.",
  (n) => "Maintain a short list of the " + n + " points you forget most often and revise that list before every attempt.",
  (n) => "Note down the " + n + " details that keep slipping and read that note before you practise.",
];
const TIP_LANG = [
  (n) => "Practise " + n + " in both Assamese and English, because the exam paper can word the same question in either language.",
  (n) => "Attempt " + n + " questions in Assamese as well as English, since the paper may switch language between questions.",
  (n) => "Read the " + n + " questions in both languages, so a change of wording in the exam does not throw you off.",
];
const TIP_EXAMS = [
  (n, e) => "Add " + n + " to your final-week revision list and take one timed sectional test for " + e + " before the exam.",
  (n, e) => "Keep " + n + " in the last-week revision plan, and sit at least one timed test in the " + e + " pattern.",
  (n, e) => "Schedule " + n + " for the final week and attempt a timed sectional paper for " + e + " beforehand.",
];
const TIP_NONEXAM = [
  (n) => "Re-attempt the " + n + " sets after a few days and log every repeated mistake \u2014 that log becomes your last-minute revision material.",
  (n) => "Return to the " + n + " questions after a gap and record the mistakes you repeat; that record is the most useful thing to revise at the end.",
  (n) => "Come back to " + n + " a few days later and write down each error you repeat, so the final revision has a clear target.",
];

function buildTips(ctx) {
  const c = ctx || {};
  const seed = clean(c.canonical) || clean(c.name);
  const name = clean(c.name) || "this topic";
  const count = countLabel(c);
  const items = usefulItems(c.items, name);
  const exams = examList(clean(c.exams));
  const tips = [];

  tips.push(
    count
      ? pick(TIP_ONE_COUNT, seed, "tip1")(name, count)
      : pick(TIP_ONE_NONE, seed, "tip1")(name)
  );

  if (items.length >= 2) tips.push(pick(TIP_TWO_MANY, seed, "tip2")(joinNames(items, 3)));
  else if (items.length === 1) tips.push(pick(TIP_TWO_ONE, seed, "tip2")(items[0]));
  else tips.push(pick(TIP_TWO_NONE, seed, "tip2")(name));

  tips.push(pick(TIP_LANG, seed, "tip3")(name));

  tips.push(
    exams ? pick(TIP_EXAMS, seed, "tip4")(name, exams) : pick(TIP_NONEXAM, seed, "tip4")(name)
  );

  return tips;
}

module.exports = {
  buildFaqs,
  buildInfo,
  buildTips,
  firstClause,
  secondClause,
  descRest,
  joinNames,
  countLabel,
  usefulItems,
  examList,
  decodeEntities,
  hash,
};
