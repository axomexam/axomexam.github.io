"use strict";

/* RRB NTPC Mathematics — LCM & HCF. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "LCM & HCF for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে ল.সা.গু. আৰু গ.সা.গু." },
  p: {
    en: [
      "LCM and HCF are the two ideas that tie the whole of arithmetic together, and in the RRB NTPC Mathematics paper they are asked both as direct sums and as the hidden engine inside word problems. The highest common factor, or HCF, is the greatest number that divides each of the given numbers exactly. The least common multiple, or LCM, is the smallest number that each of the given numbers divides exactly. Every question in this chapter is built from one of these two, or from a word problem that has been dressed up so that the HCF or LCM is not named.",
      "The first skill is prime factorisation. Break every number into a product of powers of primes, for example 24 is 2 cubed times 3 and 36 is 2 squared times 3 squared. The HCF is then the product of the lowest power of each prime that appears in all the numbers, so HCF(24, 36) is 2 squared times 3, that is 12. The LCM is the product of the highest power of each prime that appears in any of the numbers, so LCM(24, 36) is 2 cubed times 3 squared, that is 72. This one method answers both questions at once and never fails, however large the numbers.",
      "The relation between the two is the most useful single fact in the chapter. For any two numbers, the product of their HCF and their LCM equals the product of the numbers themselves. So if three of the four values are known the fourth can be found at once, and a whole family of questions that give the HCF and LCM and ask for a missing number is solved in one line. A related and very common shape is that the numbers are in a given ratio; if two numbers are in the ratio a to b, their HCF is the common factor and their LCM is that common factor multiplied by a and by b.",
      "The word problems divide into three shapes, and the whole skill is recognising which one a question has. If the question asks for the least number that leaves the same remainder when divided by several numbers, the answer is the LCM of those numbers plus the common remainder. If it asks for the greatest number that divides several numbers leaving the same remainder in each case, the answer is the HCF of the differences of those numbers. If it asks for the greatest number that divides several numbers leaving given different remainders, first subtract each remainder from its number and then take the HCF. These three shapes cover nearly every application.",
      "The bells and traffic-light problems are the classic LCM application. If several bells ring at given intervals, they ring together again after a time equal to the LCM of the intervals. The same idea answers questions about runners on a circular track meeting again at the starting point, about soldiers arranged in rows, and about rectangular tiles forming the smallest square, where the side of the square is the LCM of the tile sides. Whenever the words least or together appear in a problem about repeated events, the LCM is almost certainly wanted.",
      "Questions on fractions and decimals need a slightly different form. The LCM of fractions is the LCM of the numerators divided by the HCF of the denominators, and the HCF of fractions is the HCF of the numerators divided by the LCM of the denominators. For decimals, first write each decimal as a fraction with a power of ten in the denominator, then apply the same rule, and convert the answer back to a decimal. A question may give the numbers directly as fractions or as decimals such as 0.6 and 0.9, so both forms should be practised until the conversion is automatic.",
      "Some questions ask for the number of pairs of numbers that satisfy a condition. If the HCF is given and the sum of the two numbers is given, write the numbers as the HCF multiplied by two co-prime factors, and count the co-prime pairs that add up to the required total. This is a favourite shape because it tests both the HCF relation and the meaning of co-prime, and it appears again and again in the tougher papers. The number of such pairs is usually small, so it is quick to count once the two numbers have been put in the form HCF times a and HCF times b.",
      "Co-prime numbers deserve a paragraph of their own. Two numbers are co-prime if their HCF is 1, which means they share no prime factor. The LCM of two co-prime numbers is simply their product, and this saves time in several question types. Two consecutive natural numbers are always co-prime, so their HCF is 1. Two consecutive even numbers are never co-prime, because they share the factor 2. Questions that ask for the HCF or LCM of consecutive numbers are answered by these two facts alone.",
      "Finally, the chapter rewards a few memorised results. The HCF of a set of numbers never exceeds the smallest number in the set, and the LCM never falls below the largest number. The HCF divides the LCM exactly, because the LCM contains every prime power that any of the numbers contains. And for three numbers the product of the HCF and LCM is not equal to the product of the numbers, so the two-number relation must not be carried over carelessly. A candidate who keeps these limits and relations in mind can often eliminate two or three options at a glance before doing any calculation.",
      "Practice in this chapter should focus on speed and on recognising the shape of the question. Learn to factorise small numbers on sight, keep the HCF and LCM relation ready, and train yourself to read a word problem and decide within a few seconds whether it wants the LCM, the HCF of differences, or the HCF of numbers after subtracting remainders. Because the numbers in the paper are chosen to be manageable, a clear method beats raw calculation every time, and this chapter then becomes one of the most dependable sources of marks in the mathematics section.",
    ],
    as: [
      "ল.সা.গু. আৰু গ.সা.গু. হৈছে দুটা ধাৰণা যিয়ে গোটেই পাটিগণিতক একত্ৰিত কৰে, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত এইবোৰ পোনপটীয়া যোগ-বিয়োগ হিচাপে আৰু শব্দ-সমস্যাৰ ভিতৰত লুকাই থকা ইঞ্জিন হিচাপে সোধা হয়। গৰিষ্ঠ সাধাৰণ উৎপাদক, অৰ্থাৎ গ.সা.গু., হৈছে দিয়া সংখ্যাবোৰৰ প্ৰতিটোক সঠিকভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা। লঘিষ্ঠ সাধাৰণ গুণিতক, অৰ্থাৎ ল.সা.গু., হৈছে আটাইতকৈ সৰু সংখ্যা যাক দিয়া সংখ্যাবোৰৰ প্ৰতিটোৱে সঠিকভাৱে হৰণ কৰে। এই অধ্যায়ৰ প্ৰতিটো প্ৰশ্ন এই দুটাই এটাৰ পৰা, নাইবা এনে এটা শব্দ-সমস্যাৰ পৰা গঢ় লয় য'ত গ.সা.গু. বা ল.সা.গু. ৰ নাম লোৱা নাই।",
      "প্ৰথম দক্ষতা হৈছে মৌলিক উৎপাদকীকৰণ। প্ৰতিটো সংখ্যাক মৌলিকৰ ঘাতৰ গুণফল হিচাপে ভাঙি লিখক, উদাহৰণস্বৰূপে ২৪ হৈছে ২ ৰ ঘন গুণ ৩ আৰু ৩৬ হৈছে ২ ৰ বৰ্গ গুণ ৩ ৰ বৰ্গ। তেতিয়া গ.সা.গু. হৈছে গোটেই সংখ্যাবোৰত দেখা পোৱা প্ৰতিটো মৌলিকৰ আটাইতকৈ কম ঘাতৰ গুণফল, গতিকে গ.সা.গু.(২৪, ৩৬) = ২ ৰ বৰ্গ গুণ ৩ = ১২। ল.সা.গু. হৈছে যিকোনো সংখ্যাত দেখা পোৱা প্ৰতিটো মৌলিকৰ আটাইতকৈ বেছি ঘাতৰ গুণফল, গতিকে ল.সা.গু.(২৪, ৩৬) = ২ ৰ ঘন গুণ ৩ ৰ বৰ্গ = ৭২। এই এটা পদ্ধতিয়ে দুয়োটা প্ৰশ্নৰ উত্তৰ একেলগে দিয়ে আৰু সংখ্যা যিমান ডাঙৰ নহওক, কেতিয়াও বিফল নহয়।",
      "দুয়োটাৰ মাজৰ সম্পৰ্কটোৱেই অধ্যায়ৰ আটাইতকৈ উপযোগী এটা তথ্য। যিকোনো দুটা সংখ্যাৰ বাবে, সিহঁতৰ গ.সা.গু. আৰু ল.সা.গু. ৰ গুণফল সংখ্যা দুটাৰ গুণফলৰ সমান। গতিকে চাৰিটা মানৰ তিনিটা জনা থাকিলে চতুৰ্থটো তৎক্ষণাত পোৱা যায়, আৰু গ.সা.গু. আৰু ল.সা.গু. দি এটা হেৰুৱা সংখ্যা সোধা প্ৰশ্নৰ এটা গোটেই পৰিয়াল এটা শাৰীত সমাধান হয়। ইয়াৰ সৈতে জড়িত আৰু প্ৰায়ে অহা এটা ৰূপ হ'ল সংখ্যাবোৰ এটা নিৰ্দিষ্ট অনুপাতত থকা; যদি দুটা সংখ্যা a ৰ পৰা b অনুপাতত থাকে, সিহঁতৰ গ.সা.গু. সাধাৰণ উৎপাদক আৰু ল.সা.গু. সেই সাধাৰণ উৎপাদকৰ লগত a আৰু b ৰ গুণফল।",
      "শব্দ-সমস্যাবোৰ তিনি ৰূপত বিভক্ত, আৰু গোটেই দক্ষতা হৈছে এটা প্ৰশ্নৰ কোনটো ৰূপ আছে তাক চিনি পোৱা। যদি প্ৰশ্নই কেইবাটাও সংখ্যাৰে হৰণ কৰিলে একে ভাগশেষ ৰখা আটাইতকৈ সৰু সংখ্যা সোধে, উত্তৰটো হৈছে সেই সংখ্যাবোৰৰ ল.সা.গু. যোগ সাধাৰণ ভাগশেষ। যদি ই কেইবাটাও সংখ্যাক হৰণ কৰিলে প্ৰতিটো ক্ষেত্ৰতে একে ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা সোধে, উত্তৰটো হৈছে সেই সংখ্যাবোৰৰ পাৰ্থক্যৰ গ.সা.গু.। যদি ই কেইবাটাও সংখ্যাক হৰণ কৰিলে বেলেগ বেলেগ দিয়া ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা সোধে, প্ৰথমে প্ৰতিটো সংখ্যাৰ পৰা তাৰ ভাগশেষ বিয়োগ কৰি তাৰ পিছত গ.সা.গু. লওক। এই তিনিটা ৰূপেই প্ৰায় প্ৰতিটো প্ৰয়োগ সামৰি লয়।",
      "ঘণ্টা আৰু ট্ৰাফিক বতিৰ সমস্যা হৈছে ল.সা.গু. ৰ ধ্ৰুপদী প্ৰয়োগ। যদি কেইবাটাও ঘণ্টা দিয়া ব্যৱধানত বাজে, সিহঁত ব্যৱধানবোৰৰ ল.সা.গু.ৰ সমান সময়ৰ পিছত পুনৰ একেলগে বাজে। একেই ধাৰণাই বৃত্তাকাৰ পথত দৌৰবিদসকল পুনৰ আৰম্ভণি বিন্দুত লগ লগা, শাৰীত সজোৱা সৈনিক, আৰু আটাইতকৈ সৰু বৰ্গ গঢ়া আয়তাকাৰ টাইলৰ প্ৰশ্নৰ উত্তৰ দিয়ে, য'ত বৰ্গৰ বাহু টাইলৰ বাহুবোৰৰ ল.সা.গু.। পুনৰাবৃত্তি হোৱা ঘটনাৰ সমস্যাত যেতিয়াই 'কমেও' বা 'একেলগে' শব্দ আহে, প্ৰায় নিশ্চিতভাৱে ল.সা.গু. বিচৰা হয়।",
      "ভগ্নাংশ আৰু দশমিকৰ প্ৰশ্নত অলপ বেলেগ ৰূপ লাগে। ভগ্নাংশৰ ল.সা.গু. হৈছে লৱবোৰৰ ল.সা.গু. ক হৰবোৰৰ গ.সা.গু.ৰে হৰণ কৰা, আৰু ভগ্নাংশৰ গ.সা.গু. হৈছে লৱবোৰৰ গ.সা.গু. ক হৰবোৰৰ ল.সা.গু.ৰে হৰণ কৰা। দশমিকৰ বাবে, প্ৰথমে প্ৰতিটো দশমিকক হৰত দহৰ ঘাত থকা ভগ্নাংশ হিচাপে লিখক, তাৰ পিছত একেই নিয়ম প্ৰয়োগ কৰি উত্তৰটো পুনৰ দশমিকলৈ ৰূপান্তৰ কৰক। এটা প্ৰশ্নই সংখ্যাবোৰ পোনপটীয়াকৈ ভগ্নাংশ বা ০.৬ আৰু ০.৯ ৰ দৰে দশমিক হিচাপে দিব পাৰে, গতিকে ৰূপান্তৰ স্বাভাৱিক নোহোৱালৈকে দুয়োটা ৰূপৰ অভ্যাস কৰা উচিত।",
      "কিছুমান প্ৰশ্নই এটা চৰ্ত পূৰণ কৰা সংখ্যাৰ যোৰৰ সংখ্যা সোধে। যদি গ.সা.গু. দিয়া আৰু দুটা সংখ্যাৰ যোগফল দিয়া, সংখ্যা দুটাক গ.সা.গু. গুণ দুটা সহ-মৌলিক উৎপাদক হিচাপে লিখক, আৰু প্ৰয়োজনীয় মুঠ যোগ কৰা সহ-মৌলিক যোৰবোৰ গণনা কৰক। এইটো এটা প্ৰিয় ৰূপ কাৰণ ই গ.সা.গু. ৰ সম্পৰ্ক আৰু সহ-মৌলিকৰ অৰ্থ দুয়োটা পৰীক্ষা কৰে, আৰু কঠিন প্ৰশ্নপত্ৰত ই বাৰে বাৰে আহে। এনে যোৰৰ সংখ্যা সাধাৰণতে কম, গতিকে সংখ্যা দুটাক গ.সা.গু. গুণ a আৰু গ.সা.গু. গুণ b ৰূপত লিখাৰ পিছত গণনা কৰা দ্ৰুত।",
      "সহ-মৌলিক সংখ্যাৰ বাবে এটা অনুচ্ছেদ সুকীয়াকৈ প্ৰয়োজন। দুটা সংখ্যা সহ-মৌলিক যদি সিহঁতৰ গ.সা.গু. ১, অৰ্থাৎ সিহঁতে কোনো মৌলিক উৎপাদক ভাগ নকৰে। দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. সিহঁতৰ গুণফল, আৰু ই কেইবাটাও প্ৰশ্ন-ধৰণত সময় ৰাহি কৰে। দুটা ক্ৰমিক স্বাভাৱিক সংখ্যা সদায় সহ-মৌলিক, গতিকে সিহঁতৰ গ.সা.গু. ১। দুটা ক্ৰমিক যুগ্ম সংখ্যা কেতিয়াও সহ-মৌলিক নহয়, কাৰণ সিহঁতে ২ উৎপাদক ভাগ কৰে। ক্ৰমিক সংখ্যাৰ গ.সা.গু. বা ল.সা.গু. সোধা প্ৰশ্ন এই দুটা তথ্যৰে উত্তৰ দিয়া যায়।",
      "প্ৰশ্নপত্ৰত ল.সা.গু. আৰু গ.সা.গু. ৰ লগত আটাইতকৈ বেছি অহা এটা ৰূপ হ'ল অনুপাতৰ সৈতে মিলোৱা। যদি দুটা সংখ্যা এটা দিয়া অনুপাতত আৰু সিহঁতৰ গ.সা.গু. বা ল.সা.গু. দিয়া, সংখ্যা দুটাক সাধাৰণ উৎপাদক গুণ অনুপাতৰ পদ হিচাপে লিখক। উদাহৰণস্বৰূপে, সংখ্যা দুটা ৩ ৰ পৰা ৪ অনুপাতত আৰু গ.সা.গু. ১৫ হ'লে সংখ্যা ৪৫ আৰু ৬০, ল.সা.গু. ১৮০। ল.সা.গু. দিয়া থাকিলে, ল.সা.গু. হৈছে সাধাৰণ উৎপাদক গুণ অনুপাতৰ পদবোৰৰ গুণফল, গতিকে ৩০০ ল.সা.গু. আৰু ৫ ৰ পৰা ৬ অনুপাতত সাধাৰণ উৎপাদক ১০ আৰু গ.সা.গু. ১০। এইটো এটা অতি দ্ৰুত আৰু নিৰ্ভৰযোগ্য পদ্ধতি।",
      "আন এটা সচৰাচৰ প্ৰশ্নই সৰ্বাধিক আৰু সৰ্বনিম্ন সংখ্যা সোধে। কেইবাটাও সংখ্যাৰে বিভাজ্য আটাইতকৈ ডাঙৰ চাৰিটা অংকৰ সংখ্যা পাবলৈ, প্ৰথমে ল.সা.গু. বিচাৰি ৯৯৯৯ ক ল.সা.গু.ৰে হৰণ কৰি ভাগশেষ আঁতৰাওক; আৰু আটাইতকৈ সৰু পাঁচটা অংকৰ সংখ্যা পাবলৈ, ল.সা.গু. বিচাৰি ১০০০০ ক ল.সা.গু.ৰে হৰণ কৰি পৰৱৰ্তী গুণিতকলৈ যাওক। এই দুটা ৰূপ বাৰে বাৰে আহে আৰু পদ্ধতিটো একেই, কেৱল সীমা সংখ্যাটো সলনি হয়। এইবোৰ মনত ৰাখিলে অধ্যায়টো আৰু অধিক দ্ৰুত হৈ পৰে আৰু প্ৰশ্নপত্ৰত নিশ্চিত নম্বৰ দিয়ে।",
      "শেষত, অধ্যায়টোৱে কেইটামান মনত ৰখা ফলাফলক পুৰস্কৃত কৰে। এটা সংহতিৰ সংখ্যাবোৰৰ গ.সা.গু. কেতিয়াও সংহতিৰ আটাইতকৈ সৰু সংখ্যাতকৈ বেছি নহয়, আৰু ল.সা.গু. কেতিয়াও আটাইতকৈ ডাঙৰ সংখ্যাতকৈ কম নহয়। গ.সা.গু. এ ল.সা.গু. ক সঠিকভাৱে হৰণ কৰে, কাৰণ ল.সা.গু. ত যিকোনো সংখ্যাত থকা প্ৰতিটো মৌলিক ঘাত থাকে। আৰু তিনিটা সংখ্যাৰ বাবে গ.সা.গু. আৰু ল.সা.গু. ৰ গুণফল সংখ্যাবোৰৰ গুণফলৰ সমান নহয়, গতিকে দুটা সংখ্যাৰ সম্পৰ্কটো অসাৱধানভাৱে আগবঢ়াব নালাগে। এই সীমা আৰু সম্পৰ্কবোৰ মনত ৰখা প্ৰাৰ্থীয়ে প্ৰায়ে কোনো গণনা নকৰাকৈয়ে দুটা বা তিনিটা বিকল্প চকুৰে চাই আঁতৰাব পাৰে।",
      "এই অধ্যায়ৰ অভ্যাস গতি আৰু প্ৰশ্নৰ ৰূপ চিনি পোৱাত কেন্দ্ৰিত হোৱা উচিত। সৰু সংখ্যাবোৰ চাবলগীয়াকৈ উৎপাদকীকৰণ কৰিবলৈ শিকক, গ.সা.গু. আৰু ল.সা.গু. ৰ সম্পৰ্ক সাজু ৰাখক, আৰু এটা শব্দ-সমস্যা পঢ়ি কেইচেকেণ্ডতে ই ল.সা.গু., পাৰ্থক্যৰ গ.সা.গু., নাইবা ভাগশেষ বিয়োগ কৰাৰ পিছৰ গ.সা.গু. বিচাৰে নেকি সেইটো ঠিক কৰিবলৈ নিজকে প্ৰশিক্ষণ দিয়ক। প্ৰশ্নপত্ৰৰ সংখ্যাবোৰ সাৱলীল হোৱাকৈ বাছনি কৰা হয়, গতিকে স্পষ্ট পদ্ধতিয়ে কেঁচা গণনাক সদায় হৰাই যায়, আৰু তেতিয়া এই অধ্যায়টো গণিত শাখাৰ আটাইতকৈ নিৰ্ভৰযোগ্য নম্বৰৰ উৎস হৈ পৰে।",
    ],
  },
  list: {
    en: [
      "HCF is the greatest number that divides each of the given numbers exactly; LCM is the smallest number that each of them divides exactly.",
      "Prime factorise, then take the lowest power of the common primes for the HCF and the highest power of all primes for the LCM.",
      "For two numbers, HCF × LCM = product of the numbers, so any one value can be found from the other three.",
      "Least number leaving the same remainder r: LCM of the numbers plus r.",
      "Greatest number dividing several numbers leaving the same remainder: HCF of their differences.",
      "Greatest number dividing several numbers leaving given remainders: HCF of the numbers after subtracting each remainder.",
      "Bells, traffic lights, runners on a track and tiles forming a square are all LCM questions.",
      "LCM of fractions = LCM of numerators ÷ HCF of denominators; HCF of fractions = HCF of numerators ÷ LCM of denominators.",
      "The LCM of two co-prime numbers is their product, and the HCF of two consecutive numbers is 1.",
      "The HCF divides the LCM exactly; the HCF never exceeds the smallest number and the LCM never falls below the largest.",
    ],
    as: [
      "গ.সা.গু. হৈছে দিয়া সংখ্যাবোৰৰ প্ৰতিটোক সঠিকভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা; ল.সা.গু. হৈছে আটাইতকৈ সৰু সংখ্যা যাক সিহঁতৰ প্ৰতিটোৱে সঠিকভাৱে হৰণ কৰে।",
      "মৌলিক উৎপাদকীকৰণ কৰি, গ.সা.গু. ৰ বাবে সাধাৰণ মৌলিকবোৰৰ আটাইতকৈ কম ঘাত আৰু ল.সা.গু. ৰ বাবে গোটেই মৌলিকৰ আটাইতকৈ বেছি ঘাত লওক।",
      "দুটা সংখ্যাৰ বাবে, গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটাৰ গুণফল, গতিকে এটা মান বাকী তিনিটাৰ পৰা পোৱা যায়।",
      "একে ভাগশেষ r ৰখা আটাইতকৈ সৰু সংখ্যা: সংখ্যাবোৰৰ ল.সা.গু. যোগ r।",
      "কেইবাটাও সংখ্যাক হৰণ কৰিলে একে ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা: সিহঁতৰ পাৰ্থক্যৰ গ.সা.গু.।",
      "কেইবাটাও সংখ্যাক হৰণ কৰিলে দিয়া ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা: প্ৰতিটো ভাগশেষ বিয়োগ কৰাৰ পিছত সংখ্যাবোৰৰ গ.সা.গু.।",
      "ঘণ্টা, ট্ৰাফিক বতি, পথত দৌৰবিদ আৰু বৰ্গ গঢ়া টাইল — এই সকলো ল.সা.গু. ৰ প্ৰশ্ন।",
      "ভগ্নাংশৰ ল.সা.গু. = লৱবোৰৰ ল.সা.গু. ÷ হৰবোৰৰ গ.সা.গু.; ভগ্নাংশৰ গ.সা.গু. = লৱবোৰৰ গ.সা.গু. ÷ হৰবোৰৰ ল.সা.গু.।",
      "দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. সিহঁতৰ গুণফল, আৰু দুটা ক্ৰমিক সংখ্যাৰ গ.সা.গু. ১।",
      "গ.সা.গু. এ ল.সা.গু. ক সঠিকভাৱে হৰণ কৰে; গ.সা.গু. কেতিয়াও আটাইতকৈ সৰু সংখ্যাতকৈ বেছি নহয় আৰু ল.সা.গু. কেতিয়াও আটাইতকৈ ডাঙৰ সংখ্যাতকৈ কম নহয়।",
    ],
  },
  faqs: [
    {
      q: { en: "What is the relation between the HCF and the LCM of two numbers?", as: "দুটা সংখ্যাৰ গ.সা.গু. আৰু ল.সা.গু. ৰ মাজৰ সম্পৰ্ক কি?" },
      a: {
        en: "For any two numbers the product of their HCF and their LCM equals the product of the numbers. So if any three of the four values are known, the fourth can be found at once, which answers a large family of questions.",
        as: "যিকোনো দুটা সংখ্যাৰ বাবে সিহঁতৰ গ.সা.গু. আৰু ল.সা.গু. ৰ গুণফল সংখ্যা দুটাৰ গুণফলৰ সমান। গতিকে চাৰিটা মানৰ যিকোনো তিনিটা জনা থাকিলে চতুৰ্থটো তৎক্ষণাত পোৱা যায়, যিয়ে বহু প্ৰশ্নৰ উত্তৰ দিয়ে।",
      },
    },
    {
      q: { en: "How do I find the HCF and the LCM by prime factorisation?", as: "মৌলিক উৎপাদকীকৰণৰ জৰিয়তে গ.সা.গু. আৰু ল.সা.গু. কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Write each number as a product of powers of primes. The HCF is the product of the lowest power of every prime that appears in all the numbers, and the LCM is the product of the highest power of every prime that appears in any of them.",
        as: "প্ৰতিটো সংখ্যাক মৌলিকৰ ঘাতৰ গুণফল হিচাপে লিখক। গ.সা.গু. হৈছে গোটেই সংখ্যাত দেখা পোৱা প্ৰতিটো মৌলিকৰ আটাইতকৈ কম ঘাতৰ গুণফল, আৰু ল.সা.গু. হৈছে যিকোনো সংখ্যাত দেখা পোৱা প্ৰতিটো মৌলিকৰ আটাইতকৈ বেছি ঘাতৰ গুণফল।",
      },
    },
    {
      q: { en: "Which word problems use the LCM?", as: "কোনবোৰ শব্দ-সমস্যাই ল.সা.গু. ব্যৱহাৰ কৰে?" },
      a: {
        en: "Problems about bells ringing together, traffic lights changing together, runners meeting at the starting point, soldiers arranged in rows and rectangular tiles forming the smallest square are all LCM questions, because each asks for a least or a together event.",
        as: "একেলগে বজা ঘণ্টা, একেলগে সলনি হোৱা ট্ৰাফিক বতি, আৰম্ভণি বিন্দুত লগ লগা দৌৰবিদ, শাৰীত সজোৱা সৈনিক আৰু আটাইতকৈ সৰু বৰ্গ গঢ়া আয়তাকাৰ টাইল — এইবোৰ ল.সা.গু. ৰ প্ৰশ্ন, কাৰণ প্ৰতিটোৱে আটাইতকৈ কম বা একেলগে হোৱা ঘটনা সোধে।",
      },
    },
    {
      q: { en: "Which word problems use the HCF?", as: "কোনবোৰ শব্দ-সমস্যাই গ.সা.গু. ব্যৱহাৰ কৰে?" },
      a: {
        en: "Questions that ask for the greatest number dividing several numbers, with the same remainder or with given remainders, use the HCF. For the same remainder take the HCF of the differences; for given remainders subtract each remainder first and then take the HCF.",
        as: "কেইবাটাও সংখ্যাক হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা সোধা প্ৰশ্ন, একে ভাগশেষ বা দিয়া ভাগশেষৰ সৈতে, গ.সা.গু. ব্যৱহাৰ কৰে। একে ভাগশেষৰ বাবে পাৰ্থক্যৰ গ.সা.গু. লওক; দিয়া ভাগশেষৰ বাবে প্ৰথমে প্ৰতিটো ভাগশেষ বিচ্ছিন্ন কৰি তাৰ পিছত গ.সা.গু. লওক।",
      },
    },
    {
      q: { en: "How do I find the LCM or HCF of fractions?", as: "ভগ্নাংশৰ ল.সা.গু. বা গ.সা.গু. কেনেকৈ বিচাৰিম?" },
      a: {
        en: "The LCM of fractions is the LCM of the numerators divided by the HCF of the denominators, and the HCF of fractions is the HCF of the numerators divided by the LCM of the denominators. For decimals, convert to fractions first and convert the answer back at the end.",
        as: "ভগ্নাংশৰ ল.সা.গু. হৈছে লৱবোৰৰ ল.সা.গু. ক হৰবোৰৰ গ.সা.গু.ৰে হৰণ কৰা, আৰু ভগ্নাংশৰ গ.সা.গু. হৈছে লৱবোৰৰ গ.সা.গু. ক হৰবোৰৰ ল.সা.গু.ৰে হৰণ কৰা। দশমিকৰ বাবে প্ৰথমে ভগ্নাংশলৈ ৰূপান্তৰ কৰি শেষত উত্তৰটো পুনৰ দশমিকলৈ ৰূপান্তৰ কৰক।",
      },
    },
  ],
};
