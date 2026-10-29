#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam - tools/build-adre-grade-3-cover.js

   Renders the "ADRE 3.0 Grade III" book front cover to
   images/exams/adre-grade-3-cover.webp so the exam card and the
   exam hero have real cover art (the JSON points at it).

   The cover is drawn as HTML and captured with headless Chromium,
   then converted to WebP with Pillow. Requires `chromium` and
   `python3` with Pillow, so it is NOT part of the normal build.

   Usage:
     node tools/build-adre-grade-3-cover.js
   ============================================================ */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "images", "exams", "adre-grade-3-cover.webp");
const W = 912;
const H = 1166;
const ACCENT = "#0f766e";

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Noto+Sans+Bengali:wght@600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden}
  .cover{position:relative;width:${W}px;height:${H}px;display:flex;flex-direction:column;
    padding:64px 60px 56px;color:#fff;font-family:Inter,sans-serif;
    background:
      radial-gradient(120% 80% at 85% 8%, rgba(45,212,191,.55), transparent 58%),
      radial-gradient(110% 70% at 8% 96%, rgba(34,211,238,.38), transparent 60%),
      linear-gradient(160deg, #0b3b38 0%, ${ACCENT} 46%, #115e59 100%);}
  .grain{position:absolute;inset:0;opacity:.14;
    background-image:radial-gradient(rgba(255,255,255,.55) 1px, transparent 1px);
    background-size:26px 26px;}
  .rule{position:absolute;left:0;top:0;bottom:0;width:14px;background:linear-gradient(180deg,#5eead4,#0d9488 55%,#14b8a6)}
  .brand{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:-.4px;position:relative}
  .brand .mark{width:44px;height:44px;border-radius:13px;background:#fff;color:${ACCENT};
    display:grid;place-items:center;font-weight:900;font-size:23px}
  .badge{position:relative;margin-top:56px;align-self:flex-start;
    padding:9px 18px;border-radius:99px;font-size:15px;font-weight:700;letter-spacing:1.4px;
    text-transform:uppercase;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.42)}
  h1{position:relative;margin-top:26px;font-size:74px;line-height:1.03;font-weight:900;letter-spacing:-2.6px}
  h1 span{display:block;color:#99f6e4}
  .as{position:relative;margin-top:20px;font-family:"Noto Sans Bengali",Inter,sans-serif;
    font-size:31px;font-weight:700;line-height:1.45;color:#ccfbf1}
  .line{position:relative;margin-top:30px;width:132px;height:6px;border-radius:99px;background:#5eead4}
  .sub{position:relative;margin-top:26px;font-size:23px;line-height:1.5;color:rgba(255,255,255,.9);max-width:640px}
  .spacer{flex:1}
  .chips{position:relative;display:flex;flex-wrap:wrap;gap:10px}
  .chip{padding:10px 16px;border-radius:11px;font-size:16px;font-weight:600;
    background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.3)}
  .foot{position:relative;margin-top:26px;display:flex;align-items:flex-end;justify-content:space-between;
    gap:20px;border-top:1px solid rgba(255,255,255,.28);padding-top:22px}
  .foot .site{font-size:22px;font-weight:800;letter-spacing:-.3px}
  .foot .note{font-size:15px;color:rgba(255,255,255,.78);text-align:right;line-height:1.5}
</style></head>
<body><div class="cover">
  <div class="grain"></div><div class="rule"></div>
  <div class="brand"><span class="mark">A</span>axomexam</div>
  <div class="badge">Assam Direct Recruitment</div>
  <h1>ADRE 3.0<span>Grade III</span></h1>
  <div class="as">এডি.আৰ.ই. ৩.০ গ্ৰেড III</div>
  <div class="line"></div>
  <div class="sub">State Level Recruitment Commission &mdash; complete bilingual question bank with answers and explanations.</div>
  <div class="spacer"></div>
  <div class="chips">
    <span class="chip">Syllabus</span>
    <span class="chip">Mathematics</span>
    <span class="chip">English</span>
    <span class="chip">Reasoning</span>
    <span class="chip">Assam GK</span>
    <span class="chip">Social Studies</span>
  </div>
  <div class="foot">
    <div class="site">axomexam.in</div>
    <div class="note">Free bilingual exam book<br>English &amp; Assamese</div>
  </div>
</div></body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "adre3-cover-"));
const src = path.join(tmp, "cover.html");
const png = path.join(tmp, "cover.png");
fs.writeFileSync(src, html, "utf8");

execFileSync("chromium", [
  "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
  `--window-size=${W},${H}`, "--force-device-scale-factor=1",
  "--virtual-time-budget=9000",
  `--screenshot=${png}`, `file://${src}`,
], { stdio: ["ignore", "ignore", "ignore"] });

execFileSync("python3", ["-c", `
from PIL import Image
im = Image.open(r"${png}").convert("RGB")
if im.size != (${W}, ${H}):
    im = im.crop((0, 0, ${W}, ${H}))
im.save(r"${OUT}", "WEBP", quality=88, method=6)
print("wrote ${path.relative(ROOT, OUT)}", im.size)
`], { stdio: "inherit" });

fs.rmSync(tmp, { recursive: true, force: true });
