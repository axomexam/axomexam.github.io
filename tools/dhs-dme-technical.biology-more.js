#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/dhs-dme-technical.biology-more.js

   Extra biology items that take every leaf of the DHS & DME
   Technical Grade III biology group past thirty questions.
   tools/merge-biology-more.js appends these to the legacy bank
   the builder reads.

   Same shape as the rest of the book: bilingual stem, four
   bilingual options, bilingual explanation. Assamese numerals
   (০-৯) inside Assamese text.
   ============================================================ */

const Q = [];

/* Every item names its leaf. The builder honours this field instead of
   guessing from the stem, because the eleven biology leaves share too much
   vocabulary for a regex pass to separate them reliably. */
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

/* ================= cell-biology ================= */
useLeaf("cell-biology");
add("biology-171",
  "The cell wall of a fungal hypha is built mainly of",
  "ভেঁকুৰ হাইফাৰ কোষবেৰ মূলতঃ কিৰে গঠিত",
  [["chitin", "কাইটিন"], ["cellulose", "চেলুল'জ"], ["peptidoglycan", "পেপ্টিড'গ্লাইকেন"], ["lignin", "লিগনিন"]], 0,
  "Fungal walls are chitin, plant walls cellulose, and bacterial walls peptidoglycan. Chitin is a nitrogen-containing polysaccharide, which is why fungi differ from plants in wall chemistry.",
  "ভেঁকুৰৰ কোষবেৰ কাইটিন, উদ্ভিদৰ চেলুল'জ আৰু বেক্টেৰিয়াৰ পেপ্টিড'গ্লাইকেন। কাইটিন নাইট্ৰজেনযুক্ত পলিছেকাৰাইড, সেয়ে ভেঁকুৰৰ বেৰৰ ৰসায়ন উদ্ভিদতকৈ বেলেগ।");

add("biology-172",
  "The folds of the inner mitochondrial membrane that carry the electron transport chain are called",
  "ইলেক্ট্ৰন পৰিবহন শৃংখল কঢ়িয়াই নিয়া মাইট'কণ্ড্ৰিয়াৰ অন্তঃপৰ্দাৰ ভাঁজবোৰক কি বোলা হয়",
  [["cristae", "ক্ৰিষ্টি"], ["thylakoids", "থাইলাকইড"], ["cisternae", "চিষ্টাৰ্নি"], ["microvilli", "মাইক্ৰ'ভিলাই"]], 0,
  "Cristae are the inward folds of the inner membrane and they hold the respiratory assemblies. Thylakoids belong to chloroplasts, cisternae to Golgi and ER, and microvilli to the plasma membrane.",
  "ক্ৰিষ্টি হ'ল অন্তঃপৰ্দাৰ ভিতৰমুৱা ভাঁজ, য'ত শ্বসন সংযোগস্থল থাকে। থাইলাকইড ক্ল'ৰ'প্লাষ্টৰ, চিষ্টাৰ্নি গলজি আৰু ER ৰ, আৰু মাইক্ৰ'ভিলাই প্লাজমা পৰ্দাৰ।");

add("biology-173",
  "The nucleolus is the site of",
  "নিউক্লিঅ'লাছ কিৰ স্থান",
  [["ribosomal RNA synthesis", "ৰাইব'জ'মেল RNA সংশ্লেষণ"], ["DNA replication", "DNA প্ৰতিলিপন"], ["lipid synthesis", "লিপিড সংশ্লেষণ"], ["ATP formation", "ATP গঠন"]], 0,
  "The nucleolus is a dense region inside the nucleus where ribosomal RNA is transcribed and ribosomal subunits are assembled. DNA replication happens in the nucleoplasm, not the nucleolus.",
  "নিউক্লিঅ'লাছ নিউক্লিয়াছৰ ভিতৰৰ ঘন অঞ্চল, য'ত ৰাইব'জ'মেল RNA প্ৰতিলিখন হয় আৰু ৰাইব'জ'মেল উপএকক সজ্জিত হয়। DNA প্ৰতিলিপন নিউক্লিঅ'প্লাজমত হয়, নিউক্লিঅ'লাছত নহয়।");

add("biology-174",
  "Colourless plastids that store starch, oil or protein are called",
  "চৰ্বি বা প্ৰ'টিন সাঁচি ৰখা বৰ্ণহীন প্লাষ্টিডক কি বোলা হয়",
  [["leucoplasts", "লিউক'প্লাষ্ট"], ["chloroplasts", "ক্ল'ৰ'প্লাষ্ট"], ["chromoplasts", "ক্ৰ'ম'প্লাষ্ট"], ["amyloplasts only", "কেৱল এমাইল'প্লাষ্ট"]], 0,
  "Leucoplasts are the unpigmented plastids of storage tissue; amyloplasts are one kind of leucoplast, so naming only amyloplasts is too narrow. Chloroplasts are green and chromoplasts carry non-green pigments.",
  "লিউক'প্লাষ্ট হ'ল সাঁচনি কলাৰ বৰ্ণহীন প্লাষ্টিড; এমাইল'প্লাষ্ট লিউক'প্লাষ্টৰ এটা প্ৰকাৰ, সেয়ে কেৱল এমাইল'প্লাষ্ট বুলিলে অতি সংকীৰ্ণ হয়। ক্ল'ৰ'প্লাষ্ট সেউজ আৰু ক্ৰ'ম'প্লাষ্টত সেউজ নহ'ব পৰা ৰঞ্জক থাকে।");

add("biology-175",
  "In a prokaryotic cell the ribosome is of the",
  "প্ৰকাৰ্য'টিক কোষত ৰাইব'জ'ম কেনে ধৰণৰ",
  [["70S type", "৭০S প্ৰকাৰ"], ["80S type", "৮০S প্ৰকাৰ"], ["60S type", "৬০S প্ৰকাৰ"], ["40S type", "৪০S প্ৰকাৰ"]], 0,
  "Prokaryotes carry 70S ribosomes made of 50S and 30S subunits. Eukaryotic cytoplasmic ribosomes are 80S, built from 60S and 40S subunits.",
  "প্ৰকাৰ্য'টত ৭০S ৰাইব'জ'ম থাকে, যি ৫০S আৰু ৩০S উপএককৰে গঠিত। ইউকাৰ্য'টিক চাইট'প্লাজমৰ ৰাইব'জ'ম ৮০S, যি ৬০S আৰু ৪০S উপএককৰে গঠিত।");

add("biology-176",
  "Chromatin, the stained thread-like material of the interphase nucleus, consists of",
  "ইণ্টাৰফেজ নিউক্লিয়াছৰ ৰঙিন সূত্ৰাকৃতি পদাৰ্থ ক্ৰ'মেটিন কিৰে গঠিত",
  [["DNA wound round histone proteins", "হিষ্ট'ন প্ৰ'টিনৰ চাৰিওফালে জোৰা খোৱা DNA"], ["RNA and lipids", "RNA আৰু লিপিড"], ["protein only", "কেৱল প্ৰ'টিন"], ["polysaccharide and DNA", "পলিছেকাৰাইড আৰু DNA"]], 0,
  "Chromatin is a nucleoprotein complex of DNA coiled around histone octamers, forming nucleosomes. The protein component is histone, not lipid or carbohydrate.",
  "ক্ৰ'মেটিন হ'ল DNA আৰু হিষ্ট'ন অক্টামেৰেৰে গঠিত নিউক্লিঅ'প্ৰ'টিন জটিল, যি নিউক্লিঅ'জ'ম গঠন কৰে। প্ৰ'টিন অংশ হিষ্ট'ন, লিপিড বা শৰ্কৰা নহয়।");

add("biology-177",
  "A cell that lacks a membrane-bound nucleus and mitochondria is best described as",
  "আৱৰণেৰে আবদ্ধ নিউক্লিয়াছ আৰু মাইট'কণ্ড্ৰিয়া নথকা কোষক কি বুলি কোৱা হয়",
  [["prokaryotic", "প্ৰকাৰ্য'টিক"], ["eukaryotic", "ইউকাৰ্য'টিক"], ["eukaryotic without organelles", "অংগাণু নোহোৱা ইউকাৰ্য'টিক"], ["multicellular", "বহুকোষীয়"]], 0,
  "Absence of a nuclear envelope and of membrane-bound organelles such as mitochondria is the defining feature of prokaryotes. A eukaryotic cell always has a true nucleus even if some organelles are reduced.",
  "নিউক্লিয় আৱৰণ আৰু মাইট'কণ্ড্ৰিয়াৰ দৰে পৰ্দাবদ্ধ অংগাণুৰ অনুপস্থিতি প্ৰকাৰ্য'টৰ মূল বৈশিষ্ট্য। ইউকাৰ্য'টিক কোষত সদায় প্ৰকৃত নিউক্লিয়াছ থাকে যদিও কিছু অংগাণু হ্ৰাস পায়।");

add("biology-178",
  "The main structural polysaccharide of the plant cell wall is",
  "উদ্ভিদ কোষবেৰৰ মূল গঠনমূলক পলিছেকাৰাইড কি",
  [["cellulose", "চেলুল'জ"], ["starch", "ষ্টাৰ্চ"], ["glycogen", "গ্লাইক'জেন"], ["chitin", "কাইটিন"]], 0,
  "Cellulose microfibrils give the plant wall its tensile strength. Starch and glycogen are storage polysaccharides and chitin builds fungal and arthropod exoskeletons.",
  "চেলুল'জ মাইক্ৰ'ফাইব্ৰিলে উদ্ভিদ বেৰক টান শক্তি দিয়ে। ষ্টাৰ্চ আৰু গ্লাইক'জেন সাঁচনি পলিছেকাৰাইড, আৰু কাইটিনে ভেঁকুৰ আৰু সন্ধিপদৰ বহিঃকংকাল গঠন কৰে।");

add("biology-179",
  "Glycolysis in a eukaryotic cell takes place in the",
  "ইউকাৰ্য'টিক কোষত গ্লাইক'লাইছিস ক'ত হয়",
  [["cytoplasm", "চাইট'প্লাজম"], ["mitochondrial matrix", "মাইট'কণ্ড্ৰিয়াৰ মেট্ৰিক্স"], ["inner mitochondrial membrane", "মাইট'কণ্ড্ৰিয়াৰ অন্তঃপৰ্দা"], ["nucleus", "নিউক্লিয়াছ"]], 0,
  "All ten steps of glycolysis are cytosolic, so the pathway runs without oxygen and without mitochondria. The Krebs cycle and oxidative phosphorylation are the mitochondrial stages.",
  "গ্লাইক'লাইছিসৰ দহোটা স্তৰ চাইট'ছ'লত হয়, সেয়ে পথটো অক্সিজেন আৰু মাইট'কণ্ড্ৰিয়া অবিহনেও চলে। ক্ৰেবছ চক্ৰ আৰু অক্সিডেটিভ ফছফ'ৰিলেচন মাইট'কণ্ড্ৰিয়াৰ স্তৰ।");

add("biology-180",
  "During which phase of the cell cycle does DNA replication occur?",
  "কোষ চক্ৰৰ কোনটো দশাত DNA প্ৰতিলিপন হয়",
  [["S phase", "S দশা"], ["G1 phase", "G১ দশা"], ["G2 phase", "G২ দশা"], ["M phase", "M দশা"]], 0,
  "The S phase is the synthesis phase in which each chromosome is duplicated. G1 and G2 are gap phases of growth, and M phase is the actual division.",
  "S দশা হ'ল সংশ্লেষণ দশা, য'ত প্ৰতিটো ক্ৰ'ম'জ'ম নকল হয়। G১ আৰু G২ বৃদ্ধিৰ অন্তৰাল দশা, আৰু M দশা প্ৰকৃত বিভাজন।");

add("biology-181",
  "The intercellular junction that fuses neighbouring cell membranes into a seal and prevents leakage between them is the",
  "প্ৰতিবেশী কোষৰ পৰ্দা জোৰা লগাই ছীল কৰি তেওঁলোকৰ মাজেৰে নিগৰি যোৱা বন্ধ কৰা সংযোগটো কি",
  [["tight junction", "টাইট জংচন"], ["gap junction", "গেপ জংচন"], ["desmosome", "ডেছম'জ'ম"], ["plasmodesma", "প্লাজম'ডেছমা"]], 0,
  "Tight junctions seal the space between cells so solutes cannot slip through the gap. Gap junctions are channels for ions and desmosomes are rivets for mechanical hold.",
  "টাইট জংচনে কোষৰ মাজৰ খালী ঠাই বন্ধ কৰে যাতে দ্ৰাৱ্য নিগৰি যাব নোৱাৰে। গেপ জংচন আয়নৰ বাবে Channels আৰু ডেছম'জ'ম যান্ত্ৰিক ধৰণৰ কীলক।");

add("biology-182",
  "Peroxisomes are chiefly responsible for",
  "পেৰ'ক্সিছ'ম মূলতঃ কিৰ বাবে দায়ী",
  [["breaking down fatty acids and hydrogen peroxide", "চৰ্বি অ্যাসিড আৰু হাইড্ৰজেন পেৰ'ক্সাইড ভাঙি দিয়া"], ["synthesising ATP", "ATP সংশ্লেষণ"], ["packaging proteins", "প্ৰ'টিন পেকেজিং"], ["storing water", "পানী সাঁচি ৰখা"]], 0,
  "Peroxisomes oxidise long-chain fatty acids and hold catalase, which splits the toxic hydrogen peroxide they generate into water and oxygen. ATP synthesis belongs to mitochondria.",
  "পেৰ'ক্সিছ'মে দীঘল শৃংখলৰ চৰ্বি অ্যাসিড অক্সিডাইজ কৰে আৰু কেটালেজ ৰাখে, যি সৃষ্ট হাইড্ৰজেন পেৰ'ক্সাইডক পানী আৰু অক্সিজেনত ভাঙে। ATP সংশ্লেষণ মাইট'কণ্ড্ৰিয়াৰ কাম।");

add("biology-183",
  "Which organelle is described as the suicidal bag of the cell because it can digest the cell's own components?",
  "কোনটো অংগাণুক কোষৰ নিজৰ অংশ হজম কৰিব পৰাৰ বাবে কোষৰ আত্মহত্যাৰ মোন বোলা হয়",
  [["lysosome", "লাইছ'জ'ম"], ["ribosome", "ৰাইব'জ'ম"], ["peroxisome", "পেৰ'ক্সিছ'ম"], ["centrosome", "চেণ্ট্ৰ'জ'ম"]], 0,
  "Lysosomes hold acid hydrolases and can rupture to digest the cell itself during autolysis, hence the nickname. A peroxisome handles oxidative reactions, not bulk digestion.",
  "লাইছ'জ'মত অ্যাসিড হাইড্ৰ'লেজ থাকে আৰু অট'লাইছিছত ফাটি কোষকেই হজম কৰিব পাৰে, সেয়ে এই নাম। পেৰ'ক্সিছ'মে অক্সিডেটিভ বিক্ৰিয়া চম্ভালে, বৃহৎ হজম নহয়।");

/* ================= genetics-evolution ================= */
useLeaf("genetics-evolution");
add("biology-184",
  "Mendel's law of segregation is also known as the law of",
  "মেণ্ডেলৰ পৃথকীকৰণৰ সূত্ৰক আন কি নামেৰে জনা যায়",
  [["purity of gametes", "গেমেটৰ শুদ্ধতা"], ["independent assortment", "স্বাধীন সজ্জন"], ["dominance", "প্ৰভুত্ব"], ["linkage", "সংযোগ"]], 0,
  "The law says the two alleles of a pair separate during gamete formation so each gamete carries only one, that is, gametes are pure for the factor. Independent assortment is a separate law about two or more gene pairs.",
  "সূত্ৰই কয় যে এযোৰ এলিল গেমেট গঠনৰ সময়ত পৃথক হয়, সেয়ে প্ৰতিটো গেমেটত এটাহে থাকে, অৰ্থাৎ গেমেট কাৰকৰ বাবে শুদ্ধ। স্বাধীন সজ্জন দুটা বা ততোধিক জিনযোৰৰ বেলেগ সূত্ৰ।");

add("biology-185",
  "A cross of an F1 hybrid with its recessive parent is called a",
  "F১ সংকৰক তাৰ অৱশিষ্টাশ্ৰয়ী পিতৃ-মাতৃৰ লগত কৰা সংকৰণক কি বোলা হয়",
  [["test cross", "পৰীক্ষা সংকৰণ"], ["back cross only", "কেৱল পশ্চাৎ সংকৰণ"], ["reciprocal cross", "পৰস্পৰ সংকৰণ"], ["dihybrid cross", "দ্বিসংকৰ সংকৰণ"]], 0,
  "Crossing with the recessive parent reveals the genotype of the hybrid, so it is a test cross. Every test cross is a back cross, but a back cross with the dominant parent would not reveal the genotype.",
  "অৱশিষ্টাশ্ৰয়ী পিতৃ-মাতৃৰ লগত সংকৰণে সংকৰৰ জিন'টাইপ প্ৰকাশ কৰে, সেয়ে ই পৰীক্ষা সংকৰণ। প্ৰতিটো পৰীক্ষা সংকৰণ পশ্চাৎ সংকৰণ, কিন্তু প্ৰভাৱী পিতৃ-মাতৃৰ লগত পশ্চাৎ সংকৰণে জিন'টাইপ নেদেখুৱায়।");

add("biology-186",
  "The phenotypic ratio of the F2 generation in a dihybrid cross with complete dominance is",
  "পূৰ্ণ প্ৰভুত্বৰ দ্বিসংকৰ সংকৰণত F২ বংশৰ ফিন'টাইপিক অনুপাত কিমান",
  [["9 : 3 : 3 : 1", "৯ : ৩ : ৩ : ১"], ["3 : 1", "৩ : ১"], ["1 : 2 : 1", "১ : ২ : ১"], ["1 : 1 : 1 : 1", "১ : ১ : ১ : ১"]], 0,
  "Two independent gene pairs assorting freely give four phenotype classes in 9 : 3 : 3 : 1. The 3 : 1 ratio is monohybrid and 1 : 2 : 1 is a genotypic ratio.",
  "দুটা স্বাধীন জিনযোৰ স্বাধীনভাৱে সজ্জিত হৈ ৯ : ৩ : ৩ : ১ অনুপাতত চাৰিটা ফিন'টাইপ শ্ৰেণী দিয়ে। ৩ : ১ একসংকৰ আৰু ১ : ২ : ১ জিন'টাইপিক অনুপাত।");

add("biology-187",
  "How many autosomes are present in a normal human somatic cell?",
  "স্বাভাৱিক মানৱ দেহকোষত কিমানটা অট'ছ'ম থাকে",
  [["44", "৪৪"], ["46", "৪৬"], ["23", "২৩"], ["22", "২২"]], 0,
  "A somatic cell has 46 chromosomes of which 2 are sex chromosomes, leaving 44 autosomes arranged as 22 pairs. The number 23 is the haploid total including one sex chromosome.",
  "দেহকোষত ৪৬ টা ক্ৰ'ম'জ'ম, তাৰ ২ টা যৌন ক্ৰ'ম'জ'ম, বাকী ৪৪ টা অট'ছ'ম যি ২২ যোৰত সজ্জিত। ২৩ সংখ্যাটো এটা যৌন ক্ৰ'ম'জ'মসহ হেপ্লইড মুঠ।");

add("biology-188",
  "Alternative forms of the same gene occupying the same locus on homologous chromosomes are called",
  "সমসংস্থ ক্ৰ'ম'জ'মৰ একেই স্থানত থকা একেই জিনৰ বিকল্প ৰূপবোৰক কি বোলা হয়",
  [["alleles", "এলিল"], ["codons", "ক'ডন"], ["cistrons", "চিষ্ট্ৰন"], ["operons", "অপেৰন"]], 0,
  "Alleles are the variant forms of one gene at a given locus. A codon is a triplet of mRNA bases, a cistron is a functional genetic unit, and an operon is a cluster of co-regulated bacterial genes.",
  "এলিল এটা নিৰ্দিষ্ট স্থানত থকা এটা জিনৰ বিভিন্ন ৰূপ। ক'ডন mRNA ৰ তিনি আখৰৰ একক, চিষ্ট্ৰন কাৰ্যকৰী জিনীয় একক, আৰু অপেৰন বেক্টেৰিয়াৰ সহ-নিয়ন্ত্ৰিত জিনৰ গোট।");

add("biology-189",
  "An organism carrying two identical alleles for a character is said to be",
  "এটা বৈশিষ্ট্যৰ বাবে দুটা একেই এলিল কঢ়িয়াই নিয়া জীৱক কি বোলা হয়",
  [["homozygous", "সমযুগ্মী"], ["heterozygous", "অসমযুগ্মী"], ["hemizygous", "অৰ্ধযুগ্মী"], ["hybrid", "সংকৰ"]], 0,
  "Identical alleles make the organism homozygous. Heterozygous means two different alleles, and hemizygous describes a single copy as in X-linked genes of males.",
  "একেই এলিলে জীৱক সমযুগ্মী কৰে। অসমযুগ্মী মানে দুটা ভিন্ন এলিল, আৰু অৰ্ধযুগ্মীয়ে এটা মাত্ৰ নকল বুজায় যেনে পুৰুষৰ X-সংযুক্ত জিন।");

add("biology-190",
  "In a DNA molecule adenine pairs with",
  "DNA অণুত এডেনিনে কিহৰ লগত যোৰ বান্ধে",
  [["thymine", "থাইমিন"], ["uracil", "ইউৰাছিল"], ["guanine", "গুৱানিন"], ["cytosine", "চাইট'চিন"]], 0,
  "In DNA the purine adenine pairs with the pyrimidine thymine by two hydrogen bonds. Uracil replaces thymine in RNA, and guanine pairs with cytosine.",
  "DNA ত পিউৰিন এডেনিনে পিৰিমিডিন থাইমিনৰ লগত দুটা হাইড্ৰজেন বন্ধনৰে যোৰ বান্ধে। RNA ত ইউৰাছিলে থাইমিনৰ ঠাই লয়, আৰু গুৱানিনে চাইট'চিনৰ লগত যোৰ বান্ধে।");

add("biology-191",
  "In RNA the base that pairs with adenine is",
  "RNA ত এডেনিনৰ লগত যোৰ বন্ধা ক্ষাৰকটো কি",
  [["uracil", "ইউৰাছিল"], ["thymine", "থাইমিন"], ["guanine", "গুৱানিন"], ["cytosine", "চাইট'চিন"]], 0,
  "RNA carries uracil in place of the thymine found in DNA, so adenine pairs with uracil during transcription and translation.",
  "RNA ত DNA ৰ থাইমিনৰ ঠাইত ইউৰাছিল থাকে, সেয়ে প্ৰতিলিখন আৰু অনুবাদনত এডেনিনে ইউৰাছিলৰ লগত যোৰ বান্ধে।");

add("biology-192",
  "The process by which mRNA is synthesised from a DNA template is called",
  "DNA টেমপ্লেটৰপৰা mRNA সংশ্লেষণ হোৱা প্ৰক্ৰিয়াটোক কি বোলা হয়",
  [["transcription", "প্ৰতিলিখন"], ["translation", "অনুবাদন"], ["replication", "প্ৰতিলিপন"], ["transformation", "ৰূপান্তৰণ"]], 0,
  "Transcription copies the gene into mRNA. Translation then reads the mRNA on ribosomes to build protein, and replication copies the whole DNA molecule.",
  "প্ৰতিলিখনে জিনক mRNA লৈ নকল কৰে। অনুবাদনে তাৰ পিছত ৰাইব'জ'মত mRNA পঢ়ি প্ৰ'টিন গঢ়ে, আৰু প্ৰতিলিপনে গোটেই DNA অণু নকল কৰে।");

add("biology-193",
  "A triplet of bases on mRNA that specifies one amino acid is called a",
  "এটা এমিন' অ্যাসিড নিৰ্দেশ কৰা mRNA ৰ তিনি আখৰৰ এককক কি বোলা হয়",
  [["codon", "ক'ডন"], ["anticodon", "এণ্টিক'ডন"], ["exon", "এক্সন"], ["intron", "ইণ্ট্ৰন"]], 0,
  "A codon is the mRNA triplet read by the ribosome. The anticodon is the complementary triplet on tRNA, while exons and introns are coding and non-coding stretches of a gene.",
  "ক'ডন হ'ল ৰাইব'জ'মে পঢ়া mRNA ৰ তিনি আখৰৰ একক। এণ্টিক'ডন tRNA ৰ পৰিপূৰক একক, আৰু এক্সন আৰু ইণ্ট্ৰন জিনৰ ক'ডিং আৰু অ-ক'ডিং অংশ।");

add("biology-194",
  "Which human blood group illustrates codominance of both alleles?",
  "কোনটো মানৱ ৰক্তগোটে দুয়োটা এলিলৰ সহপ্ৰভুত্ব দেখুৱায়",
  [["AB", "AB"], ["A", "A"], ["B", "B"], ["O", "O"]], 0,
  "In group AB both A and B antigens appear on the red cell, so neither allele masks the other and they are codominant. Group O shows the recessive condition with no antigen.",
  "AB গোটত A আৰু B দুয়োটা এণ্টিজেন লোহিত কণিকাত দেখা যায়, সেয়ে কোনো এলিলে আনটোক ঢাকি নধৰে আৰু তেওঁলোক সহপ্ৰভাৱী। O গোটে এণ্টিজেন নোহোৱা অৱশিষ্টাশ্ৰয়ী অৱস্থা দেখুৱায়।");

add("biology-195",
  "Down syndrome in humans is caused by trisomy of chromosome",
  "মানুহত ডাউন ছিণ্ড্ৰ'ম ক্ৰ'ম'জ'মৰ কিমান নম্বৰটোৰ ট্ৰাইছ'মিৰ বাবে হয়",
  [["21", "২১"], ["18", "১৮"], ["13", "১৩"], ["23", "২৩"]], 0,
  "Down syndrome is trisomy 21, an extra copy of chromosome 21. Trisomy 18 gives Edwards syndrome and trisomy 13 gives Patau syndrome.",
  "ডাউন ছিণ্ড্ৰ'ম হ'ল ট্ৰাইছ'মি ২১, অৰ্থাৎ ২১ নম্বৰ ক্ৰ'ম'জ'মৰ এটা অতিৰিক্ত নকল। ট্ৰাইছ'মি ১৮ এ এডৱাৰ্ডছ আৰু ট্ৰাইছ'মি ১৩ এ পাটাউ ছিণ্ড্ৰ'ম দিয়ে।");

add("biology-196",
  "Colour blindness in humans is inherited as",
  "মানুহত বৰ্ণান্ধতা কেনে ধৰণে উত্তৰাধিকাৰী হয়",
  [["X-linked recessive", "X-সংযুক্ত অৱশিষ্টাশ্ৰয়ী"], ["autosomal dominant", "অট'ছ'মেল প্ৰভাৱী"], ["Y-linked", "Y-সংযুক্ত"], ["autosomal recessive", "অট'ছ'মেল অৱশিষ্টাশ্ৰয়ী"]], 0,
  "The gene sits on the X chromosome and the defect is recessive, so males with one affected X are colour blind while females need both X chromosomes affected. Y carries no counterpart, which is why it is not Y-linked.",
  "জিনটো X ক্ৰ'ম'জ'মত আৰু ত্ৰুটিটো অৱশিষ্টাশ্ৰয়ী, সেয়ে এটা আক্ৰান্ত X থকা পুৰুষ বৰ্ণান্ধ, কিন্তু নাৰীক দুয়োটা X আক্ৰান্ত লাগে। Y ত প্ৰতিসম নাই, সেয়ে Y-সংযুক্ত নহয়।");

add("biology-197",
  "The scientist who proposed the theory of inheritance of acquired characters was",
  "অৰ্জিত বৈশিষ্ট্যৰ উত্তৰাধিকাৰ সূত্ৰ প্ৰস্তাৱ কৰা বিজ্ঞানীজন আছিল",
  [["Lamarck", "লামাৰ্ক"], ["Darwin", "ডাৰউইন"], ["Mendel", "মেণ্ডেল"], ["De Vries", "ডি ভ্ৰিছ"]], 0,
  "Lamarck held that characters gained during life are passed on, which later evidence did not support. Darwin proposed natural selection, Mendel gave the laws of inheritance and De Vries proposed mutation.",
  "লামাৰ্কে কৈছিল জীৱনকালত অৰ্জিত বৈশিষ্ট্য পৰৱৰ্তী বংশলৈ যায়, যি পিছৰ প্ৰমাণে সমৰ্থন নকৰিলে। ডাৰউইনে প্ৰাকৃতিক নিৰ্বাচন, মেণ্ডেলে উত্তৰাধিকাৰৰ সূত্ৰ আৰু ডি ভ্ৰিছে মিউটেচন দিলে।");

add("biology-198",
  "Darwin's finches of the Galapagos Islands, with beaks suited to different foods, illustrate",
  "গালাপাগছ দ্বীপপুঞ্জৰ ডাৰউইনৰ ফিঞ্চবোৰে, বিভিন্ন খাদ্যৰ বাবে উপযুক্ত ঠোঁটসহ, কি দেখুৱায়",
  [["adaptive radiation", "অভিযোজনীয় বিকিৰণ"], ["convergent evolution", "অভিসৰণী বিবৰ্তন"], ["parallel evolution", "সমান্তৰাল বিবৰ্তন"], ["genetic drift", "জিনীয় বিচ্যুতি"]], 0,
  "One ancestral stock radiating into several forms each fitted to a different niche is adaptive radiation. Convergent evolution is the opposite, unrelated lines coming to resemble each other.",
  "এটা পূৰ্বপুৰুষৰ পৰা বিভিন্ন সুকীয়া স্থানৰ বাবে উপযুক্ত বহু ৰূপলৈ বিকিৰণ হোৱাটো অভিযোজনীয় বিকিৰণ। অভিসৰণী বিবৰ্তন তাৰ ওলোটা, অসম্পৰ্কীয় শাখা সাদৃশ্যপূৰ্ণ হোৱা।");

add("biology-199",
  "The wings of a butterfly and the wings of a bat are examples of",
  "পখিলাৰ ডেউকা আৰু বাদুলিৰ ডেউকা কিৰ উদাহৰণ",
  [["analogous organs", "সমকাৰ্যী অংগ"], ["homologous organs", "সমসংস্থ অংগ"], ["vestigial organs", "অৱশিষ্ট অংগ"], ["atavistic organs", "পূৰ্বজ অংগ"]], 0,
  "Both serve flight but differ in origin, the insect wing being a cuticular fold and the bat wing a modified forelimb, so they are analogous and point to convergent evolution. Homologous organs share a common origin with different functions.",
  "দুয়োটাই উৰণৰ কাম কৰে কিন্তু উৎপত্তি বেলেগ — পতংগৰ ডেউকা কিউটিকুলাৰ ভাঁজ আৰু বাদুলিৰ ডেউকা পৰিৱৰ্তিত অগ্ৰপাদ, সেয়ে সমকাৰ্যী আৰু অভিসৰণী বিবৰ্তন দেখুৱায়। সমসংস্থ অংগৰ উৎপত্তি একে কিন্তু কাৰ্য বেলেগ।");

add("biology-200",
  "The fossil that is regarded as a connecting link between reptiles and birds is",
  "সৰীসৃপ আৰু চৰাইৰ মাজৰ সংযোগী কড়ি বুলি গণ্য কৰা জীৱাশ্মটো কি",
  [["Archaeopteryx", "আৰ্কিঅ'প্টেৰিক্স"], ["Dodo", "ড'ড'"], ["Ichthyosaur", "ইকথিঅ'ছৰ"], ["Dinosaur", "ডাইন'ছৰ"]], 0,
  "Archaeopteryx had feathers and wings like a bird but teeth and a long bony tail like a reptile, which is why it is called a connecting link. The dodo was a flightless bird and the ichthyosaur a marine reptile.",
  "আৰ্কিঅ'প্টেৰিক্সত চৰাইৰ দৰে পাখি আৰু ডেউকা আছিল কিন্তু সৰীসৃপৰ দৰে দাঁত আৰু দীঘল হাড়যুক্ত নেজ, সেয়ে ইয়াক সংযোগী কড়ি বোলে। ড'ড' উৰিব নোৱাৰা চৰাই আৰু ইকথিঅ'ছৰ সাগৰীয় সৰীসৃপ।");

add("biology-201",
  "The Hardy-Weinberg principle states that allele frequencies in a population remain constant only when",
  "হাৰ্ডি-ৱেইনবাৰ্গ নীতিয়ে কয় যে জনসংখ্যাত এলিলৰ কম্পনাংক স্থিৰ থাকে কেৱল যেতিয়া",
  [["there is no mutation, migration or selection and mating is random", "মিউটেচন, প্ৰব্ৰজন বা নিৰ্বাচন নাথাকে আৰু মিলন যাদৃচ্ছিক"], ["the population is small", "জনসংখ্যা সৰু"], ["selection is strong", "নিৰ্বাচন প্ৰবল"], ["mutation is frequent", "মিউটেচন সঘন"]], 0,
  "The equilibrium holds only for a large randomly mating population free of mutation, migration and selection. A small population invites drift and strong selection or mutation changes frequencies directly.",
  "সাম্যাৱস্থা কেৱল ডাঙৰ যাদৃচ্ছিকভাৱে মিলনকৰা, মিউটেচন-প্ৰব্ৰজন-নিৰ্বাচনমুক্ত জনসংখ্যাত থাকে। সৰু জনসংখ্যাত বিচ্যুতি হয় আৰু প্ৰবল নিৰ্বাচন বা মিউটেচনে কম্পনাংক পোনপটীয়াকৈ সলনি কৰে।");

add("biology-202",
  "The haploid number of chromosomes in a human gamete is",
  "মানৱ গেমেটত ক্ৰ'ম'জ'মৰ হেপ্লইড সংখ্যা কিমান",
  [["23", "২৩"], ["46", "৪৬"], ["44", "৪৪"], ["22", "২২"]], 0,
  "Meiosis halves the diploid 46 to 23, so each gamete carries 22 autosomes plus one sex chromosome. Fusion at fertilisation restores 46.",
  "মিঅ'ছিছে ডিপ্লইড ৪৬ ক ২৩ লৈ আধা কৰে, সেয়ে প্ৰতিটো গেমেটত ২২ টা অট'ছ'ম আৰু এটা যৌন ক্ৰ'ম'জ'ম থাকে। নিষেচনত মিলি পুনৰ ৪৬ হয়।");

add("biology-203",
  "Which of the following is a chromosomal disorder rather than a single-gene disorder?",
  "তলৰ কোনটো এক-জিনৰ বিকাৰ নহয়, ক্ৰ'ম'জ'মেল বিকাৰ",
  [["Klinefelter syndrome", "ক্লাইনফেল্টাৰ ছিণ্ড্ৰ'ম"], ["Sickle cell anaemia", "কাঁইটীয়া কোষ ৰক্তহীনতা"], ["Haemophilia", "হিম'ফিলিয়া"], ["Phenylketonuria", "ফিনাইলকিট'নিউৰিয়া"]], 0,
  "Klinefelter syndrome is an extra X chromosome, so the defect is in chromosome number. The other three are single-gene defects, sickle cell and phenylketonuria autosomal recessive and haemophilia X-linked recessive.",
  "ক্লাইনফেল্টাৰ ছিণ্ড্ৰ'ম এটা অতিৰিক্ত X ক্ৰ'ম'জ'ম, সেয়ে ত্ৰুটিটো ক্ৰ'ম'জ'ম সংখ্যাত। বাকী তিনিটা এক-জিন ত্ৰুটি — কাঁইটীয়া কোষ আৰু ফিনাইলকিট'নিউৰিয়া অট'ছ'মেল অৱশিষ্টাশ্ৰয়ী, হিম'ফিলিয়া X-সংযুক্ত অৱশিষ্টাশ্ৰয়ী।");

/* ================= general-biology ================= */
useLeaf("general-biology");
add("biology-204",
  "The branch of biology that deals with the study of tissues is called",
  "কলা অধ্যয়ন কৰা জীৱবিজ্ঞানৰ শাখাক কি বোলা হয়",
  [["histology", "হিষ্ট'লজি"], ["cytology", "চাইট'লজি"], ["morphology", "আকৃতিবিজ্ঞান"], ["physiology", "শৰীৰবিজ্ঞান"]], 0,
  "Histology is the study of tissues, cytology of cells, morphology of external form and physiology of functions. The four are distinct levels of organisation.",
  "হিষ্ট'লজি কলাৰ অধ্যয়ন, চাইট'লজি কোষৰ, আকৃতিবিজ্ঞানে বাহ্য ৰূপৰ আৰু শৰীৰবিজ্ঞানে কাৰ্যৰ। এই চাৰিটা সংগঠনৰ পৃথক স্তৰ।");

add("biology-205",
  "The scientific study of the classification of organisms is called",
  "জীৱৰ শ্ৰেণীবিভাগৰ বৈজ্ঞানিক অধ্যয়নক কি বোলা হয়",
  [["taxonomy", "শ্ৰেণীবিভাগ বিজ্ঞান"], ["ecology", "পৰিৱেশ বিজ্ঞান"], ["embryology", "ভ্ৰূণবিজ্ঞান"], ["palaeontology", "জীৱাশ্মবিজ্ঞান"]], 0,
  "Taxonomy covers identification, nomenclature and classification of organisms. Ecology studies organisms and their surroundings, embryology development and palaeontology fossils.",
  "শ্ৰেণীবিভাগ বিজ্ঞানে জীৱ চিনাক্তকৰণ, নামকৰণ আৰু শ্ৰেণীবিভাগ সামৰি লয়। পৰিৱেশ বিজ্ঞানে জীৱ আৰু পৰিৱেশ, ভ্ৰূণবিজ্ঞানে বিকাশ আৰু জীৱাশ্মবিজ্ঞানে জীৱাশ্ম অধ্যয়ন কৰে।");

add("biology-206",
  "In binomial nomenclature the first word of a scientific name denotes the",
  "দ্বিপদ নামকৰণত বৈজ্ঞানিক নামৰ প্ৰথম শব্দই কি সূচায়",
  [["genus", "গণ"], ["species", "প্ৰজাতি"], ["family", "পৰিয়াল"], ["order", "বৰ্গ"]], 0,
  "The first word is the genus and is written with a capital letter, the second is the species in small letters. Family and order are higher ranks that sit above the genus.",
  "প্ৰথম শব্দটো গণ, যি ডাঙৰ আখৰেৰে লিখা হয়, দ্বিতীয়টো প্ৰজাতি সৰু আখৰেৰে। পৰিয়াল আৰু বৰ্গ গণৰ ওপৰৰ উচ্চ শ্ৰেণী।");

add("biology-207",
  "Which of the following is the correct sequence of taxonomic ranks from the largest to the smallest?",
  "তলৰ কোনটো শ্ৰেণীবিভাগৰ শ্ৰেণীসমূহৰ ডাঙৰৰপৰা সৰুলৈ শুদ্ধ ক্ৰম",
  [["Kingdom, Phylum, Class, Order, Family, Genus, Species", "জগত, পৰ্ব, শ্ৰেণী, বৰ্গ, পৰিয়াল, গণ, প্ৰজাতি"], ["Species, Genus, Family, Order, Class, Phylum, Kingdom", "প্ৰজাতি, গণ, পৰিয়াল, বৰ্গ, শ্ৰেণী, পৰ্ব, জগত"], ["Kingdom, Class, Phylum, Family, Order, Genus, Species", "জগত, শ্ৰেণী, পৰ্ব, পৰিয়াল, বৰ্গ, গণ, প্ৰজাতি"], ["Phylum, Kingdom, Order, Class, Genus, Family, Species", "পৰ্ব, জগত, বৰ্গ, শ্ৰেণী, গণ, পৰিয়াল, প্ৰজাতি"]], 0,
  "The accepted hierarchy narrows from kingdom down through phylum, class, order, family and genus to species. Placing class before phylum or order before class breaks the nesting.",
  "স্বীকৃত শ্ৰেণীবিভাগ জগতৰপৰা পৰ্ব, শ্ৰেণী, বৰ্গ, পৰিয়াল, গণ হৈ প্ৰজাতিলৈ সংকীৰ্ণ হয়। শ্ৰেণীক পৰ্বৰ আগত বা বৰ্গক শ্ৰেণীৰ আগত ৰখিলে ক্ৰম ভাঙে।");

add("biology-208",
  "Organisms whose cells contain a true nucleus and membrane-bound organelles belong to the kingdom-level group called",
  "সত্য নিউক্লিয়াছ আৰু পৰ্দাবদ্ধ অংগাণু থকা জীৱই কি জগত-স্তৰৰ গোটত পৰে",
  [["Eukaryota", "ইউকাৰ্য'টা"], ["Bacteria", "বেক্টেৰিয়া"], ["Archaea", "আৰ্কিয়া"], ["Protista only", "কেৱল প্ৰ'টিষ্টা"]], 0,
  "Eukaryota is the domain uniting all cells with a nuclear envelope, which includes protists, fungi, plants and animals. Bacteria and Archaea are prokaryotic, so Protista alone would exclude plants and animals.",
  "ইউকাৰ্য'টা হ'ল সেই ডমেইন যি নিউক্লিয় আৱৰণ থকা সকলো কোষক একত্ৰিত কৰে, য'ত প্ৰ'টিষ্ট, ভেঁকুৰ, উদ্ভিদ আৰু প্ৰাণী পৰে। বেক্টেৰিয়া আৰু আৰ্কিয়া প্ৰকাৰ্য'টিক, সেয়ে কেৱল প্ৰ'টিষ্টা বুলিলে উদ্ভিদ আৰু প্ৰাণী বাদ পৰে।");

add("biology-209",
  "The presence of a notochord at some stage of life is the defining feature of the phylum",
  "জীৱনৰ কোনো এটা স্তৰত ন'ট'কৰ্ড থকাটো কোনটো পৰ্বৰ নিৰ্ণায়ক বৈশিষ্ট্য",
  [["Chordata", "কৰ্ডেটা"], ["Arthropoda", "আৰ্থ্ৰ'প'ডা"], ["Mollusca", "মলাস্কা"], ["Annelida", "এনেলিডা"]], 0,
  "Chordates are defined by a notochord, a dorsal hollow nerve cord, pharyngeal gill slits and a post-anal tail at some stage. Arthropods have jointed limbs and exoskeletons, molluscs a mantle and annelids a segmented body.",
  "কৰ্ডেটাৰ নিৰ্ণায়ক হ'ল কোনো স্তৰত ন'ট'কৰ্ড, পৃষ্ঠীয় hollow স্নায়ু ৰজ্জু, গলবিলীয় ফুলা আৰু পায়ু-পৰৱৰ্তী নেজ। আৰ্থ্ৰ'প'ডত সন্ধিযুক্ত অংগ আৰু বহিঃকংকাল, মলাস্কত মেণ্টল আৰু এনেলিডাত খণ্ডিত দেহ।");

add("biology-210",
  "Which of the following is an example of an organelle-free, non-cellular infectious agent?",
  "তলৰ কোনটো অংগাণুহীন, অকোষীয় সংক্ৰামক কাৰকৰ উদাহৰণ",
  [["Virus", "ভাইৰাছ"], ["Bacterium", "বেক্টেৰিয়া"], ["Yeast", "ঈষ্ট"], ["Protozoan", "প্ৰ'ট'জ'ৱা"]], 0,
  "A virus has no cell, no organelles and no independent metabolism, consisting only of nucleic acid inside a protein coat. Bacteria, yeast and protozoa are all cellular.",
  "ভাইৰাছৰ কোষ, অংগাণু আৰু স্বাধীন বিপাক নাই, কেৱল প্ৰ'টিন আৱৰণত নিউক্লিক অ্যাসিড থাকে। বেক্টেৰিয়া, ঈষ্ট আৰু প্ৰ'ট'জ'ৱা সকলো কোষীয়।");

add("biology-211",
  "The living component of a cell that carries out all metabolic reactions is the",
  "কোষৰ সকলো বিপাকীয় বিক্ৰিয়া সম্পন্ন কৰা জীৱন্ত অংশটো কি",
  [["protoplasm", "প্ৰ'ট'প্লাজম"], ["cell wall", "কোষবেৰ"], ["vacuole", "ৰিক্ততা"], ["extracellular matrix", "বহিঃকোষীয় মেট্ৰিক্স"]], 0,
  "Protoplasm is the collective name for cytoplasm plus nucleus, the living material where metabolism happens. The wall, vacuole contents and matrix are non-living or largely non-living.",
  "প্ৰ'ট'প্লাজম হ'ল চাইট'প্লাজম আৰু নিউক্লিয়াছৰ সমষ্টিগত নাম, য'ত বিপাক ঘটে। বেৰ, ৰিক্ততাৰ ভিতৰৰ বস্তু আৰু মেট্ৰিক্স নিৰ্জীৱ বা প্ৰায় নিৰ্জীৱ।");

add("biology-212",
  "Which of the following shows the correct order of levels of organisation from simplest to most complex?",
  "তলৰ কোনটোৱে সংগঠনৰ স্তৰসমূহৰ সৰলৰপৰা জটিললৈ শুদ্ধ ক্ৰম দেখুৱায়",
  [["Cell, tissue, organ, organ system, organism", "কোষ, কলা, অংগ, অংগ তন্ত্ৰ, জীৱ"], ["Tissue, cell, organism, organ, organ system", "কলা, কোষ, জীৱ, অংগ, অংগ তন্ত্ৰ"], ["Organ, cell, tissue, organism, organ system", "অংগ, কোষ, কলা, জীৱ, অংগ তন্ত্ৰ"], ["Organism, organ, tissue, cell, organ system", "জীৱ, অংগ, কলা, কোষ, অংগ তন্ত্ৰ"]], 0,
  "Complexity rises from cell to tissue, tissue to organ, organ to organ system and finally the whole organism. Any order that puts tissue before cell or organism before organ inverts the nesting.",
  "জটিলতা কোষৰপৰা কলা, কলাৰপৰা অংগ, অংগৰপৰা অংগ তন্ত্ৰ আৰু শেষত গোটেই জীৱলৈ বাঢ়ে। কলাক কোষৰ আগত বা জীৱক অংগৰ আগত ৰখা যিকোনো ক্ৰমে ক্ৰম ওলোটা কৰে।");

add("biology-213",
  "A group of organisms that can interbreed and produce fertile offspring is called a",
  "প্ৰজনন কৰি উৰ্বৰ সন্তান উৎপন্ন কৰিব পৰা জীৱৰ গোটক কি বোলা হয়",
  [["species", "প্ৰজাতি"], ["genus", "গণ"], ["population", "জনসংখ্যা"], ["community", "সম্প্ৰদায়"]], 0,
  "A species is the interbreeding unit that produces fertile offspring. A genus groups related species, a population is one species in one area, and a community is all species in an area.",
  "প্ৰজাতি হ'ল উৰ্বৰ সন্তান উৎপন্ন কৰা প্ৰজননৰ একক। গণে সম্পৰ্কীয় প্ৰজাতি একত্ৰিত কৰে, জনসংখ্যা এটা অঞ্চলৰ এটা প্ৰজাতি, আৰু সম্প্ৰদায় এটা অঞ্চলৰ সকলো প্ৰজাতি।");

add("biology-214",
  "The cell organelle that contains hydrolytic enzymes and functions at an acidic pH is the",
  "অ্যাসিডিক pH ত কাম কৰা আৰু হাইড্ৰ'লিটিক এনজাইম থকা কোষ অংগাণুটো কি",
  [["lysosome", "লাইছ'জ'ম"], ["ribosome", "ৰাইব'জ'ম"], ["chloroplast", "ক্ল'ৰ'প্লাষ্ট"], ["nucleolus", "নিউক্লিঅ'লাছ"]], 0,
  "Lysosomes maintain a pH near 5 and hold acid hydrolases for intracellular digestion. Ribosomes build protein, chloroplasts photosynthesise and the nucleolus makes rRNA.",
  "লাইছ'জ'মে pH প্ৰায় ৫ ৰাখে আৰু অন্তঃকোষীয় হজমৰ বাবে অ্যাসিড হাইড্ৰ'লেজ ধৰি ৰাখে। ৰাইব'জ'মে প্ৰ'টিন গঢ়ে, ক্ল'ৰ'প্লাষ্টে সালোক সংশ্লেষণ কৰে আৰু নিউক্লিঅ'লাছে rRNA বনায়।");

add("biology-215",
  "Which property of water allows insects such as water striders to walk on its surface?",
  "পানীৰ কোনটো ধৰ্মই পানী-খোৱা পতংগৰ দৰে পতংগক ইয়াৰ পৃষ্ঠত খোজ কাঢ়িবলৈ দিয়ে",
  [["surface tension", "পৃষ্ঠ টান"], ["viscosity", "সান্দ্ৰতা"], ["density", "ঘনত্ব"], ["osmosis", "অভিস্ৰৱণ"]], 0,
  "Surface tension arises from cohesion between water molecules at the air-water interface and forms a skin strong enough to support small insects. Viscosity resists flow within the liquid, not at its surface.",
  "পৃষ্ঠ টান বায়ু-পানী সংযোগস্থলত পানী অণুৰ মাজৰ সংসক্তিৰপৰা জন্মে আৰু সৰু পতংগ ধৰি ৰাখিব পৰা ছাল গঢ়ে। সান্দ্ৰতাই তৰলৰ ভিতৰত প্ৰবাহ বাধা দিয়ে, পৃষ্ঠত নহয়।");

add("biology-216",
  "Enzymes are biological catalysts that speed up reactions mainly by",
  "এনজাইমে জৈৱিক অনুঘটক হিচাপে বিক্ৰিয়া দ্ৰুত কৰে মূলতঃ কিৰ দ্বাৰা",
  [["lowering the activation energy", "সক্ৰিয়ণ শক্তি কমাই"], ["raising the temperature", "উষ্ণতা বঢ়াই"], ["increasing the substrate concentration", "অধঃস্তৰৰ ঘনত্ব বঢ়াই"], ["changing the equilibrium constant", "সাম্যাৱস্থা ধ্ৰুৱক সলনি কৰি"]], 0,
  "An enzyme provides an alternative path of lower activation energy, so more molecules can react at body temperature. It does not change the equilibrium position or add heat.",
  "এনজাইমে কম সক্ৰিয়ণ শক্তিৰ বিকল্প পথ দিয়ে, সেয়ে শৰীৰৰ উষ্ণতাত অধিক অণুৱে বিক্ৰিয়া কৰিব পাৰে। ই সাম্যাৱস্থাৰ অৱস্থান নসলায়, তাপো নিদিয়ে।");

add("biology-217",
  "The property of an enzyme by which it acts on only one substrate or a small group of related substrates is called",
  "এনজাইমে কেৱল এটা অধঃস্তৰ বা সৰু সম্পৰ্কীয় গোটত ক্ৰিয়া কৰা ধৰ্মটোক কি বোলা হয়",
  [["specificity", "নিৰ্দিষ্টতা"], ["catalysis", "অনুঘটন"], ["denaturation", "অপ্ৰকৃতিকৰণ"], ["inhibition", "প্ৰতিৰোধ"]], 0,
  "Specificity comes from the shape of the active site, which fits only particular substrates, the lock-and-key or induced-fit idea. Denaturation destroys that shape and abolishes activity.",
  "নিৰ্দিষ্টতা সক্ৰিয় স্থানৰ আকৃতিৰপৰা আহে, যি কেৱল নিৰ্দিষ্ট অধঃস্তৰত খাপ খায়, তলা-চাবি বা প্ৰেৰিত খাপৰ ধাৰণা। অপ্ৰকৃতিকৰণে সেই আকৃতি নষ্ট কৰি কাৰ্য বন্ধ কৰে।");

add("biology-218",
  "Which of the following is a polysaccharide stored in the human liver?",
  "তলৰ কোনটো মানুহৰ যকৃতত সাঁচি ৰখা পলিছেকাৰাইড",
  [["glycogen", "গ্লাইক'জেন"], ["cellulose", "চেলুল'জ"], ["chitin", "কাইটিন"], ["starch", "ষ্টাৰ্চ"]], 0,
  "The liver stores glucose as glycogen and breaks it down again to hold blood sugar steady. Cellulose and chitin are structural, and starch is the plant storage form.",
  "যকৃতই গ্লুক'জক গ্লাইক'জেন হিচাপে সাঁচি ৰাখে আৰু ৰক্ত শৰ্কৰা স্থিৰ ৰাখিবলৈ পুনৰ ভাঙে। চেলুল'জ আৰু কাইটিন গঠনমূলক, আৰু ষ্টাৰ্চ উদ্ভিদৰ সাঁচনি ৰূপ।");

add("biology-219",
  "The nitrogenous base found in DNA but not in RNA is",
  "DNA ত থকা কিন্তু RNA ত নথকা নাইট্ৰজেনযুক্ত ক্ষাৰকটো কি",
  [["thymine", "থাইমিন"], ["uracil", "ইউৰাছিল"], ["adenine", "এডেনিন"], ["guanine", "গুৱানিন"]], 0,
  "Thymine occurs in DNA and uracil replaces it in RNA. Adenine, guanine and cytosine are common to both molecules.",
  "থাইমিন DNA ত থাকে আৰু RNA ত ইয়াৰ ঠাইত ইউৰাছিল থাকে। এডেনিন, গুৱানিন আৰু চাইট'চিন দুয়োটা অণুতেই থাকে।");

add("biology-220",
  "A cell placed in a hypotonic solution will",
  "হাইপ'টনিক দ্ৰৱত ৰখা কোষ এটা কি হ'ব",
  [["swell and may burst", "ফুলি যাব আৰু ফাটিবও পাৰে"], ["shrink and shrivel", "সংকুচিত আৰু শুকাই যাব"], ["remain unchanged", "অপৰিৱৰ্তিত থাকিব"], ["lose its nucleus", "নিউক্লিয়াছ হেৰুৱাব"]], 0,
  "In a hypotonic solution the outside solute concentration is lower, so water enters by osmosis and the cell swells, an animal cell possibly bursting. Shrinking happens in a hypertonic solution.",
  "হাইপ'টনিক দ্ৰৱত বাহিৰৰ দ্ৰাৱ্যৰ ঘনত্ব কম, সেয়ে অভিস্ৰৱণে পানী সোমাই কোষ ফুলে, প্ৰাণী কোষ ফাটিবও পাৰে। সংকোচন হাইপাৰটনিক দ্ৰৱত হয়।");

add("biology-221",
  "Which of the following is not a characteristic of living organisms?",
  "তলৰ কোনটো জীৱৰ বৈশিষ্ট্য নহয়",
  [["Crystallisation", "স্ফটিকীভৱন"], ["Growth", "বৃদ্ধি"], ["Reproduction", "প্ৰজনন"], ["Response to stimuli", "উদ্দীপনাত সঁহাৰি"]], 0,
  "Growth, reproduction, metabolism and response to stimuli are defining features of life. Crystallisation is a physical process that also occurs in non-living matter.",
  "বৃদ্ধি, প্ৰজনন, বিপাক আৰু উদ্দীপনাত সঁহাৰি জীৱনৰ নিৰ্ণায়ক বৈশিষ্ট্য। স্ফটিকীভৱন এটা ভৌতিক প্ৰক্ৰিয়া যি নিৰ্জীৱ পদাৰ্থতো ঘটে।");

add("biology-222",
  "The number of chromosomes in a human gamete and in a human somatic cell respectively is",
  "মানৱ গেমেট আৰু মানৱ দেহকোষত ক্ৰ'ম'জ'মৰ সংখ্যা ক্ৰমে কিমান",
  [["23 and 46", "২৩ আৰু ৪৬"], ["46 and 23", "৪৬ আৰু ২৩"], ["23 and 23", "২৩ আৰু ২৩"], ["46 and 92", "৪৬ আৰু ৯২"]], 0,
  "A gamete is haploid with 23 and a somatic cell diploid with 46, so the zygote returns to 46 after fusion. The reverse order would make gametes diploid.",
  "গেমেট হেপ্লইড ২৩ আৰু দেহকোষ ডিপ্লইড ৪৬, সেয়ে মিলনৰ পিছত জাইগ'ট পুনৰ ৪৬ হয়। ওলোটা ক্ৰমে গেমেটক ডিপ্লইড কৰি দিব।");

add("biology-223",
  "Which one of the following is a vestigial organ in humans?",
  "তলৰ কোনটো মানুহৰ অৱশিষ্ট অংগ",
  [["vermiform appendix", "কৃমিৰূপ পৰিশিষ্ট"], ["liver", "যকৃত"], ["pancreas", "অগ্ন্যাশয়"], ["spleen", "প্লীহা"]], 0,
  "The vermiform appendix is a reduced remnant of the caecum, which is large in herbivores. The liver, pancreas and spleen all carry out active functions.",
  "কৃমিৰূপ পৰিশিষ্ট তৃণভোজী জীৱত ডাঙৰ হোৱা অন্ধনাড়ীৰ হ্ৰাস পোৱা অৱশিষ্ট। যকৃত, অগ্ন্যাশয় আৰু প্লীহা সকলোৱে সক্ৰিয় কাৰ্য কৰে।");

/* ================= microbiology-biotechnology ================= */
useLeaf("microbiology-biotechnology");
add("biology-224",
  "The scientist who first observed and described bacteria under a microscope was",
  "অণুবীক্ষণ যন্ত্ৰৰ তলত প্ৰথমে বেক্টেৰিয়া দেখি বৰ্ণনা কৰা বিজ্ঞানীজন আছিল",
  [["Anton van Leeuwenhoek", "এণ্টন ভান লিউৱেনহুক"], ["Robert Koch", "ৰবাৰ্ট কক"], ["Alexander Fleming", "আলেকজেণ্ডাৰ ফ্লেমিং"], ["Edward Jenner", "এডৱাৰ্ড জেনাৰ"]], 0,
  "Leeuwenhoek ground his own lenses and described bacteria from tooth scrapings in the seventeenth century. Koch isolated pathogens, Fleming found penicillin and Jenner pioneered smallpox vaccination.",
  "লিউৱেনহুকে নিজে লেন্স ঘঁহি সপ্তদশ শতিকাত দাঁতৰ মলমৰপৰা বেক্টেৰিয়া বৰ্ণনা কৰিছিল। ককে ৰোগজীৱ পৃথক কৰিছিল, ফ্লেমিঙে পেনিচিলিন আৰু জেনাৰে বসন্তৰ টীকা আৰম্ভ কৰিছিল।");

add("biology-225",
  "Pasteurisation of milk involves",
  "গাখীৰৰ পেষ্টুৰীকৰণত কি কৰা হয়",
  [["heating to about 63 degrees Celsius for 30 minutes then rapid cooling", "প্ৰায় ৬৩ ডিগ্ৰী ছেলছিয়াছত ৩০ মিনিট গৰম কৰি লগে লগে ঠাণ্ডা কৰা"], ["boiling at 121 degrees Celsius for 15 minutes", "১২১ ডিগ্ৰী ছেলছিয়াছত ১৫ মিনিট উতলোৱা"], ["freezing to minus 20 degrees Celsius", "মাইনাছ ২০ ডিগ্ৰী ছেলছিয়াছত জমা"], ["adding antibiotics", "এণ্টিবায়'টিক যোগ কৰা"]], 0,
  "Pasteurisation is a mild heat treatment, holding milk near 63 degrees Celsius for half an hour or about 72 degrees Celsius briefly, which kills pathogens without spoiling taste. Autoclaving at 121 degrees Celsius sterilises completely.",
  "পেষ্টুৰীকৰণ এটা মৃদু তাপ চিকিৎসা, গাখীৰ প্ৰায় ৬৩ ডিগ্ৰী ছেলছিয়াছত আধা ঘণ্টা বা ৭২ ডিগ্ৰী ছেলছিয়াছত কিছু সময় ৰখা হয়, যিয়ে ৰোগজীৱ মাৰে কিন্তু সোৱাদ নষ্ট নকৰে। ১২১ ডিগ্ৰী ছেলছিয়াছত অট'ক্লেভিঙে সম্পূৰ্ণ জীৱাণুমুক্ত কৰে।");

add("biology-226",
  "Penicillin, the first antibiotic discovered, was obtained from",
  "আৱিষ্কৃত প্ৰথম এণ্টিবায়'টিক পেনিচিলিন কিৰপৰা পোৱা গৈছিল",
  [["Penicillium notatum", "পেনিচিলিয়াম ন'টেটাম"], ["Saccharomyces cerevisiae", "ছেকাৰ'মাইচিছ ছেৰেভিছিয়ে"], ["Escherichia coli", "এছাৰিকিয়া ক'লাই"], ["Lactobacillus", "লেক্ট'বেছিলাছ"]], 0,
  "Fleming noticed that Penicillium notatum inhibited staphylococci, and penicillin came from that mould. Yeast is used in fermentation, E. coli is a gut bacterium and Lactobacillus curdles milk.",
  "ফ্লেমিঙে লক্ষ্য কৰিলে যে পেনিচিলিয়াম ন'টেটামে ষ্টেফাইল'কক্কাই বাধা দিয়ে, আৰু সেই ভেঁকুৰৰপৰা পেনিচিলিন আহিল। ঈষ্ট সেঁচত, E. ক'লাই অন্ত্ৰৰ বেক্টেৰিয়া আৰু লেক্ট'বেছিলাছে গাখীৰ টেঙা কৰে।");

add("biology-227",
  "In the production of curd from milk the bacterium chiefly responsible is",
  "গাখীৰৰপৰা দৈ বনোৱাত মূলতঃ দায়ী বেক্টেৰিয়াটো কি",
  [["Lactobacillus", "লেক্ট'বেছিলাছ"], ["Rhizobium", "ৰাইজ'বিয়াম"], ["Azotobacter", "এজ'ট'বেক্টৰ"], ["Clostridium", "ক্ল'ষ্ট্ৰিডিয়াম"]], 0,
  "Lactobacillus converts lactose into lactic acid, which curdles the milk protein. Rhizobium and Azotobacter fix nitrogen in soil, and Clostridium includes anaerobic pathogens.",
  "লেক্ট'বেছিলাছে লেক্ট'জক লেক্টিক অ্যাসিডলৈ ৰূপান্তৰ কৰে, যি গাখীৰৰ প্ৰ'টিন জমাই দিয়ে। ৰাইজ'বিয়াম আৰু এজ'ট'বেক্টৰে মাটিত নাইট্ৰজেন সংযুক্ত কৰে, আৰু ক্ল'ষ্ট্ৰিডিয়ামত অৱায়বিক ৰোগজীৱ থাকে।");

add("biology-228",
  "Rhizobium bacteria in the root nodules of leguminous plants are important because they",
  "শিম্বজাতীয় উদ্ভিদৰ মূল গাঁঠিত থকা ৰাইজ'বিয়াম বেক্টেৰিয়া গুৰুত্বপূৰ্ণ কাৰণ সেয়া",
  [["fix atmospheric nitrogen into usable compounds", "বায়ুমণ্ডলীয় নাইট্ৰজেনক ব্যৱহাৰযোগ্য যৌগলৈ সংযুক্ত কৰে"], ["decompose dead matter", "মৃত পদাৰ্থ পচায়"], ["produce antibiotics", "এণ্টিবায়'টিক উৎপন্ন কৰে"], ["cause fermentation", "সেঁচ ঘটায়"]], 0,
  "Rhizobium lives symbiotically in nodules and reduces atmospheric nitrogen to ammonia with the enzyme nitrogenase, enriching the soil. Decomposition is the work of saprophytes and fermentation of yeast or bacteria.",
  "ৰাইজ'বিয়াম গাঁঠিত সহজীৱীভাৱে থাকে আৰু নাইট্ৰ'জিনেজ এনজাইমৰে বায়ুমণ্ডলীয় নাইট্ৰজেনক এম'নিয়ালৈ বিজাৰিত কৰি মাটি সমৃদ্ধ কৰে। পচন মৃতজীৱীৰ কাম আৰু সেঁচ ঈষ্ট বা বেক্টেৰিয়াৰ।");

add("biology-229",
  "Which of the following diseases is caused by a virus?",
  "তলৰ কোনটো ৰোগ ভাইৰাছৰ দ্বাৰা হয়",
  [["Rabies", "জলাতংক"], ["Cholera", "কলেৰা"], ["Tetanus", "ধনুষ্টংকাৰ"], ["Typhoid", "টাইফইড"]], 0,
  "Rabies is caused by a rhabdovirus transmitted through animal bites. Cholera, tetanus and typhoid are all bacterial diseases.",
  "জলাতংক ৰেবড'ভাইৰাছৰ দ্বাৰা হয় যি জন্তুৰ কামোৰৰ জৰিয়তে বিয়পে। কলেৰা, ধনুষ্টংকাৰ আৰু টাইফইড সকলো বেক্টেৰিয়াৰ ৰোগ।");

add("biology-230",
  "The microorganism used in the commercial production of ethanol from molasses is",
  "মিছামৰপৰা এথানলৰ বাণিজ্যিক উৎপাদনত ব্যৱহৃত অণুজীৱটো কি",
  [["Saccharomyces cerevisiae", "ছেকাৰ'মাইচিছ ছেৰেভিছিয়ে"], ["Penicillium", "পেনিচিলিয়াম"], ["Lactobacillus", "লেক্ট'বেছিলাছ"], ["Nitrosomonas", "নাইট্ৰ'ছ'ম'নাছ"]], 0,
  "Yeast ferments sugar to ethanol and carbon dioxide through the anaerobic pathway, which is the basis of the alcohol industry. Penicillium makes antibiotics and Nitrosomonas nitrifies ammonia in soil.",
  "ঈষ্টে অৱায়বিক পথেৰে শৰ্কৰাক এথানল আৰু কাৰ্বন ডাইঅক্সাইডলৈ সেঁচ কৰে, যি মদ শিল্পৰ ভিত্তি। পেনিচিলিয়ামে এণ্টিবায়'টিক আৰু নাইট্ৰ'ছ'ম'নাছে মাটিত এম'নিয়া নাইট্ৰিফাই কৰে।");

add("biology-231",
  "Sterilisation by autoclave is achieved by",
  "অট'ক্লেভৰ দ্বাৰা জীৱাণুমুক্তকৰণ কিৰ দ্বাৰা হয়",
  [["steam under pressure at 121 degrees Celsius", "১২১ ডিগ্ৰী ছেলছিয়াছত চাপযুক্ত ভাপ"], ["dry heat at 60 degrees Celsius", "৬০ ডিগ্ৰী ছেলছিয়াছত শুকান তাপ"], ["ultraviolet light alone", "কেৱল অতি-বেঙুনীয়া ৰশ্মি"], ["filtration through paper", "কাগজেৰে পৰিস্ৰাৱণ"]], 0,
  "An autoclave uses saturated steam at about 121 degrees Celsius under pressure for 15 to 20 minutes, which kills spores as well as vegetative cells. Dry heat at 60 degrees or paper filtration does not sterilise reliably.",
  "অট'ক্লেভে চাপৰ তলত প্ৰায় ১২১ ডিগ্ৰী ছেলছিয়াছৰ সম্পৃক্ত ভাপ ১৫ ৰপৰা ২০ মিনিট ব্যৱহাৰ কৰে, যিয়ে বীজাণু আৰু কাৰ্যকৰী কোষ দুয়ো মাৰে। ৬০ ডিগ্ৰী শুকান তাপ বা কাগজ পৰিস্ৰাৱণে নিৰ্ভৰযোগ্যভাৱে জীৱাণুমুক্ত নকৰে।");

add("biology-232",
  "In genetic engineering, the small circular DNA molecules used to carry a foreign gene into a host cell are called",
  "জিনীয় অভিযান্ত্ৰিকীত বিদেশী জিন ধৰি পোষক কোষলৈ নিয়া সৰু বৃত্তীয় DNA অণুবোৰক কি বোলা হয়",
  [["plasmids", "প্লাজমিড"], ["chromosomes", "ক্ৰ'ম'জ'ম"], ["nucleosomes", "নিউক্লিঅ'জ'ম"], ["ribosomes", "ৰাইব'জ'ম"]], 0,
  "Plasmids are extrachromosomal circular DNA in bacteria used as cloning vectors. Chromosomes are the main genetic material, nucleosomes are DNA-histone units and ribosomes are protein factories.",
  "প্লাজমিড বেক্টেৰিয়াৰ ক্ৰ'ম'জ'ম-বহিঃস্থ বৃত্তীয় DNA, যি ক্ল'নিং ভেক্টৰ হিচাপে ব্যৱহৃত হয়। ক্ৰ'ম'জ'ম মূল জিনীয় পদাৰ্থ, নিউক্লিঅ'জ'ম DNA-হিষ্ট'ন একক আৰু ৰাইব'জ'ম প্ৰ'টিন কাৰখানা।");

add("biology-233",
  "Restriction endonucleases are enzymes that",
  "ৰিষ্ট্ৰিকচন এণ্ড'নিউক্লিয়েজ এনে এনজাইম যি",
  [["cut DNA at specific base sequences", "নিৰ্দিষ্ট ক্ষাৰক ক্ৰমত DNA কাটে"], ["join two DNA fragments", "দুটা DNA খণ্ড জোৰে"], ["synthesise RNA from DNA", "DNA ৰপৰা RNA সংশ্লেষণ কৰে"], ["unwind the double helix", "দুটাৰ্গ ফিতা খোলা কৰে"]], 0,
  "Restriction enzymes recognise a specific palindromic sequence and cut there, giving the molecular scissors of cloning. Joining fragments is the job of DNA ligase.",
  "ৰিষ্ট্ৰিকচন এনজাইমে এটা নিৰ্দিষ্ট পেলিনড্ৰ'মিক ক্ৰম চিনি তাত কাটে, যি ক্ল'নিঙৰ আণৱিক কেঁচি। খণ্ড জোৰা কাম DNA লাইগেজৰ।");

add("biology-234",
  "DNA ligase is used in genetic engineering to",
  "জিনীয় অভিযান্ত্ৰিকীত DNA লাইগেজ কিৰ বাবে ব্যৱহৃত হয়",
  [["join DNA fragments by forming phosphodiester bonds", "ফছফ'ডাইএষ্টাৰ বন্ধন গঠন কৰি DNA খণ্ড জোৰে"], ["cut DNA at specific sites", "নিৰ্দিষ্ট স্থানত DNA কাটে"], ["separate DNA by size", "আকৃতি অনুসৰি DNA পৃথক কৰে"], ["amplify DNA", "DNA বঢ়ায়"]], 0,
  "Ligase seals the sugar-phosphate backbone between fragments, completing a recombinant molecule. Cutting is done by restriction enzymes and amplification by polymerase chain reaction.",
  "লাইগেজে খণ্ডৰ মাজত শৰ্কৰা-ফছফেট মেৰুদণ্ড জোৰে, যি পুনঃসংযোজিত অণু সম্পূৰ্ণ কৰে। কটা ৰিষ্ট্ৰিকচন এনজাইমে আৰু বঢ়োৱা পলিমাৰেজ শৃংখল বিক্ৰিয়াই কৰে।");

add("biology-235",
  "Gel electrophoresis separates DNA fragments on the basis of their",
  "জেল ইলেক্ট্ৰ'ফৰেছিছে DNA খণ্ড কি ভিত্তিত পৃথক কৰে",
  [["size", "আকৃতি"], ["base sequence", "ক্ষাৰক ক্ৰম"], ["colour", "ৰং"], ["charge only", "কেৱল আধান"]], 0,
  "Smaller fragments travel further through the gel mesh than larger ones, so fragments sort by length. All DNA carries a similar negative charge, so charge alone cannot separate them.",
  "সৰু খণ্ডে জেল জালৰ মাজেৰে ডাঙৰতকৈ বেছি দূৰলৈ যায়, সেয়ে খণ্ড দীঘ অনুসৰি সজ্জিত হয়। সকলো DNA ত প্ৰায় একে ঋণাত্মক আধান থাকে, সেয়ে কেৱল আধানে পৃথক নকৰে।");

add("biology-236",
  "Tissue culture is based on the principle that",
  "কলা প্ৰচৰ্চা কি নীতিত আধাৰিত",
  [["a single cell can regenerate a whole plant under suitable conditions", "উপযুক্ত অৱস্থাত এটা কোষে গোটেই উদ্ভিদ পুনৰ্জীৱিত কৰিব পাৰে"], ["cells lose the ability to divide in culture", "প্ৰচৰ্চাত কোষে বিভাজনৰ ক্ষমতা হেৰুৱায়"], ["only reproductive cells can be cultured", "কেৱল প্ৰজনন কোষ প্ৰচৰ্চা কৰিব পাৰি"], ["plants cannot be cloned", "উদ্ভিদ ক্ল'ন কৰিব নোৱাৰি"]], 0,
  "The technique rests on totipotency, the ability of a plant cell to give rise to a complete plant given the right nutrients and hormones. Animal cells are far more restricted in this respect.",
  "এই কৌশল ট'টিপ'টেন্সিত আধাৰিত, অৰ্থাৎ সঠিক পুষ্টি আৰু হৰম'ন দিলে এটা উদ্ভিদ কোষে সম্পূৰ্ণ উদ্ভিদ জন্মাব পাৰে। প্ৰাণী কোষ এই ক্ষেত্ৰত বহু বেছি সীমাবদ্ধ।");

add("biology-237",
  "The bacterium that lives in the human intestine and helps in the synthesis of vitamin K is",
  "মানুহৰ অন্ত্ৰত বাস কৰি ভিটামিন K সংশ্লেষণত সহায় কৰা বেক্টেৰিয়াটো কি",
  [["Escherichia coli", "এছাৰিকিয়া ক'লাই"], ["Clostridium tetani", "ক্ল'ষ্ট্ৰিডিয়াম টেটানি"], ["Vibrio cholerae", "ভিব্ৰিঅ' কলেৰি"], ["Mycobacterium tuberculosis", "মাইক'বেক্টেৰিয়াম টিউবাৰকুল'ছিছ"]], 0,
  "E. coli is part of the normal gut flora and contributes to vitamin K synthesis. The other three are pathogens causing tetanus, cholera and tuberculosis.",
  "E. ক'লাই স্বাভাৱিক অন্ত্ৰৰ অনুজীৱৰ অংশ আৰু ভিটামিন K সংশ্লেষণত অৰিহণা দিয়ে। বাকী তিনিটা ক্ৰমে ধনুষ্টংকাৰ, কলেৰা আৰু যক্ষ্মাৰ ৰোগজীৱ।");

add("biology-238",
  "Which of the following is a product of fermentation by yeast that is used in baking?",
  "তলৰ কোনটো ঈষ্টৰ সেঁচৰ ফল যি বেকিঙত ব্যৱহৃত হয়",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["oxygen", "অক্সিজেন"], ["nitrogen", "নাইট্ৰজেন"], ["hydrogen sulphide", "হাইড্ৰজেন ছালফাইড"]], 0,
  "The carbon dioxide released by yeast fermentation forms bubbles that make bread dough rise. Ethanol also forms but escapes during baking.",
  "ঈষ্টৰ সেঁচত ওলোৱা কাৰ্বন ডাইঅক্সাইডে বুৰবুৰণি গঢ়ি পাউৰুটিত খমিৰ উঠায়। এথানলো সৃষ্টি হয় কিন্তু বেকিংত উৰি যায়।");

add("biology-239",
  "The term biotechnology in its modern sense chiefly refers to",
  "আধুনিক অৰ্থত জীৱপ্ৰযুক্তি শব্দই মূলতঃ কি সূচায়",
  [["the use of living systems or their parts to make useful products", "উপযোগী সামগ্ৰী বনাবলৈ জীৱন্ত তন্ত্ৰ বা তাৰ অংশ ব্যৱহাৰ"], ["the study of fossils", "জীৱাশ্ম অধ্যয়ন"], ["the classification of animals", "প্ৰাণীৰ শ্ৰেণীবিভাগ"], ["the chemical analysis of soil", "মাটিৰ ৰাসায়নিক বিশ্লেষণ"]], 0,
  "Modern biotechnology covers genetic engineering, cell culture and enzyme technology applied to produce medicines, crops and industrial chemicals. Fossil study and classification belong to other branches.",
  "আধুনিক জীৱপ্ৰযুক্তিয়ে জিনীয় অভিযান্ত্ৰিকী, কলা প্ৰচৰ্চা আৰু এনজাইম প্ৰযুক্তি সামৰি ঔষধ, শস্য আৰু শিল্প ৰসায়ন উৎপাদনত ব্যৱহৃত হয়। জীৱাশ্ম অধ্যয়ন আৰু শ্ৰেণীবিভাগ অন্য শাখাৰ।");

add("biology-240",
  "Vaccines work by",
  "টীকাই কেনেকৈ কাম কৰে",
  [["stimulating the body to produce antibodies without causing the disease", "ৰোগ নঘটাই শৰীৰক এণ্টিবডি উৎপাদনলৈ উদ্দীপিত কৰি"], ["killing all bacteria in the blood", "ৰক্তৰ সকলো বেক্টেৰিয়া মাৰি"], ["supplying ready-made antibodies permanently", "সদায় থকাকৈ সাজু এণ্টিবডি যোগান ধৰি"], ["replacing damaged organs", "ক্ষতিগ্ৰস্ত অংগ সলনি কৰি"]], 0,
  "A vaccine presents a weakened or inactivated antigen so the immune system makes antibodies and memory cells, giving protection on later exposure. Ready-made antibodies give only short-term passive immunity.",
  "টীকাই দুৰ্বল বা নিষ্ক্ৰিয় এণ্টিজেন দিয়ে, যাতে ৰোগ প্ৰতিৰক্ষা তন্ত্ৰই এণ্টিবডি আৰু স্মৃতি কোষ বনায়, পিছত সংস্পৰ্শত সুৰক্ষা দিয়ে। সাজু এণ্টিবডিয়ে কেৱল অলপ সময়ৰ নিষ্ক্ৰিয় প্ৰতিৰক্ষা দিয়ে।");

add("biology-241",
  "Which of the following organisms is used as a biofertiliser in paddy fields?",
  "তলৰ কোনটো জীৱ ধানপথাৰত জৈৱ সাৰ হিচাপে ব্যৱহৃত হয়",
  [["Azolla", "এজ'লা"], ["Penicillium", "পেনিচিলিয়াম"], ["Plasmodium", "প্লাজম'ডিয়াম"], ["Trypanosoma", "ট্ৰাইপেন'ছ'মা"]], 0,
  "Azolla is an aquatic fern that harbours nitrogen-fixing cyanobacteria in its leaf cavities and is grown with paddy to add nitrogen. Plasmodium and Trypanosoma are parasites and Penicillium a mould.",
  "এজ'লা এটা জলজ ফাৰ্ন যি পাতৰ গহ্বৰত নাইট্ৰজেন সংযুক্তকাৰী ছায়েন'বেক্টেৰিয়া ৰাখে আৰু ধানৰ লগত নাইট্ৰজেন যোগ দিবলৈ খেতি কৰা হয়। প্লাজম'ডিয়াম আৰু ট্ৰাইপেন'ছ'মা পৰজীৱী আৰু পেনিচিলিয়াম এটা ভেঁকুৰ।");

add("biology-242",
  "Bacillus thuringiensis is used in agriculture because it produces",
  "বেছিলাছ থুৰিঞ্জিয়েন্সিছ কৃষিত ব্যৱহৃত হয় কাৰণ ই উৎপন্ন কৰে",
  [["a protein toxic to certain insect larvae", "কিছু পতংগ পলুৰ বাবে বিষাক্ত প্ৰ'টিন"], ["a growth hormone for plants", "উদ্ভিদৰ বাবে বৃদ্ধি হৰম'ন"], ["an antibiotic for humans", "মানুহৰ বাবে এণ্টিবায়'টিক"], ["a nitrogen-fixing enzyme", "নাইট্ৰজেন সংযুক্তকাৰী এনজাইম"]], 0,
  "The bacterium makes crystal proteins that are toxic to the larvae of certain insects such as bollworms, so its genes are used in Bt crops. It does not fix nitrogen or supply hormones.",
  "বেক্টেৰিয়াটোৱে ক্ৰিষ্টেল প্ৰ'টিন বনায় যি ব'লৱৰ্মৰ দৰে কিছু পতংগৰ পলুৰ বাবে বিষাক্ত, সেয়ে ইয়াৰ জিন Bt শস্যত ব্যৱহৃত হয়। ই নাইট্ৰজেন সংযুক্ত বা হৰম'ন যোগান নধৰে।");

add("biology-243",
  "The organism that causes fermentation of idli and dosa batter is chiefly",
  "ইডলি আৰু ড'ছা মিশ্ৰণৰ সেঁচ ঘটাৰ বাবে মূলতঃ দায়ী জীৱটো কি",
  [["Leuconostoc and yeasts acting together", "লিউক'ন'ষ্টক আৰু ঈষ্ট একেলগে"], ["Penicillium only", "কেৱল পেনিচিলিয়াম"], ["Rhizobium", "ৰাইজ'বিয়াম"], ["Nitrosomonas", "নাইট্ৰ'ছ'ম'নাছ"]], 0,
  "Batter fermentation is a mixed process in which Leuconostoc produces acids and yeasts raise gas, giving the spongy texture. A single mould or a nitrogen-fixing bacterium cannot do both.",
  "মিশ্ৰণৰ সেঁচ এটা মিশ্ৰিত প্ৰক্ৰিয়া, য'ত লিউক'ন'ষ্টকে অ্যাসিড আৰু ঈষ্টে গেছ উৎপন্ন কৰি স্পঞ্জৰ দৰে গঠন দিয়ে। এটা ভেঁকুৰ বা নাইট্ৰজেন সংযুক্তকাৰী বেক্টেৰিয়াই দুয়োটা কৰিব নোৱাৰে।");

add("biology-244",
  "Which of the following is an example of a single-cell protein source used as animal feed?",
  "তলৰ কোনটো পশু খাদ্য হিচাপে ব্যৱহৃত এককোষ প্ৰ'টিনৰ উদাহৰণ",
  [["Spirulina", "স্পাইৰুলিনা"], ["Paddy straw", "ধানৰ খেৰ"], ["Molasses", "মিছাম"], ["Limestone", "চূণশিল"]], 0,
  "Spirulina is a cyanobacterium rich in protein and grown as a feed and food supplement. Straw and molasses are carbohydrate feeds and limestone is a mineral supplement.",
  "স্পাইৰুলিনা এটা ছায়েন'বেক্টেৰিয়া যি প্ৰ'টিনেৰে চহকী আৰু খাদ্য আৰু পুষ্টি যোগান হিচাপে খেতি কৰা হয়। খেৰ আৰু মিছাম কাৰ্ব'হাইড্ৰেট খাদ্য আৰু চূণশিল খনিজ যোগান।");

add("biology-245",
  "The enzyme used in the polymerase chain reaction to synthesise new DNA strands is",
  "পলিমাৰেজ শৃংখল বিক্ৰিয়াত নতুন DNA ফিতা সংশ্লেষণত ব্যৱহৃত এনজাইমটো কি",
  [["Taq polymerase", "টেক পলিমাৰেজ"], ["DNA ligase", "DNA লাইগেজ"], ["restriction enzyme", "ৰিষ্ট্ৰিকচন এনজাইম"], ["amylase", "এমাইলেজ"]], 0,
  "Taq polymerase from a hot-spring bacterium survives the high denaturation temperature of each cycle. Ligase joins fragments and restriction enzymes cut, so neither can extend a new strand.",
  "উষ্ণ ঝৰণাৰ বেক্টেৰিয়াৰ টেক পলিমাৰেজে প্ৰতিটো চক্ৰৰ উচ্চ অপ্ৰকৃতিকৰণ উষ্ণতা সহ্য কৰে। লাইগেজে খণ্ড জোৰে আৰু ৰিষ্ট্ৰিকচন এনজাইমে কাটে, সেয়ে কোনেও নতুন ফিতা বঢ়াব নোৱাৰে।");

add("biology-246",
  "Which of the following is a viral disease of plants?",
  "তলৰ কোনটো উদ্ভিদৰ ভাইৰাছ ৰোগ",
  [["Tobacco mosaic", "তামোল ম'জাইক"], ["Rust of wheat", "গমৰ ৰাষ্ট"], ["Late blight of potato", "আলুৰ পলমীয়া ধ্বংস"], ["Smut of rice", "ধানৰ স্মাট"]], 0,
  "Tobacco mosaic is caused by tobacco mosaic virus, the first virus ever discovered. Rust, late blight and smut are fungal diseases.",
  "তামোল ম'জাইক তামোল ম'জাইক ভাইৰাছৰ দ্বাৰা হয়, যি আৱিষ্কৃত প্ৰথম ভাইৰাছ। ৰাষ্ট, পলমীয়া ধ্বংস আৰু স্মাট ভেঁকুৰৰ ৰোগ।");

add("biology-247",
  "A bacteriophage is a virus that infects",
  "বেক্টেৰিঅ'ফেজ এটা ভাইৰাছ যি সংক্ৰমিত কৰে",
  [["bacteria", "বেক্টেৰিয়া"], ["plants", "উদ্ভিদ"], ["animals", "প্ৰাণী"], ["fungi", "ভেঁকুৰ"]], 0,
  "The name means bacterium-eater, and bacteriophages attach to bacterial cells and inject their nucleic acid. Viruses of plants and animals carry different names and host ranges.",
  "নামটোৰ অৰ্থ বেক্টেৰিয়া-ভক্ষক, আৰু বেক্টেৰিঅ'ফেজে বেক্টেৰিয়া কোষত লাগি নিউক্লিক অ্যাসিড সুমুৱাই দিয়ে। উদ্ভিদ আৰু প্ৰাণীৰ ভাইৰাছৰ নাম আৰু পোষক পৰিসৰ বেলেগ।");

add("biology-248",
  "The main advantage of using microorganisms in industrial production is that they",
  "শিল্প উৎপাদনত অণুজীৱ ব্যৱহাৰৰ মূল সুবিধা কি",
  [["multiply rapidly and can be grown on cheap raw materials", "দ্ৰুতভাৱে বাঢ়ে আৰু সস্তা কেঁচা সামগ্ৰীত খেতি কৰিব পাৰি"], ["never mutate", "কেতিয়াও পৰিৱৰ্তিত নহয়"], ["require no nutrients", "পুষ্টিৰ প্ৰয়োজন নাই"], ["produce only one product each", "প্ৰতিটোৱে কেৱল এটা সামগ্ৰী উৎপাদন কৰে"]], 0,
  "Short generation time and the ability to use agricultural and industrial waste make microbial fermentation economical. Microbes do mutate, need nutrients and often give several products.",
  "চুটি বংশানুক্ৰম সময় আৰু কৃষি তথা শিল্প বৰ্জিত সামগ্ৰী ব্যৱহাৰৰ ক্ষমতাই অণুজীৱ সেঁচক লাভজনক কৰে। অণুজীৱ পৰিৱৰ্তিত হয়, পুষ্টি লাগে আৰু প্ৰায়ে কেইবাটাও সামগ্ৰী দিয়ে।");

/* ================= animal-zoology ================= */
useLeaf("animal-zoology");
add("biology-249",
  "Animals in which the coelom is lined partly by mesoderm and partly by endoderm are called",
  "যি প্ৰাণীত ছিল'মৰ কিছুমান অংশ মেছ'ডাৰ্মে আৰু কিছুমান এণ্ড'ডাৰ্মে আৱৰি থাকে তেওঁলোকক কি বোলা হয়",
  [["pseudocoelomates", "ছিউড'ছিল'মেট"], ["true coelomates", "প্ৰকৃত ছিল'মেট"], ["acoelomates", "এছিল'মেট"], ["diploblastic", "দ্বিস্তৰী"]], 0,
  "A pseudocoelom is a body cavity not fully lined by mesoderm, as in roundworms. True coelomates have a mesoderm-lined cavity and acoelomates such as flatworms have none.",
  "ছিউড'ছিল'ম এনে দেহ গহ্বৰ যি সম্পূৰ্ণৰূপে মেছ'ডাৰ্মেৰে আৱৰা নহয়, যেনে গোলকৃমিত। প্ৰকৃত ছিল'মেটত মেছ'ডাৰ্মেৰে আৱৰা গহ্বৰ থাকে আৰু চেপেটা কৃমিৰ দৰে এছিল'মেটত একো নাথাকে।");

add("biology-250",
  "The phylum characterised by a mantle, a muscular foot and usually a shell is",
  "মেণ্টল, পেশীবহুল ভৰি আৰু সাধাৰণতে খোলা থকা পৰ্বটো কি",
  [["Mollusca", "মলাস্কা"], ["Annelida", "এনেলিডা"], ["Arthropoda", "আৰ্থ্ৰ'প'ডা"], ["Echinodermata", "ইকাইন'ডাৰ্মাটা"]], 0,
  "Molluscs share a soft body with a mantle that secretes the shell, a muscular foot for movement and a visceral mass. Annelids are segmented worms and echinoderms show five-ray symmetry.",
  "মলাস্কৰ কোমল দেহত এটা মেণ্টল থাকে যি খোলা স্ৰাৱ কৰে, গমনৰ বাবে পেশীবহুল ভৰি আৰু অন্ত্ৰীয় ভৰ। এনেলিডা খণ্ডিত কৃমি আৰু ইকাইন'ডাৰ্মাটাত পঞ্চ-ৰশ্মি প্ৰতিসমতা থাকে।");

add("biology-251",
  "Water vascular system and tube feet are characteristic of the phylum",
  "জল পৰিবহন তন্ত্ৰ আৰু নলী-পদ কোনটো পৰ্বৰ বৈশিষ্ট্য",
  [["Echinodermata", "ইকাইন'ডাৰ্মাটা"], ["Mollusca", "মলাস্কা"], ["Porifera", "পৰিফেৰা"], ["Coelenterata", "ছিলেণ্টাৰেটা"]], 0,
  "Echinoderms such as starfish use a water vascular system ending in tube feet for locomotion and feeding. Sponges have a canal system and coelenterates have stinging cells.",
  "তাৰামাছৰ দৰে ইকাইন'ডাৰ্মে গমন আৰু আহাৰ গ্ৰহণৰ বাবে নলী-পদত শেষ হোৱা জল পৰিবহন তন্ত্ৰ ব্যৱহাৰ কৰে। স্পঞ্জত নলী তন্ত্ৰ আৰু ছিলেণ্টাৰেটাত দংশন কোষ থাকে।");

add("biology-252",
  "The largest phylum in the animal kingdom, with jointed appendages and a chitinous exoskeleton, is",
  "সন্ধিযুক্ত উপাংগ আৰু কাইটিনযুক্ত বহিঃকংকাল থকা প্ৰাণী জগতৰ আটাইতকৈ ডাঙৰ পৰ্বটো কি",
  [["Arthropoda", "আৰ্থ্ৰ'প'ডা"], ["Mollusca", "মলাস্কা"], ["Chordata", "কৰ্ডেটা"], ["Annelida", "এনেলিডা"]], 0,
  "Arthropods account for well over half of all described animal species and are marked by jointed limbs, a chitinous exoskeleton and a segmented body. Chordates are far fewer in number.",
  "আৰ্থ্ৰ'প'ডে বৰ্ণিত প্ৰাণী প্ৰজাতিৰ আধাতকৈও বেছি আৰু সন্ধিযুক্ত অংগ, কাইটিন বহিঃকংকাল আৰু খণ্ডিত দেহৰ দ্বাৰা চিহ্নিত। কৰ্ডেটাৰ সংখ্যা বহু কম।");

add("biology-253",
  "Which of the following is a warm-blooded animal?",
  "তলৰ কোনটো উষ্ণ ৰক্তৰ প্ৰাণী",
  [["Pigeon", "পাৰ"], ["Frog", "ভেকুলী"], ["Snake", "সাপ"], ["Rohu fish", "ৰৌ মাছ"]], 0,
  "Birds and mammals keep a constant body temperature, so the pigeon is warm-blooded. Frogs, snakes and fish are cold-blooded and their temperature follows the surroundings.",
  "চৰাই আৰু স্তন্যপায়ীয়ে দেহৰ উষ্ণতা স্থিৰ ৰাখে, সেয়ে পাৰ উষ্ণ ৰক্তৰ। ভেকুলী, সাপ আৰু মাছ শীতল ৰক্তৰ আৰু তেওঁলোকৰ উষ্ণতা পৰিৱেশ অনুসৰি সলনি হয়।");

add("biology-254",
  "The heart of a fish has",
  "মাছৰ হৃদয়ত কিমানটা কোঠা থাকে",
  [["two chambers", "দুটা কোঠা"], ["three chambers", "তিনিটা কোঠা"], ["four chambers", "চাৰিটা কোঠা"], ["one chamber", "এটা কোঠা"]], 0,
  "A fish heart has one atrium and one ventricle, so two chambers, and it pumps only deoxygenated blood. Amphibians have three chambers and birds and mammals four.",
  "মাছৰ হৃদয়ত এটা অলিন্দ আৰু এটা নিলয়, অৰ্থাৎ দুটা কোঠা, আৰু ই কেৱল অক্সিজেনহীন ৰক্ত পাম্প কৰে। উভচৰত তিনিটা আৰু চৰাই-স্তন্যপায়ীত চাৰিটা কোঠা।");

add("biology-255",
  "The respiratory pigment present in the blood of earthworm is",
  "কেঁচুৰ ৰক্তত থকা শ্বসন ৰঞ্জকটো কি",
  [["haemoglobin", "হিম'গ্লবিন"], ["haemocyanin", "হিম'ছায়ানিন"], ["chlorocruorin", "ক্ল'ৰ'ক্ৰুৱ'ৰিন"], ["none", "একো নাই"]], 0,
  "Earthworm blood carries haemoglobin dissolved in the plasma, which gives it a reddish colour. Haemocyanin is the copper-based pigment of many molluscs and arthropods.",
  "কেঁচুৰ ৰক্তই প্লাজমাত দ্ৰৱীভূত হিম'গ্লবিন কঢ়িয়ায়, যিয়ে ইয়াক ৰঙচুৱা ৰূপ দিয়ে। হিম'ছায়ানিন বহু মলাস্ক আৰু আৰ্থ্ৰ'প'ডৰ তামভিত্তিক ৰঞ্জক।");

add("biology-256",
  "Which group of vertebrates shows a three-chambered heart and is adapted to both water and land?",
  "কোনটো মেৰুদণ্ডী গোটত তিনি কোঠাৰ হৃদয় থাকে আৰু পানী আৰু মাটি দুয়োটাতে খাপ খায়",
  [["Amphibia", "উভচৰ"], ["Reptilia", "সৰীসৃপ"], ["Pisces", "মৎস্য"], ["Aves", "পক্ষী"]], 0,
  "Amphibians have two atria and one ventricle, and they breed in water while living on land. Reptiles have a partly divided ventricle, fish two chambers and birds four.",
  "উভচৰত দুটা অলিন্দ আৰু এটা নিলয় থাকে, আৰু তেওঁলোকে মাটিত থাকি পানীত প্ৰজনন কৰে। সৰীসৃপৰ নিলয় আংশিকভাৱে বিভক্ত, মাছৰ দুটা কোঠা আৰু চৰাইৰ চাৰিটা।");

add("biology-257",
  "Which of the following animals shows external fertilisation?",
  "তলৰ কোনটো প্ৰাণীত বাহ্যিক নিষেচন হয়",
  [["Frog", "ভেকুলী"], ["Cow", "গৰু"], ["Hen", "কুকুৰা"], ["Human", "মানুহ"]], 0,
  "In most amphibians the eggs and sperm are shed into water and fertilisation happens outside the body. Cows, hens and humans all fertilise internally.",
  "বহু উভচৰত ডিম্ব আৰু শুক্ৰাণু পানীত নিক্ষেপ কৰা হয় আৰু নিষেচন দেহৰ বাহিৰত হয়। গৰু, কুকুৰা আৰু মানুহত নিষেচন অন্তঃস্থ।");

add("biology-258",
  "The excretory unit of an insect is the",
  "পতংগৰ ৰেচন এককটো কি",
  [["Malpighian tubule", "মালপিঘিয়ান নলিকা"], ["nephron", "নেফ্ৰন"], ["flame cell", "শিখা কোষ"], ["nephridium", "নেফ্ৰিডিয়াম"]], 0,
  "Insects remove nitrogenous waste through Malpighian tubules that open into the gut. Nephridia occur in annelids, flame cells in flatworms and nephrons in vertebrates.",
  "পতংগই মালপিঘিয়ান নলিকাৰ জৰিয়তে নাইট্ৰজেনযুক্ত বৰ্জন আঁতৰায়, যি অন্ত্ৰত খোলে। নেফ্ৰিডিয়া এনেলিডাত, শিখা কোষ চেপেটা কৃমিত আৰু নেফ্ৰন মেৰুদণ্ডীত।");

add("biology-259",
  "Which of the following is a marsupial mammal?",
  "তলৰ কোনটো থলীযুক্ত স্তন্যপায়ী",
  [["Kangaroo", "কাংগাৰু"], ["Whale", "তিমি"], ["Bat", "বাদুলি"], ["Pangolin", "বনৰৌ"]], 0,
  "Kangaroos rear their young in a pouch, which is the marsupial condition. Whales, bats and pangolins are placental mammals.",
  "কাংগাৰুৱে পোৱালি মোনাত ৰাখি ডাঙৰ কৰে, যি থলীযুক্ত অৱস্থা। তিমি, বাদুলি আৰু বনৰৌ নাভিযুক্ত স্তন্যপায়ী।");

add("biology-260",
  "The animal group in which the body is radially symmetrical and diploblastic, with stinging cells, is",
  "দেহ বিকিৰণ প্ৰতিসম আৰু দ্বিস্তৰী, দংশন কোষ থকা প্ৰাণী গোটটো কি",
  [["Coelenterata", "ছিলেণ্টাৰেটা"], ["Platyhelminthes", "প্লেটিহেলমিন্থিছ"], ["Annelida", "এনেলিডা"], ["Arthropoda", "আৰ্থ্ৰ'প'ডা"]], 0,
  "Coelenterates such as Hydra and jellyfish have radial symmetry, two germ layers and cnidoblasts for stinging. Flatworms and annelids are bilaterally symmetrical.",
  "হাইড্ৰা আৰু জেলীমাছৰ দৰে ছিলেণ্টাৰেটত বিকিৰণ প্ৰতিসমতা, দুটা জাৰ্ম স্তৰ আৰু দংশনৰ বাবে নিড'ব্লাষ্ট থাকে। চেপেটা কৃমি আৰু এনেলিডা দ্বিপাৰ্শ্ব প্ৰতিসম।");

/* ================= human-anatomy ================= */
useLeaf("human-anatomy");
add("biology-261",
  "The number of pairs of ribs in the human body is",
  "মানুহৰ শৰীৰত পঞ্জৰ কিমান যোৰ",
  [["12", "১২"], ["10", "১০"], ["14", "১৪"], ["24", "২৪"]], 0,
  "There are 12 pairs, that is 24 ribs in all, of which the last two pairs are floating ribs. Twenty-four is the count of individual ribs, not of pairs.",
  "১২ যোৰ, অৰ্থাৎ মুঠ ২৪ খন পঞ্জৰ, যাৰ শেষৰ দুযোৰ ওপঙা পঞ্জৰ। ২৪ হ'ল পৃথক পঞ্জৰৰ সংখ্যা, যোৰৰ নহয়।");

add("biology-262",
  "The joint at the shoulder and the hip, which allows movement in all directions, is a",
  "কান্ধ আৰু নিতম্বৰ সংযোগ, যি সকলো দিশত গতি কৰিব দিয়ে, সেয়া কি ধৰণৰ সংযোগ",
  [["ball and socket joint", "গোলক আৰু গহ্বৰ সংযোগ"], ["hinge joint", "কব্জা সংযোগ"], ["pivot joint", "অক্ষ সংযোগ"], ["gliding joint", "সৰণ সংযোগ"]], 0,
  "A rounded head fitting into a cup-shaped cavity gives the ball and socket joint its wide range of movement. Hinge joints such as the elbow allow motion in one plane only.",
  "গোলাকাৰ মূৰ গাঁতৰ দৰে গহ্বৰত বহি গোলক-গহ্বৰ সংযোগক বহল গতিৰ পৰিসৰ দিয়ে। কিলাকুটিৰ দৰে কব্জা সংযোগে কেৱল এটা সমতলত গতি দিয়ে।");

add("biology-263",
  "The hardest substance in the human body is",
  "মানুহৰ শৰীৰৰ আটাইতকৈ কঠিন পদাৰ্থ কি",
  [["enamel of the tooth", "দাঁতৰ এনামেল"], ["bone of the skull", "কপালৰ হাড়"], ["cartilage of the knee", "আঁঠুৰ উপাস্থি"], ["nail", "নখ"]], 0,
  "Tooth enamel is about ninety-six percent mineral and is harder than bone. Skull bone, cartilage and nail all contain more organic matter and are softer.",
  "দাঁতৰ এনামেল প্ৰায় ষোল্ল শতাংশ খনিজ আৰু হাড়তকৈ কঠিন। কপালৰ হাড়, উপাস্থি আৰু নখত জৈৱ পদাৰ্থ বেছি আৰু কম কঠিন।");

add("biology-264",
  "The total number of teeth in an adult human is",
  "এজন প্ৰাপ্তবয়স্ক মানুহৰ মুঠ দাঁতৰ সংখ্যা কিমান",
  [["32", "৩২"], ["28", "২৮"], ["20", "২০"], ["36", "৩৬"]], 0,
  "An adult has 32 permanent teeth including four wisdom teeth. The deciduous set has only 20, and 28 is the count before the wisdom teeth erupt.",
  "প্ৰাপ্তবয়স্কৰ ৩২ টা স্থায়ী দাঁত থাকে, য'ত চাৰিটা জ্ঞান দাঁত। দুগ্ধ দাঁতৰ গোটত কেৱল ২০ টা, আৰু জ্ঞান দাঁত ওলোৱাৰ আগতে ২৮ টা।");

add("biology-265",
  "The membrane that covers the lungs is called the",
  "ফুসফুস ঢাকি ৰখা পৰ্দাক কি বোলা হয়",
  [["pleura", "প্লিউৰা"], ["pericardium", "পেৰিকাৰ্ডিয়াম"], ["peritoneum", "পেৰিট'নিয়াম"], ["meninges", "মেনিনজেছ"]], 0,
  "The pleura is the double membrane around each lung. The pericardium encloses the heart, the peritoneum lines the abdomen and the meninges cover the brain and cord.",
  "প্লিউৰা প্ৰতিটো ফুসফুসৰ চাৰিওফালৰ দুহৰা পৰ্দা। পেৰিকাৰ্ডিয়ামে হৃদয়, পেৰিট'নিয়ামে উদৰ আৰু মেনিনজেছে মগজু আৰু ৰজ্জু ঢাকে।");

add("biology-266",
  "The structure that connects a bone to a bone at a joint is a",
  "সংযোগস্থলত হাড়ক হাড়ৰ লগত সংযোগ কৰা গঠনটো কি",
  [["ligament", "লিগামেণ্ট"], ["tendon", "টেণ্ডন"], ["cartilage", "উপাস্থি"], ["fascia", "ফেছিয়া"]], 0,
  "Ligaments bind bone to bone and hold joints stable, while tendons attach muscle to bone. Cartilage cushions the joint surface rather than tying bones together.",
  "লিগামেণ্টে হাড়ক হাড়ৰ লগত বান্ধি সংযোগ স্থিৰ ৰাখে, আৰু টেণ্ডনে পেশীক হাড়ত লগায়। উপাস্থিয়ে সংযোগ পৃষ্ঠক গদী দিয়ে, হাড় বন্ধা নহয়।");

add("biology-267",
  "The human skeleton is divided into which two main parts?",
  "মানুহৰ কংকাল কিমানটা মূল ভাগত বিভক্ত",
  [["axial and appendicular", "অক্ষীয় আৰু উপাংগীয়"], ["cranial and spinal", "কপালীয় আৰু মেৰুদণ্ডীয়"], ["thoracic and pelvic", "বক্ষীয় আৰু শ্ৰোণীয়"], ["upper and lower", "ওপৰ আৰু তল"]], 0,
  "The axial skeleton covers the skull, vertebral column and rib cage, while the appendicular skeleton covers the limb bones and girdles. The other divisions name parts, not the two main systems.",
  "অক্ষীয় কংকালত কৰ'ট, মেৰুদণ্ড আৰু পঞ্জৰ পিঞ্জৰ পৰে, আৰু উপাংগীয় কংকালত অংগৰ হাড় আৰু কৰন্ধ পৰে। বাকী ভাগবোৰে অংশৰ নাম দিয়ে, মূল দুটা তন্ত্ৰ নহয়।");

add("biology-268",
  "The gland that is both an exocrine and an endocrine gland is the",
  "যিটো গ্ৰন্থি একে সময়তে বহিঃস্ৰাৱী আৰু অন্তঃস্ৰাৱী",
  [["pancreas", "অগ্ন্যাশয়"], ["thyroid", "থাইৰয়ড"], ["adrenal", "এড্ৰিনেল"], ["sweat gland", "ঘাম গ্ৰন্থি"]], 0,
  "The pancreas sends digestive enzymes through a duct to the gut and also releases insulin and glucagon into the blood. Thyroid, adrenal and sweat glands are purely endocrine or purely exocrine.",
  "অগ্ন্যাশয়ে নলীৰে পাচক এনজাইম অন্ত্ৰলৈ পঠায় আৰু ৰক্তলৈ ইনছুলিন আৰু গ্লুকাগন এৰি দিয়ে। থাইৰয়ড, এড্ৰিনেল আৰু ঘাম গ্ৰন্থি কেৱল অন্তঃস্ৰাৱী বা কেৱল বহিঃস্ৰাৱী।");

add("biology-269",
  "The part of the brain that controls balance and coordination of movement is the",
  "ভাৰসাম্য আৰু গতিৰ সমন্বয় নিয়ন্ত্ৰণ কৰা মগজুৰ অংশটো কি",
  [["cerebellum", "চেৰেবেলাম"], ["cerebrum", "চেৰেব্ৰাম"], ["medulla oblongata", "মেডুলা অব্লংগাটা"], ["hypothalamus", "হাইপ'থেলামাছ"]], 0,
  "The cerebellum smooths and coordinates voluntary movement and maintains posture and balance. The cerebrum handles thought, and the medulla controls breathing and heartbeat.",
  "চেৰেবেলামে ঐচ্ছিক গতি মসৃণ আৰু সমন্বিত কৰে আৰু ভঙ্গি তথা ভাৰসাম্য ৰাখে। চেৰেব্ৰামে চিন্তা চম্ভালে, আৰু মেডুলাই শ্বাস আৰু হৃৎস্পন্দন নিয়ন্ত্ৰণ কৰে।");

add("biology-270",
  "The retina of the eye contains which two types of light-sensitive cells?",
  "চকুৰ ৰেটিনাত কেনে দুপ্ৰকাৰৰ পোহৰ-সংবেদী কোষ থাকে",
  [["rods and cones", "ৰড আৰু ক'ন"], ["cilia and flagella", "চিলিয়া আৰু ফ্লেজেলা"], ["rods and rods only", "কেৱল ৰড"], ["neurons and nephrons", "নিউৰন আৰু নেফ্ৰন"]], 0,
  "Rods work in dim light and give black-and-white vision, while cones need bright light and give colour. Both are photoreceptors present together in the retina.",
  "ৰডে ম্লান পোহৰত কাম কৰি ক'লা-বগা দৃষ্টি দিয়ে, আৰু ক'নে উজ্জ্বল পোহৰ লাগি ৰং দিয়ে। দুয়োটা ৰেটিনাত একেলগে থকা পোহৰ-গ্ৰাহী।");

add("biology-271",
  "The functional unit of the lungs where gaseous exchange takes place is the",
  "ফুসফুসৰ য'ত গেছ বিনিময় হয় তাৰ কাৰ্যকৰী এককটো কি",
  [["alveolus", "এলভিঅ'লাছ"], ["nephron", "নেফ্ৰন"], ["neuron", "নিউৰন"], ["villus", "ভিলাছ"]], 0,
  "Alveoli are thin-walled sacs wrapped in capillaries, giving a huge surface for oxygen and carbon dioxide exchange. Nephrons belong to the kidney and villi to the small intestine.",
  "এলভিঅ'লাছ কেশিকা নলীৰে মেৰ খোৱা পাতল বেৰৰ মোনা, যি অক্সিজেন আৰু কাৰ্বন ডাইঅক্সাইড বিনিময়ৰ বাবে বিশাল পৃষ্ঠ দিয়ে। নেফ্ৰন বৃক্কৰ আৰু ভিলাছ ক্ষুদ্ৰান্ত্ৰৰ।");

add("biology-272",
  "The vertebral column of an adult human consists of",
  "প্ৰাপ্তবয়স্ক মানুহৰ মেৰুদণ্ডত কিমানটা কশেৰুক থাকে",
  [["33 vertebrae in the child, fused to 26 in the adult", "শিশুত ৩৩ টা, প্ৰাপ্তবয়স্কত ২৬ টালৈ জোৰা লগা"], ["26 vertebrae at all ages", "সকলো বয়সত ২৬ টা"], ["12 vertebrae only", "কেৱল ১২ টা"], ["40 vertebrae", "৪০ টা"]], 0,
  "A child has 33 separate vertebrae, but the sacral and coccygeal ones fuse so the adult column counts as 26. Saying 26 at all ages ignores the fusion.",
  "শিশুত ৩৩ টা পৃথক কশেৰুক থাকে, কিন্তু ত্ৰিকাস্থি আৰু অনুত্ৰিকাস্থিৰবোৰ জোৰা লাগে, সেয়ে প্ৰাপ্তবয়স্কৰ মেৰুদণ্ড ২৬ টা গণ্য হয়। সকলো বয়সতে ২৬ বুলিলে জোৰা লগাটো উপেক্ষা কৰে।");

/* ================= plant-botany ================= */
useLeaf("plant-botany");
add("biology-273",
  "The tissue that conducts water and dissolved minerals upward in a plant is",
  "উদ্ভিদত ওপৰমুৱাকৈ পানী আৰু দ্ৰৱীভূত খনিজ পৰিবহন কৰা কলাটো কি",
  [["xylem", "জাইলেম"], ["phloem", "ফ্ল'এম"], ["cambium", "কেম্বিয়াম"], ["epidermis", "এপিডাৰ্মিছ"]], 0,
  "Xylem vessels and tracheids carry water and minerals from the root to the shoot. Phloem carries sugars, cambium makes new vascular tissue and epidermis is the outer covering.",
  "জাইলেম বাহিকা আৰু ট্ৰেকিডে মূলৰপৰা কাণ্ডলৈ পানী আৰু খনিজ কঢ়িয়ায়। ফ্ল'এমে শৰ্কৰা, কেম্বিয়ামে নতুন ভাস্কুলাৰ কলা বনায় আৰু এপিডাৰ্মিছ বাহিৰৰ আৱৰণ।");

add("biology-274",
  "The loss of water as vapour from the aerial parts of a plant is called",
  "উদ্ভিদৰ বায়বীয় অংশৰপৰা ভাপ হিচাপে পানী হেৰুওৱাক কি বোলা হয়",
  [["transpiration", "বাষ্পোৎসৰ্জন"], ["respiration", "শ্বসন"], ["guttation", "নিঃস্ৰৱণ"], ["translocation", "স্থানান্তৰণ"]], 0,
  "Transpiration is loss of water vapour, mostly through stomata, and it pulls the water column up. Guttation is loss of liquid water droplets from leaf tips.",
  "বাষ্পোৎসৰ্জন মূলতঃ ৰন্ধ্ৰৰে পানীৰ ভাপ হেৰুওৱা আৰু ই পানীৰ স্তম্ভ ওপৰলৈ টানে। নিঃস্ৰৱণ পাতৰ আগৰপৰা জুলীয়া পানীৰ টোপাল হেৰুওৱা।");

add("biology-275",
  "The process by which plants lose liquid water droplets from the tips of leaves is called",
  "উদ্ভিদে পাতৰ আগৰপৰা জুলীয়া পানীৰ টোপাল হেৰুওৱা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["guttation", "নিঃস্ৰৱণ"], ["transpiration", "বাষ্পোৎসৰ্জন"], ["exudation", "ৰসক্ষৰণ"], ["imbibition", "অৱশোষণ"]], 0,
  "Guttation releases liquid droplets through hydathodes when root pressure is high. Transpiration releases vapour, so the two differ in the state of the water lost.",
  "মূল চাপ বেছি হ'লে নিঃস্ৰৱণে হাইডাথ'ডৰ জৰিয়তে জুলীয়া টোপাল এৰে। বাষ্পোৎসৰ্জনে ভাপ এৰে, সেয়ে দুয়োটা হেৰুওৱা পানীৰ অৱস্থাত বেলেগ।");

add("biology-276",
  "The male reproductive part of a flower is the",
  "ফুলৰ পুং প্ৰজনন অংগটো কি",
  [["stamen", "পুংকেশৰ"], ["carpel", "গৰ্ভকেশৰ"], ["sepal", "বৃতি"], ["petal", "দল"]], 0,
  "The stamen consists of an anther and a filament and produces pollen. The carpel is the female part, while sepals and petals are accessory whorls.",
  "পুংকেশৰত পৰাগপুট আৰু পুংদণ্ড থাকে আৰু পৰাগ উৎপন্ন কৰে। গৰ্ভকেশৰ মাদী অংশ, আৰু বৃতি তথা দল সহায়ক চক্ৰ।");

add("biology-277",
  "Double fertilisation, in which one male gamete fuses with the egg and another with two polar nuclei, occurs in",
  "দুটা পুং গেমেটৰ এটা ডিম্বৰ লগত আৰু আনটো দুটা ধ্ৰুৱক নিউক্লিয়াছৰ লগত মিলা দ্বিনিষেচন ক'ত ঘটে",
  [["angiosperms", "আৱৃতবীজী"], ["gymnosperms", "অনাবৃতবীজী"], ["bryophytes", "ব্ৰায়'ফাইট"], ["pteridophytes", "টেৰিড'ফাইট"]], 0,
  "Double fertilisation is unique to flowering plants and produces both the embryo and the triploid endosperm. Gymnosperms lack it, so they form endosperm before fertilisation.",
  "দ্বিনিষেচন কেৱল সপুষ্পক উদ্ভিদৰ নিজস্ব আৰু ই ভ্ৰূণ আৰু ত্ৰিগুণ এণ্ড'স্পাৰ্ম দুয়োটা উৎপন্ন কৰে। অনাবৃতবীজীত ই নাই, সেয়ে তেওঁলোকে নিষেচনৰ আগতে এণ্ড'স্পাৰ্ম গঢ়ে।");

add("biology-278",
  "The green alga from which agar is obtained is",
  "যি শেলাইৰপৰা আগৰ পোৱা যায়",
  [["Gelidium", "জেলিডিয়াম"], ["Spirogyra", "স্পাইৰ'গাইৰা"], ["Ulothrix", "ইউলথ্ৰিক্স"], ["Chlamydomonas", "ক্লেমাইড'ম'নাছ"]], 0,
  "Agar is extracted from red algae such as Gelidium and Gracilaria for use in culture media. Spirogyra, Ulothrix and Chlamydomonas are green algae used in studies, not agar sources.",
  "আগ জেলিডিয়াম আৰু গ্ৰেছিলেৰিয়াৰ দৰে ৰঙা শেলাইৰপৰা উলিয়াই কলা মাধ্যমত ব্যৱহাৰ কৰা হয়। স্পাইৰ'গাইৰা, ইউলথ্ৰিক্স আৰু ক্লেমাইড'ম'নাছ অধ্যয়নত ব্যৱহৃত সেউজ শেলাই, আগৰ উৎস নহয়।");

add("biology-279",
  "The plant hormone responsible for cell elongation and phototropism is",
  "কোষ দীঘল হোৱা আৰু পোহৰ-অভিমুখিতাৰ বাবে দায়ী উদ্ভিদ হৰম'নটো কি",
  [["auxin", "অক্সিন"], ["abscisic acid", "এবছিছিক অ্যাসিড"], ["ethylene", "ইথাইলিন"], ["cytokinin", "ছাইট'কাইনিন"]], 0,
  "Auxin accumulates on the shaded side and makes those cells elongate, bending the shoot towards light. Abscisic acid closes stomata and ethylene ripens fruit.",
  "অক্সিন ছাঁ পৰা ফালে জমা হৈ সেই কোষবোৰ দীঘল কৰে, যিয়ে কাণ্ড পোহৰলৈ বেঁকা কৰে। এবছিছিক অ্যাসিডে ৰন্ধ্ৰ বন্ধ কৰে আৰু ইথাইলিনে ফল পকায়।");

add("biology-280",
  "The plant hormone that promotes fruit ripening is",
  "ফল পকোৱাত সহায় কৰা উদ্ভিদ হৰম'নটো কি",
  [["ethylene", "ইথাইলিন"], ["auxin", "অক্সিন"], ["gibberellin", "জিবেৰেলিন"], ["cytokinin", "ছাইট'কাইনিন"]], 0,
  "Ethylene is a gaseous hormone that hastens ripening and is used commercially to ripen bananas and tomatoes. Auxin and gibberellin promote growth rather than ripening.",
  "ইথাইলিন এটা গেছীয় হৰম'ন যি পকন ত্বৰান্বিত কৰে আৰু কল আৰু বিলাহী পকাবলৈ বাণিজ্যিকভাৱে ব্যৱহৃত হয়। অক্সিন আৰু জিবেৰেলিনে বৃদ্ধি বঢ়ায়, পকন নহয়।");

add("biology-281",
  "Rhizome, corm, tuber and bulb are all examples of",
  "ৰাইজ'ম, কৰ্ম, কন্দ আৰু বাল্ব সকলো কিৰ উদাহৰণ",
  [["underground stem modifications", "ভূগৰ্ভস্থ কাণ্ডৰ ৰূপান্তৰ"], ["root modifications", "মূলৰ ৰূপান্তৰ"], ["leaf modifications", "পাতৰ ৰূপান্তৰ"], ["flower modifications", "ফুলৰ ৰূপান্তৰ"]], 0,
  "All four are swollen underground stems that store food and bear nodes and buds, which is why they can give rise to new plants. Root tubers and leaf spines are separate modifications.",
  "চাৰিওটা স্ফীত ভূগৰ্ভস্থ কাণ্ড যি খাদ্য সাঁচি ৰাখে আৰু গাঁঠি তথা কলি ধৰে, সেয়ে ইহঁতৰপৰা নতুন উদ্ভিদ হ'ব পাৰে। মূল কন্দ আৰু পাতৰ কাঁইট বেলেগ ৰূপান্তৰ।");

add("biology-282",
  "The region of the root where water and mineral absorption takes place is the",
  "মূলৰ যি অঞ্চলত পানী আৰু খনিজ শোষণ হয়",
  [["zone of maturation, bearing root hairs", "পৰিপক্ব অঞ্চল, মূল ৰোমযুক্ত"], ["root cap", "মূল ঢাকনি"], ["meristematic zone", "বিভাজনমূলক অঞ্চল"], ["zone of elongation", "দীৰ্ঘীভৱন অঞ্চল"]], 0,
  "Root hairs in the zone of maturation greatly increase the absorbing surface. The root cap protects the tip and the meristematic zone divides to lengthen the root.",
  "পৰিপক্ব অঞ্চলৰ মূল ৰোমে শোষণ পৃষ্ঠ বহু বঢ়ায়। মূল ঢাকনিয়ে আগটো ৰক্ষা কৰে আৰু বিভাজনমূলক অঞ্চলে বিভাজিত হৈ মূল দীঘল কৰে।");

add("biology-283",
  "Which of the following is a dicotyledonous plant?",
  "তলৰ কোনটো দ্বিবীজপত্ৰী উদ্ভিদ",
  [["Mustard", "সৰিয়হ"], ["Rice", "ধান"], ["Wheat", "গম"], ["Maize", "মাকৈ"]], 0,
  "Mustard has two cotyledons, a tap root and reticulate leaf venation. Rice, wheat and maize are monocots with one cotyledon and parallel venation.",
  "সৰিয়হত দুটা বীজপত্ৰ, মূলা মূল আৰু জালিকাৰ নাড়ী বিন্যাস থাকে। ধান, গম আৰু মাকৈ একবীজপত্ৰী, য'ত এটা বীজপত্ৰ আৰু সমান্তৰাল নাড়ী বিন্যাস।");

add("biology-284",
  "The phenomenon in which the opening of stomata is promoted by a rise in the potassium ion content of guard cells is called",
  "ৰক্ষী কোষত পটাছিয়াম আয়ন বাঢ়িলে ৰন্ধ্ৰ খোলা পৰিঘটনাটোক কি বোলা হয়",
  [["stomatal opening by ion uptake", "আয়ন গ্ৰহণে ৰন্ধ্ৰ খোলা"], ["wilting", "ম্লান হোৱা"], ["photorespiration", "পোহৰশ্বসন"], ["imbibition", "অৱশোষণ"]], 0,
  "Potassium ions enter guard cells, water follows osmotically, the cells become turgid and the pore opens. Wilting is the opposite condition of low turgor.",
  "পটাছিয়াম আয়ন ৰক্ষী কোষত সোমায়, পানী অভিস্ৰৱণে অনুসৰণ কৰে, কোষ স্ফীত হয় আৰু ৰন্ধ্ৰ খোলে। ম্লান হোৱা কম স্ফীতিৰ ওলোটা অৱস্থা।");

add("biology-285",
  "Which of the following is a carnivorous plant?",
  "তলৰ কোনটো মাংসভোজী উদ্ভিদ",
  [["Pitcher plant", "কলসী উদ্ভিদ"], ["Sunflower", "সূৰ্যমুখী"], ["Tulsi", "তুলসী"], ["Banyan", "বৰগছ"]], 0,
  "The pitcher plant traps insects in a fluid-filled pitcher and digests them to obtain nitrogen. Sunflower, tulsi and banyan are ordinary photosynthetic plants.",
  "কলসী উদ্ভিদে পতংগক জুলীয়া কলসীত আবদ্ধ কৰি হজম কৰি নাইট্ৰজেন পায়। সূৰ্যমুখী, তুলসী আৰু বৰগছ সাধাৰণ সালোক সংশ্লেষণকাৰী উদ্ভিদ।");

add("biology-286",
  "The transfer of pollen from the anther to the stigma of the same flower is called",
  "একেই ফুলৰ পৰাগপুটৰপৰা গৰ্ভমুণ্ডলৈ পৰাগ যোৱাক কি বোলা হয়",
  [["self pollination", "স্ব-পৰাগযোগ"], ["cross pollination", "পৰ-পৰাগযোগ"], ["apomixis", "অপমিক্সিছ"], ["cleistogamy only", "কেৱল ক্লাইষ্ট'গেমি"]], 0,
  "Self pollination happens within one flower or between flowers of the same plant. Cross pollination needs pollen to reach a different plant.",
  "স্ব-পৰাগযোগ এটা ফুলৰ ভিতৰত বা একেই উদ্ভিদৰ ফুলৰ মাজত হয়। পৰ-পৰাগযোগত পৰাগ বেলেগ উদ্ভিদলৈ যাব লাগে।");

/* ================= diseases-health ================= */
useLeaf("diseases-health");
add("biology-287",
  "Which mosquito genus transmits malaria in humans?",
  "কোনটো মশাৰ গণে মানুহত মেলেৰিয়া বিয়পায়",
  [["Anopheles", "এন'ফিলিছ"], ["Aedes", "এডিছ"], ["Culex", "কিউলেক্স"], ["Mansonia", "মেনছ'নিয়া"]], 0,
  "Only the female Anopheles mosquito transmits the Plasmodium parasite of malaria. Aedes carries dengue and yellow fever, and Culex carries filariasis.",
  "কেৱল মাদী এন'ফিলিছ মশাই মেলেৰিয়াৰ প্লাজম'ডিয়াম পৰজীৱী বিয়পায়। এডিছে ডেঙ্গু আৰু পীত জ্বৰ আৰু কিউলেক্সে ফাইলেৰিয়া বিয়পায়।");

add("biology-288",
  "The causative organism of cholera is",
  "কলেৰাৰ কাৰক জীৱটো কি",
  [["Vibrio cholerae", "ভিব্ৰিঅ' কলেৰি"], ["Salmonella typhi", "ছালম'নেলা টাইফাই"], ["Clostridium tetani", "ক্ল'ষ্ট্ৰিডিয়াম টেটানি"], ["Mycobacterium leprae", "মাইক'বেক্টেৰিয়াম লেপ্ৰি"]], 0,
  "Cholera is a bacterial disease of the small intestine caused by Vibrio cholerae and spread by contaminated water. Salmonella causes typhoid, Clostridium tetanus and Mycobacterium leprae leprosy.",
  "কলেৰা ক্ষুদ্ৰান্ত্ৰৰ বেক্টেৰিয়া ৰোগ, ভিব্ৰিঅ' কলেৰিৰ দ্বাৰা হয় আৰু দূষিত পানীৰে বিয়পে। ছালম'নেলাই টাইফইড, ক্ল'ষ্ট্ৰিডিয়ামে ধনুষ্টংকাৰ আৰু মাইক'বেক্টেৰিয়াম লেপ্ৰিয়ে কুষ্ঠ ৰোগ কৰে।");

add("biology-289",
  "Which of the following diseases is caused by a protozoan?",
  "তলৰ কোনটো ৰোগ প্ৰ'ট'জ'ৱাৰ দ্বাৰা হয়",
  [["Kala-azar", "কালা-জ্বৰ"], ["Typhoid", "টাইফইড"], ["Measles", "সৰু আই"], ["Ringworm", "দাদ"]], 0,
  "Kala-azar is caused by Leishmania donovani and spread by the sandfly. Typhoid is bacterial, measles viral and ringworm fungal.",
  "কালা-জ্বৰ লেইছমেনিয়া ড'ন'ভানিৰ দ্বাৰা হয় আৰু বালিমাখিৰে বিয়পে। টাইফইড বেক্টেৰিয়াৰ, সৰু আই ভাইৰাছৰ আৰু দাদ ভেঁকুৰৰ।");

add("biology-290",
  "BCG vaccine gives protection against",
  "BCG টীকাই কিহৰ পৰা সুৰক্ষা দিয়ে",
  [["tuberculosis", "যক্ষ্মা"], ["polio", "পলিঅ'"], ["tetanus", "ধনুষ্টংকাৰ"], ["measles", "সৰু আই"]], 0,
  "BCG is the bacillus Calmette-Guerin vaccine given in infancy against tuberculosis. Polio, tetanus and measles each have separate vaccines.",
  "BCG হ'ল বেছিলাছ কেলমেট-গুইৰিন টীকা, যি শিশু অৱস্থাত যক্ষ্মাৰ বিৰুদ্ধে দিয়া হয়। পলিঅ', ধনুষ্টংকাৰ আৰু সৰু আইৰ বাবে পৃথক টীকা আছে।");

add("biology-291",
  "AIDS destroys the body's defence mainly by attacking",
  "এইডছে শৰীৰৰ প্ৰতিৰক্ষা নষ্ট কৰে মূলতঃ কাক আক্ৰমণ কৰি",
  [["helper T lymphocytes", "সহায়ক T লিম্ফ'চাইট"], ["red blood cells", "লোহিত ৰক্তকণিকা"], ["platelets", "অণুচক্ৰিকা"], ["nerve cells", "স্নায়ু কোষ"]], 0,
  "HIV binds the CD4 receptor of helper T cells and destroys them, so the immune response collapses. Red cells, platelets and neurons lack CD4 and are not the target.",
  "HIV এ সহায়ক T কোষৰ CD4 গ্ৰাহকত বান্ধি সেইবোৰ নষ্ট কৰে, সেয়ে ৰোগ প্ৰতিৰক্ষা ভাঙি পৰে। লোহিত কণিকা, অণুচক্ৰিকা আৰু স্নায়ু কোষত CD4 নাই, সেয়ে লক্ষ্য নহয়।");

add("biology-292",
  "Malaria parasites multiply first in the human",
  "মেলেৰিয়া পৰজীৱীয়ে মানুহত প্ৰথমে ক'ত বংশবৃদ্ধি কৰে",
  [["liver, then red blood cells", "যকৃত, তাৰ পিছত লোহিত ৰক্তকণিকা"], ["lungs only", "কেৱল ফুসফুস"], ["kidney", "বৃক্ক"], ["bone marrow only", "কেৱল অস্থি মজ্জা"]], 0,
  "Sporozoites first enter liver cells to multiply, then the merozoites invade red cells, which burst and cause the fever cycle. The lung and kidney are not the primary sites.",
  "স্প'ৰ'জ'ৱাইটে প্ৰথমে যকৃত কোষত সোমাই বংশবৃদ্ধি কৰে, তাৰ পিছত মিৰ'জ'ৱাইটে লোহিত কণিকা আক্ৰমণ কৰে, যি ফাটি জ্বৰৰ চক্ৰ ঘটায়। ফুসফুস আৰু বৃক্ক প্ৰাথমিক স্থান নহয়।");

add("biology-293",
  "Which of the following is a non-communicable disease?",
  "তলৰ কোনটো সংক্ৰামক নহয়",
  [["Diabetes mellitus", "মধুমেহ"], ["Cholera", "কলেৰা"], ["Tuberculosis", "যক্ষ্মা"], ["Influenza", "ইনফ্লুৱেঞ্জা"]], 0,
  "Diabetes arises from insulin deficiency or resistance and cannot pass from person to person. Cholera, tuberculosis and influenza are all infectious.",
  "মধুমেহ ইনছুলিনৰ অভাৱ বা প্ৰতিৰোধৰপৰা হয় আৰু এজনৰপৰা আনজনলৈ নাযায়। কলেৰা, যক্ষ্মা আৰু ইনফ্লুৱেঞ্জা সকলো সংক্ৰামক।");

add("biology-294",
  "Dengue virus is transmitted to humans by",
  "ডেঙ্গু ভাইৰাছ মানুহলৈ কাৰ জৰিয়তে যায়",
  [["Aedes aegypti", "এডিছ ইজিপ্টাই"], ["Anopheles", "এন'ফিলিছ"], ["housefly", "ঘৰ মাখি"], ["sandfly", "বালি মাখি"]], 0,
  "Aedes aegypti, a day-biting mosquito, carries the dengue virus. Anopheles spreads malaria, the housefly carries enteric pathogens and the sandfly spreads kala-azar.",
  "এডিছ ইজিপ্টাই, দিনত কামোৰা মশা, ডেঙ্গু ভাইৰাছ কঢ়িয়ায়। এন'ফিলিছে মেলেৰিয়া, ঘৰ মাখিয়ে অন্ত্ৰ ৰোগজীৱ আৰু বালি মাখিয়ে কালা-জ্বৰ বিয়পায়।");

add("biology-295",
  "The organism that causes amoebic dysentery is",
  "অ্যামিবিক আমাশয়ৰ কাৰক জীৱটো কি",
  [["Entamoeba histolytica", "এণ্টামিবা হিষ্ট'লিটিকা"], ["Plasmodium vivax", "প্লাজম'ডিয়াম ভাইভাক্স"], ["Trypanosoma", "ট্ৰাইপেন'ছ'মা"], ["Giardia only", "কেৱল জিয়াৰ্ডিয়া"]], 0,
  "Entamoeba histolytica invades the large intestine and causes bloody dysentery. Plasmodium causes malaria and Trypanosoma sleeping sickness.",
  "এণ্টামিবা হিষ্ট'লিটিকাই বৃহদান্ত্ৰত প্ৰৱেশ কৰি তেজমিশ্ৰিত আমাশয় কৰে। প্লাজম'ডিয়ামে মেলেৰিয়া আৰু ট্ৰাইপেন'ছ'মাই নিদ্ৰা ৰোগ কৰে।");

add("biology-296",
  "Which vitamin deficiency makes a person more prone to infection because it is needed for antibody production?",
  "কোনটো ভিটামিনৰ অভাৱত এণ্টিবডি উৎপাদন কমি সংক্ৰমণৰ আশংকা বাঢ়ে",
  [["Vitamin C", "ভিটামিন C"], ["Vitamin K", "ভিটামিন K"], ["Vitamin B12", "ভিটামিন B১২"], ["Vitamin E only", "কেৱল ভিটামিন E"]], 0,
  "Vitamin C supports collagen formation and immune cell function, so deficiency lowers resistance. Vitamin K acts in clotting and B12 in nerve and red cell formation.",
  "ভিটামিন C এ ক'লেজেন গঠন আৰু ৰোগ প্ৰতিৰক্ষা কোষৰ কাৰ্যত সহায় কৰে, সেয়ে অভাৱত প্ৰতিৰোধ কমে। ভিটামিন K ৰক্ত জমাৰ আৰু B১২ স্নায়ু তথা লোহিত কণিকা গঠনত কাম কৰে।");

add("biology-297",
  "The disease in which the body cannot produce enough insulin is",
  "যি ৰোগত শৰীৰে পৰ্যাপ্ত ইনছুলিন উৎপাদন কৰিব নোৱাৰে",
  [["type 1 diabetes mellitus", "প্ৰকাৰ ১ মধুমেহ"], ["diabetes insipidus", "ডায়েবিটিছ ইনছিপিডাছ"], ["goitre", "গলগণ্ড"], ["kwashiorkor", "কোৱাছিঅৰ্কৰ"]], 0,
  "Type 1 diabetes follows destruction of the insulin-making beta cells of the pancreas. Diabetes insipidus is a kidney hormone problem, goitre a thyroid deficiency and kwashiorkor a protein deficiency.",
  "প্ৰকাৰ ১ মধুমেহত অগ্ন্যাশয়ৰ ইনছুলিন বনোৱা বিটা কোষ নষ্ট হয়। ডায়েবিটিছ ইনছিপিডাছ বৃক্ক হৰম'নৰ সমস্যা, গলগণ্ড থাইৰয়ডৰ অভাৱ আৰু কোৱাছিঅৰ্কৰ প্ৰ'টিনৰ অভাৱ।");

add("biology-298",
  "Which of the following is a fungal disease of humans?",
  "তলৰ কোনটো মানুহৰ ভেঁকুৰ ৰোগ",
  [["Ringworm", "দাদ"], ["Cholera", "কলেৰা"], ["Rabies", "জলাতংক"], ["Malaria", "মেলেৰিয়া"]], 0,
  "Ringworm is caused by dermatophyte fungi that grow on skin and hair. Cholera is bacterial, rabies viral and malaria protozoan.",
  "দাদ ছাল আৰু চুলিত গজা ডাৰ্মাট'ফাইট ভেঁকুৰৰ দ্বাৰা হয়। কলেৰা বেক্টেৰিয়াৰ, জলাতংক ভাইৰাছৰ আৰু মেলেৰিয়া প্ৰ'ট'জ'ৱাৰ।");

add("biology-299",
  "The incubation period of a disease means the time between",
  "ৰোগৰ ঊষ্মকাল মানে কিৰ মাজৰ সময়",
  [["entry of the pathogen and appearance of the first symptom", "ৰোগজীৱৰ প্ৰৱেশ আৰু প্ৰথম লক্ষণ ওলোৱাৰ মাজৰ"], ["first symptom and recovery", "প্ৰথম লক্ষণ আৰু আৰোগ্যৰ মাজৰ"], ["vaccination and immunity", "টীকা আৰু প্ৰতিৰোধৰ মাজৰ"], ["two successive infections", "দুটা ক্ৰমিক সংক্ৰমণৰ মাজৰ"]], 0,
  "The incubation period runs from infection to the first sign of illness. The time from symptom to recovery is the period of illness, not incubation.",
  "ঊষ্মকাল সংক্ৰমণৰপৰা ৰোগৰ প্ৰথম চিনলৈকে চলে। লক্ষণৰপৰা আৰোগ্যলৈ সময়খিনি ৰোগকাল, ঊষ্মকাল নহয়।");

add("biology-300",
  "Which of the following is the best method of preventing the spread of malaria?",
  "মেলেৰিয়া বিয়পাৰ পৰা বচাৰ আটাইতকৈ ভাল উপায় কোনটো",
  [["destroying mosquito breeding sites and using nets", "মশাৰ প্ৰজনন স্থান নষ্ট কৰা আৰু জাল ব্যৱহাৰ কৰা"], ["taking antibiotics regularly", "নিয়মীয়াকৈ এণ্টিবায়'টিক খোৱা"], ["drinking boiled water only", "কেৱল উতলা পানী খোৱা"], ["avoiding mosquito bites only at night", "কেৱল ৰাতিহে মশাৰ কামোৰ পৰা বাচা"]], 0,
  "Malaria control targets the vector, so removing stagnant water and using insecticide-treated nets works best. Antibiotics do not prevent malaria and boiling water targets water-borne disease.",
  "মেলেৰিয়া নিয়ন্ত্ৰণে বাহকক লক্ষ্য কৰে, সেয়ে থেৰ থকা পানী আঁতৰোৱা আৰু কীটনাশকযুক্ত জাল ব্যৱহাৰ কৰাটো সৰ্বোত্তম। এণ্টিবায়'টিকে মেলেৰিয়া ৰোধ নকৰে আৰু উতলা পানীয়ে জলবাহিত ৰোগ লক্ষ্য কৰে।");

/* ================= ecology-environment ================= */
useLeaf("ecology-environment");
add("biology-301",
  "The transition zone between two ecosystems where species of both meet is called an",
  "দুটা বাস্তুতন্ত্ৰৰ মাজৰ সন্ধি অঞ্চল য'ত দুয়োটাৰ প্ৰজাতি লগ পায় তাক কি বোলা হয়",
  [["ecotone", "ইক'ট'ন"], ["niche", "নিচ"], ["biome", "বায়'ম"], ["habitat", "বাসস্থান"]], 0,
  "An ecotone is the boundary belt between communities and often holds a mix of both, which is called the edge effect. A niche is an organism's functional role, not a place.",
  "ইক'ট'ন সম্প্ৰদায়ৰ মাজৰ সীমা পটী আৰু প্ৰায়ে দুয়োটাৰ মিশ্ৰণ ৰাখে, যাক প্ৰান্ত প্ৰভাৱ বোলে। নিচ জীৱৰ কাৰ্যকৰী ভূমিকা, স্থান নহয়।");

add("biology-302",
  "The total number of different species present in an area is called its",
  "এটা অঞ্চলত থকা বিভিন্ন প্ৰজাতিৰ মুঠ সংখ্যাক তাৰ কি বোলা হয়",
  [["species richness", "প্ৰজাতি সমৃদ্ধি"], ["population density", "জনসংখ্যা ঘনত্ব"], ["carrying capacity", "বহন ক্ষমতা"], ["biomass", "জৈৱ ভৰ"]], 0,
  "Species richness counts how many species live there, without regard to their abundance. Population density counts individuals, carrying capacity sets a limit and biomass measures mass.",
  "প্ৰজাতি সমৃদ্ধিয়ে কিমান প্ৰজাতি থাকে তাক গণে, প্ৰাচুৰ্য নধৰি। জনসংখ্যা ঘনত্বে ব্যক্তি গণে, বহন ক্ষমতাই সীমা ঠিক কৰে আৰু জৈৱ ভৰে ভৰ মাপে।");

add("biology-303",
  "Organisms that break down dead organic matter into simpler substances are called",
  "মৃত জৈৱ পদাৰ্থ ভাঙি সৰল পদাৰ্থলৈ ৰূপান্তৰ কৰা জীৱক কি বোলা হয়",
  [["decomposers", "বিয়োজক"], ["producers", "উৎপাদক"], ["primary consumers", "প্ৰাথমিক ভোক্তা"], ["tertiary consumers", "তৃতীয়ক ভোক্তা"]], 0,
  "Decomposers such as bacteria and fungi release nutrients back to the soil. Producers make food and consumers eat other organisms.",
  "বেক্টেৰিয়া আৰু ভেঁকুৰৰ দৰে বিয়োজকে পুষ্টি মাটিলৈ ঘূৰাই দিয়ে। উৎপাদকে খাদ্য বনায় আৰু ভোক্তাই আন জীৱ খায়।");

add("biology-304",
  "In an ecosystem the flow of energy is",
  "বাস্তুতন্ত্ৰত শক্তিৰ প্ৰবাহ কেনে",
  [["unidirectional", "একমুখী"], ["cyclic", "চক্ৰীয়"], ["bidirectional", "দ্বিমুখী"], ["random", "যাদৃচ্ছিক"]], 0,
  "Energy enters as sunlight and is lost as heat at each trophic level, so it never returns and the flow is one-way. Nutrients, by contrast, cycle repeatedly.",
  "শক্তি সূৰ্যৰ পোহৰ হিচাপে সোমাই প্ৰতিটো পুষ্টি স্তৰত তাপ হিচাপে হেৰায়, সেয়ে ঘূৰি নাহে আৰু প্ৰবাহ একমুখী। পুষ্টি কিন্তু বাৰে বাৰে চক্ৰাকাৰে ঘূৰে।");

add("biology-305",
  "Which of the following gases is chiefly responsible for the greenhouse effect?",
  "গ্ৰীণহাউছ প্ৰভাৱৰ বাবে মূলতঃ দায়ী গেছটো কি",
  [["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["oxygen", "অক্সিজেন"], ["nitrogen", "নাইট্ৰজেন"], ["argon", "আৰ্গন"]], 0,
  "Carbon dioxide absorbs infrared radiation re-emitted by the earth and traps heat. Oxygen, nitrogen and argon do not absorb infrared strongly.",
  "কাৰ্বন ডাইঅক্সাইডে পৃথিৱীয়ে পুনৰ নিৰ্গত কৰা অৱলোহিত ৰশ্মি শোষণ কৰি তাপ আটকায়। অক্সিজেন, নাইট্ৰজেন আৰু আৰ্গনে অৱলোহিত বেছিকৈ শোষণ নকৰে।");

add("biology-306",
  "The main cause of depletion of the ozone layer is",
  "অ'জ'ন স্তৰ ক্ষয়ৰ মূল কাৰণ কি",
  [["chlorofluorocarbons", "ক্ল'ৰ'ফ্লুঅ'ৰ'কাৰ্বন"], ["carbon monoxide", "কাৰ্বন মন'ক্সাইড"], ["sulphur dioxide", "ছালফাৰ ডাইঅক্সাইড"], ["methane", "মিথেন"]], 0,
  "Chlorofluorocarbons release chlorine atoms in the stratosphere, and each chlorine can destroy thousands of ozone molecules. Carbon monoxide and sulphur dioxide cause other pollution problems.",
  "ক্ল'ৰ'ফ্লুঅ'ৰ'কাৰ্বনে ষ্ট্ৰেট'ছ্ফিয়াৰত ক্ল'ৰিন পৰমাণু এৰে, আৰু প্ৰতিটো ক্ল'ৰিনে হাজাৰ হাজাৰ অ'জ'ন অণু নষ্ট কৰিব পাৰে। কাৰ্বন মন'ক্সাইড আৰু ছালফাৰ ডাইঅক্সাইডে অন্য প্ৰদূষণ ঘটায়।");

add("biology-307",
  "The chief greenhouse gas released from paddy fields and cattle is",
  "ধানপথাৰ আৰু গৰুৰপৰা ওলোৱা মূল গ্ৰীণহাউছ গেছটো কি",
  [["methane", "মিথেন"], ["carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"], ["ozone", "অ'জ'ন"], ["nitrogen", "নাইট্ৰজেন"]], 0,
  "Waterlogged paddy soil and the rumen of cattle host methanogens that release methane. Carbon dioxide comes mainly from burning fossil fuel.",
  "পানী থকা ধানপথাৰৰ মাটি আৰু গৰুৰ ৰুমেনত মিথেন'জেন থাকে যি মিথেন এৰে। কাৰ্বন ডাইঅক্সাইড মূলতঃ জীৱাশ্ম ইন্ধন জ্বলোৱাৰপৰা আহে।");

add("biology-308",
  "Eutrophication of a lake is caused mainly by",
  "হ্ৰদৰ ইউট্ৰ'ফিকেচন মূলতঃ কিৰ বাবে হয়",
  [["excess nitrates and phosphates from fertiliser runoff", "সাৰৰ পৰা অহা অতিৰিক্ত নাইট্ৰেট আৰু ফছফেট"], ["excess oxygen", "অতিৰিক্ত অক্সিজেন"], ["low temperature", "নিম্ন উষ্ণতা"], ["high salinity only", "কেৱল উচ্চ লৱণতা"]], 0,
  "Nutrient enrichment triggers algal blooms, and their decay consumes oxygen until fish die. Extra oxygen or cold water does not drive the process.",
  "পুষ্টি সমৃদ্ধিয়ে শেলাইৰ ফুলন ঘটায়, আৰু তাৰ পচনে অক্সিজেন খৰচ কৰি মাছ মৰে। অতিৰিক্ত অক্সিজেন বা ঠাণ্ডা পানীয়ে এই প্ৰক্ৰিয়া নচলায়।");

add("biology-309",
  "Biological magnification means the increase in concentration of a pollutant",
  "জৈৱ বৃদ্ধিৰ অৰ্থ প্ৰদূষকৰ ঘনত্ব বৃদ্ধি হোৱা",
  [["at successive higher trophic levels", "ক্ৰমে উচ্চ পুষ্টি স্তৰত"], ["in the soil only", "কেৱল মাটিত"], ["in rainfall", "বৰষুণত"], ["in the atmosphere", "বায়ুমণ্ডলত"]], 0,
  "Fat-soluble pollutants such as DDT are not excreted and so build up in body tissue at each step of the food chain, harming top predators most. Water-soluble substances are usually excreted.",
  "DDT ৰ দৰে চৰ্বি-দ্ৰৱণীয় প্ৰদূষক বৰ্জিত নহয়, সেয়ে খাদ্য শৃংখলৰ প্ৰতিটো স্তৰত দেহকলাত জমা হয় আৰু শীৰ্ষ শিকাৰুক সবাতোকৈ বেছি ক্ষতি কৰে। পানী-দ্ৰৱণীয় পদাৰ্থ সাধাৰণতে বৰ্জিত হয়।");

add("biology-310",
  "The Kaziranga National Park is a UNESCO World Heritage Site chiefly for the conservation of",
  "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান ইউনেস্ক' বিশ্ব ঐতিহ্য স্থান মূলতঃ কিহৰ সংৰক্ষণৰ বাবে",
  [["the one-horned rhinoceros", "এশিঙীয়া গঁড়"], ["the tiger only", "কেৱল বাঘ"], ["the elephant only", "কেৱল হাতী"], ["the hoolock gibbon", "হুলক গিবন"]], 0,
  "Kaziranga holds the largest population of the Indian one-horned rhinoceros, which is why it was inscribed. Tigers and elephants also occur but are not the reason for the listing.",
  "কাজিৰঙাত ভাৰতীয় এশিঙীয়া গঁড়ৰ আটাইতকৈ ডাঙৰ জনসংখ্যা আছে, সেয়ে ইয়াক তালিকাভুক্ত কৰা হৈছিল। বাঘ আৰু হাতীও আছে, কিন্তু তালিকাৰ কাৰণ নহয়।");

add("biology-311",
  "In situ conservation of biodiversity means conservation",
  "জৈৱ বৈচিত্ৰ্যৰ 'স্থানত' সংৰক্ষণ মানে সংৰক্ষণ",
  [["within the natural habitat of the species", "প্ৰজাতিৰ প্ৰাকৃতিক বাসস্থানৰ ভিতৰত"], ["in a seed bank", "বীজ ভাণ্ডাৰত"], ["in a zoo", "চিৰিয়াখানাত"], ["in a botanical garden", "উদ্ভিদ উদ্যানত"]], 0,
  "In situ keeps the species in its own ecosystem, as in national parks and biosphere reserves. Zoos, gardens and seed banks are ex situ because the organism is moved out of its habitat.",
  "স্থানত সংৰক্ষণে প্ৰজাতিক তাৰ নিজৰ বাস্তুতন্ত্ৰতে ৰাখে, যেনে ৰাষ্ট্ৰীয় উদ্যান আৰু জীৱমণ্ডল সংৰক্ষিত অঞ্চলত। চিৰিয়াখানা, উদ্যান আৰু বীজ ভাণ্ডাৰ বহিঃস্থ, কাৰণ জীৱক বাসস্থানৰপৰা আঁতৰোৱা হয়।");

add("biology-312",
  "The relationship in which both species benefit is called",
  "যি সম্পৰ্কত দুয়োটা প্ৰজাতিয়ে লাভ পায় তাক কি বোলা হয়",
  [["mutualism", "পৰস্পৰবাদ"], ["commensalism", "সহভোজিতা"], ["parasitism", "পৰজীৱিতা"], ["amensalism", "অসহভোজিতা"]], 0,
  "In mutualism both partners gain, as in lichens where alga and fungus help each other. Commensalism benefits one only, parasitism harms the host and amensalism harms one without gain to the other.",
  "পৰস্পৰবাদত দুয়ো অংশীয়ে লাভ পায়, যেনে লাইকেনত শেলাই আৰু ভেঁকুৰে ইটোৱে সিটোক সহায় কৰে। সহভোজিতাত এটাই লাভ পায়, পৰজীৱিতাই পোষকক ক্ষতি কৰে আৰু অসহভোজিতাই আনৰ লাভ নোহোৱাকৈ এটাক ক্ষতি কৰে।");

add("biology-313",
  "The carrying capacity of a habitat is the",
  "বাসস্থানৰ বহন ক্ষমতা কি",
  [["maximum population it can support indefinitely", "অনিৰ্দিষ্টকাললৈ ধৰি ৰাখিব পৰা সৰ্বোচ্চ জনসংখ্যা"], ["total number of species present", "উপস্থিত প্ৰজাতিৰ মুঠ সংখ্যা"], ["rate of birth in a year", "বছৰত জন্মৰ হাৰ"], ["amount of rainfall received", "পোৱা বৰষুণৰ পৰিমাণ"]], 0,
  "Carrying capacity is the population the available resources can sustain over time, and growth levels off there. Species count is richness and birth rate is a demographic rate.",
  "বহন ক্ষমতা হ'ল উপলব্ধ সম্পদে সময়ৰ সৈতে ধৰি ৰাখিব পৰা জনসংখ্যা, আৰু বৃদ্ধি তাতেই সমতল হয়। প্ৰজাতি সংখ্যা সমৃদ্ধি আৰু জন্ম হাৰ জনসংখ্যাৰ হাৰ।");

add("biology-314",
  "An ecological pyramid that can never be inverted is the pyramid of",
  "যি পাৰিপাৰ্শ্বিক পিৰামিড কেতিয়াও ওলোটা হ'ব নোৱাৰে সেয়া কিৰ পিৰামিড",
  [["energy", "শক্তি"], ["numbers", "সংখ্যা"], ["biomass", "জৈৱ ভৰ"], ["biomass in a forest", "অৰণ্যৰ জৈৱ ভৰ"]], 0,
  "Energy always decreases from one trophic level to the next because of heat loss, so its pyramid is always upright. Pyramids of number and biomass can invert, as when one tree supports many insects.",
  "তাপ হেৰুওৱাৰ বাবে শক্তি প্ৰতিটো পুষ্টি স্তৰত সদায় কমে, সেয়ে ইয়াৰ পিৰামিড সদায় থিয়। সংখ্যা আৰু জৈৱ ভৰৰ পিৰামিড ওলোটা হ'ব পাৰে, যেনে এজোপা গছে বহু পতংগ ধৰি ৰাখিলে।");

add("biology-315",
  "The chief source of energy for an ecosystem is",
  "বাস্তুতন্ত্ৰৰ শক্তিৰ মূল উৎস কি",
  [["solar radiation", "সৌৰ বিকিৰণ"], ["soil nutrients", "মাটিৰ পুষ্টি"], ["water", "পানী"], ["atmospheric nitrogen", "বায়ুমণ্ডলীয় নাইট্ৰজেন"]], 0,
  "Producers capture sunlight and convert it to chemical energy, which feeds every other level. Nutrients and water are materials, not the energy source.",
  "উৎপাদকে সূৰ্যৰ পোহৰ ধৰি ৰাসায়নিক শক্তিলৈ ৰূপান্তৰ কৰে, যি প্ৰতিটো অন্য স্তৰক খাদ্য দিয়ে। পুষ্টি আৰু পানী সামগ্ৰী, শক্তিৰ উৎস নহয়।");

add("biology-316",
  "Which of the following is a renewable natural resource?",
  "তলৰ কোনটো নৱীকৰণযোগ্য প্ৰাকৃতিক সম্পদ",
  [["solar energy", "সৌৰ শক্তি"], ["coal", "কয়লা"], ["petroleum", "পেট্ৰ'লিয়াম"], ["natural gas", "প্ৰাকৃতিক গেছ"]], 0,
  "Solar energy is replenished continuously and will not run out on human timescales. Coal, petroleum and natural gas are fossil fuels formed over millions of years.",
  "সৌৰ শক্তি নিৰন্তৰ পুনৰ পূৰণ হয় আৰু মানৱ সময়সীমাত শেষ নহয়। কয়লা, পেট্ৰ'লিয়াম আৰু প্ৰাকৃতিক গেছ কোটি বছৰত গঠিত জীৱাশ্ম ইন্ধন।");

/* ================= nutrition-vitamins ================= */
useLeaf("nutrition-vitamins");
add("biology-317",
  "The deficiency of vitamin B1 causes",
  "ভিটামিন B১ ৰ অভাৱত কি হয়",
  [["beriberi", "বেৰিবেৰি"], ["scurvy", "স্কাৰ্ভি"], ["rickets", "ৰিকেটছ"], ["pellagra", "পেলাগ্ৰা"]], 0,
  "Thiamine or B1 deficiency damages nerves and the heart, giving beriberi. Scurvy is vitamin C deficiency, rickets vitamin D and pellagra niacin deficiency.",
  "থায়ামিন বা B১ ৰ অভাৱে স্নায়ু আৰু হৃদয়ৰ ক্ষতি কৰি বেৰিবেৰি কৰে। স্কাৰ্ভি ভিটামিন C, ৰিকেটছ ভিটামিন D আৰু পেলাগ্ৰা নিয়াচিনৰ অভাৱ।");

add("biology-318",
  "Which mineral is essential for the formation of haemoglobin?",
  "হিম'গ্লবিন গঠনৰ বাবে কোনটো খনিজ অপৰিহাৰ্য",
  [["iron", "লো"], ["calcium", "কেলছিয়াম"], ["potassium", "পটাছিয়াম"], ["sodium", "ছ'ডিয়াম"]], 0,
  "Iron sits at the centre of the haem group and binds oxygen, so its lack causes anaemia. Calcium builds bone, and potassium and sodium maintain nerve and fluid balance.",
  "লো হীম গোটৰ কেন্দ্ৰত থাকে আৰু অক্সিজেন বান্ধে, সেয়ে ইয়াৰ অভাৱত ৰক্তহীনতা হয়। কেলছিয়ামে হাড় গঢ়ে, আৰু পটাছিয়াম তথা ছ'ডিয়ামে স্নায়ু আৰু তৰল ভাৰসাম্য ৰাখে।");

add("biology-319",
  "Iodine is needed by the body for the synthesis of",
  "শৰীৰে আয়'ডিন কিমানৰ সংশ্লেষণৰ বাবে লাগে",
  [["thyroxine", "থাইৰক্সিন"], ["insulin", "ইনছুলিন"], ["adrenaline", "এড্ৰিনেলিন"], ["haemoglobin", "হিম'গ্লবিন"]], 0,
  "The thyroid gland needs iodine to make thyroxine, so a shortfall enlarges the gland as goitre. Insulin, adrenaline and haemoglobin do not contain iodine.",
  "থাইৰয়ড গ্ৰন্থিয়ে থাইৰক্সিন বনাবলৈ আয়'ডিন লাগে, সেয়ে অভাৱত গ্ৰন্থি ডাঙৰ হৈ গলগণ্ড হয়। ইনছুলিন, এড্ৰিনেলিন আৰু হিম'গ্লবিনত আয়'ডিন নাই।");

add("biology-320",
  "Vitamin A is important for",
  "ভিটামিন A কিৰ বাবে গুৰুত্বপূৰ্ণ",
  [["normal vision and healthy epithelium", "স্বাভাৱিক দৃষ্টি আৰু সুস্থ এপিথেলিয়াম"], ["blood clotting", "ৰক্ত জমা"], ["calcium absorption", "কেলছিয়াম শোষণ"], ["energy production", "শক্তি উৎপাদন"]], 0,
  "Vitamin A forms rhodopsin in the retina and maintains epithelial tissue, so its lack causes night blindness and dry eyes. Clotting needs vitamin K and calcium absorption vitamin D.",
  "ভিটামিন A এ ৰেটিনাত ৰ'ড'পছিন গঢ়ে আৰু এপিথেলিয়াল কলা ৰাখে, সেয়ে অভাৱত ৰাতি কণা আৰু শুকান চকু হয়। জমাৰ বাবে ভিটামিন K আৰু কেলছিয়াম শোষণৰ বাবে ভিটামিন D লাগে।");

add("biology-321",
  "Which of the following is a rich source of plant protein?",
  "তলৰ কোনটো উদ্ভিদ প্ৰ'টিনৰ চহকী উৎস",
  [["soybean", "চয়াবীন"], ["rice", "ধান"], ["potato", "আলু"], ["cassava", "কাছাভা"]], 0,
  "Soybean carries about forty percent protein and supplies all essential amino acids. Rice, potato and cassava are chiefly carbohydrate foods.",
  "চয়াবীনত প্ৰায় চল্লিশ শতাংশ প্ৰ'টিন থাকে আৰু সকলো অপৰিহাৰ্য এমিন' অ্যাসিড যোগায়। ধান, আলু আৰু কাছাভা মূলতঃ শৰ্কৰাঘটিত খাদ্য।");

add("biology-322",
  "The disease caused by the deficiency of both protein and calories in young children, marked by a swollen belly, is",
  "শিশুৰ প্ৰ'টিন আৰু কেলৰি দুয়োটাৰ অভাৱত হোৱা, পেট ফুলা ৰোগটো কি",
  [["kwashiorkor", "কোৱাছিঅৰ্কৰ"], ["marasmus", "মাৰাছমাছ"], ["beriberi", "বেৰিবেৰি"], ["rickets", "ৰিকেটছ"]], 0,
  "Kwashiorkor is protein deficiency with adequate calories, so oedema swells the belly. Marasmus is severe deficiency of both, giving extreme wasting without oedema.",
  "কোৱাছিঅৰ্কৰত প্ৰ'টিনৰ অভাৱ কিন্তু কেলৰি পৰ্যাপ্ত, সেয়ে ইডিমাৰে পেট ফুলে। মাৰাছমাছত দুয়োটাৰে তীব্ৰ অভাৱ, সেয়ে ইডিমা নোহোৱাকৈ অতিশয় ক্ষয় হয়।");

add("biology-323",
  "Which vitamin acts as an antioxidant and is also called tocopherol?",
  "কোনটো ভিটামিন এণ্টিঅক্সিডেণ্ট হিচাপে কাম কৰে আৰু ট'ক'ফেৰল বুলিও কোৱা হয়",
  [["Vitamin E", "ভিটামিন E"], ["Vitamin C", "ভিটামিন C"], ["Vitamin B6", "ভিটামিন B৬"], ["Vitamin K", "ভিটামিন K"]], 0,
  "Vitamin E is a family of tocopherols that protect membrane lipids from oxidation. Vitamin C is ascorbic acid and vitamin K is a clotting factor.",
  "ভিটামিন E ট'ক'ফেৰলৰ পৰিয়াল, যি পৰ্দা লিপিডক জাৰণৰপৰা ৰক্ষা কৰে। ভিটামিন C অ্যাস্কৰবিক অ্যাসিড আৰু ভিটামিন K ৰক্ত জমাৰ কাৰক।");

add("biology-324",
  "Roughage in the diet is important because it",
  "খাদ্যত আঁহ গুৰুত্বপূৰ্ণ কাৰণ সেয়া",
  [["helps in the movement of food through the gut", "অন্ত্ৰৰ মাজেৰে খাদ্য চলাচলত সহায় কৰে"], ["provides most of the energy", "বেছিভাগ শক্তি যোগায়"], ["builds muscle", "পেশী গঢ়ে"], ["supplies vitamins directly", "পোনপটীয়াকৈ ভিটামিন যোগায়"]], 0,
  "Dietary fibre adds bulk that keeps the intestine moving and prevents constipation. Energy comes from carbohydrate and fat, and muscle from protein.",
  "খাদ্য আঁহে ভৰ যোগ কৰি অন্ত্ৰ চলাচল ৰাখে আৰু কোষ্ঠকাঠিন্য ৰোধ কৰে। শক্তি শৰ্কৰা আৰু চৰ্বিৰপৰা আৰু পেশী প্ৰ'টিনৰপৰা আহে।");

add("biology-325",
  "Excess of which vitamin is stored in the liver and can become toxic if taken in very large doses?",
  "কোনটো ভিটামিন অতিৰিক্ত পৰিমাণত ল'লে যকৃতত জমা হৈ বিষক্ৰিয়া কৰিব পাৰে",
  [["Vitamin A", "ভিটামিন A"], ["Vitamin C", "ভিটামিন C"], ["Vitamin B1", "ভিটামিন B১"], ["Vitamin B6", "ভিটামিন B৬"]], 0,
  "Vitamin A is fat-soluble and the liver stores it, so very high doses accumulate and cause hypervitaminosis A. Vitamin C and the B group are water-soluble and any excess is excreted in urine.",
  "ভিটামিন A চৰ্বি-দ্ৰৱণীয় আৰু যকৃতত জমা হয়, সেয়ে অতিশয় বেছি পালে জমা হৈ হাইপাৰভিটামিন'ছিছ A কৰে। ভিটামিন C আৰু B গোট পানী-দ্ৰৱণীয় আৰু অতিৰিক্তখিনি প্ৰস্ৰাৱত ওলাই যায়।");

add("biology-326",
  "A balanced diet is one that",
  "সন্তুলিত খাদ্য সেয়া যি",
  [["supplies all nutrients in the right proportion", "সকলো পুষ্টি সঠিক অনুপাতত যোগায়"], ["contains only vegetables", "কেৱল শাক-পাচলি থাকে"], ["is rich in fat only", "কেৱল চৰ্বিৰে চহকী"], ["excludes all carbohydrates", "সকলো শৰ্কৰা বাদ দিয়ে"]], 0,
  "A balanced diet supplies carbohydrate, protein, fat, vitamins, minerals, fibre and water in proper amounts. Any diet restricted to one group is unbalanced.",
  "সন্তুলিত খাদ্যই শৰ্কৰা, প্ৰ'টিন, চৰ্বি, ভিটামিন, খনিজ, আঁহ আৰু পানী সঠিক পৰিমাণত যোগায়। এটা গোটতে সীমাবদ্ধ যিকোনো খাদ্য অসন্তুলিত।");

add("biology-327",
  "The chief function of calcium in the body is",
  "শৰীৰত কেলছিয়ামৰ মূল কাম কি",
  [["formation of bones and teeth", "হাড় আৰু দাঁত গঠন"], ["transport of oxygen", "অক্সিজেন পৰিবহন"], ["clotting of blood only", "কেৱল ৰক্ত জমা"], ["production of bile", "পিত্ত উৎপাদন"]], 0,
  "About ninety-nine percent of body calcium sits in bone and teeth as mineral salt, and the rest assists clotting and muscle contraction. Oxygen transport is the work of iron in haemoglobin.",
  "দেহৰ প্ৰায় নব্বৈ শতাংশ কেলছিয়াম খনিজ লৱণ হিচাপে হাড় আৰু দাঁতত থাকে, আৰু বাকীখিনিয়ে জমা তথা পেশী সংকোচনত সহায় কৰে। অক্সিজেন পৰিবহন হিম'গ্লবিনৰ লোৰ কাম।");

/* ================= human-physiology (top-up) ================= */
useLeaf("human-physiology");
add("biology-328",
  "The normal resting heart rate of an adult human is about",
  "এজন প্ৰাপ্তবয়স্ক মানুহৰ স্বাভাৱিক বিশ্ৰামকালীন হৃৎস্পন্দনৰ হাৰ প্ৰায় কিমান",
  [["72 beats per minute", "মিনিটত ৭২ বাৰ"], ["40 beats per minute", "মিনিটত ৪০ বাৰ"], ["120 beats per minute", "মিনিটত ১২০ বাৰ"], ["150 beats per minute", "মিনিটত ১৫০ বাৰ"]], 0,
  "A healthy adult heart beats about seventy-two times a minute at rest. Forty is bradycardia, while 120 and 150 are rates seen during exercise or fever.",
  "সুস্থ প্ৰাপ্তবয়স্কৰ হৃদয়ে বিশ্ৰামত মিনিটত প্ৰায় বাহাত্তৰ বাৰ স্পন্দন কৰে। চল্লিশ ব্ৰেডিকাৰ্ডিয়া, আৰু ১২০ তথা ১৫০ ব্যায়াম বা জ্বৰৰ হাৰ।");

add("biology-329",
  "The part of the nephron where most reabsorption of glucose and amino acids takes place is the",
  "নেফ্ৰনৰ যি অংশত গ্লুক'জ আৰু এমিন' অ্যাসিডৰ বেছিভাগ পুনৰ্শোষণ হয়",
  [["proximal convoluted tubule", "সমীপ কুঁচিত নলিকা"], ["distal convoluted tubule", "দূৰ কুঁচিত নলিকা"], ["collecting duct", "সংগ্ৰাহক নলী"], ["Bowman's capsule", "ব'মেনৰ কেপচুল"]], 0,
  "The proximal tubule has a brush border rich in carriers and reclaims nearly all glucose and amino acids. The distal tubule fine-tunes ions and the collecting duct adjusts water.",
  "সমীপ নলিকাৰ ব্ৰাছ সীমাত বাহক প্ৰচুৰ, যি প্ৰায় সকলো গ্লুক'জ আৰু এমিন' অ্যাসিড ঘূৰাই লয়। দূৰ নলিকাই আয়ন সূক্ষ্মভাৱে ঠিক কৰে আৰু সংগ্ৰাহক নলীয়ে পানী সমন্বয় কৰে।");

add("biology-330",
  "Which enzyme in the stomach begins the digestion of proteins?",
  "পেটত কোনটো এনজাইমে প্ৰ'টিনৰ হজম আৰম্ভ কৰে",
  [["pepsin", "পেপছিন"], ["trypsin", "ট্ৰিপছিন"], ["amylase", "এমাইলেজ"], ["lipase", "লাইপেজ"]], 0,
  "Pepsin is secreted as pepsinogen and works in the acidic stomach to break proteins into peptides. Trypsin acts in the small intestine, amylase on starch and lipase on fat.",
  "পেপছিন পেপছিন'জেন হিচাপে নিঃসৃত হয় আৰু অ্যাসিডিক পেটত কাম কৰি প্ৰ'টিনক পেপটাইডলৈ ভাঙে। ট্ৰিপছিন ক্ষুদ্ৰান্ত্ৰত, এমাইলেজ ষ্টাৰ্চত আৰু লাইপেজ চৰ্বিত ক্ৰিয়া কৰে।");

add("biology-331",
  "The hormone that lowers blood glucose by promoting its uptake into cells is",
  "কোষত গ্লুক'জ গ্ৰহণ বঢ়াই ৰক্ত গ্লুক'জ কমোৱা হৰম'নটো কি",
  [["insulin", "ইনছুলিন"], ["glucagon", "গ্লুকাগন"], ["adrenaline", "এড্ৰিনেলিন"], ["cortisol", "কৰ্টিছল"]], 0,
  "Insulin from the beta cells of the pancreas moves glucose into cells and stores the excess as glycogen. Glucagon, adrenaline and cortisol all raise blood glucose.",
  "অগ্ন্যাশয়ৰ বিটা কোষৰ ইনছুলিনে গ্লুক'জক কোষলৈ লৈ যায় আৰু অতিৰিক্তখিনি গ্লাইক'জেন হিচাপে সাঁচি ৰাখে। গ্লুকাগন, এড্ৰিনেলিন আৰু কৰ্টিছলে ৰক্ত গ্লুক'জ বঢ়ায়।");

add("biology-332",
  "The exchange of gases between blood and tissue cells takes place through",
  "ৰক্ত আৰু কলা কোষৰ মাজত গেছ বিনিময় কিৰ জৰিয়তে হয়",
  [["capillary walls", "কেশিকা নলীৰ বেৰ"], ["artery walls", "ধমনীৰ বেৰ"], ["vein valves", "শিৰাৰ কপাট"], ["lymph nodes", "লসিকা গ্ৰন্থি"]], 0,
  "Capillaries are only one cell thick, so oxygen and carbon dioxide diffuse easily between blood and tissue. Arteries and veins have thick walls suited to transport, not exchange.",
  "কেশিকা নলী কেৱল এটা কোষ ডাঠ, সেয়ে অক্সিজেন আৰু কাৰ্বন ডাইঅক্সাইড ৰক্ত আৰু কলাৰ মাজত সহজে বিচৰণ কৰে। ধমনী আৰু শিৰাৰ বেৰ ডাঠ, যি পৰিবহনৰ বাবে উপযুক্ত, বিনিময়ৰ নহয়।");

add("biology-333",
  "Blood pressure is measured with an instrument called the",
  "ৰক্তচাপ কি যন্ত্ৰৰে জোখা হয়",
  [["sphygmomanometer", "স্ফিগম'মেন'মিটাৰ"], ["stethoscope", "ষ্টেথ'স্কোপ"], ["spirometer", "স্পাইৰ'মিটাৰ"], ["haemocytometer", "হিম'চাইট'মিটাৰ"]], 0,
  "A sphygmomanometer with an inflatable cuff gives the systolic and diastolic readings. A stethoscope listens to body sounds and a spirometer measures lung volumes.",
  "স্ফীত কৰিব পৰা কাফযুক্ত স্ফিগম'মেন'মিটাৰে সিষ্ট'লিক আৰু ডায়াষ্ট'লিক পঢ়া দিয়ে। ষ্টেথ'স্কোপে শৰীৰৰ শব্দ শুনে আৰু স্পাইৰ'মিটাৰে ফুসফুসৰ আয়তন জোখে।");

add("biology-334",
  "The largest artery in the human body is the",
  "মানুহৰ শৰীৰৰ আটাইতকৈ ডাঙৰ ধমনীটো কি",
  [["aorta", "মহাধমনী"], ["pulmonary artery", "ফুসফুসীয় ধমনী"], ["carotid artery", "কণ্ঠধমনী"], ["femoral artery", "ঊৰুধমনী"]], 0,
  "The aorta leaves the left ventricle and distributes oxygenated blood to the whole body, making it the largest artery. The carotid and femoral arteries are branches of it.",
  "মহাধমনীয়ে বাওঁ নিলয়ৰপৰা ওলাই গোটেই শৰীৰলৈ অক্সিজেনযুক্ত ৰক্ত বিতৰণ কৰে, সেয়ে ই আটাইতকৈ ডাঙৰ। কণ্ঠধমনী আৰু ঊৰুধমনী ইয়াৰ শাখা।");

add("biology-335",
  "Which blood cells are chiefly responsible for immunity?",
  "ৰোগ প্ৰতিৰক্ষাৰ বাবে মূলতঃ কোন ৰক্তকণিকা দায়ী",
  [["white blood cells", "শ্বেত ৰক্তকণিকা"], ["red blood cells", "লোহিত ৰক্তকণিকা"], ["platelets", "অণুচক্ৰিকা"], ["plasma cells only", "কেৱল প্লাজমা কোষ"]], 0,
  "White cells, chiefly lymphocytes and phagocytes, recognise and destroy pathogens. Red cells carry oxygen and platelets assist clotting.",
  "শ্বেত কণিকা, মূলতঃ লিম্ফ'চাইট আৰু ভক্ষককোষে ৰোগজীৱ চিনি নষ্ট কৰে। লোহিত কণিকাই অক্সিজেন কঢ়িয়ায় আৰু অণুচক্ৰিকাই জমাত সহায় কৰে।");

add("biology-336",
  "The part of the human digestive tract where most absorption of digested food occurs is the",
  "মানুহৰ পাচন নলীৰ যি অংশত হজম হোৱা খাদ্যৰ বেছিভাগ শোষণ হয়",
  [["small intestine", "ক্ষুদ্ৰান্ত্ৰ"], ["large intestine", "বৃহদান্ত্ৰ"], ["stomach", "পেট"], ["oesophagus", "খাদ্যনলী"]], 0,
  "Villi and microvilli of the small intestine give an enormous surface for absorbing nutrients. The large intestine mainly absorbs water and the stomach begins protein digestion.",
  "ক্ষুদ্ৰান্ত্ৰৰ ভিলাছ আৰু মাইক্ৰ'ভিলাছে পুষ্টি শোষণৰ বাবে বিশাল পৃষ্ঠ দিয়ে। বৃহদান্ত্ৰই মূলতঃ পানী শোষে আৰু পেটে প্ৰ'টিনৰ হজম আৰম্ভ কৰে।");

add("biology-337",
  "The number of lobes in the human right lung is",
  "মানুহৰ সোঁ ফুসফুসত কিমানটা খণ্ড থাকে",
  [["three", "তিনিটা"], ["two", "দুটা"], ["four", "চাৰিটা"], ["one", "এটা"]], 0,
  "The right lung has three lobes and the left two, because the heart takes space on the left side. This asymmetry is a common examination point.",
  "সোঁ ফুসফুসত তিনিটা খণ্ড আৰু বাওঁটোত দুটা, কাৰণ হৃদয়ে বাওঁফালে ঠাই লয়। এই অসমতা পৰীক্ষাৰ সাধাৰণ বিন্দু।");

add("biology-338",
  "The hormone secreted by the adrenal medulla that prepares the body for emergencies is",
  "শৰীৰক জৰুৰী অৱস্থাৰ বাবে সাজু কৰা এড্ৰিনেল মেডুলাৰ হৰম'নটো কি",
  [["adrenaline", "এড্ৰিনেলিন"], ["insulin", "ইনছুলিন"], ["thyroxine", "থাইৰক্সিন"], ["oestrogen", "ইষ্ট্ৰ'জেন"]], 0,
  "Adrenaline raises heart rate, blood glucose and blood flow to muscles in the fight-or-flight response. Insulin lowers glucose and thyroxine sets metabolic rate.",
  "এড্ৰিনেলিনে সংঘৰ্ষ-বা-পলায়ন সঁহাৰিত হৃৎস্পন্দন, ৰক্ত গ্লুক'জ আৰু পেশীলৈ ৰক্ত প্ৰবাহ বঢ়ায়। ইনছুলিনে গ্লুক'জ কমায় আৰু থাইৰক্সিনে বিপাক হাৰ ঠিক কৰে।");

add("biology-339",
  "Which structure prevents food from entering the windpipe during swallowing?",
  "গিলি থকাৰ সময়ত খাদ্য শ্বাসনলীত সোমোৱাৰ পৰা কি গঠনে বাধা দিয়ে",
  [["epiglottis", "এপিগ্লটিছ"], ["uvula", "আলজিহ্বা"], ["larynx", "স্বৰযন্ত্ৰ"], ["pharynx", "গলবিল"]], 0,
  "The epiglottis folds down over the larynx so the bolus passes into the oesophagus. The uvula and pharynx are part of the throat but do not seal the airway.",
  "এপিগ্লটিছ স্বৰযন্ত্ৰৰ ওপৰত ভাঁজ খাই পৰে যাতে খাদ্যপিণ্ড খাদ্যনলীত যায়। আলজিহ্বা আৰু গলবিল ডিঙিৰ অংশ, কিন্তু শ্বাসপথ বন্ধ নকৰে।");

add("biology-340",
  "The principal nitrogenous waste excreted in human urine is",
  "মানুহৰ প্ৰস্ৰাৱত বৰ্জিত মূল নাইট্ৰজেনযুক্ত বৰ্জন কি",
  [["urea", "ইউৰিয়া"], ["ammonia", "এম'নিয়া"], ["uric acid", "ইউৰিক অ্যাসিড"], ["creatinine only", "কেৱল ক্ৰিয়েটিনিন"]], 0,
  "The human liver converts ammonia to the less toxic urea, which the kidney excretes. Ammonia is the waste of fish and uric acid that of birds and reptiles.",
  "মানুহৰ যকৃয়ে এম'নিয়াক কম বিষাক্ত ইউৰিয়ালৈ ৰূপান্তৰ কৰে, যি বৃক্কই বৰ্জন কৰে। এম'নিয়া মাছৰ আৰু ইউৰিক অ্যাসিড চৰাই তথা সৰীসৃপৰ বৰ্জন।");


useLeaf("nutrition-vitamins");

add("biology-341",
  "Which vitamin is needed for the normal clotting of blood?",
  "ৰক্ত স্বাভাৱিকভাৱে জমিবলৈ কোনটো ভিটামিন প্ৰয়োজন",
  [["Vitamin K", "ভিটামিন K"], ["Vitamin C", "ভিটামিন C"], ["Vitamin A", "ভিটামিন A"], ["Vitamin B2", "ভিটামিন B২"]], 0,
  "Vitamin K is required by the liver to make prothrombin and other clotting factors, so its lack delays clotting. Vitamin C builds collagen and vitamin A supports vision.",
  "যকৃয়ে প্ৰথ্ৰম্বিন আৰু অন্য জমা কাৰক বনাবলৈ ভিটামিন K লাগে, সেয়ে অভাৱত জমা পলম হয়। ভিটামিন C এ ক'লেজেন আৰু ভিটামিন A এ দৃষ্টি সহায় কৰে।");

add("biology-342",
  "The mineral most needed for strong bones and teeth is",
  "মজবুত হাড় আৰু দাঁতৰ বাবে আটাইতকৈ প্ৰয়োজনীয় খনিজটো কি",
  [["calcium", "কেলছিয়াম"], ["iron", "লো"], ["iodine", "আয়'ডিন"], ["zinc", "জিংক"]], 0,
  "Calcium phosphate is the mineral salt that hardens bone and enamel, and vitamin D helps absorb the calcium. Iron makes haemoglobin and iodine makes thyroxine.",
  "কেলছিয়াম ফছফেট সেই খনিজ লৱণ যি হাড় আৰু এনামেল কঠিন কৰে, আৰু ভিটামিন D এ কেলছিয়াম শোষণত সহায় কৰে। লোৱে হিম'গ্লবিন আৰু আয়'ডিনে থাইৰক্সিন বনায়।");

add("biology-343",
  "Night blindness is an early sign of the deficiency of",
  "ৰাতি কণা হোৱা কিৰ অভাৱৰ প্ৰাৰম্ভিক চিন",
  [["vitamin A", "ভিটামিন A"], ["vitamin D", "ভিটামিন D"], ["vitamin K", "ভিটামিন K"], ["vitamin B12", "ভিটামিন B১২"]], 0,
  "Vitamin A forms the visual pigment rhodopsin, so a shortfall first shows as poor vision in dim light. Vitamin D deficiency causes rickets and K deficiency bleeding.",
  "ভিটামিন A এ দৃষ্টি ৰঞ্জক ৰ'ড'পছিন গঢ়ে, সেয়ে অভাৱত প্ৰথমে ম্লান পোহৰত কম দেখা যায়। ভিটামিন D ৰ অভাৱত ৰিকেটছ আৰু K ৰ অভাৱত ৰক্তক্ষৰণ হয়।");

add("biology-344",
  "Which food group is the chief source of energy in a normal Indian diet?",
  "সাধাৰণ ভাৰতীয় খাদ্যত শক্তিৰ মূল উৎস কোনটো খাদ্য গোট",
  [["cereals and millets", "ধান আৰু শস্য"], ["pulses", "ডাইল"], ["green leafy vegetables", "পাচলি শাক"], ["fruits", "ফল"]], 0,
  "Rice, wheat and millets supply most of the carbohydrate and therefore most of the calories. Pulses give protein, leafy vegetables vitamins and minerals, and fruit sugars and vitamins.",
  "ধান, গম আৰু শস্যই বেছিভাগ শৰ্কৰা আৰু সেয়ে বেছিভাগ কেলৰি যোগায়। ডাইলে প্ৰ'টিন, শাকত ভিটামিন আৰু খনিজ, আৰু ফলত শৰ্কৰা তথা ভিটামিন থাকে।");


useLeaf("diseases-health");

add("biology-345",
  "Which of the following diseases spreads through contaminated drinking water?",
  "তলৰ কোনটো ৰোগ দূষিত খোৱা পানীৰ জৰিয়তে বিয়পে",
  [["Cholera", "কলেৰা"], ["Tuberculosis", "যক্ষ্মা"], ["Malaria", "মেলেৰিয়া"], ["Rabies", "জলাতংক"]], 0,
  "Cholera bacteria are shed in stool and reach a new host through contaminated water, so safe water supply is the main control. Tuberculosis spreads by air, malaria by mosquito and rabies by animal bite.",
  "কলেৰা বেক্টেৰিয়া মলত ওলাই দূষিত পানীৰে নতুন পোষকলৈ যায়, সেয়ে নিৰাপদ পানী যোগান মূল নিয়ন্ত্ৰণ। যক্ষ্মা বায়ুৰে, মেলেৰিয়া মশাৰে আৰু জলাতংক জন্তুৰ কামোৰে বিয়পে।");

add("biology-346",
  "Tetanus in humans usually enters the body through",
  "মানুহৰ শৰীৰত ধনুষ্টংকাৰ সাধাৰণতে কিৰ জৰিয়তে সোমায়",
  [["a deep wound contaminated with soil", "মাটিৰে দূষিত গভীৰ ঘা"], ["drinking unboiled milk", "উতলিব নিদিয়া গাখীৰ খোৱা"], ["a mosquito bite", "মশাৰ কামোৰ"], ["breathing dusty air", "ধূলিময় বায়ু উশাহ লোৱা"]], 0,
  "Clostridium tetani spores live in soil and enter through a deep, dirty wound where oxygen is low, which is why wounds are cleaned and vaccination given. Milk, mosquitoes and dust do not transmit tetanus.",
  "ক্ল'ষ্ট্ৰিডিয়াম টেটানিৰ বীজাণু মাটিত থাকে আৰু কম অক্সিজেনযুক্ত গভীৰ লেতেৰা ঘাৰ জৰিয়তে সোমায়, সেয়ে ঘা পৰিষ্কাৰ কৰি টীকা দিয়া হয়। গাখীৰ, মশা আৰু ধূলিয়ে ধনুষ্টংকাৰ নিবিয়পায়।");

add("biology-347",
  "The best way to prevent the spread of tuberculosis in a community is",
  "সমাজত যক্ষ্মা বিয়পাৰ পৰা বচাৰ আটাইতকৈ ভাল উপায় কি",
  [["early detection and complete treatment of patients", "ৰোগীৰ আগতীয়া চিনাক্তকৰণ আৰু সম্পূৰ্ণ চিকিৎসা"], ["boiling all drinking water", "সকলো খোৱা পানী উতলোৱা"], ["using mosquito nets", "মশাৰ জাল ব্যৱহাৰ কৰা"], ["avoiding milk", "গাখীৰ বৰ্জন কৰা"]], 0,
  "Tuberculosis spreads by airborne droplets, so finding cases early and completing the drug course stops transmission at source. Boiling water and nets target other routes entirely.",
  "যক্ষ্মা বায়ুজাত টোপালৰে বিয়পে, সেয়ে আগতীয়াকৈ ৰোগী ধৰা পেলাই ঔষধৰ কোৰ্ছ সম্পূৰ্ণ কৰিলে উৎসতেই সংক্ৰমণ বন্ধ হয়। পানী উতলোৱা আৰু জালে বেলেগ পথ লক্ষ্য কৰে।");

add("biology-348",
  "A person with jaundice shows yellowing of the skin and eyes because of the accumulation of",
  "কামলা ৰোগীত ছাল আৰু চকু হালধীয়া হয় কিৰ সঞ্চয়ৰ বাবে",
  [["bilirubin", "বিলিৰুবিন"], ["haemoglobin", "হিম'গ্লবিন"], ["urea", "ইউৰিয়া"], ["glucose", "গ্লুক'জ"]], 0,
  "Jaundice follows a build-up of bilirubin, the yellow pigment formed from broken-down haemoglobin, when the liver cannot process or excrete it. Haemoglobin, urea and glucose do not colour the skin yellow.",
  "কামলা যকৃয়ে বিলিৰুবিন প্ৰক্ৰিয়াকৰণ বা বৰ্জন কৰিব নোৱাৰিলে জমা হোৱা বিলিৰুবিনৰপৰা হয়, যি ভগা হিম'গ্লবিনৰপৰা গঠিত হালধীয়া ৰঞ্জক। হিম'গ্লবিন, ইউৰিয়া আৰু গ্লুক'জে ছাল হালধীয়া নকৰে।");

add("biology-349",
  "Which of the following is a vector-borne disease?",
  "তলৰ কোনটো বাহক-বাহিত ৰোগ",
  [["Filariasis", "ফাইলেৰিয়া"], ["Typhoid", "টাইফইড"], ["Tetanus", "ধনুষ্টংকাৰ"], ["Measles", "সৰু আই"]], 0,
  "Filariasis is carried from person to person by the Culex mosquito, so the worm needs a vector. Typhoid is water-borne, tetanus comes from soil and measles spreads by air.",
  "ফাইলেৰিয়া কিউলেক্স মশাৰ জৰিয়তে এজনৰপৰা আনজনলৈ যায়, সেয়ে কৃমিটোৰ বাহক লাগে। টাইফইড পানীৰ, ধনুষ্টংকাৰ মাটিৰ আৰু সৰু আই বায়ুৰ।");

module.exports = { questions: Q };



