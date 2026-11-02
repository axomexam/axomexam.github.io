"use strict";
/**
 * Canonical English "Sources:" line for the editorial-credit block.
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
 */

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

/** Resolve the canonical Sources line for a category id or page path. */
function sourcesLine(idOrPath) {
  const raw = String(idOrPath || "").toLowerCase();
  const tokens = raw.split(/[^a-z0-9]+/).filter(Boolean);
  for (const token of tokens) {
    if (TOKEN_SUBJECT[token]) return SOURCES[TOKEN_SUBJECT[token]];
  }
  return SOURCES[DEFAULT_SUBJECT];
}

/** Rewrite the Sources value inside an already-built credit block. */
function applySourcesLine(block, idOrPath) {
  return String(block).replace(
    /(<strong>Sources:<\/strong>\s*)[^<]*/,
    `$1${sourcesLine(idOrPath)}`
  );
}

module.exports = { SOURCES, TOKEN_SUBJECT, DEFAULT_SUBJECT, sourcesLine, applySourcesLine };
