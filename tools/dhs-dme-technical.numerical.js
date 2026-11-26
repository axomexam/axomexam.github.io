#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/dhs-dme-technical.numerical.js

   Question bank for the Numerical Aptitude section of the
   "DHS & DME Technical Grade III" book. build-dhs-dme-technical.js
   reads this through LEGACY_BANKS and files each item into its
   leaf with RULES["numerical-aptitude"].

   Every item carries a bilingual stem, four bilingual options and
   a bilingual explanation that shows the working, because the
   technical cadre is examined on method rather than recall.

   Assamese numerals (০-৯) are used inside Assamese text, matching
   the rest of the book.
   ============================================================ */

const Q = [];

function add(id, en, as, opts, correct, expEn, expAs) {
  Q.push({
    id,
    q: { en, as },
    options: opts.map(([oen, oas]) => ({ en: oen, as: oas })),
    correct,
    explanation: { en: expEn, as: expAs },
  });
}

/* ---- number-system ---- */
add("numerical-001",
  "The least number that must be added to 2497 to make it divisible by 5, 6 and 4 is",
  "২৪৯৭ ৰ লগত যোগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যাটো কিমান হ'লে সংখ্যাটো ৫, ৬ আৰু ৪ ৰে বিভাজ্য হ'ব",
  [["43", "৪৩"], ["23", "২৩"], ["47", "৪৭"], ["53", "৫৩"]], 1,
  "LCM of 5, 6 and 4 is 60. Dividing 2497 by 60 leaves remainder 37, so the next multiple is 2497 + (60 - 37) = 2520, which needs 23 added.",
  "৫, ৬ আৰু ৪ ৰ ল.সা.গু. ৬০। ২৪৯৭ ক ৬০ ৰে ভাগ কৰিলে ভাগশেষ ৩৭ থাকে, সেয়ে পৰৱৰ্তী গুণিতক ২৪৯৭ + (৬০ - ৩৭) = ২৫২০, অৰ্থাৎ ২৩ যোগ কৰিব লাগে।");

add("numerical-002",
  "The largest three-digit number that leaves a remainder of 4 when divided by 9 is",
  "৯ ৰে ভাগ কৰিলে ভাগশেষ ৪ ৰখা আটাইতকৈ ডাঙৰ তিনি অংকৰ সংখ্যাটো কি",
  [["994", "৯৯৪"], ["998", "৯৯৮"], ["985", "৯৮৫"], ["976", "৯৭৬"]], 0,
  "999 divided by 9 leaves 0, so 999 - 9 + 4 = 994. Check: 994 = 9 × 110 + 4.",
  "৯৯৯ ক ৯ ৰে ভাগ কৰিলে ভাগশেষ ০, সেয়ে ৯৯৯ - ৯ + ৪ = ৯৯৪। পৰীক্ষা: ৯৯৪ = ৯ × ১১০ + ৪।");

/* ---- simplification-bodmas ---- */
add("numerical-003",
  "The value of 12 ÷ 3 × 2 + 8 - 4 × 3 is",
  "১২ ÷ ৩ × ২ + ৮ - ৪ × ৩ ৰ মান কিমান",
  [["4", "৪"], ["8", "৮"], ["12", "১২"], ["20", "২০"]], 0,
  "Division and multiplication run left to right: 12 ÷ 3 = 4, 4 × 2 = 8. Then 4 × 3 = 12. So 8 + 8 - 12 = 4.",
  "ভাগ আৰু পূৰণ বাওঁফালৰপৰা সোঁফাললৈ: ১২ ÷ ৩ = ৪, ৪ × ২ = ৮। তাৰ পিছত ৪ × ৩ = ১২। সেয়ে ৮ + ৮ - ১২ = ৪।");

add("numerical-004",
  "Simplify: 5 + 3 × (8 - 6) ÷ 2 - 1",
  "সৰল কৰক: ৫ + ৩ × (৮ - ৬) ÷ ২ - ১",
  [["7", "৭"], ["9", "৯"], ["11", "১১"], ["13", "১৩"]], 0,
  "Bracket first: 8 - 6 = 2. Then 3 × 2 ÷ 2 = 3. So 5 + 3 - 1 = 7.",
  "প্ৰথমে বন্ধনী: ৮ - ৬ = ২। তাৰ পিছত ৩ × ২ ÷ ২ = ৩। সেয়ে ৫ + ৩ - ১ = ৭।");

/* ---- decimals-fractions ---- */
add("numerical-005",
  "The value of 0.6 × 0.6 + 0.4 × 0.4 - 2 × 0.6 × 0.4 is",
  "০.৬ × ০.৬ + ০.৪ × ০.৪ - ২ × ০.৬ × ০.৪ ৰ মান কিমান",
  [["0.04", "০.০৪"], ["0.4", "০.৪"], ["0.16", "০.১৬"], ["1", "১"]], 0,
  "The expression is a² + b² - 2ab = (a - b)² with a = 0.6 and b = 0.4. So (0.6 - 0.4)² = 0.2² = 0.04.",
  "ৰাশিটো a² + b² - 2ab = (a - b)², য'ত a = ০.৬ আৰু b = ০.৪। সেয়ে (০.৬ - ০.৪)² = ০.২² = ০.০৪।");

add("numerical-006",
  "Which fraction is the largest: 3/5, 5/8, 7/12, 9/16?",
  "কোনটো ভগ্নাংশ আটাইতকৈ ডাঙৰ: ৩/৫, ৫/৮, ৭/১২, ৯/১৬?",
  [["3/5", "৩/৫"], ["5/8", "৫/৮"], ["7/12", "৭/১২"], ["9/16", "৯/১৬"]], 1,
  "Convert to decimals: 0.600, 0.625, 0.583, 0.5625. The largest is 5/8 = 0.625.",
  "দশমিকলৈ ৰূপান্তৰ কৰক: ০.৬০০, ০.৬২৫, ০.৫৮৩, ০.৫৬২৫। আটাইতকৈ ডাঙৰ ৫/৮ = ০.৬২৫।");

/* ---- lcm-hcf ---- */
add("numerical-007",
  "The HCF of two numbers is 12 and their LCM is 336. If one number is 48, the other is",
  "দুটা সংখ্যাৰ গ.সা.গু. ১২ আৰু ল.সা.গু. ৩৩৬। এটা সংখ্যা ৪৮ হ'লে আনটো কিমান",
  [["72", "৭২"], ["84", "৮৪"], ["96", "৯৬"], ["108", "১০৮"]], 1,
  "For two numbers, HCF × LCM = product of the numbers. So the other number is (12 × 336) ÷ 48 = 4032 ÷ 48 = 84.",
  "দুটা সংখ্যাৰ ক্ষেত্ৰত গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটাৰ গুণফল। সেয়ে আনটো সংখ্যা = (১২ × ৩৩৬) ÷ ৪৮ = ৪০৩২ ÷ ৪৮ = ৮৪।");

add("numerical-008",
  "The least number which when divided by 12, 15 and 18 leaves a remainder of 5 in each case is",
  "১২, ১৫ আৰু ১৮ ৰে ভাগ কৰিলে প্ৰতিটো ক্ষেত্ৰতে ভাগশেষ ৫ ৰখা আটাইতকৈ সৰু সংখ্যাটো কি",
  [["185", "১৮৫"], ["175", "১৭৫"], ["365", "৩৬৫"], ["545", "৫৪৫"]], 0,
  "LCM of 12, 15, 18 is 180. The required number is 180 + 5 = 185.",
  "১২, ১৫, ১৮ ৰ ল.সা.গু. ১৮০। প্ৰয়োজনীয় সংখ্যা ১৮০ + ৫ = ১৮৫।");

/* ---- percentage ---- */
add("numerical-009",
  "A number is increased by 20% and then decreased by 20%. The net change is",
  "এটা সংখ্যা ২০% বঢ়াই তাৰ পিছত ২০% কমোৱা হ'ল। মুঠ পৰিৱৰ্তন কিমান",
  [["No change", "কোনো পৰিৱৰ্তন নাই"], ["4% decrease", "৪% হ্ৰাস"], ["4% increase", "৪% বৃদ্ধি"], ["2% decrease", "২% হ্ৰাস"]], 1,
  "Take 100. A 20% rise gives 120; a 20% fall on 120 gives 120 × 0.8 = 96. The net change is a 4% decrease.",
  "১০০ ধৰক। ২০% বৃদ্ধিত ১২০ হয়; ১২০ ৰ ওপৰত ২০% হ্ৰাসত ১২০ × ০.৮ = ৯৬। মুঠ পৰিৱৰ্তন ৪% হ্ৰাস।");

add("numerical-010",
  "In an examination 35% failed in Mathematics and 25% failed in English, while 10% failed in both. The percentage that passed in both subjects is",
  "এটা পৰীক্ষাত ৩৫% গণিতত অনুত্তীৰ্ণ আৰু ২৫% ইংৰাজীত অনুত্তীৰ্ণ, আৰু ১০% দুয়োটাতে অনুত্তীৰ্ণ। দুয়ো বিষয়তে উত্তীৰ্ণৰ শতকৰা হাৰ কিমান",
  [["40%", "৪০%"], ["50%", "৫০%"], ["60%", "৬০%"], ["70%", "৭০%"]], 1,
  "Failed in at least one subject = 35 + 25 - 10 = 50%. So those who passed in both = 100 - 50 = 50%.",
  "অন্তত এটা বিষয়ত অনুত্তীৰ্ণ = ৩৫ + ২৫ - ১০ = ৫০%। সেয়ে দুয়ো বিষয়তে উত্তীৰ্ণ = ১০০ - ৫০ = ৫০%।");

/* ---- ratio-proportion ---- */
add("numerical-011",
  "If a : b = 3 : 4 and b : c = 8 : 9, then a : c is",
  "যদি a : b = ৩ : ৪ আৰু b : c = ৮ : ৯, তেন্তে a : c কিমান",
  [["2 : 3", "২ : ৩"], ["3 : 4", "৩ : ৪"], ["8 : 9", "৮ : ৯"], ["1 : 2", "১ : ২"]], 0,
  "Make b common. a : b = 6 : 8 and b : c = 8 : 9, so a : b : c = 6 : 8 : 9 and a : c = 6 : 9 = 2 : 3.",
  "b ৰ মান একে কৰক। a : b = ৬ : ৮ আৰু b : c = ৮ : ৯, সেয়ে a : b : c = ৬ : ৮ : ৯ আৰু a : c = ৬ : ৯ = ২ : ৩।");

add("numerical-012",
  "₹4,200 is divided among A, B and C in the ratio 3 : 4 : 7. The share of C exceeds that of A by",
  "৪,২০০ টকা A, B আৰু C ৰ মাজত ৩ : ৪ : ৭ অনুপাতত ভগোৱা হ'ল। C ৰ অংশই A ৰ অংশতকৈ কিমান বেছি",
  [["₹840", "৮৪০ টকা"], ["₹1,200", "১,২০০ টকা"], ["₹1,260", "১,২৬০ টকা"], ["₹1,400", "১,৪০০ টকা"]], 0,
  "Total parts = 3 + 4 + 7 = 14, so one part = 4200 ÷ 14 = ₹300. C - A = 7 - 3 = 4 parts = 4 × 300 = ₹1,200.",
  "মুঠ অংশ = ৩ + ৪ + ৭ = ১৪, সেয়ে এভাগ = ৪২০০ ÷ ১৪ = ৩০০ টকা। C - A = ৭ - ৩ = ৪ ভাগ = ৪ × ৩০০ = ১,২০০ টকা।");

/* ---- average ---- */
add("numerical-013",
  "The average of 11 numbers is 60. If the average of the first six is 58 and of the last six is 63, the sixth number is",
  "১১ টা সংখ্যাৰ গড় ৬০। প্ৰথম ছয়টাৰ গড় ৫৮ আৰু শেষ ছয়টাৰ গড় ৬৩ হ'লে ষষ্ঠ সংখ্যাটো কিমান",
  [["66", "৬৬"], ["63", "৬৩"], ["60", "৬০"], ["72", "৭২"]], 0,
  "Sum of all 11 = 660. First six plus last six = 348 + 378 = 726, which counts the sixth number twice. So the sixth = 726 - 660 = 66.",
  "১১ টাৰ মুঠ যোগফল = ৬৬০। প্ৰথম ছয় আৰু শেষ ছয় = ৩৪৮ + ৩৭৮ = ৭২৬, য'ত ষষ্ঠ সংখ্যাটো দুবাৰ গণনা হয়। সেয়ে ষষ্ঠ = ৭২৬ - ৬৬০ = ৬৬।");

add("numerical-014",
  "The average age of a class of 30 students is 15 years. When the teacher joins, the average becomes 16 years. The teacher's age is",
  "৩০ জন ছাত্ৰৰ শ্ৰেণীৰ গড় বয়স ১৫ বছৰ। শিক্ষক যোগ দিলে গড় ১৬ বছৰ হয়। শিক্ষকৰ বয়স কিমান",
  [["46 years", "৪৬ বছৰ"], ["45 years", "৪৫ বছৰ"], ["31 years", "৩১ বছৰ"], ["48 years", "৪৮ বছৰ"]], 0,
  "Total age of students = 30 × 15 = 450. With the teacher, total = 31 × 16 = 496. Teacher's age = 496 - 450 = 46.",
  "ছাত্ৰৰ মুঠ বয়স = ৩০ × ১৫ = ৪৫০। শিক্ষকসহ মুঠ = ৩১ × ১৬ = ৪৯৬। শিক্ষকৰ বয়স = ৪৯৬ - ৪৫০ = ৪৬।");

/* ---- profit-loss-discount ---- */
add("numerical-015",
  "A shopkeeper marks an article 40% above cost and allows a discount of 25%. His profit percentage is",
  "এজন দোকানীয়ে এটা সামগ্ৰীৰ মূল্য ক্ৰয়মূল্যতকৈ ৪০% বেছি লিখি ২৫% ৰেহাই দিয়ে। তেওঁৰ লাভৰ শতকৰা হাৰ কিমান",
  [["5%", "৫%"], ["10%", "১০%"], ["15%", "১৫%"], ["20%", "২০%"]], 0,
  "Take cost ₹100. Marked price = ₹140. After a 25% discount the selling price is 140 × 0.75 = ₹105, so profit = 5%.",
  "ক্ৰয়মূল্য ১০০ টকা ধৰক। লিখিত মূল্য = ১৪০ টকা। ২৫% ৰেহাইৰ পিছত বিক্ৰয়মূল্য = ১৪০ × ০.৭৫ = ১০৫ টকা, সেয়ে লাভ ৫%।");

add("numerical-016",
  "By selling an article for ₹720 a man loses 10%. To gain 15% he must sell it for",
  "এটা সামগ্ৰী ৭২০ টকাত বিক্ৰী কৰি এজন লোকে ১০% লোকচান হয়। ১৫% লাভ কৰিবলৈ তেওঁ কিমানত বিক্ৰী কৰিব লাগিব",
  [["₹920", "৯২০ টকা"], ["₹900", "৯০০ টকা"], ["₹880", "৮৮০ টকা"], ["₹960", "৯৬০ টকা"]], 0,
  "Cost = 720 ÷ 0.90 = ₹800. For a 15% gain the selling price is 800 × 1.15 = ₹920.",
  "ক্ৰয়মূল্য = ৭২০ ÷ ০.৯০ = ৮০০ টকা। ১৫% লাভৰ বাবে বিক্ৰয়মূল্য = ৮০০ × ১.১৫ = ৯২০ টকা।");

/* ---- simple-interest ---- */
add("numerical-017",
  "A sum doubles itself in 8 years at simple interest. The rate of interest per annum is",
  "সৰল সুতত এটা ধন ৮ বছৰত দুগুণ হয়। বছৰি সুতৰ হাৰ কিমান",
  [["10%", "১০%"], ["12.5%", "১২.৫%"], ["15%", "১৫%"], ["8%", "৮%"]], 1,
  "Doubling means the interest equals the principal, so SI = P over 8 years. Using SI = PRT/100: P = P × R × 8 / 100, giving R = 100 ÷ 8 = 12.5%.",
  "দুগুণ হোৱাৰ অৰ্থ সুত = মূলধন, সেয়ে ৮ বছৰত সৰল সুত = P। সূত্ৰ SI = PRT/100 ৰপৰা P = P × R × ৮ / ১০০, সেয়ে R = ১০০ ÷ ৮ = ১২.৫%।");

add("numerical-018",
  "The simple interest on ₹6,000 for 2 years 6 months at 8% per annum is",
  "বছৰি ৮% হাৰত ৬,০০০ টকাৰ ২ বছৰ ৬ মাহৰ সৰল সুত কিমান",
  [["₹1,200", "১,২০০ টকা"], ["₹1,000", "১,০০০ টকা"], ["₹1,440", "১,৪৪০ টকা"], ["₹1,250", "১,২৫০ টকা"]], 0,
  "2 years 6 months is 2.5 years. SI = 6000 × 8 × 2.5 / 100 = ₹1,200.",
  "২ বছৰ ৬ মাহ = ২.৫ বছৰ। SI = ৬০০০ × ৮ × ২.৫ / ১০০ = ১,২০০ টকা।");

/* ---- compound-interest ---- */
add("numerical-019",
  "The difference between compound interest and simple interest on ₹10,000 for 2 years at 10% per annum is",
  "বছৰি ১০% হাৰত ১০,০০০ টকাৰ ২ বছৰৰ চক্ৰবৃদ্ধি সুত আৰু সৰল সুতৰ পাৰ্থক্য কিমান",
  [["₹100", "১০০ টকা"], ["₹50", "৫০ টকা"], ["₹200", "২০০ টকা"], ["₹110", "১১০ টকা"]], 0,
  "For 2 years the difference is P(R/100)² = 10000 × (0.10)² = ₹100. Directly: CI = ₹2,100 and SI = ₹2,000.",
  "২ বছৰৰ বাবে পাৰ্থক্য = P(R/100)² = ১০০০০ × (০.১০)² = ১০০ টকা। পোনপটীয়াকৈ: CI = ২,১০০ টকা আৰু SI = ২,০০০ টকা।");

add("numerical-020",
  "At what rate per annum will ₹5,000 amount to ₹6,050 in 2 years if interest is compounded annually?",
  "বছৰি কিমান হাৰত ৫,০০০ টকা ২ বছৰত ৬,০৫০ টকা হ'ব যদি সুত বছৰি চক্ৰবৃদ্ধি হয়",
  [["10%", "১০%"], ["12%", "১২%"], ["8%", "৮%"], ["15%", "১৫%"]], 0,
  "A/P = 6050/5000 = 1.21. Since (1 + R/100)² = 1.21, 1 + R/100 = 1.10 and R = 10%.",
  "A/P = ৬০৫০/৫০০০ = ১.২১। যিহেতু (১ + R/১০০)² = ১.২১, ১ + R/১০০ = ১.১০ আৰু R = ১০%।");

/* ---- partnership ---- */
add("numerical-021",
  "A invests ₹20,000 and B ₹30,000 in a business. After 6 months A withdraws half his capital. In what ratio should the year's profit be shared?",
  "এজন লোকে ২০,০০০ টকা আৰু B এ ৩০,০০০ টকা বিনিয়োগ কৰে। ৬ মাহৰ পিছত A এ নিজৰ মূলধনৰ আধা উলিয়াই লয়। বছৰটোৰ লাভ কোন অনুপাতত ভগাব লাগে",
  [["1 : 2", "১ : ২"], ["2 : 3", "২ : ৩"], ["5 : 6", "৫ : ৬"], ["3 : 4", "৩ : ৪"]], 0,
  "A's capital-months = 20000 × 6 + 10000 × 6 = 180000. B's = 30000 × 12 = 360000. Ratio 180000 : 360000 = 1 : 2.",
  "A ৰ মূলধন-মাহ = ২০০০০ × ৬ + ১০০০০ × ৬ = ১৮০০০০। B ৰ = ৩০০০০ × ১২ = ৩৬০০০০। অনুপাত ১৮০০০০ : ৩৬০০০০ = ১ : ২।");

add("numerical-022",
  "Three partners share profit in the ratio 5 : 3 : 2. If the third partner receives ₹4,000, the total profit is",
  "তিনিজন অংশীদাৰে ৫ : ৩ : ২ অনুপাতত লাভ ভগায়। তৃতীয়জনে ৪,০০০ টকা পাইলে মুঠ লাভ কিমান",
  [["₹20,000", "২০,০০০ টকা"], ["₹16,000", "১৬,০০০ টকা"], ["₹24,000", "২৪,০০০ টকা"], ["₹18,000", "১৮,০০০ টকা"]], 0,
  "Total parts = 10 and the third partner holds 2 parts = ₹4,000, so one part = ₹2,000. Total = 10 × 2000 = ₹20,000.",
  "মুঠ অংশ = ১০ আৰু তৃতীয়জনে ২ অংশ = ৪,০০০ টকা, সেয়ে এভাগ = ২,০০০ টকা। মুঠ = ১০ × ২০০০ = ২০,০০০ টকা।");

/* ---- mixture-alligation ---- */
add("numerical-023",
  "In what ratio must tea at ₹240 per kg be mixed with tea at ₹300 per kg to get a mixture worth ₹270 per kg?",
  "প্ৰতি কিলো ২৪০ টকাৰ চাহৰ লগত প্ৰতি কিলো ৩০০ টকাৰ চাহ কোন অনুপাতত মিহলাব লাগে যাতে মিশ্ৰণৰ মূল্য প্ৰতি কিলো ২৭০ টকা হয়",
  [["1 : 1", "১ : ১"], ["2 : 1", "২ : ১"], ["1 : 2", "১ : ২"], ["3 : 2", "৩ : ২"]], 0,
  "By alligation the cheaper is 270 - 240 = 30 above, and the dearer is 300 - 270 = 30 below. Ratio = 30 : 30 = 1 : 1.",
  "মিশ্ৰণ নিয়মে সস্তাটো ২৭০ - ২৪০ = ৩০ ওপৰত, আৰু দামটো ৩০০ - ২৭০ = ৩০ তলত। অনুপাত = ৩০ : ৩০ = ১ : ১।");

add("numerical-024",
  "A vessel holds 40 litres of milk. 4 litres are drawn out and replaced with water. This is done twice. The milk left is",
  "এটা পাত্ৰত ৪০ লিটাৰ গাখীৰ আছে। ৪ লিটাৰ উলিয়াই পানীৰে সলনি কৰা হয়। এই কাম দুবাৰ কৰা হ'ল। বাকী থকা গাখীৰ কিমান",
  [["32.4 litres", "৩২.৪ লিটাৰ"], ["36 litres", "৩৬ লিটাৰ"], ["30 litres", "৩০ লিটাৰ"], ["34 litres", "৩৪ লিটাৰ"]], 0,
  "Each operation leaves (1 - 4/40) = 0.9 of the milk. After two operations the milk is 40 × 0.9² = 40 × 0.81 = 32.4 litres.",
  "প্ৰতিবাৰ কাৰ্যৰ পিছত গাখীৰ (১ - ৪/৪০) = ০.৯ অংশ থাকে। দুবাৰৰ পিছত গাখীৰ = ৪০ × ০.৯² = ৪০ × ০.৮১ = ৩২.৪ লিটাৰ।");

/* ---- time-work ---- */
add("numerical-025",
  "A can do a work in 12 days and B in 18 days. Working together they finish it in",
  "A এ এটা কাম ১২ দিনত আৰু B এ ১৮ দিনত কৰিব পাৰে। একেলগে কাম কৰিলে তেওঁলোকে কিমান দিনত শেষ কৰিব",
  [["7.2 days", "৭.২ দিন"], ["6 days", "৬ দিন"], ["8 days", "৮ দিন"], ["7 days", "৭ দিন"]], 0,
  "One day's work = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 days.",
  "এদিনৰ কাম = ১/১২ + ১/১৮ = ৩/৩৬ + ২/৩৬ = ৫/৩৬। সময় = ৩৬/৫ = ৭.২ দিন।");

add("numerical-026",
  "A is twice as efficient as B and together they finish a work in 8 days. A alone would take",
  "A ৰ কাৰ্যক্ষমতা B ৰ দুগুণ আৰু একেলগে তেওঁলোকে ৮ দিনত কামটো শেষ কৰে। A অকলে কিমান দিন ল'ব",
  [["12 days", "১২ দিন"], ["16 days", "১৬ দিন"], ["24 days", "২৪ দিন"], ["10 days", "১০ দিন"]], 0,
  "Let B do 1 unit a day, then A does 2. Together 3 units a day finish the work in 8 days, so the work is 24 units. A alone takes 24 ÷ 2 = 12 days.",
  "B এ দিনে ১ একক কৰে ধৰক, তেন্তে A এ ২ একক। একেলগে দিনে ৩ একক, ৮ দিনত কাম শেষ, সেয়ে কাম = ২৪ একক। A অকলে ২৪ ÷ ২ = ১২ দিন।");

/* ---- pipes-cisterns ---- */
add("numerical-027",
  "Pipe A fills a tank in 6 hours and pipe B empties it in 9 hours. If both are opened together, the tank fills in",
  "পাইপ A এ এটা টেংকি ৬ ঘণ্টাত ভৰায় আৰু পাইপ B এ ৯ ঘণ্টাত খালী কৰে। দুয়ো একেলগে খুলিলে টেংকি কিমান সময়ত ভৰিব",
  [["18 hours", "১৮ ঘণ্টা"], ["15 hours", "১৫ ঘণ্টা"], ["12 hours", "১২ ঘণ্টা"], ["20 hours", "২০ ঘণ্টা"]], 0,
  "Net filling in one hour = 1/6 - 1/9 = 3/18 - 2/18 = 1/18. So the tank fills in 18 hours.",
  "এঘণ্টাত মুঠ ভৰা = ১/৬ - ১/৯ = ৩/১৮ - ২/১৮ = ১/১৮। সেয়ে টেংকি ১৮ ঘণ্টাত ভৰিব।");

add("numerical-028",
  "Two pipes A and B can fill a tank in 20 and 30 minutes. Both are opened, but A is closed after 8 minutes. The total time to fill the tank is",
  "দুটা পাইপ A আৰু B এ এটা টেংকি ২০ আৰু ৩০ মিনিটত ভৰাব পাৰে। দুয়ো খোলা হ'ল, কিন্তু ৮ মিনিটৰ পিছত A বন্ধ কৰা হ'ল। টেংকি ভৰিবলৈ মুঠ সময় কিমান",
  [["18 minutes", "১৮ মিনিট"], ["16 minutes", "১৬ মিনিট"], ["20 minutes", "২০ মিনিট"], ["22 minutes", "২২ মিনিট"]], 0,
  "In 8 minutes both fill 8(1/20 + 1/30) = 8 × 5/60 = 2/3. The remaining 1/3 is filled by B alone at 1/30 a minute, taking 10 minutes. Total = 18 minutes.",
  "৮ মিনিটত দুয়োৱে ভৰায় ৮(১/২০ + ১/৩০) = ৮ × ৫/৬০ = ২/৩। বাকী ১/৩ B এ অকলে ১/৩০ হাৰত ভৰায়, ১০ মিনিট লাগে। মুঠ = ১৮ মিনিট।");

/* ---- time-speed-distance ---- */
add("numerical-029",
  "A car covers a distance in 5 hours at 60 km/h. To cover the same distance in 4 hours its speed must be",
  "এখন গাড়ীয়ে ৬০ কিমি/ঘণ্টা বেগেৰে এটা দূৰত্ব ৫ ঘণ্টাত অতিক্ৰম কৰে। একেই দূৰত্ব ৪ ঘণ্টাত অতিক্ৰম কৰিবলৈ বেগ কিমান হ'ব লাগিব",
  [["75 km/h", "৭৫ কিমি/ঘণ্টা"], ["72 km/h", "৭২ কিমি/ঘণ্টা"], ["80 km/h", "৮০ কিমি/ঘণ্টা"], ["70 km/h", "৭০ কিমি/ঘণ্টা"]], 0,
  "Distance = 60 × 5 = 300 km. Speed for 4 hours = 300 ÷ 4 = 75 km/h.",
  "দূৰত্ব = ৬০ × ৫ = ৩০০ কিমি। ৪ ঘণ্টাৰ বাবে বেগ = ৩০০ ÷ ৪ = ৭৫ কিমি/ঘণ্টা।");

add("numerical-030",
  "A man walks at 5 km/h and reaches office 10 minutes late. At 6 km/h he reaches 5 minutes early. The distance to the office is",
  "এজন লোকে ৫ কিমি/ঘণ্টা বেগেৰে খোজ কাঢ়ি অফিচত ১০ মিনিট দেৰিকৈ পায়। ৬ কিমি/ঘণ্টা বেগেৰে ৫ মিনিট আগতীয়াকৈ পায়। অফিচলৈ দূৰত্ব কিমান",
  [["7.5 km", "৭.৫ কিমি"], ["6 km", "৬ কিমি"], ["8 km", "৮ কিমি"], ["9 km", "৯ কিমি"]], 0,
  "The time difference is 15 minutes = 1/4 hour. With distance d, d/5 - d/6 = 1/4, so d/30 = 1/4 and d = 7.5 km.",
  "সময়ৰ পাৰ্থক্য ১৫ মিনিট = ১/৪ ঘণ্টা। দূৰত্ব d হ'লে d/৫ - d/৬ = ১/৪, সেয়ে d/৩০ = ১/৪ আৰু d = ৭.৫ কিমি।");

/* ---- problems-on-trains ---- */
add("numerical-031",
  "A train 150 m long running at 54 km/h crosses a platform 250 m long in",
  "১৫০ মিটাৰ দীঘল এখন ৰে'লগাড়ীয়ে ৫৪ কিমি/ঘণ্টা বেগেৰে ২৫০ মিটাৰ দীঘল প্লেটফৰ্ম অতিক্ৰম কৰিবলৈ কিমান সময় ল'ব",
  [["26.67 seconds", "২৬.৬৭ ছেকেণ্ড"], ["24 seconds", "২৪ ছেকেণ্ড"], ["30 seconds", "৩০ ছেকেণ্ড"], ["20 seconds", "২০ ছেকেণ্ড"]], 0,
  "Speed = 54 × 5/18 = 15 m/s. Total distance = 150 + 250 = 400 m. Time = 400 ÷ 15 = 26.67 seconds.",
  "বেগ = ৫৪ × ৫/১৮ = ১৫ মি/ছেকেণ্ড। মুঠ দূৰত্ব = ১৫০ + ২৫০ = ৪০০ মি। সময় = ৪০০ ÷ ১৫ = ২৬.৬৭ ছেকেণ্ড।");

add("numerical-032",
  "Two trains of equal length 120 m run in opposite directions at 42 km/h and 30 km/h. They cross each other in",
  "সমান ১২০ মিটাৰ দীঘল দুখন ৰে'লগাড়ীয়ে বিপৰীত দিশত ৪২ কিমি/ঘণ্টা আৰু ৩০ কিমি/ঘণ্টা বেগেৰে গৈ থাকে। তেওঁলোকে ইটোৱে সিটোক কিমান সময়ত অতিক্ৰম কৰিব",
  [["12 seconds", "১২ ছেকেণ্ড"], ["10 seconds", "১০ ছেকেণ্ড"], ["14 seconds", "১৪ ছেকেণ্ড"], ["16 seconds", "১৬ ছেকেণ্ড"]], 0,
  "Relative speed = 42 + 30 = 72 km/h = 20 m/s. Total length = 240 m. Time = 240 ÷ 20 = 12 seconds.",
  "আপেক্ষিক বেগ = ৪২ + ৩০ = ৭২ কিমি/ঘণ্টা = ২০ মি/ছেকেণ্ড। মুঠ দীঘ = ২৪০ মি। সময় = ২৪০ ÷ ২০ = ১২ ছেকেণ্ড।");

/* ---- boats-streams ---- */
add("numerical-033",
  "A boat goes 24 km downstream and returns in 5 hours. If the speed of the stream is 2 km/h, the speed of the boat in still water is",
  "এখন নাওৱে ২৪ কিমি সোঁতৰ দিশত গৈ ৫ ঘণ্টাত ঘূৰি আহে। সোঁতৰ বেগ ২ কিমি/ঘণ্টা হ'লে স্থিৰ পানীত নাওখনৰ বেগ কিমান",
  [["10 km/h", "১০ কিমি/ঘণ্টা"], ["8 km/h", "৮ কিমি/ঘণ্টা"], ["12 km/h", "১২ কিমি/ঘণ্টা"], ["6 km/h", "৬ কিমি/ঘণ্টা"]], 0,
  "Let the still-water speed be b. Then 24/(b+2) + 24/(b-2) = 5, which simplifies to 5b² - 48b - 20 = 0. The positive root is b = 10 km/h.",
  "স্থিৰ পানীৰ বেগ b ধৰক। তেন্তে ২৪/(b+২) + ২৪/(b-২) = ৫, যি ৫b² - ৪৮b - ২০ = ০ লৈ সৰল হয়। ধনাত্মক মূল b = ১০ কিমি/ঘণ্টা।");

add("numerical-034",
  "The speed of a boat downstream is 15 km/h and upstream 9 km/h. The speed of the stream is",
  "সোঁতৰ দিশত নাওৰ বেগ ১৫ কিমি/ঘণ্টা আৰু সোঁতৰ বিপৰীত দিশত ৯ কিমি/ঘণ্টা। সোঁতৰ বেগ কিমান",
  [["3 km/h", "৩ কিমি/ঘণ্টা"], ["6 km/h", "৬ কিমি/ঘণ্টা"], ["12 km/h", "১২ কিমি/ঘণ্টা"], ["4 km/h", "৪ কিমি/ঘণ্টা"]], 0,
  "Stream speed = (downstream - upstream) ÷ 2 = (15 - 9) ÷ 2 = 3 km/h.",
  "সোঁতৰ বেগ = (সোঁতৰ দিশ - বিপৰীত দিশ) ÷ ২ = (১৫ - ৯) ÷ ২ = ৩ কিমি/ঘণ্টা।");

/* ---- problems-on-ages ---- */
add("numerical-035",
  "The present age of a father is three times his son's. After 12 years it will be twice. The son's present age is",
  "পিতৃৰ বৰ্তমান বয়স পুত্ৰৰ তিনিগুণ। ১২ বছৰৰ পিছত দুগুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স কিমান",
  [["12 years", "১২ বছৰ"], ["10 years", "১০ বছৰ"], ["14 years", "১৪ বছৰ"], ["16 years", "১৬ বছৰ"]], 0,
  "Let the son be x and the father 3x. Then 3x + 12 = 2(x + 12), giving x = 12.",
  "পুত্ৰৰ বয়স x আৰু পিতৃৰ ৩x ধৰক। তেন্তে ৩x + ১২ = ২(x + ১২), সেয়ে x = ১২।");

add("numerical-036",
  "A mother is 24 years older than her daughter. In 4 years she will be three times as old as the daughter. The daughter's present age is",
  "মাক এগৰাকী জীয়েকতকৈ ২৪ বছৰ ডাঙৰ। ৪ বছৰৰ পিছত তেওঁ জীয়েকৰ তিনিগুণ হ'ব। জীয়েকৰ বৰ্তমান বয়স কিমান",
  [["8 years", "৮ বছৰ"], ["10 years", "১০ বছৰ"], ["12 years", "১২ বছৰ"], ["6 years", "৬ বছৰ"]], 0,
  "Let the daughter be x, the mother x + 24. Then x + 24 + 4 = 3(x + 4), so x + 28 = 3x + 12 and x = 8.",
  "জীয়েকৰ বয়স x, মাকৰ x + ২৪ ধৰক। তেন্তে x + ২৪ + ৪ = ৩(x + ৪), সেয়ে x + ২৮ = ৩x + ১২ আৰু x = ৮।");

/* ---- elementary-algebra ---- */
add("numerical-037",
  "If x + 1/x = 3, the value of x² + 1/x² is",
  "যদি x + ১/x = ৩, তেন্তে x² + ১/x² ৰ মান কিমান",
  [["7", "৭"], ["9", "৯"], ["11", "১১"], ["6", "৬"]], 0,
  "Squaring both sides: (x + 1/x)² = x² + 2 + 1/x² = 9, so x² + 1/x² = 9 - 2 = 7.",
  "দুয়োপক্ষে বৰ্গ কৰক: (x + ১/x)² = x² + ২ + ১/x² = ৯, সেয়ে x² + ১/x² = ৯ - ২ = ৭।");

add("numerical-038",
  "If a + b = 10 and ab = 21, then a² + b² equals",
  "যদি a + b = ১০ আৰু ab = ২১, তেন্তে a² + b² ৰ মান কিমান",
  [["58", "৫৮"], ["79", "৭৯"], ["100", "১০০"], ["42", "৪২"]], 0,
  "a² + b² = (a + b)² - 2ab = 100 - 42 = 58.",
  "a² + b² = (a + b)² - ২ab = ১০০ - ৪২ = ৫৮।");

/* ---- quadratic-linear-equations ---- */
add("numerical-039",
  "The roots of x² - 7x + 12 = 0 are",
  "x² - ৭x + ১২ = ০ ৰ মূলবোৰ কি",
  [["3 and 4", "৩ আৰু ৪"], ["-3 and -4", "-৩ আৰু -৪"], ["2 and 6", "২ আৰু ৬"], ["1 and 12", "১ আৰু ১২"]], 0,
  "Factorising, x² - 7x + 12 = (x - 3)(x - 4) = 0, so x = 3 or x = 4. The sum 7 and product 12 both check.",
  "উৎপাদক বিশ্লেষণ কৰিলে x² - ৭x + ১২ = (x - ৩)(x - ৪) = ০, সেয়ে x = ৩ বা x = ৪। যোগফল ৭ আৰু গুণফল ১২ দুয়োটাই মিলে।");

add("numerical-040",
  "The solution of 2x + 3y = 12 and 3x + 2y = 13 is",
  "২x + ৩y = ১২ আৰু ৩x + ২y = ১৩ ৰ সমাধান কি",
  [["x = 3, y = 2", "x = ৩, y = ২"], ["x = 2, y = 3", "x = ২, y = ৩"], ["x = 4, y = 1", "x = ৪, y = ১"], ["x = 1, y = 4", "x = ১, y = ৪"]], 0,
  "Adding both equations gives 5x + 5y = 25, so x + y = 5. Subtracting gives y - x = 1. Solving, x = 3 and y = 2. Check: 6 + 6 = 12 and 9 + 4 = 13.",
  "দুয়ো সমীকৰণ যোগ কৰিলে ৫x + ৫y = ২৫, সেয়ে x + y = ৫। বিয়োগ কৰিলে y - x = ১। সমাধান কৰিলে x = ৩ আৰু y = ২। পৰীক্ষা: ৬ + ৬ = ১২ আৰু ৯ + ৪ = ১৩।");

/* ---- geometry ---- */
add("numerical-041",
  "The angles of a triangle are in the ratio 2 : 3 : 4. The largest angle is",
  "এটা ত্ৰিভুজৰ কোণবোৰ ২ : ৩ : ৪ অনুপাতত আছে। আটাইতকৈ ডাঙৰ কোণটো কিমান",
  [["80°", "৮০°"], ["60°", "৬০°"], ["90°", "৯০°"], ["72°", "৭২°"]], 0,
  "The sum is 180°, and the parts total 9, so one part is 20°. The largest is 4 × 20 = 80°.",
  "মুঠ ১৮০°, আৰু অংশৰ যোগফল ৯, সেয়ে এভাগ ২০°। আটাইতকৈ ডাঙৰ ৪ × ২০ = ৮০°।");

add("numerical-042",
  "The sum of the interior angles of a regular hexagon is",
  "এটা সুষম ষড়ভুজৰ অন্তঃকোণবোৰৰ যোগফল কিমান",
  [["720°", "৭২০°"], ["540°", "৫৪০°"], ["900°", "৯০০°"], ["360°", "৩৬০°"]], 0,
  "For an n-sided polygon the interior angles sum to (n - 2) × 180°. For a hexagon, (6 - 2) × 180 = 720°.",
  "n বাহুৰ বহুভুজৰ অন্তঃকোণৰ যোগফল (n - ২) × ১৮০°। ষড়ভুজৰ বাবে (৬ - ২) × ১৮০ = ৭২০°।");

/* ---- mensuration-2d ---- */
add("numerical-043",
  "The area of a circle of radius 7 cm is (take π = 22/7)",
  "৭ ছে.মি. ব্যাসাৰ্ধৰ বৃত্তৰ কালি কিমান (π = ২২/৭ ল'ব)",
  [["154 cm²", "১৫৪ বৰ্গ ছে.মি."], ["144 cm²", "১৪৪ বৰ্গ ছে.মি."], ["176 cm²", "১৭৬ বৰ্গ ছে.মি."], ["132 cm²", "১৩২ বৰ্গ ছে.মি."]], 0,
  "Area = πr² = (22/7) × 7 × 7 = 22 × 7 = 154 cm².",
  "কালি = πr² = (২২/৭) × ৭ × ৭ = ২২ × ৭ = ১৫৪ বৰ্গ ছে.মি.।");

add("numerical-044",
  "The perimeter of a rectangle is 46 m and its length is 15 m. Its area is",
  "এটা আয়তৰ পৰিসীমা ৪৬ মি. আৰু দীঘ ১৫ মি.। ইয়াৰ কালি কিমান",
  [["120 m²", "১২০ বৰ্গ মি."], ["150 m²", "১৫০ বৰ্গ মি."], ["105 m²", "১০৫ বৰ্গ মি."], ["135 m²", "১৩৫ বৰ্গ মি."]], 0,
  "Perimeter = 2(l + b) = 46, so l + b = 23 and b = 23 - 15 = 8 m. Area = 15 × 8 = 120 m².",
  "পৰিসীমা = ২(l + b) = ৪৬, সেয়ে l + b = ২৩ আৰু b = ২৩ - ১৫ = ৮ মি.। কালি = ১৫ × ৮ = ১২০ বৰ্গ মি.।");

/* ---- mensuration-3d ---- */
add("numerical-045",
  "The volume of a cylinder of radius 7 cm and height 10 cm is (take π = 22/7)",
  "৭ ছে.মি. ব্যাসাৰ্ধ আৰু ১০ ছে.মি. উচ্চতাৰ চুঙাৰ আয়তন কিমান (π = ২২/৭ ল'ব)",
  [["1540 cm³", "১৫৪০ ঘন ছে.মি."], ["1540 cm²", "১৫৪০ বৰ্গ ছে.মি."], ["440 cm³", "৪৪০ ঘন ছে.মি."], ["770 cm³", "৭৭০ ঘন ছে.মি."]], 0,
  "Volume = πr²h = (22/7) × 49 × 10 = 22 × 7 × 10 = 1540 cm³.",
  "আয়তন = πr²h = (২২/৭) × ৪৯ × ১০ = ২২ × ৭ × ১০ = ১৫৪০ ঘন ছে.মি.।");

add("numerical-046",
  "The total surface area of a cube of side 5 cm is",
  "৫ ছে.মি. বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি কিমান",
  [["150 cm²", "১৫০ বৰ্গ ছে.মি."], ["125 cm²", "১২৫ বৰ্গ ছে.মি."], ["100 cm²", "১০০ বৰ্গ ছে.মি."], ["25 cm²", "২৫ বৰ্গ ছে.মি."]], 0,
  "A cube has six equal square faces, so total surface area = 6a² = 6 × 25 = 150 cm². Note 125 cm³ is its volume, not its area.",
  "ঘনকৰ ছয়োটা সমান বৰ্গমুখ থাকে, সেয়ে মুঠ পৃষ্ঠকালি = ৬a² = ৬ × ২৫ = ১৫০ বৰ্গ ছে.মি.। মন কৰক ১২৫ ঘন ছে.মি. হ'ল আয়তন, কালি নহয়।");

/* ---- trigonometry ---- */
add("numerical-047",
  "The value of sin 30° + cos 60° is",
  "sin ৩০° + cos ৬০° ৰ মান কিমান",
  [["1", "১"], ["1/2", "১/২"], ["√3/2", "√৩/২"], ["0", "০"]], 0,
  "sin 30° = 1/2 and cos 60° = 1/2, so the sum is 1.",
  "sin ৩০° = ১/২ আৰু cos ৬০° = ১/২, সেয়ে যোগফল ১।");

add("numerical-048",
  "If tan θ = 3/4 and θ is acute, then sin θ is",
  "যদি tan θ = ৩/৪ আৰু θ সূক্ষ্মকোণ, তেন্তে sin θ কিমান",
  [["3/5", "৩/৫"], ["4/5", "৪/৫"], ["3/4", "৩/৪"], ["5/3", "৫/৩"]], 0,
  "With tan θ = opposite/adjacent = 3/4, the hypotenuse is √(9 + 16) = 5. So sin θ = 3/5.",
  "tan θ = বিপৰীত/সংলগ্ন = ৩/৪ ৰে অতিভুজ = √(৯ + ১৬) = ৫। সেয়ে sin θ = ৩/৫।");

/* ---- height-distance ---- */
add("numerical-049",
  "The angle of elevation of the top of a tower from a point 20 m away on level ground is 45°. The height of the tower is",
  "সমতল মাটিত ২০ মি. দূৰৰ এটা বিন্দুৰপৰা এটা টাৱাৰৰ শীৰ্ষৰ উন্নতি কোণ ৪৫°। টাৱাৰটোৰ উচ্চতা কিমান",
  [["20 m", "২০ মি."], ["10 m", "১০ মি."], ["20√3 m", "২০√৩ মি."], ["40 m", "৪০ মি."]], 0,
  "tan 45° = height / base = h / 20, and tan 45° = 1, so h = 20 m.",
  "tan ৪৫° = উচ্চতা / ভূমি = h / ২০, আৰু tan ৪৫° = ১, সেয়ে h = ২০ মি.।");

add("numerical-050",
  "From a point 60 m from the foot of a tower, the angle of elevation of its top is 30°. The height of the tower is",
  "টাৱাৰৰ পাদদেশৰপৰা ৬০ মি. দূৰৰ এটা বিন্দুৰপৰা শীৰ্ষৰ উন্নতি কোণ ৩০°। টাৱাৰটোৰ উচ্চতা কিমান",
  [["20√3 m", "২০√৩ মি."], ["60√3 m", "৬০√৩ মি."], ["30 m", "৩০ মি."], ["60 m", "৬০ মি."]], 0,
  "tan 30° = h / 60 = 1/√3, so h = 60/√3 = 20√3 ≈ 34.6 m.",
  "tan ৩০° = h / ৬০ = ১/√৩, সেয়ে h = ৬০/√৩ = ২০√৩ ≈ ৩৪.৬ মি.।");

/* ---- coordinate-geometry ---- */
add("numerical-051",
  "The distance between the points (0, 0) and (3, 4) is",
  "বিন্দু (০, ০) আৰু (৩, ৪) ৰ মাজৰ দূৰত্ব কিমান",
  [["5 units", "৫ একক"], ["7 units", "৭ একক"], ["25 units", "২৫ একক"], ["√7 units", "√৭ একক"]], 0,
  "Distance = √((3 - 0)² + (4 - 0)²) = √(9 + 16) = √25 = 5 units.",
  "দূৰত্ব = √((৩ - ০)² + (৪ - ০)²) = √(৯ + ১৬) = √২৫ = ৫ একক।");

add("numerical-052",
  "The midpoint of the line joining (2, 6) and (8, 4) is",
  "(২, ৬) আৰু (৮, ৪) সংযোগী ৰেখাৰ মধ্যবিন্দু কি",
  [["(5, 5)", "(৫, ৫)"], ["(10, 10)", "(১০, ১০)"], ["(6, 2)", "(৬, ২)"], ["(3, 1)", "(৩, ১)"]], 0,
  "Midpoint = ((2 + 8)/2, (6 + 4)/2) = (5, 5).",
  "মধ্যবিন্দু = ((২ + ৮)/২, (৬ + ৪)/২) = (৫, ৫)।");

/* ---- statistics ---- */
add("numerical-053",
  "The median of 3, 7, 9, 12, 15 is",
  "৩, ৭, ৯, ১২, ১৫ ৰ মধ্যমা কিমান",
  [["9", "৯"], ["12", "১২"], ["7", "৭"], ["10.5", "১০.৫"]], 0,
  "There are five values already in order, so the median is the third one, which is 9.",
  "পাঁচটা মান ইতিমধ্যে ক্ৰমত আছে, সেয়ে মধ্যমা তৃতীয়টো, অৰ্থাৎ ৯।");

add("numerical-054",
  "The mode of the data 2, 3, 3, 4, 5, 3, 6 is",
  "তথ্য ২, ৩, ৩, ৪, ৫, ৩, ৬ ৰ বহুলক কিমান",
  [["3", "৩"], ["4", "৪"], ["5", "৫"], ["6", "৬"]], 0,
  "The mode is the most frequent value. The value 3 occurs three times, more than any other, so the mode is 3.",
  "বহুলক হ'ল আটাইতকৈ বেছি বাৰ ঘটা মান। ৩ তিনিবাৰ আছে, আনটোতকৈ বেছি, সেয়ে বহুলক ৩।");

/* ---- data-interpretation ---- */
add("numerical-055",
  "A company's sales rose from ₹40 lakh to ₹50 lakh. The percentage increase is",
  "এটা কোম্পানীৰ বিক্ৰী ৪০ লাখ টকাৰপৰা ৫০ লাখ টকালৈ বাঢ়িল। শতকৰা বৃদ্ধি কিমান",
  [["25%", "২৫%"], ["20%", "২০%"], ["10%", "১০%"], ["30%", "৩০%"]], 0,
  "Increase = 10 lakh on a base of 40 lakh, so the percentage is (10/40) × 100 = 25%.",
  "বৃদ্ধি = ৪০ লাখৰ ভিত্তিত ১০ লাখ, সেয়ে শতকৰা = (১০/৪০) × ১০০ = ২৫%।");

add("numerical-056",
  "In a pie chart of 360°, a sector of 72° represents what fraction of the total?",
  "৩৬০° ৰ পাই চাৰ্টত ৭২° ৰ এটা খণ্ডই মুঠৰ কিমান ভগ্নাংশ বুজায়",
  [["1/5", "১/৫"], ["1/4", "১/৪"], ["1/6", "১/৬"], ["1/3", "১/৩"]], 0,
  "The fraction is 72/360 = 1/5, which is 20% of the whole.",
  "ভগ্নাংশ = ৭২/৩৬০ = ১/৫, যি গোটেইখিনিৰ ২০%।");

/* ---- permutation-combination ---- */
add("numerical-057",
  "The number of ways of selecting 3 persons out of 8 is",
  "৮ জনৰপৰা ৩ জন বাছনি কৰাৰ উপায়ৰ সংখ্যা কিমান",
  [["56", "৫৬"], ["336", "৩৩৬"], ["24", "২৪"], ["120", "১২০"]], 0,
  "Selection ignores order, so use 8C3 = (8 × 7 × 6)/(3 × 2 × 1) = 56. The value 336 would be 8P3, which counts arrangements.",
  "বাছনিত ক্ৰম নধৰা হয়, সেয়ে ৮C৩ = (৮ × ৭ × ৬)/(৩ × ২ × ১) = ৫৬। ৩৩৬ হ'ল ৮P৩, যি বিন্যাস গণনা কৰে।");

add("numerical-058",
  "The number of distinct arrangements of the letters of the word APPLE is",
  "APPLE শব্দটোৰ আখৰবোৰৰ পাৰ্থক্যপূৰ্ণ বিন্যাসৰ সংখ্যা কিমান",
  [["60", "৬০"], ["120", "১২০"], ["24", "২৪"], ["30", "৩০"]], 0,
  "There are five letters with P repeated twice, so the count is 5!/2! = 120/2 = 60.",
  "পাঁচটা আখৰৰ ভিতৰত P দুবাৰ আছে, সেয়ে গণনা ৫!/২! = ১২০/২ = ৬০।");

/* ---- probability ---- */
add("numerical-059",
  "Two dice are thrown together. The probability of getting a sum of 9 is",
  "দুটাকৈ পাশা একেলগে পেলোৱা হ'ল। যোগফল ৯ হোৱাৰ সম্ভাৱিতা কিমান",
  [["1/9", "১/৯"], ["1/6", "১/৬"], ["1/12", "১/১২"], ["5/36", "৫/৩৬"]], 0,
  "Sums of 9 come from (3,6), (4,5), (5,4) and (6,3), which is 4 outcomes out of 36. So the probability is 4/36 = 1/9.",
  "৯ ৰ যোগফল (৩,৬), (৪,৫), (৫,৪) আৰু (৬,৩) ৰপৰা হয়, অৰ্থাৎ ৩৬ ৰ ভিতৰত ৪ টা ফল। সেয়ে সম্ভাৱিতা ৪/৩৬ = ১/৯।");

add("numerical-060",
  "A card is drawn at random from a well-shuffled pack of 52 cards. The probability that it is a king is",
  "৫২ খন তাচৰ ভালদৰে মিহলোৱা পেকৰপৰা যাদৃচ্ছিকভাৱে এখন তাচ টনা হ'ল। সেয়া ৰজা হোৱাৰ সম্ভাৱিতা কিমান",
  [["1/13", "১/১৩"], ["1/4", "১/৪"], ["4/13", "৪/১৩"], ["1/52", "১/৫২"]], 0,
  "There are 4 kings in 52 cards, so the probability is 4/52 = 1/13.",
  "৫২ খন তাচত ৪ জন ৰজা আছে, সেয়ে সম্ভাৱিতা ৪/৫২ = ১/১৩।");

module.exports = { questions: Q };
