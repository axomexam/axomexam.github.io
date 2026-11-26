#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.nursing-extra.js

   Twenty more Nursing & Paramedical items for each of the twelve
   leaves, taking every leaf from thirty to fifty. The stems are
   written as ward situations rather than recall cues, so they read
   differently from the base bank: a patient, a reading or a
   complication is described and the option set differs by mechanism.

   Same shape as the rest of the book: bilingual stem, four
   bilingual options, bilingual explanation naming why the other
   three fail. Assamese numerals (০-৯) inside Assamese text.
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

/* ================= fundamentals-nursing ================= */
useLeaf("fundamentals-nursing");

add("nursing-361",
  "A patient admitted with vomiting and loose stools for two days has dry mucosa, a sunken eyeball and a urine output of 15 ml per hour. The nurse's first priority is to",
  "দুদিন ধৰি বমি আৰু পাতল শৌচ হোৱা ৰোগীৰ শ্লেষ্মা শুকান, চকুৰ গুটি ভিতৰলৈ সোমোৱা আৰু ঘণ্টাত প্ৰস্ৰাৱ ১৫ মিলিলিট্ৰ। নাৰ্ছৰ প্ৰথম অগ্ৰাধিকাৰ",
  [["restore circulating volume with intravenous fluid", "অন্তঃশিৰা তৰল দি ৰক্তপৰিমাণ ঘূৰাই অনা"],
   ["record a detailed dietary history", "বিস্তৃত আহাৰৰ ইতিহাস লিখা"],
   ["start an antibiotic by mouth", "মুখে এণ্টিবায়'টিক আৰম্ভ কৰা"],
   ["wait for the next routine ward round", "পৰৱৰ্তী নিয়মীয়া ৱাৰ্ড ৰাউণ্ডলৈ অপেক্ষা কৰা"]], 0,
  "These are the signs of severe dehydration with reduced renal perfusion, so fluid replacement comes before any history taking. An oral antibiotic is useless while the gut is not absorbing, and waiting allows hypovolaemic shock to develop.",
  "এইবোৰ গুৰুতৰ পানীশূন্যতা আৰু বৃক্কৰ ৰক্তস্ৰাৱ কমাৰ চিন, সেয়ে ইতিহাস লোৱাৰ আগতে তৰল পূৰণ কৰিব লাগে। অন্ত্ৰই শোষণ নকৰা অৱস্থাত মুখে এণ্টিবায়'টিক অকৰ্মণীয়, আৰু অপেক্ষা কৰিলে ৰক্তপৰিমাণজনিত শ্বক হয়।");

add("nursing-362",
  "While measuring blood pressure the nurse notices the cuff is wrapped over a thick woollen sleeve. The reading is likely to be",
  "ৰক্তচাপ জোখোতে নাৰ্ছে দেখে কাফটো ডাঠ উলৰ হাতাৰ ওপৰত মেৰিওৱা হৈছে। পঢ়াটো সম্ভৱতঃ",
  [["falsely high", "মিছাকৈ বেছি"],
   ["falsely low", "মিছাকৈ কম"],
   ["unaffected because the cuff self-calibrates", "প্ৰভাৱ নপৰে কাৰণ কাফে নিজে সমন্বয় কৰে"],
   ["impossible to record at all", "একেবাৰে জোখা নহ'ব"]], 0,
  "Clothing adds bulk between the cuff and the artery, so more pressure is needed to occlude the vessel and both systolic and diastolic values read higher than they are. The cuff has no self-calibration, and a reading is still obtained, only a wrong one.",
  "কাপোৰে কাফ আৰু ধমনীৰ মাজত ডাঠ স্তৰ যোগ কৰে, সেয়ে ধমনী বন্ধ কৰিবলৈ বেছি চাপ লাগে আৰু দুয়োটা মান বেছি দেখুৱায়। কাফত নিজে সমন্বয়ৰ ব্যৱস্থা নাই, আৰু পঢ়া এটা ওলায়, মাত্ৰ ভুলটো।");

add("nursing-363",
  "A patient on a fluid balance chart has taken 1,800 ml by mouth, 500 ml of intravenous fluid and 200 ml of ice chips, and has passed 1,200 ml of urine. Ice chips are counted as",
  "তৰল ভাৰসাম্য চাৰ্টত ৰোগীয়ে মুখে ১,৮০০ মিলি, অন্তঃশিৰাত ৫০০ মিলি আৰু ২০০ মিলি বৰফৰ টুকুৰা লৈছে, প্ৰস্ৰাৱ ১,২০০ মিলি। বৰফৰ টুকুৰা গণনা কৰা হয়",
  [["half their volume, so 100 ml", "আধা পৰিমাণ, অৰ্থাৎ ১০০ মিলি"],
   ["their full volume, so 200 ml", "সম্পূৰ্ণ পৰিমাণ, অৰ্থাৎ ২০০ মিলি"],
   ["not at all, because ice is solid", "একেবাৰে নহয়, কাৰণ বৰফ গোটা"],
   ["double, because it melts to a larger volume", "দুগুণ, কাৰণ গলি বেছি আয়তন হয়"]], 0,
  "Ice chips are recorded at half their measured volume because air trapped between the chips fills the rest of the cup and that air becomes nothing when the ice melts. Full volume overstates intake; ignoring ice understates it.",
  "বৰফৰ টুকুৰা জোখা আয়তনৰ আধা হিচাপে লিখা হয় কাৰণ টুকুৰাৰ মাজৰ বায়ুৱে কাপৰ বাকী অংশ পূৰায় আৰু বৰফ গলিলে সেই বায়ু একো নহয়। সম্পূৰ্ণ আয়তনে গ্ৰহণ বঢ়াই দেখুৱায়; একেবাৰে নগণিলে কমাই দেখুৱায়।");

add("nursing-364",
  "A patient is to receive 500 ml of fluid over four hours through a set that delivers 20 drops per millilitre. The drip rate per minute is about",
  "চাৰি ঘণ্টাত ৫০০ মিলি তৰল দিব লাগে, চেটে প্ৰতি মিলিলিট্ৰত ২০ টোপাল দিয়ে। প্ৰতি মিনিটত টোপালৰ হাৰ প্ৰায়",
  [["42", "৪২"], ["21", "২১"], ["63", "৬৩"], ["84", "৮৪"]], 0,
  "Five hundred millilitres times twenty drops is ten thousand drops, and four hours is 240 minutes, so ten thousand divided by 240 gives about 42 a minute. Twenty-one would be half the required volume and 84 double.",
  "পাঁচশ মিলিলিট্ৰ গুণ ২০ টোপাল = দহ হাজাৰ টোপাল, আৰু চাৰি ঘণ্টা = ২৪০ মিনিট, সেয়ে দহ হাজাৰ ÷ ২৪০ ≈ ৪২। একৈশ হ'লে আধা পৰিমাণ আৰু ৮৪ হ'লে দুগুণ হ'লহেঁতেন।");

add("nursing-365",
  "An unconscious patient has no gag reflex and is breathing noisily. The nurse should",
  "অচেতন ৰোগীৰ গেগ ৰিফ্লেক্স নাই আৰু শব্দ কৰি উশাহ লৈছে। নাৰ্ছে কৰা উচিত",
  [["turn the patient to the lateral position and suction the airway", "ৰোগীক কাষলৈ ঘূৰাই শ্বাসপথ চাফা কৰা"],
   ["give oral fluids to loosen the secretions", "শ্লেষ্মা ঢিলা কৰিবলৈ মুখে তৰল দিয়া"],
   ["insert an oral airway without suction", "চাফা নকৰাকৈ মুখৰ এয়াৰৱে' দিয়া"],
   ["raise the head of the bed and wait", "শয্যাৰ মূৰ দাঙি অপেক্ষা কৰা"]], 0,
  "Without a gag reflex the airway is unprotected, so the lateral position lets secretions drain out by gravity and suction clears what remains. Oral fluid would be aspirated, and an airway without suction pushes secretions deeper.",
  "গেগ ৰিফ্লেক্স নথকা অৱস্থাত শ্বাসপথ অসুৰক্ষিত, সেয়ে কাষলৈ ঘূৰালে মহাকৰ্ষণে শ্লেষ্মা বাহিৰ কৰে আৰু চাকশ্বনে বাকীখিনি আঁতৰায়। মুখে তৰল দিলে শ্বাসনলীত সোমাব, আৰু চাফা নকৰাকৈ এয়াৰৱে' দিলে শ্লেষ্মা তললৈ ঠেলি পঠিয়ায়।");

add("nursing-366",
  "A patient's temperature is recorded as 39.4 degrees Celsius. The nurse should first",
  "ৰোগীৰ উষ্ণতা ৩৯.৪ ডিগ্ৰী চেলছিয়াছ। নাৰ্ছে প্ৰথমে কৰা উচিত",
  [["remove excess clothing and apply tepid sponging", "অতিৰিক্ত কাপোৰ খুলি কুহুমীয়া পানীৰে মোচন কৰা"],
   ["cover the patient with extra blankets", "ৰোগীক অতিৰিক্ত কম্বলেৰে ঢাকা"],
   ["give a hot drink and close the windows", "গৰম পানীয় দি খিৰিকী বন্ধ কৰা"],
   ["record the value again after two hours", "দুই ঘণ্টাৰ পিছত পুনৰ লিখা"]], 0,
  "The aim in hyperpyrexia is to increase heat loss, and tepid sponging plus light clothing does that through evaporation and conduction. Blankets and hot drinks retain heat, and delaying two hours risks febrile convulsion.",
  "অতি জ্বৰত লক্ষ্য হ'ল তাপ হেৰুওৱা বঢ়োৱা, আৰু কুহুমীয়া মোচন তথা পাতল কাপোৰে বাষ্পীভৱন আৰু পৰিবহণৰ জৰিয়তে তাক কৰে। কম্বল আৰু গৰম পানীয়ে তাপ ৰাখে, আৰু দুই ঘণ্টা পলম কৰিলে জ্বৰজনিত খিঁচুনিৰ বিপদ।");

add("nursing-367",
  "A patient refuses a prescribed injection and says he does not understand why it is needed. The correct nursing action is to",
  "ৰোগীয়ে নিৰ্ধাৰিত ইনজেকচন নিবিচাৰি কয় যে তেওঁ কিয় লাগে নুবুজে। শুদ্ধ নাৰ্ছিং কাৰ্য",
  [["explain the purpose and inform the doctor of the refusal", "উদ্দেশ্য বুজাই ডাক্তৰক অমান্তিৰ কথা জনোৱা"],
   ["give the injection anyway because it was prescribed", "নিৰ্ধাৰিত বাবে যিকোনো প্ৰকাৰে ইনজেকচন দিয়া"],
   ["record the refusal and take no further action", "অমান্তি লিখি আৰু একো নকৰা"],
   ["ask another nurse to give it without discussion", "আলোচনা নকৰাকৈ আন নাৰ্ছক দিবলৈ কোৱা"]], 0,
  "A competent adult may refuse treatment, and the nurse's duty is to make sure the refusal is informed before documenting it and telling the prescriber. Giving it anyway is battery, and silent documentation leaves the patient without the treatment they may have accepted.",
  "সক্ষম প্ৰাপ্তবয়স্কই চিকিৎসা নিবিচাৰিব পাৰে, আৰু নাৰ্ছৰ কৰ্তব্য হ'ল অমান্তি জাননীসহ অৱগত বুলি নিশ্চিত কৰি লিখা আৰু প্ৰেছক্ৰাইবাৰক জনোৱা। জোৰকৈ দিয়া আইনবিৰুদ্ধ, আৰু মনে মনে লিখি থ'লে ৰোগীয়ে গ্ৰহণ কৰিব পৰা চিকিৎসাৰপৰা বঞ্চিত হয়।");

add("nursing-368",
  "The nurse notices that a patient's recorded urine output has fallen from 60 ml to 20 ml per hour over six hours. The most useful immediate action is to",
  "নাৰ্ছে দেখে ছয় ঘণ্টাত ৰোগীৰ প্ৰস্ৰাৱ ঘণ্টাত ৬০ মিলিৰপৰা ২০ মিলিলৈ নামিছে। আটাই উপযোগী তৎক্ষণাৎ কাৰ্য",
  [["assess hydration, blood pressure and the patency of the catheter", "পানীৰ অৱস্থা, ৰক্তচাপ আৰু কেথেটৰৰ পেটেন্সি পৰীক্ষা কৰা"],
   ["restrict all fluids until the next shift", "পৰৱৰ্তী শ্বিফ্টলৈকে সকলো তৰল বন্ধ ৰখা"],
   ["give a diuretic to flush the kidneys", "বৃক্ক ধুই দিবলৈ মূত্ৰকাৰী দিয়া"],
   ["wait because output varies through the day", "অপেক্ষা কৰা কাৰণ দিনটোত প্ৰস্ৰাৱ সলনি হয়"]], 0,
  "Falling output can mean dehydration, hypotension or a blocked catheter, and only assessment tells them apart. A diuretic on a kidney that is already under-perfused worsens injury, and restricting fluid deepens the cause.",
  "প্ৰস্ৰাৱ কমিলে পানীশূন্যতা, নিম্ন ৰক্তচাপ বা বন্ধ কেথেটৰ হ'ব পাৰে, আৰু পৰীক্ষাইহে পাৰ্থক্য দেখুৱায়। ইতিমধ্যে কম ৰক্তস্ৰাৱ থকা বৃক্কত মূত্ৰকাৰীয়ে ক্ষতি বঢ়ায়, আৰু তৰল বন্ধ কৰিলে কাৰণ গভীৰ হয়।");

add("nursing-369",
  "A patient is ordered strict bed rest. To prevent deep vein thrombosis the nurse should",
  "ৰোগীক কঠোৰ শয্যা বিশ্ৰামৰ নিৰ্দেশ। ডিপ ভেইন থ্ৰম্ব'ছিছ ৰোধ কৰিবলৈ নাৰ্ছে কৰা উচিত",
  [["encourage ankle exercises and apply compression stockings", "গোছাৰ ব্যায়াম উৎসাহিত কৰি কম্প্ৰেছন ষ্টকিং লগোৱা"],
   ["massage the calves firmly twice a day", "দিনত দুবাৰ গোছাত জোৰেৰে মালিচ কৰা"],
   ["keep the legs hanging over the edge of the bed", "ভৰি শয্যাৰ কাষেৰে ওলমি থাকিবলৈ দিয়া"],
   ["restrict fluids so the blood does not dilute", "তেজ পাতল নহ'বলৈ তৰল বন্ধ ৰখা"]], 0,
  "Calf muscle pumping and graded compression keep venous blood moving, which is what prevents stasis. Massaging a calf that may already hold a clot can dislodge it into the lung, and hanging legs promote pooling.",
  "গোছাৰ পেশীৰ পাম্পিং আৰু ক্ৰমিক কম্প্ৰেছনে শিৰাৰ তেজ চলাই ৰাখে, যিয়ে স্থবিৰতা ৰোধ কৰে। ইতিমধ্যে থ্ৰম্বাছ থকা গোছাত মালিচ কৰিলে সি ফুসফুসলৈ যাব পাৰে, আৰু ভৰি ওলমি থাকিলে তেজ জমা হয়।");

add("nursing-370",
  "A nurse is asked to witness a consent form for a surgical procedure. The nurse's role is to",
  "অস্ত্ৰোপচাৰৰ সন্মতি পত্ৰত সাক্ষী হ'বলৈ কোৱা হৈছে। নাৰ্ছৰ ভূমিকা",
  [["confirm that the patient signed voluntarily and was informed", "ৰোগীয়ে স্বেচ্ছাই স্বাক্ষৰ কৰিছে আৰু অৱগত হৈছে নিশ্চিত কৰা"],
   ["explain the surgical procedure and its risks in detail", "অস্ত্ৰোপচাৰ আৰু ইয়াৰ বিপদ বিস্তাৰিতভাৱে বুজোৱা"],
   ["decide whether the patient is a suitable candidate", "ৰোগী উপযুক্ত হয় নে নহয় নিৰ্ণয় কৰা"],
   ["sign on the patient's behalf if he is anxious", "ৰোগী উদ্বিগ্ন হ'লে তেওঁৰ হৈ স্বাক্ষৰ কৰা"]], 0,
  "Witnessing confirms that the signature was given freely by an informed patient. Explaining risks is the surgeon's duty, deciding suitability is a clinical judgement, and signing for the patient invalidates the consent.",
  "সাক্ষীয়ে নিশ্চিত কৰে যে অৱগত ৰোগীয়ে স্বেচ্ছাই স্বাক্ষৰ কৰিছে। বিপদ বুজোৱা শল্যচিকিৎসকৰ কৰ্তব্য, উপযুক্ততা নিৰ্ণয় ক্লিনিকেল বিচাৰ, আৰু ৰোগীৰ হৈ স্বাক্ষৰ কৰিলে সন্মতি অকৰ্মণীয় হয়।");

add("nursing-371",
  "A patient has been on the same position for three hours and the skin over the heel is blanchable and red. The nurse should",
  "ৰোগী তিনি ঘণ্টা একে অৱস্থানত, গোৰোহাৰ ছাল ৰঙা আৰু টিপিলে বগা হয়। নাৰ্ছে কৰা উচিত",
  [["reposition and offload the heel, then document the finding", "অৱস্থান সলনি কৰি গোৰোহাৰ চাপ আঁতৰাই লিখি ৰখা"],
   ["massage the reddened area to improve circulation", "ৰঙা অংশত মালিচ কৰি ৰক্তস্ৰাৱ বঢ়োৱা"],
   ["apply a hot water bottle to the heel", "গোৰোহাত গৰম পানীৰ বটল দিয়া"],
   ["wait until the skin breaks before acting", "ছাল ফটাৰ আগলৈকে অপেক্ষা কৰা"]], 0,
  "Blanchable redness is stage one pressure injury, and the treatment is to remove the pressure and record it so the next shift continues. Massaging reddened skin damages tissue that is already ischaemic, and heat increases its oxygen demand.",
  "টিপিলে বগা হোৱা ৰঙা দাগ প্ৰথম স্তৰৰ চাপজনিত ঘা, আৰু চিকিৎসা হ'ল চাপ আঁতৰাই পৰৱৰ্তী শ্বিফ্টলৈ লিখি ৰখা। ৰঙা ছালত মালিচ কৰিলে ইতিমধ্যে ৰক্তহীন কলাৰ ক্ষতি হয়, আৰু তাপে অক্সিজেনৰ চাহিদা বঢ়ায়।");

add("nursing-372",
  "The nurse is preparing a sterile trolley and notices that a pack of gauze has a torn wrapper. The correct action is to",
  "নাৰ্ছে জীৱাণুমুক্ত ট্ৰলি সাজু কৰোতে দেখে গজৰ পেকেটৰ মেৰামতি ফটা আছে। শুদ্ধ কাৰ্য",
  [["discard the pack and use another sterile one", "পেকেটটো এৰি আন জীৱাণুমুক্ত পেকেট লোৱা"],
   ["use only the inner gauze that looks clean", "ভিতৰৰ চাফা দেখুৱা গজখিনি ব্যৱহাৰ কৰা"],
   ["tape the torn corner and proceed", "ফটা চুক টেপেৰে লগাই আগবাঢ়া"],
   ["use it for a clean rather than sterile procedure", "জীৱাণুমুক্ত নহ'লেও পৰিষ্কাৰ কামত ব্যৱহাৰ কৰা"]], 0,
  "A torn wrapper means the contents are no longer sterile, because the seal is what keeps them so. Taping does not restore sterility and the pack cannot be downgraded on the nurse's own judgement.",
  "ফটা মেৰামতিয়ে বুজায় ভিতৰৰ বস্তু আৰু জীৱাণুমুক্ত নহয়, কাৰণ চিলেই তাক ৰাখে। টেপে জীৱাণুমুক্ততা ঘূৰাই নানে, আৰু নাৰ্ছৰ নিজা বিচাৰত পেকেটক নিম্ন শ্ৰেণীত নামিব নোৱাৰি।");

add("nursing-373",
  "A patient who has been vomiting repeatedly is ordered to have serum electrolytes checked. The nurse expects the report to show",
  "বাৰে বাৰে বমি হোৱা ৰোগীৰ ৰক্তৰ ইলেক্ট্ৰলাইট পৰীক্ষা নিৰ্দেশ। নাৰ্ছে আশা কৰে",
  [["low potassium and low chloride", "কম পটাছিয়াম আৰু কম ক্ল'ৰাইড"],
   ["high potassium and high chloride", "বেছি পটাছিয়াম আৰু বেছি ক্ল'ৰাইড"],
   ["high sodium and low calcium", "বেছি ছ'ডিয়াম আৰু কম কেলছিয়াম"],
   ["no change because the kidney compensates fully", "কোনো পৰিৱৰ্তন নাই কাৰণ বৃক্কই সম্পূৰ্ণ ক্ষতিপূৰণ কৰে"]], 0,
  "Gastric juice is rich in hydrogen, chloride and potassium, so repeated vomiting loses all three and causes hypochloraemic hypokalaemia. Potassium does not rise, and renal compensation cannot keep pace with continued loss.",
  "পেটৰ ৰসত হাইড্ৰ'জেন, ক্ল'ৰাইড আৰু পটাছিয়াম বেছি, সেয়ে বাৰে বাৰে বমি হ'লে তিনিওটা যায় আৰু হাইপ'ক্ল'ৰেমিক হাইপ'কেলিমিয়া হয়। পটাছিয়াম বাঢ়ে না, আৰু বৃক্কৰ ক্ষতিপূৰণে অবিৰত ক্ষতিৰ লগত খোজ মিলাব নোৱাৰে।");

add("nursing-374",
  "An elderly patient is admitted with confusion that began over two days. The nurse's most important initial action is to",
  "বয়সীয়াল ৰোগী দুদিনৰ পৰা বিভ্ৰান্ত হৈ ভৰ্তি। নাৰ্ছৰ আটাই গুৰুত্বপূৰ্ণ প্ৰাৰম্ভিক কাৰ্য",
  [["screen for infection, dehydration and a new medicine", "সংক্ৰমণ, পানীশূন্যতা আৰু নতুন ঔষধৰ বাবে পৰীক্ষা কৰা"],
   ["assume dementia and orient the patient repeatedly", "ডিমেনচিয়া ধৰি লৈ ৰোগীক বাৰে বাৰে সোঁৱৰাই দিয়া"],
   ["restrain the patient to prevent falls", "পৰি যোৱাৰপৰা ৰাখিবলৈ ৰোগীক বান্ধি ৰখা"],
   ["sedate the patient so he can rest", "ৰোগীক বিশ্ৰাম দিবলৈ শান্ত কৰা"]], 0,
  "Acute confusion with a two-day onset is delirium, and the common reversible causes are infection, dehydration and a newly started drug. Labelling it dementia misses a treatable illness, and restraint or sedation deepens the delirium.",
  "দুদিনত আৰম্ভ হোৱা তীব্ৰ বিভ্ৰান্তি হ'ল ডেলিৰিয়াম, আৰু সাধাৰণ প্ৰতিকাৰ্য কাৰণ সংক্ৰমণ, পানীশূন্যতা আৰু নতুন ঔষধ। ডিমেনচিয়া বুলিলে চিকিৎসাযোগ্য ৰোগ এৰি যায়, আৰু বান্ধি ৰখা বা শান্ত কৰিলে ডেলিৰিয়াম গভীৰ হয়।");

add("nursing-375",
  "The nurse is to give an intramuscular injection to a thin, wasted patient. To reach the muscle safely the nurse should",
  "শুকান, ক্ষীণ ৰোগীক পেশীত ইনজেকচন দিব লাগে। সুৰক্ষিতভাৱে পেশীত উপনীত হ'বলৈ নাৰ্ছে",
  [["gather the muscle between thumb and fingers before inserting", "সুমুৱাবৰ আগতে বুঢ়া আঙুলিৰে পেশী টানি ধৰা"],
   ["use the longest available needle at ninety degrees", "উপলব্ধ আটাই দীঘল ছুচ ৯০ ডিগ্ৰীত ব্যৱহাৰ কৰা"],
   ["inject into the nearest bony landmark", "ওচৰৰ হাড়ৰ চিনত ইনজেকচন দিয়া"],
   ["give the same volume as for an obese adult", "মোটা প্ৰাপ্তবয়স্কৰ দৰে একেই পৰিমাণ দিয়া"]], 0,
  "Picking up the muscle raises it away from the bone, so a standard needle reaches muscle without striking periosteum. A long needle in wasted tissue can hit bone, and bone has no muscle to absorb the drug.",
  "পেশী টানি ধৰিলে হাড়ৰপৰা আঁতৰি যায়, সেয়ে সাধাৰণ ছুচে হাড় নুঢুকুৱাকৈ পেশীত উপনীত হয়। ক্ষীণ কলাত দীঘল ছুচে হাড়ত লাগিব পাৰে, আৰু হাড়ত ঔষধ শোষণ কৰা পেশী নাই।");

add("nursing-376",
  "A patient due for surgery has been nil by mouth since midnight but is found eating biscuits at six in the morning. The nurse should",
  "অস্ত্ৰোপচাৰৰ বাবে মাজনিশাৰপৰা উপবাস থকা ৰোগীক ৰাতিপুৱা ছয় বজাত বিস্কুট খোৱা দেখা গ'ল। নাৰ্ছে",
  [["inform the surgeon and theatre so the case can be rescheduled", "শল্যচিকিৎসক আৰু থিয়েটাৰক জনাই কেছ পিছুৱাই দিবলৈ কোৱা"],
   ["say nothing because biscuits are a light food", "একো নোকোৱা কাৰণ বিস্কুট পাতল আহাৰ"],
   ["give the scheduled premedication as ordered", "নিৰ্ধাৰিত প্ৰিমেডিকেচন দি দিয়া"],
   ["delay the surgery by one hour and proceed", "এক ঘণ্টা পলম কৰি আগবাঢ়া"]], 0,
  "A full stomach at induction risks aspiration of gastric contents into the lungs, which can be fatal, so the case must be reviewed by the anaesthetist. Even a light solid empties slowly, and one hour does not clear it.",
  "এনেস্থেছিয়া আৰম্ভ কৰোতে ভৰা পেটৰ পৰা পেটৰ বস্তু ফুসফুসত সোমোৱাৰ বিপদ, যি মাৰাত্মক হ'ব পাৰে, সেয়ে এনেস্থেছিয়'লজিষ্টে পৰীক্ষা কৰিব লাগে। পাতল গোটা আহাৰও লাহে লাহে খালী হয়, আৰু এক ঘণ্টাত নহয়।");

add("nursing-377",
  "The nurse finds a patient's intravenous cannula site swollen, cool and painful with fluid leaking around it. The correct action is to",
  "নাৰ্ছে দেখে অন্তঃশিৰা কেনুলাৰ ঠাই ওফন্দি, ঠাণ্ডা, বিষ আৰু চাৰিওফালে তৰল ওলাইছে। শুদ্ধ কাৰ্য",
  [["stop the infusion, remove the cannula and restart elsewhere", "ইনফিউশ্যন বন্ধ কৰি কেনুলা আঁতৰাই আন ঠাইত লগোৱা"],
   ["increase the flow rate to clear the blockage", "বন্ধন আঁতৰাবলৈ প্ৰবাহৰ হাৰ বঢ়োৱা"],
   ["apply a warm pack and continue the infusion", "গৰম পোচ দি ইনফিউশ্যন অব্যাহত ৰখা"],
   ["flush the cannula with saline under pressure", "চাপ দি ছেলাইনৰে কেনুলা ধুই দিয়া"]], 0,
  "These are the signs of infiltration, where fluid has escaped into surrounding tissue, so the infusion must stop and the cannula move. Raising the rate or flushing under pressure forces more fluid into the tissue and can cause necrosis.",
  "এইবোৰ ইনফিল্ট্ৰেশ্যনৰ চিন, য'ত তৰল চাৰিওফালৰ কলাত ওলাই গৈছে, সেয়ে ইনফিউশ্যন বন্ধ কৰি কেনুলা সলনি কৰিব লাগে। হাৰ বঢ়ালে বা চাপেৰে ধুলে কলাত বেছি তৰল সোমাই নেক্ৰ'ছিছ হ'ব পাৰে।");

add("nursing-378",
  "A dying patient's family asks the nurse whether they should tell him the diagnosis. The nurse's best response is to",
  "মৃত্যুশয্যাত থকা ৰোগীৰ পৰিয়ালে নাৰ্ছক সোধে তেওঁক ৰোগ নিৰ্ণয় জনাব লাগে নে নাই। নাৰ্ছৰ শ্ৰেষ্ঠ উত্তৰ",
  [["ask what the patient himself has said he wants to know", "ৰোগীয়ে নিজে কি জানিব বিচাৰিছে সোধা"],
   ["tell them it is not the nurse's concern", "এইটো নাৰ্ছৰ বিষয় নহয় বুলি কোৱা"],
   ["advise them to hide the diagnosis in every case", "সকলো ক্ষেত্ৰতে ৰোগ নিৰ্ণয় লুকুৱাবলৈ পৰামৰ্শ দিয়া"],
   ["disclose the diagnosis without asking the patient", "ৰোগীক নোসোধাকৈ নিৰ্ণয় জনাই দিয়া"]], 0,
  "The patient's own wish to know governs disclosure, so the nurse explores that first and supports the family in following it. A blanket rule either way takes the decision away from the person it concerns.",
  "ৰোগীয়ে নিজে জানিব বিচৰাটোৱে জনোৱাৰ নিৰ্ণয় কৰে, সেয়ে নাৰ্ছে প্ৰথমে তাক সুধি পৰিয়ালক সেই অনুসৰি চলিবলৈ সহায় কৰে। যিকোনো এক দিশৰ নিয়মে সিদ্ধান্ত সংশ্লিষ্ট ব্যক্তিৰপৰা কাঢ়ি লয়।");

add("nursing-379",
  "A post-operative patient is drowsy with a respiratory rate of eight per minute and pinpoint pupils. The nurse should suspect",
  "অস্ত্ৰোপচাৰৰ পিছত ৰোগী টোপনিয়াল, উশাহ প্ৰতি মিনিটত আঠ আৰু চকুৰ গুটি সৰু। নাৰ্ছে সন্দেহ কৰা উচিত",
  [["opioid overdose from the analgesia given", "দিয়া বেদনানাশকেৰে অপিঅ'ইড অতি মাত্ৰা"],
   ["hypoglycaemia from missed meals", "আহাৰ নোহোৱাৰপৰা হাইপ'গ্লাইছিমিয়া"],
   ["hypoxia from a collapsed lung", "ফুসফুস চেপি যোৱাৰপৰা হাইপক্সিয়া"],
   ["normal deep sleep after anaesthesia", "এনেস্থেছিয়াৰ পিছত স্বাভাৱিক গভীৰ টোপনি"]], 0,
  "Slow shallow breathing with pinpoint pupils and drowsiness is the classic opioid triad, and naloxone is the antidote. Hypoglycaemia does not constrict the pupils, and treating it as normal sleep can end in respiratory arrest.",
  "লাহে অগভীৰ উশাহ, সৰু চকুৰ গুটি আৰু টোপনিয়াল ভাৱ অপিঅ'ইডৰ প্ৰচলিত ত্ৰিভুজ, আৰু নালক্স'ন ইয়াৰ প্ৰতিবিষ। হাইপ'গ্লাইছিমিয়াত চকুৰ গুটি সৰু নহয়, আৰু স্বাভাৱিক টোপনি ভাবিলে উশাহ বন্ধ হ'ব পাৰে।");

add("nursing-380",
  "A patient is to be shifted from the bed to a trolley. To protect the nurse's back the correct principle is to",
  "ৰোগীক শয্যাৰপৰা ট্ৰলীলৈ নিব লাগে। নাৰ্ছৰ পিঠি সুৰক্ষিত ৰাখিবলৈ শুদ্ধ নীতি",
  [["keep the load close to the body and bend the knees", "ভাৰ শৰীৰৰ ওচৰত ৰাখি আঁঠু ভাঁ‌জ কৰা"],
   ["twist the trunk while lifting to gain leverage", "সুবিধা ল'বলৈ তোলোতে শৰীৰ মেৰিওৱা"],
   ["lift with straight legs and a bent back", "পোন ভৰি আৰু ভঁ‌জা পিঠিৰে তোলা"],
   ["reach across the bed to pull from the far side", "শয্যাৰ সিটো পাৰৰপৰা টানি আনা"]], 0,
  "Holding the load close reduces the lever arm on the lumbar spine and knee bend lets the legs do the work. Twisting while loaded and lifting with a bent back are the two commonest causes of nurse back injury.",
  "ভাৰ ওচৰত ৰখিলে কঁকালৰ মেৰুদণ্ডত লিভাৰ আৰ্ম কমে আৰু আঁঠু ভাঁ‌জিলে ভৰিয়ে কাম কৰে। ভাৰ লৈ শৰীৰ মেৰিওৱা আৰু ভঁ‌জা পিঠিৰে তোলা নাৰ্ছৰ পিঠিৰ আঘাতৰ আটাই সাধাৰণ কাৰণ।");

/* ================= community-health-nursing ================= */
useLeaf("community-health-nursing");

add("nursing-381",
  "In a village of 4,000 people there were 120 live births and 6 infant deaths in a year. The infant mortality rate is",
  "৪,০০০ লোকৰ গাঁৱত বছৰি ১২০ জীৱিত জন্ম আৰু ৬ শৈশৱ মৃত্যু। শৈশৱ মৃত্যুৰ হাৰ",
  [["50 per 1,000 live births", "প্ৰতি ১,০০০ জীৱিত জন্মত ৫০"],
   ["6 per 1,000 population", "প্ৰতি ১,০০০ লোকত ৬"],
   ["20 per 1,000 live births", "প্ৰতি ১,০০০ জীৱিত জন্মত ২০"],
   ["120 per 1,000 live births", "প্ৰতি ১,০০০ জীৱিত জন্মত ১২০"]], 0,
  "The infant mortality rate is deaths under one year divided by live births, so six divided by 120 gives 0.05, or 50 per thousand live births. Dividing by total population gives a death rate, not an infant rate.",
  "শৈশৱ মৃত্যুৰ হাৰ = এক বছৰৰ তলৰ মৃত্যু ÷ জীৱিত জন্ম, সেয়ে ৬ ÷ ১২০ = ০.০৫, অৰ্থাৎ প্ৰতি হাজাৰ জীৱিত জন্মত ৫০। মুঠ লোকসংখ্যাৰে হৰণ কৰিলে মৃত্যুৰ হাৰ ওলায়, শৈশৱৰ হাৰ নহয়।");

add("nursing-382",
  "A community nurse finds that several children in one lane have diarrhoea and the common water source is an open well near a pit latrine. The priority intervention is to",
  "এটা গলিত কেইবাটাও শিশুৰ ডায়েৰিয়া, সাধাৰণ পানীৰ উৎস পিট লেট্ৰিনৰ ওচৰৰ মুকলি কুঁৱা। অগ্ৰাধিকাৰ হস্তক্ষেপ",
  [["protect and chlorinate the well and stop the contamination", "কুঁৱা সুৰক্ষিত কৰি ক্ল'ৰিন দি দূষণ বন্ধ কৰা"],
   ["give every child an antibiotic course", "প্ৰতিটো শিশুক এণ্টিবায়'টিকৰ কোৰ্চ দিয়া"],
   ["advise families to boil water only on Sundays", "পৰিয়ালক কেৱল দেওবাৰে পানী উতলাবলৈ কোৱা"],
   ["close the school until the rains end", "বৰষুণ নোহোৱালৈকে বিদ্যালয় বন্ধ ৰখা"]], 0,
  "A single contaminated source explains the clustering, so breaking that route stops the outbreak at its origin. Antibiotics treat individuals but leave the source infecting new cases, and intermittent boiling does not protect the days in between.",
  "এটাই দূষিত উৎসে গোট খোৱা কাৰণ ব্যাখ্যা কৰে, সেয়ে সেই পথ বন্ধ কৰিলে মূলতে প্ৰাদুৰ্ভাৱ ৰয়। এণ্টিবায়'টিকে ব্যক্তিক চিকিৎসা কৰে কিন্তু উৎসে নতুন ৰোগী সংক্ৰমিত কৰি থাকে, আৰু মাজে মাজে উতলালে মাজৰ দিনবোৰ অসুৰক্ষিত থাকে।");

add("nursing-383",
  "The nurse is calculating the crude death rate for a district. The denominator used is",
  "নাৰ্ছে জিলাৰ স্থূল মৃত্যুৰ হাৰ গণনা কৰিছে। ব্যৱহৃত হৰ",
  [["the mid-year total population", "বছৰৰ মাজৰ মুঠ লোকসংখ্যা"],
   ["the number of live births", "জীৱিত জন্মৰ সংখ্যা"],
   ["the number of hospital admissions", "চিকিৎসালয়ত ভৰ্তিৰ সংখ্যা"],
   ["the number of registered deaths", "পঞ্জীয়ন কৰা মৃত্যুৰ সংখ্যা"]], 0,
  "The crude death rate divides all deaths in a year by the mid-year population, usually per thousand. Live births give the infant or maternal rate, and deaths cannot be their own denominator.",
  "স্থূল মৃত্যুৰ হাৰত বছৰৰ সকলো মৃত্যু মাজৰ লোকসংখ্যাৰে হৰণ কৰা হয়, সাধাৰণতে প্ৰতি হাজাৰত। জীৱিত জন্মই শৈশৱ বা মাতৃ হাৰ দিয়ে, আৰু মৃত্যুৱে নিজেই হৰ হ'ব নোৱাৰে।");

add("nursing-384",
  "A mother brings a two-year-old with a cough for three weeks, evening fever and weight loss. The nurse should",
  "মাকে দুবছৰীয়া শিশুক তিনিসপ্তাহৰ কাহ, সন্ধিয়া জ্বৰ আৰু ওজন হ্ৰাস লৈ আনে। নাৰ্ছে কৰা উচিত",
  [["refer for sputum examination and screen the household", "কফ পৰীক্ষাৰ বাবে পঠিয়াই পৰিয়ালৰো পৰীক্ষা কৰা"],
   ["give a cough syrup and review after a month", "কাহৰ চিৰাপ দি এমাহৰ পিছত পুনৰ চোৱা"],
   ["reassure the mother that coughs are normal", "কাহ স্বাভাৱিক বুলি মাকক আশ্বাস দিয়া"],
   ["start iron tablets for the weight loss", "ওজন হ্ৰাসৰ বাবে লোৰ টেবলেট আৰম্ভ কৰা"]], 0,
  "Three weeks of cough with evening fever and weight loss is the case definition for presumptive tuberculosis, and children are almost always infected by an adult in the house. A cough syrup delays diagnosis, and iron does not treat the infection.",
  "তিনি সপ্তাহৰ কাহ, সন্ধিয়া জ্বৰ আৰু ওজন হ্ৰাস যক্ষ্মাৰ সন্দেহজনক লক্ষণ, আৰু শিশুৱে প্ৰায় সদায় ঘৰৰ এজন প্ৰাপ্তবয়স্কৰপৰা সংক্ৰমণ পায়। কাহৰ চিৰাপে ৰোগ নিৰ্ণয় পলম কৰায়, আৰু লোৱে সংক্ৰমণৰ চিকিৎসা নকৰে।");

add("nursing-385",
  "A nurse is planning a health education session for mothers on weaning foods. The most effective method for a group with low literacy is",
  "নাৰ্ছে মাকসকলৰ বাবে আৱশ্যক আহাৰৰ ওপৰত স্বাস্থ্য শিক্ষাৰ কাৰ্যসূচী সাজিছে। কম সাক্ষৰতা থকা দলৰ বাবে আটাই ফলপ্ৰসূ পদ্ধতি",
  [["a cooking demonstration using local ingredients", "স্থানীয় সামগ্ৰীৰে ৰন্ধা প্ৰদৰ্শন"],
   ["a printed pamphlet in English", "ইংৰাজীত ছপা পুথিকা"],
   ["a lecture read from a textbook", "পাঠ্যপুথিৰপৰা পঢ়ি দিয়া ভাষণ"],
   ["a list of foods written on the blackboard", "ব্লেকবৰ্ডত লিখা আহাৰৰ তালিকা"]], 0,
  "A demonstration shows the actual consistency, quantity and method, so a mother can copy it at home regardless of reading ability. Print, textbook reading and board lists all depend on literacy, which this group lacks.",
  "প্ৰদৰ্শনে প্ৰকৃত ঘনত্ব, পৰিমাণ আৰু পদ্ধতি দেখুৱায়, সেয়ে মাকে পঢ়িব নজনা হলেও ঘৰত অনুকৰণ কৰিব পাৰে। ছপা, পাঠ্যপুথি পঢ়া আৰু ব্লেকবৰ্ডৰ তালিকা সাক্ষৰতাৰ ওপৰত নিৰ্ভৰশীল, যি এই দলত নাই।");

add("nursing-386",
  "During a house visit the nurse finds a newborn with a feeding problem and a temperature of 35.2 degrees Celsius. The correct action is to",
  "ঘৰ ভ্ৰমণত নাৰ্ছে দেখে নৱজাতকৰ খোৱাত অসুবিধা আৰু উষ্ণতা ৩৫.২ ডিগ্ৰী চেলছিয়াছ। শুদ্ধ কাৰ্য",
  [["keep the baby skin to skin and refer urgently", "শিশুক ছালে ছালে ৰাখি জৰুৰীভাৱে পঠিওৱা"],
   ["advise the mother to bathe the baby in cold water", "মাকক ঠাণ্ডা পানীৰে গা ধুৱাবলৈ কোৱা"],
   ["tell the mother to come back after a week", "মাকক এসপ্তাহৰ পিছত আহিবলৈ কোৱা"],
   ["give the baby a hot water bottle to hold", "শিশুক গৰম পানীৰ বটল ধৰিবলৈ দিয়া"]], 0,
  "Hypothermia in a newborn with poor feeding is a danger sign for sepsis, so warming by skin contact and immediate referral are needed. Cold bathing worsens heat loss, and a hot bottle can burn the thin newborn skin.",
  "দুৰ্বল খোৱাৰ সৈতে নৱজাতকৰ হাইপ'থাৰ্মিয়া ছেপছিছৰ বিপদৰ চিন, সেয়ে ছালৰ সংস্পৰ্শৰে উম ৰাখি তৎক্ষণাত পঠিওৱা লাগে। ঠাণ্ডা পানীৰে ধুলে তাপ বেছি হেৰায়, আৰু গৰম বটলে পাতল ছাল পুৰি দিব পাৰে।");

add("nursing-387",
  "The nurse is asked to calculate the maternal mortality ratio for a block. The numerator is",
  "নাৰ্ছক ব্লকৰ মাতৃ মৃত্যু অনুপাত গণনা কৰিবলৈ কোৱা হৈছে। লৱ",
  [["deaths of mothers during pregnancy, delivery or within 42 days of delivery", "গৰ্ভাৱস্থা, প্ৰসৱ বা প্ৰসৱৰ ৪২ দিনৰ ভিতৰত মাকৰ মৃত্যু"],
   ["all deaths of women of child-bearing age", "সন্তান জন্ম দিব পৰা বয়সৰ মহিলাৰ সকলো মৃত্যু"],
   ["stillbirths in the block", "ব্লকৰ মৃত জন্ম"],
   ["deaths of children under five years", "পাঁচ বছৰৰ তলৰ শিশুৰ মৃত্যু"]], 0,
  "The ratio counts deaths from pregnancy-related causes up to 42 days after delivery, divided by live births. All deaths of women of reproductive age would include accidents and cancers, and under-five deaths belong to the child mortality rate.",
  "অনুপাতে প্ৰসৱৰ ৪২ দিনলৈকে গৰ্ভাৱস্থাসম্পৰ্কীয় কাৰণত মৃত্যু গণনা কৰি জীৱিত জন্মৰে হৰণ কৰে। প্ৰজননক্ষম মহিলাৰ সকলো মৃত্যু ল'লে দুৰ্ঘটনা আৰু কৰ্কটও সোমাব, আৰু পাঁচ বছৰৰ তলৰ মৃত্যু শিশু মৃত্যুৰ হাৰৰ।");

add("nursing-388",
  "A family in the community is identified as having a pregnant woman, a newborn and a person with tuberculosis. The nurse's first action is to",
  "সমাজত এটা পৰিয়ালত গৰ্ভৱতী মহিলা, নৱজাতক আৰু যক্ষ্মা ৰোগী আছে বুলি চিনাক্ত হ'ল। নাৰ্ছৰ প্ৰথম কাৰ্য",
  [["assess the newborn and separate the infectious case from the infant", "নৱজাতকৰ পৰীক্ষা কৰি সংক্ৰামক ৰোগীক শিশুৰপৰা আঁতৰাই ৰখা"],
   ["wait for the next monthly visit", "পৰৱৰ্তী মাহিলী ভ্ৰমণলৈ অপেক্ষা কৰা"],
   ["advise the family to shift house", "পৰিয়ালক ঘৰ সলনি কৰিবলৈ পৰামৰ্শ দিয়া"],
   ["give the newborn a course of antibiotics", "নৱজাতকক এণ্টিবায়'টিকৰ কোৰ্চ দিয়া"]], 0,
  "A newborn in the same room as a sputum-positive adult is at high risk of rapid, severe tuberculosis, so the immediate job is to protect the infant while treatment starts. Waiting a month is too long, and antibiotics without diagnosis are inappropriate.",
  "কফ পজিটিভ প্ৰাপ্তবয়স্কৰ একে কোঠাত থকা নৱজাতকৰ দ্ৰুত, গুৰুতৰ যক্ষ্মাৰ বিপদ বেছি, সেয়ে চিকিৎসা আৰম্ভ কৰাৰ লগে লগে শিশুক ৰক্ষা কৰাটো প্ৰথম কাম। এমাহ অপেক্ষা বেছি দীৰ্ঘ, আৰু নিৰ্ণয় নোহোৱাকৈ এণ্টিবায়'টিক অনুচিত।");

add("nursing-389",
  "The nurse is preparing a community diagnosis for a village with poor sanitation. The statement should include",
  "দুৰ্বল পৰিষ্কাৰ-পৰিচ্ছন্নতা থকা গাঁৱৰ বাবে সমাজ নিৰ্ণয় সাজু কৰিছে। বিৱৰণত থাকিব লাগে",
  [["the problem, the population affected and the evidence", "সমস্যা, ক্ষতিগ্ৰস্ত লোকসংখ্যা আৰু প্ৰমাণ"],
   ["only the nurse's opinion about the village", "গাঁৱৰ বিষয়ে নাৰ্ছৰ মতামত মাত্ৰ"],
   ["the names of defaulting families", "অৱহেলা কৰা পৰিয়ালৰ নাম"],
   ["a list of medicines to be purchased", "কিনিবলগীয়া ঔষধৰ তালিকা"]], 0,
  "A community diagnosis states the health problem, who carries it and the data that proves it, so that a plan and a measure follow. Opinion alone cannot be acted on or evaluated, and naming families breaches confidentiality.",
  "সমাজ নিৰ্ণয়ে স্বাস্থ্য সমস্যা, কাৰ ওপৰত আৰু প্ৰমাণ দিয়া তথ্য কয়, যাতে পৰিকল্পনা আৰু জোখ ল'ব পাৰি। কেৱল মতামতৰ ওপৰত কাম বা মূল্যায়ন কৰিব নোৱাৰি, আৰু পৰিয়ালৰ নাম ল'লে গোপনীয়তা ভংগ হয়।");

add("nursing-390",
  "A mother says she gives her one-year-old tea and biscuits instead of breast milk because it is cheaper. The nurse's best response is to",
  "মাকে কয় যে সস্তা বাবে তেওঁ এবছৰীয়া শিশুক গাখীৰৰ সলনি চাহ-বিস্কুট দিয়ে। নাৰ্ছৰ শ্ৰেষ্ঠ উত্তৰ",
  [["explain the nutrient loss and suggest low-cost local alternatives", "পুষ্টিৰ ক্ষতি বুজাই কম খৰচৰ স্থানীয় বিকল্প দিয়া"],
   ["tell her she is neglecting her child", "তেওঁ শিশুক অৱহেলা কৰিছে বুলি কোৱা"],
   ["say nothing because it is a family matter", "একো নোকোৱা কাৰণ এইটো পৰিয়ালৰ বিষয়"],
   ["advise stopping all milk immediately", "লগে লগে সকলো গাখীৰ বন্ধ কৰিবলৈ পৰামৰ্শ দিয়া"]], 0,
  "Tea inhibits iron absorption and biscuits supply energy without protein or micronutrients, so the child risks anaemia and stunting; the nurse offers affordable local foods such as egg, dal and greens. Blaming the mother ends the conversation, and stopping milk removes the best protein available.",
  "চাহে লোৰ শোষণ ৰোধ কৰে আৰু বিস্কুটে প্ৰ'টিন বা সূক্ষ্ম পুষ্টি নোহোৱাকৈ কেৱল শক্তি দিয়ে, সেয়ে শিশুৰ ৰক্তহীনতা আৰু বাঢ়ন ব্যাহত হোৱাৰ বিপদ; নাৰ্ছে কণী, ডাইল আৰু শাকৰ দৰে সুলভ স্থানীয় আহাৰ আগবঢ়ায়। মাকক দোষাৰোপ কৰিলে কথা বন্ধ হয়, আৰু গাখীৰ বন্ধ কৰিলে উপলব্ধ শ্ৰেষ্ঠ প্ৰ'টিন আঁতৰে।");

add("nursing-391",
  "The nurse notices that many adolescents in the village are anaemic. The most appropriate community level action is to",
  "নাৰ্ছে দেখে গাঁৱৰ বহু কিশোৰ-কিশোৰী ৰক্তহীন। আটাই উপযুক্ত সমাজ পৰ্যায়ৰ কাৰ্য",
  [["start weekly iron and folic acid supplementation with deworming", "প্ৰতি সপ্তাহে লো-ফলিক এচিড আৰু কৃমিনাশক আৰম্ভ কৰা"],
   ["refer every adolescent to a district hospital", "প্ৰতিজন কিশোৰক জিলা চিকিৎসালয়লৈ পঠিওৱা"],
   ["advise them to eat less to avoid obesity", "মোটাতাৰপৰা বাচিবলৈ কম খাবলৈ পৰামৰ্শ দিয়া"],
   ["give blood transfusion to all of them", "সকলোকে ৰক্ত সঞ্চাৰণ দিয়া"]], 0,
  "Weekly iron with folic acid plus periodic deworming is the national programme response and treats the two commonest causes at once at low cost. Hospital referral for every case overwhelms the system, and transfusion is reserved for severe anaemia.",
  "সাপ্তাহিক লো-ফলিক এচিড আৰু সময়ে সময়ে কৃমিনাশক ৰাষ্ট্ৰীয় কাৰ্যসূচীৰ প্ৰতিক্ৰিয়া, যিয়ে কম খৰচত দুয়োটা সাধাৰণ কাৰণ একেলগে সমাধান কৰে। প্ৰতিটো কেছ চিকিৎসালয়লৈ পঠিয়ালে ব্যৱস্থা জৰ্জৰিত হয়, আৰু ৰক্ত সঞ্চাৰণ গুৰুতৰ ৰক্তহীনতাৰ বাবে ৰখা হয়।");

add("nursing-392",
  "The nurse is told that a family has stopped attending the antenatal clinic after the second visit. The best follow-up is to",
  "পৰিয়াল এটাই দ্বিতীয় ভ্ৰমণৰ পিছত প্ৰসৱপূৰ্ব পৰীক্ষা বন্ধ কৰিছে বুলি জনা গ'ল। শ্ৰেষ্ঠ অনুসৰণ",
  [["make a home visit to find the reason and re-engage them", "কাৰণ জানিবলৈ ঘৰ ভ্ৰমণ কৰি পুনৰ সংযুক্ত কৰা"],
   ["send a letter and wait for them to return", "চিঠি পঠিয়াই তেওঁলোক ঘূৰি অহালৈ অপেক্ষা কৰা"],
   ["remove the family from the register", "পৰিয়ালটো পঞ্জীৰপৰা আঁতৰোৱা"],
   ["report the family to the police", "পৰিয়ালটো আৰক্ষীক জনোৱা"]], 0,
  "A home visit uncovers the real barrier, whether cost, distance, a bad experience or a family objection, and lets the nurse address it. A letter assumes literacy and willingness, and punitive steps drive the family further away.",
  "ঘৰ ভ্ৰমণে প্ৰকৃত বাধা উলিয়ায় — খৰচ, দূৰত্ব, বেয়া অভিজ্ঞতা বা পৰিয়ালৰ আপত্তি — আৰু নাৰ্ছে তাক সমাধান কৰিব পাৰে। চিঠিয়ে সাক্ষৰতা আৰু ইচ্ছা ধৰি লয়, আৰু শাস্তিমূলক পদক্ষেপে পৰিয়ালক আৰু দূৰলৈ ঠেলে।");

add("nursing-393",
  "In a community survey the nurse records that 80 per cent of households have a toilet but only 40 per cent use it. The finding indicates that",
  "সমাজ সমীক্ষাত নাৰ্ছে লিখে ৮০ শতাংশ ঘৰত শৌচালয় আছে কিন্তু কেৱল ৪০ শতাংশই ব্যৱহাৰ কৰে। এই তথ্যই দেখুৱায়",
  [["construction alone does not change behaviour, so promotion is needed", "কেৱল নিৰ্মাণে আচৰণ নসলায়, সেয়ে উৎসাহৰ প্ৰয়োজন"],
   ["the survey data must be wrong", "সমীক্ষাৰ তথ্য ভুল হ'ব লাগে"],
   ["the toilets should be demolished", "শৌচালয়বোৰ ভাঙি পেলাব লাগে"],
   ["the remaining 20 per cent is the only problem", "বাকী ২০ শতাংশই একমাত্ৰ সমস্যা"]], 0,
  "The gap between having and using a toilet is the classic behaviour-change gap, so the programme must work on beliefs, water supply and maintenance. The data are consistent, and demolition or ignoring the 40 per cent leaves the real problem untouched.",
  "শৌচালয় থকা আৰু ব্যৱহাৰ কৰাৰ মাজৰ ব্যৱধান আচৰণ পৰিৱৰ্তনৰ প্ৰচলিত ব্যৱধান, সেয়ে কাৰ্যসূচীয়ে বিশ্বাস, পানীৰ যোগান আৰু ৰক্ষণাবেক্ষণত কাম কৰিব লাগে। তথ্য সংগত, আৰু ভাঙি পেলা বা ৪০ শতাংশলৈ আওকাণ কৰিলে প্ৰকৃত সমস্যা থাকি যায়।");

add("nursing-394",
  "A community health nurse is asked to screen for hypertension at a village fair. The most practical approach is to",
  "মেলা এখনত উচ্চ ৰক্তচাপৰ স্ক্ৰীণিং কৰিবলৈ কোৱা হৈছে। আটাই বাস্তৱসম্মত উপায়",
  [["set up a stall and measure blood pressure of adults who consent", "এটা ষ্টল পাতি সন্মতি দিয়া প্ৰাপ্তবয়স্কৰ ৰক্তচাপ জোখা"],
   ["call only those already known to be hypertensive", "ইতিমধ্যে উচ্চ ৰক্তচাপ থকা বুলি জনাজনক কেৱল মতা"],
   ["measure only men above fifty years", "কেৱল পঞ্চাশৰ ওপৰৰ পুৰুষ জোখা"],
   ["distribute medicine without measuring", "নজুখাকৈ ঔষধ বিতৰণ কৰা"]], 0,
  "Screening aims to find the undiagnosed, so an open stall with consent reaches the people who do not yet know they have the condition. Calling known cases repeats work, and an age or sex filter misses most cases.",
  "স্ক্ৰীণিঙৰ লক্ষ্য অজ্ঞাত ৰোগী বিচাৰি উলিওৱা, সেয়ে সন্মতিসহ মুকলি ষ্টলে তেওঁলোকক ধৰে যিসকলে এতিয়াও নাজানে। জনাজনক মাতিলে কামৰ পুনৰাবৃত্তি হয়, আৰু বয়স বা লিংগৰ চেকুনীয়ে বেছিভাগ কেছ এৰি দিয়ে।");

add("nursing-395",
  "The nurse observes that a village has many cases of scabies in children. The correct community approach is to",
  "নাৰ্ছে দেখে গাঁৱত বহু শিশুৰ খুজুতি ৰোগ। শুদ্ধ সমাজ পদ্ধতি",
  [["treat all household contacts at the same time and wash clothes in hot water", "একেসময়ত সকলো ঘৰুৱা সংস্পৰ্শক চিকিৎসা কৰি কাপোৰ গৰম পানীত ধোৱা"],
   ["treat only the child who has visible rash", "কেৱল দৃশ্যমান দাগ থকা শিশুটোৰ চিকিৎসা কৰা"],
   ["advise families to avoid bathing", "পৰিয়ালক গা নুধুৱাবলৈ পৰামৰ্শ দিয়া"],
   ["spray insecticide in every room", "প্ৰতিটো কোঠাত কীটনাশক ছটিওৱা"]], 0,
  "Scabies spreads through close contact and an infected person is contagious before the rash appears, so simultaneous treatment of all contacts prevents reinfection. Treating one child leaves carriers at home, and insecticides do not act on the mite on skin.",
  "খুজুতি ঘনিষ্ঠ সংস্পৰ্শৰে বিয়পে আৰু সংক্ৰমিত ব্যক্তি দাগ ওলোৱাৰ আগতেই সংক্ৰামক, সেয়ে সকলো সংস্পৰ্শক একেসময়ত চিকিৎসা কৰিলে পুনৰ সংক্ৰমণ ৰয়। এটা শিশুৰ চিকিৎসা কৰিলে ঘৰত বাহক থাকি যায়, আৰু কীটনাশকে ছালৰ উকুনত ক্ৰিয়া নকৰে।");

add("nursing-396",
  "The nurse is asked to explain the difference between incidence and prevalence. The correct explanation is that incidence measures",
  "নাৰ্ছক সংঘটন আৰু প্ৰচলনৰ পাৰ্থক্য বুজাবলৈ কোৱা হৈছে। শুদ্ধ ব্যাখ্যা — সংঘটনে জোখে",
  [["new cases arising in a period, while prevalence counts all existing cases", "এক সময়ত নতুন কেছ, প্ৰচলনে সকলো বিদ্যমান কেছ গণনা কৰে"],
   ["all existing cases, while prevalence counts new ones", "সকলো বিদ্যমান কেছ, প্ৰচলনে নতুন কেছ গণনা কৰে"],
   ["deaths, while prevalence counts births", "মৃত্যু, প্ৰচলনে জন্ম গণনা কৰে"],
   ["hospital cases only, while prevalence counts village cases", "কেৱল চিকিৎসালয়ৰ কেছ, প্ৰচলনে গাঁৱৰ কেছ গণনা কৰে"]], 0,
  "Incidence is the rate at which new cases appear in a defined period, so it measures risk of acquiring disease; prevalence is the total burden at one point in time. The two differ exactly because cure and death remove cases from prevalence.",
  "সংঘটন হ'ল নিৰ্দিষ্ট সময়ত নতুন কেছ ওলোৱাৰ হাৰ, সেয়ে ই ৰোগ হোৱাৰ বিপদ জোখে; প্ৰচলন এটা সময়ত মুঠ ভাৰ। দুয়োৰা বেলেগ কাৰণ নিৰাময় আৰু মৃত্যুৱে প্ৰচলনৰপৰা কেছ আঁতৰায়।");

add("nursing-397",
  "During a school health check the nurse finds a child with a squint and poor vision in one eye. The nurse should",
  "বিদ্যালয় স্বাস্থ্য পৰীক্ষাত নাৰ্ছে এটা শিশুৰ টেৰা চকু আৰু এটা চকুৰ দুৰ্বল দৃষ্টি পায়। নাৰ্ছে",
  [["refer for an eye examination because early correction prevents permanent loss", "চকু পৰীক্ষাৰ বাবে পঠিওৱা কাৰণ সময়ত সংশোধনে স্থায়ী ক্ষতি ৰোধ কৰে"],
   ["tell the child to sit in the front row only", "শিশুক কেৱল আগশাৰীত বহিবলৈ কোৱা"],
   ["wait until the next annual check", "পৰৱৰ্তী বছৰেকীয়া পৰীক্ষালৈ অপেক্ষা কৰা"],
   ["advise the parents to stop homework", "পিতৃ-মাতৃক গৃহকৰ্ম বন্ধ কৰিবলৈ পৰামৰ্শ দিয়া"]], 0,
  "Amblyopia becomes largely irreversible after about eight years, so a squint or unequal vision needs ophthalmic assessment now. Front-row seating helps myopia but does not treat a squint, and a year's delay can cost the eye's vision for life.",
  "প্ৰায় আঠ বছৰৰ পিছত এম্ব্লিঅ'পিয়া প্ৰায় অপ্ৰতিকাৰ্য, সেয়ে টেৰা চকু বা অসম দৃষ্টিৰ এতিয়াই চকু বিশেষজ্ঞৰ পৰীক্ষা লাগে। আগশাৰীত বহিলে মায়'পিয়াত সহায় হয় কিন্তু টেৰা চকুৰ চিকিৎসা নহয়, আৰু এবছৰৰ পলমে জীৱনলৈ চকুৰ দৃষ্টি হেৰুৱাব পাৰে।");

add("nursing-398",
  "The nurse is planning to reduce dengue in a colony. The most effective measure is to",
  "উপনগৰত ডেঙু কমাবলৈ পৰিকল্পনা কৰিছে। আটাই ফলপ্ৰসূ উপায়",
  [["eliminate standing water in containers every week", "সপ্তাহে সপ্তাহে পাত্ৰত জমা পানী আঁতৰোৱা"],
   ["spray adulticide indoors once a year", "বছৰত এবাৰ ঘৰৰ ভিতৰত পতংগনাশক ছটিওৱা"],
   ["distribute mosquito nets for night sleeping", "ৰাতি শোৱাৰ বাবে মশাৰী বিতৰণ কৰা"],
   ["advise people to stay indoors at noon", "দুপৰীয়া ঘৰৰ ভিতৰত থাকিবলৈ পৰামৰ্শ দিয়া"]], 0,
  "The dengue mosquito breeds in clean standing water close to houses and bites by day, so weekly removal of containers attacks the larvae where they actually develop. Adultic spraying is temporary, and bed nets do not protect against a daytime biter.",
  "ডেঙুৰ মশাই ঘৰৰ ওচৰৰ পৰিষ্কাৰ জমা পানীত পোৱালি জগায় আৰু দিনত কামোৰে, সেয়ে সপ্তাহে পাত্ৰ আঁতৰালে পোৱালি там য'ত হয় তাতে ধ্বংস হয়। পতংগনাশক ছটিওৱা অস্থায়ী, আৰু মশাৰীয়ে দিনত কামোৰা মশাৰপৰা ৰক্ষা নকৰে।");

add("nursing-399",
  "A community nurse is told that a woman in the village delivered at home and the placenta has not come out after one hour. The nurse should",
  "গাঁৱৰ এগৰাকী মহিলাই ঘৰত প্ৰসৱ কৰিছে আৰু এঘণ্টাৰ পিছতো গৰ্ভফুল ওলোৱা নাই বুলি জনা গ'ল। নাৰ্ছে",
  [["arrange immediate transfer to a facility with referral note and IV access", "প্ৰেৰণ পত্ৰ আৰু অন্তঃশিৰা সংযোগসহ তৎক্ষণাত সুবিধালৈ পঠিওৱা"],
   ["wait up to six hours because it is normal", "ছয় ঘণ্টালৈকে অপেক্ষা কৰা কাৰণ ই স্বাভাৱিক"],
   ["pull the cord firmly to remove it", "গৰ্ভফুল উলিয়াবলৈ নাড়ী জোৰেৰে টনা"],
   ["give oral antibiotics and review tomorrow", "মুখে এণ্টিবায়'টিক দি কাইলৈ পুনৰ চোৱা"]], 0,
  "A retained placenta beyond thirty minutes risks postpartum haemorrhage and sepsis, so it is an emergency for referral. Waiting, pulling the cord, or oral antibiotics all allow fatal bleeding to begin at home.",
  "ত্ৰিশ মিনিটৰ ওপৰত গৰ্ভফুল ৰৈ থাকিলে প্ৰসৱোত্তৰ ৰক্তস্ৰাৱ আৰু ছেপছিছৰ বিপদ, সেয়ে ই প্ৰেৰণৰ জৰুৰী অৱস্থা। অপেক্ষা, নাড়ী টনা বা মুখে এণ্টিবায়'টিকে ঘৰতে মাৰাত্মক ৰক্তস্ৰাৱ আৰম্ভ হ'বলৈ দিয়ে।");

add("nursing-400",
  "The nurse notes that a village health register records many births but few immunisations. The most likely explanation is",
  "গাঁৱৰ স্বাস্থ্য পঞ্জীত বহু জন্ম কিন্তু কম টিকাকৰণ লিখা আছে। আটাই সম্ভাৱ্য ব্যাখ্যা",
  [["a weak link between birth registration and immunisation follow-up", "জন্ম পঞ্জীয়ন আৰু টিকাকৰণ অনুসৰণৰ মাজত দুৰ্বল সংযোগ"],
   ["that vaccines are ineffective", "টিকাৰ অকাৰ্যকৰীতা"],
   ["that children do not need vaccines", "শিশুৰ টিকা নালাগে"],
   ["that the register is always accurate", "পঞ্জী সদায় শুদ্ধ"]], 0,
  "Births are recorded by one worker and immunisation by another, so without a tracking list the defaulters are never called. Vaccine efficacy and need are established, and assuming the register is accurate would hide the follow-up gap.",
  "জন্ম এজন কৰ্মীয়ে লিখে আৰু টিকাকৰণ আনজনে, সেয়ে অনুসৰণ তালিকা নোহোৱাকৈ অৱহেলাকাৰীক মতা নহয়। টিকাৰ কাৰ্যকৰিতা আৰু প্ৰয়োজন প্ৰমাণিত, আৰু পঞ্জী শুদ্ধ ধৰি ল'লে অনুসৰণৰ ব্যৱধান লুকাই যায়।");

/* ================= first-aid-emergency ================= */
useLeaf("first-aid-emergency");

add("nursing-401",
  "A man is pulled from a pond and is not breathing. A bystander says he saw him go under five minutes ago. The nurse should",
  "এজন মানুহ পুখুৰীৰপৰা উলিওৱা হ'ল, উশাহ নাই। এজনে কয় তেওঁ পাঁচ মিনিট আগতে তল যোৱা দেখিছে। নাৰ্ছে",
  [["start CPR with chest compressions at once", "লগে লগে বুকুৰ চাপেৰে CPR আৰম্ভ কৰা"],
   ["try to drain water from the lungs first", "প্ৰথমে ফুসফুসৰপৰা পানী উলিয়াবলৈ চেষ্টা কৰা"],
   ["wait for an ambulance before touching him", "নোছুৱাকৈ এম্বুলেন্সৰ অপেক্ষা কৰা"],
   ["give five abdominal thrusts", "পাঁচবাৰ পেটত জোৰকৈ চাপ দিয়া"]], 0,
  "A drowned patient in cardiac arrest needs compressions immediately, and oxygen reaches the brain only when circulation restarts. Draining water wastes the minutes that decide survival, and abdominal thrusts are for choking, not drowning.",
  "ডুব যোৱা ৰোগী হৃদযন্ত্ৰ বন্ধ অৱস্থাত থাকিলে লগে লগে বুকুৰ চাপ লাগে, আৰু সংচলন ঘূৰি অহাৰ পিছতহে মগজুলৈ অক্সিজেন যায়। পানী উলিয়াবলৈ সময় নষ্ট কৰিলে বাচনি নিৰ্ণয় কৰা মিনিটবোৰ যায়, আৰু পেটত চাপ দিয়া শ্বাসৰোধৰ বাবে, ডুবাৰ বাবে নহয়।");

add("nursing-402",
  "A worker has a deep cut on the forearm and blood is spurting in jets. The first action is to",
  "শ্ৰমিক এজনৰ হাতত গভীৰ কাটা আৰু তেজ জেট হৈ ওলাইছে। প্ৰথম কাৰ্য",
  [["apply firm direct pressure over the wound", "ঘাঁৰ ওপৰত পোনপটীয়াকৈ জোৰকৈ চাপ দিয়া"],
   ["apply a loose dressing and elevate only", "ঢিলা বেণ্ডেজ দি কেৱল দাঙি ধৰা"],
   ["wash the wound under running water for ten minutes", "ঘাঁ বোৱতী পানীত দহ মিনিট ধুই দিয়া"],
   ["give the worker a hot drink to calm him", "শ্ৰমিকক শান্ত কৰিবলৈ গৰম পানীয় দিয়া"]], 0,
  "Arterial spurting loses blood fast, and firm direct pressure is what stops it while help is called. A loose dressing does not compress the vessel, and washing or a hot drink wastes the seconds that matter.",
  "ধমনীৰপৰা জেট হৈ ওলোৱা তেজে দ্ৰুতগতিত ৰক্ত হেৰুৱায়, আৰু সহায় মতাৰ লগে লগে জোৰকৈ পোনপটীয়া চাপেই তাক বন্ধ কৰে। ঢিলা বেণ্ডেজে ৰক্তনলীত চাপ নিদিয়ে, আৰু ধোৱা বা গৰম পানীয়ে গুৰুত্বপূৰ্ণ ছেকেণ্ড নষ্ট কৰে।");

add("nursing-403",
  "A patient has been stung by a bee and within minutes has swollen lips, a hoarse voice and difficulty breathing. The nurse should",
  "মৌমাখিয়ে কামোৰাৰ কেইমিনিটৰ ভিতৰতে ৰোগীৰ ওঁঠ ওফন্দি, মাত ভাগি যোৱা আৰু উশাহ লোৱাত কষ্ট। নাৰ্ছে",
  [["give adrenaline intramuscularly and call for emergency help", "পেশীত এড্ৰিনেলিন দি জৰুৰী সহায় মতা"],
   ["apply a cold pack to the sting site and observe", "কামোৰা ঠাইত ঠাণ্ডা পোচ দি পৰ্যবেক্ষণ কৰা"],
   ["give an antihistamine tablet by mouth", "মুখে এণ্টিহিষ্টামিন টেবলেট দিয়া"],
   ["reassure the patient and wait for the swelling to settle", "ৰোগীক আশ্বাস দি ওফন্দা কমালৈ অপেক্ষা কৰা"]], 0,
  "Swollen lips with a hoarse voice and breathlessness is anaphylaxis with airway involvement, and intramuscular adrenaline is the only treatment that reverses it fast. Antihistamine acts too slowly and does not open the airway, and waiting allows complete obstruction.",
  "ওঁঠ ওফন্দি, মাত ভাগি যোৱা আৰু উশাহ কষ্ট হ'ল শ্বাসপথ জড়িত এনাফাইলেক্সিছ, আৰু পেশীত এড্ৰিনেলিনেই একমাত্ৰ দ্ৰুত প্ৰতিক্ৰিয়া। এণ্টিহিষ্টামিনে লাহে ক্ৰিয়া কৰে আৰু শ্বাসপথ নুখোলে, আৰু অপেক্ষা কৰিলে সম্পূৰ্ণ বন্ধ হ'ব পাৰে।");

add("nursing-404",
  "A patient has been bitten by a stray dog on the calf with a bleeding wound. After washing with soap and water for fifteen minutes the nurse should",
  "পথেৰে ঘূৰি ফুৰা কুকুৰে গোছাত কামুৰি তেজ ওলাইছে। চাবোন আৰু পানীৰে পোন্ধৰ মিনিট ধোৱাৰ পিছত নাৰ্ছে",
  [["apply an antiseptic and refer at once for rabies vaccine and immunoglobulin", "এণ্টিচেপ্টিক দি লগে লগে ৰেবিজ টিকা আৰু ইমিউন'গ্ল'বুলিনৰ বাবে পঠিওৱা"],
   ["suture the wound tightly and send the patient home", "ঘাঁ টানকৈ চিলাই ৰোগীক ঘৰলৈ পঠিওৱা"],
   ["wait to see whether the dog develops symptoms", "কুকুৰৰ লক্ষণ ওলালৈ অপেক্ষা কৰা"],
   ["give a course of oral antibiotics only", "কেৱল মুখে এণ্টিবায়'টিকৰ কোৰ্চ দিয়া"]], 0,
  "Thorough washing removes virus from the wound, and post-exposure vaccine with immunoglobulin at the same visit is what prevents rabies once symptoms start it is almost always fatal. Tight suturing traps virus, and waiting for the dog to sicken wastes the only window.",
  "ভালদৰে ধুলে ঘাঁৰপৰা ভাইৰাছ আঁতৰে, আৰু একেই ভ্ৰমণত টিকা তথা ইমিউন'গ্ল'বুলিনেই ৰেবিজ ৰোধ কৰে; লক্ষণ আৰম্ভ হ'লে ই প্ৰায় সদায় মাৰাত্মক। টানকৈ চিলালে ভাইৰাছ আবদ্ধ হয়, আৰু কুকুৰ অসুখী হোৱালৈ অপেক্ষা কৰিলে একমাত্ৰ সুযোগ নষ্ট হয়।");

add("nursing-405",
  "A patient with a suspected neck injury after a road accident is lying on the road. The nurse's priority is to",
  "পথ দুৰ্ঘটনাৰ পিছত ডিঙিৰ আঘাতৰ সন্দেহ থকা ৰোগী পথত পৰি আছে। নাৰ্ছৰ অগ্ৰাধিকাৰ",
  [["stabilise the head and neck in line while checking the airway", "শ্বাসপথ পৰীক্ষা কৰোতে মূৰ আৰু ডিঙি শাৰীত স্থিৰ ৰখা"],
   ["sit the patient up to help him breathe", "উশাহত সহায় কৰিবলৈ ৰোগীক বহুওৱা"],
   ["remove the helmet and turn the head to the side", "হেলমেট খুলি মূৰ কাষলৈ ঘূৰোৱা"],
   ["lift the patient under the arms into a car", "বগলিৰ তলৰপৰা ধৰি ৰোগীক গাড়ীত তোলা"]], 0,
  "Airway comes first, but in a suspected spinal injury it must be secured with the head and neck held in line so movement does not sever the cord. Sitting up, turning the head or dragging the patient can convert a stable injury into paralysis.",
  "শ্বাসপথ প্ৰথম, কিন্তু মেৰুদণ্ডৰ আঘাতৰ সন্দেহত মূৰ আৰু ডিঙি শাৰীত ধৰি সুৰক্ষিত কৰিব লাগে যাতে চলনে ৰজ্জু ছিঁড়ি নপেলায়। বহুওৱা, মূৰ ঘূৰোৱা বা টানি নিয়াৰে স্থিৰ আঘাত পক্ষাঘাতত পৰিণত হ'ব পাৰে।");

add("nursing-406",
  "A child has swallowed a small button battery. The child is drooling and refusing food. The nurse should",
  "শিশুৱে সৰু বাটন বেটেৰী গিলিছে। শিশুৱে লেলা ওলাইছে আৰু খাবলৈ নিবিচাৰে। নাৰ্ছে",
  [["send the child immediately for emergency endoscopic removal", "শিশুক তৎক্ষণাত জৰুৰী এণ্ড'স্কপিক অপসাৰণলৈ পঠিওৱা"],
   ["make the child vomit at home", "ঘৰতে শিশুক বমি কৰোৱা"],
   ["give bread and water and observe for a day", "পাউৰুটি আৰু পানী দি এদিন পৰ্যবেক্ষণ কৰা"],
   ["wait for the battery to pass in the stool", "বেটেৰী শৌচৰ সৈতে ওলালৈ অপেক্ষা কৰা"]], 0,
  "A button battery in the oesophagus generates current that burns a hole within two hours, and drooling signals that it is lodged there. Vomiting can lodge it further, and waiting risks perforation of the oesophagus.",
  "অন্ননলীত বাটন বেটেৰীয়ে প্ৰবাহ সৃষ্টি কৰি দুঘণ্টাৰ ভিতৰতে ফুটা কৰে, আৰু লেলা ওলোৱাই তাত আটকি থকাৰ চিন। বমি কৰালে আৰু তললৈ সোমাব পাৰে, আৰু অপেক্ষা কৰিলে অন্ননলী ফুটাৰ বিপদ।");

add("nursing-407",
  "A patient in the emergency room has a blood glucose of 45 mg per decilitre and is sweating and confused but can swallow. The nurse should",
  "জৰুৰী কক্ষত ৰোগীৰ ৰক্ত শৰ্কৰা প্ৰতি ডেচিলিট্ৰত ৪৫ মিলিগ্ৰাম, ঘামি আছে, বিভ্ৰান্ত কিন্তু গিলিব পাৰে। নাৰ্ছে",
  [["give oral glucose and recheck the level in fifteen minutes", "মুখে গ্লুক'জ দি পোন্ধৰ মিনিটৰ পিছত পুনৰ পৰীক্ষা কৰা"],
   ["withhold all sugar until the doctor arrives", "ডাক্তৰ নাহালৈকে সকলো চেনি বন্ধ ৰখা"],
   ["give a dose of long acting insulin", "দীৰ্ঘকালীন ইনচুলিনৰ মাত্ৰা দিয়া"],
   ["give water only and wait for the confusion to pass", "কেৱল পানী দি বিভ্ৰান্তি যোৱালৈ অপেক্ষা কৰা"]], 0,
  "A conscious patient who can swallow is treated with fast-acting oral glucose, which raises the level within minutes, and the reading is repeated to confirm recovery. Insulin would deepen the hypoglycaemia, and withholding sugar risks a seizure.",
  "গিলিব পৰা সচেতন ৰোগীক দ্ৰুত ক্ৰিয়াৰ মুখে গ্লুক'জ দিয়া হয়, যিয়ে কেইমিনিটতে মান বঢ়ায়, আৰু আৰোগ্য নিশ্চিত কৰিবলৈ পুনৰ পঢ়া হয়। ইনচুলিনে হাইপ'গ্লাইছিমিয়া গভীৰ কৰে, আৰু চেনি নিদিলে খিঁচুনিৰ বিপদ।");

add("nursing-408",
  "A patient has a chemical burn with dry powder on the skin. The nurse should first",
  "ৰোগীৰ ছালত শুকান ৰাসায়নিক গুড়িৰে পোৰা দাগ। নাৰ্ছে প্ৰথমে",
  [["brush the powder off before irrigating with water", "পানীৰে ধোৱাৰ আগতে গুড়ি আঁতৰোৱা"],
   ["pour water over the powder at once", "লগে লগে গুড়িৰ ওপৰত পানী ঢালা"],
   ["cover the area with a dry dressing and refer", "শুকান বেণ্ডেজেৰে ঢাকি পঠিওৱা"],
   ["apply an ointment and wrap it tightly", "মলম লগাই টানকৈ মেৰিওৱা"]], 0,
  "Dry chemicals should be brushed away first because water can activate them and spread the burn over a larger area. Irrigating first worsens the injury, and ointment traps the chemical against the skin.",
  "শুকান ৰাসায়নিক আগতে আঁতৰাব লাগে কাৰণ পানীয়ে তাক সক্ৰিয় কৰি পোৰা দাগ বেচি ঠাইলৈ বিয়পাব পাৰে। আগতে ধুলে আঘাত বেয়া হয়, আৰু মলমে ৰাসায়নিক ছালৰ লগত লগাই ৰাখে।");

add("nursing-409",
  "A patient has a penetrating wound with a piece of glass still in the abdomen. The nurse should",
  "ৰোগীৰ পেটত কাঁচৰ টুকুৰা সোমাই থকা অৱস্থাত ঘাঁ। নাৰ্ছে",
  [["leave the object in place, stabilise it and transfer urgently", "বস্তুটো তাতে ৰাখি স্থিৰ কৰি জৰুৰীভাৱে পঠিওৱা"],
   ["pull the glass out and press on the wound", "কাঁচ টানি উলিয়াই ঘাঁত চাপ দিয়া"],
   ["push the object deeper so it does not fall out", "বস্তুটো নপৰিবলৈ আৰু তললৈ ঠেলি দিয়া"],
   ["give the patient food and water while waiting", "অপেক্ষা কৰোতে ৰোগীক আহাৰ আৰু পানী দিয়া"]], 0,
  "An impaled object may be plugging a torn vessel, and removing it can release torrential bleeding that cannot be controlled outside theatre. Pushing it deeper worsens the injury, and food or water risks aspiration if surgery follows.",
  "সোমোৱা বস্তুৱে ছিঁড়া ৰক্তনলী বন্ধ কৰি ৰাখিব পাৰে, আৰু উলিয়ালে অস্ত্ৰোপচাৰ কক্ষৰ বাহিৰত ৰোধ কৰিব নোৱাৰা ৰক্তস্ৰাৱ আৰম্ভ হ'ব পাৰে। তললৈ ঠেলিলে আঘাত বেয়া হয়, আৰু আহাৰ-পানীয়ে পিছত অস্ত্ৰোপচাৰ হ'লে শ্বাসনলীত সোমোৱাৰ বিপদ।");

add("nursing-410",
  "A patient has a nosebleed that has continued for twenty minutes. The nurse should",
  "ৰোগীৰ নাকৰপৰা বিশ মিনিট ধৰি তেজ ওলাই আছে। নাৰ্ছে",
  [["sit the patient up, lean forward and pinch the soft part of the nose", "ৰোগীক বহুৱাই আগলৈ হাউলি নাকৰ কোমল অংশ টিপি ধৰা"],
   ["tilt the head back and pack the nose with cotton", "মূৰ পিছলৈ দাঙি নাকত কপাহ ভৰোৱা"],
   ["lie the patient flat and give a hot drink", "ৰোগীক সমানকৈ শুৱাই গৰম পানীয় দিয়া"],
   ["ask the patient to blow the nose hard to clear it", "পৰিষ্কাৰ কৰিবলৈ নাকত জোৰেৰে ফু দিবলৈ কোৱা"]], 0,
  "Leaning forward with the soft part pinched puts pressure on the bleeding point and lets blood drain out rather than down the throat. Tilting back lets blood run into the stomach and cause vomiting, and blowing dislodges the clot.",
  "আগলৈ হাউলি কোমল অংশ টিপিলে ৰক্তস্ৰাৱৰ ঠাইত চাপ পৰে আৰু তেজ ডিঙিলৈ নগৈ বাহিৰে ওলায়। পিছলৈ দাঙিলে তেজ পেটলৈ গৈ বমি কৰায়, আৰু ফু দিলে জমা তেজৰ টুকুৰা আঁতৰি যায়।");

add("nursing-411",
  "A patient with severe diarrhoea and vomiting for two days is drowsy with a weak rapid pulse and cold extremities. The nurse should",
  "দুদিন ধৰি গুৰুতৰ ডায়েৰিয়া আৰু বমি হোৱা ৰোগী টোপনিয়াল, নাড়ী দুৰ্বল আৰু দ্ৰুত, হাত-ভৰি ঠাণ্ডা। নাৰ্ছে",
  [["start intravenous fluid and monitor the vital signs closely", "অন্তঃশিৰা তৰল আৰম্ভ কৰি সংকট চিহ্নসমূহ ভালদৰে নিৰীক্ষণ কৰা"],
   ["give oral rehydration solution only and send home", "কেৱল মুখে খোৱা ছ'লিউশ্যন দি ঘৰলৈ পঠিওৱা"],
   ["give a strong painkiller for the abdominal cramps", "পেটৰ ক্ৰাম্পৰ বাবে শক্তিশালী বেদনানাশক দিয়া"],
   ["withhold all fluids until the vomiting stops", "বমি বন্ধ নোহোৱালৈকে সকলো তৰল বন্ধ ৰখা"]], 0,
  "Drowsiness with a weak pulse and cold limbs means decompensated shock, and only intravenous fluid restores the circulation fast enough. Oral solution alone cannot keep up with the loss, and withholding fluid accelerates the collapse.",
  "টোপনিয়াল ভাৱ, দুৰ্বল নাড়ী আৰু ঠাণ্ডা অংগই ক্ষয়িষ্ণু শ্বক বুজায়, আৰু কেৱল অন্তঃশিৰা তৰলে সংচলন যথেষ্ট দ্ৰুতভাৱে ঘূৰাই আনে। কেৱল মুখেৰে দিলে ক্ষতিৰ লগত খোজ মিলাব নোৱাৰি, আৰু তৰল বন্ধ কৰিলে পতন ত্বৰান্বিত হয়।");

add("nursing-412",
  "A patient has been rescued from a house fire and has soot around the nose and a hoarse voice. The nurse should",
  "ঘৰৰ জুইৰপৰা উদ্ধাৰ কৰা ৰোগীৰ নাকৰ চাৰিওফালে কুঁৱলি আৰু মাত ভাগিছে। নাৰ্ছে",
  [["give high flow oxygen and prepare for early intubation", "বেছি প্ৰবাহত অক্সিজেন দি সোনকালে ইনটিউবেচনৰ বাবে সাজু হোৱা"],
   ["reassure the patient because the skin burn is small", "ছালৰ পোৰা কম বাবে ৰোগীক আশ্বাস দিয়া"],
   ["give a cough suppressant and observe", "কাহ দমনকাৰী দি পৰ্যবেক্ষণ কৰা"],
   ["send the patient home to return if breathing worsens", "উশাহ বেয়া হ'লে ঘূৰি আহিবলৈ ঘৰলৈ পঠিওৱা"]], 0,
  "Soot with hoarseness signals inhalation injury, and the airway swells over the next hours until it closes, so oxygen and early intubation are needed before that happens. A small skin burn does not reflect the airway, and a cough suppressant hides the warning.",
  "কুঁৱলি আৰু মাত ভগাৰ অৰ্থ শ্বাসপথৰ আঘাত, আৰু পৰৱৰ্তী ঘণ্টাবোৰত শ্বাসপথ ওফন্দি বন্ধ হয়, সেয়ে তাত আগতে অক্সিজেন আৰু সোনকালে ইনটিউবেচন লাগে। কম ছালৰ পোৰাই শ্বাসপথ নুবুজায়, আৰু কাহ দমনকাৰীয়ে সকীয়নি লুকুৱায়।");

add("nursing-413",
  "A patient has a fractured forearm with visible deformity. Before splinting the nurse should",
  "ৰোগীৰ হাতৰ হাড় ভঙা আৰু বিকৃতি দৃশ্যমান। স্প্লিণ্ট লগোৱাৰ আগতে নাৰ্ছে",
  [["check the pulse, sensation and movement beyond the injury", "আঘাতৰ সিপাৰে নাড়ী, অনুভূতি আৰু চলাচল পৰীক্ষা কৰা"],
   ["straighten the arm forcibly to make it look normal", "স্বাভাৱিক দেখুৱাবলৈ হাত জোৰকৈ পোন কৰা"],
   ["apply the splint tightly without checking", "নপৰীক্ষাকৈ স্প্লিণ্ট টানকৈ লগোৱা"],
   ["massage the swollen area to reduce pain", "ওফন্দা অংশত মালিচ কৰি বিষ কমোৱা"]], 0,
  "The neurovascular check before and after splinting detects a compressed artery or nerve early, which is the complication that threatens the limb. Forcible straightening can worsen a vessel or nerve injury, and massage increases swelling.",
  "স্প্লিণ্টৰ আগে পিছে স্নায়ু-ৰক্তনলী পৰীক্ষাই চেপি যোৱা ধমনী বা স্নায়ু সোনকালে ধৰে, যি অংগৰ বাবে বিপদ। জোৰকৈ পোন কৰিলে ৰক্তনলী বা স্নায়ুৰ আঘাত বেয়া হ'ব পাৰে, আৰু মালিচে ওফন্দা বঢ়ায়।");

add("nursing-414",
  "A patient is having a generalised seizure in the ward. The nurse should",
  "ৱাৰ্ডত ৰোগীৰ সম্পূৰ্ণ খিঁচুনি হৈছে। নাৰ্ছে",
  [["protect the head, clear the surroundings and time the seizure", "মূৰ ৰক্ষা কৰি চাৰিওফালৰ বস্তু আঁতৰাই খিঁচুনিৰ সময় জোখা"],
   ["force a spoon between the teeth", "দাঁতৰ মাজত চামুচ জোৰকৈ সুমুৱাই দিয়া"],
   ["hold the limbs down firmly", "অংগবোৰ জোৰকৈ ধৰি ৰখা"],
   ["give water by mouth during the seizure", "খিঁচুনি চলি থকা অৱস্থাত মুখে পানী দিয়া"]], 0,
  "The aim is to prevent injury and to record how long the seizure lasts, because duration decides treatment. Forcing an object breaks teeth and can block the airway, restraint causes fractures, and oral fluid is aspirated.",
  "লক্ষ্য আঘাত ৰোধ আৰু খিঁচুনি কিমান সময় থাকিল জোখা, কাৰণ সময়েই চিকিৎসা নিৰ্ণয় কৰে। বস্তু সুমুৱালে দাঁত ভাঙে আৰু শ্বাসপথ বন্ধ কৰিব পাৰে, বান্ধি ৰখালে হাড় ভাঙে, আৰু মুখে পানী দিলে শ্বাসনলীত সোমায়।");

add("nursing-415",
  "A patient is brought in with a snake bite on the foot and a tight band tied above the knee. The nurse should",
  "ভৰিত সাপে কামোৰা ৰোগীক অনা হ'ল, আঁঠুৰ ওপৰত টান বান্ধোন বন্ধা আছে। নাৰ্ছে",
  [["remove the tight band and keep the limb still below heart level", "টান বান্ধোন খুলি অংগ হৃদয়ৰ তলত স্থিৰ ৰখা"],
   ["tighten the band further to stop the venom", "বিষ ৰোধ কৰিবলৈ বান্ধোন আৰু টান কৰা"],
   ["cut the bite and suck out the venom", "কামোৰা ঠাই কাটি বিষ চুহি উলিওৱা"],
   ["apply ice directly to the bite", "কামোৰা ঠাইত পোনপটীয়াকৈ বৰফ দিয়া"]], 0,
  "A tight arterial band cuts off blood supply and concentrates venom in the limb, so it must come off and the limb kept still and dependent to slow absorption. Cutting and sucking introduces infection, and ice damages the tissue further.",
  "টান ধমনী বান্ধোনে ৰক্তস্ৰাৱ বন্ধ কৰি অংগত বিষ ঘন কৰে, সেয়ে খুলি অংগ স্থিৰ আৰু তললৈ ৰাখিলে শোষণ লেহেমীয়া হয়। কাটি চুহিলে সংক্ৰমণ হয়, আৰু বৰফে কলাৰ ক্ষতি বঢ়ায়।");

add("nursing-416",
  "An elderly patient has fallen and lies on the floor with one leg shortened and rotated outward. The nurse should",
  "বয়সীয়াল ৰোগী পৰি গৈছে, এটা ভৰি চুটি হৈ বাহিৰলৈ ঘূৰি আছে। নাৰ্ছে",
  [["keep the patient still and immobilise before transfer", "ৰোগীক স্থিৰ ৰাখি নিয়াৰ আগতে অচল কৰা"],
   ["help the patient stand and walk to a chair", "ৰোগীক থিয় হ'বলৈ সহায় কৰি চকীলৈ খোজ কাঢ়িবলৈ দিয়া"],
   ["pull the leg to straighten it", "ভৰি টানি পোন কৰা"],
   ["massage the hip to relieve the pain", "বিষ কমাবলৈ নিতম্বত মালিচ কৰা"]], 0,
  "A shortened, externally rotated leg after a fall suggests a hip fracture, and movement can displace the fragments or tear vessels. Standing, pulling or massaging can convert a simple fracture into one needing major surgery.",
  "পৰাৰ পিছত চুটি, বাহিৰলৈ ঘূৰা ভৰিয়ে নিতম্বৰ হাড় ভঙাৰ ইংগিত দিয়ে, আৰু লৰচৰ কৰিলে টুকুৰা আঁতৰি বা ৰক্তনলী ছিঁড়িব পাৰে। থিয় কৰা, টনা বা মালিচ কৰিলে সৰল ভঙা ডাঙৰ অস্ত্ৰোপচাৰৰ প্ৰয়োজনীয় হ'ব পাৰে।");

add("nursing-417",
  "A patient has been exposed to a large amount of organophosphate insecticide and has pinpoint pupils, sweating and excessive salivation. The nurse should",
  "ৰোগী বহু পৰিমাণে অৰ্গেন'ফছফেট কীটনাশকৰ সংস্পৰ্শলৈ আহিছে, চকুৰ গুটি সৰু, ঘাম আৰু লেলা অত্যধিক। নাৰ্ছে",
  [["decontaminate the skin, give oxygen and prepare atropine", "ছালৰপৰা বিষ আঁতৰাই অক্সিজেন দি এট্ৰ'পিনৰ বাবে সাজু হোৱা"],
   ["give a large dose of morphine for the distress", "কষ্টৰ বাবে মৰফিনৰ ডাঙৰ মাত্ৰা দিয়া"],
   ["give water by mouth to dilute the poison", "বিষ পাতল কৰিবলৈ মুখে পানী দিয়া"],
   ["cover the patient with blankets and observe", "ৰোগীক কম্বলেৰে ঢাকি পৰ্যবেক্ষণ কৰা"]], 0,
  "These are the muscarinic features of organophosphate poisoning, and atropine blocks them while decontamination stops further absorption. Morphine depresses breathing further, and oral water is unsafe with excessive salivation.",
  "এইবোৰ অৰ্গেন'ফছফেট বিষক্ৰিয়াৰ মাচকাৰিনিক লক্ষণ, আৰু এট্ৰ'পিনে তাক ৰোধ কৰে লগতে ডিকণ্টেমিনেশ্বনে আৰু শোষণ বন্ধ কৰে। মৰফিনে উশাহ আৰু কমায়, আৰু অত্যধিক লেলা হ'লে মুখে পানী দিয়া অসুৰক্ষিত।");

add("nursing-418",
  "A child has swallowed a handful of iron tablets an hour ago and is vomiting blood. The nurse should",
  "শিশুৱে এঘণ্টা আগতে মুঠি এভৰা লোৰ টেবলেট গিলিছে আৰু তেজ বমি কৰিছে। নাৰ্ছে",
  [["refer urgently for gastric lavage and chelation therapy", "গেষ্ট্ৰিক লেভেজ আৰু চিলেচন থেৰাপীৰ বাবে জৰুৰীভাৱে পঠিওৱা"],
   ["give milk and observe at home", "গাখীৰ দি ঘৰতে পৰ্যবেক্ষণ কৰা"],
   ["make the child vomit repeatedly", "শিশুক বাৰে বাৰে বমি কৰোৱা"],
   ["wait for the tablets to pass naturally", "টেবলেট স্বাভাৱিকভাৱে ওলালৈ অপেক্ষা কৰা"]], 0,
  "Iron overdose corrodes the gut and later causes liver failure and shock, and desferrioxamine chelation in hospital is the treatment. Milk does not bind iron, and repeated vomiting risks aspiration and oesophageal damage.",
  "লোৰ অতি মাত্ৰাই অন্ত্ৰ ক্ষয় কৰি পিছত যকৃতৰ বিকলতা আৰু শ্বক কৰে, আৰু চিকিৎসালয়ত ডেছফেৰিঅক্সামিন চিলেচনেই চিকিৎসা। গাখীৰে লো নাবান্ধে, আৰু বাৰে বাৰে বমি কৰালে শ্বাসনলীত সোমোৱা আৰু অন্ননলীৰ ক্ষতিৰ বিপদ।");

add("nursing-419",
  "A patient with a known heart condition collapses in the waiting area and is unresponsive with no pulse. The nurse should",
  "হৃদযন্ত্ৰৰ ৰোগ নিৰ্ণীত ৰোগী অপেক্ষা কক্ষত ঢলি পৰি অচেতন, নাড়ী নাই। নাৰ্ছে",
  [["start chest compressions and send for the defibrillator", "বুকুৰ চাপ আৰম্ভ কৰি ডিফিব্ৰিলেটৰ আনিবলৈ পঠিওৱা"],
   ["give two rescue breaths and then reassess", "দুইটা কৃত্ৰিম উশাহ দি পুনৰ পৰীক্ষা কৰা"],
   ["place the patient in the recovery position", "ৰোগীক আৰোগ্য অৱস্থানত ৰখা"],
   ["search for a pulse in the wrist for a full minute", "এমিনিট ধৰি হাতৰ নাড়ী বিচৰা"]], 0,
  "In cardiac arrest compressions restore circulation and the defibrillator is what restarts a shockable rhythm, so both are started without delay. Two breaths alone do not circulate blood, and the recovery position is for a breathing patient.",
  "হৃদযন্ত্ৰ বন্ধ অৱস্থাত বুকুৰ চাপে সংচলন ঘূৰায় আৰু ডিফিব্ৰিলেটৰেই শ্বকযোগ্য ছন্দ পুনৰ আৰম্ভ কৰে, সেয়ে দুয়োটা পলম নকৰাকৈ আৰম্ভ কৰে। কেৱল দুই উশাহে তেজ নচলায়, আৰু আৰোগ্য অৱস্থান উশাহ লোৱা ৰোগীৰ বাবে।");

add("nursing-420",
  "A patient has a large blister over a second degree burn on the thigh. The nurse should",
  "ৰোগীৰ উৰুত দ্বিতীয় শ্ৰেণীৰ পোৰাৰ ওপৰত ডাঙৰ ফোঁহা। নাৰ্ছে",
  [["leave the blister intact, cover with a non-adherent dressing", "ফোঁহা অক্ষত ৰাখি নোলাগি থকা বেণ্ডেজেৰে ঢাকা"],
   ["burst the blister and apply an antiseptic cream", "ফোঁহা ফুটাই এণ্টিচেপ্টিক ক্ৰীম লগোৱা"],
   ["apply ice directly over the blister", "ফোঁহাৰ ওপৰত পোনপটীয়াকৈ বৰফ দিয়া"],
   ["wrap the thigh tightly with cotton wool", "উৰুত কপাহেৰে টানকৈ মেৰিওৱা"]], 0,
  "An intact blister is a sterile biological dressing that keeps the wound moist and free of infection, so it is left alone and covered loosely. Bursting opens a portal for infection, ice damages the tissue, and tight cotton wool sticks to the raw surface.",
  "অক্ষত ফোঁহা জীৱাণুমুক্ত জৈৱিক বেণ্ডেজ, যিয়ে ঘাঁ তিতা আৰু সংক্ৰমণমুক্ত ৰাখে, সেয়ে তাক এৰি ঢিলাকৈ ঢাকে। ফুটালে সংক্ৰমণৰ দুৱাৰ খোলে, বৰফে কলাৰ ক্ষতি কৰে, আৰু টান কপাহে কেঁচা পৃষ্ঠত লাগি যায়।");

/* ================= maternal-child-health ================= */
useLeaf("maternal-child-health");

add("nursing-421",
  "A woman at 36 weeks of gestation reports a sudden gush of watery fluid and no pain. The nurse should",
  "৩৬ সপ্তাহৰ গৰ্ভৱতী মহিলাই হঠাতে পানীৰ দৰে তৰল ওলোৱাৰ কথা কয়, বিষ নাই। নাৰ্ছে",
  [["admit her for assessment because the membranes may have ruptured", "ঝিল্লী ফাটি যোৱাৰ সন্দেহত পৰীক্ষাৰ বাবে ভৰ্তি কৰা"],
   ["reassure her that it is normal urine leakage", "স্বাভাৱিক প্ৰস্ৰাৱ ওলোৱা বুলি আশ্বাস দিয়া"],
   ["advise her to wait at home until labour starts", "প্ৰসৱ আৰম্ভ হোৱালৈ ঘৰতে অপেক্ষা কৰিবলৈ কোৱা"],
   ["give her a hot bath and send her home", "গৰম পানীৰে গা ধুৱাই ঘৰলৈ পঠিওৱা"]], 0,
  "Spontaneous rupture before term risks cord prolapse and ascending infection, so assessment of fluid, fetal heart and presentation is urgent. Treating it as urine delays that, and a bath increases infection risk.",
  "সময়ৰ আগতে ঝিল্লী ফাটিলে নাড়ী ওলাই যোৱা আৰু ঊৰ্ধ্বমুখী সংক্ৰমণৰ বিপদ, সেয়ে তৰল, গৰ্ভস্থ হৃদস্পন্দন আৰু অৱস্থানৰ পৰীক্ষা জৰুৰী। প্ৰস্ৰাৱ ভাবিলে তাত পলম হয়, আৰু গা ধোৱাৰে সংক্ৰমণৰ বিপদ বাঢ়ে।");

add("nursing-422",
  "A newborn at one minute after birth has a heart rate of 90, slow irregular breathing, some flexion of limbs, a grimace on stimulation and a blue body. The Apgar score is",
  "জন্মৰ এমিনিটত নৱজাতকৰ হৃদস্পন্দন ৯০, লেহেমীয়া অনিয়মিত উশাহ, অংগ কিছু ভঁ‌জা, উত্তেজনাত মুখ বিকৃত আৰু শৰীৰ নীলা। এপগাৰ স্ক'ৰ",
  [["4", "৪"], ["6", "৬"], ["8", "৮"], ["2", "২"]], 0,
  "Each of the five signs scores zero to two: heart rate under 100 gives one, slow irregular breathing one, some flexion one, grimace one and a blue body zero, which totals four. Six would need pink extremities and stronger breathing.",
  "পাঁচোটা চিনৰ প্ৰতিটোত শূন্যৰপৰা দুই: ১০০ৰ তলৰ হৃদস্পন্দনত এক, লেহেমীয়া অনিয়মিত উশাহত এক, কিছু ভঁ‌জাত এক, মুখ বিকৃতিত এক আৰু নীলা শৰীৰত শূন্য, মুঠ চাৰি। ছয় হ'বলৈ হাত-ভৰি গুলপীয়া আৰু উশাহ সবল হ'ব লাগে।");

add("nursing-423",
  "A mother who delivered two hours ago is bleeding heavily and the uterus feels soft and boggy above the umbilicus. The nurse should first",
  "দুই ঘণ্টা আগতে প্ৰসৱ কৰা মাকৰ অত্যধিক ৰক্তস্ৰাৱ, জৰায়ু নাভিৰ ওপৰত কোমল আৰু ফুলা। নাৰ্ছে প্ৰথমে",
  [["massage the uterus and give a uterotonic as ordered", "জৰায়ুত মালিচ কৰি নিৰ্দেশ অনুসৰি জৰায়ু সংকোচক দিয়া"],
   ["give a hot drink and wait for the doctor", "গৰম পানীয় দি ডাক্তৰলৈ অপেক্ষা কৰা"],
   ["apply a tight binder around the abdomen", "পেটৰ চাৰিওফালে টান বান্ধোন লগোৱা"],
   ["catheterise the bladder only", "কেৱল মূত্ৰাশয়ত কেথেটৰ লগোৱা"]], 0,
  "A soft boggy uterus means atony, which is the commonest cause of postpartum haemorrhage, and massage plus a uterotonic makes it contract and closes the bleeding vessels. Waiting, binding or catheterising alone does not stop the loss.",
  "কোমল ফুলা জৰায়ুৰ অৰ্থ এটনি, যি প্ৰসৱোত্তৰ ৰক্তস্ৰাৱৰ আটাই সাধাৰণ কাৰণ, আৰু মালিচ তথা জৰায়ু সংকোচকে তাক সংকুচিত কৰি ৰক্তনলী বন্ধ কৰে। অপেক্ষা, বান্ধোন বা কেৱল কেথেটৰে ৰক্তস্ৰাৱ বন্ধ নকৰে।");

add("nursing-424",
  "A woman at 34 weeks has a blood pressure of 150 by 100 with protein in the urine and a severe headache. The nurse should",
  "৩৪ সপ্তাহৰ মহিলাৰ ৰক্তচাপ ১৫০/১০০, প্ৰস্ৰাৱত প্ৰ'টিন আৰু তীব্ৰ মূৰৰ বিষ। নাৰ্ছে",
  [["report at once because this is severe pre-eclampsia", "এইটো গুৰুতৰ প্ৰি-এক্লাম্পছিয়া বাবে তৎক্ষণাৎ জনোৱা"],
   ["reassure her that headaches are common in pregnancy", "গৰ্ভাৱস্থাত মূৰৰ বিষ সাধাৰণ বুলি আশ্বাস দিয়া"],
   ["advise her to reduce salt and return next month", "লৱণ কমাই অহা মাহত ঘূৰি আহিবলৈ কোৱা"],
   ["give a painkiller and let her rest", "বেদনানাশক দি বিশ্ৰাম কৰিবলৈ দিয়া"]], 0,
  "Hypertension with proteinuria and a severe headache is severe pre-eclampsia, which can progress to eclampsia and stroke, so it needs immediate review. Reassurance or a painkiller delays magnesium sulphate and delivery planning.",
  "উচ্চ ৰক্তচাপ, প্ৰস্ৰাৱত প্ৰ'টিন আৰু তীব্ৰ মূৰৰ বিষ হ'ল গুৰুতৰ প্ৰি-এক্লাম্পছিয়া, যি এক্লাম্পছিয়া আৰু ষ্ট্ৰ'কলৈ আগবাঢ়িব পাৰে, সেয়ে তৎক্ষণাৎ পৰ্যালোচনা লাগে। আশ্বাস বা বেদনানাশকে মেগনেছিয়াম ছালফেট আৰু প্ৰসৱৰ পৰিকল্পনা পলম কৰায়।");

add("nursing-425",
  "A baby weighing 2.2 kg is born at term and is feeding poorly. To prevent hypoglycaemia the nurse should",
  "সময়ত জন্মা ২.২ কিলোগ্ৰাম ওজনৰ শিশুয়ে দুৰ্বলকৈ খাইছে। হাইপ'গ্লাইছিমিয়া ৰোধ কৰিবলৈ নাৰ্ছে",
  [["feed early and often, and check the blood glucose", "সোনকালে আৰু বাৰে বাৰে খুৱাই ৰক্ত শৰ্কৰা পৰীক্ষা কৰা"],
   ["withhold feeds for six hours to rest the gut", "অন্ত্ৰ বিশ্ৰাম দিবলৈ ছয় ঘণ্টা খুৱাই নাথাকা"],
   ["give only water for the first day", "প্ৰথম দিনটো কেৱল পানী দিয়া"],
   ["wait until the baby demands food strongly", "শিশুৱে জোৰকৈ খুজিলেহে দিয়া"]], 0,
  "Low birth weight babies have small glycogen stores, so early frequent feeding plus glucose monitoring prevents symptomatic hypoglycaemia. Fasting, water only, or waiting for demand allows the level to fall and risks seizures.",
  "কম ওজনৰ শিশুৰ গ্লাইক'জেন ভাণ্ডাৰ সৰু, সেয়ে সোনকালে বাৰে বাৰে খুওৱা আৰু শৰ্কৰা নিৰীক্ষণে লক্ষণযুক্ত হাইপ'গ্লাইছিমিয়া ৰোধ কৰে। উপবাস, কেৱল পানী বা খোজালেহে দিলে মান কমি খিঁচুনিৰ বিপদ।");

add("nursing-426",
  "A woman in the second stage of labour has a fetal heart rate that falls to 90 beats per minute after each contraction. The nurse should",
  "প্ৰসৱৰ দ্বিতীয় স্তৰত সংকোচনৰ পিছত গৰ্ভস্থ হৃদস্পন্দন প্ৰতি মিনিটত ৯০ লৈ নামে। নাৰ্ছে",
  [["position her on the left side, give oxygen and report at once", "বাওঁ কাষলৈ শুৱাই অক্সিজেন দি তৎক্ষণাৎ জনোৱা"],
   ["ask her to push harder with each contraction", "প্ৰতিটো সংকোচনত জোৰকৈ ঠেলিবলৈ কোৱা"],
   ["reassure her that a slow heart rate is normal in labour", "প্ৰসৱত লেহেমীয়া হৃদস্পন্দন স্বাভাৱিক বুলি আশ্বাস দিয়া"],
   ["wait for the next contraction to recheck", "পৰৱৰ্তী সংকোচনলৈ অপেক্ষা কৰি পুনৰ পৰীক্ষা কৰা"]], 0,
  "Decelerations after contractions suggest the placenta is not delivering enough oxygen, so left lateral position, oxygen and urgent reporting are needed. Pushing harder or waiting increases fetal hypoxia, and a rate of 90 is not normal.",
  "সংকোচনৰ পিছত হাৰ কমিলে নালী প্লেছে পৰ্যাপ্ত অক্সিজেন নিদিয়া বুজায়, সেয়ে বাওঁ কাষলৈ শুৱোৱা, অক্সিজেন আৰু তৎক্ষণাৎ জনোৱা লাগে। জোৰকৈ ঠেলিলে বা অপেক্ষা কৰিলে গৰ্ভস্থ হাইপক্সিয়া বাঢ়ে, আৰু ৯০ হাৰ স্বাভাৱিক নহয়।");

add("nursing-427",
  "A newborn's cord is still wet and the mother asks when it will fall off. The nurse advises",
  "নৱজাতকৰ নাভী তিতা আছে, মাকে কেতিয়া সৰিব সোধে। নাৰ্ছে পৰামৰ্শ দিয়ে",
  [["keep it clean and dry, and it usually separates in one to two weeks", "পৰিষ্কাৰ আৰু শুকান ৰাখিলে সাধাৰণতে একৰপৰা দুই সপ্তাহত সৰে"],
   ["apply oil daily to soften it", "নৰম কৰিবলৈ দৈনিক তেল লগোৱা"],
   ["cover it tightly with a bandage", "বেণ্ডেজেৰে টানকৈ ঢাকি ৰখা"],
   ["pull it gently each day to hasten separation", "সোনকালে সৰিবলৈ দৈনিক লাহে লাহে টনা"]], 0,
  "Dry cord care lets the stump dry and separate naturally in one to two weeks, and any redness, pus or foul smell needs review. Oil keeps it moist, a tight bandage traps moisture, and pulling risks bleeding and infection.",
  "শুকান যতনে নাভীৰ ঠাৰি শুকাই একৰপৰা দুই সপ্তাহত স্বাভাৱিকভাৱে সৰে, আৰু ৰঙা, পুঁজ বা দুৰ্গন্ধ হ'লে পৰীক্ষা লাগে। তেলে তিতা ৰাখে, টান বেণ্ডেজে জোঁক ৰাখে, আৰু টানিলে ৰক্তস্ৰাৱ আৰু সংক্ৰমণৰ বিপদ।");

add("nursing-428",
  "A primigravida at 38 weeks is 4 cm dilated and contractions are every three minutes. The nurse should expect",
  "৩৮ সপ্তাহৰ প্ৰথম গৰ্ভৱতীৰ ৪ চেমি খোলা, সংকোচন প্ৰতি তিনিমিনিটত। নাৰ্ছে আশা কৰে",
  [["labour to progress and to prepare for delivery soon", "প্ৰসৱ আগবাঢ়ি সোনকালে প্ৰসৱৰ বাবে সাজু হোৱা"],
   ["labour to stop because it is too early", "বেছি সোনকাল বাবে প্ৰসৱ বন্ধ হোৱা"],
   ["a caesarean section to be needed immediately", "তৎক্ষণাৎ চিজাৰিয়ানৰ প্ৰয়োজন হোৱা"],
   ["no further change for many hours", "বহু ঘণ্টালৈকে আৰু কোনো পৰিৱৰ্তন নোহোৱা"]], 0,
  "Four centimetres with contractions every three minutes is established labour at term, so steady progress and delivery preparation are expected. Term labour does not stop, and a caesarean is not indicated by these findings alone.",
  "তিনিমিনিটৰ সংকোচনৰ সৈতে চাৰি চেমি হ'ল সময়ত প্ৰতিষ্ঠিত প্ৰসৱ, সেয়ে অবিৰত অগ্ৰগতি আৰু প্ৰসৱৰ প্ৰস্তুতি আশা কৰা হয়। সময়ত আৰম্ভ হোৱা প্ৰসৱ বন্ধ নহয়, আৰু এই তথ্যই কেৱল চিজাৰিয়ানৰ নিৰ্দেশ নিদিয়ে।");

add("nursing-429",
  "A mother is reluctant to breast feed because she says her milk has not come in. The nurse should explain that",
  "মাকে কয় গাখীৰ নহা বাবে স্তনপান কৰাব নিবিচাৰে। নাৰ্ছে বুজাব লাগে",
  [["colostrum is already present and is all the newborn needs at first", "ক'ল'ষ্ট্ৰাম ইতিমধ্যে আছে আৰু প্ৰথমে নৱজাতকৰ সেয়াই পৰ্যাপ্ত"],
   ["formula is better until the milk comes in", "গাখীৰ নহালৈকে ফৰ্মুলা ভাল"],
   ["she should give water instead for two days", "দুদিন পানী দিব লাগে"],
   ["she should wait for the breast to feel full", "স্তন ভৰা যেন নালাগিলে অপেক্ষা কৰিব লাগে"]], 0,
  "Colostrum is produced from late pregnancy and supplies antibody and enough volume for a newborn's small stomach, and suckling is what brings the milk in. Formula or water displaces that and reduces the stimulation that establishes supply.",
  "ক'ল'ষ্ট্ৰাম গৰ্ভাৱস্থাৰ শেষতেই হয় আৰু এণ্টিবডি তথা নৱজাতকৰ সৰু পেটৰ বাবে পৰ্যাপ্ত পৰিমাণ দিয়ে, আৰু চুহিলেই গাখীৰ নামে। ফৰ্মুলা বা পানীয়ে তাক আঁতৰাই যোগান গঢ়া উদ্দীপনা কমায়।");

add("nursing-430",
  "A woman using a combined oral contraceptive pill misses one tablet and remembers twelve hours late. The nurse advises her to",
  "কম্বাইন্ড মুখে খোৱা গৰ্ভনিৰোধক বড়ি লোৱা মহিলাই এটা বড়ি পাহৰি বাৰ ঘণ্টা পিছত মনত পায়। নাৰ্ছে পৰামৰ্শ দিয়ে",
  [["take the missed tablet now and continue the pack as usual", "পাহৰা বড়িটো এতিয়া খাই পেকেট স্বাভাৱিকভাৱে অব্যাহত ৰখা"],
   ["stop the pack and wait for a period", "পেকেট বন্ধ কৰি ঋতু আহিলৈ অপেক্ষা কৰা"],
   ["take two tablets every day for the rest of the pack", "বাকী পেকেটত দৈনিক দুটা বড়ি খোৱা"],
   ["double the next pack only", "কেৱল পৰৱৰ্তী পেকেট দুগুণ কৰা"]], 0,
  "A single late tablet within the twenty-four hour window is corrected by taking it as soon as remembered and carrying on, with no extra protection needed. Stopping the pack or doubling doses disrupts the cycle without improving cover.",
  "চৌবিশ ঘণ্টাৰ ভিতৰত এটা বড়ি পলম হ'লে মনত পৰাৰ লগে লগে খাই আগবাঢ়িলেই শুধৰণি হয়, আৰু অতিৰিক্ত সুৰক্ষা নালাগে। পেকেট বন্ধ কৰা বা মাত্ৰা দুগুণ কৰিলে চক্ৰ ব্যাহত হয় কিন্তু সুৰক্ষা নবাঢ়ে।");

add("nursing-431",
  "A child of nine months has not received any vaccine since birth. The nurse should",
  "নমাহীয়া শিশুৱে জন্মৰপৰা কোনো টিকা লোৱা নাই। নাৰ্ছে",
  [["start the schedule from where it stopped without restarting", "বন্ধ হোৱা ঠাইৰপৰা আৰম্ভ কৰা, পুনৰ আৰম্ভ নকৰি"],
   ["restart the whole schedule from birth", "জন্মৰপৰা গোটেই কাৰ্যসূচী পুনৰ আৰম্ভ কৰা"],
   ["wait until the child is one year old", "শিশু একবছৰ নোহোৱালৈ অপেক্ষা কৰা"],
   ["give only the vaccines due at nine months", "কেৱল নমাহত দিবলগীয়া টিকা দিয়া"]], 0,
  "Immunisation schedules are continued from the last dose given, because earlier doses remain valid and restarting wastes them. Waiting or giving only the current age's doses leaves the child unprotected against the earlier diseases.",
  "টিকাকৰণ কাৰ্যসূচী শেষবাৰ দিয়া মাত্ৰাৰপৰা আগবঢ়োৱা হয়, কাৰণ আগৰ মাত্ৰা বৈধ থাকে আৰু পুনৰ আৰম্ভ কৰিলে নষ্ট হয়। অপেক্ষা কৰা বা কেৱল বৰ্তমান বয়সৰ মাত্ৰা দিলে শিশু আগৰ ৰোগবোৰৰপৰা অসুৰক্ষিত থাকে।");

add("nursing-432",
  "A woman at 28 weeks reports that fetal movements have reduced noticeably over two days. The nurse should",
  "২৮ সপ্তাহৰ মহিলাই দুদিনত গৰ্ভস্থ শিশুৰ চলাচল লক্ষণীয়ভাৱে কমাৰ কথা কয়। নাৰ্ছে",
  [["arrange an urgent assessment of the fetal heart", "গৰ্ভস্থ হৃদস্পন্দনৰ জৰুৰী পৰীক্ষাৰ ব্যৱস্থা কৰা"],
   ["reassure her that movements reduce at this stage", "এই স্তৰত চলাচল কমে বুলি আশ্বাস দিয়া"],
   ["ask her to count movements for another week", "আন এসপ্তাহ চলাচল গণনা কৰিবলৈ কোৱা"],
   ["tell her to take a sweet drink and sleep", "মিঠা পানীয় লৈ শুই থাকিবলৈ কোৱা"]], 0,
  "Reduced fetal movement can be the first sign of fetal compromise, and a heart rate assessment decides whether the baby is safe. Reassurance or a week's wait can miss a deteriorating fetus, and movements do not normally fall at 28 weeks.",
  "গৰ্ভস্থ শিশুৰ চলাচল কমাটো বিপদৰ প্ৰথম চিন হ'ব পাৰে, আৰু হৃদস্পন্দনৰ পৰীক্ষাই শিশু নিৰাপদ নে নাই নিৰ্ণয় কৰে। আশ্বাস বা এসপ্তাহৰ অপেক্ষাই বেয়া হৈ যোৱা শিশু এৰি দিব পাৰে, আৰু ২৮ সপ্তাহত চলাচল স্বাভাৱিকভাৱে নকমে।");

add("nursing-433",
  "A newborn develops jaundice on the first day of life. The nurse should",
  "নৱজাতকৰ জীৱনৰ প্ৰথম দিনাই কামলা ৰোগ দেখা দিলে। নাৰ্ছে",
  [["report at once because jaundice in the first day is always abnormal", "তৎক্ষণাৎ জনোৱা কাৰণ প্ৰথম দিনৰ কামলা সদায় অস্বাভাৱিক"],
   ["reassure the mother that all babies become jaundiced", "সকলো শিশুৰে কামলা হয় বুলি মাকক আশ্বাস দিয়া"],
   ["expose the baby to sunlight and review in a week", "শিশুক ৰ'দত ৰাখি এসপ্তাহত পুনৰ চোৱা"],
   ["stop breast feeding permanently", "স্তনপান স্থায়ীভাৱে বন্ধ কৰা"]], 0,
  "Jaundice within twenty-four hours of birth points to haemolytic disease or infection and needs immediate bilirubin measurement. Physiological jaundice appears after the first day, and sunlight or stopping feeds delays treatment of a dangerous level.",
  "জন্মৰ চৌবিশ ঘণ্টাৰ ভিতৰত কামলা হ'লে ৰক্তকণিকা ভঙাৰ ৰোগ বা সংক্ৰমণ বুজায় আৰু তৎক্ষণাৎ বিলিৰুবিন জোখা লাগে। শাৰীৰিক কামলা প্ৰথম দিনৰ পিছত হয়, আৰু ৰ'দ বা খোৱা বন্ধ কৰিলে বিপদজনক মানৰ চিকিৎসা পলম হয়।");

add("nursing-434",
  "A woman in labour is fully dilated and has been pushing for two hours with no descent of the head. The nurse should",
  "প্ৰসৱত মহিলাৰ সম্পূৰ্ণ খোলা, দুই ঘণ্টা ধৰি ঠেলিছে কিন্তু মূৰ তললৈ নাহে। নাৰ্ছে",
  [["inform the obstetrician because progress has stopped", "অগ্ৰগতি বন্ধ হোৱা বাবে প্ৰসূতিবিদক জনোৱা"],
   ["ask her to push harder for another hour", "আন এঘণ্টা জোৰকৈ ঠেলিবলৈ কোৱা"],
   ["give her a sedative to relax", "শিথিল কৰিবলৈ শান্তকাৰী দিয়া"],
   ["leave her alone to rest and return later", "অকলে এৰি পিছত ঘূৰি অহা"]], 0,
  "Two hours of pushing in the second stage without descent suggests obstruction or inefficient contractions, which needs obstetric review before the mother or baby tires further. More pushing risks exhaustion and fetal distress, and a sedative masks the problem.",
  "দ্বিতীয় স্তৰত দুই ঘণ্টা ঠেলিও তললৈ নাহিলে বাধা বা দুৰ্বল সংকোচন বুজায়, আৰু মাক বা শিশু ভাগৰাৰ আগতে প্ৰসূতিবিদৰ পৰ্যালোচনা লাগে। আৰু ঠেলিলে ভাগৰ আৰু গৰ্ভস্থ কষ্টৰ বিপদ, আৰু শান্তকাৰীয়ে সমস্যা ঢাকে।");

add("nursing-435",
  "A mother asks how long she should exclusively breast feed her baby. The nurse advises",
  "মাকে সুধে কিমান দিন কেৱল স্তনপান কৰাব। নাৰ্ছে পৰামৰ্শ দিয়ে",
  [["six months, with no water or other food", "ছয় মাহ, পানী বা আন আহাৰ নোহোৱাকৈ"],
   ["two months, then start water", "দুই মাহ, তাৰ পিছত পানী আৰম্ভ"],
   ["one year with water from the first week", "একবছৰ, প্ৰথম সপ্তাহৰপৰাই পানীৰে"],
   ["three months, then cow milk", "তিনি মাহ, তাৰ পিছত গৰুৰ গাখীৰ"]], 0,
  "Exclusive breast feeding for six months meets all fluid and nutrient needs, because breast milk is mostly water, and it protects against infection. Early water or animal milk displaces breast milk and adds contamination risk.",
  "ছয় মাহ কেৱল স্তনপান কৰিলে সকলো তৰল আৰু পুষ্টিৰ প্ৰয়োজন পূৰ হয়, কাৰণ মাকৰ গাখীৰ বেছিভাগ পানী, আৰু ই সংক্ৰমণৰপৰা ৰক্ষা কৰে। আগতে পানী বা পশুৰ গাখীৰ দিলে স্তনপান আঁতৰাই সংক্ৰমণৰ বিপদ যোগ কৰে।");

add("nursing-436",
  "A woman at 12 weeks has severe vomiting and has lost weight. The nurse should",
  "১২ সপ্তাহৰ মহিলাৰ তীব্ৰ বমি আৰু ওজন হ্ৰাস। নাৰ্ছে",
  [["assess hydration and electrolytes and report for treatment", "পানীৰ অৱস্থা আৰু ইলেক্ট্ৰলাইট পৰীক্ষা কৰি চিকিৎসাৰ বাবে জনোৱা"],
   ["advise her to eat only dry food and wait", "কেৱল শুকান আহাৰ খাই অপেক্ষা কৰিবলৈ পৰামৰ্শ দিয়া"],
   ["reassure her that all vomiting in pregnancy is normal", "গৰ্ভাৱস্থাৰ সকলো বমি স্বাভাৱিক বুলি আশ্বাস দিয়া"],
   ["give a strong antiemetic without assessment", "নপৰীক্ষাকৈ শক্তিশালী বমিৰোধক দিয়া"]], 0,
  "Vomiting with weight loss is hyperemesis gravidarum, which causes dehydration and electrolyte loss and needs assessment before treatment. Ordinary morning sickness does not cause weight loss, and treating blindly misses the severity.",
  "ওজন হ্ৰাসৰ সৈতে বমি হ'ল হাইপাৰএমেছিছ গ্ৰেভিডাৰাম, যিয়ে পানীশূন্যতা আৰু ইলেক্ট্ৰলাইট ক্ষতি কৰে আৰু চিকিৎসাৰ আগতে পৰীক্ষা লাগে। সাধাৰণ ৰাতিপুৱাৰ বমিয়ে ওজন নকমায়, আৰু অন্ধভাৱে চিকিৎসা কৰিলে তীব্ৰতা নজনাকৈ যায়।");

add("nursing-437",
  "A baby is born not breathing and the nurse finds thick meconium in the airway. The nurse should",
  "শিশুৰ জন্মত উশাহ নাই আৰু শ্বাসপথত ডাঠ মেক'নিয়াম। নাৰ্ছে",
  [["suction the airway under direct vision before stimulation", "উদ্দীপনা দিয়াৰ আগতে পোনপটীয়াকৈ চাই শ্বাসপথ চাফা কৰা"],
   ["rub the baby vigorously to start breathing", "উশাহ আৰম্ভ কৰিবলৈ শিশুক জোৰকৈ মালিচ কৰা"],
   ["give oxygen by mask without suction", "চাফা নকৰাকৈ মাস্কেৰে অক্সিজেন দিয়া"],
   ["clamp the cord immediately and wait", "লগে লগে নাড়ী বান্ধি অপেক্ষা কৰা"]], 0,
  "Meconium in the airway must be cleared before the first breath, because a breath draws it into the lungs and causes aspiration pneumonia. Vigorous rubbing or mask oxygen pushes it deeper, and immediate clamping removes the baby's oxygen supply.",
  "প্ৰথম উশাহৰ আগতে শ্বাসপথৰ মেক'নিয়াম আঁতৰাব লাগে, কাৰণ উশাহে তাক ফুসফুসত টানি নিউম'নিয়া কৰে। জোৰকৈ মালিচ বা মাস্কৰ অক্সিজেনে তাক আৰু তললৈ ঠেলে, আৰু লগে লগে নাড়ী বান্ধিলে শিশুৰ অক্সিজেন যোগান কটা যায়।");

add("nursing-438",
  "A woman who is 32 weeks pregnant reports a painless vaginal bleed. The nurse should",
  "৩২ সপ্তাহৰ গৰ্ভৱতী মহিলাই বিষ নোহোৱা যোনিপথৰ ৰক্তস্ৰাৱৰ কথা কয়। নাৰ্ছে",
  [["admit her and avoid a vaginal examination", "ভৰ্তি কৰি যোনি পৰীক্ষা নকৰা"],
   ["perform a vaginal examination to find the cause", "কাৰণ বিচাৰিবলৈ যোনি পৰীক্ষা কৰা"],
   ["advise her to rest at home and review later", "ঘৰতে বিশ্ৰাম কৰি পিছত চোৱাবলৈ পৰামৰ্শ দিয়া"],
   ["give a hot bath and send her home", "গৰম পানীৰে গা ধুৱাই ঘৰলৈ পঠিওৱা"]], 0,
  "Painless bleeding late in pregnancy suggests placenta praevia, and a vaginal examination can provoke torrential haemorrhage. Admission with ultrasound localises the placenta safely, while home rest or a bath delays treatment of a life-threatening bleed.",
  "গৰ্ভাৱস্থাৰ শেষত বিষ নোহোৱা ৰক্তস্ৰাৱে প্লেছে প্ৰিভিয়াৰ ইংগিত দিয়ে, আৰু যোনি পৰীক্ষাই প্ৰচণ্ড ৰক্তস্ৰাৱ আৰম্ভ কৰিব পাৰে। আল্ট্ৰাছাউণ্ডৰ সৈতে ভৰ্তি কৰিলে প্লেছে নিৰাপদে চিনাক্ত হয়, আৰু ঘৰত বিশ্ৰাম বা গা ধোৱাই জীৱন-সংকটজনক ৰক্তস্ৰাৱৰ চিকিৎসা পলম কৰায়।");

add("nursing-439",
  "A newborn is 30 minutes old and the mother wants to delay breast feeding until she is shifted to the ward. The nurse should",
  "নৱজাতকৰ বয়স ত্ৰিশ মিনিট, মাকে ৱাৰ্ডলৈ যোৱালৈ স্তনপান পিছুৱাব বিচাৰে। নাৰ্ছে",
  [["help her feed now, because the first hour is the best time to start", "এতিয়াই খুওৱাত সহায় কৰা, কাৰণ প্ৰথম ঘণ্টাই আৰম্ভ কৰাৰ শ্ৰেষ্ঠ সময়"],
   ["agree and give formula meanwhile", "সন্মতি দি তেতিয়ালৈ ফৰ্মুলা দিয়া"],
   ["give glucose water until she is shifted", "ৱাৰ্ডলৈ যোৱালৈ গ্লুক'জ পানী দিয়া"],
   ["wait for the baby to cry strongly", "শিশুৱে জোৰকৈ কান্দিলেহে দিয়া"]], 0,
  "The newborn is alert and has a strong suck in the first hour, and early suckling starts the milk supply and gives colostrum. Formula or glucose water replaces that stimulation, and waiting loses the period when feeding is easiest to establish.",
  "প্ৰথম ঘণ্টাত নৱজাতক সজাগ আৰু চুহিবলৈ সবল, আৰু সোনকালে চুহিলে গাখীৰৰ যোগান আৰম্ভ হয় লগতে ক'ল'ষ্ট্ৰাম পায়। ফৰ্মুলা বা গ্লুক'জ পানীয়ে সেই উদ্দীপনা আঁতৰায়, আৰু অপেক্ষা কৰিলে খুওৱা স্থাপন কৰিবলৈ আটাই সহজ সময় হেৰায়।");

add("nursing-440",
  "A mother brings a four-month-old who has not passed stool for three days but is feeding well and passing urine normally. The nurse should",
  "মাকে চাৰিমাহীয়া শিশুক আনে, তিনি দিন শৌচ হোৱা নাই কিন্তু ভালদৰে খাইছে আৰু প্ৰস্ৰাৱ স্বাভাৱিক। নাৰ্ছে",
  [["reassure her, because breast fed babies may go days without stool", "আশ্বাস দিয়া, কাৰণ স্তনপান কৰা শিশুৱে কেইবাদিনো শৌচ নোহোৱাকৈ থাকিব পাৰে"],
   ["advise an enema at home", "ঘৰতে ইনিমা দিবলৈ পৰামৰ্শ দিয়া"],
   ["refer urgently for suspected obstruction", "অবৰোধৰ সন্দেহত জৰুৰীভাৱে পঠিওৱা"],
   ["advise stopping breast feeding", "স্তনপান বন্ধ কৰিবলৈ পৰামৰ্শ দিয়া"]], 0,
  "Breast fed infants absorb milk efficiently and may pass stool infrequently while feeding and growing well, so reassurance is enough. Enemas or urgent referral without other signs are unnecessary, and stopping breast feeding would harm the baby.",
  "স্তনপান কৰা শিশুৱে গাখীৰ দক্ষভাৱে শোষে আৰু ভালদৰে খাই বৃদ্ধি হ'লে কমকৈ শৌচ কৰিব পাৰে, সেয়ে আশ্বাসেই যথেষ্ট। আন লক্ষণ নোহোৱাকৈ ইনিমা বা জৰুৰী প্ৰেৰণ অলাগতীয়াল, আৰু স্তনপান বন্ধ কৰিলে শিশুৰ ক্ষতি হয়।");

/* ================= medical-surgical-nursing ================= */
useLeaf("medical-surgical-nursing");

add("nursing-441",
  "A patient with a chest drain after a lung injury suddenly has bubbling in the water seal chamber that increases with each breath. The nurse should",
  "ফুসফুসৰ আঘাতৰ পিছত বুকুৰ ড্ৰেইন থকা ৰোগীৰ পানীৰ চিলত প্ৰতিটো উশাহত বেছি বুলবুলনি হয়। নাৰ্ছে",
  [["check the tubing and dressing for an air leak and report", "বায়ু ওলোৱাৰ বাবে নলী আৰু বেণ্ডেজ পৰীক্ষা কৰি জনোৱা"],
   ["clamp the tube to stop the bubbling", "বুলবুলনি বন্ধ কৰিবলৈ নলী চেপি ধৰা"],
   ["raise the drainage bottle above the chest", "ড্ৰেইন বটল বুকুৰ ওপৰলৈ দাঙা"],
   ["add more water to the suction control chamber", "চাকশ্যন নিয়ন্ত্ৰণ কোঠালীত বেছি পানী দিয়া"]], 0,
  "Continuous bubbling in the water seal means air is entering the pleural space, from a leak in the lung, the tubing or the dressing, so the system is checked and the finding reported. Clamping a leaking chest drain can produce a tension pneumothorax.",
  "পানীৰ চিলত অবিৰত বুলবুলনি মানে ফুসফুস, নলী বা বেণ্ডেজৰপৰা বায়ু প্লিউৰেল অৱকাশত সোমাইছে, সেয়ে ব্যৱস্থা পৰীক্ষা কৰি জনাব লাগে। লিক থকা ড্ৰেইন চেপি ধৰিলে টেনশ্যন নিউম'থ'ৰেক্স হ'ব পাৰে।");

add("nursing-442",
  "A patient with a new ileostomy has a stoma that is dark purple and dry, and there is no output for eight hours. The nurse should",
  "নতুন আইলিঅ'ষ্টমি থকা ৰোগীৰ ষ্ট'মা গাঢ় বেঙুনীয়া আৰু শুকান, আঠ ঘণ্টা কোনো নিঃসৰণ নাই। নাৰ্ছে",
  [["report immediately because the stoma may be ischaemic", "ষ্ট'মা ৰক্তহীন হ'ব পাৰে বাবে তৎক্ষণাৎ জনোৱা"],
   ["apply a tight binder over the stoma", "ষ্ট'মাৰ ওপৰত টান বান্ধোন লগোৱা"],
   ["wait until the next day to see if it pinkens", "গুলপীয়া হয় নে নাই চাবলৈ পিছদিনালৈ অপেক্ষা কৰা"],
   ["irrigate the stoma with cold water", "ষ্ট'মা ঠাণ্ডা পানীৰে ধুই দিয়া"]], 0,
  "A dark, dry stoma with no output suggests the blood supply is compromised, which needs surgical review within hours. Waiting allows necrosis, and a binder or cold irrigation further reduces perfusion.",
  "গাঢ়, শুকান ষ্ট'মা আৰু নিঃসৰণ নোহোৱাই ৰক্তস্ৰাৱ বিপদত থকাৰ ইংগিত, সেয়ে কেইঘণ্টাৰ ভিতৰতে শল্যচিকিৎসকৰ পৰ্যালোচনা লাগে। অপেক্ষা কৰিলে নেক্ৰ'ছিছ হয়, আৰু বান্ধোন বা ঠাণ্ডা পানীয়ে ৰক্তস্ৰাৱ আৰু কমায়।");

add("nursing-443",
  "A patient two days after abdominal surgery has a distended abdomen, no bowel sounds and has not passed flatus. The nurse should",
  "পেটৰ অস্ত্ৰোপচাৰৰ দুই দিনৰ পিছত ৰোগীৰ পেট ফুলা, অন্ত্ৰৰ শব্দ নাই আৰু বায়ু ওলোৱা নাই। নাৰ্ছে",
  [["withhold oral fluids and report for assessment", "মুখে তৰল বন্ধ কৰি পৰীক্ষাৰ বাবে জনোৱা"],
   ["give a large drink of warm water", "বেছি পৰিমাণে গৰম পানী দিয়া"],
   ["encourage a heavy meal to stimulate the gut", "অন্ত্ৰ উদ্দীপিত কৰিবলৈ গধুৰ আহাৰ খুৱাই দিয়া"],
   ["give a strong laxative by mouth", "মুখে শক্তিশালী জোলাপ দিয়া"]], 0,
  "Absent bowel sounds with distension after surgery is paralytic ileus, and the gut must rest while the cause is assessed. Fluid or food by mouth accumulates and causes vomiting, and a laxative on a paralysed gut risks perforation.",
  "অস্ত্ৰোপচাৰৰ পিছত অন্ত্ৰৰ শব্দ নোহোৱাকৈ পেট ফুলা হ'ল পেৰালাইটিক আইলিয়াছ, আৰু কাৰণ পৰীক্ষা কৰোতে অন্ত্ৰই বিশ্ৰাম ল'ব লাগে। মুখে তৰল বা আহাৰ জমি বমি কৰায়, আৰু অসাৰ অন্ত্ৰত জোলাপে ফুটাৰ বিপদ কৰে।");

add("nursing-444",
  "A patient with a below knee amputation reports severe burning pain in the foot that has been removed. The nurse should",
  "আঁঠুৰ তলত কাটি পেলোৱা ৰোগীয়ে কাটি পেলোৱা ভৰিত তীব্ৰ জ্বলা বিষৰ কথা কয়। নাৰ্ছে",
  [["accept it as real phantom pain and report for treatment", "ই আচল ফেণ্টম বিষ বুলি গ্ৰহণ কৰি চিকিৎসাৰ বাবে জনোৱা"],
   ["tell the patient the foot is gone so the pain is imaginary", "ভৰি নাই বাবে বিষ কল্পনা বুলি কোৱা"],
   ["massage the stump vigorously to distract him", "মন বেলেগলৈ নিবলৈ ষ্টাম্পত জোৰেৰে মালিচ কৰা"],
   ["withhold analgesia because there is no tissue to hurt", "বিষ দিবলগীয়া কলা নাই বাবে বেদনানাশক নিদিয়া"]], 0,
  "Phantom limb pain is a real neuropathic phenomenon generated by the cut nerve endings and the brain's body map, and it responds to analgesia and review. Dismissing it as imaginary or withholding analgesia leaves severe pain untreated.",
  "ফেণ্টম অংগৰ বিষ কটা স্নায়ুৰ আগ আৰু মগজুৰ শৰীৰ মানচিত্ৰই সৃষ্টি কৰা আচল স্নায়ুজনিত ঘটনা, আৰু ই বেদনানাশক তথা পৰ্যালোচনাত ভাল হয়। কল্পনা বুলি উৰাই দিয়া বা বেদনানাশক নিদিলে তীব্ৰ বিষ অবিচিকিৎসিত থাকে।");

add("nursing-445",
  "A patient with chronic kidney disease has a serum potassium of 6.8 and peaked T waves on the ECG. The nurse should",
  "দীৰ্ঘকালীন বৃক্ক ৰোগত ৰোগীৰ ৰক্ত পটাছিয়াম ৬.৮ আৰু ইচিজিত শিখৰযুক্ত টি তৰংগ। নাৰ্ছে",
  [["report at once as a cardiac emergency", "হৃদযন্ত্ৰৰ জৰুৰী অৱস্থা বুলি তৎক্ষণাৎ জনোৱা"],
   ["give a potassium supplement as charted", "চাৰ্ট অনুসৰি পটাছিয়াম পৰিপূৰক দিয়া"],
   ["encourage bananas and coconut water", "কল আৰু নাৰিকল পানী খাবলৈ উৎসাহিত কৰা"],
   ["repeat the test after the next meal", "পৰৱৰ্তী আহাৰৰ পিছত পৰীক্ষা পুনৰ কৰা"]], 0,
  "Hyperkalaemia with peaked T waves can progress to ventricular fibrillation within minutes, so it is reported immediately for calcium, insulin-dextrose and dialysis planning. Potassium supplements, high potassium foods or delay risk cardiac arrest.",
  "শিখৰযুক্ত টি তৰংগৰ সৈতে হাইপাৰকেলিমিয়া কেইমিনিটতে ভেণ্ট্ৰিকুলাৰ ফিব্ৰিলেশ্যনলৈ যাব পাৰে, সেয়ে কেলছিয়াম, ইনচুলিন-ডেক্সট্ৰ'জ আৰু ডায়েলাইছিছৰ বাবে তৎক্ষণাৎ জনায়। পটাছিয়াম পৰিপূৰক, বেছি পটাছিয়ামযুক্ত আহাৰ বা পলমে হৃদযন্ত্ৰ বন্ধৰ বিপদ।");

add("nursing-446",
  "A patient after thyroid surgery develops a hoarse voice and then difficulty breathing with a swollen neck. The nurse should",
  "থাইৰয়ড অস্ত্ৰোপচাৰৰ পিছত ৰোগীৰ মাত ভাগে আৰু ডিঙি ওফন্দি উশাহ লোৱাত কষ্ট হয়। নাৰ্ছে",
  [["open the wound edges and call for emergency help", "ঘাঁৰ কিনাৰ খুলি জৰুৰী সহায় মতা"],
   ["give a hot drink to soothe the throat", "ডিঙি জুৰাবলৈ গৰম পানীয় দিয়া"],
   ["place the patient flat and observe", "ৰোগীক সমানকৈ শুৱাই পৰ্যবেক্ষণ কৰা"],
   ["reassure that hoarseness is expected after surgery", "অস্ত্ৰোপচাৰৰ পিছত মাত ভগা স্বাভাৱিক বুলি আশ্বাস দিয়া"]], 0,
  "Neck swelling with breathlessness after thyroid surgery is a haematoma compressing the airway, and releasing the sutures buys the minutes needed for definitive control. A hot drink or lying flat worsens obstruction, and hoarseness followed by breathlessness is not expected.",
  "থাইৰয়ড অস্ত্ৰোপচাৰৰ পিছত ডিঙি ওফন্দি উশাহ কষ্ট হ'ল শ্বাসপথত চাপ দিয়া ৰক্তগোট, আৰু চিলাই খুলি দিলে নিশ্চিত নিয়ন্ত্ৰণৰ বাবে প্ৰয়োজনীয় মিনিট পোৱা যায়। গৰম পানীয় বা সমানকৈ শুলে বন্ধ বেয়া হয়, আৰু মাত ভগাৰ পিছত উশাহ কষ্ট স্বাভাৱিক নহয়।");

add("nursing-447",
  "A patient with a plaster cast on the leg reports severe pain that is not relieved by analgesia, and the toes are pale and numb. The nurse should",
  "ভৰিত প্লাষ্টাৰৰ কাষ্ট থকা ৰোগীয়ে বেদনানাশকেৰেও নকমা তীব্ৰ বিষৰ কথা কয়, আঙুলি শেঁতা আৰু নীৰৱ। নাৰ্ছে",
  [["report immediately as possible compartment syndrome", "সম্ভাব্য কম্পাৰ্টমেণ্ট ছিনড্ৰ'ম বুলি তৎক্ষণাৎ জনোৱা"],
   ["give a stronger painkiller and reassess later", "আৰু শক্তিশালী বেদনানাশক দি পিছত পুনৰ পৰীক্ষা কৰা"],
   ["elevate the leg high above the heart", "ভৰি হৃদয়ৰ বহু ওপৰলৈ দাঙা"],
   ["massage the toes to improve circulation", "আঙুলিত মালিচ কৰি ৰক্তস্ৰাৱ বঢ়োৱা"]], 0,
  "Pain out of proportion with pallor and numbness under a cast is compartment syndrome, and the cast must be split before muscle dies. Stronger analgesia masks the sign, and elevation reduces arterial inflow further.",
  "কাষ্টৰ তলত শেঁতা আৰু নীৰৱতাৰ সৈতে অসামঞ্জস্যপূৰ্ণ বিষ হ'ল কম্পাৰ্টমেণ্ট ছিনড্ৰ'ম, আৰু পেশী মৰাৰ আগতে কাষ্ট কাটিব লাগে। শক্তিশালী বেদনানাশকে চিন ঢাকে, আৰু দাঙিলে ধমনীৰ প্ৰবাহ আৰু কমে।");

add("nursing-448",
  "A patient with a head injury who was alert becomes drowsy and has a pupil that is larger and reacts slowly. The nurse should",
  "আগতে সজাগ থকা মূৰৰ আঘাতৰ ৰোগী টোপনিয়াল হয় আৰু এটা চকুৰ গুটি ডাঙৰ হৈ লাহে প্ৰতিক্ৰিয়া কৰে। নাৰ্ছে",
  [["report at once as signs of rising intracranial pressure", "অন্তঃকৰ'টীয় চাপ বঢ়াৰ চিন বুলি তৎক্ষণাৎ জনোৱা"],
   ["record the observation and recheck in four hours", "পৰ্যবেক্ষণ লিখি চাৰি ঘণ্টাৰ পিছত পুনৰ চোৱা"],
   ["give a sedative so the patient can rest", "ৰোগীক বিশ্ৰাম দিবলৈ শান্তকাৰী দিয়া"],
   ["shine a torch and wait for the pupil to react fully", "টৰ্চ জ্বলাই গুটি সম্পূৰ্ণ প্ৰতিক্ৰিয়া কৰালৈ অপেক্ষা কৰা"]], 0,
  "Falling consciousness with a dilating pupil is the classic sign of an expanding intracranial lesion, and it is a neurosurgical emergency. A four-hour wait allows herniation, and sedation hides the very sign being monitored.",
  "চেতনা কমি চকুৰ গুটি ডাঙৰ হোৱা অন্তঃকৰ'টীয় ক্ষত বঢ়াৰ প্ৰচলিত চিন, আৰু ই স্নায়ুশল্যৰ জৰুৰী অৱস্থা। চাৰি ঘণ্টাৰ অপেক্ষাই হাৰ্নিয়েশ্যনত পৰিণত হয়, আৰু শান্তকাৰীয়ে পৰ্যবেক্ষণ কৰা চিনটোৱেই ঢাকে।");

add("nursing-449",
  "A patient with chronic obstructive pulmonary disease is on oxygen and becomes drowsy with a slow respiratory rate. The nurse should",
  "দীৰ্ঘকালীন অবৰোধক ফুসফুস ৰোগত থকা ৰোগীয়ে অক্সিজেন লৈ টোপনিয়াল হৈ উশাহৰ হাৰ কমে। নাৰ্ছে",
  [["reduce the oxygen to the prescribed low flow and report", "নিৰ্ধাৰিত কম প্ৰবাহলৈ অক্সিজেন কমাই জনোৱা"],
   ["increase the oxygen to the maximum flow", "অক্সিজেন আটাই বেছি প্ৰবাহলৈ বঢ়োৱা"],
   ["give a sedative to help him sleep", "টোপনিৰ বাবে শান্তকাৰী দিয়া"],
   ["sit him up and give a hot drink", "বহুৱাই গৰম পানীয় দিয়া"]], 0,
  "In chronic obstructive pulmonary disease the drive to breathe depends on low oxygen, so high flow oxygen can suppress breathing and cause carbon dioxide retention. Raising the flow or sedating deepens that, while the prescribed low flow is what keeps the patient safe.",
  "দীৰ্ঘকালীন অবৰোধক ফুসফুস ৰোগত উশাহৰ প্ৰেৰণা কম অক্সিজেনৰ ওপৰত নিৰ্ভৰশীল, সেয়ে বেছি প্ৰবাহে উশাহ দমন কৰি কাৰ্বন ডাইঅক্সাইড ৰখাই দিব পাৰে। প্ৰবাহ বঢ়ালে বা শান্ত কৰিলে তাক গভীৰ কৰে, আৰু নিৰ্ধাৰিত কম প্ৰবাহেই ৰোগীক সুৰক্ষিত ৰাখে।");

add("nursing-450",
  "A patient has been on bed rest for a week and now has a painful, swollen calf. The nurse should",
  "এসপ্তাহ শয্যা বিশ্ৰামত থকা ৰোগীৰ গোছা বিষাইছে আৰু ওফন্দিছে। নাৰ্ছে",
  [["keep the leg still and report for investigation of a clot", "ভৰি স্থিৰ ৰাখি ৰক্তগোটৰ পৰীক্ষাৰ বাবে জনোৱা"],
   ["massage the calf to relieve the swelling", "ওফন্দা কমাবলৈ গোছাত মালিচ কৰা"],
   ["encourage immediate walking to improve circulation", "ৰক্তস্ৰাৱ বঢ়াবলৈ তৎক্ষণাত খোজ কাঢ়িবলৈ উৎসাহিত কৰা"],
   ["apply a hot pack and wrap it tightly", "গৰম পোচ দি টানকৈ মেৰিওৱা"]], 0,
  "A painful swollen calf after immobility suggests deep vein thrombosis, and massage, exercise or tight wrapping can dislodge the clot into the pulmonary circulation. Stillness plus anticoagulation assessment is the safe course.",
  "গতিশীলতা নোহোৱাৰ পিছত বিষোৱা ওফন্দা গোছাই ডিপ ভেইন থ্ৰম্ব'ছিছৰ ইংগিত দিয়ে, আৰু মালিচ, ব্যায়াম বা টান মেৰিওৱাই গোটটো ফুসফুসৰ সংচলনলৈ ঠেলিব পাৰে। স্থিৰতা আৰু ৰক্ত পাতলকৰণৰ পৰীক্ষাই সুৰক্ষিত পথ।");

add("nursing-451",
  "A patient with a urinary catheter for five days develops fever and cloudy urine. The nurse should",
  "পাঁচ দিন ধৰি মূত্ৰ কেথেটৰ থকা ৰোগীৰ জ্বৰ আৰু ঘোলা প্ৰস্ৰাৱ। নাৰ্ছে",
  [["report for culture and consider early removal of the catheter", "কালচাৰৰ বাবে জনাই কেথেটৰ সোনকালে আঁতৰোৱাৰ কথা ভবা"],
   ["irrigate the bladder with an antibiotic solution daily", "দৈনিক এণ্টিবায়'টিক দ্ৰৱেৰে মূত্ৰাশয় ধুই দিয়া"],
   ["change the bag only and continue as before", "কেৱল বেগ সলনি কৰি আগৰ দৰে চলি যোৱা"],
   ["clamp the catheter to rest the bladder", "মূত্ৰাশয় বিশ্ৰাম দিবলৈ কেথেটৰ চেপি ধৰা"]], 0,
  "Catheter associated urinary infection is the commonest hospital acquired infection, and the single most effective step is to remove the catheter as soon as it is no longer needed. Routine irrigation and bag changes do not clear the biofilm on the catheter itself.",
  "কেথেটৰ সম্পৰ্কীয় মূত্ৰ সংক্ৰমণ চিকিৎসালয়ত হোৱা আটাই সাধাৰণ সংক্ৰমণ, আৰু আটাই ফলপ্ৰসূ উপায় হ'ল প্ৰয়োজন নোহোৱা হ'লেই কেথেটৰ আঁতৰোৱা। নিয়মীয়া ধোৱা আৰু বেগ সলনিয়ে কেথেটৰৰ ওপৰৰ জৈৱ-আৱৰণ আঁতৰাব নোৱাৰে।");

add("nursing-452",
  "A patient with severe burns over 30 per cent of the body is alert but thirsty. The nurse should",
  "শৰীৰৰ ৩০ শতাংশত গুৰুতৰ পোৰা ৰোগী সজাগ কিন্তু পিয়াহ লগা। নাৰ্ছে",
  [["withhold oral fluids and start intravenous replacement", "মুখে তৰল বন্ধ কৰি অন্তঃশিৰা পূৰণ আৰম্ভ কৰা"],
   ["give large amounts of cold water by mouth", "বহুত পৰিমাণে ঠাণ্ডা পানী মুখে দিয়া"],
   ["give a hot sweet drink to revive him", "সজীৱ কৰিবলৈ গৰম মিঠা পানীয় দিয়া"],
   ["wait for the doctor before giving any fluid", "তৰল দিয়াৰ আগতে ডাক্তৰলৈ অপেক্ষা কৰা"]], 0,
  "Major burns cause massive plasma loss, and the fluid must go intravenously because the gut is not reliable and vomiting risks aspiration. Large oral volumes can cause ileus and vomiting, and waiting allows hypovolaemic shock.",
  "ডাঙৰ পোৰাত প্লাজমাৰ বিশাল ক্ষতি হয়, আৰু তৰল অন্তঃশিৰাৰে যাব লাগে কাৰণ অন্ত্ৰ নিৰ্ভৰযোগ্য নহয় আৰু বমি হ'লে শ্বাসনলীত সোমাব পাৰে। বেছি মুখেৰে দিলে আইলিয়াছ আৰু বমি হয়, আৰু অপেক্ষা কৰিলে ৰক্তপৰিমাণজনিত শ্বক হয়।");

add("nursing-453",
  "A patient on warfarin has a nosebleed that will not stop and bruising on both arms. The nurse should",
  "ৱাৰফেৰিন লোৱা ৰোগীৰ নাকৰ ৰক্তস্ৰাৱ নবন্ধা আৰু দুয়ো হাতত দাগ। নাৰ্ছে",
  [["hold pressure and report for an urgent clotting test", "চাপ দি ধৰি জৰুৰী ৰক্ত জমা পৰীক্ষাৰ বাবে জনোৱা"],
   ["give the next warfarin dose early", "পৰৱৰ্তী ৱাৰফেৰিন মাত্ৰা আগতে দিয়া"],
   ["give vitamin K without reporting", "নজনোৱাকৈ ভিটামিন K দিয়া"],
   ["apply a hot compress to the nose", "নাকত গৰম পোচ দিয়া"]], 0,
  "Spontaneous bleeding with bruising suggests over-anticoagulation, and the international normalised ratio decides the reversal dose. An early warfarin dose worsens it, and vitamin K without a measured ratio can overcorrect and cause clotting.",
  "আপোনা আপুনি ৰক্তস্ৰাৱ আৰু দাগে অতি ৰক্ত পাতলতা বুজায়, আৰু আইএনআৰ-এই বিপৰীতকৰণৰ মাত্ৰা নিৰ্ণয় কৰে। আগতে ৱাৰফেৰিন দিলে বেয়া হয়, আৰু নজুখাকৈ ভিটামিন K দিলে অতিপৰিমাণে শুধৰণি হৈ ৰক্তগোটৰ বিপদ।");

add("nursing-454",
  "A patient with a colostomy says the pouch leaks and the skin around the stoma is red and broken. The nurse should",
  "ক'ল'ষ্টমি থকা ৰোগীয়ে পাউচ লিক হোৱা আৰু ষ্ট'মাৰ চাৰিওফালৰ ছাল ৰঙা আৰু ফটা বুলি কয়। নাৰ্ছে",
  [["measure the stoma and fit a correctly sized pouch with a skin barrier", "ষ্ট'মা জুখি ছাল সুৰক্ষাৰ সৈতে শুদ্ধ আকাৰৰ পাউচ লগোৱা"],
   ["apply a tight belt over the pouch", "পাউচৰ ওপৰত টান বেল্ট লগোৱা"],
   ["wash the area with spirit and leave it open", "স্পিৰিটেৰে ধুই খোলা এৰি দিয়া"],
   ["change the pouch only when it is completely full", "পাউচ সম্পূৰ্ণ ভৰিলেহে সলনি কৰা"]], 0,
  "Leakage comes from an ill-fitting pouch, and the effluent digests skin, so measuring the stoma and using a barrier with the right size is the fix. A tight belt or infrequent changes increase leakage, and spirit dries and damages the skin further.",
  "লিক ভুল আকাৰৰ পাউচৰপৰা হয়, আৰু নিঃসৰণে ছাল হজম কৰে, সেয়ে ষ্ট'মা জুখি শুদ্ধ আকাৰৰ সুৰক্ষাসহ পাউচ লগোৱাই সমাধান। টান বেল্ট বা কমকৈ সলনিয়ে লিক বঢ়ায়, আৰু স্পিৰিটে ছাল শুকাই আৰু নষ্ট কৰে।");

add("nursing-455",
  "A patient after a stroke has weakness on the right side and tends to ignore that side. The nurse should",
  "ষ্ট্ৰ'কৰ পিছত ৰোগীৰ সোঁফাল দুৰ্বল আৰু সেইফালে আওকাণ কৰে। নাৰ্ছে",
  [["place objects and approach from the affected side and protect the limb", "বস্তু ৰাখি আঘাতগ্ৰস্ত ফালৰপৰা যোৱা আৰু অংগ সুৰক্ষিত ৰখা"],
   ["attend only to the unaffected side to avoid confusion", "বিভ্ৰান্তি এৰাবলৈ কেৱল সুস্থ ফাললৈ মন দিয়া"],
   ["restrain the affected arm to prevent injury", "আঘাত ৰোধ কৰিবলৈ আঘাতগ্ৰস্ত হাত বান্ধি ৰখা"],
   ["keep the affected arm immobile under the blanket", "আঘাতগ্ৰস্ত হাত কম্বলৰ তলত অচল ৰখা"]], 0,
  "Approaching and placing objects on the affected side trains attention back to that side and protects the limb from injury. Ignoring it deepens the neglect, and immobility or restraint leads to contracture and shoulder pain.",
  "আঘাতগ্ৰস্ত ফালৰপৰা গৈ বস্তু ৰখিলে মনোযোগ সেইফালে ঘূৰি আহে আৰু অংগ আঘাতৰপৰা সুৰক্ষিত থাকে। আওকাণ কৰিলে উপেক্ষা গভীৰ হয়, আৰু অচলতা বা বন্ধনে সংকোচন আৰু কান্ধৰ বিষ আনে।");

add("nursing-456",
  "A patient with diabetes has a foot ulcer with black tissue at the edges and no feeling in the foot. The nurse should",
  "মধুমেহ ৰোগীৰ ভৰিত ঘাঁ, কিনাৰত ক'লা কলা আৰু ভৰিত অনুভূতি নাই। নাৰ্ছে",
  [["keep weight off the foot, clean the wound and report for specialist care", "ভৰিত ভাৰ নিদি ঘাঁ পৰিষ্কাৰ কৰি বিশেষজ্ঞৰ যতনৰ বাবে জনোৱা"],
   ["soak the foot in hot water daily", "দৈনিক গৰম পানীত ভৰি তিয়াই থোৱা"],
   ["cut away the black tissue at home", "ঘৰতে ক'লা কলা কাটি পেলোৱা"],
   ["apply a tight bandage to improve circulation", "ৰক্তস্ৰাৱ বঢ়াবলৈ টান বেণ্ডেজ লগোৱা"]], 0,
  "Necrotic tissue with loss of sensation is a neuropathic diabetic ulcer at risk of osteomyelitis, and offloading with specialist debridement is what saves the foot. Hot soaking and home cutting introduce infection, and tight bandaging further reduces perfusion.",
  "অনুভূতি হেৰুৱাৰ সৈতে মৃত কলা হ'ল স্নায়ুজনিত মধুমেহ ঘাঁ, য'ত অস্থি সংক্ৰমণৰ বিপদ, আৰু ভাৰ নিদিয়া লগতে বিশেষজ্ঞৰ পৰিষ্কাৰেই ভৰি ৰক্ষা কৰে। গৰম পানী আৰু ঘৰতে কাটিলে সংক্ৰমণ হয়, আৰু টান বেণ্ডেজে ৰক্তস্ৰাৱ আৰু কমায়।");

add("nursing-457",
  "A patient has been vomiting coffee-ground material. The nurse should",
  "ৰোগীয়ে কফিৰ গুড়িৰ দৰে পদাৰ্থ বমি কৰিছে। নাৰ্ছে",
  [["keep the patient nil by mouth and report at once", "ৰোগীক মুখে একো নিদি তৎক্ষণাৎ জনোৱা"],
   ["give a hot drink to settle the stomach", "পেট শান্ত কৰিবলৈ গৰম পানীয় দিয়া"],
   ["give oral antacids and observe", "মুখে এণ্টাএচিড দি পৰ্যবেক্ষণ কৰা"],
   ["encourage a soft diet to buffer the acid", "এচিড প্ৰশমিত কৰিবলৈ নরম আহাৰ খুৱাই দিয়া"]], 0,
  "Coffee-ground vomit means digested blood from an upper gastrointestinal bleed, and the patient must stay nil by mouth for endoscopy. Food, drink or antacid by mouth obscures the view and may provoke further bleeding.",
  "কফিৰ গুড়িৰ দৰে বমি মানে ওপৰৰ পাচনতন্ত্ৰৰ ৰক্তস্ৰাৱৰপৰা হজম হোৱা তেজ, আৰু এণ্ড'স্কপিৰ বাবে ৰোগীয়ে মুখে একো নাখাব। আহাৰ, পানীয় বা এণ্টাএচিডে দৃশ্য ঢাকে আৰু ৰক্তস্ৰাৱ বঢ়াব পাৰে।");

add("nursing-458",
  "A patient is one day after a total hip replacement and the nurse needs to position him. The nurse should",
  "সম্পূৰ্ণ নিতম্ব প্ৰতিস্থাপনৰ এদিন পিছত নাৰ্ছে ৰোগীৰ অৱস্থান কৰিব লাগে। নাৰ্ছে",
  [["keep the legs apart with a pillow and avoid bending the hip past ninety degrees", "ভৰিৰ মাজত গাৰু দি নিতম্ব নব্বৈ ডিগ্ৰীতকৈ বেছি নভাঁ‌জ কৰা"],
   ["turn him fully onto the operated side", "অপাৰেট কৰা ফালে সম্পূৰ্ণকৈ ঘূৰোৱা"],
   ["let him sit on a low chair to exercise", "ব্যায়ামৰ বাবে নিচা চকীত বহিবলৈ দিয়া"],
   ["cross his legs for comfort", "আৰামৰ বাবে ভৰি জোকাৰি ৰখা"]], 0,
  "A new hip dislocates if the leg is adducted, internally rotated or flexed beyond ninety degrees, so a pillow between the legs and hip precautions protect it. Turning onto the operated side, a low chair or crossing the legs all breach those precautions.",
  "নতুন নিতম্ব ভৰি লগাই দিয়া, ভিতৰলৈ ঘূৰোৱা বা নব্বৈ ডিগ্ৰীতকৈ বেছি ভাঁ‌জিলে খুলি যায়, সেয়ে ভৰিৰ মাজত গাৰু আৰু নিতম্বৰ সতৰ্কতা ৰক্ষা কৰে। অপাৰেট ফালে ঘূৰোৱা, নিচা চকী বা ভৰি জোকাৰিলে সেই সতৰ্কতা ভাঙে।");

add("nursing-459",
  "A patient on a ventilator has secretions that need suctioning. Before suctioning the nurse should",
  "ভেণ্টিলেটৰত থকা ৰোগীৰ শ্লেষ্মা চাকশ্যন কৰিব লাগে। চাকশ্যনৰ আগতে নাৰ্ছে",
  [["pre-oxygenate and explain what will happen", "আগতে অক্সিজেন দি কি হ'ব বুজোৱা"],
   ["suction continuously for two minutes", "দুই মিনিট ধৰি অবিৰতভাৱে চাকশ্যন কৰা"],
   ["instil cold water into the tube", "নলীত ঠাণ্ডা পানী ঢালা"],
   ["disconnect the oxygen supply during the procedure", "পদ্ধতি চলোতে অক্সিজেন যোগান বিচ্ছিন্ন কৰা"]], 0,
  "Suctioning removes oxygen as well as secretions, so pre-oxygenation prevents the desaturation and bradycardia that follow. Prolonged suctioning causes hypoxia and mucosal damage, and disconnecting oxygen removes the reserve the patient needs.",
  "চাকশ্যনে শ্লেষ্মাৰ লগতে অক্সিজেনো আঁতৰায়, সেয়ে আগতে অক্সিজেন দিলে পিছৰ অক্সিজেন হ্ৰাস আৰু হৃদস্পন্দন মন্থৰতা ৰোধ হয়। দীৰ্ঘ চাকশ্যনে হাইপক্সিয়া আৰু শ্লেষ্মাৰ ক্ষতি কৰে, আৰু অক্সিজেন বিচ্ছিন্ন কৰিলে ৰোগীৰ সংচিত অক্সিজেন আঁতৰে।");

add("nursing-460",
  "A patient reports sudden severe chest pain with breathlessness two weeks after a leg fracture. The nurse should",
  "ভৰিৰ হাড় ভঙাৰ দুই সপ্তাহৰ পিছত ৰোগীয়ে হঠাতে তীব্ৰ বুকুৰ বিষ আৰু উশাহ কষ্টৰ কথা কয়। নাৰ্ছে",
  [["keep him still, give oxygen and report immediately", "স্থিৰ ৰাখি অক্সিজেন দি তৎক্ষণাৎ জনোৱা"],
   ["encourage him to walk to relieve the pain", "বিষ কমাবলৈ খোজ কাঢ়িবলৈ উৎসাহিত কৰা"],
   ["give a strong painkiller and observe", "শক্তিশালী বেদনানাশক দি পৰ্যবেক্ষণ কৰা"],
   ["apply a hot pack to the chest", "বুকুত গৰম পোচ দিয়া"]], 0,
  "Sudden chest pain with breathlessness after a fracture is a pulmonary embolism until proved otherwise, and oxygen plus urgent reporting is what limits the damage. Walking mobilises further clots, and analgesia alone leaves the obstruction untreated.",
  "ভঙাৰ পিছত হঠাতে বুকুৰ বিষ আৰু উশাহ কষ্ট অন্যথা প্ৰমাণিত নোহোৱালৈকে ফুসফুসৰ ধমনী বন্ধ হোৱা, আৰু অক্সিজেন তথা তৎক্ষণাৎ জনোৱাই ক্ষতি সীমিত কৰে। খোজ কাঢ়িলে আৰু গোট ওলায়, আৰু কেৱল বেদনানাশকে বন্ধন অবিচিকিৎসিত এৰে।");

/* ================= pharmacology ================= */
useLeaf("pharmacology");

add("nursing-461",
  "A patient on gentamicin reports ringing in the ears and reduced hearing. The nurse should",
  "জেণ্টামাইচিন লোৱা ৰোগীয়ে কাণত ৰিঙনি আৰু শ্ৰৱণশক্তি কমাৰ কথা কয়। নাৰ্ছে",
  [["stop the drug and report at once because it is ototoxic", "ঔষধ বন্ধ কৰি তৎক্ষণাৎ জনোৱা কাৰণ ই শ্ৰৱণ-বিষাক্ত"],
   ["continue the drug because ringing settles", "ৰিঙনি কমি যাব বাবে ঔষধ চলাই ৰখা"],
   ["give a higher dose to clear the infection faster", "সংক্ৰমণ সোনকালে আঁতৰাবলৈ বেছি মাত্ৰা দিয়া"],
   ["reassure him that all antibiotics cause this", "সকলো এণ্টিবায়'টিকে ইয়াৰ সৃষ্টি কৰে বুলি আশ্বাস দিয়া"]], 0,
  "Aminoglycosides damage the cochlea and the damage is permanent once established, so the drug is stopped and reported immediately. Continuing or increasing the dose deepens irreversible hearing loss.",
  "এমিন'গ্লাইক'ছাইডে কৰ্ণপটহ নষ্ট কৰে আৰু ক্ষতি স্থাপিত হ'লে স্থায়ী হয়, সেয়ে ঔষধ বন্ধ কৰি তৎক্ষণাৎ জনায়। চলাই ৰখা বা মাত্ৰা বঢ়ালে অপ্ৰতিকাৰ্য শ্ৰৱণহানি গভীৰ হয়।");

add("nursing-462",
  "A patient on furosemide has muscle weakness and a serum potassium of 2.9. The nurse should",
  "ফুৰ'ছেমাইড লোৱা ৰোগীৰ পেশী দুৰ্বল আৰু ৰক্ত পটাছিয়াম ২.৯। নাৰ্ছে",
  [["report the value and prepare potassium replacement as ordered", "মানটো জনাই নিৰ্দেশ অনুসৰি পটাছিয়াম পূৰণৰ বাবে সাজু হোৱা"],
   ["withhold all fluids for the day", "দিনটো সকলো তৰল বন্ধ ৰখা"],
   ["give an extra dose of furosemide", "অতিৰিক্ত ফুৰ'ছেমাইড মাত্ৰা দিয়া"],
   ["encourage a high salt diet", "বেছি লৱণযুক্ত আহাৰ খাবলৈ উৎসাহিত কৰা"]], 0,
  "Loop diuretics lose potassium in the urine, and a level below three causes weakness, arrhythmia and ileus. An extra diuretic dose worsens the loss, and salt loading does not correct potassium.",
  "লুপ মূত্ৰকাৰীয়ে প্ৰস্ৰাৱৰ সৈতে পটাছিয়াম হেৰুৱায়, আৰু তিনিৰ তলৰ মানে দুৰ্বলতা, হৃদস্পন্দনৰ অনিয়ম আৰু আইলিয়াছ কৰে। অতিৰিক্ত মূত্ৰকাৰীয়ে ক্ষতি বঢ়ায়, আৰু লৱণে পটাছিয়াম শুধৰণি নকৰে।");

add("nursing-463",
  "A patient prescribed sublingual glyceryl trinitrate for angina asks why it is not swallowed. The nurse explains that sublingual administration",
  "এনজাইনাৰ বাবে জিভাৰ তলত গ্লাইচেৰিল ট্ৰাইনাইট্ৰেট লোৱা ৰোগীয়ে কিয় গিলি নাখায় সোধে। নাৰ্ছে বুজায় — জিভাৰ তলত দিলে",
  [["avoids first pass metabolism in the liver and acts faster", "যকৃতৰ প্ৰথম পথ বিপাক এৰাই দ্ৰুত ক্ৰিয়া কৰে"],
   ["tastes better than swallowing", "গিলাৰ পৰা সোৱাদ ভাল"],
   ["is absorbed only in the stomach", "কেৱল পেটত শোষিত হয়"],
   ["prevents addiction", "আসক্তি ৰোধ কৰে"]], 0,
  "Blood from under the tongue drains into the systemic circulation, bypassing the liver, so the drug reaches the heart in a minute or two. Swallowed nitrate is largely destroyed by the liver before it acts, and taste or addiction is irrelevant.",
  "জিভাৰ তলৰ তেজ যকৃত এৰাই পোনপটীয়া সংচলনলৈ যায়, সেয়ে ঔষধে এক-দুই মিনিটতে হৃদয়ত উপনীত হয়। গিলি লোৱা নাইট্ৰেট যকৃতত ক্ৰিয়াৰ আগতেই বেছিভাগ নষ্ট হয়, আৰু সোৱাদ বা আসক্তি অপ্ৰাসংগিক।");

add("nursing-464",
  "A patient is prescribed two drugs that both prolong the QT interval. The nurse's most important action is to",
  "দুটা ঔষধ নিৰ্ধাৰিত, দুয়োটাই কিউটি অন্তৰাল দীঘল কৰে। নাৰ্ছৰ আটাই গুৰুত্বপূৰ্ণ কাৰ্য",
  [["clarify the combination with the prescriber before giving", "দিয়াৰ আগতে প্ৰেছক্ৰাইবাৰৰ সৈতে সংযোগটো স্পষ্ট কৰা"],
   ["give both at the same time to save time", "সময় বচাবলৈ দুয়োটা একেলগে দিয়া"],
   ["give one dose double to reduce the number of tablets", "বড়িৰ সংখ্যা কমাবলৈ এটা মাত্ৰা দুগুণ কৰা"],
   ["stop one drug without informing anyone", "কাকো নজনোৱাকৈ এটা ঔষধ বন্ধ কৰা"]], 0,
  "Two QT prolonging drugs together increase the risk of torsades de pointes, so the prescriber must confirm or adjust the order. Giving both, doubling a dose or stopping a drug unilaterally all leave the patient unsafe.",
  "দুটা কিউটি দীঘলকৰণকাৰী ঔষধ একেলগে দিলে টৰ্ছাড ডে পইণ্টৰ বিপদ বাঢ়ে, সেয়ে প্ৰেছক্ৰাইবাৰে নিশ্চিত বা শুধৰণি কৰিব লাগে। দুয়োটা দিয়া, মাত্ৰা দুগুণ কৰা বা নিজেই এটা বন্ধ কৰিলে ৰোগী অসুৰক্ষিত থাকে।");

add("nursing-465",
  "A patient on insulin has a blood glucose of 55 mg per decilitre and is awake and able to swallow. The nurse should give",
  "ইনচুলিন লোৱা ৰোগীৰ ৰক্ত শৰ্কৰা প্ৰতি ডেচিলিট্ৰত ৫৫, সজাগ আৰু গিলিব পাৰে। নাৰ্ছে দিয়া উচিত",
  [["fifteen grams of fast acting carbohydrate and recheck in fifteen minutes", "পোন্ধৰ গ্ৰাম দ্ৰুত ক্ৰিয়াৰ শৰ্কৰা দি পোন্ধৰ মিনিটত পুনৰ পৰীক্ষা কৰা"],
   ["the next scheduled insulin dose", "পৰৱৰ্তী নিৰ্ধাৰিত ইনচুলিন মাত্ৰা"],
   ["a high protein meal only", "কেৱল বেছি প্ৰ'টিনযুক্ত আহাৰ"],
   ["water and bed rest", "পানী আৰু শয্যা বিশ্ৰাম"]], 0,
  "The rule for a conscious hypoglycaemic patient is fifteen grams of fast carbohydrate, wait fifteen minutes and recheck, repeating until the level is safe. Insulin worsens it, and protein or water raise glucose far too slowly.",
  "সচেতন হাইপ'গ্লাইছিমিয়া ৰোগীৰ নিয়ম হ'ল পোন্ধৰ গ্ৰাম দ্ৰুত শৰ্কৰা, পোন্ধৰ মিনিট অপেক্ষা আৰু পুনৰ পৰীক্ষা, মান সুৰক্ষিত নোহোৱালৈকে পুনৰাবৃত্তি। ইনচুলিনে বেয়া কৰে, আৰু প্ৰ'টিন বা পানীয়ে শৰ্কৰা অতি লাহে বঢ়ায়।");

add("nursing-466",
  "A patient is receiving intravenous vancomycin and develops flushing over the face and trunk with itching during the infusion. The nurse should",
  "অন্তঃশিৰাত ভেনক'মাইচিন লোৱা ৰোগীৰ ইনফিউশ্যন চলোতে মুখ আৰু শৰীৰত ৰঙা দাগ আৰু খুজুতি ওলায়। নাৰ্ছে",
  [["slow the infusion and report the reaction", "ইনফিউশ্যনৰ গতি কমাই প্ৰতিক্ৰিয়াৰ কথা জনোৱা"],
   ["increase the rate to finish quickly", "সোনকালে শেষ কৰিবলৈ গতি বঢ়োৱা"],
   ["give the next dose as a rapid bolus", "পৰৱৰ্তী মাত্ৰা দ্ৰুত ব'লাছ হিচাপে দিয়া"],
   ["ignore it because flushing is harmless", "ৰঙা দাগ নিৰীহ বাবে আওকাণ কৰা"]], 0,
  "Rapid vancomycin infusion releases histamine and causes the flushing known as red man syndrome, and slowing the rate relieves it. A faster rate or a bolus worsens the reaction and can cause hypotension.",
  "ভেনক'মাইচিন দ্ৰুত দিলে হিষ্টামিন ওলাই ৰঙা মান ছিনড্ৰ'ম হয়, আৰু গতি কমালে তাক শাম কৰে। বেছি গতি বা ব'লাছে প্ৰতিক্ৰিয়া বেয়া কৰি নিম্ন ৰক্তচাপ কৰিব পাৰে।");

add("nursing-467",
  "A patient asks why the doctor ordered a loading dose of an antibiotic. The nurse explains that a loading dose",
  "ৰোগীয়ে ডাক্তৰে এণ্টিবায়'টিকৰ ল'ডিং মাত্ৰা কিয় নিৰ্ধাৰণ কৰিলে সোধে। নাৰ্ছে বুজায় — ল'ডিং মাত্ৰাই",
  [["raises the blood level to therapeutic range quickly", "ৰক্তৰ মান দ্ৰুতভাৱে চিকিৎসাযোগ্য পৰিসৰলৈ তোলে"],
   ["reduces the total number of doses needed", "প্ৰয়োজনীয় মুঠ মাত্ৰাৰ সংখ্যা কমায়"],
   ["prevents all side effects", "সকলো পাৰ্শ্বক্ৰিয়া ৰোধ কৰে"],
   ["replaces the need for a maintenance dose", "ৰক্ষণ মাত্ৰাৰ প্ৰয়োজন আঁতৰায়"]], 0,
  "A loading dose fills the body's distribution volume so the concentration reaches the therapeutic window at once, after which maintenance doses keep it there. It does not shorten the course or replace maintenance, and it does not remove side effects.",
  "ল'ডিং মাত্ৰাই শৰীৰৰ বিতৰণ আয়তন পূৰাই ঘনত্ব তৎক্ষণাৎ চিকিৎসাযোগ্য সীমালৈ তোলে, তাৰ পিছত ৰক্ষণ মাত্ৰাই তাক ৰাখে। ই কোৰ্চ নিচুৰ্তি নকৰে, ৰক্ষণ মাত্ৰা নসলে, আৰু পাৰ্শ্বক্ৰিয়া নাইকিয়া নকৰে।");

add("nursing-468",
  "A patient on isoniazid reports numbness and tingling in the feet. The nurse should anticipate that the prescriber will add",
  "আইছ'নিয়াজিড লোৱা ৰোগীয়ে ভৰিত নীৰৱতা আৰু জিনজিননিৰ কথা কয়। নাৰ্ছে আশা কৰে প্ৰেছক্ৰাইবাৰে যোগ কৰিব",
  [["pyridoxine", "পাইৰিডক্সিন"],
   ["rifampicin", "ৰিফাম্পিচিন"],
   ["streptomycin", "ষ্ট্ৰেপ্ট'মাইচিন"],
   ["ethambutol", "ইথাম্বিউট'ল"]], 0,
  "Isoniazid interferes with pyridoxine metabolism and causes peripheral neuropathy, so vitamin B6 is given with it. The other drugs are antitubercular agents in their own right and do not treat the neuropathy.",
  "আইছ'নিয়াজিডে পাইৰিডক্সিনৰ বিপাকত বাধা দি পেৰিফেৰেল নিউৰ'পেথি কৰে, সেয়ে তাৰ লগত ভিটামিন B৬ দিয়া হয়। আনবোৰ নিজেই যক্ষ্মাৰোধী ঔষধ আৰু নিউৰ'পেথিৰ চিকিৎসা নকৰে।");

add("nursing-469",
  "A patient on morphine for cancer pain develops constipation. The nurse should",
  "কৰ্কটৰ বিষৰ বাবে মৰফিন লোৱা ৰোগীৰ কোষ্ঠকাঠিন্য হয়। নাৰ্ছে",
  [["start a stool softener and laxative prophylactically with fluids and fibre", "তৰল আৰু আঁহৰ লগতে প্ৰতিৰোধমূলকভাৱে মল নৰমকৰণকাৰী আৰু জোলাপ আৰম্ভ কৰা"],
   ["reduce the morphine to half the dose", "মৰফিন আধালৈ কমোৱা"],
   ["advise the patient to drink less water", "কম পানী খাবলৈ পৰামৰ্শ দিয়া"],
   ["give an enema every day indefinitely", "অনিৰ্দিষ্টকাল দৈনিক ইনিমা দিয়া"]], 0,
  "Opioids slow gut motility predictably, so a softener plus a stimulant laxative is started alongside the opioid rather than waiting. Cutting the dose leaves the pain uncontrolled, and less fluid worsens the stool.",
  "অপিঅ'ইডে অন্ত্ৰৰ গতি নিশ্চিতভাৱে লেহেমীয়া কৰে, সেয়ে অপিঅ'ইডৰ লগে লগেই নৰমকৰণকাৰী আৰু উদ্দীপক জোলাপ আৰম্ভ কৰা হয়, অপেক্ষা নকৰি। মাত্ৰা কমালে বিষ অনিয়ন্ত্ৰিত থাকে, আৰু কম পানীয়ে মল আৰু কঠিন কৰে।");

add("nursing-470",
  "A patient is prescribed an intramuscular injection of an irritant drug. To reduce pain the nurse should",
  "জ্বলা-পোৰা কৰা ঔষধৰ পেশীত ইনজেকচন নিৰ্ধাৰিত। বিষ কমাবলৈ নাৰ্ছে",
  [["use the ventrogluteal site and inject slowly after aspirating", "ভেণ্ট্ৰ'গ্লুটিয়েল ঠাই লৈ চিৰিঞ্জ টানি চাই লাহে লাহে দিয়া"],
   ["inject rapidly into the deltoid", "ডেল্টইডত দ্ৰুতগতিত দিয়া"],
   ["use the shortest needle available", "উপলব্ধ আটাই চুটি ছুচ ব্যৱহাৰ কৰা"],
   ["massage the site hard afterwards", "পিছত ঠাইত জোৰেৰে মালিচ কৰা"]], 0,
  "The ventrogluteal site has the thickest muscle and fewest nerves and vessels, and slow injection lets the tissue accommodate the volume. Rapid deltoid injection and a short needle deposit irritant near nerve endings, and hard massage increases trauma.",
  "ভেণ্ট্ৰ'গ্লুটিয়েল ঠাইত আটাই ডাঠ পেশী আৰু আটাই কম স্নায়ু-ৰক্তনলী, আৰু লাহে দিলে কলাই আয়তন গ্ৰহণ কৰে। ডেল্টইডত দ্ৰুত আৰু চুটি ছুচে জ্বলনকাৰী ঔষধ স্নায়ুৰ ওচৰত ৰাখে, আৰু জোৰকৈ মালিচে আঘাত বঢ়ায়।");

add("nursing-471",
  "A pregnant woman asks whether she can take the medicine prescribed for her husband's infection. The nurse should",
  "গৰ্ভৱতী মহিলাই স্বামীৰ সংক্ৰমণৰ ঔষধ ল'ব পাৰে নে নাই সোধে। নাৰ্ছে",
  [["explain that many drugs cross the placenta and she must see her own doctor", "বহু ঔষধে নালী প্লেছেৰে পাৰ হয় বুলি বুজাই নিজৰ ডাক্তৰক চোৱা উচিত বুলি কোৱা"],
   ["give her the same dose because infection is infection", "সংক্ৰমণেই সংক্ৰমণ বাবে একেই মাত্ৰা দিয়া"],
   ["tell her any drug is safe after twelve weeks", "বাৰ সপ্তাহৰ পিছত যিকোনো ঔষধ সুৰক্ষিত বুলি কোৱা"],
   ["advise her to take half the adult dose", "প্ৰাপ্তবয়স্কৰ আধা মাত্ৰা ল'বলৈ পৰামৰ্শ দিয়া"]], 0,
  "Teratogenic risk is highest in the first trimester and some drugs harm the fetus at any stage, so self medication from another person's prescription is unsafe. Halving a dose does not remove the risk, and no drug is safe simply because twelve weeks have passed.",
  "গৰ্ভাৱস্থাৰ প্ৰথম তিনিমাহত জন্ম-বিকৃতিৰ বিপদ আটাই বেছি আৰু কিছুমান ঔষধে যিকোনো স্তৰত শিশুৰ ক্ষতি কৰে, সেয়ে আনৰ প্ৰেছক্ৰিপচনৰপৰা নিজে ঔষধ লোৱা অসুৰক্ষিত। মাত্ৰা আধা কৰিলে বিপদ নাযায়, আৰু বাৰ সপ্তাহ পাৰ হ'লেই ঔষধ সুৰক্ষিত নহয়।");

add("nursing-472",
  "A patient is to receive a drug by the subcutaneous route. The nurse should",
  "ঔষধ ত্বকৰ তলত দিব লাগে। নাৰ্ছে",
  [["use the abdomen, pinch the skin and inject at forty-five to ninety degrees", "পেট লৈ ছাল টানি ৪৫ৰপৰা ৯০ ডিগ্ৰীত ইনজেকচন দিয়া"],
   ["inject deep into the deltoid muscle", "ডেল্টইড পেশীত গভীৰকৈ দিয়া"],
   ["inject into a scarred area for better absorption", "ভাল শোষণৰ বাবে দাগ থকা ঠাইত দিয়া"],
   ["massage firmly after the injection", "ইনজেকচনৰ পিছত জোৰেৰে মালিচ কৰা"]], 0,
  "Subcutaneous tissue over the abdomen is well supplied with capillaries and the pinched skin lifts it clear of muscle. Deep muscle injection changes the absorption rate, scars absorb poorly, and massage can cause bruising and alter release.",
  "পেটৰ ত্বকৰ তলৰ কলাত কেশিকাৰ ৰক্তনলী ভাল, আৰু ছাল টানি ধৰিলে পেশীৰপৰা আঁতৰে। পেশীত গভীৰকৈ দিলে শোষণৰ হাৰ সলনি হয়, দাগে দুৰ্বলভাৱে শোষে, আৰু মালিচে দাগ পেলাই নিঃসৰণ সলনি কৰিব পাৰে।");

add("nursing-473",
  "A patient is prescribed a drug that is known to cause photosensitivity. The nurse should advise the patient to",
  "ফট'সংবেদনশীলতা কৰা ঔষধ নিৰ্ধাৰিত। নাৰ্ছে পৰামৰ্শ দিয়া উচিত",
  [["avoid direct sunlight and use protective clothing and sunscreen", "পোনপটীয়া ৰ'দ এৰি ৰক্ষাকাৰী কাপোৰ আৰু ছানস্ক্ৰীণ ব্যৱহাৰ কৰা"],
   ["sunbathe to build tolerance", "সহনশীলতা গঢ়িবলৈ ৰ'দত বহা"],
   ["take the drug only at night and go out in the sun freely", "ঔষধ কেৱল ৰাতি লৈ দিনত মুকলিকৈ ৰ'দত ঘূৰা"],
   ["stop the drug on the first sunny day", "প্ৰথম ৰ'দৰ দিনাই ঔষধ বন্ধ কৰা"]], 0,
  "Photosensitivity produces exaggerated sunburn or rash on exposed skin, and avoidance plus sunscreen prevents it while the course continues. Deliberate sun exposure provokes the reaction, and stopping treatment without advice leaves the illness untreated.",
  "ফট'সংবেদনশীলতাই খোলা ছালত অত্যধিক ৰ'দপোৰা বা দাগ কৰে, আৰু এৰি চলা লগতে ছানস্ক্ৰীণে কোৰ্চ চলি থকাৰ সময়তে তাক ৰোধ কৰে। ইচ্ছাকৃতভাৱে ৰ'দত বহিলে প্ৰতিক্ৰিয়া হয়, আৰু পৰামৰ্শ নোহোৱাকৈ বন্ধ কৰিলে ৰোগ অবিচিকিৎসিত থাকে।");

add("nursing-474",
  "A patient on lithium for a mood disorder develops vomiting, tremor and confusion. The nurse should",
  "মুড ডিছঅৰ্ডাৰৰ বাবে লিথিয়াম লোৱা ৰোগীৰ বমি, কম্পন আৰু বিভ্ৰান্তি হয়। নাৰ্ছে",
  [["hold the next dose and report for a serum level at once", "পৰৱৰ্তী মাত্ৰা বন্ধ কৰি তৎক্ষণাৎ ৰক্তৰ মানৰ বাবে জনোৱা"],
   ["give the next dose to keep the level steady", "মান স্থিৰ ৰাখিবলৈ পৰৱৰ্তী মাত্ৰা দিয়া"],
   ["advise a low salt diet and continue", "কম লৱণযুক্ত আহাৰ লৈ চলি যাবলৈ কোৱা"],
   ["give plenty of fluids and ignore the tremor", "বহুত তৰল দি কম্পন আওকাণ কৰা"]], 0,
  "The therapeutic range of lithium is narrow and vomiting, tremor and confusion are signs of toxicity, so the dose is held and a level measured urgently. Continuing the drug, or a low salt diet that raises lithium retention, deepens the toxicity.",
  "লিথিয়ামৰ চিকিৎসাযোগ্য সীমা সৰু আৰু বমি, কম্পন তথা বিভ্ৰান্তি বিষক্ৰিয়াৰ চিন, সেয়ে মাত্ৰা বন্ধ কৰি জৰুৰীভাৱে মান জোখা হয়। ঔষধ চলাই ৰখা বা লিথিয়াম ৰখাই দিয়া কম লৱণযুক্ত আহাৰে বিষক্ৰিয়া গভীৰ কৰে।");

add("nursing-475",
  "A patient is prescribed an antibiotic every eight hours but the ward is busy and the dose is given two hours late. The nurse should",
  "আঠ ঘণ্টাৰ মূৰে মূৰে এণ্টিবায়'টিক নিৰ্ধাৰিত কিন্তু ৱাৰ্ড ব্যস্ত হোৱাৰ বাবে মাত্ৰা দুই ঘণ্টা পলমকৈ দিয়া হ'ল। নাৰ্ছে",
  [["document the delay and give the dose without doubling it", "পলম লিখি মাত্ৰা দুগুণ নকৰাকৈ দিয়া"],
   ["give a double dose to catch up", "পূৰণ কৰিবলৈ দুগুণ মাত্ৰা দিয়া"],
   ["skip the dose entirely and wait for the next one", "মাত্ৰাটো এৰি পৰৱৰ্তীটোলৈ অপেক্ষা কৰা"],
   ["change the frequency to twelve hourly without orders", "নিৰ্দেশ নোহোৱাকৈ বাৰ ঘণ্টালৈ সলনি কৰা"]], 0,
  "The blood level must stay above the minimum inhibitory concentration, and doubling a dose spikes the level into toxicity without restoring the gap. Skipping loses cover, and changing the interval needs a prescriber's order.",
  "ৰক্তৰ মান ন্যূনতম প্ৰতিৰোধক ঘনত্বৰ ওপৰত থাকিব লাগে, আৰু মাত্ৰা দুগুণ কৰিলে ব্যৱধান নপূৰোৱাকৈ বিষক্ৰিয়াৰ সীমালৈ যায়। এৰি দিলে সুৰক্ষা হেৰায়, আৰু অন্তৰাল সলনি কৰিবলৈ প্ৰেছক্ৰাইবাৰৰ নিৰ্দেশ লাগে।");

add("nursing-476",
  "A patient with asthma uses a salbutamol inhaler more than ten times a day and still wheezes. The nurse should",
  "এজমাৰ ৰোগীয়ে দিনত দহবাৰৰো বেছি ছালবিউটামল ইনহেলাৰ ব্যৱহাৰ কৰিও শ্বাসত শব্দ হয়। নাৰ্ছে",
  [["report because frequent reliever use means the asthma is not controlled", "ঘনাই উপশমকাৰী ব্যৱহাৰ মানে এজমা নিয়ন্ত্ৰিত নহয় বাবে জনোৱা"],
   ["advise using it more often", "আৰু ঘনাই ব্যৱহাৰ কৰিবলৈ পৰামৰ্শ দিয়া"],
   ["stop the inhaler completely", "ইনহেলাৰ সম্পূৰ্ণে বন্ধ কৰা"],
   ["add a second reliever inhaler", "দ্বিতীয় উপশমকাৰী ইনহেলাৰ যোগ কৰা"]], 0,
  "A reliever needed more than a few times a week signals inadequate control and the need for a preventer and review. Using more reliever masks worsening disease, and stopping it removes the rescue the patient depends on.",
  "সপ্তাহত কেইবাবাৰৰো বেছি উপশমকাৰী লাগিলে নিয়ন্ত্ৰণ অসম্পূৰ্ণ আৰু প্ৰতিৰোধক ঔষধ তথা পৰ্যালোচনাৰ প্ৰয়োজন বুজায়। বেছি উপশমকাৰীয়ে বেয়া হোৱা ৰোগ ঢাকে, আৰু বন্ধ কৰিলে ৰোগীৰ ওপৰত নিৰ্ভৰশীল উদ্ধাৰক ঔষধ আঁতৰে।");

add("nursing-477",
  "A patient has been prescribed an oral iron supplement. The nurse advises taking it",
  "মুখে লোৰ পৰিপূৰক নিৰ্ধাৰিত। নাৰ্ছে ল'বলৈ পৰামৰ্শ দিয়ে",
  [["on an empty stomach with vitamin C, avoiding tea", "পেট খালী অৱস্থাত ভিটামিন C ৰ সৈতে, চাহ এৰি"],
   ["with strong tea to improve absorption", "শোষণ বঢ়াবলৈ ডাঠ চাহৰ সৈতে"],
   ["with milk to reduce stomach upset", "পেটৰ অস্বস্তি কমাবলৈ গাখীৰৰ সৈতে"],
   ["only at bedtime with antacids", "কেৱল শোৱাৰ সময়ত এণ্টাএচিডৰ সৈতে"]], 0,
  "Ascorbic acid keeps iron in the absorbable ferrous form, while tannin in tea and calcium in milk bind it and cut absorption. Antacids raise gastric pH and reduce it further, so empty stomach with vitamin C is best.",
  "এছকৰবিক এচিডে লো শোষণযোগ্য ফেৰাছ ৰূপত ৰাখে, কিন্তু চাহৰ টেনিন আৰু গাখীৰৰ কেলছিয়ামে তাক বান্ধি শোষণ কমায়। এণ্টাএচিডে পেটৰ পিএইচ বঢ়াই আৰু কমায়, সেয়ে পেট খালী অৱস্থাত ভিটামিন C ৰ সৈতে শ্ৰেষ্ঠ।");

add("nursing-478",
  "A patient is receiving a blood transfusion and after ten minutes has a fever, chills and lower back pain. The nurse should",
  "ৰক্ত সঞ্চাৰণৰ দহ মিনিটৰ পিছত ৰোগীৰ জ্বৰ, কঁপনি আৰু কঁকালৰ বিষ। নাৰ্ছে",
  [["stop the transfusion at once, keep the line open with saline and report", "সঞ্চাৰণ তৎক্ষণাৎ বন্ধ কৰি ছেলাইনৰে নলী খোলা ৰাখি জনোৱা"],
   ["slow the transfusion and give an antihistamine", "সঞ্চাৰণ লেহেমীয়া কৰি এণ্টিহিষ্টামিন দিয়া"],
   ["continue and recheck the temperature in an hour", "চলাই ৰাখি এঘণ্টাত উষ্ণতা পুনৰ চোৱা"],
   ["give a painkiller for the back pain and continue", "কঁকালৰ বিষৰ বেদনানাশক দি চলাই ৰখা"]], 0,
  "Fever with chills and back pain suggests an acute haemolytic reaction, and stopping the transfusion limits the amount of incompatible blood given. Slowing, continuing or masking the pain with analgesia allows a fatal reaction to progress.",
  "জ্বৰ, কঁপনি আৰু কঁকালৰ বিষে তীব্ৰ ৰক্তকণিকা ভঙাৰ প্ৰতিক্ৰিয়া বুজায়, আৰু সঞ্চাৰণ বন্ধ কৰিলে অসংগত তেজ যোৱাৰ পৰিমাণ সীমিত হয়। লেহেমীয়া কৰা, চলাই ৰখা বা বেদনানাশকে মাৰাত্মক প্ৰতিক্ৰিয়া আগবঢ়াবলৈ দিয়ে।");

add("nursing-479",
  "A patient asks why the doctor changed from one brand of the same medicine to another. The nurse explains that",
  "ৰোগীয়ে একেই ঔষধৰ এটা ব্ৰেণ্ডৰপৰা আনটোলৈ কিয় সলনি কৰিলে সোধে। নাৰ্ছে বুজায়",
  [["the active ingredient is the same but fillers and cost may differ", "সক্ৰিয় উপাদান একেই কিন্তু ভৰাই দিয়া বস্তু আৰু খৰচ বেলেগ হ'ব পাৰে"],
   ["the new brand is a completely different drug", "নতুন ব্ৰেণ্ড সম্পূৰ্ণ বেলেগ ঔষধ"],
   ["brands never contain the same medicine", "ব্ৰেণ্ডত কেতিয়াও একেই ঔষধ নাথাকে"],
   ["the dose must now be doubled", "এতিয়া মাত্ৰা দুগুণ কৰিব লাগে"]], 0,
  "Generic brands share the same active molecule in the same dose, though inactive ingredients and price can differ, which is why substitution is usually safe. The other statements are false and doubling a dose without an order is dangerous.",
  "জেনেৰিক ব্ৰেণ্ডত একেই সক্ৰিয় অণু একেই মাত্ৰাত থাকে, যদিও নিষ্ক্ৰিয় উপাদান আৰু দাম বেলেগ হ'ব পাৰে, সেয়ে সলনি সাধাৰণতে সুৰক্ষিত। আন উক্তিবোৰ অসত্য, আৰু নিৰ্দেশ নোহোৱাকৈ মাত্ৰা দুগুণ কৰা বিপদজনক।");

add("nursing-480",
  "A patient is on a monoamine oxidase inhibitor and develops a severe headache with a stiff neck after eating cheese. The nurse should",
  "এমএঅ' ইনহিবিটৰ লোৱা ৰোগীয়ে চীজ খোৱাৰ পিছত তীব্ৰ মূৰৰ বিষ আৰু টান ডিঙি হয়। নাৰ্ছে",
  [["report at once as a possible hypertensive crisis", "সম্ভাব্য উচ্চ ৰক্তচাপ সংকট বুলি তৎক্ষণাৎ জনোৱা"],
   ["give a hot drink and let him rest", "গৰম পানীয় দি বিশ্ৰাম কৰিবলৈ দিয়া"],
   ["advise eating more cheese to build tolerance", "সহনশীলতা গঢ়িবলৈ বেছি চীজ খাবলৈ কোৱা"],
   ["give the next dose early", "পৰৱৰ্তী মাত্ৰা আগতে দিয়া"]], 0,
  "Cheese is rich in tyramine, which a monoamine oxidase inhibitor prevents from being broken down, so blood pressure can rise to crisis level with severe headache and neck stiffness. Rest, more cheese or an early dose all worsen it.",
  "চীজত টাইৰামিন বেছি, আৰু এমএঅ' ইনহিবিটৰে তাক ভাঙিব নিদিয়ে, সেয়ে ৰক্তচাপ সংকটৰ সীমালৈ উঠি তীব্ৰ মূৰৰ বিষ আৰু ডিঙি টান হয়। বিশ্ৰাম, বেছি চীজ বা আগতীয়া মাত্ৰাই তাক বেয়া কৰে।");

/* ================= lab-technology ================= */
useLeaf("lab-technology");

add("nursing-481",
  "A blood sample for serum potassium arrives in the laboratory three hours after collection and has been kept at room temperature. The result is likely to be",
  "ৰক্ত পটাছিয়ামৰ নমুনা সংগ্ৰহৰ তিনি ঘণ্টা পিছত কোঠাৰ উষ্ণতাত পৰীক্ষালৈ আহিছে। ফলাফল সম্ভৱতঃ",
  [["falsely high because potassium leaks from cells", "মিছাকৈ বেছি কাৰণ কোষৰপৰা পটাছিয়াম ওলায়"],
   ["falsely low because potassium evaporates", "মিছাকৈ কম কাৰণ পটাছিয়াম বাষ্পীভূত হয়"],
   ["unaffected because serum is stable for a day", "প্ৰভাৱ নপৰে কাৰণ ছিৰাম এদিন স্থিৰ"],
   ["falsely high because the tube adds potassium", "মিছাকৈ বেছি কাৰণ নলীয়ে পটাছিয়াম যোগ কৰে"]], 0,
  "Red cells keep leaking potassium into the serum after clotting, and the effect grows with delay and warmth, so a delayed sample reads high. Potassium does not evaporate, and serum is not stable for a day at room temperature.",
  "ৰক্তকণিকাই জমাৰ পিছতো ছিৰামলৈ পটাছিয়াম ওলিয়াই থাকে, আৰু পলম তথা উষ্ণতাত তাক বাঢ়ে, সেয়ে পলম নমুনা বেছি দেখুৱায়। পটাছিয়াম বাষ্পীভূত নহয়, আৰু ছিৰাম কোঠাৰ উষ্ণতাত এদিন স্থিৰ নাথাকে।");

add("nursing-482",
  "A urine sample for culture cannot be plated for four hours. The nurse should",
  "মূত্ৰ কালচাৰৰ নমুনা চাৰি ঘণ্টালৈকে প্লেট কৰিব নোৱাৰি। নাৰ্ছে",
  [["refrigerate the sample and note the delay on the request form", "নমুনা ফ্ৰিজত ৰাখি পলম অনুৰোধ পত্ৰত লিখা"],
   ["leave it on the bench in sunlight", "ৰ'দত বেঞ্চত এৰি থোৱা"],
   ["add preservative without labelling it", "লেবেল নকৰাকৈ সংৰক্ষক দিয়া"],
   ["discard it and collect again the next day", "পেলাই দি পিছদিনা পুনৰ সংগ্ৰহ কৰা"]], 0,
  "Refrigeration slows bacterial multiplication so the colony count still reflects the bladder rather than contaminants grown in the pot. Warmth and sunlight encourage overgrowth, and unlabelled preservative invalidates the result.",
  "ফ্ৰিজত ৰখিলে বেক্টেৰিয়াৰ বৃদ্ধি লেহেমীয়া হয়, সেয়ে কলনীৰ সংখ্যাৱে মূত্ৰাশয় প্ৰতিফলিত কৰে, পাত্ৰত গজা দূষক নহয়। উষ্ণতা আৰু ৰ'দে অতিবৃদ্ধি কৰে, আৰু লেবেল নোহোৱা সংৰক্ষকে ফলাফল অকৰ্মণীয় কৰে।");

add("nursing-483",
  "A laboratory report shows a haemoglobin of 8 g per decilitre in a pregnant woman at 30 weeks. The nurse should",
  "পৰীক্ষাৰ প্ৰতিবেদনত ৩০ সপ্তাহৰ গৰ্ভৱতী মহিলাৰ হিম'গ্ল'বিন প্ৰতি ডেচিলিট্ৰত ৮ গ্ৰাম। নাৰ্ছে",
  [["report for iron therapy and dietary advice", "লো-চিকিৎসা আৰু আহাৰৰ পৰামৰ্শৰ বাবে জনোৱা"],
   ["reassure that haemoglobin always falls in pregnancy", "গৰ্ভাৱস্থাত হিম'গ্ল'বিন সদায় কমে বুলি আশ্বাস দিয়া"],
   ["advise a blood transfusion immediately", "তৎক্ষণাৎ ৰক্ত সঞ্চাৰণৰ পৰামৰ্শ দিয়া"],
   ["repeat the test only after delivery", "প্ৰসৱৰ পিছতহে পৰীক্ষা পুনৰ কৰা"]], 0,
  "Eight grams is anaemia in pregnancy and needs iron plus dietary review, because anaemia raises the risk of preterm birth and postpartum haemorrhage. Physiological dilution lowers the value only mildly, transfusion is reserved for severe cases, and waiting until delivery misses the harm.",
  "আঠ গ্ৰাম হ'ল গৰ্ভাৱস্থাৰ ৰক্তহীনতা আৰু লো তথা আহাৰৰ পৰ্যালোচনা লাগে, কাৰণ ৰক্তহীনতাই অকাল প্ৰসৱ আৰু প্ৰসৱোত্তৰ ৰক্তস্ৰাৱৰ বিপদ বঢ়ায়। শাৰীৰিক লঘুকৰণে মান অলপহে কমায়, সঞ্চাৰণ গুৰুতৰ ক্ষেত্ৰত ৰখা হয়, আৰু প্ৰসৱলৈ অপেক্ষা কৰিলে ক্ষতি হৈ যায়।");

add("nursing-484",
  "A patient's blood group is recorded as O negative. The nurse understands that this patient",
  "ৰোগীৰ ৰক্ত গোট O নেগেটিভ লিখা আছে। নাৰ্ছে বুজে এই ৰোগীয়ে",
  [["can receive only O negative blood", "কেৱল O নেগেটিভ তেজ ল'ব পাৰে"],
   ["can receive any blood group safely", "যিকোনো ৰক্ত গোট নিৰাপদে ল'ব পাৰে"],
   ["is the universal recipient", "সৰ্বজনীন গ্ৰাহক"],
   ["has no Rh antigen and needs no crossmatch", "Rh এণ্টিজেন নাই আৰু ক্ৰছমেটছ নালাগে"]], 0,
  "O negative red cells carry no A, B or Rh D antigen, which makes them the universal donor, but the patient's own plasma holds anti-A and anti-B, so only O negative can be given. Crossmatching is always required.",
  "O নেগেটিভ ৰক্তকণিকাত A, B বা Rh D এণ্টিজেন নাই, সেয়ে ই সৰ্বজনীন দাতা, কিন্তু ৰোগীৰ প্লাজমাত anti-A আৰু anti-B থাকে, সেয়ে কেৱল O নেগেটিভ দিব পাৰি। ক্ৰছমেটছ সদায় লাগে।");

add("nursing-485",
  "A stool sample is requested for a patient with bloody diarrhoea. The nurse should collect",
  "তেজমিশ্ৰিত ডায়েৰিয়া ৰোগীৰ শৌচ নমুনা অনুৰোধ। নাৰ্ছে সংগ্ৰহ কৰিব",
  [["a fresh specimen in a clean container and send it promptly", "পৰিষ্কাৰ পাত্ৰত সতেজ নমুনা লৈ সোনকালে পঠিওৱা"],
   ["a specimen kept overnight in the ward fridge", "ৱাৰ্ডৰ ফ্ৰিজত ৰাতিটো ৰখা নমুনা"],
   ["a specimen mixed with urine in the same pot", "একেই পাত্ৰত প্ৰস্ৰাৱৰ সৈতে মিহলি নমুনা"],
   ["a specimen collected after a barium meal", "বেৰিয়াম আহাৰৰ পিছত সংগ্ৰহ কৰা নমুনা"]], 0,
  "Amoebic and bacterial pathogens lose viability quickly, so a fresh specimen sent promptly gives the best yield. Overnight storage, urine contamination and barium all destroy or dilute the organism.",
  "এমিবিক আৰু বেক্টেৰিয়েল ৰোগজীৱাণু সোনকালে মৰে, সেয়ে সতেজ নমুনা সোনকালে পঠিয়ালে শ্ৰেষ্ঠ ফল দিয়ে। ৰাতিটো ৰখা, প্ৰস্ৰাৱৰ দূষণ আৰু বেৰিয়ামে জীৱাণু নষ্ট বা পাতল কৰে।");

add("nursing-486",
  "A patient has a fasting blood sugar of 118 mg per decilitre and a postprandial value of 190. The nurse should",
  "ৰোগীৰ উপবাসী ৰক্ত শৰ্কৰা প্ৰতি ডেচিলিট্ৰত ১১৮ আৰু আহাৰৰ পিছত ১৯০। নাৰ্ছে",
  [["report both values for further evaluation of glucose tolerance", "শৰ্কৰা সহনশীলতাৰ অতিৰিক্ত পৰীক্ষাৰ বাবে দুয়োটা মান জনোৱা"],
   ["reassure that both values are normal", "দুয়োটা মান স্বাভাৱিক বুলি আশ্বাস দিয়া"],
   ["give a glucose drink and repeat in one hour", "গ্লুক'জ পানীয় দি এঘণ্টাত পুনৰ পৰীক্ষা কৰা"],
   ["advise stopping all carbohydrates permanently", "সকলো শৰ্কৰা স্থায়ীভাৱে বন্ধ কৰিবলৈ পৰামৰ্শ দিয়া"]], 0,
  "A fasting value above 110 with a postprandial above 180 suggests impaired glucose tolerance or diabetes and needs confirmation. Calling them normal delays diagnosis, and a further glucose load without orders is not the nurse's decision.",
  "উপবাসী ১১০ৰ ওপৰ আৰু আহাৰৰ পিছত ১৮০ৰ ওপৰ মানে শৰ্কৰা সহনশীলতা দুৰ্বল বা মধুমেহৰ ইংগিত দিয়ে আৰু নিশ্চিতকৰণ লাগে। স্বাভাৱিক বুলিলে নিৰ্ণয় পলম হয়, আৰু নিৰ্দেশ নোহোৱাকৈ অতিৰিক্ত গ্লুক'জ দিয়া নাৰ্ছৰ সিদ্ধান্ত নহয়।");

add("nursing-487",
  "A patient is to give a 24 hour urine collection. The nurse should",
  "ৰোগীক চৌবিশ ঘণ্টাৰ প্ৰস্ৰাৱ সংগ্ৰহ কৰিব লাগে। নাৰ্ছে",
  [["discard the first specimen and start timing, then collect all urine for 24 hours", "প্ৰথম নমুনা পেলাই সময় আৰম্ভ কৰি চৌবিশ ঘণ্টাৰ সকলো প্ৰস্ৰাৱ সংগ্ৰহ কৰা"],
   ["collect the first urine of the morning and stop there", "ৰাতিপুৱাৰ প্ৰথম প্ৰস্ৰাৱ সংগ্ৰহ কৰি তাতে বন্ধ কৰা"],
   ["collect only the daytime specimens", "কেৱল দিনৰ নমুনা সংগ্ৰহ কৰা"],
   ["keep the container at room temperature without a label", "লেবেল নোহোৱাকৈ পাত্ৰ কোঠাৰ উষ্ণতাত ৰখা"]], 0,
  "The collection must cover a complete twenty-four hours, so the bladder is emptied and that specimen discarded at the start, and every drop afterwards is saved. Stopping at the first specimen or collecting only by day under-measures the total.",
  "সংগ্ৰহে সম্পূৰ্ণ চৌবিশ ঘণ্টা সামৰিব লাগে, সেয়ে আৰম্ভণিতে মূত্ৰাশয় খালী কৰি সেই নমুনা পেলোৱা হয়, আৰু তাৰ পিছৰ প্ৰতিটো টোপাল ৰখা হয়। প্ৰথম নমুনাতে বন্ধ কৰা বা কেৱল দিনত সংগ্ৰহ কৰিলে মুঠ কম জোখা হয়।");

add("nursing-488",
  "A laboratory result is reported as haemolysed. The nurse should",
  "পৰীক্ষাৰ ফলাফল হিম'লাইজড বুলি জনোৱা হ'ল। নাৰ্ছে",
  [["request a repeat sample because haemolysis alters many results", "পুনৰ নমুনা বিচৰা কাৰণ হিম'লাইছে বহু ফলাফল সলনি কৰে"],
   ["accept the result as accurate", "ফলাফল শুদ্ধ বুলি গ্ৰহণ কৰা"],
   ["add saline to the sample and re-run it", "নমুনাত ছেলাইন যোগ কৰি পুনৰ চলোৱা"],
   ["report the value to the family as final", "মানটো পৰিয়ালক চূড়ান্ত বুলি জনোৱা"]], 0,
  "Ruptured red cells release potassium, lactate dehydrogenase and haemoglobin into the serum, so haemolysed samples give falsely high values. Accepting or re-running the same sample cannot undo the damage.",
  "ফটা ৰক্তকণিকাই পটাছিয়াম, লেক্টেট ডিহাইড্ৰ'জেনেজ আৰু হিম'গ্ল'বিন ছিৰামলৈ এৰি দিয়ে, সেয়ে হিম'লাইজড নমুনা মিছাকৈ বেছি মান দিয়ে। গ্ৰহণ কৰা বা একেই নমুনা পুনৰ চলালে ক্ষতি ঘূৰাই নানে।");

add("nursing-489",
  "A patient's prothrombin time is reported as an international normalised ratio of 4.5 while on warfarin. The nurse should",
  "ৱাৰফেৰিন লোৱা ৰোগীৰ প্ৰ'থ্ৰম্বিন সময় আইএনআৰ ৪.৫ বুলি প্ৰতিবেদন। নাৰ্ছে",
  [["withhold the dose and report for urgent review", "মাত্ৰা বন্ধ কৰি জৰুৰী পৰ্যালোচনাৰ বাবে জনোৱা"],
   ["give the usual dose because the ratio is therapeutic", "অনুপাত চিকিৎসাযোগ্য বাবে স্বাভাৱিক মাত্ৰা দিয়া"],
   ["give vitamin K without informing anyone", "কাকো নজনোৱাকৈ ভিটামিন K দিয়া"],
   ["encourage green leafy vegetables to lower the ratio", "অনুপাত কমাবলৈ সেউজ শাক খাবলৈ উৎসাহিত কৰা"]], 0,
  "A ratio of 4.5 is well above the usual therapeutic range of 2 to 3 and carries a high bleeding risk, so the dose is held and reviewed. Giving the usual dose or relying on diet does not correct it fast enough.",
  "৪.৫ অনুপাত সাধাৰণ চিকিৎসাযোগ্য ২ৰপৰা ৩ৰ বহু ওপৰত আৰু ৰক্তস্ৰাৱৰ বিপদ বেছি, সেয়ে মাত্ৰা বন্ধ কৰি পৰ্যালোচনা কৰা হয়। স্বাভাৱিক মাত্ৰা দিয়া বা আহাৰৰ ওপৰত নিৰ্ভৰ কৰিলে যথেষ্ট দ্ৰুত শুধৰণি নহয়।");

add("nursing-490",
  "A sputum sample is needed from a patient suspected of tuberculosis. The nurse should collect",
  "যক্ষ্মাৰ সন্দেহ থকা ৰোগীৰ কফ নমুনা লাগে। নাৰ্ছে সংগ্ৰহ কৰিব",
  [["an early morning deep cough specimen in a sterile container", "পুৱা সোনকালে গভীৰ কাহৰ নমুনা জীৱাণুমুক্ত পাত্ৰত"],
   ["saliva collected after rinsing with antiseptic", "এণ্টিচেপ্টিকৰে কুলি কৰাৰ পিছত সংগ্ৰহ কৰা লেলা"],
   ["a specimen collected after a meal", "আহাৰৰ পিছত সংগ্ৰহ কৰা নমুনা"],
   ["a specimen from the mouth surface with a swab", "স্বাবৰে মুখৰ পৃষ্ঠৰপৰা নমুনা"]], 0,
  "Early morning sputum after a deep cough carries the highest bacillary load, and two specimens on consecutive days are usual. Saliva, post-meal specimens and mouth swabs contain few bacilli and give false negatives.",
  "পুৱা সোনকালে গভীৰ কাহৰ পিছত লোৱা কফত বেক্টেৰিয়াৰ ভাৰ আটাই বেছি, আৰু ক্ৰমিক দুদিনত দুটা নমুনা সাধাৰণ। লেলা, আহাৰৰ পিছৰ নমুনা আৰু মুখৰ স্বাবত বেক্টেৰিয়া কম থাকে আৰু মিছা নেগেটিভ দিয়ে।");

add("nursing-491",
  "A patient's platelet count is 30,000 per cubic millimetre. The nurse should",
  "ৰোগীৰ প্লেটলেট সংখ্যা প্ৰতি ঘন মিলিমিট্ৰত ৩০,০০০। নাৰ্ছে",
  [["avoid intramuscular injections and report the low count", "পেশীত ইনজেকচন এৰি কম সংখ্যাৰ কথা জনোৱা"],
   ["give intramuscular injections as charted", "চাৰ্ট অনুসৰি পেশীত ইনজেকচন দিয়া"],
   ["encourage vigorous physiotherapy", "জোৰদাৰ ফিজিঅ'থেৰাপি উৎসাহিত কৰা"],
   ["perform a routine shaving prep before surgery", "অস্ত্ৰোপচাৰৰ আগতে নিয়মীয়া খুৰাৰ প্ৰস্তুতি কৰা"]], 0,
  "A count of 30,000 means a serious bleeding risk, so intramuscular routes, vigorous exercise and shaving are avoided. Injecting or shaving can cause bleeding that is hard to stop.",
  "৩০,০০০ সংখ্যা মানে গুৰুতৰ ৰক্তস্ৰাৱৰ বিপদ, সেয়ে পেশীৰ পথ, জোৰদাৰ ব্যায়াম আৰু খুৰা এৰা যায়। ইনজেকচন বা খুৰাই বন্ধ কৰিবলৈ টান ৰক্তস্ৰাৱ কৰে।");

add("nursing-492",
  "A blood culture is ordered for a patient with a high fever. The nurse should collect the sample",
  "উচ্চ জ্বৰত ৰোগীৰ ৰক্ত কালচাৰ নিৰ্ধাৰিত। নাৰ্ছে নমুনা সংগ্ৰহ কৰিব",
  [["before starting antibiotics and preferably during a chill", "এণ্টিবায়'টিক আৰম্ভ কৰাৰ আগতে, কঁপনিৰ সময়ত শ্ৰেষ্ঠ"],
   ["after the third dose of antibiotic", "এণ্টিবায়'টিকৰ তৃতীয় মাত্ৰাৰ পিছত"],
   ["from the intravenous line that is already in place", "আগতেই থকা অন্তঃশিৰা নলীৰপৰা"],
   ["after the fever has settled", "জ্বৰ কমাৰ পিছত"]], 0,
  "Antibiotics reduce the number of circulating organisms, so a culture taken before the first dose gives the best yield, and a chill coincides with the highest bacteraemia. Sampling after doses or from an existing line risks a false negative.",
  "এণ্টিবায়'টিকে ৰক্তত থকা জীৱাণু কমায়, সেয়ে প্ৰথম মাত্ৰাৰ আগতে লোৱা কালচাৰে শ্ৰেষ্ঠ ফল দিয়ে, আৰু কঁপনিৰ সময়ত বেক্টেৰিমিয়া আটাই বেছি। মাত্ৰাৰ পিছত বা থকা নলীৰপৰা ল'লে মিছা নেগেটিভৰ বিপদ।");

add("nursing-493",
  "A patient is asked to collect a midstream urine specimen. The nurse should instruct the patient to",
  "ৰোগীক মাজৰ প্ৰস্ৰাৱৰ নমুনা সংগ্ৰহ কৰিবলৈ কোৱা হৈছে। নাৰ্ছে নিৰ্দেশ দিয়া উচিত",
  [["clean the area, pass the first part and collect the middle portion", "অঞ্চল পৰিষ্কাৰ কৰি প্ৰথম অংশ এৰি মাজৰ অংশ সংগ্ৰহ কৰা"],
   ["collect the very first part of the stream", "প্ৰস্ৰাৱৰ আটাই প্ৰথম অংশ সংগ্ৰহ কৰা"],
   ["collect the whole volume in one container", "গোটেই পৰিমাণ এটা পাত্ৰত সংগ্ৰহ কৰা"],
   ["collect after a long delay without cleaning", "পৰিষ্কাৰ নকৰাকৈ বহু পলমৰ পিছত সংগ্ৰহ কৰা"]], 0,
  "The first part flushes the urethra and the midstream portion therefore carries bladder organisms rather than skin flora. The initial portion or the whole volume is contaminated and gives misleading growth.",
  "প্ৰথম অংশই মূত্ৰনলী ধুই দিয়ে, সেয়ে মাজৰ অংশত ছালৰ জীৱাণু নহৈ মূত্ৰাশয়ৰ জীৱাণু থাকে। প্ৰথম অংশ বা গোটেই পৰিমাণ দূষিত হৈ ভুল বৃদ্ধি দেখুৱায়।");

add("nursing-494",
  "A patient on intravenous antibiotics has a peak level drawn thirty minutes after the dose. The nurse understands the peak level is measured to",
  "অন্তঃশিৰা এণ্টিবায়'টিক লোৱা ৰোগীৰ মাত্ৰাৰ ত্ৰিশ মিনিট পিছত শিখৰ মান লোৱা হ'ল। নাৰ্ছে বুজে শিখৰ মান জোখা হয়",
  [["check that the concentration is high enough to kill the organism", "ঘনত্ব জীৱাণু মাৰিবলৈ যথেষ্ট বেছি নে নাই চাবলৈ"],
   ["measure how fast the drug is excreted", "ঔষধ কিমান দ্ৰুত বাহিৰ হয় জোখা"],
   ["decide the patient's blood group", "ৰোগীৰ ৰক্ত গোট নিৰ্ণয় কৰা"],
   ["replace the need for a trough level", "ট্ৰ' মানৰ প্ৰয়োজন আঁতৰোৱা"]], 0,
  "A peak level confirms the dose reaches a concentration above the minimum inhibitory concentration for the organism, while the trough shows whether the drug is clearing before the next dose. Both are needed for drugs with narrow margins.",
  "শিখৰ মানে নিশ্চিত কৰে মাত্ৰাই জীৱাণুৰ ন্যূনতম প্ৰতিৰোধক ঘনত্বৰ ওপৰত উপনীত হয়, আৰু ট্ৰ' মানে পৰৱৰ্তী মাত্ৰাৰ আগতে ঔষধ আঁতৰিছে নে নাই দেখুৱায়। সৰু সীমা থকা ঔষধত দুয়োটা লাগে।");

add("nursing-495",
  "A laboratory technician reports that a blood sample was taken from the arm with the intravenous drip running. The nurse should",
  "পৰীক্ষাগাৰ কৰ্মীয়ে জনায় যে নমুনা অন্তঃশিৰা ড্ৰিপ চলি থকা হাতৰপৰা লোৱা হৈছে। নাৰ্ছে",
  [["request a repeat from the other arm because the sample is diluted", "নমুনা পাতল হোৱা বাবে আন হাতৰপৰা পুনৰ বিচৰা"],
   ["accept the result because the arm was used for convenience", "সুবিধাৰ বাবে হাত ব্যৱহাৰ কৰা বাবে ফল গ্ৰহণ কৰা"],
   ["add the drip fluid volume to the result", "ফলত ড্ৰিপৰ তৰলৰ আয়তন যোগ কৰা"],
   ["centrifuge the sample twice to correct it", "শুধৰণি কৰিবলৈ নমুনা দুবাৰ কেন্দ্ৰীভূত কৰা"]], 0,
  "Blood drawn downstream of a running infusion is diluted by the fluid and gives falsely low electrolyte and glucose values. A repeat from the opposite arm is the only reliable correction.",
  "চলি থকা ইনফিউশ্যনৰ তলত লোৱা তেজ তৰলেৰে পাতল হয় আৰু ইলেক্ট্ৰলাইট তথা গ্লুক'জ মিছাকৈ কম দেখুৱায়। বিপৰীত হাতৰপৰা পুনৰ লোৱাই একমাত্ৰ নিৰ্ভৰযোগ্য শুধৰণি।");

add("nursing-496",
  "A patient's erythrocyte sedimentation rate is 90 mm in the first hour. The nurse understands this finding is",
  "ৰোগীৰ লোহিত কণিকা অধঃক্ষেপণ হাৰ প্ৰথম ঘণ্টাত ৯০ মিলিমিট্ৰ। নাৰ্ছে বুজে এই ফল",
  [["non-specific and indicates inflammation somewhere in the body", "অনিৰ্দিষ্ট আৰু শৰীৰত ক'ৰবাত প্ৰদাহ থকা বুজায়"],
   ["diagnostic of tuberculosis", "যক্ষ্মাৰ নিদান"],
   ["proof that the patient is anaemic", "ৰোগী ৰক্তহীন বুলিৰ প্ৰমাণ"],
   ["normal for an adult", "প্ৰাপ্তবয়স্কৰ বাবে স্বাভাৱিক"]], 0,
  "A raised sedimentation rate reflects rouleaux formation from inflammatory proteins and says that inflammation is present, not where or why. It cannot diagnose a specific disease, and a normal adult value is far lower.",
  "বঢ়া অধঃক্ষেপণ হাৰে প্ৰদাহজনিত প্ৰ'টিনৰপৰা ৰুল' গঠন দেখুৱায় আৰু প্ৰদাহ আছে বুলি কয়, ক'ত বা কিয় নহয়। ই নিৰ্দিষ্ট ৰোগ নিৰ্ণয় কৰিব নোৱাৰে, আৰু প্ৰাপ্তবয়স্কৰ স্বাভাৱিক মান বহু কম।");

add("nursing-497",
  "A needle is used for venepuncture and the nurse is about to dispose of it. The correct action is to",
  "ভিনিপাংকচাৰৰ বাবে ছুচ ব্যৱহাৰ কৰি নাৰ্ছে পেলাব লাগে। শুদ্ধ কাৰ্য",
  [["drop it into a puncture proof sharps container without recapping", "পুনৰ ঢাকনা নলগাই ছুচ প্ৰতিৰোধক শাৰ্পছ পাত্ৰত পেলোৱা"],
   ["recap it and place it in the general waste bin", "ঢাকনা লগাই সাধাৰণ আৱৰ্জনা পাত্ৰত ৰখা"],
   ["bend the needle before disposal", "পেলোৱাৰ আগতে ছুচ বেঁ‌কা কৰা"],
   ["place it on the trolley for later disposal", "পিছত পেলাবলৈ ট্ৰলিত ৰখা"]], 0,
  "Most needlestick injuries happen during recapping, so the needle goes straight into a puncture proof container held close to the patient. Recapping, bending or leaving it on a trolley all create a sharps exposure.",
  "বেছিভাগ ছুচজনিত আঘাত ঢাকনা লগোৱাৰ সময়ত হয়, সেয়ে ছুচ পোনপটীয়াকৈ ৰোগীৰ ওচৰত ধৰা প্ৰতিৰোধক পাত্ৰত পেলায়। ঢাকনা লগোৱা, বেঁ‌কা কৰা বা ট্ৰলিত ৰখাই শাৰ্পছৰ সংস্পৰ্শ সৃষ্টি কৰে।");

add("nursing-498",
  "A patient's serum creatinine has risen from 1.0 to 2.4 mg per decilitre over three days. The nurse should",
  "ৰোগীৰ ছিৰাম ক্ৰিয়েটিনিন তিনি দিনত প্ৰতি ডেচিলিট্ৰত ১.০ৰপৰা ২.৪লৈ বাঢ়িছে। নাৰ্ছে",
  [["report the rise because it suggests acute kidney injury", "বৃক্কৰ তীব্ৰ আঘাতৰ ইংগিত দিয়া বাবে বৃদ্ধিটো জনোৱা"],
   ["reassure that creatinine varies through the day", "ক্ৰিয়েটিনিন দিনটোত সলনি হয় বুলি আশ্বাস দিয়া"],
   ["increase protein in the diet to correct it", "শুধৰণি কৰিবলৈ আহাৰত প্ৰ'টিন বঢ়োৱা"],
   ["withhold all fluids to concentrate the urine", "প্ৰস্ৰাৱ ঘন কৰিবলৈ সকলো তৰল বন্ধ ৰখা"]], 0,
  "A doubling of creatinine in three days meets the criteria for acute kidney injury and needs review of nephrotoxic drugs and fluid status. Creatinine is stable through the day, and restricting fluid worsens the injury.",
  "তিনি দিনত ক্ৰিয়েটিনিন দুগুণ হোৱা বৃক্কৰ তীব্ৰ আঘাতৰ মাপকাঠি পূৰায় আৰু বৃক্ক-বিষাক্ত ঔষধ তথা তৰলৰ অৱস্থাৰ পৰ্যালোচনা লাগে। ক্ৰিয়েটিনিন দিনটোত স্থিৰ থাকে, আৰু তৰল বন্ধ কৰিলে আঘাত বেয়া হয়।");

add("nursing-499",
  "A blood sample is to be taken from a patient with a known bleeding disorder. After venepuncture the nurse should",
  "ৰক্তস্ৰাৱৰ ৰোগ থকা ৰোগীৰপৰা তেজ ল'ব লাগে। ভিনিপাংকচাৰৰ পিছত নাৰ্ছে",
  [["press firmly for at least five minutes and inspect the site", "অন্তত পাঁচ মিনিট জোৰকৈ চাপ দি ঠাই নিৰীক্ষণ কৰা"],
   ["apply a light dressing and release at once", "পাতল বেণ্ডেজ দি লগে লগে এৰি দিয়া"],
   ["rub the site to disperse the blood", "তেজ ছটিয়াবলৈ ঠাই ঘঁ‌হা"],
   ["apply a hot pack to the puncture", "ফুটা ঠাইত গৰম পোচ দিয়া"]], 0,
  "A clotting defect needs longer pressure than usual, and five minutes with inspection confirms haemostasis before the patient leaves. A light dressing released at once, rubbing or heat all allow a haematoma to form.",
  "জমা ত্ৰুটি থকা অৱস্থাত সাধাৰণতকৈ বেছি সময় চাপ লাগে, আৰু পাঁচ মিনিট চাপি নিৰীক্ষণ কৰিলে ৰোগী যোৱাৰ আগতে তেজ বন্ধ নিশ্চিত হয়। পাতল বেণ্ডেজ লগে লগে এৰা, ঘঁ‌হা বা তাপে ৰক্তগোট জমিবলৈ দিয়ে।");

add("nursing-500",
  "A patient asks why the laboratory needs a fasting sample for a lipid profile. The nurse explains that fasting",
  "ৰোগীয়ে লিপিড প্ৰ'ফাইলৰ বাবে উপবাসী নমুনা কিয় লাগে সোধে। নাৰ্ছে বুজায় — উপবাসে",
  [["prevents chylomicrons from a recent meal raising triglycerides", "শেহতীয়া আহাৰৰ কাইল'মাইক্ৰনৰপৰা ট্ৰাইগ্লিচাৰাইড বঢ়োৱা ৰোধ কৰে"],
   ["makes the blood thinner and easier to draw", "তেজ পাতল কৰি ল'বলৈ সহজ কৰে"],
   ["prevents infection at the puncture site", "ফুটা ঠাইত সংক্ৰমণ ৰোধ কৰে"],
   ["removes the need for a repeat test", "পুনৰ পৰীক্ষাৰ প্ৰয়োজন আঁতৰায়"]], 0,
  "Fat absorbed from a recent meal circulates as chylomicrons and inflates the triglyceride reading for hours, so a fasting sample reflects the baseline. Fasting does not thin blood or prevent infection.",
  "শেহতীয়া আহাৰৰপৰা শোষিত চৰ্বি কাইল'মাইক্ৰন হিচাপে ঘূৰি কেইঘণ্টামান ট্ৰাইগ্লিচাৰাইডৰ পঢ়া বঢ়ায়, সেয়ে উপবাসী নমুনাই মূল মান দেখুৱায়। উপবাসে তেজ পাতল নকৰে বা সংক্ৰমণ নৰোধে।");

/* ================= radiography-imaging ================= */
useLeaf("radiography-imaging");

add("nursing-501",
  "A woman of childbearing age is sent for an abdominal radiograph and cannot confirm whether she is pregnant. The nurse should",
  "প্ৰজননক্ষম বয়সৰ মহিলাক পেটৰ ৰেডিঅ'গ্ৰাফৰ বাবে পঠিওৱা হৈছে আৰু তেওঁ গৰ্ভৱতী নে নাই নিশ্চিত কৰিব পৰা নাই। নাৰ্ছে",
  [["inform the radiographer and defer until pregnancy is excluded", "ৰেডিঅ'গ্ৰাফাৰক জনাই গৰ্ভাৱস্থা বাদ নোহোৱালৈকে পিছুৱাই ৰখা"],
   ["proceed because one film cannot harm a fetus", "এখন ফিল্মে ভ্ৰূণৰ ক্ষতি নকৰে বাবে আগবাঢ়া"],
   ["shield only the abdomen and proceed", "কেৱল পেট ঢাকি আগবাঢ়া"],
   ["ask the patient to sign a consent and proceed", "ৰোগীক সন্মতি স্বাক্ষৰ কৰাই আগবাঢ়া"]], 0,
  "A fetus is most radiosensitive in the first trimester, and the decision to expose belongs to the radiographer with the pregnancy status known. Proceeding with shielding alone does not remove the risk to the conceptus.",
  "প্ৰথম তিনিমাহত ভ্ৰূণ ৰশ্মিৰ প্ৰতি আটাই সংবেদনশীল, আৰু গৰ্ভাৱস্থাৰ অৱস্থা জনাকৈ ৰেডিঅ'গ্ৰাফাৰৰহে ৰশ্মি দিয়াৰ সিদ্ধান্ত। কেৱল ঢাকি আগবাঢ়িলে ভ্ৰূণৰ বিপদ নাযায়।");

add("nursing-502",
  "A patient with a suspected hip fracture is in severe pain and cannot lie flat for the radiograph. The nurse should",
  "নিতম্বৰ হাড় ভঙাৰ সন্দেহ থকা ৰোগীৰ তীব্ৰ বিষ, এক্স-ৰেৰ বাবে সমানকৈ শুব নোৱাৰে। নাৰ্ছে",
  [["give prescribed analgesia and support the limb in a comfortable position", "নিৰ্ধাৰিত বেদনানাশক দি অংগ আৰামদায়ক অৱস্থানত ধৰি ৰখা"],
   ["force the leg straight to get a good film", "ভাল ফিল্মৰ বাবে ভৰি জোৰকৈ পোন কৰা"],
   ["cancel the radiograph permanently", "এক্স-ৰে স্থায়ীভাৱে বাতিল কৰা"],
   ["ask the patient to walk to the department", "ৰোগীক বিভাগলৈ খোজ কাঢ়িবলৈ কোৱা"]], 0,
  "Analgesia with splinting of the limb allows the film to be taken without movement that could displace fragments. Forcing the leg straight or walking the patient risks further injury and pain.",
  "বেদনানাশক আৰু অংগ স্থিৰ কৰিলে টুকুৰা আঁতৰাব পৰা চলন নোহোৱাকৈ ফিল্ম ল'ব পাৰি। ভৰি জোৰকৈ পোন কৰা বা খোজ কঢ়ালে আৰু আঘাত আৰু বিষৰ বিপদ।");

add("nursing-503",
  "A patient is to have a barium enema. The nurse should explain that the preparation includes",
  "ৰোগীক বেৰিয়াম ইনিমা দিব লাগে। নাৰ্ছে বুজাব লাগে — প্ৰস্তুতিত আছে",
  [["a low residue diet and bowel cleansing as ordered", "নিৰ্দেশ অনুসৰি কম অৱশেষযুক্ত আহাৰ আৰু অন্ত্ৰ পৰিষ্কাৰ"],
   ["a large fatty meal just before the test", "পৰীক্ষাৰ ঠিক আগতে ডাঙৰ চৰ্বিযুক্ত আহাৰ"],
   ["drinking only milk for two days", "দুদিন কেৱল গাখীৰ খোৱা"],
   ["no preparation at all", "কোনো প্ৰস্তুতি নাই"]], 0,
  "Faecal matter obscures the mucosal outline, so a low residue diet with bowel cleansing is what makes the study readable. A fatty meal or milk leaves residue, and no preparation wastes the examination.",
  "মলৰ পদাৰ্থে শ্লেষ্মাৰ ৰেখা ঢাকে, সেয়ে কম অৱশেষযুক্ত আহাৰ আৰু অন্ত্ৰ পৰিষ্কাৰেই অধ্যয়ন পঢ়নযোগ্য কৰে। চৰ্বিযুক্ত আহাৰ বা গাখীৰে অৱশেষ ৰাখে, আৰু প্ৰস্তুতি নোহোৱাকৈ পৰীক্ষা নষ্ট হয়।");

add("nursing-504",
  "A patient due for an MRI says he has a cardiac pacemaker. The nurse should",
  "এমআৰআইৰ বাবে থকা ৰোগীয়ে হৃদযন্ত্ৰৰ পেচমেকাৰ থকাৰ কথা কয়। নাৰ্ছে",
  [["inform the radiographer before the scan because it may be unsafe", "স্কেনৰ আগতে ৰেডিঅ'গ্ৰাফাৰক জনোৱা কাৰণ ই অসুৰক্ষিত হ'ব পাৰে"],
   ["say nothing because pacemakers are always safe", "পেচমেকাৰ সদায় সুৰক্ষিত বাবে একো নোকোৱা"],
   ["remove the pacemaker before the scan", "স্কেনৰ আগতে পেচমেকাৰ আঁতৰোৱা"],
   ["tell the patient to hold his breath throughout", "ৰোগীক গোটেই সময়ত উশাহ ৰাখিবলৈ কোৱা"]], 0,
  "The strong magnetic field can move or heat metallic implants and disrupt a pacemaker's programming, so the radiographer must know before the patient enters the room. Silence or improvised removal is dangerous.",
  "শক্তিশালী চুম্বকীয় ক্ষেত্ৰই ধাতৱ ইম্প্লাণ্ট লৰচৰ বা গৰম কৰি পেচমেকাৰৰ প্ৰ'গ্ৰামিং ব্যাহত কৰিব পাৰে, সেয়ে ৰোগী কোঠাত সোমোৱাৰ আগতে ৰেডিঅ'গ্ৰাফাৰে জনা লাগে। মনে থকা বা নিজে আঁতৰোৱা বিপদজনক।");

add("nursing-505",
  "A patient has had iodinated contrast before and now reports itching and sneezing immediately after the injection. The nurse should",
  "ৰোগীৰ আগতে আয়'ডিনযুক্ত কণ্ট্ৰাষ্ট লৈছে, এতিয়া ইনজেকচনৰ লগে লগে খুজুতি আৰু হাঁচি। নাৰ্ছে",
  [["stop the injection, maintain the airway and report at once", "ইনজেকচন বন্ধ কৰি শ্বাসপথ ৰক্ষা কৰি তৎক্ষণাৎ জনোৱা"],
   ["continue the injection to finish the study", "অধ্যয়ন শেষ কৰিবলৈ ইনজেকচন চলাই ৰখা"],
   ["give an oral antihistamine and continue", "মুখে এণ্টিহিষ্টামিন দি চলাই ৰখা"],
   ["record it as a mild reaction and observe for an hour", "সামান্য প্ৰতিক্ৰিয়া বুলি লিখি এঘণ্টা পৰ্যবেক্ষণ কৰা"]], 0,
  "Itching and sneezing after contrast can be the start of anaphylaxis, and the injection stops while airway and circulation are supported. Continuing or relying on an oral antihistamine allows the reaction to escalate.",
  "কণ্ট্ৰাষ্টৰ পিছত খুজুতি আৰু হাঁচি এনাফাইলেক্সিছৰ আৰম্ভণি হ'ব পাৰে, আৰু শ্বাসপথ তথা সংচলন ৰক্ষা কৰোতে ইনজেকচন বন্ধ কৰা হয়। চলাই ৰখা বা মুখে এণ্টিহিস্টামিনৰ ওপৰত নিৰ্ভৰ কৰিলে প্ৰতিক্ৰিয়া বাঢ়ে।");

add("nursing-506",
  "A radiographer asks a patient to remove a necklace before a chest radiograph. The nurse explains this is because metal",
  "ৰেডিঅ'গ্ৰাফাৰে বুকুৰ এক্স-ৰেৰ আগতে ডিঙিৰ মালা খুলিবলৈ কয়। নাৰ্ছে বুজায় — ধাতুৱে",
  [["appears opaque and can hide lung pathology", "অপেক আৰু ফুসফুসৰ ৰোগ লুকুৱাব পাৰে"],
   ["makes the machine overheat", "যন্ত্ৰ অতিতপ্ত কৰে"],
   ["changes the patient's blood group", "ৰোগীৰ ৰক্ত গোট সলনি কৰে"],
   ["is radioactive itself", "নিজেই ৰেডিঅ'এক্টিভ"]], 0,
  "Metal absorbs X-rays and appears white, so it can mask a lesion or mimic one on the film. It does not affect the machine or the patient's blood, and it is not itself radioactive.",
  "ধাতুৱে এক্স-ৰে শোষণ কৰি বগা দেখায়, সেয়ে ই ক্ষত ঢাকিব বা নকল ক্ষত যেন দেখুৱাব পাৰে। ই যন্ত্ৰ বা ৰোগীৰ তেজত প্ৰভাৱ নপেলায়, আৰু নিজেই ৰেডিঅ'এক্টিভ নহয়।");

add("nursing-507",
  "A patient is scheduled for an ultrasound of the abdomen and asks whether it is safe. The nurse explains that ultrasound",
  "ৰোগীৰ পেটৰ আল্ট্ৰাছাউণ্ড নিৰ্ধাৰিত, সুৰক্ষিত নে নাই সোধে। নাৰ্ছে বুজায় — আল্ট্ৰাছাউণ্ড",
  [["uses high frequency sound and carries no ionising radiation", "উচ্চ কম্পনাংকৰ শব্দ ব্যৱহাৰ কৰে আৰু আয়নীকৰণ ৰশ্মি নাই"],
   ["uses a small dose of X-rays", "অলপ এক্স-ৰে ব্যৱহাৰ কৰে"],
   ["requires a radioactive tracer", "ৰেডিঅ'এক্টিভ ট্ৰেছাৰ লাগে"],
   ["is unsafe in pregnancy", "গৰ্ভাৱস্থাত অসুৰক্ষিত"]], 0,
  "Ultrasound images with reflected sound waves, so there is no ionising dose, which is why it is the first choice in pregnancy. X-rays, tracers and fetal risk belong to other modalities.",
  "আল্ট্ৰাছাউণ্ডে প্ৰতিফলিত শব্দ তৰংগৰে চিত্ৰ গঢ়ে, সেয়ে আয়নীকৰণৰ মাত্ৰা নাই, যি গৰ্ভাৱস্থাত প্ৰথম পছন্দৰ কাৰণ। এক্স-ৰে, ট্ৰেছাৰ আৰু ভ্ৰূণৰ বিপদ আন পদ্ধতিৰ।");

add("nursing-508",
  "A patient is very anxious before a CT scan and keeps moving. The nurse's best action is to",
  "চিটি স্কেনৰ আগতে ৰোগী অতি উদ্বিগ্ন আৰু বাৰে বাৰে লৰে। নাৰ্ছৰ শ্ৰেষ্ঠ কাৰ্য",
  [["explain the procedure, address fears and support stillness", "পদ্ধতি বুজাই ভয়ৰ সমাধান কৰি স্থিৰ থকাত সহায় কৰা"],
   ["restrain the patient to the table", "ৰোগীক টেবুলত বান্ধি ৰখা"],
   ["cancel the scan without explanation", "ব্যাখ্যা নোহোৱাকৈ স্কেন বাতিল কৰা"],
   ["sedate the patient without an order", "নিৰ্দেশ নোহোৱাকৈ শান্ত কৰা"]], 0,
  "Movement blurs the images, and explanation with reassurance usually secures cooperation without restraint or sedation. Restraint, cancellation or un prescribed sedation all carry their own risks.",
  "চলনে চিত্ৰ অস্পষ্ট কৰে, আৰু ব্যাখ্যা তথা আশ্বাসে সাধাৰণতে বান্ধোন বা শান্ত কৰাৰ অবিহনে সহযোগিতা লাভ কৰে। বান্ধোন, বাতিল বা নিৰ্দেশ নোহোৱা শান্তকৰণৰ নিজৰ বিপদ আছে।");

add("nursing-509",
  "A patient after a barium meal has not passed stool for two days and reports abdominal discomfort. The nurse should",
  "বেৰিয়াম আহাৰৰ পিছত ৰোগীৰ দুদিন শৌচ হোৱা নাই আৰু পেটত অস্বস্তি। নাৰ্ছে",
  [["encourage fluids and report because barium can cause constipation", "তৰল খাবলৈ উৎসাহিত কৰি জনোৱা কাৰণ বেৰিয়ামে কোষ্ঠকাঠিন্য কৰে"],
   ["give a strong laxative without reporting", "নজনোৱাকৈ শক্তিশালী জোলাপ দিয়া"],
   ["reassure that barium is absorbed harmlessly", "বেৰিয়াম নিৰীহভাৱে শোষিত হয় বুলি আশ্বাস দিয়া"],
   ["give a barium enema to clear it", "পৰিষ্কাৰ কৰিবলৈ বেৰিয়াম ইনিমা দিয়া"]], 0,
  "Barium sulphate is not absorbed and can inspissate in the colon, so fluids plus review prevent an impaction. It is not harmless if retained, and a further barium study would worsen it.",
  "বেৰিয়াম ছালফেট শোষিত নহয় আৰু বৃহদান্ত্ৰত ঘন হ'ব পাৰে, সেয়ে তৰল আৰু পৰ্যালোচনাই বন্ধন ৰোধ কৰে। ৰৈ গ'লে নিৰীহ নহয়, আৰু আৰু বেৰিয়াম অধ্যয়নে তাক বেয়া কৰে।");

add("nursing-510",
  "A pregnant patient needs an imaging study urgently. The nurse understands that the preferred first line is",
  "গৰ্ভৱতী ৰোগীৰ জৰুৰীভাৱে ইমেজিং প্ৰয়োজন। নাৰ্ছে বুজে প্ৰথম পছন্দ",
  [["ultrasound, then MRI if further detail is needed", "আল্ট্ৰাছাউণ্ড, বেছি বিৱৰণ লাগিলে এমআৰআই"],
   ["plain radiographs of the abdomen", "পেটৰ সাধাৰণ ৰেডিঅ'গ্ৰাফ"],
   ["a CT scan with contrast", "কণ্ট্ৰাষ্টসহ চিটি স্কেন"],
   ["a nuclear medicine scan", "পাৰমাণৱিক ঔষধ স্কেন"]], 0,
  "Ultrasound and MRI give diagnostic information without ionising radiation, so they come first in pregnancy. Plain films, CT and nuclear scans all deliver a dose to the fetus and are reserved for when the answer cannot be obtained otherwise.",
  "আল্ট্ৰাছাউণ্ড আৰু এমআৰআইয়ে আয়নীকৰণ ৰশ্মি নোহোৱাকৈ নিদানিক তথ্য দিয়ে, সেয়ে গৰ্ভাৱস্থাত প্ৰথম। সাধাৰণ ফিল্ম, চিটি আৰু পাৰমাণৱিক স্কেনে ভ্ৰূণলৈ মাত্ৰা দিয়ে আৰু অন্য উপায়ে উত্তৰ নোপোৱা হ'লে ৰখা হয়।");

add("nursing-511",
  "A radiographer asks the nurse to hold a confused patient still during a radiograph. The nurse should",
  "ৰেডিঅ'গ্ৰাফাৰে বিভ্ৰান্ত ৰোগীক এক্স-ৰেৰ সময়ত ধৰি ৰাখিবলৈ কয়। নাৰ্ছে",
  [["decline to hold the patient in the beam and suggest another plan", "ৰশ্মিৰ ভিতৰত ধৰি ৰখাৰপৰা বিৰত থাকি আন উপায় দিয়া"],
   ["hold the patient firmly in place", "ৰোগীক জোৰকৈ ধৰি ৰখা"],
   ["stand behind the radiographer without a lead apron", "লেড এপ্ৰ'ন নোহোৱাকৈ ৰেডিঅ'গ্ৰাফাৰৰ পিছত থিয় হোৱা"],
   ["ask a relative to hold the patient without shielding", "আত্মীয়ক ঢাকন নোহোৱাকৈ ধৰিবলৈ কোৱা"]], 0,
  "No one should routinely hold a patient in the primary beam, because it gives a real occupational dose, and alternative positioning or sedation under orders is used instead. Standing unshielded or using an unprotected relative transfers the dose to another person.",
  "কাকো নিয়মিতভাৱে প্ৰাথমিক ৰশ্মিৰ ভিতৰত ধৰি ৰখা উচিত নহয়, কাৰণ ই প্ৰকৃত বৃত্তিগত মাত্ৰা দিয়ে, আৰু ইয়াৰ সলনি আন অৱস্থান বা নিৰ্দেশ অনুসৰি শান্তকৰণ ব্যৱহাৰ কৰা হয়। ঢাকন নোহোৱাকৈ থিয় হোৱা বা অসুৰক্ষিত আত্মীয় ব্যৱহাৰ কৰিলে মাত্ৰা আন এজনলৈ যায়।");

add("nursing-512",
  "A patient has a suspected foreign body in the eye and is sent for imaging. The nurse should",
  "ৰোগীৰ চকুত বিদেশী বস্তুৰ সন্দেহ আৰু ইমেজিঙলৈ পঠিওৱা হ'ল। নাৰ্ছে",
  [["advise the patient not to rub the eye and to keep it still", "ৰোগীক চকু ঘঁ‌হিবলৈ নিদি স্থিৰ ৰাখিবলৈ কোৱা"],
   ["remove the object with forceps before imaging", "ইমেজিঙৰ আগতে চিমটাৰে বস্তুটো আঁতৰোৱা"],
   ["apply pressure to the eye to hold it shut", "চকু বন্ধ ৰাখিবলৈ চাপ দিয়া"],
   ["flush the eye with water under pressure", "চাপেৰে পানীৰে চকু ধুই দিয়া"]], 0,
  "Rubbing or pressing can drive a foreign body deeper into the cornea or globe, so the eye is kept still until imaging shows its position. Removal or forceful flushing before localisation can cause a penetrating injury.",
  "ঘঁ‌হা বা চাপ দিলে বিদেশী বস্তু কৰ্নিয়া বা নেত্ৰগোলকত আৰু গভীৰলৈ যাব পাৰে, সেয়ে ইমেজিঙে অৱস্থান নেদেখুৱালৈকে চকু স্থিৰ ৰখা হয়। অৱস্থান জনাৰ আগতে আঁতৰোৱা বা জোৰেৰে ধোৱাই ভেদী আঘাত কৰিব পাৰে।");

add("nursing-513",
  "A patient is to have a mammogram and says she used talcum powder under the arms. The nurse should",
  "ৰোগীৰ মেম'গ্ৰাম হ'ব আৰু কয় যে তেওঁ বগলিত টেল্কাম গুড়ি ব্যৱহাৰ কৰিছে। নাৰ্ছে",
  [["ask her to wash the area because powder can mimic calcification", "অঞ্চল ধুই পেলাবলৈ কোৱা কাৰণ গুড়িয়ে কেলচিফিকেশ্যন যেন দেখুৱায়"],
   ["proceed because powder does not affect the image", "গুড়িয়ে চিত্ৰত প্ৰভাৱ নপেলায় বাবে আগবাঢ়া"],
   ["apply more powder to reduce friction", "ঘৰ্ষণ কমাবলৈ আৰু গুড়ি লগোৱা"],
   ["cancel the mammogram permanently", "মেম'গ্ৰাম স্থায়ীভাৱে বাতিল কৰা"]], 0,
  "Talc and deodorant contain dense particles that appear as white specks and can be mistaken for microcalcification, which is a cancer sign. Washing the skin removes the artefact, while proceeding risks a false positive report.",
  "টেল্ক আৰু ডিঅ'ডৰেণ্টত ঘন কণিকা থাকে যি বগা টোপালি যেন দেখি মাইক্ৰ'কেলচিফিকেশ্যন বুলি ভুল হ'ব পাৰে, যি কৰ্কটৰ চিন। ছাল ধুলে কৃত্ৰিমতা আঁতৰে, আৰু আগবাঢ়িলে মিছা পজিটিভ প্ৰতিবেদনৰ বিপদ।");

add("nursing-514",
  "A patient with a suspected fracture has a radiograph that shows no abnormality, but the pain and swelling persist. The nurse should",
  "ভঙাৰ সন্দেহ থকা ৰোগীৰ এক্স-ৰেত কোনো অস্বাভাৱিকতা নাই, কিন্তু বিষ আৰু ওফন্দা থাকি গ'ল। নাৰ্ছে",
  [["keep the limb immobilised and report for review", "অংগ অচল ৰাখি পৰ্যালোচনাৰ বাবে জনোৱা"],
   ["tell the patient there is nothing wrong and discharge him", "কিছুই নাই বুলি কোৱা আৰু ঘৰলৈ পঠিওৱা"],
   ["ask the patient to exercise the limb fully", "ৰোগীক অংগ সম্পূৰ্ণকৈ ব্যায়াম কৰিবলৈ কোৱা"],
   ["repeat the radiograph immediately without a request", "অনুৰোধ নোহোৱাকৈ তৎক্ষণাত পুনৰ এক্স-ৰে কৰা"]], 0,
  "Some fractures, especially of the scaphoid and ribs, are invisible on the first film and show later, so immobilisation with review is safe. Discharging or exercising the limb risks displacement, and repeating without a request bypasses clinical judgement.",
  "কিছুমান ভঙা, বিশেষকৈ স্কেফইড আৰু পাঁজৰৰ, প্ৰথম ফিল্মত নেদেখি পিছত ওলায়, সেয়ে অচল কৰি পৰ্যালোচনা কৰা সুৰক্ষিত। ঘৰলৈ পঠিওৱা বা ব্যায়াম কৰালে অংগ আঁতৰাৰ বিপদ, আৰু অনুৰোধ নোহোৱাকৈ পুনৰ কৰিলে নিদানিক বিচাৰ এৰি যায়।");

add("nursing-515",
  "A patient is confused after a head injury and needs a CT scan. The nurse should",
  "মূৰৰ আঘাতৰ পিছত ৰোগী বিভ্ৰান্ত আৰু চিটি স্কেন লাগে। নাৰ্ছে",
  [["escort the patient, monitor the airway and inform the radiology team", "ৰোগীৰ লগত যোৱা, শ্বাসপথ নিৰীক্ষণ কৰি ৰেডিঅ'লজি দলক জনোৱা"],
   ["send the patient alone to save staff time", "কৰ্মচাৰীৰ সময় বচাবলৈ ৰোগীক অকলে পঠিওৱা"],
   ["sedate the patient heavily before transfer", "স্থানান্তৰৰ আগতে ৰোগীক বেছি শান্ত কৰা"],
   ["delay the scan until the patient is fully alert", "ৰোগী সম্পূৰ্ণ সজাগ নোহোৱালৈকে স্কেন পিছুৱাই ৰখা"]], 0,
  "A confused patient can deteriorate during transfer, so an escort with airway monitoring and a briefing to radiology keeps the scan safe. Sending the patient alone, over-sedating or delaying all risk a missed expanding lesion.",
  "বিভ্ৰান্ত ৰোগী স্থানান্তৰত বেয়া হ'ব পাৰে, সেয়ে শ্বাসপথ নিৰীক্ষণসহ লগত যোৱা আৰু ৰেডিঅ'লজিক জনোৱাই স্কেন সুৰক্ষিত ৰাখে। অকলে পঠিওৱা, বেছি শান্ত কৰা বা পিছুৱাই ৰখাই বাঢ়ি থকা ক্ষত এৰি দিয়ে।");

add("nursing-516",
  "A patient asks why the radiographer leaves the room during the exposure. The nurse explains that the radiographer",
  "ৰোগীয়ে সোধে ৰেডিঅ'গ্ৰাফাৰে ৰশ্মিৰ সময়ত কোঠা কিয় এৰে। নাৰ্ছে বুজায় — ৰেডিঅ'গ্ৰাফাৰে",
  [["avoids unnecessary occupational exposure as required by ALARA", "এএলএআৰএ অনুসৰি অলাগতীয়াল বৃত্তিগত মাত্ৰা এৰায়"],
   ["is not trained to stay in the room", "কোঠাত থকাৰ প্ৰশিক্ষণ নাই"],
   ["must check the film in another room", "আন কোঠাত ফিল্ম পৰীক্ষা কৰিব লাগে"],
   ["fears the patient", "ৰোগীক ভয় পায়"]], 0,
  "Staff stand behind a shielded barrier because the ALARA principle requires exposure to be kept as low as reasonably achievable, and distance plus shielding does that. It is a dose-protection practice, not a training or administrative matter.",
  "কৰ্মচাৰীয়ে ঢাকনাযুক্ত আঁৰত থিয় হয় কাৰণ এএলএআৰএ নীতিয়ে মাত্ৰা যুক্তিসঙ্গতভাৱে যিমান কম সম্ভৱ সিমান কম ৰাখিবলৈ কয়, আৰু দূৰত্ব তথা ঢাকনাই তাক কৰে। ই মাত্ৰা সুৰক্ষাৰ অভ্যাস, প্ৰশিক্ষণ বা প্ৰশাসনিক বিষয় নহয়।");

add("nursing-517",
  "A patient has a metallic hip prosthesis and needs an MRI of the knee. The nurse should",
  "ৰোগীৰ ধাতৱ নিতম্ব প্ৰতিস্থাপন আছে আৰু আঁঠুৰ এমআৰআই লাগে। নাৰ্ছে",
  [["inform the radiographer so the implant can be checked for safety", "ইম্প্লাণ্টৰ সুৰক্ষা পৰীক্ষা কৰিবলৈ ৰেডিঅ'গ্ৰাফাৰক জনোৱা"],
   ["assume all implants are MRI safe", "সকলো ইম্প্লাণ্ট এমআৰআই সুৰক্ষিত ধৰি লোৱা"],
   ["ask the patient to remove the prosthesis", "ৰোগীক প্ৰতিস্থাপন আঁতৰাবলৈ কোৱা"],
   ["proceed without mentioning it", "নোকোৱাকৈ আগবাঢ়া"]], 0,
  "Each implant has a documented magnetic safety status, and some can heat or displace in the field, so the radiographer must check the model. Assuming safety, asking for removal or staying silent risks injury.",
  "প্ৰতিটো ইম্প্লাণ্টৰ চুম্বকীয় সুৰক্ষাৰ অৱস্থা লিখিত থাকে, আৰু কিছুমান ক্ষেত্ৰত গৰম বা লৰচৰ হয়, সেয়ে ৰেডিঅ'গ্ৰাফাৰে মডেল পৰীক্ষা কৰিব লাগে। সুৰক্ষিত ধৰি লোৱা, আঁতৰাবলৈ কোৱা বা নোকোৱাকৈ থাকিলে আঘাতৰ বিপদ।");

add("nursing-518",
  "A patient who has just had iodinated contrast is found to have a raised creatinine two days later. The nurse should",
  "আয়'ডিনযুক্ত কণ্ট্ৰাষ্ট লোৱা ৰোগীৰ দুদিন পিছত ক্ৰিয়েটিনিন বাঢ়িছে। নাৰ্ছে",
  [["report it as possible contrast induced kidney injury", "সম্ভাব্য কণ্ট্ৰাষ্টজনিত বৃক্ক আঘাত বুলি জনোৱা"],
   ["reassure that contrast never affects the kidney", "কণ্ট্ৰাষ্টে কেতিয়াও বৃক্কত প্ৰভাৱ নপেলায় বুলি আশ্বাস দিয়া"],
   ["give another contrast study to confirm", "নিশ্চিত কৰিবলৈ আৰু এটা কণ্ট্ৰাষ্ট অধ্যয়ন দিয়া"],
   ["withhold all fluids for two days", "দুদিন সকলো তৰল বন্ধ ৰখা"]], 0,
  "Iodinated contrast can reduce renal perfusion and cause a transient rise in creatinine within a few days, which needs hydration and review. Reassurance or a further study worsens the injury.",
  "আয়'ডিনযুক্ত কণ্ট্ৰাষ্টে বৃক্কৰ ৰক্তস্ৰাৱ কমাই কেইদিনৰ ভিতৰত ক্ৰিয়েটিনিন অস্থায়ীভাৱে বঢ়াব পাৰে, আৰু তৰল তথা পৰ্যালোচনা লাগে। আশ্বাস বা আৰু অধ্যয়নে আঘাত বেয়া কৰে।");

add("nursing-519",
  "A child needs a radiograph and is frightened. The nurse should",
  "শিশুৰ এক্স-ৰে লাগে আৰু ভয় খাইছে। নাৰ্ছে",
  [["explain simply, allow a parent to stay and use distraction", "সৰলভাৱে বুজাই পিতৃ-মাতৃক থকিবলৈ দি মনোযোগ ঘূৰোৱা"],
   ["restrain the child tightly without explanation", "ব্যাখ্যা নোহোৱাকৈ শিশুক টানকৈ বান্ধি ৰখা"],
   ["threaten the child to keep still", "স্থিৰ থাকিবলৈ শিশুক ভয় দেখুওৱা"],
   ["cancel the examination", "পৰীক্ষা বাতিল কৰা"]], 0,
  "Simple explanation, a familiar adult and distraction usually get the stillness needed without restraint, and they reduce distress. Restraint without explanation or threats cause lasting fear, and cancelling leaves the diagnosis undone.",
  "সৰল ব্যাখ্যা, চিনাকি প্ৰাপ্তবয়স্ক আৰু মনোযোগ ঘূৰোৱাই সাধাৰণতে বান্ধোন নোহোৱাকৈ প্ৰয়োজনীয় স্থিৰতা দিয়ে আৰু কষ্ট কমায়। ব্যাখ্যা নোহোৱা বান্ধোন বা ভয় দেখুওৱাই স্থায়ী ভয় কৰে, আৰু বাতিল কৰিলে নিৰ্ণয় অধৰমুকি থাকে।");

add("nursing-520",
  "A patient's radiograph report notes a radiolucent area in the lung. The nurse understands that this area",
  "ৰোগীৰ ৰেডিঅ'গ্ৰাফ প্ৰতিবেদনত ফুসফুসত ৰেডিঅ'লুচেণ্ট অঞ্চল লিখা আছে। নাৰ্ছে বুজে এই অঞ্চল",
  [["appears darker because it absorbs fewer X-rays", "গাঢ় দেখায় কাৰণ ই কম এক্স-ৰে শোষণ কৰে"],
   ["appears white because it is dense", "বগা দেখায় কাৰণ ই ঘন"],
   ["is always a malignant tumour", "সদায় মাৰাত্মক টিউমাৰ"],
   ["cannot be seen on a radiograph", "এক্স-ৰেত দেখা নাযায়"]], 0,
  "Air and fat absorb little radiation and therefore look dark, which is what radiolucent means, and such an area may be a cavity, cyst or normal air space. Dense structures look white, and the finding alone does not establish malignancy.",
  "বায়ু আৰু চৰ্বিয়ে কম ৰশ্মি শোষণ কৰে আৰু সেয়ে গাঢ় দেখায়, যি ৰেডিঅ'লুচেণ্টৰ অৰ্থ, আৰু এনে অঞ্চল গহ্বৰ, চিষ্ট বা স্বাভাৱিক বায়ুস্থান হ'ব পাৰে। ঘন গঠন বগা দেখায়, আৰু অকল এই ফলেই মাৰাত্মকতা সাব্যস্ত নকৰে।");

/* The remaining leaves live in sibling modules, split only to keep each
   file a readable length. Concatenate them here so the merge script and the
   build see one bank. */
const extra2 = require("./dhs-dme-technical.nursing-extra2.js").questions;
const extra3 = require("./dhs-dme-technical.nursing-extra3.js").questions;
const extra4 = require("./dhs-dme-technical.nursing-extra4.js").questions;

module.exports = { questions: Q.concat(extra2, extra3, extra4) };
