"use strict";

/* RRB NTPC Reasoning — Sitting Arrangement.
   Rendered by tools/rrb-ntpc.ga-extra.js into the page's
   axo-extra-content block (English panel + Assamese panel). */

module.exports = {
  h2: {
    en: "Sitting Arrangement for the RRB NTPC CBT",
    as: "RRB NTPC CBT ৰ বাবে বহা-বিন্যাস",
  },
  p: {
    en: [
      "Sitting arrangement is a reasoning topic that the RRB NTPC paper uses to test whether a candidate can hold several small facts in mind at once and place people in the correct seats. A question gives a group of people, a shape of seating such as a straight row, a circle, a square table or two facing rows, and a handful of conditions, and asks for one definite answer, such as who sits at a particular place or who is the neighbour of a named person. The topic is slower than ranking or inequality, but it is fully deterministic: once the arrangement is built correctly, the answer is certain, and no guessing is needed. In CBT-1 the paper usually sets two to three such questions, and the same skill returns in the puzzle questions.",

      "The first decision in every question is the shape of the arrangement, because the shape fixes the rules of left and right. In a straight row the line has two ends, and left and right are fixed by the direction the people face. If the row faces north, a person's left is the reader's left, and if the row faces south, a person's left is the reader's right. In a circle facing the centre, a person's left is clockwise and his right is anticlockwise, because he looks inward. In a circle facing outward the two are reversed. Getting this one convention right at the start is the single most important step, because a single reversal of left and right turns the whole arrangement into its mirror image and changes every answer.",

      "In a straight row the standard clues are of four kinds. The first gives an absolute position, such as A sits at the extreme left end or B sits in the middle of seven persons. The second gives a relative position, such as C sits second to the left of D or E is third from the right end. The third gives a count of persons between two people, such as exactly two persons sit between F and G. The fourth gives an adjacency, such as H and I sit next to each other. The method is to start from the absolute clue, because it anchors the row, and then to place the relative and between clues one at a time, always checking that the count of persons stays consistent.",

      "In a circle the clues are similar but the language of left and right becomes clockwise and anticlockwise. The absolute clue is often a named person at a named place, and the relative clues then walk around the circle in steps. The important extra rule in a circle is that opposite means exactly half the circle away, so in a circle of eight, a person faces the person four seats away, and in a circle of six, three seats away. A question about who is opposite a named person is answered by counting half the number of seats, and a question about neighbours is answered by counting one seat in the given direction.",

      "When a question gives no single absolute clue, the candidate must try each possible starting place. This is the part of the topic that separates a confident solver from a hesitant one. The method is to pick the condition that names two people together, such as A is second to the left of B, and to try the few positions B can occupy, discarding each trial as soon as it contradicts another condition. In a straight row of five to seven persons this trial rarely takes more than two or three attempts, and writing each attempt as a small row of letters on paper is much faster than trying to hold the alternatives in the head.",

      "The counting questions form a family of their own. A question may ask in how many ways a group can be seated, or in how many ways they can be seated if two particular people must sit together, or must sit apart. The basic counts are easy and worth memorising. The number of ways to arrange n people in a straight row is n factorial. The number of ways to arrange n people in a circle is n minus one factorial, because in a circle only the relative order matters, so one person may be fixed as a reference. If two people must sit together, they are treated as one unit, which reduces the number of units by one and then doubles the count for the two internal orders.",

      "Two facing rows form another standard shape. Here one row faces north and the other faces south, or one faces east and the other west, and each person in one row faces exactly one person in the other. The rule that answers almost every such question is that the first person from the left of one row faces the first person from the left of the other row, the second faces the second, and so on. This is because the two rows are mirror images across the gap between them. A question about who faces a named person is therefore answered by counting the same position from the same end in the other row.",

      "A square or rectangular table is a circle in disguise. When eight people sit around a square table, four on each side and all facing the centre, the seating is a circle of eight with the four corner seats shared between adjacent sides. A question about who is diagonally opposite a named person is answered by counting four seats away, exactly as in a circle of eight. When the table has four people, one on each side, the arrangement is a circle of four, and a person faces the person directly across the table. Recognising the square table as a circle saves the candidate from inventing a new rule.",

      "The floor or building arrangement is a third standard shape, common in the puzzles section and sometimes in the arrangement section. A building has a number of floors, the ground floor is numbered one, and the top floor carries the highest number. A clue such as Ravi lives two floors above Meena is a relative clue, and a clue such as Sita lives on the top floor is an absolute one. The method is the same as a row: fix the absolute clue, then place the relative clues one at a time. The one caution is that above and below are directions, exactly as left and right are directions in a row, and they must not be mixed.",

      "The method for any sitting arrangement question reduces to a short checklist. First, note the shape and the facing direction, and fix the rule for left and right. Second, find the absolute clue and anchor it. Third, place the relative and between clues one at a time, checking the count after each. Fourth, when no absolute clue exists, try each position of a named pair and discard contradictions. Fifth, for a counting question, recall the factorial formulas and the treat-as-one-unit trick. Sixth, for a facing-rows or table question, use the mirror rule and the half-circle rule. Seventh, write the arrangement on paper rather than holding it in the head.",

      "The traps in this topic are predictable. The commonest is reversing left and right, which happens when the row faces south or when the circle faces outward. The second is forgetting that in a circle the opposite seat is half the seats away, not the seat directly visible. The third is treating a between clue as an adjacency, that is, reading two persons between as sitting next to each other. The fourth is forgetting the internal factor of two when two people must sit together in a counting question. The fifth is mixing above and below in a floor question. Reading the direction once more before placing the clues, and checking each clue against the partial arrangement, removes all five.",

      "Sitting arrangement is closely tied to several other reasoning topics. The order and ranking topic uses the same idea of positions in a line, the puzzles topic often contains a small arrangement inside a larger puzzle, and the blood relations topic sometimes places a family around a table. The direction topic uses the same left-and-right convention that decides the arrangement, so a candidate who is weak on directions is often weak here for the same reason. A little practice on directions therefore pays a double dividend in this topic.",

      "It is worth keeping one page in the notebook for this topic. At the top write the facing rules, that in a north-facing row left is the reader's left, that in a circle facing the centre left is clockwise, and that the two reverse when the row faces south or the circle faces outward. Below them write the counting formulas, n factorial for a row and n minus one factorial for a circle, and the treat-as-one-unit rule. Then write the mirror rule for two facing rows and the half-circle rule for the opposite seat. That single page covers almost every question the RRB NTPC paper is likely to set from this topic.",

      "Finally, patience matters more than speed here. This is the slowest topic in the reasoning section, and a candidate who rushes it produces an arrangement that satisfies the first two clues and breaks the third. The reasoning section gives generous time, so the wise approach is to spend the extra minute to build the arrangement fully and to verify every clue against it before answering. One arrangement question answered without error, after a careful build, is worth more than three answered by guessing, and this is a topic where the careful candidate almost always wins.",
    ],
    as: [
      "বহা-বিন্যাস এনে এটা যুক্তিতৰ্ক বিষয় য'ত RRB NTPC পত্ৰই পৰীক্ষা কৰে পৰীক্ষাৰ্থীয়ে একেসময়তে কেইটামান সৰু তথ্য মনত ৰাখি মানুহক সঠিক আসনত ৰাখিব পাৰে নে নাই। এটা প্ৰশ্নই এটা দল মানুহ, এটা বহাৰ আকৃতি যেনে পোন শাৰী, বৃত্ত, বৰ্গ টেবুল বা দুখন মুখামুখি শাৰী, আৰু কেইটামান চৰ্ত দিয়ে, আৰু এটা নিশ্চিত উত্তৰ সোধে, যেনে এটা নিৰ্দিষ্ট ঠাইত কোন বহে বা এজন নাম থকা ব্যক্তিৰ চুবুৰীয়া কোন। বিষয়টো স্থান নিৰ্ণয় বা অসমতাতকৈ লেহেম, কিন্তু সম্পূৰ্ণ নিৰ্ণায়ক: বিন্যাসটো সঠিকভাৱে গঢ়ি উঠিলে উত্তৰ নিশ্চিত, আৰু কোনো অনুমানৰ প্ৰয়োজন নাই। CBT-1 ত পত্ৰই সাধাৰণতে এনে দুটাৰ পৰা তিনিৰ পৰা চাৰিটা প্ৰশ্ন দিয়ে, আৰু একেই দক্ষতা ধাঁধা প্ৰশ্নত ঘূৰি আহে।",

      "প্ৰতিটো প্ৰশ্নৰ প্ৰথম সিদ্ধান্ত হ'ল বিন্যাসৰ আকৃতি, কাৰণ আকৃতিয়ে বাওঁ আৰু সোঁৰ নিয়ম নিৰ্ধাৰণ কৰে। পোন শাৰীত পংক্তিটোৰ দুটা মূৰ থাকে, আৰু মানুহে মুখ কৰা দিশেৰে বাওঁ আৰু সোঁ নিৰ্ধাৰিত হয়। শাৰীয়ে উত্তৰলৈ মুখ কৰিলে এজনৰ বাওঁ পঢ়ুৱৈৰ বাওঁ, আৰু শাৰীয়ে দক্ষিণলৈ মুখ কৰিলে এজনৰ বাওঁ পঢ়ুৱৈৰ সোঁ। কেন্দ্ৰমুখী এটা বৃত্তত এজনৰ বাওঁ ঘড়ীৰ দিশ আৰু সোঁ ঘড়ীৰ বিপৰীত, কাৰণ তেওঁ ভিতৰলৈ চায়। বাহিৰমুখী বৃত্তত দুয়ো ওলোটা। আৰম্ভণিতে এই এটা নিয়ম সঠিক কৰাটোৱেই আটাইতকৈ গুৰুত্বপূৰ্ণ খোজ, কাৰণ বাওঁ আৰু সোঁ এটা ওলোটা কৰিলে গোটেই বিন্যাস ইয়াৰ দাপোন প্ৰতিবিম্ব হৈ যায় আৰু প্ৰতিটো উত্তৰ সলনি হয়।",

      "পোন শাৰীত মানক সংকেত চাৰিবিধ। প্ৰথমটোৱে এটা নিৰপেক্ষ অৱস্থান দিয়ে, যেনে A আটাইতকৈ বাওঁমূৰত বহে বা B সাতজনৰ মাজত বহে। দ্বিতীয়টোৱে এটা আপেক্ষিক অৱস্থান দিয়ে, যেনে C, D ৰ বাওঁফালে দ্বিতীয়ত বহে বা E সোঁমূৰৰ পৰা তৃতীয়। তৃতীয়টোৱে দুজনৰ মাজত এটা গণনা দিয়ে, যেনে F আৰু G ৰ মাজত ঠিক দুজন বহে। চতুৰ্থটোৱে এটা লগত লগত থকা দিয়ে, যেনে H আৰু I কাষে কাষে বহে। পদ্ধতিটো হ'ল নিৰপেক্ষ সংকেতৰ পৰা আৰম্ভ কৰা, কাৰণ ই শাৰীখনক নাংগায়, আৰু তাৰ পিছত আপেক্ষিক আৰু মাজত সংকেতবোৰ এটা এটাকৈ ৰখা, প্ৰতিবাৰ ব্যক্তিৰ গণনা সংগত থাকে নে নাই পৰীক্ষা কৰি।",

      "বৃত্তত সংকেতবোৰ একেই কিন্তু বাওঁ-সোঁৰ ভাষা ঘড়ীৰ দিশ আৰু ঘড়ীৰ বিপৰীত দিশ হয়। নিৰপেক্ষ সংকেতটো প্ৰায়ে এজন নাম থকা ব্যক্তি এটা নাম থকা ঠাইত, আৰু আপেক্ষিক সংকেতবোৰে খোজত বৃত্তটো ঘূৰি যায়। বৃত্তত গুৰুত্বপূৰ্ণ অতিৰিক্ত নিয়মটো হ'ল বিপৰীত মানে ঠিক আধা বৃত্ত দূৰত, গতিকে আঠজনৰ এটা বৃত্তত এজনে চাৰি আসন দূৰৰ ব্যক্তিজনৰ সন্মুখীন, আৰু ছয়জনৰ এটা বৃত্তত তিনি আসন দূৰৰ। এজন নাম থকা ব্যক্তিৰ বিপৰীতে কোন সোধা প্ৰশ্নৰ উত্তৰ আসন সংখ্যাৰ আধা গণনা কৰি দিয়া হয়, আৰু চুবুৰীয়াৰ প্ৰশ্নৰ উত্তৰ দিয়া দিশত এটা আসন গণনা কৰি দিয়া হয়।",

      "যেতিয়া এটা প্ৰশ্নই কোনো এটা নিৰপেক্ষ সংকেত নিদিয়ে, পৰীক্ষাৰ্থীয়ে সম্ভৱপৰ প্ৰতিটো আৰম্ভণি ঠাই চেষ্টা কৰিব লাগে। এই অংশটোৱেই এজন আত্মবিশ্বাসী সমাধানকাৰীক এজন দ্বিধাগ্ৰস্তৰ পৰা পৃথক কৰে। পদ্ধতিটো হ'ল দুজন ব্যক্তি একেলগে নাম লোৱা চৰ্তটো বাছনি কৰা, যেনে A, B ৰ বাওঁফালে দ্বিতীয়ত বহে, আৰু B য়ে ল'ব পৰা কেইটামান অৱস্থান চেষ্টা কৰা, আন এটা চৰ্তৰ সৈতে বিৰোধ হোৱা মাত্ৰকে প্ৰতিটো প্ৰচেষ্টা বাদ দিয়া। পাঁচৰ পৰা সাতজনৰ এটা পোন শাৰীত এই প্ৰচেষ্টাই কদাচিৎ দুইৰ পৰা তিনিৰ পৰা বেছি চেষ্টা লয়, আৰু প্ৰতিটো প্ৰচেষ্টা কাগজত আখৰৰ এটা সৰু শাৰী হিচাপে লিখাটো বিকল্পবোৰ মনত ৰখাতকৈ বহু দ্ৰুত।",

      "গণনাৰ প্ৰশ্নবোৰে এটা নিজা পৰিয়াল গঠন কৰে। এটা প্ৰশ্নই সোধে এটা দলক কিমান ধৰণে বহুৱাব পাৰি, বা দুজন নিৰ্দিষ্ট লোকে একেলগে বহিব লাগিলে বা আঁতৰত বহিব লাগিলে কিমান ধৰণে। মূল গণনাবোৰ সহজ আৰু মনত ৰখাৰ যোগ্য। n জনক এটা পোন শাৰীত সজোৱাৰ ধৰণ n ফেক্টৰিয়েল। n জনক এটা বৃত্তত সজোৱাৰ ধৰণ n বিয়োগ এক ফেক্টৰিয়েল, কাৰণ বৃত্তত কেৱল আপেক্ষিক ক্ৰমহে গুৰুত্বপূৰ্ণ, গতিকে এজন ব্যক্তিক প্ৰসংগ হিচাপে স্থিৰ কৰিব পাৰি। দুজনে একেলগে বহিব লাগিলে তেওঁলোকক এটা একক ধৰা হয়, যিয়ে এককৰ সংখ্যা এক কমায় আৰু তাৰ পিছত দুটা অভ্যন্তৰীণ ক্ৰমৰ বাবে গণনা দুগুণ কৰে।",

      "দুখন মুখামুখি শাৰীয়ে আন এটা মানক আকৃতি গঠন কৰে। ইয়াত এখন শাৰীয়ে উত্তৰলৈ আৰু আনখনে দক্ষিণলৈ, বা এখনে পূবলৈ আৰু আনখনে পশ্চিমলৈ মুখ কৰে, আৰু এখনেৰ প্ৰতিজন ব্যক্তি আনখনৰ ঠিক এজনৰ সন্মুখীন। এনে প্ৰায় প্ৰতিটো প্ৰশ্নৰ উত্তৰ দিয়া নিয়মটো হ'ল এখনেৰ বাওঁৰ পৰা প্ৰথম ব্যক্তিজনে আনখনৰ বাওঁৰ পৰা প্ৰথমজনৰ সন্মুখীন, দ্বিতীয়জনে দ্বিতীয়জনৰ, আদি। কাৰণ দুয়ো শাৰী তেওঁলোকৰ মাজৰ ফাঁকৰ জৰিয়তে দাপোন প্ৰতিবিম্ব। এজন নাম থকা ব্যক্তিৰ সন্মুখত কোন সোধা প্ৰশ্নৰ উত্তৰ সেয়ে আনখন শাৰীত একেই মূৰৰ পৰা একেই অৱস্থান গণনা কৰি দিয়া হয়।",

      "বৰ্গ বা আয়তাকাৰ টেবুল আচলতে ছদ্মবেশত এটা বৃত্ত। আঠজনে এটা বৰ্গ টেবুলৰ চাৰিওফালে, প্ৰতিটো কাষত চাৰিজন আৰু আটায়ে কেন্দ্ৰলৈ মুখ কৰি বহিলে, বহাটো আঠজনৰ এটা বৃত্ত য'ত চাৰিটা কোণৰ আসন কাষৰীয়া কাষবোৰৰ মাজত ভাগ কৰা। এজন নাম থকা ব্যক্তিৰ কৰ্ণত বিপৰীতে কোন সোধা প্ৰশ্নৰ উত্তৰ চাৰি আসন দূৰত গণনা কৰি দিয়া হয়, আঠজনৰ এটা বৃত্তত যেনেকৈ। টেবুলত চাৰিজন, প্ৰতিটো কাষত এজন হ'লে বিন্যাস চাৰিজনৰ এটা বৃত্ত, আৰু এজন ব্যক্তি টেবুলৰ ঠিক সিটো ফালৰ ব্যক্তিৰ সন্মুখীন। বৰ্গ টেবুলক এটা বৃত্ত হিচাপে চিনি পোৱাটোৱে পৰীক্ষাৰ্থীক এটা নতুন নিয়ম উদ্ভাৱন কৰাৰ পৰা বচায়।",

      "মহলা বা ঘৰৰ বিন্যাস তৃতীয় এটা মানক আকৃতি, ধাঁধা অংশত সাধাৰণ আৰু কেতিয়াবা বিন্যাস অংশত। এটা ঘৰত কেইটামান মহলা থাকে, ভূ-তলক এক নম্বৰ দিয়া হয়, আৰু ওপৰৰ মহলত আটাইতকৈ ডাঙৰ নম্বৰ থাকে। ৰবি মীনাৰ দুটা মহলা ওপৰত থাকে এনে এটা সংকেত আপেক্ষিক, আৰু সীতা ওপৰৰ মহলত থাকে এনে এটা সংকেত নিৰপেক্ষ। পদ্ধতিটো শাৰীৰ দৰেই: নিৰপেক্ষ সংকেত স্থিৰ কৰক, তাৰ পিছত আপেক্ষিক সংকেতবোৰ এটা এটাকৈ ৰাখক। এটা সতৰ্কতা হ'ল ওপৰ আৰু তল দিশ, শাৰীত বাওঁ আৰু সোঁ দিশ যেনেকৈ, আৰু সিহঁত মিহলিব নালাগে।",

      "যিকোনো বহা-বিন্যাস প্ৰশ্নৰ পদ্ধতি এটা চুটি তালিকালৈ ৰূপান্তৰ কৰিব পাৰি। প্ৰথমে, আকৃতি আৰু মুখ কৰা দিশ মন কৰি বাওঁ-সোঁৰ নিয়ম স্থিৰ কৰক। দ্বিতীয়তে, নিৰপেক্ষ সংকেত বিচাৰি তাক নাংগাক। তৃতীয়তে, আপেক্ষিক আৰু মাজত সংকেতবোৰ এটা এটাকৈ ৰাখি, প্ৰতিটোৰ পিছত গণনা পৰীক্ষা কৰক। চতুৰ্থতে, কোনো নিৰপেক্ষ সংকেত নাথাকিলে, এটা নাম থকা যোৰৰ প্ৰতিটো অৱস্থান চেষ্টা কৰি বিৰোধ বাদ দিয়ক। পঞ্চমতে, গণনাৰ প্ৰশ্নৰ বাবে ফেক্টৰিয়েল সূত্ৰ আৰু একক-হিচাপে-ধৰা কৌশল মনত ৰাখক। ষষ্ঠতে, মুখামুখি-শাৰী বা টেবুল প্ৰশ্নৰ বাবে দাপোন নিয়ম আৰু আধা-বৃত্ত নিয়ম ব্যৱহাৰ কৰক। সপ্তমতে, বিন্যাসটো মনত ৰখাৰ পৰিৱৰ্তে কাগজত লিখক।",

      "এই বিষয়ৰ ফান্দবোৰ অনুমানযোগ্য। আটাইতকৈ সাধাৰণটো হ'ল বাওঁ-সোঁ ওলোটা কৰা, যি শাৰীয়ে দক্ষিণলৈ বা বৃত্তই বাহিৰলৈ মুখ কৰিলে হয়। দ্বিতীয়টো হ'ল বৃত্তত বিপৰীত আসন আধা আসন দূৰত, পোনপটীয়াকৈ দৃশ্যমান আসন নহয় বুলি পাহৰা। তৃতীয়টো হ'ল মাজত সংকেতক লগত-লগত সংকেত যেন ধৰা, অৰ্থাৎ দুজন মাজত থকাক কাষে কাষে বহা বুলি পঢ়া। চতুৰ্থটো হ'ল গণনাৰ প্ৰশ্নত দুজনে একেলগে বহিব লাগিলে অভ্যন্তৰীণ দুইৰ গুণক পাহৰা। পঞ্চমটো হ'ল মহলাৰ প্ৰশ্নত ওপৰ আৰু তল মিহলোৱা। সংকেত ৰখাৰ আগতে দিশটো আৰু এবাৰ পঢ়িলে, আৰু প্ৰতিটো সংকেত আংশিক বিন্যাসৰ বিপৰীতে পৰীক্ষা কৰিলে, পাঁচোটা আঁতৰি যায়।",

      "বহা-বিন্যাস কেইটামান আন যুক্তিতৰ্ক বিষয়ৰ সৈতে ওচৰ সম্পৰ্কত আছে। ক্ৰম আৰু স্থান নিৰ্ণয় বিষয়ই পংক্তিত অৱস্থানৰ একেই ধাৰণা ব্যৱহাৰ কৰে, ধাঁধা বিষয়ত প্ৰায়ে এটা ডাঙৰ ধাঁধাৰ ভিতৰত এটা সৰু বিন্যাস থাকে, আৰু ৰক্ত-সম্পৰ্ক বিষয়ই কেতিয়াবা এটা পৰিয়ালক টেবুলৰ চাৰিওফালে ৰাখে। দিশ বিষয়ই বিন্যাস নিৰ্ণয় কৰা একেই বাওঁ-সোঁ নিয়ম ব্যৱহাৰ কৰে, গতিকে দিশত দুৰ্বল পৰীক্ষাৰ্থীয়ে একেই কাৰণত ইয়াতো দুৰ্বল। গতিকে দিশত অলপ অভ্যাসে ইয়াত দুগুণ লাভ দিয়ে।",

      "এই বিষয়ৰ বাবে টোকাবহীত এখন পৃষ্ঠা ৰখা ভাল। ওপৰত মুখৰ নিয়মবোৰ লিখক, উত্তৰমুখী শাৰীত বাওঁ পঢ়ুৱৈৰ বাওঁ, কেন্দ্ৰমুখী বৃত্তত বাওঁ ঘড়ীৰ দিশ, আৰু শাৰীয়ে দক্ষিণলৈ বা বৃত্তই বাহিৰলৈ মুখ কৰিলে দুয়ো ওলোটা। তাৰ তলত গণনাৰ সূত্ৰ লিখক, শাৰীৰ বাবে n ফেক্টৰিয়েল আৰু বৃত্তৰ বাবে n বিয়োগ এক ফেক্টৰিয়েল, আৰু একক-হিচাপে-ধৰা নিয়ম। তাৰ পিছত দুখন মুখামুখি শাৰীৰ বাবে দাপোন নিয়ম আৰু বিপৰীত আসনৰ বাবে আধা-বৃত্ত নিয়ম লিখক। সেই এটা পৃষ্ঠাই RRB NTPC পত্ৰই এই বিষয়ৰ পৰা দিব পৰা প্ৰায় প্ৰতিটো প্ৰশ্ন সামৰি লয়।",

      "শেষত, ইয়াত গতিৰ পৰা ধৈৰ্য বেছি গুৰুত্বপূৰ্ণ। যুক্তিতৰ্ক অংশৰ এইটো আটাইতকৈ লেহেম বিষয়, আৰু খৰধৰ কৰা পৰীক্ষাৰ্থীয়ে এনে এটা বিন্যাস বনায় যি প্ৰথম দুটা সংকেত সিদ্ধ কৰে আৰু তৃতীয়টো ভাঙে। যুক্তিতৰ্ক অংশই উদাৰ সময় দিয়ে, গতিকে বুদ্ধিমান পন্থা হ'ল অতিৰিক্ত মিনিটটো খৰচ কৰি বিন্যাসটো সম্পূৰ্ণ গঢ়ি, উত্তৰ দিয়াৰ আগতে প্ৰতিটো সংকেত ইয়াৰ বিপৰীতে সত্যাপন কৰা। সাৱধানে গঢ়াৰ পিছত ভুল নকৰাকৈ উত্তৰ দিয়া এটা বিন্যাস প্ৰশ্নই অনুমানেৰে দিয়া তিনিৰ পৰা বেছি মূল্যৱান, আৰু এই বিষয়টো এনে এটা য'ত সাৱধান পৰীক্ষাৰ্থীয়ে প্ৰায় সদায় জিকে।",
    ],
  },
  list: {
    en: [
      "Fix the shape and the facing direction first; it decides the rule for left and right.",
      "North-facing row: left is the reader's left. South-facing row: the two are reversed.",
      "Circle facing centre: left is clockwise. Circle facing outward: reversed.",
      "Start from the absolute clue, then place the relative and between clues one at a time.",
      "In a circle, opposite is half the seats away, not the visible seat.",
      "Counting: n! for a row, (n − 1)! for a circle; treat a together-pair as one unit (×2).",
      "Two facing rows: the same position from the same end faces each other.",
      "Square table with eight people is a circle of eight; diagonal is four seats away.",
    ],
    as: [
      "প্ৰথমে আকৃতি আৰু মুখ কৰা দিশ স্থিৰ কৰক; ই বাওঁ-সোঁৰ নিয়ম নিৰ্ধাৰণ কৰে।",
      "উত্তৰমুখী শাৰী: বাওঁ পঢ়ুৱৈৰ বাওঁ। দক্ষিণমুখী শাৰী: দুয়ো ওলোটা।",
      "কেন্দ্ৰমুখী বৃত্ত: বাওঁ ঘড়ীৰ দিশ। বাহিৰমুখী বৃত্ত: ওলোটা।",
      "নিৰপেক্ষ সংকেতৰ পৰা আৰম্ভ কৰি আপেক্ষিক আৰু মাজত সংকেত এটা এটাকৈ ৰাখক।",
      "বৃত্তত বিপৰীত আধা আসন দূৰত, দৃশ্যমান আসন নহয়।",
      "গণনা: শাৰীত n!, বৃত্তত (n − 1)!; একেলগে-যোৰক এটা একক ধৰক (×২)।",
      "দুখন মুখামুখি শাৰী: একেই মূৰৰ পৰা একেই অৱস্থানে সন্মুখীন।",
      "আঠজনৰ বৰ্গ টেবুল আঠজনৰ বৃত্ত; কৰ্ণ চাৰি আসন দূৰত।",
    ],
  },
  faqs: [
    {
      q: { en: "Why do I keep getting the left and right wrong?", as: "মই বাওঁ আৰু সোঁ কিয় বাৰে বাৰে ভুল কৰোঁ?" },
      a: {
        en: "Because the rule depends on the facing direction. In a north-facing row left is the reader's left, but in a south-facing row it is reversed, and in a circle the rule follows clockwise or anticlockwise. Fix the direction at the start and write it down.",
        as: "কাৰণ নিয়মটো মুখ কৰা দিশৰ ওপৰত নিৰ্ভৰ কৰে। উত্তৰমুখী শাৰীত বাওঁ পঢ়ুৱৈৰ বাওঁ, কিন্তু দক্ষিণমুখী শাৰীত ওলোটা, আৰু বৃত্তত নিয়ম ঘড়ীৰ দিশ বা বিপৰীত দিশ অনুসৰি। আৰম্ভণিতে দিশ স্থিৰ কৰি লিখি লওক।",
      },
    },
    {
      q: { en: "How do I find the opposite seat in a circle?", as: "বৃত্তত বিপৰীত আসন কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Count half the number of seats. In a circle of eight, opposite is four seats away; in a circle of six, three seats away. The seat directly across the visible gap is not always the opposite seat, which is a common trap.",
        as: "আসন সংখ্যাৰ আধা গণনা কৰক। আঠজনৰ বৃত্তত বিপৰীত চাৰি আসন দূৰত; ছয়জনৰ বৃত্তত তিনি আসন দূৰত। দৃশ্যমান ফাঁকৰ সিটো ফালৰ আসন সদায় বিপৰীত আসন নহয়, যি এটা সাধাৰণ ফান্দ।",
      },
    },
    {
      q: { en: "What is the treat-as-one-unit trick?", as: "একক-হিচাপে-ধৰা কৌশল কি?" },
      a: {
        en: "When two people must sit together, count them as a single unit, which lowers the number of units by one, and then multiply by two for the two orders of the pair. For a circle of five with a fixed pair, this gives (4 − 1)! × 2 = 12.",
        as: "দুজনে একেলগে বহিব লাগিলে তেওঁলোকক এটা একক হিচাপে গণনা কৰক, যিয়ে এককৰ সংখ্যা এক কমায়, আৰু তাৰ পিছত যোৰটোৰ দুটা ক্ৰমৰ বাবে দুইৰে গুণ কৰক। স্থিৰ যোৰ থকা পাঁচজনৰ বৃত্তত এইয়ে (৪ − ১)! × ২ = ১২ দিয়ে।",
      },
    },
    {
      q: { en: "How are two facing rows handled?", as: "দুখন মুখামুখি শাৰী কেনেকৈ ধৰা হয়?" },
      a: {
        en: "By the mirror rule: the first person from the left of one row faces the first from the left of the other, the second faces the second, and so on. So who faces a named person is found by counting the same position from the same end in the other row.",
        as: "দাপোন নিয়মেৰে: এখনেৰ বাওঁৰ পৰা প্ৰথমজনে আনখনৰ বাওঁৰ পৰা প্ৰথমজনৰ সন্মুখীন, দ্বিতীয়জনে দ্বিতীয়জনৰ, আদি। গতিকে এজন নাম থকা ব্যক্তিৰ সন্মুখত কোন, আনখন শাৰীত একেই মূৰৰ পৰা একেই অৱস্থান গণনা কৰি পোৱা যায়।",
      },
    },
    {
      q: { en: "Is a square table a new shape to learn?", as: "বৰ্গ টেবুল নতুনকৈ শিকিবলগীয়া আকৃতি নে?" },
      a: {
        en: "No. A square table with eight people, four a side and all facing the centre, is just a circle of eight. A square with four people, one a side, is a circle of four. Recognising this means you reuse the circle rules instead of inventing new ones.",
        as: "নহয়। আঠজনৰ এটা বৰ্গ টেবুল, প্ৰতিটো কাষত চাৰিজন আৰু আটায়ে কেন্দ্ৰলৈ মুখ কৰি, আচলতে আঠজনৰ এটা বৃত্ত। চাৰিজনৰ বৰ্গ, প্ৰতিটো কাষত এজন, চাৰিজনৰ বৃত্ত। এইটো চিনি পোৱাৰ অৰ্থ নতুন নিয়ম উদ্ভাৱন নকৰি বৃত্তৰ নিয়ম পুনৰ ব্যৱহাৰ কৰা।",
      },
    },
  ],
};
