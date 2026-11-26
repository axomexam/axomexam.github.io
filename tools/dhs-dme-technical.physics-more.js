#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.physics-more.js

   Extra physics items that take every leaf of the DHS & DME
   Technical Grade III physics group to thirty or more.
   tools/merge-physics-more.js appends these to the legacy bank
   the builder reads.

   Every item names its leaf outright. The physics leaves overlap
   badly — "force" belongs to motion-force and to gravitation,
   "energy" to work-energy-power and to modern-nuclear-physics —
   so the builder is told the leaf instead of guessing.
   =========================================================== */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  Q.push({
    id,
    leaf: LEAF,
    q: { en, as },
    options: opts.map(([oen, oas]) => ({ en: oen, as: oas })),
    correct,
    explanation: { en: expEn, as: expAs },
  });
}

/* ================= simple-machines ================= */
useLeaf("simple-machines");

add("physics-141",
  "A lever in which the fulcrum lies between the load and the effort is called a",
  "যি লিভাৰত ভাৰ আৰু প্ৰচেষ্টাৰ মাজত আলম্ব থাকে তাক কি বোলা হয়",
  [["lever of the first class", "প্ৰথম শ্ৰেণীৰ লিভাৰ"], ["lever of the second class", "দ্বিতীয় শ্ৰেণীৰ লিভাৰ"], ["lever of the third class", "তৃতীয় শ্ৰেণীৰ লিভাৰ"], ["inclined plane", "নত সমতল"]], 0,
  "In a first class lever the fulcrum sits between effort and load, as in a pair of scissors or a seesaw. Second class levers put the load in the middle.",
  "প্ৰথম শ্ৰেণীৰ লিভাৰত আলম্ব প্ৰচেষ্টা আৰু ভাৰৰ মাজত থাকে, যেনে কেঁচি বা দোলনাত। দ্বিতীয় শ্ৰেণীত ভাৰ মাজত থাকে।");

add("physics-142",
  "A wheelbarrow is an example of a lever of the",
  "ঠেলা গাড়ী কি শ্ৰেণীৰ লিভাৰৰ উদাহৰণ",
  [["second class", "দ্বিতীয় শ্ৰেণী"], ["first class", "প্ৰথম শ্ৰেণী"], ["third class", "তৃতীয় শ্ৰেণী"], ["fourth class", "চতুৰ্থ শ্ৰেণী"]], 0,
  "The wheel is the fulcrum at one end, the load sits between it and the effort at the handles, so the load is in the middle and the lever is second class.",
  "চকাটো এমূৰে আলম্ব, ভাৰ তাৰ আৰু হাতলৰ প্ৰচেষ্টাৰ মাজত, সেয়ে ভাৰ মাজত আৰু লিভাৰ দ্বিতীয় শ্ৰেণীৰ।");

add("physics-143",
  "A pair of tongs is an example of a lever of the",
  "চিমটা কি শ্ৰেণীৰ লিভাৰৰ উদাহৰণ",
  [["third class", "তৃতীয় শ্ৰেণী"], ["first class", "প্ৰথম শ্ৰেণী"], ["second class", "দ্বিতীয় শ্ৰেণী"], ["inclined plane", "নত সমতল"]], 0,
  "In tongs the effort is applied between the fulcrum at the hinge and the load at the tips, so the effort lies in the middle and the lever is third class.",
  "চিমটাত প্ৰচেষ্টা কব্জাৰ আলম্ব আৰু আগৰ ভাৰৰ মাজত প্ৰয়োগ হয়, সেয়ে প্ৰচেষ্টা মাজত আৰু লিভাৰ তৃতীয় শ্ৰেণীৰ।");

add("physics-144",
  "The mechanical advantage of a machine is defined as",
  "যন্ত্ৰ এটাৰ যান্ত্ৰিক লাভ কি হিচাপে সংজ্ঞায়িত হয়",
  [["load divided by effort", "ভাৰ ভাগ প্ৰচেষ্টা"], ["effort divided by load", "প্ৰচেষ্টা ভাগ ভাৰ"], ["load multiplied by effort", "ভাৰ গুণ প্ৰচেষ্টা"], ["effort minus load", "প্ৰচেষ্টা বিয়োগ ভাৰ"]], 0,
  "Mechanical advantage compares the load lifted with the effort applied, so it is load over effort. A value above one means the machine multiplies force.",
  "যান্ত্ৰিক লাভে উঠোৱা ভাৰ আৰু প্ৰয়োগ কৰা প্ৰচেষ্টাৰ তুলনা কৰে, সেয়ে ভাৰ ভাগ প্ৰচেষ্টা। একৰ ওপৰৰ মানে যন্ত্ৰই বল বঢ়ায়।");

add("physics-145",
  "In an ideal machine the mechanical advantage is equal to",
  "আদৰ্শ যন্ত্ৰত যান্ত্ৰিক লাভ কিৰ সমান",
  [["velocity ratio", "বেগ অনুপাত"], ["efficiency", "দক্ষতা"], ["zero", "শূন্য"], ["effort", "প্ৰচেষ্টা"]], 0,
  "An ideal machine has no friction, so all the work put in comes out and efficiency is one. That makes mechanical advantage equal to velocity ratio.",
  "আদৰ্শ যন্ত্ৰত ঘৰ্ষণ নাই, সেয়ে দিয়া সকলো কাম ওলায় আৰু দক্ষতা এক। তেতিয়া যান্ত্ৰিক লাভ বেগ অনুপাতৰ সমান।");

add("physics-146",
  "The efficiency of a machine is always less than one hundred percent because of",
  "যন্ত্ৰৰ দক্ষতা সদায় এশ শতাংশতকৈ কম কাৰণ",
  [["friction", "ঘৰ্ষণ"], ["gravity", "মহাকৰ্ষণ"], ["inertia", "জড়তা"], ["momentum", "ভৰবেগ"]], 0,
  "Some of the work input is used up overcoming friction at the moving parts, so the work output is always less than the work input.",
  "কিছু কাম চলন্ত অংশত ঘৰ্ষণ নিবাৰণত খৰচ হয়, সেয়ে কাম উৎপাদ সদায় কাম প্ৰদানতকৈ কম।");

add("physics-147",
  "A single fixed pulley changes",
  "এটা স্থিৰ একক কপাৰি কি সলনি কৰে",
  [["the direction of the force only", "কেৱল বলৰ দিশ"], ["the magnitude of the force only", "কেৱল বলৰ পৰিমাণ"], ["both magnitude and direction", "পৰিমাণ আৰু দিশ দুয়োটা"], ["neither magnitude nor direction", "পৰিমাণ বা দিশ একো নহয়"]], 0,
  "A fixed pulley has a mechanical advantage of one, so it gives no force gain, but it lets you pull down to lift a load up, which is convenient.",
  "স্থিৰ কপাৰিৰ যান্ত্ৰিক লাভ এক, সেয়ে বল লাভ নাই, কিন্তু ভাৰ ওপৰলৈ তোলাবলৈ তললৈ টানিব পাৰি, যি সুবিধাজনক।");

add("physics-148",
  "The mechanical advantage of a movable pulley used alone is",
  "অকলৈ ব্যৱহৃত চলন্ত কপাৰিৰ যান্ত্ৰিক লাভ",
  [["2", "২"], ["1", "১"], ["0.5", "০.৫"], ["4", "৪"]], 0,
  "Two rope segments share the load, so the effort is half the load and the mechanical advantage is two. A fixed pulley alone would give only one.",
  "দুটা ৰছাৰ অংশে ভাৰ ভাগ কৰে, সেয়ে প্ৰচেষ্টা ভাৰৰ আধা আৰু যান্ত্ৰিক লাভ দুই। অকলৈ স্থিৰ কপাৰিয়ে কেবল এক দিব।");

add("physics-149",
  "An inclined plane is used to",
  "নত সমতল কিৰ বাবে ব্যৱহৃত হয়",
  [["raise a load with less effort over a longer distance", "বেছি দূৰত্বত কম প্ৰচেষ্টাৰে ভাৰ তোলিবলৈ"], ["raise a load with more effort over a shorter distance", "কম দূৰত্বত বেছি প্ৰচেষ্টাৰে ভাৰ তোলিবলৈ"], ["change the direction of a force", "বলৰ দিশ সলনি কৰিবলৈ"], ["increase the weight of a body", "পদাৰ্থৰ ওজন বঢ়াবলৈ"]], 0,
  "The same work is spread over a longer path, so the force needed at any instant is smaller. The total work done is not reduced, only the effort.",
  "একেই কাম দীঘল পথত বিতৰণ হয়, সেয়ে যিকোনো মুহূৰ্তত প্ৰয়োজনীয় বল কম। মুঠ কাম কম নহয়, কেবল প্ৰচেষ্টা।");

add("physics-150",
  "A screw is a form of",
  "স্ক্ৰু কিৰ এক ৰূপ",
  [["an inclined plane wrapped around a cylinder", "চুঙাৰ চাৰিওফালে মেৰিওৱা নত সমতল"], ["a lever of the second class", "দ্বিতীয় শ্ৰেণীৰ লিভাৰ"], ["a movable pulley", "চলন্ত কপাৰি"], ["a wheel and axle only", "কেৱল চকা আৰু অক্ষ"]], 0,
  "The thread of a screw is an inclined plane wound round a shaft, so a small effort over many turns lifts a heavy load a short distance.",
  "স্ক্ৰুৰ পাক নত সমতল যি দণ্ডৰ চাৰিওফালে মেৰিওৱা, সেয়ে বহু পাকত সৰু প্ৰচেষ্টাই ভাৰ কম দূৰত্বত তোলে।");

add("physics-151",
  "The velocity ratio of a machine is the ratio of",
  "যন্ত্ৰৰ বেগ অনুপাত কিৰ অনুপাত",
  [["distance moved by effort to distance moved by load", "প্ৰচেষ্টাই যোৱা দূৰত্ব ভাৰে যোৱা দূৰত্বলৈ"], ["load to effort", "ভাৰ প্ৰচেষ্টালৈ"], ["work output to work input", "কাম উৎপাদ কাম প্ৰদানলৈ"], ["time to distance", "সময় দূৰত্বলৈ"]], 0,
  "Velocity ratio compares the distances moved, not the forces. Load over effort is mechanical advantage and work output over input is efficiency.",
  "বেগ অনুপাতে দূৰত্বৰ তুলনা কৰে, বলৰ নহয়। ভাৰ ভাগ প্ৰচেষ্টা যান্ত্ৰিক লাভ আৰু কাম উৎপাদ ভাগ প্ৰদান দক্ষতা।");

add("physics-152",
  "The pivot point about which a lever turns is called the",
  "লিভাৰে ঘূৰা বিন্দুটোক কি বোলা হয়",
  [["fulcrum", "আলম্ব"], ["load", "ভাৰ"], ["effort", "প্ৰচেষ্টা"], ["axis of rotation only", "কেৱল ঘূৰ্ণন অক্ষ"]], 0,
  "The fulcrum is the fixed point on which the lever rests and turns. The load and effort are the forces on either side.",
  "আলম্ব সেই স্থিৰ বিন্দু যত লিভাৰ ৰয় আৰু ঘূৰে। ভাৰ আৰু প্ৰচেষ্টা দুয়োফালৰ বল।");

add("physics-153",
  "A steering wheel of a car works as a",
  "গাড়ীৰ ষ্টিয়াৰিং চকা কি হিচাপে কাম কৰে",
  [["wheel and axle", "চকা আৰু অক্ষ"], ["single fixed pulley", "একক স্থিৰ কপাৰি"], ["inclined plane", "নত সমতল"], ["wedge", "কীলক"]], 0,
  "The large wheel turns a small axle, so a small effort at the rim produces a larger turning effect on the shaft. That is a wheel and axle.",
  "ডাঙৰ চকাই সৰু অক্ষ ঘূৰায়, সেয়ে প্ৰান্তত সৰু প্ৰচেষ্টাই দণ্ডত ডাঙৰ ঘূৰ্ণন প্ৰভাৱ দিয়ে। সেয়া চকা আৰু অক্ষ।");

add("physics-154",
  "A wedge is a simple machine that is used to",
  "কীলক এটা সৰল যন্ত্ৰ যি কিৰ বাবে ব্যৱহৃত হয়",
  [["split or cut materials apart", "পদাৰ্থ ফালি বা কাটিবলৈ"], ["lift water from a well", "কুঁৱাৰপৰা পানী তুলিবলৈ"], ["change the direction of a force", "বলৰ দিশ সলনি কৰিবলৈ"], ["measure force", "বল জুখিবলৈ"]], 0,
  "A wedge is two inclined planes back to back, so driving it in pushes the material apart. An axe and a knife are wedges.",
  "কীলক দুটা নত সমতল পিঠি-পিঠি, সেয়ে সোমালে পদাৰ্থ ফাটি যায়। কুঠাৰ আৰু ছুৰী কীলক।");

add("physics-155",
  "The mechanical advantage of a machine that lifts a load of 200 N with an effort of 50 N is",
  "৫০ নিউটন প্ৰচেষ্টাৰে ২০০ নিউটন ভাৰ তোলা যন্ত্ৰৰ যান্ত্ৰিক লাভ",
  [["4", "৪"], ["0.25", "০.২৫"], ["250", "২৫০"], ["2", "২"]], 0,
  "Mechanical advantage is load over effort, so 200 divided by 50 gives 4. The reciprocal 0.25 would be the case if effort exceeded load.",
  "যান্ত্ৰিক লাভ ভাৰ ভাগ প্ৰচেষ্টা, সেয়ে ২০০ ভাগ ৫০ = ৪। ০.২৫ হ'ল হেতেন যদি প্ৰচেষ্টা ভাৰতকৈ বেছি হয়।");

add("physics-156",
  "In a lever of the second class the",
  "দ্বিতীয় শ্ৰেণীৰ লিভাৰত",
  [["load lies between the fulcrum and the effort", "ভাৰ আলম্ব আৰু প্ৰচেষ্টাৰ মাজত থাকে"], ["effort lies between the fulcrum and the load", "প্ৰচেষ্টা আলম্ব আৰু ভাৰৰ মাজত থাকে"], ["fulcrum lies between the load and effort", "আলম্ব ভাৰ আৰু প্ৰচেষ্টাৰ মাজত থাকে"], ["load and effort act at the same point", "ভাৰ আৰু প্ৰচেষ্টা একেই বিন্দুত কাম কৰে"]], 0,
  "Second class levers always give a mechanical advantage above one because the load is closer to the fulcrum than the effort. A nutcracker is an example.",
  "দ্বিতীয় শ্ৰেণীৰ লিভাৰৰ যান্ত্ৰিক লাভ সদায় একৰ ওপৰত কাৰণ ভাৰ প্ৰচেষ্টাতকৈ আলম্বৰ ওচৰত। নাৰিকল ফটা যন্ত্ৰ উদাহৰণ।");

add("physics-157",
  "Which of the following is a lever of the first class?",
  "তলৰ কোনটো প্ৰথম শ্ৰেণীৰ লিভাৰ",
  [["a pair of scissors", "কেঁচি"], ["a wheelbarrow", "ঠেলা গাড়ী"], ["a pair of tongs", "চিমটা"], ["a fishing rod", "মাছ ধৰা বাঁহ"]], 0,
  "In scissors the pivot is between the blades and the handles, so the fulcrum is in the middle. A wheelbarrow is second class and tongs third class.",
  "কেঁচিত কব্জা ব্লেড আৰু হাতলৰ মাজত, সেয়ে আলম্ব মাজত। ঠেলা গাড়ী দ্বিতীয় আৰু চিমটা তৃতীয় শ্ৰেণী।");

add("physics-158",
  "A machine has a velocity ratio of 5 and an efficiency of 80 percent. Its mechanical advantage is",
  "যন্ত্ৰ এটাৰ বেগ অনুপাত ৫ আৰু দক্ষতা ৮০ শতাংশ। ইয়াৰ যান্ত্ৰিক লাভ",
  [["4", "৪"], ["6.25", "৬.২৫"], ["5", "৫"], ["0.8", "০.৮"]], 0,
  "Efficiency is mechanical advantage divided by velocity ratio, so mechanical advantage is 0.8 times 5, that is 4. Multiplying instead gives the wrong 6.25.",
  "দক্ষতা যান্ত্ৰিক লাভ ভাগ বেগ অনুপাত, সেয়ে যান্ত্ৰিক লাভ ০.৮ গুণ ৫ = ৪। ভুলকৈ পূৰণ কৰিলে ৬.২৫ হয়।");

add("physics-159",
  "A pulley system with three pulleys in a block and tackle can lift a load with an effort of",
  "তিনি কপাৰিৰ ব্লক আৰু টেকলত ভাৰ তোলাৰ প্ৰচেষ্টা প্ৰায়",
  [["one third of the load, if friction is ignored", "ঘৰ্ষণ উপেক্ষা কৰিলে ভাৰৰ এক তৃতীয়াংশ"], ["the whole load", "সম্পূৰ্ণ ভাৰ"], ["twice the load", "ভাৰৰ দুগুণ"], ["half the load always", "সদায় ভাৰৰ আধা"]], 0,
  "Three supporting rope segments share the load, so the effort is about one third. Friction raises the actual effort above this ideal figure.",
  "তিনিটা সহায়ক ৰছাৰ অংশে ভাৰ ভাগ কৰে, সেয়ে প্ৰচেষ্টা প্ৰায় এক তৃতীয়াংশ। ঘৰ্ষণে প্ৰকৃত প্ৰচেষ্টা এই আদৰ্শ মানতকৈ বঢ়ায়।");

add("physics-160",
  "The work done by a machine equals",
  "যন্ত্ৰই কৰা কাম কিৰ সমান",
  [["load multiplied by the distance the load moves", "ভাৰ গুণ ভাৰে যোৱা দূৰত্ব"], ["effort multiplied by the distance the effort moves", "প্ৰচেষ্টা গুণ প্ৰচেষ্টাই যোৱা দূৰত্ব"], ["load multiplied by effort", "ভাৰ গুণ প্ৰচেষ্টা"], ["velocity ratio multiplied by efficiency", "বেগ অনুপাত গুণ দক্ষতা"]], 0,
  "Useful work output is the load times the distance it is raised. Effort times effort distance is the work input, which is always larger.",
  "উপযোগী কাম উৎপাদ ভাৰ গুণ ইয়াৰ ওঠা দূৰত্ব। প্ৰচেষ্টা গুণ প্ৰচেষ্টাৰ দূৰত্ব কাম প্ৰদান, যি সদায় বেছি।");

add("physics-161",
  "An ideal machine has an efficiency of",
  "আদৰ্শ যন্ত্ৰৰ দক্ষতা",
  [["100 percent", "১০০ শতাংশ"], ["50 percent", "৫০ শতাংশ"], ["0 percent", "০ শতাংশ"], ["more than 100 percent", "১০০ শতাংশতকৈ বেছি"]], 0,
  "With no friction all the work input appears as work output, so efficiency is one hundred percent. No real machine reaches this.",
  "ঘৰ্ষণ নাথাকিলে সকলো কাম প্ৰদান কাম উৎপাদ হিচাপে ওলায়, সেয়ে দক্ষতা এশ শতাংশ। কোনো প্ৰকৃত যন্ত্ৰই ইয়াক নাপায়।");

add("physics-162",
  "The load in a lever is the",
  "লিভাৰত ভাৰ হ'ল",
  [["resistance that has to be overcome", "যি বাধা অতিক্ৰম কৰিব লাগে"], ["force applied by the user", "ব্যৱহাৰকাৰীয়ে প্ৰয়োগ কৰা বল"], ["fixed point of turning", "ঘূৰাৰ স্থিৰ বিন্দু"], ["distance from the fulcrum", "আলম্বৰপৰা দূৰত্ব"]], 0,
  "The load is the weight or resistance the machine is meant to move, while the effort is what you apply. The fulcrum is the turning point.",
  "ভাৰ সেই ওজন বা বাধা যি যন্ত্ৰই লৰাব লাগে, আনহাতে প্ৰচেষ্টা আপুনি প্ৰয়োগ কৰা। আলম্ব ঘূৰাৰ বিন্দু।");

add("physics-163",
  "A crowbar used to lift a heavy stone works as a lever of the",
  "গধুৰ শিল তোলাৰ কাউবাৰ কি শ্ৰেণীৰ লিভাৰ",
  [["first class", "প্ৰথম শ্ৰেণী"], ["second class", "দ্বিতীয় শ্ৰেণী"], ["third class", "তৃতীয় শ্ৰেণী"], ["none of these", "এটাও নহয়"]], 0,
  "The bar rests on a stone or block that acts as the fulcrum between the load at one end and the effort at the other, so it is first class.",
  "দণ্ড এটা শিল বা খণ্ডত ৰয় যি আলম্ব, এমূৰে ভাৰ আৰু আনমূৰে প্ৰচেষ্টা, সেয়ে প্ৰথম শ্ৰেণী।");

add("physics-164",
  "If the effort arm of a lever is made longer, the effort needed to lift a given load",
  "লিভাৰৰ প্ৰচেষ্টা বাহু দীঘল কৰিলে নিৰ্দিষ্ট ভাৰ তোলাৰ প্ৰচেষ্টা",
  [["decreases", "কমে"], ["increases", "বাঢ়ে"], ["stays the same", "একেই ৰয়"], ["becomes zero", "শূন্য হয়"]], 0,
  "The turning effect is effort times effort arm, so a longer arm needs a smaller effort for the same moment. Shortening the arm would increase it.",
  "ঘূৰ্ণন প্ৰভাৱ প্ৰচেষ্টা গুণ প্ৰচেষ্টা বাহু, সেয়ে দীঘল বাহুৱে একেই ভ্ৰামকত কম প্ৰচেষ্টা বিচাৰে। চুটি কৰিলে বাঢ়ে।");

add("physics-165",
  "The principle of moments states that for a body in equilibrium",
  "ভ্ৰামক নীতিয়ে কয় যে সাম্যাৱস্থাত থকা বস্তুৰ",
  [["total clockwise moment equals total anticlockwise moment", "মুঠ ঘড়ীৰ দিশৰ ভ্ৰামক মুঠ বিপৰীত ভ্ৰামকৰ সমান"], ["total force is maximum", "মুঠ বল সৰ্বোচ্চ"], ["total load equals total effort", "মুঠ ভাৰ মুঠ প্ৰচেষ্টাৰ সমান"], ["velocity is zero only", "কেৱল বেগ শূন্য"]], 0,
  "Balance requires the turning effects in opposite directions to cancel, so the two total moments are equal. Equal load and effort is not required.",
  "ভাৰসাম্যৰ বাবে বিপৰীত দিশৰ ঘূৰ্ণন প্ৰভাৱ বাতিল হ'ব লাগে, সেয়ে দুই মুঠ ভ্ৰামক সমান। ভাৰ আৰু প্ৰচেষ্টা সমান হোৱা নালাগে।");

add("physics-166",
  "A movable pulley used with a fixed pulley gives a mechanical advantage of",
  "স্থিৰ কপাৰিৰ সৈতে ব্যৱহৃত চলন্ত কপাৰিৰ যান্ত্ৰিক লাভ",
  [["2", "২"], ["1", "১"], ["4", "৪"], ["0.5", "০.৫"]], 0,
  "The movable pulley halves the effort and the fixed one only redirects it, so the combination gives a mechanical advantage of two.",
  "চলন্ত কপাৰিয়ে প্ৰচেষ্টা আধা কৰে আৰু স্থিৰে কেবল দিশ সলায়, সেয়ে সংযোগে যান্ত্ৰিক লাভ দুই দিয়ে।");

add("physics-167",
  "Which simple machine is used in a flour mill to transmit motion between two shafts?",
  "আটা কলত দুটা দণ্ডৰ মাজত গতি সঞ্চাৰ কৰিবলৈ কোনটো সৰল যন্ত্ৰ ব্যৱহৃত হয়",
  [["a wheel and axle with a belt", "বেল্টযুক্ত চকা আৰু অক্ষ"], ["a wedge", "কীলক"], ["an inclined plane", "নত সমতল"], ["a screw jack", "স্ক্ৰু জেক"]], 0,
  "A belt over two wheels and axles carries rotation from the driving shaft to the driven one. Wedges and inclined planes do not transmit motion.",
  "দুটা চকা-অক্ষৰ ওপৰত বেল্টে ঘূৰ্ণন চলক দণ্ডৰপৰা চলিত দণ্ডলৈ নিয়ে। কীলক আৰু নত সমতলে গতি সঞ্চাৰ নকৰে।");

add("physics-168",
  "The efficiency of a machine can be increased by",
  "যন্ত্ৰৰ দক্ষতা কিৰে বঢ়োৱা যায়",
  [["lubricating its moving parts", "চলন্ত অংশ লিউব্ৰিকেট কৰি"], ["increasing the load beyond its limit", "সীমাৰ বাহিৰে ভাৰ বঢ়াই"], ["reducing the length of the effort arm", "প্ৰচেষ্টা বাহুৰ দৈৰ্ঘ্য কমাই"], ["removing the fulcrum", "আলম্ব আঁতৰাই"]], 0,
  "Lubrication cuts friction, so less of the work input is wasted and efficiency rises. Overloading increases friction and wear instead.",
  "লিউব্ৰিকেশনে ঘৰ্ষণ কমায়, সেয়ে কম কাম নষ্ট হয় আৰু দক্ষতা বাঢ়ে। অতি ভাৰে ঘৰ্ষণ আৰু ক্ষয় বঢ়ায়।");

add("physics-169",
  "A screw jack is used to",
  "স্ক্ৰু জেকে কিৰ বাবে ব্যৱহৃত হয়",
  [["lift a heavy vehicle with a small effort", "সৰু প্ৰচেষ্টাৰে গধুৰ যান তোলিবলৈ"], ["cut wood into pieces", "কাঠ টুকুৰা কৰিবলৈ"], ["measure atmospheric pressure", "বায়ুমণ্ডলীয় চাপ জুখিবলৈ"], ["change AC into DC", "AC ক DC লৈ সলনি কৰিবলৈ"]], 0,
  "The screw jack turns a threaded shaft inside a nut, and the inclined plane of the thread gives a very large force gain, enough to raise a car.",
  "স্ক্ৰু জেকে নাটৰ ভিতৰত পাকযুক্ত দণ্ড ঘূৰায়, আৰু পাকৰ নত সমতলে অতিশয় বল লাভ দিয়ে, গাড়ী তোলাৰ বাবে যথেষ্ট।");

add("physics-170",
  "The mechanical advantage of a machine is less than its velocity ratio because",
  "যন্ত্ৰৰ যান্ত্ৰিক লাভ বেগ অনুপাততকৈ কম কাৰণ",
  [["some effort is used to overcome friction", "কিছু প্ৰচেষ্টা ঘৰ্ষণ নিবাৰণত ব্যৱহৃত হয়"], ["the load is too light", "ভাৰ অতি পাতল"], ["gravity acts upwards", "মহাকৰ্ষণ ওপৰলৈ কাম কৰে"], ["the machine is ideal", "যন্ত্ৰ আদৰ্শ"]], 0,
  "Friction at the moving parts absorbs part of the effort, so the useful load lifted is smaller than the velocity ratio predicts.",
  "চলন্ত অংশৰ ঘৰ্ষণে প্ৰচেষ্টাৰ অংশ শোষে, সেয়ে উঠোৱা উপযোগী ভাৰ বেগ অনুপাতে কোৱাতকৈ কম।");

/* ================= units-measurement ================= */
useLeaf("units-measurement");

add("physics-171",
  "The SI unit of potential difference is",
  "বিভৱ পাৰ্থক্যৰ SI একক",
  [["volt", "ভল্ট"], ["ampere", "এম্পিয়াৰ"], ["ohm", "ওম"], ["watt", "ৱাট"]], 0,
  "Potential difference is measured in volts, named after Volta. Ampere is current, ohm is resistance and watt is power.",
  "বিভৱ পাৰ্থক্য ভল্টত জোখা হয়, ভল্টাৰ নামেৰে। এম্পিয়াৰ প্ৰবাহ, ওম ৰোধ আৰু ৱাট ক্ষমতা।");

add("physics-172",
  "Which of the following is a fundamental SI unit?",
  "তলৰ কোনটো SI ৰ মূল একক",
  [["kilogram", "কিলোগ্ৰাম"], ["newton", "নিউটন"], ["joule", "জুল"], ["pascal", "পাস্কেল"]], 0,
  "The kilogram is the base unit of mass, one of the seven SI base units. Newton, joule and pascal are all derived from base units.",
  "কিলোগ্ৰাম ভৰৰ মূল একক, সাতটা SI মূল এককৰ এটা। নিউটন, জুল আৰু পাস্কেল মূল এককৰপৰা উৎপন্ন।");

add("physics-173",
  "The SI unit of pressure is",
  "চাপৰ SI একক",
  [["pascal", "পাস্কেল"], ["newton", "নিউটন"], ["joule", "জুল"], ["watt", "ৱাট"]], 0,
  "One pascal is one newton of force acting on one square metre. Newton alone measures force, not force per unit area.",
  "এক পাস্কেল মানে এক বৰ্গমিটাৰত এক নিউটন বল। অকলৈ নিউটনে বল জোখে, একক কালিত বল নহয়।");

add("physics-174",
  "The dimension of force is",
  "বলৰ মাত্ৰা",
  [["MLT to the power minus two", "MLT ঘাত মাইনাছ দুই"], ["MLT to the power minus one", "MLT ঘাত মাইনাছ এক"], ["ML squared T minus two", "ML বৰ্গ T মাইনাছ দুই"], ["MLT", "MLT"]], 0,
  "Force is mass times acceleration, and acceleration is length per time squared, so the dimension is M L T to the power minus two.",
  "বল ভৰ গুণ ত্বৰণ, আৰু ত্বৰণ দীঘ ভাগ সময়ৰ বৰ্গ, সেয়ে মাত্ৰা M L T ঘাত মাইনাছ দুই।");

add("physics-175",
  "One kilometre is equal to",
  "এক কিলোমিটাৰ কিৰ সমান",
  [["1000 metres", "১০০০ মিটাৰ"], ["100 metres", "১০০ মিটাৰ"], ["10000 metres", "১০০০০ মিটাৰ"], ["10 metres", "১০ মিটাৰ"]], 0,
  "The prefix kilo means a thousand, so one kilometre is one thousand metres. One hundred would be a hectometre.",
  "কিলো উপসৰ্গই হাজাৰ বুজায়, সেয়ে এক কিলোমিটাৰ এক হাজাৰ মিটাৰ। এশ হ'লে হেক্টোমিটাৰ।");

add("physics-176",
  "The unit used to express the size of an atom is the",
  "পৰমাণুৰ আকাৰ প্ৰকাশ কৰিবলৈ ব্যৱহৃত একক",
  [["angstrom", "অ্যাংষ্ট্ৰম"], ["light year", "আলোক বৰ্ষ"], ["parsec", "পাৰ্ছেক"], ["astronomical unit", "জ্যোতিৰ্বৈজ্ঞানিক একক"]], 0,
  "One angstrom is ten to the power minus ten metres, about the size of an atom. Light year and parsec measure huge distances.",
  "এক অ্যাংষ্ট্ৰম দহৰ ঘাত মাইনাছ দহ মিটাৰ, প্ৰায় পৰমাণুৰ আকাৰ। আলোক বৰ্ষ আৰু পাৰ্ছেকে বিশাল দূৰত্ব জোখে।");

add("physics-177",
  "A light year is a unit of",
  "আলোক বৰ্ষ কিৰ একক",
  [["distance", "দূৰত্ব"], ["time", "সময়"], ["brightness", "উজ্জ্বলতা"], ["speed", "গতি"]], 0,
  "A light year is the distance light covers in one year, about nine point four six times ten to the twelve kilometres. It is not a time.",
  "আলোক বৰ্ষ মানে আলোকে এক বছৰত যোৱা দূৰত্ব, প্ৰায় ৯.৪৬ গুণ দহৰ ঘাত বাৰ কিলোমিটাৰ। ই সময় নহয়।");

add("physics-178",
  "The number of base units in the SI system is",
  "SI পদ্ধতিত মূল এককৰ সংখ্যা",
  [["7", "৭"], ["3", "৩"], ["9", "৯"], ["12", "১২"]], 0,
  "There are seven base units: metre, kilogram, second, ampere, kelvin, mole and candela. Every other unit is derived from these.",
  "সাতটা মূল একক: মিটাৰ, কিলোগ্ৰাম, ছেকেণ্ড, এম্পিয়াৰ, কেলভিন, মৌল আৰু কেন্দেলা। বাকী সকলো একক ইহঁতৰপৰা উৎপন্ন।");

add("physics-179",
  "Which instrument is used to measure the diameter of a thin wire accurately?",
  "পাতল তাঁৰৰ ব্যাস সঠিকভাৱে জুখিবলৈ কোন যন্ত্ৰ ব্যৱহৃত হয়",
  [["screw gauge", "স্ক্ৰু গজ"], ["metre scale", "মিটাৰ স্কেল"], ["measuring tape", "জোখা ফিতা"], ["vernier caliper only", "কেৱল ভাৰ্নিয়াৰ কেলিপাৰ"]], 0,
  "A screw gauge reads to a hundredth of a millimetre, which suits thin wire. A metre scale is far too coarse for this.",
  "স্ক্ৰু গজে মিলিমিটাৰৰ এশ ভাগৰ এক ভাগ পঢ়ে, যি পাতল তাঁৰৰ বাবে উপযুক্ত। মিটাৰ স্কেল ইয়াৰ বাবে অতি স্থূল।");

add("physics-180",
  "The least count of an ordinary metre scale is",
  "সাধাৰণ মিটাৰ স্কেলৰ ন্যূনতম গণনা",
  [["1 millimetre", "১ মিলিমিটাৰ"], ["1 centimetre", "১ ছেন্টিমিটাৰ"], ["1 metre", "১ মিটাৰ"], ["0.1 millimetre", "০.১ মিলিমিটাৰ"]], 0,
  "The smallest division on a metre scale is one millimetre, so that is its least count. A screw gauge reaches a hundredth of a millimetre.",
  "মিটাৰ স্কেলৰ আটাই সৰু ভাগ এক মিলিমিটাৰ, সেয়ে সেয়াই ন্যূনতম গণনা। স্ক্ৰু গজে মিলিমিটাৰৰ এশ ভাগৰ এক ভাগ পায়।");

add("physics-181",
  "A scalar quantity has",
  "অদিশ ৰাশিত থাকে",
  [["magnitude only", "কেৱল পৰিমাণ"], ["direction only", "কেৱল দিশ"], ["both magnitude and direction", "পৰিমাণ আৰু দিশ দুয়োটা"], ["neither magnitude nor direction", "পৰিমাণ বা দিশ একো নহয়"]], 0,
  "Scalars such as mass, time and temperature are fully described by size alone. Vectors need a direction as well.",
  "ভৰ, সময় আৰু উষ্ণতাৰ দৰে অদিশ ৰাশি কেবল পৰিমাণেৰে সম্পূৰ্ণ বৰ্ণনা হয়। সদিশ ৰাশিলৈ দিশও লাগে।");

add("physics-182",
  "Which of the following is a vector quantity?",
  "তলৰ কোনটো সদিশ ৰাশি",
  [["displacement", "সৰণ"], ["distance", "দূৰত্ব"], ["speed", "দ্ৰুতি"], ["mass", "ভৰ"]], 0,
  "Displacement has both size and direction, so it is a vector. Distance, speed and mass have size only.",
  "সৰণত পৰিমাণ আৰু দিশ দুয়োটা, সেয়ে সদিশ। দূৰত্ব, দ্ৰুতি আৰু ভৰত কেবল পৰিমাণ।");

add("physics-183",
  "One nanometre is equal to",
  "এক নেনোমিটাৰ কিৰ সমান",
  [["ten to the power minus nine metre", "দহৰ ঘাত মাইনাছ ন মিটাৰ"], ["ten to the power minus six metre", "দহৰ ঘাত মাইনাছ ছয় মিটাৰ"], ["ten to the power minus three metre", "দহৰ ঘাত মাইনাছ তিনি মিটাৰ"], ["ten to the power minus twelve metre", "দহৰ ঘাত মাইনাছ বাৰ মিটাৰ"]], 0,
  "The prefix nano means one thousand millionth, so a nanometre is ten to the power minus nine metres. Micro is minus six.",
  "নেনো উপসৰ্গই এশ কোটিৰ এক ভাগ বুজায়, সেয়ে নেনোমিটাৰ দহৰ ঘাত মাইনাছ ন মিটাৰ। মাইক্ৰ' মাইনাছ ছয়।");

add("physics-184",
  "The SI unit of temperature is",
  "উষ্ণতাৰ SI একক",
  [["kelvin", "কেলভিন"], ["celsius", "ছেলছিয়াছ"], ["fahrenheit", "ফাৰেনহাইট"], ["joule", "জুল"]], 0,
  "The kelvin is the SI base unit of thermodynamic temperature. Celsius and Fahrenheit are scales in common use but not SI units.",
  "কেলভিন তাপগতীয় উষ্ণতাৰ SI মূল একক। ছেলছিয়াছ আৰু ফাৰেনহাইট প্ৰচলিত মাপকিন্তু SI একক নহয়।");

add("physics-185",
  "Zero degree Celsius is equal to",
  "শূন্য ডিগ্ৰী ছেলছিয়াছ কিৰ সমান",
  [["273 kelvin", "২৭৩ কেলভিন"], ["373 kelvin", "৩৭৩ কেলভিন"], ["100 kelvin", "১০০ কেলভিন"], ["0 kelvin", "০ কেলভিন"]], 0,
  "The kelvin scale starts at absolute zero, which is minus 273 degrees Celsius, so zero Celsius is 273 kelvin. Zero kelvin is absolute zero itself.",
  "কেলভিন মাপক নিৰপেক্ষ শূন্যৰপৰা আৰম্ভ, যি মাইনাছ ২৭৩ ডিগ্ৰী ছেলছিয়াছ, সেয়ে শূন্য ছেলছিয়াছ ২৭৩ কেলভিন। শূন্য কেলভিন নিজেই নিৰপেক্ষ শূন্য।");

add("physics-186",
  "The unit of power in the SI system is the",
  "SI পদ্ধতিত ক্ষমতাৰ একক",
  [["watt", "ৱাট"], ["joule", "জুল"], ["newton", "নিউটন"], ["coulomb", "কুলম্ব"]], 0,
  "One watt is one joule of energy per second. Joule measures energy and newton measures force.",
  "এক ৱাট মানে প্ৰতি ছেকেণ্ডত এক জুল শক্তি। জুলে শক্তি আৰু নিউটনে বল জোখে।");

add("physics-187",
  "The instrument used to measure the thickness of a metal sheet is a",
  "ধাতুৰ চাদৰ বেধ জুখিবলৈ ব্যৱহৃত যন্ত্ৰ",
  [["screw gauge", "স্ক্ৰু গজ"], ["barometer", "বেৰ'মিটাৰ"], ["hydrometer", "হাইড্ৰ'মিটাৰ"], ["hygrometer", "হাইগ্ৰ'মিটাৰ"]], 0,
  "A screw gauge measures small thicknesses to a hundredth of a millimetre. Barometer measures pressure and hydrometer relative density.",
  "স্ক্ৰু গজে সৰু বেধ মিলিমিটাৰৰ এশ ভাগৰ এক ভাগলৈ জোখে। বেৰ'মিটাৰে চাপ আৰু হাইড্ৰ'মিটাৰে আপেক্ষিক ঘনত্ব।");

add("physics-188",
  "The prefix micro stands for",
  "মাইক্ৰ' উপসৰ্গই কি বুজায়",
  [["ten to the power minus six", "দহৰ ঘাত মাইনাছ ছয়"], ["ten to the power minus three", "দহৰ ঘাত মাইনাছ তিনি"], ["ten to the power minus nine", "দহৰ ঘাত মাইনাছ ন"], ["ten to the power six", "দহৰ ঘাত ছয়"]], 0,
  "Micro means one millionth, that is ten to the power minus six. Milli is minus three and nano is minus nine.",
  "মাইক্ৰ' মানে দহ লাখৰ এক ভাগ, অৰ্থাৎ দহৰ ঘাত মাইনাছ ছয়। মিলি মাইনাছ তিনি আৰু নেনো মাইনাছ ন।");

add("physics-189",
  "One astronomical unit is the average distance between the",
  "এক জ্যোতিৰ্বৈজ্ঞানিক একক কিৰ মাজৰ গড় দূৰত্ব",
  [["earth and the sun", "পৃথিৱী আৰু সূৰ্য"], ["earth and the moon", "পৃথিৱী আৰু চন্দ্ৰ"], ["sun and the nearest star", "সূৰ্য আৰু নিকটতম তৰা"], ["earth and mars", "পৃথিৱী আৰু মংগল"]], 0,
  "One astronomical unit is about one hundred and fifty million kilometres, the mean earth to sun distance. It is used for distances inside the solar system.",
  "এক জ্যোতিৰ্বৈজ্ঞানিক একক প্ৰায় পোন্ধৰ কোটি কিলোমিটাৰ, পৃথিৱীৰপৰা সূৰ্যলৈ গড় দূৰত্ব। ই সৌৰজগতৰ ভিতৰৰ দূৰত্বত ব্যৱহৃত।");

add("physics-190",
  "Which of the following is a derived unit?",
  "তলৰ কোনটো উৎপন্ন একক",
  [["newton", "নিউটন"], ["metre", "মিটাৰ"], ["kilogram", "কিলোগ্ৰাম"], ["second", "ছেকেণ্ড"]], 0,
  "The newton is built from kilogram, metre and second, so it is derived. Metre, kilogram and second are base units.",
  "নিউটন কিলোগ্ৰাম, মিটাৰ আৰু ছেকেণ্ডৰপৰা গঠিত, সেয়ে উৎপন্ন। মিটাৰ, কিলোগ্ৰাম আৰু ছেকেণ্ড মূল একক।");

add("physics-191",
  "The error caused by incorrect positioning of the eye while taking a reading is called",
  "পঢ়া লওঁতে চকুৰ ভুল অৱস্থানৰপৰা হোৱা ত্ৰুটিক কি বোলা হয়",
  [["parallax error", "পেৰালাক্স ত্ৰুটি"], ["zero error", "শূন্য ত্ৰুটি"], ["random error", "আকস্মিক ত্ৰুটি"], ["systematic error", "ব্যৱস্থাগত ত্ৰুটি"]], 0,
  "Parallax error arises when the eye is not directly in line with the mark, so the reading appears shifted. Zero error is a fault of the instrument itself.",
  "চকু দাগৰ সোজা ৰেখাত নাথাকিলে পেৰালাক্স ত্ৰুটি হয়, সেয়ে পঢ়া সৰকা দেখা যায়। শূন্য ত্ৰুটি যন্ত্ৰৰ নিজৰ ত্ৰুটি।");

add("physics-192",
  "The SI unit of electric charge is the",
  "বৈদ্যুতিক আধানৰ SI একক",
  [["coulomb", "কুলম্ব"], ["volt", "ভল্ট"], ["ampere", "এম্পিয়াৰ"], ["ohm", "ওম"]], 0,
  "Charge is measured in coulombs, and one coulomb is one ampere flowing for one second. Ampere is the rate of flow, not the amount.",
  "আধান কুলম্বত জোখা হয়, আৰু এক কুলম্ব মানে এক এম্পিয়াৰ এক ছেকেণ্ড চলা। এম্পিয়াৰ প্ৰবাহৰ হাৰ, পৰিমাণ নহয়।");

add("physics-193",
  "One micron is equal to",
  "এক মাইক্ৰ'ন কিৰ সমান",
  [["one thousandth of a millimetre", "মিলিমিটাৰৰ এক হাজাৰ ভাগৰ এক ভাগ"], ["one thousandth of a metre", "মিটাৰৰ এক হাজাৰ ভাগৰ এক ভাগ"], ["one hundredth of a millimetre", "মিলিমিটাৰৰ এক এশ ভাগৰ এক ভাগ"], ["one millionth of a metre", "মিটাৰৰ দহ লাখ ভাগৰ এক ভাগ"]], 0,
  "A micron is a micrometre, ten to the power minus six metres, which is a thousandth of a millimetre. A millimetre is a thousandth of a metre.",
  "মাইক্ৰ'ন মানে মাইক্ৰ'মিটাৰ, দহৰ ঘাত মাইনাছ ছয় মিটাৰ, যি মিলিমিটাৰৰ এক হাজাৰ ভাগৰ এক ভাগ। মিলিমিটাৰ মিটাৰৰ এক হাজাৰ ভাগ।");

add("physics-194",
  "The measurement 5.00 m has how many significant figures?",
  "৫.০০ মিটাৰ জোখত কিমান উল্লেখযোগ্য অংক আছে",
  [["3", "৩"], ["1", "১"], ["2", "২"], ["5", "৫"]], 0,
  "Trailing zeros after a decimal point are significant, so all three digits count. Writing only 5 would give one figure.",
  "দশমিক বিন্দুৰ পিছৰ শেষৰ শূন্যবোৰ উল্লেখযোগ্য, সেয়ে তিনিওটা অংক গণা হয়। কেবল ৫ লিখিলে এক অংক হ'ব।");

add("physics-195",
  "Which of the following quantities has the same unit as work?",
  "তলৰ কোনটো ৰাশিৰ একক কামৰ এককৰ সৈতে একেই",
  [["energy", "শক্তি"], ["force", "বল"], ["power", "ক্ষমতা"], ["pressure", "চাপ"]], 0,
  "Both work and energy are measured in joules because energy is the capacity to do work. Power is joules per second.",
  "কাম আৰু শক্তি দুয়োটা জুলত জোখা হয় কাৰণ শক্তি কাম কৰাৰ সামৰ্থ্য। ক্ষমতা জুল প্ৰতি ছেকেণ্ড।");

add("physics-196",
  "A body moving with uniform velocity has",
  "সুষম বেগেৰে গতি কৰা বস্তুৰ",
  [["zero acceleration", "শূন্য ত্বৰণ"], ["increasing acceleration", "বাঢ়ি থকা ত্বৰণ"], ["constant acceleration", "স্থিৰ অশূন্য ত্বৰণ"], ["negative velocity only", "কেৱল ঋণাত্মক বেগ"]], 0,
  "Uniform velocity means the speed and direction do not change, so the rate of change of velocity is zero and acceleration is zero.",
  "সুষম বেগ মানে দ্ৰুতি আৰু দিশ নসলায়, সেয়ে বেগৰ পৰিৱৰ্তনৰ হাৰ শূন্য আৰু ত্বৰণ শূন্য।");

add("physics-197",
  "The SI unit of momentum is",
  "ভৰবেগৰ SI একক",
  [["kilogram metre per second", "কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["newton second per metre", "নিউটন ছেকেণ্ড প্ৰতি মিটাৰ"], ["joule second", "জুল ছেকেণ্ড"], ["kilogram metre squared", "কিলোগ্ৰাম মিটাৰ বৰ্গ"]], 0,
  "Momentum is mass times velocity, so its unit is kilogram metre per second. Newton second is the same unit for impulse.",
  "ভৰবেগ ভৰ গুণ বেগ, সেয়ে একক কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড। নিউটন ছেকেণ্ড আৱেগৰ একেই একক।");

add("physics-198",
  "Which of the following is used to measure very small time intervals accurately?",
  "অতি সৰু সময়ৰ অন্তৰাল সঠিকভাৱে জুখিবলৈ কোনটো ব্যৱহৃত হয়",
  [["stop watch", "ষ্টপ ৱাচ"], ["wall clock", "বেৰৰ ঘড়ী"], ["sand clock", "বালি ঘড়ী"], ["sundial", "সূৰ্য ঘড়ী"]], 0,
  "A stop watch reads to a tenth or hundredth of a second, which suits laboratory timing. A wall clock reads only seconds.",
  "ষ্টপ ৱাচে ছেকেণ্ডৰ দহ বা এশ ভাগৰ এক ভাগ পঢ়ে, যি পৰীক্ষাগাৰৰ সময়ৰ বাবে উপযুক্ত। বেৰৰ ঘড়ীয়ে কেবল ছেকেণ্ড পঢ়ে।");

add("physics-199",
  "The value of one standard atmosphere in pascal is about",
  "এক প্ৰামাণ্য বায়ুমণ্ডলৰ পাস্কেলত মান প্ৰায়",
  [["101300", "১০১৩০০"], ["1013", "১০১৩"], ["10130", "১০১৩০"], ["1013000", "১০১৩০০০"]], 0,
  "Standard atmospheric pressure is about one hundred and one thousand three hundred pascal, that is 1.013 times ten to the five.",
  "প্ৰামাণ্য বায়ুমণ্ডলীয় চাপ প্ৰায় এক লাখ এক হাজাৰ তিনি শ পাস্কেল, অৰ্থাৎ ১.০১৩ গুণ দহৰ ঘাত পাঁচ।");

/* ================= pressure-fluids ================= */
useLeaf("pressure-fluids");

add("physics-200",
  "Pressure is defined as",
  "চাপক কি হিচাপে সংজ্ঞায়িত কৰা হয়",
  [["force per unit area", "একক কালিত বল"], ["force multiplied by area", "বল গুণ কালি"], ["area per unit force", "একক বলত কালি"], ["force per unit volume", "একক আয়তনত বল"]], 0,
  "Pressure is the force acting normally on unit area, so the same force over a smaller area gives more pressure. That is why a sharp knife cuts easily.",
  "চাপ একক কালিত লম্বভাৱে ক্ৰিয়া কৰা বল, সেয়ে একেই বল সৰু কালিত বেছি চাপ দিয়ে। সেয়ে ধাৰাল ছুৰীয়ে সহজে কাটে।");

add("physics-201",
  "The pressure at a depth h in a liquid of density d is given by",
  "ঘনত্ব d থকা জুলীয়াৰ h গভীৰতাত চাপ কিৰ দ্বাৰা দিয়া হয়",
  [["h d g", "h d g"], ["h d", "h d"], ["h g", "h g"], ["d g", "d g"]], 0,
  "Liquid pressure is depth times density times gravity, so it grows with depth and with the density of the liquid. Area does not appear.",
  "জুলীয়াৰ চাপ গভীৰতা গুণ ঘনত্ব গুণ মহাকৰ্ষণ, সেয়ে গভীৰতা আৰু জুলীয়াৰ ঘনত্বৰ সৈতে বাঢ়ে। কালি ইয়াত নাই।");

add("physics-202",
  "The pressure at a point inside a liquid depends on",
  "জুলীয়াৰ ভিতৰৰ বিন্দু এটাত চাপ কিৰ ওপৰত নিৰ্ভৰ কৰে",
  [["the depth below the surface", "পৃষ্ঠৰ তলৰ গভীৰতা"], ["the shape of the vessel", "পাত্ৰৰ আকৃতি"], ["the area of the surface", "পৃষ্ঠৰ কালি"], ["the volume of the liquid only", "কেৱল জুলীয়াৰ আয়তন"]], 0,
  "Pressure depends only on depth, density and gravity, not on the shape or size of the container. This is the hydrostatic paradox.",
  "চাপ কেবল গভীৰতা, ঘনত্ব আৰু মহাকৰ্ষণৰ ওপৰত নিৰ্ভৰ, পাত্ৰৰ আকৃতি বা আকাৰৰ ওপৰত নহয়। এইয়া জলস্থিতিক আপাতবিৰোধ।");

add("physics-203",
  "Pascal's law states that pressure applied to an enclosed liquid is",
  "পাস্কেলৰ নীতিয়ে কয় যে বন্ধ জুলীয়াত প্ৰয়োগ কৰা চাপ",
  [["transmitted equally in all directions", "সকলো দিশলৈ সমানে সঞ্চাৰিত হয়"], ["transmitted only downwards", "কেৱল তললৈ সঞ্চাৰিত হয়"], ["reduced with depth", "গভীৰতাৰ সৈতে কমে"], ["lost at the walls", "বেৰত হেৰায়"]], 0,
  "The applied pressure is passed on undiminished throughout the liquid, which is the basis of the hydraulic press and hydraulic brakes.",
  "প্ৰয়োগ কৰা চাপ জুলীয়াৰ সকলো ঠাইতে অক্ষয়ভাৱে যায়, যি জলীয় প্ৰেছ আৰু জলীয় ব্ৰেকৰ ভিত্তি।");

add("physics-204",
  "A hydraulic press works on the principle of",
  "জলীয় প্ৰেছ কি নীতিত কাম কৰে",
  [["Pascal's law", "পাস্কেলৰ নীতিত"], ["Archimedes' principle", "আৰ্কিমিডিছৰ নীতিত"], ["Boyle's law", "বয়লৰ নীতিত"], ["Newton's third law", "নিউটনৰ তৃতীয় নীতিত"]], 0,
  "A small force on a small piston creates a pressure that acts on a large piston, producing a large force. That is Pascal's law in action.",
  "সৰু পিষ্টনত সৰু বলে চাপ সৃষ্টি কৰে যি ডাঙৰ পিষ্টনত ক্ৰিয়া কৰি ডাঙৰ বল দিয়ে। সেয়া পাস্কেলৰ নীতিয়ে কাম কৰা।");

add("physics-205",
  "Archimedes' principle states that the upthrust on a body immersed in a fluid equals the weight of",
  "আৰ্কিমিডিছৰ নীতিয়ে কয় যে জুলীয়াত ডুবোৱা বস্তুৰ ওপৰৰ উৰ্দ্ধচাপ কিৰ ওজনৰ সমান",
  [["the fluid displaced by the body", "বস্তুৱে আঁতৰোৱা জুলীয়াৰ"], ["the body itself", "বস্তুটোৰ নিজৰ"], ["the fluid in the container", "পাত্ৰৰ জুলীয়াৰ"], ["the body in air", "বায়ুত বস্তুটোৰ"]], 0,
  "The upthrust equals the weight of the displaced fluid, which is why a ship floats by displacing a large volume of water.",
  "উৰ্দ্ধচাপ আঁতৰোৱা জুলীয়াৰ ওজনৰ সমান, সেয়ে জাহাজে বহু পানী আঁতৰাই ওপঙে।");

add("physics-206",
  "A body will float in a liquid if its density is",
  "বস্তু এটা জুলীয়াত ওপঙিব যদি তাৰ ঘনত্ব",
  [["less than that of the liquid", "জুলীয়াৰ ঘনত্বতকৈ কম"], ["equal to that of the liquid", "জুলীয়াৰ ঘনত্বৰ সমান"], ["greater than that of the liquid", "জুলীয়াৰ ঘনত্বতকৈ বেছি"], ["independent of the liquid", "জুলীয়াৰপৰা স্বতন্ত্ৰ"]], 0,
  "A body floats when its density is lower than the liquid, so the upthrust balances its weight before it is fully submerged. Higher density makes it sink.",
  "বস্তুৰ ঘনত্ব জুলীয়াৰতকৈ কম হ'লে ওপঙে, সেয়ে সম্পূৰ্ণ ডুবাৰ আগতে উৰ্দ্ধচাপে ওজন ভাৰসাম্য কৰে। বেছি ঘনত্বে ডুবায়।");

add("physics-207",
  "The buoyant force on a body immersed in a liquid acts",
  "জুলীয়াত ডুবোৱা বস্তুৰ ওপৰত উৰ্দ্ধচাপ ক্ৰিয়া কৰে",
  [["upwards", "ওপৰলৈ"], ["downwards", "তললৈ"], ["sideways only", "কেৱল কাষলৈ"], ["in no fixed direction", "কোনো নিৰ্দিষ্ট দিশলৈ নহয়"]], 0,
  "The pressure on the lower surface is greater than on the upper surface because it is deeper, so the net force is upward.",
  "তলৰ পৃষ্ঠত চাপ ওপৰৰ পৃষ্ঠতকৈ বেছি কাৰণ ই বেছি গভীৰ, সেয়ে মুঠ বল ওপৰলৈ।");

add("physics-208",
  "A hydrometer is used to measure the",
  "হাইড্ৰ'মিটাৰ কি জুখিবলৈ ব্যৱহৃত হয়",
  [["relative density of a liquid", "জুলীয়াৰ আপেক্ষিক ঘনত্ব"], ["atmospheric pressure", "বায়ুমণ্ডলীয় চাপ"], ["humidity of air", "বায়ুৰ আৰ্দ্ৰতা"], ["temperature of a liquid", "জুলীয়াৰ উষ্ণতা"]], 0,
  "A hydrometer floats at a depth that depends on the density of the liquid, so the scale reads relative density. A barometer reads pressure.",
  "হাইড্ৰ'মিটাৰ জুলীয়াৰ ঘনত্বৰ ওপৰত নিৰ্ভৰ কৰি এটা গভীৰতাত ওপঙে, সেয়ে মাপকে আপেক্ষিক ঘনত্ব পঢ়ে। বেৰ'মিটাৰে চাপ পঢ়ে।");

add("physics-209",
  "The atmospheric pressure at sea level is about",
  "সমুদ্ৰপৃষ্ঠত বায়ুমণ্ডলীয় চাপ প্ৰায়",
  [["76 cm of mercury", "৭৬ ছেন্টিমিটাৰ পাৰা"], ["13.6 cm of mercury", "১৩.৬ ছেন্টিমিটাৰ পাৰা"], ["100 cm of mercury", "১০০ ছেন্টিমিটাৰ পাৰা"], ["760 cm of mercury", "৭৬০ ছেন্টিমিটাৰ পাৰা"]], 0,
  "Standard atmospheric pressure supports a mercury column of about seventy-six centimetres, which is one atmosphere. The figure 13.6 is the density of mercury.",
  "প্ৰামাণ্য বায়ুমণ্ডলীয় চাপে প্ৰায় ছয়াতৰ ছেন্টিমিটাৰ পাৰাৰ স্তম্ভ ধৰি ৰাখে, যি এক বায়ুমণ্ডল। ১৩.৬ পাৰাৰ ঘনত্ব।");

add("physics-210",
  "A barometer is used to measure",
  "বেৰ'মিটাৰ কি জুখিবলৈ ব্যৱহৃত হয়",
  [["atmospheric pressure", "বায়ুমণ্ডলীয় চাপ"], ["liquid density", "জুলীয়াৰ ঘনত্ব"], ["wind speed", "বায়ুৰ গতি"], ["relative humidity", "আপেক্ষিক আৰ্দ্ৰতা"]], 0,
  "A barometer balances the weight of the atmosphere against a column of mercury, so it reads atmospheric pressure directly.",
  "বেৰ'মিটাৰে বায়ুমণ্ডলৰ ওজন পাৰাৰ স্তম্ভৰ সৈতে ভাৰসাম্য কৰে, সেয়ে ই বায়ুমণ্ডলীয় চাপ পোনপটীয়াকৈ পঢ়ে।");

add("physics-211",
  "An object weighs less in water than in air because",
  "বস্তু এটা পানীত বায়ুতকৈ কম ওজনৰ অনুভৱ হয় কাৰণ",
  [["water exerts an upward buoyant force", "পানীয়ে ওপৰলৈ উৰ্দ্ধচাপ বল দিয়ে"], ["water reduces the mass", "পানীয়ে ভৰ কমায়"], ["gravity is weaker in water", "পানীত মহাকৰ্ষণ দুৰ্বল"], ["water has no weight", "পানীৰ ওজন নাই"]], 0,
  "The buoyant force acts upward and reduces the apparent weight, but the mass and the true weight are unchanged. Gravity is the same.",
  "উৰ্দ্ধচাপ বল ওপৰলৈ ক্ৰিয়া কৰি আপাত ওজন কমায়, কিন্তু ভৰ আৰু প্ৰকৃত ওজন অপৰিৱৰ্তিত। মহাকৰ্ষণ একেই।");

add("physics-212",
  "The relative density of a substance is the ratio of its density to the density of",
  "পদাৰ্থ এটাৰ আপেক্ষিক ঘনত্ব তাৰ ঘনত্ব আৰু কিৰ ঘনত্বৰ অনুপাত",
  [["water at 4 degrees Celsius", "৪ ডিগ্ৰী ছেলছিয়াছত পানীৰ"], ["mercury", "পাৰাৰ"], ["air", "বায়ুৰ"], ["the substance itself", "পদাৰ্থটোৰ নিজৰ"]], 0,
  "Relative density compares a substance with water at four degrees, where water is most dense. It has no unit because it is a ratio.",
  "আপেক্ষিক ঘনত্বে পদাৰ্থক চাৰি ডিগ্ৰীত পানীৰ সৈতে তুলনা কৰে, যত পানী আটাই ঘন। অনুপাত হোৱা বাবে ইয়াৰ একক নাই।");

add("physics-213",
  "The pressure exerted by a liquid at a given depth is independent of",
  "নিৰ্দিষ্ট গভীৰতাত জুলীয়াৰ চাপ কিৰ ওপৰত নিৰ্ভৰশীল নহয়",
  [["the area of the base of the vessel", "পাত্ৰৰ তলৰ কালিৰ"], ["the depth of the point", "বিন্দুৰ গভীৰতাৰ"], ["the density of the liquid", "জুলীয়াৰ ঘনত্বৰ"], ["the acceleration due to gravity", "মহাকৰ্ষণজনিত ত্বৰণৰ"]], 0,
  "Only depth, density and gravity appear in the formula, so the base area does not matter. A wide and a narrow vessel of the same depth give the same pressure.",
  "সূত্ৰত কেবল গভীৰতা, ঘনত্ব আৰু মহাকৰ্ষণ থাকে, সেয়ে তলৰ কালিয়ে নধৰে। একেই গভীৰতাৰ বহল আৰু সৰু পাত্ৰই একেই চাপ দিয়ে।");

add("physics-214",
  "A device used to lift a car using a small force applied to a small piston is a",
  "সৰু পিষ্টনত সৰু বল প্ৰয়োগ কৰি গাড়ী তোলা যন্ত্ৰটো",
  [["hydraulic jack", "জলীয় জেক"], ["screw gauge", "স্ক্ৰু গজ"], ["barometer", "বেৰ'মিটাৰ"], ["manometer", "মেন'মিটাৰ"]], 0,
  "The hydraulic jack uses Pascal's law, with a small piston creating pressure that acts on a large piston to raise the car.",
  "জলীয় জেকে পাস্কেলৰ নীতি ব্যৱহাৰ কৰে, সৰু পিষ্টনে চাপ সৃষ্টি কৰি ডাঙৰ পিস্তনত ক্ৰিয়া কৰি গাড়ী তোলে।");

add("physics-215",
  "The density of a substance is defined as",
  "পদাৰ্থ এটাৰ ঘনত্বক কি হিচাপে সংজ্ঞায়িত কৰা হয়",
  [["mass per unit volume", "একক আয়তনত ভৰ"], ["volume per unit mass", "একক ভৰত আয়তন"], ["weight per unit area", "একক কালিত ওজন"], ["force per unit area", "একক কালিত বল"]], 0,
  "Density is mass divided by volume, so a denser material packs more mass into the same space. Weight per unit area would be pressure.",
  "ঘনত্ব ভৰ ভাগ আয়তন, সেয়ে বেছি ঘন পদাৰ্থই একেই ঠাইত বেছি ভৰ ৰাখে। একক কালিত ওজন চাপ হ'ব।");

add("physics-216",
  "Ice floats on water because its density is",
  "বৰফ পানীত ওপঙে কাৰণ তাৰ ঘনত্ব",
  [["less than that of water", "পানীৰ ঘনত্বতকৈ কম"], ["equal to that of water", "পানীৰ ঘনত্বৰ সমান"], ["more than that of water", "পানীৰ ঘনত্বতকৈ বেছি"], ["zero", "শূন্য"]], 0,
  "Water expands when it freezes, so ice is less dense than liquid water and floats with about a tenth of its volume above the surface.",
  "পানী জমিলে বিস্তৃত হয়, সেয়ে বৰফৰ ঘনত্ব কম আৰু ইয়াৰ প্ৰায় এক দশমাংশ পৃষ্ঠৰ ওপৰত থাকি ওপঙে।");

add("physics-217",
  "A manometer is used to measure the",
  "মেন'মিটাৰ কি জুখিবলৈ ব্যৱহৃত হয়",
  [["pressure of a gas", "গেছেৰ চাপ"], ["density of a solid", "কঠিনৰ ঘনত্ব"], ["humidity of air", "বায়ুৰ আৰ্দ্ৰতা"], ["speed of a fluid", "জুলীয়াৰ গতি"]], 0,
  "A manometer balances gas pressure against a liquid column and reads the difference. A barometer is for atmospheric pressure.",
  "মেন'মিটাৰে গেছেৰ চাপ জুলীয়াৰ স্তম্ভৰ সৈতে ভাৰসাম্য কৰি পাৰ্থক্য পঢ়ে। বেৰ'মিটাৰ বায়ুমণ্ডলীয় চাপৰ বাবে।");

add("physics-218",
  "The upthrust on a body depends on",
  "বস্তুৰ ওপৰৰ উৰ্দ্ধচাপ কিৰ ওপৰত নিৰ্ভৰ কৰে",
  [["the volume of the body immersed", "বস্তুৰ ডুবা আয়তনৰ"], ["the mass of the body only", "কেৱল বস্তুৰ ভৰৰ"], ["the shape of the body only", "কেৱল বস্তুৰ আকৃতিৰ"], ["the colour of the liquid", "জুলীয়াৰ ৰঙৰ"]], 0,
  "The upthrust equals the weight of displaced fluid, so it depends on the immersed volume and the liquid density, not on the body's mass.",
  "উৰ্দ্ধচাপ আঁতৰোৱা জুলীয়াৰ ওজনৰ সমান, সেয়ে ই ডুবা আয়তন আৰু জুলীয়াৰ ঘনত্বৰ ওপৰত নিৰ্ভৰ, বস্তুৰ ভৰৰ ওপৰত নহয়।");

add("physics-219",
  "Water in a tank has greater pressure at the bottom than at the top because",
  "টেংকিৰ পানীৰ তলত ওপৰতকৈ বেছি চাপ কাৰণ",
  [["the depth at the bottom is greater", "তলত গভীৰতা বেছি"], ["water is denser at the bottom", "তলত পানী বেছি ঘন"], ["the bottom has more area", "তলৰ কালি বেছি"], ["gravity acts only at the bottom", "মহাকৰ্ষণ কেবল তলত ক্ৰিয়া কৰে"]], 0,
  "Pressure grows with depth, so the lower layers carry the weight of the water above them. Density and area do not change this.",
  "চাপ গভীৰতাৰ সৈতে বাঢ়ে, সেয়ে তলৰ স্তৰে ওপৰৰ পানীৰ ওজন বহন কৰে। ঘনত্ব আৰু কালিয়ে ইয়াক নসলায়।");

add("physics-220",
  "Which of the following is true about the pressure of a gas in a closed container?",
  "বন্ধ পাত্ৰত গেছেৰ চাপৰ বিষয়ে তলৰ কোনটো সঁচা",
  [["it acts equally on all the walls", "ই সকলো বেৰত সমানে ক্ৰিয়া কৰে"], ["it acts only on the bottom", "ই কেবল তলত ক্ৰিয়া কৰে"], ["it is zero at the top", "ওপৰত শূন্য"], ["it decreases with time always", "সদায় সময়ৰ সৈতে কমে"]], 0,
  "Gas molecules move freely and strike every surface, so the pressure is the same on all walls. It does not settle at the bottom.",
  "গেছৰ অণু মুক্তভাৱে চলি সকলো পৃষ্ঠত খুন্দা মাৰে, সেয়ে সকলো বেৰত চাপ একেই। ই তলত জমা নহয়।");

add("physics-221",
  "The buoyant force on a floating body is equal to",
  "ওপঙি থকা বস্তুৰ ওপৰৰ উৰ্দ্ধচাপ কিৰ সমান",
  [["the weight of the body", "বস্তুৰ ওজনৰ"], ["twice the weight of the body", "বস্তুৰ ওজনৰ দুগুণ"], ["zero", "শূন্য"], ["the volume of the body", "বস্তুৰ আয়তনৰ"]], 0,
  "A floating body is in equilibrium, so the upward buoyant force must exactly balance its weight. A sinking body has less upthrust than weight.",
  "ওপঙি থকা বস্তু সাম্যাৱস্থাত, সেয়ে ওপৰলৈ উৰ্দ্ধচাপে তাৰ ওজন ঠিক ভাৰসাম্য কৰিব লাগে। ডুবা বস্তুৰ উৰ্দ্ধচাপ ওজনতকৈ কম।");

add("physics-222",
  "A submarine dives by",
  "চাবমেৰিনে ডুব যায় কিৰে",
  [["taking in water into its ballast tanks", "তাৰ বেলাষ্ট টেংকিত পানী লৈ"], ["increasing its speed", "তাৰ গতি বঢ়াই"], ["reducing its volume", "তাৰ আয়তন কমাই"], ["heating the surrounding water", "চাৰিওফালৰ পানী গৰম কৰি"]], 0,
  "Filling the ballast tanks adds mass without much change in volume, so the average density rises above that of water and the vessel sinks.",
  "বেলাষ্ট টেংক ভৰালে আয়তন প্ৰায় একেই থাকি ভৰ বাঢ়ে, সেয়ে গড় ঘনত্ব পানীতকৈ বেছি হয় আৰু জাহাজ ডোবে।");


/* ================= heat-thermodynamics ================= */
useLeaf("heat-thermodynamics");

add("physics-223",
  "The mode of heat transfer that does not require any medium is",
  "যি তাপ সঞ্চাৰণ পদ্ধতিত কোনো মাধ্যমৰ প্ৰয়োজন নহয়",
  [["radiation", "বিকিৰণ"], ["conduction", "পৰিবহন"], ["convection", "পৰিচলন"], ["diffusion", "বিস্তাৰ"]], 0,
  "Radiation carries heat as electromagnetic waves, which travel through vacuum, so sunlight reaches us across empty space. Conduction and convection both need matter.",
  "বিকিৰণে তাপ বিদ্যুৎ-চুম্বকীয় তৰংগ হিচাপে নিয়ে, যি শূন্যৰ মাজেৰে যায়, সেয়ে সূৰ্যৰ পোহৰ আমালৈ খালী ঠাইৰ মাজেৰে আহে। পৰিবহন আৰু পৰিচলনলৈ পদাৰ্থ লাগে।");

add("physics-224",
  "Heat transfer in solids takes place mainly by",
  "কঠিন পদাৰ্থত তাপ সঞ্চাৰণ মূলতঃ কিৰে হয়",
  [["conduction", "পৰিবহন"], ["convection", "পৰিচলন"], ["radiation", "বিকিৰণ"], ["evaporation", "বাষ্পীভৱন"]], 0,
  "In a solid the particles are fixed and pass energy to neighbours without moving themselves, which is conduction. Convection needs a moving fluid.",
  "কঠিনত কণিকা স্থিৰ আৰু নিজে নলৰাকৈ ওচৰৰ কণিকালৈ শক্তি যায়, যি পৰিবহন। পৰিচলনলৈ চলাচল কৰা জুলীয়া লাগে।");

add("physics-225",
  "Convection currents in a liquid arise because",
  "জুলীয়াত পৰিচলন প্ৰবাহ ওলায় কাৰণ",
  [["warmer liquid is less dense and rises", "গৰম জুলীয়া কম ঘন আৰু ওপৰলৈ যায়"], ["liquid particles move at random", "জুলীয়াৰ কণিকা যাদৃচ্ছিকভাৱে চলে"], ["the liquid conducts electricity", "জুলীয়াই বিদ্যুৎ পৰিবহন কৰে"], ["the container is closed", "পাত্ৰ বন্ধ"]], 0,
  "Heated liquid expands, becomes less dense and rises, while cooler denser liquid sinks to take its place, setting up a circulation.",
  "গৰম জুলীয়া বিস্তৃত হৈ কম ঘন হয় আৰু ওপৰলৈ যায়, আনহাতে ঠাণ্ডা ঘন জুলীয়া তললৈ নামি তাৰ ঠাই লয়, সেয়ে সংচলন হয়।");

add("physics-226",
  "The quantity of heat needed to raise the temperature of one kilogram of a substance by one kelvin is called its",
  "পদাৰ্থ এটাৰ এক কিলোগ্ৰামৰ উষ্ণতা এক কেলভিন বঢ়াবলৈ প্ৰয়োজনীয় তাপক কি বোলা হয়",
  [["specific heat capacity", "বিশিষ্ট তাপ ধাৰকত্ব"], ["latent heat", "সুপ্ত তাপ"], ["thermal conductivity", "তাপ পৰিবাহিতা"], ["heat capacity only", "কেৱল তাপ ধাৰকত্ব"]], 0,
  "Specific heat capacity is quoted per kilogram, so it is a property of the material. Heat capacity alone refers to the whole body.",
  "বিশিষ্ট তাপ ধাৰকত্ব প্ৰতি কিলোগ্ৰামত দিয়া হয়, সেয়ে ই পদাৰ্থৰ ধৰ্ম। অকলৈ তাপ ধাৰকত্বই গোটেই বস্তুক বুজায়।");

add("physics-227",
  "Water is used as a coolant in car radiators because it has",
  "গাড়ীৰ ৰেডিয়েটৰত পানী শীতলক হিচাপে ব্যৱহৃত হয় কাৰণ ইয়াৰ",
  [["high specific heat capacity", "বিশিষ্ট তাপ ধাৰকত্ব বেছি"], ["low boiling point", "উতলাংক কম"], ["high density", "ঘনত্ব বেছি"], ["low thermal conductivity", "তাপ পৰিবাহিতা কম"]], 0,
  "Water absorbs a lot of heat for a small rise in temperature, so it carries heat away efficiently. Low conductivity would make it poor at this.",
  "পানীয়ে সৰু উষ্ণতা বৃদ্ধিত বহু তাপ শোষে, সেয়ে ই তাপ দক্ষভাৱে লৈ যায়। কম পৰিবাহিতাই ইয়াক দুৰ্বল কৰিব।");

add("physics-228",
  "The latent heat of fusion is the heat required to",
  "গলনৰ সুপ্ত তাপ সেই তাপ যি প্ৰয়োজন",
  [["change a solid into liquid at its melting point without changing temperature", "গলনাংকত উষ্ণতা নসলোৱাকৈ কঠিনক জুলীয়ালৈ সলনি কৰিবলৈ"], ["raise the temperature of a liquid", "জুলীয়াৰ উষ্ণতা বঢ়াবলৈ"], ["change a liquid into vapour", "জুলীয়াক ভাপলৈ সলনি কৰিবলৈ"], ["heat a gas at constant volume", "স্থিৰ আয়তনত গেছ গৰম কৰিবলৈ"]], 0,
  "Melting takes energy to break the solid structure, and the temperature stays at the melting point while it happens. Turning liquid to vapour is latent heat of vaporisation.",
  "গলিবলৈ কঠিন গঠন ভাঙিবলৈ শক্তি লাগে, আৰু তেতিয়া উষ্ণতা গলনাংকতে থাকে। জুলীয়াক ভাপ কৰাটো বাষ্পীভৱনৰ সুপ্ত তাপ।");

add("physics-229",
  "The first law of thermodynamics is a statement of the",
  "তাপগতি বিজ্ঞানৰ প্ৰথম সূত্ৰ কিৰ বিবৃতি",
  [["conservation of energy", "শক্তি সংৰক্ষণ"], ["conservation of mass", "ভৰ সংৰক্ষণ"], ["conservation of momentum", "ভৰবেগ সংৰক্ষণ"], ["increase of entropy only", "কেৱল এণ্ট্ৰপি বৃদ্ধি"]], 0,
  "The first law says heat added to a system either raises its internal energy or is used in doing work, so energy is conserved. The second law deals with entropy.",
  "প্ৰথম সূত্ৰই কয় যে দিয়া তাপ হয় আভ্যন্তৰীণ শক্তি বঢ়ায় নাইবা কামত খৰচ হয়, সেয়ে শক্তি সংৰক্ষিত। দ্বিতীয় সূত্ৰই এণ্ট্ৰপি চম্ভালে।");

add("physics-230",
  "A bimetallic strip bends on heating because the two metals have different",
  "গৰম কৰিলে দ্বিধাতৱীয় পটি বেঁকা হয় কাৰণ দুয়ো ধাতুৰ কি বেলেগ",
  [["coefficients of expansion", "প্ৰসাৰণ গুণাংক"], ["densities", "ঘনত্ব"], ["melting points only", "কেৱল গলনাংক"], ["colours", "ৰং"]], 0,
  "One metal expands more than the other for the same rise in temperature, so the strip curves towards the metal that expands less. This drives a thermostat.",
  "একেই উষ্ণতা বৃদ্ধিত এটা ধাতু আনটোতকৈ বেছি বিস্তৃত হয়, সেয়ে পটি কম বিস্তৃত ধাতুৰ ফালে বেঁকা হয়। এইয়া থাৰ্মষ্টেট চলায়।");

add("physics-231",
  "The transfer of heat in a vacuum flask is minimised by",
  "ভেকুৱাম ফ্লাস্কত তাপ সঞ্চাৰণ কমোৱা হয় কিৰে",
  [["a vacuum between double walls", "দুটা বেৰৰ মাজত শূন্য"], ["a thick glass wall", "ডাঙৰ কাচৰ বেৰ"], ["a metal outer case", "ধাতুৰ বাহিৰা খোলা"], ["filling it completely", "সম্পূৰ্ণ ভৰাই"]], 0,
  "The vacuum stops conduction and convection, and the silvered walls reflect radiation, so all three routes are blocked.",
  "শূন্যে পৰিবহন আৰু পৰিচলন বন্ধ কৰে, আৰু ৰূপালী বেৰে বিকিৰণ প্ৰতিফলিত কৰে, সেয়ে তিনিও পথ বন্ধ হয়।");

add("physics-232",
  "The temperature at which the reading on the Celsius and Fahrenheit scales is the same is",
  "যি উষ্ণতাত ছেলছিয়াছ আৰু ফাৰেনহাইট মাপকৰ পঢ়া একেই",
  [["minus 40 degrees", "মাইনাছ ৪০ ডিগ্ৰী"], ["0 degrees", "০ ডিগ্ৰী"], ["100 degrees", "১০০ ডিগ্ৰী"], ["32 degrees", "৩২ ডিগ্ৰী"]], 0,
  "Solving the conversion equation for equal readings gives minus forty, so both scales show the same number there.",
  "ৰূপান্তৰ সমীকৰণত দুয়ো পঢ়া সমান ধৰি সমাধান কৰিলে মাইনাছ চল্লিছ পোৱা যায়, সেয়ে তাত দুয়ো মাপকে একেই সংখ্যা দেখুৱায়।");

add("physics-233",
  "The process by which heat is transferred in a liquid by the actual movement of the liquid is called",
  "জুলীয়াৰ প্ৰকৃত চলাচলেৰে তাপ সঞ্চাৰিত হোৱা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["convection", "পৰিচলন"], ["conduction", "পৰিবহন"], ["radiation", "বিকিৰণ"], ["sublimation", "উৎপতন"]], 0,
  "Convection moves the heated fluid itself, carrying energy with it. Conduction passes energy between neighbouring particles without bulk movement.",
  "পৰিচলনে গৰম জুলীয়াক নিজেই লৰায় আৰু শক্তি লগত নিয়ে। পৰিবহনে ওচৰৰ কণিকাৰ মাজেৰে শক্তি যায়, গোটেই পদাৰ্থ নলৰে।");

add("physics-234",
  "One kilocalorie is equal to about",
  "এক কিল'কেলৰি প্ৰায় কিৰ সমান",
  [["4186 joule", "৪১৮৬ জুল"], ["1000 joule", "১০০০ জুল"], ["4.186 joule", "৪.১৮৬ জুল"], ["100 joule", "১০০ জুল"]], 0,
  "One kilocalorie, the heat needed to raise one kilogram of water by one degree, is about four thousand one hundred and eighty-six joule.",
  "এক কিল'কেলৰি, এক কিলোগ্ৰাম পানী এক ডিগ্ৰী বঢ়োৱা তাপ, প্ৰায় চাৰি হাজাৰ এশ ছয়াষ্টৰ জুল।");

add("physics-235",
  "The expansion of a metal on heating is used in",
  "গৰম কৰিলে ধাতু বিস্তৃত হোৱা কিৰ কামত ব্যৱহৃত হয়",
  [["a thermostat", "থাৰ্মষ্টেট"], ["a barometer", "বেৰ'মিটাৰ"], ["an ammeter", "এমিটাৰ"], ["a hydrometer", "হাইড্ৰ'মিটাৰ"]], 0,
  "A bimetallic strip in a thermostat bends as it warms and breaks the circuit, keeping the temperature steady. The others measure pressure or current.",
  "থাৰ্মষ্টেটত দ্বিধাতৱীয় পটিয়ে গৰম হ'লে বেঁকা হৈ বৰ্তনী ভাঙে, উষ্ণতা স্থিৰ ৰাখে। বাকীবোৰে চাপ বা প্ৰবাহ জোখে।");

add("physics-236",
  "Water boils at a lower temperature on a hill top because",
  "পাহাৰৰ ওপৰত পানী কম উষ্ণতাত উতলে কাৰণ",
  [["atmospheric pressure is lower there", "তাত বায়ুমণ্ডলীয় চাপ কম"], ["water is purer there", "তাত পানী বেছি বিশুদ্ধ"], ["gravity is stronger there", "তাত মহাকৰ্ষণ বেছি"], ["the air is colder there", "তাত বায়ু ঠাণ্ডা"]], 0,
  "Boiling happens when vapour pressure equals atmospheric pressure, and at height the pressure is lower, so boiling starts sooner.",
  "ভাপৰ চাপ বায়ুমণ্ডলীয় চাপৰ সমান হ'লে উতলে, আৰু ওপৰত চাপ কম, সেয়ে উতলিবলৈ কম উষ্ণতা লাগে।");

add("physics-237",
  "The unit in which the heat energy of a body is usually expressed in the laboratory is the",
  "পৰীক্ষাগাৰত বস্তুৰ তাপ শক্তি সাধাৰণতে যি এককত প্ৰকাশ কৰা হয়",
  [["joule", "জুল"], ["newton", "নিউটন"], ["watt", "ৱাট"], ["pascal", "পাস্কেল"]], 0,
  "Heat is a form of energy, so the joule is the SI unit. The older calorie is still met in problems but joule is the standard.",
  "তাপ শক্তিৰ এক ৰূপ, সেয়ে জুল SI একক। পুৰণি কেলৰি সমস্যাত পোৱা যায় কিন্তু জুলেই প্ৰামাণ্য।");

add("physics-238",
  "An isothermal process is one in which the",
  "সমোষ্ণ প্ৰক্ৰিয়া এনে এটা প্ৰক্ৰিয়া য'ত",
  [["temperature remains constant", "উষ্ণতা স্থিৰ থাকে"], ["pressure remains constant", "চাপ স্থিৰ থাকে"], ["volume remains constant", "আয়তন স্থিৰ থাকে"], ["heat is zero", "তাপ শূন্য"]], 0,
  "Isothermal means constant temperature, isobaric constant pressure and isochoric constant volume. The three terms are easily confused.",
  "সমোষ্ণ মানে স্থিৰ উষ্ণতা, সমচাপীয়ে স্থিৰ চাপ আৰু সমআয়তনীয়ে স্থিৰ আয়তন। তিনিওটা শব্দ সহজে মিলাই পেলোৱা যায়।");

add("physics-239",
  "Which of the following is a good conductor of heat?",
  "তলৰ কোনটো তাপৰ ভাল পৰিবাহী",
  [["copper", "তাম"], ["wood", "কাঠ"], ["air", "বায়ু"], ["plastic", "প্লাষ্টিক"]], 0,
  "Metals have free electrons that carry energy quickly, and copper is among the best. Wood, air and plastic are insulators.",
  "ধাতুত মুক্ত ইলেক্ট্ৰন থাকে যি শক্তি দ্ৰুত নিয়ে, আৰু তাম আটাই ভাল। কাঠ, বায়ু আৰু প্লাষ্টিক অন্তৰোধক।");

add("physics-240",
  "Cooking utensils are given wooden or plastic handles because these materials are",
  "ৰন্ধন পাত্ৰত কাঠ বা প্লাষ্টিকৰ হাতল দিয়া হয় কাৰণ এই পদাৰ্থবোৰ",
  [["poor conductors of heat", "তাপৰ দুৰ্বল পৰিবাহী"], ["good conductors of heat", "তাপৰ ভাল পৰিবাহী"], ["cheap only", "কেৱল সস্তা"], ["stronger than metal", "ধাতুতকৈ শক্তিশালী"]], 0,
  "A poor conductor slows the heat reaching your hand, so you can hold the pan. A metal handle would soon be too hot.",
  "দুৰ্বল পৰিবাহীয়ে হাতলৈ অহা তাপ লেহেম কৰে, সেয়ে পাত্ৰ ধৰিব পাৰি। ধাতুৰ হাতল সোনকালে অতি গৰম হ'ব।");

add("physics-241",
  "The second law of thermodynamics implies that heat flows spontaneously from",
  "তাপগতি বিজ্ঞানৰ দ্বিতীয় সূত্ৰই বুজায় যে তাপ নিজে নিজে যায়",
  [["a hotter body to a colder body", "গৰম বস্তুৰপৰা ঠাণ্ডা বস্তুলৈ"], ["a colder body to a hotter body", "ঠাণ্ডা বস্তুৰপৰা গৰম বস্তুলৈ"], ["a solid to a gas only", "কেৱল কঠিনৰপৰা গেছলৈ"], ["any body to a vacuum only", "কেৱল যিকোনো বস্তুৰপৰা শূন্যলৈ"]], 0,
  "Heat flows on its own only from hot to cold, and the reverse needs a refrigerator doing work. This is why engines cannot be perfectly efficient.",
  "তাপ নিজে নিজে কেবল গৰমৰপৰা ঠাণ্ডালৈ যায়, ওলোটাৰ বাবে কাম কৰা ফ্ৰিজ লাগে। সেয়ে ইঞ্জিন সম্পূৰ্ণ দক্ষ হ'ব নোৱাৰে।");

add("physics-242",
  "Black surfaces are better absorbers of heat than white surfaces because they",
  "ক'লা পৃষ্ঠ বগাতকৈ তাপ ভাল শোষে কাৰণ সেইবোৰে",
  [["absorb more radiation", "বেছি বিকিৰণ শোষে"], ["conduct more heat", "বেছি তাপ পৰিবহন কৰে"], ["convect more heat", "বেছি তাপ পৰিচলন কৰে"], ["have higher density", "ঘনত্ব বেছি"]], 0,
  "A black surface absorbs almost all the radiation falling on it, which is why solar cookers and water heaters are painted black.",
  "ক'লা পৃষ্ঠত পৰা প্ৰায় সকলো বিকিৰণ শোষে, সেয়ে সৌৰ চুলা আৰু পানী গৰম কৰা যন্ত্ৰ ক'লাকৈ ৰঙা হয়।");

add("physics-243",
  "The heat required to change one kilogram of a liquid into vapour at its boiling point is called the latent heat of",
  "উতলাংকত এক কিলোগ্ৰাম জুলীয়াক ভাপলৈ সলনি কৰিবলৈ প্ৰয়োজনীয় তাপক কি সুপ্ত তাপ বোলা হয়",
  [["vaporisation", "বাষ্পীভৱন"], ["fusion", "গলন"], ["sublimation", "উৎপতন"], ["conduction", "পৰিবহন"]], 0,
  "Vaporisation takes a large amount of energy to separate the molecules completely, which is why steam holds so much heat.",
  "বাষ্পীভৱনে অণুবোৰ সম্পূৰ্ণ পৃথক কৰিবলৈ বহু শক্তি লয়, সেয়ে ভাপে ইমান তাপ ধৰি ৰাখে।");

add("physics-244",
  "When a gas is compressed rapidly it becomes hot because",
  "গেছ দ্ৰুতভাৱে সংকুচিত কৰিলে গৰম হয় কাৰণ",
  [["work done on the gas raises its internal energy", "গেছত কৰা কামে আভ্যন্তৰীণ শক্তি বঢ়ায়"], ["the gas loses heat", "গেছে তাপ হেৰুৱায়"], ["its mass increases", "তাৰ ভৰ বাঢ়ে"], ["its density falls", "তাৰ ঘনত্ব কমে"]], 0,
  "Compression does work on the gas, and with little time for heat to escape that work appears as internal energy and a higher temperature.",
  "সংকোচনে গেছত কাম কৰে, আৰু তাপ ওলোৱাৰ সময় কম হোৱা বাবে সেই কাম আভ্যন্তৰীণ শক্তি আৰু বেছি উষ্ণতা হিচাপে দেখা দিয়ে।");

add("physics-245",
  "The normal temperature of the human body on the Celsius scale is about",
  "ছেলছিয়াছ মাপকত মানুহৰ শৰীৰৰ স্বাভাৱিক উষ্ণতা প্ৰায়",
  [["37 degrees", "৩৭ ডিগ্ৰী"], ["98 degrees", "৯৮ ডিগ্ৰী"], ["27 degrees", "২৭ ডিগ্ৰী"], ["47 degrees", "৪৭ ডিগ্ৰী"]], 0,
  "Normal body temperature is about thirty-seven degrees Celsius, which corresponds to about ninety-eight point six Fahrenheit.",
  "স্বাভাৱিক শৰীৰ উষ্ণতা প্ৰায় সাঁইত্ৰিছ ডিগ্ৰী ছেলছিয়াছ, যি প্ৰায় আঠানব্বৈ দশমিক ছয় ফাৰেনহাইট।");

/* ================= gravitation ================= */
useLeaf("gravitation");

add("physics-246",
  "The universal law of gravitation states that the force between two bodies is directly proportional to",
  "সৰ্বজনীন মহাকৰ্ষণ সূত্ৰই কয় যে দুটা বস্তুৰ মাজৰ বল সমানুপাতী",
  [["the product of their masses", "তেওঁলোকৰ ভৰৰ গুণফলৰ"], ["the sum of their masses", "তেওঁলোকৰ ভৰৰ যোগফলৰ"], ["the difference of their masses", "তেওঁলোকৰ ভৰৰ পাৰ্থক্যৰ"], ["the square of the distance", "দূৰত্বৰ বৰ্গৰ"]], 0,
  "The force grows with the product of the two masses and falls with the square of the distance between them, which is the inverse square law.",
  "বলে দুয়ো ভৰৰ গুণফলৰ সৈতে বাঢ়ে আৰু দূৰত্বৰ বৰ্গৰ সৈতে কমে, যি বৰ্গ-ব্যস্তানুপাত সূত্ৰ।");

add("physics-247",
  "The value of acceleration due to gravity on the Moon is about",
  "চন্দ্ৰত মহাকৰ্ষণজনিত ত্বৰণৰ মান প্ৰায়",
  [["one sixth of that on the Earth", "পৃথিৱীৰ ছয় ভাগৰ এক ভাগ"], ["equal to that on the Earth", "পৃথিৱীৰ সমান"], ["six times that on the Earth", "পৃথিৱীৰ ছয় গুণ"], ["zero", "শূন্য"]], 0,
  "The Moon has much less mass and a smaller radius, so g there is about 1.6 against 9.8 on the Earth, roughly one sixth.",
  "চন্দ্ৰৰ ভৰ বহু কম আৰু ব্যাসাৰ্ধ সৰু, সেয়ে তাত g প্ৰায় ১.৬ আৰু পৃথিৱীত ৯.৮, প্ৰায় ছয় ভাগৰ এক ভাগ।");

add("physics-248",
  "A body taken to the Moon from the Earth has the same",
  "পৃথিৱীৰপৰা চন্দ্ৰলৈ নিয়া বস্তুৰ একেই থাকে",
  [["mass", "ভৰ"], ["weight", "ওজন"], ["acceleration due to gravity", "মহাকৰ্ষণজনিত ত্বৰণ"], ["falling speed", "পতনৰ গতি"]], 0,
  "Mass is the amount of matter and does not change with location, but weight depends on g and drops to about one sixth.",
  "ভৰ পদাৰ্থৰ পৰিমাণ আৰু ঠাইৰ সৈতে নসলায়, কিন্তু ওজন g ৰ ওপৰত নিৰ্ভৰ কৰি প্ৰায় ছয় ভাগৰ এক ভাগ হয়।");

add("physics-249",
  "The escape velocity from the Earth is about",
  "পৃথিৱীৰপৰা মুক্তি বেগ প্ৰায়",
  [["11.2 kilometres per second", "১১.২ কিলোমিটাৰ প্ৰতি ছেকেণ্ড"], ["9.8 metres per second", "৯.৮ মিটাৰ প্ৰতি ছেকেণ্ড"], ["7.9 metres per second", "৭.৯ মিটাৰ প্ৰতি ছেকেণ্ড"], ["3 times ten to the eight metres per second", "৩ গুণ দহৰ ঘাত আঠ মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "A body must be given about eleven point two kilometres per second to break free of the Earth's gravity. That is far beyond any ordinary speed.",
  "বস্তু এটাই পৃথিৱীৰ মহাকৰ্ষণ এৰিবলৈ প্ৰায় এঘাৰ দশমিক দুই কিলোমিটাৰ প্ৰতি ছেকেণ্ড বেগ পাব লাগে। যি সাধাৰণ গতিৰ বহু ওপৰত।");

add("physics-250",
  "A geostationary satellite appears stationary because it",
  "ভূ-স্থিৰ উপগ্ৰহ স্থিৰ দেখা যায় কাৰণ ই",
  [["completes one orbit in twenty-four hours", "চৌৱিছ ঘণ্টাত এটা কক্ষপথ পূৰ্ণ কৰে"], ["moves faster than the Earth turns", "পৃথিৱী ঘূৰাতকৈ দ্ৰুত চলে"], ["stays exactly above the poles", "ঠিক মেৰুৰ ওপৰত থাকে"], ["has no mass", "ভৰ নাই"]], 0,
  "Its period matches the Earth's rotation, so it stays over the same point of the equator. A satellite over the poles cannot be geostationary.",
  "তাৰ কাল পৃথিৱীৰ ঘূৰ্ণনৰ সৈতে মিলে, সেয়ে ই বিষুৱৰেখাৰ একেই বিন্দুৰ ওপৰত থাকে। মেৰুৰ ওপৰৰ উপগ্ৰহ ভূ-স্থিৰ হ'ব নোৱাৰে।");

add("physics-251",
  "The gravitational force between two bodies is called a central force because it acts",
  "দুটা বস্তুৰ মাজৰ মহাকৰ্ষণ বলক কেন্দ্ৰী বল বোলা হয় কাৰণ ই ক্ৰিয়া কৰে",
  [["along the line joining their centres", "তেওঁলোকৰ কেন্দ্ৰ সংযোগী ৰেখাৰে"], ["perpendicular to the line joining their centres", "কেন্দ্ৰ সংযোগী ৰেখাৰ লম্বভাৱে"], ["only upwards", "কেৱল ওপৰলৈ"], ["only along the surface", "কেৱল পৃষ্ঠৰে"]], 0,
  "The force acts along the line joining the two centres, which is what makes it a central force. It is always attractive.",
  "বলে দুয়ো কেন্দ্ৰ সংযোগী ৰেখাৰে ক্ৰিয়া কৰে, সেয়ে ই কেন্দ্ৰী বল। ই সদায় আকৰ্ষণশীল।");

add("physics-252",
  "If the distance between two bodies is doubled, the gravitational force becomes",
  "দুটা বস্তুৰ মাজৰ দূৰত্ব দুগুণ কৰিলে মহাকৰ্ষণ বল হয়",
  [["one fourth", "চাৰি ভাগৰ এক ভাগ"], ["half", "আধা"], ["double", "দুগুণ"], ["four times", "চাৰিগুণ"]], 0,
  "Force varies as the inverse square of distance, so doubling the distance cuts it to one fourth. Halving the distance would make it four times.",
  "বল দূৰত্বৰ বৰ্গৰ ব্যস্তানুপাতে থাকে, সেয়ে দূৰত্ব দুগুণ কৰিলে চাৰি ভাগৰ এক ভাগ হয়। আধা কৰিলে চাৰিগুণ হ'ব।");

add("physics-253",
  "The weight of a body at the centre of the Earth would be",
  "পৃথিৱীৰ কেন্দ্ৰত বস্তু এটাৰ ওজন হ'ব",
  [["zero", "শূন্য"], ["maximum", "সৰ্বোচ্চ"], ["equal to its mass", "তাৰ ভৰৰ সমান"], ["infinite", "অসীম"]], 0,
  "At the centre the pull from all directions cancels, so g is zero and the weight is zero, although the mass is unchanged.",
  "কেন্দ্ৰত সকলো দিশৰ পৰা টান বাতিল হয়, সেয়ে g শূন্য আৰু ওজন শূন্য, যদিও ভৰ অপৰিৱৰ্তিত।");

add("physics-254",
  "The force that keeps the planets moving around the Sun is",
  "গ্ৰহবোৰক সূৰ্যৰ চাৰিওফালে ঘূৰাই ৰখা বলটো",
  [["gravitational force", "মহাকৰ্ষণ বল"], ["centrifugal force only", "কেৱল কেন্দ্ৰবিমুখী বল"], ["magnetic force", "চুম্বকীয় বল"], ["electric force", "বৈদ্যুতিক বল"]], 0,
  "The Sun's gravity provides the centripetal pull that bends each planet's path into an orbit. Magnetism is far too weak over these distances.",
  "সূৰ্যৰ মহাকৰ্ষণে কেন্দ্ৰমুখী টান দিয়ে যি প্ৰতিটো গ্ৰহৰ পথ কক্ষপথলৈ বেঁকা কৰে। এই দূৰত্বত চুম্বকত্ব বহু দুৰ্বল।");

add("physics-255",
  "The acceleration due to gravity does not depend on",
  "মহাকৰ্ষণজনিত ত্বৰণ কিৰ ওপৰত নিৰ্ভৰ নকৰে",
  [["the mass of the falling body", "পতনশীল বস্তুৰ ভৰৰ"], ["the mass of the Earth", "পৃথিৱীৰ ভৰৰ"], ["the radius of the Earth", "পৃথিৱীৰ ব্যাসাৰ্ধৰ"], ["the gravitational constant", "মহাকৰ্ষণ ধ্ৰুৱকৰ"]], 0,
  "All bodies fall with the same acceleration because the greater force on a heavier body is exactly offset by its greater inertia. This is why a feather and a coin fall alike in vacuum.",
  "সকলো বস্তু একেই ত্বৰণেৰে পৰে কাৰণ গধুৰ বস্তুৰ ওপৰত বেছি বল তাৰ বেছি জড়তাই ঠিক পূৰণ কৰে। সেয়ে শূন্যত পাখি আৰু মুদ্ৰা একেই পৰে।");

add("physics-256",
  "The gravitational constant G has the value",
  "মহাকৰ্ষণ ধ্ৰুৱক G ৰ মান",
  [["6.67 times ten to the power minus eleven", "৬.৬৭ গুণ দহৰ ঘাত মাইনাছ এঘাৰ"], ["9.8", "৯.৮"], ["6.02 times ten to the power twenty-three", "৬.০২ গুণ দহৰ ঘাত তেইছ"], ["3 times ten to the power eight", "৩ গুণ দহৰ ঘাত আঠ"]], 0,
  "G is about six point six seven times ten to the power minus eleven in SI units, measured by Cavendish. The value 9.8 is g, not G.",
  "G প্ৰায় ছয় দশমিক ছয় সাত গুণ দহৰ ঘাত মাইনাছ এঘাৰ SI এককত, কেভেণ্ডিছে জুখিছিল। ৯.৮ হ'ল g, G নহয়।");

add("physics-257",
  "The weight of a body of mass 10 kg on the Earth is about",
  "পৃথিৱীত ১০ কিলোগ্ৰাম ভৰৰ বস্তুৰ ওজন প্ৰায়",
  [["98 newton", "৯৮ নিউটন"], ["10 newton", "১০ নিউটন"], ["9.8 newton", "৯.৮ নিউটন"], ["980 newton", "৯৮০ নিউটন"]], 0,
  "Weight is mass times g, so ten times nine point eight gives ninety-eight newton. Ten newton would be the weight of about one kilogram.",
  "ওজন ভৰ গুণ g, সেয়ে দহ গুণ ন দশমিক আঠ = আঠানব্বৈ নিউটন। দহ নিউটন প্ৰায় এক কিলোগ্ৰামৰ ওজন।");

add("physics-258",
  "Kepler's first law states that the orbit of a planet around the Sun is",
  "কেপলাৰৰ প্ৰথম সূত্ৰই কয় যে সূৰ্যৰ চাৰিওফালে গ্ৰহৰ কক্ষপথ",
  [["an ellipse with the Sun at one focus", "উপবৃত্ত যিৰ এটা নাভিত সূৰ্য"], ["a perfect circle with the Sun at the centre", "নিখুঁত বৃত্ত যিৰ কেন্দ্ৰত সূৰ্য"], ["a straight line", "সৰল ৰেখা"], ["a parabola always", "সদায় পেৰাব'লা"]], 0,
  "Planetary orbits are ellipses with the Sun at one focus, so the distance from the Sun changes through the year. A circle is a special case.",
  "গ্ৰহৰ কক্ষপথ উপবৃত্ত যিৰ এটা নাভিত সূৰ্য, সেয়ে বছৰজুৰি সূৰ্যৰপৰা দূৰত্ব সলনি হয়। বৃত্ত এটা বিশেষ ক্ষেত্ৰ।");

add("physics-259",
  "The time period of a satellite close to the Earth's surface is about",
  "পৃথিৱীৰ পৃষ্ঠৰ ওচৰত উপগ্ৰহ এটাৰ কাল প্ৰায়",
  [["84 minutes", "৮৪ মিনিট"], ["24 hours", "২৪ ঘণ্টা"], ["1 hour", "১ ঘণ্টা"], ["365 days", "৩৬৫ দিন"]], 0,
  "A low orbit satellite circles the Earth in roughly eighty-four minutes. Twenty-four hours is the period of a geostationary orbit, far higher up.",
  "নিম্ন কক্ষপথৰ উপগ্ৰহই প্ৰায় চৌৰাশি মিনিটত পৃথিৱী প্ৰদক্ষিণ কৰে। চৌৱিছ ঘণ্টা ভূ-স্থিৰ কক্ষপথৰ কাল, যি বহু ওপৰত।");

add("physics-260",
  "Weight is a",
  "ওজন এটা",
  [["vector quantity measured in newton", "সদিশ ৰাশি যি নিউটনত জোখা হয়"], ["scalar quantity measured in kilogram", "অদিশ ৰাশি যি কিলোগ্ৰামত জোখা হয়"], ["scalar quantity measured in newton", "অদিশ ৰাশি যি নিউটনত জোখা হয়"], ["vector quantity measured in kilogram", "সদিশ ৰাশি যি কিলোগ্ৰামত জোখা হয়"]], 0,
  "Weight is a force, so it has direction and is measured in newton. Mass is a scalar measured in kilogram.",
  "ওজন এটা বল, সেয়ে ইয়াৰ দিশ আছে আৰু নিউটনত জোখা হয়। ভৰ অদিশ ৰাশি আৰু কিলোগ্ৰামত জোখা হয়।");

add("physics-261",
  "The atmosphere is held close to the Earth by",
  "বায়ুমণ্ডল পৃথিৱীৰ ওচৰত ধৰি ৰখা হয় কিৰে",
  [["gravitational attraction", "মহাকৰ্ষণ আকৰ্ষণেৰে"], ["magnetic force", "চুম্বকীয় বলেৰে"], ["air pressure", "বায়ুৰ চাপেৰে"], ["rotation of the Earth", "পৃথিৱীৰ ঘূৰ্ণনেৰে"]], 0,
  "Each gas molecule is pulled towards the Earth's centre, so the atmosphere stays bound to the planet instead of drifting into space.",
  "প্ৰতিটো গেছৰ অণু পৃথিৱীৰ কেন্দ্ৰলৈ টানি হয়, সেয়ে বায়ুমণ্ডল মহাকাশলৈ নগৈ গ্ৰহতেই বন্ধা থাকে।");

add("physics-262",
  "Two bodies attract each other with equal and opposite forces. This follows from",
  "দুটা বস্তুৱে সমান আৰু বিপৰীত বলেৰে পৰস্পৰক আকৰ্ষণ কৰে। এইয়া কিৰপৰা হয়",
  [["Newton's third law", "নিউটনৰ তৃতীয় সূত্ৰৰপৰা"], ["Newton's first law", "নিউটনৰ প্ৰথম সূত্ৰৰপৰা"], ["the law of conservation of energy", "শক্তি সংৰক্ষণ সূত্ৰৰপৰা"], ["Pascal's law", "পাস্কেলৰ সূত্ৰৰপৰা"]], 0,
  "Every action has an equal and opposite reaction, so the pull of A on B equals the pull of B on A. The accelerations differ because the masses differ.",
  "প্ৰতিটো ক্ৰিয়াৰ সমান আৰু বিপৰীত প্ৰতিক্ৰিয়া, সেয়ে A ৰ টান B ত আৰু B ৰ টান A ত সমান। ভৰ বেলেগ হোৱা বাবে ত্বৰণ বেলেগ।");

add("physics-263",
  "The value of g decreases as we go",
  "আমি ক'লৈ গ'লে g ৰ মান কমে",
  [["above the Earth's surface", "পৃথিৱীৰ পৃষ্ঠৰ ওপৰলৈ"], ["towards the Earth's centre only", "কেৱল পৃথিৱীৰ কেন্দ্ৰলৈ"], ["along the equator", "বিষুৱৰেখাৰে"], ["towards the poles", "মেৰুলৈ"]], 0,
  "Above the surface g falls with the square of the distance from the centre. Below the surface it also falls, but that is a separate case.",
  "পৃষ্ঠৰ ওপৰত g কেন্দ্ৰৰপৰা দূৰত্বৰ বৰ্গৰ সৈতে কমে। পৃষ্ঠৰ তলতো কমে, কিন্তু সেয়া বেলেগ ক্ষেত্ৰ।");

add("physics-264",
  "An astronaut in an orbiting spacecraft feels weightless because",
  "কক্ষপথত থকা মহাকাশযানত মহাকাশচাৰীয়ে ওজনহীন অনুভৱ কৰে কাৰণ",
  [["the spacecraft and astronaut fall together at the same rate", "মহাকাশযান আৰু মহাকাশচাৰী একেই হাৰত পৰে"], ["there is no gravity in space", "মহাকাশত মহাকৰ্ষণ নাই"], ["gravity is balanced by magnetism", "মহাকৰ্ষণ চুম্বকত্বই ভাৰসাম্য কৰে"], ["the astronaut has no mass", "মহাকাশচাৰীৰ ভৰ নাই"]], 0,
  "Both are in free fall around the Earth, so nothing presses them together and the normal reaction is zero. Gravity is still acting strongly.",
  "দুয়োটা পৃথিৱীৰ চাৰিওফালে মুক্ত পতনত, সেয়ে একোৱে হেঁচা নিদিয়ে আৰু অভিলম্ব প্ৰতিক্ৰিয়া শূন্য। মহাকৰ্ষণ তথাপিও বৰকৈ ক্ৰিয়া কৰি আছে।");

add("physics-265",
  "The mass of a body is a measure of its",
  "বস্তু এটাৰ ভৰ তাৰ কিৰ জোখ",
  [["inertia", "জড়তাৰ"], ["weight", "ওজনৰ"], ["volume", "আয়তনৰ"], ["density", "ঘনত্বৰ"]], 0,
  "Mass tells how strongly a body resists a change in its state of motion, which is inertia. Weight depends on g and is a force.",
  "ভৰে বস্তুৱে গতিৰ অৱস্থা সলনি কৰাৰ প্ৰতিৰোধ কিমান বেছি দেখুৱায়, যি জড়তা। ওজন g ৰ ওপৰত নিৰ্ভৰ কৰা বল।");

add("physics-266",
  "The gravitational force between two one kilogram bodies placed one metre apart is about",
  "এক মিটাৰ দূৰত্বত ৰখা এক কিলোগ্ৰামৰ দুটা বস্তুৰ মাজৰ মহাকৰ্ষণ বল প্ৰায়",
  [["6.67 times ten to the power minus eleven newton", "৬.৬৭ গুণ দহৰ ঘাত মাইনাছ এঘাৰ নিউটন"], ["9.8 newton", "৯.৮ নিউটন"], ["1 newton", "১ নিউটন"], ["6.67 newton", "৬.৬৭ নিউটন"]], 0,
  "Substituting both masses as one kilogram and distance as one metre gives G itself, which is tiny. That is why we do not notice the pull between everyday objects.",
  "দুয়ো ভৰ এক কিলোগ্ৰাম আৰু দূৰত্ব এক মিটাৰ দিলে G নিজেই পোৱা যায়, যি অতি সৰু। সেয়ে দৈনন্দিন বস্তুৰ মাজৰ টান আমি নুবুজোঁ।");

add("physics-267",
  "A body weighs more at the poles than at the equator because",
  "বিষুৱৰেখাতকৈ মেৰুত বস্তুৰ ওজন বেছি কাৰণ",
  [["the Earth is flattened at the poles and spins about its axis", "পৃথিৱী মেৰুত চেপেটা আৰু অক্ষত ঘূৰে"], ["the poles are colder", "মেৰু ঠাণ্ডা"], ["the air is thinner at the poles", "মেৰুত বায়ু পাতল"], ["gravity acts only at the poles", "মহাকৰ্ষণ কেবল মেৰুত ক্ৰিয়া কৰে"]], 0,
  "The polar radius is smaller, so g is larger, and the spin gives a small outward effect at the equator that further reduces the effective weight there.",
  "মেৰুৰ ব্যাসাৰ্ধ সৰু, সেয়ে g ডাঙৰ, আৰু ঘূৰ্ণনে বিষুৱৰেখাত সৰু বাহিৰমুখী প্ৰভাৱ দি প্ৰভাৱী ওজন আৰু কমায়।");

/* ================= motion-force ================= */
useLeaf("motion-force");

add("physics-268",
  "The rate of change of velocity of a body is called its",
  "বস্তু এটাৰ বেগ পৰিৱৰ্তনৰ হাৰক কি বোলা হয়",
  [["acceleration", "ত্বৰণ"], ["momentum", "ভৰবেগ"], ["displacement", "সৰণ"], ["inertia", "জড়তা"]], 0,
  "Acceleration is velocity change per unit time, so a car going from rest to twenty metres per second in four seconds has an acceleration of five.",
  "ত্বৰণ প্ৰতি একক সময়ত বেগৰ পৰিৱৰ্তন, সেয়ে চাৰি ছেকেণ্ডত শূন্যৰপৰা বিছ মিটাৰ প্ৰতি ছেকেণ্ডলৈ যোৱা গাড়ীৰ ত্বৰণ পাঁচ।");

add("physics-269",
  "A body moving with constant speed in a circle has",
  "বৃত্তত স্থিৰ দ্ৰুতিৰে চলা বস্তুৰ",
  [["changing velocity", "পৰিৱৰ্তনশীল বেগ"], ["zero acceleration", "শূন্য ত্বৰণ"], ["constant velocity", "স্থিৰ বেগ"], ["no force on it", "তাৰ ওপৰত বল নাই"]], 0,
  "The direction changes all the time, so the velocity changes even though the speed does not, which means there is a centripetal acceleration.",
  "দিশ সদায় সলনি হয়, সেয়ে দ্ৰুতি নসলনিও বেগ সলনি হয়, যাৰ অৰ্থ কেন্দ্ৰমুখী ত্বৰণ আছে।");

add("physics-270",
  "The SI unit of acceleration is",
  "ত্বৰণৰ SI একক",
  [["metre per second squared", "মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["metre per second", "মিটাৰ প্ৰতি ছেকেণ্ড"], ["newton", "নিউটন"], ["kilogram", "কিলোগ্ৰাম"]], 0,
  "Acceleration is velocity divided by time, so its unit is metres per second divided by second, that is metres per second squared.",
  "ত্বৰণ বেগ ভাগ সময়, সেয়ে একক মিটাৰ প্ৰতি ছেকেণ্ড ভাগ ছেকেণ্ড, অৰ্থাৎ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ।");

add("physics-271",
  "A body is said to be in uniform motion when it covers",
  "বস্তু এটা সুষম গতিত আছে বোলা হয় যেতিয়া ই অতিক্ৰম কৰে",
  [["equal distances in equal intervals of time", "সমান সময় অন্তৰালত সমান দূৰত্ব"], ["increasing distances in equal intervals", "সমান অন্তৰালত বঢ়ি থকা দূৰত্ব"], ["any distance in any time", "যিকোনো সময়ত যিকোনো দূৰত্ব"], ["no distance at all", "একেবাৰে দূৰত্ব নাই"]], 0,
  "Uniform motion means the speed stays the same, so each second covers the same distance. A body at rest is a special case with zero speed.",
  "সুষম গতি মানে দ্ৰুতি একেই থকা, সেয়ে প্ৰতি ছেকেণ্ডত একেই দূৰত্ব যায়। স্থিৰ বস্তু শূন্য দ্ৰুতিৰ বিশেষ ক্ষেত্ৰ।");

add("physics-272",
  "A car starts from rest and reaches a speed of 20 metres per second in 4 seconds. Its acceleration is",
  "গাড়ী এখনে স্থিৰ অৱস্থাৰপৰা আৰম্ভ কৰি ৪ ছেকেণ্ডত ২০ মিটাৰ প্ৰতি ছেকেণ্ড বেগ পায়। তাৰ ত্বৰণ",
  [["5 metres per second squared", "৫ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["80 metres per second squared", "৮০ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["0.2 metres per second squared", "০.২ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["24 metres per second squared", "২৪ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"]], 0,
  "Acceleration is the change in speed divided by the time taken, so twenty divided by four gives five. Multiplying the two would give eighty.",
  "ত্বৰণ দ্ৰুতিৰ পৰিৱৰ্তন ভাগ লোৱা সময়, সেয়ে বিছ ভাগ চাৰি = পাঁচ। দুয়োটা পূৰণ কৰিলে আশী হ'ল হেতেন।");

add("physics-273",
  "The momentum of a body of mass 2 kg moving at 3 metres per second is",
  "৩ মিটাৰ প্ৰতি ছেকেণ্ডে চলা ২ কিলোগ্ৰাম ভৰৰ বস্তুৰ ভৰবেগ",
  [["6 kilogram metre per second", "৬ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["1.5 kilogram metre per second", "১.৫ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["5 kilogram metre per second", "৫ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["0.67 kilogram metre per second", "০.৬৭ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Momentum is mass times velocity, so two times three gives six. Dividing instead would give the wrong 0.67.",
  "ভৰবেগ ভৰ গুণ বেগ, সেয়ে দুই গুণ তিনি = ছয়। ভাগ কৰিলে ভুলকৈ ০.৬৭ হয়।");

add("physics-274",
  "A force of 10 N acts on a mass of 2 kg. The acceleration produced is",
  "২ কিলোগ্ৰাম ভৰত ১০ নিউটন বলে ক্ৰিয়া কৰে। সৃষ্টি হোৱা ত্বৰণ",
  [["5 metres per second squared", "৫ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["20 metres per second squared", "২০ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["0.2 metres per second squared", "০.২ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["12 metres per second squared", "১২ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"]], 0,
  "Newton's second law gives force equal to mass times acceleration, so acceleration is ten divided by two, that is five.",
  "নিউটনৰ দ্বিতীয় সূত্ৰে বল = ভৰ গুণ ত্বৰণ, সেয়ে ত্বৰণ দহ ভাগ দুই = পাঁচ।");

add("physics-275",
  "Which of the following is a contact force?",
  "তলৰ কোনটো স্পৰ্শ বল",
  [["friction", "ঘৰ্ষণ"], ["gravity", "মহাকৰ্ষণ"], ["magnetic force", "চুম্বকীয় বল"], ["electric force", "বৈদ্যুতিক বল"]], 0,
  "Friction needs the surfaces to touch, so it is a contact force. Gravity and the electric and magnetic forces act across empty space.",
  "ঘৰ্ষণলৈ পৃষ্ঠ স্পৰ্শ কৰিব লাগে, সেয়ে ই স্পৰ্শ বল। মহাকৰ্ষণ আৰু বৈদ্যুতিক তথা চুম্বকীয় বলে খালী ঠাইৰ মাজেৰে ক্ৰিয়া কৰে।");

add("physics-276",
  "The tendency of a body to resist any change in its state of rest or motion is called",
  "বস্তু এটাৰ স্থিৰ বা গতি অৱস্থাৰ যিকোনো পৰিৱৰ্তন প্ৰতিৰোধ কৰা প্ৰৱণতাক কি বোলা হয়",
  [["inertia", "জড়তা"], ["momentum", "ভৰবেগ"], ["impulse", "আৱেগ"], ["friction", "ঘৰ্ষণ"]], 0,
  "Inertia grows with mass, which is why a loaded truck is harder to start and harder to stop than an empty one.",
  "জড়তা ভৰৰ সৈতে বাঢ়ে, সেয়ে ভৰা ট্ৰাকে খালী ট্ৰাকতকৈ আৰম্ভ কৰিবলৈ আৰু থমাবলৈ কঠিন।");

add("physics-277",
  "A body of mass 5 kg is at rest. Its momentum is",
  "৫ কিলোগ্ৰাম ভৰৰ বস্তু এটা স্থিৰ অৱস্থাত। তাৰ ভৰবেগ",
  [["zero", "শূন্য"], ["5 kilogram metre per second", "৫ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["49 kilogram metre per second", "৪৯ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["infinite", "অসীম"]], 0,
  "Momentum is mass times velocity, and the velocity of a body at rest is zero, so the momentum is zero whatever the mass.",
  "ভৰবেগ ভৰ গুণ বেগ, আৰু স্থিৰ বস্তুৰ বেগ শূন্য, সেয়ে ভৰ যিয়েই নহওক ভৰবেগ শূন্য।");

add("physics-278",
  "The force that opposes the relative motion between two surfaces in contact is called",
  "স্পৰ্শত থকা দুটা পৃষ্ঠৰ মাজত আপেক্ষিক গতিৰ বিৰুদ্ধে ক্ৰিয়া কৰা বলক কি বোলা হয়",
  [["friction", "ঘৰ্ষণ"], ["tension", "টান"], ["normal reaction", "অভিলম্ব প্ৰতিক্ৰিয়া"], ["weight", "ওজন"]], 0,
  "Friction acts along the surfaces and always opposes sliding. Normal reaction is perpendicular and tension acts along a string.",
  "ঘৰ্ষণে পৃষ্ঠৰে ক্ৰিয়া কৰি সদায় সৰ্কা বিৰুদ্ধ কৰে। অভিলম্ব প্ৰতিক্ৰিয়া লম্ব আৰু টানে ৰছাৰে ক্ৰিয়া কৰে।");

add("physics-279",
  "Ball bearings reduce friction because they replace sliding friction with",
  "বল বেয়াৰিঙে ঘৰ্ষণ কমায় কাৰণ ই সৰ্কা ঘৰ্ষণৰ সলনি দিয়ে",
  [["rolling friction", "গুৰি ঘৰ্ষণ"], ["no friction at all", "একেবাৰে ঘৰ্ষণ নাই"], ["magnetic force", "চুম্বকীয় বল"], ["inertia", "জড়তা"]], 0,
  "Rolling contact has much less resistance than sliding, so the bearing lets the shaft turn freely. Some friction always remains.",
  "গুৰি স্পৰ্শৰ প্ৰতিৰোধ সৰ্কাতকৈ বহু কম, সেয়ে বেয়াৰিঙে দণ্ডক মুক্তভাৱে ঘূৰিব দিয়ে। কিছুমান ঘৰ্ষণ সদায় থাকি যায়।");

add("physics-280",
  "The law that states a body continues in its state of rest or uniform motion unless an external force acts is",
  "বস্তু এটা বাহ্য বল ক্ৰিয়া নকৰালৈ স্থিৰ বা সুষম গতি অৱস্থাত থাকি যায় বুলি কোৱা সূত্ৰটো",
  [["Newton's first law", "নিউটনৰ প্ৰথম সূত্ৰ"], ["Newton's second law", "নিউটনৰ দ্বিতীয় সূত্ৰ"], ["Newton's third law", "নিউটনৰ তৃতীয় সূত্ৰ"], ["the law of gravitation", "মহাকৰ্ষণ সূত্ৰ"]], 0,
  "The first law defines inertia and explains why passengers jerk forward when a bus stops suddenly. The second law gives the quantitative relation.",
  "প্ৰথম সূত্ৰে জড়তা নিৰ্ণয় কৰে আৰু বাছে হঠাত ৰখিলে যাত্ৰীয়ে কিয় আগলৈ দলি পৰে তাক বুজায়। দ্বিতীয় সূত্ৰে পৰিমাণগত সম্পৰ্ক দিয়ে।");

add("physics-281",
  "A body is thrown up with a velocity of 20 metres per second. The maximum height reached is about",
  "বস্তু এটা ২০ মিটাৰ প্ৰতি ছেকেণ্ড বেগৰে ওপৰলৈ দলিয়া হয়। পোৱা সৰ্বোচ্চ উচ্চতা প্ৰায়",
  [["20 metres", "২০ মিটাৰ"], ["40 metres", "৪০ মিটাৰ"], ["10 metres", "১০ মিটাৰ"], ["200 metres", "২০০ মিটাৰ"]], 0,
  "Height is velocity squared divided by twice g, so four hundred divided by nineteen point six gives about twenty metres. Forty would be the case if g were five.",
  "উচ্চতা বেগৰ বৰ্গ ভাগ দুই গুণ g, সেয়ে চাৰি শ ভাগ উনৈছ দশমিক ছয় = প্ৰায় বিছ মিটাৰ। g পাঁচ হ'লে চল্লিছ হ'ল হেতেন।");

add("physics-282",
  "A cricket ball of mass 0.15 kg moving at 20 metres per second has a momentum of",
  "২০ মিটাৰ প্ৰতি ছেকেণ্ডে চলা ০.১৫ কিলোগ্ৰাম ভৰৰ ক্ৰিকেট বলৰ ভৰবেগ",
  [["3 kilogram metre per second", "৩ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["133 kilogram metre per second", "১৩৩ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["20.15 kilogram metre per second", "২০.১৫ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"], ["0.0075 kilogram metre per second", "০.০০৭৫ কিলোগ্ৰাম মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Momentum is mass times velocity, so zero point one five times twenty gives three. Dividing would give the small figure 0.0075.",
  "ভৰবেগ ভৰ গুণ বেগ, সেয়ে ০.১৫ গুণ ২০ = ৩। ভাগ কৰিলে সৰু সংখ্যা ০.০০৭৫ হয়।");

add("physics-283",
  "The resistive force that acts on a body moving through a fluid is called",
  "জুলীয়াৰ মাজেৰে চলা বস্তুৰ ওপৰত ক্ৰিয়া কৰা বাধাদায়ক বলক কি বোলা হয়",
  [["drag", "ড্ৰেগ"], ["tension", "ৰছাৰ টান"], ["weight", "ওজন"], ["normal reaction", "অভিলম্ব প্ৰতিক্ৰিয়া"]], 0,
  "Drag grows with speed and with the area facing the flow, which is why a parachute slows a fall. Tension needs a string.",
  "ড্ৰেগে বেগ আৰু প্ৰৱাহৰ মুখ কৰা কালিৰ সৈতে বাঢ়ে, সেয়ে পেৰাছুটে পতন ধীৰ কৰে। টানলৈ ৰছা লাগে।");

/* ================= work-energy-power ================= */
useLeaf("work-energy-power");

add("physics-284",
  "Work is said to be done when a force",
  "কাম কৰা বোলা হয় যেতিয়া বলে",
  [["produces a displacement in its own direction", "নিজৰ দিশত সৰণ ঘটায়"], ["acts on a stationary body", "স্থিৰ বস্তুৰ ওপৰত ক্ৰিয়া কৰে"], ["is balanced by another force", "আন এটা বলে ভাৰসাম্য কৰে"], ["acts perpendicular to the displacement", "সৰণৰ লম্বভাৱে ক্ৰিয়া কৰে"]], 0,
  "Work needs both a force and a displacement along that force, so pushing a wall that does not move does no work. A perpendicular force also does no work.",
  "কামলৈ বল আৰু সেই বলৰ দিশত সৰণ দুয়োটা লাগে, সেয়ে নলৰা বেৰ ঠেলিলে কাম নহয়। লম্ব বলেও কাম নকৰে।");

add("physics-285",
  "The work done when a force of 10 N moves a body through 5 m in the direction of the force is",
  "১০ নিউটন বলে বস্তু এটাক বলৰ দিশত ৫ মিটাৰ লৰালে কৰা কাম",
  [["50 joule", "৫০ জুল"], ["2 joule", "২ জুল"], ["15 joule", "১৫ জুল"], ["0.5 joule", "০.৫ জুল"]], 0,
  "Work is force times displacement when both are in the same direction, so ten times five gives fifty joule. Dividing would give the wrong two.",
  "বল আৰু সৰণ একেই দিশত হ'লে কাম = বল গুণ সৰণ, সেয়ে দহ গুণ পাঁচ = পঞ্চাশ জুল। ভাগ কৰিলে ভুলকৈ দুই হয়।");

add("physics-286",
  "One joule of work is done when a force of one newton moves a body through",
  "এক নিউটন বলে বস্তু এটা কিমান দূৰ লৰালে এক জুল কাম হয়",
  [["one metre", "এক মিটাৰ"], ["one centimetre", "এক ছেন্টিমিটাৰ"], ["one kilometre", "এক কিলোমিটাৰ"], ["ten metres", "দহ মিটাৰ"]], 0,
  "The joule is defined as one newton acting over one metre, so the displacement must be exactly one metre in the direction of the force.",
  "জুলক এক নিউটনে এক মিটাৰত ক্ৰিয়া কৰা বুলি সংজ্ঞায়িত কৰা হয়, সেয়ে সৰণ বলৰ দিশত ঠিক এক মিটাৰ হ'ব লাগে।");

add("physics-287",
  "The kinetic energy of a body of mass 2 kg moving at 10 metres per second is",
  "১০ মিটাৰ প্ৰতি ছেকেণ্ডে চলা ২ কিলোগ্ৰাম ভৰৰ বস্তুৰ গতিশক্তি",
  [["100 joule", "১০০ জুল"], ["20 joule", "২০ জুল"], ["200 joule", "২০০ জুল"], ["50 joule", "৫০ জুল"]], 0,
  "Kinetic energy is half the mass times velocity squared, so half of two times one hundred gives one hundred joule.",
  "গতিশক্তি আধা গুণ ভৰ গুণ বেগৰ বৰ্গ, সেয়ে আধা গুণ দুই গুণ এশ = এশ জুল।");

add("physics-288",
  "The potential energy of a body of mass 5 kg raised to a height of 4 m is about",
  "৫ কিলোগ্ৰাম ভৰৰ বস্তু ৪ মিটাৰ উচ্চতালৈ তোলা হ'লে স্থিতিশক্তি প্ৰায়",
  [["196 joule", "১৯৬ জুল"], ["20 joule", "২০ জুল"], ["9.8 joule", "৯.৮ জুল"], ["392 joule", "৩৯২ জুল"]], 0,
  "Potential energy is mass times g times height, so five times nine point eight times four gives about one hundred and ninety-six joule.",
  "স্থিতিশক্তি ভৰ গুণ g গুণ উচ্চতা, সেয়ে পাঁচ গুণ ন দশমিক আঠ গুণ চাৰি = প্ৰায় এশ ছয়ানব্বৈ জুল।");

add("physics-289",
  "The power of a machine that does 600 joule of work in 3 seconds is",
  "৩ ছেকেণ্ডত ৬০০ জুল কাম কৰা যন্ত্ৰৰ ক্ষমতা",
  [["200 watt", "২০০ ৱাট"], ["1800 watt", "১৮০০ ৱাট"], ["5 watt", "৫ ৱাট"], ["600 watt", "৬০০ ৱাট"]], 0,
  "Power is work divided by time, so six hundred divided by three gives two hundred watt. Multiplying gives the wrong eighteen hundred.",
  "ক্ষমতা কাম ভাগ সময়, সেয়ে ছশ ভাগ তিনি = দুই শ ৱাট। পূৰণ কৰিলে ভুলকৈ আঠাৰ শ হয়।");

add("physics-290",
  "One horsepower is equal to about",
  "এক অশ্বশক্তি প্ৰায় কিৰ সমান",
  [["746 watt", "৭৪৬ ৱাট"], ["1000 watt", "১০০০ ৱাট"], ["74.6 watt", "৭৪.৬ ৱাট"], ["100 watt", "১০০ ৱাট"]], 0,
  "One horsepower, a unit from early steam engine practice, is about seven hundred and forty-six watt.",
  "এক অশ্বশক্তি, প্ৰাৰম্ভিক ভাপ ইঞ্জিনৰ প্ৰচলিত একক, প্ৰায় সাত শ ছয়চল্লিছ ৱাট।");

add("physics-291",
  "When the velocity of a body is doubled, its kinetic energy becomes",
  "বস্তু এটাৰ বেগ দুগুণ কৰিলে তাৰ গতিশক্তি হয়",
  [["four times", "চাৰিগুণ"], ["two times", "দুগুণ"], ["half", "আধা"], ["unchanged", "অপৰিৱৰ্তিত"]], 0,
  "Kinetic energy varies as the square of the velocity, so doubling the speed multiplies the energy by four. Momentum would only double.",
  "গতিশক্তি বেগৰ বৰ্গৰ সৈতে বাঢ়ে, সেয়ে বেগ দুগুণ কৰিলে শক্তি চাৰিগুণ হয়। ভৰবেগ কেবল দুগুণ হ'ব।");

add("physics-292",
  "The energy possessed by a body due to its position is called",
  "অৱস্থানৰ বাবে বস্তু এটাৰ থকা শক্তিক কি বোলা হয়",
  [["potential energy", "স্থিতিশক্তি"], ["kinetic energy", "গতিশক্তি"], ["heat energy", "তাপ শক্তি"], ["chemical energy", "ৰাসায়নিক শক্তি"]], 0,
  "A raised stone or a stretched spring stores potential energy because of where it is or how it is deformed. Motion gives kinetic energy.",
  "ওপৰত থকা শিল বা টনা স্প্ৰিঙে নিজৰ অৱস্থান বা বিকৃতিৰ বাবে স্থিতিশক্তি সাঁচি ৰাখে। গতিয়ে গতিশক্তি দিয়ে।");

add("physics-293",
  "Which of the following is a non-renewable source of energy?",
  "তলৰ কোনটো নৱীকৰণযোগ্য নহয় শক্তিৰ উৎস",
  [["coal", "কয়লা"], ["solar energy", "সৌৰ শক্তি"], ["wind energy", "বায়ু শক্তি"], ["tidal energy", "জোৱাৰ শক্তি"]], 0,
  "Coal took millions of years to form and will not be replaced in human time, so it is non-renewable. Sun, wind and tides are continuously available.",
  "কয়লা গঠন হ'বলৈ কোটি বছৰ লাগিছিল আৰু মানুহৰ সময়ত পুনৰ নহ'ব, সেয়ে ই নৱীকৰণযোগ্য নহয়। সূৰ্য, বায়ু আৰু জোৱাৰ নিৰন্তৰ পোৱা যায়।");

add("physics-294",
  "The work-energy theorem states that the work done on a body equals the change in its",
  "কাম-শক্তি উপপাদ্যই কয় যে বস্তু এটাৰ ওপৰত কৰা কাম তাৰ কিৰ পৰিৱৰ্তনৰ সমান",
  [["kinetic energy", "গতিশক্তি"], ["potential energy", "স্থিতিশক্তি"], ["momentum", "ভৰবেগ"], ["mass", "ভৰ"]], 0,
  "The net work done changes the kinetic energy by exactly that amount, which is why a braking car loses kinetic energy equal to the work friction does.",
  "মুঠ কামে ঠিক সিমানখিনি গতিশক্তি সলায়, সেয়ে ব্ৰেক লগা গাড়ীয়ে ঘৰ্ষণে কৰা কামৰ সমান গতিশক্তি হেৰুৱায়।");

add("physics-295",
  "A body of mass 1 kg has a kinetic energy of 50 joule. Its speed is about",
  "১ কিলোগ্ৰাম ভৰৰ বস্তুৰ গতিশক্তি ৫০ জুল। তাৰ দ্ৰুতি প্ৰায়",
  [["10 metres per second", "১০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["50 metres per second", "৫০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["5 metres per second", "৫ মিটাৰ প্ৰতি ছেকেণ্ড"], ["100 metres per second", "১০০ মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Kinetic energy is half m v squared, so v squared is twice the energy divided by the mass, giving one hundred and hence ten metres per second.",
  "গতিশক্তি আধা m v বৰ্গ, সেয়ে v বৰ্গ = দুই গুণ শক্তি ভাগ ভৰ = এশ, সেয়ে দহ মিটাৰ প্ৰতি ছেকেণ্ড।");

add("physics-296",
  "The energy stored in a stretched bow is",
  "টনা ধনুত সাঁচি থকা শক্তি",
  [["elastic potential energy", "স্থিতিস্থাপক স্থিতিশক্তি"], ["kinetic energy", "গতিশক্তি"], ["chemical energy", "ৰাসায়নিক শক্তি"], ["nuclear energy", "পাৰমাণৱিক শক্তি"]], 0,
  "Work done in deforming the bow is stored as elastic potential energy and released as kinetic energy when the arrow flies.",
  "ধনু বিকৃত কৰাত কৰা কাম স্থিতিস্থাপক স্থিতিশক্তি হিচাপে সাঁচি থাকে আৰু কাঁড় উৰিলে গতিশক্তি হিচাপে ওলায়।");

add("physics-297",
  "The commercial unit of electrical energy is the",
  "বৈদ্যুতিক শক্তিৰ বাণিজ্যিক একক",
  [["kilowatt hour", "কিল'ৱাট ঘণ্টা"], ["watt", "ৱাট"], ["joule", "জুল"], ["ampere", "এম্পিয়াৰ"]], 0,
  "One kilowatt hour is the energy used by a one kilowatt appliance for one hour, which is why electricity bills are in units of this size.",
  "এক কিল'ৱাট ঘণ্টা মানে এক কিল'ৱাটৰ সজুলিয়ে এক ঘণ্টাত ব্যৱহাৰ কৰা শক্তি, সেয়ে বিদ্যুৎ বিল এই এককতে হয়।");

add("physics-298",
  "A machine of power 500 W runs for 2 hours. The energy consumed is",
  "৫০০ ৱাট ক্ষমতাৰ সজুলি ২ ঘণ্টা চলিলে ব্যৱহৃত শক্তি",
  [["1 kilowatt hour", "১ কিল'ৱাট ঘণ্টা"], ["1000 kilowatt hour", "১০০০ কিল'ৱাট ঘণ্টা"], ["250 kilowatt hour", "২৫০ কিল'ৱাট ঘণ্টা"], ["0.25 kilowatt hour", "০.২৫ কিল'ৱাট ঘণ্টা"]], 0,
  "Energy in kilowatt hour is power in kilowatt times time in hours, so zero point five times two gives one unit.",
  "কিল'ৱাট ঘণ্টাত শক্তি = কিল'ৱাটত ক্ষমতা গুণ ঘণ্টাত সময়, সেয়ে ০.৫ গুণ ২ = এক একক।");

add("physics-299",
  "When a body falls freely, its total mechanical energy",
  "বস্তু এটা মুক্তভাৱে পৰিলে তাৰ মুঠ যান্ত্ৰিক শক্তি",
  [["remains constant", "স্থিৰ থাকে"], ["increases", "বাঢ়ে"], ["decreases", "কমে"], ["becomes zero at once", "লগে লগে শূন্য হয়"]], 0,
  "Potential energy turns into kinetic energy as it falls, so the sum stays the same if air resistance is ignored. That is conservation of mechanical energy.",
  "পৰোতে স্থিতিশক্তি গতিশক্তিলৈ যায়, সেয়ে বায়ুৰ বাধা উপেক্ষা কৰিলে যোগফল একেই থাকে। সেয়া যান্ত্ৰিক শক্তি সংৰক্ষণ।");

add("physics-300",
  "The SI unit of work and the SI unit of energy are",
  "কামৰ SI একক আৰু শক্তিৰ SI একক",
  [["the same, the joule", "একেই, জুল"], ["different, joule and watt", "বেলেগ, জুল আৰু ৱাট"], ["different, newton and joule", "বেলেগ, নিউটন আৰু জুল"], ["the same, the newton", "একেই, নিউটন"]], 0,
  "Work is a transfer of energy, so both are measured in joule. The watt is power, which is energy per unit time.",
  "কাম শক্তিৰ হস্তান্তৰ, সেয়ে দুয়োটা জুলত জোখা হয়। ৱাট ক্ষমতা, অৰ্থাৎ প্ৰতি একক সময়ত শক্তি।");

add("physics-301",
  "The energy of a body of mass 2 kg moving at 5 metres per second is",
  "৫ মিটাৰ প্ৰতি ছেকেণ্ডে চলা ২ কিলোগ্ৰাম ভৰৰ বস্তুৰ শক্তি",
  [["25 joule", "২৫ জুল"], ["10 joule", "১০ জুল"], ["50 joule", "৫০ জুল"], ["5 joule", "৫ জুল"]], 0,
  "Kinetic energy is half the mass times velocity squared, so half of two times twenty-five gives twenty-five joule.",
  "গতিশক্তি আধা গুণ ভৰ গুণ বেগৰ বৰ্গ, সেয়ে আধা গুণ দুই গুণ পঁচিশ = পঁচিশ জুল।");

add("physics-302",
  "A device that converts mechanical energy into electrical energy is a",
  "যান্ত্ৰিক শক্তিক বৈদ্যুতিক শক্তিলৈ সলনি কৰা যন্ত্ৰটো",
  [["generator", "জেনেৰেটৰ"], ["motor", "মটৰ"], ["transformer", "ট্ৰান্সফৰ্মাৰ"], ["battery", "বেটেৰী"]], 0,
  "A generator turns a coil in a magnetic field and induces a current. A motor does the opposite and a battery stores chemical energy.",
  "জেনেৰেটৰে চুম্বক ক্ষেত্ৰত কুণ্ডলী ঘূৰাই প্ৰবাহ উৎপন্ন কৰে। মটৰে ওলোটা কৰে আৰু বেটেৰীয়ে ৰাসায়নিক শক্তি সাঁচে।");

add("physics-303",
  "The work done in holding a heavy bag stationary for a long time is",
  "গধুৰ মোনা বহু সময় স্থিৰভাৱে ধৰি ৰখাত কৰা কাম",
  [["zero, because there is no displacement", "শূন্য, কাৰণ সৰণ নাই"], ["large, because the bag is heavy", "বেছি, কাৰণ মোনাটো গধুৰ"], ["equal to the weight of the bag", "মোনাৰ ওজনৰ সমান"], ["infinite", "অসীম"]], 0,
  "Work needs displacement along the force, and the bag does not move, so no work is done on it although the muscles tire.",
  "কামলৈ বলৰ দিশত সৰণ লাগে, আৰু মোনাটো নলৰে, সেয়ে তাৰ ওপৰত কাম নহয় যদিও পেশী ভাগৰে।");

/* ================= sound-waves ================= */
useLeaf("sound-waves");

add("physics-304",
  "Sound waves in air are",
  "বায়ুত শব্দ তৰংগ হ'ল",
  [["longitudinal waves", "অনুদৈৰ্ঘ্য তৰংগ"], ["transverse waves", "অনুপ্ৰস্থ তৰংগ"], ["electromagnetic waves", "বিদ্যুৎ-চুম্বকীয় তৰংগ"], ["stationary waves only", "কেৱল স্থিৰ তৰংগ"]], 0,
  "Air particles vibrate back and forth along the direction the sound travels, which makes it longitudinal. Light is transverse.",
  "বায়ুৰ কণিকা শব্দ যোৱা দিশৰে আগুৱাই-পিছুৱাই কম্পিত হয়, সেয়ে ই অনুদৈৰ্ঘ্য। পোহৰ অনুপ্ৰস্থ।");

add("physics-305",
  "The speed of sound in air at room temperature is about",
  "কোঠাৰী তাপত বায়ুত শব্দৰ গতি প্ৰায়",
  [["340 metres per second", "৩৪০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["3 times ten to the eight metres per second", "৩ গুণ দহৰ ঘাত আঠ মিটাৰ প্ৰতি ছেকেণ্ড"], ["1500 metres per second", "১৫০০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["34 metres per second", "৩৪ মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Sound travels about three hundred and forty metres each second in air, which is why thunder follows lightning after a delay.",
  "বায়ুত শব্দই প্ৰতি ছেকেণ্ডত প্ৰায় তিনি শ চল্লিছ মিটাৰ যায়, সেয়ে বজ্ৰপাতৰ পিছত মেঘগৰ্জন পলমকৈ শুনা যায়।");

add("physics-306",
  "The pitch of a sound depends on its",
  "শব্দৰ তীক্ষ্ণতা কিৰ ওপৰত নিৰ্ভৰ কৰে",
  [["frequency", "কম্পনাংক"], ["amplitude", "বিস্তাৰ"], ["speed", "গতি"], ["quality only", "কেৱল গুণ"]], 0,
  "A higher frequency gives a higher pitch, which is why a woman's voice sounds shriller than a man's. Amplitude controls loudness instead.",
  "বেছি কম্পনাংকই বেছি তীক্ষ্ণতা দিয়ে, সেয়ে মহিলাৰ মাত мужাৰতকৈ চৰ্চৰ শুনা যায়। বিস্তাৰে উচ্চতা নিয়ন্ত্ৰণ কৰে।");

add("physics-307",
  "The loudness of a sound depends on its",
  "শব্দৰ উচ্চতা কিৰ ওপৰত নিৰ্ভৰ কৰে",
  [["amplitude", "বিস্তাৰ"], ["frequency", "কম্পনাংক"], ["wavelength", "তৰংগ দৈৰ্ঘ্য"], ["speed", "গতি"]], 0,
  "A larger amplitude carries more energy and sounds louder. Frequency changes the pitch, not the loudness.",
  "বেছি বিস্তাৰে বেছি শক্তি কঢ়িয়াই উচ্চ শব্দ দিয়ে। কম্পনাংকে তীক্ষ্ণতা সলায়, উচ্চতা নহয়।");

add("physics-308",
  "An echo is heard because sound",
  "প্ৰতিধ্বনি শুনা যায় কাৰণ শব্দ",
  [["is reflected from a distant surface", "দূৰৰ পৃষ্ঠৰপৰা প্ৰতিফলিত হয়"], ["is absorbed by walls", "বেৰে শোষে"], ["travels faster than light", "পোহৰতকৈ দ্ৰুত যায়"], ["bends around corners", "চুকত বেঁকা হয়"]], 0,
  "A hard surface reflects the sound back, and if it returns after at least a tenth of a second the ear hears it as a separate echo.",
  "কঠিন পৃষ্ঠই শব্দ ঘূৰাই পঠিয়ায়, আৰু অন্ততঃ এক দশমাংশ ছেকেণ্ডৰ পিছত ঘূৰি আহিলে কাণে সুকীয়া প্ৰতিধ্বনি শুনে।");

add("physics-309",
  "The minimum distance from a wall needed to hear a distinct echo is about",
  "স্পষ্ট প্ৰতিধ্বনি শুনিবলৈ বেৰৰপৰা ন্যূনতম দূৰত্ব প্ৰায়",
  [["17 metres", "১৭ মিটাৰ"], ["1.7 metres", "১.৭ মিটাৰ"], ["170 metres", "১৭০ মিটাৰ"], ["34 metres", "৩৪ মিটাৰ"]], 0,
  "Sound must travel to the wall and back in a tenth of a second, which at three hundred and forty metres per second means about seventeen metres each way.",
  "শব্দই বেৰলৈ গৈ এক দশমাংশ ছেকেণ্ডত ঘূৰি আহিব লাগে, যি তিনি শ চল্লিছ মিটাৰ প্ৰতি ছেকেণ্ডত প্ৰায় সোতৰ মিটাৰ দূৰত্ব।");

add("physics-310",
  "Ultrasonic waves are those with a frequency",
  "অতিশ্ৰৱ্য তৰংগ সেইবোৰ যাৰ কম্পনাংক",
  [["above 20,000 hertz", "২০,০০০ হাৰ্টজৰ ওপৰত"], ["below 20 hertz", "২০ হাৰ্টজৰ তলত"], ["between 20 and 20,000 hertz", "২০ আৰু ২০,০০০ হাৰ্টজৰ মাজত"], ["exactly 20,000 hertz", "ঠিক ২০,০০০ হাৰ্টজ"]], 0,
  "The human ear stops at about twenty thousand hertz, so anything higher is ultrasonic and only bats and dolphins hear it.",
  "মানুহৰ কাণ প্ৰায় বিছ হাজাৰ হাৰ্টজত ৰয়, সেয়ে তাতকৈ ওপৰৰ সকলো অতিশ্ৰৱ্য আৰু কেবল বাদুলী আৰু ডলফিনে শুনে।");

add("physics-311",
  "The audible range of frequency for a normal human ear is",
  "সাধাৰণ মানুহৰ কাণৰ শ্ৰৱ্য কম্পনাংকৰ পৰিসৰ",
  [["20 Hz to 20,000 Hz", "২০ হাৰ্টজৰপৰা ২০,০০০ হাৰ্টজ"], ["2 Hz to 200 Hz", "২ হাৰ্টজৰপৰা ২০০ হাৰ্টজ"], ["200 Hz to 2000 Hz", "২০০ হাৰ্টজৰপৰা ২০০০ হাৰ্টজ"], ["20,000 Hz to 200,000 Hz", "২০,০০০ হাৰ্টজৰপৰা ২,০০,০০০ হাৰ্টজ"]], 0,
  "Young ears hear from about twenty hertz to twenty thousand hertz, and the upper limit falls with age.",
  "ডেকা কাণে প্ৰায় বিছ হাৰ্টজৰপৰা বিছ হাজাৰ হাৰ্টজলৈ শুনে, আৰু বয়সৰ সৈতে ওপৰৰ সীমা কমে।");

add("physics-312",
  "Sound travels fastest in",
  "শব্দ আটাই দ্ৰুতগতিত যায়",
  [["steel", "ইস্পাত"], ["water", "পানী"], ["air", "বায়ু"], ["vacuum", "শূন্য"]], 0,
  "Solids have closely packed particles that pass vibrations on quickly, so sound is fastest in steel. In vacuum there is nothing to carry it.",
  "কঠিনত কণিকা ওচৰা-ওচৰি আৰু কম্পন দ্ৰুত সঞ্চাৰ কৰে, সেয়ে ইস্পাতত শব্দ আটাই দ্ৰুত। শূন্যত কঢ়িয়াবলৈ একো নাই।");

add("physics-313",
  "The relation between wave speed, frequency and wavelength is",
  "তৰংগৰ গতি, কম্পনাংক আৰু তৰংগ দৈৰ্ঘ্যৰ মাজৰ সম্পৰ্ক",
  [["speed equals frequency times wavelength", "গতি = কম্পনাংক গুণ তৰংগ দৈৰ্ঘ্য"], ["speed equals frequency divided by wavelength", "গতি = কম্পনাংক ভাগ তৰংগ দৈৰ্ঘ্য"], ["speed equals wavelength divided by frequency", "গতি = তৰংগ দৈৰ্ঘ্য ভাগ কম্পনাংক"], ["speed equals frequency plus wavelength", "গতি = কম্পনাংক যোগ তৰংগ দৈৰ্ঘ্য"]], 0,
  "In one second the wave advances by one wavelength for each cycle completed, so speed is frequency times wavelength.",
  "এক ছেকেণ্ডত প্ৰতিটো চক্ৰৰ বাবে তৰংগই এক তৰংগ দৈৰ্ঘ্য আগবাঢ়ে, সেয়ে গতি = কম্পনাংক গুণ তৰংগ দৈৰ্ঘ্য।");

add("physics-314",
  "A sound wave of frequency 100 Hz has a wavelength of 3.4 m. Its speed is",
  "১০০ হাৰ্টজ কম্পনাংকৰ শব্দ তৰংগৰ তৰংগ দৈৰ্ঘ্য ৩.৪ মিটাৰ। তাৰ গতি",
  [["340 metres per second", "৩৪০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["34 metres per second", "৩৪ মিটাৰ প্ৰতি ছেকেণ্ড"], ["3400 metres per second", "৩৪০০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["29.4 metres per second", "২৯.৪ মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Speed is frequency times wavelength, so one hundred times three point four gives three hundred and forty metres per second.",
  "গতি = কম্পনাংক গুণ তৰংগ দৈৰ্ঘ্য, সেয়ে এশ গুণ ৩.৪ = তিনি শ চল্লিছ মিটাৰ প্ৰতি ছেকেণ্ড।");

add("physics-315",
  "The quality or timber of a musical note depends on its",
  "সুৰৰ গুণ বা টিম্বাৰ কিৰ ওপৰত নিৰ্ভৰ কৰে",
  [["overtones present", "থকা অভিস্বৰবোৰৰ"], ["frequency only", "কেৱল কম্পনাংকৰ"], ["amplitude only", "কেৱল বিস্তাৰৰ"], ["speed", "গতিৰ"]], 0,
  "Two notes of the same pitch and loudness still sound different on a violin and a flute because of the mixture of overtones they carry.",
  "একেই তীক্ষ্ণতা আৰু উচ্চতাৰ দুটা সুৰ বেহেলাত আৰু বাঁহীত বেলেগ শুনা যায় কাৰণ অভিস্বৰৰ মিশ্ৰণ বেলেগ।");

add("physics-316",
  "A megaphone is used to",
  "মেগাফোন কিৰ বাবে ব্যৱহৃত হয়",
  [["send sound in a particular direction with greater loudness", "নিৰ্দিষ্ট দিশত বেছি উচ্চ শব্দ পঠিয়াবলৈ"], ["increase the frequency of sound", "শব্দৰ কম্পনাংক বঢ়াবলৈ"], ["reduce the speed of sound", "শব্দৰ গতি কমাবলৈ"], ["change sound into light", "শব্দ পোহৰলৈ সলনি কৰিবলৈ"]], 0,
  "The conical shape stops the sound spreading in all directions, so more energy goes forward and it sounds louder.",
  "শংকু আকৃতিয়ে শব্দ সকলো দিশলৈ বিয়পাৰ পৰা ৰোধ কৰে, সেয়ে বেছি শক্তি আগলৈ যায় আৰু বেছি উচ্চ শুনা যায়।");

add("physics-317",
  "Sound cannot be heard on the Moon because",
  "চন্দ্ৰত শব্দ শুনা নাযায় কাৰণ",
  [["there is no atmosphere to carry the vibrations", "কম্পন কঢ়িয়াবলৈ বায়ুমণ্ডল নাই"], ["the Moon is too far away", "চন্দ্ৰ বহু দূৰত"], ["gravity is too weak there", "তাত মহাকৰ্ষণ অতি দুৰ্বল"], ["the Moon is too cold", "চন্দ্ৰ অতি ঠাণ্ডা"]], 0,
  "Sound needs a material medium, and the Moon has essentially no air, so vibrations have nothing to pass through.",
  "শব্দলৈ পদাৰ্থ মাধ্যম লাগে, আৰু চন্দ্ৰত প্ৰায় বায়ু নাই, সেয়ে কম্পনেৰে যোৱাৰ একো নাই।");

add("physics-318",
  "The frequency of a wave whose time period is 0.02 second is",
  "সময় কাল ০.০২ ছেকেণ্ড থকা তৰংগৰ কম্পনাংক",
  [["50 Hz", "৫০ হাৰ্টজ"], ["20 Hz", "২০ হাৰ্টজ"], ["0.02 Hz", "০.০২ হাৰ্টজ"], ["200 Hz", "২০০ হাৰ্টজ"]], 0,
  "Frequency is the reciprocal of the time period, so one divided by zero point zero two gives fifty hertz.",
  "কম্পনাংক সময় কালৰ ব্যস্তানুপাত, সেয়ে এক ভাগ ০.০২ = পঞ্চাশ হাৰ্টজ।");

add("physics-319",
  "The reflection of sound follows the same laws as the reflection of",
  "শব্দৰ প্ৰতিফলন কিৰ প্ৰতিফলনৰ দৰে একেই সূত্ৰ মানে",
  [["light", "পোহৰৰ"], ["heat", "তাপৰ"], ["electric current", "বৈদ্যুতিক প্ৰবাহৰ"], ["magnetism", "চুম্বকত্বৰ"]], 0,
  "The angle of incidence equals the angle of reflection for sound just as for light, which is why a curved shell can focus sound.",
  "শব্দৰ বাবেও আপতন কোণ প্ৰতিফলন কোণৰ সমান, যেনে পোহৰৰ, সেয়ে বেঁকা শাঁখে শব্দ কেন্দ্ৰীভূত কৰিব পাৰে।");

add("physics-320",
  "Sound waves with frequency below 20 Hz are called",
  "২০ হাৰ্টজৰ তলৰ কম্পনাংকৰ শব্দ তৰংগক কি বোলা হয়",
  [["infrasonic", "অতিশ্ৰৱ্যৰ তলৰ"], ["ultrasonic", "অতিশ্ৰৱ্য"], ["audible", "শ্ৰৱ্য"], ["supersonic", "শব্দোত্তৰ"]], 0,
  "Below twenty hertz the ear cannot follow the vibration, so the sound is infrasonic. Supersonic refers to speed, not frequency.",
  "বিছ হাৰ্টজৰ তলত কাণে কম্পন অনুসৰণ কৰিব নোৱাৰে, সেয়ে শব্দ অতিশ্ৰৱ্যৰ তলৰ। শব্দোত্তৰে গতি বুজায়, কম্পনাংক নহয়।");

/* ================= light-optics ================= */
useLeaf("light-optics");

add("physics-321",
  "The angle of incidence is always equal to the angle of reflection. This is the law of",
  "আপতন কোণ সদায় প্ৰতিফলন কোণৰ সমান। এইয়া কি সূত্ৰ",
  [["reflection", "প্ৰতিফলনৰ"], ["refraction", "প্ৰতিসৰণৰ"], ["dispersion", "বিচ্ছুৰণৰ"], ["diffraction", "অপসৰণৰ"]], 0,
  "The law of reflection fixes both angles measured from the normal. Refraction deals with bending as light enters a new medium.",
  "প্ৰতিফলন সূত্ৰই অভিলম্বৰপৰা জোখা দুয়ো কোণ নিৰ্ণয় কৰে। প্ৰতিসৰণে নতুন মাধ্যমত সোমাওঁতে বেঁকা হোৱা চম্ভালে।");

add("physics-322",
  "A convex lens is also called a",
  "উত্তল লেন্সক আন কি বোলা হয়",
  [["converging lens", "অভিসাৰী লেন্স"], ["diverging lens", "অপসাৰী লেন্স"], ["plane mirror", "সমতল দাপোণ"], ["prism", "প্ৰিজম"]], 0,
  "A convex lens is thicker in the middle and bends parallel rays to a focus, so it converges. A concave lens diverges them.",
  "উত্তল লেন্স মাজত ডাঙৰ আৰু সমান্তৰাল ৰশ্মি ফ'কাছত বেঁকা কৰে, সেয়ে ই অভিসাৰী। অৱতল লেন্সে সেইবোৰ অপসাৰিত কৰে।");

add("physics-323",
  "The image formed by a convex lens when the object is beyond twice the focal length is",
  "বস্তু ফ'কাছ দৈৰ্ঘ্যৰ দুগুণতকৈ দূৰত থাকিলে উত্তল লেন্সে গঠন কৰা প্ৰতিবিম্ব",
  [["real, inverted and diminished", "সৎ, ওলোটা আৰু সৰু"], ["virtual, erect and magnified", "অসৎ, সোজা আৰু ডাঙৰ"], ["real, erect and magnified", "সৎ, সোজা আৰু ডাঙৰ"], ["virtual, inverted and same size", "অসৎ, ওলোটা আৰু সমান আকাৰ"]], 0,
  "Beyond twice the focal length a convex lens gives a real image on the other side that is inverted and smaller. Inside the focus the image is virtual and magnified.",
  "ফ'কাছ দৈৰ্ঘ্যৰ দুগুণতকৈ দূৰত উত্তল লেন্সে আনফালে সৎ, ওলোটা আৰু সৰু প্ৰতিবিম্ব দিয়ে। ফ'কাছৰ ভিতৰত প্ৰতিবিম্ব অসৎ আৰু ডাঙৰ।");

add("physics-324",
  "A concave mirror is used as a shaving mirror because it forms",
  "অৱতল দাপোণ সখা কৰাৰ দাপোণ হিচাপে ব্যৱহৃত হয় কাৰণ ই গঠন কৰে",
  [["a magnified erect image when the face is within the focus", "মুখ ফ'কাছৰ ভিতৰত থাকিলে ডাঙৰ সোজা প্ৰতিবিম্ব"], ["a diminished erect image always", "সদায় সৰু সোজা প্ৰতিবিম্ব"], ["a real inverted image always", "সদায় সৎ ওলোটা প্ৰতিবিম্ব"], ["no image at all", "একেবাৰে প্ৰতিবিম্ব নহয়"]], 0,
  "With the face closer than the focal length the concave mirror gives a virtual, erect and enlarged image, which suits shaving.",
  "মুখ ফ'কাছ দৈৰ্ঘ্যতকৈ ওচৰত থাকিলে অৱতল দাপোণে অসৎ, সোজা আৰু ডাঙৰ প্ৰতিবিম্ব দিয়ে, যি সখা কৰাৰ বাবে উপযুক্ত।");

add("physics-325",
  "The power of a lens of focal length 25 cm is",
  "২৫ ছেন্টিমিটাৰ ফ'কাছ দৈৰ্ঘ্যৰ লেন্সৰ ক্ষমতা",
  [["4 dioptre", "৪ ডাইঅ'প্টাৰ"], ["0.25 dioptre", "০.২৫ ডাইঅ'প্টাৰ"], ["25 dioptre", "২৫ ডাইঅ'প্টাৰ"], ["0.04 dioptre", "০.০৪ ডাইঅ'প্টাৰ"]], 0,
  "Power is one divided by the focal length in metres, so one divided by zero point two five gives four dioptre.",
  "ক্ষমতা = এক ভাগ মিটাৰত ফ'কাছ দৈৰ্ঘ্য, সেয়ে এক ভাগ ০.২৫ = চাৰি ডাইঅ'প্টাৰ।");

add("physics-326",
  "Total internal reflection can occur only when light passes from",
  "পূৰ্ণ আভ্যন্তৰীণ প্ৰতিফলন কেবল তেতিয়াহে হয় যেতিয়া পোহৰ যায়",
  [["a denser medium to a rarer medium", "ঘনতৰ মাধ্যমৰপৰা লঘুতৰ মাধ্যমলৈ"], ["a rarer medium to a denser medium", "লঘুতৰ মাধ্যমৰপৰা ঘনতৰ মাধ্যমলৈ"], ["vacuum to glass", "শূন্যৰপৰা কাচলৈ"], ["air to water", "বায়ুৰপৰা পানীলৈ"]], 0,
  "The ray must be travelling in the denser medium and strike the boundary beyond the critical angle, otherwise it refracts out.",
  "ৰশ্মি ঘনতৰ মাধ্যমত চলি সংকট কোণতকৈ বেছি কোণত সীমাত পৰিব লাগে, নহ'লে প্ৰতিসৰিত হৈ ওলাই যায়।");

add("physics-327",
  "Optical fibres are used in communication because light inside them undergoes",
  "যোগাযোগত অপটিকেল ফাইবাৰ ব্যৱহৃত হয় কাৰণ ভিতৰৰ পোহৰে অনুভৱ কৰে",
  [["total internal reflection", "পূৰ্ণ আভ্যন্তৰীণ প্ৰতিফলন"], ["refraction only", "কেৱল প্ৰতিসৰণ"], ["dispersion", "বিচ্ছুৰণ"], ["absorption", "শোষণ"]], 0,
  "The core is denser than the cladding, so light striking the boundary at a shallow angle reflects back inside and travels along the fibre with little loss.",
  "ক'ৰ ক্লেডিঙতকৈ ঘন, সেয়ে সীমাত কম কোণত পৰা পোহৰ ভিতৰলৈ ঘূৰি আহি কম ক্ষয়ত ফাইবাৰৰে যায়।");

add("physics-328",
  "The splitting of white light into its component colours by a prism is called",
  "প্ৰিজমে বগা পোহৰক উপাদান ৰঙত বিভক্ত কৰাক কি বোলা হয়",
  [["dispersion", "বিচ্ছুৰণ"], ["reflection", "প্ৰতিফলন"], ["diffraction", "অপসৰণ"], ["polarisation", "ধ্ৰুৱণ"]], 0,
  "Each colour bends by a different amount, so the colours spread out into a spectrum. Reflection would simply send light back.",
  "প্ৰতিটো ৰং বেলেগ পৰিমাণে বেঁকা হয়, সেয়ে ৰংবোৰ বাপি বৰ্ণালী হয়। প্ৰতিফলনে পোহৰ কেবল ঘূৰাই পঠিয়ালেহেঁতেন।");

add("physics-329",
  "The image formed by a plane mirror is always",
  "সমতল দাপোণে গঠন কৰা প্ৰতিবিম্ব সদায়",
  [["virtual, erect and laterally inverted", "অসৎ, সোজা আৰু পাৰ্শ্বীয়ভাৱে ওলোটা"], ["real and inverted", "সৎ আৰু ওলোটা"], ["real and magnified", "সৎ আৰু ডাঙৰ"], ["virtual and diminished", "অসৎ আৰু সৰু"]], 0,
  "The rays only appear to come from behind the mirror, so the image is virtual, upright, the same size, and left and right are swapped.",
  "ৰশ্মিবোৰ দাপোণৰ পিছৰপৰা অহা যেন লাগে, সেয়ে প্ৰতিবিম্ব অসৎ, সোজা, একেই আকাৰ, আৰু বাওঁ-সোঁ সলনি হয়।");

add("physics-330",
  "The refractive index of a medium is the ratio of the speed of light in vacuum to",
  "মাধ্যম এটাৰ প্ৰতিসৰণাংক শূন্যত পোহৰৰ গতি আৰু কিৰ অনুপাত",
  [["the speed of light in the medium", "মাধ্যমত পোহৰৰ গতিৰ"], ["the speed of sound in the medium", "মাধ্যমত শব্দৰ গতিৰ"], ["the wavelength in vacuum", "শূন্যত তৰংগ দৈৰ্ঘ্যৰ"], ["the frequency of light", "পোহৰৰ কম্পনাংকৰ"]], 0,
  "Light slows in a denser medium, so the refractive index is greater than one. A vacuum has a refractive index of exactly one.",
  "ঘনতৰ মাধ্যমত পোহৰ লেহেম হয়, সেয়ে প্ৰতিসৰণাংক একৰ ওপৰত। শূন্যৰ প্ৰতিসৰণাংক ঠিক এক।");

add("physics-331",
  "A person suffering from myopia cannot see",
  "মায়'পিয়া ৰোগীয়ে দেখিব নোৱাৰে",
  [["distant objects clearly", "দূৰৰ বস্তু স্পষ্টকৈ"], ["near objects clearly", "ওচৰৰ বস্তু স্পষ্টকৈ"], ["any object at all", "একেবাৰে কোনো বস্তু"], ["colours correctly", "ৰং সঠিকভাৱে"]], 0,
  "A myopic eye focuses distant rays in front of the retina, so far objects blur while near vision stays fine. A concave lens corrects it.",
  "মায়'পিক চকুৱে দূৰৰ ৰশ্মি ৰেটিনাৰ আগতে কেন্দ্ৰীভূত কৰে, সেয়ে দূৰৰ বস্তু অস্পষ্ট কিন্তু ওচৰৰ দৃষ্টি ঠিক। অৱতল লেন্সে শুধৰায়।");

add("physics-332",
  "The focal length of a plane mirror is",
  "সমতল দাপোণৰ ফ'কাছ দৈৰ্ঘ্য",
  [["infinite", "অসীম"], ["zero", "শূন্য"], ["equal to the object distance", "বস্তুৰ দূৰত্বৰ সমান"], ["one metre", "এক মিটাৰ"]], 0,
  "A plane mirror has an infinite radius of curvature, so its focus lies at infinity and the image is the same size at the same distance behind.",
  "সমতল দাপোণৰ বক্ৰতা ব্যাসাৰ্ধ অসীম, সেয়ে ফ'কাছ অসীমত আৰু প্ৰতিবিম্ব একেই আকাৰত একেই দূৰত্বত পিছত।");

add("physics-333",
  "A rainbow is formed by",
  "ৰামধেনু গঠিত হয় কিৰে",
  [["dispersion and internal reflection in water droplets", "জলকণাত বিচ্ছুৰণ আৰু আভ্যন্তৰীণ প্ৰতিফলন"], ["reflection from clouds", "মেঘৰপৰা প্ৰতিফলন"], ["refraction in air only", "কেৱল বায়ুত প্ৰতিসৰণ"], ["absorption by dust", "ধূলিয়ে শোষণ"]], 0,
  "Sunlight entering a raindrop is refracted, reflected inside and refracted again on leaving, which spreads the colours into an arc.",
  "বৰষুণৰ টোপালত সোমোৱা সূৰ্যৰ পোহৰ প্ৰতিসৰিত, ভিতৰত প্ৰতিফলিত আৰু ওলাওঁতে পুনৰ প্ৰতিসৰিত হয়, যিয়ে ৰংবোৰ বাপি চাপ গঢ়ে।");

add("physics-334",
  "The colour of an object we see is the colour it",
  "বস্তু এটাৰ যি ৰং আমি দেখোঁ সেয়া সেই ৰং যি ই",
  [["reflects", "প্ৰতিফলিত কৰে"], ["absorbs", "শোষে"], ["emits always", "সদায় নিঃসৰণ কৰে"], ["refracts", "প্ৰতিসৰিত কৰে"]], 0,
  "A red object reflects red and absorbs the rest, so only red reaches the eye. In green light it appears black because there is no red to reflect.",
  "ৰঙা বস্তুৱে ৰঙা প্ৰতিফলিত কৰি বাকীবোৰ শোষে, সেয়ে কেবল ৰঙা চকুলৈ যায়। সেউজীয়া পোহৰত ই ক'লা দেখা যায় কাৰণ প্ৰতিফলিত কৰিবলৈ ৰঙা নাই।");

add("physics-335",
  "The focal length of a concave mirror is 10 cm. Its radius of curvature is",
  "অৱতল দাপোণৰ ফ'কাছ দৈৰ্ঘ্য ১০ ছেন্টিমিটাৰ। তাৰ বক্ৰতা ব্যাসাৰ্ধ",
  [["20 cm", "২০ ছেন্টিমিটাৰ"], ["10 cm", "১০ ছেন্টিমিটাৰ"], ["5 cm", "৫ ছেন্টিমিটাৰ"], ["40 cm", "৪০ ছেন্টিমিটাৰ"]], 0,
  "The radius of curvature is twice the focal length for a spherical mirror, so ten gives twenty centimetre. Five would be the half, not double.",
  "গোলাকাৰ দাপোণৰ বক্ৰতা ব্যাসাৰ্ধ ফ'কাছ দৈৰ্ঘ্যৰ দুগুণ, সেয়ে দহৰপৰা বিছ ছেন্টিমিটাৰ। পাঁচ আধা হ'ল হেতেন, দুগুণ নহয়।");

add("physics-336",
  "Which colour of light is deviated the most by a prism?",
  "প্ৰিজমে কোন ৰঙৰ পোহৰ আটাই বেছি বেঁকা কৰে",
  [["violet", "বেঙুনীয়া"], ["red", "ৰঙা"], ["yellow", "হালধীয়া"], ["green", "সেউজীয়া"]], 0,
  "Violet has the shortest wavelength and the highest refractive index, so it bends most. Red bends least.",
  "বেঙুনীয়াৰ তৰংগ দৈৰ্ঘ্য আটাই কম আৰু প্ৰতিসৰণাংক আটাই বেছি, সেয়ে ই আটাই বেছি বেঁকা হয়। ৰঙা আটাই কম।");

add("physics-337",
  "A magnifying glass is a",
  "বৰ্দ্ধিত কাচ এটা",
  [["convex lens", "উত্তল লেন্স"], ["concave lens", "অৱতল লেন্স"], ["plane mirror", "সমতল দাপোণ"], ["convex mirror", "উত্তল দাপোণ"]], 0,
  "Holding a convex lens closer than its focal length gives an enlarged virtual image, which is how a magnifying glass works.",
  "উত্তল লেন্স ফ'কাছ দৈৰ্ঘ্যতকৈ ওচৰত ধৰিলে ডাঙৰ অসৎ প্ৰতিবিম্ব দিয়ে, সেয়ে বৰ্দ্ধিত কাচ কাম কৰে।");

/* ================= modern-nuclear-physics ================= */
useLeaf("modern-nuclear-physics");

add("physics-338",
  "The particle discovered by J J Thomson was the",
  "জে জে টমছনে আৱিষ্কাৰ কৰা কণিকা আছিল",
  [["electron", "ইলেক্ট্ৰন"], ["proton", "প্ৰটন"], ["neutron", "নিউট্ৰন"], ["alpha particle", "আলফা কণিকা"]], 0,
  "Thomson's cathode ray experiments showed a light negative particle common to all atoms, the electron. Rutherford found the proton and Chadwick the neutron.",
  "টমছনৰ কেথ'ড ৰশ্মি পৰীক্ষাই সকলো পৰমাণুত থকা লঘু ঋণাত্মক কণিকা ইলেক্ট্ৰন দেখুৱালে। ৰাদাৰফৰ্ডে প্ৰটন আৰু চাদৱিকে নিউট্ৰন পালে।");

add("physics-339",
  "The number of protons in a nucleus of an atom of carbon, atomic number six, is",
  "কাৰ্বনৰ পৰমাণু নিউক্লিয়াছত, পাৰমাণৱিক সংখ্যা ছয়, প্ৰটনৰ সংখ্যা",
  [["6", "৬"], ["12", "১২"], ["18", "১৮"], ["14", "১৪"]], 0,
  "The atomic number is by definition the proton count, so carbon has six. Twelve would be its mass number including neutrons.",
  "পাৰমাণৱিক সংখ্যা সংজ্ঞাই প্ৰটনৰ সংখ্যা, সেয়ে কাৰ্বনত ছয়। বাৰ হ'ল তাৰ ভৰ সংখ্যা, নিউট্ৰনসহ।");

add("physics-340",
  "In nuclear fission, a heavy nucleus",
  "পাৰমাণৱিক বিভাজনত গধুৰ নিউক্লিয়াছ",
  [["splits into lighter nuclei with release of energy", "লঘুতৰ নিউক্লিয়াছত বিভক্ত হৈ শক্তি এৰে"], ["combines with another nucleus", "আন নিউক্লিয়াছৰ সৈতে মিলে"], ["emits only an electron", "কেৱল ইলেক্ট্ৰন এৰে"], ["absorbs a photon and stays intact", "ফ'টন শোষি অটুট থাকে"]], 0,
  "A slow neutron splits uranium into two lighter nuclei plus more neutrons, and the mass defect appears as energy. Fusion is the joining case.",
  "ধীৰ নিউট্ৰনে ইউৰেনিয়ামক দুটা লঘু নিউক্লিয়াছ আৰু অধিক নিউট্ৰনলৈ ফালে, আৰু ভৰ ঘাটিয়ে শক্তি হিচাপে ওলায়। সংযোজন ওলোটা ক্ষেত্ৰ।");

add("physics-341",
  "In nuclear fusion, energy is released because the new nucleus has",
  "পাৰমাণৱিক সংযোজনত শক্তি ওলায় কাৰণ নতুন নিউক্লিয়াছৰ",
  [["less mass than the nuclei that formed it", "গঠন কৰা নিউক্লিয়াছতকৈ কম ভৰ"], ["more mass than the nuclei that formed it", "গঠন কৰা নিউক্লিয়াছতকৈ বেছি ভৰ"], ["more protons only", "কেৱল বেছি প্ৰটন"], ["no binding energy", "বন্ধন শক্তি নাই"]], 0,
  "The mass of the fused nucleus is slightly less than the sum of the parts, and that mass difference appears as energy. This powers the Sun.",
  "সংযোজিত নিউক্লিয়াছৰ ভৰ অংশবোৰৰ যোগফলতকৈ অলপ কম, আৰু সেই পাৰ্থক্য শক্তি হিচাপে ওলায়। এইয়া সূৰ্যক চলায়।");

add("physics-342",
  "The moderator used in many nuclear reactors is",
  "বহু পাৰমাণৱিক চুল্লীত ব্যৱহৃত মডাৰেটৰ",
  [["heavy water or graphite", "গধুৰ পানী বা গ্ৰেফাইট"], ["uranium", "ইউৰেনিয়াম"], ["lead", "ছীহ"], ["copper", "তাম"]], 0,
  "The moderator slows fast neutrons so they can sustain the chain reaction, and heavy water and graphite do this without absorbing many neutrons.",
  "মডাৰেটৰে দ্ৰুত নিউট্ৰনক ধীৰ কৰে যাতে শৃংখল বিক্ৰিয়া চলি থাকে, আৰু গধুৰ পানী তথা গ্ৰেফাইটে বেছি নিউট্ৰন নশোষি ইয়াক কৰে।");

add("physics-343",
  "The control rods in a nuclear reactor are made of a material that",
  "পাৰমাণৱিক চুল্লীৰ নিয়ন্ত্ৰণ দণ্ড কি পদাৰ্থৰে বনোৱা হয় যি",
  [["absorbs neutrons", "নিউট্ৰন শোষে"], ["emits neutrons", "নিউট্ৰন এৰে"], ["slows neutrons only", "কেৱল নিউট্ৰন ধীৰ কৰে"], ["reflects neutrons only", "কেৱল নিউট্ৰন প্ৰতিফলিত কৰে"]], 0,
  "Boron or cadmium rods soak up surplus neutrons, so pushing them in slows the reaction and pulling them out speeds it up.",
  "বৰন বা কেডমিয়াম দণ্ডে অতিৰিক্ত নিউট্ৰন শোষে, সেয়ে সোমালে বিক্ৰিয়া ধীৰ আৰু টানিলে দ্ৰুত হয়।");

add("physics-344",
  "The half-life of a radioactive substance is the time in which",
  "ৰেডিঅ'সক্ৰিয় পদাৰ্থৰ অৰ্ধায়ু সেই সময় যত",
  [["half of the atoms present decay", "থকা পৰমাণুৰ আধা ক্ষয় হয়"], ["all the atoms decay", "সকলো পৰমাণু ক্ষয় হয়"], ["the activity doubles", "সক্ৰিয়তা দুগুণ হয়"], ["the mass doubles", "ভৰ দুগুণ হয়"]], 0,
  "Half-life is the period for half the nuclei to decay, and after each further half-life half of what remains decays, so it never quite reaches zero.",
  "অৰ্ধায়ু মানে আধা নিউক্লিয়াছ ক্ষয় হোৱা সময়, আৰু প্ৰতিটো অৰ্ধায়ুৰ পিছত বাকী থকাৰ আধা ক্ষয় হয়, সেয়ে কেতিয়াও ঠিক শূন্য নহয়।");

add("physics-345",
  "After two half-lives the fraction of a radioactive sample remaining is",
  "দুটা অৰ্ধায়ুৰ পিছত ৰেডিঅ'সক্ৰিয় নমুনাৰ বাকী থকা অংশ",
  [["one fourth", "চাৰি ভাগৰ এক ভাগ"], ["one half", "আধা"], ["one eighth", "আঠ ভাগৰ এক ভাগ"], ["zero", "শূন্য"]], 0,
  "Each half-life halves what is left, so after two the fraction is one half times one half, that is one fourth.",
  "প্ৰতিটো অৰ্ধায়ুৱে বাকী থকা আধা কৰে, সেয়ে দুটাৰ পিছত আধা গুণ আধা = চাৰি ভাগৰ এক ভাগ।");

add("physics-346",
  "Alpha particles are",
  "আলফা কণিকা হ'ল",
  [["helium nuclei with two protons and two neutrons", "দুটা প্ৰটন আৰু দুটা নিউট্ৰনযুক্ত হিলিয়াম নিউক্লিয়াছ"], ["fast electrons", "দ্ৰুত ইলেক্ট্ৰন"], ["high energy photons", "উচ্চ শক্তিৰ ফ'টন"], ["single protons", "একক প্ৰটন"]], 0,
  "An alpha particle is a helium nucleus, so it carries two positive charges and is heavy. Beta particles are electrons and gamma rays are photons.",
  "আলফা কণিকা হিলিয়াম নিউক্লিয়াছ, সেয়ে ইয়াৰ দুটা ধনাত্মক আধান আৰু ভৰ বেছি। বিটা ইলেক্ট্ৰন আৰু গামা ফ'টন।");

add("physics-347",
  "Gamma rays differ from X-rays mainly in that they",
  "গামা ৰশ্মি এক্স-ৰশ্মিতকৈ মূলতঃ কিৰ দ্বাৰা বেলেগ",
  [["come from the nucleus and have shorter wavelength", "নিউক্লিয়াছৰপৰা আহে আৰু তৰংগ দৈৰ্ঘ্য কম"], ["are not electromagnetic", "বিদ্যুৎ-চুম্বকীয় নহয়"], ["carry electric charge", "বৈদ্যুতিক আধান কঢ়িয়ায়"], ["travel slower than light", "পোহৰতকৈ লেহেম"]], 0,
  "Both are electromagnetic, but gamma rays originate in nuclear changes and are more energetic, so they penetrate further.",
  "দুয়োটা বিদ্যুৎ-চুম্বকীয়, কিন্তু গামা ৰশ্মি নিউক্লিয় পৰিৱৰ্তনৰপৰা আহে আৰু বেছি শক্তিশালী, সেয়ে বেছি ভেদ কৰে।");

add("physics-348",
  "Which radiation is deflected towards the positive plate in an electric field?",
  "বৈদ্যুতিক ক্ষেত্ৰত কোন ৰশ্মি ধনাত্মক পাতলৈ বেঁকা হয়",
  [["beta rays", "বিটা ৰশ্মি"], ["alpha rays", "আলফা ৰশ্মি"], ["gamma rays", "গামা ৰশ্মি"], ["X-rays", "এক্স-ৰশ্মি"]], 0,
  "Beta particles are negative electrons, so they are attracted to the positive plate. Alpha particles are positive and go the other way; gamma is undeflected.",
  "বিটা কণিকা ঋণাত্মক ইলেক্ট্ৰন, সেয়ে ধনাত্মক পাতলৈ টানি যায়। আলফা ধনাত্মক আৰু আনফালে যায়; গামা নবেঁকা।");

add("physics-349",
  "The isotope used in the treatment of thyroid disease is",
  "থাইৰয়ড ৰোগৰ চিকিৎসাত ব্যৱহৃত ইসটোপ",
  [["iodine one three one", "আয়ডিন এক তিনি এক"], ["cobalt sixty", "কোবাল্ট ষাঠি"], ["carbon fourteen", "কাৰ্বন চৈদ্ধ"], ["uranium two three five", "ইউৰেনিয়াম দুই তিনি পাঁচ"]], 0,
  "The thyroid takes up iodine, so radioactive iodine concentrates there and treats overactive tissue. Cobalt sixty is used for tumours elsewhere.",
  "থাইৰয়ডে আয়ডিন লয়, সেয়ে ৰেডিঅ'সক্ৰিয় আয়ডিন তাতে ঘনীভূত হৈ অতি সক্ৰিয় কলাৰ চিকিৎসা কৰে। কোবাল্ট ষাঠি আন ঠাইৰ টিউমাৰত।");

add("physics-350",
  "Which of the following is used in carbon dating to find the age of ancient objects?",
  "পুৰণি বস্তুৰ বয়স নিৰ্ণয়ত কাৰ্বন ডেটিঙত তলৰ কোনটো ব্যৱহৃত হয়",
  [["carbon fourteen", "কাৰ্বন চৈদ্ধ"], ["carbon twelve", "কাৰ্বন বাৰ"], ["uranium two three eight", "ইউৰেনিয়াম দুই তিনি আঠ"], ["cobalt sixty", "কোবাল্ট ষাঠি"]], 0,
  "Living things keep a steady level of carbon fourteen, and after death it decays at a known rate, so the remaining amount gives the age.",
  "জীৱিত বস্তুত কাৰ্বন চৈদ্ধৰ মাত্ৰা স্থিৰ থাকে, আৰু মৃত্যুৰ পিছত জ্ঞাত হাৰত ক্ষয় হয়, সেয়ে বাকী থকা পৰিমাণে বয়স দিয়ে।");

add("physics-351",
  "The energy released in a nuclear reaction is given by",
  "পাৰমাণৱিক বিক্ৰিয়াত ওলোৱা শক্তি কিৰ দ্বাৰা দিয়া হয়",
  [["Einstein's relation E equals m c squared", "আইনষ্টাইনৰ E = m c বৰ্গ সম্পৰ্ক"], ["Newton's second law", "নিউটনৰ দ্বিতীয় সূত্ৰ"], ["Ohm's law", "ওমৰ সূত্ৰ"], ["Boyle's law", "বয়লৰ সূত্ৰ"]], 0,
  "A small mass defect multiplied by the square of the speed of light gives an enormous energy, which is why fission releases so much heat.",
  "সৰু ভৰ ঘাটি পোহৰৰ গতিৰ বৰ্গৰ সৈতে পূৰণ কৰিলে অতিশয় শক্তি দিয়ে, সেয়ে বিভাজনে ইমান তাপ এৰে।");

add("physics-352",
  "India's first nuclear reactor was named",
  "ভাৰতৰ প্ৰথম পাৰমাণৱিক চুল্লীৰ নাম",
  [["Apsara", "অপ্সৰা"], ["Kamini", "কামিনী"], ["Dhruva", "ধ্ৰুৱ"], ["Cirus", "চিৰাছ"]], 0,
  "Apsara, commissioned at Trombay in 1956, was India's first research reactor. Dhruva and Cirus came later.",
  "১৯৫৬ চনত ট্ৰম্বেত আৰম্ভ অপ্সৰা ভাৰতৰ প্ৰথম গৱেষণা চুল্লী আছিল। ধ্ৰুৱ আৰু চিৰাছ পিছত আহিল।");

add("physics-353",
  "Nuclear fusion reactions require very high temperature because",
  "পাৰমাণৱিক সংযোজন বিক্ৰিয়াত অতি উচ্চ উষ্ণতা লাগে কাৰণ",
  [["the nuclei must overcome electrostatic repulsion", "নিউক্লিয়াছবোৰে স্থিৰ-বৈদ্যুতিক বিকৰ্ষণ অতিক্ৰম কৰিব লাগে"], ["the fuel is very cold", "ইন্ধন অতি ঠাণ্ডা"], ["the products are heavier", "উৎপাদ গধুৰ"], ["gravity is absent", "মহাকৰ্ষণ নাই"]], 0,
  "Both nuclei are positive and repel each other, so they need great speed to come close enough to fuse. That is why the Sun's core is so hot.",
  "দুয়ো নিউক্লিয়াছ ধনাত্মক আৰু পৰস্পৰক বিকৰ্ষণ কৰে, সেয়ে মিলি যোৱাৰ ওচৰ চাপিবলৈ বহু বেগ লাগে। সেয়ে সূৰ্যৰ কেন্দ্ৰ অতি গৰম।");

add("physics-354",
  "Which particle was discovered by Chadwick?",
  "চাদৱিকে কোন কণিকা আৱিষ্কাৰ কৰিছিল",
  [["neutron", "নিউট্ৰন"], ["proton", "প্ৰটন"], ["electron", "ইলেক্ট্ৰন"], ["positron", "পজিট্ৰন"]], 0,
  "Chadwick found the neutral particle of about the proton's mass in 1932, which he called the neutron.",
  "চাদৱিকে ১৯৩২ চনত প্ৰটনৰ প্ৰায় সমান ভৰৰ প্ৰশান্ত কণিকা পালে, যাক তেওঁ নিউট্ৰন বুলি ক'লে।");

add("physics-355",
  "Radioactive decay is a",
  "ৰেডিঅ'সক্ৰিয় ক্ষয় এটা",
  [["spontaneous process unaffected by ordinary chemical conditions", "স্বতঃস্ফূৰ্ত প্ৰক্ৰিয়া যি সাধাৰণ ৰাসায়নিক অৱস্থাৰ দ্বাৰা নসলায়"], ["reversible chemical reaction", "উলটিব পৰা ৰাসায়নিক বিক্ৰিয়া"], ["process needing a catalyst", "অনুঘটক লগা প্ৰক্ৰিয়া"], ["process that needs high pressure", "উচ্চ চাপ লগা প্ৰক্ৰিয়া"]], 0,
  "Decay happens inside the nucleus, so heating, cooling or chemical combination does not change the rate. Only the number of nuclei matters.",
  "ক্ষয় নিউক্লিয়াছৰ ভিতৰত হয়, সেয়ে গৰম বা ঠাণ্ডা কৰা বা ৰাসায়নিক যৌগ গঠনে হাৰ নসলায়। কেবল নিউক্লিয়াছৰ সংখ্যাই ধৰে।");

add("physics-356",
  "In a nuclear reactor, the energy released appears mainly as",
  "পাৰমাণৱিক চুল্লীত ওলোৱা শক্তি মূলতঃ কি হিচাপে দেখা দিয়ে",
  [["heat", "তাপ"], ["light", "পোহৰ"], ["sound", "শব্দ"], ["electricity directly", "পোনপটীয়াকৈ বিদ্যুৎ"]], 0,
  "Fission fragments slow down and their kinetic energy becomes heat, which boils water to drive turbines. Electricity comes later.",
  "বিভাজনৰ টুকুৰাবোৰ ধীৰ হৈ তাৰ গতিশক্তি তাপ হয়, যি পানী উতলাই টাৰ্বাইন চলায়। বিদ্যুৎ পিছতহে হয়।");

/* ================= general-physics ================= */
useLeaf("general-physics");

add("physics-357",
  "The sky appears blue because",
  "আকাশ নীলা দেখা যায় কাৰণ",
  [["blue light is scattered more than red by air molecules", "বায়ুৰ অণুৱে ৰঙাতকৈ নীলা পোহৰ বেছি বিচ্ছুৰিত কৰে"], ["the atmosphere is blue in colour", "বায়ুমণ্ডল নীলা ৰঙৰ"], ["the sea reflects its colour", "সাগৰে নিজৰ ৰং প্ৰতিফলিত কৰে"], ["the sun emits only blue light", "সূৰ্যই কেবল নীলা পোহৰ এৰে"]], 0,
  "Short wavelengths scatter far more strongly, so blue from every direction reaches the eye. At sunset the light travels further and red dominates.",
  "চুটি তৰংগ দৈৰ্ঘ্য বহু বেছি বিচ্ছুৰিত হয়, সেয়ে সকলো দিশৰ নীলা চকুলৈ আহে। সূৰ্যাস্তত পোহৰ বেছি দূৰ যায় আৰু ৰঙাই প্ৰাধান্য পায়।");

add("physics-358",
  "The ozone layer protects living things from",
  "ওজোন স্তৰে জীৱক কিৰপৰা ৰক্ষা কৰে",
  [["ultraviolet radiation", "অতি-বেঙুনীয়া ৰশ্মি"], ["infrared radiation", "অৱ-ৰক্ত ৰশ্মি"], ["radio waves", "ৰেডিঅ' তৰংগ"], ["visible light", "দৃশ্যমান পোহৰ"]], 0,
  "Ozone absorbs most of the ultraviolet rays from the Sun, which would otherwise damage skin and genetic material. Infrared is heat and is not blocked.",
  "ওজোনে সূৰ্যৰ বেছিভাগ অতি-বেঙুনীয়া ৰশ্মি শোষে, যি নহ'লে ছালি আৰু বংশগতি পদাৰ্থ নষ্ট কৰে। অৱ-ৰক্ত ৰশ্মি তাপ আৰু ইয়াক ৰোধ নকৰে।");

add("physics-359",
  "A solar cell converts",
  "সৌৰ কোষে সলনি কৰে",
  [["light energy into electrical energy", "পোহৰ শক্তি বৈদ্যুতিক শক্তিলৈ"], ["heat into light", "তাপ পোহৰলৈ"], ["electricity into light", "বিদ্যুৎ পোহৰলৈ"], ["light into heat only", "কেৱল পোহৰ তাপলৈ"]], 0,
  "A solar cell uses the photovoltaic effect to produce a voltage directly from light. A solar water heater, by contrast, turns light into heat.",
  "সৌৰ কোষে ফ'ট'ভল্টেইক প্ৰভাৱ ব্যৱহাৰ কৰি পোহৰৰপৰা পোনপটীয়াকৈ ভল্টেজ দিয়ে। সৌৰ পানী গৰম কৰা যন্ত্ৰই পোহৰ তাপলৈ সলায়।");

add("physics-360",
  "The nearest star to the Earth after the Sun is",
  "সূৰ্যৰ পিছত পৃথিৱীৰ নিকটতম তৰা",
  [["Proxima Centauri", "প্ৰক্সিমা চেণ্টৰি"], ["Sirius", "ছিৰিয়াছ"], ["Polaris", "ধ্ৰুৱতৰা"], ["Alpha Centauri A", "আলফা চেণ্টৰি এ"]], 0,
  "Proxima Centauri is about four point two light years away, slightly closer than its companion Alpha Centauri A. Sirius is far more distant.",
  "প্ৰক্সিমা চেণ্টৰি প্ৰায় চাৰি দশমিক দুই আলোক বৰ্ষ দূৰত, তাৰ সংগী আলফা চেণ্টৰি এ তকৈ অলপ ওচৰত। ছিৰিয়াছ বহু দূৰত।");

add("physics-361",
  "Which of the following is used as a semiconductor in electronic devices?",
  "তলৰ কোনটো ইলেক্ট্ৰনিক সজুলিত অৰ্ধপৰিবাহী হিচাপে ব্যৱহৃত হয়",
  [["silicon", "ছিলিকন"], ["copper", "তাম"], ["aluminium", "এলুমিনিয়াম"], ["glass", "কাচ"]], 0,
  "Silicon conducts only partly and can be doped to control its behaviour, which makes transistors and diodes possible. Copper conducts too well.",
  "ছিলিকনে আংশিকভাৱে পৰিবহন কৰে আৰু ড'প কৰি আচৰণ নিয়ন্ত্ৰণ কৰিব পাৰি, সেয়ে ট্ৰান্সিষ্টৰ আৰু ডায়'ড সম্ভৱ। তামে অতি ভাল পৰিবহন কৰে।");

add("physics-362",
  "The slope of a distance-time graph gives",
  "দূৰত্ব-সময় লেখৰ ঢালে কি দিয়ে",
  [["speed", "দ্ৰুতি"], ["acceleration", "ত্বৰণ"], ["force", "বল"], ["momentum", "ভৰবেগ"]], 0,
  "Distance divided by time is speed, so the gradient of that graph is speed. The slope of a velocity-time graph gives acceleration.",
  "দূৰত্ব ভাগ সময় দ্ৰুতি, সেয়ে সেই লেখৰ ঢাল দ্ৰুতি। বেগ-সময় লেখৰ ঢালে ত্বৰণ দিয়ে।");

add("physics-363",
  "Household appliances in India are connected in parallel so that",
  "ভাৰতত ঘৰুৱা সজুলিবোৰ সমান্তৰালভাৱে সংযোগ কৰা হয় যাতে",
  [["each gets the full supply voltage and can be switched separately", "প্ৰত্যেকে সম্পূৰ্ণ ভল্টেজ পায় আৰু সুকীয়াকৈ বন্ধ কৰিব পাৰি"], ["the current is the same in all", "সকলোত প্ৰবাহ একেই হয়"], ["the total resistance increases", "মুঠ ৰোধ বাঢ়ে"], ["less current is drawn", "কম প্ৰবাহ টানা হয়"]], 0,
  "In parallel every branch sees the same voltage, so one appliance can be switched off without affecting the others. Series would give the same current to all.",
  "সমান্তৰালত প্ৰতিটো শাখাই একেই ভল্টেজ পায়, সেয়ে এটা বন্ধ কৰিলেও বাকীবোৰ নষ্ট নহয়। শ্ৰেণীত সকলোলৈ একেই প্ৰবাহ যাব।");

add("physics-364",
  "The value of acceleration due to gravity is taken as",
  "মহাকৰ্ষণজনিত ত্বৰণৰ মান ধৰা হয়",
  [["9.8 metres per second squared", "৯.৮ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["6.67 metres per second squared", "৬.৬৭ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["3 metres per second squared", "৩ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"], ["98 metres per second squared", "৯৮ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ"]], 0,
  "Near the Earth's surface g is about nine point eight metres per second squared. The figure 6.67 belongs to the gravitational constant G.",
  "পৃথিৱীৰ পৃষ্ঠৰ ওচৰত g প্ৰায় ন দশমিক আঠ মিটাৰ প্ৰতি ছেকেণ্ড বৰ্গ। ৬.৬৭ মহাকৰ্ষণ ধ্ৰুৱক G ৰ।");

add("physics-365",
  "A body is in equilibrium when the net force acting on it is",
  "বস্তু এটা সাম্যাৱস্থাত থাকে যেতিয়া তাৰ ওপৰত ক্ৰিয়া কৰা মুঠ বল",
  [["zero", "শূন্য"], ["maximum", "সৰ্বোচ্চ"], ["equal to its weight", "তাৰ ওজনৰ সমান"], ["infinite", "অসীম"]], 0,
  "With no net force there is no acceleration, so the body stays at rest or moves with constant velocity. This is the condition for equilibrium.",
  "মুঠ বল নাথাকিলে ত্বৰণ নহয়, সেয়ে বস্তু স্থিৰ বা সুষম বেগেৰে থাকে। এইয়া সাম্যাৱস্থাৰ চৰ্ত।");

add("physics-366",
  "The unit of frequency is the",
  "কম্পনাংকৰ একক",
  [["hertz", "হাৰ্টজ"], ["second", "ছেকেণ্ড"], ["metre", "মিটাৰ"], ["newton", "নিউটন"]], 0,
  "One hertz is one cycle per second, so frequency is measured in hertz. The second measures the time period, which is its reciprocal.",
  "এক হাৰ্টজ মানে প্ৰতি ছেকেণ্ডত এক চক্ৰ, সেয়ে কম্পনাংক হাৰ্টজত জোখা হয়। ছেকেণ্ডে সময় কাল জোখে, যি ইয়াৰ ব্যস্তানুপাত।");

add("physics-367",
  "Which of the following is a scalar quantity?",
  "তলৰ কোনটো অদিশ ৰাশি",
  [["work", "কাম"], ["force", "বল"], ["velocity", "বেগ"], ["acceleration", "ত্বৰণ"]], 0,
  "Work has size but no direction in the vector sense, so it is a scalar. Force, velocity and acceleration all carry direction.",
  "কামৰ পৰিমাণ আছে কিন্তু সদিশ অৰ্থত দিশ নাই, সেয়ে ই অদিশ। বল, বেগ আৰু ত্বৰণত দিশ থাকে।");

add("physics-368",
  "The pressure of the atmosphere decreases as we go",
  "আমি ক'লৈ গ'লে বায়ুমণ্ডলৰ চাপ কমে",
  [["upwards from sea level", "সমুদ্ৰপৃষ্ঠৰপৰা ওপৰলৈ"], ["downwards into a mine", "খনিৰ তললৈ"], ["towards the equator", "বিষুৱৰেখালৈ"], ["towards the sea", "সমুদ্ৰলৈ"]], 0,
  "Air pressure comes from the weight of the air above, so it falls with height. Below sea level there is more air above and pressure rises.",
  "বায়ুৰ চাপ ওপৰৰ বায়ুৰ ওজনৰপৰা হয়, সেয়ে উচ্চতাৰ সৈতে কমে। সমুদ্ৰপৃষ্ঠৰ তলত ওপৰত বেছি বায়ু থাকে আৰু চাপ বাঢ়ে।");

add("physics-369",
  "A fuse in an electric circuit is used to",
  "বৈদ্যুতিক বৰ্তনীত ফিউজ কিৰ বাবে ব্যৱহৃত হয়",
  [["break the circuit when the current is too high", "প্ৰবাহ অতি বেছি হ'লে বৰ্তনী ভাঙিবলৈ"], ["increase the current", "প্ৰবাহ বঢ়াবলৈ"], ["store electric charge", "বৈদ্যুতিক আধান সাঁচিবলৈ"], ["change AC to DC", "AC ক DC লৈ সলনি কৰিবলৈ"]], 0,
  "The fuse wire melts when the current exceeds its rating, cutting off the supply before wiring or appliances are damaged.",
  "প্ৰবাহ তাৰ ধাৰণক্ষমতাৰ ওপৰত গ'লে ফিউজৰ তাঁৰ গলি যায়, আৰু তাৰৰ বা সজুলি নষ্ট হোৱাৰ আগতে যোগান কাটি দিয়ে।");

add("physics-370",
  "The energy change in a torch cell is from",
  "টৰ্চৰ কোষত শক্তিৰ পৰিৱৰ্তন হয় কিৰপৰা",
  [["chemical to electrical", "ৰাসায়নিকৰপৰা বৈদ্যুতিকলৈ"], ["electrical to chemical", "বৈদ্যুতিকৰপৰা ৰাসায়নিকলৈ"], ["light to electrical", "পোহৰৰপৰা বৈদ্যুতিকলৈ"], ["heat to electrical", "তাপৰপৰা বৈদ্যুতিকলৈ"]], 0,
  "A cell stores chemical energy and releases it as electrical energy when the circuit is closed. Charging a battery is the reverse.",
  "কোষে ৰাসায়নিক শক্তি সাঁচি বৰ্তনী বন্ধ হ'লে বৈদ্যুতিক শক্তি হিচাপে এৰে। বেটেৰী চাৰ্জ কৰা ওলোটা প্ৰক্ৰিয়া।");

add("physics-371",
  "Which of the following has the highest speed?",
  "তলৰ কোনটোৰ গতি আটাই বেছি",
  [["light", "পোহৰ"], ["sound in steel", "ইস্পাতত শব্দ"], ["a jet aircraft", "জেট বিমান"], ["a rifle bullet", "ৰাইফলৰ গুলি"]], 0,
  "Light travels at about three hundred thousand kilometres per second, far beyond any of the others. Sound in steel is only about five kilometres per second.",
  "পোহৰে প্ৰতি ছেকেণ্ডত প্ৰায় তিনি লাখ কিলোমিটাৰ যায়, বাকীবোৰতকৈ বহু বেছি। ইস্পাতত শব্দ কেবল প্ৰায় পাঁচ কিলোমিটাৰ প্ৰতি ছেকেণ্ড।");

add("physics-372",
  "The force of gravity on a body of mass 1 kg is about",
  "১ কিলোগ্ৰাম ভৰৰ বস্তুৰ ওপৰত মহাকৰ্ষণ বল প্ৰায়",
  [["9.8 newton", "৯.৮ নিউটন"], ["1 newton", "১ নিউটন"], ["98 newton", "৯৮ নিউটন"], ["0.98 newton", "০.৯৮ নিউটন"]], 0,
  "Weight is mass times g, so one kilogram weighs about nine point eight newton. One newton would be only about a hundred gram.",
  "ওজন = ভৰ গুণ g, সেয়ে এক কিলোগ্ৰামৰ ওজন প্ৰায় ন দশমিক আঠ নিউটন। এক নিউটন প্ৰায় এশ গ্ৰামৰ হ'ব।");

add("physics-373",
  "A device that converts electrical energy into mechanical energy is a",
  "বৈদ্যুতিক শক্তিক যান্ত্ৰিক শক্তিলৈ সলনি কৰা যন্ত্ৰটো",
  [["motor", "মটৰ"], ["generator", "জেনেৰেটৰ"], ["transformer", "ট্ৰান্সফৰ্মাৰ"], ["rectifier", "ৰেক্টিফায়াৰ"]], 0,
  "A motor passes current through a coil in a magnetic field, and the resulting force turns the shaft. A generator does the opposite.",
  "মটৰে চুম্বক ক্ষেত্ৰত কুণ্ডলীৰ মাজেৰে প্ৰবাহ পঠিয়ায়, আৰু ফলত হোৱা বলে দণ্ড ঘূৰায়। জেনেৰেটৰে ওলোটা কৰে।");

add("physics-374",
  "The speed of light in vacuum is about",
  "শূন্যত পোহৰৰ গতি প্ৰায়",
  [["3 times ten to the power eight metres per second", "৩ গুণ দহৰ ঘাত আঠ মিটাৰ প্ৰতি ছেকেণ্ড"], ["3 times ten to the power six metres per second", "৩ গুণ দহৰ ঘাত ছয় মিটাৰ প্ৰতি ছেকেণ্ড"], ["340 metres per second", "৩৪০ মিটাৰ প্ৰতি ছেকেণ্ড"], ["1500 metres per second", "১৫০০ মিটাৰ প্ৰতি ছেকেণ্ড"]], 0,
  "Light covers about three hundred thousand kilometres each second, which is three times ten to the power eight metres per second.",
  "পোহৰে প্ৰতি ছেকেণ্ডত প্ৰায় তিনি লাখ কিলোমিটাৰ যায়, অৰ্থাৎ ৩ গুণ দহৰ ঘাত আঠ মিটাৰ প্ৰতি ছেকেণ্ড।");

add("physics-375",
  "Which of the following statements about mass and weight is correct?",
  "ভৰ আৰু ওজনৰ বিষয়ে তলৰ কোনটো সঁচা",
  [["mass is constant everywhere while weight changes with g", "ভৰ সকলো ঠাইতে স্থিৰ কিন্তু ওজন g ৰ সৈতে সলনি হয়"], ["both are constant everywhere", "দুয়োটা সকলো ঠাইতে স্থিৰ"], ["weight is constant everywhere", "ওজন সকলো ঠাইতে স্থিৰ"], ["mass changes with g", "ভৰ g ৰ সৈতে সলনি হয়"]], 0,
  "Mass measures the amount of matter and does not change, but weight is a force that depends on the local value of g.",
  "ভৰে পদাৰ্থৰ পৰিমাণ জোখে আৰু নসলায়, কিন্তু ওজন এটা বল যি স্থানীয় g ৰ ওপৰত নিৰ্ভৰ কৰে।");

module.exports = { questions: Q };



