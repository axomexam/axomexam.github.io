#!/usr/bin/env node
"use strict";

/* axomexam — tools/dhs-dme-technical.nursing-extra3.js
   hospital-infection-control, twenty items (nursing-541..560). */

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

/* ================= hospital-infection-control ================= */
useLeaf("hospital-infection-control");

add("nursing-541",
  "A nurse sustains a needlestick injury from a patient known to be hepatitis B positive and has not been vaccinated. The nurse should first",
  "হেপাটাইটিছ বি পজিটিভ বুলি জনা ৰোগীৰ ছুচে নাৰ্ছৰ আঙুলিত আঘাত কৰিলে, আৰু তেওঁ টিকা লোৱা নাই। নাৰ্ছে প্ৰথমে",
  [["wash the wound with soap and water and report at once for prophylaxis", "ঘাঁ চাবোন আৰু পানীৰে ধুই তৎক্ষণাৎ প্ৰতিৰোধৰ বাবে জনোৱা"],
   ["squeeze the wound hard and apply spirit", "ঘাঁ জোৰকৈ চেপি স্পিৰিট লগোৱা"],
   ["wait to see whether symptoms appear", "লক্ষণ ওলালৈ অপেক্ষা কৰা"],
   ["take a course of oral antibiotics", "মুখে এণ্টিবায়'টিকৰ কোৰ্চ লোৱা"]], 0,
  "Washing removes contaminating blood, and hepatitis B immunoglobulin plus vaccine started within hours prevents infection in an unvaccinated person. Squeezing or spirit damages tissue, and waiting loses the window.",
  "ধুলে দূষিত তেজ আঁতৰে, আৰু টিকা নোলোৱা ব্যক্তিত কেইঘণ্টাৰ ভিতৰত হেপাটাইটিছ বি ইমিউন'গ্ল'বুলিন তথা টিকা আৰম্ভ কৰিলে সংক্ৰমণ ৰোধ হয়। চেপা বা স্পিৰিটে কলাৰ ক্ষতি কৰে, আৰু অপেক্ষা কৰিলে সুযোগ হেৰায়।");

add("nursing-542",
  "A patient with pulmonary tuberculosis is admitted to a general ward. The nurse should ensure",
  "ফুসফুসৰ যক্ষ্মা ৰোগীক সাধাৰণ ৱাৰ্ডত ভৰ্তি কৰা হ'ল। নাৰ্ছে নিশ্চিত কৰিব লাগে",
  [["a well ventilated single room and a surgical mask for the patient when moving", "ভাল বায়ুচলাচলযুক্ত অকলশৰীয়া কোঠা আৰু লৰচৰ কৰোতে ৰোগীৰ বাবে শল্য মাস্ক"],
   ["the patient shares a room with other patients", "ৰোগীয়ে আন ৰোগীৰ সৈতে কোঠা ভাগ কৰে"],
   ["windows are kept closed to prevent draughts", "ড্ৰাফ্ট ৰোধ কৰিবলৈ খিৰিকী বন্ধ ৰখা হয়"],
   ["staff wear gloves only when touching the patient", "কৰ্মীয়ে কেৱল ৰোগীক চুওতে গ্লাভছ পিন্ধে"]], 0,
  "Tuberculosis spreads by airborne droplet nuclei, so ventilation dilutes them and a mask on the patient contains them at source. A shared closed room concentrates the risk, and gloves do nothing against an airborne route.",
  "যক্ষ্মা বায়ুজনিত ড্ৰপলেট নিউক্লিয়েৰে বিয়পে, সেয়ে বায়ুচলাচলে তাক পাতল কৰে আৰু ৰোগীৰ মাস্কই উৎসতে ধৰে। ভাগ কৰা বন্ধ কোঠাই বিপদ ঘন কৰে, আৰু গ্লাভছে বায়ুজনিত পথত একো নকৰে।");

add("nursing-543",
  "A blood spill occurs on the ward floor. The nurse should first",
  "ৱাৰ্ডৰ মজিয়াত তেজ পৰিল। নাৰ্ছে প্ৰথমে",
  [["cover it with absorbent material and apply a chlorine solution", "শোষক বস্তুৰে ঢাকি ক্ল'ৰিনৰ দ্ৰৱ লগোৱা"],
   ["wipe it with a dry mop and continue", "শুকান মপেৰে মচি আগবাঢ়া"],
   ["wash it away with plain water only", "কেৱল সাধাৰণ পানীৰে ধুই পেলোৱা"],
   ["leave it until the cleaning staff arrive", "পৰিষ্কাৰ কৰ্মী অহালৈকে এৰি থোৱা"]], 0,
  "Blood must be absorbed and then disinfected with chlorine at the correct concentration before removal, because hepatitis and HIV survive in blood. A dry mop or plain water spreads the contamination over a wider area.",
  "তেজ শোষি শুদ্ধ ঘনত্বৰ ক্ল'ৰিনেৰে নিষ্ক্ৰিয় কৰাৰ পিছতহে আঁতৰাব লাগে, কাৰণ হেপাটাইটিছ আৰু এইচআইভি তেজত জীয়াই থাকে। শুকান মপ বা সাধাৰণ পানীয়ে দূষণ বেচি ঠাইলৈ বিয়পায়।");

add("nursing-544",
  "A nurse is caring for a patient with Clostridioides difficile diarrhoea. The nurse should",
  "ক্ল'ষ্ট্ৰিডিঅইডেছ ডিফিচিলে ডায়েৰিয়া থকা ৰোগীৰ যতন লোৱা নাৰ্ছে",
  [["wear gloves and gown, and wash hands with soap and water rather than alcohol rub", "গ্লাভছ আৰু গাউন পিন্ধি এলক'হল ৰবৰ নহয় চাবোন-পানীৰে হাত ধোৱা"],
   ["use alcohol hand rub alone after contact", "সংস্পৰ্শৰ পিছত কেৱল এলক'হল ৰব ব্যৱহাৰ কৰা"],
   ["use the same gloves for all patient contact", "সকলো ৰোগীৰ সংস্পৰ্শত একেই গ্লাভছ ব্যৱহাৰ কৰা"],
   ["clean the bed space with a dry cloth", "শুকান কাপোৰেৰে শয্যাৰ ঠাই পৰিষ্কাৰ কৰা"]], 0,
  "C. difficile forms spores that alcohol does not kill, so mechanical washing with soap and water plus gown and gloves is required. Alcohol rub, shared gloves and dry cleaning all leave spores behind.",
  "ছি. ডিফিচিলে স্প'ৰ গঢ়ে যি এলক'হলে নমৰায়, সেয়ে চাবোন-পানীৰে যান্ত্ৰিক ধোৱা লগতে গাউন আৰু গ্লাভছ লাগে। এলক'হল ৰব, ভাগ কৰা গ্লাভছ আৰু শুকান পৰিষ্কাৰে স্প'ৰ এৰি যায়।");

add("nursing-545",
  "A patient has a multidrug resistant organism in a wound. The nurse should",
  "ৰোগীৰ ঘাঁত বহু-ঔষধ প্ৰতিৰোধী জীৱাণু আছে। নাৰ্ছে",
  [["use contact precautions with a dedicated set of equipment", "সংস্পৰ্শ সতৰ্কতা লগতে বাচন-বৰ্তনৰ নিজাকৈ সংহতি ব্যৱহাৰ কৰা"],
   ["use standard precautions only", "কেৱল মানক সতৰ্কতা ব্যৱহাৰ কৰা"],
   ["share the blood pressure cuff with the next patient", "ৰক্তচাপৰ কাফ পৰৱৰ্তী ৰোগীৰ সৈতে ভাগ কৰা"],
   ["discontinue precautions once the wound looks clean", "ঘাঁ পৰিষ্কাৰ দেখিলেই সতৰ্কতা বন্ধ কৰা"]], 0,
  "A resistant organism spreads on hands and shared equipment, so contact precautions with dedicated items contain it. Standard precautions alone are not enough, and a clean looking wound can still carry the organism.",
  "প্ৰতিৰোধী জীৱাণুৱে হাত আৰু ভাগ কৰা সঁজুলিৰে বিয়পে, সেয়ে নিজাকৈ সঁজুলিসহ সংস্পৰ্শ সতৰ্কতাই তাক ধৰে। কেৱল মানক সতৰ্কতা যথেষ্ট নহয়, আৰু পৰিষ্কাৰ দেখা ঘাঁত জীৱাণু থাকিব পাৰে।");

add("nursing-546",
  "A sterile dressing pack has been opened and left on the trolley for forty minutes while the nurse attends another patient. The nurse should",
  "জীৱাণুমুক্ত ড্ৰেছিং পেকেট খুলি চল্লিশ মিনিট ট্ৰলিত এৰি নাৰ্ছে আন ৰোগীৰ ওচৰলৈ গ'ল। নাৰ্ছে",
  [["discard the pack and open a fresh one", "পেকেট পেলাই নতুন এটা খোলা"],
   ["use it because the wrapper was intact", "মেৰামতি অক্ষত আছিল বাবে ব্যৱহাৰ কৰা"],
   ["cover it with a cloth and proceed", "কাপোৰেৰে ঢাকি আগবাঢ়া"],
   ["spray it with antiseptic and use it", "এণ্টিচেপ্টিক ছটিয়াই ব্যৱহাৰ কৰা"]], 0,
  "An opened sterile field is considered contaminated once it is left unattended, because airborne organisms settle on it, so a fresh pack is used. Spraying does not restore sterility and a cloth adds contamination.",
  "এৰি থোৱা খোলা জীৱাণুমুক্ত ক্ষেত্ৰ দূষিত বুলি ধৰা হয়, কাৰণ বায়ুজনিত জীৱাণু তাত জমে, সেয়ে নতুন পেকেট ব্যৱহাৰ কৰা হয়। ছটিওৱাই জীৱাণুমুক্ততা ঘূৰাই নানে আৰু কাপোৰে দূষণ যোগ কৰে।");

add("nursing-547",
  "A nurse has a cold with a runny nose and is assigned to a neutropenic patient. The nurse should",
  "নাৰ্ছৰ নাকৰ পানী ওলোৱা চৰ্দি আৰু নিউট্ৰ'পেনিক ৰোগীক দিয়া হৈছে। নাৰ্ছে",
  [["report the illness and avoid caring for that patient", "অসুস্থতা জনাই সেই ৰোগীৰ যতন লোৱাৰপৰা বিৰত থাকা"],
   ["wear a mask and continue as normal", "মাস্ক পিন্ধি স্বাভাৱিকভাৱে চলি যোৱা"],
   ["work without telling anyone", "কাকো নজনোৱাকৈ কাম কৰা"],
   ["ask the patient to wear a mask instead", "ৰোগীক মাস্ক পিন্ধিবলৈ কোৱা"]], 0,
  "A neutropenic patient has almost no defence against infection, so a nurse with a viral illness is a serious source and must be reassigned. A mask reduces but does not remove the risk, and concealing it endangers the patient.",
  "নিউট্ৰ'পেনিক ৰোগীৰ সংক্ৰমণৰ বিৰুদ্ধে প্ৰায় কোনো প্ৰতিৰক্ষা নাই, সেয়ে ভাইৰাছজনিত অসুস্থতা থকা নাৰ্ছ গুৰুতৰ উৎস আৰু তেওঁক সলনি কৰিব লাগে। মাস্কে বিপদ কমায় কিন্তু আঁতৰাই নিদিয়ে, আৰু লুকুৱালে ৰোগী বিপদত পৰে।");

add("nursing-548",
  "A patient with an infected wound has a dressing that is saturated. The nurse should",
  "সংক্ৰমিত ঘাঁ থকা ৰোগীৰ বেণ্ডেজ তিতা হৈ আছে। নাৰ্ছে",
  [["change it using gloves and dispose of it in the correct colour coded bag", "গ্লাভছ পিন্ধি সলনি কৰি শুদ্ধ ৰঙৰ বেগত পেলোৱা"],
   ["leave it until the next shift", "পৰৱৰ্তী শিফ্টলৈকে এৰি থোৱা"],
   ["change it without gloves to save time", "সময় বচাবলৈ গ্লাভছ নোহোৱাকৈ সলনি কৰা"],
   ["put the old dressing in the general waste bin", "পুৰণি বেণ্ডেজ সাধাৰণ আৱৰ্জনা পাত্ৰত পেলোৱা"]], 0,
  "A saturated dressing wicks organisms onto skin and bedding, so it is changed with gloves and segregated as infectious waste. Leaving it, working barehanded or mixing it with general waste spreads infection.",
  "তিতা বেণ্ডেজে জীৱাণু ছাল আৰু বিছনালৈ টানি নিয়ে, সেয়ে গ্লাভছ পিন্ধি সলনি কৰি সংক্ৰামক আৱৰ্জনা হিচাপে পৃথক কৰা হয়। এৰি থোৱা, খালি হাতেৰে কাম কৰা বা সাধাৰণ আৱৰ্জনাত মিহলালে সংক্ৰমণ বিয়পে।");

add("nursing-549",
  "An autoclave load has been processed but the indicator strip has not changed colour. The nurse should",
  "অট'ক্লেভৰ ভাৰ প্ৰক্ৰিয়া কৰা হ'ল কিন্তু সূচক পটিৰ ৰং সলনি হোৱা নাই। নাৰ্ছে",
  [["consider the load unsterile and reprocess it", "ভাৰটো জীৱাণুমুক্ত নহয় বুলি ধৰি পুনৰ প্ৰক্ৰিয়া কৰা"],
   ["use the items because the machine ran", "যন্ত্ৰ চলিছিল বাবে বস্তুবোৰ ব্যৱহাৰ কৰা"],
   ["use only the outer items", "কেৱল বাহিৰৰ বস্তুবোৰ ব্যৱহাৰ কৰা"],
   ["record it as passed and continue", "উত্তীৰ্ণ বুলি লিখি আগবাঢ়া"]], 0,
  "The indicator confirms that the required temperature and pressure were actually reached, so an unchanged strip means the load cannot be assumed sterile. Using the items or recording a pass risks infection.",
  "সূচকে প্ৰকৃততে প্ৰয়োজনীয় উষ্ণতা আৰু চাপ উপনীত হৈছিল নে নাই নিশ্চিত কৰে, সেয়ে ৰং নসলোৱা পটি মানে ভাৰ জীৱাণুমুক্ত বুলি ধৰিব নোৱাৰি। বস্তু ব্যৱহাৰ বা উত্তীৰ্ণ লিখিলে সংক্ৰমণৰ বিপদ।");

add("nursing-550",
  "A nurse removes personal protective equipment after caring for an infected patient. The nurse should remove",
  "সংক্ৰমিত ৰোগীৰ যতনৰ পিছত নাৰ্ছে ব্যক্তিগত সুৰক্ষা সঁজুলি খোলে। নাৰ্ছে খুলিব লাগে",
  [["gloves first, then gown, then mask, performing hand hygiene after", "প্ৰথমে গ্লাভছ, তাৰ পিছত গাউন, তাৰ পিছত মাস্ক, শেষত হাত ধোৱা"],
   ["mask first, then gloves, then gown", "প্ৰথমে মাস্ক, তাৰ পিছত গ্লাভছ, তাৰ পিছত গাউন"],
   ["gown and mask together, gloves last", "গাউন আৰু মাস্ক একেলগে, গ্লাভছ শেষত"],
   ["all items at once without hand hygiene", "সকলো সঁজুলি একেলগে, হাত নুধুৱাকৈ"]], 0,
  "Gloves are the most contaminated item and come off first, then the gown, then the mask, with hand hygiene at the end because the hands contact the face during mask removal. Other orders contaminate clean skin.",
  "গ্লাভছ আটাই দূষিত আৰু প্ৰথমে খোলে, তাৰ পিছত গাউন, তাৰ পিছত মাস্ক, আৰু শেষত হাত ধোৱা কাৰণ মাস্ক খোলোতে হাতে মুখ চুৱে। আন ক্ৰমে পৰিষ্কাৰ ছাল দূষিত কৰে।");

add("nursing-551",
  "A patient in isolation for a resistant infection asks why visitors must wear gowns. The nurse explains that the gown",
  "প্ৰতিৰোধী সংক্ৰমণৰ বাবে পৃথক ৰখা ৰোগীয়ে সোধে দৰ্শনাৰ্থীয়ে গাউন কিয় পিন্ধিব লাগে। নাৰ্ছে বুজায় — গাউনে",
  [["stops organisms being carried out on clothing to other patients", "জীৱাণু কাপোৰত ওলাই আন ৰোগীলৈ যোৱা ৰোধ কৰে"],
   ["protects the visitor from all diseases", "দৰ্শনাৰ্থীক সকলো ৰোগৰপৰা ৰক্ষা কৰে"],
   ["is required by hospital decoration rules", "চিকিৎসালয়ৰ সজোৱা নিয়মৰ বাবে লাগে"],
   ["keeps the room warm", "কোঠা গৰম ৰাখে"]], 0,
  "The gown prevents the organism from leaving the room on clothing and reaching other vulnerable patients, which is the point of isolation. It is not full protection for the visitor and has nothing to do with warmth or decoration.",
  "গাউনে জীৱাণুক কাপোৰত কোঠাৰপৰা ওলাই আন দুৰ্বল ৰোগীলৈ যোৱাৰপৰা ৰোধ কৰে, যি পৃথক ৰখাৰ উদ্দেশ্য। ই দৰ্শনাৰ্থীৰ সম্পূৰ্ণ সুৰক্ষা নহয় আৰু উষ্ণতা বা সজোৱাৰ সৈতে সম্পৰ্ক নাই।");

add("nursing-552",
  "A patient develops a fever and a red, warm, tender area around a surgical incision on the fifth day. The nurse should",
  "পাঁচ দিনত ৰোগীৰ জ্বৰ আৰু শল্যচ্ছেদৰ চাৰিওফালে ৰঙা, গৰম, ব্যথাযুক্ত অঞ্চল। নাৰ্ছে",
  [["report it as a probable surgical site infection and take a swab as ordered", "সম্ভাব্য শল্যচ্ছেদ সংক্ৰমণ বুলি জনাই নিৰ্দেশ অনুসৰি স্বাব লোৱা"],
   ["apply a tight bandage and continue", "টান বেণ্ডেজ লগাই চলি যোৱা"],
   ["reassure that redness is normal after surgery", "অস্ত্ৰোপচাৰৰ পিছত ৰঙা হোৱা স্বাভাৱিক বুলি আশ্বাস দিয়া"],
   ["open the wound and squeeze the edges", "ঘাঁ খুলি কিনাৰ চেপি ধৰা"]], 0,
  "Fever with a red, warm, tender wound on day five is a surgical site infection, and reporting with a swab leads to the right antibiotic. Tight bandaging hides it, squeezing spreads infection deeper.",
  "পাঁচ দিনত জ্বৰৰ সৈতে ৰঙা, গৰম, ব্যথাযুক্ত ঘাঁ হ'ল শল্যচ্ছেদ সংক্ৰমণ, আৰু স্বাবসহ জনালে শুদ্ধ এণ্টিবায়'টিক পোৱা যায়। টান বেণ্ডেজে ঢাকে, আৰু চেপিলে সংক্ৰমণ গভীৰলৈ যায়।");

add("nursing-553",
  "A nurse is preparing an injection and the vial stopper is wet with a droplet of the medicine. The nurse should",
  "নাৰ্ছে ইনজেকচন সাজু কৰোতে ভাইলৰ ঢাকনিত ঔষধৰ টোপাল ওলাই আছে। নাৰ্ছে",
  [["clean the stopper with an alcohol swab and let it dry before piercing", "এলক'হল স্বাবে ঢাকনি পৰিষ্কাৰ কৰি শুকাবলৈ দি তাৰ পিছত বিন্ধা"],
   ["pierce it at once to save time", "সময় বচাবলৈ লগে লগে বিন্ধা"],
   ["wipe it on the uniform", "ইউনিফৰ্মত মচি লোৱা"],
   ["blow on the stopper to dry it", "ঢাকনি ফু দি শুকুওৱা"]], 0,
  "Cleaning with alcohol and allowing it to dry disinfects the rubber and avoids introducing the alcohol into the vial. Piercing a wet stopper, wiping on clothing or blowing on it all add organisms.",
  "এলক'হলেৰে পৰিষ্কাৰ কৰি শুকাবলৈ দিলে ৰবৰ জীৱাণুমুক্ত হয় আৰু ঔষধত এলক'হল নোসোমায়। তিতা ঢাকনি বিন্ধা, কাপোৰত মচা বা ফু দিয়াৰে জীৱাণু যোগ হয়।");

add("nursing-554",
  "A nurse notices that a colleague is about to recap a needle after giving an injection. The nurse should",
  "সহকৰ্মীয়ে ইনজেকচনৰ পিছত ছুচৰ ঢাকনা লগাবলৈ যোৱা দেখি নাৰ্ছে",
  [["remind the colleague to drop it straight into the sharps bin", "সহকৰ্মীক পোনপটীয়াকৈ শাৰ্পছ পাত্ৰত পেলাবলৈ মনত পেলাই দিয়া"],
   ["say nothing because it is not their patient", "তেওঁৰ ৰোগী নোহোৱা বাবে একো নোকোৱা"],
   ["recap the needle themselves", "নিজেই ছুচৰ ঢাকনা লগাই দিয়া"],
   ["report the colleague to the police", "সহকৰ্মীক আৰক্ষীক জনোৱা"]], 0,
  "Recapping is the commonest cause of needlestick injury, so a direct reminder protects the colleague, and speaking up is part of a safe culture. Silence allows the injury, and doing it for them repeats the risk.",
  "ঢাকনা লগোৱাই ছুচজনিত আঘাতৰ আটাই সাধাৰণ কাৰণ, সেয়ে পোনপটীয়া মনত পেলোৱাই সহকৰ্মীক ৰক্ষা কৰে, আৰু মাত দিয়াটো সুৰক্ষা সংস্কৃতিৰ অংগ। মনে থাকিলে আঘাত হয়, আৰু নিজে কৰি দিলে বিপদ পুনৰাবৃত্তি হয়।");

add("nursing-555",
  "A patient with a urinary catheter and a draining wound is to be moved to a shared bay. The nurse should",
  "মূত্ৰ কেথেটৰ আৰু নিগৰি থকা ঘাঁ থকা ৰোগীক ভাগ কৰা বে'লৈ নিব লাগে। নাৰ্ছে",
  [["ensure drainage bags are below bladder level and not touching the floor", "নিগৰণৰ বেগ মূত্ৰাশয়ৰ তলত আৰু মজিয়াত নালাগি থকাটো নিশ্চিত কৰা"],
   ["hang the drainage bag on the bed rail at bladder height", "নিগৰণৰ বেগ মূত্ৰাশয়ৰ সমান উচ্চতাত শয্যাৰ ৰেলত ওলোমাই ৰখা"],
   ["let the bag rest on the floor for stability", "স্থিৰতাৰ বাবে বেগ মজিয়াত ৰখা"],
   ["clamp the catheter during the move", "স্থানান্তৰৰ সময়ত কেথেটৰ চেপি ধৰা"]], 0,
  "A bag above bladder level allows urine to flow back into the bladder and cause infection, and one on the floor picks up organisms. Clamping during a move allows urine to accumulate and reflux later.",
  "মূত্ৰাশয়ৰ ওপৰত বেগ থাকিলে প্ৰস্ৰাৱ উভতি মূত্ৰাশয়লৈ গৈ সংক্ৰমণ কৰে, আৰু মজিয়াত থকাটোৱে জীৱাণু লয়। স্থানান্তৰত চেপি ধৰিলে প্ৰস্ৰাৱ জমি পিছত উভতি যায়।");

add("nursing-556",
  "A nurse is to clean a used bedpan before reuse by another patient. The correct practice is to",
  "পুৰণি বেডপেন আন ৰোগীয়ে ব্যৱহাৰৰ আগতে পৰিষ্কাৰ কৰিব লাগে। শুদ্ধ অভ্যাস",
  [["empty it, wash with detergent and water, then disinfect and dry", "খালী কৰি ডিটাৰ্জেণ্ট আৰু পানীৰে ধুই নিষ্ক্ৰিয় কৰি শুকুওৱা"],
   ["rinse it with water only", "কেৱল পানীৰে ধুই দিয়া"],
   ["wipe it with a dry cloth", "শুকান কাপোৰেৰে মচা"],
   ["store it wet for the next patient", "পৰৱৰ্তী ৰোগীৰ বাবে তিতা অৱস্থাত ৰখা"]], 0,
  "Cleaning removes organic matter first so the disinfectant can act, and drying prevents organisms multiplying in residual moisture. A water rinse, dry wipe or wet storage all leave contamination.",
  "পৰিষ্কাৰে প্ৰথমে জৈৱ পদাৰ্থ আঁতৰায় যাতে নিষ্ক্ৰায়কে ক্ৰিয়া কৰিব পাৰে, আৰু শুকুওৱাই বাকী তিতাত জীৱাণু বাঢ়িবলৈ নিদিয়ে। পানীৰে ধোৱা, শুকান মচা বা তিতা ৰখাই দূষণ এৰি যায়।");

add("nursing-557",
  "A patient on the ward develops diarrhoea and is later confirmed to have cholera. The nurse's priority is to",
  "ৱাৰ্ডত ৰোগীৰ ডায়েৰিয়া হ'ল আৰু পিছত কলেৰা নিশ্চিত হ'ল। নাৰ্ছৰ অগ্ৰাধিকাৰ",
  [["isolate with contact precautions and report to the infection control team", "সংস্পৰ্শ সতৰ্কতাসহ পৃথক কৰি সংক্ৰমণ নিয়ন্ত্ৰণ দলক জনোৱা"],
   ["move the patient to the day room for company", "সংগৰ বাবে ৰোগীক দিনৰ কোঠালৈ নিয়া"],
   ["continue normal care without precautions", "সতৰ্কতা নোহোৱাকৈ স্বাভাৱিক যতন চলাই ৰখা"],
   ["wait for the laboratory report before isolating", "পৃথক কৰাৰ আগতে পৰীক্ষাগাৰৰ প্ৰতিবেদনলৈ অপেক্ষা কৰা"]], 0,
  "Cholera spreads rapidly through contaminated hands, water and faeces, so isolation plus immediate reporting is what stops an outbreak. Waiting for confirmation, or mixing the patient with others, allows ward transmission.",
  "কলেৰা দূষিত হাত, পানী আৰু মলৰ জৰিয়তে দ্ৰুত বিয়পে, সেয়ে পৃথক কৰা লগতে তৎক্ষণাৎ জনোৱাই প্ৰাদুৰ্ভাৱ ৰোধ কৰে। নিশ্চিতকৰণলৈ অপেক্ষা বা আনৰ সৈতে মিহলালে ৱাৰ্ডত সংক্ৰমণ হয়।");

add("nursing-558",
  "A nurse is asked to dispose of a used intravenous cannula and tubing. The nurse should",
  "ব্যৱহৃত অন্তঃশিৰা কেনুলা আৰু নলী পেলাবলৈ কোৱা হ'ল। নাৰ্ছে",
  [["cut the tubing only if the sharp is removed into a sharps container first", "প্ৰথমে ছুচ শাৰ্পছ পাত্ৰত পেলোৱা হ'লে তবেই নলী কটা"],
   ["throw the whole set into the general waste", "গোটেই সংহতি সাধাৰণ আৱৰ্জনাত পেলোৱা"],
   ["bend the needle and put it in a paper bag", "ছুচ বেঁকা কৰি কাগজৰ মোনাত ৰখা"],
   ["leave it on the trolley for the cleaner", "পৰিষ্কাৰ কৰ্মীৰ বাবে ট্ৰলিত এৰি থোৱা"]], 0,
  "The sharp must enter a rigid sharps container before any tubing is cut, because cutting releases the needle and causes injuries. General waste, paper bags and trolleys all expose the next handler.",
  "নলী কটাৰ আগতে ছুচ কঠিন শাৰ্পছ পাত্ৰত সোমাব লাগে, কাৰণ কটিলে ছুচ মুকলি হৈ আঘাত কৰে। সাধাৰণ আৱৰ্জনা, কাগজৰ মোনা আৰু ট্ৰলিয়ে পৰৱৰ্তী ব্যক্তিক সংস্পৰ্শত ৰাখে।");

add("nursing-559",
  "A nurse is caring for a patient with scabies and a patient with measles on the same shift. The nurse should",
  "একে শ্বিফ্টত খুজুতি আৰু মিজলছ ৰোগীৰ যতন লোৱা নাৰ্ছে",
  [["use contact precautions for scabies and airborne precautions for measles", "খুজুতিত সংস্পৰ্শ সতৰ্কতা আৰু মিজলছত বায়ুজনিত সতৰ্কতা ব্যৱহাৰ কৰা"],
   ["use the same precautions for both", "দুয়োটাৰ বাবে একেই সতৰ্কতা ব্যৱহাৰ কৰা"],
   ["use airborne precautions for scabies", "খুজুতিত বায়ুজনিত সতৰ্কতা ব্যৱহাৰ কৰা"],
   ["use no precautions because both are mild", "দুয়োটা পাতল বাবে কোনো সতৰ্কতা নকৰা"]], 0,
  "Scabies spreads by prolonged skin contact while measles spreads through airborne droplet nuclei, so each needs its own precaution. Using one set for both leaves the other route open, and both are far from mild.",
  "খুজুতি দীৰ্ঘ ছালৰ সংস্পৰ্শৰে বিয়পে কিন্তু মিজলছে বায়ুজনিত ড্ৰপলেট নিউক্লিয়েৰে, সেয়ে প্ৰত্যেকৰ নিজা সতৰ্কতা লাগে। একেই সতৰ্কতাই আন পথ মুকলি এৰে, আৰু দুয়োটা পাতল নহয়।");

add("nursing-560",
  "A hospital ward has had three patients with the same resistant organism in a month. The nurse's most useful contribution is to",
  "মাহ এটাত এখন ৱাৰ্ডত একেই প্ৰতিৰোধী জীৱাণু থকা তিনিজন ৰোগী হ'ল। নাৰ্ছৰ আটাই উপযোগী অৱদান",
  [["review hand hygiene and equipment cleaning practice with the team", "দলৰ সৈতে হাত ধোৱা আৰু সঁজুলি পৰিষ্কাৰৰ অভ্যাস পুনৰ পৰ্যালোচনা কৰা"],
   ["ask for more antibiotics to be stocked", "বেছি এণ্টিবায়'টিক ৰখাবলৈ অনুৰোধ কৰা"],
   ["wait for the infection control team alone to act", "কেৱল সংক্ৰমণ নিয়ন্ত্ৰণ দলৰ কামলৈ অপেক্ষা কৰা"],
   ["move the affected patients to different wards", "আক্ৰান্ত ৰোগীবোৰ আন ৱাৰ্ডলৈ নিয়া"]], 0,
  "Clustering in one ward points to a break in hand hygiene or equipment cleaning, so reviewing practice with the team addresses the source. Stocking antibiotics, waiting, or scattering patients does not fix the transmission.",
  "এখন ৱাৰ্ডত গোট খোৱাই হাত ধোৱা বা সঁজুলি পৰিষ্কাৰত ফাঁক দেখুৱায়, সেয়ে দলৰ সৈতে অভ্যাস পৰ্যালোচনাই উৎস সমাধান কৰে। এণ্টিবায়'টিক ৰখা, অপেক্ষা বা ৰোগী ছটিয়াই সঞ্চাৰণ নশুধৰে।");

module.exports = { questions: Q };
