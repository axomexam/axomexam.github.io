#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics.js
 *
 * Six ancient/medieval Assam topic pages had 413-1297 words of extra content
 * under their questions - just short of the 1300-word floor the rest of the
 * site follows. This adds three topic-specific sections (English + Assamese)
 * to each page, inserted before the FAQ heading so the FAQ stays last.
 *
 * Content is written per topic from standard exam sources (Kalika Purana,
 * Yogini Tantra, Allahabad pillar inscription, Nidhanpur grant, Ahom buranjis,
 * Kachari and Chutiya traditions) - no template paragraphs are reused.
 *
 * Idempotent: a page carrying <!-- axo-deep:1 --> is skipped.
 *
 * Usage: node tools/seo-deepen-topics.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (lang, t) => `<p lang="${lang}">${t}</p>`;
const UL = (lang, items) => `<ul>\n${items.map((i) => `  <li lang="${lang}">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/assam-history/ancient-assam-sec/origin-names-assam": {
    en: [
      ["Sources that mention each name", [
        "The names do not come from one text. Pragjyotisha is a Puranic and epic name, Kamarupa is an inscriptional and political name, and Assam is an early-modern name. Each has its own evidence trail, and matching the name to the right source is the single most common question on this topic.",
        "Pragjyotisha appears in the Mahabharata, the Harivamsa and the Puranas, where it is the kingdom of Bhagadatta and his line. No inscription of the Varman kings uses Pragjyotisha as the name of their state; the name survives in literature and in place-names such as Pragjyotishpur.",
        "Kamarupa first appears in the Allahabad pillar inscription of Samudragupta in the fourth century CE, in the list of frontier kingdoms whose rulers paid homage. From the fifth century the Varman kings call their kingdom Kamarupa in their own copper-plate grants, and the Nidhanpur grant of Bhaskaravarman repeats the Puranic genealogy to connect Kamarupa with the older Pragjyotisha.",
        "The Chinese pilgrim Xuanzang, writing in the seventh century, describes Kamarupa as a country with a distinct script and a large population. Later Mughal and Persian records use Kamrup and Asam side by side, and the Tai-Ahom chronicles call the country Mung Dun Shun Kham.",
      ]],
      ["How one place carried three names", [
        "The three names are not simple synonyms. Pragjyotisha is a sacred geography: the land of the eastern astrology and of the Kamakhya goddess. Kamarupa is a dynastic and administrative unit, the area actually governed from Pragjyotishpur and later from other capitals. Assam is a name that grew outward from the Ahom state until it covered the whole Brahmaputra valley.",
        "Boundaries moved with politics. The Kalika Purana places the eastern limit at the Dikkaravasini or Dikshu river and the Yogini Tantra places the western limit at the Karatoya. Later Kamata and Koch politics pushed the western frontier back and forth, which is why map questions on this topic usually ask for the source of the boundary, not just the river.",
        "For an objective test, answer with the period as well as the name: Pragjyotisha belongs to the legendary and epic layer, Kamarupa to the historical dynasties from the Varmans to the Palas, and Assam to the Ahom and modern period.",
      ]],
      ["Map work and the confusions examiners exploit", [
        "Fix four identifications: Pragjyotishpur with Guwahati and the Nilachal hill, Sonitpur with Tezpur, Kundil with the Sadiya area, and Lohitya or Luit with the Brahmaputra.",
        "First trap: Pragjyotisha is often called the old name of Kamarupa, but the Varman inscriptions themselves use Kamarupa. Second trap: the usual exam answer for the origin of Assam is Asama, meaning unequalled or peerless, with the derivation from Ahom given as an alternative, not as the only explanation. Third trap: Kamata is a later western kingdom of the Kamrup-Kamata line, not another name for ancient Kamarupa.",
      ]],
    ],
    as: [
      ["প্ৰতিটো নাম ক’ত পোৱা যায়", [
        "এই নামবোৰ এটা গ্ৰন্থৰপৰা অহা নহয়। প্ৰাগজ্যোতিষ পৌৰাণিক আৰু মহাকাব্যিক নাম, কামৰূপ শিলালিপি আৰু ৰাজনৈতিক নাম, আৰু অসম আধুনিক কালৰ নাম। প্ৰতিটোৰ নিজা প্ৰমাণ-শৃংখল আছে, আৰু নামটো শুদ্ধ উৎসৰ সৈতে মিলোৱাটোৱেই এই বিষয়ৰ আটাইতকৈ সঘনাই সোধা প্ৰশ্ন।",
        "প্ৰাগজ্যোতিষ মহাভাৰত, হৰিবংশ আৰু পুৰাণত পোৱা যায়, য’ত ই ভগদত্ত আৰু তেওঁৰ বংশৰ ৰাজ্য। বৰ্মণ ৰজাসকলৰ কোনো শিলালিপিয়ে নিজৰ ৰাজ্যৰ নাম হিচাপে প্ৰাগজ্যোতিষ ব্যৱহাৰ কৰা নাই; নামটো সাহিত্য আৰু প্ৰাগজ্যোতিষপুৰৰ দৰে স্থাননামত জীয়াই আছে।",
        "কামৰূপ প্ৰথমে চতুৰ্থ শতিকাৰ সমুদ্ৰগুপ্তৰ এলাহাবাদ স্তম্ভ শিলালিপিত সীমান্তৱৰ্তী ৰাজ্যসমূহৰ তালিকাত পোৱা যায়। পঞ্চম শতিকাৰপৰা বৰ্মণ ৰজাসকলে নিজৰ তাম্ৰশাসনত ৰাজ্যক কামৰূপ বোলে, আৰু ভাস্কৰবৰ্মণৰ নিধনপুৰ তাম্ৰশাসনে পুৰাণৰ বংশাৱলী পুনৰাবৃত্তি কৰি কামৰূপক পুৰণি প্ৰাগজ্যোতিষৰ সৈতে জড়ায়।",
        "সপ্তম শতিকাৰ চীনা পৰিৱ্ৰাজক হিউয়েন চাঙে কামৰূপক নিজা লিপি আৰু বৃহৎ জনসংখ্যা থকা এখন দেশ বুলি বৰ্ণনা কৰিছে। পিছৰ মোগল আৰু পাৰ্চী নথিত কামৰূপ আৰু আসাম দুয়োটাই একেলগে ব্যৱহৃত হয়, আৰু তাই-আহোম বুৰঞ্জীয়ে দেশখনক মুং ডুন চুন খাম বোলে।",
      ]],
      ["একে ঠাইৰ তিনিটা নাম", [
        "তিনিটা নাম সাধাৰণ সমাৰ্থক নহয়। প্ৰাগজ্যোতিষ এক পবিত্ৰ ভূগোল: পূবৰ জ্যোতিষ আৰু কামাখ্যা দেৱীৰ দেশ। কামৰূপ ৰাজবংশীয় আৰু প্ৰশাসনিক একক, প্ৰকৃততে প্ৰাগজ্যোতিষপুৰৰপৰা শাসিত অঞ্চল। অসম নামটো আহোম ৰাজ্যৰপৰা ওলাই গৈ গোটেই ব্ৰহ্মপুত্ৰ উপত্যাকাক সামৰি লয়।",
        "সীমা ৰাজনীতিৰ সৈতে সলনি হৈছিল। কালিকা পুৰাণে পূব সীমা দিক্কৰৱাসিনী বা দিক্ষু নদীত ৰাখে, যোগিনী তন্ত্ৰই পশ্চিম সীমা কৰতোয়াত ৰাখে। পিছৰ কমতা আৰু কোচ ৰাজনীতিয়ে পশ্চিম সীমান্ত আগুৱাই-পিছুৱাই কৰিছিল, সেয়ে মানচিত্ৰৰ প্ৰশ্নত সাধাৰণতে নদীৰ সৈতে উৎসও সোধা হয়।",
        "বস্তুনিষ্ঠ পৰীক্ষাত নামৰ সৈতে কালও ক’ব লাগে: প্ৰাগজ্যোতিষ কিংবদন্তি আৰু মহাকাব্যৰ স্তৰ, কামৰূপ বৰ্মণৰপৰা পাললৈ ঐতিহাসিক ৰাজবংশৰ স্তৰ, আৰু অসম আহোম আৰু আধুনিক কালৰ স্তৰ।",
      ]],
      ["মানচিত্ৰ আৰু পৰীক্ষকে সোধা বিভ্ৰান্তি", [
        "চাৰিটা চিনাক্তকৰণ মনত ৰাখক: প্ৰাগজ্যোতিষপুৰ — গুৱাহাটী আৰু নীলাচল পাহাৰ, শোণিতপুৰ — তেজপুৰ, কুণ্ডিল — সাদিয়া অঞ্চল, লোহিত্য বা লুইত — ব্ৰহ্মপুত্ৰ।",
        "প্ৰথম ফান্দ: প্ৰাগজ্যোতিষক কামৰূপৰ পুৰণি নাম বুলি কোৱা হয়, কিন্তু বৰ্মণ শিলালিপিয়ে কামৰূপ ব্যৱহাৰ কৰে। দ্বিতীয় ফান্দ: অসম নামৰ উৎপত্তিৰ সাধাৰণ উত্তৰ ‘অসম’ (অতুলনীয়), আৰু আহোমৰপৰা অহা ব্যাখ্যা বিকল্প হিচাপে দিয়া হয়। তৃতীয় ফান্দ: কমতা পিছৰ পশ্চিমৰ ৰাজ্য, প্ৰাচীন কামৰূপৰ আন এটা নাম নহয়।",
      ]],
    ],
  },

  "topic/gk/assam-history/ancient-assam-sec/bhauma-asura-dynasty": {
    en: [
      ["Naraka in the local and the pan-Indian tradition", [
        "Two traditions describe Naraka, and they do not say the same thing. The Kalika Purana, compiled in Kamarupa, makes Naraka the son of Bhumi and of Vishnu in his Varaha form, raised in Pragjyotisha and blessed by the goddess Kamakhya. In this version he is a founder who gives the country its temple.",
        "The Bhagavata Purana, a pan-Indian text, presents Narakasura as a tyrant who is killed by Krishna with Satyabhama and who holds captive a large number of women. Objective tests usually follow the local Kalika Purana for parentage, capital and the Kamakhya connection, and the Bhagavata for the Krishna episode.",
        "The two stories are reconciled in Assamese tradition by saying that after Naraka's death Krishna installed his son Bhagadatta on the throne, so the line continued and the kingdom was not wiped out.",
      ]],
      ["Bhagadatta, Vajradatta and the Mahabharata link", [
        "Bhagadatta is the best-known king of this line. The Mahabharata calls him the king of Pragjyotisha, a friend of Indra and of Duryodhana, and a warrior who brought kirata and frontier troops to the Kaurava side. He fights on the thirteenth day and is killed by Arjuna.",
        "Vajradatta, his son, belongs to the next generation of the story. In the Ashvamedha narrative he opposes Arjuna's campaign in the east and is defeated, which keeps the Pragjyotisha line inside the epic geography.",
        "The Varman kings later used this pedigree. Their grants trace the family back through Bhagadatta and Naraka to Vishnu, so the legend had a political function: it gave a seventh-century dynasty an epic-age ancestry.",
      ]],
      ["What may lie behind the legend", [
        "The Kalika Purana was compiled in Kamarupa around the tenth or eleventh century, so it records local memory, not contemporary evidence. Its value is that it preserves how Kamarupa's own priesthood explained the origins of the state and of Kamakhya.",
        "The labels Danava and Asura may describe pre-Varman ruling groups rather than single kings. Early Assam had several non-Varman powers, and later texts could have compressed them into a list of demon kings.",
        "The land grants to Brahmins described in the Kalika Purana match what the historical inscriptions show from the Varman period onward: a temple-centred economy, Brahmin settlements and royal patronage of the goddess. That continuity, not the king-list, is the historically usable part.",
        "Exam trap: the Bhauma line follows the Danava line. Naraka is not the first king of Pragjyotisha, and the fourteen-generation figure is traditional, not documented.",
      ]],
    ],
    as: [
      ["স্থানীয় আৰু সৰ্বভাৰতীয় পৰম্পৰাত নৰক", [
        "নৰকৰ বিষয়ে দুটা পৰম্পৰা আছে, আৰু দুয়োটাই একে কথা নকয়। কামৰূপত ৰচিত কালিকা পুৰাণে নৰকক ভূমি আৰু বৰাহ ৰূপী বিষ্ণুৰ পুত্ৰ বুলি কয়, প্ৰাগজ্যোতিষত ডাঙৰ হোৱা আৰু কামাখ্যা দেৱীৰ আশীৰ্বাদপ্ৰাপ্ত বুলি বৰ্ণনা কৰে। এই সংস্কৰণত তেওঁ দেশখনক মন্দিৰ দিয়া প্ৰতিষ্ঠাপক।",
        "সৰ্বভাৰতীয় ভাগৱত পুৰাণে নৰকাসুৰক অত্যাচাৰী বুলি দেখুৱায়, যাক কৃষ্ণই সত্যভামাৰ সৈতে বধ কৰে আৰু যি বহু নাৰীক বন্দী কৰি ৰাখিছিল। বস্তুনিষ্ঠ পৰীক্ষাত পিতৃ-মাতৃ, ৰাজধানী আৰু কামাখ্যা সম্পৰ্কৰ বাবে সাধাৰণতে কালিকা পুৰাণ, আৰু কৃষ্ণ-প্ৰসংগৰ বাবে ভাগৱত লোৱা হয়।",
        "অসমীয়া পৰম্পৰাত দুয়ো কথা মিলাই কোৱা হয় যে নৰকৰ মৃত্যুৰ পিছত কৃষ্ণই তেওঁৰ পুত্ৰ ভগদত্তক সিংহাসনত বহুৱাইছিল, সেয়ে বংশ চলি থাকিল আৰু ৰাজ্য লোপ নাপালে।",
      ]],
      ["ভগদত্ত, বজ্ৰদত্ত আৰু মহাভাৰতৰ সংযোগ", [
        "ভগদত্ত এই বংশৰ আটাইতকৈ পৰিচিত ৰজা। মহাভাৰতে তেওঁক প্ৰাগজ্যোতিষৰ ৰজা, ইন্দ্ৰ আৰু দুৰ্যোধনৰ বন্ধু, আৰু কৌৰৱৰ পক্ষে কিৰাত আদি সীমান্ত সৈন্য আনিছিল বুলি কয়। তেওঁ ত্ৰয়োদশ দিনা যুঁজি অৰ্জুনৰ দ্বাৰা নিহত হয়।",
        "তেওঁৰ পুত্ৰ বজ্ৰদত্ত কাহিনীৰ পিছৰ পুৰুষ। অশ্বমেধ আখ্যানত তেওঁ পূব দিশত অৰ্জুনৰ অভিযানৰ বিৰোধ কৰি পৰাজিত হয়, যাৰ ফলত প্ৰাগজ্যোতিষৰ বংশ মহাকাব্যৰ ভূগোলৰ ভিতৰত থাকে।",
        "বৰ্মণ ৰজাসকলে পিছত এই বংশাৱলী ব্যৱহাৰ কৰিছিল। তেওঁলোকৰ তাম্ৰশাসনে পৰিয়ালক ভগদত্ত আৰু নৰকৰ জৰিয়তে বিষ্ণুলৈ নিয়ে, গতিকে কিংবদন্তিৰ ৰাজনৈতিক কাম আছিল: সপ্তম শতিকাৰ ৰাজবংশক মহাকাব্যিক পূৰ্বপুৰুষ দিয়া।",
      ]],
      ["কিংবদন্তিৰ আঁৰত কি থাকিব পাৰে", [
        "কালিকা পুৰাণ দশম বা একাদশ শতিকাৰ আশে-পাশে কামৰূপত ৰচিত, গতিকে ই সমকালীন প্ৰমাণ নহয়, স্থানীয় স্মৃতি। ইয়াৰ মূল্য এইটো যে ৰাজ্য আৰু কামাখ্যাৰ উৎপত্তিৰ বিষয়ে কামৰূপৰ পুৰোহিতসকলে কি ভাবিছিল, সেয়া ই সংৰক্ষণ কৰিছে।",
        "দানৱ আৰু অসুৰ শব্দই হয়তো এজন-এজন ৰজাক নহয়, বৰ্মণপূৰ্ব শাসক গোটক বুজায়। প্ৰাচীন অসমত কেইবাটাও অন-বৰ্মণ শক্তি আছিল, আৰু পিছৰ গ্ৰন্থই সিহঁতক অসুৰ ৰজাৰ তালিকাত সুমুৱাই দিব পাৰে।",
        "কালিকা পুৰাণত বৰ্ণিত ব্ৰাহ্মণসকলক ভূমিদান বৰ্মণ যুগৰপৰা ঐতিহাসিক শিলালিপিত দেখা যায়: মন্দিৰকেন্দ্ৰিক অৰ্থনীতি, ব্ৰাহ্মণ বসতি আৰু দেৱীৰ ৰাজকীয় পৃষ্ঠপোষকতা। ৰজাৰ তালিকাতকৈ এই ধাৰাবাহিকতাই ঐতিহাসিকভাৱে ব্যৱহাৰযোগ্য।",
        "পৰীক্ষাৰ ফান্দ: ভৌম বংশ দানৱ বংশৰ পিছত আহে। নৰক প্ৰাগজ্যোতিষৰ প্ৰথম ৰজা নহয়, আৰু চৈধ্যজন পুৰুষৰ সংখ্যা পৰম্পৰাগত, দস্তাবেজযুক্ত নহয়।",
      ]],
    ],
  },

  "topic/gk/assam-history/ancient-assam-sec/mythological-rulers": {
    en: [
      ["Bana's Sonitpur in the Puranic story", [
        "Bana is described as a king with a thousand arms, a devotee of Shiva, ruling from Sonitpur. His daughter Usha saw Aniruddha, a grandson of Krishna, in a dream, and her friend Chitralekha helped the two meet. When Bana discovered the marriage he imprisoned Aniruddha, and Krishna came to Sonitpur with an army.",
        "In the battle Shiva fought on Bana's side. Krishna spared Bana's life but took away his extra arms, and the marriage was accepted. The story explains why Tezpur is full of Bana place-names: Agnigarh, where Usha was kept, and the Baleswar cave and temple linked to her husband.",
        "The Kalika Purana retells the same episode and places Sonitpur inside Kamarupa, which is why Assamese tradition treats Bana as a local ruler and not only as a Puranic demon.",
      ]],
      ["Bhismaka, Kundil and the Rukmini episode", [
        "Bhismaka ruled Kundil. His daughter Rukmini loved Krishna, but her brother Rukmi fixed her marriage with Shishupala. Krishna carried Rukmini away in the well-known harana episode, and Rukmi's pursuit ended in his defeat and disgrace.",
        "Assamese tradition identifies Kundil with the Sadiya region, where the Kundil river still carries the name. This is a good example of how epic geography was mapped onto real places in upper Assam.",
        "Careful with names: Bhismaka, Rukmini's father, is not Bhishma of the Mahabharata. Objective papers use the similarity deliberately.",
      ]],
      ["Reading these rulers as history", [
        "No inscription names Bana or Bhismaka, and no excavated site can be tied to them. They belong to the Puranic layer of Assam's past, alongside Naraka, Bhagadatta and the Danava kings.",
        "What is historical is the use later kingdoms made of them. The Chutiyas claimed descent from Bhima through Ghatotkacha, the Kacharis from Hidimba, and the Ahoms linked themselves to Indra. Ancestry claims turned local states into part of the pan-Indian epic world.",
        "For exams, the safe formulation is: Bana and Bhismaka are mythological rulers known from the Mahabharata and the Puranas, associated by tradition with Sonitpur (Tezpur) and Kundil (Sadiya).",
      ]],
    ],
    as: [
      ["পৌৰাণিক কাহিনীত বাণৰ শোণিতপুৰ", [
        "বাণক হাজাৰ বাহু থকা ৰজা, শিৱৰ ভক্ত আৰু শোণিতপুৰৰপৰা ৰাজত্ব কৰা বুলি বৰ্ণনা কৰা হয়। তেওঁৰ জীয়ৰী ঊষাই সপোনত কৃষ্ণৰ নাতি অনিৰুদ্ধক দেখিছিল, আৰু বান্ধৱী চিত্ৰলেখাই দুয়োক মিলাই দিছিল। বাণে বিয়া গম পাই অনিৰুদ্ধক বন্দী কৰিছিল, আৰু কৃষ্ণই সৈন্যসহ শোণিতপুৰলৈ আহিছিল।",
        "যুদ্ধত শিৱই বাণৰ পক্ষ লৈছিল। কৃষ্ণই বাণৰ প্ৰাণ ৰক্ষা কৰিছিল কিন্তু তেওঁৰ অতিৰিক্ত বাহুবোৰ কাটি পেলাইছিল, আৰু বিয়াখন স্বীকৃত হৈছিল। এই কাহিনীয়েই তেজপুৰৰ বাণ-সম্পৰ্কীয় নামবোৰ ব্যাখ্যা কৰে: ঊষাক ৰখা অগ্নিগড়, আৰু তেওঁৰ স্বামীৰ সৈতে জড়িত বালেশ্বৰ গুহা আৰু মন্দিৰ।",
        "কালিকা পুৰাণে একেই আখ্যান কৈ শোণিতপুৰক কামৰূপৰ ভিতৰত ৰাখে, সেয়ে অসমীয়া পৰম্পৰাই বাণক স্থানীয় ৰজা হিচাপে লয়, কেৱল পৌৰাণিক অসুৰ নহয়।",
      ]],
      ["ভীষ্মক, কুণ্ডিল আৰু ৰুক্মিণীৰ প্ৰসংগ", [
        "ভীষ্মকে কুণ্ডিলত ৰাজত্ব কৰিছিল। তেওঁৰ জীয়ৰী ৰুক্মিণীয়ে কৃষ্ণক ভাল পাইছিল, কিন্তু ভাতৃ ৰুক্মীয়ে তাইৰ বিয়া শিশুপালৰ সৈতে ঠিক কৰিছিল। প্ৰসিদ্ধ হৰণ আখ্যানত কৃষ্ণই ৰুক্মিণীক লৈ গৈছিল, আৰু ৰুক্মীৰ অনুসৰণ তেওঁৰ পৰাজয় আৰু অপমানত শেষ হৈছিল।",
        "অসমীয়া পৰম্পৰাই কুণ্ডিলক সাদিয়া অঞ্চলৰ সৈতে চিনাক্ত কৰে, য’ত কুণ্ডিল নদীৰ নাম আজিও আছে। মহাকাব্যিক ভূগোল কেনেকৈ উজনি অসমৰ প্ৰকৃত স্থানত বহি লৈছিল, ইয়াৰ এটা ভাল উদাহৰণ।",
        "নামৰ সৈতে সাৱধান: ৰুক্মিণীৰ পিতৃ ভীষ্মক মহাভাৰতৰ ভীষ্ম নহয়। বস্তুনিষ্ঠ প্ৰশ্নপত্ৰই এই মিল ব্যৱহাৰ কৰি ফান্দ পাতে।",
      ]],
      ["এই শাসকসকলক ইতিহাস হিচাপে পঢ়া", [
        "কোনো শিলালিপিয়ে বাণ বা ভীষ্মকৰ নাম নোলোৱে, আৰু খননস্থলীও তেওঁলোকৰ সৈতে জড়াব নোৱাৰি। তেওঁলোক নৰক, ভগদত্ত আৰু দানৱ ৰজাসকলৰ দৰে অসমৰ অতীতৰ পৌৰাণিক স্তৰত পৰে।",
        "ঐতিহাসিক কথা হ’ল পিছৰ ৰাজ্যই তেওঁলোকক কেনেকৈ ব্যৱহাৰ কৰিছিল। চুতীয়াসকলে ঘটোৎকচৰ জৰিয়তে ভীমৰ বংশদাবী কৰিছিল, কছাৰীসকলে হিডিম্বাৰ, আৰু আহোমসকলে নিজকে ইন্দ্ৰৰ সৈতে জড়াইছিল। বংশদাবীয়ে স্থানীয় ৰাজ্যক সৰ্বভাৰতীয় মহাকাব্যিক জগতৰ ভিতৰলৈ আনিছিল।",
        "পৰীক্ষাৰ বাবে নিৰাপদ বাক্য: বাণ আৰু ভীষ্মক মহাভাৰত আৰু পুৰাণৰপৰা জনা কিংবদন্তিমূলক শাসক, যিসকলক পৰম্পৰাই শোণিতপুৰ (তেজপুৰ) আৰু কুণ্ডিল (সাদিয়া)ৰ সৈতে জড়ায়।",
      ]],
    ],
  },

  "topic/gk/assam-history/medieval-assam-sec/chutiya-kingdom": {
    en: [
      ["From Birpal to Sadiya: how the state took shape", [
        "Chutiya tradition names Birpal as the founder in the twelfth century, and the ruling clan claimed descent from Bhima through Ghatotkacha. The early centre lay in the hills and foothills of the upper Lohit, and the later capital was Sadiya, in present-day Tinsukia district.",
        "Sadiya was not a random capital. It controlled the corridor between the Dihang, Dibang and Lohit rivers and the passes that led to Tibet and Yunnan, so the kingdom sat on the trade that moved between the hills and the plains.",
        "The line of rulers remembered in the buranjis includes Ratnadhwajpal, who built the city of Ratnapur, and Dharmadhwajpal; the last king was Nitipal, defeated by the Ahoms.",
      ]],
      ["Why the Chutiya state was wealthy", [
        "Wet-rice (sali) cultivation in the plains gave the kingdom a surplus, and iron working in the hills gave it tools and weapons. Both are mentioned repeatedly in the Ahom records of the conquest.",
        "Sadiya was a meeting point for hill and plains produce: herbs, ivory, gold dust, cotton cloth and dried fish moved through its markets, and Tibetan traders came down for salt and manufactured goods.",
        "The state was not a single centralised bureaucracy. Local chiefs and village headmen governed under the king, and the goddess Kechaikhati stood at the centre of the royal cult, with the Bura-Buri or Dangoria deities worshipped in the villages.",
      ]],
      ["1523 and after: annexation, memory and traps", [
        "Suhungmung, also called Dihingia Raja, annexed Sadiya in 1523 and created the office of the Sadiya-khowa Gohain to govern the region for the Ahoms. This was the first major indigenous kingdom absorbed by the Ahom state and set the pattern for later expansions.",
        "Sati Sadhani, associated with the last phase of the kingdom, is remembered for refusing submission and choosing death. Her story became a symbol of Chutiya resistance and is the reason the kingdom is still taught as a moral as well as a political subject.",
        "Traps: the Chutiya kingdom is not the same as the Chutiya clan of the Koch-Kamata line; the 1523 conquest is Ahom, not Mughal; and the capital is Sadiya, not Sivasagar, which was an Ahom capital.",
      ]],
    ],
    as: [
      ["বীৰপালৰপৰা সাদিয়ালৈ: ৰাজ্য কেনেকৈ গঢ় ল’লে", [
        "চুতীয়া পৰম্পৰাই দ্বাদশ শতিকাত বীৰপালক প্ৰতিষ্ঠাপক বোলে, আৰু শাসক বংশই ঘটোৎকচৰ জৰিয়তে ভীমৰ বংশদাবী কৰিছিল। প্ৰাৰম্ভিক কেন্দ্ৰ উজনি লোহিতৰ পাহাৰ আৰু পাদদেশত আছিল, আৰু পিছৰ ৰাজধানী আছিল সাদিয়া, বৰ্তমান তিনিচুকীয়া জিলাত।",
        "সাদিয়া যিকোনো ঠাই নাছিল। ই দিহাং, ডিবাং আৰু লোহিত নদীৰ মাজৰ পথ আৰু তিব্বত-য়ুনানলৈ যোৱা গিৰিপথ নিয়ন্ত্ৰণ কৰিছিল, গতিকে ৰাজ্যখন পাহাৰ-সমতলৰ বাণিজ্যৰ ওপৰত বহি আছিল।",
        "বুৰঞ্জীত স্মৰণীয় শাসকসকলৰ ভিতৰত ৰত্নধ্বজপালে ৰত্নপুৰ নগৰ নিৰ্মাণ কৰিছিল, ধৰ্মধ্বজপাল আদিও আছিল; শেষ ৰজা নীতিপাল, যাক আহোমসকলে পৰাস্ত কৰিছিল।",
      ]],
      ["চুতীয়া ৰাজ্য ধনী কিয় আছিল", [
        "সমতলত ভিজা-ধান (শালি) খেতিয়ে ৰাজ্যক উদ্বৃত্ত দিছিল, আৰু পাহাৰত লো-কামে সঁজুলি আৰু অস্ত্ৰ দিছিল। দুয়োটাৰ কথা আহোম বিজয়ৰ অভিলেখত বাৰে বাৰে উল্লেখ আছে।",
        "সাদিয়া পাহাৰ আৰু সমতলৰ সামগ্ৰীৰ মিলনস্থল আছিল: ভেষজ, হাতীদাঁত, সোণৰ ধূলি, কপাহী কাপোৰ আৰু শুকান মাছ তাৰ বজাৰত চলিছিল, আৰু তিব্বতী ব্যৱসায়ীয়ে নিমখ আৰু নিৰ্মিত সামগ্ৰীৰ বাবে তললৈ আহিছিল।",
        "ৰাজ্য এখন একক কেন্দ্ৰীভূত প্ৰশাসন নাছিল। স্থানীয় মূৰব্বী আৰু গাঁৱৰ মূৰতীয়াসকলে ৰজাৰ অধীনত শাসন কৰিছিল, আৰু ৰাজকীয় ধৰ্মৰ কেন্দ্ৰত কেচাইখাতি দেৱী আছিল, গাঁৱত বুঢ়া-বুঢ়ী বা ডাঙৰীয়া দেৱতাৰ উপাসনা হৈছিল।",
      ]],
      ["১৫২৩ আৰু ইয়াৰ পিছত: অন্তৰ্ভুক্তি, স্মৃতি আৰু ফান্দ", [
        "সুহুংমুং, যাক দিহিঙ্গিয়া ৰজাও বোলা হয়, ১৫২৩ চনত সাদিয়া জয় কৰি অঞ্চলটো শাসন কৰিবলৈ সাদিয়া-খোৱা গোহাঁই পদ সৃষ্টি কৰিছিল। আহোম ৰাজ্যই অন্তৰ্ভুক্ত কৰা এইখনেই প্ৰথম প্ৰধান থলুৱা ৰাজ্য আছিল আৰু পিছৰ বিস্তাৰৰ আৰ্হি স্থাপন কৰিছিল।",
        "ৰাজ্যৰ শেষ পৰ্যায়ৰ সৈতে জড়িত সতী সাধনীয়ে বশ্যতা অস্বীকাৰ কৰি মৃত্যু বাছনি কৰাৰ বাবে স্মৰণীয়। তেওঁৰ কাহিনী চুতীয়া প্ৰতিৰোধৰ প্ৰতীক হৈ পৰিছে, সেয়ে ৰাজ্যখন ৰাজনৈতিকৰ লগতে নৈতিক বিষয় হিচাপেও পঢ়োৱা হয়।",
        "ফান্দ: চুতীয়া ৰাজ্য কোচ-কমতা শাখাৰ চুতীয়া জনগোষ্ঠীৰ সৈতে একে নহয়; ১৫২৩ৰ বিজয় আহোমৰ, মোগলৰ নহয়; আৰু ৰাজধানী সাদিয়া, শিৱসাগৰ নহয় (শিৱসাগৰ আহোম ৰাজধানী আছিল)।",
      ]],
    ],
  },

  "topic/gk/assam-history/medieval-assam-sec/kachari-kingdom": {
    en: [
      ["Dimapur, Maibang, Khaspur: three capitals, three phases", [
        "The Kachari state had three capitals, and each marks a phase. Dimapur, in present-day Nagaland, was the early capital, with stone gateways and megalithic monuments, and it controlled the Dhansiri valley.",
        "After the defeat of 1536 the court moved into the hills to Maibang, in present-day Dima Hasao district, where rock-cut monuments and tanks still stand. The move traded plains revenue for defensible terrain.",
        "In the eighteenth century the capital shifted again, this time to Khaspur near present-day Silchar, after the Dimasa kings absorbed the Koch-Hirapur line and took over the plains of the Barak valley.",
      ]],
      ["Kingship, culture and the turn to Sanskritic titles", [
        "Early rulers used Dimasa names and local titles. From the eighteenth century they adopted names such as Krishnachandra and Govindachandra, patronised Brahmins, and built temples in the plains style.",
        "The Khaspur palace complex, the Ranachandi temple and the coins of Krishnachandra show a hybrid court culture, in which Dimasa clan organisation and Hindu kingship existed together.",
        "Dimasa society kept its clan (sengphong) structure, the Bisu festival, megalithic customs and the hill-plains exchange networks that had made the kingdom viable in the first place.",
      ]],
      ["1832 and the traps examiners set", [
        "Govindachandra died in 1830 without a direct heir. After a succession dispute among claimants the British annexed Cachar in 1832, ending the independent Dimasa state and attaching the plains to British India.",
        "Traps: Dimapur is in Nagaland, not Assam; Maibang is in Dima Hasao; 1536 is the year of the Ahom victory under Suhungmung, not the year of British annexation; and Krishnachandra is a late eighteenth-century ruler, not a medieval founder.",
      ]],
    ],
    as: [
      ["ডিমাপুৰ, মাইবাং, খাসপুৰ: তিনিটা ৰাজধানী, তিনিটা পৰ্যায়", [
        "কছাৰী ৰাজ্যৰ তিনিটা ৰাজধানী আছিল, আৰু প্ৰতিটোৱে এটা পৰ্যায় বুজায়। ডিমাপুৰ, বৰ্তমান নাগালেণ্ডত, প্ৰাৰম্ভিক ৰাজধানী আছিল, শিলৰ দুৱাৰ আৰু মেগালিথিক স্মৃতিচিহ্নৰ সৈতে, আৰু ই ধনশিৰী উপত্যকা নিয়ন্ত্ৰণ কৰিছিল।",
        "১৫৩৬ৰ পৰাজয়ৰ পিছত ৰাজদৰবাৰ পাহাৰলৈ, বৰ্তমান ডিমা হাছাও জিলাৰ মাইবাংলৈ গুচি যায়, য’ত শিলা-কটা স্মৃতিচিহ্ন আৰু পুখুৰী আজিও আছে। এই গমনত সমতলৰ ৰাজহ এৰি সুৰক্ষিত ভূ-প্ৰকৃতি লোৱা হৈছিল।",
        "অষ্টাদশ শতিকাত ৰাজধানী পুনৰ গুচি যায়, এইবাৰ বৰ্তমান শিলচৰৰ ওচৰৰ খাসপুৰলৈ, যেতিয়া ডিমাছা ৰজাসকলে কোচ-হিৰাপুৰ শাখা আত্মসাৎ কৰি বৰাক উপত্যকাৰ সমতল অধিকাৰ কৰে।",
      ]],
      ["ৰাজত্ব, সংস্কৃতি আৰু সংস্কৃত উপাধিৰ ফালে গতি", [
        "প্ৰাৰম্ভিক শাসকসকলে ডিমাছা নাম আৰু স্থানীয় উপাধি ব্যৱহাৰ কৰিছিল। অষ্টাদশ শতিকাৰপৰা তেওঁলোকে কৃষ্ণচন্দ্ৰ, গোবিন্দচন্দ্ৰ আদি নাম লৈ ব্ৰাহ্মণসকলক পৃষ্ঠপোষকতা কৰিছিল আৰু সমতলীয় শৈলীত মন্দিৰ নিৰ্মাণ কৰিছিল।",
        "খাসপুৰ ৰাজপ্ৰাসাদ, ৰণচণ্ডী মন্দিৰ আৰু কৃষ্ণচন্দ্ৰৰ মুদ্ৰাই মিশ্ৰিত ৰাজদৰবাৰ-সংস্কৃতি দেখুৱায়, য’ত ডিমাছা গোষ্ঠী-সংগঠন আৰু হিন্দু ৰাজত্ব একেলগে আছিল।",
        "ডিমাছা সমাজে নিজৰ গোষ্ঠী (ছেংফং) গঠন, বিছু উৎসৱ, মেগালিথিক ৰীতি আৰু পাহাৰ-সমতলৰ বিনিময় জালিকা ৰাখিছিল, যিয়ে ৰাজ্যক প্ৰথমে টিকাই ৰাখিছিল।",
      ]],
      ["১৮৩২ আৰু পৰীক্ষাৰ ফান্দ", [
        "গোবিন্দচন্দ্ৰ ১৮৩০ চনত পোনপটীয়া উত্তৰাধিকাৰী নোহোৱাকৈ মৃত্যুবৰণ কৰে। দাবীদাৰসকলৰ মাজত উত্তৰাধিকাৰ বিবাদৰ পিছত ব্ৰিটিছে ১৮৩২ চনত কাছাৰ অধিকাৰ কৰে, যাৰ ফলত স্বাধীন ডিমাছা ৰাজ্যৰ সমাপ্তি হয় আৰু সমতল ব্ৰিটিছ ভাৰতৰ সৈতে সংযুক্ত হয়।",
        "ফান্দ: ডিমাপুৰ নাগালেণ্ডত, অসমত নহয়; মাইবাং ডিমা হাছাওত; ১৫৩৬ সুহুংমুঙৰ আহোম বিজয়ৰ বছৰ, ব্ৰিটিছ অধিকাৰৰ নহয়; আৰু কৃষ্ণচন্দ্ৰ অষ্টাদশ শতিকাৰ শেষৰ ৰজা, মধ্যযুগীয় প্ৰতিষ্ঠাপক নহয়।",
      ]],
    ],
  },

  "topic/gk/assam-history/ancient-assam-sec/danava-dynasty": {
    en: [
      ["What the Kalika Purana is doing with this king-list", [
        "The Kalika Purana was compiled in Kamarupa, probably in the tenth or eleventh century, and it opens the local king-list with Mahiranga Danava. The list is short, the kings have no dates, and their only deeds are the founding of the capital and the loss of the kingdom.",
        "That shape is deliberate. In the text, Kamakhya is the real power: rulers who honour her prosper, and rulers who neglect her fall. The Danava line ends when the goddess withdraws her support, and Naraka begins a new line with her blessing.",
        "So the passage is political theology as much as history. It tells us how the temple establishment of Kamarupa explained the origins of the state and the supremacy of Kamakhya.",
      ]],
      ["Five kings and the order to memorise", [
        "The sequence Mahiranga, Hataka, Sambar, Ratna and Ghatak is the most frequently asked fact about the line. Learn it as a chain, not as five separate names.",
        "After Ghatakasura the throne passes to Naraka, which is why Danava and Bhauma are always studied together: the first list is legendary, the second begins the story of Kamakhya's temple and of Bhagadatta.",
        "The capital, Pragjyotisha, is placed near Nilachal hill, the Kamakhya area of present-day Guwahati, and the same site is claimed for the later Bhauma kings.",
      ]],
      ["History or myth: what examiners expect", [
        "No inscription mentions a Danava king. The Varman grants begin with mythical ancestors and then list rulers whose dates and grants can be checked, which is exactly where documented history starts.",
        "Historians of Assam, from K. L. Barua to P. C. Choudhury, treat the Danava line as legend that may preserve a memory of early non-Varman rulers of the region, not as a record of five individuals.",
        "The safe answer in a test: the Danava dynasty is legendary, its source is the Kalika Purana, it is placed before the historical Varman dynasty, and it is followed by the Bhauma line of Naraka.",
      ]],
    ],
    as: [
      ["এই ৰজাৰ তালিকাখন কালিকা পুৰাণে কি কৰিছে", [
        "কালিকা পুৰাণ কামৰূপত, সম্ভৱতঃ দশম বা একাদশ শতিকাত ৰচিত, আৰু ই স্থানীয় ৰজাৰ তালিকা মহিৰঙ্গ দানৱৰপৰা আৰম্ভ কৰে। তালিকাখন চুটি, ৰজাসকলৰ তাৰিখ নাই, আৰু তেওঁলোকৰ একমাত্ৰ কাম ৰাজধানী স্থাপন আৰু ৰাজ্য হেৰুওৱা।",
        "এই গঢ়টো ইচ্ছাকৃত। গ্ৰন্থখনত কামাখ্যাই প্ৰকৃত শক্তি: যি শাসকে তেওঁক সন্মান কৰে তেওঁৰ উন্নতি, যি অৱহেলা কৰে তেওঁৰ পতন। দেৱীয়ে সমৰ্থন উঠাই লোৱাৰ লগে লগে দানৱ বংশ শেষ হয়, আৰু তেওঁৰ আশীৰ্বাদেৰে নৰক নতুন বংশ আৰম্ভ কৰে।",
        "গতিকে এই অংশ ইতিহাসৰ লগতে ৰাজনৈতিক ধৰ্মতত্ত্বও। কামৰূপৰ মন্দিৰ-প্ৰতিষ্ঠানে ৰাজ্যৰ উৎপত্তি আৰু কামাখ্যাৰ শ্ৰেষ্ঠত্ব কেনেকৈ ব্যাখ্যা কৰিছিল, সেয়া ই আমাক কয়।",
      ]],
      ["পাঁচজন ৰজা আৰু ক্ৰম মনত ৰখা", [
        "মহিৰঙ্গ, হাটক, সম্ভৰ, ৰত্ন আৰু ঘাটক — এই ক্ৰমটোৱেই এই বংশৰ বিষয়ে আটাইতকৈ সোধা তথ্য। ইয়াক পাঁচটা পৃথক নাম হিচাপে নহয়, শৃংখল হিচাপে শিকক।",
        "ঘাটকাসুৰৰ পিছত সিংহাসন নৰকলৈ যায়, সেয়ে দানৱ আৰু ভৌম সদায় একেলগে পঢ়া হয়: প্ৰথম তালিকা কিংবদন্তিমূলক, দ্বিতীয়টোৱে কামাখ্যা মন্দিৰ আৰু ভগদত্তৰ কাহিনী আৰম্ভ কৰে।",
        "ৰাজধানী প্ৰাগজ্যোতিষ নীলাচল পাহাৰৰ ওচৰত, বৰ্তমান গুৱাহাটীৰ কামাখ্যা অঞ্চলত ৰখা হয়, আৰু সেই একেই স্থান পিছৰ ভৌম ৰজাসকলৰ বাবেও দাবী কৰা হয়।",
      ]],
      ["ইতিহাস নে কিংবদন্তি: পৰীক্ষকে কি বিচাৰে", [
        "কোনো শিলালিপিয়ে দানৱ ৰজাৰ নাম নোলোৱে। বৰ্মণ তাম্ৰশাসন কিংবদন্তিমূলক পূৰ্বপুৰুষৰপৰা আৰম্ভ হৈ তাৰ পিছত যিসকল ৰজাৰ তাৰিখ আৰু দান যাচিব পাৰি তেওঁলোকক তালিকাভুক্ত কৰে — দস্তাবেজযুক্ত ইতিহাস তাতেই আৰম্ভ হয়।",
        "কে. এল. বৰুৱাৰপৰা পি. চি. চৌধুৰীলৈ অসমৰ ইতিহাসবিদসকলে দানৱ বংশক কিংবদন্তি বুলি লয়, যিয়ে হয়তো এই অঞ্চলৰ প্ৰাৰম্ভিক অন-বৰ্মণ শাসকসকলৰ স্মৃতি ৰাখে, পাঁচজন ব্যক্তিৰ অভিলেখ নহয়।",
        "পৰীক্ষাৰ নিৰাপদ উত্তৰ: দানৱ বংশ কিংবদন্তিমূলক, উৎস কালিকা পুৰাণ, ইতিহাসিক বৰ্মণ বংশৰ আগত স্থাপিত, আৰু ইয়াৰ পিছত নৰকৰ ভৌম বংশ।",
      ]],
    ],
  },
};

const FAQ_EN = /<h3[^>]*>\s*Frequently Asked Questions\s*<\/h3>/i;
const FAQ_AS = /<h3[^>]*>\s*সঘনাই সোধা প্ৰশ্ন\s*<\/h3>/;

/* Insertion must stay inside section.axo-extra-content: some twins repeat an
   FAQ heading inside <main id="app">, which the SPA overwrites. */
function extraSpan(html) {
  const start = html.search(/<section[^>]*class="[^"]*axo-extra-content/);
  if (start < 0) return null;
  let depth = 0;
  const re = /<section\b|<\/section>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === "<section" ? 1 : -1;
    if (depth === 0) return [start, m.index];
  }
  return null;
}

function renderSections(lang, sections) {
  return sections.map(([h3, blocks]) => {
    const body = blocks.map((b) => (Array.isArray(b) ? UL(lang, b) : P(lang, b))).join("\n      ");
    return `      <h3>${h3}</h3>\n      ${body}`;
  }).join("\n");
}

let changed = 0;
const report = [];

const TARGETS = [];
for (const [rel, data] of Object.entries(DATA)) {
  TARGETS.push([rel, data, "both"]);
  TARGETS.push(["as/" + rel, data, "as"]);   /* Assamese twin: it carries no English article */
}

for (const [rel, data, mode] of TARGETS) {
  const file = path.join(ROOT, rel, "index.html");
  if (!fs.existsSync(file)) { report.push(`MISSING ${rel}`); continue; }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("<!-- axo-deep:1 -->")) { report.push(`skip ${rel}`); continue; }

  let span = extraSpan(html);
  if (!span) { report.push(`NO-EXTRA ${rel}`); continue; }

  const asAt = FAQ_AS.exec(html.slice(span[0], span[1]));
  if (!asAt) { report.push(`NO-FAQ ${rel}`); continue; }
  let at = span[0] + asAt.index;
  html = html.slice(0, at) + renderSections("as", data.as) + "\n      " + html.slice(at);

  if (mode === "both") {
    span = extraSpan(html);
    const enAt = FAQ_EN.exec(html.slice(span[0], span[1]));
    if (!enAt) { report.push(`NO-EN-FAQ ${rel}`); continue; }
    at = span[0] + enAt.index;
    html = html.slice(0, at) + renderSections("en", data.en) + "\n      " + html.slice(at);
  }

  html = html.replace("</main>", "</main>\n<!-- axo-deep:1 -->");

  if (!DRY) fs.writeFileSync(file, html);
  changed++;
  report.push(`ok ${rel}`);
}

console.log(report.join("\n"));
console.log(`pages deepened: ${changed}`);
