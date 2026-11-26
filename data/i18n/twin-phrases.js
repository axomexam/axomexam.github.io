"use strict";

/*
 * Assamese for the sentences the page generators write in English only.
 *
 * tools/enrich-hub-study.js, tools/seo-deepen-topics2.js and friends add
 * explanatory notes to topic and hub pages as plain English <p> blocks. The
 * twin builder copies the page into /as/ and only swaps text it can pair with
 * an Assamese sibling, so those blocks stayed English on an Assamese URL —
 * 149 copies of "A few worked questions from this page..." and so on.
 *
 * Each entry is a whole sentence, matched exactly as it appears in the HTML
 * (entities included), and replaced in place. Whole sentences rather than
 * fragments: a fragment could land inside a question that is quoting English
 * on purpose. Numbered variants are handled by `rules` below.
 */

const BN = (s) => String(s).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const EXACT = {
  "A few worked questions from this page, with the marked answer and the explanation, so you can see the level and the format before you start practising.":
    "এই পৃষ্ঠাৰ কেইটামান নমুনা প্ৰশ্ন, চিহ্নিত উত্তৰ আৰু ব্যাখ্যাৰ সৈতে — যাতে অনুশীলন আৰম্ভ কৰাৰ আগতে আপুনি প্ৰশ্নৰ স্তৰ আৰু ধৰণ দেখি ল'ব পাৰে।",

  "Every question below is bilingual (Assamese and English), carries four options and is followed by the correct answer and a short explanation.":
    "তলৰ প্ৰতিটো প্ৰশ্ন দ্বিভাষিক (অসমীয়া আৰু ইংৰাজী), চাৰিটা বিকল্পৰ সৈতে, আৰু প্ৰতিটোৰ পিছত শুদ্ধ উত্তৰ আৰু চমু ব্যাখ্যা দিয়া হৈছে।",

  "Yes. Every question, option and explanation is given in both Assamese and English, so the same idea is reinforced in either language.":
    "হয়। প্ৰতিটো প্ৰশ্ন, বিকল্প আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত দিয়া হয়, যাতে যিকোনো ভাষাত একেই ধাৰণা দৃঢ় হয়।",

  "Yes. Every question, option and explanation is free to read in both Assamese and English, with no login.":
    "হয়। প্ৰতিটো প্ৰশ্ন, বিকল্প আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত বিনামূলীয়াকৈ পঢ়িব পাৰি, লগইনৰ প্ৰয়োজন নাই।",

  "Finish one sub-category at a time, read the explanation for every answer you miss, then re-attempt the same set after a few days.":
    "একেবাৰে এটা উপ-শ্ৰেণী সম্পূৰ্ণ কৰক, ভুল হোৱা প্ৰতিটো উত্তৰৰ ব্যাখ্যা পঢ়ক, তাৰ পিছত কেইদিনমানৰ পিছত একেই সংহতি পুনৰ চেষ্টা কৰক।",

  "The paper is paired with the topic-wise practice sets and notes on axomexam so you can check your answers and revise the weak areas.":
    "প্ৰশ্নকাকতখনৰ লগত axomexam ৰ বিষয়ভিত্তিক অনুশীলন সংহতি আৰু টোকা সংযুক্ত, যাতে আপুনি উত্তৰ মিলাই চাই দুৰ্বল বিষয়সমূহ পুনৰালোচনা কৰিব পাৰে।",

  "Free bilingual (Assamese &amp; English) mock tests, previous year solved question papers, and PDF study notes for APSC, Assam Police, ADRE, SSC, and Railway exams.":
    "APSC, অসম আৰক্ষী, ADRE, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া দ্বিভাষিক (অসমীয়া আৰু ইংৰাজী) মক টেষ্ট, বিগত বছৰৰ সমাধান কৰা প্ৰশ্নকাকত আৰু PDF অধ্যয়ন টোকা।",

  "The Assam Police paper is set in the subjects below. The question counts are the live numbers in the axomexam practice bank, so you can see where the weight of the paper lies and plan your revision around it.":
    "অসম আৰক্ষী প্ৰশ্নকাকত তলৰ বিষয়সমূহৰ পৰা প্ৰস্তুত কৰা হয়। প্ৰশ্নৰ সংখ্যা axomexam ৰ অনুশীলন ভঁৰালৰ চলিত সংখ্যা, যাৰ দ্বাৰা আপুনি প্ৰশ্নকাকতত কোন বিষয়ৰ গুৰুত্ব বেছি দেখিব পাৰে আৰু সেই অনুসৰি পুনৰালোচনাৰ পৰিকল্পনা কৰিব পাৰে।",

  "Yes. Every set runs on a live timer so you learn to manage your time the way you must in the real examination hall.":
    "হয়। প্ৰতিটো সংহতি চলিত টাইমাৰত চলে, যাতে প্ৰকৃত পৰীক্ষা হলত যেনেকৈ সময় পৰিচালনা কৰিব লাগে তেনেকৈ আপুনি শিকিব পাৰে।",

  "Yes. After you submit, you see your score and a bilingual review of every question with the correct answer and a short explanation.":
    "হয়। জমা দিয়াৰ পিছত আপুনি নিজৰ স্ক'ৰ আৰু প্ৰতিটো প্ৰশ্নৰ দ্বিভাষিক পৰ্যালোচনা দেখিব — শুদ্ধ উত্তৰ আৰু চমু ব্যাখ্যাৰ সৈতে।",

  "Each topic in this group opens as its own page of bilingual questions, so you can revise one subject at a time and still see how the group fits the wider paper. Read the explanation after every answer, note the facts you missed, and come back to the same page a few days later for a quick revision pass before the examination.":
    "এই গোটৰ প্ৰতিটো বিষয় নিজাকৈ দ্বিভাষিক প্ৰশ্নৰ পৃষ্ঠা হিচাপে খোলে, যাতে আপুনি এটা সময়ত এটা বিষয় পুনৰালোচনা কৰিব পাৰে আৰু গোটটোৱে বৃহত্তৰ প্ৰশ্নকাকতত কেনেদৰে খাপ খায় তাও দেখিব পাৰে। প্ৰতিটো উত্তৰৰ পিছত ব্যাখ্যা পঢ়ক, পাহৰা তথ্যবোৰ টুকি লওক, আৰু পৰীক্ষাৰ আগতে দ্ৰুত পুনৰালোচনাৰ বাবে কেইদিনমানৰ পিছত একেই পৃষ্ঠালৈ ঘূৰি আহক।",

  "Start with the subject you are weakest in, attempt one set at a time, review every mistake, then move to mixed sets closer to the exam.":
    "আটাইতকৈ দুৰ্বল বিষয়ৰ পৰা আৰম্ভ কৰক, এটা সময়ত এটা সংহতি চেষ্টা কৰক, প্ৰতিটো ভুল পৰ্যালোচনা কৰক, তাৰ পিছত পৰীক্ষাৰ ওচৰ চাপিলে মিশ্ৰিত সংহতিলৈ যাওক।",

  "Attempt the questions first, then read the explanation to check your reasoning.":
    "প্ৰথমে প্ৰশ্নবোৰৰ উত্তৰ দিয়ক, তাৰ পিছত নিজৰ যুক্তি পৰীক্ষা কৰিবলৈ ব্যাখ্যা পঢ়ক।",

  "Note down the facts or rules you keep missing and revise them in short sessions.":
    "আপুনি বাৰে বাৰে পাহৰা তথ্য বা নিয়মবোৰ টুকি লওক আৰু চমু অধিবেশনত সেইবোৰ পুনৰালোচনা কৰক।",

  "Practise in both Assamese and English so the same concept is reinforced in both languages.":
    "অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত অনুশীলন কৰক, যাতে একেই ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।",

  "Note the rule behind every question you get wrong, not just the answer.":
    "ভুল হোৱা প্ৰতিটো প্ৰশ্নৰ কেৱল উত্তৰ নহয়, তাৰ পিছত থকা নিয়মটোও টুকি লওক।",

  "Open a topic above and attempt its questions without looking at the answers.":
    "ওপৰৰ এটা বিষয় খুলি উত্তৰবোৰ নোচোৱাকৈ তাৰ প্ৰশ্নবোৰৰ উত্তৰ দিয়ক।",

  "Read the explanation for every miss and note the fact behind it.":
    "ভুল হোৱা প্ৰতিটো প্ৰশ্নৰ ব্যাখ্যা পঢ়ক আৰু তাৰ পিছত থকা তথ্যটো টুকি লওক।",

  "Start with the sub-category that carries the most questions.":
    "সৰ্বাধিক প্ৰশ্ন থকা উপ-শ্ৰেণীৰ পৰা আৰম্ভ কৰক।",

  "Mark the questions you guessed, even the ones you got right.":
    "আপুনি অনুমান কৰি দিয়া প্ৰশ্নবোৰ চিহ্নিত কৰক — শুদ্ধ হ'লেও।",

  "Attempt the paper in one sitting under exam timing before looking at any key.":
    "কোনো উত্তৰ-চাবি নোচোৱাকৈ পৰীক্ষাৰ সময়সূচী অনুসৰি একে বহনতে গোটেই প্ৰশ্নকাকতৰ উত্তৰ দিয়ক।",

  "Take the matching DHS &amp; DME Technical Grade III mock test once the group is finished.":
    "এই গোটটো শেষ হ'লে ইয়াৰ লগত মিলা DHS &amp; DME Technical Grade III মক টেষ্ট দিয়ক।",

  "Attempt a set under the timer without pausing, to copy exam conditions.":
    "পৰীক্ষাৰ পৰিৱেশৰ দৰে অনুভৱ কৰিবলৈ টাইমাৰৰ সৈতে সংহতি এটা বাধা নিদিয়াকৈ সম্পূৰ্ণ কৰক।",

  "Read the explanation for every question you got wrong immediately after the set.":
    "সংহতিটো শেষ হোৱাৰ লগে লগে ভুল হোৱা প্ৰতিটো প্ৰশ্নৰ ব্যাখ্যা পঢ়ক।",

  "Note the topic behind each mistake and revise that topic before the next set.":
    "প্ৰতিটো ভুলৰ পিছত থকা বিষয়টো টুকি লওক আৰু পৰৱৰ্তী সংহতিৰ আগতে সেই বিষয়টো পুনৰালোচনা কৰক।",

  "Re-attempt the same set after a week and compare your score.":
    "এসপ্তাহৰ পিছত একেই সংহতি পুনৰ চেষ্টা কৰি নিজৰ স্ক'ৰ তুলনা কৰক।",

  "Work through one topic at a time and read the explanation for every answer you miss.":
    "একেবাৰে এটা বিষয় লৈ কাম কৰক আৰু ভুল হোৱা প্ৰতিটো উত্তৰৰ ব্যাখ্যা পঢ়ক।",

  "Keep a one-page note of the facts you keep forgetting and revise it before each session.":
    "বাৰে বাৰে পাহৰা তথ্যবোৰ এক পৃষ্ঠাৰ টোকাত লিখি ৰাখক আৰু প্ৰতিটো অধিবেশনৰ আগতে সেইটো পুনৰালোচনা কৰক।",

  "Re-attempt the same topic after a few days to check whether it has stuck.":
    "কেইদিনমানৰ পিছত একেই বিষয়টো পুনৰ চেষ্টা কৰি চাওক যে সেয়া মনত ৰৈছে নে নাই।",

  "Practise in both Assamese and English so the same fact is recognised in either language.":
    "অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত অনুশীলন কৰক, যাতে একেই তথ্য যিকোনো ভাষাত চিনি পোৱা যায়।",

  "Attempt a timed set of 20 questions once a topic is finished, to build exam speed.":
    "বিষয় এটা শেষ হ'লে ২০ টা প্ৰশ্নৰ সময়বদ্ধ সংহতি এটা কৰক, যাতে পৰীক্ষাৰ গতি বাঢ়ে।",

  "Yes. Every question, explanation and note on axomexam.in is free to read, with no login or payment.":
    "হয়। axomexam.in ৰ প্ৰতিটো প্ৰশ্ন, ব্যাখ্যা আৰু টোকা বিনামূলীয়াকৈ পঢ়িব পাৰি, লগইন বা পেমেন্টৰ প্ৰয়োজন নাই।",

  "Re-attempt the timed set until you clear it comfortably within the clock.":
    "সময়ৰ ভিতৰত আৰামসে সংহতিটো সম্পূৰ্ণ নোহোৱালৈকে সময়বদ্ধ সংহতিটো পুনৰ চেষ্টা কৰক।",

  "Work through the topics above one at a time rather than skipping around.":
    "ইফাল-সিফাল জাঁপ নিদিয়াকৈ ওপৰৰ বিষয়বোৰ এটা এটাকৈ সম্পূৰ্ণ কৰক।",

  "Read the explanation for every question you miss and note the underlying rule.":
    "ভুল হোৱা প্ৰতিটো প্ৰশ্নৰ ব্যাখ্যা পঢ়ক আৰু তাৰ মূল নিয়মটো টুকি লওক।",

  "Assam is essentially an agricultural state. A very large part of the population depends directly on farming, and agriculture is the backbone of the state's economy. The fertile alluvial soil, the warm humid climate and the monsoon rain make the two valleys of Assam natural granaries.":
    "অসম মূলতঃ এখন কৃষিপ্ৰধান ৰাজ্য। জনসংখ্যাৰ এটা বৃহৎ অংশ পোনপটীয়াকৈ কৃষিৰ ওপৰত নিৰ্ভৰশীল, আৰু কৃষিয়েই ৰাজ্যৰ অৰ্থনীতিৰ মেৰুদণ্ড। উৰ্বৰ পলসুৱা মাটি, উষ্ণ আৰ্দ্ৰ জলবায়ু আৰু মৌচুমী বৰ্ষণে অসমৰ দুয়োখন উপত্যকাক প্ৰাকৃতিক শস্যভঁৰাললৈ পৰিণত কৰিছে।",

  "Under British rule Assam's economy was transformed completely. The most dramatic change came with tea. The British had long searched for a source of tea outside China. It was Robert Bruce who, in 1823, found wild tea plants growing in the Singpho country of Upper Assam. After experiments, the tea industry was launched commercially: the first tea company, the Assam Tea Company, was formed in 1839, the first consignment of Assam tea reached London in 1838, and soon tea gardens spread over the valley.":
    "ব্ৰিটিছ শাসনত অসমৰ অৰ্থনীতি সম্পূৰ্ণৰূপে সলনি হৈছিল। আটাইতকৈ ডাঙৰ পৰিৱৰ্তন আহিছিল চাহৰ সৈতে। ব্ৰিটিছসকলে চীনৰ বাহিৰত চাহৰ উৎস বিচাৰি বহুদিন ধৰি চেষ্টা কৰি আছিল। ১৮২৩ চনত ৰবাৰ্ট ব্ৰুছে উজনি অসমৰ সিংফো অঞ্চলত বনৰীয়া চাহ গছ গজি থকা দেখা পায়। পৰীক্ষা-নিৰীক্ষাৰ পিছত চাহ উদ্যোগ বাণিজ্যিকভাৱে আৰম্ভ হয়: প্ৰথম চাহ কোম্পানী 'অসম চাহ কোম্পানী' ১৮৩৯ চনত গঠন হয়, অসম চাহৰ প্ৰথম চালান ১৮৩৮ চনত লণ্ডনত উপনীত হয়, আৰু অলপতে চাহ বাগিচাই উপত্যকাটোত বিয়পি পৰে।",

  "Attempt each topic fully before checking the answers.":
    "উত্তৰ পৰীক্ষা কৰাৰ আগতে প্ৰতিটো বিষয় সম্পূৰ্ণভাৱে চেষ্টা কৰক।",

  "Return to the same topic after a few days to confirm retention.":
    "মনত ৰৈছে নে নাই নিশ্চিত কৰিবলৈ কেইদিনমানৰ পিছত একেই বিষয়লৈ ঘূৰি আহক।",

  "Revise the same topic after a few days to check retention.":
    "মনত ৰখা পৰীক্ষা কৰিবলৈ কেইদিনমানৰ পিছত একেই বিষয় পুনৰালোচনা কৰক।",

  "Finish one sub-category at a time and read every explanation.":
    "একেবাৰে এটা উপ-শ্ৰেণী শেষ কৰক আৰু প্ৰতিটো ব্যাখ্যা পঢ়ক।",

  "Write down the facts you miss and revise the list weekly.":
    "পাহৰা তথ্যবোৰ লিখি থওক আৰু সপ্তাহে সপ্তাহে সেই তালিকা পুনৰালোচনা কৰক।",

  "Re-attempt the paper a fortnight later and compare the scores.":
    "পোন্ধৰ দিনৰ পিছত প্ৰশ্নকাকতখন পুনৰ চেষ্টা কৰি স্ক'ৰ তুলনা কৰক।",

  "Note the chapters that repeat, and revise those first.":
    "বাৰে বাৰে অহা অধ্যায়বোৰ চিনাক্ত কৰি সেইবোৰ আগতে পুনৰালোচনা কৰক।",

  "Yes. The PDF is free and needs no login or payment.":
    "হয়। PDF বিনামূলীয়া, লগইন বা পেমেন্টৰ প্ৰয়োজন নাই।",

  "Yes. Every question, option and explanation is in Assamese and English.":
    "হয়। প্ৰতিটো প্ৰশ্ন, বিকল্প আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজীত আছে।",

  "Yes. Every set on axomexam.in is free, with no login or subscription.":
    "হয়। axomexam.in ৰ প্ৰতিটো সংহতি বিনামূলীয়া, লগইন বা ছাবস্ক্ৰিপশ্বনৰ প্ৰয়োজন নাই।",

  "Return to the same topic after a few days to confirm it has stuck.":
    "মনত ৰৈ গৈছে নে নাই নিশ্চিত কৰিবলৈ কেইদিনমানৰ পিছত একেই বিষয়লৈ ঘূৰি আহক।",

  "Yes. Every question carries the correct answer and a short explanation in both Assamese and English.":
    "হয়। প্ৰতিটো প্ৰশ্নৰ সৈতে শুদ্ধ উত্তৰ আৰু চমু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত দিয়া হৈছে।",

  "The Fundamental Rights can be divided into six groups:":
    "মৌলিক অধিকাৰসমূহক ছয়টা ভাগত ভগাব পাৰি:",

  "Colonial Economy: Tea, Immigration &amp; the Line System":
    "ঔপনিৱেশিক অৰ্থনীতি: চাহ, অনুপ্ৰৱেশ আৰু লাইন প্ৰথা",

};

const RULES = [
  /* "The Idioms &amp; Phrases set has 216 questions, each with four options,
     the correct answer and an explanation." — the set name is an English label
     the Assamese pages keep as it is, the rest is Assamese. */
  [
    /The ([A-Za-z][A-Za-z0-9 &amp;.']{1,60}?) set has (\d+) questions, each with four options, the correct answer and an explanation\./g,
    (m, name, n) =>
      `${name} সংহতিত ${BN(n)} টা প্ৰশ্ন আছে, প্ৰতিটোত চাৰিটা বিকল্প, শুদ্ধ উত্তৰ আৰু এটা ব্যাখ্যা।`,
  ],
  /* "The notes below are drawn from the axomexam study material that matches
     the Railway paper, ..." — one template, twelve paper names. */
  [
    /The notes below are drawn from the axomexam study material that matches the (.+?) paper, so the revision follows the same subjects the examination tests\./g,
    (m, name) =>
      `তলৰ টোকাবোৰ ${name} প্ৰশ্নকাকতৰ সৈতে মিলা axomexam অধ্যয়ন সামগ্ৰীৰ পৰা লোৱা, গতিকে পুনৰালোচনাই পৰীক্ষাত সোধা একেই বিষয়সমূহ অনুসৰণ কৰে।`,
  ],

  /* "Take the matching DHS &amp; DME Technical Grade III mock test once the
     group is finished." — one line per exam. */
  [
    /Take the matching (.+?) mock test once the group is finished\./g,
    (m, exam) => `এই গোটটো শেষ হ'লে ইয়াৰ লগত মিলা ${exam} মক টেষ্ট দিয়ক।`,
  ],
  /* "There are 10 sets with 250 questions in total, all free to attempt." */
  [
    /There are (\d+) sets with (\d+) questions in total, all free to attempt\./g,
    (m, sets, qs) =>
      `মুঠ ${BN(sets)} টা সংহতি আছে, সৰ্বমুঠ ${BN(qs)} টা প্ৰশ্ন — সকলো বিনামূলীয়াকৈ চেষ্টা কৰিব পাৰি।`,
  ],
];

/* Apply to one page. Returns the new HTML and how many replacements were made.
   Two passes, in this order:

   1. Dedupe. If the English sentence already has an Assamese paragraph right
      after it, the page is bilingual and the Assamese copy is the one a reader
      of /as/ needs. Translating here would leave two Assamese paragraphs side
      by side, so the English one is dropped instead.
   2. Translate. Everything still in English is a sentence no Assamese copy
      exists for; it becomes Assamese and its lang attribute follows.
*/
const TAGS = ["p", "li", "h2", "h3", "div", "summary", "td"];
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function translate(html) {
  let n = 0;
  let dropped = 0;
  for (const [en, as] of Object.entries(EXACT)) {
    const key = escapeRe(en);
    for (const tag of TAGS) {
      const sibling = new RegExp(`<${tag} lang="en">${key}</${tag}>\\s*(?=<${tag} lang="as">)`, "g");
      html = html.replace(sibling, () => {
        dropped++;
        return "";
      });
      const whole = `<${tag} lang="en">${en}</${tag}>`;
      const parts = html.split(whole);
      if (parts.length > 1) {
        n += parts.length - 1;
        html = parts.join(`<${tag} lang="as">${as}</${tag}>`);
      }
    }
    const parts = html.split(en);
    if (parts.length > 1) {
      n += parts.length - 1;
      html = parts.join(as);
    }
  }
  for (const [re, fn] of RULES) {
    html = html.replace(re, (...args) => {
      n++;
      return fn(...args);
    });
  }
  return { html, count: n, dropped };
}

module.exports = { translate, EXACT, RULES, BN };
