"use strict";

/* RRB NTPC Mathematics — Statistics. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Statistics for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে পৰিসংখ্যা" },
  p: {
    en: [
      "Statistics is the chapter that summarises a collection of numbers by a few typical values, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter has four measures that the paper treats together: the mean, the median, the mode and the range. Each measure answers a different question about the data, and most of the chapter is the arithmetic of one of these four, so a clear idea of what each measures and a careful hand at the arithmetic carry the chapter.",
      "The mean is the average, found by adding all the values and dividing by how many there are. It is the measure that uses every value, so a single very large or very small value pulls it. The reverse questions give the mean and the count and ask for the total, which is the mean times the count, or give the mean and all but one of the values and ask for the missing value. Naming the unknown and writing the total in two ways is the whole method for these.",
      "The effect of changing every value in the same way is a favourite family. If a constant is added to every value, the mean rises by that constant; if every value is multiplied by a constant, the mean is multiplied by that constant; and if a constant is subtracted from every value, the mean falls by that constant. These three rules answer the questions that add, multiply or subtract something from every number, and they avoid the work of recomputing the mean from the changed list.",
      "The questions on the mean of a series use the symmetry of the series. The mean of the first n natural numbers is n plus one over two, so the first ten give five and a half and the first hundred give fifty and a half. The mean of consecutive numbers is the middle number, and the same is true of consecutive even numbers and consecutive odd numbers. Recognising a symmetric series lets the mean be written down without adding anything.",
      "The mean of an arithmetic progression is the average of the first and last terms. The mean of the first ten even numbers is the average of two and twenty, which is eleven, and the mean of the first ten odd numbers is the average of one and nineteen, which is ten. The same rule answers the mean of the multiples of a number, and it is the fastest route whenever the values are equally spaced.",
      "The median is the middle value when the values are arranged in order. For an odd count the median is the middle value itself, and for an even count it is the average of the two middle values. The first step is always to arrange the values in increasing order, and forgetting this step is the commonest error in the median questions. For an ordered list of equally spaced values the median is the middle value, which is also the mean.",
      "The median questions with a missing value are solved by the position of the middle. If the median of an even count is given, the two middle values average to it, and a missing value can be found from that relation. If the count is odd and the median is given, the missing value lies on one side or the other of the median depending on how many values are below it. Counting the positions carefully is the whole method.",
      "The mode is the value that appears most often. It is found by counting the frequency of each value and picking the one with the highest count. There may be more than one mode, and there may be none if every value appears once. The mode questions are quick, but they need a careful count, because a value that appears twice can be overtaken by another that appears three times further down the list.",
      "The range is the difference between the largest and the smallest value. It measures the spread of the data rather than its centre, and it is found by subtracting the smallest from the largest after scanning the whole list. The range questions are the quickest in the chapter, and they are sometimes combined with the mean or the median in a single question that asks for two measures together.",
      "The questions that combine two measures are the last family. A question may give the mean of the whole set and the mean of one part and ask for the mean of the remaining part, or give the median and the range and ask for a missing value. Writing the two given facts as two equations and solving them together is the method, exactly as in the simultaneous equations chapter, and the arithmetic is the same.",
      "The questions that give the mean of a set and the mean after removing or adding a value are solved by the change in the total. If the mean of five numbers is twenty and the mean of the remaining four after one is removed is eighteen, the total fell from a hundred to seventy-two, so the removed number is twenty-eight. This single subtraction answers the whole family, and it is far quicker than finding the other values.",
      "Finally, the chapter rewards two habits. The first is to write the list in increasing order before finding the median or the mode, because the order is what makes the middle value and the highest frequency visible. The second is to keep the total in view when working with the mean, since most mean questions are really questions about the total. With these habits the statistics questions become among the quickest in the paper, and the same ideas carry into the chapter on data interpretation.",
    ],
    as: [
      "পৰিসংখ্যা হৈছে সেই অধ্যায় যি সংখ্যাৰ এটা সংগ্ৰহক কেইটামান প্ৰতিনিধিমূলক মানৰে সাৰাংশ কৰে, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টোৰ চাৰিটা মাপ আছে যিবোৰ প্ৰশ্নপত্ৰই একেলগে লয়: মধ্যমান, মধ্যমা, বহুলক আৰু পৰিসৰ। প্ৰতিটো মাপে তথ্যৰ এটা বেলেগ প্ৰশ্নৰ উত্তৰ দিয়ে, আৰু অধ্যায়টোৰ বেছিভাগ এই চাৰিটাৰ এটাৰ গণনা।",
      "মধ্যমান হৈছে গড়, যি সকলো মান যোগ কৰি সংখ্যাৰে হৰণ কৰি পোৱা যায়। ই প্ৰতিটো মান ব্যৱহাৰ কৰে, গতিকে এটা অতি ডাঙৰ বা অতি সৰু মানে ইয়াক টানি নিয়ে। উলটি প্ৰশ্নই মধ্যমান আৰু সংখ্যা দি যোগফল সোধে, যি মধ্যমান × সংখ্যা, বা মধ্যমান আৰু এটাবাদে বাকী মান দি হেৰুৱা মানটো সোধে। অজ্ঞাতটো নাম দি যোগফল দুভাৱে লিখাটোৱেই গোটেই পদ্ধতি।",
      "প্ৰতিটো মান একেই ধৰণে সলনি কৰাৰ প্ৰভাৱ এটা প্ৰিয় পৰিয়াল। প্ৰতিটো মানত এটা ধ্ৰুৱক যোগ কৰিলে মধ্যমান সেই ধ্ৰুৱকেই বাঢ়ে; প্ৰতিটো মান এটা ধ্ৰুৱকৰে পূৰণ কৰিলে মধ্যমান সেই ধ্ৰুৱকেই পূৰণ হয়; আৰু প্ৰতিটো মানৰ পৰা এটা ধ্ৰুৱক বিয়োগ কৰিলে মধ্যমান সেই ধ্ৰুৱকেই কমে। এই তিনিটা নিয়মে এই পৰিয়ালৰ উত্তৰ দিয়ে।",
      "শ্ৰেণীৰ মধ্যমানৰ প্ৰশ্নত শ্ৰেণীটোৰ প্ৰতিসমতা ব্যৱহাৰ কৰা হয়। প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ মধ্যমান = (n + ১)/২, গতিকে প্ৰথম দহে পাঁচ-দশমিক-পাঁচ আৰু প্ৰথম এশই পঞ্চাশ-দশমিক-পাঁচ দিয়ে। ক্ৰমিক সংখ্যাৰ মধ্যমান মাজৰ সংখ্যাটো, আৰু ক্ৰমিক যুগ্ম আৰু অযুগ্ম সংখ্যাৰ বাবেও একেই। প্ৰতিসম শ্ৰেণী চিনি পোৱাটোৱে একো যোগ নকৰাকৈ মধ্যমান লিখিবলৈ দিয়ে।",
      "সমান্তৰ প্ৰগতিৰ মধ্যমান প্ৰথম আৰু শেষ পদৰ গড়। প্ৰথম দহটা যুগ্ম সংখ্যাৰ মধ্যমান দুই আৰু বিশৰ গড়, যি এঘাৰ, আৰু প্ৰথম দহটা অযুগ্ম সংখ্যাৰ মধ্যমান এক আৰু উনৈশৰ গড়, যি দহ। একেই নিয়মে এটা সংখ্যাৰ গুণিতকৰ মধ্যমান দিয়ে, আৰু মানবোৰ সমান ব্যৱধানত থাকিলে ই আটাইতকৈ দ্ৰুত উপায়।",
      "মধ্যমা হৈছে মানবোৰ সজোৱাৰ পিছত মাজৰ মান। অযুগ্ম সংখ্যাৰ বাবে মধ্যমা মাজৰ মানটোৱেই, আৰু যুগ্ম সংখ্যাৰ বাবে দুটা মাজৰ মানৰ গড়। প্ৰথম পদক্ষেপ সদায় মানবোৰ বঢ়াৰ ক্ৰমত সজোৱা, আৰু এই পদক্ষেপ পাহৰাটোৱেই মধ্যমাৰ প্ৰশ্নত আটাইতকৈ সচৰাচৰ ভুল। সজোৱা তালিকাৰ মধ্যমা মাজৰ মান, যি মধ্যমানো।",
      "হেৰুৱা মান থকা মধ্যমাৰ প্ৰশ্ন মাজৰ অৱস্থানৰ দ্বাৰা সমাধান কৰা হয়। যুগ্ম সংখ্যাৰ মধ্যমা দিয়া থাকিলে দুটা মাজৰ মানে তাৰ গড় দিয়ে, আৰু সেই সম্পৰ্কৰ পৰা হেৰুৱা মান বিচৰা যায়। অযুগ্ম সংখ্যা আৰু মধ্যমা দিয়া থাকিলে, কিমানটা মান মধ্যমাৰ তলত আছে তাৰ ওপৰত নিৰ্ভৰ কৰি হেৰুৱা মানটো এফালে থাকে। অৱস্থান সাৱধানে গণনা কৰাটোৱেই গোটেই পদ্ধতি।",
      "বহুলক হৈছে আটাইতকৈ বেছি বাৰ অহা মান। প্ৰতিটো মানৰ বাৰম্বাৰতা গণনা কৰি সৰ্বোচ্চ বাৰম্বাৰতাৰ মানটো বাছি লৈ ইয়াক পোৱা যায়। এটাৰ অধিক বহুলক থাকিব পাৰে, আৰু প্ৰতিটো মান এবাৰকৈ থাকিলে কোনো নাথাকিবও পাৰে। বহুলকৰ প্ৰশ্ন দ্ৰুত, কিন্তু সাৱধানে গণনা লাগে, কাৰণ দুবাৰ অহা মানক তলত তিনিবাৰ অহা মানে চেৰাই যাব পাৰে।",
      "পৰিসৰ হৈছে আটাইতকৈ ডাঙৰ আৰু আটাইতকৈ সৰু মানৰ পাৰ্থক্য। ই তথ্যৰ বিস্তাৰ জোখে, কেন্দ্ৰ নহয়, আৰু গোটেই তালিকা চাই আটাইতকৈ সৰুটো ডাঙৰটোৰ পৰা বিয়োগ কৰি পোৱা যায়। পৰিসৰৰ প্ৰশ্ন অধ্যায়টোৰ আটাইতকৈ দ্ৰুত, আৰু কেতিয়াবা দুটা মাপ একেলগে সোধা এটা প্ৰশ্নত মধ্যমান বা মধ্যমাৰ সৈতে মিলাই দিয়া হয়।",
      "দুটা মাপ মিলোৱা প্ৰশ্ন শেষৰ পৰিয়াল। এটা প্ৰশ্নই গোটেই সংগ্ৰহৰ মধ্যমান আৰু এটা অংশৰ মধ্যমান দি বাকী অংশৰ মধ্যমান সোধে, বা মধ্যমা আৰু পৰিসৰ দি হেৰুৱা মান সোধে। দুটা দিয়া তথ্য দুটা সমীকৰণ হিচাপে লিখি একেলগে সমাধান কৰাটোৱেই পদ্ধতি, যুগপৎ সমীকৰণ অধ্যায়ৰ দৰেই।",
      "এটা সংগ্ৰহৰ মধ্যমান আৰু এটা মান আঁতৰোৱা বা যোগ কৰাৰ পিছৰ মধ্যমান দিয়া প্ৰশ্ন যোগফলৰ পৰিৱৰ্তনেৰে সমাধান কৰা হয়। পাঁচটা সংখ্যাৰ মধ্যমান বিশ আৰু এটা আঁতৰোৱাৰ পিছত বাকী চাৰিটাৰ মধ্যমান আঠাইশ হ'লে, যোগফল এশৰ পৰা বাহাত্তৰলৈ নামে, গতিকে আঁতৰোৱা সংখ্যাটো আঠাইশ। এই এটা বিয়োগেই গোটেই পৰিয়ালৰ উত্তৰ দিয়ে।",
      "কিছুমান প্ৰশ্নত এটা নিৰ্দিষ্ট মানৰ লগত সংখ্যাৰ এটা সম্পৰ্ক দিয়া থাকে আৰু এটা মাপ সোধা হয়, যেনে মধ্যমান দিয়া থাকি হেৰুৱা মান। এনে প্ৰশ্নত প্ৰথমে মুঠ যোগফল মধ্যমান আৰু সংখ্যাৰ পৰা বিচাৰি, তাৰ পিছত জনা মানবোৰ বিয়োগ কৰি হেৰুৱা মান পোৱা যায়। মুঠৰ ধাৰণাটো স্পষ্ট হ'লে এই পৰিয়ালৰ প্ৰতিটো প্ৰশ্ন দুই শাৰীত সমাধান হয়।",
      "আন এটা সচৰাচৰ ৰূপত এটা বাৰম্বাৰতা তালিকা দিয়া থাকে আৰু মধ্যমা বা বহুলক সোধা হয়। এনে প্ৰশ্নত প্ৰথমে তালিকাখন প্ৰসাৰিত ৰূপত লিখি সজোৱা হয়, তাৰ পিছত মাজৰ মান বা সৰ্বোচ্চ বাৰম্বাৰতাৰ মান বাছি লোৱা হয়। ধৈৰ্য্যৰে তালিকাখন লিখাটোৱেই এই পৰিয়ালৰ মূল, আৰু সজোৱাৰ পিছত উত্তৰ নিশ্চিতভাৱে ওলায়।",
      "কিছুমান প্ৰশ্নত এটা সংগ্ৰহৰ মধ্যমান দিয়া থাকে আৰু প্ৰতিটো মান সলনি কৰাৰ পিছত নতুন মধ্যমান সোধা হয়, বা এটা নতুন মান যোগ বা আঁতৰ কৰাৰ পিছত নতুন মধ্যমান সোধা হয়। এনে প্ৰশ্নত প্ৰথমে পুৰণি মুঠ বিচাৰি, পৰিৱৰ্তনটো লগাই নতুন মুঠ পোৱা যায়, আৰু তাৰ পিছত নতুন সংখ্যাৰে হৰণ কৰা হয়। মুঠৰ ধাৰণাটোৱেই এই পৰিয়ালৰ চাবি।",
      "আন এটা সচৰাচৰ ৰূপত এটা তথ্যৰ পৰা পৰিসৰ, মধ্যমান আৰু মধ্যমা তিনিওটা বিচৰা হয়। এনে প্ৰশ্নত প্ৰথমে তালিকাখন সজাই পৰিসৰ (ডাঙৰ − সৰু) আৰু মধ্যমা বিচাৰি, তাৰ পিছত যোগফল আৰু সংখ্যাৰে মধ্যমান বিচৰা হয়। তিনিওটা মাপ একে তালিকাৰ পৰা ওলায়, গতিকে এটা সজোৱা তালিকা তিনিবাৰ ব্যৱহাৰ কৰিলেই উত্তৰ ওলায়।",
      "কিছুমান প্ৰশ্নত এটা বাৰম্বাৰতা বিভাজন দিয়া থাকে আৰু মধ্যমান বা মধ্যমা সোধা হয়, য'ত তথ্যবোৰ শ্ৰেণীত ভগাই দিয়া থাকে। এনে প্ৰশ্নত প্ৰথমে প্ৰতিটো শ্ৰেণীৰ মধ্যবিন্দু বিচাৰি, তাৰ পিছত বাৰম্বাৰতাৰে গুণ কৰি যোগফল পোৱা যায়, আৰু তাৰ পিছত মুঠ বাৰম্বাৰতাৰে হৰণ কৰা হয়। শ্ৰেণীৰ মধ্যবিন্দু ব্যৱহাৰ কৰাটোৱেই এই পৰিয়ালৰ মূল কৌশল।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: পৰিসংখ্যাৰ চাৰিটা মাপ, মধ্যমান, মধ্যমা, বহুলক আৰু পৰিসৰ, প্ৰতিটোৱে তথ্যৰ এটা বেলেগ দিশ দেখুৱায়। মধ্যমান কেন্দ্ৰ, মধ্যমা মাজ, বহুলক সৰ্বাধিক সঘনতা আৰু পৰিসৰ বিস্তাৰ জোখে। এনে ধাৰণা স্পষ্ট হ'লে যিকোনো প্ৰশ্নত কোন মাপ বিচৰা হৈছে সেয়া তৎক্ষণাত চিনি পোৱা যায় আৰু শুদ্ধ পদ্ধতি বাছি লোৱা সহজ হয়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল মধ্যমা বা বহুলক বিচৰাৰ আগতে তালিকাখন বঢ়াৰ ক্ৰমত লিখা, কাৰণ ক্ৰমেই মাজৰ মান আৰু সৰ্বোচ্চ বাৰম্বাৰতা দৃশ্যমান কৰে। দ্বিতীয়টো হ'ল মধ্যমানৰ সৈতে কাম কৰোঁতে যোগফলটো দৃষ্টিত ৰখা, কাৰণ বেছিভাগ মধ্যমানৰ প্ৰশ্ন আচলতে যোগফলৰ প্ৰশ্ন। এই অভ্যাসৰ সৈতে পৰিসংখ্যাৰ প্ৰশ্নবোৰ আটাইতকৈ দ্ৰুতবোৰৰ এটা হৈ পৰে।",
      "কিছুমান প্ৰশ্নত তথ্যবোৰ এটা বাৰম্বাৰতা তালিকা বা এটা তালিকাৰ ৰূপত দিয়া থাকে, আৰু মধ্যমান, মধ্যমা বা বহুলক সোধা হয়। এনে প্ৰশ্নত প্ৰথমে তালিকাখন সজাই বা যোগফল নিৰ্ণয় কৰি, তাৰ পিছত প্ৰয়োজনীয় মাপ বিচৰা হয়। তথ্যৰ ৰূপ যিয়েই নহওক, পদ্ধতি একেই থাকে, গতিকে ঘাবৰি নাখাই ধৈৰ্য্যৰে আগবাঢ়িলেই উত্তৰ ওলায়।",
      "আন এটা সচৰাচৰ ৰূপত এটা নিৰ্দিষ্ট সংখ্যাৰ লগত সম্পৰ্কিত প্ৰশ্ন আহে, যেনে এটা মান সলনি কৰাৰ পিছত নতুন মধ্যমান। এনে প্ৰশ্নত প্ৰথমে যোগফলৰ পৰিৱৰ্তন বিচাৰি, তাৰ পিছত নতুন যোগফলক নতুন সংখ্যাৰে হৰণ কৰা হয়। এই ধৰণৰ প্ৰশ্নত যোগফলৰ ধাৰণাটো স্পষ্ট হ'লে কেতিয়াও ভুল নহয় আৰু উত্তৰ দ্ৰুত ওলায়।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: পৰিসংখ্যা আৰু তথ্য-ব্যাখ্যা দুয়োটা অধ্যায় ঘনিষ্ঠভাৱে জড়িত, কাৰণ তথ্য-ব্যাখ্যাৰ প্ৰশ্নত প্ৰায়ে মধ্যমান বা শতাংশ বিচৰা হয়। পৰিসংখ্যাৰ চাৰিটা মাপ স্পষ্ট হ'লে তথ্য-ব্যাখ্যাৰ প্ৰশ্নবোৰো সৰল হৈ পৰে, আৰু দুয়ো অধ্যায় একেলগে চৰ্চা কৰিলে পৰীক্ষাত সময় ৰাহি হয় আৰু ভুল কমি যায়।",
      "মধ্যমাৰ প্ৰশ্নত এটা গুৰুত্বপূৰ্ণ কথা মনত ৰখা উচিত: মানবোৰ সজোৱাৰ আগতে মাজৰ মান বাছি নল'ব। যদি তালিকাখন সজোৱা নহয়, তেন্তে যিকোনো মানক মাজৰ বুলি ভুল কৰাৰ সম্ভাৱনা থাকে। সজোৱাৰ পিছত অযুগ্ম সংখ্যাৰ বাবে এটা মান আৰু যুগ্ম সংখ্যাৰ বাবে দুটা মানৰ গড় লোৱাটো নিশ্চিত কৰিলে মধ্যমাৰ প্ৰতিটো প্ৰশ্ন শুদ্ধ হয়।",
    ],
  },
  list: {
    en: [
      "Mean = sum of values ÷ number of values.",
      "Total = mean × number of values.",
      "Adding a constant to every value adds it to the mean.",
      "Multiplying every value by a constant multiplies the mean.",
      "Mean of the first n natural numbers = (n + 1)/2.",
      "Mean of an arithmetic progression = (first + last)/2.",
      "Median: arrange in order, then take the middle value (or the average of the two middle values).",
      "Mode: the value with the highest frequency.",
      "Range = largest value − smallest value.",
      "Removed value = old total − new total.",
    ],
    as: [
      "মধ্যমান = মানবোৰৰ যোগফল ÷ মানৰ সংখ্যা।",
      "মুঠ = মধ্যমান × মানৰ সংখ্যা।",
      "প্ৰতিটো মানত এটা ধ্ৰুৱক যোগ কৰিলে মধ্যমানতো যোগ হয়।",
      "প্ৰতিটো মান এটা ধ্ৰুৱকৰে পূৰণ কৰিলে মধ্যমানতো পূৰণ হয়।",
      "প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ মধ্যমান = (n + ১)/২।",
      "সমান্তৰ প্ৰগতিৰ মধ্যমান = (প্ৰথম + শেষ)/২।",
      "মধ্যমা: সজাই, মাজৰ মান (বা দুটা মাজৰ মানৰ গড়) লওক।",
      "বহুলক: সৰ্বোচ্চ বাৰম্বাৰতাৰ মান।",
      "পৰিসৰ = আটাইতকৈ ডাঙৰ মান − আটাইতকৈ সৰু মান।",
      "আঁতৰোৱা মান = পুৰণি মুঠ − নতুন মুঠ।",
    ],
  },
  faqs: [
    {
      q: { en: "How do I find the median?", as: "মধ্যমা কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Arrange the values in increasing order first. With an odd count the median is the middle value; with an even count it is the average of the two middle values. For 1, 4, 9, 16, 25, 36, 49, 64 the median is (16 + 25)/2 = 20.5.",
        as: "প্ৰথমে মানবোৰ বঢ়াৰ ক্ৰমত সজাওক। অযুগ্ম সংখ্যাৰ বাবে মধ্যমা মাজৰ মান; যুগ্ম সংখ্যাৰ বাবে দুটা মাজৰ মানৰ গড়। ১, ৪, ৯, ১৬, ২৫, ৩৬, ৪৯, ৬৪ ৰ বাবে মধ্যমা (১৬ + ২৫)/২ = ২০.৫।",
      },
    },
    {
      q: { en: "How do I find the mean of a series quickly?", as: "শ্ৰেণীৰ মধ্যমান কেনেকৈ দ্ৰুতভাৱে বিচাৰিম?" },
      a: {
        en: "If the values are equally spaced the mean is the average of the first and last terms. The first 10 even numbers give (2 + 20)/2 = 11, and the first 10 odd numbers give (1 + 19)/2 = 10. The first n natural numbers give (n + 1)/2.",
        as: "মানবোৰ সমান ব্যৱধানত থাকিলে মধ্যমান প্ৰথম আৰু শেষ পদৰ গড়। প্ৰথম ১০ টা যুগ্ম সংখ্যাই (২ + ২০)/২ = ১১ দিয়ে, আৰু প্ৰথম ১০ টা অযুগ্মই (১ + ১৯)/২ = ১০। প্ৰথম n টা স্বাভাৱিক সংখ্যাই (n + ১)/২ দিয়ে।",
      },
    },
    {
      q: { en: "How do I find the mode?", as: "বহুলক কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Count how many times each value appears and pick the value with the highest count. In 5, 5, 6, 6, 6, 7, 8, 8 the mode is 6 because it appears three times. There can be more than one mode, or none if every value appears once.",
        as: "প্ৰতিটো মান কিমানবাৰ আছে গণনা কৰি সৰ্বোচ্চ বাৰম্বাৰতাৰ মানটো বাছক। ৫, ৫, ৬, ৬, ৬, ৭, ৮, ৮ ত বহুলক ৬, কাৰণ ই তিনি বাৰ আছে। এটাৰ অধিক বহুলক থাকিব পাৰে, বা প্ৰতিটো মান এবাৰকৈ থাকিলে কোনো নাথাকিবও পাৰে।",
      },
    },
    {
      q: { en: "What happens to the mean if every value is changed the same way?", as: "প্ৰতিটো মান একেই ধৰণে সলনি কৰিলে মধ্যমানৰ কি হয়?" },
      a: {
        en: "Adding a constant to every value adds the same constant to the mean; multiplying every value by a constant multiplies the mean; subtracting a constant subtracts it. So if the mean of 10 numbers is 15 and each is increased by 4, the new mean is 19.",
        as: "প্ৰতিটো মানত এটা ধ্ৰুৱক যোগ কৰিলে মধ্যমানত সেই ধ্ৰুৱকেই যোগ হয়; প্ৰতিটো মান এটা ধ্ৰুৱকৰে পূৰণ কৰিলে মধ্যমান পূৰণ হয়; বিয়োগ কৰিলে বিয়োগ হয়। গতিকে ১০ টা সংখ্যাৰ মধ্যমান ১৫ আৰু প্ৰতিটো ৪ ৰে বঢ়ালে নতুন মধ্যমান ১৯।",
      },
    },
    {
      q: { en: "How do I find a removed value from two means?", as: "দুটা মধ্যমানৰ পৰা আঁতৰোৱা মান কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Use the totals. If the mean of 5 numbers is 20, the total is 100; if the mean of the remaining 4 is 18, their total is 72. The removed value is 100 − 72 = 28. The same idea gives an added value from the rise in the total.",
        as: "মুঠ ব্যৱহাৰ কৰক। ৫ টা সংখ্যাৰ মধ্যমান ২০ হ'লে মুঠ ১০০; বাকী ৪ টাৰ মধ্যমান ১৮ হ'লে সিহঁতৰ মুঠ ৭২। আঁতৰোৱা মান ১০০ − ৭২ = ২৮। একেই ধাৰণাই মুঠৰ বৃদ্ধিৰ পৰা যোগ কৰা মান দিয়ে।",
      },
    },
  ],
};
