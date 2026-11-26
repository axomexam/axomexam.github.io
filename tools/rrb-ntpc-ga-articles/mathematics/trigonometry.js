"use strict";

/* RRB NTPC Mathematics — Trigonometry. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Trigonometry for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে ত্ৰিকোণমিতি" },
  p: {
    en: [
      "Trigonometry is the chapter that studies the ratios of the sides of a right-angled triangle, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter has three parts that the paper treats together: the six ratios and their standard values, the identities that link them, and the questions that give one ratio and ask for another. Almost every question is a direct application of a standard value or an identity, so the chapter rewards a good memory and clean substitution.",
      "The six ratios are defined for an acute angle of a right-angled triangle. Taking the side opposite the angle, the side adjacent to it and the hypotenuse, the sine is opposite over hypotenuse, the cosine is adjacent over hypotenuse and the tangent is opposite over adjacent. The remaining three are their reciprocals: cosecant is hypotenuse over opposite, secant is hypotenuse over adjacent, and cotangent is adjacent over opposite. Fixing these six definitions in the mind is the foundation of the whole chapter.",
      "The standard values are the second foundation, and they are asked directly more often than any other family. The sine rises from zero at zero degrees through one-half at thirty degrees and one over root two at forty-five degrees to root three over two at sixty degrees and one at ninety degrees, and the cosine is the same list read backwards. The tangent is zero at zero degrees, one over root three at thirty degrees, one at forty-five degrees, root three at sixty degrees, and undefined at ninety degrees. Writing this small table from memory is worth the effort many times over.",
      "The Pythagorean identities link the ratios of the same angle. The square of the sine plus the square of the cosine is one for every angle, and dividing this by the square of the cosine gives one plus the square of the tangent equals the square of the secant, while dividing by the square of the sine gives one plus the square of the cotangent equals the square of the cosecant. These three identities are the source of a large family of simplification questions, and they are also the fastest route to a ratio when another is given.",
      "The complementary-angle relations form the next family. The sine of an angle equals the cosine of its complement, the tangent equals the cotangent of the complement, and the secant equals the cosecant of the complement. This is why the sine of thirty degrees equals the cosine of sixty degrees, and why a question that sets the sine of one angle equal to the cosine of another can be solved by adding the two angles to ninety degrees. Recognising the complement saves a whole calculation.",
      "The questions that give one ratio and ask for another are solved by drawing the triangle. If the sine of the angle is three over five, the opposite side is three and the hypotenuse five, so the adjacent side is four by the Pythagoras theorem and the cosine is four over five and the tangent three over four. The numbers three, four, five and their multiples, together with five, twelve, thirteen and eight, fifteen, seventeen, cover most of these questions, and drawing the triangle makes the remaining ratio a matter of reading two sides.",
      "The simplification questions ask for the value of an expression built from the ratios. The standard technique is to replace every ratio by its definition in terms of the sine and cosine, to combine the resulting fractions over a common denominator, and then to use the identity that the sum of the squares is one. Expressions such as the square of the sine plus the square of the cosine, or the secant squared minus the tangent squared, collapse to one in a single step once the identity is seen.",
      "The questions that give a relation between the ratios of an angle are solved by turning the relation into a value of one ratio. If the sine equals the cosine, then the tangent is one and the angle is forty-five degrees. If the tangent is one, the angle is forty-five degrees, and if the tangent is one over root three, the angle is thirty degrees. Reducing a relation to a single ratio and then reading the standard table is the whole method for this family.",
      "The questions that give two conditions on two angles are solved by treating the two angles as a small simultaneous system. If the sine of A plus B is one and the cosine of A minus B is one, then A plus B is ninety degrees and A minus B is zero, so A and B are both forty-five degrees. The same technique with tangents is used when the conditions involve the tangent of the sum and of the difference, and the arithmetic is the arithmetic of the simultaneous equations chapter.",
      "The maximum and minimum questions rest on the fact that the sine and the cosine of any angle lie between minus one and one. The maximum of the sine is one and the minimum minus one, and the same holds for the cosine. The maximum of the sum of the sine and the cosine is root two, reached at forty-five degrees, and the maximum of a quantity of the form a sine plus b cosine is the square root of the sum of the squares of a and b. These facts answer a small but frequent family.",
      "The questions on the value of an expression at a given angle are solved by substituting the standard values and simplifying. At forty-five degrees the sine and cosine are both one over root two, so their sum is root two; at thirty degrees the tangent is one over root three and the cotangent root three, so their sum is four over root three. Substituting carefully and rationalising the final fraction is the whole method, and the arithmetic is the arithmetic of surds.",
      "Finally, the chapter rewards two habits. The first is to memorise the table of standard values and the three Pythagorean identities until they can be written without hesitation, because almost every question is a one-line use of one of them. The second is to draw the right triangle whenever a ratio is given, so that the remaining ratios can be read off the figure. With these habits the trigonometry questions become among the quickest in the paper, and the same ratios carry directly into the chapter on heights and distances.",
    ],
    as: [
      "ত্ৰিকোণমিতি হৈছে সেই অধ্যায় যি এটা সমকোণী ত্ৰিভুজৰ বাহুবোৰৰ অনুপাত অধ্যয়ন কৰে, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টোৰ তিনিটা অংশ আছে যিবোৰ প্ৰশ্নপত্ৰই একেলগে লয়: ছটা অনুপাত আৰু সিহঁতৰ প্ৰামাণিক মান, অনুপাতবোৰক সংযোগ কৰা অভেদ, আৰু এটা অনুপাত দি আন এটা সোধা প্ৰশ্ন। প্ৰায় প্ৰতিটো প্ৰশ্ন এটা প্ৰামাণিক মান বা অভেদৰ সোজা প্ৰয়োগ।",
      "ছটা অনুপাত এটা সমকোণী ত্ৰিভুজৰ সূক্ষ্ম কোণৰ বাবে সংজ্ঞায়িত কৰা হয়। কোণটোৰ বিপৰীত বাহু, সন্নিহিত বাহু আৰু কৰ্ণ লৈ, sine = বিপৰীত ÷ কৰ্ণ, cosine = সন্নিহিত ÷ কৰ্ণ আৰু tangent = বিপৰীত ÷ সন্নিহিত। বাকী তিনিটা সিহঁতৰ ব্যস্ত: cosecant = কৰ্ণ ÷ বিপৰীত, secant = কৰ্ণ ÷ সন্নিহিত, আৰু cotangent = সন্নিহিত ÷ বিপৰীত। এই ছটা সংজ্ঞা মনত ৰখাটোৱেই গোটেই অধ্যায়ৰ ভেটি।",
      "প্ৰামাণিক মানবোৰ দ্বিতীয় ভেটি, আৰু আন যিকোনো পৰিয়ালতকৈ ইহঁত প্ৰায়ে পোনপটীয়াকৈ সোধা হয়। sine শূন্যৰ পৰা আৰম্ভ কৰি ত্ৰিশ ডিগ্ৰীত এক-দ্বিতীয়াংশ, পঁয়তাল্লিশত এক-বিভাজ-মূল-দুই, ষাঠিত মূল-তিন-বিভাজ-দুই, আৰু নব্বৈত এক হয়, আৰু cosine একেই তালিকা ওলোটা ক্ৰমত। tangent শূন্যত শূন্য, ত্ৰিশত এক-বিভাজ-মূল-তিন, পঁয়তাল্লিশত এক, ষাঠিত মূল-তিন, আৰু নব্বৈত অনিৰ্দিষ্ট। এই সৰু তালিকা মনত ৰখাটো বহুগুণে লাভজনক।",
      "পাইথাগোৰীয় অভেদে একেই কোণৰ অনুপাতবোৰক সংযোগ কৰে। sine ৰ বৰ্গ যোগ cosine ৰ বৰ্গ প্ৰতিটো কোণৰ বাবে এক, আৰু ইয়াক cosine ৰ বৰ্গৰে হৰণ কৰিলে এক যোগ tangent ৰ বৰ্গ = secant ৰ বৰ্গ, আৰু sine ৰ বৰ্গৰে হৰণ কৰিলে এক যোগ cotangent ৰ বৰ্গ = cosecant ৰ বৰ্গ। এই তিনিটা অভেদেই সৰলীকৰণৰ এটা ডাঙৰ পৰিয়ালৰ উৎস।",
      "পূৰক কোণৰ সম্পৰ্কই পিছৰ পৰিয়াল গঠন কৰে। এটা কোণৰ sine তাৰ পূৰকৰ cosine ৰ সমান, tangent তাৰ পূৰকৰ cotangent ৰ সমান, আৰু secant তাৰ পূৰকৰ cosecant ৰ সমান। এই কাৰণেই ত্ৰিশ ডিগ্ৰীৰ sine ষাঠি ডিগ্ৰীৰ cosine ৰ সমান, আৰু এটা কোণৰ sine আন এটাৰ cosine ৰ সমান ধৰা প্ৰশ্ন দুয়ো কোণ যোগ কৰি নব্বৈ ডিগ্ৰী কৰি সমাধান কৰা হয়। পূৰকটো চিনি পোৱাটোৱে গোটেই এটা গণনা ৰাহি কৰে।",
      "এটা অনুপাত দি আন এটা সোধা প্ৰশ্ন ত্ৰিভুজ আঁকি সমাধান কৰা হয়। কোণটোৰ sine পাঁচ-তিনি হ'লে, বিপৰীত বাহু তিন আৰু কৰ্ণ পাঁচ, গতিকে পাইথাগোৰাছৰ উপপাদ্যৰে সন্নিহিত বাহু চাৰি আৰু cosine চাৰি-পাঁচ আৰু tangent তিনি-চাৰি। তিন, চাৰি, পাঁচ আৰু সিহঁতৰ গুণিতক, লগতে পাঁচ, বাৰ, তেৰ আৰু আঠ, পোন্ধৰ, সোতৰে এই প্ৰশ্নবোৰৰ বেছিভাগ সামৰি লয়।",
      "সৰলীকৰণৰ প্ৰশ্নই অনুপাতৰে গঢ়া এটা ৰাশিৰ মান সোধে। প্ৰামাণিক কৌশল হ'ল প্ৰতিটো অনুপাতক sine আৰু cosine ৰ জৰিয়তে প্ৰতিস্থাপন কৰা, ওলোৱা ভগ্নাংশবোৰ এটা সাধাৰণ হৰত লোৱা, আৰু তাৰ পিছত বৰ্গৰ যোগফল এক এই অভেদ ব্যৱহাৰ কৰা। sine ৰ বৰ্গ যোগ cosine ৰ বৰ্গ, বা secant ৰ বৰ্গ বিয়োগ tangent ৰ বৰ্গ, অভেদটো দেখা পালে এটা পদক্ষেপতে একলৈ চুপি যায়।",
      "এটা কোণৰ অনুপাতবোৰৰ মাজৰ সম্পৰ্ক দিয়া প্ৰশ্ন সম্পৰ্কটোক এটা অনুপাতৰ মানলৈ ৰূপান্তৰ কৰি সমাধান কৰা হয়। sine cosine ৰ সমান হ'লে, tangent এক আৰু কোণ পঁয়তাল্লিশ ডিগ্ৰী। tangent এক হ'লে কোণ পঁয়তাল্লিশ ডিগ্ৰী, আৰু tangent এক-বিভাজ-মূল-তিন হ'লে কোণ ত্ৰিশ ডিগ্ৰী। সম্পৰ্কটোক এটা অনুপাতলৈ নামাই প্ৰামাণিক তালিকা পঢ়াটোৱেই এই পৰিয়ালৰ গোটেই পদ্ধতি।",
      "দুটা কোণৰ ওপৰত দুটা চৰ্ত দিয়া প্ৰশ্ন দুয়ো কোণক এটা সৰু যুগপৎ পদ্ধতি হিচাপে ধৰি সমাধান কৰা হয়। A যোগ B ৰ sine এক আৰু A বিয়োগ B ৰ cosine এক হ'লে, A যোগ B নব্বৈ ডিগ্ৰী আৰু A বিয়োগ B শূন্য, গতিকে A আৰু B দুয়ো পঁয়তাল্লিশ ডিগ্ৰী। tangent জড়িত চৰ্তৰ বাবেও একেই কৌশল ব্যৱহাৰ কৰা হয়, আৰু গণনাটো যুগপৎ সমীকৰণ অধ্যায়ৰ গণনা।",
      "সৰ্বোচ্চ আৰু সৰ্বনিম্নৰ প্ৰশ্ন এই তথ্যৰ ওপৰত ৰয় যে যিকোনো কোণৰ sine আৰু cosine −১ আৰু ১ ৰ মাজত থাকে। sine ৰ সৰ্বোচ্চ এক আৰু সৰ্বনিম্ন −১, আৰু cosine ৰ বাবেও একেই। sine আৰু cosine ৰ যোগফলৰ সৰ্বোচ্চ মূল-দুই, পঁয়তাল্লিশ ডিগ্ৰীত পোৱা যায়, আৰু a sine যোগ b cosine ৰূপৰ ৰাশিৰ সৰ্বোচ্চ a আৰু b ৰ বৰ্গৰ যোগফলৰ বৰ্গমূল। এই তথ্যই এটা সৰু কিন্তু সঘন পৰিয়ালৰ উত্তৰ দিয়ে।",
      "এটা দিয়া কোণত ৰাশিৰ মান সোধা প্ৰশ্ন প্ৰামাণিক মানবোৰ বহুৱাই সৰল কৰি সমাধান কৰা হয়। পঁয়তাল্লিশ ডিগ্ৰীত sine আৰু cosine দুয়ো এক-বিভাজ-মূল-দুই, গতিকে যোগফল মূল-দুই; ত্ৰিশ ডিগ্ৰীত tangent এক-বিভাজ-মূল-তিন আৰু cotangent মূল-তিন, গতিকে যোগফল চাৰি-বিভাজ-মূল-তিন। সাৱধানে বহুৱাই শেষৰ ভগ্নাংশটো পৰিমেয় কৰাটোৱেই গোটেই পদ্ধতি।",
      "কিছুমান প্ৰশ্নত এটা অভেদ দিয়া থাকে য'ত ভগ্নাংশৰ ৰূপত ৰাশি থাকে, আৰু সেয়া সৰল কৰি এটা মান সোধা হয়। এনে প্ৰশ্নত প্ৰথমে প্ৰতিটো অনুপাতক sine আৰু cosine ৰ জৰিয়তে লিখি, ভগ্নাংশবোৰ এটা সাধাৰণ হৰত লৈ, তাৰ পিছত sine ৰ বৰ্গ যোগ cosine ৰ বৰ্গ = ১ ব্যৱহাৰ কৰা হয়। এই পদ্ধতিত ৰাশিটো এটা পদক্ষেপতে সৰল হয় আৰু মান ওলায়।",
      "আন এটা সচৰাচৰ ৰূপত এটা কোণৰ দুটা অনুপাত দি সিহঁতৰ যোগফল বা গুণফল সোধা হয়। এনে প্ৰশ্নত প্ৰথমে দিয়া অনুপাতৰ পৰা এটা সমকোণী ত্ৰিভুজ আঁকি বাকী বাহুবোৰ বিচাৰি, তাৰ পিছত প্ৰয়োজনীয় অনুপাতবোৰ পোৱা যায়। যদি sin θ = ৮/১৭ হয়, ত্ৰিভুজত cos θ = ১৫/১৭, আৰু তেতিয়া যিকোনো ৰাশিৰ মান সহজে ওলায়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল প্ৰামাণিক মানৰ তালিকা আৰু তিনিটা পাইথাগোৰীয় অভেদ দ্বিধা নকৰাকৈ লিখিব পৰাকৈ মনত ৰখা, কাৰণ প্ৰায় প্ৰতিটো প্ৰশ্ন সিহঁতৰ এটাৰ এশাৰী প্ৰয়োগ। দ্বিতীয়টো হ'ল এটা অনুপাত দিয়া থাকিলে সমকোণী ত্ৰিভুজটো আঁকা, যাতে বাকী অনুপাতবোৰ চিত্ৰৰ পৰা পঢ়িব পাৰি। এই অভ্যাসৰ সৈতে ত্ৰিকোণমিতিৰ প্ৰশ্নবোৰ আটাইতকৈ দ্ৰুতবোৰৰ এটা হৈ পৰে।",
      "কিছুমান প্ৰশ্নত এটা সমীকৰণ দিয়া থাকে য'ত sine, cosine বা tangent ৰ এটা ধ্ৰুৱক থাকে, আৰু কোণটো সোধা হয়। এনে প্ৰশ্নত প্ৰথমে অনুপাতটো এটা প্ৰামাণিক মানলৈ ৰূপান্তৰ কৰি, তাৰ পিছত প্ৰামাণিক তালিকাৰ পৰা কোণটো পঢ়া হয়। 2 sin θ = ১ ৰ পৰা sin θ = ১/২ আৰু θ = ৩০°; √৩ tan θ = ১ ৰ পৰা tan θ = ১/√৩ আৰু θ = ৩০°। এই প্ৰশ্নবোৰ দুই শাৰীত সমাধান হয়।",
      "আন এটা সচৰাচৰ ৰূপত এটা অভেদ প্ৰমাণ কৰিবলৈ বা সৰল কৰিবলৈ দিয়া হয়, য'ত ভগ্নাংশৰ ৰূপত থকা ৰাশি থাকে। এনে প্ৰশ্নত প্ৰথমে ভগ্নাংশবোৰ এটা সাধাৰণ হৰত লৈ, তাৰ পিছত sine ৰ বৰ্গ যোগ cosine ৰ বৰ্গ = ১ ব্যৱহাৰ কৰি সৰল কৰা হয়। ধৈৰ্য্যৰে প্ৰতিটো পদক্ষেপ লিখিলে এই ৰাশিবোৰ নিশ্চিতভাৱে সৰল হয় আৰু উত্তৰ ওলায়।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: ত্ৰিকোণমিতি, উচ্চতা-দূৰত্ব আৰু জ্যামিতি তিনিওটা অধ্যায় ঘনিষ্ঠভাৱে জড়িত। উচ্চতা-দূৰত্বৰ প্ৰশ্নত উন্নতি কোণৰ tangent বা sine ব্যৱহাৰ কৰা হয়, আৰু জ্যামিতিত সমকোণী ত্ৰিভুজৰ বাহুৰ অনুপাতেই ত্ৰিকোণমিতিক অনুপাত। এই সংযোগ স্পষ্ট হ'লে তিনিওটা অধ্যায়ৰ প্ৰশ্নবোৰ সৰল আৰু নিৰ্ভৰযোগ্য হৈ পৰে।",
      "কিছুমান প্ৰশ্নত দুটা অনুপাতৰ মাজৰ সম্পৰ্ক দিয়া থাকে, যেনে sin θ = cos θ বা tan θ = cot θ। এনে প্ৰশ্নত সম্পৰ্কটো সৰল কৰি এটা অনুপাতলৈ অনা হয়, আৰু তাৰ পিছত কোণ নিৰ্ণয় কৰা হয়। sin θ = cos θ ৰ পৰা tan θ = ১, গতিকে θ = ৪৫°; tan θ = cot θ ৰ পৰাও একেই ফল ওলায়। এই প্ৰশ্নবোৰ দ্ৰুত আৰু অভেদ স্পষ্ট হ'লে কেতিয়াও ভুল নহয়।",
    ],
  },
  list: {
    en: [
      "sin θ = opposite/hypotenuse; cos θ = adjacent/hypotenuse; tan θ = opposite/adjacent.",
      "cosec, sec and cot are the reciprocals of sin, cos and tan.",
      "Standard values: sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1.",
      "cos 60° = 1/2, cos 45° = 1/√2, cos 30° = √3/2, cos 0° = 1.",
      "tan 30° = 1/√3, tan 45° = 1, tan 60° = √3.",
      "sin²θ + cos²θ = 1.",
      "1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ.",
      "sin(90° − θ) = cos θ; tan(90° − θ) = cot θ.",
      "sin θ and cos θ lie between −1 and 1.",
      "If sin θ = 3/5, draw a 3-4-5 triangle to get cos θ = 4/5 and tan θ = 3/4.",
    ],
    as: [
      "sin θ = বিপৰীত/কৰ্ণ; cos θ = সন্নিহিত/কৰ্ণ; tan θ = বিপৰীত/সন্নিহিত।",
      "cosec, sec আৰু cot হৈছে sin, cos আৰু tan ৰ ব্যস্ত।",
      "প্ৰামাণিক মান: sin ৩০° = ১/২, sin ৪৫° = ১/√২, sin ৬০° = √৩/২, sin ৯০° = ১।",
      "cos ৬০° = ১/২, cos ৪৫° = ১/√২, cos ৩০° = √৩/২, cos ০° = ১।",
      "tan ৩০° = ১/√৩, tan ৪৫° = ১, tan ৬০° = √৩।",
      "sin²θ + cos²θ = ১।",
      "১ + tan²θ = sec²θ; ১ + cot²θ = cosec²θ।",
      "sin(৯০° − θ) = cos θ; tan(৯০° − θ) = cot θ।",
      "sin θ আৰু cos θ −১ আৰু ১ ৰ মাজত থাকে।",
      "sin θ = ৩/৫ হ'লে, ৩-৪-৫ ত্ৰিভুজ আঁকি cos θ = ৪/৫ আৰু tan θ = ৩/৪ পাওক।",
    ],
  },
  faqs: [
    {
      q: { en: "How do I find the value of sin 60°?", as: "sin ৬০° ৰ মান কেনেকৈ বিচাৰিম?" },
      a: {
        en: "It is a standard value: sin 60° = √3/2. The values to memorise are sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2 and sin 90° = 1; the cosines are the same list read backwards.",
        as: "ই এটা প্ৰামাণিক মান: sin ৬০° = √3/২। মনত ৰাখিবলগীয়া মানবোৰ হ'ল sin ০° = ০, sin ৩০° = ১/২, sin ৪৫° = ১/√২, sin ৬০° = √3/২ আৰু sin ৯০° = ১; cosine বোৰ একেই তালিকা ওলোটা ক্ৰমত।",
      },
    },
    {
      q: { en: "What are the Pythagorean identities?", as: "পাইথাগোৰীয় অভেদবোৰ কি?" },
      a: {
        en: "sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ. The last two follow from the first by dividing by cos²θ and by sin²θ respectively.",
        as: "sin²θ + cos²θ = ১, ১ + tan²θ = sec²θ আৰু ১ + cot²θ = cosec²θ। শেষৰ দুটা প্ৰথমটোৰ পৰা ক্ৰমে cos²θ আৰু sin²θ ৰে হৰণ কৰি ওলায়।",
      },
    },
    {
      q: { en: "If sin θ = 3/5, how do I find cos θ and tan θ?", as: "যদি sin θ = ৩/৫, cos θ আৰু tan θ কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Draw a right triangle with opposite 3 and hypotenuse 5. The adjacent side is 4 by the Pythagoras theorem, so cos θ = 4/5 and tan θ = 3/4. The 3-4-5, 5-12-13 and 8-15-17 triples cover most of these questions.",
        as: "বিপৰীত ৩ আৰু কৰ্ণ ৫ লৈ এটা সমকোণী ত্ৰিভুজ আঁকক। পাইথাগোৰাছৰ উপপাদ্যৰে সন্নিহিত বাহু ৪, গতিকে cos θ = ৪/৫ আৰু tan θ = ৩/৪। ৩-৪-৫, ৫-১২-১৩ আৰু ৮-১৫-১৭ ত্ৰিকুটিয়ে এই প্ৰশ্নবোৰৰ বেছিভাগ সামৰে।",
      },
    },
    {
      q: { en: "How are the ratios of complementary angles related?", as: "পূৰক কোণৰ অনুপাতবোৰৰ সম্পৰ্ক কি?" },
      a: {
        en: "sin(90° − θ) = cos θ and tan(90° − θ) = cot θ, and similarly sec(90° − θ) = cosec θ. So sin 30° = cos 60°, and an equation setting a sine equal to a cosine means the two angles add up to 90°.",
        as: "sin(৯০° − θ) = cos θ আৰু tan(৯০° − θ) = cot θ, আৰু একেই ধৰণে sec(৯০° − θ) = cosec θ। গতিকে sin ৩০° = cos ৬০°, আৰু এটা sine ক cosine ৰ সমান ধৰা সমীকৰণৰ অৰ্থ দুয়ো কোণ যোগ হৈ ৯০°।",
      },
    },
    {
      q: { en: "What is the maximum value of sin θ + cos θ?", as: "sin θ + cos θ ৰ সৰ্বোচ্চ মান কি?" },
      a: {
        en: "It is √2, reached when θ = 45°. In general the maximum of a sin θ + b cos θ is √(a² + b²), and the sine and cosine individually lie between −1 and 1.",
        as: "ই √২, θ = ৪৫° ত পোৱা যায়। সাধাৰণতে a sin θ + b cos θ ৰ সৰ্বোচ্চ √(a² + b²), আৰু sine আৰু cosine সুকীয়াকৈ −১ আৰু ১ ৰ মাজত থাকে।",
      },
    },
  ],
};
