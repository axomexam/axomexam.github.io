#!/usr/bin/env node
"use strict";

/*
 * tools/fix-duplicate-doctype.js
 *
 * Collapses a repeated leading `<!DOCTYPE html>\n<html lang="…">` prefix to a
 * single one.
 *
 * The exam-book page builders reuse another book's page as "chrome": they copy
 * its whole head, including the doctype and <html> line that their own
 * pageShell() then emits again. Every book that borrowed a leaf from another
 * book therefore shipped one extra doctype per generation level — the RRB NTPC
 * pages reached three. Browsers ignore the repeats, but the markup is invalid
 * and it is needless duplicate content at the top of the document.
 *
 * The generators are fixed (the chrome slice now starts at `<head>`), so new
 * pages are clean; this tool repairs the pages already committed. The first
 * `<html lang="…">` is kept, which is the correct language for the page (the
 * /as/ twins lead with lang="as").
 *
 * Idempotent: a page with one doctype is left untouched.
 *
 * Usage:
 *   node tools/fix-duplicate-doctype.js          # apply
 *   node tools/fix-duplicate-doctype.js --check  # report only
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");
const SKIP_DIRS = new Set([".git", "node_modules", ".github"]);

/* One or more copies of the doctype + <html lang> pair at the very start. */
const LEADING = /^(?:<!DOCTYPE html>\r?\n<html lang="[^"]*">\r?\n)+/;

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

const files = walk(ROOT, []);
let changed = 0;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(LEADING);
  if (!m) continue;
  const copies = m[0].trimEnd().split(/\r?\n/).length / 2;
  if (copies < 2) continue;

  const first = m[0].match(/<!DOCTYPE html>\r?\n<html lang="[^"]*">/)[0];
  const after = first + "\n" + html.slice(m[0].length);
  changed++;
  if (!CHECK) fs.writeFileSync(file, after, "utf8");
}

console.log(`fix-duplicate-doctype${CHECK ? " (check)" : ""}`);
console.log(`  pages scanned : ${files.length}`);
console.log(`  pages fixed   : ${changed}`);
