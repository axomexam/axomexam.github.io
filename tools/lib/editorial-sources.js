"use strict";
/**
 * Canonical "Sources:" line for the editorial-credit block.
 *
 * Builders reuse the credit section from the math reference page
 * (topic/math/arithmetic/boats-and-streams). That block hard-codes
 * "standard mathematics reference material", so generated pages on other
 * subjects claimed a math source. Every builder must call sourcesLine()
 * and substitute the result before writing the page.
 *
 * The subject is resolved from whole path tokens, never substrings: a
 * substring match once mapped "ahom-administration" to math (the "ratio" in
 * "administration") and "mythological-rulers" to reasoning (the "logic" in
 * "mythological").
 *
 * Exam-aware variant (sourcesLineWithExam / applySourcesLineExamAware):
 * a page that sits under exams/<exam>/ or previous-year/<exam>/ names the
 * official recruiting body that publishes its syllabus. The body is only
 * cited when it appears in data/sources.json, which lists portals already
 * verified on the /sources/ page. An unverified link is worse than the
 * generic line, so an unknown exam falls back to the subject line.
 */

const fs = require("fs");
const path = require("path");

const SOURCES = {
  math: "Official exam syllabus and standard mathematics reference material",
  reasoning: "Official exam syllabus and standard reasoning reference material",
  science: "NCERT and standard science reference material and online resources",
  english: "standard English grammar and vocabulary reference material and online resources",
  computer: "standard computer-awareness reference material and online resources",
  gk: "publicly available online resources and standard reference material",
};

/* Whole tokens only. A page is resolved by its first matching token, and the
   subject segment (topic/<cat>/, mock-test/<cat>/, exams/<book>/<section>/)
   always comes before the leaf topic, so an exam book name cannot win. */
const TOKEN_SUBJECT = {
  // mathematics
  math: "math", mathematics: "math", arithmetic: "math", mensuration: "math",
  algebra: "math", geometry: "math", trigonometry: "math", percentage: "math",
  average: "math", averages: "math", profit: "math", loss: "math", interest: "math",
  ratio: "math", proportion: "math", simplification: "math", lcm: "math", hcf: "math",
  partnership: "math", pipes: "math", cisterns: "math", boats: "math", streams: "math",
  mixture: "math", alligation: "math", statistics: "math", interpretation: "math",
  surds: "math", indices: "math", ages: "math", digit: "math", digits: "math",
  // reasoning
  reasoning: "reasoning", logic: "reasoning", logical: "reasoning", analogy: "reasoning",
  series: "reasoning", venn: "reasoning", blood: "reasoning", relations: "reasoning",
  direction: "reasoning", odd: "reasoning", classification: "reasoning",
  syllogism: "reasoning", verbal: "reasoning", nonverbal: "reasoning",
  analytical: "reasoning", critical: "reasoning", mental: "reasoning", ability: "reasoning",
  coding: "reasoning", decoding: "reasoning", ranking: "reasoning", ordering: "reasoning",
  operations: "reasoning", cube: "reasoning", dice: "reasoning", figure: "reasoning",
  // science
  science: "science", physics: "science", chemistry: "science", biology: "science",
  // english
  english: "english", grammar: "english", vocabulary: "english", vocab: "english",
  tenses: "english", narration: "english", preposition: "english", idiom: "english",
  idioms: "english", synonym: "english", synonyms: "english", antonym: "english",
  antonyms: "english", spelling: "english", sentence: "english", sentences: "english",
  voice: "english", degree: "english",
  // computer
  computer: "computer", awareness: "computer", office: "computer", fundamentals: "computer",
  dbms: "computer", shortcut: "computer", shortcuts: "computer", keyboard: "computer",
  // general knowledge
  gk: "gk", history: "gk", geography: "gk", polity: "gk", economy: "gk", economics: "gk",
  culture: "gk", literature: "gk", affairs: "gk", static: "gk", environment: "gk",
  ancient: "gk", medieval: "gk", modern: "gk", mythological: "gk", demography: "gk",
  census: "gk", constitution: "gk", puranas: "gk", epics: "gk",
};

const DEFAULT_SUBJECT = "gk";

/* Exam -> official portal. Read from data/sources.json so the citation and the
   /sources/ page cannot drift apart. A missing or malformed file disables the
   exam-aware variant instead of breaking a build. */
function loadExams() {
  try {
    const p = path.join(__dirname, "..", "..", "data", "sources.json");
    const parsed = JSON.parse(fs.readFileSync(p, "utf8"));
    return parsed && typeof parsed.exams === "object" ? parsed.exams : {};
  } catch {
    return {};
  }
}

const EXAMS = loadExams();

/** Resolve the canonical Sources line for a category id or page path. */
function sourcesLine(idOrPath) {
  const raw = String(idOrPath || "").toLowerCase();
  const tokens = raw.split(/[^a-z0-9]+/).filter(Boolean);
  for (const token of tokens) {
    if (TOKEN_SUBJECT[token]) return SOURCES[TOKEN_SUBJECT[token]];
  }
  return SOURCES[DEFAULT_SUBJECT];
}

/**
 * Which exam does a page path belong to? Only the two structures that carry an
 * exam identity are recognised: exams/<exam>/... and previous-year/<exam>/...
 * A leading "as/" segment is dropped first. Anything else returns null, which
 * keeps topic, mock-test and category pages on the plain subject line.
 */
function examIdFromPath(idOrPath) {
  const segs = String(idOrPath || "")
    .toLowerCase()
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean);
  if (segs[0] === "as") segs.shift();
  if (segs[0] !== "exams" && segs[0] !== "previous-year") return null;
  return segs[1] || null;
}

/** The verified portal for a page path, or null when there is none. */
function examPortal(idOrPath) {
  const id = examIdFromPath(idOrPath);
  if (!id) return null;
  const entry = EXAMS[id];
  return entry && entry.url ? entry : null;
}

/**
 * Sources line that names the official recruiting body when the page belongs
 * to a known exam. The body is presented as the publisher of the syllabus and
 * notification, which is what the /sources/ page already claims, so the
 * sentence stays true for our own questions. Unknown exams fall back to the
 * subject line unchanged.
 */
function sourcesLineWithExam(idOrPath) {
  const subject = sourcesLine(idOrPath);
  const portal = examPortal(idOrPath);
  if (!portal) return subject;
  const link = `<a href="${portal.url}" rel="noopener nofollow" target="_blank">${portal.label}</a>`;
  const rest = subject.replace(/^Official exam syllabus and /, "");
  return `${link} official syllabus and notification; ${rest}`;
}

const EN_LABEL = "<strong>Sources:<\\/strong>";
const AS_LABEL = "<strong>প্ৰসংগ উৎস:<\\/strong>";
const AS_SOURCES = "মানক প্ৰসংগ পুথি আৰু বিশ্বাসযোগ্য অনলাইন উৎস";

/* The value is replaced up to the closing </span> of the meta item. Matching
   on </span> instead of [^<]* keeps a second run idempotent once the value
   itself contains an anchor element. */
function replaceValue(block, label, value) {
  const re = new RegExp(
    `(<span class="editorial-meta-item">${label}\\s*)([\\s\\S]*?)(</span>)`
  );
  return String(block).replace(re, `$1${value}$3`);
}

/** Rewrite the Sources value inside an already-built credit block. */
function applySourcesLine(block, idOrPath) {
  return String(block).replace(
    /(<strong>Sources:<\/strong>\s*)[^<]*/,
    `$1${sourcesLine(idOrPath)}`
  );
}

/**
 * Rewrite both the English "Sources:" and the Assamese "প্ৰসংগ উৎস:" values in
 * an already-built credit block. Every page carries both language blocks, so a
 * change that touches only one of them leaves the page inconsistent.
 */
function applySourcesLineExamAware(block, idOrPath) {
  const portal = examPortal(idOrPath);
  /* No exam in the path: leave the block byte-identical. Some pages carry a
     more specific line of their own (previous-year pages name the question
     papers), and replacing it with the generic subject line would lose
     information. */
  if (!portal) return String(block);
  let out = replaceValue(block, EN_LABEL, sourcesLineWithExam(idOrPath));
  const asValue = `<a href="${portal.url}" rel="noopener nofollow" target="_blank">${portal.label}</a> ৰ চৰকাৰী পাঠ্যক্ৰম; ${AS_SOURCES}`;
  out = replaceValue(out, AS_LABEL, asValue);
  return out;
}

module.exports = {
  SOURCES,
  TOKEN_SUBJECT,
  DEFAULT_SUBJECT,
  EXAMS,
  sourcesLine,
  sourcesLineWithExam,
  examIdFromPath,
  examPortal,
  applySourcesLine,
  applySourcesLineExamAware,
};
