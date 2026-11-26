"use strict";

/* RRB NTPC Mathematics — Pipes & Cisterns. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Pipes & Cisterns for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে নল আৰু চৌবাচ্চা" },
  p: {
    en: [
      "Pipes and cisterns is the chapter in which the arithmetic of time and work is dressed in the language of filling and emptying tanks, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter rests on a single idea: the rate at which a pipe fills or empties a tank, measured as the fraction of the tank it handles in one hour. A pipe that fills a tank in twelve hours fills one-twelfth of it in an hour, and that one-twelfth is its rate. Every question in the chapter is built by adding the rates of the inlet pipes and subtracting the rates of the outlet pipes, and a candidate who converts each time into a rate will answer the whole chapter without hesitation.",
      "The whole tank is conveniently taken as one unit of work. An inlet pipe that fills the tank in n hours has a rate of one over n, and an outlet pipe that empties it in m hours has a rate of minus one over m. When several pipes are opened together, the net rate is the sum of the inlet rates minus the sum of the outlet rates, and the time to fill the tank is the reciprocal of the net rate. If one pipe fills in ten hours and another in fifteen, the net rate is one-tenth plus one-fifteenth, which is one-sixth, so together they take six hours. Writing the rates as exact fractions and adding them is the core of the chapter.",
      "The reverse questions give the time taken together and one pipe's time and ask for the other's. The other pipe's rate is the together rate minus the known rate, and its time is the reciprocal of that rate. If together they take twelve hours and one alone takes twenty, the other's rate is one-twelfth minus one-twentieth, which is one-thirtieth, so the other pipe alone takes thirty hours. This single subtraction answers a large family of questions, and the only care needed is to keep the fractions exact and to decide whether the second pipe is an inlet or an outlet.",
      "The questions in which a pipe is closed before the tank is full are solved by writing the work done in each period. If two pipes are opened together for some hours and then one is closed, the work done is the together rate times the hours they were both open, plus the rate of the pipe that stays open times the hours it worked alone. Adding the two parts and equating to one gives the unknown, which is usually the total time or the time the remaining pipe worked alone. The same method, written as an equation in the total time, answers the questions in which a pipe is closed a stated number of hours before the tank is full.",
      "The questions with a leak or a waste pipe are the ones that catch careless candidates. A leak is simply an outlet pipe of unknown rate. If a pipe fills the tank in six hours but, with the leak, takes eight hours, the leak's rate is one-sixth minus one-eighth, which is one-twenty-fourth, so the leak alone empties the full tank in twenty-four hours. When the net rate of all the pipes together is negative, the tank never fills, and that is a valid and frequently asked answer. Recognising a leak as an outlet pipe of unknown rate removes all the difficulty from this family.",
      "The alternate opening questions, in which one pipe is opened first and another is opened after a stated time, are solved in two stages. The first stage finds the work done by the first pipe alone, and the second stage finds the time the remaining pipes take to finish the rest at their combined rate. If A fills in four hours and is opened alone for two hours, it fills half the tank, and the remaining half is filled by A and B together at three-quarters per hour, which takes two-thirds of an hour. Two stages, each a single multiplication or division, give the answer.",
      "The three-pipe questions with two inlets and one outlet are solved by one net rate. If two pipes fill in twelve and fifteen hours and a third empties in twenty, the net rate is one-twelfth plus one-fifteenth minus one-twentieth, which is six-sixtieths, or one-tenth, so the tank fills in ten hours. When the outlet is faster than the inlets together, the net rate is negative and the tank empties, and the time to empty is the reciprocal of the size of the net rate. The sign of the net rate tells the candidate at once whether the tank fills or empties.",
      "A large family gives the time to fill and the time to empty and asks whether the tank fills at all. The method is always to compute the net rate and look at its sign. If the inlet rate is larger, the tank fills in the reciprocal of the difference; if the outlet rate is larger, the tank empties in the reciprocal of the difference; and if the two are equal, the tank neither fills nor empties. This single comparison answers the whole family, and the equality case is a favourite of the examiners because it tests whether the candidate really understands the rate idea.",
      "The questions that ask for a fraction of the tank are a small extension. If a tank fills in twelve hours, then in three hours it is one-quarter full, and to be five-sixths full takes five-sixths of twelve, which is ten hours. The rate idea gives the fraction directly, because the fraction filled is the rate times the time. These questions are quick once the rate is written down, and they are a good check on whether the candidate has remembered that the rate is the fraction handled per hour.",
      "Finally, the chapter rewards two habits. The first is to write the whole tank as one and every pipe's rate as an exact fraction, so that the arithmetic is exact and the sign of each outlet is clear. The second is to draw a small table with the pipes as rows and the rate of each in a column, adding the inlets and subtracting the outlets before taking the reciprocal. With these habits the pipes and cisterns questions become among the quickest in the paper, and the same rate method carries directly into time and work and into work and wages, where the shares of the workers follow the same rates.",
    ],
    as: [
      "নল আৰু চৌবাচ্চা হৈছে সেই অধ্যায় য'ত সময় আৰু কাৰ্যৰ পাটিগণিতক টেংকী ভৰোৱা আৰু খালী কৰাৰ ভাষাত সজোৱা হয়, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টো এটা ধাৰণাৰ ওপৰত ৰয়: এটা নলে এটা টেংকী কিমান দ্ৰুত ভৰায় বা খালী কৰে, যাক এক ঘণ্টাত ই কৰা টেংকীৰ ভগ্নাংশ হিচাপে জোখা হয়। বাৰ ঘণ্টাত টেংকী ভৰোৱা নলে এঘণ্টাত ইয়াৰ এক-দ্বাদশাংশ ভৰায়, আৰু সেই এক-দ্বাদশাংশই তাৰ হাৰ। অধ্যায়টোৰ প্ৰতিটো প্ৰশ্ন ইনলেট নলৰ হাৰ যোগ কৰি আউটলেট নলৰ হাৰ বিয়োগ কৰি গঢ় লয়।",
      "গোটেই টেংকীক এক একক কাম হিচাপে ধৰা সুবিধাজনক। n ঘণ্টাত টেংকী ভৰোৱা ইনলেট নলৰ হাৰ ১/n, আৰু m ঘণ্টাত খালী কৰা আউটলেট নলৰ হাৰ −১/m। কেইবাটাও নল একেলগে খুলিলে প্ৰকৃত হাৰ = ইনলেট হাৰবোৰৰ যোগফল − আউটলেট হাৰবোৰৰ যোগফল, আৰু টেংকী ভৰোৱাৰ সময় প্ৰকৃত হাৰৰ ব্যস্ত। এটা নলে দহ ঘণ্টাত আৰু আনটোৱে পোন্ধৰ ঘণ্টাত ভৰালে প্ৰকৃত হাৰ ১/১০ + ১/১৫ = ১/৬, গতিকে একেলগে ছয় ঘণ্টা। হাৰবোৰ সঠিক ভগ্নাংশ হিচাপে লিখি যোগ কৰাটোৱেই অধ্যায়টোৰ মূল।",
      "উলটি প্ৰশ্নবোৰে একেলগে লোৱা সময় আৰু এটা নলৰ সময় দি আনটোৰ সময় সোধে। আনটো নলৰ হাৰ = একেলগৰ হাৰ − জনা হাৰ, আৰু তাৰ সময় সেই হাৰৰ ব্যস্ত। একেলগে বাৰ ঘণ্টা আৰু এটাই অকলে বিশ ঘণ্টা ল'লে, আনটোৰ হাৰ = ১/১২ − ১/২০ = ১/৩০, গতিকে আনটো নলে অকলে ত্ৰিশ ঘণ্টা লয়। এই এটা বিয়োগে এটা ডাঙৰ পৰিয়ালৰ উত্তৰ দিয়ে, আৰু দ্বিতীয় নলটো ইনলেট নে আউটলেট সেয়া ঠিক কৰাটো সাৱধানতা।",
      "টেংকী পূৰ্ণ হোৱাৰ আগতে এটা নল বন্ধ কৰা প্ৰশ্নবোৰ প্ৰতিটো সময়ছোৱাত কৰা কাম লিখি সমাধান কৰা হয়। দুটা নল কিছু ঘণ্টা একেলগে খুলি তাৰ পিছত এটা বন্ধ কৰিলে, কৰা কাম = একেলগৰ হাৰ × দুয়ো খোলা থকা ঘণ্টা + খোলা থকা নলৰ হাৰ × তেওঁ অকলে কৰা ঘণ্টা। দুটা অংশ যোগ কৰি এক ৰ সৈতে সমীকৰণ কৰিলে অজ্ঞাতটো ওলায়। একেই পদ্ধতি, মুঠ সময়ত এটা সমীকৰণ হিচাপে লিখিলে, টেংকী পূৰ্ণ হোৱাৰ কিছু ঘণ্টা আগতে নল বন্ধ কৰা প্ৰশ্নৰ উত্তৰ দিয়ে।",
      "চুৰু বা অপচয় নলৰ প্ৰশ্নবোৰে অসাৱধান প্ৰাৰ্থীক ধৰে। চুৰু হৈছে অজ্ঞাত হাৰৰ এটা আউটলেট নল। এটা নলে ছয় ঘণ্টাত টেংকী ভৰালে কিন্তু চুৰুৰ বাবে আঠ ঘণ্টা লাগিলে, চুৰুৰ হাৰ = ১/৬ − ১/৮ = ১/২৪, গতিকে চুৰুৱে অকলে পূৰ্ণ টেংকী ২৪ ঘণ্টাত খালী কৰে। সকলে নলৰ প্ৰকৃত হাৰ ঋণাত্মক হ'লে টেংকী কেতিয়াও নভৰে, আৰু সেয়া এটা বৈধ আৰু সচৰাচৰ সোধা উত্তৰ। চুৰুক অজ্ঞাত হাৰৰ আউটলেট নল হিচাপে চিনি পোৱাটোৱেই এই পৰিয়ালৰ কঠিনতা আঁতৰায়।",
      "পৰ্যায়ক্ৰমে খোলাৰ প্ৰশ্নবোৰ, য'ত এটা নল প্ৰথমে আৰু আনটো এটা দিয়া সময়ৰ পিছত খোলা হয়, দুটা পৰ্যায়ত সমাধান কৰা হয়। প্ৰথম পৰ্যায়ত প্ৰথম নলে অকলে কৰা কাম বিচৰা হয়, আৰু দ্বিতীয় পৰ্যায়ত বাকী নলবোৰে তেওঁলোকৰ একত্ৰিত হাৰত বাকীখিনি শেষ কৰিবলৈ লোৱা সময় বিচৰা হয়। A এ চাৰি ঘণ্টাত ভৰায় আৰু দুঘণ্টা অকলে খোলা থাকিলে আধা টেংকী ভৰায়, আৰু বাকী আধা A আৰু B এ একেলগে তিন-চতুৰ্থাংশ প্ৰতি ঘণ্টাত ভৰায়, যি দুই-তৃতীয়াংশ ঘণ্টা লয়।",
      "দুটা ইনলেট আৰু এটা আউটলেট থকা তিনি-নলৰ প্ৰশ্ন এটা প্ৰকৃত হাৰেৰে সমাধান কৰা হয়। দুটা নলে বাৰ আৰু পোন্ধৰ ঘণ্টাত ভৰালে আৰু তৃতীয়টোৱে বিশ ঘণ্টাত খালী কৰিলে, প্ৰকৃত হাৰ = ১/১২ + ১/১৫ − ১/২০ = ৬/৬০ = ১/১০, গতিকে টেংকী দহ ঘণ্টাত ভৰে। আউটলেট ইনলেটবোৰতকৈ দ্ৰুত হ'লে প্ৰকৃত হাৰ ঋণাত্মক আৰু টেংকী খালী হয়, আৰু খালী হোৱাৰ সময় প্ৰকৃত হাৰৰ মানৰ ব্যস্ত। প্ৰকৃত হাৰৰ চিহ্নই টেংকী ভৰে নে খালী হয় তৎক্ষণাত কয়।",
      "এটা ডাঙৰ পৰিয়ালে ভৰোৱাৰ সময় আৰু খালী কৰাৰ সময় দি টেংকী আদৌ ভৰে নে নাই সোধে। পদ্ধতিটো সদায় প্ৰকৃত হাৰ গণনা কৰি তাৰ চিহ্ন চোৱা। ইনলেট হাৰ ডাঙৰ হ'লে টেংকী পাৰ্থক্যৰ ব্যস্তত ভৰে; আউটলেট হাৰ ডাঙৰ হ'লে পাৰ্থক্যৰ ব্যস্তত খালী হয়; আৰু দুয়োটা সমান হ'লে টেংকী নভৰেও নাখালীও নহয়। এই এটা তুলনাই গোটেই পৰিয়ালৰ উত্তৰ দিয়ে, আৰু সমান হোৱা ক্ষেত্ৰটো পৰীক্ষকসকলৰ প্ৰিয়, কাৰণ ই প্ৰাৰ্থীয়ে হাৰৰ ধাৰণাটো সঁচাকৈ বুজিছে নেকি পৰীক্ষা কৰে।",
      "টেংকীৰ এটা ভগ্নাংশ সোধা প্ৰশ্নবোৰ এটা সৰু সম্প্ৰসাৰণ। বাৰ ঘণ্টাত টেংকী ভৰালে তিনি ঘণ্টাত ই এক-চতুৰ্থাংশ পূৰ্ণ হয়, আৰু পাঁচ-ষষ্ঠাংশ পূৰ্ণ হ'বলৈ বাৰৰ পাঁচ-ষষ্ঠাংশ, অৰ্থাৎ দহ ঘণ্টা লাগে। হাৰৰ ধাৰণাই ভগ্নাংশটো পোনপটীয়াকৈ দিয়ে, কাৰণ ভৰা ভগ্নাংশ = হাৰ × সময়। হাৰ লিখি ল'লে এই প্ৰশ্নবোৰ দ্ৰুত, আৰু হাৰ যে এঘণ্টাত কৰা ভগ্নাংশ সেয়া মনত আছেনে নাই পৰীক্ষা কৰাৰ বাবে ই ভাল।",
      "কিছুমান প্ৰশ্নত টেংকী এটা আংশিকভাৱে ভৰা অৱস্থাৰ পৰা আৰম্ভ কৰা হয় বা এটা নলে কাম কৰি থকাৰ মাজতে আন এটা নল যোগ দিয়ে। এনে ক্ষেত্ৰত প্ৰথমে ইতিমধ্যে ভৰা ভগ্নাংশ বিচাৰি লৈ তাৰ পিছত বাকী ভগ্নাংশৰ বাবে প্ৰয়োজনীয় সময় গণনা কৰা হয়। যদি টেংকী আধা পূৰ্ণ আৰু প্ৰকৃত হাৰ ১/৬ হয়, তেন্তে বাকী আধা ভৰাবলৈ ৩ ঘণ্টা লাগে। এই ৰূপ সময় আৰু কাৰ্যৰ প্ৰশ্নৰ সৈতে একেই ধৰণে কাম কৰে আৰু সাৱধানে পঢ়িলে কঠিন নহয়।",
      "আন এটা সচৰাচৰ ৰূপত কেইবাটাও নলৰ মাজৰ এটা নলৰ হাৰ সোধা হয়, য'ত আন নলবোৰৰ তথ্য দিয়া থাকে। এনে প্ৰশ্নত আন নলবোৰৰ প্ৰকৃত হাৰ বিচাৰি, মুঠ প্ৰকৃত হাৰৰ পৰা বিয়োগ কৰিলে নিৰ্দিষ্ট নলটোৰ হাৰ ওলায়। যদি দুটা নলে একেলগে এটা টেংকী ভৰায় আৰু এটা নলৰ সময় জনা থাকে, তেন্তে আনটোৰ হাৰ = একেলগৰ হাৰ − জনা নলৰ হাৰ। এই বিয়োগেই এই পৰিয়ালৰ একমাত্ৰ পদক্ষেপ, আৰু ভগ্নাংশবোৰ সঠিক ৰখাটো অতি প্ৰয়োজনীয়।",
      "পৰীক্ষাত নল আৰু চৌবাচ্চাৰ প্ৰশ্নবোৰ প্ৰায়ে বাস্তৱ পৰিস্থিতিৰ ৰূপত আহে, যেনে এটা পানীৰ টেংকী, এটা চৌবাচ্চা, বা এটা পুখুৰী ভৰোৱা আৰু খালী কৰা। এনে ক্ষেত্ৰত প্ৰতিটো নলৰ হাৰ সুকীয়াকৈ লিখি, ইনলেটবোৰ যোগ আৰু আউটলেটবোৰ বিয়োগ কৰি, টেংকী ভৰা বা খালী হোৱাৰ সময় বিচৰা হয়। বাস্তৱ পৰিস্থিতিৰ ভাষা গাণিতিক গঠনটো সলনি নকৰে, গতিকে একেই পদ্ধতি প্ৰয়োগ কৰিব পাৰি আৰু ভয় খোৱাৰ প্ৰয়োজন নাই।",
      "কিছুমান প্ৰশ্নত এটা টেংকী এটা নিৰ্দিষ্ট ভগ্নাংশ পূৰ্ণ হোৱাৰ সময় সোধা হয়, য'ত দুটা বা ততোধিক নল একেলগে খোলা থাকে। এনে প্ৰশ্নত প্ৰথমে একত্ৰিত হাৰ বিচাৰি, সেই হাৰৰ ব্যস্ত লৈ নিৰ্দিষ্ট ভগ্নাংশৰে পূৰণ কৰা হয়। যদি একত্ৰিত হাৰ ১/৮ আৰু টেংকীৰ ৩/৪ পূৰ্ণ হ'ব লাগে, তেন্তে সময় = (৩/৪) × ৮ = ৬ ঘণ্টা। এই প্ৰশ্নবোৰ দ্ৰুত আৰু হাৰৰ ধাৰণা স্পষ্ট হ'লে কেতিয়াও ভুল নহয়।",
      "আন এটা ৰূপত দুটা নলৰ এটাৰ সময় আৰু দুয়োৰে একেলগে সময় দি আনটোৰ সময় সোধা হয়। এনে প্ৰশ্নত আনটোৰ হাৰ = একেলগৰ হাৰ − এটাৰ হাৰ, আৰু তাৰ ব্যস্ত লৈ সময় পোৱা যায়। যদি একেলগে ৬ ঘণ্টা আৰু এটাই ১০ ঘণ্টা লয়, তেন্তে আনটোৰ হাৰ = ১/৬ − ১/১০ = ১/১৫, গতিকে আনটোৱে ১৫ ঘণ্টা লয়। এই বিয়োগেই এই পৰিয়ালৰ মূল, আৰু ভগ্নাংশ সঠিক ৰখাটো অতি প্ৰয়োজনীয়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল গোটেই টেংকীক এক আৰু প্ৰতিটো নলৰ হাৰক সঠিক ভগ্নাংশ হিচাপে লিখা, যাতে গণনা সঠিক হয় আৰু প্ৰতিটো আউটলেটৰ চিহ্ন স্পষ্ট হয়। দ্বিতীয়টো হ'ল এটা সৰু তালিকা আঁকি নলবোৰ শাৰীত আৰু প্ৰতিটোৰ হাৰ এটা স্তম্ভত লিখি, ব্যস্ত লোৱাৰ আগতে ইনলেট যোগ আৰু আউটলেট বিয়োগ কৰা। এই অভ্যাসৰ সৈতে নল আৰু চৌবাচ্চাৰ প্ৰশ্নবোৰ প্ৰশ্নপত্ৰৰ আটাইতকৈ দ্ৰুত হৈ পৰে, আৰু একেই হাৰ পদ্ধতিয়ে পোনপটীয়াকৈ সময় আৰু কাৰ্য আৰু কাৰ্য আৰু মজুৰিলৈ যায়।",
    ],
  },
  list: {
    en: [
      "Rate of a pipe = 1 ÷ time to fill (inlets) or −1 ÷ time to empty (outlets).",
      "Net rate = sum of inlet rates − sum of outlet rates; time = 1 ÷ net rate.",
      "A leak is an outlet pipe of unknown rate; leak rate = pipe rate − actual rate.",
      "Negative net rate means the tank never fills (or empties).",
      "Pipe closed early: add the work done in each period and equate to 1.",
      "Alternate opening: first the work done alone, then the rest at the combined rate.",
      "A/B/C two at a time: add the three rates, halve, then subtract a pair's rate.",
      "Equal inlet and outlet rates leave the tank unchanged.",
      "Fraction filled = rate × time.",
      "Take the whole tank as 1 and keep the rates as exact fractions.",
    ],
    as: [
      "নলৰ হাৰ = ভৰোৱাৰ সময়ৰ ১ ÷ (ইনলেট) বা −১ ÷ খালী কৰাৰ সময় (আউটলেট)।",
      "প্ৰকৃত হাৰ = ইনলেট হাৰৰ যোগফল − আউটলেট হাৰৰ যোগফল; সময় = ১ ÷ প্ৰকৃত হাৰ।",
      "চুৰু অজ্ঞাত হাৰৰ আউটলেট নল; চুৰুৰ হাৰ = নলৰ হাৰ − প্ৰকৃত হাৰ।",
      "ঋণাত্মক প্ৰকৃত হাৰ মানে টেংকী কেতিয়াও নভৰে (বা খালী হয়)।",
      "নল সোনকালে বন্ধ: প্ৰতিটো সময়ছোৱাত কৰা কাম যোগ কৰি ১ ৰ সৈতে সমীকৰণ কৰক।",
      "পৰ্যায়ক্ৰমে খোলা: প্ৰথমে অকলে কৰা কাম, তাৰ পিছত বাকীখিনি একত্ৰিত হাৰত।",
      "A/B/C দুজন-দুজনকৈ: তিনিওটা হাৰ যোগ কৰি আধা কৰি এটা যোৰৰ হাৰ বিয়োগ কৰক।",
      "ইনলেট আৰু আউটলেট হাৰ সমান হ'লে টেংকী অপৰিৱৰ্তিত থাকে।",
      "ভৰা ভগ্নাংশ = হাৰ × সময়।",
      "গোটেই টেংকীক ১ আৰু হাৰবোৰ সঠিক ভগ্নাংশ হিচাপে ৰাখক।",
    ],
  },
  faqs: [
    {
      q: { en: "Why is the whole tank taken as 1?", as: "গোটেই টেংকীক ১ কিয় ধৰা হয়?" },
      a: {
        en: "Because the rate is the fraction of the tank handled in one hour. A pipe that fills in 12 hours handles 1/12 of the tank per hour, and the tank is full when the fractions add to 1. Taking the tank as 1 makes the arithmetic exact and the sign of every outlet clear.",
        as: "কাৰণ হাৰ হৈছে এক ঘণ্টাত কৰা টেংকীৰ ভগ্নাংশ। ১২ ঘণ্টাত ভৰোৱা নলে এঘণ্টাত টেংকীৰ ১/১২ কৰে, আৰু ভগ্নাংশবোৰ যোগ হৈ ১ হ'লে টেংকী পূৰ্ণ হয়। টেংকীক ১ ধৰিলে গণনা সঠিক হয় আৰু প্ৰতিটো আউটলেটৰ চিহ্ন স্পষ্ট হয়।",
      },
    },
    {
      q: { en: "How do I handle a leak?", as: "চুৰু কেনেকৈ সামৰিম?" },
      a: {
        en: "Treat the leak as an outlet pipe of unknown rate. If a pipe fills in 6 hours but with the leak it takes 8 hours, the leak's rate is 1/6 − 1/8 = 1/24, so the leak alone empties the tank in 24 hours.",
        as: "চুৰুক অজ্ঞাত হাৰৰ আউটলেট নল হিচাপে ধৰক। এটা নলে ছয় ঘণ্টাত ভৰালে কিন্তু চুৰুৰ বাবে আঠ ঘণ্টা লাগিলে, চুৰুৰ হাৰ = ১/৬ − ১/৮ = ১/২৪, গতিকে চুৰুৱে অকলে টেংকী ২৪ ঘণ্টাত খালী কৰে।",
      },
    },
    {
      q: { en: "What happens when the outlet is faster than the inlets?", as: "আউটলেট ইনলেটতকৈ দ্ৰুত হ'লে কি হয়?" },
      a: {
        en: "The net rate becomes negative, so the tank never fills; instead it empties. The time to empty is the reciprocal of the size of the net rate. Always compute the net rate and look at its sign before answering.",
        as: "প্ৰকৃত হাৰ ঋণাত্মক হয়, গতিকে টেংকী কেতিয়াও নভৰে; বৰং খালী হয়। খালী হোৱাৰ সময় প্ৰকৃত হাৰৰ মানৰ ব্যস্ত। উত্তৰ দিয়াৰ আগতে সদায় প্ৰকৃত হাৰ গণনা কৰি তাৰ চিহ্ন চাওক।",
      },
    },
    {
      q: { en: "How do I solve a question where one pipe is closed early?", as: "এটা নল সোনকালে বন্ধ কৰা প্ৰশ্ন কেনেকৈ সমাধান কৰিম?" },
      a: {
        en: "Split the time into the period both pipes were open and the period only one was open. The work is the together rate times the first period plus the single rate times the second period, and this sum equals 1. One equation gives the unknown.",
        as: "সময়ক দুয়ো নল খোলা থকা সময়ছোৱা আৰু কেৱল এটা খোলা থকা সময়ছোৱাত ভাগ কৰক। কাম = একেলগৰ হাৰ × প্ৰথম সময় + একক হাৰ × দ্বিতীয় সময়, আৰু এই যোগফল ১ ৰ সমান। এটা সমীকৰণে অজ্ঞাতটো দিয়ে।",
      },
    },
    {
      q: { en: "How do I find when a tank is a given fraction full?", as: "টেংকী এটা দিয়া ভগ্নাংশ পূৰ্ণ হ'লে কেনেকৈ বিচাৰিম?" },
      a: {
        en: "The fraction filled is the rate times the time. If the combined rate is 1/12 per hour, then to be 5/6 full takes (5/6) × 12 = 10 hours. The rate idea gives the fraction directly with no extra work.",
        as: "ভৰা ভগ্নাংশ = হাৰ × সময়। একত্ৰিত হাৰ ১/১২ প্ৰতি ঘণ্টা হ'লে, ৫/৬ পূৰ্ণ হ'বলৈ (৫/৬) × ১২ = ১০ ঘণ্টা লাগে। হাৰৰ ধাৰণাই ভগ্নাংশটো অতিৰিক্ত কাম নোহোৱাকৈ পোনপটীয়াকৈ দিয়ে।",
      },
    },
  ],
};
