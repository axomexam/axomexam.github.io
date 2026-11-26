#!/usr/bin/env node
"use strict";

/* ===========================================================
   axomexam — tools/dhs-dme-technical.nursing-extra2.js

   The last four Nursing & Paramedical leaves of the twenty-per-leaf
   expansion: physiotherapy-rehabilitation, hospital-infection-control,
   medical-terminology and health-programmes-assam. Split out of
   nursing-extra.js only to keep each file a readable length; both are
   concatenated by that module.
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

/* ================= physiotherapy-rehabilitation ================= */
useLeaf("physiotherapy-rehabilitation");

add("nursing-521",
  "A patient with a below knee amputation is being taught to wrap the stump. The nurse explains the bandage must be applied",
  "আঁঠুৰ তলত কটা ৰোগীক ষ্টাম্প বান্ধিবলৈ শিকোৱা হৈছে। নাৰ্ছে বুজায় — বেণ্ডেজ লগাব লাগে",
  [["distally firm and proximally looser in a figure of eight", "তলত টান আৰু ওপৰত ঢিলাকৈ আঠৰ আকৃতিত"],
   ["tightest at the top to hold the stump up", "ষ্টাম্প ওপৰত ধৰি ৰাখিবলৈ আটাই ওপৰত টানকৈ"],
   ["loosely throughout to allow swelling", "ওফন্দা হ'বলৈ গোটেইটো ঢিলাকৈ"],
   ["only at night while the patient sleeps", "কেৱল ৰাতি ৰোগী টোপনি যোৱাৰ সময়ত"]], 0,
  "Firm distal pressure with a looser proximal wrap shapes the stump for the prosthesis and prevents oedema pooling at the end. Tightness at the top creates a tourniquet, and a loose wrap allows oedema and poor shaping.",
  "তলত টান চাপ আৰু ওপৰত ঢিলা বান্ধোনে প্ৰতিস্থাপনৰ বাবে ষ্টাম্পৰ আকাৰ গঢ়ে আৰু আগত ওফন্দা জমা হোৱা ৰোধ কৰে। ওপৰত টান হ'লে ৰক্তস্ৰাৱ বন্ধ কৰা বান্ধোন হয়, আৰু ঢিলা বান্ধোনে ওফন্দা আৰু বেয়া আকাৰ দিয়ে।");

add("nursing-522",
  "A patient after a stroke has a painful shoulder on the weak side. The nurse should",
  "ষ্ট্ৰ'কৰ পিছত ৰোগীৰ দুৰ্বল ফালৰ কান্ধত বিষ। নাৰ্ছে",
  [["support the arm in a sling or on a pillow and avoid pulling it", "হাত স্লিং বা গাৰুৰে ধৰি ৰাখি টনাৰপৰা বিৰত থাকা"],
   ["lift the patient by the affected arm", "আঘাতগ্ৰস্ত হাতেৰে ৰোগীক দাঙা"],
   ["exercise the shoulder through full range immediately", "কান্ধ তৎক্ষণাৎ সম্পূৰ্ণ পৰিসৰলৈ ব্যায়াম কৰোৱা"],
   ["massage the shoulder deeply twice a day", "দিনত দুবাৰ কান্ধত গভীৰ মালিচ কৰা"]], 0,
  "A weak arm hanging unsupported pulls on the capsule and causes shoulder pain, so support plus avoidance of traction protects it. Lifting by the arm, forced range or deep massage can tear the joint and worsen the pain.",
  "সহায় নোহোৱাকৈ ওলমি থকা দুৰ্বল হাতে কেপচুল টানি কান্ধৰ বিষ কৰে, সেয়ে সহায় আৰু টনা এৰাই তাক ৰক্ষা কৰে। হাতেৰে দাঙা, জোৰকৈ ব্যায়াম বা গভীৰ মালিচে জোৰা ছিঁড়ি বিষ বঢ়ায়।");

add("nursing-523",
  "A patient learning to walk with crutches after a leg injury is told to bear weight on the hands. The nurse checks that the crutches are fitted so that",
  "ভৰিৰ আঘাতৰ পিছত ক্ৰাচেৰে খোজ কাঢ়িবলৈ শিকা ৰোগীক হাতত ভাৰ দিবলৈ কোৱা হৈছে। নাৰ্ছে পৰীক্ষা কৰে ক্ৰাচ এনে ভাৱে লগোৱা আছে যাতে",
  [["the hand grips sit at wrist level with the elbows slightly bent", "হাতৰ গ্ৰিপ কব্জিৰ সমান আৰু কিলাকুটি অলপ ভঁ‌জা থাকে"],
   ["the axillary pad presses firmly into the armpit", "বগলিৰ পেডে বগলিত জোৰকৈ চাপ দিয়ে"],
   ["the patient has to stoop to hold them", "ৰোগীয়ে ধৰিবলৈ হাউলি যাব লাগে"],
   ["the crutches are shorter than the hips", "ক্ৰাচ নিতম্বতকৈ চুটি"]], 0,
  "Weight must go through the hands, and grips at wrist level with slightly bent elbows allow that. Pressure in the armpit damages the radial nerve, and crutches that are too short force the patient to stoop and lose balance.",
  "ভাৰ হাতেৰে যাব লাগে, আৰু কব্জিৰ সমান গ্ৰিপ তথা অলপ ভঁ‌জা কিলাকুটিয়ে তাক সম্ভৱ কৰে। বগলিত চাপ দিলে ৰেডিয়েল স্নায়ুৰ ক্ষতি হয়, আৰু অতি চুটি ক্ৰাচে ৰোগীক হাউলিবলৈ বাধ্য কৰি ভাৰসাম্য হেৰুৱায়।");

add("nursing-524",
  "A bedridden patient is to be given passive movements of the hip. The nurse understands that in a passive movement",
  "শয্যাগত ৰোগীক নিতম্বৰ নিষ্ক্ৰিয় চলন দিব লাগে। নাৰ্ছে বুজে নিষ্ক্ৰিয় চলনত",
  [["the therapist moves the joint without the patient's effort", "চিকিৎসকে ৰোগীৰ প্ৰচেষ্টা নোহোৱাকৈ জোৰা চালনা কৰে"],
   ["the patient performs the movement alone", "ৰোগীয়ে নিজেই চলন কৰে"],
   ["the joint is moved against resistance", "জোৰা প্ৰতিৰোধৰ বিৰুদ্ধে চালনা কৰা হয়"],
   ["the movement is done only under anaesthesia", "চলন কেৱল এনেস্থেছিয়াৰ তলত কৰা হয়"]], 0,
  "Passive movement preserves joint range and prevents contracture when the patient cannot move the limb, and the therapist supplies the whole movement. Active movement is the patient's own effort, and resistance work is strengthening.",
  "নিষ্ক্ৰিয় চলনে জোৰাৰ পৰিসৰ ৰাখি সংকোচন ৰোধ কৰে যেতিয়া ৰোগীয়ে অংগ চালনা কৰিব নোৱাৰে, আৰু চিকিৎসকেই গোটেই চলন দিয়ে। সক্ৰিয় চলন ৰোগীৰ নিজা প্ৰচেষ্টা, আৰু প্ৰতিৰোধ কামে শক্তি বঢ়ায়।");

add("nursing-525",
  "A patient has a sprained ankle and the nurse applies a compression bandage. The nurse must check",
  "ৰোগীৰ গোৰোহাত মোচৰ আৰু নাৰ্ছে কম্প্ৰেছন বেণ্ডেজ লগায়। নাৰ্ছে পৰীক্ষা কৰিব লাগে",
  [["the toes for colour, warmth, sensation and capillary refill", "আঙুলিৰ ৰং, উষ্ণতা, অনুভূতি আৰু কেশিকাৰ পুনঃপূৰণ"],
   ["that the bandage is as tight as possible", "বেণ্ডেজ যিমান পাৰি টান হয় নে নাই"],
   ["that the bandage covers the toes fully", "বেণ্ডেজে আঙুলিবোৰ সম্পূৰ্ণ ঢাকে নে নাই"],
   ["that the foot is kept above head height", "ভৰি মূৰৰ ওপৰলৈ ৰখা হৈছে নে নাই"]], 0,
  "A compression bandage that is too tight obstructs arterial flow, and the toes are what show it, so colour, warmth, sensation and refill are checked. Maximum tightness and covering the toes both hide or cause the problem.",
  "অতি টান কম্প্ৰেছন বেণ্ডেজে ধমনীৰ প্ৰবাহ বন্ধ কৰে, আৰু আঙুলিয়েই তাক দেখুৱায়, সেয়ে ৰং, উষ্ণতা, অনুভূতি আৰু পুনঃপূৰণ পৰীক্ষা কৰা হয়। অতি টান বা আঙুলি ঢাকিলে সমস্যা লুকায় বা কৰে।");

add("nursing-526",
  "A patient has been on bed rest for two weeks and now cannot straighten the knee. The nurse recognises this as",
  "ৰোগী দুসপ্তাহ শয্যাত থকাৰ পিছত আঁঠু পোন কৰিব নোৱাৰে। নাৰ্ছে ইয়াক চিনি পায়",
  [["a flexion contracture that needs early mobilisation", "ভঁ‌জা সংকোচন, যাৰ বাবে সোনকালে গতি কৰোৱা লাগে"],
   ["normal stiffness that resolves on its own", "স্বাভাৱিক টান, যি নিজেই ভাল হয়"],
   ["a sign of a new fracture", "নতুন ভঙাৰ চিন"],
   ["an indication for immediate surgery", "তৎক্ষণাৎ অস্ত্ৰোপচাৰৰ নিৰ্দেশ"]], 0,
  "Immobility lets the flexor muscles and capsule shorten, which is a flexion contracture, and early mobilisation and stretching prevent it from becoming fixed. It does not resolve on its own, and it is neither a fracture nor a surgical emergency.",
  "গতি নোহোৱাকৈ থকিলে ভঁ‌জা পেশী আৰু কেপচুল চুটি হয়, যি ভঁ‌জা সংকোচন, আৰু সোনকালে গতি কৰোৱা লগতে টনা-মোকোলাই তাক স্থায়ী হোৱাৰপৰা ৰোধ কৰে। ই নিজেই ভাল নহয়, আৰু ভঙা বা শল্য জৰুৰী অৱস্থাও নহয়।");

add("nursing-527",
  "A patient with a spinal cord injury is to be transferred from bed to wheelchair. The nurse should",
  "মেৰুদণ্ডৰ আঘাত থকা ৰোগীক শয্যাৰপৰা হুইলচেয়াৰলৈ নিব লাগে। নাৰ্ছে",
  [["use a sliding board with the patient's head and trunk supported in line", "মূৰ আৰু ধড় শাৰীত ধৰি স্লাইডিং ব'ৰ্ড ব্যৱহাৰ কৰা"],
   ["lift the patient under the arms with two staff", "দুজন কৰ্মীয়ে বগলিৰ তলৰপৰা ধৰি দাঙা"],
   ["ask the patient to stand and pivot", "ৰোগীক থিয় হৈ ঘূৰিবলৈ কোৱা"],
   ["drag the patient across on a sheet", "চাদৰত টানি পাৰ কৰোৱা"]], 0,
  "A sliding board with the trunk supported keeps the spine aligned and avoids shear, which matters most in an unstable injury. Lifting under the arms, standing or dragging all bend and shear the spine.",
  "ধড় ধৰি থকা স্লাইডিং ব'ৰ্ডে মেৰুদণ্ড শাৰীত ৰাখি ঘৰ্ষণ এৰায়, যি অস্থিৰ আঘাতত আটাই গুৰুত্বপূৰ্ণ। বগলিৰে দাঙা, থিয় কৰা বা টানি নিয়াই মেৰুদণ্ড ভাঁ‌জে আৰু ঘৰ্ষণ কৰে।");

add("nursing-528",
  "A patient is doing isometric exercises for a knee injury. The nurse explains that in an isometric exercise",
  "আঁঠুৰ আঘাতৰ বাবে ৰোগীয়ে আইছ'মেট্ৰিক ব্যায়াম কৰিছে। নাৰ্ছে বুজায় — আইছ'মেট্ৰিক ব্যায়ামত",
  [["the muscle contracts without the joint moving", "জোৰা নলৰাকৈ পেশী সংকুচিত হয়"],
   ["the joint moves through its full range", "জোৰা সম্পূৰ্ণ পৰিসৰলৈ চলে"],
   ["the limb is moved by the therapist", "অংগ চিকিৎসকে চালনা কৰে"],
   ["weights are added every session", "প্ৰতিটো অধিবেশনত ওজন যোগ কৰা হয়"]], 0,
  "Isometric work builds strength without joint movement, which is why it is used when a joint must be protected after injury or surgery. Full range movement is isotonic, therapist movement is passive, and progressive weights are added later.",
  "আইছ'মেট্ৰিক কামে জোৰা নচলাকৈ শক্তি বঢ়ায়, সেয়ে আঘাত বা অস্ত্ৰোপচাৰৰ পিছত জোৰা ৰক্ষা কৰিবলগীয়া হ'লে ব্যৱহাৰ কৰা হয়। সম্পূৰ্ণ পৰিসৰৰ চলন আইছ'টনিক, চিকিৎসকৰ চলন নিষ্ক্ৰিয়, আৰু ওজন পিছত যোগ কৰা হয়।");

add("nursing-529",
  "A patient with a recent deep vein thrombosis is referred for physiotherapy. The nurse should ensure that",
  "শেহতীয়া ডিপ ভেইন থ্ৰম্ব'ছিছ থকা ৰোগীক ফিজিঅ'থেৰাপিলৈ পঠিওৱা হ'ল। নাৰ্ছে নিশ্চিত কৰিব লাগে",
  [["vigorous massage and exercise of the affected leg are avoided", "আঘাতগ্ৰস্ত ভৰিৰ জোৰদাৰ মালিচ আৰু ব্যায়াম এৰা হয়"],
   ["the leg is massaged deeply before exercise", "ব্যায়ামৰ আগতে ভৰিত গভীৰ মালিচ কৰা হয়"],
   ["the patient performs strong resisted leg work", "ৰোগীয়ে জোৰদাৰ প্ৰতিৰোধযুক্ত ভৰিৰ কাম কৰে"],
   ["the leg is kept hanging down throughout", "ভৰি গোটেই সময়ত ওলমি থাকে"]], 0,
  "Massage or vigorous exercise can dislodge a fresh clot into the pulmonary circulation, so those are avoided until anticoagulation has stabilised it. Deep massage, resisted work and dependent positioning all raise that risk.",
  "মালিচ বা জোৰদাৰ ব্যায়ামে নতুন গোট ফুসফুসৰ সংচলনলৈ ঠেলিব পাৰে, সেয়ে ৰক্ত পাতলকৰণে তাক স্থিৰ নকৰালৈকে এৰা যায়। গভীৰ মালিচ, প্ৰতিৰোধ কাম আৰু ওলমি থকা অৱস্থানে সেই বিপদ বঢ়ায়।");

add("nursing-530",
  "A patient with a total knee replacement is at 90 degrees of flexion on day two. The nurse should",
  "সম্পূৰ্ণ আঁঠু প্ৰতিস্থাপনৰ দ্বিতীয় দিনত ৰোগীৰ ৯০ ডিগ্ৰী ভঁ‌জা। নাৰ্ছে",
  [["continue the prescribed exercise programme and record the range", "নিৰ্ধাৰিত ব্যায়াম কাৰ্যসূচী চলাই পৰিসৰ লিখি ৰখা"],
   ["force the knee to 120 degrees immediately", "আঁঠু তৎক্ষণাৎ ১২০ ডিগ্ৰীলৈ জোৰকৈ ভাঁ‌জা"],
   ["keep the knee completely straight and still", "আঁঠু সম্পূৰ্ণ পোন আৰু অচল ৰখা"],
   ["stop all exercises until the sutures are out", "চিলাই নোলোৱালৈকে সকলো ব্যায়াম বন্ধ কৰা"]], 0,
  "Ninety degrees by day two is on track, and steady prescribed exercise with measurement is what restores range. Forcing the joint tears tissue, and immobilising it allows the scar to contract and lose the range permanently.",
  "দ্বিতীয় দিনত নব্বৈ ডিগ্ৰী স্বাভাৱিক গতিত আছে, আৰু জুখি চলোৱা নিয়মীয়া নিৰ্ধাৰিত ব্যায়ামেই পৰিসৰ ঘূৰাই আনে। জোৰকৈ ভাঁ‌জিলে কলা ছিঁড়ে, আৰু অচল ৰাখিলে দাগ সংকুচিত হৈ পৰিসৰ স্থায়ীভাৱে হেৰায়।");

add("nursing-531",
  "A patient is being taught to use a walker after a hip fracture. The nurse instructs the patient to",
  "নিতম্বৰ হাড় ভঙাৰ পিছত ৰোগীক ৱাকাৰ ব্যৱহাৰ কৰিবলৈ শিকোৱা হ'ল। নাৰ্ছে নিৰ্দেশ দিয়ে",
  [["move the walker forward first, then step into it", "প্ৰথমে ৱাকাৰ আগবঢ়াই তাৰ ভিতৰলৈ খোজ দিয়া"],
   ["lift the walker off the floor with each step", "প্ৰতিটো খোজত ৱাকাৰ মজিয়াৰপৰা দাঙা"],
   ["hold the walker on one side only", "ৱাকাৰ কেৱল এফালে ধৰা"],
   ["step backwards while holding it in front", "আগত ধৰি পিছলৈ খোজ দিয়া"]], 0,
  "The walker is a stable frame that must be planted before weight goes on it, so it moves first and the patient steps into it. Lifting it, holding it to one side or walking backwards all remove the support it provides.",
  "ৱাকাৰ এটা স্থিৰ ফ্ৰেম, ভাৰ দিয়াৰ আগতে তাক ৰাখিব লাগে, সেয়ে আগতে তাক আগবঢ়াই ৰোগীয়ে ভিতৰলৈ খোজ দিয়ে। দাঙা, এফালে ধৰা বা পিছলৈ খোজ দিলে ইয়াৰ সহায় আঁতৰে।");

add("nursing-532",
  "A patient has a pressure relieving mattress but still has red marks on the heels. The nurse should",
  "ৰোগীৰ চাপ লাঘৱকাৰী গদী আছে কিন্তু গোৰোহাত ৰঙা দাগ। নাৰ্ছে",
  [["reposition regularly and offload the heels with a pillow", "নিয়মিত অৱস্থান সলনি কৰি গাৰুৰে গোৰোহাৰ চাপ আঁতৰোৱা"],
   ["rely on the mattress alone", "কেৱল গদীৰ ওপৰত নিৰ্ভৰ কৰা"],
   ["rub the red marks to improve blood flow", "ৰঙা দাগ ঘঁ‌হি ৰক্তস্ৰাৱ বঢ়োৱা"],
   ["raise the head of the bed to forty-five degrees permanently", "শয্যাৰ মূৰ স্থায়ীভাৱে ৪৫ ডিগ্ৰীলৈ দাঙি ৰখা"]], 0,
  "No mattress removes all pressure, so regular repositioning with heel offloading is still required, and the heels are the commonest site because they carry little muscle. Massage damages ischaemic tissue, and a permanent raised head increases shear over the sacrum.",
  "কোনো গদীয়েই সকলো চাপ আঁতৰাব নোৱাৰে, সেয়ে নিয়মীয়া অৱস্থান সলনি আৰু গোৰোহাৰ চাপ লাঘৱ কৰা লাগে, আৰু গোৰোহা আটাই সাধাৰণ ঠাই কাৰণ তাত পেশী কম। মালিচে ৰক্তহীন কলাৰ ক্ষতি কৰে, আৰু স্থায়ীভাৱে মূৰ দাঙিলে কঁকালত ঘৰ্ষণ বাঢ়ে।");

add("nursing-533",
  "A patient after a stroke is drooling and has a wet voice after swallowing. The nurse should",
  "ষ্ট্ৰ'কৰ পিছত ৰোগীৰ লেলা ওলাইছে আৰু গিলাৰ পিছত মাত তিতা যেন হয়। নাৰ্ছে",
  [["keep the patient nil by mouth and request a swallowing assessment", "ৰোগীক মুখে একো নিদি গিলাৰ মূল্যায়ন বিচৰা"],
   ["give thin fluids to test the swallow", "গিলা পৰীক্ষা কৰিবলৈ পাতল তৰল দিয়া"],
   ["feed soft food and observe", "নৰম আহাৰ খুৱাই পৰ্যবেক্ষণ কৰা"],
   ["reassure that drooling settles with time", "লেলা সময়ত কমি যাব বুলি আশ্বাস দিয়া"]], 0,
  "Drooling with a wet voice after swallowing means material is reaching the airway, so oral intake stops until a swallow assessment is done. Testing with fluids, soft food or waiting all risk aspiration pneumonia.",
  "গিলাৰ পিছত লেলা আৰু তিতা মাত মানে পদাৰ্থ শ্বাসপথলৈ যাইছে, সেয়ে গিলাৰ মূল্যায়ন নোহোৱালৈকে মুখে খোৱা বন্ধ হয়। তৰল বা নৰম আহাৰৰ পৰীক্ষা বা অপেক্ষা কৰিলে শ্বাসনলীত সোমোৱা নিউম'নিয়াৰ বিপদ।");

add("nursing-534",
  "A patient is being taught diaphragmatic breathing after abdominal surgery. The nurse should",
  "পেটৰ অস্ত্ৰোপচাৰৰ পিছত ৰোগীক ডায়াফ্ৰামেটিক উশাহ শিকোৱা হ'ল। নাৰ্ছে",
  [["place a hand on the abdomen and teach slow deep breaths through the nose", "পেটত হাত ৰাখি নাকৰে লাহে গভীৰ উশাহ ল'বলৈ শিকোৱা"],
   ["ask the patient to breathe rapidly through the mouth", "ৰোগীক মুখেৰে দ্ৰুত উশাহ ল'বলৈ কোৱা"],
   ["have the patient hold the breath for thirty seconds", "ৰোগীক ত্ৰিশ ছেকেণ্ড উশাহ ৰাখিবলৈ কোৱা"],
   ["encourage shallow breathing to reduce pain", "বিষ কমাবলৈ অগভীৰ উশাহ ল'বলৈ উৎসাহিত কৰা"]], 0,
  "Slow deep breaths with abdominal expansion re-expand the lung bases and prevent atelectasis, and the hand gives feedback. Rapid shallow breathing and breath holding increase the risk of collapse and pneumonia.",
  "পেট ফুলাই লোৱা লাহে গভীৰ উশাহে ফুসফুসৰ তল ভাগ পুনৰ মেলাই এটেলেক্টেছিছ ৰোধ কৰে, আৰু হাতে প্ৰতিক্ৰিয়া দিয়ে। দ্ৰুত অগভীৰ উশাহ আৰু উশাহ ৰখাই ফুসফুস চেপি যোৱা তথা নিউম'নিয়াৰ বিপদ বঢ়ায়।");

add("nursing-535",
  "A patient with a frozen shoulder is prescribed heat therapy before exercise. The nurse explains that heat is used because it",
  "হিমশীতল কান্ধৰ ৰোগীক ব্যায়ামৰ আগতে তাপ চিকিৎসা নিৰ্ধাৰিত। নাৰ্ছে বুজায় — তাপ ব্যৱহাৰ কৰা হয় কাৰণ ই",
  [["relaxes tissue and reduces pain so exercise is easier", "কলা শিথিল কৰি বিষ কমায় যাতে ব্যায়াম সহজ হয়"],
   ["strengthens the muscle directly", "পেশী পোনপটীয়াকৈ সবল কৰে"],
   ["numbs the joint permanently", "জোৰা স্থায়ীভাৱে নীৰৱ কৰে"],
   ["replaces the need for exercise", "ব্যায়ামৰ প্ৰয়োজন আঁতৰায়"]], 0,
  "Superficial heat raises tissue temperature, relieves spasm and pain, and lets the patient move further during the session that follows. It does not strengthen muscle, numb permanently or replace exercise, which is what restores range.",
  "পৃষ্ঠীয় তাপে কলাৰ উষ্ণতা বঢ়াই পেশীৰ টান আৰু বিষ লাঘৱ কৰে, আৰু পৰৱৰ্তী অধিবেশনত ৰোগীয়ে বেছি চলিব পাৰে। ই পেশী সবল নকৰে, স্থায়ীভাৱে নীৰৱ নকৰে, বা পৰিসৰ ঘূৰোৱা ব্যায়ামৰ প্ৰয়োজন আঁতৰাই নিদিয়ে।");

add("nursing-536",
  "A patient's rehabilitation plan is being reviewed and the family asks when it will end. The nurse explains that rehabilitation",
  "পুনৰ্বাসন পৰিকল্পনা পৰ্যালোচনা কৰি পৰিয়ালে কেতিয়া শেষ হ'ব সোধে। নাৰ্ছে বুজায় — পুনৰ্বাসন",
  [["is goal based and continues while function is improving", "লক্ষ্যভিত্তিক আৰু কাৰ্যক্ষমতা বাঢ়ি থকালৈকে চলি থাকে"],
   ["stops when the patient is discharged from hospital", "চিকিৎসালয়ৰপৰা ওলোৱাৰ লগে লগে বন্ধ হয়"],
   ["has a fixed length of exactly six weeks", "ঠিক ছয় সপ্তাহৰ নিৰ্দিষ্ট সময়"],
   ["ends when the wound has healed", "ঘাঁ শুকালেই শেষ হয়"]], 0,
  "Rehabilitation is built on measurable goals and continues across settings while the patient gains function, which is why community and home programmes exist. Discharge, a fixed period or wound healing do not mark the end of recovery.",
  "পুনৰ্বাসন জুখিব পৰা লক্ষ্যৰ ওপৰত গঢ়ি তোলা আৰু ৰোগীয়ে কাৰ্যক্ষমতা বঢ়াই থকালৈকে ঠাই সলনি কৰি চলি থাকে, সেয়ে সমাজ আৰু ঘৰুৱা কাৰ্যসূচী আছে। চিকিৎসালয় এৰা, নিৰ্দিষ্ট সময় বা ঘাঁ শুকোৱাই আৰোগ্যৰ শেষ নহয়।");

add("nursing-537",
  "A patient is to be given a cold pack to a sprained ankle in the first day. The nurse applies it for",
  "প্ৰথম দিনত মোচৰা গোৰোহাত ঠাণ্ডা পোচ দিব লাগে। নাৰ্ছে তাক লগায়",
  [["fifteen to twenty minutes with the skin checked", "পোন্ধৰৰপৰা বিশ মিনিট, ছাল পৰীক্ষা কৰি"],
   ["one full hour continuously", "একেষাৰে এঘণ্টা ধৰি"],
   ["five seconds only", "কেৱল পাঁচ ছেকেণ্ড"],
   ["as long as the patient tolerates, without a limit", "ৰোগীয়ে সহিব পৰালৈকে, সীমা নোহোৱাকৈ"]], 0,
  "Cold reduces swelling and pain but prolonged application causes reflex vasodilatation and cold injury, so fifteen to twenty minutes with skin checks is the standard. An hour or an unlimited period risks tissue damage.",
  "শীতলে ওফন্দা আৰু বিষ কমায় কিন্তু বেছি সময় দিলে প্ৰতিবৰ্তী ৰক্তনলী প্ৰসাৰণ আৰু শীতজনিত আঘাত হয়, সেয়ে ছাল পৰীক্ষাসহ পোন্ধৰৰপৰা বিশ মিনিটেই মান। এঘণ্টা বা সীমা নোহোৱা সময়ে কলাৰ ক্ষতিৰ বিপদ।");

add("nursing-538",
  "A patient with a new prosthesis is taught to inspect the stump skin daily. The nurse explains this is because",
  "নতুন প্ৰতিস্থাপন থকা ৰোগীক দৈনিক ষ্টাম্পৰ ছাল পৰীক্ষা কৰিবলৈ শিকোৱা হ'ল। নাৰ্ছে বুঝায় কাৰণ",
  [["pressure damage begins before it is felt in a limb with reduced sensation", "চাপজনিত ক্ষতি কম অনুভূতি থকা অংগত অনুভৱৰ আগতেই আৰম্ভ হয়"],
   ["the prosthesis changes colour every day", "প্ৰতিস্থাপনে প্ৰতিদিনে ৰং সলায়"],
   ["the skin must be replaced monthly", "ছাল মাহিলী সলনি কৰিব লাগে"],
   ["inspection improves muscle strength", "পৰীক্ষাই পেশীৰ শক্তি বঢ়ায়"]], 0,
  "Amputees often have reduced sensation over the stump, so a pressure ulcer can develop without pain, and daily inspection catches it early. The other statements are false and inspection has no effect on strength.",
  "কটা অংগৰ ৰোগীৰ ষ্টাম্পত প্ৰায়ে অনুভূতি কম থাকে, সেয়ে বিষ নোহোৱাকৈ চাপজনিত ঘাঁ হ'ব পাৰে, আৰু দৈনিক পৰীক্ষাই তাক সোনকালে ধৰে। আন উক্তিবোৰ অসত্য আৰু পৰীক্ষাৰ শক্তিৰ ওপৰত প্ৰভাৱ নাই।");

add("nursing-539",
  "A patient who had a stroke three months ago still cannot use the weak hand for eating. The nurse should",
  "তিনি মাহ আগতে ষ্ট্ৰ'ক হোৱা ৰোগীয়ে এতিয়াও দুৰ্বল হাতেৰে খাব নোৱাৰে। নাৰ্ছে",
  [["involve occupational therapy to work on feeding tasks", "খোৱাৰ কামত কাম কৰিবলৈ অকুপেচনেল থেৰাপী জড়িত কৰা"],
   ["accept that recovery is over at three months", "তিনি মাহত আৰোগ্য শেষ বুলি গ্ৰহণ কৰা"],
   ["feed the patient at every meal permanently", "স্থায়ীভাৱে প্ৰতিটো আহাৰত ৰোগীক খুৱাই দিয়া"],
   ["stop all therapy to avoid frustration", "হতাশা এৰাবলৈ সকলো চিকিৎসা বন্ধ কৰা"]], 0,
  "Task specific training by occupational therapy improves function well beyond three months, and feeding is a daily opportunity to practise. Assuming recovery has ended, feeding permanently or stopping therapy all remove that chance.",
  "অকুপেচনেল থেৰাপীৰ কাম-নিৰ্দিষ্ট প্ৰশিক্ষণে তিনি মাহৰ বহু পিছতো কাৰ্যক্ষমতা বঢ়ায়, আৰু খোৱা কাম দৈনিক অভ্যাসৰ সুযোগ। আৰোগ্য শেষ ধৰি লোৱা, স্থায়ীভাৱে খুৱাই দিয়া বা চিকিৎসা বন্ধ কৰিলে সেই সুযোগ আঁতৰে।");

add("nursing-540",
  "A patient is taught to log daily activity after a cardiac rehabilitation programme. The nurse explains the purpose is to",
  "হৃদযন্ত্ৰ পুনৰ্বাসন কাৰ্যসূচীৰ পিছত ৰোগীক দৈনিক কাৰ্যকলাপ লিখিবলৈ শিকোৱা হ'ল। নাৰ্ছে বুজায় — উদ্দেশ্য",
  [["track progress and detect warning symptoms early", "অগ্ৰগতি অনুসৰণ কৰি সতৰ্কতাৰ লক্ষণ সোনকালে ধৰা"],
   ["replace the need for medication", "ঔষধৰ প্ৰয়োজন আঁতৰোৱা"],
   ["prove the patient is fit for surgery", "ৰোগী অস্ত্ৰোপচাৰৰ বাবে উপযুক্ত বুলি প্ৰমাণ কৰা"],
   ["reduce the number of follow up visits to zero", "অনুসৰণ ভ্ৰমণ শূন্যলৈ কমোৱা"]], 0,
  "An activity log shows whether tolerance is improving and flags chest pain, breathlessness or palpitations early, so the programme can be adjusted. It does not replace medication or remove the need for review.",
  "কাৰ্যকলাপৰ অভিলেখে সহনশীলতা বাঢ়িছে নে নাই দেখুৱাই বুকুৰ বিষ, উশাহ কষ্ট বা ধপধপনি সোনকালে ধৰে, যাতে কাৰ্যসূচী শুধৰণি কৰিব পাৰি। ই ঔষধ নসলে বা পৰ্যালোচনাৰ প্ৰয়োজন আঁতৰাই নিদিয়ে।");

module.exports = { questions: Q };
