#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.computer-extra.js

   Twenty more Computer Awareness items for each of the six leaves,
   taking every leaf from thirty to fifty. Stems are written as desk
   situations or as discriminating comparisons rather than recall
   cues, so they read differently from the base bank: a symptom, a
   number or a task is given and the options differ by mechanism.

   Same shape as the rest of the book: bilingual stem, four bilingual
   options, bilingual explanation naming why the other three fail.
   Assamese numerals (০-৯) inside Assamese text.
   =========================================================== */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  const n = opts.length;
  const shift = (Number(String(id).replace(/\D/g, "")) || 0) % n;
  const rotated = opts.slice(shift).concat(opts.slice(0, shift));
  Q.push({
    id,
    leaf: LEAF,
    q: { en, as },
    options: rotated.map(([oen, oas]) => ({ en: oen, as: oas })),
    correct: (correct - shift + n) % n,
    explanation: { en: expEn, as: expAs },
  });
}

/* ================= computer-fundamentals ================= */
useLeaf("computer-fundamentals");

add("computer-181",
  "A spreadsheet takes 90 seconds to recalculate a sheet that used to take 45. The engineer adds 8 GB of RAM but the time does not change, and the disk light stays on throughout. The component that is limiting performance is the",
  "এখন স্প্ৰেডশ্বীটে পূৰ্বে ৪৫ ছেকেণ্ডত কৰা গণনা এতিয়া ৯০ ছেকেণ্ডত কৰে। অভিযন্তাই ৮ জিবি RAM যোগ কৰিলেও সময় নসলনি, আৰু ডিস্কৰ পোহৰ গোটেই সময়ত জ্বলি থাকে। কাৰ্যদক্ষতা সীমিত কৰা অংশটো",
  [["hard disk, because paging to it is the bottleneck", "হাৰ্ড ডিস্ক, কাৰণ তালৈ পেজিংয়ে বাধা দিছে"],
   ["RAM, because 8 GB is too little for any spreadsheet", "RAM, কাৰণ ৮ জিবি যিকোনো স্প্ৰেডশ্বীটৰ বাবে কম"],
   ["processor, because recalculation is pure arithmetic", "প্ৰচেছৰ, কাৰণ পুনৰ্গণনা পূৰ্ণ গাণিতিক কাম"],
   ["power supply, because it cannot feed the new RAM", "পাৱাৰ ছাপ্লাই, কাৰণ ই নতুন RAM চলাব নোৱাৰে"]], 0,
  "A disk light that stays on while the work is slow is the signature of thrashing, where the system swaps pages to disk faster than RAM can serve them. Adding RAM did not help because the file itself is being read repeatedly from a slow device, and pure arithmetic would show no disk activity at all.",
  "কাম লেহেমীয়া হৈ থাকোতে ডিস্কৰ পোহৰ জ্বলি থকাটো থ্ৰেশিঙৰ চিন, য'ত ব্যৱস্থাই RAM-এ যোগান ধৰিব পৰাতকৈ দ্ৰুতভাৱে পৃষ্ঠা ডিস্কলৈ সলনি কৰে। RAM যোগ কৰিলেও সহায় নহ'ল কাৰণ ফাইলটোৱে লেহেমীয়া যন্ত্ৰৰপৰা বাৰে বাৰে পঢ়িছে, আৰু পূৰ্ণ গাণিতিক কামত ডিস্কৰ কোনো সক্ৰিয়তা নাথাকিলহেঁতেন।");

add("computer-182",
  "A file is 3,000,000 bytes in size. Expressed in decimal units this is approximately",
  "এটা ফাইলৰ আকাৰ ৩,০০০,০০০ বাইট। দশমিক এককত ই প্ৰায়",
  [["3 MB", "৩ MB"], ["3 MiB", "৩ MiB"], ["30 MB", "৩০ MB"], ["3 GB", "৩ GB"]], 0,
  "Decimal prefixes step by 1,000, so three million bytes is three megabytes. A mebibyte is 1,048,576 bytes, so the same file is about 2.86 MiB, and gigabytes would need a thousand times more.",
  "দশমিক উপসৰ্গই ১,০০০ কৈ বাঢ়ে, সেয়ে ত্ৰিশ লাখ বাইট তিনি মেগাবাইট। এটা মেবিবাইট ১,০৪৮,৫৭৬ বাইট, সেয়ে একেই ফাইল প্ৰায় ২.৮৬ MiB, আৰু গিগাবাইটৰ বাবে হাজাৰ গুণ বেছি লাগে।");

add("computer-183",
  "A program must run on several different processor families without being rewritten for each. The property of the source code that makes this possible is",
  "এখন প্ৰ'গ্ৰাম কেইবাটাও বেলেগ প্ৰচেছৰ পৰিয়ালত পুনৰ নলিখাকৈ চলিব লাগে। উৎস সংকেতক ই সম্ভৱ কৰা ধৰ্মটো",
  [["portability", "প'ৰ্টেবিলিটি"],
   ["volatility", "ভলেটিলিটি"],
   ["redundancy", "ৰিডাণ্ডেন্সি"],
   ["granularity", "গ্ৰেনুলেৰিটি"]], 0,
  "Portability is the ease with which software moves to another platform, and a high level language plus a compiler per platform is what delivers it. Volatility describes memory losing its contents, redundancy is duplication for safety, and granularity is the size of the units a system works in.",
  "প'ৰ্টেবিলিটিয়ে ছফ্টৱেৰ আন মঞ্চলৈ যোৱাৰ সহজতা, আৰু উচ্চ স্তৰৰ ভাষা লগতে প্ৰতিটো মঞ্চৰ কম্পাইলাৰেই তাক দিয়ে। ভলেটিলিটিয়ে স্মৃতিয়ে বস্তু হেৰুওৱা বুজায়, ৰিডাণ্ডেন্সি সুৰক্ষাৰ বাবে নকল আৰু গ্ৰেনুলেৰিটি ব্যৱস্থাই কাম কৰা এককৰ আকাৰ।");

add("computer-184",
  "An operating system keeps a table of which blocks on disk belong to which file. The main purpose of this table is to",
  "অপাৰেটিং চিষ্টেমে ডিস্কৰ কোন খণ্ড কোন ফাইলৰ বুলি এখন তালিকা ৰাখে। এই তালিকাৰ মূল উদ্দেশ্য",
  [["locate the scattered blocks that make up one file", "এটা ফাইল গঠন কৰা ছটিয়াই থকা খণ্ডবোৰ বিচাৰি উলিওৱা"],
   ["measure the physical size of the disk", "ডিস্কৰ ভৌতিক আকাৰ জোখা"],
   ["encrypt the file contents", "ফাইলৰ বস্তু এনক্ৰিপ্ট কৰা"],
   ["increase the clock speed of the processor", "প্ৰচেছৰৰ ঘড়ীৰ গতি বঢ়োৱা"]], 0,
  "Files are stored in blocks that need not be adjacent, and the file allocation table is what lets the system find each block in order. Disk size comes from the drive geometry, encryption is a separate layer, and clock speed is a hardware setting.",
  "ফাইলবোৰ প্ৰয়োজনত ওচৰা-ওচৰিকৈ নাথকা খণ্ডত ৰখা হয়, আৰু ফাইল বিতৰণ তালিকাই ব্যৱস্থাক প্ৰতিটো খণ্ড ক্ৰমে বিচাৰিবলৈ দিয়ে। ডিস্কৰ আকাৰ ড্ৰাইভৰ জ্যামিতিৰপৰা আহে, এনক্ৰিপশ্যন পৃথক স্তৰ, আৰু ঘড়ীৰ গতি হাৰ্ডৱেৰৰ ছেটিং।");

add("computer-185",
  "A user complains that a laptop battery drains even when the machine is shut down. The component most likely to be responsible is the",
  "ব্যৱহাৰকাৰীয়ে অভিযোগ কৰে যে লেপটপ বন্ধ কৰি থ'লেও বেটাৰী শেষ হয়। আটাই সম্ভাব্য দায়ী অংশটো",
  [["standby rail that keeps the clock and wake circuits alive", "ঘড়ী আৰু জাগৰণ বৰ্তনী জীয়াই ৰখা ষ্টেণ্ডবাই ৰে'ল"],
   ["hard disk spinning during shutdown", "বন্ধ কৰোতে ঘূৰি থকা হাৰ্ড ডিস্ক"],
   ["screen backlight left on", "জ্বলি থকা স্ক্ৰীণৰ পোহৰ"],
   ["processor running at full speed", "পূৰ্ণ গতিত চলা প্ৰচেছৰ"]], 0,
  "A small standby supply keeps the real time clock and the power button wake circuit live, and a failing rail or a wake device can draw current all night. A powered down disk, a dark screen and an idle processor draw nothing, so none can explain the drain.",
  "সৰু ষ্টেণ্ডবাই যোগানে বাস্তৱ সময়ৰ ঘড়ী আৰু পাৱাৰ বুটামৰ জাগৰণ বৰ্তনী জীয়াই ৰাখে, আৰু বেয়া ৰে'ল বা জগোৱা যন্ত্ৰই গোটেই ৰাতি প্ৰবাহ টানিব পাৰে। বন্ধ ডিস্ক, এন্ধাৰ স্ক্ৰীণ আৰু অলস প্ৰচেছৰে একো নাটানে, সেয়ে কোনোটোৱেই ক্ষয় ব্যাখ্যা নকৰে।");

add("computer-186",
  "A scanned page is stored as an image rather than as text, so it cannot be searched. The process that would make it searchable is",
  "স্কেন কৰা পৃষ্ঠা পাঠ হিচাপে নহয় ছবি হিচাপে ৰখা হৈছে, সেয়ে ইয়াক সন্ধান কৰিব নোৱাৰি। তাক সন্ধানযোগ্য কৰা প্ৰক্ৰিয়া",
  [["optical character recognition", "অপ্টিকেল কেৰেক্টাৰ ৰিকগনিশ্যন"],
   ["optical mark recognition", "অপ্টিকেল মাৰ্ক ৰিকগনিশ্যন"],
   ["image compression", "ইমেজ কম্প্ৰেছন"],
   ["rasterisation", "ৰাষ্টাৰাইজেশ্যন"]], 0,
  "Optical character recognition converts the shapes in the image into machine readable characters, which is what makes search and copy possible. Mark recognition only detects filled boxes, compression shrinks the file without reading it, and rasterisation turns vectors into pixels.",
  "অপ্টিকেল কেৰেক্টাৰ ৰিকগনিশ্যনে ছবিৰ আকৃতি যন্ত্ৰই পঢ়িব পৰা আখৰলৈ সলনি কৰে, যিয়ে সন্ধান আৰু নকল সম্ভৱ কৰে। মাৰ্ক ৰিকগনিশ্যনে কেৱল ভৰোৱা বাকচ ধৰে, কম্প্ৰেছনে নপঢ়াকৈ ফাইল সৰু কৰে, আৰু ৰাষ্টাৰাইজেশ্যনে ভেক্টৰক পিক্সেললৈ সলায়।");

add("computer-187",
  "A computer has 4 GB of RAM and the operating system reports that about 1 GB is permanently in use before any program is opened. That memory is held by the",
  "কম্পিউটাৰত ৪ জিবি RAM আছে আৰু অপাৰেটিং চিষ্টেমে জনায় কোনো প্ৰ'গ্ৰাম নুখোলাকৈ প্ৰায় ১ জিবি স্থায়ীভাৱে ব্যৱহৃত। সেই স্মৃতি ধৰি ৰাখে",
  [["kernel and background services", "কাৰ্ণেল আৰু পৃষ্ঠভূমিৰ সেৱাই"],
   ["the BIOS chip", "BIOS চিপে"],
   ["the hard disk cache", "হাৰ্ড ডিস্ক কেশে"],
   ["the graphics card memory", "গ্ৰাফিক্স কাৰ্ডৰ স্মৃতিয়ে"]], 0,
  "The kernel, drivers and background services are loaded at boot and stay resident, which is the baseline memory use seen before any user program starts. The BIOS chip is non-volatile firmware rather than RAM, disk cache is used on demand and graphics memory is separate.",
  "কাৰ্ণেল, ড্ৰাইভাৰ আৰু পৃষ্ঠভূমিৰ সেৱা বুটত লোড হৈ ৰৈ যায়, যি কোনো ব্যৱহাৰকাৰী প্ৰ'গ্ৰাম আৰম্ভ হোৱাৰ আগতে দেখা মূল স্মৃতি ব্যৱহাৰ। BIOS চিপ RAM নহয় অস্থিৰ নোহোৱা ফাৰ্মৱেৰ, ডিস্ক কেশ প্ৰয়োজনত ব্যৱহৃত আৰু গ্ৰাফিক্স স্মৃতি পৃথক।");

add("computer-188",
  "Two programs each need to update the same record in a database. The operating system mechanism that prevents them writing at the same instant is",
  "দুখন প্ৰ'গ্ৰামে এটা ডেটাবেছ ৰেকৰ্ড একেসময়ত সলনি কৰিব লাগে। একেই মুহূৰ্তত লিখা ৰোধ কৰা অপাৰেটিং চিষ্টেমৰ ব্যৱস্থা",
  [["file or record locking", "ফাইল বা ৰেকৰ্ড লকিং"],
   ["spooling", "স্পুলিং"],
   ["buffering", "বাফাৰিং"],
   ["paging", "পেজিং"]], 0,
  "A lock grants one process exclusive access to the record until it releases it, which is what prevents a lost update. Spooling queues output for a slow device, buffering smooths data flow and paging moves memory pages to disk.",
  "লকে এটা প্ৰচেছক ৰেকৰ্ড এৰি নিদিয়ালৈকে একচেটীয়া প্ৰৱেশ দিয়ে, যিয়ে হেৰুওৱা নবীকৰণ ৰোধ কৰে। স্পুলিঙে লেহেমীয়া যন্ত্ৰৰ বাবে আউটপুট শাৰীত ৰাখে, বাফাৰিঙে তথ্যৰ প্ৰবাহ মসৃণ কৰে আৰু পেজিঙে স্মৃতিৰ পৃষ্ঠা ডিস্কলৈ নিয়ে।");

add("computer-189",
  "A user wants a machine that resumes in under two seconds and has no moving parts inside the storage device. The storage type that meets both requirements is",
  "ব্যৱহাৰকাৰীয়ে দুই ছেকেণ্ডতকৈ কম সময়ত পুনৰ আৰম্ভ হোৱা আৰু সংৰক্ষণ যন্ত্ৰৰ ভিতৰত চলন্ত অংগ নথকা যন্ত্ৰ বিচাৰে। দুয়োটা চৰ্ত পূৰ কৰা সংৰক্ষণ",
  [["solid state drive", "ছলিড ষ্টেট ড্ৰাইভ"],
   ["magnetic hard disk", "চুম্বকীয় হাৰ্ড ডিস্ক"],
   ["optical disc", "অপ্টিকেল ডিস্ক"],
   ["magnetic tape", "চুম্বকীয় টে'প"]], 0,
  "A solid state drive has no platters or heads, so it seeks in microseconds and resumes almost at once. A hard disk needs platter spin up and head movement, and optical discs and tape are far slower still.",
  "ছলিড ষ্টেট ড্ৰাইভত প্লেটাৰ বা হেড নাই, সেয়ে ই মাইক্ৰ'ছেকেণ্ডত বিচাৰি পায় আৰু প্ৰায় লগে লগে পুনৰ আৰম্ভ হয়। হাৰ্ড ডিস্কত প্লেটাৰ ঘূৰা আৰু হেড চলা লাগে, আৰু অপ্টিকেল ডিস্ক তথা টে'প বহু লেহেমীয়া।");

add("computer-190",
  "A user deletes a file and then empties the recycle bin, but the data can still be recovered with a specialist tool. The reason is that deletion",
  "ব্যৱহাৰকাৰীয়ে ফাইল মচি ৰিছাইকেল বিন খালী কৰে, কিন্তু বিশেষ সঁজুলিৰে তথ্য উদ্ধাৰ কৰিব পাৰি। কাৰণ মচিলে",
  [["removes the directory entry but leaves the blocks until overwritten", "ডাইৰেক্টৰিৰ প্ৰৱেশ আঁতৰায় কিন্তু খণ্ডবোৰ পুনৰ লিখাৰ আগলৈকে থাকে"],
   ["copies the file to a hidden folder", "ফাইলটো লুকুৱা ফ'ল্ডাৰলৈ নকল কৰে"],
   ["moves the file to the cloud", "ফাইলটো ক্লাউডলৈ নিয়ে"],
   ["compresses the file in place", "ফাইলটো তাতে সংকুচিত কৰে"]], 0,
  "Deletion marks the blocks as free but does not erase them, so recovery tools can read the old contents until something else writes over them. Nothing is copied, moved or compressed, which is why overwriting or secure erasure is needed for sensitive data.",
  "মচিলে খণ্ডবোৰ মুকলি বুলি চিহ্নিত কৰে কিন্তু নুমুৱাই নিদিয়ে, সেয়ে উদ্ধাৰ সঁজুলিয়ে আন কিছুই তাত নিলিখালৈকে পুৰণি বস্তু পঢ়িব পাৰে। একোৱেই নকল, স্থানান্তৰ বা সংকোচন নহয়, সেয়ে সংবেদনশীল তথ্যৰ বাবে পুনৰ লিখা বা সুৰক্ষিত মচন লাগে।");

add("computer-191",
  "A printer prints the same page twice for every document sent. The layer of software most likely to be misconfigured is the",
  "প্ৰিন্টাৰে পঠিওৱা প্ৰতিখন নথিৰ বাবে একেই পৃষ্ঠা দুবাৰ ছপা কৰে। ভুল সংৰচিত হোৱাৰ আটাই সম্ভাব্য ছফ্টৱেৰ স্তৰ",
  [["printer driver", "প্ৰিন্টাৰ ড্ৰাইভাৰ"],
   ["operating system scheduler", "অপাৰেটিং চিষ্টেমৰ শিডিউলাৰ"],
   ["web browser cache", "ৱেব ব্ৰাউজাৰ কেশ"],
   ["file system journal", "ফাইল চিষ্টেম জাৰ্ণাল"]], 0,
  "The driver translates the document into the printer's command language, and a wrong driver or a duplicate copy setting is what produces two pages. The scheduler decides when processes run, the browser cache stores web content and the journal records file system changes.",
  "ড্ৰাইভাৰে নথিখন প্ৰিন্টাৰৰ আদেশ ভাষালৈ সলনি কৰে, আৰু ভুল ড্ৰাইভাৰ বা নকল কপি ছেটিংেই দুটা পৃষ্ঠা কৰে। শিডিউলাৰে প্ৰচেছ কেতিয়া চলিব নিৰ্ণয় কৰে, ব্ৰাউজাৰ কেশে ৱেব বস্তু ৰাখে আৰু জাৰ্ণালে ফাইল চিষ্টেমৰ পৰিৱৰ্তন লিখে।");

add("computer-192",
  "A machine shows the correct time after being switched off for a week. The component that keeps the time is the",
  "এসপ্তাহ বন্ধ থকাৰ পিছতো যন্ত্ৰই শুদ্ধ সময় দেখুৱায়। সময় ৰখা অংশটো",
  [["CMOS battery backing the real time clock", "বাস্তৱ সময়ৰ ঘড়ীক সহায় কৰা CMOS বেটাৰী"],
   ["main power supply", "মূল পাৱাৰ ছাপ্লাই"],
   ["processor cache", "প্ৰচেছৰ কেশ"],
   ["hard disk controller", "হাৰ্ড ডিস্ক নিয়ন্ত্ৰক"]], 0,
  "A small battery keeps the real time clock chip running while mains power is off, which is why the date survives a week unplugged. The main supply is dead when unplugged, cache is volatile and the disk controller holds no clock.",
  "সৰু বেটাৰীয়ে মেইন পাৱাৰ বন্ধ থাকোতে বাস্তৱ সময়ৰ ঘড়ী চিপ চলাই ৰাখে, সেয়ে এসপ্তাহ প্লাগ খুলি থ'লেও তাৰিখ থাকে। মেইন যোগান প্লাগ খুলিলে মৃত, কেশ অস্থিৰ আৰু ডিস্ক নিয়ন্ত্ৰকত ঘড়ী নাই।");

add("computer-193",
  "A program crashes only on machines with a particular graphics card, and runs correctly everywhere else. This is best described as a problem of",
  "এখন প্ৰ'গ্ৰাম কেৱল এটা নিৰ্দিষ্ট গ্ৰাফিক্স কাৰ্ড থকা যন্ত্ৰত বন্ধ হয়, আৰু আন সকলো ঠাইত শুদ্ধভাৱে চলে। ইয়াক শ্ৰেষ্ঠভাৱে বৰ্ণনা কৰা হয়",
  [["compatibility between the software and the hardware", "ছফ্টৱেৰ আৰু হাৰ্ডৱেৰৰ মাজত সুসংগতি"],
   ["insufficient disk space", "অপৰ্যাপ্ত ডিস্ক স্থান"],
   ["a slow internet connection", "লেহেমীয়া ইণ্টাৰনেট সংযোগ"],
   ["a weak password policy", "দুৰ্বল পাছৱৰ্ড নীতি"]], 0,
  "The failure follows one hardware model, so the cause is how the software interacts with that device, which is a compatibility problem. Disk space, network speed and password policy would not track a graphics card model.",
  "বিফলতা এটা হাৰ্ডৱেৰ মডেলৰ লগত যায়, সেয়ে কাৰণ ছফ্টৱেৰে সেই যন্ত্ৰৰ লগত কেনেকৈ ক্ৰিয়া কৰে, যি সুসংগতিৰ সমস্যা। ডিস্ক স্থান, নেটৱৰ্কৰ গতি আৰু পাছৱৰ্ড নীতিয়ে গ্ৰাফিক্স কাৰ্ডৰ মডেল অনুসৰণ নকৰে।");

add("computer-194",
  "An organisation wants each department's data isolated on one physical server without buying six servers. The technology that provides this is",
  "সংস্থাই ছয়খন চাৰ্ভাৰ নকিনাকৈ এটা ভৌতিক চাৰ্ভাৰত প্ৰতিটো বিভাগৰ তথ্য পৃথক ৰাখিব বিচাৰে। এই সুবিধা দিয়া প্ৰযুক্তি",
  [["virtualisation", "ভাৰ্চুৱেলাইজেশ্যন"],
   ["defragmentation", "ডিফ্ৰেগমেণ্টেশ্যন"],
   ["compression", "কম্প্ৰেছন"],
   ["caching", "কেশিং"]], 0,
  "A hypervisor runs several isolated virtual machines on one host, each with its own operating system and data. Defragmentation rearranges disk blocks, compression shrinks files and caching speeds repeat access, none of which separates departments.",
  "হাইপাৰভাইজাৰে এটা হ'ষ্টত কেইবাটাও পৃথক ভাৰ্চুৱেল মেচিন চলায়, প্ৰত্যেকৰ নিজা অপাৰেটিং চিষ্টেম আৰু তথ্যৰ সৈতে। ডিফ্ৰেগমেণ্টেশ্যনে ডিস্কৰ খণ্ড সজায়, কম্প্ৰেছনে ফাইল সৰু কৰে আৰু কেশিঙে পুনৰ প্ৰৱেশ দ্ৰুত কৰে, কোনোৱেই বিভাগ পৃথক নকৰে।");

add("computer-195",
  "A user asks why a 64 bit operating system can use more memory than a 32 bit one. The reason is that a 64 bit processor can address",
  "ব্যৱহাৰকাৰীয়ে সোধে ৬৪ বিট অপাৰেটিং চিষ্টেমে ৩২ বিটতকৈ বেছি স্মৃতি কিয় ব্যৱহাৰ কৰিব পাৰে। কাৰণ ৬৪ বিট প্ৰচেছৰে সম্বোধন কৰিব পাৰে",
  [["a far larger range of memory addresses", "অনেক বেছি স্মৃতি ঠিকনাৰ পৰিসৰ"],
   ["faster disk sectors", "দ্ৰুততৰ ডিস্ক ছেক্টৰ"],
   ["a bigger screen resolution only", "কেৱল ডাঙৰ স্ক্ৰীণ ৰিজ'লিউশ্যন"],
   ["more USB ports", "বেছি USB প'ৰ্ট"]], 0,
  "Address width sets how many distinct addresses the processor can name, and doubling the width squares the count, so 64 bit machines reach far beyond the 4 GB ceiling of 32 bit. Disk sector speed, screen resolution and port count are unrelated to addressing.",
  "ঠিকনাৰ প্ৰস্থই নিৰ্ণয় কৰে প্ৰচেছৰে কিমান বেলেগ ঠিকনা নাম দিব পাৰে, আৰু প্ৰস্থ দুগুণ হ'লে সংখ্যা বৰ্গিত হয়, সেয়ে ৬৪ বিট যন্ত্ৰই ৩২ বিটৰ ৪ জিবি সীমাৰ বহু ওপৰলৈ যায়। ডিস্ক ছেক্টৰৰ গতি, ৰিজ'লিউশ্যন আৰু প'ৰ্ট সংখ্যা সম্বোধনৰ সৈতে সম্পৰ্কহীন।");

add("computer-196",
  "A file of 1,024 bytes is copied and the copy is reported as exactly 1 KiB. This is correct because a kibibyte is",
  "১,০২৪ বাইটৰ ফাইল নকল কৰি নকলটো ঠিক ১ KiB বুলি জনোৱা হ'ল। ই শুদ্ধ কাৰণ এটা কিবিবাইট",
  [["1,024 bytes", "১,০২৪ বাইট"],
   ["1,000 bytes", "১,০০০ বাইট"],
   ["1,024 bits", "১,০২৪ বিট"],
   ["1,000 bits", "১,০০০ বিট"]], 0,
  "The binary prefixes kilo, mega and giga as kibi, mebi and gibi step by powers of 1,024, so one kibibyte is 1,024 bytes. A kilobyte in decimal is 1,000 bytes, and bits rather than bytes would be an eighth of the size.",
  "দ্বিমিক উপসৰ্গ কিল', মেগা আৰু গিগাৰ কিবি, মেবি আৰু গিবি ১,০২৪ ৰ ঘাতত বাঢ়ে, সেয়ে এক কিবিবাইট ১,০২৪ বাইট। দশমিক কিলোবাইট ১,০০০ বাইট, আৰু বিট হ'লে আকাৰৰ আঠ ভাগৰ এভাগ হ'লহেঁতেন।");

add("computer-197",
  "A technician replaces a failing power supply and the machine now restarts at random. The specification most likely to have been ignored is the",
  "কৰ্মীয়ে বেয়া পাৱাৰ ছাপ্লাই সলনি কৰাৰ পিছত যন্ত্ৰই যিকোনো সময়ত পুনৰ আৰম্ভ হয়। আটাই সম্ভাব্য অৱহেলা কৰা নিৰ্দিষ্টতা",
  [["wattage and rail current rating", "ৱাট আৰু ৰে'ল প্ৰবাহৰ ৰেটিং"],
   ["colour of the casing", "কেচিঙৰ ৰং"],
   ["length of the warranty", "ৱাৰেণ্টিৰ সময়"],
   ["brand of the fan", "ফেনৰ ব্ৰেণ্ড"]], 0,
  "A supply that cannot deliver the required wattage on each rail sags under load and the machine resets, so the rating must match the components. Casing colour, warranty length and fan brand do not affect whether the machine stays on.",
  "প্ৰতিটো ৰে'লত প্ৰয়োজনীয় ৱাট দিব নোৱাৰা যোগানে ভাৰত দুৰ্বল হৈ যন্ত্ৰ পুনৰ আৰম্ভ কৰায়, সেয়ে ৰেটিং অংশবোৰৰ লগত মিলিব লাগে। কেচিঙৰ ৰং, ৱাৰেণ্টি আৰু ফেনৰ ব্ৰেণ্ডে যন্ত্ৰ চলি থকা নে নাই তাত প্ৰভাৱ নপেলায়।");

add("computer-198",
  "A user wants to run a second operating system on the same disk without losing the first. The correct approach is to",
  "ব্যৱহাৰকাৰীয়ে প্ৰথমটো নেহেৰুৱাকৈ একেই ডিস্কত দ্বিতীয় অপাৰেটিং চিষ্টেম চলাব বিচাৰে। শুদ্ধ উপায়",
  [["create a separate partition and install a boot manager", "পৃথক পাৰ্টিশ্যন সাজি বুট পৰিচালক লগোৱা"],
   ["delete the first operating system", "প্ৰথম অপাৰেটিং চিষ্টেম মচি পেলোৱা"],
   ["convert the disk to a single partition", "ডিস্ক এটা পাৰ্টিশ্যনলৈ সলনি কৰা"],
   ["install both into the same folder", "দুয়োটা একেই ফ'ল্ডাৰত লগোৱা"]], 0,
  "Each system needs its own partition and a boot manager chooses between them at startup, which is what dual boot means. Deleting the first system or merging partitions destroys it, and two systems cannot share one folder.",
  "প্ৰতিটো ব্যৱস্থাৰ নিজা পাৰ্টিশ্যন লাগে আৰু বুট পৰিচালকে আৰম্ভণিতে বাছনি কৰে, যি ডুৱেল বুটৰ অৰ্থ। প্ৰথম ব্যৱস্থা মচা বা পাৰ্টিশ্যন মিলালে তাক নষ্ট কৰে, আৰু দুটা ব্যৱস্থাই এটা ফ'ল্ডাৰ ভাগ কৰিব নোৱাৰে।");

add("computer-199",
  "A laptop fan runs continuously at high speed although no program is open. The most likely cause is",
  "কোনো প্ৰ'গ্ৰাম নুখোলাকৈও লেপটপৰ ফেনে অহৰহ উচ্চ গতিত ঘূৰে। আটাই সম্ভাব্য কাৰণ",
  [["dust blocking the heatsink fins", "হিটচিংকৰ পাখি বন্ধ কৰা ধূলি"],
   ["a full recycle bin", "ভৰা ৰিছাইকেল বিন"],
   ["an empty desktop folder", "খালী ডেস্কটপ ফ'ল্ডাৰ"],
   ["a large number of saved passwords", "সাঁচি ৰখা বহু পাছৱৰ্ড"]], 0,
  "Dust between the fins stops heat leaving the heatsink, so the firmware raises fan speed to keep the processor within limits. A full recycle bin, an empty folder or stored passwords add no heat load.",
  "পাখিৰ মাজৰ ধূলিয়ে হিটচিংকৰপৰা তাপ ওলোৱা ৰোধ কৰে, সেয়ে ফাৰ্মৱেৰে প্ৰচেছৰ সীমাৰ ভিতৰত ৰাখিবলৈ ফেনৰ গতি বঢ়ায়। ভৰা ৰিছাইকেল বিন, খালী ফ'ল্ডাৰ বা সাঁচি ৰখা পাছৱৰ্ডে তাপৰ ভাৰ যোগ নকৰে।");

add("computer-200",
  "An office wants a machine that can be used by a visitor without giving access to stored files. The setting that achieves this with least effort is",
  "অফিচে এনে যন্ত্ৰ বিচাৰে যি দৰ্শনাৰ্থীয়ে ব্যৱহাৰ কৰিব পাৰে কিন্তু সাঁচি ৰখা ফাইললৈ প্ৰৱেশ নাপায়। আটাই কম পৰিশ্ৰমেৰে তাক কৰা ছেটিং",
  [["a guest account with restricted permissions", "সীমিত অনুমতিসহ অতিথি একাউণ্ট"],
   ["an administrator account shared openly", "মুকলিকৈ ভগা প্ৰশাসক একাউণ্ট"],
   ["disabling the screen lock", "স্ক্ৰীণ লক বন্ধ কৰা"],
   ["turning off the firewall", "ফায়াৰৱাল বন্ধ কৰা"]], 0,
  "A guest account gives a usable desktop while denying access to other users' files and to system settings. A shared administrator account grants full control, and disabling the lock or the firewall removes protections rather than adding them.",
  "অতিথি একাউণ্টে ব্যৱহাৰযোগ্য ডেস্কটপ দিয়ে কিন্তু আন ব্যৱহাৰকাৰীৰ ফাইল আৰু ব্যৱস্থাৰ ছেটিংলৈ প্ৰৱেশ নাকচ কৰে। ভগা প্ৰশাসক একাউণ্টে সম্পূৰ্ণ নিয়ন্ত্ৰণ দিয়ে, আৰু লক বা ফায়াৰৱাল বন্ধ কৰিলে সুৰক্ষা আঁতৰে, যোগ নহয়।");

/* ================= hardware-software ================= */
useLeaf("hardware-software");

add("computer-201",
  "A user installs a new printer and it appears in the device list but prints blank pages. The layer that most likely needs updating is the",
  "ব্যৱহাৰকাৰীয়ে নতুন প্ৰিন্টাৰ লগোৱাৰ পিছত ই যন্ত্ৰৰ তালিকাত ওলায় কিন্তু খালী পৃষ্ঠা ছপা কৰে। আটাই সম্ভাব্য নবীকৰণৰ প্ৰয়োজন থকা স্তৰ",
  [["device driver", "ডিভাইচ ড্ৰাইভাৰ"],
   ["power supply unit", "পাৱাৰ ছাপ্লাই ইউনিট"],
   ["hard disk firmware", "হাৰ্ড ডিস্ক ফাৰ্মৱেৰ"],
   ["monitor cable", "মণিটৰ কেবল"]], 0,
  "The driver converts the document into the printer's own command language, and a generic or outdated one produces blank or garbled output even though the device is detected. The power supply, disk firmware and monitor cable play no part in page content.",
  "ড্ৰাইভাৰে নথিখন প্ৰিন্টাৰৰ নিজা আদেশ ভাষালৈ সলায়, আৰু সাধাৰণ বা পুৰণি ড্ৰাইভাৰে যন্ত্ৰ চিনাক্ত হ'লেও খালী বা বিকৃত আউটপুট দিয়ে। পাৱাৰ ছাপ্লাই, ডিস্ক ফাৰ্মৱেৰ আৰু মণিটৰ কেবলৰ পৃষ্ঠাৰ বস্তুত কোনো ভূমিকা নাই।");

add("computer-202",
  "An EPROM chip is removed from a board, exposed to strong ultraviolet light through a quartz window and then reprogrammed. The property being exploited is that EPROM is",
  "এপ্ৰম চিপ ব'ৰ্ডৰপৰা খুলি কোৱাৰ্টজ খিৰিকীৰে প্ৰবল অতিৰক্ত ৰশ্মিত ৰাখি পুনৰ প্ৰ'গ্ৰাম কৰা হ'ল। ব্যৱহৃত ধৰ্মটো — এপ্ৰম",
  [["erasable and rewritable", "মচিব পৰা আৰু পুনৰ লিখিব পৰা"],
   ["volatile", "অস্থিৰ"],
   ["read only forever", "চিৰকাল কেৱল পঢ়াৰ"],
   ["magnetic", "চুম্বকীয়"]], 0,
  "Ultraviolet light clears the floating gates of an erasable programmable read only memory so it can be written again, which is exactly what the window exists for. A volatile chip would lose its contents on power loss, a truly read only chip could never be rewritten and EPROM is not magnetic.",
  "অতিৰক্ত ৰশ্মিয়ে মচিব পৰা প্ৰ'গ্ৰামেবল ৰিড অ'নলি মেমৰিৰ ওপঙা গেট পৰিষ্কাৰ কৰে যাতে পুনৰ লিখিব পাৰি, খিৰিকী তাৰ বাবেই থাকে। অস্থিৰ চিপে পাৱাৰ যোৱাত বস্তু হেৰুৱালেহেঁতেন, সঁচাকৈ কেৱল পঢ়া চিপ কেতিয়াও পুনৰ লিখা নহ'লহেঁতেন আৰু এপ্ৰম চুম্বকীয় নহয়।");

add("computer-203",
  "A compiler is used rather than an interpreter for a program that must run as fast as possible in production. The reason is that a compiler",
  "উৎপাদনত যিমান পাৰি দ্ৰুত চলিবলগীয়া প্ৰ'গ্ৰামৰ বাবে ইন্টাৰপ্ৰেটৰৰ সলনি কম্পাইলাৰ ব্যৱহাৰ কৰা হয়। কাৰণ কম্পাইলাৰে",
  [["translates the whole program once into machine code", "গোটেই প্ৰ'গ্ৰাম এবাৰ যন্ত্ৰ সংকেতলৈ সলায়"],
   ["runs the source line by line each time", "প্ৰতিবাৰ উৎস শাৰী শাৰী চলায়"],
   ["needs no memory at all", "স্মৃতি একেবাৰে নালাগে"],
   ["works only on interpreted languages", "কেৱল ইন্টাৰপ্ৰেটেড ভাষাত কাম কৰে"]], 0,
  "A compiler produces an executable once, and the processor then runs machine code directly, which is why compiled programs are faster. Line by line execution is what an interpreter does, and no program runs without memory.",
  "কম্পাইলাৰে এবাৰ চলনযোগ্য ফাইল বনায়, আৰু তাৰ পিছত প্ৰচেছৰে পোনপটীয়াকৈ যন্ত্ৰ সংকেত চলায়, সেয়ে কম্পাইল কৰা প্ৰ'গ্ৰাম দ্ৰুত। শাৰী শাৰী চলোৱা ইন্টাৰপ্ৰেটৰৰ কাম, আৰু কোনো প্ৰ'গ্ৰাম স্মৃতি নোহোৱাকৈ নচলে।");

add("computer-204",
  "A company wants to lower licence costs and still modify the software to suit its workflow. The licensing model that allows this is",
  "কোম্পানীয়ে অনুজ্ঞা খৰচ কমাই নিজৰ কামৰ ধাৰালৈ ছফ্টৱেৰ সলনি কৰিব বিচাৰে। তাক অনুমতি দিয়া অনুজ্ঞা আৰ্হি",
  [["free and open source", "বিনামূলীয়া আৰু মুকলি উৎস"],
   ["proprietary single seat", "মালিকানাধীন এক আসন"],
   ["subscription with no source", "উৎস নোহোৱা চাবস্ক্ৰিপশ্যন"],
   ["trial version", "পৰীক্ষামূলক সংস্কৰণ"]], 0,
  "An open source licence grants the source code and the right to modify and redistribute it, which removes per seat fees. Proprietary, subscription without source and trial licences all withhold the source and usually forbid modification.",
  "মুকলি উৎস অনুজ্ঞাই উৎস সংকেত আৰু তাক সলনি তথা পুনৰ বিতৰণৰ অধিকাৰ দিয়ে, যিয়ে প্ৰতি আসনৰ মাচুল আঁতৰায়। মালিকানাধীন, উৎস নোহোৱা চাবস্ক্ৰিপশ্যন আৰু পৰীক্ষামূলক অনুজ্ঞাই উৎস লুকুৱায় আৰু সাধাৰণতে সলনি নিষিদ্ধ কৰে।");

add("computer-205",
  "A laptop will not power on and no lights appear when the charger is connected. The first check should be the",
  "লেপটপ অন নহয় আৰু চাৰ্জাৰ লগালেও কোনো পোহৰ নোলায়। প্ৰথম পৰীক্ষা হ'ব লাগে",
  [["charger output and the power jack connection", "চাৰ্জাৰৰ আউটপুট আৰু পাৱাৰ জেকৰ সংযোগ"],
   ["operating system version", "অপাৰেটিং চিষ্টেমৰ সংস্কৰণ"],
   ["amount of free disk space", "মুক্ত ডিস্ক স্থান"],
   ["installed antivirus", "লগোৱা এণ্টিভাইৰাছ"]], 0,
  "With no lights at all the fault is upstream of the logic board, so the adapter voltage and the jack are checked first. The operating system, disk space and antivirus only matter once the machine is receiving power.",
  "কোনো পোহৰ নোহোৱা অৱস্থাত ত্ৰুটিটো লজিক ব'ৰ্ডৰ আগতেই, সেয়ে প্ৰথমে এডাপ্টাৰৰ ভল্টেজ আৰু জেক পৰীক্ষা কৰা হয়। অপাৰেটিং চিষ্টেম, ডিস্ক স্থান আৰু এণ্টিভাইৰাছ যন্ত্ৰই পাৱাৰ পোৱাৰ পিছতহে গুৰুত্বপূৰ্ণ।");

add("computer-206",
  "A user is asked to keep a copy of a project on an external drive and also in the cloud. The practice being applied is",
  "ব্যৱহাৰকাৰীক প্ৰকল্পৰ নকল এটা বাহ্যিক ড্ৰাইভত আৰু ক্লাউডতো ৰাখিবলৈ কোৱা হ'ল। প্ৰয়োগ কৰা অভ্যাসটো",
  [["the three two one backup rule", "তিনি দুই এক বেকআপ নিয়ম"],
   ["defragmentation", "ডিফ্ৰেগমেণ্টেশ্যন"],
   ["overclocking", "অভাৰক্লকিং"],
   ["paging", "পেজিং"]], 0,
  "The rule asks for three copies, on two different media, with one off site, and an external drive plus cloud satisfies it. Defragmentation tidies disk blocks, overclocking raises clock speed and paging moves memory to disk, none of which protects data.",
  "নিয়মে তিনি নকল, দুই বেলেগ মাধ্যমত, এটা বাহিৰত বিচাৰে, আৰু বাহ্যিক ড্ৰাইভ তথা ক্লাউডে তাক পূৰায়। ডিফ্ৰেগমেণ্টেশ্যনে ডিস্কৰ খণ্ড সজায়, অভাৰক্লকিঙে ঘড়ীৰ গতি বঢ়ায় আৰু পেজিঙে স্মৃতি ডিস্কলৈ নিয়ে, কোনোৱেই তথ্য সুৰক্ষা নকৰে।");

add("computer-207",
  "A desktop shuts down abruptly after a few minutes of heavy work and restarts. The component most likely to be failing is the",
  "ডেস্কটপে কেইমিনিট গধুৰ কামৰ পিছত হঠাতে বন্ধ হৈ পুনৰ আৰম্ভ হয়। আটাই সম্ভাব্য বেয়া হোৱা অংশ",
  [["power supply unit", "পাৱাৰ ছাপ্লাই ইউনিট"],
   ["keyboard", "কীব'ৰ্ড"],
   ["sound card", "ছাউণ্ড কাৰ্ড"],
   ["web camera", "ৱেব কেমেৰা"]], 0,
  "A supply that cannot hold its rails under load cuts out and the machine restarts, which is why the fault appears only under heavy work. Keyboards, sound cards and web cameras draw little and would not cause a shutdown.",
  "ভাৰত ৰে'ল ধৰি ৰাখিব নোৱাৰা যোগানে কটা দি যন্ত্ৰ পুনৰ আৰম্ভ কৰায়, সেয়ে ত্ৰুটি কেৱল গধুৰ কামত ওলায়। কীব'ৰ্ড, ছাউণ্ড কাৰ্ড আৰু ৱেব কেমেৰাই কম টানে আৰু বন্ধ নকৰায়।");

add("computer-208",
  "A file is 4 GB and must be copied to a single storage device. The file system that cannot hold it is",
  "ফাইলটো ৪ জিবি আৰু এটা সংৰক্ষণ যন্ত্ৰলৈ নকল কৰিব লাগে। তাক ধৰি ৰাখিব নোৱাৰা ফাইল চিষ্টেম",
  [["FAT32", "FAT32"],
   ["NTFS", "NTFS"],
   ["exFAT", "exFAT"],
   ["ext4", "ext4"]], 0,
  "FAT32 caps a single file at just under 4 GB, so a 4 GB file fails to copy. NTFS, exFAT and ext4 all handle files far larger than that.",
  "FAT32 এ এটা ফাইলক ৪ জিবিৰ অলপ তলত সীমাবদ্ধ কৰে, সেয়ে ৪ জিবি ফাইল নকল নহয়। NTFS, exFAT আৰু ext4 এ তাৰ বহু ডাঙৰ ফাইল ধৰি ৰাখে।");

add("computer-209",
  "An office buys a machine for video editing and must choose between integrated and dedicated graphics. The dedicated card is preferred because it has",
  "অফিচে ভিডিঅ' সম্পাদনাৰ বাবে যন্ত্ৰ কিনি সংহত আৰু পৃথক গ্ৰাফিক্সৰ মাজত বাছনি কৰিব লাগে। পৃথক কাৰ্ড শ্ৰেষ্ঠ কাৰণ ইয়াত আছে",
  [["its own processor and memory", "নিজা প্ৰচেছৰ আৰু স্মৃতি"],
   ["a larger hard disk", "ডাঙৰ হাৰ্ড ডিস্ক"],
   ["a faster network port", "দ্ৰুত নেটৱৰ্ক প'ৰ্ট"],
   ["a quieter fan", "নীৰৱ ফেন"]], 0,
  "A dedicated card carries a graphics processor and its own video memory, so rendering does not compete with the main processor and RAM. Disk size, network port and fan noise do not determine rendering performance.",
  "পৃথক কাৰ্ডত গ্ৰাফিক্স প্ৰচেছৰ আৰু নিজা ভিডিঅ' স্মৃতি থাকে, সেয়ে ৰেণ্ডাৰিঙে মূল প্ৰচেছৰ আৰু RAM ৰ লগত প্ৰতিযোগিতা নকৰে। ডিস্কৰ আকাৰ, নেটৱৰ্ক প'ৰ্ট আৰু ফেনৰ শব্দই ৰেণ্ডাৰিঙৰ কাৰ্যদক্ষতা নিৰ্ণয় নকৰে।");

add("computer-210",
  "A user reports that a program works on one machine but shows missing library errors on another. The concept that explains this is",
  "ব্যৱহাৰকাৰীয়ে জনায় যে প্ৰ'গ্ৰাম এখন যন্ত্ৰত চলে কিন্তু আন এখনত লাইব্ৰেৰী নোহোৱাৰ ত্ৰুটি দেখুৱায়। ইয়াক ব্যাখ্যা কৰা ধাৰণা",
  [["software dependency", "ছফ্টৱেৰ নিৰ্ভৰশীলতা"],
   ["hardware interrupt", "হাৰ্ডৱেৰ ইণ্টাৰাপ্ট"],
   ["disk fragmentation", "ডিস্ক ফ্ৰেগমেণ্টেশ্যন"],
   ["screen resolution", "স্ক্ৰীণ ৰিজ'লিউশ্যন"]], 0,
  "The program relies on shared libraries being present, so a machine without them cannot load it, which is a dependency problem. Interrupts are hardware signals, fragmentation affects read speed and resolution affects display only.",
  "প্ৰ'গ্ৰামে ভগা লাইব্ৰেৰী থকাৰ ওপৰত নিৰ্ভৰ কৰে, সেয়ে নথকা যন্ত্ৰত লোড নহয়, যি নিৰ্ভৰশীলতাৰ সমস্যা। ইণ্টাৰাপ্ট হাৰ্ডৱেৰ সংকেত, ফ্ৰেগমেণ্টেশনে পঢ়াৰ গতিত প্ৰভাৱ পেলায় আৰু ৰিজ'লিউশ্যনে কেৱল প্ৰদৰ্শনত।");

add("computer-211",
  "A laptop battery reports 100 per cent but the machine switches off after twenty minutes. The most likely explanation is",
  "লেপটপ বেটাৰীয়ে ১০০ শতাংশ দেখুৱায় কিন্তু বিশ মিনিটৰ পিছত যন্ত্ৰ বন্ধ হয়। আটাই সম্ভাব্য ব্যাখ্যা",
  [["the battery has lost capacity and needs recalibration or replacement", "বেটাৰীৰ ধাৰণক্ষমতা কমি পুনৰ কেলিব্ৰেশ্যন বা সলনিৰ প্ৰয়োজন"],
   ["the screen is too bright", "স্ক্ৰীণ অতি উজ্জ্বল"],
   ["the keyboard is dirty", "কীব'ৰ্ড মলিয়ন"],
   ["the web browser is open", "ৱেব ব্ৰাউজাৰ খোলা"]], 0,
  "An aged cell holds far less charge than its controller estimates, so the percentage is wrong and the machine dies early, which recalibration or replacement corrects. Brightness, a dirty keyboard or an open browser shorten run time slightly but cannot cause a sudden shutdown at a full reading.",
  "পুৰণি কোষে নিয়ন্ত্ৰকে অনুমান কৰাতকৈ বহু কম আধান ধৰে, সেয়ে শতাংশ ভুল হয় আৰু যন্ত্ৰ সোনকালে মৰে, যি কেলিব্ৰেশ্যন বা সলনিয়ে শুধৰায়। উজ্জ্বলতা, মলিয়ন কীব'ৰ্ড বা খোলা ব্ৰাউজাৰে চলাৰ সময় অলপ কমায় কিন্তু পূৰ্ণ পঢ়াত হঠাতে বন্ধ কৰিব নোৱাৰে।");

add("computer-212",
  "An organisation must run the same application on 200 identical desktops with a single standard configuration. The technology used is",
  "সংস্থাই এটা মানক সংৰচনাসহ ২০০ এখন একেই ডেস্কটপত একেই এপ্লিকেশ্যন চলাব লাগে। ব্যৱহৃত প্ৰযুক্তি",
  [["disk imaging and deployment", "ডিস্ক ইমেজিং আৰু মোতায়েন"],
   ["manual installation on each machine", "প্ৰতিখন যন্ত্ৰত হাতেৰে ইনষ্টল"],
   ["overclocking", "অভাৰক্লকিং"],
   ["defragmentation", "ডিফ্ৰেগমেণ্টেশ্যন"]], 0,
  "An image captures the configured system once and is written to every machine, which gives an identical result without repeating the work. Manual installation invites drift, and overclocking or defragmentation do not deploy software.",
  "ইমেজে সংৰচিত ব্যৱস্থা এবাৰ ধৰি ৰাখি প্ৰতিখন যন্ত্ৰত লিখে, যিয়ে কাম পুনৰ নকৰাকৈ একেই ফল দিয়ে। হাতেৰে ইনষ্টল কৰিলে পাৰ্থক্য আহে, আৰু অভাৰক্লকিং বা ডিফ্ৰেগমেণ্টেশ্যনে ছফ্টৱেৰ মোতায়েন নকৰে।");

add("computer-213",
  "A user asks whether a USB flash drive is an input or an output device. The correct answer is that it is",
  "ব্যৱহাৰকাৰীয়ে সোধে USB ফ্লেশ ড্ৰাইভ ইনপুট নে আউটপুট যন্ত্ৰ। শুদ্ধ উত্তৰ — ই",
  [["both, because data can be read from it and written to it", "দুয়োটাই, কাৰণ ইয়াৰপৰা তথ্য পঢ়িব আৰু তালৈ লিখিব পাৰি"],
   ["only an input device", "কেৱল ইনপুট যন্ত্ৰ"],
   ["only an output device", "কেৱল আউটপুট যন্ত্ৰ"],
   ["neither, because it is storage only", "কোনোটোৱেই নহয়, কাৰণ ই কেৱল সংৰক্ষণ"]], 0,
  "The same device is an input when the computer reads from it and an output when it writes to it, so it is both depending on the direction of transfer. Calling it only input, only output or neither misreads how storage devices are classified.",
  "একেই যন্ত্ৰ কম্পিউটাৰে পঢ়িলে ইনপুট আৰু লিখিলে আউটপুট, সেয়ে স্থানান্তৰৰ দিশ অনুসৰি দুয়োটাই। কেৱল ইনপুট, কেৱল আউটপুট বা কোনোটোৱেই নহয় বুলিলে সংৰক্ষণ যন্ত্ৰৰ শ্ৰেণীবিভাগ ভুল বুজা যায়।");

add("computer-214",
  "A program must keep working on a machine whose RAM is far smaller than the data it processes. The operating system feature that makes this possible is",
  "এখন প্ৰ'গ্ৰামে এনে যন্ত্ৰত কাম কৰি থাকিব লাগে যাৰ RAM ত ইয়াৰ তথ্যতকৈ বহু কম। তাক সম্ভৱ কৰা অপাৰেটিং চিষ্টেমৰ সুবিধা",
  [["virtual memory with paging", "পেজিংসহ ভাৰ্চুৱেল স্মৃতি"],
   ["a larger monitor", "ডাঙৰ মণিটৰ"],
   ["a faster keyboard", "দ্ৰুত কীব'ৰ্ড"],
   ["a higher screen resolution", "বেছি স্ক্ৰীণ ৰিজ'লিউশ্যন"]], 0,
  "Virtual memory presents disk space as an extension of RAM and paging moves the needed parts in and out, so a program larger than memory still runs. Monitor size, keyboard speed and resolution have no bearing on memory capacity.",
  "ভাৰ্চুৱেল স্মৃতিয়ে ডিস্ক স্থানক RAM ৰ সম্প্ৰসাৰণ হিচাপে দেখুৱায় আৰু পেজিঙে প্ৰয়োজনীয় অংশ সোমোৱাই-ওলিয়াই থাকে, সেয়ে স্মৃতিতকৈ ডাঙৰ প্ৰ'গ্ৰামো চলে। মণিটৰৰ আকাৰ, কীব'ৰ্ডৰ গতি আৰু ৰিজ'লিউশ্যনৰ স্মৃতি ধাৰণক্ষমতাৰ সৈতে সম্পৰ্ক নাই।");

add("computer-215",
  "A technician must decide whether a fault lies in hardware or software. The quickest discriminating test is to",
  "কৰ্মীয়ে নিৰ্ণয় কৰিব লাগে ত্ৰুটি হাৰ্ডৱেৰত নে ছফ্টৱেৰত। আটাই দ্ৰুত পাৰ্থক্য কৰা পৰীক্ষা",
  [["boot the machine from a live operating system on removable media", "অপসাৰণযোগ্য মাধ্যমত থকা জীৱন্ত অপাৰেটিং চিষ্টেমৰপৰা যন্ত্ৰ বুট কৰা"],
   ["reinstall the current operating system", "বৰ্তমান অপাৰেটিং চিষ্টেম পুনৰ ইনষ্টল কৰা"],
   ["replace the hard disk", "হাৰ্ড ডিস্ক সলনি কৰা"],
   ["run a full antivirus scan", "সম্পূৰ্ণ এণ্টিভাইৰাছ স্কেন চলোৱা"]], 0,
  "Booting a known good system from removable media bypasses the installed software entirely, so a healthy session points to software and a failure points to hardware. Reinstalling or replacing parts destroys evidence and may cost hours, and an antivirus scan tests only for malware.",
  "অপসাৰণযোগ্য মাধ্যমৰপৰা জনা ভাল ব্যৱস্থা বুট কৰিলে ইনষ্টল কৰা ছফ্টৱেৰ সম্পূৰ্ণ এৰাই যায়, সেয়ে সুস্থ অধিবেশনে ছফ্টৱেৰ আৰু বিফলতাই হাৰ্ডৱেৰ দেখুৱায়। পুনৰ ইনষ্টল বা অংশ সলনিয়ে প্ৰমাণ নষ্ট কৰি কেইঘণ্টামান খৰচ কৰিব পাৰে, আৰু এণ্টিভাইৰাছ স্কেনে কেৱল মেলৱেৰ পৰীক্ষা কৰে।");

add("computer-216",
  "A user is told that the machine's bus width is 64 bit. This means that",
  "ব্যৱহাৰকাৰীক কোৱা হ'ল যে যন্ত্ৰৰ বাছ প্ৰস্থ ৬৪ বিট। ইয়াৰ অৰ্থ",
  [["64 bits can move between components at one time", "একেসময়ত অংশবোৰৰ মাজত ৬৪ বিট যাব পাৰে"],
   ["the disk holds 64 bits", "ডিস্কত ৬৪ বিট থাকে"],
   ["the screen shows 64 colours", "স্ক্ৰীণে ৬৪ ৰং দেখুৱায়"],
   ["the machine has 64 ports", "যন্ত্ৰত ৬৪ প'ৰ্ট আছে"]], 0,
  "Bus width is the number of bits carried in parallel in one transfer, so a 64 bit bus moves more data per cycle than a 32 bit one. Disk capacity, colour depth and port count are separate specifications.",
  "বাছ প্ৰস্থ হ'ল এটা স্থানান্তৰত সমান্তৰালভাৱে কঢ়া বিটৰ সংখ্যা, সেয়ে ৬৪ বিট বাছে ৩২ বিটতকৈ প্ৰতি চক্ৰত বেছি তথ্য নিয়ে। ডিস্কৰ ধাৰণক্ষমতা, ৰঙৰ গভীৰতা আৰু প'ৰ্ট সংখ্যা পৃথক নিৰ্দিষ্টতা।");

add("computer-217",
  "An office PC is used only for typing and email but has a 2 TB drive that is never more than a tenth full. The most useful upgrade for speed would be",
  "অফিচৰ পিচি কেৱল টাইপিং আৰু ইমেইলৰ বাবে ব্যৱহৃত কিন্তু ২ টেৰাবাইট ড্ৰাইভ কেতিয়াও দহ ভাগৰ এভাগৰ বেছি ভৰে নাই। গতিৰ বাবে আটাই উপযোগী উন্নয়ন",
  [["replacing the hard disk with a solid state drive", "হাৰ্ড ডিস্কক ছলিড ষ্টেট ড্ৰাইভেৰে সলনি কৰা"],
   ["adding a second 2 TB hard disk", "দ্বিতীয় ২ টেৰাবাইট হাৰ্ড ডিস্ক যোগ কৰা"],
   ["buying a larger monitor", "ডাঙৰ মণিটৰ কিনা"],
   ["installing more fonts", "বেছি ফণ্ট ইনষ্টল কৰা"]], 0,
  "Typing and email feel slow because of random reads at startup and file open, and a solid state drive cuts those latencies sharply. More hard disk space adds capacity the user does not need, and a monitor or fonts do not change speed.",
  "আৰম্ভণি আৰু ফাইল খোলাৰ সময়ত যাদৃচ্ছিক পঢ়াৰ বাবে টাইপিং আৰু ইমেইল লেহেমীয়া লাগে, আৰু ছলিড ষ্টেট ড্ৰাইভে সেই বিলম্ব তীক্ষ্ণভাৱে কমায়। বেছি হাৰ্ড ডিস্ক স্থানে ব্যৱহাৰকাৰীৰ অপ্ৰয়োজনীয় ধাৰণক্ষমতা যোগ কৰে, আৰু মণিটৰ বা ফণ্টে গতি নসলায়।");

add("computer-218",
  "A company must prove that a document was not altered after it was signed. The technology used is",
  "কোম্পানীয়ে প্ৰমাণ কৰিব লাগে যে স্বাক্ষৰৰ পিছত নথিখন সলনি হোৱা নাই। ব্যৱহৃত প্ৰযুক্তি",
  [["a cryptographic hash combined with a digital signature", "এনক্ৰিপ্টগ্ৰাফিক হেছ আৰু ডিজিটেল স্বাক্ষৰৰ সংযোগ"],
   ["file compression", "ফাইল কম্প্ৰেশন"],
   ["disk defragmentation", "ডিস্ক ডিফ্ৰেগমেণ্টেশ্যন"],
   ["a larger hard disk", "ডাঙৰ হাৰ্ড ডিস্ক"]], 0,
  "A hash changes completely if even one byte of the document changes, and signing the hash ties it to the signer's key, so any later edit is detectable. Compression, defragmentation and disk size protect nothing about integrity or authorship.",
  "নথিৰ এটা বাইট সলনিও হ'লে হেছ সম্পূৰ্ণ সলনি হয়, আৰু হেছত স্বাক্ষৰ কৰিলে তাক স্বাক্ষৰকৰ্তাৰ চাবিৰ লগত বান্ধে, সেয়ে পিছৰ যিকোনো সম্পাদনা ধৰা পৰে। কম্প্ৰেশন, ডিফ্ৰেগমেণ্টেশ্যন আৰু ডিস্কৰ আকাৰে অখণ্ডতা বা লেখকত্ব সুৰক্ষা নকৰে।");

add("computer-219",
  "A user is warned that a program will not run because the machine lacks the required runtime. The runtime referred to is",
  "ব্যৱহাৰকাৰীক সতৰ্ক কৰা হ'ল যে যন্ত্ৰত প্ৰয়োজনীয় ৰানটাইম নথকা বাবে প্ৰ'গ্ৰাম নচলে। বুজোৱা ৰানটাইম",
  [["the libraries and services the program needs while it executes", "প্ৰ'গ্ৰাম চলি থকাৰ সময়ত প্ৰয়োজনীয় লাইব্ৰেৰী আৰু সেৱা"],
   ["the compiler that built the program", "প্ৰ'গ্ৰাম বনোৱা কম্পাইলাৰ"],
   ["the text editor used to write the code", "সংকেত লিখিবলৈ ব্যৱহৃত পাঠ সম্পাদক"],
   ["the printer driver", "প্ৰিন্টাৰ ড্ৰাইভাৰ"]], 0,
  "A runtime supplies the shared libraries and support services a program calls while it runs, so its absence stops execution. The compiler and editor are development tools used earlier, and the printer driver is unrelated.",
  "ৰানটাইমে প্ৰ'গ্ৰামে চলি থকাৰ সময়ত মতা ভগা লাইব্ৰেৰী আৰু সহায়ক সেৱা যোগায়, সেয়ে তাৰ অনুপস্থিতিত চলন বন্ধ হয়। কম্পাইলাৰ আৰু সম্পাদক আগতে ব্যৱহৃত উন্নয়ন সঁজুলি, আৰু প্ৰিন্টাৰ ড্ৰাইভাৰৰ সম্পৰ্ক নাই।");

add("computer-220",
  "A machine that is switched off but still plugged in continues to charge a phone through its USB port. This shows that the port",
  "বন্ধ কিন্তু প্লাগ কৰি থোৱা যন্ত্ৰই USB প'ৰ্টেৰে ফোন চাৰ্জ কৰি থাকে। ই দেখুৱায় যে প'ৰ্টটোৱে",
  [["receives standby power from the supply", "যোগানৰপৰা ষ্টেণ্ডবাই পাৱাৰ পায়"],
   ["is powered by the phone itself", "ফোনৰপৰাই পাৱাৰ পায়"],
   ["works only when the screen is on", "স্ক্ৰীণ জ্বলি থাকিলেহে কাম কৰে"],
   ["stores charge internally for later", "পিছৰ বাবে ভিতৰত আধান সাঁচি ৰাখে"]], 0,
  "Many boards keep the USB rail energised in standby so devices can charge or wake the machine, which is why current flows with the system off. The phone cannot power its own charging circuit, the screen is dark, and a port does not store charge.",
  "বহু ব'ৰ্ডে USB ৰে'ল ষ্টেণ্ডবাইতো সক্ৰিয় ৰাখে যাতে যন্ত্ৰই চাৰ্জ কৰিব বা জগাব পাৰে, সেয়ে ব্যৱস্থা বন্ধ থাকোতে প্ৰবাহ যায়। ফোনে নিজৰ চাৰ্জিং বৰ্তনী চলাব নোৱাৰে, স্ক্ৰীণ এন্ধাৰ, আৰু প'ৰ্টে আধান সাঁচি নৰাখে।");

/* ================= networking-internet ================= */
useLeaf("networking-internet");

add("computer-221",
  "A user can open websites by typing their IP address but not by typing their domain name. The service that has failed is",
  "ব্যৱহাৰকাৰীয়ে IP ঠিকনা লিখি ৱেবছাইট খুলিব পাৰে কিন্তু ডমেইন নাম লিখি নোৱাৰে। বিফল হোৱা সেৱা",
  [["DNS resolution", "DNS ৰিজ'লিউশ্যন"],
   ["the web server", "ৱেব চাৰ্ভাৰ"],
   ["the router's power supply", "ৰাউটাৰৰ পাৱাৰ ছাপ্লাই"],
   ["the browser cache", "ব্ৰাউজাৰ কেশ"]], 0,
  "Names must be translated into addresses before a connection is made, so working IP access with failing names points at name resolution. The web server and router are clearly reachable, and a browser cache problem would not be bypassed by using an address.",
  "সংযোগ কৰাৰ আগতে নাম ঠিকনালৈ সলনি কৰিব লাগে, সেয়ে IP ৰে কাম কৰি নামে বিফল হোৱাই নাম ৰিজ'লিউশ্যনলৈ আঙুলিয়ায়। ৱেব চাৰ্ভাৰ আৰু ৰাউটাৰ স্পষ্টভাৱে পোৱা গৈছে, আৰু ব্ৰাউজাৰ কেশৰ সমস্যা ঠিকনা ব্যৱহাৰেৰে এৰাব নোযোৱাহেঁতেন।");

add("computer-222",
  "A network has 30 devices and each needs a unique address on the same subnet. The subnet mask that provides enough usable addresses with least waste is",
  "এটা নেটৱৰ্কত ৩০ যন্ত্ৰ আৰু প্ৰত্যেকৰ একেই ছাবনেটত অদ্বিতীয় ঠিকনা লাগে। আটাই কম অপচয়ৰে পৰ্যাপ্ত ব্যৱহাৰযোগ্য ঠিকনা দিয়া ছাবনেট মাস্ক",
  [["255.255.255.224", "২৫৫.২৫৫.২৫৫.২২৪"],
   ["255.255.255.240", "২৫৫.২৫৫.২৫৫.২৪০"],
   ["255.255.255.0", "২৫৫.২৫৫.২৫৫.০"],
   ["255.255.255.192", "২৫৫.২৫৫.২৫৫.১৯২"]], 0,
  "A /27 mask leaves 32 addresses, of which 30 are usable after the network and broadcast addresses, which fits thirty devices exactly. A /28 gives only 14 usable, while /24 and /26 waste 222 and 30 addresses respectively.",
  "/২৭ মাস্কে ৩২ ঠিকনা এৰি দিয়ে, যাৰ পৰা নেটৱৰ্ক আৰু ব্ৰডকাষ্ট ঠিকনা বাদ দি ৩০ ব্যৱহাৰযোগ্য, যি ত্ৰিশ যন্ত্ৰৰ বাবে ঠিক মিলে। /২৮ ত কেৱল ১৪ ব্যৱহাৰযোগ্য, আৰু /২৪ আৰু /২৬ এ ক্ৰমে ২২২ আৰু ৩০ ঠিকনা অপচয় কৰে।");

add("computer-223",
  "An office wants wireless coverage across two floors but a single access point leaves dead zones. The correct solution is to",
  "অফিচে দুই মহলাত বেতাঁৰ সুবিধা বিচাৰে কিন্তু এটা এম্বিয়েণ্ট পইণ্টে মৃত অঞ্চল এৰি যায়। শুদ্ধ সমাধান",
  [["add access points on non overlapping channels with a wired backhaul", "অতিৰিক্ত এম্বিয়েণ্ট পইণ্ট অতিৰিক্ত নোহোৱা চেনেলত তাৰযুক্ত সংযোগসহ যোগ কৰা"],
   ["raise the transmit power to maximum on the single unit", "একেই ইউনিটৰ সম্প্ৰেষণ শক্তি সৰ্বোচ্চলৈ বঢ়োৱা"],
   ["change the SSID to a longer name", "SSID ক দীঘল নামলৈ সলনি কৰা"],
   ["switch from WPA2 to WEP", "WPA2 ৰপৰা WEP লৈ সলনি কৰা"]], 0,
  "Clients must be able to hear the access point as well as be heard, so coverage comes from more units on separate channels with a wired uplink. Raising power helps the downlink only and adds interference, and a longer name or weaker encryption changes nothing about coverage.",
  "ক্লাইণ্টে এম্বিয়েণ্ট পইণ্ট শুনিব পৰাৰ লগতে নিজেও শুনা লাগে, সেয়ে বেলেগ চেনেলত তাৰযুক্ত আপলিংকসহ বেছি ইউনিটে সুবিধা দিয়ে। শক্তি বঢ়ালে কেৱল ডাউনলিংকত সহায় হয় আৰু হস্তক্ষেপ বাঢ়ে, আৰু দীঘল নাম বা দুৰ্বল এনক্ৰিপশ্বনে সুবিধাত একো নসলায়।");

add("computer-224",
  "A company wants its branch office to appear on the same private network as headquarters over the internet. The technology used is",
  "কোম্পানীয়ে ইণ্টাৰনেটৰ জৰিয়তে শাখা কাৰ্যালয়ক মুখ্য কাৰ্যালয়ৰ একেই ব্যক্তিগত নেটৱৰ্কত দেখুৱাব বিচাৰে। ব্যৱহৃত প্ৰযুক্তি",
  [["a virtual private network tunnel", "ভাৰ্চুৱেল ব্যক্তিগত নেটৱৰ্ক সুৰংগ"],
   ["a proxy server for web pages", "ৱেব পৃষ্ঠাৰ বাবে প্ৰক্সি চাৰ্ভাৰ"],
   ["a content delivery network", "বিষয়বস্তু বিতৰণ নেটৱৰ্ক"],
   ["a larger subnet mask", "ডাঙৰ ছাবনেট মাস্ক"]], 0,
  "A VPN encrypts traffic between two sites and gives branch hosts private addresses reachable from headquarters, which is exactly the requirement. A proxy caches web pages, a content network speeds delivery to the public and a mask alone cannot cross the internet.",
  "ভিপিএনে দুই স্থানৰ মাজৰ ট্ৰেফিক এনক্ৰিপ্ট কৰি শাখাৰ হ'ষ্টক মুখ্য কাৰ্যালয়ৰপৰা পোৱা ব্যক্তিগত ঠিকনা দিয়ে, যি ঠিক প্ৰয়োজন। প্ৰক্সিয়ে ৱেব পৃষ্ঠা কেশ কৰে, বিষয়বস্তু নেটৱৰ্কে ৰাজহুৱালৈ যোগান দ্ৰুত কৰে আৰু কেৱল মাস্কেৰে ইণ্টাৰনেট পাৰ হ'ব নোৱাৰি।");

add("computer-225",
  "A user sends an email but the recipient never receives it and no error is returned. The record most likely misconfigured on the sending domain is the",
  "ব্যৱহাৰকাৰীয়ে ইমেইল পঠিয়ায় কিন্তু প্ৰাপকে নাপায় আৰু কোনো ত্ৰুটি ঘূৰি নাহে। পঠোৱা ডমেইনত আটাই সম্ভাব্য ভুল সংৰচিত ৰেকৰ্ড",
  [["SPF or DKIM authentication record", "SPF বা DKIM প্ৰমাণীকৰণ ৰেকৰ্ড"],
   ["the A record of the website", "ৱেবছাইটৰ A ৰেকৰ্ড"],
   ["the MX record of the recipient", "প্ৰাপকৰ MX ৰেকৰ্ড"],
   ["the CNAME of the mail server", "মেইল চাৰ্ভাৰৰ CNAME"]], 0,
  "Mail servers reject or silently discard mail from a domain whose SPF or DKIM does not authenticate, which is why nothing comes back to the sender. The website A record is unrelated, the recipient's MX record is theirs, and a CNAME is an alias.",
  "যি ডমেইনৰ SPF বা DKIM প্ৰমাণিত নহয় তাৰপৰা অহা মেইল চাৰ্ভাৰে নাকচ বা মনে মনে পেলাই দিয়ে, সেয়ে পঠিওঁতালৈ একো ঘূৰি নাহে। ৱেবছাইটৰ A ৰেকৰ্ডৰ সম্পৰ্ক নাই, প্ৰাপকৰ MX ৰেকৰ্ড তেওঁলোকৰ, আৰু CNAME এটা উপনাম।");

add("computer-226",
  "A web page loads slowly although the server responds quickly when tested from another city. The most likely cause is",
  "আন চহৰৰপৰা পৰীক্ষা কৰিলে চাৰ্ভাৰে দ্ৰুত সঁহাৰি দিয়ে যদিও ৱেব পৃষ্ঠা লেহেমীয়াকৈ লোড হয়। আটাই সম্ভাব্য কাৰণ",
  [["high latency or packet loss on the local path", "স্থানীয় পথত উচ্চ বিলম্ব বা পেকেট ক্ষতি"],
   ["the server's disk is full", "চাৰ্ভাৰৰ ডিস্ক ভৰা"],
   ["the page has too few images", "পৃষ্ঠাত অতি কম ছবি"],
   ["the HTML is valid", "HTML বৈধ"]], 0,
  "A server that answers fast elsewhere but slowly from one site points to the network between them, where latency and loss force retransmissions. A full server disk would slow every location, and few images or valid HTML would speed a page up.",
  "আন ঠাইত দ্ৰুত সঁহাৰি দিয়া কিন্তু এটা স্থানৰপৰা লেহেমীয়া চাৰ্ভাৰে মাজৰ নেটৱৰ্কলৈ আঙুলিয়ায়, য'ত বিলম্ব আৰু ক্ষতিয়ে পুনৰ প্ৰেৰণ বাধ্যতামূলক কৰে। ভৰা ডিস্কই সকলো স্থান লেহেমীয়া কৰিলেহেঁতেন, আৰু কম ছবি বা বৈধ HTML এ পৃষ্ঠা দ্ৰুত কৰে।");

add("computer-227",
  "A technician needs to test whether a remote host is reachable without opening a session on it. The correct tool is",
  "কৰ্মীয়ে দূৰৰ হ'ষ্টত অধিবেশন নুখুলাকৈ ইয়াক পোৱা যায় নে নাই পৰীক্ষা কৰিব লাগে। শুদ্ধ সঁজুলি",
  [["ping", "পিং"],
   ["telnet", "টেলনেট"],
   ["ftp", "এফটিপি"],
   ["ssh", "এছএছএইচ"]], 0,
  "Ping sends an echo request and reports whether a reply comes back, which tests reachability without a login. Telnet, FTP and SSH all open sessions and usually need credentials.",
  "পিঙে ইক' অনুৰোধ পঠিয়াই উত্তৰ ঘূৰি আহে নে নাই জনায়, যিয়ে লগইন নোহোৱাকৈ উপনীত হোৱা পৰীক্ষা কৰে। টেলনেট, এফটিপি আৰু এছএছএইচে অধিবেশন খোলে আৰু সাধাৰণতে প্ৰমাণপত্ৰ লাগে।");

add("computer-228",
  "An organisation must publish a website that stays available when one data centre fails. The design principle is",
  "সংস্থাই এনে ৱেবছাইট প্ৰকাশ কৰিব লাগে যি এটা তথ্য কেন্দ্ৰ বিফল হ'লেও উপলব্ধ থাকে। আৰ্হিৰ নীতি",
  [["redundancy across multiple locations", "বহু স্থানত ৰিডাণ্ডেন্সি"],
   ["a single very powerful server", "এটাই অতি শক্তিশালী চাৰ্ভাৰ"],
   ["a longer domain name", "দীঘল ডমেইন নাম"],
   ["a larger monitor", "ডাঙৰ মণিটৰ"]], 0,
  "Availability through a failure requires more than one independent copy, so traffic can move to a surviving site. One powerful server is still a single point of failure, and a domain name or monitor has no bearing on uptime.",
  "বিফলতাৰ মাজতো উপলব্ধতাৰ বাবে এটাৰ অধিক স্বতন্ত্ৰ নকল লাগে, যাতে ট্ৰেফিক জীয়াই থকা স্থানলৈ যাব পাৰে। এটাই শক্তিশালী চাৰ্ভাৰো একেই বিফলতাৰ বিন্দু, আৰু ডমেইন নাম বা মণিটৰৰ চলি থকাৰ সৈতে সম্পৰ্ক নাই।");

add("computer-229",
  "A user wants to know why an HTTPS padlock does not guarantee a trustworthy shop. The correct explanation is that HTTPS proves",
  "ব্যৱহাৰকাৰীয়ে সোধে HTTPS তলা এটা বিশ্বাসযোগ্য দোকানৰ নিশ্চয়তা কিয় নিদিয়ে। শুদ্ধ ব্যাখ্যা — HTTPS এ প্ৰমাণ কৰে",
  [["the connection is encrypted, not that the business is honest", "সংযোগ এনক্ৰিপ্ট, ব্যৱসায় বিশ্বাসযোগ্য নহয়"],
   ["the products are genuine", "সামগ্ৰী আসল"],
   ["the price is fair", "দাম ন্যায্য"],
   ["the company is government approved", "কোম্পানী চৰকাৰে অনুমোদিত"]], 0,
  "The padlock shows that traffic to that domain is encrypted and the certificate matches the name, which says nothing about the seller's conduct. Product quality, price fairness and government approval are outside what a certificate asserts.",
  "তলাটোৱে দেখুৱায় যে সেই ডমেইনলৈ ট্ৰেফিক এনক্ৰিপ্ট আৰু প্ৰমাণপত্ৰে নামৰ লগত মিলে, যি বিক্ৰেতাৰ আচৰণৰ বিষয়ে একো নকয়। সামগ্ৰীৰ মান, দামৰ ন্যায্যতা আৰু চৰকাৰী অনুমোদন প্ৰমাণপত্ৰই দাবী কৰা বস্তুৰ বাহিৰত।");

add("computer-230",
  "Two offices are 500 metres apart and need a reliable high speed link without digging trenches. The most suitable technology is",
  "দুটা কাৰ্যালয় ৫০০ মিটাৰ আঁতৰত আৰু পথ খান্দিব নোহোৱাকৈ নিৰ্ভৰযোগ্য উচ্চ গতিৰ সংযোগ লাগে। আটাই উপযুক্ত প্ৰযুক্তি",
  [["a point to point wireless bridge", "বিন্দু-পৰা-বিন্দু বেতাঁৰ সেতু"],
   ["a dial up connection", "ডায়েল আপ সংযোগ"],
   ["a Bluetooth pairing between two PCs", "দুখন পিচিৰ মাজত ব্লুটুথ যোৰ"],
   ["an infrared link", "অতিৰক্ত সংযোগ"]], 0,
  "A directional wireless bridge carries high throughput over hundreds of metres with line of sight and needs no cabling. Dial up is far too slow, Bluetooth reaches a few metres and infrared needs an unobstructed straight line and short range.",
  "দিশযুক্ত বেতাঁৰ সেতুৱে দৃষ্টিৰেখাসহ কেইশ মিটাৰত উচ্চ প্ৰবাহ বহন কৰে আৰু কেবল নালাগে। ডায়েল আপ অতি লেহেমীয়া, ব্লুটুথ কেইমিটাৰমানলৈ যায় আৰু অতিৰক্তই বাধাহীন সৰলৰেখা তথা চুটি দূৰত্ব লাগে।");

add("computer-231",
  "A company's website is popular abroad and loads slowly for those users. The service that would help most is a",
  "কোম্পানীৰ ৱেবছাইট বিদেশত জনপ্ৰিয় আৰু সেই ব্যৱহাৰকাৰীসকলৰ বাবে লেহেমীয়াকৈ লোড হয়। আটাই সহায়ক সেৱা",
  [["content delivery network with edge servers", "প্ৰান্ত চাৰ্ভাৰযুক্ত বিষয়বস্তু বিতৰণ নেটৱৰ্ক"],
   ["larger hard disk on the origin server", "মূল চাৰ্ভাৰত ডাঙৰ হাৰ্ড ডিস্ক"],
   ["higher resolution images", "বেছি ৰিজ'লিউশ্যনৰ ছবি"],
   ["a longer TTL on DNS records", "DNS ৰেকৰ্ডত দীঘল TTL"]], 0,
  "Edge servers cache the content close to distant users, which removes most of the round trip time that makes the site slow abroad. A larger origin disk does not shorten the path, and heavier images make it worse.",
  "প্ৰান্ত চাৰ্ভাৰে দূৰৰ ব্যৱহাৰকাৰীৰ ওচৰত বিষয়বস্তু কেশ কৰে, যিয়ে বিদেশত লেহেমীয়া কৰা বেছিভাগ ৰাউণ্ড ট্ৰিপ সময় আঁতৰায়। মূল ডিস্ক ডাঙৰ কৰিলে পথ চুটি নহয়, আৰু গধুৰ ছবিয়ে বেয়া কৰে।");

add("computer-232",
  "A user complains that a laptop connects to Wi-Fi but has no internet access while other devices work. The setting most likely wrong is the",
  "ব্যৱহাৰকাৰীয়ে অভিযোগ কৰে যে লেপটপ ৱাই-ফাইত সংযুক্ত হয় কিন্তু ইণ্টাৰনেট নাই, আন যন্ত্ৰই কাম কৰে। আটাই সম্ভাব্য ভুল ছেটিং",
  [["default gateway or DNS on that laptop", "সেই লেপটপৰ ডিফল্ট গেটৱে বা DNS"],
   ["the router's antenna position", "ৰাউটাৰৰ এণ্টেনাৰ অৱস্থান"],
   ["the SSID broadcast setting", "SSID প্ৰচাৰ ছেটিং"],
   ["the printer's IP address", "প্ৰিণ্টাৰৰ IP ঠিকনা"]], 0,
  "A device can associate with the access point yet fail to route traffic if its gateway or name server is wrong, and other devices working proves the network itself is fine. Antenna position and SSID broadcast would affect association for everyone.",
  "গেটৱে বা নাম চাৰ্ভাৰ ভুল হ'লে যন্ত্ৰই এম্বিয়েণ্ট পইণ্টত সংযুক্ত হ'লেও ট্ৰেফিক পথ চলাব নোৱাৰে, আৰু আন যন্ত্ৰই কাম কৰিলে নেটৱৰ্ক নিজেই ঠিক বুলি প্ৰমাণিত হয়। এণ্টেনাৰ অৱস্থান আৰু SSID প্ৰচাৰে সকলোৰে সংযোগত প্ৰভাৱ পেলায়।");

add("computer-233",
  "An administrator must allow only web traffic into a server and block everything else. The device that does this is a",
  "প্ৰশাসকে চাৰ্ভাৰলৈ কেৱল ৱেব ট্ৰেফিক অনুমোদন কৰি বাকী সকলো বন্ধ কৰিব লাগে। এই কাম কৰা যন্ত্ৰ",
  [["firewall with port rules", "প'ৰ্ট নিয়মযুক্ত ফায়াৰৱাল"],
   ["hub", "হাব"],
   ["repeater", "ৰিপিটাৰ"],
   ["patch panel", "পেটচ পেনেল"]], 0,
  "A firewall filters by port and protocol, so allowing 443 and 80 while denying the rest meets the requirement. A hub repeats frames, a repeater extends a signal and a patch panel only terminates cabling.",
  "ফায়াৰৱালে প'ৰ্ট আৰু প্ৰ'ট'কল অনুসৰি ছাঁকি দিয়ে, সেয়ে ৪৪৩ আৰু ৮০ অনুমোদন কৰি বাকী নাকচ কৰিলে প্ৰয়োজন পূৰ হয়। হাবে ফ্ৰেম পুনৰাবৃত্তি কৰে, ৰিপিটাৰে সংকেত বঢ়ায় আৰু পেটচ পেনেলে কেৱল কেবল লগায়।");

add("computer-234",
  "A file transfer over the internet completes but the file is corrupted. The protocol that provides error detection and retransmission is",
  "ইণ্টাৰনেটত ফাইল স্থানান্তৰ সম্পূৰ্ণ হয় কিন্তু ফাইল নষ্ট হয়। ত্ৰুটি ধৰা আৰু পুনৰ প্ৰেৰণ দিয়া প্ৰ'ট'কল",
  [["TCP", "TCP"],
   ["UDP", "UDP"],
   ["ICMP", "ICMP"],
   ["ARP", "ARP"]], 0,
  "TCP numbers segments, acknowledges them and resends anything missing or damaged, which is what makes a transfer reliable. UDP sends without acknowledgement, ICMP carries diagnostic messages and ARP resolves hardware addresses.",
  "TCP এ খণ্ডৰ সংখ্যা দি স্বীকৃতি লয় আৰু হেৰোৱা বা নষ্ট পুনৰ পঠিয়ায়, যিয়ে স্থানান্তৰ নিৰ্ভৰযোগ্য কৰে। UDP এ স্বীকৃতি নোলোৱাকৈ পঠিয়ায়, ICMP এ নিদানিক বাৰ্তা বহন কৰে আৰু ARP এ হাৰ্ডৱেৰ ঠিকনা ৰিজ'ল্ভ কৰে।");

add("computer-235",
  "A school must give 200 students filtered internet access with a log of visited sites. The correct component is a",
  "বিদ্যালয়ে ২০০ শিক্ষাৰ্থীক পৰিদৰ্শিত চাইটৰ অভিলেখসহ ছাঁকি দিয়া ইণ্টাৰনেট সুবিধা দিব লাগে। শুদ্ধ অংশ",
  [["proxy server with logging", "অভিলেখযুক্ত প্ৰক্সি চাৰ্ভাৰ"],
   ["network switch", "নেটৱৰ্ক ছুইচ"],
   ["wireless access point", "বেতাঁৰ এম্বিয়েণ্ট পইণ্ট"],
   ["uninterruptible power supply", "অবিৰত পাৱাৰ যোগান"]], 0,
  "A proxy sits between clients and the internet, so it can filter requests and record them, which meets both requirements at once. A switch forwards frames, an access point provides radio coverage and a power supply only keeps the equipment running.",
  "প্ৰক্সি ক্লাইণ্ট আৰু ইণ্টাৰনেটৰ মাজত থাকে, সেয়ে অনুৰোধ ছাঁকি অভিলেখ ৰাখিব পাৰে, যিয়ে দুয়োটা চৰ্ত একেলগে পূৰায়। ছুইচে ফ্ৰেম আগবঢ়ায়, এম্বিয়েণ্ট পইণ্টে ৰেডিঅ' সুবিধা দিয়ে আৰু পাৱাৰ যোগানে কেৱল সঁজুলি চলাই ৰাখে।");

add("computer-236",
  "A user asks why a video call keeps freezing on a slow link while a file download still works. The reason is that a video call needs",
  "ব্যৱহাৰকাৰীয়ে সোধে লেহেমীয়া সংযোগত ভিডিঅ' কল বাৰে বাৰে জমি যায় কিন্তু ফাইল ডাউনলোড কাম কৰে। কাৰণ ভিডিঅ' কলৰ প্ৰয়োজন",
  [["steady low latency rather than total bandwidth", "মুঠ বেণ্ডউইথতকৈ স্থিৰ কম বিলম্ব"],
   ["a larger hard disk", "ডাঙৰ হাৰ্ড ডিস্ক"],
   ["a higher screen resolution", "বেছি স্ক্ৰীণ ৰিজ'লিউশ্যন"],
   ["a wired keyboard", "তাৰযুক্ত কীব'ৰ্ড"]], 0,
  "A download tolerates delay because it just waits, but a call must deliver each moment on time, so latency and jitter break it while bandwidth alone would not. Disk size, screen resolution and the keyboard have no effect on call quality.",
  "ডাউনলোডে বিলম্ব সহ্য কৰে কাৰণ ই কেৱল অপেক্ষা কৰে, কিন্তু কলেই প্ৰতিটো মুহূৰ্ত সময়মতে দিব লাগে, সেয়ে বিলম্ব আৰু জিটাৰে তাক ভাঙে যদিও কেৱল বেণ্ডউইথে নাভাঙিলেহেঁতেন। ডিস্কৰ আকাৰ, ৰিজ'লিউশ্যন আৰু কীব'ৰ্ডৰ কলৰ মানত প্ৰভাৱ নাই।");

add("computer-237",
  "A company must let remote staff reach internal files without exposing the file server to the internet. The correct approach is",
  "কোম্পানীয়ে দূৰৰ কৰ্মচাৰীক ফাইল চাৰ্ভাৰ ইণ্টাৰনেটত নোকোৱাকৈ আভ্যন্তৰীণ ফাইললৈ প্ৰৱেশ দিব লাগে। শুদ্ধ উপায়",
  [["a VPN gateway with authentication", "প্ৰমাণীকৰণসহ ভিপিএন গেটৱে"],
   ["putting the file server in the public DMZ", "ফাইল চাৰ্ভাৰ ৰাজহুৱা DMZ ত ৰখা"],
   ["opening all firewall ports", "সকলো ফায়াৰৱাল প'ৰ্ট খোলা"],
   ["disabling passwords", "পাছৱৰ্ড বন্ধ কৰা"]], 0,
  "A VPN authenticates the user and then places them inside the private network, so the server stays unreachable from the open internet. A public DMZ, open ports or no passwords do the opposite of the requirement.",
  "ভিপিএনে ব্যৱহাৰকাৰীক প্ৰমাণিত কৰি ব্যক্তিগত নেটৱৰ্কৰ ভিতৰত ৰাখে, সেয়ে চাৰ্ভাৰ মুকলি ইণ্টাৰনেটৰপৰা অপ্ৰাপ্য থাকে। ৰাজহুৱা DMZ, খোলা প'ৰ্ট বা পাছৱৰ্ড নোহোৱাই প্ৰয়োজনৰ বিপৰীত কৰে।");

add("computer-238",
  "A website is moved to a new server but users still reach the old one. The record that must be updated is the domain's",
  "ৱেবছাইট নতুন চাৰ্ভাৰলৈ নিয়া হ'ল কিন্তু ব্যৱহাৰকাৰীয়ে এতিয়াও পুৰণিটোত উপনীত হয়। নবীকৰণ কৰিবলগীয়া ৰেকৰ্ড — ডমেইনৰ",
  [["A record pointing to the server address", "চাৰ্ভাৰ ঠিকনালৈ আঙুলিয়াই দিয়া A ৰেকৰ্ড"],
   ["MX record", "MX ৰেকৰ্ড"],
   ["SPF record", "SPF ৰেকৰ্ড"],
   ["TXT verification record", "TXT প্ৰমাণীকৰণ ৰেকৰ্ড"]], 0,
  "The A record maps the name to the server's address, so it must change when the address changes, allowing for cached copies to expire. MX records route mail, SPF authorises senders and TXT holds miscellaneous text.",
  "A ৰেকৰ্ডে নামটো চাৰ্ভাৰৰ ঠিকনালৈ মেপ কৰে, সেয়ে ঠিকনা সলনি হ'লে তাক সলনি কৰিব লাগে, কেশ কৰা নকলৰ ম্যাদ শেষ হোৱালৈ বাট চাই। MX ৰেকৰ্ডে মেইল চলায়, SPF এ পঠিওঁতাক অনুমোদন দিয়ে আৰু TXT ত বিবিধ পাঠ থাকে।");

add("computer-239",
  "A user cannot print from a laptop on the office Wi-Fi although the same laptop prints at home. The most likely cause is",
  "ব্যৱহাৰকাৰীয়ে অফিচৰ ৱাই-ফাইত লেপটপৰপৰা ছপা কৰিব নোৱাৰে যদিও ঘৰত সেই লেপটপে ছপা কৰে। আটাই সম্ভাব্য কাৰণ",
  [["the office network blocks printer discovery or the print port", "অফিচ নেটৱৰ্কে প্ৰিন্টাৰ আৱিষ্কাৰ বা প্ৰিন্ট প'ৰ্ট অৱৰোধ কৰে"],
   ["the laptop battery is low", "লেপটপৰ বেটাৰী কম"],
   ["the screen brightness is low", "স্ক্ৰীণৰ উজ্জ্বলতা কম"],
   ["the keyboard layout is wrong", "কীব'ৰ্ডৰ বিন্যাস ভুল"]], 0,
  "Working at home but not in the office isolates the difference to the network, which is blocking the discovery protocol or the print port. Battery, brightness and keyboard layout would fail in both places.",
  "ঘৰত কাম কৰি অফিচত নকৰাটোৱে পাৰ্থক্য নেটৱৰ্কলৈ সীমাবদ্ধ কৰে, যিয়ে আৱিষ্কাৰ প্ৰ'ট'কল বা প্ৰিন্ট প'ৰ্ট অৱৰোধ কৰিছে। বেটাৰী, উজ্জ্বলতা আৰু কীব'ৰ্ডৰ বিন্যাসে দুয়ো ঠাইতে বিফল হ'লহেঁতেন।");

add("computer-240",
  "An administrator must reduce the chance of a single switch failure taking down a floor. The design change is to",
  "প্ৰশাসকে এটা ছুইচ বিফল হ'লে গোটেই মহলা বন্ধ হোৱাৰ সম্ভাৱনা কমাব লাগে। আৰ্হিৰ পৰিৱৰ্তন",
  [["provide a redundant switch with a loop free topology", "লুপমুক্ত ট'প'লজিসহ অতিৰিক্ত ছুইচ দিয়া"],
   ["connect every device to the same switch", "প্ৰতিটো যন্ত্ৰ একেই ছুইচত লগোৱা"],
   ["use longer cables", "দীঘল কেবল ব্যৱহাৰ কৰা"],
   ["remove the firewall", "ফায়াৰৱাল আঁতৰোৱা"]], 0,
  "A second switch with spanning tree or link aggregation keeps the floor connected when one unit fails, which is the requirement. Putting everything on one switch increases the risk, and cable length or firewall removal do not address it.",
  "দ্বিতীয় ছুইচে স্পেনিং ট্ৰি বা লিংক এগ্ৰিগেশ্যনৰ সৈতে এটা ইউনিট বিফল হ'লেও মহলা সংযুক্ত ৰাখে, যি প্ৰয়োজন। সকলো এটা ছুইচত ৰাখিলে বিপদ বাঢ়ে, আৰু কেবলৰ দীঘ বা ফায়াৰৱাল আঁতৰোৱাই তাক সমাধান নকৰে।");

/* ================= cyber-security ================= */
useLeaf("cyber-security");

add("computer-241",
  "An employee receives an email from the finance director asking for an urgent payment, but the reply address differs from the director's. The correct action is to",
  "কৰ্মচাৰীয়ে বিত্ত অধিকৰ্তাৰপৰা জৰুৰী পেমেণ্টৰ ইমেইল পায়, কিন্তু উত্তৰৰ ঠিকনা অধিকৰ্তাৰ পৰা বেলেগ। শুদ্ধ কাৰ্য",
  [["verify by calling the director on a known number before paying", "পেমেণ্টৰ আগতে জনা নম্বৰত অধিকৰ্তাক ফোন কৰি নিশ্চিত কৰা"],
   ["reply to the email asking for confirmation", "নিশ্চিতকৰণ বিচাৰি ইমেইলটোত উত্তৰ দিয়া"],
   ["pay quickly because the director is senior", "অধিকৰ্তা জ্যেষ্ঠ বাবে সোনকালে পেমেণ্ট কৰা"],
   ["forward it to all staff for their opinion", "মতামতৰ বাবে সকলো কৰ্মচাৰীলৈ পঠিওৱা"]], 0,
  "A mismatched reply address is the classic sign of business email compromise, and only an independent channel such as a known phone number confirms the request. Replying reaches the attacker, paying loses the money, and forwarding spreads the lure.",
  "মিল নোহোৱা উত্তৰৰ ঠিকনা ব্যৱসায়িক ইমেইল ভাঙি কৰাৰ প্ৰচলিত চিন, আৰু জনা ফোন নম্বৰৰ দৰে স্বতন্ত্ৰ পথেহে অনুৰোধ নিশ্চিত কৰে। উত্তৰ দিলে আক্ৰমণকাৰীলৈ যায়, পেমেণ্ট কৰিলে ধন যায়, আৰু সকলোলৈ পঠিয়ালে ফান্দ বিয়পে।");

add("computer-242",
  "A user's browser shows a warning that a site's certificate does not match its name. The correct action is to",
  "ব্যৱহাৰকাৰীৰ ব্ৰাউজাৰে সতৰ্ক কৰে যে চাইটৰ প্ৰমাণপত্ৰে নামৰ লগত মিল নাখায়। শুদ্ধ কাৰ্য",
  [["stop and do not enter credentials on that site", "বন্ধ কৰি সেই চাইটত প্ৰমাণপত্ৰ নিদিয়া"],
   ["click through because warnings are always false alarms", "সতৰ্কবাণী সদায় মিছা বাবে আগবাঢ়ি যোৱা"],
   ["disable the browser's security warnings", "ব্ৰাউজাৰৰ সুৰক্ষা সতৰ্কবাণী বন্ধ কৰা"],
   ["enter the password twice to confirm it", "নিশ্চিত কৰিবলৈ পাছৱৰ্ড দুবাৰ দিয়া"]], 0,
  "A name mismatch means the certificate was issued for a different host, which is how an interception or an impostor site appears. Clicking through, disabling warnings or retyping the password hands credentials to whoever holds the wrong certificate.",
  "নামৰ অমিল মানে প্ৰমাণপত্ৰ অন্য হ'ষ্টৰ বাবে জাৰি হৈছে, যি আটক বা নকল চাইট এনেদৰেই দেখা দিয়ে। আগবাঢ়ি যোৱা, সতৰ্কবাণী বন্ধ কৰা বা পাছৱৰ্ড পুনৰ লিখিলে ভুল প্ৰমাণপত্ৰ ধাৰীজনলৈ প্ৰমাণপত্ৰ যায়।");

add("computer-243",
  "A ransomware note demands payment in cryptocurrency within 48 hours. The organisation's best course is to",
  "ৰেনছমৱেৰৰ টোকাত ৪৮ ঘণ্টাৰ ভিতৰত ক্ৰিপ্ট'কাৰেন্সীত পেমেণ্ট দাবী কৰা হ'ল। সংস্থাৰ শ্ৰেষ্ঠ পথ",
  [["isolate affected systems, restore from offline backups and report", "আক্ৰান্ত ব্যৱস্থা পৃথক কৰি অফলাইন বেকআপৰপৰা ঘূৰাই আনি জনোৱা"],
   ["pay quickly to get the files back", "ফাইল ঘূৰাই পাবলৈ সোনকালে পেমেণ্ট কৰা"],
   ["restart every machine repeatedly", "প্ৰতিখন যন্ত্ৰ বাৰে বাৰে পুনৰ আৰম্ভ কৰা"],
   ["connect the backups to the network for speed", "গতিৰ বাবে বেকআপ নেটৱৰ্কত লগোৱা"]], 0,
  "Isolation stops the spread, offline backups restore service without funding the attacker, and reporting brings in response help. Paying funds crime with no guarantee, restarts do not decrypt, and connecting backups lets the malware encrypt them too.",
  "পৃথক কৰিলে বিয়পা বন্ধ হয়, অফলাইন বেকআপে আক্ৰমণকাৰীক ধন নিদিয়াকৈ সেৱা ঘূৰায়, আৰু জনালে সঁহাৰিৰ সহায় আহে। পেমেণ্টে অপৰাধ পুঁজি যোগায় কিন্তু নিশ্চয়তা নাই, পুনৰ আৰম্ভণিয়ে ডিক্ৰিপ্ট নকৰে, আৰু বেকআপ লগালে মেলৱেৰেও তাক এনক্ৰিপ্ট কৰে।");

add("computer-244",
  "A staff member finds a USB drive in the office car park and plugs it into a work computer. The risk created is",
  "কৰ্মচাৰীয়ে কাৰ্যালয়ৰ পাৰ্কিঙত USB ড্ৰাইভ পাই কামৰ কম্পিউটাৰত লগায়। সৃষ্টি হোৱা বিপদ",
  [["malware execution through autorun or a disguised payload", "অট'ৰান বা ছদ্মৱেশী পেল'ডৰ জৰিয়তে মেলৱেৰ চলন"],
   ["physical damage to the USB port", "USB প'ৰ্টৰ ভৌতিক ক্ষতি"],
   ["loss of the monitor signal", "মণিটৰৰ সংকেত হেৰোৱা"],
   ["slower internet speed", "ইণ্টাৰনেটৰ গতি কমা"]], 0,
  "A planted drive is a classic delivery method, and plugging it in can run malware that infects the machine and the network. Port damage, a lost display signal and slower internet are not the security concern here.",
  "পতা ড্ৰাইভ প্ৰেৰণৰ প্ৰচলিত উপায়, আৰু লগালে যন্ত্ৰ তথা নেটৱৰ্ক সংক্ৰমিত কৰা মেলৱেৰ চলিব পাৰে। প'ৰ্টৰ ক্ষতি, প্ৰদৰ্শন সংকেত হেৰুওৱা আৰু লেহেমীয়া ইণ্টাৰনেট ইয়াত সুৰক্ষাৰ চিন্তা নহয়।");

add("computer-245",
  "A user is asked over the phone by someone claiming to be from IT support to read out a one time password. The correct response is to",
  "কোনোবাই আইটি সহায়ৰ পৰা বুলি ফোনত এটা সময়ৰ পাছৱৰ্ড পঢ়ি শুনাবলৈ কয়। শুদ্ধ সঁহাৰি",
  [["refuse and report the call to the real IT team", "নাকচ কৰি প্ৰকৃত আইটি দলক কলটো জনোৱা"],
   ["read it out because IT staff are authorised", "আইটি কৰ্মচাৰী অনুমোদিত বাবে পঢ়ি শুনোৱা"],
   ["read only the first half of the password", "পাছৱৰ্ডৰ কেৱল প্ৰথম আধা পঢ়া"],
   ["send it by email instead of speaking it", "কোৱাৰ সলনি ইমেইলেৰে পঠিওৱা"]], 0,
  "A genuine support team never needs a one time password, so the request itself identifies a social engineering attempt that must be refused and reported. Reading it out, partially or by another channel, hands over the second factor.",
  "প্ৰকৃত সহায় দলে কেতিয়াও সময়ৰ পাছৱৰ্ড নালাগে, সেয়ে অনুৰোধটোৱেই ছ'ছিয়েল ইঞ্জিনিয়াৰিঙৰ প্ৰচেষ্টা বুলি চিনাক্ত কৰি নাকচ কৰি জনাব লাগে। সম্পূৰ্ণ বা আধা পঢ়ি শুনোৱা বা আন পথেৰে দিলে দ্বিতীয় উপাদান হাতলৈ যায়।");

add("computer-246",
  "An organisation wants to limit the damage a stolen laptop can cause. The most effective control is",
  "সংস্থাই চুৰি হোৱা লেপটপে কৰিব পৰা ক্ষতি সীমিত কৰিব বিচাৰে। আটাই ফলপ্ৰসূ নিয়ন্ত্ৰণ",
  [["full disk encryption with a strong login", "শক্তিশালী লগইনসহ সম্পূৰ্ণ ডিস্ক এনক্ৰিপশ্যন"],
   ["a sticker warning that the laptop is tracked", "লেপটপ ট্ৰেক কৰা হয় বুলি সতৰ্কবাণীৰ ষ্টিকাৰ"],
   ["a longer warranty", "দীৰ্ঘতৰ ৱাৰেণ্টি"],
   ["a brighter screen", "বেছি উজ্জ্বল স্ক্ৰীণ"]], 0,
  "Encryption makes the disk contents unreadable without the credential, so a thief gains hardware but not data. A warning sticker, warranty or screen brightness do nothing to protect the information once the machine is gone.",
  "এনক্ৰিপশ্যনে প্ৰমাণপত্ৰ নোহোৱাকৈ ডিস্কৰ বস্তু অবোধ্য কৰে, সেয়ে চোৰে হাৰ্ডৱেৰ পায় কিন্তু তথ্য নাপায়। সতৰ্কবাণীৰ ষ্টিকাৰ, ৱাৰেণ্টি বা স্ক্ৰীণৰ উজ্জ্বলতাই যন্ত্ৰ যোৱাৰ পিছত তথ্য সুৰক্ষা নকৰে।");

add("computer-247",
  "A website asks for a password and the browser offers to save it. The safest practice for a shared computer is to",
  "ৱেবছাইটে পাছৱৰ্ড বিচাৰে আৰু ব্ৰাউজাৰে সাঁচিবলৈ আগবঢ়ায়। ভগা কম্পিউটাৰৰ বাবে আটাই সুৰক্ষিত অভ্যাস",
  [["decline and use a private session, then sign out", "নাকচ কৰি ব্যক্তিগত অধিবেশন ব্যৱহাৰ কৰি তাৰ পিছত ছাইন আউট কৰা"],
   ["accept so the password is not forgotten", "পাহৰি নযোৱাৰ বাবে গ্ৰহণ কৰা"],
   ["accept and share the login with colleagues", "গ্ৰহণ কৰি সহকৰ্মীৰ সৈতে লগইন ভাগ কৰা"],
   ["write the password on the monitor", "পাছৱৰ্ড মণিটৰত লিখা"]], 0,
  "Declining the save plus a private session leaves no credential or history behind, which protects the next user and the account. Saving on a shared machine, sharing the login or writing it in view all expose the account.",
  "সাঁচিবলৈ নাকচ কৰি ব্যক্তিগত অধিবেশন ল'লে কোনো প্ৰমাণপত্ৰ বা ইতিহাস ৰৈ নাযায়, যিয়ে পৰৱৰ্তী ব্যৱহাৰকাৰী আৰু একাউণ্ট ৰক্ষা কৰে। ভগা যন্ত্ৰত সাঁচা, লগইন ভগা বা দৃশ্যমান ঠাইত লিখিলে একাউণ্ট উন্মোচিত হয়।");

add("computer-248",
  "A user notices a small unfamiliar device between the keyboard cable and the computer. The concern is that it may be a",
  "ব্যৱহাৰকাৰীয়ে কীব'ৰ্ডৰ কেবল আৰু কম্পিউটাৰৰ মাজত অচিনাকি সৰু যন্ত্ৰ দেখে। চিন্তা — ই হ'ব পাৰে",
  [["hardware keylogger that records keystrokes", "কীব'ৰ্ডৰ চাপ লিখি ৰখা হাৰ্ডৱেৰ কীলগাৰ"],
   ["a spare mouse receiver", "অতিৰিক্ত মাউচ গ্ৰাহক"],
   ["a monitor stand", "মণিটৰৰ ষ্টেণ্ড"],
   ["a power extension", "পাৱাৰ সম্প্ৰসাৰণ"]], 0,
  "An inline device on the keyboard lead can capture every keystroke including passwords, and it is small and easy to hide. A mouse receiver, stand or extension would not sit in line with the keyboard cable.",
  "কীব'ৰ্ডৰ তাঁৰত শাৰীত লগোৱা যন্ত্ৰই পাছৱৰ্ডসহ প্ৰতিটো চাপ ধৰি ৰাখিব পাৰে, আৰু ই সৰু তথা লুকুৱাই ৰখাত সহজ। মাউচ গ্ৰাহক, ষ্টেণ্ড বা সম্প্ৰসাৰণে কীব'ৰ্ডৰ কেবলৰ শাৰীত নাথাকে।");

add("computer-249",
  "An office wants to stop staff installing unapproved software. The control that achieves this is",
  "অফিচে কৰ্মচাৰীয়ে অননুমোদিত ছফ্টৱেৰ ইনষ্টল কৰা বন্ধ কৰিব বিচাৰে। তাক কৰা নিয়ন্ত্ৰণ",
  [["standard user accounts without install rights", "ইনষ্টলৰ অধিকাৰ নোহোৱা মানক ব্যৱহাৰকাৰী একাউণ্ট"],
   ["a larger hard disk", "ডাঙৰ হাৰ্ড ডিস্ক"],
   ["a faster processor", "দ্ৰুত প্ৰচেছৰ"],
   ["a second monitor", "দ্বিতীয় মণিটৰ"]], 0,
  "Installation requires administrator rights, so removing those rights from everyday accounts is what blocks unapproved software. Disk size, processor speed and extra displays do not gate installation.",
  "ইনষ্টল কৰিবলৈ প্ৰশাসক অধিকাৰ লাগে, সেয়ে দৈনন্দিন একাউণ্টৰপৰা সেই অধিকাৰ আঁতৰালেই অননুমোদিত ছফ্টৱেৰ বন্ধ হয়। ডিস্কৰ আকাৰ, প্ৰচেছৰৰ গতি আৰু অতিৰিক্ত প্ৰদৰ্শনে ইনষ্টল ৰোধ নকৰে।");

add("computer-250",
  "A user is told to enable two factor authentication. The second factor should be something",
  "ব্যৱহাৰকাৰীক দুই উপাদান প্ৰমাণীকৰণ চালু কৰিবলৈ কোৱা হ'ল। দ্বিতীয় উপাদান হ'ব লাগে এনে বস্তু যি",
  [["the user has or is, not something they know", "ব্যৱহাৰকাৰীৰ ওচৰত আছে বা তেওঁ নিজেই, তেওঁ জনা বস্তু নহয়"],
   ["else they can remember easily", "আন এটা সহজে মনত ৰখা বস্তু"],
   ["written on the same sticky note", "একেই ষ্টিকি নোটত লিখা"],
   ["shared with the whole team", "গোটেই দলৰ সৈতে ভগা"]], 0,
  "Two factor authentication works only when the factors come from different categories, so a password plus a device or a fingerprint is effective. A second memorised secret is the same category, and a note or a shared secret defeats the purpose.",
  "দুই উপাদান প্ৰমাণীকৰণে কেৱল তেতিয়া কাম কৰে যেতিয়া উপাদানবোৰ বেলেগ শ্ৰেণীৰ, সেয়ে পাছৱৰ্ড লগতে যন্ত্ৰ বা আঙুলিৰ ছাপ ফলপ্ৰসূ। দ্বিতীয় মনত ৰখা গোপন বস্তু একেই শ্ৰেণী, আৰু নোট বা ভগা গোপন বস্তুৱে উদ্দেশ্য নষ্ট কৰে।");

add("computer-251",
  "A company laptop is lost and the user's session token may be compromised. The first action is to",
  "কোম্পানীৰ লেপটপ হেৰাল আৰু ব্যৱহাৰকাৰীৰ অধিবেশন ট'কেন ক্ষতিগ্ৰস্ত হ'ব পাৰে। প্ৰথম কাৰ্য",
  [["revoke the sessions and reset the credentials", "অধিবেশন বাতিল কৰি প্ৰমাণপত্ৰ ৰিছেট কৰা"],
   ["wait a week to see if anything happens", "একো নঘটালৈ এসপ্তাহ অপেক্ষা কৰা"],
   ["post about it on social media", "ছ'ছিয়েল মিডিয়াত তাক লিখা"],
   ["buy a replacement laptop first", "প্ৰথমে নতুন লেপটপ কিনা"]], 0,
  "Revoking tokens and resetting credentials cuts off whoever holds the machine before they can use the session. Waiting gives an attacker time, and a social media post or a replacement machine does not restore security.",
  "ট'কেন বাতিল আৰু প্ৰমাণপত্ৰ ৰিছেট কৰিলে যন্ত্ৰ ধৰি ৰখাজনে অধিবেশন ব্যৱহাৰ কৰাৰ আগতেই তাক কটা যায়। অপেক্ষা কৰিলে আক্ৰমণকাৰীয়ে সময় পায়, আৰু ছ'ছিয়েল মিডিয়া বা নতুন যন্ত্ৰই সুৰক্ষা ঘূৰাই নানে।");

add("computer-252",
  "A phishing page looks identical to a bank login. The feature that most reliably distinguishes the real site is the",
  "ফিচিঙ পৃষ্ঠা বেংকৰ লগইনৰ দৰে একেই দেখা যায়। প্ৰকৃত চাইট আটাই নিৰ্ভৰযোগ্যভাৱে পাৰ্থক্য কৰা বৈশিষ্ট্য",
  [["exact domain name in the address bar", "ঠিকনা বাৰত থকা সঠিক ডমেইন নাম"],
   ["logo quality", "ল'গ'ৰ মান"],
   ["page background colour", "পৃষ্ঠাৰ পৃষ্ঠভূমিৰ ৰং"],
   ["number of images", "ছবিৰ সংখ্যা"]], 0,
  "The domain is what identifies the site, and an impostor must use a different one however carefully the page is copied. Logos, colours and images can be copied exactly, so they prove nothing.",
  "ডমেইনেই চাইট চিনাক্ত কৰে, আৰু পৃষ্ঠা যিমান নিখুঁতভাৱে নকল কৰা নহওক, নকলকাৰীয়ে বেলেগ এটা ব্যৱহাৰ কৰিবই লাগে। ল'গ', ৰং আৰু ছবি হুবহু নকল কৰিব পাৰি, সেয়ে একো প্ৰমাণ নকৰে।");

add("computer-253",
  "A staff member's account sends phishing emails to the whole contact list. The most likely explanation is that the",
  "কৰ্মচাৰী এজনৰ একাউণ্টে গোটেই সম্পৰ্ক তালিকালৈ ফিচিঙ ইমেইল পঠিয়ায়। আটাই সম্ভাব্য ব্যাখ্যা",
  [["account was compromised and is being used by an attacker", "একাউণ্ট ক্ষতিগ্ৰস্ত হৈ আক্ৰমণকাৰীয়ে ব্যৱহাৰ কৰিছে"],
   ["email server is too fast", "ইমেইল চাৰ্ভাৰ অতি দ্ৰুত"],
   ["contact list is too long", "সম্পৰ্ক তালিকা অতি দীৰ্ঘ"],
   ["keyboard needs cleaning", "কীব'ৰ্ড পৰিষ্কাৰৰ প্ৰয়োজন"]], 0,
  "Mail that appears to come from a real colleague is sent by whoever holds that account, so the account itself is the problem and must be secured. Server speed, list length and a dirty keyboard cannot send mail.",
  "প্ৰকৃত সহকৰ্মীৰপৰা অহা যেন দেখা মেইল সেই একাউণ্ট ধৰি ৰখাজনে পঠিয়ায়, সেয়ে একাউণ্ট নিজেই সমস্যা আৰু তাক সুৰক্ষিত কৰিব লাগে। চাৰ্ভাৰৰ গতি, তালিকাৰ দীঘ বা মলিয়ন কীব'ৰ্ডে মেইল পঠিয়াব নোৱাৰে।");

add("computer-254",
  "An organisation must keep working while a supplier's cloud service is unavailable. The preparation that helps most is",
  "যোগানকৰ্তাৰ ক্লাউড সেৱা অনুপলব্ধ হ'লেও সংস্থাই কাম কৰি থাকিব লাগে। আটাই সহায়ক প্ৰস্তুতি",
  [["an offline copy of critical data and a manual procedure", "গুৰুত্বপূৰ্ণ তথ্যৰ অফলাইন নকল আৰু হাতেৰে কৰাৰ পদ্ধতি"],
   ["a faster internet connection", "দ্ৰুততৰ ইণ্টাৰনেট সংযোগ"],
   ["a bigger monitor", "ডাঙৰ মণিটৰ"],
   ["more user licences", "বেছি ব্যৱহাৰকাৰী অনুজ্ঞা"]], 0,
  "When the service is down the network is irrelevant, so local copies plus a documented manual process keep the work going. A faster link, a monitor or extra licences all depend on the service being up.",
  "সেৱা বন্ধ থাকিলে নেটৱৰ্ক অপ্ৰাসংগিক, সেয়ে স্থানীয় নকল লগতে লিখিত হাতেৰে কৰাৰ পদ্ধতিয়ে কাম চলাই ৰাখে। দ্ৰুত সংযোগ, মণিটৰ বা অতিৰিক্ত অনুজ্ঞা সকলোৱে সেৱা চলি থকাৰ ওপৰত নিৰ্ভৰ কৰে।");

add("computer-255",
  "A user is asked to install a browser extension that promises free movies but requests access to all browsing data. The risk is that the extension can",
  "ব্যৱহাৰকাৰীক বিনামূলীয়া চিনেমাৰ প্ৰতিশ্ৰুতি দি সকলো ব্ৰাউজিং তথ্যলৈ প্ৰৱেশ বিচৰা এক্সটেনশ্যন ইনষ্টল কৰিবলৈ কোৱা হ'ল। বিপদ — এক্সটেনশ্যই পাৰে",
  [["read and alter every page including logins", "লগইনসহ প্ৰতিটো পৃষ্ঠা পঢ়ি সলনি কৰিব"],
   ["only change the browser theme", "কেৱল ব্ৰাউজাৰৰ থীম সলনি কৰিব"],
   ["speed up the internet", "ইণ্টাৰনেট দ্ৰুত কৰিব"],
   ["repair the hard disk", "হাৰ্ড ডিস্ক মেৰামতি কৰিব"]], 0,
  "Permission to read all browsing data lets an extension see and modify page content, which includes stealing credentials and injecting ads. A theme change needs no such permission, and an extension cannot speed the network or repair a disk.",
  "সকলো ব্ৰাউজিং তথ্য পঢ়াৰ অনুমতিয়ে এক্সটেনশ্যনক পৃষ্ঠাৰ বস্তু চাই সলনি কৰিবলৈ দিয়ে, যাৰ ভিতৰত প্ৰমাণপত্ৰ চুৰি আৰু বিজ্ঞাপন সোমোৱাও আছে। থীম সলনিৰ এনে অনুমতি নালাগে, আৰু এক্সটেনশ্যই নেটৱৰ্ক দ্ৰুত বা ডিস্ক মেৰামতি কৰিব নোৱাৰে।");

add("computer-256",
  "A company wants to detect an intruder who has already gained access to the network. The control that helps is",
  "কোম্পানীয়ে ইতিমধ্যে নেটৱৰ্কত প্ৰৱেশ কৰা অনুপ্ৰৱেশকাৰীক ধৰিব বিচাৰে। সহায়ক নিয়ন্ত্ৰণ",
  [["intrusion detection monitoring network traffic", "নেটৱৰ্ক ট্ৰেফিক নিৰীক্ষণ কৰা অনুপ্ৰৱেশ চিনাক্তকৰণ"],
   ["a stronger front door lock", "শক্তিশালী মূল দুৱাৰৰ তলা"],
   ["a larger server room", "ডাঙৰ চাৰ্ভাৰ কক্ষ"],
   ["a new office chair", "নতুন কাৰ্যালয়ৰ চকী"]], 0,
  "Detection watches behaviour inside the network for unusual patterns, which is what finds an intruder who is already in. A door lock prevents entry, and room size or furniture has no role in detection.",
  "চিনাক্তকৰণে নেটৱৰ্কৰ ভিতৰৰ আচৰণ অস্বাভাৱিক আৰ্হিৰ বাবে চায়, যিয়ে ইতিমধ্যে সোমোৱা অনুপ্ৰৱেশকাৰীক বিচাৰি পায়। দুৱাৰৰ তলাই প্ৰৱেশ ৰোধ কৰে, আৰু কক্ষৰ আকাৰ বা আচবাবৰ চিনাক্তকৰণত ভূমিকা নাই।");

add("computer-257",
  "A user must send a confidential file by email to an external party. The safest method is to",
  "ব্যৱহাৰকাৰীয়ে বাহিৰৰ পক্ষলৈ গোপনীয় ফাইল ইমেইলেৰে পঠিয়াব লাগে। আটাই সুৰক্ষিত উপায়",
  [["share an encrypted link with an expiry and a separate password channel", "ম্যাদ আৰু বেলেগ পথেৰে পাছৱৰ্ডসহ এনক্ৰিপ্ট লিংক ভাগ কৰা"],
   ["attach the file to a plain email", "সাধাৰণ ইমেইলত ফাইল সংলগ্ন কৰা"],
   ["paste the contents into the message body", "বস্তু বাৰ্তাৰ গাত ভৰোৱা"],
   ["rename the file so it looks harmless", "ফাইল নিৰীহ যেন দেখুৱাবলৈ নাম সলনি কৰা"]], 0,
  "An encrypted link with an expiry limits who can open it and for how long, and sending the password by another channel keeps both halves apart. A plain attachment, pasted contents or a renamed file all travel readable.",
  "ম্যাদযুক্ত এনক্ৰিপ্ট লিংকে কাৰ কিমান দিন খুলিব পাৰে সীমিত কৰে, আৰু পাছৱৰ্ড বেলেগ পথেৰে পঠিয়ালে দুয়ো অৰ্ধ পৃথক থাকে। সাধাৰণ সংলগ্ন, ভৰোৱা বস্তু বা নাম সলনি কৰা ফাইল সকলোৱে পঢ়িব পৰাকৈ যায়।");

add("computer-258",
  "An employee is asked to grant remote access to a caller claiming to fix a virus. The correct response is to",
  "কৰ্মচাৰীক ভাইৰাছ মেৰামতিৰ বাহানা কৰি এজন কলকৰ্তাক দূৰ প্ৰৱেশ দিবলৈ কোৱা হ'ল। শুদ্ধ সঁহাৰি",
  [["refuse and report it to the security team", "নাকচ কৰি সুৰক্ষা দলক জনোৱা"],
   ["grant access because the caller sounds official", "কলকৰ্তা চৰকাৰী যেন শুনা বাবে প্ৰৱেশ দিয়া"],
   ["grant access but watch the screen", "প্ৰৱেশ দি স্ক্ৰীণ চাই থাকা"],
   ["give the password instead of access", "প্ৰৱেশৰ সলনি পাছৱৰ্ড দিয়া"]], 0,
  "Unsolicited remote access is the standard technique for installing malware and stealing data, so it is refused and reported. Sounding official proves nothing, watching does not stop the actions, and a password is worse than access.",
  "অননুৰোধিত দূৰ প্ৰৱেশ মেলৱেৰ ইনষ্টল আৰু তথ্য চুৰিৰ প্ৰচলিত পদ্ধতি, সেয়ে নাকচ কৰি জনায়। চৰকাৰী যেন শুনাটোৱে একো প্ৰমাণ নকৰে, চাই থকিলেও কাম ৰোধ নহয়, আৰু পাছৱৰ্ড দিয়া প্ৰৱেশতকৈ বেয়া।");

add("computer-259",
  "A company's backups are stored on a drive that stays connected to the server. The weakness is that",
  "কোম্পানীৰ বেকআপ চাৰ্ভাৰৰ লগত সংযুক্ত ড্ৰাইভত ৰখা হয়। দুৰ্বলতা —",
  [["ransomware can encrypt the backups too", "ৰেনছমৱেৰে বেকআপো এনক্ৰিপ্ট কৰিব পাৰে"],
   ["the drive uses too much electricity", "ড্ৰাইভে অতি বেছি বিদ্যুৎ খৰচ কৰে"],
   ["the server becomes too fast", "চাৰ্ভাৰ অতি দ্ৰুত হয়"],
   ["the backups take up no space", "বেকআপে স্থান নলয়"]], 0,
  "Malware that reaches the server reaches every attached volume, so an online backup is encrypted along with the data it should restore. Power use, speed and space are not the security concern.",
  "চাৰ্ভাৰলৈ যোৱা মেলৱেৰে সংযুক্ত প্ৰতিটো ভলিউমলৈ যায়, সেয়ে অনলাইন বেকআপ তাক ঘূৰাই অনা তথ্যৰ লগতে এনক্ৰিপ্ট হয়। বিদ্যুৎ খৰচ, গতি আৰু স্থান সুৰক্ষাৰ চিন্তা নহয়।");

add("computer-260",
  "An organisation must reduce the harm from a successful password guess. The control that limits the damage is",
  "সংস্থাই সফল পাছৱৰ্ড অনুমানৰপৰা হোৱা ক্ষতি কমাব লাগে। ক্ষতি সীমিত কৰা নিয়ন্ত্ৰণ",
  [["role based access so an account reaches only what it needs", "ভূমিকা-ভিত্তিক প্ৰৱেশ যাতে একাউণ্টে কেৱল প্ৰয়োজনীয়টোৱেই পায়"],
   ["a longer welcome message", "দীঘল স্বাগতম বাৰ্তা"],
   ["a faster login page", "দ্ৰুত লগইন পৃষ্ঠা"],
   ["a bigger logo", "ডাঙৰ ল'গ'"]], 0,
  "Least privilege means a compromised account exposes only its own scope, which caps the damage whatever the password. Messages, page speed and logos have no effect on what an attacker can reach.",
  "ন্যূনতম অধিকাৰৰ অৰ্থ ক্ষতিগ্ৰস্ত একাউণ্টে কেৱল নিজৰ পৰিসৰ উন্মোচন কৰে, যিয়ে পাছৱৰ্ড যিয়েই নহওক ক্ষতি সীমাবদ্ধ কৰে। বাৰ্তা, পৃষ্ঠাৰ গতি আৰু ল'গ'ই আক্ৰমণকাৰীয়ে কি পাব পাৰে তাত প্ৰভাৱ নপেলায়।");

/* ================= ms-office ================= */
useLeaf("ms-office");

add("computer-261",
  "A user types 007 into a cell and Excel displays 7. The reason is that Excel",
  "ব্যৱহাৰকাৰীয়ে এটা ঘৰত 007 লিখিলে এক্সেলে ৭ দেখুৱায়। কাৰণ এক্সেলে",
  [["treats the entry as a number and drops leading zeros", "প্ৰৱেশক সংখ্যা ধৰি আগৰ শূন্য আঁতৰায়"],
   ["has a corrupted formula bar", "সূত্ৰ বাৰ নষ্ট হৈছে"],
   ["cannot store text at all", "পাঠ একেবাৰে সাঁচিব নোৱাৰে"],
   ["has run out of memory", "স্মৃতি শেষ হৈছে"]], 0,
  "A plain numeric entry is stored as a value, so the leading zeros carry no meaning and are dropped. Formatting the cell as text or prefixing an apostrophe keeps them, and the formula bar, text storage and memory are all working.",
  "সাধাৰণ সংখ্যাজনিত প্ৰৱেশ মান হিচাপে সাঁচি ৰখা হয়, সেয়ে আগৰ শূন্যৰ অৰ্থ নাথাকে আৰু আঁতৰি যায়। ঘৰটো পাঠ হিচাপে সংৰচিত কৰিলে বা এপ'ষ্ট্ৰফি আগত দিলে তাক ৰাখে, আৰু সূত্ৰ বাৰ, পাঠ সাঁচনি তথা স্মৃতি ঠিকেই আছে।");

add("computer-262",
  "A formula in Excel returns the error #REF!. The most likely cause is that the formula",
  "এক্সেলত এটা সূত্ৰই #REF! ত্ৰুটি দিয়ে। আটাই সম্ভাব্য কাৰণ — সূত্ৰই",
  [["refers to a cell that has been deleted", "মচি পেলোৱা ঘৰলৈ আঙুলিয়াইছে"],
   ["contains a spelling mistake in a function name", "ফাংচনৰ নামত বানান ভুল আছে"],
   ["divides by zero", "শূন্যৰে হৰণ কৰিছে"],
   ["uses text where a number is needed", "সংখ্যা লাগিলেও পাঠ ব্যৱহাৰ কৰিছে"]], 0,
  "#REF! appears when the reference itself is no longer valid, which happens when the referenced cell or column is deleted. A misspelt function gives #NAME?, division by zero gives #DIV/0! and wrong data type gives #VALUE!.",
  "আঙুলিওৱা ঘৰ বা স্তম্ভ মচি পেলালে সূত্ৰৰ সংযোগ আৰু বৈধ নাথাকে, তেতিয়া #REF! ওলায়। বানান ভুল ফাংচনে #NAME? দিয়ে, শূন্যৰে হৰণে #DIV/0! দিয়ে আৰু ভুল তথ্যৰ প্ৰকাৰে #VALUE! দিয়ে।");

add("computer-263",
  "A user wants the same header row to appear at the top of every printed page in Excel. The setting used is",
  "ব্যৱহাৰকাৰীয়ে এক্সেলত ছপা প্ৰতিটো পৃষ্ঠাৰ ওপৰত একেই শিৰোনাম শাৰী দেখুৱাব বিচাৰে। ব্যৱহৃত ছেটিং",
  [["print titles with rows to repeat at top", "ওপৰত পুনৰাবৃত্তি কৰিবলগীয়া শাৰীসহ প্ৰিন্ট শিৰোনাম"],
   ["freeze panes", "পেন ফ্ৰিজ কৰা"],
   ["page break preview", "পৃষ্ঠা বিভাজন পূৰ্বদৰ্শন"],
   ["wrap text", "পাঠ মেৰিওৱা"]], 0,
  "Print titles tell the printer to repeat chosen rows on every page, which is what a long table needs. Freeze panes only affects the screen, page break preview shows where pages split and wrap text changes cell display.",
  "প্ৰিন্ট শিৰোনামে বাছনি কৰা শাৰী প্ৰতিটো পৃষ্ঠাত পুনৰাবৃত্তি কৰিবলৈ প্ৰিন্টাৰক কয়, যি দীঘল তালিকাৰ বাবে প্ৰয়োজন। পেন ফ্ৰিজে কেৱল পৰ্দাত প্ৰভাৱ পেলায়, পৃষ্ঠা বিভাজন পূৰ্বদৰ্শনে ক'ত ভাগ হয় দেখুৱায় আৰু পাঠ মেৰিওৱাই ঘৰৰ প্ৰদৰ্শন সলায়।");

add("computer-264",
  "A user needs to find all rows where the city is Guwahati and the sales exceed 5000. The tool that does this is",
  "ব্যৱহাৰকাৰীয়ে চহৰ গুৱাহাটী আৰু বিক্ৰী ৫০০০ৰ ওপৰ হোৱা সকলো শাৰী বিচাৰে। এই কাম কৰা সঁজুলি",
  [["an advanced filter with two criteria", "দুটা চৰ্তযুক্ত উন্নত ফিল্টাৰ"],
   ["the sort command only", "কেৱল ছৰ্ট আদেশ"],
   ["freeze panes", "পেন ফ্ৰিজ কৰা"],
   ["the spelling checker", "বানান পৰীক্ষক"]], 0,
  "An advanced filter applies several conditions at once and copies or hides the matching rows, which is exactly a two criterion search. Sorting only orders rows, freezing panes affects the view and a spelling checker reads text.",
  "উন্নত ফিল্টাৰে একেসময়ত কেইবাটাও চৰ্ত প্ৰয়োগ কৰি মিলা শাৰীবোৰ নকল বা লুকুৱায়, যি ঠিক দুই চৰ্তৰ সন্ধান। ছৰ্টে কেৱল শাৰী সজায়, পেন ফ্ৰিজে দৃশ্যত প্ৰভাৱ পেলায় আৰু বানান পৰীক্ষকে পাঠ পঢ়ে।");

add("computer-265",
  "A Word document must show different page numbers in the header for odd and even pages. The setting required is",
  "এখন ৱৰ্ড নথিত অযুগ্ম আৰু যুগ্ম পৃষ্ঠাৰ শিৰোনামত বেলেগ পৃষ্ঠা সংখ্যা দেখুৱাব লাগে। প্ৰয়োজনীয় ছেটিং",
  [["different odd and even pages", "অযুগ্ম আৰু যুগ্ম পৃষ্ঠা বেলেগ"],
   ["mirror margins only", "কেৱল প্ৰতিবিম্বিত পাৰ্শ্ব"],
   ["a section break with no header", "শিৰোনাম নোহোৱা অংশ বিভাজন"],
   ["landscape orientation", "আনুভূমিক অভিমুখ"]], 0,
  "Turning on different odd and even pages gives each parity its own header, which is how books number pages. Mirror margins only swap left and right, a headerless section removes numbering and orientation changes page shape.",
  "অযুগ্ম আৰু যুগ্ম পৃষ্ঠা বেলেগ চালু কৰিলে প্ৰত্যেক যুগলৰ নিজা শিৰোনাম হয়, পুথিয়ে এনেদৰেই পৃষ্ঠা সংখ্যা দিয়ে। প্ৰতিবিম্বিত পাৰ্শ্বে কেৱল বাওঁ-সোঁ সলনি কৰে, শিৰোনাম নোহোৱা অংশই সংখ্যা আঁতৰায় আৰু অভিমুখে পৃষ্ঠাৰ আকাৰ সলায়।");

add("computer-266",
  "A user must total a column but only the visible rows after filtering. The function that ignores hidden rows is",
  "ব্যৱহাৰকাৰীয়ে এটা স্তম্ভৰ যোগফল বিচাৰে কিন্তু ফিল্টাৰৰ পিছত দেখুওৱা শাৰীবোৰহে। লুকুৱা শাৰী এৰাই যোৱা ফাংচন",
  [["SUBTOTAL", "SUBTOTAL"],
   ["SUM", "SUM"],
   ["COUNT", "COUNT"],
   ["AVERAGE", "AVERAGE"]], 0,
  "SUBTOTAL is designed to work on the visible subset, so it recalculates as the filter changes. SUM adds every cell in the range, and COUNT and AVERAGE have the same limitation as SUM.",
  "SUBTOTAL দেখুওৱা উপগোটত কাম কৰিবলৈ বনোৱা, সেয়ে ফিল্টাৰ সলনি হ'লে পুনৰ গণনা হয়। SUM এ পৰিসৰৰ প্ৰতিটো ঘৰ যোগ কৰে, আৰু COUNT তথা AVERAGE ৰো SUM ৰ দৰেই সীমাবদ্ধতা।");

add("computer-267",
  "A user needs the same closing paragraph at the bottom of every page in a long Word document. The correct feature is a",
  "ব্যৱহাৰকাৰীয়ে দীঘল ৱৰ্ড নথিত প্ৰতিটো পৃষ্ঠাৰ তলত একেই সামৰণি অনুচ্ছেদ বিচাৰে। শুদ্ধ সুবিধা",
  [["footer", "ফুটাৰ"],
   ["footnote", "ফুটনোট"],
   ["endnote", "এণ্ডনোট"],
   ["text box", "টেক্সট বক্স"]], 0,
  "A footer repeats on every page of its section, which is what a fixed closing line needs. A footnote sits at the bottom of one page for a reference, an endnote collects at the end and a text box stays where it is placed.",
  "ফুটাৰে নিজৰ অংশৰ প্ৰতিটো পৃষ্ঠাত পুনৰাবৃত্তি হয়, যি স্থিৰ সামৰণি শাৰীৰ বাবে প্ৰয়োজন। ফুটনোটে এটা পৃষ্ঠাৰ তলত তথ্যসূত্ৰৰ বাবে থাকে, এণ্ডনোটে শেষত জমা হয় আৰু টেক্সট বক্স য'ত ৰখা হয় তাতে থাকে।");

add("computer-268",
  "A user pastes a table from Excel into Word and it breaks the page margins. The best fix is to",
  "ব্যৱহাৰকাৰীয়ে এক্সেলৰপৰা তালিকা ৱৰ্ডত পে'ষ্ট কৰিলে পৃষ্ঠাৰ পাৰ্শ্ব ভাঙে। শ্ৰেষ্ঠ সমাধান",
  [["use paste special and choose keep source formatting or auto fit to window", "পে'ষ্ট বিশেষ ব্যৱহাৰ কৰি উৎস সংৰচনা ৰখা বা জানালালৈ স্বয়ং মিলোৱা বাছনি কৰা"],
   ["reduce the font size to one point", "ফণ্টৰ আকাৰ এক পইণ্টলৈ কমোৱা"],
   ["delete the table and retype it by hand", "তালিকা মচি হাতেৰে পুনৰ লিখা"],
   ["change the page to landscape and leave it", "পৃষ্ঠা আনুভূমিক কৰি এৰি দিয়া"]], 0,
  "Paste special lets the table keep its own layout or fit the page width, which solves the overflow without damaging the content. Shrinking the font to one point makes it unreadable, retyping loses formatting and simply switching to landscape does not fix a table wider than the page.",
  "পে'ষ্ট বিশেষে তালিকাক নিজৰ বিন্যাস ৰাখিব বা পৃষ্ঠাৰ প্ৰস্থত মিলিবলৈ দিয়ে, যিয়ে বস্তু নষ্ট নকৰাকৈ উপচি পৰা সমাধান কৰে। ফণ্ট এক পইণ্টলৈ কমালে অপাঠ্য হয়, পুনৰ লিখিলে বিন্যাস যায় আৰু কেৱল আনুভূমিক কৰিলে পৃষ্ঠাতকৈ বহল তালিকা নশুধৰে।");

add("computer-269",
  "A user wants a slide to build up bullet by bullet on click. The feature used is",
  "ব্যৱহাৰকাৰীয়ে ক্লিকত এটা এটাকৈ বিন্দু ওলোৱা স্লাইড বিচাৰে। ব্যৱহৃত সুবিধা",
  [["animation with appear on click", "ক্লিকত ওলোৱা এনিমেশ্যন"],
   ["slide transition", "স্লাইড পৰিৱৰ্তন"],
   ["slide master", "স্লাইড মাষ্টাৰ"],
   ["speaker notes", "বক্তাৰ টোকা"]], 0,
  "Animations act on the objects inside a slide, so each bullet can be set to appear on click. A transition affects the change between slides, the master sets the design and notes are for the presenter only.",
  "এনিমেশ্যনে স্লাইডৰ ভিতৰৰ বস্তুত ক্ৰিয়া কৰে, সেয়ে প্ৰতিটো বিন্দু ক্লিকত ওলাবলৈ ছেট কৰিব পাৰি। পৰিৱৰ্তনে স্লাইডৰ মাজৰ সলনি কৰে, মাষ্টাৰে আৰ্হি নিৰ্ধাৰণ কৰে আৰু টোকা কেৱল উপস্থাপকৰ বাবে।");

add("computer-270",
  "A user must send a presentation that will look the same on a computer without PowerPoint. The safest export is",
  "ব্যৱহাৰকাৰীয়ে PowerPoint নথকা কম্পিউটাৰতো একেই দেখা প্ৰেজেণ্টেশ্যন পঠিয়াব লাগে। আটাই সুৰক্ষিত ৰপ্তানি",
  [["a PDF file", "এটা PDF ফাইল"],
   ["the editable PPTX file", "সম্পাদনযোগ্য PPTX ফাইল"],
   ["a folder of images without order", "ক্ৰম নোহোৱা ছবিৰ ফোল্ডাৰ"],
   ["a text file of the outline", "ৰূপৰেখাৰ পাঠ ফাইল"]], 0,
  "A PDF embeds the layout and fonts, so it renders identically anywhere without the authoring software. A PPTX needs PowerPoint, unordered images lose the sequence and an outline drops all design.",
  "PDF এ বিন্যাস আৰু ফণ্ট সাঁচি ৰাখে, সেয়ে মূল ছফ্টৱেৰ নোহোৱাকৈ যিকোনো ঠাইত একেই দেখা যায়। PPTX লৈ PowerPoint লাগে, ক্ৰম নোহোৱা ছবিয়ে ক্ৰম হেৰুৱায় আৰু ৰূপৰেখাই গোটেই আৰ্হি এৰি দিয়ে।");

add("computer-271",
  "A user needs a single mailing to 300 people each with their own name in the letter. The Word feature is",
  "ব্যৱহাৰকাৰীয়ে ৩০০ লোকলৈ এখন চিঠিত প্ৰত্যেকৰ নিজা নাম লিখি পঠিয়াব লাগে। ৱৰ্ডৰ সুবিধা",
  [["mail merge with a data source", "তথ্য উৎসসহ মেইল মাৰ্জ"],
   ["the thesaurus", "সমাৰ্থ শব্দকোষ"],
   ["track changes", "পৰিৱৰ্তন অনুসৰণ"],
   ["a table of contents", "বিষয়বস্তুৰ তালিকা"]], 0,
  "Mail merge takes one template and fills the placeholder fields from a list, producing a personalised copy per record. The thesaurus suggests words, track changes records edits and a contents list indexes headings.",
  "মেইল মাৰ্জে এটা আৰ্হি লৈ তালিকাৰপৰা স্থানধাৰক ক্ষেত্ৰ ভৰায়, যিয়ে প্ৰতিটো ৰেকৰ্ডৰ বাবে ব্যক্তিগত নকল বনায়। সমাৰ্থ শব্দকোষে শব্দ দিয়ে, পৰিৱৰ্তন অনুসৰণে সম্পাদনা লিখে আৰু বিষয়বস্তুৰ তালিকাই শিৰোনাম সূচীবদ্ধ কৰে।");

add("computer-272",
  "A user must compare two versions of a document and see every edit. The feature used is",
  "ব্যৱহাৰকাৰীয়ে নথিৰ দুটা সংস্কৰণ তুলনা কৰি প্ৰতিটো সম্পাদনা চাব লাগে। ব্যৱহৃত সুবিধা",
  [["compare documents", "নথি তুলনা"],
   ["spell check", "বানান পৰীক্ষা"],
   ["word count", "শব্দ গণনা"],
   ["page colour", "পৃষ্ঠাৰ ৰং"]], 0,
  "The compare tool aligns two files and marks insertions, deletions and formatting changes, which is exactly the requirement. Spelling, word count and page colour say nothing about what changed.",
  "তুলনা সঁজুলিয়ে দুটা ফাইল মিলাই সোমোৱা, মচা আৰু বিন্যাসৰ পৰিৱৰ্তন চিহ্নিত কৰে, যি ঠিক প্ৰয়োজন। বানান, শব্দ গণনা আৰু পৃষ্ঠাৰ ৰঙে কি সলনি হ'ল তাত একো নকয়।");

add("computer-273",
  "An Excel formula must return PASS if marks are 40 or more and FAIL otherwise. The correct function is",
  "এক্সেলৰ সূত্ৰই নম্বৰ ৪০ বা বেছি হ'লে PASS আৰু নহ'লে FAIL ঘূৰাব লাগে। শুদ্ধ ফাংচন",
  [["IF", "IF"],
   ["SUM", "SUM"],
   ["CONCATENATE", "CONCATENATE"],
   ["VLOOKUP", "VLOOKUP"]], 0,
  "IF tests a condition and returns one value when true and another when false, which is a two way choice. SUM adds numbers, CONCATENATE joins text and VLOOKUP searches a table for a matching row.",
  "IF এ চৰ্ত পৰীক্ষা কৰি সঁচা হ'লে এটা মান আৰু মিছা হ'লে আন এটা ঘূৰায়, যি দুই দিশৰ বাছনি। SUM এ সংখ্যা যোগ কৰে, CONCATENATE এ পাঠ জোড়ে আৰু VLOOKUP এ তালিকাত মিলা শাৰী বিচাৰে।");

add("computer-274",
  "A user must keep the top row visible while scrolling through 500 rows. The feature used is",
  "ব্যৱহাৰকাৰীয়ে ৫০০ শাৰী স্ক্ৰ'ল কৰোতে ওপৰৰ শাৰী দৃশ্যমান ৰাখিব লাগে। ব্যৱহৃত সুবিধা",
  [["freeze top row", "ওপৰৰ শাৰী ফ্ৰিজ কৰা"],
   ["print titles", "প্ৰিন্ট শিৰোনাম"],
   ["hide the row", "শাৰী লুকুওৱা"],
   ["merge cells", "ঘৰ মিলোৱা"]], 0,
  "Freezing pins the row on screen while the rest scrolls, which is what a long sheet needs. Print titles only affect printing, hiding removes the row and merging joins cells without pinning them.",
  "ফ্ৰিজ কৰিলে বাকীখিনি স্ক্ৰ'ল হওতে শাৰীটো পৰ্দাত আঁট খাই থাকে, যি দীঘল শীটৰ বাবে প্ৰয়োজন। প্ৰিন্ট শিৰোনামে কেৱল ছপাত প্ৰভাৱ পেলায়, লুকুওৱাই শাৰী আঁতৰায় আৰু মিলোৱাই ঘৰ জোড়ে কিন্তু আঁটি নধৰে।");

add("computer-275",
  "A user needs a chart that shows how a value changed month by month over two years. The most suitable chart is a",
  "ব্যৱহাৰকাৰীয়ে দুই বছৰত মাহে মাহে মান কেনেকৈ সলনি হ'ল দেখুওৱা চাৰ্ট বিচাৰে। আটাই উপযুক্ত চাৰ্ট",
  [["line chart", "ৰেখা চাৰ্ট"],
   ["pie chart", "পাই চাৰ্ট"],
   ["scatter chart without lines", "ৰেখা নোহোৱা স্কেটাৰ চাৰ্ট"],
   ["doughnut chart", "ড'নাট চাৰ্ট"]], 0,
  "A line chart places time along one axis and joins the points, so a trend over months reads at once. Pie and doughnut charts show parts of a whole, and a scatter without lines hides the sequence.",
  "ৰেখা চাৰ্টে এটা অক্ষত সময় ৰাখি বিন্দুবোৰ জোড়ে, সেয়ে মাহে মাহে প্ৰবণতা একেদৰেই পঢ়া যায়। পাই আৰু ড'নাট চাৰ্টে গোটৰ অংশ দেখুৱায়, আৰু ৰেখা নোহোৱা স্কেটাৰে ক্ৰম লুকুৱায়।");

add("computer-276",
  "A user must prevent others from changing a finished Word document but still allow reading. The correct step is to",
  "ব্যৱহাৰকাৰীয়ে চূড়ান্ত ৱৰ্ড নথি আনৰপৰা সলনি হোৱাৰপৰা ৰাখি পঢ়িবলৈ দিব লাগে। শুদ্ধ পদক্ষেপ",
  [["mark the document as final or restrict editing with a password", "নথিক চূড়ান্ত বুলি চিহ্নিত কৰা বা পাছৱৰ্ডেৰে সম্পাদনা সীমিত কৰা"],
   ["print it and file the paper copy", "ছপাই কাগজৰ নকল ফাইল কৰা"],
   ["rename the file with a new date", "নতুন তাৰিখেৰে ফাইলৰ নাম সলনি কৰা"],
   ["delete all the formatting", "সকলো বিন্যাস মচা"]], 0,
  "Marking as final or restricting editing tells the reader the file is complete and blocks casual changes, which is the intent. Printing, renaming or stripping formatting leaves the file fully editable.",
  "চূড়ান্ত বুলি চিহ্নিত কৰা বা সম্পাদনা সীমিত কৰিলে পঢ়োঁতাক ফাইল সম্পূৰ্ণ বুলি জনায় আৰু সাধাৰণ পৰিৱৰ্তন ৰোধ কৰে, যি উদ্দেশ্য। ছপা, নাম সলনি বা বিন্যাস মচিলে ফাইল সম্পূৰ্ণ সম্পাদনযোগ্য থাকি যায়।");

add("computer-277",
  "A user wants every sheet in a workbook to print with the same company logo. The efficient method is to",
  "ব্যৱহাৰকাৰীয়ে ৱৰ্কবুকৰ প্ৰতিটো শীট একেই কোম্পানীৰ ল'গ'সহ ছপা কৰিব বিচাৰে। দক্ষ উপায়",
  [["insert the logo in the header of each sheet or use a template", "প্ৰতিটো শীটৰ শিৰোনামত ল'গ' ভৰোৱা বা আৰ্হি ব্যৱহাৰ কৰা"],
   ["paste the logo onto the data area of each sheet", "প্ৰতিটো শীটৰ তথ্যৰ অংশত ল'গ' পে'ষ্ট কৰা"],
   ["type the company name in every cell", "প্ৰতিটো ঘৰত কোম্পানীৰ নাম লিখা"],
   ["take a screenshot of the logo each time", "প্ৰতিবাৰ ল'গ'ৰ স্ক্ৰীণশ্বট লোৱা"]], 0,
  "A header image repeats on every printed page without touching the data, and a template applies it to new sheets automatically. Pasting over data, typing in cells or taking screenshots either damages the sheet or wastes effort.",
  "শিৰোনামৰ ছবি তথ্য নোচোৱাকৈ প্ৰতিটো ছপা পৃষ্ঠাত পুনৰাবৃত্তি হয়, আৰু আৰ্হিয়ে নতুন শীটত স্বয়ংক্ৰিয়ভাৱে লগায়। তথ্যৰ ওপৰত পে'ষ্ট, ঘৰত টাইপ বা বাৰে বাৰে স্ক্ৰীণশ্বটে শীট নষ্ট বা পৰিশ্ৰম নষ্ট কৰে।");

add("computer-278",
  "A user must remove duplicate rows from a list of 5,000 entries in Excel. The correct tool is",
  "ব্যৱহাৰকাৰীয়ে এক্সেলত ৫,০০০ প্ৰৱেশৰ তালিকাৰপৰা নকল শাৰী আঁতৰাব লাগে। শুদ্ধ সঁজুলি",
  [["remove duplicates on the data tab", "ডেটা টেবত নকল আঁতৰোৱা"],
   ["sort ascending only", "কেৱল ঊৰ্ধ্বক্ৰমে ছৰ্ট কৰা"],
   ["conditional formatting", "চৰ্তসাপেক্ষ বিন্যাস"],
   ["text to columns", "পাঠৰপৰা স্তম্ভ"]], 0,
  "Remove duplicates compares the chosen columns and deletes repeated rows in one pass, which is the task. Sorting only groups duplicates together, conditional formatting highlights them and text to columns splits one column into several.",
  "নকল আঁতৰোৱাই বাছনি কৰা স্তম্ভ তুলনা কৰি এটা পাছত পুনৰাবৃত্ত শাৰী মচি পেলায়, যি কামটো। ছৰ্টে কেৱল নকলবোৰ ওচৰা-ওচৰিকৈ আনে, চৰ্তসাপেক্ষ বিন্যাসে চিহ্নিত কৰে আৰু পাঠৰপৰা স্তম্ভই এটা স্তম্ভক কেইবাটাও কৰে।");

add("computer-279",
  "A user must show a value with two decimal places and a thousands separator. The correct approach is to",
  "ব্যৱহাৰকাৰীয়ে দুই দশমিক স্থান আৰু হাজাৰৰ বিভাজকসহ মান দেখুৱাব লাগে। শুদ্ধ উপায়",
  [["apply a number format to the cells", "ঘৰবোৰত সংখ্যা বিন্যাস প্ৰয়োগ কৰা"],
   ["retype every value with commas", "প্ৰতিটো মান কমাৰে পুনৰ লিখা"],
   ["change the font to bold", "ফণ্ট গাঢ় কৰা"],
   ["widen the column", "স্তম্ভ বহল কৰা"]], 0,
  "A number format controls how the stored value is displayed, so decimals and separators appear without altering the data. Retyping turns numbers into text, and bold or a wider column changes appearance only.",
  "সংখ্যা বিন্যাসে সাঁচি ৰখা মান কেনেকৈ দেখুৱাব লাগে নিয়ন্ত্ৰণ কৰে, সেয়ে তথ্য নসলোৱাকৈ দশমিক আৰু বিভাজক ওলায়। পুনৰ লিখিলে সংখ্যা পাঠলৈ সলনি হয়, আৰু গাঢ় ফণ্ট বা বহল স্তম্ভই কেৱল ৰূপ সলায়।");

add("computer-280",
  "A user must protect a shared Excel file so that only certain cells can be edited. The correct sequence is to",
  "ব্যৱহাৰকাৰীয়ে ভগা এক্সেল ফাইল সুৰক্ষিত কৰি কেৱল নিৰ্দিষ্ট ঘৰত সম্পাদনা কৰিব পৰাকৈ ৰাখিব লাগে। শুদ্ধ ক্ৰম",
  [["unlock the editable cells first, then protect the sheet", "প্ৰথমে সম্পাদনযোগ্য ঘৰবোৰ খুলি তাৰ পিছত শীট সুৰক্ষিত কৰা"],
   ["protect the sheet first, then unlock the cells", "প্ৰথমে শীট সুৰক্ষিত কৰি তাৰ পিছত ঘৰ খোলা"],
   ["hide the sheet and share the file", "শীট লুকুৱাই ফাইল ভগ কৰা"],
   ["password protect the whole workbook only", "কেৱল গোটেই ৱৰ্কবুক পাছৱৰ্ডেৰে সুৰক্ষিত কৰা"]], 0,
  "Cells are locked by default, so the editable ones must be unlocked before protection takes effect, otherwise the whole sheet is frozen. Doing it in the reverse order locks everything, hiding removes access and workbook protection does not distinguish cells.",
  "ঘৰবোৰ সাধাৰণতে বন্ধ থাকে, সেয়ে সুৰক্ষা কাৰ্যকৰী হোৱাৰ আগতে সম্পাদনযোগ্যবোৰ খুলিব লাগে, নহ'লে গোটেই শীট আঁটি যায়। উলটি ক্ৰমে সকলো বন্ধ কৰে, লুকুওৱাই প্ৰৱেশ আঁতৰায় আৰু ৱৰ্কবুক সুৰক্ষাই ঘৰ পৃথক নকৰে।");

/* ================= dbms-number-system ================= */
useLeaf("dbms-number-system");

add("computer-281",
  "The decimal number 45 is represented in binary as",
  "দশমিক সংখ্যা ৪৫ দ্বিমিকত হ'ব",
  [["101101", "১০১১০১"],
   ["101011", "১০১০১১"],
   ["110101", "১১০১০১"],
   ["100101", "১০০১০১"]], 0,
  "Thirty-two plus eight plus four plus one is forty-five, which sets the bits at 32, 8, 4 and 1 and gives 101101. The other patterns sum to forty-three, fifty-three and thirty-seven.",
  "বত্ৰিশ যোগ আঠ যোগ চাৰি যোগ এক = পঞ্চল্লিশ, যিয়ে ৩২, ৮, ৪ আৰু ১ ৰ স্থানত বিট দি ১০১১০১ দিয়ে। আন আৰ্হিবোৰৰ যোগফল তেতাল্লিশ, তিৰ্পন্ন আৰু সাতত্ৰিশ।");

add("computer-282",
  "A register holds the bit pattern 11011 and the technician must report it as a decimal count. The value is",
  "ৰেজিষ্টাৰত ১১০১১ বিট আৰ্হি আছে আৰু কৰ্মীয়ে তাক দশমিক গণনা হিচাপে জনাব লাগে। মানটো",
  [["27", "২৭"], ["23", "২৩"], ["29", "২৯"], ["31", "৩১"]], 0,
  "Sixteen plus eight plus two plus one is twenty-seven, counting the set bits at 16, 8, 2 and 1. Twenty-three, twenty-nine and thirty-one would need different bit patterns.",
  "ষোল্ল যোগ আঠ যোগ দুই যোগ এক = সাতাইশ, ১৬, ৮, ২ আৰু ১ ৰ স্থানত থকা বিট গণি। তেইশ, ঊনত্ৰিশ আৰু একত্ৰিশৰ বাবে বেলেগ বিট আৰ্হি লাগে।");

add("computer-283",
  "In a database, a candidate key that was not chosen as the primary key is called a",
  "ডেটাবেছত প্ৰাথমিক কি হিচাপে নবাছা এটা প্ৰাৰ্থী কি ক তোলা হয়",
  [["alternate key", "বৈকল্পিক কি"],
   ["foreign key", "বহিঃ কি"],
   ["composite key", "যৌগিক কি"],
   ["super key", "ছুপাৰ কি"]], 0,
  "An alternate key is a candidate that could have been the primary key but was not selected. A foreign key points to another table, a composite key spans several columns and a super key is any set that uniquely identifies a row.",
  "বৈকল্পিক কি এটা প্ৰাৰ্থী যি প্ৰাথমিক কি হ'ব পাৰিলেহেঁতেন কিন্তু বাছনি নহ'ল। বহিঃ কিয়ে আন তালিকালৈ আঙুলিয়ায়, যৌগিক কিয়ে কেইবাটাও স্তম্ভ লয় আৰু ছুপাৰ কি যিকোনো এনে গোট যি শাৰী অদ্বিতীয়ভাৱে চিনাক্ত কৰে।");

add("computer-284",
  "The hexadecimal number 2F has the decimal value",
  "ষোড়শিক সংখ্যা 2F ৰ দশমিক মান",
  [["47", "৪৭"], ["31", "৩১"], ["215", "২১৫"], ["45", "৪৫"]], 0,
  "The left digit is two sixteens, or thirty-two, and F is fifteen, so the total is forty-seven. Thirty-one, two hundred fifteen and forty-five come from misreading F or the place values.",
  "বাওঁ অংকটো দুই ষোল্ল, অৰ্থাৎ বত্ৰিশ, আৰু F  পোন্ধৰ, সেয়ে মুঠ সাতচল্লিশ। একত্ৰিশ, দুইশ পোন্ধৰ আৰু পঞ্চল্লিশ F বা স্থানীয় মান ভুল পঢ়াৰপৰা আহে।");

add("computer-285",
  "A table must enforce that no two students share the same roll number. The constraint used is",
  "তালিকাত দুই শিক্ষাৰ্থীৰ একেই ৰোল নম্বৰ নোহোৱাটো বলবৎ কৰিব লাগে। ব্যৱহৃত বাধা",
  [["a unique constraint", "অদ্বিতীয় বাধা"],
   ["a check constraint on age", "বয়সৰ ওপৰত পৰীক্ষা বাধা"],
   ["a default value", "অৱিকল্পিত মান"],
   ["a foreign key", "বহিঃ কি"]], 0,
  "A unique constraint rejects any duplicate value in the column, which is exactly the roll number rule. A check constraint tests a condition on values, a default fills an empty field and a foreign key links to another table.",
  "অদ্বিতীয় বাধাই স্তম্ভত যিকোনো পুনৰাবৃত্ত মান নাকচ কৰে, যি ঠিক ৰোল নম্বৰৰ নিয়ম। পৰীক্ষা বাধাই মানৰ ওপৰত চৰ্ত পৰীক্ষা কৰে, অৱিকল্পিত মানে খালী ক্ষেত্ৰ ভৰায় আৰু বহিঃ কিয়ে আন তালিকালৈ সংযোগ কৰে।");

add("computer-286",
  "The result of adding the binary numbers 1101 and 1011 is",
  "দ্বিমিক সংখ্যা ১১০১ আৰু ১০১১ যোগ কৰাৰ ফল",
  [["11000", "১১০০০"],
   ["10110", "১০১১০"],
   ["11010", "১১০১০"],
   ["10011", "১০০১১"]], 0,
  "Thirteen plus eleven is twenty-four, and twenty-four in binary is 11000, with a carry out of the fourth place. The other patterns are twenty-two, twenty-six and nineteen.",
  "তেৰ যোগ এঘাৰ = চৌবিশ, আৰু দ্বিমিকত চৌবিশ ১১০০০, চতুৰ্থ স্থানৰপৰা কেৰী ওলায়। আন আৰ্হিবোৰ বাইশ, ছাব্বিশ আৰু ঊনৈশ।");

add("computer-287",
  "In SQL, the clause used to filter rows before grouping is",
  "SQL ত গোট কৰাৰ আগতে শাৰী ছাঁকিবলৈ ব্যৱহৃত ধাৰা",
  [["WHERE", "WHERE"],
   ["HAVING", "HAVING"],
   ["ORDER BY", "ORDER BY"],
   ["GROUP BY", "GROUP BY"]], 0,
  "WHERE filters individual rows as they are read, which happens before any grouping. HAVING filters the groups after aggregation, ORDER BY sorts the result and GROUP BY forms the groups.",
  "WHERE এ পঢ়ি থকাৰ সময়ত প্ৰতিটো শাৰী ছাঁকি দিয়ে, যি গোট কৰাৰ আগতে হয়। HAVING এ জমা কৰাৰ পিছত গোটবোৰ ছাঁকি দিয়ে, ORDER BY এ ফল সজায় আৰু GROUP BY এ গোট গঢ়ে।");

add("computer-288",
  "A relation is said to be in second normal form when it is in first normal form and",
  "সম্পৰ্ক দ্বিতীয় স্বাভাৱিক ৰূপত বুলি কোৱা হয় যেতিয়া ই প্ৰথম স্বাভাৱিক ৰূপত থাকে আৰু",
  [["no non key attribute depends on part of a composite key", "কোনো অ-কি গুণ যৌগিক কিৰ অংশৰ ওপৰত নিৰ্ভৰ নকৰে"],
   ["every attribute is atomic", "প্ৰতিটো গুণ পাৰমাণৱিক"],
   ["there is no transitive dependency", "কোনো পাৰগম্য নিৰ্ভৰশীলতা নাই"],
   ["every table has a foreign key", "প্ৰতিটো তালিকাত বহিঃ কি আছে"]], 0,
  "Second normal form removes partial dependencies, where an attribute needs only part of a composite key. Atomic attributes are first normal form, removing transitive dependency is third normal form, and foreign keys are unrelated.",
  "দ্বিতীয় স্বাভাৱিক ৰূপে আংশিক নিৰ্ভৰশীলতা আঁতৰায়, য'ত গুণ এটাই যৌগিক কিৰ কেৱল এটা অংশ লাগে। পাৰমাণৱিক গুণ প্ৰথম স্বাভাবিক ৰূপ, পাৰগম্য নিৰ্ভৰশীলতা আঁতৰোৱা তৃতীয় স্বাভাৱিক ৰূপ, আৰু বহিঃ কিৰ সম্পৰ্ক নাই।");

add("computer-289",
  "A file permission mask is stored as the binary pattern 101101 and must be written in octal for the config file. The octal value is",
  "ফাইল অনুমতিৰ মাস্ক ১০১১০১ দ্বিমিক আৰ্হিত আছে আৰু কনফিগ ফাইলত অষ্টিকত লিখিব লাগে। অষ্টিক মানটো",
  [["55", "৫৫"], ["45", "৪৫"], ["65", "৬৫"], ["101", "১০১"]], 0,
  "Grouping from the right in threes gives 101 and 101, which are five and five, so the octal form is 55. The other options come from misgrouping or reading in decimal.",
  "সোঁফালৰপৰা তিনি কৰি গোটালে ১০১ আৰু ১০১ পোৱা যায়, যি পাঁচ আৰু পাঁচ, সেয়ে অষ্টিক ৰূপ ৫৫। আন বাছনিবোৰ ভুল গোট বা দশমিক পঢ়াৰপৰা আহে।");

add("computer-290",
  "A database table stores a customer's city in every order row. The anomaly this creates is",
  "ডেটাবেছ তালিকাত প্ৰতিটো অৰ্ডাৰ শাৰীত গ্ৰাহকৰ চহৰ ৰখা হয়। ইয়াৰপৰা হোৱা অসংগতি",
  [["an update anomaly, because the city must be changed in many rows", "নবীকৰণ অসংগতি, কাৰণ চহৰ বহু শাৰীত সলনি কৰিব লাগে"],
   ["a syntax error", "বাক্য গঠনৰ ত্ৰুটি"],
   ["a hardware failure", "হাৰ্ডৱেৰ বিফলতা"],
   ["a network timeout", "নেটৱৰ্ক সময়সীমা"]], 0,
  "Repeating the city means an update must touch every copy, and missing one leaves contradictory data, which is an update anomaly cured by normalisation. Syntax, hardware and network faults are not caused by data design.",
  "চহৰ পুনৰাবৃত্তি কৰিলে নবীকৰণে প্ৰতিটো নকল স্পৰ্শ কৰিব লাগে, আৰু এটা এৰি গ'লে বিৰোধী তথ্য থাকে, যি নৰ্মেলাইজেশ্যনে সমাধান কৰা নবীকৰণ অসংগতি। বাক্য গঠন, হাৰ্ডৱেৰ আৰু নেটৱৰ্ক ত্ৰুটি তথ্যৰ আৰ্হিৰপৰা নহয়।");

add("computer-291",
  "A subnet has 200 usable host addresses to number. The binary form the engineer writes for 200 is",
  "এটা ছাবনেটত ২০০ ব্যৱহাৰযোগ্য হ'ষ্ট ঠিকনা দিব লাগে। অভিযন্তাই ২০০ ৰ বাবে লিখা দ্বিমিক ৰূপ",
  [["11001000", "১১০০১০০০"],
   ["11000100", "১১০০০১০০"],
   ["10101000", "১০১০১০০০"],
   ["11100000", "১১১০০০০০"]], 0,
  "One hundred twenty-eight plus sixty-four plus eight is two hundred, which sets bits 7, 6 and 3 and gives 11001000. The others evaluate to one hundred ninety-six, one hundred sixty-eight and two hundred twenty-four.",
  "একশ অঠাইশ যোগ চৌষট্টি যোগ আঠ = দুইশ, যিয়ে ৭, ৬ আৰু ৩ নম্বৰ বিট দি ১১০০১০০০ দিয়ে। আনবোৰৰ মান একশ ছয়ানব্বৈ, একশ অঠষষ্টি আৰু দুইশ চৌবিশ।");

add("computer-292",
  "A query must return only those departments that have more than five employees. The clause used is",
  "প্ৰশ্নই কেৱল পাঁচতকৈ বেছি কৰ্মচাৰী থকা বিভাগ ঘূৰাব লাগে। ব্যৱহৃত ধাৰা",
  [["HAVING with COUNT", "COUNT ৰ সৈতে HAVING"],
   ["WHERE with COUNT", "COUNT ৰ সৈতে WHERE"],
   ["ORDER BY with COUNT", "COUNT ৰ সৈতে ORDER BY"],
   ["DISTINCT with COUNT", "COUNT ৰ সৈতে DISTINCT"]], 0,
  "The condition applies to an aggregate, so it belongs in HAVING after grouping by department. WHERE cannot test an aggregate, ORDER BY only sorts and DISTINCT removes repeated rows.",
  "চৰ্তটো এটা সমষ্টিৰ ওপৰত প্ৰযোজ্য, সেয়ে বিভাগ অনুসৰি গোট কৰাৰ পিছত HAVING ত থাকিব লাগে। WHERE এ সমষ্টি পৰীক্ষা কৰিব নোৱাৰে, ORDER BY এ কেৱল সজায় আৰু DISTINCT এ পুনৰাবৃত্ত শাৰী আঁতৰায়।");

add("computer-293",
  "The hexadecimal equivalent of the decimal number 255 is",
  "দশমিক সংখ্যা ২৫৫ ৰ ষোড়শিক সমতুল্য",
  [["FF", "FF"], ["FE", "FE"], ["F0", "F0"], ["1FF", "১FF"]], 0,
  "Two hundred fifty-five is fifteen sixteens plus fifteen, which is FF, the largest two digit hexadecimal value. FE is two hundred fifty-four, F0 is two hundred forty and 1FF is five hundred eleven.",
  "দুইশ পঞ্চাশ পাঁচ = পোন্ধৰ ষোল্ল যোগ পোন্ধৰ, যি FF, দুই অংকৰ আটাই ডাঙৰ ষোড়শিক মান। FE  দুইশ চুৱান্ন, F0  দুইশ চল্লিশ আৰু ১FF  পাঁচশ এঘাৰ।");

add("computer-294",
  "A foreign key in a child table must satisfy which rule?",
  "শিশু তালিকাৰ বহিঃ কিয়ে কোন নিয়ম মানিব লাগে",
  [["its value must exist in the parent table or be null", "ইয়াৰ মান পিতৃ তালিকাত থাকিব লাগে বা শূন্য হ'ব লাগে"],
   ["it must always be unique in the child table", "শিশু তালিকাত সদায় অদ্বিতীয় হ'ব লাগে"],
   ["it must be the largest column", "আটাই ডাঙৰ স্তম্ভ হ'ব লাগে"],
   ["it must never be indexed", "কেতিয়াও সূচীবদ্ধ নহ'ব লাগে"]], 0,
  "Referential integrity requires that a foreign key matches an existing parent key or is empty, which is what keeps the link valid. It is not unique in the child, has no size rule and is commonly indexed for speed.",
  "তথ্যসূত্ৰীয় অখণ্ডতাই বিচাৰে বহিঃ কিয়ে বিদ্যমান পিতৃ কিৰ লগত মিলক বা খালী থাকক, যিয়ে সংযোগ বৈধ ৰাখে। ই শিশুত অদ্বিতীয় নহয়, আকাৰৰ নিয়ম নাই আৰু গতিৰ বাবে সাধাৰণতে সূচীবদ্ধ কৰা হয়।");

add("computer-295",
  "The binary subtraction 1000 minus 1 gives",
  "দ্বিমিক বিয়োগ ১০০০ ৰপৰা ১ বিয়োগ কৰিলে",
  [["111", "১১১"], ["1001", "১০০১"], ["110", "১১০"], ["1011", "১০১১"]], 0,
  "Eight minus one is seven, and seven in binary is 111. The other options are nine, six and eleven.",
  "আঠ বিয়োগ এক = সাত, আৰু দ্বিমিকত সাত ১১১। আন বাছনিবোৰ ন, ছয় আৰু এঘাৰ।");

add("computer-296",
  "A report that filters on customer_id takes 40 seconds on a table of two million rows. The change that will speed it up most is to",
  "বিশ লাখ শাৰীৰ তালিকাত customer_id ৰ ওপৰত ছাঁকি লোৱা প্ৰতিবেদন এটাত ৪০ ছেকেণ্ড লাগে। তাক আটাই দ্ৰুত কৰা পৰিৱৰ্তন",
  [["speed up searches on that column", "সেই স্তম্ভত সন্ধান দ্ৰুত কৰিবলৈ"],
   ["reduce the disk space used", "ব্যৱহৃত ডিস্ক স্থান কমাবলৈ"],
   ["encrypt the values", "মানবোৰ এনক্ৰিপ্ট কৰিবলৈ"],
   ["prevent null values", "শূন্য মান ৰোধ কৰিবলৈ"]], 0,
  "An index is a separate structure that lets the engine find rows without scanning the whole table, which is why searches speed up. It actually uses extra space, does not encrypt and does not enforce null rules.",
  "সূচী এটা পৃথক গঠন যিয়ে ইঞ্জিনক গোটেই তালিকা স্কেন নকৰাকৈ শাৰী বিচাৰিবলৈ দিয়ে, সেয়ে সন্ধান দ্ৰুত হয়। ই আচলতে অতিৰিক্ত স্থান লয়, এনক্ৰিপ্ট নকৰে আৰু শূন্যৰ নিয়ম বলবৎ নকৰে।");

add("computer-297",
  "The two's complement of the 4 bit binary number 0110 is",
  "৪ বিট দ্বিমিক সংখ্যা ০১১০ ৰ দুইৰ পূৰক",
  [["1010", "১০১০"], ["1001", "১০০১"], ["0111", "০১১১"], ["1100", "১১০০"]], 0,
  "Inverting the bits gives 1001 and adding one gives 1010, which represents minus six. 1001 is only the inversion, and 0111 and 1100 are unrelated values.",
  "বিটবোৰ ওলটালে ১০০১ আৰু এক যোগ কৰিলে ১০১০, যিয়ে ঋণাত্মক ছয় বুজায়। ১০০১ কেৱল ওলোটা, আৰু ০১১১ তথা ১১০০ অসম্পৰ্কীয় মান।");

add("computer-298",
  "A view in a database is best described as",
  "ডেটাবেছৰ ভিউ ক শ্ৰেষ্ঠভাৱে বৰ্ণনা কৰা হয়",
  [["a stored query that behaves like a table", "তালিকা যেন ব্যৱহাৰ হোৱা সাঁচি ৰখা প্ৰশ্ন"],
   ["a physical copy of all rows", "সকলো শাৰীৰ ভৌতিক নকল"],
   ["a backup of the database", "ডেটাবেছৰ বেকআপ"],
   ["an index on two columns", "দুটা স্তম্ভৰ সূচী"]], 0,
  "A view stores the query definition rather than the data, so it presents a virtual table over the base tables. It is not a copy, a backup or an index.",
  "ভিউৱে তথ্য নহয় প্ৰশ্নৰ সংজ্ঞা সাঁচি ৰাখে, সেয়ে ই মূল তালিকাৰ ওপৰত এটা আভাসমূলক তালিকা দিয়ে। ই নকল, বেকআপ বা সূচী নহয়।");

add("computer-299",
  "The decimal value of the binary fraction 0.101 is",
  "দ্বিমিক ভগ্নাংশ ০.১০১ ৰ দশমিক মান",
  [["0.625", "০.৬২৫"], ["0.5", "০.৫"], ["0.75", "০.৭৫"], ["0.375", "০.৩৭৫"]], 0,
  "The bits stand for one half, zero quarters and one eighth, and 0.5 plus 0.125 is 0.625. The other values would need different bit patterns.",
  "বিটবোৰে আধা, শূন্য চতুৰ্থাংশ আৰু এক অষ্টমাংশ বুজায়, আৰু ০.৫ যোগ ০.১২৫ = ০.৬২৫। আন মানৰ বাবে বেলেগ বিট আৰ্হি লাগে।");

add("computer-300",
  "A table has columns order_id, product_id and quantity, with the key being order_id plus product_id. Storing product_name here violates",
  "তালিকাত order_id, product_id আৰু quantity স্তম্ভ আছে, কি হ'ল order_id লগতে product_id। ইয়াত product_name ৰখাই উলংঘা কৰে",
  [["second normal form, because it depends on only part of the key", "দ্বিতীয় স্বাভাৱিক ৰূপ, কাৰণ ই কিৰ কেৱল এটা অংশৰ ওপৰত নিৰ্ভৰশীল"],
   ["first normal form, because values are not atomic", "প্ৰথম স্বাভাৱিক ৰূপ, কাৰণ মান পাৰমাণৱিক নহয়"],
   ["third normal form, because of a transitive dependency", "তৃতীয় স্বাভাৱিক ৰূপ, কাৰণ পাৰগম্য নিৰ্ভৰশীলতা"],
   ["no normal form at all", "কোনো স্বাভাৱিক ৰূপ নহয়"]], 0,
  "The product name depends on product_id alone, not on the whole composite key, which is a partial dependency that second normal form removes. Atomicity is not the issue, and a transitive dependency involves a non key attribute determining another.",
  "পণ্যৰ নাম কেৱল product_id ৰ ওপৰত নিৰ্ভৰশীল, গোটেই যৌগিক কিৰ ওপৰত নহয়, যি আংশিক নিৰ্ভৰশীলতা আৰু দ্বিতীয় স্বাভাৱিক ৰূপে তাক আঁতৰায়। পাৰমাণৱিকতা সমস্যা নহয়, আৰু পাৰগম্য নিৰ্ভৰশীলতাত এটা অ-কি গুণে আন এটাক নিৰ্ণয় কৰে।");

module.exports = { questions: Q };
