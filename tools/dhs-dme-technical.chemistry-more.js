#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.chemistry-more.js

   Extra chemistry items that take every leaf of the DHS & DME
   Technical Grade III chemistry group to thirty or more.
   tools/merge-chemistry-more.js appends these to the legacy
   bank the builder reads.

   Every item names its leaf outright. The twelve chemistry
   leaves overlap — "salt" belongs to acids-bases-salts and to
   metals, "carbon" to organic and to fuels — so the builder is
   told the leaf instead of guessing from the stem.
   =========================================================== */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  Q.push({
    id,
    leaf: LEAF,
    q: { en, as },
    options: opts.map(([oen, oas]) => ({ en: oen, as: oas })),
    correct,
    explanation: { en: expEn, as: expAs },
  });
}

/* ================= atomic-structure ================= */
useLeaf("atomic-structure");

add("chemistry-141",
  "In the Rutherford scattering experiment, most alpha particles passed straight through the gold foil. This showed that",
  "ৰাদাৰফৰ্ডৰ বিচ্ছুৰণ পৰীক্ষাত বেছিভাগ অ্যালফা কণিকা সোণৰ পাতেৰ মাজেৰে সলাংগে গ'ল। এইটোৱে দেখুৱালে যে",
  [["most of the atom is empty space", "পৰমাণুৰ বেছিভাগ অংশ খালী ঠাই"], ["the atom is a solid sphere", "পৰমাণু এটা গোটা গোলক"], ["electrons are heavier", "ইলেক্ট্ৰন বেছি গধুৰ"], ["the nucleus is negative", "নিউক্লিয়াছ ঋণাত্মক"]], 0,
  "Nearly every alpha particle went straight through, so the atom must be mostly empty with the mass concentrated in a tiny nucleus. A solid sphere would have deflected all of them.",
  "প্ৰায় প্ৰতিটো অ্যালফা কণিকা সলাংগে যায়, সেয়ে পৰমাণু বেছিভাগ খালী আৰু ভৰ এটা অতি সৰু নিউক্লিয়াছত কেন্দ্ৰিভূত। গোটা গোলক হ'লে সকলো বিচ্ছুৰিত হ'ল হেতেন।");

add("chemistry-142",
  "The maximum number of electrons that the second shell can hold is",
  "দ্বিতীয় কক্ষে ধাৰণ কৰিব পৰা সৰ্বোচ্চ ইলেক্ট্ৰন সংখ্যা",
  [["8", "৮"], ["2", "২"], ["18", "১৮"], ["32", "৩২"]], 0,
  "The capacity of a shell is 2n squared, so the second shell holds 2 times 4, that is 8 electrons. Eighteen belongs to the third shell and thirty-two to the fourth.",
  "কক্ষৰ ধাৰণ ক্ষমতা ২n বৰ্গ, সেয়ে দ্বিতীয় কক্ষত ২ গুণ ৪, অৰ্থাৎ ৮ ইলেক্ট্ৰন। ১৮ তৃতীয় কক্ষৰ আৰু ৩২ চতুৰ্থৰ।");

add("chemistry-143",
  "Isotopes of an element differ in the number of",
  "এটা মৌলিকৰ ইসটোপবোৰ কি সংখ্যাত পাৰ্থক্য থাকে",
  [["neutrons", "নিউট্ৰন"], ["electrons", "ইলেক্ট্ৰন"], ["protons", "প্ৰটন"], ["atomic number", "পাৰমাণৱিক সংখ্যা"]], 0,
  "Isotopes share the same proton number, so the atomic number is identical, but the neutron count differs and so does the mass number.",
  "ইসটোপবোৰৰ প্ৰটন সংখ্যা একেই, সেয়ে পাৰমাণৱিক সংখ্যা একেই, কিন্তু নিউট্ৰন সংখ্যা বেলেগ আৰু ভৰ সংখ্যাও বেলেগ।");

add("chemistry-144",
  "The mass number of an atom is the sum of",
  "পৰমাণু এটাৰ ভৰ সংখ্যা কিৰ সমষ্টি",
  [["protons and neutrons", "প্ৰটন আৰু নিউট্ৰন"], ["protons and electrons", "প্ৰটন আৰু ইলেক্ট্ৰন"], ["neutrons and electrons", "নিউট্ৰন আৰু ইলেক্ট্ৰন"], ["protons only", "কেৱল প্ৰটন"]], 0,
  "The mass number counts the nucleons, that is protons plus neutrons, because an electron weighs almost nothing by comparison.",
  "ভৰ সংখ্যাই নিউক্লিয়ন গণে, অৰ্থাৎ প্ৰটন আৰু নিউট্ৰন, কাৰণ ইলেক্ট্ৰনৰ ভৰ প্ৰায় শূন্য।");

add("chemistry-145",
  "The number of electrons in the outermost shell of chlorine, atomic number seventeen, is",
  "ক্লৰিনৰ, পাৰমাণৱিক সংখ্যা সোতৰ, বহিঃস্ত কক্ষত ইলেক্ট্ৰন সংখ্যা",
  [["7", "৭"], ["1", "১"], ["8", "৮"], ["17", "১৭"]], 0,
  "Chlorine fills two in the first shell and eight in the second, leaving seven in the third. Seven outer electrons give it a valency of one.",
  "ক্লৰিনে প্ৰথম কক্ষত দুটা, দ্বিতীয়ত আঠটা ভৰে, তৃতীয়ত সাতটা ৰয়। সাতটা বহিঃস্ত ইলেক্ট্ৰনে ইয়াক এক যোজ্যতা দিয়ে।");

add("chemistry-146",
  "The isotope of hydrogen with one neutron is called",
  "এক নিউট্ৰন থকা হাইড্ৰজেনৰ ইসটোপক কি বোলা হয়",
  [["deuterium", "ডিউটেৰিয়াম"], ["protium", "প্ৰটিয়াম"], ["tritium", "ট্ৰিটিয়াম"], ["hydronium", "হাইড্ৰনিয়াম"]], 0,
  "Deuterium, also called heavy hydrogen, has one proton and one neutron. Protium has no neutron and tritium has two.",
  "ডিউটেৰিয়াম, যাক গধুৰ হাইড্ৰজেনো বোলা হয়, তাত এটা প্ৰটন আৰু এটা নিউট্ৰন থাকে। প্ৰটিয়ামত নিউট্ৰন নাই আৰু ট্ৰিটিয়ামত দুটা।");

add("chemistry-147",
  "The number of moles in 36 g of water is",
  "৩৬ গ্ৰাম পানীত মৌল সংখ্যা",
  [["2", "২"], ["1", "১"], ["18", "১৮"], ["0.5", "০.৫"]], 0,
  "The molar mass of water is 18 g, so 36 g holds 36 divided by 18, that is two moles.",
  "পানীৰ মৌলাৰ ভৰ ১৮ গ্ৰাম, সেয়ে ৩৬ গ্ৰামত ৩৬ ভাগ ১৮, অৰ্থাৎ দুটা মৌল।");

add("chemistry-148",
  "The volume occupied by one mole of any gas at standard temperature and pressure is about",
  "প্ৰামাণ্য উষ্ণতা আৰু চাপত যিকোনো গেছেৰ এক মৌলে ধাৰণ কৰা আয়তন প্ৰায়",
  [["22.4 litre", "২২.৪ লিটাৰ"], ["11.2 litre", "১১.২ লিটাৰ"], ["44.8 litre", "৪৪.৮ লিটাৰ"], ["1 litre", "১ লিটাৰ"]], 0,
  "Avogadro's law gives 22.4 litre for one mole of any gas at standard conditions, whatever the gas.",
  "অ্যাভোগাড্ৰৰ নিয়মে প্ৰামাণ্য অৱস্থাত যিকোনো গেছেৰ এক মৌললৈ ২২.৪ লিটাৰ দিয়ে।");

add("chemistry-149",
  "An orbital can hold a maximum of",
  "এটা অৰ্বিটেলে সৰ্বোচ্চ কিমান ধাৰণ কৰিব পাৰে",
  [["two electrons", "দুটা ইলেক্ট্ৰন"], ["one electron", "এটা ইলেক্ট্ৰন"], ["six electrons", "ছয় ইলেক্ট্ৰন"], ["eight electrons", "আঠ ইলেক্ট্ৰন"]], 0,
  "Pauli's exclusion principle allows only two electrons of opposite spin in one orbital. Six is the capacity of a whole p subshell.",
  "পাউলিৰ বৰ্জন নীতিয়ে এটা অৰ্বিটেলত কেৱল বিপৰীত ঘূৰ্ণনৰ দুটা ইলেক্ট্ৰনলৈ অনুমতি দিয়ে। ছয় এটা পূৰ্ণ p উপকক্ষৰ ক্ষমতা।");

add("chemistry-150",
  "The element with electron configuration 2, 8, 8, 1 belongs to",
  "ইলেক্ট্ৰন বিন্যাস ২, ৮, ৮, ১ থকা মৌলিকটো কি শ্ৰেণীত পৰে",
  [["the fourth period", "চতুৰ্থ পিৰিয়ড"], ["the first period", "প্ৰথম পিৰিয়ড"], ["the third period", "তৃতীয় পিৰিয়ড"], ["the second period", "দ্বিতীয় পিৰিয়ড"]], 0,
  "Four shells are occupied, so the element sits in the fourth period, and the single outer electron marks it as an alkali metal.",
  "চাৰিটা কক্ষ ভৰা হৈছে, সেয়ে মৌলিকটো চতুৰ্থ পিৰিয়ডত, আৰু এটা বহিঃস্ত ইলেক্ট্ৰনে ইয়াক ক্ষাৰ ধাতু বুলি চিনায়।");

add("chemistry-151",
  "The valency of an element with electron configuration 2, 6 is",
  "ইলেক্ট্ৰন বিন্যাস ২, ৬ থকা মৌলিকৰ যোজ্যতা",
  [["2", "২"], ["6", "৬"], ["8", "৮"], ["4", "৪"]], 0,
  "Six outer electrons need two more to complete the octet, so the valency is two.",
  "ছয় বহিঃস্ত ইলেক্ট্ৰনে অক্টেট পূৰ্ণ কৰিবলৈ আৰু দুটা বিচাৰে, সেয়ে যোজ্যতা দুই।");

add("chemistry-152",
  "Which pair consists of isobars?",
  "কোন যোৰটো ইসোবাৰ",
  [["argon and calcium", "আৰ্গন আৰু কেল্ছিয়াম"], ["sodium and magnesium", "ছডিয়াম আৰু মেগ্নেছিয়াম"], ["hydrogen and deuterium", "হাইড্ৰজেন আৰু ডিউটেৰিয়াম"], ["oxygen sixteen and oxygen eighteen", "অক্সিজেন ষোল্ল আৰু অক্সিজেন আঠাৰ"]], 0,
  "Isobars have the same mass number but different atomic numbers, and argon and calcium both carry mass number forty.",
  "ইসোবাৰৰ ভৰ সংখ্যা একেই কিন্তু পাৰমাণৱিক সংখ্যা বেলেগ, আৰু আৰ্গন আৰু কেল্ছিয়ামৰ ভৰ সংখ্যা চল্লিছ।");

add("chemistry-153",
  "The atomic radius of an element generally decreases across a period because",
  "এটা পিৰিয়ডত মৌলিক ব্যাসাৰ্ধ সাধাৰণতে কমে কাৰণ",
  [["nuclear charge rises while the shell stays the same", "কক্ষ একেই থাকোতে নিউক্লিয় আধান বাঢ়ে"], ["the number of shells increases", "কক্ষৰ সংখ্যা বাঢ়ে"], ["neutrons are lost", "নিউট্ৰন হেৰায়"], ["electrons are added to a new shell", "ইলেক্ট্ৰন নতুন কক্ষত যোগ হয়"]], 0,
  "Across a period the outer shell is the same but protons are added, so the nucleus pulls the electrons in tighter.",
  "পিৰিয়ডৰ মাজেৰে বহিঃস্ত কক্ষ একেই কিন্তু প্ৰটন বাঢ়ে, সেয়ে নিউক্লিয়াছে ইলেক্ট্ৰনক টানি লয়।");

add("chemistry-154",
  "The isotope used in the treatment of cancer is",
  "কেন্সাৰৰ চিকিৎসাত ব্যৱহৃত ইসটোপ",
  [["cobalt sixty", "কোবাল্ট ষাঠি"], ["iodine one three one", "আয়ডিন এক তিনি এক"], ["carbon fourteen", "কাৰ্বন চৈদ্ধ"], ["sodium twenty four", "ছডিয়াম বিছ চাৰি"]], 0,
  "Cobalt sixty gives off high energy gamma rays that are aimed at a tumour. Iodine one three one treats the thyroid.",
  "কোবাল্ট ষাঠিয়ে উচ্চ শক্তিৰ গামা ৰশ্মি এৰি দিয়ে যি টিউমাৰলৈ লক্ষ্য কৰা হয়। আয়ডিন এক তিনি একে থাইৰয়ডৰ চিকিৎসা কৰে।");

add("chemistry-155",
  "The number of electrons in the sodium ion formed when sodium loses one electron is",
  "ছডিয়ামে এটা ইলেক্ট্ৰন হেৰুৱাই গঠন কৰা আয়নত ইলেক্ট্ৰন সংখ্যা",
  [["10", "১০"], ["11", "১১"], ["12", "১২"], ["23", "২৩"]], 0,
  "A sodium atom has eleven electrons and loses one to become the positive ion, leaving ten.",
  "ছডিয়াম পৰমাণুত এঘাৰটা ইলেক্ট্ৰন থাকে আৰু এটা হেৰাই ধনাত্মক আয়ন হয়, দহটা ৰয়।");

add("chemistry-156",
  "The scientist who proposed that electrons revolve in fixed orbits around the nucleus was",
  "নিউক্লিয়াছৰ চাৰিওফালে ইলেক্ট্ৰনে নিৰ্দিষ্ট কক্ষত ঘূৰে বুলি প্ৰস্তাৱ কৰা বিজ্ঞানীজন",
  [["Niels Bohr", "নীল্ছ ব'ৰ"], ["Rutherford", "ৰাদাৰফৰ্ড"], ["Dalton", "ডাল্টন"], ["Chadwick", "চাদৱিক"]], 0,
  "Bohr added fixed energy orbits to the Rutherford model to explain why electrons do not spiral into the nucleus.",
  "ব'ৰে ৰাদাৰফৰ্ড আৰ্হিলৈ নিৰ্দিষ্ট শক্তি কক্ষ যোগ কৰি দেখুৱালে ইলেক্ট্ৰনে নিউক্লিয়াছত কিয় স্পাইৰাল নহয়।");

add("chemistry-157",
  "The formula mass of sodium chloride is 58.5. The number of moles in 117 g of it is",
  "ছডিয়াম ক্লৰাইডৰ সূত্ৰ ভৰ ৫৮.৫। ১১৭ গ্ৰামত মৌল সংখ্যা",
  [["2", "২"], ["1", "১"], ["0.5", "০.৫"], ["4", "৪"]], 0,
  "Dividing 117 by 58.5 gives exactly two moles.",
  "১১৭ ক ৫৮.৫ ৰে ভাগ দিলে ঠিক দুটা মৌল পোৱা যায়।");

/* ================= periodic-table ================= */
useLeaf("periodic-table");

add("chemistry-158",
  "In the modern periodic table the elements are arranged in order of increasing",
  "আধুনিক পিৰিয়ডিক তালিকাত মৌলিকবোৰক কি বাঢ়ি থকা ক্ৰমত সজোৱা হয়",
  [["atomic number", "পাৰমাণৱিক সংখ্যা"], ["atomic mass", "পাৰমাণৱিক ভৰ"], ["valency", "যোজ্যতা"], ["density", "ঘনত্ব"]], 0,
  "Mendeleev used atomic mass, but the modern table follows atomic number, which removes the misplaced pairs.",
  "মেণ্ডেলিয়েভে পাৰমাণৱিক ভৰ ব্যৱহাৰ কৰিছিল, কিন্তু আধুনিক তালিকাই পাৰমাণৱিক সংখ্যা অনুসৰে, যিয়ে ভুল ঠাইত থকা যোৰ আতৰায়।");

add("chemistry-159",
  "The number of periods in the modern periodic table is",
  "আধুনিক পিৰিয়ডিক তালিকাত পিৰিয়ডৰ সংখ্যা",
  [["7", "৭"], ["8", "৮"], ["18", "১৮"], ["9", "৯"]], 0,
  "There are seven periods, matching the seven shells that are filled in the known elements.",
  "সাতটা পিৰিয়ড আছে, যি জনা মৌলিকত ভৰা সাতটা কক্ষৰ সৈতে মিলে।");

add("chemistry-160",
  "The number of groups in the modern periodic table is",
  "আধুনিক পিৰিয়ডিক তালিকাত শ্ৰেণীৰ সংখ্যা",
  [["18", "১৮"], ["7", "৭"], ["8", "৮"], ["16", "১৬"]], 0,
  "The table has eighteen vertical groups, of which eight are the main groups.",
  "তালিকাত আঠাৰটা উল্লম্ব শ্ৰেণী আছে, যাৰ আঠটা মুখ্য শ্ৰেণী।");

add("chemistry-161",
  "Elements of the same group show similar chemical behaviour because they have the same",
  "একেই শ্ৰেণীৰ মৌলিকবোৰে একেই ৰাসায়নিক আচৰণ দেখুৱায় কাৰণ তেওবোৰ একেই",
  [["number of outer shell electrons", "বহিঃস্ত কক্ষৰ ইলেক্ট্ৰন সংখ্যা"], ["atomic mass", "পাৰমাণৱিক ভৰ"], ["number of neutrons", "নিউট্ৰন সংখ্যা"], ["number of shells", "কক্ষৰ সংখ্যা"]], 0,
  "Chemical behaviour is fixed by the outer electrons, so a shared outer count means shared valency.",
  "ৰাসায়নিক আচৰণ বহিঃস্ত ইলেক্ট্ৰনে নিৰ্ণয় কৰে, সেয়ে একেই বহিঃস্ত সংখ্যা মানে একেই যোজ্যতা।");

add("chemistry-162",
  "The most electronegative element in the periodic table is",
  "পিৰিয়ডিক তালিকাৰ আটাই বেছি ইলেক্ট্ৰন ঋণাত্মকতা থকা মৌলিক",
  [["fluorine", "ফ্লৰিন"], ["oxygen", "অক্সিজেন"], ["chlorine", "ক্লৰিন"], ["nitrogen", "নাইট্ৰজেন"]], 0,
  "Fluorine sits at the top right of the table and pulls electrons hardest. Oxygen is second and chlorine third.",
  "ফ্লৰিন তালিকাৰ ওপৰ সোঁ ফালে আৰু ইলেক্ট্ৰনক আটাই বেছি টানে। অক্সিজেন দ্বিতীয় আৰু ক্লৰিন তৃতীয়।");

add("chemistry-163",
  "The group known as the noble gases is",
  "উপলব্ধ গেছেৰ শ্ৰেণী বুলি জনা শ্ৰেণীটো",
  [["group eighteen", "শ্ৰেণী আঠাৰ"], ["group one", "শ্ৰেণী এক"], ["group seventeen", "শ্ৰেণী সোতৰ"], ["group two", "শ্ৰেণী দুই"]], 0,
  "Group eighteen holds helium, neon, argon and the rest, all with a full outer shell.",
  "শ্ৰেণী আঠাৰত হিলিয়াম, নিয়ন, আৰ্গন আৰু বাকীবোৰ, সকলোৰে পূৰ্ণ বহিঃস্ত কক্ষ।");

add("chemistry-164",
  "Going down a group the metallic character of the elements",
  "এটা শ্ৰেণীৰ তললৈ গলে মৌলিকবোৰৰ ধাতৱিক গুণ",
  [["increases", "বাঢ়ে"], ["decreases", "কমে"], ["stays the same", "একেই ৰয়"], ["vanishes at once", "লগে লগে লুপ্ত হয়"]], 0,
  "Lower members hold their outer electrons more loosely because the shell is farther from the nucleus.",
  "তলৰ সদস্যবোৰে বহিঃস্ত ইলেক্ট্ৰনক ঢিলা কৰি ধৰে কাৰণ কক্ষ নিউক্লিয়াছৰ পৰা দূৰ।");

add("chemistry-165",
  "Which of the following is a noble gas?",
  "তলৰ কোনটো উপলব্ধ গেছ",
  [["Argon", "আৰ্গন"], ["Chlorine", "ক্লৰিন"], ["Nitrogen", "নাইট্ৰজেন"], ["Hydrogen", "হাইড্ৰজেন"]], 0,
  "Argon has a full outer shell of eight and does not react under ordinary conditions.",
  "আৰ্গনৰ আঠটাৰে পূৰ্ণ বহিঃস্ত কক্ষ আৰু সাধাৰণ অৱস্থাত বিক্ৰিয়া নকৰে।");

add("chemistry-166",
  "The lightest element in the periodic table is",
  "পিৰিয়ডিক তালিকাৰ আটাই পাতল মৌলিক",
  [["hydrogen", "হাইড্ৰজেন"], ["helium", "হিলিয়াম"], ["lithium", "লিথিয়াম"], ["carbon", "কাৰ্বন"]], 0,
  "Hydrogen has atomic number one and the smallest mass, so it heads the table.",
  "হাইড্ৰজেনৰ পাৰমাণৱিক সংখ্যা এক আৰু আটাই কম ভৰ, সেয়ে ই তালিকাৰ আৰম্ভত।");

add("chemistry-167",
  "The element with atomic number twenty is",
  "পাৰমাণৱিক সংখ্যা বিছ থকা মৌলিকটো",
  [["calcium", "কেল্ছিয়াম"], ["potassium", "পটাছিয়াম"], ["argon", "আৰ্গন"], ["sodium", "ছডিয়াম"]], 0,
  "Twenty is calcium, an alkaline earth metal of group two. Potassium is nineteen and argon eighteen.",
  "বিছ হ'ল কেল্ছিয়াম, শ্ৰেণী দুইৰ ক্ষাৰীয় মৃত্তিকা ধাতু। পটাছিয়াম উনৈশ আৰু আৰ্গন আঠাৰ।");

add("chemistry-168",
  "Halogens are placed in which group of the periodic table?",
  "হ্যালোজেনবোৰক পিৰিয়ডিক তালিকাৰ কোন শ্ৰেণীত ৰখা হয়",
  [["seventeen", "সোতৰ"], ["eighteen", "আঠাৰ"], ["one", "এক"], ["two", "দুই"]], 0,
  "Group seventeen holds fluorine, chlorine, bromine and iodine, each one electron short of a full shell.",
  "শ্ৰেণী সোতৰত ফ্লৰিন, ক্লৰিন, ব্ৰমিন আৰু আয়ডিন, প্ৰত্যেক পূৰ্ণ কক্ষৰ পৰা এক ইলেক্ট্ৰন কম।");

add("chemistry-169",
  "Transition metals are placed between",
  "ট্ৰান্ছিচন ধাতুবোৰক কাৰ মাজত ৰখা হয়",
  [["group two and group thirteen", "শ্ৰেণী দুই আৰু শ্ৰেণী তেৰ"], ["group one and group two", "শ্ৰেণী এক আৰু শ্ৰেণী দুই"], ["group seventeen and eighteen", "শ্ৰেণী সোতৰ আৰু আঠাৰ"], ["period one and two", "পিৰিয়ড এক আৰু দুই"]], 0,
  "The ten transition groups run from group three to twelve, that is between group two and group thirteen.",
  "দহটা ট্ৰান্ছিচন শ্ৰেণী শ্ৰেণী তিনিৰ পৰা বাৰালৈ, অৰ্থাৎ শ্ৰেণী দুই আৰু তেৰ মাজত।");

add("chemistry-170",
  "Mendeleev left gaps in his table because",
  "মেণ্ডেলিয়েভে তেওঁৰ তালিকাত খালী ঠাই এৰিছিল কাৰণ",
  [["undiscovered elements were yet to be found", "অদিশ্চাৰিত মৌলিক এতিয়াও পোৱা নগৈছিল"], ["he did not know the names", "তেওঁ নাম নাজানিছিল"], ["the table was too small", "তালিকা অতি সৰু আছিল"], ["some elements do not exist", "কিছু মৌলিক নাই"]], 0,
  "He predicted elements such as gallium and germanium from the pattern and left room for them.",
  "তেওঁ গেলিয়াম আৰু জাৰ্মেনিয়ামৰ দৰে মৌলিক আৰ্হাই পূৰ্বানুমান কৰি ঠাই এৰিছিল।");

add("chemistry-171",
  "The period in which the electron of an atom enters the third shell for the first time is",
  "পৰমাণু এটাৰ ইলেক্ট্ৰন প্ৰথমবাৰ তৃতীয় কক্ষত সোমোৱা পিৰিয়ডটো",
  [["the third", "তৃতীয়"], ["the second", "দ্বিতীয়"], ["the fourth", "চতুৰ্থ"], ["the first", "প্ৰথম"]], 0,
  "Sodium and magnesium fill the third shell, so the third period is where it first comes into use.",
  "ছডিয়াম আৰু মেগ্নেছিয়ামে তৃতীয় কক্ষ ভৰে, সেয়ে তৃতীয় পিৰিয়ডতেই ই প্ৰথম ব্যৱহাৰ হয়।");

add("chemistry-172",
  "Which of the following sets all belong to the same period?",
  "তলৰ কোনটো সংহতিয়ে সকলো একেই পিৰিয়ডৰ",
  [["sodium, magnesium, aluminium", "ছডিয়াম, মেগ্নেছিয়াম, এলুমিনিয়াম"], ["hydrogen, helium, lithium", "হাইড্ৰজেন, হিলিয়াম, লিথিয়াম"], ["oxygen, sulphur, chlorine", "অক্সিজেন, ছালফাৰ, ক্লৰিন"], ["fluorine, chlorine, bromine", "ফ্লৰিন, ক্লৰিন, ব্ৰমিন"]], 0,
  "Sodium, magnesium and aluminium all have three shells, so they share the third period.",
  "ছডিয়াম, মেগ্নেছিয়াম আৰু এলুমিনিয়ামৰ তিনি কক্ষ, সেয়ে একেই তৃতীয় পিৰিয়ড।");

add("chemistry-173",
  "The block of the periodic table that holds the lanthanides and actinides is the",
  "লেন্থানাইড আৰু অ্যাক্টানাইড থকা পিৰিয়ডিক তালিকাৰ ব্লকটো",
  [["f block", "f ব্লক"], ["s block", "s ব্লক"], ["p block", "p ব্লক"], ["d block", "d ব্লক"]], 0,
  "The inner transition metals fill f orbitals and sit in the f block.",
  "অন্তঃট্ৰান্ছিচন ধাতুবোৰে f অৰ্বিটেল ভৰে আৰু f ব্লকত থাকে।");

add("chemistry-174",
  "Across a period the valency of the elements first rises and then falls because",
  "এটা পিৰিয়ডত মৌলিকবোৰৰ যোজ্যতা প্ৰথমে বাঢ়ি পিছে কমে কাৰণ",
  [["the outer electron count rises and then the tendency turns to gaining electrons", "বহিঃস্ত ইলেক্ট্ৰন সংখ্যা বাঢ়ি পিছে ইলেক্ট্ৰন লোৱাৰ প্ৰৱণতা হয়"], ["the nucleus loses charge", "নিউক্লিয়াছে আধান হেৰুৱায়"], ["new shells are added", "নতুন কক্ষ যোগ হয়"], ["the mass falls", "ভৰ কমে"]], 0,
  "Early members give electrons away, but past the middle it becomes easier to gain the missing electrons.",
  "আৰম্ভনীয় সদস্যে ইলেক্ট্ৰন এৰি দিয়ে, কিন্তু মাজৰ পৰা নোহোৱা ইলেক্ট্ৰন লোৱা সহজ হয়।");

add("chemistry-175",
  "The element that is liquid at room temperature among the metals is",
  "ধাতুবোৰ মাজত কোঠাৰী তাপত জুলীয়া থকা মৌলিকটো",
  [["mercury", "মাৰ্কাৰি"], ["bromine", "ব্ৰমিন"], ["gallium", "গেলিয়াম"], ["sodium", "ছডিয়াম"]], 0,
  "Mercury stays liquid down to about minus thirty-nine degrees, so it is the liquid metal. Bromine is liquid but is a non-metal.",
  "মাৰ্কাৰিয়ে প্ৰায় মাইনাছ উনচল্লিছ ডিগ্ৰী পৰ্যন্ত জুলীয়া থকে, সেয়ে ই জুলীয়া ধাতু। ব্ৰমিন জুলীয়া কিন্তু অধাতু।");

add("chemistry-176",
  "Which of the following is a metalloid?",
  "তলৰ কোনটো উপধাতু",
  [["silicon", "ছিলিকন"], ["sodium", "ছডিয়াম"], ["chlorine", "ক্লৰিন"], ["argon", "আৰ্গন"]], 0,
  "Silicon shares properties of both metals and non-metals, which is what a metalloid means.",
  "ছিলিকনে ধাতু আৰু অধাতু দুয়োৰে গুণ ৰাখে, যি উপধাতুৰ অৰ্থ।");

add("chemistry-177",
  "The number of elements in the first period is",
  "প্ৰথম পিৰিয়ডত মৌলিকৰ সংখ্যা",
  [["2", "২"], ["8", "৮"], ["1", "১"], ["18", "১৮"]], 0,
  "Only hydrogen and helium fill the single shell of the first period, so there are two.",
  "কেৱল হাইড্ৰজেন আৰু হিলিয়ামে প্ৰথম পিৰিয়ডৰ এক কক্ষ ভৰে, সেয়ে দুটা।");

add("chemistry-178",
  "The element with the largest atomic radius among the following is",
  "তলৰ মাজত আটাই বেছি পাৰমাণৱিক ব্যাসাৰ্ধ থকা মৌলিক",
  [["potassium", "পটাছিয়াম"], ["sodium", "ছডিয়াম"], ["lithium", "লিথিয়াম"], ["hydrogen", "হাইড্ৰজেন"]], 0,
  "Radius grows down a group, so potassium, below sodium and lithium, is the largest of the four.",
  "শ্ৰেণীত তললৈ ব্যাসাৰ্ধ বাঢ়ে, সেয়ে ছডিয়াম আৰু লিথিয়ামৰ তলত থকা পটাছিয়াম চাৰিটাৰ আটাই ডাঙৰ।");

add("chemistry-179",
  "The group of the periodic table that contains only non-metals is",
  "পিৰিয়ডিক তালিকাৰ যি শ্ৰেণীত কেবল অধাতু থাকে",
  [["seventeen", "সোতৰ"], ["one", "এক"], ["two", "দুই"], ["twelve", "বাৰ"]], 0,
  "Group seventeen, the halogens, holds fluorine, chlorine, bromine and iodine, all non-metals.",
  "শ্ৰেণী সোতৰ, হ্যালোজেন, ত ফ্লৰিন, ক্লৰিন, ব্ৰমিন আৰু আয়ডিন, সকলে অধাতু।");

/* ================= chemical-bonding ================= */
useLeaf("chemical-bonding");

add("chemistry-180",
  "The bond formed by the complete transfer of electrons from one atom to another is called",
  "এটা পৰমাণুৰপৰা আন এটালৈ ইলেক্ট্ৰন সম্পূৰ্ণ হস্তান্তৰেৰে গঠন হোৱা বন্ধনক কি বোলা হয়",
  [["ionic bond", "আয়নিক বন্ধন"], ["covalent bond", "সমযোজী বন্ধন"], ["metallic bond", "ধাতৱীয় বন্ধন"], ["hydrogen bond", "হাইড্ৰজেন বন্ধন"]], 0,
  "A metal gives up electrons and a non-metal takes them, so ions form and attract each other electrostatically. A covalent bond shares electrons instead of transferring them.",
  "ধাতুৱে ইলেক্ট্ৰন এৰি দিয়ে আৰু অধাতুৱে লয়, সেয়ে আয়ন গঠিত হয় আৰু স্থিৰ-বৈদ্যুতিক আকৰ্ষণে বান্ধে। সমযোজী বন্ধনে ইলেক্ট্ৰন ভাগ কৰে, হস্তান্তৰ নকৰে।");

add("chemistry-181",
  "The bond formed by sharing of electron pairs between two atoms is called",
  "দুটা পৰমাণুৰ মাজত ইলেক্ট্ৰন যোৰ ভাগ কৰি গঠন হোৱা বন্ধনক কি বোলা হয়",
  [["covalent bond", "সমযোজী বন্ধন"], ["ionic bond", "আয়নিক বন্ধন"], ["coordinate bond", "সমন্বয় বন্ধন"], ["metallic bond", "ধাতৱীয় বন্ধন"]], 0,
  "When neither atom can give away electrons outright, both contribute one to a shared pair. Ionic bonds need a full transfer.",
  "যেতিয়া কোনো পৰমাণুৱে ইলেক্ট্ৰন সম্পূৰ্ণ এৰি দিব নোৱাৰে, তেতিয়া দুয়োৱে ভাগ কৰা যোৰলৈ এটা এটা দিয়ে। আয়নিক বন্ধনত সম্পূৰ্ণ হস্তান্তৰ লাগে।");

add("chemistry-182",
  "The number of covalent bonds in a molecule of methane is",
  "মিথেন অণুত সমযোজী বন্ধনৰ সংখ্যা",
  [["4", "৪"], ["2", "২"], ["3", "৩"], ["1", "১"]], 0,
  "Carbon has four valency electrons and each hydrogen shares one, so four single bonds form a tetrahedron.",
  "কাৰ্বনৰ চাৰিটা যোজ্য ইলেক্ট্ৰন আৰু প্ৰতিটো হাইড্ৰজেনে এটা ভাগ কৰে, সেয়ে চাৰিটা একক বন্ধনে চতুস্তলক গঠন কৰে।");

add("chemistry-183",
  "The bond present in sodium chloride is",
  "ছডিয়াম ক্লৰাইডত থকা বন্ধনটো",
  [["ionic", "আয়নিক"], ["covalent", "সমযোজী"], ["metallic", "ধাতৱীয়"], ["coordinate", "সমন্বয়"]], 0,
  "Sodium loses its single outer electron to chlorine, giving ions held by electrostatic attraction. The two differ greatly in electronegativity, so they do not share.",
  "ছডিয়ামে তাৰ এক বহিঃস্ত ইলেক্ট্ৰন ক্লৰিনলৈ এৰি দিয়ে, আয়ন স্থিৰ-বৈদ্যুতিক আকৰ্ষণে ধৰি ৰাখে। দুয়োৰ ইলেক্ট্ৰন ঋণাত্মকতাত বহু পাৰ্থক্য, সেয়ে ভাগ নকৰে।");

add("chemistry-184",
  "The shape of the ammonia molecule is",
  "এম'নিয়া অণুৰ আকৃতি",
  [["pyramidal", "পিৰামিডীয়"], ["linear", "ৰৈখিক"], ["tetrahedral", "চতুস্তলকীয়"], ["planar", "সমতলীয়"]], 0,
  "Nitrogen carries a lone pair that pushes the three bonds down into a pyramid. A tetrahedral shape would need four bonded atoms and no lone pair.",
  "নাইট্ৰজেনত এটা নিঃসংগ যোৰে তিনিটা বন্ধন তললৈ ঠেলি পিৰামিড গঢ়ে। চতুস্তলকীয়লৈ চাৰিটা বন্ধনযুক্ত পৰমাণু আৰু নিঃসংগ যোৰ নাথাকিব লাগে।");

add("chemistry-185",
  "Water has a higher boiling point than hydrogen sulphide mainly because water molecules form",
  "পানীৰ উতলাংক হাইড্ৰজেন ছালফাইডতকৈ বেছি কাৰণ পানীৰ অণুবোৰে গঢ়ে",
  [["hydrogen bonds", "হাইড্ৰজেন বন্ধন"], ["ionic bonds", "আয়নিক বন্ধন"], ["metallic bonds", "ধাতৱীয় বন্ধন"], ["peptide bonds", "পেপটাইড বন্ধন"]], 0,
  "Oxygen is highly electronegative and small, so each water molecule hydrogen bonds to its neighbours. Sulphur is larger and less electronegative.",
  "অক্সিজেন অতি ইলেক্ট্ৰন ঋণাত্মক আৰু সৰু, সেয়ে প্ৰতিটো পানীৰ অণুৱে ওচৰৰ অণুৰ সৈতে হাইড্ৰজেন বন্ধন গঢ়ে। ছালফাৰ ডাঙৰ আৰু কম ইলেক্ট্ৰন ঋণাত্মক।");

add("chemistry-186",
  "The bond in which both shared electrons come from one atom is called",
  "যি বন্ধনত ভাগ কৰা দুয়োটা ইলেক্ট্ৰন এটা পৰমাণুৰপৰা আহে তাক কি বোলা হয়",
  [["coordinate bond", "সমন্বয় বন্ধন"], ["covalent bond", "সমযোজী বন্ধন"], ["ionic bond", "আয়নিক বন্ধন"], ["double bond", "দুটা বন্ধন"]], 0,
  "One atom donates a lone pair into an empty orbital of another, as in the ammonium ion. An ordinary covalent bond takes one electron from each side.",
  "এটা পৰমাণুৱে নিঃসংগ যোৰ আন এটাৰ খালী অৰ্বিটেললৈ দান কৰে, যেনে এম'নিয়াম আয়নত। সাধাৰণ সমযোজী বন্ধনে প্ৰতিফালৰপৰা এটা ইলেক্ট্ৰন লয়।");

add("chemistry-187",
  "Which molecule contains a triple bond?",
  "কোনটো অণুত তিনি বন্ধন আছে",
  [["nitrogen", "নাইট্ৰজেন"], ["oxygen", "অক্সিজেন"], ["hydrogen", "হাইড্ৰজেন"], ["chlorine", "ক্লৰিন"]], 0,
  "Two nitrogen atoms each need three electrons to complete the octet, so they share three pairs. Oxygen forms a double bond.",
  "দুটা নাইট্ৰজেন পৰমাণুৱে অক্টেট পূৰ্ণ কৰিবলৈ প্ৰতিটোৰে তিনি ইলেক্ট্ৰন বিচাৰে, সেয়ে তিনি যোৰ ভাগ কৰে। অক্সিজেনে দুটা বন্ধন গঢ়ে।");

add("chemistry-188",
  "Carbon forms a very large number of compounds mainly because of its",
  "কাৰ্বনে অতি বৃহৎ সংখ্যক যৌগ গঠন কৰে মূলতঃ তাৰ কিৰ বাবে",
  [["catenation and tetravalency", "শৃংখলন আৰু চতুৰ্যোজ্যতা"], ["large atomic size", "ডাঙৰ পাৰমাণৱিক আকাৰ"], ["low melting point", "কম গলনাংক"], ["high density", "উচ্চ ঘনত্ব"]], 0,
  "Carbon links with itself in long chains and rings and also forms four bonds, so an enormous variety of skeletons is possible.",
  "কাৰ্বনে নিজৰ সৈতে দীঘল শৃংখল আৰু চক্ৰ গঢ়ে আৰু চাৰিটা বন্ধনো গঢ়ে, সেয়ে অগাধ বিভিন্ন কংকাল সম্ভৱ।");

add("chemistry-189",
  "An atom that has gained electrons becomes",
  "ইলেক্ট্ৰন লাভ কৰা পৰমাণু এটা হয়",
  [["a negative ion", "ঋণাত্মক আয়ন"], ["a positive ion", "ধনাত্মক আয়ন"], ["a neutral atom", "প্ৰশান্ত পৰমাণু"], ["a free radical", "মুক্ত মূলক"]], 0,
  "Electrons carry negative charge, so gaining them leaves the atom with more negative than positive charge.",
  "ইলেক্ট্ৰনে ঋণাত্মক আধান কঢ়িয়ায়, সেয়ে লাভ কৰিলে পৰমাণুত ঋণাত্মক আধান ধনাত্মকতকৈ বেছি ৰয়।");

add("chemistry-190",
  "The valency of magnesium in magnesium chloride is",
  "মেগ্নেছিয়াম ক্লৰাইডত মেগ্নেছিয়ামৰ যোজ্যতা",
  [["2", "২"], ["1", "১"], ["3", "৩"], ["4", "৪"]], 0,
  "Magnesium has two outer electrons and gives both away, so it pairs with two chloride ions.",
  "মেগ্নেছিয়ামৰ দুটা বহিঃস্ত ইলেক্ট্ৰন আৰু দুয়োটা এৰি দিয়ে, সেয়ে ই দুটা ক্লৰাইড আয়নৰ সৈতে যোৰ বান্ধে।");

add("chemistry-191",
  "Which of the following compounds is held together mainly by ionic bonds?",
  "তলৰ কোনটো যৌগ মূলতঃ আয়নিক বন্ধনেৰে বন্ধা",
  [["potassium bromide", "পটাছিয়াম ব্ৰমাইড"], ["methane", "মিথেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["ammonia", "এম'নিয়া"]], 0,
  "Potassium is a metal and bromine a non-metal, so an electron transfer gives ions. The other three are molecular.",
  "পটাছিয়াম ধাতু আৰু ব্ৰমিন অধাতু, সেয়ে ইলেক্ট্ৰন হস্তান্তৰে আয়ন দিয়ে। বাকী তিনিটা আণৱিক।");

add("chemistry-192",
  "Ionic compounds generally have high melting points because",
  "আয়নিক যৌগৰ সাধাৰণতে উচ্চ গলনাংক থাকে কাৰণ",
  [["strong electrostatic forces hold the ions in a lattice", "শক্তিশালী স্থিৰ-বৈদ্যুতিক বলে আয়নবোৰ জালত ধৰি ৰাখে"], ["they contain covalent bonds", "তাত সমযোজী বন্ধন থাকে"], ["they are light in weight", "তেওবোৰ পাতল"], ["they dissolve in water", "তেওবোৰ পানীত দ্ৰৱে"]], 0,
  "Every ion is surrounded by oppositely charged neighbours in a lattice, and breaking it needs a lot of energy.",
  "প্ৰতিটো আয়ন জালত বিপৰীত আধানযুক্ত প্ৰতিবেশীৰে আৱৰা, আৰু ভাঙিবলৈ বহু শক্তি লাগে।");

add("chemistry-193",
  "The bond angle in a molecule of water is about",
  "পানী অণুত বন্ধন কোণ প্ৰায়",
  [["104.5 degrees", "১০৪.৫ ডিগ্ৰী"], ["180 degrees", "১৮০ ডিগ্ৰী"], ["120 degrees", "১২০ ডিগ্ৰী"], ["90 degrees", "৯০ ডিগ্ৰী"]], 0,
  "Two lone pairs on oxygen squeeze the two bonds closer than the tetrahedral angle. A linear 180 degrees would need no lone pairs.",
  "অক্সিজেনৰ দুটা নিঃসংগ যোৰে দুটা বন্ধন চতুস্তলক কোণতকৈ ওচৰলৈ টানে। ৰৈখিক ১৮০ ডিগ্ৰীলৈ নিঃসংগ যোৰ নাথাকিব লাগে।");

add("chemistry-194",
  "A molecule of carbon dioxide contains",
  "কাৰ্বন ডাইঅক্সাইড অণুত থাকে",
  [["two double bonds", "দুটা দ্বৈত বন্ধন"], ["two single bonds", "দুটা একক বন্ধন"], ["one triple bond", "এটা তিনি বন্ধন"], ["four single bonds", "চাৰিটা একক বন্ধন"]], 0,
  "Carbon shares two pairs with each oxygen, so the molecule is linear. Single bonds would leave carbon short of an octet.",
  "কাৰ্বনে প্ৰতিটো অক্সিজেনৰ সৈতে দুযোৰ ভাগ কৰে, সেয়ে অণু ৰৈখিক। একক বন্ধন হ'লে কাৰ্বনৰ অক্টেট কম থাকিব।");

add("chemistry-195",
  "Which of the following is a property of covalent compounds?",
  "তলৰ কোনটো সমযোজী যৌগৰ ধৰ্ম",
  [["they are generally poor conductors of electricity", "তেওবোৰ সাধাৰণতে বিদ্যুৎৰ কুপৰিবাহী"], ["they are always soluble in water", "তেওবোৰ সদায় পানীত দ্ৰৱণীয়"], ["they have very high melting points", "তেওবোৰৰ গলনাংক অতি উচ্চ"], ["they contain free ions", "তাত মুক্ত আয়ন থাকে"]], 0,
  "Covalent compounds are molecular with no free ions, so they do not conduct. They dissolve in organic solvents rather than water.",
  "সমযোজী যৌগ আণৱিক আৰু তাত মুক্ত আয়ন নাই, সেয়ে পৰিবহন নকৰে। তেওবোৰ পানীতকৈ জৈৱ দ্ৰাৱকত দ্ৰৱে।");

add("chemistry-196",
  "The number of electron pairs shared between two oxygen atoms in an oxygen molecule is",
  "অক্সিজেন অণুত দুটা অক্সিজেন পৰমাণুৰ মাজত ভাগ কৰা ইলেক্ট্ৰন যোৰৰ সংখ্যা",
  [["2", "২"], ["1", "১"], ["3", "৩"], ["4", "৪"]], 0,
  "Each oxygen atom has six outer electrons and needs two more, so two pairs are shared.",
  "প্ৰতিটো অক্সিজেন পৰমাণুত ছটা বহিঃস্ত ইলেক্ট্ৰন আৰু আৰু দুটা বিচাৰে, সেয়ে দুযোৰ ভাগ হয়।");

add("chemistry-197",
  "Hydrogen chloride gas does not conduct electricity but its aqueous solution does because",
  "হাইড্ৰজেন ক্লৰাইড গেছে বিদ্যুৎ পৰিবহন নকৰে কিন্তু ইয়াৰ জলীয় দ্ৰৱে কৰে কাৰণ",
  [["water separates it into ions", "পানীয়ে ইয়াক আয়নলৈ পৃথক কৰে"], ["the gas is non-polar", "গেছটো অধ্ৰুৱীয়"], ["water is a poor conductor", "পানী দুৰ্বল পৰিবাহী"], ["the gas has covalent bonds only", "গেছত কেবল সমযোজী বন্ধন"]], 0,
  "In the gas the molecule stays intact, but water pulls it apart into ions that carry current.",
  "গেছত অণু অটুট থাকে, কিন্তু পানীয়ে ইয়াক আয়নলৈ টানি পৃথক কৰে যি প্ৰবাহ কঢ়িয়ায়।");

add("chemistry-198",
  "The type of bond present between the two strands of a DNA molecule is",
  "DNA অণুৰ দুটা ফিতাৰ মাজত থকা বন্ধনৰ প্ৰকাৰ",
  [["hydrogen bond", "হাইড্ৰজেন বন্ধন"], ["ionic bond", "আয়নিক বন্ধন"], ["covalent bond", "সমযোজী বন্ধন"], ["metallic bond", "ধাতৱীয় বন্ধন"]], 0,
  "The base pairs are joined by hydrogen bonds, weak enough to open during replication. The sugar-phosphate backbone is covalent.",
  "ক্ষাৰক যোৰবোৰ হাইড্ৰজেন বন্ধনেৰে জোৰা লগা, প্ৰতিলিপনত খোলাৰ বাবে যথেষ্ট দুৰ্বল। শৰ্কৰা-ফছফেট মেৰুদণ্ড সমযোজী।");

add("chemistry-199",
  "Which of the following has the highest melting point?",
  "তলৰ কোনটোৰ গলনাংক আটাই বেছি",
  [["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["ice", "বৰফ"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["ammonia", "এম'নিয়া"]], 0,
  "Sodium chloride is a giant ionic lattice, so melting means breaking many strong electrostatic attractions.",
  "ছডিয়াম ক্লৰাইড বিশাল আয়নিক জাল, সেয়ে গলাবলৈ বহু শক্তিশালী স্থিৰ-বৈদ্যুতিক আকৰ্ষণ ভাঙিব লাগে।");

add("chemistry-200",
  "An atom of chlorine has seven outer electrons. In forming a covalent bond it",
  "ক্লৰিন পৰমাণুত সাতটা বহিঃস্ত ইলেক্ট্ৰন। সমযোজী বন্ধন গঠনত ই",
  [["shares one electron to complete its octet", "অক্টেট পূৰ্ণ কৰিবলৈ এটা ইলেক্ট্ৰন ভাগ কৰে"], ["loses seven electrons", "সাতটা ইলেক্ট্ৰন হেৰুৱায়"], ["gains seven electrons", "সাতটা ইলেক্ট্ৰন লাভ কৰে"], ["loses one electron", "এটা ইলেক্ট্ৰন হেৰুৱায়"]], 0,
  "One shared pair gives chlorine the eight it needs, which is why it is univalent in hydrogen chloride.",
  "এটা ভাগ কৰা যোৰে ক্লৰিনক প্ৰয়োজনীয় আঠটা দিয়ে, সেয়ে হাইড্ৰজেন ক্লৰাইডত ক্লৰিন একযোজ্য।");

add("chemistry-201",
  "The bond in a molecule of hydrogen is",
  "হাইড্ৰজেন অণুত থকা বন্ধনটো",
  [["a single covalent bond", "এটা একক সমযোজী বন্ধন"], ["a double covalent bond", "এটা দ্বৈত সমযোজী বন্ধন"], ["an ionic bond", "এটা আয়নিক বন্ধন"], ["a coordinate bond", "এটা সমন্বয় বন্ধন"]], 0,
  "Each hydrogen has one electron and both share one pair. A double bond would need two electrons from each atom.",
  "প্ৰতিটো হাইড্ৰজেনত এটা ইলেক্ট্ৰন আৰু দুয়োৱে এক যোৰ ভাগ কৰে। দ্বৈত বন্ধনলৈ প্ৰতিফালৰপৰা দুটা ইলেক্ট্ৰন লাগিব।");

add("chemistry-202",
  "Which pair of elements would most readily form an ionic compound?",
  "কোন যোৰ মৌলিকৰপৰা আটাই সহজে আয়নিক যৌগ গঠিত হ'ব",
  [["sodium and chlorine", "ছডিয়াম আৰু ক্লৰিন"], ["carbon and oxygen", "কাৰ্বন আৰু অক্সিজেন"], ["nitrogen and hydrogen", "নাইট্ৰজেন আৰু হাইড্ৰজেন"], ["oxygen and oxygen", "অক্সিজেন আৰু অক্সিজেন"]], 0,
  "A highly electropositive metal with a highly electronegative non-metal gives a clean electron transfer.",
  "অতি বৈদ্যুতিক ধনাত্মক ধাতু আৰু অতি ইলেক্ট্ৰন ঋণাত্মক অধাতুৱে পৰিষ্কাৰ ইলেক্ট্ৰন হস্তান্তৰ দিয়ে।");

add("chemistry-203",
  "The number of lone pairs on the oxygen atom in a water molecule is",
  "পানী অণুত অক্সিজেন পৰমাণুত থকা নিঃসংগ যোৰৰ সংখ্যা",
  [["2", "২"], ["1", "১"], ["3", "৩"], ["0", "০"]], 0,
  "Oxygen has six outer electrons, two used in bonds to hydrogen, leaving two lone pairs. This is why water is bent.",
  "অক্সিজেনৰ ছটা বহিঃস্ত ইলেক্ট্ৰন, যাৰ দুটা বন্ধনত ব্যৱহৃত, বাকী দুটা নিঃসংগ যোৰ। সেয়ে পানী বেঁকা।");

add("chemistry-204",
  "Graphite conducts electricity while diamond does not because in graphite",
  "হীৰাৰ নহয় কিন্তু গ্ৰেফাইটে বিদ্যুৎ পৰিবহন কৰে কাৰণ গ্ৰেফাইটত",
  [["one electron per carbon is free to move", "প্ৰতিটো কাৰ্বনৰ এটা ইলেক্ট্ৰন চলাচললৈ মুক্ত"], ["the bonds are ionic", "বন্ধনবোৰ আয়নিক"], ["carbon atoms are spherically bonded", "কাৰ্বন পৰমাণু গোলাকাৰে বন্ধা"], ["there are free protons", "মুক্ত প্ৰটন থাকে"]], 0,
  "Each carbon in graphite bonds to only three neighbours, so the fourth electron is delocalised along the layers.",
  "গ্ৰেফাইটৰ প্ৰতিটো কাৰ্বনে কেবল তিনি প্ৰতিবেশীৰ সৈতে বন্ধন গঢ়ে, সেয়ে চতুৰ্থ ইলেক্ট্ৰন স্তৰবোৰৰ মাজেৰে মুক্ত।");

add("chemistry-205",
  "A bond formed between two atoms of the same element is always",
  "একেই মৌলিকৰ দুটা পৰমাণুৰ মাজত গঠিত বন্ধন সদায়",
  [["non-polar covalent", "অধ্ৰুৱীয় সমযোজী"], ["polar covalent", "ধ্ৰুৱীয় সমযোজী"], ["ionic", "আয়নিক"], ["coordinate", "সমন্বয়"]], 0,
  "Two identical atoms pull the shared pair equally, so there is no charge separation.",
  "দুটা একেই পৰমাণুৱে ভাগ কৰা যোৰ সমানে টানে, সেয়ে আধান পৃথক নহয়।");

add("chemistry-206",
  "The strongest type of chemical bond among the following is",
  "তলৰ মাজত আটাই শক্তিশালী ৰাসায়নিক বন্ধনৰ প্ৰকাৰ",
  [["covalent bond", "সমযোজী বন্ধন"], ["hydrogen bond", "হাইড্ৰজেন বন্ধন"], ["van der Waals force", "ভান ডাৰ ৱালছ বল"], ["dipole interaction", "দ্বিমেৰু মিথস্ক্ৰিয়া"]], 0,
  "A covalent bond shares electrons and needs hundreds of kilojoules per mole to break. The others are far weaker attractions.",
  "সমযোজী বন্ধনে ইলেক্ট্ৰন ভাগ কৰে আৰু ভাঙিবলৈ প্ৰতি মৌললৈ শতাধিক কিলজুল লাগে। বাকীবোৰ বহু দুৰ্বল আকৰ্ষণ।");

add("chemistry-207",
  "In the formation of magnesium oxide, magnesium",
  "মেগ্নেছিয়াম অক্সাইড গঠনত মেগ্নেছিয়ামে",
  [["loses two electrons", "দুটা ইলেক্ট্ৰন হেৰুৱায়"], ["gains two electrons", "দুটা ইলেক্ট্ৰন লাভ কৰে"], ["shares two electrons", "দুটা ইলেক্ট্ৰন ভাগ কৰে"], ["loses one electron", "এটা ইলেক্ট্ৰন হেৰুৱায়"]], 0,
  "Magnesium has two outer electrons and oxygen needs two, so magnesium donates both.",
  "মেগ্নেছিয়ামৰ দুটা বহিঃস্ত ইলেক্ট্ৰন আৰু অক্সিজেনলৈ দুটা লাগে, সেয়ে মেগ্নেছিয়ামে দুয়োটা দান কৰে।");

add("chemistry-208",
  "The bond order of the carbon to carbon bond in ethene is",
  "ইথিনত কাৰ্বনৰ পৰা কাৰ্বন বন্ধনৰ বন্ধন ক্ৰম",
  [["2", "২"], ["1", "১"], ["3", "৩"], ["1.5", "১.৫"]], 0,
  "Ethene is an alkene with a double bond between the two carbons. A bond order of one would make it ethane.",
  "ইথিন এটা এলকিন যাৰ দুটা কাৰ্বনৰ মাজত দ্বৈত বন্ধন। এক হ'লে ইথেন হ'ল হেতেন।");

/* ================= acids-bases-salts ================= */
useLeaf("acids-bases-salts");

add("chemistry-209",
  "According to the Bronsted-Lowry theory, an acid is a substance that",
  "ব্ৰন্ষ্টেড-লৰী তত্ত্ব অনুসৰি এচিড এনে পদাৰ্থ যি",
  [["donates a proton", "প্ৰটন দান কৰে"], ["accepts a proton", "প্ৰটন গ্ৰহণ কৰে"], ["donates an electron pair", "ইলেক্ট্ৰন যোৰ দান কৰে"], ["releases hydroxide ions only", "কেৱল হাইড্ৰক্সাইড আয়ন এৰে"]], 0,
  "A Bronsted acid is a proton donor and a base is a proton acceptor, which covers reactions in any solvent.",
  "ব্ৰন্ষ্টেড এচিড প্ৰটন দাতা আৰু ক্ষাৰক প্ৰটন গ্ৰাহক, যি যিকোনো দ্ৰাৱকত বিক্ৰিয়া সামৰি লয়।");

add("chemistry-210",
  "The pH of a solution with a hydrogen ion concentration of 0.001 mole per litre is",
  "হাইড্ৰজেন আয়ন ঘনত্ব প্ৰতি লিটাৰত ০.০০১ মৌল থকা দ্ৰৱৰ pH",
  [["3", "৩"], ["2", "২"], ["4", "৪"], ["11", "১১"]], 0,
  "pH is the negative logarithm of the hydrogen ion concentration, and the logarithm of 0.001 is minus three.",
  "pH হ'ল হাইড্ৰজেন আয়ন ঘনত্বৰ ঋণাত্মক লগাৰিদম, আৰু ০.০০১ ৰ লগাৰিদম মাইনাছ তিনি।");

add("chemistry-211",
  "When an acid reacts with a base, the products are",
  "এচিডে ক্ষাৰকৰ সৈতে বিক্ৰিয়া কৰিলে উৎপাদ হ'ল",
  [["a salt and water", "এটা লৱণ আৰু পানী"], ["a salt and hydrogen", "এটা লৱণ আৰু হাইড্ৰজেন"], ["an oxide and water", "এটা অক্সাইড আৰু পানী"], ["a base and water", "এটা ক্ষাৰক আৰু পানী"]], 0,
  "The hydrogen ion of the acid and the hydroxide ion of the base combine to give water, leaving the salt.",
  "এচিডৰ হাইড্ৰজেন আয়ন আৰু ক্ষাৰকৰ হাইড্ৰক্সাইড আয়নে মিলি পানী দিয়ে আৰু লৱণ ৰয়।");

add("chemistry-212",
  "Phenolphthalein in an alkaline solution is",
  "ক্ষাৰীয় দ্ৰৱত ফেনলফ্থেলিন হয়",
  [["pink", "গোলাপী"], ["colourless", "বৰ্ণহীন"], ["yellow", "হালধীয়া"], ["blue", "নীলা"]], 0,
  "Phenolphthalein stays colourless in acid and turns pink above a pH of about eight.",
  "ফেনলফ্থেলিন এচিডত বৰ্ণহীন থকে আৰু pH প্ৰায় আঠৰ ওপৰত গোলাপী হয়।");

add("chemistry-213",
  "Methyl orange in an acidic solution is",
  "এচিডীয় দ্ৰৱত মিথাইল অৰেঞ্জ হয়",
  [["red", "ৰঙা"], ["yellow", "হালধীয়া"], ["green", "সেউজীয়া"], ["colourless", "বৰ্ণহীন"]], 0,
  "Methyl orange is red in acid and turns yellow in alkali, which makes it useful for acid titrations.",
  "মিথাইল অৰেঞ্জ এচিডত ৰঙা আৰু ক্ষাৰকত হালধীয়া হয়, সেয়ে এচিড অনুমাপনত উপযোগী।");

add("chemistry-214",
  "The chemical formula of sodium hydroxide is",
  "ছডিয়াম হাইড্ৰক্সাইডৰ ৰাসায়নিক সূত্ৰ",
  [["NaOH", "NaOH"], ["NaCl", "NaCl"], ["Na2CO3", "Na2CO3"], ["NaHCO3", "NaHCO3"]], 0,
  "Sodium hydroxide is NaOH. NaCl is common salt, Na2CO3 washing soda and NaHCO3 baking soda.",
  "ছডিয়াম হাইড্ৰক্সাইড NaOH। NaCl সাধাৰণ লৱণ, Na2CO3 ধোৱা ছডা আৰু NaHCO3 বেকিং ছডা।");

add("chemistry-215",
  "Which of the following is a strong acid?",
  "তলৰ কোনটো প্ৰবল এচিড",
  [["hydrochloric acid", "হাইড্ৰক্লৰিক এচিড"], ["acetic acid", "এচিটিক এচিড"], ["carbonic acid", "কাৰ্বনিক এচিড"], ["citric acid", "চিট্ৰিক এচিড"]], 0,
  "Hydrochloric acid dissociates almost completely in water, so it is strong. The other three ionise only partly.",
  "হাইড্ৰক্লৰিক এচিড পানীত প্ৰায় সম্পূৰ্ণভাৱে বিয়োজিত হয়, সেয়ে ই প্ৰবল। বাকী তিনিটা কেবল আংশিকভাৱে আয়নিত হয়।");

add("chemistry-216",
  "Which of the following is a weak base?",
  "তলৰ কোনটো দুৰ্বল ক্ষাৰক",
  [["ammonium hydroxide", "এম'নিয়াম হাইড্ৰক্সাইড"], ["sodium hydroxide", "ছডিয়াম হাইড্ৰক্সাইড"], ["potassium hydroxide", "পটাছিয়াম হাইড্ৰক্সাইড"], ["calcium hydroxide", "কেল্ছিয়াম হাইড্ৰক্সাইড"]], 0,
  "Ammonium hydroxide ionises only slightly in water. The other three are strong bases.",
  "এম'নিয়াম হাইড্ৰক্সাইড পানীত কেবল অলপ বিয়োজিত হয়। বাকী তিনিটা প্ৰবল ক্ষাৰক।");

add("chemistry-217",
  "The reaction of zinc with dilute hydrochloric acid produces",
  "জিঙ্কৰ সৈতে লঘু হাইড্ৰক্লৰিক এচিডৰ বিক্ৰিয়াত উৎপন্ন হয়",
  [["zinc chloride and hydrogen", "জিঙ্ক ক্লৰাইড আৰু হাইড্ৰজেন"], ["zinc chloride and oxygen", "জিঙ্ক ক্লৰাইড আৰু অক্সিজেন"], ["zinc oxide and water", "জিঙ্ক অক্সাইড আৰু পানী"], ["zinc sulphate and hydrogen", "জিঙ্ক ছালফেট আৰু হাইড্ৰজেন"]], 0,
  "The metal displaces hydrogen from the acid, giving zinc chloride and hydrogen gas.",
  "ধাতুৱে এচিডৰপৰা হাইড্ৰজেন আঁতৰাই জিঙ্ক ক্লৰাইড আৰু হাইড্ৰজেন গেছ দিয়ে।");

add("chemistry-218",
  "A solution with a pH of 9 is",
  "pH ৯ থকা দ্ৰৱ এটা",
  [["weakly basic", "দুৰ্বল ক্ষাৰীয়"], ["strongly acidic", "প্ৰবল এচিডীয়"], ["neutral", "প্ৰশান্ত"], ["strongly basic", "প্ৰবল ক্ষাৰীয়"]], 0,
  "A pH just above seven is mildly alkaline, so nine is weakly basic.",
  "সাতৰ অলপ ওপৰ pH দুৰ্বল ক্ষাৰীয়, সেয়ে ন দুৰ্বল ক্ষাৰক।");

add("chemistry-219",
  "The salt formed when sodium hydroxide reacts with hydrochloric acid is",
  "ছডিয়াম হাইড্ৰক্সাইডে হাইড্ৰক্লৰিক এচিডৰ সৈতে বিক্ৰিয়া কৰিলে গঠিত লৱণটো",
  [["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium sulphate", "ছডিয়াম ছালফেট"], ["sodium carbonate", "ছডিয়াম কাৰ্বনেট"], ["sodium nitrate", "ছডিয়াম নাইট্ৰেট"]], 0,
  "The sodium of the base pairs with the chloride of the acid, giving sodium chloride and water.",
  "ক্ষাৰকৰ ছডিয়াম এচিডৰ ক্লৰাইডৰ সৈতে যোৰ বান্ধি ছডিয়াম ক্লৰাইড আৰু পানী দিয়ে।");

add("chemistry-220",
  "Acids conduct electricity in aqueous solution because they",
  "এচিডে জলীয় দ্ৰৱত বিদ্যুৎ পৰিবহন কৰে কাৰণ তেও",
  [["produce ions in water", "পানীত আয়ন উৎপন্ন কৰে"], ["contain free electrons", "মুক্ত ইলেক্ট্ৰন থাকে"], ["are always liquids", "সদায় জুলীয়া"], ["have a low pH", "কম pH থাকে"]], 0,
  "Ionisation in water gives mobile hydrogen ions and anions that carry the current.",
  "পানীত আয়নিত হৈ চলাচলক্ষম হাইড্ৰজেন আয়ন আৰু ঋণাত্মক আয়ন দিয়ে যি প্ৰবাহ কঢ়িয়ায়।");

add("chemistry-221",
  "Which of the following is a dibasic acid?",
  "তলৰ কোনটো দ্বিক্ষাৰকীয় এচিড",
  [["sulphuric acid", "ছালফিউৰিক এচিড"], ["hydrochloric acid", "হাইড্ৰক্লৰিক এচিড"], ["nitric acid", "নাইট্ৰিক এচিড"], ["acetic acid", "এচিটিক এচিড"]], 0,
  "Sulphuric acid can give up two hydrogen ions, so it is dibasic. The other three release only one.",
  "ছালফিউৰিক এচিডে দুটা হাইড্ৰজেন আয়ন এৰি দিব পাৰে, সেয়ে ই দ্বিক্ষাৰকীয়। বাকী তিনিটাই কেবল এটা এৰে।");

add("chemistry-222",
  "Baking soda is used in cooking because on heating it releases",
  "ৰন্ধাত বেকিং ছডা ব্যৱহাৰ হয় কাৰণ গৰম কৰিলে ই এৰি দিয়ে",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["oxygen", "অক্সিজেন"], ["hydrogen", "হাইড্ৰজেন"], ["ammonia", "এম'নিয়া"]], 0,
  "Sodium bicarbonate breaks down on heating to give carbon dioxide, which raises the dough.",
  "ছডিয়াম বাইকাৰ্বনেট গৰম কৰিলে ভাঙি কাৰ্বন ডাইঅক্সাইড দিয়ে, যি খমিৰ উঠায়।");

add("chemistry-223",
  "The pH scale usually ranges from",
  "pH মাপক সাধাৰণতে কিমানৰ পৰা কিমানলৈ",
  [["0 to 14", "০ ৰ পৰা ১৪ লৈ"], ["1 to 10", "১ ৰ পৰা ১০ লৈ"], ["0 to 7", "০ ৰ পৰা ৭ লৈ"], ["7 to 14", "৭ ৰ পৰা ১৪ লৈ"]], 0,
  "The usual scale runs from zero for a strong acid to fourteen for a strong base, with seven neutral.",
  "সাধাৰণ মাপক প্ৰবল এচিডৰ শূন্যৰপৰা প্ৰবল ক্ষাৰকৰ চৈদ্দলৈ, সাত প্ৰশান্ত।");

add("chemistry-224",
  "Antacids used for stomach trouble are",
  "পেটৰ অসুবিধাত ব্যৱহৃত এণ্টাএচিড হ'ল",
  [["mild bases", "মৃদু ক্ষাৰক"], ["strong acids", "প্ৰবল এচিড"], ["strong bases", "প্ৰবল ক্ষাৰক"], ["neutral salts only", "কেৱল প্ৰশান্ত লৱণ"]], 0,
  "Excess stomach acid is neutralised by a mild base such as magnesium hydroxide, which raises the pH without damaging tissue.",
  "অতিৰিক্ত পেটৰ এচিড মেগ্নেছিয়াম হাইড্ৰক্সাইডৰ দৰে মৃদু ক্ষাৰকে প্ৰশমিত কৰে, যি কলাৰ ক্ষতি নকৰাকৈ pH বঢ়ায়।");

/* ================= metals-nonmetals ================= */
useLeaf("metals-nonmetals");

add("chemistry-225",
  "Which gas is produced when a metal carbonate reacts with a dilute acid?",
  "ধাতৱীয় কাৰ্বনেটে লঘু এচিডৰ সৈতে বিক্ৰিয়া কৰিলে কোনটো গেছ ওলায়",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["hydrogen", "হাইড্ৰজেন"], ["oxygen", "অক্সিজেন"], ["sulphur dioxide", "ছালফাৰ ডাইঅক্সাইড"]], 0,
  "The carbonate ions combine with acid to release carbon dioxide, which turns limewater milky.",
  "কাৰ্বনেট আয়নে এচিডৰ সৈতে মিলি কাৰ্বন ডাইঅক্সাইড এৰে, যি চূণপানী ঘোলা কৰে।");

add("chemistry-226",
  "The chemical name of table salt is",
  "খোৱা লৱণৰ ৰাসায়নিক নাম",
  [["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium bicarbonate", "ছডিয়াম বাইকাৰ্বনেট"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["potassium nitrate", "পটাছিয়াম নাইট্ৰেট"]], 0,
  "Table salt is sodium chloride. Sodium bicarbonate is baking soda and calcium carbonate is limestone.",
  "খোৱা লৱণ ছডিয়াম ক্লৰাইড। ছডিয়াম বাইকাৰ্বনেট বেকিং ছডা আৰু কেল্ছিয়াম কাৰ্বনেট চূণশিল।");

add("chemistry-227",
  "Blue litmus paper turns red when dipped in",
  "নীলা লিটমাছ কাগজ তলিয়ালে ৰঙা হয়",
  [["lemon juice", "নেমুৰ ৰস"], ["soap solution", "চাবোনৰ দ্ৰৱ"], ["lime water", "চূণপানী"], ["sodium hydroxide solution", "ছডিয়াম হাইড্ৰক্সাইড দ্ৰৱ"]], 0,
  "Lemon juice contains citric acid and turns blue litmus red. The other three are alkaline.",
  "নেমুৰ ৰসত চিট্ৰিক এচিড থাকে আৰু নীলা লিটমাছ ৰঙা কৰে। বাকী তিনিটা ক্ষাৰীয়।");

add("chemistry-228",
  "The ion responsible for the acidic nature of an aqueous solution is",
  "জলীয় দ্ৰৱৰ এচিডীয় প্ৰকৃতিৰ বাবে দায়ী আয়নটো",
  [["hydrogen ion", "হাইড্ৰজেন আয়ন"], ["hydroxide ion", "হাইড্ৰক্সাইড আয়ন"], ["chloride ion", "ক্লৰাইড আয়ন"], ["sodium ion", "ছডিয়াম আয়ন"]], 0,
  "An acid raises the hydrogen ion concentration, and that excess makes the solution acidic.",
  "এচিডে হাইড্ৰজেন আয়ন ঘনত্ব বঢ়ায়, আৰু সেই অতিৰিক্ত অংশই দ্ৰৱক এচিডীয় কৰে।");

add("chemistry-229",
  "Which of the following salts is acidic in aqueous solution?",
  "তলৰ কোনটো লৱণ জলীয় দ্ৰৱত এচিডীয়",
  [["ammonium chloride", "এম'নিয়াম ক্লৰাইড"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium carbonate", "ছডিয়াম কাৰ্বনেট"], ["potassium nitrate", "পটাছিয়াম নাইট্ৰেট"]], 0,
  "Ammonium chloride is a salt of a weak base and a strong acid, so hydrolysis leaves the solution acidic.",
  "এম'নিয়াম ক্লৰাইড দুৰ্বল ক্ষাৰক আৰু প্ৰবল এচিডৰ লৱণ, সেয়ে জলবিভাজনে দ্ৰৱক এচিডীয় ৰাখে।");

add("chemistry-230",
  "The acid present in sour milk is",
  "টেঙা গাখীৰত থকা এচিডটো",
  [["lactic acid", "লেক্টিক এচিড"], ["citric acid", "চিট্ৰিক এচিড"], ["acetic acid", "এচিটিক এচিড"], ["tartaric acid", "টাৰ্টাৰিক এচিড"]], 0,
  "Bacteria ferment the lactose of milk to lactic acid, which sours it.",
  "বেক্টেৰিয়াই গাখীৰৰ লেক্টজক লেক্টিক এচিডলৈ সেঁচ কৰে, যি ইয়াক টেঙা কৰে।");

add("chemistry-231",
  "Which of the following is used as a preservative because it lowers the pH of food?",
  "তলৰ কোনটো খাদ্যৰ pH কমাই সংৰক্ষক হিচাপে ব্যৱহৃত হয়",
  [["vinegar", "ভিনেগাৰ"], ["baking soda", "বেকিং ছডা"], ["common salt only", "কেৱল সাধাৰণ লৱণ"], ["lime water", "চূণপানী"]], 0,
  "Vinegar is dilute acetic acid and the low pH stops many spoilage organisms from growing.",
  "ভিনেগাৰ লঘু এচিটিক এচিড আৰু কম pH এ বহু পচনকাৰী জীৱৰ বৃদ্ধি ৰোধ কৰে।");

add("chemistry-232",
  "The pH of a solution is 7 at 25 degrees Celsius. The solution is",
  "২৫ ডিগ্ৰী ছেলছিয়াছত দ্ৰৱ এটাৰ pH ৭। দ্ৰৱটো",
  [["neutral", "প্ৰশান্ত"], ["acidic", "এচিডীয়"], ["basic", "ক্ষাৰীয়"], ["strongly acidic", "প্ৰবল এচিডীয়"]], 0,
  "At 25 degrees the hydrogen and hydroxide ion concentrations are equal at a pH of seven.",
  "২৫ ডিগ্ৰীত pH সাতত হাইড্ৰজেন আৰু হাইড্ৰক্সাইড আয়ন ঘনত্ব সমান।");

add("chemistry-233",
  "The gas released when sodium bicarbonate reacts with citric acid is",
  "ছডিয়াম বাইকাৰ্বনেটে চিট্ৰিক এচিডৰ সৈতে বিক্ৰিয়া কৰিলে ওলোৱা গেছটো",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["hydrogen", "হাইড্ৰজেন"], ["oxygen", "অক্সিজেন"], ["chlorine", "ক্লৰিন"]], 0,
  "The bicarbonate and the acid give off carbon dioxide, which is the fizz in effervescent tablets.",
  "বাইকাৰ্বনেট আৰু এচিডে কাৰ্বন ডাইঅক্সাইড এৰে, যি বুৰবুৰণি টেবলেটৰ ফুৰফুৰণি।");

add("chemistry-234",
  "Which of the following will turn red litmus blue?",
  "তলৰ কোনটোৱে ৰঙা লিটমাছ নীলা কৰিব",
  [["sodium hydroxide solution", "ছডিয়াম হাইড্ৰক্সাইড দ্ৰৱ"], ["hydrochloric acid", "হাইড্ৰক্লৰিক এচিড"], ["lemon juice", "নেমুৰ ৰস"], ["carbonic acid", "কাৰ্বনিক এচিড"]], 0,
  "Only a base turns red litmus blue, and sodium hydroxide is a strong base.",
  "কেৱল ক্ষাৰকে ৰঙা লিটমাছ নীলা কৰে, আৰু ছডিয়াম হাইড্ৰক্সাইড প্ৰবল ক্ষাৰক।");

add("chemistry-235",
  "The salt obtained from the reaction of sulphuric acid with sodium hydroxide is",
  "ছালফিউৰিক এচিডৰ ছডিয়াম হাইড্ৰক্সাইডৰ সৈতে বিক্ৰিয়াৰপৰা পোৱা লৱণটো",
  [["sodium sulphate", "ছডিয়াম ছালফেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium nitrate", "ছডিয়াম নাইট্ৰেট"], ["sodium carbonate", "ছডিয়াম কাৰ্বনেট"]], 0,
  "Sulphuric acid supplies the sulphate ion, so sodium sulphate and water form.",
  "ছালফিউৰিক এচিডে ছালফেট আয়ন যোগায়, সেয়ে ছডিয়াম ছালফেট আৰু পানী গঠিত হয়।");

add("chemistry-236",
  "The substance that changes colour according to the pH of the solution is called",
  "দ্ৰৱৰ pH অনুসৰি ৰং সলনি কৰা পদাৰ্থটোক কি বোলা হয়",
  [["an indicator", "এটা সূচক"], ["a catalyst", "এটা অনুঘটক"], ["a solvent", "এটা দ্ৰাৱক"], ["a solute", "এটা দ্ৰাৱ্য"]], 0,
  "Indicators such as litmus and phenolphthalein have different colours in acid and alkali.",
  "লিটমাছ আৰু ফেনলফ্থেলিনৰ দৰে সূচকৰ এচিড আৰু ক্ষাৰকত বেলেগ ৰং থাকে।");

add("chemistry-237",
  "Which of the following is a natural indicator?",
  "তলৰ কোনটো প্ৰাকৃতিক সূচক",
  [["red cabbage extract", "ৰঙা বন্ধাকবিৰ ৰস"], ["methyl orange", "মিথাইল অৰেঞ্জ"], ["phenolphthalein", "ফেনলফ্থেলিন"], ["litmus paper", "লিটমাছ কাগজ"]], 0,
  "Red cabbage extract is a plant pigment that shifts colour with pH. Methyl orange and phenolphthalein are synthetic.",
  "ৰঙা বন্ধাকবিৰ ৰস উদ্ভিদ ৰঞ্জক যি pH সৈতে ৰং সলায়। মিথাইল অৰেঞ্জ আৰু ফেনলফ্থেলিন কৃত্ৰিম।");

add("chemistry-238",
  "The metal that reacts with cold water to give hydrogen is",
  "ঠাণ্ডা পানীৰ সৈতে বিক্ৰিয়া কৰি হাইড্ৰজেন দিয়া ধাতুটো",
  [["sodium", "ছডিয়াম"], ["copper", "তাম"], ["gold", "সোণ"], ["silver", "ৰূপ"]], 0,
  "Sodium is so reactive that cold water gives hydrogen and sodium hydroxide. Copper, gold and silver do not react with water.",
  "ছডিয়াম ইমান সক্ৰিয় যে ঠাণ্ডা পানীয়ে হাইড্ৰজেন আৰু ছডিয়াম হাইড্ৰক্সাইড দিয়ে। তাম, সোণ আৰু ৰূপে পানীৰ সৈতে বিক্ৰিয়া নকৰে।");

add("chemistry-239",
  "Which of the following is the least reactive metal?",
  "তলৰ কোনটো আটাই কম সক্ৰিয় ধাতু",
  [["gold", "সোণ"], ["sodium", "ছডিয়াম"], ["zinc", "জিঙ্ক"], ["iron", "লো"]], 0,
  "Gold sits at the bottom of the reactivity series and stays unchanged in air and water. Sodium is at the top.",
  "সোণ সক্ৰিয়তা শ্ৰেণীত আটাই তলত আৰু বায়ু তথা পানীত অপৰিৱৰ্তিত থাকে। ছডিয়াম আটাই ওপৰত।");

add("chemistry-240",
  "The non-metal that is a good conductor of electricity is",
  "বিদ্যুৎৰ ভাল পৰিবাহী অধাতুটো",
  [["graphite", "গ্ৰেফাইট"], ["sulphur", "ছালফাৰ"], ["phosphorus", "ফছফৰাছ"], ["iodine", "আয়ডিন"]], 0,
  "Graphite is a form of carbon with delocalised electrons, so it conducts. Sulphur, phosphorus and iodine do not.",
  "গ্ৰেফাইট কাৰ্বনৰ এটা ৰূপ যাৰ ইলেক্ট্ৰন মুক্ত, সেয়ে ই পৰিবহন কৰে। ছালফাৰ, ফছফৰাছ আৰু আয়ডিনে নকৰে।");

add("chemistry-241",
  "Which of the following is used as a reducing agent in the extraction of iron from haematite?",
  "হিমেটাইটৰপৰা লো উলিয়াওঁতে বিজাৰক হিচাপে কি ব্যৱহৃত হয়",
  [["carbon monoxide", "কাৰ্বন মন'ক্সাইড"], ["oxygen", "অক্সিজেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["nitrogen", "নাইট্ৰজেন"]], 0,
  "Carbon monoxide formed in the blast furnace reduces iron oxide to iron. Oxygen and carbon dioxide would oxidise rather than reduce.",
  "ব্লাষ্ট ফাৰ্ণেছত গঠিত কাৰ্বন মন'ক্সাইডে লো অক্সাইডক লোলৈ বিজাৰিত কৰে। অক্সিজেন আৰু কাৰ্বন ডাইঅক্সাইডে বিজাৰিত নকৰি জাৰিত কৰে।");

add("chemistry-242",
  "The property by which a metal can be beaten into thin sheets is called",
  "ধাতু এটাক পাতল চাদ হিচাপে পিটিব পৰা ধৰ্মটোক কি বোলা হয়",
  [["malleability", "নমনশীলতা"], ["ductility", "তাৰকশীলতা"], ["sonority", "ধ্বনিশীলতা"], ["lustre", "দীপ্তি"]], 0,
  "Malleability is the ability to be hammered into sheets, while ductility is the ability to be drawn into wires.",
  "নমনশীলতা হ'ল চাদ হিচাপে পিটিব পৰা ক্ষমতা, আনহাতে তাৰকশীলতা হ'ল তাঁৰলৈ টানিব পৰা ক্ষমতা।");

add("chemistry-243",
  "Which of the following non-metals is stored under water?",
  "তলৰ কোনটো অধাতু পানীত সাঁচি ৰখা হয়",
  [["phosphorus", "ফছফৰাছ"], ["sulphur", "ছালফাৰ"], ["carbon", "কাৰ্বন"], ["iodine", "আয়ডিন"]], 0,
  "White phosphorus catches fire in air at about thirty degrees, so it is kept under water to exclude oxygen.",
  "শ্বেত ফছফৰাছে প্ৰায় ত্ৰিছ ডিগ্ৰীত বায়ুত জ্বলি উঠে, সেয়ে অক্সিজেন আঁতৰাবলৈ পানীত ৰখা হয়।");

add("chemistry-244",
  "An alloy of iron with chromium and nickel is",
  "ক্ৰমিয়াম আৰু নিকেলৰ সৈতে লোৰ মিশ্ৰধাতুটো",
  [["stainless steel", "ষ্টেইনলেছ ষ্টীল"], ["brass", "পিতল"], ["bronze", "ব্ৰঞ্জ"], ["solder", "ছল্ডাৰ"]], 0,
  "Stainless steel contains iron with chromium and nickel, and the chromium oxide layer resists rust. Brass is copper and zinc.",
  "ষ্টেইনলেছ ষ্টীলত ক্ৰমিয়াম আৰু নিকেলৰ সৈতে লো থাকে, আৰু ক্ৰমিয়াম অক্সাইড স্তৰে মামৰ ৰোধ কৰে। পিতল তাম আৰু জিঙ্ক।");

add("chemistry-245",
  "The metal used in galvanising iron is",
  "লোত গেলভানাইজিং কৰাত ব্যৱহৃত ধাতুটো",
  [["zinc", "জিঙ্ক"], ["copper", "তাম"], ["tin", "টিন"], ["lead", "ছীহ"]], 0,
  "Galvanising coats iron with zinc, and the zinc corrodes first, protecting the iron beneath.",
  "গেলভানাইজিঙত লোৰ ওপৰত জিঙ্কৰ আৱৰণ দিয়া হয়, আৰু জিঙ্কে প্ৰথমে ক্ষয় হৈ তলৰ লো ৰক্ষা কৰে।");

add("chemistry-246",
  "Which of the following is a non-metal that exists as a liquid at room temperature?",
  "তলৰ কোনটো কোঠাৰী তাপত জুলীয়া অৱস্থাত থকা অধাতু",
  [["bromine", "ব্ৰমিন"], ["mercury", "মাৰ্কাৰি"], ["iodine", "আয়ডিন"], ["chlorine", "ক্লৰিন"]], 0,
  "Bromine is the only non-metal that is liquid at room temperature. Mercury is liquid but is a metal.",
  "ব্ৰমিনেই একমাত্ৰ অধাতু যি কোঠাৰী তাপত জুলীয়া। মাৰ্কাৰি জুলীয়া কিন্তু ধাতু।");

add("chemistry-247",
  "Rusting of iron requires",
  "লোত মামৰ লাগিবলৈ কি প্ৰয়োজন",
  [["both oxygen and water", "অক্সিজেন আৰু পানী দুয়োটা"], ["oxygen only", "কেৱল অক্সিজেন"], ["water only", "কেৱল পানী"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"]], 0,
  "Iron rusts only when both moist air and water are present, which is why dry air or a coat of paint prevents it.",
  "লোত মামৰ তেতিয়াহে লাগে যেতিয়া সিক্ত বায়ু আৰু পানী দুয়োটা থাকে, সেয়ে শুকান বায়ু বা ৰঙৰ আৱৰণে ৰোধ কৰে।");

add("chemistry-248",
  "The most abundant metal in the earth's crust is",
  "পৃথিৱীৰ ভূত্বকত আটাই বেছি থকা ধাতুটো",
  [["aluminium", "এলুমিনিয়াম"], ["iron", "লো"], ["copper", "তাম"], ["zinc", "জিঙ্ক"]], 0,
  "Aluminium makes up about eight percent of the crust, ahead of iron. Copper and zinc are far less common.",
  "এলুমিনিয়ামে ভূত্বকৰ প্ৰায় আঠ শতাংশ, লোতকৈও বেছি। তাম আৰু জিঙ্ক বহু কম।");

/* ================= organic-chemistry ================= */
useLeaf("organic-chemistry");

add("chemistry-249",
  "The hybridisation of each carbon atom in a molecule of ethyne is",
  "ইথাইন অণুত প্ৰতিটো কাৰ্বন পৰমাণুৰ সংকৰণ",
  [["sp", "sp"], ["sp2", "sp২"], ["sp3", "sp৩"], ["sp3d", "sp৩d"]], 0,
  "Ethyne has a triple bond and each carbon uses two hybrid orbitals, so the hybridisation is sp. Ethene is sp2 and ethane sp3.",
  "ইথাইনত তিনি বন্ধন আৰু প্ৰতিটো কাৰ্বনে দুটা সংকৰ অৰ্বিটেল ব্যৱহাৰ কৰে, সেয়ে সংকৰণ sp। ইথিন sp২ আৰু ইথেন sp৩।");

add("chemistry-250",
  "The IUPAC name of the compound with formula CH3CHO is",
  "CH3CHO সূত্ৰযুক্ত যৌগৰ IUPAC নাম",
  [["ethanal", "ইথানেল"], ["ethanol", "ইথানল"], ["ethanoic acid", "ইথানইক এচিড"], ["ethene", "ইথিন"]], 0,
  "Two carbons with an aldehyde group give ethanal. Ethanol carries a hydroxyl group and ethanoic acid a carboxyl group.",
  "এলডিহাইড গোটযুক্ত দুটা কাৰ্বনে ইথানেল দিয়ে। ইথানলত হাইড্ৰক্সিল গোট আৰু ইথানইক এচিডত কাৰ্বক্সিল গোট থাকে।");

add("chemistry-251",
  "Which of the following is an aldehyde?",
  "তলৰ কোনটো এলডিহাইড",
  [["formaldehyde", "ফৰ্মেলডিহাইড"], ["acetone", "এচিটোন"], ["ethanol", "ইথানল"], ["benzene", "বেঞ্জিন"]], 0,
  "Formaldehyde carries the CHO group, which is the aldehyde function. Acetone is a ketone, ethanol an alcohol and benzene an aromatic hydrocarbon.",
  "ফৰ্মেলডিহাইডত CHO গোট থাকে, যি এলডিহাইড কাৰ্যকৰী গোট। এচিটোন কিটোন, ইথানল এলকহল আৰু বেঞ্জিন সুগন্ধি হাইড্ৰকাৰ্বন।");

add("chemistry-252",
  "The reaction in which an alcohol is converted to an alkene by removal of water is called",
  "পানী আঁতৰাই এলকহলক এলকিনলৈ ৰূপান্তৰ কৰা বিক্ৰিয়াক কি বোলা হয়",
  [["dehydration", "নিৰ্জলীকৰণ"], ["hydration", "জলীকৰণ"], ["hydrogenation", "হাইড্ৰজিনীকৰণ"], ["oxidation", "জাৰণ"]], 0,
  "Dehydration removes water, usually with hot concentrated sulphuric acid, leaving a double bond. Hydration is the reverse.",
  "নিৰ্জলীকৰণে পানী আঁতৰায়, সাধাৰণতে গৰম ঘন ছালফিউৰিক এচিডৰে, আৰু দ্বৈত বন্ধন এৰি দিয়ে। জলীকৰণ ইয়াৰ ওলোটা।");

add("chemistry-253",
  "The compound formed when ethanol is oxidised by acidified potassium dichromate is",
  "অ্যাসিডযুক্ত পটাছিয়াম ডাইক্ৰমেটেৰে ইথানল জাৰিত হ'লে গঠিত যৌগটো",
  [["ethanoic acid", "ইথানইক এচিড"], ["ethene", "ইথিন"], ["methane", "মিথেন"], ["ethyl ethanoate", "ইথাইল ইথানয়েট"]], 0,
  "Strong oxidation carries ethanol past ethanal to ethanoic acid. A mild oxidising agent stops at the aldehyde stage.",
  "প্ৰবল জাৰণে ইথানলক ইথানেলৰ পাৰ হৈ ইথানইক এচিডলৈ লৈ যায়। দুৰ্বল জাৰকে এলডিহাইড স্তৰত ৰখায়।");

add("chemistry-254",
  "Functional isomers with the same molecular formula but different functional groups are called",
  "একেই আণৱিক সূত্ৰ কিন্তু বেলেগ কাৰ্যকৰী গোট থকা সমাণুক কি বোলা হয়",
  [["functional isomers", "কাৰ্যকৰী সমাণু"], ["chain isomers", "শৃংখল সমাণু"], ["position isomers", "স্থান সমাণু"], ["geometric isomers", "জ্যামিতিক সমাণু"]], 0,
  "Ethanol and dimethyl ether share the formula C2H6O but hold different functional groups, so they are functional isomers.",
  "ইথানল আৰু ডাইমিথাইল ইথাৰৰ সূত্ৰ C2H6O একেই কিন্তু কাৰ্যকৰী গোট বেলেগ, সেয়ে তেওঁলোক কাৰ্যকৰী সমাণু।");

add("chemistry-255",
  "The gas produced when ethanol is heated with sodium metal is",
  "ইথানলক ছডিয়াম ধাতুৰ সৈতে গৰম কৰিলে ওলোৱা গেছটো",
  [["hydrogen", "হাইড্ৰজেন"], ["oxygen", "অক্সিজেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["ethane", "ইথেন"]], 0,
  "Sodium displaces the hydrogen of the hydroxyl group, giving sodium ethoxide and hydrogen gas, which burns with a pop.",
  "ছডিয়ামে হাইড্ৰক্সিল গোটৰ হাইড্ৰজেন আঁতৰাই ছডিয়াম ইথক্সাইড আৰু হাইড্ৰজেন গেছ দিয়ে, যি পপ শব্দেৰে জ্বলে।");

add("chemistry-256",
  "The compound known as acetic acid is",
  "এচিটিক এচিড বুলি জনা যৌগটো",
  [["ethanoic acid", "ইথানইক এচিড"], ["formic acid", "ফৰ্মিক এচিড"], ["propanoic acid", "প্ৰপানইক এচিড"], ["butanoic acid", "বিউটানইক এচিড"]], 0,
  "Acetic acid is ethanoic acid, CH3COOH, the acid of vinegar. Formic acid has only one carbon.",
  "এচিটিক এচিড ইথানইক এচিড, CH3COOH, ভিনেগাৰৰ এচিড। ফৰ্মিক এচিডত কেবল এটা কাৰ্বন।");

add("chemistry-257",
  "Which of the following decolourises bromine water?",
  "তলৰ কোনটোৱে ব্ৰমিন পানীৰ ৰং নাইকিয়া কৰে",
  [["ethene", "ইথিন"], ["ethane", "ইথেন"], ["methane", "মিথেন"], ["propane", "প্ৰপেন"]], 0,
  "The double bond of ethene adds bromine, so the orange colour disappears. Saturated alkanes do not react this way.",
  "ইথিনৰ দ্বৈত বন্ধনে ব্ৰমিন যোগ কৰে, সেয়ে কমলা ৰং নাইকিয়া হয়। সম্পৃক্ত এলকেনে এইদৰে বিক্ৰিয়া নকৰে।");

add("chemistry-258",
  "The number of structural isomers of butane is",
  "বিউটেনৰ গাঠনিক সমাণুৰ সংখ্যা",
  [["2", "২"], ["1", "১"], ["3", "৩"], ["4", "৪"]], 0,
  "Butane has a straight chain and a branched form, so two isomers. Propane has only one structure.",
  "বিউটেনৰ এটা সৰল শৃংখল আৰু এটা শাখাযুক্ত ৰূপ, সেয়ে দুটা সমাণু। প্ৰপেনৰ কেবল এটা গঠন।");

add("chemistry-259",
  "Soap is chemically a",
  "চাবোন ৰাসায়নিকভাৱে কি",
  [["sodium salt of a fatty acid", "চৰ্বি অ্যাসিডৰ ছডিয়াম লৱণ"], ["calcium salt of a fatty acid", "চৰ্বি অ্যাসিডৰ কেল্ছিয়াম লৱণ"], ["ester of glycerol", "গ্লিচেৰলৰ এষ্টাৰ"], ["long chain alcohol", "দীঘল শৃংখল এলকহল"]], 0,
  "Soap is the sodium or potassium salt of a long chain fatty acid, made by boiling fat with alkali. Glycerol esters are the fats themselves.",
  "চাবোন দীঘল শৃংখল চৰ্বি অ্যাসিডৰ ছডিয়াম বা পটাছিয়াম লৱণ, যি চৰ্বি ক্ষাৰকৰ সৈতে উতলাই বনোৱা হয়। গ্লিচেৰল এষ্টাৰ নিজেই চৰ্বি।");

add("chemistry-260",
  "Which of the following is a ketone?",
  "তলৰ কোনটো কিটোন",
  [["propanone", "প্ৰপান'ন"], ["ethanal", "ইথানেল"], ["methanoic acid", "মিথানইক এচিড"], ["ethanol", "ইথানল"]], 0,
  "Propanone, the acetone of nail polish remover, has a carbonyl group between two carbons. Ethanal is an aldehyde.",
  "প্ৰপান'ন, নখ পৰিষ্কাৰকৰ এচিটোন, ত দুটা কাৰ্বনৰ মাজত কাৰ্বনিল গোট থাকে। ইথানেল এলডিহাইড।");

/* ================= polymers-materials ================= */
useLeaf("polymers-materials");

add("chemistry-261",
  "The monomer of polyvinyl chloride is",
  "পলিভিনাইল ক্লৰাইডৰ একক অণুটো",
  [["vinyl chloride", "ভিনাইল ক্লৰাইড"], ["ethylene", "ইথিলিন"], ["styrene", "ষ্টাইৰিন"], ["propylene", "প্ৰপিলিন"]], 0,
  "Vinyl chloride polymerises to PVC, which is used for pipes and cable insulation. Ethylene gives polythene and styrene polystyrene.",
  "ভিনাইল ক্লৰাইড পলিমাৰ হৈ PVC দিয়ে, যি পাইপ আৰু তাঁৰৰ আৱৰণত ব্যৱহৃত। ইথিলিনে পলিথিন আৰু ষ্টাইৰিনে পলিষ্টাইৰিন।");

add("chemistry-262",
  "Bakelite is an example of a",
  "বেকেলাইট কিৰ উদাহৰণ",
  [["thermosetting plastic", "তাপকাঠিন্য প্লাষ্টিক"], ["thermoplastic", "তাপনমনীয় প্লাষ্টিক"], ["natural fibre", "প্ৰাকৃতিক আঁহ"], ["elastomer", "স্থিতিস্থাপক"]], 0,
  "Bakelite sets permanently on heating and cannot be remoulded, which is the thermosetting behaviour. Thermoplastics soften each time.",
  "বেকেলাইট গৰম কৰিলে স্থায়ীভাৱে কঠিন হয় আৰু পুনৰ ছাঁচত ঢালিব নোৱাৰি, যি তাপকাঠিন্য আচৰণ। তাপনমনীয় প্লাষ্টিক প্ৰতিবাৰ নৰম হয়।");

add("chemistry-263",
  "Silk and wool are both examples of",
  "ৰেচম আৰু ঊণ দুয়োটা কিৰ উদাহৰণ",
  [["natural protein fibres", "প্ৰাকৃতিক প্ৰ'টিন আঁহ"], ["synthetic polyamides", "কৃত্ৰিম পলিঅ্যামাইড"], ["regenerated cellulose", "পুনৰ্জীৱিত চেলুল'জ"], ["polyesters", "পলিয়েষ্টাৰ"]], 0,
  "Both silk and wool are built from amino acid chains, so they are natural protein fibres. Nylon is a synthetic polyamide and rayon regenerated cellulose.",
  "ৰেচম আৰু ঊণ দুয়োটা এমিন' অ্যাসিড শৃংখলৰপৰা গঠিত, সেয়ে প্ৰাকৃতিক প্ৰ'টিন আঁহ। নাইলন কৃত্ৰিম পলিঅ্যামাইড আৰু ৰেয়ন পুনৰ্জীৱিত চেলুল'জ।");

add("chemistry-264",
  "The polymer used in making non-stick cookware is",
  "অ-লাগি ৰন্ধন পাত্ৰত ব্যৱহৃত পলিমাৰটো",
  [["Teflon", "টেফলন"], ["nylon", "নাইলন"], ["bakelite", "বেকেলাইট"], ["polyester", "পলিয়েষ্টাৰ"]], 0,
  "Teflon, or polytetrafluoroethylene, is chemically inert and slippery, so food does not stick. Nylon is a fibre and bakelite a hard plastic.",
  "টেফলন, বা পলিটেট্ৰাফ্লুঅ'ৰ'ইথিলিন, ৰাসায়নিকভাৱে নিষ্ক্ৰিয় আৰু পিছল, সেয়ে খাদ্য নালাগে। নাইলন আঁহ আৰু বেকেলাইট কঠিন প্লাষ্টিক।");

add("chemistry-265",
  "Nylon is a polymer formed by the condensation of",
  "নাইলন কিৰ ঘনীভৱনৰপৰা গঠিত পলিমাৰ",
  [["a diamine and a dicarboxylic acid", "ডাইএমিন আৰু ডাইকাৰ্বক্সিলিক এচিড"], ["two alkenes", "দুটা এলকিন"], ["glucose units", "গ্লুক'জ একক"], ["styrene units", "ষ্টাইৰিন একক"]], 0,
  "Hexamethylenediamine and adipic acid condense with loss of water to give nylon 6,6. Alkenes add rather than condense.",
  "হেক্সামিথাইলিনডাইএমিন আৰু এডিপিক এচিডে পানী হেৰুৱাই ঘনীভূত হৈ নাইলন ৬,৬ দিয়ে। এলকিনে ঘনীভূত নহয়, যোগ দিয়ে।");

add("chemistry-266",
  "The process of vulcanisation of rubber involves heating it with",
  "ৰবৰৰ ভালকেনাইজেশ্যনত কিৰ সৈতে গৰম কৰা হয়",
  [["sulphur", "ছালফাৰ"], ["oxygen", "অক্সিজেন"], ["nitrogen", "নাইট্ৰজেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"]], 0,
  "Sulphur forms cross links between the rubber chains, making the rubber harder and more elastic. Oxygen would degrade it.",
  "ছালফাৰে ৰবৰৰ শৃংখলৰ মাজত আন্তঃসংযোগ গঢ়ে, যিয়ে ৰবৰক কঠিন আৰু বেছি স্থিতিস্থাপক কৰে। অক্সিজেনে ইয়াক নষ্ট কৰিব।");

add("chemistry-267",
  "Which of the following plastics is used for making water pipes and buckets?",
  "তলৰ কোনটো প্লাষ্টিক পানীৰ পাইপ আৰু বাল্টি বনোত ব্যৱহৃত হয়",
  [["PVC", "PVC"], ["bakelite", "বেকেলাইট"], ["melamine", "মেলামিন"], ["Teflon", "টেফলন"]], 0,
  "PVC is cheap, rigid and resistant to water, so it suits pipes and buckets. Bakelite is used for electrical fittings and melamine for crockery.",
  "PVC সস্তা, কঠিন আৰু পানী প্ৰতিৰোধী, সেয়ে পাইপ আৰু বাল্টিত উপযুক্ত। বেকেলাইট বিদ্যুৎ সামগ্ৰী আৰু মেলামিন বাচনত ব্যৱহৃত।");

add("chemistry-268",
  "The small repeating unit from which a polymer is built is called a",
  "পলিমাৰ গঢ়া সৰু পুনৰাবৃত্ত এককটোক কি বোলা হয়",
  [["monomer", "একক অণু"], ["dimer", "দ্বিঅণু"], ["isomer", "সমাণু"], ["oligomer only", "কেৱল অলিগ'মাৰ"]], 0,
  "Monomers join end to end to form the long polymer chain. A dimer is only two units and an isomer is a different arrangement.",
  "একক অণুবোৰে মূৰে-মূৰে যোগ হৈ দীঘল পলিমাৰ শৃংখল গঢ়ে। দ্বিঅণুত কেবল দুটা একক আৰু সমাণু এটা বেলেগ সজ্জা।");

add("chemistry-269",
  "Rayon is also known as",
  "ৰেয়নক আন কি নামেৰে জনা যায়",
  [["artificial silk", "কৃত্ৰিম ৰেচম"], ["artificial wool", "কৃত্ৰিম ঊণ"], ["synthetic rubber", "কৃত্ৰিম ৰবৰ"], ["natural silk", "প্ৰাকৃতিক ৰেচম"]], 0,
  "Rayon is regenerated cellulose spun into fibres that look like silk, hence artificial silk. It is not a true synthetic polymer.",
  "ৰেয়ন পুনৰ্জীৱিত চেলুল'জৰপৰা ৰেচমৰ দৰে আঁহলৈ কটা হয়, সেয়ে কৃত্ৰিম ৰেচম। ই প্ৰকৃত কৃত্ৰিম পলিমাৰ নহয়।");

add("chemistry-270",
  "Which of the following plastics is used to make unbreakable crockery?",
  "তলৰ কোনটো প্লাষ্টিক ভাঙিব নোৱাৰা বাচন বনোৱাত ব্যৱহৃত হয়",
  [["melamine", "মেলামিন"], ["polythene", "পলিথিন"], ["PVC", "PVC"], ["polystyrene", "পলিষ্টাইৰিন"]], 0,
  "Melamine resin is hard, heat resistant and shatterproof, so it is moulded into plates and cups. Polythene would soften with hot food.",
  "মেলামিন ৰেজিন কঠিন, তাপ প্ৰতিৰোধী আৰু নাভঙা, সেয়ে প্লেট আৰু কাপলৈ ঢলা হয়। পলিথিন গৰম খাদ্যত নৰম হ'ব।");

add("chemistry-271",
  "The polymer used to make disposable cups and packing material is",
  "এবাৰ ব্যৱহাৰ্য কাপ আৰু পেকিং সামগ্ৰীত ব্যৱহৃত পলিমাৰটো",
  [["polystyrene", "পলিষ্টাইৰিন"], ["bakelite", "বেকেলাইট"], ["nylon", "নাইলন"], ["rayon", "ৰেয়ন"]], 0,
  "Expanded polystyrene is light and a poor conductor of heat, so it suits cups and packing. Bakelite is hard and nylon is a fibre.",
  "প্ৰসাৰিত পলিষ্টাইৰিন পাতল আৰু তাপৰ কুপৰিবাহী, সেয়ে কাপ আৰু পেকিঙত উপযুক্ত। বেকেলাইট কঠিন আৰু নাইলন আঁহ।");

add("chemistry-272",
  "Natural rubber is a polymer of",
  "প্ৰাকৃতিক ৰবৰ কিৰ পলিমাৰ",
  [["isoprene", "আইছ'প্ৰিন"], ["ethylene", "ইথিলিন"], ["styrene", "ষ্টাইৰিন"], ["vinyl chloride", "ভিনাইল ক্লৰাইড"]], 0,
  "Natural rubber is cis-polyisoprene tapped from the rubber tree. Ethylene, styrene and vinyl chloride give synthetic plastics.",
  "প্ৰাকৃতিক ৰবৰ চিছ-পলিআইছ'প্ৰিন, যি ৰবৰ গছৰপৰা সংগ্ৰহ কৰা হয়। ইথিলিন, ষ্টাইৰিন আৰু ভিনাইল ক্লৰাইডে কৃত্ৰিম প্লাষ্টিক দিয়ে।");

add("chemistry-273",
  "Which of the following is a biodegradable polymer?",
  "তলৰ কোনটো জৈৱ-বিয়োজনীয় পলিমাৰ",
  [["starch", "ষ্টাৰ্চ"], ["polythene", "পলিথিন"], ["PVC", "PVC"], ["bakelite", "বেকেলাইট"]], 0,
  "Starch is broken down by microorganisms, so it is biodegradable. Polythene, PVC and bakelite resist decay and persist in the environment.",
  "ষ্টাৰ্চ অণুজীৱে ভাঙি দিয়ে, সেয়ে ই জৈৱ-বিয়োজনীয়। পলিথিন, PVC আৰু বেকেলাইট পচন ৰোধ কৰি পৰিৱেশত থাকি যায়।");

add("chemistry-274",
  "The plastic used for making electrical switches because it is a good insulator and does not melt is",
  "ভাল অন্তৰোধক আৰু নগলা বাবে বিদ্যুৎ চুইচত ব্যৱহৃত প্লাষ্টিকটো",
  [["bakelite", "বেকেলাইট"], ["polythene", "পলিথিন"], ["PVC", "PVC"], ["polystyrene", "পলিষ্টাইৰিন"]], 0,
  "Bakelite withstands heat without deforming and insulates, which is why switches and plug bodies are made from it. Polythene would soften.",
  "বেকেলাইটে বিকৃত নোহোৱাকৈ তাপ সহ্য কৰে আৰু অন্তৰোধ কৰে, সেয়ে চুইচ আৰু প্লাগৰ গাত ব্যৱহৃত। পলিথিন নৰম হ'ব।");

add("chemistry-275",
  "Which of the following fibres is a polyester?",
  "তলৰ কোনটো আঁহ পলিয়েষ্টাৰ",
  [["terylene", "টাৰিলিন"], ["nylon", "নাইলন"], ["rayon", "ৰেয়ন"], ["cotton", "কপাহ"]], 0,
  "Terylene is a polyester made from ethylene glycol and terephthalic acid. Nylon is a polyamide and cotton a natural fibre.",
  "টাৰিলিন ইথিলিন গ্লাইক'ল আৰু টেৰিফথেলিক এচিডৰপৰা বনোৱা পলিয়েষ্টাৰ। নাইলন পলিঅ্যামাইড আৰু কপাহ প্ৰাকৃতিক আঁহ।");

add("chemistry-276",
  "Which of the following is used to make bulletproof glass?",
  "তলৰ কোনটো বুলেটপ্ৰুফ গ্লাছ বনোৱাত ব্যৱহৃত হয়",
  [["polycarbonate", "পলিকাৰ্বনেট"], ["polystyrene", "পলিষ্টাইৰিন"], ["bakelite", "বেকেলাইট"], ["melamine", "মেলামিন"]], 0,
  "Polycarbonate is tough and transparent, so layers of it bonded to glass stop a projectile. Polystyrene is brittle and bakelite opaque.",
  "পলিকাৰ্বনেট কঠিন আৰু স্বচ্ছ, সেয়ে ইয়াৰ স্তৰ গ্লাছৰ সৈতে জোৰা লগাই গুলি ৰোধ কৰে। পলিষ্টাইৰিন ভংগুৰ আৰু বেকেলাইট অস্বচ্ছ।");

add("chemistry-277",
  "The main disadvantage of synthetic plastics in the environment is that they are",
  "পৰিৱেশত কৃত্ৰিম প্লাষ্টিকৰ মূল অসুবিধা কি",
  [["non-biodegradable", "জৈৱ-বিয়োজনীয় নহয়"], ["too cheap", "অতি সস্তা"], ["too light", "অতি পাতল"], ["good insulators", "ভাল অন্তৰোধক"]], 0,
  "Most synthetic plastics are not broken down by microbes, so they accumulate as waste for centuries. Being cheap or light is not a drawback.",
  "বেছিভাগ কৃত্ৰিম প্লাষ্টিক অণুজীৱে নাভাঙে, সেয়ে শতিকাজুৰি বৰ্জন হিচাপে জমা হয়। সস্তা বা পাতল হোৱা অসুবিধা নহয়।");

add("chemistry-278",
  "The polymer used in making synthetic fibre for sarees and shirts is",
  "চাদৰ আৰু চাৰ্টৰ কৃত্ৰিম আঁহত ব্যৱহৃত পলিমাৰটো",
  [["polyester", "পলিয়েষ্টাৰ"], ["bakelite", "বেকেলাইট"], ["Teflon", "টেফলন"], ["melamine", "মেলামিন"]], 0,
  "Polyester fibres such as terylene are woven into crease-resistant cloth. Bakelite, Teflon and melamine are not textile fibres.",
  "টাৰিলিনৰ দৰে পলিয়েষ্টাৰ আঁহ কুঁচি-প্ৰতিৰোধী কাপোৰলৈ বৈ লোৱা হয়। বেকেলাইট, টেফলন আৰু মেলামিন বস্ত্ৰ আঁহ নহয়।");

add("chemistry-279",
  "The number of monomer units joined in a polymer is usually",
  "পলিমাৰত জোৰা লগা একক অণুৰ সংখ্যা সাধাৰণতে",
  [["very large, often thousands", "অতি বেছি, প্ৰায়ে হাজাৰ"], ["exactly two", "ঠিক দুটা"], ["always three", "সদায় তিনি"], ["always ten", "সদায় দহ"]], 0,
  "A polymer needs a very long chain, often thousands of units, to show its characteristic properties. Two units make only a dimer.",
  "পলিমাৰে নিজৰ বৈশিষ্ট্য দেখুৱাবলৈ অতি দীঘল শৃংখল, প্ৰায়ে হাজাৰ হাজাৰ একক লাগে। দুটা এককে কেবল দ্বিঅণু দিয়ে।");

add("chemistry-280",
  "Which of the following is a copolymer?",
  "তলৰ কোনটো সহপলিমাৰ",
  [["nylon 6,6", "নাইলন ৬,৬"], ["polythene", "পলিথিন"], ["PVC", "PVC"], ["polystyrene", "পলিষ্টাইৰিন"]], 0,
  "Nylon 6,6 is built from two different monomers, diamine and diacid, so it is a copolymer. The other three use a single monomer.",
  "নাইলন ৬,৬ দুটা বেলেগ একক অণু, ডাইএমিন আৰু ডাইএচিডৰপৰা গঠিত, সেয়ে ই সহপলিমাৰ। বাকী তিনিটাত এটাই একক অণু।");

/* ================= fuels-combustion ================= */
useLeaf("fuels-combustion");

add("chemistry-281",
  "The calorific value of a fuel is the heat produced when",
  "ইন্ধনৰ কেলৰিফিক মূল্য হ'ল যেতিয়া উৎপন্ন তাপ",
  [["one gram of it is completely burnt", "ইয়াৰ এক গ্ৰাম সম্পূৰ্ণ জ্বলোৱা হয়"], ["one gram of it is partly burnt", "ইয়াৰ এক গ্ৰাম আংশিক জ্বলোৱা হয়"], ["it is cooled", "ইয়াক ঠাণ্ডা কৰা হয়"], ["it is mixed with water", "ইয়াক পানীৰ সৈতে মিহলোৱা হয়"]], 0,
  "Calorific value is measured in kilojoules per gram for complete combustion. Partial burning would release less heat and vary.",
  "কেলৰিফিক মূল্য সম্পূৰ্ণ দহনৰ বাবে প্ৰতি গ্ৰাম কিলজুলত মাপা হয়। আংশিক দহনে কম তাপ দিব আৰু বেলেগ বেলেগ হ'ব।");

add("chemistry-282",
  "Which of the following fuels has the highest calorific value?",
  "তলৰ কোনটো ইন্ধনৰ কেলৰিফিক মূল্য আটাই বেছি",
  [["hydrogen", "হাইড্ৰজেন"], ["coal", "কয়লা"], ["wood", "কাঠ"], ["kerosene", "কেৰ'ছিন"]], 0,
  "Hydrogen releases about one hundred and fifty kilojoules per gram, far more than coal or wood, which is why it is called a future fuel.",
  "হাইড্ৰজেনে প্ৰতি গ্ৰাম প্ৰায় এশ পঞ্চাশ কিলজুল এৰে, কয়লা বা কাঠতকৈ বহু বেছি, সেয়ে ইয়াক ভৱিষ্যতৰ ইন্ধন বোলে।");

add("chemistry-283",
  "The chief product of complete combustion of a hydrocarbon is",
  "হাইড্ৰকাৰ্বনৰ সম্পূৰ্ণ দহনৰ মূল উৎপাদ কি",
  [["carbon dioxide and water", "কাৰ্বন ডাইঅক্সাইড আৰু পানী"], ["carbon monoxide and water", "কাৰ্বন মন'ক্সাইড আৰু পানী"], ["carbon and hydrogen", "কাৰ্বন আৰু হাইড্ৰজেন"], ["only carbon dioxide", "কেৱল কাৰ্বন ডাইঅক্সাইড"]], 0,
  "Complete combustion with plenty of oxygen gives carbon dioxide and water vapour. Carbon monoxide forms when oxygen is short.",
  "প্ৰচুৰ অক্সিজেনৰ সৈতে সম্পূৰ্ণ দহনে কাৰ্বন ডাইঅক্সাইড আৰু পানীৰ ভাপ দিয়ে। অক্সিজেন কম হ'লে কাৰ্বন মন'ক্সাইড হয়।");

add("chemistry-284",
  "Carbon monoxide is dangerous because it",
  "কাৰ্বন মন'ক্সাইড বিপজ্জনক কাৰণ ই",
  [["binds haemoglobin more strongly than oxygen", "অক্সিজেনতকৈ বেছি দৃঢ়ভাৱে হিম'গ্লবিনত বান্ধে"], ["is highly acidic", "অতি এচিডীয়"], ["has a strong smell", "তীব্ৰ গোন্ধ আছে"], ["dissolves in water", "পানীত দ্ৰৱে"]], 0,
  "Carbon monoxide forms carboxyhaemoglobin and blocks oxygen transport, and being odourless it gives no warning. It is not acidic.",
  "কাৰ্বন মন'ক্সাইড কাৰ্বক্সিহিম'গ্লবিন গঢ়ি অক্সিজেন পৰিবহন বন্ধ কৰে, আৰু গন্ধহীন হোৱা বাবে সতৰ্কতা নিদিয়ে। ই এচিডীয় নহয়।");

add("chemistry-285",
  "The least polluting fossil fuel among the following is",
  "তলৰ মাজত আটাই কম প্ৰদূষণকাৰী জীৱাশ্ম ইন্ধন",
  [["natural gas", "প্ৰাকৃতিক গেছ"], ["coal", "কয়লা"], ["petroleum", "পেট্ৰ'লিয়াম"], ["lignite", "লিগনাইট"]], 0,
  "Natural gas is mostly methane and gives the most heat per unit of carbon dioxide, with little sulphur. Coal releases sulphur dioxide and ash.",
  "প্ৰাকৃতিক গেছ মূলতঃ মিথেন আৰু প্ৰতি একক কাৰ্বন ডাইঅক্সাইডত আটাই বেছি তাপ দিয়ে, ছালফাৰ কম। কয়লাই ছালফাৰ ডাইঅক্সাইড আৰু ছাই এৰে।");

add("chemistry-286",
  "The fraction of petroleum used as fuel for jet aircraft is",
  "জেট বিমানৰ ইন্ধন হিচাপে ব্যৱহৃত পেট্ৰ'লিয়ামৰ ভগ্নাংশটো",
  [["kerosene", "কেৰ'ছিন"], ["petrol", "পেট্ৰ'ল"], ["diesel", "ডিজেল"], ["bitumen", "বিটুমেন"]], 0,
  "Aviation turbine fuel is a kerosene fraction, refined to a high standard. Bitumen is the residue used for road surfacing.",
  "উড্ডয়ন টাৰ্বাইন ইন্ধন কেৰ'ছিন ভগ্নাংশ, উচ্চ মানলৈ পৰিশোধিত। বিটুমেন পথ বনোৱাত ব্যৱহৃত অৱশিষ্ট।");

add("chemistry-287",
  "The main constituent of biogas is",
  "বায়'গেছেৰ মূল উপাদান কি",
  [["methane", "মিথেন"], ["hydrogen", "হাইড্ৰজেন"], ["carbon monoxide", "কাৰ্বন মন'ক্সাইড"], ["propane", "প্ৰপেন"]], 0,
  "Biogas from the anaerobic digestion of dung and crop waste is about sixty to seventy percent methane, with carbon dioxide the rest.",
  "গোবৰ আৰু শস্য বৰ্জনৰ অৱায়বিক হজমৰপৰা পোৱা বায়'গেছ প্ৰায় ষাঠিৰপৰা সত্তৰ শতাংশ মিথেন, বাকীখিনি কাৰ্বন ডাইঅক্সাইড।");

add("chemistry-288",
  "The temperature at which a fuel catches fire spontaneously is called its",
  "ইন্ধন এটা নিজে জ্বলি উঠা উষ্ণতাক তাৰ কি বোলা হয়",
  [["ignition temperature", "প্ৰজ্বলন উষ্ণতা"], ["boiling point", "উতলাংক"], ["melting point", "গলনাংক"], ["flash point only", "কেৱল ফ্লেছ পইণ্ট"]], 0,
  "Ignition temperature is the point at which a substance begins to burn without an external spark. Flash point is the lower temperature at which vapour can ignite.",
  "প্ৰজ্বলন উষ্ণতা সেই বিন্দু য'ত পদাৰ্থ এটা বাহ্যিক স্ফুলিংগ অবিহনে জ্বলিবলৈ আৰম্ভ কৰে। ফ্লেছ পইণ্ট তাতকৈ কম উষ্ণতা য'ত ভাপ জ্বলিব পাৰে।");

add("chemistry-289",
  "Which of the following is a renewable fuel?",
  "তলৰ কোনটো নৱীকৰণযোগ্য ইন্ধন",
  [["biogas", "বায়'গেছ"], ["coal", "কয়লা"], ["petroleum", "পেট্ৰ'লিয়াম"], ["natural gas", "প্ৰাকৃতিক গেছ"]], 0,
  "Biogas is produced continuously from dung and plant waste, so it renews. Coal, petroleum and natural gas took millions of years to form.",
  "বায়'গেছ গোবৰ আৰু উদ্ভিদ বৰ্জনৰপৰা নিৰন্তৰ উৎপন্ন হয়, সেয়ে ই নৱীকৰণ হয়। কয়লা, পেট্ৰ'লিয়াম আৰু প্ৰাকৃতিক গেছ গঠন হ'বলৈ কোটি বছৰ লাগিছিল।");

add("chemistry-290",
  "Water gas is a mixture of",
  "জল গেছ কিৰ মিশ্ৰণ",
  [["carbon monoxide and hydrogen", "কাৰ্বন মন'ক্সাইড আৰু হাইড্ৰজেন"], ["carbon dioxide and oxygen", "কাৰ্বন ডাইঅক্সাইড আৰু অক্সিজেন"], ["methane and ethane", "মিথেন আৰু ইথেন"], ["hydrogen and oxygen", "হাইড্ৰজেন আৰু অক্সিজেন"]], 0,
  "Passing steam over red hot coke gives water gas, a mixture of carbon monoxide and hydrogen. Producer gas is a different mixture with nitrogen.",
  "জ্বলন্ত কক্ছৰ ওপৰত ভাপ পঠালে জল গেছ পোৱা যায়, যি কাৰ্বন মন'ক্সাইড আৰু হাইড্ৰজেনৰ মিশ্ৰণ। প্ৰডিউছাৰ গেছ নাইট্ৰজেনসহ বেলেগ মিশ্ৰণ।");

add("chemistry-291",
  "The flame of a candle is luminous in the middle zone because that zone has",
  "মমবাতিৰ শিখা মাজৰ অঞ্চলত দীপ্তিমান কাৰণ সেই অঞ্চলত থাকে",
  [["unburnt carbon particles glowing", "অদগ্ধ কাৰ্বন কণিকা জ্বলি থকা"], ["complete combustion", "সম্পূৰ্ণ দহন"], ["only oxygen", "কেৱল অক্সিজেন"], ["no heat at all", "একেবাৰে তাপ নাই"]], 0,
  "In the middle zone there is not enough oxygen, so carbon particles form and glow yellow. The outer zone burns completely and is almost non-luminous.",
  "মাজৰ অঞ্চলত পৰ্যাপ্ত অক্সিজেন নাই, সেয়ে কাৰ্বন কণিকা গঠিত হৈ হালধীয়াকৈ জ্বলে। বাহিৰৰ অঞ্চল সম্পূৰ্ণ জ্বলে আৰু প্ৰায় দীপ্তিহীন।");

add("chemistry-292",
  "Which of the following is the cleanest burning fuel for domestic use?",
  "ঘৰুৱা ব্যৱহাৰৰ বাবে আটাই পৰিষ্কাৰ জ্বলি থকা ইন্ধন কোনটো",
  [["LPG", "LPG"], ["coal", "কয়লা"], ["firewood", "জুইকাঠ"], ["dung cake", "গোবৰ পিঠা"]], 0,
  "LPG burns with little smoke or ash and has a high calorific value. Firewood and dung cakes release smoke and carbon monoxide indoors.",
  "LPG কম ধোঁৱা বা ছাইৰ সৈতে জ্বলে আৰু কেলৰিফিক মূল্য বেছি। জুইকাঠ আৰু গোবৰ পিঠাই ঘৰৰ ভিতৰত ধোঁৱা আৰু কাৰ্বন মন'ক্সাইড এৰে।");

add("chemistry-293",
  "The gas chiefly responsible for acid rain is",
  "এচিড বৰষুণৰ বাবে মূলতঃ দায়ী গেছটো",
  [["sulphur dioxide", "ছালফাৰ ডাইঅক্সাইড"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["methane", "মিথেন"], ["oxygen", "অক্সিজেন"]], 0,
  "Sulphur dioxide and nitrogen oxides dissolve in rain to form sulphuric and nitric acids. Carbon dioxide gives only weak carbonic acid.",
  "ছালফাৰ ডাইঅক্সাইড আৰু নাইট্ৰজেন অক্সাইড বৰষুণত দ্ৰৱীভূত হৈ ছালফিউৰিক আৰু নাইট্ৰিক এচিড গঢ়ে। কাৰ্বন ডাইঅক্সাইডে কেবল দুৰ্বল কাৰ্বনিক এচিড দিয়ে।");

add("chemistry-294",
  "Which of the following is not a fossil fuel?",
  "তলৰ কোনটো জীৱাশ্ম ইন্ধন নহয়",
  [["hydrogen", "হাইড্ৰজেন"], ["coal", "কয়লা"], ["petroleum", "পেট্ৰ'লিয়াম"], ["natural gas", "প্ৰাকৃতিক গেছ"]], 0,
  "Hydrogen is produced industrially, not mined from ancient deposits. Coal, petroleum and natural gas are the three fossil fuels.",
  "হাইড্ৰজেন শিল্পত উৎপন্ন কৰা হয়, পুৰণি ভাণ্ডাৰৰপৰা খনি কৰা নহয়। কয়লা, পেট্ৰ'লিয়াম আৰু প্ৰাকৃতিক গেছ তিনিটা জীৱাশ্ম ইন্ধন।");

add("chemistry-295",
  "The residue left after the destructive distillation of coal is",
  "কয়লাৰ ধ্বংসকাৰী আঁতৰণৰ পিছত ৰোৱা অৱশিষ্টটো",
  [["coke", "কক্ছ"], ["coal tar", "কয়লা টাৰ"], ["coal gas", "কয়লা গেছ"], ["ammonia liquor", "এম'নিয়া দ্ৰৱ"]], 0,
  "Coke is the solid residue, coal tar and ammonia liquor the liquid, and coal gas the volatile product.",
  "কক্ছ কঠিন অৱশিষ্ট, কয়লা টাৰ আৰু এম'নিয়া দ্ৰৱ জুলীয়া, আৰু কয়লা গেছ উদ্বায়ী উৎপাদ।");

add("chemistry-296",
  "Which of the following is used as a domestic fuel in cylinders?",
  "তলৰ কোনটো চিলিণ্ডাৰত ঘৰুৱা ইন্ধন হিচাপে ব্যৱহৃত হয়",
  [["liquefied petroleum gas", "তৰল পেট্ৰ'লিয়াম গেছ"], ["compressed natural gas", "সংকুচিত প্ৰাকৃতিক গেছ"], ["producer gas", "প্ৰডিউছাৰ গেছ"], ["water gas", "জল গেছ"]], 0,
  "LPG is butane and propane liquefied under pressure for cylinders. CNG stays gaseous and is used in vehicles.",
  "LPG বিউটেন আৰু প্ৰপেন, চিলিণ্ডাৰৰ বাবে চাপত তৰল কৰা হয়। CNG গেছীয় অৱস্থাত থাকে আৰু যানবাহনত ব্যৱহৃত।");

add("chemistry-297",
  "The burning of magnesium ribbon in air produces a",
  "বায়ুত মেগ্নেছিয়াম ফিতা জ্বলিলে উৎপন্ন হয়",
  [["white ash of magnesium oxide", "মেগ্নেছিয়াম অক্সাইডৰ বগা ছাই"], ["black smoke of carbon", "কাৰ্বনৰ ক'লা ধোঁৱা"], ["yellow flame of sulphur", "ছালফাৰৰ হালধীয়া শিখা"], ["no visible change", "দেখাকৈ কোনো পৰিৱৰ্তন নাই"]], 0,
  "Magnesium combines with oxygen to give white magnesium oxide and an intense white light. Carbon and sulphur are not involved.",
  "মেগ্নেছিয়াম অক্সিজেনৰ সৈতে মিলি বগা মেগ্নেছিয়াম অক্সাইড আৰু তীব্ৰ বগা পোহৰ দিয়ে। কাৰ্বন আৰু ছালফাৰ ইয়াত নাই।");

/* ================= water-solutions ================= */
useLeaf("water-solutions");

add("chemistry-298",
  "The hardness of water is caused by the presence of",
  "পানীৰ কাঠিন্য কিৰ উপস্থিতিৰ বাবে হয়",
  [["calcium and magnesium salts", "কেল্ছিয়াম আৰু মেগ্নেছিয়াম লৱণ"], ["sodium and potassium salts", "ছডিয়াম আৰু পটাছিয়াম লৱণ"], ["iron and copper salts", "লো আৰু তামৰ লৱণ"], ["only sodium chloride", "কেৱল ছডিয়াম ক্লৰাইড"]], 0,
  "Calcium and magnesium ions prevent soap from lathering, which is what hardness means. Sodium and potassium salts do not cause it.",
  "কেল্ছিয়াম আৰু মেগ্নেছিয়াম আয়নে চাবোনক ফেন ওলোৱাত বাধা দিয়ে, যি কাঠিন্যৰ অৰ্থ। ছডিয়াম আৰু পটাছিয়াম লৱণে ইয়াক নঘটায়।");

add("chemistry-299",
  "Temporary hardness of water can be removed by",
  "পানীৰ অস্থায়ী কাঠিন্য কিৰ দ্বাৰা আঁতৰোৱা যায়",
  [["boiling", "উতলোৱা"], ["adding common salt", "সাধাৰণ লৱণ যোগ কৰা"], ["filtering through sand", "বালিৰে পৰিস্ৰাৱণ"], ["adding sugar", "চেনি যোগ কৰা"]], 0,
  "Boiling breaks down calcium bicarbonate into insoluble carbonate, which settles out. Common salt does not soften water.",
  "উতলালে কেল্ছিয়াম বাইকাৰ্বনেট ভাঙি অদ্ৰৱণীয় কাৰ্বনেট হয়, যি তলত জমা হয়। সাধাৰণ লৱণে পানী নৰম নকৰে।");

add("chemistry-300",
  "Permanent hardness of water is due to the presence of",
  "পানীৰ স্থায়ী কাঠিন্য কিৰ উপস্থিতিৰ বাবে হয়",
  [["sulphates and chlorides of calcium and magnesium", "কেল্ছিয়াম আৰু মেগ্নেছিয়ামৰ ছালফেট আৰু ক্লৰাইড"], ["calcium bicarbonate only", "কেৱল কেল্ছিয়াম বাইকাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["dissolved oxygen", "দ্ৰৱীভূত অক্সিজেন"]], 0,
  "Sulphates and chlorides survive boiling, so that hardness is permanent. Bicarbonates cause only temporary hardness.",
  "ছালফেট আৰু ক্লৰাইড উতলালেও থাকি যায়, সেয়ে সেই কাঠিন্য স্থায়ী। বাইকাৰ্বনেটে কেবল অস্থায়ী কাঠিন্য ঘটায়।");

add("chemistry-301",
  "A solution in which no more solute can be dissolved at a given temperature is called",
  "এটা নিৰ্দিষ্ট উষ্ণতাত আৰু অধঃস্তৰ দ্ৰৱীভূত কৰিব নোৱাৰা দ্ৰৱক কি বোলা হয়",
  [["a saturated solution", "সম্পৃক্ত দ্ৰৱ"], ["an unsaturated solution", "অসম্পৃক্ত দ্ৰৱ"], ["a supersaturated solution", "অতিসম্পৃক্ত দ্ৰৱ"], ["a colloid", "এটা কলয়ড"]], 0,
  "A saturated solution holds the maximum solute the solvent can take at that temperature. A supersaturated solution holds even more, unstably.",
  "সম্পৃক্ত দ্ৰৱে সেই উষ্ণতাত দ্ৰাৱকে ল'ব পৰা সৰ্বোচ্চ অধঃস্তৰ ধৰি ৰাখে। অতিসম্পৃক্ত দ্ৰৱে তাৰ পৰাও বেছি, অস্থিৰভাৱে ধৰি ৰাখে।");

add("chemistry-302",
  "Which of the following is used to remove permanent hardness of water on a large scale?",
  "তলৰ কোনটো ডাঙৰ পৰিসৰত পানীৰ স্থায়ী কাঠিন্য আঁতৰাবলৈ ব্যৱহৃত হয়",
  [["zeolite or ion exchange resin", "জিঅ'লাইট বা আয়ন বিনিময় ৰেজিন"], ["boiling", "উতলোৱা"], ["sand filtration", "বালি পৰিস্ৰাৱণ"], ["adding lime only", "কেৱল চূণ যোগ কৰা"]], 0,
  "Zeolites exchange sodium for the calcium and magnesium ions, softening even permanent hardness. Boiling works only on bicarbonates.",
  "জিঅ'লাইটে কেল্ছিয়াম আৰু মেগ্নেছিয়াম আয়নৰ সলনি ছডিয়াম দিয়ে, স্থায়ী কাঠিন্যও নৰম কৰে। উতলোৱা কেবল বাইকাৰ্বনেটত কাম কৰে।");

add("chemistry-303",
  "The substance present in the smaller amount in a solution is called the",
  "দ্ৰৱত কম পৰিমাণে থকা পদাৰ্থটোক কি বোলা হয়",
  [["solute", "অধঃস্তৰ"], ["solvent", "দ্ৰাৱক"], ["solution", "দ্ৰৱ"], ["suspension", "নিলম্বন"]], 0,
  "The solute is dissolved and is present in the smaller amount, while the solvent is the medium. In salt water, salt is the solute.",
  "অধঃস্তৰ দ্ৰৱীভূত হয় আৰু কম পৰিমাণে থাকে, আনহাতে দ্ৰাৱক মাধ্যম। নিমখ পানীত নিমখ অধঃস্তৰ।");

add("chemistry-304",
  "Solubility of most solids in water generally increases with",
  "পানীত বেছিভাগ কঠিন পদাৰ্থৰ দ্ৰৱণীয়তা সাধাৰণতে কিৰ সৈতে বাঢ়ে",
  [["rise in temperature", "উষ্ণতা বৃদ্ধি"], ["fall in temperature", "উষ্ণতা হ্ৰাস"], ["rise in pressure", "চাপ বৃদ্ধি"], ["adding more solvent only", "কেৱল বেছি দ্ৰাৱক যোগ"]], 0,
  "Most solids dissolve more as the water warms, which is why sugar dissolves faster in hot tea. Gases behave the opposite way.",
  "বেছিভাগ কঠিন পদাৰ্থ পানী গৰম হ'লে বেছি দ্ৰৱে, সেয়ে গৰম চাহত চেনি সোনকালে দ্ৰৱে। গেছেৰ আচৰণ ওলোটা।");

add("chemistry-305",
  "Which of the following is a colloidal solution?",
  "তলৰ কোনটো কলয়ডীয় দ্ৰৱ",
  [["milk", "গাখীৰ"], ["salt solution", "নিমখ দ্ৰৱ"], ["sugar solution", "চেনি দ্ৰৱ"], ["distilled water", "পাতন পানী"]], 0,
  "Milk has fat globules dispersed in water, which scatter light and make it a colloid. Salt and sugar dissolve completely into true solutions.",
  "গাখীৰত চৰ্বিৰ কণিকা পানীত বিচ্ছুৰিত, যি পোহৰ বিচ্ছুৰিত কৰি কলয়ড কৰে। নিমখ আৰু চেনি সম্পূৰ্ণ দ্ৰৱীভূত হৈ প্ৰকৃত দ্ৰৱ দিয়ে।");

add("chemistry-306",
  "The process of separating a mixture of miscible liquids with different boiling points is called",
  "বেলেগ উতলাংক থকা মিশ্ৰণীয় জুলীয়াৰ মিশ্ৰণ পৃথক কৰা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["fractional distillation", "ভগ্নাংশ পাতন"], ["filtration", "পৰিস্ৰাৱণ"], ["sedimentation", "অৱক্ষেপণ"], ["sublimation", "উৎপতন"]], 0,
  "Fractional distillation boils off the more volatile liquid first and condenses it, as in refining petroleum. Filtration separates solids only.",
  "ভগ্নাংশ পাতনে বেছি উদ্বায়ী জুলীয়া প্ৰথমে উতলাই ঘনীভূত কৰে, যেনে পেট্ৰ'লিয়াম পৰিশোধনত। পৰিস্ৰাৱণে কেবল কঠিন পৃথক কৰে।");

add("chemistry-307",
  "Which of the following will not dissolve in water?",
  "তলৰ কোনটো পানীত নিমিলে",
  [["cooking oil", "ৰন্ধন তেল"], ["common salt", "সাধাৰণ লৱণ"], ["sugar", "চেনি"], ["washing soda", "ধোৱা ছডা"]], 0,
  "Cooking oil is non-polar and does not mix with polar water, so it floats as a separate layer. Salt, sugar and washing soda all dissolve.",
  "ৰন্ধন তেল অধ্ৰুৱীয় আৰু ধ্ৰুৱীয় পানীৰ সৈতে নিমিলে, সেয়ে সুকীয়া স্তৰ হৈ ওপঙে। নিমখ, চেনি আৰু ধোৱা ছডা সকলো দ্ৰৱে।");

add("chemistry-308",
  "The concentration of a solution expressed as the number of moles of solute per litre is called",
  "প্ৰতি লিটাৰত অধঃস্তৰৰ মৌল সংখ্যা হিচাপে প্ৰকাশ কৰা দ্ৰৱৰ ঘনত্বক কি বোলা হয়",
  [["molarity", "মৌলাৰতা"], ["molality", "মৌলালতা"], ["normality only", "কেৱল নৰ্মালতা"], ["mass percent", "ভৰ শতাংশ"]], 0,
  "Molarity is moles of solute per litre of solution. Molality uses kilograms of solvent instead, which is different.",
  "মৌলাৰতা প্ৰতি লিটাৰ দ্ৰৱত অধঃস্তৰৰ মৌল। মৌলালতাই ইয়াৰ সলনি কিলোগ্ৰাম দ্ৰাৱক ব্যৱহাৰ কৰে, যি বেলেগ।");

add("chemistry-309",
  "Water is called the universal solvent because it",
  "পানীক সৰ্বজনীন দ্ৰাৱক বোলা হয় কাৰণ ই",
  [["dissolves a very large number of substances", "অতি বৃহৎ সংখ্যক পদাৰ্থ দ্ৰৱীভূত কৰে"], ["has a high boiling point", "উচ্চ উতলাংক আছে"], ["is colourless", "বৰ্ণহীন"], ["freezes at zero degrees", "শূন্য ডিগ্ৰীত জমে"]], 0,
  "Its polar nature lets water dissolve most ionic salts and many polar molecules, so it is called the universal solvent. Colour and boiling point are unrelated.",
  "ইয়াৰ ধ্ৰুৱীয় প্ৰকৃতিয়ে পানীক বেছিভাগ আয়নিক লৱণ আৰু বহু ধ্ৰুৱীয় অণু দ্ৰৱীভূত কৰিবলৈ দিয়ে, সেয়ে সৰ্বজনীন দ্ৰাৱক। ৰং আৰু উতলাংক সম্পৰ্কহীন।");

add("chemistry-310",
  "The chemical formula of limewater is",
  "চূণপানীৰ ৰাসায়নিক সূত্ৰ",
  [["Ca(OH)2", "Ca(OH)2"], ["CaCO3", "CaCO3"], ["CaO", "CaO"], ["CaCl2", "CaCl2"]], 0,
  "Limewater is a solution of calcium hydroxide, Ca(OH)2. CaCO3 is limestone, CaO quicklime and CaCl2 calcium chloride.",
  "চূণপানী কেল্ছিয়াম হাইড্ৰক্সাইডৰ দ্ৰৱ, Ca(OH)2। CaCO3 চূণশিল, CaO কুইকলাইম আৰু CaCl2 কেল্ছিয়াম ক্লৰাইড।");

add("chemistry-311",
  "Which gas turns limewater milky?",
  "কোনটো গেছে চূণপানী ঘোলা কৰে",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["oxygen", "অক্সিজেন"], ["hydrogen", "হাইড্ৰজেন"], ["nitrogen", "নাইট্ৰজেন"]], 0,
  "Carbon dioxide forms insoluble calcium carbonate with limewater, which appears milky. The other gases do not react this way.",
  "কাৰ্বন ডাইঅক্সাইডে চূণপানীৰ সৈতে অদ্ৰৱণীয় কেল্ছিয়াম কাৰ্বনেট গঢ়ে, যি ঘোলা দেখা যায়। বাকী গেছে এইদৰে বিক্ৰিয়া নকৰে।");

add("chemistry-312",
  "Which of the following is a true solution?",
  "তলৰ কোনটো প্ৰকৃত দ্ৰৱ",
  [["sugar in water", "পানীত চেনি"], ["milk", "গাখীৰ"], ["fog", "কুঁৱলী"], ["paint", "ৰঙ"]], 0,
  "Sugar dissolves to single molecules and the mixture is homogeneous and clear. Milk, fog and paint are colloids or suspensions.",
  "চেনি একক অণুলৈ দ্ৰৱে আৰু মিশ্ৰণটো সমসত্ব তথা স্বচ্ছ। গাখীৰ, কুঁৱলী আৰু ৰঙ কলয়ড বা নিলম্বন।");

add("chemistry-313",
  "The process of adding chlorine to water is done to",
  "পানীত ক্লৰিন যোগ কৰা প্ৰক্ৰিয়াটো কিৰ বাবে কৰা হয়",
  [["kill disease-causing germs", "ৰোগ সৃষ্টিকাৰী জীৱাণু মাৰিবলৈ"], ["remove hardness", "কাঠিন্য আঁতৰাবলৈ"], ["improve taste", "সোৱাদ উন্নত কৰিবলৈ"], ["add minerals", "খনিজ যোগ কৰিবলৈ"]], 0,
  "Chlorination disinfects water by killing bacteria and viruses. It does not soften water or add minerals.",
  "ক্লৰিনীকৰণে বেক্টেৰিয়া আৰু ভাইৰাছ মাৰি পানী জীৱাণুমুক্ত কৰে। ই পানী নৰম নকৰে বা খনিজ যোগ নকৰে।");

add("chemistry-314",
  "Hard water is unsuitable for washing with soap because",
  "কঠিন পানী চাবোনেৰে ধোৱাৰ বাবে অনুপযুক্ত কাৰণ",
  [["it forms a scum with soap", "ই চাবোনৰ সৈতে মলি গঢ়ে"], ["it has no dissolved air", "তাত দ্ৰৱীভূত বায়ু নাই"], ["it is too cold", "ই অতি ঠাণ্ডা"], ["it evaporates fast", "ই সোনকালে বাষ্পীভূত হয়"]], 0,
  "Calcium and magnesium ions react with soap to form an insoluble scum, so much soap is wasted before any lather appears.",
  "কেল্ছিয়াম আৰু মেগ্নেছিয়াম আয়নে চাবোনৰ সৈতে বিক্ৰিয়া কৰি অদ্ৰৱণীয় মলি গঢ়ে, সেয়ে ফেন ওলোৱাৰ আগতে বহু চাবোন নষ্ট হয়।");

add("chemistry-315",
  "Which of the following methods gives distilled water?",
  "তলৰ কোন পদ্ধতিয়ে পাতন পানী দিয়ে",
  [["distillation", "পাতন"], ["filtration", "পৰিস্ৰাৱণ"], ["sedimentation", "অৱক্ষেপণ"], ["chlorination", "ক্লৰিনীকৰণ"]], 0,
  "Distillation boils the water and condenses the vapour, leaving dissolved salts behind. Filtration removes only suspended solids.",
  "পাতনে পানী উতলাই ভাপ ঘনীভূত কৰে, দ্ৰৱীভূত লৱণ পিছত এৰি। পৰিস্ৰাৱণে কেবল নিলম্বিত কঠিন আঁতৰায়।");

add("chemistry-316",
  "The solubility of a gas in water usually decreases as",
  "পানীত গেছেৰ দ্ৰৱণীয়তা সাধাৰণতে কমে যেতিয়া",
  [["temperature rises", "উষ্ণতা বাঢ়ে"], ["temperature falls", "উষ্ণতা কমে"], ["pressure rises", "চাপ বাঢ়ে"], ["volume increases", "আয়তন বাঢ়ে"]], 0,
  "Warm water holds less dissolved gas, which is why warm soda goes flat faster. Raising pressure increases gas solubility.",
  "গৰম পানীয়ে কম দ্ৰৱীভূত গেছ ধৰে, সেয়ে গৰম ছডা সোনকালে ফিকে যায়। চাপ বঢ়ালে গেছেৰ দ্ৰৱণীয়তা বাঢ়ে।");

add("chemistry-317",
  "A mixture of two liquids that do not mix and form separate layers is separated by",
  "নিমিলা আৰু সুকীয়া স্তৰ গঢ়া দুটা জুলীয়াৰ মিশ্ৰণ কিৰে পৃথক কৰা হয়",
  [["a separating funnel", "পৃথকীকৰণ চুঙা"], ["filtration", "পৰিস্ৰাৱণ"], ["sublimation", "উৎপতন"], ["evaporation only", "কেৱল বাষ্পীভৱন"]], 0,
  "A separating funnel draws off the lower layer, which works because the liquids are immiscible. Filtration separates solids from liquids.",
  "পৃথকীকৰণ চুঙাই তলৰ স্তৰ উলিয়াই দিয়ে, যি কাম কৰে কাৰণ জুলীয়াবোৰ নিমিলা। পৰিস্ৰাৱণে কঠিনক জুলীয়াৰপৰা পৃথক কৰে।");

/* ================= chemical-reactions ================= */
useLeaf("chemical-reactions");

add("chemistry-318",
  "In the reaction zinc plus copper sulphate giving zinc sulphate plus copper, zinc is",
  "জিঙ্ক যোগ কপাৰ ছালফেটে জিঙ্ক ছালফেট যোগ কপাৰ দিয়া বিক্ৰিয়াত জিঙ্ক",
  [["oxidised", "জাৰিত"], ["reduced", "বিজাৰিত"], ["unchanged", "অপৰিৱৰ্তিত"], ["a catalyst", "অনুঘটক"]], 0,
  "Zinc loses electrons to become zinc ion, and loss of electrons is oxidation. Copper gains them and is reduced.",
  "জিঙ্কে ইলেক্ট্ৰন হেৰুৱাই জিঙ্ক আয়ন হয়, আৰু ইলেক্ট্ৰন হেৰুৱা জাৰণ। তামে সেইবোৰ লাভ কৰি বিজাৰিত হয়।");

add("chemistry-319",
  "Which of the following is an endothermic reaction?",
  "তলৰ কোনটো তাপশোষী বিক্ৰিয়া",
  [["decomposition of calcium carbonate on heating", "গৰম কৰিলে কেল্ছিয়াম কাৰ্বনেটৰ বিয়োজন"], ["burning of coal", "কয়লা জ্বলোৱা"], ["neutralisation of acid by base", "ক্ষাৰকে এচিড প্ৰশমিত কৰা"], ["respiration", "শ্বসন"]], 0,
  "Breaking calcium carbonate into quicklime and carbon dioxide needs continuous heat, so it is endothermic. Burning and neutralisation release heat.",
  "কেল্ছিয়াম কাৰ্বনেটক কুইকলাইম আৰু কাৰ্বন ডাইঅক্সাইডলৈ ভাঙিবলৈ নিৰন্তৰ তাপ লাগে, সেয়ে তাপশোষী। দহন আৰু প্ৰশমনে তাপ এৰে।");

add("chemistry-320",
  "A catalyst is a substance that",
  "অনুঘটক এনে পদাৰ্থ যি",
  [["changes the rate of reaction without being consumed", "নিজে খৰচ নোহোৱাকৈ বিক্ৰিয়াৰ হাৰ সলায়"], ["increases the yield permanently", "উৎপাদ স্থায়ীভাৱে বঢ়ায়"], ["is always a solid", "সদায় কঠিন"], ["provides energy to the reaction", "বিক্ৰিয়ালৈ শক্তি যোগায়"]], 0,
  "A catalyst lowers the activation energy so the reaction goes faster, and it is recovered unchanged. It does not change the final yield at equilibrium.",
  "অনুঘটকে সক্ৰিয়ণ শক্তি কমাই বিক্ৰিয়া দ্ৰুত কৰে, আৰু অপৰিৱৰ্তিতভাৱে ঘূৰি পোৱা যায়। ই সাম্যাৱস্থাৰ চূড়ান্ত উৎপাদ নসলায়।");

add("chemistry-321",
  "The reaction between an acid and a base to give salt and water is called",
  "এচিড আৰু ক্ষাৰকৰ মাজত লৱণ আৰু পানী দিয়া বিক্ৰিয়াক কি বোলা হয়",
  [["neutralisation", "প্ৰশমন"], ["oxidation", "জাৰণ"], ["reduction", "বিজাৰণ"], ["polymerisation", "পলিমাৰীকৰণ"]], 0,
  "Neutralisation cancels the acid and base, leaving a salt solution near neutral. Oxidation and reduction involve electron transfer.",
  "প্ৰশমনে এচিড আৰু ক্ষাৰক নিষ্ক্ৰিয় কৰি প্ৰায় প্ৰশান্ত লৱণ দ্ৰৱ এৰি দিয়ে। জাৰণ আৰু বিজাৰণত ইলেক্ট্ৰন হস্তান্তৰ হয়।");

add("chemistry-322",
  "Which of the following is a displacement reaction?",
  "তলৰ কোনটো স্থানচ্যুতি বিক্ৰিয়া",
  [["iron nail in copper sulphate solution", "কপাৰ ছালফেট দ্ৰৱত লোৰ কাঁইট"], ["burning of magnesium", "মেগ্নেছিয়াম জ্বলোৱা"], ["heating calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট গৰম কৰা"], ["dissolving sugar in water", "পানীত চেনি দ্ৰৱীভূত কৰা"]], 0,
  "More reactive iron pushes copper out of its salt, which is displacement. Burning is combination and heating a carbonate is decomposition.",
  "বেছি সক্ৰিয় লোৱে তামক তাৰ লৱণৰপৰা আঁতৰাই দিয়ে, যি স্থানচ্যুতি। দহন সংযোগ আৰু কাৰ্বনেট গৰম কৰা বিয়োজন।");

add("chemistry-323",
  "The reaction in which two or more substances combine to form one product is called",
  "দুটা বা ততোধিক পদাৰ্থ মিলি এটা উৎপাদ দিয়া বিক্ৰিয়াক কি বোলা হয়",
  [["combination reaction", "সংযোগ বিক্ৰিয়া"], ["decomposition reaction", "বিয়োজন বিক্ৰিয়া"], ["displacement reaction", "স্থানচ্যুতি বিক্ৰিয়া"], ["double displacement", "দ্বি-স্থানচ্যুতি"]], 0,
  "Combination joins reactants into a single product, as when magnesium burns in oxygen to give magnesium oxide. Decomposition is the reverse.",
  "সংযোগে বিক্ৰিয়কবোৰ এটা উৎপাদত জোৰে, যেনে মেগ্নেছিয়াম অক্সিজেনত জ্বলি মেগ্নেছিয়াম অক্সাইড দিয়ে। বিয়োজন ইয়াৰ ওলোটা।");

add("chemistry-324",
  "The oxidation state of sulphur in sulphuric acid is",
  "ছালফিউৰিক এচিডত ছালফাৰৰ জাৰণ অৱস্থা",
  [["plus six", "যোগ ছয়"], ["plus four", "যোগ চাৰি"], ["minus two", "মাইনাছ দুই"], ["zero", "শূন্য"]], 0,
  "Hydrogen is plus one and oxygen minus two, so the sum forces sulphur to plus six in H2SO4. Plus four occurs in sulphur dioxide.",
  "হাইড্ৰজেন যোগ এক আৰু অক্সিজেন মাইনাছ দুই, সেয়ে H2SO4 ত ছালফাৰ যোগ ছয় হয়। যোগ চাৰি ছালফাৰ ডাইঅক্সাইডত।");

add("chemistry-325",
  "Rusting of iron is an example of",
  "লোত মামৰ লগা কিৰ উদাহৰণ",
  [["oxidation", "জাৰণ"], ["reduction", "বিজাৰণ"], ["neutralisation", "প্ৰশমন"], ["sublimation", "উৎপতন"]], 0,
  "Iron loses electrons to oxygen and water, forming hydrated iron oxide, so the process is oxidation. Reduction would add electrons.",
  "লোৱে অক্সিজেন আৰু পানীলৈ ইলেক্ট্ৰন হেৰুৱাই জলযুক্ত লো অক্সাইড গঢ়ে, সেয়ে প্ৰক্ৰিয়াটো জাৰণ। বিজাৰণে ইলেক্ট্ৰন যোগ কৰে।");

add("chemistry-326",
  "The reaction of silver nitrate with sodium chloride gives a white precipitate of",
  "ছিলভাৰ নাইট্ৰেটৰ ছডিয়াম ক্লৰাইডৰ সৈতে বিক্ৰিয়াই বগা অৱক্ষেপ দিয়ে, সেয়া কি",
  [["silver chloride", "ছিলভাৰ ক্লৰাইড"], ["sodium nitrate", "ছডিয়াম নাইট্ৰেট"], ["silver oxide", "ছিলভাৰ অক্সাইড"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"]], 0,
  "Silver ions and chloride ions combine into insoluble silver chloride, which appears as a white precipitate. Sodium nitrate stays dissolved.",
  "ছিলভাৰ আয়ন আৰু ক্লৰাইড আয়নে মিলি অদ্ৰৱণীয় ছিলভাৰ ক্লৰাইড গঢ়ে, যি বগা অৱক্ষেপ হিচাপে দেখা যায়। ছডিয়াম নাইট্ৰেট দ্ৰৱীভূত থাকি যায়।");

add("chemistry-327",
  "The law of conservation of mass states that",
  "ভৰ সংৰক্ষণ সূত্ৰই কয় যে",
  [["mass is neither created nor destroyed in a chemical reaction", "ৰাসায়নিক বিক্ৰিয়াত ভৰ সৃষ্টি বা ধ্বংস নহয়"], ["energy is always absorbed", "শক্তি সদায় শোষিত হয়"], ["atoms change into other atoms", "পৰমাণু আন পৰমাণুলৈ সলনি হয়"], ["mass always increases", "ভৰ সদায় বাঢ়ে"]], 0,
  "The total mass of reactants equals the total mass of products because atoms are only rearranged. Atoms do not transmute in ordinary reactions.",
  "বিক্ৰিয়কৰ মুঠ ভৰ উৎপাদৰ মুঠ ভৰৰ সমান কাৰণ পৰমাণু কেবল পুনৰ্সজ্জিত হয়। সাধাৰণ বিক্ৰিয়াত পৰমাণু ৰূপান্তৰ নহয়।");

add("chemistry-328",
  "Which of the following is a redox reaction?",
  "তলৰ কোনটো ৰিডক্স বিক্ৰিয়া",
  [["zinc reacting with dilute hydrochloric acid", "জিঙ্কৰ লঘু হাইড্ৰক্লৰিক এচিডৰ সৈতে বিক্ৰিয়া"], ["acid neutralising a base", "এচিডে ক্ষাৰক প্ৰশমিত কৰা"], ["dissolving salt in water", "পানীত নিমখ দ্ৰৱীভূত কৰা"], ["melting of ice", "বৰফ গলা"]], 0,
  "Zinc is oxidised and hydrogen ions are reduced to hydrogen gas, so electrons move. Neutralisation and dissolving involve no change in oxidation state.",
  "জিঙ্ক জাৰিত হয় আৰু হাইড্ৰজেন আয়ন বিজাৰিত হৈ হাইড্ৰজেন গেছ হয়, সেয়ে ইলেক্ট্ৰন চলাচল কৰে। প্ৰশমন আৰু দ্ৰৱীকৰণত জাৰণ অৱস্থা নসলায়।");

add("chemistry-329",
  "The catalyst used in the contact process for making sulphuric acid is",
  "ছালফিউৰিক এচিড বনোৱা কণ্টেক্ট প্ৰক্ৰিয়াত ব্যৱহৃত অনুঘটকটো",
  [["vanadium pentoxide", "ভেনাডিয়াম পেণ্টক্সাইড"], ["iron", "লো"], ["nickel", "নিকেল"], ["platinum only", "কেৱল প্লেটিনাম"]], 0,
  "Vanadium pentoxide catalyses the oxidation of sulphur dioxide to sulphur trioxide. Iron is used in the Haber process and nickel in hydrogenation.",
  "ভেনাডিয়াম পেণ্টক্সাইডে ছালফাৰ ডাইঅক্সাইডৰ ছালফাৰ ট্ৰাইঅক্সাইডলৈ জাৰণ অনুঘটিত কৰে। লো হেবাৰ প্ৰক্ৰিয়াত আৰু নিকেল হাইড্ৰজিনীকৰণত।");

add("chemistry-330",
  "Which of the following is a decomposition reaction?",
  "তলৰ কোনটো বিয়োজন বিক্ৰিয়া",
  [["heating calcium carbonate to give quicklime and carbon dioxide", "কেল্ছিয়াম কাৰ্বনেট গৰম কৰি কুইকলাইম আৰু কাৰ্বন ডাইঅক্সাইড দিয়া"], ["burning magnesium in air", "বায়ুত মেগ্নেছিয়াম জ্বলোৱা"], ["zinc with copper sulphate", "জিঙ্কৰ সৈতে কপাৰ ছালফেট"], ["acid with base", "এচিডৰ সৈতে ক্ষাৰক"]], 0,
  "One compound splits into two products on heating, which is decomposition. Burning magnesium is combination.",
  "এটা যৌগ গৰম কৰিলে দুটা উৎপাদত বিভক্ত হয়, যি বিয়োজন। মেগ্নেছিয়াম জ্বলোৱা সংযোগ।");

add("chemistry-331",
  "In an exothermic reaction the temperature of the surroundings",
  "তাপোৎসৰ্জী বিক্ৰিয়াত চাৰিওফালৰ উষ্ণতা",
  [["rises", "বাঢ়ে"], ["falls", "কমে"], ["stays constant", "স্থিৰ থাকে"], ["first falls then rises", "প্ৰথমে কমে পিছে বাঢ়ে"]], 0,
  "An exothermic reaction releases heat to the surroundings, so the mixture and its container warm up. Endothermic reactions cool them.",
  "তাপোৎসৰ্জী বিক্ৰিয়াই চাৰিওফাললৈ তাপ এৰে, সেয়ে মিশ্ৰণ আৰু পাত্ৰ গৰম হয়। তাপশোষী বিক্ৰিয়াই ঠাণ্ডা কৰে।");

add("chemistry-332",
  "Dissolving sugar in water is a physical change because",
  "পানীত চেনি দ্ৰৱীভূত হোৱা ভৌতিক পৰিৱৰ্তন কাৰণ",
  [["the sugar can be recovered by evaporation", "বাষ্পীভৱনেৰে চেনি ঘূৰাই পোৱা যায়"], ["a new compound forms", "নতুন যৌগ গঠিত হয়"], ["heat is always released", "সদায় তাপ ওলায়"], ["the sugar changes into carbon", "চেনি কাৰ্বনলৈ সলনি হয়"]], 0,
  "The sugar keeps its identity and evaporating the water recovers it unchanged, so no new substance forms. A chemical change would give a new compound.",
  "চেনি নিজৰ পৰিচয় ৰাখে আৰু পানী বাষ্পীভূত কৰিলে অপৰিৱৰ্তিতভাৱে ঘূৰি পোৱা যায়, সেয়ে নতুন পদাৰ্থ নহয়। ৰাসায়নিক পৰিৱৰ্তনে নতুন যৌগ দিয়ে।");

add("chemistry-333",
  "The substance that speeds up a reaction but is not used up is called a",
  "বিক্ৰিয়া দ্ৰুত কৰা কিন্তু খৰচ নোহোৱা পদাৰ্থটোক কি বোলা হয়",
  [["catalyst", "অনুঘটক"], ["reactant", "বিক্ৰিয়ক"], ["product", "উৎপাদ"], ["inhibitor", "প্ৰতিৰোধক"]], 0,
  "A catalyst is recovered chemically unchanged at the end. An inhibitor does the opposite and slows a reaction.",
  "অনুঘটক শেষত ৰাসায়নিকভাৱে অপৰিৱৰ্তিত ঘূৰি পোৱা যায়। প্ৰতিৰোধকে ওলোটা কৰি বিক্ৰিয়া লেহেমীয়া কৰে।");

/* ================= everyday-chemistry ================= */
useLeaf("everyday-chemistry");

add("chemistry-334",
  "The chemical name of washing soda is",
  "ধোৱা ছডাৰ ৰাসায়নিক নাম",
  [["sodium carbonate", "ছডিয়াম কাৰ্বনেট"], ["sodium bicarbonate", "ছডিয়াম বাইকাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"]], 0,
  "Washing soda is sodium carbonate, often the decahydrate. Sodium bicarbonate is baking soda, a different compound.",
  "ধোৱা ছডা ছডিয়াম কাৰ্বনেট, প্ৰায়ে দশজলযুক্ত। ছডিয়াম বাইকাৰ্বনেট বেকিং ছডা, বেলেগ যৌগ।");

add("chemistry-335",
  "Plaster of Paris is obtained by heating gypsum at about",
  "প্লাষ্টাৰ অব পেৰিছ জিপছাম প্ৰায় কিমান তাপত গৰম কৰি পোৱা যায়",
  [["100 degrees Celsius", "১০০ ডিগ্ৰী ছেলছিয়াছ"], ["300 degrees Celsius", "৩০০ ডিগ্ৰী ছেলছিয়াছ"], ["500 degrees Celsius", "৫০০ ডিগ্ৰী ছেলছিয়াছ"], ["1000 degrees Celsius", "১০০০ ডিগ্ৰী ছেলছিয়াছ"]], 0,
  "Heating gypsum to about one hundred degrees drives off part of its water, giving the hemihydrate used for casts. Higher temperatures destroy it.",
  "জিপছামক প্ৰায় এশ ডিগ্ৰীলৈ গৰম কৰিলে ইয়াৰ কিছুমান পানী ওলাই আধা-জলযুক্ত ৰূপ দিয়ে, যি প্লাষ্টাৰত ব্যৱহৃত। বেছি তাপে ইয়াক নষ্ট কৰে।");

add("chemistry-336",
  "The chemical formula of plaster of Paris is",
  "প্লাষ্টাৰ অব পেৰিছৰ ৰাসায়নিক সূত্ৰ",
  [["CaSO4 half H2O", "CaSO4 আধা H2O"], ["CaSO4 two H2O", "CaSO4 দুই H2O"], ["CaCO3", "CaCO3"], ["CaO", "CaO"]], 0,
  "Plaster of Paris is calcium sulphate hemihydrate. The dihydrate is gypsum itself, and CaCO3 is limestone.",
  "প্লাষ্টাৰ অব পেৰিছ কেল্ছিয়াম ছালফেট অৰ্ধজলী। দ্বিজলী নিজেই জিপছাম, আৰু CaCO3 চূণশিল।");

add("chemistry-337",
  "Bleaching powder is chemically",
  "ব্লিচিং পাউডাৰ ৰাসায়নিকভাৱে কি",
  [["calcium oxychloride", "কেল্ছিয়াম অক্সিক্লৰাইড"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["calcium sulphate", "কেল্ছিয়াম ছালফেট"]], 0,
  "Bleaching powder is calcium oxychloride, made by passing chlorine over slaked lime. It releases chlorine for bleaching and disinfection.",
  "ব্লিচিং পাউডাৰ কেল্ছিয়াম অক্সিক্লৰাইড, যি চুণ পানীত ক্লৰিন পঠাই বনোৱা হয়। ই ব্লিচিং আৰু জীৱাণুনাশৰ বাবে ক্লৰিন এৰে।");

add("chemistry-338",
  "The chemical used in whitewashing walls is",
  "বেৰত চুণ লগোৱাত ব্যৱহৃত ৰাসায়নিক পদাৰ্থটো",
  [["calcium hydroxide", "কেল্ছিয়াম হাইড্ৰক্সাইড"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium hydroxide", "ছডিয়াম হাইড্ৰক্সাইড"]], 0,
  "Slaked lime, calcium hydroxide, is applied as a paste and slowly takes up carbon dioxide to form a hard layer of calcium carbonate.",
  "চুণ, কেল্ছিয়াম হাইড্ৰক্সাইড, লেপ হিচাপে লগোৱা হয় আৰু লাহে লাহে কাৰ্বন ডাইঅক্সাইড লৈ কেল্ছিয়াম কাৰ্বনেটৰ কঠিন স্তৰ গঢ়ে।");

add("chemistry-339",
  "The gas used in fire extinguishers is",
  "অগ্নি নিৰ্বাপকত ব্যৱহৃত গেছটো",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["oxygen", "অক্সিজেন"], ["hydrogen", "হাইড্ৰজেন"], ["methane", "মিথেন"]], 0,
  "Carbon dioxide smothers the flame by cutting off oxygen and also cools the surface. Oxygen and hydrogen would feed the fire.",
  "কাৰ্বন ডাইঅক্সাইডে অক্সিজেন বন্ধ কৰি শিখা নুমুৱায় আৰু পৃষ্ঠ ঠাণ্ডা কৰে। অক্সিজেন আৰু হাইড্ৰজেনে জুই বঢ়ায়।");

add("chemistry-340",
  "Soap does not work well in hard water because it forms",
  "কঠিন পানীত চাবোনে ভাল কাম নকৰে কাৰণ ই গঢ়ে",
  [["an insoluble scum with calcium and magnesium ions", "কেল্ছিয়াম আৰু মেগ্নেছিয়াম আয়নৰ সৈতে অদ্ৰৱণীয় মলি"], ["a strong acid", "এটা প্ৰবল এচিড"], ["free chlorine", "মুক্ত ক্লৰিন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"]], 0,
  "The calcium and magnesium salts of the fatty acid are insoluble and appear as scum, wasting soap. Detergents avoid this problem.",
  "চৰ্বি অ্যাসিডৰ কেল্ছিয়াম আৰু মেগ্নেছিয়াম লৱণ অদ্ৰৱণীয় আৰু মলি হিচাপে ওলায়, চাবোন নষ্ট কৰে। ডিটাৰজেণ্টে এই সমস্যা এৰাই যায়।");

add("chemistry-341",
  "Detergents are better than soap in hard water because",
  "কঠিন পানীত চাবোনতকৈ ডিটাৰজেণ্ট ভাল কাৰণ",
  [["their calcium salts are soluble", "ইয়াৰ কেল্ছিয়াম লৱণ দ্ৰৱণীয়"], ["they are cheaper", "তেও সস্তা"], ["they contain no hydrocarbon chain", "তাত হাইড্ৰকাৰ্বন শৃংখল নাই"], ["they do not clean", "তেও পৰিষ্কাৰ নকৰে"]], 0,
  "Detergent calcium salts stay dissolved, so no scum forms and cleaning continues. Soap calcium salts precipitate.",
  "ডিটাৰজেণ্টৰ কেল্ছিয়াম লৱণ দ্ৰৱীভূত থাকি যায়, সেয়ে মলি নহয় আৰু পৰিষ্কাৰ চলি থাকে। চাবোনৰ কেল্ছিয়াম লৱণ অৱক্ষিপ্ত হয়।");

add("chemistry-342",
  "The main raw material used in the manufacture of glass is",
  "কাচ উৎপাদনত ব্যৱহৃত মূল কেঁচা সামগ্ৰীটো",
  [["sand", "বালি"], ["clay", "মাটি"], ["limestone only", "কেৱল চূণশিল"], ["gypsum", "জিপছাম"]], 0,
  "Sand supplies the silica that forms the glass network, with soda and limestone added to lower the melting point and stabilise it.",
  "বালিয়ে কাচৰ জাল গঢ়া ছিলিকা যোগায়, লগত ছডা আৰু চূণশিল গলনাংক কমাবলৈ আৰু স্থিৰ কৰিবলৈ যোগ কৰা হয়।");

add("chemistry-343",
  "The chemical used in matchsticks that ignites on friction is",
  "ঘৰ্ষণত জ্বলি উঠা দীৰ্ঘিকা কাঠিত ব্যৱহৃত ৰাসায়নিক পদাৰ্থটো",
  [["red phosphorus", "ৰঙা ফছফৰাছ"], ["sulphur", "ছালফাৰ"], ["carbon", "কাৰ্বন"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"]], 0,
  "The striking surface carries red phosphorus, which converts to white phosphorus on friction and ignites. The head holds an oxidising agent.",
  "ঘৰ্ষণ পৃষ্ঠত ৰঙা ফছফৰাছ থাকে, যি ঘৰ্ষণত বগা ফছফৰাছলৈ ৰূপান্তৰিত হৈ জ্বলে। মূৰত জাৰক পদাৰ্থ থাকে।");

add("chemistry-344",
  "Which chemical is used to test for the presence of starch?",
  "ষ্টাৰ্চৰ উপস্থিতি পৰীক্ষা কৰিবলৈ কোনটো ৰাসায়নিক ব্যৱহৃত হয়",
  [["iodine solution", "আয়ডিন দ্ৰৱ"], ["limewater", "চূণপানী"], ["silver nitrate", "ছিলভাৰ নাইট্ৰেট"], ["barium chloride", "বেৰিয়াম ক্লৰাইড"]], 0,
  "Iodine turns blue-black with starch. Limewater tests carbon dioxide and silver nitrate tests chloride.",
  "আয়ডিন ষ্টাৰ্চৰ সৈতে নীলা-ক'লা হয়। চূণপানীয়ে কাৰ্বন ডাইঅক্সাইড আৰু ছিলভাৰ নাইট্ৰেটে ক্লৰাইড পৰীক্ষা কৰে।");

add("chemistry-345",
  "Which of the following is used as a fertiliser?",
  "তলৰ কোনটো সাৰ হিচাপে ব্যৱহৃত হয়",
  [["ammonium sulphate", "এম'নিয়াম ছালফেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["silver nitrate", "ছিলভাৰ নাইট্ৰেট"]], 0,
  "Ammonium sulphate supplies nitrogen, which plants need for proteins. Common salt and limestone are not fertilisers.",
  "এম'নিয়াম ছালফেটে নাইট্ৰজেন যোগায়, যি উদ্ভিদৰ প্ৰ'টিনলৈ লাগে। সাধাৰণ লৱণ আৰু চূণশিল সাৰ নহয়।");

add("chemistry-346",
  "The chief nitrogenous fertiliser used in India is",
  "ভাৰতত বেছি ব্যৱহৃত মূল নাইট্ৰজেনযুক্ত সাৰটো",
  [["urea", "ইউৰিয়া"], ["superphosphate", "ছুপাৰফছফেট"], ["potash", "পটাছ"], ["lime", "চুণ"]], 0,
  "Urea carries about forty-six percent nitrogen, the highest of the common solid fertilisers. Superphosphate supplies phosphorus.",
  "ইউৰিয়াত প্ৰায় ছয়চল্লিছ শতাংশ নাইট্ৰজেন, সাধাৰণ কঠিন সাৰৰ ভিতৰত সৰ্বোচ্চ। ছুপাৰফছফেটে ফছফৰাছ যোগায়।");

add("chemistry-347",
  "Which of the following is used in the manufacture of soap?",
  "তলৰ কোনটো চাবোন উৎপাদনত ব্যৱহৃত হয়",
  [["sodium hydroxide", "ছডিয়াম হাইড্ৰক্সাইড"], ["sulphuric acid", "ছালফিউৰিক এচিড"], ["silver nitrate", "ছিলভাৰ নাইট্ৰেট"], ["ammonium chloride", "এম'নিয়াম ক্লৰাইড"]], 0,
  "Boiling fat or oil with sodium hydroxide saponifies it into soap and glycerol. Sulphuric acid would not do this.",
  "চৰ্বি বা তেল ছডিয়াম হাইড্ৰক্সাইডৰ সৈতে উতলালে সাবানীকৰণ হৈ চাবোন আৰু গ্লিচেৰল দিয়ে। ছালফিউৰিক এচিডে এইদৰে নকৰে।");

add("chemistry-348",
  "Baking powder contains baking soda together with",
  "বেকিং পাউডাৰত বেকিং ছডাৰ লগত থাকে",
  [["a mild edible acid such as tartaric acid", "টাৰ্টাৰিক এচিডৰ দৰে মৃদু ভক্ষণযোগ্য এচিড"], ["sodium hydroxide", "ছডিয়াম হাইড্ৰক্সাইড"], ["common salt only", "কেৱল সাধাৰণ লৱণ"], ["calcium oxide", "কেল্ছিয়াম অক্সাইড"]], 0,
  "The acid reacts with the bicarbonate to release carbon dioxide at room temperature, so the dough rises before baking.",
  "এচিডে বাইকাৰ্বনেটৰ সৈতে বিক্ৰিয়া কৰি কোঠাৰী তাপত কাৰ্বন ডাইঅক্সাইড এৰে, সেয়ে বেকিংৰ আগতে খমিৰ উঠে।");

add("chemistry-349",
  "The chemical name of quicklime is",
  "কুইকলাইমৰ ৰাসায়নিক নাম",
  [["calcium oxide", "কেল্ছিয়াম অক্সাইড"], ["calcium hydroxide", "কেল্ছিয়াম হাইড্ৰক্সাইড"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["calcium sulphate", "কেল্ছিয়াম ছালফেট"]], 0,
  "Quicklime is calcium oxide, made by heating limestone. Adding water gives slaked lime, calcium hydroxide.",
  "কুইকলাইম কেল্ছিয়াম অক্সাইড, যি চূণশিল গৰম কৰি বনোৱা হয়। পানী দিলে চুণ, কেল্ছিয়াম হাইড্ৰক্সাইড হয়।");

add("chemistry-350",
  "Which of the following is used as a disinfectant in water treatment?",
  "তলৰ কোনটো পানী শোধনত জীৱাণুনাশক হিচাপে ব্যৱহৃত হয়",
  [["bleaching powder", "ব্লিচিং পাউডাৰ"], ["baking soda", "বেকিং ছডা"], ["washing soda", "ধোৱা ছডা"], ["common salt", "সাধাৰণ লৱণ"]], 0,
  "Bleaching powder releases chlorine, which kills pathogens in water. Baking and washing soda do not disinfect.",
  "ব্লিচিং পাউডাৰে ক্লৰিন এৰে, যি পানীৰ ৰোগজীৱ মাৰে। বেকিং আৰু ধোৱা ছডাই জীৱাণুনাশ নকৰে।");

add("chemistry-351",
  "The chemical used to remove permanent hardness in the laboratory by precipitating calcium as carbonate is",
  "পৰীক্ষাগাৰত কেল্ছিয়ামক কাৰ্বনেট হিচাপে অৱক্ষিপ্ত কৰি স্থায়ী কাঠিন্য আঁতৰাবলৈ ব্যৱহৃত ৰাসায়নিক পদাৰ্থটো",
  [["washing soda", "ধোৱা ছডা"], ["baking soda", "বেকিং ছডা"], ["common salt", "সাধাৰণ লৱণ"], ["bleaching powder", "ব্লিচিং পাউডাৰ"]], 0,
  "Sodium carbonate supplies carbonate ions that precipitate calcium and magnesium as insoluble carbonates, softening the water.",
  "ছডিয়াম কাৰ্বনেটে কাৰ্বনেট আয়ন যোগাই কেল্ছিয়াম আৰু মেগ্নেছিয়ামক অদ্ৰৱণীয় কাৰ্বনেট হিচাপে অৱক্ষিপ্ত কৰি পানী নৰম কৰে。");

add("chemistry-352",
  "Which of the following is used as an antiseptic?",
  "তলৰ কোনটো এণ্টিচেপ্টিক হিচাপে ব্যৱহৃত হয়",
  [["dettol", "ডেটল"], ["baking soda", "বেকিং ছডা"], ["washing soda", "ধোৱা ছডা"], ["lime water", "চূণপানী"]], 0,
  "Dettol contains chloroxylenol, which kills germs on the skin without damaging tissue. The others are household chemicals, not antiseptics.",
  "ডেটলত ক্ল'ৰ'জাইলেনল থাকে, যি কলাৰ ক্ষতি নকৰাকৈ ছালিৰ জীৱাণু মাৰে। বাকীবোৰ ঘৰুৱা ৰাসায়নিক, এণ্টিচেপ্টিক নহয়।");

add("chemistry-353",
  "The chemical name of baking soda is",
  "বেকিং ছডাৰ ৰাসায়নিক নাম",
  [["sodium bicarbonate", "ছডিয়াম বাইকাৰ্বনেট"], ["sodium carbonate", "ছডিয়াম কাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["sodium sulphate", "ছডিয়াম ছালফেট"]], 0,
  "Baking soda is sodium bicarbonate, NaHCO3. Sodium carbonate is washing soda, a stronger alkali.",
  "বেকিং ছডা ছডিয়াম বাইকাৰ্বনেট, NaHCO3। ছডিয়াম কাৰ্বনেট ধোৱা ছডা, বেছি প্ৰবল ক্ষাৰক।");

add("chemistry-354",
  "Which of the following is used in the manufacture of cement?",
  "তলৰ কোনটো চিমেণ্ট উৎপাদনত ব্যৱহৃত হয়",
  [["limestone", "চূণশিল"], ["silver nitrate", "ছিলভাৰ নাইট্ৰেট"], ["iodine", "আয়ডিন"], ["ammonium chloride", "এম'নিয়াম ক্লৰাইড"]], 0,
  "Limestone and clay are heated in a kiln to make cement clinker. Silver nitrate and iodine have no role in cement.",
  "চূণশিল আৰু মাটি ভাঁ‌টিত গৰম কৰি চিমেণ্ট ক্লিংকাৰ বনোৱা হয়। ছিলভাৰ নাইট্ৰেট আৰু আয়ডিনৰ চিমেণ্টত ভূমিকা নাই।");

/* ================= general-chemistry ================= */
useLeaf("general-chemistry");

add("chemistry-355",
  "The chemical symbol of potassium is",
  "পটাছিয়ামৰ ৰাসায়নিক প্ৰতীক",
  [["K", "K"], ["P", "P"], ["Po", "Po"], ["Pt", "Pt"]], 0,
  "Potassium takes the symbol K from its Latin name kalium. P is phosphorus, Po polonium and Pt platinum.",
  "পটাছিয়ামে ইয়াৰ লেটিন নাম কেলিয়ামৰপৰা K প্ৰতীক লয়। P ফছফৰাছ, Po পল'নিয়াম আৰু Pt প্লেটিনাম।");

add("chemistry-356",
  "The number of atoms present in one molecule of sulphuric acid is",
  "ছালফিউৰিক এচিডৰ এটা অণুত থকা পৰমাণুৰ সংখ্যা",
  [["7", "৭"], ["6", "৬"], ["8", "৮"], ["5", "৫"]], 0,
  "H2SO4 holds two hydrogen, one sulphur and four oxygen atoms, seven in all. Six would leave the formula unbalanced.",
  "H2SO4 ত দুটা হাইড্ৰজেন, এটা ছালফাৰ আৰু চাৰিটা অক্সিজেন, মুঠ সাতটা। ছয় হ'লে সূত্ৰ অসন্তুলিত হ'ব।");

add("chemistry-357",
  "The relative molecular mass of carbon dioxide is",
  "কাৰ্বন ডাইঅক্সাইডৰ আপেক্ষিক আণৱিক ভৰ",
  [["44", "৪৪"], ["28", "২৮"], ["32", "৩২"], ["12", "১২"]], 0,
  "One carbon of twelve plus two oxygens of sixteen gives forty-four. Twenty-eight is carbon monoxide.",
  "বাৰৰ এটা কাৰ্বন আৰু ষোল্লৰ দুটা অক্সিজেনে চৌৱাল্লিছ দিয়ে। আঠাইশ কাৰ্বন মন'ক্সাইড।");

add("chemistry-358",
  "Avogadro's number is approximately",
  "অ্যাভোগাড্ৰৰ সংখ্যা প্ৰায়",
  [["6.022 times ten to the power twenty-three", "৬.০২২ গুণ দহৰ ঘাত তেইছ"], ["3.14 times ten to the power twenty-three", "৩.১৪ গুণ দহৰ ঘাত তেইছ"], ["9.8 times ten to the power twenty-three", "৯.৮ গুণ দহৰ ঘাত তেইছ"], ["1.6 times ten to the power nineteen", "১.৬ গুণ দহৰ ঘাত উনৈশ"]], 0,
  "One mole contains about six point zero two two times ten to the power twenty-three particles. The other values belong to other constants.",
  "এক মৌলত প্ৰায় ছয় দশমিক শূন্য দুই দুই গুণ দহৰ ঘাত তেইছ কণিকা থাকে। বাকী মানবোৰ অন্য ধ্ৰুৱকৰ।");

add("chemistry-359",
  "The number of significant figures in the measurement 0.00450 is",
  "০.০০৪৫০ জোখত উল্লেখযোগ্য অংকৰ সংখ্যা",
  [["3", "৩"], ["2", "২"], ["5", "৫"], ["6", "৬"]], 0,
  "Leading zeros are not significant, but the trailing zero after the five is, so three figures count. Only two would ignore that trailing zero.",
  "আগৰ শূন্যবোৰ উল্লেখযোগ্য নহয়, কিন্তু পাঁচৰ পিছৰ শূন্যটো হয়, সেয়ে তিনি অংক গণা হয়। দুই হ'লে শেষৰ শূন্যটো উপেক্ষা কৰিব।");

add("chemistry-360",
  "The gas that is most abundant in the earth's atmosphere is",
  "পৃথিৱীৰ বায়ুমণ্ডলত আটাই বেছি থকা গেছটো",
  [["nitrogen", "নাইট্ৰজেন"], ["oxygen", "অক্সিজেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["argon", "আৰ্গন"]], 0,
  "Nitrogen makes up about seventy-eight percent of dry air and oxygen about twenty-one. Carbon dioxide is only a trace.",
  "নাইট্ৰজেনে শুকান বায়ুৰ প্ৰায় আঠাতৰ সত্তৰ শতাংশ আৰু অক্সিজেন প্ৰায় একৈছ। কাৰ্বন ডাইঅক্সাইড কেবল অতি কম।");

add("chemistry-361",
  "The hardest natural substance known is",
  "জনা আটাই কঠিন প্ৰাকৃতিক পদাৰ্থটো",
  [["diamond", "হীৰা"], ["graphite", "গ্ৰেফাইট"], ["quartz", "কোৱাৰ্টজ"], ["iron", "লো"]], 0,
  "Diamond is a giant covalent lattice of carbon with each atom bonded to four others, giving extreme hardness. Graphite is soft.",
  "হীৰা কাৰ্বনৰ বিশাল সমযোজী জাল, প্ৰতিটো পৰমাণু চাৰিটা অন্যৰ সৈতে বন্ধা, যি অতিশয় কঠিনতা দিয়ে। গ্ৰেফাইট নৰম।");

add("chemistry-362",
  "Aqua regia, which dissolves gold, is a mixture of",
  "সোণ দ্ৰৱীভূত কৰা একুয়া ৰিজিয়া কিৰ মিশ্ৰণ",
  [["concentrated nitric acid and concentrated hydrochloric acid", "ঘন নাইট্ৰিক এচিড আৰু ঘন হাইড্ৰক্লৰিক এচিড"], ["sulphuric acid and water", "ছালফিউৰিক এচিড আৰু পানী"], ["nitric acid and water", "নাইট্ৰিক এচিড আৰু পানী"], ["hydrochloric acid and water", "হাইড্ৰক্লৰিক এচিড আৰু পানী"]], 0,
  "Aqua regia is three parts concentrated hydrochloric to one part concentrated nitric acid, and the mixture generates chlorine that attacks gold.",
  "একুয়া ৰিজিয়া তিনি অংশ ঘন হাইড্ৰক্লৰিক আৰু এক অংশ ঘন নাইট্ৰিক এচিড, আৰু মিশ্ৰণে ক্লৰিন উৎপন্ন কৰি সোণত আক্ৰমণ কৰে।");

add("chemistry-363",
  "The chemical formula of ozone is",
  "অ'জ'নৰ ৰাসায়নিক সূত্ৰ",
  [["O3", "O3"], ["O2", "O2"], ["CO2", "CO2"], ["H2O2", "H2O2"]], 0,
  "Ozone is a triatomic form of oxygen, O3, while the gas we breathe is O2. Hydrogen peroxide is H2O2.",
  "অ'জ'ন অক্সিজেনৰ তিনি-পৰমাণু ৰূপ, O3, আনহাতে আমি উশাহ লোৱা গেছ O2। হাইড্ৰজেন পেৰ'ক্সাইড H2O2।");

add("chemistry-364",
  "The SI unit of amount of substance is the",
  "পদাৰ্থৰ পৰিমাণৰ SI একক কি",
  [["mole", "মৌল"], ["gram", "গ্ৰাম"], ["litre", "লিটাৰ"], ["kelvin", "কেলভিন"]], 0,
  "The mole is the SI base unit for amount of substance, holding Avogadro's number of particles. Gram is mass and litre volume.",
  "মৌল পদাৰ্থৰ পৰিমাণৰ SI মূল একক, যি অ্যাভোগাড্ৰৰ সংখ্যা কণিকা ধৰি ৰাখে। গ্ৰাম ভৰ আৰু লিটাৰ আয়তন।");

add("chemistry-365",
  "Which of the following is a compound rather than a mixture?",
  "তলৰ কোনটো মিশ্ৰণ নহয়, যৌগ",
  [["water", "পানী"], ["air", "বায়ু"], ["brass", "পিতল"], ["sea water", "সাগৰৰ পানী"]], 0,
  "Water has hydrogen and oxygen combined in a fixed ratio, so it is a compound. Air, brass and sea water vary in composition.",
  "পানীত হাইড্ৰজেন আৰু অক্সিজেন নিৰ্দিষ্ট অনুপাতত মিলিত, সেয়ে ই যৌগ। বায়ু, পিতল আৰু সাগৰৰ পানীৰ গঠন বেলেগ বেলেগ।");

add("chemistry-366",
  "The chemical formula of ammonia is",
  "এম'নিয়াৰ ৰাসায়নিক সূত্ৰ",
  [["NH3", "NH3"], ["NO2", "NO2"], ["N2O", "N2O"], ["HNO3", "HNO3"]], 0,
  "Ammonia is NH3, one nitrogen with three hydrogens. HNO3 is nitric acid and N2O laughing gas.",
  "এম'নিয়া NH3, এটা নাইট্ৰজেন আৰু তিনি হাইড্ৰজেন। HNO3 নাইট্ৰিক এচিড আৰু N2O হাঁহিৰ গেছ।");

add("chemistry-367",
  "Which of the following is a noble gas used in electric bulbs?",
  "তলৰ কোনটো বিদ্যুৎ বাল্বত ব্যৱহৃত উপলব্ধ গেছ",
  [["argon", "আৰ্গন"], ["oxygen", "অক্সিজেন"], ["chlorine", "ক্লৰিন"], ["nitrogen", "নাইট্ৰজেন"]], 0,
  "Argon is inert, so it does not react with the hot filament, and it is cheap enough for bulbs. Oxygen would burn the filament away.",
  "আৰ্গন নিষ্ক্ৰিয়, সেয়ে গৰম ফিলামেণ্টৰ সৈতে বিক্ৰিয়া নকৰে, আৰু বাল্বৰ বাবে যথেষ্ট সস্তা। অক্সিজেনে ফিলামেণ্ট জ্বলাই দিব।");

add("chemistry-368",
  "The branch of chemistry that deals with the study of carbon compounds is",
  "কাৰ্বন যৌগৰ অধ্যয়ন কৰা ৰসায়ন বিজ্ঞানৰ শাখাটো",
  [["organic chemistry", "জৈৱ ৰসায়ন"], ["inorganic chemistry", "অজৈৱ ৰসায়ন"], ["physical chemistry", "ভৌতিক ৰসায়ন"], ["analytical chemistry", "বিশ্লেষণী ৰসায়ন"]], 0,
  "Organic chemistry covers carbon compounds, chiefly those with hydrogen. Inorganic chemistry handles the rest of the elements.",
  "জৈৱ ৰসায়নে কাৰ্বন যৌগ, মূলতঃ হাইড্ৰজেনযুক্ত, সামৰি লয়। অজৈৱ ৰসায়নে বাকী মৌলিকবোৰ চম্ভালে।");

add("chemistry-369",
  "The chemical formula of common alum is written as",
  "সাধাৰণ ফটকিৰীৰ ৰাসায়নিক সূত্ৰ",
  [["potash alum", "পটাছ ফটকিৰী"], ["calcium carbonate", "কেল্ছিয়াম কাৰ্বনেট"], ["sodium chloride", "ছডিয়াম ক্লৰাইড"], ["zinc sulphate", "জিঙ্ক ছালফেট"]], 0,
  "Common alum is potash alum, a double sulphate of potassium and aluminium used in water purification. The others are different salts.",
  "সাধাৰণ ফটকিৰী পটাছ ফটকিৰী, পটাছিয়াম আৰু এলুমিনিয়ামৰ দ্বৈত ছালফেট, যি পানী শোধনত ব্যৱহৃত। বাকীবোৰ বেলেগ লৱণ।");

add("chemistry-370",
  "The number of hydrogen atoms in one molecule of glucose is",
  "গ্লুক'জৰ এটা অণুত হাইড্ৰজেন পৰমাণুৰ সংখ্যা",
  [["12", "১২"], ["6", "৬"], ["18", "১৮"], ["24", "২৪"]], 0,
  "Glucose is C6H12O6, so it carries twelve hydrogen atoms. Six would be the carbon or oxygen count.",
  "গ্লুক'জ C6H12O6, সেয়ে ই বাৰটা হাইড্ৰজেন পৰমাণু ৰাখে। ছয় হ'ল কাৰ্বন বা অক্সিজেনৰ সংখ্যা।");

add("chemistry-371",
  "Which of the following is a homogeneous mixture?",
  "তলৰ কোনটো সমসত্ব মিশ্ৰণ",
  [["salt solution", "নিমখ দ্ৰৱ"], ["soil", "মাটি"], ["granite", "গ্ৰেনাইট"], ["oil and water", "তেল আৰু পানী"]], 0,
  "Salt dissolves completely and the composition is the same throughout, so the mixture is homogeneous. Soil, granite and oil with water are not.",
  "নিমখ সম্পূৰ্ণ দ্ৰৱে আৰু গঠন সকলো ঠাইতে একেই, সেয়ে মিশ্ৰণ সমসত্ব। মাটি, গ্ৰেনাইট আৰু তেল-পানী নহয়।");

add("chemistry-372",
  "The scientist who arranged the elements in the order of increasing atomic mass was",
  "মৌলিকবোৰক বাঢ়ি থকা পাৰমাণৱিক ভৰৰ ক্ৰমত সজোৱা বিজ্ঞানীজন",
  [["Mendeleev", "মেণ্ডেলিয়েভ"], ["Bohr", "ব'ৰ"], ["Rutherford", "ৰাদাৰফৰ্ড"], ["Dalton", "ডাল্টন"]], 0,
  "Mendeleev built his table on atomic mass and left gaps for undiscovered elements. Bohr worked on electron shells.",
  "মেণ্ডেলিয়েভে তেওঁৰ তালিকা পাৰমাণৱিক ভৰত গঢ়িছিল আৰু অদিশ্চাৰিত মৌলিকলৈ ঠাই এৰিছিল। ব'ৰে ইলেক্ট্ৰন কক্ষত কাম কৰিছিল।");

/* ================= top-up to reach thirty ================= */
useLeaf("polymers-materials");

add("chemistry-373",
  "The polymer used for making synthetic rubber is",
  "কৃত্ৰিম ৰবৰ বনোৱাত ব্যৱহৃত পলিমাৰটো",
  [["neoprene", "নিঅ'প্ৰিন"], ["nylon", "নাইলন"], ["bakelite", "বেকেলাইট"], ["terylene", "টাৰিলিন"]], 0,
  "Neoprene is a synthetic rubber made from chloroprene and resists oil and heat better than natural rubber. Nylon and terylene are fibres.",
  "নিঅ'প্ৰিন ক্ল'ৰ'প্ৰিনৰপৰা বনোৱা কৃত্ৰিম ৰবৰ, যি প্ৰাকৃতিক ৰবৰতকৈ তেল আৰু তাপ বেছি প্ৰতিৰোধ কৰে। নাইলন আৰু টাৰিলিন আঁহ।");

add("chemistry-374",
  "Which of the following polymers is used in making safety helmets and car parts because of its strength?",
  "শক্তিৰ বাবে সুৰক্ষা টুপী আৰু গাড়ীৰ অংশ বনোত ব্যৱহৃত পলিমাৰটো",
  [["polycarbonate", "পলিকাৰ্বনেট"], ["polythene", "পলিথিন"], ["polystyrene", "পলিষ্টাইৰিন"], ["rayon", "ৰেয়ন"]], 0,
  "Polycarbonate is tough, light and transparent, so helmets and car lenses are made from it. Polythene is soft and polystyrene brittle.",
  "পলিকাৰ্বনেট কঠিন, পাতল আৰু স্বচ্ছ, সেয়ে টুপী আৰু গাড়ীৰ লেন্স ইয়াৰপৰা বনোৱা হয়। পলিথিন নৰম আৰু পলিষ্টাইৰিন ভংগুৰ।");

add("chemistry-375",
  "Which of the following is a semisynthetic fibre?",
  "তলৰ কোনটো অৰ্ধ-কৃত্ৰিম আঁহ",
  [["rayon", "ৰেয়ন"], ["nylon", "নাইলন"], ["terylene", "টাৰিলিন"], ["cotton", "কপাহ"]], 0,
  "Rayon is made by chemically treating natural cellulose, so it is neither fully natural nor fully synthetic. Nylon and terylene are wholly synthetic.",
  "ৰেয়ন প্ৰাকৃতিক চেলুল'জ ৰাসায়নিকভাৱে প্ৰক্ৰিয়া কৰি বনোৱা হয়, সেয়ে ই সম্পূৰ্ণ প্ৰাকৃতিক বা কৃত্ৰিম নহয়। নাইলন আৰু টাৰিলিন সম্পূৰ্ণ কৃত্ৰিম।");

add("chemistry-376",
  "The plastics that soften on heating and harden on cooling repeatedly are called",
  "গৰম কৰিলে নৰম আৰু ঠাণ্ডা কৰিলে কঠিন হোৱা প্লাষ্টিকবোৰক কি বোলা হয়",
  [["thermoplastics", "তাপনমনীয় প্লাষ্টিক"], ["thermosetting plastics", "তাপকাঠিন্য প্লাষ্টিক"], ["elastomers", "স্থিতিস্থাপক"], ["fibres", "আঁহ"]], 0,
  "Thermoplastics can be remoulded many times, which is why polythene can be recycled. Thermosetting plastics cross link and cannot be reshaped.",
  "তাপনমনীয় প্লাষ্টিক বহুবাৰ পুনৰ ছাঁচত ঢালিব পাৰি, সেয়ে পলিথিন পুনৰ্চক্ৰ কৰিব পাৰি। তাপকাঠিন্য প্লাষ্টিক আন্তঃসংযোগ হৈ পুনৰ আকাৰ নলয়।");

useLeaf("water-solutions");

add("chemistry-377",
  "The process in which a solid changes directly into vapour on heating is called",
  "গৰম কৰিলে কঠিন পদাৰ্থ পোনপটীয়াকৈ ভাপলৈ সলনি হোৱা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["sublimation", "উৎপতন"], ["evaporation", "বাষ্পীভৱন"], ["condensation", "ঘনীভৱন"], ["fusion", "গলন"]], 0,
  "Sublimation skips the liquid stage, as camphor and iodine do. Evaporation happens from a liquid surface instead.",
  "উৎপতনে জুলীয়া স্তৰ এৰাই যায়, যেনে কৰ্পূৰ আৰু আয়ডিনে কৰে। বাষ্পীভৱন ইয়াৰ সলনি জুলীয়া পৃষ্ঠৰপৰা হয়।");

add("chemistry-378",
  "Which of the following mixtures can be separated by filtration?",
  "তলৰ কোনটো মিশ্ৰণ পৰিস্ৰাৱণেৰে পৃথক কৰিব পাৰি",
  [["sand and water", "বালি আৰু পানী"], ["salt and water", "নিমখ আৰু পানী"], ["alcohol and water", "এলকহল আৰু পানী"], ["oxygen and nitrogen", "অক্সিজেন আৰু নাইট্ৰজেন"]], 0,
  "Filtration holds back undissolved solid sand while the water passes through. Salt dissolves, so it needs evaporation instead.",
  "পৰিস্ৰাৱণে অদ্ৰৱীভূত বালি ধৰি ৰাখে আৰু পানী পাৰ হৈ যায়। নিমখ দ্ৰৱে, সেয়ে বাষ্পীভৱন লাগে।");

module.exports = { questions: Q };







