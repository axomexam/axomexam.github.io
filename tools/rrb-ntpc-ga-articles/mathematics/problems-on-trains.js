"use strict";

/* RRB NTPC Mathematics — Problems on Trains. Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Problems on Trains for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে ৰে'লগাড়ীৰ সমস্যা" },
  p: {
    en: [
      "Problems on trains is the chapter in which the speed and distance relations are applied to a moving train, and it appears in the RRB NTPC Mathematics paper with a steady number of questions every year. The whole chapter turns on one idea: a train crosses a pole when its own length has passed the pole, and it crosses a platform or a bridge when its own length plus the length of the platform has passed. So the distance covered while crossing a pole is the length of the train, and the distance covered while crossing a platform is the sum of the two lengths. Getting this single idea right answers most of the chapter.",
      "The speed of a train is usually given in kilometres per hour and the lengths in metres, so the conversion between the two units is used in almost every question. A speed in kilometres per hour becomes metres per second when multiplied by five and divided by eighteen. Thirty-six kilometres per hour is ten metres per second, fifty-four is fifteen, seventy-two is twenty, and ninety is twenty-five. Writing these four conversions at the top of the rough sheet saves a great deal of time and removes the commonest source of error.",
      "The direct questions give the length of the train and its speed and ask for the time to cross a pole, or give the length and the time and ask for the speed, or give the speed and the time and ask for the length. In each case the distance is the length of the train and the relation is distance equals speed times time. A train of two hundred metres at seventy-two kilometres per hour crosses a pole in ten seconds, because twenty metres per second into ten seconds is two hundred metres. These questions are quick once the speed is converted.",
      "The platform and bridge questions add the length of the platform to the length of the train before dividing by the speed. A train of two hundred metres crossing a three-hundred-metre platform at twenty metres per second covers five hundred metres and so takes twenty-five seconds. The reverse questions give the time and one length and ask for the other, and the method is the same subtraction: the distance covered is the speed times the time, and the unknown length is this distance minus the known length.",
      "The questions that give two observations of the same train, one of a pole and one of a platform, are the most elegant in the chapter. If the train passes a pole in twelve seconds and a two-hundred-and-forty-metre platform in thirty-six seconds, then the length is twelve times the speed and the length plus two hundred and forty is thirty-six times the speed. Subtracting gives two hundred and forty equals twenty-four times the speed, so the speed is ten metres per second and the length is a hundred and twenty metres. Two equations in two unknowns, solved by one subtraction.",
      "The two-train questions use the relative speed. Two trains running in opposite directions cross each other at the sum of their speeds, and two trains running in the same direction cross at the difference. In both cases the distance to be covered is the sum of the two lengths. Two trains of a hundred and fifty and two hundred and fifty metres, running in opposite directions at sixty and thirty kilometres per hour, cross at ninety kilometres per hour, which is twenty-five metres per second, and the four hundred metres take sixteen seconds.",
      "The questions that give the crossing times in the two directions and ask for the speeds are solved by two equations. The relative speed in opposite directions is the sum of the speeds, and the relative speed in the same direction is the difference. Adding the two relative speeds gives twice the faster speed and subtracting gives twice the slower. A pair of crossings in ten seconds and fifty seconds, over a total length of two hundred metres, gives the two relative speeds and hence both train speeds.",
      "The questions with a man walking on the platform use the relative speed between the train and the man. When the train and the man move in the same direction, the relative speed is the difference, and when they move in opposite directions it is the sum. The distance covered is the length of the train. A train of a hundred and eighty metres overtaking a man walking at six kilometres per hour in twelve seconds has a relative speed of fifteen metres per second, or fifty-four kilometres per hour, so the train's speed is sixty kilometres per hour.",
      "A small family of questions gives the length of the train and the time to cross a man and asks for the speed, or gives the speed and the time and asks for the length. These are the pole questions in different words, because a man is treated as a point of no length and the distance covered is the length of the train. Recognising that a man, a pole and a signal post are all points removes any apparent difficulty from these questions, and the method is the same single division.",
      "Finally, the chapter rewards two habits. The first is to write the distance covered as the length of the train for a pole and the sum of the lengths for a platform or a second train, before touching the numbers. The second is to convert the speed to metres per second at once, so that the lengths in metres and the times in seconds agree. With these habits the train questions become among the quickest in the paper, and the same relative-speed idea carries directly into boats and streams and into the race questions on a circular track.",
    ],
    as: [
      "ৰে'লগাড়ীৰ সমস্যা হৈছে সেই অধ্যায় য'ত গতি আৰু দূৰত্বৰ সম্পৰ্ক এখনে ধাৱমান ৰে'লগাড়ীত প্ৰয়োগ কৰা হয়, আৰু RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা স্থিৰ সংখ্যক প্ৰশ্নত দেখা দিয়ে। গোটেই অধ্যায় এটা ধাৰণাৰ ওপৰত ঘূৰে: ৰে'লগাড়ীয়ে এটা খুঁটাক পাৰ হয় যেতিয়া ইয়াৰ নিজৰ দীঘ খুঁটাটো পাৰ কৰে, আৰু এটা প্লেটফৰ্ম বা দলং পাৰ হয় যেতিয়া ইয়াৰ নিজৰ দীঘ লগত প্লেটফৰ্মৰ দীঘ পাৰ কৰে। গতিকে খুঁটা পাৰ কৰোঁতে অতিক্ৰম কৰা দূৰত্ব ৰে'লগাড়ীৰ দীঘ, আৰু প্লেটফৰ্ম পাৰ কৰোঁতে দুয়োটা দীঘৰ যোগফল।",
      "ৰে'লগাড়ীৰ গতি সাধাৰণতে কি.মি./ঘ. ত আৰু দীঘ মিটাৰত দিয়া হয়, গতিকে প্ৰায় প্ৰতিটো প্ৰশ্নতে দুটা এককৰ মাজৰ ৰূপান্তৰ লাগে। কি.মি./ঘ. ত থকা গতিক পাঁচেৰে পূৰণ কৰি আঠেৰে হৰণ কৰিলে মি./ছে. হয়। ছত্ৰিশ কি.মি./ঘ. = দহ মি./ছে., চুৱান্ন = পোন্ধৰ, বাহাত্তৰ = বিশ, আৰু নব্বৈ = পঁচিশ। এই চাৰিটা ৰূপান্তৰ ৰাফ শ্বীটৰ ওপৰত লিখি ল'লে বহু সময় ৰাহি হয় আৰু আটাইতকৈ সচৰাচৰ ভুলটো আঁতৰে।",
      "পোনপটীয়া প্ৰশ্নবোৰে ৰে'লগাড়ীৰ দীঘ আৰু গতি দি খুঁটা পাৰ কৰাৰ সময় সোধে, বা দীঘ আৰু সময় দি গতি সোধে, বা গতি আৰু সময় দি দীঘ সোধে। প্ৰতিটো ক্ষেত্ৰতে দূৰত্ব ৰে'লগাড়ীৰ দীঘ আৰু সম্পৰ্ক দূৰত্ব = গতি × সময়। দুশ মিটাৰৰ ৰে'লগাড়ী বাহাত্তৰ কি.মি./ঘ. গতিত দহ ছেকেণ্ডত খুঁটা পাৰ হয়, কাৰণ বিশ মি./ছে. × দহ ছে. = দুশ মি.। গতি ৰূপান্তৰ কৰাৰ পিছত এই প্ৰশ্নবোৰ দ্ৰুত।",
      "প্লেটফৰ্ম আৰু দলংৰ প্ৰশ্নবোৰে হৰণ কৰাৰ আগতে ৰে'লগাড়ীৰ দীঘ লগত প্লেটফৰ্মৰ দীঘ যোগ কৰে। দুশ মিটাৰৰ ৰে'লগাড়ীয়ে বিশ মি./ছে. গতিত তিনিশ মিটাৰৰ প্লেটফৰ্ম পাৰ কৰিলে পাঁচশ মিটাৰ অতিক্ৰম কৰে, গতিকে পঁচিশ ছেকেণ্ড লাগে। উলটি প্ৰশ্নবোৰে সময় আৰু এটা দীঘ দি আনটো সোধে, আৰু পদ্ধতিটো একেই বিয়োগ: অতিক্ৰম কৰা দূৰত্ব = গতি × সময়, আৰু অজ্ঞাত দীঘ = এই দূৰত্ব − জনা দীঘ।",
      "একেই ৰে'লগাড়ীৰ দুটা পৰ্যবেক্ষণ, এটা খুঁটাৰ আৰু এটা প্লেটফৰ্মৰ, দিয়া প্ৰশ্নবোৰ অধ্যায়টোৰ আটাইতকৈ সুন্দৰ। ৰে'লগাড়ীয়ে বাৰ ছেকেণ্ডত খুঁটা আৰু ছত্ৰিশ ছেকেণ্ডত দুশ চল্লিশ মিটাৰৰ প্লেটফৰ্ম পাৰ কৰিলে, দীঘ = ১২ × গতি আৰু দীঘ + ২৪০ = ৩৬ × গতি। বিয়োগ কৰিলে ২৪০ = ২৪ × গতি, গতিকে গতি দহ মি./ছে. আৰু দীঘ এশ বিশ মি.। দুটা অজ্ঞাতত দুটা সমীকৰণ, এটা বিয়োগেৰে সমাধান।",
      "দুখন ৰে'লগাড়ীৰ প্ৰশ্নবোৰে আপেক্ষিক গতি ব্যৱহাৰ কৰে। বিপৰীত দিশত চলা দুখন ৰে'লগাড়ী সিহঁতৰ গতিৰ যোগফল হাৰত আৰু একেই দিশত চলা দুখনে পাৰ্থক্য হাৰত ইজনে সিজনক পাৰ হয়। দুয়ো ক্ষেত্ৰতে অতিক্ৰম কৰিবলগীয়া দূৰত্ব দুয়োটা দীঘৰ যোগফল। এশ পঞ্চাশ আৰু দুশ পঞ্চাশ মিটাৰৰ দুখন ৰে'লগাড়ী ষাঠি আৰু ত্ৰিশ কি.মি./ঘ. গতিত বিপৰীত দিশত চলিলে নব্বৈ কি.মি./ঘ. হাৰত পাৰ হয়, যি পঁচিশ মি./ছে., আৰু চাৰিশ মিটাৰলৈ ষোল ছেকেণ্ড লাগে।",
      "দুয়ো দিশত পাৰ হোৱাৰ সময় দি গতি সোধা প্ৰশ্নবোৰ দুটা সমীকৰণেৰে সমাধান কৰা হয়। বিপৰীত দিশত আপেক্ষিক গতি গতিবোৰৰ যোগফল, আৰু একেই দিশত পাৰ্থক্য। দুয়োটা আপেক্ষিক গতি যোগ কৰিলে দ্ৰুত গতিৰ দুগুণ আৰু বিয়োগ কৰিলে লেহেমীয়া গতিৰ দুগুণ ওলায়। দহ ছেকেণ্ড আৰু পঞ্চাশ ছেকেণ্ডৰ দুটা পাৰ হোৱা, মুঠ দুশ মিটাৰ দীঘৰ ওপৰত, দুয়োটা আপেক্ষিক গতি দি দুয়ো ৰে'লগাড়ীৰ গতি দিয়ে।",
      "প্লেটফৰ্মত খোজ কঢ়া মানুহ থকা প্ৰশ্নবোৰে ৰে'লগাড়ী আৰু মানুহৰ মাজৰ আপেক্ষিক গতি ব্যৱহাৰ কৰে। ৰে'লগাড়ী আৰু মানুহ একেই দিশত চলিলে আপেক্ষিক গতি পাৰ্থক্য, আৰু বিপৰীত দিশত চলিলে যোগফল। অতিক্ৰম কৰা দূৰত্ব ৰে'লগাড়ীৰ দীঘ। এশ আশী মিটাৰৰ ৰে'লগাড়ীয়ে ছয় কি.মি./ঘ. গতিত খোজ কঢ়া এজন মানুহক বাৰ ছেকেণ্ডত পাৰ কৰিলে আপেক্ষিক গতি পোন্ধৰ মি./ছে., বা চুৱান্ন কি.মি./ঘ., গতিকে ৰে'লগাড়ীৰ গতি ষাঠি কি.মি./ঘ.।",
      "এটা সৰু পৰিয়ালে ৰে'লগাড়ীৰ দীঘ আৰু এজন মানুহক পাৰ কৰাৰ সময় দি গতি সোধে, বা গতি আৰু সময় দি দীঘ সোধে। এইবোৰ খুঁটাৰ প্ৰশ্নই বেলেগ শব্দত, কাৰণ এজন মানুহক শূন্য দীঘৰ বিন্দু হিচাপে ধৰা হয় আৰু অতিক্ৰম কৰা দূৰত্ব ৰে'লগাড়ীৰ দীঘ। মানুহ, খুঁটা আৰু সংকেত স্তম্ভ সকলে বিন্দু বুলি চিনি পোৱাটোৱে এই প্ৰশ্নবোৰৰ আপাত কঠিনতা আঁতৰায়, আৰু পদ্ধতিটো একেই এটা হৰণ।",
      "কিছুমান প্ৰশ্নত দুখন ৰে'লগাড়ীয়ে একেই দিশত চলি এখনে আনখনক চেৰাই যোৱাৰ সময় দিয়া থাকে আৰু এখনৰ গতি সোধা হয়। এনে প্ৰশ্নত আপেক্ষিক গতি = দুটা দীঘৰ যোগফল ÷ সময়, আৰু তাৰ পিছত আনখনৰ গতি যোগ বা বিয়োগ কৰি বিচৰা গতি ওলায়। যদি দ্ৰুত ৰে'লগাড়ীয়ে লেহেমীয়াটোক চেৰাই যায়, আপেক্ষিক গতি = দ্ৰুত গতি − লেহেমীয়া গতি। এই সম্পৰ্ক মনত ৰাখিলে এনে প্ৰশ্ন কঠিন নহয়।",
      "আন এটা সচৰাচৰ ৰূপত এটা দলং বা সুৰংগৰ দীঘ সোধা হয়, য'ত ৰে'লগাড়ীৰ গতি, দীঘ আৰু পাৰ হোৱাৰ সময় দিয়া থাকে। এনে প্ৰশ্নত অতিক্ৰম কৰা দূৰত্ব = গতি × সময়, আৰু দলংৰ দীঘ = এই দূৰত্ব − ৰে'লগাড়ীৰ দীঘ। যদি গতি মি./ছে. ত আৰু সময় ছেকেণ্ডত দিয়া থাকে, লগে লগে পূৰণ কৰি দূৰত্ব পোৱা যায়। এই প্ৰশ্নবোৰ ৰে'লগাড়ীৰ অধ্যায়ৰ আটাইতকৈ সৰল আৰু দ্ৰুত, আৰু সাৱধানে একক মিলালেই ভুল নহয়।",
      "পৰীক্ষাত ৰে'লগাড়ীৰ প্ৰশ্নবোৰ প্ৰায়ে বাস্তৱ পৰিস্থিতিৰ ৰূপত আহে, যেনে এখন ৰে'লগাড়ী এটা খুঁটা, প্লেটফৰ্ম, দলং বা সুৰংগ পাৰ কৰা। এনে ক্ষেত্ৰত প্ৰথমে অতিক্ৰম কৰিবলগীয়া দূৰত্ব ঠিক কৰি (খুঁটাৰ বাবে ৰে'লগাড়ীৰ দীঘ, প্লেটফৰ্মৰ বাবে দুয়োটাৰ যোগফল) তাৰ পিছত গতি বা সময় বিচৰা হয়। বাস্তৱ পৰিস্থিতিৰ ভাষা গাণিতিক গঠনটো সলনি নকৰে, গতিকে একেই পদ্ধতি প্ৰয়োগ কৰিব পাৰি আৰু ভয় খোৱাৰ প্ৰয়োজন নাই।",
      "কিছুমান প্ৰশ্নত দুখন সমান দীঘৰ ৰে'লগাড়ী বিপৰীত দিশত চলি এটা নিৰ্দিষ্ট সময়ত ইজনে সিজনক পাৰ কৰে আৰু প্ৰতিখনৰ দীঘ সোধা হয়। এনে প্ৰশ্নত আপেক্ষিক গতি = গতিবোৰৰ যোগফল, আৰু মুঠ দীঘ = আপেক্ষিক গতি × সময়; তাৰ পিছত প্ৰতিখনৰ দীঘ = মুঠ দীঘ ÷ ২। যদি দুখন সমান দীঘৰ ৰে'লগাড়ী ৩৬ আৰু ৫৪ কি.মি./ঘ. গতিত ১৬ ছেকেণ্ডত পাৰ হয়, তেন্তে আপেক্ষিক গতি ২৫ মি./ছে., মুঠ দীঘ ৪০০ মি., গতিকে প্ৰতিখন ২০০ মি.। এই প্ৰশ্নবোৰ সৰল আৰু দ্ৰুত।",
      "আন এটা সচৰাচৰ ৰূপত এখন ৰে'লগাড়ীয়ে এটা খুঁটাক আৰু এটা প্লেটফৰ্মক পাৰ কৰাৰ সময় দি গতি সোধা হয়। এনে প্ৰশ্নত খুঁটাৰ পৰা দীঘ = গতি × সময় আৰু প্লেটফৰ্মৰ পৰা দীঘ + প্লেটফৰ্ম = গতি × সময়, এই দুটা সমীকৰণ বিয়োগ কৰিলে গতি ওলায়। যদি ১২ ছেকেণ্ডত খুঁটা আৰু ৩০ ছেকেণ্ডত ২১০ মি.ৰ প্লেটফৰ্ম পাৰ হয়, তেন্তে ২১০ = ১৮ × গতি, গতি ১০ মি./ছে. = ৩৬ কি.মি./ঘ.। দুটা পৰ্যবেক্ষণে দুটা সমীকৰণ দিয়ে, এটা বিয়োগে সমাধান।",
      "কিছুমান প্ৰশ্নত এখন ৰে'লগাড়ীয়ে এটা প্লেটফৰ্ম পাৰ কৰাৰ সময় আৰু গতি দি ৰে'লগাড়ীখনৰ দীঘ সোধা হয়। এনে প্ৰশ্নত অতিক্ৰম কৰা মুঠ দূৰত্ব = গতি × সময়, আৰু ৰে'লগাড়ীৰ দীঘ = মুঠ দূৰত্ব − প্লেটফৰ্মৰ দীঘ। যদি ৬০ কি.মি./ঘ. গতিত ২৭ ছেকেণ্ডত ২৪০ মি.ৰ প্লেটফৰ্ম পাৰ হয়, তেন্তে মুঠ দূৰত্ব = ৪৫০ মি. আৰু ৰে'লগাড়ীৰ দীঘ = ২১০ মি.। এই প্ৰশ্নবোৰ ৰে'লগাড়ীৰ অধ্যায়ৰ আটাইতকৈ সৰল আৰু একক সঠিকভাৱে মিলালেই ভুল নহয়।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল সংখ্যাবোৰত হাত দিয়াৰ আগতে খুঁটাৰ বাবে দূৰত্ব ৰে'লগাড়ীৰ দীঘ আৰু প্লেটফৰ্ম বা দ্বিতীয় ৰে'লগাড়ীৰ বাবে দীঘবোৰৰ যোগফল হিচাপে লিখা। দ্বিতীয়টো হ'ল গতিক লগে লগে মি./ছে.লৈ ৰূপান্তৰ কৰা, যাতে মিটাৰত দীঘ আৰু ছেকেণ্ডত সময় মিলে। এই অভ্যাসৰ সৈতে ৰে'লগাড়ীৰ প্ৰশ্নবোৰ প্ৰশ্নপত্ৰৰ আটাইতকৈ দ্ৰুত হৈ পৰে, আৰু একেই আপেক্ষিক গতিৰ ধাৰণা পোনপটীয়াকৈ নাও আৰু সোঁত আৰু বৃত্তাকাৰ পথৰ দৌৰলৈ যায়।",
    ],
  },
  list: {
    en: [
      "Crossing a pole: distance = length of the train.",
      "Crossing a platform or bridge: distance = train + platform length.",
      "km/h to m/s: multiply by 5/18.",
      "Time = distance ÷ speed; speed = distance ÷ time; length = speed × time.",
      "Two trains, opposite directions: relative speed = sum; same direction: difference.",
      "Two trains: the distance to cross is the sum of the two lengths.",
      "Pole and platform observations: two equations solved by one subtraction.",
      "Overtaking a walking man: relative speed = difference; crossing him: sum.",
      "A man, pole and signal post are all points of zero length.",
      "Always convert the speed to m/s before using lengths in metres.",
    ],
    as: [
      "খুঁটা পাৰ: দূৰত্ব = ৰে'লগাড়ীৰ দীঘ।",
      "প্লেটফৰ্ম বা দলং পাৰ: দূৰত্ব = ৰে'লগাড়ী + প্লেটফৰ্মৰ দীঘ।",
      "কি.মি./ঘ. → মি./ছে.: ৫/১৮ ৰে পূৰণ।",
      "সময় = দূৰত্ব ÷ গতি; গতি = দূৰত্ব ÷ সময়; দীঘ = গতি × সময়।",
      "দুখন ৰে'লগাড়ী, বিপৰীত দিশ: আপেক্ষিক গতি = যোগফল; একেই দিশ: পাৰ্থক্য।",
      "দুখন ৰে'লগাড়ী: পাৰ হ'বলগীয়া দূৰত্ব = দুয়োটা দীঘৰ যোগফল।",
      "খুঁটা আৰু প্লেটফৰ্মৰ পৰ্যবেক্ষণ: এটা বিয়োগেৰে দুটা সমীকৰণ।",
      "খোজ কঢ়া মানুহক চেৰাই যোৱা: আপেক্ষিক গতি = পাৰ্থক্য; পাৰ কৰা: যোগফল।",
      "মানুহ, খুঁটা আৰু সংকেত স্তম্ভ সকলে শূন্য দীঘৰ বিন্দু।",
      "মিটাৰত দীঘ ব্যৱহাৰ কৰাৰ আগতে গতি মি./ছে.লৈ ৰূপান্তৰ কৰক।",
    ],
  },
  faqs: [
    {
      q: { en: "What distance does a train cover while crossing a pole?", as: "ৰে'লগাড়ীয়ে খুঁটা পাৰ কৰোঁতে কিমান দূৰত্ব অতিক্ৰম কৰে?" },
      a: {
        en: "Only its own length, because a pole is a point of no length. The time to cross the pole is the length of the train divided by its speed. The same is true for a man or a signal post.",
        as: "কেৱল নিজৰ দীঘ, কাৰণ খুঁটা শূন্য দীঘৰ এটা বিন্দু। খুঁটা পাৰ কৰাৰ সময় = ৰে'লগাড়ীৰ দীঘ ÷ গতি। মানুহ বা সংকেত স্তম্ভৰ বাবেও একেই সত্য।",
      },
    },
    {
      q: { en: "What distance does a train cover while crossing a platform?", as: "ৰে'লগাড়ীয়ে প্লেটফৰ্ম পাৰ কৰোঁতে কিমান দূৰত্ব অতিক্ৰম কৰে?" },
      a: {
        en: "Its own length plus the length of the platform, because the rear of the train must clear the far end of the platform. So the distance is the sum of the two lengths, and the time is this sum divided by the speed.",
        as: "নিজৰ দীঘ লগত প্লেটফৰ্মৰ দীঘ, কাৰণ ৰে'লগাড়ীৰ পিছৰ অংশই প্লেটফৰ্মৰ শেষ মূৰ পাৰ হ'ব লাগে। গতিকে দূৰত্ব দুয়োটা দীঘৰ যোগফল, আৰু সময় = এই যোগফল ÷ গতি।",
      },
    },
    {
      q: { en: "How do the two trains cross each other?", as: "দুখন ৰে'লগাড়ীয়ে ইজনে সিজনক কেনেকৈ পাৰ হয়?" },
      a: {
        en: "The relative speed is the sum for opposite directions and the difference for the same direction, and the distance to be covered is the sum of the two lengths. Then time = distance ÷ relative speed, after converting to metres per second.",
        as: "আপেক্ষিক গতি বিপৰীত দিশত যোগফল আৰু একেই দিশত পাৰ্থক্য, আৰু অতিক্ৰম কৰিবলগীয়া দূৰত্ব দুয়োটা দীঘৰ যোগফল। তাৰ পিছত মি./ছে.লৈ ৰূপান্তৰ কৰি সময় = দূৰত্ব ÷ আপেক্ষিক গতি।",
      },
    },
    {
      q: { en: "How do I use the pole and platform observations together?", as: "খুঁটা আৰু প্লেটফৰ্মৰ পৰ্যবেক্ষণ একেলগে কেনেকৈ ব্যৱহাৰ কৰিম?" },
      a: {
        en: "Write two equations: length = speed × pole time, and length + platform = speed × platform time. Subtract the first from the second to get platform = speed × (difference of times), which gives the speed; the length then follows from the first equation.",
        as: "দুটা সমীকৰণ লিখক: দীঘ = গতি × খুঁটাৰ সময়, আৰু দীঘ + প্লেটফৰ্ম = গতি × প্লেটফৰ্মৰ সময়। দ্বিতীয়ৰ পৰা প্ৰথম বিয়োগ কৰি প্লেটফৰ্ম = গতি × (সময়ৰ পাৰ্থক্য) পাব, যি গতি দিয়ে; তাৰ পিছত প্ৰথম সমীকৰণৰ পৰা দীঘ ওলায়।",
      },
    },
    {
      q: { en: "How do I handle a man walking on the platform?", as: "প্লেটফৰ্মত খোজ কঢ়া মানুহ কেনেকৈ সামৰিম?" },
      a: {
        en: "Use the relative speed between the train and the man: the difference if they move in the same direction and the sum if opposite. The distance covered is the length of the train, so time = train length ÷ relative speed.",
        as: "ৰে'লগাড়ী আৰু মানুহৰ মাজৰ আপেক্ষিক গতি ব্যৱহাৰ কৰক: একেই দিশত চলিলে পাৰ্থক্য আৰু বিপৰীত হ'লে যোগফল। অতিক্ৰম কৰা দূৰত্ব ৰে'লগাড়ীৰ দীঘ, গতিকে সময় = ৰে'লগাড়ীৰ দীঘ ÷ আপেক্ষিক গতি।",
      },
    },
  ],
};
