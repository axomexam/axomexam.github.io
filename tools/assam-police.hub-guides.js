"use strict";

/* Study guidance for the Assam Police AB & UB hub pages.
   Keyed by the route under exams/assam-police/. Each entry supplies the text
   that tools/add-book-hub-guides.js renders above the topic cards.

   { intro: [en, as], tips: [[en, as], ...], mistakes: [[en, as], ...] } */

const SECTION = {
  "elementary-mathematics": {
    counts: false,
    intro: [
      "Elementary mathematics in this paper is school-level arithmetic: {topics} topics and {questions} questions, from number system and LCM to interest, time-work and speed-distance. Nothing here needs a calculator, and nothing is asked beyond what a Class 10 student can do with practice.",
      "এই প্ৰশ্নকাকতত প্ৰাথমিক গণিত স্কুলীয়া পাটিগণিত: {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন — সংখ্যা পদ্ধতি আৰু ল.সা.গু.ৰপৰা সুত, সময়-কাম আৰু দূৰত্ব-গতিলৈ। ইয়াত কেলকুলেটৰ নালাগে, আৰু দশম শ্ৰেণীৰ ছাত্ৰই অনুশীলনেৰে কৰিব পৰাতকৈ বেলেগ একো নোসোধে।",
    ],
    tips: [
      ["Learn the percentage-fraction table first. Profit, loss, interest and ratio questions all lean on it.", "প্ৰথমে শতাংশ-ভগ্নাংশৰ তালিকা শিকা। লাভ, ক্ষতি, সুত আৰু অনুপাতৰ প্ৰশ্নই ইয়াৰ ওপৰত নিৰ্ভৰ কৰে।"],
      ["Solve each topic in a block of twenty questions with a timer. This section rewards speed more than cleverness.", "প্ৰতিটো বিষয় বিশটা প্ৰশ্নৰ সময়বদ্ধ খণ্ডত সমাধান কৰা। এই শিতানত বুদ্ধিতকৈ গতিহে বেছি কামত আহে।"],
      ["Write the formula before the numbers. Most wrong answers in interest and time-work come from the wrong formula, not wrong arithmetic.", "সংখ্যাৰ আগতে সূত্ৰ লিখা। সুত আৰু সময়-কামত বেছিভাগ ভুল উত্তৰ ভুল সূত্ৰৰপৰা আহে, ভুল গণনাৰপৰা নহয়।"],
      ["Keep unit conversions on one line: km to m, hours to minutes, rupees to paise. Half the traps are unit traps.", "একক ৰূপান্তৰ এশাৰীত ৰাখা: কিলোমিটাৰৰপৰা মিটাৰ, ঘণ্টাৰপৰা মিনিট, টকাৰপৰা পইচা। আধা ফান্দ এককৰ ফান্দ।"],
    ],
    mistakes: [
      ["Rounding decimals mid-way. Carry the fraction to the last step.", "মাজতে দশমিক ঘূৰণ কৰা। শেষ পদলৈকে ভগ্নাংশ লৈ যোৱা।"],
      ["Ignoring the difference between simple and compound interest. Read which one is asked before writing the formula.", "সৰল আৰু চক্ৰবৃদ্ধি সুতৰ পাৰ্থক্য অৱহেলা কৰা। সূত্ৰ লিখাৰ আগতে কোনটো সোধা হৈছে পঢ়া।"],
      ["Skipping LCM and HCF as 'easy'. They carry direct questions and also feed time-work and fractions.", "ল.সা.গু. আৰু গ.সা.গু. 'সহজ' বুলি এৰি দিয়া। ইহঁতৰ পোনপটীয়া প্ৰশ্ন আহে আৰু সময়-কাম তথা ভগ্নাংশতো লাগে।"],
    ],
  },
  "general-english": {
    counts: false,
    intro: [
      "English here is rule-based rather than literary: {topics} topics and {questions} questions across grammar, vocabulary and usage. The same ten grammar rules are tested again and again, so accuracy improves quickly once the rules are named.",
      "ইয়াৰ ইংৰাজী সাহিত্যিকতকৈ নিয়মভিত্তিক: ব্যাকৰণ, শব্দজ্ঞান আৰু প্ৰয়োগত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন। একেই দহটা ব্যাকৰণ নিয়ম বাৰে বাৰে সোধা হয়, গতিকে নিয়মবোৰৰ নাম জানিলে শুদ্ধতা দ্ৰুত বাঢ়ে।",
    ],
    tips: [
      ["Learn one rule, then answer twenty questions on it. Grammar is learnt by applying, not by reading the rule again.", "এটা নিয়ম শিকা, তাৰপিছত সেই নিয়মৰ বিশটা প্ৰশ্ন উত্তৰ কৰা। নিয়ম পুনৰ পঢ়ি নহয়, প্ৰয়োগ কৰিহে ব্যাকৰণ শিকা।"],
      ["Keep an error notebook with the sentence, the rule you missed and the correct form.", "ভুলৰ টোকাবহীত বাক্য, পাহৰা নিয়ম আৰু শুদ্ধ ৰূপ লিখা।"],
      ["Learn vocabulary in pairs: synonym-antonym, masculine-feminine, singular-plural, group name.", "শব্দজ্ঞান জোৰাকৈ শিকা: সমাৰ্থক-বিপৰীত, পুৰুষ-স্ত্ৰী, একবচন-বহুবচন, সমূহবাচক নাম।"],
      ["For idioms and one-word substitutions, write your own sentence for each item. Recognition alone fades.", "বাগধাৰা আৰু একশব্দ প্ৰতিস্থাপনৰ প্ৰতিটোৰে নিজৰ বাক্য লিখা। কেৱল চিনি পোৱাটো নোহোৱা হৈ যায়।"],
    ],
    mistakes: [
      ["Answering by sound. 'Effect' and 'affect' differ in grammar, not in sound.", "শুনি উত্তৰ দিয়া। 'effect' আৰু 'affect' ৰ পাৰ্থক্য ব্যাকৰণত, উচ্চাৰণত নহয়।"],
      ["Reading the whole passage before the questions in fill-in-the-blanks. Read the sentence and its options first.", "খালী ঠাই ভৰোৱাত প্ৰশ্নৰ আগতে গোটেই অনুচ্ছেদ পঢ়া। প্ৰথমে বাক্য আৰু বিকল্পবোৰ পঢ়া।"],
      ["Learning words without their part of speech, so they are used wrongly in error detection.", "শব্দৰ শ্ৰেণী নজনাকৈ শিকা, ফলত ভুল ধৰাত ভুলকৈ প্ৰয়োগ হয়।"],
    ],
  },
  "general-knowledge-current-affairs": {
    counts: false,
    intro: [
      "General knowledge is the largest scoring block in this paper: {topics} topics and {questions} questions on Indian history, polity and economy, general science, current affairs, sports, awards, important days, capitals and currencies.",
      "এই প্ৰশ্নকাকতত সাধাৰণ জ্ঞান আটাইতকৈ বেছি নম্বৰ দিয়া অংশ: ভাৰতীয় ইতিহাস, ৰাজনীতি আৰু অৰ্থনীতি, সাধাৰণ বিজ্ঞান, সাম্প্ৰতিক ঘটনা, ক্ৰীড়া, বঁটা, গুৰুত্বপূৰ্ণ দিৱস, ৰাজধানী আৰু মুদ্ৰাত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন।",
    ],
    tips: [
      ["Keep one page per topic: names, dates, numbers, firsts and abbreviations.", "প্ৰতিটো বিষয়ৰ বাবে এপাত ৰাখা: নাম, তাৰিখ, সংখ্যা, প্ৰথম আৰু চমু ৰূপ।"],
      ["Write a monthly current-affairs sheet and revise only the last six months before the exam.", "মাহেকীয়া সাম্প্ৰতিক ঘটনাৰ তালিকা লিখা, আৰু পৰীক্ষাৰ আগতে কেৱল শেষ ছমাহ পুনৰাবৃত্তি কৰা।"],
      ["Pair countries with capitals and currencies on one sheet. That single page covers a whole group of questions.", "দেশবোৰ ৰাজধানী আৰু মুদ্ৰাৰ সৈতে একেখন পৃষ্ঠাত জোৰা। সেই এখন পৃষ্ঠাই এটা গোটৰ প্ৰশ্ন সামৰি লয়।"],
      ["Revise sports and awards after every major event; those questions are always the freshest.", "প্ৰতিটো ডাঙৰ ক্ৰীড়া অনুষ্ঠানৰ পিছত ক্ৰীড়া আৰু বঁটা পুনৰাবৃত্তি কৰা; সেই প্ৰশ্নবোৰ সদায় আটাইতকৈ নতুন।"],
    ],
    mistakes: [
      ["Reading news without notes. A fact read once leaves nothing behind.", "টোকা নিলিখাকৈ বাতৰি পঢ়া। এবাৰ পঢ়া তথ্যই পিছত একো এৰি নিদিয়ে।"],
      ["Learning current affairs of the whole year instead of the recent six months in detail.", "গোটেই বছৰৰ সাম্প্ৰতিক ঘটনা শিকা, শেহতীয়া ছমাহৰ বিৱৰণ এৰি।"],
      ["Confusing similar scheme names and their ministries.", "একে ধৰণৰ আঁচনিৰ নাম আৰু সিহঁতৰ মন্ত্ৰালয় মিলাই পেলোৱা।"],
    ],
  },
  "assam-history-geography-culture": {
    counts: false,
    intro: [
      "Assam questions are where this paper is won. {topics} topics and {questions} questions cover Assam's history, geography and culture, and they repeat far more than national topics do.",
      "এই প্ৰশ্নকাকত অসমৰ প্ৰশ্নতেই নিৰ্ণয় হয়। অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতিৰ ওপৰত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে, আৰু ৰাষ্ট্ৰীয় বিষয়তকৈ এইবোৰ বহুত বেছি বাৰে বাৰে আহে।",
    ],
    tips: [
      ["Learn the dynasties in order: Danava, Naraka, Ahom, Koch, Kachari, Chutiya, Matak and Moran, with capital and founder.", "ৰাজবংশবোৰ ক্ৰমে শিকা: দানৱ, নাৰক, আহোম, কোচ, কছাৰী, চুতীয়া, মটক আৰু মৰাণ — ৰাজধানী আৰু প্ৰতিষ্ঠাপকৰ সৈতে।"],
      ["For geography, learn the rivers, the districts they pass and the hills. A blank map of Assam is the best revision tool.", "ভূগোলৰ বাবে নদী, সেইবোৰ যোৱা জিলা আৰু পাহাৰ শিকা। অসমৰ ৰিক্ত মানচিত্ৰ আটাইতকৈ ভাল পুনৰাবৃত্তিৰ সঁজুলি।"],
      ["For culture, keep Bihu, Sattriya, the Sattras, the tribes and their festivals on one page.", "সংস্কৃতিৰ বাবে বিহু, সত্ৰীয়া, সত্ৰ, জনজাতি আৰু সিহঁতৰ উৎসৱ একেখন পৃষ্ঠাত ৰাখা।"],
      ["Attach one date and one person to every event. Assam questions usually ask both.", "প্ৰতিটো ঘটনাৰ লগত এটা তাৰিখ আৰু এজন ব্যক্তি জোৰা। অসমৰ প্ৰশ্নই সাধাৰণতে দুয়োটা সোধে।"],
    ],
    mistakes: [
      ["Mixing up Ahom and Koch rulers, or Kachari and Chutiya capitals.", "আহোম আৰু কোচ শাসক, বা কছাৰী আৰু চুতীয়া ৰাজধানী মিলাই পেলোৱা।"],
      ["Learning Assamese culture from general articles instead of names and years.", "সাধাৰণ প্ৰবন্ধৰপৰা অসমীয়া সংস্কৃতি শিকা, নাম আৰু বছৰ নজনাকৈ।"],
      ["Skipping Assam geography because the national geography page looks bigger.", "ৰাষ্ট্ৰীয় ভূগোলৰ পৃষ্ঠা ডাঙৰ যেন লাগি অসমৰ ভূগোল এৰি দিয়া।"],
    ],
  },
  "logical-reasoning": {
    counts: false,
    intro: [
      "Reasoning is split into verbal and non-verbal halves in this book. Both are pattern-based, and both improve quickly: the pages here hold {topics} groups and {questions} questions in total.",
      "এই কিতাপত যুক্তি মৌখিক আৰু অ-মৌখিক দুভাগত বিভক্ত। দুয়োটা আৰ্হিভিত্তিক আৰু দুয়োটাৰে দ্ৰুত উন্নতি হয়: ইয়াৰ পৃষ্ঠাবোৰত মুঠ {topics} টা গোট আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Start with verbal reasoning: series, coding-decoding, blood relations and direction are the most repeated types.", "মৌখিক যুক্তিৰপৰা আৰম্ভ কৰা: শ্ৰেণী, সংকেত-বিশ্লেষণ, ৰক্ত সম্পৰ্ক আৰু দিশ আটাইতকৈ বেছি অহা ধৰণ।"],
      ["Draw for seating, direction and blood relations. A line or a tree on paper removes the guesswork.", "বহা বিন্যাস, দিশ আৰু ৰক্ত সম্পৰ্কত আঁকা। কাগজত ৰেখা বা গছে অনুমান আঁতৰায়।"],
      ["Do ten non-verbal questions daily. Mirror images and figure series are learnt by the eye, not by reading.", "দৈনিক দহটা অ-মৌখিক প্ৰশ্ন কৰা। দৰ্পণ প্ৰতিবিম্ব আৰু চিত্ৰ শ্ৰেণী পঢ়ি নহয়, চকুৱে শিকে।"],
      ["Cap each question at 90 seconds in practice and move on. Reasoning punishes stubbornness.", "অনুশীলনত প্ৰতিটো প্ৰশ্ন ৯০ ছেকেণ্ডত সীমাবদ্ধ কৰি আগবাঢ়ি যোৱা। যুক্তিয়ে একোটা কথাত ধৰি থকাক শাস্তি দিয়ে।"],
    ],
    mistakes: [
      ["Guessing without eliminating two options first.", "দুটা বিকল্প বাদ নিদিয়াকৈ অনুমান কৰা।"],
      ["Reading 'NOT' and 'except' too quickly in the stem.", "প্ৰশ্নত 'নহয়' আৰু 'বাহিৰে' শব্দ অতি সোনকালে পঢ়ি পেলোৱা।"],
      ["Skipping non-verbal figures because they look time-consuming. They are the easiest marks once the eye is trained.", "সময় লগা যেন লাগি অ-মৌখিক চিত্ৰ এৰি দিয়া। চকু অভ্যস্ত হ'লে সেইবোৰ আটাইতকৈ সহজ নম্বৰ।"],
    ],
  },
};

const GROUP = {
  "general-english/grammar": {
    counts: false,
    intro: [
      "Grammar is the rule half of English and the easiest part to fix: {topics} topics and {questions} questions cover tenses, prepositions, articles, parts of speech, subject-verb agreement, voice and narration.",
      "ব্যাকৰণ ইংৰাজীৰ নিয়মৰ আধা, আৰু শুধৰাবলৈ আটাইতকৈ সহজ। কাল, পূৰ্বসৰ্গ, article, শব্দৰ শ্ৰেণী, কৰ্তা-ক্ৰিয়াৰ মিল, বাচ্য আৰু উক্তিৰ ওপৰত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Learn the rule, then answer twenty questions on it. Each rule returns every year.", "নিয়ম শিকা, তাৰপিছত সেই নিয়মৰ বিশটা প্ৰশ্ন উত্তৰ কৰা। প্ৰতিটো নিয়ম প্ৰতি বছৰে ঘূৰি আহে।"],
      ["Keep an error notebook: sentence, rule missed, correct form.", "ভুলৰ টোকাবহী ৰাখা: বাক্য, পাহৰা নিয়ম, শুদ্ধ ৰূপ।"],
      ["For voice and narration, learn the transformation steps as a fixed sequence.", "বাচ্য আৰু উক্তিৰ বাবে ৰূপান্তৰৰ পদবোৰ নিৰ্দিষ্ট ক্ৰমত শিকা।"],
    ],
    mistakes: [
      ["Reading the rule and never applying it in a full sentence.", "নিয়ম পঢ়ি গোটেই বাক্যত প্ৰয়োগ নকৰা।"],
      ["Confusing articles with prepositions in fill-in questions.", "খালী ঠাইৰ প্ৰশ্নত article আৰু পূৰ্বসৰ্গ মিলাই পেলোৱা।"],
    ],
  },
  "general-english/vocabulary": {
    counts: false,
    intro: [
      "Vocabulary questions are pure recall: {topics} topics and {questions} questions on synonyms and antonyms, gender, young ones, homes, sounds and collective nouns.",
      "শব্দজ্ঞানৰ প্ৰশ্ন কেৱল মনত ৰখাৰ কথা: সমাৰ্থক-বিপৰীত, লিংগ, পোৱালিৰ নাম, বাসস্থান, মাত আৰু সমূহবাচক নামৰ ওপৰত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন।",
    ],
    tips: [
      ["Learn in pairs, never single words: synonym with antonym, masculine with feminine.", "একলে নহয়, জোৰাকৈ শিকা: সমাৰ্থকৰ সৈতে বিপৰীত, পুৰুষৰ সৈতে স্ত্ৰী।"],
      ["Group the collective nouns by animal: a herd of cattle, a flock of birds, a fleet of ships.", "সমূহবাচক নাম পশু অনুসৰি গোটোৱা: herd of cattle, flock of birds, fleet of ships।"],
      ["Use each new word in your own sentence once. That is what makes it stay.", "প্ৰতিটো নতুন শব্দ নিজৰ বাক্যত এবাৰ ব্যৱহাৰ কৰা। তেতিয়াহে মনত থাকে।"],
    ],
    mistakes: [
      ["Learning the list without the meaning in Assamese, so similar words get swapped.", "অসমীয়া অৰ্থ নজনাকৈ তালিকা শিকা, ফলত একে ধৰণৰ শব্দ সলনি হৈ যায়।"],
      ["Ignoring the 'young ones' and 'homes' sets because they look childish. They are guaranteed marks.", "'পোৱালি' আৰু 'বাসস্থান'ৰ গোটবোৰ ল'ৰালিকালৰ যেন লাগি এৰি দিয়া। এইবোৰ নিশ্চিত নম্বৰ।"],
    ],
  },
  "logical-reasoning/verbal-reasoning": {
    counts: false,
    intro: [
      "Verbal reasoning is the biggest reasoning group: {topics} topics and {questions} questions, from number and alphabet series to coding, blood relations, ranking and calendars.",
      "মৌখিক যুক্তি আটাইতকৈ ডাঙৰ যুক্তি গোট: সংখ্যা আৰু বৰ্ণমালাৰ শ্ৰেণীৰপৰা সংকেত, ৰক্ত সম্পৰ্ক, স্থান নিৰ্ণয় আৰু কেলেণ্ডাৰলৈ {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন।",
    ],
    tips: [
      ["Learn one method per type and write it at the top of the page before solving.", "প্ৰতিটো ধৰণৰ এটা পদ্ধতি শিকা আৰু সমাধানৰ আগতে পৃষ্ঠাৰ ওপৰত লিখা।"],
      ["For series, check difference, then ratio, then squares, cubes and alternating patterns, in that order.", "শ্ৰেণীত প্ৰথমে পাৰ্থক্য, তাৰপিছত অনুপাত, তাৰপিছত বৰ্গ, ঘন আৰু পাল পাতি — এই ক্ৰমে চোৱা।"],
      ["Draw for blood relations and direction. A tree diagram answers three questions at once.", "ৰক্ত সম্পৰ্ক আৰু দিশত আঁকা। গছৰ চিত্ৰই এতিয়াই তিনি প্ৰশ্নৰ উত্তৰ দিয়ে।"],
    ],
    mistakes: [
      ["Solving a ranking question without writing the positions down.", "স্থান নিৰ্ণয়ৰ প্ৰশ্ন স্থান নিলিখাকৈ সমাধান কৰা।"],
      ["Treating 'some' and 'all' as equal in syllogism.", "ন্যায়বাক্যত 'কিছু' আৰু 'সকলো' সমান বুলি ধৰা।"],
    ],
  },
  "logical-reasoning/non-verbal-reasoning": {
    counts: false,
    intro: [
      "Non-verbal reasoning is visual and improves with daily contact: {topics} topics and {questions} questions on figure series, analogy, classification, mirror and water images, paper folding and dice.",
      "অ-মৌখিক যুক্তি দৃশ্যমূলক আৰু দৈনিক সংস্পৰ্শেহে উন্নতি হয়: চিত্ৰ শ্ৰেণী, সাদৃশ্য, শ্ৰেণীবিভাগ, দৰ্পণ আৰু জল প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু পাশাৰ ওপৰত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন।",
    ],
    tips: [
      ["Do ten questions daily rather than fifty once a week.", "সপ্তাহে এবাৰ পঞ্চাশটা নহয়, দৈনিক দহটা কৰা।"],
      ["In mirror and water images, check one feature at a time: side, orientation, shading.", "দৰ্পণ আৰু জল প্ৰতিবিম্বত এবাৰত এটা লক্ষণ চোৱা: ফাল, দিশ, ছাঁ।"],
      ["For paper folding, work backwards from the unfolded sheet.", "কাগজ ভাঁজত মেলা কাগজৰপৰা পিছলৈ কাম কৰা।"],
    ],
    mistakes: [
      ["Comparing the whole figure instead of one element at a time.", "এটা এটা উপনিমিলাই গোটেই চিত্ৰ ৰিজাব।"],
      ["Forgetting that a water image reverses top and bottom, while a mirror reverses left and right.", "জল প্ৰতিবিম্বে ওপৰ-তল আৰু দৰ্পণে বাওঁ-সোঁ ফেৰ মেলে — এইটো পাহৰা।"],
    ],
  },
};

const ROOT = {
  intro: [
    "The Assam Police AB & UB written paper asks for arithmetic, English, general knowledge and reasoning. This book follows that order and keeps Assam first: {topics} pages and {questions} questions, every one with a worked explanation in English and Assamese.",
    "অসম আৰক্ষী AB আৰু UB লিখিত পৰীক্ষাত পাটিগণিত, ইংৰাজী, সাধাৰণ জ্ঞান আৰু যুক্তি সোধা হয়। এই কিতাপে সেই ক্ৰম ৰাখিছে আৰু অসমক আগত ৰাখিছে: {topics} টা পৃষ্ঠা আৰু {questions} টা প্ৰশ্ন, প্ৰতিটোৰে ইংৰাজী আৰু অসমীয়াত কাম দেখুওৱা ব্যাখ্যা সৈতে।",
  ],
  tips: [
    ["Start with Assam's history, geography and culture. Those questions repeat the most and are the easiest to secure.", "অসমৰ ইতিহাস, ভূগোল আৰু সংস্কৃতিৰপৰা আৰম্ভ কৰা। সেই প্ৰশ্নবোৰ আটাইতকৈ বেছি বাৰে আহে আৰু সহজে নিশ্চিত কৰিব পাৰি।"],
    ["Take one topic a day: read the page intro, answer every question on it in one sitting, then read only the explanations you got wrong.", "দিনে এটা বিষয় লোৱা: পৃষ্ঠাৰ পৰিচয় পঢ়া, একে বহাত পৃষ্ঠাৰ সকলো প্ৰশ্ন উত্তৰ কৰা, শেষত কেৱল ভুল হোৱা প্ৰশ্নৰ ব্যাখ্যা পঢ়া।"],
    ["Keep one sheet of Assam facts and one sheet of formulas. Rewrite both from memory each Sunday.", "অসমৰ তথ্যৰ এখন পৃষ্ঠা আৰু সূত্ৰৰ এখন পৃষ্ঠা ৰাখা। প্ৰতি দেওবাৰে দুয়োখন মনৰপৰা পুনৰ লিখা।"],
    ["Sit the mock sets only after two sections are complete, so the score means something.", "দুটা শিতান সম্পূৰ্ণ হোৱাৰ পিছতহে মক ছেট দিয়া, তেতিয়াহে নম্বৰৰ অৰ্থ থাকে।"],
  ],
  mistakes: [
    ["Leaving Assam topics for the end because they look small. They carry the most repeated questions in the paper.", "অসমৰ বিষয়বোৰ সৰু যেন লাগি শেষলৈ এৰি ৰাখা। প্ৰশ্নকাকতত আটাইতকৈ বেছি বাৰে অহা প্ৰশ্ন এইবোৰৰপৰাই আহে।"],
    ["Reading explanations instead of attempting first. The explanation looks obvious only after you have struggled with the question.", "প্ৰথমে চেষ্টা নকৰি ব্যাখ্যা পঢ়ি যোৱা। প্ৰশ্নটোৰ সৈতে যুঁজি নোপোৱালৈকে ব্যাখ্যা সহজ যেন নালাগে।"],
    ["Learning current affairs for the whole year instead of the recent six months in detail.", "গোটেই বছৰৰ সাম্প্ৰতিক ঘটনা শিকা, শেহতীয়া ছমাহৰ বিৱৰণ এৰি।"],
  ],
};

module.exports = { SECTION, GROUP, ROOT };
