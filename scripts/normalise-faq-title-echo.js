#!/usr/bin/env node
"use strict";

/*
 * normalise-faq-title-echo.js
 *
 * A generator that is no longer in the repository built some FAQ questions
 * from the whole page title, so the title's descriptor half ends up inside the
 * sentence:
 *
 *   "Is Syllabus — ADRE 3.0 Grade IV Exam Book free to use on axomexam?"
 *   "চিত্ৰ মেট্ৰিক্স — শাৰী আৰু স্তম্ভৰ সম্পৰ্কৰ পৰা নোহোৱা চিত্ৰটো পূৰণ কৰা। ৰ প্ৰশ্নসমূহ..."
 *
 * In every case the block repeats one string twice, once in the question and
 * once at the start of the answer: "{subject} — {descriptor}". The subject is
 * what the question needs; the descriptor is the page subtitle and reads as
 * noise inside a sentence. This tool removes only the descriptor, in place, so
 * no content is lost and no new sentence is invented.
 *
 * The descriptor is found by taking the prefix the question and the answer have
 * in common after the subject, then cutting it at the last sentence terminator
 * ("।" or ".") when it has one, because the shared prefix can otherwise run on
 * into the question template ("... কৰা। axomexam ত ...").
 *
 * Idempotent: a repaired block no longer contains " — " or " | " in its
 * summary, so a second run finds nothing to change.
 *
 * Usage:
 *   node scripts/normalise-faq-title-echo.js          # report and apply
 *   node scripts/normalise-faq-title-echo.js --check  # report only
 *   node scripts/normalise-faq-title-echo.js --dry    # print every before/after
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DRY = process.argv.includes("--dry") || CHECK;
const SKIP_DIRS = new Set([".git", "node_modules", "dist", ".github"]);

const DETAILS_RE = /<details\b[^>]*>[\s\S]*?<\/details>/gi;
const SEPARATORS = [" — ", " | ", " – "];

const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "-", ndash: "-", bull: "-", hellip: "..." };

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, n) => (Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, n.toLowerCase()) ? NAMED_ENTITIES[n.toLowerCase()] : m));
}

function encode(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const strip = (s) => decode(String(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function pickSeparator(text) {
  for (const sep of SEPARATORS) {
    const i = text.indexOf(sep);
    if (i !== -1) return { sep, i };
  }
  return null;
}

/* "… — …" inside a sentence reads better with an article when the subject is a
   bare noun: "Is the syllabus free" over "Is Syllabus free". */
const asSubjectPhrase = (subject) => (/^[A-Za-z]+$/.test(subject) ? `the ${subject.toLowerCase()}` : subject);

/* The words a question template puts in front of the subject. */
const PREAMBLE = /^(?:Is|Are|Which exams (?:is|are)|How many questions does|How much material does|How should I prepare|What does)\s+/i;

/* Where the descriptor stops inside a sentence that continues with the rest of
   the template: a full stop, or the first template word when the shared prefix
   runs on ("Assam Competitive Exams ৰ প্ৰ..." where both sides continue "প্ৰ"). */
function cutDescriptor(text) {
  let d = text;
  const stop = Math.max(d.lastIndexOf("।"), d.lastIndexOf(". "));
  if (stop !== -1) d = d.slice(0, stop + 1);
  const marker = d.search(/\s(?:axomexam|is\s|are\s|free\s|the\s|it\s|useful\s|দ্বিভাষিক|কোনবোৰ|কিমান|প্ৰশ্ন|সমূহ|ৰ\s|ত\s)/i);
  if (marker > 0) d = d.slice(0, marker);
  return d.replace(/[?\s]+$/, "").trim();
}

/* Removes "{subject} — {descriptor}" wherever it appears, keeping the subject. */
function dropEcho(text, subject, sep) {
  const phrase = asSubjectPhrase(subject);
  const needle = subject + sep;
  const at = text.indexOf(needle);
  if (at === -1) return { text, changed: false };
  const descriptor = cutDescriptor(text.slice(at + needle.length));
  if (!descriptor) return { text, changed: false };
  const capitalise = at === 0 || /[.!?।]\s$/.test(text.slice(0, at));
  /* The descriptor can swallow the closing full stop, so put it back. */
  const stop = /[.।]$/.test(descriptor) ? descriptor.slice(-1) : "";
  const replacement = (capitalise ? phrase.charAt(0).toUpperCase() + phrase.slice(1) : phrase) + stop;
  return { text: text.replace(needle + descriptor, replacement), changed: true };
}

function repairQuestion(question, answer) {
  const found = pickSeparator(question);
  if (!found) return null;
  const left = question.slice(0, found.i);
  const pre = left.match(PREAMBLE);
  const subject = (pre ? left.slice(pre[0].length) : left).trim();
  if (!subject) return null;

  const q = dropEcho(question, subject, found.sep);
  const a = dropEcho(answer, subject, found.sep);
  if (!q.changed && !a.changed) return null;

  const tidy = (s) => s
    .replace(/\s{2,}/g, " ")
    .replace(/(?<=[\u0980-\u09FF)])\s+ৰ(?=\s|$)/g, "ৰ");
  return { question: tidy(q.text), answer: tidy(a.text), echo: question.slice(found.i - subject.length, found.i + found.sep.length) + cutDescriptor(question.slice(found.i + found.sep.length)), phrase: asSubjectPhrase(subject) };
}

function processFile(file, stats) {
  const html = fs.readFileSync(file, "utf8");
  let changed = 0;
  const out = html.replace(DETAILS_RE, (block) => {
    const sm = block.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!sm) return block;
    const question = strip(sm[1]);
    if (!pickSeparator(question)) return block;

    const rest = block.slice(block.indexOf(sm[0]) + sm[0].length);
    const para = rest.match(/^(\s*<p\b[^>]*>)([\s\S]*?)(<\/p>)/i);
    if (!para) return block;
    if (/</.test(para[2])) return block; /* markup inside the answer: leave it */

    const fixed = repairQuestion(question, strip(para[2]));
    if (!fixed) return block;

    changed++;
    const fixedBlock = block
      .replace(sm[1], encode(fixed.question))
      .replace(para[0], para[1] + encode(fixed.answer) + para[3]);
    stats.samples.push({ file: path.relative(ROOT, file), from: fixed.echo, to: fixed.phrase, q: fixed.question, a: fixed.answer });
    return fixedBlock;
  });

  stats.blocks += changed;
  if (changed && !DRY) fs.writeFileSync(file, out, "utf8");
  if (changed) stats.pages.push(path.relative(ROOT, file));
}

function main() {
  const stats = { blocks: 0, pages: [], samples: [] };
  for (const file of walk(ROOT, [])) processFile(file, stats);

  if (DRY && process.argv.includes("--dry")) {
    for (const s of stats.samples) {
      console.log(`  ${s.file}`);
      console.log(`      dropped : "${s.from}"`);
      console.log(`      Q now   : ${s.q}`);
      console.log(`      A now   : ${s.a.slice(0, 150)}`);
    }
  }
  console.log(`FAQ title-echo ${CHECK ? "(check)" : "(apply)"}`);
  console.log(`  blocks repaired : ${stats.blocks}`);
  console.log(`  pages affected  : ${stats.pages.length}`);
}

main();
