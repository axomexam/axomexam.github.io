#!/usr/bin/env node
"use strict";

/*
 * Minify the deployed first-party assets.
 *
 * The editable sources live next to their outputs with a ".src" infix:
 *
 *   css/style.src.css   ->  css/style.css
 *   js/config.src.js    ->  js/config.js
 *   js/i18n.src.js      ->  js/i18n.js
 *   js/api.src.js       ->  js/api.js
 *   js/app.src.js       ->  js/app.js
 *
 * The homepage's inline critical CSS block
 * (<style id="axo-critical-css"> in index.html) is minified in place too,
 * because Lighthouse counts it toward the "Minify CSS" audit.
 *
 * HTML keeps referencing the un-suffixed filenames, so nothing else needs
 * to change; scripts/stamp-assets.js then refreshes the ?v= hashes.
 *
 * Minification is done with esbuild (fast, battle-tested). It is looked up
 * as `esbuild` on PATH, or via `npx --yes esbuild` as a fallback, and can be
 * overridden with the ESBUILD_BIN environment variable.
 *
 * Full build order after editing a source file:
 *   node scripts/optimize-render-path.js   # refresh inline critical CSS
 *   node scripts/minify-assets.js          # write the minified outputs
 *   node scripts/stamp-assets.js           # refresh ?v= hashes + sw.js
 *
 * Usage, run from the repository root:
 *   node scripts/minify-assets.js
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.argv[2] && !process.argv[2].startsWith("--")
  ? path.resolve(process.argv[2])
  : process.cwd();

const CSS_IN = "css/style.src.css";
const CSS_OUT = "css/style.css";
const JS_ASSETS = ["config", "i18n", "api", "app"];

function resolveEsbuild() {
  if (process.env.ESBUILD_BIN) {
    return { cmd: process.env.ESBUILD_BIN, prefix: [] };
  }
  try {
    execFileSync("esbuild", ["--version"], { stdio: "ignore" });
    return { cmd: "esbuild", prefix: [] };
  } catch (e) {
    return { cmd: "npx", prefix: ["--yes", "esbuild"] };
  }
}

const ESBUILD = resolveEsbuild();

function runEsbuild(args, input) {
  return execFileSync(ESBUILD.cmd, ESBUILD.prefix.concat(args), {
    cwd: ROOT,
    input,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: input === undefined ? ["ignore", "pipe", "inherit"] : ["pipe", "pipe", "inherit"],
  });
}

function minifyFile(inputRel, outputRel) {
  const input = path.join(ROOT, inputRel);
  const output = path.join(ROOT, outputRel);
  if (!fs.existsSync(input)) {
    console.log("  skip (missing): " + inputRel);
    return;
  }
  runEsbuild([
    input,
    "--minify",
    "--charset=utf8",
    "--target=esnext",
    "--legal-comments=inline",
    "--log-level=warning",
    "--outfile=" + output,
  ]);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    "  " + outputRel.padEnd(20) + before.toString().padStart(7) + " -> " +
    after.toString().padStart(7) + " bytes  (" +
    Math.round((1 - after / before) * 100) + "% smaller)"
  );
}

function minifyInlineCriticalCss() {
  const file = path.join(ROOT, "index.html");
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, "utf8");
  const re = /(<style id="axo-critical-css">)([\s\S]*?)(<\/style>)/;
  const match = html.match(re);
  if (!match) {
    console.log("  inline critical CSS: not found (skipped)");
    return;
  }
  const minified = runEsbuild(
    ["--minify", "--charset=utf8", "--loader=css", "--log-level=warning"],
    match[2]
  ).trim();
  if (minified === match[2]) {
    console.log("  inline critical CSS: already minified");
    return;
  }
  fs.writeFileSync(file, html.replace(re, "$1" + minified + "$3"), "utf8");
  console.log(
    "  inline critical CSS: " + match[2].length + " -> " + minified.length +
    " chars"
  );
}

function main() {
  console.log("Minifying assets with " + ESBUILD.cmd + " ...");
  minifyFile(CSS_IN, CSS_OUT);
  for (const name of JS_ASSETS) {
    minifyFile("js/" + name + ".src.js", "js/" + name + ".js");
  }
  minifyInlineCriticalCss();
  console.log("Done.");
}

main();
