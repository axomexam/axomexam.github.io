"use strict";

/* RRB NTPC Reasoning — Number Series (Missing & Wrong Number).
   Rendered by tools/rrb-ntpc.ga-extra.js into the page's
   axo-extra-content block (English panel + Assamese panel). */

module.exports = {
  h2: {
    en: "Number Series for the RRB NTPC CBT",
    as: "RRB NTPC CBT ৰ বাবে সংখ্যা শৃংখলা",
  },
  p: {
    en: [
      "Number series is a fixture of the Reasoning paper of the RRB NTPC examination, and it is one of the few topics where a candidate can be almost certain of the marks. The paper usually carries two to four series questions in CBT-1, and the same idea returns in CBT-2 and in the computer-based practice tests. Every question shows a row of numbers built on a hidden rule, and asks either for the number that comes next, for the number missing from the middle, or for the one number that does not belong to the rule. Nothing needs a diagram, a table or a long chain of deduction; the whole task is to find the rule and apply it once.",

      "The first thing to understand is that a number series is arithmetic written in a row. The examiner takes a rule, applies it again and again, and then hides one of the results. The candidate has to recover the rule from the visible numbers. The good news is that the set of rules is small and repeats across papers. Once a candidate has named each rule and practised it a few times, a series question becomes a matter of recognition rather than calculation, and recognition takes seconds.",

      "The commonest rule of all is a constant difference. In 5, 9, 13, 17 the same number, four, is added each time, so the next term is twenty-one. The same rule may subtract a constant, as in 40, 34, 28, 22, where six is taken away at each step. Whenever the gaps between neighbouring terms are equal, the series is arithmetic and the next term is simply the last term plus or minus that gap. This is the first check to make on any series, because it is the fastest and it settles a large share of the questions.",

      "When the gaps are not equal but grow or shrink by a fixed amount, the series is of the second order. In 2, 7, 15, 26 the gaps are five, eight and eleven, rising by three each time, so the next gap is fourteen and the answer is forty. In 1, 4, 10, 19 the gaps are three, six and nine, so the next gap is twelve. The method is to write the differences in a row below the series and look at those differences as a series in their own right. If they form an arithmetic pattern, the original series is solved.",

      "The next family is the multiplicative series, where each term is a fixed multiple of the one before. In 3, 6, 12, 24 each term doubles, so the answer is forty-eight. In 2, 6, 18, 54 each term is three times the previous one, and in 96, 48, 24, 12 each term is halved. These are recognised at a glance once the candidate notices that the numbers grow or fall very quickly. A series that jumps from single digits to hundreds in a few steps is almost always multiplicative.",

      "A very large family of series is built from squares and cubes. The plain squares 1, 4, 9, 16 give twenty-five next, and the plain cubes 1, 8, 27, 64 give one hundred twenty-five. The exam often shifts these by a constant: 2, 5, 10, 17 is the squares plus one, 0, 3, 8, 15 is the squares minus one, 2, 9, 28, 65 is the cubes plus one, and 6, 12, 20, 30 is the product of consecutive integers. When the numbers climb steeply but not as fast as a pure power series, squares and cubes with a small addition or subtraction are the first thing to try.",

      "A few special sequences appear again and again and are worth memorising outright. The prime numbers 2, 3, 5, 7, 11 are a series in themselves, and so are the consecutive primes after a starting point. The Fibonacci series 1, 1, 2, 3, 5, 8 is built by adding the two previous terms, and the factorial series 1, 2, 6, 24, 120 is built by multiplying by the next integer each time. The series of natural numbers, odd numbers, even numbers and their squares and cubes are also common. These recur so often that recognising them on sight saves a great deal of time.",

      "The alternating or interleaved series is a favourite of examiners because it looks harder than it is. In 1, 10, 2, 20, 3 the odd places count 1, 2, 3 while the even places are their tenfold, so the answer is thirty. In 2, 5, 4, 7, 6 the odd places step by two and the even places step by two as well, giving nine next. The trick is to split the row into two rows, one for the odd positions and one for the even positions, and to read each row on its own. A series that seems to jump about often hides two simple series woven together.",

      "The wrong-number series works in the opposite direction. Here the whole row should follow one rule, but a single term has been changed to break it, and the candidate must find that term. In 3, 6, 12, 24, 50, 96 every term should double, so the term after twenty-four must be forty-eight and the intruder is fifty. The method is to assume the most natural rule, apply it term by term, and find the first place where the given number does not match. The term at that point is the answer.",

      "A series may also combine two operations in a fixed pattern. The rule double and add one turns 1 into 3, then 7, then 15, and the next term is thirty-one. The rule multiply by three and subtract one, or double and subtract two, appears frequently. When a series neither adds a constant nor multiplies by one, the candidate should test a two-step rule of this kind: state it as a single sentence, such as double then add one, and check it against three consecutive terms before trusting it.",

      "The method for any series question can be reduced to a short checklist. First write the differences between neighbouring terms and see whether they are constant or form a pattern of their own. Second, if the differences do not help, divide neighbouring terms and look for a constant ratio. Third, if neither works, test squares, cubes, primes, Fibonacci and factorials. Fourth, look for an alternating pattern by splitting the row into odd and even positions. Fifth, for a wrong-number question, apply the most natural rule and find the first mismatch. Working through this checklist in order, on paper, is far quicker than staring at the row and guessing.",

      "The traps in number series are predictable. The commonest is a rule that fits the first two or three terms but breaks later, which is why the rule must always be checked against every visible term before the answer is marked. The second is a near-miss arithmetic slip, such as computing the next gap correctly but adding it to the wrong term. The third is a series that is actually alternating but is read as a single run. The fourth is an option that continues the visible part of the series but ignores the part that was hidden. Reading the whole row twice, and writing the differences underneath, removes most of these errors.",

      "Number series is also the gateway to several other reasoning topics. Alphabet series applies the same step-by-step thinking to letters, coding and decoding applies a fixed transformation to words, and analogy asks the candidate to name the relation between two numbers. A candidate who becomes fluent with number series finds that alphabet series and alphanumeric series, which mix letters and digits, come almost for free. It is worth keeping a page in a notebook for the rules met in practice, because the same dozen rules, written on a single page, cover nearly every series the RRB NTPC paper is likely to set.",

      "Finally, accuracy matters more than speed in this topic, because a series answered in a hurry is easily answered wrongly. The paper gives generous time in the reasoning section, so the candidate can afford to write the differences and check the rule on every term. A topic that can be cleared carefully in thirty seconds each, with almost no risk of error, is exactly the kind of topic that should be banked first, leaving time and attention for the puzzles and arrangements that genuinely need them.",
    ],
    as: [
      "সংখ্যা শৃংখলা RRB NTPC পৰীক্ষাৰ যুক্তিতৰ্ক পত্ৰৰ এটা স্থায়ী বিষয়, আৰু ই এনে কেইটামান বিষয়ৰ এটা য'ত পৰীক্ষাৰ্থীয়ে নম্বৰৰ বিষয়ে প্ৰায় নিশ্চিত হ'ব পাৰে। সাধাৰণতে CBT-1 ত দুইৰ পৰা চাৰিটা শৃংখলা প্ৰশ্ন থাকে, আৰু একেই ধাৰণা CBT-2 আৰু কম্পিউটাৰভিত্তিক অভ্যাস পৰীক্ষাত ঘূৰি আহে। প্ৰতিটো প্ৰশ্নই এটা লুকাই থকা নিয়মত গঢ়া সংখ্যাৰ শাৰী দেখুৱায়, আৰু পৰৱৰ্তী সংখ্যা, মাজৰ পৰা নোহোৱা সংখ্যা, বা নিয়মত নপৰা এটা সংখ্যা সোধে। ইয়াত কোনো চিত্ৰ, তালিকা বা দীঘল যুক্তিৰ শৃংখলাৰ প্ৰয়োজন নাই; গোটেই কামটো নিয়মটো বিচাৰি এবাৰ প্ৰয়োগ কৰা।",

      "প্ৰথমে বুজিবলগীয়া কথাটো হ'ল যে সংখ্যা শৃংখলা হ'ল শাৰীত লিখা গণিত। পৰীক্ষকে এটা নিয়ম লয়, বাৰে বাৰে প্ৰয়োগ কৰে, আৰু তাৰ এটা ফল লুকুৱায়। পৰীক্ষাৰ্থীয়ে দৃশ্যমান সংখ্যাবোৰৰ পৰা নিয়মটো উলিয়াব লাগে। ভাল খবৰটো হ'ল যে নিয়মবোৰৰ সংখ্যা কম আৰু পত্ৰে পত্ৰে পুনৰাবৃত্তি হয়। পৰীক্ষাৰ্থীয়ে প্ৰতিটো নিয়মৰ নাম দি কেইবাবাৰো অভ্যাস কৰিলে, শৃংখলা প্ৰশ্ন এটা হিচাপ কৰাৰ পৰা নহয়, চিনি পোৱাৰ বিষয় হৈ পৰে, আৰু চিনি পোৱাত কেইছেকেণ্ড লাগে।",

      "আটাইতকৈ সাধাৰণ নিয়মটো হ'ল স্থিৰ পাৰ্থক্য। 5, 9, 13, 17 ত প্ৰতিবাৰ একেই সংখ্যা, চাৰি, যোগ হয়, গতিকে পৰৱৰ্তী পদ একৈশ। একেই নিয়মে স্থিৰ এটা সংখ্যা বাদো দিব পাৰে, যেনেকৈ 40, 34, 28, 22 ত প্ৰতিটো খোজত ছয় বাদ পৰে। যেতিয়া ওচৰা-ওচৰি পদবোৰৰ মাজৰ ব্যৱধান সমান হয়, শৃংখলাটো সমান্তৰ আৰু পৰৱৰ্তী পদটো মাত্ৰ শেষ পদৰ লগত সেই ব্যৱধান যোগ বা বাদ কৰি পোৱা যায়। যিকোনো শৃংখলাত এইটোৱেই প্ৰথম পৰীক্ষা, কাৰণ ই আটাইতকৈ দ্ৰুত আৰু বহু প্ৰশ্ন ইয়ে সমাধান কৰে।",

      "যেতিয়া ব্যৱধানবোৰ সমান নহয় কিন্তু এটা নিৰ্দিষ্ট পৰিমাণে বাঢ়ে বা কমে, তেতিয়া শৃংখলাটো দ্বিতীয় ক্ৰমৰ। 2, 7, 15, 26 ত ব্যৱধান পাঁচ, আঠ আৰু এঘাৰ, প্ৰতিবাৰ তিনিৰে বাঢ়ে, গতিকে পৰৱৰ্তী ব্যৱধান চৈধ্য আৰু উত্তৰ চল্লিশ। 1, 4, 10, 19 ত ব্যৱধান তিনি, ছয় আৰু ন, গতিকে পৰৱৰ্তী ব্যৱধান বাৰ। পদ্ধতিটো হ'ল শৃংখলাৰ তলত পাৰ্থক্যবোৰ এটা শাৰীত লিখি সেই পাৰ্থক্যবোৰক নিজাকৈ এটা শৃংখলা হিচাপে চোৱা। যদি সেইবোৰ এটা সমান্ত আৰ্হি গঢ়ে, মূল শৃংখলাটো সমাধান হৈ গ'ল।",

      "পৰৱৰ্তী পৰিয়ালটো হ'ল গুণনমূলক শৃংখলা, য'ত প্ৰতিটো পদ তাৰ আগৰটোৰ এটা নিৰ্দিষ্ট গুণিতক। 3, 6, 12, 24 ত প্ৰতিটো পদ দুগুণ হয়, গতিকে উত্তৰ আঠচল্লিশ। 2, 6, 18, 54 ত প্ৰতিটো পদ আগৰটোৰ তিনি গুণ, আৰু 96, 48, 24, 12 ত প্ৰতিটো পদ আধা। সংখ্যাবোৰ বৰ সোনকালে বাঢ়ে বা কমে বুলি চকুত পৰিলেই এইবোৰ চিনি পোৱা যায়। কেইটামান খোজতে এক অংকৰ পৰা শতলৈ জাঁপ দিয়া শৃংখলা প্ৰায় সদায় গুণনমূলক।",

      "এটা বৰ ডাঙৰ পৰিয়াল বৰ্গ আৰু ঘনৰ পৰা গঢ় লয়। সাধাৰণ বৰ্গ 1, 4, 9, 16 ৰ পিছত পঁচিশ, আৰু সাধাৰণ ঘন 1, 8, 27, 64 ৰ পিছত এশ পঁচিশ। পৰীক্ষাই প্ৰায়ে এইবোৰ এটা ধ্ৰুৱকেৰে সৰকায়: 2, 5, 10, 17 হ'ল বৰ্গ যোগ এক, 0, 3, 8, 15 হ'ল বৰ্গ বিয়োগ এক, 2, 9, 28, 65 হ'ল ঘন যোগ এক, আৰু 6, 12, 20, 30 হ'ল ক্ৰমিক অখণ্ড সংখ্যাৰ গুণফল। যেতিয়া সংখ্যাবোৰ খৰতকীয়াভাৱে কিন্তু বিশুদ্ধ ঘাত শৃংখলাৰ দৰে সোনকালে নাবাঢ়ে, তেতিয়া সৰু যোগ বা বিয়োগেৰে বৰ্গ আৰু ঘন প্ৰথমে পৰীক্ষা কৰা উচিত।",

      "কেইটামান বিশেষ শৃংখলা বাৰে বাৰে আহে আৰু লগে লগে মনত ৰখা উচিত। মৌলিক সংখ্যা 2, 3, 5, 7, 11 নিজেই এটা শৃংখলা, আৰু এটা আৰম্ভণিৰ পিছৰ ক্ৰমিক মৌলিক সংখ্যাও। ফিবোনাচি শৃংখলা 1, 1, 2, 3, 5, 8 আগৰ দুটা পদ যোগ কৰি গঢ় লয়, আৰু ক্ৰমগুণিতক শৃংখলা 1, 2, 6, 24, 120 প্ৰতিবাৰ পৰৱৰ্তী অখণ্ড সংখ্যাৰে পূৰণ কৰি গঢ় লয়। স্বাভাৱিক সংখ্যা, অযুগ্ম সংখ্যা, যুগ্ম সংখ্যা আৰু তেওঁলোকৰ বৰ্গ আৰু ঘনৰ শৃংখলাও সাধাৰণ। এইবোৰ ইমান বাৰে আহে যে দৃষ্টিতে চিনি পালে বহু সময় সাঁচে।",

      "পাল-পালকৈ অহা বা মিহলি শৃংখলা পৰীক্ষকৰ প্ৰিয়, কাৰণ ই দেখাত যিমান কঠিন সিমান নহয়। 1, 10, 2, 20, 3 ত অযুগ্ম স্থানবোৰ 1, 2, 3 আৰু যুগ্ম স্থানবোৰ তেওঁলোকৰ দহগুণ, গতিকে উত্তৰ ত্ৰিশ। 2, 5, 4, 7, 6 ত অযুগ্ম স্থানবোৰ দুয়েৰে আৰু যুগ্ম স্থানবোৰো দুয়েৰে আগবাঢ়ে, পৰৱৰ্তী ন। কৌশলটো হ'ল শাৰীটো দুটা শাৰীত ভাগ কৰা, এটা অযুগ্ম স্থানৰ বাবে আৰু এটা যুগ্ম স্থানৰ বাবে, আৰু প্ৰতিটো শাৰী নিজাকৈ পঢ়া। ইফালে-সিফালে জঁপিয়াই থকা যেন লগা শৃংখলাই প্ৰায়ে দুটা সৰল শৃংখলা বোৱা হৈ লুকুৱাই ৰাখে।",

      "ভুল-সংখ্যাৰ শৃংখলাই বিপৰীত দিশত কাম কৰে। ইয়াত গোটেই শাৰীয়ে এটা নিয়ম অনুসৰণ কৰাৰ কথা, কিন্তু এটা পদ সলনি কৰি নিয়মটো ভঙা হৈছে, আৰু পৰীক্ষাৰ্থীয়ে সেই পদটো বিচাৰিব লাগে। 3, 6, 12, 24, 50, 96 ত প্ৰতিটো পদ দুগুণ হোৱাৰ কথা, গতিকে চৌবিশৰ পিছৰ পদ আঠচল্লিশ হ'ব লাগে আৰু অনুপ্ৰৱেশকাৰীটো পঞ্চাশ। পদ্ধতিটো হ'ল আটাইতকৈ স্বাভাৱিক নিয়মটো ধৰি লৈ পদে পদে প্ৰয়োগ কৰা, আৰু দিয়া সংখ্যাটোৱে নমিলা প্ৰথম ঠাইখিনি বিচৰা। সেই ঠাইৰ পদটোৱেই উত্তৰ।",

      "এটা শৃংখলাই এটা নিৰ্দিষ্ট আৰ্হিত দুটা ক্ৰিয়া একত্ৰিতও কৰিব পাৰে। দুগুণ কৰি এক যোগ কৰাৰ নিয়মে 1 ক 3, তাৰ পিছত 7, তাৰ পিছত 15 কৰে, আৰু পৰৱৰ্তী পদ একত্ৰিশ। তিনিৰে পূৰণ কৰি এক বাদ দিয়া, বা দুগুণ কৰি দুই বাদ দিয়া নিয়মো বাৰে বাৰে আহে। যেতিয়া এটা শৃংখলাই ধ্ৰুৱক যোগ নকৰে আৰু এটাৰে পূৰণো নকৰে, তেতিয়া এনে দুই-খোজৰ নিয়ম পৰীক্ষা কৰা উচিত: ইয়াক দুগুণ কৰি তাৰ পিছত এক যোগ কৰা বুলি এটা বাক্যত কৈ, বিশ্বাস কৰাৰ আগতে ক্ৰমিক তিনিটা পদত পৰীক্ষা কৰক।",

      "যিকোনো শৃংখলা প্ৰশ্নৰ পদ্ধতিটো এটা চুটি তালিকালৈ ৰূপান্তৰ কৰিব পাৰি। প্ৰথমে ওচৰা-ওচৰি পদবোৰৰ মাজৰ পাৰ্থক্য লিখি চাওক সেইবোৰ স্থিৰ নে নিজাকৈ এটা আৰ্হি গঢ়ে। দ্বিতীয়তে, পাৰ্থক্যই সহায় নকৰিলে ওচৰা-ওচৰি পদবোৰ হৰণ কৰি এটা স্থিৰ অনুপাত বিচাৰক। তৃতীয়তে, দুয়োটাৱে কাম নকৰিলে বৰ্গ, ঘন, মৌলিক, ফিবোনাচি আৰু ক্ৰমগুণিতক পৰীক্ষা কৰক। চতুৰ্থতে, শাৰীটো অযুগ্ম আৰু যুগ্ম স্থানত ভাগ কৰি পাল-পালৰ আৰ্হি বিচাৰক। পঞ্চমতে, ভুল-সংখ্যা প্ৰশ্নৰ বাবে আটাইতকৈ স্বাভাৱিক নিয়ম প্ৰয়োগ কৰি প্ৰথম অমিল বিচাৰক। কাগজত এই তালিকা ক্ৰমে কৰাটো শাৰীটো চাই অনুমান কৰাতকৈ বহু দ্ৰুত।",

      "সংখ্যা শৃংখলাৰ ফান্দবোৰ আগতীয়াকৈ অনুমানযোগ্য। আটাইতকৈ সাধাৰণটো হ'ল এনে নিয়ম যি প্ৰথম দুই-তিনিটা পদত খাপ খায় কিন্তু পিছত ভাঙে, সেয়ে উত্তৰ বাছনি কৰাৰ আগতে নিয়মটো সদায় প্ৰতিটো দৃশ্যমান পদত পৰীক্ষা কৰিব লাগে। দ্বিতীয়টো হ'ল প্ৰায়-মিলা এটা গণিতৰ ভুল, যেনে পৰৱৰ্তী ব্যৱধান শুদ্ধভাৱে হিচাপ কৰি ভুল পদত যোগ কৰা। তৃতীয়টো হ'ল এটা শৃংখলা যি আচলতে পাল-পালকৈ আহে কিন্তু এটা শাৰী হিচাপে পঢ়া হয়। চতুৰ্থটো হ'ল এনে এটা বিকল্প যি শৃংখলাৰ দৃশ্যমান অংশ আগবঢ়ায় কিন্তু লুকুৱা অংশ অৱহেলা কৰে। গোটেই শাৰীটো দুবাৰ পঢ়িলে, আৰু তলত পাৰ্থক্যবোৰ লিখিলে, এই ভুলবোৰৰ বেছিভাগ আঁতৰি যায়।",

      "সংখ্যা শৃংখলা আন কেইবাটাও যুক্তিতৰ্ক বিষয়ৰ দুৱাৰো। আখৰ শৃংখলাই একেই খোজে-খোজে ভবা ধাৰণা আখৰত প্ৰয়োগ কৰে, সংকেতীকৰণ-অৱসংকেতীকৰণে শব্দত এটা নিৰ্দিষ্ট ৰূপান্তৰ প্ৰয়োগ কৰে, আৰু সাদৃশ্যই দুটা সংখ্যাৰ মাজৰ সম্পৰ্কৰ নাম দিবলৈ কয়। সংখ্যা শৃংখলাত সাৱলীল হোৱা পৰীক্ষাৰ্থীয়ে দেখে যে আখৰ শৃংখলা আৰু আখৰ-সংখ্যা মিহলি শৃংখলা, যি আখৰ আৰু অংক মিলায়, প্ৰায় বিনামূলীয়াকৈ আহে। অভ্যাসত লগা নিয়মবোৰৰ বাবে টোকাবহীত এখন পৃষ্ঠা ৰখা ভাল, কাৰণ এখন পৃষ্ঠাত লিখা সেই একেখিনি নিয়মেই RRB NTPC পত্ৰই দিব পৰা প্ৰায় প্ৰতিটো শৃংখলা সামৰি লয়।",

      "শেষত, এই বিষয়ত শুদ্ধতা গতিৰ পৰা বেছি গুৰুত্বপূৰ্ণ, কাৰণ খৰধৰকৈ দিয়া শৃংখলা এটা সহজে ভুল হৈ পৰে। পত্ৰই যুক্তিতৰ্ক অংশত উদাৰ সময় দিয়ে, গতিকে পৰীক্ষাৰ্থীয়ে পাৰ্থক্যবোৰ লিখি প্ৰতিটো পদত নিয়ম পৰীক্ষা কৰিবলৈ সময় উলিয়াব পাৰে। এটা বিষয় যি প্ৰতিটোত ত্ৰিশ ছেকেণ্ডত সাৱধানে, প্ৰায় ভুলৰ আশংকা নোহোৱাকৈ সমাধান হয়, তাকেই প্ৰথমে সাঁচি থোৱা উচিত, যাতে ধাঁধা আৰু বিন্যাসৰ বাবে সময় আৰু মন ৰাখি থ'ব পাৰি যিবোৰক আচলতে প্ৰয়োজন।",
    ],
  },
  list: {
    en: [
      "Constant difference: 5, 9, 13, 17 → add 4 each time.",
      "Growing difference: 2, 7, 15, 26 → gaps 5, 8, 11, 14.",
      "Multiplicative: 3, 6, 12, 24 → double each term.",
      "Squares and cubes: 1, 4, 9, 16 and 1, 8, 27, 64.",
      "Squares or cubes shifted: 2, 5, 10, 17 is squares plus one.",
      "Special sequences: primes 2, 3, 5, 7; Fibonacci 1, 1, 2, 3, 5; factorials 1, 2, 6, 24.",
      "Alternating: 1, 10, 2, 20, 3 → odd and even places run separately.",
      "Two-step rule: 1, 3, 7, 15 → double and add one.",
      "Wrong number: apply the rule term by term and find the first mismatch.",
    ],
    as: [
      "স্থিৰ পাৰ্থক্য: 5, 9, 13, 17 → প্ৰতিবাৰ 4 যোগ।",
      "বাঢ়ি যোৱা পাৰ্থক্য: 2, 7, 15, 26 → ব্যৱধান 5, 8, 11, 14।",
      "গুণনমূলক: 3, 6, 12, 24 → প্ৰতিটো পদ দুগুণ।",
      "বৰ্গ আৰু ঘন: 1, 4, 9, 16 আৰু 1, 8, 27, 64।",
      "সৰকোৱা বৰ্গ বা ঘন: 2, 5, 10, 17 হ'ল বৰ্গ যোগ এক।",
      "বিশেষ শৃংখলা: মৌলিক 2, 3, 5, 7; ফিবোনাচি 1, 1, 2, 3, 5; ক্ৰমগুণিতক 1, 2, 6, 24।",
      "পাল-পালকৈ: 1, 10, 2, 20, 3 → অযুগ্ম আৰু যুগ্ম স্থান নিজাকৈ চলে।",
      "দুই-খোজৰ নিয়ম: 1, 3, 7, 15 → দুগুণ কৰি এক যোগ।",
      "ভুল সংখ্যা: নিয়ম পদে পদে প্ৰয়োগ কৰি প্ৰথম অমিল বিচাৰক।",
    ],
  },
  faqs: [
    {
      q: { en: "What is the first thing to check in any number series?", as: "যিকোনো সংখ্যা শৃংখলাত প্ৰথমে কি পৰীক্ষা কৰিব?" },
      a: {
        en: "Write the differences between neighbouring terms. If they are constant, the series is arithmetic and the answer is immediate. If they are not, look at those differences as a series of their own; a constant second difference means the original series is of the second order.",
        as: "ওচৰা-ওচৰি পদবোৰৰ মাজৰ পাৰ্থক্য লিখক। সেইবোৰ স্থিৰ হ'লে শৃংখলাটো সমান্ত আৰু উত্তৰ লগে লগে পোৱা যায়। নহ'লে সেই পাৰ্থক্যবোৰক নিজাকৈ এটা শৃংখলা হিচাপে চাওক; দ্বিতীয় পাৰ্থক্য স্থিৰ হ'লে মূল শৃংখলাটো দ্বিতীয় ক্ৰমৰ।",
      },
    },
    {
      q: { en: "How do I spot a multiplicative series quickly?", as: "গুণনমূলক শৃংখলা কেনেকৈ সোনকালে চিনি পাম?" },
      a: {
        en: "By how fast the numbers grow. If a series moves from small single digits to hundreds within a few terms, it is almost certainly multiplicative. Divide each term by the one before and check for a constant ratio such as two, three or four.",
        as: "সংখ্যাবোৰ কিমান খৰতকীয়াভাৱে বাঢ়ে তাৰ পৰা। এটা শৃংখলাই কেইটামান পদতে সৰু এক অংকৰ পৰা শতলৈ গ'লে ই প্ৰায় নিশ্চিতভাৱে গুণনমূলক। প্ৰতিটো পদক আগৰটোৰে হৰণ কৰি দুই, তিনি বা চাৰিৰ দৰে স্থিৰ অনুপাত বিচাৰক।",
      },
    },
    {
      q: { en: "What should I memorise for series questions?", as: "শৃংখলা প্ৰশ্নৰ বাবে কি মনত ৰখা উচিত?" },
      a: {
        en: "The squares up to at least thirty, the cubes up to at least fifteen, the prime numbers up to one hundred, and the Fibonacci and factorial series. These recur constantly, and recognising them on sight removes most of the calculation.",
        as: "কমেও ত্ৰিশলৈকে বৰ্গ, কমেও পোন্ধৰলৈকে ঘন, এশলৈকে মৌলিক সংখ্যা, আৰু ফিবোনাচি আৰু ক্ৰমগুণিতক শৃংখলা। এইবোৰ অবিৰতভাৱে আহে, আৰু দৃষ্টিতে চিনি পালে বেছিভাগ হিচাপ আঁতৰি যায়।",
      },
    },
    {
      q: { en: "How do I solve a wrong-number series?", as: "ভুল-সংখ্যাৰ শৃংখলা কেনেকৈ সমাধান কৰিম?" },
      a: {
        en: "Assume the most natural rule, apply it term by term from the start, and find the first place where the given number does not match the rule. The term at that point is the wrong one; the correct value is what the rule would have produced.",
        as: "আটাইতকৈ স্বাভাৱিক নিয়মটো ধৰি লৈ আৰম্ভণিৰ পৰা পদে পদে প্ৰয়োগ কৰক, আৰু দিয়া সংখ্যাটোৱে নিয়মত নমিলা প্ৰথম ঠাইখিনি বিচাৰক। সেই ঠাইৰ পদটোৱেই ভুল; শুদ্ধ মানটো হ'ল নিয়মে দিবলগীয়া মান।",
      },
    },
    {
      q: { en: "Which other topics improve with number series practice?", as: "সংখ্যা শৃংখলাৰ অভ্যাসে আন কোনবোৰ বিষয় উন্নত কৰে?" },
      a: {
        en: "Alphabet series, alphanumeric series, coding and decoding, and analogy. All of them use the same skill of finding a step or relation and applying it consistently, so fluency in number series carries over directly.",
        as: "আখৰ শৃংখলা, আখৰ-সংখ্যা শৃংখলা, সংকেতীকৰণ-অৱসংকেতীকৰণ, আৰু সাদৃশ্য। এইবোৰৰ আটাইবোৰেই এটা খোজ বা সম্পৰ্ক বিচাৰি ধাৰাবাহিকভাৱে প্ৰয়োগ কৰাৰ একেই দক্ষতা ব্যৱহাৰ কৰে, গতিকে সংখ্যা শৃংখলাৰ সাৱলীলতা পোনপটীয়াকৈ কামত আহে।",
      },
    },
  ],
};
