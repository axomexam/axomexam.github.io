#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics2c.js
 *
 * Top-up pass: five pages from batches 1-2 landed just under the 1300-word
 * floor after their first addition. One more English section each.
 *
 * Idempotent: marked with <!-- axo-deep2c:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (t) => `<p lang="en">${t}</p>`;
const UL = (items) => `<ul>\n${items.map((i) => `  <li lang="en">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/assam-history/medieval-assam-sec/medieval-assam": [
    ["Reading the medieval map", [
      "A map question on this period usually asks which power held a river line. The Ahoms held the Brahmaputra from Sadiya westward to the Dikhou and later to the Manas; the Chutiyas held the Dihing and Dibang headwaters; the Kacharis held the Dhansiri valley and the hills south of it; and the Kochs held the plains west of the Sankosh.",
      "Learn the frontier rivers rather than the capitals: Dikhou separates Ahom from Chutiya territory, Dhansiri separates Ahom from Kachari, and the Manas became the Ahom-Mughal boundary after 1682.",
    ]],
  ],
  "topic/gk/geography/assam-geography-sec/brahmaputra-river": [
    ["The tributaries to know on a map", [
      UL([
        "North bank: Subansiri (largest), Jia Bharali, Manas, Beki, Champamati, Sankosh, Aie, Dhansiri (north).",
        "South bank: Burhi Dihing, Disang, Dhansiri (south), Kopili, Kolong, Kulsi.",
        "Subansiri joins in Lakhimpur; Manas joins near Manas National Park; Kopili joins in Nagaon.",
        "The Dhansiri south bank drains the Karbi hills; the Kolong branches off at Nagaon and rejoins near Guwahati.",
        "Majuli sits between the main channel and the Subansiri mouth.",
      ]),
      "Traps: two different rivers are called Dhansiri - one on the north bank in Udalguri, one on the south bank in Golaghat. The Kolong is a distributary of the Brahmaputra, not an independent river.",
    ]],
  ],
  "topic/gk/geography/assam-geography-sec/national-parks": [
    ["Beyond the parks: sanctuaries that get asked", [
      "Most objective questions name a park, but the sanctuaries are asked just as often. Pobitora Wildlife Sanctuary in Morigaon has the densest rhinoceros population in the world. Hollongapar Gibbon Sanctuary in Jorhat protects the hoolock gibbon, India's only ape.",
      "Panidihing in Sivasagar is a bird sanctuary on the Brahmaputra floodplain; Bura Chapori and Sonai Rupai in Sonitpur are grassland and forest sanctuaries; Bornadi in Udalguri protects the pygmy hog; and Garampani in Karbi Anglong is known for its hot springs.",
    ]],
    ["Why Assam's protected areas look the way they do", [
      "Assam's parks are small and linear because they follow the Brahmaputra floodplain and the foothills. Kaziranga is about 430 square kilometres, Manas about 500, and Orang only about 79 - small in area but dense in large mammals.",
      "That shape creates the management problem the state is known for: parks are cut off by highways, tea gardens and villages, and animals move between them along narrow corridors. Kaziranga's success with the rhino and its difficulty with floods, poaching and road traffic both come from the same geography.",
      "For exams, remember the pairing: floodplain grassland parks in the valley (Kaziranga, Orang, Dibru-Saikhowa) and foothill forest parks on the northern and southern edges (Manas, Nameri, Dehing Patkai, Raimona).",
    ]],
  ],
  "topic/gk/geography/astronomical-geography-sec/solar-system": [
    ["How the system is measured", [
      "Distances inside the solar system are measured in astronomical units: one AU is the mean Earth-Sun distance, about 150 million km. Distances to stars use the light-year, about 9.46 trillion km, and the nearest star system, Alpha Centauri, is about 4.3 light-years away.",
      "Motion follows Kepler's three laws: orbits are ellipses with the Sun at one focus; a planet sweeps equal areas in equal times; and the square of the orbital period is proportional to the cube of the mean distance. Newton's law of gravitation explains why.",
      "Seasons on Earth are caused by the 23.5-degree tilt of the axis, not by distance from the Sun - the Earth is actually closest to the Sun in early January.",
    ]],
  ],
  "topic/science/biology/human-body": [
    ["How the systems work together", [
      "Digestion runs mouth, oesophagus, stomach, small intestine, large intestine, and the liver and pancreas feed enzymes into it. Absorption happens mainly in the small intestine, whose villi give it an enormous surface area; water is reabsorbed in the large intestine.",
      "Circulation is a double circuit: the right side of the heart pumps deoxygenated blood to the lungs and the left side pumps oxygenated blood to the body. Arteries carry blood away from the heart, veins bring it back, and capillaries are where exchange happens.",
      "Breathing works by pressure: the diaphragm contracts and flattens, the chest expands, pressure falls and air flows in. Gas exchange then takes place across the alveolar wall, and oxygen binds to haemoglobin in red cells.",
      "The nervous and endocrine systems control the rest - nerves for fast signals, hormones for slow ones - and the kidneys, lungs and skin together keep water, salts and temperature in balance.",
    ]],
  ],
};

const FAQ_EN = /<h3[^>]*>\s*Frequently Asked Questions\s*<\/h3>/i;

function extraSpan(html) {
  const start = html.search(/<section[^>]*class="[^"]*axo-extra-content/);
  if (start < 0) return null;
  let depth = 0;
  const re = /<section\b|<\/section>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === "<section" ? 1 : -1;
    if (depth === 0) return [start, m.index + m[0].length];
  }
  return null;
}

let changed = 0;
const report = [];

for (const [rel, sections] of Object.entries(DATA)) {
  const file = path.join(ROOT, rel, "index.html");
  if (!fs.existsSync(file)) { report.push(`MISSING ${rel}`); continue; }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("<!-- axo-deep2c:1 -->")) { report.push(`skip ${rel}`); continue; }

  const span = extraSpan(html);
  if (!span) { report.push(`NO-EXTRA ${rel}`); continue; }
  const at = FAQ_EN.exec(html.slice(span[0], span[1]));
  if (!at) { report.push(`NO-FAQ ${rel}`); continue; }

  const block = sections.map(([h3, blocks]) => {
    const body = blocks.map((b) => (Array.isArray(b) ? UL(b) : P(b))).join("\n      ");
    return `      <h3>${h3}</h3>\n      ${body}`;
  }).join("\n");

  const pos = span[0] + at.index;
  html = html.slice(0, pos) + block + "\n      " + html.slice(pos);
  html = html.replace("</main>", "</main>\n<!-- axo-deep2c:1 -->");

  if (!DRY) fs.writeFileSync(file, html);
  changed++;
  report.push(`ok ${rel}`);
}

console.log(report.join("\n"));
console.log(`pages topped up: ${changed}`);
