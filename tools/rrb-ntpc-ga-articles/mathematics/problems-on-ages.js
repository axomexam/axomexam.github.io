"use strict";

/* RRB NTPC Mathematics — Problems on Ages. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Problems on Ages for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে বয়সৰ সমস্যা" },
  p: {
    en: [
      "Problems on ages is the chapter in which the arithmetic of ratio meets the arithmetic of time, and it appears in the RRB NTPC Mathematics paper in a small but dependable number of questions every year. An age question gives a relation between the present ages of two or more persons and another relation between their ages some years earlier or later, and asks for one of the ages. The whole chapter rests on a single technique: choose the present age of one person as an unknown, write every other age as a simple expression in that unknown, translate the given relation into an equation, and solve.",
      "The most common form gives the ages in a ratio. If the present ages of A and B are in the ratio 5 to 3, write them as 5x and 3x. After n years each age increases by n, so the new ages are 5x plus n and 3x plus n, and a second ratio given for the future or the past produces one linear equation in x. Solving it gives x, and every age follows. Nearly half the questions in the chapter are this one pattern with different numbers, and the candidate who sets up the ratio as a multiple of an unknown will never be lost.",
      "The next form gives a multiple relation instead of a ratio. A father is three times as old as his son, or A is twice as old as B. These are the same as a ratio, so write the ages as 3x and x, or as 2x and x, and proceed exactly as before. The phrase 'twice as old' means the ratio is 2 to 1, and 'five years ago A was three times as old as B' means that five years ago the ratio of their ages was 3 to 1. Translating every such phrase into a ratio is the single most useful habit in the chapter.",
      "Ages move together through time, and this is the idea that distinguishes age questions from ordinary ratio questions. If the present ages of A and B are 5x and 3x, then t years ago they were 5x minus t and 3x minus t, and t years hence they will be 5x plus t and 3x plus t. The difference between two persons' ages never changes with time, which is a powerful shortcut: if the father is 24 years older than the son today, he is 24 years older than the son at every moment. Questions that give the difference instead of a ratio are solved by using this constant difference.",
      "The sum of the ages is another common given. If the sum of the ages of a father and his son is 50 years and five years ago the father was seven times as old as the son, the trick is to convert everything to one point in time. Five years ago the sum was 40, and if the son was x then, the father was 40 minus x, and the relation 40 minus x equals 7x gives x equal to 5, so the son is now 10. Converting the sum to the same point in time as the ratio is the key step, and it removes the most common source of error.",
      "Questions with three persons are only slightly harder. Write all three ages as multiples of one unknown, use the sum or one relation to find the unknown, and then answer the question. If A is twice B and B is twice C with a given total, then the ages are 4k, 2k and k, and the total 7k fixes k. A useful special case is a chain of ratios such as A to B equal to 2 to 3 and B to C equal to 4 to 5, which must be joined through the common term B before the three ages are written down, exactly as in ratio and proportion.",
      "The average age of a group is a frequent companion of the chapter. If the average age of a husband and his wife is 25 and the average of the family including a child is 20, the couple's total is 50 and the family total is 60, so the child is 10. The method is always to convert the average to a total by multiplying by the count, and then to compare the totals. When people join or leave the group, the average changes, and the same total method finds the age of the person who joined or left, just as in the average chapter.",
      "A distinctive family of questions uses the fact that ages must be positive and sensible. If an equation gives a negative value or a fractional age that is impossible, the candidate should recheck the translation rather than accept the result. Most such questions in the paper have a clean integer answer, and a fractional or negative age is a signal that a plus or minus sign has been misplaced. Checking the answer against the original statement, by substituting the found ages back into both relations, is a fast and reliable safeguard.",
      "The reverse questions ask for the number of years rather than an age. If a father is 28 years older than his son and the father is now twice the son's age, the question may ask after how many years the father will be twice as old again, or how many years ago he was three times as old. Setting up the relation with the unknown as the number of years, rather than as an age, is all that changes. The method is identical: write both ages at the required time as expressions in the number of years, set up the relation, and solve.",
      "Several standard templates recur in the paper and are worth recognising on sight. The father and son templates, the mother and daughter templates, the husband and wife with a child template, the two friends whose ages are in a ratio that changes after some years, and the two persons whose ages differ by a fixed amount are the recurring shapes. A candidate who has solved each template once will recognise it immediately in the exam and can write the equation without hesitation, which is exactly the speed that the section demands.",
      "Finally, the chapter rewards clear labelling. Write each person's age at the chosen reference time as a single expression in the unknown, keep the equations tidy, and substitute back to check. The ratio-based questions should be set up as multiples of an unknown, the difference-based questions should use the constant difference, and the sum-based questions should be converted to a single point in time. With these three habits the age questions become among the quickest and most certain in the mathematics section, and the same equation-writing skill carries over into ratio, average and partnership.",
    ],
    as: [
      "বয়সৰ সমস্যা হৈছে সেই অধ্যায় য'ত অনুপাতৰ পাটিগণিতে সময়ৰ পাটিগণিতক লগ পায়, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে সৰু কিন্তু নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত ই দেখা দিয়ে। এটা বয়সৰ প্ৰশ্নই দুজন বা ততোধিক ব্যক্তিৰ বৰ্তমান বয়সৰ এটা সম্পৰ্ক আৰু কিছু বছৰ আগতে বা পিছত সিহঁতৰ বয়সৰ আন এটা সম্পৰ্ক দিয়ে, আৰু এটা বয়স সোধে। গোটেই অধ্যায়টো এটা কৌশলৰ ওপৰত ৰয়: এজন ব্যক্তিৰ বৰ্তমান বয়সক এটা অজ্ঞাত ধৰি, আন প্ৰতিটো বয়স সেই অজ্ঞাতৰ এটা সৰল ৰাশি হিচাপে লিখি, দিয়া সম্পৰ্কটো এটা সমীকৰণলৈ ৰূপান্তৰ কৰি, আৰু সমাধান কৰা।",
      "আটাইতকৈ সচৰাচৰ ৰূপটোৱে বয়সবোৰ এটা অনুপাতত দিয়ে। A আৰু B ৰ বৰ্তমান বয়স ৫ ৰ পৰা ৩ অনুপাতত হ'লে, সিহঁতক ৫x আৰু ৩x হিচাপে লিখক। n বছৰৰ পিছত প্ৰতিটো বয়স n ৰে বাঢ়ে, গতিকে নতুন বয়স ৫x যোগ n আৰু ৩x যোগ n, আৰু ভৱিষ্যত বা অতীতৰ বাবে দিয়া দ্বিতীয় এটা অনুপাতে x ত এটা ৰৈখিক সমীকৰণ দিয়ে। ইয়াক সমাধান কৰিলে x পোৱা যায়, আৰু প্ৰতিটো বয়স ওলায়। অধ্যায়টোৰ প্ৰায় আধা প্ৰশ্ন এই এটাই আৰ্হি বেলেগ বেলেগ সংখ্যাৰে, আৰু যি প্ৰাৰ্থীয়ে অনুপাতটো অজ্ঞাতৰ গুণিতক হিচাপে সাজে তেওঁ কেতিয়াও হেৰাই নাযায়।",
      "পৰৱৰ্তী ৰূপটোৱে অনুপাতৰ সলনি এটা গুণিতক সম্পৰ্ক দিয়ে। এজন পিতৃ পুত্ৰৰ তিনিগুণ বয়সীয়া, বা A, B ৰ দুগুণ বয়সীয়া। এইবোৰ অনুপাতৰ সমান, গতিকে বয়সবোৰ ৩x আৰু x, বা ২x আৰু x হিচাপে লিখি আগৰ দৰেই আগবাঢ়ক। 'দুগুণ বয়সীয়া' মানে অনুপাত ২ ৰ পৰা ১, আৰু 'পাঁচ বছৰ আগতে A, B ৰ তিনিগুণ আছিল' মানে পাঁচ বছৰ আগতে সিহঁতৰ বয়সৰ অনুপাত ৩ ৰ পৰা ১ আছিল। এনে প্ৰতিটো বাক্য অনুপাতলৈ ৰূপান্তৰ কৰাটো অধ্যায়টোৰ আটাইতকৈ উপযোগী অভ্যাস।",
      "বয়সবোৰ সময়ৰ লগে লগে একেলগে আগবাঢ়ে, আৰু এই ধাৰণাই বয়সৰ প্ৰশ্নক সাধাৰণ অনুপাতৰ প্ৰশ্নৰ পৰা পৃথক কৰে। A আৰু B ৰ বৰ্তমান বয়স ৫x আৰু ৩x হ'লে, t বছৰ আগতে সিহঁত ৫x বিয়োগ t আৰু ৩x বিয়োগ t আছিল, আৰু t বছৰৰ পিছত সিহঁত ৫x যোগ t আৰু ৩x যোগ t হ'ব। দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য সময়ৰ লগে লগে কেতিয়াও সলনি নহয়, যি এটা শক্তিশালী চমু পথ: পিতৃ আজি পুত্ৰতকৈ ২৪ বছৰ ডাঙৰ হ'লে, প্ৰতিটো মুহূৰ্ততে তেওঁ পুত্ৰতকৈ ২৪ বছৰ ডাঙৰ। অনুপাতৰ সলনি পাৰ্থক্য দিয়া প্ৰশ্নবোৰ এই স্থিৰ পাৰ্থক্য ব্যৱহাৰ কৰি সমাধান কৰা হয়।",
      "বয়সৰ যোগফল আন এটা সচৰাচৰ দিয়া মান। এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ যোগফল ৫০ বছৰ আৰু পাঁচ বছৰ আগতে পিতৃ পুত্ৰৰ সাতগুণ আছিল হ'লে, কৌশলটো হ'ল সকলোকে এটা সময়বিন্দুলৈ ৰূপান্তৰ কৰা। পাঁচ বছৰ আগতে যোগফল ৪০ আছিল, আৰু তেতিয়া পুত্ৰ x হ'লে পিতৃ ৪০ বিয়োগ x আছিল, আৰু ৪০ বিয়োগ x = 7x ৰ পৰা x = ৫, গতিকে পুত্ৰৰ এতিয়া ১০। যোগফলটো অনুপাতৰ সৈতে একেই সময়বিন্দুলৈ ৰূপান্তৰ কৰাটো মূল পদক্ষেপ, আৰু ই আটাইতকৈ সচৰাচৰ ভুলৰ উৎস আঁতৰায়।",
      "তিনিজন ব্যক্তিৰ প্ৰশ্ন অলপ কঠিন। তিনিওটা বয়স এটা অজ্ঞাতৰ গুণিতক হিচাপে লিখক, অজ্ঞাতটো বিচাৰিবলৈ যোগফল বা এটা সম্পৰ্ক ব্যৱহাৰ কৰক, আৰু তাৰ পিছত প্ৰশ্নৰ উত্তৰ দিয়ক। A, B ৰ দুগুণ আৰু B, C ৰ দুগুণ আৰু মুঠ দিয়া থাকিলে বয়সবোৰ ৪k, ২k আৰু k, আৰু মুঠ ৭k এ k নিৰ্ধাৰণ কৰে। এটা উপযোগী বিশেষ ক্ষেত্ৰ হৈছে A ৰ পৰা B = ২ ৰ পৰা ৩ আৰু B ৰ পৰা C = ৪ ৰ পৰা ৫ ৰ দৰে শৃংখলাবদ্ধ অনুপাত, যি তিনিওটা বয়স লিখাৰ আগতে সাধাৰণ পদ B ৰ জৰিয়তে জোৰা লগাব লাগে, অনুপাত আৰু সমানুপাতত যেনেকৈ।",
      "এটা গোটৰ গড় বয়স এই অধ্যায়ৰ এটা সচৰাচৰ সঙ্গী। এজন স্বামী আৰু পত্নীৰ গড় বয়স ২৫ আৰু সন্তান ধৰি পৰিয়ালৰ গড় ২০ হ'লে, দম্পতীৰ মুঠ ৫০ আৰু পৰিয়ালৰ মুঠ ৬০, গতিকে সন্তানটোৰ বয়স ১০। পদ্ধতিটো সদায় গড়ক সংখ্যাৰে পূৰণ কৰি মুঠলৈ ৰূপান্তৰ কৰা, আৰু তাৰ পিছত মুঠবোৰ তুলনা কৰা। মানুহ গোটত যোগ দিলে বা এৰি গ'লে গড় সলনি হয়, আৰু একেই মুঠ পদ্ধতিয়ে যোগ দিয়া বা এৰি যোৱা ব্যক্তিৰ বয়স বিচাৰে, গড়ৰ অধ্যায়ত যেনেকৈ।",
      "এটা বিশেষ পৰিয়ালে এই তথ্য ব্যৱহাৰ কৰে যে বয়স ধনাত্মক আৰু বিশ্বাসযোগ্য হ'ব লাগে। এটা সমীকৰণে ঋণাত্মক মান বা অসম্ভৱ ভগ্নাংশ বয়স দিলে, প্ৰাৰ্থীয়ে ফলাফল গ্ৰহণ কৰাৰ সলনি ৰূপান্তৰণ পুনৰ পৰীক্ষা কৰা উচিত। প্ৰশ্নপত্ৰৰ এনে বেছিভাগ প্ৰশ্নৰ এটা পৰিষ্কাৰ পূৰ্ণসংখ্যা উত্তৰ থাকে, আৰু ভগ্নাংশ বা ঋণাত্মক বয়স এটা সংকেত যে এটা যোগ বা বিয়োগ চিহ্ন ভুল ঠাইত পৰিছে। মূল উক্তিটোৰ সৈতে উত্তৰ মিলাই চোৱাটো, পোৱা বয়স দুয়োটা সম্পৰ্কত পুনৰ বহুৱাই, এটা দ্ৰুত আৰু নিৰ্ভৰযোগ্য সুৰক্ষা।",
      "উলটি প্ৰশ্নবোৰে বয়সৰ সলনি বছৰৰ সংখ্যা সোধে। এজন পিতৃ পুত্ৰতকৈ ২৮ বছৰ ডাঙৰ আৰু পিতৃ এতিয়া পুত্ৰৰ দুগুণ হ'লে, প্ৰশ্নই সোধে কিমান বছৰৰ পিছত পিতৃ আকৌ দুগুণ হ'ব, বা কিমান বছৰ আগতে তেওঁ তিনিগুণ আছিল। অজ্ঞাত হিচাপে বয়সৰ সলনি বছৰৰ সংখ্যা লৈ সম্পৰ্কটো সজাটোৱে একেই সলনি। পদ্ধতিটো অভিন্ন: প্ৰয়োজনীয় সময়ত দুয়োটা বয়স বছৰৰ সংখ্যাৰ ৰাশি হিচাপে লিখক, সম্পৰ্কটো সাজক, আৰু সমাধান কৰক।",
      "কেইবাটাও মানক আৰ্হি প্ৰশ্নপত্ৰত পুনৰাবৃত্তি হয় আৰু চকুৰ আগতেই চিনি পোৱাৰ যোগ্য। পিতৃ-পুত্ৰৰ আৰ্হি, মাক-জীয়েকৰ আৰ্হি, সন্তান ধৰি স্বামী-পত্নীৰ আৰ্হি, কিছু বছৰৰ পিছত সলনি হোৱা অনুপাতত থকা দুজন বন্ধুৰ বয়স, আৰু এটা নিৰ্দিষ্ট পাৰ্থক্যৰে দুজন ব্যক্তিৰ বয়স — এইবোৰ পুনৰাবৃত্তি হোৱা ৰূপ। যি প্ৰাৰ্থীয়ে প্ৰতিটো আৰ্হি এবাৰ সমাধান কৰিছে তেওঁ পৰীক্ষাত ইয়াক লগে লগে চিনি পাব আৰু কোনো দ্বিধা নকৰাকৈ সমীকৰণ লিখিব, যিটোৱেই শাখাটোৱে দাবী কৰা গতি।",
      "বয়সৰ প্ৰশ্নত এটা সচৰাচৰ ফান্দ হৈছে এককৰ ভুল। প্ৰশ্নই কেতিয়াবা বয়স বছৰত আৰু কেতিয়াবা মাহত দিয়ে, আৰু কেতিয়াবা 'দহ বছৰৰ আগতে' আৰু 'দহ বছৰৰ পিছত' দুয়োটা একে প্ৰশ্নতে দিয়ে। প্ৰতিটো বয়সক একেই সময়বিন্দুত ৰূপান্তৰ কৰাটো আৱশ্যক, আৰু একক এটাই ৰাখিব লাগে। যদি এটা প্ৰশ্নই বৰ্তমান বয়স আৰু এটা নিৰ্দিষ্ট বছৰত বয়স দিয়ে, তেন্তে দুয়োটাকে একেই সময়বিন্দুত লৈ সমীকৰণ সজা উচিত, নহ'লে উত্তৰ এটা বছৰৰ ভুল হৈ যাব।",
      "অনুপাত-ভিত্তিক আৰু পাৰ্থক্য-ভিত্তিক প্ৰশ্ন দুয়োটাকে লগ কৰি এটা তৃতীয় ৰূপ পোৱা যায় য'ত বয়সৰ যোগফল, অনুপাত আৰু এটা নিৰ্দিষ্ট বছৰৰ সম্পৰ্ক একেলগে দিয়া থাকে। এনে প্ৰশ্নত প্ৰথমে যোগফলটোক সৰল কৰি এটা অজ্ঞাতৰ সমীকৰণলৈ লৈ যোৱা হয়, আৰু তাৰ পিছত অনুপাতটো ব্যৱহাৰ কৰি দ্বিতীয়টো সমীকৰণ পোৱা যায়। দুটা সমীকৰণ একেলগে সমাধান কৰিলে অজ্ঞাত ওলায়। এই ৰূপ কঠিন দেখা যায় কিন্তু পদ্ধতিটো একেই, আৰু অভ্যাস কৰিলে এনে প্ৰশ্নও লগে লগে সমাধান হয়।",
      "শেষত, অধ্যায়টোৱে পৰিষ্কাৰ লেবেলিঙক পুৰস্কৃত কৰে। বাছনি কৰা নিৰ্দেশ সময়ত প্ৰতিজন ব্যক্তিৰ বয়সক অজ্ঞাতৰ এটা ৰাশি হিচাপে লিখক, সমীকৰণবোৰ পৰিষ্কাৰ ৰাখক, আৰু পুনৰ বহুৱাই পৰীক্ষা কৰক। অনুপাত-ভিত্তিক প্ৰশ্নবোৰ অজ্ঞাতৰ গুণিতক হিচাপে সজা উচিত, পাৰ্থক্য-ভিত্তিক প্ৰশ্নবোৰে স্থিৰ পাৰ্থক্য ব্যৱহাৰ কৰা উচিত, আৰু যোগফল-ভিত্তিক প্ৰশ্নবোৰ এটা সময়বিন্দুলৈ ৰূপান্তৰ কৰা উচিত। এই তিনিটা অভ্যাসৰ সৈতে বয়সৰ প্ৰশ্নবোৰ গণিত শাখাৰ আটাইতকৈ দ্ৰুত আৰু নিশ্চিত হৈ পৰে, আৰু একেই সমীকৰণ-লিখাৰ দক্ষতা অনুপাত, গড় আৰু অংশীদাৰিত্বলৈকো যায়।",
    ],
  },
  list: {
    en: [
      "Choose one present age as an unknown and write every other age in terms of it.",
      "A ratio such as 5 : 3 becomes 5x and 3x; 'twice as old' becomes 2x and x.",
      "After t years add t to each age; t years ago subtract t from each age.",
      "The difference of two persons' ages never changes with time.",
      "For a sum, convert the total to the same point in time as the ratio before equating.",
      "For three persons, write all ages as multiples of one unknown and use the sum.",
      "Chain ratios through the common person, as in ratio and proportion.",
      "Averages convert to totals by multiplying by the count.",
      "For 'after how many years', make the number of years the unknown.",
      "Always substitute the answer back into the original statements to check.",
    ],
    as: [
      "এটা বৰ্তমান বয়সক অজ্ঞাত ধৰি বাকী প্ৰতিটো বয়স তাৰ ৰাশিত লিখক।",
      "৫ : ৩ ৰ দৰে অনুপাত ৫x আৰু ৩x হয়; 'দুগুণ বয়সীয়া' ২x আৰু x হয়।",
      "t বছৰৰ পিছত প্ৰতিটো বয়সত t যোগ কৰক; t বছৰ আগতে প্ৰতিটোৰ পৰা t বিয়োগ কৰক।",
      "দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য সময়ৰ লগে লগে কেতিয়াও সলনি নহয়।",
      "যোগফলৰ বাবে সমীকৰণ কৰাৰ আগতে মুঠক অনুপাতৰ সৈতে একেই সময়বিন্দুলৈ ৰূপান্তৰ কৰক।",
      "তিনিজনৰ বাবে তিনিওটা বয়স এটা অজ্ঞাতৰ গুণিতক হিচাপে লিখি যোগফল ব্যৱহাৰ কৰক।",
      "সাধাৰণ ব্যক্তিৰ জৰিয়তে শৃংখলাবদ্ধ অনুপাত জোৰা লগাওক, অনুপাত আৰু সমানুপাতত যেনেকৈ।",
      "গড়বোৰ সংখ্যাৰে পূৰণ কৰি মুঠলৈ ৰূপান্তৰ কৰা হয়।",
      "'কিমান বছৰৰ পিছত' ৰ বাবে বছৰৰ সংখ্যাক অজ্ঞাত কৰক।",
      "সদায় উত্তৰটো মূল উক্তিবোৰত পুনৰ বহুৱাই পৰীক্ষা কৰক।",
    ],
  },
  faqs: [
    {
      q: { en: "What is the basic method for an age question?", as: "বয়সৰ প্ৰশ্নৰ মূল পদ্ধতি কি?" },
      a: {
        en: "Take one person's present age as x, write every other age as an expression in x at the required time, turn the given relation into an equation, and solve for x. Then answer the actual question from x.",
        as: "এজন ব্যক্তিৰ বৰ্তমান বয়স x ধৰক, প্ৰয়োজনীয় সময়ত আন প্ৰতিটো বয়স x ৰ ৰাশি হিচাপে লিখক, দিয়া সম্পৰ্কটো এটা সমীকৰণলৈ কৰক, আৰু x ৰ বাবে সমাধান কৰক। তাৰ পিছত x ৰ পৰা প্ৰকৃত প্ৰশ্নৰ উত্তৰ দিয়ক।",
      },
    },
    {
      q: { en: "How do I use the constant age difference?", as: "স্থিৰ বয়সৰ পাৰ্থক্য কেনেকৈ ব্যৱহাৰ কৰিম?" },
      a: {
        en: "The difference of two persons' ages is the same today, ten years ago and ten years hence. When a question gives the difference instead of a ratio, set the two ages as x and x plus the difference and use the other relation to find x.",
        as: "দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য আজি, দহ বছৰ আগতে আৰু দহ বছৰৰ পিছত একেই। এটা প্ৰশ্নই অনুপাতৰ সলনি পাৰ্থক্য দিলে, দুয়োটা বয়স x আৰু x যোগ পাৰ্থক্য হিচাপে ধৰি আন সম্পৰ্কটো ব্যৱহাৰ কৰি x বিচাৰক।",
      },
    },
    {
      q: { en: "How do I handle a sum of ages with a past ratio?", as: "অতীতৰ অনুপাতৰ সৈতে বয়সৰ যোগফল কেনেকৈ সামৰিম?" },
      a: {
        en: "Move the sum to the same point in time as the ratio. If the present sum is 50 and the ratio is given for five years ago, the sum then was 40, so write the two ages as x and 40 − x and use the ratio.",
        as: "যোগফলটো অনুপাতৰ সৈতে একেই সময়বিন্দুলৈ লৈ যাওক। বৰ্তমান যোগফল ৫০ আৰু অনুপাত পাঁচ বছৰ আগতে দিয়া হ'লে, তেতিয়াৰ যোগফল ৪০ আছিল, গতিকে দুয়োটা বয়স x আৰু ৪০ − x হিচাপে লিখি অনুপাতটো ব্যৱহাৰ কৰক।",
      },
    },
    {
      q: { en: "How do I solve a three-person age question?", as: "তিনিজন ব্যক্তিৰ বয়সৰ প্ৰশ্ন কেনেকৈ সমাধান কৰিম?" },
      a: {
        en: "Express all three ages as multiples of a single unknown using the given relations, then use the sum or one more relation to fix the unknown. For a chain of ratios, join them through the common person first.",
        as: "দিয়া সম্পৰ্ক ব্যৱহাৰ কৰি তিনিওটা বয়স এটা অজ্ঞাতৰ গুণিতক হিচাপে প্ৰকাশ কৰক, তাৰ পিছত অজ্ঞাতটো নিৰ্ধাৰণ কৰিবলৈ যোগফল বা এটা অতিৰিক্ত সম্পৰ্ক ব্যৱহাৰ কৰক। শৃংখলাবদ্ধ অনুপাতৰ বাবে প্ৰথমে সাধাৰণ ব্যক্তিৰ জৰিয়তে জোৰা লগাওক।",
      },
    },
    {
      q: { en: "Why should I check the answer against the question?", as: "প্ৰশ্নৰ সৈতে উত্তৰ কিয় পৰীক্ষা কৰা উচিত?" },
      a: {
        en: "A negative or fractional age almost always means a misplaced sign in the translation. Substituting the found ages back into both given relations is a fast check and catches most errors before they cost a mark.",
        as: "ঋণাত্মক বা ভগ্নাংশ বয়স প্ৰায় সদায় ৰূপান্তৰণত এটা ভুল চিহ্ন সূচায়। পোৱা বয়স দুয়োটা দিয়া সম্পৰ্কত পুনৰ বহুৱাই চোৱাটো এটা দ্ৰুত পৰীক্ষা আৰু নম্বৰ হেৰুওৱাৰ আগতে বেছিভাগ ভুল ধৰা পেলায়।",
      },
    },
  ],
};
