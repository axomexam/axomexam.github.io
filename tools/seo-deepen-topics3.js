#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics3.js
 *
 * Batch 3: three history pages (ancient India, medieval India, freedom
 * struggle) get English and Assamese sections, and four pages from batch 2 get
 * one more English section to clear the 1300-word floor.
 *
 * Idempotent: marked with <!-- axo-deep3:1 -->.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (lang, t) => `<p lang="${lang}">${t}</p>`;
const UL = (lang, items) => `<ul>\n${items.map((i) => `  <li lang="${lang}">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/indian-history/ancient-indian-history-sec/ancient-india": {
    mode: "both",
    en: [
      ["Periods, and where each one is known from", [
        "Ancient India is studied in four blocks: the Harappan or Indus Valley civilisation (c. 2600-1900 BCE), the Vedic period (c. 1500-600 BCE), the age of the Mahajanapadas and the Mauryas (600-185 BCE), and the Gupta age (320-550 CE) with the centuries between.",
        "Each block rests on a different kind of evidence. Harappa and Mohenjodaro give archaeology - seals, drainage, granaries, script still undeciphered. The Vedic period gives literature - the Rigveda and later Samhitas, Brahmanas and Upanishads. The Mauryan period gives both epigraphy, in Ashoka's edicts, and a foreign account, Megasthenes' description of Chandragupta's court. The Gupta age gives inscriptions, coins and the travel account of Fa-Hien.",
      ]],
      ["Rulers and dates that repeat in papers", [
        "Chandragupta Maurya founded the Mauryan empire around 321 BCE with the help of Chanakya, and Bindusara extended it. Ashoka, his grandson, fought the Kalinga war in 261 BCE, turned to dhamma after it, and left his policy in rock and pillar edicts - the best-documented reign of ancient India.",
        "In the north-west the Kushans ruled, and Kanishka is dated from 78 CE, the start of the Shaka era. In the Ganga valley the Guptas followed: Chandragupta I took the title Maharajadhiraja around 319-320 CE, Samudragupta's conquests are listed on the Allahabad pillar, and Chandragupta II, called Vikramaditya, ruled from Ujjain and patronised art and learning.",
      ]],
      ["Society, economy and the traps", [
        "Society was organised by varna, but the economy rested on agriculture, craft guilds and long-distance trade - punch-marked coins, Roman gold and ports such as Tamralipti show how far it reached. Sanskrit became the language of courts and inscriptions, while Buddhism and Jainism grew as reform movements in the sixth century BCE.",
        "Traps: the Harappan civilisation is not Vedic, and its script is undeciphered; the Kalinga war is 261 BCE, not 321; Ashoka's dhamma is not Buddhism as a state religion; the Gupta 'golden age' label is a later judgement and is debated; and the Allahabad pillar inscription belongs to Samudragupta, not Ashoka.",
      ]],
    ],
    as: [
      ["যুগ, আৰু প্ৰতিটোৰ প্ৰমাণ ক'ৰপৰা", [
        "প্ৰাচীন ভাৰতক চাৰিটা খণ্ডত পঢ়া হয়: হাৰপ্পা বা সিন্ধু সভ্যতা (প্ৰায় ২৬০০-১৯০০ খ্ৰীঃপূঃ), বৈদিক যুগ (প্ৰায় ১৫০০-৬০০ খ্ৰীঃপূঃ), মহাজনপদ আৰু মৌৰ্য যুগ (৬০০-১৮৫ খ্ৰীঃপূঃ), আৰু গুপ্ত যুগ (৩২০-৫৫০ খ্ৰীষ্টাব্দ)।",
        "প্ৰতিটো খণ্ড বেলেগ ধৰণৰ প্ৰমাণৰ ওপৰত ঠিয়। হাৰপ্পা আৰু মহেঞ্জোদাৰোই পুৰাতত্ত্ব দিয়ে — মোহৰ, পয়ঃনিষ্কাশন, শস্যভঁৰাল, এতিয়াও অপঠিত লিপি। বৈদিক যুগই সাহিত্য দিয়ে — ঋগ্বেদ আৰু পিছৰ সংহিতা, ব্ৰাহ্মণ, উপনিষদ। মৌৰ্য যুগই শিলালিপি (অশোকৰ অনুশাসন) আৰু বিদেশী বিৱৰণ (মেগাস্থিনিছ) দুয়োটাই দিয়ে। গুপ্ত যুগই শিলালিপি, মুদ্ৰা আৰু ফা-হিয়েনৰ ভ্ৰমণ-বিৱৰণ দিয়ে।",
      ]],
      ["প্ৰশ্নত সঘনাই অহা ৰজা আৰু তাৰিখ", [
        "চন্দ্ৰগুপ্ত মৌৰ্যই চাণক্যৰ সহায়ত প্ৰায় ৩২১ খ্ৰীঃপূঃত মৌৰ্য সাম্ৰাজ্য প্ৰতিষ্ঠা কৰে, আৰু বিন্দুসাৰে ইয়াক বিস্তাৰ কৰে। তেওঁৰ নাতি অশোকে ২৬১ খ্ৰীঃপূঃত কলিঙ্গ যুদ্ধ কৰি তাৰ পিছত ধৰ্মৰ পথ লয়, আৰু শিলা-স্তম্ভ অনুশাসনত নিজৰ নীতি লিপিবদ্ধ কৰে — প্ৰাচীন ভাৰতৰ আটাইতকৈ ভাল দস্তাবেজযুক্ত ৰাজত্ব।",
        "উত্তৰ-পশ্চিমত কুষাণসকলে ৰাজত্ব কৰিছিল, আৰু কনিষ্কৰ পৰা ৭৮ খ্ৰীষ্টাব্দত শক যুগ আৰম্ভ হয়। গংগা উপত্যকাত গুপ্তসকল আহে: চন্দ্ৰগুপ্ত প্ৰথমে প্ৰায় ৩১৯-৩২০ খ্ৰীষ্টাব্দত মহাৰাজাধিৰাজ উপাধি লয়, সমুদ্ৰগুপ্তৰ বিজয়সমূহ এলাহাবাদ স্তম্ভত লিখা আছে, আৰু চন্দ্ৰগুপ্ত দ্বিতীয় (বিক্ৰমাদিত্য) উজ্জয়িনীৰপৰা ৰাজত্ব কৰি কলা আৰু বিদ্যাৰ পৃষ্ঠপোষকতা কৰিছিল।",
      ]],
      ["সমাজ, অৰ্থনীতি আৰু ফান্দ", [
        "সমাজ বৰ্ণ ব্যৱস্থাৰে সংগঠিত আছিল, কিন্তু অৰ্থনীতি কৃষি, শিল্পী শ্ৰেণী আৰু দূৰ-বাণিজ্যৰ ওপৰত ঠিয় আছিল — গুটি-চিহ্নিত মুদ্ৰা, ৰোমান সোণ আৰু তাম্ৰলিপ্তিৰ দৰে বন্দৰই ই কিমান দূৰ বিস্তৃত আছিল দেখুৱায়। সংস্কৃত ৰাজদৰবাৰ আৰু শিলালিপিৰ ভাষা হৈ পৰে, আৰু ষষ্ঠ শতিকাৰ খ্ৰীঃপূঃত বৌদ্ধ আৰু জৈন ধৰ্ম সংস্কাৰ আন্দোলন হিচাপে গঢ় লয়।",
        "ফান্দ: হাৰপ্পা সভ্যতা বৈদিক নহয়, আৰু ইয়াৰ লিপি অপঠিত; কলিঙ্গ যুদ্ধ ২৬১ খ্ৰীঃপূঃ, ৩২১ নহয়; অশোকৰ ধৰ্ম ৰাজ্যিক বৌদ্ধ ধৰ্ম নহয়; গুপ্ত ‘সোণালী যুগ’ পিছৰ মূল্যায়ন আৰু বিতৰ্কিত; আৰু এলাহাবাদ স্তম্ভ শিলালিপি সমুদ্ৰগুপ্তৰ, অশোকৰ নহয়।",
      ]],
    ],
  },

  "topic/gk/indian-history/medieval-indian-history-sec/medieval-india": {
    mode: "both",
    en: [
      ["The Delhi Sultanate in five lines", [
        "Five dynasties ruled from Delhi between 1206 and 1526: the Mamluks or Slave dynasty of Qutb-ud-din Aibak, the Khaljis under Alauddin, the Tughlaqs under Muhammad bin Tughlaq and Firuz Shah, the Sayyids, and the Lodis, who fell to Babur at Panipat in 1526.",
        "The Sultanate left an administrative vocabulary that later states inherited: the iqta, a revenue assignment to an officer; the jagir, its later Mughal form; and a standing army paid from land revenue rather than from trade.",
      ]],
      ["The south and the regional kingdoms", [
        "In the south, Vijayanagara was founded in 1336 by Harihara and Bukka and reached its height under Krishnadevaraya (1509-1529), whose court was a centre of Telugu and Sanskrit literature. Its rivalry with the Bahmani Sultanate, founded in 1347, shaped Deccan politics for two centuries.",
        "In the east and west, Bengal, Gujarat, Malwa and the Rajput states developed their own courts, coinage and architecture. This is the period in which regional languages - Bengali, Marathi, Gujarati, Assamese - became literary languages, not just spoken ones.",
      ]],
      ["The Mughals and the traps", [
        "Babur won the First Battle of Panipat in 1526, Akbar consolidated the empire between 1556 and 1605 with the mansabdari system and Todar Mal's land revenue, and the empire reached its greatest extent under Aurangzeb. The Marathas under Shivaji, crowned in 1674, built the power that finally broke Mughal supremacy.",
        "Traps: First Panipat 1526 (Babur against Ibrahim Lodi), Second Panipat 1556 (Akbar's forces under Bairam Khan against Hemu), Third Panipat 1761 (Abdali against the Marathas). Akbar's Din-i-Ilahi dates from 1582, and the Taj Mahal belongs to Shah Jahan, not Akbar.",
      ]],
    ],
    as: [
      ["দিল্লী চুলতানী — পাঁচ শাৰীত", [
        "১২০৬ ৰপৰা ১৫২৬ লৈ দিল্লীৰপৰা পাঁচটা ৰাজবংশই ৰাজত্ব কৰিছিল: কুতুবুদ্দিন আইবকৰ দাস বংশ, আলাউদ্দিনৰ অধীনত খিলজী, মুহম্মদ বিন তুঘলক আৰু ফিৰোজ শাহৰ অধীনত তুঘলক, চৈয়দ, আৰু লোদী — যাৰ পতন ১৫২৬ চনত পানিপথত বাবৰৰ দ্বাৰা হয়।",
        "চুলতানীয়ে এনে প্ৰশাসনিক পৰিভাষা এৰি থৈ যায় যি পিছৰ ৰাজ্যই উত্তৰাধিকাৰী হিচাপে লয়: ইকতা (বিষয়াক দিয়া ৰাজহ-অধিকাৰ), তাৰ পিছৰ মোগল ৰূপ জাগিৰ, আৰু বাণিজ্যৰ নহয়, ভূমি-ৰাজহৰপৰা দৰমহা পোৱা স্থায়ী সেনা।",
      ]],
      ["দক্ষিণ আৰু আঞ্চলিক ৰাজ্য", [
        "দক্ষিণত হৰিহৰ আৰু বুক্কাই ১৩৩৬ চনত বিজয়নগৰ প্ৰতিষ্ঠা কৰে, আৰু কৃষ্ণদেৱৰায়ৰ (১৫০৯-১৫২৯) সময়ত ই শিখৰত উপনীত হয়; তেওঁৰ ৰাজদৰবাৰ তেলেগু আৰু সংস্কৃত সাহিত্যৰ কেন্দ্ৰ আছিল। ১৩৪৭ চনত প্ৰতিষ্ঠিত বাহমনী চুলতানীৰ সৈতে ইয়াৰ প্ৰতিদ্বন্দ্বিতাই দুশ বছৰ ধৰি দাক্ষিণাত্যৰ ৰাজনীতি নিৰ্ণয় কৰিছিল।",
        "পূব আৰু পশ্চিমত বংগ, গুজৰাট, মালৱা আৰু ৰাজপুত ৰাজ্যই নিজৰ ৰাজদৰবাৰ, মুদ্ৰা আৰু স্থাপত্য গঢ়ি তুলিছিল। এই কালতেই আঞ্চলিক ভাষা — বঙালী, মাৰাঠী, গুজৰাটী, অসমীয়া — কেৱল কথিত নহয়, সাহিত্যিক ভাষাও হৈ পৰে।",
      ]],
      ["মোগল আৰু ফান্দ", [
        "বাবৰে ১৫২৬ চনত প্ৰথম পানিপথ যুদ্ধত জয়ী হয়, আকবৰে ১৫৫৬-১৬০৫ চনৰ ভিতৰত মনসবদাৰী ব্যৱস্থা আৰু টোডৰমলৰ ভূমি-ৰাজহেৰে সাম্ৰাজ্য সংহত কৰে, আৰু ঔৰংজেৱৰ সময়ত সাম্ৰাজ্য আটাইতকৈ বিস্তৃত হয়। ১৬৭৪ চনত অভিষিক্ত শিৱাজীৰ অধীনত মাৰাঠাসকলে সেই শক্তি গঢ়ি তোলে যিয়ে শেষত মোগল প্ৰাধান্য ভাঙে।",
        "ফান্দ: প্ৰথম পানিপথ ১৫২৬ (বাবৰ বনাম ইব্ৰাহিম লোদী), দ্বিতীয় পানিপথ ১৫৫৬ (বৈৰাম খানৰ অধীনত আকবৰৰ বাহিনী বনাম হেমু), তৃতীয় পানিপথ ১৭৬১ (আব্দালী বনাম মাৰাঠা)। আকবৰৰ দিন-ই-ইলাহী ১৫৮২ চনৰ, আৰু তাজমহল শাহজাহানৰ, আকবৰৰ নহয়।",
      ]],
    ],
  },

  "topic/gk/indian-history/modern-indian-history-sec/freedom-struggle": {
    mode: "both",
    en: [
      ["1857 to 1885: revolt and organisation", [
        "The revolt of 1857 began with the greased cartridges at Meerut, spread through the Ganga valley, and was led in different places by Mangal Pandey, Rani Lakshmibai, Nana Saheb, Tantia Tope and Kunwar Singh, with Bahadur Shah II as the nominal head. It ended Company rule: in 1858 the Crown took over, and the army and administration were reorganised.",
        "Political organisation came next. The Indian National Congress was founded in 1885, with W. C. Bonnerjee as its first president and A. O. Hume as its organiser, and its early demands were constitutional - representation, taxation and the civil services.",
      ]],
      ["The Gandhian mass movements", [
        "The partition of Bengal in 1905 produced the Swadeshi movement and the boycott of British goods; the split at Surat in 1907 divided moderates and extremists, and the Lucknow Pact of 1916 reunited them. The Rowlatt Act and the Jallianwala Bagh massacre of 1919 turned Gandhi's attention to mass politics.",
        "The Non-Cooperation Movement ran from 1920 to 1922 and was suspended after Chauri Chaura. The Civil Disobedience Movement began with the Dandi march in 1930; the Government of India Act of 1935 followed the Round Table Conferences; and the Quit India Movement of 1942 was the last mass campaign before independence.",
      ]],
      ["Assam's part, and the traps", [
        "Assam entered national politics through the Assam Association of 1903 and the Assam Pradesh Congress Committee of 1921. Gopinath Bordoloi led the province through the Quit India years and, at the Cabinet Mission in 1946, argued successfully for Assam's place in India rather than in a Muslim-majority grouping.",
        "Traps: the Congress was founded in 1885, not 1884; Jallianwala Bagh is 1919; Dandi is 1930; Quit India is 1942; the partition of Bengal in 1905 was annulled in 1911; and the Indian Independence Act was passed in July 1947, with independence on 15 August.",
      ]],
    ],
    as: [
      ["১৮৫৭ ৰপৰা ১৮৮৫: বিদ্ৰোহ আৰু সংগঠন", [
        "১৮৫৭ চনৰ বিদ্ৰোহ মিৰাটৰ চৰ্বিযুক্ত কাৰ্তুজৰপৰা আৰম্ভ হৈ গংগা উপত্যকাত বিয়পি পৰে, আৰু বিভিন্ন ঠাইত মংগল পাণ্ডে, ৰাণী লক্ষ্মীবাঈ, নানা চাহেব, তান্তিয়া টোপে আৰু কুঁৱৰ সিঙে নেতৃত্ব দিয়ে; বাহাদুৰ শাহ দ্বিতীয় নামমাত্ৰ মুৰব্বী আছিল। ইয়াৰ ফলত কোম্পানীৰ শাসনৰ অন্ত পৰে: ১৮৫৮ চনত ব্ৰিটিছ ৰাজমুকুটে শাসনভাৰ লয় আৰু সেনা-প্ৰশাসন পুনৰ্গঠিত হয়।",
        "তাৰ পিছত ৰাজনৈতিক সংগঠন আহে। ১৮৮৫ চনত ভাৰতীয় জাতীয় কংগ্ৰেছ প্ৰতিষ্ঠিত হয়, প্ৰথম সভাপতি ডব্লিউ. চি. বেনাৰ্জী আৰু সংগঠক এ. অ’. হিউম; আৰম্ভণিৰ দাবীবোৰ সাংবিধানিক আছিল — প্ৰতিনিধিত্ব, কৰ আৰু অসামৰিক সেৱা।",
      ]],
      ["গান্ধীবাদী গণ-আন্দোলন", [
        "১৯০৫ চনৰ বংগ বিভাজনে স্বদেশী আন্দোলন আৰু ব্ৰিটিছ সামগ্ৰী বৰ্জনৰ সূচনা কৰে; ১৯০৭ চনৰ সূৰাট বিভাজনে মধ্যপন্থী আৰু উগ্ৰপন্থীক পৃথক কৰে, আৰু ১৯১৬ চনৰ লখনৌ চুক্তিয়ে তেওঁলোকক একত্ৰিত কৰে। ১৯১৯ চনৰ ৰাওলাট আইন আৰু জালিয়ানৱালাবাগৰ হত্যাকাণ্ডই গান্ধীজীক গণ-ৰাজনীতিলৈ টানি আনে।",
        "অসহযোগ আন্দোলন ১৯২০-১৯২২ চলি ছৌৰী চৌৰাৰ পিছত স্থগিত হয়। আইন অমান্য আন্দোলন ১৯৩০ চনত দাণ্ডী যাত্ৰাৰে আৰম্ভ হয়; গোলমেজ সন্মিলনৰ পিছত ১৯৩৫ চনৰ ভাৰত শাসন আইন আহে; আৰু ১৯৪২ চনৰ ভাৰত ছাড়ো আন্দোলন স্বাধীনতাৰ আগৰ শেষ গণ-অভিযান।",
      ]],
      ["অসমৰ ভূমিকা, আৰু ফান্দ", [
        "অসমে ১৯০৩ চনৰ অসম এছ’চিয়েশ্যন আৰু ১৯২১ চনৰ অসম প্ৰদেশ কংগ্ৰেছ কমিটিৰ জৰিয়তে জাতীয় ৰাজনীতিত প্ৰৱেশ কৰে। গোপীনাথ বৰদলৈয়ে ভাৰত ছাড়ো আন্দোলনৰ কালছোৱাত প্ৰদেশখনৰ নেতৃত্ব দিয়ে, আৰু ১৯৪৬ চনৰ কেবিনেট মিছনত অসমক মুছলমান সংখ্যাগৰিষ্ঠ গোটৰ পৰিৱৰ্তে ভাৰতত ৰখাৰ পক্ষে সফলভাৱে যুক্তি দিয়ে।",
        "ফান্দ: কংগ্ৰেছ ১৮৮৫ চনত, ১৮৮৪ নহয়; জালিয়ানৱালাবাগ ১৯১৯; দাণ্ডী ১৯৩০; ভাৰত ছাড়ো ১৯৪২; ১৯০৫ চনৰ বংগ বিভাজন ১৯১১ চনত বাতিল; আৰু ভাৰত স্বাধীনতা আইন ১৯৪৭ চনৰ জুলাইত গৃহীত হৈ ১৫ আগষ্টত স্বাধীনতা আহে।",
      ]],
    ],
  },

  /* Batch-2 top-ups: English only. */
  "topic/gk/geography/assam-geography-sec/brahmaputra-river": {
    mode: "en",
    en: [
      ["Floods, erosion and the yearly cycle", [
        "The Brahmaputra's flood season runs from June to September, when the monsoon adds to snowmelt from the Tibetan plateau. The river rises several metres, spreads over its sandbars and floods the lowlands, and each flood both deposits fresh silt and cuts away banks.",
        "Erosion is the slower disaster: entire villages and tea garden boundaries disappear into the channel each year, and Majuli has lost more than half its area in a century. Embankments protect some stretches but shift the problem downstream, which is why flood control in Assam is a political question as much as an engineering one.",
      ]],
    ],
  },
  "topic/gk/geography/assam-geography-sec/national-parks": {
    mode: "en",
    en: [
      ["Kaziranga in numbers", [
        "Kaziranga's rhino count rose from a few dozen in 1905 to more than 2,600 in the 2022 census, which is roughly two-thirds of the world's greater one-horned rhinos. The park is also a tiger reserve with one of the highest tiger densities in India, and it holds large populations of wild buffalo, swamp deer and elephants.",
        "Its conservation record is tied to the floodplain: annual flooding renews the grass, the grass feeds the herbivores, and the herbivores feed the tigers. The same flooding kills animals every year and forces them onto high ground and highways, which is the park's recurring crisis.",
      ]],
    ],
  },
  "topic/gk/geography/astronomical-geography-sec/solar-system": {
    mode: "en",
    en: [
      ["The Moon, eclipses and tides", [
        "The Moon is about 3,84,400 km away, takes 27.3 days to orbit the Earth and 29.5 days to complete a cycle of phases. It is locked to the Earth, so the same side always faces us.",
        "A solar eclipse happens at new moon, when the Moon passes between the Earth and the Sun; a lunar eclipse happens at full moon, when the Earth's shadow falls on the Moon. Tides are produced by the Moon's gravity, with the Sun adding to or subtracting from them at new and full moon - spring tides then, neap tides at the quarters.",
      ]],
    ],
  },
  "topic/science/biology/human-body": {
    mode: "en",
    en: [
      ["Blood, defence and the lymphatic system", [
        "Blood is plasma with red cells, white cells and platelets. Red cells carry oxygen with haemoglobin; five kinds of white cell fight infection; platelets and clotting factors seal wounds.",
        "The lymphatic system returns tissue fluid to the blood and is the body's defence network: lymph nodes filter pathogens, the spleen filters blood, and lymphocytes produced in bone marrow and the thymus provide immunity. Vaccination works by training these cells with a harmless form of the pathogen.",
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
    if (html.includes("<!-- axo-deep3:1 -->")) { report.push(`skip ${target}`); continue; }

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

    html = html.replace("</main>", "</main>\n<!-- axo-deep3:1 -->");
    if (!DRY) fs.writeFileSync(file, html);
    changed++;
    report.push(`ok ${target}`);
  }
}

console.log(report.join("\n"));
console.log(`pages deepened (batch 3): ${changed}`);
