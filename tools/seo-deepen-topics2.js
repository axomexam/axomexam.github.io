#!/usr/bin/env node
"use strict";

/*
 * tools/seo-deepen-topics2.js
 *
 * Second batch of topic pages that sit under the 1300-word extra-content
 * floor. Same shape as seo-deepen-topics.js: three topic-specific sections per
 * language, inserted before the FAQ heading inside section.axo-extra-content.
 *
 * The English page receives both articles; the Assamese twin receives the
 * Assamese sections only, because its article is Assamese-only.
 *
 * Idempotent: marked with <!-- axo-deep2:1 -->.
 *
 * Usage: node tools/seo-deepen-topics2.js [--dry]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const P = (lang, t) => `<p lang="${lang}">${t}</p>`;
const UL = (lang, items) => `<ul>\n${items.map((i) => `  <li lang="${lang}">${i}</li>`).join("\n")}\n</ul>`;

const DATA = {
  "topic/gk/assam-history/ancient-assam-sec/ancient-assam": {
    en: [
      ["Where the evidence for ancient Assam comes from", [
        "Ancient Assam is reconstructed from four kinds of evidence, and each one covers a different period. Epigraphy is the strongest: the Allahabad pillar inscription of Samudragupta names Kamarupa in the fourth century, and the Nidhanpur grant of Bhaskaravarman lists the Varman kings with their grants.",
        "Literary sources supply the earlier, legendary layer: the Mahabharata, the Harivamsa, the Kalika Purana and the Yogini Tantra. They are late compilations, but they preserve local memory of Pragjyotisha and of the Kamakhya cult.",
        "Foreign accounts add an outside view. The Chinese pilgrim Xuanzang, who visited Kamarupa around 643 CE, describes a country of numerous Deva temples, a distinct script and a king who was a patron of learning.",
        "Archaeology fills the gaps. Excavations at Ambari in Guwahati show an urban settlement with pottery and structures from the early centuries CE, and the Neolithic site of Daojali Hading in Dima Hasao pushes settlement in the region back several thousand years.",
      ]],
      ["The dynasties in order", [
        "The Varman line (c. 350-650 CE) is the first dynasty with inscriptions. It begins with Pushyavarman and reaches its height under Bhaskaravarman, a contemporary of Harshavardhana and of Xuanzang, who took the title Kumararaja and extended Kamarupa's influence into Bengal and Bihar.",
        "The Salasthambha or Mlechchha dynasty (c. 655-900 CE) followed, with rulers such as Salasthambha, Harsha, Harjaravarman and Vanamala, who issued the Tezpur and Hayungthal grants. Their capital shifted towards the Tezpur area.",
        "The Pala dynasty of Kamarupa (c. 900-1100 CE) - Brahma Pala, Ratna Pala, Indra Pala, Harsha Pala and Jaya Pala - ruled a shrinking territory and patronised both Brahmanical and Buddhist institutions. After them Kamarupa broke into smaller units such as Kamata in the west.",
      ]],
      ["State, land and religion", [
        "The inscriptions show a state built on land grants. Kings donated villages (agrahara) to Brahmins and temples, and those grants record boundaries, taxes and the rights transferred, which makes them the best evidence for administration.",
        "Religion was plural. Sakta worship at Kamakhya was central, Saiva temples were patronised, and Vaishnavism appears in the epigraphs; Xuanzang's 'Deva' temples refer to this Brahmanical landscape rather than to Buddhist monasteries.",
        "Exam traps: the Varmans are the first dynasty with evidence, not the first dynasty in tradition; Bhaskaravarman is seventh century, not fifth; and the end of unified Kamarupa is placed in the twelfth century, after which the map breaks into Kamata, Chutiya, Kachari and Ahom territories.",
      ]],
    ],
    as: [
      ["প্ৰাচীন অসমৰ প্ৰমাণ ক’ৰপৰা আহে", [
        "প্ৰাচীন অসমৰ ইতিহাস চাৰি ধৰণৰ প্ৰমাণৰপৰা গঢ় লৈছে, আৰু প্ৰতিটোৱে বেলেগ বেলেগ কাল সামৰে। আটাইতকৈ শক্তিশালী হ’ল শিলালিপি: চতুৰ্থ শতিকাৰ সমুদ্ৰগুপ্তৰ এলাহাবাদ স্তম্ভ শিলালিপিত কামৰূপৰ নাম আছে, আৰু ভাস্কৰবৰ্মণৰ নিধনপুৰ তাম্ৰশাসনে বৰ্মণ ৰজাসকলৰ ক্ৰম আৰু তেওঁলোকৰ দান তালিকাভুক্ত কৰে।",
        "সাহিত্যিক উৎসই আগৰ কিংবদন্তিমূলক স্তৰ যোগায়: মহাভাৰত, হৰিবংশ, কালিকা পুৰাণ আৰু যোগিনী তন্ত্ৰ। এইবোৰ পিছৰ কালৰ ৰচনা, কিন্তু প্ৰাগজ্যোতিষ আৰু কামাখ্যা উপাসনাৰ স্থানীয় স্মৃতি ইয়াৰ ভিতৰত ৰক্ষা পাইছে।",
        "বিদেশী বিৱৰণে বাহিৰৰ দৃষ্টি যোগায়। খ্ৰীষ্টীয় ৬৪৩ চনৰ আশে-পাশে কামৰূপ ভ্ৰমণ কৰা চীনা পৰিৱ্ৰাজক হিউয়েন চাঙে বহু দেৱ-মন্দিৰ, নিজা লিপি আৰু বিদ্যাৰ পৃষ্ঠপোষক ৰজাৰ কথা লিখি থৈ গৈছে।",
        "পুৰাতত্ত্বই ৰিক্ত ঠাই পূৰ কৰে। গুৱাহাটীৰ আমবাৰী খননত খ্ৰীষ্টীয় আৰম্ভণিৰ শতিকাৱলীৰ নগৰীয়া বসতি আৰু মৃৎপাত্ৰ পোৱা গৈছে, আৰু ডিমা হাছাওৰ দাওজালি হাদিং নৱপ্ৰস্তৰ যুগৰ স্থান হিচাপে এই অঞ্চলৰ বসতি কেইবা হাজাৰ বছৰ পিছলৈ নিয়ে।",
      ]],
      ["ৰাজবংশসমূহ ক্ৰম অনুসৰি", [
        "বৰ্মণ বংশ (প্ৰায় ৩৫০-৬৫০ খ্ৰীষ্টাব্দ) শিলালিপি থকা প্ৰথম ৰাজবংশ। পুষ্যবৰ্মনৰপৰা আৰম্ভ হৈ ভাস্কৰবৰ্মনৰ সময়ত শিখৰত উপনীত হয়; তেওঁ হৰ্ষবৰ্ধন আৰু হিউয়েন চাঙৰ সমসাময়িক আছিল আৰু কুমাৰৰাজ উপাধি লৈ কামৰূপৰ প্ৰভাৱ বংগ আৰু বিহাৰলৈ বিস্তাৰ কৰিছিল।",
        "ইয়াৰ পিছত শালস্তম্ভ বা ম্লেচ্ছ বংশ (প্ৰায় ৬৫৫-৯০০ খ্ৰীষ্টাব্দ) — শালস্তম্ভ, হৰ্ষ, হৰ্জৰবৰ্মন, বনমালা আদি ৰজা, যিসকলে তেজপুৰ আৰু হয়ুংথল তাম্ৰশাসন প্ৰদান কৰিছিল। ৰাজধানী তেজপুৰ অঞ্চললৈ গুচি আহে।",
        "কামৰূপৰ পাল বংশ (প্ৰায় ৯০০-১১০০ খ্ৰীষ্টাব্দ) — ব্ৰহ্মপাল, ৰত্নপাল, ইন্দ্ৰপাল, হৰ্ষপাল আৰু জয়পাল — সৰু হৈ অহা ৰাজ্য শাসন কৰিছিল আৰু ব্ৰাহ্মণ্য তথা বৌদ্ধ প্ৰতিষ্ঠান দুয়োটাকে পৃষ্ঠপোষকতা কৰিছিল। ইয়াৰ পিছত কামৰূপ ভাগি পশ্চিমত কমতাৰ দৰে সৰু ৰাজ্য ওলায়।",
      ]],
      ["ৰাজ্য, ভূমি আৰু ধৰ্ম", [
        "শিলালিপিবোৰে ভূমিদান-কেন্দ্ৰিক ৰাজ্যৰ চিত্ৰ দেখুৱায়। ৰজাসকলে ব্ৰাহ্মণ আৰু মন্দিৰক গাঁও (অগ্ৰহাৰ) দান কৰিছিল, আৰু সেই দানপত্ৰত সীমা, কৰ আৰু হস্তান্তৰিত অধিকাৰ লিখা থাকে — সেয়ে এইবোৰ প্ৰশাসনৰ আটাইতকৈ ভাল প্ৰমাণ।",
        "ধৰ্ম বহুত্বপূৰ্ণ আছিল। কামাখ্যাত শাক্ত উপাসনা কেন্দ্ৰীয় আছিল, শৈৱ মন্দিৰ পৃষ্ঠপোষকতা পাইছিল, আৰু শিলালিপিত বৈষ্ণৱৰ উল্লেখ আছে; হিউয়েন চাঙৰ ‘দেৱ’ মন্দিৰে এই ব্ৰাহ্মণ্য পৰিৱেশহে বুজায়, বৌদ্ধ বিহাৰ নহয়।",
        "পৰীক্ষাৰ ফান্দ: বৰ্মণসকল প্ৰমাণ থকা প্ৰথম বংশ, পৰম্পৰাৰ প্ৰথম নহয়; ভাস্কৰবৰ্মন সপ্তম শতিকাৰ, পঞ্চম নহয়; আৰু একত্ৰিত কামৰূপৰ সমাপ্তি দ্বাদশ শতিকাত ধৰা হয় — তাৰ পিছত মানচিত্ৰ কমতা, চুতীয়া, কছাৰী আৰু আহোম অঞ্চলত ভাগ হয়।",
      ]],
    ],
  },

  "topic/gk/assam-history/medieval-assam-sec/medieval-assam": {
    en: [
      ["Four powers in one valley", [
        "Medieval Assam was never a single state. From the thirteenth century four powers shared the Brahmaputra valley and its borders: the Ahoms in the east, the Chutiyas at Sadiya, the Kacharis in the hills and the Barak valley, and the Kochs in the west after the break-up of Kamata. Between them lay the Bhuyan chieftaincies of the lower valley.",
        "Each had a different base. The Ahoms built a wet-rice state on the Dihing and Dikhou, the Chutiyas controlled the trade routes to Tibet, the Kacharis combined hill clan organisation with plains agriculture, and the Kochs inherited the Kamata plains and its Sanskritic court culture.",
      ]],
      ["How the Ahom state worked", [
        "The Ahoms entered Assam in 1228 under Sukapha and settled at Charaideo. Their state rested on the paik system: every adult male was enrolled in a khel and owed labour service, usually three months out of four, to the state. That gave the kings a large army and workforce without a cash economy.",
        "Officials such as the Borphukan, the Borbarua and the Barbaruah ran civil and military affairs, and the buranjis - court chronicles kept in Assamese - recorded reigns, wars and treaties. Revenue came in kind: rice, cloth, labour and forest produce.",
      ]],
      ["Battles and treaties that decided Assam", [
        "The Ahom expansion began with the annexation of Sadiya in 1523 under Suhungmung, followed by the defeat of the Kacharis in 1536. These two victories made the Ahoms the leading power of the valley.",
        "The long contest with the Mughals followed. Mir Jumla's invasion of 1662-63 reached Garhgaon and forced the treaty of Ghilajharighat, but the Ahoms recovered and defeated the Mughal army under Ram Singh at Saraighat in 1671, with Lachit Borphukan in command. By 1682 the Ahoms had retaken Guwahati, and the Manas river became the settled frontier.",
        "Exam traps: Saraighat is 1671, not 1667; the Ahom commander is Lachit Borphukan and the Mughal commander Ram Singh; the Chutiya conquest is 1523 and the Kachari defeat 1536. Keeping these four dates apart answers most questions on the period.",
      ]],
    ],
    as: [
      ["একেই উপত্যকাত চাৰিখন শক্তি", [
        "মধ্যযুগীয় অসম কেতিয়াও এখন একক ৰাজ্য নাছিল। ত্ৰয়োদশ শতিকাৰপৰা ব্ৰহ্মপুত্ৰ উপত্যকা আৰু ইয়াৰ সীমাত চাৰিখন শক্তিয়ে ভাগ বতৰা কৰিছিল: পূবত আহোম, সাদিয়াত চুতীয়া, পাহাৰ আৰু বৰাক উপত্যকাত কছাৰী, আৰু কমতা ভাগৰ পিছত পশ্চিমত কোচ। ইহঁতৰ মাজত তলৰ উপত্যকাৰ ভূঞা মূৰব্বীসকল আছিল।",
        "প্ৰতিখনৰ ভেটি বেলেগ আছিল। আহোমে দিহিং-ডিখৌ অঞ্চলত ভিজা-ধানৰ ৰাজ্য গঢ়িছিল, চুতীয়াই তিব্বতলৈ যোৱা বাণিজ্যপথ নিয়ন্ত্ৰণ কৰিছিল, কছাৰীয়ে পাহাৰৰ গোষ্ঠী-সংগঠন আৰু সমতলৰ কৃষি একেলগে ৰাখিছিল, আৰু কোচে কমতাৰ সমতল আৰু তাৰ সংস্কৃত ৰাজদৰবাৰৰ পৰম্পৰা উত্তৰাধিকাৰী হিচাপে পাইছিল।",
      ]],
      ["আহোম ৰাজ্য কেনেকৈ চলিছিল", [
        "১২২৮ চনত সুকাফাৰ নেতৃত্বত আহোমসকলে অসমত প্ৰৱেশ কৰি চৰাইদেউত বহি লয়। ৰাজ্যখন পাইক ব্যৱস্থাৰ ওপৰত ঠিয় আছিল: প্ৰতিজন প্ৰাপ্তবয়স্ক পুৰুষ এখন খেলত অন্তৰ্ভুক্ত হৈ ৰাজ্যক শ্ৰম-সেৱা দিব লাগিছিল, সাধাৰণতে চাৰি মাহৰ তিনি মাহ। ইয়াৰ ফলত নগদ অৰ্থনীতি নোহোৱাকৈয়ে ৰজাই ডাঙৰ সেনা আৰু শ্ৰমিক বাহিনী পাইছিল।",
        "বৰফুকন, বৰবৰুৱা, বৰবৰুৱা আদি বিষয়াসকলে অসামৰিক আৰু সামৰিক কাম চলাইছিল, আৰু অসমীয়া ভাষাত লিখা বুৰঞ্জীয়ে ৰাজত্ব, যুদ্ধ আৰু সন্ধি লিপিবদ্ধ কৰিছিল। ৰাজহ মূলতঃ সামগ্ৰী হিচাপে আহিছিল — ধান, কাপোৰ, শ্ৰম আৰু বনজ সামগ্ৰী।",
      ]],
      ["অসম নিৰ্ণয় কৰা যুদ্ধ আৰু সন্ধি", [
        "আহোম বিস্তাৰ আৰম্ভ হৈছিল ১৫২৩ চনত সুহুংমুঙৰ দ্বাৰা সাদিয়া জয়ৰ সৈতে, আৰু তাৰ পিছত ১৫৩৬ চনত কছাৰীসকলৰ পৰাজয়। এই দুটা বিজয়ে আহোমসকলক উপত্যকাৰ আগশাৰীৰ শক্তি কৰি তুলিছিল।",
        "তাৰ পিছত মোগলৰ সৈতে দীঘলীয়া সংঘৰ্ষ চলিল। ১৬৬২-৬৩ চনত মিৰজুমলাৰ অভিযানে গড়গাঁৱ পাই গিলাজাৰিঘাটৰ সন্ধি বলবৎ কৰাইছিল, কিন্তু আহোমে পুনৰ শক্তি সঞ্চয় কৰি ১৬৭১ চনত শৰাইঘাটত ৰাম সিঙৰ মোগল সেনাক পৰাস্ত কৰিছিল — সেনাপতি লাচিত বৰফুকন। ১৬৮২ চনলৈ আহোমে গুৱাহাটী উদ্ধাৰ কৰে আৰু মানাহ নদী সীমা হিচাপে স্থিৰ হয়।",
        "পৰীক্ষাৰ ফান্দ: শৰাইঘাট ১৬৭১, ১৬৬৭ নহয়; আহোম সেনাপতি লাচিত বৰফুকন, মোগল সেনাপতি ৰাম সিং; চুতীয়া জয় ১৫২৩ আৰু কছাৰী পৰাজয় ১৫৩৬। এই চাৰিটা তাৰিখ পৃথককৈ মনত থাকিলে এই যুগৰ প্ৰায় সকলো প্ৰশ্নৰ উত্তৰ ওলায়।",
      ]],
    ],
  },

  "topic/gk/assam-history/modern-assam-sec/modern-assam": {
    en: [
      ["1826 to 1947: the constitutional timeline", [
        "Modern Assam begins with the treaty of Yandabo in 1826, which ended the first Anglo-Burmese war and brought the Ahom kingdom under British control. In 1838, after the deposition of Purandar Singha, Assam was annexed to Bengal.",
        "The province was repeatedly reshuffled. In 1874 Assam became a Chief Commissioner's province, separated from Bengal. The partition of Bengal in 1905 attached it to Eastern Bengal, an arrangement annulled in 1911, and in 1912 Assam was restored as a separate province.",
        "Dyarchy arrived in 1921 under the Montagu-Chelmsford reforms, and the Government of India Act of 1935 made Assam an autonomous province with its own assembly. At independence in 1947 the Sylhet referendum separated most of Sylhet for East Pakistan, while Karimganj remained in India.",
      ]],
      ["Tea, oil, railways and migration", [
        "The colonial economy was built on three exports. Tea planting began in the 1830s and the Assam Company was formed in 1839; gardens spread across the Brahmaputra and Barak valleys with labour recruited from Bihar, Uttar Pradesh and Odisha under indenture contracts.",
        "Oil came next: Digboi saw drilling in the 1880s and a refinery in 1901, and coal, limestone and forest produce followed. Railways and steamer services in the 1880s tied the valley to Calcutta and made the export economy possible.",
        "The social effect was large. A Bengali clerical and professional class grew in the towns, Marwari traders financed the bazaars, and the plantation labour force became a permanent population. Assamese language and land rights became political questions precisely because of this demographic change.",
      ]],
      ["Language politics and the freedom movement", [
        "In 1836 Bengali replaced Assamese in schools and courts, and only in 1873 was Assamese restored. That forty-year gap shaped Assamese public life: the Assamese language movement, the press, and later the Assam Association of 1903 all grew from it.",
        "The Assam Pradesh Congress Committee was formed in 1921, and Assam joined the non-cooperation, civil disobedience and quit India movements. Gopinath Bordoloi, Tarun Ram Phukan, Ambikagiri Raichoudhury and Bishnu Ram Medhi were the central figures.",
        "After 1947 the state was reorganised twice: the Assam Official Language Act of 1960 made Assamese the state language, and the North-Eastern Areas (Reorganisation) Act of 1972 created Meghalaya, Mizoram and Arunachal Pradesh out of Assam's territory. The Assam Accord of 1985 closed the foreigners' movement with a cut-off date for citizenship.",
      ]],
    ],
    as: [
      ["১৮২৬ ৰপৰা ১৯৪৭ লৈ: সাংবিধানিক কালানুক্ৰম", [
        "আধুনিক অসম আৰম্ভ হয় ১৮২৬ চনৰ য়াণ্ডাবু সন্ধিৰপৰা, যিয়ে প্ৰথম ইংৰাজ-বৰ্মা যুদ্ধৰ অন্ত পেলাই আহোম ৰাজ্য ব্ৰিটিছৰ অধীনলৈ আনে। ১৮৩৮ চনত পুৰন্দৰ সিংহক সিংহাসনচ্যুত কৰাৰ পিছত অসম বংগৰ সৈতে সংযুক্ত হয়।",
        "প্ৰদেশখন বাৰে বাৰে সলনি হৈছিল। ১৮৭৪ চনত অসম বংগৰপৰা পৃথক হৈ মুখ্য আয়ুক্তৰ প্ৰদেশ হয়। ১৯০৫ চনৰ বংগ বিভাজনে ইয়াক পূব বংগৰ সৈতে সংযুক্ত কৰে, ১৯১১ চনত সেই ব্যৱস্থা বাতিল হয়, আৰু ১৯১২ চনত অসম পুনৰ পৃথক প্ৰদেশ হিচাপে পুনঃস্থাপিত হয়।",
        "১৯২১ চনত মন্টেগু-চেমছফৰ্ড সংস্কাৰৰ অধীনত দ্বৈত শাসন আৰম্ভ হয়, আৰু ১৯৩৫ চনৰ ভাৰত শাসন আইনে অসমক নিজা বিধানসভাৰ সৈতে স্বায়ত্তশাসিত প্ৰদেশ কৰে। ১৯৪৭ চনত স্বাধীনতাৰ সময়ত চিলেট গণভোটে চিলেটৰ বেছিভাগ পূব পাকিস্তানলৈ নিয়ে, কিন্তু কৰিমগঞ্জ ভাৰতত থাকে।",
      ]],
      ["চাহ, তেল, ৰে’ল আৰু প্ৰব্ৰজন", [
        "ঔপনিৱেশিক অৰ্থনীতি তিনিটা ৰপ্তানিৰ ওপৰত ঠিয় আছিল। ১৮৩০ৰ দশকত চাহ খেতি আৰম্ভ হয় আৰু ১৮৩৯ চনত অসম কোম্পানী গঠিত হয়; বিহাৰ, উত্তৰ প্ৰদেশ আৰু উৰিষ্যাৰপৰা চুক্তিবদ্ধ শ্ৰমিক অনাই বাগানবোৰ ব্ৰহ্মপুত্ৰ আৰু বৰাক উপত্যকাত বিয়পি পৰে।",
        "তাৰ পিছত তেল আহে: ১৮৮০ৰ দশকত ডিগবৈত খনন আৰম্ভ হয় আৰু ১৯০১ চনত শোধনাগাৰ স্থাপিত হয়; কয়লা, চূণশিল আৰু বনজ সামগ্ৰীয়েও গুৰুত্ব পায়। ১৮৮০ৰ দশকৰ ৰে’ল আৰু ষ্টিমাৰ সেৱাই উপত্যকাক কলিকতাৰ সৈতে জড়াই ৰপ্তানি অৰ্থনীতি সম্ভৱ কৰি তোলে।",
        "সামাজিক প্ৰভাৱ ডাঙৰ আছিল। নগৰত বঙালী কৰ্মচাৰী আৰু পেছাদাৰী শ্ৰেণী গঢ় লয়, মাৰোৱাৰী ব্যৱসায়ীয়ে বজাৰৰ অৰ্থসংস্থান যোগায়, আৰু বাগানৰ শ্ৰমিকসকল স্থায়ী জনসংখ্যা হৈ পৰে। অসমীয়া ভাষা আৰু ভূমি-অধিকাৰ ৰাজনৈতিক প্ৰশ্ন হোৱাৰ মূল কাৰণ এই জনসংখ্যা-পৰিৱৰ্তন।",
      ]],
      ["ভাষা-ৰাজনীতি আৰু স্বাধীনতা সংগ্ৰাম", [
        "১৮৩৬ চনত বিদ্যালয় আৰু আদালতত অসমীয়াৰ সলনি বঙালী প্ৰৱৰ্তিত হয়, আৰু ১৮৭৩ চনতহে অসমীয়া পুনঃস্থাপিত হয়। এই চল্লিশ বছৰৰ ব্যৱধানেই অসমীয়া ৰাজনৈতিক জীৱন গঢ় দিছিল: ভাষা আন্দোলন, সংবাদপত্ৰ, আৰু পিছত ১৯০৩ চনৰ অসম এছ’চিয়েশ্যন এই সময়ৰে উৎপন্ন।",
        "১৯২১ চনত অসম প্ৰদেশ কংগ্ৰেছ কমিটি গঠিত হয়, আৰু অসমে অসহযোগ, আইন অমান্য আৰু ভাৰত ছাড়ো আন্দোলনত অংশ লয়। গোপীনাথ বৰদলৈ, তৰুণৰাম ফুকন, অম্বিকাগিৰি ৰায়চৌধুৰী আৰু বিষ্ণুৰাম মেধি এই পৰ্যায়ৰ কেন্দ্ৰীয় ব্যক্তিত্ব।",
        "১৯৪৭ চনৰ পিছত ৰাজ্যখন দুবাৰ পুনৰ্গঠিত হয়: ১৯৬০ চনৰ অসম চৰকাৰী ভাষা আইনে অসমীয়াক ৰাজ্যিক ভাষা কৰে, আৰু ১৯৭২ চনৰ উত্তৰ-পূব অঞ্চল (পুনৰ্গঠন) আইনে অসমৰ ভূখণ্ডৰপৰা মেঘালয়, মিজোৰাম আৰু অৰুণাচল প্ৰদেশ সৃষ্টি কৰে। ১৯৮৫ চনৰ অসম চুক্তিয়ে বিদেশী-বিৰোধী আন্দোলনৰ অন্ত পেলায়।",
      ]],
    ],
  },

  "topic/gk/art-culture/assam-art-culture-sec/bihu-festival": {
    en: [
      ["Three Bihus, three seasons", [
        "Bihu is not one festival but three, each tied to a point in the agricultural year. Bohag Bihu, also called Rongali Bihu, falls in mid-April and marks the Assamese new year and the start of the sowing season. Kati Bihu, or Kongali Bihu, falls in mid-October, when the fields are still green and the granary is empty, and lamps are lit at the tulsi plant and in the fields. Magh Bihu, or Bhogali Bihu, falls in mid-January after the harvest and is the season of feasting.",
        "The names come from the Assamese months: Bohag, Kati and Magh. That is why the same festival appears under two names in most questions - a calendar name and a descriptive name.",
      ]],
      ["Rituals, instruments and dress", [
        "Rongali Bihu begins with Goru Bihu, when cattle are bathed and worshipped, and continues with Husori, groups of singers who visit households. The Bihu dance, performed by young men and women in the open, is accompanied by the dhol, the pepa made from buffalo horn, the toka, the gagana and the sutuli.",
        "Dress matters: the women wear the mekhela chador and the men the dhoti and gamosa, and the gamosa itself is the emblem of the festival. Bhogali Bihu is built around the uruka night, when families stay awake in the fields, and the Meji, a bamboo and thatch structure burned at dawn to mark the end of the harvest year.",
        "Food is part of the ritual: pitha made of rice flour with til or coconut, laru, curd and rice cakes are prepared in every household, and community feasts follow the burning of the Meji.",
      ]],
      ["What Bihu means, and the traps", [
        "Historically Bihu belongs to the fertility and harvest cycle that predates the Ahom state, and it later absorbed Vaishnava and folk elements. In the twentieth century it moved onto the stage: Mukoli Bihu, Bihu song competitions and urban Bihu sammelans turned a village festival into a marker of Assamese identity.",
        "Bihu songs (Bihu geet) carry love, satire and social comment, and the Husori tradition keeps a collective, door-to-door form alive alongside the stage performances.",
        "Exam traps: Rongali is Bohag (April), Kongali is Kati (October), Bhogali is Magh (January). The Meji belongs to Bhogali, Husori to Rongali, and the Bihu dance to Rongali. The Kati Bihu is the one with lamps and an empty granary, not the harvest feast.",
      ]],
    ],
    as: [
      ["তিনিটা বিহু, তিনি ঋতু", [
        "বিহু এটা উৎসৱ নহয়, তিনিটা — প্ৰতিটোৱে কৃষি বছৰৰ এটা বিন্দুৰ সৈতে জড়িত। ব’হাগ বিহু, যাক ৰঙালী বিহুও বোলে, এপ্ৰিলৰ মাজভাগত পৰে আৰু অসমীয়া নৱবৰ্ষ তথা বোৱা-কটাৰ আৰম্ভণি বুজায়। কাতি বিহু বা কঙালী বিহু অক্টোবৰৰ মাজভাগত পৰে, যেতিয়া পথাৰ সেউজীয়া কিন্তু ভঁৰাল ৰিক্ত — তেতিয়া তুলসীৰ গুৰিত আৰু পথাৰত চাকি জ্বলোৱা হয়। মাঘ বিহু বা ভোগালী বিহু জানুৱাৰীৰ মাজভাগত, শস্য চপোৱাৰ পিছত, ভোজৰ উৎসৱ।",
        "নামবোৰ অসমীয়া মাহৰপৰা আহিছে: ব’হাগ, কাতি, মাঘ। সেয়ে প্ৰশ্নত এখন উৎসৱ দুটা নামেৰে দেখা যায় — পঞ্জিকা-নাম আৰু বৰ্ণনামূলক নাম।",
      ]],
      ["ৰীতি, বাদ্যযন্ত্ৰ আৰু পোছাক", [
        "ৰঙালী বিহু আৰম্ভ হয় গৰু বিহুৰে, য’ত গৰুক গা ধুৱাই পূজা কৰা হয়, আৰু তাৰ পিছত হুচৰি — গীত গোৱা দলে ঘৰে ঘৰে যায়। মুকলি ঠাইত যুৱক-যুৱতীয়ে পৰিৱেশন কৰা বিহু নৃত্যৰ লগত ঢোল, ম’হৰ শিঙৰ পেঁপা, টোকা, গগণা আৰু সুতুলি বাজে।",
        "পোছাকো গুৰুত্বপূৰ্ণ: মহিলাই মেখেলা-চাদৰ আৰু পুৰুষে ধুতি-গামোচা পিন্ধে, আৰু গামোচাখনেই উৎসৱৰ প্ৰতীক। ভোগালী বিহু উৰুকা ৰাতিৰ ওপৰত কেন্দ্ৰিত — পৰিয়ালে পথাৰত জাগি থাকে — আৰু ৰাতিপুৱা মেজি জ্বলাই শস্য-বছৰৰ সমাপ্তি ঘোষণা কৰা হয়।",
        "খাদ্যও ৰীতিৰ অংশ: চাউলৰ গুড়িৰ সৈতে তিল বা নাৰিকল দি পিঠা, লাৰু, দৈ আৰু চাউলৰ পিঠা প্ৰতিঘৰে তৈয়াৰ কৰা হয়, আৰু মেজি জ্বলোৱাৰ পিছত সমূহীয়া ভোজ হয়।",
      ]],
      ["বিহুৰ অৰ্থ, আৰু পৰীক্ষাৰ ফান্দ", [
        "ঐতিহাসিকভাৱে বিহু আহোম ৰাজ্যৰো আগৰ উৰ্বৰতা আৰু শস্য-চক্ৰৰ সৈতে জড়িত, আৰু পিছত ই বৈষ্ণৱ তথা লোক-উপাদান আত্মসাৎ কৰে। বিংশ শতিকাত ই মঞ্চলৈ আহে: মুকলি বিহু, বিহু গীতৰ প্ৰতিযোগিতা আৰু নগৰীয়া বিহু সমাৰোহে গাঁৱৰ উৎসৱক অসমীয়া পৰিচয়ৰ প্ৰতীক কৰি তোলে।",
        "বিহু গীতে প্ৰেম, ব্যংগ আৰু সামাজিক সমালোচনা কঢ়িয়ায়, আৰু হুচৰি পৰম্পৰাই মঞ্চৰ সমান্তৰালভাৱে সমূহীয়া, ঘৰে-ঘৰে যোৱা ৰূপটো জীয়াই ৰাখিছে।",
        "পৰীক্ষাৰ ফান্দ: ৰঙালী = ব’হাগ (এপ্ৰিল), কঙালী = কাতি (অক্টোবৰ), ভোগালী = মাঘ (জানুৱাৰী)। মেজি ভোগালীৰ, হুচৰি ৰঙালীৰ, আৰু বিহু নৃত্য ৰঙালীৰ। চাকি জ্বলোৱা আৰু ৰিক্ত ভঁৰাল কাতি বিহুৰ — শস্য-ভোজৰ নহয়।",
      ]],
    ],
  },
};

const FAQ_EN = /<h3[^>]*>\s*Frequently Asked Questions\s*<\/h3>/i;
const FAQ_AS = /<h3[^>]*>\s*সঘনাই সোধা প্ৰশ্ন\s*<\/h3>/;

function extraSpan(html) {
  const start = html.search(/<section[^>]*class="[^"]*axo-extra-content/);
  if (start < 0) return null;
  let depth = 0;
  const re = /<section\b|<\/section>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === "<section" ? 1 : -1;
    if (depth === 0) return [start, m.index + m[0].length];
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

for (const [rel, data] of Object.entries(DATA)) {
  const targets = [[rel, "both"], ["as/" + rel, "as"]];
  for (const [target, mode] of targets) {
    const file = path.join(ROOT, target, "index.html");
    if (!fs.existsSync(file)) { report.push(`MISSING ${target}`); continue; }
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("<!-- axo-deep2:1 -->")) { report.push(`skip ${target}`); continue; }

    let span = extraSpan(html);
    if (!span) { report.push(`NO-EXTRA ${target}`); continue; }
    const asAt = FAQ_AS.exec(html.slice(span[0], span[1]));
    if (!asAt) { report.push(`NO-FAQ ${target}`); continue; }
    let at = span[0] + asAt.index;
    html = html.slice(0, at) + renderSections("as", data.as) + "\n      " + html.slice(at);

    if (mode === "both") {
      span = extraSpan(html);
      const enAt = FAQ_EN.exec(html.slice(span[0], span[1]));
      if (!enAt) { report.push(`NO-EN-FAQ ${target}`); continue; }
      at = span[0] + enAt.index;
      html = html.slice(0, at) + renderSections("en", data.en) + "\n      " + html.slice(at);
    }

    html = html.replace("</main>", "</main>\n<!-- axo-deep2:1 -->");
    if (!DRY) fs.writeFileSync(file, html);
    changed++;
    report.push(`ok ${target}`);
  }
}

console.log(report.join("\n"));
console.log(`pages deepened (batch 2): ${changed}`);
