#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/rrb-ntpc.questions.js

   One bilingual sample MCQ per RRB NTPC topic (CBT-1 & CBT-2). Every
   leaf sub-category declared in tools/rrb-ntpc.structure.js must have a
   key here; tools/build-rrb-ntpc.js writes each bank to
   data/exams/rrb-ntpc/<section>/<topic>/question-001.json (or
   .../<group>/<topic>/question-001.json for a grouped section).

   The owner replaces each bank with the full set later, one file per
   question (question-002.json, question-003.json ...), which the site
   discovers automatically.
   ============================================================ */

/* Small helper so each row stays readable. */
const Q = (en, as, options, correct, expEn, expAs) => ({
  q: { en, as },
  options: options.map((o) => ({ en: o[0], as: o[1] })),
  correct,
  explanation: { en: expEn, as: expAs },
});

const QUESTIONS = {
  /* ================= General Awareness → General Science ================= */
  "biology": Q(
    "Which organelle is known as the powerhouse of the cell?",
    "কোণটো অংগাণু কোষৰ শক্তি ঘৰ বুলি জনা যায়?",
    [["Mitochondria", "মাইটোকণ্ড্ৰিয়া"], ["Ribosome", "ৰাইব'জ'ম"], ["Nucleus", "নিউক্লিয়াছ"], ["Golgi body", "গলজি বডি"]],
    0,
    "Mitochondria produce ATP through cellular respiration, so they are called the powerhouse of the cell.",
    "মাইটোকণ্ড্ৰিয়াই কোষীয় শ্বসনৰ জৰিয়তে ATP উৎপাদন কৰে, গতিকে ইয়াক কোষৰ শক্তি ঘৰ বুলি কোৱা হয়।"
  ),
  "physics": Q(
    "The SI unit of force is:",
    "বলৰ SI একক হ'ল:",
    [["Newton", "নিউটন"], ["Joule", "জুল"], ["Watt", "ৱাট"], ["Pascal", "পাস্কেল"]],
    0,
    "Force is measured in newtons (N); 1 N = 1 kg·m/s².",
    "বল নিউটন (N) ত জোখা হয়; ১ N = ১ কি.গ্ৰা.·মি./ছে.²।"
  ),
  "chemistry": Q(
    "The chemical symbol of sodium is:",
    "ছ'ডিয়ামৰ ৰাসায়নিক সংকেত হ'ল:",
    [["Na", "Na"], ["So", "So"], ["Sd", "Sd"], ["S", "S"]],
    0,
    "Sodium takes its symbol Na from its Latin name natrium.",
    "ছ'ডিয়ামে ইয়াৰ লেটিন নাম natrium ৰ পৰা Na সংকেত লয়।"
  ),

  /* ================= General Awareness → General Studies ================= */
  "ancient-history": Q(
    "The Harappan civilisation was discovered first at which site?",
    "হৰপ্পা সভ্যতা প্ৰথমে কোন ঠাইত আৱিষ্কাৰ হৈছিল?",
    [["Harappa", "হৰপ্পা"], ["Mohenjo-daro", "মহেঞ্জোদাৰো"], ["Kalibangan", "কালীবংগন"], ["Lothal", "লোথাল"]],
    0,
    "Harappa in Punjab was the first site excavated (1921), giving the civilisation its name.",
    "পঞ্জাৱৰ হৰপ্পা প্ৰথম খনন কৰা ঠাই (১৯২১), যাৰ পৰা সভ্যতাই নাম পাইছিল।"
  ),
  "medieval-history": Q(
    "The First Battle of Panipat was fought in the year:",
    "পানীপতৰ প্ৰথম যুদ্ধ কিমান চনত হৈছিল?",
    [["1526", "১৫২৬"], ["1556", "১৫৫৬"], ["1761", "১৭৬১"], ["1600", "১৬০০"]],
    0,
    "Babur defeated Ibrahim Lodi in 1526, founding the Mughal empire in India.",
    "বাবৰে ১৫২৬ চনত ইব্ৰাহিম লোদীক পৰাজিত কৰি ভাৰতত মোগল সাম্ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"
  ),
  "modern-history": Q(
    "The Indian National Congress was founded in:",
    "ভাৰতীয় জাতীয় কংগ্ৰেছ প্ৰতিষ্ঠা হৈছিল:",
    [["1885", "১৮৮৫"], ["1857", "১৮৫৭"], ["1905", "১৯০৫"], ["1920", "১৯২০"]],
    0,
    "The INC was founded in 1885; A. O. Hume was its general secretary.",
    "ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হয়; এ. অ'. হিউম ইয়াৰ সাধাৰণ সম্পাদক আছিল।"
  ),
  "indian-geography": Q(
    "Which is the longest river of India?",
    "ভাৰতৰ আটাইতকৈ দীঘল নদী কোনখন?",
    [["Ganga", "গংগা"], ["Brahmaputra", "ব্ৰহ্মপুত্ৰ"], ["Godavari", "গোদাবৰী"], ["Yamuna", "যমুনা"]],
    0,
    "The Ganga is the longest river flowing within India, about 2,525 km long.",
    "গংগা ভাৰতৰ ভিতৰত প্ৰৱাহিত আটাইতকৈ দীঘল নদী, প্ৰায় ২,৫২৫ কি.মি. দীঘল।"
  ),
  "world-geography": Q(
    "Which is the largest ocean on Earth?",
    "পৃথিৱীৰ আটাইতকৈ ডাঙৰ মহাসাগৰ কোনটো?",
    [["Pacific Ocean", "প্ৰশান্ত মহাসাগৰ"], ["Atlantic Ocean", "আটলান্টিক মহাসাগৰ"], ["Indian Ocean", "ভাৰত মহাসাগৰ"], ["Arctic Ocean", "উত্তৰ মহাসাগৰ"]],
    0,
    "The Pacific Ocean is the largest and deepest ocean on Earth.",
    "প্ৰশান্ত মহাসাগৰ পৃথিৱীৰ আটাইতকৈ ডাঙৰ আৰু গভীৰ মহাসাগৰ।"
  ),
  "constitution": Q(
    "The Constitution of India came into force on:",
    "ভাৰতৰ সংবিধান কেতিয়াৰ পৰা বলবৎ হয়?",
    [["26 January 1950", "২৬ জানুৱাৰী ১৯৫০"], ["15 August 1947", "১৫ আগষ্ট ১৯৪৭"], ["26 November 1949", "২৬ নৱেম্বৰ ১৯৪৯"], ["2 October 1950", "২ অক্টোবৰ ১৯৫০"]],
    0,
    "The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.",
    "সংবিধান ২৬ নৱেম্বৰ ১৯৪৯ ত গ্ৰহণ কৰা হৈছিল আৰু ২৬ জানুৱাৰী ১৯৫০ ত বলবৎ হয়।"
  ),
  "governance": Q(
    "Who is the constitutional head of the Indian Union?",
    "ভাৰতীয় সংঘৰ সাংবিধানিক মুৰব্বী কোন?",
    [["President", "ৰাষ্ট্ৰপতি"], ["Prime Minister", "প্ৰধানমন্ত্ৰী"], ["Chief Justice", "প্ৰধান ন্যায়াধীশ"], ["Speaker", "অধ্যক্ষ"]],
    0,
    "The President is the constitutional head of state; the Prime Minister heads the government.",
    "ৰাষ্ট্ৰপতি ৰাষ্ট্ৰৰ সাংবিধানিক মুৰব্বী; প্ৰধানমন্ত্ৰীয়ে চৰকাৰৰ নেতৃত্ব দিয়ে।"
  ),
  "indian-economy": Q(
    "The Reserve Bank of India was established in:",
    "ভাৰতীয় ৰিজাৰ্ভ বেংক কেতিয়া স্থাপন হৈছিল?",
    [["1935", "১৯৩৫"], ["1947", "১৯৪৭"], ["1950", "১৯৫০"], ["1969", "১৯৬৯"]],
    0,
    "The RBI was established on 1 April 1935 under the RBI Act, 1934.",
    "আৰ.বি.আই. ১৯৩৫ চনৰ ১ এপ্ৰিলত আৰ.বি.আই. আইন, ১৯৩৪ ৰ অধীনত স্থাপন হয়।"
  ),
  "assam-economy": Q(
    "Tea was first commercially grown in Assam at:",
    "অসমত চাহ প্ৰথমে বাণিজ্যিকভাৱে খেতি কৰা হৈছিল:",
    [["Chabua", "চাবুৱা"], ["Jorhat", "যোৰহাট"], ["Dibrugarh", "ডিব্ৰুগড়"], ["Tezpur", "তেজপুৰ"]],
    0,
    "The first commercial tea garden was set up at Chabua in Upper Assam in 1837.",
    "১৮৩৭ চনত উজনি অসমৰ চাবুৱাত প্ৰথম বাণিজ্যিক চাহ বাগিচা স্থাপন কৰা হৈছিল।"
  ),

  /* ================= General Awareness → Static GK & Basics of Computers ================= */
  "art-culture": Q(
    "The classical dance form 'Bharatanatyam' originated in:",
    "'ভৰতনাট্যম' শাস্ত্ৰীয় নৃত্যৰ উৎপত্তি হৈছিল:",
    [["Tamil Nadu", "তামিলনাডু"], ["Kerala", "কেৰালা"], ["Odisha", "ওড়িশা"], ["Manipur", "মণিপুৰ"]],
    0,
    "Bharatanatyam is the classical dance form of Tamil Nadu.",
    "ভৰতনাট্যম তামিলনাডুৰ শাস্ত্ৰীয় নৃত্য পৰম্পৰা।"
  ),
  "organizations-institutions": Q(
    "The headquarters of the United Nations is located at:",
    "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় অৱস্থিত:",
    [["New York", "নিউয়ৰ্ক"], ["Geneva", "জেনেভা"], ["Paris", "পেৰিছ"], ["Vienna", "ভিয়েনা"]],
    0,
    "The UN headquarters is in New York City, USA.",
    "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় আমেৰিকাৰ নিউয়ৰ্ক চহৰত।"
  ),
  "space-defence": Q(
    "ISRO launched Chandrayaan-3 in the year:",
    "ইছৰ'ই চন্দ্ৰযান-৩ কেতিয়া উৎক্ষেপণ কৰিছিল?",
    [["2023", "২০২৩"], ["2019", "২০১৯"], ["2022", "২০২২"], ["2021", "২০২১"]],
    0,
    "Chandrayaan-3 was launched on 14 July 2023 and soft-landed near the lunar south pole.",
    "চন্দ্ৰযান-৩ ২০২৩ চনৰ ১৪ জুলাইত উৎক্ষেপণ কৰা হৈছিল আৰু চন্দ্ৰৰ দক্ষিণ মেৰুৰ ওচৰত অৱতৰণ কৰিছিল।"
  ),
  "miscellaneous-static-gk": Q(
    "The national animal of India is:",
    "ভাৰতৰ ৰাষ্ট্ৰীয় প্ৰাণী হ'ল:",
    [["Tiger", "বাঘ"], ["Lion", "সিংহ"], ["Elephant", "হাতী"], ["Peacock", "ময়ূৰ"]],
    0,
    "The Bengal tiger is the national animal of India.",
    "বেংগল বাঘ ভাৰতৰ ৰাষ্ট্ৰীয় প্ৰাণী।"
  ),
  "basic-computers": Q(
    "Which of the following is a volatile memory?",
    "তলৰ কোনটো এটা অস্থায়ী স্মৃতি?",
    [["RAM", "RAM"], ["ROM", "ROM"], ["Hard disk", "হাৰ্ড ডিস্ক"], ["Pen drive", "পেন ড্ৰাইভ"]],
    0,
    "RAM loses its contents when power is switched off, so it is volatile memory.",
    "বিদ্যুৎ বন্ধ হ'লে RAM ৰ সমল নোহোৱা হয়, গতিকে ই অস্থায়ী স্মৃতি।"
  ),

  /* ================= General Awareness → Current Affairs ================= */
  "national-international-news": Q(
    "The 'Bharat Mandapam' convention centre is located in:",
    "'ভাৰত মণ্ডপম' সন্মিলন কেন্দ্ৰ অৱস্থিত:",
    [["New Delhi", "নতুন দিল্লী"], ["Mumbai", "মুম্বাই"], ["Kolkata", "কলিকতা"], ["Chennai", "চেন্নাই"]],
    0,
    "Bharat Mandapam, at Pragati Maidan, New Delhi, hosted the G20 Summit in 2023.",
    "প্ৰগতি ময়দান, নতুন দিল্লীত অৱস্থিত ভাৰত মণ্ডপমে ২০২৩ চনৰ জি-২০ সন্মিলন আয়োজন কৰিছিল।"
  ),
  "appointments-obituaries": Q(
    "Who is the current Chief Justice of India (as per recent reports)?",
    "ভাৰতৰ বৰ্তমান প্ৰধান ন্যায়াধীশ কোন (শেহতীয়া তথ্য অনুসৰি)?",
    [["D. Y. Chandrachud", "ডি. ৱাই. চন্দ্ৰচূড়"], ["N. V. Ramana", "এন. ভি. ৰামানা"], ["S. A. Bobde", "এছ. এ. ব'বদে"], ["Ranjan Gogoi", "ৰঞ্জন গগৈ"]],
    0,
    "Justice D. Y. Chandrachud served as the 50th Chief Justice of India (2022–2024).",
    "ন্যায়াধীশ ডি. ৱাই. চন্দ্ৰচূড়ে ভাৰতৰ ৫০ সংখ্যক প্ৰধান ন্যায়াধীশ হিচাপে কাৰ্যনিৰ্বাহ কৰিছিল (২০২২–২০২৪)।"
  ),
  "government-schemes-initiatives": Q(
    "The 'PM Kisan Samman Nidhi' scheme provides direct income support to:",
    "'পিএম কিষাণ সম্মান নিধি' আঁচনিয়ে পোনপটীয়া উপাৰ্জন সহায়তা আগবঢ়ায়:",
    [["Small and marginal farmers", "ক্ষুদ্ৰ আৰু প্ৰান্তীয় কৃষক"], ["Street vendors", "পথ বেপাৰী"], ["Industrial workers", "উদ্যোগিক শ্ৰমিক"], ["Senior citizens", "জ্যেষ্ঠ নাগৰিক"]],
    0,
    "PM-KISAN gives ₹6,000 per year in three instalments to eligible farmer families.",
    "পিএম-কিষাণে যোগ্য কৃষক পৰিয়ালক বছৰি ₹৬,০০০ তিনিটা কিস্তিত প্ৰদান কৰে।"
  ),
  "sports": Q(
    "The Olympic Games are held once in every:",
    "অলিম্পিক ক্ৰীড়া প্ৰতি:",
    [["4 years", "৪ বছৰত এবাৰ"], ["2 years", "২ বছৰত এবাৰ"], ["3 years", "৩ বছৰত এবাৰ"], ["5 years", "৫ বছৰত এবাৰ"]],
    0,
    "The Summer and Winter Olympics are each held every four years.",
    "গ্ৰীষ্মকালীন আৰু শীতকালীন অলিম্পিক প্ৰত্যেকটো চাৰি বছৰত এবাৰ অনুষ্ঠিত হয়।"
  ),
  "awards-books-indexes": Q(
    "The highest civilian award of India is:",
    "ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান হ'ল:",
    [["Bharat Ratna", "ভাৰত ৰত্ন"], ["Padma Vibhushan", "পদ্ম বিভূষণ"], ["Padma Bhushan", "পদ্ম ভূষণ"], ["Param Vir Chakra", "পৰম বীৰ চক্ৰ"]],
    0,
    "Bharat Ratna is the highest civilian honour of India.",
    "ভাৰত ৰত্ন ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান।"
  ),
  "science-tech-environment": Q(
    "Which gas is mainly responsible for global warming?",
    "কোন গেছে মূলতঃ গোলকীয় উষ্ণতা বৃদ্ধিৰ বাবে দায়ী?",
    [["Carbon dioxide", "কাৰ্বন ডাই-অক্সাইড"], ["Oxygen", "অক্সিজেন"], ["Nitrogen", "নাইট্ৰজেন"], ["Helium", "হিলিয়াম"]],
    0,
    "Carbon dioxide traps heat in the atmosphere and is the chief greenhouse gas.",
    "কাৰ্বন ডাই-অক্সাইডে বায়ুমণ্ডলত তাপ ধৰি ৰাখে আৰু প্ৰধান গ্ৰীণহাউছ গেছ।"
  ),

  /* ================= Mathematics ================= */
  "number-system": Q(
    "The smallest prime number is:",
    "আটাইতকৈ সৰু মৌলিক সংখ্যা হ'ল:",
    [["2", "২"], ["1", "১"], ["3", "৩"], ["0", "০"]],
    0,
    "2 is the smallest prime number; 1 is neither prime nor composite.",
    "২ হ'ল আটাইতকৈ সৰু মৌলিক সংখ্যা; ১ মৌলিকো নহয় যৌগিকো নহয়।"
  ),
  "simplification-bodmas": Q(
    "Simplify: 8 + 4 × 2 − 6 ÷ 3",
    "সৰল কৰা: ৮ + ৪ × ২ − ৬ ÷ ৩",
    [["14", "১৪"], ["16", "১৬"], ["10", "১০"], ["12", "১২"]],
    0,
    "By BODMAS: 6÷3=2, 4×2=8, so 8+8−2=14.",
    "BODMAS অনুসৰি: ৬÷৩=২, ৪×২=৮, গতিকে ৮+৮−২=১৪।"
  ),
  "decimals-fractions": Q(
    "The decimal form of 3/4 is:",
    "৩/৪ ৰ দশমিক ৰূপ হ'ল:",
    [["0.75", "০.৭৫"], ["0.34", "০.৩৪"], ["0.5", "০.৫"], ["0.43", "০.৪৩"]],
    0,
    "3 ÷ 4 = 0.75.",
    "৩ ÷ ৪ = ০.৭৫।"
  ),
  "surds-indices": Q(
    "The value of 2^5 is:",
    "২^৫ ৰ মান হ'ল:",
    [["32", "৩২"], ["25", "২৫"], ["16", "১৬"], ["64", "৬৪"]],
    0,
    "2^5 = 2 × 2 × 2 × 2 × 2 = 32.",
    "২^৫ = ২ × ২ × ২ × ২ × ২ = ৩২।"
  ),
  "square-cube-root": Q(
    "The square root of 144 is:",
    "১৪৪ ৰ বৰ্গমূল হ'ল:",
    [["12", "১২"], ["14", "১৪"], ["16", "১৬"], ["11", "১১"]],
    0,
    "12 × 12 = 144, so √144 = 12.",
    "১২ × ১২ = ১৪৪, গতিকে √১৪৪ = ১২।"
  ),
  "lcm-hcf": Q(
    "The LCM of 12 and 18 is:",
    "১২ আৰু ১৮ ৰ ল.সা.গু. হ'ল:",
    [["36", "৩৬"], ["72", "৭২"], ["6", "৬"], ["216", "২১৬"]],
    0,
    "LCM = (12 × 18) ÷ HCF(6) = 36.",
    "ল.সা.গু. = (১২ × ১৮) ÷ গ.সা.গু.(৬) = ৩৬।"
  ),
  "percentage": Q(
    "If the price of an item rises by 25%, by what percent must consumption fall to keep the expenditure unchanged?",
    "এটা বস্তুৰ দাম ২৫% বৃদ্ধি হ'লে খৰচ একে ৰাখিবলৈ ব্যৱহাৰ কিমান শতাংশ কমাব লাগিব?",
    [["20%", "২০%"], ["25%", "২৫%"], ["30%", "৩০%"], ["15%", "১৫%"]],
    0,
    "Reduction % = (rise ÷ (100 + rise)) × 100 = (25 ÷ 125) × 100 = 20%.",
    "হ্ৰাস % = (বৃদ্ধি ÷ (১০০ + বৃদ্ধি)) × ১০০ = (২৫ ÷ ১২৫) × ১০০ = ২০%।"
  ),
  "ratio-proportion": Q(
    "If a : b = 2 : 3 and b : c = 4 : 5, then a : c is:",
    "যদি a : b = ২ : ৩ আৰু b : c = ৪ : ৫, তেন্তে a : c হ'ল:",
    [["8 : 15", "৮ : ১৫"], ["2 : 5", "২ : ৫"], ["3 : 5", "৩ : ৫"], ["6 : 5", "৬ : ৫"]],
    0,
    "a : b : c = 8 : 12 : 15, so a : c = 8 : 15.",
    "a : b : c = ৮ : ১২ : ১৫, গতিকে a : c = ৮ : ১৫।"
  ),
  "partnership": Q(
    "A and B invest ₹5,000 and ₹4,000 for the same period. The profit ratio is:",
    "A আৰু B-এ একে সময়ৰ বাবে ₹৫,০০০ আৰু ₹৪,০০০ বিনিয়োগ কৰে। লাভৰ অনুপাত হ'ল:",
    [["5 : 4", "৫ : ৪"], ["4 : 5", "৪ : ৫"], ["25 : 16", "২৫ : ১৬"], ["1 : 1", "১ : ১"]],
    0,
    "For equal time, profit is shared in the ratio of investments, 5000 : 4000 = 5 : 4.",
    "সমান সময়ৰ বাবে লাভ বিনিয়োগৰ অনুপাতত ভগাই লোৱা হয়, ৫০০০ : ৪০০০ = ৫ : ৪।"
  ),
  "average": Q(
    "The average of 5, 10 and 15 is:",
    "৫, ১০ আৰু ১৫ ৰ গড় হ'ল:",
    [["10", "১০"], ["15", "১৫"], ["12", "১২"], ["30", "৩০"]],
    0,
    "Average = (5 + 10 + 15) ÷ 3 = 30 ÷ 3 = 10.",
    "গড় = (৫ + ১০ + ১৫) ÷ ৩ = ৩০ ÷ ৩ = ১০।"
  ),
  "problems-on-ages": Q(
    "A father is twice as old as his son. If the son is 15, the father's age is:",
    "এজন পিতৃ তেওঁৰ পুত্ৰৰ দুগুণ বয়সীয়া। পুত্ৰ ১৫ বছৰীয়া হ'লে পিতৃৰ বয়স:",
    [["30 years", "৩০ বছৰ"], ["25 years", "২৫ বছৰ"], ["35 years", "৩৫ বছৰ"], ["45 years", "৪৫ বছৰ"]],
    0,
    "Father's age = 2 × 15 = 30 years.",
    "পিতৃৰ বয়স = ২ × ১৫ = ৩০ বছৰ।"
  ),
  "mixture-alligation": Q(
    "In what ratio must rice at ₹40/kg be mixed with rice at ₹50/kg to get a mixture at ₹44/kg?",
    "₹৪০/কি.গ্ৰা. আৰু ₹৫০/কি.গ্ৰা. চাউল কিমান অনুপাতত মিহলালে ₹৪৪/কি.গ্ৰা.ৰ মিশ্ৰণ পোৱা যাব?",
    [["3 : 2", "৩ : ২"], ["2 : 3", "২ : ৩"], ["1 : 1", "১ : ১"], ["4 : 5", "৪ : ৫"]],
    0,
    "Alligation: (50−44) : (44−40) = 6 : 4 = 3 : 2.",
    "সংযোগ নিয়ম: (৫০−৪৪) : (৪৪−৪০) = ৬ : ৪ = ৩ : ২।"
  ),
  "profit-loss-discount": Q(
    "An article bought for ₹400 is sold for ₹500. The profit percent is:",
    "₹৪০০ ত কিনা এটা বস্তু ₹৫০০ ত বিক্ৰী কৰা হয়। লাভৰ শতকৰা হাৰ:",
    [["25%", "২৫%"], ["20%", "২০%"], ["15%", "১৫%"], ["30%", "৩০%"]],
    0,
    "Profit % = (100 ÷ 400) × 100 = 25%.",
    "লাভ % = (১০০ ÷ ৪০০) × ১০০ = ২৫%।"
  ),
  "simple-interest": Q(
    "The simple interest on ₹2,000 at 5% per annum for 2 years is:",
    "₹২,০০০ ৰ ওপৰত বছৰি ৫% হাৰে ২ বছৰৰ সৰল সুত হ'ল:",
    [["₹200", "₹২০০"], ["₹100", "₹১০০"], ["₹400", "₹৪০০"], ["₹250", "₹২৫০"]],
    0,
    "SI = (P × R × T) ÷ 100 = (2000 × 5 × 2) ÷ 100 = ₹200.",
    "সৰল সুত = (মূলধন × হাৰ × সময়) ÷ ১০০ = (২০০০ × ৫ × ২) ÷ ১০০ = ₹২০০।"
  ),
  "compound-interest": Q(
    "The compound interest on ₹1,000 at 10% per annum for 2 years is:",
    "₹১,০০০ ৰ ওপৰত বছৰি ১০% হাৰে ২ বছৰৰ চক্ৰবৃদ্ধি সুত হ'ল:",
    [["₹210", "₹২১০"], ["₹200", "₹২০০"], ["₹220", "₹২২০"], ["₹110", "₹১১০"]],
    0,
    "Amount = 1000 × (1.1)² = ₹1,210, so CI = ₹210.",
    "পৰিমাণ = ১০০০ × (১.১)² = ₹১,২১০, গতিকে চক্ৰবৃদ্ধি সুত = ₹২১০।"
  ),
  "time-work": Q(
    "A can finish a work in 10 days and B in 15 days. Working together, they finish it in:",
    "A এ ১০ দিনত আৰু B এ ১৫ দিনত এটা কাম শেষ কৰে। একেলগে কাম কৰিলে তেওঁলোকে শেষ কৰিব:",
    [["6 days", "৬ দিন"], ["12 days", "১২ দিন"], ["5 days", "৫ দিন"], ["25 days", "২৫ দিন"]],
    0,
    "Together rate = 1/10 + 1/15 = 1/6, so 6 days.",
    "একত্ৰিত হাৰ = ১/১০ + ১/১৫ = ১/৬, গতিকে ৬ দিন।"
  ),
  "work-wages": Q(
    "A and B work together and earn ₹600. If their efficiencies are in ratio 2 : 1, A's share is:",
    "A আৰু B একেলগে কাম কৰি ₹৬০০ উপাৰ্জন কৰে। তেওঁলোকৰ দক্ষতা ২ : ১ হ'লে A ৰ ভাগ:",
    [["₹400", "₹৪০০"], ["₹200", "₹২০০"], ["₹300", "₹৩০০"], ["₹500", "₹৫০০"]],
    0,
    "Wages are shared in the ratio of work done: A = (2/3) × 600 = ₹400.",
    "মজুৰি কৰা কামৰ অনুপাতত ভগাই লোৱা হয়: A = (২/৩) × ৬০০ = ₹৪০০।"
  ),
  "pipes-cisterns": Q(
    "Pipe A fills a tank in 6 hours and pipe B in 12 hours. Together they fill it in:",
    "A নলে ৬ ঘণ্টাত আৰু B নলে ১২ ঘণ্টাত এটা টেংকী ভৰায়। একেলগে ভৰাব:",
    [["4 hours", "৪ ঘণ্টা"], ["3 hours", "৩ ঘণ্টা"], ["9 hours", "৯ ঘণ্টা"], ["18 hours", "১৮ ঘণ্টা"]],
    0,
    "Combined rate = 1/6 + 1/12 = 1/4, so 4 hours.",
    "সংযুক্ত হাৰ = ১/৬ + ১/১২ = ১/৪, গতিকে ৪ ঘণ্টা।"
  ),
  "time-speed-distance": Q(
    "A car travels 150 km in 3 hours. Its speed is:",
    "এখন গাড়ীয়ে ৩ ঘণ্টাত ১৫০ কি.মি. যায়। ইয়াৰ গতি:",
    [["50 km/h", "৫০ কি.মি./ঘ."], ["45 km/h", "৪৫ কি.মি./ঘ."], ["60 km/h", "৬০ কি.মি./ঘ."], ["30 km/h", "৩০ কি.মি./ঘ."]],
    0,
    "Speed = Distance ÷ Time = 150 ÷ 3 = 50 km/h.",
    "গতি = দূৰত্ব ÷ সময় = ১৫০ ÷ ৩ = ৫০ কি.মি./ঘ.।"
  ),
  "problems-on-trains": Q(
    "A 120 m long train running at 36 km/h crosses a pole in:",
    "৩৬ কি.মি./ঘ. গতিত ধাৱমান ১২০ মি. দীঘল ৰে'লগাড়ী এখনে এটা খুঁটা পাৰ হ'ব:",
    [["12 seconds", "১২ ছেকেণ্ড"], ["10 seconds", "১০ ছেকেণ্ড"], ["15 seconds", "১৫ ছেকেণ্ড"], ["20 seconds", "২০ ছেকেণ্ড"]],
    0,
    "36 km/h = 10 m/s; time = 120 ÷ 10 = 12 seconds.",
    "৩৬ কি.মি./ঘ. = ১০ মি./ছে.; সময় = ১২০ ÷ ১০ = ১২ ছেকেণ্ড।"
  ),
  "boats-streams": Q(
    "A boat's speed in still water is 10 km/h and the stream is 2 km/h. Its downstream speed is:",
    "স্থিৰ পানীত এখন নাওৰ গতি ১০ কি.মি./ঘ. আৰু সোঁত ২ কি.মি./ঘ.। সোঁতৰ দিশত গতি:",
    [["12 km/h", "১২ কি.মি./ঘ."], ["8 km/h", "৮ কি.মি./ঘ."], ["10 km/h", "১০ কি.মি./ঘ."], ["20 km/h", "২০ কি.মি./ঘ."]],
    0,
    "Downstream speed = boat + stream = 10 + 2 = 12 km/h.",
    "সোঁতৰ দিশত গতি = নাও + সোঁত = ১০ + ২ = ১২ কি.মি./ঘ.।"
  ),
  "race-circular-track": Q(
    "If two runners complete a circular track in 8 and 12 minutes, they meet again at the start after:",
    "দুজন দৌৰবিদে এটা বৃত্তাকাৰ পথ ৮ আৰু ১২ মিনিটত সম্পূৰ্ণ কৰে। তেওঁলোকে পুনৰ আৰম্ভণিত লগ পাব:",
    [["24 minutes", "২৪ মিনিট"], ["20 minutes", "২০ মিনিট"], ["48 minutes", "৪৮ মিনিট"], ["96 minutes", "৯৬ মিনিট"]],
    0,
    "They meet at the start after LCM(8, 12) = 24 minutes.",
    "তেওঁলোকে ল.সা.গু.(৮, ১২) = ২৪ মিনিটৰ পিছত আৰম্ভণিত লগ পাব।"
  ),
  "elementary-algebra": Q(
    "If x + 5 = 12, then the value of x is:",
    "যদি x + ৫ = ১২, তেন্তে x ৰ মান:",
    [["7", "৭"], ["17", "১৭"], ["5", "৫"], ["12", "১২"]],
    0,
    "x = 12 − 5 = 7.",
    "x = ১২ − ৫ = ৭।"
  ),
  "quadratic-linear-equations": Q(
    "The roots of x² − 5x + 6 = 0 are:",
    "x² − ৫x + ৬ = ০ ৰ মূলবোৰ:",
    [["2 and 3", "২ আৰু ৩"], ["1 and 6", "১ আৰু ৬"], ["−2 and −3", "−২ আৰু −৩"], ["5 and 6", "৫ আৰু ৬"]],
    0,
    "x² − 5x + 6 = (x − 2)(x − 3), so roots are 2 and 3.",
    "x² − ৫x + ৬ = (x − ২)(x − ৩), গতিকে মূল ২ আৰু ৩।"
  ),
  "mensuration-2d": Q(
    "The area of a rectangle 8 m long and 5 m wide is:",
    "৮ মি. দীঘল আৰু ৫ মি. বহল এটা আয়তক্ষেত্ৰৰ কালি:",
    [["40 m²", "৪০ মি.²"], ["26 m²", "২৬ মি.²"], ["13 m²", "১৩ মি.²"], ["80 m²", "৮০ মি.²"]],
    0,
    "Area = length × breadth = 8 × 5 = 40 m².",
    "কালি = দীঘ × প্ৰস্থ = ৮ × ৫ = ৪০ মি.²।"
  ),
  "mensuration-3d": Q(
    "The volume of a cube of side 4 cm is:",
    "৪ ছে.মি. বাহুৰ এটা ঘনকৰ আয়তন:",
    [["64 cm³", "৬৪ ছে.মি.³"], ["16 cm³", "১৬ ছে.মি.³"], ["48 cm³", "৪৮ ছে.মি.³"], ["12 cm³", "১২ ছে.মি.³"]],
    0,
    "Volume = side³ = 4³ = 64 cm³.",
    "আয়তন = বাহু³ = ৪³ = ৬৪ ছে.মি.³।"
  ),
  "geometry": Q(
    "The sum of the interior angles of a triangle is:",
    "এটা ত্ৰিভুজৰ অন্তঃকোণবোৰৰ যোগফল:",
    [["180°", "১৮০°"], ["360°", "৩৬০°"], ["90°", "৯০°"], ["270°", "২৭০°"]],
    0,
    "The three interior angles of any triangle always add up to 180°.",
    "যিকোনো ত্ৰিভুজৰ তিনিটা অন্তঃকোণৰ যোগফল সদায় ১৮০°।"
  ),
  "coordinate-geometry": Q(
    "The distance of the point (3, 4) from the origin is:",
    "মূলবিন্দুৰ পৰা (৩, ৪) বিন্দুৰ দূৰত্ব:",
    [["5", "৫"], ["7", "৭"], ["1", "১"], ["12", "১২"]],
    0,
    "Distance = √(3² + 4²) = √25 = 5.",
    "দূৰত্ব = √(৩² + ৪²) = √২৫ = ৫।"
  ),
  "trigonometry": Q(
    "The value of sin 30° is:",
    "sin ৩০° ৰ মান:",
    [["1/2", "১/২"], ["1", "১"], ["√3/2", "√৩/২"], ["0", "০"]],
    0,
    "sin 30° = 1/2, a standard trigonometric value.",
    "sin ৩০° = ১/২, এটা মানক ত্ৰিকোণমিতিক মান।"
  ),
  "height-distance": Q(
    "A tower casts a shadow equal to its height. The angle of elevation of the sun is:",
    "এটা টাৱাৰৰ ছাঁ ইয়াৰ উচ্চতাৰ সমান। সূৰ্যৰ উন্নতি কোণ:",
    [["45°", "৪৫°"], ["30°", "৩০°"], ["60°", "৬০°"], ["90°", "৯০°"]],
    0,
    "tan θ = height ÷ shadow = 1, so θ = 45°.",
    "tan θ = উচ্চতা ÷ ছাঁ = ১, গতিকে θ = ৪৫°।"
  ),
  "statistics": Q(
    "The median of 3, 7, 9, 5, 1 is:",
    "৩, ৭, ৯, ৫, ১ ৰ মধ্যমা:",
    [["5", "৫"], ["7", "৭"], ["9", "৯"], ["3", "৩"]],
    0,
    "Arranged: 1, 3, 5, 7, 9; the middle value is 5.",
    "সজোৱা: ১, ৩, ৫, ৭, ৯; মাজৰ মান ৫।"
  ),
  "data-interpretation": Q(
    "In a bar graph, 1 unit represents 5 students. A bar of 6 units shows:",
    "এটা দণ্ডলেখত ১ এককে ৫ জন ছাত্ৰক বুজায়। ৬ এককৰ দণ্ডই দেখুৱায়:",
    [["30 students", "৩০ জন ছাত্ৰ"], ["11 students", "১১ জন ছাত্ৰ"], ["6 students", "৬ জন ছাত্ৰ"], ["56 students", "৫৬ জন ছাত্ৰ"]],
    0,
    "6 units × 5 students per unit = 30 students.",
    "৬ একক × প্ৰতি একক ৫ জন = ৩০ জন ছাত্ৰ।"
  ),

  /* ================= Reasoning → Verbal Reasoning ================= */
  "analogy": Q(
    "Doctor : Hospital :: Teacher : ?",
    "ডাক্তৰ : চিকিৎসালয় :: শিক্ষক : ?",
    [["School", "বিদ্যালয়"], ["Book", "কিতাপ"], ["Student", "ছাত্ৰ"], ["Class", "শ্ৰেণী"]],
    0,
    "A doctor works in a hospital, so a teacher works in a school.",
    "ডাক্তৰে চিকিৎসালয়ত কাম কৰে, গতিকে শিক্ষকে বিদ্যালয়ত কাম কৰে।"
  ),
  "classification-odd-one-out": Q(
    "Find the odd one out: 3, 5, 7, 9, 11",
    "আঁতৰ বস্তুটো বিচাৰক: ৩, ৫, ৭, ৯, ১১",
    [["9", "৯"], ["3", "৩"], ["5", "৫"], ["11", "১১"]],
    0,
    "All are prime numbers except 9, which is composite (3 × 3).",
    "৯ ৰ বাহিৰে বাকীবোৰ মৌলিক সংখ্যা; ৯ যৌগিক (৩ × ৩)।"
  ),
  "number-series": Q(
    "Find the next number: 2, 6, 12, 20, ?",
    "পৰৱৰ্তী সংখ্যা বিচাৰক: ২, ৬, ১২, ২০, ?",
    [["30", "৩০"], ["24", "২৪"], ["28", "২৮"], ["36", "৩৬"]],
    0,
    "Differences are 4, 6, 8, so next difference is 10; 20 + 10 = 30.",
    "পাৰ্থক্য ৪, ৬, ৮, গতিকে পৰৱৰ্তী পাৰ্থক্য ১০; ২০ + ১০ = ৩০।"
  ),
  "alphabet-series": Q(
    "Find the next letter: A, C, E, G, ?",
    "পৰৱৰ্তী আখৰ বিচাৰক: A, C, E, G, ?",
    [["I", "I"], ["H", "H"], ["J", "J"], ["K", "K"]],
    0,
    "The series skips one letter each time, so after G comes I.",
    "শৃংখলাই প্ৰতিবাৰ এটা আখৰ এৰি যায়, গতিকে G ৰ পিছত I।"
  ),
  "coding-decoding": Q(
    "If CAT is coded as 3-1-20, then DOG is coded as:",
    "যদি CAT ক ৩-১-২০ হিচাপে সংকেতিত কৰা হয়, তেন্তে DOG ক হিচাপে:",
    [["4-15-7", "৪-১৫-৭"], ["4-14-7", "৪-১৪-৭"], ["3-15-7", "৩-১৫-৭"], ["4-15-8", "৪-১৫-৮"]],
    0,
    "Each letter is replaced by its position: D=4, O=15, G=7.",
    "প্ৰতিটো আখৰ ইয়াৰ স্থানৰে সলনি হয়: D=৪, O=১৫, G=৭।"
  ),
  "blood-relations": Q(
    "Pointing to a man, a woman said, 'He is the son of my mother.' The man is her:",
    "এজন মানুহলৈ আঙুলিয়াই এগৰাকী মহিলাই ক'লে, 'তেওঁ মোৰ মাকৰ পুত্ৰ।' মানুহজন তাইৰ:",
    [["Brother", "ভাই"], ["Father", "পিতৃ"], ["Uncle", "খুৰা"], ["Cousin", "খুৰা-পুত্ৰ"]],
    0,
    "The son of her mother is her brother.",
    "তাইৰ মাকৰ পুত্ৰ হ'ল তাইৰ ভাই।"
  ),
  "direction-distance": Q(
    "A man walks 3 km north, then 4 km east. How far is he from the start?",
    "এজন মানুহে ৩ কি.মি. উত্তৰলৈ, তাৰ পিছত ৪ কি.মি. পূবলৈ খোজ কাঢ়ে। তেওঁ আৰম্ভণিৰ পৰা কিমান দূৰত?",
    [["5 km", "৫ কি.মি."], ["7 km", "৭ কি.মি."], ["1 km", "১ কি.মি."], ["12 km", "১২ কি.মি."]],
    0,
    "Distance = √(3² + 4²) = 5 km.",
    "দূৰত্ব = √(৩² + ৪²) = ৫ কি.মি.।"
  ),
  "order-ranking": Q(
    "In a class of 30, Ravi is 10th from the top. His rank from the bottom is:",
    "৩০ জনীয়া এটা শ্ৰেণীত ৰবি ওপৰৰ পৰা ১০ম। তলৰ পৰা তেওঁৰ স্থান:",
    [["21st", "২১তম"], ["20th", "২০তম"], ["19th", "১৯তম"], ["22nd", "২২তম"]],
    0,
    "Rank from bottom = 30 − 10 + 1 = 21.",
    "তলৰ পৰা স্থান = ৩০ − ১০ + ১ = ২১।"
  ),
  "sitting-arrangement": Q(
    "Five friends sit in a row. If A sits at one end, how many arrangements are possible?",
    "পাঁচজন বন্ধুৱে এটা শাৰীত বহে। A এটা মূৰত বহিলে কিমানটা বিন্যাস সম্ভৱ?",
    [["24", "২৪"], ["120", "১২০"], ["48", "৪৮"], ["60", "৬০"]],
    0,
    "A is fixed at one end; the other four can be arranged in 4! = 24 ways.",
    "A এটা মূৰত স্থিৰ; বাকী চাৰিজনক ৪! = ২৪ ধৰণে সজাব পাৰি।"
  ),
  "puzzles": Q(
    "In a certain code, MONDAY is written as NPOEBZ. How is TUESDAY written?",
    "এটা সংকেতত MONDAY ক NPOEBZ লিখা হয়। TUESDAY ক লিখা হ'ব?",
    [["UVFTEBZ", "UVFTEBZ"], ["UVFTEAY", "UVFTEAY"], ["SVFTEBZ", "SVFTEBZ"], ["UVFTFBZ", "UVFTFBZ"]],
    0,
    "Each letter is shifted one step forward in the alphabet.",
    "প্ৰতিটো আখৰ বৰ্ণমালাত এখোজ আগুৱাই যায়।"
  ),
  "mathematical-operations": Q(
    "If '+' means '×', then 4 + 5 equals:",
    "যদি '+' ৰ অৰ্থ '×', তেন্তে ৪ + ৫ সমান:",
    [["20", "২০"], ["9", "৯"], ["1", "১"], ["45", "৪৫"]],
    0,
    "With '+' meaning '×', 4 + 5 = 4 × 5 = 20.",
    "'+' ৰ অৰ্থ '×' হ'লে ৪ + ৫ = ৪ × ৫ = ২০।"
  ),
  "inequality": Q(
    "If P > Q and Q > R, then which is true?",
    "যদি P > Q আৰু Q > R, তেন্তে কোনটো সত্য?",
    [["P > R", "P > R"], ["P < R", "P < R"], ["P = R", "P = R"], ["None", "একো নহয়"]],
    0,
    "From P > Q and Q > R it follows that P > R.",
    "P > Q আৰু Q > R ৰ পৰা P > R হয়।"
  ),
  "alphabet-test": Q(
    "How many letters are there between the 5th letter from the left and the 5th letter from the right in the English alphabet?",
    "ইংৰাজী বৰ্ণমালাত বাওঁফালৰ পৰা ৫ম আখৰ আৰু সোঁফালৰ পৰা ৫ম আখৰৰ মাজত কিমান আখৰ আছে?",
    [["16", "১৬"], ["15", "১৫"], ["17", "১৭"], ["18", "১৮"]],
    0,
    "5th from left is E, 5th from right is V; letters between E and V are 16.",
    "বাওঁফালৰ পৰা ৫ম E, সোঁফালৰ পৰা ৫ম V; E আৰু V ৰ মাজত ১৬ টা আখৰ।"
  ),
  "logical-sequence-words": Q(
    "Arrange in a meaningful order: 1. Seed 2. Flower 3. Fruit 4. Plant",
    "অৰ্থপূৰ্ণ ক্ৰমত সজাওক: ১. গুটি ২. ফুল ৩. ফল ৪. গছ",
    [["1, 4, 2, 3", "১, ৪, ২, ৩"], ["1, 2, 3, 4", "১, ২, ৩, ৪"], ["4, 1, 2, 3", "৪, ১, ২, ৩"], ["1, 4, 3, 2", "১, ৪, ৩, ২"]],
    0,
    "Seed → Plant → Flower → Fruit is the natural growth order.",
    "গুটি → গছ → ফুল → ফল হ'ল স্বাভাৱিক বৃদ্ধিৰ ক্ৰম।"
  ),
  "clock-calendar": Q(
    "The angle between the hands of a clock at 3 o'clock is:",
    "৩ বজাত ঘড়ীৰ কাঁটাদুটাৰ মাজৰ কোণ:",
    [["90°", "৯০°"], ["60°", "৬০°"], ["120°", "১২০°"], ["180°", "১৮০°"]],
    0,
    "Each hour mark is 30°; at 3 o'clock the hands are 3 × 30° = 90° apart.",
    "প্ৰতি ঘণ্টা চিহ্ন ৩০°; ৩ বজাত কাঁটা দুটা ৩ × ৩০° = ৯০° আঁতৰত।"
  ),
  "input-output": Q(
    "In a machine, if the input is 3, 6, 9, the output is 9, 36, 81. The rule is:",
    "এটা মেচিনত ইনপুট ৩, ৬, ৯ হ'লে আউটপুট ৯, ৩৬, ৮১। নিয়মটো হ'ল:",
    [["Square the number", "সংখ্যাটোৰ বৰ্গ কৰা"], ["Multiply by 3", "৩ ৰে পূৰণ কৰা"], ["Add 6", "৬ যোগ কৰা"], ["Double the number", "সংখ্যাটো দুগুণ কৰা"]],
    0,
    "3²=9, 6²=36, 9²=81, so the rule is to square the input.",
    "৩²=৯, ৬²=৩৬, ৯²=৮১, গতিকে নিয়মটো হ'ল ইনপুটৰ বৰ্গ কৰা।"
  ),

  /* ================= Reasoning → Analytical & Logical Reasoning ================= */
  "syllogism": Q(
    "All roses are flowers. Some flowers fade quickly. Therefore:",
    "সকলো গোলাপ ফুল। কিছু ফুল সোনকালে শুকাই যায়। গতিকে:",
    [["Some roses may fade quickly", "কিছু গোলাপ সোনকালে শুকাই যাব পাৰে"], ["All roses fade quickly", "সকলো গোলাপ সোনকালে শুকায়"], ["No rose fades", "কোনো গোলাপ নুশুকায়"], ["All flowers are roses", "সকলো ফুল গোলাপ"]],
    0,
    "Some roses may fade quickly is the only conclusion that possibly follows.",
    "কিছু গোলাপ সোনকালে শুকাই যাব পাৰে — এইটোৱে সম্ভৱপৰ সিদ্ধান্ত।"
  ),
  "venn-diagrams": Q(
    "Which relationship is best shown by two overlapping circles?",
    "দুটা ওপৰত ওপৰ পৰা পৰা বৃত্তই কোন সম্পৰ্ক সঠিকভাৱে দেখুৱায়?",
    [["Doctors and Men", "ডাক্তৰ আৰু পুৰুষ"], ["Cats and Animals", "মেকুৰী আৰু প্ৰাণী"], ["Men and Women", "পুৰুষ আৰু মহিলা"], ["Apples and Fruits", "আপেল আৰু ফল"]],
    0,
    "Some doctors are men and some men are doctors, so the circles partly overlap.",
    "কিছু ডাক্তৰ পুৰুষ আৰু কিছু পুৰুষ ডাক্তৰ, গতিকে বৃত্ত দুটা আংশিকভাৱে ওপৰত পৰে।"
  ),
  "statement-conclusions": Q(
    "Statement: All students are honest. Conclusion: Some honest persons are students.",
    "বিবৃতি: সকলো ছাত্ৰ সৎ। সিদ্ধান্ত: কিছু সৎ ব্যক্তি ছাত্ৰ।",
    [["Conclusion follows", "সিদ্ধান্ত সত্য"], ["Conclusion does not follow", "সিদ্ধান্ত অসত্য"], ["Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি"], ["None", "একো নহয়"]],
    0,
    "If all students are honest, then at least some honest persons are students.",
    "সকলো ছাত্ৰ সৎ হ'লে অন্ততঃ কিছু সৎ ব্যক্তি ছাত্ৰ।"
  ),
  "statement-assumptions": Q(
    "Statement: 'Please use the lift.' Assumption: A lift exists in the building.",
    "বিবৃতি: 'অনুগ্ৰহ কৰি লিফ্ট ব্যৱহাৰ কৰক।' ধাৰণা: ভৱনত এটা লিফ্ট আছে।",
    [["Assumption is implicit", "ধাৰণাটো অন্তৰ্নিহিত"], ["Assumption is not implicit", "ধাৰণাটো অন্তৰ্নিহিত নহয়"], ["Cannot say", "ক'ব নোৱাৰি"], ["None", "একো নহয়"]],
    0,
    "The request implies a lift is available to use.",
    "অনুৰোধে বুজায় যে ব্যৱহাৰ কৰিবলৈ এটা লিফ্ট উপলব্ধ।"
  ),
  "statement-arguments": Q(
    "Statement: Should smoking be banned in public places? Argument: Yes, it harms passive smokers.",
    "বিবৃতি: ৰাজহুৱা স্থানত ধূমপান নিষিদ্ধ কৰা উচিত নেকি? যুক্তি: হয়, ই পৰোক্ষ ধূমপায়ীক ক্ষতি কৰে।",
    [["Argument is strong", "যুক্তিটো সবল"], ["Argument is weak", "যুক্তিটো দুৰ্বল"], ["Cannot say", "ক'ব নোৱাৰি"], ["None", "একো নহয়"]],
    0,
    "Protecting public health is a strong reason, so the argument is strong.",
    "ৰাজহুৱা স্বাস্থ্য ৰক্ষা কৰা এটা সবল কাৰণ, গতিকে যুক্তিটো সবল।"
  ),
  "statement-course-of-action": Q(
    "Problem: A city faces frequent power cuts. Course of action: Improve power generation and distribution.",
    "সমস্যা: এটা চহৰে সঘনে বিদ্যুৎ কটাৰ সন্মুখীন হয়। কাৰ্যপন্থা: বিদ্যুৎ উৎপাদন আৰু বিতৰণ উন্নত কৰা।",
    [["Course follows", "কাৰ্যপন্থা গ্ৰহণযোগ্য"], ["Course does not follow", "কাৰ্যপন্থা গ্ৰহণযোগ্য নহয়"], ["Cannot say", "ক'ব নোৱাৰি"], ["None", "একো নহয়"]],
    0,
    "Improving generation and distribution directly addresses the problem.",
    "উৎপাদন আৰু বিতৰণ উন্নত কৰিলে সমস্যাটোৰ পোনপটীয়া সমাধান হয়।"
  ),
  "cause-effect": Q(
    "I. Heavy rain. II. The match was cancelled. The relationship is:",
    "I. প্ৰবল বৰষুণ। II. খেলখন বাতিল হ'ল। সম্পৰ্কটো:",
    [["I is the cause and II the effect", "I কাৰণ আৰু II ফল"], ["II is the cause and I the effect", "II কাৰণ আৰু I ফল"], ["Both independent", "দুয়ো স্বতন্ত্ৰ"], ["None", "একো নহয়"]],
    0,
    "Heavy rain caused the match to be cancelled.",
    "প্ৰবল বৰষুণৰ বাবেই খেলখন বাতিল হৈছিল।"
  ),
  "assertion-reason": Q(
    "Assertion: Water boils at 100°C. Reason: At higher altitude the boiling point falls. Both are true and the reason:",
    "দাবী: পানী ১০০°C ত উতলি উঠে। কাৰণ: উচ্চ উচ্চতাত উতলনাংক কমে। দুয়ো সত্য আৰু কাৰণটো:",
    [["Explains the assertion", "দাবী ব্যাখ্যা কৰে"], ["Does not explain", "ব্যাখ্যা নকৰে"], ["Cannot say", "ক'ব নোৱাৰি"], ["None", "একো নহয়"]],
    0,
    "Both statements are true, though the reason gives extra context about altitude.",
    "দুয়োটা বিবৃতি সত্য, যদিও কাৰণে উচ্চতাৰ অতিৰিক্ত প্ৰসংগ দিয়ে।"
  ),
  "decision-making-data-sufficiency": Q(
    "Is x positive? I. x > 5. II. x < 10. Which statement is sufficient?",
    "x ধনাত্মক নেকি? I. x > ৫। II. x < ১০। কোনটো বিবৃতি পৰ্যাপ্ত?",
    [["Only I is sufficient", "কেৱল I পৰ্যাপ্ত"], ["Only II is sufficient", "কেৱল II পৰ্যাপ্ত"], ["Both needed", "দুয়ো প্ৰয়োজন"], ["Neither", "কোনোটো নহয়"]],
    0,
    "If x > 5, then x is certainly positive; statement II alone does not tell the sign.",
    "x > ৫ হ'লে x নিশ্চিতভাৱে ধনাত্মক; কেৱল II য়ে চিন ক'ব নোৱাৰে।"
  ),

  /* ================= Reasoning → Non-Verbal Reasoning ================= */
  "counting-figures": Q(
    "How many triangles are there in a square with both diagonals drawn?",
    "দুয়ো কৰ্ণ অঁকা এটা বৰ্গত কিমানটা ত্ৰিভুজ থাকে?",
    [["8", "৮"], ["4", "৪"], ["6", "৬"], ["12", "১২"]],
    0,
    "Both diagonals divide the square into 4 small triangles plus 4 larger ones = 8.",
    "দুয়ো কৰ্ণই বৰ্গটোক ৪ টা সৰু আৰু ৪ টা ডাঙৰ ত্ৰিভুজত ভাগ কৰে = ৮।"
  ),
  "mirror-water-image": Q(
    "The mirror image of the letter 'b' is:",
    "'b' আখৰৰ দাপোণৰ প্ৰতিবিম্ব:",
    [["d", "d"], ["p", "p"], ["q", "q"], ["b", "b"]],
    0,
    "A vertical mirror reverses left and right, turning 'b' into 'd'.",
    "উলম্ব দাপোণে বাওঁ-সোঁ ওলোটা কৰে, 'b' ক 'd' কৰে।"
  ),
  "paper-cutting-folding": Q(
    "A square paper is folded once and a corner is cut. When unfolded, the number of holes is:",
    "এখন বৰ্গাকাৰ কাগজ এবাৰ ভাঁজ কৰি এটা চুক কটা হয়। মেলিলে কিমানটা ফুটা থাকে?",
    [["2", "২"], ["1", "১"], ["4", "৪"], ["3", "৩"]],
    0,
    "One fold doubles the cut, so unfolding gives 2 holes.",
    "এটা ভাঁজে কাটটো দুগুণ কৰে, গতিকে মেলিলে ২ টা ফুটা পোৱা যায়।"
  ),
  "embedded-figures": Q(
    "An embedded figure question asks you to find:",
    "সংযোজিত চিত্ৰৰ প্ৰশ্নত বিচৰা হয়:",
    [["A hidden figure inside the main figure", "মূল চিত্ৰৰ ভিতৰত লুকাই থকা চিত্ৰ"], ["The area of the figure", "চিত্ৰৰ কালি"], ["The colour of the figure", "চিত্ৰৰ ৰং"], ["The number of colours", "ৰঙৰ সংখ্যা"]],
    0,
    "In embedded figures you identify a smaller shape hidden within the given figure.",
    "সংযোজিত চিত্ৰত দিয়া চিত্ৰৰ ভিতৰত লুকাই থকা সৰু আকৃতিটো চিনাক্ত কৰা হয়।"
  ),
  "pattern-completion": Q(
    "In pattern completion, the missing part of a design is:",
    "আৰ্হি সম্পূৰ্ণ কৰাত এটা নক্সাৰ অনুপস্থিত অংশ:",
    [["Filled in from the given options", "দিয়া বিকল্পৰ পৰা ভৰোৱা হয়"], ["Left blank", "খালী এৰা হয়"], ["Rotated", "ঘূৰোৱা হয়"], ["Coloured", "ৰঙ কৰা হয়"]],
    0,
    "Pattern completion asks you to choose the option that finishes the design.",
    "আৰ্হি সম্পূৰ্ণ কৰাত নক্সাটো সম্পূৰ্ণ কৰা বিকল্পটো বাছনি কৰিব লাগে।"
  ),
  "figure-series": Q(
    "In a figure series, the next figure is decided by:",
    "চিত্ৰ শৃংখলাত পৰৱৰ্তী চিত্ৰ নিৰ্ণয় কৰা হয়:",
    [["The pattern of change in the series", "শৃংখলাৰ পৰিৱৰ্তনৰ আৰ্হিৰ দ্বাৰা"], ["The colour only", "কেৱল ৰঙৰ দ্বাৰা"], ["The size only", "কেৱল আকাৰৰ দ্বাৰা"], ["Guesswork", "অনুমানৰ দ্বাৰা"]],
    0,
    "You follow the rule of change (rotation, addition, size) shown in the series.",
    "শৃংখলাত দেখুওৱা পৰিৱৰ্তনৰ নিয়ম (ঘূৰ্ণন, সংযোজন, আকাৰ) অনুসৰণ কৰা হয়।"
  ),
  "cube-dice": Q(
    "A standard die has how many dots on opposite faces adding to:",
    "এটা সাধাৰণ লুডুৰ বিপৰীত পৃষ্ঠৰ বিন্দুবোৰৰ যোগফল:",
    [["7", "৭"], ["6", "৬"], ["8", "৮"], ["12", "১২"]],
    0,
    "On a standard die, opposite faces always add up to 7.",
    "সাধাৰণ লুডুত বিপৰীত পৃষ্ঠৰ যোগফল সদায় ৭ হয়।"
  ),
};

module.exports = { QUESTIONS };
