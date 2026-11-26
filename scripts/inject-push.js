#!/usr/bin/env node
"use strict";

/*
 * Inject the Web Push script tags into every page.
 *
 * Two tags are needed:
 *   /js/push-config.js  public VAPID key + collection name
 *   /js/push.js?v=...   the opt-in logic
 *
 * They go right after the leaderboard scripts, which is where the header
 * (and therefore the bell panel) is already built. Pages that do not load
 * the leaderboard bundle still get them, because the bell lives in the
 * shared header markup, not in the leaderboard module.
 *
 * Idempotent: a page that already has the marker is left alone, so running
 * this after every content build is safe and reports `Injected: 0`.
 *
 * Usage, run from the repository root:
 *   node scripts/inject-push.js
 */

const fs = require("fs");
const path = require("path");

const MARKER = "/js/push.js";
const SKIP_DIRS = new Set([".git", "node_modules", ".github", "_preview", "dist"]);

/* The leaderboard is a separate product with its own Firebase project and
   its own release cadence; it must not carry the push bundle. */
const SKIP_PATHS = new Set(["leaderboard/index.html", "as/leaderboard/index.html"]);

const TAGS = `  <script src="/js/push-config.js" defer></script>
  <script src="/js/push.js?v=00000000" defer></script>
`;

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

function inject(file) {
  const rel = path.relative(path.resolve(__dirname, ".."), file).split(path.sep).join("/");
  if (SKIP_PATHS.has(rel)) return "skipped";

  const html = fs.readFileSync(file, "utf8");
  if (html.includes(MARKER)) return "already";

  /* Anchor on the last known script in the shared footer block. Pages that
     lack it (a few hand-written stubs) fall back to </body>. */
  const anchor = /([ \t]*)<script src="\/js\/leaderboard-ui\.js[^"]*"[^>]*><\/script>\n/;
  const match = html.match(anchor);

  let updated;
  if (match) {
    const at = match.index + match[0].length;
    updated = html.slice(0, at) + TAGS + html.slice(at);
  } else {
    const bodyEnd = html.lastIndexOf("</body>");
    if (bodyEnd === -1) return "nobody";
    updated = html.slice(0, bodyEnd) + TAGS + html.slice(bodyEnd);
  }

  fs.writeFileSync(file, updated, "utf8");
  return "injected";
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const files = walk(root, []);

  let injected = 0;
  let already = 0;
  const skipped = [];
  const nobody = [];

  for (const file of files) {
    const result = inject(file);
    if (result === "injected") injected++;
    else if (result === "already") already++;
    else if (result === "skipped") skipped.push(file);
    else nobody.push(file);
  }

  console.log(`Scanned: ${files.length} HTML file(s)`);
  console.log(`Injected: ${injected}`);
  console.log(`Already present: ${already}`);
  if (skipped.length) {
    console.log(`Skipped (leaderboard, by design): ${skipped.length}`);
    for (const f of skipped) console.log(`  - ${path.relative(root, f)}`);
  }
  if (nobody.length) {
    console.log(`Skipped (no </body>): ${nobody.length}`);
    for (const f of nobody) console.log(`  - ${path.relative(root, f)}`);
  }
}

main();
