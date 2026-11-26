"use strict";

/* RRB NTPC Mathematics — Number System. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Number System for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে সংখ্যা পদ্ধতি" },
  p: {
    en: [
      "The number system is the first chapter of arithmetic in the RRB NTPC Mathematics paper and it supports every other chapter. A candidate who is clear about the kinds of numbers, the place value of a digit, divisibility and the unit digit can answer quickly, because these questions are short and need no long calculation. In CBT-1 and CBT-2 the paper usually carries two or three questions from this area, and they are among the safest marks in the section if the basics are ready.",
      "The numbers we use are arranged in a clear family. The natural numbers are the counting numbers 1, 2, 3 and so on. When zero is included with the natural numbers the set becomes the whole numbers. The integers add the negative numbers, so they run ... -2, -1, 0, 1, 2 ... . A rational number can be written as a fraction of two integers with a non-zero denominator, and its decimal form either ends or repeats. An irrational number cannot be written in that way, and its decimal never ends and never repeats. Numbers like the square root of 2 and pi are irrational, while 22/7 is only an approximation of pi and is itself rational.",
      "Prime numbers are the building blocks of the whole number system. A prime number has exactly two factors, one and itself. The number 2 is the smallest prime and the only even prime. The number 1 is neither prime nor composite, because it has only one factor. A composite number has more than two factors. Two primes that differ by 2, such as 5 and 7 or 11 and 13, are called twin primes, and this pair is asked directly. Learning the primes up to 100 is worth the effort, because many questions ask for the number of primes in a range or for the largest prime below a limit.",
      "The place value and the face value of a digit are asked very often and are easy marks. The face value of a digit is the digit itself, whatever its position. The place value depends on the position, so in the number 5,47,320 the digit 4 stands in the ten-thousands place and its place value is 40,000, while its face value is only 4. The difference between the place value and the face value of that digit is therefore 39,996. A question may also ask for the greatest or the smallest number formed from a given set of digits; to make the greatest number arrange the digits in descending order, and to make the smallest arrange them in ascending order, but remember that a number cannot begin with zero, so the smallest non-zero digit must come first.",
      "Divisibility rules save time and are asked as statements. A number is divisible by 2 if its last digit is even, and by 5 if it ends in 0 or 5. It is divisible by 3 if the sum of its digits is divisible by 3, and by 9 if the sum of its digits is divisible by 9. For 4 the last two digits must form a number divisible by 4, and for 8 the last three digits must form a number divisible by 8. A number is divisible by 6 when it is divisible by both 2 and 3, and by 11 when the difference between the sums of the digits in the odd and even places is either 0 or a multiple of 11. These rules let a candidate test an option in a few seconds instead of dividing it out.",
      "The HCF and the LCM are two ideas that go together, and questions often join them. The highest common factor, or HCF, is the greatest number that divides each of the given numbers exactly. The least common multiple, or LCM, is the smallest number that each of the given numbers divides exactly. For any two numbers, the product of their HCF and their LCM is equal to the product of the numbers themselves, so if three of the four values are known the fourth can be found at once. This single relation answers a whole family of questions and should be memorised.",
      "Many word problems are built on the LCM and the HCF. If a question asks for the least number that leaves the same remainder when divided by several numbers, the answer is the LCM of those numbers plus the common remainder. If it asks for the greatest number that divides several numbers leaving the same remainder, the answer is the HCF of the differences of those numbers. If it asks for the smallest number that is exactly divisible by several numbers, the answer is simply their LCM. Recognising which of these three shapes a question has is the whole skill.",
      "The unit digit of a large power is a favourite question because it needs no full calculation. The unit digit of a power repeats in a short cycle. For the base 2 the cycle is 2, 4, 8, 6, and for the base 3 it is 3, 9, 7, 1. For the base 4 the unit digit is 4 for an odd power and 6 for an even power, and for the base 9 it is 9 for an odd power and 1 for an even power. The bases 5 and 6 always keep the same unit digit, and the bases 0 and 1 do the same. To find the unit digit, divide the power by the length of the cycle and use the remainder to pick the term of the cycle.",
      "The number of factors of a number is found by prime factorisation. Write the number as a product of powers of primes, then add one to each power and multiply. For example 60 is 2 squared times 3 times 5, so the number of factors is (2+1)(1+1)(1+1), which is 12. The same factorisation gives the sum of the factors and the number of ways to write the number as a product of two factors. The number of trailing zeros in a factorial is found by counting the number of times 5 appears in it, so in 20 factorial there are 20 divided by 5, that is 4 zeros, and in 100 factorial there are 20 plus 4, that is 24 zeros.",
      "Squares, cubes and their roots are asked as direct values and as perfect-square problems. A perfect square is a number that is the product of an integer with itself, and a perfect cube is the product of an integer with itself twice. To make a given number a perfect square, prime-factorise it and multiply or divide by the missing or extra prime so that every power becomes even. Learning the squares up to 30 and the cubes up to 15 by heart removes almost all the work from these questions.",
      "Fractions and decimals belong to the same chapter because a fraction can always be turned into a decimal and a decimal into a fraction. To compare fractions quickly, convert them to decimals or give them a common denominator. A terminating decimal such as 0.375 becomes 375/1000, which reduces to 3/8. A recurring decimal such as 0.666 repeating becomes 2/3, because the digit 6 repeats from the first place. While multiplying decimals, count the total number of decimal places in the two numbers and put that many places in the answer, and while dividing, first make the divisor a whole number by shifting the decimal point in both numbers.",
      "Series and sums appear in the paper as short formulas. The sum of the first n natural numbers is n times n plus one, divided by two. The sum of the first n odd numbers is n squared, and the sum of the first n even numbers is n times n plus one. The sum of the squares of the first n natural numbers is n times n plus one times two n plus one, divided by six, and the sum of the cubes of the first n natural numbers is the square of the sum of the first n natural numbers. These four results cover nearly every series question in the paper.",
      "Roman numerals and the idea of a number line complete the chapter. In the Roman system the letters I, V, X, L, C, D and M stand for one, five, ten, fifty, one hundred, five hundred and one thousand. When a smaller letter is written before a larger one its value is subtracted, as in IV for four and XL for forty, and when it is written after, its value is added, as in VI for six. On the number line the distance of a number from zero is its absolute value, so the absolute value of minus twenty-three is twenty-three, and the number of integers between two given integers is found by counting the whole numbers strictly between them.",
      "Finally, the number system is best revised as a set of small, sharp facts rather than as a long calculation. Keep ready the family of numbers, the list of primes, the divisibility rules, the HCF and LCM relation, the cycles of unit digits, the formulas for the sums of series, and the conversions between fractions and decimals. A candidate who can recall these on demand will find that the number-system questions in the paper are quick to read, quick to solve and easy to score, which is exactly what the section needs.",
    ],
    as: [
      "সংখ্যা পদ্ধতি হৈছে RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰৰ পাটিগণিতৰ প্ৰথম অধ্যায়, আৰু ই আন প্ৰতিটো অধ্যায়ক ধৰি ৰাখে। যি প্ৰাৰ্থীয়ে সংখ্যাৰ প্ৰকাৰ, এটা অংকৰ স্থানীয় মান, বিভাজ্যতা আৰু একক অংক সম্পৰ্কে স্পষ্ট, তেওঁ দ্ৰুতভাৱে উত্তৰ দিব পাৰে, কাৰণ এই প্ৰশ্নবোৰ চুটি আৰু ইয়াত দীঘল গণনাৰ প্ৰয়োজন নাই। CBT-1 আৰু CBT-2 ত সাধাৰণতে এই অংশৰ পৰা দুটা বা তিনিটা প্ৰশ্ন থাকে, আৰু মৌলিক কথাবোৰ সাজু থাকিলে এইবোৰ শাখাটোৰ আটাইতকৈ নিৰাপদ নম্বৰ।",
      "আমি ব্যৱহাৰ কৰা সংখ্যাবোৰ এটা স্পষ্ট পৰিয়ালত সজোৱা। স্বাভাৱিক সংখ্যা হৈছে গণনাৰ সংখ্যা ১, ২, ৩ আদি। শূন্যয়ো স্বাভাৱিক সংখ্যাৰ লগত ল'লে সংহতিটো পূৰ্ণসংখ্যা হয়। পূৰ্ণসংখ্যাত ঋণাত্মক সংখ্যাও যোগ হয়, গতিকে সিহঁত ... −২, −১, ০, ১, ২ ... হিচাপে চলে। এটা পৰিমেয় সংখ্যা শূন্য নহ'ল হৰৰ সৈতে দুটা পূৰ্ণসংখ্যাৰ ভগ্নাংশ হিচাপে লিখিব পাৰি, আৰু ইয়াৰ দশমিক ৰূপ হয় শেষ হয় নাইবা পুনৰাবৃত্তি হয়। এটা অপৰিমেয় সংখ্যা সেইদৰে লিখিব নোৱাৰি, আৰু ইয়াৰ দশমিক কেতিয়াও শেষ নহয় আৰু পুনৰাবৃত্তিও নহয়। ২ ৰ বৰ্গমূল আৰু পাইৰ দৰে সংখ্যা অপৰিমেয়, আনহাতে ২২/৭ পাইৰ কেৱল এটা আসন্ন মান আৰু নিজে পৰিমেয়।",
      "মৌলিক সংখ্যা হৈছে গোটেই সংখ্যা পদ্ধতিৰ নিৰ্মাণ-খণ্ড। এটা মৌলিক সংখ্যাৰ ঠিক দুটা উৎপাদক থাকে, এক আৰু নিজেই। ২ আটাইতকৈ সৰু মৌলিক আৰু একমাত্ৰ যুগ্ম মৌলিক। ১ মৌলিকো নহয় যৌগিকো নহয়, কাৰণ ইয়াৰ কেৱল এটা উৎপাদক। এটা যৌগিক সংখ্যাৰ দুটাতকৈ বেছি উৎপাদক থাকে। ২ ৰ ব্যৱধান থকা দুটা মৌলিক, যেনে ৫ আৰু ৭ বা ১১ আৰু ১৩, যুগল মৌলিক বোলা হয়, আৰু এই যোৰটো পোনপটীয়াকৈ সোধা হয়। ১০০ লৈকে মৌলিকবোৰ শিকি লোৱাটো পৰিশ্ৰমৰ যোগ্য, কাৰণ বহু প্ৰশ্নই এটা পৰিসৰত মৌলিকৰ সংখ্যা বা এটা সীমাৰ তলৰ আটাইতকৈ ডাঙৰ মৌলিক সোধে।",
      "এটা অংকৰ স্থানীয় মান আৰু অভিহিত মান প্ৰায়ে সোধা হয় আৰু এইবোৰ সহজ নম্বৰ। এটা অংকৰ অভিহিত মান হৈছে অংকটো নিজেই, ইয়াৰ অৱস্থান যিয়েই নহওক। স্থানীয় মান অৱস্থানৰ ওপৰত নিৰ্ভৰ কৰে, গতিকে ৫,৪৭,৩২০ সংখ্যাটোত ৪ অংকটো দহ-হাজাৰৰ স্থানত আছে আৰু ইয়াৰ স্থানীয় মান ৪০,০০০, আনহাতে ইয়াৰ অভিহিত মান কেৱল ৪। সেই অংকটোৰ স্থানীয় মান আৰু অভিহিত মানৰ পাৰ্থক্য গতিকে ৩৯,৯৯৬। এটা প্ৰশ্নই দিয়া অংকৰ সংহতিৰ পৰা আটাইতকৈ ডাঙৰ বা আটাইতকৈ সৰু সংখ্যাও সোধে; আটাইতকৈ ডাঙৰ সংখ্যা কৰিবলৈ অংকবোৰ অৱৰোহী ক্ৰমত সজাওক, আৰু আটাইতকৈ সৰু কৰিবলৈ ঊৰ্ধ্বক্ৰমে সজাওক, কিন্তু মনত ৰাখক এটা সংখ্যা শূন্যৰে আৰম্ভ হ'ব নোৱাৰে, গতিকে আটাইতকৈ সৰু অশূন্য অংকটো প্ৰথমে থাকিব লাগে।",
      "বিভাজ্যতাৰ নিয়মে সময় ৰাহি কৰে আৰু এইবোৰ বাক্য হিচাপে সোধা হয়। এটা সংখ্যা ২ ৰে বিভাজ্য যদি ইয়াৰ শেষ অংকটো যুগ্ম, আৰু ৫ ৰে বিভাজ্য যদি শেষত ০ বা ৫ থাকে। ই ৩ ৰে বিভাজ্য যদি ইয়াৰ অংকৰ যোগফল ৩ ৰে বিভাজ্য, আৰু ৯ ৰে বিভাজ্য যদি অংকৰ যোগফল ৯ ৰে বিভাজ্য। ৪ ৰ বাবে শেষৰ দুটা অংক আৰু ৮ ৰ বাবে শেষৰ তিনিটা অংকৰ সংখ্যাটো সেই সংখ্যাৰে বিভাজ্য হ'ব লাগে। এটা সংখ্যা ৬ ৰে বিভাজ্য যেতিয়া ই ২ আৰু ৩ দুয়োটাৰে বিভাজ্য, আৰু ১১ ৰে বিভাজ্য যেতিয়া অযুগ্ম আৰু যুগ্ম স্থানৰ অংকৰ যোগফলৰ পাৰ্থক্য ০ বা ১১ ৰ গুণিতক। এই নিয়মবোৰে এটা বিকল্পক হৰণ নকৰাকৈ কেইচেকেণ্ডতে পৰীক্ষা কৰিব দিয়ে।",
      "গ.সা.গু. আৰু ল.সা.গু. দুটা ধাৰণা যি একেলগে চলে, আৰু প্ৰশ্নই প্ৰায়ে এই দুটাক জোৰে। গৰিষ্ঠ সাধাৰণ উৎপাদক, অৰ্থাৎ গ.সা.গু., হৈছে দিয়া সংখ্যাবোৰৰ প্ৰতিটোক সঠিকভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা। লঘিষ্ঠ সাধাৰণ গুণিতক, অৰ্থাৎ ল.সা.গু., হৈছে আটাইতকৈ সৰু সংখ্যা যাক দিয়া সংখ্যাবোৰৰ প্ৰতিটোৱে সঠিকভাৱে হৰণ কৰে। যিকোনো দুটা সংখ্যাৰ বাবে, সিহঁতৰ গ.সা.গু. আৰু ল.সা.গু. ৰ গুণফল সংখ্যা দুটাৰ গুণফলৰ সমান, গতিকে চাৰিটা মানৰ তিনিটা জনা থাকিলে চতুৰ্থটো তৎক্ষণাত পোৱা যায়। এই এটা সম্পৰ্কই এটা গোটেই প্ৰশ্ন-পৰিয়ালৰ উত্তৰ দিয়ে আৰু ইয়াক মনত ৰখা উচিত।",
      "বহু শব্দ-সমস্যা ল.সা.গু. আৰু গ.সা.গু. ৰ ওপৰত গঢ় লয়। এটা প্ৰশ্নই যদি কেইবাটাও সংখ্যাৰে হৰণ কৰিলে একে ভাগশেষ ৰখা আটাইতকৈ সৰু সংখ্যা সোধে, উত্তৰটো হৈছে সেই সংখ্যাবোৰৰ ল.সা.গু. যোগ সাধাৰণ ভাগশেষ। যদি ই কেইবাটাও সংখ্যাক হৰণ কৰিলে একে ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা সোধে, উত্তৰটো হৈছে সেই সংখ্যাবোৰৰ পাৰ্থক্যৰ গ.সা.গু.। যদি ই কেইবাটাও সংখ্যাৰে সঠিকভাৱে বিভাজ্য আটাইতকৈ সৰু সংখ্যা সোধে, উত্তৰটো হৈছে সিহঁতৰ ল.সা.গু.। এটা প্ৰশ্নৰ এই তিনি ৰূপৰ কোনটো আছে তাক চিনি পোৱাটোৱেই গোটেই দক্ষতা।",
      "এটা ডাঙৰ ঘাতৰ একক অংক এটা প্ৰিয় প্ৰশ্ন কাৰণ ইয়াত সম্পূৰ্ণ গণনাৰ প্ৰয়োজন নাই। এটা ঘাতৰ একক অংক এটা চুটি চক্ৰত পুনৰাবৃত্তি হয়। ২ ভূমিৰ বাবে চক্ৰটো ২, ৪, ৮, ৬, আৰু ৩ ভূমিৰ বাবে ই ৩, ৯, ৭, ১। ৪ ভূমিৰ বাবে একক অংক অযুগ্ম ঘাতত ৪ আৰু যুগ্ম ঘাতত ৬, আৰু ৯ ভূমিৰ বাবে অযুগ্ম ঘাতত ৯ আৰু যুগ্ম ঘাতত ১। ৫ আৰু ৬ ভূমিয়ে সদায় একে একক অংক ৰাখে, আৰু ০ আৰু ১ ভূমিয়েও একেই কৰে। একক অংক বিচাৰিবলৈ ঘাতটোক চক্ৰৰ দৈৰ্ঘ্যৰে হৰণ কৰি ভাগশেষৰে চক্ৰৰ পদটো বাছনি কৰক।",
      "এটা সংখ্যাৰ উৎপাদকৰ সংখ্যা মৌলিক উৎপাদকীকৰণৰ জৰিয়তে পোৱা যায়। সংখ্যাটো মৌলিকৰ ঘাতৰ গুণফল হিচাপে লিখক, তাৰ পিছত প্ৰতিটো ঘাতত এক যোগ কৰি পূৰণ কৰক। উদাহৰণস্বৰূপে ৬০ হৈছে ২ ৰ বৰ্গ গুণ ৩ গুণ ৫, গতিকে উৎপাদকৰ সংখ্যা (২+১)(১+১)(১+১), যি ১২। একেই উৎপাদকীকৰণে উৎপাদকৰ যোগফল আৰু সংখ্যাটোক দুটা উৎপাদকৰ গুণফল হিচাপে লিখাৰ উপায়ৰ সংখ্যাও দিয়ে। এটা ক্ৰমগুণিতকৰ শেষৰ শূন্যৰ সংখ্যা তাত ৫ কিমানবাৰ আছে গণনা কৰি পোৱা যায়, গতিকে ২০ ক্ৰমগুণিতকত ২০ ক ৫ ৰে হৰণ কৰা, অৰ্থাৎ ৪ টা শূন্য, আৰু ১০০ ক্ৰমগুণিতকত ২০ যোগ ৪, অৰ্থাৎ ২৪ টা শূন্য।",
      "বৰ্গ, ঘন আৰু সিহঁতৰ মূল পোনপটীয়া মান আৰু পূৰ্ণবৰ্গ সমস্যা হিচাপে সোধা হয়। এটা পূৰ্ণবৰ্গ হৈছে এটা পূৰ্ণসংখ্যাক নিজৰ সৈতে পূৰণ কৰি পোৱা সংখ্যা, আৰু এটা পূৰ্ণঘন হৈছে এটা পূৰ্ণসংখ্যাক দুবাৰ নিজৰ সৈতে পূৰণ কৰি পোৱা সংখ্যা। এটা দিয়া সংখ্যাক পূৰ্ণবৰ্গ কৰিবলৈ ইয়াক মৌলিক উৎপাদকীকৰণ কৰি অনুপস্থিত বা অতিৰিক্ত মৌলিকৰে পূৰণ বা হৰণ কৰক যাতে প্ৰতিটো ঘাত যুগ্ম হয়। ৩০ লৈকে বৰ্গ আৰু ১৫ লৈকে ঘন মনত ৰাখিলে এই প্ৰশ্নবোৰৰ প্ৰায় গোটেই পৰিশ্ৰম আঁতৰি যায়।",
      "ভগ্নাংশ আৰু দশমিক একে অধ্যায়ৰ কাৰণ এটা ভগ্নাংশক সদায় দশমিকলৈ আৰু এটা দশমিকক ভগ্নাংশলৈ ৰূপান্তৰ কৰিব পাৰি। ভগ্নাংশ দ্ৰুতভাৱে তুলনা কৰিবলৈ সিহঁতক দশমিকলৈ ৰূপান্তৰ কৰক বা সাধাৰণ হৰণ দিয়ক। এটা অন্ত দশমিক যেনে ০.৩৭৫ হৈছে ৩৭৫/১০০০, যি ৩/৮ লৈ সৰল হয়। এটা আৱৰ্ত দশমিক যেনে ০.৬৬৬ পুনৰাবৃত্তি হৈছে ২/৩, কাৰণ ৬ অংকটো প্ৰথম স্থানৰ পৰা পুনৰাবৃত্তি হয়। দশমিক পূৰণ কৰোঁতে দুয়োটা সংখ্যাত থকা মুঠ দশমিক স্থান গণনা কৰি উত্তৰত সিমান স্থান ৰাখক, আৰু হৰণ কৰোঁতে প্ৰথমে দুয়োটা সংখ্যাত দশমিক বিন্দু লুটিয়াই হৰণক এটা পূৰ্ণসংখ্যা কৰক।",
      "শৃংখলা আৰু যোগফল প্ৰশ্নপত্ৰত চুটি সূত্ৰ হিচাপে আহে। প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ যোগফল n গুণ n যোগ এক, দুৰে হৰণ। প্ৰথম n টা অযুগ্ম সংখ্যাৰ যোগফল n ৰ বৰ্গ, আৰু প্ৰথম n টা যুগ্ম সংখ্যাৰ যোগফল n গুণ n যোগ এক। প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ যোগফল n গুণ n যোগ এক গুণ দুই n যোগ এক, ছয়েৰে হৰণ, আৰু প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ ঘনৰ যোগফল হৈছে প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ যোগফলৰ বৰ্গ। এই চাৰিটা ফলাফলে প্ৰশ্নপত্ৰৰ প্ৰায় প্ৰতিটো শৃংখলা প্ৰশ্ন সামৰি লয়।",
      "ৰোমান অংক আৰু সংখ্যাৰেখাৰ ধাৰণাই অধ্যায়টো সামৰে। ৰোমান পদ্ধতিত I, V, X, L, C, D আৰু M আখৰে এক, পাঁচ, দহ, পঞ্চাশ, এশ, পাঁচশ আৰু এহেজাৰ বুজায়। এটা সৰু আখৰ ডাঙৰ এটাৰ আগত লিখিলে ইয়াৰ মান বিয়োগ হয়, যেনে চাৰিৰ বাবে IV আৰু চল্লিশৰ বাবে XL, আৰু পিছত লিখিলে ইয়াৰ মান যোগ হয়, যেনে ছয়ৰ বাবে VI। সংখ্যাৰেখাত এটা সংখ্যাৰ শূন্যৰ পৰা দূৰত্ব হৈছে ইয়াৰ পৰম মান, গতিকে ঋণাত্মক তেইছৰ পৰম মান তেইছ, আৰু দুটা দিয়া পূৰ্ণসংখ্যাৰ মাজত থকা পূৰ্ণসংখ্যাৰ সংখ্যা সিহঁতৰ মাজত কঠোৰভাৱে থকা পূৰ্ণসংখ্যাবোৰ গণনা কৰি পোৱা যায়।",
      "শেষত, সংখ্যা পদ্ধতি দীঘল গণনা হিচাপে নহয়, সৰু আৰু তীক্ষ্ণ তথ্যৰ এটা সংহতি হিচাপে পুনৰাবৃত্তি কৰা ভাল। সংখ্যাৰ পৰিয়াল, মৌলিকৰ তালিকা, বিভাজ্যতাৰ নিয়ম, গ.সা.গু. আৰু ল.সা.গু. ৰ সম্পৰ্ক, একক অংকৰ চক্ৰ, শৃংখলাৰ যোগফলৰ সূত্ৰ, আৰু ভগ্নাংশ আৰু দশমিকৰ ৰূপান্তৰ সাজু ৰাখক। যি প্ৰাৰ্থীয়ে এইবোৰ বিচাৰিলে মনত পেলাব পাৰে, তেওঁ দেখিব প্ৰশ্নপত্ৰৰ সংখ্যা-পদ্ধতিৰ প্ৰশ্নবোৰ পঢ়িবলৈ চুটি, সমাধান কৰিবলৈ চুটি আৰু নম্বৰ কৰিবলৈ সহজ, যিটোৱেই শাখাটোৰ প্ৰয়োজন।",
    ],
  },
  list: {
    en: [
      "Natural numbers start at 1; whole numbers include 0; integers include the negatives too.",
      "2 is the smallest and the only even prime; 1 is neither prime nor composite.",
      "Place value depends on the position of the digit, while the face value is the digit itself.",
      "Divisibility: by 2 (even last digit), 3 (digit sum), 4 (last two digits), 5 (ends 0 or 5), 8 (last three digits), 9 (digit sum), 11 (alternating digit-sum difference).",
      "HCF x LCM = product of the two numbers.",
      "Least number leaving the same remainder = LCM of the numbers + the remainder.",
      "Greatest number dividing several numbers leaving the same remainder = HCF of their differences.",
      "Unit-digit cycles: 2 -> 2,4,8,6; 3 -> 3,9,7,1; 4 -> 4 (odd), 6 (even); 9 -> 9 (odd), 1 (even).",
      "Number of factors: prime-factorise, add 1 to each power, multiply.",
      "Trailing zeros in n! = [n/5] + [n/25] + [n/125] + ... .",
      "Sum of first n natural numbers = n(n+1)/2; of squares = n(n+1)(2n+1)/6; of cubes = [n(n+1)/2]^2.",
      "0.375 = 3/8 and 0.666... = 2/3 are standard fraction-decimal conversions.",
      "Roman numerals: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.",
    ],
    as: [
      "স্বাভাৱিক সংখ্যা ১ ৰ পৰা আৰম্ভ হয়; পূৰ্ণসংখ্যাত ০ পৰে; পূৰ্ণসংখ্যাত ঋণাত্মকো পৰে।",
      "২ আটাইতকৈ সৰু আৰু একমাত্ৰ যুগ্ম মৌলিক; ১ মৌলিকো নহয় যৌগিকো নহয়।",
      "স্থানীয় মান অংকৰ অৱস্থানৰ ওপৰত নিৰ্ভৰ কৰে, আনহাতে অভিহিত মান হৈছে অংকটো নিজেই।",
      "বিভাজ্যতা: ২ ৰে (যুগ্ম শেষ অংক), ৩ ৰে (অংকৰ যোগফল), ৪ ৰে (শেষৰ দুটা অংক), ৫ ৰে (শেষত ০ বা ৫), ৮ ৰে (শেষৰ তিনিটা অংক), ৯ ৰে (অংকৰ যোগফল), ১১ ৰে (একান্তৰ অংক-যোগফলৰ পাৰ্থক্য)।",
      "গ.সা.গু. × ল.সা.গু. = দুটা সংখ্যাৰ গুণফল।",
      "একে ভাগশেষ ৰখা আটাইতকৈ সৰু সংখ্যা = সংখ্যাবোৰৰ ল.সা.গু. + ভাগশেষ।",
      "কেইবাটাও সংখ্যাক হৰণ কৰিলে একে ভাগশেষ ৰখা আটাইতকৈ ডাঙৰ সংখ্যা = সিহঁতৰ পাৰ্থক্যৰ গ.সা.গু.।",
      "একক অংকৰ চক্ৰ: ২ -> ২,৪,৮,৬; ৩ -> ৩,৯,৭,১; ৪ -> ৪ (অযুগ্ম), ৬ (যুগ্ম); ৯ -> ৯ (অযুগ্ম), ১ (যুগ্ম)।",
      "উৎপাদকৰ সংখ্যা: মৌলিক উৎপাদকীকৰণ কৰি প্ৰতিটো ঘাতত ১ যোগ কৰি পূৰণ কৰক।",
      "n! ৰ শেষৰ শূন্য = [n/৫] + [n/২৫] + [n/১২৫] + ... ।",
      "প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ যোগফল = n(n+১)/২; বৰ্গৰ = n(n+১)(২n+১)/৬; ঘনৰ = [n(n+১)/২]²।",
      "০.৩৭৫ = ৩/৮ আৰু ০.৬৬৬... = ২/৩ প্ৰামাণিক ভগ্নাংশ-দশমিক ৰূপান্তৰ।",
      "ৰোমান অংক: IV = ৪, IX = ৯, XL = ৪০, XC = ৯০, CD = ৪০০, CM = ৯০০।",
    ],
  },
  faqs: [
    {
      q: { en: "Is 1 a prime number?", as: "১ মৌলিক সংখ্যা নেকি?" },
      a: {
        en: "No. A prime number must have exactly two factors, one and itself. The number 1 has only one factor, so it is neither prime nor composite, and the smallest prime number is 2.",
        as: "নহয়। এটা মৌলিক সংখ্যাৰ ঠিক দুটা উৎপাদক থাকিব লাগে, এক আৰু নিজেই। ১ ৰ কেৱল এটা উৎপাদক, গতিকে ই মৌলিকো নহয় যৌগিকো নহয়, আৰু আটাইতকৈ সৰু মৌলিক সংখ্যা ২।",
      },
    },
    {
      q: { en: "How do I find the unit digit of a large power quickly?", as: "এটা ডাঙৰ ঘাতৰ একক অংক দ্ৰুতভাৱে কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Learn the short cycle of the unit digit of the base. For 2 the cycle is 2, 4, 8, 6 and for 3 it is 3, 9, 7, 1. Divide the power by the length of the cycle and use the remainder to pick the term; a remainder of zero means the last term of the cycle.",
        as: "ভূমিৰ একক অংকৰ চুটি চক্ৰটো শিকক। ২ ৰ বাবে চক্ৰটো ২, ৪, ৮, ৬ আৰু ৩ ৰ বাবে ৩, ৯, ৭, ১। ঘাতটোক চক্ৰৰ দৈৰ্ঘ্যৰে হৰণ কৰি ভাগশেষৰে পদটো বাছনি কৰক; ভাগশেষ শূন্য হ'লে চক্ৰৰ শেষ পদটো ল'ব লাগে।",
      },
    },
    {
      q: { en: "What is the relation between HCF and LCM?", as: "গ.সা.গু. আৰু ল.সা.গু. ৰ মাজৰ সম্পৰ্ক কি?" },
      a: {
        en: "For any two numbers, the HCF multiplied by the LCM equals the product of the two numbers. So if any three of the four values are known, the fourth can be found at once, which answers a large family of questions.",
        as: "যিকোনো দুটা সংখ্যাৰ বাবে, গ.সা.গু. ৰ লগত ল.সা.গু. পূৰণ কৰিলে সংখ্যা দুটাৰ গুণফল পোৱা যায়। গতিকে চাৰিটা মানৰ যিকোনো তিনিটা জনা থাকিলে চতুৰ্থটো তৎক্ষণাত পোৱা যায়, যিয়ে বহু প্ৰশ্নৰ উত্তৰ দিয়ে।",
      },
    },
    {
      q: { en: "How many zeros are there at the end of 100 factorial?", as: "১০০ ক্ৰমগুণিতকৰ শেষত কিমানটা শূন্য থাকে?" },
      a: {
        en: "Count the number of 5s in 100 factorial. It is 100 divided by 5 plus 100 divided by 25, which is 20 plus 4, so there are 24 trailing zeros.",
        as: "১০০ ক্ৰমগুণিতকত ৫ ৰ সংখ্যা গণনা কৰক। ই হৈছে ১০০ ক ৫ ৰে হৰণ যোগ ১০০ ক ২৫ ৰে হৰণ, অৰ্থাৎ ২০ যোগ ৪, গতিকে ২৪ টা শূন্য।",
      },
    },
    {
      q: { en: "Which divisibility rules are used most in the paper?", as: "প্ৰশ্নপত্ৰত কোনবোৰ বিভাজ্যতাৰ নিয়ম আটাইতকৈ বেছি ব্যৱহাৰ হয়?" },
      a: {
        en: "The rules for 2, 3, 4, 5, 6, 8, 9 and 11 come up again and again. Among them the digit-sum rules for 3 and 9 and the last-digit rules for 2 and 5 are the quickest, so they should be recalled first while testing the options.",
        as: "২, ৩, ৪, ৫, ৬, ৮, ৯ আৰু ১১ ৰ নিয়ম বাৰে বাৰে আহে। ইয়াৰ ভিতৰত ৩ আৰু ৯ ৰ অংক-যোগফলৰ নিয়ম আৰু ২ আৰু ৫ ৰ শেষ-অংকৰ নিয়ম আটাইতকৈ দ্ৰুত, গতিকে বিকল্প পৰীক্ষা কৰোঁতে প্ৰথমে এইবোৰ মনত পেলোৱা উচিত।",
      },
    },
  ],
};
