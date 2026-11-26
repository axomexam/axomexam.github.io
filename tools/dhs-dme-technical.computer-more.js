#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.computer-more.js

   Computer Awareness items for the DHS & DME Technical Grade III
   paper. Six leaves, thirty each. Every item names its leaf, so the
   builder files it directly instead of guessing from the stem.
   =========================================================== */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  /* Rotate by a value derived from the id so the key is not stuck in
     slot A. Deterministic, so a rebuild always produces the same file. */
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

add("computer-001",
  "The part of a computer that performs arithmetic and logical operations is the",
  "কম্পিউটাৰৰ যি অংশই গাণিতিক আৰু যুক্তিমূলক কাম কৰে তাক কি বোলা হয়",
  [["ALU", "ALU"], ["control unit", "নিয়ন্ত্ৰণ ইউনিট"], ["memory unit", "স্মৃতি ইউনিট"], ["input unit", "ইনপুট ইউনিট"]], 0,
  "The arithmetic logic unit carries out addition, subtraction and comparisons. The control unit only directs traffic between the parts.",
  "অংকীয় যুক্তি ইউনিটে যোগ, বিয়োগ আৰু তুলনা কৰে। নিয়ন্ত্ৰণ ইউনিটে কেবল অংশবোৰৰ মাজত কাম চলায়।");

add("computer-002",
  "Which generation of computers used integrated circuits?",
  "কম্পিউটাৰৰ কোন প্ৰজন্মই সমন্বিত বৰ্তনী ব্যৱহাৰ কৰিছিল",
  [["third generation", "তৃতীয় প্ৰজন্ম"], ["first generation", "প্ৰথম প্ৰজন্ম"], ["second generation", "দ্বিতীয় প্ৰজন্ম"], ["fifth generation", "পঞ্চম প্ৰজন্ম"]], 0,
  "Third generation machines replaced transistors with integrated circuits. The first used valves and the second used discrete transistors.",
  "তৃতীয় প্ৰজন্মই ট্ৰান্সিষ্টৰৰ সলনি সমন্বিত বৰ্তনী দিলে। প্ৰথমে ভেল্ভ আৰু দ্বিতীয়ই সুকীয়া ট্ৰান্সিষ্টৰ ব্যৱহাৰ কৰিছিল।");

add("computer-003",
  "One kilobyte is equal to",
  "এক কিল'বাইট কিৰ সমান",
  [["1024 bytes", "১০২৪ বাইট"], ["1000 bytes", "১০০০ বাইট"], ["1024 bits", "১০২৪ বিট"], ["512 bytes", "৫১২ বাইট"]], 0,
  "Memory is counted in powers of two, so a kilobyte is two to the tenth, that is 1024 bytes. Decimal 1000 is used only by disk makers.",
  "স্মৃতি দুইৰ ঘাতত গণা হয়, সেয়ে এক কিল'বাইট = ২ ৰ ঘাত ১০ = ১০২৪ বাইট। ১০০০ কেবল ডিস্ক প্ৰস্তুতকাৰীয়ে ব্যৱহাৰ কৰে।");

add("computer-004",
  "The brain of a computer is the",
  "কম্পিউটাৰৰ মগজু হ'ল",
  [["CPU", "CPU"], ["monitor", "মনিটৰ"], ["keyboard", "কীবৰ্ড"], ["hard disk", "হাৰ্ড ডিস্ক"]], 0,
  "The central processing unit fetches, decodes and executes every instruction, so it is called the brain. The others are input or storage devices.",
  "কেন্দ্ৰীয় প্ৰচেছিং ইউনিটে প্ৰতিটো নিৰ্দেশ লৈ, বুজি কাৰ্যকৰী কৰে, সেয়ে ইয়াক মগজু বোলা হয়। বাকীবোৰ ইনপুট বা সঞ্চয় সজুলি।");

add("computer-005",
  "Which of the following is an output device?",
  "তলৰ কোনটো আউটপুট সজুলি",
  [["plotter", "প্লটাৰ"], ["scanner", "স্কেনাৰ"], ["mouse", "মাউছ"], ["light pen", "লাইট পেন"]], 0,
  "A plotter draws large technical drawings on paper, so it outputs. Scanner, mouse and light pen all send data into the computer.",
  "প্লটাৰে কাগজত ডাঙৰ নক্সা আঁকে, সেয়ে ই আউটপুট। স্কেনাৰ, মাউছ আৰু লাইট পেনে তথ্য কম্পিউটাৰলৈ পঠিয়ায়।");

add("computer-006",
  "The first electronic digital computer was",
  "প্ৰথম ইলেক্ট্ৰনিক ডিজিটেল কম্পিউটাৰ আছিল",
  [["ENIAC", "ENIAC"], ["UNIVAC", "UNIVAC"], ["IBM 360", "IBM 360"], ["Altair", "আল্টেয়াৰ"]], 0,
  "ENIAC, completed in 1946, was the first general-purpose electronic digital computer. UNIVAC came later as a commercial machine.",
  "১৯৪৬ চনত সম্পূৰ্ণ ENIAC প্ৰথম সাধাৰণ উদ্দেশ্যৰ ইলেক্ট্ৰনিক ডিজিটেল কম্পিউটাৰ আছিল। UNIVAC পিছত বাণিজ্যিক ৰূপে আহিল।");

add("computer-007",
  "The number of bits in one byte is",
  "এক বাইটত থকা বিটৰ সংখ্যা",
  [["8", "৮"], ["4", "৪"], ["16", "১৬"], ["2", "২"]], 0,
  "A byte holds eight bits, enough to store one character. Four bits is a nibble and sixteen bits is a word on older machines.",
  "এক বাইটত আঠ বিট থাকে, যি এটা আখৰ ৰাখিবলৈ যথেষ্ট। চাৰি বিট নিবল আৰু ষোল্ল বিট পুৰণি যন্ত্ৰৰ শব্দ।");

add("computer-008",
  "Which memory is volatile, losing its contents when power is switched off?",
  "কোন স্মৃতি অস্থিৰ, বিদ্যুৎ বন্ধ হ'লে তথ্য হেৰুৱায়",
  [["RAM", "RAM"], ["ROM", "ROM"], ["hard disk", "হাৰ্ড ডিস্ক"], ["pen drive", "পেন ড্ৰাইভ"]], 0,
  "RAM needs constant power to hold its charge, so a shutdown clears it. ROM and storage devices keep their contents without power.",
  "RAM এ আধান ধৰি ৰাখিবলৈ নিৰন্তৰ বিদ্যুৎ লাগে, সেয়ে বন্ধ কৰিলে মচি যায়। ROM আৰু সঞ্চয় সজুলিয়ে বিদ্যুৎ নোহোৱাকৈও ৰাখে।");

add("computer-009",
  "The speed of a processor is measured in",
  "প্ৰচেছৰৰ গতি কিৰে জোখা হয়",
  [["gigahertz", "গিগাহাৰ্টজ"], ["gigabyte", "গিগাবাইট"], ["megapixel", "মেগাপিক্সেল"], ["decibel", "ডেচিবেল"]], 0,
  "Clock speed counts cycles per second, so it is quoted in gigahertz. Gigabyte measures storage and megapixel measures camera resolution.",
  "ঘড়ীৰ গতি প্ৰতি ছেকেণ্ডত চক্ৰ গণে, সেয়ে গিগাহাৰ্টজত দিয়া হয়। গিগাবাইটে সঞ্চয় আৰু মেগাপিক্সেলে কেমেৰাৰ ৰিজ'লিউশন জোখে।");

add("computer-010",
  "Which of the following is system software?",
  "তলৰ কোনটো চিষ্টেম ছফ্টৱেৰ",
  [["operating system", "অপাৰেটিং চিষ্টেম"], ["spreadsheet", "স্প্ৰেডশ্বীট"], ["web browser", "ৱেব ব্ৰাউজাৰ"], ["photo editor", "ফটো এডিটৰ"]], 0,
  "The operating system manages hardware and runs other programs, so it is system software. The rest are application software.",
  "অপাৰেটিং চিষ্টেমে হাৰ্ডৱেৰ চলাই আন প্ৰগ্ৰাম সক্ৰিয় কৰে, সেয়ে ই চিষ্টেম ছফ্টৱেৰ। বাকীবোৰ এপ্লিকেশ্যন ছফ্টৱেৰ।");

add("computer-011",
  "The base of the binary number system is",
  "দ্বিমিক সংখ্যা পদ্ধতিৰ ভিত্তি",
  [["2", "২"], ["8", "৮"], ["10", "১০"], ["16", "১৬"]], 0,
  "Binary uses only the digits zero and one, so its base is two. Base eight is octal and base sixteen is hexadecimal.",
  "দ্বিমিকে কেবল শূন্য আৰু এক ব্যৱহাৰ কৰে, সেয়ে ভিত্তি দুই। ভিত্তি আঠ অষ্টাল আৰু ভিত্তি ষোল্ল হেক্সাডেচিমেল।");

add("computer-012",
  "Which of the following is the fastest memory?",
  "তলৰ কোনটো আটাই দ্ৰুত স্মৃতি",
  [["cache memory", "কেশ্ব স্মৃতি"], ["main memory", "মূল স্মৃতি"], ["hard disk", "হাৰ্ড ডিস্ক"], ["magnetic tape", "চুম্বকীয় টেপ"]], 0,
  "Cache sits on or beside the processor and serves it in a few cycles. Hard disks and tapes are thousands of times slower.",
  "কেশ্ব প্ৰচেছৰৰ ওপৰত বা কাষত থাকে আৰু কেইচক্ৰতেই তথ্য দিয়ে। হাৰ্ড ডিস্ক আৰু টেপ হাজাৰ গুণ ধীৰ।");

add("computer-013",
  "The full form of ROM is",
  "ROM ৰ সম্পূৰ্ণ ৰূপ",
  [["Read Only Memory", "Read Only Memory"], ["Random Only Memory", "Random Only Memory"], ["Read Open Memory", "Read Open Memory"], ["Rapid Output Memory", "Rapid Output Memory"]], 0,
  "Read only memory is written at manufacture and normally only read. RAM, by contrast, is read and written freely.",
  "Read Only Memory নিৰ্মাণতে লিখা হয় আৰু সাধাৰণতে কেবল পঢ়া হয়। RAM কিন্তু মুক্তভাৱে পঢ়া আৰু লিখা যায়।");

add("computer-014",
  "A computer virus is",
  "কম্পিউটাৰ ভাইৰাছ হ'ল",
  [["a program that copies itself and damages files", "এটা প্ৰগ্ৰাম যি নিজকে নকল কৰি ফাইল নষ্ট কৰে"], ["a fault in the monitor", "মনিটৰৰ ত্ৰুটি"], ["a type of hardware", "এবিধ হাৰ্ডৱেৰ"], ["a cooling fan", "এটা শীতলক ফেন"]], 0,
  "A virus is executable code that attaches itself to files and spreads. It is software, not a physical fault.",
  "ভাইৰাছ হ'ল চলনশীল ক'ড যি ফাইলত লাগি বিয়পে। ই ছফ্টৱেৰ, শাৰীৰিক ত্ৰুটি নহয়।");

add("computer-015",
  "The device that converts hard copy into digital form is a",
  "কঠিন কপিক ডিজিটেল ৰূপলৈ সলনি কৰা সজুলিটো",
  [["scanner", "স্কেনাৰ"], ["plotter", "প্লটাৰ"], ["printer", "প্ৰিণ্টাৰ"], ["speaker", "স্পীকাৰ"]], 0,
  "A scanner reads a printed page and stores it as an image. Printers and plotters go the other way, from digital to paper.",
  "স্কেনাৰে ছপা পৃষ্ঠা পঢ়ি ছবি হিচাপে ৰাখে। প্ৰিণ্টাৰ আৰু প্লটাৰে ওলোটা কৰে, ডিজিটেলৰপৰা কাগজলৈ।");

add("computer-016",
  "Which of the following is an example of a non-volatile memory?",
  "তলৰ কোনটো অস্থিৰ নোহোৱা স্মৃতিৰ উদাহৰণ",
  [["flash memory", "ফ্লেশ্ব স্মৃতি"], ["DRAM", "DRAM"], ["SRAM", "SRAM"], ["register", "ৰেজিষ্টাৰ"]], 0,
  "Flash memory keeps its data without power, which is why pen drives and memory cards work. DRAM, SRAM and registers all lose data.",
  "ফ্লেশ্ব স্মৃতি বিদ্যুৎ নোহোৱাকৈও তথ্য ৰাখে, সেয়ে পেন ড্ৰাইভ আৰু মেম'ৰি কাৰ্ড চলে। DRAM, SRAM আৰু ৰেজিষ্টাৰে তথ্য হেৰুৱায়।");

add("computer-017",
  "The process of starting a computer and loading the operating system is called",
  "কম্পিউটাৰ আৰম্ভ কৰি অপাৰেটিং চিষ্টেম লোড কৰা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["booting", "বুটিং"], ["browsing", "ব্ৰাউজিং"], ["batching", "বেটচিং"], ["buffering", "বাফাৰিং"]], 0,
  "Booting runs the firmware, tests the hardware and hands control to the operating system. Browsing is reading web pages.",
  "বুটিঙে ফাৰ্মৱেৰ চলায়, হাৰ্ডৱেৰ পৰীক্ষা কৰি নিয়ন্ত্ৰণ অপাৰেটিং চিষ্টেমলৈ দিয়ে। ব্ৰাউজিঙে ৱেব পৃষ্ঠা পঢ়ে।");

add("computer-018",
  "The number of bits a processor can handle at one time is its",
  "প্ৰচেছৰে এসময়ত কিমান বিট চম্ভালিব পাৰে সেয়া তাৰ",
  [["word length", "শব্দ দৈৰ্ঘ্য"], ["clock speed", "ঘড়ীৰ গতি"], ["bus width only", "কেৱল বাছ প্ৰস্থ"], ["cache size", "কেশ্ব আকাৰ"]], 0,
  "Word length describes how many bits move together through the processor, as in a 32-bit or 64-bit machine. Clock speed is cycles per second.",
  "শব্দ দৈৰ্ঘ্যই প্ৰচেছৰৰ মাজেৰে একেলগে যোৱা বিটৰ সংখ্যা বুজায়, যেনে ৩২-বিট বা ৬৪-বিট। ঘড়ীৰ গতি প্ৰতি ছেকেণ্ডত চক্ৰ।");

add("computer-019",
  "Which of the following stores the largest amount of data?",
  "তলৰ কোনটোত আটাই বেছি তথ্য ৰখা যায়",
  [["terabyte", "টাৰাবাইট"], ["megabyte", "মেগাবাইট"], ["gigabyte", "গিগাবাইট"], ["kilobyte", "কিল'বাইট"]], 0,
  "A terabyte is about a thousand gigabytes, so it is the largest of these. The order from small to large is kilo, mega, giga, tera.",
  "এক টাৰাবাইট প্ৰায় এহাজাৰ গিগাবাইট, সেয়ে ইহঁতৰ ভিতৰত আটাই ডাঙৰ। সৰুৰপৰা ডাঙৰলৈ ক্ৰম কিল', মেগা, গিগা, টেৰা।");

add("computer-020",
  "An example of an input device that reads marks on an answer sheet is an",
  "উত্তৰপত্ৰৰ দাগ পঢ়া ইনপুট সজুলি এটাৰ উদাহৰণ",
  [["OMR", "OMR"], ["OCR", "OCR"], ["MICR", "MICR"], ["LCD", "LCD"]], 0,
  "Optical mark recognition senses darkened bubbles, which is how objective tests are scored. OCR reads printed characters and MICR reads cheque codes.",
  "OMR এ ক'লা কৰা বৃত্ত চিনি লয়, সেয়ে বস্তুনিষ্ঠ পৰীক্ষা জোখা হয়। OCR এ ছপা আখৰ আৰু MICR এ চেকৰ ক'ড পঢ়ে।");

add("computer-021",
  "The unit that coordinates and controls all parts of a computer is the",
  "কম্পিউটাৰৰ সকলো অংশ সমন্বয় আৰু নিয়ন্ত্ৰণ কৰা ইউনিটটো",
  [["control unit", "নিয়ন্ত্ৰণ ইউনিট"], ["arithmetic logic unit", "অংকীয় যুক্তি ইউনিট"], ["memory unit", "স্মৃতি ইউনিট"], ["output unit", "আউটপুট ইউনিট"]], 0,
  "The control unit reads each instruction and signals the other units in the right order. The ALU only does the arithmetic itself.",
  "নিয়ন্ত্ৰণ ইউনিটে প্ৰতিটো নিৰ্দেশ পঢ়ি শুদ্ধ ক্ৰমত আন ইউনিটলৈ সংকেত দিয়ে। ALU এ কেবল অংক কৰে।");

add("computer-022",
  "Which of the following is a high level language?",
  "তলৰ কোনটো উচ্চস্তৰীয় ভাষা",
  [["Python", "পাইথন"], ["assembly language", "এচেম্বলি ভাষা"], ["machine language", "যন্ত্ৰ ভাষা"], ["microcode", "মাইক্ৰ'ক'ড"]], 0,
  "Python reads close to English and needs a compiler or interpreter. Assembly and machine language are tied to the processor itself.",
  "পাইথন ইংৰাজীৰ ওচৰত আৰু কম্পাইলাৰ বা ইন্টাৰপ্ৰেটৰ লাগে। এচেম্বলি আৰু যন্ত্ৰ ভাষা প্ৰচেছৰৰ সৈতে বন্ধা।");

add("computer-023",
  "The main circuit board of a computer is called the",
  "কম্পিউটাৰৰ মূল বৰ্তনী পট্টিক কি বোলা হয়",
  [["motherboard", "মাদাৰব'ৰ্ড"], ["daughterboard", "ডটাৰব'ৰ্ড"], ["expansion card", "বিস্তাৰণ কাৰ্ড"], ["heat sink", "হিট ছিংক"]], 0,
  "The motherboard carries the processor, memory slots and expansion connectors. A heat sink only cools the processor.",
  "মাদাৰব'ৰ্ডে প্ৰচেছৰ, স্মৃতি স্লট আৰু বিস্তাৰণ সংযোগক ধৰি ৰাখে। হিট ছিংকে কেবল প্ৰচেছৰ শীতল কৰে।");

add("computer-024",
  "Which of the following is an example of an operating system?",
  "তলৰ কোনটো অপাৰেটিং চিষ্টেমৰ উদাহৰণ",
  [["Linux", "লিনাক্স"], ["Oracle", "অৰাকল"], ["Photoshop", "ফট'শ্বপ"], ["Excel", "এক্সেল"]], 0,
  "Linux is a full operating system. Oracle is a database, Photoshop an image editor and Excel a spreadsheet.",
  "লিনাক্স সম্পূৰ্ণ অপাৰেটিং চিষ্টেম। অৰাকল ডাটাবেছ, ফট'শ্বপ ছবি এডিটৰ আৰু এক্সেল স্প্ৰেডশ্বীট।");

add("computer-025",
  "One megabyte is equal to",
  "এক মেগাবাইট কিৰ সমান",
  [["1024 kilobytes", "১০২৪ কিল'বাইট"], ["1024 bytes", "১০২৪ বাইট"], ["1000 kilobytes", "১০০০ কিল'বাইট"], ["1024 gigabytes", "১০২৪ গিগাবাইট"]], 0,
  "Each step in memory is a factor of 1024, so a megabyte is 1024 kilobytes. A gigabyte would be 1024 megabytes.",
  "স্মৃতিৰ প্ৰতিটো খোজ ১০২৪ গুণ, সেয়ে এক মেগাবাইট = ১০২৪ কিল'বাইট। এক গিগাবাইট ১০২৪ মেগাবাইট হ'ব।");

add("computer-026",
  "The first computer programmer is generally regarded as",
  "প্ৰথম কম্পিউটাৰ প্ৰগ্ৰামাৰ হিচাপে সাধাৰণতে কাক গণ্য কৰা হয়",
  [["Ada Lovelace", "এডা লাভলেছ"], ["Charles Babbage", "চাৰ্লছ বেবেজ"], ["Alan Turing", "এলান টিউৰিং"], ["John von Neumann", "জন ফন নিউমেন"]], 0,
  "Ada Lovelace wrote the algorithm for Babbage's analytical engine, so she is called the first programmer. Babbage designed the machine itself.",
  "এডা লাভলেছে বেবেজৰ বিশ্লেষণী যন্ত্ৰৰ বাবে এলগৰিদম লিখিছিল, সেয়ে তেওঁক প্ৰথম প্ৰগ্ৰামাৰ বোলা হয়। বেবেজে যন্ত্ৰটো সাজিছিল।");

add("computer-027",
  "Which of the following is a temporary storage area used to speed up data transfer?",
  "তথ্য সঞ্চাৰণ দ্ৰুত কৰিবলৈ ব্যৱহৃত অস্থায়ী সঞ্চয় স্থানটো",
  [["buffer", "বাফাৰ"], ["register", "ৰেজিষ্টাৰ"], ["ROM", "ROM"], ["firmware", "ফাৰ্মৱেৰ"]], 0,
  "A buffer holds data briefly while a slow device catches up, as in printing. A register is inside the processor itself.",
  "বাফাৰে ধীৰ সজুলি আগবাঢ়োঁতে অলপ সময় তথ্য ৰাখে, যেনে প্ৰিণ্টত। ৰেজিষ্টাৰ প্ৰচেছৰৰ ভিতৰত থাকে।");

add("computer-028",
  "The abbreviation GUI stands for",
  "GUI ৰ সম্পূৰ্ণ ৰূপ",
  [["Graphical User Interface", "Graphical User Interface"], ["General User Input", "General User Input"], ["Graphic Unit Interface", "Graphic Unit Interface"], ["Guided User Interaction", "Guided User Interaction"]], 0,
  "A graphical user interface lets you work with windows, icons and a pointer instead of typed commands.",
  "Graphical User Interface এ আদেশ টাইপ নকৰি উইণ্ড', আইকন আৰু পইণ্টাৰেৰে কাম কৰিব দিয়ে।");

add("computer-029",
  "Which of the following is the smallest unit of data?",
  "তলৰ কোনটো তথ্যৰ আটাই সৰু একক",
  [["bit", "বিট"], ["byte", "বাইট"], ["nibble", "নিবল"], ["word", "শব্দ"]], 0,
  "A bit is a single binary digit, zero or one. A nibble is four bits and a byte is eight.",
  "বিট এটা অকলশৰীয়া দ্বিমিক অংক, শূন্য বা এক। নিবল চাৰি বিট আৰু বাইট আঠ।");

add("computer-030",
  "The software that is permanently written into a hardware device is called",
  "হাৰ্ডৱেৰ সজুলিত স্থায়ীভাৱে লিখা ছফ্টৱেৰক কি বোলা হয়",
  [["firmware", "ফাৰ্মৱেৰ"], ["shareware", "শ্বেয়াৰৱেৰ"], ["freeware", "ফ্ৰীৱেৰ"], ["middleware", "মিডলৱেৰ"]], 0,
  "Firmware sits in ROM on the device and runs it, as in a printer or a router. Shareware and freeware describe licensing, not location.",
  "ফাৰ্মৱেৰ সজুলিৰ ROM ত থাকে আৰু তাক চলায়, যেনে প্ৰিণ্টাৰ বা ৰাউটাৰ। শ্বেয়াৰৱেৰ আৰু ফ্ৰীৱেৰে অনুজ্ঞাপত্ৰ বুজায়, অৱস্থান নহয়।");

/* ================= hardware-software ================= */
useLeaf("hardware-software");

add("computer-031",
  "Which of the following is a volatile component of a computer?",
  "তলৰ কোনটো কম্পিউটাৰৰ অস্থিৰ অংশ",
  [["RAM module", "RAM মডিউল"], ["hard disk", "হাৰ্ড ডিস্ক"], ["DVD", "ডিভিডি"], ["BIOS chip", "BIOS চিপ"]], 0,
  "A RAM module holds charge that leaks away without power, so it is volatile. Disks and the BIOS chip keep their data.",
  "RAM মডিউলৰ আধান বিদ্যুৎ নোহোৱাকৈ লাহে লাহে যায়, সেয়ে ই অস্থিৰ। ডিস্ক আৰু BIOS চিপে তথ্য ৰাখে।");

add("computer-032",
  "The component that supplies power to all parts of a desktop computer is the",
  "ডেস্কটপ কম্পিউটাৰৰ সকলো অংশলৈ শক্তি যোগান ধৰা অংশটো",
  [["SMPS", "SMPS"], ["CPU", "CPU"], ["GPU", "GPU"], ["NIC", "NIC"]], 0,
  "The switched mode power supply converts mains AC into the low DC voltages the board needs. The CPU only consumes that power.",
  "SMPS এ মেইন AC ক বৰ্তনীৰ প্ৰয়োজনীয় কম DC ভল্টেজলৈ সলায়। CPU এ কেবল সেই শক্তি খৰচ কৰে।");

add("computer-033",
  "Which of the following is application software?",
  "তলৰ কোনটো এপ্লিকেশ্যন ছফ্টৱেৰ",
  [["a payroll package", "এটা পেৰ'ল পেকেজ"], ["device driver", "ডিভাইচ ড্ৰাইভাৰ"], ["linker", "লিংকাৰ"], ["firmware", "ফাৰ্মৱেৰ"]], 0,
  "A payroll package does a user's work, so it is application software. Drivers, linkers and firmware serve the machine itself.",
  "পেৰ'ল পেকেজে ব্যৱহাৰকাৰীৰ কাম কৰে, সেয়ে ই এপ্লিকেশ্যন ছফ্টৱেৰ। ড্ৰাইভাৰ, লিংকাৰ আৰু ফাৰ্মৱেৰে যন্ত্ৰটোক সহায় কৰে।");

add("computer-034",
  "A ROM chip that can be erased and rewritten using ultraviolet light is",
  "অতি-বেঙুনীয়া পোহৰেৰে মচি পুনৰ লিখিব পৰা ROM চিপ",
  [["EPROM", "EPROM"], ["PROM", "PROM"], ["DRAM", "DRAM"], ["SRAM", "SRAM"]], 0,
  "Erasable programmable ROM clears under ultraviolet light. PROM can be written only once and cannot be erased.",
  "EPROM অতি-বেঙুনীয়া পোহৰত মচি যায়। PROM কেবল এবাৰ লিখা যায় আৰু মচিব নোৱাৰি।");

add("computer-035",
  "Which port is commonly used to connect a monitor?",
  "মনিটৰ সংযোগ কৰিবলৈ সাধাৰণতে কোন প'ৰ্ট ব্যৱহৃত হয়",
  [["HDMI", "HDMI"], ["RJ-45", "RJ-45"], ["USB-A", "USB-A"], ["PS/2", "PS/2"]], 0,
  "HDMI carries digital video and audio to a display. RJ-45 is for network cable and PS/2 for old keyboards.",
  "HDMI এ ডিজিটেল ভিডিঅ' আৰু অডিঅ' ডিচপ্লেলৈ নিয়ে। RJ-45 নেটৱৰ্ক কেবলৰ আৰু PS/2 পুৰণি কীবৰ্ডৰ।");

add("computer-036",
  "The set of instructions that tells the hardware what to do is called",
  "হাৰ্ডৱেৰক কি কৰিব লাগে কোৱা নিৰ্দেশৰ সমষ্টিক কি বোলা হয়",
  [["software", "ছফ্টৱেৰ"], ["firmware only", "কেৱল ফাৰ্মৱেৰ"], ["hardware", "হাৰ্ডৱেৰ"], ["peripheral", "পেৰিফেৰেল"]], 0,
  "Software is the general term for programs and the data they work on. Hardware is the physical equipment itself.",
  "ছফ্টৱেৰ প্ৰগ্ৰাম আৰু তাৰ তথ্যৰ সাধাৰণ নাম। হাৰ্ডৱেৰ শাৰীৰিক সজুলি।");

add("computer-037",
  "Which of the following is a pointing device?",
  "তলৰ কোনটো নিৰ্দেশক সজুলি",
  [["trackball", "ট্ৰেকবল"], ["plotter", "প্লটাৰ"], ["speaker", "স্পীকাৰ"], ["projector", "প্ৰজেক্টৰ"]], 0,
  "A trackball moves a pointer on screen by rolling a ball, so it points. The rest produce output.",
  "ট্ৰেকবলে বল ঘূৰাই পৰ্দাত পইণ্টাৰ লৰায়, সেয়ে ই নিৰ্দেশ কৰে। বাকীবোৰে আউটপুট দিয়ে।");

add("computer-038",
  "The firmware that starts a computer and tests the hardware is the",
  "কম্পিউটাৰ আৰম্ভ কৰি হাৰ্ডৱেৰ পৰীক্ষা কৰা ফাৰ্মৱেৰটো",
  [["BIOS", "BIOS"], ["driver", "ড্ৰাইভাৰ"], ["kernel", "কাৰ্নেল"], ["shell", "শ্বেল"]], 0,
  "The basic input output system runs a power-on self test and then loads the boot loader. The kernel comes later, inside the operating system.",
  "BIOS এ আৰম্ভণিৰ স্ব-পৰীক্ষা চলাই তাৰ পিছত বুট লোডাৰ লোড কৰে। কাৰ্নেল পিছত, অপাৰেটিং চিষ্টেমৰ ভিতৰত আহে।");

add("computer-039",
  "Which of the following is an example of a solid state storage device?",
  "তলৰ কোনটো কঠিন অৱস্থা সঞ্চয় সজুলিৰ উদাহৰণ",
  [["SSD", "SSD"], ["HDD", "HDD"], ["CD-ROM", "CD-ROM"], ["floppy disk", "ফ্লপি ডিস্ক"]], 0,
  "A solid state drive stores data in flash chips with no moving parts. A hard disk spins magnetic platters.",
  "SSD এ চলন্ত অংশ নথকা ফ্লেশ্ব চিপত তথ্য ৰাখে। হাৰ্ড ডিস্কে চুম্বকীয় প্লেটাৰ ঘূৰায়।");

add("computer-040",
  "A program that translates the whole source code at once before running is a",
  "চলোৱাৰ আগতে গোটেই উৎস ক'ড একেলগে অনুবাদ কৰা প্ৰগ্ৰামটো",
  [["compiler", "কম্পাইলাৰ"], ["interpreter", "ইন্টাৰপ্ৰেটৰ"], ["assembler", "এচেম্বলাৰ"], ["linker", "লিংকাৰ"]], 0,
  "A compiler produces an executable file in one pass. An interpreter translates and runs line by line.",
  "কম্পাইলাৰে এবাৰতে চলনশীল ফাইল বনায়। ইন্টাৰপ্ৰেটৰে শাৰী শাৰী অনুবাদ কৰি চলে।");

add("computer-041",
  "Which of the following is used to connect a computer to a local network by cable?",
  "কেবলেৰে কম্পিউটাৰ স্থানীয় নেটৱৰ্কত সংযোগ কৰিবলৈ কোনটো ব্যৱহৃত হয়",
  [["Ethernet card", "ইথাৰনেট কাৰ্ড"], ["sound card", "ছাউণ্ড কাৰ্ড"], ["graphics card", "গ্ৰাফিক্স কাৰ্ড"], ["TV tuner card", "TV টিউনাৰ কাৰ্ড"]], 0,
  "A network interface card provides the RJ-45 socket and handles packet traffic. Sound and graphics cards do entirely different jobs.",
  "নেটৱৰ্ক ইন্টাৰফেচ কাৰ্ডে RJ-45 ছকেট দিয়ে আৰু পেকেট চলায়। ছাউণ্ড আৰু গ্ৰাফিক্স কাৰ্ডে সম্পূৰ্ণ বেলেগ কাম কৰে।");

add("computer-042",
  "The difference between hardware and software is that hardware is",
  "হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ পাৰ্থক্য হ'ল হাৰ্ডৱেৰ",
  [["physical and can be touched", "শাৰীৰিক আৰু স্পৰ্শ কৰিব পৰা"], ["written in a high level language", "উচ্চস্তৰীয় ভাষাত লিখা"], ["stored only on disk", "কেৱল ডিস্কত ৰখা"], ["always free of cost", "সদায় বিনামূলীয়া"]], 0,
  "Hardware is the tangible equipment, while software is the intangible set of instructions. Software has no physical form.",
  "হাৰ্ডৱেৰ স্পৰ্শযোগ্য সজুলি, ছফ্টৱেৰ অস্পৰ্শযোগ্য নিৰ্দেশৰ সমষ্টি। ছফ্টৱেৰৰ শাৰীৰিক ৰূপ নাই।");

add("computer-043",
  "Which of the following memories is read and written by the processor during execution?",
  "কাৰ্যকৰণৰ সময়ত প্ৰচেছৰে কোন স্মৃতি পঢ়ে আৰু লিখে",
  [["main memory", "মূল স্মৃতি"], ["ROM", "ROM"], ["cache only", "কেৱল কেশ্ব"], ["BIOS", "BIOS"]], 0,
  "Programs and working data sit in main memory while they run, so the processor reads and writes it constantly.",
  "চলি থকা অৱস্থাত প্ৰগ্ৰাম আৰু কামৰ তথ্য মূল স্মৃতিত থাকে, সেয়ে প্ৰচেছৰে ইয়াক নিৰন্তৰ পঢ়ে আৰু লিখে।");

add("computer-044",
  "A device driver is",
  "ডিভাইচ ড্ৰাইভাৰ হ'ল",
  [["software that lets the operating system use a device", "ছফ্টৱেৰ যি অপাৰেটিং চিষ্টেমক সজুলি ব্যৱহাৰ কৰিব দিয়ে"], ["a cable joining two computers", "দুটা কম্পিউটাৰ জোড়া কেবল"], ["a chip on the motherboard", "মাদাৰব'ৰ্ডৰ চিপ"], ["a type of printer", "এবিধ প্ৰিণ্টাৰ"]], 0,
  "The driver translates the operating system's general requests into the specific commands a device understands.",
  "ড্ৰাইভাৰে অপাৰেটিং চিষ্টেমৰ সাধাৰণ অনুৰোধ সজুলিয়ে বুজা নিৰ্দিষ্ট আদেশলৈ সলায়।");

add("computer-045",
  "Which of the following is a utility program?",
  "তলৰ কোনটো ইউটিলিটি প্ৰগ্ৰাম",
  [["antivirus scanner", "এণ্টিভাইৰাছ স্কেনাৰ"], ["word processor", "শব্দ প্ৰচেছৰ"], ["presentation tool", "প্ৰেজেণ্টেশ্যন সজুলি"], ["web browser", "ৱেব ব্ৰাউজাৰ"]], 0,
  "Utility programs maintain the system, and an antivirus scanner protects files. Word processors and browsers do user work.",
  "ইউটিলিটি প্ৰগ্ৰামে চিষ্টেম ৰক্ষণাবেক্ষণ কৰে, আৰু এণ্টিভাইৰাছে ফাইল সুৰক্ষা দিয়ে। শব্দ প্ৰচেছৰ আৰু ব্ৰাউজাৰে ব্যৱহাৰকাৰীৰ কাম কৰে।");

add("computer-046",
  "The number of bits moved along the data bus at one time is called the bus",
  "তথ্য বাছে এসময়ত কঢ়িয়া যোৱা বিটৰ সংখ্যাক কি বোলা হয়",
  [["width", "প্ৰস্থ"], ["speed", "গতি"], ["clock", "ঘড়ী"], ["cache", "কেশ্ব"]], 0,
  "Bus width counts the parallel lines, so a 64-bit bus carries 64 bits together. Speed is how often it does so.",
  "বাছ প্ৰস্থই সমান্তৰাল ৰেখাৰ সংখ্যা গণে, সেয়ে ৬৪-বিট বাছে একেলগে ৬৪ বিট নিয়ে। গতিয়ে কিমান সঘন কৰে সেয়া বুজায়।");

add("computer-047",
  "Which of the following is an example of free and open source software?",
  "তলৰ কোনটো মুক্ত আৰু উন্মুক্ত উৎস ছফ্টৱেৰৰ উদাহৰণ",
  [["LibreOffice", "লিব্ৰে অফিচ"], ["Microsoft Word", "মাইক্ৰ'ছফ্ট ৱৰ্ড"], ["Adobe Photoshop", "এড'বি ফট'শ্বপ"], ["Windows 11", "উইণ্ড'জ ১১"]], 0,
  "LibreOffice publishes its source code and may be used and modified freely. The others are proprietary.",
  "লিব্ৰে অফিচে নিজৰ উৎস ক'ড প্ৰকাশ কৰে আৰু মুক্তভাৱে ব্যৱহাৰ তথা সলনি কৰিব পাৰি। বাকীবোৰ মালিকানাধীন।");

add("computer-048",
  "The main function of an expansion slot is to",
  "বিস্তাৰণ স্লটৰ মূল কাম হ'ল",
  [["hold add-on cards such as graphics or network cards", "গ্ৰাফিক্স বা নেটৱৰ্ক কাৰ্ডৰ দৰে অতিৰিক্ত কাৰ্ড ধৰি ৰখা"], ["store the operating system", "অপাৰেটিং চিষ্টেম ৰখা"], ["cool the processor", "প্ৰচেছৰ শীতল কৰা"], ["supply mains power", "মেইন শক্তি যোগান ধৰা"]], 0,
  "Expansion slots let you add capability the board did not ship with. Storage and cooling are handled elsewhere.",
  "বিস্তাৰণ স্লটে বৰ্তনীত নথকা ক্ষমতা যোগ কৰিব দিয়ে। সঞ্চয় আৰু শীতল কৰা আন ঠাইত হয়।");

add("computer-049",
  "Which of the following is a characteristic of a hard disk?",
  "তলৰ কোনটো হাৰ্ড ডিস্কৰ বৈশিষ্ট্য",
  [["it stores data magnetically on spinning platters", "ই ঘূৰ্ণনশীল প্লেটাৰত চুম্বকীয়ভাৱে তথ্য ৰাখে"], ["it has no moving parts", "ইয়াৰ চলন্ত অংশ নাই"], ["it is volatile", "ই অস্থিৰ"], ["it holds only the operating system", "ই কেবল অপাৰেটিং চিষ্টেম ৰাখে"]], 0,
  "A hard disk writes magnetically to platters that spin under a read-write head. Solid state drives are the ones with no moving parts.",
  "হাৰ্ড ডিস্কে পঢ়া-লিখা মূৰৰ তলত ঘূৰা প্লেটাৰত চুম্বকীয়ভাৱে লিখে। SSD হ'ল চলন্ত অংশ নথকা।");

add("computer-050",
  "An assembler converts",
  "এচেম্বলাৰে সলনি কৰে",
  [["assembly language into machine code", "এচেম্বলি ভাষা যন্ত্ৰ ক'ডলৈ"], ["machine code into assembly language", "যন্ত্ৰ ক'ড এচেম্বলি ভাষালৈ"], ["high level code into assembly language", "উচ্চস্তৰীয় ক'ড এচেম্বলি ভাষালৈ"], ["source code into object code directly", "উৎস ক'ড পোনপটীয়াকৈ অবজেক্ট ক'ডলৈ"]], 0,
  "An assembler translates mnemonics one for one into machine instructions. Compilers handle high level languages instead.",
  "এচেম্বলাৰে নেম'নিক একৰ বাবে এক যন্ত্ৰ নিৰ্দেশলৈ সলায়। কম্পাইলাৰে উচ্চস্তৰীয় ভাষা চম্ভালে।");

add("computer-051",
  "Which of the following is used for permanent internal storage of programs and data?",
  "প্ৰগ্ৰাম আৰু তথ্যৰ স্থায়ী আভ্যন্তৰীণ সঞ্চয়লৈ তলৰ কোনটো ব্যৱহৃত হয়",
  [["hard disk drive", "হাৰ্ড ডিস্ক ড্ৰাইভ"], ["RAM", "RAM"], ["cache", "কেশ্ব"], ["register", "ৰেজিষ্টাৰ"]], 0,
  "The hard disk keeps files when the machine is off. RAM, cache and registers all lose their contents on shutdown.",
  "যন্ত্ৰ বন্ধ থাকিলেও হাৰ্ড ডিস্কে ফাইল ৰাখে। RAM, কেশ্ব আৰু ৰেজিষ্টাৰে বন্ধ কৰিলে তথ্য হেৰুৱায়।");

add("computer-052",
  "The component that converts digital signals to analog for a telephone line is a",
  "টেলিফোন লাইনলৈ ডিজিটেল সংকেত এনালগলৈ সলনি কৰা অংশটো",
  [["modem", "মডেম"], ["router", "ৰাউটাৰ"], ["switch", "স্বিচ"], ["hub", "হাব"]], 0,
  "A modem modulates and demodulates, which is where its name comes from. Routers and switches stay digital.",
  "মডেমে মডুলেট আৰু ডিমডুলেট কৰে, সেয়ে এই নাম। ৰাউটাৰ আৰু স্বিচ ডিজিটেলেই থাকে।");

add("computer-053",
  "Which of the following is not an operating system function?",
  "তলৰ কোনটো অপাৰেটিং চিষ্টেমৰ কাম নহয়",
  [["designing a poster", "প'ষ্টাৰ ডিজাইন কৰা"], ["managing files", "ফাইল চলোৱা"], ["allocating memory", "স্মৃতি বিতৰণ কৰা"], ["scheduling processes", "প্ৰক্ৰিয়া সময়সূচী কৰা"]], 0,
  "The operating system manages resources, not content. Designing a poster needs application software such as a drawing package.",
  "অপাৰেটিং চিষ্টেমে সম্পদ চলায়, সমল নহয়। প'ষ্টাৰ ডিজাইন কৰিবলৈ এড্ৰয়িং পেকেজৰ দৰে এপ্লিকেশ্যন লাগে।");

add("computer-054",
  "The term peripheral refers to",
  "পেৰিফেৰেল শব্দই বুজায়",
  [["any device attached to the computer for input, output or storage", "ইনপুট, আউটপুট বা সঞ্চয়ৰ বাবে কম্পিউটাৰত লগোৱা যিকোনো সজুলি"], ["the processor only", "কেৱল প্ৰচেছৰ"], ["the operating system", "অপাৰেটিং চিষ্টেম"], ["the motherboard", "মাদাৰব'ৰ্ড"]], 0,
  "Peripherals sit outside the core processing unit and add capability. The processor and board are the core, not peripherals.",
  "পেৰিফেৰেল মূল প্ৰচেছিং ইউনিটৰ বাহিৰত থাকে আৰু ক্ষমতা যোগ কৰে। প্ৰচেছৰ আৰু বৰ্তনী মূল, পেৰিফেৰেল নহয়।");

add("computer-055",
  "Which of the following best describes cloud storage?",
  "তলৰ কোনটোৱে ক্লাউড সঞ্চয় ভালদৰে বৰ্ণনা কৰে",
  [["files kept on remote servers and reached over the internet", "দূৰৰ ছাৰ্ভাৰত ৰখা ফাইল যি ইণ্টাৰনেটেৰে পোৱা যায়"], ["files kept only on a pen drive", "কেৱল পেন ড্ৰাইভত ৰখা ফাইল"], ["memory inside the processor", "প্ৰচেছৰৰ ভিতৰৰ স্মৃতি"], ["a printed backup", "ছপা বেকআপ"]], 0,
  "Cloud storage puts your data on someone else's servers, so you need a network to reach it. Local drives need no network.",
  "ক্লাউড সঞ্চয়ে আপোনাৰ তথ্য আনৰ ছাৰ্ভাৰত ৰাখে, সেয়ে নেটৱৰ্ক লাগে। স্থানীয় ড্ৰাইভলৈ নেটৱৰ্ক নালাগে।");

add("computer-056",
  "A bug in a program is",
  "প্ৰগ্ৰামত থকা বাগ হ'ল",
  [["an error that causes wrong or unexpected behaviour", "এটা ভুল যি অসত্য বা অপ্ৰত্যাশিত আচৰণ ঘটায়"], ["a virus that spreads between machines", "যন্ত্ৰৰ মাজত বিয়পা ভাইৰাছ"], ["a hardware connector", "হাৰ্ডৱেৰ সংযোগক"], ["a type of file format", "এবিধ ফাইল ফৰ্মেট"]], 0,
  "A bug is a defect in the code itself. A virus is separate malicious software that may exploit such defects.",
  "বাগ ক'ডৰ নিজৰ ত্ৰুটি। ভাইৰাছ বেলেগ ক্ষতিকাৰক ছফ্টৱেৰ যি এনে ত্ৰুটি ব্যৱহাৰ কৰিব পাৰে।");

add("computer-057",
  "Which of the following is the correct order of the data size units from smallest to largest?",
  "তথ্যৰ একক সৰুৰপৰা ডাঙৰলৈ তলৰ কোনটো শুদ্ধ ক্ৰম",
  [["bit, byte, kilobyte, megabyte, gigabyte", "বিট, বাইট, কিল'বাইট, মেগাবাইট, গিগাবাইট"], ["byte, bit, megabyte, kilobyte, gigabyte", "বাইট, বিট, মেগাবাইট, কিল'বাইট, গিগাবাইট"], ["bit, byte, megabyte, kilobyte, gigabyte", "বিট, বাইট, মেগাবাইট, কিল'বাইট, গিগাবাইট"], ["kilobyte, bit, byte, megabyte, gigabyte", "কিল'বাইট, বিট, বাইট, মেগাবাইট, গিগাবাইট"]], 0,
  "Eight bits make a byte, then each step multiplies by 1024 through kilo, mega and giga. Any other order misplaces a unit.",
  "আঠ বিটত এক বাইট, তাৰ পিছত কিল', মেগা, গিগা প্ৰতিটো খোজত ১০২৪ গুণ। আন ক্ৰমত একক ঠাই সলনি হয়।");

add("computer-058",
  "Which of the following is an example of a graphic output device?",
  "তলৰ কোনটো গ্ৰাফিক আউটপুট সজুলিৰ উদাহৰণ",
  [["monitor", "মনিটৰ"], ["keyboard", "কীবৰ্ড"], ["joystick", "জয়ষ্টিক"], ["microphone", "মাইক্ৰ'ফোন"]], 0,
  "A monitor displays images and text, so it outputs graphics. The others are all input devices.",
  "মনিটৰে ছবি আৰু লিখা দেখুৱায়, সেয়ে ই গ্ৰাফিক আউটপুট। বাকীবোৰ ইনপুট সজুলি।");

add("computer-059",
  "The main advantage of solid state storage over a hard disk is",
  "হাৰ্ড ডিস্কতকৈ কঠিন অৱস্থা সঞ্চয়ৰ মূল সুবিধা",
  [["faster access with no moving parts", "চলন্ত অংশ নথকা বাবে দ্ৰুত প্ৰৱেশ"], ["much lower cost per gigabyte", "প্ৰতি গিগাবাইটত বহু কম দাম"], ["larger capacity always", "সদায় বেছি ধাৰণক্ষমতা"], ["it needs no power", "ই বিদ্যুৎ নালাগে"]], 0,
  "With no platters to spin up, an SSD answers in microseconds. Hard disks still win on price per gigabyte.",
  "ঘূৰাবলগীয়া প্লেটাৰ নথকা বাবে SSD এ মাইক্ৰ'ছেকেণ্ডত উত্তৰ দিয়ে। দামত হাৰ্ড ডিস্ক এতিয়াও আগত।");

add("computer-060",
  "An operating system that allows more than one user to work at the same time is called",
  "এসময়ত এজনৰ অধিক ব্যৱহাৰকাৰীক কাম কৰিব দিয়া অপাৰেটিং চিষ্টেমক কি বোলা হয়",
  [["multi-user", "বহু-ব্যৱহাৰকাৰী"], ["single-user", "এক-ব্যৱহাৰকাৰী"], ["real-time", "ৰিয়েল-টাইম"], ["embedded", "এম্বেডেড"]], 0,
  "A multi-user system shares the processor among several logged-in users, as a server does. A single-user system serves one.",
  "বহু-ব্যৱহাৰকাৰী চিষ্টেমে কেইবাজন লগইন কৰা ব্যৱহাৰকাৰীৰ মাজত প্ৰচেছৰ ভাগ কৰে, ছাৰ্ভাৰে যেনে কৰে। এক-ব্যৱহাৰকাৰীয়ে এজনক দিয়ে।");

/* ================= ms-office ================= */
useLeaf("ms-office");

add("computer-061",
  "In Microsoft Excel, a file is saved with the extension",
  "মাইক্ৰ'ছফ্ট এক্সেলত ফাইল কি এক্সটেনশ্বনেৰে সঞ্চয় হয়",
  [[".xlsx", ".xlsx"], [".docx", ".docx"], [".pptx", ".pptx"], [".mdb", ".mdb"]], 0,
  "Excel workbooks use xlsx. Word documents use docx and PowerPoint shows use pptx.",
  "এক্সেল কৰ্কবুক .xlsx ব্যৱহাৰ কৰে। ৱৰ্ড ডকুমেণ্ট .docx আৰু পাৱাৰপইণ্ট .pptx।");

add("computer-062",
  "The keyboard shortcut to save a document in MS Word is",
  "MS ৱৰ্ডত ডকুমেণ্ট সঞ্চয় কৰাৰ কীবৰ্ড চৰ্টকাট",
  [["Ctrl + S", "Ctrl + S"], ["Ctrl + P", "Ctrl + P"], ["Ctrl + V", "Ctrl + V"], ["Ctrl + X", "Ctrl + X"]], 0,
  "Ctrl + S saves, Ctrl + P prints, Ctrl + V pastes and Ctrl + X cuts. Confusing S with P is the common slip.",
  "Ctrl + S এ সঞ্চয়, Ctrl + P এ প্ৰিণ্ট, Ctrl + V এ পেষ্ট আৰু Ctrl + X এ কাটে। S আৰু P মিলাই পেলোৱা সাধাৰণ ভুল।");

add("computer-063",
  "In MS Excel, the cell reference A1 refers to",
  "MS এক্সেলত A1 কোষ নিৰ্দেশে বুজায়",
  [["column A and row 1", "স্তম্ভ A আৰু শাৰী ১"], ["row A and column 1", "শাৰী A আৰু স্তম্ভ ১"], ["sheet A and cell 1", "শ্বীট A আৰু কোষ ১"], ["range A to 1", "A ৰপৰা 1 লৈ পৰিসৰ"]], 0,
  "Excel names cells by column letter first and row number second, so A1 is the top left cell. Reversing them is the usual error.",
  "এক্সেলে কোষৰ নামত প্ৰথমে স্তম্ভৰ আখৰ আৰু পিছত শাৰীৰ সংখ্যা দিয়ে, সেয়ে A1 ওপৰ বাওঁৰ কোষ। ওলোটা কৰাটো সাধাৰণ ভুল।");

add("computer-064",
  "Which function in MS Excel adds a range of numbers?",
  "MS এক্সেলত সংখ্যাৰ পৰিসৰ যোগ কৰা ফলনটো",
  [["SUM", "SUM"], ["COUNT", "COUNT"], ["AVERAGE", "AVERAGE"], ["MAX", "MAX"]], 0,
  "SUM totals the values. COUNT counts how many there are, AVERAGE gives the mean and MAX the largest.",
  "SUM এ যোগফল দিয়ে। COUNT এ কিমানটা গণে, AVERAGE এ গড় আৰু MAX এ আটাই ডাঙৰ।");

add("computer-065",
  "In MS PowerPoint, the view used to show slides to an audience is",
  "MS পাৱাৰপইণ্টত দৰ্শকক শ্লাইড দেখুৱাবলৈ ব্যৱহৃত ভিউ",
  [["Slide Show", "শ্লাইড শ্ব'"], ["Normal", "নৰ্মেল"], ["Slide Sorter", "শ্লাইড ছৰ্টাৰ"], ["Notes Page", "নোটছ পেজ"]], 0,
  "Slide Show fills the screen and runs the presentation. Slide Sorter only rearranges thumbnails.",
  "শ্লাইড শ্ব'ই পৰ্দা ভৰাই প্ৰেজেণ্টেশ্যন চলায়। শ্লাইড ছৰ্টাৰে কেবল থাম্বনেইল সজায়।");

add("computer-066",
  "The default file extension of a MS Word document is",
  "MS ৱৰ্ড ডকুমেণ্টৰ পূৰ্বনিৰ্ধাৰিত এক্সটেনশ্বন",
  [[".docx", ".docx"], [".txt", ".txt"], [".xls", ".xls"], [".rtf", ".rtf"]], 0,
  "Modern Word saves in docx, the XML based format. Plain text and rich text formats lose most formatting.",
  "আধুনিক ৱৰ্ডে docx ত সঞ্চয় কৰে, যি XML ভিত্তিক। সাধাৰণ লিখা আৰু RTF এ বেছিভাগ ৰূপান্তৰ হেৰুৱায়।");

add("computer-067",
  "Which MS Office program is best suited for preparing a monthly budget table?",
  "মাহিলী বাজেট তালিকা প্ৰস্তুত কৰিবলৈ কোন MS Office প্ৰগ্ৰাম আটাই উপযুক্ত",
  [["Excel", "এক্সেল"], ["Word", "ৱৰ্ড"], ["PowerPoint", "পাৱাৰপইণ্ট"], ["Outlook", "আউটলুক"]], 0,
  "Excel holds figures in cells and recalculates totals automatically, which suits budgets. Word is for prose.",
  "এক্সেলে কোষত সংখ্যা ৰাখি যোগফল নিজে পুনৰ গণে, সেয়ে বাজেটৰ বাবে উপযুক্ত। ৱৰ্ড গদ্যৰ বাবে।");

add("computer-068",
  "In MS Word, the shortcut Ctrl + Z is used to",
  "MS ৱৰ্ডত Ctrl + Z চৰ্টকাট কিৰ বাবে ব্যৱহৃত হয়",
  [["undo the last action", "শেষ কামটো বাতিল কৰিবলৈ"], ["redo the last action", "শেষ কামটো পুনৰ কৰিবলৈ"], ["zoom the page", "পৃষ্ঠা জুম কৰিবলৈ"], ["close the document", "ডকুমেণ্ট বন্ধ কৰিবলৈ"]], 0,
  "Ctrl + Z steps back one action, and Ctrl + Y redoes it. Closing uses Ctrl + W.",
  "Ctrl + Z এ এটা কাম পিছুৱায়, আৰু Ctrl + Y এ পুনৰ কৰে। বন্ধ কৰিবলৈ Ctrl + W।");

add("computer-069",
  "A cell in MS Excel can hold",
  "MS এক্সেলৰ এটা কোষে ৰাখিব পাৰে",
  [["text, numbers or formulas", "লিখা, সংখ্যা বা সূত্ৰ"], ["only numbers", "কেৱল সংখ্যা"], ["only formulas", "কেৱল সূত্ৰ"], ["only text", "কেৱল লিখা"]], 0,
  "A cell takes text, a number or a formula beginning with an equals sign, which is what makes Excel flexible.",
  "কোষে লিখা, সংখ্যা বা সমান চিনেৰে আৰম্ভ হোৱা সূত্ৰ লয়, সেয়ে এক্সেল নমনীয়।");

add("computer-070",
  "In MS PowerPoint, a single page of the presentation is called a",
  "MS পাৱাৰপইণ্টত প্ৰেজেণ্টেশ্যনৰ এটা পৃষ্ঠাক কি বোলা হয়",
  [["slide", "শ্লাইড"], ["sheet", "শ্বীট"], ["page", "পেজ"], ["frame", "ফ্ৰেম"]], 0,
  "PowerPoint calls each page a slide. Excel uses sheets and Word uses pages.",
  "পাৱাৰপইণ্টে প্ৰতিটো পৃষ্ঠাক শ্লাইড বোলে। এক্সেলে শ্বীট আৰু ৱৰ্ডে পেজ ব্যৱহাৰ কৰে।");

add("computer-071",
  "The shortcut Ctrl + C is used to",
  "Ctrl + C চৰ্টকাট কিৰ বাবে ব্যৱহৃত হয়",
  [["copy the selected content", "বাছনি কৰা সমল নকল কৰিবলৈ"], ["cut the selected content", "বাছনি কৰা সমল কাটিবলৈ"], ["paste the copied content", "নকল কৰা সমল পেষ্ট কৰিবলৈ"], ["clear the formatting", "ৰূপান্তৰ মচিবলৈ"]], 0,
  "Ctrl + C copies and leaves the original, while Ctrl + X removes it. Ctrl + V then pastes.",
  "Ctrl + C এ নকল কৰি মূল ৰাখে, Ctrl + X এ আঁতৰায়। তাৰ পিছত Ctrl + V এ পেষ্ট কৰে।");

add("computer-072",
  "In MS Excel, which symbol must a formula begin with?",
  "MS এক্সেলত সূত্ৰ কি চিনেৰে আৰম্ভ হ'ব লাগে",
  [["equals sign", "সমান চিন"], ["plus sign", "যোগ চিন"], ["hash sign", "হেশ চিন"], ["dollar sign", "ডলাৰ চিন"]], 0,
  "Every formula starts with an equals sign, which tells Excel to calculate rather than store text. Without it the entry stays as text.",
  "প্ৰতিটো সূত্ৰ সমান চিনেৰে আৰম্ভ হয়, যিয়ে এক্সেলক লিখা নহয় গণনা কৰিবলৈ কয়। নহ'লে লিখা হিচাপেই থাকে।");

add("computer-073",
  "Which MS Office application is used mainly for email and calendars?",
  "কোন MS Office এপ্লিকেশ্যন মূলতঃ ইমেইল আৰু কেলেণ্ডাৰৰ বাবে ব্যৱহৃত হয়",
  [["Outlook", "আউটলুক"], ["Access", "এক্সেছ"], ["Publisher", "পাব্লিছাৰ"], ["OneNote", "ৱাননোট"]], 0,
  "Outlook handles mail, contacts and scheduling. Access is a database and Publisher makes printed designs.",
  "আউটলুকে মেইল, সম্পৰ্ক আৰু সময়সূচী চম্ভালে। এক্সেছ ডাটাবেছ আৰু পাব্লিছাৰে ছপা ডিজাইন বনায়।");

add("computer-074",
  "In MS Word, the feature that checks spelling and grammar is found under the",
  "MS ৱৰ্ডত বানান আৰু ব্যাকৰণ পৰীক্ষা কৰা সুবিধা ক'ত পোৱা যায়",
  [["Review tab", "ৰিভিউ টেবত"], ["Insert tab", "ইনছাৰ্ট টেবত"], ["Design tab", "ডিজাইন টেবত"], ["View tab", "ভিউ টেবত"]], 0,
  "Spelling and grammar sit in the Review tab along with comments and tracking. Insert handles pictures and tables.",
  "বানান আৰু ব্যাকৰণ ৰিভিউ টেবত, মন্তব্য আৰু ট্ৰেকিঙৰ সৈতে থাকে। ইনছাৰ্টে ছবি আৰু তালিকা চম্ভালে।");

add("computer-075",
  "The MS Excel function that returns the average of a range is",
  "পৰিসৰৰ গড় দিয়া MS এক্সেল ফলনটো",
  [["AVERAGE", "AVERAGE"], ["SUM", "SUM"], ["MEDIAN", "MEDIAN"], ["MODE", "MODE"]], 0,
  "AVERAGE adds the values and divides by the count. MEDIAN gives the middle value and MODE the most frequent.",
  "AVERAGE এ যোগফলক সংখ্যাৰে ভাগ কৰে। MEDIAN এ মাজৰ মান আৰু MODE এ আটাই সঘন মান দিয়ে।");

add("computer-076",
  "A PowerPoint presentation is normally saved with the extension",
  "পাৱাৰপইণ্ট প্ৰেজেণ্টেশ্যন সাধাৰণতে কি এক্সটেনশ্বনত সঞ্চয় হয়",
  [[".pptx", ".pptx"], [".docx", ".docx"], [".xlsx", ".xlsx"], [".pdf", ".pdf"]], 0,
  "Presentations use pptx. PDF is a fixed output format, not the editable source.",
  "প্ৰেজেণ্টেশ্যন .pptx ব্যৱহাৰ কৰে। PDF এটা স্থিৰ আউটপুট, সম্পাদনযোগ্য উৎস নহয়।");

add("computer-077",
  "In MS Excel, the intersection of a row and a column is called a",
  "MS এক্সেলত শাৰী আৰু স্তম্ভৰ ছেদবিন্দুক কি বোলা হয়",
  [["cell", "কোষ"], ["range", "পৰিসৰ"], ["worksheet", "ৱৰ্কশ্বীট"], ["workbook", "ৱৰ্কবুক"]], 0,
  "A cell is one box at the crossing of a row and column. A range is a group of cells and a workbook holds all the sheets.",
  "কোষ শাৰী আৰু স্তম্ভৰ ছেদত থকা এটা বাকচ। পৰিসৰ কোষৰ গোট আৰু ৱৰ্কবুকে সকলো শ্বীট ৰাখে।");

add("computer-078",
  "Which key combination selects all the content in a Word document?",
  "ৱৰ্ড ডকুমেণ্টৰ সকলো সমল বাছনি কৰা কি চাবিৰ সংযোগ",
  [["Ctrl + A", "Ctrl + A"], ["Ctrl + E", "Ctrl + E"], ["Ctrl + D", "Ctrl + D"], ["Ctrl + F", "Ctrl + F"]], 0,
  "Ctrl + A selects all. Ctrl + F opens find and Ctrl + E centres the paragraph.",
  "Ctrl + A এ সকলো বাছনি কৰে। Ctrl + F এ বিচাৰ খোলে আৰু Ctrl + E এ অনুচ্ছেদ কেন্দ্ৰত ৰাখে।");

add("computer-079",
  "In MS Word, mail merge is used to",
  "MS ৱৰ্ডত মেইল মাৰ্জ কিৰ বাবে ব্যৱহৃত হয়",
  [["produce many personalised letters from one template", "এটা আৰ্হিৰপৰা বহু ব্যক্তিগত চিঠি বনাবলৈ"], ["send email without an internet link", "ইণ্টাৰনেট সংযোগ নোহোৱাকৈ ইমেইল পঠিয়াবলৈ"], ["merge two documents into one", "দুটা ডকুমেণ্ট এটালৈ মিলাবলৈ"], ["convert a document into a spreadsheet", "ডকুমেণ্ট স্প্ৰেডশ্বীটলৈ সলনি কৰিবলৈ"]], 0,
  "Mail merge combines a fixed template with a list of names and addresses, so each copy is personalised.",
  "মেইল মাৰ্জে এটা স্থিৰ আৰ্হিক নাম আৰু ঠিকনাৰ তালিকাৰ সৈতে মিলায়, সেয়ে প্ৰতিটো নকল ব্যক্তিগত হয়।");

add("computer-080",
  "In MS Excel, the symbol $ in a cell reference such as $A$1 means the reference is",
  "MS এক্সেলত $A$1 ৰ দৰে কোষ নিৰ্দেশত $ চিনে বুজায় যে নিৰ্দেশটো",
  [["absolute and does not change when copied", "পূৰ্ণ আৰু নকল কৰিলে নসলায়"], ["relative and shifts when copied", "আপেক্ষিক আৰু নকল কৰিলে সলনি হয়"], ["invalid", "অবৈধ"], ["a text entry", "লিখা প্ৰৱিষ্টি"]], 0,
  "The dollar signs lock the column and the row, so copying the formula elsewhere still points at A1. Without them both shift.",
  "ডলাৰ চিনে স্তম্ভ আৰু শাৰী বন্ধ কৰে, সেয়ে সূত্ৰ আন ঠাইত নকল কৰিলেও A1 লৈয়ে দেখুৱায়। নহ'লে দুয়ো সৰি যায়।");

add("computer-081",
  "Which MS Office program is a database management system?",
  "কোন MS Office প্ৰগ্ৰাম এটা ডাটাবেছ ব্যৱস্থাপনা পদ্ধতি",
  [["Access", "এক্সেছ"], ["Excel", "এক্সেল"], ["Word", "ৱৰ্ড"], ["Visio", "ভিজিঅ'"]], 0,
  "Access stores records in tables and lets you query them. Excel holds data in sheets but is not a relational database.",
  "এক্সেছে তালিকাত অভিলেখ ৰাখি প্ৰশ্ন সোধাৰ সুবিধা দিয়ে। এক্সেলে শ্বীটত তথ্য ৰাখে কিন্তু সম্পৰ্কীয় ডাটাবেছ নহয়।");

add("computer-082",
  "The shortcut to print a document is",
  "ডকুমেণ্ট প্ৰিণ্ট কৰাৰ চৰ্টকাট",
  [["Ctrl + P", "Ctrl + P"], ["Ctrl + S", "Ctrl + S"], ["Ctrl + N", "Ctrl + N"], ["Ctrl + O", "Ctrl + O"]], 0,
  "Ctrl + P opens the print dialogue. Ctrl + N makes a new file and Ctrl + O opens an existing one.",
  "Ctrl + P এ প্ৰিণ্ট সংলাপ খোলে। Ctrl + N এ নতুন ফাইল আৰু Ctrl + O এ থকা ফাইল খোলে।");

add("computer-083",
  "In MS PowerPoint, the transition effect is applied to",
  "MS পাৱাৰপইণ্টত ট্ৰেনজিশ্যন প্ৰভাৱ কিৰ ওপৰত প্ৰয়োগ হয়",
  [["the change from one slide to the next", "এটা শ্লাইডৰপৰা পৰৱৰ্তী শ্লাইডলৈ পৰিৱৰ্তনত"], ["the text inside one slide", "এটা শ্লাইডৰ ভিতৰৰ লিখাত"], ["the slide background only", "কেৱল শ্লাইডৰ পৃষ্ঠভূমিত"], ["the printed handout", "ছপা হেণ্ডআউটত"]], 0,
  "Transitions act between slides, while animations act on objects within a slide. Mixing the two is a common error.",
  "ট্ৰেনজিশ্যন শ্লাইডৰ মাজত ক্ৰিয়া কৰে, এনিমেশ্যনে এটা শ্লাইডৰ ভিতৰৰ বস্তুত। দুয়োটা মিলাই পেলোৱাটো সাধাৰণ ভুল।");

add("computer-084",
  "Which of the following is a spreadsheet formula that would give the largest value in the range A1 to A10?",
  "A1 ৰপৰা A10 পৰিসৰৰ আটাই ডাঙৰ মান দিয়া স্প্ৰেডশ্বীট সূত্ৰটো",
  [["=MAX(A1:A10)", "=MAX(A1:A10)"], ["=MIN(A1:A10)", "=MIN(A1:A10)"], ["=SUM(A1:A10)", "=SUM(A1:A10)"], ["=COUNT(A1:A10)", "=COUNT(A1:A10)"]], 0,
  "MAX returns the largest. MIN gives the smallest, SUM the total and COUNT how many numbers there are.",
  "MAX এ আটাই ডাঙৰ দিয়ে। MIN এ আটাই সৰু, SUM এ যোগফল আৰু COUNT এ সংখ্যা কিমানটা।");

add("computer-085",
  "In MS Word, the header appears",
  "MS ৱৰ্ডত হেডাৰ দেখা যায়",
  [["at the top of every page", "প্ৰতিটো পৃষ্ঠাৰ ওপৰত"], ["at the bottom of every page", "প্ৰতিটো পৃষ্ঠাৰ তলত"], ["only on the first page", "কেৱল প্ৰথম পৃষ্ঠাত"], ["inside the footnote area", "পাদটীকাৰ ঠাইত"]], 0,
  "The header repeats at the top of each page and the footer at the bottom, which is how page numbers are added.",
  "হেডাৰ প্ৰতিটো পৃষ্ঠাৰ ওপৰত আৰু ফুটাৰ তলত পুনৰায় আহে, সেয়ে পৃষ্ঠা সংখ্যা দিয়া হয়।");

add("computer-086",
  "The MS Excel feature that displays only the rows matching a condition is",
  "শৰ্ত পূৰণ কৰা শাৰীবোৰ কেবল দেখুওৱা MS এক্সেল সুবিধাটো",
  [["filter", "ফিল্টাৰ"], ["sort", "ছৰ্ট"], ["freeze panes", "ফ্ৰীজ পেন"], ["merge cells", "মাৰ্জ ছেল"]], 0,
  "Filtering hides rows that do not match, while sorting reorders all rows. Freezing panes only fixes headings on screen.",
  "ফিল্টাৰে নমিলা শাৰী লুকুৱায়, ছৰ্টে সকলো শাৰী সজায়। ফ্ৰীজ পেনে কেবল শিৰোনামা পৰ্দাত স্থিৰ ৰাখে।");

add("computer-087",
  "Which of the following is the correct way to start a new line inside the same paragraph in MS Word?",
  "MS ৱৰ্ডত একেই অনুচ্ছেদৰ ভিতৰত নতুন শাৰী আৰম্ভ কৰাৰ শুদ্ধ উপায়",
  [["Shift + Enter", "Shift + Enter"], ["Enter", "Enter"], ["Ctrl + Enter", "Ctrl + Enter"], ["Alt + Enter", "Alt + Enter"]], 0,
  "Shift + Enter inserts a line break without ending the paragraph. Enter alone starts a new paragraph.",
  "Shift + Enter এ অনুচ্ছেদ নটুটি নতুন শাৰী দিয়ে। অকলৈ Enter এ নতুন অনুচ্ছেদ আৰম্ভ কৰে।");

add("computer-088",
  "In MS PowerPoint, the notes pane is used to",
  "MS পাৱাৰপইণ্টত নোটছ পেন কিৰ বাবে ব্যৱহৃত হয়",
  [["write speaker notes not shown to the audience", "দৰ্শকক নেদেখুৱা বক্তাৰ টোকা লিখিবলৈ"], ["add animation to objects", "বস্তুত এনিমেশ্যন যোগ কৰিবলৈ"], ["change the slide size", "শ্লাইডৰ আকাৰ সলাবলৈ"], ["insert a chart", "চাৰ্ট সুমুৱাবলৈ"]], 0,
  "Notes stay with the slide but appear only in presenter view or printed notes, so they help the speaker.",
  "টোকা শ্লাইডৰ সৈতে থাকে কিন্তু কেবল প্ৰেজেণ্টাৰ ভিউ বা ছপা টোকাত ওলায়, সেয়ে বক্তাক সহায় কৰে।");

add("computer-089",
  "Which MS Office tool would you use to create a formal invitation card?",
  "আনুষ্ঠানিক নিমন্ত্ৰণ পত্ৰ বনাবলৈ কোন MS Office সজুলি ব্যৱহাৰ কৰিব",
  [["Publisher", "পাব্লিছাৰ"], ["Excel", "এক্সেল"], ["Access", "এক্সেছ"], ["Outlook", "আউটলুক"]], 0,
  "Publisher is built for page layout and print design. Excel and Access handle numbers and records.",
  "পাব্লিছাৰ পৃষ্ঠা সজ্জা আৰু ছপা ডিজাইনৰ বাবে বনোৱা। এক্সেল আৰু এক্সেছে সংখ্যা আৰু অভিলেখ চম্ভালে।");

add("computer-090",
  "In MS Word, pressing Ctrl + E will",
  "MS ৱৰ্ডত Ctrl + E টিপিলে",
  [["centre the selected paragraph", "বাছনি কৰা অনুচ্ছেদ কেন্দ্ৰত ৰাখে"], ["make the text bold", "লিখা ডাঠ কৰে"], ["exit the program", "প্ৰগ্ৰামৰপৰা ওলায়"], ["open a new window", "নতুন উইণ্ড' খোলে"]], 0,
  "Ctrl + E centres, Ctrl + B bolds and Ctrl + L aligns left. Ctrl + E does not close anything.",
  "Ctrl + E এ কেন্দ্ৰত, Ctrl + B এ ডাঠ আৰু Ctrl + L এ বাওঁফালে ৰাখে। Ctrl + E এ একো বন্ধ নহয়।");

/* ================= networking-internet ================= */
useLeaf("networking-internet");

add("computer-091",
  "A network that covers a single building or campus is called a",
  "এটা অট্টালিকা বা চৌহদ সামৰা নেটৱৰ্কক কি বোলা হয়",
  [["LAN", "LAN"], ["WAN", "WAN"], ["MAN", "MAN"], ["PAN", "PAN"]], 0,
  "A local area network spans one site. A wide area network joins sites across cities or countries.",
  "LAN এ এটা ঠাই সামৰে। WAN এ নগৰ বা দেশজুৰি ঠাই জোড়ে।");

add("computer-092",
  "The full form of URL is",
  "URL ৰ সম্পূৰ্ণ ৰূপ",
  [["Uniform Resource Locator", "Uniform Resource Locator"], ["Universal Reference Link", "Universal Reference Link"], ["Uniform Routing Layer", "Uniform Routing Layer"], ["User Registered Location", "User Registered Location"]], 0,
  "A uniform resource locator is the address that tells a browser where a page lives and how to fetch it.",
  "Uniform Resource Locator হ'ল সেই ঠিকনা যি ব্ৰাউজাৰক পৃষ্ঠা ক'ত আছে আৰু কেনেকৈ আনিব কয়।");

add("computer-093",
  "Which protocol is used to transfer web pages?",
  "ৱেব পৃষ্ঠা সঞ্চাৰ কৰিবলৈ কোন প্ৰট'কল ব্যৱহৃত হয়",
  [["HTTP", "HTTP"], ["FTP", "FTP"], ["SMTP", "SMTP"], ["TCP only", "কেৱল TCP"]], 0,
  "Hypertext transfer protocol carries pages between server and browser. SMTP sends mail and FTP moves files.",
  "HTTP এ ছাৰ্ভাৰ আৰু ব্ৰাউজাৰৰ মাজত পৃষ্ঠা নিয়ে। SMTP এ মেইল পঠিয়ায় আৰু FTP এ ফাইল সৰায়।");

add("computer-094",
  "An IP address of the form 192.168.1.1 belongs to which version?",
  "192.168.1.1 ৰ দৰে IP ঠিকনা কোন সংস্কৰণৰ",
  [["IPv4", "IPv4"], ["IPv6", "IPv6"], ["MAC", "MAC"], ["URL", "URL"]], 0,
  "IPv4 uses four decimal groups of eight bits each. IPv6 uses hexadecimal groups and is much longer.",
  "IPv4 এ আঠ বিটৰ চাৰিটা দশমিক গোট ব্যৱহাৰ কৰে। IPv6 এ হেক্সাডেচিমেল গোট ব্যৱহাৰ কৰি বহু দীঘল।");

add("computer-095",
  "A device that forwards data packets between different networks is a",
  "বেলেগ নেটৱৰ্কৰ মাজত তথ্য পেকেট আগবঢ়োৱা সজুলিটো",
  [["router", "ৰাউটাৰ"], ["hub", "হাব"], ["repeater", "ৰিপিটাৰ"], ["modem", "মডেম"]], 0,
  "A router reads the destination address and chooses the next network. A hub only repeats signals to every port.",
  "ৰাউটাৰে গন্তব্য ঠিকনা পঢ়ি পৰৱৰ্তী নেটৱৰ্ক বাছে। হাবে কেবল প্ৰতিটো প'ৰ্টলৈ সংকেত পুনৰাবৃত্তি কৰে।");

add("computer-096",
  "The full form of WWW is",
  "WWW ৰ সম্পূৰ্ণ ৰূপ",
  [["World Wide Web", "World Wide Web"], ["Wide World Web", "Wide World Web"], ["World Web Wide", "World Web Wide"], ["Web World Wide", "Web World Wide"]], 0,
  "The world wide web is the collection of linked pages served over the internet. The internet itself is the underlying network.",
  "World Wide Web ইণ্টাৰনেটৰ ওপৰত দিয়া জড়িত পৃষ্ঠাৰ সমষ্টি। ইণ্টাৰনেট নিজেই তলৰ নেটৱৰ্ক।");

add("computer-097",
  "Which of the following is a search engine?",
  "তলৰ কোনটো সন্ধান ইঞ্জিন",
  [["Google", "গুগল"], ["Chrome", "ক্ৰম"], ["Firefox", "ফায়াৰফক্স"], ["Windows", "উইণ্ড'জ"]], 0,
  "Google indexes pages and answers queries. Chrome and Firefox are browsers that display the results.",
  "গুগলে পৃষ্ঠা সূচীবদ্ধ কৰি প্ৰশ্নৰ উত্তৰ দিয়ে। ক্ৰম আৰু ফায়াৰফক্সে ফল দেখুওৱা ব্ৰাউজাৰ।");

add("computer-098",
  "The number of bits in an IPv6 address is",
  "IPv6 ঠিকনাত থকা বিটৰ সংখ্যা",
  [["128", "১২৮"], ["32", "৩২"], ["64", "৬৪"], ["256", "২৫৬"]], 0,
  "IPv6 uses 128 bits, giving an enormous address space. IPv4 uses only 32 bits, which is why addresses ran short.",
  "IPv6 এ ১২৮ বিট ব্যৱহাৰ কৰে, সেয়ে বিশাল ঠিকনা স্থান। IPv4 ত কেবল ৩২ বিট, সেয়ে ঠিকনা কমি গৈছিল।");

add("computer-099",
  "A unique hardware address burned into a network card is called the",
  "নেটৱৰ্ক কাৰ্ডত সোমাই থকা অদ্বিতীয় হাৰ্ডৱেৰ ঠিকনাক কি বোলা হয়",
  [["MAC address", "MAC ঠিকনা"], ["IP address", "IP ঠিকনা"], ["port number", "প'ৰ্ট সংখ্যা"], ["domain name", "ডমেইন নাম"]], 0,
  "The media access control address is fixed at manufacture. An IP address is assigned and can change.",
  "MAC ঠিকনা নিৰ্মাণতে স্থিৰ হয়। IP ঠিকনা দিয়া হয় আৰু সলনি হ'ব পাৰে।");

add("computer-100",
  "Which cable is most commonly used for wired local networks?",
  "তাৰযুক্ত স্থানীয় নেটৱৰ্কত আটাই বেছি ব্যৱহৃত কেবল",
  [["twisted pair cable", "টুইষ্টেড পেয়াৰ কেবল"], ["coaxial cable", "ক'এক্সিয়েল কেবল"], ["fibre optic cable", "ফাইবাৰ অপটিক কেবল"], ["telephone wire", "টেলিফোন তাৰ"]], 0,
  "Twisted pair with RJ-45 plugs is cheap and easy to install, so it dominates office wiring. Fibre is used for long runs.",
  "RJ-45 প্লাগযুক্ত টুইষ্টেড পেয়াৰ সস্তা আৰু সহজ, সেয়ে কাৰ্যালয়ত প্ৰধান। ফাইবাৰ দীঘল পথত ব্যৱহৃত।");

add("computer-101",
  "The protocol used to send email is",
  "ইমেইল পঠিয়াবলৈ ব্যৱহৃত প্ৰট'কল",
  [["SMTP", "SMTP"], ["POP3", "POP3"], ["IMAP", "IMAP"], ["HTTP", "HTTP"]], 0,
  "Simple mail transfer protocol sends mail from client to server. POP3 and IMAP are for retrieving it.",
  "SMTP এ ক্লায়েণ্টৰপৰা ছাৰ্ভাৰলৈ মেইল পঠিয়ায়। POP3 আৰু IMAP ইয়াক অনিবলৈ।");

add("computer-102",
  "A web page address beginning with https indicates that",
  "https ৰে আৰম্ভ হোৱা ৱেব ঠিকনাই বুজায় যে",
  [["the connection is encrypted", "সংযোগ এনক্ৰিপ্ট কৰা আছে"], ["the site is government owned", "চাইট চৰকাৰৰ মালিকী"], ["the page is free of errors", "পৃষ্ঠা ত্ৰুটিমুক্ত"], ["the site needs no password", "চাইটলৈ পাছৱৰ্ড নালাগে"]], 0,
  "The s stands for secure, meaning traffic is encrypted with TLS. It says nothing about who owns the site.",
  "s ৰ অৰ্থ সুৰক্ষিত, অৰ্থাৎ তথ্য TLS ৰে এনক্ৰিপ্ট। চাইট কাৰ, তাক ই নকয়।");

add("computer-103",
  "The device that connects a local network to the internet through a telephone line is a",
  "টেলিফোন লাইনৰে স্থানীয় নেটৱৰ্ক ইণ্টাৰনেটত জোড়া সজুলিটো",
  [["modem", "মডেম"], ["switch", "স্বিচ"], ["bridge", "ব্ৰিজ"], ["gateway", "গেটৱে"]], 0,
  "The modem converts between digital data and the signals the line carries. A switch only links local ports.",
  "মডেমে ডিজিটেল তথ্য আৰু লাইনে কঢ়িয়া যোৱা সংকেতৰ মাজত সলায়। স্বিচে কেবল স্থানীয় প'ৰ্ট জোড়ে।");

add("computer-104",
  "Which topology connects every device to a single central device?",
  "কোন ট'প'লজিয়ে প্ৰতিটো সজুলি এটা কেন্দ্ৰীয় সজুলিৰ সৈতে জোড়ে",
  [["star", "ষ্টাৰ"], ["ring", "ৰিং"], ["bus", "বাছ"], ["mesh", "মেশ"]], 0,
  "In a star every node has its own link to the hub or switch, so one cable failure affects only that node. A ring passes data node to node.",
  "ষ্টাৰত প্ৰতিটো ন'ডৰ নিজৰ সংযোগ হাব বা স্বিচলৈ, সেয়ে এটা কেবল নষ্ট হ'লে কেবল সেই ন'ড ক্ষতিগ্ৰস্ত। ৰিঙত তথ্য ন'ডে ন'ডে যায়।");

add("computer-105",
  "The full form of DNS is",
  "DNS ৰ সম্পূৰ্ণ ৰূপ",
  [["Domain Name System", "Domain Name System"], ["Digital Network Service", "Digital Network Service"], ["Data Node Server", "Data Node Server"], ["Direct Name Search", "Direct Name Search"]], 0,
  "The domain name system turns a name such as axomexam.in into the numeric address the network needs.",
  "DNS এ axomexam.in ৰ দৰে নামক নেটৱৰ্কই প্ৰয়োজনীয় সংখ্যা ঠিকনালৈ সলায়।");

add("computer-106",
  "Which of the following is a wireless networking technology?",
  "তলৰ কোনটো বেতাঁৰ নেটৱৰ্কিং প্ৰযুক্তি",
  [["Wi-Fi", "ৱাই-ফাই"], ["Ethernet", "ইথাৰনেট"], ["USB", "USB"], ["HDMI", "HDMI"]], 0,
  "Wi-Fi carries data over radio waves. Ethernet needs cable, and USB and HDMI are short range device links.",
  "ৱাই-ফাইয়ে ৰেডিঅ' তৰংগেৰে তথ্য নিয়ে। ইথাৰনেটলৈ কেবল লাগে, আৰু USB তথা HDMI চমু দূৰত্বৰ সংযোগ।");

add("computer-107",
  "A collection of web pages belonging to one organisation is called a",
  "এটা সংস্থাৰ অন্তৰ্গত ৱেব পৃষ্ঠাৰ সমষ্টিক কি বোলা হয়",
  [["website", "ৱেবচাইট"], ["web browser", "ৱেব ব্ৰাউজাৰ"], ["search engine", "সন্ধান ইঞ্জিন"], ["home page only", "কেৱল হোম পেজ"]], 0,
  "A website is the whole set of pages. A home page is only its first page, and a browser is the program used to view it.",
  "ৱেবচাইট গোটেই পৃষ্ঠাৰ সমষ্টি। হোম পেজ কেবল প্ৰথম পৃষ্ঠা, আৰু ব্ৰাউজাৰ চোৱা প্ৰগ্ৰাম।");

add("computer-108",
  "Bandwidth of a network connection is measured in",
  "নেটৱৰ্ক সংযোগৰ বেণ্ডৱিথ কিৰে জোখা হয়",
  [["bits per second", "প্ৰতি ছেকেণ্ডত বিট"], ["hertz per metre", "প্ৰতি মিটাৰত হাৰ্টজ"], ["bytes per metre", "প্ৰতি মিটাৰত বাইট"], ["cycles per minute", "প্ৰতি মিনিটত চক্ৰ"]], 0,
  "Bandwidth counts how many bits can flow each second, so it is quoted in megabits per second. Storage is measured in bytes.",
  "বেণ্ডৱিথে প্ৰতি ছেকেণ্ডত কিমান বিট যাব পাৰে গণে, সেয়ে মেগাবিট প্ৰতি ছেকেণ্ডত দিয়া হয়। সঞ্চয় বাইটত জোখা হয়।");

add("computer-109",
  "A small text file stored by a website on your computer is called a",
  "ৱেবচাইটে আপোনাৰ কম্পিউটাৰত ৰখা সৰু লিখা ফাইলটোক কি বোলা হয়",
  [["cookie", "কুকি"], ["cache", "কেশ্ব"], ["plugin", "প্লাগইন"], ["script", "স্ক্ৰিপ্ট"]], 0,
  "A cookie remembers state such as a login or a cart between visits. A cache stores copies of pages for speed.",
  "কুকিয়ে লগইন বা কাৰ্টৰ দৰে অৱস্থা পৰৱৰ্তী ভ্ৰমণলৈ মনত ৰাখে। কেশ্বে দ্ৰুততাৰ বাবে পৃষ্ঠাৰ নকল ৰাখে।");

add("computer-110",
  "Which of the following is an example of a web browser?",
  "তলৰ কোনটো ৱেব ব্ৰাউজাৰৰ উদাহৰণ",
  [["Mozilla Firefox", "ম'জিলা ফায়াৰফক্স"], ["Windows 10", "উইণ্ড'জ ১০"], ["MS Excel", "MS এক্সেল"], ["Linux", "লিনাক্স"]], 0,
  "Firefox fetches and renders web pages. Windows and Linux are operating systems and Excel is a spreadsheet.",
  "ফায়াৰফক্সে ৱেব পৃষ্ঠা আনি দেখুৱায়। উইণ্ড'জ আৰু লিনাক্স অপাৰেটিং চিষ্টেম আৰু এক্সেল স্প্ৰেডশ্বীট।");

add("computer-111",
  "The protocol used to assign IP addresses automatically on a network is",
  "নেটৱৰ্কত স্বয়ংক্ৰিয়ভাৱে IP ঠিকনা দিয়া প্ৰট'কল",
  [["DHCP", "DHCP"], ["DNS", "DNS"], ["FTP", "FTP"], ["SNMP", "SNMP"]], 0,
  "Dynamic host configuration protocol hands out addresses as devices join. DNS resolves names, not addresses.",
  "DHCP এ সজুলি যোগ দিয়েই ঠিকনা দিয়ে। DNS এ নাম সমাধান কৰে, ঠিকনা নহয়।");

add("computer-112",
  "A network in which one computer acts as a central server for others is called",
  "এটা কম্পিউটাৰে আনৰ বাবে কেন্দ্ৰীয় ছাৰ্ভাৰ হোৱা নেটৱৰ্কক কি বোলা হয়",
  [["client-server network", "ক্লায়েণ্ট-ছাৰ্ভাৰ নেটৱৰ্ক"], ["peer-to-peer network", "পিয়াৰ-টু-পিয়াৰ নেটৱৰ্ক"], ["standalone system", "অকলশৰীয়া চিষ্টেম"], ["intranet only", "কেৱল ইণ্ট্ৰানেট"]], 0,
  "In a client-server model the server holds shared files and services. Peer-to-peer has no dedicated server.",
  "ক্লায়েণ্ট-ছাৰ্ভাৰ আৰ্হিত ছাৰ্ভাৰে ভাগ কৰা ফাইল আৰু সেৱা ৰাখে। পিয়াৰ-টু-পিয়াৰত সুকীয়া ছাৰ্ভাৰ নাই।");

add("computer-113",
  "The main function of a firewall is to",
  "ফায়াৰৱালৰ মূল কাম হ'ল",
  [["block unauthorised network traffic", "অননুমোদিত নেটৱৰ্ক তথ্য অহা-যোৱা ৰোধ কৰা"], ["speed up the internet", "ইণ্টাৰনেট দ্ৰুত কৰা"], ["store web pages", "ৱেব পৃষ্ঠা ৰখা"], ["assign IP addresses", "IP ঠিকনা দিয়া"]], 0,
  "A firewall inspects traffic against rules and drops what is not allowed. Speeding up traffic is not its purpose.",
  "ফায়াৰৱালে নিয়মৰ সৈতে তথ্য পৰীক্ষা কৰি অননুমোদিত বাদ দিয়ে। গতি বঢ়োৱা তাৰ উদ্দেশ্য নহয়।");

add("computer-114",
  "Which of the following best describes the internet?",
  "তলৰ কোনটোৱে ইণ্টাৰনেট ভালদৰে বৰ্ণনা কৰে",
  [["a global network of interconnected networks", "জড়িত নেটৱৰ্কৰ বিশ্বব্যাপী নেটৱৰ্ক"], ["a single large computer", "এটা ডাঙৰ কম্পিউটাৰ"], ["a software program", "এটা ছফ্টৱেৰ প্ৰগ্ৰাম"], ["a type of cable", "এবিধ কেবল"]], 0,
  "The internet is a network of networks joined by common protocols. The web is one service running on it.",
  "ইণ্টাৰনেট সাধাৰণ প্ৰট'কলৰে জড়িত নেটৱৰ্কৰ নেটৱৰ্ক। ৱেব তাৰ ওপৰত চলা এটা সেৱা।");

add("computer-115",
  "The transfer of a file from a remote server to your computer is called",
  "দূৰৰ ছাৰ্ভাৰৰপৰা আপোনাৰ কম্পিউটাৰলৈ ফাইল অনাক কি বোলা হয়",
  [["downloading", "ডাউনলোডিং"], ["uploading", "আপলোডিং"], ["browsing", "ব্ৰাউজিং"], ["streaming", "ষ্ট্ৰিমিং"]], 0,
  "Downloading brings a file towards you, uploading sends it away. Streaming plays while it arrives.",
  "ডাউনলোডিঙে ফাইল আপোনাৰ ফালে আনে, আপলোডিঙে পঠিয়ায়। ষ্ট্ৰিমিঙে অহা অহা বজায়।");

add("computer-116",
  "Which of the following is a valid example of a domain name?",
  "তলৰ কোনটো ডমেইন নামৰ শুদ্ধ উদাহৰণ",
  [["axomexam.in", "axomexam.in"], ["192.168.0.1", "192.168.0.1"], ["ftp://files", "ftp://files"], ["00:1A:2B:3C:4D:5E", "00:1A:2B:3C:4D:5E"]], 0,
  "A domain name is readable text ending in a top level domain such as in or com. The others are an IP address, a URL and a MAC address.",
  "ডমেইন নাম পঢ়িব পৰা লিখা যি in বা com ৰ দৰে শীৰ্ষ স্তৰত শেষ হয়। বাকীবোৰ IP ঠিকনা, URL আৰু MAC ঠিকনা।");

add("computer-117",
  "A network that is private to an organisation but uses internet technology is called an",
  "সংস্থাৰ ভিতৰত ব্যক্তিগত কিন্তু ইণ্টাৰনেট প্ৰযুক্তি ব্যৱহাৰ কৰা নেটৱৰ্কক কি বোলা হয়",
  [["intranet", "ইণ্ট্ৰানেট"], ["extranet only", "কেৱল এক্সট্ৰানেট"], ["internet", "ইণ্টাৰনেট"], ["WAN", "WAN"]], 0,
  "An intranet is internal and closed to outsiders. An extranet extends part of it to trusted partners.",
  "ইণ্ট্ৰানেট ভিতৰুৱা আৰু বাহিৰৰ বাবে বন্ধ। এক্সট্ৰানেটে তাৰ অংশ বিশ্বাসী অংশীদাৰলৈ মেলি দিয়ে।");

add("computer-118",
  "The maximum data rate of a network is usually expressed in",
  "নেটৱৰ্কৰ সৰ্বোচ্চ তথ্য হাৰ সাধাৰণতে কিৰে প্ৰকাশ কৰা হয়",
  [["megabits per second", "প্ৰতি ছেকেণ্ডত মেগাবিট"], ["megabytes per hour", "প্ৰতি ঘণ্টাত মেগাবাইট"], ["megahertz", "মেগাহাৰ্টজ"], ["megapixels", "মেগাপিক্সেল"]], 0,
  "Data rates count bits, so speeds are quoted in Mbps. Confusing bits with bytes makes a figure look eight times larger.",
  "তথ্য হাৰে বিট গণে, সেয়ে গতি Mbps ত দিয়া হয়। বিট আৰু বাইট মিলাই দিলে সংখ্যা আঠ গুণ ডাঙৰ দেখা যায়।");

add("computer-119",
  "Which service converts a human readable web address into an IP address?",
  "মানুহে পঢ়িব পৰা ৱেব ঠিকনা IP ঠিকনালৈ সলনি কৰা সেৱাটো",
  [["DNS", "DNS"], ["DHCP", "DHCP"], ["FTP", "FTP"], ["SMTP", "SMTP"]], 0,
  "The domain name system is the internet's directory, matching names to numbers. DHCP assigns addresses instead.",
  "DNS ইণ্টাৰনেটৰ তালিকা, নামক সংখ্যাৰ সৈতে মিলায়। DHCP এ ঠিকনা দিয়ে।");

add("computer-120",
  "In a bus topology, all devices share",
  "বাছ ট'প'লজিত সকলো সজুলিয়ে ভাগ কৰে",
  [["a single common cable", "এটা সাধাৰণ কেবল"], ["a central switch", "এটা কেন্দ্ৰীয় স্বিচ"], ["separate links to every other device", "প্ৰতিটো সজুলিলৈ সুকীয়া সংযোগ"], ["a wireless channel only", "কেৱল বেতাঁৰ বাহক"]], 0,
  "One backbone cable serves every node, so a break stops the whole segment. A star uses a central switch instead.",
  "এটা মূল কেবলে প্ৰতিটো ন'ডলৈ সেৱা দিয়ে, সেয়ে ভাঙিলে গোটেই খণ্ড বন্ধ। ষ্টাৰত কেন্দ্ৰীয় স্বিচ ব্যৱহৃত।");

/* ================= cyber-security ================= */
useLeaf("cyber-security");

add("computer-121",
  "The practice of deceiving people into revealing passwords by fake emails is called",
  "নকল ইমেইলেৰে মানুহক প্ৰতাৰণা কৰি পাছৱৰ্ড উলিওৱা কৌশলক কি বোলা হয়",
  [["phishing", "ফিছিং"], ["pharming", "ফাৰ্মিং"], ["spamming", "স্পেমিং"], ["sniffing", "স্নিফিং"]], 0,
  "Phishing baits a victim with a message that looks official. Spamming is bulk unwanted mail and sniffing is eavesdropping on traffic.",
  "ফিছিঙে চৰকাৰী যেন লগা বাৰ্তাৰে ভুক্তভোগীক ভোলায়। স্পেমিং অপ্ৰয়োজনীয় বাহুল্য মেইল আৰু স্নিফিং তথ্য লুকাই শুনা।");

add("computer-122",
  "Which of the following is the strongest password?",
  "তলৰ কোনটো আটাই শক্তিশালী পাছৱৰ্ড",
  [["A9#mQ2$vL7!p", "A9#mQ2$vL7!p"], ["password123", "password123"], ["axomexam", "axomexam"], ["12345678", "12345678"]], 0,
  "Length mixed with upper and lower case, digits and symbols defeats guessing and dictionary attacks. A word or a sequence does not.",
  "দীঘল, ডাঙৰ-সৰু আখৰ, অংক আৰু চিন মিশ্ৰিত হ'লে অনুমান আৰু অভিধান আক্ৰমণ বিফল হয়। শব্দ বা ক্ৰমে নোৱাৰে।");

add("computer-123",
  "Malicious software that encrypts files and demands payment is called",
  "ফাইল এনক্ৰিপ্ট কৰি টকা দাবী কৰা ক্ষতিকাৰক ছফ্টৱেৰক কি বোলা হয়",
  [["ransomware", "ৰেনছমৱেৰ"], ["adware", "এডৱেৰ"], ["firmware", "ফাৰ্মৱেৰ"], ["shareware", "শ্বেয়াৰৱেৰ"]], 0,
  "Ransomware locks the data and sells the key back. Adware only pushes advertisements.",
  "ৰেনছমৱেৰে তথ্য বন্ধ কৰি চাবি বিক্ৰী কৰে। এডৱেৰে কেবল বিজ্ঞাপন দেখুৱায়।");

add("computer-124",
  "Two factor authentication adds security by requiring",
  "দুই স্তৰ প্ৰমাণিকৰণে সুৰক্ষা বঢ়ায় কি দাবী কৰি",
  [["a second proof such as a one time code", "এককালীন ক'ডৰ দৰে দ্বিতীয় প্ৰমাণ"], ["a longer password only", "কেৱল দীঘল পাছৱৰ্ড"], ["a faster internet link", "দ্ৰুত ইণ্টাৰনেট সংযোগ"], ["a newer browser", "নতুন ব্ৰাউজাৰ"]], 0,
  "Even if the password leaks, the attacker still lacks the code sent to your phone or token.",
  "পাছৱৰ্ড ফাদিলেও আক্ৰমণকাৰীৰ ওচৰত ফোন বা টকেনলৈ যোৱা ক'ড নাথাকে।");

add("computer-125",
  "A firewall protects a computer mainly by",
  "ফায়াৰৱালে কম্পিউটাৰ সুৰক্ষা দিয়ে মূলতঃ কিৰে",
  [["filtering incoming and outgoing network traffic", "অহা-যোৱা নেটৱৰ্ক তথ্য ছেকি"], ["deleting old files", "পুৰণি ফাইল মচি"], ["speeding up the processor", "প্ৰচেছৰ দ্ৰুত কৰি"], ["compressing documents", "ডকুমেণ্ট সংকুচিত কৰি"]], 0,
  "Rules decide which connections are allowed, so unwanted traffic never reaches the services behind it.",
  "নিয়মে কোন সংযোগ অনুমোদিত নিৰ্ণয় কৰে, সেয়ে অবাঞ্ছিত তথ্য পিছৰ সেৱালৈ নাপায়।");

add("computer-126",
  "Sending unsolicited bulk email to many recipients is called",
  "বহু গ্ৰাহকলৈ অবাঞ্ছিত বাহুল্য ইমেইল পঠিওৱাক কি বোলা হয়",
  [["spamming", "স্পেমিং"], ["phishing", "ফিছিং"], ["hacking", "হেকিং"], ["cracking", "ক্ৰেকিং"]], 0,
  "Spam is bulk advertising or nuisance mail. Phishing tries to steal credentials and hacking breaks into systems.",
  "স্পেম বাহুল্য বিজ্ঞাপন বা উপদ্ৰৱ মেইল। ফিছিঙে প্ৰমাণপত্ৰ চুৰি কৰে আৰু হেকিঙে চিষ্টেমত সোমায়।");

add("computer-127",
  "The process of converting readable data into an unreadable form is called",
  "পঢ়িব পৰা তথ্য অপঢ়নীয় ৰূপলৈ সলনি কৰা প্ৰক্ৰিয়াক কি বোলা হয়",
  [["encryption", "এনক্ৰিপশ্যন"], ["decryption", "ডিক্ৰিপশ্যন"], ["compression", "সংকোচন"], ["formatting", "ফৰ্মেটিং"]], 0,
  "Encryption scrambles data with a key, and decryption reverses it with the same or a matching key.",
  "এনক্ৰিপশ্যনে চাবিৰে তথ্য ওলোটপালোট কৰে, আৰু ডিক্ৰিপশ্যনে একেই বা মিলা চাবিৰে ঘূৰায়।");

add("computer-128",
  "A program that secretly records every keystroke on a computer is a",
  "কম্পিউটাৰত গোপনে প্ৰতিটো কি-ষ্ট্ৰ'ক ৰখা প্ৰগ্ৰামটো",
  [["keylogger", "কীলগাৰ"], ["compiler", "কম্পাইলাৰ"], ["debugger", "ডিবাগাৰ"], ["scheduler", "শ্বিডিউলাৰ"]], 0,
  "A keylogger captures typed text, including passwords, and sends it to an attacker. Debuggers are legitimate development tools.",
  "কীলগাৰে টাইপ কৰা লিখা, পাছৱৰ্ডসহ, ধৰি আক্ৰমণকাৰীলৈ পঠিয়ায়। ডিবাগাৰ বৈধ বিকাশ সজুলি।");

add("computer-129",
  "Which of the following is the safest way to handle an unknown email attachment?",
  "অজ্ঞাত ইমেইল সংলগ্নক চম্ভালাৰ আটাই নিৰাপদ উপায়",
  [["do not open it and delete the message", "নমেলাকৈ বাৰ্তাটো মচি পেলোৱা"], ["open it to see what it is", "কি সেয়া চাবলৈ মেলা"], ["forward it to friends", "বন্ধুবৰ্গলৈ পঠিওৱা"], ["reply asking for details", "বিৱৰণ সোধি উত্তৰ দিয়া"]], 0,
  "Attachments carry malware and replying confirms your address is live. Deleting avoids both risks.",
  "সংলগ্নত মেলৱেৰ থাকে আৰু উত্তৰ দিলে আপোনাৰ ঠিকনা সক্ৰিয় বুলি জনা যায়। মচিলে দুয়োটা বিপদ এৰায়।");

add("computer-130",
  "The term hacking, in its criminal sense, means",
  "হেকিং শব্দই অপৰাধমূলক অৰ্থত বুজায়",
  [["gaining unauthorised access to a computer system", "কম্পিউটাৰ চিষ্টেমত অননুমোদিত প্ৰৱেশ লাভ"], ["repairing a broken computer", "নষ্ট কম্পিউটাৰ মেৰামতি"], ["writing a new program", "নতুন প্ৰগ্ৰাম লিখা"], ["installing an antivirus", "এণ্টিভাইৰাছ স্থাপন"]], 0,
  "Criminal hacking breaks access controls. Writing software or repairing hardware is ordinary technical work.",
  "অপৰাধমূলক হেকিঙে প্ৰৱেশ নিয়ন্ত্ৰণ ভাঙে। ছফ্টৱেৰ লিখা বা মেৰামতি সাধাৰণ কাম।");

add("computer-131",
  "A digital signature is used to",
  "ডিজিটেল স্বাক্ষৰ কিৰ বাবে ব্যৱহৃত হয়",
  [["verify the sender and confirm the message was not altered", "প্ৰেৰক সত্যাপন আৰু বাৰ্তা নসলনি নিশ্চিত কৰিবলৈ"], ["compress a file before sending", "পঠিওৱাৰ আগতে ফাইল সংকুচিত কৰিবলৈ"], ["speed up the download", "ডাউনলোড দ্ৰুত কৰিবলৈ"], ["hide the sender's name", "প্ৰেৰকৰ নাম লুকুৱাবলৈ"]], 0,
  "The signature ties the message to a private key, so any later change breaks the check.",
  "স্বাক্ষৰে বাৰ্তাক ব্যক্তিগত চাবিৰ সৈতে বান্ধে, সেয়ে পিছত যিকোনো সলনি পৰীক্ষা ভাঙে।");

add("computer-132",
  "Which of the following is a common sign of a phishing website?",
  "তলৰ কোনটো ফিছিং ৱেবচাইটৰ সাধাৰণ চিন",
  [["a misspelt domain name that imitates a bank", "বেংকৰ নকল কৰা ভুল বানানৰ ডমেইন নাম"], ["a padlock in the address bar", "ঠিকনা দণ্ডত তলা চিন"], ["a working contact page", "কাম কৰা যোগাযোগ পৃষ্ঠা"], ["an up to date privacy policy", "শেহতীয়া গোপনীয়তা নীতি"]], 0,
  "Lookalike spellings such as a doubled letter fool hurried users. A padlock only shows encryption, not honesty.",
  "আখৰ দুবাৰ দিয়াৰ দৰে একেই দেখা বানানে খৰধৰ ব্যৱহাৰকাৰীক ভোলায়। তলা চিনে কেবল এনক্ৰিপশ্যন দেখুৱায়, সততা নহয়।");

add("computer-133",
  "A computer worm differs from a virus because a worm",
  "কম্পিউটাৰ ৱৰ্ম ভাইৰাছতকৈ বেলেগ কাৰণ ৱৰ্মে",
  [["spreads by itself across networks", "নেটৱৰ্কত নিজেই বিয়পে"], ["needs a host file to run", "চলিবলৈ গৃহ ফাইল লাগে"], ["only damages hardware", "কেৱল হাৰ্ডৱেৰ নষ্ট কৰে"], ["cannot be removed", "আঁতৰাব নোৱাৰি"]], 0,
  "A worm is self-contained and copies itself over the network, while a virus must attach to a file to spread.",
  "ৱৰ্ম স্বয়ংসম্পূৰ্ণ আৰু নেটৱৰ্কত নিজকে নকল কৰে, আনহাতে ভাইৰাছে বিয়পিবলৈ ফাইলত লাগিব লাগে।");

add("computer-134",
  "The best protection against data loss from a hard disk failure is",
  "হাৰ্ড ডিস্ক নষ্ট হোৱাৰপৰা তথ্য ৰক্ষাৰ আটাই ভাল উপায়",
  [["keeping regular backups on another medium", "আন মাধ্যমত নিয়মীয়া বেকআপ ৰখা"], ["using a longer password", "দীঘল পাছৱৰ্ড ব্যৱহাৰ"], ["installing a firewall", "ফায়াৰৱাল স্থাপন"], ["defragmenting weekly", "সাপ্তাহিক ডিফ্ৰেগমেণ্ট"]], 0,
  "Only a copy elsewhere survives a dead disk. Passwords and firewalls protect against intrusion, not hardware failure.",
  "আন ঠাইত থকা নকলেহে নষ্ট ডিস্কৰপৰা ৰক্ষা কৰে। পাছৱৰ্ড আৰু ফায়াৰৱালে অনুপ্ৰৱেশ ৰোধ কৰে, হাৰ্ডৱেৰ নষ্ট নহয়।");

add("computer-135",
  "Cyber crime committed by impersonating a legitimate organisation to steal data is called",
  "তথ্য চুৰিৰ বাবে বৈধ সংস্থাৰ নকল কৰি কৰা চাইবাৰ অপৰাধক কি বোলা হয়",
  [["phishing", "ফিছিং"], ["phreaking", "ফ্ৰিকিং"], ["spoofing only", "কেৱল স্পুফিং"], ["trolling", "ট্ৰলিং"]], 0,
  "Phishing is the broad attack that imitates a bank or office to harvest credentials. Spoofing is one technique it uses.",
  "ফিছিং হ'ল বেংক বা কাৰ্যালয়ৰ নকল কৰি প্ৰমাণপত্ৰ সংগ্ৰহ কৰা বিস্তৃত আক্ৰমণ। স্পুফিং ইয়াৰ এটা কৌশল।");

add("computer-136",
  "A VPN is used mainly to",
  "VPN মূলতঃ কিৰ বাবে ব্যৱহৃত হয়",
  [["create an encrypted tunnel over a public network", "সাধাৰণ নেটৱৰ্কৰ ওপৰত এনক্ৰিপ্ট কৰিড'ৰ বনাবলৈ"], ["increase the disk space", "ডিস্কৰ ঠাই বঢ়াবলৈ"], ["speed up the processor", "প্ৰচেছৰ দ্ৰুত কৰিবলৈ"], ["remove viruses automatically", "ভাইৰাছ নিজে মচিবলৈ"]], 0,
  "A virtual private network hides traffic from the local network and carries it encrypted to a remote endpoint.",
  "VPN এ স্থানীয় নেটৱৰ্কৰপৰা তথ্য লুকাই দূৰৰ টাৰ্মিনেললৈ এনক্ৰিপ্ট কৰি নিয়ে।");

add("computer-137",
  "Which of the following is the strongest form of authentication?",
  "তলৰ কোনটো আটাই শক্তিশালী প্ৰমাণিকৰণ",
  [["biometric plus password", "জৈৱমিতি আৰু পাছৱৰ্ড"], ["password alone", "কেৱল পাছৱৰ্ড"], ["a four digit PIN alone", "কেৱল চাৰি অংকৰ PIN"], ["a username alone", "কেৱল ব্যৱহাৰকাৰী নাম"]], 0,
  "Combining something you are with something you know defeats both guessing and theft of a single factor.",
  "আপুনি যি সেয়া আৰু আপুনি যি জানে একত্ৰ কৰিলে অনুমান আৰু এটা উপাদান চুৰি দুয়োটা বিফল হয়।");

add("computer-138",
  "Software that displays unwanted advertisements and redirects searches is called",
  "অবাঞ্ছিত বিজ্ঞাপন দেখুৱাই সন্ধান ঘূৰাই দিয়া ছফ্টৱেৰক কি বোলা হয়",
  [["adware", "এডৱেৰ"], ["firmware", "ফাৰ্মৱেৰ"], ["freeware", "ফ্ৰীৱেৰ"], ["middleware", "মিডলৱেৰ"]], 0,
  "Adware exists to push advertising. Freeware and firmware are neutral terms about licensing and location.",
  "এডৱেৰ বিজ্ঞাপন দিয়েই থাকে। ফ্ৰীৱেৰ আৰু ফাৰ্মৱেৰ অনুজ্ঞাপত্ৰ আৰু অৱস্থানৰ নিৰপেক্ষ শব্দ।");

add("computer-139",
  "The main purpose of a captcha on a website is to",
  "ৱেবচাইটত কেপচাৰ মূল উদ্দেশ্য",
  [["tell humans from automated programs", "মানুহক স্বয়ংক্ৰিয় প্ৰগ্ৰামৰপৰা পৃথক কৰা"], ["speed up page loading", "পৃষ্ঠা লোড দ্ৰুত কৰা"], ["encrypt the form data", "ফৰ্মৰ তথ্য এনক্ৰিপ্ট কৰা"], ["store the user's password", "ব্যৱহাৰকাৰীৰ পাছৱৰ্ড ৰখা"]], 0,
  "The puzzle is easy for a person and hard for a bot, so it blocks bulk automated signups and spam.",
  "ধাঁধাটো মানুহৰ বাবে সহজ আৰু বটৰ বাবে কঠিন, সেয়ে বাহুল্য স্বয়ংক্ৰিয় পঞ্জীয়ন আৰু স্পেম ৰোধ কৰে।");

add("computer-140",
  "A security patch released by a software vendor should be",
  "ছফ্টৱেৰ প্ৰস্তুতকাৰীয়ে দিয়া সুৰক্ষা পেটছ",
  [["installed promptly to close the known flaw", "জনা ত্ৰুটি বন্ধ কৰিবলৈ সোনকালে স্থাপন কৰা"], ["ignored unless the computer is slow", "কম্পিউটাৰ ধীৰ নহ'লে উপেক্ষা কৰা"], ["applied only after a year", "এক বছৰৰ পিছতহে লগোৱা"], ["replaced by a new password", "নতুন পাছৱৰ্ডেৰে সলনি কৰা"]], 0,
  "The patch exists because the flaw is public, so delay gives attackers a known way in.",
  "ত্ৰুটি ৰাজহুৱা হোৱা বাবে পেটছ ওলায়, সেয়ে পলম কৰিলে আক্ৰমণকাৰীয়ে জানা পথ পায়।");

add("computer-141",
  "Which of the following best describes a strong password policy?",
  "তলৰ কোনটোৱে শক্তিশালী পাছৱৰ্ড নীতি ভালদৰে বৰ্ণনা কৰে",
  [["long passphrases changed when compromised", "দীঘল পাছফ্ৰেইজ যি ফাদিলে সলোৱা হয়"], ["short passwords changed every day", "প্ৰতিদিনে সলোৱা চুটি পাছৱৰ্ড"], ["the same password everywhere", "সকলো ঠাইত একেই পাছৱৰ্ড"], ["using the birth date", "জন্ম তাৰিখ ব্যৱহাৰ"]], 0,
  "Length matters most, and frequent forced changes push people towards weak patterns. Reuse turns one leak into many.",
  "দৈৰ্ঘ্যই আটাই বেছি গুৰুত্বপূৰ্ণ, আৰু সঘন বাধ্যতামূলক সলনিয়ে দুৰ্বল আৰ্হিলৈ ঠেলে। পুনৰ ব্যৱহাৰে এটা ফাদ এটাতকৈ বহুতো কৰে।");

add("computer-142",
  "Social engineering in cyber security means",
  "চাইবাৰ সুৰক্ষাত ছ'চিয়েল ইঞ্জিনিয়াৰিঙৰ অৰ্থ",
  [["manipulating people into giving away confidential information", "মানুহক ফন্দি কৰি গোপন তথ্য উলিওৱা"], ["designing secure social networks", "সুৰক্ষিত ছ'চিয়েল নেটৱৰ্ক সজা"], ["engineering new hardware", "নতুন হাৰ্ডৱেৰ সজা"], ["encrypting social media posts", "ছ'চিয়েল মিডিয়া পোষ্ট এনক্ৰিপ্ট কৰা"]], 0,
  "The attacker targets the person, not the machine, often by posing as a colleague or an authority.",
  "আক্ৰমণকাৰীয়ে যন্ত্ৰ নহয় মানুহক লক্ষ্য কৰে, প্ৰায়ে সহকৰ্মী বা কৰ্তৃপক্ষৰ ৰূপ লৈ।");

add("computer-143",
  "A Trojan horse is malicious software that",
  "ট্ৰ'জান হৰ্ছ হ'ল ক্ষতিকাৰক ছফ্টৱেৰ যি",
  [["pretends to be useful but carries a hidden payload", "উপযোগী যেন দেখুৱাই লুকুৱা কাম কৰে"], ["only slows the internet", "কেৱল ইণ্টাৰনেট ধীৰ কৰে"], ["repairs damaged files", "নষ্ট ফাইল মেৰামতি কৰে"], ["increases memory", "স্মৃতি বঢ়ায়"]], 0,
  "The name comes from the Greek story: the program looks harmless, so the user installs it and the payload runs.",
  "নাম গ্ৰীক কাহিনীৰপৰা: প্ৰগ্ৰাম নিৰীহ যেন লাগে, সেয়ে ব্যৱহাৰকাৰীয়ে স্থাপন কৰে আৰু লুকুৱা কাম চলি যায়।");

add("computer-144",
  "The most reliable way to know a website is genuine before entering a password is to",
  "পাছৱৰ্ড দিয়াৰ আগতে ৱেবচাইট প্ৰকৃত হয় জানাৰ আটাই নিৰ্ভৰযোগ্য উপায়",
  [["type the known address yourself and check the domain", "জনা ঠিকনা নিজে টাইপ কৰি ডমেইন পৰীক্ষা কৰা"], ["trust any page with a padlock", "তলা চিন থকা যিকোনো পৃষ্ঠা বিশ্বাস কৰা"], ["click the link in the email", "ইমেইলৰ লিংকত ক্লিক কৰা"], ["check the page colours", "পৃষ্ঠাৰ ৰং পৰীক্ষা কৰা"]], 0,
  "Reaching the site by a link you did not type lets the attacker choose where you land. The padlock says nothing about identity.",
  "আপুনি নাটাইপ কৰা লিংকেৰে যোৱাটোৱে আক্ৰমণকাৰীক ঠাই বাছিব দিয়ে। তলা চিনে পৰিচয় নকয়।");

add("computer-145",
  "Which of the following is a common cause of data breaches in offices?",
  "কাৰ্যালয়ত তথ্য ফাদৰ সাধাৰণ কাৰণ",
  [["weak or shared passwords", "দুৰ্বল বা ভাগ কৰা পাছৱৰ্ড"], ["using a licensed antivirus", "অনুজ্ঞাপত্ৰযুক্ত এণ্টিভাইৰাছ"], ["regular backups", "নিয়মীয়া বেকআপ"], ["automatic updates", "স্বয়ংক্ৰিয় আপডেট"]], 0,
  "Shared credentials remove accountability and a weak one falls to guessing. The other three reduce risk.",
  "ভাগ কৰা প্ৰমাণপত্ৰই দায়বদ্ধতা আঁতৰায় আৰু দুৰ্বলটো অনুমানত পৰে। বাকী তিনিওটা বিপদ কমায়।");

add("computer-146",
  "The main risk of using public Wi-Fi for banking is",
  "বেংকিঙৰ বাবে ৰাজহুৱা ৱাই-ফাই ব্যৱহাৰৰ মূল বিপদ",
  [["traffic may be intercepted by others on the network", "নেটৱৰ্কৰ আন লোকে তথ্য মাজতে ধৰিব পাৰে"], ["the battery drains faster", "বেটেৰী সোনকালে শেষ হয়"], ["the screen becomes dim", "পৰ্দা ম্লান হয়"], ["the keyboard stops working", "কীবৰ্ড নচলে"]], 0,
  "An open network lets others watch unencrypted traffic, which is why a VPN or mobile data is safer for banking.",
  "মুকলি নেটৱৰ্কত আন লোকে এনক্ৰিপ্ট নোহোৱা তথ্য চাব পাৰে, সেয়ে বেংকিঙত VPN বা ম'বাইল ডেটা নিৰাপদ।");

add("computer-147",
  "Which of the following is an example of two factor authentication?",
  "তলৰ কোনটো দুই স্তৰ প্ৰমাণিকৰণৰ উদাহৰণ",
  [["a password followed by an OTP on the phone", "পাছৱৰ্ডৰ পিছত ফোনত অহা OTP"], ["a password entered twice", "দুবাৰ দিয়া পাছৱৰ্ড"], ["a long password alone", "কেৱল দীঘল পাছৱৰ্ড"], ["a username and a password", "ব্যৱহাৰকাৰী নাম আৰু পাছৱৰ্ড"]], 0,
  "Two factors must be of different kinds, so a password plus a code counts. Two passwords are still one kind.",
  "দুটা উপাদান বেলেগ ধৰণৰ হ'ব লাগে, সেয়ে পাছৱৰ্ড আৰু ক'ড গণা হয়। দুটা পাছৱৰ্ড এটেই ধৰণ।");

add("computer-148",
  "The purpose of disk encryption on a laptop is to",
  "লেপটপত ডিস্ক এনক্ৰিপশ্যনৰ উদ্দেশ্য",
  [["make the data unreadable if the machine is stolen", "যন্ত্ৰ চুৰি হ'লে তথ্য অপঢ়নীয় কৰা"], ["make the laptop faster", "লেপটপ দ্ৰুত কৰা"], ["increase the storage capacity", "সঞ্চয় ক্ষমতা বঢ়োৱা"], ["reduce the battery use", "বেটেৰী খৰচ কমোৱা"]], 0,
  "Without the key the disk contents are noise, so a thief cannot read files even after removing the drive.",
  "চাবি নোহোৱাকৈ ডিস্কৰ ভিতৰ অৰ্থহীন, সেয়ে চোৰে ড্ৰাইভ খুলিয়েও ফাইল পঢ়িব নোৱাৰে।");

add("computer-149",
  "Which of the following is the correct response to a suspected ransomware attack?",
  "সন্দেহজনক ৰেনছমৱেৰ আক্ৰমণত শুদ্ধ প্ৰতিক্ৰিয়া",
  [["disconnect from the network and inform the administrator", "নেটৱৰ্কৰপৰা বিচ্ছিন্ন হৈ প্ৰশাসকক জনোৱা"], ["pay the ransom immediately", "লগে লগে মুক্তিপণ দিয়া"], ["restart repeatedly until it clears", "মচি যোৱালৈকে বাৰে বাৰে ৰিষ্টাৰ্ট কৰা"], ["email the attackers for help", "সহায়ৰ বাবে আক্ৰমণকাৰীলৈ ইমেইল কৰা"]], 0,
  "Cutting the link stops the spread, and the administrator can restore from backup. Paying funds crime and may not unlock anything.",
  "সংযোগ কাটিলে বিয়পা ৰয়, আৰু প্ৰশাসকে বেকআপৰপৰা ঘূৰাই আনিব পাৰে। মুক্তিপণ দিলে অপৰাধ চলায়, চাবি নাপাবও পাৰে।");

add("computer-150",
  "A brute force attack tries to break a password by",
  "ব্ৰুট ফ'ৰ্ছ আক্ৰমণে পাছৱৰ্ড ভাঙিবলৈ চেষ্টা কৰে",
  [["trying every possible combination until one works", "এটা কাম নকৰালৈকে সকলো সম্ভাৱ্য সংযোগ চেষ্টা কৰি"], ["asking the user politely", "ব্যৱহাৰকাৰীক নম্ৰভাৱে সোধি"], ["reading the manual", "হাতপুথি পঢ়ি"], ["repairing the keyboard", "কীবৰ্ড মেৰামতি কৰি"]], 0,
  "Automated guessing becomes practical against short or simple passwords, which is why length and lockouts matter.",
  "স্বয়ংক্ৰিয় অনুমান চুটি বা সাধাৰণ পাছৱৰ্ডত ফলদায়ক হয়, সেয়ে দৈৰ্ঘ্য আৰু বন্ধ কৰা গুৰুত্বপূৰ্ণ।");

/* ================= dbms-number-system ================= */
useLeaf("dbms-number-system");

add("computer-151",
  "In a relational database, data is stored in",
  "সম্পৰ্কীয় ডাটাবেছত তথ্য ৰখা হয়",
  [["tables made of rows and columns", "শাৰী আৰু স্তম্ভৰ তালিকাত"], ["a single long text file", "এটা দীঘল লিখা ফাইলত"], ["folders only", "কেৱল ফোল্ডাৰত"], ["images only", "কেৱল ছবিত"]], 0,
  "A relation is a table: each row is a record and each column a field. This structure is what makes SQL queries possible.",
  "সম্পৰ্ক এটা তালিকা: প্ৰতিটো শাৰী অভিলেখ আৰু প্ৰতিটো স্তম্ভ ক্ষেত্ৰ। এই গঠনে SQL প্ৰশ্ন সম্ভৱ কৰে।");

add("computer-152",
  "The binary equivalent of the decimal number 10 is",
  "দশমিক সংখ্যা ১০ ৰ দ্বিমিক ৰূপ",
  [["1010", "১০১০"], ["1100", "১১০০"], ["1001", "১০০১"], ["1110", "১১১০"]], 0,
  "Ten is eight plus two, which sets the eight and two place values, giving 1010. Reversing the last two digits gives the wrong 1001.",
  "দহ মানে আঠ যোগ দুই, সেয়ে আঠ আৰু দুইৰ স্থানত এক, অৰ্থাৎ ১০১০। শেষৰ দুটা অংক ওলোটালে ভুলকৈ ১০০১ হয়।");

add("computer-153",
  "The primary key in a database table is used to",
  "ডাটাবেছ তালিকাৰ প্ৰাথমিক চাবি কিৰ বাবে ব্যৱহৃত হয়",
  [["uniquely identify each record", "প্ৰতিটো অভিলেখ অদ্বিতীয়ভাৱে চিনাক্ত কৰিবলৈ"], ["sort the table by name", "তালিকা নামেৰে সজাবলৈ"], ["encrypt the table", "তালিকা এনক্ৰিপ্ট কৰিবলৈ"], ["count the rows", "শাৰী গণিবলৈ"]], 0,
  "A primary key must be unique and not null, so no two rows can be confused. A sort order is a separate matter.",
  "প্ৰাথমিক চাবি অদ্বিতীয় আৰু শূন্য নহ'ব লাগে, সেয়ে দুটা শাৰী মিলি নাযায়। সজোৱা ক্ৰম বেলেগ কথা।");

add("computer-154",
  "The decimal value of the binary number 1111 is",
  "দ্বিমিক সংখ্যা ১১১১ ৰ দশমিক মান",
  [["15", "১৫"], ["11", "১১"], ["16", "১৬"], ["8", "৮"]], 0,
  "Four ones mean eight plus four plus two plus one, that is fifteen. Sixteen would need a fifth bit set.",
  "চাৰিটা এক মানে আঠ যোগ চাৰি যোগ দুই যোগ এক = পোন্ধৰ। ষোল্ললৈ পঞ্চম বিট লাগিব।");

add("computer-155",
  "Which language is used to query a relational database?",
  "সম্পৰ্কীয় ডাটাবেছত প্ৰশ্ন সোধাৰ বাবে কোন ভাষা ব্যৱহৃত হয়",
  [["SQL", "SQL"], ["HTML", "HTML"], ["CSS", "CSS"], ["XML", "XML"]], 0,
  "Structured query language selects, inserts and updates records. HTML marks up pages and CSS styles them.",
  "SQL এ অভিলেখ বাছে, সুমুৱায় আৰু আপডেট কৰে। HTML এ পৃষ্ঠা চিহ্নিত কৰে আৰু CSS এ ৰূপ দিয়ে।");

add("computer-156",
  "The hexadecimal number system has a base of",
  "হেক্সাডেচিমেল সংখ্যা পদ্ধতিৰ ভিত্তি",
  [["16", "১৬"], ["10", "১০"], ["8", "৮"], ["2", "২"]], 0,
  "Hexadecimal uses sixteen symbols, zero to nine plus A to F. Base eight is octal and base two is binary.",
  "হেক্সাডেচিমেলে ষোল্ল চিহ্ন, শূন্যৰপৰা ন আৰু A ৰপৰা F। ভিত্তি আঠ অষ্টাল আৰু ভিত্তি দুই দ্বিমিক।");

add("computer-157",
  "In a database, a field that refers to the primary key of another table is called a",
  "ডাটাবেছত আন তালিকাৰ প্ৰাথমিক চাবিলৈ দেখুওৱা ক্ষেত্ৰক কি বোলা হয়",
  [["foreign key", "বহিঃ চাবি"], ["primary key", "প্ৰাথমিক চাবি"], ["candidate key", "প্ৰাৰ্থী চাবি"], ["super key", "ছুপাৰ চাবি"]], 0,
  "A foreign key links two tables and enforces that the referenced row exists, which is how relationships are built.",
  "বহিঃ চাবিয়ে দুটা তালিকা জোড়ে আৰু নিৰ্দেশিত শাৰী আছে বুলি নিশ্চিত কৰে, সেয়ে সম্পৰ্ক গঢ়ে।");

add("computer-158",
  "The binary addition of 101 and 11 gives",
  "১০১ আৰু ১১ ৰ দ্বিমিক যোগফল",
  [["1000", "১০০০"], ["110", "১১০"], ["111", "১১১"], ["1010", "১০১০"]], 0,
  "Five plus three is eight, and eight in binary is 1000. Writing 111 would ignore the carry.",
  "পাঁচ যোগ তিনি = আঠ, আৰু দ্বিমিকে আঠ ১০০০। ১১১ লিখিলে হাত বঢ়োৱা উপেক্ষা হয়।");

add("computer-159",
  "Which SQL statement is used to retrieve data from a table?",
  "তালিকাৰপৰা তথ্য অনাৰ বাবে কোন SQL নিৰ্দেশ ব্যৱহৃত হয়",
  [["SELECT", "SELECT"], ["INSERT", "INSERT"], ["DELETE", "DELETE"], ["UPDATE", "UPDATE"]], 0,
  "SELECT reads rows. INSERT adds, UPDATE changes and DELETE removes them.",
  "SELECT এ শাৰী পঢ়ে। INSERT এ যোগ, UPDATE এ সলনি আৰু DELETE এ মচে।");

add("computer-160",
  "One nibble is equal to",
  "এক নিবল কিৰ সমান",
  [["4 bits", "৪ বিট"], ["8 bits", "৮ বিট"], ["2 bits", "২ বিট"], ["16 bits", "১৬ বিট"]], 0,
  "A nibble is half a byte, that is four bits, and it is exactly one hexadecimal digit.",
  "নিবল আধা বাইট, অৰ্থাৎ চাৰি বিট, আৰু ই ঠিক এটা হেক্সাডেচিমেল অংক।");

add("computer-161",
  "Redundancy in a database leads to",
  "ডাটাবেছত বাহুল্যই কিৰ সৃষ্টি কৰে",
  [["wasted space and inconsistent data", "অপচয় ঠাই আৰু অসামঞ্জস্য তথ্য"], ["faster queries always", "সদায় দ্ৰুত প্ৰশ্ন"], ["better security", "উত্তম সুৰক্ষা"], ["smaller files", "সৰু ফাইল"]], 0,
  "Storing the same fact in many places wastes space and lets copies disagree. Normalisation removes such repetition.",
  "একেই তথ্য বহু ঠাইত ৰাখিলে ঠাই নষ্ট হয় আৰু নকলবোৰ বেলেগ হ'ব পাৰে। নৰ্মেলাইজেশনে পুনৰাবৃত্তি আঁতৰায়।");

add("computer-162",
  "The decimal number 25 in binary is",
  "দশমিক সংখ্যা ২৫ ৰ দ্বিমিক ৰূপ",
  [["11001", "১১০০১"], ["10101", "১০১০১"], ["11010", "১১০১০"], ["10011", "১০০১১"]], 0,
  "Twenty-five is sixteen plus eight plus one, so bits four, three and zero are set, giving 11001.",
  "পঁচিশ মানে ষোল্ল যোগ আঠ যোগ এক, সেয়ে চাৰি, তিনি আৰু শূন্য স্থানত এক, অৰ্থাৎ ১১০০১।");

add("computer-163",
  "A DBMS is used mainly to",
  "DBMS মূলতঃ কিৰ বাবে ব্যৱহৃত হয়",
  [["store, retrieve and manage large amounts of data", "বহু তথ্য ৰখা, অনা আৰু চলোৱা"], ["design web pages", "ৱেব পৃষ্ঠা ডিজাইন কৰা"], ["edit photographs", "ফট'গ্ৰাফ সম্পাদনা কৰা"], ["scan documents", "ডকুমেণ্ট স্কেন কৰা"]], 0,
  "A database management system controls access, keeps data consistent and answers queries. It is not a design tool.",
  "DBMS এ প্ৰৱেশ নিয়ন্ত্ৰণ কৰি তথ্য সামঞ্জস্য ৰাখি প্ৰশ্নৰ উত্তৰ দিয়ে। ই ডিজাইন সজুলি নহয়।");

add("computer-164",
  "The octal equivalent of the decimal number 8 is",
  "দশমিক সংখ্যা ৮ ৰ অষ্টাল ৰূপ",
  [["10", "১০"], ["8", "৮"], ["12", "১২"], ["18", "১৮"]], 0,
  "In base eight the digits run only to seven, so eight is written as one zero. The symbol 8 does not exist in octal.",
  "ভিত্তি আঠত অংক কেবল সাতলৈকে, সেয়ে আঠক এক শূন্য লিখা হয়। অষ্টালত ৮ চিহ্ন নাই।");

add("computer-165",
  "Which of the following is a database constraint that prevents null values?",
  "শূন্য মান ৰোধ কৰা ডাটাবেছ বাধ্যতামূলক চৰ্তটো",
  [["NOT NULL", "NOT NULL"], ["UNIQUE only", "কেৱল UNIQUE"], ["DEFAULT", "DEFAULT"], ["INDEX", "INDEX"]], 0,
  "NOT NULL forces a value in every row. UNIQUE prevents duplicates but still permits a null in many systems.",
  "NOT NULL এ প্ৰতিটো শাৰীত মান বাধ্যতামূলক কৰে। UNIQUE এ নকল ৰোধ কৰে কিন্তু বহু চিষ্টেমত শূন্য মান দিব পাৰি।");

add("computer-166",
  "The binary number 100000 has the decimal value",
  "দ্বিমিক সংখ্যা ১০০০০০ ৰ দশমিক মান",
  [["32", "৩২"], ["16", "১৬"], ["64", "৬৪"], ["8", "৮"]], 0,
  "A one followed by five zeros sets the two to the fifth place, which is thirty-two.",
  "একৰ পিছত পাঁচটা শূন্য মানে দুইৰ ঘাত পাঁচ স্থানত এক, অৰ্থাৎ বত্ৰিশ।");

add("computer-167",
  "In a table of students, the column that stores the date of birth is a",
  "শিক্ষাৰ্থীৰ তালিকাত জন্ম তাৰিখ ৰখা স্তম্ভটো এটা",
  [["field", "ক্ষেত্ৰ"], ["record", "অভিলেখ"], ["primary key", "প্ৰাথমিক চাবি"], ["relation", "সম্পৰ্ক"]], 0,
  "A column is a field describing one attribute. A whole row about one student is a record.",
  "স্তম্ভ এটা ক্ষেত্ৰ যি এটা গুণ বৰ্ণনা কৰে। এজন শিক্ষাৰ্থীৰ গোটেই শাৰী এটা অভিলেখ।");

add("computer-168",
  "The result of subtracting 1 from the binary number 1000 is",
  "দ্বিমিক সংখ্যা ১০০০ ৰপৰা ১ বিয়োগ কৰিলে পোৱা ফল",
  [["111", "১১১"], ["0111 only", "কেৱল ০১১১"], ["1001", "১০০১"], ["999", "৯৯৯"]], 0,
  "Eight minus one is seven, which is 111 in binary. Nine would be addition, not subtraction.",
  "আঠ বিয়োগ এক = সাত, যি দ্বিমিকে ১১১। ন হ'লে যোগ হ'ব, বিয়োগ নহয়।");

add("computer-169",
  "A view in a database is",
  "ডাটাবেছত ভিউ হ'ল",
  [["a stored query that behaves like a virtual table", "সাঁচি ৰখা প্ৰশ্ন যি আভাসিক তালিকা যেন কাম কৰে"], ["a copy of the whole database", "গোটেই ডাটাবেছৰ নকল"], ["a type of index", "এবিধ সূচী"], ["a backup file", "এটা বেকআপ ফাইল"]], 0,
  "A view holds no data of its own; it runs its query and shows the result, which also limits what a user can see.",
  "ভিউৱে নিজৰ তথ্য নৰাখে; ই প্ৰশ্ন চলাই ফল দেখুৱায়, যিয়ে ব্যৱহাৰকাৰীয়ে দেখা সমলো সীমিত কৰে।");

add("computer-170",
  "The hexadecimal digit F has the decimal value",
  "হেক্সাডেচিমেল অংক F ৰ দশমিক মান",
  [["15", "১৫"], ["16", "১৬"], ["10", "১০"], ["5", "৫"]], 0,
  "The digits run 0 to 9 and then A to F, so F is the sixteenth value counting from zero, that is fifteen.",
  "অংক শূন্যৰপৰা ন, তাৰ পিছত A ৰপৰা F, সেয়ে F শূন্যৰপৰা গণি ষোল্লতম, অৰ্থাৎ পোন্ধৰ।");

add("computer-171",
  "Which normal form removes partial dependency on a composite primary key?",
  "কোন নৰ্মেল ৰূপে যৌগিক প্ৰাথমিক চাবিৰ আংশিক নিৰ্ভৰতা আঁতৰায়",
  [["second normal form", "দ্বিতীয় নৰ্মেল ৰূপ"], ["first normal form", "প্ৰথম নৰ্মেল ৰূপ"], ["third normal form", "তৃতীয় নৰ্মেল ৰূপ"], ["fourth normal form", "চতুৰ্থ নৰ্মেল ৰূপ"]], 0,
  "Second normal form requires every non-key attribute to depend on the whole key, not part of it. First normal form only removes repeating groups.",
  "দ্বিতীয় নৰ্মেল ৰূপত প্ৰতিটো অ-চাবি গুণ গোটেই চাবিৰ ওপৰত নিৰ্ভৰ কৰিব লাগে, তাৰ অংশৰ ওপৰত নহয়। প্ৰথমটোৱে কেবল পুনৰাবৃত্ত গোট আঁতৰায়।");

add("computer-172",
  "The binary equivalent of the decimal number 7 is",
  "দশমিক সংখ্যা ৭ ৰ দ্বিমিক ৰূপ",
  [["111", "১১১"], ["101", "১০১"], ["110", "১১০"], ["1000", "১০০০"]], 0,
  "Seven is four plus two plus one, so the first three bits are set. Eight would be 1000.",
  "সাত মানে চাৰি যোগ দুই যোগ এক, সেয়ে প্ৰথম তিনি বিটত এক। আঠ হ'লে ১০০০।");

add("computer-173",
  "An index in a database is created mainly to",
  "ডাটাবেছত সূচী সজা হয় মূলতঃ কিৰ বাবে",
  [["speed up searches on that column", "সেই স্তম্ভত সন্ধান দ্ৰুত কৰিবলৈ"], ["save disk space", "ডিস্কৰ ঠাই ৰাখিবলৈ"], ["encrypt the column", "স্তম্ভ এনক্ৰিপ্ট কৰিবলৈ"], ["delete duplicate rows", "নকল শাৰী মচিবলৈ"]], 0,
  "An index is a lookup structure that shortens the search, at the cost of extra space and slower writes.",
  "সূচী এটা সন্ধান গঠন যি খোজ কমায়, কিন্তু অতিৰিক্ত ঠাই লাগে আৰু লিখা ধীৰ হয়।");

add("computer-174",
  "The hexadecimal equivalent of the binary number 1111 is",
  "দ্বিমিক সংখ্যা ১১১১ ৰ হেক্সাডেচিমেল ৰূপ",
  [["F", "F"], ["E", "E"], ["10", "১০"], ["15", "১৫"]], 0,
  "Four binary ones make fifteen, and fifteen is written F in hexadecimal. Writing 15 mixes the two bases.",
  "চাৰিটা দ্বিমিক একে পোন্ধৰ কৰে, আৰু পোন্ধৰক হেক্সাডেচিমেলত F লিখা হয়। ১৫ লিখিলে দুয়ো ভিত্তি মিলি যায়।");

add("computer-175",
  "Which of the following is not a type of database model?",
  "তলৰ কোনটো ডাটাবেছ আৰ্হি নহয়",
  [["spreadsheet model", "স্প্ৰেডশ্বীট আৰ্হি"], ["relational model", "সম্পৰ্কীয় আৰ্হি"], ["hierarchical model", "শ্ৰেণীবদ্ধ আৰ্হি"], ["network model", "নেটৱৰ্ক আৰ্হি"]], 0,
  "The classic models are relational, hierarchical, network and object oriented. A spreadsheet is a tool, not a database model.",
  "প্ৰচলিত আৰ্হি সম্পৰ্কীয়, শ্ৰেণীবদ্ধ, নেটৱৰ্ক আৰু বস্তুগত। স্প্ৰেডশ্বীট এটা সজুলি, ডাটাবেছ আৰ্হি নহয়।");

add("computer-176",
  "The decimal number 100 in binary is",
  "দশমিক সংখ্যা ১০০ ৰ দ্বিমিক ৰূপ",
  [["1100100", "১১০০১০০"], ["1100010", "১১০০০১০"], ["1010100", "১০১০১০০"], ["1000100", "১০০০১০০"]], 0,
  "One hundred is sixty-four plus thirty-two plus four, which sets those three bits in a seven-bit number, giving 1100100.",
  "এশ মানে চৌষষ্ঠি যোগ বত্ৰিশ যোগ চাৰি, সেয়ে সাত বিটৰ সংখ্যাত সেই তিনি বিটত এক, অৰ্থাৎ ১১০০১০০।");

add("computer-177",
  "A relation in a relational database must have",
  "সম্পৰ্কীয় ডাটাবেছত সম্পৰ্ক এটাত থাকিব লাগে",
  [["no duplicate rows", "নকল শাৰী নাথাকিব"], ["at least one image column", "অন্ততঃ এটা ছবি স্তম্ভ"], ["exactly one row", "ঠিক এটা শাৰী"], ["no primary key ever", "কেতিয়াও প্ৰাথমিক চাবি নাথাকিব"]], 0,
  "A true relation is a set, so identical rows cannot repeat. Every table normally also has a primary key.",
  "প্ৰকৃত সম্পৰ্ক এটা সমষ্টি, সেয়ে একেই শাৰী পুনৰ নহয়। প্ৰতিটো তালিকাত সাধাৰণতে প্ৰাথমিক চাবিও থাকে।");

add("computer-178",
  "The value of the binary fraction 0.1 in decimal is",
  "দ্বিমিক ভগ্নাংশ ০.১ ৰ দশমিক মান",
  [["0.5", "০.৫"], ["0.1", "০.১"], ["0.2", "০.২"], ["1.0", "১.০"]], 0,
  "The first place after the binary point means one half, so 0.1 in binary is 0.5 in decimal. Reading it as 0.1 is the common mistake.",
  "দ্বিমিক বিন্দুৰ পিছৰ প্ৰথম স্থান মানে আধা, সেয়ে দ্বিমিক ০.১ = দশমিক ০.৫। ০.১ বুলি পঢ়াটো সাধাৰণ ভুল।");

add("computer-179",
  "A relational database reduces duplication mainly through",
  "সম্পৰ্কীয় ডাটাবেছে পুনৰাবৃত্তি কমায় মূলতঃ কিৰে",
  [["normalisation into related tables", "সম্পৰ্কিত তালিকাত নৰ্মেলাইজেশ্যন কৰি"], ["storing everything in one table", "সকলো এটা তালিকাত ৰাখি"], ["deleting old records", "পুৰণি অভিলেখ মচি"], ["compressing the file", "ফাইল সংকুচিত কৰি"]], 0,
  "Splitting data into related tables and joining them on keys removes repeated facts. One big table invites redundancy.",
  "তথ্য সম্পৰ্কিত তালিকাত ভাগ কৰি চাবিত জোড়ালে পুনৰাবৃত্ত তথ্য আঁতৰে। এটা ডাঙৰ তালিকাই বাহুল্য মাতি আনে।");

add("computer-180",
  "The two digits used in the binary system are",
  "দ্বিমিক পদ্ধতিত ব্যৱহৃত দুটা অংক",
  [["0 and 1", "০ আৰু ১"], ["1 and 2", "১ আৰু ২"], ["0 and 9", "০ আৰু ৯"], ["1 and 9", "১ আৰু ৯"]], 0,
  "Binary is base two, so only zero and one exist. That matches the two states of a digital circuit, off and on.",
  "দ্বিমিক ভিত্তি দুই, সেয়ে কেবল শূন্য আৰু এক আছে। ই ডিজিটেল বৰ্তনীৰ দুটা অৱস্থা, বন্ধ আৰু চলিত,ৰ সৈতে মিলে।");

module.exports = { questions: Q };

