"use strict";

/* RRB NTPC Mathematics — Height & Distance. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Height & Distance for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে উচ্চতা আৰু দূৰত্ব" },
  p: {
    en: [
      "Height and distance is the chapter that applies trigonometry to real objects, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. Every question in the chapter describes a tower, a tree, a pole or a building standing on level ground, an observer at some point, and the angle at which the observer sees the top. The task is always to find one of the three quantities, the height, the distance or the angle, from the other two.",
      "The two angles that the chapter uses are the angle of elevation and the angle of depression. The angle of elevation is the angle above the horizontal at which the observer looks up at the top of the object, and the angle of depression is the angle below the horizontal at which an observer at the top looks down at a point on the ground. The two angles are equal for the same pair of points, because they are alternate angles between two horizontal lines, and this equality is used in almost every question with an observer on top.",
      "The right triangle that the chapter draws has three parts: the vertical height of the object, the horizontal distance from the observer to the foot, and the line of sight to the top, which is the hypotenuse. The angle of elevation sits at the observer's end, and the tangent of that angle is the height divided by the horizontal distance. This single relation, tangent equals height over distance, solves the largest family of questions, and the other two ratios are used only when the line of sight itself is given.",
      "The standard values of the tangent make the arithmetic quick. When the angle is forty-five degrees the height equals the distance, which is why a tower whose shadow equals its height stands under a sun at forty-five degrees. When the angle is thirty degrees the height is the distance divided by root three, and when the angle is sixty degrees the height is the distance times root three. Recognising these three cases from the numbers in the question saves time and prevents the commonest error of using the wrong ratio.",
      "The shadow questions are the simplest application. A vertical object and its shadow on level ground form a right triangle whose vertical leg is the height and whose horizontal leg is the shadow, with the angle of elevation of the sun at the tip of the shadow. If the shadow equals the height the angle is forty-five degrees, if the shadow is root three times the height the angle is thirty degrees, and if the shadow is the height divided by root three the angle is sixty degrees.",
      "The questions that give the height and the distance and ask for the angle are solved by computing the tangent and then recognising the standard value. If the height is fifteen and the distance is five root three, the tangent is root three and the angle is sixty degrees. The candidate should always form the ratio first and compare it with the three standard values, rather than guessing the angle from the appearance of the numbers.",
      "The questions with a two-step observer are the next family. When the angle of elevation from a point is thirty degrees and becomes sixty degrees after walking some distance towards the object, the two right triangles share the height and give two equations. Writing the distance to the foot as the walking distance plus the remaining distance, and eliminating the remaining distance between the two equations, gives the height directly.",
      "The two-point questions on the same side are solved by the same pair of triangles. When the angles of elevation from two points a known distance apart are thirty degrees and sixty degrees, the two equations again share the height, and the elimination gives the height as the given distance divided by the difference of the two cotangents. The same pattern answers the questions where the angles are forty-five degrees and sixty degrees, or thirty degrees and forty-five degrees.",
      "The ladder questions are a small family of their own. A ladder leaning against a wall forms a right triangle whose hypotenuse is the length of the ladder, whose vertical leg is the height reached on the wall and whose horizontal leg is the distance of the foot from the wall. The height reached is the length of the ladder times the sine of the angle with the ground, and the distance of the foot is the length times the cosine of that angle. When two of the three lengths are given the third follows from the Pythagoras theorem.",
      "The kite questions use the same picture with the string as the hypotenuse. The height of the kite is the length of the string times the sine of the angle the string makes with the ground, and the horizontal distance of the kite from the flyer is the length times the cosine of that angle. These questions are the ladder questions with the words changed, and the same two formulas answer both families.",
      "The questions with two objects of different heights are solved by the difference of the heights. Two poles of heights six and eleven metres standing twelve metres apart have a vertical difference of five metres, so the distance between their tops is the square root of twelve squared plus five squared, which is thirteen. Drawing the trapezium formed by the two poles, the ground and the line joining the tops shows the right triangle at once.",
      "The questions that combine a tower and a flagstaff or a tower and a building are solved by writing the height as a sum of two parts. If the angle of elevation of the bottom of the flagstaff is forty-five degrees and of its top sixty degrees, the tower below the flagstaff and the extra height of the flagstaff are found separately and then added or subtracted as the question requires. Naming the unknown horizontal distance first makes both parts simple.",
      "Finally, the chapter rewards two habits. The first is to draw a labelled figure for every question, marking the right angle, the height, the distance and the angle, because the figure shows which ratio applies and which two sides are given. The second is to keep the standard tangents of thirty, forty-five and sixty degrees ready and to compare the computed ratio with them at once. With these habits the height and distance questions become among the quickest and most certain in the paper.",
    ],
    as: [
      "উচ্চতা আৰু দূৰত্ব হৈছে সেই অধ্যায় যি ত্ৰিকোণমিতি বাস্তৱ বস্তুত প্ৰয়োগ কৰে, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টোৰ প্ৰতিটো প্ৰশ্নত এটা টাৱাৰ, গছ, খুঁটা বা ভৱন সমতল ভূমিত থিয় হৈ থকা, এটা বিন্দুত এজন পৰ্যবেক্ষক, আৰু তেওঁ যি কোণত শীৰ্ষটো দেখে সেয়া বৰ্ণনা কৰা হয়। কামটো সদায় তিনিটা ৰাশিৰ এটা, উচ্চতা, দূৰত্ব বা কোণ, আন দুটাৰ পৰা বিচৰা।",
      "অধ্যায়টোৱে ব্যৱহাৰ কৰা দুটা কোণ হ'ল উন্নতি কোণ আৰু অৱনতি কোণ। উন্নতি কোণ হৈছে অনুভূমিকৰ ওপৰত যি কোণত পৰ্যবেক্ষকে বস্তুৰ শীৰ্ষলৈ চাই, আৰু অৱনতি কোণ হৈছে অনুভূমিকৰ তলত যি কোণত শীৰ্ষত থকা পৰ্যবেক্ষকে ভূমিৰ এটা বিন্দুলৈ চাই। একেই যোৰ বিন্দুৰ বাবে দুয়ো কোণ সমান, কাৰণ সিহঁত দুটা অনুভূমিক ৰেখাৰ মাজৰ একান্তৰ কোণ।",
      "অধ্যায়টোৱে অঁকা সমকোণী ত্ৰিভুজত তিনিটা অংশ থাকে: বস্তুৰ উলম্ব উচ্চতা, পৰ্যবেক্ষকৰ পৰা পাদদেশলৈ অনুভূমিক দূৰত্ব, আৰু শীৰ্ষলৈ দৃষ্টিৰেখা, যি কৰ্ণ। উন্নতি কোণটো পৰ্যবেক্ষকৰ মূৰত থাকে, আৰু সেই কোণৰ tangent = উচ্চতা ÷ অনুভূমিক দূৰত্ব। এই এটা সম্পৰ্ক, tangent = উচ্চতা ÷ দূৰত্ব, আটাইতকৈ ডাঙৰ পৰিয়ালটো সমাধান কৰে।",
      "tangent ৰ প্ৰামাণিক মানবোৰে গণনা দ্ৰুত কৰে। কোণ পঁয়তাল্লিশ ডিগ্ৰী হ'লে উচ্চতা দূৰত্বৰ সমান, এই কাৰণেই যি টাৱাৰৰ ছাঁ তাৰ উচ্চতাৰ সমান সেয়া পঁয়তাল্লিশ ডিগ্ৰীৰ সূৰ্যৰ তলত থাকে। কোণ ত্ৰিশ ডিগ্ৰী হ'লে উচ্চতা = দূৰত্ব ÷ মূল-তিন, আৰু কোণ ষাঠি ডিগ্ৰী হ'লে উচ্চতা = দূৰত্ব × মূল-তিন। এই তিনিটা ক্ষেত্ৰ চিনি পোৱাটোৱে সময় ৰাহি কৰে।",
      "ছাঁৰ প্ৰশ্নবোৰ আটাইতকৈ সৰল প্ৰয়োগ। এটা উলম্ব বস্তু আৰু সমতল ভূমিত তাৰ ছাঁয়ে এটা সমকোণী ত্ৰিভুজ গঠন কৰে যাৰ উলম্ব ভুজ উচ্চতা আৰু অনুভূমিক ভুজ ছাঁ, ছাঁৰ মূৰত সূৰ্যৰ উন্নতি কোণ। ছাঁ উচ্চতাৰ সমান হ'লে কোণ পঁয়তাল্লিশ ডিগ্ৰী, ছাঁ উচ্চতাৰ মূল-তিন গুণ হ'লে ত্ৰিশ ডিগ্ৰী, আৰু ছাঁ উচ্চতা ÷ মূল-তিন হ'লে ষাঠি ডিগ্ৰী।",
      "উচ্চতা আৰু দূৰত্ব দি কোণ সোধা প্ৰশ্ন tangent গণনা কৰি প্ৰামাণিক মান চিনি পোৱাৰ দ্বাৰা সমাধান কৰা হয়। উচ্চতা পোন্ধৰ আৰু দূৰত্ব পাঁচ মূল-তিন হ'লে tangent মূল-তিন আৰু কোণ ষাঠি ডিগ্ৰী। প্ৰাৰ্থীয়ে সদায় প্ৰথমে অনুপাতটো গঢ়ি তিনিটা প্ৰামাণিক মানৰ সৈতে তুলনা কৰা উচিত, সংখ্যাৰ ৰূপ চাই কোণ অনুমান নকৰাকৈ।",
      "দুটা খোজৰ পৰ্যবেক্ষক থকা প্ৰশ্ন পিছৰ পৰিয়াল। এটা বিন্দুৰ পৰা উন্নতি কোণ ত্ৰিশ ডিগ্ৰী আৰু বস্তুৰ ফালে কিছু দূৰত্ব খোজ কাঢ়াৰ পিছত ষাঠি ডিগ্ৰী হ'লে, দুটা সমকোণী ত্ৰিভুজে উচ্চতা ভাগ কৰে আৰু দুটা সমীকৰণ দিয়ে। দুয়ো সমীকৰণৰ মাজৰ পৰা বাকী দূৰত্ব আঁতৰাই উচ্চতা পোনপটীয়াকৈ পোৱা যায়।",
      "একে ফালে দুটা বিন্দুৰ প্ৰশ্ন একেই ত্ৰিভুজ-যোৰেৰে সমাধান কৰা হয়। জনা দূৰত্বত থকা দুটা বিন্দুৰ পৰা উন্নতি কোণ ত্ৰিশ আৰু ষাঠি ডিগ্ৰী হ'লে, দুয়ো সমীকৰণে উচ্চতা ভাগ কৰে, আৰু আঁতৰোৱাই উচ্চতা = দিয়া দূৰত্ব ÷ দুটা cotangent ৰ পাৰ্থক্য দিয়ে। একেই আৰ্হিয়ে পঁয়তাল্লিশ-ষাঠি বা ত্ৰিশ-পঁয়তাল্লিশ কোণৰ প্ৰশ্নৰ উত্তৰ দিয়ে।",
      "জখলাৰ প্ৰশ্ন নিজৰে এটা সৰু পৰিয়াল। বেৰত হাউলি থকা এডাল জখলাই এটা সমকোণী ত্ৰিভুজ গঠন কৰে যাৰ কৰ্ণ জখলাৰ দৈৰ্ঘ্য, উলম্ব ভুজ বেৰত লগা উচ্চতা আৰু অনুভূমিক ভুজ পাদদেশৰ পৰা বেৰৰ দূৰত্ব। লগা উচ্চতা = জখলাৰ দৈৰ্ঘ্য × ভূমিৰ সৈতে কোণৰ sine, আৰু পাদদেশৰ দূৰত্ব = দৈৰ্ঘ্য × সেই কোণৰ cosine।",
      "চিলাৰ প্ৰশ্ন একেই ছবি ব্যৱহাৰ কৰে, সূতাক কৰ্ণ লৈ। চিলাৰ উচ্চতা = সূতাৰ দৈৰ্ঘ্য × সূতাই ভূমিৰ সৈতে কৰা কোণৰ sine, আৰু চিলাৰ পৰা উৰুৱাজনৰ অনুভূমিক দূৰত্ব = দৈৰ্ঘ্য × সেই কোণৰ cosine। এই প্ৰশ্নবোৰ শব্দ সলনি কৰা জখলাৰ প্ৰশ্ন, আৰু একেই দুটা সূত্ৰই দুয়ো পৰিয়ালৰ উত্তৰ দিয়ে।",
      "বেলেগ উচ্চতাৰ দুটা বস্তু থকা প্ৰশ্ন উচ্চতাৰ পাৰ্থক্যৰে সমাধান কৰা হয়। ছয় আৰু এঘাৰ মিটাৰ উচ্চতাৰ দুটা খুঁটা বাৰ মিটাৰ আঁতৰত হ'লে উলম্ব পাৰ্থক্য পাঁচ মিটাৰ, গতিকে শীৰ্ষৰ দূৰত্ব = √(১২² + ৫²) = ১৩। খুঁটা দুটা, ভূমি আৰু শীৰ্ষ সংযোগ কৰা ৰেখাই গঠন কৰা ট্ৰেপিজিয়ামটো আঁকিলে সমকোণী ত্ৰিভুজটো তৎক্ষণাৎ ওলায়।",
      "টাৱাৰ আৰু পতাকাদণ্ড বা টাৱাৰ আৰু ভৱন লগোৱা প্ৰশ্ন উচ্চতাক দুটা অংশৰ যোগফল হিচাপে লিখি সমাধান কৰা হয়। পতাকাদণ্ডৰ তলৰ উন্নতি কোণ পঁয়তাল্লিশ আৰু শীৰ্ষৰ ষাঠি ডিগ্ৰী হ'লে, পতাকাদণ্ডৰ তলৰ টাৱাৰ আৰু পতাকাদণ্ডৰ অতিৰিক্ত উচ্চতা সুকীয়াকৈ বিচাৰি প্ৰশ্নই বিচৰা মতে যোগ বা বিয়োগ কৰা হয়।",
      "কিছুমান প্ৰশ্নত এটা ৰেখাৰ সমীকৰণৰ দৰে উন্নতি কোণ বা দূৰত্ব একেবাৰে নাথাকে, কেৱল দুটা বস্তুৰ উচ্চতা আৰু সিহঁতৰ মাজৰ দূৰত্ব দিয়া থাকে। এনে প্ৰশ্নত প্ৰথমে উচ্চতাৰ পাৰ্থক্য বিচাৰি, তাৰ পিছত পাইথাগোৰাছৰ উপপাদ্য প্ৰয়োগ কৰি শীৰ্ষৰ মাজৰ দূৰত্ব পোৱা যায়। ছয় আৰু এঘাৰ মিটাৰ খুঁটা বাৰ মিটাৰ আঁতৰত হ'লে পাৰ্থক্য পাঁচ আৰু দূৰত্ব তেৰ।",
      "আন এটা সচৰাচৰ ৰূপত এটা গছ বতাহত ভাঙি ইয়াৰ শীৰ্ষই ভূমি স্পৰ্শ কৰাৰ প্ৰশ্ন আহে। এনে প্ৰশ্নত থিয় অংশ আৰু ভাঙা অংশ দুটা অজ্ঞাত ধৰি, উচ্চতাৰ যোগফল আৰু কোণৰ sine ৰ দুটা সমীকৰণ লিখি সমাধান কৰা হয়। ভাঙা অংশ = কৰ্ণ, আৰু ইয়াৰ অনুভূমিক উপাংশ = ভাঙা অংশ × cos কোণ, যি শীৰ্ষৰ পৰা পাদদেশৰ দূৰত্ব দিয়ে।",
      "কিছুমান প্ৰশ্নত এটা টাৱাৰৰ ওপৰত থকা এটা পতাকাদণ্ডৰ দৰে দুটা অংশ থকা গঠন দিয়া থাকে, য'ত তলৰ আৰু ওপৰৰ উন্নতি কোণ সুকীয়াকৈ দিয়া থাকে। এনে প্ৰশ্নত অনুভূমিক দূৰত্বক d ধৰি, প্ৰতিটো কোণৰ বাবে উচ্চতা লিখি, দুয়োৰ পাৰ্থক্যই পতাকাদণ্ডৰ উচ্চতা দিয়ে। এই পদ্ধতিত দুয়ো অংশৰ উচ্চতা সুকীয়াকৈ ওলায় আৰু যোগ-বিয়োগ সহজ হয়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল প্ৰতিটো প্ৰশ্নৰ বাবে এটা নামযুক্ত চিত্ৰ অঁকা, সমকোণ, উচ্চতা, দূৰত্ব আৰু কোণ চিহ্নিত কৰি, কাৰণ চিত্ৰই দেখুৱায় কোন অনুপাত খাটে আৰু কোন দুটা বাহু দিয়া আছে। দ্বিতীয়টো হ'ল ত্ৰিশ, পঁয়তাল্লিশ আৰু ষাঠি ডিগ্ৰীৰ tangent সাজু ৰাখি গণনা কৰা অনুপাতটো তৎক্ষণাত সিহঁতৰ সৈতে তুলনা কৰা।",
      "কিছুমান প্ৰশ্নত এটা টাৱাৰৰ শীৰ্ষৰ পৰা ভূমিৰ এটা বিন্দুৰ অৱনতি কোণ দিয়া থাকে আৰু টাৱাৰৰ উচ্চতা বা বিন্দুটোৰ দূৰত্ব সোধা হয়। অৱনতি কোণ উন্নতি কোণৰ সমান, গতিকে একেই tangent সম্পৰ্ক প্ৰয়োগ কৰা হয়। যদি ৩০ মি. ওখ টাৱাৰৰ পৰা অৱনতি কোণ ৪৫° হয়, দূৰত্ব = ৩০ মি.। এই প্ৰশ্নবোৰ দুই শাৰীত সমাধান হয়।",
      "আন এটা সচৰাচৰ ৰূপত এজন মানুহৰ চকুৰ উচ্চতা ধৰি টাৱাৰৰ উচ্চতা সোধা হয়। এনে প্ৰশ্নত চকুৰ স্তৰৰ পৰা টাৱাৰৰ শীৰ্ষলৈ উচ্চতা প্ৰথমে বিচাৰি, তাৰ পিছত মানুহজনৰ উচ্চতা যোগ কৰা হয়। যদি চকুৰ পৰা উন্নতি কোণ ৪৫° আৰু দূৰত্ব ৩০ মি. হয়, মুঠ উচ্চতা = ৩০ + ১.৮ = ৩১.৮ মি.। এই সূক্ষ্ম যোগটো মনত ৰখাটো অতি প্ৰয়োজনীয়।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: উচ্চতা-দূৰত্ব, ত্ৰিকোণমিতি আৰু জ্যামিতি তিনিওটা অধ্যায় ঘনিষ্ঠভাৱে জড়িত। উচ্চতা-দূৰত্বৰ প্ৰতিটো প্ৰশ্ন ত্ৰিকোণমিতিৰ এটা অনুপাতৰ প্ৰয়োগ, আৰু জ্যামিতিত সমকোণী ত্ৰিভুজৰ ধৰ্মই এই অনুপাতবোৰৰ ভেটি। এই সংযোগ স্পষ্ট হ'লে তিনিওটা অধ্যায়ৰ প্ৰশ্নবোৰ সৰল আৰু নিৰ্ভৰযোগ্য হৈ পৰে।",
      "কিছুমান প্ৰশ্নত দুটা ভিন্ন স্থানৰ পৰা এটা বস্তুৰ উন্নতি কোণ দিয়া থাকে, যেনে এটা নদীৰ দুয়োপাৰৰ পৰা বা দুটা ভৱনৰ পৰা। এনে প্ৰশ্নত প্ৰতিটো স্থানৰ বাবে এটা সমকোণী ত্ৰিভুজ আঁকি, দুয়োকে উচ্চতাৰে সংযোগ কৰা হয়। দুয়ো সমীকৰণ মিলাই উচ্চতা বা দূৰত্ব বিচৰা হয়। চিত্ৰটো আঁকিলে এই প্ৰশ্নবোৰ সৰল হৈ পৰে।",
    ],
  },
  list: {
    en: [
      "tan(angle of elevation) = height ÷ horizontal distance.",
      "Angle of elevation = angle of depression for the same two points.",
      "tan 45° = 1, so height = distance at 45°.",
      "tan 30° = 1/√3, so height = distance ÷ √3 at 30°.",
      "tan 60° = √3, so height = distance × √3 at 60°.",
      "Shadow equals height at 45°, √3 times at 30°, 1/√3 times at 60°.",
      "Ladder: height = length × sin θ; foot distance = length × cos θ.",
      "Kite: height = string × sin θ; horizontal distance = string × cos θ.",
      "Two poles: top distance = √(gap² + difference of heights²).",
      "Add the observer's eye height when the angle is measured from the eyes.",
    ],
    as: [
      "tan(উন্নতি কোণ) = উচ্চতা ÷ অনুভূমিক দূৰত্ব।",
      "একেই দুটা বিন্দুৰ বাবে উন্নতি কোণ = অৱনতি কোণ।",
      "tan ৪৫° = ১, গতিকে ৪৫° ত উচ্চতা = দূৰত্ব।",
      "tan ৩০° = ১/√৩, গতিকে ৩০° ত উচ্চতা = দূৰত্ব ÷ √৩।",
      "tan ৬০° = √৩, গতিকে ৬০° ত উচ্চতা = দূৰত্ব × √৩।",
      "৪৫° ত ছাঁ = উচ্চতা, ৩০° ত √৩ গুণ, ৬০° ত ১/√৩ গুণ।",
      "জখলা: উচ্চতা = দৈৰ্ঘ্য × sin θ; পাদদেশৰ দূৰত্ব = দৈৰ্ঘ্য × cos θ।",
      "চিলা: উচ্চতা = সূতা × sin θ; অনুভূমিক দূৰত্ব = সূতা × cos θ।",
      "দুটা খুঁটা: শীৰ্ষৰ দূৰত্ব = √(ব্যৱধান² + উচ্চতাৰ পাৰ্থক্য²)।",
      "চকুৰ পৰা কোণ জুখিলে পৰ্যবেক্ষকৰ চকুৰ উচ্চতা যোগ কৰক।",
    ],
  },
  faqs: [
    {
      q: { en: "What is the relation between the angle of elevation and the height?", as: "উন্নতি কোণ আৰু উচ্চতাৰ মাজৰ সম্পৰ্ক কি?" },
      a: {
        en: "tan(angle of elevation) = height ÷ horizontal distance. So at 45° the height equals the distance, at 30° the height is the distance divided by √3, and at 60° the height is the distance times √3.",
        as: "tan(উন্নতি কোণ) = উচ্চতা ÷ অনুভূমিক দূৰত্ব। গতিকে ৪৫° ত উচ্চতা দূৰত্বৰ সমান, ৩০° ত উচ্চতা = দূৰত্ব ÷ √3, আৰু ৬০° ত উচ্চতা = দূৰত্ব × √3।",
      },
    },
    {
      q: { en: "How do I handle the shadow of a tower?", as: "টাৱাৰৰ ছাঁ কেনেকৈ সামৰিম?" },
      a: {
        en: "The object and its shadow form a right triangle with the sun's elevation at the tip. If the shadow equals the height the angle is 45°; if it is √3 times the height the angle is 30°; if it is 1/√3 times the height the angle is 60°.",
        as: "বস্তুটো আৰু তাৰ ছাঁয়ে এটা সমকোণী ত্ৰিভুজ গঠন কৰে, ছাঁৰ মূৰত সূৰ্যৰ উন্নতি কোণ। ছাঁ উচ্চতাৰ সমান হ'লে কোণ ৪৫°; উচ্চতাৰ √3 গুণ হ'লে ৩০°; উচ্চতাৰ ১/√3 গুণ হ'লে ৬০°।",
      },
    },
    {
      q: { en: "How do I solve a question where the angle changes after walking?", as: "খোজ কঢ়াৰ পিছত কোণ সলনি হোৱা প্ৰশ্ন কেনেকৈ সমাধান কৰিম?" },
      a: {
        en: "Draw two right triangles sharing the same height. Write the distance to the foot in each case, with the walking distance connecting them, and eliminate the remaining distance. This gives the height directly from the two angles and the walking distance.",
        as: "একেই উচ্চতা ভাগ কৰা দুটা সমকোণী ত্ৰিভুজ আঁকক। প্ৰতিটো ক্ষেত্ৰত পাদদেশলৈ দূৰত্ব লিখক, খোজ কঢ়া দূৰত্বে সিহঁতক সংযোগ কৰে, আৰু বাকী দূৰত্ব আঁতৰাওক। ই দুটা কোণ আৰু খোজ কঢ়া দূৰত্বৰ পৰা উচ্চতা পোনপটীয়াকৈ দিয়ে।",
      },
    },
    {
      q: { en: "How do I find the height reached by a ladder?", as: "জখলাই লগা উচ্চতা কেনেকৈ বিচাৰিম?" },
      a: {
        en: "The ladder is the hypotenuse. The height reached is length × sin θ and the distance of the foot from the wall is length × cos θ, where θ is the angle with the ground. If two of the three lengths are given, the third follows from the Pythagoras theorem.",
        as: "জখলাই কৰ্ণ। লগা উচ্চতা = দৈৰ্ঘ্য × sin θ আৰু পাদদেশৰ পৰা বেৰৰ দূৰত্ব = দৈৰ্ঘ্য × cos θ, য'ত θ ভূমিৰ সৈতে কোণ। তিনিটা দৈৰ্ঘ্যৰ দুটা দিয়া থাকিলে তৃতীয়টো পাইথাগোৰাছৰ উপপাদ্যৰে ওলায়।",
      },
    },
    {
      q: { en: "How do I find the distance between the tops of two poles?", as: "দুটা খুঁটাৰ শীৰ্ষৰ মাজৰ দূৰত্ব কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Draw the right triangle whose vertical leg is the difference of the heights and whose horizontal leg is the distance between the feet. The top distance is √(gap² + difference²), for example √(12² + 5²) = 13 for poles 6 m and 11 m twelve metres apart.",
        as: "যি সমকোণী ত্ৰিভুজৰ উলম্ব ভুজ উচ্চতাৰ পাৰ্থক্য আৰু অনুভূমিক ভুজ পাদদেশৰ মাজৰ দূৰত্ব, সেয়া আঁকক। শীৰ্ষৰ দূৰত্ব = √(ব্যৱধান² + পাৰ্থক্য²), যেনে ৬ আৰু ১১ মি. খুঁটা বাৰ মিটাৰ আঁতৰত হ'লে √(১২² + ৫²) = ১৩।",
      },
    },
  ],
};
