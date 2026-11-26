#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics2b.js
 *
 * Batch 2 of the topic deepening: four geography/science pages get English and
 * Assamese sections, and two pages from batch 1 (medieval-assam, bihu-festival)
 * get one more English section because they landed just under the floor.
 *
 * Entries with mode "en" touch only the English article.
 * Idempotent: marked with <!-- axo-deep2b:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (lang, t) => `<p lang="${lang}">${t}</p>`;
const UL = (lang, items) => `<ul>\n${items.map((i) => `  <li lang="${lang}">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/geography/assam-geography-sec/brahmaputra-river": {
    mode: "both",
    en: [
      ["One river, five names", [
        "The Brahmaputra changes name at every stage, which is why exam questions often ask for the name at a particular place rather than the river itself. In Tibet it is the Yarlung Tsangpo, rising near the Chemayungdung glacier north of the Himalayas and flowing east for about 1,600 km.",
        "It turns south through the great bend in Tibet, enters India in Arunachal Pradesh as the Siang or Dihang, and after receiving the Dibang and the Lohit near Sadiya it becomes the Brahmaputra. Assamese tradition also calls it the Luit or Lohitya, from the reddish colour of its silt-laden water.",
        "In Bangladesh the same river is the Jamuna, and it finally joins the Padma and drains through the Meghna estuary into the Bay of Bengal. Total length is usually given as about 2,900 km, of which roughly 900 km lie in India.",
      ]],
      ["What the river does to Assam", [
        "Within Assam the Brahmaputra runs about 640 km from Sadiya to Dhubri, and its bed is braided: the channel splits, reunites and shifts every flood season, building chars (sandbars) that are settled and then abandoned.",
        "Its tributaries divide into a northern set - the Subansiri, Jia Bharali, Manas, Beki, Champamati and Sankosh - and a southern set - the Burhi Dihing, Disang, Dhansiri and Kopili. The Subansiri is the largest tributary, and the Manas is famous for the national park at its mouth.",
        "The river carries the valley's economy: ferries and bridges link the north and south banks, fisheries support thousands of families, and the floods that renew the soil also destroy crops, roads and homes every year. Majuli, the largest river island in the world, sits in the middle of this system and is shrinking through erosion.",
      ]],
      ["Numbers and traps worth memorising", [
        [
          "Source: Chemayungdung glacier, Tibet; Tibetan name Yarlung Tsangpo.",
          "Entry into India: Arunachal Pradesh, as Siang or Dihang.",
          "Name Brahmaputra begins after the Dibang and Lohit join near Sadiya.",
          "Length: about 2,900 km in total, about 640 km within Assam.",
          "Largest tributary: Subansiri; largest south-bank tributary: Burhi Dihing.",
          "Majuli: largest river island; Kaziranga's floodplain depends on the same river.",
        ],
        "Traps: the Brahmaputra does not rise in the Himalayas proper but in the Tibetan plateau; 'Luit' is a name, not a separate river; and the Jamuna in Bangladesh is the same river, not a tributary.",
      ]],
    ],
    as: [
      ["এখন নদী, পাঁচটা নাম", [
        "ব্ৰহ্মপুত্ৰই প্ৰতিটো পৰ্যায়ত নাম সলায়, সেয়ে প্ৰশ্নত নদীখনৰ পৰিৱৰ্তে নিৰ্দিষ্ট ঠাইত ইয়াৰ নাম সোধা হয়। তিব্বতত ইয়াৰ নাম য়াৰলুং চাংপো; হিমালয়ৰ উত্তৰত চেমায়ুংডুং হিমবাহৰ ওচৰৰপৰা উৎপত্তি হৈ প্ৰায় ১,৬০০ কিলোমিটাৰ পূবলৈ বৈ যায়।",
        "তিব্বতৰ ডাঙৰ বাঁক লৈ ই দক্ষিণলৈ ঘূৰি অৰুণাচল প্ৰদেশত ছিয়াং বা দিহাং নামেৰে ভাৰতত সোমায়, আৰু সাদিয়াৰ ওচৰত ডিবাং আৰু লোহিত লগ হোৱাৰ পিছত ব্ৰহ্মপুত্ৰ হয়। অসমীয়া পৰম্পৰাই ইয়াক লুইত বা লোহিত্যও বোলে — পলসযুক্ত পানীৰ ৰঙা বৰণৰপৰা।",
        "বাংলাদেশত এই নদীখনেই যমুনা, আৰু শেষত পদ্মাৰ সৈতে লগ হৈ মেঘনা মোহনাৰে বংগোপসাগৰত পৰে। মুঠ দৈৰ্ঘ্য প্ৰায় ২,৯০০ কিলোমিটাৰ, যাৰ প্ৰায় ৯০০ কিলোমিটাৰ ভাৰতত।",
      ]],
      ["নদীখনে অসমৰ সৈতে কি কৰে", [
        "অসমৰ ভিতৰত ব্ৰহ্মপুত্ৰই সাদিয়াৰপৰা ধুবৰীলৈ প্ৰায় ৬৪০ কিলোমিটাৰ বৈ যায়, আৰু ইয়াৰ গতিপথ শাখা-প্ৰশাখাত বিভক্ত: বানপানীৰ ঋতুতেই মূলসুঁতি ভাগ হয়, লগ হয় আৰু গতি সলায়, আৰু চৰ (বালিচৰ) গঢ়ি তোলে য’ত মানুহ বসতি কৰি পিছত এৰি যায়।",
        "উপনদীবোৰ দুটা ভাগত বিভক্ত — উত্তৰৰ শুৱানশিৰি, জীয়াভৰলী, মানাহ, বেকী, চাম্পামতী আৰু সংকোশ; আৰু দক্ষিণৰ বুঢ়ী দিহিং, দিচাং, ধনশিৰী আৰু কপিলী। শুৱানশিৰি আটাইতকৈ ডাঙৰ উপনদী, আৰু মানাহৰ মোহনাত থকা ৰাষ্ট্ৰীয় উদ্যানখন ইয়াৰ নামেৰেই জনাজাত।",
        "নদীখনেই উপত্যকাৰ অৰ্থনীতি কঢ়িয়ায়: ফেৰী আৰু দলে উত্তৰ-দক্ষিণ পাৰ জোৰে, মাছমৰীয়ে হাজাৰ হাজাৰ পৰিয়াল পোহপাল দিয়ে, আৰু মাটি সতেজ কৰা বানপানীয়ে প্ৰতি বছৰে শস্য, পথ আৰু ঘৰ ধ্বংসও কৰে। বিশ্বৰ আটাইতকৈ ডাঙৰ নদী-দ্বীপ মাজুলী এই ব্যৱস্থাৰ মাজতে আছে আৰু খহনীয়াত সৰু হৈ আহিছে।",
      ]],
      ["মনত ৰখাৰ যোগ্য সংখ্যা আৰু ফান্দ", [
        [
          "উৎস: তিব্বতৰ চেমায়ুংডুং হিমবাহ; তিব্বতী নাম য়াৰলুং চাংপো।",
          "ভাৰতত প্ৰৱেশ: অৰুণাচল প্ৰদেশ, ছিয়াং বা দিহাং নামেৰে।",
          "সাদিয়াৰ ওচৰত ডিবাং আৰু লোহিত লগ হোৱাৰ পিছত ‘ব্ৰহ্মপুত্ৰ’ নাম আৰম্ভ।",
          "দৈৰ্ঘ্য: মুঠ প্ৰায় ২,৯০০ কিমি, অসমত প্ৰায় ৬৪০ কিমি।",
          "আটাইতকৈ ডাঙৰ উপনদী: শুৱানশিৰি; দক্ষিণ পাৰৰ ডাঙৰ উপনদী: বুঢ়ী দিহিং।",
          "মাজুলী: বিশ্বৰ আটাইতকৈ ডাঙৰ নদী-দ্বীপ; কাজিৰঙাৰ বানপানী সমভূমিও এই নদীৰে জড়িত।",
        ],
        "ফান্দ: ব্ৰহ্মপুত্ৰৰ উৎপত্তি হিমালয়ত নহয়, তিব্বতৰ মালভূমিত; ‘লুইত’ আন এখন নদী নহয়, নামহে; আৰু বাংলাদেশৰ যমুনা এই নদীখনেই, উপনদী নহয়।",
      ]],
    ],
  },

  "topic/gk/geography/assam-geography-sec/national-parks": {
    mode: "both",
    en: [
      ["The seven national parks of Assam", [
        "Assam has seven national parks, and each was created to protect a particular landscape. Kaziranga (1974) protects the Brahmaputra floodplain grassland and the greater one-horned rhinoceros. Manas (1990) protects the Himalayan foothill forest and grassland along the Manas river. Nameri (1998) lies on the Jia Bharali at the Arunachal border, and Orang (1999), also called Rajiv Gandhi Orang National Park, protects a small floodplain in Darrang and Sonitpur.",
        "Dibru-Saikhowa (1999) in Tinsukia and Dibrugarh is a river island park known for feral horses and swamp forest. The two newest are Dehing Patkai (2020), the rainforest of Dibrugarh and Tinsukia often called the Amazon of the East, and Raimona (2021) in Kokrajhar, which continues the Manas landscape westward.",
      ]],
      ["Kaziranga and Manas in detail", [
        "Kaziranga began as a reserve forest in 1905, became a national park in 1974, a World Heritage Site in 1985 and a tiger reserve in 2006. It holds the largest population of the greater one-horned rhinoceros in the world, along with wild buffalo, swamp deer and elephants, and it is flooded every monsoon, which is what keeps its grasslands healthy.",
        "Manas was declared a sanctuary in 1928, a tiger reserve in 1973 under Project Tiger, a World Heritage Site in 1985, a biosphere reserve in 1989 and a national park in 1990. It is home to the pygmy hog, the golden langur and the Bengal florican, and it straddles the Bodoland Territorial Region.",
      ]],
      ["Exam traps", [
        [
          "Kaziranga: national park 1974, World Heritage Site 1985, tiger reserve 2006 - three different years, often mixed up.",
          "Manas: sanctuary 1928, tiger reserve 1973, World Heritage Site 1985, biosphere reserve 1989, national park 1990.",
          "Nameri is on the Jia Bharali, not the Brahmaputra; Orang is in Darrang-Sonitpur.",
          "Dibru-Saikhowa is a river island park; Dehing Patkai is rainforest; Raimona is in Kokrajhar.",
          "Assam's parks are floodplain or foothill habitats - none is an alpine park.",
        ],
      ]],
    ],
    as: [
      ["অসমৰ সাতখন ৰাষ্ট্ৰীয় উদ্যান", [
        "অসমত সাতখন ৰাষ্ট্ৰীয় উদ্যান আছে, আৰু প্ৰতিখন নিৰ্দিষ্ট ভূ-প্ৰকৃতি সুৰক্ষিত কৰিবলৈ সৃষ্টি কৰা হৈছে। কাজিৰঙা (১৯৭৪)এ ব্ৰহ্মপুত্ৰৰ বানপানী সমভূমিৰ তৃণভূমি আৰু এশিঙীয়া গঁড় সুৰক্ষিত কৰে। মানাহ (১৯৯০)এ মানাহ নদীৰ কাষৰ হিমালয়ৰ পাদদেশৰ বন আৰু তৃণভূমি ৰক্ষা কৰে। নামেৰী (১৯৯৮) অৰুণাচল সীমাত জীয়াভৰলীৰ ওপৰত, আৰু ওৰাং (১৯৯৯), যাক ৰাজীৱ গান্ধী ওৰাং ৰাষ্ট্ৰীয় উদ্যানও বোলে, দৰং আৰু শোণিতপুৰৰ সৰু বানপানী সমভূমি ৰক্ষা কৰে।",
        "ডিব্ৰু-চৈখোৱা (১৯৯৯) তিনিচুকীয়া আৰু ডিব্ৰুগড়ত এখন নদী-দ্বীপ উদ্যান, যি বনৰীয়া ঘোঁৰা আৰু জলাশয় বনৰ বাবে জনাজাত। নতুন দুখন হ’ল দিহিং পাটকাই (২০২০) — ডিব্ৰুগড়-তিনিচুকীয়াৰ বৰ্ষাৰণ্য, যাক পূবৰ আমাজন বোলা হয় — আৰু কোকৰাঝাৰৰ ৰাইমনা (২০২১), যি মানাহৰ ভূ-প্ৰকৃতি পশ্চিমলৈ আগবঢ়াই নিয়ে।",
      ]],
      ["কাজিৰঙা আৰু মানাহ বিস্তাৰিতভাৱে", [
        "কাজিৰঙা ১৯০৫ চনত সংৰক্ষিত বন হিচাপে আৰম্ভ হয়, ১৯৭৪ চনত ৰাষ্ট্ৰীয় উদ্যান, ১৯৮৫ চনত বিশ্ব ঐতিহ্য স্থান আৰু ২০০৬ চনত বাঘ সংৰক্ষিত অঞ্চল হয়। বিশ্বৰ আটাইতকৈ ডাঙৰ এশিঙীয়া গঁড়ৰ জনসংখ্যা ইয়াত আছে, লগতে বনৰীয়া ম’হ, দল-হৰিণা আৰু হাতী; প্ৰতি বৰ্ষা ই পানীৰ তলত ডোবে, আৰু সেইটোৱেই ইয়াৰ তৃণভূমিক সতেজ ৰাখে।",
        "মানাহ ১৯২৮ চনত অভয়াৰণ্য, ১৯৭৩ চনত প্ৰজেক্ট টাইগাৰৰ অধীনত বাঘ সংৰক্ষিত অঞ্চল, ১৯৮৫ চনত বিশ্ব ঐতিহ্য স্থান, ১৯৮৯ চনত জৈৱমণ্ডল সংৰক্ষিত অঞ্চল আৰু ১৯৯০ চনত ৰাষ্ট্ৰীয় উদ্যান ঘোষিত হয়। ইয়াত পিগমী হগ, সোণালী লঙুৰ আৰু বেংগল ফ্ল’ৰিকান আছে, আৰু ই বড়োলেণ্ড আঞ্চলিক অঞ্চলজুৰি বিস্তৃত।",
      ]],
      ["পৰীক্ষাৰ ফান্দ", [
        [
          "কাজিৰঙা: ৰাষ্ট্ৰীয় উদ্যান ১৯৭৪, বিশ্ব ঐতিহ্য ১৯৮৫, বাঘ সংৰক্ষিত ২০০৬ — তিনিটা বেলেগ বছৰ, সঘনাই মিলাই পেলোৱা হয়।",
          "মানাহ: অভয়াৰণ্য ১৯২৮, বাঘ সংৰক্ষিত ১৯৭৩, বিশ্ব ঐতিহ্য ১৯৮৫, জৈৱমণ্ডল ১৯৮৯, ৰাষ্ট্ৰীয় উদ্যান ১৯৯০।",
          "নামেৰী জীয়াভৰলীত, ব্ৰহ্মপুত্ৰত নহয়; ওৰাং দৰং-শোণিতপুৰত।",
          "ডিব্ৰু-চৈখোৱা নদী-দ্বীপ উদ্যান; দিহিং পাটকাই বৰ্ষাৰণ্য; ৰাইমনা কোকৰাঝাৰত।",
          "অসমৰ উদ্যানবোৰ বানপানী সমভূমি বা পাদদেশৰ বাসস্থান — আল্পাইন উদ্যান নাই।",
        ],
      ]],
    ],
  },

  "topic/gk/geography/astronomical-geography-sec/solar-system": {
    mode: "both",
    en: [
      ["How the system is put together", [
        "The Sun holds about 99.86 per cent of the mass of the solar system, and everything else orbits it. The eight planets divide into two families: the four terrestrial planets - Mercury, Venus, Earth and Mars - are small, rocky and close to the Sun, while the four giant planets - Jupiter, Saturn, Uranus and Neptune - are large, gaseous or icy and far out.",
        "Between Mars and Jupiter lies the asteroid belt. Beyond Neptune are the Kuiper belt, home to Pluto and other icy bodies, and then the Oort cloud, the distant reservoir of long-period comets. Since 2006 the IAU treats Pluto, Ceres, Eris, Haumea and Makemake as dwarf planets.",
      ]],
      ["Planet by planet, the facts that get asked", [
        [
          "Mercury: smallest planet, no real atmosphere, fastest orbit (88 days), largest temperature range.",
          "Venus: hottest planet (about 465 C), retrograde rotation, thick carbon dioxide atmosphere, called the morning and evening star.",
          "Earth: the only planet with liquid water on the surface and life; one natural satellite.",
          "Mars: red from iron oxide; Olympus Mons is the tallest volcano in the system; two small moons.",
          "Jupiter: largest planet; the Great Red Spot is a storm larger than Earth; about 95 known moons.",
          "Saturn: ring system of ice and rock; density lower than water; Titan has a thick atmosphere.",
          "Uranus: tilted about 98 degrees, so it rolls along its orbit; an ice giant.",
          "Neptune: farthest planet; strongest winds, over 2,000 km per hour; discovered by calculation in 1846.",
        ],
      ]],
      ["Numbers and traps", [
        "Light from the Sun reaches Earth in about 8 minutes 20 seconds. Earth's axis is tilted 23.5 degrees, which produces the seasons, and the planet takes 365.26 days to orbit the Sun.",
        "Traps: Venus, not Mercury, is the hottest planet, because of its greenhouse atmosphere. Pluto was reclassified as a dwarf planet in 2006, not dropped from the solar system. Saturn is less dense than water, not the smallest planet. Jupiter has the most moons, not Saturn, and the asteroid belt lies between Mars and Jupiter, not beyond Saturn.",
      ]],
    ],
    as: [
      ["সৌৰজগত কেনেকৈ গঢ় লৈছে", [
        "সূৰ্যই সৌৰজগতৰ প্ৰায় ৯৯.৮৬ শতাংশ ভৰ ধাৰণ কৰে, আৰু বাকী সকলো ইয়াৰ চাৰিওফালে ঘূৰে। আটাইকেইটা গ্ৰহ দুই পৰিয়ালত বিভক্ত: চাৰিটা স্থলজ গ্ৰহ — বুধ, শুক্ৰ, পৃথিৱী আৰু মংগল — সৰু, শিলাময় আৰু সূৰ্যৰ ওচৰত; আনহাতে চাৰিটা বিশাল গ্ৰহ — বৃহস্পতি, শনি, ইউৰেনাছ আৰু নেপচুন — ডাঙৰ, গেছীয় বা বৰফময় আৰু বহুত দূৰত।",
        "মংগল আৰু বৃহস্পতিৰ মাজত আছে গ্ৰহাণু-পট্টি। নেপচুনৰ বাহিৰত কুইপাৰ পট্টি — য’ত প্লুটো আৰু আন বৰফময় বস্তু আছে — আৰু তাৰ পিছত অ’ৰ্ট মেঘ, দীৰ্ঘকালীন ধূমকেতুৰ দূৰৰ ভঁৰাল। ২০০৬ চনৰপৰা IAU-এ প্লুটো, চিৰেছ, এৰিছ, হাউমিয়া আৰু মাকেমাকেক বাওনা গ্ৰহ হিচাপে গণ্য কৰে।",
      ]],
      ["গ্ৰহে গ্ৰহে, যি তথ্য সোধা হয়", [
        [
          "বুধ: আটাইতকৈ সৰু গ্ৰহ, প্ৰকৃত বায়ুমণ্ডল নাই, আটাইতকৈ দ্ৰুত কক্ষপথ (৮৮ দিন), উষ্ণতাৰ পাৰ্থক্য আটাইতকৈ বেছি।",
          "শুক্ৰ: আটাইতকৈ গৰম গ্ৰহ (প্ৰায় ৪৬৫ ডিগ্ৰী চেলছিয়াছ), বিপৰীত দিশত ঘূৰে, ঘন কাৰ্বন ডাই-অক্সাইড বায়ুমণ্ডল, ৰাতিপুৱা-সন্ধিয়াৰ তৰা বুলি জনাজাত।",
          "পৃথিৱী: পৃষ্ঠত জুলীয়া পানী আৰু জীৱন থকা একমাত্ৰ গ্ৰহ; এটা প্ৰাকৃতিক উপগ্ৰহ।",
          "মংগল: লো-অক্সাইডৰ বাবে ৰঙা; অলিম্পাছ মনছ সৌৰজগতৰ আটাইতকৈ ওখ আগ্নেয়গিৰি; দুটা সৰু চন্দ্ৰ।",
          "বৃহস্পতি: আটাইতকৈ ডাঙৰ গ্ৰহ; গ্ৰেট ৰেড স্পট পৃথিৱীতকৈ ডাঙৰ ধুমুহা; প্ৰায় ৯৫টা জনা উপগ্ৰহ।",
          "শনি: বৰফ আৰু শিলৰ আঙঠি; পানীতকৈ কম ঘনত্ব; টাইটানৰ ঘন বায়ুমণ্ডল আছে।",
          "ইউৰেনাছ: প্ৰায় ৯৮ ডিগ্ৰী হালি থকা, সেয়ে কক্ষপথত গড়ি গড়ি যায়; বৰফময় বিশাল গ্ৰহ।",
          "নেপচুন: আটাইতকৈ দূৰৰ গ্ৰহ; আটাইতকৈ শক্তিশালী বতাহ, ঘণ্টাত ২,০০০ কিমিতকৈ বেছি; ১৮৪৬ চনত গণনাৰে আৱিষ্কাৰ।",
        ],
      ]],
      ["সংখ্যা আৰু ফান্দ", [
        "সূৰ্যৰ পৰা পোহৰ পৃথিৱীত প্ৰায় ৮ মিনিট ২০ ছেকেণ্ডত পায়। পৃথিৱীৰ অক্ষ ২৩.৫ ডিগ্ৰী হালি আছে, যাৰ বাবে ঋতু হয়, আৰু সূৰ্যৰ চাৰিওফালে এটা পাকত ৩৬৫.২৬ দিন লাগে।",
        "ফান্দ: আটাইতকৈ গৰম গ্ৰহ শুক্ৰ, বুধ নহয় — কাৰণ ইয়াৰ গ্ৰীণহাউছ বায়ুমণ্ডল। প্লুটোক ২০০৬ চনত বাওনা গ্ৰহ হিচাপে পুনৰ্শ্ৰেণীবদ্ধ কৰা হৈছিল, সৌৰজগতৰপৰা বাদ দিয়া নহয়। শনি পানীতকৈ কম ঘনত্বৰ, আটাইতকৈ সৰু গ্ৰহ নহয়। আটাইতকৈ বেছি উপগ্ৰহ বৃহস্পতিৰ, শনিৰ নহয়; আৰু গ্ৰহাণু-পট্টি মংগল-বৃহস্পতিৰ মাজত, শনিৰ বাহিৰত নহয়।",
      ]],
    ],
  },

  "topic/science/biology/human-body": {
    mode: "both",
    en: [
      ["Systems, and the organs that belong to each", [
        "The body is studied as eleven systems. The skeletal system has 206 bones in an adult and supports the body; the muscular system has more than 600 muscles and produces movement. The digestive system runs from mouth to anus; the circulatory system is the heart, blood and vessels; the respiratory system is the lungs and airways.",
        "The nervous system is the brain, spinal cord and nerves; the excretory system is the kidneys, ureters, bladder and urethra; the endocrine system is the hormone glands. The reproductive, integumentary (skin, hair, nails) and lymphatic systems complete the list.",
      ]],
      ["Numbers worth remembering", [
        [
          "Heart: four chambers, two atria and two ventricles; resting rate about 72 beats a minute.",
          "Lungs: roughly 300 million alveoli, the surface where oxygen enters the blood.",
          "Kidneys: two, each with about one million nephrons; they filter about 180 litres of blood a day.",
          "Brain: about 86 billion neurons; the cerebellum controls balance, the medulla controls breathing and heartbeat.",
          "Blood: about 5 litres in an adult; red cells live about 120 days; haemoglobin carries oxygen.",
          "Bones: smallest is the stapes in the ear, longest is the femur; the spine has 33 vertebrae at birth, 26 in the adult column.",
        ],
      ]],
      ["Exam traps", [
        "The liver is the largest internal organ and the largest gland; the skin is the largest organ overall. The pituitary gland is called the master gland because it controls other glands, but the hypothalamus sits above it and regulates it.",
        "Insulin comes from the beta cells of the islets of Langerhans in the pancreas, not from the liver. Vitamin K is needed for blood clotting, vitamin A for vision, vitamin D for calcium absorption and vitamin C for collagen.",
        "A human cell has 46 chromosomes in 23 pairs, and the genetic material is in the nucleus. Mature red blood cells have no nucleus, which is why they cannot divide.",
      ]],
    ],
    as: [
      ["তন্ত্ৰ, আৰু প্ৰতিটোৰ অংগ", [
        "শৰীৰক এঘাৰটা তন্ত্ৰ হিচাপে পঢ়া হয়। কংকাল তন্ত্ৰত প্ৰাপ্তবয়স্কৰ ২০৬ খন হাড় আছে আৰু ই শৰীৰক ধৰি ৰাখে; পেশী তন্ত্ৰত ৬০০ তকৈ বেছি পেশী আছে আৰু গতি উৎপন্ন কৰে। পাচন তন্ত্ৰ মুখৰপৰা মলদ্বাৰলৈ; ৰক্ত সংবহন তন্ত্ৰ হ’ল হৃদয়, তেজ আৰু ৰক্তনলী; শ্বাস তন্ত্ৰ হ’ল হাওঁফাওঁ আৰু শ্বাসনলী।",
        "স্নায়ু তন্ত্ৰ হ’ল মগজু, সুষুম্না আৰু স্নায়ু; ৰেচন তন্ত্ৰ হ’ল বৃক্ক, মূত্ৰনলী, মূত্ৰাশয় আৰু মূত্ৰমাৰ্গ; অন্তঃস্ৰাৱী তন্ত্ৰ হ’ল হৰম’ন গ্ৰন্থি। প্ৰজনন, ত্বক (ছাল, চুলি, নখ) আৰু লসিকা তন্ত্ৰই তালিকাখন সম্পূৰ্ণ কৰে।",
      ]],
      ["মনত ৰখাৰ যোগ্য সংখ্যা", [
        [
          "হৃদয়: চাৰিটা কোঠা — দুটা অলিন্দ, দুটা নিলয়; বিশ্ৰাম অৱস্থাত মিনিটত প্ৰায় ৭২ বাৰ স্পন্দন।",
          "হাওঁফাওঁ: প্ৰায় ৩০ কোটি অ্যালভিঅ’ল, য’ত অক্সিজেন তেজত সোমায়।",
          "বৃক্ক: দুটা, প্ৰতিটোত প্ৰায় দহ লাখ নেফ্ৰন; দিনে প্ৰায় ১৮০ লিটাৰ তেজ পৰিশোধন কৰে।",
          "মগজু: প্ৰায় ৮.৬ কোটি নিউৰন; চেৰিবেলামে ভাৰসাম্য, মেডুল্লাই শ্বাস আৰু হৃদস্পন্দন নিয়ন্ত্ৰণ কৰে।",
          "তেজ: প্ৰাপ্তবয়স্কত প্ৰায় ৫ লিটাৰ; ৰঙা কোষৰ আয়ু প্ৰায় ১২০ দিন; হিম’গ্লবিনে অক্সিজেন কঢ়িয়ায়।",
          "হাড়: আটাইতকৈ সৰু ষ্টেপিছ (কাণত), আটাইতকৈ দীঘল ফিমাৰ; জন্মত মেৰুদণ্ডত ৩৩টা কশেৰুকা, প্ৰাপ্তবয়স্কত ২৬টা।",
        ],
      ]],
      ["পৰীক্ষাৰ ফান্দ", [
        "যকৃত শৰীৰৰ আটাইতকৈ ডাঙৰ অন্তৰংগ অংগ আৰু আটাইতকৈ ডাঙৰ গ্ৰন্থি; ছাল হ’ল সামগ্ৰিকভাৱে আটাইতকৈ ডাঙৰ অংগ। পিটুইটাৰি গ্ৰন্থিক ‘মাষ্টাৰ গ্লেণ্ড’ বোলা হয় কাৰণ ই আন গ্ৰন্থি নিয়ন্ত্ৰণ কৰে, কিন্তু তাৰ ওপৰত থকা হাইপ’থেলামাছে ইয়াক নিয়ন্ত্ৰণ কৰে।",
        "ইনচুলিন অগ্ন্যাশয়ৰ আইলেটছ অৱ লেংগাৰহানছৰ বিটা কোষৰপৰা আহে, যকৃতৰপৰা নহয়। ৰক্ত জমাট বান্ধিবলৈ ভিটামিন K, দৃষ্টিৰ বাবে ভিটামিন A, কেলছিয়াম শোষণৰ বাবে ভিটামিন D আৰু ক’লেজেনৰ বাবে ভিটামিন C প্ৰয়োজন।",
        "মানুহৰ কোষত ২৩ যোৰত ৪৬ খন ক্ৰম’জম থাকে, আৰু বংশগতীয় বস্তু নিউক্লিয়াছত থাকে। পৰিপক্ব ৰঙা ৰক্তকোষত নিউক্লিয়াছ নাথাকে, সেয়ে সিহঁতে বিভাজন কৰিব নোৱাৰে।",
      ]],
    ],
  },

  /* Batch-1 pages that landed just under the floor: English article only. */
  "topic/gk/assam-history/medieval-assam-sec/medieval-assam": {
    mode: "en",
    en: [
      ["Religion, literature and the making of Assamese culture", [
        "The medieval period produced the cultural forms that later defined Assam. Srimanta Sankardeva (1449-1568) and Madhavdeva built the Vaishnava movement of the satra and the namghar, which reorganised village religion around prayer halls rather than temples and images.",
        "The Ahom court kept the buranjis, chronicles written in Assamese prose that record reigns, campaigns and treaties, and those texts are the main source for the period. Under royal patronage, manuscript painting, silk weaving - especially muga and pat - and the Assamese script itself developed further.",
        "The Koch court in the west patronised Sanskrit learning and temple building, while the Chutiya and Kachari courts kept their own deities and oral traditions. The result was a valley with several political centres but a shared language and a shared festival calendar.",
      ]],
    ],
  },

  "topic/gk/art-culture/assam-art-culture-sec/bihu-festival": {
    mode: "en",
    en: [
      ["Bihu inside the Assamese year", [
        "Bihu is the hinge of the Assamese agricultural calendar, and the other festivals sit around it. Bohag Bihu opens the year with the Bihu dance and Husori; the spring cleaning and the worship of cattle in Goru Bihu come first, and the festivities last about a week.",
        "Magh Bihu closes the harvest year with the uruka night and the Meji, and it is the season when villages exchange visits and food. Kati Bihu is quieter: a lamp at the tulsi, a prayer for the standing crop, and an empty granary that explains its other name, Kongali.",
        "The three together describe a rice economy - sowing, growing and harvesting - and that is why Bihu questions usually test the season, the month and the ritual rather than the dance alone.",
      ]],
    ],
  },
};

const FAQ_EN = /<h3[^>]*>\s*Frequently Asked Questions\s*<\/h3>/i;
const FAQ_AS = /<h3[^>]*>\s*সঘনাই সোধা প্ৰশ্ন\s*<\/h3>/;

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

function renderSections(lang, sections) {
  return sections.map(([h3, blocks]) => {
    const body = blocks.map((b) => (Array.isArray(b) ? UL(lang, b) : P(lang, b))).join("\n      ");
    return `      <h3>${h3}</h3>\n      ${body}`;
  }).join("\n");
}

let changed = 0;
const report = [];

for (const [rel, data] of Object.entries(DATA)) {
  const targets = data.mode === "en" ? [[rel, "en"]] : [[rel, "both"], ["as/" + rel, "as"]];
  for (const [target, mode] of targets) {
    const file = path.join(ROOT, target, "index.html");
    if (!fs.existsSync(file)) { report.push(`MISSING ${target}`); continue; }
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("<!-- axo-deep2b:1 -->")) { report.push(`skip ${target}`); continue; }

    let span = extraSpan(html);
    if (!span) { report.push(`NO-EXTRA ${target}`); continue; }

    if (mode !== "en") {
      const asAt = FAQ_AS.exec(html.slice(span[0], span[1]));
      if (!asAt) { report.push(`NO-FAQ ${target}`); continue; }
      const at = span[0] + asAt.index;
      html = html.slice(0, at) + renderSections("as", data.as) + "\n      " + html.slice(at);
    }

    span = extraSpan(html);
    const enAt = FAQ_EN.exec(html.slice(span[0], span[1]));
    if (!enAt) { report.push(`NO-EN-FAQ ${target}`); continue; }
    const at2 = span[0] + enAt.index;
    html = html.slice(0, at2) + renderSections("en", data.en) + "\n      " + html.slice(at2);

    html = html.replace("</main>", "</main>\n<!-- axo-deep2b:1 -->");
    if (!DRY) fs.writeFileSync(file, html);
    changed++;
    report.push(`ok ${target}`);
  }
}

console.log(report.join("\n"));
console.log(`pages deepened (batch 2b): ${changed}`);
