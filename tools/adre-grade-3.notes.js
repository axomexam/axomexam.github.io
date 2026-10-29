#!/usr/bin/env node
"use strict";

/* Per-topic bilingual study notes for the ADRE 3.0 Grade III book.
   Keyed by leaf sub-category id. Rendered into the crawler-facing
   article block of every topic page by tools/build-adre-grade-3.js. */

module.exports = {
"number-system": {
  h2: { en: "Number System", as: "সংখ্যা পদ্ধতি" },
  p: {
    en: [
      "The number system is the foundation of every other chapter of General Mathematics, and in the ADRE Grade III paper it is tested through short, direct questions rather than long calculations. A candidate who is comfortable with the families of numbers, the place value of a digit and the divisibility rules saves time on every later chapter.",
      "Numbers are grouped into natural numbers, whole numbers, integers, rational numbers and irrational numbers. Natural numbers begin at one, whole numbers begin at zero, and integers add the negative counting numbers. A rational number can be written as a fraction of two integers, while an irrational number such as the square root of two cannot."
    ],
    as: [
      "সংখ্যা পদ্ধতি হৈছে সাধাৰণ গণিতৰ প্ৰতিটো অধ্যায়ৰ ভেটি, আৰু ADRE গ্ৰেড III পত্ৰত ইয়াক চুটি আৰু পোনপটীয়া প্ৰশ্নৰ জৰিয়তে সোধা হয়, দীঘল গণনাৰ জৰিয়তে নহয়। যি প্ৰাৰ্থীয়ে সংখ্যাৰ পৰিয়াল, এটা অংকৰ স্থানীয় মান আৰু বিভাজ্যতাৰ নিয়মত সাচ্ছন্দ্য অনুভৱ কৰে তেওঁ পিছৰ প্ৰতিটো অধ্যায়ত সময় সাঁচে।",
      "সংখ্যাবোৰক স্বাভাৱিক সংখ্যা, পূৰ্ণসংখ্যা, অখণ্ড সংখ্যা, পৰিমেয় সংখ্যা আৰু অপৰিমেয় সংখ্যা হিচাপে ভাগ কৰা হয়। স্বাভাৱিক সংখ্যা একৰ পৰা আৰম্ভ হয়, পূৰ্ণসংখ্যা শূন্যৰ পৰা, আৰু অখণ্ড সংখ্যাত ঋণাত্মক গণনা সংখ্যা যোগ হয়। এটা পৰিমেয় সংখ্যাক দুটা অখণ্ড সংখ্যাৰ ভগ্নাংশ হিচাপে লিখিব পাৰি, আনহাতে দুইৰ বৰ্গমূলৰ দৰে অপৰিমেয় সংখ্যাক লিখিব নোৱাৰি।"
    ]
  },
  list: {
    en: ["Natural numbers begin at one and whole numbers begin at zero.", "The smallest prime number is two and it is the only even prime.", "One is neither prime nor composite because it has only one factor.", "Divisibility by three and by nine is checked by the sum of the digits."],
    as: ["স্বাভাৱিক সংখ্যা একৰ পৰা আৰম্ভ হয় আৰু পূৰ্ণসংখ্যা শূন্যৰ পৰা।", "আটাইতকৈ সৰু মৌলিক সংখ্যা দুই, আৰু ই একমাত্ৰ যুগ্ম মৌলিক সংখ্যা।", "এক মৌলিকও নহয় যৌগিকও নহয়, কাৰণ ইয়াৰ কেৱল এটা উৎপাদক আছে।", "তিনি আৰু নয়ৰ দ্বাৰা বিভাজ্যতা অংকসমূহৰ যোগফলৰ দ্বাৰা পৰীক্ষা কৰা হয়।"]
  },
  faqs: [
    { q: { en: "What is the difference between place value and face value?", as: "স্থানীয় মান আৰু অভিহিত মানৰ পাৰ্থক্য কি?" },
      a: { en: "The face value of a digit is the digit itself; the place value is the digit multiplied by the value of its position. In 5060 the face value of five is five but its place value is five thousand.", as: "এটা অংকৰ অভিহিত মান হৈছে অংকটো নিজেই; স্থানীয় মান হৈছে অংকটোৰ স্থানৰ মানৰ সৈতে অংকটোৰ গুণফল। 5060 ত পাঁচৰ অভিহিত মান পাঁচ, কিন্তু স্থানীয় মান পাঁচ হাজাৰ।" } }
  ]
},
"simplification-fractions": {
  h2: { en: "Simplification", as: "সৰলীকৰণ" },
  p: {
    en: ["Simplification tests whether a candidate can reduce a mixed expression to a single value in the correct order of operations. The order is remembered by the word BODMAS: brackets first, then orders or powers, then division and multiplication from left to right, and finally addition and subtraction from left to right.", "Most mistakes in this chapter come from skipping a bracket or from dividing before multiplying. Since ADRE Grade III sets several short simplification questions, a steady and careful method scores better than a hurried one."],
    as: ["সৰলীকৰণে পৰীক্ষা কৰে যে এজন প্ৰাৰ্থীয়ে শুদ্ধ ক্ৰমত এটা মিশ্ৰ ৰাশিক এটা মানলৈ ৰূপান্তৰ কৰিব পাৰে নে নাই। ক্ৰমটো BODMAS শব্দৰ দ্বাৰা মনত ৰখা হয়: প্ৰথমে বন্ধনী, তাৰ পিছত ঘাত, তাৰ পিছত বাওঁৰ পৰা সোঁলৈ হৰণ আৰু পূৰণ, আৰু শেষত বাওঁৰ পৰা সোঁলৈ যোগ আৰু বিয়োগ।", "এই অধ্যায়ৰ বেছিভাগ ভুল এটা বন্ধনী এৰি যোৱাৰ পৰা বা পূৰণৰ আগতে হৰণ কৰাৰ পৰা হয়। ADRE গ্ৰেড III-এ কেইবাটাও চুটি সৰলীকৰণ প্ৰশ্ন সোধে, গতিকে খৰধৰ নহৈ এটা স্থিৰ আৰু সাৱধান পদ্ধতিয়ে বেছি নম্বৰ আনে।"]
  },
  list: {
    en: ["BODMAS stands for Bracket, Of, Division, Multiplication, Addition and Subtraction.", "Work from the innermost bracket outwards.", "Division and multiplication have the same rank, so read from left to right.", "A fraction is simplified by taking the LCM of the denominators."],
    as: ["BODMAS ৰ অৰ্থ — বন্ধনী, ৰ (Of), হৰণ, পূৰণ, যোগ আৰু বিয়োগ।", "আটাইতকৈ ভিতৰৰ বন্ধনীৰ পৰা বাহিৰলৈ কাম কৰক।", "হৰণ আৰু পূৰণৰ সমান স্থান, গতিকে বাওঁৰ পৰা সোঁলৈ পঢ়ক।", "ভগ্নাংশৰ হৰসমূহৰ ল.সা.গু. লৈ ভগ্নাংশ সৰল কৰা হয়।"]
  },
  faqs: [
    { q: { en: "Which operation is done first in an expression?", as: "এটা ৰাশিত প্ৰথমে কোনটো ক্ৰিয়া কৰা হয়?" },
      a: { en: "The bracket is removed first, then the power, then division and multiplication, and addition and subtraction at the end.", as: "প্ৰথমে বন্ধনী আঁতৰোৱা হয়, তাৰ পিছত ঘাত, তাৰ পিছত হৰণ আৰু পূৰণ, আৰু শেষত যোগ আৰু বিয়োগ।" } }
  ]
},
"lcm-hcf": {
  h2: { en: "LCM & HCF", as: "ল.সা.গু. আৰু গ.সা.উ." },
  p: {
    en: ["The highest common factor and the lowest common multiple are asked in almost every Assam recruitment paper. The HCF is the largest number that divides each of the given numbers exactly, and the LCM is the smallest number that each of them divides exactly.", "For two numbers the product of the HCF and the LCM equals the product of the numbers, which is a useful check. Prime factorisation or the division method gives both values quickly once the multiplication tables are known."],
    as: ["গৰিষ্ঠ সাধাৰণ উৎপাদক আৰু লঘিষ্ঠ সাধাৰণ গুণিতক প্ৰায় প্ৰতিটো অসম নিয়োগ পত্ৰত সোধা হয়। গ.সা.উ. হৈছে সেই আটাইতকৈ ডাঙৰ সংখ্যা যি প্ৰদত্ত প্ৰতিটো সংখ্যাক সম্পূৰ্ণৰূপে ভাগ কৰে, আৰু ল.সা.গু. হৈছে সেই আটাইতকৈ সৰু সংখ্যা যাক প্ৰতিটোৱে সম্পূৰ্ণৰূপে ভাগ কৰে।", "দুটা সংখ্যাৰ ক্ষেত্ৰত গ.সা.উ. আৰু ল.সা.গু.ৰ গুণফল সংখ্যা দুটাৰ গুণফলৰ সমান, যি এটা কামৰ পৰীক্ষা। পূৰণৰ টেবুল জনা থাকিলে মৌলিক উৎপাদকলৈ ভাঙি বা ভাগ পদ্ধতিৰে দুয়োটা মান দ্ৰুতভাৱে পোৱা যায়।"]
  },
  list: {
    en: ["The HCF divides the given numbers; the LCM is divisible by them.", "The HCF of two co-prime numbers is one.", "The LCM of two co-prime numbers is their product.", "HCF multiplied by LCM equals the product of the two numbers."],
    as: ["গ.সা.উ.য়ে প্ৰদত্ত সংখ্যাবোৰক ভাগ কৰে; ল.সা.গু. তেওঁলোকৰ দ্বাৰা বিভাজ্য।", "দুটা সহ-মৌলিক সংখ্যাৰ গ.সা.উ. এক।", "দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. তেওঁলোকৰ গুণফল।", "গ.সা.উ. ৰ ল.সা.গু.ৰ সৈতে গুণফল সংখ্যা দুটাৰ গুণফলৰ সমান।"]
  },
  faqs: [
    { q: { en: "What is the LCM of two co-prime numbers?", as: "দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. কিমান?" },
      a: { en: "When two numbers have no common factor other than one, their LCM is simply the product of the two numbers.", as: "যেতিয়া দুটা সংখ্যাৰ একৰ বাহিৰে সাধাৰণ উৎপাদক নাথাকে, তেতিয়া তেওঁলোকৰ ল.সা.গু. সংখ্যা দুটাৰ গুণফল।" } }
  ]
},
"percentage": {
  h2: { en: "Percentage", as: "শতাংশ" },
  p: {
    en: ["Percentage expresses a quantity as a part of one hundred and it appears in profit and loss, interest and data interpretation. A percentage can be changed into a fraction by writing it over one hundred and reducing it to its lowest terms.", "Successive changes are not added directly. A rise of ten per cent followed by a fall of ten per cent does not return to the original value, and questions built on this idea are common in the examination."],
    as: ["শতাংশই এটা ৰাশিক এশৰ ভগ্নাংশ হিচাপে প্ৰকাশ কৰে আৰু লাভ-ক্ষতি, সুত আৰু তথ্য বিশ্লেষণত দেখা যায়। এটা শতাংশক এশৰ ওপৰত লিখি লঘিষ্ঠ ৰূপলৈ সৰল কৰি ভগ্নাংশলৈ ৰূপান্তৰ কৰিব পাৰি।", "ক্ৰমিক পৰিৱৰ্তনবোৰ পোনপটীয়াকৈ যোগ কৰা নহয়। দহ শতাংশ বৃদ্ধিৰ পিছত দহ শতাংশ হ্ৰাস হ'লে মূল মানলৈ ঘূৰি নাহে, আৰু এই ধাৰণাৰ প্ৰশ্ন পৰীক্ষাত সাধাৰণ।"]
  },
  list: {
    en: ["To find x per cent of a number, multiply the number by x/100.", "A rise and a fall of the same per cent never cancel out.", "To increase by x per cent, multiply by (100 + x)/100.", "Percentage change equals change divided by the original, multiplied by one hundred."],
    as: ["এটা সংখ্যাৰ x শতাংশ বিচাৰিবলৈ সংখ্যাটোক x/100 ৰে পূৰণ কৰক।", "একে শতাংশৰ বৃদ্ধি আৰু হ্ৰাস কেতিয়াও নিষ্কাশন নহয়।", "x শতাংশ বৃদ্ধি কৰিবলৈ (100 + x)/100 ৰে পূৰণ কৰক।", "শতাংশ পৰিৱৰ্তন হৈছে পৰিৱৰ্তনক মূলৰে ভাগ কৰি এশৰে পূৰণ কৰা মান।"]
  },
  faqs: [
    { q: { en: "A price rises by 20 per cent. By what per cent must consumption fall to keep the expenditure the same?", as: "দাম ২০ শতাংশ বৃদ্ধি হ'লে খৰচ একে ৰাখিবলৈ ব্যৱহাৰ কিমান শতাংশ কমাব লাগিব?" },
      a: { en: "The fall is 20 divided by 120 and multiplied by 100, which is about 16.67 per cent. The reduction is calculated on the new, larger price.", as: "হ্ৰাস 20 ক 120 ৰে ভাগ কৰি 100 ৰে পূৰণ কৰিলে প্ৰায় ১৬.৬৭ শতাংশ। হ্ৰাস নতুন, ডাঙৰ দামৰ ওপৰত হিচাপ কৰা হয়।" } }
  ]
},
"ratio-proportion": {
  h2: { en: "Ratio & Proportion", as: "অনুপাত আৰু সমানুপাত" },
  p: {
    en: ["A ratio compares two quantities of the same kind, and a proportion states that two ratios are equal. In a direct proportion both quantities increase together, while in an inverse proportion one increases as the other decreases.", "Ratio questions are usually solved by taking a common multiplier. If two numbers are in the ratio three to five, write them as three x and five x, then use the extra information to find x."],
    as: ["অনুপাতএ একে ধৰণৰ দুটা ৰাশিৰ তুলনা কৰে, আৰু সমানুপাতএ কয় যে দুটা অনুপাত সমান। প্ৰত্যক্ষ সমানুপাতত দুয়োটা ৰাশি একেলগে বাঢ়ে, আনহাতে ব্যস্ত সমানুপাতত এটা বঢ়াৰ লগে লগে আনটো কমে।", "অনুপাতৰ প্ৰশ্ন সাধাৰণতে এটা সাধাৰণ গুণক লৈ সমাধান কৰা হয়। দুটা সংখ্যা তিনিৰ অনুপাত পাঁচ হ'লে, তেওঁলোকক তিনি x আৰু পাঁচ x হিচাপে লিখি, অতিৰিক্ত তথ্যৰ পৰা x উলিয়াওক।"]
  },
  list: {
    en: ["A ratio has no unit and is written in its lowest terms.", "In a direct proportion, more of one means more of the other.", "In an inverse proportion, more of one means less of the other.", "In a proportion the product of the extremes equals the product of the means."],
    as: ["অনুপাতৰ কোনো একক নাই আৰু ইয়াক লঘিষ্ঠ ৰূপত লিখা হয়।", "প্ৰত্যক্ষ সমানুপাতত এটা বেছি হ'লে আনটোও বেছি হয়।", "ব্যস্ত সমানুপাতত এটা বেছি হ'লে আনটো কম হয়।", "সমানুপাতত প্ৰান্ত দুটাৰ গুণফল মধ্য দুটাৰ গুণফলৰ সমান।"]
  },
  faqs: [
    { q: { en: "How do you divide a quantity in a given ratio?", as: "এটা ৰাশিক প্ৰদত্ত অনুপাতত কেনেকৈ ভাগ কৰিব?" },
      a: { en: "Add the parts of the ratio to get the total number of parts, divide the quantity by that total, and then multiply each share by its own part.", as: "অনুপাতৰ অংশবোৰ যোগ কৰি মুঠ অংশ পোৱা যায়, ৰাশিক সেই মুঠেৰে ভাগ কৰক, আৰু তাৰ পিছত প্ৰতিটো অংশক নিজৰ অংশৰে পূৰণ কৰক।" } }
  ]
},
"average": {
  h2: { en: "Average", as: "গড়" },
  p: {
    en: ["The average of a set of values is the sum of the values divided by their number. It is also called the arithmetic mean and it stands for the value each item would have if the total were shared equally among them.", "When a new value is added to a set, the new average lies between the old average and the new value. This idea solves most average questions without setting up equations."],
    as: ["কেইটামান মানৰ গড় হৈছে মানবোৰৰ সমষ্টিক তেওঁলোকৰ সংখ্যাৰে ভাগ কৰি পোৱা মান। ইয়াক সমান্তৰ মধ্যকো বোলা হয় আৰু মুঠ সমানে ভাগ কৰিলে প্ৰতিটোৱে পোৱা মান বুজায়।", "এটা নতুন মান যোগ কৰিলে নতুন গড় পুৰণি গড় আৰু নতুন মানৰ মাজত থাকে। এই ধাৰণাই সমীকৰণ নসজাই বেছিভাগ গড়ৰ প্ৰশ্ন সমাধান কৰে।"]
  },
  list: {
    en: ["Average equals the sum of the values divided by the number of values.", "The average of the first n natural numbers is (n + 1) divided by 2.", "If every value is increased by k, the average increases by k.", "The average always lies between the smallest and the largest value."],
    as: ["গড় হৈছে মানবোৰৰ সমষ্টিক মানবোৰৰ সংখ্যাৰে ভাগ কৰা মান।", "প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ গড় (n + 1) ক 2 ৰে ভাগ কৰা মান।", "প্ৰতিটো মান k ৰে বঢ়ালে গড়ো k ৰে বাঢ়ে।", "গড় সদায় আটাইতকৈ সৰু আৰু আটাইতকৈ ডাঙৰ মানৰ মাজত থাকে।"]
  },
  faqs: [
    { q: { en: "What happens to the average when a value larger than the average is added?", as: "গড়তকৈ ডাঙৰ এটা মান যোগ কৰিলে গড়ৰ কি হয়?" },
      a: { en: "The average rises, but it rises only a little because the new value is shared among all the items.", as: "গড় বাঢ়ে, কিন্তু অলপহে বাঢ়ে, কাৰণ নতুন মানটো আটাইবোৰৰ মাজত ভাগ হয়।" } }
  ]
},
"profit-loss": {
  h2: { en: "Profit & Loss", as: "লাভ আৰু ক্ষতি" },
  p: {
    en: ["Profit and loss questions compare the cost price with the selling price. When the selling price is greater than the cost price there is a profit, and when it is less there is a loss, and both are usually expressed as a percentage of the cost price.", "Discount, on the other hand, is always calculated on the marked price. Confusing the cost price with the marked price is the most common mistake in this chapter."],
    as: ["লাভ আৰু ক্ষতিৰ প্ৰশ্নই ক্ৰয়মূল্যৰ সৈতে বিক্ৰয়মূল্যৰ তুলনা কৰে। বিক্ৰয়মূল্য ক্ৰয়মূল্যতকৈ বেছি হ'লে লাভ, আৰু কম হ'লে ক্ষতি, আৰু দুয়োটা সাধাৰণতে ক্ৰয়মূল্যৰ শতাংশ হিচাপে প্ৰকাশ কৰা হয়।", "আনহাতে, ৰেহাই সদায় চিহ্নিত মূল্যৰ ওপৰত হিচাপ কৰা হয়। ক্ৰয়মূল্যক চিহ্নিত মূল্য বুলি ভুল কৰাটো এই অধ্যায়ৰ আটাইতকৈ সাধাৰণ ভুল।"]
  },
  list: {
    en: ["Profit equals the selling price minus the cost price.", "Profit per cent is profit divided by the cost price, multiplied by one hundred.", "Loss per cent is also calculated on the cost price.", "Discount is always calculated on the marked price."],
    as: ["লাভ হৈছে বিক্ৰয়মূল্যৰ পৰা ক্ৰয়মূল্য বিয়োগ কৰা মান।", "লাভ শতাংশ হৈছে লাভক ক্ৰয়মূল্যৰে ভাগ কৰি এশৰে পূৰণ কৰা মান।", "ক্ষতি শতাংশও ক্ৰয়মূল্যৰ ওপৰত হিচাপ কৰা হয়।", "ৰেহাই সদায় চিহ্নিত মূল্যৰ ওপৰত হিচাপ কৰা হয়।"]
  },
  faqs: [
    { q: { en: "Is profit per cent calculated on the cost price or the selling price?", as: "লাভ শতাংশ ক্ৰয়মূল্যৰ ওপৰত নে বিক্ৰয়মূল্যৰ ওপৰত হিচাপ কৰা হয়?" },
      a: { en: "Unless the question says otherwise, profit per cent and loss per cent are always calculated on the cost price.", as: "প্ৰশ্নত আন কথা নক'লে, লাভ শতাংশ আৰু ক্ষতি শতাংশ সদায় ক্ৰয়মূল্যৰ ওপৰত হিচাপ কৰা হয়।" } }
  ]
},
"simple-compound-interest": {
  h2: { en: "Simple & Compound Interest", as: "সৰল সুত আৰু চক্ৰবৃদ্ধি সুত" },
  p: {
    en: ["Simple interest is calculated only on the original principal for the whole period, while compound interest is calculated on the principal plus the interest already added. This is why compound interest grows faster over a period of more than one year.", "The two amounts are equal for the first year and they differ from the second year onwards. Questions often ask for that difference."],
    as: ["সৰল সুত সমগ্ৰ সময়ছোৱাৰ বাবে কেৱল মূলধনৰ ওপৰত হিচাপ কৰা হয়, আনহাতে চক্ৰবৃদ্ধি সুত মূলধন আৰু যোগ হোৱা সুতৰ ওপৰত হিচাপ কৰা হয়। এই কাৰণেই এক বছৰতকৈ বেছি সময়ত চক্ৰবৃদ্ধি সুত দ্ৰুতভাৱে বাঢ়ে।", "প্ৰথম বছৰত দুয়োটা সমান, আৰু দ্বিতীয় বছৰৰ পৰা বেলেগ হয়। প্ৰশ্নই প্ৰায়ে সেই পাৰ্থক্যটো সোধে।"]
  },
  list: {
    en: ["Simple interest is principal multiplied by rate multiplied by time, divided by one hundred.", "Compound interest is calculated year by year on the new amount.", "For the first year simple interest and compound interest are equal.", "Amount equals principal plus interest."],
    as: ["সৰল সুত হৈছে মূলধন, হাৰ আৰু সময়ৰ গুণফলক এশৰে ভাগ কৰা মান।", "চক্ৰবৃদ্ধি সুত বছৰে বছৰে নতুন ৰাশিৰ ওপৰত হিচাপ কৰা হয়।", "প্ৰথম বছৰত সৰল সুত আৰু চক্ৰবৃদ্ধি সুত সমান।", "ৰাশি হৈছে মূলধন আৰু সুতৰ যোগফল।"]
  },
  faqs: [
    { q: { en: "For how many years are simple interest and compound interest equal?", as: "কিমান বছৰৰ বাবে সৰল সুত আৰু চক্ৰবৃদ্ধি সুত সমান?" },
      a: { en: "They are equal for the first year only. From the second year the compound interest is greater because interest is then earned on the interest as well.", as: "কেৱল প্ৰথম বছৰৰ বাবে সমান। দ্বিতীয় বছৰৰ পৰা চক্ৰবৃদ্ধি সুত বেছি, কাৰণ তেতিয়া সুতৰ ওপৰতো সুত পোৱা যায়।" } }
  ]
},
"time-speed-distance": {
  h2: { en: "Time, Speed & Distance", as: "সময়, দূৰত্ব আৰু গতিবেগ" },
  p: {
    en: ["Distance is the product of speed and time, so a question that gives any two of the three quantities can always be solved. The important step is to bring the units to a common base before calculating.", "To change a speed in kilometres per hour into metres per second, multiply by five and divide by eighteen. Problems on trains add the length of the train to the distance covered."],
    as: ["দূৰত্ব হৈছে গতিবেগ আৰু সময়ৰ গুণফল, গতিকে তিনিটাৰ ভিতৰত যিকোনো দুটা দিয়া প্ৰশ্ন সদায় সমাধান কৰিব পাৰি। গুৰুত্বপূৰ্ণ পদক্ষেপ হৈছে হিচাপ কৰাৰ আগতে এককসমূহ এটা সাধাৰণ ভিত্তিলৈ অনা।", "কিলোমিটাৰ প্ৰতি ঘণ্টাত থকা গতিবেগক মিটাৰ প্ৰতি ছেকেণ্ডলৈ সলাবলৈ পাঁচেৰে পূৰণ কৰি আঠেৰে ভাগ কৰক। ৰে'লগাড়ীৰ প্ৰশ্নত ৰে'লখনৰ দীঘ দূৰত্বৰ লগত যোগ কৰা হয়।"]
  },
  list: {
    en: ["Speed equals distance divided by time.", "To convert kilometres per hour into metres per second multiply by five and divide by eighteen.", "A train crossing a pole covers only its own length.", "Relative speed is added for opposite directions and subtracted for the same direction."],
    as: ["গতিবেগ হৈছে দূৰত্বক সময়ৰে ভাগ কৰা মান।", "কিলোমিটাৰ প্ৰতি ঘণ্টাক মিটাৰ প্ৰতি ছেকেণ্ডলৈ সলাবলৈ পাঁচেৰে পূৰণ কৰি আঠেৰে ভাগ কৰক।", "খুটি এটা পাৰ হোৱা ৰে'লে কেৱল নিজৰ দীঘখিনিহে অতিক্ৰম কৰে।", "বিপৰীত দিশত আপেক্ষিক গতিবেগ যোগ আৰু একে দিশত বিয়োগ কৰা হয়।"]
  },
  faqs: [
    { q: { en: "How do you change kilometres per hour into metres per second?", as: "কিলোমিটাৰ প্ৰতি ঘণ্টাক মিটাৰ প্ৰতি ছেকেণ্ডলৈ কেনেকৈ সলাব?" },
      a: { en: "Multiply the speed by five and divide by eighteen, because one kilometre is a thousand metres and one hour is three thousand six hundred seconds.", as: "গতিবেগক পাঁচেৰে পূৰণ কৰি আঠেৰে ভাগ কৰক, কাৰণ এক কিলোমিটাৰ এহাজাৰ মিটাৰ আৰু এক ঘণ্টা তিনি হাজাৰ ছশ ছেকেণ্ড।" } }
  ]
},
"time-work": {
  h2: { en: "Time & Work", as: "সময় আৰু কাৰ্য" },
  p: {
    en: ["Work problems compare the rate at which different persons finish a task. The simplest method is to take the total work as one, so a person who finishes the work in n days does one-nth of it in a day.", "When two persons work together their one-day rates are added. If one of them is a pipe filling a tank and another is a pipe emptying it, the emptying rate is subtracted."],
    as: ["কাৰ্যৰ প্ৰশ্নই বিভিন্ন লোকে কাম এটা শেষ কৰাৰ হাৰ তুলনা কৰে। আটাইতকৈ সৰল পদ্ধতি হৈছে মুঠ কামক এক ধৰা, তেতিয়া n দিনত কাম শেষ কৰা লোকে এদিনত তাৰ n ভাগৰ এভাগ কৰে।", "দুজন লোকে একেলগে কাম কৰিলে তেওঁলোকৰ এদিনৰ হাৰ যোগ কৰা হয়। যদি এটা নলে টেংকী ভৰায় আৰু আনটো খালী কৰে, তেন্তে খালী কৰাৰ হাৰ বিয়োগ কৰা হয়।"]
  },
  list: {
    en: ["Take the total work as one unit.", "The rate of work is one divided by the number of days.", "The combined rate is the sum of the individual rates.", "An emptying pipe works against a filling pipe."],
    as: ["মুঠ কামক এটা একক ধৰক।", "কামৰ হাৰ হৈছে একক দিনৰ সংখ্যাৰে ভাগ কৰা মান।", "সংযুক্ত হাৰ হৈছে ব্যক্তিগত হাৰবোৰৰ সমষ্টি।", "খালী কৰা নলে ভৰোৱা নলৰ বিৰুদ্ধে কাম কৰে।"]
  },
  faqs: [
    { q: { en: "How do you find the time when two persons work together?", as: "দুজন লোকে একেলগে কাম কৰিলে সময় কেনেকৈ বিচাৰিব?" },
      a: { en: "Add their one-day rates and then take the reciprocal of the sum. That reciprocal is the number of days they need together.", as: "তেওঁলোকৰ এদিনৰ হাৰবোৰ যোগ কৰি তাৰ প্ৰতিলোম লওক। সেই প্ৰতিলোমেই তেওঁলোকৰ লগতে প্ৰয়োজনীয় দিনৰ সংখ্যা।" } }
  ]
},
"problems-on-ages": {
  h2: { en: "Problems on Ages", as: "বয়স সম্বন্ধীয় সমস্যা" },
  p: {
    en: ["Age problems translate the given statements into equations in one unknown, usually the present age. A past age is found by subtracting the number of years and a future age by adding them.", "The difference between the ages of two persons never changes with time, and this fixed difference is often the quickest route to the answer."],
    as: ["বয়সৰ প্ৰশ্নই প্ৰদত্ত বিৱৰণীক এটা অজ্ঞাত ৰাশিৰ সমীকৰণলৈ ৰূপান্তৰ কৰে, সাধাৰণতে বৰ্তমান বয়স। অতীতৰ বয়স বছৰ বিয়োগ কৰি আৰু ভৱিষ্যতৰ বয়স বছৰ যোগ কৰি পোৱা যায়।", "দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য সময়ৰ লগে লগে কেতিয়াও সলনি নহয়, আৰু এই স্থিৰ পাৰ্থক্যই প্ৰায়ে উত্তৰলৈ আটাইতকৈ দ্ৰুত পথ।"]
  },
  list: {
    en: ["Take the present age as the unknown, usually x.", "An age n years ago is x minus n and after n years it is x plus n.", "The difference between two ages stays the same forever.", "Read the question twice to fix the tense of the ages."],
    as: ["বৰ্তমান বয়সক অজ্ঞাত ধৰক, সাধাৰণতে x।", "n বছৰ আগৰ বয়স x বিয়োগ n আৰু n বছৰৰ পিছৰ বয়স x যোগ n।", "দুটা বয়সৰ পাৰ্থক্য সদায় একেই থাকে।", "বয়সৰ কাল নিৰ্ধাৰণ কৰিবলৈ প্ৰশ্নটো দুবাৰ পঢ়ক।"]
  },
  faqs: [
    { q: { en: "What stays constant in an age problem?", as: "বয়সৰ প্ৰশ্নত কি স্থিৰ থাকে?" },
      a: { en: "The difference between the ages of two persons stays constant, while the ratio of their ages changes from year to year.", as: "দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য স্থিৰ থাকে, আনহাতে তেওঁলোকৰ বয়সৰ অনুপাত বছৰে বছৰে সলনি হয়।" } }
  ]
},
"basic-mensuration": {
  h2: { en: "Basic Mensuration & Geometry", as: "সাধাৰণ পৰিমিতি আৰু জ্যামিতি" },
  p: {
    en: ["Mensuration deals with the perimeter and the area of plane figures and with the surface area and the volume of solids. The formulae for the rectangle, the square, the triangle and the circle must be known by heart.", "In a right-angled triangle the square of the hypotenuse equals the sum of the squares of the other two sides. This relation, called the Pythagoras theorem, is used in many mensuration questions."],
    as: ["পৰিমিতিয়ে সমতল চিত্ৰৰ পৰিসীমা আৰু কালি, আৰু ঘনবস্তুৰ পৃষ্ঠকালি আৰু আয়তনৰ সৈতে কাম কৰে। আয়তক্ষেত্ৰ, বৰ্গক্ষেত্ৰ, ত্ৰিভুজ আৰু বৃত্তৰ সূত্ৰবোৰ মনত ৰখা উচিত।", "সমকোণী ত্ৰিভুজত কৰ্ণৰ বৰ্গ আন দুটা বাহুৰ বৰ্গৰ সমষ্টিৰ সমান। এই সম্পৰ্কক পাইথাগোৰাছৰ উপপাদ্য বোলা হয় আৰু বহু পৰিমিতিৰ প্ৰশ্নত ব্যৱহাৰ কৰা হয়।"]
  },
  list: {
    en: ["Area of a rectangle equals length multiplied by breadth.", "Area of a triangle equals half of base multiplied by height.", "Circumference of a circle equals two multiplied by pi multiplied by radius.", "Pythagoras theorem relates the hypotenuse to the base and the height."],
    as: ["আয়তক্ষেত্ৰৰ কালি হৈছে দীঘ আৰু প্ৰস্থৰ গুণফল।", "ত্ৰিভুজৰ কালি হৈছে ভূমি আৰু উচ্চতাৰ গুণফলৰ আধা।", "বৃত্তৰ পৰিধি হৈছে দুই, পাই আৰু ব্যাসাৰ্ধৰ গুণফল।", "পাইথাগোৰাছৰ উপপাদ্যই কৰ্ণক ভূমি আৰু উচ্চতাৰ সৈতে সম্পৰ্ক কৰে।"]
  },
  faqs: [
    { q: { en: "How do you find the area of a right-angled triangle?", as: "সমকোণী ত্ৰিভুজৰ কালি কেনেকৈ বিচাৰিব?" },
      a: { en: "Half the product of the two sides that form the right angle gives the area, because one of them can be taken as the base and the other as the height.", as: "সমকোণ সৃষ্টি কৰা দুটা বাহুৰ গুণফলৰ আধা হৈছে কালি, কাৰণ এটাক ভূমি আৰু আনটো উচ্চতা ধৰিব পাৰি।" } }
  ]
},
"parts-of-speech": {
  h2: { en: "Parts of Speech", as: "শব্দৰ প্ৰকাৰ" },
  p: {
    en: ["Every word in a sentence belongs to one of the eight parts of speech: noun, pronoun, adjective, verb, adverb, preposition, conjunction and interjection. Recognising the part of speech of a word is the first step in using it correctly.", "The same word may act as more than one part of speech depending on how it is used. The word water is a noun in a sentence about drinking water and a verb in a sentence about watering plants."],
    as: ["বাক্য এটাত থকা প্ৰতিটো শব্দ আঠটা শব্দৰ প্ৰকাৰৰ এটাত পৰে: বিশেষ্য, সৰ্বনাম, বিশেষণ, ক্ৰিয়া, ক্ৰিয়া-বিশেষণ, পূৰ্বসৰ্গ, সংযোগ আৰু আবেগ। এটা শব্দৰ প্ৰকাৰ চিনি পোৱাটোৱেই তাক শুদ্ধভাৱে ব্যৱহাৰ কৰাৰ প্ৰথম পদক্ষেপ।", "একে শব্দই ব্যৱহাৰ অনুসৰি এটাতকৈ বেছি প্ৰকাৰৰ কাম কৰিব পাৰে। পানী খোৱাৰ বাক্যত water বিশেষ্য আৰু গছত পানী দিয়াৰ বাক্যত ক্ৰিয়া।"]
  },
  list: {
    en: ["A noun names a person, place, thing or idea.", "A pronoun replaces a noun, for example he, she or it.", "An adverb usually tells how, when or where an action happens.", "A preposition shows the relation of a noun to another word."],
    as: ["বিশেষ্যই ব্যক্তি, স্থান, বস্তু বা ভাৱৰ নাম দিয়ে।", "সৰ্বনামে বিশেষ্যৰ সলনি বহে, যেনে he, she বা it।", "ক্ৰিয়া-বিশেষণে সাধাৰণতে ক্ৰিয়া কেনেকৈ, কেতিয়া বা ক'ত হয় তাক কয়।", "পূৰ্বসৰ্গে এটা বিশেষ্যৰ সৈতে আন এটা শব্দৰ সম্পৰ্ক দেখুৱায়।"]
  },
  faqs: [
    { q: { en: "Can one word be more than one part of speech?", as: "এটা শব্দ এটাতকৈ বেছি শব্দৰ প্ৰকাৰ হ'ব পাৰে নে?" },
      a: { en: "Yes. The part of speech of a word depends on the work it does in the sentence, so the same word can be a noun in one sentence and a verb in another.", as: "হয়। এটা শব্দৰ প্ৰকাৰ বাক্যত ই কৰা কামৰ ওপৰত নিৰ্ভৰ কৰে, গতিকে একে শব্দ এটা বাক্যত বিশেষ্য আৰু আনটোত ক্ৰিয়া হ'ব পাৰে।" } }
  ]
},
"articles-determiners": {
  h2: { en: "Articles", as: "আৰ্টিকল" },
  p: {
    en: ["The words a, an and the are called articles. A and an are indefinite articles and are used with a singular countable noun that is mentioned for the first time, while the is the definite article and points to a particular noun.", "The choice between a and an depends on the sound, not the letter. An is used before a vowel sound, so we write an hour and an honest man, but a university and a one-rupee coin."],
    as: ["a, an আৰু the শব্দবোৰক আৰ্টিকল বোলা হয়। a আৰু an অনিৰ্দিষ্ট আৰ্টিকল আৰু প্ৰথমবাৰ উল্লেখ কৰা এটা একবচন গণনাযোগ্য বিশেষ্যৰ সৈতে ব্যৱহাৰ হয়, আনহাতে the নিৰ্দিষ্ট আৰ্টিকল আৰু এটা নিৰ্দিষ্ট বিশেষ্যলৈ দেখুৱায়।", "a আৰু an ৰ বাছনি অক্ষৰৰ ওপৰত নহয়, ধ্বনিৰ ওপৰত নিৰ্ভৰ কৰে। স্বৰধ্বনিৰ আগত an ব্যৱহাৰ হয়, গতিকে an hour আৰু an honest man লিখা হয়, কিন্তু a university আৰু a one-rupee coin।"]
  },
  list: {
    en: ["Use an before a vowel sound, not before a vowel letter.", "Use the when the noun is already known to the reader.", "Do not use an article before a proper noun like Assam.", "The is used before superlatives, for example the best."],
    as: ["অক্ষৰৰ আগত নহয়, স্বৰধ্বনিৰ আগত an ব্যৱহাৰ কৰক।", "পাঠকে ইতিমধ্যে জনা বিশেষ্যৰ আগত the ব্যৱহাৰ কৰক।", "Assam ৰ দৰে নামবাচক বিশেষ্যৰ আগত আৰ্টিকল নিদিব।", "উত্তমতাৰ্থক শব্দৰ আগত the ব্যৱহাৰ হয়, যেনে the best।"]
  },
  faqs: [
    { q: { en: "Why do we say an hour but a university?", as: "কিয় an hour কিন্তু a university বোলা হয়?" },
      a: { en: "Because the choice depends on the sound. Hour begins with a vowel sound, so it takes an, while university begins with the consonant sound y, so it takes a.", as: "কাৰণ বাছনিটো ধ্বনিৰ ওপৰত নিৰ্ভৰ কৰে। Hour স্বৰধ্বনিৰে আৰম্ভ হয়, গতিকে an লয়, আনহাতে university ব্যঞ্জনধ্বনি y ৰে আৰম্ভ হয়, গতিকে a লয়।" } }
  ]
},
"prepositions": {
  h2: { en: "Prepositions", as: "পূৰ্বসৰ্গ" },
  p: {
    en: ["A preposition links a noun or a pronoun to another word and shows the relation of place, time or direction. Common prepositions are in, on, at, to, with, by and from.", "The right preposition must be learnt with the word it follows, because the same word may take different prepositions with different meanings. Good at, good for and good with all mean different things."],
    as: ["পূৰ্বসৰ্গে এটা বিশেষ্য বা সৰ্বনামক আন এটা শব্দৰ সৈতে সংযোগ কৰে আৰু স্থান, সময় বা দিশৰ সম্পৰ্ক দেখুৱায়। সাধাৰণ পূৰ্বসৰ্গবোৰ হৈছে in, on, at, to, with, by আৰু from।", "শুদ্ধ পূৰ্বসৰ্গ সেই শব্দটোৰ লগত শিকিব লাগে যিটোৰ পিছত ই আহে, কাৰণ একে শব্দই বেলেগ অৰ্থত বেলেগ পূৰ্বসৰ্গ ল'ব পাৰে। good at, good for আৰু good with ৰ অৰ্থ বেলেগ।"]
  },
  list: {
    en: ["In is used for a large place or a long period.", "On is used for a surface or a day of the week.", "At is used for an exact point of time or a small place.", "Learn the preposition together with the verb it follows."],
    as: ["In ডাঙৰ ঠাই বা দীঘল সময়ৰ বাবে ব্যৱহাৰ হয়।", "On পৃষ্ঠ বা সপ্তাহৰ দিনৰ বাবে ব্যৱহাৰ হয়।", "At সঠিক সময় বা সৰু ঠাইৰ বাবে ব্যৱহাৰ হয়।", "ক্ৰিয়াৰ লগত পূৰ্বসৰ্গ একেলগে শিকক।"]
  },
  faqs: [
    { q: { en: "Which preposition is used with an exact time?", as: "সঠিক সময়ৰ সৈতে কোনটো পূৰ্বসৰ্গ ব্যৱহাৰ হয়?" },
      a: { en: "At is used with an exact time, as in at five o'clock, while on is used with a day and in with a month or a year.", as: "সঠিক সময়ৰ সৈতে at ব্যৱহাৰ হয়, যেনে at five o'clock, আনহাতে দিনৰ সৈতে on আৰু মাহ বা বছৰৰ সৈতে in।" } }
  ]
},
"tenses-rules": {
  h2: { en: "Tenses", as: "কাল" },
  p: {
    en: ["Tense shows the time of an action and whether it is complete or continuing. There are three main tenses, present, past and future, and each has four forms, simple, continuous, perfect and perfect continuous.", "The most common error is a mismatch between the tense of the verb and the time word in the sentence. A sentence that contains yesterday must not use a present tense verb."],
    as: ["কালে এটা ক্ৰিয়াৰ সময় আৰু ই সম্পূৰ্ণ নে চলি আছে তাক দেখুৱায়। তিনি মূল কাল আছে — বৰ্তমান, অতীত আৰু ভৱিষ্যত, আৰু প্ৰতিটোৰে চাৰিটা ৰূপ — সৰল, চলমান, পূৰ্ণ আৰু পূৰ্ণ চলমান।", "আটাইতকৈ সাধাৰণ ভুল হৈছে ক্ৰিয়াৰ কাল আৰু বাক্যত থকা সময়ৰ শব্দৰ মাজৰ অসঙ্গতি। yesterday থকা বাক্যত বৰ্তমান কালৰ ক্ৰিয়া ব্যৱহাৰ কৰিব নালাগে।"]
  },
  list: {
    en: ["Simple present is used for habits and general truths.", "Present continuous is used for an action happening now.", "Present perfect links a past action to the present.", "Match the tense with the time word in the sentence."],
    as: ["সৰল বৰ্তমান অভ্যাস আৰু সাধাৰণ সত্যৰ বাবে ব্যৱহাৰ হয়।", "বৰ্তমান চলমানে এতিয়া হোৱা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।", "বৰ্তমান পূৰ্ণই এটা অতীতৰ ক্ৰিয়াক বৰ্তমানৰ সৈতে সংযোগ কৰে।", "কালক বাক্যৰ সময়ৰ শব্দৰ সৈতে মিলাওক।"]
  },
  faqs: [
    { q: { en: "Which tense is used for a daily habit?", as: "দৈনিক অভ্যাসৰ বাবে কোনটো কাল ব্যৱহাৰ হয়?" },
      a: { en: "The simple present tense is used for a habit, as in she walks to school every day.", as: "দৈনিক অভ্যাসৰ বাবে সৰল বৰ্তমান কাল ব্যৱহাৰ হয়, যেনে she walks to school every day।" } }
  ]
},
"subject-verb-agreement": {
  h2: { en: "Subject-Verb Agreement", as: "কৰ্তা-ক্ৰিয়াৰ মিল" },
  p: {
    en: ["A verb must agree with its subject in number and person. A singular subject takes a singular verb and a plural subject takes a plural verb, and this rule decides many grammar questions.", "Care is needed with phrases placed between the subject and the verb. In the sentence the box of apples is heavy, the true subject is box, so the verb is singular."],
    as: ["ক্ৰিয়াই কৰ্তাৰ সৈতে সংখ্যা আৰু পুৰুষত মিলিব লাগে। একবচন কৰ্তাই একবচন ক্ৰিয়া লয় আৰু বহুবচন কৰ্তাই বহুবচন ক্ৰিয়া লয়, আৰু এই নিয়মেই বহু ব্যাকৰণৰ প্ৰশ্ন নিৰ্ণয় কৰে।", "কৰ্তা আৰু ক্ৰিয়াৰ মাজত ৰখা বাক্যাংশৰ ক্ষেত্ৰত সাৱধান হ'ব লাগে। the box of apples is heavy বাক্যত প্ৰকৃত কৰ্তা box, গতিকে ক্ৰিয়া একবচন।"]
  },
  list: {
    en: ["Ignore words placed between the subject and the verb.", "Two subjects joined by and take a plural verb.", "Two subjects joined by or or nor take the verb of the nearer one.", "Words like each, every and either take a singular verb."],
    as: ["কৰ্তা আৰু ক্ৰিয়াৰ মাজত থকা শব্দবোৰ আওকাণ কৰক।", "and ৰে যোগ হোৱা দুটা কৰ্তাই বহুবচন ক্ৰিয়া লয়।", "or বা nor ৰে যোগ হোৱা কৰ্তাই ওচৰৰটোৰ ক্ৰিয়া লয়।", "each, every আৰু either ৰ দৰে শব্দই একবচন ক্ৰিয়া লয়।"]
  },
  faqs: [
    { q: { en: "What is the subject in the sentence the box of apples is heavy?", as: "the box of apples is heavy বাক্যত কৰ্তা কি?" },
      a: { en: "The subject is box, not apples, so the singular verb is is correct. The phrase of apples only describes the box.", as: "কৰ্তা হৈছে box, apples নহয়, গতিকে একবচন ক্ৰিয়া is শুদ্ধ। of apples বাক্যাংশই কেৱল box ক বৰ্ণনা কৰে।" } }
  ]
},
"voice-change": {
  h2: { en: "Voice Change", as: "বাচ্য পৰিৱৰ্তন" },
  p: {
    en: ["Voice shows whether the subject acts or is acted upon. In the active voice the subject does the action, and in the passive voice the subject receives it.", "To change a sentence into the passive voice, the object becomes the subject, the verb becomes a form of be with the past participle, and the doer is introduced by the word by or left out."],
    as: ["বাচ্যই দেখুৱায় কৰ্তাই ক্ৰিয়া কৰে নে ক্ৰিয়া কৰ্তাৰ ওপৰত হয়। কৰ্তৃবাচ্যত কৰ্তাই ক্ৰিয়া কৰে, আৰু কৰ্মবাচ্যত কৰ্তাই ক্ৰিয়া গ্ৰহণ কৰে।", "বাক্য এটাক কৰ্মবাচ্যলৈ সলাবলৈ, কৰ্ম কৰ্তা হয়, ক্ৰিয়া be ৰ এটা ৰূপ আৰু অতীত কালৰ কৃদন্ত হয়, আৰু কৰ্তাক by ৰ জৰিয়তে আনিব বা এৰি দিব পাৰি।"]
  },
  list: {
    en: ["Active: the subject performs the action.", "Passive: the object becomes the subject.", "The passive uses a form of be with the past participle.", "Only transitive verbs can be changed into the passive voice."],
    as: ["কৰ্তৃবাচ্য: কৰ্তাই ক্ৰিয়া কৰে।", "কৰ্মবাচ্য: কৰ্মই কৰ্তাৰ ৰূপ লয়।", "কৰ্মবাচ্যত be ৰ এটা ৰূপ আৰু অতীত কৃদন্ত ব্যৱহাৰ হয়।", "কেৱল সকৰ্মক ক্ৰিয়াহে কৰ্মবাচ্যলৈ সলাব পাৰি।"]
  },
  faqs: [
    { q: { en: "Can every sentence be changed into the passive voice?", as: "প্ৰতিটো বাক্য কৰ্মবাচ্যলৈ সলাব পাৰি নে?" },
      a: { en: "No. Only sentences with a transitive verb, that is a verb that has an object, can be changed into the passive voice.", as: "নাই। কেৱল কৰ্ম থকা সকৰ্মক ক্ৰিয়াৰ বাক্যহে কৰ্মবাচ্যলৈ সলাব পাৰি।" } }
  ]
},
"narration": {
  h2: { en: "Narration", as: "উক্তি পৰিৱৰ্তন" },
  p: {
    en: ["Narration is the change of a sentence from direct speech to indirect speech or the reverse. In direct speech the exact words of the speaker are placed inside inverted commas.", "When a sentence is changed to indirect speech, the comma and the inverted commas are removed, a suitable linking word is added, and the tense and the pronouns are changed to suit the reporting verb."],
    as: ["উক্তি পৰিৱৰ্তন হৈছে এটা বাক্যক প্ৰত্যক্ষ উক্তিৰ পৰা পৰোক্ষ উক্তিলৈ বা ইয়াৰ বিপৰীতলৈ সলোৱা। প্ৰত্যক্ষ উক্তিত বক্তাৰ সঠিক শব্দবোৰ উদ্ধৃতি চিহ্নৰ ভিতৰত ৰখা হয়।", "এটা বাক্যক পৰোক্ষ উক্তিলৈ সলাওতে কমা আৰু উদ্ধৃতি চিহ্ন আঁতৰোৱা হয়, উপযুক্ত সংযোগ শব্দ যোগ কৰা হয়, আৰু ক্ৰিয়া আৰু সৰ্বনামবোৰ ৰিপৰ্টিং ক্ৰিয়াৰ লগত খাপ খুওৱা হয়।"]
  },
  list: {
    en: ["Remove the inverted commas in indirect speech.", "Change the tense one step back when the reporting verb is in the past.", "Change the pronouns to match the speaker and the listener.", "Statements take that, questions take if or whether, and commands take to."],
    as: ["পৰোক্ষ উক্তিত উদ্ধৃতি চিহ্ন আঁতৰাওক।", "ৰিপৰ্টিং ক্ৰিয়া অতীতত থাকিলে কাল এখোজ পিছলৈ সলাওক।", "বক্তা আৰু শ্ৰোতাৰ লগত মিলাই সৰ্বনাম সলাওক।", "বিবৃতিয়ে that, প্ৰশ্নই if বা whether, আৰু আদেশই to লয়।"]
  },
  faqs: [
    { q: { en: "Which word links a reported question?", as: "পৰোক্ষ প্ৰশ্নত কোনটো শব্দে সংযোগ কৰে?" },
      a: { en: "A question in indirect speech is joined by if or whether, or by the question word itself such as what or where.", as: "পৰোক্ষ উক্তিত প্ৰশ্নক if বা whether, বা প্ৰশ্নবোধক শব্দ যেনে what বা where ৰে যোগ কৰা হয়।" } }
  ]
},
"synonyms-antonyms": {
  h2: { en: "Synonyms & Antonyms", as: "সমাৰ্থক আৰু বিপৰীত শব্দ" },
  p: {
    en: ["A synonym is a word that has nearly the same meaning as another word, and an antonym is a word that has the opposite meaning. This chapter rewards a wide reading vocabulary more than any rule.", "The safest method is to learn words in pairs and in sentences. A word learnt with its antonym is remembered twice as well as a word learnt alone."],
    as: ["সমাৰ্থক শব্দ হৈছে এনে শব্দ যাৰ অৰ্থ আন এটা শব্দৰ প্ৰায় একেই, আৰু বিপৰীত শব্দ হৈছে এনে শব্দ যাৰ অৰ্থ ওলোটা। এই অধ্যায়ে যিকোনো নিয়মতকৈ বহল পঠন-শব্দভাণ্ডাৰক পুৰস্কৃত কৰে।", "আটাইতকৈ সুৰক্ষিত পদ্ধতি হৈছে শব্দবোৰ যোৰ আৰু বাক্যত শিকা। বিপৰীত শব্দৰ সৈতে শিকা শব্দ এটা অকলে শিকাতকৈ দুগুণ ভালকৈ মনত থাকে।"]
  },
  list: {
    en: ["Learn the word with its antonym, not alone.", "Note the part of speech of the word before choosing its synonym.", "A word may have more than one synonym.", "Read the full sentence to judge the exact meaning."],
    as: ["শব্দটো অকলে নহয়, বিপৰীত শব্দৰ সৈতে শিকক।", "সমাৰ্থক বাছনি কৰাৰ আগতে শব্দটোৰ প্ৰকাৰ টুকি লওক।", "এটা শব্দৰ এটাতকৈ বেছি সমাৰ্থক থাকিব পাৰে।", "সঠিক অৰ্থ নিৰ্ণয় কৰিবলৈ গোটেই বাক্যটো পঢ়ক।"]
  },
  faqs: [
    { q: { en: "What is the best way to remember a new word?", as: "নতুন শব্দ এটা মনত ৰখাৰ আটাইতকৈ ভাল উপায় কি?" },
      a: { en: "Learn it with its antonym and use it in a sentence of your own, because the opposite meaning fixes the sense of the word in memory.", as: "ইয়াক বিপৰীত শব্দৰ সৈতে শিকক আৰু নিজৰ এটা বাক্যত ব্যৱহাৰ কৰক, কাৰণ বিপৰীত অৰ্থই শব্দটোৰ ভাৱ মনত পকা কৰে।" } }
  ]
},
"one-word-substitution": {
  h2: { en: "One Word Substitution", as: "এটা শব্দত প্ৰকাশ" },
  p: {
    en: ["One word substitution asks for a single word that expresses a whole phrase. A person who writes books is an author, a place where books are kept is a library, and one who loves books is a bibliophile.", "The chapter is purely a test of vocabulary, so the only method is to collect the standard groups, such as words ending in logy for sciences, phobia for fears and cide for killing."],
    as: ["এটা শব্দত প্ৰকাশে এটা গোটেই বাক্যাংশ প্ৰকাশ কৰা এটা শব্দ বিচাৰে। কিতাপ লিখা ব্যক্তি এজন author, কিতাপ ৰখা ঠাই এটা library, আৰু কিতাপ ভাল পোৱা ব্যক্তি এজন bibliophile।", "এই অধ্যায়টো সম্পূৰ্ণ শব্দভাণ্ডাৰৰ পৰীক্ষা, গতিকে একমাত্ৰ উপায় হৈছে মানক গোটবোৰ সংগ্ৰহ কৰা, যেনে বিজ্ঞানৰ বাবে logy ৰে শেষ হোৱা শব্দ, ভয়ৰ বাবে phobia আৰু হত্যাৰ বাবে cide।"]
  },
  list: {
    en: ["Collect words by their suffix, for example logy, phobia and cide.", "Note whether the question asks for a person, a place or a quality.", "Learn one example with every new word.", "Revise the list in short, repeated sessions."],
    as: ["প্ৰত্যয় অনুসৰি শব্দ সংগ্ৰহ কৰক, যেনে logy, phobia আৰু cide।", "প্ৰশ্নই ব্যক্তি, ঠাই নে গুণ বিচাৰে সেয়া টুকি লওক।", "প্ৰতিটো নতুন শব্দৰ সৈতে এটা উদাহৰণ শিকক।", "চুটি চুটি সততে তালিকা পুনৰালোচনা কৰক।"]
  },
  faqs: [
    { q: { en: "What does the suffix phobia mean?", as: "phobia প্ৰত্যয়ৰ অৰ্থ কি?" },
      a: { en: "Phobia means an unreasonable fear of something, so claustrophobia is a fear of closed spaces and hydrophobia is a fear of water.", as: "phobia মানে কিবা এটাৰ অযৌক্তিক ভয়, গতিকে claustrophobia বন্ধ ঠাইৰ ভয় আৰু hydrophobia পানীৰ ভয়।" } }
  ]
},
"idioms-phrases": {
  h2: { en: "Idioms & Phrases", as: "বাক্যৰীতি আৰু খণ্ডবাক্য" },
  p: {
    en: ["An idiom is a group of words whose meaning cannot be understood from the meanings of the individual words. To let the cat out of the bag means to reveal a secret, not to release an animal.", "Idioms are best learnt from a sentence that shows their use. The examination almost always tests the standard, commonly printed idioms rather than rare ones."],
    as: ["বাক্যৰীতি হৈছে এনে শব্দৰ গোট যাৰ অৰ্থ ব্যক্তিগত শব্দবোৰৰ অৰ্থৰ পৰা বুজিব নোৱাৰি। To let the cat out of the bag মানে গোপন কথা ফাদিল কৰা, জন্তু এটা এৰি দিয়া নহয়।", "বাক্যৰীতিবোৰ তেওঁলোকৰ প্ৰয়োগ দেখুওৱা বাক্যৰ পৰা শিকা ভাল। পৰীক্ষাই প্ৰায় সদায় মানক, সাধাৰণতে ছপা হোৱা বাক্যৰীতিহে সোধে, বিৰল নহয়।"]
  },
  list: {
    en: ["Learn each idiom inside a full sentence.", "Do not translate an idiom word by word.", "Keep a notebook of the idioms you meet while reading.", "Most exam idioms repeat from previous papers."],
    as: ["প্ৰতিটো বাক্যৰীতি এটা সম্পূৰ্ণ বাক্যৰ ভিতৰত শিকক।", "বাক্যৰীতি শব্দে শব্দে অনুবাদ নকৰিব।", "পঢ়ি থাকোঁতে পোৱা বাক্যৰীতিবোৰৰ টোকা বহী ৰাখক।", "পৰীক্ষাৰ বেছিভাগ বাক্যৰীতি আগৰ পত্ৰৰ পৰা পুনৰাবৃত্তি হয়।"]
  },
  faqs: [
    { q: { en: "How should an idiom be learnt?", as: "বাক্যৰীতি কেনেকৈ শিকা উচিত?" },
      a: { en: "Learn it as a whole with an example sentence, because the meaning of the individual words does not give the meaning of the idiom.", as: "এটা উদাহৰণ বাক্যৰ সৈতে গোটেইটো শিকক, কাৰণ ব্যক্তিগত শব্দবোৰৰ অৰ্থই বাক্যৰীতিৰ অৰ্থ নিদিয়ে।" } }
  ]
},
"error-detection": {
  h2: { en: "Spotting Errors", as: "বাক্যৰ ভুল নিৰ্ণয়" },
  p: {
    en: ["In spotting errors the sentence is divided into parts and one part carries a mistake in grammar or usage. The usual faults are a wrong preposition, a wrong tense, a wrong pronoun and a missing word.", "The method is to read each part separately and then read the whole sentence again. Many errors become visible only when the parts are joined."],
    as: ["বাক্যৰ ভুল নিৰ্ণয়ত বাক্যটো অংশত ভাগ কৰা হয় আৰু এটা অংশত ব্যাকৰণ বা প্ৰয়োগৰ ভুল থাকে। সাধাৰণ ভুলবোৰ হৈছে ভুল পূৰ্বসৰ্গ, ভুল কাল, ভুল সৰ্বনাম আৰু এটা শব্দ এৰি যোৱা।", "পদ্ধতিটো হৈছে প্ৰতিটো অংশ বেলেগে পঢ়ি তাৰ পিছত গোটেই বাক্যটো পুনৰ পঢ়া। অংশবোৰ জোৰা লগালেহে বহু ভুল ওলাই পৰে।"]
  },
  list: {
    en: ["Read each part alone, then read the whole sentence.", "Check the preposition, the tense and the pronoun first.", "Watch for a missing article or a repeated word.", "If no error is visible, the answer may be no error."],
    as: ["প্ৰতিটো অংশ অকলে পঢ়ক, তাৰ পিছত গোটেই বাক্য পঢ়ক।", "প্ৰথমে পূৰ্বসৰ্গ, কাল আৰু সৰ্বনাম পৰীক্ষা কৰক।", "এটা এৰি যোৱা আৰ্টিকল বা পুনৰাবৃত্ত শব্দলৈ চকু ৰাখক।", "কোনো ভুল নেদেখিলে উত্তৰ কোনো ভুল নাই হ'ব পাৰে।"]
  },
  faqs: [
    { q: { en: "What should be checked first while spotting an error?", as: "ভুল নিৰ্ণয় কৰোঁতে প্ৰথমে কি পৰীক্ষা কৰিব লাগে?" },
      a: { en: "Check the preposition, the tense and the pronoun first, because most errors in these questions fall in one of those three groups.", as: "প্ৰথমে পূৰ্বসৰ্গ, কাল আৰু সৰ্বনাম পৰীক্ষা কৰক, কাৰণ এই প্ৰশ্নবোৰৰ বেছিভাগ ভুল এই তিনি গোটৰ এটাত পৰে।" } }
  ]
},
"fill-in-the-blanks": {
  h2: { en: "Fill in the Blanks", as: "ৰিক্ত স্থান পূৰণ" },
  p: {
    en: ["A fill in the blanks question removes one word from a sentence and asks for the word that fits both the meaning and the grammar. The blank may test a preposition, a verb form, an article or a vocabulary item.", "The best method is to read the whole sentence first and guess the kind of word needed, and only then look at the options."],
    as: ["ৰিক্ত স্থান পূৰণৰ প্ৰশ্নই বাক্য এটাৰ পৰা এটা শব্দ আঁতৰায় আৰু অৰ্থ আৰু ব্যাকৰণ দুয়োটাৰ লগত খাপ খোৱা শব্দ বিচাৰে। ৰিক্ত স্থানটোৱে পূৰ্বসৰ্গ, ক্ৰিয়াৰ ৰূপ, আৰ্টিকল বা শব্দভাণ্ডাৰ পৰীক্ষা কৰিব পাৰে।", "আটাইতকৈ ভাল পদ্ধতি হৈছে প্ৰথমে গোটেই বাক্যটো পঢ়ি কেৱল প্ৰয়োজনীয় শব্দৰ ধৰণটো অনুমান কৰা, আৰু তাৰ পিছতহে বিকল্পবোৰ চোৱা।"]
  },
  list: {
    en: ["Read the whole sentence before looking at the options.", "Decide the part of speech the blank needs.", "Reject options that break the grammar even if the meaning fits.", "Check the sentence once more after filling the blank."],
    as: ["বিকল্প চোৱাৰ আগতে গোটেই বাক্যটো পঢ়ক।", "ৰিক্ত স্থানত কি প্ৰকাৰৰ শব্দ লাগে সেয়া নিৰ্ণয় কৰক।", "অৰ্থ মিলিলেও ব্যাকৰণ ভঙা বিকল্প বাদ দিয়ক।", "ৰিক্ত স্থান পূৰ কৰাৰ পিছত বাক্যটো আকৌ এবাৰ পৰীক্ষা কৰক।"]
  },
  faqs: [
    { q: { en: "Should the options be read before or after the sentence?", as: "বিকল্পবোৰ বাক্যৰ আগত নে পিছত পঢ়িব লাগে?" },
      a: { en: "Read the sentence first and guess the word needed. Reading the options too early often pulls the reader towards a wrong but familiar word.", as: "প্ৰথমে বাক্যটো পঢ়ি প্ৰয়োজনীয় শব্দ অনুমান কৰক। আগতে বিকল্প পঢ়িলে প্ৰায়ে ভুল কিন্তু চিনাকি শব্দলৈ টানি নিয়ে।" } }
  ]
},
"sentence-rearrangement": {
  h2: { en: "Sentence Rearrangement", as: "বাক্য সজোৱা" },
  p: {
    en: ["In sentence rearrangement the parts of a sentence are given in a jumbled order and the correct order must be found. The order is decided by grammar and by the natural flow of the idea.", "The first step is to find the opening part, which usually contains the subject, and the closing part, which usually contains the conclusion. The middle parts then fall into place."],
    as: ["বাক্য সজোৱাত এটা বাক্যৰ অংশবোৰ ওলোটা-পালটি ক্ৰমত দিয়া হয় আৰু শুদ্ধ ক্ৰম বিচাৰিব লাগে। ক্ৰমটো ব্যাকৰণ আৰু ভাৱৰ স্বাভাৱিক প্ৰবাহৰ দ্বাৰা নিৰ্ণয় হয়।", "প্ৰথম পদক্ষেপ হৈছে আৰম্ভণিৰ অংশ বিচৰা, য'ত সাধাৰণতে কৰ্তা থাকে, আৰু শেষৰ অংশ, য'ত সাধাৰণতে সিদ্ধান্ত থাকে। মাজৰ অংশবোৰ তেতিয়া নিজে নিজে ঠাই লয়।"]
  },
  list: {
    en: ["Find the opening part first; it usually has the subject.", "A pronoun cannot open the sentence if its noun comes later.", "Look for linking words such as therefore and but.", "Read the final order once to check the sense."],
    as: ["প্ৰথমে আৰম্ভণিৰ অংশ বিচাৰক; তাত সাধাৰণতে কৰ্তা থাকে।", "সৰ্বনামৰ বিশেষ্যটো পিছত আহিলে সৰ্বনামে বাক্য আৰম্ভ কৰিব নোৱাৰে।", "therefore আৰু but ৰ দৰে সংযোগ শব্দ বিচাৰক।", "অৰ্থ পৰীক্ষা কৰিবলৈ চূড়ান্ত ক্ৰমটো এবাৰ পঢ়ক।"]
  },
  faqs: [
    { q: { en: "Which part usually comes first in a rearranged sentence?", as: "পুনৰ্বিন্যস্ত বাক্যত সাধাৰণতে কোনটো অংশ প্ৰথমে আহে?" },
      a: { en: "The part with the subject and the main verb comes first, because the sentence cannot begin with a pronoun whose noun appears later.", as: "কৰ্তা আৰু মূল ক্ৰিয়া থকা অংশ প্ৰথমে আহে, কাৰণ যি সৰ্বনামৰ বিশেষ্য পিছত আহে তাৰে বাক্য আৰম্ভ কৰিব নোৱাৰি।" } }
  ]
},
"ancient-assam": {
  h2: { en: "Ancient Assam", as: "প্ৰাচীন অসম" },
  p: {
    en: ["Ancient Assam was known as Kamarupa and it was ruled in turn by the Varman, the Salastambha and the Pala dynasties. The earliest reference to the region is found in the Allahabad pillar inscription of Samudragupta, which names Kamarupa as a frontier kingdom.", "Pushyavarman founded the Varman line and Bhaskarvarman was its most famous ruler, who maintained diplomatic relations with Harshavardhana of Kanauj. The Chinese traveller Hiuen Tsang visited the court of Bhaskarvarman."],
    as: ["প্ৰাচীন অসমক কমৰূপ নামেৰে জনা গৈছিল আৰু ইয়াক ক্ৰমে বৰ্মন, শালস্তম্ভ আৰু পাল বংশই শাসন কৰিছিল। এই অঞ্চলৰ আটাইতকৈ প্ৰাচীন উল্লেখ সমুদ্ৰগুপ্তৰ এলাহাবাদ স্তম্ভ লিপিত পোৱা যায়, য'ত কমৰূপক এখন সীমান্তৱৰ্তী ৰাজ্য হিচাপে উল্লেখ কৰা হৈছে।", "পুষ্যভৰ্মনে বৰ্মন বংশ প্ৰতিষ্ঠা কৰিছিল আৰু ভাস্কৰবৰ্মন আছিল তাৰ আটাইতকৈ বিখ্যাত ৰজা, যি কনৌজৰ হৰ্ষবৰ্ধনৰ সৈতে কূটনৈতিক সম্পৰ্ক ৰাখিছিল। চীনা পৰিব্ৰাজক হিউয়েন ছাঙে ভাস্কৰবৰ্মনৰ ৰাজসভালৈ আহিছিল।"]
  },
  list: {
    en: ["Kamarupa is the ancient name of Assam.", "The Varman dynasty was founded by Pushyavarman.", "Bhaskarvarman was a contemporary of Harshavardhana.", "Hiuen Tsang visited Kamarupa during Bhaskarvarman's reign."],
    as: ["কমৰূপ হৈছে অসমৰ প্ৰাচীন নাম।", "বৰ্মন বংশ পুষ্যভৰ্মনে প্ৰতিষ্ঠা কৰিছিল।", "ভাস্কৰবৰ্মন হৰ্ষবৰ্ধনৰ সমসাময়িক আছিল।", "ভাস্কৰবৰ্মনৰ ৰাজত্বকালত হিউয়েন ছাঙে কমৰূপ ভ্ৰমণ কৰিছিল।"]
  },
  faqs: [
    { q: { en: "What was the ancient name of Assam?", as: "অসমৰ প্ৰাচীন নাম কি আছিল?" },
      a: { en: "Ancient Assam was called Kamarupa, and the name appears in the Allahabad pillar inscription of Samudragupta.", as: "প্ৰাচীন অসমক কমৰূপ বোলা হৈছিল, আৰু এই নাম সমুদ্ৰগুপ্তৰ এলাহাবাদ স্তম্ভ লিপিত পোৱা যায়।" } }
  ]
},
"ahom-koch-kingdoms": {
  h2: { en: "Ahom Era & Koch Kingdom", as: "আহোম যুগ আৰু কোচ ৰাজ্য" },
  p: {
    en: ["The Ahom kingdom was established in 1228 by Sukapha, who came from the Shan region of upper Burma and settled in the Brahmaputra valley. The Ahoms ruled Assam for nearly six hundred years and gave the state its long period of political stability.", "The Koch kingdom rose in the western part of Assam under Viswa Singha and his son Naranarayana. The Ahoms defeated the Mughals in the historic Battle of Saraighat in 1671 under the command of Lachit Borphukan."],
    as: ["আহোম ৰাজ্য ১২২৮ চনত স্বৰ্গদেউ চুকাফাই প্ৰতিষ্ঠা কৰিছিল, যি ওপৰা বাৰ্মাৰ শান অঞ্চলৰ পৰা আহি ব্ৰহ্মপুত্ৰ উপত্যকাত বসতি স্থাপন কৰিছিল। আহোমসকলে প্ৰায় ছশ বছৰ অসম শাসন কৰিছিল আৰু ৰাজ্যখনক দীঘলীয়া ৰাজনৈতিক স্থিৰতা প্ৰদান কৰিছিল।", "কোচ ৰাজ্য পশ্চিম অসমত বিশ্ব সিংহ আৰু তেওঁৰ পুত্ৰ নৰনাৰায়ণৰ অধীনত গঢ় লৈ উঠিছিল। ১৬৭১ চনত লাচিত বৰফুকনৰ নেতৃত্বত আহোমসকলে ঐতিহাসিক শৰাইঘাটৰ যুদ্ধত মোগলক পৰাস্ত কৰিছিল।"]
  },
  list: {
    en: ["Sukapha established the Ahom kingdom in 1228.", "The Battle of Saraighat was fought in 1671.", "Lachit Borphukan led the Ahom army at Saraighat.", "The Koch kingdom was founded by Viswa Singha."],
    as: ["চুকাফাই ১২২৮ চনত আহোম ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।", "শৰাইঘাটৰ যুদ্ধ ১৬৭১ চনত হৈছিল।", "শৰাইঘাটত লাচিত বৰফুকনে আহোম সেনাক নেতৃত্ব দিছিল।", "কোচ ৰাজ্য বিশ্ব সিংহই প্ৰতিষ্ঠা কৰিছিল।"]
  },
  faqs: [
    { q: { en: "Who founded the Ahom kingdom and in which year?", as: "আহোম ৰাজ্য কোনে আৰু কেতিয়া প্ৰতিষ্ঠা কৰিছিল?" },
      a: { en: "Sukapha founded the Ahom kingdom in 1228 after entering the Brahmaputra valley from the Shan region.", as: "শান অঞ্চলৰ পৰা ব্ৰহ্মপুত্ৰ উপত্যকালৈ আহি চুকাফাই ১২২৮ চনত আহোম ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।" } }
  ]
},
"yandabo-british-rule": {
  h2: { en: "Yandabo Treaty & British Rule", as: "য়াণ্ডাবু সন্ধি আৰু ব্ৰিটিছ শাসন" },
  p: {
    en: ["The Treaty of Yandabo was signed on 24 February 1826 and it ended the First Anglo-Burmese War. By this treaty the Burmese gave up their claim over Assam and the British came to control the region.", "Assam was first attached to the Bengal Presidency and later made a separate Chief Commissioner's province in 1874. The British introduced tea plantations, railways and a new administrative system, all of which changed the economy of the state."],
    as: ["য়াণ্ডাবু সন্ধি ১৮২৬ চনৰ ২৪ ফেব্ৰুৱাৰীত স্বাক্ষৰিত হৈছিল আৰু ই প্ৰথম ইংৰাজ-বাৰ্মা যুদ্ধৰ অন্ত পেলাইছিল। এই সন্ধিৰ দ্বাৰা বাৰ্মাই অসমৰ ওপৰত দাবী এৰি দিছিল আৰু ব্ৰিটিছে অঞ্চলটো নিয়ন্ত্ৰণলৈ আনে।", "অসমক প্ৰথমে বংগ প্ৰেছিডেন্সিৰ সৈতে সংযুক্ত কৰা হৈছিল আৰু পিছত ১৮৭৪ চনত সুকীয়া মুখ্য আয়ুক্তৰ প্ৰদেশ কৰা হৈছিল। ব্ৰিটিছে চাহ বাগিচা, ৰে'লপথ আৰু নতুন প্ৰশাসনিক ব্যৱস্থা আনি ৰাজ্যখনৰ অৰ্থনীতি সলনি কৰিছিল।"]
  },
  list: {
    en: ["The Treaty of Yandabo was signed on 24 February 1826.", "It ended the First Anglo-Burmese War.", "Assam became a separate Chief Commissioner's province in 1874.", "Tea plantations were introduced during British rule."],
    as: ["য়াণ্ডাবু সন্ধি ১৮২৬ চনৰ ২৪ ফেব্ৰুৱাৰীত স্বাক্ষৰিত হৈছিল।", "ই প্ৰথম ইংৰাজ-বাৰ্মা যুদ্ধৰ অন্ত পেলাইছিল।", "১৮৭৪ চনত অসম সুকীয়া মুখ্য আয়ুক্তৰ প্ৰদেশ হয়।", "ব্ৰিটিছ শাসনকালত চাহ বাগিচা আৰম্ভ হৈছিল।"]
  },
  faqs: [
    { q: { en: "When was the Treaty of Yandabo signed?", as: "য়াণ্ডাবু সন্ধি কেতিয়া স্বাক্ষৰিত হৈছিল?" },
      a: { en: "The Treaty of Yandabo was signed on 24 February 1826 and it marked the beginning of British rule in Assam.", as: "য়াণ্ডাবু সন্ধি ১৮২৬ চনৰ ২৪ ফেব্ৰুৱাৰীত স্বাক্ষৰিত হৈছিল আৰু ইয়াৰ পৰাই অসমত ব্ৰিটিছ শাসন আৰম্ভ হৈছিল।" } }
  ]
},
"assam-freedom-struggle": {
  h2: { en: "Assam in the Freedom Struggle", as: "স্বাধীনতা সংগ্ৰামত অসম" },
  p: {
    en: ["Assam played an active part in the Indian freedom movement. Maniram Dewan was hanged in 1858 for his role in the revolt of 1857, and he is remembered as one of the earliest martyrs of the state.", "In the Quit India Movement of 1942, Kanaklata Barua was shot dead while leading a procession to hoist the national flag at the Gohpur police station, and Kushal Konwar was hanged in 1943. Both are honoured as martyrs of Assam."],
    as: ["ভাৰতৰ স্বাধীনতা আন্দোলনত অসমে সক্ৰিয় ভূমিকা লৈছিল। ১৮৫৭ চনৰ বিদ্ৰোহত অংশ লোৱাৰ বাবে ১৮৫৮ চনত মণিৰাম দেৱানক ফাঁচী দিয়া হৈছিল, আৰু তেওঁ ৰাজ্যখনৰ আটাইতকৈ আগৰ শ্বহীদসকলৰ এজন হিচাপে স্মৰণীয়।", "১৯৪২ চনৰ ভাৰত ছাড়ো আন্দোলনত কনকলতা বৰুৱাক গোহপুৰ আৰক্ষী থানাত জাতীয় পতাকা উত্তোলন কৰিবলৈ যোৱা শোভাযাত্ৰাৰ নেতৃত্ব দি গুলীয়াই হত্যা কৰা হৈছিল, আৰু ১৯৪৩ চনত কুশল কোঁৱৰক ফাঁচী দিয়া হৈছিল। দুয়োজনকে অসমৰ শ্বহীদ হিচাপে সন্মান কৰা হয়।"]
  },
  list: {
    en: ["Maniram Dewan was hanged in 1858.", "Kanaklata Barua died in the Quit India Movement of 1942.", "Kushal Konwar was hanged in 1943.", "Gopinath Bordoloi was the first Chief Minister of Assam."],
    as: ["মণিৰাম দেৱানক ১৮৫৮ চনত ফাঁচী দিয়া হৈছিল।", "কনকলতা বৰুৱা ১৯৪২ চনৰ ভাৰত ছাড়ো আন্দোলনত শ্বহীদ হৈছিল।", "কুশল কোঁৱৰক ১৯৪৩ চনত ফাঁচী দিয়া হৈছিল।", "গোপীনাথ বৰদলৈ অসমৰ প্ৰথম মুখ্যমন্ত্ৰী আছিল।"]
  },
  faqs: [
    { q: { en: "Who was the first martyr of Assam in the freedom struggle?", as: "স্বাধীনতা সংগ্ৰামত অসমৰ প্ৰথম শ্বহীদ কোন আছিল?" },
      a: { en: "Maniram Dewan is generally regarded as one of the earliest martyrs of Assam; he was hanged in 1858 for his part in the revolt of 1857.", as: "মণিৰাম দেৱানক অসমৰ আটাইতকৈ আগৰ শ্বহীদসকলৰ এজন হিচাপে গণ্য কৰা হয়; ১৮৫৭ চনৰ বিদ্ৰোহত অংশ লোৱাৰ বাবে ১৮৫৮ চনত তেওঁক ফাঁচী দিয়া হৈছিল।" } }
  ]
},
"assam-folk-culture": {
  h2: { en: "Folk Culture, Bihu & Satriya", as: "লোক-সংস্কৃতি, বিহু আৰু সত্ৰীয়া" },
  p: {
    en: ["Bihu is the chief festival of Assam and it is celebrated three times a year: Bohag Bihu in mid-April marks the Assamese new year, Kati Bihu in October is a quiet festival of the lamp, and Magh Bihu in January is the harvest festival of feasting.", "The Satriya culture of Assam grew out of the Vaishnava movement of Srimanta Sankardeva and Madhavdeva. Sattras are monastic institutions, and the Sattriya dance that developed there is recognised as one of the classical dances of India."],
    as: ["বিহু অসমৰ প্ৰধান উৎসৱ আৰু ই বছৰত তিনি বাৰ পালন কৰা হয়: এপ্ৰিলৰ মাজভাগৰ ব'হাগ বিহুৱে অসমীয়া নতুন বছৰৰ সূচনা কৰে, অক্টোবৰৰ কাতি বিহু চাকিৰ এটা শান্ত উৎসৱ, আৰু জানুৱাৰীৰ মাঘ বিহু ভোজৰ শস্য চপোৱা উৎসৱ।", "অসমৰ সত্ৰীয়া সংস্কৃতি শ্ৰীমন্ত শংকৰদেৱ আৰু মাধৱদেৱৰ বৈষ্ণৱ আন্দোলনৰ পৰা গঢ় লৈ উঠিছিল। সত্ৰবোৰ ধৰ্মীয় প্ৰতিষ্ঠান, আৰু তাত বিকশিত সত্ৰীয়া নৃত্য ভাৰতৰ শাস্ত্ৰীয় নৃত্যৰ এটা হিচাপে স্বীকৃত।"]
  },
  list: {
    en: ["Bohag Bihu is celebrated in mid-April.", "Magh Bihu is the harvest festival.", "Srimanta Sankardeva founded the Vaishnava movement in Assam.", "Sattriya is a classical dance form of India."],
    as: ["ব'হাগ বিহু এপ্ৰিলৰ মাজভাগত পালন কৰা হয়।", "মাঘ বিহু শস্য চপোৱাৰ উৎসৱ।", "শ্ৰীমন্ত শংকৰদেৱে অসমত বৈষ্ণৱ আন্দোলন প্ৰতিষ্ঠা কৰিছিল।", "সত্ৰীয়া ভাৰতৰ এটা শাস্ত্ৰীয় নৃত্য পৰম্পৰা।"]
  },
  faqs: [
    { q: { en: "How many times is Bihu celebrated in a year?", as: "বছৰত কিমানবাৰ বিহু পালন কৰা হয়?" },
      a: { en: "Bihu is celebrated three times a year, as Bohag Bihu, Kati Bihu and Magh Bihu.", as: "বছৰত তিনি বাৰ বিহু পালন কৰা হয় — ব'হাগ বিহু, কাতি বিহু আৰু মাঘ বিহু হিচাপে।" } }
  ]
},
"assamese-literature": {
  h2: { en: "Assamese Literature", as: "অসমীয়া সাহিত্য" },
  p: {
    en: ["Assamese literature begins with the Charyapada, the earliest known specimens of the language, and reaches its classical height in the devotional writing of Srimanta Sankardeva, who composed Kirtana Ghosha and many plays.", "In the modern period Lakshminath Bezbaroa wrote Burhi Aair Sadhu and pioneered the short story, while Hemchandra Barua compiled the Hemkosh dictionary. Birendra Kumar Bhattacharyya won the Jnanpith Award for Mrityunjay."],
    as: ["অসমীয়া সাহিত্য চৰ্যাপদৰ পৰা আৰম্ভ হয়, যি ভাষাটোৰ আটাইতকৈ প্ৰাচীন পোৱা নিদৰ্শন, আৰু শ্ৰীমন্ত শংকৰদেৱৰ ভক্তিমূলক ৰচনাৰ জৰিয়তে শাস্ত্ৰীয় শিখৰত উপনীত হয়, যিয়ে কীৰ্তন ঘোষা আৰু বহু নাট ৰচনা কৰিছিল।", "আধুনিক যুগত লক্ষ্মীনাথ বেজবৰুৱাই বুঢ়ী আইৰ সাধু লিখি চুটি গল্পৰ পথ দেখুৱাইছিল, আনহাতে হেমচন্দ্ৰ বৰুৱাই হেমকোষ অভিধান সংকলন কৰিছিল। বীৰেন্দ্ৰ কুমাৰ ভট্টাচাৰ্যই মৃত্যুঞ্জয়ৰ বাবে জ্ঞানপীঠ বঁটা লাভ কৰিছিল।"]
  },
  list: {
    en: ["Charyapada is the earliest known Assamese text.", "Srimanta Sankardeva wrote Kirtana Ghosha.", "Lakshminath Bezbaroa wrote Burhi Aair Sadhu.", "Birendra Kumar Bhattacharyya won the Jnanpith Award for Mrityunjay."],
    as: ["চৰ্যাপদ হৈছে আটাইতকৈ প্ৰাচীন জনা অসমীয়া ৰচনা।", "শ্ৰীমন্ত শংকৰদেৱে কীৰ্তন ঘোষা ৰচনা কৰিছিল।", "লক্ষ্মীনাথ বেজবৰুৱাই বুঢ়ী আইৰ সাধু লিখিছিল।", "বীৰেন্দ্ৰ কুমাৰ ভট্টাচাৰ্যই মৃত্যুঞ্জয়ৰ বাবে জ্ঞানপীঠ বঁটা লাভ কৰিছিল।"]
  },
  faqs: [
    { q: { en: "Who wrote Burhi Aair Sadhu?", as: "বুঢ়ী আইৰ সাধু কোনে লিখিছিল?" },
      a: { en: "Lakshminath Bezbaroa wrote Burhi Aair Sadhu, a collection of Assamese folk tales.", as: "লক্ষ্মীনাথ বেজবৰুৱাই অসমীয়া লোককথাৰ সংকলন বুঢ়ী আইৰ সাধু লিখিছিল।" } }
  ]
},
"brahmaputra-barak": {
  h2: { en: "Brahmaputra & Barak Rivers", as: "ব্ৰহ্মপুত্ৰ আৰু বৰাক নদী" },
  p: {
    en: ["The Brahmaputra and the Barak are the two great river systems of Assam. The Brahmaputra rises in Tibet as the Tsangpo, enters Assam in the north-east and flows through the whole length of the valley before entering Bangladesh.", "The Brahmaputra is called the Sorrow of Assam because of the floods it causes every year, and its major north-bank tributaries include the Subansiri and the Manas, while the Dhansiri and the Kopili flow from the south bank. The Barak rises in the hills of Manipur and flows through the Barak valley."],
    as: ["ব্ৰহ্মপুত্ৰ আৰু বৰাক অসমৰ দুটা প্ৰধান নদী ব্যৱস্থা। ব্ৰহ্মপুত্ৰ তিব্বতত ছাংপো হিচাপে উৎপত্তি হৈ অসমৰ উত্তৰ-পূবত প্ৰৱেশ কৰে আৰু উপত্যকাৰ গোটেই দীঘলেদি বৈ যোৱাৰ পিছত বাংলাদেশত প্ৰৱেশ কৰে।", "প্ৰতি বছৰে হোৱা বানৰ বাবে ব্ৰহ্মপুত্ৰক অসমৰ দুখ বোলা হয়, আৰু ইয়াৰ প্ৰধান উত্তৰ পাৰৰ উপনৈবোৰৰ ভিতৰত সুবনসিৰী আৰু মানাহ আছে, আনহাতে ধনসিৰী আৰু কপিলী দক্ষিণ পাৰৰ পৰা বৈ আহে। বৰাক মণিপুৰৰ পাহাৰত উৎপত্তি হৈ বৰাক উপত্যকাৰ মাজেৰে বৈ যায়।"]
  },
  list: {
    en: ["The Brahmaputra is known as the Tsangpo in Tibet.", "The Subansiri and the Manas are north-bank tributaries.", "The Barak flows through the Barak valley of Assam.", "The Brahmaputra is called the Sorrow of Assam because of floods."],
    as: ["ব্ৰহ্মপুত্ৰক তিব্বতত ছাংপো বোলা হয়।", "সুবনসিৰী আৰু মানাহ উত্তৰ পাৰৰ উপনৈ।", "বৰাকে অসমৰ বৰাক উপত্যকাৰ মাজেৰে বৈ যায়।", "বানৰ বাবে ব্ৰহ্মপুত্ৰক অসমৰ দুখ বোলা হয়।"]
  },
  faqs: [
    { q: { en: "Which river is called the Sorrow of Assam?", as: "কোনখন নদীক অসমৰ দুখ বোলা হয়?" },
      a: { en: "The Brahmaputra is called the Sorrow of Assam because the floods it causes every year damage crops and homes across the valley.", as: "প্ৰতি বছৰে হোৱা বানে উপত্যকাৰ শস্য আৰু ঘৰৰ ক্ষতি কৰাৰ বাবে ব্ৰহ্মপুত্ৰক অসমৰ দুখ বোলা হয়।" } }
  ]
},
"assam-national-parks": {
  h2: { en: "National Parks & Sanctuaries", as: "ৰাষ্ট্ৰীয় উদ্যান আৰু অভয়াৰণ্য" },
  p: {
    en: ["Assam has several national parks and wildlife sanctuaries that protect some of the richest biodiversity in India. Kaziranga National Park is famous for the one-horned rhinoceros and is a UNESCO World Heritage Site.", "Manas National Park is known for the golden langur and the pygmy hog and is both a tiger reserve and a biosphere reserve. Nameri, Orang, Dibru-Saikhowa and Raimona are the other national parks of the state."],
    as: ["অসমত কেইবাখনো ৰাষ্ট্ৰীয় উদ্যান আৰু অভয়াৰণ্য আছে যিয়ে ভাৰতৰ আটাইতকৈ সমৃদ্ধ জৈৱ বৈচিত্ৰ্যৰ কিছু অংশ সুৰক্ষা দিয়ে। কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান এশিঙীয়া গঁড়ৰ বাবে বিখ্যাত আৰু ই ইউনেস্ক' বিশ্ব ঐতিহ্য ক্ষেত্ৰ।", "মানাহ ৰাষ্ট্ৰীয় উদ্যান সোণালী বান্দৰ আৰু পিগমি হগৰ বাবে জনাজাত আৰু ই বাঘ সংৰক্ষিত বনাঞ্চল তথা জীৱমণ্ডল সংৰক্ষিত অঞ্চল। নামেৰি, ওৰাং, ডিব্ৰু-চৈখোৱা আৰু ৰাইমনা ৰাজ্যখনৰ আন ৰাষ্ট্ৰীয় উদ্যান।"]
  },
  list: {
    en: ["Kaziranga is famous for the one-horned rhinoceros.", "Kaziranga is a UNESCO World Heritage Site.", "Manas is known for the golden langur.", "Assam has seven national parks."],
    as: ["কাজিৰঙা এশিঙীয়া গঁড়ৰ বাবে বিখ্যাত।", "কাজিৰঙা ইউনেস্ক' বিশ্ব ঐতিহ্য ক্ষেত্ৰ।", "মানাহ সোণালী বান্দৰৰ বাবে জনাজাত।", "অসমত সাতখন ৰাষ্ট্ৰীয় উদ্যান আছে।"]
  },
  faqs: [
    { q: { en: "Which animal is Kaziranga National Park famous for?", as: "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান কোনটো প্ৰাণীৰ বাবে বিখ্যাত?" },
      a: { en: "Kaziranga is famous for the Indian one-horned rhinoceros and it holds the largest population of the species.", as: "কাজিৰঙা ভাৰতীয় এশিঙীয়া গঁড়ৰ বাবে বিখ্যাত আৰু ইয়াৰ প্ৰজাতিটোৰ আটাইতকৈ বেছি সংখ্যা ইয়াতেই আছে।" } }
  ]
},
"assam-natural-resources": {
  h2: { en: "Natural Resources", as: "প্ৰাকৃতিক সম্পদ" },
  p: {
    en: ["Assam is rich in natural resources. It is the largest tea producing state of India, and the tea gardens of the Brahmaputra and Barak valleys are the backbone of its rural economy.", "Assam also produces petroleum and natural gas, and Digboi in upper Assam is one of the oldest oil fields in the world. Coal, limestone and plywood are other important resources of the state."],
    as: ["অসম প্ৰাকৃতিক সম্পদত চহকী। ই ভাৰতৰ আটাইতকৈ বেছি চাহ উৎপাদন কৰা ৰাজ্য, আৰু ব্ৰহ্মপুত্ৰ আৰু বৰাক উপত্যকাৰ চাহ বাগিচাবোৰ ইয়াৰ গ্ৰাম্য অৰ্থনীতিৰ মেৰুদণ্ড।", "অসমে খনিজ তেল আৰু প্ৰাকৃতিক গেছো উৎপাদন কৰে, আৰু ওপৰ অসমৰ ডিগবৈ পৃথিৱীৰ আটাইতকৈ পুৰণি তেলক্ষেত্ৰৰ এটা। কয়লা, চূণশিল আৰু প্লাইউড ৰাজ্যখনৰ আন গুৰুত্বপূৰ্ণ সম্পদ।"]
  },
  list: {
    en: ["Assam is the largest tea producing state in India.", "Digboi is one of the oldest oil fields in the world.", "Coal and limestone are important minerals of Assam.", "Tea gardens are the backbone of the rural economy."],
    as: ["অসম ভাৰতৰ আটাইতকৈ বেছি চাহ উৎপাদন কৰা ৰাজ্য।", "ডিগবৈ পৃথিৱীৰ আটাইতকৈ পুৰণি তেলক্ষেত্ৰৰ এটা।", "কয়লা আৰু চূণশিল অসমৰ গুৰুত্বপূৰ্ণ খনিজ।", "চাহ বাগিচাবোৰ গ্ৰাম্য অৰ্থনীতিৰ মেৰুদণ্ড।"]
  },
  faqs: [
    { q: { en: "Which is the largest tea producing state of India?", as: "ভাৰতৰ আটাইতকৈ বেছি চাহ উৎপাদন কৰা ৰাজ্য কোনখন?" },
      a: { en: "Assam is the largest tea producing state of India and it accounts for more than half of the country's tea output.", as: "অসম ভাৰতৰ আটাইতকৈ বেছি চাহ উৎপাদন কৰা ৰাজ্য আৰু দেশৰ চাহ উৎপাদনৰ আধাতকৈ বেছি ইয়াৰ পৰাই হয়।" } }
  ]
},
"india-rivers-mountains-states": {
  h2: { en: "Rivers, Mountains & States", as: "নদ-নদী, পৰ্বতমালা আৰু ৰাজ্য" },
  p: {
    en: ["India is a land of great rivers and mountain ranges. The Ganga is the longest river of the country and it rises from the Gangotri glacier, while the Brahmaputra and the Indus are the other two great Himalayan rivers.", "The Himalayas in the north are the highest mountain range in the world, and the Western Ghats run along the western coast. India has twenty-eight states and eight union territories, and Assam is a state in the north-east."],
    as: ["ভাৰত মহান নদ-নদী আৰু পৰ্বতমালাৰ এখন দেশ। গংগা দেশখনৰ আটাইতকৈ দীঘল নদী আৰু ই গংগোত্ৰী হিমবাহৰ পৰা উৎপত্তি হয়, আনহাতে ব্ৰহ্মপুত্ৰ আৰু সিন্ধু আন দুখন মহান হিমালয়ী নদী।", "উত্তৰৰ হিমালয় পৃথিৱীৰ আটাইতকৈ ওখ পৰ্বতমালা, আৰু পশ্চিমঘাট পশ্চিম উপকূলেদি বৈ গৈছে। ভাৰতত আঠাইশখন ৰাজ্য আৰু আঠখন কেন্দ্ৰীয় শাসিত অঞ্চল আছে, আৰু অসম উত্তৰ-পূবৰ এখন ৰাজ্য।"]
  },
  list: {
    en: ["The Ganga is the longest river of India.", "The Ganga rises from the Gangotri glacier.", "The Himalayas are the highest mountain range in the world.", "India has twenty-eight states."],
    as: ["গংগা ভাৰতৰ আটাইতকৈ দীঘল নদী।", "গংগা গংগোত্ৰী হিমবাহৰ পৰা উৎপত্তি হয়।", "হিমালয় পৃথিৱীৰ আটাইতকৈ ওখ পৰ্বতমালা।", "ভাৰতত আঠাইশখন ৰাজ্য আছে।"]
  },
  faqs: [
    { q: { en: "Which is the longest river of India?", as: "ভাৰতৰ আটাইতকৈ দীঘল নদী কোনখন?" },
      a: { en: "The Ganga is the longest river of India and it flows from the Gangotri glacier to the Bay of Bengal.", as: "গংগা ভাৰতৰ আটাইতকৈ দীঘল নদী আৰু ই গংগোত্ৰী হিমবাহৰ পৰা বংগোপসাগৰলৈ বৈ যায়।" } }
  ]
},
"important-days-dates": {
  h2: { en: "Important Days & Dates", as: "উল্লেখযোগ্য দিন আৰু দিৱস" },
  p: {
    en: ["Several national days are asked directly in general knowledge papers. Independence Day is observed on 15 August, Republic Day on 26 January and Gandhi Jayanti on 2 October, and these three are the national holidays of India.", "Among the international days, World Environment Day falls on 5 June, International Yoga Day on 21 June and Teachers' Day in India on 5 September, the birthday of Dr Sarvepalli Radhakrishnan."],
    as: ["কেইটামান ৰাষ্ট্ৰীয় দিৱস সাধাৰণ জ্ঞানৰ পত্ৰত পোনপটীয়াকৈ সোধা হয়। স্বাধীনতা দিৱস ১৫ আগষ্টত, গণৰাজ্য দিৱস ২৬ জানুৱাৰীত আৰু গান্ধী জয়ন্তী ২ অক্টোবৰত পালন কৰা হয়, আৰু এই তিনিটা ভাৰতৰ ৰাষ্ট্ৰীয় বন্ধ।", "আন্তৰ্জাতিক দিৱসসমূহৰ ভিতৰত বিশ্ব পৰিৱেশ দিৱস ৫ জুনত, আন্তৰ্জাতিক যোগ দিৱস ২১ জুনত আৰু ভাৰতত শিক্ষক দিৱস ৫ ছেপ্তেম্বৰত, ড° সৰ্বপল্লী ৰাধাকৃষ্ণনৰ জন্মদিনত পালন কৰা হয়।"]
  },
  list: {
    en: ["Independence Day is observed on 15 August.", "Republic Day is observed on 26 January.", "World Environment Day is on 5 June.", "Teachers' Day is celebrated on 5 September."],
    as: ["স্বাধীনতা দিৱস ১৫ আগষ্টত পালন কৰা হয়।", "গণৰাজ্য দিৱস ২৬ জানুৱাৰীত পালন কৰা হয়।", "বিশ্ব পৰিৱেশ দিৱস ৫ জুনত।", "শিক্ষক দিৱস ৫ ছেপ্তেম্বৰত পালন কৰা হয়।"]
  },
  faqs: [
    { q: { en: "On which date is Republic Day celebrated?", as: "গণৰাজ্য দিৱস কোন তাৰিখে পালন কৰা হয়?" },
      a: { en: "Republic Day is celebrated on 26 January every year to mark the coming into force of the Constitution of India in 1950.", as: "১৯৫০ চনত ভাৰতৰ সংবিধান কাৰ্যকৰী হোৱাৰ স্মৃতিত প্ৰতি বছৰে ২৬ জানুৱাৰীত গণৰাজ্য দিৱস পালন কৰা হয়।" } }
  ]
},
"awards-honours": {
  h2: { en: "Awards & Honours", as: "বঁটা আৰু সন্মান" },
  p: {
    en: ["The highest civilian award of India is the Bharat Ratna, followed by the Padma Vibhushan, the Padma Bhushan and the Padma Shri. The Param Vir Chakra is the highest military decoration of the country.", "Among the literary and cultural awards, the Jnanpith Award is given for outstanding contribution to Indian literature and the Sangeet Natak Akademi Award for performing arts. Assam's Bhupen Hazarika received the Bharat Ratna and the Dadasaheb Phalke Award."],
    as: ["ভাৰতৰ সৰ্বোচ্চ অসামৰিক বঁটা হৈছে ভাৰত ৰত্ন, তাৰ পিছত পদ্মবিভূষণ, পদ্মভূষণ আৰু পদ্মশ্ৰী। পৰম বীৰ চক্ৰ দেশখনৰ সৰ্বোচ্চ সামৰিক সন্মান।", "সাহিত্য আৰু সাংস্কৃতিক বঁটাসমূহৰ ভিতৰত ভাৰতীয় সাহিত্যলৈ অসাধাৰণ অৱদানৰ বাবে জ্ঞানপীঠ বঁটা আৰু পৰিৱেশন কলাৰ বাবে সংগীত নাটক একাডেমী বঁটা দিয়া হয়। অসমৰ ভূপেন হাজৰিকাই ভাৰত ৰত্ন আৰু দাদাচাহেব ফাল্কে বঁটা লাভ কৰিছিল।"]
  },
  list: {
    en: ["Bharat Ratna is the highest civilian award of India.", "Param Vir Chakra is the highest military decoration.", "Jnanpith Award is given for literature.", "Bhupen Hazarika received the Bharat Ratna."],
    as: ["ভাৰত ৰত্ন ভাৰতৰ সৰ্বোচ্চ অসামৰিক বঁটা।", "পৰম বীৰ চক্ৰ সৰ্বোচ্চ সামৰিক সন্মান।", "জ্ঞানপীঠ বঁটা সাহিত্যৰ বাবে দিয়া হয়।", "ভূপেন হাজৰিকাই ভাৰত ৰত্ন লাভ কৰিছিল।"]
  },
  faqs: [
    { q: { en: "Which is the highest civilian award of India?", as: "ভাৰতৰ সৰ্বোচ্চ অসামৰিক বঁটা কোনটো?" },
      a: { en: "The Bharat Ratna is the highest civilian award of India, followed by the Padma Vibhushan, the Padma Bhushan and the Padma Shri.", as: "ভাৰত ৰত্ন ভাৰতৰ সৰ্বোচ্চ অসামৰিক বঁটা, তাৰ পিছত পদ্মবিভূষণ, পদ্মভূষণ আৰু পদ্মশ্ৰী।" } }
  ]
},
"sports": {
  h2: { en: "Sports", as: "খেল-ধেমালি" },
  p: {
    en: ["Sports questions in general knowledge cover the national games, famous trophies and the major international events. Hockey is regarded as the national game of India, and cricket, football and kabaddi are among the most popular sports.", "The Ranji Trophy is a cricket tournament, the Santosh Trophy is for football and the Durand Cup is an old football competition. The Olympic Games are held once in four years."],
    as: ["সাধাৰণ জ্ঞানৰ খেল-ধেমালিৰ প্ৰশ্নই ৰাষ্ট্ৰীয় খেল, বিখ্যাত ট্ৰফী আৰু প্ৰধান আন্তৰ্জাতিক প্ৰতিযোগিতাসমূহ সামৰি লয়। হকীক ভাৰতৰ ৰাষ্ট্ৰীয় খেল হিচাপে গণ্য কৰা হয়, আৰু ক্ৰিকেট, ফুটবল আৰু কাবাডি আটাইতকৈ জনপ্ৰিয় খেলবোৰৰ ভিতৰত।", "ৰঞ্জী ট্ৰফী ক্ৰিকেটৰ প্ৰতিযোগিতা, সন্তোষ ট্ৰফী ফুটবলৰ আৰু ডুৰাণ্ড কাপ এটা পুৰণি ফুটবল প্ৰতিযোগিতা। অলিম্পিক খেল চাৰি বছৰত এবাৰ অনুষ্ঠিত হয়।"]
  },
  list: {
    en: ["Hockey is regarded as the national game of India.", "The Ranji Trophy is a cricket tournament.", "The Santosh Trophy is for football.", "The Olympic Games are held once in four years."],
    as: ["হকীক ভাৰতৰ ৰাষ্ট্ৰীয় খেল হিচাপে গণ্য কৰা হয়।", "ৰঞ্জী ট্ৰফী এটা ক্ৰিকেট প্ৰতিযোগিতা।", "সন্তোষ ট্ৰফী ফুটবলৰ বাবে।", "অলিম্পিক খেল চাৰি বছৰত এবাৰ অনুষ্ঠিত হয়।"]
  },
  faqs: [
    { q: { en: "Which trophy is associated with cricket?", as: "কোনটো ট্ৰফী ক্ৰিকেটৰ সৈতে জড়িত?" },
      a: { en: "The Ranji Trophy is a first-class cricket tournament of India, named after Ranjitsinhji.", as: "ৰঞ্জী ট্ৰফী ভাৰতৰ এটা প্ৰথম শ্ৰেণীৰ ক্ৰিকেট প্ৰতিযোগিতা, ৰণজিতসিংহীৰ নামত নামাকৰণ কৰা।" } }
  ]
},
"assam-india-current-affairs": {
  h2: { en: "Assam & India Current Affairs", as: "অসম আৰু ভাৰতৰ সাম্প্ৰতিক ঘটনাৱলী" },
  p: {
    en: ["Current affairs questions in the ADRE Grade III paper are drawn from the events of roughly the last six to twelve months. State events such as new schemes, appointments and infrastructure projects in Assam are asked alongside national developments.", "The reliable method is to keep a monthly diary of important events and revise it before the examination. Do not try to memorise every news item; note only what is repeated in the standard current affairs material."],
    as: ["ADRE গ্ৰেড III পত্ৰত সাম্প্ৰতিক ঘটনাৱলীৰ প্ৰশ্ন প্ৰায় বিগত ছয়ৰ পৰা বাৰ মাহৰ ঘটনাৰ পৰা লোৱা হয়। নতুন আঁচনি, নিয়োগ আৰু আন্তঃগাঁথনি প্ৰকল্পৰ দৰে অসমৰ ৰাজ্যিক ঘটনা ৰাষ্ট্ৰীয় পৰিঘটনাৰ লগতে সোধা হয়।", "নিৰ্ভৰযোগ্য পদ্ধতি হৈছে গুৰুত্বপূৰ্ণ ঘটনাৰ মাহেকীয়া ডায়েৰী ৰখা আৰু পৰীক্ষাৰ আগতে পুনৰালোচনা কৰা। প্ৰতিটো বাতৰি মুখস্থ কৰিবলৈ নাচাব; মানক সাম্প্ৰতিক ঘটনাৱলীৰ সামগ্ৰীত যি পুনৰাবৃত্তি হয় তাকেহে টুকি ল'ব।"]
  },
  list: {
    en: ["Keep a monthly diary of important events.", "Focus on the last six to twelve months.", "Assam state events are asked along with national events.", "Revise the diary once a week."],
    as: ["গুৰুত্বপূৰ্ণ ঘটনাৰ মাহেকীয়া ডায়েৰী ৰাখক।", "বিগত ছয়ৰ পৰা বাৰ মাহৰ ওপৰত গুৰুত্ব দিয়ক।", "অসমৰ ৰাজ্যিক ঘটনা ৰাষ্ট্ৰীয় পৰিঘটনাৰ লগতে সোধা হয়।", "সপ্তাহত এবাৰ ডায়েৰীখন পুনৰালোচনা কৰক।"]
  },
  faqs: [
    { q: { en: "For how many months of current affairs should I prepare?", as: "কিমান মাহৰ সাম্প্ৰতিক ঘটনাৱলীৰ বাবে প্ৰস্তুতি ল'ব লাগে?" },
      a: { en: "Prepare the events of the last six to twelve months before the examination, as most questions are drawn from that window.", as: "পৰীক্ষাৰ আগতে বিগত ছয়ৰ পৰা বাৰ মাহৰ ঘটনাৱলী প্ৰস্তুত কৰক, কাৰণ বেছিভাগ প্ৰশ্ন সেই সময়ছোৱাৰ পৰাই লোৱা হয়।" } }
  ]
},
"government-schemes": {
  h2: { en: "Government Schemes", as: "চৰকাৰী আঁচনি" },
  p: {
    en: ["Government schemes form a regular part of current affairs. At the national level, schemes such as Ayushman Bharat for health and PM-KISAN for farmers are asked frequently.", "At the state level the Assam Government runs schemes for education, health, women's welfare and employment. Read the official state portal for the current list, because schemes are launched and renamed from time to time."],
    as: ["চৰকাৰী আঁচনি সাম্প্ৰতিক ঘটনাৱলীৰ নিয়মীয়া অংশ। ৰাষ্ট্ৰীয় পৰ্যায়ত স্বাস্থ্যৰ বাবে আয়ুষ্মান ভাৰত আৰু কৃষকৰ বাবে পিএম-কিষাণৰ দৰে আঁচনি সঘনাই সোধা হয়।", "ৰাজ্যিক পৰ্যায়ত অসম চৰকাৰে শিক্ষা, স্বাস্থ্য, মহিলা কল্যাণ আৰু নিয়োগৰ বাবে আঁচনি চলায়। আঁচনিবোৰ সময়ে সময়ে আৰম্ভ আৰু নতুন নামেৰে চলোৱা হয়, গতিকে বৰ্তমানৰ তালিকাৰ বাবে আধিকাৰিক ৰাজ্যিক পৰ্টেল পঢ়ক।"]
  },
  list: {
    en: ["Ayushman Bharat is a national health scheme.", "PM-KISAN supports farmers with income assistance.", "Assam runs its own welfare schemes for women and youth.", "Check the official state portal for the current list."],
    as: ["আয়ুষ্মান ভাৰত এটা ৰাষ্ট্ৰীয় স্বাস্থ্য আঁচনি।", "পিএম-কিষাণে কৃষকক আয় সহায় দিয়ে।", "অসমে মহিলা আৰু যুৱক-যুৱতীৰ বাবে নিজৰ কল্যাণ আঁচনি চলায়।", "বৰ্তমানৰ তালিকাৰ বাবে আধিকাৰিক ৰাজ্যিক পৰ্টেল চাওক।"]
  },
  faqs: [
    { q: { en: "Why should schemes be read from the official portal?", as: "আঁচনিবোৰ আধিকাৰিক পৰ্টেলৰ পৰা কিয় পঢ়িব লাগে?" },
      a: { en: "Because schemes are launched, expanded and renamed from time to time, and only the official portal carries the current position.", as: "কাৰণ আঁচনিবোৰ সময়ে সময়ে আৰম্ভ, সম্প্ৰসাৰিত আৰু নতুন নামেৰে চলোৱা হয়, আৰু বৰ্তমানৰ অৱস্থা কেৱল আধিকাৰিক পৰ্টেলত থাকে।" } }
  ]
},
"number-alphabet-series": {
  h2: { en: "Number Series & Alphabet Series", as: "সংখ্যা আৰু বৰ্ণমালাৰ শৃংখলা" },
  p: {
    en: ["A series question gives a sequence of numbers or letters with one missing or wrong term, and the rule that generates the sequence must be found. The rule is usually a constant difference, a constant ratio or an alternating pattern.", "For alphabet series, write the position numbers of the letters from A to Z and treat the series as a number series. Practising the position table from A to Z makes these questions quick."],
    as: ["শৃংখলাৰ প্ৰশ্নই সংখ্যা বা আখৰৰ এটা ক্ৰম দিয়ে যাৰ এটা পদ হেৰাই যায় বা ভুল থাকে, আৰু ক্ৰমটো সৃষ্টি কৰা নিয়ম বিচাৰিব লাগে। নিয়মটো সাধাৰণতে এটা স্থিৰ পাৰ্থক্য, স্থিৰ অনুপাত বা পালা-পালি আৰ্হি।", "বৰ্ণমালাৰ শৃংখলাৰ বাবে A ৰ পৰা Z লৈকে আখৰবোৰৰ স্থান সংখ্যা লিখি শৃংখলাটোক সংখ্যা শৃংখলা হিচাপে গণ্য কৰক। A ৰ পৰা Z লৈকে স্থানৰ তালিকা অভ্যাস কৰিলে এই প্ৰশ্নবোৰ দ্ৰুত হয়।"]
  },
  list: {
    en: ["Look first for a constant difference between terms.", "If the difference is not constant, check the ratio.", "Write the alphabet positions from A to Z.", "Sometimes two series are mixed into one."],
    as: ["প্ৰথমে পদবোৰৰ মাজত স্থিৰ পাৰ্থক্য বিচাৰক।", "পাৰ্থক্য স্থিৰ নহ'লে অনুপাত পৰীক্ষা কৰক।", "A ৰ পৰা Z লৈকে বৰ্ণমালাৰ স্থান লিখক।", "কেতিয়াবা দুটা শৃংখলা মিলাই এটা কৰা হয়।"]
  },
  faqs: [
    { q: { en: "What is the usual first step in a number series question?", as: "সংখ্যা শৃংখলাৰ প্ৰশ্নত সাধাৰণতে প্ৰথম পদক্ষেপ কি?" },
      a: { en: "Find the difference between the consecutive terms. If the difference is constant it is an arithmetic series; if not, check whether the terms are multiplied or squared.", as: "ক্ৰমিক পদবোৰৰ মাজৰ পাৰ্থক্য বিচাৰক। পাৰ্থক্য স্থিৰ হ'লে ই এটা সমান্তৰ শৃংখলা; নহ'লে পদবোৰ পূৰণ কৰা নে বৰ্গ কৰা হৈছে পৰীক্ষা কৰক।" } }
  ]
},
"coding-decoding": {
  h2: { en: "Coding-Decoding", as: "সংকেত নিৰ্ণয়" },
  p: {
    en: ["In coding-decoding a word or a number is written in a secret code and the same code must be applied to another word. Letter codes usually shift each letter forward or backward by a fixed number of places.", "Number codes may assign a number to each letter from its position in the alphabet, or they may reverse the word before coding it. Writing the alphabet with positions makes the pattern visible quickly."],
    as: ["সংকেত নিৰ্ণয়ত এটা শব্দ বা সংখ্যা গোপন সংকেতত লিখা হয় আৰু একেই সংকেত আন এটা শব্দত প্ৰয়োগ কৰিব লাগে। আখৰৰ সংকেতত সাধাৰণতে প্ৰতিটো আখৰক এটা স্থিৰ সংখ্যক স্থান আগলৈ বা পিছলৈ সৰকোৱা হয়।", "সংখ্যা সংকেতত বৰ্ণমালাৰ স্থানৰ পৰা প্ৰতিটো আখৰক এটা সংখ্যা দিয়া হয়, বা সংকেত কৰাৰ আগতে শব্দটো ওলোটা কৰা হয়। স্থানৰ সৈতে বৰ্ণমালা লিখিলে আৰ্হিটো দ্ৰুতভাৱে দেখা যায়।"]
  },
  list: {
    en: ["Write the alphabet with position numbers 1 to 26.", "Check for a constant forward or backward shift.", "Some codes reverse the word first.", "Apply the same rule found in the example."],
    as: ["বৰ্ণমালা 1 ৰ পৰা 26 লৈকে স্থান সংখ্যাৰ সৈতে লিখক।", "স্থিৰ আগলৈ বা পিছলৈ সৰকা আছে নে নাই পৰীক্ষা কৰক।", "কিছুমান সংকেতত প্ৰথমে শব্দটো ওলোটা কৰা হয়।", "উদাহৰণত পোৱা একেই নিয়ম প্ৰয়োগ কৰক।"]
  },
  faqs: [
    { q: { en: "How should I start a letter coding question?", as: "আখৰৰ সংকেতৰ প্ৰশ্ন কেনেকৈ আৰম্ভ কৰিব?" },
      a: { en: "Write the alphabet with its position numbers and compare the coded word with the original letter by letter to find the shift.", as: "বৰ্ণমালা স্থান সংখ্যাৰ সৈতে লিখি সৰকাটো বিচাৰিবলৈ সংকেতিত শব্দটোক মূল শব্দৰ সৈতে আখৰে আখৰে তুলনা কৰক।" } }
  ]
},
"blood-relations": {
  h2: { en: "Blood Relations", as: "তেজৰ সম্পৰ্ক" },
  p: {
    en: ["Blood relation questions describe a family in words and ask how two persons are related. The safest method is to draw a small family tree using simple symbols for male, female and marriage.", "Confusion usually comes from words such as brother of the sister of my mother, which can be simplified step by step. Solve the relation from the inside outwards."],
    as: ["তেজৰ সম্পৰ্কৰ প্ৰশ্নই এটা পৰিয়ালক শব্দত বৰ্ণনা কৰে আৰু দুজন ব্যক্তিৰ মাজৰ সম্পৰ্ক সোধে। আটাইতকৈ সুৰক্ষিত পদ্ধতি হৈছে পুৰুষ, মহিলা আৰু বিবাহৰ বাবে সৰল চিহ্ন ব্যৱহাৰ কৰি এজোপা সৰু বংশলতিকা অঁকা।", "সাধাৰণতে মোৰ মাকৰ ভনীৰ ভাইৰ দৰে শব্দৰ পৰা বিভ্ৰান্তি হয়, যাক ধাপে ধাপে সৰল কৰিব পাৰি। সম্পৰ্কটো ভিতৰৰ পৰা বাহিৰলৈ সমাধান কৰক।"]
  },
  list: {
    en: ["Draw a family tree with symbols for male and female.", "Read the statement from the inside outwards.", "The brother of your father is your uncle.", "The daughter of your uncle is your cousin."],
    as: ["পুৰুষ আৰু মহিলাৰ চিহ্নৰ সৈতে বংশলতিকা অঁকক।", "বিবৃতিটো ভিতৰৰ পৰা বাহিৰলৈ পঢ়ক।", "তোমাৰ দেউতাকৰ ভাই হৈছে তোমাৰ খুড়া/বৰদেউতা।", "তোমাৰ খুড়াৰ জীয়েক হৈছে তোমাৰ সম্বন্ধীয় ভনী।"]
  },
  faqs: [
    { q: { en: "What is the best way to solve a blood relation question?", as: "তেজৰ সম্পৰ্কৰ প্ৰশ্ন সমাধান কৰাৰ আটাইতকৈ ভাল উপায় কি?" },
      a: { en: "Draw a small family tree with symbols and read the statement from the inside outwards instead of trying to hold it all in memory.", as: "চিহ্নৰ সৈতে এজোপা সৰু বংশলতিকা অঁক আৰু গোটেইটো মনত ৰাখিবলৈ নাচাই ভিতৰৰ পৰা বাহিৰলৈ বিবৃতিটো পঢ়ক।" } }
  ]
},
"direction-distance": {
  h2: { en: "Direction Sense Test", as: "দিশ আৰু দূৰত্ব নিৰ্ণয়" },
  p: {
    en: ["A direction question describes a journey in terms of turns and distances and asks for the final direction or the straight-line distance from the starting point. The four main directions are north, south, east and west.", "The reliable method is to draw the path on paper with north upwards and east to the right. The straight-line distance is then found with the Pythagoras theorem when the path forms a right angle."],
    as: ["দিশৰ প্ৰশ্নই ঘূৰা আৰু দূৰত্বৰ হিচাপত এটা যাত্ৰা বৰ্ণনা কৰে আৰু শেষৰ দিশ বা আৰম্ভণিৰ পৰা চৰলৰেখাৰ দূৰত্ব সোধে। চাৰিটা প্ৰধান দিশ হৈছে উত্তৰ, দক্ষিণ, পূব আৰু পশ্চিম।", "নিৰ্ভৰযোগ্য পদ্ধতি হৈছে উত্তৰ ওপৰলৈ আৰু পূব সোঁফাললৈ ৰাখি কাগজত পথটো অঁকা। পথটোৱে সমকোণ কৰিলে পাইথাগোৰাছৰ উপপাদ্যৰে চৰলৰেখাৰ দূৰত্ব পোৱা যায়।"]
  },
  list: {
    en: ["Draw north upwards and east to the right.", "A right turn from north leads to east.", "Use the Pythagoras theorem for a straight-line distance.", "A left turn reverses the direction of the previous turn."],
    as: ["উত্তৰ ওপৰলৈ আৰু পূব সোঁফাললৈ অঁকক।", "উত্তৰৰ পৰা সোঁফালে ঘূৰিলে পূব হয়।", "চৰলৰেখাৰ দূৰত্বৰ বাবে পাইথাগোৰাছৰ উপপাদ্য ব্যৱহাৰ কৰক।", "বাওঁফালে ঘূৰিলে আগৰ ঘূৰাৰ দিশ ওলোটা হয়।"]
  },
  faqs: [
    { q: { en: "How do I find the straight-line distance after a journey?", as: "যাত্ৰাৰ পিছত চৰলৰেখাৰ দূৰত্ব কেনেকৈ বিচাৰিব?" },
      a: { en: "Draw the path and reduce it to a right-angled triangle, then apply the Pythagoras theorem to the two shorter sides.", as: "পথটো অঁকি ইয়াক এটা সমকোণী ত্ৰিভুজলৈ ৰূপান্তৰ কৰক, তাৰ পিছত দুটা সৰু বাহুত পাইথাগোৰাছৰ উপপাদ্য প্ৰয়োগ কৰক।" } }
  ]
},
"analogy": {
  h2: { en: "Analogy", as: "সাদৃশ্য" },
  p: {
    en: ["An analogy question gives a pair of related words and asks for another pair with the same relation. The relation may be that of a part to a whole, a worker to a tool, a cause to an effect or a synonym.", "The method is to state the relation in a short sentence and then test each option against that sentence. Only one option will fit the relation exactly."],
    as: ["সাদৃশ্যৰ প্ৰশ্নই সম্পৰ্কিত দুটা শব্দৰ যোৰ দিয়ে আৰু একেই সম্পৰ্ক থকা আন এটা যোৰ বিচাৰে। সম্পৰ্কটো অংগ আৰু অখণ্ড, কৰ্মী আৰু সঁজুলি, কাৰণ আৰু ফল বা সমাৰ্থকৰ হ'ব পাৰে।", "পদ্ধতিটো হৈছে সম্পৰ্কটো এটা চুটি বাক্যত কৈ প্ৰতিটো বিকল্পক সেই বাক্যৰ লগত পৰীক্ষা কৰা। কেৱল এটা বিকল্পই সম্পৰ্কটোৰ লগত সঠিকভাৱে মিলিব।"]
  },
  list: {
    en: ["State the relation in a short sentence first.", "Test every option against that sentence.", "Common relations are worker and tool, and cause and effect.", "Only one option fits the relation exactly."],
    as: ["প্ৰথমে সম্পৰ্কটো এটা চুটি বাক্যত কওক।", "প্ৰতিটো বিকল্পক সেই বাক্যৰ লগত পৰীক্ষা কৰক।", "সাধাৰণ সম্পৰ্ক হৈছে কৰ্মী আৰু সঁজুলি, আৰু কাৰণ আৰু ফল।", "কেৱল এটা বিকল্পই সম্পৰ্কটোৰ লগত সঠিকভাৱে মিলে।"]
  },
  faqs: [
    { q: { en: "How do you solve an analogy question?", as: "সাদৃশ্যৰ প্ৰশ্ন কেনেকৈ সমাধান কৰিব?" },
      a: { en: "Express the relation between the first pair in a short sentence, then apply the same sentence to each option and keep the one that fits exactly.", as: "প্ৰথম যোৰৰ মাজৰ সম্পৰ্ক এটা চুটি বাক্যত প্ৰকাশ কৰক, তাৰ পিছত একেই বাক্য প্ৰতিটো বিকল্পত প্ৰয়োগ কৰি সঠিকভাৱে মিলা এটা ৰাখক।" } }
  ]
},
"odd-one-out": {
  h2: { en: "Classification / Odd One Out", as: "শ্ৰেণীবিভাজন আৰু অমিল" },
  p: {
    en: ["In classification questions a group of words or numbers is given and all but one share a common property. The odd one out is the item that does not belong to the group.", "The property may be a grammatical class, a biological family, a mathematical quality such as being a prime or a perfect square, or the number of letters in a word."],
    as: ["শ্ৰেণীবিভাজনৰ প্ৰশ্নত শব্দ বা সংখ্যাৰ এটা গোট দিয়া হয় আৰু এটাক এৰি আটাইবোৰে এটা সাধাৰণ ধৰ্ম বহন কৰে। অমিলটো হৈছে গোটটোত নপৰা বস্তুটো।", "ধৰ্মটো ব্যাকৰণৰ শ্ৰেণী, জীৱবিজ্ঞানৰ পৰিয়াল, মৌলিক বা পূৰ্ণবৰ্গ হোৱাৰ দৰে গাণিতিক গুণ, বা এটা শব্দত থকা আখৰৰ সংখ্যা হ'ব পাৰে।"]
  },
  list: {
    en: ["Find the common property of most of the items.", "The odd one out lacks that property.", "The property may be grammatical, biological or mathematical.", "Check every option against the property before answering."],
    as: ["বেছিভাগ বস্তুৰ সাধাৰণ ধৰ্মটো বিচাৰক।", "অমিলটোত সেই ধৰ্মটো নাথাকে।", "ধৰ্মটো ব্যাকৰণ, জীৱবিজ্ঞান বা গণিতৰ হ'ব পাৰে।", "উত্তৰ দিয়াৰ আগতে প্ৰতিটো বিকল্প ধৰ্মটোৰ লগত পৰীক্ষা কৰক।"]
  },
  faqs: [
    { q: { en: "What should I look for in an odd one out question?", as: "অমিল নিৰ্ণয়ৰ প্ৰশ্নত কি চাব লাগে?" },
      a: { en: "Find the property that most of the items share, then pick the item that does not have that property.", as: "বেছিভাগ বস্তুৱে ভাগ কৰা ধৰ্মটো বিচাৰক, তাৰ পিছত সেই ধৰ্মটো নথকা বস্তুটো বাছনি কৰক।" } }
  ]
},
"ranking-order": {
  h2: { en: "Ranking & Order Test", as: "ক্ৰম আৰু স্থান নিৰ্ণয়" },
  p: {
    en: ["Ranking questions place a row of persons or objects in an order and ask for the position of one of them from either end. The total number of persons in the row is found by adding the two positions and subtracting one.", "When the position of the same person is given from both ends, the formula is total equals the sum of the two positions minus one, because the person is counted twice."],
    as: ["ক্ৰম নিৰ্ণয়ৰ প্ৰশ্নই শাৰী এটাত ব্যক্তি বা বস্তুবোৰ এটা ক্ৰমত ৰাখে আৰু তাৰ এটাৰ স্থান যিকোনো মূৰৰ পৰা সোধে। শাৰীটোত মুঠ ব্যক্তিৰ সংখ্যা দুটা স্থান যোগ কৰি এক বিয়োগ কৰিলে পোৱা যায়।", "একে ব্যক্তিৰ স্থান দুয়ো মূৰৰ পৰা দিলে, সূত্ৰটো হৈছে মুঠ সংখ্যা দুটা স্থানৰ যোগফলৰ পৰা এক বিয়োগ কৰা মান, কাৰণ ব্যক্তিটো দুবাৰ গণনা কৰা হয়।"]
  },
  list: {
    en: ["Total in a row equals left position plus right position minus one.", "Count the person only once in the total.", "Draw a small row to check the answer.", "Read carefully whether the question asks from the left or the right."],
    as: ["শাৰী এটাৰ মুঠ সংখ্যা হৈছে বাওঁ স্থান যোগ সোঁ স্থান বিয়োগ এক।", "মুঠত ব্যক্তিটোক কেৱল এবাৰহে গণনা কৰক।", "উত্তৰ পৰীক্ষা কৰিবলৈ এটা সৰু শাৰী অঁকক।", "প্ৰশ্নই বাওঁৰ পৰা নে সোঁৰ পৰা সোধে মন কৰি পঢ়ক।"]
  },
  faqs: [
    { q: { en: "How do you find the total number of persons in a row?", as: "শাৰী এটাত মুঠ ব্যক্তিৰ সংখ্যা কেনেকৈ বিচাৰিব?" },
      a: { en: "Add the position of the person from the left and from the right, then subtract one, because that person is counted in both positions.", as: "বাওঁ আৰু সোঁৰ পৰা ব্যক্তিটোৰ স্থান যোগ কৰি এক বিয়োগ কৰক, কাৰণ ব্যক্তিটো দুয়োটা স্থানতে গণনা কৰা হয়।" } }
  ]
},
"word-formation-dictionary": {
  h2: { en: "Word Formation & Dictionary Order", as: "শব্দ গঠন আৰু অভিধানৰ ক্ৰম" },
  p: {
    en: ["Word formation questions ask which meaningful word can be made from the letters of a given word, or how many such words are possible. Only the letters present in the given word may be used, and each letter may be used as many times as it appears.", "Dictionary order questions ask for the order in which words would appear in a dictionary. Arrange them by the first letter, and if the first letters are the same, move to the second letter and so on."],
    as: ["শব্দ গঠনৰ প্ৰশ্নই সোধে যে এটা দিয়া শব্দৰ আখৰৰ পৰা কোনটো অৰ্থবোধক শব্দ গঠন কৰিব পাৰি, বা তেনে কিমানটা শব্দ সম্ভৱ। কেৱল দিয়া শব্দত থকা আখৰহে ব্যৱহাৰ কৰিব পাৰি, আৰু প্ৰতিটো আখৰ যিমানবাৰ আছে সিমানবাৰ ব্যৱহাৰ কৰিব পাৰি।", "অভিধানৰ ক্ৰমৰ প্ৰশ্নই সোধে যে শব্দবোৰ অভিধানত যি ক্ৰমত থাকে সেই ক্ৰম। প্ৰথম আখৰ অনুসৰি সজাওক, আৰু প্ৰথম আখৰ একে হ'লে দ্বিতীয় আখৰলৈ যাওক ইত্যাদি।"]
  },
  list: {
    en: ["Use only the letters present in the given word.", "A letter cannot be used more often than it appears.", "For dictionary order compare letters from the left.", "If two words begin alike, compare the next letter."],
    as: ["কেৱল দিয়া শব্দত থকা আখৰহে ব্যৱহাৰ কৰক।", "এটা আখৰ যিমানবাৰ আছে তাতকৈ বেছিবাৰ ব্যৱহাৰ কৰিব নোৱাৰি।", "অভিধানৰ ক্ৰমৰ বাবে বাওঁৰ পৰা আখৰ তুলনা কৰক।", "দুটা শব্দ একে আখৰেৰে আৰম্ভ হ'লে পিছৰ আখৰ তুলনা কৰক।"]
  },
  faqs: [
    { q: { en: "How are words arranged in dictionary order?", as: "অভিধানৰ ক্ৰমত শব্দবোৰ কেনেকৈ সজোৱা হয়?" },
      a: { en: "Words are arranged alphabetically, comparing the first letter, then the second, and so on until the order is decided.", as: "শব্দবোৰ বৰ্ণানুক্ৰমে সজোৱা হয়, প্ৰথম আখৰ, তাৰ পিছত দ্বিতীয় আখৰ তুলনা কৰি ক্ৰম নিৰ্ণয় নোহোৱালৈকে আগবাঢ়ি যায়।" } }
  ]
},
"venn-diagrams": {
  h2: { en: "Venn Diagrams", as: "ভেন ডায়াগ্ৰাম" },
  p: {
    en: ["A Venn diagram shows the relation between two or three classes with overlapping circles. Two classes may be entirely separate, one may be inside the other, or they may partly overlap.", "The question usually gives a statement such as all cats are animals and asks which diagram best represents the relation. Reading the statement carefully and drawing the circles is enough."],
    as: ["ভেন ডায়াগ্ৰামে দুটা বা তিনি টা শ্ৰেণীৰ মাজৰ সম্পৰ্ক ওপৰাওপৰ হোৱা বৃত্তৰ জৰিয়তে দেখুৱায়। দুটা শ্ৰেণী সম্পূৰ্ণ বেলেগ হ'ব পাৰে, এটা আনটোৰ ভিতৰত থাকিব পাৰে, বা দুয়ো আংশিকভাৱে ওপৰাওপৰ হ'ব পাৰে।", "প্ৰশ্নই সাধাৰণতে 'সকলো মেকুৰী প্ৰাণী' ধৰণৰ এটা বিবৃতি দি কোনটো ডায়াগ্ৰামে সম্পৰ্কটো সঠিকভাৱে দেখুৱায় সোধে। বিবৃতিটো সাৱধানে পঢ়ি বৃত্তবোৰ অঁকালেই যথেষ্ট।"]
  },
  list: {
    en: ["A circle represents one class.", "Overlapping circles mean the classes partly share members.", "A circle inside another means one class is a part of the other.", "Separate circles mean the classes have nothing in common."],
    as: ["এটা বৃত্তই এটা শ্ৰেণীক সূচায়।", "ওপৰাওপৰ হোৱা বৃত্তই কয় যে শ্ৰেণীবোৰে আংশিকভাৱে সদস্য ভাগ কৰে।", "এটা বৃত্ত আন এটাৰ ভিতৰত থাকিলে এটা শ্ৰেণী আনটোৰ অংশ।", "বেলেগ বৃত্তই কয় যে শ্ৰেণীবোৰৰ মাজত একো সাধাৰণ নাই।"]
  },
  faqs: [
    { q: { en: "What does an overlapping region in a Venn diagram mean?", as: "ভেন ডায়াগ্ৰামত ওপৰাওপৰ অংশই কি বুজায়?" },
      a: { en: "The overlapping region contains the members that belong to both classes at the same time.", as: "ওপৰাওপৰ অংশত সেই সদস্যবোৰ থাকে যিবোৰ একে সময়তে দুয়োটা শ্ৰেণীত পৰে।" } }
  ]
},
"syllogism": {
  h2: { en: "Syllogism / Statements & Conclusions", as: "বিবৃতি আৰু সিদ্ধান্ত" },
  p: {
    en: ["In syllogism two or three statements are given and a conclusion must be tested against them. A conclusion is valid only when it follows from the statements in every possible case.", "The safest method is to draw a Venn diagram for the statements and then check whether the conclusion is true in every diagram that fits them. A conclusion that is true in one arrangement but not in another does not follow."],
    as: ["সিদ্ধান্ত নিৰ্ণয়ত দুটা বা তিনি টা বিবৃতি দিয়া হয় আৰু এটা সিদ্ধান্ত সেইবোৰৰ লগত পৰীক্ষা কৰিব লাগে। এটা সিদ্ধান্ত কেৱল তেতিয়াহে বৈধ যেতিয়া ই প্ৰতিটো সম্ভৱ পৰিস্থিতিত বিবৃতিবোৰৰ পৰা ওলায়।", "আটাইতকৈ সুৰক্ষিত পদ্ধতি হৈছে বিবৃতিবোৰৰ বাবে এটা ভেন ডায়াগ্ৰাম অঁকা আৰু তাৰ পিছত বিবৃতিবোৰৰ লগত খাপ খোৱা প্ৰতিটো ডায়াগ্ৰামত সিদ্ধান্তটো সত্য নে নাই পৰীক্ষা কৰা। এটা সজ্জাত সত্য কিন্তু আনটোত অসত্য সিদ্ধান্ত ওলাই নাযায়।"]
  },
  list: {
    en: ["A conclusion must follow in every possible case.", "Draw a Venn diagram for the statements.", "If a conclusion fails in one diagram, it does not follow.", "Words like all, some and no change the diagram completely."],
    as: ["সিদ্ধান্ত প্ৰতিটো সম্ভৱ পৰিস্থিতিত ওলাব লাগে।", "বিবৃতিবোৰৰ বাবে এটা ভেন ডায়াগ্ৰাম অঁকক।", "এটা ডায়াগ্ৰামত সিদ্ধান্ত বিফল হ'লে ই ওলাই নাযায়।", "all, some আৰু no ৰ দৰে শব্দই ডায়াগ্ৰাম সম্পূৰ্ণ সলনি কৰে।"]
  },
  faqs: [
    { q: { en: "When does a conclusion follow from the statements?", as: "কেতিয়া এটা সিদ্ধান্ত বিবৃতিবোৰৰ পৰা ওলায়?" },
      a: { en: "A conclusion follows only when it is true in every possible arrangement of the statements, not merely in one arrangement.", as: "সিদ্ধান্ত কেৱল তেতিয়াহে ওলায় যেতিয়া ই বিবৃতিবোৰৰ প্ৰতিটো সম্ভৱ সজ্জাত সত্য, কেৱল এটা সজ্জাত নহয়।" } }
  ]
},
"mathematical-operations": {
  h2: { en: "Mathematical Operations", as: "গাণিতিক ক্ৰিয়া" },
  p: {
    en: ["In mathematical operations questions the given signs are replaced by other signs and the value of the expression must be found. The replacement must be applied everywhere before the expression is evaluated.", "After replacing the signs, apply the BODMAS order. The common mistake is to solve from left to right and forget the priority of multiplication and division."],
    as: ["গাণিতিক ক্ৰিয়াৰ প্ৰশ্নত দিয়া চিহ্নবোৰ আন চিহ্নৰে সলোৱা হয় আৰু ৰাশিটোৰ মান বিচাৰিব লাগে। ৰাশিটোৰ মান উলিওৱাৰ আগতে সলনি প্ৰতিতে প্ৰয়োগ কৰিব লাগে।", "চিহ্নবোৰ সলোৱাৰ পিছত BODMAS ক্ৰম প্ৰয়োগ কৰক। সাধাৰণ ভুল হৈছে বাওঁৰ পৰা সোঁলৈ সমাধান কৰি পূৰণ আৰু হৰণৰ অগ্ৰাধিকাৰ পাহৰি যোৱা।"]
  },
  list: {
    en: ["Replace every sign before evaluating the expression.", "Apply the BODMAS order after replacement.", "Do not solve from left to right blindly.", "Check the answer by substituting back."],
    as: ["ৰাশিটোৰ মান উলিওৱাৰ আগতে প্ৰতিটো চিহ্ন সলনি কৰক।", "সলনিৰ পিছত BODMAS ক্ৰম প্ৰয়োগ কৰক।", "অন্ধভাৱে বাওঁৰ পৰা সোঁলৈ সমাধান নকৰিব।", "পুনৰ বহুৱাই উত্তৰ পৰীক্ষা কৰক।"]
  },
  faqs: [
    { q: { en: "What is the most common mistake in mathematical operations questions?", as: "গাণিতিক ক্ৰিয়াৰ প্ৰশ্নত আটাইতকৈ সাধাৰণ ভুল কি?" },
      a: { en: "Solving the expression from left to right without applying the BODMAS order after the signs have been replaced.", as: "চিহ্নবোৰ সলোৱাৰ পিছত BODMAS ক্ৰম প্ৰয়োগ নকৰি ৰাশিটো বাওঁৰ পৰা সোঁলৈ সমাধান কৰা।" } }
  ]
},
"clock-calendar": {
  h2: { en: "Clock & Calendar", as: "ঘড়ী আৰু কেলেণ্ডাৰ" },
  p: {
    en: ["Clock questions ask for the angle between the hands of a clock at a given time, or the time when the hands are together or opposite. The minute hand moves six degrees in a minute and the hour hand moves half a degree in a minute.", "Calendar questions ask for the day of the week on a given date. An ordinary year has one odd day and a leap year has two odd days, and this is the key to most calendar problems."],
    as: ["ঘড়ীৰ প্ৰশ্নই এটা নিৰ্দিষ্ট সময়ত ঘড়ীৰ কাঁটাবোৰৰ মাজৰ কোণ, বা কাঁটাবোৰ লগ লাগে বা বিপৰীত হয় তেনে সময় সোধে। মিনিটৰ কাঁটাই এক মিনিটত ছয় ডিগ্ৰী আৰু ঘণ্টাৰ কাঁটাই এক মিনিটত আধা ডিগ্ৰী চলে।", "কেলেণ্ডাৰৰ প্ৰশ্নই এটা তাৰিখত সপ্তাহৰ কোন দিনটো আছিল সোধে। এটা সাধাৰণ বছৰত এটা অযুগ্ম দিন আৰু এটা অধিবৰ্ষত দুটা অযুগ্ম দিন থাকে, আৰু এইয়েই বেছিভাগ কেলেণ্ডাৰ সমস্যাৰ চাবিকাঠি।"]
  },
  list: {
    en: ["The minute hand moves 6 degrees in one minute.", "The hour hand moves half a degree in one minute.", "An ordinary year has one odd day.", "A leap year has two odd days."],
    as: ["মিনিটৰ কাঁটাই এক মিনিটত ৬ ডিগ্ৰী চলে।", "ঘণ্টাৰ কাঁটাই এক মিনিটত আধা ডিগ্ৰী চলে।", "সাধাৰণ বছৰত এটা অযুগ্ম দিন থাকে।", "অধিবৰ্ষত দুটা অযুগ্ম দিন থাকে।"]
  },
  faqs: [
    { q: { en: "How many odd days are there in a leap year?", as: "অধিবৰ্ষত কিমানটা অযুগ্ম দিন থাকে?" },
      a: { en: "A leap year has two odd days, because three hundred and sixty-six days give a remainder of two when divided by seven.", as: "অধিবৰ্ষত দুটা অযুগ্ম দিন থাকে, কাৰণ তিনি শ ছেষট্টি দিনক সাতেৰে ভাগ কৰিলে দুটা অৱশিষ্ট থাকে।" } }
  ]
},
"figure-series": {
  h2: { en: "Figure Series", as: "চিত্ৰ শৃংখলা" },
  p: {
    en: ["A figure series shows a sequence of diagrams that change by a fixed rule, and the next figure must be chosen. The change may be in the number of lines, the rotation of a shape, the shading of a part or the addition of a small element.", "The method is to note one change at a time: first the number of sides, then the rotation, then the shading. Applying all changes together usually leads to the wrong option."],
    as: ["চিত্ৰ শৃংখলাত এটা নিৰ্দিষ্ট নিয়মেৰে সলনি হোৱা চিত্ৰৰ ক্ৰম দেখুওৱা হয় আৰু পিছৰ চিত্ৰটো বাছনি কৰিব লাগে। সলনিটো ৰেখাৰ সংখ্যা, এটা আকৃতিৰ ঘূৰণ, এটা অংশৰ ৰং বা এটা সৰু উপাদান যোগ হোৱাত হ'ব পাৰে।", "পদ্ধতিটো হৈছে এবাৰত এটা সলনি টুকি লোৱা: প্ৰথমে বাহুৰ সংখ্যা, তাৰ পিছত ঘূৰণ, তাৰ পিছত ৰং। আটাইবোৰ সলনি একেলগে প্ৰয়োগ কৰিলে সাধাৰণতে ভুল বিকল্পলৈ লৈ যায়।"]
  },
  list: {
    en: ["Note one change at a time.", "Count the number of lines or sides in each figure.", "Check for clockwise or anticlockwise rotation.", "Check for changes in shading or dots."],
    as: ["এবাৰত এটা সলনি টুকি লওক।", "প্ৰতিটো চিত্ৰত ৰেখা বা বাহুৰ সংখ্যা গণনা কৰক।", "ঘড়ীৰ কাঁটাৰ দিশত নে বিপৰীতে ঘূৰিছে পৰীক্ষা কৰক।", "ৰং বা বিন্দুৰ সলনি পৰীক্ষা কৰক।"]
  },
  faqs: [
    { q: { en: "What is the best approach to a figure series?", as: "চিত্ৰ শৃংখলাৰ বাবে আটাইতকৈ ভাল পদ্ধতি কি?" },
      a: { en: "Break the series into single changes, such as the number of sides, the rotation and the shading, and verify each change separately.", as: "শৃংখলাটোক এটা এটা সলনিত ভাগ কৰক, যেনে বাহুৰ সংখ্যা, ঘূৰণ আৰু ৰং, আৰু প্ৰতিটো সলনি বেলেগে পৰীক্ষা কৰক।" } }
  ]
},
"figure-analogy": {
  h2: { en: "Figure Analogy", as: "চিত্ৰ সাদৃশ্য" },
  p: {
    en: ["In figure analogy two figures are given in the first pair and the relation between them must be applied to the third figure to find the fourth. The relation may be a rotation, a mirror image, an increase in size or a change in the number of parts.", "The method is to describe the change from the first figure to the second in words, and then apply exactly that change to the third figure."],
    as: ["চিত্ৰ সাদৃশ্যত প্ৰথম যোৰত দুটা চিত্ৰ দিয়া হয় আৰু তেওঁলোকৰ মাজৰ সম্পৰ্ক তৃতীয় চিত্ৰত প্ৰয়োগ কৰি চতুৰ্থটো বিচাৰিব লাগে। সম্পৰ্কটো ঘূৰণ, দাপোণৰ প্ৰতিবিম্ব, আকাৰ বৃদ্ধি বা অংশৰ সংখ্যাৰ সলনি হ'ব পাৰে।", "পদ্ধতিটো হৈছে প্ৰথম চিত্ৰৰ পৰা দ্বিতীয়লৈ সলনিটো শব্দত বৰ্ণনা কৰা, আৰু তাৰ পিছত তৃতীয় চিত্ৰত ঠিক সেই সলনিটোৱেই প্ৰয়োগ কৰা।"]
  },
  list: {
    en: ["Describe the change between the first pair in words.", "Apply the same change to the third figure.", "Common changes are rotation, mirroring and resizing.", "Do not mix two different changes."],
    as: ["প্ৰথম যোৰৰ মাজৰ সলনিটো শব্দত বৰ্ণনা কৰক।", "একেই সলনি তৃতীয় চিত্ৰত প্ৰয়োগ কৰক।", "সাধাৰণ সলনি হৈছে ঘূৰণ, প্ৰতিবিম্ব আৰু আকাৰ সলনি।", "দুটা বেলেগ সলনি মিলাই নিদিব।"]
  },
  faqs: [
    { q: { en: "How do you solve a figure analogy question?", as: "চিত্ৰ সাদৃশ্যৰ প্ৰশ্ন কেনেকৈ সমাধান কৰিব?" },
      a: { en: "State in words how the first figure becomes the second, then apply exactly that change to the third figure.", as: "প্ৰথম চিত্ৰটো কেনেকৈ দ্বিতীয়টো হয় সেয়া শব্দত কওক, তাৰ পিছত তৃতীয় চিত্ৰত ঠিক সেই সলনিটো প্ৰয়োগ কৰক।" } }
  ]
},
"figure-classification": {
  h2: { en: "Figure Classification", as: "চিত্ৰ শ্ৰেণীবিভাজন" },
  p: {
    en: ["In figure classification four or five figures are given and all but one share a common property. The odd figure is the one that does not have that property.", "The property may be the number of sides, the presence of a curve, the number of intersecting lines or the position of a dot inside or outside the figure."],
    as: ["চিত্ৰ শ্ৰেণীবিভাজনত চাৰিটা বা পাঁচটা চিত্ৰ দিয়া হয় আৰু এটাক এৰি আটাইবোৰে এটা সাধাৰণ ধৰ্ম বহন কৰে। অমিল চিত্ৰটো হৈছে সেই ধৰ্মটো নথকা চিত্ৰ।", "ধৰ্মটো বাহুৰ সংখ্যা, এটা বক্ৰৰেখা থকা, কটাকটি কৰা ৰেখাৰ সংখ্যা বা চিত্ৰৰ ভিতৰত বা বাহিৰত এটা বিন্দুৰ অৱস্থান হ'ব পাৰে।"]
  },
  list: {
    en: ["Find the property shared by most of the figures.", "The odd figure lacks that property.", "Count sides, curves and intersections.", "Check whether a dot is inside or outside."],
    as: ["বেছিভাগ চিত্ৰই ভাগ কৰা ধৰ্মটো বিচাৰক।", "অমিল চিত্ৰটোত সেই ধৰ্মটো নাথাকে।", "বাহু, বক্ৰৰেখা আৰু কটাকটি গণনা কৰক।", "এটা বিন্দু ভিতৰত নে বাহিৰত পৰীক্ষা কৰক।"]
  },
  faqs: [
    { q: { en: "What should be counted first in figure classification?", as: "চিত্ৰ শ্ৰেণীবিভাজনত প্ৰথমে কি গণনা কৰিব লাগে?" },
      a: { en: "Count the number of sides or lines first, then check curves, intersections and the position of any dot.", as: "প্ৰথমে বাহু বা ৰেখাৰ সংখ্যা গণনা কৰক, তাৰ পিছত বক্ৰৰেখা, কটাকটি আৰু যিকোনো বিন্দুৰ অৱস্থান পৰীক্ষা কৰক।" } }
  ]
},
"mirror-water-image": {
  h2: { en: "Mirror Image & Water Image", as: "দাপোণ আৰু পানীৰ প্ৰতিবিম্ব" },
  p: {
    en: ["A mirror image reverses a figure from left to right, as if it were seen in a vertical mirror placed beside it. In a mirror image the left and the right sides of the figure are interchanged while the top and the bottom stay the same.", "A water image reverses a figure from top to bottom, as if it were reflected in water below it. Here the top and the bottom are interchanged while the left and the right stay the same."],
    as: ["দাপোণৰ প্ৰতিবিম্বই এটা চিত্ৰক বাওঁৰ পৰা সোঁলৈ ওলোটা কৰে, যেন ইয়াৰ কাষত ৰখা এটা খাড়া দাপোণত দেখা হৈছে। দাপোণৰ প্ৰতিবিম্বত চিত্ৰৰ বাওঁ আৰু সোঁফাল সলনি হয় আনহাতে ওপৰ আৰু তল একেই থাকে।", "পানীৰ প্ৰতিবিম্বই এটা চিত্ৰক ওপৰৰ পৰা তললৈ ওলোটা কৰে, যেন ই তলৰ পানীত প্ৰতিফলিত হৈছে। ইয়াত ওপৰ আৰু তল সলনি হয় আনহাতে বাওঁ আৰু সোঁফাল একেই থাকে।"]
  },
  list: {
    en: ["A mirror image interchanges left and right.", "A water image interchanges top and bottom.", "In a mirror image the top and bottom do not change.", "In a water image the left and right do not change."],
    as: ["দাপোণৰ প্ৰতিবিম্বই বাওঁ আৰু সোঁ সলনি কৰে।", "পানীৰ প্ৰতিবিম্বই ওপৰ আৰু তল সলনি কৰে।", "দাপোণৰ প্ৰতিবিম্বত ওপৰ আৰু তল নসলনি।", "পানীৰ প্ৰতিবিম্বত বাওঁ আৰু সোঁ নসলনি।"]
  },
  faqs: [
    { q: { en: "What is the difference between a mirror image and a water image?", as: "দাপোণ আৰু পানীৰ প্ৰতিবিম্বৰ মাজৰ পাৰ্থক্য কি?" },
      a: { en: "A mirror image interchanges the left and the right of a figure, while a water image interchanges its top and the bottom.", as: "দাপোণৰ প্ৰতিবিম্বই চিত্ৰৰ বাওঁ আৰু সোঁ সলনি কৰে, আনহাতে পানীৰ প্ৰতিবিম্বই ইয়াৰ ওপৰ আৰু তল সলনি কৰে।" } }
  ]
},
"pattern-completion": {
  h2: { en: "Pattern Completion", as: "আৰ্হি পূৰণ" },
  p: {
    en: ["Pattern completion gives a large figure with a part missing and asks which of the options fits the empty space. The correct option must match the lines, the curves and the shading of the surrounding figure.", "The method is to extend the lines that meet the missing part and see where they would go. A quick check of the corners of the empty space eliminates most wrong options."],
    as: ["আৰ্হি পূৰণত এটা অংশ নোহোৱা এটা ডাঙৰ চিত্ৰ দিয়া হয় আৰু কোনটো বিকল্পই ৰিক্ত ঠাইত খাপ খায় সোধে। শুদ্ধ বিকল্পই চাৰিওফালৰ চিত্ৰৰ ৰেখা, বক্ৰৰেখা আৰু ৰঙৰ লগত মিলিব লাগে।", "পদ্ধতিটো হৈছে নোহোৱা অংশৰ লগত লগা ৰেখাবোৰ আগবঢ়াই চোৱা যে সেইবোৰ ক'লৈ যায়। ৰিক্ত ঠাইৰ চুকবোৰ দ্ৰুতভাৱে পৰীক্ষা কৰিলে বেছিভাগ ভুল বিকল্প আঁতৰি যায়।"]
  },
  list: {
    en: ["Extend the lines that touch the missing part.", "Match the curves and the shading of the surroundings.", "Check the corners of the empty space.", "Eliminate options that break the pattern."],
    as: ["নোহোৱা অংশৰ লগত লগা ৰেখাবোৰ আগবঢ়াওক।", "চাৰিওফালৰ বক্ৰৰেখা আৰু ৰঙৰ লগত মিলাওক।", "ৰিক্ত ঠাইৰ চুকবোৰ পৰীক্ষা কৰক।", "আৰ্হি ভঙা বিকল্পবোৰ আঁতৰাওক।"]
  },
  faqs: [
    { q: { en: "How do you choose the right option in pattern completion?", as: "আৰ্হি পূৰণত শুদ্ধ বিকল্প কেনেকৈ বাছনি কৰিব?" },
      a: { en: "Extend the lines that meet the missing part and match the curves and shading of the surrounding figure.", as: "নোহোৱা অংশৰ লগত লগা ৰেখাবোৰ আগবঢ়াই চাৰিওফালৰ চিত্ৰৰ বক্ৰৰেখা আৰু ৰঙৰ লগত মিলাওক।" } }
  ]
},
"embedded-figures": {
  h2: { en: "Embedded Figures", as: "লুকুৱা চিত্ৰ" },
  p: {
    en: ["In an embedded figure question a simple figure is hidden inside a complex one and the task is to find it. The simple figure may be rotated or slightly enlarged, but its shape does not change.", "The method is to look for the corners and the straight edges of the hidden figure rather than its whole outline at once. Tracing the edges of each option on the complex figure usually settles the question quickly."],
    as: ["লুকুৱা চিত্ৰৰ প্ৰশ্নত এটা সৰল চিত্ৰ এটা জটিল চিত্ৰৰ ভিতৰত লুকাই থাকে আৰু তাক বিচাৰি উলিয়াব লাগে। সৰল চিত্ৰটো ঘূৰোৱা বা অলপ ডাঙৰ কৰা হ'ব পাৰে, কিন্তু ইয়াৰ আকৃতি নসলনি।", "পদ্ধতিটো হৈছে লুকুৱা চিত্ৰটোৰ গোটেই ৰূপ একেলগে নাচাই ইয়াৰ চুক আৰু সৰল কাষবোৰ বিচৰা। জটিল চিত্ৰত প্ৰতিটো বিকল্পৰ কাষবোৰ টানি চালেই প্ৰশ্নটো দ্ৰুতভাৱে মীমাংসা হয়।"]
  },
  list: {
    en: ["Look for corners and straight edges first.", "The hidden figure may be rotated.", "The shape of the hidden figure does not change.", "Trace each option on the complex figure."],
    as: ["প্ৰথমে চুক আৰু সৰল কাষবোৰ বিচাৰক।", "লুকুৱা চিত্ৰটো ঘূৰোৱা হ'ব পাৰে।", "লুকুৱা চিত্ৰটোৰ আকৃতি নসলনি।", "জটিল চিত্ৰত প্ৰতিটো বিকল্প টানি চাওক।"]
  },
  faqs: [
    { q: { en: "Can the hidden figure be rotated in an embedded figure question?", as: "লুকুৱা চিত্ৰৰ প্ৰশ্নত চিত্ৰটো ঘূৰোৱা হ'ব পাৰে নে?" },
      a: { en: "Yes. The hidden figure may be rotated or slightly resized, but its basic shape and the number of its sides stay the same.", as: "হয়। লুকুৱা চিত্ৰটো ঘূৰোৱা বা অলপ আকাৰ সলোৱা হ'ব পাৰে, কিন্তু ইয়াৰ মূল আকৃতি আৰু বাহুৰ সংখ্যা একেই থাকে।" } }
  ]
},
"counting-figures": {
  h2: { en: "Counting of Figures", as: "চিত্ৰ গণনা" },
  p: {
    en: ["Counting questions ask for the number of triangles, squares, rectangles or straight lines in a given figure. The answer is found by counting systematically rather than by looking at the figure as a whole.", "For triangles in a figure with a common vertex, count the small triangles, then the ones made of two parts, then three parts and so on, and add the totals. A small table of counts prevents double counting."],
    as: ["গণনাৰ প্ৰশ্নই এটা দিয়া চিত্ৰত ত্ৰিভুজ, বৰ্গক্ষেত্ৰ, আয়তক্ষেত্ৰ বা সৰলৰেখাৰ সংখ্যা সোধে। উত্তৰটো চিত্ৰটোক গোটেইটো হিচাপে নাচাই পদ্ধতিগতভাৱে গণনা কৰি পোৱা যায়।", "এটা সাধাৰণ শীৰ্ষবিন্দু থকা চিত্ৰত ত্ৰিভুজৰ বাবে প্ৰথমে সৰু ত্ৰিভুজবোৰ, তাৰ পিছত দুটা অংশৰ, তাৰ পিছত তিনি অংশৰ আদি গণনা কৰি যোগফল লওক। এটা সৰু তালিকাই দুবাৰ গণনা ৰোধ কৰে।"]
  },
  list: {
    en: ["Count the smallest figures first.", "Then count the figures made of two parts, three parts and so on.", "Add all the counts to get the total.", "Keep a small table to avoid double counting."],
    as: ["প্ৰথমে আটাইতকৈ সৰু চিত্ৰবোৰ গণনা কৰক।", "তাৰ পিছত দুটা অংশৰ, তিনি অংশৰ আদি চিত্ৰবোৰ গণনা কৰক।", "মুঠ পাবলৈ আটাইবোৰ গণনা যোগ কৰক।", "দুবাৰ গণনা ৰোধ কৰিবলৈ এটা সৰু তালিকা ৰাখক।"]
  },
  faqs: [
    { q: { en: "How do you avoid double counting while counting figures?", as: "চিত্ৰ গণনা কৰোঁতে দুবাৰ গণনা কেনেকৈ ৰোধ কৰিব?" },
      a: { en: "Count by size, first the smallest figures and then the larger ones, and keep a written table of each count.", as: "আকাৰ অনুসৰি গণনা কৰক, প্ৰথমে আটাইতকৈ সৰু আৰু তাৰ পিছত ডাঙৰ চিত্ৰবোৰ, আৰু প্ৰতিটো গণনাৰ এটা লিখিত তালিকা ৰাখক।" } }
  ]
},
"paper-folding-cutting": {
  h2: { en: "Paper Folding & Paper Cutting", as: "কাগজ ভাঁজ আৰু কটা" },
  p: {
    en: ["In paper folding questions a sheet is folded once or twice and then a piece is cut out, and the pattern of holes when the sheet is unfolded must be found. Each fold doubles the number of holes.", "The method is to unfold the sheet one fold at a time, marking the holes at every stage. A fold on the left side produces a mirror image of the hole on the right side."],
    as: ["কাগজ ভাঁজৰ প্ৰশ্নত এখন কাগজ এবাৰ বা দুবাৰ ভাঁজ কৰি তাৰ পৰা এটা টুকুৰা কাটি লোৱা হয়, আৰু কাগজখন মেলি দিলে হোৱা ফুটাৰ আৰ্হি বিচাৰিব লাগে। প্ৰতিটো ভাঁজে ফুটাৰ সংখ্যা দুগুণ কৰে।", "পদ্ধতিটো হৈছে এবাৰত এটা ভাঁজ মেলি দিয়া, প্ৰতিটো পৰ্যায়ত ফুটাবোৰ চিহ্নিত কৰা। বাওঁফালে এটা ভাঁজ কৰিলে সোঁফালে ফুটাৰ দাপোণ প্ৰতিবিম্ব সৃষ্টি হয়।"]
  },
  list: {
    en: ["Each fold doubles the number of holes.", "Unfold one fold at a time.", "A fold on one side mirrors the hole on the other side.", "Draw the unfolded sheet before choosing the option."],
    as: ["প্ৰতিটো ভাঁজে ফুটাৰ সংখ্যা দুগুণ কৰে।", "এবাৰত এটা ভাঁজ মেলি দিয়ক।", "এফালে ভাঁজ কৰিলে আনফালে ফুটাৰ প্ৰতিবিম্ব হয়।", "বিকল্প বাছনি কৰাৰ আগতে মেলা কাগজখন অঁকক।"]
  },
  faqs: [
    { q: { en: "What happens to the number of holes when a sheet is folded?", as: "কাগজ ভাঁজ কৰিলে ফুটাৰ সংখ্যাৰ কি হয়?" },
      a: { en: "Each fold doubles the number of holes, so one cut through two layers produces two holes when the sheet is unfolded.", as: "প্ৰতিটো ভাঁজে ফুটাৰ সংখ্যা দুগুণ কৰে, গতিকে দুটা স্তৰ কাটিলে কাগজ মেলি দিলে দুটা ফুটা হয়।" } }
  ]
},
"cubes-dice": {
  h2: { en: "Cubes & Dice", as: "ঘনক আৰু পাশা" },
  p: {
    en: ["A cube has six faces, twelve edges and eight corners, and a standard die carries the numbers one to six with the opposite faces adding up to seven. This last rule answers most dice questions.", "When a cube is painted and then cut into smaller cubes, the corner cubes have three painted faces, the edge cubes have two, the face cubes have one and the inner cubes have none."],
    as: ["এটা ঘনকৰ ছটা পৃষ্ঠ, বাৰটা কাষ আৰু আঠটা চুক থাকে, আৰু এটা সাধাৰণ পাশাৰ বিপৰীত পৃষ্ঠৰ সংখ্যাৰ যোগফল সাত। এই নিয়মেই বেছিভাগ পাশাৰ প্ৰশ্নৰ উত্তৰ দিয়ে।", "এটা ঘনক ৰং কৰি সৰু সৰু ঘনকত কাটিলে চুকৰ ঘনকবোৰত তিনিটা ৰঙা পৃষ্ঠ, কাষৰ ঘনকবোৰত দুটা, পৃষ্ঠৰ ঘনকবোৰত এটা আৰু ভিতৰৰ ঘনকবোৰত একো নাথাকে।"]
  },
  list: {
    en: ["A cube has six faces, twelve edges and eight corners.", "Opposite faces of a standard die add up to seven.", "Corner cubes of a painted cube have three painted faces.", "Inner cubes of a painted cube have no painted face."],
    as: ["ঘনকৰ ছটা পৃষ্ঠ, বাৰটা কাষ আৰু আঠটা চুক থাকে।", "সাধাৰণ পাশাৰ বিপৰীত পৃষ্ঠৰ যোগফল সাত।", "ৰঙা ঘনকৰ চুকৰ ঘনকবোৰত তিনিটা ৰঙা পৃষ্ঠ থাকে।", "ৰঙা ঘনকৰ ভিতৰৰ ঘনকবোৰত কোনো ৰঙা পৃষ্ঠ নাথাকে।"]
  },
  faqs: [
    { q: { en: "What is the sum of the numbers on opposite faces of a die?", as: "পাশাৰ বিপৰীত পৃষ্ঠৰ সংখ্যাৰ যোগফল কিমান?" },
      a: { en: "The numbers on the opposite faces of a standard die always add up to seven.", as: "সাধাৰণ পাশাৰ বিপৰীত পৃষ্ঠৰ সংখ্যাৰ যোগফল সদায় সাত।" } }
  ]
},
"indian-history": {
  h2: { en: "Indian History", as: "ভাৰতৰ ইতিহাস" },
  p: {
    en: ["Indian history is divided into the ancient, the medieval and the modern period. In the ancient period the Indus Valley Civilisation and the Vedic age are the two starting points, followed by the Mauryas and the Guptas.", "In the modern period the freedom movement is the most tested portion. The Revolt of 1857, the founding of the Indian National Congress in 1885, the Non-Cooperation Movement, the Civil Disobedience Movement and the Quit India Movement are asked again and again."],
    as: ["ভাৰতৰ ইতিহাস প্ৰাচীন, মধ্যযুগ আৰু আধুনিক কালত বিভক্ত। প্ৰাচীন কালত সিন্ধু উপত্যকাৰ সভ্যতা আৰু বৈদিক যুগ দুটা আৰম্ভণিৰ বিন্দু, তাৰ পিছত মৌৰ্য আৰু গুপ্ত বংশ।", "আধুনিক কালত স্বাধীনতা আন্দোলনেই আটাইতকৈ বেছি সোধা অংশ। ১৮৫৭ চনৰ বিদ্ৰোহ, ১৮৮৫ চনত ভাৰতীয় জাতীয় কংগ্ৰেছৰ প্ৰতিষ্ঠা, অসহযোগ আন্দোলন, আইন অমান্য আন্দোলন আৰু ভাৰত ছাড়ো আন্দোলন বাৰে বাৰে সোধা হয়।"]
  },
  list: {
    en: ["The Indian National Congress was founded in 1885.", "The Revolt of 1857 was the first major uprising.", "The Quit India Movement took place in 1942.", "India became independent on 15 August 1947."],
    as: ["ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হৈছিল।", "১৮৫৭ চনৰ বিদ্ৰোহ প্ৰথম প্ৰধান বিদ্ৰোহ আছিল।", "ভাৰত ছাড়ো আন্দোলন ১৯৪২ চনত হৈছিল।", "ভাৰত ১৯৪৭ চনৰ ১৫ আগষ্টত স্বাধীন হৈছিল।"]
  },
  faqs: [
    { q: { en: "In which year was the Indian National Congress founded?", as: "ভাৰতীয় জাতীয় কংগ্ৰেছ কোন বছৰত প্ৰতিষ্ঠা হৈছিল?" },
      a: { en: "The Indian National Congress was founded in 1885, and its first session was held in Bombay.", as: "ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হৈছিল, আৰু ইয়াৰ প্ৰথম অধিবেশন বম্বেত অনুষ্ঠিত হৈছিল।" } }
  ]
},
"constitution-preamble-rights": {
  h2: { en: "Constitution, Preamble, Rights & Duties", as: "সংবিধান, প্ৰস্তাৱনা, অধিকাৰ আৰু কৰ্তব্য" },
  p: {
    en: ["The Constitution of India came into force on 26 January 1950 and it is the longest written constitution of any country. The Preamble declares India a sovereign, socialist, secular and democratic republic.", "The Fundamental Rights are given in Part III of the Constitution and the Fundamental Duties in Part IV-A. The right to equality, the right to freedom, the right against exploitation, the right to freedom of religion and the right to constitutional remedies are the main fundamental rights."],
    as: ["ভাৰতৰ সংবিধান ১৯৫০ চনৰ ২৬ জানুৱাৰীত কাৰ্যকৰী হৈছিল আৰু ই যিকোনো দেশৰ আটাইতকৈ দীঘল লিখিত সংবিধান। প্ৰস্তাৱনাই ভাৰতক সাৰ্বভৌম, সমাজবাদী, ধৰ্মনিৰপেক্ষ আৰু গণতান্ত্ৰিক গণৰাজ্য ঘোষণা কৰে।", "মৌলিক অধিকাৰসমূহ সংবিধানৰ তৃতীয় অংশত আৰু মৌলিক কৰ্তব্যসমূহ চতুৰ্থ-ক অংশত দিয়া আছে। সমতাৰ অধিকাৰ, স্বাধীনতাৰ অধিকাৰ, শোষণৰ বিৰুদ্ধে অধিকাৰ, ধৰ্মৰ স্বাধীনতাৰ অধিকাৰ আৰু সাংবিধানিক প্ৰতিকাৰৰ অধিকাৰ প্ৰধান মৌলিক অধিকাৰ।"]
  },
  list: {
    en: ["The Constitution came into force on 26 January 1950.", "Fundamental Rights are in Part III.", "Fundamental Duties are in Part IV-A.", "Dr B. R. Ambedkar chaired the drafting committee."],
    as: ["সংবিধান ১৯৫০ চনৰ ২৬ জানুৱাৰীত কাৰ্যকৰী হৈছিল।", "মৌলিক অধিকাৰ তৃতীয় অংশত আছে।", "মৌলিক কৰ্তব্য চতুৰ্থ-ক অংশত আছে।", "ড° বি আৰ আম্বেদকাৰে খচৰা সমিতিৰ অধ্যক্ষতা কৰিছিল।"]
  },
  faqs: [
    { q: { en: "When did the Constitution of India come into force?", as: "ভাৰতৰ সংবিধান কেতিয়া কাৰ্যকৰী হৈছিল?" },
      a: { en: "The Constitution of India came into force on 26 January 1950, and that day is observed as Republic Day.", as: "ভাৰতৰ সংবিধান ১৯৫০ চনৰ ২৬ জানুৱাৰীত কাৰ্যকৰী হৈছিল, আৰু সেই দিনটো গণৰাজ্য দিৱস হিচাপে পালন কৰা হয়।" } }
  ]
},
"president-pm-governor-cm": {
  h2: { en: "President, PM, Governor & CM", as: "ৰাষ্ট্ৰপতি, প্ৰধানমন্ত্ৰী, ৰাজ্যপাল আৰু মুখ্যমন্ত্ৰী" },
  p: {
    en: ["The President is the head of the Indian state and the Supreme Commander of the armed forces, and is elected indirectly by an electoral college. The Prime Minister is the head of the government and is appointed by the President.", "At the state level the Governor is the constitutional head appointed by the President, and the Chief Minister is the head of the state government. The Governor appoints the Chief Minister, who is usually the leader of the majority party in the Legislative Assembly."],
    as: ["ৰাষ্ট্ৰপতি ভাৰত ৰাষ্ট্ৰৰ মুৰব্বী আৰু সশস্ত্ৰ বাহিনীৰ সৰ্বোচ্চ কমাণ্ডাৰ, আৰু তেওঁক নিৰ্বাচনী মহাবিদ্যালয়ে পৰোক্ষভাৱে নিৰ্বাচিত কৰে। প্ৰধানমন্ত্ৰী চৰকাৰৰ মুৰব্বী আৰু ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়ে।", "ৰাজ্যিক পৰ্যায়ত ৰাজ্যপাল ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়া সাংবিধানিক মুৰব্বী, আৰু মুখ্যমন্ত্ৰী ৰাজ্য চৰকাৰৰ মুৰব্বী। ৰাজ্যপালে মুখ্যমন্ত্ৰীক নিযুক্তি দিয়ে, যি সাধাৰণতে বিধানসভাত সংখ্যাগৰিষ্ঠ দলৰ নেতা।"]
  },
  list: {
    en: ["The President is the head of the Indian state.", "The Prime Minister is the head of the government.", "The Governor is appointed by the President.", "The Chief Minister heads the state government."],
    as: ["ৰাষ্ট্ৰপতি ভাৰত ৰাষ্ট্ৰৰ মুৰব্বী।", "প্ৰধানমন্ত্ৰী চৰকাৰৰ মুৰব্বী।", "ৰাজ্যপালক ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়ে।", "মুখ্যমন্ত্ৰীয়ে ৰাজ্য চৰকাৰৰ নেতৃত্ব দিয়ে।"]
  },
  faqs: [
    { q: { en: "Who appoints the Governor of a state?", as: "এখন ৰাজ্যৰ ৰাজ্যপালক কোনে নিযুক্তি দিয়ে?" },
      a: { en: "The Governor of a state is appointed by the President of India and holds office during the pleasure of the President.", as: "এখন ৰাজ্যৰ ৰাজ্যপালক ভাৰতৰ ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়ে আৰু ৰাষ্ট্ৰপতিৰ সন্তুষ্টি কালত কাৰ্যনিৰ্বাহ কৰে।" } }
  ]
},
"panchayati-raj": {
  h2: { en: "Panchayati Raj System", as: "পঞ্চায়তী ৰাজ ব্যৱস্থা" },
  p: {
    en: ["The Panchayati Raj system gives constitutional status to local self-government in rural India. It was given this status by the 73rd Constitutional Amendment Act of 1992, which came into force in 1993.", "The system has three tiers: the Gram Panchayat at the village level, the Panchayat Samiti or Block Panchayat at the intermediate level and the Zilla Parishad at the district level. One third of the seats are reserved for women."],
    as: ["পঞ্চায়তী ৰাজ ব্যৱস্থাই গ্ৰামীণ ভাৰতত স্থানীয় স্বশাসনক সাংবিধানিক মৰ্যাদা দিয়ে। ১৯৯২ চনৰ ৭৩ সংখ্যক সাংবিধানিক সংশোধনী আইনে ইয়াক এই মৰ্যাদা দিছিল, যি ১৯৯৩ চনত কাৰ্যকৰী হয়।", "ব্যৱস্থাটোৰ তিনি স্তৰ আছে: গাঁও পৰ্যায়ত গাঁও পঞ্চায়ত, মধ্যৱৰ্তী পৰ্যায়ত পঞ্চায়ত সমিতি বা খণ্ড পঞ্চায়ত আৰু জিলা পৰ্যায়ত জিলা পৰিষদ। এখন তৃতীয়াংশ আসন মহিলাৰ বাবে সংৰক্ষিত।"]
  },
  list: {
    en: ["Panchayati Raj was given constitutional status by the 73rd Amendment.", "It has three tiers.", "Gram Panchayat is at the village level.", "One third of the seats are reserved for women."],
    as: ["৭৩ সংখ্যক সংশোধনীয়ে পঞ্চায়তী ৰাজক সাংবিধানিক মৰ্যাদা দিছিল।", "ইয়াৰ তিনি স্তৰ আছে।", "গাঁও পৰ্যায়ত গাঁও পঞ্চায়ত।", "এখন তৃতীয়াংশ আসন মহিলাৰ বাবে সংৰক্ষিত।"]
  },
  faqs: [
    { q: { en: "Which amendment gave constitutional status to Panchayati Raj?", as: "কোন সংশোধনীয়ে পঞ্চায়তী ৰাজক সাংবিধানিক মৰ্যাদা দিছিল?" },
      a: { en: "The 73rd Constitutional Amendment Act of 1992 gave constitutional status to the Panchayati Raj system, and it came into force in 1993.", as: "১৯৯২ চনৰ ৭৩ সংখ্যক সাংবিধানিক সংশোধনী আইনে পঞ্চায়তী ৰাজ ব্যৱস্থাক সাংবিধানিক মৰ্যাদা দিছিল, আৰু ই ১৯৯৩ চনত কাৰ্যকৰী হয়।" } }
  ]
},
"indian-assam-economy": {
  h2: { en: "Indian & Assam Economy", as: "ভাৰত আৰু অসমৰ অৰ্থনীতি" },
  p: {
    en: ["The Indian economy is a mixed economy in which both the public sector and the private sector take part. Agriculture is the largest employer, and the service sector now contributes the biggest share of the national income.", "Assam's economy rests mainly on agriculture, tea and petroleum. Rice is the principal food crop, tea is the principal cash crop and the state earns a large part of its revenue from oil and natural gas."],
    as: ["ভাৰতৰ অৰ্থনীতি এটা মিশ্ৰিত অৰ্থনীতি য'ত ৰাজহুৱা খণ্ড আৰু ব্যক্তিগত খণ্ড দুয়োটা অংশ লয়। কৃষিয়েই আটাইতকৈ বেছি লোকক নিয়োগ দিয়ে, আৰু সেৱা খণ্ডই এতিয়া ৰাষ্ট্ৰীয় আয়ৰ আটাইতকৈ ডাঙৰ অংশ আগবঢ়ায়।", "অসমৰ অৰ্থনীতি মূলতঃ কৃষি, চাহ আৰু খনিজ তেলৰ ওপৰত নিৰ্ভৰশীল। ধান প্ৰধান খাদ্য শস্য, চাহ প্ৰধান নগদ শস্য আৰু ৰাজ্যই তেল আৰু প্ৰাকৃতিক গেছৰ পৰা ৰাজহৰ ডাঙৰ অংশ আৰ্জন কৰে।"]
  },
  list: {
    en: ["India has a mixed economy.", "Agriculture is the largest employer in India.", "Tea is the principal cash crop of Assam.", "Rice is the principal food crop of Assam."],
    as: ["ভাৰত এটা মিশ্ৰিত অৰ্থনীতি।", "ভাৰতত কৃষিয়েই আটাইতকৈ বেছি লোকক নিয়োগ দিয়ে।", "চাহ অসমৰ প্ৰধান নগদ শস্য।", "ধান অসমৰ প্ৰধান খাদ্য শস্য।"]
  },
  faqs: [
    { q: { en: "What kind of economy does India have?", as: "ভাৰতত কেনে অৰ্থনীতি আছে?" },
      a: { en: "India has a mixed economy, in which both the public sector and the private sector operate side by side.", as: "ভাৰতত এটা মিশ্ৰিত অৰ্থনীতি আছে, য'ত ৰাজহুৱা খণ্ড আৰু ব্যক্তিগত খণ্ড দুয়োটা একেলগে চলে।" } }
  ]
},
"environment-pollution": {
  h2: { en: "Environment & Pollution", as: "পৰিৱেশ আৰু প্ৰদূষণ" },
  p: {
    en: ["Environment questions test the awareness of pollution, conservation and the steps taken to protect nature. Air pollution, water pollution, soil pollution and noise pollution are the four main kinds.", "Deforestation and the burning of fossil fuels are the chief causes of environmental damage. Tree planting, the use of public transport and the three R rule of reduce, reuse and recycle are the simple remedies asked in examinations."],
    as: ["পৰিৱেশৰ প্ৰশ্নই প্ৰদূষণ, সংৰক্ষণ আৰু প্ৰকৃতি সুৰক্ষাৰ বাবে লোৱা পদক্ষেপৰ সজাগতা পৰীক্ষা কৰে। বায়ু প্ৰদূষণ, পানী প্ৰদূষণ, মাটি প্ৰদূষণ আৰু শব্দ প্ৰদূষণ চাৰিটা প্ৰধান প্ৰকাৰ।", "বনাঞ্চল ধ্বংস আৰু জীৱাশ্ম ইন্ধন জ্বলোৱা পৰিৱেশৰ ক্ষতিৰ প্ৰধান কাৰণ। গছ ৰোপণ, ৰাজহুৱা পৰিবহণৰ ব্যৱহাৰ আৰু হ্ৰাস, পুনৰ্ব্যৱহাৰ আৰু পুনঃচক্ৰণৰ তিনি-আৰ নিয়ম পৰীক্ষাত সোধা সৰল সমাধান।"]
  },
  list: {
    en: ["Air, water, soil and noise are the four main kinds of pollution.", "Deforestation is a major cause of environmental damage.", "The three R rule is reduce, reuse and recycle.", "Tree planting helps control air pollution."],
    as: ["বায়ু, পানী, মাটি আৰু শব্দ প্ৰদূষণৰ চাৰিটা প্ৰধান প্ৰকাৰ।", "বনাঞ্চল ধ্বংস পৰিৱেশৰ ক্ষতিৰ এটা প্ৰধান কাৰণ।", "তিনি-আৰ নিয়ম হৈছে হ্ৰাস, পুনৰ্ব্যৱহাৰ আৰু পুনঃচক্ৰণ।", "গছ ৰোপণে বায়ু প্ৰদূষণ নিয়ন্ত্ৰণ কৰাত সহায় কৰে।"]
  },
  faqs: [
    { q: { en: "What are the three R's of environmental protection?", as: "পৰিৱেশ সুৰক্ষাৰ তিনি-আৰ কি?" },
      a: { en: "The three R's are reduce, reuse and recycle, and they are the simplest way to cut down waste.", as: "তিনি-আৰ হৈছে হ্ৰাস, পুনৰ্ব্যৱহাৰ আৰু পুনঃচক্ৰণ, আৰু আৱৰ্জনা কমোৱাৰ আটাইতকৈ সৰল উপায় এইয়েই।" } }
  ]
},
};
