"use strict";

/* Study guidance for the RRB NTPC hub pages.
   Keyed by the route under exams/rrb-ntpc/. Each entry supplies the text that
   tools/add-book-hub-guides.js renders above the topic cards, so the
   navigation pages are not just a list of links.

   { intro: [en, as], tips: [[en, as], ...], mistakes: [[en, as], ...] } */

const SECTION = {
  mathematics: {
    counts: false,
    intro: [
      "Arithmetic decides how much time is left for reasoning. This section holds {topics} topics and {questions} questions, from simplification to mensuration, and every one of them is solvable without a calculator.",
      "পাটিগণিতে কিমান সময় বাকী থাকিব সেইটো নিৰ্ধাৰণ কৰে। এই শিতানত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে — সৰলীকৰণৰপৰা পৰিমিতিলৈ — আৰু প্ৰতিটোৱেই কেলকুলেটৰ নোহোৱাকৈ সমাধান হয়।",
    ],
    tips: [
      ["Memorise tables to 20, squares to 30, cubes to 15 and the common fraction-percentage pairs. Speed in this section is memory, not talent.", "২০ লৈকে পূৰণফল, ৩০ লৈকে বৰ্গ, ১৫ লৈকে ঘন আৰু সাধাৰণ ভগ্নাংশ-শতাংশৰ জোৰা মুখস্থ কৰা। এই শিতানৰ গতি স্মৃতিহে, প্ৰতিভা নহয়।"],
      ["Practise each topic in a timed block of twenty questions. Untimed practice hides the only weakness that matters here: hesitation.", "প্ৰতিটো বিষয় বিশটা প্ৰশ্নৰ সময়বদ্ধ খণ্ডত অনুশীলন কৰা। সময় নোহোৱা অনুশীলনে ইয়াৰ একমাত্ৰ গুৰুত্বপূৰ্ণ দুৰ্বলতা — দ্বিধা — লুকুৱাই ৰাখে।"],
      ["Write the formula at the top of your rough sheet before solving, so one wrong formula cannot repeat across ten questions.", "সমাধান কৰাৰ আগতে ৰাফ শ্বীটৰ ওপৰত সূত্ৰটো লিখা, যাতে এটা ভুল সূত্ৰ দহটা প্ৰশ্নত পুনৰাবৃত্তি নহয়।"],
      ["Do data interpretation last in a practice set. It is accurate but slow, and it should not eat the time of five quick questions.", "অনুশীলন ছেটত তথ্য বিশ্লেষণ শেষত কৰা। ই নিৰ্ভুল কিন্তু লেহেমীয়া, আৰু ই পাঁচটা দ্ৰুত প্ৰশ্নৰ সময় খাই নোযোৱা উচিত।"],
    ],
    mistakes: [
      ["Rounding too early. Keep the fraction until the final step; a 0.33 in the middle turns a clean answer into a wrong option.", "অকালতে ঘূৰণ কৰা। শেষ পদলৈকে ভগ্নাংশ ৰাখা; মাজত ০.৩৩ ল'লে শুদ্ধ উত্তৰ ভুল বিকল্পত পৰিণত হয়।"],
      ["Solving every question in order. Leave a long one after 45 seconds and return only if time is left.", "প্ৰতিটো প্ৰশ্ন ক্ৰমে সমাধান কৰা। ৪৫ ছেকেণ্ডৰ পিছত দীঘল প্ৰশ্ন এৰি যোৱা, সময় থাকিলেহে ঘূৰি আহা।"],
      ["Ignoring units and the words 'approximately' and 'not'. Half the errors here are reading errors, not calculation errors.", "একক আৰু 'প্ৰায়' তথা 'নহয়' শব্দবোৰ অৱহেলা কৰা। ইয়াৰ আধা ভুল পঢ়াৰ ভুল, গণনাৰ নহয়।"],
    ],
  },
  reasoning: {
    counts: false,
    intro: [
      "Reasoning improves faster than any other section once the patterns are named. This section holds {topics} topics and {questions} questions, and most of them come from a small set of shapes that repeat.",
      "আৰ্হিবোৰৰ নাম জানিলে যুক্তি শিতান আন যিকোনো শিতানতকৈ দ্ৰুত উন্নতি হয়। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে, আৰু বেছিভাগেই অলপমান আৰ্হিৰপৰা বাৰে বাৰে আহে।",
    ],
    tips: [
      ["Learn the pattern families: series (difference, product, square, alternating), seating (linear and circular), blood relations (draw a tree), syllogism (Venn circles).", "আৰ্হিৰ পৰিয়ালবোৰ শিকা: শ্ৰেণী (পাৰ্থক্য, গুণফল, বৰ্গ, পাল পাতি), বহা বিন্যাস (শাৰী আৰু বৃত্ত), ৰক্ত সম্পৰ্ক (গছ আঁকা), ন্যায়বাক্য (ভেন বৃত্ত)।"],
      ["Draw for every seating, direction and blood-relation question, even the easy ones. The drawing stops the second-guessing that costs marks.", "প্ৰতিটো বহা বিন্যাস, দিশ আৰু ৰক্ত সম্পৰ্কৰ প্ৰশ্নত আঁকা, সহজবোৰতো। আঁকিলে পিছত সন্দেহ কৰি নম্বৰ হেৰুওৱা নহয়।"],
      ["Do ten non-verbal questions every day. Figure series and mirror images are learnt by the eye, and the eye needs daily training.", "দৈনিক দহটা অ-মৌখিক প্ৰশ্ন কৰা। চিত্ৰ শ্ৰেণী আৰু দৰ্পণ প্ৰতিবিম্ব চকুৱে শিকে, আৰু চকুক দৈনিক অভ্যাস লাগে।"],
      ["Cap each question at 90 seconds in practice. A reasoning question solved after three minutes has already cost you two others.", "অনুশীলনত প্ৰতিটো প্ৰশ্ন ৯০ ছেকেণ্ডত সীমাবদ্ধ কৰা। তিনি মিনিটৰ পিছত সমাধান হোৱা যুক্তি প্ৰশ্নই ইতিমধ্যে আন দুটা প্ৰশ্নৰ নম্বৰ খাই শেষ কৰিছে।"],
    ],
    mistakes: [
      ["Guessing without eliminating. Two eliminated options turn a 25% guess into a 50% guess.", "বাদ দিয়া নোহোৱাকৈ অনুমান কৰা। দুটা বিকল্প বাদ দিলেও ২৫% অনুমান ৫০% হয়।"],
      ["Overlooking 'NOT' and 'except' in the stem. Underline them while reading.", "প্ৰশ্নত 'নহয়' আৰু 'বাহিৰে' শব্দ চকুৰপৰা পৰা। পঢ়ি থাকোঁতে তলত দাগ দিয়া।"],
      ["Practising only the topics you like. The paper picks from the whole list, including the ones you avoid.", "পচন্দৰ বিষয়বোৰহে অনুশীলন কৰা। প্ৰশ্নকাকতৱে গোটেই তালিকাৰপৰা বাছে, এৰি যোৱাবোৰসহ।"],
    ],
  },
  "general-awareness": {
    counts: false,
    intro: [
      "General awareness is the largest block of this book: {topics} topics and {questions} questions, more than mathematics and reasoning together. The marks here come from coverage and repetition, not from long study sessions.",
      "সাধাৰণ জ্ঞান এই কিতাপৰ আটাইতকৈ ডাঙৰ অংশ: {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন — গণিত আৰু যুক্তিৰ যোগফলতকৈও বেছি। ইয়াৰ নম্বৰ পৰিসৰ আৰু পুনৰাবৃত্তিৰপৰা আহে, দীঘলীয়া অধ্যয়নৰপৰা নহয়।",
    ],
    tips: [
      ["Cover static general knowledge first: polity, history, geography, economy, general science and computers. Current affairs come after that base.", "প্ৰথমে স্থিৰ সাধাৰণ জ্ঞান লোৱা: ৰাজনীতি, ইতিহাস, ভূগোল, অৰ্থনীতি, সাধাৰণ বিজ্ঞান আৰু কম্পিউটাৰ। সেই ভেটিৰ পিছতহে সাম্প্ৰতিক ঘটনা।"],
      ["Keep one page per topic: names, dates, numbers and firsts. A page is revised ten times; a chapter is revised once.", "প্ৰতিটো বিষয়ৰ বাবে এপাত ৰাখা: নাম, তাৰিখ, সংখ্যা আৰু প্ৰথম। এপাত দহবাৰ পুনৰাবৃত্তি হয়; অধ্যায় এবাৰহে।"],
      ["Read only the last six months of current affairs, and only the details a question can ask: appointments, schemes, awards, sports and obituaries.", "কেৱল শেষ ছমাহৰ সাম্প্ৰতিক ঘটনা পঢ়া, আৰু কেৱল প্ৰশ্ন সোধাৰ যোগ্য বিৱৰণ: নিযুক্তি, আঁচনি, বঁটা, ক্ৰীড়া আৰু মৃত্যুসংবাদ।"],
      ["Use the mixed practice page once a week to find the topic that is still leaking marks.", "সপ্তাহে এবাৰ মিশ্ৰ অনুশীলনৰ পৃষ্ঠা ব্যৱহাৰ কৰা, কোনটো বিষয়ত এতিয়াও নম্বৰ হেৰাইছে ধৰিবলৈ।"],
    ],
    mistakes: [
      ["Reading news without writing notes. A fact read once leaves nothing behind.", "টোকা নিলিখাকৈ বাতৰি পঢ়া। এবাৰ পঢ়া তথ্যই পিছত একো এৰি নিদিয়ে।"],
      ["Confusing similar names: Ahom and Koch kings, Kachari and Chutiya rulers, schemes with near-identical titles.", "একে ধৰণৰ নাম লগা-লগিকৈ ৰখা: আহোম আৰু কোচ ৰজা, কছাৰী আৰু চুতীয়া শাসক, প্ৰায় একেই নামৰ আঁচনি।"],
      ["Chasing rare trivia instead of the themes that repeat. The same fifty themes appear in paper after paper.", "বিৰল তথ্যৰ পিছত দৌৰা, বাৰে বাৰে অহা বিষয় এৰি। একেই পঞ্চাশটা বিষয় প্ৰতিখন প্ৰশ্নকাকতত আহে।"],
    ],
  },
};

const GROUP = {
  "general-awareness/current-affairs": {
    counts: false,
    intro: [
      "Current affairs is the cheapest scoring block if you keep a monthly sheet: {topics} topics and {questions} questions cover appointments, schemes, awards and events.",
      "মাহেকীয়া এখন তালিকা ৰাখিলে সাম্প্ৰতিক ঘটনা আটাইতকৈ সহজে নম্বৰ দিয়া অংশ। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্নই নিযুক্তি, আঁচনি, বঁটা আৰু ঘটনা সামৰি লয়।",
    ],
    tips: [
      ["Write one monthly sheet: new appointments, new schemes, awards, sports winners and important days.", "মাহে এখন তালিকা লিখা: নতুন নিযুক্তি, নতুন আঁচনি, বঁটা, ক্ৰীড়া বিজয়ী আৰু গুৰুত্বপূৰ্ণ দিৱস।"],
      ["Record the detail a question can ask, not the headline: the post, the ministry, the state, the year.", "প্ৰশ্নই সোধাৰ যোগ্য বিৱৰণ লিখা, শিৰোনামা নহয়: পদ, মন্ত্ৰালয়, ৰাজ্য, বছৰ।"],
      ["Revise the last six months before the exam and leave older news alone.", "পৰীক্ষাৰ আগতে শেষ ছমাহ পুনৰাবৃত্তি কৰা, পুৰণি বাতৰি এৰি দিয়া।"],
    ],
    mistakes: [
      ["Memorising headlines without the person or place attached to them.", "শিৰোনামা মুখস্থ কৰা, তাৰ লগত জড়িত ব্যক্তি বা ঠাই নজনাকৈ।"],
      ["Skipping national schemes because they look similar. Their launch year and ministry are what get asked.", "একে ধৰণৰ যেন লগা ৰাষ্ট্ৰীয় আঁচনি এৰি দিয়া। আচলতে আৰম্ভণিৰ বছৰ আৰু মন্ত্ৰালয়হে সোধা হয়।"],
    ],
  },
  "general-awareness/economy": {
    counts: false,
    intro: [
      "Economy questions in NTPC are static rather than numerical: budget terms, banking, indices and institutions; {topics} topics and {questions} questions are filed here.",
      "NTPC ত অৰ্থনীতিৰ প্ৰশ্ন সংখ্যাত্মকতকৈ স্থিৰ: বাজেটৰ শব্দ, বেংকিং, সূচক আৰু প্ৰতিষ্ঠান। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Learn one line per term: repo rate, CRR, SLR, fiscal deficit, inflation, GDP and GST.", "প্ৰতিটো শব্দৰ এশাৰী শিকা: ৰেপো ৰেট, CRR, SLR, ৰাজকোষীয় ঘাটি, মুদ্ৰাস্ফীতি, GDP আৰু GST।"],
      ["Attach a number to each institution: RBI, SEBI, NABARD, SIDBI and their founding years.", "প্ৰতিটো প্ৰতিষ্ঠানৰ লগত এটা সংখ্যা জোৰা: RBI, SEBI, NABARD, SIDBI আৰু তেওঁলোকৰ স্থাপন বছৰ।"],
      ["Keep the current budget's headline figures on the same page as the terms.", "চলিত বাজেটৰ মূল সংখ্যাবোৰ শব্দবোৰৰ লগতে একেখন পৃষ্ঠাত ৰাখা।"],
    ],
    mistakes: [
      ["Mixing up repo and reverse repo, or CRR and SLR. Write them as pairs with their effect.", "ৰেপো আৰু ৰিভাৰ্ছ ৰেপো, বা CRR আৰু SLR মিলাই পেলোৱা। প্ৰভাৱসহ জোৰাকৈ লিখা।"],
      ["Ignoring banking history. Questions on the first bank, nationalisation and mergers repeat.", "বেংকিং ইতিহাস এৰি দিয়া। প্ৰথম বেংক, ৰাষ্ট্ৰীয়কৰণ আৰু একত্ৰীকৰণৰ প্ৰশ্ন বাৰে বাৰে আহে।"],
    ],
  },
  "general-awareness/general-science": {
    counts: false,
    intro: [
      "General science stays at school level: physics, chemistry and biology with everyday examples: {topics} topics and {questions} questions are filed here.",
      "সাধাৰণ বিজ্ঞান স্কুলীয়া স্তৰতে থাকে: পদাৰ্থ, ৰসায়ন আৰু জীৱবিজ্ঞান, দৈনন্দিন উদাহৰণেৰে। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Group facts by the body system, the unit or the chemical, not by chapter order.", "তথ্যবোৰ শৰীৰৰ তন্ত্ৰ, একক বা ৰাসায়নিকৰ অনুসৰি ভগোৱা, অধ্যায়ৰ ক্ৰম অনুসৰি নহয়।"],
      ["Learn SI units and their symbols in one list. They appear in every paper and are pure recall.", "SI একক আৰু সিহঁতৰ প্ৰতীক এখন তালিকাত শিকা। এইবোৰ প্ৰতিখন প্ৰশ্নকাকতত আহে আৰু কেৱল মনত ৰখাৰ কথা।"],
      ["Attach each discovery to the scientist and the year.", "প্ৰতিটো আৱিষ্কাৰৰ লগত বিজ্ঞানী আৰু বছৰ জোৰা।"],
    ],
    mistakes: [
      ["Reading science like a story. Only recall of names, units and processes is tested.", "বিজ্ঞান কাহিনীৰ দৰে পঢ়া। কেৱল নাম, একক আৰু প্ৰক্ৰিয়াৰ মনত ৰখাহে পৰীক্ষা হয়।"],
      ["Confusing similar terms: speed and velocity, mass and weight, mitosis and meiosis.", "একে ধৰণৰ শব্দ মিলাই পেলোৱা: দ্ৰুতি আৰু বেগ, ভৰ আৰু ওজন, মাইটোচিছ আৰু মিঅ'চিছ।"],
    ],
  },
  "general-awareness/geography": {
    counts: false,
    intro: [
      "Geography is mostly a map with numbers attached: rivers, mountains, states, capitals and climate: {topics} topics and {questions} questions are filed here.",
      "ভূগোল বেছিভাগেই সংখ্যা লগা এখন মানচিত্ৰ: নদী, পৰ্বত, ৰাজ্য, ৰাজধানী আৰু জলবায়ু। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Practise on a blank map of India: rivers, states, capitals and mountain passes.", "ভাৰতৰ ৰিক্ত মানচিত্ৰত অনুশীলন কৰা: নদী, ৰাজ্য, ৰাজধানী আৰু পৰ্বতীয়া গিৰিপথ।"],
      ["Learn the extremes: longest river, highest peak, largest state, smallest state, driest place.", "চৰমবোৰ শিকা: আটাইতকৈ দীঘল নদী, ওখ শৃংগ, ডাঙৰ ৰাজ্য, সৰু ৰাজ্য, শুকান ঠাই।"],
      ["Attach one fact to each state so the map is not just names.", "প্ৰতিটো ৰাজ্যৰ লগত এটা তথ্য জোৰা, যাতে মানচিত্ৰখন কেৱল নাম নহয়।"],
    ],
    mistakes: [
      ["Learning capitals without the state's position on the map.", "মানচিত্ৰত অৱস্থান নজনাকৈ ৰাজধানী শিকা।"],
      ["Mixing tributaries with the main river. Questions ask which river joins which.", "উপনদী আৰু মূল নদী মিলাই পেলোৱা। প্ৰশ্নই সোধে কোন নদীয়ে ক'ত লগ পায়।"],
    ],
  },
  "general-awareness/history": {
    counts: false,
    intro: [
      "History rewards a timeline, not a chapter: {topics} topics and {questions} questions here run from ancient India to the freedom movement.",
      "ইতিহাসত অধ্যায়তকৈ সময়ৰেখাহে কামত আহে। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন প্ৰাচীন ভাৰতৰপৰা স্বাধীনতা আন্দোলনলৈ আছে।",
    ],
    tips: [
      ["Draw one timeline for ancient, medieval and modern India, and add every new fact to it.", "প্ৰাচীন, মধ্য আৰু আধুনিক ভাৰতৰ বাবে এটা সময়ৰেখা আঁকা, আৰু নতুন তথ্য তাতে যোগ কৰা।"],
      ["Learn each dynasty with capital, founder and one famous ruler.", "প্ৰতিটো ৰাজবংশক ৰাজধানী, প্ৰতিষ্ঠাপক আৰু এজন বিখ্যাত শাসকৰ সৈতে শিকা।"],
      ["For the freedom movement, memorise year, place and leader for each event.", "স্বাধীনতা আন্দোলনৰ বাবে প্ৰতিটো ঘটনাৰ বছৰ, ঠাই আৰু নেতা মুখস্থ কৰা।"],
    ],
    mistakes: [
      ["Learning dates without the event attached to them.", "ঘটনা নোহোৱাকৈ তাৰিখ শিকা।"],
      ["Confusing Mughal and Rajput rulers, or the two world wars' years.", "মোগল আৰু ৰাজপুত শাসক, বা দুখন বিশ্বযুদ্ধৰ বছৰ মিলাই পেলোৱা।"],
    ],
  },
  "general-awareness/polity": {
    counts: false,
    intro: [
      "Polity is the Constitution in numbers: articles, schedules, amendments and institutions: {topics} topics and {questions} questions are filed here.",
      "ৰাজনীতি হৈছে সংখ্যাত সংবিধান: অনুচ্ছেদ, অনুসূচী, সংশোধনী আৰু প্ৰতিষ্ঠান। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Learn the parts, schedules and the important articles as three separate lists.", "অংশ, অনুসূচী আৰু গুৰুত্বপূৰ্ণ অনুচ্ছেদ তিনিৰকমে বেলেগ তালিকাত শিকা।"],
      ["Attach each amendment to the change it made, not just its number.", "প্ৰতিটো সংশোধনীক ই কৰা পৰিৱৰ্তনৰ লগত জোৰা, কেৱল নম্বৰৰ লগত নহয়।"],
      ["Keep the fundamental rights and duties on one page and revise them weekly.", "মৌলিক অধিকাৰ আৰু কৰ্তব্য একেখন পৃষ্ঠাত ৰাখি সপ্তাহে পুনৰাবৃত্তি কৰা।"],
    ],
    mistakes: [
      ["Confusing Fundamental Rights with Directive Principles.", "মৌলিক অধিকাৰ আৰু নীতি নিৰ্দেশনা মিলাই পেলোৱা।"],
      ["Learning article numbers without the subject of the article.", "অনুচ্ছেদৰ বিষয় নজনাকৈ নম্বৰ শিকা।"],
    ],
  },
  "general-awareness/static-gk-computers": {
    counts: false,
    intro: [
      "Static GK and computer awareness are pure recall: abbreviations, capitals, currencies, hardware and office software: {topics} topics and {questions} questions are filed here.",
      "স্থিৰ সাধাৰণ জ্ঞান আৰু কম্পিউটাৰ জ্ঞান কেৱল মনত ৰখাৰ কথা: চমু ৰূপ, ৰাজধানী, মুদ্ৰা, হাৰ্ডৱেৰ আৰু অফিচ ছফ্টৱেৰ। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Keep one list of abbreviations and expand it aloud once a week.", "চমু ৰূপৰ এখন তালিকা ৰাখা আৰু সপ্তাহে এবাৰ মাতেৰে ফটাই কোৱা।"],
      ["For computers, learn input, output, memory and shortcut keys as four blocks.", "কম্পিউটাৰৰ বাবে ইনপুট, আউটপুট, মেমৰি আৰু শৰ্টকাট কি চাৰিটা খণ্ডত শিকা।"],
      ["Pair every country with its capital and currency on one sheet.", "প্ৰতিখন দেশক ৰাজধানী আৰু মুদ্ৰাৰ সৈতে একেখন পৃষ্ঠাত জোৰা।"],
    ],
    mistakes: [
      ["Learning abbreviations without expanding them, so similar ones get swapped.", "চমু ৰূপ নফটাই শিকা, ফলত একে ধৰণৰবোৰ সলনি হৈ যায়।"],
      ["Skipping shortcuts and file extensions because they look too small to be asked.", "শৰ্টকাট আৰু ফাইল এক্সটেনশ্যন এৰি দিয়া, সোধাৰ অযোগ্য যেন লাগি।"],
    ],
  },
  "reasoning/verbal-reasoning": {
    counts: false,
    intro: [
      "Verbal reasoning is the widest reasoning group here: {topics} topics and {questions} questions, from series and analogy to seating, blood relations and syllogism.",
      "মৌখিক যুক্তি ইয়াৰ আটাইতকৈ বহল যুক্তি গোট: {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন — শ্ৰেণী আৰু সাদৃশ্যৰপৰা বহা বিন্যাস, ৰক্ত সম্পৰ্ক আৰু ন্যায়বাক্যলৈ।",
    ],
    tips: [
      ["Learn one worked example per topic before attempting the page. Each type has one fixed method.", "পৃষ্ঠা কৰাৰ আগতে প্ৰতিটো বিষয়ৰ এটা সমাধান কৰা উদাহৰণ শিকা। প্ৰতিটো ধৰণৰ এটা নিৰ্দিষ্ট পদ্ধতি আছে।"],
      ["Draw for seating, direction and blood relations. A tree or a line on paper removes the guesswork.", "বহা বিন্যাস, দিশ আৰু ৰক্ত সম্পৰ্কত আঁকা। কাগজত গছ বা ৰেখাই অনুমান আঁতৰায়।"],
      ["Solve series by checking difference, then ratio, then squares and cubes, in that order.", "শ্ৰেণী প্ৰথমে পাৰ্থক্য, তাৰপিছত অনুপাত, শেষত বৰ্গ আৰু ঘন — এই ক্ৰমে পৰীক্ষা কৰি সমাধান কৰা।"],
    ],
    mistakes: [
      ["Answering a seating question without a diagram, then losing the thread midway.", "চিত্ৰ নোহোৱাকৈ বহা বিন্যাসৰ প্ৰশ্নৰ উত্তৰ দিয়া, মাজতে সূত্ৰ হেৰুওৱা।"],
      ["Treating 'some' and 'all' as the same in syllogism.", "ন্যায়বাক্যত 'কিছু' আৰু 'সকলো' একে বুলি ধৰা।"],
    ],
  },
  "reasoning/non-verbal-reasoning": {
    counts: false,
    intro: [
      "Non-verbal reasoning is visual and improves only with daily contact: {topics} topics and {questions} questions cover figure series, mirror images, paper folding and counting figures.",
      "অ-মৌখিক যুক্তি দৃশ্যমূলক, আৰু দৈনিক সংস্পৰ্শেহে উন্নতি হয়। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্নই চিত্ৰ শ্ৰেণী, দৰ্পণ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু চিত্ৰ গণনা সামৰি লয়।",
    ],
    tips: [
      ["Do ten questions daily rather than fifty once a week. The eye learns by frequency.", "সপ্তাহে এবাৰ পঞ্চাশটা নহয়, দৈনিক দহটা কৰা। চকুয়ে বাৰে বাৰে দেখিহে শিকে।"],
      ["For mirror and water images, check one feature at a time: side, orientation, shading.", "দৰ্পণ আৰু জল প্ৰতিবিম্বৰ বাবে এবাৰত এটা লক্ষণ চোৱা: ফাল, দিশ, ছাঁ।"],
      ["In figure series, write the change between two panels in words before choosing.", "চিত্ৰ শ্ৰেণীত বাছনি কৰাৰ আগতে দুটা ফলকৰ মাজৰ পৰিৱৰ্তন শব্দত লিখা।"],
    ],
    mistakes: [
      ["Staring at the whole figure instead of comparing one element at a time.", "এটা এটা উপাদান নিমিলাই গোটেই চিত্ৰলৈ চাই থকা।"],
      ["Assuming the rotation is clockwise without checking the first panel.", "প্ৰথম ফলক নাচাই ঘড়ীৰ দিশে ঘূৰণ বুলি ধৰি লোৱা।"],
    ],
  },
  "reasoning/analytical-logical-reasoning": {
    counts: false,
    intro: [
      "Analytical reasoning asks you to hold conditions together: puzzles, arrangements, statement and conclusion, data sufficiency: {topics} topics and {questions} questions are filed here.",
      "বিশ্লেষণাত্মক যুক্তিত চৰ্তবোৰ একেলগে ধৰি ৰাখিব লাগে: পাজল, বিন্যাস, উক্তি আৰু সিদ্ধান্ত, তথ্য পৰ্যাপ্ততা। ইয়াত {topics} টা বিষয় আৰু {questions} টা প্ৰশ্ন আছে।",
    ],
    tips: [
      ["Write the conditions as short symbols before solving. Half the work is in the notation.", "সমাধান কৰাৰ আগতে চৰ্তবোৰ চমু চিহ্নত লিখা। আধা কাম notation তেই হয়।"],
      ["For puzzles, fix the most constrained element first, not the first one mentioned.", "পাজলত আটাইতকৈ বেছি বাধা থকা উপাদানটো প্ৰথমে ঠিক কৰা, প্ৰথমে কোৱাটো নহয়।"],
      ["In data sufficiency, decide whether each statement alone is enough before combining them.", "তথ্য পৰ্যাপূৰ্তাত প্ৰতিটো উক্তি অকলে যথেষ্ট নে নাই ঠিক কৰা, তাৰপিছতহে একেলগ কৰা।"],
    ],
    mistakes: [
      ["Combining statements before testing them separately in data sufficiency.", "তথ্য পৰ্যাপূৰ্তাত উক্তিবোৰ বেলেগে পৰীক্ষা নকৰি একেলগ কৰা।"],
      ["Carrying one assumption through a whole puzzle and never checking it against the conditions.", "এটা ধাৰণা গোটেই পাজলত লৈ ফুৰোৱা আৰু চৰ্তবোৰৰ সৈতে নিমিলোৱা।"],
    ],
  },
};

const ROOT = {
  intro: [
    "RRB NTPC asks three things: arithmetic, reasoning and general awareness. This book keeps that split, so you can practise one section at a time and see which one is holding your score down. {topics} topic pages and {questions} questions are published here, each with a worked explanation in English and Assamese.",
    "RRB NTPC ত তিনিটা বস্তু সোধা হয়: পাটিগণিত, যুক্তি আৰু সাধাৰণ জ্ঞান। এই কিতাপে সেই একেই ভাগ ৰাখিছে, যাতে এটা সময়ত এটা শিতান অনুশীলন কৰি কোনটোৱে নম্বৰ কমাই আছে ধৰিব পাৰি। ইয়াত {topics} টা বিষয় পৃষ্ঠা আৰু {questions} টা প্ৰশ্ন আছে, প্ৰতিটোৰে ইংৰাজী আৰু অসমীয়াত কাম দেখুওৱা ব্যাখ্যা সৈতে।",
  ],
  tips: [
    ["Begin with the section that carries the most questions here: general awareness. It is also the section most candidates leave for the last week.", "ইয়াত আটাইতকৈ বেছি প্ৰশ্ন থকা শিতানৰপৰা আৰম্ভ কৰা: সাধাৰণ জ্ঞান। বেছিভাগ প্ৰাৰ্থীয়ে ইয়াক শেষ সপ্তাহলৈ এৰি ৰাখে।"],
    ["Take one topic a day: read the page intro, answer every question on it in one sitting, then read only the explanations you got wrong.", "দিনে এটা বিষয় লোৱা: পৃষ্ঠাৰ পৰিচয় পঢ়া, একে বহাত পৃষ্ঠাৰ সকলো প্ৰশ্ন উত্তৰ কৰা, শেষত কেৱল ভুল হোৱা প্ৰশ্নৰ ব্যাখ্যা পঢ়া।"],
    ["Keep one rough sheet of formulas, squares to 30, cubes to 15 and the fraction-percentage table, and rewrite it from memory each Sunday.", "এপাতত সূত্ৰ, ৩০ লৈকে বৰ্গ, ১৫ লৈকে ঘন আৰু ভগ্নাংশ-শতাংশৰ তালিকা ৰাখা, আৰু প্ৰতি দেওবাৰে মনৰপৰা পুনৰ লিখা।"],
    ["Sit the mock sets only after a section is complete. A mock on half-learned topics measures nothing.", "এটা শিতান সম্পূৰ্ণ হোৱাৰ পিছতহে মক ছেট দিয়া। আধা-শিকা বিষয়ত দিয়া মকে একো জোখে নাই।"],
  ],
  mistakes: [
    ["Reading explanations instead of attempting first. The explanation looks obvious only after you have struggled with the question.", "প্ৰথমে চেষ্টা নকৰি ব্যাখ্যা পঢ়ি যোৱা। প্ৰশ্নটোৰ সৈতে যুঁজি নোপোৱালৈকে ব্যাখ্যা সহজ যেন নালাগে।"],
    ["Skipping the long tail of small mathematics topics because they look easy. They are easy only once the method is automatic.", "গণিতৰ সৰু বিষয়বোৰ সহজ যেন লাগি এৰি দিয়া। পদ্ধতি স্বয়ংক্ৰিয় নহ'লে সেইবোৰ সহজ নহয়।"],
    ["Learning current affairs from headlines. Questions ask the detail behind the headline: the scheme, the post, the state.", "শিৰোনামাৰপৰা সাম্প্ৰতিক ঘটনা শিকা। প্ৰশ্নই শিৰোনামাৰ পিছৰ বিৱৰণ সোধে: আঁচনি, পদ, ৰাজ্য।"],
  ],
};

module.exports = { SECTION, GROUP, ROOT };
