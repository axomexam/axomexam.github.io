"use strict";
/**
 * Canonical English "Sources:" line for the editorial-credit block.
 *
 * Builders reuse the credit section from the math reference page
 * (topic/math/arithmetic/boats-and-streams). That block hard-codes
 * "standard mathematics reference material", so generated pages on other
 * subjects claimed a math source. Every builder must call sourcesLine()
 * and substitute the result before writing the page.
 */

const SOURCES = {
  math: "Official exam syllabus and standard mathematics reference material",
  reasoning: "Official exam syllabus and standard reasoning reference material",
  science: "NCERT and standard science reference material and online resources",
  english: "standard English grammar and vocabulary reference material and online resources",
  computer: "standard computer-awareness reference material and online resources",
  gk: "publicly available online resources and standard reference material",
};

const ALIASES = {
  mathematics: "math",
  arithmetic: "math",
  "general-english": "english",
  grammar: "english",
  vocabulary: "english",
  physics: "science",
  chemistry: "science",
  biology: "science",
  "ms-office": "computer",
  "comp-fundamentals": "computer",
  economics: "gk",
  history: "gk",
  "indian-history": "gk",
  "assam-history": "gk",
  geography: "gk",
  polity: "gk",
  economy: "gk",
  "art-culture": "gk",
  literature: "gk",
};

/** Resolve the canonical Sources line for a category id or page path. */
function sourcesLine(idOrPath) {
  const segments = String(idOrPath || "").toLowerCase().split(/[/\\]/);
  const parts = segments.flatMap((s) => [s, ...s.split("-")]);
  for (const part of parts) {
    if (SOURCES[part]) return SOURCES[part];
    if (ALIASES[part]) return SOURCES[ALIASES[part]];
  }
  return SOURCES.gk;
}

/** Rewrite the Sources value inside an already-built credit block. */
function applySourcesLine(block, idOrPath) {
  return String(block).replace(
    /(<strong>Sources:<\/strong>\s*)[^<]*/,
    `$1${sourcesLine(idOrPath)}`
  );
}

module.exports = { SOURCES, sourcesLine, applySourcesLine };
