#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.nursing-more.js

   Nursing & Paramedical items for the DHS & DME Technical Grade III
   paper. Twelve leaves, thirty each. Every item names its leaf, so the
   builder files it directly instead of guessing from the stem.
   =========================================================== */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  /* Rotate the option order by a value derived from the id so the correct
     key does not sit in slot A for every item. Deterministic, so a rebuild
     always produces the same file. */
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

/* ================= fundamentals-nursing ================= */
useLeaf("fundamentals-nursing");

add("nursing-001",
  "The normal adult resting pulse rate per minute is",
  "প্ৰাপ্তবয়স্কৰ বিশ্ৰাম অৱস্থাত প্ৰতি মিনিটত স্বাভাৱিক নাড়ীৰ গতি",
  [["60 to 100", "৬০ ৰপৰা ১০০"], ["40 to 60", "৪০ ৰপৰা ৬০"], ["100 to 140", "১০০ ৰপৰা ১৪০"], ["20 to 40", "২০ ৰপৰা ৪০"]], 0,
  "Sixty to a hundred beats a minute is the adult range. Below sixty is bradycardia and above a hundred is tachycardia.",
  "প্ৰাপ্তবয়স্কৰ বাবে ষাঠিৰপৰা এশ এটা মিনিটত স্বাভাৱিক। ষাঠিৰ তলত ব্ৰেডিকাৰ্ডিয়া আৰু এশৰ ওপৰত টেকিকাৰ্ডিয়া।");

add("nursing-002",
  "The position used to promote drainage of bronchial secretions is",
  "ব্ৰংকিয়েল শ্লেষ্মা নিষ্কাশনত সহায় কৰা অৱস্থানটো",
  [["Fowler's position", "ফাউলাৰ অৱস্থান"], ["supine position", "উত্তান অৱস্থান"], ["Trendelenburg position", "ট্ৰেণ্ডেলেনবাৰ্গ অৱস্থান"], ["prone position", "প্ৰ'ন অৱস্থান"]], 0,
  "Sitting upright in Fowler's position lets gravity help the lungs drain and eases breathing. Trendelenburg tilts the body head-down, which worsens breathing.",
  "ফাউলাৰ অৱস্থানত সোজা বহিলে মহাকৰ্ষণে ফুসফুসৰ নিষ্কাশনত সহায় কৰি উশাহ লোৱা সহজ কৰে। ট্ৰেণ্ডেলেনবাৰ্গত মূৰ তলত যায়, যিয়ে উশাহ বেয়া কৰে।");

add("nursing-003",
  "Before administering any medicine, the nurse must verify",
  "কোনো ঔষধ দিয়াৰ আগতে নাৰ্ছে নিশ্চিত কৰিব লাগে",
  [["the five rights of medication", "ঔষধৰ পাঁচটা অধিকাৰ"], ["the patient's home address", "ৰোগীৰ ঘৰৰ ঠিকনা"], ["the ward cleaning roster", "ৱাৰ্ড পৰিষ্কাৰৰ তালিকা"], ["the visitor list", "দৰ্শনাৰ্থীৰ তালিকা"]], 0,
  "Right patient, drug, dose, route and time prevent most medication errors. Address and visitor lists have no bearing on the dose given.",
  "শুদ্ধ ৰোগী, ঔষধ, মাত্ৰা, পথ আৰু সময়ে বেছিভাগ ঔষধ ভুল ৰোধ কৰে। ঠিকনা আৰু দৰ্শনাৰ্থী তালিকাৰ ঔষধৰ সৈতে সম্পৰ্ক নাই।");

add("nursing-004",
  "The normal oral body temperature of a healthy adult is about",
  "সুস্থ প্ৰাপ্তবয়স্কৰ মুখেৰে জোখা স্বাভাৱিক শৰীৰৰ উষ্ণতা প্ৰায়",
  [["37 degrees Celsius", "৩৭ ডিগ্ৰী চেলছিয়াছ"], ["35 degrees Celsius", "৩৫ ডিগ্ৰী চেলছিয়াছ"], ["40 degrees Celsius", "৪০ ডিগ্ৰী চেলছিয়াছ"], ["32 degrees Celsius", "৩২ ডিগ্ৰী চেলছিয়াছ"]], 0,
  "Thirty-seven Celsius, or 98.6 Fahrenheit, is the accepted oral average. Thirty-five is hypothermia and forty is high fever.",
  "৩৭ চেলছিয়াছ, অৰ্থাৎ ৯৮.৬ ফাৰেনহাইট, গ্ৰহণযোগ্য গড়। ৩৫ হাইপ'থাৰ্মিয়া আৰু ৪০ উচ্চ জ্বৰ।");

add("nursing-005",
  "Asepsis means",
  "এচেপছিছ মানে",
  [["absence of pathogenic micro-organisms", "ৰোগসৃষ্টিকাৰী অণুজীৱৰ অনুপস্থিতি"], ["presence of any bacteria", "যিকোনো বেক্টেৰিয়াৰ উপস্থিতি"], ["use of hot water only", "কেৱল গৰম পানী ব্যৱহাৰ"], ["cleaning with soap only", "কেৱল চাবোনেৰে পৰিষ্কাৰ"]], 0,
  "Asepsis is the state of being free from pathogens. Soap and water clean but do not by themselves make a field aseptic.",
  "এচেপছিছ হ'ল ৰোগসৃষ্টিকাৰী জীৱাণুৰপৰা মুক্ত অৱস্থা। চাবোন আৰু পানীয়ে পৰিষ্কাৰ কৰে কিন্তু নিজেই ক্ষেত্ৰ এচেপ্টিক নকৰে।");

add("nursing-006",
  "The route by which a drug acts most rapidly is",
  "কোন পথেৰে ঔষধ আটাই দ্ৰুত ক্ৰিয়া কৰে",
  [["intravenous", "অন্তঃশিৰা"], ["oral", "মুখে"], ["subcutaneous", "ত্বকৰ তলত"], ["topical", "বাহ্যিক"]], 0,
  "An intravenous dose enters the bloodstream at once, so it acts within seconds. An oral dose must first be absorbed from the gut.",
  "অন্তঃশিৰা মাত্ৰা লগে লগে ৰক্তত প্ৰৱেশ কৰে, সেয়ে ছেকেণ্ডতে ক্ৰিয়া কৰে। মুখে দিয়া মাত্ৰা প্ৰথমে অন্ত্ৰৰপৰা শোষিত হ'ব লাগে।");

add("nursing-007",
  "A pressure sore is most likely to develop over",
  "চাপৰ ঘা আটাই বেছি সম্ভাৱনা ক'ত হয়",
  [["the sacrum", "ছেক্ৰামত"], ["the forehead", "কপালত"], ["the palm", "হাতৰ তলুৱাত"], ["the abdomen", "পেটত"]], 0,
  "The sacrum bears body weight against the bed, so pressure cuts off blood flow there first. The palm and forehead are rarely weight-bearing.",
  "ছেক্ৰামে বিছনাত শৰীৰৰ ভাৰ বহন কৰে, সেয়ে তাত ৰক্তস্ৰোত প্ৰথমে বন্ধ হয়। হাতৰ তলুৱা আৰু কপালে ভাৰ নবহে।");

add("nursing-008",
  "The nurse should count respirations",
  "নাৰ্ছে উশাহ-নিশাহ গণিব লাগে",
  [["without telling the patient", "ৰোগীক নোকোৱাকৈ"], ["after announcing the count", "গণা ঘোষণা কৰি"], ["only during sleep", "কেৱল টোপনিত"], ["only after exercise", "কেৱল ব্যায়ামৰ পিছত"]], 0,
  "Telling the patient makes breathing conscious and changes the rate. Counting quietly after the pulse gives a true reading.",
  "ৰোগীক ক'লে উশাহ সচেতন হৈ গতি সলনি হয়। নাড়ীৰ পিছত মনে মনে গণিলে প্ৰকৃত মান পোৱা যায়।");

add("nursing-009",
  "The purpose of a urinary catheter is to",
  "মূত্ৰ কেথেটাৰৰ উদ্দেশ্য",
  [["drain urine when normal voiding is not possible", "স্বাভাৱিকভাৱে মূত্ৰ ত্যাগ সম্ভৱ নহ'লে নিষ্কাশন কৰা"], ["increase urine production", "মূত্ৰ উৎপাদন বঢ়োৱা"], ["sterilise the bladder permanently", "মূত্ৰাশয় স্থায়ীভাৱে জীৱাণুমুক্ত কৰা"], ["measure blood pressure", "ৰক্তচাপ জোখা"]], 0,
  "The catheter is a drainage tube, not a treatment for the cause. It does not raise urine output or sterilise the bladder.",
  "কেথেটাৰ এটা নিষ্কাশন নলী, কাৰণৰ চিকিৎসা নহয়। ই মূত্ৰ উৎপাদন নবঢ়ায় বা মূত্ৰাশয় জীৱাণুমুক্ত নকৰে।");

add("nursing-010",
  "Hand hygiene is performed mainly to",
  "হাত পৰিষ্কাৰ কৰা হয় মূলতঃ কিৰ বাবে",
  [["break the chain of infection", "সংক্ৰমণৰ শৃংখল ভাঙিবলৈ"], ["keep the hands soft", "হাত কোমল ৰাখিবলৈ"], ["save water", "পানী সঞ্চয় কৰিবলৈ"], ["improve handwriting", "হস্তাক্ষৰ উন্নত কৰিবলৈ"]], 0,
  "Hands are the commonest vehicle for organisms between patients, so cleaning them cuts transmission at its main point.",
  "হাতে ৰোগীৰ মাজত জীৱাণু নিয়াৰ আটাই সাধাৰণ বাহন, সেয়ে পৰিষ্কাৰ কৰিলে মূল স্থানত সংক্ৰমণ ৰয়।");

add("nursing-011",
  "The normal adult respiratory rate per minute is",
  "প্ৰাপ্তবয়স্কৰ প্ৰতি মিনিটত স্বাভাৱিক উশাহ-নিশাহৰ হাৰ",
  [["12 to 20", "১২ ৰপৰা ২০"], ["4 to 8", "৪ ৰপৰা ৮"], ["30 to 40", "৩০ ৰপৰা ৪০"], ["22 to 28", "২২ ৰপৰা ২৮"]], 0,
  "Twelve to twenty breaths a minute is normal for adults. Below twelve suggests depression of breathing and above twenty tachypnoea.",
  "প্ৰাপ্তবয়স্কৰ বাবে বাৰৰপৰা বিশ উশাহ স্বাভাৱিক। বাৰৰ তলত উশাহ কমা আৰু বিশৰ ওপৰত টেকিপ্নিয়া।");

add("nursing-012",
  "A patient on bed rest should be turned at least",
  "বিছনাত বিশ্ৰাম কৰা ৰোগীক অন্ততঃ কিমান সময়ৰ মূৰে মূৰে লুটিয়াব লাগে",
  [["every two hours", "প্ৰতি দুই ঘণ্টাত"], ["every twelve hours", "প্ৰতি বাৰ ঘণ্টাত"], ["once a day", "দিনত এবাৰ"], ["every eight hours", "প্ৰতি আঠ ঘণ্টাত"]], 0,
  "Two-hourly turning relieves pressure before skin damage begins. Longer gaps let ischaemia progress to a sore.",
  "দুই ঘণ্টাৰ মূৰে লুটিয়ালে ছাল নষ্ট হোৱাৰ আগতে চাপ কমে। বেছি ব্যৱধানত ৰক্তহীনতা বাঢ়ি ঘা হয়।");

add("nursing-013",
  "The term pyrexia means",
  "পাইৰেক্সিয়া শব্দই বুজায়",
  [["fever", "জ্বৰ"], ["low blood pressure", "নিম্ন ৰক্তচাপ"], ["slow pulse", "ধীৰ নাড়ী"], ["difficulty in breathing", "উশাহ লোৱাত কষ্ট"]], 0,
  "Pyrexia is a raised body temperature. Hypotension is low pressure and dyspnoea is difficult breathing.",
  "পাইৰেক্সিয়া হ'ল শৰীৰৰ উষ্ণতা বঢ়া। হাইপ'টেনছন নিম্ন চাপ আৰু ডিছপ্নিয়া উশাহৰ কষ্ট।");

add("nursing-014",
  "Before a patient is shifted to the operating theatre, the nurse must confirm",
  "ৰোগীক অস্ত্ৰোপচাৰ কক্ষলৈ নিয়াৰ আগতে নাৰ্ছে নিশ্চিত কৰিব লাগে",
  [["informed consent is signed", "অৱগত সন্মতি স্বাক্ষৰিত"], ["the ward floor is swept", "ৱাৰ্ডৰ মজিয়া সৰা"], ["the visitors have left the building", "দৰ্শনাৰ্থীয়ে অট্টালিকা এৰিছে"], ["the linen is folded", "কাপোৰ ভাঁ‌জ কৰা"]], 0,
  "Surgery without valid consent is unlawful, so the signature is checked before transfer. The other items are housekeeping.",
  "বৈধ সন্মতি নোহোৱাকৈ অস্ত্ৰোপচাৰ অবৈধ, সেয়ে নিয়াৰ আগতে স্বাক্ষৰ পৰীক্ষা কৰা হয়। বাকীবোৰ ঘৰুৱা কাম।");

add("nursing-015",
  "Which solution is isotonic with blood plasma?",
  "কোন দ্ৰৱ ৰক্ত প্লাজমাৰ সৈতে সমপৰিসৰীয়",
  [["0.9 per cent sodium chloride", "০.৯ শতাংশ ছডিয়াম ক্ল'ৰাইড"], ["5 per cent glucose only", "কেৱল ৫ শতাংশ গ্লুক'জ"], ["distilled water", "ডিষ্টিল্ড পানী"], ["3 per cent sodium chloride", "৩ শতাংশ ছডিয়াম ক্ল'ৰাইড"]], 0,
  "Normal saline at 0.9 per cent matches plasma osmolarity. Three per cent saline is hypertonic and distilled water is hypotonic.",
  "০.৯ শতাংশ সাধাৰণ লুণীয়া পানীয়ে প্লাজমাৰ অছিম'লাৰিটিৰ সৈতে মিলে। ৩ শতাংশ অতি-পৰিসৰীয় আৰু ডিষ্টিল্ড পানী নিম্ন-পৰিসৰীয়।");

add("nursing-016",
  "The best site to check the pulse of an unconscious adult in an emergency is the",
  "জৰুৰীকালীন অৱস্থাত অচেতন প্ৰাপ্তবয়স্কৰ নাড়ী চোৱাৰ আটাই ভাল স্থান",
  [["carotid artery", "কেৰ'টিড ধমনী"], ["radial artery", "ৰেডিয়েল ধমনী"], ["popliteal artery", "পপ্লিটিয়েল ধমনী"], ["dorsalis pedis", "ডৰ্ছেলিছ পেডিছ"]], 0,
  "The carotid lies close to the surface in the neck and stays palpable when peripheral circulation fails. The radial may be too weak to feel.",
  "কেৰ'টিড ডিঙিত পৃষ্ঠৰ ওচৰত আৰু পেৰিফেৰেল সংবহন বন্ধ হ'লেও অনুভৱ হয়। ৰেডিয়েল অতি দুৰ্বল হ'ব পাৰে।");

add("nursing-017",
  "A nasogastric tube is inserted mainly to",
  "নেজ'গেষ্ট্ৰিক নলী মূলতঃ কিৰ বাবে ভৰোৱা হয়",
  [["feed or decompress the stomach", "পেটত খাদ্য দিয়া বা চাপ কমোৱা"], ["measure blood glucose", "ৰক্ত গ্লুক'জ জোখা"], ["drain the bladder", "মূত্ৰাশয় নিষ্কাশন কৰা"], ["give oxygen", "অক্সিজেন দিয়া"]], 0,
  "The tube reaches the stomach through the nose, so it can deliver feed or drain gas and fluid. Oxygen goes by mask or cannula.",
  "নলী নাকেদি পেটলৈ যায়, সেয়ে খাদ্য দিব বা গেছ-তৰল নিষ্কাশন কৰিব পাৰে। অক্সিজেন মাস্ক বা কেনুলাৰে দিয়া হয়।");

add("nursing-018",
  "The correct technique for a bed bath includes",
  "বিছনা স্নানৰ শুদ্ধ কৌশলত আছে",
  [["washing from clean to dirty areas and drying well", "পৰিষ্কাৰৰপৰা অশুদ্ধলৈ ধুই ভালদৰে মচা"], ["using cold water only", "কেৱল ঠাণ্ডা পানী ব্যৱহাৰ"], ["leaving the skin wet", "ছাল তিতা ৰখা"], ["bathing only the face", "কেৱল মুখ ধুৱা"]], 0,
  "Clean-to-dirty order avoids spreading organisms, and drying prevents maceration that leads to skin breakdown.",
  "পৰিষ্কাৰৰপৰা অশুদ্ধলৈ ক্ৰমে জীৱাণু নিবিয়পা ৰোধ কৰে, আৰু মচিলে ছাল তিতা হৈ নষ্ট হোৱাৰপৰা ৰক্ষা কৰে।");

add("nursing-019",
  "The normal range of adult blood pressure is",
  "প্ৰাপ্তবয়স্কৰ স্বাভাৱিক ৰক্তচাপৰ পৰিসৰ",
  [["120/80 mm Hg", "১২০/৮০ মি.মি. পাৰা"], ["90/60 mm Hg", "৯০/৬০ মি.মি. পাৰা"], ["160/100 mm Hg", "১৬০/১০০ মি.মি. পাৰা"], ["80/40 mm Hg", "৮০/৪০ মি.মি. পাৰা"]], 0,
  "Around 120 over 80 is the accepted adult reference. Ninety over sixty is the lower edge of normal and 160 over 100 is hypertension.",
  "১২০/৮০ প্ৰাপ্তবয়স্কৰ গ্ৰহণযোগ্য মান। ৯০/৬০ স্বাভাৱিকৰ তলৰ সীমা আৰু ১৬০/১০০ উচ্চ ৰক্তচাপ।");

add("nursing-020",
  "A nurse records intake and output mainly to assess",
  "নাৰ্ছে গ্ৰহণ আৰু নিষ্কাশন লিখি ৰখে মূলতঃ কি মূল্যাংকন কৰিবলৈ",
  [["fluid and electrolyte balance", "তৰল আৰু ইলেক্ট্ৰ'লাইটৰ ভাৰসাম্য"], ["the patient's mood", "ৰোগীৰ মনোভাৱ"], ["visiting hours", "দৰ্শনৰ সময়"], ["staff duty roster", "কৰ্মচাৰীৰ কৰ্তব্য তালিকা"]], 0,
  "Comparing what goes in with what comes out shows whether the kidneys and circulation are keeping fluid in balance.",
  "যি সোমায় আৰু যি ওলায় তুলনা কৰিলে বৃক্ক আৰু সংবহনে তৰল ভাৰসাম্য ৰাখিছে নে নাই জনা যায়।");

add("nursing-021",
  "Sterilisation differs from disinfection because sterilisation",
  "জীৱাণুমুক্তকৰণে কীটাণুনাশনতকৈ বেলেগ কাৰণ জীৱাণুমুক্তকৰণে",
  [["destroys all micro-organisms including spores", "বীজাণুকে ধৰি সকলো অণুজীৱ নষ্ট কৰে"], ["only removes dust", "কেৱল ধূলি আঁতৰায়"], ["only kills bacteria on skin", "কেৱল ছালৰ বেক্টেৰিয়া মাৰে"], ["is done with soap", "চাবোনেৰে কৰা হয়"]], 0,
  "Sterilisation kills spores as well, which disinfection may not. That is why surgical instruments are sterilised, not merely disinfected.",
  "জীৱাণুমুক্তকৰণে বীজাণুও মাৰে, যি কীটাণুনাশনে নোৱাৰিবও পাৰে। সেয়ে শল্য সজুলি কেবল কীটাণুনাশন নকৰি জীৱাণুমুক্ত কৰা হয়।");

add("nursing-022",
  "The first step in the nursing process is",
  "নাৰ্ছিং প্ৰক্ৰিয়াৰ প্ৰথম খোজ",
  [["assessment", "মূল্যাংকন"], ["planning", "পৰিকল্পনা"], ["implementation", "কাৰ্যকৰণ"], ["evaluation", "মূল্যায়ন"]], 0,
  "Assessment gathers the data on which every later step depends. Planning without data would be guesswork.",
  "মূল্যাংকনে তথ্য সংগ্ৰহ কৰে যাৰ ওপৰত পিছৰ প্ৰতিটো খোজ নিৰ্ভৰ কৰে। তথ্য নোহোৱাকৈ পৰিকল্পনা অনুমান হ'ব।");

add("nursing-023",
  "Which of the following is a sign of dehydration?",
  "তলৰ কোনটো পানীশূন্যতাৰ চিন",
  [["dry mucous membranes and reduced urine output", "শুকান শ্লেষ্মা আৰু কম মূত্ৰ"], ["swollen ankles", "ভৰিৰ গাঁ‌ঠি ওফন্দি উঠা"], ["increased urine output", "মূত্ৰ বঢ়া"], ["moist skin", "তিতা ছাল"]], 0,
  "Less fluid means less urine and dry membranes. Swollen ankles point to fluid overload, the opposite problem.",
  "কম তৰলে কম মূত্ৰ আৰু শুকান শ্লেষ্মা দিয়ে। ভৰিৰ গাঁ‌ঠি ওফন্দি উঠা অতি তৰলৰ চিন, ওলোটা সমস্যা।");

add("nursing-024",
  "The purpose of a vapour pressure or steam steriliser is to",
  "ভাপ চাপ জীৱাণুমুক্তকৰণ যন্ত্ৰৰ উদ্দেশ্য",
  [["sterilise heat-stable items by moist heat", "তাপ সহনীয় সজুলি আৰ্দ্ৰ তাপেৰে জীৱাণুমুক্ত কৰা"], ["dry linen quickly", "কাপোৰ সোনকালে শুকুৱা"], ["cool the ward", "ৱাৰ্ড শীতল কৰা"], ["distil water", "পানী ডিষ্টিল কৰা"]], 0,
  "Moist heat under pressure reaches the temperature that kills spores. Heat-sensitive items would be damaged and need another method.",
  "চাপত আৰ্দ্ৰ তাপে বীজাণু মৰা উষ্ণতাত পায়। তাপ-সংবেদনশীল সজুলি নষ্ট হ'ব, সেয়ে আন পদ্ধতি লাগে।");

add("nursing-025",
  "A patient with a high fever should be given",
  "উচ্চ জ্বৰ থকা ৰোগীক দিব লাগে",
  [["plenty of fluids and light clothing", "প্ৰচুৰ তৰল আৰু পাতল কাপোৰ"], ["heavy blankets and no fluids", "ডাঠ কম্বল আৰু তৰল নাই"], ["cold water immersion always", "সদায় ঠাণ্ডা পানীত ডুবাই ৰখা"], ["no observation", "কোনো পৰ্যবেক্ষণ নাই"]], 0,
  "Fever raises fluid loss, so replacement and cooling by light clothing help. Heavy blankets trap heat and worsen the temperature.",
  "জ্বৰে তৰল ক্ষয় বঢ়ায়, সেয়ে তৰল আৰু পাতল কাপোৰে শীতল কৰাত সহায় কৰে। ডাঠ কম্বলে তাপ ধৰি উষ্ণতা বঢ়ায়।");

add("nursing-026",
  "Which of the following best describes informed consent?",
  "তলৰ কোনটোৱে অৱগত সন্মতি ভালদৰে বৰ্ণনা কৰে",
  [["the patient agrees after understanding the procedure and its risks", "প্ৰক্ৰিয়া আৰু তাৰ বিপদ বুজি ৰোগীয়ে সন্মতি দিয়ে"], ["a relative signs without asking the patient", "ৰোগীক নোসোধাকৈ সম্পৰ্কীয়ে স্বাক্ষৰ কৰে"], ["the nurse signs for the patient", "নাৰ্ছে ৰোগীৰ হৈ স্বাক্ষৰ কৰে"], ["consent given after the surgery", "অস্ত্ৰোপচাৰৰ পিছত দিয়া সন্মতি"]], 0,
  "Consent must be voluntary, informed and given before the procedure. Signature by staff or after the event has no legal value.",
  "সন্মতি স্বেচ্ছাই, তথ্যসহ আৰু প্ৰক্ৰিয়াৰ আগতে হ'ব লাগে। কৰ্মচাৰীৰ স্বাক্ষৰ বা পিছৰ সন্মতিৰ আইনী মূল্য নাই।");

add("nursing-027",
  "The term 'nil by mouth' before surgery means the patient must",
  "অস্ত্ৰোপচাৰৰ আগতে 'মুখে একো নহয়' মানে ৰোগীয়ে",
  [["take nothing orally for the advised period", "কোৱা সময়লৈ মুখে একো নল'ব"], ["drink only water", "কেৱল পানী খাব"], ["eat a light meal", "পাতল আহাৰ খাব"], ["take only medicine", "কেৱল ঔষধ ল'ব"]], 0,
  "An empty stomach prevents vomiting and aspiration during anaesthesia. Water and medicine also count as oral intake unless ordered.",
  "পেট খালী থাকিলে এনেছথেছিয়াৰ সময়ত বমি আৰু শ্বাসনলীত সোমোৱা ৰোধ হয়। নিৰ্দেশ নহ'লে পানী আৰু ঔষধো মুখে গ্ৰহণ গণ্য।");

add("nursing-028",
  "Which observation is most important immediately after a blood transfusion begins?",
  "ৰক্ত সঞ্চাৰণ আৰম্ভ হোৱাৰ লগে লগে কোন পৰ্যবেক্ষণ আটাই গুৰুত্বপূৰ্ণ",
  [["vital signs for a reaction", "প্ৰতিক্ৰিয়াৰ বাবে জীৱন চিহ্ন"], ["the patient's weight", "ৰোগীৰ ওজন"], ["the room temperature", "কোঠাৰ উষ্ণতা"], ["the linen count", "কাপোৰৰ গণনা"]], 0,
  "A transfusion reaction shows first in temperature, pulse and blood pressure, so these are checked in the first minutes.",
  "ৰক্ত সঞ্চাৰণৰ প্ৰতিক্ৰিয়া প্ৰথমে উষ্ণতা, নাড়ী আৰু ৰক্তচাপত দেখা যায়, সেয়ে প্ৰথম মিনিটবোৰত এইবোৰ চোৱা হয়।");

add("nursing-029",
  "The correct way to lift a patient is to",
  "ৰোগীক দাঙাৰ শুদ্ধ উপায়",
  [["bend the knees and keep the back straight", "আঁঠু নমাই পিঠি সোজা ৰখা"], ["bend at the waist only", "কেৱল কঁকালত নমা"], ["twist while lifting", "দাঙোতে ঘূৰোৱা"], ["lift with outstretched arms", "দীঘলকৈ মেলি দিয়া হাতেৰে দাঙা"]], 0,
  "Bending the knees lets the leg muscles take the load and protects the nurse's spine. Bending at the waist and twisting cause back injury.",
  "আঁঠু নমালে ভৰিৰ পেশীয়ে ভাৰ লয় আৰু নাৰ্ছৰ মেৰুদণ্ড ৰক্ষা পায়। কঁকালত নমা আৰু ঘূৰোৱাই পিঠিৰ আঘাত আনে।");

add("nursing-030",
  "A dying patient's mouth is cleaned frequently because",
  "মৃত্যুশয্যাত থকা ৰোগীৰ মুখ সঘনাই পৰিষ্কাৰ কৰা হয় কাৰণ",
  [["dry mouth causes discomfort and infection", "শুকান মুখে অস্বস্তি আৰু সংক্ৰমণ আনে"], ["it improves the appetite", "ই ভোক বঢ়ায়"], ["it lowers the pulse", "ই নাড়ী কমায়"], ["it is required by law", "আইনে দাবী কৰে"]], 0,
  "Reduced fluid intake and mouth breathing dry the mucosa, so frequent cleaning keeps the patient comfortable and cuts infection risk.",
  "কম তৰল আৰু মুখেৰে উশাহে শ্লেষ্মা শুকায়, সেয়ে সঘন পৰিষ্কাৰে ৰোগীক আৰাম দি সংক্ৰমণৰ আশংকা কমায়।");

/* ================= community-health-nursing ================= */
useLeaf("community-health-nursing");

add("nursing-031",
  "The primary focus of community health nursing is",
  "সমাজ স্বাস্থ্য নাৰ্ছিংৰ মূল লক্ষ্য",
  [["health promotion and prevention in the community", "সমাজত স্বাস্থ্য প্ৰসাৰ আৰু প্ৰতিৰোধ"], ["only treating admitted patients", "কেৱল ভৰ্তি ৰোগীৰ চিকিৎসা"], ["running hospital accounts", "চিকিৎসালয়ৰ হিচাপ চলোৱা"], ["purchasing equipment", "সজুলি ক্ৰয় কৰা"]], 0,
  "Community nursing works outside hospital walls, aiming to keep people well rather than only treating the sick.",
  "সমাজ নাৰ্ছিং চিকিৎসালয়ৰ বাহিৰত কাম কৰে, লক্ষ্য ৰোগীক কেবল চিকিৎসা নকৰি মানুহক সুস্থ ৰখা।");

add("nursing-032",
  "The crude birth rate is expressed per",
  "স্থূল জন্ম হাৰ প্ৰতি কিমানত প্ৰকাশ কৰা হয়",
  [["1000 population in a year", "বছৰত ১০০০ লোকত"], ["100 population in a month", "মাহত ১০০ লোকত"], ["10000 population in a decade", "দশকত ১০০০০ লোকত"], ["100000 population in a day", "দিনত ১,০০,০০০ লোকত"]], 0,
  "Births in a year are divided by the mid-year population and multiplied by a thousand. That is the standard convention.",
  "বছৰত জন্মক মধ্য বছৰৰ জনসংখ্যাৰে ভাগ কৰি এহাজাৰেৰে পূৰণ কৰা হয়। এয়েই প্ৰচলিত নিয়ম।");

add("nursing-033",
  "The first level of health care contact for a village is the",
  "গাঁৱৰ বাবে স্বাস্থ্য সেৱাৰ প্ৰথম সংযোগ স্থল",
  [["sub-centre", "উপ-কেন্দ্ৰ"], ["district hospital", "জিলা চিকিৎসালয়"], ["medical college", "চিকিৎসা মহাবিদ্যালয়"], ["regional institute", "আঞ্চলিক প্ৰতিষ্ঠান"]], 0,
  "The sub-centre is the lowest facility, serving a few thousand people close to home. Higher facilities handle referral cases.",
  "উপ-কেন্দ্ৰ আটাই তলৰ সুবিধা, ঘৰৰ ওচৰত কেইহাজাৰ লোকক সেৱা দিয়ে। ওপৰৰ সুবিধাই প্ৰেৰিত ৰোগী চম্ভালে।");

add("nursing-034",
  "Domiciliary midwifery means conducting delivery",
  "ঘৰুৱা প্ৰসূতি সেৱা মানে প্ৰসৱ পৰিচালনা",
  [["at the mother's home", "মাকৰ ঘৰত"], ["only in a hospital", "কেৱল চিকিৎসালয়ত"], ["in a laboratory", "লেবৰেটৰীত"], ["in a pharmacy", "ফাৰ্মাচীত"]], 0,
  "Domiciliary means at home, with the nurse visiting the family. Hospital delivery is institutional, not domiciliary.",
  "ঘৰুৱা মানে ঘৰত, নাৰ্ছে পৰিয়াললৈ গৈ সেৱা দিয়ে। চিকিৎসালয়ৰ প্ৰসৱ প্ৰাতিষ্ঠানিক, ঘৰুৱা নহয়।");

add("nursing-035",
  "The main purpose of a house-to-house survey in community nursing is to",
  "সমাজ নাৰ্ছিংত ঘৰে ঘৰে সমীক্ষাৰ মূল উদ্দেশ্য",
  [["identify health needs and at-risk families", "স্বাস্থ্য প্ৰয়োজন আৰু বিপদাপন্ন পৰিয়াল চিনাক্ত কৰা"], ["collect house tax", "ঘৰ কৰ সংগ্ৰহ কৰা"], ["count livestock", "পশুধন গণা"], ["repair roads", "পথ মেৰামতি কৰা"]], 0,
  "The survey builds a family health register, which then guides which homes need follow-up visits.",
  "সমীক্ষাই পৰিয়াল স্বাস্থ্য পঞ্জী গঢ়ে, যিয়ে তাৰ পিছত কোন ঘৰত অনুসৰণ পৰিদৰ্শন লাগে নিৰ্দেশ কৰে।");

add("nursing-036",
  "Which of the following is a notifiable disease in India?",
  "তলৰ কোনটো ভাৰতত জাননীযোগ্য ৰোগ",
  [["cholera", "কলera"], ["the common cold", "সাধাৰণ ঠাণ্ডা"], ["mild acne", "পাতল ব্ৰণ"], ["dandruff", "খু‌জুৰি"]], 0,
  "Cholera must be reported to the health authority so that outbreak control can start. Colds and skin complaints are not notifiable.",
  "কলera স্বাস্থ্য কৰ্তৃপক্ষক জনাব লাগে যাতে প্ৰাদুৰ্ভাৱ নিয়ন্ত্ৰণ আৰম্ভ হয়। ঠাণ্ডা আৰু ছালৰ সমস্যা জাননীযোগ্য নহয়।");

add("nursing-037",
  "The maternal mortality ratio is the number of maternal deaths per",
  "মাতৃ মৃত্যু অনুপাত প্ৰতি কিমানত গণা হয়",
  [["100000 live births", "১,০০,০০০ জীৱিত জন্মত"], ["1000 population", "১০০০ লোকত"], ["100 live births", "১০০ জীৱিত জন্মত"], ["10000 population", "১০,০০০ লোকত"]], 0,
  "The ratio uses live births as the denominator and is scaled to a lakh. Using total population would mix in unrelated deaths.",
  "অনুপাতত জীৱিত জন্ম হৰ আৰু এলা‌খলৈ বৃদ্ধি কৰা হয়। মুঠ জনসংখ্যা ব্যৱহাৰ কৰিলে অসম্পৰ্কিত মৃত্যু মিলি যাব।");

add("nursing-038",
  "The best indicator of the health status of a community is",
  "সমাজৰ স্বাস্থ্য অৱস্থাৰ আটাই ভাল সূচক",
  [["infant mortality rate", "শিশু মৃত্যু হাৰ"], ["number of doctors", "চিকিৎসকৰ সংখ্যা"], ["number of hospitals", "চিকিৎসালয়ৰ সংখ্যা"], ["number of pharmacies", "ফাৰ্মাচীৰ সংখ্যা"]], 0,
  "Infant mortality reflects nutrition, sanitation, immunisation and maternal care together, so it summarises the whole system.",
  "শিশু মৃত্যু হাৰে পুষ্টি, পৰিচ্ছন্নতা, টিকাকৰণ আৰু মাতৃ সেৱা একেলগে দেখুৱায়, সেয়ে গোটেই ব্যৱস্থা সাৰাংশ দিয়ে।");

add("nursing-039",
  "A community health nurse refers a high-risk pregnancy mainly to",
  "সমাজ স্বাস্থ্য নাৰ্ছে উচ্চ-বিপদ গৰ্ভাৱস্থা মূলতঃ ক'লৈ প্ৰেৰণ কৰে",
  [["a facility with emergency obstetric care", "জৰুৰী প্ৰসূতি সেৱা থকা সুবিধালৈ"], ["the village shop", "গাঁৱৰ দোকানলৈ"], ["the school teacher", "বিদ্যালয়ৰ শিক্ষকলৈ"], ["the post office", "ডাকঘৰলৈ"]], 0,
  "The referral must reach a place able to do a caesarean and give blood, otherwise the delay costs lives.",
  "প্ৰেৰণে চিজাৰিয়ান আৰু ৰক্ত দিব পৰা ঠাই পাব লাগে, নহ'লে পলমে জীৱন হৰে।");

add("nursing-040",
  "The concept of 'at risk' in community health means a group",
  "সমাজ স্বাস্থ্যত 'বিপদাপন্ন' মানে এটা গোট যি",
  [["more likely to develop a health problem", "স্বাস্থ্য সমস্যা হোৱাৰ সম্ভাৱনা বেছি"], ["already fully immunised", "ইতিমধ্যে সম্পূৰ্ণ টিকাকৰণ হোৱা"], ["living in a city", "নগৰত বাস কৰা"], ["working in an office", "কাৰ্যালয়ত কাম কৰা"]], 0,
  "Risk groups are identified so that scarce preventive effort goes where it prevents the most illness.",
  "বিপদ গোট চিনাক্ত কৰা হয় যাতে দুৰ্লভ প্ৰতিৰোধ প্ৰচেষ্টা আটাই বেছি ৰোগ ৰোধ কৰা ঠাইত লাগে।");

add("nursing-041",
  "Which of the following is a primary level of disease prevention?",
  "তলৰ কোনটো ৰোগ প্ৰতিৰোধৰ প্ৰাথমিক স্তৰ",
  [["immunisation", "টিকাকৰণ"], ["physiotherapy after a stroke", "ষ্ট্ৰ'কৰ পিছত ফিজিঅ'থেৰাপী"], ["rehabilitation of a fracture", "ফ্ৰেকচাৰৰ পুনৰ্বাসন"], ["screening for complications", "জটিলতাৰ স্ক্ৰীণিং"]], 0,
  "Primary prevention stops the disease before it starts, and immunisation does exactly that. Therapy and rehab come after disease exists.",
  "প্ৰাথমিক প্ৰতিৰোধে ৰোগ আৰম্ভ হোৱাৰ আগতে ৰোধ কৰে, আৰু টিকাকৰণে ঠিক তাকে কৰে। চিকিৎসা আৰু পুনৰ্বাসন ৰোগৰ পিছত।");

add("nursing-042",
  "The nurse's role in a school health programme includes",
  "বিদ্যালয় স্বাস্থ্য কাৰ্যসূচীত নাৰ্ছৰ ভূমিকা",
  [["health screening and health education", "স্বাস্থ্য পৰীক্ষা আৰু স্বাস্থ্য শিক্ষা"], ["teaching mathematics", "গণিত পঢ়োৱা"], ["managing school funds", "বিদ্যালয়ৰ ধন চলোৱা"], ["repairing furniture", "আচবাব মেৰামতি"]], 0,
  "Screening picks up vision, hearing and growth problems early, and education builds habits that last into adulthood.",
  "পৰীক্ষাই দৃষ্টি, শ্ৰৱণ আৰু বৃদ্ধিৰ সমস্যা সোনকালে ধৰে, আৰু শিক্ষাই প্ৰাপ্তবয়স্ক কাললৈ টিকি থকা অভ্যাস গঢ়ে।");

add("nursing-043",
  "Which of the following best defines epidemiology?",
  "তলৰ কোনটোৱে মহামাৰীবিজ্ঞান ভালদৰে সংজ্ঞায়িত কৰে",
  [["the study of disease distribution and its determinants", "ৰোগৰ বিতৰণ আৰু তাৰ নিৰ্ধাৰকৰ অধ্যয়ন"], ["the study of medicines", "ঔষধৰ অধ্যয়ন"], ["the study of bones", "হাড়ৰ অধ্যয়ন"], ["the study of the mind", "মনৰ অধ্যয়ন"]], 0,
  "Epidemiology asks who gets a disease, where and when, and what drives that pattern. Pharmacology and anatomy are separate subjects.",
  "মহামাৰীবিজ্ঞানে কোনে ৰোগ পায়, ক'ত আৰু কেতিয়া, আৰু কি কাৰণে সেই আৰ্হি চালিত কৰে সোধে। ঔষধবিজ্ঞান আৰু শৰীৰস্থান বেলেগ বিষয়।");

add("nursing-044",
  "Oral rehydration solution is used to treat",
  "মুখেৰে পানীশূন্যতা পূৰণ দ্ৰৱ ব্যৱহাৰ কৰা হয় কিৰ চিকিৎসাত",
  [["diarrhoeal dehydration", "ডায়েৰিয়াৰ পানীশূন্যতা"], ["high blood pressure", "উচ্চ ৰক্তচাপ"], ["fracture", "ফ্ৰেকচাৰ"], ["asthma", "হাঁপানি"]], 0,
  "The salts and glucose in the solution are absorbed together with water, replacing what diarrhoea has taken.",
  "দ্ৰৱৰ লৱণ আৰু গ্লুক'জ পানীৰ সৈতে শোষিত হয়, ডায়েৰিয়াই নিয়া খিনি পূৰণ কৰে।");

add("nursing-045",
  "The nurse advises a family to boil drinking water mainly to",
  "নাৰ্ছে পৰিয়ালক খোৱা পানী উতলাবলৈ কয় মূলতঃ কিৰ বাবে",
  [["kill pathogens causing water-borne disease", "পানীজনিত ৰোগৰ জীৱাণু মাৰিবলৈ"], ["improve the taste", "সোৱাদ উন্নত কৰিবলৈ"], ["add minerals", "খনিজ যোগ কৰিবলৈ"], ["make it colder", "ঠাণ্ডা কৰিবলৈ"]], 0,
  "Boiling destroys bacteria, viruses and cysts that cause cholera, typhoid and dysentery. Taste and minerals are not the concern.",
  "উতলালে কলera, টাইফয়েড আৰু আমাশয়ৰ বেক্টেৰিয়া, ভাইৰাছ আৰু ছিষ্ট নষ্ট হয়। সোৱাদ বা খনিজ কথা নহয়।");

add("nursing-046",
  "Which of the following is a component of primary health care as declared at Alma-Ata?",
  "আলমা-আটাত ঘোষিত প্ৰাথমিক স্বাস্থ্য সেৱাৰ উপাদান কোনটো",
  [["health education", "স্বাস্থ্য শিক্ষা"], ["plastic surgery", "প্লাষ্টিক চাৰ্জাৰী"], ["organ transplant", "অংগ প্ৰতিস্থাপন"], ["MRI scanning", "MRI স্কেনিং"]], 0,
  "Alma-Ata listed health education, nutrition, water and sanitation, maternal and child care, immunisation and essential drugs. High-technology care is not part of it.",
  "আলমা-আটাত স্বাস্থ্য শিক্ষা, পুষ্টি, পানী আৰু পৰিচ্ছন্নতা, মাতৃ-শিশু সেৱা, টিকাকৰণ আৰু অত্যাৱশ্যকীয় ঔষধ আছিল। উচ্চ প্ৰযুক্তিৰ চিকিৎসা তাত নাই।");

add("nursing-047",
  "The nurse records a birth before twenty-eight weeks of gestation as",
  "নাৰ্ছে গৰ্ভধাৰণৰ আঠাইশ সপ্তাহৰ আগতে হোৱা জন্মক কি হিচাপে লিখে",
  [["abortion", "গৰ্ভপাত"], ["full term birth", "পূৰ্ণকালীন জন্ম"], ["post term birth", "অতিপূৰ্ণকালীন জন্ম"], ["normal delivery", "স্বাভাৱিক প্ৰসৱ"]], 0,
  "Loss before twenty-eight weeks is classed as abortion, and after that as a birth. The cut-off matters for mortality statistics.",
  "আঠাইশ সপ্তাহৰ আগতে হেৰুওৱাক গৰ্ভপাত আৰু তাৰ পিছত জন্ম গণা হয়। এই সীমা মৃত্যু পৰিসংখ্যাৰ বাবে গুৰুত্বপূৰ্ণ।");

add("nursing-048",
  "Which of the following is the best way to prevent mosquito-borne disease in a village?",
  "গাঁৱত মশা-বাহিত ৰোগ ৰোধৰ আটাই ভাল উপায়",
  [["removing stagnant water around houses", "ঘৰৰ চাৰিওফালৰ জমা পানী আঁতৰোৱা"], ["spraying perfume", "সুগন্ধি স্প্ৰে কৰা"], ["closing windows at noon", "দুপৰীয়া খিৰিকী বন্ধ কৰা"], ["wearing black clothes", "ক'লা কাপোৰ পিন্ধা"]], 0,
  "Mosquitoes breed in standing water, so removing it destroys the larval habitat and cuts the population at source.",
  "মশাই জমা পানীত প্ৰজনন কৰে, সেয়ে আঁতৰালে পলুৰ বাসস্থান নষ্ট হৈ মূলতে সংখ্যা কমে।");

add("nursing-049",
  "A village health register is maintained mainly to",
  "গাঁৱৰ স্বাস্থ্য পঞ্জী ৰখা হয় মূলতঃ কিৰ বাবে",
  [["track families, births, deaths and immunisations", "পৰিয়াল, জন্ম, মৃত্যু আৰু টিকাকৰণ অনুসৰণ কৰিবলৈ"], ["record rainfall", "বৰষুণ লিখিবলৈ"], ["list shopkeepers", "দোকানীৰ তালিকা কৰিবলৈ"], ["count cattle", "গৰু গণিবলৈ"]], 0,
  "The register turns scattered visits into a continuous picture, which is what makes follow-up and coverage checks possible.",
  "পঞ্জীয়ে ছিন্ন পৰিদৰ্শনক একেৰাহে চিত্ৰলৈ ৰূপান্তৰ কৰে, সেয়ে অনুসৰণ আৰু সামৰিক পৰীক্ষা সম্ভৱ হয়।");

add("nursing-050",
  "Which of the following is a secondary level of prevention?",
  "তলৰ কোনটো প্ৰতিৰোধৰ দ্বিতীয় স্তৰ",
  [["early diagnosis and prompt treatment", "সোনকালে ৰোগ নিৰ্ণয় আৰু তৎকালীন চিকিৎসা"], ["immunisation before exposure", "সংস্পৰ্শৰ আগতে টিকাকৰণ"], ["health education", "স্বাস্থ্য শিক্ষা"], ["safe water supply", "নিৰাপদ পানী যোগান"]], 0,
  "Secondary prevention finds disease early so it can be halted. Immunisation and safe water stop it arising at all.",
  "দ্বিতীয় স্তৰে ৰোগ সোনকালে ধৰি ৰখায়। টিকাকৰণ আৰু নিৰাপদ পানীয়ে ৰোগ হোৱাই নিদিয়ে।");

add("nursing-051",
  "The nurse should advise a pregnant woman to attend antenatal check-ups at least",
  "নাৰ্ছে গৰ্ভৱতী মহিলাক অন্ততঃ কিমান বাৰ প্ৰসৱপূৰ্ব পৰীক্ষা কৰিবলৈ পৰামৰ্শ দিব লাগে",
  [["four times", "চাৰি বাৰ"], ["once only", "কেৱল এবাৰ"], ["ten times", "দহ বাৰ"], ["never", "কেতিয়াও নহয়"]], 0,
  "Four visits catch anaemia, hypertension and malpresentation in time. A single visit cannot track a changing pregnancy.",
  "চাৰি বাৰে ৰক্তহীনতা, উচ্চ ৰক্তচাপ আৰু ভুল অৱস্থান সময়মতে ধৰে। এবাৰে সলনি হোৱা গৰ্ভাৱস্থা অনুসৰণ নকৰে।");

add("nursing-052",
  "The main aim of a nutrition programme in the community is to",
  "সমাজত পুষ্টি কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["prevent malnutrition among vulnerable groups", "দুৰ্বল গোটত কুপুষ্টি ৰোধ কৰা"], ["increase food prices", "খাদ্যৰ দাম বঢ়োৱা"], ["reduce the number of shops", "দোকানৰ সংখ্যা কমোৱা"], ["encourage tobacco use", "তামোল-তামাখু ব্যৱহাৰ উৎসাহিত কৰা"]], 0,
  "Programmes target children, pregnant women and the elderly because these groups suffer most when intake is poor.",
  "কাৰ্যসূচীয়ে শিশু, গৰ্ভৱতী মহিলা আৰু বয়সীয়ালক লক্ষ্য কৰে কাৰণ কম খাদ্যত এইবোৰ গোটেই বেছি ভোগে।");

add("nursing-053",
  "A nurse working in a rural sub-centre is expected to",
  "গ্ৰাম্য উপ-কেন্দ্ৰত কাম কৰা নাৰ্ছৰপৰা আশা কৰা হয়",
  [["provide maternal, child and basic curative services", "মাতৃ, শিশু আৰু মৌলিক চিকিৎসা সেৱা দিয়া"], ["perform major surgery", "ডাঙৰ অস্ত্ৰোপচাৰ কৰা"], ["run an ICU", "ICU চলোৱা"], ["report court cases", "আদালতৰ গোচৰ জনোৱা"]], 0,
  "The sub-centre handles antenatal care, delivery, immunisation and simple illness. Surgery and intensive care need a higher facility.",
  "উপ-কেন্দ্ৰই প্ৰসৱপূৰ্ব সেৱা, প্ৰসৱ, টিকাকৰণ আৰু সাধাৰণ ৰোগ চম্ভালে। অস্ত্ৰোপচাৰ আৰু নিবিড় সেৱালৈ ওপৰৰ সুবিধা লাগে।");

add("nursing-054",
  "Which of the following best describes health education?",
  "তলৰ কোনটোৱে স্বাস্থ্য শিক্ষা ভালদৰে বৰ্ণনা কৰে",
  [["helping people adopt healthy behaviour voluntarily", "মানুহক স্বেচ্ছাই স্বাস্থ্যকৰ আচৰণ ল'বলৈ সহায় কৰা"], ["giving orders to patients", "ৰোগীক আদেশ দিয়া"], ["distributing medicines only", "কেৱল ঔষধ বিতৰণ কৰা"], ["charging for advice", "পৰামৰ্শৰ বাবে ধন লোৱা"]], 0,
  "Education works through understanding and choice, not compulsion. Orders may be obeyed briefly but are not learning.",
  "শিক্ষা বুজা আৰু বাছনিৰ জৰিয়তে কাম কৰে, বাধ্যবাধকতাৰে নহয়। আদেশ অলপ সময় পালিব পাৰি কিন্তু শিকা নহয়।");

add("nursing-055",
  "In community nursing, a 'family folder' is used to",
  "সমাজ নাৰ্ছিংত 'পৰিয়াল ফোল্ডাৰ' ব্যৱহাৰ কৰা হয় কিৰ বাবে",
  [["keep one record of every member's health", "প্ৰতিজন সদস্যৰ স্বাস্থ্যৰ একেলগে অভিলেখ ৰাখিবলৈ"], ["store money", "ধন ৰাখিবলৈ"], ["keep medicine samples", "ঔষধৰ নমুনা ৰাখিবলৈ"], ["file court papers", "আদালতৰ কাগজ ৰাখিবলৈ"]], 0,
  "A single folder per household shows patterns across members, such as repeated infections or untreated cases.",
  "প্ৰতি ঘৰৰ এটা ফোল্ডাৰে সদস্যৰ মাজৰ আৰ্হি দেখুৱায়, যেনে পুনৰাই পুনৰাই সংক্ৰমণ বা অচিকিৎসিত ৰোগ।");

add("nursing-056",
  "The nurse explains that a latrine is important because it",
  "নাৰ্ছে বুজায় যে শৌচালয় গুৰুত্বপূৰ্ণ কাৰণ ই",
  [["prevents faecal contamination of water and soil", "পানী আৰু মাটিৰ মলীয়া দূষণ ৰোধ কৰে"], ["makes the house look nice", "ঘৰ ধুনীয়া দেখুৱায়"], ["saves electricity", "বিদ্যুৎ সঞ্চয় কৰে"], ["increases land value", "মাটিৰ মূল্য বঢ়ায়"]], 0,
  "Open defecation spreads hookworm, cholera and typhoid through soil and water. A latrine breaks that route.",
  "মুকলিত পায়খানাই মাটি আৰু পানীৰ জৰিয়তে হুকৱৰ্ম, কলera আৰু টাইফয়েড বিয়পায়। শৌচালয়ে সেই পথ ভাঙে।");

add("nursing-057",
  "Which of the following is the correct definition of infant mortality rate?",
  "শিশু মৃত্যু হাৰৰ শুদ্ধ সংজ্ঞা কোনটো",
  [["deaths under one year of age per 1000 live births", "এক বছৰৰ তলৰ মৃত্যু প্ৰতি ১০০০ জীৱিত জন্মত"], ["deaths under five years per 1000 population", "পাঁচ বছৰৰ তলৰ মৃত্যু প্ৰতি ১০০০ লোকত"], ["deaths in the first month per 100 population", "প্ৰথম মাহৰ মৃত্যু প্ৰতি ১০০ লোকত"], ["stillbirths per 1000 women", "প্ৰতি ১০০০ মহিলাত মৃত জন্ম"]], 0,
  "The numerator counts deaths before the first birthday and the denominator is live births, scaled to a thousand.",
  "লৱত প্ৰথম জন্মদিনৰ আগতে মৃত্যু গণা হয় আৰু হৰত জীৱিত জন্ম, এহাজাৰলৈ বৃদ্ধি কৰি।");

add("nursing-058",
  "A community nurse's home visit should begin with",
  "সমাজ নাৰ্ছৰ ঘৰুৱা পৰিদৰ্শন আৰম্ভ হ'ব লাগে",
  [["introducing herself and stating the purpose", "নিজৰ পৰিচয় দি উদ্দেশ্য কোৱাৰে"], ["checking the kitchen first", "প্ৰথমে ৰান্ধনীঘৰ পৰীক্ষা কৰি"], ["writing the report", "ৰিপৰ্ট লিখি"], ["asking for payment", "ধন বিচাৰি"]], 0,
  "A clear introduction wins consent and cooperation, without which the visit achieves nothing. The report is written at the end.",
  "স্পষ্ট পৰিচয়ে সন্মতি আৰু সহযোগিতা আনে, নহ'লে পৰিদৰ্শনে একো নকৰে। ৰিপৰ্ট শেষত লিখা হয়।");

add("nursing-059",
  "Which condition should be referred urgently from a sub-centre?",
  "উপ-কেন্দ্ৰৰপৰা কোন অৱস্থা জৰুৰীভাৱে প্ৰেৰণ কৰিব লাগে",
  [["eclampsia in a pregnant woman", "গৰ্ভৱতী মহিলাৰ এক্লেম্পছিয়া"], ["a mild headache", "সাধাৰণ মূৰৰ বিষ"], ["a small bruise", "সৰু খুঁ‌জ"], ["a dry cough for one day", "এদিনৰ শুকান কাহ"]], 0,
  "Eclampsia means fits with high blood pressure in pregnancy and kills without magnesium sulphate and delivery. Minor complaints can wait.",
  "এক্লেম্পছিয়া মানে গৰ্ভাৱস্থাত উচ্চ ৰক্তচাপৰ সৈতে খিঁচ। মেগনেছিয়াম ছালফেট আৰু প্ৰসৱ নহ'লে মৃত্যু হয়। সাধাৰণ সমস্যা অপেক্ষা কৰিব পাৰে।");

add("nursing-060",
  "The nurse teaches a mother to prepare oral rehydration solution by",
  "নাৰ্ছে মাকক মুখেৰে পানীশূন্যতা পূৰণ দ্ৰৱ বনাবলৈ শিকায়",
  [["mixing the full sachet in the stated volume of clean water", "নিৰ্দিষ্ট পৰিমাণৰ পৰিষ্কাৰ পানীত গোটেই পেকেট মিহলাই"], ["adding extra sugar for taste", "সোৱাদৰ বাবে বেছি চেনি যোগ কৰি"], ["using hot water and no measuring", "গৰম পানী ব্যৱহাৰ কৰি নজুখাকৈ"], ["halving the water", "পানী আধা কৰি"]], 0,
  "The sachet is balanced for a fixed volume, so measuring keeps the salt concentration correct. Extra sugar or less water makes it worse.",
  "পেকেট নিৰ্দিষ্ট পৰিমাণৰ বাবে সন্তুলিত, সেয়ে জুখিলে লৱণৰ ঘনত্ব শুদ্ধ থাকে। বেছি চেনি বা কম পানীয়ে অৱস্থা বেয়া কৰে।");

/* ================= medical-surgical-nursing ================= */
useLeaf("medical-surgical-nursing");

add("nursing-061",
  "The classic symptom of myocardial infarction is",
  "মায়'কাৰ্ডিয়েল ইনফাৰ্কচনৰ প্ৰচলিত লক্ষণ",
  [["crushing chest pain radiating to the left arm", "বাওঁ বাহুলৈ বিয়পা ভাৰী বুকুৰ বিষ"], ["pain in the right ankle", "সোঁ গোৰোহাত বিষ"], ["itchy scalp", "মূৰৰ খু‌জুৰি"], ["blurred near vision", "ওচৰৰ দৃষ্টি ধোঁৱা"]], 0,
  "Ischaemic heart muscle causes central crushing pain that travels along the left arm or jaw. Ankle pain has no cardiac pattern.",
  "ৰক্তহীন হৃদ্‌পেশীয়ে কেন্দ্ৰীয় ভাৰী বিষ দিয়ে যি বাওঁ বাহু বা হনুলৈ যায়। গোৰোহাৰ বিষৰ হৃদয়ৰ আৰ্হি নাই।");

add("nursing-062",
  "A patient with a fractured femur is most at risk of",
  "ফিমাৰ ফ্ৰেকচাৰ থকা ৰোগীৰ আটাই বেছি বিপদ",
  [["fat embolism", "চৰ্বি এম্ব'লিজম"], ["anaemia only", "কেৱল ৰক্তহীনতা"], ["diabetes", "মধুমেহ"], ["asthma", "হাঁপানি"]], 0,
  "Marrow fat can enter torn veins at the fracture and lodge in the lungs. This is why the limb is immobilised early.",
  "ভঙা ঠাইত ছিঁড়া শিৰাত মজ্জাৰ চৰ্বি সোমাই ফুসফুসত লাগে। সেয়ে অংগ সোনকালে স্থিৰ কৰা হয়।");

add("nursing-063",
  "The most important nursing measure after abdominal surgery is to",
  "পেটৰ অস্ত্ৰোপচাৰৰ পিছত আটাই গুৰুত্বপূৰ্ণ নাৰ্ছিং ব্যৱস্থা",
  [["monitor the wound and encourage early mobilisation", "ঘা পৰ্যবেক্ষণ আৰু সোনকালে খোজ কঢ়াত উৎসাহ দিয়া"], ["keep the patient flat for a week", "সপ্তাহজুৰি ৰোগীক সমতল ৰখা"], ["withhold all fluids", "সকলো তৰল বন্ধ ৰখা"], ["avoid all observation", "সকলো পৰ্যবেক্ষণ এৰি দিয়া"]], 0,
  "Wound checks catch infection and dehiscence, and early walking prevents chest infection and clots. Prolonged immobility causes both.",
  "ঘা পৰীক্ষাই সংক্ৰমণ আৰু ফাটনি ধৰে, আৰু সোনকালে খোজ কাঢ়িলে বুকুৰ সংক্ৰমণ আৰু ৰক্তপিণ্ড ৰোধ হয়। দীঘলীয়া অচলতাই দুয়োটা আনে।");

add("nursing-064",
  "In diabetic ketoacidosis the breath typically smells of",
  "ডায়েবেটিক কিট'এচিড'ছিছত উশাহত সাধাৰণতে কি গোন্ধ পোৱা যায়",
  [["acetone", "এছিট'ন"], ["ammonia", "এম'নিয়া"], ["garlic", "নহৰু"], ["alcohol", "মদ"]], 0,
  "Ketones include acetone, which the lungs exhale, giving a fruity smell. Ammonia suggests liver or kidney failure instead.",
  "কিট'নত এছিট'ন থাকে, যি ফুসফুসেৰে ওলাই ফলীয়া গোন্ধ দিয়ে। এম'নিয়াই যকৃত বা বৃক্ক বিকল দেখুৱায়।");

add("nursing-065",
  "The nurse should position a patient with severe breathlessness in",
  "তীব্ৰ উশাহৰ কষ্ট থকা ৰোগীক নাৰ্ছে কেতিয়া ৰখাব",
  [["an upright sitting position", "সোজা বহা অৱস্থানত"], ["a flat supine position", "সমতল পিঠিৰ অৱস্থানত"], ["head-down position", "মূৰ তলত দি"], ["on the abdomen only", "কেৱল পেটত দি"]], 0,
  "Sitting upright lets the diaphragm descend and improves lung volume. Lying flat pushes the abdomen up and worsens the effort.",
  "সোজা বহিলে মধ্যচ্ছদা তললৈ যায় আৰু ফুসফুসৰ আয়তন বাঢ়ে। সমতল শুলিলে পেট ওপৰলৈ আহি কষ্ট বঢ়ায়।");

add("nursing-066",
  "A colostomy is a surgical opening made in the",
  "কল'ষ্টমী কিৰ এটা শল্য ছিদ্ৰ",
  [["colon", "ক'লন"], ["stomach", "পেট"], ["bladder", "মূত্ৰাশয়"], ["trachea", "শ্বাসনলী"]], 0,
  "The colon is brought to the abdominal wall so stool can leave without passing the diseased segment. Bladder and trachea openings have other names.",
  "ক'লন পেটৰ বেৰলৈ অনা হয় যাতে ৰোগগ্ৰস্ত অংশ নগৈ মল ওলায়। মূত্ৰাশয় আৰু শ্বাসনলীৰ ছিদ্ৰৰ আন নাম আছে।");

add("nursing-067",
  "The first sign of hypovolaemic shock is usually",
  "হাইপ'ভলেমিক শ্বকৰ প্ৰথম চিন সাধাৰণতে",
  [["a rising pulse rate", "নাড়ীৰ গতি বঢ়া"], ["a falling pulse rate", "নাড়ীৰ গতি কমা"], ["a rise in urine output", "মূত্ৰ বঢ়া"], ["a drop in temperature", "উষ্ণতা কমা"]], 0,
  "Loss of volume makes the heart beat faster to keep pressure up, so tachycardia comes before the pressure falls.",
  "তৰল কমিলে চাপ ধৰি ৰাখিবলৈ হৃদয়ে দ্ৰুত চালিত হয়, সেয়ে চাপ নমাৰ আগতে টেকিকাৰ্ডিয়া আহে।");

add("nursing-068",
  "A patient on prolonged bed rest is at risk of developing",
  "দীঘলীয়া বিছনা বিশ্ৰামত থকা ৰোগীৰ কি হোৱাৰ বিপদ",
  [["deep vein thrombosis", "গভীৰ শিৰাৰ ৰক্তপিণ্ড"], ["increased muscle mass", "পেশী বঢ়া"], ["improved lung capacity", "ফুসফুসৰ ক্ষমতা বঢ়া"], ["faster wound healing", "ঘা সোনকালে শুকুৱা"]], 0,
  "Blood pools in still legs and clots, which can travel to the lungs. Muscle wasting and weaker lungs are the other costs of immobility.",
  "স্থিৰ ভৰিত ৰক্ত জমা হৈ পিণ্ড হয়, যি ফুসফুসলৈ যাব পাৰে। পেশী ক্ষয় আৰু দুৰ্বল ফুসফুস অচলতাৰ আন ক্ষতি।");

add("nursing-069",
  "The normal healing of a clean surgical wound passes through",
  "পৰিষ্কাৰ শল্য ঘাৰ স্বাভাৱিক শুকান প্ৰক্ৰিয়া",
  [["inflammation, proliferation and maturation", "প্ৰদাহ, বৃদ্ধি আৰু পৰিপক্বতা"], ["infection, sepsis and necrosis", "সংক্ৰমণ, ছেপছিছ আৰু কলা মৃত্যু"], ["clotting only", "কেৱল ৰক্ত জমা"], ["scarring only", "কেৱল দাগ পৰা"]], 0,
  "Healing runs through three overlapping phases. Infection and necrosis are complications, not the normal path.",
  "শুকোৱা ক্ৰিয়া তিনিটা ওপৰা-উপৰি পৰ্যায়েৰে চলে। সংক্ৰমণ আৰু কলা মৃত্যু জটিলতা, স্বাভাৱিক পথ নহয়।");

add("nursing-070",
  "Which of the following is a sign of an approaching hypoglycaemic episode?",
  "তলৰ কোনটো নিম্ন ৰক্ত শৰ্কৰা আহি থকাৰ চিন",
  [["sweating, tremor and confusion", "ঘাম, কম্পন আৰু বিভ্ৰান্তি"], ["deep sleep", "গভীৰ টোপনি"], ["slow breathing with no sweating", "ঘাম নোহোৱাকৈ ধীৰ উশাহ"], ["increased urine with thirst", "পিয়াহৰ সৈতে মূত্ৰ বঢ়া"]], 0,
  "Low glucose triggers adrenaline, giving sweat and tremor, and starves the brain, giving confusion. Thirst with heavy urine is the opposite, high glucose.",
  "কম গ্লুক'জে এড্ৰিনেলিন ওলাই ঘাম আৰু কম্পন দিয়ে, আৰু মগজুক অভাৱত ৰাখি বিভ্ৰান্তি আনে। পিয়াহ আৰু বেছি মূত্ৰ ওলোটা, উচ্চ গ্লুক'জ।");

add("nursing-071",
  "Before a patient goes for surgery, the nurse must ensure",
  "ৰোগী অস্ত্ৰোপচাৰলৈ যোৱাৰ আগতে নাৰ্ছে নিশ্চিত কৰিব লাগে",
  [["the consent form is signed and the site is marked", "সন্মতি পত্ৰ স্বাক্ষৰিত আৰু স্থান চিহ্নিত"], ["the bed is made with new sheets", "বিছনা নতুন চাদৰেৰে সজোৱা"], ["the relatives have gone home", "সম্পৰ্কীয়ে ঘৰলৈ গৈছে"], ["the radio is switched off", "ৰেডিঅ' বন্ধ"]], 0,
  "Consent and site marking prevent wrong-patient and wrong-site surgery. Linen and visitors do not affect safety.",
  "সন্মতি আৰু স্থান চিহ্নিত কৰিলে ভুল ৰোগী আৰু ভুল স্থানৰ অস্ত্ৰোপচাৰ ৰোধ হয়। কাপোৰ আৰু দৰ্শনাৰ্থীয়ে সুৰক্ষাত প্ৰভাৱ নেপেলায়।");

add("nursing-072",
  "A patient with a chest drain should be observed for",
  "বুকুৰ নলী থকা ৰোগীত কি পৰ্যবেক্ষণ কৰিব লাগে",
  [["bubbling and the amount of drainage", "বুৰবুৰণি আৰু নিষ্কাশনৰ পৰিমাণ"], ["the colour of the curtains", "পৰ্দাৰ ৰং"], ["the number of visitors", "দৰ্শনাৰ্থীৰ সংখ্যা"], ["the ward clock", "ৱাৰ্ডৰ ঘড়ী"]], 0,
  "Bubbling shows an air leak and the volume shows bleeding or infection, so both guide the surgeon's next step.",
  "বুৰবুৰণিয়ে বতাহ ওলোৱা আৰু পৰিমাণে ৰক্তক্ষৰণ বা সংক্ৰমণ দেখুৱায়, সেয়ে দুয়োটাই শল্যচিকিৎসকৰ পৰৱৰ্তী খোজ নিৰ্দেশ কৰে।");

add("nursing-073",
  "Which of the following is the earliest sign of pressure sore formation?",
  "চাপৰ ঘা হোৱাৰ আটাই আগতীয়া চিন",
  [["non-blanching redness over a bony point", "হাড়ৰ ওপৰত নুমুৱা নোহোৱা ৰঙা ছাল"], ["deep ulcer with bone visible", "হাড় দেখা পোৱা গভীৰ ঘা"], ["black dead tissue", "ক'লা মৃত কলা"], ["pus discharge", "পুঁ‌জ ওলোৱা"]], 0,
  "Redness that does not fade on pressure means blood flow is already impaired. Ulcer and black tissue are much later stages.",
  "চাপত নুমুৱা নোহোৱা ৰঙা মানে ৰক্তস্ৰোত ইতিমধ্যে বেয়া। ঘা আৰু ক'লা কলা বহু পিছৰ পৰ্যায়।");

add("nursing-074",
  "The nurse should suspect a urinary tract infection when the patient reports",
  "ৰোগীয়ে কি কোৱালে নাৰ্ছে মূত্ৰপথৰ সংক্ৰমণ সন্দেহ কৰিব",
  [["burning on passing urine and frequency", "মূত্ৰ ত্যাগত জ্বলা আৰু সঘনতা"], ["pain in the left ear", "বাওঁ কাণত বিষ"], ["loss of eyelashes", "চকুৰ পতা সৰা"], ["a dry scalp", "মূৰৰ ছাল শুকান"]], 0,
  "Burning and frequency are the classic lower tract signs. Ear or scalp complaints belong to other systems.",
  "জ্বলা আৰু সঘনতা তলৰ পথৰ প্ৰচলিত চিন। কাণ বা মূৰৰ ছালৰ কথা আন তন্ত্ৰৰ।");

add("nursing-075",
  "A patient with chronic obstructive pulmonary disease is taught",
  "দীৰ্ঘস্থায়ী বাধাজনিত ফুসফুস ৰোগী ৰোগীক শিকোৱা হয়",
  [["pursed-lip breathing", "ওঁ‌ঠ চেপি উশাহ লোৱা"], ["rapid shallow breathing", "দ্ৰুত অগভীৰ উশাহ"], ["holding the breath for a minute", "মিনিটজুৰি উশাহ ৰখা"], ["breathing only through the mouth", "কেৱল মুখেৰে উশাহ"]], 0,
  "Pursed-lip breathing keeps airways open during expiration and reduces trapping of air. Shallow rapid breathing worsens it.",
  "ওঁ‌ঠ চেপি উশাহ ল'লে বায়ুপথ খোলা থাকে আৰু বতাহ জমা কমে। দ্ৰুত অগভীৰ উশাহে বেয়া কৰে।");

add("nursing-076",
  "The nurse must check for an allergic reaction after giving",
  "নাৰ্ছে দিয়াৰ পিছত এলাৰ্জি প্ৰতিক্ৰিয়া চাব লাগে",
  [["a first dose of penicillin", "পেনিচিলিনৰ প্ৰথম মাত্ৰাৰ পিছত"], ["oral glucose", "মুখে গ্লুক'জ দিয়াৰ পিছত"], ["normal saline", "সাধাৰণ লুণীয়া পানীৰ পিছত"], ["oxygen by mask", "মাস্কেৰে অক্সিজেনৰ পিছত"]], 0,
  "Penicillin can cause anaphylaxis within minutes, so the first dose needs close watch. Saline and oxygen rarely provoke allergy.",
  "পেনিচিলিনে মিনিটৰ ভিতৰতে এনাফাইলেক্সিছ কৰিব পাৰে, সেয়ে প্ৰথম মাত্ৰাত সতৰ্ক দৃষ্টি লাগে। লুণীয়া পানী আৰু অক্সিজেনে বিৰলেহে এলাৰ্জি কৰে।");

add("nursing-077",
  "A patient with a head injury should be observed for",
  "মূৰত আঘাত পোৱা ৰোগীত কি পৰ্যবেক্ষণ কৰিব লাগে",
  [["level of consciousness and pupil size", "চেতনাৰ স্তৰ আৰু চকুৰ মণিৰ আকাৰ"], ["hair colour", "চুলিৰ ৰং"], ["shoe size", "জোতাৰ মাপ"], ["food preference", "খাদ্যৰ পছন্দ"]], 0,
  "Falling consciousness and a dilating pupil show rising pressure inside the skull, which needs surgery fast.",
  "চেতনা কমা আৰু চকুৰ মণি মেলি যোৱাই কৰোটিৰ ভিতৰত চাপ বঢ়া দেখুৱায়, যি সোনকালে শল্যচিকিৎসা লাগে।");

add("nursing-078",
  "The main aim of pre-operative teaching is to",
  "অস্ত্ৰোপচাৰপূৰ্ব শিক্ষাৰ মূল লক্ষ্য",
  [["reduce anxiety and gain cooperation", "উদ্বেগ কমাই সহযোগিতা লাভ কৰা"], ["increase the fee", "মাচুল বঢ়োৱা"], ["shorten the ward round", "ৱাৰ্ড ৰাউণ্ড চুটি কৰা"], ["avoid consent", "সন্মতি এৰাই চলা"]], 0,
  "A patient who knows what to expect breathes better, coughs and moves sooner, and heals faster.",
  "কি হ'ব জনা ৰোগীয়ে ভালকৈ উশাহ লয়, সোনকালে কাহি লৰচৰ কৰে, আৰু সোনকালে সুস্থ হয়।");

add("nursing-079",
  "Which of the following indicates a possible transfusion reaction?",
  "তলৰ কোনটোৱে সম্ভাৱ্য ৰক্ত সঞ্চাৰণ প্ৰতিক্ৰিয়া দেখুৱায়",
  [["chills, fever and back pain soon after starting", "আৰম্ভৰ লগে লগে জাৰ, জ্বৰ আৰু পিঠিৰ বিষ"], ["improved appetite", "ভোক বঢ়া"], ["slow steady pulse", "ধীৰ স্থিৰ নাড়ী"], ["deep sleep", "গভীৰ টোপনি"]], 0,
  "Fever, chills and loin pain point to incompatible blood being destroyed, so the transfusion is stopped at once.",
  "জ্বৰ, জাৰ আৰু কঁকালৰ বিষে অসঙ্গত ৰক্ত নষ্ট হোৱা দেখুৱায়, সেয়ে সঞ্চাৰণ লগে লগে বন্ধ কৰা হয়।");

add("nursing-080",
  "A patient who has had a stroke with swallowing difficulty should be",
  "ষ্ট্ৰ'ক হোৱা আৰু গিলিব নোৱৰা ৰোগীক",
  [["assessed before any oral feed is given", "মুখে খাদ্য দিয়াৰ আগতে মূল্যাংকন কৰিব লাগে"], ["given water immediately", "লগে লগে পানী দিব লাগে"], ["fed lying flat", "সমতল শুৱাই খুৱাব লাগে"], ["given solid food at once", "লগে লগে গোটা খাদ্য দিব লাগে"]], 0,
  "An unassessed swallow can send food into the airway and cause aspiration pneumonia. Assessment comes before any feed.",
  "নজুখাকৈ গিলিলে খাদ্য শ্বাসনলীত সোমাই নিউম'নিয়া কৰে। খুৱাৰ আগতে মূল্যাংকন লাগে।");

add("nursing-081",
  "The nurse explains that a patient with hypertension should",
  "নাৰ্ছে বুজায় যে উচ্চ ৰক্তচাপ থকা ৰোগীয়ে",
  [["reduce salt and take medicine regularly", "লৱণ কমাই ঔষধ নিয়মীয়াকৈ ল'ব"], ["stop medicine when feeling well", "ভাল লাগিলে ঔষধ বন্ধ কৰিব"], ["add extra salt to food", "খাদ্যত বেছি লৱণ দিব"], ["avoid all exercise", "সকলো ব্যায়াম এৰিব"]], 0,
  "Hypertension has no symptoms until damage occurs, so medicine must continue and salt must fall. Stopping on feeling well invites a stroke.",
  "ক্ষতি নোহোৱালৈকে উচ্চ ৰক্তচাপত লক্ষণ নাথাকে, সেয়ে ঔষধ চলিব আৰু লৱণ কমিব। ভাল লাগিলে বন্ধ কৰিলে ষ্ট্ৰ'ক মাতে।");

add("nursing-082",
  "Which of the following is the correct order for donning personal protective equipment?",
  "ব্যক্তিগত সুৰক্ষা সজুলি পিন্ধাৰ শুদ্ধ ক্ৰম কোনটো",
  [["gown, mask, goggles, gloves", "গাউন, মাস্ক, চশমা, দস্তানা"], ["gloves, gown, mask, goggles", "দস্তানা, গাউন, মাস্ক, চশমা"], ["mask, gloves, gown, goggles", "মাস্ক, দস্তানা, গাউন, চশমা"], ["goggles, gloves, mask, gown", "চশমা, দস্তানা, মাস্ক, গাউন"]], 0,
  "Gloves go on last so that they stay clean while the rest is handled, and come off first for the same reason.",
  "দস্তানা শেষত পিন্ধা হয় যাতে বাকী পিন্ধোঁতে পৰিষ্কাৰ থাকে, আৰু সেই কাৰণেই প্ৰথমে খুলি লোৱা হয়।");

add("nursing-083",
  "A patient with a plaster cast should be checked for",
  "প্লাষ্টাৰ কাষ্ট থকা ৰোগীত কি পৰীক্ষা কৰিব লাগে",
  [["circulation, sensation and movement of the limb", "অংগৰ সংবহন, অনুভূতি আৰু লৰচৰ"], ["the cast colour only", "কেৱল কাষ্টৰ ৰং"], ["the patient's shoes", "ৰোগীৰ জোতা"], ["the bed number", "বিছনাৰ নম্বৰ"]], 0,
  "A tight cast cuts blood flow and nerve function, so the fingers or toes are checked for colour, warmth and feeling.",
  "টান কাষ্টে ৰক্তস্ৰোত আৰু স্নায়ু কাৰ্য বন্ধ কৰে, সেয়ে আঙুলিৰ ৰং, উম আৰু অনুভূতি চোৱা হয়।");

add("nursing-084",
  "The nurse should report which finding immediately after thyroid surgery?",
  "থাইৰয়ড অস্ত্ৰোপচাৰৰ পিছত নাৰ্ছে কোনটো লগে লগে জনাব লাগে",
  [["difficulty in breathing with neck swelling", "ডিঙি ওফন্দি উঠি উশাহ লোৱাত কষ্ট"], ["mild wound pain", "ঘাৰ সাধাৰণ বিষ"], ["a dry mouth", "মুখ শুকান"], ["a slight headache", "সাধাৰণ মূৰৰ বিষ"]], 0,
  "Swelling can compress the airway within hours, so stridor or breathlessness is a surgical emergency.",
  "ওফন্দি উঠা ঘণ্টাৰ ভিতৰতে বায়ুপথ চেপি ধৰিব পাৰে, সেয়ে হুইছ বা উশাহৰ কষ্ট শল্য জৰুৰী অৱস্থা।");

add("nursing-085",
  "Which of the following is the main purpose of a urinary drainage bag being kept below bladder level?",
  "মূত্ৰৰ মোনা মূত্ৰাশয়ৰ তলত ৰখাৰ মূল উদ্দেশ্য",
  [["to prevent backflow of urine into the bladder", "মূত্ৰাশয়লৈ মূত্ৰ ঘূৰি যোৱা ৰোধ কৰা"], ["to make the bag lighter", "মোনা পাতল কৰা"], ["to save space", "ঠাই ৰখা"], ["to hide it from visitors", "দৰ্শনাৰ্থীৰপৰা লুকুৱা"]], 0,
  "Urine flowing back carries bacteria upward and causes infection. Gravity drainage keeps the flow one way.",
  "মূত্ৰ ঘূৰি গলে বেক্টেৰিয়া ওপৰলৈ গৈ সংক্ৰমণ কৰে। মহাকৰ্ষণৰ নিষ্কাশনে প্ৰবাহ একমুখী ৰাখে।");

add("nursing-086",
  "A patient with severe vomiting is at risk of",
  "তীব্ৰ বমি হোৱা ৰোগীৰ কি হোৱাৰ বিপদ",
  [["metabolic alkalosis and hypokalaemia", "বিপাকীয় ক্ষাৰকীয়তা আৰু কম পটাছিয়াম"], ["metabolic acidosis only", "কেৱল বিপাকীয় অম্লীয়তা"], ["hypercalcaemia", "বেছি কেলছিয়াম"], ["polycythaemia", "বেছি ৰক্তকণিকা"]], 0,
  "Gastric acid and potassium are lost with vomit, so the blood turns alkaline and potassium falls. Acidosis follows diarrhoea instead.",
  "বমিৰ সৈতে পেটৰ অম্ল আৰু পটাছিয়াম যায়, সেয়ে ৰক্ত ক্ষাৰকীয় হয় আৰু পটাছিয়াম কমে। ডায়েৰিয়াত অম্লীয়তা হয়।");

add("nursing-087",
  "The nurse teaches a patient with a new colostomy to",
  "নতুন কল'ষ্টমী থকা ৰোগীক নাৰ্ছে শিকায়",
  [["clean the stoma and inspect the skin around it", "ষ্ট'মা পৰিষ্কাৰ কৰি চাৰিওফালৰ ছাল চাবলৈ"], ["keep the bag empty of air only", "মোনাৰপৰা কেবল বতাহ উলিয়াবলৈ"], ["avoid all fluids", "সকলো তৰল এৰিবলৈ"], ["stop eating fibre for life", "জীৱনজুৰি আঁহ এৰিবলৈ"]], 0,
  "Stoma care and skin inspection prevent excoriation, which is the commonest reason a bag will not stick.",
  "ষ্ট'মা যতন আৰু ছাল পৰীক্ষাই ঘাঁ‌ কৰা ৰোধ কৰে, যি মোনা নলগা হোৱাৰ আটাই সাধাৰণ কাৰণ।");

add("nursing-088",
  "Which finding suggests that a wound is infected?",
  "কোনটোৱে ঘা সংক্ৰমিত বুলি দেখুৱায়",
  [["increasing pain, redness and purulent discharge", "বাঢ়ি থকা বিষ, ৰঙা আৰু পুঁ‌জ ওলোৱা"], ["a dry clean scar", "শুকান পৰিষ্কাৰ দাগ"], ["mild itching on day ten", "দশম দিনত সাধাৰণ খু‌জুৰি"], ["a healed edge", "শুকুৱা কাষ"]], 0,
  "Pain that worsens after the first days, spreading redness and pus are the standard signs of infection.",
  "প্ৰথম দিনবোৰৰ পিছত বিষ বঢ়া, বিয়পি যোৱা ৰঙা আৰু পুঁ‌জ সংক্ৰমণৰ প্ৰচলিত চিন।");

add("nursing-089",
  "A patient who has undergone cataract surgery should be advised to",
  "চকুৰ ছানি অস্ত্ৰোপচাৰ হোৱা ৰোগীক পৰামৰ্শ দিব লাগে",
  [["avoid rubbing the eye and lifting heavy weights", "চকু ঘঁ‌হা আৰু গধুৰ দাঙা এৰিবলৈ"], ["rub the eye gently", "চকু লাহে লাহে ঘঁ‌হিবলৈ"], ["lift heavy loads daily", "প্ৰতিদিনে গধুৰ দাঙিবলৈ"], ["sleep face down always", "সদায় মুখ তলত দি শুবলৈ"]], 0,
  "Pressure and strain can displace the new lens or open the wound, so the eye is protected for a few weeks.",
  "চাপ আৰু ভাৰে নতুন লেন্ছ সৰকাব বা ঘা মেলিব পাৰে, সেয়ে কেইসপ্তাহ চকু সুৰক্ষিত ৰখা হয়।");

add("nursing-090",
  "The most reliable sign of internal bleeding after surgery is",
  "অস্ত্ৰোপচাৰৰ পিছত আভ্যন্তৰীণ ৰক্তক্ষৰণৰ আটাই নিৰ্ভৰযোগ্য চিন",
  [["falling blood pressure with a rising pulse", "ৰক্তচাপ কমি নাড়ীৰ গতি বঢ়া"], ["mild wound pain", "ঘাৰ সাধাৰণ বিষ"], ["a dry mouth", "মুখ শুকান"], ["a good appetite", "ভাল ভোক"]], 0,
  "Hidden loss shows as shock: the pulse climbs and the pressure drops. Pain and thirst are far less specific.",
  "লুকুৱা ক্ষয় শ্বক হিচাপে ওলায়: নাড়ী বাঢ়ে আৰু চাপ কমে। বিষ আৰু পিয়াহ বহু কম নিৰ্দিষ্ট।");

/* ================= maternal-child-health ================= */
useLeaf("maternal-child-health");

add("nursing-091",
  "The average duration of the first stage of labour in a primigravida is about",
  "প্ৰথম গৰ্ভধাৰণত প্ৰসৱৰ প্ৰথম স্তৰৰ গড় সময় প্ৰায়",
  [["12 hours", "১২ ঘণ্টা"], ["2 hours", "২ ঘণ্টা"], ["30 hours", "৩০ ঘণ্টা"], ["48 hours", "৪৮ ঘণ্টা"]], 0,
  "The first stage runs from the start of regular pains to full dilatation, averaging around twelve hours in a first pregnancy.",
  "প্ৰথম স্তৰ নিয়মীয়া বিষ আৰম্ভ হোৱাৰপৰা সম্পূৰ্ণ খোলাৰলৈ, প্ৰথম গৰ্ভধাৰণত গড়ে বাৰ ঘণ্টা।");

add("nursing-092",
  "The normal fetal heart rate is",
  "ভ্ৰূণৰ হৃদয়ৰ স্বাভাৱিক গতি",
  [["120 to 160 beats per minute", "প্ৰতি মিনিটত ১২০ ৰপৰা ১৬০"], ["60 to 90 beats per minute", "প্ৰতি মিনিটত ৬০ ৰপৰা ৯০"], ["180 to 220 beats per minute", "প্ৰতি মিনিটত ১৮০ ৰপৰা ২২০"], ["40 to 60 beats per minute", "প্ৰতি মিনিটত ৪০ ৰপৰা ৬০"]], 0,
  "A hundred and twenty to a hundred and sixty is normal. Above a hundred and eighty or below a hundred needs immediate attention.",
  "১২০ ৰপৰা ১৬০ স্বাভাৱিক। ১৮০ৰ ওপৰত বা ১০০ৰ তলত লগে লগে চিকিৎসা লাগে।");

add("nursing-093",
  "Colostrum is important for a newborn because it is rich in",
  "নৱজাতকৰ বাবে কল'ষ্ট্ৰাম গুৰুত্বপূৰ্ণ কাৰণ ই কিৰে সমৃদ্ধ",
  [["antibodies", "প্ৰতিদেহ"], ["fat only", "কেৱল চৰ্বি"], ["sugar only", "কেৱল চেনি"], ["salt only", "কেৱল লৱণ"]], 0,
  "Colostrum carries immunoglobulin A, which coats the gut and protects against infection. Its fat and sugar are lower than mature milk.",
  "কল'ষ্ট্ৰামত ইমিউন'গ্লবুলিন A থাকে, যি অন্ত্ৰ ঢাকি সংক্ৰমণৰপৰা ৰক্ষা কৰে। চৰ্বি আৰু চেনি পূৰ্ণ গাখীৰতকৈ কম।");

add("nursing-094",
  "Exclusive breast feeding is recommended for the first",
  "প্ৰথম কিমান সময় কেৱল মাকৰ গাখীৰ দিবলৈ পৰামৰ্শ দিয়া হয়",
  [["six months", "ছয় মাহ"], ["one month", "এক মাহ"], ["two years", "দুই বছৰ"], ["two weeks", "দুই সপ্তাহ"]], 0,
  "Nothing but breast milk for six months gives complete nutrition and immunity. Water and other feeds add infection risk.",
  "ছয় মাহ কেৱল মাকৰ গাখীৰে সম্পূৰ্ণ পুষ্টি আৰু প্ৰতিৰোধ ক্ষমতা দিয়ে। পানী বা আন খাদ্যই সংক্ৰমণৰ আশংকা বঢ়ায়।");

add("nursing-095",
  "Postpartum haemorrhage is defined as blood loss of more than",
  "প্ৰসৱোত্তৰ ৰক্তক্ষৰণ কি পৰিমাণৰ অধিক হ'লে গণা হয়",
  [["500 ml after vaginal delivery", "যোনি পথৰ প্ৰসৱৰ পিছত ৫০০ মি.লি."], ["100 ml after delivery", "প্ৰসৱৰ পিছত ১০০ মি.লি."], ["50 ml after delivery", "প্ৰসৱৰ পিছত ৫০ মি.লি."], ["100 ml before delivery", "প্ৰসৱৰ আগতে ১০০ মি.লি."]], 0,
  "Five hundred millilitres after a normal birth, or a thousand after a caesarean, defines postpartum haemorrhage. It is a leading cause of maternal death.",
  "স্বাভাৱিক প্ৰসৱৰ পিছত ৫০০ মি.লি. বা চিজাৰিয়ানৰ পিছত ১০০০ মি.লি. হ'লে প্ৰসৱোত্তৰ ৰক্তক্ষৰণ। ই মাতৃ মৃত্যুৰ প্ৰধান কাৰণ।");

add("nursing-096",
  "The Apgar score is assessed at",
  "এপগাৰ স্ক'ৰ কেতিয়া জোখা হয়",
  [["one and five minutes after birth", "জন্মৰ এক আৰু পাঁচ মিনিটত"], ["one hour after birth", "জন্মৰ এক ঘণ্টা পিছত"], ["before birth", "জন্মৰ আগতে"], ["one day after birth", "জন্মৰ এদিন পিছত"]], 0,
  "Scoring at one and five minutes shows the response to resuscitation and predicts survival. Later scoring loses that value.",
  "এক আৰু পাঁচ মিনিটত জুখিলে পুনৰ্জীৱনৰ প্ৰতিক্ৰিয়া দেখুৱায় আৰু জীৱন ধাৰণৰ আভাস দিয়ে। পিছত জুখিলে সেই মূল্য নাথাকে।");

add("nursing-097",
  "Which of the following is a danger sign in pregnancy?",
  "তলৰ কোনটো গৰ্ভাৱস্থাৰ বিপদ চিন",
  [["vaginal bleeding", "যোনিৰপৰা ৰক্তক্ষৰণ"], ["mild nausea in the morning", "ৰাতিপুৱা সাধাৰণ বমি-বমি"], ["increased appetite", "ভোক বঢ়া"], ["mild backache", "সাধাৰণ পিঠিৰ বিষ"]], 0,
  "Bleeding may mean placenta praevia or abruption and needs urgent review. Morning sickness and backache are common and benign.",
  "ৰক্তক্ষৰণে প্লাছেণ্টা প্ৰিভিয়া বা বিচ্ছিন্নতা বুজাব পাৰে, সেয়ে জৰুৰী পৰীক্ষা লাগে। ৰাতিপুৱাৰ বমি আৰু পিঠিৰ বিষ সাধাৰণ।");

add("nursing-098",
  "The newborn should be kept warm mainly to prevent",
  "নৱজাতক উমলৈ ৰখা হয় মূলতঃ কি ৰোধ কৰিবলৈ",
  [["hypothermia", "হাইপ'থাৰ্মিয়া"], ["fever", "জ্বৰ"], ["jaundice only", "কেৱল জণ্ডিছ"], ["constipation", "কোষ্ঠকাঠিন্য"]], 0,
  "A wet newborn loses heat fast and cannot shiver, so cold stress leads to low sugar and acidosis. Skin-to-skin contact prevents it.",
  "তিতা নৱজাতকে দ্ৰুত তাপ হেৰুৱায় আৰু কঁপনি উঠাব নোৱাৰে, সেয়ে শীতলতাই কম চেনি আৰু অম্লীয়তা আনে। ছালে-ছালে ৰাখিলে ৰোধ হয়।");

add("nursing-099",
  "Vitamin K is given to a newborn to prevent",
  "নৱজাতকক ভিটামিন K দিয়া হয় কি ৰোধ কৰিবলৈ",
  [["haemorrhagic disease of the newborn", "নৱজাতকৰ ৰক্তক্ষৰণ ৰোগ"], ["rickets", "ৰিকেটছ"], ["scurvy", "স্কাৰ্ভি"], ["beriberi", "বেৰিবেৰি"]], 0,
  "The newborn gut cannot yet make vitamin K, so clotting is poor. Rickets and scurvy relate to vitamins D and C later in life.",
  "নৱজাতকৰ অন্ত্ৰই এতিয়াও ভিটামিন K বনাব নোৱাৰে, সেয়ে ৰক্ত জমা দুৰ্বল। ৰিকেটছ আৰু স্কাৰ্ভি পিছত D আৰু C ৰ সৈতে সম্পৰ্কিত।");

add("nursing-100",
  "The third stage of labour ends with",
  "প্ৰসৱৰ তৃতীয় স্তৰ কিৰ সৈতে শেষ হয়",
  [["expulsion of the placenta", "প্লাছেণ্টা ওলোৱাৰে"], ["full dilatation of the cervix", "গৰ্ভাশয় মুখ সম্পূৰ্ণ খোলাৰে"], ["birth of the head", "মূৰ ওলোৱাৰে"], ["rupture of membranes", "পানীৰ থলী ফাটি যোৱাৰে"]], 0,
  "The third stage runs from the birth of the baby to the delivery of the placenta. Full dilatation ends the first stage.",
  "তৃতীয় স্তৰ শিশু জন্মৰপৰা প্লাছেণ্টা ওলোৱালৈ। সম্পূৰ্ণ খোলাই প্ৰথম স্তৰ শেষ কৰে।");

add("nursing-101",
  "Which vaccine is given at birth in India?",
  "ভাৰতত জন্মতে কোন টিকা দিয়া হয়",
  [["BCG", "BCG"], ["measles", "মিজলছ"], ["DPT booster", "DPT বুষ্টাৰ"], ["typhoid", "টাইফয়েড"]], 0,
  "BCG, the birth dose of oral polio and hepatitis B are given at birth. Measles comes at nine months and DPT later.",
  "জন্মতে BCG, মুখেৰে পলিঅ'ৰ জন্ম মাত্ৰা আৰু হেপাটাইটিছ B দিয়া হয়। মিজলছ ন মাহত আৰু DPT পিছত।");

add("nursing-102",
  "The most common cause of postpartum haemorrhage is",
  "প্ৰসৱোত্তৰ ৰক্তক্ষৰণৰ আটাই সাধাৰণ কাৰণ",
  [["uterine atony", "গৰ্ভাশয়ৰ পেশীৰ শিথিলতা"], ["retained placenta only", "কেৱল প্লাছেণ্টা থাকি যোৱা"], ["infection", "সংক্ৰমণ"], ["anaemia", "ৰক্তহীনতা"]], 0,
  "A uterus that fails to contract leaves vessels open and bleeds. Retained placenta and tears are the next commonest causes.",
  "গৰ্ভাশয়ে সংকোচন নকৰিলে ৰক্তনলী খোলা থাকি ৰক্তক্ষৰণ হয়। প্লাছেণ্টা থাকি যোৱা আৰু ছিঁড়া পিছৰ সাধাৰণ কাৰণ।");

add("nursing-103",
  "A newborn weighing less than 2500 grams at birth is termed",
  "জন্মত ২৫০০ গ্ৰামতকৈ কম ওজনৰ নৱজাতকক কি বোলা হয়",
  [["low birth weight", "নিম্ন জন্ম ওজন"], ["normal weight", "স্বাভাৱিক ওজন"], ["macrosomic", "অতি ওজন"], ["post term", "অতিপূৰ্ণকালীন"]], 0,
  "Under two and a half kilograms is low birth weight, which raises the risk of infection and death. Macrosomia is the opposite, over four kilograms.",
  "আঢ়ৈ কিলোগ্ৰামতকৈ কম নিম্ন জন্ম ওজন, যিয়ে সংক্ৰমণ আৰু মৃত্যুৰ আশংকা বঢ়ায়। মেক্ৰ'ছ'মিয়া ওলোটা, চাৰি কিলোগ্ৰামৰ ওপৰত।");

add("nursing-104",
  "Oral contraceptive pills act mainly by",
  "মুখে খোৱা গৰ্ভনিৰোধক বড়িয়ে মূলতঃ কেনেকৈ কাম কৰে",
  [["suppressing ovulation", "ডিম্বস্ফোটন দমন কৰি"], ["killing sperm", "শুক্ৰাণু মাৰি"], ["blocking the fallopian tube", "ফেল'পিয়ান নলী বন্ধ কৰি"], ["thickening the uterine wall", "গৰ্ভাশয় বেৰ ডাঠ কৰি"]], 0,
  "The hormones prevent the pituitary surge that releases an egg. Barrier methods block sperm and sterilisation blocks the tube.",
  "হৰম'নে পিট্যুইটাৰীৰ ডিম্ব এৰা ঢৌ ৰোধ কৰে। বাধা পদ্ধতিয়ে শুক্ৰাণু ৰোধে আৰু বন্ধ্যাকৰণে নলী বন্ধ কৰে।");

add("nursing-105",
  "The nurse should teach a pregnant woman to report immediately",
  "নাৰ্ছে গৰ্ভৱতী মহিলাক লগে লগে জনাবলৈ শিকাব লাগে",
  [["severe headache with blurred vision", "ধোঁৱা দৃষ্টিৰ সৈতে তীব্ৰ মূৰৰ বিষ"], ["mild ankle swelling in the evening", "সন্ধিয়া ভৰিৰ সাধাৰণ ওফন্দা"], ["food cravings", "খাদ্যৰ হাবিয়াস"], ["occasional heartburn", "মাজে মাজে বুকু জ্বলা"]], 0,
  "Headache with visual disturbance points to pre-eclampsia, which can progress to fits. Mild swelling and cravings are normal.",
  "মূৰৰ বিষ আৰু দৃষ্টিৰ সমস্যাই প্ৰি-এক্লেম্পছিয়া দেখুৱায়, যি খিঁচলৈ বাঢ়িব পাৰে। সাধাৰণ ওফন্দা আৰু হাবিয়াস স্বাভাৱিক।");

add("nursing-106",
  "Weaning should begin in a healthy infant at about",
  "সুস্থ শিশুত অতিৰিক্ত খাদ্য আৰম্ভ কৰিব লাগে প্ৰায়",
  [["six months", "ছয় মাহত"], ["two months", "দুই মাহত"], ["twelve months", "বাৰ মাহত"], ["one month", "এক মাহত"]], 0,
  "At six months the gut is ready and breast milk alone no longer meets energy needs. Earlier feeding raises infection and allergy risk.",
  "ছয় মাহত অন্ত্ৰ সাজু হয় আৰু কেৱল মাকৰ গাখীৰে শক্তিৰ প্ৰয়োজন পূৰণ নকৰে। আগতে দিলে সংক্ৰমণ আৰু এলাৰ্জিৰ আশংকা বাঢ়ে।");

add("nursing-107",
  "Which of the following is the correct position for a newborn to sleep?",
  "নৱজাতকে টোপনি যোৱাৰ শুদ্ধ অৱস্থান",
  [["on the back", "পিঠিত দি"], ["on the abdomen", "পেটত দি"], ["on the left side only", "কেৱল বাওঁ কাষত"], ["head down", "মূৰ তলত দি"]], 0,
  "Back sleeping keeps the airway clear and reduces sudden infant death. Prone sleeping is a recognised risk factor.",
  "পিঠিত শুলে বায়ুপথ খোলা থাকে আৰু হঠাতে শিশু মৃত্যু কমে। পেটত শোৱা জানা বিপদ কাৰক।");

add("nursing-108",
  "Gestational diabetes is diabetes that",
  "গৰ্ভাৱস্থাৰ মধুমেহ হ'ল মধুমেহ যি",
  [["first appears during pregnancy", "প্ৰথমে গৰ্ভাৱস্থাত দেখা দিয়ে"], ["exists before pregnancy only", "কেৱল গৰ্ভাৱস্থাৰ আগতে থাকে"], ["affects only the baby", "কেৱল শিশুক প্ৰভাৱিত কৰে"], ["needs no monitoring", "পৰ্যবেক্ষণ নালাগে"]], 0,
  "It is glucose intolerance recognised in pregnancy and usually resolves after birth, though it raises later diabetes risk.",
  "ই গৰ্ভাৱস্থাত ধৰা পৰা গ্লুক'জ অসহিষ্ণুতা, প্ৰসৱৰ পিছত সাধাৰণতে ঠিক হয়, কিন্তু পিছত মধুমেহৰ আশংকা বঢ়ায়।");

add("nursing-109",
  "The umbilical cord normally contains",
  "নাভিৰ ৰছীত সাধাৰণতে থাকে",
  [["two arteries and one vein", "দুটা ধমনী আৰু এটা শিৰা"], ["two veins and one artery", "দুটা শিৰা আৰু এটা ধমনী"], ["three arteries", "তিনিটা ধমনী"], ["three veins", "তিনিটা শিৰা"]], 0,
  "Two arteries carry waste away and one vein brings oxygenated blood. A single artery is linked to kidney anomalies.",
  "দুটা ধমনীয়ে বৰ্জন নিয়ে আৰু এটা শিৰাই অক্সিজেনযুক্ত ৰক্ত আনে। এটা ধমনী বৃক্কৰ অস্বাভাৱিকতাৰ সৈতে জড়িত।");

add("nursing-110",
  "Which of the following is a sign of true labour?",
  "তলৰ কোনটো প্ৰকৃত প্ৰসৱৰ চিন",
  [["regular painful contractions that increase in strength", "শক্তি বঢ়োৱা নিয়মীয়া বিষযুক্ত সংকোচন"], ["irregular pain relieved by rest", "বিশ্ৰামত কমা অনিয়মীয়া বিষ"], ["painless tightening only", "কেৱল বিষহীন টান"], ["sudden weight gain", "হঠাতে ওজন বঢ়া"]], 0,
  "True labour contractions come regularly, get stronger and do not stop with rest. False labour is irregular and settles.",
  "প্ৰকৃত প্ৰসৱৰ সংকোচন নিয়মীয়াকৈ আহি বাঢ়ে আৰু বিশ্ৰামত নকমে। মিছা প্ৰসৱ অনিয়মীয়া আৰু কমি যায়।");

add("nursing-111",
  "The nurse should initiate breast feeding within",
  "নাৰ্ছে মাকৰ গাখীৰ কিমান সময়ৰ ভিতৰত আৰম্ভ কৰাব লাগে",
  [["one hour of birth", "জন্মৰ এক ঘণ্টাৰ ভিতৰত"], ["twelve hours", "বাৰ ঘণ্টাত"], ["one day", "এদিনত"], ["one week", "এসপ্তাহত"]], 0,
  "Early suckling triggers milk let-down, warms the baby and gives colostrum. Delay reduces success and increases hypoglycaemia.",
  "সোনকালে চুহিলে গাখীৰ নামে, শিশু উম হয় আৰু কল'ষ্ট্ৰাম পায়। পলমে সফলতা কমাই কম চেনিৰ আশংকা বঢ়ায়।");

add("nursing-112",
  "Pre-eclampsia is characterised by",
  "প্ৰি-এক্লেম্পছিয়াৰ বৈশিষ্ট্য",
  [["hypertension with protein in urine", "মূত্ৰত প্ৰ'টিনৰ সৈতে উচ্চ ৰক্তচাপ"], ["low blood pressure", "নিম্ন ৰক্তচাপ"], ["high blood sugar", "উচ্চ ৰক্ত শৰ্কৰা"], ["low temperature", "কম উষ্ণতা"]], 0,
  "Raised pressure with proteinuria after twenty weeks defines it. Untreated it progresses to fits, which is eclampsia.",
  "বিশ সপ্তাহৰ পিছত বঢ়া চাপ আৰু মূত্ৰত প্ৰ'টিনে ইয়াক নিৰ্ধাৰণ কৰে। চিকিৎসা নহ'লে খিঁচলৈ বাঢ়ে, যি এক্লেম্পছিয়া।");

add("nursing-113",
  "The best method to prevent mother-to-child transmission of HIV is",
  "মাকৰপৰা শিশুলৈ HIV সংক্ৰমণ ৰোধৰ আটাই ভাল উপায়",
  [["antiretroviral treatment for mother and baby", "মাক আৰু শিশুৰ বাবে এণ্টিৰিট্ৰ'ভাইৰেল চিকিৎসা"], ["avoiding all check-ups", "সকলো পৰীক্ষা এৰাই চলা"], ["stopping breast feeding only", "কেৱল গাখীৰ খুওৱা বন্ধ কৰা"], ["giving antibiotics", "এণ্টিবায়'টিক দিয়া"]], 0,
  "Suppressing the viral load with antiretrovirals in pregnancy, labour and the newborn period cuts transmission to a few per cent.",
  "গৰ্ভাৱস্থা, প্ৰসৱ আৰু নৱজাতক কালত এণ্টিৰিট্ৰ'ভাইৰেলে ভাইৰাছৰ মাত্ৰা কমাই সংক্ৰমণ কেই শতাংশলৈ নামায়।");

add("nursing-114",
  "Which of the following is included in the Apgar score?",
  "এপগাৰ স্ক'ৰত তলৰ কোনটো সন্নিৱিষ্ট",
  [["heart rate, breathing, tone, reflex and colour", "হৃদয়ৰ গতি, উশাহ, পেশীৰ টান, প্ৰতিবিম্ব আৰু ৰং"], ["weight and length", "ওজন আৰু দীঘ"], ["head circumference only", "কেৱল মূৰৰ পৰিধি"], ["blood group", "ৰক্ত শ্ৰেণী"]], 0,
  "The five signs each score zero to two. Weight and length describe growth, not immediate condition.",
  "পাঁচটা চিনে শূন্যৰপৰা দুই নম্বৰ দিয়ে। ওজন আৰু দীঘে বৃদ্ধি বৰ্ণায়, তৎকালীন অৱস্থা নহয়।");

add("nursing-115",
  "The nurse advises a mother to start complementary feeding with",
  "নাৰ্ছে মাকক অতিৰিক্ত খাদ্য কিৰে আৰম্ভ কৰিবলৈ কয়",
  [["mashed home food with added oil", "তেল যোগ কৰা ঘৰুৱা মচলা খাদ্য"], ["tea and biscuits", "চাহ আৰু বিস্কুট"], ["only fruit juice", "কেৱল ফলৰ ৰস"], ["only plain water", "কেৱল সাধাৰণ পানী"]], 0,
  "Home food mashed with a little oil gives energy and iron. Tea and juice displace milk without supplying enough nutrients.",
  "অলপ তেল যোগ কৰি মচকা কৰা ঘৰুৱা খাদ্যই শক্তি আৰু লো দিয়ে। চাহ আৰু ৰসে গাখীৰ আঁতৰাই পুষ্টি নিদিয়ে।");

add("nursing-116",
  "Which of the following is a contraindication to breast feeding?",
  "তলৰ কোনটো মাকৰ গাখীৰ খুওৱাৰ বাধা",
  [["the mother is on a cytotoxic drug", "মাক চাইট'টক্সিক ঔষধত আছে"], ["the mother has a common cold", "মাকৰ সাধাৰণ ঠাণ্ডা"], ["the baby is premature", "শিশু অকালজাত"], ["the mother is anaemic", "মাক ৰক্তহীন"]], 0,
  "Cytotoxic drugs pass into milk and harm the infant. A cold, prematurity and anaemia are not reasons to stop.",
  "চাইট'টক্সিক ঔষধ গাখীৰত সোমাই শিশুক হানি কৰে। ঠাণ্ডা, অকালতা আৰু ৰক্তহীনতা বন্ধ কৰাৰ কাৰণ নহয়।");

add("nursing-117",
  "The most effective way to reduce maternal mortality is to",
  "মাতৃ মৃত্যু কমোৱাৰ আটাই ফলপ্ৰসূ উপায়",
  [["ensure skilled attendance at every birth", "প্ৰতিটো প্ৰসৱত দক্ষ সেৱা নিশ্চিত কৰা"], ["build more offices", "বেছি কাৰ্যালয় সজা"], ["reduce the number of hospitals", "চিকিৎসালয়ৰ সংখ্যা কমোৱা"], ["delay all referrals", "সকলো প্ৰেৰণ পলম কৰা"]], 0,
  "Most maternal deaths come from bleeding, fits and obstructed labour, all treatable by a skilled attendant with referral backup.",
  "বেছিভাগ মাতৃ মৃত্যু ৰক্তক্ষৰণ, খিঁচ আৰু বন্ধ প্ৰসৱৰপৰা হয়, যি দক্ষ সেৱা আৰু প্ৰেৰণৰ সহায়ত চিকিৎসাযোগ্য।");

add("nursing-118",
  "Physiological jaundice of the newborn usually appears",
  "নৱজাতকৰ স্বাভাৱিক জণ্ডিছ সাধাৰণতে কেতিয়া দেখা দিয়ে",
  [["after 24 hours of birth", "জন্মৰ ২৪ ঘণ্টা পিছত"], ["within the first hour", "প্ৰথম ঘণ্টাৰ ভিতৰত"], ["after one month", "এক মাহ পিছত"], ["before birth", "জন্মৰ আগতে"]], 0,
  "Jaundice in the first day is always pathological and needs investigation. Physiological jaundice peaks on day three to five.",
  "প্ৰথম দিনৰ জণ্ডিছ সদায় ৰোগজনিত আৰু পৰীক্ষা লাগে। স্বাভাৱিক জণ্ডিছ তৃতীয়ৰপৰা পঞ্চম দিনত শিখৰত থাকে।");

add("nursing-119",
  "A woman using an intrauterine device should be told that",
  "ইণ্ট্ৰাইউটাৰিন সজুলি ব্যৱহাৰ কৰা মহিলাক কোৱা উচিত যে",
  [["it does not protect against sexually transmitted infection", "ই যৌন সংক্ৰমণৰপৰা ৰক্ষা নকৰে"], ["it protects against all infections", "ই সকলো সংক্ৰমণৰপৰা ৰক্ষা কৰে"], ["it must be replaced monthly", "ই মাহে মাহে সলাব লাগে"], ["it causes permanent infertility", "ই স্থায়ী বন্ধ্যাকৰণ কৰে"]], 0,
  "The device prevents pregnancy but not infection, so condoms are still needed. It is effective for years and fertility returns.",
  "সজুলিয়ে গৰ্ভধাৰণ ৰোধ কৰে কিন্তু সংক্ৰমণ নহয়, সেয়ে কণ্ডম লাগে। ই বছৰজুৰি ফলপ্ৰসূ আৰু উৰ্বৰতা ঘূৰি আহে।");

add("nursing-120",
  "The nurse assesses the newborn's fontanelle mainly to detect",
  "নাৰ্ছে নৱজাতকৰ মূৰৰ কোমল স্থান পৰীক্ষা কৰে মূলতঃ কি ধৰিবলৈ",
  [["hydration and intracranial pressure", "পানীশূন্যতা আৰু কৰোটিৰ ভিতৰৰ চাপ"], ["hair growth", "চুলিৰ বৃদ্ধি"], ["hearing ability", "শ্ৰৱণ ক্ষমতা"], ["blood group", "ৰক্ত শ্ৰেণী"]], 0,
  "A sunken fontanelle means dehydration and a bulging one means raised pressure. Hearing and blood group need other tests.",
  "তললৈ ধঁ‌‌‌সা ফণ্টানেলে পানীশূন্যতা আৰু ওফন্দি উঠাটোৱে বঢ়া চাপ দেখুৱায়। শ্ৰৱণ আৰু ৰক্ত শ্ৰেণীলৈ আন পৰীক্ষা লাগে।");

/* ================= pharmacology ================= */
useLeaf("pharmacology");

add("nursing-121",
  "The route by which a drug is absorbed most slowly is",
  "কোন পথেৰে ঔষধ আটাই লাহে শোষিত হয়",
  [["oral", "মুখে"], ["intravenous", "অন্তঃশিৰা"], ["intramuscular", "পেশীত"], ["sublingual", "জিভাৰ তলত"]], 0,
  "An oral drug must dissolve, survive stomach acid and cross the gut wall, so it is the slowest. Intravenous skips absorption entirely.",
  "মুখে খোৱা ঔষধ গলি, পেটৰ অম্ল সহি অন্ত্ৰৰ বেৰ পাৰ হ'ব লাগে, সেয়ে আটাই লাহে। অন্তঃশিৰাত শোষণ নালাগে।");

add("nursing-122",
  "Paracetamol is mainly used as an",
  "পেৰাছিটামল মূলতঃ ব্যৱহৃত হয় কি হিচাপে",
  [["analgesic and antipyretic", "বিষনাশক আৰু জ্বৰনাশক"], ["antibiotic", "এণ্টিবায়'টিক"], ["anticoagulant", "ৰক্ত পাতলকাৰক"], ["diuretic", "মূত্ৰবৰ্ধক"]], 0,
  "It relieves pain and lowers fever but has no antibacterial action. Overdose damages the liver, which is why the dose matters.",
  "ই বিষ কমায় আৰু জ্বৰ নামায় কিন্তু বেক্টেৰিয়া মৰা কাম নকৰে। বেছি মাত্ৰাই যকৃত নষ্ট কৰে, সেয়ে মাত্ৰা গুৰুত্বপূৰ্ণ।");

add("nursing-123",
  "The antidote for paracetamol overdose is",
  "পেৰাছিটামলৰ বেছি মাত্ৰাৰ প্ৰতিবিষ",
  [["N-acetylcysteine", "N-এছিটাইলচিষ্টিন"], ["atropine", "এট্ৰ'পিন"], ["naloxone", "নালক্স'ন"], ["vitamin K", "ভিটামিন K"]], 0,
  "N-acetylcysteine restores glutathione and protects the liver. Naloxone reverses opioids and atropine reverses organophosphates.",
  "N-এছিটাইলচিষ্টিনে গ্লুটাথায়'ন ঘূৰাই যকৃত ৰক্ষা কৰে। নালক্স'নে অপিঅয়ড আৰু এট্ৰ'পিনে অৰ্গেন'ফছফেটৰ বিষ কাটে।");

add("nursing-124",
  "Which drug is used to reverse opioid overdose?",
  "অপিঅয়ডৰ বেছি মাত্ৰা কাটিবলৈ কোন ঔষধ ব্যৱহৃত হয়",
  [["naloxone", "নালক্স'ন"], ["adrenaline", "এড্ৰিনেলিন"], ["insulin", "ইনচুলিন"], ["heparin", "হেপেৰিন"]], 0,
  "Naloxone blocks opioid receptors and restores breathing within minutes. Adrenaline is for anaphylaxis and insulin for high glucose.",
  "নালক্স'নে অপিঅয়ড গ্ৰাহক বন্ধ কৰি মিনিটৰ ভিতৰতে উশাহ ঘূৰায়। এড্ৰিনেলিন এনাফাইলেক্সিছৰ আৰু ইনচুলিন উচ্চ গ্লুক'জৰ।");

add("nursing-125",
  "Insulin is administered by which route?",
  "ইনচুলিন কোন পথেৰে দিয়া হয়",
  [["subcutaneous injection", "ত্বকৰ তলৰ ইনজেকচন"], ["oral tablet", "মুখে খোৱা বড়ি"], ["intravenous bolus always", "সদায় অন্তঃশিৰা"], ["topical cream", "বাহ্যিক মলম"]], 0,
  "Insulin is a protein and would be digested if swallowed, so it is injected into fatty tissue. Only certain types are given intravenously in hospital.",
  "ইনচুলিন প্ৰ'টিন, গিলিলে হজম হয়, সেয়ে চৰ্বিৰ কলাত ইনজেকচন কৰা হয়। কেবল কিছুমান প্ৰকাৰ চিকিৎসালয়ত অন্তঃশিৰাত দিয়া হয়।");

add("nursing-126",
  "The side effect most characteristic of streptomycin is",
  "ষ্ট্ৰেপ্ট'মাইচিনৰ আটাই বৈশিষ্ট্যপূৰ্ণ পাৰ্শ্বক্ৰিয়া",
  [["damage to the eighth cranial nerve", "অষ্টম কৰ'টিক স্নায়ুৰ ক্ষতি"], ["hair loss", "চুলি সৰা"], ["tooth staining", "দাঁতত দাগ"], ["weight gain", "ওজন বঢ়া"]], 0,
  "It harms hearing and balance, so patients are watched for tinnitus and unsteadiness. Tooth staining belongs to tetracycline.",
  "ই শ্ৰৱণ আৰু ভাৰসাম্যৰ ক্ষতি কৰে, সেয়ে কাণৰ ৰিণি আৰু টলনি চোৱা হয়। দাঁতত দাগ টেট্ৰাচাইক্লিনৰ।");

add("nursing-127",
  "Which of the following is a broad spectrum antibiotic?",
  "তলৰ কোনটো বিস্তৃত পৰিসৰৰ এণ্টিবায়'টিক",
  [["tetracycline", "টেট্ৰাচাইক্লিন"], ["penicillin G", "পেনিচিলিন G"], ["streptomycin", "ষ্ট্ৰেপ্ট'মাইচিন"], ["vancomycin", "ভেনক'মাইচিন"]], 0,
  "Tetracycline acts on both gram positive and gram negative organisms. Vancomycin is reserved for resistant gram positive infection.",
  "টেট্ৰাচাইক্লিনে গ্ৰাম ধনাত্মক আৰু ঋণাত্মক দুয়োতেই কাম কৰে। ভেনক'মাইচিন প্ৰতিৰোধী গ্ৰাম ধনাত্মক সংক্ৰমণলৈ ৰখা হয়।");

add("nursing-128",
  "A patient on warfarin should be monitored by",
  "ৱাৰফেৰিন লোৱা ৰোগীক কিৰে পৰ্যবেক্ষণ কৰিব লাগে",
  [["prothrombin time or INR", "প্ৰ'থ্ৰম্বিন সময় বা INR"], ["blood glucose", "ৰক্ত গ্লুক'জ"], ["serum calcium", "ছিৰাম কেলছিয়াম"], ["urine pH", "মূত্ৰৰ pH"]], 0,
  "Warfarin slows clotting factor synthesis, so INR shows whether the dose is safe. Glucose and calcium are unrelated.",
  "ৱাৰফেৰিনে ৰক্ত জমা কাৰকৰ সংশ্লেষণ লেহেম কৰে, সেয়ে INR এ মাত্ৰা নিৰাপদ নে নাই দেখুৱায়। গ্লুক'জ আৰু কেলছিয়াম অসম্পৰ্কিত।");

add("nursing-129",
  "Which drug is a diuretic?",
  "কোন ঔষধ মূত্ৰবৰ্ধক",
  [["furosemide", "ফুৰ'ছেমাইড"], ["ranitidine", "ৰেনিটিডিন"], ["salbutamol", "ছালবিউটামল"], ["diazepam", "ডায়াজেপাম"]], 0,
  "Furosemide acts on the kidney loop of Henle to increase urine. Salbutamol opens airways and diazepam calms the brain.",
  "ফুৰ'ছেমাইডে বৃক্কৰ হেনলী লুপত কাম কৰি মূত্ৰ বঢ়ায়। ছালবিউটামলে বায়ুপথ মেলে আৰু ডায়াজেপামে মগজু শান্ত কৰে।");

add("nursing-130",
  "The abbreviation OD in a prescription means",
  "প্ৰেছক্ৰিপচনত OD সংক্ষেপে বুজায়",
  [["once daily", "দিনত এবাৰ"], ["twice daily", "দিনত দুবাৰ"], ["every four hours", "প্ৰতি চাৰি ঘণ্টাত"], ["as needed", "প্ৰয়োজন অনুসৰি"]], 0,
  "OD is once a day and BD is twice. Misreading OD as four times is a classic dispensing error.",
  "OD দিনত এবাৰ আৰু BD দিনত দুবাৰ। OD ক চাৰি বাৰ বুলি পঢ়াটো প্ৰচলিত ঔষধ ভুল।");

add("nursing-131",
  "Which vitamin deficiency causes night blindness?",
  "কোন ভিটামিনৰ অভাৱত ৰাতি চকু নেদেখা হয়",
  [["vitamin A", "ভিটামিন A"], ["vitamin C", "ভিটামিন C"], ["vitamin D", "ভিটামিন D"], ["vitamin B12", "ভিটামিন B12"]], 0,
  "Vitamin A makes rhodopsin in the retina, so deficiency harms dim-light vision. Vitamin C deficiency causes scurvy.",
  "ভিটামিন A এ ৰেটিনাত ৰড'পচিন বনায়, সেয়ে অভাৱত কম পোহৰত দৃষ্টি নষ্ট হয়। ভিটামিন C ৰ অভাৱত স্কাৰ্ভি হয়।");

add("nursing-132",
  "Adrenaline is the drug of choice for",
  "এড্ৰিনেলিন কোন অৱস্থাৰ বাবে প্ৰথম পছন্দৰ ঔষধ",
  [["anaphylactic shock", "এনাফাইলেক্টিক শ্বক"], ["high blood pressure", "উচ্চ ৰক্তচাপ"], ["constipation", "কোষ্ঠকাঠিন্য"], ["insomnia", "নিদ্ৰাহীনতা"]], 0,
  "It opens airways, raises pressure and reverses swelling within minutes. Giving it in hypertension would be dangerous.",
  "ই বায়ুপথ মেলি, চাপ বঢ়াই আৰু মিনিটৰ ভিতৰতে ওফন্দা কমায়। উচ্চ ৰক্তচাপত দিলে বিপজ্জনক হ'ব।");

add("nursing-133",
  "The main danger of giving potassium chloride by rapid intravenous push is",
  "পটাছিয়াম ক্ল'ৰাইড দ্ৰুত অন্তঃশিৰাত দিয়াৰ মূল বিপদ",
  [["cardiac arrest", "হৃদযন্ত্ৰ বন্ধ"], ["hair loss", "চুলি সৰা"], ["tooth decay", "দাঁত ক্ষয়"], ["weight gain", "ওজন বঢ়া"]], 0,
  "A fast potassium bolus stops the heart, so it must be diluted and infused slowly. This is why concentrated vials are never pushed.",
  "দ্ৰুত পটাছিয়ামে হৃদয় বন্ধ কৰে, সেয়ে ইয়াক পাতলাই লাহে লাহে দিব লাগে। সেয়ে ঘন শিচা কেতিয়াও পুছ কৰা নহয়।");

add("nursing-134",
  "Which of the following drugs is an anticoagulant?",
  "তলৰ কোন ঔষধ ৰক্ত পাতলকাৰক",
  [["heparin", "হেপেৰিন"], ["aspirin at low dose only", "কেৱল কম মাত্ৰাৰ এছপিৰিন"], ["paracetamol", "পেৰাছিটামল"], ["metformin", "মেটফৰ্মিন"]], 0,
  "Heparin directly blocks clotting factors and acts at once. Aspirin at low dose is antiplatelet, a different mechanism.",
  "হেপেৰিনে ৰক্ত জমা কাৰক পোনপটীয়াকৈ ৰোধ কৰি লগে লগে কাম কৰে। কম মাত্ৰাৰ এছপিৰিন প্লেটলেট বিৰোধী, বেলেগ পদ্ধতি।");

add("nursing-135",
  "The term half-life of a drug means the time taken for",
  "ঔষধৰ অৰ্ধ-জীৱন মানে কিমান সময়ত",
  [["plasma concentration to fall by half", "ৰক্তৰ মাত্ৰা আধা হ'বলৈ"], ["the drug to act fully", "ঔষধে সম্পূৰ্ণ ক্ৰিয়া কৰিবলৈ"], ["the drug to be manufactured", "ঔষধ বনাবলৈ"], ["the patient to recover", "ৰোগী সুস্থ হ'বলৈ"]], 0,
  "Half-life guides how often a dose is repeated. A short half-life needs more frequent dosing to stay in range.",
  "অৰ্ধ-জীৱনে কিমান সঘন মাত্ৰা দিব লাগে নিৰ্দেশ কৰে। কম অৰ্ধ-জীৱনত সীমাৰ ভিতৰত থাকিবলৈ সঘন মাত্ৰা লাগে।");

add("nursing-136",
  "Which antibiotic class can stain the teeth of children?",
  "কোন এণ্টিবায়'টিক শ্ৰেণীয়ে শিশুৰ দাঁতত দাগ কৰিব পাৰে",
  [["tetracyclines", "টেট্ৰাচাইক্লিন"], ["penicillins", "পেনিচিলিন"], ["aminoglycosides", "এমিন'গ্লাইক'ছাইড"], ["macrolides", "মেক্ৰ'লাইড"]], 0,
  "Tetracycline binds calcium in developing teeth and bone, so it is avoided in children and pregnancy.",
  "টেট্ৰাচাইক্লিনে গঢ়ি থকা দাঁত আৰু হাড়ৰ কেলছিয়ামত লাগে, সেয়ে শিশু আৰু গৰ্ভাৱস্থাত এৰা হয়।");

add("nursing-137",
  "Salbutamol is given to a patient with asthma because it",
  "হাঁপানি ৰোগীক ছালবিউটামল দিয়া হয় কাৰণ ই",
  [["relieves bronchospasm", "ব্ৰংকীয় খিঁচ কমায়"], ["kills bacteria", "বেক্টেৰিয়া মাৰে"], ["lowers blood sugar", "ৰক্ত শৰ্কৰা কমায়"], ["increases urine", "মূত্ৰ বঢ়ায়"]], 0,
  "It relaxes the smooth muscle of the airways, giving quick relief. It has no antibacterial or diuretic action.",
  "ই বায়ুপথৰ মসৃণ পেশী শিথিল কৰি দ্ৰুত আৰাম দিয়ে। ইয়াত বেক্টেৰিয়া মৰা বা মূত্ৰবৰ্ধক ক্ৰিয়া নাই।");

add("nursing-138",
  "The abbreviation SOS on a drug chart means the medicine is given",
  "ঔষধ তালিকাত SOS মানে ঔষধ দিয়া হয়",
  [["when required in an emergency", "জৰুৰী প্ৰয়োজনত"], ["every hour", "প্ৰতি ঘণ্টাত"], ["before food", "খাদ্যৰ আগতে"], ["after food", "খাদ্যৰ পিছত"]], 0,
  "SOS means only if the need arises, so the nurse judges the situation. Regular timings are written as specific hours.",
  "SOS মানে প্ৰয়োজন হ'লেহে, সেয়ে নাৰ্ছে অৱস্থা বিচাৰ কৰে। নিয়মীয়া সময় নিৰ্দিষ্ট ঘণ্টাৰে লিখা হয়।");

add("nursing-139",
  "Which of the following is the correct action if a drug dose has already been given incorrectly?",
  "ঔষধৰ মাত্ৰা ভুলকৈ দি পেলালে শুদ্ধ কাম কি",
  [["observe the patient and report at once", "ৰোগী পৰ্যবেক্ষণ কৰি লগে লগে জনোৱা"], ["wait for the next shift", "পৰৱৰ্তী শিফ্টলৈ অপেক্ষা কৰা"], ["hide the entry", "প্ৰৱিষ্টি লুকুওৱা"], ["give a double dose to compensate", "পূৰণ কৰিবলৈ দুগুণ দিয়া"]], 0,
  "Prompt observation catches a reaction early and the report lets the doctor act. Concealing it delays treatment and is misconduct.",
  "সোনকালে পৰ্যবেক্ষণে প্ৰতিক্ৰিয়া আগতীয়াকৈ ধৰে আৰু জনালে চিকিৎসকে কাম কৰিব পাৰে। লুকুৱালে চিকিৎসা পলম হয় আৰু সেয়া কৰ্তব্যলংঘন।");

add("nursing-140",
  "Oral iron tablets are best absorbed when taken",
  "মুখে খোৱা লোৰ বড়ি কেতিয়া আটাই ভালকৈ শোষিত হয়",
  [["on an empty stomach with vitamin C", "খালী পেটত ভিটামিন C ৰ সৈতে"], ["with strong tea", "কেঁ‌‌ঢ়া চাহৰ সৈতে"], ["with milk", "গাখীৰৰ সৈতে"], ["with antacids", "এণ্টাছিডৰ সৈতে"]], 0,
  "Acid and vitamin C keep iron soluble and absorbable, while tea, milk and antacids bind it. That is why it is taken before food.",
  "অম্ল আৰু ভিটামিন C এ লো দ্ৰৱনীয় ৰাখে, আনহাতে চাহ, গাখীৰ আৰু এণ্টাছিডে ইয়াক বান্ধে। সেয়ে খাদ্যৰ আগতে দিয়া হয়।");

add("nursing-141",
  "Which drug is used to treat tuberculosis as part of first line therapy?",
  "প্ৰথম শাৰী চিকিৎসাৰ অংশ হিচাপে যক্ষ্মাৰ চিকিৎসাত কোন ঔষধ ব্যৱহৃত হয়",
  [["isoniazid", "আইছ'নিয়াজাইড"], ["paracetamol", "পেৰাছিটামল"], ["furosemide", "ফুৰ'ছেমাইড"], ["salbutamol", "ছালবিউটামল"]], 0,
  "Isoniazid, rifampicin, pyrazinamide and ethambutol form the standard regimen. The others treat unrelated conditions.",
  "আইছ'নিয়াজাইড, ৰিফাম্পিচিন, পাইৰাজিনামাইড আৰু ইথামবিউটলে প্ৰচলিত আঁচনি গঢ়ে। বাকীবোৰে অসম্পৰ্কিত অৱস্থা চিকিৎসা কৰে।");

add("nursing-142",
  "Aminoglycoside antibiotics such as gentamicin can damage the",
  "জেণ্টামাইচিনৰ দৰে এমিন'গ্লাইক'ছাইডে কি নষ্ট কৰিব পাৰে",
  [["kidney and hearing", "বৃক্ক আৰু শ্ৰৱণ"], ["skin only", "কেৱল ছাল"], ["teeth only", "কেৱল দাঁত"], ["hair only", "কেৱল চুলি"]], 0,
  "They are cleared by the kidney and are toxic to it and to the cochlea, so levels and creatinine are monitored.",
  "ই বৃক্কেৰে পৰিষ্কাৰ হয় আৰু বৃক্ক তথা কৰ্ণকোষলৈ বিষাক্ত, সেয়ে মাত্ৰা আৰু ক্ৰিয়েটিনিন চোৱা হয়।");

add("nursing-143",
  "Which of the following is a live attenuated vaccine?",
  "তলৰ কোনটো জীৱিত দুৰ্বল টিকা",
  [["BCG", "BCG"], ["tetanus toxoid", "ধনুষ্টংকাৰ টক্সয়ড"], ["hepatitis B vaccine", "হেপাটাইটিছ B টিকা"], ["inactivated polio vaccine", "নিষ্ক্ৰিয় পলিঅ' টিকা"]], 0,
  "BCG uses weakened live bacteria, which is why it is not given to severely immunocompromised people. Toxoids are inactivated.",
  "BCG ত দুৰ্বল জীৱিত বেক্টেৰিয়া, সেয়ে গুৰুতৰভাৱে ৰোগ প্ৰতিৰোধ ক্ষমতা কম লোকক নিদিয়া হয়। টক্সয়ড নিষ্ক্ৰিয়।");

add("nursing-144",
  "The correct site for an intramuscular injection in an adult is the",
  "প্ৰাপ্তবয়স্কত পেশীত ইনজেকচনৰ শুদ্ধ স্থান",
  [["upper outer quadrant of the buttock", "নিতম্বৰ ওপৰ বাহিৰৰ চতুৰ্থাংশ"], ["middle of the thigh front", "থাইৰ সন্মুখৰ মাজ"], ["inner side of the wrist", "মণিবন্ধৰ ভিতৰফাল"], ["sole of the foot", "ভৰিৰ তলুৱা"]], 0,
  "That quadrant avoids the sciatic nerve and major vessels. The inner thigh and wrist carry nerves close to the surface.",
  "সেই চতুৰ্থাংশই ছায়াটিক স্নায়ু আৰু ডাঙৰ নলী এৰায়। ভিতৰ থাই আৰু মণিবন্ধত স্নায়ু পৃষ্ঠৰ ওচৰত।");

add("nursing-145",
  "Which drug lowers blood glucose by improving insulin sensitivity?",
  "কোন ঔষধে ইনচুলিন সংবেদনশীলতা বঢ়াই ৰক্ত শৰ্কৰা কমায়",
  [["metformin", "মেটফৰ্মিন"], ["furosemide", "ফুৰ'ছেমাইড"], ["ranitidine", "ৰেনিটিডিন"], ["salbutamol", "ছালবিউটামল"]], 0,
  "Metformin reduces liver glucose output and improves sensitivity, so it does not cause hypoglycaemia on its own.",
  "মেটফৰ্মিনে যকৃতৰ গ্লুক'জ ওলোৱা কমাই সংবেদনশীলতা বঢ়ায়, সেয়ে অকলৈ কম চেনি নকৰে।");

add("nursing-146",
  "Which of the following is an antiemetic?",
  "তলৰ কোনটো বমিৰোধক",
  [["ondansetron", "অনডানছেট্ৰন"], ["insulin", "ইনচুলিন"], ["heparin", "হেপেৰিন"], ["furosemide", "ফুৰ'ছেমাইড"]], 0,
  "Ondansetron blocks serotonin receptors in the vomiting centre. Insulin, heparin and furosemide have entirely different uses.",
  "অনডানছেট্ৰনে বমি কেন্দ্ৰৰ ছেৰ'টনিন গ্ৰাহক বন্ধ কৰে। ইনচুলিন, হেপেৰিন আৰু ফুৰ'ছেমাইডৰ সম্পূৰ্ণ বেলেগ ব্যৱহাৰ।");

add("nursing-147",
  "The main reason for giving a loading dose of a drug is to",
  "ঔষধৰ ল'ডিং মাত্ৰা দিয়াৰ মূল কাৰণ",
  [["reach therapeutic level quickly", "চিকিৎসাৰ মাত্ৰাত সোনকালে পোৱা"], ["save money", "ধন সঞ্চয় কৰা"], ["reduce side effects to zero", "পাৰ্শ্বক্ৰিয়া শূন্য কৰা"], ["avoid monitoring", "পৰ্যবেক্ষণ এৰাই চলা"]], 0,
  "A large first dose fills the body's distribution volume so the effect starts sooner, after which maintenance doses hold it.",
  "ডাঙৰ প্ৰথম মাত্ৰাই শৰীৰৰ বিতৰণ স্থান ভৰায় যাতে ক্ৰিয়া সোনকালে আৰম্ভ হয়, তাৰ পিছত ৰক্ষণাবেক্ষণ মাত্ৰাই ধৰি ৰাখে।");

add("nursing-148",
  "Which of the following drugs is a bronchodilator given by inhalation?",
  "তলৰ কোন ঔষধ শ্বাসেৰে লোৱা ব্ৰংক'ডাইলেটৰ",
  [["salbutamol", "ছালবিউটামল"], ["metformin", "মেটফৰ্মিন"], ["warfarin", "ৱাৰফেৰিন"], ["ondansetron", "অনডানছেট্ৰন"]], 0,
  "Inhaled salbutamol reaches the airway directly, so it works fast with fewer systemic effects. The others are given by mouth.",
  "শ্বাসেৰে লোৱা ছালবিউটামলে বায়ুপথ পোনপটীয়াকৈ পায়, সেয়ে দ্ৰুত কাম কৰি কম প্ৰণালীব্যাপী প্ৰভাৱ দিয়ে। বাকীবোৰ মুখে দিয়া হয়।");

add("nursing-149",
  "The nurse must shake a suspension before measuring because",
  "নাৰ্ছে জুখিবৰ আগতে ছাছপেনশ্যন জোকাৰে কাৰণ",
  [["the drug settles and the dose would be uneven", "ঔষধ তললৈ জমে আৰু মাত্ৰা অসম হ'ব"], ["it changes colour", "ৰং সলনি হয়"], ["it becomes sterile", "জীৱাণুমুক্ত হয়"], ["it evaporates", "বাষ্পীভূত হয়"]], 0,
  "Settled particles leave the liquid weak at the top and strong at the bottom, so shaking gives an even dose each time.",
  "জমা কণিকাই ওপৰত দুৰ্বল আৰু তলত ঘন তৰল এৰে, সেয়ে জোকাৰিলে প্ৰতিবাৰে সমান মাত্ৰা দিয়ে।");

add("nursing-150",
  "Which of the following best describes a placebo?",
  "তলৰ কোনটোৱে প্লেছেব' ভালদৰে বৰ্ণনা কৰে",
  [["an inactive substance given for its psychological effect", "মনস্তাত্ত্বিক প্ৰভাৱৰ বাবে দিয়া নিষ্ক্ৰিয় পদাৰ্থ"], ["a very strong antibiotic", "অতি শক্তিশালী এণ্টিবায়'টিক"], ["a vaccine", "এটা টিকা"], ["a vitamin injection", "ভিটামিন ইনজেকচন"]], 0,
  "A placebo contains no active drug, so any change comes from expectation. It is the control in a clinical trial.",
  "প্লেছেব'ত সক্ৰিয় ঔষধ নাথাকে, সেয়ে যিকোনো পৰিৱৰ্তন আশাৰপৰা আহে। ই ক্লিনিকেল পৰীক্ষাৰ নিয়ন্ত্ৰণ।");

/* ================= lab-technology ================= */
useLeaf("lab-technology");

add("nursing-151",
  "The normal haemoglobin level in an adult male is about",
  "প্ৰাপ্তবয়স্ক পুৰুষৰ স্বাভাৱিক হিম'গ্লবিন মাত্ৰা প্ৰায়",
  [["13 to 17 g/dL", "১৩ ৰপৰা ১৭ গ্ৰা./ডে.লি."], ["7 to 9 g/dL", "৭ ৰপৰা ৯ গ্ৰা./ডে.লি."], ["20 to 25 g/dL", "২০ ৰপৰা ২৫ গ্ৰা./ডে.লি."], ["4 to 6 g/dL", "৪ ৰপৰা ৬ গ্ৰা./ডে.লি."]], 0,
  "Thirteen to seventeen grams per decilitre is the adult male reference. Below that is anaemia and far above suggests polycythaemia.",
  "১৩ ৰপৰা ১৭ গ্ৰাম প্ৰতি ডেচিলিটাৰ পুৰুষৰ মান। তলত ৰক্তহীনতা আৰু বহু ওপৰত পলিচাইথিমিয়া।");

add("nursing-152",
  "Blood for a routine haematology test is best collected in a tube containing",
  "সাধাৰণ ৰক্তবিজ্ঞান পৰীক্ষাৰ বাবে ৰক্ত সংগ্ৰহ কৰা নলীত থাকিব লাগে",
  [["EDTA", "EDTA"], ["plain glass only", "কেৱল সাধাৰণ কাচ"], ["citrate only", "কেৱল ছাইট্ৰেট"], ["heparin only", "কেৱল হেপেৰিন"]], 0,
  "EDTA chelates calcium and stops clotting without altering cell shape, which cell counters need. Plain tubes clot and cannot be counted.",
  "EDTA এ কেলছিয়াম বান্ধি ৰক্ত জমা ৰোধ কৰে আৰু কোষৰ আকাৰ নসলে, যি কাউণ্টাৰলৈ লাগে। সাধাৰণ নলীত ৰক্ত জমে, গণিব নোৱাৰি।");

add("nursing-153",
  "A raised erythrocyte sedimentation rate most often indicates",
  "বঢ়া লোহিত কণিকা অধঃক্ষেপণ হাৰে সাধাৰণতে কি দেখুৱায়",
  [["inflammation or infection", "প্ৰদাহ বা সংক্ৰমণ"], ["normal health", "স্বাভাৱিক স্বাস্থ্য"], ["dehydration only", "কেৱল পানীশূন্যতা"], ["low blood sugar", "কম ৰক্ত শৰ্কৰা"]], 0,
  "Inflammation makes red cells settle faster, so ESR is a general marker rather than a specific diagnosis.",
  "প্ৰদাহে লোহিত কণিকা সোনকালে তললৈ যাব দিয়ে, সেয়ে ESR সাধাৰণ চিহ্ন, নিৰ্দিষ্ট ৰোগ নিৰ্ণয় নহয়।");

add("nursing-154",
  "The anticoagulant used in a tube for blood sugar estimation is",
  "ৰক্ত শৰ্কৰা জোখাৰ নলীত ব্যৱহৃত ৰক্ত জমা ৰোধক",
  [["sodium fluoride", "ছডিয়াম ফ্ল'ৰাইড"], ["EDTA", "EDTA"], ["citrate", "ছাইট্ৰেট"], ["plain tube", "সাধাৰণ নলী"]], 0,
  "Fluoride blocks glycolysis so the glucose value does not fall while the sample waits. EDTA and citrate serve other tests.",
  "ফ্ল'ৰাইডে গ্লাইক'লাইছিছ ৰোধ কৰে যাতে নমুনা ৰৈ থাকোঁতে গ্লুক'জ নকমে। EDTA আৰু ছাইট্ৰেটে আন পৰীক্ষাৰ কাম কৰে।");

add("nursing-155",
  "A Gram stain is used to",
  "গ্ৰাম দাগ ব্যৱহৃত হয় কিৰ বাবে",
  [["classify bacteria as gram positive or negative", "বেক্টেৰিয়াক গ্ৰাম ধনাত্মক বা ঋণাত্মক শ্ৰেণীত ভাগ কৰিবলৈ"], ["count red cells", "লোহিত কণিকা গণিবলৈ"], ["measure glucose", "গ্লুক'জ জোখা"], ["detect pregnancy", "গৰ্ভধাৰণ ধৰিবলৈ"]], 0,
  "The thick peptidoglycan wall of gram positive organisms keeps the purple dye, while gram negative ones lose it and take the pink counterstain.",
  "গ্ৰাম ধনাত্মকৰ ডাঠ বেৰে বেঙুনীয়া ৰং ধৰি ৰাখে, ঋণাত্মকবোৰে হেৰুৱাই গুলপীয়া ৰং লয়।");

add("nursing-156",
  "The most common site for venepuncture in an adult is the",
  "প্ৰাপ্তবয়স্কত শিৰা ফুটোৱাৰ আটাই সাধাৰণ স্থান",
  [["median cubital vein", "মিডিয়ান কিউবিটেল শিৰা"], ["femoral vein", "ফিম'ৰেল শিৰা"], ["jugular vein", "জগুলাৰ শিৰা"], ["dorsal vein of the foot", "ভৰিৰ পিঠিৰ শিৰা"]], 0,
  "The median cubital vein is large, superficial and away from arteries and nerves. Femoral and jugular punctures carry much higher risk.",
  "মিডিয়ান কিউবিটেল শিৰা ডাঙৰ, পৃষ্ঠত আৰু ধমনী-স্নায়ুৰপৰা আঁতৰত। ফিম'ৰেল আৰু জগুলাৰত বহু বেছি বিপদ।");

add("nursing-157",
  "Which of the following is a sterile procedure?",
  "তলৰ কোনটো জীৱাণুমুক্ত প্ৰক্ৰিয়া",
  [["inserting a urinary catheter", "মূত্ৰ কেথেটাৰ ভৰোৱা"], ["counting the pulse", "নাড়ী গণা"], ["weighing a patient", "ৰোগীৰ ওজন জোখা"], ["measuring height", "উচ্চতা জোখা"]], 0,
  "The catheter passes into a sterile body cavity, so gloves, drapes and cleaning must be sterile. Pulse and weight need no such care.",
  "কেথেটাৰ জীৱাণুমুক্ত শৰীৰ গহ্বৰলৈ যায়, সেয়ে দস্তানা, আৱৰণ আৰু পৰিষ্কাৰ জীৱাণুমুক্ত হ'ব লাগে। নাড়ী আৰু ওজনলৈ এনে যতন নালাগে।");

add("nursing-158",
  "The normal urine specific gravity range is",
  "মূত্ৰৰ স্বাভাৱিক আপেক্ষিক ঘনত্বৰ পৰিসৰ",
  [["1.005 to 1.030", "১.০০৫ ৰপৰা ১.০৩০"], ["1.040 to 1.060", "১.০৪০ ৰপৰা ১.০৬০"], ["0.500 to 0.700", "০.৫০০ ৰপৰা ০.৭০০"], ["2.000 to 2.500", "২.০০০ ৰপৰা ২.৫০০"]], 0,
  "The range reflects the kidney's ability to concentrate and dilute. A fixed low value suggests the kidney cannot concentrate urine.",
  "পৰিসৰে বৃক্কৰ ঘন আৰু পাতল কৰাৰ ক্ষমতা দেখুৱায়। সদায় কম মানে বৃক্কই মূত্ৰ ঘন কৰিব নোৱাৰা বুজায়।");

add("nursing-159",
  "A sample for blood culture should be collected",
  "ৰক্ত সংৱৰ্ধনৰ নমুনা কেতিয়া সংগ্ৰহ কৰিব লাগে",
  [["before starting antibiotics", "এণ্টিবায়'টিক আৰম্ভ কৰাৰ আগতে"], ["after a week of antibiotics", "এসপ্তাহ এণ্টিবায়'টিকৰ পিছত"], ["only at midnight", "কেৱল মাজৰাতি"], ["after the patient recovers", "ৰোগী সুস্থ হোৱাৰ পিছত"]], 0,
  "Antibiotics reduce the number of organisms in the blood, so the culture may not grow. Collection comes first.",
  "এণ্টিবায়'টিকে ৰক্তত জীৱাণু কমায়, সেয়ে সংৱৰ্ধন নহ'বও পাৰে। সংগ্ৰহ আগতে কৰিব লাগে।");

add("nursing-160",
  "Which test measures kidney function?",
  "কোন পৰীক্ষাই বৃক্কৰ কাৰ্য জোখে",
  [["serum creatinine", "ছিৰাম ক্ৰিয়েটিনিন"], ["serum amylase", "ছিৰাম এমাইলেজ"], ["prothrombin time", "প্ৰ'থ্ৰম্বিন সময়"], ["ESR", "ESR"]], 0,
  "Creatinine is filtered by the kidney, so a rising level means falling filtration. Amylase reflects the pancreas.",
  "ক্ৰিয়েটিনিন বৃক্কে ছেকি পেলায়, সেয়ে বঢ়া মানে পৰিস্ৰাৱন কমা। এমাইলেজে অগ্ন্যাশয় দেখুৱায়।");

add("nursing-161",
  "The correct way to dispose of a used needle is to",
  "ব্যৱহৃত ছুই দিয়াৰ শুদ্ধ উপায়",
  [["drop it into a puncture-proof sharps container without recapping", "ঢাকি নধৰাকৈ ছিদ্ৰৰোধী শাৰ্পছ পাত্রত পেলোৱা"], ["recap it and put it in a bin", "ঢাকি সাধাৰণ জাবৰত পেলোৱা"], ["bend it and throw it away", "বেঁ‌কা কৰি পেলোৱা"], ["keep it in a pocket", "জেপত ৰখা"]], 0,
  "Recapping causes most needlestick injuries, so the needle goes straight into a rigid container that cannot be pierced.",
  "ঢাকি ধৰোঁতে বেছিভাগ ছুই আঘাত হয়, সেয়ে ছুই পোনপটীয়াকৈ ফুটিব নোৱৰা পাত্রত পেলোৱা হয়।");

add("nursing-162",
  "A high serum potassium level is called",
  "ছিৰামত বেছি পটাছিয়ামক কি বোলা হয়",
  [["hyperkalaemia", "হাইপাৰকেলিমিয়া"], ["hypokalaemia", "হাইপ'কেলিমিয়া"], ["hypernatraemia", "হাইপাৰনেট্ৰিমিয়া"], ["hypocalcaemia", "হাইপ'কেলছিমিয়া"]], 0,
  "Hyperkalaemia can stop the heart, so it is treated as an emergency. The other terms refer to sodium and calcium.",
  "হাইপাৰকেলিমিয়াই হৃদয় বন্ধ কৰিব পাৰে, সেয়ে জৰুৰী অৱস্থা হিচাপে চিকিৎসা কৰা হয়। বাকী শব্দই ছডিয়াম আৰু কেলছিয়ামলৈ।");

add("nursing-163",
  "A tourniquet is applied before venepuncture to",
  "শিৰা ফুটোৱাৰ আগতে টুৰ্নিকেট লগোৱা হয় কিৰ বাবে",
  [["make the vein prominent by obstructing venous return", "শিৰাৰ প্ৰবাহ ৰোধ কৰি শিৰা স্পষ্ট কৰিবলৈ"], ["stop arterial flow", "ধমনীৰ প্ৰবাহ বন্ধ কৰিবলৈ"], ["reduce pain", "বিষ কমাবলৈ"], ["sterilise the skin", "ছাল জীৱাণুমুক্ত কৰিবলৈ"]], 0,
  "Blocking the vein while arterial flow continues fills the vein and makes it easy to see. Blocking arteries would damage the limb.",
  "শিৰা ৰোধ কৰি ধমনী চলি থাকিলে শিৰা ভৰি সহজে দেখা যায়। ধমনী বন্ধ কৰিলে অংগ নষ্ট হ'ব।");

add("nursing-164",
  "Which of the following is a correctly matched normal value?",
  "তলৰ কোনটো শুদ্ধভাৱে মিলোৱা স্বাভাৱিক মান",
  [["fasting blood glucose 70 to 100 mg/dL", "খালী পেটৰ ৰক্ত শৰ্কৰা ৭০ ৰপৰা ১০০ মি.গ্ৰা./ডে.লি."], ["fasting blood glucose 300 mg/dL", "খালী পেটৰ ৰক্ত শৰ্কৰা ৩০০ মি.গ্ৰা./ডে.লি."], ["serum sodium 40 mEq/L", "ছিৰাম ছডিয়াম ৪০ mEq/L"], ["haemoglobin 2 g/dL", "হিম'গ্লবিন ২ গ্ৰা./ডে.লি."]], 0,
  "Seventy to a hundred is the normal fasting range. Three hundred indicates diabetes and the other two values are incompatible with life.",
  "৭০ ৰপৰা ১০০ স্বাভাৱিক খালী পেটৰ পৰিসৰ। ৩০০ এ মধুমেহ আৰু বাকী দুটা মান জীৱনৰ সৈতে অসঙ্গত।");

add("nursing-165",
  "The purpose of a urine culture and sensitivity test is to",
  "মূত্ৰ সংৱৰ্ধন আৰু সংবেদনশীলতা পৰীক্ষাৰ উদ্দেশ্য",
  [["identify the organism and the antibiotic that kills it", "জীৱাণু আৰু তাক মৰা এণ্টিবায়'টিক চিনাক্ত কৰা"], ["measure urine volume", "মূত্ৰৰ পৰিমাণ জোখা"], ["check urine colour", "মূত্ৰৰ ৰং পৰীক্ষা কৰা"], ["count red cells", "লোহিত কণিকা গণা"]], 0,
  "The culture grows the organism and the sensitivity panel shows which drugs work, so treatment is targeted rather than guessed.",
  "সংৱৰ্ধনে জীৱাণু বঢ়ায় আৰু সংবেদনশীলতা তালিকাই কোন ঔষধে কাম কৰে দেখুৱায়, সেয়ে চিকিৎসা অনুমান নহয় লক্ষ্যযুক্ত হয়।");

add("nursing-166",
  "Which specimen is collected for sputum examination in suspected tuberculosis?",
  "সন্দেহজনক যক্ষ্মাত কোন নমুনা সংগ্ৰহ কৰা হয়",
  [["early morning sputum on two or three days", "দুই বা তিনি দিনৰ ৰাতিপুৱাৰ কফ"], ["saliva only", "কেৱল লালটী"], ["blood only", "কেৱল ৰক্ত"], ["urine only", "কেৱল মূত্ৰ"]], 0,
  "Overnight secretions collect in the airways, so early morning samples carry the most bacilli. Saliva has almost none.",
  "ৰাতিৰ ভিতৰত শ্লেষ্মা বায়ুপথত জমে, সেয়ে ৰাতিপুৱাৰ নমুনাত বেছি বেক্টেৰিয়া থাকে। লালটীত প্ৰায় নাথাকে।");

add("nursing-167",
  "A raised total leucocyte count usually suggests",
  "বঢ়া মুঠ শ্বেত কণিকা সংখ্যাই সাধাৰণতে কি বুজায়",
  [["infection or inflammation", "সংক্ৰমণ বা প্ৰদাহ"], ["anaemia", "ৰক্তহীনতা"], ["dehydration", "পানীশূন্যতা"], ["jaundice", "জণ্ডিছ"]], 0,
  "White cells rise to fight infection, so a high count supports the diagnosis. Anaemia concerns red cells instead.",
  "সংক্ৰমণ ৰোধ কৰিবলৈ শ্বেত কণিকা বাঢ়ে, সেয়ে বেছি সংখ্যাই নিৰ্ণয়ত সহায় কৰে। ৰক্তহীনতা লোহিত কণিকাৰ কথা।");

add("nursing-168",
  "The correct order of drawing blood when multiple tubes are needed begins with",
  "একাধিক নলী লাগিলে ৰক্ত লোৱাৰ শুদ্ধ ক্ৰম আৰম্ভ হয়",
  [["blood culture tubes", "ৰক্ত সংৱৰ্ধন নলীৰপৰা"], ["EDTA tubes", "EDTA নলীৰপৰা"], ["citrate tubes", "ছাইট্ৰেট নলীৰপৰা"], ["fluoride tubes", "ফ্ল'ৰাইড নলীৰপৰা"]], 0,
  "Sterile culture bottles come first so they are not contaminated by additives from other tubes. Additive carryover would give false results.",
  "জীৱাণুমুক্ত সংৱৰ্ধন বটল প্ৰথমে যাতে আন নলীৰ পদাৰ্থই দূষিত নকৰে। পদাৰ্থ গলে ভুল ফল দিব।");

add("nursing-169",
  "The Widal test is used in the diagnosis of",
  "ৱিডাল পৰীক্ষা কোন ৰোগৰ নিৰ্ণয়ত ব্যৱহৃত হয়",
  [["typhoid", "টাইফয়েড"], ["malaria", "মেলেৰিয়া"], ["dengue", "ডেংগু"], ["tuberculosis", "যক্ষ্মা"]], 0,
  "It detects antibodies to Salmonella typhi. Malaria needs a smear and dengue needs NS1 or IgM testing.",
  "ই ছালম'নেলা টাইফাইৰ প্ৰতিদেহ ধৰে। মেলেৰিয়ালৈ ছাল স্মিয়াৰ আৰু ডেংগুলৈ NS1 বা IgM পৰীক্ষা লাগে।");

add("nursing-170",
  "Personal protective equipment should be removed",
  "ব্যক্তিগত সুৰক্ষা সজুলি খোলা উচিত",
  [["before leaving the patient's room", "ৰোগীৰ কোঠা এৰাৰ আগতে"], ["after reaching home", "ঘৰ পোৱাৰ পিছত"], ["in the canteen", "কেণ্টিনত"], ["only at the end of the shift", "কেৱল শিফ্ট শেষত"]], 0,
  "Contaminated equipment carries organisms to other patients and staff areas, so it comes off at the door.",
  "দূষিত সজুলিয়ে জীৱাণু আন ৰোগী আৰু কৰ্মচাৰীৰ ঠাইলৈ নিয়ে, সেয়ে দুৱাৰতেই খুলিব লাগে।");

add("nursing-171",
  "Which of the following best describes a false negative result?",
  "তলৰ কোনটোৱে মিছা ঋণাত্মক ফল ভালদৰে বৰ্ণনা কৰে",
  [["the test says no disease when disease is present", "ৰোগ থাকিলেও পৰীক্ষাই ৰোগ নাই বোলে"], ["the test says disease when none is present", "ৰোগ নথকাকৈয়ে পৰীক্ষাই ৰোগ বোলে"], ["the test cannot be performed", "পৰীক্ষা কৰিব নোৱাৰি"], ["the sample is lost", "নমুনা হেৰায়"]], 0,
  "A false negative misses real disease and delays treatment. A false positive wrongly labels a healthy person.",
  "মিছা ঋণাত্মকে প্ৰকৃত ৰোগ এৰি দি চিকিৎসা পলম কৰে। মিছা ধনাত্মকে সুস্থ লোকক ৰোগী বুলি চিহ্নিত কৰে।");

add("nursing-172",
  "Serum is obtained from blood that has",
  "ছিৰাম পোৱা যায় এনে ৰক্তৰপৰা যি",
  [["clotted and then been centrifuged", "জমি তাৰ পিছত কেন্দ্ৰাপসাৰিত হৈছে"], ["been treated with EDTA", "EDTA ৰে ব্যৱহাৰ কৰা"], ["not clotted at all", "কেতিয়াও জমা নাই"], ["been diluted with water", "পানীৰে পাতল কৰা"]], 0,
  "Clotting leaves serum above the clot, while an anticoagulated sample gives plasma. The two differ by clotting proteins.",
  "জমাৰ পিছত পিণ্ডৰ ওপৰত ছিৰাম থাকে, আনহাতে ৰোধকযুক্ত নমুনাই প্লাজমা দিয়ে। জমা প্ৰ'টিনে দুয়োটাক পাৰ্থক্য কৰে।");

add("nursing-173",
  "A universal precaution in the laboratory means treating",
  "লেবৰেটৰীত সৰ্বজনীন সতৰ্কতা মানে কি হিচাপে গণ্য কৰা",
  [["every blood and body fluid sample as infectious", "প্ৰতিটো ৰক্ত আৰু শৰীৰ তৰল নমুনাক সংক্ৰামক বুলি"], ["only known HIV samples as infectious", "কেৱল জনা HIV নমুনাক সংক্ৰামক বুলি"], ["only samples from surgery as infectious", "কেৱল অস্ত্ৰোপচাৰৰ নমুনাক সংক্ৰামক বুলি"], ["no sample as infectious", "কোনো নমুনাক সংক্ৰামক নহয় বুলি"]], 0,
  "Many carriers are undiagnosed, so gloves and safe handling apply to every sample regardless of the label.",
  "বহুত বাহক ৰোগ নিৰ্ণয়হীন, সেয়ে লেবেল যিয়েই নহওক প্ৰতিটো নমুনাত দস্তানা আৰু সুৰক্ষিত ব্যৱহাৰ প্ৰযোজ্য।");

add("nursing-174",
  "The normal adult white blood cell count per cubic millimetre is",
  "প্ৰাপ্তবয়স্কৰ প্ৰতি ঘন মিলিমিটাৰত স্বাভাৱিক শ্বেত কণিকা সংখ্যা",
  [["4000 to 11000", "৪০০০ ৰপৰা ১১০০০"], ["500 to 1000", "৫০০ ৰপৰা ১০০০"], ["50000 to 100000", "৫০,০০০ ৰপৰা ১,০০,০০০"], ["100 to 400", "১০০ ৰপৰা ৪০০"]], 0,
  "Four to eleven thousand is the accepted adult range. Far higher counts suggest leukaemia and lower ones immune suppression.",
  "৪০০০ ৰপৰা ১১০০০ গ্ৰহণযোগ্য প্ৰাপ্তবয়স্ক পৰিসৰ। বহু বেছি হ'লে লিউকিমিয়া আৰু কম হ'লে ৰোগ প্ৰতিৰোধ দমন।");

add("nursing-175",
  "The main reason for fasting before a lipid profile test is that",
  "লিপিড প্ৰ'ফাইল পৰীক্ষাৰ আগতে উপবাসৰ মূল কাৰণ",
  [["recent food raises triglycerides and distorts the result", "শেহতীয়া খাদ্যই ট্ৰাইগ্লিচাৰাইড বঢ়াই ফল বিকৃত কৰে"], ["fasting sterilises the blood", "উপবাসে ৰক্ত জীৱাণুমুক্ত কৰে"], ["food causes anaemia", "খাদ্যই ৰক্তহীনতা কৰে"], ["it saves money", "ধন সাঁ‌চয় হয়"]], 0,
  "Fat absorbed from a meal circulates for hours, so a non-fasting sample overstates triglycerides. Cholesterol alone is less affected.",
  "খাদ্যৰপৰা শোষিত চৰ্বি ঘণ্টাজুৰি ঘূৰি থাকে, সেয়ে উপবাস নোহোৱা নমুনাই ট্ৰাইগ্লিচাৰাইড বঢ়াই দেখুৱায়। কেৱল ক'লেষ্টেৰলত কম প্ৰভাৱ।");

add("nursing-176",
  "Which of the following correctly describes the purpose of a control sample in the laboratory?",
  "লেবৰেটৰীত নিয়ন্ত্ৰণ নমুনাৰ উদ্দেশ্য শুদ্ধভাৱে কি",
  [["to check that the test system is working correctly", "পৰীক্ষা ব্যৱস্থা শুদ্ধভাৱে চলিছে নে নাই চোৱা"], ["to replace the patient sample", "ৰোগীৰ নমুনাৰ সলনি ব্যৱহাৰ"], ["to calibrate the room temperature", "কোঠাৰ উষ্ণতা মিলোৱা"], ["to count staff", "কৰ্মচাৰী গণা"]], 0,
  "A control has a known value, so a correct reading proves the reagents and instrument are behaving.",
  "নিয়ন্ত্ৰণৰ মান জনা থাকে, সেয়ে শুদ্ধ পাঠে প্ৰতিদান আৰু যন্ত্ৰ ঠিক চলিছে প্ৰমাণ কৰে।");

add("nursing-177",
  "Hands should be washed with soap and water for at least",
  "হাত চাবোন আৰু পানীৰে অন্ততঃ কিমান সময় ধুই ল'ব লাগে",
  [["40 to 60 seconds", "৪০ ৰপৰা ৬০ ছেকেণ্ড"], ["5 seconds", "৫ ছেকেণ্ড"], ["5 minutes always", "সদায় ৫ মিনিট"], ["10 seconds", "১০ ছেকেণ্ড"]], 0,
  "Forty to sixty seconds with proper technique covers all surfaces. A five second rinse leaves organisms behind.",
  "শুদ্ধ কৌশলেৰে ৪০ ৰপৰা ৬০ ছেকেণ্ডে সকলো পৃষ্ঠ ঢাকে। পাঁচ ছেকেণ্ডৰ ধোৱাই জীৱাণু এৰি যায়।");

add("nursing-178",
  "The erythrocyte count in an adult female is normally",
  "প্ৰাপ্তবয়স্ক মহিলাৰ লোহিত কণিকা সংখ্যা সাধাৰণতে",
  [["4.0 to 5.2 million per microlitre", "প্ৰতি মাইক্ৰ'লিটাৰত ৪.০ ৰপৰা ৫.২ নিযুত"], ["1.0 to 2.0 million per microlitre", "প্ৰতি মাইক্ৰ'লিটাৰত ১.০ ৰপৰা ২.০ নিযুত"], ["8.0 to 9.0 million per microlitre", "প্ৰতি মাইক্ৰ'লিটাৰত ৮.০ ৰপৰা ৯.০ নিযুত"], ["100 to 200 per microlitre", "প্ৰতি মাইক্ৰ'লিটাৰত ১০০ ৰপৰা ২০০"]], 0,
  "Women normally have a slightly lower count than men. A count near one million means severe anaemia.",
  "মহিলাৰ সংখ্যা পুৰুষতকৈ অলপ কম থাকে। এক নিযুতৰ ওচৰা-উচৰি মানে গুৰুতৰ ৰক্তহীনতা।");

add("nursing-179",
  "Which of the following is the correct method to transport a blood sample?",
  "ৰক্ত নমুনা পৰিবহনৰ শুদ্ধ পদ্ধতি",
  [["in a closed rack at the recommended temperature", "বন্ধ ৰেকত পৰামৰ্শিত উষ্ণতাত"], ["in an open tray in the sun", "ৰ'দত মুকলি ট্ৰেত"], ["in a shirt pocket", "চাৰ্টৰ জেপত"], ["loose in a bag", "মোনাত মুকলিকৈ"]], 0,
  "Heat, light and shaking alter cell counts and chemistry, so samples travel closed and at the right temperature.",
  "তাপ, পোহৰ আৰু জোকাৰণিয়ে কোষ গণনা আৰু ৰসায়ন সলায়, সেয়ে নমুনা বন্ধ আৰু শুদ্ধ উষ্ণতাত নিয়া হয়।");

add("nursing-180",
  "A centrifuge is used in the laboratory to",
  "লেবৰেটৰীত কেন্দ্ৰাপসাৰক যন্ত্ৰ ব্যৱহৃত হয় কিৰ বাবে",
  [["separate blood into cells and serum or plasma", "ৰক্তক কোষ আৰু ছিৰাম বা প্লাজমাত ভাগ কৰিবলৈ"], ["sterilise instruments", "সজুলি জীৱাণুমুক্ত কৰিবলৈ"], ["measure temperature", "উষ্ণতা জোখা"], ["count bacteria", "বেক্টেৰিয়া গণিবলৈ"]], 0,
  "Spinning applies centrifugal force so denser cells settle and the liquid layer can be pipetted off for testing.",
  "ঘূৰ্ণনে কেন্দ্ৰাপসাৰী বল দিয়ে যাতে ঘন কোষ তললৈ যায় আৰু তৰল স্তৰ পৰীক্ষাৰ বাবে ল'ব পাৰি।");

/* ================= radiography-imaging ================= */
useLeaf("radiography-imaging");

add("nursing-181",
  "X-rays are a form of",
  "এক্স-ৰে কি ধৰণৰ ৰশ্মি",
  [["electromagnetic radiation", "বৈদ্যুতিক চুম্বকীয় বিকিৰণ"], ["sound waves", "শব্দ তৰংগ"], ["radio waves only", "কেৱল ৰেডিঅ' তৰংগ"], ["water waves", "পানীৰ তৰংগ"]], 0,
  "X-rays sit on the electromagnetic spectrum with a very short wavelength, which lets them pass through tissue. Sound waves need a medium and are used in ultrasound.",
  "এক্স-ৰে অতি চমু তৰংগ দৈৰ্ঘ্যৰ বৈদ্যুতিক চুম্বকীয় বৰ্ণালীত, সেয়ে কলাৰ মাজেৰে যায়। শব্দ তৰংগই মাধ্যম লাগে আৰু আল্ট্ৰাছাউণ্ডত ব্যৱহৃত।");

add("nursing-182",
  "The device used to protect the gonads during radiography is a",
  "ৰেডিঅ'গ্ৰাফীত জনন অংগ ৰক্ষা কৰা সজুলিটো",
  [["lead shield", "ছীছাৰ ঢাল"], ["rubber sheet", "ৰবৰ চাদৰ"], ["plastic apron", "প্লাষ্টিক এপ্ৰন"], ["cotton towel", "কপাহী গামোচা"]], 0,
  "Lead absorbs X-rays, so a shaped shield cuts the dose to radiosensitive organs. Plastic and cloth do not stop the beam.",
  "ছীছে এক্স-ৰে শোষে, সেয়ে ঢালে ৰশ্মি-সংবেদনশীল অংগৰ মাত্ৰা কমায়। প্লাষ্টিক আৰু কাপোৰে ৰশ্মি ৰোধ নকৰে।");

add("nursing-183",
  "A radiograph appears white where the tissue is",
  "ৰেডিঅ'গ্ৰাফত কলা ক'ত বগা দেখা যায়",
  [["dense such as bone", "হাড়ৰ দৰে ঘন"], ["filled with air", "বতাহেৰে ভৰা"], ["soft fat only", "কেৱল কোমল চৰ্বি"], ["empty space", "খালী ঠাই"]], 0,
  "Dense tissue absorbs more X-rays and fewer reach the film, so it stays white. Air lets the beam through and looks black.",
  "ঘন কলাই বেছি এক্স-ৰে শোষে আৰু কম ফিল্মলৈ যায়, সেয়ে বগা থাকে। বতাহে ৰশ্মি যাব দিয়ে আৰু ক'লা দেখা যায়।");

add("nursing-184",
  "The radiation dose to staff is reduced mainly by",
  "কৰ্মচাৰীৰ ৰশ্মি মাত্ৰা কমোৱা হয় মূলতঃ কিৰে",
  [["distance, shielding and time", "দূৰত্ব, ঢাল আৰু সময়"], ["wearing more clothes", "বেছি কাপোৰ পিন্ধি"], ["working faster only", "কেৱল সোনকালে কাম কৰি"], ["turning up the lights", "পোহৰ বঢ়াই"]], 0,
  "Dose falls sharply with distance, lead stops the beam and shorter exposure means less accumulation. Clothing gives no protection.",
  "দূৰত্ব বঢ়িলে মাত্ৰা তীব্ৰভাৱে কমে, ছীছে ৰশ্মি ৰোধে আৰু কম সময়ত কম জমে। কাপোৰে সুৰক্ষা নিদিয়ে।");

add("nursing-185",
  "Ultrasound imaging is preferred in pregnancy because it",
  "গৰ্ভাৱস্থাত আল্ট্ৰাছাউণ্ড পছন্দ কৰা হয় কাৰণ ই",
  [["uses sound waves and no ionising radiation", "শব্দ তৰংগ ব্যৱহাৰ কৰে, আয়নীকৰণ বিকিৰণ নহয়"], ["is cheaper than everything", "সকলোতকৈ সস্তা"], ["shows bones best", "হাড় আটাই ভাল দেখুৱায়"], ["needs no gel", "জেল নালাগে"]], 0,
  "Sound waves carry no radiation risk to the fetus. Bone detail is better on X-ray, which is why ultrasound is used for soft tissue.",
  "শব্দ তৰংগত ভ্ৰূণলৈ ৰশ্মিৰ বিপদ নাই। হাড়ৰ বিৱৰণ এক্স-ৰেত ভাল, সেয়ে কোমল কলালৈ আল্ট্ৰাছাউণ্ড ব্যৱহৃত।");

add("nursing-186",
  "A barium meal is given to outline the",
  "বেৰিয়াম আহাৰ দিয়া হয় কি স্পষ্ট কৰিবলৈ",
  [["gastrointestinal tract", "পাচন নলী"], ["kidney", "বৃক্ক"], ["lung", "ফুসফুস"], ["brain", "মগজু"]], 0,
  "Barium is radio-opaque and coats the gut lining, so ulcers and narrowing show up. The kidney needs an iodine contrast instead.",
  "বেৰিয়াম ৰশ্মি-অপাৰক আৰু অন্ত্ৰৰ বেৰ ঢাকে, সেয়ে ঘা আৰু সংকোচন ওলায়। বৃক্কলৈ আয়'ডিন কণ্ট্ৰাষ্ট লাগে।");

add("nursing-187",
  "The main risk of iodinated contrast media is",
  "আয়'ডিনযুক্ত কণ্ট্ৰাষ্ট মাধ্যমৰ মূল বিপদ",
  [["an allergic reaction", "এলাৰ্জি প্ৰতিক্ৰিয়া"], ["hair loss", "চুলি সৰা"], ["weight gain", "ওজন বঢ়া"], ["tooth decay", "দাঁত ক্ষয়"]], 0,
  "Contrast can trigger urticaria or anaphylaxis, so a history of allergy and renal function are checked first.",
  "কণ্ট্ৰাষ্টে ছালত দাগ বা এনাফাইলেক্সিছ কৰিব পাৰে, সেয়ে এলাৰ্জিৰ ইতিহাস আৰু বৃক্কৰ কাৰ্য আগতে চোৱা হয়।");

add("nursing-188",
  "Which imaging method uses a magnetic field and radio waves?",
  "কোন ইমেজিং পদ্ধতিয়ে চুম্বক ক্ষেত্ৰ আৰু ৰেডিঅ' তৰংগ ব্যৱহাৰ কৰে",
  [["MRI", "MRI"], ["CT scan", "CT স্কেন"], ["plain X-ray", "সাধাৰণ এক্স-ৰে"], ["fluoroscopy", "ফ্লৰ'স্কপি"]], 0,
  "Magnetic resonance imaging aligns hydrogen nuclei in a strong field and reads their signal. CT and X-ray use ionising radiation.",
  "MRI এ শক্তিশালী ক্ষেত্ৰত হাইড্ৰ'জেন কেন্দ্ৰ সজাই তাৰ সংকেত পঢ়ে। CT আৰু এক্স-ৰে আয়নীকৰণ বিকিৰণ ব্যৱহাৰ কৰে।");

add("nursing-189",
  "A patient with a metallic implant should inform the radiographer before",
  "ধাতুৰ ইম্প্লাণ্ট থকা ৰোগীয়ে ৰেডিঅ'গ্ৰাফাৰক কেতিয়া জনাব লাগে",
  [["an MRI scan", "MRI স্কেনৰ আগতে"], ["a plain X-ray", "সাধাৰণ এক্স-ৰেৰ আগতে"], ["an ultrasound", "আল্ট্ৰাছাউণ্ডৰ আগতে"], ["a blood test", "ৰক্ত পৰীক্ষাৰ আগতে"]], 0,
  "The strong magnet can move or heat metal, so implants must be checked first. Plain films and ultrasound are unaffected.",
  "শক্তিশালী চুম্বকে ধাতু লৰচৰ বা তপত কৰিব পাৰে, সেয়ে ইম্প্লাণ্ট আগতে পৰীক্ষা কৰা হয়। সাধাৰণ ফিল্ম আৰু আল্ট্ৰাছাউণ্ডত প্ৰভাৱ নাই।");

add("nursing-190",
  "The ALARA principle in radiology means keeping exposure",
  "ৰেডিঅ'লজীত ALARA নীতিয়ে ৰশ্মি মাত্ৰা ৰখা বুজায়",
  [["as low as reasonably achievable", "যুক্তিসংগভাৱে যিমান কম সম্ভৱ তিমান কম"], ["as high as allowed", "অনুমোদিত সৰ্বোচ্চ"], ["at a fixed dose always", "সদায় একেই মাত্ৰাত"], ["above the legal limit", "আইনী সীমাৰ ওপৰত"]], 0,
  "Every exposure carries some risk, so the dose is minimised while still answering the clinical question.",
  "প্ৰতিটো ৰশ্মিয়ে কিছু বিপদ আনে, সেয়ে চিকিৎসাৰ প্ৰশ্নৰ উত্তৰ দিয়েই মাত্ৰা কম কৰা হয়।");

add("nursing-191",
  "Which of the following best describes a CT scan?",
  "তলৰ কোনটোৱে CT স্কেন ভালদৰে বৰ্ণনা কৰে",
  [["multiple X-ray images combined into cross sections", "ক্ৰছ ছেকচনলৈ মিলোৱা বহু এক্স-ৰে ছবি"], ["a single photograph", "এটা অকলশৰীয়া ফটো"], ["a sound based scan", "শব্দ ভিত্তিক স্কেন"], ["a blood test", "ৰক্ত পৰীক্ষা"]], 0,
  "A rotating tube and detector take many projections, and a computer reconstructs slices. That is why CT shows soft tissue better than a plain film.",
  "ঘূৰ্ণনশীল নলী আৰু গ্ৰাহকে বহু দৃশ্য লয়, কম্পিউটাৰে স্তৰ গঢ়ে। সেয়ে CT এ সাধাৰণ ফিল্মতকৈ কোমল কলা ভাল দেখুৱায়।");

add("nursing-192",
  "Before an abdominal ultrasound the patient is often asked to",
  "পেটৰ আল্ট্ৰাছাউণ্ডৰ আগতে ৰোগীক প্ৰায়ে কোৱা হয়",
  [["fast and hold urine as advised", "পৰামৰ্শ অনুসৰি উপবাস কৰি মূত্ৰ ৰাখিবলৈ"], ["drink only milk", "কেৱল গাখীৰ খাবলৈ"], ["exercise vigorously", "কঠোৰ ব্যায়াম কৰিবলৈ"], ["eat a heavy meal", "গধুৰ আহাৰ খাবলৈ"]], 0,
  "A full bladder pushes bowel aside and gives a window to the pelvis, while fasting reduces gas and food shadow.",
  "ভৰা মূত্ৰাশয়ে অন্ত্ৰ আঁতৰাই শ্ৰোণীৰ জানালা দিয়ে, আৰু উপবাসে গেছ আৰু খাদ্যৰ ছাঁ কমায়।");

add("nursing-193",
  "The lead apron worn during radiography protects the",
  "ৰেডিঅ'গ্ৰাফীত পিন্ধা ছীছাৰ এপ্ৰনে কি ৰক্ষা কৰে",
  [["wearer from scattered radiation", "পিন্ধোতাক বিয়পা ৰশ্মিৰপৰা"], ["patient from infection", "ৰোগীক সংক্ৰমণৰপৰা"], ["film from light", "ফিল্মক পোহৰৰপৰা"], ["machine from heat", "যন্ত্ৰক তাপৰপৰা"]], 0,
  "Scatter bounces off the patient and the room, so the apron shields the operator's trunk and gonads.",
  "ৰশ্মি ৰোগী আৰু কোঠাৰপৰা প্ৰতিফলিত হয়, সেয়ে এপ্ৰনে চালকৰ ধড় আৰু জনন অংগ ৰক্ষা কৰে।");

add("nursing-194",
  "A radiographer should identify the patient by",
  "ৰেডিঅ'গ্ৰাফাৰে ৰোগীক কিৰে চিনাক্ত কৰিব লাগে",
  [["checking name and a second identifier", "নাম আৰু দ্বিতীয় পৰিচয়ক পৰীক্ষা কৰি"], ["asking the ward boy", "ৱাৰ্ডৰ ল'ৰাক সোধি"], ["looking at the bed number only", "কেৱল বিছনাৰ নম্বৰ চাই"], ["guessing from the request form", "অনুৰোধ পত্ৰৰপৰা অনুমান কৰি"]], 0,
  "Two identifiers prevent imaging the wrong person, which is a serious never event. A bed number changes with every admission.",
  "দুটা পৰিচয়ে ভুল লোকৰ ইমেজিং ৰোধ কৰে, যি গুৰুতৰ ঘটনা। বিছনাৰ নম্বৰ প্ৰতি ভৰ্তিত সলনি হয়।");

add("nursing-195",
  "The term radiolucent describes a structure that",
  "ৰেডিঅ'লুচেণ্ট শব্দই এনে গঠন বুজায় যি",
  [["lets X-rays pass through and looks dark", "এক্স-ৰে যাব দি ক'লা দেখা যায়"], ["absorbs X-rays and looks white", "এক্স-ৰে শোষি বগা দেখা যায়"], ["emits radiation", "বিকিৰণ ওলায়"], ["cannot be imaged", "ইমেজিং কৰিব নোৱাৰি"]], 0,
  "Air and fat are radiolucent, so they appear dark. Bone is radio-opaque and appears white.",
  "বতাহ আৰু চৰ্বি ৰেডিঅ'লুচেণ্ট, সেয়ে ক'লা দেখা যায়। হাড় ৰেডিঅ'-অপাৰক আৰু বগা দেখা যায়।");

add("nursing-196",
  "A patient who is pregnant should be asked about pregnancy before radiography because",
  "গৰ্ভৱতী ৰোগীক ৰেডিঅ'গ্ৰাফীৰ আগতে গৰ্ভধাৰণৰ কথা সোধা হয় কাৰণ",
  [["the fetus is more sensitive to radiation", "ভ্ৰূণ ৰশ্মিলৈ বেছি সংবেদনশীল"], ["the film would be blurred", "ফিল্ম ধোঁৱা হ'ব"], ["the machine would break", "যন্ত্ৰ নষ্ট হ'ব"], ["contrast cannot be given", "কণ্ট্ৰাষ্ট দিব নোৱাৰি"]], 0,
  "Dividing cells are most vulnerable, so the examination is deferred or shielded where possible.",
  "বিভাজনশীল কোষ আটাই দুৰ্বল, সেয়ে পৰীক্ষা পিছলৈ দিয়া বা ঢাল দিয়া হয়।");

add("nursing-197",
  "Which of the following is a radio-opaque contrast agent used in X-ray studies?",
  "এক্স-ৰে পৰীক্ষাত ব্যৱহৃত ৰেডিঅ'-অপাৰক কণ্ট্ৰাষ্ট মাধ্যম কোনটো",
  [["barium sulphate", "বেৰিয়াম ছালফেট"], ["normal saline", "সাধাৰণ লুণীয়া পানী"], ["distilled water", "ডিষ্টিল্ড পানী"], ["glucose solution", "গ্লুক'জ দ্ৰৱ"]], 0,
  "Barium blocks X-rays, so the hollow gut shows as a white outline. Saline and water are radiolucent and invisible.",
  "বেৰিয়ামে এক্স-ৰে ৰোধ কৰে, সেয়ে ফোঁপোলা অন্ত্ৰ বগা ৰেখা হিচাপে ওলায়। লুণীয়া পানী আৰু পানী ৰেডিঅ'লুচেণ্ট, দেখা নাযায়।");

add("nursing-198",
  "The cassette in conventional radiography holds the",
  "প্ৰচলিত ৰেডিঅ'গ্ৰাফীত কেছেটত থাকে",
  [["film or detector plate", "ফিল্ম বা ডিটেক্টৰ প্লেট"], ["lead shield", "ছীছাৰ ঢাল"], ["contrast bottle", "কণ্ট্ৰাষ্ট বটল"], ["patient's records", "ৰোগীৰ অভিলেখ"]], 0,
  "The cassette keeps the film or plate flat and light-tight so the latent image survives until processing.",
  "কেছেটে ফিল্ম বা প্লেট সমতল আৰু পোহৰ-ৰোধক ৰাখে যাতে সুপ্ত ছবি প্ৰচেছিঙলৈকে থাকে।");

add("nursing-199",
  "The main advantage of digital radiography over film is",
  "ফিল্মতকৈ ডিজিটেল ৰেডিঅ'গ্ৰাফীৰ মূল সুবিধা",
  [["images can be processed and stored electronically", "ছবি ইলেক্ট্ৰনিকভাৱে প্ৰচেছ আৰু সঞ্চয় কৰিব পাৰি"], ["it uses no radiation", "ই ৰশ্মি ব্যৱহাৰ নকৰে"], ["it needs no operator", "ই চালক নালাগে"], ["it never needs positioning", "কেতিয়াও স্থিতি নালাগে"]], 0,
  "Digital plates are read out and archived, and the window can be adjusted after exposure. Radiation is still used.",
  "ডিজিটেল প্লেট পঢ়ি সংৰক্ষণ কৰা হয় আৰু ৰশ্মিৰ পিছত উইণ্ড' মিলাব পাৰি। ৰশ্মি তথাপিও ব্যৱহৃত হয়।");

add("nursing-200",
  "A radiographer's personal dosimeter is worn to",
  "ৰেডিঅ'গ্ৰাফাৰৰ ব্যক্তিগত ড'চিমিটাৰ পিন্ধা হয় কিৰ বাবে",
  [["measure the radiation dose received", "পোৱা ৰশ্মি মাত্ৰা জোখা"], ["measure body temperature", "শৰীৰৰ উষ্ণতা জোখা"], ["record working hours", "কামৰ সময় লিখা"], ["count patients", "ৰোগী গণা"]], 0,
  "The badge records cumulative exposure so that anyone nearing the limit is moved to safer duties.",
  "বেজে মুঠ ৰশ্মিমাত্ৰা লিখে যাতে সীমাৰ ওচৰা-উচৰি থকা কৰ্মচাৰীক নিৰাপদ কামলৈ সলনি কৰা হয়।");

add("nursing-201",
  "Which structure is best demonstrated by a mammogram?",
  "মেম'গ্ৰামে কোন গঠন আটাই ভাল দেখুৱায়",
  [["breast tissue", "স্তনৰ কলা"], ["knee joint", "আঁঠুৰ গাঁ‌ঠি"], ["skull bone", "কৰোটিৰ হাড়"], ["lung base", "ফুসফুসৰ তল"]], 0,
  "Low-dose soft X-rays show microcalcification and masses in the breast, which is how early cancer is screened.",
  "কম মাত্ৰাৰ কোমল এক্স-ৰেয়ে স্তনৰ সূক্ষ্ম চুণ আৰু পিণ্ড দেখুৱায়, সেয়ে প্ৰাৰম্ভিক কৰ্কট ৰোগ স্ক্ৰীণ কৰা হয়।");

add("nursing-202",
  "The reason for removing metal objects before an MRI is that they",
  "MRI ৰ আগতে ধাতুৰ বস্তু আঁতৰোৱাৰ কাৰণ",
  [["may be pulled by the magnet and injure the patient", "চুম্বকে টানি ৰোগীক আঘাত কৰিব পাৰে"], ["spoil the patient's clothes", "ৰোগীৰ কাপোৰ নষ্ট কৰে"], ["block the sound", "শব্দ ৰোধ কৰে"], ["change the room temperature", "কোঠাৰ উষ্ণতা সলায়"]], 0,
  "The field is extremely strong, so ferromagnetic items become projectiles and implants may heat.",
  "ক্ষেত্ৰ অতি শক্তিশালী, সেয়ে লৌহচুম্বকীয় বস্তু ক্ষেপণী হৈ যায় আৰু ইম্প্লাণ্ট তপত হয়।");

add("nursing-203",
  "Which imaging modality uses a radioactive tracer injected into the body?",
  "কোন ইমেজিং পদ্ধতিয়ে শৰীৰত ৰেডিঅ'সক্ৰিয় ট্ৰেছাৰ দিয়ে",
  [["nuclear medicine scan", "পাৰমাণৱিক ঔষধ স্কেন"], ["plain radiography", "সাধাৰণ ৰেডিঅ'গ্ৰাফী"], ["ultrasound", "আল্ট্ৰাছাউণ্ড"], ["MRI", "MRI"]], 0,
  "In nuclear scanning the patient becomes the source of radiation, so the tracer shows organ function rather than anatomy.",
  "পাৰমাণৱিক স্কেনিঙত ৰোগী নিজেই ৰশ্মিৰ উৎস, সেয়ে ট্ৰেছেৰে শৰীৰস্থান নহয় অংগৰ কাৰ্য দেখুৱায়।");

add("nursing-204",
  "Patient positioning in radiography is important because poor position",
  "ৰেডিঅ'গ্ৰাফীত ৰোগীৰ স্থিতি গুৰুত্বপূৰ্ণ কাৰণ বেয়া স্থিতিয়ে",
  [["may need a repeat exposure", "পুনৰ ৰশ্মি দিব লগীয়া হ'ব পাৰে"], ["makes the machine noisy", "যন্ত্ৰ শব্দ কৰে"], ["changes the contrast brand", "কণ্ট্ৰাষ্টৰ ব্ৰেণ্ড সলায়"], ["reduces the fee", "মাচুল কমায়"]], 0,
  "A repeat means extra dose to the patient, which ALARA exists to prevent. Correct positioning gets it right first time.",
  "পুনৰ ল'লে ৰোগীয়ে অতিৰিক্ত ৰশ্মি পায়, যি ALARA এ ৰোধ কৰিব বিচাৰে। শুদ্ধ স্থিতিয়ে প্ৰথমবাৰতে শুদ্ধ ছবি দিয়ে।");

add("nursing-205",
  "The safety sign displayed outside an X-ray room warns that",
  "এক্স-ৰে কোঠাৰ বাহিৰত লগোৱা সুৰক্ষা চিনে সতৰ্ক কৰে যে",
  [["radiation is in use", "ৰশ্মি চলি আছে"], ["the room is closed", "কোঠা বন্ধ"], ["cleaning is going on", "পৰিষ্কাৰ চলি আছে"], ["photography is banned", "ফটো তোলা নিষেধ"]], 0,
  "The warning light stops staff and visitors entering while the beam is on, since scatter reaches the doorway.",
  "সতৰ্ক বতিয়ে কৰ্মচাৰী আৰু দৰ্শনাৰ্থীক ৰশ্মি চলি থকা সময়ত সোমাবলৈ ৰোধ কৰে, কাৰণ বিয়পা ৰশ্মি দুৱাৰলৈকে যায়।");

add("nursing-206",
  "A chest radiograph is normally taken with the patient",
  "বুকুৰ ৰেডিঅ'গ্ৰাফত ৰোগীক সাধাৰণতে ৰখা হয়",
  [["standing and taking a deep breath", "থিয় হৈ দীঘ উশাহ লৈ"], ["lying flat and breathing out", "সমতল শুই উশাহ এৰি"], ["sitting curled forward", "সোমাই গুটিসুটি বহি"], ["walking slowly", "লাহে লাহে খোজ কাঢ়ি"]], 0,
  "A full inspiration with the patient upright spreads the ribs and shows fluid levels, giving a clear lung field.",
  "সোজা থিয় হৈ সম্পূৰ্ণ উশাহ ল'লে পাঁ‌জৰা মেলি যায় আৰু তৰলৰ স্তৰ দেখুৱায়, সেয়ে ফুসফুসৰ ক্ষেত্ৰ স্পষ্ট হয়।");

add("nursing-207",
  "Which of the following is a late effect of excessive radiation exposure?",
  "অত্যধিক ৰশ্মিৰ সংস্পৰ্শৰ পিছৰ প্ৰভাৱ কোনটো",
  [["cancer", "কৰ্কট ৰোগ"], ["immediate vomiting always", "সদায় লগে লগে বমি"], ["temporary red skin only", "কেৱল অস্থায়ী ৰঙা ছাল"], ["sudden weight loss", "হঠাতে ওজন কমা"]], 0,
  "Late effects appear years later and include malignancy and cataract. Early effects such as redness and vomiting come within days.",
  "পিছৰ প্ৰভাৱ বছৰৰ পিছত ওলায়, যেনে কৰ্কট আৰু ছানি। ৰঙা ছাল আৰু বমিৰ দৰে আগতীয়া প্ৰভাৱ দিনৰ ভিতৰত আহে।");

add("nursing-208",
  "The purpose of collimation in radiography is to",
  "ৰেডিঅ'গ্ৰাফীত ক'লিমেশ্যনৰ উদ্দেশ্য",
  [["restrict the beam to the area of interest", "ৰশ্মি প্ৰয়োজনীয় ঠাইত সীমিত কৰা"], ["increase the exposure time", "সময় বঢ়োৱা"], ["widen the field always", "সদায় ক্ষেত্ৰ বহল কৰা"], ["cool the tube", "নলী শীতল কৰা"]], 0,
  "Narrowing the beam cuts the dose to surrounding tissue and improves contrast by reducing scatter.",
  "ৰশ্মি সৰু কৰিলে চাৰিওফালৰ কলাৰ মাত্ৰা কমে আৰু বিয়পা ৰশ্মি কমি স্পষ্টতা বাঢ়ে।");

add("nursing-209",
  "A patient with a suspected fracture of the leg is radiographed mainly to",
  "ভৰি ভঙা সন্দেহ থকা ৰোগীৰ ৰেডিঅ'গ্ৰাফী কৰা হয় মূলতঃ কিৰ বাবে",
  [["confirm the site and type of fracture", "ফ্ৰেকচাৰৰ স্থান আৰু প্ৰকাৰ নিশ্চিত কৰিবলৈ"], ["measure blood pressure", "ৰক্তচাপ জোখা"], ["check blood sugar", "ৰক্ত শৰ্কৰা চোৱা"], ["test hearing", "শ্ৰৱণ পৰীক্ষা"]], 0,
  "The image guides whether the bone needs a cast, traction or surgery, and shows any displacement.",
  "ছবিয়ে হাড়ক কাষ্ট, ট্ৰেকচন বা অস্ত্ৰোপচাৰ লাগে নে নাই নিৰ্দেশ কৰে আৰু সৰকা দেখুৱায়।");

add("nursing-210",
  "Which of the following should be removed before a chest X-ray?",
  "বুকুৰ এক্স-ৰেৰ আগতে তলৰ কোনটো আঁতৰাব লাগে",
  [["metal chains and coins", "ধাতুৰ শিকলি আৰু মুদ্ৰা"], ["the hospital gown", "চিকিৎসালয়ৰ গাউন"], ["the identity band", "পৰিচয় পটি"], ["cotton socks", "কপাহী মোজা"]], 0,
  "Metal shows as dense white and can hide lung lesions, so jewellery and coins come off. The identity band stays on.",
  "ধাতু ঘন বগা হৈ ফুসফুসৰ ক্ষতি লুকুৱাব পাৰে, সেয়ে গহনা আৰু মুদ্ৰা খোলা হয়। পৰিচয় পটি থাকে।");

/* ================= physiotherapy-rehabilitation ================= */
useLeaf("physiotherapy-rehabilitation");

add("nursing-211",
  "The main aim of physiotherapy after a stroke is to",
  "ষ্ট্ৰ'কৰ পিছত ফিজিঅ'থেৰাপীৰ মূল লক্ষ্য",
  [["restore movement and independence", "লৰচৰ আৰু স্বাৱলম্বন ঘূৰাই অনা"], ["increase blood pressure", "ৰক্তচাপ বঢ়োৱা"], ["reduce blood sugar", "ৰক্ত শৰ্কৰা কমোৱা"], ["cure the brain lesion", "মগজুৰ ক্ষতি আৰোগ্য কৰা"]], 0,
  "The damaged brain tissue cannot be restored, but training other pathways lets the patient walk and manage daily tasks again.",
  "নষ্ট মগজুৰ কলা ঘূৰি নাহে, কিন্তু আন পথ প্ৰশিক্ষণ দিলে ৰোগীয়ে খোজ কাঢ়ি দৈনন্দিন কাম কৰিব পাৰে।");

add("nursing-212",
  "A passive movement is one in which",
  "নিষ্ক্ৰিয় লৰচৰত কি হয়",
  [["the therapist moves the joint without patient effort", "ৰোগীৰ প্ৰচেষ্টা নোহোৱাকৈ চিকিৎসকে গাঁ‌ঠি লৰায়"], ["the patient moves against resistance", "ৰোগীয়ে বাধাৰ বিৰুদ্ধে লৰায়"], ["the patient moves alone", "ৰোগীয়ে অকলৈ লৰায়"], ["the joint is immobilised", "গাঁ‌ঠি স্থিৰ কৰি ৰখা হয়"]], 0,
  "Passive movement keeps a joint supple when the patient cannot contract the muscle, as in early paralysis.",
  "ৰোগীয়ে পেশী সংকুচিত কৰিব নোৱৰা অৱস্থাত, যেনে প্ৰাৰম্ভিক পক্ষাঘাতত, নিষ্ক্ৰিয় লৰচৰে গাঁ‌ঠি নমনীয় ৰাখে।");

add("nursing-213",
  "The purpose of a splint in rehabilitation is to",
  "পুনৰ্বাসনত স্প্লিণ্টৰ উদ্দেশ্য",
  [["support and rest a limb in a functional position", "অংগক কাৰ্যকৰী অৱস্থাত ধৰি বিশ্ৰাম দিয়া"], ["increase muscle power", "পেশীৰ শক্তি বঢ়োৱা"], ["measure joint angle", "গাঁ‌ঠিৰ কোণ জোখা"], ["replace surgery", "অস্ত্ৰোপচাৰৰ সলনি কৰা"]], 0,
  "A splint prevents deformity and contracture while tissues heal. It supports rather than strengthens.",
  "স্প্লিণ্টে কলা শুকুওঁতে বিকৃতি আৰু সংকোচন ৰোধ কৰে। ই শক্তি নবঢ়ায়, সহায়হে কৰে।");

add("nursing-214",
  "Which of the following is a modality used in physiotherapy?",
  "তলৰ কোনটো ফিজিঅ'থেৰাপীত ব্যৱহৃত পদ্ধতি",
  [["short wave diathermy", "শ্বৰ্ট ৱেভ ডায়াথাৰ্মি"], ["blood transfusion", "ৰক্ত সঞ্চাৰণ"], ["dialysis", "ডায়েলাইছিছ"], ["endoscopy", "এণ্ড'স্কপি"]], 0,
  "Diathermy heats deep tissue to relieve pain and stiffness. Transfusion and dialysis are medical procedures, not therapy modalities.",
  "ডায়াথাৰ্মিয়ে গভীৰ কলা তপতাই বিষ আৰু জঠৰতা কমায়। ৰক্ত সঞ্চাৰণ আৰু ডায়েলাইছিছ চিকিৎসা পদ্ধতি, থেৰাপী নহয়।");

add("nursing-215",
  "A contracture is best prevented by",
  "সংকোচন (কণ্ট্ৰেকচাৰ) আটাই ভালকৈ ৰোধ কৰা যায় কিৰে",
  [["regular range of motion exercises", "নিয়মীয়া গাঁ‌ঠিৰ গতি ব্যায়ামেৰে"], ["complete bed rest", "সম্পূৰ্ণ বিছনা বিশ্ৰামেৰে"], ["keeping the limb still for weeks", "অংগ সপ্তাহজুৰি স্থিৰ ৰখাৰে"], ["avoiding all movement", "সকলো লৰচৰ এৰি"]], 0,
  "Shortened muscles and joint capsules cause contracture, so moving each joint daily keeps tissue length.",
  "চুটি হোৱা পেশী আৰু গাঁ‌ঠিৰ আৱৰণে সংকোচন আনে, সেয়ে প্ৰতিদিনে গাঁ‌ঠি লৰালে কলাৰ দৈৰ্ঘ্য থাকে।");

add("nursing-216",
  "Traction is applied mainly to",
  "ট্ৰেকচন মূলতঃ কিৰ বাবে প্ৰয়োগ কৰা হয়",
  [["align a fracture and relieve muscle spasm", "ফ্ৰেকচাৰ সোজা কৰি পেশীৰ খিঁচ কমাবলৈ"], ["increase joint stiffness", "গাঁ‌ঠিৰ জঠৰতা বঢ়াবলৈ"], ["reduce blood flow", "ৰক্তস্ৰোত কমাবলৈ"], ["strengthen the skin", "ছাল সবল কৰিবলৈ"]], 0,
  "A steady pull holds the bone ends in line and eases the spasm that causes pain. Stiffness is a complication to prevent.",
  "স্থিৰ টানে হাড়ৰ মূৰ সোজাকৈ ৰাখে আৰু বিষ কৰা খিঁচ কমায়। জঠৰতা হ'ল ৰোধ কৰিবলগীয়া জটিলতা।");

add("nursing-217",
  "Which of the following is an active exercise?",
  "তলৰ কোনটো সক্ৰিয় ব্যায়াম",
  [["the patient moves the joint himself", "ৰোগীয়ে নিজেই গাঁ‌ঠি লৰায়"], ["the therapist moves the joint", "চিকিৎসকে গাঁ‌ঠি লৰায়"], ["a machine moves the limb", "যন্ত্ৰই অংগ লৰায়"], ["the limb is massaged", "অংগ মালিচ কৰা হয়"]], 0,
  "Active exercise needs the patient's own muscle contraction, which also builds strength. Passive movement only maintains range.",
  "সক্ৰিয় ব্যায়ামত ৰোগীৰ নিজৰ পেশী সংকোচন লাগে, যিয়ে শক্তিও বঢ়ায়। নিষ্ক্ৰিয় লৰচৰে কেবল পৰিসৰ ৰাখে।");

add("nursing-218",
  "The correct way to use a walking stick is to hold it",
  "খোজ কঢ়াৰ লাখুটী ব্যৱহাৰৰ শুদ্ধ উপায়",
  [["on the stronger side", "বলী কাষত ধৰা"], ["on the weaker side", "দুৰ্বল কাষত ধৰা"], ["in the mouth", "মুখত লোৱা"], ["with both hands always", "সদায় দুয়ো হাতেৰে"]], 0,
  "Holding it opposite the weak leg widens the base of support and shifts weight off the affected side.",
  "দুৰ্বল ভৰিৰ ওলোটা কাষত ধৰিলে ভৰ দিয়াৰ ঠাই বহল হয় আৰু ভাৰ প্ৰভাৱিত কাষৰপৰা সৰে।");

add("nursing-219",
  "Ultrasound therapy is used in physiotherapy to",
  "ফিজিঅ'থেৰাপীত আল্ট্ৰাছাউণ্ড থেৰাপী ব্যৱহৃত হয় কিৰ বাবে",
  [["relieve pain and soften scar tissue", "বিষ কমাই দাগৰ কলা কোমল কৰিবলৈ"], ["take images of the bone", "হাড়ৰ ছবি ল'বলৈ"], ["sterilise the skin", "ছাল জীৱাণুমুক্ত কৰিবলৈ"], ["measure blood pressure", "ৰক্তচাপ জোখা"]], 0,
  "High frequency sound vibrates tissue, improving blood flow and breaking down adhesions. Imaging ultrasound is a different application.",
  "উচ্চ কম্পনাংকৰ শব্দে কলা কম্পিত কৰি ৰক্তস্ৰোত বঢ়ায় আৰু লগা কলা মেলায়। ইমেজিঙৰ আল্ট্ৰাছাউণ্ড বেলেগ প্ৰয়োগ।");

add("nursing-220",
  "A patient learning to walk after a hip replacement should be taught to",
  "হিপ প্ৰতিস্থাপনৰ পিছত খোজ কঢ়া শিকা ৰোগীক শিকাব লাগে",
  [["avoid bending the hip beyond ninety degrees", "হিপক নব্বৈ ডিগ্ৰীৰ বেছি নমাবলৈ এৰা"], ["cross the legs while sitting", "বহোতে ভৰি ক্ৰছ কৰা"], ["bend forward to pick objects", "বস্তু তুলিবলৈ সোমাই নমা"], ["sit on low stools", "চাপৰ মাচানত বহা"]], 0,
  "Excessive hip flexion can dislocate the new joint, so the patient keeps the angle safe and uses raised seats.",
  "অতি বেছি হিপ নমালে নতুন গাঁ‌ঠি উলাই যাব পাৰে, সেয়ে ৰোগীয়ে কোণ নিৰাপদ ৰাখি ওখ আসন ব্যৱহাৰ কৰে।");

add("nursing-221",
  "The main goal of rehabilitation is to",
  "পুনৰ্বাসনৰ মূল লক্ষ্য",
  [["help the patient reach the highest possible function", "ৰোগীক সৰ্বোচ্চ সম্ভৱ কাৰ্যক্ষমতালৈ নিয়া"], ["cure every disease", "প্ৰতিটো ৰোগ আৰোগ্য কৰা"], ["shorten hospital stay only", "কেৱল চিকিৎসালয়ৰ সময় চুটি কৰা"], ["replace medical treatment", "চিকিৎসাৰ সলনি কৰা"]], 0,
  "Rehabilitation works alongside treatment so that disability is minimised and daily life resumes as far as possible.",
  "পুনৰ্বাসনে চিকিৎসাৰ লগত কাম কৰি অক্ষমতা কমায় আৰু যিমান সম্ভৱ দৈনন্দিন জীৱন ঘূৰাই আনে।");

add("nursing-222",
  "A hot pack applied to a muscle spasm should be",
  "পেশীৰ খিঁচত গৰম পোচ লগোৱা উচিত",
  [["wrapped in cloth and checked for skin reaction", "কাপোৰেৰে মেৰিয়াই ছালৰ প্ৰতিক্ৰিয়া চোৱা"], ["placed directly on bare skin", "পোনপটীয়াকৈ ছালত লগোৱা"], ["left for several hours", "কেইবা ঘণ্টা এৰি দিয়া"], ["used with the patient asleep", "ৰোগী টোপনিত থকাত লগোৱা"]], 0,
  "Direct heat burns skin, especially where sensation is poor, so a cloth barrier and frequent checks are needed.",
  "পোনপটীয়া তাপে ছাল পোৰে, বিশেষকৈ অনুভূতি কম ঠাইত, সেয়ে কাপোৰৰ বেৰ আৰু সঘন পৰীক্ষা লাগে।");

add("nursing-223",
  "Which of the following is an example of an assistive device?",
  "তলৰ কোনটো সহায়ক সজুলিৰ উদাহৰণ",
  [["a wheelchair", "ৱিলচেয়াৰ"], ["a stethoscope", "ষ্টেথ'স্কোপ"], ["a syringe", "ছিৰিঞ্জ"], ["a thermometer", "থাৰ্ম'মিটাৰ"]], 0,
  "A wheelchair compensates for lost mobility so the person can move about. The others are diagnostic tools.",
  "ৱিলচেয়াৰে হেৰুওৱা চলাচলৰ অভাৱ পূৰণ কৰি মানুহক চলিব দিয়ে। বাকীবোৰ ৰোগ নিৰ্ণয় সজুলি।");

add("nursing-224",
  "The term range of motion means the",
  "গাঁ‌ঠিৰ গতিৰ পৰিসৰ মানে",
  [["full movement possible at a joint", "গাঁ‌ঠিত সম্ভৱ সম্পূৰ্ণ লৰচৰ"], ["strength of a muscle", "পেশীৰ শক্তি"], ["length of a bone", "হাড়ৰ দৈৰ্ঘ্য"], ["speed of walking", "খোজ কঢ়াৰ গতি"]], 0,
  "It is measured in degrees and shows how far a joint bends and straightens. Strength is a separate measure.",
  "ই ডিগ্ৰীত জোখা হয় আৰু গাঁ‌ঠি কিমান নমে-মেলায় দেখুৱায়। শক্তি বেলেগ জোখ।");

add("nursing-225",
  "A patient with a below knee amputation is fitted with a prosthesis mainly to",
  "আঁঠুৰ তলত অংগচ্ছেদ হোৱা ৰোগীক কৃত্ৰিম অংগ দিয়া হয় মূলতঃ কিৰ বাবে",
  [["allow standing and walking", "থিয় হোৱা আৰু খোজ কাঢ়িবলৈ"], ["heal the stump faster", "ডালি সোনকালে শুকুৱাবলৈ"], ["prevent all falls", "সকলো পৰাৰপৰা ৰক্ষা কৰিবলৈ"], ["replace physiotherapy", "ফিজিঅ'থেৰাপীৰ সলনি"]], 0,
  "The prosthesis restores weight bearing and gait, though training and stump care are still needed.",
  "কৃত্ৰিম অংগই ভাৰ বহন আৰু খোজ ঘূৰাই আনে, তথাপি প্ৰশিক্ষণ আৰু ডালিৰ যতন লাগে।");

add("nursing-226",
  "Cryotherapy in physiotherapy refers to the use of",
  "ফিজিঅ'থেৰাপীত ক্ৰায়'থেৰাপী মানে কি ব্যৱহাৰ",
  [["cold application", "শীতল প্ৰয়োগ"], ["hot application", "গৰম প্ৰয়োগ"], ["electric current", "বিদ্যুৎ প্ৰবাহ"], ["magnetic field", "চুম্বক ক্ষেত্ৰ"]], 0,
  "Cold reduces swelling and numbs pain in acute injury. Heat is used later for stiffness, and current for muscle stimulation.",
  "শীতলে তীব্ৰ আঘাতত ওফন্দা কমাই বিষ নুমুৱায়। গৰম পিছত জঠৰতালৈ আৰু বিদ্যুৎ পেশী উদ্দীপনাৰ বাবে।");

add("nursing-227",
  "The correct position for a patient with a spinal cord injury during transfer is",
  "মেৰুদণ্ডৰ আঘাত থকা ৰোগীক স্থানান্তৰ কৰোঁতে শুদ্ধ অৱস্থান",
  [["maintaining spinal alignment throughout", "গোটেই সময়ত মেৰুদণ্ড সোজাকৈ ৰখা"], ["sitting the patient up quickly", "ৰোগীক সোনকালে বহুওৱা"], ["twisting the torso", "ধড় ঘূৰোৱা"], ["lifting by the arms only", "কেৱল হাতেৰে দাঙা"]], 0,
  "Any twist can worsen cord damage, so the head, trunk and legs move as one unit with several helpers.",
  "যিকোনো ঘূৰণে ৰজ্জুৰ ক্ষতি বঢ়ায়, সেয়ে মূৰ, ধড় আৰু ভৰি কেইবাজনে একেলগে এক একক হিচাপে লৰায়।");

add("nursing-228",
  "Which of the following best describes isometric exercise?",
  "তলৰ কোনটোৱে আইছ'মেট্ৰিক ব্যায়াম ভালদৰে বৰ্ণনা কৰে",
  [["muscle contraction without joint movement", "গাঁ‌ঠি নলৰাকৈ পেশী সংকোচন"], ["joint movement without resistance", "বাধা নোহোৱাকৈ গাঁ‌ঠি লৰচৰ"], ["movement against heavy resistance", "গধুৰ বাধাৰ বিৰুদ্ধে লৰচৰ"], ["stretching to the limit", "সীমালৈকে টনা"]], 0,
  "Pushing against a fixed object contracts the muscle while the joint stays still, which is safe after surgery.",
  "স্থিৰ বস্তু এটাত হেঁ‌চা দিলে পেশী সংকুচিত হয় কিন্তু গাঁ‌ঠি নলৰে, যি অস্ত্ৰোপচাৰৰ পিছত নিৰাপদ।");

add("nursing-229",
  "A pressure relieving mattress is used for a bedridden patient to",
  "বিছনাবন্দী ৰোগীৰ বাবে চাপ কমোৱা গদী ব্যৱহৃত হয় কিৰ বাবে",
  [["reduce the risk of pressure sores", "চাপৰ ঘাৰ আশংকা কমাবলৈ"], ["keep the patient warm", "ৰোগীক উমলৈ ৰাখিবলৈ"], ["improve appetite", "ভোক বঢ়াবলৈ"], ["measure weight", "ওজন জোখা"]], 0,
  "Alternating pressure spreads the load so no single point is starved of blood, which prevents sore formation.",
  "সলনি হোৱা চাপে ভাৰ বিয়পাই দিয়ে যাতে একো ঠাই ৰক্তহীন নহয়, সেয়ে ঘা হোৱাৰ পৰা ৰক্ষা কৰে।");

add("nursing-230",
  "The nurse should stop an exercise session immediately if the patient develops",
  "ৰোগীৰ কি হ'লে নাৰ্ছে ব্যায়াম লগে লগে বন্ধ কৰিব লাগে",
  [["chest pain or severe breathlessness", "বুকুৰ বিষ বা তীব্ৰ উশাহৰ কষ্ট"], ["mild muscle tiredness", "সাধাৰণ পেশী ভাগৰ"], ["slight sweating", "অলপ ঘাম"], ["a desire to rest briefly", "অলপ জিৰণি লোৱাৰ ইচ্ছা"]], 0,
  "Chest pain and breathlessness may signal cardiac ischaemia, so exercise stops and the doctor is informed.",
  "বুকুৰ বিষ আৰু উশাহৰ কষ্টই হৃদয়ৰ ৰক্তহীনতা দেখুৱাব পাৰে, সেয়ে ব্যায়াম বন্ধ কৰি চিকিৎসকক জনোৱা হয়।");

add("nursing-231",
  "Occupational therapy differs from physiotherapy mainly because it focuses on",
  "কাম-কাজ থেৰাপী ফিজিঅ'থেৰাপীতকৈ বেলেগ কাৰণ ই মূলতঃ কিৰ ওপৰত গুৰুত্ব দিয়ে",
  [["daily living tasks and adaptive techniques", "দৈনন্দিন কাম আৰু খাপ খুওৱা কৌশল"], ["joint range only", "কেৱল গাঁ‌ঠিৰ পৰিসৰ"], ["electrotherapy only", "কেৱল বিদ্যুৎ চিকিৎসা"], ["surgery", "অস্ত্ৰোপচাৰ"]], 0,
  "Occupational therapy trains dressing, cooking and work tasks and adapts the environment. Physiotherapy works on movement itself.",
  "কাম-কাজ থেৰাপীয়ে সাজ-পাৰ, ৰন্ধা আৰু কামৰ প্ৰশিক্ষণ দি পৰিৱেশ খাপ খুৱায়। ফিজিঅ'থেৰাপীয়ে চলাচলৰ ওপৰত কাম কৰে।");

add("nursing-232",
  "The main benefit of early mobilisation after surgery is",
  "অস্ত্ৰোপচাৰৰ পিছত সোনকালে লৰচৰৰ মূল লাভ",
  [["fewer chest infections and clots", "কম বুকুৰ সংক্ৰমণ আৰু ৰক্তপিণ্ড"], ["faster wound infection", "ঘা সোনকালে সংক্ৰমিত হোৱা"], ["more pain always", "সদায় বেছি বিষ"], ["longer hospital stay", "দীঘলীয়া চিকিৎসালয় বাস"]], 0,
  "Walking deepens breathing and squeezes leg veins, which prevents pneumonia and deep vein thrombosis.",
  "খোজ কঢ়িলে উশাহ গভীৰ হয় আৰু ভৰিৰ শিৰা চেপি যায়, সেয়ে নিউম'নিয়া আৰু গভীৰ শিৰাৰ পিণ্ড ৰোধ হয়।");

add("nursing-233",
  "A TENS unit is used in physiotherapy to",
  "ফিজিঅ'থেৰাপীত TENS যন্ত্ৰ ব্যৱহৃত হয় কিৰ বাবে",
  [["relieve pain by electrical stimulation", "বিদ্যুৎ উদ্দীপনাৰে বিষ কমাবলৈ"], ["strengthen bones", "হাড় সবল কৰিবলৈ"], ["take X-rays", "এক্স-ৰে ল'বলৈ"], ["measure joint angle", "গাঁ‌ঠিৰ কোণ জোখা"]], 0,
  "The current blocks pain signals at the spinal cord, giving relief without drugs. It does not change bone density.",
  "প্ৰবাহে মেৰুদণ্ডত বিষৰ সংকেত ৰোধ কৰি ঔষধ নোহোৱাকৈ আৰাম দিয়ে। ই হাড়ৰ ঘনত্ব নসলায়।");

add("nursing-234",
  "When transferring a patient from bed to chair, the nurse should",
  "ৰোগীক বিছনাৰপৰা চকীলৈ নিওঁতে নাৰ্ছে",
  [["lock the wheels and explain each step", "চকা বন্ধ কৰি প্ৰতিটো খোজ বুজাই দিব"], ["skip the explanation to save time", "সময় ৰাখিবলৈ ব্যাখ্যা এৰিব"], ["lift with a twisted back", "পিঠি ঘূৰাই দাঙিব"], ["leave the wheels free", "চকা মুকলি ৰাখিব"]], 0,
  "Locked wheels stop the chair sliding, and explaining the plan gains the patient's help, which protects both backs.",
  "বন্ধ চকাই চকী সৰকি যোৱা ৰোধ কৰে, আৰু পৰিকল্পনা বুজালে ৰোগীয়ে সহায় কৰি দুয়োৰে পিঠি ৰক্ষা কৰে।");

add("nursing-235",
  "A below elbow amputation patient is trained to use a prosthesis for",
  "কিলাকুটিৰ তলত অংগচ্ছেদ হোৱা ৰোগীক কৃত্ৰিম অংগ কিৰ বাবে প্ৰশিক্ষণ দিয়া হয়",
  [["grasping and daily tasks", "ধৰা আৰু দৈনন্দিন কাম"], ["walking", "খোজ কঢ়া"], ["seeing", "দেখা"], ["hearing", "শুনা"]], 0,
  "An upper limb prosthesis restores grip for eating, dressing and work. Walking aids relate to lower limb loss.",
  "ওপৰৰ অংগৰ কৃত্ৰিম অংগই খোৱা, সাজ-পাৰ আৰু কামৰ বাবে ধৰাৰ ক্ষমতা ঘূৰায়। খোজ কঢ়াৰ সহায় তলৰ অংগৰ সৈতে।");

add("nursing-236",
  "The term ankylosis means",
  "এংকাইল'ছিছ শব্দই বুজায়",
  [["stiffening and fixation of a joint", "গাঁ‌ঠিৰ জঠৰতা আৰু স্থিৰ হৈ যোৱা"], ["increased joint movement", "গাঁ‌ঠিৰ লৰচৰ বঢ়া"], ["muscle weakness", "পেশীৰ দুৰ্বলতা"], ["bone fracture", "হাড় ভঙা"]], 0,
  "Permanent stiffness of a joint follows long immobility or disease, which is why early movement matters.",
  "দীঘলীয়া অচলতা বা ৰোগৰ পিছত গাঁ‌ঠি স্থায়ীভাৱে জঠৰ হয়, সেয়ে সোনকালে লৰচৰ গুৰুত্বপূৰ্ণ।");

add("nursing-237",
  "Which of the following is the correct way to fit crutches?",
  "ক্ৰাটছ (বগলী লাখুটী) লগোৱাৰ শুদ্ধ উপায়",
  [["the top should be two to three fingers below the armpit", "ওপৰ অংশ বগলীৰপৰা দুই-তিনি আঙুলি তলত থাকিব"], ["the top should press into the armpit", "ওপৰ অংশ বগলীত হেঁ‌চিব"], ["they should be as long as possible", "যিমান দীঘল সম্ভৱ হ'ব"], ["the elbows should be fully straight", "কিলাকুটি সম্পূৰ্ণ সোজা থাকিব"]], 0,
  "Pressure in the armpit damages the radial nerve, so weight goes on the hands with the elbows slightly bent.",
  "বগলীত হেঁ‌চা দিলে ৰেডিয়েল স্নায়ু নষ্ট হয়, সেয়ে ভাৰ হাতত দি কিলাকুটি অলপ নমাই ৰাখা হয়।");

add("nursing-238",
  "The nurse explains that a compression bandage after a sprain helps by",
  "মোচৰৰ পিছত চেপা বেণ্ডেজে কেনেকৈ সহায় কৰে বুলি নাৰ্ছে বুজায়",
  [["limiting swelling", "ওফন্দা সীমিত কৰি"], ["increasing bleeding", "ৰক্তক্ষৰণ বঢ়াই"], ["stiffening the joint permanently", "গাঁ‌ঠি স্থায়ীভাৱে জঠৰ কৰি"], ["replacing rest", "বিশ্ৰামৰ সলনি কৰি"]], 0,
  "Firm even pressure holds tissue fluid in check while ice and elevation work alongside it.",
  "সমান দৃঢ় চাপে কলাৰ তৰল নিয়ন্ত্ৰণত ৰাখে, লগতে বৰফ আৰু ওপৰলৈ তোলা কাম কৰে।");

add("nursing-239",
  "A patient learning to use a prosthesis should be checked for skin breakdown mainly at the",
  "কৃত্ৰিম অংগ ব্যৱহাৰ শিকা ৰোগীত ছাল নষ্ট হোৱাৰ প্ৰধান স্থান",
  [["stump and pressure points", "ডালি আৰু চাপৰ ঠাই"], ["scalp", "মূৰৰ ছাল"], ["elbows only", "কেৱল কিলাকুটি"], ["fingertips", "আঙুলিৰ আগ"]], 0,
  "The socket presses hard on the stump, so redness or a blister there means the fit needs adjustment.",
  "ছকেটে ডালিত টান চাপ দিয়ে, সেয়ে তাত ৰঙা বা ফোঁ‌হা হ'লে ফিটিং সলাব লাগে।");

add("nursing-240",
  "The correct principle of body mechanics for nurses is to",
  "নাৰ্ছৰ বাবে শৰীৰৰ যান্ত্ৰিকতাৰ শুদ্ধ নীতি",
  [["keep the load close to the body and use leg muscles", "ভাৰ শৰীৰৰ ওচৰত ৰাখি ভৰিৰ পেশী ব্যৱহাৰ কৰা"], ["lift with the back muscles", "পিঠিৰ পেশীৰে দাঙা"], ["twist while lifting", "দাঙোতে ঘূৰোৱা"], ["reach far forward for loads", "ভাৰৰ বাবে বহু আগবাঢ়ি যোৱা"]], 0,
  "A close load shortens the lever arm and the strong leg muscles take the strain, sparing the spine.",
  "ভাৰ ওচৰত থাকিলে লিভাৰ বাহু চুটি হয় আৰু সবল ভৰিৰ পেশীয়ে ভাৰ লৈ মেৰুদণ্ড ৰক্ষা কৰে।");

/* ================= hospital-infection-control ================= */
useLeaf("hospital-infection-control");

add("nursing-241",
  "A nosocomial infection is one that is acquired",
  "ন'ছ'কমিয়েল সংক্ৰমণ হ'ল এনে সংক্ৰমণ যি হয়",
  [["in hospital", "চিকিৎসালয়ত"], ["only at home", "কেৱল ঘৰত"], ["before birth", "জন্মৰ আগতে"], ["from food only", "কেৱল খাদ্যৰপৰা"]], 0,
  "The term covers infections that were not present or incubating on admission, so the hospital environment is the source.",
  "এই শব্দই এনে সংক্ৰমণ বুজায় যি ভৰ্তি হওঁতে নাছিল বা উমলি থকা নাছিল, সেয়ে উৎস চিকিৎসালয়ৰ পৰিৱেশ।");

add("nursing-242",
  "The single most effective measure to prevent hospital acquired infection is",
  "চিকিৎসালয়ত হোৱা সংক্ৰমণ ৰোধৰ আটাই ফলপ্ৰসূ একক ব্যৱস্থা",
  [["hand hygiene", "হাত পৰিষ্কাৰ কৰা"], ["wearing gloves always", "সদায় দস্তানা পিন্ধা"], ["using antibiotics daily", "প্ৰতিদিনে এণ্টিবায়'টিক দিয়া"], ["closing the windows", "খিৰিকী বন্ধ কৰা"]], 0,
  "Most transmission passes through hands, so cleaning them at the right moments interrupts the chain at its weakest link.",
  "বেছিভাগ সংক্ৰমণ হাতেৰে যায়, সেয়ে শুদ্ধ সময়ত পৰিষ্কাৰ কৰিলে শৃংখল আটাই দুৰ্বল ঠাইত ভাঙে।");

add("nursing-243",
  "Sterilisation by autoclave uses",
  "অ'ট'ক্লেভ জীৱাণুমুক্তকৰণে ব্যৱহাৰ কৰে",
  [["steam under pressure", "চাপত ভাপ"], ["dry heat only", "কেৱল শুকান তাপ"], ["chemical dye", "ৰাসায়নিক ৰং"], ["ultraviolet light only", "কেৱল অতি-বেঙুনীয়া পোহৰ"]], 0,
  "Saturated steam at raised pressure reaches the temperature that kills spores. Dry heat needs much longer and is used for glassware.",
  "চাপত সম্পৃক্ত ভাপে বীজাণু মৰা উষ্ণতাত পায়। শুকান তাপে বহু বেছি সময় লাগে আৰু কাচৰ সজুলিত ব্যৱহৃত।");

add("nursing-244",
  "Standard precautions apply to",
  "মানক সতৰ্কতা প্ৰযোজ্য হয়",
  [["all patients regardless of diagnosis", "ৰোগ নিৰ্ণয় যিয়েই নহওক সকলো ৰোগীত"], ["only known infected patients", "কেৱল জনা সংক্ৰামক ৰোগীত"], ["only surgical patients", "কেৱল শল্য ৰোগীত"], ["only children", "কেৱল শিশুত"]], 0,
  "Many carriers are undiagnosed, so gloves and hand hygiene are used for every patient as a routine.",
  "বহুত বাহক ৰোগ নিৰ্ণয়হীন, সেয়ে প্ৰতিজন ৰোগীৰ বাবে দস্তানা আৰু হাত পৰিষ্কাৰ নিয়মিত ব্যৱহাৰ।");

add("nursing-245",
  "The correct sequence for removing personal protective equipment is",
  "ব্যক্তিগত সুৰক্ষা সজুলি খোলাৰ শুদ্ধ ক্ৰম",
  [["gloves first, then goggles, gown and mask", "প্ৰথমে দস্তানা, তাৰ পিছত চশমা, গাউন আৰু মাস্ক"], ["mask first, then gloves", "প্ৰথমে মাস্ক, তাৰ পিছত দস্তানা"], ["gown first, then gloves", "প্ৰথমে গাউন, তাৰ পিছত দস্তানা"], ["any order is fine", "যিকোনো ক্ৰম ঠিক"]], 0,
  "Gloves are the most contaminated item, so removing them first stops the spread to the face and clean areas.",
  "দস্তানা আটাই বেছি দূষিত, সেয়ে প্ৰথমে খুলিলে মুখ আৰু পৰিষ্কাৰ ঠাইলৈ বিয়পা ৰোধ হয়।");

add("nursing-246",
  "A disinfectant differs from an antiseptic because a disinfectant is used on",
  "কীটাণুনাশক প্ৰতিষেধকতকৈ বেলেগ কাৰণ কীটাণুনাশক ব্যৱহৃত হয়",
  [["inanimate objects", "নিজীৱ বস্তুত"], ["living skin", "জীৱিত ছালত"], ["wounds only", "কেৱল ঘাত"], ["food", "খাদ্যত"]], 0,
  "Disinfectants are too harsh for tissue, so they clean surfaces and instruments. Antiseptics are safe on skin.",
  "কীটাণুনাশক কলালৈ অতি কঠোৰ, সেয়ে ই পৃষ্ঠ আৰু সজুলি পৰিষ্কাৰ কৰে। প্ৰতিষেধক ছালত নিৰাপদ।");

add("nursing-247",
  "The main route of transmission of hepatitis B in a hospital is",
  "চিকিৎসালয়ত হেপাটাইটিছ B বিয়পাৰ মূল পথ",
  [["needlestick injury and blood contact", "ছুইৰ আঘাত আৰু ৰক্ত সংস্পৰ্শ"], ["airborne droplets", "বায়ুৰ টোপাল"], ["drinking water", "খোৱা পানী"], ["mosquito bite", "মশাৰ কামোৰ"]], 0,
  "The virus is blood-borne, so sharps injuries and splashes to mucosa are the main hazards. Airborne spread is not the route.",
  "ভাইৰাছ ৰক্তবাহিত, সেয়ে ছুইৰ আঘাত আৰু শ্লেষ্মাত ছিটিকাটো প্ৰধান বিপদ। বায়ুৰ যোগেদি নবিয়পে।");

add("nursing-248",
  "Which of the following is a correct practice for a sterile field?",
  "জীৱাণুমুক্ত ক্ষেত্ৰৰ বাবে শুদ্ধ অভ্যাস কোনটো",
  [["keep the field above waist level and in view", "ক্ষেত্ৰ কঁকালৰ ওপৰত আৰু দৃষ্টিত ৰখা"], ["turn away to fetch items", "বস্তু আনিবলৈ মুখ ঘূৰোৱা"], ["let the drape hang below the waist", "আৱৰণ কঁকালৰ তললৈ ওলমি থাকিব দিয়া"], ["touch it with ungloved hands", "দস্তানা নোহোৱা হাতেৰে চুব"]], 0,
  "Anything below waist level or out of sight is considered contaminated, so the field stays high and watched.",
  "কঁকালৰ তলত বা দৃষ্টিৰ বাহিৰত থকা যিকোনো বস্তু দূষিত গণ্য, সেয়ে ক্ষেত্ৰ ওপৰত আৰু দৃষ্টিত ৰখা হয়।");

add("nursing-249",
  "A patient with pulmonary tuberculosis should be nursed in",
  "ফুসফুসৰ যক্ষ্মা থকা ৰোগীক ৰখা উচিত",
  [["a well ventilated room with a mask", "মাস্কসহ ভালকৈ বতাহ চলা কোঠাত"], ["a closed room without ventilation", "বতাহ নচলা বন্ধ কোঠাত"], ["the general ward without precautions", "সতৰ্কতা নোহোৱাকৈ সাধাৰণ ৱাৰ্ডত"], ["the corridor", "কৰিডৰত"]], 0,
  "The bacillus spreads by airborne droplets, so ventilation dilutes it and a mask traps what the patient exhales.",
  "বেক্টেৰিয়া বায়ুৰ টোপালেৰে বিয়পে, সেয়ে বতাহ চলিলে পাতল হয় আৰু মাস্কে ৰোগীয়ে এৰা বতাহ ৰোধে।");

add("nursing-250",
  "The purpose of isolating a patient with a multidrug resistant infection is to",
  "বহু-ঔষধ প্ৰতিৰোধী সংক্ৰমণ থকা ৰোগীক পৃথক ৰখাৰ উদ্দেশ্য",
  [["stop the organism spreading to other patients", "জীৱাণু আন ৰোগীলৈ বিয়পা ৰোধ কৰা"], ["save staff time", "কৰ্মচাৰীৰ সময় ৰখা"], ["reduce the hospital bill", "চিকিৎসালয়ৰ খৰচ কমোৱা"], ["avoid giving medicines", "ঔষধ দিয়া এৰাই চলা"]], 0,
  "Resistant organisms survive standard antibiotics, so the only defence is preventing their transfer.",
  "প্ৰতিৰোধী জীৱাণুৱে সাধাৰণ এণ্টিবায়'টিকত নমৰে, সেয়ে একমাত্ৰ ৰক্ষা তেওঁলোকৰ স্থানান্তৰ ৰোধ কৰা।");

add("nursing-251",
  "A spill of blood on the floor should first be",
  "মজিয়াত ৰক্ত পৰিলে প্ৰথমে কি কৰিব লাগে",
  [["covered and cleaned with disinfectant while gloved", "দস্তানা পিন্ধি ঢাকি কীটাণুনাশকেৰে পৰিষ্কাৰ কৰা"], ["wiped with a dry cloth", "শুকান কাপোৰেৰে মচা"], ["left to dry", "শুকাবলৈ এৰি দিয়া"], ["washed with plain water only", "কেৱল সাধাৰণ পানীৰে ধোৱা"]], 0,
  "Blood carries hepatitis and HIV, so the spill is contained, disinfected with a chlorine solution and the waste disposed as infectious.",
  "ৰক্তত হেপাটাইটিছ আৰু HIV থাকে, সেয়ে পৰা ঢাকি ক্ল'ৰিন দ্ৰৱেৰে কীটাণুনাশ কৰি সংক্ৰামক বৰ্জন হিচাপে পেলোৱা হয়।");

add("nursing-252",
  "Which of the following is a sign of a surgical site infection?",
  "তলৰ কোনটো শল্য স্থানৰ সংক্ৰমণৰ চিন",
  [["spreading redness with warmth and pus", "পুঁ‌জৰ সৈতে বিয়পি যোৱা ৰঙা আৰু উম"], ["a clean dry incision", "পৰিষ্কাৰ শুকান কটা"], ["mild itching on the tenth day", "দশম দিনত সাধাৰণ খু‌জুৰি"], ["a healed scar line", "শুকুৱা দাগৰ ৰেখা"]], 0,
  "Redness that spreads, warmth and discharge mean organisms have multiplied in the wound.",
  "বিয়পি যোৱা ৰঙা, উম আৰু স্ৰাৱ মানে ঘাত জীৱাণু বাঢ়িছে।");

add("nursing-253",
  "Alcohol based hand rub is preferred over soap and water when",
  "কেতিয়া চাবোন-পানীতকৈ এলকহ'ল হাত ঘঁ‌হা পছন্দ কৰা হয়",
  [["hands are not visibly soiled", "হাত দৃশ্যমানভাৱে মলিয়ন নহ'লে"], ["hands are covered with blood", "হাতত ৰক্ত লাগিছে"], ["hands are muddy", "হাত বোকাময়"], ["after using the toilet", "শৌচ কৰাৰ পিছত"]], 0,
  "Alcohol kills organisms fast without a sink, but it cannot penetrate dirt or blood, so washing is needed then.",
  "এলকহ'লে বেচিন নোহোৱাকৈ সোনকালে জীৱাণু মাৰে, কিন্তু মলি বা ৰক্ত ভেদ কৰিব নোৱাৰে, সেয়ে তেতিয়া ধোৱা লাগে।");

add("nursing-254",
  "Which of the following waste is placed in a yellow bag?",
  "তলৰ কোনটো বৰ্জন হালধীয়া মোনাত পেলোৱা হয়",
  [["human anatomical waste", "মানৱ শৰীৰস্থানৰ বৰ্জন"], ["used glass ampoules", "ব্যৱহৃত কাচৰ এম্পুল"], ["discarded syringes without needle", "ছুই নোহোৱা পেলাই দিয়া ছিৰিঞ্জ"], ["kitchen waste", "ৰান্ধনীঘৰৰ বৰ্জন"]], 0,
  "Yellow is for incineration waste such as human tissue, soiled dressings and expired blood. Sharps go in white or puncture-proof containers.",
  "হালধীয়া জ্বলোৱা বৰ্জনলৈ, যেনে মানৱ কলা, মলিন পটি আৰু ম্যাদ উকলা ৰক্ত। ছুই বগা বা ছিদ্ৰৰোধী পাত্রত।");

add("nursing-255",
  "The chain of infection is broken at the portal of entry mainly by",
  "সংক্ৰমণৰ শৃংখল প্ৰৱেশদ্বাৰত মূলতঃ কিৰে ভঙা হয়",
  [["covering wounds and using aseptic technique", "ঘা ঢাকি জীৱাণুমুক্ত কৌশল ব্যৱহাৰ কৰি"], ["increasing ward temperature", "ৱাৰ্ডৰ উষ্ণতা বঢ়াই"], ["reducing staff numbers", "কৰ্মচাৰী সংখ্যা কমাই"], ["closing the pharmacy", "ফাৰ্মাচী বন্ধ কৰি"]], 0,
  "Intact skin and mucosa are the body's barrier, so dressings and sterile technique stop organisms getting in.",
  "অক্ষত ছাল আৰু শ্লেষ্মা শৰীৰৰ বেৰ, সেয়ে পটি আৰু জীৱাণুমুক্ত কৌশলে জীৱাণু সোমোৱা ৰোধ কৰে।");

add("nursing-256",
  "A nurse with a weeping lesion on the hand should",
  "হাতত তিতা ঘা থকা নাৰ্ছে",
  [["avoid direct patient care until treated", "চিকিৎসা নোহোৱালৈকে পোনপটীয়া ৰোগী সেৱা এৰিব"], ["continue dressing wounds", "ঘা পটি কৰি থাকিব"], ["work without gloves", "দস্তানা নোহোৱাকৈ কাম কৰিব"], ["share instruments", "সজুলি ভাগ কৰিব"]], 0,
  "A weeping lesion can shed organisms and also admit them, so the nurse is moved to non-clinical duties.",
  "তিতা ঘাই জীৱাণু এৰিবও পাৰে আৰু গ্ৰহণও কৰিব পাৰে, সেয়ে নাৰ্ছক অ-চিকিৎসা কামলৈ সলনি কৰা হয়।");

add("nursing-257",
  "The main purpose of ventilating a ward is to",
  "ৱাৰ্ডত বতাহ চলোৱাৰ মূল উদ্দেশ্য",
  [["dilute airborne organisms", "বায়ুৰ জীৱাণু পাতল কৰা"], ["increase humidity", "আৰ্দ্ৰতা বঢ়োৱা"], ["reduce noise", "শব্দ কমোৱা"], ["save electricity", "বিদ্যুৎ সঞ্চয় কৰা"]], 0,
  "Fresh air carries droplet nuclei away, lowering the concentration that the next patient breathes in.",
  "সতেজ বতাহে টোপালৰ কেন্দ্ৰ নিয়ে, সেয়ে পৰৱৰ্তী ৰোগীয়ে উশাহ লোৱা ঘনত্ব কমে।");

add("nursing-258",
  "Which of the following best describes an opportunistic infection?",
  "তলৰ কোনটোৱে সুযোগসন্ধানী সংক্ৰমণ ভালদৰে বৰ্ণনা কৰে",
  [["an infection that strikes when immunity is low", "ৰোগ প্ৰতিৰোধ ক্ষমতা কম হ'লে হোৱা সংক্ৰমণ"], ["an infection caught in the community", "সমাজত হোৱা সংক্ৰমণ"], ["a mild seasonal cold", "সাধাৰণ ঋতুভিত্তিক ঠাণ্ডা"], ["an infection from food only", "কেৱল খাদ্যৰপৰা হোৱা সংক্ৰমণ"]], 0,
  "Organisms that are harmless to a healthy person cause disease when defences fall, as in AIDS or after chemotherapy.",
  "সুস্থ মানুহৰ বাবে নিৰীহ জীৱাণুৱে ৰক্ষা কমিলে ৰোগ কৰে, যেনে AIDS ত বা কিম'থেৰাপীৰ পিছত।");

add("nursing-259",
  "The correct way to clean a used bedpan is to",
  "ব্যৱহৃত মল-চৰু পৰিষ্কাৰ কৰাৰ শুদ্ধ উপায়",
  [["empty, wash and disinfect before reuse", "খালী কৰি ধুই জীৱাণুমুক্ত কৰি পুনৰ ব্যৱহাৰ"], ["rinse with water only", "কেৱল পানীৰে ধোৱা"], ["reuse without cleaning", "পৰিষ্কাৰ নকৰাকৈ পুনৰ ব্যৱহাৰ"], ["store wet in a corner", "তিতা অৱস্থাত চুকত ৰখা"]], 0,
  "Faecal matter carries pathogens, so mechanical cleaning followed by a disinfectant is needed between patients.",
  "মলত ৰোগসৃষ্টিকাৰী জীৱাণু থাকে, সেয়ে ৰোগীৰ মাজত পৰিষ্কাৰৰ পিছত কীটাণুনাশক লাগে।");

add("nursing-260",
  "Post exposure prophylaxis after a needlestick injury from a hepatitis B patient includes",
  "হেপাটাইটিছ B ৰোগীৰ ছুইৰ আঘাতৰ পিছত প্ৰতিৰোধমূলক চিকিৎসাত থাকে",
  [["hepatitis B immunoglobulin and vaccine", "হেপাটাইটিছ B ইমিউন'গ্লবুলিন আৰু টিকা"], ["only a bandage", "কেৱল বেণ্ডেজ"], ["nothing at all", "একো নহয়"], ["antibiotic tablets only", "কেৱল এণ্টিবায়'টিক বড়ি"]], 0,
  "Antibody gives immediate cover while the vaccine starts active immunity, so both are given together.",
  "প্ৰতিদেহে লগে লগে সুৰক্ষা দিয়ে আৰু টিকাই সক্ৰিয় প্ৰতিৰোধ আৰম্ভ কৰে, সেয়ে দুয়ো একেলগে দিয়া হয়।");

add("nursing-261",
  "Which of the following is the correct action before giving an injection?",
  "ইনজেকচন দিয়াৰ আগতে শুদ্ধ কাম কোনটো",
  [["clean the site with an antiseptic and let it dry", "স্থান প্ৰতিষেধকেৰে পৰিষ্কার কৰি শুকাবলৈ দিয়া"], ["inject through clothing", "কাপোৰৰ মাজেৰে দিয়া"], ["skip hand hygiene", "হাত নুধুৱাকৈ"], ["reuse the same needle", "একেই ছুই পুনৰ ব্যৱহাৰ"]], 0,
  "Antisepsis cuts skin organisms and drying gives it time to act, while reusing a needle transmits blood-borne disease.",
  "প্ৰতিষেধকে ছালৰ জীৱাণু কমায় আৰু শুকালে কাম কৰাৰ সময় পায়, আনহাতে ছুই পুনৰ ব্যৱহাৰে ৰক্তবাহিত ৰোগ বিয়পায়।");

add("nursing-262",
  "A clean technique that reduces but does not eliminate micro-organisms is called",
  "জীৱাণু কমোৱা কিন্তু সম্পূৰ্ণ নমচা পৰিষ্কাৰ কৌশলক কি বোলা হয়",
  [["medical asepsis", "চিকিৎসা এচেপছিছ"], ["surgical asepsis", "শল্য এচেপছিছ"], ["sterilisation", "জীৱাণুমুক্তকৰণ"], ["incineration", "জ্বলোৱা"]], 0,
  "Medical asepsis covers hand washing and cleaning, which lowers the count. Surgical asepsis and sterilisation aim at zero.",
  "চিকিৎসা এচেপছিছত হাত ধোৱা আৰু পৰিষ্কাৰ সোমায়, যিয়ে সংখ্যা কমায়। শল্য এচেপছিছ আৰু জীৱাণুমুক্তকৰণে শূন্য লক্ষ্য কৰে।");

add("nursing-263",
  "The most important reason for changing soiled dressings promptly is to",
  "মলিন পটি সোনকালে সলোৱাৰ আটাই গুৰুত্বপূৰ্ণ কাৰণ",
  [["prevent organisms multiplying and spreading", "জীৱাণু বাঢ়ি বিয়পা ৰোধ কৰা"], ["save the laundry cost", "কাপোৰ ধোৱাৰ খৰচ ৰখা"], ["make the bed look tidy", "বিছনা চাফ দেখুওৱা"], ["reduce the nurse's work", "নাৰ্ছৰ কাম কমোৱা"]], 0,
  "A wet dressing is a warm culture medium next to the wound and a source of cross infection.",
  "তিতা পটি ঘাৰ কাষত উমলীয়া সংৱৰ্ধন মাধ্যম আৰু সংক্ৰমণৰ উৎস।");

add("nursing-264",
  "Which of the following best describes cross infection?",
  "তলৰ কোনটোৱে ক্ৰছ সংক্ৰমণ ভালদৰে বৰ্ণনা কৰে",
  [["infection passed from one patient to another", "এজন ৰোগীৰপৰা আনলৈ যোৱা সংক্ৰমণ"], ["infection from a patient's own gut flora", "ৰোগীৰ নিজৰ অন্ত্ৰৰ জীৱাণুৰপৰা সংক্ৰমণ"], ["an infection acquired at home", "ঘৰত হোৱা সংক্ৰমণ"], ["a genetic disorder", "বংশগত ৰোগ"]], 0,
  "Cross infection travels between people via hands, equipment or air. Infection from the patient's own flora is endogenous.",
  "ক্ৰছ সংক্ৰমণ হাত, সজুলি বা বায়ুৰে মানুহৰ মাজত যায়। ৰোগীৰ নিজৰ জীৱাণুৰপৰা হোৱাটো অন্তঃজাত।");

add("nursing-265",
  "The correct temperature for an autoclave cycle is usually",
  "অ'ট'ক্লেভ চক্ৰৰ শুদ্ধ উষ্ণতা সাধাৰণতে",
  [["121 degrees Celsius", "১২১ ডিগ্ৰী চেলছিয়াছ"], ["60 degrees Celsius", "৬০ ডিগ্ৰী চেলছিয়াছ"], ["200 degrees Celsius", "২০০ ডিগ্ৰী চেলছিয়াছ"], ["37 degrees Celsius", "৩৭ ডিগ্ৰী চেলছিয়াছ"]], 0,
  "At fifteen pounds pressure, steam at 121 Celsius kills spores in about fifteen minutes. Lower heat only disinfects.",
  "পোন্ধৰ পাউণ্ড চাপত ১২১ ডিগ্ৰীৰ ভাপে প্ৰায় পোন্ধৰ মিনিটত বীজাণু মাৰে। কম তাপে কেবল কীটাণুনাশ কৰে।");

add("nursing-266",
  "A nurse should perform hand hygiene immediately",
  "নাৰ্ছে হাত লগে লগে পৰিষ্কাৰ কৰিব লাগে",
  [["before and after every patient contact", "প্ৰতিজন ৰোগীৰ সংস্পৰ্শৰ আগে-পিছে"], ["once at the start of the shift", "শিফ্ট আৰম্ভণিতে এবাৰ"], ["only after touching blood", "কেৱল ৰক্ত চুলেহে"], ["only before meals", "কেৱল ভোজনৰ আগতে"]], 0,
  "The five moments of hand hygiene centre on patient contact, body fluid exposure and the surroundings.",
  "হাত পৰিষ্কাৰৰ পাঁচ মাহাত্ম্যপূৰ্ণ সময় ৰোগীৰ সংস্পৰ্শ, শৰীৰ তৰল আৰু চাৰিওফালৰ ওপৰত কেন্দ্ৰিত।");

add("nursing-267",
  "Which of the following patients needs contact precautions?",
  "তলৰ কোন ৰোগীলৈ সংস্পৰ্শ সতৰ্কতা লাগে",
  [["a patient with Clostridium difficile diarrhoea", "ক্ল'ষ্ট্ৰিডিয়াম ডিফিচিলে ডায়েৰিয়া থকা ৰোগী"], ["a patient with a healed fracture", "শুকুৱা ফ্ৰেকচাৰ থকা ৰোগী"], ["a patient with mild anaemia", "সাধাৰণ ৰক্তহীনতা থকা ৰোগী"], ["a patient with a common cold", "সাধাৰণ ঠাণ্ডা থকা ৰোগী"]], 0,
  "C. difficile spores survive on surfaces and on hands, so gown and gloves are worn for every contact.",
  "ক্ল'ষ্ট্ৰিডিয়ামৰ বীজাণু পৃষ্ঠ আৰু হাতত টিকি থাকে, সেয়ে প্ৰতিটো সংস্পৰ্শত গাউন আৰু দস্তানা পিন্ধা হয়।");

add("nursing-268",
  "The best way to prevent catheter associated urinary infection is to",
  "কেথেটাৰজনিত মূত্ৰ সংক্ৰমণ ৰোধৰ আটাই ভাল উপায়",
  [["remove the catheter as early as possible", "কেথেটাৰ যিমান সোনকালে সম্ভৱ আঁতৰোৱা"], ["irrigate it daily", "প্ৰতিদিনে ধুই দিয়া"], ["change the bag every hour", "প্ৰতি ঘণ্টাত মোনা সলোৱা"], ["keep it clamped always", "সদায় চেপি ৰখা"]], 0,
  "Every day a catheter stays in adds risk, so the decision to keep it is reviewed daily. Irrigation pushes organisms upward.",
  "কেথেটাৰ যিমান দিন থাকে সিমান বিপদ বাঢ়ে, সেয়ে প্ৰতিদিনে পুনৰ বিচাৰ কৰা হয়। ধুই দিলে জীৱাণু ওপৰলৈ যায়।");

add("nursing-269",
  "A spill of used sharps in the ward should be handled by",
  "ৱাৰ্ডত ব্যৱহৃত ছুই পৰি থাকিলে কেনেকৈ চম্ভালিব লাগে",
  [["using a scoop and forceps, never bare hands", "কোৰ আৰু চিমটা ব্যৱহাৰ কৰি, কেতিয়াও খালী হাতেৰে নহয়"], ["picking them by hand", "হাতেৰে তুলি"], ["pushing them under the bed", "বিছনাৰ তললৈ ঠেলি"], ["leaving them for housekeeping", "ঘৰুৱা কৰ্মীলৈ এৰি"]], 0,
  "Bare hands risk a needlestick, so a scoop is used and the sharps go straight into a rigid container.",
  "খালী হাতে ছুই আঘাতৰ বিপদ, সেয়ে কোৰেৰে তুলি ছুই পোনপটীয়াকৈ টান পাত্রত পেলোৱা হয়।");

add("nursing-270",
  "Which of the following is the main reason for not wearing the same gloves for two patients?",
  "দুজন ৰোগীৰ বাবে একেই দস্তানা নিপিন্ধাৰ মূল কাৰণ",
  [["gloves carry organisms between patients", "দস্তানাই ৰোগীৰ মাজত জীৱাণু নিয়ে"], ["gloves become too tight", "দস্তানা টান হৈ যায়"], ["gloves change colour", "দস্তানাৰ ৰং সলনি হয়"], ["gloves are expensive", "দস্তানা দামী"]], 0,
  "Gloves protect the wearer but become contaminated, so they are changed and hands cleaned between patients.",
  "দস্তানাই পিন্ধোতাক ৰক্ষা কৰে কিন্তু দূষিত হয়, সেয়ে ৰোগীৰ মাজত সলাই হাত পৰিষ্কাৰ কৰা হয়।");

/* ================= first-aid-emergency ================= */
useLeaf("first-aid-emergency");

add("nursing-271",
  "The first step in managing an unconscious adult is to",
  "অচেতন প্ৰাপ্তবয়স্কৰ চিকিৎসাত প্ৰথম খোজ",
  [["check the airway and breathing", "বায়ুপথ আৰু উশাহ পৰীক্ষা কৰা"], ["give water to drink", "খাবলৈ পানী দিয়া"], ["sit the patient up", "ৰোগীক বহুওৱা"], ["cover the patient fully", "ৰোগীক সম্পূৰ্ণ ঢাকি দিয়া"]], 0,
  "Without a clear airway and breathing, nothing else matters, so the ABC sequence begins with the airway.",
  "বায়ুপথ আৰু উশাহ পৰিষ্কাৰ নহ'লে আন একোৱেই গুৰুত্বপূৰ্ণ নহয়, সেয়ে ABC ক্ৰম বায়ুপথেৰে আৰম্ভ হয়।");

add("nursing-272",
  "The correct compression to ventilation ratio for one rescuer adult CPR is",
  "এজন উদ্ধাৰকৰ প্ৰাপ্তবয়স্ক CPR ত চাপ আৰু উশাহৰ শুদ্ধ অনুপাত",
  [["30 to 2", "৩০ ৰপৰা ২"], ["15 to 2", "১৫ ৰপৰা ২"], ["5 to 1", "৫ ৰপৰা ১"], ["10 to 5", "১০ ৰপৰা ৫"]], 0,
  "Thirty compressions then two breaths keeps circulation going with minimal interruption. Paediatric ratios differ.",
  "ত্ৰিশ চাপৰ পিছত দুই উশাহে কম বাধাৰ সৈতে সংবহন চলায়। শিশুৰ অনুপাত বেলেগ।");

add("nursing-273",
  "The correct depth of chest compression in an adult is about",
  "প্ৰাপ্তবয়স্কত বুকু চেপাৰ শুদ্ধ গভীৰতা প্ৰায়",
  [["5 to 6 cm", "৫ ৰপৰা ৬ ছে.মি."], ["1 to 2 cm", "১ ৰপৰা ২ ছে.মি."], ["10 to 12 cm", "১০ ৰপৰা ১২ ছে.মি."], ["3 cm", "৩ ছে.মি."]], 0,
  "Five to six centimetres squeezes the heart enough to move blood. Shallow compressions do not circulate.",
  "৫ ৰপৰা ৬ ছে.মি.য়ে হৃদয় চেপি ৰক্ত চলাবলৈ যথেষ্ট। অগভীৰ চাপে ৰক্ত নচলায়।");

add("nursing-274",
  "For a choking adult who can still cough forcefully, the first action is to",
  "এতিয়াও জোৰে কাহিব পৰা ডিঙিত বন্ধা প্ৰাপ্তবয়স্কত প্ৰথম কাম",
  [["encourage continued coughing", "কাহি থাকিবলৈ উৎসাহ দিয়া"], ["give abdominal thrusts", "পেটত চাপ দিয়া"], ["give water", "পানী দিয়া"], ["lie the patient down", "ৰোগীক শুৱাই দিয়া"]], 0,
  "A strong cough moves more air than any thrust and may clear the object, so it is encouraged first.",
  "জোৰাল কাহে যিকোনো চাপতকৈ বেছি বতাহ চালিত কৰি বস্তু ওলিয়াব পাৰে, সেয়ে প্ৰথমে উৎসাহ দিয়া হয়।");

add("nursing-275",
  "The correct first aid for a superficial burn is to",
  "পাতল পোৰণিত শুদ্ধ প্ৰাথমিক চিকিৎসা",
  [["cool with running water for twenty minutes", "বিশ মিনিট বোৱা পানীৰে শীতল কৰা"], ["apply ice directly", "পোনপটীয়াকৈ বৰফ লগোৱা"], ["apply toothpaste", "দাঁতৰ মাজন লগোৱা"], ["burst any blisters", "ফোঁ‌হা ফুটাই দিয়া"]], 0,
  "Cooling water limits the depth of damage and eases pain. Ice and toothpaste injure tissue further, and blisters protect the wound.",
  "শীতল পানীয়ে ক্ষতিৰ গভীৰতা সীমিত কৰি বিষ কমায়। বৰফ আৰু মাজনে কলা আৰু নষ্ট কৰে, আৰু ফোঁ‌হাই ঘা ৰক্ষা কৰে।");

add("nursing-276",
  "A tourniquet for severe limb bleeding should be",
  "অংগত তীব্ৰ ৰক্তক্ষৰণত টুৰ্নিকেট",
  [["applied above the wound and the time noted", "ঘাৰ ওপৰত লগাই সময় লিখি ৰখা"], ["applied below the wound", "ঘাৰ তলত লগোৱা"], ["loosened every few minutes", "কেইমিনিটে ঢিলা কৰা"], ["left without recording the time", "সময় নিলিখাকৈ এৰি দিয়া"]], 0,
  "The time matters because a tourniquet left too long damages the limb, and releasing it repeatedly restarts the bleeding.",
  "সময় গুৰুত্বপূৰ্ণ কাৰণ বেছি সময় থাকিলে অংগ নষ্ট হয়, আৰু বাৰে বাৰে ঢিলা কৰিলে ৰক্তক্ষৰণ পুনৰ আৰম্ভ হয়।");

add("nursing-277",
  "The recovery position is used for a patient who is",
  "পুনৰুদ্ধাৰ অৱস্থান ব্যৱহৃত হয় এনে ৰোগীৰ বাবে যি",
  [["unconscious but breathing", "অচেতন কিন্তু উশাহ লৈ আছে"], ["not breathing at all", "একেবাৰে উশাহ নলয়"], ["walking normally", "স্বাভাৱিকভাৱে খোজ কাঢ়ি আছে"], ["bleeding heavily from the arm", "বাহুৰপৰা বেছি ৰক্তক্ষৰণ হৈছে"]], 0,
  "Lying on the side keeps the tongue forward and lets vomit drain, protecting the airway. A non-breathing patient needs CPR.",
  "কাষে শুলে জিভা আগলৈ থাকে আৰু বমি ওলাই যায়, সেয়ে বায়ুপথ ৰক্ষা পায়। উশাহ নল'লে CPR লাগে।");

add("nursing-278",
  "The first aid for a suspected fracture of the forearm is to",
  "আগবাহু ভঙা সন্দেহত প্ৰাথমিক চিকিৎসা",
  [["immobilise it in the position found", "পোৱা অৱস্থাতেই স্থিৰ কৰা"], ["straighten the bone forcefully", "হাড় জোৰকৈ সোজা কৰা"], ["massage the area", "ঠাইখন মালিচ কৰা"], ["ask the patient to move it repeatedly", "ৰোগীক বাৰে বাৰে লৰাবলৈ কোৱা"]], 0,
  "Moving the bone ends can damage vessels and nerves, so a splint holds the limb as found until X-ray.",
  "হাড়ৰ মূৰ লৰালে নলী আৰু স্নায়ু নষ্ট হয়, সেয়ে এক্স-ৰে লোৱালৈকে স্প্লিণ্টে পোৱা অৱস্থাত ধৰি ৰাখে।");

add("nursing-279",
  "In case of an electric shock, the rescuer should first",
  "বিদ্যুৎস্পৃষ্ট হ'লে উদ্ধাৰকে প্ৰথমে",
  [["switch off the power source", "বিদ্যুৎ উৎস বন্ধ কৰিব"], ["touch the victim immediately", "ভুক্তভোগীক লগে লগে চুব"], ["pour water on the victim", "ভুক্তভোগীত পানী ঢালিব"], ["give mouth to mouth breathing at once", "লগে লগে মুখে মুখে উশাহ দিব"]], 0,
  "Touching a live victim makes the rescuer a second casualty, so the current is cut before any contact.",
  "চলি থকা ভুক্তভোগীক চুলে উদ্ধাৰকো দ্বিতীয় ভুক্তভোগী হয়, সেয়ে সংস্পৰ্শৰ আগতে প্ৰবাহ বন্ধ কৰা হয়।");

add("nursing-280",
  "The sign of an airway obstruction in a conscious adult is",
  "সচেতন প্ৰাপ্তবয়স্কত বায়ুপথ বন্ধ হোৱাৰ চিন",
  [["clutching the throat and unable to speak", "ডিঙি ধৰি কথা ক'ব নোৱাৰা"], ["sneezing repeatedly", "বাৰে বাৰে হাঁচি দিয়া"], ["mild cough with clear speech", "স্পষ্ট মাতেৰে সাধাৰণ কাহ"], ["feeling hungry", "ভোক লগা"]], 0,
  "Silence and the hand at the throat mean no air is moving, which is a complete obstruction needing thrusts.",
  "নীৰৱতা আৰু ডিঙিত হাত দিয়া মানে বতাহ নচলিছে, যি সম্পূৰ্ণ বন্ধ আৰু চাপৰ প্ৰয়োজন।");

add("nursing-281",
  "The first aid for a nosebleed is to",
  "নাকৰপৰা ৰক্ত ওলালে প্ৰাথমিক চিকিৎসা",
  [["sit up, lean forward and pinch the soft part", "বহি আগলৈ নমাই কোমল অংশ চেপি ধৰা"], ["lie flat and look up", "সমতল শুই ওপৰলৈ চোৱা"], ["blow the nose hard", "জোৰে নাক চাফা কৰা"], ["pack the nose with cotton and leave it", "নাকত কপাহ ভৰাই এৰি দিয়া"]], 0,
  "Leaning forward stops blood running down the throat, and pinching presses the bleeding point for ten minutes.",
  "আগলৈ নমালে ৰক্ত ডিঙিৰে নামি নাযায়, আৰু চেপি ধৰিলে দহ মিনিট ৰক্তক্ষৰণৰ ঠাইত চাপ পৰে।");

add("nursing-282",
  "Which of the following is the correct sequence for adult basic life support?",
  "প্ৰাপ্তবয়স্ক মৌলিক জীৱন সহায়ৰ শুদ্ধ ক্ৰম কোনটো",
  [["check response, shout for help, open airway, check breathing, start CPR", "সঁ‌হাৰ পৰীক্ষা, সহায় বিচাৰি চিৎকাৰ, বায়ুপথ মেলা, উশাহ পৰীক্ষা, CPR আৰম্ভ"], ["start CPR before checking response", "সঁ‌হাৰ পৰীক্ষাৰ আগতে CPR আৰম্ভ"], ["give breaths before opening the airway", "বায়ুপথ মেলাৰ আগতে উশাহ দিয়া"], ["wait for an ambulance without doing anything", "এম্বুলেন্সৰ বাবে একো নকৰাকৈ অপেক্ষা"]], 0,
  "Confirming unresponsiveness avoids treating someone who is merely asleep, and the airway must be open before breaths.",
  "অচেতনতা নিশ্চিত কৰিলে কেবল টোপনিত থকা লোকৰ চিকিৎসা এৰায়, আৰু উশাহ দিয়াৰ আগতে বায়ুপথ মেলিব লাগে।");

add("nursing-283",
  "The correct first aid for a chemical splash in the eye is to",
  "চকুত ৰাসায়নিক ছিটিকিলে শুদ্ধ প্ৰাথমিক চিকিৎসা",
  [["irrigate with clean running water for at least fifteen minutes", "অন্ততঃ পোন্ধৰ মিনিট পৰিষ্কাৰ বোৱা পানীৰে ধোৱা"], ["rub the eye hard", "চকু জোৰে ঘঁ‌হা"], ["apply eye ointment at once", "লগে লগে চকুৰ মলম লগোৱা"], ["cover the eye and wait", "চকু ঢাকি অপেক্ষা কৰা"]], 0,
  "Dilution and washing out limit the burn, while rubbing spreads the chemical and ointment traps it.",
  "পাতল কৰি ধুই পেলালে পোৰণি সীমিত হয়, আনহাতে ঘঁ‌হিলে ৰাসায়নিক বিয়পে আৰু মলমে তাক ধৰি ৰাখে।");

add("nursing-284",
  "A patient with suspected spinal injury should be moved only",
  "মেৰুদণ্ডৰ আঘাত সন্দেহ থকা ৰোগীক লৰচৰ কৰা উচিত কেৱল",
  [["if there is immediate danger such as fire", "আগুনৰ দৰে লগে লগে বিপদ থাকিলে"], ["to make the bed", "বিছনা সজাবলৈ"], ["to take a photograph", "ফটো তুলিবলৈ"], ["for a routine check", "নিয়মীয়া পৰীক্ষাৰ বাবে"]], 0,
  "Unnecessary movement can sever the cord, so the patient stays still unless staying would be fatal.",
  "অপ্ৰয়োজনীয় লৰচৰে ৰজ্জু ছিঁড়িব পাৰে, সেয়ে থাকিলে মৃত্যু হ'ব বুলি নিশ্চিত নহ'লে ৰোগী স্থিৰ থাকে।");

add("nursing-285",
  "The universal donor blood group is",
  "সৰ্বজনীন ৰক্তদাতা ৰক্ত শ্ৰেণী",
  [["O negative", "O ঋণাত্মক"], ["AB positive", "AB ধনাত্মক"], ["A positive", "A ধনাত্মক"], ["B negative", "B ঋণাত্মক"]], 0,
  "O negative carries no A, B or Rh antigens, so it can be given before cross matching. AB positive is the universal recipient.",
  "O ঋণাত্মকত A, B বা Rh প্ৰতিজনক নাই, সেয়ে ক্ৰছ ম্যাচিঙৰ আগতে দিব পাৰি। AB ধনাত্মক সৰ্বজনীন গ্ৰাহক।");

add("nursing-286",
  "In case of poisoning by mouth in a conscious patient, the first priority is to",
  "সচেতন ৰোগীত মুখেৰে বিষক্ৰিয়া হ'লে প্ৰথম অগ্ৰাধিকাৰ",
  [["preserve the airway and identify the poison", "বায়ুপথ ৰক্ষা কৰি বিষ চিনাক্ত কৰা"], ["force the patient to vomit", "জোৰকৈ বমি কৰোৱা"], ["give plenty of milk", "প্ৰচুৰ গাখীৰ দিয়া"], ["give a strong acid", "শক্তিশালী অম্ল দিয়া"]], 0,
  "Vomiting a corrosive substance burns the throat again, so the airway is protected and the container kept for identification.",
  "ক্ষয়কাৰী পদাৰ্থ বমি কৰিলে ডিঙি পুনৰ পোৰে, সেয়ে বায়ুপথ ৰক্ষা কৰি চিনাক্তৰ বাবে বটল ৰখা হয়।");

add("nursing-287",
  "The recommended rate of chest compressions in adult CPR is",
  "প্ৰাপ্তবয়স্ক CPR ত বুকু চেপাৰ পৰামৰ্শিত হাৰ",
  [["100 to 120 per minute", "প্ৰতি মিনিটত ১০০ ৰপৰা ১২০"], ["40 to 60 per minute", "প্ৰতি মিনিটত ৪০ ৰপৰা ৬০"], ["200 per minute", "প্ৰতি মিনিটত ২০০"], ["20 per minute", "প্ৰতি মিনিটত ২০"]], 0,
  "A hundred to a hundred and twenty keeps blood pressure up without losing time to refill the heart.",
  "১০০ ৰপৰা ১২০ এ হৃদয় পুনৰ ভৰাৰ সময় নেহেৰুৱাই ৰক্তচাপ ধৰি ৰাখে।");

add("nursing-288",
  "The first aid for a fainting patient is to",
  "মুৰ্চ্ছিত ৰোগীৰ প্ৰাথমিক চিকিৎসা",
  [["lay the patient flat and raise the legs", "ৰোগীক সমতল শুৱাই ভৰি ওপৰলৈ তোলা"], ["make the patient stand up", "ৰোগীক থিয় কৰোৱা"], ["give hot tea immediately", "লগে লগে গৰম চাহ দিয়া"], ["splash cold water on the face", "মুখত ঠাণ্ডা পানী ছটিওৱা"]], 0,
  "Raising the legs returns blood to the brain. Standing or giving fluids risks a fall and choking.",
  "ভৰি ওপৰলৈ তুলিলে মগজুলৈ ৰক্ত ঘূৰি যায়। থিয় কৰালে বা তৰল দিলে পৰা আৰু বাধাৰ বিপদ।");

add("nursing-289",
  "Which of the following is the correct way to control bleeding from a cut on the arm?",
  "বাহুৰ কটাৰপৰা ৰক্তক্ষৰণ ৰোধৰ শুদ্ধ উপায়",
  [["apply direct pressure with a clean cloth", "পৰিষ্কাৰ কাপোৰেৰে পোনপটীয়া চাপ দিয়া"], ["wash with hot water repeatedly", "গৰম পানীৰে বাৰে বাৰে ধোৱা"], ["keep the arm below heart level", "বাহুক হৃদয়ৰ তলত ৰখা"], ["remove any embedded object", "ভিতৰত সোমোৱা বস্তু উলিওৱা"]], 0,
  "Direct pressure lets a clot form, and raising the limb above the heart slows the flow. Pulling out an embedded object restarts bleeding.",
  "পোনপটীয়া চাপে ৰক্ত জমিব দিয়ে, আৰু অংগ ওপৰলৈ তুলিলে প্ৰবাহ লেহেম হয়। সোমোৱা বস্তু উলিয়ালে ৰক্তক্ষৰণ পুনৰ আৰম্ভ।");

add("nursing-290",
  "The first aid for a scorpion sting is to",
  "বিছাৰে খোঁ‌টিলে প্ৰাথমিক চিকিৎসা",
  [["keep the limb still and get medical help", "অংগ স্থিৰ ৰাখি চিকিৎসা সহায় লোৱা"], ["cut the wound open", "ঘা কাটি মেলা"], ["apply heat immediately", "লগে লগে গৰম লগোৱা"], ["suck out the venom by mouth", "মুখেৰে বিষ চুহি উলিওৱা"]], 0,
  "Movement speeds venom spread, so the limb rests below heart level and the patient goes to hospital for antivenom.",
  "লৰচৰে বিষ বিয়পা দ্ৰুত কৰে, সেয়ে অংগ হৃদয়ৰ তলত বিশ্ৰাম কৰি ৰোগীক এণ্টিভেনমৰ বাবে চিকিৎসালয়লৈ নিয়া হয়।");

add("nursing-291",
  "A patient in hypovolaemic shock should be positioned",
  "হাইপ'ভলেমিক শ্বকত ৰোগীক ৰখা উচিত",
  [["lying flat with legs raised", "সমতল শুৱাই ভৰি ওপৰলৈ তুলি"], ["sitting upright", "সোজা বহুৱাই"], ["standing", "থিয় কৰাই"], ["head down on the face", "মুখ তলত দি"]], 0,
  "Raising the legs supports venous return to the heart until fluids can be given. Sitting drops the pressure further.",
  "ভৰি তুলিলে শিৰাৰ ৰক্ত হৃদয়লৈ ঘূৰি যায় যেতিয়ালৈ তৰল দিয়া নহয়। বহুৱালে চাপ আৰু কমে।");

add("nursing-292",
  "The first aid for a heat stroke patient is to",
  "তাপাঘাতত প্ৰাথমিক চিকিৎসা",
  [["move to shade, cool rapidly and give fluids if conscious", "ছাঁলৈ নিয়া, দ্ৰুত শীতল কৰা আৰু সচেতন হ'লে তৰল দিয়া"], ["cover with heavy blankets", "ডাঠ কম্বলেৰে ঢাকি দিয়া"], ["make the patient run", "ৰোগীক দৌৰাবলৈ কোৱা"], ["give hot drinks", "গৰম পানীয় দিয়া"]], 0,
  "Core temperature must fall fast to prevent organ damage, so cooling comes first. Blankets and exertion raise it further.",
  "অংগ নষ্ট ৰোধ কৰিবলৈ শৰীৰৰ উষ্ণতা দ্ৰুত কমাব লাগে, সেয়ে শীতল কৰা আগ। কম্বল আৰু পৰিশ্ৰমে আৰু বঢ়ায়।");

add("nursing-293",
  "The abbreviation CPR stands for",
  "CPR ৰ সম্পূৰ্ণ ৰূপ",
  [["cardiopulmonary resuscitation", "cardiopulmonary resuscitation"], ["cardiac pressure relief", "cardiac pressure relief"], ["central pulse recording", "central pulse recording"], ["chest pain relief", "chest pain relief"]], 0,
  "It combines chest compressions with rescue breaths to keep oxygenated blood moving when the heart has stopped.",
  "হৃদয় বন্ধ হ'লে অক্সিজেনযুক্ত ৰক্ত চলাই ৰাখিবলৈ ই বুকুৰ চাপ আৰু উশাহ একত্ৰ কৰে।");

add("nursing-294",
  "The correct first aid for a snake bite is to",
  "সাপে খোঁ‌টিলে শুদ্ধ প্ৰাথমিক চিকিৎসা",
  [["immobilise the limb and remove tight items", "অংগ স্থিৰ কৰি টান বস্তু আঁতৰোৱা"], ["cut and suck the wound", "ঘা কাটি চুহি উলিওৱা"], ["apply a tight tourniquet always", "সদায় টান টুৰ্নিকেট লগোৱা"], ["make the patient walk fast", "ৰোগীক দ্ৰুত খোজ কঢ়াবলৈ কোৱা"]], 0,
  "Rest slows venom spread and removing rings prevents swelling from cutting off circulation. Cutting spreads venom.",
  "বিশ্ৰামে বিষ বিয়পা লেহেম কৰে আৰু আঙুঠি খুলিলে ওফন্দাই ৰক্তস্ৰোত বন্ধ কৰাৰ পৰা ৰক্ষা কৰে। কটিলে বিষ বিয়পে।");

add("nursing-295",
  "Which of the following is a sign of hypoglycaemia in a diabetic patient?",
  "মধুমেহ ৰোগীত নিম্ন ৰক্ত শৰ্কৰাৰ চিন কোনটো",
  [["sweating with trembling and hunger", "ঘাম, কম্পন আৰু ভোক"], ["excessive thirst with frequent urine", "অত্যধিক পিয়াহ আৰু সঘন মূত্ৰ"], ["deep slow breathing", "গভীৰ ধীৰ উশাহ"], ["dry warm skin", "শুকান উমলীয়া ছাল"]], 0,
  "Low sugar releases adrenaline, giving sweat and tremor, and the brain feels hungry. Thirst and heavy urine mean high sugar.",
  "কম চেনিয়ে এড্ৰিনেলিন ওলাই ঘাম আৰু কম্পন দিয়ে, আৰু মগজুৱে ভোক অনুভৱ কৰে। পিয়াহ আৰু বেছি মূত্ৰ মানে বেছি চেনি।");

add("nursing-296",
  "An AED is used in cardiac arrest to",
  "হৃদযন্ত্ৰ বন্ধত AED ব্যৱহৃত হয় কিৰ বাবে",
  [["deliver a shock to restore a normal rhythm", "স্বাভাৱিক তাল ঘূৰাবলৈ শ্বক দিয়া"], ["give oxygen", "অক্সিজেন দিয়া"], ["measure blood pressure", "ৰক্তচাপ জোখা"], ["inject adrenaline", "এড্ৰিনেলিন দিয়া"]], 0,
  "The device analyses the rhythm and shocks only a shockable one, which is why compressions continue while it is attached.",
  "যন্ত্ৰই তাল বিশ্লেষণ কৰি কেবল শ্বকযোগ্য তালত শ্বক দিয়ে, সেয়ে লগোৱাৰ সময়ত চাপ চলি থাকে।");

add("nursing-297",
  "The correct management of a blister after a burn is to",
  "পোৰণিৰ পিছত ফোঁ‌হাৰ শুদ্ধ ব্যৱস্থাপনা",
  [["leave it intact and cover loosely", "অক্ষত ৰাখি ঢিলাকৈ ঢাকা"], ["prick it with a needle", "ছুইৰে ফুটাই দিয়া"], ["rub it with oil", "তেলেৰে ঘঁ‌হা"], ["apply mud", "বোকা লগোৱা"]], 0,
  "The blister roof is a sterile barrier against infection, so it stays unless a clinician decides otherwise.",
  "ফোঁ‌হাৰ ওপৰৰ ছাল সংক্ৰমণৰ বিৰুদ্ধে জীৱাণুমুক্ত বেৰ, সেয়ে চিকিৎসকে নক'লে তাক ৰখা হয়।");

add("nursing-298",
  "The first aid for a foreign body in the ear is to",
  "কাণত বাহিৰা বস্তু সোমালে প্ৰাথমিক চিকিৎসা",
  [["leave it and seek medical help", "এৰি দি চিকিৎসা সহায় লোৱা"], ["probe it with a pin", "পিনেৰে খুচরা কৰা"], ["pour oil to float it out", "তেল ঢালি ওপৰলৈ তোলা"], ["shake the head violently", "মূৰ জোৰে জোকাৰা"]], 0,
  "Probing pushes the object deeper and can perforate the drum, so removal is left to someone who can see it.",
  "খুচরা কৰিলে বস্তু আৰু গভীৰলৈ যায় আৰু কাণৰ পৰ্দা ফুটিব পাৰে, সেয়ে দেখিব পৰা লোকে উলিয়াব লাগে।");

add("nursing-299",
  "The first aid for a patient having a generalised seizure is to",
  "সাধাৰণ খিঁচ হোৱা ৰোগীৰ প্ৰাথমিক চিকিৎসা",
  [["protect the head and clear nearby objects", "মূৰ ৰক্ষা কৰি ওচৰৰ বস্তু আঁতৰোৱা"], ["hold the limbs down firmly", "অংগ জোৰকৈ ধৰি ৰখা"], ["put a spoon in the mouth", "মুখত চামুচ ভৰোৱা"], ["give water during the fit", "খিঁচৰ সময়ত পানী দিয়া"]], 0,
  "Restraint causes injury and objects in the mouth break teeth, so the aim is to let the fit pass safely.",
  "জোৰকৈ ধৰিলে আঘাত হয় আৰু মুখত বস্তু দিলে দাঁত ভাঙে, সেয়ে লক্ষ্য খিঁচ নিৰাপদে যাব দিয়া।");

add("nursing-300",
  "The correct first aid for a patient with severe diarrhoea and vomiting is to",
  "তীব্ৰ ডায়েৰিয়া আৰু বমি হোৱা ৰোগীৰ শুদ্ধ প্ৰাথমিক চিকিৎসা",
  [["give oral rehydration solution in small frequent sips", "সৰু সৰু সঘন চুমুকত মুখেৰে পানীশূন্যতা পূৰণ দ্ৰৱ দিয়া"], ["withhold all fluids", "সকলো তৰল বন্ধ ৰখা"], ["give only strong tea", "কেৱল কেঁ‌‌ঢ়া চাহ দিয়া"], ["give large volumes at once", "একেবাৰে বেছি পৰিমাণ দিয়া"]], 0,
  "Small sips are absorbed even when vomiting, while large volumes trigger more vomiting and withholding causes shock.",
  "বমি হলেও সৰু চুমুকে শোষিত হয়, আনহাতে বেছি পৰিমাণে বমি বঢ়ায় আৰু তৰল বন্ধ কৰিলে শ্বক হয়।");

/* ================= medical-terminology ================= */
useLeaf("medical-terminology");

add("nursing-301",
  "The prefix tachy- in medical terminology means",
  "চিকিৎসা পৰিভাষাত tachy- উপসৰ্গই বুজায়",
  [["fast", "দ্ৰুত"], ["slow", "ধীৰ"], ["large", "ডাঙৰ"], ["small", "সৰু"]], 0,
  "Tachycardia is a fast heart and tachypnoea is fast breathing. The opposite prefix brady- means slow.",
  "টেকিকাৰ্ডিয়া দ্ৰুত হৃদয় আৰু টেকিপ্নিয়া দ্ৰুত উশাহ। ওলোটা উপসৰ্গ ব্ৰেডি- মানে ধীৰ।");

add("nursing-302",
  "The suffix -itis in a medical term indicates",
  "চিকিৎসা শব্দত -itis প্ৰত্যয়ই কি সূচায়",
  [["inflammation", "প্ৰদাহ"], ["tumour", "অৰ্বুদ"], ["bleeding", "ৰক্তক্ষৰণ"], ["deficiency", "অভাব"]], 0,
  "Gastritis is inflammation of the stomach and arthritis of a joint. Tumour takes the suffix -oma.",
  "গেষ্ট্ৰাইটিছ পেটৰ প্ৰদাহ আৰু আৰ্থ্ৰাইটিছ গাঁ‌ঠিৰ। অৰ্বুদৰ প্ৰত্যয় -oma।");

add("nursing-303",
  "The term dyspnoea means",
  "ডিছপ্নিয়া শব্দই বুজায়",
  [["difficult breathing", "উশাহ লোৱাত কষ্ট"], ["absent breathing", "উশাহ নথকা"], ["rapid breathing", "দ্ৰুত উশাহ"], ["deep breathing", "গভীৰ উশাহ"]], 0,
  "Dys- means difficult and -pnoea means breathing. Absent breathing is apnoea.",
  "Dys- মানে কষ্ট আৰু -pnoea মানে উশাহ। উশাহ নথকা অৱস্থা এপ্নিয়া।");

add("nursing-304",
  "The medical term for low blood sugar is",
  "কম ৰক্ত শৰ্কৰাৰ চিকিৎসা পৰিভাষা",
  [["hypoglycaemia", "হাইপ'গ্লাইচিমিয়া"], ["hyperglycaemia", "হাইপাৰগ্লাইচিমিয়া"], ["hypokalaemia", "হাইপ'কেলিমিয়া"], ["hypercalcaemia", "হাইপাৰকেলছিমিয়া"]], 0,
  "Hypo- means below normal and glycaemia refers to glucose in blood. Hyper- is the opposite, high sugar.",
  "Hypo- মানে স্বাভাৱিকৰ তলত আৰু glycaemia ৰক্তৰ গ্লুক'জলৈ। Hyper- ওলোটা, বেছি চেনি।");

add("nursing-305",
  "The term haematuria means",
  "হিমেটিউৰিয়া শব্দই বুজায়",
  [["blood in the urine", "মূত্ৰত ৰক্ত"], ["pus in the urine", "মূত্ৰত পুঁ‌জ"], ["sugar in the urine", "মূত্ৰত চেনি"], ["protein in the urine", "মূত্ৰত প্ৰ'টিন"]], 0,
  "Haem- means blood and -uria refers to urine. Pus is pyuria and protein is proteinuria.",
  "Haem- মানে ৰক্ত আৰু -uria মূত্ৰলৈ। পুঁ‌জ পাইউৰিয়া আৰু প্ৰ'টিন প্ৰ'টিনইউৰিয়া।");

add("nursing-306",
  "The prefix brady- indicates",
  "brady- উপসৰ্গই সূচায়",
  [["slow", "ধীৰ"], ["fast", "দ্ৰুত"], ["before", "আগত"], ["after", "পিছত"]], 0,
  "Bradycardia is a slow pulse below sixty. Tachy- is the fast counterpart.",
  "ব্ৰেডিকাৰ্ডিয়া ষাঠিৰ তলৰ ধীৰ নাড়ী। Tachy- দ্ৰুতৰ সমতুল্য।");

add("nursing-307",
  "The term oedema refers to",
  "ইডিমা শব্দই বুজায়",
  [["swelling due to fluid accumulation", "তৰল জমাৰ ফলত ওফন্দা"], ["loss of sensation", "অনুভূতি হেৰুওৱা"], ["difficulty in speech", "কথা কোৱাত কষ্ট"], ["increased appetite", "ভোক বঢ়া"]], 0,
  "Fluid collects in tissue spaces and shows as pitting or puffiness, common in heart and kidney disease.",
  "কলাৰ ফাঁ‌কে তৰল জমি গাঁ‌ত খোৱা বা ওফন্দা দেখা যায়, হৃদয় আৰু বৃক্ক ৰোগত সাধাৰণ।");

add("nursing-308",
  "The suffix -ectomy means",
  "-ectomy প্ৰত্যয়ই বুজায়",
  [["surgical removal", "শল্য অপসাৰণ"], ["surgical opening", "শল্য ছিদ্ৰ"], ["inflammation", "প্ৰদাহ"], ["repair", "মেৰামতি"]], 0,
  "Appendectomy is removal of the appendix, while -otomy is an opening and -plasty is repair.",
  "এপেণ্ডেক্টমি এপেণ্ডিক্স অপসাৰণ, আনহাতে -otomy ছিদ্ৰ আৰু -plasty মেৰামতি।");

add("nursing-309",
  "The term hypertension means",
  "হাইপাৰটেনছন শব্দই বুজায়",
  [["raised blood pressure", "বঢ়া ৰক্তচাপ"], ["lowered blood pressure", "কমা ৰক্তচাপ"], ["raised temperature", "বঢ়া উষ্ণতা"], ["lowered pulse", "কমা নাড়ী"]], 0,
  "Tension here refers to pressure, so hypertension is a pressure above normal. Low pressure is hypotension.",
  "ইয়াত tension মানে চাপ, সেয়ে হাইপাৰটেনছন স্বাভাৱিকৰ ওপৰৰ চাপ। কম চাপ হাইপ'টেনছন।");

add("nursing-310",
  "The medical term for a rapid heart rate is",
  "দ্ৰুত হৃদয়ৰ গতিৰ চিকিৎসা পৰিভাষা",
  [["tachycardia", "টেকিকাৰ্ডিয়া"], ["bradycardia", "ব্ৰেডিকাৰ্ডিয়া"], ["arrhythmia", "এৰিথমিয়া"], ["asystole", "এছিষ্ট'ল"]], 0,
  "Tachycardia means a rate above a hundred. Asystole means no electrical activity at all.",
  "টেকিকাৰ্ডিয়া মানে এশৰ ওপৰৰ হাৰ। এছিষ্ট'ল মানে একেবাৰে বৈদ্যুতিক ক্ৰিয়া নাই।");

add("nursing-311",
  "The prefix hyper- in medical terms means",
  "চিকিৎসা শব্দত hyper- উপসৰ্গই বুজায়",
  [["above or excessive", "ওপৰ বা অতিৰিক্ত"], ["below or deficient", "তল বা অভাৱ"], ["beside", "কাষত"], ["within", "ভিতৰত"]], 0,
  "Hyperthyroidism is an overactive thyroid and hyperventilation is over-breathing. Hypo- is the opposite.",
  "হাইপাৰথাইৰয়ডিজম অতি সক্ৰিয় থাইৰয়ড আৰু হাইপাৰভেণ্টিলেশ্যন অতি উশাহ। Hypo- ওলোটা।");

add("nursing-312",
  "The term anaemia literally means",
  "এনিমিয়া শব্দৰ আক্ষৰিক অৰ্থ",
  [["lack of blood", "ৰক্তৰ অভাৱ"], ["excess of blood", "ৰক্তৰ আধিক্য"], ["clotting of blood", "ৰক্ত জমা"], ["infection of blood", "ৰক্তৰ সংক্ৰমণ"]], 0,
  "The prefix an- means without and -aemia refers to blood, so the term points to a shortage of red cells or haemoglobin.",
  "an- মানে নোহোৱা আৰু -aemia ৰক্তলৈ, সেয়ে শব্দই লোহিত কণিকা বা হিম'গ্লবিনৰ অভাৱ বুজায়।");

add("nursing-313",
  "The term gastralgia means",
  "গেষ্ট্ৰালজিয়া শব্দই বুজায়",
  [["pain in the stomach", "পেটত বিষ"], ["inflammation of the stomach", "পেটৰ প্ৰদাহ"], ["bleeding from the stomach", "পেটৰপৰা ৰক্তক্ষৰণ"], ["ulcer of the stomach", "পেটৰ ঘা"]], 0,
  "-algia means pain, so gastralgia is stomach pain. Inflammation would be gastritis.",
  "-algia মানে বিষ, সেয়ে গেষ্ট্ৰালজিয়া পেটৰ বিষ। প্ৰদাহ হ'লে গেষ্ট্ৰাইটিছ।");

add("nursing-314",
  "The combining form nephro- refers to the",
  "nephro- সংযোগী ৰূপই কিৰ লগত সম্পৰ্কিত",
  [["kidney", "বৃক্ক"], ["liver", "যকৃত"], ["heart", "হৃদয়"], ["lung", "ফুসফুস"]], 0,
  "Nephritis is kidney inflammation and nephrectomy is kidney removal. Hepato- refers to the liver.",
  "নেফ্ৰাইটিছ বৃক্কৰ প্ৰদাহ আৰু নেফ্ৰেক্টমি বৃক্ক অপসাৰণ। Hepato- যকৃতলৈ।");

add("nursing-315",
  "The term cyanosis describes",
  "ছায়ান'ছিছ শব্দই বৰ্ণনা কৰে",
  [["bluish discolouration due to lack of oxygen", "অক্সিজেনৰ অভাৱত নীলা ৰঙ ধৰা"], ["yellow discolouration of skin", "ছালৰ হালধীয়া ৰং"], ["redness of the skin", "ছালৰ ৰঙা ৰং"], ["paleness of the skin", "ছালৰ শেঁ‌তাভাৱ"]], 0,
  "Poorly oxygenated blood gives a blue tinge to lips and nail beds. Yellow skin is jaundice.",
  "কম অক্সিজেনযুক্ত ৰক্তই ওঁ‌ঠ আৰু নখত নীলা আভা দিয়ে। হালধীয়া ছাল জণ্ডিছ।");

add("nursing-316",
  "The suffix -otomy means",
  "-otomy প্ৰত্যয়ই বুজায়",
  [["surgical incision", "শল্য কটা"], ["surgical removal", "শল্য অপসাৰণ"], ["inflammation", "প্ৰদাহ"], ["enlargement", "বৃদ্ধি"]], 0,
  "A laparotomy is an abdominal incision, whereas -ectomy removes the organ entirely.",
  "লেপাৰ'টমি পেটৰ কটা, আনহাতে -ectomy অংগ সম্পূৰ্ণ অপসাৰণ কৰে।");

add("nursing-317",
  "The term antipyretic refers to a drug that",
  "এণ্টিপাইৰেটিক শব্দই এনে ঔষধলৈ বুজায় যি",
  [["reduces fever", "জ্বৰ কমায়"], ["increases fever", "জ্বৰ বঢ়ায়"], ["relieves pain only", "কেৱল বিষ কমায়"], ["kills bacteria", "বেক্টেৰিয়া মাৰে"]], 0,
  "Anti- means against and pyretic relates to fever. Paracetamol is the common example.",
  "Anti- মানে বিৰুদ্ধে আৰু pyretic জ্বৰলৈ। পেৰাছিটামল সাধাৰণ উদাহৰণ।");

add("nursing-318",
  "The term idiopathic means",
  "ইডিঅ'পেথিক শব্দই বুজায়",
  [["of unknown cause", "অজ্ঞাত কাৰণৰ"], ["caused by infection", "সংক্ৰমণৰপৰা হোৱা"], ["inherited", "বংশগত"], ["caused by a drug", "ঔষধৰপৰা হোৱা"]], 0,
  "The disease exists but no cause has been identified, so treatment is directed at the symptoms.",
  "ৰোগ আছে কিন্তু কাৰণ চিনাক্ত হোৱা নাই, সেয়ে চিকিৎসা লক্ষণৰ ওপৰত কেন্দ্ৰিত।");

add("nursing-319",
  "The term prognosis refers to",
  "প্ৰগন'ছিছ শব্দই বুজায়",
  [["the likely outcome of a disease", "ৰোগৰ সম্ভাব্য পৰিণাম"], ["the cause of a disease", "ৰোগৰ কাৰণ"], ["the name of a disease", "ৰোগৰ নাম"], ["the test for a disease", "ৰোগৰ পৰীক্ষা"]], 0,
  "Prognosis is the forecast, while diagnosis names the condition and aetiology explains its cause.",
  "প্ৰগন'ছিছ ভৱিষ্যদ্বাণী, আনহাতে ডায়েগন'ছিছে অৱস্থাৰ নাম দিয়ে আৰু এটিঅ'লজিয়ে কাৰণ ব্যাখ্যা কৰে।");

add("nursing-320",
  "The combining form cardio- refers to the",
  "cardio- সংযোগী ৰূপই কিৰ লগত সম্পৰ্কিত",
  [["heart", "হৃদয়"], ["lung", "ফুসফুস"], ["brain", "মগজু"], ["stomach", "পেট"]], 0,
  "Cardiology is the study of the heart and cardiac arrest is cessation of heart action. Pulmo- refers to the lung.",
  "কাৰ্ডিঅ'লজি হৃদয়ৰ অধ্যয়ন আৰু কাৰ্ডিয়াক এৰেষ্ট হৃদয়ৰ ক্ৰিয়া বন্ধ। Pulmo- ফুসফুসলৈ।");

add("nursing-321",
  "The term arthralgia means",
  "আৰ্থ্ৰালজিয়া শব্দই বুজায়",
  [["pain in a joint", "গাঁ‌ঠিত বিষ"], ["inflammation of a joint", "গাঁ‌ঠিৰ প্ৰদাহ"], ["stiffness of a joint", "গাঁ‌ঠিৰ জঠৰতা"], ["dislocation of a joint", "গাঁ‌ঠি উলাই যোৱা"]], 0,
  "-algia is pain, so arthralgia is joint pain without implying inflammation. Arthritis is the inflammatory term.",
  "-algia বিষ, সেয়ে আৰ্থ্ৰালজিয়া গাঁ‌ঠিৰ বিষ, প্ৰদাহ নুবুজায়। আৰ্থ্ৰাইটিছ প্ৰদাহৰ শব্দ।");

add("nursing-322",
  "The prefix post- in postoperative means",
  "postoperative ত post- উপসৰ্গই বুজায়",
  [["after", "পিছত"], ["before", "আগত"], ["during", "সময়ত"], ["without", "নোহোৱাকৈ"]], 0,
  "Postoperative care follows surgery, while preoperative care comes before it.",
  "পষ্টঅপাৰেটিভ যতন অস্ত্ৰোপচাৰৰ পিছত, আনহাতে প্ৰিঅ'পাৰেটিভ আগত।");

add("nursing-323",
  "The term polyuria means",
  "পলিইউৰিয়া শব্দই বুজায়",
  [["excessive urine output", "অত্যধিক মূত্ৰ ওলোৱা"], ["absent urine output", "মূত্ৰ একেবাৰে নোলোৱা"], ["painful urination", "মূত্ৰ ত্যাগত বিষ"], ["blood in urine", "মূত্ৰত ৰক্ত"]], 0,
  "Poly- means much and -uria means urine, so it describes a large volume, as in diabetes. Absent urine is anuria.",
  "Poly- মানে বেছি আৰু -uria মূত্ৰ, সেয়ে বেছি পৰিমাণ বুজায়, যেনে মধুমেহত। মূত্ৰ নোলোৱা এনিউৰিয়া।");

add("nursing-324",
  "The term carcinoma refers to",
  "কাৰ্ছিন'মা শব্দই বুজায়",
  [["a malignant tumour of epithelial tissue", "উপকলা কলাৰ মাৰাত্মক অৰ্বুদ"], ["a benign growth", "নিৰীহ বৃদ্ধি"], ["an infection", "সংক্ৰমণ"], ["a fracture", "ফ্ৰেকচাৰ"]], 0,
  "Carcinoma arises from skin or lining cells and spreads, while a benign growth stays local.",
  "কাৰ্ছিন'মা ছাল বা আৱৰণৰ কোষৰপৰা হয় আৰু বিয়পে, আনহাতে নিৰীহ বৃদ্ধি স্থানীয় থাকে।");

add("nursing-325",
  "The term metastasis means",
  "মেটাছ্টেছিছ শব্দই বুজায়",
  [["spread of cancer to another site", "কৰ্কট আন ঠাইলৈ বিয়পা"], ["shrinkage of a tumour", "অৰ্বুদ সৰু হোৱা"], ["removal of a tumour", "অৰ্বুদ অপসাৰণ"], ["biopsy of a tumour", "অৰ্বুদৰ বায়'প্সি"]], 0,
  "Cancer cells travel through blood or lymph and grow elsewhere, which is why staging matters.",
  "কৰ্কট কোষ ৰক্ত বা লসিকাৰে গৈ আন ঠাইত বাঢ়ে, সেয়ে স্তৰ নিৰ্ণয় গুৰুত্বপূৰ্ণ।");

add("nursing-326",
  "The combining form dermato- refers to the",
  "dermato- সংযোগী ৰূপই কিৰ লগত সম্পৰ্কিত",
  [["skin", "ছাল"], ["bone", "হাড়"], ["nerve", "স্নায়ু"], ["muscle", "পেশী"]], 0,
  "Dermatology is the study of skin and dermatitis is skin inflammation. Osteo- refers to bone.",
  "ডাৰ্মাট'লজি ছালৰ অধ্যয়ন আৰু ডাৰ্মাটাইটিছ ছালৰ প্ৰদাহ। Osteo- হাড়লৈ।");

add("nursing-327",
  "The term dysphagia means",
  "ডিছফেজিয়া শব্দই বুজায়",
  [["difficulty in swallowing", "গিলিবলৈ কষ্ট"], ["difficulty in speaking", "ক'বলৈ কষ্ট"], ["difficulty in seeing", "চাবলৈ কষ্ট"], ["difficulty in walking", "খোজ কঢ়াত কষ্ট"]], 0,
  "Dys- is difficult and -phagia is swallowing, a danger sign after a stroke. Difficulty in speaking is dysphasia.",
  "Dys- কষ্ট আৰু -phagia গিলা, যি ষ্ট্ৰ'কৰ পিছত বিপদ চিন। কথা ক'বলৈ কষ্ট ডিছফেজিয়া।");

add("nursing-328",
  "The term atrophy means",
  "এট্ৰ'ফি শব্দই বুজায়",
  [["wasting of tissue", "কলাৰ ক্ষয়"], ["overgrowth of tissue", "কলাৰ অতিবৃদ্ধি"], ["inflammation of tissue", "কলাৰ প্ৰদাহ"], ["death of tissue", "কলাৰ মৃত্যু"]], 0,
  "Disuse or nerve loss shrinks muscle bulk. Tissue death is necrosis and overgrowth is hypertrophy.",
  "অব্যৱহাৰ বা স্নায়ু নষ্ট হ'লে পেশীৰ আয়তন কমে। কলাৰ মৃত্যু নেক্ৰ'ছিছ আৰু অতিবৃদ্ধি হাইপাৰট্ৰফি।");

add("nursing-329",
  "The term benign means",
  "বেনাইন শব্দই বুজায়",
  [["not cancerous", "কৰ্কট নহয়"], ["rapidly spreading", "দ্ৰুত বিয়পা"], ["always fatal", "সদায় মাৰাত্মক"], ["infectious", "সংক্ৰামক"]], 0,
  "A benign growth stays local and does not invade or spread, though it may still need removal.",
  "নিৰীহ বৃদ্ধি স্থানীয় থাকে আৰু নিবিয়পে বা ভেদ নকৰে, তথাপি অপসাৰণ লাগিবও পাৰে।");

add("nursing-330",
  "The term tachycardia is best described as a pulse rate",
  "টেকিকাৰ্ডিয়া আটাই ভালকৈ বৰ্ণনা কৰা হয় এনে নাড়ীৰ গতি হিচাপে যি",
  [["above 100 per minute", "প্ৰতি মিনিটত ১০০ৰ ওপৰত"], ["below 60 per minute", "প্ৰতি মিনিটত ৬০ৰ তলত"], ["exactly 72 per minute", "প্ৰতি মিনিটত ঠিক ৭২"], ["irregular only", "কেৱল অনিয়মীয়া"]], 0,
  "The prefix means fast, so any adult rate above a hundred qualifies. An irregular rhythm is arrhythmia.",
  "উপসৰ্গই দ্ৰুত বুজায়, সেয়ে এশৰ ওপৰ যিকোনো প্ৰাপ্তবয়স্ক হাৰ ইয়াৰ ভিতৰত। অনিয়মীয়া তাল এৰিথমিয়া।");

/* ================= health-programmes-assam ================= */
useLeaf("health-programmes-assam");

add("nursing-331",
  "The National Health Mission in India was formed by merging",
  "ভাৰতত ৰাষ্ট্ৰীয় স্বাস্থ্য মিছন গঠন হৈছিল কি মিলাই",
  [["NRHM and NUHM", "NRHM আৰু NUHM"], ["NACP and RNTCP", "NACP আৰু RNTCP"], ["NHM and PMJAY", "NHM আৰু PMJAY"], ["ICDS and NRHM", "ICDS আৰু NRHM"]], 0,
  "Rural and urban health missions were combined so that one framework covers both populations. Disease control programmes sit under it.",
  "গ্ৰাম্য আৰু চহৰ স্বাস্থ্য মিছন একত্ৰ কৰা হৈছিল যাতে এখন আঁচনিয়ে দুয়ো জনসংখ্যা সামৰে। ৰোগ নিয়ন্ত্ৰণ কাৰ্যসূচী ইয়াৰ অধীনত।");

add("nursing-332",
  "ASHA in the Indian health system stands for",
  "ভাৰতীয় স্বাস্থ্য ব্যৱস্থাত ASHA ৰ সম্পূৰ্ণ ৰূপ",
  [["Accredited Social Health Activist", "Accredited Social Health Activist"], ["Assistant State Health Administrator", "Assistant State Health Administrator"], ["Allied Sanitary Health Assistant", "Allied Sanitary Health Assistant"], ["Advanced School Health Adviser", "Advanced School Health Adviser"]], 0,
  "An ASHA is a trained village woman who links households to the health system, especially for maternal and child care.",
  "আশা এগৰাকী প্ৰশিক্ষিত গাঁৱৰ মহিলা যি পৰিয়ালক স্বাস্থ্য ব্যৱস্থাৰ সৈতে জোড়ে, বিশেষকৈ মাতৃ-শিশু সেৱাত।");

add("nursing-333",
  "The Janani Suraksha Yojana is aimed at",
  "জননী সুৰক্ষা যোজনাৰ লক্ষ্য",
  [["promoting institutional delivery", "প্ৰাতিষ্ঠানিক প্ৰসৱ উৎসাহিত কৰা"], ["providing free spectacles", "বিনামূলীয়া চশমা দিয়া"], ["building roads", "পথ নিৰ্মাণ কৰা"], ["supplying drinking water", "খোৱা পানী যোগান ধৰা"]], 0,
  "A cash incentive encourages mothers to deliver in a facility with skilled attendance, which lowers maternal and newborn deaths.",
  "নগদ সহায়ে মাকক দক্ষ সেৱা থকা সুবিধাত প্ৰসৱ কৰিবলৈ উৎসাহ দিয়ে, যিয়ে মাতৃ আৰু নৱজাতক মৃত্যু কমায়।");

add("nursing-334",
  "The Revised National Tuberculosis Control Programme is now known as",
  "পৰিবৰ্তিত ৰাষ্ট্ৰীয় যক্ষ্মা নিয়ন্ত্ৰণ কাৰ্যসূচীক এতিয়া কি বোলা হয়",
  [["National Tuberculosis Elimination Programme", "National Tuberculosis Elimination Programme"], ["National Malaria Programme", "National Malaria Programme"], ["National AIDS Programme", "National AIDS Programme"], ["National Leprosy Programme", "National Leprosy Programme"]], 0,
  "The renaming reflects the shift from control to elimination, with a target of ending TB in India.",
  "নাম সলনি কৰাটোৱে নিয়ন্ত্ৰণৰপৰা নিৰ্মূললৈ পৰিৱৰ্তন দেখুৱায়, ভাৰতত যক্ষ্মা শেষ কৰাৰ লক্ষ্যৰ সৈতে।");

add("nursing-335",
  "The main objective of the Pulse Polio programme is to",
  "পলিঅ' নাশ কৰা কাৰ্যসূচীৰ মূল উদ্দেশ্য",
  [["immunise every child against polio", "প্ৰতিটো শিশুক পলিঅ'ৰ বিৰুদ্ধে টিকা দিয়া"], ["treat polio paralysis", "পলিঅ'ৰ পক্ষাঘাতৰ চিকিৎসা কৰা"], ["distribute iron tablets", "লোৰ বড়ি বিতৰণ কৰা"], ["provide spectacles", "চশমা যোগান ধৰা"]], 0,
  "Repeated rounds of oral vaccine reach every child under five, which is how transmission was stopped.",
  "মুখেৰে দিয়া টিকাৰ পুনৰাবৃত্তি ৰাউণ্ডে পাঁচ বছৰৰ তলৰ প্ৰতিটো শিশুলৈ যায়, সেয়ে সংক্ৰমণ বন্ধ হ'ল।");

add("nursing-336",
  "The National Programme for Control of Blindness mainly provides",
  "দৃষ্টিহীনতা নিয়ন্ত্ৰণ ৰাষ্ট্ৰীয় কাৰ্যসূচীয়ে মূলতঃ যোগান ধৰে",
  [["cataract surgery and eye care", "ছানি অস্ত্ৰোপচাৰ আৰু চকুৰ যতন"], ["dental treatment", "দাঁতৰ চিকিৎসা"], ["hearing aids", "শ্ৰৱণ যন্ত্ৰ"], ["wheelchairs", "ৱিলচেয়াৰ"]], 0,
  "Cataract accounts for most avoidable blindness, so surgery camps and free operations form the core of the programme.",
  "ছানিয়ে বেছিভাগ প্ৰতিৰোধযোগ্য অন্ধত্বৰ কাৰণ, সেয়ে শল্য শিবিৰ আৰু বিনামূলীয়া অপাৰেচন কাৰ্যসূচীৰ মূল।");

add("nursing-337",
  "Mission Indradhanush is concerned with",
  "মিছন ইন্দ্ৰধনুষ কিৰ লগত সম্পৰ্কিত",
  [["full immunisation coverage", "সম্পূৰ্ণ টিকাকৰণ সামৰণি"], ["maternal nutrition only", "কেৱল মাতৃ পুষ্টি"], ["road safety", "পথ সুৰক্ষা"], ["water purification", "পানী শোধন"]], 0,
  "It targets districts and children who missed routine vaccines, aiming for full coverage with all antigens.",
  "ই সেই জিলা আৰু শিশুক লক্ষ্য কৰে যিয়ে নিয়মীয়া টিকা হেৰুৱাইছে, সকলো টিকাৰে সম্পূৰ্ণ সামৰণিৰ লক্ষ্যৰে।");

add("nursing-338",
  "The Ayushman Bharat scheme provides",
  "আয়ুষ্মান ভাৰত আঁচনিয়ে যোগান ধৰে",
  [["health insurance cover for poor families", "দৰিদ্ৰ পৰিয়ালৰ বাবে স্বাস্থ্য বীমা সুৰক্ষা"], ["free education", "বিনামূলীয়া শিক্ষা"], ["crop insurance", "শস্য বীমা"], ["old age pension", "বৃদ্ধ বয়স পেঞ্চন"]], 0,
  "Eligible households get cashless secondary and tertiary care up to a fixed sum each year at empanelled hospitals.",
  "যোগ্য পৰিয়ালে তালিকাভুক্ত চিকিৎসালয়ত বছৰি নিৰ্দিষ্ট পৰিমাণলৈ নগদবিহীন দ্বিতীয় আৰু তৃতীয় স্তৰৰ চিকিৎসা পায়।");

add("nursing-339",
  "The main function of a Primary Health Centre is to",
  "প্ৰাথমিক স্বাস্থ্য কেন্দ্ৰৰ মূল কাম",
  [["provide basic curative and preventive services", "মৌলিক চিকিৎসা আৰু প্ৰতিৰোধ সেৱা দিয়া"], ["perform open heart surgery", "মুকলি হৃদয় অস্ত্ৰোপচাৰ কৰা"], ["run a medical college", "চিকিৎসা মহাবিদ্যালয় চলোৱা"], ["manufacture drugs", "ঔষধ উৎপাদন কৰা"]], 0,
  "A PHC covers a block with outpatient care, maternal services, immunisation and referral. Surgery and teaching need higher facilities.",
  "এখন PHC এ খণ্ড এটাৰ বাহ্যিক ৰোগী সেৱা, মাতৃ সেৱা, টিকাকৰণ আৰু প্ৰেৰণ সামৰে। অস্ত্ৰোপচাৰ আৰু শিক্ষালৈ ওপৰৰ সুবিধা লাগে।");

add("nursing-340",
  "The National AIDS Control Programme focuses on",
  "ৰাষ্ট্ৰীয় এইডছ নিয়ন্ত্ৰণ কাৰ্যসূচীয়ে গুৰুত্ব দিয়ে",
  [["prevention, testing and treatment of HIV", "HIV ৰ প্ৰতিৰোধ, পৰীক্ষা আৰু চিকিৎসা"], ["cancer screening", "কৰ্কট স্ক্ৰীণিং"], ["dental camps", "দাঁতৰ শিবিৰ"], ["eye donation", "চকু দান"]], 0,
  "The programme runs awareness, free testing and antiretroviral therapy, and prevents mother-to-child transmission.",
  "কাৰ্যসূচীয়ে সজাগতা, বিনামূলীয়া পৰীক্ষা আৰু এণ্টিৰিট্ৰ'ভাইৰেল চিকিৎসা চলায় আৰু মাকৰপৰা শিশুলৈ সংক্ৰমণ ৰোধ কৰে।");

add("nursing-341",
  "The main aim of the National Leprosy Eradication Programme is to",
  "ৰাষ্ট্ৰীয় কুষ্ঠ ৰোগ নিৰ্মূল কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["detect and treat leprosy early and prevent deformity", "কুষ্ঠ ৰোগ সোনকালে ধৰি চিকিৎসা কৰি বিকৃতি ৰোধ কৰা"], ["build leprosy hospitals only", "কেৱল কুষ্ঠ চিকিৎসালয় সজা"], ["ban physiotherapy", "ফিজিঅ'থেৰাপী নিষেধ কৰা"], ["stop all medication", "সকলো ঔষধ বন্ধ কৰা"]], 0,
  "Multi-drug therapy cures the infection and stops transmission, and early detection prevents disability.",
  "বহু-ঔষধ চিকিৎসাই সংক্ৰমণ আৰোগ্য কৰি বিয়পা ৰোধ কৰে, আৰু সোনকালে ধৰিলে অক্ষমতা ৰোধ হয়।");

add("nursing-342",
  "In Assam, the health system is administered mainly through",
  "অসমত স্বাস্থ্য ব্যৱস্থা মূলতঃ কিৰে পৰিচালিত হয়",
  [["the Directorate of Health Services", "স্বাস্থ্য সেৱা সঞ্চালকালয়"], ["the Public Works Department", "গুৰুত্বপূৰ্ণ নিৰ্মাণ বিভাগ"], ["the Education Board", "শিক্ষা পৰিষদ"], ["the Transport Department", "পৰিবহন বিভাগ"]], 0,
  "The Directorate runs hospitals, PHCs and sub-centres, while the Directorate of Medical Education runs the teaching institutions.",
  "সঞ্চালকালয়ে চিকিৎসালয়, PHC আৰু উপ-কেন্দ্ৰ চলায়, আনহাতে চিকিৎসা শিক্ষা সঞ্চালকালয়ে শিক্ষানুষ্ঠান চলায়।");

add("nursing-343",
  "The National Rural Health Mission was launched mainly to",
  "ৰাষ্ট্ৰীয় গ্ৰাম্য স্বাস্থ্য মিছন মূলতঃ কিৰ বাবে আৰম্ভ কৰা হৈছিল",
  [["strengthen rural health infrastructure and services", "গ্ৰাম্য স্বাস্থ্য আন্তঃগাঁথনি আৰু সেৱা সবল কৰা"], ["build airports", "বিমানবন্দৰ সজা"], ["increase taxes", "কৰ বঢ়োৱা"], ["promote tourism", "পৰ্যটন উৎসাহিত কৰা"]], 0,
  "It funded sub-centres, PHCs, ASHAs and mobile units so that rural families could get care close to home.",
  "ই উপ-কেন্দ্ৰ, PHC, আশা আৰু ম'বাইল ইউনিটত ধন দিছিল যাতে গ্ৰাম্য পৰিয়ালে ঘৰৰ ওচৰত সেৱা পায়।");

add("nursing-344",
  "The Janani Shishu Suraksha Karyakram provides",
  "জননী শিশু সুৰক্ষা কাৰ্যসূচীয়ে যোগান ধৰে",
  [["free delivery and newborn care in public facilities", "চৰকাৰী সুবিধাত বিনামূলীয়া প্ৰসৱ আৰু নৱজাতক সেৱা"], ["free bicycles", "বিনামূলীয়া চাইকেল"], ["free laptops", "বিনামূলীয়া লেপটপ"], ["free seeds", "বিনামূলীয়া বীজ"]], 0,
  "The scheme removes charges for delivery, drugs, diagnostics, diet and transport, so cost never stops a mother reaching care.",
  "আঁচনিয়ে প্ৰসৱ, ঔষধ, পৰীক্ষা, আহাৰ আৰু পৰিবহনৰ মাচুল আঁতৰায়, সেয়ে খৰচে মাকক চিকিৎসালৈ যোৱাৰপৰা ৰোধ নকৰে।");

add("nursing-345",
  "The main purpose of the Integrated Child Development Services scheme is to",
  "সমন্বিত শিশু উন্নয়ন সেৱাৰ মূল উদ্দেশ্য",
  [["improve nutrition and health of children and mothers", "শিশু আৰু মাকৰ পুষ্টি আৰু স্বাস্থ্য উন্নত কৰা"], ["build highways", "মহাপথ নিৰ্মাণ কৰা"], ["train engineers", "ইঞ্জিনিয়াৰ প্ৰশিক্ষণ দিয়া"], ["supply electricity", "বিদ্যুৎ যোগান ধৰা"]], 0,
  "Anganwadi centres provide supplementary nutrition, immunisation and preschool learning, which shapes long term health.",
  "অংগনৱাড়ী কেন্দ্ৰই পৰিপূৰক পুষ্টি, টিকাকৰণ আৰু প্ৰাক-বিদ্যালয় শিক্ষা দিয়ে, যিয়ে দীৰ্ঘম্যাদী স্বাস্থ্য গঢ়ে।");

add("nursing-346",
  "The RNTCP had adopted directly observed treatment because",
  "RNTCP য়ে প্ৰত্যক্ষ পৰ্যবেক্ষিত চিকিৎসা গ্ৰহণ কৰিছিল কাৰণ",
  [["it improves adherence and prevents drug resistance", "ই ঔষধ গ্ৰহণ উন্নত কৰি ঔষধ প্ৰতিৰোধ ৰোধ কৰে"], ["it reduces the number of patients", "ই ৰোগীৰ সংখ্যা কমায়"], ["it avoids diagnosis", "ই ৰোগ নিৰ্ণয় এৰায়"], ["it is cheaper than no treatment", "কোনো চিকিৎসাতকৈ সস্তা"]], 0,
  "A health worker or trained volunteer watches the patient swallow the dose, so the course is completed and resistance does not develop.",
  "স্বাস্থ্য কৰ্মী বা প্ৰশিক্ষিত স্বয়ংসেৱকে ৰোগীয়ে ঔষধ গিলা চাই, সেয়ে কোৰ্ছ সম্পূৰ্ণ হয় আৰু প্ৰতিৰোধ না জন্মে।");

add("nursing-347",
  "The National Vector Borne Disease Control Programme covers",
  "ৰাষ্ট্ৰীয় ভেক্টৰবাহিত ৰোগ নিয়ন্ত্ৰণ কাৰ্যসূচীয়ে সামৰে",
  [["malaria, dengue, chikungunya and Japanese encephalitis", "মেলেৰিয়া, ডেংগু, চিকুনগুনিয়া আৰু জাপানী এনকেফেলাইটিছ"], ["tuberculosis only", "কেৱল যক্ষ্মা"], ["cancer only", "কেৱল কৰ্কট"], ["blindness only", "কেৱল দৃষ্টিহীনতা"]], 0,
  "These diseases share mosquito or fly vectors, so the programme works on vector control, surveillance and treatment together.",
  "এই ৰোগবোৰে মশা বা মাখিৰ বাহক ভাগ কৰে, সেয়ে কাৰ্যসূচীয়ে বাহক নিয়ন্ত্ৰণ, নজৰদাৰী আৰু চিকিৎসা একেলগে কৰে।");

add("nursing-348",
  "The main role of an ANM at a sub-centre is to",
  "উপ-কেন্দ্ৰত এএনএমৰ মূল ভূমিকা",
  [["provide maternal and child health services and referrals", "মাতৃ-শিশু স্বাস্থ্য সেৱা আৰু প্ৰেৰণ দিয়া"], ["conduct major surgery", "ডাঙৰ অস্ত্ৰোপচাৰ কৰা"], ["manage district accounts", "জিলাৰ হিচাপ চলোৱা"], ["run the pharmacy only", "কেৱল ফাৰ্মাচী চলোৱা"]], 0,
  "The auxiliary nurse midwife delivers antenatal care, conducts normal deliveries, immunises and refers complications.",
  "সহায়ক নাৰ্ছ মিডৱাইফে প্ৰসৱপূৰ্ব সেৱা, স্বাভাৱিক প্ৰসৱ, টিকাকৰণ কৰে আৰু জটিলতা প্ৰেৰণ কৰে।");

add("nursing-349",
  "The Rogi Kalyan Samiti in a government hospital is responsible for",
  "চৰকাৰী চিকিৎসালয়ৰ ৰোগী কল্যাণ সমিতিৰ দায়িত্ব",
  [["local management and patient welfare", "স্থানীয় পৰিচালনা আৰু ৰোগী কল্যাণ"], ["collecting income tax", "আয় কৰ সংগ্ৰহ"], ["running schools", "বিদ্যালয় চলোৱা"], ["issuing passports", "পাছপ'ৰ্ট প্ৰদান"]], 0,
  "The committee of staff and local representatives oversees cleanliness, services and small improvements at the facility.",
  "কৰ্মচাৰী আৰু স্থানীয় প্ৰতিনিধিৰ সমিতিয়ে পৰিষ্কাৰতা, সেৱা আৰু সৰু উন্নয়ন তদাৰক কৰে।");

add("nursing-350",
  "The main objective of the National Mental Health Programme is to",
  "ৰাষ্ট্ৰীয় মানসিক স্বাস্থ্য কাৰ্যসূচীৰ মূল উদ্দেশ্য",
  [["make mental health care available at primary level", "প্ৰাথমিক স্তৰত মানসিক স্বাস্থ্য সেৱা উপলব্ধ কৰা"], ["build large asylums", "ডাঙৰ আশ্ৰয় গৃহ সজা"], ["ban counselling", "পৰামৰ্শ নিষেধ কৰা"], ["treat only in cities", "কেৱল চহৰত চিকিৎসা কৰা"]], 0,
  "Integrating mental health into primary care lets people get help without travelling far or facing stigma.",
  "মানসিক স্বাস্থ্য প্ৰাথমিক সেৱাত অন্তৰ্ভুক্ত কৰিলে মানুহে দূৰ যোৱা বা লাজৰ সন্মুখীন নোহোৱাকৈ সহায় পায়।");

add("nursing-351",
  "The eSanjeevani platform in India provides",
  "ভাৰতত eSanjeevani মঞ্চই যোগান ধৰে",
  [["teleconsultation with doctors", "চিকিৎসকৰ সৈতে দূৰ-পৰামৰ্শ"], ["free medicines by post", "ডাকেৰে বিনামূলীয়া ঔষধ"], ["ambulance tracking only", "কেৱল এম্বুলেন্স অনুসৰণ"], ["blood bank management", "ৰক্ত ভাণ্ডাৰ পৰিচালনা"]], 0,
  "Patients speak to a doctor by video from a health centre or phone, which saves travel for simple problems.",
  "ৰোগীয়ে স্বাস্থ্য কেন্দ্ৰ বা ফোনৰপৰা ভিডিঅ'ৰে চিকিৎসকৰ সৈতে কথা পায়, সেয়ে সাধাৰণ সমস্যাত যাত্ৰা সাঁ‌চে।");

add("nursing-352",
  "The primary aim of the National Programme for Health Care of the Elderly is to",
  "বয়সীয়াল লোকৰ স্বাস্থ্য সেৱাৰ ৰাষ্ট্ৰীয় কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["provide accessible geriatric care", "সুলভ জ্যেষ্ঠ চিকিৎসা সেৱা দিয়া"], ["provide maternity care", "মাতৃ সেৱা দিয়া"], ["run sports camps", "ক্ৰীড়া শিবিৰ চলোৱা"], ["build metro rail", "মেট্ৰ' ৰে'ল সজা"]], 0,
  "Dedicated clinics and home care address the chronic, multiple problems older people face.",
  "নিৰ্দিষ্ট চিকিৎসালয় আৰু ঘৰুৱা সেৱাই বয়সীয়াল লোকে সন্মুখীন হোৱা দীৰ্ঘস্থায়ী, বহুবিধ সমস্যা সমাধান কৰে।");

add("nursing-353",
  "The Rashtriya Bal Swasthya Karyakram is aimed at",
  "ৰাষ্ট্ৰীয় বাল স্বাস্থ্য কাৰ্যসূচীৰ লক্ষ্য",
  [["screening and treatment of children for defects and deficiencies", "শিশুৰ ত্ৰুটি আৰু অভাৱৰ স্ক্ৰীণিং আৰু চিকিৎসা"], ["adult cardiac surgery", "প্ৰাপ্তবয়স্ক হৃদয় অস্ত্ৰোপচাৰ"], ["cattle health", "গৰুৰ স্বাস্থ্য"], ["road repair", "পথ মেৰামতি"]], 0,
  "Children are screened for the four Ds — defects at birth, deficiencies, diseases and developmental delay — and referred for care.",
  "শিশুক চাৰিটা D — জন্মগত ত্ৰুটি, অভাৱ, ৰোগ আৰু বিকাশ বিলম্ব — ৰ বাবে স্ক্ৰীণ কৰি চিকিৎসালৈ প্ৰেৰণ কৰা হয়।");

add("nursing-354",
  "The main function of a District Early Intervention Centre is to",
  "জিলা আগতীয়া হস্তক্ষেপ কেন্দ্ৰৰ মূল কাম",
  [["assess and manage children with developmental delay", "বিকাশ বিলম্ব থকা শিশুৰ মূল্যাংকন আৰু চিকিৎসা কৰা"], ["conduct elections", "নিৰ্বাচন চলোৱা"], ["supply food grains", "খাদ্যশস্য যোগান ধৰা"], ["maintain roads", "পথ ৰক্ষণাবেক্ষণ কৰা"]], 0,
  "The centre brings paediatrics, physiotherapy and speech therapy together so a child gets help before school age.",
  "কেন্দ্ৰই শিশু চিকিৎসা, ফিজিঅ'থেৰাপী আৰু বাক্ থেৰাপী একত্ৰ কৰে যাতে শিশুৱে বিদ্যালয় বয়সৰ আগতে সহায় পায়।");

add("nursing-355",
  "Under the National Health Mission, the Rogi Sahayata Kendra provides",
  "ৰাষ্ট্ৰীয় স্বাস্থ্য মিছনৰ অধীনত ৰোগী সহায়তা কেন্দ্ৰই যোগান ধৰে",
  [["guidance and help desks for patients in hospitals", "চিকিৎসালয়ত ৰোগীৰ বাবে পথনিৰ্দেশ আৰু সহায় ডেস্ক"], ["free housing", "বিনামূলীয়া ঘৰ"], ["crop loans", "শস্য ঋণ"], ["bus passes", "বাছ পাছ"]], 0,
  "A help desk directs patients to the right department, which reduces confusion in crowded government hospitals.",
  "সহায় ডেস্কই ৰোগীক শুদ্ধ বিভাগলৈ পঠিয়ায়, যিয়ে ভিৰ থকা চৰকাৰী চিকিৎসালয়ত বিভ্ৰান্তি কমায়।");

add("nursing-356",
  "The main goal of the National Tobacco Control Programme is to",
  "ৰাষ্ট্ৰীয় তামাখু নিয়ন্ত্ৰণ কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["reduce tobacco use and its health effects", "তামাখু ব্যৱহাৰ আৰু তাৰ স্বাস্থ্য প্ৰভাৱ কমোৱা"], ["increase tobacco sales", "তামাখু বিক্ৰী বঢ়োৱা"], ["subsidise cigarettes", "চিগাৰেটত ৰেহাই দিয়া"], ["promote smoking areas", "ধূমপান এলেকা উৎসাহিত কৰা"]], 0,
  "Awareness, cessation clinics and enforcement of advertising bans cut the cancers and heart disease tobacco causes.",
  "সজাগতা, ধূমপান ত্যাগ ক্লিনিক আৰু বিজ্ঞাপন নিষেধাজ্ঞা বলবৎ কৰিলে তামাখুৱে কৰা কৰ্কট আৰু হৃদৰোগ কমে।");

add("nursing-357",
  "The National Viral Hepatitis Control Programme mainly provides",
  "ৰাষ্ট্ৰীয় ভাইৰেল হেপাটাইটিছ নিয়ন্ত্ৰণ কাৰ্যসূচীয়ে মূলতঃ যোগান ধৰে",
  [["free testing and treatment for hepatitis B and C", "হেপাটাইটিছ B আৰু C ৰ বিনামূলীয়া পৰীক্ষা আৰু চিকিৎসা"], ["dental implants", "দাঁতৰ ইম্প্লাণ্ট"], ["eye lenses", "চকুৰ লেন্ছ"], ["hearing tests only", "কেৱল শ্ৰৱণ পৰীক্ষা"]], 0,
  "Screening, vaccination for B and free antiviral treatment for C prevent cirrhosis and liver cancer.",
  "স্ক্ৰীণিং, B ৰ টিকা আৰু C ৰ বিনামূলীয়া এণ্টিভাইৰেল চিকিৎসাই চিৰ'ছিছ আৰু যকৃত কৰ্কট ৰোধ কৰে।");

add("nursing-358",
  "The main purpose of the Health and Wellness Centre under Ayushman Bharat is to",
  "আয়ুষ্মান ভাৰতৰ স্বাস্থ্য আৰু সুস্থতা কেন্দ্ৰৰ মূল উদ্দেশ্য",
  [["deliver comprehensive primary care close to home", "ঘৰৰ ওচৰত ব্যাপক প্ৰাথমিক চিকিৎসা দিয়া"], ["perform transplant surgery", "প্ৰতিস্থাপন অস্ত্ৰোপচাৰ কৰা"], ["train pilots", "পাইলট প্ৰশিক্ষণ দিয়া"], ["build dams", "বান্ধ সজা"]], 0,
  "The centre upgrades the sub-centre to offer screening for hypertension, diabetes and cancers along with basic treatment.",
  "কেন্দ্ৰই উপ-কেন্দ্ৰক উন্নীত কৰি উচ্চ ৰক্তচাপ, মধুমেহ আৰু কৰ্কটৰ স্ক্ৰীণিং লগতে মৌলিক চিকিৎসা আগবঢ়ায়।");

add("nursing-359",
  "The 108 ambulance service in Assam is used mainly for",
  "অসমত ১০৮ এম্বুলেন্স সেৱা মূলতঃ কিৰ বাবে ব্যৱহৃত হয়",
  [["emergency transport of patients", "ৰোগীৰ জৰুৰী পৰিবহন"], ["school bus service", "বিদ্যালয় বাছ সেৱা"], ["goods transport", "মালবাহী পৰিবহন"], ["tourism", "পৰ্যটন"]], 0,
  "A toll free call brings a equipped ambulance, which shortens the time to reach a facility in an emergency.",
  "মাচুলমুক্ত ফোনে সজুলিযুক্ত এম্বুলেন্স পঠিয়ায়, যিয়ে জৰুৰী অৱস্থাত সুবিধা পোৱাৰ সময় কমায়।");

add("nursing-360",
  "The main aim of the National Iodine Deficiency Disorders Control Programme is to",
  "ৰাষ্ট্ৰীয় আয়'ডিন অভাৱজনিত ৰোগ নিয়ন্ত্ৰণ কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["ensure iodised salt consumption", "আয়'ডিনযুক্ত লৱণ ব্যৱহাৰ নিশ্চিত কৰা"], ["ban salt", "লৱণ নিষেধ কৰা"], ["export salt", "লৱণ ৰপ্তানি কৰা"], ["reduce water intake", "পানী খোৱা কমোৱা"]], 0,
  "Iodine lack causes goitre and harms brain development, so monitoring salt iodisation prevents both.",
  "আয়'ডিনৰ অভাৱে গলগণ্ড কৰে আৰু মগজুৰ বিকাশ নষ্ট কৰে, সেয়ে লৱণত আয়'ডিনৰ নজৰদাৰীয়ে দুয়োটা ৰোধ কৰে।");

module.exports = { questions: Q };
