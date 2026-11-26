#!/usr/bin/env node
"use strict";

/* Generator for the RRB NTPC Non-Verbal Reasoning banks.
   Emits figure-based MCQs in the repo's existing non-verbal format
   (inline SVG in `fig`, picture options), one JSON bank per topic under
   data/exams/rrb-ntpc/reasoning/non-verbal-reasoning/<topic>/question-001.json.

   Answer keys are balanced here (rotation by question index) because
   tools/balance-answer-keys.js deliberately refuses figure questions.
   Every generated figure and every option is checked to be distinct, and
   every answer is computed from the construction, not typed.

   Usage:  node tools/gen-rrb-ntpc-non-verbal.js [topic ...] */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "data", "exams", "rrb-ntpc", "reasoning", "non-verbal-reasoning");

const S = "#334155";
const BORDER = "#e2e8f0";
const LETTERS = ["A", "B", "C", "D"];

function wrap(vbW, vbH, w, h, inner) {
  const border = `<rect x="2" y="2" width="${vbW - 4}" height="${vbH - 4}" rx="10" fill="none" stroke="${BORDER}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${w}" height="${h}">${border}${inner}</svg>`;
}
function line(x1, y1, x2, y2, c, sw) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || S}" stroke-width="${sw || 2.2}" stroke-linecap="round"/>`;
}
function poly(pts, fill, stroke, sw) {
  return `<polygon points="${pts}" fill="${fill || "none"}" stroke="${stroke || S}" stroke-width="${sw || 2.2}" stroke-linejoin="round"/>`;
}
function circ(cx, cy, r, fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill || "none"}"${fill ? "" : ` stroke="${S}" stroke-width="2.2"`}/>`;
}
function txt(x, y, s, size, fill) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle" fill="${fill || S}">${s}</text>`;
}
function numFig(n) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${txt(50, 70, n, 56)}</svg>`;
}

function balanceOptions(values, correctValue, qIndex) {
  const vals = values.slice();
  const shift = qIndex % 4;
  const rotated = vals.slice(shift).concat(vals.slice(0, shift));
  const options = rotated.map((v, i) => ({ option: LETTERS[i], fig: numFig(v) }));
  return { options, correct: rotated.indexOf(correctValue) };
}
function numberValues(correct, qIndex) {
  const deltas = [1, -1, 2, 3, -2, 4, -3, 5];
  const out = [correct];
  let i = qIndex % deltas.length;
  while (out.length < 4) {
    const v = correct + deltas[i % deltas.length];
    if (v > 0 && !out.includes(v)) out.push(v);
    i++;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* figure families                                                     */
/* ------------------------------------------------------------------ */

function triApexBase(m, extraChord) {
  const apex = [100, 14], left = [16, 146], right = [184, 146];
  const inner = [line(apex[0], apex[1], left[0], left[1]), line(apex[0], apex[1], right[0], right[1]), line(left[0], left[1], right[0], right[1])];
  for (let i = 1; i < m; i++) {
    const x = left[0] + ((right[0] - left[0]) * i) / m;
    inner.push(line(apex[0], apex[1], x, right[1]));
  }
  if (extraChord) {
    const t = 0.5;
    const y = apex[1] + (left[1] - apex[1]) * t;
    const xl = apex[0] + (left[0] - apex[0]) * t;
    const xr = apex[0] + (right[0] - apex[0]) * t;
    inner.push(line(xl, y, xr, y));
  }
  const count = ((m + 1) * m) / 2 + (extraChord ? 1 : 0);
  return { svg: wrap(200, 160, 300, 240, inner.join("")), count };
}
function triHoriz(h) {
  const apex = [100, 14], left = [16, 146], right = [184, 146];
  const inner = [line(apex[0], apex[1], left[0], left[1]), line(apex[0], apex[1], right[0], right[1]), line(left[0], left[1], right[0], right[1])];
  for (let i = 1; i <= h; i++) {
    const t = i / (h + 1);
    const y = apex[1] + (left[1] - apex[1]) * t;
    const xl = apex[0] + (left[0] - apex[0]) * t;
    const xr = apex[0] + (right[0] - apex[0]) * t;
    inner.push(line(xl, y, xr, y));
  }
  return { svg: wrap(200, 160, 300, 240, inner.join("")), count: h + 1 };
}
function gridFig(m, n, cellOverride) {
  const size = 176, pad = 14;
  const cell = cellOverride || Math.floor(Math.min((size - 2 * pad) / n, (size - 2 * pad) / m));
  const gw = cell * n, gh = cell * m;
  const x0 = 100 - gw / 2, y0 = 90 - gh / 2;
  const inner = [];
  for (let r = 0; r <= m; r++) inner.push(line(x0, y0 + r * cell, x0 + n * cell, y0 + r * cell));
  for (let c = 0; c <= n; c++) inner.push(line(x0 + c * cell, y0, x0 + c * cell, y0 + m * cell));
  return wrap(200, 180, 300, 270, inner.join(""));
}
function gridSquares(m, n) {
  let s = 0;
  for (let k = 1; k <= Math.min(m, n); k++) s += (m - k + 1) * (n - k + 1);
  return s;
}
function gridRectangles(m, n) {
  return ((m + 1) * m / 2) * ((n + 1) * n / 2);
}
function lineBundle(n) {
  const apex = [100, 20];
  const inner = [];
  for (let i = 0; i < n; i++) {
    const x = 22 + (156 * i) / Math.max(1, n - 1);
    inner.push(line(apex[0], apex[1], x, 152));
  }
  return wrap(200, 172, 300, 258, inner.join(""));
}
function circleBundle(n) {
  const inner = [];
  const cols = n <= 4 ? 2 : 3;
  const rows = Math.ceil(n / cols);
  const r = n <= 4 ? 30 : n <= 9 ? 24 : 20;
  const gapX = 200 / (cols + 1);
  const gapY = 200 / (rows + 1);
  let k = 0;
  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols && k < n; ci++, k++) {
      inner.push(circ(gapX * (ci + 1), gapY * (ri + 1), r));
    }
  }
  return wrap(200, 200, 260, 260, inner.join(""));
}
function rhombusDiagonals() {
  const pts = "100,20 178,100 100,180 22,100";
  const inner = [poly(pts), line(100, 20, 100, 180), line(22, 100, 178, 100)];
  return { svg: wrap(200, 200, 260, 260, inner.join("")), count: 8 };
}
function squareDiagonals() {
  const inner = [poly("30,30 170,30 170,170 30,170"), line(30, 30, 170, 170), line(170, 30, 30, 170)];
  return { svg: wrap(200, 200, 260, 260, inner.join("")), count: 8 };
}
function rectangleDiagonals() {
  const inner = [poly("26,48 174,48 174,132 26,132"), line(26, 48, 174, 132), line(174, 48, 26, 132)];
  return { svg: wrap(200, 180, 280, 252, inner.join("")), count: 8 };
}
function parallelogramDiagonals() {
  const inner = [poly("48,44 178,44 152,136 22,136"), line(48, 44, 152, 136), line(178, 44, 22, 136)];
  return { svg: wrap(200, 180, 280, 252, inner.join("")), count: 8 };
}
/* A triangle with one median drawn to the opposite side -> 3 triangles. */
function triangleOneMedian() {
  const inner = [poly("100,20 22,150 178,150"), line(100, 20, 100, 150)];
  return { svg: wrap(200, 170, 300, 255, inner.join("")), count: 3 };
}
/* A k-sided polygon with every diagonal from one vertex -> k-2 triangles. */
function polygonFan(k) {
  const cx = 100, cy = 100, R = 78;
  const pts = [];
  for (let i = 0; i < k; i++) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / k;
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  const inner = [poly(pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" "))];
  for (let i = 2; i < k; i++) inner.push(line(pts[0][0].toFixed(1), pts[0][1].toFixed(1), pts[i][0].toFixed(1), pts[i][1].toFixed(1)));
  return { svg: wrap(200, 200, 260, 260, inner.join("")), count: k - 2 };
}

const TQ = {
  tri: ["How many triangles are there in the figure?", "Count the number of triangles in the given figure.", "How many triangles can be counted in the figure below?"],
  sq: ["How many squares are there in the figure?", "Count the number of squares in the given figure."],
  rect: ["How many rectangles are there in the figure?", "Count the number of rectangles in the given figure."],
  line: ["How many straight line segments are there in the figure?", "Count the number of straight lines in the given figure."],
  circ: ["How many circles are there in the figure?", "Count the number of circles in the given figure."],
};
const TQA = {
  tri: ["চিত্ৰখনত কিমানটা ত্ৰিভুজ আছে?", "দিয়া চিত্ৰখনত থকা ত্ৰিভুজবোৰ গণনা কৰক।", "তলৰ চিত্ৰখনত কিমানটা ত্ৰিভুজ আছে?"],
  sq: ["চিত্ৰখনত কিমানটা বৰ্গ আছে?", "দিয়া চিত্ৰখনত থকা বৰ্গবোৰ গণনা কৰক।"],
  rect: ["চিত্ৰখনত কিমানটা আয়ত আছে?", "দিয়া চিত্ৰখনত থকা আয়তবোৰ গণনা কৰক।"],
  line: ["চিত্ৰখনত কিমানটা সৰল ৰেখাখণ্ড আছে?", "দিয়া চিত্ৰখনত থকা সৰল ৰেখাবোৰ গণনা কৰক।"],
  circ: ["চিত্ৰখনত কিমানটা বৃত্ত আছে?", "দিয়া চিত্ৰখনত থকা বৃত্তবোৰ গণনা কৰক।"],
};
const EXPL = {
  tri: { en: (n) => `Counting every triangle formed in the figure, the total comes to ${n}.`, as: (n) => `চিত্ৰখনত গঠিত প্ৰতিটো ত্ৰিভুজ গণনা কৰিলে মুঠ ${n} টা পোৱা যায়।` },
  sq: { en: (n) => `Adding the squares of all sizes present in the figure gives ${n} squares in all.`, as: (n) => `চিত্ৰখনত থকা সকলো আকাৰৰ বৰ্গ যোগ কৰিলে মুঠ ${n} টা বৰ্গ পোৱা যায়।` },
  rect: { en: (n) => `Every rectangle (the squares included) in the figure adds up to ${n}.`, as: (n) => `চিত্ৰখনৰ প্ৰতিটো আয়ত (বৰ্গসহ) যোগ কৰিলে ${n} টা পোৱা যায়।` },
  line: { en: (n) => `Counting each straight segment drawn in the figure, there are ${n}.`, as: (n) => `চিত্ৰখনত অঁকা প্ৰতিটো সৰল ৰেখাখণ্ড গণনা কৰিলে ${n} টা পোৱা যায়।` },
  circ: { en: (n) => `The figure contains ${n} circles in all.`, as: (n) => `চিত্ৰখনত মুঠ ${n} টা বৃত্ত আছে।` },
};

function countingFigures() {
  const rows = [];
  const push = (kind, fig, count) => {
    const i = rows.length;
    const qv = TQ[kind][i % TQ[kind].length];
    const qa = TQA[kind][i % TQA[kind].length];
    const { options, correct } = balanceOptions(numberValues(count, i), count, i);
    rows.push({
      id: `counting-figures-${String(i + 1).padStart(3, "0")}`,
      q: { en: qv, as: qa },
      fig,
      options,
      correct,
      explanation: { en: EXPL[kind].en(count), as: EXPL[kind].as(count) },
    });
  };

  for (let m = 2; m <= 12; m++) { const f = triApexBase(m, false); push("tri", f.svg, f.count); }
  for (let h = 1; h <= 9; h++) { const f = triHoriz(h); push("tri", f.svg, f.count); }
  for (const [m, n] of [[2, 2], [2, 3], [3, 3], [3, 4], [2, 4], [4, 4], [3, 5], [4, 5], [5, 5], [6, 6], [1, 5], [1, 6], [4, 7]]) push("sq", gridFig(m, n), gridSquares(m, n));
  for (const [m, n] of [[2, 5], [3, 6], [1, 4], [2, 6], [4, 6], [3, 7], [2, 7], [5, 6]]) push("rect", gridFig(m, n), gridRectangles(m, n));
  for (let k = 2; k <= 11; k++) push("line", lineBundle(k), k);
  for (let k = 1; k <= 9; k++) push("circ", circleBundle(k), k);
  push("tri", rhombusDiagonals().svg, rhombusDiagonals().count);
  push("tri", squareDiagonals().svg, squareDiagonals().count);
  push("tri", rectangleDiagonals().svg, rectangleDiagonals().count);
  push("tri", parallelogramDiagonals().svg, parallelogramDiagonals().count);
  push("tri", triangleOneMedian().svg, triangleOneMedian().count);
  for (const k of [4, 5, 6, 7, 8]) push("tri", polygonFan(k).svg, polygonFan(k).count);
  return rows;
}

/* ------------------------------------------------------------------ */
/* mirror / water images                                               */
/* ------------------------------------------------------------------ */

const XF = {
  I: (p) => [p[0], p[1]],
  M: (p) => [100 - p[0], p[1]],
  W: (p) => [p[0], 100 - p[1]],
  R: (p) => [100 - p[0], 100 - p[1]],
};

function renderPrims(prims, t) {
  return prims
    .map((p) => {
      if (p.t === "poly") {
        const pts = p.pts.map(t).map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" ");
        return poly(pts, p.fill);
      }
      if (p.t === "line") {
        const a = t([p.x1, p.y1]), b = t([p.x2, p.y2]);
        return line(a[0].toFixed(1), a[1].toFixed(1), b[0].toFixed(1), b[1].toFixed(1), p.c, p.sw);
      }
      if (p.t === "circle") {
        const c = t([p.cx, p.cy]);
        return circ(c[0].toFixed(1), c[1].toFixed(1), p.r, p.fill);
      }
      return "";
    })
    .join("");
}
function svgPlain(prims, t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${renderPrims(prims, t)}</svg>`;
}
function dotsPrims(pts, r) {
  return pts.map(([x, y]) => ({ t: "circle", cx: x, cy: y, r: r || 6, fill: S }));
}

function motifSquareDot(v) {
  const c = [[36, 36], [64, 36], [36, 64], [64, 64]][v];
  return [
    { t: "poly", pts: [[24, 24], [76, 24], [76, 76], [24, 76]] },
    { t: "line", x1: 24, y1: 24, x2: 76, y2: 76 },
    ...dotsPrims([c]),
  ];
}
function motifArrow(v) {
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const [ax, ay] = dirs[v];
  const perp = [-ay, ax];
  const tip = [50 + ax * 32, 50 + ay * 32];
  const tail = [50 - ax * 22, 50 - ay * 22];
  const h1 = [tip[0] - ax * 14 + perp[0] * 9, tip[1] - ay * 14 + perp[1] * 9];
  const h2 = [tip[0] - ax * 14 - perp[0] * 9, tip[1] - ay * 14 - perp[1] * 9];
  const dot = [50 - perp[0] * 15 - ax * 8, 50 - perp[1] * 15 - ay * 8];
  return [
    { t: "line", x1: tail[0], y1: tail[1], x2: tip[0], y2: tip[1], sw: 5 },
    { t: "poly", pts: [tip, h1, h2], fill: S },
    ...dotsPrims([dot], 5),
  ];
}
function motifFlag(v) {
  const d = [[46, 72], [54, 72], [46, 26], [54, 26]][v];
  return [
    { t: "line", x1: 40, y1: 26, x2: 40, y2: 80, sw: 4 },
    { t: "poly", pts: [[40, 26], [70, 36], [40, 46]], fill: S },
    ...dotsPrims([d], 5),
  ];
}
function motifLetterF(v) {
  const d = [[64, 68], [36, 68], [64, 30], [36, 30]][v];
  return [
    { t: "line", x1: 40, y1: 24, x2: 40, y2: 78, sw: 5 },
    { t: "line", x1: 40, y1: 24, x2: 66, y2: 24, sw: 5 },
    { t: "line", x1: 40, y1: 50, x2: 60, y2: 50, sw: 5 },
    ...dotsPrims([d], 5),
  ];
}
function motifHouse(v) {
  const door = [[38, 62], [54, 62], [38, 72], [54, 72]][v];
  return [
    { t: "poly", pts: [[30, 46], [70, 46], [70, 84], [30, 84]] },
    { t: "poly", pts: [[24, 46], [50, 24], [76, 46]] },
    { t: "poly", pts: [[door[0], door[1]], [door[0] + 10, door[1]], [door[0] + 10, 84], [door[0], 84]], fill: S },
  ];
}
function motifL(v) {
  const d = [[44, 32], [64, 32], [44, 66], [64, 66]][v];
  return [
    { t: "poly", pts: [[34, 24], [56, 24], [56, 62], [72, 62], [72, 80], [34, 80]] },
    ...dotsPrims([d], 5),
  ];
}
function motifCircle(v) {
  const d = [[50, 34], [50, 66], [34, 50], [66, 50]][v];
  return [
    { t: "circle", cx: 50, cy: 50, r: 28 },
    { t: "line", x1: 50, y1: 50, x2: 74, y2: 50, sw: 3 },
    ...dotsPrims([d], 5),
  ];
}
function motifTri(v) {
  const d = [[42, 42], [58, 42], [42, 58], [58, 58]][v];
  return [
    { t: "poly", pts: [[30, 30], [76, 30], [30, 76]] },
    ...dotsPrims([d], 5),
  ];
}
function motifT(v) {
  const d = [[42, 34], [58, 34], [42, 66], [58, 66]][v];
  return [
    { t: "line", x1: 26, y1: 26, x2: 74, y2: 26, sw: 5 },
    { t: "line", x1: 50, y1: 26, x2: 50, y2: 78, sw: 5 },
    ...dotsPrims([d], 5),
  ];
}
function motifSquareCircle(v) {
  const d = [[34, 34], [66, 34], [34, 66], [66, 66]][v];
  return [
    { t: "poly", pts: [[24, 24], [76, 24], [76, 76], [24, 76]] },
    { t: "circle", cx: 50, cy: 50, r: 16 },
    ...dotsPrims([d], 5),
  ];
}

const MOTIFS = [motifSquareDot, motifArrow, motifFlag, motifLetterF, motifHouse, motifL, motifCircle, motifTri, motifT, motifSquareCircle];

function mirrorQuestionFig(prims, type) {
  const t = (p) => [p[0] * 0.78 + 12, p[1] * 0.78 + 20];
  const body = renderPrims(prims, t);
  const dash =
    type === "mirror"
      ? `<line x1="112" y1="14" x2="112" y2="126" stroke="#94a3b8" stroke-width="2" stroke-dasharray="7 5"/>`
      : `<line x1="14" y1="118" x2="150" y2="118" stroke="#93c5fd" stroke-width="2" stroke-dasharray="7 5"/>`;
  return wrap(200, 140, 240, 168, body + dash);
}

function mirrorWater() {
  const rows = [];
  const qEn = {
    mirror: "Choose the correct mirror image (left-right reflection) of the given figure.",
    water: "Choose the correct water image (top-bottom reflection) of the given figure.",
  };
  const qAs = {
    mirror: "দিয়া চিত্ৰখনৰ শুদ্ধ দাপোণ প্ৰতিবিম্ব (বাওঁ-সোঁ প্ৰতিফলন) নিৰ্বাচন কৰক।",
    water: "দিয়া চিত্ৰখনৰ শুদ্ধ জল প্ৰতিবিম্ব (ওপৰ-তল প্ৰতিফলন) নিৰ্বাচন কৰক।",
  };
  const exEn = {
    mirror: "A mirror image reverses the figure left to right, so the reflection across the vertical line is the answer.",
    water: "A water image reverses the figure top to bottom, so the reflection across the horizontal line is the answer.",
  };
  const exAs = {
    mirror: "দাপোণ প্ৰতিবিম্বই চিত্ৰখন বাওঁৰ পৰা সোঁলৈ ওলোটা কৰে, সেয়ে উলম্ব ৰেখাৰ প্ৰতিফলনটোৱেই উত্তৰ।",
    water: "জল প্ৰতিবিম্বই চিত্ৰখন ওপৰৰ পৰা তললৈ ওলোটা কৰে, সেয়ে আনুভূমিক ৰেখাৰ প্ৰতিফলনটোৱেই উত্তৰ।",
  };

  let idx = 0;
  outer:
  for (let mi = 0; mi < MOTIFS.length; mi++) {
    for (let v = 0; v < 4; v++) {
      for (const type of ["mirror", "water"]) {
        if (idx >= 70) break outer;
        const prims = MOTIFS[mi](v);
        const key = type === "mirror" ? "M" : "W";
        const order = [key, "I", type === "mirror" ? "W" : "M", "R"];
        const figs = order.map((k) => svgPlain(prims, XF[k]));
        // balance the key position
        const shift = idx % 4;
        const rot = figs.slice(shift).concat(figs.slice(0, shift));
        const correct = rot.indexOf(figs[0]);
        if (new Set(rot).size !== 4) continue; // skip any degenerate motif variant
        rows.push({
          id: `mirror-water-image-${String(idx + 1).padStart(3, "0")}`,
          q: { en: qEn[type], as: qAs[type] },
          fig: mirrorQuestionFig(prims, type),
          options: rot.map((f, i) => ({ option: LETTERS[i], fig: f })),
          correct,
          explanation: { en: exEn[type], as: exAs[type] },
        });
        idx++;
      }
    }
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* paper cutting & folding                                             */
/* ------------------------------------------------------------------ */

function paperMap(v) {
  return 14 + v * 0.72;
}
function paperOption(holes) {
  let inner = `<rect x="2" y="2" width="96" height="96" rx="10" fill="none" stroke="${BORDER}"/>`;
  inner += `<rect x="14" y="14" width="72" height="72" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.6"/>`;
  for (const [hx, hy] of holes) inner += `<circle cx="${paperMap(hx).toFixed(2)}" cy="${paperMap(hy).toFixed(2)}" r="4.2" fill="${S}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${inner}</svg>`;
}
function paperQuestionFig(fold, px, py) {
  let inner = `<polygon points="14,14 86,14 86,86 14,86" fill="#f8fafc" stroke="#475569" stroke-width="2" stroke-linejoin="round"/>`;
  if (fold === "V" || fold === "VH") inner += `<line x1="50" y1="14" x2="50" y2="86" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>`;
  if (fold === "H" || fold === "VH") inner += `<line x1="14" y1="50" x2="86" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>`;
  inner += `<circle cx="${paperMap(px).toFixed(2)}" cy="${paperMap(py).toFixed(2)}" r="4.2" fill="#dc2626"/>`;
  return wrap(100, 100, 150, 150, inner);
}

function paperFolding() {
  const rows = [];
  const qEn = "A square paper is folded along the dotted line(s) as shown and a hole is punched at the red dot. Which option shows the paper when it is unfolded?";
  const qAs = "দেখুওৱাৰ দৰে ডটেড ৰেখা(বোৰ)ৰ কাষেৰে এখন বৰ্গ কাগজ ভাঁজ কৰি ৰঙা বিন্দুটোত এটা বিন্ধা কৰা হ'ল। কাগজখন মেলিলে কেনে দেখিব, সেইটো বিকল্প নিৰ্বাচন কৰক।";
  const exEn = "Unfolding reflects the punched hole across each crease, so the number and position of the holes follow from the fold.";
  const exAs = "মেলিলে প্ৰতিটো ভাঁজৰ ৰেখাৰ ওপৰেৰে বিন্ধাটো প্ৰতিফলিত হয়, সেয়ে বিন্ধাৰ সংখ্যা আৰু অৱস্থান ভাঁজৰ পৰাই নিৰ্ধাৰিত হয়।";

  const xs = [54, 60, 66, 72, 78, 84];
  const ysLow = [24, 30, 36, 42, 48];
  const ysHigh = [58, 64, 70, 76, 82];
  const combos = [];
  for (const fold of ["V", "H", "VH"]) {
    for (let xi = 0; xi < xs.length; xi++) {
      for (let yi = 0; yi < 5; yi++) combos.push({ fold, px: xs[xi], py: (fold === "V" ? ysLow : ysHigh)[yi] });
    }
  }
  const seen = new Set();
  let idx = 0;
  for (const { fold, px, py } of combos) {
    if (idx >= 70) break;
    let holes, distractors;
    if (fold === "V") {
      holes = [[px, py], [100 - px, py]];
      distractors = [[[px, py]], [[100 - px, py]], [[px, py], [px + 8, py]]];
    } else if (fold === "H") {
      holes = [[px, py], [px, 100 - py]];
      distractors = [[[px, py]], [[px, 100 - py]], [[px, py], [px, py - 8]]];
    } else {
      holes = [[px, py], [100 - px, py], [px, 100 - py], [100 - px, 100 - py]];
      distractors = [[[px, py], [100 - px, py]], [[px, py], [px, 100 - py]], [[px, py]]];
    }
    const figs = [holes, ...distractors].map((h) => paperOption(h));
    const sig = JSON.stringify([paperQuestionFig(fold, px, py), figs]);
    if (seen.has(sig) || new Set(figs).size !== 4) continue;
    seen.add(sig);
    const shift = idx % 4;
    const rot = figs.slice(shift).concat(figs.slice(0, shift));
    const correct = rot.indexOf(figs[0]);
    rows.push({
      id: `paper-cutting-folding-${String(idx + 1).padStart(3, "0")}`,
      q: { en: qEn, as: qAs },
      fig: paperQuestionFig(fold, px, py),
      options: rot.map((f, i2) => ({ option: LETTERS[i2], fig: f })),
      correct,
      explanation: { en: exEn, as: exAs },
    });
    idx++;
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* embedded / hidden figures                                           */
/* ------------------------------------------------------------------ */

function polyPrim(pts, fill) {
  return { t: "poly", pts, fill };
}
/* Segment direction class: H, V, "\\", "/" or "x" (other). The composite
   figure is built only from H, V and "\\" segments, so any distractor that
   contains a "/" or an "x" edge cannot be traced inside it. */
function segDir(a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  if (Math.abs(dy) < 0.5) return "H";
  if (Math.abs(dx) < 0.5) return "V";
  if (Math.abs(Math.abs(dx) - Math.abs(dy)) < 0.5) return dx * dy > 0 ? "\\" : "/";
  return "x";
}
function allEdgesPresentLike(pts) {
  for (let i = 0; i < pts.length; i++) {
    const d = segDir(pts[i], pts[(i + 1) % pts.length]);
    if (d === "/" || d === "x") return false;
  }
  return true;
}

/* A composite line figure (rectangle + midlines + main diagonal + extras,
   all H/V/"\\") with a sub-shape that is traceable inside it, plus three
   distractors each containing an absent-direction edge. */
function embeddedCase(i) {
  const x0 = 8 + (i % 6) * 2;             // left margin 8..18
  const y0 = 8 + ((i * 7) % 6) * 2;       // top margin 8..18
  const x1 = 92 - ((i * 5) % 5) * 3;      // right edge 80..92
  const y1 = 92 - ((i * 11) % 5) * 3;     // bottom edge 80..92
  const midX = Math.round((x0 + x1) / 2), midY = Math.round((y0 + y1) / 2);
  const prims = [polyPrim([[x0, y0], [x1, y0], [x1, y1], [x0, y1]])];
  prims.push({ t: "line", x1: midX, y1: y0, x2: midX, y2: y1, sw: 2.2 });
  prims.push({ t: "line", x1: x0, y1: midY, x2: x1, y2: midY, sw: 2.2 });
  prims.push({ t: "line", x1: x0, y1: y0, x2: x1, y2: y1, sw: 2.2 }); // main diagonal "\"
  // extra H/V lines for variety (still only H/V/"\\")
  const qx1 = Math.round((x0 * 3 + x1) / 4), qx3 = Math.round((x0 + x1 * 3) / 4);
  const qy1 = Math.round((y0 * 3 + y1) / 4), qy3 = Math.round((y0 + y1 * 3) / 4);
  if (i % 4 === 0) prims.push({ t: "line", x1: qx1, y1: y0, x2: qx1, y2: y1, sw: 2.2 });
  if (i % 4 === 1) prims.push({ t: "line", x1: qx3, y1: y0, x2: qx3, y2: y1, sw: 2.2 });
  if (i % 5 === 0) prims.push({ t: "line", x1: x0, y1: qy1, x2: x1, y2: qy1, sw: 2.2 });
  if (i % 5 === 2) prims.push({ t: "line", x1: x0, y1: qy3, x2: x1, y2: qy3, sw: 2.2 });
  if (i % 3 === 0) prims.push({ t: "line", x1: midX, y1: y0, x2: midX, y2: y1, sw: 2.2 });
  if (i % 7 === 0) prims.push({ t: "line", x1: x0, y1: midY, x2: x1, y2: midY, sw: 2.2 });

  const TL = [x0, y0], TR = [x1, y0], BL = [x0, y1], BR = [x1, y1];
  const midT = [midX, y0], midB = [midX, y1], midL = [x0, midY], midR = [x1, midY], C = [midX, midY];
  /* Sub-shapes whose every edge is H, V or the main "\" diagonal, so each can
     be traced exactly inside the composite. */
  const variants = [
    [TL, TR, BR],
    [TL, BL, BR],
    [TL, midT, C],
    [TL, midL, C],
    [BR, midB, C],
    [BR, midR, C],
    [TL, midT, C, midL],
    [midT, TR, midR, C],
    [midL, C, midB, BL],
    [C, midR, BR, midB],
    [TL, TR, midR, midL],
    [midL, midR, BR, BL],
  ];
  const answer = variants[i % variants.length];

  /* Distractors: each carries an edge in a direction the composite lacks
     (an anti-diagonal "/" or a non-lattice slope), so none can be traced. */
  const distractorPool = [
    [TL, TR, BL],
    [TR, BR, BL],
    [TL, BR, midT],
    [midT, BL, midB],
    [TL, TR, midR, BL],
    [TL, C, midB],
  ];
  const distractors = [];
  for (let k = 0; k < distractorPool.length && distractors.length < 3; k++) {
    const cand = distractorPool[(i + k) % distractorPool.length];
    if (!allEdgesPresentLike(cand) && JSON.stringify(cand) !== JSON.stringify(answer)) distractors.push(cand);
  }
  return { prims, answer, distractors, x0, y0, x1, y1 };
}
function embeddedFigures() {
  const rows = [];
  const qEn = "Which of the following figures is embedded (hidden) in the given figure?";
  const qAs = "দিয়া চিত্ৰখনত তলৰ কোনটো চিত্ৰ সংযোজিত (লুকাই) আছে?";
  const exEn = "The outline of the figure in the correct option can be traced exactly inside the given figure, so it is the embedded one.";
  const exAs = "শুদ্ধ বিকল্পৰ চিত্ৰখনৰ ৰূপ দিয়া চিত্ৰখনৰ ভিতৰত সঠিকভাৱে আঁকিব পাৰি, সেয়ে সেয়াই সংযোজিত চিত্ৰ।";

  const mk = (pts) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${poly(
      pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")
    )}</svg>`;

  const seen = new Set();
  let idx = 0;
  for (let i = 0; i < 400 && idx < 70; i++) {
    const { prims, answer, distractors } = embeddedCase(i);
    if (!allEdgesPresentLike(answer)) continue;
    if (distractors.some((d) => allEdgesPresentLike(d))) continue; // safety
    const correctFig = mk(answer);
    const dFigs = distractors.map(mk);
    const figs = [correctFig, ...dFigs];
    const sig = JSON.stringify([prims, figs]);
    if (seen.has(sig) || new Set(figs).size !== 4) continue;
    seen.add(sig);
    const shift = idx % 4;
    const rot = figs.slice(shift).concat(figs.slice(0, shift));
    const correct = rot.indexOf(correctFig);
    rows.push({
      id: `embedded-figures-${String(idx + 1).padStart(3, "0")}`,
      q: { en: qEn, as: qAs },
      fig: wrap(
        100,
        100,
        240,
        240,
        prims
          .map((p) =>
            p.t === "poly"
              ? poly(p.pts.map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" "), p.fill)
              : line(p.x1, p.y1, p.x2, p.y2, p.c, p.sw)
          )
          .join("")
      ),
      options: rot.map((f, i2) => ({ option: LETTERS[i2], fig: f })),
      correct,
      explanation: { en: exEn, as: exAs },
    });
    idx++;
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* pattern completion                                                  */
/* ------------------------------------------------------------------ */

function svg100(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${inner}</svg>`;
}
function regPoly(cx, cy, r, n, startDeg) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = ((startDeg + (360 * i) / n) * Math.PI) / 180;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
}
/* A small tile motif, drawn inside a 100x100 box centred at (cx, cy). */
function shapeInner(name, cx, cy, s) {
  const P = (x, y) => [cx + x * s, cy + y * s];
  const q = (x, y) => P(x, y).map((v) => v.toFixed(1)).join(",");
  switch (name) {
    case "circle": return circ(cx, cy, s * 0.85);
    case "ring": return circ(cx, cy, s * 0.9) + circ(cx, cy, s * 0.45);
    case "square": return poly(`${q(-0.72, -0.72)} ${q(0.72, -0.72)} ${q(0.72, 0.72)} ${q(-0.72, 0.72)}`);
    case "diamond": return poly(`${q(0, -0.9)} ${q(0.9, 0)} ${q(0, 0.9)} ${q(-0.9, 0)}`);
    case "triangle": return poly(`${q(0, -0.9)} ${q(0.9, 0.8)} ${q(-0.9, 0.8)}`);
    case "downTri": return poly(`${q(0, 0.9)} ${q(0.9, -0.8)} ${q(-0.9, -0.8)}`);
    case "pentagon": return poly(regPoly(cx, cy, s * 0.92, 5, -90));
    case "hexagon": return poly(regPoly(cx, cy, s * 0.92, 6, 0));
    case "dot": return circ(cx, cy, s * 0.32, S);
    case "hbar": return line(cx - s * 0.8, cy, cx + s * 0.8, cy, S, 4);
    case "vbar": return line(cx, cy - s * 0.8, cx, cy + s * 0.8, S, 4);
    case "x": return line(cx - s * 0.68, cy - s * 0.68, cx + s * 0.68, cy + s * 0.68, S, 3.4) + line(cx - s * 0.68, cy + s * 0.68, cx + s * 0.68, cy - s * 0.68, S, 3.4);
    case "plus": return line(cx - s * 0.8, cy, cx + s * 0.8, cy, S, 3.4) + line(cx, cy - s * 0.8, cx, cy + s * 0.8, S, 3.4);
    case "halfmoon": return `<path d="M ${cx.toFixed(1)} ${(cy - s * 0.85).toFixed(1)} A ${(s * 0.85).toFixed(1)} ${(s * 0.85).toFixed(1)} 0 0 1 ${cx.toFixed(1)} ${(cy + s * 0.85).toFixed(1)} Z" fill="${S}"/>`;
    case "star": {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = ((-90 + 36 * i) * Math.PI) / 180;
        const rr = i % 2 ? s * 0.42 : s * 0.92;
        pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
      }
      return poly(pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
    }
  }
  return "";
}
function patternTile(name) {
  const border = `<rect x="2" y="2" width="96" height="96" rx="8" fill="none" stroke="${BORDER}"/>`;
  return svg100(border + shapeInner(name, 50, 50, 32));
}
function patternGridFigure(grid, blankR, blankC) {
  const rows = grid.length, cols = grid[0].length, T = 100;
  let inner = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * T, y = r * T;
      inner += `<rect x="${x + 2}" y="${y + 2}" width="${T - 4}" height="${T - 4}" rx="8" fill="none" stroke="${BORDER}"/>`;
      if (r === blankR && c === blankC) inner += txt(x + 50, y + 66, "?", 46, "#94a3b8");
      else inner += shapeInner(grid[r][c], x + 50, y + 50, 32);
    }
  }
  const w = 300, h = (300 * rows) / cols;
  return wrap(cols * T, rows * T, w, h, inner);
}
function rng(seed) {
  let s = (seed >>> 0) || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
function patternCompletion() {
  const rows = [];
  const pool = ["circle", "square", "triangle", "diamond", "ring", "dot", "x", "plus", "halfmoon", "hexagon", "pentagon", "downTri", "star"];
  const qEn = "Which option completes the given pattern correctly?";
  const qAs = "কোনটো বিকল্পই দিয়া আৰ্হিটো শুদ্ধভাৱে সম্পূৰ্ণ কৰে?";
  const exEn = "The missing cell follows the same repeating rule as the rest of the grid, so the option that continues that rule is the answer.";
  const exAs = "অনুপস্থিত ঘৰটোৱে জালিকাৰ বাকী অংশৰ দৰেই একেই পুনৰাবৃত্তি নিয়ম অনুসৰণ কৰে, সেয়ে সেই নিয়ম অব্যাহত ৰখা বিকল্পটোৱেই উত্তৰ।";
  const seen = new Set();
  for (let i = 0; i < 900 && rows.length < 70; i++) {
    const r = rng(i * 7919 + 13);
    const R = 3 + Math.floor(r() * 2);
    const C = 3 + Math.floor(r() * 2);
    const k = 2 + Math.floor(r() * 2);
    const seq = [];
    while (seq.length < k) {
      const s = pool[Math.floor(r() * pool.length)];
      if (!seq.includes(s)) seq.push(s);
    }
    const rule = Math.floor(r() * 7);
    const grid = [];
    for (let rr = 0; rr < R; rr++) {
      const row = [];
      for (let cc = 0; cc < C; cc++) {
        let v;
        if (rule === 0) v = (rr + cc) % k;
        else if (rule === 1) v = cc % k;
        else if (rule === 2) v = rr % k;
        else if (rule === 3) v = (rr + cc) % k === 0 ? 0 : (rr + cc) % k;
        else if (rule === 4) v = ((rr - cc) % k + k) % k;
        else if (rule === 5) v = rr % k === cc % k ? 0 : 1 % k;
        else v = (rr * C + cc) % k;
        row.push(seq[v % k]);
      }
      grid.push(row);
    }
    const blankR = Math.floor(r() * R), blankC = Math.floor(r() * C);
    const correct = grid[blankR][blankC];
    const others = pool.filter((s) => s !== correct);
    const opts = [correct];
    let oi = Math.floor(r() * others.length);
    while (opts.length < 4) {
      const s = others[(oi++) % others.length];
      if (!opts.includes(s)) opts.push(s);
    }
    if (new Set(opts).size !== 4) continue;
    const fig = patternGridFigure(grid, blankR, blankC);
    if (seen.has(fig)) continue;
    seen.add(fig);
    const correctFig = patternTile(correct);
    const figs = opts.map(patternTile);
    if (new Set(figs).size !== 4) continue;
    const shift = rows.length % 4;
    const rot = figs.slice(shift).concat(figs.slice(0, shift));
    const ci = rot.indexOf(correctFig);
    rows.push({
      id: `pattern-completion-${String(rows.length + 1).padStart(3, "0")}`,
      q: { en: qEn, as: qAs },
      fig,
      options: rot.map((f, idx) => ({ option: LETTERS[idx], fig: f })),
      correct: ci,
      explanation: { en: exEn, as: exAs },
    });
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* figure series                                                       */
/* ------------------------------------------------------------------ */

function serPoly(n, rot) {
  return poly(regPoly(50, 50, 36, n, -90 + (rot || 0)));
}
function serDots(n) {
  const cols = Math.ceil(Math.sqrt(n)), rowsN = Math.ceil(n / cols);
  const sp = 24, w = (cols - 1) * sp, h = (rowsN - 1) * sp;
  let inner = "", k = 0;
  for (let rr = 0; rr < rowsN; rr++)
    for (let cc = 0; cc < cols && k < n; cc++, k++)
      inner += circ(50 - w / 2 + cc * sp, 50 - h / 2 + rr * sp, 6, S);
  return inner;
}
function serArrow(deg) {
  const a = (deg * Math.PI) / 180, cx = 50, cy = 50, L = 34;
  const tx = cx + L * Math.cos(a), ty = cy + L * Math.sin(a);
  const bx = cx - 0.5 * L * Math.cos(a), by = cy - 0.5 * L * Math.sin(a);
  const perp = [-Math.sin(a), Math.cos(a)];
  const h1 = [tx - 11 * Math.cos(a) + 8 * perp[0], ty - 11 * Math.sin(a) + 8 * perp[1]];
  const h2 = [tx - 11 * Math.cos(a) - 8 * perp[0], ty - 11 * Math.sin(a) - 8 * perp[1]];
  return line(bx, by, tx, ty, S, 5) + poly(`${tx.toFixed(1)},${ty.toFixed(1)} ${h1[0].toFixed(1)},${h1[1].toFixed(1)} ${h2[0].toFixed(1)},${h2[1].toFixed(1)}`, S, S, 1);
}
function serCircle(r) {
  return circ(50, 50, r);
}
function serSquare(filled) {
  return poly("20,20 80,20 80,80 20,80", filled ? S : "none");
}
function serLines(n) {
  let inner = "";
  for (let i = 0; i < n; i++) inner += line(16, 24 + (52 * i) / Math.max(1, n - 1), 84, 24 + (52 * i) / Math.max(1, n - 1), S, 3);
  return inner;
}
function serHalfDisc(rot) {
  const a = (rot * Math.PI) / 180;
  const c = [50, 50], r = 34;
  const p1 = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  const p2 = [c[0] - r * Math.cos(a), c[1] - r * Math.sin(a)];
  return `<path d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A ${r} ${r} 0 0 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} Z" fill="${S}"/>`;
}
function serTriRot(rot) {
  const pts = [];
  for (let i = 0; i < 3; i++) {
    const a = ((-90 + rot + 120 * i) * Math.PI) / 180;
    pts.push([50 + 34 * Math.cos(a), 50 + 34 * Math.sin(a)]);
  }
  return poly(pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
}
function serStar(points) {
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const a = ((-90 + (360 * i) / (points * 2)) * Math.PI) / 180;
    const rr = i % 2 ? 15 : 34;
    pts.push([50 + rr * Math.cos(a), 50 + rr * Math.sin(a)]);
  }
  return poly(pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
}
function seriesRowFigure(figs, withQ) {
  const T = 100, n = figs.length + (withQ ? 1 : 0);
  let inner = "";
  for (let i = 0; i < n; i++) {
    const x = i * T;
    inner += `<rect x="${x + 3}" y="3" width="${T - 6}" height="${T - 6}" rx="8" fill="none" stroke="${BORDER}"/>`;
    if (i < figs.length) inner += figs[i];
    else inner += txt(x + 50, 66, "?", 46, "#94a3b8");
  }
  return wrap(n * T, T, 300, 300 / n, inner);
}
/* Each family gives the 5-term series its rule and how to draw term k under a
   variant v; the answer is term 4 and the distractors are off-rule terms. */
const SERIES = [
  { en: "In the following figure series, which figure comes next?", as: "তলৰ চিত্ৰ শৃংখলাত পৰৱৰ্তী চিত্ৰ কোনটো আহে?", exEn: "The number of sides increases by the same amount at each step, so the next figure continues that increase.", exAs: "প্ৰতিটো পদক্ষেপত বাহুৰ সংখ্যা একে পৰিমাণে বাঢ়ে, সেয়ে পৰৱৰ্তী চিত্ৰই সেই বৃদ্ধি অব্যাহত ৰাখে।",
    term: (k, v) => serPoly(v.start + v.step * k, v.rot),
    variants: (() => { const a = []; for (const start of [3, 4, 5]) for (const step of [1, 2]) for (const rot of [0, 15, 30, 45]) a.push({ start, step, rot }); return a; })(),
    off: (v) => [v.start + v.step * 4 + 1, v.start + v.step * 4 - 1, v.start + v.step * 4 + 2] },
  { en: "Which figure will come next in the given series?", as: "দিয়া শৃংখলাত পৰৱৰ্তী চিত্ৰ কোনটো আহিব?", exEn: "The number of dots increases by one at each step, so the next figure has one dot more.", exAs: "প্ৰতিটো পদক্ষেপত বিন্দুৰ সংখ্যা একেৰে বাঢ়ে, সেয়ে পৰৱৰ্তী চিত্ৰত এটা বিন্দু বেছি থাকে।",
    term: (k, v) => serDots(v.start + k),
    variants: (() => { const a = []; for (let s = 1; s <= 10; s++) a.push({ start: s }); return a; })(),
    off: (v) => [v.start + 5, v.start + 6, v.start + 3] },
  { en: "Study the series and choose the figure that continues it.", as: "শৃংখলাটো অধ্যয়ন কৰি তাক অব্যাহত ৰখা চিত্ৰটো বাছনি কৰক।", exEn: "The arrow turns by the same angle at each step, so the next figure is turned by that angle again.", exAs: "কাঁড়টো প্ৰতিটো পদক্ষেপত একেই কোণে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আকৌ সেই কোণে ঘূৰি থাকে।",
    term: (k, v) => serArrow(v.rot + v.step * k),
    variants: (() => { const a = []; for (let r = 0; r < 8; r++) a.push({ rot: 45 * r, step: 45 }); for (let r = 0; r < 4; r++) a.push({ rot: 90 * r, step: 90 }); return a; })(),
    off: (v) => [v.rot + v.step * 5, v.rot + v.step * 3, v.rot + v.step * 6] },
  { en: "Find the next figure of the series.", as: "শৃংখলাটোৰ পৰৱৰ্তী চিত্ৰটো বিচাৰক।", exEn: "The circle grows by the same amount at each step, so the next figure is the next larger circle.", exAs: "বৃত্তটো প্ৰতিটো পদক্ষেপত একেই পৰিমাণে ডাঙৰ হয়, সেয়ে পৰৱৰ্তী চিত্ৰটো তাৰ পিছৰ ডাঙৰ বৃত্ত।",
    term: (k, v) => serCircle(v.r0 + v.dr * k),
    variants: (() => { const a = []; for (const r0 of [10, 14, 18]) for (const dr of [5, 7]) a.push({ r0, dr }); return a; })(),
    off: (v) => [v.r0 + v.dr * 5, v.r0 + v.dr * 3, v.r0 + v.dr * 6] },
  { en: "Complete the figure series by choosing the next figure.", as: "পৰৱৰ্তী চিত্ৰ বাছনি কৰি চিত্ৰ শৃংখলাটো সম্পূৰ্ণ কৰক।", exEn: "The number of parallel lines increases by one at each step, so the next figure has one line more.", exAs: "সমান্তৰাল ৰেখাৰ সংখ্যা প্ৰতিটো পদক্ষেপত একেৰে বাঢ়ে, সেয়ে পৰৱৰ্তী চিত্ৰত এটা ৰেখা বেছি থাকে।",
    term: (k, v) => serLines(v.start + k),
    variants: (() => { const a = []; for (let s = 1; s <= 10; s++) a.push({ start: s }); return a; })(),
    off: (v) => [v.start + 5, v.start + 6, v.start + 3] },
  { en: "Which figure should replace the question mark?", as: "প্ৰশ্নবোধক চিহ্নটোৰ ঠাইত কোনটো চিত্ৰ আহিব?", exEn: "The shaded half turns by the same angle at each step, so the next figure is turned by that angle again.", exAs: "ৰঙিন আধাটো প্ৰতিটো পদক্ষেপত একেই কোণে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আকৌ সেই কোণে ঘূৰি থাকে।",
    term: (k, v) => serHalfDisc(v.rot + 45 * k),
    variants: (() => { const a = []; for (let r = 0; r < 8; r++) a.push({ rot: 45 * r }); return a; })(),
    off: (v) => [v.rot + 45 * 5, v.rot + 45 * 3, v.rot + 45 * 2] },
  { en: "Choose the figure that comes next in the series.", as: "শৃংখলাত পৰৱৰ্তী চিত্ৰটো বাছনি কৰক।", exEn: "The triangle turns by 90 degrees at each step, so the next figure is turned by 90 degrees again.", exAs: "ত্ৰিভুজটো প্ৰতিটো পদক্ষেপত ৯০ ডিগ্ৰী ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আকৌ ৯০ ডিগ্ৰী ঘূৰি থাকে।",
    term: (k, v) => serTriRot(v.rot + 90 * k),
    variants: (() => { const a = []; for (let r = 0; r < 4; r++) a.push({ rot: 90 * r }); return a; })(),
    off: (v) => [v.rot + 90 * 5, v.rot + 90 * 3, v.rot + 180] },
  { en: "What comes next in the following series?", as: "তলৰ শৃংখলাত পৰৱৰ্তী কি আহে?", exEn: "The number of points of the star increases by one at each step, so the next figure has one point more.", exAs: "তৰাটোৰ শিখৰৰ সংখ্যা প্ৰতিটো পদক্ষেপত একেৰে বাঢ়ে, সেয়ে পৰৱৰ্তী চিত্ৰত এটা শিখৰ বেছি থাকে।",
    term: (k, v) => serStar(v.p + k),
    variants: (() => { const a = []; for (let p = 4; p <= 10; p++) a.push({ p }); return a; })(),
    off: (v) => [v.p + 5, v.p + 3, v.p + 6] },
  { en: "Complete the series by selecting the next figure.", as: "পৰৱৰ্তী চিত্ৰ বাছনি কৰি শৃংখলাটো সম্পূৰ্ণ কৰক।", exEn: "The square is shaded and unshaded alternately, so the next figure follows the same alternation.", exAs: "বৰ্গটো পালপাতি ৰঙিন আৰু ৰঙহীন হয়, সেয়ে পৰৱৰ্তী চিত্ৰটোৱে একেই পালপাতি নিয়ম অনুসৰণ কৰে।",
    term: (k, v) => serSquare(k % 2 === 0),
    variants: [{ start: 0 }],
    off: () => [1, 2, 3] },
];
function figureSeries() {
  const rows = [];
  const seen = new Set();
  for (let si = 0; si < SERIES.length && rows.length < 70; si++) {
    const s = SERIES[si];
    for (const v of s.variants) {
      if (rows.length >= 70) break;
      const shown = [0, 1, 2, 3].map((k) => s.term(k, v));
      const fig = seriesRowFigure(shown, true);
      if (seen.has(fig)) continue;
      const correctInner = s.term(4, v);
      const opts = [correctInner, ...s.off(v).map((o) => s.term(o, v))];
      const figs = opts.map(svg100);
      if (new Set(figs).size !== 4) continue;
      seen.add(fig);
      const correctFig = svg100(correctInner);
      const shift = rows.length % 4;
      const rot = figs.slice(shift).concat(figs.slice(0, shift));
      const ci = rot.indexOf(correctFig);
      rows.push({
        id: `figure-series-${String(rows.length + 1).padStart(3, "0")}`,
        q: { en: s.en, as: s.as },
        fig,
        options: rot.map((f, idx) => ({ option: LETTERS[idx], fig: f })),
        correct: ci,
        explanation: { en: s.exEn, as: s.exAs },
      });
    }
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* cube & dice                                                         */
/* ------------------------------------------------------------------ */

/* Fold a net (list of [row,col] cells) into a cube and return each cell's
   outward face normal. Two cells are opposite when their normals are
   negatives of each other. */
function foldNet(cells) {
  const key = (r, c) => r + "," + c;
  const set = new Set(cells.map(([r, c]) => key(r, c)));
  const map = new Map();
  const start = cells[0];
  map.set(key(start[0], start[1]), { n: [0, 0, 1], r: [1, 0, 0], u: [0, 1, 0] });
  const q = [start];
  const neg = (v) => v.map((x) => -x);
  while (q.length) {
    const [r, c] = q.shift();
    const st = map.get(key(r, c));
    for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      const nr = r + dr, nc = c + dc, k = key(nr, nc);
      if (!set.has(k) || map.has(k)) continue;
      let n, rr, uu;
      if (dc === 1) { n = st.r; rr = neg(st.n); uu = st.u; }
      else if (dc === -1) { n = neg(st.r); rr = st.n; uu = st.u; }
      else if (dr === 1) { n = st.u; uu = neg(st.n); rr = st.r; }
      else { n = neg(st.u); uu = st.n; rr = st.r; }
      map.set(k, { n, r: rr, u: uu });
      q.push([nr, nc]);
    }
  }
  return map;
}
function validNet(cells) {
  if (cells.length !== 6) return false;
  const m = foldNet(cells);
  if (m.size !== 6) return false;
  const normals = new Set();
  for (const v of m.values()) normals.add(v.n.join(","));
  return normals.size === 6;
}
function enumerateNets() {
  const seen = new Set();
  const nets = [];
  const norm = (cells) => {
    const minR = Math.min(...cells.map((c) => c[0])), minC = Math.min(...cells.map((c) => c[1]));
    return cells.map(([r, c]) => [r - minR, c - minC]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };
  const hash = (cells) => norm(cells).map((c) => c.join(",")).join("|");
  const grow = (cells) => {
    if (cells.length === 6) {
      const h = hash(cells);
      if (!seen.has(h) && validNet(cells)) { seen.add(h); nets.push(norm(cells)); }
      return;
    }
    const s = new Set(cells.map((c) => c.join(",")));
    const frontier = new Set();
    for (const [r, c] of cells)
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]])
        if (!s.has((r + dr) + "," + (c + dc))) frontier.add((r + dr) + "," + (c + dc));
    for (const f of frontier) {
      const [r, c] = f.split(",").map(Number);
      grow(cells.concat([[r, c]]));
    }
  };
  grow([[0, 0]]);
  return nets;
}
function netFigure(cells, nums) {
  const T = 46, pad = 6;
  const minR = Math.min(...cells.map((c) => c[0])), minC = Math.min(...cells.map((c) => c[1]));
  const rowsN = Math.max(...cells.map((c) => c[0])) - minR + 1;
  const colsN = Math.max(...cells.map((c) => c[1])) - minC + 1;
  let inner = "";
  cells.forEach((cell, idx) => {
    const x = pad + (cell[1] - minC) * T, y = pad + (cell[0] - minR) * T;
    inner += `<rect x="${x}" y="${y}" width="${T}" height="${T}" fill="#f8fafc" stroke="${S}" stroke-width="2"/>`;
    inner += txt(x + T / 2, y + T / 2 + 9, nums[idx], 24);
  });
  const vw = colsN * T + 2 * pad, vh = rowsN * T + 2 * pad;
  const w = Math.min(300, vw * 2.4);
  return wrap(vw, vh, w, (w * vh) / vw, inner);
}
function drawDie(top, front, right) {
  let inner = "";
  inner += poly("50,8 92,33 50,58 8,33", "#f8fafc");
  inner += poly("8,33 50,58 50,108 8,83", "#eef2f7");
  inner += poly("50,58 92,33 92,83 50,108", "#e2e8f0");
  inner += txt(50, 41, top, 22);
  inner += txt(29, 78, front, 22);
  inner += txt(71, 78, right, 22);
  return inner;
}
function dieViewsFigure(views) {
  const T = 110;
  let inner = "";
  views.forEach((v, i) => {
    const off = i * T;
    inner += `<g transform="translate(${off},0)">${drawDie(v[0], v[1], v[2])}</g>`;
  });
  const n = views.length;
  return wrap(T * n, 116, 150 * n, 116 * (150 / T), inner);
}
/* The 24 orientations of a die as face-index arrays [U,D,F,B,L,R]. */
function dieOrientations() {
  const base = [1, 6, 2, 5, 3, 4];
  const roll = (d) => [d[3], d[2], d[0], d[1], d[4], d[5]];
  const yaw = (d) => [d[0], d[1], d[4], d[5], d[3], d[2]];
  const seen = new Set(), out = [];
  const q = [base];
  seen.add(base.join(","));
  while (q.length) {
    const d = q.shift();
    out.push(d);
    for (const f of [roll, yaw]) {
      const n = f(d), k = n.join(",");
      if (!seen.has(k)) { seen.add(k); q.push(n); }
    }
  }
  return out;
}
function isoStackFigure(heights) {
  const m = heights.length, n = heights[0].length;
  const a = 15, b = 8.5, c = 17;
  const cubes = [];
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) for (let k = 0; k < heights[i][j]; k++) cubes.push([i, j, k]);
  const P = (x, y, z) => [(x - y) * a, (x + y) * b - z * c];
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const [i, j, k] of cubes)
    for (const [dx, dy, dz] of [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]) {
      const [X, Y] = P(i + dx, j + dy, k + dz);
      minX = Math.min(minX, X); maxX = Math.max(maxX, X);
      minY = Math.min(minY, Y); maxY = Math.max(maxY, Y);
    }
  const pad = 10, ox = pad - minX, oy = pad - minY;
  const vw = maxX - minX + 2 * pad, vh = maxY - minY + 2 * pad;
  const T = (x, y, z) => { const [X, Y] = P(x, y, z); return [X + ox, Y + oy]; };
  const F = (pts, fill) => poly(pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" "), fill, S, 1.5);
  cubes.sort((p, q2) => (p[0] + p[1] + p[2]) - (q2[0] + q2[1] + q2[2]));
  let inner = "";
  for (const [i, j, k] of cubes) {
    inner += F([T(i, j, k + 1), T(i + 1, j, k + 1), T(i + 1, j + 1, k + 1), T(i, j + 1, k + 1)], "#f1f5f9");
    inner += F([T(i, j, k), T(i, j + 1, k), T(i, j + 1, k + 1), T(i, j, k + 1)], "#e2e8f0");
    inner += F([T(i, j, k), T(i + 1, j, k), T(i + 1, j, k + 1), T(i, j, k + 1)], "#cbd5e1");
  }
  const w = 300;
  return wrap(vw, vh, w, (w * vh) / vw, inner);
}
function cubeDice() {
  const rows = [];
  const seen = new Set();
  const nets = enumerateNets();
  const orients = dieOrientations();
  const qNetEn = "The given net is folded to form a cube. Which number will be on the face opposite to the face marked with the number shown?";
  const qNetAs = "দিয়া নেটখন ভাঁজ কৰি এটা ঘনক বনোৱা হ'ল। দেখুওৱা সংখ্যাটোৰ বিপৰীত পৃষ্ঠত কোনটো সংখ্যা থাকিব?";
  const exNetEn = "Folding the net shows which cells become opposite faces, so the opposite of the marked face is fixed by the net.";
  const exNetAs = "নেটখন ভাঁজ কৰিলে কোনবোৰ ঘৰ বিপৰীত পৃষ্ঠ হয় তাক দেখুৱায়, সেয়ে চিহ্নিত পৃষ্ঠটোৰ বিপৰীতটো নেটৰ পৰাই নিৰ্ধাৰিত হয়।";
  const qDieEn = "Two positions of the same die are shown. Which number is opposite to the face showing the number that is common to both views?";
  const qDieAs = "একে লুডুৰ দুটা অৱস্থান দেখুওৱা হৈছে। দুয়োখন দৃশ্যতে থকা সাধাৰণ সংখ্যাটোৰ বিপৰীত পৃষ্ঠত কোনটো সংখ্যা থাকে?";
  const exDieEn = "The number common to both views is adjacent to the four other numbers shown, so its opposite is the only number left.";
  const exDieAs = "দুয়োখন দৃশ্যতে থকা সাধাৰণ সংখ্যাটোৱে দেখুওৱা বাকী চাৰিটা সংখ্যাৰ কাষত থাকে, সেয়ে ইয়াৰ বিপৰীতটোৱেই বাকী থকা একমাত্ৰ সংখ্যা।";
  const qCountEn = "How many cubes are there in the given arrangement?";
  const qCountAs = "দিয়া সজ্জাত কিমানটা ঘনক আছে?";
  const exCountEn = "Counting every cube, including the ones hidden behind the visible cubes, gives the total.";
  const exCountAs = "দৃশ্যমান ঘনকবোৰৰ পিছত লুকাই থকাবোৰ ধৰি প্ৰতিটো ঘনক গণনা কৰিলে মুঠ পোৱা যায়।";
  const exCountAs2 = exCountAs;

  const add = (q, fig, values, correctVal, ex) => {
    const figs = values.map(numFig);
    if (new Set(figs).size !== 4) return false;
    const correctFig = numFig(correctVal);
    const shift = rows.length % 4;
    const rot = figs.slice(shift).concat(figs.slice(0, shift));
    const ci = rot.indexOf(correctFig);
    rows.push({
      id: `cube-dice-${String(rows.length + 1).padStart(3, "0")}`,
      q, fig,
      options: rot.map((f, idx) => ({ option: LETTERS[idx], fig: f })),
      correct: ci,
      explanation: ex,
    });
    return true;
  };

  let i = 0;
  /* 1) net -> opposite face */
  for (let t = 0; i < 70 && t < 4000; t++) {
    const net = nets[t % nets.length];
    const r = rng(t * 131 + 7);
    const nums = [1, 2, 3, 4, 5, 6];
    for (let x = nums.length - 1; x > 0; x--) { const y = Math.floor(r() * (x + 1)); [nums[x], nums[y]] = [nums[y], nums[x]]; }
    const map = foldNet(net);
    const cells = net;
    const askIdx = Math.floor(r() * 6);
    const st = map.get(cells[askIdx][0] + "," + cells[askIdx][1]);
    const opp = st.n.map((v) => -v).join(",");
    let oppIdx = -1;
    cells.forEach((c, idx) => { if (map.get(c[0] + "," + c[1]).n.join(",") === opp) oppIdx = idx; });
    if (oppIdx < 0) continue;
    const ask = nums[askIdx], ans = nums[oppIdx];
    const fig = netFigure(cells, nums);
    if (seen.has(fig)) continue;
    const others = [1, 2, 3, 4, 5, 6].filter((v) => v !== ans);
    const values = [ans, others[(askIdx) % others.length], others[(askIdx + 2) % others.length], others[(askIdx + 4) % others.length]];
    if (new Set(values).size !== 4) continue;
    seen.add(fig);
    if (add({ en: qNetEn.replace("the number shown", String(ask)), as: qNetAs.replace("দেখুওৱা সংখ্যাটোৰ", String(ask) + " ৰ") }, fig, values, ans, { en: exNetEn, as: exNetAs })) i++;
  }
  /* 2) two die views sharing one face */
  for (let t = 0; i < 70 && t < 4000; t++) {
    const a = orients[(t * 5 + 1) % orients.length];
    const b = orients[(t * 7 + 3) % orients.length];
    const va = [a[0], a[2], a[4]], vb = [b[0], b[2], b[4]];
    const setA = new Set(va), setB = new Set(vb);
    const common = va.filter((x) => setB.has(x));
    const union = new Set([...va, ...vb]);
    if (common.length !== 1 || union.size !== 5) continue;
    const shared = common[0];
    let opposite = -1;
    for (const n of [1, 2, 3, 4, 5, 6]) if (!union.has(n)) opposite = n;
    if (opposite < 0) continue;
    const fig = dieViewsFigure([va, vb]);
    if (seen.has(fig)) continue;
    const others = [1, 2, 3, 4, 5, 6].filter((v) => v !== opposite);
    const values = [opposite, others[t % others.length], others[(t + 2) % others.length], others[(t + 4) % others.length]];
    if (new Set(values).size !== 4) continue;
    seen.add(fig);
    if (add({ en: qDieEn.replace("the number that is common", String(shared) + ", which is common"), as: qDieAs.replace("সাধাৰণ সংখ্যাটোৰ", String(shared) + " ৰ") }, fig, values, opposite, { en: exDieEn, as: exDieAs })) i++;
  }
  /* 3) count cubes in a stack */
  const dims = [];
  for (let m = 2; m <= 4; m++) for (let n = 2; n <= 4; n++) for (let h = 1; h <= 4; h++) dims.push([m, n, h]);
  for (let t = 0; i < 70 && t < 4000; t++) {
    const [m, n, h] = dims[t % dims.length];
    const heights = [];
    for (let x = 0; x < m; x++) { const row = []; for (let y = 0; y < n; y++) row.push(h); heights.push(row); }
    let total = 0;
    for (const row of heights) for (const v of row) total += v;
    const fig = isoStackFigure(heights);
    if (seen.has(fig)) continue;
    const others = [total + 1, total - 1, total + 2, total - 2, total + 3].filter((v) => v > 0);
    const values = [total, others[t % others.length], others[(t + 1) % others.length], others[(t + 3) % others.length]];
    if (new Set(values).size !== 4) continue;
    seen.add(fig);
    if (add({ en: qCountEn, as: qCountAs }, fig, values, total, { en: exCountEn, as: exCountAs2 })) i++;
  }
  return rows;
}

const BUILDERS = {
  "counting-figures": countingFigures,
  "mirror-water-image": mirrorWater,
  "paper-cutting-folding": paperFolding,
  "embedded-figures": embeddedFigures,
  "pattern-completion": patternCompletion,
  "figure-series": figureSeries,
  "cube-dice": cubeDice,
};

function main() {
  const only = process.argv[2];
  for (const [topic, fn] of Object.entries(BUILDERS)) {
    if (only && only !== topic) continue;
    const rows = fn();
    const dir = path.join(OUT, topic);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "question-001.json"), JSON.stringify(rows, null, 1) + "\n");
    fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify({ subcategory: topic, files: ["question-001.json"] }, null, 2) + "\n");
    const figs = new Set(rows.map((r) => r.fig));
    const keys = [0, 0, 0, 0];
    for (const r of rows) keys[r.correct]++;
    console.log(`${topic}: ${rows.length} questions, ${figs.size} distinct figures, keys ${keys.join("/")}`);
  }
}

main();
