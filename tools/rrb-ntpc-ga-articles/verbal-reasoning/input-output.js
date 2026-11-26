"use strict";

/* RRB NTPC Reasoning — Input-Output.
   Rendered by tools/rrb-ntpc.ga-extra.js into the page's
   axo-extra-content block (English panel + Assamese panel). */

module.exports = {
  h2: {
    en: "Input-Output for the RRB NTPC CBT",
    as: "RRB NTPC CBT ৰ বাবে ইনপুট-আউটপুট",
  },
  p: {
    en: [
      "Input-output is the topic in the Reasoning paper of the RRB NTPC examination that looks hardest and is in fact the most mechanical. The paper sets two to four questions of this kind in CBT-1, and the same questions return in CBT-2 and in the practice tests. A question describes a machine that reads an input, rearranges it step by step by one fixed rule, and reaches a final output. The candidate is asked for the output of a particular step, for the step at which a given arrangement appears, for the rule itself, or for a valid input. Because the machine never varies its rule, every step can be worked out on paper, and the topic rewards patience rather than cleverness.",

      "The first thing to understand is that the machine applies one rule only. It does not do something different in each step; it does the same small operation again and again, and the list slowly becomes ordered. The commonest machines place one item in its final place per step, and the commonest of all place the smallest remaining number, or the alphabetically first remaining word, at the front of the list. After the first step the smallest item is fixed; after the second step the next smallest is fixed, and so on. Once the candidate sees that the machine is building the sorted order one item at a time, the whole question usually becomes a matter of counting steps.",

      "The number machines work with lists of numbers. In the ascending kind, the machine moves the smallest remaining number to the front of the unsorted part in every step, so the list marches towards ascending order. In the descending kind, it moves the largest remaining number to the front instead. The candidate should not try to guess the machine's intention from the whole list; the correct method is to compare the input with Step I, then Step I with Step II, and to see which item has moved and where it has gone. That single comparison reveals the rule, and the remaining steps then follow mechanically.",

      "The word machines work the same way with words. An alphabetical machine moves the alphabetically first remaining word to the front of the unsorted part, and a reverse-alphabetical machine moves the alphabetically last remaining word to the front. Some machines use the length of the word instead of the alphabet, placing the shortest word first, and some use the length and then the alphabet to break ties. The method does not change: compare two consecutive steps, find the item that has moved to the front, and that item tells the rule.",

      "The step-output question gives the input and the first two or three steps and asks for the output of a named later step. The method is to continue the machine by hand. The candidate knows the rule from the steps already given, so the next step is obtained by applying the rule once more to the last step shown, and the step after that by applying it again. For a four-item list only four steps are needed, and for a five-item list only five, so the work is short. Writing each step on its own line, with the items spaced out, prevents the small slips that cost marks here.",

      "The which-step question reverses this. It gives the input and one arrangement, and asks at which step that arrangement appears. The method is again to build the steps from the input, but the candidate may stop as soon as the target arrangement appears. It helps to remember that in a one-placement-per-step machine the number of items already in their final places is exactly the step number, so an arrangement with three items correctly placed is the third step. Counting the items already in their final positions, rather than writing every step, is a fast check on the answer.",

      "The find-the-rule question gives the input and the output and asks what the machine does. The method is to compare the input with the output item by item and to describe the change in words. If the smallest number has moved to the front, the machine sorts in ascending order; if the words are now in alphabetical order, it sorts alphabetically; if only the even numbers survive, it filters. The candidate should read the options carefully, because two options may both seem plausible and only one will match every item. Testing the chosen rule against a second item in the list confirms it.",

      "The find-the-input question gives the final output and asks which of four lists could have been the input. The key insight is that the machine only rearranges; it never creates, deletes or changes an item. So the input must contain exactly the same items as the output, and the correct option is the one that is a rearrangement of the output. The three wrong options each contain an item that is not in the output, or miss one that is, and they are rejected at once by this test, without any need to simulate the steps.",

      "Some machines combine two operations, and these are the harder questions. A machine may first separate the numbers into even and odd, or into prime and composite, and then sort each group. Another may place all the words first and all the numbers afterwards. The method is to apply the operations in the order the machine does, and to write the intermediate list after each operation. Separating first and sorting second is not the same as sorting first and separating second, so the order matters, and reading the question for the order is essential.",

      "The method for any input-output question can be reduced to a short checklist. First, read the input and the first two steps and find the one rule they share. Second, write each later step on its own line, applying the rule once per step. Third, if the question asks for a step number, count the items already in their final places instead of writing every step. Fourth, if the question asks for the rule, describe the change in words and test it against a second item. Fifth, if the question gives the output and asks for the input, check that the candidate input is a rearrangement of the output. Sixth, for a combined machine, do the operations in the stated order and write the intermediate list.",

      "The traps in this topic are few but real. The commonest is to assume the rule from the first step alone, when the first step may coincide with several rules; the rule must fit two consecutive steps, not one. The second is to lose the spacing and merge two items while copying a step, which makes the comparison with the next step wrong. The third is to sort the whole list at once instead of placing one item per step, which gives the final output when the question wanted an intermediate step. The fourth, in the find-the-input question, is to simulate instead of using the rearrangement test, which wastes time and invites arithmetic slips.",

      "Input-output shares its thinking with two other reasoning topics. The logical sequence of words topic asks the candidate to order items by a natural rule, which is the same skill as reading the machine's rule. The order and ranking topic places items in a sequence by comparison, which is the machine's one-placement-per-step idea in words. A candidate who is comfortable here is therefore comfortable in both of those, which is a good reason to practise this topic rather than avoid it because it looks long.",

      "It is worth keeping a page in the notebook for this topic. Write the one-placement-per-step model at the top, with the ascending and descending variants, then the alphabetical and reverse-alphabetical word variants, then the length variant, and finally the two-operation machines with their order of operations. Add the rearrangement test for the find-the-input question and the count-the-placed-items check for the which-step question. That single page covers almost every question the RRB NTPC paper is likely to set from this topic.",

      "Finally, accuracy matters more than speed, because the errors here come from copying a list wrongly rather than from misunderstanding the machine. The reasoning section gives generous time, so the candidate can afford to write each step on its own line and to space the items out. Two or three input-output questions answered carefully, without a copying slip, are worth more than five answered in haste, and this is a topic where a methodical candidate almost never loses a mark.",
    ],
    as: [
      "ইনপুট-আউটপুট RRB NTPC পৰীক্ষাৰ যুক্তিতৰ্ক পত্ৰৰ সেই বিষয় যিটো আটাইতকৈ কঠিন দেখা যায় কিন্তু আচলতে আটাইতকৈ যান্ত্ৰিক। পত্ৰই CBT-1 ত এই ধৰণৰ দুইৰ পৰা চাৰিটা প্ৰশ্ন দিয়ে, আৰু একেই প্ৰশ্ন CBT-2 আৰু অভ্যাস পৰীক্ষাত ঘূৰি আহে। এটা প্ৰশ্নই এটা মেচিনৰ কথা কয় যিয়ে এটা ইনপুট পঢ়ে, এটা স্থিৰ নিয়মেৰে পদক্ষেপে পদক্ষেপে পুনৰ্বিন্যাস কৰে, আৰু এটা চূড়ান্ত আউটপুটত উপনীত হয়। পৰীক্ষাৰ্থীক এটা নিৰ্দিষ্ট পদক্ষেপৰ আউটপুট, এটা দিয়া বিন্যাস কোনটো পদক্ষেপত আহে, নিয়মটো নিজেই, বা এটা বৈধ ইনপুট সোধা হয়। মেচিনে কেতিয়াও নিয়ম নসলায়, গতিকে প্ৰতিটো পদক্ষেপ কাগজত উলিয়াব পাৰি, আৰু এই বিষয়ই চতুৰতাৰ পৰা নহয়, ধৈৰ্যৰ পৰা নম্বৰ দিয়ে।",

      "প্ৰথম কথা বুজিব লাগে যে মেচিনে কেৱল এটা নিয়ম প্ৰয়োগ কৰে। ই প্ৰতিটো পদক্ষেপত বেলেগ কাম নকৰে; ই একেই সৰু কাৰ্য আকৌ আকৌ কৰে, আৰু তালিকাটো লাহে লাহে শৃংখলাবদ্ধ হয়। আটাইতকৈ সাধাৰণ মেচিনে প্ৰতিটো পদক্ষেপত এটা বস্তু তাৰ চূড়ান্ত স্থানত ৰাখে, আৰু তাৰ ভিতৰত আটাইতকৈ সাধাৰণটোৱে বাকী থকা আটাইতকৈ সৰু সংখ্যাটো, বা বৰ্ণানুক্ৰমে আটাইতকৈ আগৰ শব্দটো, তালিকাৰ আগত ৰাখে। প্ৰথম পদক্ষেপৰ পিছত আটাইতকৈ সৰু বস্তুটো স্থিৰ হয়; দ্বিতীয় পদক্ষেপৰ পিছত পৰৱৰ্তী সৰুটো স্থিৰ হয়, আদি। মেচিনে এটা এটা বস্তু কৰি সজোৱা ক্ৰম গঢ়ি আছে বুলি দেখা পালে, গোটেই প্ৰশ্নটো সাধাৰণতে পদক্ষেপ গণনাৰ কথা হৈ পৰে।",

      "সংখ্যা মেচিনে সংখ্যাৰ তালিকাৰে কাম কৰে। ঊৰ্ধ্বক্ৰম ধৰণত, মেচিনে প্ৰতিটো পদক্ষেপত বাকী থকা আটাইতকৈ সৰু সংখ্যাটো অসজোৱা অংশৰ আগত লৈ যায়, গতিকে তালিকাটো ঊৰ্ধ্বক্ৰমৰ ফালে আগবাঢ়ে। অধঃক্ৰম ধৰণত, ই ইয়াৰ সলনি আটাইতকৈ ডাঙৰ সংখ্যাটো আগত লৈ যায়। পৰীক্ষাৰ্থীয়ে গোটেই তালিকাৰ পৰা মেচিনৰ অভিপ্ৰায় অনুমান কৰিব নালাগে; শুদ্ধ পদ্ধতিটো হ'ল ইনপুটৰ সৈতে পদক্ষেপ I তুলনা কৰা, তাৰ পিছত পদক্ষেপ I ৰ সৈতে পদক্ষেপ II, আৰু দেখা কোনটো বস্তু লৰি গ'ল আৰু ক'লৈ গ'ল। সেই এটা তুলনাই নিয়মটো প্ৰকাশ কৰে, আৰু বাকী পদক্ষেপবোৰ তাৰ পিছত যান্ত্ৰিকভাৱে অনুসৰণ কৰে।",

      "শব্দ মেচিনে শব্দৰ সৈতে একেই ধৰণে কাম কৰে। বৰ্ণানুক্ৰম মেচিনে বাকী থকা বৰ্ণানুক্ৰমে আটাইতকৈ আগৰ শব্দটো অসজোৱা অংশৰ আগত লৈ যায়, আৰু ওলোটা বৰ্ণানুক্ৰম মেচিনে আটাইতকৈ পিছৰ শব্দটো আগত লৈ যায়। কিছু মেচিনে বৰ্ণমালাৰ সলনি শব্দৰ দৈৰ্ঘ্য ব্যৱহাৰ কৰে, আটাইতকৈ চুটি শব্দ আগত ৰাখি, আৰু কিছুই দৈৰ্ঘ্যৰ পিছত বৰ্ণমালাৰে সমতা ভাঙে। পদ্ধতি নসলায়: দুটা ক্ৰমিক পদক্ষেপ তুলনা কৰক, আগলৈ যোৱা বস্তুটো বিচাৰক, আৰু সেই বস্তুটোৱেই নিয়মটো কয়।",

      "পদক্ষেপ-আউটপুট প্ৰশ্নই ইনপুট আৰু প্ৰথম দুটা বা তিনিটা পদক্ষেপ দি এটা নাম দিয়া পৰৱৰ্তী পদক্ষেপৰ আউটপুট সোধে। পদ্ধতিটো হ'ল মেচিনটো হাতেৰে আগবঢ়াই নিয়া। দিয়া পদক্ষেপবোৰৰ পৰা নিয়মটো জনা যায়, গতিকে দেখুওৱা শেষ পদক্ষেপত নিয়মটো আৰু এবাৰ প্ৰয়োগ কৰিলে পৰৱৰ্তী পদক্ষেপ পোৱা যায়, আৰু তাত আকৌ প্ৰয়োগ কৰিলে তাৰ পিছৰটো। চাৰিটা বস্তুৰ তালিকাৰ বাবে কেৱল চাৰিটা পদক্ষেপ লাগে, আৰু পাঁচটাৰ বাবে কেৱল পাঁচটা, গতিকে কামটো চুটি। প্ৰতিটো পদক্ষেপ নিজৰ শাৰীত, বস্তুবোৰ ফাঁক ৰাখি লিখিলে ইয়াত নম্বৰ হেৰুওৱা সৰু ভুলবোৰ ৰোধ হয়।",

      "কোন-পদক্ষেপ প্ৰশ্নই ইয়াক ওলোটাই। ই ইনপুট আৰু এটা বিন্যাস দি সোধে সেই বিন্যাস কোনটো পদক্ষেপত আহে। পদ্ধতিটো আকৌ ইনপুটৰ পৰা পদক্ষেপবোৰ গঢ়া, কিন্তু লক্ষ্য বিন্যাসটো দেখা পালেই পৰীক্ষাৰ্থীয়ে ৰ'ব পাৰে। মনত ৰখা ভাল যে এটা-নিয়োগ-প্ৰতি-পদক্ষেপ মেচিনত তেওঁলোকৰ চূড়ান্ত স্থানত থকা বস্তুৰ সংখ্যাই ঠিক পদক্ষেপ সংখ্যা, গতিকে তিনি বস্তু শুদ্ধভাৱে থকা এটা বিন্যাস তৃতীয় পদক্ষেপ। প্ৰতিটো পদক্ষেপ নিলিখি, চূড়ান্ত স্থানত থকা বস্তুবোৰ গণনা কৰাটো উত্তৰৰ এটা দ্ৰুত পৰীক্ষা।",

      "নিয়ম-বিচাৰক প্ৰশ্নই ইনপুট আৰু আউটপুট দি সোধে মেচিনটোৱে কি কৰে। পদ্ধতিটো হ'ল ইনপুটৰ সৈতে আউটপুট বস্তু বস্তু কৰি তুলনা কৰি পৰিৱৰ্তনটো শব্দত বৰ্ণনা কৰা। আটাইতকৈ সৰু সংখ্যাটো আগলৈ গ'লে মেচিনে ঊৰ্ধ্বক্ৰমে সজায়; শব্দবোৰ এতিয়া বৰ্ণানুক্ৰমে থাকিলে ই বৰ্ণানুক্ৰমে সজায়; কেৱল যুগ্ম সংখ্যাবোৰ থাকিলে ই ছাঁনি মাৰে। পৰীক্ষাৰ্থীয়ে বিকল্পবোৰ সাৱধানে পঢ়িব, কাৰণ দুটা বিকল্প দুয়োটাই সম্ভৱ যেন লগা পাৰে আৰু কেৱল এটাই প্ৰতিটো বস্তুৰ সৈতে মিলিব। বাছনি কৰা নিয়মটো তালিকাৰ দ্বিতীয় এটা বস্তুৰ সৈতে পৰীক্ষা কৰিলে তাক নিশ্চিত কৰে।",

      "ইনপুট-বিচাৰক প্ৰশ্নই চূড়ান্ত আউটপুট দি সোধে চাৰিটা তালিকাৰ কোনটো ইনপুট হ'ব পাৰে। মূল অন্তৰ্দৃষ্টি হ'ল যে মেচিনে কেৱল পুনৰ্বিন্যাস কৰে; ই কেতিয়াও বস্তু সৃষ্টি, মচা বা সলনি নকৰে। গতিকে ইনপুটত আউটপুটত থকা ঠিক একেই বস্তু থাকিব লাগে, আৰু শুদ্ধ বিকল্পটো হ'ল আউটপুটৰ এটা পুনৰ্বিন্যাস। তিনিওটা ভুল বিকল্পত আউটপুটত নথকা এটা বস্তু থাকে, বা থকা এটা নাই, আৰু পদক্ষেপবোৰ অনুকৰণ নকৰাকৈয়ে এই পৰীক্ষাই তেওঁলোকক লগে লগে বাদ দিয়ে।",

      "কিছু মেচিনে দুটা কাৰ্য একত্ৰিত কৰে, আৰু এইবোৰেই কঠিন প্ৰশ্ন। এটা মেচিনে প্ৰথমে সংখ্যাবোৰ যুগ্ম আৰু অযুগ্ম, বা মৌলিক আৰু যৌগিক, হিচাপে পৃথক কৰিব পাৰে, আৰু তাৰ পিছত প্ৰতিটো দল সজাব পাৰে। আন এটাই প্ৰথমে আটাইবোৰ শব্দ আৰু পিছত আটাইবোৰ সংখ্যা ৰাখিব পাৰে। পদ্ধতিটো হ'ল মেচিনে কৰা ক্ৰমত কাৰ্যবোৰ প্ৰয়োগ কৰা, আৰু প্ৰতিটো কাৰ্যৰ পিছত মধ্যৱৰ্তী তালিকাটো লিখা। প্ৰথমে পৃথক কৰি পিছত সজোৱাটো প্ৰথমে সজাই পিছত পৃথক কৰাৰ সমান নহয়, গতিকে ক্ৰমটো গুৰুত্বপূৰ্ণ, আৰু ক্ৰমটোৰ বাবে প্ৰশ্নটো পঢ়াটো অপৰিহাৰ্য।",

      "যিকোনো ইনপুট-আউটপুট প্ৰশ্নৰ পদ্ধতিটো এটা চুটি তালিকালৈ ৰূপান্তৰ কৰিব পাৰি। প্ৰথমে, ইনপুট আৰু প্ৰথম দুটা পদক্ষেপ পঢ়ি তেওঁলোকে ভাগ কৰা এটা নিয়ম বিচাৰক। দ্বিতীয়তে, প্ৰতিটো পিছৰ পদক্ষেপ নিজৰ শাৰীত, প্ৰতি পদক্ষেপত নিয়মটো এবাৰ প্ৰয়োগ কৰি লিখক। তৃতীয়তে, প্ৰশ্নই পদক্ষেপ সংখ্যা সুধিলে প্ৰতিটো পদক্ষেপ নিলিখি, চূড়ান্ত স্থানত থকা বস্তুবোৰ গণনা কৰক। চতুৰ্থতে, প্ৰশ্নই নিয়ম সুধিলে পৰিৱৰ্তনটো শব্দত বৰ্ণনা কৰি দ্বিতীয় এটা বস্তুৰ সৈতে পৰীক্ষা কৰক। পঞ্চমতে, প্ৰশ্নই আউটপুট দি ইনপুট সুধিলে প্ৰাৰ্থী ইনপুটটো আউটপুটৰ এটা পুনৰ্বিন্যাস হয়নে পৰীক্ষা কৰক। ষষ্ঠতে, একত্ৰিত মেচিনৰ বাবে কোৱা ক্ৰমত কাৰ্যবোৰ কৰি মধ্যৱৰ্তী তালিকাটো লিখক।",

      "এই বিষয়ৰ ফান্দবোৰ কম কিন্তু আচল। আটাইতকৈ সাধাৰণটো হ'ল কেৱল প্ৰথম পদক্ষেপৰ পৰা নিয়ম ধৰি লোৱা, য'ত প্ৰথম পদক্ষেপ কেইবাটাও নিয়মৰ সৈতে মিলি যাব পাৰে; নিয়মটো দুটা ক্ৰমিক পদক্ষেপত মিলিব লাগে, এটাত নহয়। দ্বিতীয়টো হ'ল ফাঁক হেৰুৱাই এটা পদক্ষেপ কপি কৰোঁতে দুটা বস্তু লগ লগাই দিয়া, যিয়ে পৰৱৰ্তী পদক্ষেপৰ সৈতে তুলনাটো ভুল কৰে। তৃতীয়টো হ'ল প্ৰতি পদক্ষেপত এটা বস্তুৰ সলনি গোটেই তালিকাটো এফেৰিতে সজাই দিয়া, যিয়ে প্ৰশ্নই মধ্যৱৰ্তী পদক্ষেপ বিচৰা সময়ত চূড়ান্ত আউটপুট দিয়ে। চতুৰ্থটো, ইনপুট-বিচাৰক প্ৰশ্নত, পুনৰ্বিন্যাস পৰীক্ষাৰ সলনি অনুকৰণ কৰা, যিয়ে সময় নষ্ট কৰে আৰু গণিতৰ ভুললৈ মাতে।",

      "ইনপুট-আউটপুটে ইয়াৰ চিন্তা আন দুটা যুক্তিতৰ্ক বিষয়ৰ সৈতে ভাগ কৰে। শব্দৰ যুক্তিসংগত ক্ৰম বিষয়ই এটা স্বাভাৱিক নিয়মেৰে বস্তুবোৰ সজাবলৈ কয়, যি মেচিনৰ নিয়ম পঢ়াৰ একেই দক্ষতা। ক্ৰম আৰু স্থান নিৰ্ণয় বিষয়ই তুলনাৰে বস্তুবোৰ এটা ক্ৰমত ৰাখে, যি মেচিনৰ এক-নিয়োগ-প্ৰতি-পদক্ষেপ ধাৰণা শব্দত। ইয়াত স্বচ্ছন্দ এজন পৰীক্ষাৰ্থী সেয়ে সেই দুয়োত স্বচ্ছন্দ, যি এই বিষয়টো দীঘল দেখা যায় বুলি এৰাই চলাৰ সলনি অভ্যাস কৰাৰ এটা ভাল কাৰণ।",

      "এই বিষয়ৰ বাবে টোকাবহীত এখন পৃষ্ঠা ৰখা ভাল। ওপৰত এক-নিয়োগ-প্ৰতি-পদক্ষেপ আৰ্হিটো, ইয়াৰ ঊৰ্ধ্বক্ৰম আৰু অধঃক্ৰম ৰূপ, তাৰ পিছত বৰ্ণানুক্ৰম আৰু ওলোটা বৰ্ণানুক্ৰম শব্দ ৰূপ, তাৰ পিছত দৈৰ্ঘ্য ৰূপ, আৰু শেষত দুটা-কাৰ্যৰ মেচিনবোৰ তেওঁলোকৰ কাৰ্য-ক্ৰমেৰে লিখক। ইনপুট-বিচাৰক প্ৰশ্নৰ বাবে পুনৰ্বিন্যাস পৰীক্ষা আৰু কোন-পদক্ষেপ প্ৰশ্নৰ বাবে ৰখা-বস্তু-গণনা পৰীক্ষা যোগ কৰক। সেই এটা পৃষ্ঠাই RRB NTPC পত্ৰই এই বিষয়ৰ পৰা দিব পৰা প্ৰায় প্ৰতিটো প্ৰশ্ন সামৰি লয়।",

      "শেষত, গতিৰ পৰা শুদ্ধতা বেছি গুৰুত্বপূৰ্ণ, কাৰণ ইয়াত ভুলবোৰ মেচিন নুবুজাৰ পৰা নহয়, তালিকা ভুলকৈ কপি কৰাৰ পৰা হয়। যুক্তিতৰ্ক অংশই উদাৰ সময় দিয়ে, গতিকে পৰীক্ষাৰ্থীয়ে প্ৰতিটো পদক্ষেপ নিজৰ শাৰীত লিখি বস্তুবোৰ ফাঁক ৰাখিবলৈ সময় উলিয়াব পাৰে। সাৱধানে, কপিৰ ভুল নকৰাকৈ উত্তৰ দিয়া দুটা বা তিনিৰ পৰা চাৰিটা ইনপুট-আউটপুট প্ৰশ্নই খৰধৰকৈ দিয়া পাঁচটাৰ পৰা বেছি মূল্যৱান, আৰু এই বিষয়টো এনে এটা য'ত এজন পদ্ধতিগত পৰীক্ষাৰ্থীয়ে প্ৰায় কেতিয়াও নম্বৰ হেৰুৱায় না।",
    ],
  },
  list: {
    en: [
      "The machine applies one rule only, the same rule in every step.",
      "One-placement-per-step: the smallest remaining number, or first word, goes to the front.",
      "Number machines: ascending (smallest first) or descending (largest first).",
      "Word machines: alphabetical, reverse alphabetical, or by word length.",
      "Step-output question: continue the machine by hand from the last step shown.",
      "Which-step question: count the items already in their final places.",
      "Find-the-input question: the input must be a rearrangement of the output.",
      "Combined machines: separate then sort, or words then numbers, in the stated order.",
    ],
    as: [
      "মেচিনে কেৱল এটা নিয়ম প্ৰয়োগ কৰে, প্ৰতিটো পদক্ষেপত একেই নিয়ম।",
      "এক-নিয়োগ-প্ৰতি-পদক্ষেপ: বাকী থকা আটাইতকৈ সৰু সংখ্যা, বা প্ৰথম শব্দ, আগলৈ যায়।",
      "সংখ্যা মেচিন: ঊৰ্ধ্বক্ৰম (সৰু আগত) বা অধঃক্ৰম (ডাঙৰ আগত)।",
      "শব্দ মেচিন: বৰ্ণানুক্ৰম, ওলোটা বৰ্ণানুক্ৰম, বা শব্দৰ দৈৰ্ঘ্য অনুসৰি।",
      "পদক্ষেপ-আউটপুট প্ৰশ্ন: দেখুওৱা শেষ পদক্ষেপৰ পৰা মেচিন হাতেৰে আগবঢ়াই নিয়ক।",
      "কোন-পদক্ষেপ প্ৰশ্ন: চূড়ান্ত স্থানত থকা বস্তুবোৰ গণনা কৰক।",
      "ইনপুট-বিচাৰক প্ৰশ্ন: ইনপুট আউটপুটৰ এটা পুনৰ্বিন্যাস হ'ব লাগে।",
      "একত্ৰিত মেচিন: কোৱা ক্ৰমত পৃথক কৰি সজাওক, বা শব্দ তাৰ পিছত সংখ্যা।",
    ],
  },
  faqs: [
    {
      q: { en: "What is the single most useful idea in input-output?", as: "ইনপুট-আউটপুটত আটাইতকৈ উপযোগী এটা ধাৰণা কি?" },
      a: {
        en: "That the machine applies one rule only, and the commonest rule places one item in its final place per step. Once you see that, the question becomes a matter of counting steps.",
        as: "মেচিনে কেৱল এটা নিয়ম প্ৰয়োগ কৰে, আৰু আটাইতকৈ সাধাৰণ নিয়মে প্ৰতিটো পদক্ষেপত এটা বস্তু তাৰ চূড়ান্ত স্থানত ৰাখে। সেয়া দেখা পালে, প্ৰশ্নটো পদক্ষেপ গণনাৰ কথা হৈ পৰে।",
      },
    },
    {
      q: { en: "How do I find the machine's rule quickly?", as: "মেচিনৰ নিয়ম কেনেকৈ সোনকালে বিচাৰিম?" },
      a: {
        en: "Compare the input with Step I, then Step I with Step II, and see which item has moved and where. The rule must fit two consecutive steps, not just one, because the first step may coincide with several rules.",
        as: "ইনপুটৰ সৈতে পদক্ষেপ I, তাৰ পিছত পদক্ষেপ I ৰ সৈতে পদক্ষেপ II তুলনা কৰক, আৰু দেখক কোনটো বস্তু লৰি গ'ল আৰু ক'লৈ। নিয়মটো দুটা ক্ৰমিক পদক্ষেপত মিলিব লাগে, কেৱল এটাত নহয়, কাৰণ প্ৰথম পদক্ষেপ কেইবাটাও নিয়মৰ সৈতে মিলি যাব পাৰে।",
      },
    },
    {
      q: { en: "What is the fast way to answer a which-step question?", as: "কোন-পদক্ষেপ প্ৰশ্নৰ দ্ৰুত উত্তৰ কেনেকৈ দিম?" },
      a: {
        en: "Count the items already in their final places. In a one-placement-per-step machine that count equals the step number, so an arrangement with three items correctly placed is the third step.",
        as: "চূড়ান্ত স্থানত থকা বস্তুবোৰ গণনা কৰক। এক-নিয়োগ-প্ৰতি-পদক্ষেপ মেচিনত সেই সংখ্যাই পদক্ষেপ সংখ্যাৰ সমান, গতিকে তিনি বস্তু শুদ্ধভাৱে থকা এটা বিন্যাস তৃতীয় পদক্ষেপ।",
      },
    },
    {
      q: { en: "How is the find-the-input question solved without simulating?", as: "অনুকৰণ নকৰাকৈ ইনপুট-বিচাৰক প্ৰশ্ন কেনেকৈ সমাধান কৰা হয়?" },
      a: {
        en: "The machine only rearranges, so the input must contain exactly the same items as the output. The correct option is the one that is a rearrangement of the output; the others each contain an item that is not in the output.",
        as: "মেচিনে কেৱল পুনৰ্বিন্যাস কৰে, গতিকে ইনপুটত আউটপুটত থকা ঠিক একেই বস্তু থাকিব লাগে। শুদ্ধ বিকল্পটো হ'ল আউটপুটৰ এটা পুনৰ্বিন্যাস; বাকীবোৰৰ প্ৰতিটোত আউটপুটত নথকা এটা বস্তু থাকে।",
      },
    },
    {
      q: { en: "Which other topics improve with input-output practice?", as: "ইনপুট-আউটপুটৰ অভ্যাসে আন কোনবোৰ বিষয় উন্নত কৰে?" },
      a: {
        en: "Logical sequence of words and order and ranking. The first asks you to order items by a natural rule, and the second places items in a sequence by comparison, which are the machine's ideas in words.",
        as: "শব্দৰ যুক্তিসংগত ক্ৰম আৰু ক্ৰম আৰু স্থান নিৰ্ণয়। প্ৰথমটোৱে এটা স্বাভাৱিক নিয়মেৰে বস্তু সজাবলৈ কয়, আৰু দ্বিতীয়টোৱে তুলনাৰে বস্তু এটা ক্ৰমত ৰাখে, যি মেচিনৰ ধাৰণা শব্দত।",
      },
    },
  ],
};
