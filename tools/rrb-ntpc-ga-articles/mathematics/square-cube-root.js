"use strict";

/* RRB NTPC Mathematics — Square Root & Cube Root. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Square Root & Cube Root for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে বৰ্গমূল আৰু ঘনমূল" },
  p: {
    en: [
      "Square roots and cube roots are the reverse of squaring and cubing, and the RRB NTPC Mathematics paper asks about them in a friendly, predictable way. The questions are usually short: a root of a perfect square, a root of a perfect cube, the unit digit of a square, the smallest number that makes something a perfect square, or the number of digits in a root. Because the methods are fixed, this chapter is one of the safest sources of marks, provided the squares and cubes are known by heart.",
      "A perfect square is a number that is the product of an integer with itself. The perfect squares begin one, four, nine, sixteen, twenty-five, thirty-six and so on, and the square root of a perfect square is the integer that was squared. A perfect cube is the product of an integer with itself twice, giving one, eight, twenty-seven, sixty-four and so on, and the cube root of a perfect cube is that integer. Learning the squares up to thirty and the cubes up to fifteen covers almost every direct question that appears.",
      "The square root of a non-perfect-square is irrational, and a decimal root is found by splitting the number into a perfect-square factor and the rest. The square root of one hundred and twenty-five is five times the square root of five, and the square root of one thousand and twenty-four is thirty-two exactly. When the number is a decimal, the root has half the number of decimal places, so the square root of zero point zero four is zero point two, because zero point two squared is zero point zero four. This place-counting trick answers a whole group of decimal-root questions at a glance.",
      "The unit digit of a square follows a short pattern and is asked often. The squares of the digits end in a limited set of values: one squared ends in one, two squared in four, three squared in nine, four squared in six, and five squared in five, after which the pattern repeats in mirror form. As a result a perfect square can never end in two, three, seven or eight, and this single fact eliminates options quickly. So the unit digit of twenty-seven squared is nine, because seven squared is forty-nine, and the unit digit of thirty-four squared is six, because four squared is sixteen.",
      "The unit digit of a cube follows its own cycle. One cubed ends in one, two cubed in eight, three cubed in twenty-seven, so seven, four cubed in four, five cubed in five, and the pattern for six, seven, eight and nine continues in a way that keeps the last digit of the cube tied to the last digit of the number. A useful consequence is that the cube root of a perfect cube ending in eight ends in two, and the cube root of a perfect cube ending in five ends in five. These shortcuts let a candidate read off the last digit of a root without any division.",
      "The square root of a large perfect square is found by prime factorisation or by long division. To use prime factorisation, write the number as a product of primes, pair up the equal primes, and take one prime from each pair; the product of these is the square root. For the cube root, group the equal primes in threes and take one from each group. Long division gives the same answer digit by digit and is useful when the number is large or when it is not obvious from the factorisation. Both methods are worth practising until the answer comes quickly.",
      "A common question asks for the smallest number by which a given number must be multiplied or divided to make it a perfect square. The method is always the same: prime-factorise the number, then look for any prime whose power is odd. If a prime has an odd power, multiply by that prime to make the power even, or divide by it to remove the extra copy. So one hundred and eight is two squared times three cubed, and multiplying by three gives two squared times three to the fourth, which is a perfect square. Similarly, two hundred and fifty-two is two squared times three squared times seven, and dividing by seven gives thirty-six.",
      "A related question asks for the smallest number to be added to or subtracted from a number to make it a perfect square. The method here is to find the two perfect squares between which the number lies and to take the nearer one. Since forty-four squared is one thousand nine hundred and thirty-six and forty-five squared is two thousand and twenty-five, the number two thousand is only twenty-five away from the upper square, so adding twenty-five makes it a perfect square. Finding the two bounding squares is the whole skill, and it needs the squares table.",
      "Roots of decimals and fractions follow simple rules. To take the square root of a decimal, find the root of the digits and halve the number of decimal places, so the square root of zero point zero eight one is zero point nine, because zero point nine squared is zero point eight one. To take the square root of a fraction, take the root of the numerator and of the denominator separately, so the square root of sixteen over twenty-five is four over five. The same split applies to cube roots, so the cube root of eight over twenty-seven is two over three.",
      "Several useful results connect roots with other chapters. The sum of the first n odd numbers is n squared, so the sum of the first fifteen odd numbers is two hundred and twenty-five, whose square root is fifteen. A number that is both a perfect square and a perfect cube, other than zero and one, is a perfect sixth power, so the smallest such number is sixty-four, which is eight squared and also four cubed. The number of perfect squares between one and one hundred is ten, and the number of perfect cubes between one and five hundred is seven, because eight cubed already exceeds five hundred.",
      "The number of digits in a root can be judged before any calculation. The square root of a two or three digit perfect square has two digits, and the square root of a four digit perfect square also has two digits, while the square root of a five digit perfect square has three. For cubes, the cube root of a number up to three digits has one digit, up to six digits has two digits, and up to nine digits has three. Knowing these ranges lets a candidate reject an option that is wildly out of scale before doing any work.",
      "The chapter also asks for the values of common irrational roots as decimals. The square root of two is approximately one point four one, the square root of three is approximately one point seven three, and the square root of five is approximately two point two four. These values are useful in comparison questions and in geometry and mensuration, where a diagonal or a height may need a decimal answer. Memorising these three values is cheap and pays off in several chapters.",
      "The best preparation is to learn the squares up to thirty, the cubes up to fifteen, the unit-digit rules for squares and cubes, and the prime-factorisation method for making a number a perfect square. Practise reading a large perfect square and naming its root at once, and practise the bounding-squares method for the add-and-subtract questions. With these tools the square root and cube root questions in the paper become quick, reliable marks.",
    ],
    as: [
      "বৰ্গমূল আৰু ঘনমূল হৈছে বৰ্গ আৰু ঘন কৰাৰ ওলোটা ক্ৰিয়া, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰই এইবোৰ সহজ, অনুমানযোগ্য ধৰণে সোধে। প্ৰশ্নবোৰ সাধাৰণতে চুটি: এটা পূৰ্ণবৰ্গৰ মূল, এটা পূৰ্ণঘনৰ মূল, এটা বৰ্গৰ একক অংক, কিবা এটাক পূৰ্ণবৰ্গ কৰিবলৈ আটাইতকৈ সৰু সংখ্যা, নাইবা এটা মূলত থকা অংকৰ সংখ্যা। পদ্ধতিবোৰ নিৰ্দিষ্ট, গতিকে এই অধ্যায়টো নম্বৰৰ আটাইতকৈ নিৰাপদ উৎসসমূহৰ এটা, যদি বৰ্গ আৰু ঘনবোৰ মনত থাকে।",
      "এটা পূৰ্ণবৰ্গ হৈছে এটা সংখ্যা যি এটা পূৰ্ণসংখ্যাক নিজৰ সৈতে পূৰণ কৰি পোৱা যায়। পূৰ্ণবৰ্গবোৰ আৰম্ভ হয় এক, চাৰি, ন, ষোল্ল, পঁচিশ, ছত্ৰিশ আদিৰে, আৰু এটা পূৰ্ণবৰ্গৰ বৰ্গমূল হৈছে যি পূৰ্ণসংখ্যাটোক বৰ্গ কৰা হৈছিল। এটা পূৰ্ণঘন হৈছে এটা পূৰ্ণসংখ্যাক দুবাৰ নিজৰ সৈতে পূৰণ কৰি পোৱা সংখ্যা, যি এক, আঠ, সাতাইশ, চৌষষ্ঠি আদি দিয়ে, আৰু এটা পূৰ্ণঘনৰ ঘনমূল হৈছে সেই পূৰ্ণসংখ্যা। ত্ৰিশলৈকে বৰ্গ আৰু পোন্ধৰলৈকে ঘন শিকিলে প্ৰায় প্ৰতিটো পোনপটীয়া প্ৰশ্ন সামৰি লয়।",
      "এটা অপূৰ্ণবৰ্গৰ বৰ্গমূল অপৰিমেয়, আৰু এটা দশমিক মূল সংখ্যাটোক এটা পূৰ্ণবৰ্গ উৎপাদক আৰু বাকী অংশত ভাঙি পোৱা যায়। এশ পঁচিশৰ বৰ্গমূল হৈছে পাঁচ গুণ √৫, আৰু এক হাজাৰ চৌবিশৰ বৰ্গমূল ঠিক বত্ৰিশ। সংখ্যাটো দশমিক হ'লে মূলত অৰ্ধেক দশমিক স্থান থাকে, গতিকে √০.০৪ = ০.২, কাৰণ ০.২ ৰ বৰ্গ ০.০৪। এই স্থান-গণনা কৌশলেই এটা গোটেই দশমিক-মূল প্ৰশ্নৰ উত্তৰ এক নজৰতে দিয়ে।",
      "এটা বৰ্গৰ একক অংক এটা চুটি আৰ্হি অনুসৰণ কৰে আৰু প্ৰায়ে সোধা হয়। অংকবোৰৰ বৰ্গই এটা সীমিত মানত শেষ হয়: ১ ৰ বৰ্গ ১ ৰে শেষ, ২ ৰ বৰ্গ ৪ ৰে, ৩ ৰ বৰ্গ ৯ ৰে, ৪ ৰ বৰ্গ ৬ ৰে, আৰু ৫ ৰ বৰ্গ ৫ ৰে, তাৰ পিছত আৰ্হিটো দাপোন ৰূপত পুনৰাবৃত্তি হয়। ফলস্বৰূপে এটা পূৰ্ণবৰ্গ কেতিয়াও ২, ৩, ৭ বা ৮ ৰে শেষ নহয়, আৰু এই এটা তথ্যই বিকল্পবোৰ দ্ৰুতভাৱে বাদ দিয়ে। গতিকে ২৭ ৰ বৰ্গৰ একক অংক ৯, কাৰণ ৭ ৰ বৰ্গ ৪৯, আৰু ৩৪ ৰ বৰ্গৰ একক অংক ৬, কাৰণ ৪ ৰ বৰ্গ ১৬।",
      "এটা ঘনৰ একক অংক ইয়াৰ নিজা চক্ৰ অনুসৰণ কৰে। ১ ৰ ঘন ১ ৰে শেষ, ২ ৰ ঘন ৮ ৰে, ৩ ৰ ঘন সাতাইশ, গতিকে ৭ ৰে, ৪ ৰ ঘন ৪ ৰে, ৫ ৰ ঘন ৫ ৰে, আৰু ৬, ৭, ৮ আৰু ৯ ৰ আৰ্হিয়ে এনে ধৰণে চলি থাকে যি ঘনৰ শেষ অংকটোক সংখ্যাৰ শেষ অংকৰ সৈতে বান্ধি ৰাখে। এটা উপযোগী ফল হ'ল ৮ ৰে শেষ হোৱা পূৰ্ণঘনৰ ঘনমূল ২ ৰে শেষ হয়, আৰু ৫ ৰে শেষ হোৱা পূৰ্ণঘনৰ ঘনমূল ৫ ৰে শেষ হয়। এই চমু উপায়ে কোনো হৰণ নকৰাকৈ এটা মূলৰ শেষ অংক পঢ়িব দিয়ে।",
      "এটা ডাঙৰ পূৰ্ণবৰ্গৰ বৰ্গমূল মৌলিক উৎপাদকীকৰণ নাইবা দীঘল হৰণৰ জৰিয়তে পোৱা যায়। মৌলিক উৎপাদকীকৰণ ব্যৱহাৰ কৰিবলৈ সংখ্যাটোক মৌলিকৰ গুণফল হিচাপে লিখক, সমান মৌলিকবোৰ যোৰ কৰক, আৰু প্ৰতিটো যোৰৰ পৰা এটা মৌলিক লওক; এইবোৰৰ গুণফলেই বৰ্গমূল। ঘনমূলৰ বাবে সমান মৌলিকবোৰ তিনিৰ গোটত সজাই প্ৰতিটো গোটৰ পৰা এটা লওক। দীঘল হৰণে একেই উত্তৰ অংক অংক কৰি দিয়ে আৰু সংখ্যাটো ডাঙৰ হ'লে নাইবা উৎপাদকীকৰণৰ পৰা স্পষ্ট নহ'লে উপযোগী। দুয়োটা পদ্ধতি উত্তৰ দ্ৰুত হোৱালৈকে অভ্যাস কৰা উচিত।",
      "এটা সাধাৰণ প্ৰশ্নই সোধে দিয়া সংখ্যাটোক পূৰ্ণবৰ্গ কৰিবলৈ আটাইতকৈ সৰু সংখ্যা যাৰে পূৰণ বা হৰণ কৰিব লাগে। পদ্ধতি সদায় একেই: সংখ্যাটোক মৌলিক উৎপাদকীকৰণ কৰক, তাৰ পিছত কোনো মৌলিকৰ ঘাত অযুগ্ম হৈছে নেকি চাওক। এটা মৌলিকৰ ঘাত অযুগ্ম হ'লে সেই মৌলিকৰে পূৰণ কৰি ঘাতটো যুগ্ম কৰক, নাইবা সেইটোৱে হৰণ কৰি অতিৰিক্ত কপিটো আঁতৰাওক। গতিকে ১০৮ = ২^২ × ৩^৩, আৰু ৩ ৰে পূৰণ কৰিলে ২^২ × ৩^৪, যি এটা পূৰ্ণবৰ্গ। একেদৰে ২৫২ = ২^২ × ৩^২ × ৭, আৰু ৭ ৰে হৰণ কৰিলে ৩৬।",
      "সম্পৰ্কিত এটা প্ৰশ্নই সোধে এটা সংখ্যাত যোগ বা বিয়োগ কৰি পূৰ্ণবৰ্গ কৰিবলৈ আটাইতকৈ সৰু সংখ্যা। ইয়াত পদ্ধতি হৈছে সংখ্যাটো যি দুটা পূৰ্ণবৰ্গৰ মাজত আছে সেয়া বিচাৰি ওচৰৰটো লোৱা। যিহেতু ৪৪^২ = ১৯৩৬ আৰু ৪৫^২ = ২০২৫, ২০০০ সংখ্যাটো ওপৰৰ বৰ্গৰ পৰা কেৱল পঁচিশ আঁতৰত, গতিকে ২৫ যোগ কৰিলে ই এটা পূৰ্ণবৰ্গ হয়। সীমাবদ্ধ কৰা দুটা বৰ্গ বিচৰাটোৱেই গোটেই দক্ষতা, আৰু ইয়াৰ বাবে বৰ্গৰ তালিকা লাগে।",
      "দশমিক আৰু ভগ্নাংশৰ মূল সহজ নিয়ম অনুসৰণ কৰে। এটা দশমিকৰ বৰ্গমূল ল'বলৈ অংকবোৰৰ মূল বিচাৰি দশমিক স্থানৰ সংখ্যা অৰ্ধেক কৰক, গতিকে √০.০৮১ = ০.৯, কাৰণ ০.৯ ৰ বৰ্গ ০.৮১। এটা ভগ্নাংশৰ বৰ্গমূল ল'বলৈ লৱ আৰু হৰৰ মূল পৃথকে বিচাৰক, গতিকে √(১৬/২৫) = ৪/৫। একেই ভাগ ঘনমূলতো খাটে, গতিকে ∛(৮/২৭) = ২/৩।",
      "কেইটামান উপযোগী ফলেই মূলক আন অধ্যায়ৰ সৈতে সংযোগ কৰে। প্ৰথম n টা অযুগ্ম সংখ্যাৰ যোগফল n ৰ বৰ্গ, গতিকে প্ৰথম পোন্ধৰ টা অযুগ্ম সংখ্যাৰ যোগফল ২২৫, যাৰ বৰ্গমূল ১৫। শূন্য আৰু একৰ বাহিৰে পূৰ্ণবৰ্গ আৰু পূৰ্ণঘন দুয়োটা হোৱা সংখ্যা এটা পূৰ্ণ ষষ্ঠ ঘাত, গতিকে এনে আটাইতকৈ সৰু সংখ্যা ৬৪, যি ৮ ৰ বৰ্গ আৰু ৪ ৰ ঘন। এক আৰু একশৰ মাজত পূৰ্ণবৰ্গৰ সংখ্যা দহ, আৰু এক আৰু পাঁচশৰ মাজত পূৰ্ণঘনৰ সংখ্যা সাত, কাৰণ ৮ ৰ ঘন ইতিমধ্যে পাঁচশ তকৈ বেছি।",
      "কোনো গণনাৰ আগতে এটা মূলত অংকৰ সংখ্যা অনুমান কৰিব পাৰি। দুই বা তিনি অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলত দুটা অংক, আৰু চাৰি অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলতো দুটা অংক, আনহাতে পাঁচ অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলত তিনিটা। ঘনৰ বাবে তিনি অংকলৈকে ঘনমূলত এটা অংক, ছয় অংকলৈকে দুটা, আৰু ন অংকলৈকে তিনিটা। এই পৰিসৰবোৰ জানিলে কোনো কাম কৰাৰ আগতে অতিশয় বাহিৰৰ এটা বিকল্প বাদ দিব পাৰি।",
      "অধ্যায়টোৱে সাধাৰণ অপৰিমেয় মূলৰ দশমিক মানো সোধে। √২ প্ৰায় ১.৪১, √৩ প্ৰায় ১.৭৩, আৰু √৫ প্ৰায় ২.২৪। এই মানবোৰ তুলনা প্ৰশ্নত আৰু জ্যামিতি আৰু ক্ষেত্ৰমিতিত উপযোগী, য'ত কৰ্ণ বা উচ্চতাই দশমিক উত্তৰ বিচাৰিব পাৰে। এই তিনিটা মান মনত ৰখাটো সহজ আৰু কেইবাটাও অধ্যায়ত লাভদায়ক।",
      "আটাইতকৈ ভাল প্ৰস্তুতি হৈছে ত্ৰিশলৈকে বৰ্গ, পোন্ধৰলৈকে ঘন, বৰ্গ আৰু ঘনৰ একক-অংকৰ নিয়ম, আৰু এটা সংখ্যাক পূৰ্ণবৰ্গ কৰাৰ মৌলিক-উৎপাদকীকৰণ পদ্ধতি শিকা। এটা ডাঙৰ পূৰ্ণবৰ্গ পঢ়ি তৎক্ষণাত ইয়াৰ মূল ক'বলৈ অভ্যাস কৰক, আৰু যোগ-বিয়োগৰ প্ৰশ্নৰ বাবে সীমাবদ্ধ-বৰ্গ পদ্ধতি অভ্যাস কৰক। এই সঁজুলিবোৰৰ সৈতে প্ৰশ্নপত্ৰৰ বৰ্গমূল আৰু ঘনমূলৰ প্ৰশ্নবোৰ দ্ৰুত, নিৰ্ভৰযোগ্য নম্বৰ হৈ পৰে।",
      "শেষত, মূল আৰু ঘাতৰ মাজৰ সম্পৰ্কটো মনত ৰখা উচিত। √a ক a^(১/২) আৰু ∛a ক a^(১/৩) হিচাপে লিখিব পাৰি, গতিকে বৰ্গমূল আৰু ঘনমূলৰ প্ৰশ্নবোৰো সূচকৰ নিয়মেৰেই সমাধান কৰিব পাৰি। উদাহৰণস্বৰূপে √(a) × √(a) = a, আৰু ∛(a) × ∛(a) × ∛(a) = a। এই সংযোগে এটা মূলক ঘাত হিচাপে সৰল কৰি দীঘল ৰাশি চমু কৰাত সহায় কৰে, আৰু দুটা অধ্যায়ৰ মাজত থকা প্ৰশ্নবোৰ আত্মবিশ্বাসেৰে সমাধান কৰিব দিয়ে।",
    ],
  },
  list: {
    en: [
      "A perfect square is n x n; a perfect cube is n x n x n.",
      "Learn the squares up to 30 and the cubes up to 15 by heart.",
      "A perfect square never ends in 2, 3, 7 or 8.",
      "Unit digit of a square: use the unit digit of the base (7^2 ends in 9, 4^2 ends in 6).",
      "Cube root by unit digit: a cube ending in 8 has a root ending in 2; a cube ending in 5 has a root ending in 5.",
      "Simplify roots by prime factorisation: pair equal primes for a square root, group in threes for a cube root.",
      "To make a number a perfect square, multiply or divide by the prime whose power is odd.",
      "Square root of a decimal has half the decimal places: sqrt(0.04) = 0.2.",
      "Square root of a fraction: root the numerator and denominator separately: sqrt(49/81) = 7/9.",
      "The sum of the first n odd numbers is n^2, which links squares and series.",
      "Number of digits: a 4-digit perfect square has a 2-digit root; a 7- to 9-digit cube has a 3-digit cube root.",
      "Common values: sqrt(2) = 1.41, sqrt(3) = 1.73, sqrt(5) = 2.24.",
    ],
    as: [
      "এটা পূৰ্ণবৰ্গ হৈছে n × n; এটা পূৰ্ণঘন হৈছে n × n × n।",
      "ত্ৰিশলৈকে বৰ্গ আৰু পোন্ধৰলৈকে ঘন মনত ৰাখক।",
      "এটা পূৰ্ণবৰ্গ কেতিয়াও ২, ৩, ৭ বা ৮ ৰে শেষ নহয়।",
      "এটা বৰ্গৰ একক অংক: ভূমিৰ একক অংক ব্যৱহাৰ কৰক (৭^২ = ৯ ৰে শেষ, ৪^২ = ৬ ৰে শেষ)।",
      "একক অংকৰে ঘনমূল: ৮ ৰে শেষ হোৱা ঘনৰ মূল ২ ৰে শেষ; ৫ ৰে শেষ হোৱা ঘনৰ মূল ৫ ৰে শেষ।",
      "মৌলিক উৎপাদকীকৰণেৰে মূল সৰল কৰক: বৰ্গমূলৰ বাবে সমান মৌলিক যোৰ কৰক, ঘনমূলৰ বাবে তিনিৰ গোটত সজাওক।",
      "এটা সংখ্যাক পূৰ্ণবৰ্গ কৰিবলৈ যি মৌলিকৰ ঘাত অযুগ্ম সেইটোৱে পূৰণ বা হৰণ কৰক।",
      "এটা দশমিকৰ বৰ্গমূলত অৰ্ধেক দশমিক স্থান: √০.০৪ = ০.২।",
      "এটা ভগ্নাংশৰ বৰ্গমূল: লৱ আৰু হৰৰ মূল পৃথকে: √(৪৯/৮১) = ৭/৯।",
      "প্ৰথম n টা অযুগ্ম সংখ্যাৰ যোগফল n^২, যি বৰ্গ আৰু শৃংখলা সংযোগ কৰে।",
      "অংকৰ সংখ্যা: ৪ অংকৰ পূৰ্ণবৰ্গৰ ২ অংকৰ মূল; ৭ ৰ পৰা ৯ অংকৰ ঘনৰ ৩ অংকৰ ঘনমূল।",
      "চিনাকি মান: √২ = ১.৪১, √৩ = ১.৭৩, √৫ = ২.২৪।",
    ],
  },
  faqs: [
    {
      q: { en: "How can I tell if a number is a perfect square without dividing?",
           as: "হৰণ নকৰাকৈ এটা সংখ্যা পূৰ্ণবৰ্গ হয় নেকি কেনেকৈ ক'ম?" },
      a: {
        en: "Look at its last digit. A perfect square can end only in 0, 1, 4, 5, 6 or 9. If it ends in 2, 3, 7 or 8 it is certainly not a perfect square, which often eliminates three of the four options at once.",
        as: "ইয়াৰ শেষ অংকটো চাওক। এটা পূৰ্ণবৰ্গ কেৱল ০, ১, ৪, ৫, ৬ বা ৯ ৰে শেষ হ'ব পাৰে। ই ২, ৩, ৭ বা ৮ ৰে শেষ হ'লে নিশ্চিতভাৱে পূৰ্ণবৰ্গ নহয়, যি প্ৰায়ে এতিয়াই চাৰিটা বিকল্পৰ তিনিটা বাদ দিয়ে।",
      },
    },
    {
      q: { en: "What is the fastest way to find the cube root of a large perfect cube?",
           as: "এটা ডাঙৰ পূৰ্ণঘনৰ ঘনমূল বিচৰাৰ আটাইতকৈ দ্ৰুত উপায় কি?" },
      a: {
        en: "Use the last digit and the size. For 17576, the last digit 6 means the root ends in 6, and since 25 cubed is 15625 and 26 cubed is 17576, the root is 26. The last-digit rule fixes the unit digit and the size fixes the tens.",
        as: "শেষ অংক আৰু আকাৰ ব্যৱহাৰ কৰক। ১৭৫৭৬ ৰ বাবে শেষ অংক ৬ ৰ অৰ্থ মূল ৬ ৰে শেষ হয়, আৰু যিহেতু ২৫ ৰ ঘন ১৫৬২৫ আৰু ২৬ ৰ ঘন ১৭৫৭৬, মূল ২৬। শেষ-অংকৰ নিয়মে একক অংক আৰু আকাৰে দহক নিৰ্ধাৰণ কৰে।",
      },
    },
    {
      q: { en: "How do I find the smallest number that makes a given number a perfect square?",
           as: "এটা দিয়া সংখ্যাক পূৰ্ণবৰ্গ কৰা আটাইতকৈ সৰু সংখ্যা কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Prime-factorise the number and find the prime whose power is odd. For 75, which is 3 times 5 squared, the power of 3 is odd, so multiply by 3 to get 225. For 252, which is 2 squared times 3 squared times 7, divide by 7 to get 36.",
        as: "সংখ্যাটোক মৌলিক উৎপাদকীকৰণ কৰি যি মৌলিকৰ ঘাত অযুগ্ম সেয়া বিচাৰক। ৭৫ = ৩ × ৫^২ ৰ বাবে ৩ ৰ ঘাত অযুগ্ম, গতিকে ৩ ৰে পূৰণ কৰি ২২৫ পাওক। ২৫২ = ২^২ × ৩^২ × ৭ ৰ বাবে ৭ ৰে হৰণ কৰি ৩৬ পাওক।",
      },
    },
    {
      q: { en: "How many digits does the square root of a 4-digit perfect square have?",
           as: "৪ অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলত কিমান অংক থাকে?" },
      a: {
        en: "Two digits. The square root of a two, three or four digit perfect square always has two digits, and the square root of a five digit perfect square has three digits. This range check rules out an option that is too large or too small.",
        as: "দুটা অংক। দুই, তিনি বা চাৰি অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলত সদায় দুটা অংক থাকে, আৰু পাঁচ অংকৰ পূৰ্ণবৰ্গৰ বৰ্গমূলত তিনিটা থাকে। এই পৰিসৰ পৰীক্ষাই অতিশয় ডাঙৰ বা সৰু বিকল্প এটা বাদ দিয়ে।",
      },
    },
    {
      q: { en: "What is the square root of 0.0081?",
           as: "০.০০৮১ ৰ বৰ্গমূল কি?" },
      a: {
        en: "It is 0.09. The root of the digits 81 is 9, and the decimal point moves half as many places, so the four decimal places become two. Check it by squaring: 0.09 times 0.09 is 0.0081.",
        as: "ই ০.০৯। ৮১ অংকবোৰৰ মূল ৯, আৰু দশমিক বিন্দু অৰ্ধেক স্থান লৰে, গতিকে চাৰিটা দশমিক স্থান দুটা হয়। বৰ্গ কৰি পৰীক্ষা কৰক: ০.০৯ × ০.০৯ = ০.০০৮১।",
      },
    },
  ],
};
