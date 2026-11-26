#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam - tools/build-exam-logos.js

   Converts the raw exam logo art dropped in "exam logo/" into the
   site-standard WebP tiles served from images/exams/<id>-logo.webp.

   The source files are photographs and exports of very different
   sizes (225px to 900px) on white or transparent backgrounds. Each
   one is trimmed of its uniform border, centred on a square white
   canvas with a small margin, and written out at a single size so
   the exam-wise mock test cards and hero render them consistently.

   ADRE Grade III and Grade IV share the "adre iii.jpg" art (the
   Government of Assam emblem), so both ids get the same tile.

   Requires python3 with Pillow, so it is NOT part of the normal
   build. Run it by hand when the source art changes.

   Usage:
     node tools/build-exam-logos.js
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "exam logo");
const OUT_DIR = path.join(ROOT, "images", "exams");
const SIZE = 512;
const MARGIN = 26;

/* Source file -> exam id(s). The ids match data/exams/index.json.
   "trim" is the default corner-diff crop; "threshold" trims to the
   bounding box of everything darker than the given luminance, which
   is what a logo inside a dark frame needs (adre iii.jpg). */
const MAP = [
  ["assam oplice.jpg", ["assam-police"]],
  ["apsc.jpg", ["apsc"]],
  ["tet.png", ["assam-tet"]],
  ["dhs & dme.jpg", ["dhs-dme"]],
  ["GUWAHATI HIGH COURT.jpg", ["guwahati-hc"]],
  ["ssc.png", ["ssc"]],
  ["railway.png", ["railway"]],
  ["adre iii.jpg", ["adre-grade-3", "adre-grade-4"], { trim: "threshold", cutoff: 235, inset: 6 }],
];

function main() {
  const jobs = [];
  for (const [file, ids, opts] of MAP) {
    const src = path.join(SRC_DIR, file);
    if (!fs.existsSync(src)) {
      console.error(`missing source: ${file}`);
      process.exitCode = 1;
      continue;
    }
    for (const id of ids) {
      jobs.push({
        src,
        out: path.join(OUT_DIR, `${id}-logo.webp`),
        trim: (opts && opts.trim) || "trim",
        cutoff: (opts && opts.cutoff) || 235,
        inset: (opts && opts.inset) || 0,
      });
    }
  }
  if (!jobs.length) return;

  const script = `
import sys
from PIL import Image, ImageChops

size = ${SIZE}
margin = ${MARGIN}
jobs = ${JSON.stringify(jobs)}

def content_box(im, job):
    if job["trim"] == "threshold":
        gray = im.convert("L")
        w, h = gray.size
        inset = job.get("inset", 0)
        px = gray.load()
        xs = []; ys = []
        for y in range(inset, h - inset):
            for x in range(inset, w - inset):
                if px[x, y] < job["cutoff"]:
                    xs.append(x); ys.append(y)
        if xs:
            return (min(xs), min(ys), max(xs) + 1, max(ys) + 1)
        return None
    rgb = im.convert("RGB")
    bg = Image.new("RGB", im.size, rgb.getpixel((0, 0)))
    return ImageChops.difference(rgb, bg).getbbox()

for job in jobs:
    im = Image.open(job["src"]).convert("RGBA")
    # Trim so the logo fills the tile instead of sitting in a wide margin.
    bbox = content_box(im, job)
    if bbox:
        im = im.crop(bbox)
    inner = size - margin * 2
    im.thumbnail((inner, inner), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    canvas.alpha_composite(im, ((size - im.width) // 2, (size - im.height) // 2))
    canvas.convert("RGB").save(job["out"], "WEBP", quality=88, method=6)
    print(f'{job["out"]}  {im.width}x{im.height} -> {size}x{size}')
`;
  const out = execFileSync("python3", ["-c", script], { encoding: "utf8" });
  process.stdout.write(out);
}

main();
