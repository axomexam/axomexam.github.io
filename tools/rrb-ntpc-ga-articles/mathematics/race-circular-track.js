"use strict";

/* RRB NTPC Mathematics — Races & Circular Tracks. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Races & Circular Tracks for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে দৌৰ আৰু বৃত্তাকাৰ পথ" },
  p: {
    en: [
      "Races and circular tracks is the chapter in which the speed and distance relations are applied to a contest between two runners, either on a straight course or around a closed track, and it appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter has two halves that look different but rest on the same idea of relative speed. The first half, the races, compares the distances two runners cover in the same time; the second half, the circular track, compares the times two runners take to gain a full lap on each other or to return to the starting point.",
      "A race is described by the margin by which the winner beats the loser. If A beats B by ten metres in a hundred-metre race, then the whole race lasted exactly as long as A took to run a hundred metres, and in that time B ran ninety metres. The ratio of the speeds is therefore the ratio of the distances covered in the same time, which is a hundred to ninety, or ten to nine. This single conversion, from a margin of victory to a ratio of speeds, is the foundation of every race question in the chapter.",
      "The start questions add the concept of a handicap. When A gives B a start of some metres, B is allowed to begin that many metres ahead of the starting line. If A gives B a start of twenty metres in a two-hundred-metre race and both finish together, then when A runs the full two hundred metres, B runs only a hundred and eighty, so the ratio of the speeds is two hundred to a hundred and eighty, which is ten to nine. The start is simply a reduction in the distance B has to cover.",
      "The questions that give both a start and a winning margin are solved by the same principle with one extra subtraction. If A gives B a start of twenty-five metres in a two-hundred-metre race and still beats him by ten metres, then when A finishes the two hundred metres, B has covered only two hundred minus twenty-five minus ten, which is a hundred and sixty-five metres. The ratio of the speeds is therefore two hundred to a hundred and sixty-five. Reading the question carefully to see whether the margin is in metres or in seconds is the only care these questions need.",
      "The questions that give the margin both in metres and in seconds are the most elegant in the races half. If A beats B by ten metres or by two seconds, then B takes two seconds to cover those ten metres, which gives B's speed at once. From B's speed the time B took for the whole race follows, and subtracting the margin in seconds gives A's time, and hence A's speed. Two facts that look redundant turn out to determine every quantity, and the candidate who notices the double statement answers the question in three lines.",
      "The questions that give a chain of results, such as A beating B and B beating C, are solved by multiplying the speed ratios. If A beats B by a hundred metres in a kilometre and B beats C by two hundred metres in a kilometre, then A to B is a thousand to nine hundred and B to C is a thousand to eight hundred. Multiplying gives A to C, and from this ratio the margin between A and C in a fresh race follows. The chain always reduces to a product of ratios, and the only care is to express each ratio with the same total distance.",
      "The circular track half begins with the meeting at the starting point. Two runners starting together from the same point meet again at the start when each has completed a whole number of rounds, which happens after the least common multiple of their lap times. Two runners who take eight and twelve minutes for a round meet at the start after the least common multiple, which is twenty-four minutes, and the faster has then completed three rounds. This single idea of the least common multiple answers the whole family of start-point questions.",
      "The meeting-elsewhere questions use the relative speed. Two runners moving in the same direction meet whenever the faster has gained exactly one full lap on the slower, so the time to the first meeting is the length of the track divided by the difference of the speeds. Two runners moving in opposite directions meet whenever their combined distance equals one lap, so the time is the length of the track divided by the sum of the speeds. Recognising whether the two runners are moving with or against each other decides whether the speeds add or subtract.",
      "The repeated-meeting questions extend the same idea. Once the time of the first meeting is known, the runners meet again after every equal interval of that length, so the number of meetings in a given time is that time divided by the interval. If two runners on a four-hundred-metre track moving in opposite directions at eight and twelve metres per second meet every twenty seconds, then in five minutes they meet fifteen times. The whole family is one division once the interval is found.",
      "The questions that give the lap times rather than the speeds are solved by converting the times to speeds. If A takes forty seconds and B takes fifty seconds for a four-hundred-metre round, then A's speed is ten metres per second and B's is eight, and the faster laps the slower after the track divided by the difference of the speeds. The two halves of the chapter therefore use the same two tools, the ratio of distances in equal time for the races and the relative speed for the circular track.",
      "Finally, the chapter rewards two habits. The first is to fix the common time for the races, which is always the winner's finishing time, and to write each runner's distance in that time before forming any ratio. The second is to fix the common distance for the circular track, which is one lap, and to ask whether the runners are moving with or against each other before adding or subtracting the speeds. With these habits the races and circular track questions become quick and reliable, and the same relative-speed idea carries directly into problems on trains and boats.",
    ],
    as: [
      "দৌৰ আৰু বৃত্তাকাৰ পথ হৈছে সেই অধ্যায় য'ত গতি আৰু দূৰত্বৰ সম্পৰ্ক দুজন দৌৰবিদৰ মাজৰ এটা প্ৰতিযোগিতাত প্ৰয়োগ কৰা হয়, হয় পোন পথত নহয় বৃত্তাকাৰ পথত, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টোৰ দুটা অংশ দেখিবলৈ বেলেগ যদিও দুয়ো একেই আপেক্ষিক গতিৰ ধাৰণাৰ ওপৰত ৰয়। প্ৰথম অংশ, দৌৰ, এটা সময়ত দুজন দৌৰবিদে কৰা দূৰত্ব তুলনা কৰে; দ্বিতীয় অংশ, বৃত্তাকাৰ পথ, দুজন দৌৰবিদে ইজনে সিজনক এটা পূৰ্ণ পাক আগ বঢ়াবলৈ বা আৰম্ভণি বিন্দুলৈ ঘূৰি আহিবলৈ লোৱা সময় তুলনা কৰে।",
      "এটা দৌৰক বিজেতাই পৰাস্ত কৰা ব্যৱধানৰ জৰিয়তে বৰ্ণনা কৰা হয়। এশ মিটাৰৰ দৌৰত A এ B ক দহ মিটাৰত পৰাস্ত কৰিলে, গোটেই দৌৰটো A এ এশ মিটাৰ দৌৰিবলৈ লোৱা সময়তকৈ বেছি নহয়, আৰু সেই সময়ত B এ নব্বৈ মিটাৰ দৌৰিছে। গতিকে গতিৰ অনুপাত একেই সময়ত কৰা দূৰত্বৰ অনুপাত, অৰ্থাৎ এশৰ লগত নব্বৈ, বা দহৰ লগত ন। বিজয়ৰ ব্যৱধানৰ পৰা গতিৰ অনুপাতলৈ এই এটা ৰূপান্তৰেই অধ্যায়টোৰ প্ৰতিটো দৌৰৰ প্ৰশ্নৰ ভেটি।",
      "আৰম্ভণিৰ প্ৰশ্নবোৰে হেণ্ডিকেপৰ ধাৰণা যোগ কৰে। A এ B ক কিছু মিটাৰৰ আগ ধৰি দিলে, B ক আৰম্ভণি ৰেখাৰ সেই কেইমিটাৰ আগত আৰম্ভ কৰিবলৈ দিয়া হয়। দুশ মিটাৰৰ দৌৰত A এ B ক বিশ মিটাৰৰ আগ ধৰি দি দুয়ো একেলগে শেষ কৰিলে, A এ গোটেই দুশ মিটাৰ দৌৰোঁতে B এ কেৱল এশ আশী মিটাৰ দৌৰে, গতিকে গতিৰ অনুপাত দুশৰ লগত এশ আশী, অৰ্থাৎ দহৰ লগত ন। আগ ধৰি দিয়াটো B এ অতিক্ৰম কৰিবলগীয়া দূৰত্বৰ এটা হ্ৰাস মাত্ৰ।",
      "আগ ধৰি দিয়া আৰু বিজয়ৰ ব্যৱধান দুয়োটা দিয়া প্ৰশ্নবোৰ একেই নীতিৰে এটা অতিৰিক্ত বিয়োগেৰে সমাধান কৰা হয়। দুশ মিটাৰৰ দৌৰত A এ B ক পঁচিশ মিটাৰৰ আগ ধৰি দিয়েও দহ মিটাৰত পৰাস্ত কৰিলে, A এ দুশ মিটাৰ শেষ কৰোঁতে B এ কেৱল দুশ বিয়োগ পঁচিশ বিয়োগ দহ, অৰ্থাৎ এশ পঁয়ষট্টি মিটাৰ অতিক্ৰম কৰিছে। গতিকে গতিৰ অনুপাত দুশৰ লগত এশ পঁয়ষট্টি। ব্যৱধান মিটাৰত নে ছেকেণ্ডত সেয়া সাৱধানে পঢ়াটোৱেই এই প্ৰশ্নবোৰৰ একমাত্ৰ সাৱধানতা।",
      "ব্যৱধান মিটাৰত আৰু ছেকেণ্ডত দুয়োটা দিয়া প্ৰশ্নবোৰ দৌৰৰ আধাত আটাইতকৈ সুন্দৰ। A এ B ক দহ মিটাৰ বা দুই ছেকেণ্ডত পৰাস্ত কৰিলে, B এ সেই দহ মিটাৰ সামৰিবলৈ দুই ছেকেণ্ড লয়, যি তৎক্ষণাত B ৰ গতি দিয়ে। B ৰ গতিৰ পৰা গোটেই দৌৰৰ B ৰ সময় ওলায়, আৰু ছেকেণ্ডত থকা ব্যৱধান বিয়োগ কৰিলে A ৰ সময়, আৰু তাৰ পৰা A ৰ গতি ওলায়। অতিৰিক্ত যেন লগা দুটা তথ্যই প্ৰতিটো ৰাশি নিৰ্ণয় কৰে, আৰু দুয়োটা কথন লক্ষ্য কৰা প্ৰাৰ্থীয়ে প্ৰশ্নটো তিনিটা শাৰীত সমাধান কৰে।",
      "শৃংখলাবদ্ধ ফলাফল দিয়া প্ৰশ্নবোৰ, যেনে A এ B ক আৰু B এ C ক পৰাস্ত কৰা, গতিৰ অনুপাত পূৰণ কৰি সমাধান কৰা হয়। এটা কিলোমিটাৰত A এ B ক এশ মিটাৰ আৰু B এ C ক দুশ মিটাৰত পৰাস্ত কৰিলে, A ৰ লগত B হ'ল এহেজাৰৰ লগত নশ, আৰু B ৰ লগত C হ'ল এহেজাৰৰ লগত আঠশ। পূৰণ কৰিলে A ৰ লগত C ওলায়, আৰু এই অনুপাতৰ পৰা নতুন দৌৰত A আৰু C ৰ মাজৰ ব্যৱধান ওলায়। শৃংখলাটো সদায় অনুপাতৰ গুণফললৈ নামি আহে।",
      "বৃত্তাকাৰ পথৰ আধা আৰম্ভণি বিন্দুত লগ হোৱাৰ পৰা আৰম্ভ হয়। একেই বিন্দুৰ পৰা একেলগে আৰম্ভ কৰা দুজন দৌৰবিদে পুনৰ আৰম্ভণিত লগ পায় যেতিয়া প্ৰত্যেকে পূৰ্ণসংখ্যক পাক সম্পূৰ্ণ কৰে, যি সিহঁতৰ পাকৰ সময়ৰ ল.সা.গু.ৰ পিছত ঘটে। আঠ আৰু বাৰ মিনিটত এটা পাক কৰা দুজন দৌৰবিদ ল.সা.গু., অৰ্থাৎ চৌবিশ মিনিটৰ পিছত আৰম্ভণিত লগ পায়, আৰু দ্ৰুতজনে তেতিয়া তিনি পাক সম্পূৰ্ণ কৰে। ল.সা.গু.ৰ এই এটা ধাৰণাই আৰম্ভণি-বিন্দুৰ গোটেই পৰিয়ালৰ উত্তৰ দিয়ে।",
      "আন ঠাইত লগ হোৱাৰ প্ৰশ্নবোৰে আপেক্ষিক গতি ব্যৱহাৰ কৰে। একেই দিশত চলা দুজন দৌৰবিদে লগ পায় যেতিয়া দ্ৰুতজনে লেহেমীয়াজনৰ ওপৰত ঠিক এটা পূৰ্ণ পাক আগ বঢ়ায়, গতিকে প্ৰথম লগ হোৱাৰ সময় = পথৰ দীঘ ÷ গতিৰ পাৰ্থক্য। বিপৰীত দিশত চলা দুজন দৌৰবিদে লগ পায় যেতিয়া সিহঁতৰ একত্ৰিত দূৰত্ব এটা পাকৰ সমান হয়, গতিকে সময় = পথৰ দীঘ ÷ গতিৰ যোগফল। দৌৰবিদ দুজন ইজনে সিজনৰ ফালে নে একেই দিশত চলিছে সেয়া চিনি পোৱাটোৱেই গতি যোগ নে বিয়োগ হ'ব সেয়া নিৰ্ণয় কৰে।",
      "পুনৰ পুনৰ লগ হোৱাৰ প্ৰশ্নবোৰে একেই ধাৰণা আগবঢ়ায়। প্ৰথম লগ হোৱাৰ সময় জনা হ'লে, দৌৰবিদসকলে প্ৰতি সেই একেই ব্যৱধানৰ পিছত পুনৰ লগ পায়, গতিকে এটা দিয়া সময়ত লগ হোৱাৰ সংখ্যা = সেই সময় ÷ ব্যৱধান। চাৰিশ মিটাৰৰ পথত আঠ আৰু বাৰ মিটাৰ প্ৰতি ছেকেণ্ড গতিত বিপৰীত দিশত চলা দুজন দৌৰবিদে প্ৰতি বিশ ছেকেণ্ডত লগ পালে, পাঁচ মিনিটত তেওঁলোক পোন্ধৰ বাৰ লগ পায়। ব্যৱধান বিচৰাৰ পিছত গোটেই পৰিয়াল এটা হৰণ।",
      "গতিৰ সলনি পাকৰ সময় দিয়া প্ৰশ্নবোৰ সময়ক গতিলৈ ৰূপান্তৰ কৰি সমাধান কৰা হয়। A এ চাৰিশ মিটাৰৰ এটা পাকত চল্লিশ ছেকেণ্ড আৰু B এ পঞ্চাশ ছেকেণ্ড ল'লে, A ৰ গতি দহ মিটাৰ প্ৰতি ছেকেণ্ড আৰু B ৰ আঠ, আৰু দ্ৰুতজনে পথ ÷ গতিৰ পাৰ্থক্যৰ পিছত লেহেমীয়াজনক আগ বঢ়ায়। গতিকে অধ্যায়টোৰ দুয়ো আধাই একেই দুটা সঁজুলি ব্যৱহাৰ কৰে, দৌৰৰ বাবে সমান সময়ত দূৰত্বৰ অনুপাত আৰু বৃত্তাকাৰ পথৰ বাবে আপেক্ষিক গতি।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল দৌৰৰ বাবে সাধাৰণ সময় নিৰ্ধাৰণ কৰা, যি সদায় বিজেতাৰ সমাপ্তিৰ সময়, আৰু যিকোনো অনুপাত গঢ়াৰ আগতে সেই সময়ত প্ৰত্যেক দৌৰবিদৰ দূৰত্ব লিখা। দ্বিতীয়টো হ'ল বৃত্তাকাৰ পথৰ বাবে সাধাৰণ দূৰত্ব নিৰ্ধাৰণ কৰা, যি এটা পাক, আৰু গতি যোগ নে বিয়োগ কৰাৰ আগতে দৌৰবিদসকল ইজনে সিজনৰ ফালে নে একেই দিশত চলিছে সেয়া সোধা। এই অভ্যাসৰ সৈতে দৌৰ আৰু বৃত্তাকাৰ পথৰ প্ৰশ্নবোৰ দ্ৰুত আৰু নিৰ্ভৰযোগ্য হৈ পৰে।",
      "দৌৰৰ প্ৰশ্নত এটা গুৰুত্বপূৰ্ণ কথা মনত ৰখা উচিত: ব্যৱধান সদায় বিজেতাৰ সমাপ্তিৰ সময়ত জোখা হয়। যদি A এ B ক দহ মিটাৰত পৰাস্ত কৰে, ইয়াৰ অৰ্থ এইটো নহয় যে B এ A তকৈ দহ মিটাৰ কম দৌৰিলে; ইয়াৰ অৰ্থ A এ দুশ মিটাৰ দৌৰি শেষ কৰাৰ সময়ত B এ দুশৰ পৰা দহ কম, অৰ্থাৎ এশ নব্বৈ মিটাৰ দৌৰিছিল। এই সূক্ষ্ম পাৰ্থক্যটো স্পষ্ট হ'লে প্ৰতিটো দৌৰৰ প্ৰশ্ন সহজ হৈ পৰে আৰু ভুলৰ সম্ভাৱনা কমি যায়।",
      "বৃত্তাকাৰ পথৰ প্ৰশ্নত আটাইতকৈ সচৰাচৰ ভুলটো হ'ল গতি যোগ কৰিব নে বিয়োগ কৰিব সেয়া ঠিক কৰাত। একেই দিশত চলা দুজনৰ বাবে আপেক্ষিক গতি পাৰ্থক্য, আৰু বিপৰীত দিশত চলা দুজনৰ বাবে যোগফল। যদি প্ৰশ্নত 'একে দিশত' বা 'বিপৰীত দিশত' শব্দ নাথাকে, তেন্তে প্ৰথমে সেইটো নিৰ্ণয় কৰি লোৱা উচিত, কাৰণ শুদ্ধ আপেক্ষিক গতিয়েই শুদ্ধ উত্তৰৰ চাবি। এই এটা সিদ্ধান্ত স্পষ্ট হ'লে বৃত্তাকাৰ পথৰ গোটেই পৰিয়াল সৰল হৈ পৰে।",
      "আৰম্ভণি বিন্দুত লগ হোৱাৰ প্ৰশ্নত সময়ৰ ল.সা.গু. বিচৰাটোৱেই মূল পদক্ষেপ। দুজন দৌৰবিদে এটা পাকত ক্ৰমে ৬ আৰু ৮ মিনিট ল'লে, সিহঁত আৰম্ভণিত লগ পাব ল.সা.গু.(৬, ৮) = ২৪ মিনিটৰ পিছত, আৰু দ্ৰুতজনে ২৪ ÷ ৬ = ৪ পাক সম্পূৰ্ণ কৰে। তিনিজন দৌৰবিদৰ বাবে সময়ৰ ল.সা.গু. ল'ব লাগে, আৰু এই এটা পদক্ষেপেই আৰম্ভণি-বিন্দুৰ গোটেই পৰিয়ালৰ উত্তৰ দিয়ে।",
      "কিছুমান প্ৰশ্নত লগ হোৱাৰ সংখ্যা সোধা হয়, য'ত এটা নিৰ্দিষ্ট সময়ত কিমান বাৰ লগ পায় সেয়া বিচৰা হয়। এনে প্ৰশ্নত প্ৰথমে এটা লগ হোৱাৰ ব্যৱধান = পথ ÷ আপেক্ষিক গতি বিচাৰি, তাৰ পিছত দিয়া সময়ক সেই ব্যৱধানৰে হৰণ কৰা হয়। যদি দুজন দৌৰবিদে প্ৰতি ২৫ ছেকেণ্ডত লগ পায় আৰু মুঠ সময় ৩০০ ছেকেণ্ড হয়, তেন্তে লগ হোৱাৰ সংখ্যা ৩০০ ÷ ২৫ = ১২। এই প্ৰশ্নবোৰ দ্ৰুত আৰু আপেক্ষিক গতি স্পষ্ট হ'লে ভুল নহয়।",
      "পৰীক্ষাত দৌৰ আৰু বৃত্তাকাৰ পথৰ প্ৰশ্নবোৰ প্ৰায়ে বাস্তৱ পৰিস্থিতিৰ ৰূপত আহে, যেনে এটা ষ্টেডিয়ামৰ পথ, এখন খেলপথাৰ, বা দুজন খেলুৱৈৰ মাজৰ প্ৰতিযোগিতা। এনে ক্ষেত্ৰত দৌৰৰ বাবে সমান সময়ত দূৰত্বৰ অনুপাত আৰু বৃত্তাকাৰ পথৰ বাবে আপেক্ষিক গতি ব্যৱহাৰ কৰা হয়। বাস্তৱ পৰিস্থিতিৰ ভাষা গাণিতিক গঠনটো সলনি নকৰে, গতিকে একেই পদ্ধতি প্ৰয়োগ কৰিব পাৰি আৰু ভয় খোৱাৰ প্ৰয়োজন নাই।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: দৌৰ আৰু বৃত্তাকাৰ পথ অধ্যায়টো ৰে'লগাড়ী আৰু নাও-সোঁত অধ্যায়ৰ সৈতে ঘনিষ্ঠভাৱে জড়িত, কাৰণ তিনিওটাতে আপেক্ষিক গতিৰ একেই ধাৰণা ব্যৱহাৰ কৰা হয়। এই তিনিও অধ্যায় একেলগে চৰ্চা কৰিলে আপেক্ষিক গতিৰ ধাৰণা গভীৰভাৱে প্ৰতিষ্ঠিত হয়, আৰু প্ৰতিটো অধ্যায়ৰ প্ৰশ্নবোৰ আন দুটা অধ্যায়ৰ বাবে সঁজুলি হিচাপে কাম কৰে। এই সংযোগ চিনি পোৱাটোৱেই এই অধ্যায়বোৰত দক্ষতাৰ চাবি।",
    ],
  },
  list: {
    en: [
      "In a race the common time is the winner's finishing time.",
      "A beats B by 10 m in 100 m: speeds are in the ratio 100 : 90 = 10 : 9.",
      "A start of x m reduces the distance the other runner must cover by x.",
      "Start + margin: the loser's distance = total − start − margin.",
      "Margin in metres and seconds: the seconds give the loser's speed directly.",
      "Chain of results: multiply the speed ratios to get the end-to-end ratio.",
      "Meet at the start: after the LCM of the lap times.",
      "Same direction: time to meet = track ÷ (difference of speeds).",
      "Opposite directions: time to meet = track ÷ (sum of speeds).",
      "Meetings repeat every equal interval; count = total time ÷ interval.",
    ],
    as: [
      "দৌৰত সাধাৰণ সময় হৈছে বিজেতাৰ সমাপ্তিৰ সময়।",
      "১০০ মি.ত A এ B ক ১০ মি.ত পৰাস্ত কৰে: গতিৰ অনুপাত ১০০ : ৯০ = ১০ : ৯।",
      "x মি.ৰ আগ ধৰি দিলে আনজন দৌৰবিদে অতিক্ৰম কৰিবলগীয়া দূৰত্ব x ৰে কমি যায়।",
      "আগ ধৰি দিয়া + ব্যৱধান: পৰাস্তজনৰ দূৰত্ব = মুঠ − আগ − ব্যৱধান।",
      "মিটাৰ আৰু ছেকেণ্ডত ব্যৱধান: ছেকেণ্ডই পৰাস্তজনৰ গতি পোনপটীয়াকৈ দিয়ে।",
      "শৃংখলা: গতিৰ অনুপাত পূৰণ কৰি আৰম্ভণিৰ পৰা শেষলৈ অনুপাত পাওক।",
      "আৰম্ভণিত লগ: পাকৰ সময়বোৰৰ ল.সা.গু.ৰ পিছত।",
      "একে দিশ: লগ হোৱাৰ সময় = পথ ÷ (গতিৰ পাৰ্থক্য)।",
      "বিপৰীত দিশ: লগ হোৱাৰ সময় = পথ ÷ (গতিৰ যোগফল)।",
      "লগ হোৱা প্ৰতি সমান ব্যৱধানত পুনৰাবৃত্তি; সংখ্যা = মুঠ সময় ÷ ব্যৱধান।",
    ],
  },
  faqs: [
    {
      q: { en: "What does 'A beats B by 10 m' mean?", as: "'A এ B ক ১০ মি.ত পৰাস্ত কৰে' ৰ অৰ্থ কি?" },
      a: {
        en: "It means that when A finished the race, B was still 10 m short of the finish line. So in the same time A ran the full distance and B ran 10 m less, and the ratio of their speeds is the ratio of these two distances.",
        as: "ইয়াৰ অৰ্থ A এ দৌৰ শেষ কৰোঁতে B এ এতিয়াও ১০ মি. বাকী আছিল। গতিকে একেই সময়ত A এ গোটেই দূৰত্ব আৰু B এ ১০ মি. কম দৌৰিছিল, আৰু গতিৰ অনুপাত এই দুটা দূৰত্বৰ অনুপাত।",
      },
    },
    {
      q: { en: "How do I handle a start plus a winning margin?", as: "আগ ধৰি দিয়া আৰু বিজয়ৰ ব্যৱধান কেনেকৈ সামৰিম?" },
      a: {
        en: "Subtract both from the total distance to get the loser's distance. If A gives a 25 m start in a 200 m race and still wins by 10 m, B covered 200 − 25 − 10 = 165 m, so the speeds are in the ratio 200 : 165.",
        as: "মুঠ দূৰত্বৰ পৰা দুয়োটা বিয়োগ কৰি পৰাস্তজনৰ দূৰত্ব পাওক। ২০০ মি. দৌৰত A এ ২৫ মি. আগ ধৰি দিয়েও ১০ মি.ত জিকিলে, B এ ২০০ − ২৫ − ১০ = ১৬৫ মি. অতিক্ৰম কৰিছে, গতিকে গতিৰ অনুপাত ২০০ : ১৬৫।",
      },
    },
    {
      q: { en: "When do two runners on a circular track meet?", as: "বৃত্তাকাৰ পথত দুজন দৌৰবিদ কেতিয়া লগ পায়?" },
      a: {
        en: "In the same direction they meet when the faster has gained one full lap, so the time is the track length divided by the difference of the speeds. In opposite directions the time is the track length divided by the sum of the speeds.",
        as: "একে দিশত দ্ৰুতজনে এটা পূৰ্ণ পাক আগ বঢ়ালে লগ পায়, গতিকে সময় = পথৰ দীঘ ÷ গতিৰ পাৰ্থক্য। বিপৰীত দিশত সময় = পথৰ দীঘ ÷ গতিৰ যোগফল।",
      },
    },
    {
      q: { en: "When do two runners meet at the starting point?", as: "দুজন দৌৰবিদ কেতিয়া আৰম্ভণি বিন্দুত লগ পায়?" },
      a: {
        en: "After the least common multiple of their lap times, because each must have completed a whole number of rounds. Two runners taking 8 and 12 minutes meet at the start after LCM(8, 12) = 24 minutes.",
        as: "সিহঁতৰ পাকৰ সময়ৰ ল.সা.গু.ৰ পিছত, কাৰণ প্ৰত্যেকেই পূৰ্ণসংখ্যক পাক সম্পূৰ্ণ কৰিব লাগে। ৮ আৰু ১২ মিনিট লোৱা দুজন দৌৰবিদ ল.সা.গু.(৮, ১২) = ২৪ মিনিটৰ পিছত আৰম্ভণিত লগ পায়।",
      },
    },
    {
      q: { en: "How do I use the margin given both in metres and in seconds?", as: "মিটাৰ আৰু ছেকেণ্ডত দুয়োটা দিয়া ব্যৱধান কেনেকৈ ব্যৱহাৰ কৰিম?" },
      a: {
        en: "The seconds tell you how long the loser took to cover the margin in metres, which gives the loser's speed. From that speed find the loser's total time, subtract the margin in seconds to get the winner's time, and hence the winner's speed.",
        as: "ছেকেণ্ডই কয় পৰাস্তজনে মিটাৰত থকা ব্যৱধান সামৰিবলৈ কিমান সময় লৈছিল, যি পৰাস্তজনৰ গতি দিয়ে। সেই গতিৰ পৰা পৰাস্তজনৰ মুঠ সময় বিচাৰি, ছেকেণ্ডত থকা ব্যৱধান বিয়োগ কৰি বিজেতাৰ সময়, আৰু তাৰ পৰা বিজেতাৰ গতি পোৱা যায়।",
      },
    },
  ],
};
