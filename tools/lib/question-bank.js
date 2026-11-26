#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/lib/question-bank.js

   Shared helpers for counting questions across the site's data
   banks. Used by the homepage-total tools so they all agree on
   what "a question" is.

   The mock-test banks (data/mock-test and data/exam-mock-sets)
   are built *from* the practice (data/content) and exam-book
   (data/exams) banks, so most of their questions already exist in
   the banks the homepage already counts. `mockQuestionsNotInCore`
   returns only the mock questions that are genuinely new, so the
   homepage total can include them without double-counting.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}

function hash(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

/* A stable fingerprint for one question, independent of which file or bank it
   lives in. Two banks that hold the same question produce the same value, so
   duplicates can be dropped. Handles both question shapes the site uses:
   the {q:{en,as}, options:[{en,as}]} practice/exam/mock shape and the
   {question_en, answer_en} current-affairs shape. Returns null when there is
   nothing to fingerprint. */
function questionFingerprint(q) {
  if (!q || typeof q !== "object") return null;

  if (q.question_en !== undefined || q.question_as !== undefined) {
    const stem = String(q.question_en || "").trim();
    const answer = String(q.answer_en || "").trim();
    if (!stem && !answer) return null;
    return hash(`${stem}\u0000${answer}`);
  }

  let stem = "";
  const t = q.q;
  if (t && typeof t === "object") stem = String(t.en || "").trim();
  else if (typeof t === "string") stem = t.trim();

  const options = Array.isArray(q.options)
    ? q.options.map((o) => (o && typeof o === "object" ? String(o.en || "").trim() : String(o == null ? "" : o).trim()))
    : [];

  if (!stem && !options.length) return null;
  return hash(`${stem}\u0000${options.join("\u0000")}`);
}

/* Every question in a JSON file, whatever wrapper it uses. */
function fileQuestions(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.questions)) return data.questions;
  return [];
}

/* Collect the fingerprints of every question under a directory. Set
   `setOnly` to true to read only set-*.json files (skips blueprints and
   index manifests); `skipExtra` drops the harder exam-wise "extra" bank,
   whose questions also appear inside the built sets. */
function collectFingerprints(dir, opts) {
  const options = opts || {};
  const out = new Set();
  const walk = (d) => {
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (options.skipExtra && e.name === "extra") continue;
        walk(full);
        continue;
      }
      if (!/\.json$/i.test(e.name)) continue;
      if (/^index\.json$/i.test(e.name)) continue;
      if (options.setOnly && !/^set-\d+\.json$/i.test(e.name)) continue;
      for (const q of fileQuestions(readJSON(full))) {
        const fp = questionFingerprint(q);
        if (fp) out.add(fp);
      }
    }
  };
  walk(dir);
  return out;
}

/* The number of mock-test questions that do not already appear in the practice
   (data/content) or exam-book (data/exams) banks. The mock banks are derived
   from those two, so a raw sum would double-count roughly two thirds of them.

   Only the banks the site actually serves are counted: data/mock-test and the
   published data/exam-mock-sets set-N.json files. The exam-mock-sets/extra
   directory is build-time input (its questions already appear inside the
   published sets), so counting it would inflate the total. */
function mockQuestionsNotInCore(root) {
  const R = root || path.resolve(__dirname, "..", "..");
  const data = path.join(R, "data");

  const core = new Set();
  for (const fp of collectFingerprints(path.join(data, "content"))) core.add(fp);
  for (const fp of collectFingerprints(path.join(data, "exams"))) core.add(fp);

  const mock = new Set();
  for (const fp of collectFingerprints(path.join(data, "mock-test"))) mock.add(fp);
  for (const fp of collectFingerprints(path.join(data, "exam-mock-sets"), { setOnly: true, skipExtra: true })) mock.add(fp);

  let n = 0;
  for (const fp of mock) if (!core.has(fp)) n++;
  return n;
}

module.exports = {
  questionFingerprint,
  collectFingerprints,
  mockQuestionsNotInCore,
};
