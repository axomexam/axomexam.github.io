"use strict";

/* RRB NTPC Mathematics — Coordinate Geometry. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Coordinate Geometry for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে স্থানাংক জ্যামিতি" },
  p: {
    en: [
      "Coordinate geometry is the chapter in which every point of the plane is fixed by two numbers, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter rests on a single picture: two perpendicular axes crossing at the origin, with the horizontal x-axis and the vertical y-axis. The position of a point is written as an ordered pair, the abscissa first and the ordinate second, and every question of the chapter is a measurement taken on this picture.",
      "The four quadrants divide the plane by the signs of the coordinates. In the first quadrant both coordinates are positive, in the second the abscissa is negative and the ordinate positive, in the third both are negative, and in the fourth the abscissa is positive and the ordinate negative. A point on the x-axis has its ordinate zero, and a point on the y-axis has its abscissa zero. These sign rules answer the whole family of quadrant and axis questions at a glance.",
      "The distance formula measures the straight-line gap between two points. For the points with coordinates x one, y one and x two, y two, the distance is the square root of the sum of the squares of the differences of the coordinates. The formula is nothing but the Pythagoras theorem applied to the horizontal and vertical gaps, which are the two legs of a right triangle. When one of the points is the origin the formula simplifies to the square root of the sum of the squares of the coordinates of the other point.",
      "The common Pythagorean triples make the distance questions quick. A point at a distance three along one axis and four along the other is five from the origin, and the same holds for five and twelve giving thirteen, for eight and fifteen giving seventeen, and for seven and twenty-four giving twenty-five. Recognising one of these triples saves the square-root work and reduces the chance of an arithmetic slip, so the candidate should have them ready.",
      "The distance from the axes is an even simpler pair of facts. The distance of a point from the x-axis is the absolute value of its ordinate, and the distance from the y-axis is the absolute value of its abscissa. These two are used directly in questions that ask how far a point is from an axis, and they also feed into the area questions where the height of a triangle is the ordinate of a vertex.",
      "The midpoint formula gives the point halfway between two given points. The abscissa of the midpoint is the average of the abscissae, and the ordinate is the average of the ordinates. The reverse questions give the midpoint and one end and ask for the other end, and they are solved by doubling the midpoint and subtracting the known end. The midpoint is also the point that divides a segment in the ratio one to one, so the section formula and the midpoint formula agree there.",
      "The section formula divides a segment internally in a given ratio. If the ratio is m to n, the abscissa of the dividing point is m times the second abscissa plus n times the first, all divided by m plus n, and the ordinate follows the same pattern with the ordinates. The formula looks heavy but is a straight substitution, and the commonest slip is to interchange m and n, so the candidate should write the ratio in the same order as the points before substituting.",
      "The slope measures the steepness of a line. It is the change in the ordinate divided by the change in the abscissa between two points of the line, and it is the same for every pair of points on the line. A horizontal line has slope zero and a vertical line has an undefined slope. In the form y equals m x plus c the coefficient m is the slope and c is the intercept on the y-axis, so the slope of a line given in this form can be read off at once.",
      "The slope answers two further families of questions. Lines that are parallel have equal slopes, and the product of the slopes of two perpendicular lines is minus one, so the slope of a perpendicular can be found by taking the negative reciprocal. The slope is also the tool for the collinearity questions: three points are collinear when the slope between the first pair equals the slope between the second pair.",
      "The intercepts are the points where a line meets the axes. The x-intercept is found by putting the ordinate zero in the equation of the line, and the y-intercept by putting the abscissa zero. For the line two x plus three y equals six, the x-intercept is three and the y-intercept is two. These two numbers are often asked together, and they also give the two legs of the right triangle that the line cuts off from the axes.",
      "The area of a triangle from its vertices is the last family. When one vertex is the origin and the other two lie on the axes, the triangle is right-angled at the origin and its area is half the product of the two intercepts. More generally the area is found by the coordinate formula, but the paper usually gives vertices placed so that one of the simple forms applies. Drawing the triangle on the axes shows which form to use.",
      "The centroid of a triangle is the average of its three vertices. The abscissa of the centroid is the average of the three abscissae and the ordinate is the average of the three ordinates. The centroid divides each median in the ratio two to one from the vertex, a fact shared with the geometry chapter. The centroid questions are therefore a two-line application of the average, provided the three vertices are added correctly.",
      "Finally, the chapter rewards two habits. The first is to draw the axes and plot the points roughly for every question, because the picture shows at once which formula applies and catches a sign error in the coordinates. The second is to write the formula before substituting, so that the reasoning is visible and the substitution is easy to check. With these habits the coordinate geometry questions become among the quickest in the paper, and the same distance and slope ideas carry directly into the geometry and trigonometry chapters.",
    ],
    as: [
      "স্থানাংক জ্যামিতি হৈছে সেই অধ্যায় য'ত সমতলৰ প্ৰতিটো বিন্দু দুটা সংখ্যাৰে নিৰ্ধাৰিত হয়, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টো এটা ছবিৰ ওপৰত ৰয়: মূলবিন্দুত কটাকটি কৰা দুটা লম্ব অক্ষ, অনুভূমিক x-অক্ষ আৰু উলম্ব y-অক্ষ। এটা বিন্দুৰ অৱস্থান এটা ক্ৰমিক যুগ্ম হিচাপে লিখা হয়, প্ৰথমে ভুজ আৰু দ্বিতীয়তে কোটি, আৰু অধ্যায়টোৰ প্ৰতিটো প্ৰশ্ন এই ছবিৰ ওপৰত লোৱা এটা জোখ।",
      "চাৰিটা চতুৰ্থাংশই স্থানাংকৰ চিহ্নৰে সমতল ভাগ কৰে। প্ৰথম চতুৰ্থাংশত দুয়ো স্থানাংক ধনাত্মক, দ্বিতীয়ত ভুজ ঋণাত্মক আৰু কোটি ধনাত্মক, তৃতীয়ত দুয়ো ঋণাত্মক, আৰু চতুৰ্থত ভুজ ধনাত্মক আৰু কোটি ঋণাত্মক। x-অক্ষৰ ওপৰৰ বিন্দুৰ কোটি শূন্য, আৰু y-অক্ষৰ ওপৰৰ বিন্দুৰ ভুজ শূন্য। এই চিহ্নৰ নিয়মেই চতুৰ্থাংশ আৰু অক্ষৰ গোটেই পৰিয়ালৰ উত্তৰ এপলকতে দিয়ে।",
      "দূৰত্ব সূত্ৰই দুটা বিন্দুৰ মাজৰ সৰলৰেখাৰ ব্যৱধান জোখে। x এক, y এক আৰু x দুই, y দুই স্থানাংকৰ বিন্দুৰ বাবে, দূৰত্ব = স্থানাংকৰ পাৰ্থক্যৰ বৰ্গৰ যোগফলৰ বৰ্গমূল। সূত্ৰটো আন একো নহয়, অনুভূমিক আৰু উলম্ব ব্যৱধানত পাইথাগোৰাছৰ উপপাদ্য প্ৰয়োগ কৰা, যি দুটা এটা সমকোণী ত্ৰিভুজৰ ভুজ। এটা বিন্দু মূলবিন্দু হ'লে সূত্ৰটো আনটো বিন্দুৰ স্থানাংকৰ বৰ্গৰ যোগফলৰ বৰ্গমূললৈ সৰল হয়।",
      "সাধাৰণ পাইথাগোৰীয় ত্ৰিকুটিয়ে দূৰত্বৰ প্ৰশ্ন দ্ৰুত কৰে। এটা অক্ষত তিনি আৰু আনটোত চাৰি দূৰত্বত থকা বিন্দু মূলবিন্দুৰ পৰা পাঁচ, আৰু একেই ধৰণে পাঁচ আৰু বাৰে তেৰ, আঠ আৰু পোন্ধৰে সোতৰ, আৰু সাত আৰু চৌবিশে পঁচিশ দিয়ে। এই ত্ৰিকুটিবোৰৰ এটা চিনি পোৱাটোৱে বৰ্গমূলৰ কাম ৰাহি কৰে আৰু ভুলৰ সম্ভাৱনা কমায়।",
      "অক্ষৰ পৰা দূৰত্ব আৰু এটা সৰলতৰ যোৰ তথ্য। এটা বিন্দুৰ x-অক্ষৰ পৰা দূৰত্ব তাৰ কোটিটোৰ পৰম মান, আৰু y-অক্ষৰ পৰা দূৰত্ব ভুজটোৰ পৰম মান। এই দুটা পোনপটীয়াকৈ অক্ষৰ পৰা দূৰত্ব সোধা প্ৰশ্নত ব্যৱহাৰ হয়, আৰু কালিৰ প্ৰশ্নতো ব্যৱহাৰ হয়, য'ত এটা ত্ৰিভুজৰ উচ্চতা এটা শীৰ্ষবিন্দুৰ কোটি।",
      "মধ্যবিন্দুৰ সূত্ৰই দুটা দিয়া বিন্দুৰ মাজৰ আধা বিন্দু দিয়ে। মধ্যবিন্দুৰ ভুজ ভুজবোৰৰ গড়, আৰু কোটি কোটিবোৰৰ গড়। উলটি প্ৰশ্নই মধ্যবিন্দু আৰু এটা মূৰ দি আনটো মূৰ সোধে, আৰু সেয়া মধ্যবিন্দু দুগুণ কৰি জনা মূৰটো বিয়োগ কৰি সমাধান কৰা হয়। মধ্যবিন্দুৱেই ১ : ১ অনুপাতত খণ্ডটো ভাগ কৰা বিন্দু, গতিকে সেই ঠাইত অংশ সূত্ৰ আৰু মধ্যবিন্দু সূত্ৰ একেই।",
      "অংশ সূত্ৰই এটা খণ্ডক দিয়া অনুপাতত অন্তৰ্ভাগ কৰে। অনুপাত m : n হ'লে, বিভাজন বিন্দুৰ ভুজ = (m × দ্বিতীয় ভুজ + n × প্ৰথম ভুজ) ÷ (m + n), আৰু কোটি একেই ধৰণে কোটিবোৰৰ সৈতে। সূত্ৰটো গধুৰ যেন লাগে কিন্তু সোজা প্ৰতিস্থাপন, আৰু আটাইতকৈ সচৰাচৰ ভুলটো হ'ল m আৰু n ওলোটা কৰা।",
      "প্ৰৱণতাই এটা ৰেখাৰ ঢাল জোখে। ই ৰেখাৰ দুটা বিন্দুৰ মাজত কোটিটোৰ পৰিৱৰ্তন ÷ ভুজটোৰ পৰিৱৰ্তন, আৰু ৰেখাৰ প্ৰতিটো বিন্দু-যোৰৰ বাবে একেই। অনুভূমিক ৰেখাৰ প্ৰৱণতা শূন্য আৰু উলম্ব ৰেখাৰ অনিৰ্দিষ্ট। y = m x + c ৰূপত m সহগেই প্ৰৱণতা আৰু c হ'ল y-অক্ষৰ ছেদ, গতিকে এই ৰূপত দিয়া ৰেখাৰ প্ৰৱণতা তৎক্ষণাৎ পঢ়িব পাৰি।",
      "প্ৰৱণতাই আৰু দুটা পৰিয়ালৰ উত্তৰ দিয়ে। সমান্তৰাল ৰেখাৰ প্ৰৱণতা সমান, আৰু দুটা লম্ব ৰেখাৰ প্ৰৱণতাৰ গুণফল −১, গতিকে ঋণাত্মক ব্যস্ত লৈ লম্ব ৰেখাৰ প্ৰৱণতা পোৱা যায়। প্ৰৱণতাই সমৰেখতাৰ প্ৰশ্নতো কাম কৰে: প্ৰথম যোৰৰ প্ৰৱণতা দ্বিতীয় যোৰৰ প্ৰৱণতাৰ সমান হ'লে তিনিটা বিন্দু সমৰেখীয়।",
      "ছেদবিন্দুবোৰ হৈছে ৰেখাই অক্ষবোৰক লগ কৰা বিন্দু। ৰেখাৰ সমীকৰণত কোটি শূন্য বহুৱালে x-ছেদ, আৰু ভুজ শূন্য বহুৱালে y-ছেদ পোৱা যায়। 2x + 3y = ৬ ৰেখাৰ বাবে, x-ছেদ তিন আৰু y-ছেদ দুই। এই দুটা সংখ্যা প্ৰায়ে একেলগে সোধা হয়, আৰু ৰেখাই অক্ষৰ পৰা কাটি লোৱা সমকোণী ত্ৰিভুজৰ দুটা ভুজো এই দুটাই দিয়ে।",
      "শীৰ্ষবিন্দুৰ পৰা ত্ৰিভুজৰ কালি শেষৰ পৰিয়াল। এটা শীৰ্ষবিন্দু মূলবিন্দু আৰু আন দুটা অক্ষৰ ওপৰত হ'লে, ত্ৰিভুজটো মূলবিন্দুত সমকোণী আৰু কালি = (১/২) × দুটা ছেদৰ গুণফল। সাধাৰণতে কালি স্থানাংকৰ সূত্ৰেৰে পোৱা যায়, কিন্তু প্ৰশ্নপত্ৰই সাধাৰণতে এনে শীৰ্ষবিন্দু দিয়ে যাতে এটা সৰল ৰূপ খাটে। অক্ষৰ ওপৰত ত্ৰিভুজটো আঁকিলে কোন ৰূপ ব্যৱহাৰ কৰিব লাগে সেয়া দেখুৱায়।",
      "ত্ৰিভুজৰ ভৰকেন্দ্ৰ ইয়াৰ তিনিটা শীৰ্ষবিন্দুৰ গড়। ভৰকেন্দ্ৰৰ ভুজ তিনিটা ভুজৰ গড় আৰু কোটি তিনিটা কোটিবোৰৰ গড়। ভৰকেন্দ্ৰই প্ৰতিটো মধ্যমাক শীৰ্ষবিন্দুৰ পৰা ২ : ১ অনুপাতত ভাগ কৰে, যি জ্যামিতি অধ্যায়ৰ এটা তথ্য। গতিকে ভৰকেন্দ্ৰৰ প্ৰশ্ন গড়ৰ দুশাৰীৰ প্ৰয়োগ, যদি তিনিটা শীৰ্ষবিন্দু শুদ্ধকৈ যোগ কৰা হয়।",
      "কিছুমান প্ৰশ্নত এটা বিন্দুৰ এটা স্থানাংক দিয়া থাকে আৰু আনটো এটা চৰ্তৰ পৰা বিচৰা হয়, যেনে এটা অক্ষৰ পৰা দূৰত্ব। এনে প্ৰশ্নত প্ৰথমে দিয়া অক্ষৰ দূৰত্বৰ সূত্ৰ লিখি, তাৰ পিছত অজ্ঞাতটোৰ বাবে সমাধান কৰা হয়। x-অক্ষৰ পৰা দূৰত্ব = |y| আৰু y-অক্ষৰ পৰা দূৰত্ব = |x|, গতিকে এই প্ৰশ্নবোৰ এক শাৰীত সমাধান হয় আৰু প্ৰায়ে অজ্ঞাত স্থানাংক পোনপটীয়াকৈ ওলায়।",
      "আন এটা সচৰাচৰ ৰূপত এটা খণ্ডৰ মধ্যবিন্দু দিয়া থাকে আৰু এটা মূৰ সোধা হয়। এনে প্ৰশ্নত মধ্যবিন্দুৰ সূত্ৰ দুভাৱে লিখি, জনা মূৰৰ পৰা অজ্ঞাত মূৰ বিচৰা হয়। যদি (x, ৩) আৰু (৫, ৯) ৰ মধ্যবিন্দু (৪, ৬) হয়, (x + ৫)/২ = ৪ ৰ পৰা x = ৩। এই প্ৰশ্নবোৰ সৰল আৰু যোগ-হৰণ সাৱধানে কৰিলে কেতিয়াও ভুল নহয়।",
      "কিছুমান প্ৰশ্নত এটা ৰেখাৰ প্ৰৱণতা আৰু এটা বিন্দু দি ৰেখাডালৰ সমীকৰণ সোধা হয়, বা দুটা ৰেখা সমান্তৰাল নে লম্ব সেয়া সোধা হয়। এনে প্ৰশ্নত প্ৰৱণতাৰ সূত্ৰ আৰু সমান্তৰাল-লম্বৰ সম্পৰ্ক প্ৰয়োগ কৰা হয়। যদি এটা ৰেখাৰ প্ৰৱণতা ২ হয়, তাৰ লম্ব ৰেখাৰ প্ৰৱণতা −১/২ আৰু সমান্তৰাল ৰেখাৰ প্ৰৱণতা ২। এই প্ৰশ্নবোৰ দুই শাৰীত সমাধান হয়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল প্ৰতিটো প্ৰশ্নৰ বাবে অক্ষবোৰ আঁকি বিন্দুবোৰ মোটামুটিভাৱে চিহ্নিত কৰা, কাৰণ ছবিয়ে তৎক্ষণাৎ দেখুৱায় কোন সূত্ৰ খাটে আৰু স্থানাংকৰ চিহ্নৰ ভুল ধৰা পেলায়। দ্বিতীয়টো হ'ল প্ৰতিস্থাপন কৰাৰ আগতে সূত্ৰটো লিখা, যাতে যুক্তি দৃশ্যমান হয় আৰু প্ৰতিস্থাপন পৰীক্ষা কৰা সহজ হয়। এই অভ্যাসৰ সৈতে স্থানাংক জ্যামিতিৰ প্ৰশ্নবোৰ আটাইতকৈ দ্ৰুতবোৰৰ এটা হৈ পৰে।",
      "কিছুমান প্ৰশ্নত এটা বিন্দু আৰু এটা অজ্ঞাত স্থানাংক দিয়া থাকে, আৰু দূৰত্ব বা প্ৰৱণতাৰ চৰ্তেৰে সেই অজ্ঞাতটো সোধা হয়। এনে প্ৰশ্নত প্ৰথমে দূৰত্ব বা প্ৰৱণতাৰ সূত্ৰ লিখি, দিয়া মানবোৰ বহুৱাই সমীকৰণটো সমাধান কৰা হয়। যদি (০, ০) আৰু (x, ৩) ৰ দূৰত্ব ৫ হয়, x² + ৯ = ২৫ ৰ পৰা x = ৪। চৰ্তটো সাৱধানে পঢ়াটোৱেই এই পৰিয়ালৰ মূল।",
      "আন এটা সচৰাচৰ ৰূপত তিনিটা বিন্দু সমৰেখীয় নে নহয় সোধা হয়। এনে প্ৰশ্নত প্ৰথম যোৰৰ প্ৰৱণতা আৰু দ্বিতীয় যোৰৰ প্ৰৱণতা বিচাৰি দুয়োটা তুলনা কৰা হয়। যদি দুয়োটা সমান হয়, বিন্দুবোৰ সমৰেখীয়; নহ'লে নহয়। প্ৰৱণতাৰ সূত্ৰ আৰু যোগ-বিয়োগ সাৱধানে কৰিলে এই প্ৰশ্নবোৰ কেতিয়াও ভুল নহয়।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: স্থানাংক জ্যামিতিৰ দূৰত্ব আৰু প্ৰৱণতাৰ ধাৰণা জ্যামিতি আৰু ত্ৰিকোণমিতিৰ সৈতে ঘনিষ্ঠভাৱে জড়িত। জ্যামিতিত পাইথাগোৰাছৰ উপপাদ্য যি কাম কৰে, স্থানাংক জ্যামিতিত দূৰত্ব সূত্ৰই তাকেই কৰে, আৰু ত্ৰিকোণমিতিত প্ৰৱণতা কোণৰ টেনজেণ্ট। এই সংযোগ চিনি পোৱাটোৱেই এই অধ্যায়বোৰত দক্ষতাৰ চাবি।",
      "কিছুমান প্ৰশ্নত এটা ৰেখাৰ সমীকৰণ পোনপটীয়াকৈ সোধা হয়, য'ত এটা বিন্দু আৰু প্ৰৱণতা দিয়া থাকে। এনে প্ৰশ্নত y = mx + c ৰূপত m বহুৱাই দিয়া বিন্দুটো সুমুৱাই c বিচৰা হয়। যদি প্ৰৱণতা ২ আৰু বিন্দু (০, ৩) হয়, c = ৩ আৰু সমীকৰণ y = ২x + ৩। মূলবিন্দুৰ মাজেৰে গ'লে c = ০, গতিকে y = mx। এই প্ৰশ্নবোৰ সৰল আৰু দুই শাৰীত সমাধান হয়।",
    ],
  },
  list: {
    en: [
      "Distance between two points = √((x₂ − x₁)² + (y₂ − y₁)²).",
      "Distance from the origin = √(x² + y²).",
      "Distance from the x-axis = |y|; from the y-axis = |x|.",
      "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2).",
      "Section formula for the ratio m : n: ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n)).",
      "Slope = (y₂ − y₁)/(x₂ − x₁).",
      "Parallel lines have equal slopes; perpendicular slopes multiply to −1.",
      "In y = mx + c the slope is m and the y-intercept is c.",
      "x-intercept: put y = 0; y-intercept: put x = 0.",
      "Centroid = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3).",
    ],
    as: [
      "দুটা বিন্দুৰ দূৰত্ব = √((x₂ − x₁)² + (y₂ − y₁)²)।",
      "মূলবিন্দুৰ পৰা দূৰত্ব = √(x² + y²)।",
      "x-অক্ষৰ পৰা দূৰত্ব = |y|; y-অক্ষৰ পৰা = |x|।",
      "মধ্যবিন্দু = ((x₁ + x₂)/২, (y₁ + y₂)/২)।",
      "m : n অনুপাতৰ অংশ সূত্ৰ: ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n))।",
      "প্ৰৱণতা = (y₂ − y₁)/(x₂ − x₁)।",
      "সমান্তৰাল ৰেখাৰ প্ৰৱণতা সমান; লম্ব ৰেখাৰ গুণফল −১।",
      "y = mx + c ত প্ৰৱণতা m আৰু y-ছেদ c।",
      "x-ছেদ: y = ০ বহুৱাওক; y-ছেদ: x = ০ বহুৱাওক।",
      "ভৰকেন্দ্ৰ = ((x₁ + x₂ + x₃)/৩, (y₁ + y₂ + y₃)/৩)।",
    ],
  },
  faqs: [
    {
      q: { en: "How do I find the distance between two points?", as: "দুটা বিন্দুৰ মাজৰ দূৰত্ব কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Use √((x₂ − x₁)² + (y₂ − y₁)²). For (2, 3) and (5, 7) this is √(9 + 16) = 5. When one point is the origin the formula becomes √(x² + y²) of the other point.",
        as: "√((x₂ − x₁)² + (y₂ − y₁)²) ব্যৱহাৰ কৰক। (২, ৩) আৰু (৫, ৭) ৰ বাবে ই √(৯ + ১৬) = ৫। এটা বিন্দু মূলবিন্দু হ'লে সূত্ৰটো আনটো বিন্দুৰ √(x² + y²) হয়।",
      },
    },
    {
      q: { en: "How is the slope of a line found?", as: "ৰেখাৰ প্ৰৱণতা কেনেকৈ বিচাৰি?" },
      a: {
        en: "Divide the change in y by the change in x between two points: slope = (y₂ − y₁)/(x₂ − x₁). In the form y = mx + c the slope is simply the coefficient m.",
        as: "দুটা বিন্দুৰ মাজত y ৰ পৰিৱৰ্তনক x ৰ পৰিৱৰ্তনেৰে হৰণ কৰক: প্ৰৱণতা = (y₂ − y₁)/(x₂ − x₁)। y = mx + c ৰূপত প্ৰৱণতা সহগ m মাত্ৰ।",
      },
    },
    {
      q: { en: "What is the relation between the slopes of parallel and perpendicular lines?", as: "সমান্তৰাল আৰু লম্ব ৰেখাৰ প্ৰৱণতাৰ মাজৰ সম্পৰ্ক কি?" },
      a: {
        en: "Parallel lines have equal slopes. The slopes of perpendicular lines multiply to −1, so the perpendicular slope is the negative reciprocal, for example −1/2 for a slope of 2.",
        as: "সমান্তৰাল ৰেখাৰ প্ৰৱণতা সমান। লম্ব ৰেখাৰ প্ৰৱণতাৰ গুণফল −১, গতিকে লম্ব প্ৰৱণতা ঋণাত্মক ব্যস্ত, যেনে প্ৰৱণতা ২ ৰ বাবে −১/২।",
      },
    },
    {
      q: { en: "How do I find the intercepts of a line?", as: "ৰেখাৰ ছেদবিন্দু কেনেকৈ বিচাৰিম?" },
      a: {
        en: "For the x-intercept put y = 0 and solve for x; for the y-intercept put x = 0 and solve for y. For 2x + 3y = 6 this gives the x-intercept 3 and the y-intercept 2.",
        as: "x-ছেদৰ বাবে y = ০ বহুৱাই x ৰ বাবে সমাধান কৰক; y-ছেদৰ বাবে x = ০ বহুৱাই y ৰ বাবে সমাধান কৰক। 2x + 3y = ৬ ৰ বাবে এইটোৱে x-ছেদ ৩ আৰু y-ছেদ ২ দিয়ে।",
      },
    },
    {
      q: { en: "How do I know in which quadrant a point lies?", as: "এটা বিন্দু কোন চতুৰ্থাংশত আছে সেয়া কেনেকৈ জানিম?" },
      a: {
        en: "Look at the signs: (+, +) is the first quadrant, (−, +) the second, (−, −) the third and (+, −) the fourth. If one coordinate is zero the point lies on an axis, not in a quadrant.",
        as: "চিহ্ন চাওক: (+, +) প্ৰথম চতুৰ্থাংশ, (−, +) দ্বিতীয়, (−, −) তৃতীয় আৰু (+, −) চতুৰ্থ। এটা স্থানাংক শূন্য হ'লে বিন্দুটো এটা অক্ষত থাকে, চতুৰ্থাংশত নহয়।",
      },
    },
  ],
};
