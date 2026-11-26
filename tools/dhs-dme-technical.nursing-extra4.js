#!/usr/bin/env node
"use strict";

/* axomexam — tools/dhs-dme-technical.nursing-extra4.js
   medical-terminology and health-programmes-assam, twenty items each
   (nursing-561..600). */

const Q = [];
let LEAF = "";

function useLeaf(name) { LEAF = name; }

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

/* ================= medical-terminology ================= */
useLeaf("medical-terminology");

add("nursing-561",
  "The term haematemesis means",
  "হেমাটেমেছিছ শব্দৰ অৰ্থ",
  [["vomiting of blood", "তেজ বমি কৰা"],
   ["blood in the stool", "শৌচত তেজ"],
   ["coughing up blood", "কাহত তেজ ওলোৱা"],
   ["blood in the urine", "প্ৰস্ৰাৱত তেজ"]], 0,
  "Haemat- means blood and -emesis means vomiting, so haematemesis is vomiting blood. Blood in stool is melaena or haematochezia, coughed blood is haemoptysis, and blood in urine is haematuria.",
  "হেমাট- মানে তেজ আৰু -এমেছিছ মানে বমি, সেয়ে হেমাটেমেছিছ তেজ বমি। শৌচত তেজ মেলিনা বা হেমাট'কেছিয়া, কাহত তেজ হিম'প্টাইছিছ, আৰু প্ৰস্ৰাৱত তেজ হেমাটিউৰিয়া।");

add("nursing-562",
  "A suffix that means surgical repair is",
  "শল্যচিকিৎসাৰে শুধৰণি বুজোৱা প্ৰত্যয়",
  [["-plasty", "-প্লাষ্টি"],
   ["-ectomy", "-এক্টমি"],
   ["-ostomy", "-অ'ষ্টমি"],
   ["-otomy", "-অ'টমি"]], 0,
  "-plasty is repair or reconstruction, as in rhinoplasty. -ectomy is removal, -ostomy is a permanent opening and -otomy is a cut into, which are three different operations.",
  "-প্লাষ্টি মানে শুধৰণি বা পুনৰ্গঠন, যেনে ৰাইন'প্লাষ্টি। -এক্টমি মানে আঁতৰোৱা, -অ'ষ্টমি স্থায়ী খোলা আৰু -অ'টমি কটা, যি তিনি বেলেগ অস্ত্ৰোপচাৰ।");

add("nursing-563",
  "The term dysuria means",
  "ডিছইউৰিয়া শব্দৰ অৰ্থ",
  [["painful or difficult urination", "ব্যথাযুক্ত বা কষ্টকৰ প্ৰস্ৰাৱ"],
   ["absence of urine", "প্ৰস্ৰাৱ নোহোৱা"],
   ["excessive urination", "অত্যধিক প্ৰস্ৰাৱ"],
   ["blood in the urine", "প্ৰস্ৰাৱত তেজ"]], 0,
  "Dys- means difficult or painful and -uria refers to urine, so dysuria is painful passing of urine. Absence is anuria, excess is polyuria and blood is haematuria.",
  "ডিছ- মানে কষ্টকৰ বা ব্যথাযুক্ত আৰু -ইউৰিয়া প্ৰস্ৰাৱক বুজায়, সেয়ে ডিছইউৰিয়া ব্যথাযুক্ত প্ৰস্ৰাৱ। অনুপস্থিতি এনিউৰিয়া, অত্যধিক পলিইউৰিয়া আৰু তেজ হেমাটিউৰিয়া।");

add("nursing-564",
  "The combining form hepat- refers to the",
  "হেপাট- সংযোগী ৰূপে বুজায়",
  [["liver", "যকৃত"],
   ["kidney", "বৃক্ক"],
   ["stomach", "পেট"],
   ["lung", "ফুসফুস"]], 0,
  "Hepat- is the liver, as in hepatitis and hepatomegaly. The kidney is ren- or nephro-, the stomach is gastr- and the lung is pulmon- or pneumo-.",
  "হেপাট- মানে যকৃত, যেনে হেপাটাইটিছ আৰু হেপাট'মেগালি। বৃক্ক ৰেন- বা নেফ্ৰ'- , পেট গেষ্ট্ৰ- আৰু ফুসফুস পুলম'- বা নিউম'-।");

add("nursing-565",
  "The term bradycardia describes a heart rate that is",
  "ব্ৰেডিকাৰ্ডিয়া শব্দই হৃদস্পন্দনৰ হাৰ বুজায় যি",
  [["slower than normal", "স্বাভাৱিকতকৈ লেহেমীয়া"],
   ["faster than normal", "স্বাভাৱিকতকৈ দ্ৰুত"],
   ["irregular in rhythm", "ছন্দত অনিয়মিত"],
   ["absent altogether", "একেবাৰে নোহোৱা"]], 0,
  "Brady- means slow, so bradycardia is a rate below sixty in an adult. Faster than normal is tachycardia, irregular rhythm is arrhythmia and absence of a pulse is asystole.",
  "ব্ৰেডি- মানে লেহেমীয়া, সেয়ে ব্ৰেডিকাৰ্ডিয়া প্ৰাপ্তবয়স্কত ষাঠিৰ তলৰ হাৰ। স্বাভাৱিকতকৈ দ্ৰুত টেকিকাৰ্ডিয়া, অনিয়মিত ছন্দ এৰিদমিয়া আৰু নাড়ী নোহোৱা এছিষ্ট'ল।");

add("nursing-566",
  "The suffix -algia indicates",
  "প্ৰত্যয় -এলজিয়াই বুজায়",
  [["pain", "ব্যথা"],
   ["swelling", "ওফন্দা"],
   ["bleeding", "ৰক্তস্ৰাৱ"],
   ["fever", "জ্বৰ"]], 0,
  "-algia is pain, as in gastralgia and arthralgia. Swelling is -oedema or -itis with inflammation, bleeding is -rrhagia and fever is pyrexia.",
  "-এলজিয়া মানে ব্যথা, যেনে গেষ্ট্ৰেলজিয়া আৰু আৰ্থ্ৰেলজিয়া। ওফন্দা -ইডিমা বা প্ৰদাহযুক্ত -আইটিছ, ৰক্তস্ৰাৱ -ৰেজিয়া আৰু জ্বৰ পাইৰেক্সিয়া।");

add("nursing-567",
  "A patient's record notes 'NPO since midnight'. This means the patient",
  "ৰোগীৰ অভিলেখত 'মাজনিশাৰপৰা NPO' লিখা আছে। ইয়াৰ অৰ্থ ৰোগীয়ে",
  [["has taken nothing by mouth", "মুখে একো লোৱা নাই"],
   ["has no pain on examination", "পৰীক্ষাত ব্যথা নাই"],
   ["has normal pupil oculi", "চকুৰ গুটি স্বাভাৱিক"],
   ["needs a new prescription order", "নতুন প্ৰেছক্ৰিপচনৰ প্ৰয়োজন"]], 0,
  "NPO stands for nil per os, nothing by mouth, and is used before surgery or when the gut must rest. It is not related to pain, pupils or prescriptions.",
  "NPO ৰ অৰ্থ nil per os, মুখে একো নহয়, আৰু অস্ত্ৰোপচাৰৰ আগতে বা অন্ত্ৰ বিশ্ৰামৰ প্ৰয়োজনত ব্যৱহাৰ কৰা হয়। ই ব্যথা, চকুৰ গুটি বা প্ৰেছক্ৰিপচনৰ সৈতে সম্পৰ্ক নাই।");

add("nursing-568",
  "The term idiopathic means the condition",
  "ইডিঅ'পেথিক শব্দই বুজায় অৱস্থাটো",
  [["arises without a known cause", "জনা কাৰণ নোহোৱাকৈ হয়"],
   ["is inherited from parents", "পিতৃ-মাতৃৰপৰা উত্তৰাধিকাৰী"],
   ["is caused by a drug", "ঔষধৰপৰা হয়"],
   ["affects only the elderly", "কেৱল বয়সীয়ালক হয়"]], 0,
  "Idio- means self and -pathic means disease, so idiopathic describes a condition that arises of itself without an identified cause. Inherited is congenital or hereditary, drug related is iatrogenic, and age is not implied.",
  "ইডিঅ'- মানে নিজ আৰু -পেথিক মানে ৰোগ, সেয়ে ইডিঅ'পেথিকে চিনাক্ত কাৰণ নোহোৱাকৈ নিজেই হোৱা অৱস্থা বুজায়। উত্তৰাধিকাৰী জন্মগত বা বংশগত, ঔষধজনিত আইএট্ৰ'জেনিক, আৰু বয়সৰ ইংগিত নাই।");

add("nursing-569",
  "The term metastasis in cancer refers to",
  "কৰ্কটত মেটাষ্টাছিছ শব্দই বুজায়",
  [["spread of tumour cells to another site", "টিউমাৰ কোষ আন ঠাইলৈ বিয়পা"],
   ["shrinking of the tumour", "টিউমাৰ সৰু হোৱা"],
   ["formation of a benign cyst", "নিৰীহ চিষ্ট গঠন"],
   ["death of tumour tissue", "টিউমাৰ কলাৰ মৃত্যু"]], 0,
  "Metastasis is the spread of malignant cells through blood, lymph or body cavities to form a secondary tumour, which is what makes cancer dangerous. Shrinkage and cell death are responses to treatment, not metastasis.",
  "মেটাষ্টাছিছ হ'ল মাৰাত্মক কোষ ৰক্ত, লসিকা বা শৰীৰ গহ্বৰেৰে বিয়পি গৌণ টিউমাৰ গঠন, যিয়ে কৰ্কটক বিপদজনক কৰে। সৰু হোৱা আৰু কোষ মৃত্যু চিকিৎসাৰ প্ৰতিক্ৰিয়া, মেটাষ্টাছিছ নহয়।");

add("nursing-570",
  "A patient's apical pulse is counted at 128 beats per minute. The nurse documents this rate as",
  "ৰোগীৰ হৃদয়ৰ শিখৰ নাড়ী প্ৰতি মিনিটত ১২৮ বাৰ জোখা হ'ল। নাৰ্ছে এই হাৰ লিখে",
  [["100 per minute in an adult", "প্ৰাপ্তবয়স্কত প্ৰতি মিনিটত ১০০"],
   ["60 per minute in an adult", "প্ৰাপ্তবয়স্কত প্ৰতি মিনিটত ৬০"],
   ["120 per minute in a child", "শিশুত প্ৰতি মিনিটত ১২০"],
   ["40 per minute in an adult", "প্ৰাপ্তবয়স্কত প্ৰতি মিনিটত ৪০"]], 0,
  "In an adult a resting rate above a hundred is tachycardia, while below sixty is bradycardia. A child normally runs faster, so 120 is not tachycardia at that age.",
  "প্ৰাপ্তবয়স্কত বিশ্ৰামৰ হাৰ এশৰ ওপৰত টেকিকাৰ্ডিয়া, আৰু ষাঠিৰ তলত ব্ৰেডিকাৰ্ডিয়া। শিশুৰ হাৰ স্বাভাৱিকভাৱে বেছি, সেয়ে সেই বয়সত ১২০ টেকিকাৰ্ডিয়া নহয়।");

add("nursing-571",
  "The prefix 'hypo-' in hypothyroidism indicates that the thyroid is",
  "হাইপ'থাইৰয়ডিজিমত 'হাইপ'- উপসৰ্গই বুজায় থাইৰয়ড",
  [["underactive", "কম সক্ৰিয়"],
   ["overactive", "অতি সক্ৰিয়"],
   ["enlarged", "ডাঙৰ হোৱা"],
   ["absent", "অনুপস্থিত"]], 0,
  "Hypo- means under or below, so hypothyroidism is reduced thyroid activity, with weight gain and cold intolerance. Overactivity is hyperthyroidism, enlargement is goitre and absence is agenesis.",
  "হাইপ'- মানে কম বা তলত, সেয়ে হাইপ'থাইৰয়ডিজিম কম থাইৰয়ড সক্ৰিয়তা, ওজন বৃদ্ধি আৰু শীত অসহনীয়তাৰ সৈতে। অতিসক্ৰিয়তা হাইপাৰথাইৰয়ডিজিম, ডাঙৰ হোৱা গলগণ্ড আৰু অনুপস্থিতি এজেনেছিছ।");

add("nursing-572",
  "A surgeon tells the family that the patient will most likely recover fully within a month. The medical term for this forecast of the likely course is",
  "শল্যচিকিৎসকে পৰিয়ালক কয় যে ৰোগী এমাহৰ ভিতৰত সম্পূৰ্ণৰূপে আৰোগ্য হোৱাৰ সম্ভাৱনা বেছি। ৰোগৰ সম্ভাব্য গতিৰ এই ভৱিষ্যদ্বাণীৰ চিকিৎসা শব্দ",
  [["the likely course and outcome of a disease", "ৰোগৰ সম্ভাব্য গতি আৰু পৰিণতি"],
   ["the cause of the disease", "ৰোগৰ কাৰণ"],
   ["the name of the disease", "ৰোগৰ নাম"],
   ["the test used to detect it", "ধৰা পেলোৱা পৰীক্ষা"]], 0,
  "Prognosis is the forecast of how the illness will progress and end, which guides planning and discussion with the family. Cause is aetiology, name is diagnosis and the test is investigation.",
  "প্ৰগন'ছিছ হ'ল ৰোগ কেনেকৈ আগবাঢ়ি শেষ হ'ব তাৰ ভৱিষ্যদ্বাণী, যিয়ে পৰিকল্পনা আৰু পৰিয়ালৰ সৈতে আলোচনা চলায়। কাৰণ ইটিঅ'লজি, নাম নিদান আৰু পৰীক্ষা অনুসন্ধান।");

add("nursing-573",
  "The suffix -scopy in endoscopy means",
  "এণ্ড'স্কপিত -স্কপি প্ৰত্যয়ই বুজায়",
  [["visual examination with an instrument", "যন্ত্ৰেৰে দৃশ্য পৰীক্ষা"],
   ["surgical removal", "শল্যচিকিৎসাৰে আঁতৰোৱা"],
   ["taking a sample", "নমুনা লোৱা"],
   ["measuring pressure", "চাপ জোখা"]], 0,
  "-scopy means looking into with a scope, so endoscopy is visual inspection of a cavity. Removal is -ectomy, sampling is biopsy and pressure measurement is manometry.",
  "-স্কপি মানে স্ক'পেৰে ভিতৰলৈ চোৱা, সেয়ে এণ্ড'স্কপি গহ্বৰৰ দৃশ্য পৰীক্ষা। আঁতৰোৱা -এক্টমি, নমুনা বায়'প্সি আৰু চাপ জোখা মেন'মেট্ৰি।");

add("nursing-574",
  "The term 'acute' in acute appendicitis indicates that the condition",
  "তীব্ৰ এপেণ্ডিচাইটিছত 'তীব্ৰ' শব্দই বুজায় অৱস্থাটো",
  [["has a sudden onset and short course", "হঠাতে আৰম্ভ হৈ চুটি সময় থাকে"],
   ["is mild and long standing", "পাতল আৰু দীৰ্ঘদিনীয়া"],
   ["is inherited", "উত্তৰাধিকাৰী"],
   ["cannot be treated", "চিকিৎসা কৰিব নোৱাৰি"]], 0,
  "Acute describes sudden onset with a short, often severe course, which is why acute appendicitis needs prompt surgery. Mild and long standing is chronic, and treatability is not implied.",
  "তীব্ৰ মানে হঠাতে আৰম্ভ হৈ চুটি, প্ৰায়ে গুৰুতৰ গতি, সেয়ে তীব্ৰ এপেণ্ডিচাইটিছত সোনকালে অস্ত্ৰোপচাৰ লাগে। পাতল আৰু দীৰ্ঘদিনীয়া দীৰ্ঘকালীন, আৰু চিকিৎসাযোগ্যতাৰ ইংগিত নাই।");

add("nursing-575",
  "The combining form 'nephr-' as in nephritis refers to the",
  "'নেফ্ৰ-' সংযোগী ৰূপ, যেনে নেফ্ৰাইটিছত, বুজায়",
  [["kidney", "বৃক্ক"],
   ["nerve", "স্নায়ু"],
   ["liver", "যকৃত"],
   ["bladder", "মূত্ৰাশয়"]], 0,
  "Nephr- is the kidney, so nephritis is inflammation of the kidney. Nerve is neur-, liver is hepat- and bladder is cyst-.",
  "নেফ্ৰ- মানে বৃক্ক, সেয়ে নেফ্ৰাইটিছ বৃক্কৰ প্ৰদাহ। স্নায়ু নিউৰ-, যকৃত হেপাট- আৰু মূত্ৰাশয় ছিষ্ট-।");

add("nursing-576",
  "A patient's notes record 'BP 150/95 mmHg, PR 88/min, RR 18/min, SpO2 97%'. The abbreviation PR stands for",
  "ৰোগীৰ টোকাত 'BP 150/95 mmHg, PR 88/min, RR 18/min, SpO2 97%' আছে। PR সংক্ষেপে বুজায়",
  [["pulse rate", "নাড়ীৰ হাৰ"],
   ["pupil reaction", "চকুৰ গুটিৰ প্ৰতিক্ৰিয়া"],
   ["protein ratio", "প্ৰ'টিন অনুপাত"],
   ["per rectum", "মলদ্বাৰে"]], 0,
  "In a vital signs line PR is pulse rate, alongside blood pressure, respiratory rate and oxygen saturation. Pupil reaction and per rectum are recorded separately and protein ratio is a laboratory value.",
  "সংকট চিহ্নৰ শাৰীত PR নাড়ীৰ হাৰ, ৰক্তচাপ, উশাহৰ হাৰ আৰু অক্সিজেন সম্পৃক্তিৰ লগত। চকুৰ গুটিৰ প্ৰতিক্ৰিয়া আৰু মলদ্বাৰে পৃথকে লিখা হয়, আৰু প্ৰ'টিন অনুপাত পৰীক্ষাগাৰৰ মান।");

add("nursing-577",
  "A nurse notices a blue tinge on the lips and nail beds of a patient with severe breathlessness. The clinical term for this finding is",
  "তীব্ৰ উশাহ কষ্ট থকা ৰোগীৰ ওঁঠ আৰু নখৰ শয্যাত নীলা ৰং দেখা যায়। এই ফলৰ নিদানিক শব্দ",
  [["a bluish discolouration of skin from poor oxygenation", "কম অক্সিজেনৰপৰা ছাল নীলা হোৱা"],
   ["yellowing of the skin", "ছাল হালধীয়া হোৱা"],
   ["paleness from blood loss", "তেজ ক্ষতিৰপৰা শেঁতা হোৱা"],
   ["redness from inflammation", "প্ৰদাহৰপৰা ৰঙা হোৱা"]], 0,
  "Cyan- means blue, so cyanosis is the blue tinge of lips and nail beds when haemoglobin is poorly oxygenated. Yellow is jaundice, pallor is anaemia or haemorrhage and redness is erythema.",
  "ছায়ান- মানে নীলা, সেয়ে ছায়ান'ছিছ ওঁঠ আৰু নখৰ নীলা ৰং যেতিয়া হিম'গ্ল'বিনে অক্সিজেন কম পায়। হালধীয়া কামলা, শেঁতা ৰক্তহীনতা বা ৰক্তস্ৰাৱ আৰু ৰঙা ইৰিথিমা।");

add("nursing-578",
  "The term 'haemoptysis' means",
  "'হিম'প্টাইছিছ' শব্দৰ অৰ্থ",
  [["coughing up blood", "কাহত তেজ ওলোৱা"],
   ["vomiting blood", "তেজ বমি কৰা"],
   ["blood in the stool", "শৌচত তেজ"],
   ["bleeding from the nose", "নাকৰপৰা তেজ"]], 0,
  "Haem- is blood and -ptysis is spitting, so haemoptysis is blood brought up by coughing from the respiratory tract. Vomiting blood is haematemesis and nose bleeding is epistaxis.",
  "হিম- মানে তেজ আৰু -টাইছিছ মানে থু পেলোৱা, সেয়ে হিম'প্টাইছিছ শ্বাসতন্ত্ৰৰপৰা কাহত ওলোৱা তেজ। তেজ বমি হেমাটেমেছিছ আৰু নাকৰ ৰক্তস্ৰাৱ এপিষ্টেক্সিছ।");

add("nursing-579",
  "The term 'antipyretic' describes a drug that",
  "'এণ্টিপাইৰেটিক' শব্দই বুজায় ঔষধ এটা যি",
  [["reduces fever", "জ্বৰ কমায়"],
   ["relieves pain only", "কেৱল ব্যথা লাঘৱ কৰে"],
   ["prevents infection", "সংক্ৰমণ ৰোধ কৰে"],
   ["lowers blood pressure", "ৰক্তচাপ কমায়"]], 0,
  "Anti- means against and pyretic refers to fever, so an antipyretic lowers body temperature, as paracetamol does. A pure painkiller is an analgesic and a pressure lowering drug is an antihypertensive.",
  "এণ্টি- মানে বিৰুদ্ধে আৰু পাইৰেটিক জ্বৰক বুজায়, সেয়ে এণ্টিপাইৰেটিকে শৰীৰৰ উষ্ণতা কমায়, যেনে পেৰাচিটামলে। কেৱল বেদনানাশক এনেলজেছিক আৰু চাপ কমোৱা ঔষধ এণ্টিহাইপাৰটেনছিভ।");

add("nursing-580",
  "A term meaning 'before surgery' is",
  "'অস্ত্ৰোপচাৰৰ আগতে' বুজোৱা শব্দ",
  [["preoperative", "প্ৰি-অপাৰেটিভ"],
   ["postoperative", "প'ষ্ট-অপাৰেটিভ"],
   ["perioperative", "পেৰি-অপাৰেটিভ"],
   ["intraoperative", "ইণ্ট্ৰা-অপাৰেটিভ"]], 0,
  "Pre- means before, so preoperative care happens before the operation. Post- is after, peri- is around the whole period and intra- is during the operation itself.",
  "প্ৰি- মানে আগতে, সেয়ে প্ৰি-অপাৰেটিভ যতন অস্ত্ৰোপচাৰৰ আগতে হয়। প'ষ্ট- পিছত, পেৰি- গোটেই সময়ৰ চাৰিওফালে আৰু ইণ্ট্ৰা- অস্ত্ৰোপচাৰৰ সময়ত।");

/* ================= health-programmes-assam ================= */
useLeaf("health-programmes-assam");

add("nursing-581",
  "Under Ayushman Bharat, the annual cover per family for secondary and tertiary care is",
  "আয়ুষ্মান ভাৰতৰ অধীনত প্ৰতি পৰিয়ালৰ বছৰি মাধ্যমিক আৰু তৃতীয় শ্ৰেণীৰ চিকিৎসাৰ বীমা",
  [["five lakh rupees", "পাঁচ লাখ টকা"],
   ["one lakh rupees", "এক লাখ টকা"],
   ["fifty thousand rupees", "পঞ্চাশ হাজাৰ টকা"],
   ["ten lakh rupees", "দহ লাখ টকা"]], 0,
  "The Pradhan Mantri Jan Arogya Yojana arm of Ayushman Bharat gives five lakh rupees a year per eligible family for hospitalisation. One lakh and fifty thousand are far below the notified cover.",
  "আয়ুষ্মান ভাৰতৰ প্ৰধানমন্ত্ৰী জন আৰোগ্য যোজনা অংশে যোগ্য পৰিয়ালক বছৰি পাঁচ লাখ টকাৰ চিকিৎসালয় সুবিধা দিয়ে। এক লাখ আৰু পঞ্চাশ হাজাৰ নিৰ্ধাৰিত সীমাতকৈ বহু কম।");

add("nursing-582",
  "The main purpose of the Nikshay portal in India is to",
  "ভাৰতত নিক্ষয় প'ৰ্টেলৰ মূল উদ্দেশ্য",
  [["track every tuberculosis patient and their treatment outcome", "প্ৰতিজন যক্ষ্মা ৰোগী আৰু চিকিৎসাৰ ফল অনুসৰণ কৰা"],
   ["register births and deaths", "জন্ম আৰু মৃত্যু পঞ্জীয়ন কৰা"],
   ["book train tickets for patients", "ৰোগীৰ বাবে ৰে'ল টিকট বুকিং কৰা"],
   ["store vaccine stock only", "কেৱল টিকাৰ ভাণ্ডাৰ ৰখা"]], 0,
  "Nikshay is the case based electronic registry for tuberculosis, and it is what allows notification, treatment adherence and outcome reporting. Births and deaths are registered elsewhere and it is not a booking system.",
  "নিক্ষয় যক্ষ্মাৰ ৰোগী-ভিত্তিক ইলেক্ট্ৰনিক পঞ্জী, আৰু ইয়াৰ দ্বাৰাই জাননী, চিকিৎসাৰ অনুগততা আৰু ফল প্ৰতিবেদন সম্ভৱ হয়। জন্ম-মৃত্যু অন্য ঠাইত পঞ্জীয়ন হয় আৰু ই বুকিং ব্যৱস্থা নহয়।");

add("nursing-583",
  "The Jan Aushadhi scheme is intended to",
  "জন ঔষধি আঁচনিৰ উদ্দেশ্য",
  [["provide quality generic medicines at low cost", "কম খৰচত মানসম্মত জেনেৰিক ঔষধ দিয়া"],
   ["export medicines to other countries", "ঔষধ আন দেশলৈ ৰপ্তানি কৰা"],
   ["ban branded medicines", "ব্ৰেণ্ডযুক্ত ঔষধ নিষিদ্ধ কৰা"],
   ["train doctors abroad", "ডাক্তৰ বিদেশত প্ৰশিক্ষণ দিয়া"]], 0,
  "Jan Aushadhi stores sell unbranded generics at prices well below branded equivalents, which improves affordability. The scheme does not export, ban brands or train doctors.",
  "জন ঔষধি দোকানে ব্ৰেণ্ডহীন জেনেৰিক ব্ৰেণ্ডতকৈ বহু কম দামত বিক্ৰী কৰে, যিয়ে সুলভতা বঢ়ায়। আঁচনিয়ে ৰপ্তানি, ব্ৰেণ্ড নিষেধ বা ডাক্তৰ প্ৰশিক্ষণ নকৰে।");

add("nursing-584",
  "In Assam, the tea garden hospitals are supported under the programme known as",
  "অসমত চাহ বাগিচাৰ চিকিৎসালয়ক সহায় কৰা কাৰ্যসূচী",
  [["the Assam Tea Garden Health Scheme", "অসম চাহ বাগিচা স্বাস্থ্য আঁচনি"],
   ["the Pulse Polio programme", "পালছ পলিঅ' কাৰ্যসূচী"],
   ["the National Cancer Registry", "ৰাষ্ট্ৰীয় কৰ্কট পঞ্জী"],
   ["the Rashtriya Swasthya Bima Yojana only", "কেৱল ৰাষ্ট্ৰীয় স্বাস্থ্য বীমা যোজনা"]], 0,
  "Tea garden hospitals in Assam are strengthened through a dedicated state scheme that funds staff, drugs and infrastructure for garden workers. Polio and cancer registry are separate national activities.",
  "অসমৰ চাহ বাগিচাৰ চিকৎসালয়বোৰ বাগিচা শ্ৰমিকৰ বাবে কৰ্মচাৰী, ঔষধ আৰু আন্তঃগাঁথনি যোগোৱা ৰাজ্যিক আঁচনিৰ জৰিয়তে সবল কৰা হয়। পলিঅ' আৰু কৰ্কট পঞ্জী পৃথক ৰাষ্ট্ৰীয় কাম।");

add("nursing-585",
  "The main objective of the National Programme for Prevention and Control of Non-Communicable Diseases is to",
  "অসংক্ৰামক ৰোগ প্ৰতিৰোধ আৰু নিয়ন্ত্ৰণ ৰাষ্ট্ৰীয় কাৰ্যসূচীৰ মূল উদ্দেশ্য",
  [["screen and manage diabetes, hypertension and common cancers at primary level", "প্ৰাথমিক স্তৰত মধুমেহ, উচ্চ ৰক্তচাপ আৰু সাধাৰণ কৰ্কটৰ স্ক্ৰীণিং তথা চিকিৎসা"],
   ["eliminate malaria", "মেলেৰিয়া নিৰ্মূল কৰা"],
   ["provide free dialysis to all", "সকলোকে বিনামূলীয়া ডায়েলাইছিছ দিয়া"],
   ["build new medical colleges", "নতুন চিকিৎসা মহাবিদ্যালয় সজা"]], 0,
  "The programme puts population based screening for hypertension, diabetes and three common cancers into primary care, so cases are found and treated early. Malaria belongs to the vector borne programme and dialysis or construction are separate.",
  "কাৰ্যসূচীয়ে উচ্চ ৰক্তচাপ, মধুমেহ আৰু তিনি সাধাৰণ কৰ্কটৰ জনসংখ্যা-ভিত্তিক স্ক্ৰীণিং প্ৰাথমিক যতনত ৰাখে, যাতে কেছ সোনকালে ধৰা পৰি চিকিৎসা হয়। মেলেৰিয়া বাহকজনিত কাৰ্যসূচীৰ আৰু ডায়েলাইছিছ বা নিৰ্মাণ পৃথক।");

add("nursing-586",
  "The Health and Wellness Centre under Ayushman Bharat is expected to deliver",
  "আয়ুষ্মান ভাৰতৰ অধীনত স্বাস্থ্য আৰু সুস্থতা কেন্দ্ৰই দিব লাগে",
  [["a defined package of primary care including NCD screening and essential drugs", "অসংক্ৰামক ৰোগ স্ক্ৰীণিং তথা অত্যাৱশ্যকীয় ঔষধসহ প্ৰাথমিক যতনৰ নিৰ্দিষ্ট পেকেজ"],
   ["only inpatient surgery", "কেৱল অন্তঃৰোগী অস্ত্ৰোপচাৰ"],
   ["only immunization", "কেৱল টিকাকৰণ"],
   ["only ambulance transport", "কেৱল এম্বুলেন্স পৰিবহন"]], 0,
  "The centre delivers a comprehensive primary care package, from maternal and child services to screening for hypertension, diabetes and cancers, with free essential medicines. Surgery, immunization alone or transport alone are too narrow.",
  "কেন্দ্ৰই মাতৃ-শিশু সেৱাৰপৰা উচ্চ ৰক্তচাপ, মধুমেহ আৰু কৰ্কট স্ক্ৰীণিংলৈকে বিনামূলীয়া অত্যাৱশ্যকীয় ঔষধসহ ব্যাপক প্ৰাথমিক যতন পেকেজ দিয়ে। কেৱল অস্ত্ৰোপচাৰ, টিকাকৰণ বা পৰিবহন অতি সংকীৰ্ণ।");

add("nursing-587",
  "The purpose of the Maternal and Child Tracking System is to",
  "মাতৃ আৰু শিশু অনুসৰণ ব্যৱস্থাৰ উদ্দেশ্য",
  [["follow every pregnant woman and child for services due", "প্ৰতিগৰাকী গৰ্ভৱতী মহিলা আৰু শিশুক প্ৰাপ্য সেৱাৰ বাবে অনুসৰণ কৰা"],
   ["track medicine stock in warehouses", "গুদামত ঔষধৰ ভাণ্ডাৰ অনুসৰণ কৰা"],
   ["monitor doctor attendance", "ডাক্তৰৰ উপস্থিতি নিৰীক্ষণ কৰা"],
   ["record hospital income", "চিকিৎসালয়ৰ আয় লিখা"]], 0,
  "The system registers pregnancies and births and flags the antenatal checks, immunisations and growth visits that are due, so defaulters can be followed up. Stock, attendance and income belong to other systems.",
  "ব্যৱস্থাই গৰ্ভাৱস্থা আৰু জন্ম পঞ্জীয়ন কৰি প্ৰাপ্য প্ৰসৱপূৰ্ব পৰীক্ষা, টিকাকৰণ আৰু বৃদ্ধি ভ্ৰমণ চিহ্নিত কৰে, যাতে অৱহেলাকাৰীক অনুসৰণ কৰিব পাৰি। ভাণ্ডাৰ, উপস্থিতি আৰু আয় অন্য ব্যৱস্থাৰ।");

add("nursing-588",
  "The main aim of the National Health Policy 2017 target for health spending is to raise public health expenditure to",
  "ৰাষ্ট্ৰীয় স্বাস্থ্য নীতি ২০১৭ৰ স্বাস্থ্য ব্যয়ৰ লক্ষ্য — ৰাজহুৱা স্বাস্থ্য ব্যয় তোলা",
  [["2.5 per cent of GDP", "জিডিপিৰ ২.৫ শতাংশ"],
   ["0.5 per cent of GDP", "জিডিপিৰ ০.৫ শতাংশ"],
   ["10 per cent of GDP", "জিডিপিৰ ১০ শতাংশ"],
   ["25 per cent of GDP", "জিডিপিৰ ২৫ শতাংশ"]], 0,
  "The policy set a target of raising government health expenditure to 2.5 per cent of GDP by 2025, from about 1.15 per cent. Half a per cent is below the starting point and ten or twenty five per cent are far beyond it.",
  "নীতিয়ে ২০২৫ চনলৈ চৰকাৰী স্বাস্থ্য ব্যয় প্ৰায় ১.১৫ শতাংশৰপৰা জিডিপিৰ ২.৫ শতাংশলৈ তোলাৰ লক্ষ্য ৰাখিছিল। আধা শতাংশ আৰম্ভণিৰ তলত আৰু দহ বা পঁচিশ শতাংশ বহু ওপৰত।");

add("nursing-589",
  "The Rogi Kalyan Samiti of a government hospital functions mainly to",
  "চৰকাৰী চিকিৎসালয়ৰ ৰোগী কল্যাণ সমিতিৰ মূল কাম",
  [["manage hospital affairs and improve patient services locally", "চিকিৎসালয়ৰ পৰিচালনা কৰি স্থানীয়ভাৱে ৰোগী সেৱা উন্নত কৰা"],
   ["conduct recruitment of doctors", "ডাক্তৰ নিযুক্তি কৰা"],
   ["fix drug prices nationally", "ৰাষ্ট্ৰীয়ভাৱে ঔষধৰ দাম নিৰ্ধাৰণ কৰা"],
   ["approve the state health budget", "ৰাজ্যিক স্বাস্থ্য বাজেট অনুমোদন কৰা"]], 0,
  "The committee is a hospital level body of staff and community representatives that uses local funds to improve services and patient welfare. Recruitment, national pricing and the state budget lie outside its remit.",
  "সমিতি কৰ্মচাৰী আৰু সমাজ প্ৰতিনিধিৰ চিকিৎসালয়-পৰ্যায়ৰ গোট, যিয়ে স্থানীয় পুঁজিৰে সেৱা আৰু ৰোগী কল্যাণ উন্নত কৰে। নিযুক্তি, ৰাষ্ট্ৰীয় দাম আৰু ৰাজ্যিক বাজেট তাৰ সীমাৰ বাহিৰত।");

add("nursing-590",
  "The National Ambulance Service number 108 in Assam provides",
  "অসমত ৰাষ্ট্ৰীয় এম্বুলেন্স সেৱা নম্বৰ ১০৮য়ে দিয়ে",
  [["free emergency transport and pre-hospital care", "বিনামূলীয়া জৰুৰী পৰিবহন আৰু চিকিৎসালয়ৰ আগৰ যতন"],
   ["free medicines for chronic illness", "দীৰ্ঘকালীন ৰোগৰ বাবে বিনামূলীয়া ঔষধ"],
   ["antenatal check-ups at home", "ঘৰত প্ৰসৱপূৰ্ব পৰীক্ষা"],
   ["laboratory reports by post", "ডাকযোগে পৰীক্ষাগাৰৰ প্ৰতিবেদন"]], 0,
  "A toll free 108 call brings a staffed ambulance with basic life support, which shortens the time to definitive care. Medicines, antenatal checks and reports are delivered through other services.",
  "মাচুলমুক্ত ১০৮ ফোনে মৌলিক জীৱন সহায়সহ কৰ্মচাৰীযুক্ত এম্বুলেন্স পঠিয়ায়, যিয়ে নিশ্চিত যতনৰ সময় কমায়। ঔষধ, প্ৰসৱপূৰ্ব পৰীক্ষা আৰু প্ৰতিবেদন অন্য সেৱাৰ জৰিয়তে দিয়া হয়।");

add("nursing-591",
  "An eighty year old man living alone in a village cannot travel to the PHC. The programme that funds home based geriatric care for him is the",
  "গাঁৱত অকলে থকা আশীবৰ্ষীয়া বৃদ্ধই পিএইচচিলৈ যাব নোৱাৰে। তেওঁৰ বাবে ঘৰুৱা জেৰিয়াট্ৰিক যতন যোগোৱা কাৰ্যসূচী",
  [["provide accessible preventive, curative and rehabilitative care for older people", "বয়সীয়ালৰ বাবে সহজলভ্য প্ৰতিৰোধমূলক, চিকিৎসামূলক আৰু পুনৰ্বাসনমূলক যতন দিয়া"],
   ["provide pensions only", "কেৱল পেন্সন দিয়া"],
   ["build old age homes only", "কেৱল বৃদ্ধাশ্ৰম সজা"],
   ["train geriatric surgeons abroad", "বিদেশত জেৰিয়াট্ৰিক শল্যচিকিৎসক প্ৰশিক্ষণ দিয়া"]], 0,
  "The programme adds geriatric services at primary, secondary and tertiary level, including home care for the immobile. Pensions and old age homes are other departments' work and the programme is not about foreign training.",
  "কাৰ্যসূচীয়ে প্ৰাথমিক, মাধ্যমিক আৰু তৃতীয় স্তৰত জেৰিয়াট্ৰিক সেৱা যোগ কৰে, অচলসকলৰ ঘৰুৱা যতনসহ। পেন্সন আৰু বৃদ্ধাশ্ৰম অন্য বিভাগৰ কাম আৰু কাৰ্যসূচী বিদেশী প্ৰশিক্ষণৰ বিষয় নহয়।");

add("nursing-592",
  "The Rashtriya Bal Swasthya Karyakram is designed to screen children for",
  "ৰাষ্ট্ৰীয় বাল স্বাস্থ্য কাৰ্যসূচীয়ে শিশুৰ স্ক্ৰীণিং কৰে",
  [["defects at birth, deficiencies, diseases and developmental delay", "জন্মগত ত্ৰুটি, অভাৱ, ৰোগ আৰু বিকাশৰ পলম"],
   ["only dental caries", "কেৱল দাঁতৰ ক্ষয়"],
   ["only vision", "কেৱল দৃষ্টি"],
   ["only hearing", "কেৱল শ্ৰৱণ"]], 0,
  "The programme uses the four D approach, screening for defects at birth, deficiencies, childhood diseases and developmental delay, and refers positive cases for care. Dental, vision or hearing alone are too narrow.",
  "কাৰ্যসূচীয়ে চাৰি ডি পদ্ধতি ব্যৱহাৰ কৰি জন্মগত ত্ৰুটি, অভাৱ, শৈশৱৰ ৰোগ আৰু বিকাশৰ পলম স্ক্ৰীণ কৰি ধনাত্মক কেছ যতনলৈ পঠিয়ায়। কেৱল দাঁত, দৃষ্টি বা শ্ৰৱণ অতি সংকীৰ্ণ।");

add("nursing-593",
  "The District Early Intervention Centre supports children who",
  "জিলা প্ৰাৰম্ভিক হস্তক্ষেপ কেন্দ্ৰই সহায় কৰে সেই শিশুক যিসকলে",
  [["have a delay or disability found on screening", "স্ক্ৰীণিঙত পলম বা অক্ষমতা পোৱা গৈছে"],
   ["need routine immunisation only", "কেৱল নিয়মীয়া টিকাকৰণ লাগে"],
   ["are above eighteen years", "আঠৰ বছৰৰ ওপৰত"],
   ["have no family support", "পৰিয়ালৰ সহায় নাই"]], 0,
  "The centre gives confirmatory testing, counselling and referral for children flagged by screening, so early therapy starts before the delay becomes fixed. It is not an immunisation or adult service.",
  "কেন্দ্ৰই স্ক্ৰীণিঙত চিহ্নিত শিশুৰ নিশ্চিতকৰণ পৰীক্ষা, পৰামৰ্শ আৰু প্ৰেৰণ দিয়ে, যাতে পলম স্থায়ী হোৱাৰ আগতে চিকিৎসা আৰম্ভ হয়। ই টিকাকৰণ বা প্ৰাপ্তবয়স্ক সেৱা নহয়।");

add("nursing-594",
  "The National Tobacco Control Programme aims mainly to",
  "ৰাষ্ট্ৰীয় তামাক নিয়ন্ত্ৰণ কাৰ্যসূচীৰ মূল লক্ষ্য",
  [["reduce tobacco use through law, cessation and awareness", "আইন, ত্যাগ আৰু সজাগতাৰ জৰিয়তে তামাক ব্যৱহাৰ কমোৱা"],
   ["increase tobacco exports", "তামাক ৰপ্তানি বঢ়োৱা"],
   ["subsidise tobacco farming", "তামাক খেতিত ৰাজসাহায্য দিয়া"],
   ["ban all nicotine research", "সকলো নিক'টিন গৱেষণা নিষিদ্ধ কৰা"]], 0,
  "The programme enforces the tobacco control law, runs cessation clinics and public awareness, and monitors compliance. Export, subsidy and research bans are not its objectives.",
  "কাৰ্যসূচীয়ে তামাক নিয়ন্ত্ৰণ আইন বলবৎ কৰে, ত্যাগ ক্লিনিক আৰু ৰাজহুৱা সজাগতা চলায়, আৰু পালন নিৰীক্ষণ কৰে। ৰপ্তানি, ৰাজসাহায্য আৰু গৱেষণা নিষেধ তাৰ লক্ষ্য নহয়।");

add("nursing-595",
  "Under the National Health Mission, a First Referral Unit at a district hospital is expected to provide",
  "ৰাষ্ট্ৰীয় স্বাস্থ্য অভিযানৰ অধীনত জিলা চিকিৎসালয়ৰ প্ৰথম প্ৰেৰণ এককই দিব লাগে",
  [["comprehensive emergency obstetric and newborn care with surgery and blood", "শল্যচিকিৎসা আৰু তেজসহ ব্যাপক জৰুৰী প্ৰসূতি তথা নৱজাতক যতন"],
   ["only outpatient consultation", "কেৱল বাহ্যিক ৰোগী পৰামৰ্শ"],
   ["only immunization camps", "কেৱল টিকাকৰণ শিবিৰ"],
   ["only ambulance parking", "কেৱল এম্বুলেন্স পাৰ্কিং"]], 0,
  "A First Referral Unit is the level that can perform caesarean sections, give blood and manage sick newborns, which is why sub-centres and PHCs refer there. Outpatient care, camps or parking are far below that role.",
  "প্ৰথম প্ৰেৰণ একক সেই স্তৰ যিয়ে চিজাৰিয়ান কৰিব, তেজ দিব আৰু অসুস্থ নৱজাতক চম্ভালিব পাৰে, সেয়ে উপ-কেন্দ্ৰ আৰু পিএইচচিয়ে তালৈ পঠিয়ায়। বাহ্যিক যতন, শিবিৰ বা পাৰ্কিং তাৰ ভূমিকাৰ বহু তলত।");

add("nursing-596",
  "The main objective of the National Viral Hepatitis Control Programme is to",
  "ৰাষ্ট্ৰীয় ভাইৰেল হেপাটাইটিছ নিয়ন্ত্ৰণ কাৰ্যসূচীৰ মূল উদ্দেশ্য",
  [["prevent, diagnose and treat hepatitis B and C towards elimination", "হেপাটাইটিছ বি আৰু চি ৰোধ, নিৰ্ণয় আৰু চিকিৎসা কৰি নিৰ্মূলৰ দিশে যোৱা"],
   ["vaccinate against malaria", "মেলেৰিয়াৰ বিৰুদ্ধে টিকা দিয়া"],
   ["treat only hepatitis A", "কেৱল হেপাটাইটিছ এ চিকিৎসা কৰা"],
   ["ban blood transfusion", "ৰক্ত সঞ্চাৰণ নিষিদ্ধ কৰা"]], 0,
  "The programme combines birth dose vaccination, screening, free antiviral treatment and safe injection practice to move towards eliminating hepatitis B and C. Malaria, hepatitis A alone and banning transfusion are not its scope.",
  "কাৰ্যসূচীয়ে জন্ম মাত্ৰাৰ টিকা, স্ক্ৰীণিং, বিনামূলীয়া ভাইৰাছৰোধী চিকিৎসা আৰু সুৰক্ষিত ইনজেকচন অভ্যাস মিলাই হেপাটাইটিছ বি আৰু চি নিৰ্মূলৰ দিশে যায়। মেলেৰিয়া, কেৱল হেপাটাইটিছ এ আৰু সঞ্চাৰণ নিষেধ তাৰ পৰিসৰ নহয়।");

add("nursing-597",
  "The eSanjeevani platform provides",
  "ই-সঞ্জীৱনী মঞ্চই দিয়ে",
  [["teleconsultation with doctors at a distance", "দূৰত্বত ডাক্তৰৰ সৈতে টেলি-পৰামৰ্শ"],
   ["free ambulance transport", "বিনামূলীয়া এম্বুলেন্স পৰিবহন"],
   ["blood bank management", "ৰক্ত ভাণ্ডাৰ পৰিচালনা"],
   ["medical college admission", "চিকিৎসা মহাবিদ্যালয়ত নামভৰ্তি"]], 0,
  "eSanjeevani is the national telemedicine service, linking patients at a health centre or home to a doctor by video. Ambulance, blood bank and admission are separate systems.",
  "ই-সঞ্জীৱনী ৰাষ্ট্ৰীয় টেলিমেডিচিন সেৱা, যিয়ে স্বাস্থ্য কেন্দ্ৰ বা ঘৰত থকা ৰোগীক ভিডিঅ'ৰে ডাক্তৰৰ সৈতে সংযোগ কৰে। এম্বুলেন্স, ৰক্ত ভাণ্ডাৰ আৰু নামভৰ্তি পৃথক ব্যৱস্থা।");

add("nursing-598",
  "The Janani Shishu Suraksha Karyakram entitles a pregnant woman delivering in a public facility to",
  "জননী শিশু সুৰক্ষা কাৰ্যসূচীয়ে ৰাজহুৱা সুবিধাত প্ৰসৱ কৰা মহিলাক অধিকাৰ দিয়ে",
  [["free delivery, drugs, diagnostics, diet and transport", "বিনামূলীয়া প্ৰসৱ, ঔষধ, পৰীক্ষা, আহাৰ আৰু পৰিবহন"],
   ["a cash prize only", "কেৱল নগদ পুৰস্কাৰ"],
   ["free housing", "বিনামূলীয়া আৱাস"],
   ["free education for the child", "শিশুৰ বিনামূলীয়া শিক্ষা"]], 0,
  "The scheme removes the cost of delivery and caesarean, medicines, diagnostics, diet and referral transport, which is what encourages institutional delivery. A cash prize, housing or education are not part of it.",
  "আঁচনিয়ে প্ৰসৱ আৰু চিজাৰিয়ান, ঔষধ, পৰীক্ষা, আহাৰ আৰু প্ৰেৰণ পৰিবহনৰ খৰচ আঁতৰায়, যিয়ে প্ৰতিষ্ঠানত প্ৰসৱক উৎসাহিত কৰে। নগদ পুৰস্কাৰ, আৱাস বা শিক্ষা ইয়াৰ অংশ নহয়।");

add("nursing-599",
  "A mother asks what the anganwadi centre near her home can offer her two year old child. The correct answer is",
  "মাকে সোধে ঘৰৰ ওচৰৰ অংগনৱাড়ী কেন্দ্ৰই তেওঁৰ দুবছৰীয়া শিশুক কি দিব পাৰে। শুদ্ধ উত্তৰ",
  [["improve nutrition, health and early education of children under six", "ছয় বছৰৰ তলৰ শিশুৰ পুষ্টি, স্বাস্থ্য আৰু প্ৰাৰম্ভিক শিক্ষা উন্নত কৰা"],
   ["provide employment to adults", "প্ৰাপ্তবয়স্কক নিয়োগ দিয়া"],
   ["run secondary schools", "মাধ্যমিক বিদ্যালয় চলোৱা"],
   ["give old age pensions", "বাৰ্ধক্য পেন্সন দিয়া"]], 0,
  "Anganwadi centres under the scheme give supplementary nutrition, immunisation, health checks, pre-school education and nutrition counselling to mothers. Adult employment, secondary schools and pensions belong elsewhere.",
  "আঁচনিৰ অধীনত অংগনৱাড়ী কেন্দ্ৰই মাকসকলক পৰিপূৰক পুষ্টি, টিকাকৰণ, স্বাস্থ্য পৰীক্ষা, প্ৰাক-প্ৰাথমিক শিক্ষা আৰু পুষ্টি পৰামৰ্শ দিয়ে। প্ৰাপ্তবয়স্ক নিয়োগ, মাধ্যমিক বিদ্যালয় আৰু পেন্সন অন্য ঠাইৰ।");

add("nursing-600",
  "A district plans to train its general health workers to recognise depression at the primary health centre. The programme that guides this approach is the",
  "জিলাখনে প্ৰাথমিক স্বাস্থ্য কেন্দ্ৰত হতাশা চিনিবলৈ সাধাৰণ স্বাস্থ্য কৰ্মীক প্ৰশিক্ষণ দিব বিচাৰে। এই পদ্ধতি পৰিচালনা কৰা কাৰ্যসূচী",
  [["make mental health care available at primary level and reduce stigma", "প্ৰাথমিক স্তৰত মানসিক স্বাস্থ্য যতন উপলব্ধ কৰি কলংক কমোৱা"],
   ["build large mental hospitals only", "কেৱল ডাঙৰ মানসিক চিকিৎসালয় সজা"],
   ["license private clinics", "ব্যক্তিগত ক্লিনিকৰ অনুজ্ঞাপত্ৰ দিয়া"],
   ["train psychiatrists abroad", "বিদেশত মনোৰোগ বিশেষজ্ঞ প্ৰশিক্ষণ দিয়া"]], 0,
  "The programme integrates mental health into primary care, trains general health workers and runs awareness to reduce stigma, which reaches far more people than hospitals alone. Licensing and foreign training are outside its aims.",
  "কাৰ্যসূচীয়ে মানসিক স্বাস্থ্য প্ৰাথমিক যতনত সংযুক্ত কৰে, সাধাৰণ স্বাস্থ্য কৰ্মীক প্ৰশিক্ষণ দিয়ে আৰু কলংক কমাবলৈ সজাগতা চলায়, যিয়ে কেৱল চিকিৎসালয়তকৈ বহু বেছি লোকলৈ যায়। অনুজ্ঞাপত্ৰ আৰু বিদেশী প্ৰশিক্ষণ তাৰ লক্ষ্যৰ বাহিৰত।");

module.exports = { questions: Q };
