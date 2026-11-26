"use strict";

/* Study guidance for the DHS & DME Technical hub pages.
   Keyed by the route under exams/dhs-dme-technical/. Each entry supplies the
   text that tools/add-book-hub-guides.js renders above the topic cards, so the
   28 navigation pages are not just a list of links.

   { intro: [en, as], tips: [[en, as], ...], mistakes: [[en, as], ...] } */

const SECTION = {
  "general-knowledge": {
    intro: [
      "General knowledge is the biggest block of the DHS & DME Technical paper: thirty topics and more than six thousand questions sit under this heading. The paper rewards recognition rather than deep analysis, so the work here is coverage and repetition, not long study sessions.",
      "সাধাৰণ জ্ঞান DHS আৰু DME কাৰিকৰী পৰীক্ষাৰ আটাইতকৈ ডাঙৰ অংশ: এই শিতানত ত্ৰিশটা বিষয় আৰু ছয় হাজাৰৰো অধিক প্ৰশ্ন আছে। এই অংশত গভীৰ বিশ্লেষণতকৈ চিনি পোৱাৰ ক্ষমতা আৰু পুনৰাবৃত্তিহে গুৰুত্বপূৰ্ণ।",
    ],
    tips: [
      ["Start with Assam: history, geography, culture, tribes and economy appear in almost every paper and are the easiest marks to secure.", "অসমৰপৰা আৰম্ভ কৰা: ইতিহাস, ভূগোল, সংস্কৃতি, জনজাতি আৰু অৰ্থনীতি প্ৰায় প্ৰতিটো প্ৰশ্নকাকতত আহে আৰু এই নম্বৰবোৰ সহজ।"],
      ["Keep dates and numbers on one page per topic. A single sheet of Assam facts is revised far more often than a chapter.", "তাৰিখ আৰু সংখ্যা প্ৰতিটো বিষয়ৰ বাবে এপাতত লিখি ৰাখা। এপাত অসম সম্পৰ্কীয় তথ্য অধ্যায়তকৈ বহুত বেছি বাৰ পুনৰাবৃত্তি হয়।"],
      ["Read current affairs once a month and write down only appointments, schemes, awards and sports results.", "মাহে এবাৰ সাম্প্ৰতিক ঘটনা পঢ়া আৰু কেৱল নিযুক্তি, আঁচনি, বঁটা আৰু ক্ৰীড়াৰ ফল লিখি ৰাখা।"],
      ["Take the mixed-practice page last. It tells you which topic still leaks marks.", "মিশ্ৰ অনুশীলনৰ পৃষ্ঠাটো শেষত লোৱা। ই ক'ত নম্বৰ হেৰাই আছে সেইটো দেখুৱায়।"],
    ],
    mistakes: [
      ["Reading about a topic instead of answering questions on it. Recognition is built by answering, not by reading.", "বিষয় এটাৰ প্ৰশ্ন নকৰি কেৱল পঢ়ি যোৱা। চিনি পোৱাৰ ক্ষমতা প্ৰশ্ন উত্তৰ কৰিলেহে গঢ়ি উঠে।"],
      ["Mixing up similar names: Ahom and Koch kings, Kachari and Chutiya rulers, schemes with similar titles.", "একে ধৰণৰ নাম লগা-লগিকৈ ৰখা: আহোম আৰু কোচ ৰজা, কছাৰী আৰু চুতীয়া শাসক, একে ধৰণৰ আঁচনি।"],
      ["Learning world facts before Assam facts. The Assam share of the paper is larger and easier to hold.", "অসমৰ তথ্যৰ আগতে বিশ্বৰ তথ্য শিকা। প্ৰশ্নকাকতত অসমৰ অংশ ডাঙৰ আৰু মনত ৰখাত সহজ।"],
    ],
  },
  "general-english": {
    intro: [
      "English is tested in three layers: grammar rules, word knowledge and comprehension. This section holds twenty-seven topics and over five thousand questions, which is enough to move a score by ten to fifteen marks if the rules are practised in order.",
      "ইংৰাজী তিনিটা স্তৰত পৰীক্ষা হয়: ব্যাকৰণৰ নিয়ম, শব্দজ্ঞান আৰু অনুধাৱন। এই শিতানত সাতাইশটা বিষয় আৰু পাঁচ হাজাৰৰো অধিক প্ৰশ্ন আছে, নিয়ম অনুসৰি অনুশীলন কৰিলে দহৰপৰা পোন্ধৰ নম্বৰলৈ উন্নতি সম্ভৱ।",
    ],
    tips: [
      ["Learn the rule first, then answer twenty questions on it. Grammar items repeat the same ten rules year after year.", "প্ৰথমে নিয়ম শিকা, তাৰপিছত সেই নিয়মৰ বিশটা প্ৰশ্ন উত্তৰ কৰা। ব্যাকৰণৰ প্ৰশ্নত একেই দহটা নিয়ম বাৰে বাৰে আহে।"],
      ["Keep an error notebook: write the sentence, the rule you missed and the correct form. Revise it before every mock.", "ভুলৰ টোকাবহী ৰাখা: বাক্য, পাহৰা নিয়ম আৰু শুদ্ধ ৰূপ লিখা। প্ৰতিটো মক পৰীক্ষাৰ আগতে ইয়াক চোৱা।"],
      ["For comprehension, read the questions first, then the passage. Most answers sit in one sentence.", "অনুধাৱনৰ বাবে প্ৰথমে প্ৰশ্ন পঢ়া, তাৰপিছত অনুচ্ছেদ। বেছিভাগ উত্তৰ এটা বাক্যতে থাকে।"],
      ["Vocabulary grows by twenty words a day with the word used in your own sentence, not by reading lists.", "শব্দভাণ্ডাৰ দিনে বিশটা শব্দৰে বাঢ়ে, প্ৰতিটো শব্দ নিজৰ বাক্যত ব্যৱহাৰ কৰিলে; কেৱল তালিকা পঢ়িলে নাবাঢ়ে।"],
    ],
    mistakes: [
      ["Answering by sound. Options like 'effect' and 'affect' or 'loose' and 'lose' differ in grammar, not in sound.", "শুনি উত্তৰ দিয়া। 'effect' আৰু 'affect', 'loose' আৰু 'lose' — পাৰ্থক্য ব্যাকৰণত, উচ্চাৰণত নহয়।"],
      ["Reading the whole passage before looking at the questions, then running out of time.", "প্ৰশ্ন নোচোৱাকৈ গোটেই অনুচ্ছেদ পঢ়া, তাৰপিছত সময় শেষ হোৱা।"],
      ["Ignoring spelling and word formation because they look easy. They are the two largest vocabulary topics here.", "বানান আৰু শব্দ গঠন সহজ বুলি এৰি দিয়া। এই দুটাই ইয়াত আটাইতকৈ ডাঙৰ শব্দভাণ্ডাৰ বিষয়।"],
    ],
  },
  "numerical-aptitude": {
    intro: [
      "Numerical aptitude decides the cut-off in most DHS & DME papers. Thirty topics and nearly three thousand questions are filed here, from number system to probability, and every one of them can be solved with school-level arithmetic if the method is practised.",
      "বেছিভাগ DHS আৰু DME প্ৰশ্নকাকতত কটা-অফ সংখ্যাত্মক যোগ্যতাই নিৰ্ধাৰণ কৰে। ইয়াত ত্ৰিশটা বিষয় আৰু প্ৰায় তিনি হাজাৰ প্ৰশ্ন আছে — সংখ্যা পদ্ধতিৰপৰা সম্ভাৱনালৈ — আৰু পদ্ধতি অভ্যাস কৰিলে প্ৰতিটোৱেই স্কুলীয়া গণিতৰে সমাধান হয়।",
    ],
    tips: [
      ["Memorise tables to 20, squares to 30, cubes to 15 and the fraction-to-percentage table. Half the speed comes from these.", "২০ লৈকে পূৰণফল, ৩০ লৈকে বৰ্গ, ১৫ লৈকে ঘন আৰু ভগ্নাংশ-শতাংশৰ তালিকা মুখস্থ কৰা। আধা গতি ইয়াৰপৰাই আহে।"],
      ["Learn one formula per topic and write it at the top of your rough sheet before the paper starts.", "প্ৰতিটো বিষয়ৰ এটা সূত্ৰ শিকা আৰু প্ৰশ্নকাকত আৰম্ভ হোৱাৰ আগতে মোটাকাগত লিখি লোৱা।"],
      ["Practise in sets of twenty with a timer. Accuracy under time is the skill being tested, not accuracy alone.", "বিশটা প্ৰশ্নৰ ছেট সময় লগাই অনুশীলন কৰা। পৰীক্ষাত সময়ৰ সৈতে শুদ্ধতা পৰীক্ষা হয়।"],
      ["Redo every wrong sum after two days without looking at the solution. That is where the mark is actually gained.", "প্ৰতিটো ভুল অংক দুদিনৰ পিছত সমাধান নোচোৱাকৈ পুনৰ কৰা। তাতেই প্ৰকৃত নম্বৰ আহে।"],
    ],
    mistakes: [
      ["Skipping the topic entirely because it looks hard, and losing the two easy questions from it every year.", "কঠিন যেন লগা বাবে বিষয়টো সম্পূৰ্ণ এৰি দিয়া, আৰু প্ৰতি বছৰে তাৰপৰা অহা দুটা সহজ প্ৰশ্ন হেৰুওৱা।"],
      ["Doing long division by hand where approximation would answer the option in five seconds.", "হাতেৰে দীঘল হৰণ কৰা, য'ত আসন্ন মান ল'লে পাঁচ ছেকেণ্ডতে উত্তৰ পোৱা যায়।"],
      ["Not reading units: rupees against paise, metres against kilometres, per annum against per month.", "একক নপঢ়া: টকা আৰু পইচা, মিটাৰ আৰু কিলোমিটাৰ, বছৰেকীয়া আৰু মাহেকীয়া।"],
    ],
  },
  "logical-reasoning": {
    intro: [
      "Reasoning is the section where practice changes the score fastest. Thirty-six topics and over three thousand questions are here, split into verbal, non-verbal and analytical groups, and most of them use the same small set of tricks.",
      "যুক্তিৰ অংশত অভ্যাসে আটাইতকৈ দ্ৰুতগতিত নম্বৰ সলনি কৰে। ইয়াত ছত্ৰিশটা বিষয় আৰু তিনি হাজাৰৰো অধিক প্ৰশ্ন আছে — মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক — আৰু বেছিভাগতে একেই সৰু কেইটামান কৌশল ব্যৱহাৰ হয়।",
    ],
    tips: [
      ["Learn to draw: Venn diagrams for syllogism, boxes for seating, arrows for direction. Never solve these in your head.", "আঁকিব শিকা: চিলজিজমৰ বাবে ভেন চিত্ৰ, বহাৰ বাবে বাকচ, দিশৰ বাবে কাঁড়। এইবোৰ মনতে নিসিজাবা।"],
      ["For figure questions, cut paper and fold it once. Ten minutes with real paper teaches more than an hour of reading.", "চিত্ৰৰ প্ৰশ্নত কাগজ কাটি এবাৰ ভাঁজ কৰা। দহ মিনিট বাস্তৱ কাগজে এঘণ্টা পঢ়াতকৈ বেছি শিকায়।"],
      ["Take puzzles in eight-minute blocks. If a puzzle is not cracked in eight minutes, move on and return later.", "পাজল আঠ মিনিটৰ ভাগত লোৱা। আঠ মিনিটত নহ'লে এৰি পিছত ঘূৰি আহা।"],
      ["Practise accuracy before speed. One wrong answer costs more than one unanswered question.", "গতিতকৈ শুদ্ধতাক প্ৰথমে অনুশীলন কৰা। এটা ভুল উত্তৰে এটা নোকোৱা প্ৰশ্নতকৈ বেছি ক্ষতি কৰে।"],
    ],
    mistakes: [
      ["Assuming a rule from one example. In series and analogy questions, test the rule on all three given pairs.", "এটা উদাহৰণৰপৰা নিয়ম ধৰি লোৱা। শ্ৰেণী আৰু সাদৃশ্যৰ প্ৰশ্নত নিয়ম তিনিওটা যোৰত পৰীক্ষা কৰা।"],
      ["Guessing in syllogism from real-world knowledge instead of from the statements.", "চিলজিজমত বাস্তৱ জ্ঞানৰপৰা অনুমান কৰা, বিবৃতিবোৰৰপৰা নহয়।"],
      ["Ignoring non-verbal pages because they look unfamiliar. They are the most predictable questions in the paper.", "অ-মৌখিক পৃষ্ঠাবোৰ অচিনাকি যেন লগা বাবে এৰি দিয়া। এইবোৰ প্ৰশ্নকাকতৰ আটাইতকৈ অনুমানযোগ্য প্ৰশ্ন।"],
    ],
  },
  "technical-science": {
    intro: [
      "The technical section is what separates the DHS & DME Technical paper from a general graduate paper. Fifty-three topics and just over two thousand questions cover biology, chemistry, physics, nursing and paramedical science, and computer awareness.",
      "কাৰিকৰী অংশই DHS আৰু DME কাৰিকৰী প্ৰশ্নকাকতক সাধাৰণ স্নাতক প্ৰশ্নকাকতৰপৰা পৃথক কৰে। তিপ্পন্বৈটা বিষয় আৰু দুহাজাৰৰ অলপ অধিক প্ৰশ্নই জীৱবিজ্ঞান, ৰসায়ন, পদাৰ্থবিজ্ঞান, নাৰ্ছিং, পেৰামেডিকেল আৰু কম্পিউটাৰ সজাগতা সামৰি লয়।",
    ],
    tips: [
      ["Work at class 10 and 12 science level first. Almost every question here is a definition, a unit, a function or a labelled diagram.", "প্ৰথমে দশম আৰু দ্বাদশ শ্ৰেণীৰ বিজ্ঞানৰ স্তৰত কাম কৰা। ইয়াৰ প্ৰায় প্ৰতিটো প্ৰশ্ন সংজ্ঞা, একক, কাৰ্য বা চিত্ৰ।"],
      ["Group the questions by subject and finish one subject before starting the next. Mixed practice hides weak areas.", "প্ৰশ্নবোৰ বিষয় অনুসৰি ভাগ কৰি এটা বিষয় শেষ কৰি পিছৰটো আৰম্ভ কৰা। মিশ্ৰ অনুশীলনে দুৰ্বলতা লুকুৱায়।"],
      ["Learn units and symbols with the quantity: newton for force, joule for work, watt for power, ohm for resistance.", "একক আৰু চিহ্ন ৰাশিৰ সৈতে শিকা: বলৰ বাবে নিউটন, কাৰ্যৰ বাবে জুল, ক্ষমতাৰ বাবে ৱাট, ৰোধৰ বাবে ওম।"],
      ["If you are appearing for a paramedical post, finish the nursing block first; it carries the largest technical share there.", "পেৰামেডিকেল পদৰ বাবে পৰীক্ষা দিলে প্ৰথমে নাৰ্ছিং অংশ শেষ কৰা; তাত কাৰিকৰী অংশৰ আটাইতকৈ ডাঙৰ ভাগ ইয়াতেই।"],
    ],
    mistakes: [
      ["Memorising facts without the reason. 'Why' questions in biology and physics are answered by the mechanism, not the fact.", "কাৰণ নজনাকৈ তথ্য মুখস্থ কৰা। জীৱবিজ্ঞান আৰু পদাৰ্থবিজ্ঞানৰ 'কিয়' প্ৰশ্নৰ উত্তৰ কাৰ্যপ্ৰণালীত, তথ্যত নহয়।"],
      ["Confusing similar terms: mitosis and meiosis, speed and velocity, mass and weight, acid and base strength.", "একে ধৰণৰ শব্দ লগা-লগিকৈ ৰখা: মাইট'ছিছ আৰু মিঅ'ছিছ, দ্ৰুতি আৰু বেগ, ভৰ আৰু ওজন, অম্ল আৰু ক্ষাৰকৰ শক্তি।"],
      ["Leaving computer awareness for the last week. It is fifty marks of fixed, learnable material.", "কম্পিউটাৰ সজাগতা শেষ সপ্তাহলৈ এৰি থোৱা। এইয়া পঞ্চাশ নম্বৰৰ স্থিৰ, শিকিব পৰা অংশ।"],
    ],
  },
};

const GROUP = {
  "general-english/grammar": {
    intro: [
      "Grammar carries thirteen topics here, from parts of speech to question tags. The questions are rule-based and repeat: subject-verb agreement, tense choice, articles before vowel sounds, prepositions after fixed words.",
      "ব্যাকৰণৰ এই শিতানত তেৰটা বিষয় আছে — শব্দভেদৰপৰা প্ৰশ্ন টেগলৈ। প্ৰশ্নবোৰ নিয়মভিত্তিক আৰু পুনৰাবৃত্তি হয়: কৰ্তা-ক্ৰিয়াৰ মিল, কালৰ নিৰ্বাচন, স্বৰধ্বনিৰ আগত article, নিৰ্দিষ্ট শব্দৰ পিছত preposition।",
    ],
  },
  "general-english/vocabulary": {
    intro: [
      "Vocabulary is the easiest place to gain marks with steady daily work. Nine topics hold over two thousand questions, and the same words reappear across synonyms, antonyms, one-word substitution and idioms.",
      "শব্দভাণ্ডাৰ নিয়মীয়া দৈনিক কামেৰে নম্বৰ বঢ়োৱাৰ আটাইতকৈ সহজ ঠাই। নাটা বিষয়ত দুহাজাৰৰো অধিক প্ৰশ্ন আছে, আৰু একেই শব্দ সমাৰ্থক, বিপৰীত, এশব্দ প্ৰতিস্থাপন আৰু বাগধাৰাত ঘূৰি আহে।",
    ],
  },
  "general-english/comprehension-usage": {
    intro: [
      "Comprehension tests how you read, not what you memorised. Five topics cover reading, cloze, sentence completion, paragraph ordering and precis, and each has a method that can be practised separately.",
      "অনুধাৱনে আপুনি কেনেকৈ পঢ়ে তাক পৰীক্ষা কৰে, মুখস্থ কৰা কথাটো নহয়। পাঁচটা বিষয়ে পঢ়া, ক্ল'জ, বাক্য সম্পূৰ্ণ কৰা, অনুচ্ছেদৰ ক্ৰম আৰু সাৰাংশ সামৰি লয়, আৰু প্ৰতিটোৰে সুকীয়া পদ্ধতি আছে।",
    ],
  },
  "general-knowledge/assam-history": {
    intro: [
      "Assam history runs from ancient Kamarupa through the Ahom kingdom to the colonial period. Three topics and nearly eight hundred questions cover the dynasties, their capitals, their land system and the treaties that shaped the state.",
      "অসমৰ ইতিহাস প্ৰাচীন কামৰূপৰপৰা আহোম ৰাজ্যলৈ আৰু ঔপনিৱেশিক কাললৈকে বিস্তৃত। তিনিটা বিষয় আৰু প্ৰায় আঠশ প্ৰশ্নই বংশাৱলী, ৰাজধানী, ভূমি ব্যৱস্থা আৰু ৰাজ্য গঢ় দিয়া সন্ধিবোৰ সামৰি লয়।",
    ],
  },
  "general-knowledge/geography": {
    intro: [
      "Geography is split between Assam and India, and both halves ask the same kind of question: rivers, hills, rainfall, crops, minerals and boundaries. Two topics and about seven hundred questions are here.",
      "ভূগোল অসম আৰু ভাৰতত ভাগ কৰা হৈছে, আৰু দুয়ো ভাগতে একে ধৰণৰ প্ৰশ্ন আহে: নদী, পাহাৰ, বৰষুণ, শস্য, খনিজ আৰু সীমা। ইয়াত দুটা বিষয় আৰু প্ৰায় সাতশ প্ৰশ্ন আছে।",
    ],
  },
  "general-knowledge/assam-gk": {
    intro: [
      "This group collects the Assam facts that are not history or geography: festivals, tribes, economy, wildlife and current affairs. Five topics, about five hundred and seventy questions, and the highest return per hour of study in the whole paper.",
      "এই গোটত ইতিহাস বা ভূগোল নোহোৱা অসম সম্পৰ্কীয় তথ্য আছে: উৎসৱ, জনজাতি, অৰ্থনীতি, বন্যপ্ৰাণী আৰু সাম্প্ৰতিক ঘটনা। পাঁচটা বিষয়, প্ৰায় পাঁচশ সত্তৰ প্ৰশ্ন — গোটেই প্ৰশ্নকাকতত প্ৰতি ঘণ্টাত আটাইতকৈ বেছি লাভ ইয়াতেই।",
    ],
  },
  "general-knowledge/india-gk": {
    intro: [
      "Indian history, polity, economy and art and culture form the national half of general knowledge. Four topics and over a thousand questions, with the Constitution and the freedom movement asked most often.",
      "ভাৰতীয় ইতিহাস, ৰাজনীতি, অৰ্থনীতি আৰু কলা-সংস্কৃতিয়ে সাধাৰণ জ্ঞানৰ ৰাষ্ট্ৰীয় অংশ গঠন কৰে। চাৰিটা বিষয় আৰু হাজাৰৰো অধিক প্ৰশ্ন, য'ত সংবিধান আৰু স্বাধীনতা আন্দোলনৰ প্ৰশ্ন আটাইতকৈ বেছি আহে।",
    ],
  },
  "general-knowledge/static-gk": {
    intro: [
      "Static general knowledge is a memory section: awards, books, days, sports, inventions, organisations, space and defence. Eight topics and nearly fourteen hundred questions, all of them short facts that reward a monthly revision sheet.",
      "স্থিৰ সাধাৰণ জ্ঞান স্মৃতিভিত্তিক অংশ: বঁটা, কিতাপ, দিৱস, ক্ৰীড়া, আৱিষ্কাৰ, সংস্থা, মহাকাশ আৰু প্ৰতিৰক্ষা। আঠটা বিষয় আৰু প্ৰায় চৈধ্যশ প্ৰশ্ন, আটাইবোৰ চুটি তথ্য — মাহেকীয়া পুনৰাবৃত্তিৰ পত্ৰই ফল দিয়ে।",
    ],
  },
  "general-knowledge/world-gk": {
    intro: [
      "World geography, world history and international organisations are grouped here. Three topics and about a thousand questions, usually one-liners about capitals, rivers, treaties, wars and the headquarters of international bodies.",
      "বিশ্বৰ ভূগোল, বিশ্ব ইতিহাস আৰু আন্তৰ্জাতিক সংস্থা ইয়াত গোট খাইছে। তিনিটা বিষয় আৰু প্ৰায় এহাজাৰ প্ৰশ্ন, সাধাৰণতে ৰাজধানী, নদী, সন্ধি, যুদ্ধ আৰু আন্তৰ্জাতিক সংস্থাৰ মুখ্য কাৰ্যালয়ৰ চুটি প্ৰশ্ন।",
    ],
  },
  "general-knowledge/current-affairs": {
    intro: [
      "Current affairs covers news, appointments, schemes and science and technology. Four topics and about three hundred and sixty questions, all dated, so the newer material matters more than the older.",
      "সাম্প্ৰতিক ঘটনাই বাতৰি, নিযুক্তি, আঁচনি আৰু বিজ্ঞান-প্ৰযুক্তি সামৰি লয়। চাৰিটা বিষয় আৰু প্ৰায় তিনিশ ষাঠি প্ৰশ্ন, আটাইবোৰ তাৰিখযুক্ত, সেয়ে নতুন তথ্যৰ গুৰুত্ব বেছি।",
    ],
  },
  "logical-reasoning/verbal-reasoning": {
    intro: [
      "Verbal reasoning holds fourteen topics: series, coding, blood relations, direction, ranking, clocks and calendars, and the arithmetic of symbols. Fourteen hundred questions, all solved with a diagram and one clean rule.",
      "মৌখিক যুক্তিত চৈধ্যটা বিষয় আছে: শ্ৰেণী, ক'ডিং, ৰক্ত সম্পৰ্ক, দিশ, স্থান নিৰ্ণয়, ঘড়ী-পঞ্জিকা আৰু চিহ্নৰ গণিত। চৈধ্যশ প্ৰশ্ন, প্ৰতিটো এটা চিত্ৰ আৰু এটা স্পষ্ট নিয়মেৰে সমাধান হয়।",
    ],
  },
  "logical-reasoning/non-verbal-reasoning": {
    intro: [
      "Non-verbal reasoning asks you to read a figure, not a sentence: series, mirror images, paper folding, embedded figures, pattern completion, cubes and dice. Ten topics and a thousand questions, all drawn to be solved on paper.",
      "অ-মৌখিক যুক্তিত বাক্য নহয়, চিত্ৰ পঢ়িব লাগে: শ্ৰেণী, দাপোন প্ৰতিবিম্ব, কাগজ ভাঁজ, লুকাই থকা চিত্ৰ, আৰ্হি সম্পূৰ্ণ কৰা, ঘনক আৰু পাশা। দহটা বিষয় আৰু এহাজাৰ প্ৰশ্ন, আটাইবোৰ কাগজত সমাধান কৰিব পৰাকৈ অঁকা।",
    ],
  },
  "logical-reasoning/analytical-critical-reasoning": {
    intro: [
      "Analytical reasoning is the statement family: syllogism, assumptions, arguments, courses of action, cause and effect, assertion and reason, seating and puzzles. Twelve topics and about a thousand questions that reward slow, careful reading.",
      "বিশ্লেষণাত্মক যুক্তি বিবৃতিৰ পৰিয়াল: চিলজিজম, ধাৰণা, যুক্তি, কাৰ্যৰ পথ, কাৰণ-ফল, অভিকথন আৰু কাৰণ, বহা বিন্যাস আৰু পাজল। বাৰটা বিষয় আৰু প্ৰায় এহাজাৰ প্ৰশ্ন — লাহে লাহে মন দি পঢ়িলে ফল দিয়ে।",
    ],
  },
  "numerical-aptitude/arithmetic": {
    intro: [
      "Arithmetic is the working core of the paper: number system, percentage, ratio, average, profit and loss, interest, partnership, mixture, time and work, speed, trains, boats and ages. Eighteen topics and over eighteen hundred questions.",
      "পাটিগণিত প্ৰশ্নকাকতৰ মূল কাম: সংখ্যা পদ্ধতি, শতাংশ, অনুপাত, গড়, লাভ-লোকচান, সুত, অংশীদাৰিত্ব, মিশ্ৰণ, সময় আৰু কাৰ্য, গতি, ৰেল, নাও আৰু বয়স। ওঠৰটা বিষয় আৰু ওঠৰশৰো অধিক প্ৰশ্ন।",
    ],
  },
  "numerical-aptitude/algebra-geometry": {
    intro: [
      "Algebra and geometry covers equations, geometry, mensuration, trigonometry, height and distance and coordinate geometry. Eight topics and about seven hundred and seventy questions, formula-driven and predictable.",
      "বীজগণিত আৰু জ্যামিতিত সমীকৰণ, জ্যামিতি, পৰিমিতি, ত্ৰিকোণমিতি, উচ্চতা-দূৰত্ব আৰু স্থানাংক জ্যামিতি আছে। আঠটা বিষয় আৰু প্ৰায় সাতশ সত্তৰ প্ৰশ্ন, সূত্ৰভিত্তিক আৰু অনুমানযোগ্য।",
    ],
  },
  "numerical-aptitude/data-combinatorics": {
    intro: [
      "This group holds statistics, data interpretation, permutation and combination, and probability. Four topics and about three hundred and eighty questions, the smallest numerical block and the one most often left unprepared.",
      "এই গোটত পৰিসংখ্যা, তথ্য বিশ্লেষণ, বিন্যাস-সংযোগ আৰু সম্ভাৱনা আছে। চাৰিটা বিষয় আৰু প্ৰায় তিনিশ আশী প্ৰশ্ন — আটাইতকৈ সৰু সংখ্যাত্মক অংশ, আৰু প্ৰায়ে অপ্রস্তুত হৈ ৰোৱা অংশ।",
    ],
  },
  "technical-science/biology": {
    intro: [
      "Biology covers the cell, genetics, human anatomy and physiology, nutrition, disease, botany, zoology, ecology and microbiology. Eleven topics and about four hundred and thirty questions, mostly definitions and functions.",
      "জীৱবিজ্ঞানে কোষ, বংশগতি, মানৱ শৰীৰতত্ত্ব আৰু শৰীৰবিজ্ঞান, পুষ্টি, ৰোগ, উদ্ভিদবিজ্ঞান, প্ৰাণীবিজ্ঞান, পৰিৱেশবিজ্ঞান আৰু অণুজীৱবিজ্ঞান সামৰি লয়। এঘাৰটা বিষয় আৰু প্ৰায় চাৰিশ ত্ৰিশ প্ৰশ্ন, বেছিভাগ সংজ্ঞা আৰু কাৰ্য।",
    ],
  },
  "technical-science/chemistry": {
    intro: [
      "Chemistry asks about the atom, the periodic table, bonding, acids and bases, metals, organic compounds, polymers, fuels, solutions and everyday chemistry. Twelve topics and about three hundred and eighty questions.",
      "ৰসায়নে পৰমাণু, পর্যায় সাৰণী, বন্ধন, অম্ল-ক্ষাৰক, ধাতু, জৈৱ যৌগ, পলিমাৰ, ইন্ধন, দ্ৰৱ আৰু দৈনন্দিন ৰসায়নৰ প্ৰশ্ন সোধে। বাৰটা বিষয় আৰু প্ৰায় তিনিশ আশী প্ৰশ্ন।",
    ],
  },
  "technical-science/physics": {
    intro: [
      "Physics covers units, motion, work and energy, gravitation, heat, sound, light, electricity, modern physics, pressure and simple machines. Twelve topics and about three hundred and seventy questions, with numericals drawn from the same formulas every year.",
      "পদাৰ্থবিজ্ঞানে একক, গতি, কাৰ্য-শক্তি, মহাকৰ্ষণ, তাপ, শব্দ, পোহৰ, বিদ্যুৎ, আধুনিক পদাৰ্থবিজ্ঞান, চাপ আৰু সৰল যন্ত্ৰ সামৰি লয়। বাৰটা বিষয় আৰু প্ৰায় তিনিশ সত্তৰ প্ৰশ্ন, প্ৰতি বছৰে একেই সূত্ৰৰপৰা সংখ্যাত্মক প্ৰশ্ন আহে।",
    ],
  },
  "technical-science/nursing-paramedical": {
    intro: [
      "The nursing and paramedical block is written for the technical posts: fundamentals, community and medical-surgical nursing, maternal and child health, pharmacology, laboratory technology, radiography, physiotherapy, infection control, first aid and medical terminology. Twelve topics and six hundred questions.",
      "নাৰ্ছিং আৰু পেৰামেডিকেল অংশ কাৰিকৰী পদৰ বাবে লিখা: মৌলিক নাৰ্ছিং, সমাজ আৰু চিকিৎসা-শল্য নাৰ্ছিং, মাতৃ-শিশু স্বাস্থ্য, ঔষধবিজ্ঞান, পৰীক্ষাগাৰ প্ৰযুক্তি, ৰেডিঅ'গ্ৰাফী, ফিজিঅ'থেৰাপী, সংক্ৰমণ নিয়ন্ত্ৰণ, প্ৰাথমিক চিকিৎসা আৰু চিকিৎসা পৰিভাষা। বাৰটা বিষয় আৰু ছশ প্ৰশ্ন।",
    ],
  },
  "technical-science/computer-awareness": {
    intro: [
      "Computer awareness is six topics of fixed material: fundamentals, hardware and software, MS Office, networking and the internet, cyber security, and DBMS with number systems. Three hundred questions, and almost all of them are learnable in a week.",
      "কম্পিউটাৰ সজাগতা ছটা বিষয়ৰ স্থিৰ অংশ: মৌলিক কথা, হাৰ্ডৱেৰ-ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, আৰু DBMS সংখ্যা পদ্ধতিৰ সৈতে। তিনিশ প্ৰশ্ন, প্ৰায় আটাইবোৰ এক সপ্তাহতে শিকিব পৰা যায়।",
    ],
  },
};

const ROOT = {
  intro: [
    "This book gathers every question published for the DHS & DME Technical Grade III examination on this site: {topics} topic pages and {questions} questions with answers and explanations, in English and Assamese. Five sections carry the paper, and each section page explains how to prepare it.",
    "এই কিতাপে এই ছাইটত DHS আৰু DME কাৰিকৰী গ্ৰেড III পৰীক্ষাৰ বাবে প্ৰকাশিত প্ৰতিটো প্ৰশ্ন একত্ৰিত কৰিছে: {topics} টা বিষয় পৃষ্ঠা আৰু {questions} টা প্ৰশ্ন — উত্তৰ আৰু ব্যাখ্যাৰ সৈতে, ইংৰাজী আৰু অসমীয়াত। পাঁচটা শিতানে প্ৰশ্নকাকত গঠন কৰে, আৰু প্ৰতিটো শিতান পৃষ্ঠাই কেনেকৈ প্ৰস্তুতি ল'ব লাগে বৰ্ণাইছে।",
  ],
  tips: [
    ["Work section by section. Finish one section's topic pages before opening the next, and take the mixed-practice page last.", "শিতান অনুসৰি কাম কৰা। এটা শিতানৰ বিষয় পৃষ্ঠাবোৰ শেষ কৰি পিছৰটো খোলা, আৰু মিশ্ৰ অনুশীলনৰ পৃষ্ঠা শেষত লোৱা।"],
    ["Write the reason for every wrong answer. The explanation on the page is written to be copied into a notebook.", "প্ৰতিটো ভুল উত্তৰৰ কাৰণ লিখা। পৃষ্ঠাত থকা ব্যাখ্যা টোকাবহীত লিখিব পৰাকৈয়ে দিয়া হৈছে।"],
    ["Revise the mixed-practice page of a section a week after finishing its topics. That page shows what has slipped.", "শিতান এটাৰ বিষয়বোৰ শেষ কৰাৰ এক সপ্তাহ পিছত তাৰ মিশ্ৰ অনুশীলন পৃষ্ঠা পুনৰ চোৱা। সেই পৃষ্ঠাই কি পাহৰি গৈছে দেখুৱায়।"],
  ],
  mistakes: [
    ["Reading the whole book without answering. The pages are question banks; they teach by being answered.", "উত্তৰ নিদিয়াকৈ গোটেই কিতাপ পঢ়া। এই পৃষ্ঠাবোৰ প্ৰশ্ন ভাণ্ডাৰ; উত্তৰ দিলেহে শিকায়।"],
    ["Starting with the hardest section. Secure the sections with the highest marks per hour first.", "আটাইতকৈ কঠিন শিতানৰপৰা আৰম্ভ কৰা। প্ৰতি ঘণ্টাত আটাইতকৈ বেছি নম্বৰ দিয়া শিতান আগে সুৰক্ষিত কৰা।"],
  ],
};

const GROUP_TIPS = require("./dhs-dme-technical.hub-group-tips");
for (const [route, extra] of Object.entries(GROUP_TIPS)) {
  if (GROUP[route]) Object.assign(GROUP[route], extra);
}

module.exports = { SECTION, GROUP, ROOT };
