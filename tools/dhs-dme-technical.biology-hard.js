#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/dhs-dme-technical.biology-hard.js

   Thirty higher-difficulty biology items for the DHS & DME Technical
   Grade III paper. Each stem is phrased as a situation rather than a
   recall cue, so it reads differently from the school-level items in
   the base bank, and every option set is worded so that only one
   survives close reading.

   Same shape as the rest of the book: bilingual stem, four bilingual
   options, bilingual explanation. Assamese numerals (০-৯) inside
   Assamese text.
   ============================================================ */

const Q = [];

let LEAF = "";

function useLeaf(name) {
  LEAF = name;
}

function add(id, en, as, opts, correct, expEn, expAs) {
  /* Rotate the option order by a value derived from the id so the correct
     key does not sit in slot A for every item. The rotation is deterministic,
     so a rebuild always produces the same file. */
  const n = opts.length;
  const shift = (Number(String(id).replace(/\D/g, "")) || 0) % n;
  const rotated = opts.slice(shift).concat(opts.slice(0, shift));
  const newCorrect = (correct - shift + n) % n;
  Q.push({
    id,
    leaf: LEAF,
    q: { en, as },
    options: rotated.map(([oen, oas]) => ({ en: oen, as: oas })),
    correct: newCorrect,
    explanation: { en: expEn, as: expAs },
  });
}

/* ================= cell-biology ================= */
useLeaf("cell-biology");

add("biology-350",
  "A red blood cell placed in distilled water swells and bursts, but the same cell in 0.9 per cent saline keeps its shape. The property of the membrane that explains both observations is",
  "পাতিত পানীত ৰখা লোহিত ৰক্তকণিকা ওফন্দি ফাটি যায়, কিন্তু ০.৯ শতাংশ লুণীয়া পানীত একেই কোষে আকাৰ ৰাখে। দুয়োটা পৰ্যবেক্ষণ ব্যাখ্যা কৰা ঝিল্লীৰ ধৰ্মটো",
  [["selective permeability", "নিৰ্বাচিত ভেদ্যতা"], ["complete impermeability", "সম্পূৰ্ণ অভেদ্যতা"], ["rigid crystalline structure", "কঠিন স্ফটিক গঠন"], ["active rejection of all ions", "সকলো আয়ন সক্ৰিয়ভাৱে প্ৰত্যাখ্যান"]], 0,
  "The bilayer lets water cross freely but restricts solute movement, so water follows its concentration gradient. In distilled water there is no solute outside, water enters and the cell bursts; in isotonic saline the movement balances. A completely impermeable membrane would never swell at all.",
  "দ্বিস্তৰে পানীক মুকলিকৈ যাব দিয়ে কিন্তু দ্ৰৱক ৰোধ কৰে, সেয়ে পানীয়ে ঘনত্বৰ ঢাল অনুসৰি চলে। পাতিত পানীত বাহিৰত দ্ৰৱক নাই, পানী সোমাই কোষ ফাটে; সমপৰিসৰীয় লুণীয়া পানীত চলাচল সমান হয়। সম্পূৰ্ণ অভেদ্য ঝিল্লী কেতিয়াও নুফুলে।");

add("biology-351",
  "A liver cell poisoned with carbon tetrachloride loses the organelle that carries catalase and oxidase, and hydrogen peroxide begins to accumulate. The damaged organelle is the",
  "কাৰ্বন টেট্ৰাক্ল'ৰাইডে বিষাক্ত কৰা যকৃত কোষে কেটেলেজ আৰু অক্সিডেজ থকা অংগাণু হেৰুৱায়, আৰু হাইড্ৰ'জেন পাৰঅক্সাইড জমিবলৈ ধৰে। ক্ষতিগ্ৰস্ত অংগাণুটো",
  [["peroxisome", "পেৰক্সিছ'ম"], ["lysosome", "লাইছ'ছ'ম"], ["ribosome", "ৰাইব'ছ'ম"], ["Golgi body", "গলগি বডি"]], 0,
  "Catalase destroys hydrogen peroxide and oxidase generates it, and both belong to the peroxisome. The lysosome holds acid hydrolases for bulk digestion and the ribosome builds protein, so neither carries catalase as its defining enzyme.",
  "কেটেলেজে হাইড্ৰ'জেন পাৰঅক্সাইড নষ্ট কৰে আৰু অক্সিডেজে তাক উৎপন্ন কৰে, দুয়ো পেৰক্সিছ'মৰ। লাইছ'ছ'মত থুল-হজমৰ এছিড হাইড্ৰ'লেজ আৰু ৰাইব'ছ'মত প্ৰ'টিন নিৰ্মাণ, সেয়ে কোনোটোতে কেটেলেজ মূল এনজাইম নহয়।");

add("biology-352",
  "During protein synthesis a cell is treated with a drug that blocks the large ribosomal subunit. The step that stops first is",
  "প্ৰ'টিন সংশ্লেষণত এটা ঔষধে ডাঙৰ ৰাইব'ছ'ম উপ-একক বন্ধ কৰিলে প্ৰথমে বন্ধ হোৱা খোজটো",
  [["peptide bond formation between amino acids", "এমিন' এছিডৰ মাজত পেপ্টাইড বান্ধনি গঠন"], ["transcription of DNA into mRNA", "DNA ৰপৰা mRNA লৈ অনুলিপন"], ["amino acid activation by tRNA", "tRNA দ্বাৰা এমিন' এছিড সক্ৰিয়কৰণ"], ["transport of mRNA out of the nucleus", "নিউক্লিয়াছৰপৰা mRNA ৰ পৰিবহন"]], 0,
  "The peptidyl transferase activity sits on the large subunit, so blocking it stops the chain from growing. Transcription happens in the nucleus and tRNA charging happens in the cytoplasm, both before the ribosome is engaged.",
  "পেপ্টিডিল ট্ৰান্সফেৰেজ ক্ৰিয়া ডাঙৰ উপ-এককত থাকে, সেয়ে বন্ধ কৰিলে শৃংখল বাঢ়িব নোৱাৰে। অনুলিপন নিউক্লিয়াছত আৰু tRNA ভৰ্তি চাইট'প্লাজমত হয়, দুয়ো ৰাইব'ছ'ম জড়িত হোৱাৰ আগতে।");

add("biology-353",
  "A cell that secretes large quantities of digestive enzyme would be expected to show an abundance of",
  "বহুত পৰিমাণে পাচক এনজাইম নিঃসৰণ কৰা কোষত কি বেছি পৰিমাণে থকা বুলি আশা কৰা যায়",
  [["rough endoplasmic reticulum and Golgi bodies", "ৰাফ এণ্ড'প্লাজমিক ৰেটিকুলাম আৰু গলগি বডি"], ["smooth endoplasmic reticulum only", "কেৱল স্মুথ এণ্ড'প্লাজমিক ৰেটিকুলাম"], ["large central vacuoles", "ডাঙৰ কেন্দ্ৰীয় ৰিক্ত স্থান"], ["numerous chloroplasts", "অসংখ্য ক্ল'ৰ'প্লাষ্ট"]], 0,
  "Secretory protein is folded in the rough reticulum and then sorted and packed by the Golgi. The smooth reticulum makes lipids and steroids, so it does not handle a protein export load.",
  "নিঃসৰিত প্ৰ'টিন ৰাফ ৰেটিকুলামত ভাঁ‌জ হয় আৰু গলগিয়ে শ্ৰেণীবদ্ধ কৰি পেক কৰে। স্মুথ ৰেটিকুলামে লিপিড আৰু ষ্টেৰয়ড বনায়, সেয়ে প্ৰ'টিন ৰপ্তানিৰ ভাৰ নলয়।");

add("biology-354",
  "In a plant cell, water enters the central vacuole and the cell becomes turgid. The pressure that builds and presses the protoplast against the wall is called",
  "উদ্ভিদ কোষত পানী কেন্দ্ৰীয় ৰিক্ত স্থানত সোমাই কোষ টান হয়। প্ৰ'ট'প্লাষ্টক বেৰৰ বিৰুদ্ধে হেঁ‌চা দিয়া চাপটো",
  [["turgor pressure", "টাৰ্গৰ চাপ"], ["osmotic potential only", "কেৱল অছিম'টিক বিভৱ"], ["wall pressure in the opposite direction", "বিপৰীত দিশত বেৰৰ চাপ"], ["diffusion pressure deficit", "বিস্তাৰ চাপ ঘাটি"]], 0,
  "Turgor pressure is the hydrostatic pressure inside the cell pushing outward on the wall. Osmotic potential is a tendency of water to move, not a physical pressure, and wall pressure pushes inward as the reaction.",
  "টাৰ্গৰ চাপ হ'ল কোষৰ ভিতৰৰ দ্ৰৱচাপ যি বেৰৰ ওপৰত বাহিৰলৈ হেঁ‌চে। অছিম'টিক বিভৱ পানী চলাৰ প্ৰৱণতা, ভৌতিক চাপ নহয়, আৰু বেৰৰ চাপ প্ৰতিক্ৰিয়া হিচাপে ভিতৰলৈ হেঁ‌চে।");

/* ================= human-physiology ================= */
useLeaf("human-physiology");

add("biology-355",
  "A patient's stroke volume is 70 mL and the heart rate is 75 beats per minute. The cardiac output is",
  "ৰোগীৰ ষ্ট্ৰ'ক ভলিউম ৭০ মি.লি. আৰু হৃদয়ৰ গতি প্ৰতি মিনিটত ৭৫। হৃদয়ৰ উৎপাদন",
  [["5.25 litres per minute", "প্ৰতি মিনিটত ৫.২৫ লিটাৰ"], ["1.05 litres per minute", "প্ৰতি মিনিটত ১.০৫ লিটাৰ"], ["52.5 litres per minute", "প্ৰতি মিনিটত ৫২.৫ লিটাৰ"], ["0.53 litres per minute", "প্ৰতি মিনিটত ০.৫৩ লিটাৰ"]], 0,
  "Cardiac output is stroke volume multiplied by heart rate, so 70 mL times 75 gives 5250 mL, or 5.25 litres a minute, which is close to the normal resting value. Adding or dividing the two figures instead of multiplying them produces the wrong options.",
  "হৃদয়ৰ উৎপাদন = ষ্ট্ৰ'ক ভলিউম × হৃদয়ৰ গতি, সেয়ে ৭০ মি.লি. × ৭৫ = ৫২৫০ মি.লি., অৰ্থাৎ ৫.২৫ লিটাৰ, যি স্বাভাৱিক বিশ্ৰাম মানৰ ওচৰ। যোগ বা হৰণ কৰিলে ভুল উত্তৰ পোৱা যায়।");

add("biology-356",
  "In the loop of Henle, a segment that is almost impermeable to water while it actively pumps sodium and chloride into the interstitium is responsible for diluting the tubular fluid. That segment is the",
  "হেনলী লুপত এনে এটা অংশ যি পানীলৈ প্ৰায় অভেদ্য কিন্তু ছডিয়াম আৰু ক্ল'ৰাইড সক্ৰিয়ভাৱে বাহিৰলৈ পাম্প কৰে আৰু নলীৰ তৰল পাতল কৰে। সেই অংশটো",
  [["thick ascending limb", "ডাঠ আৰোহী অংশ"], ["thin descending limb", "পাতল অৱৰোহী অংশ"], ["proximal convoluted tubule", "নিকট পৰ্যাবৃত্ত নলিকা"], ["collecting duct in the presence of ADH", "ADH থকা অৱস্থাত সংগ্ৰাহক নলী"]], 0,
  "The thick ascending limb removes solute without water, which is exactly what dilutes the fluid and builds the medullary salt gradient. The descending limb is water permeable, so it concentrates rather than dilutes.",
  "ডাঠ আৰোহী অংশই পানী নিয়াৰাশি দ্ৰৱক আঁতৰায়, সেয়ে তৰল পাতল হয় আৰু মজ্জাৰ লৱণ ঢাল গঢ়ে। অৱৰোহী অংশ পানী ভেদযোগ্য, সেয়ে ই পাতল নকৰি ঘন কৰে।");

add("biology-357",
  "A person hyperventilates for two minutes. The immediate change in the blood is a fall in",
  "এজন লোকে দুই মিনিট অতি দ্ৰুত উশাহ ল'লে তেজত লগে লগে কি কমে",
  [["carbon dioxide, raising the pH", "কাৰ্বন ডাইঅক্সাইড, যাৰ ফলত pH বাঢ়ে"], ["oxygen, lowering the pH", "অক্সিজেন, যাৰ ফলত pH কমে"], ["bicarbonate with no pH change", "বাইকাৰ্বনেট, pH নসলনি"], ["lactic acid, lowering the pH", "লেক্টিক এছিড, যাৰ ফলত pH কমে"]], 0,
  "Over-breathing washes out carbon dioxide faster than it is made, so the carbonic acid equilibrium shifts and the blood turns alkaline, which is why the person feels dizzy and tingles. Oxygen is already near saturation and does not drive the change.",
  "অতি উশাহে কাৰ্বন ডাইঅক্সাইড উৎপাদনতকৈ দ্ৰুত উলিয়ায়, সেয়ে কাৰ্বনিক এছিড ভাৰসাম্য সৰি তেজ ক্ষাৰকীয় হয়, যাৰ বাবে মূৰ ঘূৰে আৰু জুমি উঠে। অক্সিজেন ইতিমধ্যে প্ৰায় সম্পৃক্ত আৰু পৰিৱৰ্তন নকৰে।");

add("biology-358",
  "A fall in renal perfusion pressure causes the juxtaglomerular cells to release renin. The final hormone that holds sodium and water back is",
  "বৃক্কৰ ৰক্তস্ৰোতৰ চাপ কমিলে জাক্সটাগ্ল'মেৰুলাৰ কোষে ৰেনিন এৰে। ছডিয়াম আৰু পানী ধৰি ৰখা অন্তিম হৰম'নটো",
  [["aldosterone", "এলড'ষ্টেৰন"], ["renin itself", "ৰেনিন নিজেই"], ["angiotensinogen", "এঞ্জিঅ'টেনচিন'জেন"], ["atrial natriuretic peptide", "এট্ৰিয়েল নেট্ৰিউৰেটিক পেপ্টাইড"]], 0,
  "Renin starts the cascade and angiotensin converting enzyme makes angiotensin II, which triggers aldosterone from the adrenal cortex to reabsorb sodium and water. Renin is an enzyme, not the final hormone, and atrial peptide does the opposite.",
  "ৰেনিনে শৃংখল আৰম্ভ কৰে আৰু পৰিৱৰ্তনকাৰী এনজাইমে এঞ্জিঅ'টেনচিন II বনায়, যি এড্ৰিনেল কৰ্টেক্সৰপৰা এলড'ষ্টেৰন ওলাই ছডিয়াম-পানী পুনৰ্শোষণ কৰায়। ৰেনিন এনজাইম, অন্তিম হৰম'ন নহয়, আৰু এট্ৰিয়েল পেপ্টাইডে ওলোটা কাম কৰে।");

add("biology-359",
  "Type II alveolar cells are destroyed in a premature newborn. The immediate consequence is",
  "অকালজাত নৱজাতকত টাইপ II এলভিঅ'লাৰ কোষ নষ্ট হ'লে লগে লগে কি হয়",
  [["alveoli collapse because surface tension is no longer lowered", "পৃষ্ঠ টান নকমাৰ বাবে এলভিঅ'লাই সংকুচিত হয়"], ["gas exchange stops because the surface area doubles", "পৃষ্ঠ ক্ষেত্ৰ দুগুণ হোৱাৰ বাবে গেছ বিনিময় বন্ধ হয়"], ["the airways fill with mucus", "বায়ুপথত শ্লেষ্মা ভৰে"], ["haemoglobin stops binding oxygen", "হিম'গ্লবিনে অক্সিজেন বান্ধিব নোৱাৰে"]], 0,
  "Surfactant from type II cells lowers surface tension and keeps the alveoli open; without it the small alveoli collapse at the end of each breath. Type I cells form the diffusion surface, so losing them is a separate problem.",
  "টাইপ II কোষৰ ছাৰ্ফেক্টেণ্টে পৃষ্ঠ টান কমাই এলভিঅ'লাই খোলা ৰাখে; ই নাথাকিলে সৰু এলভিঅ'লাই প্ৰতিটো উশাহৰ শেষত সংকুচিত হয়। টাইপ I কোষে বিসৰণ পৃষ্ঠ গঢ়ে, সেয়ে তেওঁলোক হেৰুওৱাটো বেলেগ সমস্যা।");

add("biology-360",
  "A mountaineer at high altitude develops a higher red cell count over several weeks. The hormone responsible for this change is",
  "উচ্চ উচ্চতাত থকা পৰ্বতাৰোহীৰ কেইসপ্তাহত লোহিত কণিকা বাঢ়ে। এই পৰিৱৰ্তনৰ বাবে দায়ী হৰম'নটো",
  [["erythropoietin", "এৰিথ্ৰ'পয়েটিন"], ["insulin", "ইনচুলিন"], ["thyroxine", "থাইৰক্সিন"], ["cortisol", "কৰ্টিছল"]], 0,
  "Low oxygen tension is sensed by the kidney, which releases erythropoietin to stimulate red cell production in the marrow. Thyroxine raises metabolic rate and cortisol affects stress responses, but neither drives red cell mass.",
  "কম অক্সিজেন চাপ বৃক্কই অনুভৱ কৰি এৰিথ্ৰ'পয়েটিন এৰে, যিয়ে মজ্জাত লোহিত কণিকা উৎপাদন বঢ়ায়। থাইৰক্সিনে বিপাকীয় হাৰ বঢ়ায় আৰু কৰ্টিছলে চাপ প্ৰতিক্ৰিয়া নিয়ন্ত্ৰণ কৰে, কিন্তু কোনোটোৱেই লোহিত কণিকা নবঢ়ায়।");

add("biology-361",
  "A patient passes large volumes of dilute urine and is intensely thirsty. The most likely hormonal defect is a deficiency of",
  "ৰোগীয়ে বেছি পৰিমাণৰ পাতল মূত্ৰ ত্যাগ কৰে আৰু তীব্ৰ পিয়াহ অনুভৱ কৰে। আটাই সম্ভাৱ্য হৰম'নৰ অভাৱ",
  [["antidiuretic hormone", "এণ্টিডাইউৰেটিক হৰম'ন"], ["aldosterone", "এলড'ষ্টেৰন"], ["adrenaline", "এড্ৰিনেলিন"], ["glucagon", "গ্লুকাগন"]], 0,
  "Without antidiuretic hormone the collecting duct stays impermeable to water, so water is lost in urine and the thirst mechanism is triggered. Aldosterone loss would instead waste sodium and lower blood pressure.",
  "এণ্টিডাইউৰেটিক হৰম'ন নাথাকিলে সংগ্ৰাহক নলী পানীলৈ অভেদ্য থাকে, সেয়ে পানী মূত্ৰৰে যায় আৰু পিয়াহৰ প্ৰক্ৰিয়া জাগে। এলড'ষ্টেৰনৰ অভাৱত ছডিয়াম যায় আৰু ৰক্তচাপ কমে।");

add("biology-362",
  "During strenuous exercise a muscle accumulates lactic acid because",
  "কঠোৰ ব্যায়ামত পেশীত লেক্টিক এছিড জমে কাৰণ",
  [["oxygen supply lags behind demand, so pyruvate is reduced instead of entering the Krebs cycle", "অক্সিজেন যোগান চাহিদাতকৈ পিছ পৰে, সেয়ে পাইৰুভেট ক্ৰেবছ চক্ৰত নোসোমাই বিজাৰিত হয়"], ["the Krebs cycle runs faster than glycolysis", "ক্ৰেবছ চক্ৰ গ্লাইক'লাইছিছতকৈ দ্ৰুত চলে"], ["carbon dioxide cannot leave the muscle", "কাৰ্বন ডাইঅক্সাইড পেশীৰপৰা ওলাব নোৱাৰে"], ["the muscle stops making ATP entirely", "পেশীয়ে ATP বনোৱা সম্পূৰ্ণ বন্ধ কৰে"]], 0,
  "When oxygen is short, pyruvate cannot be oxidised and is converted to lactate so that NAD is regenerated and glycolysis can continue. ATP production falls but does not stop, and carbon dioxide removal is not the limiting step.",
  "অক্সিজেন কম হ'লে পাইৰুভেট জাৰিত নহয় আৰু লেক্টেটত পৰিণত হয় যাতে NAD ঘূৰে আৰু গ্লাইক'লাইছিছ চলি থাকে। ATP উৎপাদন কমে কিন্তু বন্ধ নহয়, আৰু কাৰ্বন ডাইঅক্সাইড ওলোৱাটো সীমাবদ্ধ খোজ নহয়।");

add("biology-363",
  "A person with a lesion in the medulla oblongata will most directly lose",
  "মেডুলা অৱলংগাটাত ক্ষতি হ'লে আটাই পোনপটীয়াকৈ কি হেৰায়",
  [["automatic control of breathing and heart rate", "উশাহ আৰু হৃদয়ৰ গতিৰ স্বয়ংক্ৰিয় নিয়ন্ত্ৰণ"], ["voluntary movement of the limbs", "অংগৰ ইচ্ছাকৃত লৰচৰ"], ["interpretation of visual images", "দৃশ্য ছবিৰ ব্যাখ্যা"], ["balance while walking", "খোজ কঢ়াত ভাৰসাম্য"]], 0,
  "The medulla holds the respiratory and cardiac centres, so its damage threatens breathing and circulation directly. Voluntary movement is cortical and balance is cerebellar.",
  "মেডুলাত শ্বাস-প্ৰশ্বাস আৰু হৃদয় কেন্দ্ৰ থাকে, সেয়ে ইয়াৰ ক্ষতিয়ে উশাহ আৰু সংবহন পোনপটীয়াকৈ ভাবুকি দিয়ে। ইচ্ছাকৃত লৰচৰ কৰ্টেক্সৰ আৰু ভাৰসাম্য চেৰিবেলামৰ।");

/* ================= genetics-evolution ================= */
useLeaf("genetics-evolution");

add("biology-364",
  "A carrier mother and an unaffected father have children. The expected pattern for a sex-linked recessive disease is",
  "বাহক মাক আৰু অক্ষত পিতাৰ সন্তানত যৌন-সংলগ্ন অৱশিষ্ট ৰোগৰ আশা কৰা আৰ্হি",
  [["half the sons affected, half the daughters carriers", "আধা পুত্ৰ ৰোগী, আধা কন্যা বাহক"], ["all sons affected, all daughters carriers", "সকলো পুত্ৰ ৰোগী, সকলো কন্যা বাহক"], ["no child affected at all", "কোনো সন্তান ৰোগী নহয়"], ["all daughters affected, no son affected", "সকলো কন্যা ৰোগী, কোনো পুত্ৰ নহয়"]], 0,
  "A son receives his single X from the mother, so half of them get the faulty copy and are affected. A daughter receives a healthy X from the father, so she cannot be affected but half become carriers.",
  "পুত্ৰই মাকৰপৰা অকলশৰীয়া X পায়, সেয়ে আধাই ত্ৰুটিপূৰ্ণ প্ৰতিলিপি পাই ৰোগী হয়। কন্যাই পিতাৰপৰা সুস্থ X পায়, সেয়ে ৰোগী নহয় কিন্তু আধা বাহক হয়।");

add("biology-365",
  "Sickle-cell anaemia results from the substitution of valine for glutamic acid at the sixth position of the beta chain. The level of protein structure directly altered is the",
  "ছিকল-চেল এনিমিয়া β শৃংখলৰ ষষ্ঠ স্থানত গ্লুটামিক এছিডৰ সলনি ভেলিন বহাৰপৰা হয়। পোনপটীয়াকৈ সলনি হোৱা প্ৰ'টিন গঠনৰ স্তৰ",
  [["primary structure", "প্ৰাথমিক গঠন"], ["secondary structure", "দ্বিতীয় গঠন"], ["tertiary structure", "তৃতীয় গঠন"], ["quaternary structure", "চতুৰ্থ গঠন"]], 0,
  "Primary structure is the sequence of amino acids, and one residue has been swapped, so that is the level changed first. Folding and assembly change later as a consequence.",
  "প্ৰাথমিক গঠন হ'ল এমিন' এছিডৰ ক্ৰম, আৰু এটা অৱশেষ সলনি হৈছে, সেয়ে প্ৰথমে সেই স্তৰেই সলনি। ভাঁ‌জ আৰু সংযোগ পিছত পৰিণাম হিচাপে সলনি হয়।");

add("biology-366",
  "In a dihybrid cross between two heterozygotes, the ratio of offspring showing both dominant traits to those showing both recessive traits is",
  "দুটা বিষমযুগ্মৰ মাজত দ্বিহাইব্ৰিড ক্ৰছত দুয়োটা প্ৰভাৱী গুণ থকা আৰু দুয়োটা অৱশিষ্ট গুণ থকা সন্তানৰ অনুপাত",
  [["9 to 1", "৯ ৰপৰা ১"], ["3 to 1", "৩ ৰপৰা ১"], ["1 to 1", "১ ৰপৰা ১"], ["9 to 3", "৯ ৰপৰা ৩"]], 0,
  "Independent assortment gives the 9:3:3:1 ratio, so both dominant is nine parts and both recessive is one. Three to one belongs to a monohybrid cross.",
  "স্বতন্ত্ৰ বিন্যাসে ৯:৩:৩:১ অনুপাত দিয়ে, সেয়ে দুয়ো প্ৰভাৱী ন অংশ আৰু দুয়ো অৱশিষ্ট এক অংশ। তিনিৰপৰা এক একহাইব্ৰিড ক্ৰছৰ।");

add("biology-367",
  "A restriction endonuclease is used in biotechnology because it",
  "জীৱপ্ৰযুক্তিত ৰেস্ত্ৰিকচন এণ্ড'নিউক্লিয়েজ ব্যৱহৃত হয় কাৰণ ই",
  [["cuts DNA at a specific palindromic sequence", "নিৰ্দিষ্ট পেলিনড্ৰ'মিক ক্ৰমত DNA কাটে"], ["joins two DNA fragments", "দুটা DNA খণ্ড জোড়ে"], ["copies DNA many times", "DNA বহুবাৰ নকল কৰে"], ["separates proteins by size", "আকাৰ অনুসৰি প্ৰ'টিন পৃথক কৰে"]], 0,
  "The enzyme recognises a short symmetrical sequence and cuts there, which is what makes precise fragmenting possible. Joining is the work of ligase and copying is the work of polymerase.",
  "এনজাইমে চুটি সমমিত ক্ৰম চিনি তাত কাটে, সেয়ে নিখুঁত খণ্ড কৰা সম্ভৱ হয়। জোড়া লগোৱা লাইগেজৰ আৰু নকল কৰা পলিমাৰেজৰ কাম।");

add("biology-368",
  "Two populations of a species are separated by a river for many generations and later can no longer interbreed. This is an example of",
  "এটা প্ৰজাতিৰ দুটা জনগোষ্ঠী বহু প্ৰজন্ম নদীৰে পৃথক হৈ থাকি পিছত আন্তঃপ্ৰজনন কৰিব নোৱাৰা হ'ল। এইটো উদাহৰণ",
  [["allopatric speciation", "এল'পেট্ৰিক প্ৰজাতিকৰণ"], ["sympatric speciation", "ছিমপেট্ৰিক প্ৰজাতিকৰণ"], ["artificial selection", "কৃত্ৰিম নিৰ্বাচন"], ["convergent evolution", "অভিসৰণী বিবৰ্তন"]], 0,
  "A geographic barrier separates the groups, which is the definition of allopatric. Sympatric speciation happens without such a barrier, and artificial selection is driven by human choice.",
  "ভৌগোলিক বাধাই গোটবোৰ পৃথক কৰে, যি এল'পেট্ৰিকৰ সংজ্ঞা। ছিমপেট্ৰিক এনে বাধা নোহোৱাকৈ হয়, আৰু কৃত্ৰিম নিৰ্বাচন মানুহৰ বাছনিৰে চলে।");

add("biology-369",
  "The Hardy-Weinberg principle states that allele frequencies in a population stay constant only when",
  "হাৰ্ডি-ৱেইনবাৰ্গ নীতিয়ে কয় যে জনগোষ্ঠীত এলিলৰ কম্পনাংক স্থিৰ থাকে কেৱল যেতিয়া",
  [["there is no selection, mutation, migration or genetic drift and mating is random", "নিৰ্বাচন, পৰিৱৰ্তন, স্থানান্তৰ বা জিনীয় প্ৰবাহ নাই আৰু মিলন অনিয়মীয়া"], ["selection is strong", "নিৰ্বাচন প্ৰবল"], ["mutation rate is high", "পৰিৱৰ্তনৰ হাৰ উচ্চ"], ["the population is very small", "জনগোষ্ঠী অতি সৰু"]], 0,
  "The equilibrium holds only under the ideal conditions of no evolutionary force and random mating. Small populations drift, and strong selection or high mutation shifts frequencies by definition.",
  "ভাৰসাম্য কেৱল আদৰ্শ অৱস্থাত, য'ত কোনো বিবৰ্তনী বল নাই আৰু মিলন অনিয়মীয়া। সৰু জনগোষ্ঠীত প্ৰবাহ হয়, আৰু প্ৰবল নিৰ্বাচন বা উচ্চ পৰিৱৰ্তনে সংজ্ঞা অনুসৰি কম্পনাংক সলায়।");

add("biology-370",
  "In a food chain of grass, grasshopper, frog, snake and hawk, the hawk occupies the",
  "ঘাঁ‌হ, ফৰিং, ভেকুলী, সাপ আৰু চিলনীৰ খাদ্য শৃংখলত চিলনীয়ে অধিকাৰ কৰে",
  [["fifth trophic level", "পঞ্চম ট্ৰফিক স্তৰ"], ["second trophic level", "দ্বিতীয় ট্ৰফিক স্তৰ"], ["third trophic level", "তৃতীয় ট্ৰফিক স্তৰ"], ["first trophic level", "প্ৰথম ট্ৰফিক স্তৰ"]], 0,
  "Grass is the producer at level one, and each consumer step adds a level, so the hawk feeding on the snake is at the fifth. The first level always belongs to the producer.",
  "ঘাঁ‌হ প্ৰথম স্তৰৰ উৎপাদক, আৰু প্ৰতিটো উপভোক্তা খোজে স্তৰ বঢ়ায়, সেয়ে সাপ খোৱা চিলনী পঞ্চমত। প্ৰথম স্তৰ সদায় উৎপাদকৰ।");

/* ================= microbiology-biotechnology ================= */
useLeaf("microbiology-biotechnology");

add("biology-371",
  "A Gram-negative organism appears pink after Gram staining because",
  "গ্ৰাম দাগৰ পিছত গ্ৰাম-ঋণাত্মক জীৱাণু গুলপীয়া দেখা যায় কাৰণ",
  [["the thin peptidoglycan layer loses the crystal violet and takes the counterstain", "পাতল পেপ্টিড'গ্লাইকেন স্তৰে ক্ৰিষ্টেল ভায়'লেট হেৰুৱাই প্ৰতিদাগ লয়"], ["it has no cell wall at all", "ইয়াৰ কোষ বেৰ একেবাৰে নাই"], ["it retains crystal violet strongly", "ই ক্ৰিষ্টেল ভাইঅ'লেট দৃঢ়ভাৱে ধৰি ৰাখে"], ["it is always non-viable", "ই সদায় অজীৱন্ত"]], 0,
  "The alcohol step washes the dye out of the thin wall, and the safranin counterstain then colours the cell pink. Gram-positive walls are thick and keep the purple dye.",
  "এলকহ'ল ধুই পাতল বেৰৰপৰা ৰং উলিয়ায়, আৰু ছাফ্ৰানিন প্ৰতিদাগে কোষ গুলপীয়া কৰে। গ্ৰাম-ধনাত্মক বেৰ ডাঠ আৰু বেঙুনীয়া ৰং ৰাখে।");

add("biology-372",
  "An autoclave is preferred over boiling water for sterilising surgical instruments because",
  "শল্য সজুলি জীৱাণুমুক্ত কৰিবলৈ উতলা পানীতকৈ অ'ট'ক্লেভ পছন্দ কৰা হয় কাৰণ",
  [["steam under pressure reaches a temperature that destroys bacterial spores", "চাপত ভাপে বেক্টেৰিয়াৰ বীজাণু নষ্ট কৰা উষ্ণতাত পায়"], ["boiling water is too cold to wet the instruments", "উতলা পানী সজুলি তিতা কৰিবলৈ অতি ঠাণ্ডা"], ["an autoclave works without heat", "অ'ট'ক্লেভ তাপ নোহোৱাকৈ কাম কৰে"], ["boiling removes only dust", "উতলালে কেৱল ধূলি আঁতৰে"]], 0,
  "Boiling at normal pressure stops near a hundred degrees, which kills vegetative cells but not spores. Steam at raised pressure reaches about 121 degrees and destroys spores as well.",
  "সাধাৰণ চাপত উতলাই এশ ডিগ্ৰীৰ ওচৰত ৰয়, যিয়ে সক্ৰিয় কোষ মাৰে কিন্তু বীজাণু নমাৰে। বঢ়া চাপত ভাপে প্ৰায় ১২১ ডিগ্ৰীত পাই বীজাণুও নষ্ট কৰে।");

add("biology-373",
  "A bacterium that grows only in the absence of oxygen and is killed when exposed to air is called",
  "কেৱল অক্সিজেন নোহোৱা অৱস্থাত বাঢ়ি অক্সিজেনৰ সংস্পৰ্শত মৰা বেক্টেৰিয়াক কি বোলা হয়",
  [["obligate anaerobe", "বাধ্যতামূলক এনাৰ'ব"], ["obligate aerobe", "বাধ্যতামূলক এয়াৰ'ব"], ["facultative anaerobe", "ঐচ্ছিক এনাৰ'ব"], ["microaerophile", "মাইক্ৰ'এয়াৰ'ফিল"]], 0,
  "Obligate anaerobes lack the enzymes to cope with oxygen radicals, so air is lethal. Facultative organisms can switch and microaerophiles need low but not zero oxygen.",
  "বাধ্যতামূলক এনাৰ'বত অক্সিজেন ৰেডিকেল সামৰাৰ এনজাইম নাথাকে, সেয়ে বতাহ মাৰাত্মক। ঐচ্ছিক জীৱাণুৱে সলনি কৰিব পাৰে আৰু মাইক্ৰ'এয়াৰ'ফিলে কম কিন্তু শূন্য নোহোৱা অক্সিজেন বিচাৰে।");

add("biology-374",
  "In genetic engineering the plasmid is used as a vector because it",
  "জিনীয় অভিযান্ত্ৰণত প্লাজমিডক ভেক্টৰ হিচাপে ব্যৱহাৰ কৰা হয় কাৰণ ই",
  [["replicates independently inside the bacterial host and can carry an inserted gene", "বেক্টেৰিয়াৰ ভিতৰত স্বতন্ত্ৰভাৱে নকল হয় আৰু সোমোৱা জিন বহন কৰিব পাৰে"], ["digests foreign DNA", "বাহিৰা DNA হজম কৰে"], ["provides the restriction enzyme", "ৰেস্ত্ৰিকচন এনজাইম যোগায়"], ["prevents the host from dividing", "আতিথেয়ক বিভাজনৰপৰা ৰোধে"]], 0,
  "A plasmid carries its own origin of replication, so the inserted gene is copied along with it every time the bacterium divides. The cutting enzyme is supplied separately.",
  "প্লাজমিডত নিজৰ অনুলিপন আৰম্ভণি থাকে, সেয়ে বেক্টেৰিয়া বিভাজনৰ প্ৰতিবাৰে সোমোৱা জিনো নকল হয়। কটা এনজাইম বেলেগকৈ যোগ কৰা হয়।");

add("biology-375",
  "Pasteurisation of milk kills most pathogens while preserving quality because it",
  "গাখীৰ পেষ্টুৰীকৰণে বেছিভাগ ৰোগজীৱাণু মাৰি গুণ ৰাখে কাৰণ ই",
  [["uses a controlled temperature for a short time rather than prolonged boiling", "দীঘলীয়া উতলাৰ সলনি চমু সময়ৰ বাবে নিয়ন্ত্ৰিত উষ্ণতা ব্যৱহাৰ কৰে"], ["adds antibiotics to the milk", "গাখীৰত এণ্টিবায়'টিক যোগ কৰে"], ["freezes the milk slowly", "গাখীৰ লাহে লাহে জমায়"], ["removes all bacteria including spores", "বীজাণুকে ধৰি সকলো বেক্টেৰিয়া আঁতৰায়"]], 0,
  "Heating to about 63 degrees for thirty minutes or 72 degrees for fifteen seconds kills the vegetative pathogens without spoiling taste and protein. Spores survive, which is why pasteurised milk still needs refrigeration.",
  "প্ৰায় ৬৩ ডিগ্ৰীত ত্ৰিশ মিনিট বা ৭২ ডিগ্ৰীত পোন্ধৰ ছেকেণ্ড গৰম কৰিলে ৰোগজীৱাণু মৰে কিন্তু সোৱাদ আৰু প্ৰ'টিন নষ্ট নহয়। বীজাণু থাকি যায়, সেয়ে পেষ্টুৰীকৃত গাখীৰো ফ্ৰিজত ৰাখিব লাগে।");

add("biology-376",
  "Which of the following correctly pairs a microbe with the product it gives commercially?",
  "তলৰ কোনটোৱে অণুজীৱ আৰু ব্যৱসায়িকভাৱে ইয়াৰ উৎপাদন শুদ্ধভাৱে জোড়ে",
  [["Saccharomyces cerevisiae and ethanol", "ছেকাৰ'মাইচিছ চেৰেভিচি আৰু ইথানল"], ["Escherichia coli and penicillin", "এছছেৰিচিয়া ক'লাই আৰু পেনিচিলিন"], ["Lactobacillus and insulin", "লেক্ট'বেছিলাছ আৰু ইনচুলিন"], ["Clostridium and curd", "ক্ল'ষ্ট্ৰিডিয়াম আৰু দৈ"]], 0,
  "Yeast ferments sugar to ethanol and carbon dioxide, which is the basis of brewing and baking. Penicillin comes from Penicillium moulds and curd from Lactobacillus.",
  "ঈষ্টে চেনিক ইথানল আৰু কাৰ্বন ডাইঅক্সাইডলৈ গাঁ‌জে, যি মদ আৰু পিঠা বনোৱাৰ ভিত্তি। পেনিচিলিন পেনিচিলিয়াম ছত্ৰাকৰপৰা আৰু দৈ লেক্ট'বেছিলাছৰপৰা।");

add("biology-377",
  "A patient develops infection after a bite and the wound smells foul with gas in the tissue. The most likely organism belongs to the genus",
  "কামোৰৰ পিছত ৰোগীত সংক্ৰমণ হয়, ঘাৰ পৰা দুৰ্গন্ধ ওলায় আৰু কলাত গেছ জমে। আটাই সম্ভাৱ্য জীৱাণুৰ গণ",
  [["Clostridium", "ক্ল'ষ্ট্ৰিডিয়াম"], ["Mycobacterium", "মাইক'বেক্টেৰিয়াম"], ["Treponema", "ট্ৰেপ'নেমা"], ["Vibrio", "ভিব্ৰিঅ'"]], 0,
  "Anaerobic clostridia grow in dead tissue and produce gas and foul odour. Mycobacterium causes tuberculosis and leprosy, and Vibrio causes cholera.",
  "এনাৰ'বিক ক্ল'ষ্ট্ৰিডিয়া মৃত কলাত বাঢ়ি গেছ আৰু দুৰ্গন্ধ দিয়ে। মাইক'বেক্টেৰিয়ামে যক্ষ্মা আৰু কুষ্ঠ, আৰু ভিব্ৰিঅ'ই কলera কৰে।");

/* ================= diseases-health ================= */
useLeaf("diseases-health");

add("biology-378",
  "In dengue haemorrhagic fever the bleeding tendency is best explained by",
  "ডেংগু হিম'ৰেজিক জ্বৰত ৰক্তক্ষৰণৰ প্ৰৱণতা আটাই ভালকৈ ব্যাখ্যা কৰে",
  [["a fall in platelet count with leakage from damaged capillaries", "ৰক্ত অনুচক্ৰ কমি ক্ষতিগ্ৰস্ত কেশিকা নলীৰপৰা ৰস ওলোৱা"], ["a rise in platelet count", "ৰক্ত অনুচক্ৰ বঢ়া"], ["excess production of clotting factor", "ৰক্ত জমা কাৰকৰ অত্যধিক উৎপাদন"], ["loss of red cell mass only", "কেৱল লোহিত কণিকাৰ ভৰ কমা"]], 0,
  "The virus damages small vessels and suppresses platelet production, so both the vessel wall and the clotting plug fail. A high platelet count would oppose, not cause, bleeding.",
  "ভাইৰাছে সৰু নলী নষ্ট কৰি ৰক্ত অনুচক্ৰ উৎপাদন দমায়, সেয়ে নলীৰ বেৰ আৰু জমা পিণ্ড দুয়ো বিফল হয়। বেছি অনুচক্ৰই ৰক্তক্ষৰণ বিৰোধ কৰে, নকৰায়।");

add("biology-379",
  "A sputum sample shows acid-fast bacilli and the chest film shows a cavity in the upper lobe. The disease is",
  "কফৰ নমুনাত এছিড-ফাষ্ট বেক্টেৰিয়া আৰু বুকুৰ ছবিত ওপৰ অংশত গহ্বৰ দেখা যায়। ৰোগটো",
  [["pulmonary tuberculosis", "ফুসফুসৰ যক্ষ্মা"], ["lobar pneumonia", "ল'বাৰ নিউম'নিয়া"], ["bronchial asthma", "ব্ৰংকিয়েল হাঁপানি"], ["pleural effusion", "প্লুৰেল ইফিউশ্যন"]], 0,
  "Acid-fast bacilli with upper lobe cavitation is the classic picture of tuberculosis. Pneumonia fills the alveoli with exudate rather than excavating a cavity.",
  "এছিড-ফাষ্ট বেক্টেৰিয়া আৰু ওপৰ অংশৰ গহ্বৰ যক্ষ্মাৰ প্ৰচলিত চিত্ৰ। নিউম'নিয়াই এলভিঅ'লাই স্ৰাৱেৰে ভৰায়, গহ্বৰ নকৰে।");

add("biology-380",
  "Sporozoites are found in the salivary glands of only one of these insects, which is why a mosquito bite can start a malarial infection while a bite from the others cannot. That insect is",
  "এই পতংগবোৰৰ মাজত কেৱল এটাই লালাগ্ৰন্থিত স্প'ৰ'জ'ইট ধৰি ৰাখে, সেয়ে তাৰ কামোৰে মেলেৰিয়া আৰম্ভ কৰে আনবোৰৰ কামোৰে নকৰে। সেই পতংগটো",
  [["a female Anopheles mosquito", "মাইকী এন'ফিলিছ মশা"], ["a male Culex mosquito", "মতা কিউলেক্স মশা"], ["a tsetse fly", "ছেটছে মাখি"], ["a sandfly", "বালিমাখি"]], 0,
  "The parasite completes its sexual cycle only in the gut of Anopheles and then reaches the salivary glands, ready to be injected at the next blood meal. Culex and Aedes do not support that cycle, male mosquitoes take no blood at all, and tsetse flies carry the trypanosome of sleeping sickness.",
  "পৰজীৱীয়ে কেৱল এন'ফিলিছৰ অন্ত্ৰত যৌন চক্ৰ সম্পূৰ্ণ কৰি লালাগ্ৰন্থিত উপনীত হয়, পৰৱৰ্তী ৰক্তভোজনত সুমুৱাবলৈ সাজু হৈ। কিউলেক্স আৰু এডিছে সেই চক্ৰ পোষকতা নকৰে, মতাই তেজই নাখায়, আৰু ছেটছে মাখিয়ে নিদ্ৰাৰোগৰ ট্ৰাইপেন'ছ'মা কঢ়িয়ায়।");

add("biology-381",
  "A child with measles is most at risk of which complication that makes vitamin A supplementation routine?",
  "মিজলছ হোৱা শিশুত কোন জটিলতাৰ বেছি বিপদ, যাৰ বাবে ভিটামিন A দিয়া নিয়মিত কৰা হয়",
  [["corneal damage and blindness", "কৰ্ণিয়াৰ ক্ষতি আৰু অন্ধত্ব"], ["kidney stones", "বৃক্কৰ পাথৰ"], ["diabetes", "মধুমেহ"], ["scurvy", "স্কাৰ্ভি"]], 0,
  "Measles depletes vitamin A stores and can cause corneal ulceration, so supplementation is given to prevent blindness. Stones and diabetes are unrelated to measles.",
  "মিজলছে ভিটামিন A ৰ ভাণ্ডাৰ নিঃশেষ কৰি কৰ্ণিয়াৰ ঘা কৰিব পাৰে, সেয়ে অন্ধত্ব ৰোধ কৰিবলৈ দিয়া হয়। পাথৰ আৰু মধুমেহ মিজলছৰ সৈতে অসম্পৰ্কিত।");

add("biology-382",
  "Cholera causes profuse watery diarrhoea, and death results mainly from",
  "কলera ত প্ৰচুৰ পানীদৰ ডায়েৰিয়া হয়, আৰু মৃত্যু মূলতঃ কিৰপৰা হয়",
  [["severe dehydration and electrolyte loss", "তীব্ৰ পানীশূন্যতা আৰু ইলেক্ট্ৰ'লাইট ক্ষয়"], ["liver failure", "যকৃত বিকল"], ["brain abscess", "মগজুৰ পুঁ‌জ"], ["bone marrow suppression", "মজ্জা দমন"]], 0,
  "The toxin drives chloride and water secretion into the gut, so the body loses volume faster than it can replace it. Oral rehydration or intravenous fluid is the treatment that saves life.",
  "বিষে ক্ল'ৰাইড আৰু পানী অন্ত্ৰলৈ নিঃসৰণ কৰায়, সেয়ে শৰীৰে পূৰণ কৰিব পৰাতকৈ দ্ৰুত তৰল হেৰুৱায়। মুখেৰে বা অন্তঃশিৰা তৰলে জীৱন ৰক্ষা কৰে।");

add("biology-383",
  "A patient with jaundice, dark urine and pale stools most likely has obstruction of the",
  "জণ্ডিছ, গাঢ় মূত্ৰ আৰু পাণ্ডুৰ বৰণৰ মল থকা ৰোগীত আটাই সম্ভাৱ্য বন্ধ",
  [["bile duct", "পিত্ত নলী"], ["ureter", "মূত্ৰনলী"], ["trachea", "শ্বাসনলী"], ["oesophagus", "খাদ্যনলী"]], 0,
  "Blocked bile cannot reach the gut, so bilirubin backs up into blood, colours the urine dark and leaves the stool pale. The ureter carries urine and has no role in bile.",
  "বন্ধ পিত্ত অন্ত্ৰলৈ যাব নোৱাৰে, সেয়ে বিলিৰুবিন তেজত জমি মূত্ৰ গাঢ় কৰে আৰু মল পাণ্ডুৰ হয়। মূত্ৰনলীয়ে মূত্ৰ নিয়ে, পিত্তৰ সৈতে সম্পৰ্ক নাই।");

/* ================= nutrition-vitamins ================= */
useLeaf("nutrition-vitamins");

add("biology-384",
  "A diet rich in polished rice and poor in pulses leads to beriberi because milling removes",
  "পালিচ কৰা চাউল বেছি আৰু ডাইল কম থকা খাদ্যই বেৰিবেৰি কৰে কাৰণ মিলিঙত কি আঁতৰে",
  [["the thiamine rich bran and germ", "থায়ামিনযুক্ত বাহিৰৰ আৱৰণ আৰু ভ্ৰূণ"], ["the starch of the endosperm", "এণ্ড'স্পাৰ্মৰ ষ্টাৰ্চ"], ["the cellulose of the husk only", "কেৱল বাকলিৰ চেলুল'জ"], ["the water soluble protein", "পানীত দ্ৰৱনীয় প্ৰ'টিন"]], 0,
  "Thiamine sits in the bran and germ, which polishing strips away, so the remaining endosperm is largely starch. The starch itself is not the problem; the lost vitamin is.",
  "থায়ামিন বাহিৰৰ আৱৰণ আৰু ভ্ৰূণত থাকে, যি পালিচত আঁতৰে, সেয়ে বাকী এণ্ড'স্পাৰ্ম প্ৰায় ষ্টাৰ্চ। ষ্টাৰ্চ সমস্যা নহয়, হেৰুওৱা ভিটামিনহে।");

add("biology-385",
  "Vitamin C is easily destroyed during cooking because it is",
  "ৰন্ধাৰ সময়ত ভিটামিন C সহজে নষ্ট হয় কাৰণ ই",
  [["water soluble, heat labile and oxidised by copper", "পানীত দ্ৰৱনীয়, তাপত অস্থিৰ আৰু তামেৰে জাৰিত"], ["fat soluble and heat stable", "চৰ্বিত দ্ৰৱনীয় আৰু তাপত স্থিৰ"], ["insoluble in water and stable in acid", "পানীত অদ্ৰৱনীয় আৰু অম্লত স্থিৰ"], ["destroyed only by freezing", "কেৱল জমাই ৰখাৰে নষ্ট"]], 0,
  "Ascorbic acid leaches into cooking water, breaks down on heating and is oxidised by copper and iron utensils, so long boiling in an open copper vessel leaves very little. Fat soluble vitamins behave differently.",
  "এছকৰ্বিক এছিড ৰন্ধা পানীত উলিয়াই যায়, তাপত ভাঙে আৰু তামা-লোৰ পাত্ৰই জাৰিত কৰে, সেয়ে মুকলি তামাৰ পাত্ৰত দীঘলীয়া উতলালে খুব কম থাকে। চৰ্বিত দ্ৰৱনীয় ভিটামিন বেলেগ ধৰণে চলে।");

add("biology-386",
  "Night blindness in a child with dry conjunctiva and Bitot spots indicates deficiency of",
  "শুকান আখি আৰু বিট'ৰ দাগ থকা শিশুৰ ৰাতি অন্ধতাৰে কিৰ অভাৱ বুজায়",
  [["vitamin A", "ভিটামিন A"], ["vitamin B12", "ভিটামিন B12"], ["vitamin D", "ভিটামিন D"], ["vitamin E", "ভিটামিন E"]], 0,
  "Retinol forms rhodopsin for dim light and maintains the epithelium, so lack gives night blindness, xerosis and Bitot spots. B12 lack causes megaloblastic anaemia and D lack causes rickets.",
  "ৰেটিন'লে কম পোহৰলৈ ৰড'পচিন বনায় আৰু উপকলা ৰক্ষা কৰে, সেয়ে অভাৱত ৰাতি অন্ধতা, জিৰ'ছিছ আৰু বিট'ৰ দাগ হয়। B12 ৰ অভাৱত মেগাল'ব্লাষ্টিক এনিমিয়া আৰু D ৰ অভাৱত ৰিকেটছ।");

add("biology-387",
  "A strictly vegan diet without supplementation risks deficiency of vitamin B12 because",
  "পৰিপূৰক নোহোৱা কেৱল উদ্ভিদভিত্তিক খাদ্যত ভিটামিন B12 ৰ অভাৱৰ আশংকা কাৰণ",
  [["the vitamin occurs naturally in animal foods and is made by gut bacteria", "ভিটামিনটো স্বাভাৱিকভাৱে প্ৰাণীজ খাদ্যত থাকে আৰু অন্ত্ৰৰ বেক্টেৰিয়াই বনায়"], ["plants contain an inhibitor of B12", "উদ্ভিদত B12 ৰ বাধাদায়ক থাকে"], ["cooking destroys all B12 in vegetables", "ৰন্ধাই শাক-পাচলিৰ সকলো B12 নষ্ট কৰে"], ["the vitamin is destroyed by sunlight", "ৰ'দে ভিটামিনটো নষ্ট কৰে"]], 0,
  "Cobalamin comes from animal sources and from bacteria, and plant foods do not supply a reliable amount. Deficiency causes megaloblastic anaemia and nerve damage.",
  "ক'বালামিন প্ৰাণীজ উৎস আৰু বেক্টেৰিয়াৰপৰা আহে, আৰু উদ্ভিদজ খাদ্যই নিৰ্ভৰযোগ্য পৰিমাণ নিদিয়ে। অভাৱত মেগাল'ব্লাষ্টিক এনিমিয়া আৰু স্নায়ু ক্ষতি হয়।");

add("biology-388",
  "Kwashiorkor and marasmus differ mainly because kwashiorkor is marked by",
  "কোৱাছিঅ'ৰকৰ আৰু মাৰাছমাছৰ মূল পাৰ্থক্য কি কাৰণ কোৱাছিঅ'ৰকৰত থাকে",
  [["oedema with relatively preserved calorie intake but low protein", "কেলৰি তুলনামূলকভাৱে ঠিক কিন্তু প্ৰ'টিন কম হোৱা অৱস্থাত ইডিমা"], ["severe wasting with no oedema", "ইডিমা নোহোৱাকৈ তীব্ৰ ক্ষয়"], ["excess protein intake", "অত্যধিক প্ৰ'টিন গ্ৰহণ"], ["vitamin C deficiency", "ভিটামিন C ৰ অভাৱ"]], 0,
  "In kwashiorkor protein is short while calories are near adequate, so albumin falls and oedema appears. Marasmus is global calorie deficiency with severe wasting and no oedema.",
  "কোৱাছিঅ'ৰকৰত প্ৰ'টিন কম কিন্তু কেলৰি প্ৰায় যথেষ্ট, সেয়ে এলবুমিন কমি ইডিমা হয়। মাৰাছমাছত মুঠ কেলৰিৰ অভাৱত তীব্ৰ ক্ষয় হয় আৰু ইডিমা নাথাকে।");

/* ================= ecology-environment ================= */
useLeaf("ecology-environment");

add("biology-389",
  "Only about ten per cent of the energy at one trophic level reaches the next because",
  "এটা ট্ৰফিক স্তৰৰ মাত্ৰ দহ শতাংশ শক্তি পৰৱৰ্তী স্তৰলৈ যায় কাৰণ",
  [["most energy is lost as heat through respiration and in uneaten parts", "বেছিভাগ শক্তি শ্বাস-প্ৰশ্বাসেৰে তাপ হিচাপে আৰু নোখোৱা অংশত হেৰায়"], ["predators digest food completely", "পৰভক্ষীয়ে খাদ্য সম্পূৰ্ণ হজম কৰে"], ["energy is created at each level", "প্ৰতিটো স্তৰত শক্তি সৃষ্টি হয়"], ["the food chain has only two links", "খাদ্য শৃংখলত কেৱল দুই খলপ"]], 0,
  "Respiration converts most assimilated energy to heat, and not every part of the prey is eaten or digestible, so transfer is inefficient. Energy is never created in a food chain, only transferred and lost.",
  "শ্বাস-প্ৰশ্বাসে বেছিভাগ আত্মসাৎ শক্তি তাপলৈ ৰূপান্তৰ কৰে, আৰু চিকাৰৰ প্ৰতিটো অংশ খোৱা বা হজমযোগ্য নহয়, সেয়ে স্থানান্তৰ অপৰ্যাপ্ত। খাদ্য শৃংখলত শক্তি সৃষ্টি নহয়, কেৱল স্থানান্তৰ আৰু ক্ষয়।");

add("biology-390",
  "The phosphorus cycle differs from the carbon and nitrogen cycles because phosphorus",
  "ফছফৰাছ চক্ৰ কাৰ্বন আৰু নাইট্ৰজেন চক্ৰতকৈ বেলেগ কাৰণ ফছফৰাছ",
  [["has no significant gaseous phase and cycles through rock, soil and water", "উল্লেখযোগ্য গেছীয় অৱস্থা নাই আৰু শিলা, মাটি আৰু পানীৰে ঘূৰে"], ["is fixed by lightning", "বিজুলিৰে স্থিৰ হয়"], ["is returned only by denitrifying bacteria", "কেৱল ডিনাইট্ৰিফাইং বেক্টেৰিয়াৰেহে ঘূৰি আহে"], ["exists only as a gas", "কেৱল গেছ হিচাপে থাকে"]], 0,
  "Phosphorus moves as phosphate in solution and as mineral deposits, with no atmospheric reservoir, which is why it often limits plant growth. Nitrogen has a large gaseous pool fixed by bacteria and lightning.",
  "ফছফৰাছ দ্ৰৱত ফছফেট আৰু খনিজ জমা হিচাপে চলে, বায়ুমণ্ডলীয় ভাণ্ডাৰ নাই, সেয়ে ই প্ৰায়ে উদ্ভিদ বৃদ্ধি সীমিত কৰে। নাইট্ৰজেনৰ বিশাল গেছীয় ভাণ্ডাৰ বেক্টেৰিয়া আৰু বিজুলিয়ে স্থিৰ কৰে।");

add("biology-391",
  "A pyramid of numbers can be inverted, as when many insects feed on one large tree, but a pyramid of energy is never inverted because",
  "সংখ্যাৰ পিৰামিড ওলোটা হ'ব পাৰে, যেনে এজোপা ডাঙৰ গছত বহু পতংগই খায়, কিন্তু শক্তিৰ পিৰামিড কেতিয়াও ওলোটা নহয় কাৰণ",
  [["energy is always lost at each transfer", "প্ৰতিটো স্থানান্তৰত শক্তি সদায় হেৰায়"], ["large trees contain no energy", "ডাঙৰ গছে শক্তি ধৰি নৰাখে"], ["insects are producers", "পতংগ উৎপাদক"], ["numbers always fall at each level", "সংখ্যা প্ৰতিটো স্তৰত সদায় কমে"]], 0,
  "The second law of thermodynamics guarantees that usable energy decreases at every step, so a lower level can never hold more energy than the one below it. Numbers can invert because one tree supports many insects.",
  "তাপগতি বিজ্ঞানৰ দ্বিতীয় সূত্ৰই নিশ্চিত কৰে যে প্ৰতিটো খোজত উপযোগী শক্তি কমে, সেয়ে তলৰ স্তৰে ওপৰৰতকৈ বেছি শক্তি ধৰি ৰাখিব নোৱাৰে। এজোপা গছে বহু পতংগ পোহপাল দিয়াৰ বাবে সংখ্যা ওলোটা হ'ব পাৰে।");

add("biology-392",
  "Deepor Beel near Guwahati is significant because it is",
  "গুৱাহাটীৰ ওচৰৰ দীপৰ বিল গুৰুত্বপূৰ্ণ কাৰণ ই",
  [["a Ramsar wetland of international importance", "আন্তৰ্জাতিক গুৰুত্বৰ ৰামছাৰ জলভূমি"], ["a national park for tigers", "বাঘৰ বাবে ৰাষ্ট্ৰীয় উদ্যান"], ["a biosphere reserve for elephants only", "কেৱল হাতীৰ বাবে জীৱমণ্ডল সংৰক্ষিত অঞ্চল"], ["a marine sanctuary", "সামুদ্ৰিক অভয়াৰণ্য"]], 0,
  "The wetland was listed under the Ramsar Convention because it supports migratory waterfowl and flood control for the city. Kaziranga and Manas are the park examples in Assam.",
  "জলভূমিখন ৰামছাৰ সন্মিলনত তালিকাভুক্ত কাৰণ ই পৰিভ্ৰমী জলচৰ চৰাইক আশ্ৰয় দিয়ে আৰু চহৰৰ বান নিয়ন্ত্ৰণ কৰে। কাজিৰঙা আৰু মানস অসমৰ উদ্যানৰ উদাহৰণ।");

/* ================= plant-botany ================= */
useLeaf("plant-botany");

add("biology-393",
  "In photosynthesis, oxygen released into the atmosphere comes from",
  "সালোক-সংশ্লেষণত বায়ুমণ্ডললৈ ওলোৱা অক্সিজেন কিৰপৰা আহে",
  [["the splitting of water at photosystem II", "ফট'ছিষ্টেম II ত পানী ভগাৰপৰা"], ["the reduction of carbon dioxide", "কাৰ্বন ডাইঅক্সাইড বিজাৰণৰপৰা"], ["the breakdown of glucose", "গ্লুক'জ ভগাৰপৰা"], ["the absorption of light by chlorophyll", "ক্ল'ৰ'ফিলৰ পোহৰ শোষণৰপৰা"]], 0,
  "Photolysis of water supplies electrons to replace those lost by chlorophyll and releases oxygen as a by-product. Carbon dioxide is reduced to sugar, so its oxygen ends up in the carbohydrate.",
  "পানীৰ আলোক-বিভাজনে ক্ল'ৰ'ফিলে হেৰুওৱা ইলেক্ট্ৰন যোগায় আৰু উপজাত হিচাপে অক্সিজেন এৰে। কাৰ্বন ডাইঅক্সাইড চেনিলৈ বিজাৰিত হয়, সেয়ে তাৰ অক্সিজেন শৰ্কৰাত থাকে।");

add("biology-394",
  "A plant wilts on a hot afternoon but recovers at night. The immediate cause of the wilting is",
  "গৰম দুপৰীয়া উদ্ভিদ মলি যায় কিন্তু ৰাতি ঠিক হয়। মলি যোৱাৰ লগে লগে কাৰণ",
  [["transpiration exceeds water absorption", "বাষ্পোৎসৰ্জনে পানী শোষণতকৈ বেছি"], ["photosynthesis stops completely", "সালোক-সংশ্লেষণ সম্পূৰ্ণ বন্ধ"], ["roots stop respiring", "শিপাই শ্বাস লোৱা বন্ধ কৰে"], ["stomata close permanently", "ৰন্ধ্ৰ স্থায়ীভাৱে বন্ধ হয়"]], 0,
  "Loss of water vapour through the stomata outruns uptake through the roots, so cells lose turgor and the leaf droops. Recovery at night shows the balance restored, not permanent damage.",
  "ৰন্ধ্ৰৰে বাষ্প হেৰুওৱা শিপাৰ গ্ৰহণতকৈ বেছি হয়, সেয়ে কোষে টাৰ্গৰ হেৰুৱাই পাত মলি যায়। ৰাতি ঠিক হোৱাই দেখুৱায় ভাৰসাম্য ঘূৰিছে, স্থায়ী ক্ষতি হোৱা নাই।");

add("biology-395",
  "Double fertilisation in angiosperms refers to",
  "আৱৃতবীজীত দ্বৈত নিষেচন মানে",
  [["one male gamete fusing with the egg and another with two polar nuclei", "এটা পুৰুষ গেমেট ডিম্বৰ সৈতে আৰু আনটো দুটা ধ্ৰুৱক কেন্দ্ৰৰ সৈতে মিলা"], ["two male gametes fusing with two eggs", "দুটা পুৰুষ গেমেটে দুটা ডিম্বৰ সৈতে মিলা"], ["two pollen tubes entering one ovule", "দুটা পৰাগ নলী এটা বীজাণ্ডত সোমোৱা"], ["fusion of two embryos", "দুটা ভ্ৰূণ মিলা"]], 0,
  "One gamete forms the zygote and the other fuses with the two polar nuclei to make the triploid endosperm, which feeds the embryo. Only one egg is fertilised, not two.",
  "এটা গেমেটে জাইগ'ট আৰু আনটোৱে দুটা ধ্ৰুৱক কেন্দ্ৰৰ সৈতে মিলি ত্ৰিগুণী এণ্ড'স্পাৰ্ম বনায়, যি ভ্ৰূণক পোহপাল দিয়ে। এটা ডিম্বহে নিষিক্ত হয়, দুটা নহয়।");

add("biology-396",
  "A gardener grafts a scion of a sweet mango onto a hardy rootstock. The fruit produced will be",
  "মালীয়ে মিঠা আমৰ কলম কঠিন মূলগছত জোড়ে। উৎপন্ন ফল হ'ব",
  [["sweet, because the scion determines fruit quality", "মিঠা, কাৰণ কলমেই ফুলৰ গুণ নিৰ্ধাৰণ কৰে"], ["sour, because the rootstock dominates", "টেঙা, কাৰণ মূলগছে আধিপত্য কৰে"], ["a mixture of both parents", "দুয়ো পিতৃ-মাতৃৰ মিশ্ৰণ"], ["sterile and seedless always", "সদায় বন্ধ্যা আৰু বীজহীন"]], 0,
  "Grafting joins two tissues but does not mix their genes, so the scion's genotype decides the fruit. The rootstock contributes vigour, disease resistance and anchorage.",
  "জোড়াই দুটা কলা সংযোগ কৰে কিন্তু জিন নিমিশ্ৰয়, সেয়ে কলমৰ জিনটাইপে ফল নিৰ্ধাৰণ কৰে। মূলগছে সবলতা, ৰোগ প্ৰতিৰোধ আৰু ধৰি ৰখাৰ শক্তি দিয়ে।");

add("biology-397",
  "Cuscuta, the dodder that twines over host plants and draws food from them, is best described as",
  "আতিথেয়ক উদ্ভিদৰ ওপৰত মেৰ খাই খাদ্য লোৱা অমৰবিলাস (কুশ্চুটা) আটাই ভালকৈ বৰ্ণনা কৰা হয় কি হিচাপে",
  [["a total stem parasite", "সম্পূৰ্ণ কাণ্ড পৰজীৱী"], ["an epiphyte", "উপৰি বৃক্ষ"], ["a saprophyte", "মৃতজীৱী"], ["an insectivorous plant", "কীটভক্ষী উদ্ভিদ"]], 0,
  "Cuscuta has no chlorophyll and takes both water and food through haustoria, so it is a total parasite. An epiphyte only uses the host for support, and a saprophyte feeds on dead matter.",
  "কুশ্চুটাত ক্ল'ৰ'ফিল নাই আৰু হ'ষ্টৰিয়াৰে পানী আৰু খাদ্য দুয়ো লয়, সেয়ে ই সম্পূৰ্ণ পৰজীৱী। উপৰি বৃক্ষে কেৱল ধৰি ৰখাৰ বাবে ব্যৱহাৰ কৰে, আৰু মৃতজীৱীয়ে মৃত পদাৰ্থ খায়।");

add("biology-398",
  "The opening and closing of stomata is regulated mainly by the movement of",
  "ৰন্ধ্ৰৰ খোলা আৰু বন্ধ মূলতঃ কিৰ চলাচলেৰে নিয়ন্ত্ৰিত হয়",
  [["potassium ions into and out of the guard cells", "ৰক্ষী কোষলৈ আৰু তাৰপৰা পটাছিয়াম আয়ন"], ["water through the xylem only", "কেৱল জাইলেমৰে পানী"], ["sugar through the phloem", "ফ্লয়েমৰে চেনি"], ["oxygen through the cuticle", "কিউটিকুলেৰে অক্সিজেন"]], 0,
  "Potassium entry lowers the water potential of the guard cells, water follows, they swell and the pore opens; exit reverses it. Xylem supply supports the change but the trigger is ion movement.",
  "পটাছিয়াম সোমালে ৰক্ষী কোষৰ পানী বিভৱ কমে, পানী অনুসৰণ কৰি সোমায়, কোষ ফুলি ৰন্ধ্ৰ মেলে; বাহিৰ হ'লে ওলোটা হয়। জাইলেমে পানী যোগায় কিন্তু ট্ৰিগাৰ আয়নৰ চলাচল।");

add("biology-399",
  "In a root nodule of a legume the bacterium Rhizobium fixes nitrogen because the plant supplies it with",
  "শিম্বজাতীয় উদ্ভিদৰ মূলৰ গাঁ‌‌ঠিত ৰাইজ'বিয়ামে নাইট্ৰজেন স্থিৰ কৰে কাৰণ উদ্ভিদে ইয়াক যোগান ধৰে",
  [["carbohydrate for energy and a low oxygen environment", "শক্তিৰ বাবে শৰ্কৰা আৰু কম অক্সিজেনৰ পৰিৱেশ"], ["nitrogen gas from the soil air", "মাটিৰ বতাহৰপৰা নাইট্ৰজেন গেছ"], ["chlorophyll for the bacteria", "বেক্টেৰিয়াৰ বাবে ক্ল'ৰ'ফিল"], ["nitrate to start the process", "আৰম্ভ কৰিবলৈ নাইট্ৰেট"]], 0,
  "Nitrogenase needs ATP and is destroyed by oxygen, so the plant supplies sugar and leghaemoglobin keeps the nodule micro-aerobic. Nitrate is the product, not the starting material.",
  "নাইট্ৰ'জিনেজলৈ ATP লাগে আৰু অক্সিজেনে তাক নষ্ট কৰে, সেয়ে উদ্ভিদে চেনি যোগায় আৰু লেগহিম'গ্লবিনে গাঁ‌‌ঠিক অল্প-বায়ুযুক্ত ৰাখে। নাইট্ৰেট উৎপাদন, আৰম্ভণিৰ পদাৰ্থ নহয়।");

/* ================= human-anatomy ================= */
useLeaf("human-anatomy");

add("biology-400",
  "In the fetal heart blood bypasses the non-functioning lungs through an opening between the right and left atria. After birth this opening seals and leaves a shallow depression on the atrial septum called the",
  "ভ্ৰূণ হৃদয়ত তেজে কাৰ্যক্ষম নোহোৱা ফুসফুস প্ৰদক্ষিণ নকৰি সোঁ আৰু বাওঁ এট্ৰিয়ামৰ মাজৰ এটা ৰন্ধ্ৰৰে যায়। জন্মৰ পিছত এই ৰন্ধ্ৰ বন্ধ হৈ এট্ৰিয়াম পৰ্দাত এটা অগভীৰ খোপ এৰি দিয়ে, যাক বোলা হয়",
  [["fossa ovalis", "ফছা অভেলিছ"], ["sinus venosus", "ছাইনাছ ভেন'ছাছ"], ["ductus arteriosus", "ডাক্টাছ আৰ্টেৰিঅ'ছাছ"], ["coronary sinus", "কৰ'নেৰী ছাইনাছ"]], 0,
  "The foramen ovale shunts oxygenated blood from the right to the left atrium in fetal life and closes after birth, leaving the fossa ovalis. The ductus arteriosus is a separate vessel joining the pulmonary artery to the aorta, and the coronary sinus drains the heart's own veins.",
  "ভ্ৰূণ অৱস্থাত ফৰামেন অভেলে অক্সিজেনযুক্ত তেজ সোঁপৰা বাওঁ এট্ৰিয়ামলৈ পঠিয়াই আৰু জন্মৰ পিছত বন্ধ হৈ ফছা অভেলিছ এৰি দিয়ে। ডাক্টাছ আৰ্টেৰিঅ'ছাছ পাৰ্থক নলী যি পালম'নেৰী ধমনীক মহাধমনীৰ লগত জোৰে, আৰু কৰ'নেৰী ছাইনাছে হৃদয়ৰ নিজৰ নলা সংগ্ৰহ কৰে।");

add("biology-401",
  "A patient cannot raise the arm at the shoulder after a fracture through the surgical neck of the humerus, though sensation over the deltoid is also reduced. The nerve most likely injured is the",
  "হিউমেৰাছৰ শল্য গ্ৰীৱাৰ ফ্ৰেকচাৰৰ পিছত ৰোগীয়ে কান্ধৰপৰা হাত দাঙিব নোৱাৰে, লগতে ডেল্টইডৰ ওপৰত অনুভূতিও কমি গৈছে। আটাই সম্ভাব্য আঘাতপ্ৰাপ্ত স্নায়ু",
  [["axillary nerve", "এক্সিলাৰী স্নায়ু"], ["median nerve", "মিডিয়ান স্নায়ু"], ["ulnar nerve", "আলনাৰ স্নায়ু"], ["long thoracic nerve", "দীঘল থোৰাছিক স্নায়ু"]], 0,
  "The axillary nerve winds round the surgical neck and supplies the deltoid and the skin over it, so a fracture there weakens abduction and dulls that patch of skin. The median and ulnar nerves serve the forearm and hand, and the long thoracic nerve supplies serratus anterior.",
  "এক্সিলাৰী স্নায়ুৱে শল্য গ্ৰীৱা বেৰি ডেল্টইড আৰু তাৰ ওপৰৰ ছাল যোগান ধৰে, সেয়ে তাত ফ্ৰেকচাৰ হ'লে হাত দাঙিব নোৱাৰি আৰু সেই ছালৰ অনুভূতি কমে। মিডিয়ান আৰু আলনাৰ স্নায়ুৱে আগবাহু আৰু হাত যোগান ধৰে, আৰু দীঘল থোৰাছিক স্নায়ুৱে ছেৰেটাছ এণ্টেৰিয়ৰ যোগান ধৰে।");

add("biology-402",
  "The first cervical vertebra differs from every other vertebra in the column because it",
  "প্ৰথম গ্ৰীবাৰ হাড় মেৰুদণ্ডৰ আন প্ৰতিটো হাড়ৰপৰা পৃথক কাৰণ ই",
  [["has no body and consists of an anterior and a posterior arch", "দেহ নাই আৰু আগ আৰু পিছৰ খিলনৰে গঠিত"],
   ["carries the largest spinous process", "আটাইতকৈ ডাঙৰ কাঁ‌ইচযুক্ত প্ৰৱৰ্ধ আছে"],
   ["fuses with the sacrum", "ছেক্ৰামৰ লগত মিলি যায়"],
   ["has twelve pairs of ribs attached", "বাৰ জোৰা পাঁজৰ সংযুক্ত"]], 0,
  "The atlas, the first cervical vertebra, is a ring of anterior and posterior arches without a body, which is what allows the head to nod. The axis below it supplies the pivot, the sacrum is a fused block lower down, and ribs attach to the thoracic vertebrae.",
  "এটলাছ, প্ৰথম গ্ৰীবাৰ হাড়, দেহ নোহোৱা আগ আৰু পিছৰ খিলনৰ আঙুঠি, যিয়ে মূৰ জোকাৰিবলৈ দিয়ে। তলৰ এক্সিছে অক্ষ যোগায়, ছেক্ৰাম তলত মিলি যোৱা খণ্ড, আৰু পাঁজৰ বক্ষদেশীয় হাড়ত সংযুক্ত হয়।");

add("biology-403",
  "Lymph collected from the entire body except the right side of the head, neck, thorax and the right arm is finally emptied into the",
  "সোঁ মূৰ, ডিঙি, বক্ষদেশ আৰু সোঁ বাহুৰ বাহিৰে গোটেই শৰীৰৰপৰা সংগৃহীত লসিকা শেষত ঢালি দিয়া হয়",
  [["junction of the left subclavian and left internal jugular veins", "বাওঁ ছাবক্লেভিয়ান আৰু বাওঁ অন্তৰ্জুগুলাৰ শিৰাৰ সংযোগস্থলত"],
   ["right atrium directly", "পোনপটীয়াকৈ সোঁ এট্ৰিয়ামত"],
   ["inferior vena cava", "অধোমহাশিৰাত"],
   ["hepatic portal vein", "যকৃত প্ৰৱেশ শিৰাত"]], 0,
  "The thoracic duct drains the whole body except the right upper quadrant and empties at the left venous angle. The right lymphatic duct handles that smaller region, and lymph never enters the portal vein.",
  "থোৰাছিক ডাক্টে সোঁ ওপৰৰ চতুৰ্থাংশৰ বাহিৰে গোটেই শৰীৰ সংগ্ৰহ কৰি বাওঁ শিৰা কোণত ঢালে। সোঁ লসিকা নলীয়ে সেই সৰু অঞ্চল চম্ভালে, আৰু লসিকা কেতিয়াও প্ৰৱেশ শিৰাত নোসোমায়।");

add("biology-404",
  "The bony orbit that houses the eyeball is formed by the union of",
  "চকুৰ গোলক ৰখা অস্থি কোটৰ গঠন হয় কাৰ সংযোগেৰে",
  [["seven bones of the skull", "কৰোঁটৰ সাতখন হাড়"],
   ["three bones only", "কেৱল তিনিখন হাড়"],
   ["the frontal bone alone", "কেৱল ললাট হাড়"],
   ["the sphenoid and maxilla only", "কেৱল স্ফেনইড আৰু মেক্সিলা"]], 0,
  "Seven bones — frontal, sphenoid, zygomatic, maxilla, palatine, lacrimal and ethmoid — contribute to the orbit, which is why a blow to the face can injure the eye from several directions. Three bones, the frontal alone or a two bone ring would leave the socket incomplete.",
  "সাতখন হাড় — ললাট, স্ফেনইড, জাইগ'মেটিক, মেক্সিলা, পালেটাইন, লেক্ৰিমেল আৰু এথমইড — কোটৰ গঢ়ে, সেয়ে মুখত ঘা লাগিলে কেইবাটাও দিশৰপৰা চকুত আঘাত হ'ব পাৰে। তিনিখন, কেৱল ললাট বা দুখন হাড়ৰ আঙুঠিয়ে কোটৰ অসম্পূৰ্ণ এৰি দিব।");

add("biology-405",
  "The only movable bone of the adult skull, articulating at the temporomandibular joint, is the",
  "প্ৰাপ্তবয়স্ক কৰোঁটৰ একমাত্ৰ লৰচৰ কৰা হাড়, যি টেম্প'ৰ'মেন্ডিবুলাৰ সংযোগত জোৰা লগে, সেয়া",
  [["mandible", "মেন্ডিবল"], ["maxilla", "মেক্সিলা"], ["zygomatic bone", "জাইগ'মেটিক হাড়"], ["vomer", "ভ'মাৰ"]], 0,
  "The mandible moves against the temporal bone at the temporomandibular joint, which is what makes chewing and speech possible. The maxilla, zygomatic bone and vomer are fixed to the rest of the skull by sutures.",
  "মেন্ডিবলে টেম্প'ৰেল হাড়ৰ বিৰুদ্ধে টেম্প'ৰ'মেন্ডিবুলাৰ সংযোগত লৰে, সেয়েই চোবোৱা আৰু কথা কোৱা সম্ভৱ কৰে। মেক্সিলা, জাইগ'মেটিক হাড় আৰু ভ'মাৰ চিলাইৰে কৰোঁটৰ বাকী অংশত স্থিৰ।");

/* ================= general-biology ================= */
useLeaf("general-biology");

add("biology-406",
  "An organism has peptidoglycan in its wall, no membrane bound nucleus and 70S ribosomes. In the five kingdom system it belongs to",
  "এটা জীৱৰ বেৰত পেপ্টিড'গ্লাইকেন আছে, আৱৰণযুক্ত নিউক্লিয়াছ নাই আৰু ৭০S ৰাইব'জম আছে। পাঁচ ৰাজ্য ব্যৱস্থাত ই কাৰ অন্তৰ্ভুক্ত",
  [["Monera", "মনেৰা"], ["Protista", "প্ৰটিষ্টা"], ["Fungi", "ফাংগাই"], ["Plantae", "প্লাণ্টাই"]], 0,
  "Peptidoglycan walls, no true nucleus and 70S ribosomes together identify a prokaryote, which is Monera. Protista and Fungi are eukaryotic, and Fungi have chitin rather than peptidoglycan, while Plantae have cellulose.",
  "পেপ্টিড'গ্লাইকেন বেৰ, প্ৰকৃত নিউক্লিয়াছৰ অভাৱ আৰু ৭০S ৰাইব'জমে একেলগে প্ৰকাৰ্যকোষী চিনাক্ত কৰে, যি মনেৰা। প্ৰটিষ্টা আৰু ফাংগাই প্ৰকৃত কোষী, আৰু ফাংগাইৰ পেপ্টিড'গ্লাইকেনৰ সলনি কাইটিন, আনহাতে প্লাণ্টাইৰ চেলুল'জ।");

add("biology-407",
  "In the name Mangifera indica, the first word denotes the",
  "Mangifera indica নামত প্ৰথম শব্দই সূচায়",
  [["genus", "গণ"], ["species", "প্ৰজাতি"], ["family", "পৰিয়াল"], ["author of the name", "নামৰ লেখক"]], 0,
  "Binomial nomenclature puts the genus first and the species second, so Mangifera is the genus and indica the species. The family (Anacardiaceae) and the author are not part of the two word name.",
  "দ্বিপদ নামকৰণত প্ৰথমে গণ আৰু দ্বিতীয়তে প্ৰজাতি থাকে, সেয়ে Mangifera গণ আৰু indica প্ৰজাতি। পৰিয়াল (Anacardiaceae) আৰু লেখক দুশব্দীয় নামৰ অংশ নহয়।");

add("biology-408",
  "A virus cannot be cultured on a nutrient medium free of living cells because it",
  "জীৱন্ত কোষ নোহোৱা পুষ্টি মাধ্যমত ভাইৰাছক পুষ্টি মাধ্যমত ৰাখিব নোৱাৰি কাৰণ ই",
  [["lacks the machinery to make protein and must use a host cell's ribosomes", "প্ৰ'টিন বনোৱা যন্ত্ৰ নাই আৰু হ'ষ্ট কোষৰ ৰাইব'জম ব্যৱহাৰ কৰিব লাগে"],
   ["has no nucleic acid", "নিউক্লিক এছিড নাই"],
   ["cannot survive outside water", "পানীৰ বাহিৰত জীয়াই থাকিব নোৱাৰে"],
   ["is killed by all nutrients", "সকলো পুষ্টিয়ে বধ কৰে"]], 0,
  "A virus carries only its genome and a protein coat, so it must borrow a host's ribosomes, enzymes and energy to replicate. It does have nucleic acid, can persist on dry surfaces, and is not killed by nutrients.",
  "ভাইৰাছে কেৱল নিজৰ জিনম আৰু প্ৰ'টিন আৱৰণ কঢ়িয়ায়, সেয়ে প্ৰতিলিপিৰ বাবে হ'ষ্টৰ ৰাইব'জম, এনজাইম আৰু শক্তি ধাৰ কৰিব লাগে। ইয়াৰ নিউক্লিক এছিড আছে, শুকান পৃষ্ঠত থাকিব পাৰে, আৰু পুষ্টিয়ে বধ নকৰে।");

add("biology-409",
  "An enzyme's reaction rate is measured with and without a competitive inhibitor. The inhibitor raises the Michaelis constant while leaving the maximum velocity unchanged because it",
  "প্ৰতিযোগিতামূলক বাধাদায়কৰ সৈতে আৰু নোহোৱাকৈ এনজাইমৰ বিক্ৰিয়াৰ হাৰ জোখা হয়। বাধাদায়কে মাইকেলিছ ধ্ৰুৱক বঢ়ায় কিন্তু সৰ্বোচ্চ বেগ অপৰিৱৰ্তিত ৰাখে কাৰণ ই",
  [["binds the active site and is overcome by more substrate", "সক্ৰিয় স্থানত বান্ধি থাকে আৰু অধিক স্তৰকে নাকচ কৰে"],
   ["binds the enzyme permanently", "এনজাইমত স্থায়ীভাৱে বান্ধি থাকে"],
   ["changes the enzyme's shape for ever", "এনজাইমৰ আকৃতি চিৰকাল সলনি কৰে"],
   ["destroys the substrate", "স্তৰক নষ্ট কৰে"]], 0,
  "A competitive inhibitor competes for the active site, so a higher substrate concentration outcompetes it and the maximum velocity is still reached. Permanent or shape altering binding describes non-competitive and irreversible inhibition, which lower the maximum velocity.",
  "প্ৰতিযোগিতামূলক বাধাদায়কে সক্ৰিয় স্থানৰ বাবে প্ৰতিযোগিতা কৰে, সেয়ে অধিক স্তৰক ঘনত্বই তাক হৰুৱায় আৰু সৰ্বোচ্চ বেগ লাভ কৰা যায়। স্থায়ী বা আকৃতি সলোৱা বান্ধনি অ-প্ৰতিযোগিতামূলক আৰু অপ্ৰত্যাবৰ্তনীয় বাধাৰ বৰ্ণনা, যিয়ে সৰ্বোচ্চ বেগ কমায়।");

/* ================= animal-zoology ================= */
useLeaf("animal-zoology");

add("biology-410",
  "A marine animal moves by hundreds of small tube feet worked by internal fluid pressure. The system responsible is the",
  "এটা সাগৰীয় জীৱে ভিতৰৰ তৰলৰ চাপে চলোৱা শতাধিক সৰু নলী-ভৰিৰে চলে। দায়ী ব্যৱস্থাটো",
  [["water vascular system", "জল-ভাস্কুলাৰ তন্ত্ৰ"], ["closed circulatory system", "বন্ধ সংবহন তন্ত্ৰ"], ["tracheal system", "শ্বাসনলী তন্ত্ৰ"], ["nephridial system", "নেফ্ৰিডিয়েল তন্ত্ৰ"]], 0,
  "Tube feet driven by the water vascular system are the signature of echinoderms such as starfish and sea urchins. Closed circulation, tracheae and nephridia belong to other phyla and do not produce tube feet.",
  "জল-ভাস্কুলাৰ তন্ত্ৰৰে চলা নলী-ভৰি ইকাইন'ডাৰ্ম যেনে তাৰামাছ আৰু সাগৰীয় সজাৰ চিন। বন্ধ সংবহন, শ্বাসনলী আৰু নেফ্ৰিডিয়া আন ফাইলামৰ আৰু নলী-ভৰি নগঢ়ে।");

add("biology-411",
  "Among reptiles, a four chambered heart with two separate ventricles is found in",
  "সৰীসৃপৰ ভিতৰত দুটা পৃথক নিলয়যুক্ত চাৰি কোঠালিৰ হৃদয় পোৱা যায়",
  [["crocodiles", "কুমিৰত"], ["lizards", "জেঠীত"], ["snakes", "সাপত"], ["tortoises", "কাছত"]], 0,
  "Crocodilians have a four chambered heart with completely separated ventricles, unlike lizards, snakes and tortoises, whose ventricle is partly divided and still allows some mixing. That is why the crocodile is singled out in comparative anatomy.",
  "কুমিৰৰ সম্পূৰ্ণ পৃথক নিলয়যুক্ত চাৰি কোঠালিৰ হৃদয়, জেঠী, সাপ আৰু কাছৰ বিপৰীতে যাৰ নিলয় আংশিক বিভক্ত আৰু কিছু মিশ্ৰণ হ'বলৈ দিয়ে। সেয়ে তুলনামূলক শৰীৰস্থানত কুমিৰক পৃথক কৰি কোৱা হয়।");

add("biology-412",
  "In a sea squirt the notochord is present only in the larval tail, which is why the group is placed among the chordates as",
  "চী-স্কুৱাৰ্টত ন'টকৰ্ড কেৱল লাৰ্ভাৰ নেজত থাকে, সেয়ে গোটটোক কৰ্ডেটৰ ভিতৰত ৰখা হয়",
  [["Urochordata", "ইউৰ'কৰ্ডাটা"], ["Cephalochordata", "চেফাল'কৰ্ডাটা"], ["Vertebrata", "ভাৰ্টিব্ৰাটা"], ["Echinodermata", "ইকাইন'ডাৰ্মাটা"]], 0,
  "Urochordates keep the three chordate features in the larva and lose most of them as adults. Cephalochordates retain the notochord throughout life, vertebrates have a vertebral column, and echinoderms are not chordates at all.",
  "ইউৰ'কৰ্ডাটাই লাৰ্ভাত তিনি কৰ্ডেট লক্ষণ ৰাখি প্ৰাপ্তবয়স্ক অৱস্থাত বেছিভাগ হেৰুৱায়। চেফাল'কৰ্ডাটাই জীৱনজুৰি ন'টকৰ্ড ৰাখে, ভাৰ্টিব্ৰাটাৰ মেৰুদণ্ড আছে, আৰু ইকাইন'ডাৰ্মাটা কৰ্ডেট নহয়।");

add("biology-413",
  "A flatworm has no body cavity between the gut and the body wall, the space being filled with parenchyma. Such an animal is described as",
  "চেপেটা কৃমিৰ অন্ত্ৰ আৰু শৰীৰ বেৰৰ মাজত শৰীৰ গহ্বৰ নাই, স্থান প্যাৰেনকাইমাৰে ভৰা। এনে জীৱক বৰ্ণনা কৰা হয়",
  [["acoelomate", "অছিল'মেট"], ["pseudocoelomate", "ছুড'ছিল'মেট"], ["coelomate", "ছিল'মেট"], ["deuterostome", "ডিউটাৰ'ষ্ট'ম"]], 0,
  "Acoelomate means no true body cavity, which fits the flatworms. Pseudocoelomates such as roundworms have a cavity not lined by mesoderm, coelomates have a true lined cavity, and deuterostome describes embryonic development rather than a cavity.",
  "অছিল'মেট মানে প্ৰকৃত শৰীৰ গহ্বৰ নাই, যি চেপেটা কৃমিৰ লগত মিলে। ছুড'ছিল'মেট যেনে গোলকৃমিৰ মেছ'ডাৰ্মেৰে আৱৰণ নোহোৱা গহ্বৰ আছে, ছিল'মেটৰ প্ৰকৃত আৱৰণযুক্ত গহ্বৰ, আৰু ডিউটাৰ'ষ্ট'মে গহ্বৰৰ সলনি ভ্ৰূণ বিকাশ বৰ্ণনা কৰে।");

/* ================= cell-biology ================= */
useLeaf("cell-biology");

add("biology-414",
  "A cell is placed in a solution and neither swells nor shrinks, so no net movement of water occurs across its membrane. The solution is",
  "এটা কোষ দ্ৰৱত ৰখা হ'ল আৰু নুফুলে নুসংকুচিত হয়, সেয়ে পৰ্দাৰে পানীৰ প্ৰকৃত চলাচল নহয়। দ্ৰৱটো",
  [["isotonic to the cytoplasm", "চাইট'প্লাজমৰ সৈতে সমচাপীয়"], ["hypotonic to the cytoplasm", "চাইট'প্লাজমতকৈ নিম্নচাপীয়"], ["hypertonic to the cytoplasm", "চাইট'প্লাজমতকৈ উচ্চচাপীয়"], ["free of all solutes", "সকলো দ্ৰৱকহীন"]], 0,
  "When the outside and inside have the same solute concentration there is no net water movement, which is the definition of isotonic. A hypotonic solution makes the cell swell and a hypertonic one makes it shrink, while a solution free of solutes would be strongly hypotonic.",
  "বাহিৰ আৰু ভিতৰৰ দ্ৰৱক ঘনত্ব একে হ'লে পানীৰ প্ৰকৃত চলাচল নাথাকে, যি সমচাপীয়ৰ সংজ্ঞা। নিম্নচাপীয় দ্ৰৱে কোষ ফুলায় আৰু উচ্চচাপীয়ে সংকুচিত কৰে, আনহাতে দ্ৰৱকহীন দ্ৰৱ প্ৰবল নিম্নচাপীয় হ'ব।");

add("biology-415",
  "A mature mammalian red blood cell cannot repair itself or divide because it has lost its",
  "পৰিপক্ব স্তন্যপায়ী লোহিত ৰক্তকণিকা নিজকে মেৰামতি কৰিব বা বিভাজিত হ'ব নোৱাৰে কাৰণ ই হেৰুৱাইছে",
  [["nucleus and most organelles", "নিউক্লিয়াছ আৰু বেছিভাগ অংগাণু"],
   ["plasma membrane", "প্লাজমা পৰ্দা"],
   ["haemoglobin", "হিম'গ্লবিন"],
   ["cell shape", "কোষৰ আকৃতি"]], 0,
  "Losing the nucleus and ribosomes means no new protein can be made, so repair and division are impossible, which is why the cell has a fixed life span. The membrane, haemoglobin and biconcave shape are all retained and are what allow it to carry oxygen.",
  "নিউক্লিয়াছ আৰু ৰাইব'জম হেৰুওৱাৰ অৰ্থ নতুন প্ৰ'টিন বনিব নোৱাৰি, সেয়ে মেৰামতি আৰু বিভাজন অসম্ভৱ, কাৰণেই কোষৰ জীৱনকাল নিৰ্দিষ্ট। পৰ্দা, হিম'গ্লবিন আৰু দ্বিঅৱতল আকৃতি ৰক্ষা পায় আৰু সেয়াই অক্সিজেন কঢ়িয়াবলৈ দিয়ে।");

add("biology-416",
  "The cell wall of a fungus is chemically different from that of a plant because it is made mainly of",
  "ছত্ৰাকৰ কোষ বেৰ উদ্ভিদৰপৰা ৰাসায়নিকভাৱে পৃথক কাৰণ ই মূলতঃ কাৰেৰে গঠিত",
  [["chitin", "কাইটিন"], ["cellulose", "চেলুল'জ"], ["peptidoglycan", "পেপ্টিড'গ্লাইকেন"], ["lignin", "লিগনিন"]], 0,
  "Fungal walls are built of chitin, the same material as an insect's exoskeleton, which is one reason fungi are placed in their own kingdom. Cellulose is the plant wall, peptidoglycan the bacterial wall, and lignin stiffens secondary plant walls rather than forming the wall itself.",
  "ছত্ৰাকৰ বেৰ কাইটিনেৰে গঢ়া, পতংগৰ বাহ্যিক কংকালৰ সৈতে একেই পদাৰ্থ, সেয়ে ছত্ৰাকক নিজা ৰাজ্যত ৰখা হয়। চেলুল'জ উদ্ভিদ বেৰ, পেপ্টিড'গ্লাইকেন বেক্টেৰিয়া বেৰ, আৰু লিগনিনে দ্বিতীয়কৈ উদ্ভিদ বেৰ কঠিন কৰে, বেৰ গঢ়ি নুতোলে।");

/* ================= human-physiology ================= */
useLeaf("human-physiology");

add("biology-417",
  "Creatinine clearance is measured to estimate the glomerular filtration rate because creatinine is",
  "গ্ল'মেৰুলাৰ ছাননি হাৰ অনুমান কৰিবলৈ ক্ৰিয়েটিনিন ক্লিয়াৰেন্স জোখা হয় কাৰণ ক্ৰিয়েটিনিন",
  [["freely filtered and barely reabsorbed or secreted", "মুকলিভাৱে ছানিত হয় আৰু সামান্যহে পুনঃশোষিত বা নিঃসৃত হয়"],
   ["actively secreted by the tubules only", "কেৱল নলীয়ে সক্ৰিয়ভাৱে নিঃসৰণ কৰে"],
   ["completely reabsorbed after filtration", "ছাননিৰ পিছত সম্পূৰ্ণ পুনঃশোষিত হয়"],
   ["produced only by the liver", "কেৱল যকৃতেহে উৎপন্ন কৰে"]], 0,
  "A marker is useful for filtration only if it passes freely into the filtrate and is neither reabsorbed nor secreted, so its clearance equals the filtration rate. Creatinine roughly meets this, whereas glucose is fully reabsorbed and many drugs are actively secreted.",
  "চিহ্নক ছাননিৰ বাবে উপযোগী হয় কেৱল তেতিয়া যেতিয়া ই মুকলিভাৱে ছানিত হৈ পুনঃশোষিত বা নিঃসৃত নহয়, তেতিয়া তাৰ ক্লিয়াৰেন্স ছাননি হাৰৰ সমান। ক্ৰিয়েটিনিনে মোটামুটি ইয়াক পূৰণ কৰে, আনহাতে গ্লুক'জ সম্পূৰ্ণ পুনঃশোষিত আৰু বহু ঔষধ সক্ৰিয়ভাৱে নিঃসৃত।");

add("biology-418",
  "During exercise the oxygen dissociation curve of haemoglobin shifts to the right, so oxygen is released more readily to the tissues. The shift is driven mainly by a rise in",
  "ব্যায়ামৰ সময়ত হিম'গ্লবিনৰ অক্সিজেন বিয়োজন বক্ৰ ডাঙিলৈ সৰে, সেয়ে কলালৈ অক্সিজেন সহজে ওলায়। সৰণৰ মূল কাৰণ",
  [["carbon dioxide and hydrogen ion concentration", "কাৰ্বন ডাইঅক্সাইড আৰু হাইড্ৰ'জেন আয়নৰ ঘনত্ব বৃদ্ধি"],
   ["plasma calcium", "প্লাজমা কেলচিয়াম"],
   ["blood glucose alone", "কেৱল তেজৰ গ্লুক'জ"],
   ["body temperature falling", "শৰীৰৰ উষ্ণতা কমা"]], 0,
  "More carbon dioxide lowers pH inside the red cell, which reduces haemoglobin's affinity and pushes oxygen off, an effect called the Bohr shift. Calcium, glucose alone and a fall in temperature would not produce a rightward shift; a rise in temperature would, but the main driver is carbon dioxide and hydrogen ions.",
  "অধিক কাৰ্বন ডাইঅক্সাইডে লোহিত কোষৰ ভিতৰত pH কমায়, যিয়ে হিম'গ্লবিনৰ আকৰ্ষণ কমাই অক্সিজেন এৰি দিয়ে, যাক ব'ৰ সৰণ বোলে। কেলচিয়াম, কেৱল গ্লুক'জ আৰু উষ্ণতা কমিলে ডাঙিলৈ সৰণ নহয়; উষ্ণতা বঢ়িলে হয়, কিন্তু মূল চালক কাৰ্বন ডাইঅক্সাইড আৰু হাইড্ৰ'জেন আয়ন।");

add("biology-419",
  "After a carbohydrate meal blood glucose falls towards normal because insulin acts on muscle and fat to",
  "শৰ্কৰাযুক্ত আহাৰৰ পিছত তেজৰ গ্লুক'জ স্বাভাৱিকলৈ নামে কাৰণ ইনছুলিনে পেশী আৰু চৰ্বিত কাম কৰি",
  [["increase glucose uptake and promote glycogen formation", "গ্লুক'জ গ্ৰহণ বঢ়ায় আৰু গ্লাইক'জেন গঠন উৎসাহিত কৰে"],
   ["increase glucose release from the liver", "যকৃতৰপৰা গ্লুক'জ মুকলি বঢ়ায়"],
   ["break down glycogen to glucose", "গ্লাইক'জেন ভাঙি গ্লুক'জ কৰে"],
   ["reduce the number of glucose transporters", "গ্লুক'জ পৰিবাহকৰ সংখ্যা কমায়"]], 0,
  "Insulin moves glucose transporters to the cell surface and stimulates glycogen synthesis, so blood glucose falls. Releasing glucose from the liver and breaking down glycogen are glucagon's actions, and reducing transporters would raise blood glucose rather than lower it.",
  "ইনছুলিনে গ্লুক'জ পৰিবাহক কোষ পৃষ্ঠলৈ নিয়ে আৰু গ্লাইক'জেন সংশ্লেষণ উৎসাহিত কৰে, সেয়ে তেজৰ গ্লুক'জ নামে। যকৃতৰপৰা গ্লুক'জ মুকলি আৰু গ্লাইক'জেন ভাঙা গ্লুকাগনৰ কাম, আৰু পৰিবাহক কমালে গ্লুক'জ বাঢ়িলহেঁতেন।");

/* ================= genetics-evolution ================= */
useLeaf("genetics-evolution");

add("biology-420",
  "A red flowered plant crossed with a white flowered one gives offspring that are all pink, and a cross of two pink plants gives red, pink and white in the ratio 1:2:1. This pattern indicates",
  "এখন ৰঙা ফুলৰ উদ্ভিদক বগা ফুলৰ লগত সংকৰ কৰিলে সকলো গোলাপী সন্তান হয়, আৰু দুখন গোলাপী উদ্ভিদৰ সংকৰে ১:২:১ অনুপাতত ৰঙা, গোলাপী আৰু বগা দিয়ে। এই আৰ্হিয়ে সূচায়",
  [["incomplete dominance", "অসম্পূৰ্ণ প্ৰভুত্ব"], ["complete dominance", "সম্পূৰ্ণ প্ৰভুত্ব"], ["codominance with two distinct phenotypes", "দুটা পৃথক প্ৰকাশ্যৰ সৈতে সহপ্ৰভুত্ব"], ["sex linkage", "লিংগ সংলগ্নতা"]], 0,
  "The heterozygote shows an intermediate colour and the 1:2:1 ratio reflects genotypes rather than phenotypes, which is incomplete dominance. Complete dominance would give a 3:1 ratio, and codominance would show both parental colours side by side rather than a blend.",
  "বিষমযুগ্মই মধ্যৱৰ্তী ৰং দেখুৱায় আৰু ১:২:১ অনুপাতে প্ৰকাশ্যৰ সলনি জিনপ্ৰকাৰ প্ৰতিফলিত কৰে, যি অসম্পূৰ্ণ প্ৰভুত্ব। সম্পূৰ্ণ প্ৰভুত্বে ৩:১ দিলেহেঁতেন, আৰু সহপ্ৰভুত্বে মিহলি নহয় দুয়ো পিতৃ-মাতৃৰ ৰং কাষে কাষে দেখুৱালেহেঁতেন।");

add("biology-421",
  "A girl of short stature with a webbed neck is found to have forty five chromosomes and a single X. The condition is",
  "চুটি আকৃতি আৰু জালযুক্ত ডিঙিৰ এগৰাকী ছোৱালীত পঞ্চল্লিশখন ক্ৰ'ম'জ'ম আৰু এটা X পোৱা গ'ল। অৱস্থাটো",
  [["Turner syndrome", "টাৰ্নাৰ চিনড্ৰ'ম"], ["Klinefelter syndrome", "ক্লাইনফেল্টাৰ চিনড্ৰ'ম"], ["Down syndrome", "ডাউন চিনড্ৰ'ম"], ["Edward syndrome", "এডৱাৰ্ড চিনড্ৰ'ম"]], 0,
  "A single X with no second sex chromosome in a female phenotype is Turner syndrome. Klinefelter is XXY in a male, Down is trisomy 21 and Edward is trisomy 18, so none of them fits a 45,X karyotype.",
  "নাৰী প্ৰকাশ্যত দ্বিতীয় লিংগ ক্ৰ'ম'জ'ম নোহোৱা অকলশৰীয়া X হ'ল টাৰ্নাৰ চিনড্ৰ'ম। ক্লাইনফেল্টাৰ পুৰুষত XXY, ডাউন ট্ৰাইছ'মি ২১ আৰু এডৱাৰ্ড ট্ৰাইছ'মি ১৮, সেয়ে ৪৫,X কেৰিঅ'টাইপত কোনোটোৱেই নিমিলে।");

add("biology-422",
  "The forelimb of a whale, the wing of a bat and the arm of a human have the same basic bone plan though they perform different functions. Such structures are called",
  "তিমিৰ আগঠেং, বাদুলিৰ ডেউকা আৰু মানুহৰ বাহুৰ মূল হাড় আৰ্হি একেই যদিও কাৰ্য পৃথক। এনে গঠনক বোলা হয়",
  [["homologous organs", "সমসংস্থ অংগ"], ["analogous organs", "সদৃশ কাৰ্যৰ অংগ"], ["vestigial organs", "অৱশিষ্ট অংগ"], ["atavistic organs", "পূৰ্বপুৰুষীয় অংগ"]], 0,
  "Homologous organs share a common structural plan inherited from a common ancestor even when the function differs, which is evidence for evolution. Analogous organs look alike but differ in origin, vestigial organs are reduced remnants, and atavism is the reappearance of a lost trait.",
  "সমসংস্থ অংগই সাধাৰণ পূৰ্বপুৰুষৰপৰা উত্তৰাধিকাৰী সূত্ৰে পোৱা সাধাৰণ গঠন আৰ্হি ভাগ কৰে যদিও কাৰ্য পৃথক, যি বিৱৰ্তনৰ প্ৰমাণ। সদৃশ অংগ দেখিবলৈ একে কিন্তু উৎপত্তিত পৃথক, অৱশিষ্ট অংগ ক্ষয়প্ৰাপ্ত অৱশেষ, আৰু পূৰ্বপুৰুষীয়তা হৈছে হেৰুওৱা গুণৰ পুনৰাবিৰ্ভাৱ।");

/* ================= microbiology-biotechnology ================= */
useLeaf("microbiology-biotechnology");

add("biology-423",
  "A Gram-positive organism keeps the purple colour after decolourisation because its",
  "গ্ৰাম-ধনাত্মক জীৱই ৰং নষ্ট কৰাৰ পিছতো বেঙুনীয়া ৰং ৰাখে কাৰণ ইয়াৰ",
  [["thick peptidoglycan layer retains the crystal violet iodine complex", "ডাঠ পেপ্টিড'গ্লাইকেন স্তৰে ক্ৰিষ্টেল ভায়'লেট আয়'ডিন জটিল ধৰি ৰাখে"],
   ["outer membrane excludes all dyes", "বাহ্যিক পৰ্দাই সকলো ৰং বাধা দিয়ে"],
   ["cell wall is made of chitin", "কোষ বেৰ কাইটিনেৰে গঠিত"],
   ["cytoplasm is acidic", "চাইট'প্লাজম অম্লীয়"]], 0,
  "The thick peptidoglycan mesh traps the crystal violet iodine complex when alcohol is applied, so the cell stays purple. A Gram-negative wall is thin and has an outer membrane that the alcohol dissolves, so the counterstain takes over and the cell appears pink.",
  "এলকহল প্ৰয়োগ কৰিলে ডাঠ পেপ্টিড'গ্লাইকেন জালীয়ে ক্ৰিষ্টেল ভায়'লেট আয়'ডিন জটিল আটকায়, সেয়ে কোষ বেঙুনীয়া থাকে। গ্ৰাম-ঋণাত্মক বেৰ পাতল আৰু বাহ্যিক পৰ্দা আছে যি এলকহলে গলায়, সেয়ে প্ৰতিপ্ৰতীক ৰঙে ঠাই লৈ কোষ গোলাপী দেখায়।");

add("biology-424",
  "The polymerase chain reaction amplifies a specific DNA segment in a thermal cycler. The essential components apart from the template are",
  "পলিমাৰেজ শৃংখল প্ৰতিক্ৰিয়াই তাপীয় চক্ৰযন্ত্ৰত নিৰ্দিষ্ট DNA খণ্ড বঢ়ায়। টেম্পলেটৰ বাহিৰে অত্যাৱশ্যকীয় উপাদান",
  [["two primers, a thermostable DNA polymerase and deoxynucleotides", "দুটা প্ৰাইমাৰ, তাপ-স্থিৰ DNA পলিমাৰেজ আৰু ডিঅক্সিনিউক্লিঅ'টাইড"],
   ["restriction enzyme and ligase", "নিয়ন্ত্ৰণ এনজাইম আৰু লাইগেজ"],
   ["RNA polymerase and ribosomes", "RNA পলিমাৰেজ আৰু ৰাইব'জম"],
   ["antibiotics and serum", "এণ্টিবায়'টিক আৰু ছিৰাম"]], 0,
  "Primers define the segment, a thermostable polymerase such as Taq extends it, and deoxynucleotides supply the building blocks, with buffer and magnesium ions. Restriction enzymes and ligase belong to cloning, and RNA polymerase and ribosomes belong to transcription and translation.",
  "প্ৰাইমাৰে খণ্ড নিৰ্ধাৰণ কৰে, টাকৰ দৰে তাপ-স্থিৰ পলিমাৰেজে বঢ়ায়, আৰু ডিঅক্সিনিউক্লিঅ'টাইডে নিৰ্মাণ-খণ্ড যোগায়, লগতে বাফাৰ আৰু মেগনেছিয়াম আয়ন। নিয়ন্ত্ৰণ এনজাইম আৰু লাইগেজ ক্ল'নিঙৰ, আৰু RNA পলিমাৰেজ তথা ৰাইব'জম অনুলিপন আৰু অনুবাদৰ।");

add("biology-425",
  "The biochemical oxygen demand of a water sample is used as an index of",
  "পানীৰ নমুনাৰ জৈৱৰাসায়নিক অক্সিজেন চাহিদা কাৰ সূচক হিচাপে ব্যৱহাৰ কৰা হয়",
  [["organic pollution load", "জৈৱিক প্ৰদূষণৰ ভাৰ"], ["dissolved mineral content", "দ্ৰৱীভূত খনিজৰ পৰিমাণ"], ["total hardness", "মুঠ কাঠিন্য"], ["chloride concentration", "ক্ল'ৰাইড ঘনত্ব"]], 0,
  "Oxygen demand measures how much oxygen microbes consume while breaking down organic matter, so a high value means heavy organic pollution. Minerals, hardness and chloride are separate chemical measures and do not express microbial oxygen use.",
  "অক্সিজেন চাহিদাই জৈৱিক পদাৰ্থ ভাঙোতে অণুজীৱে কিমান অক্সিজেন খৰচ কৰে জোখে, সেয়ে উচ্চ মানে গধুৰ জৈৱিক প্ৰদূষণ। খনিজ, কাঠিন্য আৰু ক্ল'ৰাইড পৃথক ৰাসায়নিক জোখ আৰু অণুজীৱৰ অক্সিজেন ব্যৱহাৰ প্ৰকাশ নকৰে।");

/* ================= diseases-health ================= */
useLeaf("diseases-health");

add("biology-426",
  "A person is bitten by a stray dog and the wound is washed at once. The reason immediate washing with soap and running water matters is that the rabies virus",
  "এজনক পথৰ কুকুৰে কামোৰে আৰু ঘা তৎক্ষণাত ধুই দিয়া হয়। চাবোন আৰু বৈ থকা পানীৰে লগে লগে ধোৱাৰ কাৰণ — ৰেবিজ ভাইৰাছে",
  [["is inactivated on the skin surface before it can reach nerve endings", "স্নায়ুৰ আগত উপনীত হোৱাৰ আগতে ছালৰ পৃষ্ঠত নিষ্ক্ৰিয় হয়"],
   ["spreads only through drinking water", "কেৱল খোৱা পানীৰে বিয়পে"],
   ["is carried by mosquitoes", "মহে কঢ়িয়ায়"],
   ["multiplies in the stomach", "পেটত বংশবৃদ্ধি কৰে"]], 0,
  "Washing removes virus laden saliva and reduces the dose before it enters nerve endings, which is why wound care is the first step and vaccination follows. Rabies is not waterborne, not mosquito borne and does not multiply in the stomach.",
  "ধোৱাৰ ফলত ভাইৰাছযুক্ত লালটিয়াল আঁতৰি স্নায়ুৰ আগত সোমোৱাৰ আগতে মাত্ৰা কমে, সেয়ে ঘা চোৱা-চিতা প্ৰথম পদক্ষেপ আৰু তাৰ পিছত টীকা। ৰেবিজ পানী বা ম'হৰ দ্বাৰা নিয়বপে আৰু পেটত বংশবৃদ্ধি নকৰে।");

add("biology-427",
  "Dengue spreads most readily in a town where water collects in discarded tyres and plastic containers, because the vector mosquito",
  "পেলাই দিয়া টায়াৰ আৰু প্লাষ্টিক পাত্ৰত পানী জমা হোৱা এখন চহৰত ডেঙ্গু সহজে বিয়পে, কাৰণ বাহক ম'হে",
  [["breeds in clean standing water and bites during the day", "পৰিষ্কাৰ থিয় পানীত প্ৰজনন কৰি দিনত কামোৰে"],
   ["breeds only in polluted drains and bites at night", "কেৱল প্ৰদূষিত নৰ্দমাত প্ৰজনন কৰি ৰাতি কামোৰে"],
   ["lives only in forests", "কেৱল অৰণ্যত থাকে"],
   ["feeds only on cattle", "কেৱল গৰুৰ তেজ খায়"]], 0,
  "Aedes aegypti lays its eggs in small collections of clean water such as tyres and containers and is a day biter, which is why container hygiene and daytime protection matter. Polluted drains, forests and cattle feeding describe other mosquitoes.",
  "এডিছ ইজিপ্টাই টায়াৰ আৰু পাত্ৰৰ দৰে সৰু পৰিষ্কাৰ পানীত কণী পাৰে আৰু দিনত কামোৰে, সেয়ে পাত্ৰ পৰিষ্কাৰতা আৰু দিনৰ সুৰক্ষা গুৰুত্বপূৰ্ণ। প্ৰদূষিত নৰ্দমা, অৰণ্য আৰু গৰুৰ তেজ আন ম'হৰ বৰ্ণনা।");

/* ================= nutrition-vitamins ================= */
useLeaf("nutrition-vitamins");

add("biology-428",
  "A patient with pernicious anaemia lacks a factor secreted by the stomach lining, so vitamin B12 cannot be absorbed even when the diet is adequate. The missing factor is",
  "ঘাতক ৰক্তহীনতাৰ ৰোগীৰ পেটৰ আৱৰণে নিঃসৰণ কৰা এটা কাৰকৰ অভাৱ, সেয়ে আহাৰ পৰ্যাপ্ত হ'লেও ভিটামিন বি১২ শোষিত নহয়। অনুপস্থিত কাৰকটো",
  [["intrinsic factor", "অন্তৰ্নিহিত কাৰক"], ["gastric acid alone", "কেৱল পেটৰ অম্ল"], ["bile salts", "পিত্ত লৱণ"], ["trypsin", "ট্ৰিপ্ছিন"]], 0,
  "Parietal cells secrete intrinsic factor, which binds B12 and carries it to receptors in the ileum, so its loss blocks absorption and produces pernicious anaemia. Acid helps release B12 from food but is not the carrier, and bile salts and trypsin act on fats and proteins.",
  "পেৰাইটেল কোষে অন্তৰ্নিহিত কাৰক নিঃসৰণ কৰে, যি বি১২ বান্ধি ইলিয়ামৰ গ্ৰাহকলৈ লৈ যায়, সেয়ে ইয়াৰ অভাৱত শোষণ বন্ধ হৈ ঘাতক ৰক্তহীনতা হয়। অম্লই আহাৰৰপৰা বি১২ মুকলি কৰাত সহায় কৰে কিন্তু বাহক নহয়, আৰু পিত্ত লৱণ তথা ট্ৰিপ্ছিনে চৰ্বি আৰু প্ৰ'টিনত কাম কৰে।");

/* ================= ecology-environment ================= */
useLeaf("ecology-environment");

add("biology-429",
  "In a pond the phytoplankton are tiny and numerous while the zooplankton that feed on them are larger, yet the biomass of phytoplankton measured at one moment is smaller. The pyramid of biomass here is",
  "পুখুৰীত ফাইট'প্লাংকটন সৰু আৰু সংখ্যাত অধিক যদিও সিহঁতক খোৱা জু'প্লাংকটন ডাঙৰ, তথাপি এটা মুহূৰ্তত জোখা ফাইট'প্লাংকটনৰ জৈৱভাৰ কম। ইয়াত জৈৱভাৰৰ পিৰামিড",
  [["inverted, because the producers turn over very fast", "ওলোটা, কাৰণ উৎপাদকবোৰ অতি দ্ৰুতভাৱে সলনি হয়"],
   ["always upright in water", "পানীত সদায় ঊৰ্ধ্বমুখী"],
   ["the same as the pyramid of energy", "শক্তিৰ পিৰামিডৰ সমান"],
   ["meaningless in aquatic systems", "জলীয় তন্ত্ৰত অৰ্থহীন"]], 0,
  "A small standing crop of rapidly dividing phytoplankton can support a larger zooplankton biomass, so the biomass pyramid inverts while the energy pyramid stays upright. Saying it is always upright, equal to the energy pyramid, or meaningless ignores how turnover works.",
  "দ্ৰুতভাৱে বিভাজিত হোৱা সৰু থিয় ফাইট'প্লাংকটন শস্যই ডাঙৰ জু'প্লাংকটন জৈৱভাৰ ধৰি ৰাখিব পাৰে, সেয়ে জৈৱভাৰৰ পিৰামিড ওলোটা হয় যদিও শক্তিৰ পিৰামিড ঊৰ্ধ্বমুখী থাকে। সদায় ঊৰ্ধ্বমুখী, শক্তিৰ পিৰামিডৰ সমান বা অৰ্থহীন বুলি কোৱাটো সলনি কিদৰে কাম কৰে তাক উপেক্ষা কৰে।");

module.exports = { questions: Q };
