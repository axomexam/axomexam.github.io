"use strict";

/* RRB NTPC Mathematics — Compound Interest. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Compound Interest for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে চক্ৰবৃদ্ধি সুত" },
  p: {
    en: [
      "Compound interest is the chapter in which the interest of one year is added to the principal so that the next year's interest is earned on a larger sum, and it appears in the RRB NTPC Mathematics paper in a steady number of questions every year. The idea is the same as simple interest except for this one addition, and that single change is what the whole chapter tests. The amount after the first year becomes the principal for the second year, the amount after the second year becomes the principal for the third, and so on. Compound interest is therefore always greater than simple interest for the same sum, rate and time.",
      "The master formula is the amount equals the principal times one plus the rate divided by one hundred, raised to the power of the time. Written compactly, amount equals P times one plus R over one hundred, all to the power T, and the compound interest is the amount minus the principal. The factor one plus R over one hundred is used so often that it is worth calling it the growth factor and remembering its value for the common rates. At ten per cent the factor is one point one, at five per cent it is one point zero five, and the powers of these factors give the amount for any number of years.",
      "The time is the only part that needs care. When the interest is compounded annually, the rate and the time are both in years. When it is compounded half-yearly, the rate is halved and the time is doubled, so a rate of ten per cent per annum for one year becomes five per cent for two periods. When it is compounded quarterly, the rate is divided by four and the time is multiplied by four. The question always says which basis is meant, and the single most common mistake is to forget to halve or quarter the rate and double or quadruple the time.",
      "The most frequently asked question gives a sum, a rate and a time and asks for the compound interest. The working is to find the amount by the formula and subtract the principal. If the time is two years, the factor is squared, and if three years, it is cubed. A sum of eight thousand at ten per cent for two years has an amount of eight thousand times one point two one, which is nine thousand six hundred and eighty, so the compound interest is one thousand six hundred and eighty. Writing the factor first and then raising it to the power of the time is the safest order of work.",
      "A large and important family compares the compound interest with the simple interest. For two years the difference is the principal times the square of the rate divided by one hundred, and for three years the same quantity is multiplied by three plus the rate divided by one hundred. If the difference is given and the principal or the rate is asked, the same relations are used backwards. The difference is small, because it is the interest on the first year's interest alone, and recognising that makes the formula easy to remember rather than a thing to memorise blindly.",
      "The doubling and trebling questions have a neat structure. If a sum becomes two times in a given number of years, it becomes four times in twice that time, eight times in three times that time, and in general the given multiple raised to a power in the corresponding multiple of the period. A sum doubling in four years becomes eight times in twelve years and sixteen times in sixteen years, because eight is two cubed and sixteen is two to the fourth. The same reasoning answers the questions that give the multiple and ask for the time, and no rate is needed at all.",
      "The questions that give the amount and ask for the principal, the rate or the time are solved by rearranging the master formula. If the amount and the principal are given, their ratio is the factor raised to the power of the time; taking the appropriate root gives the factor and hence the rate. If the ratio is one point two one over two years, the square root is one point one and the rate is ten per cent. These reverse questions are common in the tougher papers and are solved by recognising the perfect squares and cubes of the usual factors.",
      "A distinctive family applies compound interest to populations, prices and the value of machines. A population that grows at a fixed percentage each year grows exactly like a compound interest sum, so the population after some years is the present population times the factor raised to the power of the years. Depreciation is the same calculation with the factor one minus the rate, so a machine losing ten per cent of its value each year is worth the present value times zero point nine squared after two years. Recognising these as compound interest problems removes all the difficulty.",
      "The questions that ask for the interest in a single year of the period are solved by finding the amount at the end of that year and at the end of the previous year and taking the difference. The interest of the second year is therefore the amount after the first year times the rate, which is greater than the first year's interest. A sum of one thousand at ten per cent earns one hundred in the first year and one hundred and ten in the second, because the second year's interest is charged on one thousand one hundred. This single comparison is the clearest illustration of what compounding means.",
      "Finally, the chapter rewards two habits. The first is to write the growth factor and raise it to the power of the time before multiplying by the principal, rather than trying to compute year by year. The second is to convert the time and the rate to the same basis, halving and doubling for half-yearly and quartering and quadrupling for quarterly. With these habits the compound interest questions become quick and reliable, and the same factor method answers the instalment and the population questions as well.",
    ],
    as: [
      "চক্ৰবৃদ্ধি সুত হৈছে সেই অধ্যায় য'ত এটা বছৰৰ সুত মূলধনত যোগ কৰা হয় যাতে পৰৱৰ্তী বছৰৰ সুত এটা ডাঙৰ ধনৰ ওপৰত অৰ্জন হয়, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা স্থিৰ সংখ্যক প্ৰশ্নত দেখা দিয়ে। এই এটা যোগৰ বাহিৰে ধাৰণাটো সৰল সুতৰ সমান, আৰু সেই এটা সলনিয়েই গোটেই অধ্যায়ই পৰীক্ষা কৰে। প্ৰথম বছৰৰ পিছত মুঠ দ্বিতীয় বছৰৰ মূলধন হয়, দ্বিতীয় বছৰৰ পিছত মুঠ তৃতীয়ৰ মূলধন হয়, ইত্যাদি। গতিকে চক্ৰবৃদ্ধি সুত একেই ধন, হাৰ আৰু সময়ৰ বাবে সদায় সৰল সুততকৈ বেছি।",
      "মূল সূত্ৰটো হ'ল মুঠ = মূলধন × (১ + হাৰ ÷ ১০০)^সময়। চমুকৈ, মুঠ = P × (১ + R ÷ ১০০)^T, আৰু চক্ৰবৃদ্ধি সুত = মুঠ − মূলধন। (১ + R ÷ ১০০) গুণকটো ইমান সঘনাই ব্যৱহাৰ হয় যে ইয়াক বৃদ্ধি-গুণক বুলি কৈ সাধাৰণ হাৰবোৰৰ বাবে ইয়াৰ মান মনত ৰখা উচিত। দহ শতাংশত গুণকটো ১.১, পাঁচ শতাংশত ১.০৫, আৰু এই গুণকবোৰৰ ঘাতে যিকোনো বছৰৰ বাবে মুঠ দিয়ে।",
      "সময়েই একমাত্ৰ অংশ য'ত সাৱধানতা লাগে। সুত বছৰি চক্ৰবৃদ্ধি হ'লে হাৰ আৰু সময় দুয়োটা বছৰত। আধা-বছৰি হ'লে হাৰ আধা কৰা হয় আৰু সময় দুগুণ কৰা হয়, গতিকে বছৰি দহ শতাংশ হাৰে এটা বছৰৰ বাবে দুটা কালত পাঁচ শতাংশ হয়। ত্ৰৈমাসিক হ'লে হাৰ চাৰিৰে হৰণ আৰু সময় চাৰিৰে পূৰণ কৰা হয়। প্ৰশ্নই সদায় কোনটো ভিত্তি বুলি কয়, আৰু আটাইতকৈ সচৰাচৰ ভুল হৈছে হাৰ আধা বা চাৰি ভাগ কৰিবলৈ আৰু সময় দুগুণ বা চাৰিগুণ কৰিবলৈ পাহৰা।",
      "আটাইতকৈ সচৰাচৰ সোধা প্ৰশ্নই এটা ধন, এটা হাৰ আৰু এটা সময় দি চক্ৰবৃদ্ধি সুত সোধে। কৰ্মটো হ'ল সূত্ৰেৰে মুঠ বিচাৰি মূলধন বিয়োগ কৰা। সময় দুবছৰ হ'লে গুণকটোৰ বৰ্গ, আৰু তিনি বছৰ হ'লে ঘন লোৱা হয়। আঠ হাজাৰ টকা দহ শতাংশত দুবছৰৰ মুঠ = ৮০০০ × ১.২১ = ৯৬৮০, গতিকে চক্ৰবৃদ্ধি সুত ১৬৮০। প্ৰথমে গুণক লিখি তাৰ পিছত সময়ৰ ঘাতলৈ তোলাটো আটাইতকৈ নিৰাপদ ক্ৰম।",
      "এটা ডাঙৰ আৰু গুৰুত্বপূৰ্ণ পৰিয়ালে চক্ৰবৃদ্ধি সুতক সৰল সুতৰ সৈতে তুলনা কৰে। দুবছৰৰ বাবে পাৰ্থক্য = মূলধন × (হাৰ ÷ ১০০)², আৰু তিনি বছৰৰ বাবে একেই ৰাশিক (৩ + হাৰ ÷ ১০০) ৰে পূৰণ কৰা হয়। পাৰ্থক্য বা মূলধন বা হাৰ দিয়া থাকিলে একেই সম্পৰ্ক উলটিকৈ ব্যৱহাৰ কৰা হয়। পাৰ্থক্যটো সৰু, কাৰণ ই কেৱল প্ৰথম বছৰৰ সুতৰ ওপৰত সুত, আৰু এইটো চিনি পোৱাটোৱে সূত্ৰটো অন্ধভাৱে মনত ৰখাৰ সলনি সহজে মনত ৰখাত সহায় কৰে।",
      "দুগুণ আৰু তিনিগুণৰ প্ৰশ্নবোৰৰ এটা পৰিষ্কাৰ গাঁথনি আছে। এটা ধন এটা দিয়া বছৰত দুগুণ হ'লে, ই সেই সময়ৰ দুগুণত চাৰিগুণ, তিনি গুণত আঠ গুণ, আৰু সাধাৰণতে দিয়া গুণিতকৰ ঘাত সেই সময়ৰ গুণিতকত হয়। চাৰি বছৰত দুগুণ হোৱা ধন বাৰ বছৰত আঠ গুণ আৰু ষোল বছৰত ষোল গুণ হয়, কাৰণ আঠ = ২³ আৰু ষোল = ২⁴। একেই যুক্তিয়ে গুণিতক দি সময় সোধা প্ৰশ্নৰ উত্তৰ দিয়ে, আৰু কোনো হাৰৰ প্ৰয়োজনেই নাই।",
      "মুঠ দি মূলধন, হাৰ বা সময় সোধা প্ৰশ্নবোৰ মূল সূত্ৰ পুনৰ্বিন্যাস কৰি সমাধান কৰা হয়। মুঠ আৰু মূলধন দিয়া থাকিলে, সিহঁতৰ অনুপাত সময়ৰ ঘাতলৈ তোলা গুণক; উপযুক্ত মূল ল'লে গুণক পোৱা যায় আৰু সেইদৰে হাৰ। দুবছৰত অনুপাত ১.২১ হ'লে বৰ্গমূল ১.১ আৰু হাৰ দহ শতাংশ। এই উলটি প্ৰশ্নবোৰ কঠিন প্ৰশ্নপত্ৰত সচৰাচৰ আৰু সাধাৰণ গুণকবোৰৰ পূৰ্ণ বৰ্গ আৰু ঘন চিনি পোৱাৰ পৰা সমাধান হয়।",
      "এটা স্বকীয় পৰিয়ালে চক্ৰবৃদ্ধি সুত জনসংখ্যা, দাম আৰু মেচিনৰ মূল্যত প্ৰয়োগ কৰে। এটা জনসংখ্যা প্ৰতি বছৰে এটা নিৰ্দিষ্ট শতাংশত বাঢ়িলে চক্ৰবৃদ্ধি সুতৰ ধনৰ দৰেই বাঢ়ে, গতিকে কিছু বছৰৰ পিছত জনসংখ্যা = বৰ্তমান জনসংখ্যা × সময়ৰ ঘাতলৈ গুণক। অৱক্ষয় একেই গণনা (১ − হাৰ) গুণকেৰে, গতিকে বছৰি দহ শতাংশ মূল্য হেৰুওৱা মেচিন দুবছৰৰ পিছত বৰ্তমান মূল্য × ০.৯² ৰ সমান। এইবোৰক চক্ৰবৃদ্ধি সুতৰ সমস্যা হিচাপে চিনি পোৱাটোৱে গোটেই কঠিনতা আঁতৰায়।",
      "সময়ৰ এটা নিৰ্দিষ্ট বছৰৰ সুত সোধা প্ৰশ্নবোৰ সেই বছৰৰ শেষত আৰু পূৰ্বৰ বছৰৰ শেষত মুঠ বিচাৰি পাৰ্থক্য লৈ সমাধান কৰা হয়। গতিকে দ্বিতীয় বছৰৰ সুত = প্ৰথম বছৰৰ পিছত মুঠ × হাৰ, যি প্ৰথম বছৰৰ সুততকৈ বেছি। এক হাজাৰ টকা দহ শতাংশত প্ৰথম বছৰত এশ টকা আৰু দ্বিতীয় বছৰত এশ দহ টকা আয় কৰে, কাৰণ দ্বিতীয় বছৰৰ সুত এক হাজাৰ এশ টকাৰ ওপৰত লোৱা হয়। এই এটা তুলনাই চক্ৰবৃদ্ধিৰ অৰ্থৰ আটাইতকৈ স্পষ্ট উদাহৰণ।",
      "কিছুমান প্ৰশ্নত এটা ধন এটা নিৰ্দিষ্ট সময়ত এটা নিৰ্দিষ্ট গুণিতকলৈ যোৱাৰ তথ্য দি হাৰ সোধা হয়। এনে প্ৰশ্নত মুঠ আৰু মূলধনৰ অনুপাত বিচাৰি তাৰ পৰা সময়ৰ ঘাতৰ মূল লৈ গুণক উলিওৱা হয়, আৰু গুণকৰ পৰা হাৰ ওলায়। যদি ধন দুবছৰত ১.২১ গুণ হয়, বৰ্গমূল ১.১ আৰু হাৰ ১০%। এই পদ্ধতি চক্ৰবৃদ্ধি সুতৰ উলটি প্ৰশ্নবোৰৰ মূল আৰু সাধাৰণ গুণকবোৰৰ পূৰ্ণ বৰ্গ আৰু ঘন মনত ৰখাটোৱে ইয়াক দ্ৰুত কৰে।",
      "আন এটা গুৰুত্বপূৰ্ণ ৰূপত দুটা বেলেগ ধনৰ চক্ৰবৃদ্ধি সুত বা দুটা বেলেগ সময়ৰ সুত তুলনা কৰা হয়। এনে প্ৰশ্নত প্ৰতিটো ধনৰ গুণক আৰু সময় সুকীয়াকৈ লিখি অনুপাত বিচৰা হয়। যদি এটা ধন ৫% আৰু আনটো ১০% হাৰত দুবছৰৰ বাবে বিনিয়োগ কৰা হয়, তেন্তে গুণক ১.১০২৫ আৰু ১.২১, আৰু সুতৰ অনুপাত সেই অনুপাতৰ পৰা ওলায়। চক্ৰবৃদ্ধি সুত ৰৈখিকভাৱে নবাঢ়ে বুলি মনত ৰখাটোৱে এনে তুলনামূলক প্ৰশ্নত সহায় কৰে, কাৰণ দুগুণ হাৰে চাৰিগুণ সুত নিদিয়ে।",
      "পৰীক্ষাত চক্ৰবৃদ্ধি সুতৰ প্ৰশ্নবোৰ প্ৰায়ে বেংকৰ জমা, ঋণ বা বিনিয়োগৰ ৰূপত আহে। এনে ক্ষেত্ৰত সোধা হয় এটা নিৰ্দিষ্ট সময়ৰ পিছত ধন কিমান হ'ব বা কিমান সুত পোৱা যাব। মূলধন, হাৰ আৰু সময় চিনি লৈ গুণকটো সাজি সময়ৰ ঘাতলৈ তুলিলেই মুঠ ওলায়। ভাষা যিয়েই নহওক, গাণিতিক গঠনটো একেই থাকে, গতিকে বাস্তৱ পৰিস্থিতিৰ শব্দই প্ৰাৰ্থীক বিভ্ৰান্ত কৰা উচিত নহয়।",
      "আন এটা সচৰাচৰ প্ৰশ্নত এটা ধনৰ এটা অংশ এটা হাৰত আৰু বাকী অংশ আন এটা হাৰত চক্ৰবৃদ্ধিত বিনিয়োগ কৰা হয় আৰু মুঠ সুত দিয়া থাকে। এনে প্ৰশ্নত প্ৰতিটো অংশৰ গুণক সুকীয়াকৈ লিখি দুয়োটা সুতৰ যোগফলক দিয়া মুঠৰ সৈতে সমীকৰণ কৰা হয়। এটা অজ্ঞাত ধৰি সমীকৰণ সজাটোৱেই এই প্ৰশ্নবোৰৰ মূল, আৰু সমাধান কৰিলে অজ্ঞাত অংশটো ওলায়। এই ৰূপ সৰল সুতৰ দুটা-অংশৰ প্ৰশ্নৰ সৈতে একেই ধৰণে কাম কৰে, মাত্ৰ গুণকবোৰ বেলেগ।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল মূলধনেৰে পূৰণ কৰাৰ আগতে বৃদ্ধি-গুণক লিখি সময়ৰ ঘাতলৈ তোলা, বছৰে বছৰে গণনা কৰিবলৈ চেষ্টা কৰাৰ সলনি। দ্বিতীয়টো হ'ল সময় আৰু হাৰক একেই ভিত্তিলৈ ৰূপান্তৰ কৰা — আধা-বছৰিৰ বাবে আধা আৰু দুগুণ, ত্ৰৈমাসিকৰ বাবে চাৰি ভাগ আৰু চাৰিগুণ। এই অভ্যাসৰ সৈতে চক্ৰবৃদ্ধি সুতৰ প্ৰশ্নবোৰ দ্ৰুত আৰু নিৰ্ভৰযোগ্য হৈ পৰে, আৰু একেই গুণক পদ্ধতিয়ে কিস্তি আৰু জনসংখ্যাৰ প্ৰশ্নৰ উত্তৰ দিয়ে।",
    ],
  },
  list: {
    en: [
      "Amount = P × (1 + R ÷ 100)^T; CI = amount − principal.",
      "Half-yearly: halve the rate and double the time; quarterly: quarter the rate and quadruple the time.",
      "CI − SI for 2 years = P × (R ÷ 100)²; for 3 years multiply by (3 + R ÷ 100).",
      "Doubling in t years means 2ⁿ times in nt years; no rate is needed.",
      "Amount ÷ principal = the growth factor raised to the power of the time.",
      "Rate from the amount: take the square root (2 years) or cube root (3 years) of amount ÷ principal.",
      "Interest of a single year = amount at the end of that year × rate.",
      "Population growth uses the same factor; depreciation uses (1 − R ÷ 100).",
      "Growth at 10% gives the factor 1.1; at 5% the factor is 1.05.",
      "Write the factor first, raise it to the power of the time, then multiply by the principal.",
    ],
    as: [
      "মুঠ = P × (১ + R ÷ ১০০)^T; চক্ৰবৃদ্ধি সুত = মুঠ − মূলধন।",
      "আধা-বছৰি: হাৰ আধা আৰু সময় দুগুণ; ত্ৰৈমাসিক: হাৰ চাৰি ভাগ আৰু সময় চাৰিগুণ।",
      "২ বছৰৰ চক্ৰবৃদ্ধি-সৰল পাৰ্থক্য = P × (R ÷ ১০০)²; ৩ বছৰত (৩ + R ÷ ১০০) ৰে পূৰণ কৰক।",
      "t বছৰত দুগুণ মানে nt বছৰত ২ⁿ গুণ; কোনো হাৰৰ প্ৰয়োজন নাই।",
      "মুঠ ÷ মূলধন = সময়ৰ ঘাতলৈ তোলা বৃদ্ধি-গুণক।",
      "মুঠৰ পৰা হাৰ: (মুঠ ÷ মূলধন) ৰ বৰ্গমূল (২ বছৰ) বা ঘনমূল (৩ বছৰ) লওক।",
      "এটা বছৰৰ সুত = সেই বছৰৰ শেষত মুঠ × হাৰ।",
      "জনসংখ্যাৰ বৃদ্ধি একেই গুণক ব্যৱহাৰ কৰে; অৱক্ষয়ত (১ − R ÷ ১০০) ব্যৱহাৰ কৰে।",
      "১০% বৃদ্ধিত গুণক ১.১; ৫% ত গুণক ১.০৫।",
      "প্ৰথমে গুণক লিখি সময়ৰ ঘাতলৈ তোলক, তাৰ পিছত মূলধনেৰে পূৰণ কৰক।",
    ],
  },
  faqs: [
    {
      q: { en: "Why is compound interest greater than simple interest?", as: "চক্ৰবৃদ্ধি সুত সৰল সুততকৈ কিয় বেছি?" },
      a: {
        en: "Because each year's interest is added to the principal and earns interest in the following years, while in simple interest the interest is charged on the original principal alone. For two years the extra amount is exactly the interest on the first year's interest.",
        as: "কাৰণ প্ৰতিটো বছৰৰ সুত মূলধনত যোগ হৈ পৰৱৰ্তী বছৰবোৰত সুত অৰ্জন কৰে, য'ত সৰল সুতত সুত কেৱল মূল মূলধনৰ ওপৰত লোৱা হয়। দুবছৰৰ বাবে অতিৰিক্ত ৰাশি প্ৰথম বছৰৰ সুতৰ ওপৰত সুতৰ সমান।",
      },
    },
    {
      q: { en: "How do I use half-yearly or quarterly compounding?", as: "আধা-বছৰি বা ত্ৰৈমাসিক চক্ৰবৃদ্ধি কেনেকৈ ব্যৱহাৰ কৰিম?" },
      a: {
        en: "Change both the rate and the time. For half-yearly, halve the annual rate and double the number of years. For quarterly, divide the rate by four and multiply the years by four. Then apply the same formula with the new rate and the new number of periods.",
        as: "হাৰ আৰু সময় দুয়োটা সলনি কৰক। আধা-বছৰিৰ বাবে বছৰি হাৰ আধা আৰু বছৰৰ সংখ্যা দুগুণ কৰক। ত্ৰৈমাসিকৰ বাবে হাৰ চাৰিৰে হৰণ আৰু বছৰ চাৰিৰে পূৰণ কৰক। তাৰ পিছত নতুন হাৰ আৰু নতুন কালৰ সংখ্যাৰ সৈতে একেই সূত্ৰ প্ৰয়োগ কৰক।",
      },
    },
    {
      q: { en: "How do I find the rate from the amount?", as: "মুঠৰ পৰা হাৰ কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Divide the amount by the principal to get the growth factor raised to the power of the time. Take the square root for two years or the cube root for three years, subtract one, and multiply by a hundred. If the ratio is 1.21 for two years, the factor is 1.1 and the rate is 10 per cent.",
        as: "মুঠক মূলধনেৰে হৰণ কৰি সময়ৰ ঘাতলৈ তোলা বৃদ্ধি-গুণক পাব। দুবছৰৰ বাবে বৰ্গমূল বা তিনি বছৰৰ বাবে ঘনমূল লৈ এক বিয়োগ কৰি এশৰে পূৰণ কৰক। দুবছৰত অনুপাত ১.২১ হ'লে গুণক ১.১ আৰু হাৰ ১০ শতাংশ।",
      },
    },
    {
      q: { en: "How do I answer a question where a sum becomes many times a given multiple?", as: "এটা ধন এটা দিয়া গুণিতকৰ বহুগুণ হোৱা প্ৰশ্ন কেনেকৈ উত্তৰ দিম?" },
      a: {
        en: "Express the required multiple as a power of the given multiple. If a sum doubles in t years, then 8 times is 2 cubed, so it takes 3t years, and 32 times is 2 to the fifth, so it takes 5t years. The rate is never needed.",
        as: "প্ৰয়োজনীয় গুণিতকটো দিয়া গুণিতকৰ ঘাত হিচাপে প্ৰকাশ কৰক। এটা ধন t বছৰত দুগুণ হ'লে, ৮ গুণ = ২³, গতিকে 3t বছৰ লাগে, আৰু ৩২ গুণ = ২⁵, গতিকে 5t বছৰ লাগে। হাৰ কেতিয়াও প্ৰয়োজন নহয়।",
      },
    },
    {
      q: { en: "How do I apply compound interest to population or depreciation?", as: "চক্ৰবৃদ্ধি সুত জনসংখ্যা বা অৱক্ষয়ত কেনেকৈ প্ৰয়োগ কৰিম?" },
      a: {
        en: "Population growth and price rise use the same factor (1 + R ÷ 100) raised to the number of years. Depreciation uses (1 − R ÷ 100). Multiply the present value by the appropriate factor to get the value after the given years.",
        as: "জনসংখ্যাৰ বৃদ্ধি আৰু দাম বৃদ্ধি একেই গুণক (১ + R ÷ ১০০) বছৰৰ সংখ্যাৰ ঘাতলৈ ব্যৱহাৰ কৰে। অৱক্ষয়ত (১ − R ÷ ১০০) ব্যৱহাৰ কৰে। দিয়া বছৰৰ পিছত মান পাবলৈ বৰ্তমান মূল্যক উপযুক্ত গুণকেৰে পূৰণ কৰক।",
      },
    },
  ],
};
