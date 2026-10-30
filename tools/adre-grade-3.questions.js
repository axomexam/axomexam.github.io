#!/usr/bin/env node
"use strict";
/* ============================================================
   axomexam — tools/adre-grade-3.questions.js
   Question banks for the ADRE 3.0 Grade III book, keyed by leaf
   sub-category id. Each topic's whole bank is written as a single
   array by tools/build-adre-grade-3.js to
   data/exams/adre-grade-3/<section>/<topic>/question-001.json.
   Shape of one question:
     {
       id, q: {en, as},
       options: [{en, as} x4],
       correct: <0..3>,
       explanation: {en, as}
     }
   ============================================================ */
module.exports = {
 "ahom-koch-kingdoms": [
  {
   "id": "ahom-koch-kingdoms-001",
   "q": {
    "en": "Who founded the Ahom kingdom in Assam?",
    "as": "অসমত আহোম ৰাজ্য কোনে প্ৰতিষ্ঠা কৰিছিল?"
   },
   "options": [
    {
     "en": "Sukapha",
     "as": "চুকাফা"
    },
    {
     "en": "Sukhrungphaa",
     "as": "চুখ্ৰুংফা"
    },
    {
     "en": "Gadadhar Singha",
     "as": "গদাধৰ সিংহ"
    },
    {
     "en": "Rudra Singha",
     "as": "ৰুদ্ৰ সিংহ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sukapha established the Ahom kingdom in 1228.",
    "as": "চুকাফাই ১২২৮ চনত আহোম ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"
   }
  },
  {
   "id": "ahom-koch-kingdoms-002",
   "q": {
    "en": "In which year was the Battle of Saraighat fought?",
    "as": "শৰাইঘাটৰ যুদ্ধ কোন বছৰত হৈছিল?"
   },
   "options": [
    {
     "en": "1615",
     "as": "১৬১৫"
    },
    {
     "en": "1663",
     "as": "১৬৬৩"
    },
    {
     "en": "1671",
     "as": "১৬৭১"
    },
    {
     "en": "1682",
     "as": "১৬৮২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The Battle of Saraighat was fought in 1671 between the Ahoms and the Mughals.",
    "as": "শৰাইঘাটৰ যুদ্ধ ১৬৭১ চনত আহোম আৰু মোগলৰ মাজত হৈছিল।"
   }
  },
  {
   "id": "ahom-koch-kingdoms-003",
   "q": {
    "en": "Who commanded the Ahom army at the Battle of Saraighat?",
    "as": "শৰাইঘাটৰ যুদ্ধত আহোম সেনাক কোনে নেতৃত্ব দিছিল?"
   },
   "options": [
    {
     "en": "Lachit Borphukan",
     "as": "লাচিত বৰফুকন"
    },
    {
     "en": "Momai Tamuli",
     "as": "মোমাই তামুলী"
    },
    {
     "en": "Atan Buragohain",
     "as": "আতন বৰগোহাঁই"
    },
    {
     "en": "Chilarai",
     "as": "চিলাৰায়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Lachit Borphukan led the Ahom forces to victory at Saraighat.",
    "as": "লাচিত বৰফুকনে শৰাইঘাটত আহোম সেনাক জয়লাভলৈ নেতৃত্ব দিছিল।"
   }
  },
  {
   "id": "ahom-koch-kingdoms-004",
   "q": {
    "en": "The Koch kingdom rose to power under —",
    "as": "কোচ ৰাজ্য কাৰ অধীনত শক্তিশালী হৈ উঠিছিল —"
   },
   "options": [
    {
     "en": "Viswa Singha",
     "as": "বিশ্ব সিংহ"
    },
    {
     "en": "Naranarayana",
     "as": "নৰনাৰায়ণ"
    },
    {
     "en": "Chilarai",
     "as": "চিলাৰায়"
    },
    {
     "en": "Raghu Dev",
     "as": "ৰঘু দেৱ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Viswa Singha founded the Koch kingdom in the western part of Assam.",
    "as": "বিশ্ব সিংহই অসমৰ পশ্চিম অংশত কোচ ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"
   }
  }
 ],
 "analogy": [
  {
   "id": "analogy-001",
   "q": {
    "en": "Doctor : Hospital : : Teacher : ?",
    "as": "ডাক্তৰ : চিকিৎসালয় : : শিক্ষক : ?"
   },
   "options": [
    {
     "en": "Book",
     "as": "কিতাপ"
    },
    {
     "en": "School",
     "as": "বিদ্যালয়"
    },
    {
     "en": "Student",
     "as": "শিক্ষাৰ্থী"
    },
    {
     "en": "Pen",
     "as": "কলম"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A doctor works in a hospital and a teacher works in a school.",
    "as": "ডাক্তৰে চিকিৎসালয়ত কাম কৰে আৰু শিক্ষকে বিদ্যালয়ত কাম কৰে।"
   }
  },
  {
   "id": "analogy-002",
   "q": {
    "en": "Pen : Write : : Knife : ?",
    "as": "কলম : লিখা : : ছুৰী : ?"
   },
   "options": [
    {
     "en": "Sharp",
     "as": "তীক্ষ্ণ"
    },
    {
     "en": "Cut",
     "as": "কটা"
    },
    {
     "en": "Metal",
     "as": "ধাতু"
    },
    {
     "en": "Kitchen",
     "as": "পাকঘৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A pen is used to write and a knife is used to cut.",
    "as": "কলম লিখিবলৈ ব্যৱহাৰ কৰা হয় আৰু ছুৰী কাটিবলৈ ব্যৱহাৰ কৰা হয়।"
   }
  },
  {
   "id": "analogy-003",
   "q": {
    "en": "Bird : Fly : : Fish : ?",
    "as": "চৰাই : উৰা : : মাছ : ?"
   },
   "options": [
    {
     "en": "Swim",
     "as": "সাঁতোৰা"
    },
    {
     "en": "Walk",
     "as": "খোজ কঢ়া"
    },
    {
     "en": "Run",
     "as": "দৌৰা"
    },
    {
     "en": "Jump",
     "as": "জপিওৱা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A bird flies and a fish swims.",
    "as": "চৰাই উৰে আৰু মাছে সাঁতোৰে।"
   }
  },
  {
   "id": "analogy-004",
   "q": {
    "en": "Cow : Calf : : Dog : ?",
    "as": "গাই : পোৱালী : : কুকুৰ : ?"
   },
   "options": [
    {
     "en": "Puppy",
     "as": "কুকুৰৰ পোৱালী"
    },
    {
     "en": "Kitten",
     "as": "মেকুৰীৰ পোৱালী"
    },
    {
     "en": "Cub",
     "as": "জন্তুৰ পোৱালী"
    },
    {
     "en": "Chick",
     "as": "চৰাইৰ পোৱালী"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The young one of a cow is a calf and of a dog is a puppy.",
    "as": "গাইৰ পোৱালী পোৱালী আৰু কুকুৰৰ পোৱালী puppy।"
   }
  }
 ],
 "ancient-assam": [
  {
   "id": "ancient-assam-001",
   "q": {
    "en": "What was the ancient name of Assam?",
    "as": "অসমৰ প্ৰাচীন নাম কি আছিল?"
   },
   "options": [
    {
     "en": "Kamarupa",
     "as": "কমৰূপ"
    },
    {
     "en": "Pragjyotisha only",
     "as": "কেৱল প্ৰাগজ্যোতিষ"
    },
    {
     "en": "Ahom",
     "as": "আহোম"
    },
    {
     "en": "Kamata",
     "as": "কামতা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Ancient Assam was known as Kamarupa, a name found in the Allahabad pillar inscription of Samudragupta.",
    "as": "প্ৰাচীন অসমক কমৰূপ বোলা হৈছিল, এই নাম সমুদ্ৰগুপ্তৰ এলাহাবাদ স্তম্ভ লিপিত পোৱা যায়।"
   }
  },
  {
   "id": "ancient-assam-002",
   "q": {
    "en": "Who founded the Varman dynasty of Kamarupa?",
    "as": "কমৰূপৰ বৰ্মন বংশ কোনে প্ৰতিষ্ঠা কৰিছিল?"
   },
   "options": [
    {
     "en": "Bhaskarvarman",
     "as": "ভাস্কৰবৰ্মন"
    },
    {
     "en": "Pushyavarman",
     "as": "পুষ্যভৰ্মন"
    },
    {
     "en": "Susthitavarman",
     "as": "সুষ্ঠিতবৰ্মন"
    },
    {
     "en": "Mahendravarman",
     "as": "মহেন্দ্ৰবৰ্মন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Pushyavarman founded the Varman line and was its first ruler.",
    "as": "পুষ্যভৰ্মনে বৰ্মন বংশ প্ৰতিষ্ঠা কৰিছিল আৰু তেওঁ ইয়াৰ প্ৰথম ৰজা আছিল।"
   }
  },
  {
   "id": "ancient-assam-003",
   "q": {
    "en": "Which Chinese traveller visited the court of Bhaskarvarman?",
    "as": "কোনজন চীনা পৰিব্ৰাজকে ভাস্কৰবৰ্মনৰ ৰাজসভালৈ আহিছিল?"
   },
   "options": [
    {
     "en": "Fa-Hien",
     "as": "ফা-হিয়েন"
    },
    {
     "en": "Hiuen Tsang",
     "as": "হিউয়েন ছাঙ"
    },
    {
     "en": "I-Tsing",
     "as": "ই-চিং"
    },
    {
     "en": "Marco Polo",
     "as": "মাৰ্কো প'ল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Hiuen Tsang visited Kamarupa during the reign of Bhaskarvarman.",
    "as": "ভাস্কৰবৰ্মনৰ ৰাজত্বকালত হিউয়েন ছাঙে কমৰূপ ভ্ৰমণ কৰিছিল।"
   }
  },
  {
   "id": "ancient-assam-004",
   "q": {
    "en": "The Salastambha dynasty ruled which region of ancient Assam?",
    "as": "শালস্তম্ভ বংশই প্ৰাচীন অসমৰ কোন অঞ্চল শাসন কৰিছিল?"
   },
   "options": [
    {
     "en": "Kamarupa",
     "as": "কমৰূপ"
    },
    {
     "en": "Barak valley only",
     "as": "কেৱল বৰাক উপত্যকা"
    },
    {
     "en": "Koch Bihar",
     "as": "কোচ বিহাৰ"
    },
    {
     "en": "Jaintia hills",
     "as": "জয়ন্তীয়া পাহাৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Salastambha dynasty ruled Kamarupa after the Varmans.",
    "as": "বৰ্মনসকলৰ পিছত শালস্তম্ভ বংশই কমৰূপ শাসন কৰিছিল।"
   }
  }
 ],
 "articles-determiners": [
  {
   "id": "articles-determiners-001",
   "q": {
    "en": "She waited for — hour.",
    "as": "তাই — ঘণ্টা অপেক্ষা কৰিলে।"
   },
   "options": [
    {
     "en": "a",
     "as": "a"
    },
    {
     "en": "an",
     "as": "an"
    },
    {
     "en": "the",
     "as": "the"
    },
    {
     "en": "no article",
     "as": "কোনো আৰ্টিকল নাই"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Hour begins with a vowel sound, so an is used.",
    "as": "Hour স্বৰধ্বনিৰে আৰম্ভ হয়, গতিকে an ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "articles-determiners-002",
   "q": {
    "en": "He is — honest man.",
    "as": "তেওঁ — সৎ মানুহ।"
   },
   "options": [
    {
     "en": "a",
     "as": "a"
    },
    {
     "en": "an",
     "as": "an"
    },
    {
     "en": "the",
     "as": "the"
    },
    {
     "en": "no article",
     "as": "কোনো আৰ্টিকল নাই"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The h in honest is silent, so the word begins with a vowel sound.",
    "as": "Honest ৰ h নীৰৱ, গতিকে শব্দটো স্বৰধ্বনিৰে আৰম্ভ হয়।"
   }
  },
  {
   "id": "articles-determiners-003",
   "q": {
    "en": "— Ganga is a holy river.",
    "as": "— গংগা এটা পবিত্ৰ নদী।"
   },
   "options": [
    {
     "en": "A",
     "as": "A"
    },
    {
     "en": "An",
     "as": "An"
    },
    {
     "en": "The",
     "as": "The"
    },
    {
     "en": "No article",
     "as": "কোনো আৰ্টিকল নাই"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The definite article the is used before the names of rivers.",
    "as": "নদীৰ নামৰ আগত নিৰ্দিষ্ট আৰ্টিকল the ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "articles-determiners-004",
   "q": {
    "en": "Choose the correct sentence.",
    "as": "শুদ্ধ বাক্যটো বাছনি কৰক।"
   },
   "options": [
    {
     "en": "He is a university student.",
     "as": "He is a university student."
    },
    {
     "en": "He is an university student.",
     "as": "He is an university student."
    },
    {
     "en": "He is the university student.",
     "as": "He is the university student."
    },
    {
     "en": "He is university student.",
     "as": "He is university student."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "University begins with the consonant sound y, so a is correct.",
    "as": "University ব্যঞ্জনধ্বনি y ৰে আৰম্ভ হয়, গতিকে a শুদ্ধ।"
   }
  }
 ],
 "assam-folk-culture": [
  {
   "id": "assam-folk-culture-001",
   "q": {
    "en": "How many times is Bihu celebrated in a year?",
    "as": "বছৰত কিমানবাৰ বিহু পালন কৰা হয়?"
   },
   "options": [
    {
     "en": "Once",
     "as": "এবাৰ"
    },
    {
     "en": "Twice",
     "as": "দুবাৰ"
    },
    {
     "en": "Three times",
     "as": "তিনিবাৰ"
    },
    {
     "en": "Four times",
     "as": "চাৰিবাৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Bihu is celebrated three times a year as Bohag, Kati and Magh Bihu.",
    "as": "বছৰত তিনিবাৰ বিহু পালন কৰা হয় — ব'হাগ, কাতি আৰু মাঘ বিহু হিচাপে।"
   }
  },
  {
   "id": "assam-folk-culture-002",
   "q": {
    "en": "Which Bihu marks the Assamese new year?",
    "as": "কোন বিহুৱে অসমীয়া নতুন বছৰৰ সূচনা কৰে?"
   },
   "options": [
    {
     "en": "Bohag Bihu",
     "as": "ব'হাগ বিহু"
    },
    {
     "en": "Kati Bihu",
     "as": "কাতি বিহু"
    },
    {
     "en": "Magh Bihu",
     "as": "মাঘ বিহু"
    },
    {
     "en": "Bhogali Bihu",
     "as": "ভোগালী বিহু"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Bohag Bihu, celebrated in mid-April, marks the Assamese new year.",
    "as": "এপ্ৰিলৰ মাজভাগত পালন কৰা ব'হাগ বিহুৱে অসমীয়া নতুন বছৰৰ সূচনা কৰে।"
   }
  },
  {
   "id": "assam-folk-culture-003",
   "q": {
    "en": "Who founded the Vaishnava movement in Assam?",
    "as": "অসমত বৈষ্ণৱ আন্দোলন কোনে প্ৰতিষ্ঠা কৰিছিল?"
   },
   "options": [
    {
     "en": "Madhavdeva",
     "as": "মাধৱদেৱ"
    },
    {
     "en": "Srimanta Sankardeva",
     "as": "শ্ৰীমন্ত শংকৰদেৱ"
    },
    {
     "en": "Damodardeva",
     "as": "দামোদৰদেৱ"
    },
    {
     "en": "Harideva",
     "as": "হৰিদেৱ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Srimanta Sankardeva founded the Vaishnava movement in Assam.",
    "as": "শ্ৰীমন্ত শংকৰদেৱে অসমত বৈষ্ণৱ আন্দোলন প্ৰতিষ্ঠা কৰিছিল।"
   }
  },
  {
   "id": "assam-folk-culture-004",
   "q": {
    "en": "Sattriya dance developed in which institutions?",
    "as": "সত্ৰীয়া নৃত্য কোন প্ৰতিষ্ঠানত বিকশিত হৈছিল?"
   },
   "options": [
    {
     "en": "Sattras",
     "as": "সত্ৰ"
    },
    {
     "en": "Namghars only",
     "as": "কেৱল নামঘৰ"
    },
    {
     "en": "Temples of Kamakhya",
     "as": "কামাখ্যাৰ মন্দিৰ"
    },
    {
     "en": "Royal courts",
     "as": "ৰাজদৰবাৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sattriya dance developed in the Sattras, the monastic institutions of Assam.",
    "as": "সত্ৰীয়া নৃত্য অসমৰ সত্ৰ নামৰ ধৰ্মীয় প্ৰতিষ্ঠানত বিকশিত হৈছিল।"
   }
  }
 ],
 "assam-freedom-struggle": [
  {
   "id": "assam-freedom-struggle-001",
   "q": {
    "en": "Who was hanged in 1858 for his role in the revolt of 1857 in Assam?",
    "as": "অসমত ১৮৫৭ চনৰ বিদ্ৰোহত অংশ লোৱাৰ বাবে ১৮৫৮ চনত কাক ফাঁচী দিয়া হৈছিল?"
   },
   "options": [
    {
     "en": "Maniram Dewan",
     "as": "মণিৰাম দেৱান"
    },
    {
     "en": "Kushal Konwar",
     "as": "কুশল কোঁৱৰ"
    },
    {
     "en": "Gopinath Bordoloi",
     "as": "গোপীনাথ বৰদলৈ"
    },
    {
     "en": "Tarun Ram Phukan",
     "as": "তাৰুণ ৰাম ফুকন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Maniram Dewan was hanged in 1858 for his part in the revolt of 1857.",
    "as": "১৮৫৭ চনৰ বিদ্ৰোহত অংশ লোৱাৰ বাবে ১৮৫৮ চনত মণিৰাম দেৱানক ফাঁচী দিয়া হৈছিল।"
   }
  },
  {
   "id": "assam-freedom-struggle-002",
   "q": {
    "en": "Kanaklata Barua was martyred during which movement?",
    "as": "কনকলতা বৰুৱা কোন আন্দোলনত শ্বহীদ হৈছিল?"
   },
   "options": [
    {
     "en": "Non-Cooperation Movement",
     "as": "অসহযোগ আন্দোলন"
    },
    {
     "en": "Civil Disobedience Movement",
     "as": "আইন অমান্য আন্দোলন"
    },
    {
     "en": "Quit India Movement",
     "as": "ভাৰত ছাড়ো আন্দোলন"
    },
    {
     "en": "Swadeshi Movement",
     "as": "স্বদেশী আন্দোলন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Kanaklata Barua died in the Quit India Movement of 1942.",
    "as": "কনকলতা বৰুৱা ১৯৪২ চনৰ ভাৰত ছাড়ো আন্দোলনত শ্বহীদ হৈছিল।"
   }
  },
  {
   "id": "assam-freedom-struggle-003",
   "q": {
    "en": "The Assam Association, an early political organisation of the province, was founded in —",
    "as": "অসমৰ প্ৰাৰম্ভিক ৰাজনৈতিক সংগঠন অসম এছ'চিয়েছন প্ৰতিষ্ঠা হৈছিল —"
   },
   "options": [
    {
     "en": "1855",
     "as": "১৮৫৫"
    },
    {
     "en": "1876",
     "as": "১৮৭৬"
    },
    {
     "en": "1890",
     "as": "১৮৯০"
    },
    {
     "en": "1905",
     "as": "১৯০৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Assam Association was formed in 1876 to place local grievances before the government.",
    "as": "স্থানীয় সমস্যা চৰকাৰৰ আগত দাঙি ধৰিবলৈ ১৮৭৬ চনত অসম এছ'চিয়েছন গঠন হৈছিল।"
   }
  },
  {
   "id": "assam-freedom-struggle-004",
   "q": {
    "en": "Kanaklata Barua was shot dead while leading a procession at —",
    "as": "কনকলতা বৰুৱাক কোন ঠাইত শোভাযাত্ৰাৰ নেতৃত্ব দি গুলীয়াই হত্যা কৰা হৈছিল?"
   },
   "options": [
    {
     "en": "Gohpur",
     "as": "গহপুৰ"
    },
    {
     "en": "Patharughat",
     "as": "পথাৰুঘাট"
    },
    {
     "en": "Saraighat",
     "as": "শৰাইঘাট"
    },
    {
     "en": "Dhekiajuli",
     "as": "ঢেকীয়াজুলি"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Kanaklata Barua, the 17-year-old martyr, was shot at Gohpur police station on 20 September 1942.",
    "as": "১৭ বছৰীয়া শ্বহীদ কনকলতা বৰুৱাক ১৯৪২ চনৰ ২০ ছেপ্তেম্বৰত গহপুৰ আৰক্ষী থানাত গুলীয়াই হত্যা কৰা হৈছিল।"
   }
  }
 ],
 "assam-india-current-affairs": [
  {
   "id": "assam-india-current-affairs-001",
   "q": {
    "en": "Current affairs questions in ADRE Grade III are drawn from the events of about the last —",
    "as": "ADRE গ্ৰেড III ৰ সাম্প্ৰতিক ঘটনাৱলীৰ প্ৰশ্ন প্ৰায় বিগত কিমান সময়ৰ পৰা লোৱা হয় —"
   },
   "options": [
    {
     "en": "One month",
     "as": "এক মাহ"
    },
    {
     "en": "Six to twelve months",
     "as": "ছয়ৰ পৰা বাৰ মাহ"
    },
    {
     "en": "Five years",
     "as": "পাঁচ বছৰ"
    },
    {
     "en": "Ten years",
     "as": "দহ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Most current affairs questions come from the events of the last six to twelve months.",
    "as": "বেছিভাগ সাম্প্ৰতিক ঘটনাৱলীৰ প্ৰশ্ন বিগত ছয়ৰ পৰা বাৰ মাহৰ পৰা আহে।"
   }
  },
  {
   "id": "assam-india-current-affairs-002",
   "q": {
    "en": "What is the best way to prepare current affairs?",
    "as": "সাম্প্ৰতিক ঘটনাৱলীৰ প্ৰস্তুতিৰ আটাইতকৈ ভাল উপায় কি?"
   },
   "options": [
    {
     "en": "Memorise every news item",
     "as": "প্ৰতিটো বাতৰি মুখস্থ কৰা"
    },
    {
     "en": "Keep a monthly diary and revise it",
     "as": "মাহেকীয়া ডায়েৰী ৰাখি পুনৰালোচনা কৰা"
    },
    {
     "en": "Read only sports news",
     "as": "কেৱল খেলৰ বাতৰি পঢ়া"
    },
    {
     "en": "Ignore state news",
     "as": "ৰাজ্যিক বাতৰি এৰি দিয়া"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Keeping a monthly diary of important events and revising it regularly is the reliable method.",
    "as": "গুৰুত্বপূৰ্ণ ঘটনাৰ মাহেকীয়া ডায়েৰী ৰাখি নিয়মীয়াকৈ পুনৰালোচনা কৰাটো নিৰ্ভৰযোগ্য পদ্ধতি।"
   }
  },
  {
   "id": "assam-india-current-affairs-003",
   "q": {
    "en": "Along with national events, which events are also asked in the ADRE paper?",
    "as": "ৰাষ্ট্ৰীয় পৰিঘটনাৰ লগতে ADRE পত্ৰত আৰু কোন পৰিঘটনা সোধা হয়?"
   },
   "options": [
    {
     "en": "Only international events",
     "as": "কেৱল আন্তৰ্জাতিক পৰিঘটনা"
    },
    {
     "en": "Assam state events",
     "as": "অসমৰ ৰাজ্যিক পৰিঘটনা"
    },
    {
     "en": "Only sports events",
     "as": "কেৱল খেলৰ পৰিঘটনা"
    },
    {
     "en": "Only cinema events",
     "as": "কেৱল চলচ্চিত্ৰৰ পৰিঘটনা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Assam state events such as new schemes and appointments are asked along with national developments.",
    "as": "নতুন আঁচনি আৰু নিয়োগৰ দৰে অসমৰ ৰাজ্যিক পৰিঘটনা ৰাষ্ট্ৰীয় ঘটনাৰ লগতে সোধা হয়।"
   }
  },
  {
   "id": "assam-india-current-affairs-004",
   "q": {
    "en": "How often should the current affairs diary be revised?",
    "as": "সাম্প্ৰতিক ঘটনাৱলীৰ ডায়েৰী কিমান সঘনাই পুনৰালোচনা কৰিব লাগে?"
   },
   "options": [
    {
     "en": "Once a year",
     "as": "বছৰত এবাৰ"
    },
    {
     "en": "Once a week",
     "as": "সপ্তাহত এবাৰ"
    },
    {
     "en": "Never",
     "as": "কেতিয়াও নহয়"
    },
    {
     "en": "Once in five years",
     "as": "পাঁচ বছৰত এবাৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The diary should be revised at least once a week.",
    "as": "ডায়েৰীখন অন্ততঃ সপ্তাহত এবাৰ পুনৰালোচনা কৰিব লাগে।"
   }
  }
 ],
 "assam-national-parks": [
  {
   "id": "assam-national-parks-001",
   "q": {
    "en": "Manas National Park is located in which part of Assam?",
    "as": "মানস ৰাষ্ট্ৰীয় উদ্যান অসমৰ কোন অংশত অৱস্থিত?"
   },
   "options": [
    {
     "en": "Upper Assam",
     "as": "উজনি অসম"
    },
    {
     "en": "Lower Assam",
     "as": "নামনি অসম"
    },
    {
     "en": "Barak Valley",
     "as": "বৰাক উপত্যকা"
    },
    {
     "en": "Central Assam",
     "as": "মধ্য অসম"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Manas National Park lies in Lower Assam, in Baksa district on the Bhutan border.",
    "as": "মানস ৰাষ্ট্ৰীয় উদ্যান নামনি অসমৰ বাক্সা জিলাত, ভূটান সীমান্তত অৱস্থিত।"
   }
  },
  {
   "id": "assam-national-parks-002",
   "q": {
    "en": "Which national park of Assam is a UNESCO World Heritage Site?",
    "as": "অসমৰ কোন ৰাষ্ট্ৰীয় উদ্যান ইউনেস্ক' বিশ্ব ঐতিহ্য ক্ষেত্ৰ?"
   },
   "options": [
    {
     "en": "Manas",
     "as": "মানাহ"
    },
    {
     "en": "Orang",
     "as": "ওৰাং"
    },
    {
     "en": "Kaziranga",
     "as": "কাজিৰঙা"
    },
    {
     "en": "Nameri",
     "as": "নামেৰি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Kaziranga National Park is a UNESCO World Heritage Site.",
    "as": "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান ইউনেস্ক' বিশ্ব ঐতিহ্য ক্ষেত্ৰ।"
   }
  },
  {
   "id": "assam-national-parks-003",
   "q": {
    "en": "Manas National Park is known for which animal?",
    "as": "মানাহ ৰাষ্ট্ৰীয় উদ্যান কোনটো প্ৰাণীৰ বাবে জনাজাত?"
   },
   "options": [
    {
     "en": "Golden langur",
     "as": "সোণালী বান্দৰ"
    },
    {
     "en": "One-horned rhinoceros",
     "as": "এশিঙীয়া গঁড়"
    },
    {
     "en": "Snow leopard",
     "as": "হিম চিতা"
    },
    {
     "en": "Great Indian bustard",
     "as": "গগনবিলী"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Manas is known for the golden langur and the pygmy hog.",
    "as": "মানাহ সোণালী বান্দৰ আৰু পিগমি হগৰ বাবে জনাজাত।"
   }
  },
  {
   "id": "assam-national-parks-004",
   "q": {
    "en": "Which of the following is a national park of Assam?",
    "as": "তলৰ কোনটো অসমৰ ৰাষ্ট্ৰীয় উদ্যান?"
   },
   "options": [
    {
     "en": "Simlipal",
     "as": "শিমলিপাল"
    },
    {
     "en": "Orang",
     "as": "ওৰাং"
    },
    {
     "en": "Sundarbans",
     "as": "সুন্দৰবন"
    },
    {
     "en": "Bandipur",
     "as": "বন্দীপুৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Orang is one of the national parks of Assam.",
    "as": "ওৰাং অসমৰ ৰাষ্ট্ৰীয় উদ্যানসমূহৰ এটা।"
   }
  }
 ],
 "assam-natural-resources": [
  {
   "id": "assam-natural-resources-001",
   "q": {
    "en": "Assam is the largest producer of which crop in India?",
    "as": "অসম ভাৰতত কোন শস্যৰ আটাইতকৈ বেছি উৎপাদক?"
   },
   "options": [
    {
     "en": "Wheat",
     "as": "গম"
    },
    {
     "en": "Tea",
     "as": "চাহ"
    },
    {
     "en": "Coffee",
     "as": "কফি"
    },
    {
     "en": "Cotton",
     "as": "কপাহ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Assam is the largest tea producing state of India.",
    "as": "অসম ভাৰতৰ আটাইতকৈ বেছি চাহ উৎপাদন কৰা ৰাজ্য।"
   }
  },
  {
   "id": "assam-natural-resources-002",
   "q": {
    "en": "Digboi in Assam is famous for —",
    "as": "অসমৰ ডিগবৈ কাৰ বাবে বিখ্যাত —"
   },
   "options": [
    {
     "en": "Tea gardens",
     "as": "চাহ বাগিচা"
    },
    {
     "en": "Oil fields",
     "as": "তেলক্ষেত্ৰ"
    },
    {
     "en": "Coal mines",
     "as": "কয়লা খনি"
    },
    {
     "en": "Forests",
     "as": "বনাঞ্চল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Digboi has one of the oldest oil fields in the world.",
    "as": "ডিগবৈত পৃথিৱীৰ আটাইতকৈ পুৰণি তেলক্ষেত্ৰৰ এটা আছে।"
   }
  },
  {
   "id": "assam-natural-resources-003",
   "q": {
    "en": "Which mineral is mined at Makum in Assam?",
    "as": "অসমৰ মাকুমত কোন খনিজ উত্তোলন কৰা হয়?"
   },
   "options": [
    {
     "en": "Coal",
     "as": "কয়লা"
    },
    {
     "en": "Gold",
     "as": "সোণ"
    },
    {
     "en": "Iron",
     "as": "লো"
    },
    {
     "en": "Copper",
     "as": "তাম"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Coal is mined at Makum in upper Assam.",
    "as": "ওপৰ অসমৰ মাকুমত কয়লা উত্তোলন কৰা হয়।"
   }
  },
  {
   "id": "assam-natural-resources-004",
   "q": {
    "en": "Which crop is the principal food crop of Assam?",
    "as": "অসমৰ প্ৰধান খাদ্য শস্য কোনটো?"
   },
   "options": [
    {
     "en": "Rice",
     "as": "ধান"
    },
    {
     "en": "Maize",
     "as": "মাকৈ"
    },
    {
     "en": "Wheat",
     "as": "গম"
    },
    {
     "en": "Millet",
     "as": "কাউন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Rice is the principal food crop of Assam.",
    "as": "ধান অসমৰ প্ৰধান খাদ্য শস্য।"
   }
  }
 ],
 "assamese-literature": [
  {
   "id": "assamese-literature-001",
   "q": {
    "en": "Who wrote 'Burhi Aair Sadhu'?",
    "as": "'বুঢ়ী আইৰ সাধু' কোনে লিখিছিল?"
   },
   "options": [
    {
     "en": "Hemchandra Barua",
     "as": "হেমচন্দ্ৰ বৰুৱা"
    },
    {
     "en": "Lakshminath Bezbaroa",
     "as": "লক্ষ্মীনাথ বেজবৰুৱা"
    },
    {
     "en": "Birendra Kumar Bhattacharyya",
     "as": "বীৰেন্দ্ৰ কুমাৰ ভট্টাচাৰ্য"
    },
    {
     "en": "Jyoti Prasad Agarwala",
     "as": "জ্যোতি প্ৰসাদ আগৰৱালা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Lakshminath Bezbaroa wrote Burhi Aair Sadhu, a collection of Assamese folk tales.",
    "as": "লক্ষ্মীনাথ বেজবৰুৱাই অসমীয়া লোককথাৰ সংকলন বুঢ়ী আইৰ সাধু লিখিছিল।"
   }
  },
  {
   "id": "assamese-literature-002",
   "q": {
    "en": "Who compiled the 'Hemkosh' dictionary?",
    "as": "'হেমকোষ' অভিধান কোনে সংকলন কৰিছিল?"
   },
   "options": [
    {
     "en": "Hemchandra Barua",
     "as": "হেমচন্দ্ৰ বৰুৱা"
    },
    {
     "en": "Lakshminath Bezbaroa",
     "as": "লক্ষ্মীনাথ বেজবৰুৱা"
    },
    {
     "en": "Sankardeva",
     "as": "শংকৰদেৱ"
    },
    {
     "en": "Chandra Kumar Agarwala",
     "as": "চন্দ্ৰ কুমাৰ আগৰৱালা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Hemchandra Barua compiled the Hemkosh, a standard Assamese dictionary.",
    "as": "হেমচন্দ্ৰ বৰুৱাই হেমকোষ, এটা মানক অসমীয়া অভিধান সংকলন কৰিছিল।"
   }
  },
  {
   "id": "assamese-literature-003",
   "q": {
    "en": "Which Assamese writer won the Jnanpith Award for 'Mrityunjay'?",
    "as": "কোন অসমীয়া লেখকে 'মৃত্যুঞ্জয়' ৰ বাবে জ্ঞানপীঠ বঁটা লাভ কৰিছিল?"
   },
   "options": [
    {
     "en": "Birendra Kumar Bhattacharyya",
     "as": "বীৰেন্দ্ৰ কুমাৰ ভট্টাচাৰ্য"
    },
    {
     "en": "Nilmani Phookan",
     "as": "নীলমণি ফুকন"
    },
    {
     "en": "Mamoni Raisom Goswami",
     "as": "মামণি ৰয়ছম গোস্বামী"
    },
    {
     "en": "Syed Abdul Malik",
     "as": "চৈয়দ আব্দুল মালিক"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Birendra Kumar Bhattacharyya won the Jnanpith Award for Mrityunjay.",
    "as": "বীৰেন্দ্ৰ কুমাৰ ভট্টাচাৰ্যই মৃত্যুঞ্জয়ৰ বাবে জ্ঞানপীঠ বঁটা লাভ কৰিছিল।"
   }
  },
  {
   "id": "assamese-literature-004",
   "q": {
    "en": "What is the earliest known specimen of Assamese literature?",
    "as": "অসমীয়া সাহিত্যৰ আটাইতকৈ প্ৰাচীন জনা নিদৰ্শন কি?"
   },
   "options": [
    {
     "en": "Charyapada",
     "as": "চৰ্যাপদ"
    },
    {
     "en": "Kirtana Ghosha",
     "as": "কীৰ্তন ঘোষা"
    },
    {
     "en": "Burhi Aair Sadhu",
     "as": "বুঢ়ী আইৰ সাধু"
    },
    {
     "en": "Hemkosh",
     "as": "হেমকোষ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Charyapada is the earliest known specimen of the Assamese language.",
    "as": "চৰ্যাপদ হৈছে অসমীয়া ভাষাৰ আটাইতকৈ প্ৰাচীন জনা নিদৰ্শন।"
   }
  }
 ],
 "average": [
  {
   "id": "average-001",
   "q": {
    "en": "The average of 12, 18, 24, 30 and 36 is —",
    "as": "12, 18, 24, 30 আৰু 36 ৰ গড় —"
   },
   "options": [
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "22",
     "as": "২২"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "26",
     "as": "২৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Sum = 120 and there are 5 values, so 120 / 5 = 24.",
    "as": "সমষ্টি = 120 আৰু 5 টা মান, গতিকে 120 / 5 = 24।"
   }
  },
  {
   "id": "average-002",
   "q": {
    "en": "The average of the first 15 natural numbers is —",
    "as": "প্ৰথম 15 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "7.5",
     "as": "৭.৫"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "8.5",
     "as": "৮.৫"
    },
    {
     "en": "7",
     "as": "৭"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Average = (15 + 1) / 2 = 8.",
    "as": "গড় = (15 + 1) / 2 = 8।"
   }
  },
  {
   "id": "average-003",
   "q": {
    "en": "The average age of 10 students is 15 years. If the teacher's age is included the average becomes 16 years. The teacher's age is —",
    "as": "10 জন ছাত্ৰৰ গড় বয়স 15 বছৰ। শিক্ষকৰ বয়স ধৰিলে গড় 16 বছৰ হয়। শিক্ষকৰ বয়স —"
   },
   "options": [
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "27 years",
     "as": "২৭ বছৰ"
    },
    {
     "en": "26 years",
     "as": "২৬ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total of 11 = 11 x 16 = 176 and of 10 = 150, so the teacher is 26 years old.",
    "as": "11 জনৰ মুঠ = 11 x 16 = 176 আৰু 10 জনৰ = 150, গতিকে শিক্ষকৰ বয়স 26 বছৰ।"
   }
  },
  {
   "id": "average-004",
   "q": {
    "en": "The average of 5 numbers is 27. If one number is excluded, the average becomes 25. The excluded number is —",
    "as": "5 টা সংখ্যাৰ গড় 27। এটা সংখ্যা বাদ দিলে গড় 25 হয়। বাদ দিয়া সংখ্যাটো —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "37",
     "as": "৩৭"
    },
    {
     "en": "33",
     "as": "৩৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 135; total of remaining 4 = 100, so the excluded number is 35.",
    "as": "মুঠ = 135; বাকী 4 ৰ মুঠ = 100, গতিকে বাদ দিয়া সংখ্যা 35।"
   }
  },
  {
   "id": "average-005",
   "q": {
    "en": "The average of 8 numbers is 20. If each number is multiplied by 3, the new average is —",
    "as": "8 টা সংখ্যাৰ গড় 20। প্ৰতিটো সংখ্যা 3 ৰে পূৰণ কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "80",
     "as": "৮০"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "23",
     "as": "২৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Multiplying every value by 3 multiplies the average by 3, giving 60.",
    "as": "প্ৰতিটো মান 3 ৰে পূৰণ কৰিলে গড়ো 3 ৰে পূৰণ হয়, গতিকে 60।"
   }
  },
  {
   "id": "average-006",
   "q": {
    "en": "A batsman scored 85, 92, 45 and 78 runs in four innings. His average is —",
    "as": "এজন বেটছমেনে চাৰিখন ইনিংছত 85, 92, 45 আৰু 78 ৰান কৰিলে। তেওঁৰ গড় —"
   },
   "options": [
    {
     "en": "75",
     "as": "৭৫"
    },
    {
     "en": "76",
     "as": "৭৬"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "74",
     "as": "৭৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sum = 300 and 300 / 4 = 75.",
    "as": "সমষ্টি = 300 আৰু 300 / 4 = 75।"
   }
  },
  {
   "id": "average-007",
   "q": {
    "en": "The average of 3 numbers is 40. If two of them are 30 and 50, the third is —",
    "as": "3 টা সংখ্যাৰ গড় 40। দুটা 30 আৰু 50 হ'লে তৃতীয়টো —"
   },
   "options": [
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "50",
     "as": "৫০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 120; 120 - 80 = 40.",
    "as": "মুঠ = 120; 120 - 80 = 40।"
   }
  },
  {
   "id": "average-008",
   "q": {
    "en": "The average of 10, 20, 30, 40 and 50 is —",
    "as": "10, 20, 30, 40 আৰু 50 ৰ গড় —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Sum = 150 and 150 / 5 = 30.",
    "as": "সমষ্টি = 150 আৰু 150 / 5 = 30।"
   }
  },
  {
   "id": "average-009",
   "q": {
    "en": "The average of 7 consecutive even numbers is 20. The largest of them is —",
    "as": "7 টা ক্ৰমিক যুগ্ম সংখ্যাৰ গড় 20। আটাইতকৈ ডাঙৰটো —"
   },
   "options": [
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "26",
     "as": "২৬"
    },
    {
     "en": "28",
     "as": "২৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "With 20 in the middle the numbers run 14 to 26, so the largest is 26.",
    "as": "মাজত 20 থাকিলে সংখ্যাবোৰ 14 ৰ পৰা 26 লৈকে, গতিকে আটাইতকৈ ডাঙৰ 26।"
   }
  },
  {
   "id": "average-010",
   "q": {
    "en": "A train covered 120 km at 60 km/h and 180 km at 90 km/h. Its average speed for the whole journey is —",
    "as": "এখন ৰে'লগাড়ীয়ে 60 কিমি/ঘণ্টা বেগত 120 কিমি আৰু 90 কিমি/ঘণ্টা বেগত 180 কিমি গ'ল। সমগ্ৰ যাত্ৰাৰ গড় বেগ —"
   },
   "options": [
    {
     "en": "80 km/h",
     "as": "৮০ কিমি/ঘণ্টা"
    },
    {
     "en": "75 km/h",
     "as": "৭৫ কিমি/ঘণ্টা"
    },
    {
     "en": "72 km/h",
     "as": "৭২ কিমি/ঘণ্টা"
    },
    {
     "en": "70 km/h",
     "as": "৭০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total distance 300 km in 2 + 2 = 4 hours, so 300 / 4 = 75 km/h.",
    "as": "মুঠ দূৰত্ব 300 কিমি, সময় 2 + 2 = 4 ঘণ্টা, গতিকে 300 / 4 = 75 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "average-011",
   "q": {
    "en": "If the average of 6 numbers is 25 and the average of 4 of them is 20, the average of the remaining two is —",
    "as": "6 টা সংখ্যাৰ গড় 25 আৰু তাৰ 4 টাৰ গড় 20 হ'লে বাকী দুটাৰ গড় —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "32.5",
     "as": "৩২.৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 150 and 4 numbers total 80, so the remaining two total 70 and average 35.",
    "as": "মুঠ = 150 আৰু 4 টাৰ মুঠ 80, গতিকে বাকী দুটাৰ মুঠ 70 আৰু গড় 35।"
   }
  },
  {
   "id": "average-012",
   "q": {
    "en": "The average weight of 5 boys is 40 kg. A new boy of 55 kg replaces a boy of 35 kg. The new average is —",
    "as": "5 জন ল'ৰাৰ গড় ওজন 40 কেজি। 35 কেজিৰ এজন ল'ৰাৰ সলনি 55 কেজিৰ এজন নতুন ল'ৰা আহিল। নতুন গড় —"
   },
   "options": [
    {
     "en": "42 kg",
     "as": "৪২ কেজি"
    },
    {
     "en": "43 kg",
     "as": "৪৩ কেজি"
    },
    {
     "en": "45 kg",
     "as": "৪৫ কেজি"
    },
    {
     "en": "44 kg",
     "as": "৪৪ কেজি"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Total becomes 200 - 35 + 55 = 220, and 220 / 5 = 44 kg.",
    "as": "মুঠ হয় 200 - 35 + 55 = 220, আৰু 220 / 5 = 44 কেজি।"
   }
  }
 ],
 "awards-honours": [
  {
   "id": "awards-honours-001",
   "q": {
    "en": "The Param Vir Chakra is India's highest award for —",
    "as": "পৰম বীৰ চক্ৰ ভাৰতৰ সৰ্বোচ্চ বঁটা কি বাবে দিয়া হয়?"
   },
   "options": [
    {
     "en": "Valour in battle",
     "as": "যুদ্ধত বীৰত্ব"
    },
    {
     "en": "Literature",
     "as": "সাহিত্য"
    },
    {
     "en": "Science",
     "as": "বিজ্ঞান"
    },
    {
     "en": "Sports",
     "as": "ক্ৰীড়া"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Param Vir Chakra is the highest military decoration, awarded for conspicuous bravery in battle.",
    "as": "পৰম বীৰ চক্ৰ হ'ল সৰ্বোচ্চ সামৰিক বঁটা, যুদ্ধত অসাধাৰণ বীৰত্বৰ বাবে প্ৰদান কৰা হয়।"
   }
  },
  {
   "id": "awards-honours-002",
   "q": {
    "en": "Which is the highest military decoration of India?",
    "as": "ভাৰতৰ সৰ্বোচ্চ সামৰিক সন্মান কোনটো?"
   },
   "options": [
    {
     "en": "Param Vir Chakra",
     "as": "পৰম বীৰ চক্ৰ"
    },
    {
     "en": "Ashoka Chakra",
     "as": "অশোক চক্ৰ"
    },
    {
     "en": "Vir Chakra",
     "as": "বীৰ চক্ৰ"
    },
    {
     "en": "Shaurya Chakra",
     "as": "শৌৰ্য চক্ৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Param Vir Chakra is the highest military decoration of India.",
    "as": "পৰম বীৰ চক্ৰ ভাৰতৰ সৰ্বোচ্চ সামৰিক সন্মান।"
   }
  },
  {
   "id": "awards-honours-003",
   "q": {
    "en": "The Jnanpith Award is given for contribution to —",
    "as": "জ্ঞানপীঠ বঁটা কাৰ অৱদানৰ বাবে দিয়া হয় —"
   },
   "options": [
    {
     "en": "Science",
     "as": "বিজ্ঞান"
    },
    {
     "en": "Literature",
     "as": "সাহিত্য"
    },
    {
     "en": "Sports",
     "as": "খেল"
    },
    {
     "en": "Cinema",
     "as": "চলচ্চিত্ৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Jnanpith Award is given for outstanding contribution to Indian literature.",
    "as": "জ্ঞানপীঠ বঁটা ভাৰতীয় সাহিত্যলৈ অসাধাৰণ অৱদানৰ বাবে দিয়া হয়।"
   }
  },
  {
   "id": "awards-honours-004",
   "q": {
    "en": "Which Assamese personality received the Bharat Ratna?",
    "as": "কোন অসমীয়া ব্যক্তিত্বই ভাৰত ৰত্ন লাভ কৰিছিল?"
   },
   "options": [
    {
     "en": "Bhupen Hazarika",
     "as": "ভূপেন হাজৰিকা"
    },
    {
     "en": "Jyoti Prasad Agarwala",
     "as": "জ্যোতি প্ৰসাদ আগৰৱালা"
    },
    {
     "en": "Bishnu Prasad Rabha",
     "as": "বিষ্ণু প্ৰসাদ ৰাভা"
    },
    {
     "en": "Gopinath Bordoloi",
     "as": "গোপীনাথ বৰদলৈ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Bhupen Hazarika received the Bharat Ratna in 2019.",
    "as": "ভূপেন হাজৰিকাই ২০১৯ চনত ভাৰত ৰত্ন লাভ কৰিছিল।"
   }
  }
 ],
 "basic-mensuration": [
  {
   "id": "basic-mensuration-001",
   "q": {
    "en": "The area of a rectangle 15 m long and 8 m broad is —",
    "as": "15 মিটাৰ দীঘ আৰু 8 মিটাৰ প্ৰস্থৰ আয়তক্ষেত্ৰৰ কালি —"
   },
   "options": [
    {
     "en": "120 sq m",
     "as": "১২০ sq m"
    },
    {
     "en": "140 sq m",
     "as": "১৪০ sq m"
    },
    {
     "en": "100 sq m",
     "as": "১০০ sq m"
    },
    {
     "en": "130 sq m",
     "as": "১৩০ sq m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 15 x 8 = 120 sq m.",
    "as": "কালি = 15 x 8 = 120 বৰ্গ মিটাৰ।"
   }
  },
  {
   "id": "basic-mensuration-002",
   "q": {
    "en": "The area of a circle of radius 7 cm is (take pi = 22/7) —",
    "as": "7 ছে.মি. ব্যাসাৰ্ধৰ বৃত্তৰ কালি (pi = 22/7 ধৰি) —"
   },
   "options": [
    {
     "en": "176 sq cm",
     "as": "১৭৬ sq cm"
    },
    {
     "en": "154 sq cm",
     "as": "১৫৪ sq cm"
    },
    {
     "en": "198 sq cm",
     "as": "১৯৮ sq cm"
    },
    {
     "en": "144 sq cm",
     "as": "১৪৪ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Area = pi r^2 = 22/7 x 49 = 154 sq cm.",
    "as": "কালি = pi r^2 = 22/7 x 49 = 154 বৰ্গ ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-003",
   "q": {
    "en": "The perimeter of a rectangle 12 m by 9 m is —",
    "as": "12 মিটাৰ x 9 মিটাৰ আয়তক্ষেত্ৰৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "108 m",
     "as": "১০৮ মিটাৰ"
    },
    {
     "en": "54 m",
     "as": "৫৪ মিটাৰ"
    },
    {
     "en": "42 m",
     "as": "৪২ মিটাৰ"
    },
    {
     "en": "21 m",
     "as": "২১ মিটাৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Perimeter = 2(12 + 9) = 42 m.",
    "as": "পৰিসীমা = 2(12 + 9) = 42 মিটাৰ।"
   }
  },
  {
   "id": "basic-mensuration-004",
   "q": {
    "en": "The area of a triangle with base 12 cm and height 9 cm is —",
    "as": "ভূমি 12 ছে.মি. আৰু উচ্চতা 9 ছে.মি.ৰ ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "108 sq cm",
     "as": "১০৮ sq cm"
    },
    {
     "en": "63 sq cm",
     "as": "৬৩ sq cm"
    },
    {
     "en": "72 sq cm",
     "as": "৭২ sq cm"
    },
    {
     "en": "54 sq cm",
     "as": "৫৪ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 1/2 x 12 x 9 = 54 sq cm.",
    "as": "কালি = 1/2 x 12 x 9 = 54 বৰ্গ ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-005",
   "q": {
    "en": "The sum of the angles of a triangle is —",
    "as": "এটা ত্ৰিভুজৰ কোণবোৰৰ যোগফল —"
   },
   "options": [
    {
     "en": "360 degrees",
     "as": "৩৬০ ডিগ্ৰী"
    },
    {
     "en": "180 degrees",
     "as": "১৮০ ডিগ্ৰী"
    },
    {
     "en": "270 degrees",
     "as": "২৭০ ডিগ্ৰী"
    },
    {
     "en": "90 degrees",
     "as": "৯০ ডিগ্ৰী"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The interior angles of any triangle add up to 180 degrees.",
    "as": "যিকোনো ত্ৰিভুজৰ অন্তঃকোণবোৰৰ যোগফল 180 ডিগ্ৰী।"
   }
  },
  {
   "id": "basic-mensuration-006",
   "q": {
    "en": "The circumference of a circle of radius 14 cm is (take pi = 22/7) —",
    "as": "14 ছে.মি. ব্যাসাৰ্ধৰ বৃত্তৰ পৰিধি (pi = 22/7 ধৰি) —"
   },
   "options": [
    {
     "en": "616 cm",
     "as": "৬১৬ ছে.মি."
    },
    {
     "en": "44 cm",
     "as": "৪৪ ছে.মি."
    },
    {
     "en": "66 cm",
     "as": "৬৬ ছে.মি."
    },
    {
     "en": "88 cm",
     "as": "৮৮ ছে.মি."
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Circumference = 2 pi r = 2 x 22/7 x 14 = 88 cm.",
    "as": "পৰিধি = 2 pi r = 2 x 22/7 x 14 = 88 ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-007",
   "q": {
    "en": "The volume of a cube of edge 5 cm is —",
    "as": "5 ছে.মি. বাহুৰ ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "125 cubic cm",
     "as": "১২৫ ঘন ছে.মি."
    },
    {
     "en": "150 cubic cm",
     "as": "১৫০ ঘন ছে.মি."
    },
    {
     "en": "25 cubic cm",
     "as": "২৫ ঘন ছে.মি."
    },
    {
     "en": "75 cubic cm",
     "as": "৭৫ ঘন ছে.মি."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Volume = a^3 = 125 cubic cm.",
    "as": "আয়তন = a^3 = 125 ঘন ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-008",
   "q": {
    "en": "The volume of a cuboid 10 cm x 6 cm x 4 cm is —",
    "as": "10 ছে.মি. x 6 ছে.মি. x 4 ছে.মি. ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "200 cubic cm",
     "as": "২০০ ঘন ছে.মি."
    },
    {
     "en": "240 cubic cm",
     "as": "২৪০ ঘন ছে.মি."
    },
    {
     "en": "160 cubic cm",
     "as": "১৬০ ঘন ছে.মি."
    },
    {
     "en": "120 cubic cm",
     "as": "১২০ ঘন ছে.মি."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Volume = 10 x 6 x 4 = 240 cubic cm.",
    "as": "আয়তন = 10 x 6 x 4 = 240 ঘন ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-009",
   "q": {
    "en": "The area of a square of perimeter 36 cm is —",
    "as": "পৰিসীমা 36 ছে.মি.ৰ বৰ্গক্ষেত্ৰৰ কালি —"
   },
   "options": [
    {
     "en": "49 sq cm",
     "as": "৪৯ sq cm"
    },
    {
     "en": "81 sq cm",
     "as": "৮১ sq cm"
    },
    {
     "en": "64 sq cm",
     "as": "৬৪ sq cm"
    },
    {
     "en": "36 sq cm",
     "as": "৩৬ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Side = 9 cm, so the area is 81 sq cm.",
    "as": "বাহু = 9 ছে.মি., গতিকে কালি 81 বৰ্গ ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-010",
   "q": {
    "en": "The diagonal of a square of side 6 cm is —",
    "as": "6 ছে.মি. বাহুৰ বৰ্গক্ষেত্ৰৰ কৰ্ণ —"
   },
   "options": [
    {
     "en": "12 cm",
     "as": "১২ ছে.মি."
    },
    {
     "en": "6 sqrt(2) cm",
     "as": "৬ sqrt(২) ছে.মি."
    },
    {
     "en": "3 sqrt(2) cm",
     "as": "৩ sqrt(২) ছে.মি."
    },
    {
     "en": "sqrt(6) cm",
     "as": "sqrt(৬) ছে.মি."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Diagonal = side x sqrt(2) = 6 sqrt(2) cm.",
    "as": "কৰ্ণ = বাহু x sqrt(2) = 6 sqrt(2) ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-011",
   "q": {
    "en": "The area of a right-angled triangle with legs 6 cm and 8 cm is —",
    "as": "6 ছে.মি. আৰু 8 ছে.মি. ভূমিৰ সমকোণী ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "24 sq cm",
     "as": "২৪ sq cm"
    },
    {
     "en": "20 sq cm",
     "as": "২০ sq cm"
    },
    {
     "en": "28 sq cm",
     "as": "২৮ sq cm"
    },
    {
     "en": "48 sq cm",
     "as": "৪৮ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 1/2 x 6 x 8 = 24 sq cm.",
    "as": "কালি = 1/2 x 6 x 8 = 24 বৰ্গ ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-012",
   "q": {
    "en": "The total surface area of a cube of edge 4 cm is —",
    "as": "4 ছে.মি. বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "64 sq cm",
     "as": "৬৪ sq cm"
    },
    {
     "en": "80 sq cm",
     "as": "৮০ sq cm"
    },
    {
     "en": "48 sq cm",
     "as": "৪৮ sq cm"
    },
    {
     "en": "96 sq cm",
     "as": "৯৬ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "TSA = 6a^2 = 6 x 16 = 96 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 6a^2 = 6 x 16 = 96 বৰ্গ ছে.মি.।"
   }
  }
 ],
 "blood-relations": [
  {
   "id": "blood-relations-001",
   "q": {
    "en": "Pointing to a man, a woman said, 'He is the brother of my mother.' How is the man related to her?",
    "as": "এজন মানুহলৈ আঙুলিয়াই এগৰাকী মহিলাই ক'লে, 'তেওঁ মোৰ মাকৰ ভাই।' মানুহজন তাইৰ কিদৰে সম্পৰ্কীয়?"
   },
   "options": [
    {
     "en": "Father",
     "as": "দেউতাক"
    },
    {
     "en": "Uncle",
     "as": "খুড়া/মামা"
    },
    {
     "en": "Brother",
     "as": "ভাই"
    },
    {
     "en": "Cousin",
     "as": "সম্বন্ধীয় ভাই"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The brother of her mother is her uncle.",
    "as": "তাইৰ মাকৰ ভাই হৈছে তাইৰ খুড়া/মামা।"
   }
  },
  {
   "id": "blood-relations-002",
   "q": {
    "en": "A is the father of B and C is the daughter of B. How is A related to C?",
    "as": "A হৈছে B ৰ দেউতাক আৰু C হৈছে B ৰ জীয়েক। A, C ৰ কিদৰে সম্পৰ্কীয়?"
   },
   "options": [
    {
     "en": "Father",
     "as": "দেউতাক"
    },
    {
     "en": "Grandfather",
     "as": "ককাক"
    },
    {
     "en": "Uncle",
     "as": "খুড়া"
    },
    {
     "en": "Brother",
     "as": "ভাই"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A is the father of B, so A is the grandfather of C.",
    "as": "A হৈছে B ৰ দেউতাক, গতিকে A হৈছে C ৰ ককাক।"
   }
  },
  {
   "id": "blood-relations-003",
   "q": {
    "en": "My mother's only son is —",
    "as": "মোৰ মাকৰ একমাত্ৰ পুত্ৰ হৈছে —"
   },
   "options": [
    {
     "en": "my cousin",
     "as": "মোৰ সম্বন্ধীয় ভাই"
    },
    {
     "en": "my brother",
     "as": "মোৰ ভাই"
    },
    {
     "en": "myself",
     "as": "মই নিজে"
    },
    {
     "en": "my uncle",
     "as": "মোৰ খুড়া"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "My mother's only son is myself, if I am the only son.",
    "as": "মই যদি একমাত্ৰ পুত্ৰ হওঁ, তেন্তে মোৰ মাকৰ একমাত্ৰ পুত্ৰ হৈছে মই নিজে।"
   }
  },
  {
   "id": "blood-relations-004",
   "q": {
    "en": "The daughter of my uncle is my —",
    "as": "মোৰ খুড়াৰ জীয়েক হৈছে মোৰ —"
   },
   "options": [
    {
     "en": "sister",
     "as": "ভনী"
    },
    {
     "en": "cousin",
     "as": "সম্বন্ধীয় ভনী"
    },
    {
     "en": "niece",
     "as": "ভাগিনী"
    },
    {
     "en": "aunt",
     "as": "পেহী/মাহী"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The daughter of an uncle is a cousin.",
    "as": "খুড়াৰ জীয়েক হৈছে সম্বন্ধীয় ভনী।"
   }
  }
 ],
 "brahmaputra-barak": [
  {
   "id": "brahmaputra-barak-001",
   "q": {
    "en": "Which river is called the Sorrow of Assam?",
    "as": "কোনখন নদীক অসমৰ দুখ বোলা হয়?"
   },
   "options": [
    {
     "en": "Barak",
     "as": "বৰাক"
    },
    {
     "en": "Brahmaputra",
     "as": "ব্ৰহ্মপুত্ৰ"
    },
    {
     "en": "Subansiri",
     "as": "সুবনসিৰী"
    },
    {
     "en": "Manas",
     "as": "মানাহ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Brahmaputra is called the Sorrow of Assam because of the floods it causes every year.",
    "as": "প্ৰতি বছৰে হোৱা বানৰ বাবে ব্ৰহ্মপুত্ৰক অসমৰ দুখ বোলা হয়।"
   }
  },
  {
   "id": "brahmaputra-barak-002",
   "q": {
    "en": "The Brahmaputra is known by which name in Tibet?",
    "as": "ব্ৰহ্মপুত্ৰক তিব্বতত কোন নামেৰে জনা যায়?"
   },
   "options": [
    {
     "en": "Tsangpo",
     "as": "ছাংপো"
    },
    {
     "en": "Padma",
     "as": "পদ্মা"
    },
    {
     "en": "Jamuna",
     "as": "যমুনা"
    },
    {
     "en": "Dihang",
     "as": "দিহাং"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "In Tibet the Brahmaputra is known as the Tsangpo.",
    "as": "তিব্বতত ব্ৰহ্মপুত্ৰক ছাংপো নামেৰে জনা যায়।"
   }
  },
  {
   "id": "brahmaputra-barak-003",
   "q": {
    "en": "Which of the following is a north-bank tributary of the Brahmaputra?",
    "as": "তলৰ কোনটো ব্ৰহ্মপুত্ৰৰ উত্তৰ পাৰৰ উপনৈ?"
   },
   "options": [
    {
     "en": "Kopili",
     "as": "কপিলী"
    },
    {
     "en": "Dhansiri",
     "as": "ধনসিৰী"
    },
    {
     "en": "Subansiri",
     "as": "সুবনসিৰী"
    },
    {
     "en": "Barak",
     "as": "বৰাক"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The Subansiri is a north-bank tributary of the Brahmaputra.",
    "as": "সুবনসিৰী ব্ৰহ্মপুত্ৰৰ উত্তৰ পাৰৰ উপনৈ।"
   }
  },
  {
   "id": "brahmaputra-barak-004",
   "q": {
    "en": "The Barak river flows through which valley of Assam?",
    "as": "বৰাক নদী অসমৰ কোন উপত্যকাৰ মাজেৰে বৈ যায়?"
   },
   "options": [
    {
     "en": "Brahmaputra valley",
     "as": "ব্ৰহ্মপুত্ৰ উপত্যকা"
    },
    {
     "en": "Barak valley",
     "as": "বৰাক উপত্যকা"
    },
    {
     "en": "Dhansiri valley",
     "as": "ধনসিৰী উপত্যকা"
    },
    {
     "en": "Kopili valley",
     "as": "কপিলী উপত্যকা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Barak river flows through the Barak valley of southern Assam.",
    "as": "বৰাক নদী দক্ষিণ অসমৰ বৰাক উপত্যকাৰ মাজেৰে বৈ যায়।"
   }
  }
 ],
 "clock-calendar": [
  {
   "id": "clock-calendar-001",
   "q": {
    "en": "At 3 o'clock, the angle between the hour hand and the minute hand is —",
    "as": "৩ বজাত ঘণ্টাৰ কাঁটা আৰু মিনিটৰ কাঁটাৰ মাজৰ কোণ —"
   },
   "options": [
    {
     "en": "60 degrees",
     "as": "৬০ ডিগ্ৰী"
    },
    {
     "en": "90 degrees",
     "as": "৯০ ডিগ্ৰী"
    },
    {
     "en": "120 degrees",
     "as": "১২০ ডিগ্ৰী"
    },
    {
     "en": "150 degrees",
     "as": "১৫০ ডিগ্ৰী"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each hour mark is 30 degrees apart, so at 3 o'clock the hands are 3 x 30 = 90 degrees apart.",
    "as": "প্ৰতি ঘণ্টাৰ ব্যৱধান ৩০ ডিগ্ৰী, গতিকে ৩ বজাত কাঁটা দুটা ৩ x ৩০ = ৯০ ডিগ্ৰী আঁতৰত থাকে।"
   }
  },
  {
   "id": "clock-calendar-002",
   "q": {
    "en": "If 1 January of a year is a Monday, then 1 February of the same year falls on —",
    "as": "কোনো বছৰৰ ১ জানুৱাৰী সোমবাৰ হ'লে সেই বছৰৰ ১ ফেব্ৰুৱাৰী কি বাৰ হ'ব?"
   },
   "options": [
    {
     "en": "Tuesday",
     "as": "মঙ্গলবাৰ"
    },
    {
     "en": "Wednesday",
     "as": "বুধবাৰ"
    },
    {
     "en": "Thursday",
     "as": "বৃহস্পতিবাৰ"
    },
    {
     "en": "Friday",
     "as": "শুক্ৰবাৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "January has 31 days, and 31 divided by 7 leaves a remainder of 3, so the day advances by 3: Monday + 3 = Thursday.",
    "as": "জানুৱাৰীত ৩১ দিন, আৰু ৩১ ক ৭ ৰে হৰণ কৰিলে ভাগশেষ ৩ হয়, গতিকে বাৰ ৩ আগবাঢ়ে: সোমবাৰ + ৩ = বৃহস্পতিবাৰ।"
   }
  },
  {
   "id": "clock-calendar-003",
   "q": {
    "en": "If today is Wednesday, the day after 60 days will be —",
    "as": "আজি বুধবাৰ হ'লে ৬০ দিনৰ পিছত কি বাৰ হ'ব?"
   },
   "options": [
    {
     "en": "Saturday",
     "as": "শনিবাৰ"
    },
    {
     "en": "Sunday",
     "as": "দেওবাৰ"
    },
    {
     "en": "Monday",
     "as": "সোমবাৰ"
    },
    {
     "en": "Tuesday",
     "as": "মঙ্গলবাৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "60 divided by 7 leaves a remainder of 4; Wednesday plus 4 days is Sunday.",
    "as": "৬০ ক ৭ ৰে হৰণ কৰিলে ভাগশেষ ৪ হয়; বুধবাৰৰ পৰা ৪ দিন আগবাঢ়িলে দেওবাৰ হয়।"
   }
  },
  {
   "id": "clock-calendar-004",
   "q": {
    "en": "At 3 o'clock, the angle between the hands of a clock is —",
    "as": "3 টা বজাত ঘড়ীৰ কাঁটা দুটাৰ মাজৰ কোণ —"
   },
   "options": [
    {
     "en": "30 degrees",
     "as": "৩০ ডিগ্ৰী"
    },
    {
     "en": "60 degrees",
     "as": "৬০ ডিগ্ৰী"
    },
    {
     "en": "90 degrees",
     "as": "৯০ ডিগ্ৰী"
    },
    {
     "en": "120 degrees",
     "as": "১২০ ডিগ্ৰী"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The hour hand is at 3 and the minute hand at 12, giving an angle of 3 × 30 = 90 degrees.",
    "as": "ঘণ্টাৰ কাঁটা 3 ত আৰু মিনিটৰ কাঁটা 12 ত, গতিকে কোণ 3 × 30 = 90 ডিগ্ৰী।"
   }
  }
 ],
 "coding-decoding": [
  {
   "id": "coding-decoding-001",
   "q": {
    "en": "If CAT is coded as DBU, then DOG is coded as —",
    "as": "CAT ক DBU হিচাপে সংকেত কৰিলে DOG ক সংকেত কৰা হয় —"
   },
   "options": [
    {
     "en": "EPH",
     "as": "EPH"
    },
    {
     "en": "EPI",
     "as": "EPI"
    },
    {
     "en": "FPH",
     "as": "FPH"
    },
    {
     "en": "DPH",
     "as": "DPH"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Each letter moves one step forward, so DOG becomes EPH.",
    "as": "প্ৰতিটো আখৰ এখোজ আগলৈ যায়, গতিকে DOG এ EPH হয়।"
   }
  },
  {
   "id": "coding-decoding-002",
   "q": {
    "en": "If A = 1, B = 2, C = 3, then the code for CAB is —",
    "as": "A = 1, B = 2, C = 3 হ'লে CAB ৰ সংকেত —"
   },
   "options": [
    {
     "en": "312",
     "as": "৩১২"
    },
    {
     "en": "321",
     "as": "৩২১"
    },
    {
     "en": "123",
     "as": "১২৩"
    },
    {
     "en": "213",
     "as": "২১৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "C is 3, A is 1 and B is 2, so CAB is 312.",
    "as": "C হৈছে 3, A হৈছে 1 আৰু B হৈছে 2, গতিকে CAB হৈছে 312।"
   }
  },
  {
   "id": "coding-decoding-003",
   "q": {
    "en": "If MOUSE is coded as NVP TF by shifting each letter one step forward, the last letter of the code is —",
    "as": "MOUSE ৰ প্ৰতিটো আখৰ এক এখোজ আগবঢ়াই NVP TF হিচাপে সংকেত কৰিলে সংকেতৰ শেষ আখৰ —"
   },
   "options": [
    {
     "en": "E",
     "as": "E"
    },
    {
     "en": "F",
     "as": "F"
    },
    {
     "en": "G",
     "as": "G"
    },
    {
     "en": "T",
     "as": "T"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The last letter E moves one step forward to F.",
    "as": "শেষ আখৰ E এক এখোজ আগবাঢ়ি F হয়।"
   }
  },
  {
   "id": "coding-decoding-004",
   "q": {
    "en": "If RAM is coded as SBN, then SUN is coded as —",
    "as": "RAM ক SBN হিচাপে সংকেত কৰিলে SUN ক সংকেত কৰা হয় —"
   },
   "options": [
    {
     "en": "TVO",
     "as": "TVO"
    },
    {
     "en": "TVP",
     "as": "TVP"
    },
    {
     "en": "TVN",
     "as": "TVN"
    },
    {
     "en": "SVO",
     "as": "SVO"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Each letter moves one step forward, so SUN becomes TVO.",
    "as": "প্ৰতিটো আখৰ এখোজ আগলৈ যায়, গতিকে SUN এ TVO হয়।"
   }
  }
 ],
 "constitution-preamble-rights": [
  {
   "id": "constitution-preamble-rights-001",
   "q": {
    "en": "When did the Constitution of India come into force?",
    "as": "ভাৰতৰ সংবিধান কেতিয়া কাৰ্যকৰী হৈছিল?"
   },
   "options": [
    {
     "en": "15 August 1947",
     "as": "১৫ আগষ্ট ১৯৪৭"
    },
    {
     "en": "26 January 1950",
     "as": "২৬ জানুৱাৰী ১৯৫০"
    },
    {
     "en": "26 November 1949",
     "as": "২৬ নৱেম্বৰ ১৯৪৯"
    },
    {
     "en": "2 October 1950",
     "as": "২ অক্টোবৰ ১৯৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Constitution of India came into force on 26 January 1950.",
    "as": "ভাৰতৰ সংবিধান ১৯৫০ চনৰ ২৬ জানুৱাৰীত কাৰ্যকৰী হৈছিল।"
   }
  },
  {
   "id": "constitution-preamble-rights-002",
   "q": {
    "en": "Fundamental Rights are given in which part of the Constitution?",
    "as": "মৌলিক অধিকাৰ সংবিধানৰ কোন অংশত দিয়া আছে?"
   },
   "options": [
    {
     "en": "Part I",
     "as": "প্ৰথম অংশ"
    },
    {
     "en": "Part II",
     "as": "দ্বিতীয় অংশ"
    },
    {
     "en": "Part III",
     "as": "তৃতীয় অংশ"
    },
    {
     "en": "Part IV",
     "as": "চতুৰ্থ অংশ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Fundamental Rights are given in Part III of the Constitution.",
    "as": "মৌলিক অধিকাৰ সংবিধানৰ তৃতীয় অংশত দিয়া আছে।"
   }
  },
  {
   "id": "constitution-preamble-rights-003",
   "q": {
    "en": "Who chaired the drafting committee of the Constitution?",
    "as": "সংবিধানৰ খচৰা সমিতিৰ অধ্যক্ষতা কোনে কৰিছিল?"
   },
   "options": [
    {
     "en": "Dr Rajendra Prasad",
     "as": "ড° ৰাজেন্দ্ৰ প্ৰসাদ"
    },
    {
     "en": "Dr B. R. Ambedkar",
     "as": "ড° বি আৰ আম্বেদকাৰ"
    },
    {
     "en": "Jawaharlal Nehru",
     "as": "জৱাহৰলাল নেহৰু"
    },
    {
     "en": "Sardar Patel",
     "as": "চৰ্দাৰ পেটেল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Dr B. R. Ambedkar chaired the drafting committee of the Constitution.",
    "as": "ড° বি আৰ আম্বেদকাৰে সংবিধানৰ খচৰা সমিতিৰ অধ্যক্ষতা কৰিছিল।"
   }
  },
  {
   "id": "constitution-preamble-rights-004",
   "q": {
    "en": "The Preamble declares India to be a —",
    "as": "প্ৰস্তাৱনাই ভাৰতক ঘোষণা কৰে এটা —"
   },
   "options": [
    {
     "en": "monarchy",
     "as": "ৰাজতন্ত্ৰ"
    },
    {
     "en": "republic",
     "as": "গণৰাজ্য"
    },
    {
     "en": "dictatorship",
     "as": "একনায়কতন্ত্ৰ"
    },
    {
     "en": "colony",
     "as": "উপনিৱেশ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Preamble declares India a sovereign, socialist, secular and democratic republic.",
    "as": "প্ৰস্তাৱনাই ভাৰতক সাৰ্বভৌম, সমাজবাদী, ধৰ্মনিৰপেক্ষ আৰু গণতান্ত্ৰিক গণৰাজ্য ঘোষণা কৰে।"
   }
  }
 ],
 "counting-figures": [
  {
   "id": "counting-figures-001",
   "q": {
    "en": "What should be counted first in a counting figures question?",
    "as": "চিত্ৰ গণনাৰ প্ৰশ্নত প্ৰথমে কি গণনা কৰিব লাগে?"
   },
   "options": [
    {
     "en": "The largest figures",
     "as": "আটাইতকৈ ডাঙৰ চিত্ৰ"
    },
    {
     "en": "The smallest figures",
     "as": "আটাইতকৈ সৰু চিত্ৰ"
    },
    {
     "en": "The colours",
     "as": "ৰং"
    },
    {
     "en": "The labels",
     "as": "লেবেল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The smallest figures are counted first, then the larger ones.",
    "as": "প্ৰথমে আটাইতকৈ সৰু চিত্ৰবোৰ, তাৰ পিছত ডাঙৰবোৰ গণনা কৰা হয়।"
   }
  },
  {
   "id": "counting-figures-002",
   "q": {
    "en": "How can double counting be avoided in a counting figures question?",
    "as": "চিত্ৰ গণনাৰ প্ৰশ্নত দুবাৰ গণনা কেনেকৈ ৰোধ কৰিব?"
   },
   "options": [
    {
     "en": "Count quickly",
     "as": "দ্ৰুতভাৱে গণনা কৰা"
    },
    {
     "en": "Keep a small table of counts",
     "as": "গণনাৰ এটা সৰু তালিকা ৰাখা"
    },
    {
     "en": "Guess the total",
     "as": "মুঠ অনুমান কৰা"
    },
    {
     "en": "Skip small figures",
     "as": "সৰু চিত্ৰ এৰি দিয়া"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Keeping a written table of each count prevents double counting.",
    "as": "প্ৰতিটো গণনাৰ লিখিত তালিকা ৰাখিলে দুবাৰ গণনা ৰোধ হয়।"
   }
  },
  {
   "id": "counting-figures-003",
   "q": {
    "en": "A cube has how many edges?",
    "as": "এটা ঘনকৰ কিমানটা কাষ থাকে?"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A cube has six faces, eight corners and twelve edges.",
    "as": "ঘনকৰ ছটা পৃষ্ঠ, আঠটা চুক আৰু বাৰটা কাষ থাকে।"
   }
  },
  {
   "id": "counting-figures-004",
   "q": {
    "en": "A cube has how many corners?",
    "as": "এটা ঘনকৰ কিমানটা চুক থাকে?"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A cube has eight corners.",
    "as": "ঘনকৰ আঠটা চুক থাকে।"
   }
  }
 ],
 "cubes-dice": [
  {
   "id": "cubes-dice-001",
   "q": {
    "en": "The numbers on the opposite faces of a standard die add up to —",
    "as": "সাধাৰণ পাশাৰ বিপৰীত পৃষ্ঠৰ সংখ্যাৰ যোগফল —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The opposite faces of a standard die always add up to seven.",
    "as": "সাধাৰণ পাশাৰ বিপৰীত পৃষ্ঠৰ যোগফল সদায় সাত।"
   }
  },
  {
   "id": "cubes-dice-002",
   "q": {
    "en": "A cube has how many faces?",
    "as": "এটা ঘনকৰ কিমানটা পৃষ্ঠ থাকে?"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A cube has six faces.",
    "as": "ঘনকৰ ছটা পৃষ্ঠ থাকে।"
   }
  },
  {
   "id": "cubes-dice-003",
   "q": {
    "en": "If a painted cube is cut into smaller cubes, the corner cubes have how many painted faces?",
    "as": "ৰঙা ঘনক সৰু ঘনকত কাটিলে চুকৰ ঘনকবোৰত কিমানটা ৰঙা পৃষ্ঠ থাকে?"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "0",
     "as": "০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Corner cubes have three painted faces.",
    "as": "চুকৰ ঘনকবোৰত তিনিটা ৰঙা পৃষ্ঠ থাকে।"
   }
  },
  {
   "id": "cubes-dice-004",
   "q": {
    "en": "If a painted cube is cut into smaller cubes, the inner cubes have how many painted faces?",
    "as": "ৰঙা ঘনক সৰু ঘনকত কাটিলে ভিতৰৰ ঘনকবোৰত কিমানটা ৰঙা পৃষ্ঠ থাকে?"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "0",
     "as": "০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Inner cubes have no painted face.",
    "as": "ভিতৰৰ ঘনকবোৰত কোনো ৰঙা পৃষ্ঠ নাথাকে।"
   }
  }
 ],
 "direction-distance": [
  {
   "id": "direction-distance-001",
   "q": {
    "en": "A man walks 5 km north and then 5 km east. He is now in which direction from the starting point?",
    "as": "এজন মানুহে 5 কি.মি. উত্তৰলৈ আৰু তাৰ পিছত 5 কি.মি. পূবলৈ খোজ কাঢ়ে। তেওঁ এতিয়া আৰম্ভণিৰ পৰা কোন দিশত?"
   },
   "options": [
    {
     "en": "North",
     "as": "উত্তৰ"
    },
    {
     "en": "East",
     "as": "পূব"
    },
    {
     "en": "North-East",
     "as": "উত্তৰ-পূব"
    },
    {
     "en": "South-East",
     "as": "দক্ষিণ-পূব"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Moving north and then east places him in the north-east direction.",
    "as": "উত্তৰলৈ তাৰ পিছত পূবলৈ গ'লে তেওঁ উত্তৰ-পূব দিশত থাকে।"
   }
  },
  {
   "id": "direction-distance-002",
   "q": {
    "en": "Facing north, a person turns right. He now faces —",
    "as": "উত্তৰলৈ মুখ কৰি থকা এজন লোকে সোঁফালে ঘূৰে। তেওঁ এতিয়া কোনফালে মুখ কৰি আছে —"
   },
   "options": [
    {
     "en": "East",
     "as": "পূব"
    },
    {
     "en": "West",
     "as": "পশ্চিম"
    },
    {
     "en": "South",
     "as": "দক্ষিণ"
    },
    {
     "en": "North",
     "as": "উত্তৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A right turn from north leads to east.",
    "as": "উত্তৰৰ পৰা সোঁফালে ঘূৰিলে পূব হয়।"
   }
  },
  {
   "id": "direction-distance-003",
   "q": {
    "en": "A man walks 3 km south, then 4 km east. The straight-line distance from the start is —",
    "as": "এজন মানুহে 3 কি.মি. দক্ষিণলৈ, তাৰ পিছত 4 কি.মি. পূবলৈ খোজ কাঢ়ে। আৰম্ভণিৰ পৰা চৰলৰেখাৰ দূৰত্ব —"
   },
   "options": [
    {
     "en": "5 km",
     "as": "৫ কি.মি."
    },
    {
     "en": "6 km",
     "as": "৬ কি.মি."
    },
    {
     "en": "7 km",
     "as": "৭ কি.মি."
    },
    {
     "en": "12 km",
     "as": "১২ কি.মি."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The two sides form a right angle, so the distance is the square root of 9 + 16 = 5 km.",
    "as": "দুটা বাহুৱে সমকোণ কৰে, গতিকে দূৰত্ব 9 + 16 ৰ বৰ্গমূল = 5 কি.মি.।"
   }
  },
  {
   "id": "direction-distance-004",
   "q": {
    "en": "If a person faces west and turns 180 degrees, he faces —",
    "as": "এজন লোকে পশ্চিমলৈ মুখ কৰি 180 ডিগ্ৰী ঘূৰিলে তেওঁ মুখ কৰে —"
   },
   "options": [
    {
     "en": "North",
     "as": "উত্তৰ"
    },
    {
     "en": "South",
     "as": "দক্ষিণ"
    },
    {
     "en": "East",
     "as": "পূব"
    },
    {
     "en": "West",
     "as": "পশ্চিম"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A turn of 180 degrees reverses the direction, so west becomes east.",
    "as": "180 ডিগ্ৰী ঘূৰিলে দিশ ওলোটা হয়, গতিকে পশ্চিম পূব হয়।"
   }
  }
 ],
 "embedded-figures": [
  {
   "id": "embedded-figures-001",
   "q": {
    "en": "In an embedded figure question, the hidden figure —",
    "as": "লুকুৱা চিত্ৰৰ প্ৰশ্নত লুকুৱা চিত্ৰটো —"
   },
   "options": [
    {
     "en": "changes its shape",
     "as": "আকৃতি সলনি কৰে"
    },
    {
     "en": "may be rotated",
     "as": "ঘূৰোৱা হ'ব পাৰে"
    },
    {
     "en": "becomes a circle",
     "as": "বৃত্ত হয়"
    },
    {
     "en": "disappears",
     "as": "নোহোৱা হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The hidden figure may be rotated or slightly resized but its shape does not change.",
    "as": "লুকুৱা চিত্ৰটো ঘূৰোৱা বা অলপ আকাৰ সলোৱা হ'ব পাৰে, কিন্তু ইয়াৰ আকৃতি নসলনি।"
   }
  },
  {
   "id": "embedded-figures-002",
   "q": {
    "en": "What should be looked for first in an embedded figure question?",
    "as": "লুকুৱা চিত্ৰৰ প্ৰশ্নত প্ৰথমে কি বিচাৰিব লাগে?"
   },
   "options": [
    {
     "en": "The whole outline",
     "as": "গোটেই ৰূপ"
    },
    {
     "en": "The corners and straight edges",
     "as": "চুক আৰু সৰল কাষ"
    },
    {
     "en": "The colour",
     "as": "ৰং"
    },
    {
     "en": "The size",
     "as": "আকাৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Looking for the corners and straight edges of the hidden figure is faster than looking for the whole outline.",
    "as": "লুকুৱা চিত্ৰটোৰ চুক আৰু সৰল কাষ বিচৰাটো গোটেই ৰূপ বিচৰাতকৈ দ্ৰুত।"
   }
  },
  {
   "id": "embedded-figures-003",
   "q": {
    "en": "In an embedded figure question the number of sides of the hidden figure —",
    "as": "লুকুৱা চিত্ৰৰ প্ৰশ্নত লুকুৱা চিত্ৰটোৰ বাহুৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "changes",
     "as": "সলনি হয়"
    },
    {
     "en": "stays the same",
     "as": "একে থাকে"
    },
    {
     "en": "becomes zero",
     "as": "শূন্য হয়"
    },
    {
     "en": "doubles",
     "as": "দুগুণ হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The shape and the number of sides of the hidden figure stay the same.",
    "as": "লুকুৱা চিত্ৰটোৰ আকৃতি আৰু বাহুৰ সংখ্যা একেই থাকে।"
   }
  },
  {
   "id": "embedded-figures-004",
   "q": {
    "en": "The best way to confirm an embedded figure is to —",
    "as": "লুকুৱা চিত্ৰ নিশ্চিত কৰাৰ আটাইতকৈ ভাল উপায় —"
   },
   "options": [
    {
     "en": "guess quickly",
     "as": "দ্ৰুতভাৱে অনুমান কৰা"
    },
    {
     "en": "trace each option on the complex figure",
     "as": "জটিল চিত্ৰত প্ৰতিটো বিকল্প টানি চোৱা"
    },
    {
     "en": "count the lines",
     "as": "ৰেখা গণনা কৰা"
    },
    {
     "en": "look at the colour",
     "as": "ৰং চোৱা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Tracing each option on the complex figure settles the question quickly.",
    "as": "জটিল চিত্ৰত প্ৰতিটো বিকল্প টানি চালেই প্ৰশ্নটো দ্ৰুতভাৱে মীমাংসা হয়।"
   }
  }
 ],
 "environment-pollution": [
  {
   "id": "environment-pollution-001",
   "q": {
    "en": "Which of the following is a kind of pollution?",
    "as": "তলৰ কোনটো এটা প্ৰদূষণৰ প্ৰকাৰ?"
   },
   "options": [
    {
     "en": "Air pollution",
     "as": "বায়ু প্ৰদূষণ"
    },
    {
     "en": "Noise pollution",
     "as": "শব্দ প্ৰদূষণ"
    },
    {
     "en": "Water pollution",
     "as": "পানী প্ৰদূষণ"
    },
    {
     "en": "All of these",
     "as": "এইবোৰৰ আটাইবোৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Air, water, soil and noise pollution are the main kinds of pollution.",
    "as": "বায়ু, পানী, মাটি আৰু শব্দ প্ৰদূষণ প্ৰধান প্ৰকাৰৰ প্ৰদূষণ।"
   }
  },
  {
   "id": "environment-pollution-002",
   "q": {
    "en": "What are the three R's of environmental protection?",
    "as": "পৰিৱেশ সুৰক্ষাৰ তিনি-আৰ কি?"
   },
   "options": [
    {
     "en": "Read, Run, Rest",
     "as": "Read, Run, Rest"
    },
    {
     "en": "Reduce, Reuse, Recycle",
     "as": "হ্ৰাস, পুনৰ্ব্যৱহাৰ, পুনঃচক্ৰণ"
    },
    {
     "en": "Rain, River, Road",
     "as": "Rain, River, Road"
    },
    {
     "en": "Red, Rose, Rice",
     "as": "Red, Rose, Rice"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The three R's are reduce, reuse and recycle.",
    "as": "তিনি-আৰ হৈছে হ্ৰাস, পুনৰ্ব্যৱহাৰ আৰু পুনঃচক্ৰণ।"
   }
  },
  {
   "id": "environment-pollution-003",
   "q": {
    "en": "Which activity is a major cause of environmental damage?",
    "as": "কোন কামটো পৰিৱেশৰ ক্ষতিৰ এটা প্ৰধান কাৰণ?"
   },
   "options": [
    {
     "en": "Tree planting",
     "as": "গছ ৰোপণ"
    },
    {
     "en": "Deforestation",
     "as": "বনাঞ্চল ধ্বংস"
    },
    {
     "en": "Rain water harvesting",
     "as": "বৰষুণৰ পানী সংৰক্ষণ"
    },
    {
     "en": "Composting",
     "as": "জৈৱ সাৰ প্ৰস্তুত কৰা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Deforestation is a major cause of environmental damage.",
    "as": "বনাঞ্চল ধ্বংস পৰিৱেশৰ ক্ষতিৰ এটা প্ৰধান কাৰণ।"
   }
  },
  {
   "id": "environment-pollution-004",
   "q": {
    "en": "Tree planting mainly helps to control —",
    "as": "গছ ৰোপণে মূলতঃ কাক নিয়ন্ত্ৰণ কৰাত সহায় কৰে —"
   },
   "options": [
    {
     "en": "Air pollution",
     "as": "বায়ু প্ৰদূষণ"
    },
    {
     "en": "Noise pollution only",
     "as": "কেৱল শব্দ প্ৰদূষণ"
    },
    {
     "en": "Water pollution only",
     "as": "কেৱল পানী প্ৰদূষণ"
    },
    {
     "en": "Soil erosion only",
     "as": "কেৱল মাটি ক্ষয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Tree planting helps to control air pollution.",
    "as": "গছ ৰোপণে বায়ু প্ৰদূষণ নিয়ন্ত্ৰণ কৰাত সহায় কৰে।"
   }
  }
 ],
 "error-detection": [
  {
   "id": "error-detection-001",
   "q": {
    "en": "Find the error: He is senior than me.",
    "as": "ভুল বিচাৰক: He is senior than me."
   },
   "options": [
    {
     "en": "He is",
     "as": "He is"
    },
    {
     "en": "senior",
     "as": "senior"
    },
    {
     "en": "than",
     "as": "than"
    },
    {
     "en": "me",
     "as": "me"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Senior takes the preposition to, so it should be senior to me.",
    "as": "Senior এ to পূৰ্বসৰ্গ লয়, গতিকে senior to me হোৱা উচিত।"
   }
  },
  {
   "id": "error-detection-002",
   "q": {
    "en": "Find the error: She discussed about the matter.",
    "as": "ভুল বিচাৰক: She discussed about the matter."
   },
   "options": [
    {
     "en": "She",
     "as": "She"
    },
    {
     "en": "discussed",
     "as": "discussed"
    },
    {
     "en": "about",
     "as": "about"
    },
    {
     "en": "the matter",
     "as": "the matter"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The verb discuss does not take the preposition about.",
    "as": "Discuss ক্ৰিয়াই about পূৰ্বসৰ্গ লোৱা নাই।"
   }
  },
  {
   "id": "error-detection-003",
   "q": {
    "en": "Find the error: One of my friend is a doctor.",
    "as": "ভুল বিচাৰক: One of my friend is a doctor."
   },
   "options": [
    {
     "en": "One of",
     "as": "One of"
    },
    {
     "en": "my friend",
     "as": "my friend"
    },
    {
     "en": "is",
     "as": "is"
    },
    {
     "en": "a doctor",
     "as": "a doctor"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "One of is followed by a plural noun.",
    "as": "One of ৰ পিছত বহুবচন বিশেষ্য আহে।"
   }
  },
  {
   "id": "error-detection-004",
   "q": {
    "en": "Find the error: I have been living here since five years.",
    "as": "ভুল বিচাৰক: I have been living here since five years."
   },
   "options": [
    {
     "en": "I have",
     "as": "I have"
    },
    {
     "en": "been living",
     "as": "been living"
    },
    {
     "en": "here",
     "as": "here"
    },
    {
     "en": "since five years",
     "as": "since five years"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A period of time takes for, so it should be for five years.",
    "as": "সময়ছোৱাৰ বাবে for লয়, গতিকে for five years হোৱা উচিত।"
   }
  }
 ],
 "figure-analogy": [
  {
   "id": "figure-analogy-001",
   "q": {
    "en": "If the first figure is rotated 90 degrees to get the second, the third figure should be —",
    "as": "প্ৰথম চিত্ৰটো 90 ডিগ্ৰী ঘূৰাই দ্বিতীয়টো পোৱা হ'লে তৃতীয় চিত্ৰটো —"
   },
   "options": [
    {
     "en": "kept unchanged",
     "as": "অপৰিবৰ্তিত ৰাখিব"
    },
    {
     "en": "rotated 90 degrees",
     "as": "90 ডিগ্ৰী ঘূৰাব"
    },
    {
     "en": "rotated 180 degrees",
     "as": "180 ডিগ্ৰী ঘূৰাব"
    },
    {
     "en": "mirrored",
     "as": "দাপোণ কৰিব"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The same change found in the first pair must be applied to the third figure.",
    "as": "প্ৰথম যোৰত পোৱা একেই সলনি তৃতীয় চিত্ৰত প্ৰয়োগ কৰিব লাগে।"
   }
  },
  {
   "id": "figure-analogy-002",
   "q": {
    "en": "What is the first step in solving a figure analogy?",
    "as": "চিত্ৰ সাদৃশ্য সমাধানৰ প্ৰথম পদক্ষেপ কি?"
   },
   "options": [
    {
     "en": "Guess the answer",
     "as": "উত্তৰ অনুমান কৰা"
    },
    {
     "en": "Describe the change between the first pair",
     "as": "প্ৰথম যোৰৰ মাজৰ সলনি বৰ্ণনা কৰা"
    },
    {
     "en": "Look at the options first",
     "as": "প্ৰথমে বিকল্পবোৰ চোৱা"
    },
    {
     "en": "Count the options",
     "as": "বিকল্প গণনা কৰা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The change between the first two figures must be identified before it can be applied.",
    "as": "প্ৰয়োগ কৰাৰ আগতে প্ৰথম দুটা চিত্ৰৰ মাজৰ সলনিটো চিনাক্ত কৰিব লাগে।"
   }
  },
  {
   "id": "figure-analogy-003",
   "q": {
    "en": "If the first figure doubles in size to give the second, the third figure should —",
    "as": "প্ৰথম চিত্ৰটো আকাৰত দুগুণ হৈ দ্বিতীয়টো দিলে তৃতীয় চিত্ৰটো —"
   },
   "options": [
    {
     "en": "halve in size",
     "as": "আকাৰত আধা হ'ব"
    },
    {
     "en": "double in size",
     "as": "আকাৰত দুগুণ হ'ব"
    },
    {
     "en": "stay the same",
     "as": "একে থাকিব"
    },
    {
     "en": "disappear",
     "as": "নোহোৱা হ'ব"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The same doubling must be applied to the third figure.",
    "as": "একেই দুগুণ কৰা তৃতীয় চিত্ৰত প্ৰয়োগ কৰিব লাগে।"
   }
  },
  {
   "id": "figure-analogy-004",
   "q": {
    "en": "If the first figure is mirrored to give the second, the change is called —",
    "as": "প্ৰথম চিত্ৰটো দাপোণ কৰি দ্বিতীয়টো দিলে সলনিটোক বোলা হয় —"
   },
   "options": [
    {
     "en": "rotation",
     "as": "ঘূৰণ"
    },
    {
     "en": "reflection",
     "as": "প্ৰতিফলন"
    },
    {
     "en": "translation",
     "as": "স্থানান্তৰ"
    },
    {
     "en": "enlargement",
     "as": "বৃদ্ধি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A mirror change is called a reflection.",
    "as": "দাপোণৰ সলনিক প্ৰতিফলন বোলা হয়।"
   }
  }
 ],
 "figure-classification": [
  {
   "id": "figure-classification-001",
   "q": {
    "en": "What is counted first in figure classification?",
    "as": "চিত্ৰ শ্ৰেণীবিভাজনত প্ৰথমে কি গণনা কৰা হয়?"
   },
   "options": [
    {
     "en": "The colour",
     "as": "ৰং"
    },
    {
     "en": "The number of sides or lines",
     "as": "বাহু বা ৰেখাৰ সংখ্যা"
    },
    {
     "en": "The size",
     "as": "আকাৰ"
    },
    {
     "en": "The position",
     "as": "অৱস্থান"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The number of sides or lines is counted first.",
    "as": "প্ৰথমে বাহু বা ৰেখাৰ সংখ্যা গণনা কৰা হয়।"
   }
  },
  {
   "id": "figure-classification-002",
   "q": {
    "en": "If all figures except one have a curve, the odd figure is the one that —",
    "as": "এটাক এৰি আটাইবোৰ চিত্ৰত বক্ৰৰেখা থাকিলে অমিল চিত্ৰটো হৈছে যিটোত —"
   },
   "options": [
    {
     "en": "has two curves",
     "as": "দুটা বক্ৰৰেখা আছে"
    },
    {
     "en": "has no curve",
     "as": "কোনো বক্ৰৰেখা নাই"
    },
    {
     "en": "has three sides",
     "as": "তিনিটা বাহু আছে"
    },
    {
     "en": "is larger",
     "as": "ডাঙৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The odd figure is the one that does not have the curve.",
    "as": "অমিল চিত্ৰটো হৈছে যিটোত বক্ৰৰেখা নাই।"
   }
  },
  {
   "id": "figure-classification-003",
   "q": {
    "en": "If in four figures a dot lies inside and in one it lies outside, the odd figure is the one with the dot —",
    "as": "চাৰিটা চিত্ৰত বিন্দু ভিতৰত আৰু এটাত বাহিৰত থাকিলে অমিল চিত্ৰটো হৈছে য'ত বিন্দু —"
   },
   "options": [
    {
     "en": "inside",
     "as": "ভিতৰত"
    },
    {
     "en": "outside",
     "as": "বাহিৰত"
    },
    {
     "en": "at the centre",
     "as": "কেন্দ্ৰত"
    },
    {
     "en": "on the edge",
     "as": "কাষত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The odd figure is the one whose dot lies outside.",
    "as": "অমিল চিত্ৰটো হৈছে য'ত বিন্দু বাহিৰত আছে।"
   }
  },
  {
   "id": "figure-classification-004",
   "q": {
    "en": "If three figures have an even number of sides and one has an odd number, the odd figure has —",
    "as": "তিনিটা চিত্ৰত যুগ্ম সংখ্যক বাহু আৰু এটাত অযুগ্ম থাকিলে অমিল চিত্ৰটোত আছে —"
   },
   "options": [
    {
     "en": "an even number of sides",
     "as": "যুগ্ম সংখ্যক বাহু"
    },
    {
     "en": "an odd number of sides",
     "as": "অযুগ্ম সংখ্যক বাহু"
    },
    {
     "en": "no sides",
     "as": "বাহু নাই"
    },
    {
     "en": "infinite sides",
     "as": "অসীম বাহু"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The odd figure is the one with an odd number of sides.",
    "as": "অমিল চিত্ৰটো হৈছে য'ত অযুগ্ম সংখ্যক বাহু আছে।"
   }
  }
 ],
 "figure-series": [
  {
   "id": "figure-series-001",
   "q": {
    "en": "In a figure series the number of sides increases as 3, 4, 5, 6. The next figure has —",
    "as": "এটা চিত্ৰ শৃংখলাত বাহুৰ সংখ্যা 3, 4, 5, 6 হিচাপে বাঢ়ে। পিছৰ চিত্ৰটোত থাকিব —"
   },
   "options": [
    {
     "en": "6 sides",
     "as": "৬ বাহু"
    },
    {
     "en": "7 sides",
     "as": "৭ বাহু"
    },
    {
     "en": "8 sides",
     "as": "৮ বাহু"
    },
    {
     "en": "9 sides",
     "as": "৯ বাহু"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The number of sides increases by one each time, so the next figure has 7 sides.",
    "as": "বাহুৰ সংখ্যা প্ৰতিবাৰ একেৰে বাঢ়ে, গতিকে পিছৰ চিত্ৰটোত ৭ বাহু থাকিব।"
   }
  },
  {
   "id": "figure-series-002",
   "q": {
    "en": "What should be checked first in a figure series?",
    "as": "চিত্ৰ শৃংখলাত প্ৰথমে কি পৰীক্ষা কৰিব লাগে?"
   },
   "options": [
    {
     "en": "The colour only",
     "as": "কেৱল ৰং"
    },
    {
     "en": "The number of lines or sides",
     "as": "ৰেখা বা বাহুৰ সংখ্যা"
    },
    {
     "en": "The size of the paper",
     "as": "কাগজৰ আকাৰ"
    },
    {
     "en": "The position on the page",
     "as": "পৃষ্ঠাত অৱস্থান"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The number of lines or sides is the first and most common change in a figure series.",
    "as": "ৰেখা বা বাহুৰ সংখ্যা চিত্ৰ শৃংখলাৰ প্ৰথম আৰু আটাইতকৈ সাধাৰণ সলনি।"
   }
  },
  {
   "id": "figure-series-003",
   "q": {
    "en": "If a shape rotates 90 degrees clockwise in each step, after four steps it is —",
    "as": "এটা আকৃতি প্ৰতিটো ধাপত ঘড়ীৰ কাঁটাৰ দিশত 90 ডিগ্ৰী ঘূৰিলে চাৰি ধাপৰ পিছত ই —"
   },
   "options": [
    {
     "en": "at 90 degrees",
     "as": "90 ডিগ্ৰীত"
    },
    {
     "en": "at 180 degrees",
     "as": "180 ডিগ্ৰীত"
    },
    {
     "en": "back to the original position",
     "as": "মূল অৱস্থালৈ ঘূৰি আহে"
    },
    {
     "en": "at 270 degrees",
     "as": "270 ডিগ্ৰীত"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Four turns of 90 degrees make a full 360 degrees, so the shape returns to its original position.",
    "as": "90 ডিগ্ৰীৰ চাৰিটা ঘূৰণে সম্পূৰ্ণ 360 ডিগ্ৰী কৰে, গতিকে আকৃতিটো মূল অৱস্থালৈ ঘূৰি আহে।"
   }
  },
  {
   "id": "figure-series-004",
   "q": {
    "en": "In a figure series, an alternating pattern means —",
    "as": "চিত্ৰ শৃংখলাত পালা-পালি আৰ্হি মানে —"
   },
   "options": [
    {
     "en": "the same change repeats",
     "as": "একেই সলনি পুনৰাবৃত্তি হয়"
    },
    {
     "en": "two changes occur alternately",
     "as": "দুটা সলনি পালা-পালি হয়"
    },
    {
     "en": "nothing changes",
     "as": "একো নসলনি"
    },
    {
     "en": "the figure disappears",
     "as": "চিত্ৰটো নোহোৱা হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "An alternating pattern means two different changes occur one after the other.",
    "as": "পালা-পালি আৰ্হি মানে দুটা বেলেগ সলনি এটাৰ পিছত আনটো হয়।"
   }
  }
 ],
 "fill-in-the-blanks": [
  {
   "id": "fill-in-the-blanks-001",
   "q": {
    "en": "He is afraid — dogs.",
    "as": "তেওঁ কুকুৰলৈ —।"
   },
   "options": [
    {
     "en": "from",
     "as": "from"
    },
    {
     "en": "of",
     "as": "of"
    },
    {
     "en": "with",
     "as": "with"
    },
    {
     "en": "by",
     "as": "by"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The adjective afraid takes the preposition of.",
    "as": "Afraid বিশেষণে of পূৰ্বসৰ্গ লয়।"
   }
  },
  {
   "id": "fill-in-the-blanks-002",
   "q": {
    "en": "She is married — a doctor.",
    "as": "তাই এজন ডাক্তৰৰ সৈতে —।"
   },
   "options": [
    {
     "en": "with",
     "as": "with"
    },
    {
     "en": "to",
     "as": "to"
    },
    {
     "en": "by",
     "as": "by"
    },
    {
     "en": "for",
     "as": "for"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The verb marry in the passive takes the preposition to.",
    "as": "কৰ্মবাচ্যত marry ক্ৰিয়াই to পূৰ্বসৰ্গ লয়।"
   }
  },
  {
   "id": "fill-in-the-blanks-003",
   "q": {
    "en": "I am used — waking up early.",
    "as": "মই সোনকালে উঠাৰ —।"
   },
   "options": [
    {
     "en": "with",
     "as": "with"
    },
    {
     "en": "to",
     "as": "to"
    },
    {
     "en": "for",
     "as": "for"
    },
    {
     "en": "at",
     "as": "at"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The phrase used to means accustomed to.",
    "as": "Used to বাক্যাংশই অভ্যস্ত হোৱা বুজায়।"
   }
  },
  {
   "id": "fill-in-the-blanks-004",
   "q": {
    "en": "He apologised — his mistake.",
    "as": "তেওঁ নিজৰ ভুলৰ বাবে —।"
   },
   "options": [
    {
     "en": "for",
     "as": "for"
    },
    {
     "en": "of",
     "as": "of"
    },
    {
     "en": "on",
     "as": "on"
    },
    {
     "en": "with",
     "as": "with"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The verb apologise takes the preposition for before the fault.",
    "as": "Apologise ক্ৰিয়াই দোষৰ আগত for পূৰ্বসৰ্গ লয়।"
   }
  }
 ],
 "government-schemes": [
  {
   "id": "government-schemes-001",
   "q": {
    "en": "Ayushman Bharat is a scheme related to —",
    "as": "আয়ুষ্মান ভাৰত কাৰ সৈতে জড়িত এটা আঁচনি —"
   },
   "options": [
    {
     "en": "Health",
     "as": "স্বাস্থ্য"
    },
    {
     "en": "Agriculture",
     "as": "কৃষি"
    },
    {
     "en": "Education",
     "as": "শিক্ষা"
    },
    {
     "en": "Housing",
     "as": "আবাস"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Ayushman Bharat is a national health protection scheme.",
    "as": "আয়ুষ্মান ভাৰত এটা ৰাষ্ট্ৰীয় স্বাস্থ্য সুৰক্ষা আঁচনি।"
   }
  },
  {
   "id": "government-schemes-002",
   "q": {
    "en": "PM-KISAN is a scheme for —",
    "as": "পিএম-কিষাণ কাৰ বাবে এটা আঁচনি —"
   },
   "options": [
    {
     "en": "Farmers",
     "as": "কৃষক"
    },
    {
     "en": "Students",
     "as": "শিক্ষাৰ্থী"
    },
    {
     "en": "Soldiers",
     "as": "সৈনিক"
    },
    {
     "en": "Teachers",
     "as": "শিক্ষক"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "PM-KISAN provides income support to farmers.",
    "as": "পিএম-কিষাণে কৃষকক আয় সহায় প্ৰদান কৰে।"
   }
  },
  {
   "id": "government-schemes-003",
   "q": {
    "en": "Why should government schemes be read from the official portal?",
    "as": "চৰকাৰী আঁচনিবোৰ আধিকাৰিক পৰ্টেলৰ পৰা কিয় পঢ়িব লাগে?"
   },
   "options": [
    {
     "en": "It is the only free source",
     "as": "ই একমাত্ৰ বিনামূলীয়া উৎস"
    },
    {
     "en": "Schemes are launched and renamed from time to time",
     "as": "আঁচনিবোৰ সময়ে সময়ে আৰম্ভ আৰু নতুন নামেৰে চলে"
    },
    {
     "en": "Other sources are illegal",
     "as": "আন উৎস অবৈধ"
    },
    {
     "en": "It is faster",
     "as": "ই দ্ৰুত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Schemes are launched, expanded and renamed from time to time, so only the official portal carries the current position.",
    "as": "আঁচনিবোৰ সময়ে সময়ে আৰম্ভ, সম্প্ৰসাৰিত আৰু নতুন নামেৰে চলে, গতিকে বৰ্তমানৰ অৱস্থা কেৱল আধিকাৰিক পৰ্টেলত থাকে।"
   }
  },
  {
   "id": "government-schemes-004",
   "q": {
    "en": "Assam government schemes mainly cover education, health, women's welfare and —",
    "as": "অসম চৰকাৰৰ আঁচনিয়ে মূলতঃ শিক্ষা, স্বাস্থ্য, মহিলা কল্যাণ আৰু — সামৰি লয়"
   },
   "options": [
    {
     "en": "Employment",
     "as": "নিয়োগ"
    },
    {
     "en": "Space research",
     "as": "মহাকাশ গৱেষণা"
    },
    {
     "en": "Shipbuilding",
     "as": "জাহাজ নিৰ্মাণ"
    },
    {
     "en": "Mining",
     "as": "খনন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Assam runs schemes for education, health, women's welfare and employment.",
    "as": "অসমে শিক্ষা, স্বাস্থ্য, মহিলা কল্যাণ আৰু নিয়োগৰ আঁচনি চলায়।"
   }
  }
 ],
 "idioms-phrases": [
  {
   "id": "idioms-phrases-001",
   "q": {
    "en": "The idiom 'to be in hot water' means —",
    "as": "'to be in hot water' বাক্যৰীতিটোৰ অৰ্থ —"
   },
   "options": [
    {
     "en": "to be in trouble",
     "as": "সমস্যাত পৰা"
    },
    {
     "en": "to be very happy",
     "as": "অতি আনন্দিত হোৱা"
    },
    {
     "en": "to feel sleepy",
     "as": "টোপনি যোৱা"
    },
    {
     "en": "to be wealthy",
     "as": "ধনী হোৱা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "'To be in hot water' means to be in trouble or difficulty.",
    "as": "'To be in hot water' মানে সমস্যা বা অসুবিধাত পৰা।"
   }
  },
  {
   "id": "idioms-phrases-002",
   "q": {
    "en": "The idiom 'to be at sea' means —",
    "as": "'to be at sea' বাক্যৰীতিটোৰ অৰ্থ —"
   },
   "options": [
    {
     "en": "to be confused or uncertain",
     "as": "দিশহাৰা বা অনিশ্চিত হোৱা"
    },
    {
     "en": "to travel by ship",
     "as": "জাহাজেৰে ভ্ৰমণ কৰা"
    },
    {
     "en": "to swim in the sea",
     "as": "সমুদ্ৰত সাঁতুৰা"
    },
    {
     "en": "to be very angry",
     "as": "অতি ক্ৰুদ্ধ হোৱা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "'To be at sea' means to be confused or unsure about what to do.",
    "as": "'To be at sea' মানে কি কৰিব লাগে সেই বিষয়ে দিশহাৰা বা অনিশ্চিত হোৱা।"
   }
  },
  {
   "id": "idioms-phrases-003",
   "q": {
    "en": "The idiom 'to have a finger in every pie' means —",
    "as": "'to have a finger in every pie' বাক্যৰীতিটোৰ অৰ্থ —"
   },
   "options": [
    {
     "en": "to be involved in many different activities",
     "as": "বিভিন্ন কামত জড়িত থকা"
    },
    {
     "en": "to cook many dishes",
     "as": "অনেক ৰান্ধনী কৰা"
    },
    {
     "en": "to steal from many places",
     "as": "অনেক ঠাইৰ পৰা চুৰি কৰা"
    },
    {
     "en": "to know only one trade",
     "as": "কেৱল এটা কাম জানা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "'To have a finger in every pie' means to be involved in many different activities or matters.",
    "as": "'To have a finger in every pie' মানে বিভিন্ন কাম বা বিষয়ত জড়িত থকা।"
   }
  },
  {
   "id": "idioms-phrases-004",
   "q": {
    "en": "The idiom 'to be on cloud nine' means —",
    "as": "'to be on cloud nine' বাক্যৰীতিটোৰ অৰ্থ —"
   },
   "options": [
    {
     "en": "to be extremely happy",
     "as": "অতি আনন্দিত হোৱা"
    },
    {
     "en": "to be daydreaming",
     "as": "দিবা-স্বপ্ন দেখা"
    },
    {
     "en": "to be in great danger",
     "as": "অতি বিপদত পৰা"
    },
    {
     "en": "to be very confused",
     "as": "অতি বিভ্ৰান্ত হোৱা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "'To be on cloud nine' means to be extremely happy or delighted.",
    "as": "'To be on cloud nine' মানে অতি আনন্দিত বা উৎফুল্লিত হোৱা।"
   }
  }
 ],
 "important-days-dates": [
  {
   "id": "important-days-dates-001",
   "q": {
    "en": "On which date is Republic Day celebrated?",
    "as": "গণৰাজ্য দিৱস কোন তাৰিখে পালন কৰা হয়?"
   },
   "options": [
    {
     "en": "15 August",
     "as": "১৫ আগষ্ট"
    },
    {
     "en": "26 January",
     "as": "২৬ জানুৱাৰী"
    },
    {
     "en": "2 October",
     "as": "২ অক্টোবৰ"
    },
    {
     "en": "5 September",
     "as": "৫ ছেপ্তেম্বৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Republic Day is celebrated on 26 January.",
    "as": "গণৰাজ্য দিৱস ২৬ জানুৱাৰীত পালন কৰা হয়।"
   }
  },
  {
   "id": "important-days-dates-002",
   "q": {
    "en": "National Science Day in India is observed on —",
    "as": "ভাৰতত ৰাষ্ট্ৰীয় বিজ্ঞান দিৱস পালন কৰা হয় —"
   },
   "options": [
    {
     "en": "28 February",
     "as": "২৮ ফেব্ৰুৱাৰী"
    },
    {
     "en": "8 March",
     "as": "৮ মাৰ্চ"
    },
    {
     "en": "5 June",
     "as": "৫ জুন"
    },
    {
     "en": "15 August",
     "as": "১৫ আগষ্ট"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "National Science Day marks C. V. Raman's discovery of the Raman Effect on 28 February 1928.",
    "as": "১৯২৮ চনৰ ২৮ ফেব্ৰুৱাৰীত চি. ভি. ৰমণে ৰমণ প্ৰভাৱ আৱিষ্কাৰ কৰাৰ স্মৃতিত ৰাষ্ট্ৰীয় বিজ্ঞান দিৱস পালন কৰা হয়।"
   }
  },
  {
   "id": "important-days-dates-003",
   "q": {
    "en": "World Day for Safety and Health at Work is observed on —",
    "as": "কৰ্মক্ষেত্ৰত সুৰক্ষা আৰু স্বাস্থ্যৰ বিশ্ব দিৱস পালন কৰা হয় —"
   },
   "options": [
    {
     "en": "28 April",
     "as": "২৮ এপ্ৰিল"
    },
    {
     "en": "28 March",
     "as": "২৮ মাৰ্চ"
    },
    {
     "en": "28 May",
     "as": "২৮ মে'"
    },
    {
     "en": "28 June",
     "as": "২৮ জুন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The World Day for Safety and Health at Work is observed on 28 April every year.",
    "as": "কৰ্মক্ষেত্ৰত সুৰক্ষা আৰু স্বাস্থ্যৰ বিশ্ব দিৱস প্ৰতি বছৰে ২৮ এপ্ৰিলত পালন কৰা হয়।"
   }
  },
  {
   "id": "important-days-dates-004",
   "q": {
    "en": "National Pollution Control Day in India is observed on —",
    "as": "ভাৰতত ৰাষ্ট্ৰীয় প্ৰদূষণ নিয়ন্ত্ৰণ দিৱস পালন কৰা হয় —"
   },
   "options": [
    {
     "en": "2 December",
     "as": "২ ডিচেম্বৰ"
    },
    {
     "en": "2 November",
     "as": "২ নৱেম্বৰ"
    },
    {
     "en": "2 October",
     "as": "২ অক্টোবৰ"
    },
    {
     "en": "2 January",
     "as": "২ জানুৱাৰী"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "National Pollution Control Day is observed on 2 December, marking the Bhopal gas tragedy of 1984.",
    "as": "১৯৮৪ চনৰ ভোপাল গেছ দুৰ্ঘটনাৰ স্মৃতিত ২ ডিচেম্বৰত ৰাষ্ট্ৰীয় প্ৰদূষণ নিয়ন্ত্ৰণ দিৱস পালন কৰা হয়।"
   }
  }
 ],
 "india-rivers-mountains-states": [
  {
   "id": "india-rivers-mountains-states-001",
   "q": {
    "en": "The longest river flowing entirely within India is —",
    "as": "সম্পূৰ্ণৰূপে ভাৰতৰ ভিতৰত বৈ যোৱা আটাইতকৈ দীঘল নদী —"
   },
   "options": [
    {
     "en": "Ganga",
     "as": "গঙ্গা"
    },
    {
     "en": "Godavari",
     "as": "গোদাবৰী"
    },
    {
     "en": "Krishna",
     "as": "কৃষ্ণা"
    },
    {
     "en": "Narmada",
     "as": "নৰ্মদা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Godavari, about 1,465 km long, is the longest river flowing entirely within India.",
    "as": "প্ৰায় ১,৪৬৫ কিলোমিটাৰ দীঘল গোদাবৰী সম্পূৰ্ণৰূপে ভাৰতৰ ভিতৰত বৈ যোৱা আটাইতকৈ দীঘল নদী।"
   }
  },
  {
   "id": "india-rivers-mountains-states-002",
   "q": {
    "en": "The Ganga rises from which glacier?",
    "as": "গংগা কোন হিমবাহৰ পৰা উৎপত্তি হয়?"
   },
   "options": [
    {
     "en": "Gangotri",
     "as": "গংগোত্ৰী"
    },
    {
     "en": "Siachen",
     "as": "ছিয়াচেন"
    },
    {
     "en": "Yamunotri",
     "as": "যমুনোত্ৰী"
    },
    {
     "en": "Zemu",
     "as": "জেমু"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Ganga rises from the Gangotri glacier in the Himalayas.",
    "as": "গংগা হিমালয়ৰ গংগোত্ৰী হিমবাহৰ পৰা উৎপত্তি হয়।"
   }
  },
  {
   "id": "india-rivers-mountains-states-003",
   "q": {
    "en": "The number of Union Territories in India is —",
    "as": "ভাৰতত কেন্দ্ৰীয় শাসিত অঞ্চলৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "India has 28 states and 8 Union Territories.",
    "as": "ভাৰতত ২৮ খন ৰাজ্য আৰু ৮ টা কেন্দ্ৰীয় শাসিত অঞ্চল আছে।"
   }
  },
  {
   "id": "india-rivers-mountains-states-004",
   "q": {
    "en": "Which mountain range lies in the north of India?",
    "as": "ভাৰতৰ উত্তৰত কোন পৰ্বতমালা আছে?"
   },
   "options": [
    {
     "en": "Western Ghats",
     "as": "পশ্চিমঘাট"
    },
    {
     "en": "Himalayas",
     "as": "হিমালয়"
    },
    {
     "en": "Aravalli",
     "as": "আৰাৱলী"
    },
    {
     "en": "Vindhya",
     "as": "বিন্ধ্য"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Himalayas lie in the north of India.",
    "as": "হিমালয় ভাৰতৰ উত্তৰত অৱস্থিত।"
   }
  }
 ],
 "indian-assam-economy": [
  {
   "id": "indian-assam-economy-001",
   "q": {
    "en": "India has which type of economy?",
    "as": "ভাৰতত কেনে ধৰণৰ অৰ্থনীতি আছে?"
   },
   "options": [
    {
     "en": "Capitalist",
     "as": "পুঁজিবাদী"
    },
    {
     "en": "Socialist",
     "as": "সমাজবাদী"
    },
    {
     "en": "Mixed",
     "as": "মিশ্ৰিত"
    },
    {
     "en": "Traditional",
     "as": "পৰম্পৰাগত"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "India has a mixed economy in which both the public and private sectors take part.",
    "as": "ভাৰতত এটা মিশ্ৰিত অৰ্থনীতি আছে য'ত ৰাজহুৱা আৰু ব্যক্তিগত খণ্ড দুয়োটা অংশ লয়।"
   }
  },
  {
   "id": "indian-assam-economy-002",
   "q": {
    "en": "Which sector employs the largest number of people in India?",
    "as": "ভাৰতত কোন খণ্ডই আটাইতকৈ বেছি লোকক নিয়োগ দিয়ে?"
   },
   "options": [
    {
     "en": "Agriculture",
     "as": "কৃষি"
    },
    {
     "en": "Industry",
     "as": "উদ্যোগ"
    },
    {
     "en": "Services",
     "as": "সেৱা"
    },
    {
     "en": "Mining",
     "as": "খনন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Agriculture employs the largest number of people in India.",
    "as": "ভাৰতত কৃষিয়েই আটাইতকৈ বেছি লোকক নিয়োগ দিয়ে।"
   }
  },
  {
   "id": "indian-assam-economy-003",
   "q": {
    "en": "Which is the principal cash crop of Assam?",
    "as": "অসমৰ প্ৰধান নগদ শস্য কোনটো?"
   },
   "options": [
    {
     "en": "Rice",
     "as": "ধান"
    },
    {
     "en": "Tea",
     "as": "চাহ"
    },
    {
     "en": "Jute",
     "as": "পাট"
    },
    {
     "en": "Sugarcane",
     "as": "কুঁহিয়াৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Tea is the principal cash crop of Assam.",
    "as": "চাহ অসমৰ প্ৰধান নগদ শস্য।"
   }
  },
  {
   "id": "indian-assam-economy-004",
   "q": {
    "en": "Assam's principal agro-based industry, built on its largest plantation crop, is —",
    "as": "অসমৰ আটাইতকৈ ডাঙৰ বাগান শস্যৰ ওপৰত আধাৰিত প্ৰধান উদ্যোগ —"
   },
   "options": [
    {
     "en": "Tea",
     "as": "চাহ"
    },
    {
     "en": "Coffee",
     "as": "কফি"
    },
    {
     "en": "Rubber",
     "as": "ৰবৰ"
    },
    {
     "en": "Cotton",
     "as": "কপাহ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Tea is Assam's largest plantation crop and the tea industry is its principal agro-based industry.",
    "as": "চাহ অসমৰ আটাইতকৈ ডাঙৰ বাগান শস্য আৰু চাহ উদ্যোগ ইয়াৰ প্ৰধান কৃষিভিত্তিক উদ্যোগ।"
   }
  }
 ],
 "indian-history": [
  {
   "id": "indian-history-001",
   "q": {
    "en": "In which year was the Indian National Congress founded?",
    "as": "ভাৰতীয় জাতীয় কংগ্ৰেছ কোন বছৰত প্ৰতিষ্ঠা হৈছিল?"
   },
   "options": [
    {
     "en": "1857",
     "as": "১৮৫৭"
    },
    {
     "en": "1885",
     "as": "১৮৮৫"
    },
    {
     "en": "1905",
     "as": "১৯০৫"
    },
    {
     "en": "1920",
     "as": "১৯২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Indian National Congress was founded in 1885.",
    "as": "ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হৈছিল।"
   }
  },
  {
   "id": "indian-history-002",
   "q": {
    "en": "The Revolt of 1857 began from which place?",
    "as": "১৮৫৭ চনৰ বিদ্ৰোহ কোন ঠাইৰ পৰা আৰম্ভ হৈছিল?"
   },
   "options": [
    {
     "en": "Meerut",
     "as": "মিৰাট"
    },
    {
     "en": "Delhi",
     "as": "দিল্লী"
    },
    {
     "en": "Kanpur",
     "as": "কানপুৰ"
    },
    {
     "en": "Lucknow",
     "as": "লক্ষ্ণৌ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Revolt of 1857 began from Meerut.",
    "as": "১৮৫৭ চনৰ বিদ্ৰোহ মিৰাটৰ পৰা আৰম্ভ হৈছিল।"
   }
  },
  {
   "id": "indian-history-003",
   "q": {
    "en": "In which year did India become independent?",
    "as": "ভাৰত কোন বছৰত স্বাধীন হৈছিল?"
   },
   "options": [
    {
     "en": "1942",
     "as": "১৯৪২"
    },
    {
     "en": "1945",
     "as": "১৯৪৫"
    },
    {
     "en": "1947",
     "as": "১৯৪৭"
    },
    {
     "en": "1950",
     "as": "১৯৫০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "India became independent on 15 August 1947.",
    "as": "ভাৰত ১৯৪৭ চনৰ ১৫ আগষ্টত স্বাধীন হৈছিল।"
   }
  },
  {
   "id": "indian-history-004",
   "q": {
    "en": "The Quit India Movement was launched in —",
    "as": "ভাৰত ছাড়ো আন্দোলন আৰম্ভ হৈছিল —"
   },
   "options": [
    {
     "en": "1930",
     "as": "১৯৩০"
    },
    {
     "en": "1935",
     "as": "১৯৩৫"
    },
    {
     "en": "1942",
     "as": "১৯৪২"
    },
    {
     "en": "1946",
     "as": "১৯৪৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The Quit India Movement was launched in 1942.",
    "as": "ভাৰত ছাড়ো আন্দোলন ১৯৪২ চনত আৰম্ভ হৈছিল।"
   }
  }
 ],
 "lcm-hcf": [
  {
   "id": "lcm-hcf-001",
   "q": {
    "en": "The HCF of 36 and 48 is —",
    "as": "36 আৰু 48 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "36 = 2^2 x 3^2 and 48 = 2^4 x 3, so HCF = 2^2 x 3 = 12.",
    "as": "36 = 2^2 x 3^2 আৰু 48 = 2^4 x 3, গতিকে গ.সা.উ. = 2^2 x 3 = 12।"
   }
  },
  {
   "id": "lcm-hcf-002",
   "q": {
    "en": "The LCM of 15, 20 and 30 is —",
    "as": "15, 20 আৰু 30 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "15 = 3x5, 20 = 2^2x5, 30 = 2x3x5, so LCM = 2^2 x 3 x 5 = 60.",
    "as": "15 = 3x5, 20 = 2^2x5, 30 = 2x3x5, গতিকে ল.সা.গু. = 2^2 x 3 x 5 = 60।"
   }
  },
  {
   "id": "lcm-hcf-003",
   "q": {
    "en": "The product of the HCF and the LCM of two numbers is always equal to —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. আৰু ল.সা.গু.ৰ গুণফল সদায় সমান —"
   },
   "options": [
    {
     "en": "the product of the numbers",
     "as": "সংখ্যা দুটাৰ গুণফল"
    },
    {
     "en": "their average",
     "as": "সিহঁতৰ গড়"
    },
    {
     "en": "the sum of the numbers",
     "as": "সংখ্যা দুটাৰ যোগফল"
    },
    {
     "en": "the difference of the numbers",
     "as": "সংখ্যা দুটাৰ পাৰ্থক্য"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "For any two numbers, HCF x LCM = product of the numbers.",
    "as": "যিকোনো দুটা সংখ্যাৰ বাবে, গ.সা.উ. x ল.সা.গু. = সংখ্যা দুটাৰ গুণফল।"
   }
  },
  {
   "id": "lcm-hcf-004",
   "q": {
    "en": "The greatest number that divides 43, 91 and 183 leaving the same remainder 3 in each case is —",
    "as": "43, 91 আৰু 183 ক হৰণ কৰিলে প্ৰতিটোতে একে ভাগশেষ 3 এৰি যোৱা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Subtracting 3 gives 40, 88 and 180; their HCF is 4.",
    "as": "3 বিয়োগ কৰিলে 40, 88 আৰু 180 পোৱা যায়; সিহঁতৰ গ.সা.উ. 4।"
   }
  },
  {
   "id": "lcm-hcf-005",
   "q": {
    "en": "The least number which when divided by 12, 15 and 18 leaves a remainder 5 in each case is —",
    "as": "12, 15 আৰু 18 ৰে হৰণ কৰিলে প্ৰতিটোতে ভাগশেষ 5 এৰি যোৱা আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "185",
     "as": "১৮৫"
    },
    {
     "en": "175",
     "as": "১৭৫"
    },
    {
     "en": "195",
     "as": "১৯৫"
    },
    {
     "en": "180",
     "as": "১৮০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM of 12, 15, 18 = 180; add 5 to get 185.",
    "as": "12, 15, 18 ৰ ল.সা.গু. = 180; 5 যোগ কৰিলে 185।"
   }
  },
  {
   "id": "lcm-hcf-006",
   "q": {
    "en": "The HCF of two co-prime numbers is —",
    "as": "দুটা সহ-মৌলিক সংখ্যাৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "the smaller number",
     "as": "সৰু সংখ্যাটো"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "their product",
     "as": "সিহঁতৰ গুণফল"
    },
    {
     "en": "0",
     "as": "০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Co-prime numbers share no common factor other than 1.",
    "as": "সহ-মৌলিক সংখ্যাবোৰত 1 ৰ বাহিৰে কোনো সাধাৰণ উৎপাদক নাথাকে।"
   }
  },
  {
   "id": "lcm-hcf-007",
   "q": {
    "en": "The LCM of 7 and 11 is —",
    "as": "7 আৰু 11 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "154",
     "as": "১৫৪"
    },
    {
     "en": "77",
     "as": "৭৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Both are prime, so LCM = 7 x 11 = 77.",
    "as": "দুয়োটা মৌলিক, গতিকে ল.সা.গু. = 7 x 11 = 77।"
   }
  },
  {
   "id": "lcm-hcf-008",
   "q": {
    "en": "The largest number that divides 62, 132 and 237 leaving the same remainder in each case is —",
    "as": "62, 132 আৰু 237 ক হৰণ কৰিলে প্ৰতিটোতে একে ভাগশেষ এৰি যোৱা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "70",
     "as": "৭০"
    },
    {
     "en": "35",
     "as": "৩৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Differences 70, 175 and 105 have HCF 35.",
    "as": "পাৰ্থক্য 70, 175 আৰু 105 ৰ গ.সা.উ. 35।"
   }
  },
  {
   "id": "lcm-hcf-009",
   "q": {
    "en": "Three bells toll at intervals of 6, 8 and 12 minutes. If they toll together at 8:00 a.m., they next toll together at —",
    "as": "তিনিটা ঘণ্টা 6, 8 আৰু 12 মিনিটৰ বিৰতিত বাজে। 8:00 বজাত একেলগে বাজিলে পুনৰ একেলগে বাজিব —"
   },
   "options": [
    {
     "en": "8:48 a.m.",
     "as": "৮:৪৮ a.m."
    },
    {
     "en": "8:36 a.m.",
     "as": "৮:৩৬ a.m."
    },
    {
     "en": "8:24 a.m.",
     "as": "৮:২৪ a.m."
    },
    {
     "en": "9:00 a.m.",
     "as": "৯:০০ a.m."
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM of 6, 8 and 12 is 24 minutes, so they toll together at 8:24 a.m.",
    "as": "6, 8 আৰু 12 ৰ ল.সা.গু. 24 মিনিট, গতিকে 8:24 বজাত একেলগে বাজিব।"
   }
  },
  {
   "id": "lcm-hcf-010",
   "q": {
    "en": "The HCF of 0.6 and 0.9 is —",
    "as": "0.6 আৰু 0.9 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "0.03",
     "as": "০.০৩"
    },
    {
     "en": "0.3",
     "as": "০.৩"
    },
    {
     "en": "0.1",
     "as": "০.১"
    },
    {
     "en": "3",
     "as": "৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Write as 6/10 and 9/10; the HCF is 3/10 = 0.3.",
    "as": "6/10 আৰু 9/10 হিচাপে লিখিলে গ.সা.উ. 3/10 = 0.3।"
   }
  },
  {
   "id": "lcm-hcf-011",
   "q": {
    "en": "If the LCM of two numbers is 180 and their HCF is 6, then their product is —",
    "as": "দুটা সংখ্যাৰ ল.সা.গু. 180 আৰু গ.সা.উ. 6 হ'লে সিহঁতৰ গুণফল —"
   },
   "options": [
    {
     "en": "1080",
     "as": "১০৮০"
    },
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "186",
     "as": "১৮৬"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Product = HCF x LCM = 6 x 180 = 1080.",
    "as": "গুণফল = গ.সা.উ. x ল.সা.গু. = 6 x 180 = 1080।"
   }
  },
  {
   "id": "lcm-hcf-012",
   "q": {
    "en": "The smallest square number that is divisible by 4, 6 and 10 is —",
    "as": "4, 6 আৰু 10 ৰে বিভাজ্য আটাইতকৈ সৰু বৰ্গ সংখ্যা —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "3600",
     "as": "৩৬০০"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM of 4, 6, 10 = 60 = 2^2 x 3 x 5; to make a square multiply by 3 x 5 = 15, giving 900.",
    "as": "4, 6, 10 ৰ ল.সা.গু. = 60 = 2^2 x 3 x 5; বৰ্গ কৰিবলৈ 3 x 5 = 15 ৰে পূৰণ কৰিলে 900।"
   }
  }
 ],
 "mathematical-operations": [
  {
   "id": "mathematical-operations-001",
   "q": {
    "en": "If + means ×, then 5 + 3 = ?",
    "as": "যদি + ৰ অৰ্থ × হয়, তেন্তে 5 + 3 = ?"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "53",
     "as": "৫৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "With + meaning multiplication, 5 + 3 becomes 5 × 3 = 15.",
    "as": "+ ৰ অৰ্থ পূৰণ হ'লে 5 + 3 এ 5 × 3 = 15 হয়।"
   }
  },
  {
   "id": "mathematical-operations-002",
   "q": {
    "en": "If − means ÷, then 20 − 4 = ?",
    "as": "যদি − ৰ অৰ্থ ÷ হয়, তেন্তে 20 − 4 = ?"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "80",
     "as": "৮০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "With − meaning division, 20 − 4 becomes 20 ÷ 4 = 5.",
    "as": "− ৰ অৰ্থ হৰণ হ'লে 20 − 4 এ 20 ÷ 4 = 5 হয়।"
   }
  },
  {
   "id": "mathematical-operations-003",
   "q": {
    "en": "If × means +, then 3 × 4 = ?",
    "as": "যদি × ৰ অৰ্থ + হয়, তেন্তে 3 × 4 = ?"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "34",
     "as": "৩৪"
    },
    {
     "en": "1",
     "as": "১"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "With × meaning addition, 3 × 4 becomes 3 + 4 = 7.",
    "as": "× ৰ অৰ্থ যোগ হ'লে 3 × 4 এ 3 + 4 = 7 হয়।"
   }
  },
  {
   "id": "mathematical-operations-004",
   "q": {
    "en": "If ÷ means −, then 10 ÷ 4 = ?",
    "as": "যদি ÷ ৰ অৰ্থ − হয়, তেন্তে 10 ÷ 4 = ?"
   },
   "options": [
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "2.5",
     "as": "২.৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "With ÷ meaning subtraction, 10 ÷ 4 becomes 10 − 4 = 6.",
    "as": "÷ ৰ অৰ্থ বিয়োগ হ'লে 10 ÷ 4 এ 10 − 4 = 6 হয়।"
   }
  }
 ],
 "mirror-water-image": [
  {
   "id": "mirror-water-image-001",
   "q": {
    "en": "A mirror image interchanges —",
    "as": "দাপোণৰ প্ৰতিবিম্বই সলনি কৰে —"
   },
   "options": [
    {
     "en": "top and bottom",
     "as": "ওপৰ আৰু তল"
    },
    {
     "en": "left and right",
     "as": "বাওঁ আৰু সোঁ"
    },
    {
     "en": "both",
     "as": "দুয়োটা"
    },
    {
     "en": "neither",
     "as": "একো নহয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A mirror image interchanges the left and the right of a figure.",
    "as": "দাপোণৰ প্ৰতিবিম্বই চিত্ৰৰ বাওঁ আৰু সোঁ সলনি কৰে।"
   }
  },
  {
   "id": "mirror-water-image-002",
   "q": {
    "en": "A water image interchanges —",
    "as": "পানীৰ প্ৰতিবিম্বই সলনি কৰে —"
   },
   "options": [
    {
     "en": "top and bottom",
     "as": "ওপৰ আৰু তল"
    },
    {
     "en": "left and right",
     "as": "বাওঁ আৰু সোঁ"
    },
    {
     "en": "both",
     "as": "দুয়োটা"
    },
    {
     "en": "neither",
     "as": "একো নহয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A water image interchanges the top and the bottom of a figure.",
    "as": "পানীৰ প্ৰতিবিম্বই চিত্ৰৰ ওপৰ আৰু তল সলনি কৰে।"
   }
  },
  {
   "id": "mirror-water-image-003",
   "q": {
    "en": "In a mirror image, the top and bottom of the figure —",
    "as": "দাপোণৰ প্ৰতিবিম্বত চিত্ৰৰ ওপৰ আৰু তল —"
   },
   "options": [
    {
     "en": "change",
     "as": "সলনি হয়"
    },
    {
     "en": "do not change",
     "as": "নসলনি"
    },
    {
     "en": "disappear",
     "as": "নোহোৱা হয়"
    },
    {
     "en": "are doubled",
     "as": "দুগুণ হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "In a mirror image only the left and right change; the top and bottom stay the same.",
    "as": "দাপোণৰ প্ৰতিবিম্বত কেৱল বাওঁ আৰু সোঁ সলনি হয়; ওপৰ আৰু তল একেই থাকে।"
   }
  },
  {
   "id": "mirror-water-image-004",
   "q": {
    "en": "In a water image, the left and right of the figure —",
    "as": "পানীৰ প্ৰতিবিম্বত চিত্ৰৰ বাওঁ আৰু সোঁ —"
   },
   "options": [
    {
     "en": "change",
     "as": "সলনি হয়"
    },
    {
     "en": "do not change",
     "as": "নসলনি"
    },
    {
     "en": "disappear",
     "as": "নোহোৱা হয়"
    },
    {
     "en": "are doubled",
     "as": "দুগুণ হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "In a water image only the top and bottom change; the left and right stay the same.",
    "as": "পানীৰ প্ৰতিবিম্বত কেৱল ওপৰ আৰু তল সলনি হয়; বাওঁ আৰু সোঁ একেই থাকে।"
   }
  }
 ],
 "narration": [
  {
   "id": "narration-001",
   "q": {
    "en": "Change to indirect: He said, 'I am tired.'",
    "as": "পৰোক্ষলৈ সলাওক: He said, 'I am tired.'"
   },
   "options": [
    {
     "en": "He said that he is tired.",
     "as": "He said that he is tired."
    },
    {
     "en": "He said that he was tired.",
     "as": "He said that he was tired."
    },
    {
     "en": "He said that I was tired.",
     "as": "He said that I was tired."
    },
    {
     "en": "He says that he was tired.",
     "as": "He says that he was tired."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The reporting verb is in the past, so the tense shifts back and I becomes he.",
    "as": "ৰিপৰ্টিং ক্ৰিয়া অতীতত, গতিকে কাল পিছলৈ যায় আৰু I এ he হয়।"
   }
  },
  {
   "id": "narration-002",
   "q": {
    "en": "Change to indirect: She asked, 'Where do you live?'",
    "as": "পৰোক্ষলৈ সলাওক: She asked, 'Where do you live?'"
   },
   "options": [
    {
     "en": "She asked where I live.",
     "as": "She asked where I live."
    },
    {
     "en": "She asked where I lived.",
     "as": "She asked where I lived."
    },
    {
     "en": "She asked that where I lived.",
     "as": "She asked that where I lived."
    },
    {
     "en": "She asked if I lived.",
     "as": "She asked if I lived."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A wh-question keeps its question word and the tense shifts back.",
    "as": "Wh-প্ৰশ্নই নিজৰ প্ৰশ্নবোধক শব্দ ৰাখে আৰু কাল পিছলৈ যায়।"
   }
  },
  {
   "id": "narration-003",
   "q": {
    "en": "Change to indirect: He said, 'Please help me.'",
    "as": "পৰোক্ষলৈ সলাওক: He said, 'Please help me.'"
   },
   "options": [
    {
     "en": "He requested to help him.",
     "as": "He requested to help him."
    },
    {
     "en": "He requested me to help him.",
     "as": "He requested me to help him."
    },
    {
     "en": "He said to help him.",
     "as": "He said to help him."
    },
    {
     "en": "He told help me.",
     "as": "He told help me."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A request in indirect speech uses requested with the object and to.",
    "as": "পৰোক্ষ উক্তিত অনুৰোধৰ বাবে requested, কৰ্ম আৰু to ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "narration-004",
   "q": {
    "en": "Which linking word joins a reported statement?",
    "as": "পৰোক্ষ বিবৃতি সংযোগ কৰা শব্দ কোনটো?"
   },
   "options": [
    {
     "en": "if",
     "as": "if"
    },
    {
     "en": "that",
     "as": "that"
    },
    {
     "en": "whether",
     "as": "whether"
    },
    {
     "en": "to",
     "as": "to"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A reported statement is joined by that.",
    "as": "পৰোক্ষ বিবৃতি that ৰে যোগ কৰা হয়।"
   }
  }
 ],
 "number-alphabet-series": [
  {
   "id": "number-alphabet-series-001",
   "q": {
    "en": "Find the next term: 2, 4, 6, 8, ?",
    "as": "পিছৰ পদটো বিচাৰক: 2, 4, 6, 8, ?"
   },
   "options": [
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "14",
     "as": "১৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The terms increase by 2 each time, so the next term is 10.",
    "as": "পদবোৰ প্ৰতিবাৰ 2 ৰে বাঢ়ে, গতিকে পিছৰ পদ 10।"
   }
  },
  {
   "id": "number-alphabet-series-002",
   "q": {
    "en": "Find the next term: 3, 9, 27, ?",
    "as": "পিছৰ পদটো বিচাৰক: 3, 9, 27, ?"
   },
   "options": [
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "54",
     "as": "৫৪"
    },
    {
     "en": "81",
     "as": "৮১"
    },
    {
     "en": "90",
     "as": "৯০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Each term is multiplied by 3, so the next term is 81.",
    "as": "প্ৰতিটো পদ 3 ৰে পূৰণ হয়, গতিকে পিছৰ পদ 81।"
   }
  },
  {
   "id": "number-alphabet-series-003",
   "q": {
    "en": "Find the next letter: A, C, E, G, ?",
    "as": "পিছৰ আখৰটো বিচাৰক: A, C, E, G, ?"
   },
   "options": [
    {
     "en": "H",
     "as": "H"
    },
    {
     "en": "I",
     "as": "I"
    },
    {
     "en": "J",
     "as": "J"
    },
    {
     "en": "K",
     "as": "K"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Every alternate letter is taken, so after G comes I.",
    "as": "প্ৰতি দ্বিতীয় আখৰ লোৱা হয়, গতিকে G ৰ পিছত I আহে।"
   }
  },
  {
   "id": "number-alphabet-series-004",
   "q": {
    "en": "Find the missing term: 1, 4, 9, 16, ?",
    "as": "নোহোৱা পদটো বিচাৰক: 1, 4, 9, 16, ?"
   },
   "options": [
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "36",
     "as": "৩৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "These are the squares of 1, 2, 3, 4, so the next is 5 squared = 25.",
    "as": "এইবোৰ 1, 2, 3, 4 ৰ বৰ্গ, গতিকে পিছৰটো 5 ৰ বৰ্গ = 25।"
   }
  }
 ],
 "number-system": [
  {
   "id": "number-system-001",
   "q": {
    "en": "The place value of the digit 7 in 3,74,251 is —",
    "as": "3,74,251 সংখ্যাটোত 7 অংকটোৰ স্থানীয় মান —"
   },
   "options": [
    {
     "en": "70000",
     "as": "৭০০০০"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "7000",
     "as": "৭০০০"
    },
    {
     "en": "700",
     "as": "৭০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The digit 7 stands in the ten-thousands place, so its place value is 70,000.",
    "as": "7 অংকটো হাজাৰ-দহৰ ঘৰত আছে, গতিকে স্থানীয় মান 70,000।"
   }
  },
  {
   "id": "number-system-002",
   "q": {
    "en": "The smallest odd prime number is —",
    "as": "আটাইতকৈ সৰু অযুগ্ম মৌলিক সংখ্যা —"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "2 is prime but even; the smallest odd prime is 3.",
    "as": "2 মৌলিক কিন্তু যুগ্ম; আটাইতকৈ সৰু অযুগ্ম মৌলিক 3।"
   }
  },
  {
   "id": "number-system-003",
   "q": {
    "en": "The sum of the first 20 natural numbers is —",
    "as": "প্ৰথম 20 টা স্বাভাৱিক সংখ্যাৰ যোগফল —"
   },
   "options": [
    {
     "en": "220",
     "as": "২২০"
    },
    {
     "en": "210",
     "as": "২১০"
    },
    {
     "en": "190",
     "as": "১৯০"
    },
    {
     "en": "200",
     "as": "২০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Sum = n(n+1)/2 = 20 x 21 / 2 = 210.",
    "as": "যোগফল = n(n+1)/2 = 20 x 21 / 2 = 210।"
   }
  },
  {
   "id": "number-system-004",
   "q": {
    "en": "The greatest 4-digit number formed by the digits 3, 0, 7 and 5 (each used once) is —",
    "as": "3, 0, 7 আৰু 5 অংকৰে (প্ৰতিটো এবাৰ) গঠন কৰা আটাইতকৈ ডাঙৰ 4-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "7503",
     "as": "৭৫০৩"
    },
    {
     "en": "7350",
     "as": "৭৩৫০"
    },
    {
     "en": "7530",
     "as": "৭৫৩০"
    },
    {
     "en": "3057",
     "as": "৩০৫৭"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Arranging the digits in descending order 7, 5, 3, 0 gives 7530.",
    "as": "অংকবোৰ অৱৰোহী ক্ৰমত 7, 5, 3, 0 সজালে 7530 পোৱা যায়।"
   }
  },
  {
   "id": "number-system-005",
   "q": {
    "en": "A number is divisible by 9 if —",
    "as": "এটা সংখ্যা 9 ৰে বিভাজ্য হ'ব যদিহে —"
   },
   "options": [
    {
     "en": "it is even",
     "as": "সেয়া যুগ্ম হয়"
    },
    {
     "en": "the sum of its digits is divisible by 9",
     "as": "তাৰ অংকবোৰৰ যোগফল ৯ ৰে বিভাজ্য হয়"
    },
    {
     "en": "its last digit is 9",
     "as": "তাৰ শেষ অংকটো ৯ হয়"
    },
    {
     "en": "its last two digits form a multiple of 9",
     "as": "তাৰ শেষৰ দুটা অংক ৯ ৰ গুণিতক হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The divisibility rule for 9 checks the sum of the digits.",
    "as": "9 ৰ বিভাজ্যতাৰ নিয়মত অংকবোৰৰ যোগফল পৰীক্ষা কৰা হয়।"
   }
  },
  {
   "id": "number-system-006",
   "q": {
    "en": "The LCM of 12 and 18 is —",
    "as": "12 আৰু 18 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "216",
     "as": "২১৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "12 = 2^2 x 3 and 18 = 2 x 3^2, so LCM = 2^2 x 3^2 = 36.",
    "as": "12 = 2^2 x 3 আৰু 18 = 2 x 3^2, গতিকে ল.সা.গু. = 2^2 x 3^2 = 36।"
   }
  },
  {
   "id": "number-system-007",
   "q": {
    "en": "The decimal 0.625 expressed as a fraction in lowest terms is —",
    "as": "0.625 দশমিকক আটাইতকৈ সৰল ৰূপত ভগ্নাংশ হিচাপে প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "7/8",
     "as": "৭/৮"
    },
    {
     "en": "5/16",
     "as": "৫/১৬"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "5/8",
     "as": "৫/৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "0.625 = 625/1000 = 5/8.",
    "as": "0.625 = 625/1000 = 5/8।"
   }
  },
  {
   "id": "number-system-008",
   "q": {
    "en": "The number of factors of 48 is —",
    "as": "48 ৰ উৎপাদকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "48 = 2^4 x 3, so the number of factors is (4+1)(1+1) = 10.",
    "as": "48 = 2^4 x 3, গতিকে উৎপাদকৰ সংখ্যা (4+1)(1+1) = 10।"
   }
  },
  {
   "id": "number-system-009",
   "q": {
    "en": "Which of the following numbers is irrational?",
    "as": "তলৰ কোনটো সংখ্যা অপৰিমেয়?"
   },
   "options": [
    {
     "en": "sqrt(3)",
     "as": "sqrt(৩)"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "0.125",
     "as": "০.১২৫"
    },
    {
     "en": "sqrt(25)",
     "as": "sqrt(২৫)"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "sqrt(3) has a non-terminating, non-repeating decimal expansion, so it is irrational.",
    "as": "sqrt(3) ৰ দশমিক বিস্তৃতি অসসীম আৰু অপুনৰাবৃত্তি, গতিকে ই অপৰিমেয়।"
   }
  },
  {
   "id": "number-system-010",
   "q": {
    "en": "The smallest number that must be added to 1234 to make it divisible by 9 is —",
    "as": "1234 ক 9 ৰে বিভাজ্য কৰিবলৈ যোগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1+2+3+4 = 10; the next multiple of 9 is 18, so add 5.",
    "as": "1+2+3+4 = 10; 9 ৰ পৰৱৰ্তী গুণিতক 18, গতিকে 5 যোগ কৰিব লাগে।"
   }
  },
  {
   "id": "number-system-011",
   "q": {
    "en": "The value of 1/2 + 1/3 + 1/6 is —",
    "as": "1/2 + 1/3 + 1/6 ৰ মান —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM of 2, 3 and 6 is 6, so 3/6 + 2/6 + 1/6 = 6/6 = 1.",
    "as": "2, 3 আৰু 6 ৰ ল.সা.গু. 6, গতিকে 3/6 + 2/6 + 1/6 = 6/6 = 1।"
   }
  },
  {
   "id": "number-system-012",
   "q": {
    "en": "The largest 3-digit number divisible by 11 is —",
    "as": "11 ৰে বিভাজ্য আটাইতকৈ ডাঙৰ 3-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "989",
     "as": "৯৮৯"
    },
    {
     "en": "979",
     "as": "৯৭৯"
    },
    {
     "en": "999",
     "as": "৯৯৯"
    },
    {
     "en": "990",
     "as": "৯৯০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "990 = 11 x 90 and is the greatest 3-digit multiple of 11.",
    "as": "990 = 11 x 90 আৰু 11 ৰ আটাইতকৈ ডাঙৰ 3-অংকৰ গুণিতক।"
   }
  }
 ],
 "odd-one-out": [
  {
   "id": "odd-one-out-001",
   "q": {
    "en": "Find the odd one out: Apple, Banana, Mango, Potato",
    "as": "অমিলটো বিচাৰক: Apple, Banana, Mango, Potato"
   },
   "options": [
    {
     "en": "Apple",
     "as": "Apple"
    },
    {
     "en": "Banana",
     "as": "Banana"
    },
    {
     "en": "Mango",
     "as": "Mango"
    },
    {
     "en": "Potato",
     "as": "Potato"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Potato is a vegetable while the others are fruits.",
    "as": "Potato এটা পাচলি, আনবোৰ ফল।"
   }
  },
  {
   "id": "odd-one-out-002",
   "q": {
    "en": "Find the odd one out: 3, 5, 7, 9",
    "as": "অমিলটো বিচাৰক: 3, 5, 7, 9"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3, 5 and 7 are prime numbers while 9 is composite.",
    "as": "3, 5 আৰু 7 মৌলিক সংখ্যা, কিন্তু 9 যৌগিক।"
   }
  },
  {
   "id": "odd-one-out-003",
   "q": {
    "en": "Find the odd one out: Delhi, Mumbai, Assam, Chennai",
    "as": "অমিলটো বিচাৰক: Delhi, Mumbai, Assam, Chennai"
   },
   "options": [
    {
     "en": "Delhi",
     "as": "Delhi"
    },
    {
     "en": "Mumbai",
     "as": "Mumbai"
    },
    {
     "en": "Assam",
     "as": "Assam"
    },
    {
     "en": "Chennai",
     "as": "Chennai"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Assam is a state while the others are cities.",
    "as": "Assam এখন ৰাজ্য, আনবোৰ চহৰ।"
   }
  },
  {
   "id": "odd-one-out-004",
   "q": {
    "en": "Find the odd one out: Rose, Lotus, Lily, Mango",
    "as": "অমিলটো বিচাৰক: Rose, Lotus, Lily, Mango"
   },
   "options": [
    {
     "en": "Rose",
     "as": "Rose"
    },
    {
     "en": "Lotus",
     "as": "Lotus"
    },
    {
     "en": "Lily",
     "as": "Lily"
    },
    {
     "en": "Mango",
     "as": "Mango"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Mango is a fruit while the others are flowers.",
    "as": "Mango এটা ফল, আনবোৰ ফুল।"
   }
  }
 ],
 "one-word-substitution": [
  {
   "id": "one-word-substitution-001",
   "q": {
    "en": "One who writes books is called a —",
    "as": "কিতাপ লিখা ব্যক্তিক বোলা হয় —"
   },
   "options": [
    {
     "en": "publisher",
     "as": "publisher"
    },
    {
     "en": "author",
     "as": "author"
    },
    {
     "en": "bookseller",
     "as": "bookseller"
    },
    {
     "en": "reader",
     "as": "reader"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A person who writes books is an author.",
    "as": "কিতাপ লিখা ব্যক্তিক author বোলা হয়।"
   }
  },
  {
   "id": "one-word-substitution-002",
   "q": {
    "en": "A place where books are kept is a —",
    "as": "কিতাপ ৰখা ঠাইক বোলা হয় —"
   },
   "options": [
    {
     "en": "library",
     "as": "library"
    },
    {
     "en": "gallery",
     "as": "gallery"
    },
    {
     "en": "museum",
     "as": "museum"
    },
    {
     "en": "office",
     "as": "office"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A library is a place where books are kept for reading.",
    "as": "Library হৈছে পঢ়াৰ বাবে কিতাপ ৰখা ঠাই।"
   }
  },
  {
   "id": "one-word-substitution-003",
   "q": {
    "en": "One who loves books is a —",
    "as": "কিতাপ ভাল পোৱা ব্যক্তিক বোলা হয় —"
   },
   "options": [
    {
     "en": "bibliophile",
     "as": "bibliophile"
    },
    {
     "en": "philanthropist",
     "as": "philanthropist"
    },
    {
     "en": "linguist",
     "as": "linguist"
    },
    {
     "en": "scholar",
     "as": "scholar"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A bibliophile is a person who loves books.",
    "as": "Bibliophile হৈছে কিতাপ ভাল পোৱা ব্যক্তি।"
   }
  },
  {
   "id": "one-word-substitution-004",
   "q": {
    "en": "A fear of water is called —",
    "as": "পানীৰ ভয়ক বোলা হয় —"
   },
   "options": [
    {
     "en": "hydrophobia",
     "as": "hydrophobia"
    },
    {
     "en": "claustrophobia",
     "as": "claustrophobia"
    },
    {
     "en": "acrophobia",
     "as": "acrophobia"
    },
    {
     "en": "xenophobia",
     "as": "xenophobia"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Hydrophobia is the fear of water.",
    "as": "Hydrophobia হৈছে পানীৰ ভয়।"
   }
  }
 ],
 "panchayati-raj": [
  {
   "id": "panchayati-raj-001",
   "q": {
    "en": "Which amendment gave constitutional status to Panchayati Raj?",
    "as": "কোন সংশোধনীয়ে পঞ্চায়তী ৰাজক সাংবিধানিক মৰ্যাদা দিছিল?"
   },
   "options": [
    {
     "en": "42nd",
     "as": "৪২ সংখ্যক"
    },
    {
     "en": "44th",
     "as": "৪৪ সংখ্যক"
    },
    {
     "en": "73rd",
     "as": "৭৩ সংখ্যক"
    },
    {
     "en": "86th",
     "as": "৮৬ সংখ্যক"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The 73rd Constitutional Amendment Act of 1992 gave constitutional status to Panchayati Raj.",
    "as": "১৯৯২ চনৰ ৭৩ সংখ্যক সাংবিধানিক সংশোধনী আইনে পঞ্চায়তী ৰাজক সাংবিধানিক মৰ্যাদা দিছিল।"
   }
  },
  {
   "id": "panchayati-raj-002",
   "q": {
    "en": "How many tiers does the Panchayati Raj system have?",
    "as": "পঞ্চায়তী ৰাজ ব্যৱস্থাৰ কিমানটা স্তৰ আছে?"
   },
   "options": [
    {
     "en": "One",
     "as": "এটা"
    },
    {
     "en": "Two",
     "as": "দুটা"
    },
    {
     "en": "Three",
     "as": "তিনিটা"
    },
    {
     "en": "Four",
     "as": "চাৰিটা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The Panchayati Raj system has three tiers.",
    "as": "পঞ্চায়তী ৰাজ ব্যৱস্থাৰ তিনিটা স্তৰ আছে।"
   }
  },
  {
   "id": "panchayati-raj-003",
   "q": {
    "en": "The Gram Panchayat functions at which level?",
    "as": "গাঁও পঞ্চায়ত কোন পৰ্যায়ত কাম কৰে?"
   },
   "options": [
    {
     "en": "Village",
     "as": "গাঁও"
    },
    {
     "en": "Block",
     "as": "খণ্ড"
    },
    {
     "en": "District",
     "as": "জিলা"
    },
    {
     "en": "State",
     "as": "ৰাজ্য"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Gram Panchayat functions at the village level.",
    "as": "গাঁও পঞ্চায়ত গাঁও পৰ্যায়ত কাম কৰে।"
   }
  },
  {
   "id": "panchayati-raj-004",
   "q": {
    "en": "What proportion of seats in Panchayati Raj is reserved for women?",
    "as": "পঞ্চায়তী ৰাজত মহিলাৰ বাবে কিমান অংশ আসন সংৰক্ষিত?"
   },
   "options": [
    {
     "en": "One fourth",
     "as": "এক চতুৰ্থাংশ"
    },
    {
     "en": "One third",
     "as": "এক তৃতীয়াংশ"
    },
    {
     "en": "One half",
     "as": "আধা"
    },
    {
     "en": "None",
     "as": "একো নহয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "One third of the seats in Panchayati Raj are reserved for women.",
    "as": "পঞ্চায়তী ৰাজত এখন তৃতীয়াংশ আসন মহিলাৰ বাবে সংৰক্ষিত।"
   }
  }
 ],
 "paper-folding-cutting": [
  {
   "id": "paper-folding-cutting-001",
   "q": {
    "en": "When a sheet is folded once and then cut, the number of holes is —",
    "as": "এখন কাগজ এবাৰ ভাঁজ কৰি কাটিলে ফুটাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "halved",
     "as": "আধা হয়"
    },
    {
     "en": "doubled",
     "as": "দুগুণ হয়"
    },
    {
     "en": "unchanged",
     "as": "অপৰিবৰ্তিত থাকে"
    },
    {
     "en": "tripled",
     "as": "তিনিগুণ হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each fold doubles the number of holes.",
    "as": "প্ৰতিটো ভাঁজে ফুটাৰ সংখ্যা দুগুণ কৰে।"
   }
  },
  {
   "id": "paper-folding-cutting-002",
   "q": {
    "en": "In a paper folding question, the sheet should be unfolded —",
    "as": "কাগজ ভাঁজৰ প্ৰশ্নত কাগজখন মেলি দিব লাগে —"
   },
   "options": [
    {
     "en": "all at once",
     "as": "একেবাৰে"
    },
    {
     "en": "one fold at a time",
     "as": "এবাৰত এটা ভাঁজ"
    },
    {
     "en": "never",
     "as": "কেতিয়াও নহয়"
    },
    {
     "en": "after choosing the option",
     "as": "বিকল্প বাছনি কৰাৰ পিছত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Unfolding one fold at a time and marking the holes at each stage gives the correct pattern.",
    "as": "এবাৰত এটা ভাঁজ মেলি প্ৰতিটো পৰ্যায়ত ফুটা চিহ্নিত কৰিলে শুদ্ধ আৰ্হি পোৱা যায়।"
   }
  },
  {
   "id": "paper-folding-cutting-003",
   "q": {
    "en": "A fold made on the left side of a sheet produces a hole on the right side that is —",
    "as": "কাগজৰ বাওঁফালে কৰা এটা ভাঁজে সোঁফালে সৃষ্টি কৰা ফুটা হৈছে —"
   },
   "options": [
    {
     "en": "identical",
     "as": "একে"
    },
    {
     "en": "a mirror image",
     "as": "দাপোণৰ প্ৰতিবিম্ব"
    },
    {
     "en": "smaller",
     "as": "সৰু"
    },
    {
     "en": "absent",
     "as": "অনুপস্থিত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A fold on one side produces a mirror image of the hole on the other side.",
    "as": "এফালে ভাঁজ কৰিলে আনফালে ফুটাৰ দাপোণ প্ৰতিবিম্ব সৃষ্টি হয়।"
   }
  },
  {
   "id": "paper-folding-cutting-004",
   "q": {
    "en": "Before choosing an option in a paper folding question, one should —",
    "as": "কাগজ ভাঁজৰ প্ৰশ্নত বিকল্প বাছনি কৰাৰ আগতে কৰা উচিত —"
   },
   "options": [
    {
     "en": "guess",
     "as": "অনুমান"
    },
    {
     "en": "draw the unfolded sheet",
     "as": "মেলা কাগজখন অঁকা"
    },
    {
     "en": "count the options",
     "as": "বিকল্প গণনা কৰা"
    },
    {
     "en": "read the question again",
     "as": "প্ৰশ্নটো আকৌ পঢ়া"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Drawing the unfolded sheet with the holes marked gives the answer directly.",
    "as": "ফুটা চিহ্নিত কৰি মেলা কাগজখন অঁকালে উত্তৰ পোনপটীয়াকৈ পোৱা যায়।"
   }
  }
 ],
 "parts-of-speech": [
  {
   "id": "parts-of-speech-001",
   "q": {
    "en": "The word 'beautiful' in 'a beautiful garden' is a —",
    "as": "'a beautiful garden' ত 'beautiful' শব্দটো এটা —"
   },
   "options": [
    {
     "en": "noun",
     "as": "বিশেষ্য"
    },
    {
     "en": "adjective",
     "as": "বিশেষণ"
    },
    {
     "en": "verb",
     "as": "ক্ৰিয়া"
    },
    {
     "en": "adverb",
     "as": "ক্ৰিয়া-বিশেষণ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Beautiful describes the noun garden, so it is an adjective.",
    "as": "Beautiful এ garden বিশেষ্যটোক বৰ্ণনা কৰে, গতিকে ই এটা বিশেষণ।"
   }
  },
  {
   "id": "parts-of-speech-002",
   "q": {
    "en": "In 'she runs quickly', the word 'quickly' is a —",
    "as": "'she runs quickly' ত 'quickly' শব্দটো এটা —"
   },
   "options": [
    {
     "en": "adjective",
     "as": "বিশেষণ"
    },
    {
     "en": "adverb",
     "as": "ক্ৰিয়া-বিশেষণ"
    },
    {
     "en": "noun",
     "as": "বিশেষ্য"
    },
    {
     "en": "pronoun",
     "as": "সৰ্বনাম"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Quickly tells how the action is done, so it is an adverb.",
    "as": "Quickly এ ক্ৰিয়া কেনেকৈ হয় তাক কয়, গতিকে ই ক্ৰিয়া-বিশেষণ।"
   }
  },
  {
   "id": "parts-of-speech-003",
   "q": {
    "en": "The word 'they' is an example of a —",
    "as": "'they' শব্দটো এটা —"
   },
   "options": [
    {
     "en": "noun",
     "as": "বিশেষ্য"
    },
    {
     "en": "pronoun",
     "as": "সৰ্বনাম"
    },
    {
     "en": "verb",
     "as": "ক্ৰিয়া"
    },
    {
     "en": "conjunction",
     "as": "সংযোগ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "They replaces a noun, so it is a pronoun.",
    "as": "They এ এটা বিশেষ্যৰ সলনি বহে, গতিকে ই সৰ্বনাম।"
   }
  },
  {
   "id": "parts-of-speech-004",
   "q": {
    "en": "How many parts of speech are there in English?",
    "as": "ইংৰাজীত কিমানটা শব্দৰ প্ৰকাৰ আছে?"
   },
   "options": [
    {
     "en": "Six",
     "as": "ছয়"
    },
    {
     "en": "Seven",
     "as": "সাত"
    },
    {
     "en": "Eight",
     "as": "আঠ"
    },
    {
     "en": "Nine",
     "as": "ন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "There are eight parts of speech, from noun to interjection.",
    "as": "বিশেষ্যৰ পৰা আবেগলৈ আঠটা শব্দৰ প্ৰকাৰ আছে।"
   }
  }
 ],
 "pattern-completion": [
  {
   "id": "pattern-completion-001",
   "q": {
    "en": "What is the first step in pattern completion?",
    "as": "আৰ্হি পূৰণত প্ৰথম পদক্ষেপ কি?"
   },
   "options": [
    {
     "en": "Guess the answer",
     "as": "উত্তৰ অনুমান কৰা"
    },
    {
     "en": "Extend the lines that touch the missing part",
     "as": "নোহোৱা অংশৰ লগত লগা ৰেখাবোৰ আগবঢ়োৱা"
    },
    {
     "en": "Colour the figure",
     "as": "চিত্ৰত ৰং দিয়া"
    },
    {
     "en": "Count the options",
     "as": "বিকল্প গণনা কৰা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Extending the lines that meet the missing part shows what the piece must look like.",
    "as": "নোহোৱা অংশৰ লগত লগা ৰেখাবোৰ আগবঢ়ালে টুকুৰাটো কেনেকুৱা হ'ব লাগে দেখা যায়।"
   }
  },
  {
   "id": "pattern-completion-002",
   "q": {
    "en": "In pattern completion, the correct option must match the —",
    "as": "আৰ্হি পূৰণত শুদ্ধ বিকল্পই মিলিব লাগে —"
   },
   "options": [
    {
     "en": "colour only",
     "as": "কেৱল ৰঙৰ লগত"
    },
    {
     "en": "lines, curves and shading of the surroundings",
     "as": "চাৰিওফালৰ ৰেখা, বক্ৰৰেখা আৰু ৰঙৰ লগত"
    },
    {
     "en": "size of the page",
     "as": "পৃষ্ঠাৰ আকাৰৰ লগত"
    },
    {
     "en": "number of options",
     "as": "বিকল্পৰ সংখ্যাৰ লগত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The piece must match the lines, curves and shading of the surrounding figure.",
    "as": "টুকুৰাটোৱে চাৰিওফালৰ চিত্ৰৰ ৰেখা, বক্ৰৰেখা আৰু ৰঙৰ লগত মিলিব লাগে।"
   }
  },
  {
   "id": "pattern-completion-003",
   "q": {
    "en": "Checking which part of a missing piece helps to eliminate wrong options?",
    "as": "নোহোৱা টুকুৰাৰ কোন অংশ পৰীক্ষা কৰিলে ভুল বিকল্প আঁতৰাব পাৰি?"
   },
   "options": [
    {
     "en": "The middle",
     "as": "মাজ"
    },
    {
     "en": "The corners",
     "as": "চুক"
    },
    {
     "en": "The colour name",
     "as": "ৰঙৰ নাম"
    },
    {
     "en": "The label",
     "as": "লেবেল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Checking the corners of the empty space eliminates most wrong options quickly.",
    "as": "ৰিক্ত ঠাইৰ চুকবোৰ পৰীক্ষা কৰিলে বেছিভাগ ভুল বিকল্প দ্ৰুতভাৱে আঁতৰি যায়।"
   }
  },
  {
   "id": "pattern-completion-004",
   "q": {
    "en": "A pattern completion option that breaks the flow of lines is —",
    "as": "ৰেখাৰ প্ৰবাহ ভঙা এটা আৰ্হি পূৰণৰ বিকল্প —"
   },
   "options": [
    {
     "en": "correct",
     "as": "শুদ্ধ"
    },
    {
     "en": "incorrect",
     "as": "অশুদ্ধ"
    },
    {
     "en": "always correct",
     "as": "সদায় শুদ্ধ"
    },
    {
     "en": "cannot be judged",
     "as": "বিচাৰ কৰিব নোৱাৰি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "An option that breaks the flow of lines cannot be the correct one.",
    "as": "ৰেখাৰ প্ৰবাহ ভঙা বিকল্প শুদ্ধ হ'ব নোৱাৰে।"
   }
  }
 ],
 "percentage": [
  {
   "id": "percentage-001",
   "q": {
    "en": "What is 15% of 240?",
    "as": "240 ৰ 15% কিমান?"
   },
   "options": [
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "240 x 15 / 100 = 36.",
    "as": "240 x 15 / 100 = 36।"
   }
  },
  {
   "id": "percentage-002",
   "q": {
    "en": "A student scored 450 marks out of 600. His percentage is —",
    "as": "এজন ছাত্ৰই 600 ৰ ভিতৰত 450 নম্বৰ পালে। তেওঁৰ শতাংশ —"
   },
   "options": [
    {
     "en": "75%",
     "as": "৭৫%"
    },
    {
     "en": "65%",
     "as": "৬৫%"
    },
    {
     "en": "70%",
     "as": "৭০%"
    },
    {
     "en": "80%",
     "as": "৮০%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "450 / 600 x 100 = 75%.",
    "as": "450 / 600 x 100 = 75%।"
   }
  },
  {
   "id": "percentage-003",
   "q": {
    "en": "If 35% of a number is 105, the number is —",
    "as": "এটা সংখ্যাৰ 35% 105 হ'লে সংখ্যাটো —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "350",
     "as": "৩৫০"
    },
    {
     "en": "250",
     "as": "২৫০"
    },
    {
     "en": "300",
     "as": "৩০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "105 x 100 / 35 = 300.",
    "as": "105 x 100 / 35 = 300।"
   }
  },
  {
   "id": "percentage-004",
   "q": {
    "en": "The price of an article is increased from ₹80 to ₹92. The percentage increase is —",
    "as": "এটা বস্তুৰ মূল্য ₹80 ৰ পৰা ₹92 লৈ বাঢ়িল। শতাংশ বৃদ্ধি —"
   },
   "options": [
    {
     "en": "18%",
     "as": "১৮%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "12%",
     "as": "১২%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Increase = 12; 12 / 80 x 100 = 15%.",
    "as": "বৃদ্ধি = 12; 12 / 80 x 100 = 15%।"
   }
  },
  {
   "id": "percentage-005",
   "q": {
    "en": "If the price of rice is reduced by 20%, the new price is what per cent of the original?",
    "as": "চাউলৰ মূল্য 20% হ্ৰাস হ'লে নতুন মূল্য মূল্যৰ শতকৰা কিমান?"
   },
   "options": [
    {
     "en": "80%",
     "as": "৮০%"
    },
    {
     "en": "70%",
     "as": "৭০%"
    },
    {
     "en": "120%",
     "as": "১২০%"
    },
    {
     "en": "75%",
     "as": "৭৫%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A 20% reduction leaves 80% of the original price.",
    "as": "20% হ্ৰাস হ'লে মূলৰ 80% বাকী থাকে।"
   }
  },
  {
   "id": "percentage-006",
   "q": {
    "en": "45% of 60 + 60% of 45 is —",
    "as": "60 ৰ 45% + 45 ৰ 60% —"
   },
   "options": [
    {
     "en": "108",
     "as": "১০৮"
    },
    {
     "en": "54",
     "as": "৫৪"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "99",
     "as": "৯৯"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Both terms equal 27, so 27 + 27 = 54.",
    "as": "দুয়োটা ৰাশি 27 ৰ সমান, গতিকে 27 + 27 = 54।"
   }
  },
  {
   "id": "percentage-007",
   "q": {
    "en": "A number is first increased by 20% and then decreased by 20%. The net change is —",
    "as": "এটা সংখ্যা প্ৰথমে 20% বৃদ্ধি কৰি তাৰপিছত 20% হ্ৰাস কৰা হ'ল। মুঠ পৰিৱৰ্তন —"
   },
   "options": [
    {
     "en": "2% decrease",
     "as": "২% হ্ৰাস"
    },
    {
     "en": "4% increase",
     "as": "৪% বৃদ্ধি"
    },
    {
     "en": "no change",
     "as": "কোনো পৰিৱৰ্তন নাই"
    },
    {
     "en": "4% decrease",
     "as": "৪% হ্ৰাস"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1.2 x 0.8 = 0.96, a net decrease of 4%.",
    "as": "1.2 x 0.8 = 0.96, মুঠ 4% হ্ৰাস।"
   }
  },
  {
   "id": "percentage-008",
   "q": {
    "en": "The fraction 7/8 expressed as a percentage is —",
    "as": "7/8 ভগ্নাংশক শতাংশত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "85%",
     "as": "৮৫%"
    },
    {
     "en": "80%",
     "as": "৮০%"
    },
    {
     "en": "78%",
     "as": "৭৮%"
    },
    {
     "en": "87.5%",
     "as": "৮৭.৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "7/8 x 100 = 87.5%.",
    "as": "7/8 x 100 = 87.5%।"
   }
  },
  {
   "id": "percentage-009",
   "q": {
    "en": "In an examination 60% of the students passed and 240 failed. The total number of students was —",
    "as": "এখন পৰীক্ষাত 60% ছাত্ৰ উত্তীৰ্ণ আৰু 240 অনুত্তীৰ্ণ। মুঠ ছাত্ৰৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "640",
     "as": "৬৪০"
    },
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "500",
     "as": "৫০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "40% failed = 240, so the total = 240 x 100 / 40 = 600.",
    "as": "40% অনুত্তীৰ্ণ = 240, গতিকে মুঠ = 240 x 100 / 40 = 600।"
   }
  },
  {
   "id": "percentage-010",
   "q": {
    "en": "The population of a town increases by 5% every year. If the present population is 40,000, the population after one year will be —",
    "as": "এখন নগৰৰ জনসংখ্যা প্ৰতি বছৰে 5% বাঢ়ে। বৰ্তমান জনসংখ্যা 40,000 হ'লে এবছৰৰ পিছত জনসংখ্যা —"
   },
   "options": [
    {
     "en": "42,000",
     "as": "৪২,০০০"
    },
    {
     "en": "45,000",
     "as": "৪৫,০০০"
    },
    {
     "en": "41,000",
     "as": "৪১,০০০"
    },
    {
     "en": "44,000",
     "as": "৪৪,০০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "40,000 + 5% of 40,000 = 42,000.",
    "as": "40,000 + 40,000 ৰ 5% = 42,000।"
   }
  },
  {
   "id": "percentage-011",
   "q": {
    "en": "If A's income is 25% more than B's, then B's income is less than A's by —",
    "as": "A ৰ আয় B ৰ আয়তকৈ 25% বেছি হ'লে, B ৰ আয় A ৰ আয়তকৈ কম —"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "If B = 100, A = 125; then 25/125 x 100 = 20%.",
    "as": "B = 100 হ'লে A = 125; গতিকে 25/125 x 100 = 20%।"
   }
  },
  {
   "id": "percentage-012",
   "q": {
    "en": "What is 12.5% of 800?",
    "as": "800 ৰ 12.5% কিমান?"
   },
   "options": [
    {
     "en": "125",
     "as": "১২৫"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "80",
     "as": "৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "12.5% = 1/8, and 800 / 8 = 100.",
    "as": "12.5% = 1/8, আৰু 800 / 8 = 100।"
   }
  }
 ],
 "prepositions": [
  {
   "id": "prepositions-001",
   "q": {
    "en": "The book is — the table.",
    "as": "কিতাপখন টেবুলৰ — আছে।"
   },
   "options": [
    {
     "en": "in",
     "as": "in"
    },
    {
     "en": "on",
     "as": "on"
    },
    {
     "en": "at",
     "as": "at"
    },
    {
     "en": "to",
     "as": "to"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "On is used for an object resting on a surface.",
    "as": "পৃষ্ঠ এটাৰ ওপৰত থকা বস্তুৰ বাবে on ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "prepositions-002",
   "q": {
    "en": "He goes to school — 8 o'clock.",
    "as": "তেওঁ — টা বজাত স্কুললৈ যায়।"
   },
   "options": [
    {
     "en": "in",
     "as": "in"
    },
    {
     "en": "on",
     "as": "on"
    },
    {
     "en": "at",
     "as": "at"
    },
    {
     "en": "by",
     "as": "by"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "At is used with an exact point of time.",
    "as": "সঠিক সময়ৰ সৈতে at ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "prepositions-003",
   "q": {
    "en": "Assam is — the north-east of India.",
    "as": "অসম ভাৰতৰ উত্তৰ-পূবত —।"
   },
   "options": [
    {
     "en": "on",
     "as": "on"
    },
    {
     "en": "in",
     "as": "in"
    },
    {
     "en": "at",
     "as": "at"
    },
    {
     "en": "with",
     "as": "with"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "In is used for a large area or region.",
    "as": "ডাঙৰ অঞ্চল বা এলেকাৰ বাবে in ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "prepositions-004",
   "q": {
    "en": "She is good — mathematics.",
    "as": "তাই গণিতত —।"
   },
   "options": [
    {
     "en": "in",
     "as": "in"
    },
    {
     "en": "at",
     "as": "at"
    },
    {
     "en": "on",
     "as": "on"
    },
    {
     "en": "for",
     "as": "for"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The adjective good takes at before a subject of skill.",
    "as": "দক্ষতাৰ বিষয়ৰ আগত good এ at পূৰ্বসৰ্গ লয়।"
   }
  }
 ],
 "president-pm-governor-cm": [
  {
   "id": "president-pm-governor-cm-001",
   "q": {
    "en": "Who is the head of the Indian state?",
    "as": "ভাৰত ৰাষ্ট্ৰৰ মুৰব্বী কোন?"
   },
   "options": [
    {
     "en": "Prime Minister",
     "as": "প্ৰধানমন্ত্ৰী"
    },
    {
     "en": "President",
     "as": "ৰাষ্ট্ৰপতি"
    },
    {
     "en": "Chief Justice",
     "as": "প্ৰধান বিচাৰপতি"
    },
    {
     "en": "Vice President",
     "as": "উপৰাষ্ট্ৰপতি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The President is the head of the Indian state.",
    "as": "ৰাষ্ট্ৰপতি ভাৰত ৰাষ্ট্ৰৰ মুৰব্বী।"
   }
  },
  {
   "id": "president-pm-governor-cm-002",
   "q": {
    "en": "Who appoints the Governor of a state?",
    "as": "এখন ৰাজ্যৰ ৰাজ্যপালক কোনে নিযুক্তি দিয়ে?"
   },
   "options": [
    {
     "en": "Prime Minister",
     "as": "প্ৰধানমন্ত্ৰী"
    },
    {
     "en": "President",
     "as": "ৰাষ্ট্ৰপতি"
    },
    {
     "en": "Chief Minister",
     "as": "মুখ্যমন্ত্ৰী"
    },
    {
     "en": "Chief Justice",
     "as": "প্ৰধান বিচাৰপতি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Governor of a state is appointed by the President.",
    "as": "এখন ৰাজ্যৰ ৰাজ্যপালক ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়ে।"
   }
  },
  {
   "id": "president-pm-governor-cm-003",
   "q": {
    "en": "Who is the head of the state government?",
    "as": "ৰাজ্য চৰকাৰৰ মুৰব্বী কোন?"
   },
   "options": [
    {
     "en": "Governor",
     "as": "ৰাজ্যপাল"
    },
    {
     "en": "Chief Minister",
     "as": "মুখ্যমন্ত্ৰী"
    },
    {
     "en": "Speaker",
     "as": "অধ্যক্ষ"
    },
    {
     "en": "Chief Secretary",
     "as": "মুখ্য সচিব"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Chief Minister is the head of the state government.",
    "as": "মুখ্যমন্ত্ৰী ৰাজ্য চৰকাৰৰ মুৰব্বী।"
   }
  },
  {
   "id": "president-pm-governor-cm-004",
   "q": {
    "en": "The Prime Minister is appointed by the —",
    "as": "প্ৰধানমন্ত্ৰীক নিযুক্তি দিয়ে —"
   },
   "options": [
    {
     "en": "President",
     "as": "ৰাষ্ট্ৰপতি"
    },
    {
     "en": "Parliament",
     "as": "সংসদ"
    },
    {
     "en": "Chief Justice",
     "as": "প্ৰধান বিচাৰপতি"
    },
    {
     "en": "Governor",
     "as": "ৰাজ্যপাল"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Prime Minister is appointed by the President.",
    "as": "প্ৰধানমন্ত্ৰীক ৰাষ্ট্ৰপতিয়ে নিযুক্তি দিয়ে।"
   }
  }
 ],
 "problems-on-ages": [
  {
   "id": "problems-on-ages-001",
   "q": {
    "en": "The present age of A is 24 years and B is 16 years. The ratio of their ages after 4 years will be —",
    "as": "A ৰ বৰ্তমান বয়স 24 বছৰ আৰু B ৰ 16 বছৰ। 4 বছৰৰ পিছত সিহঁতৰ বয়সৰ অনুপাত —"
   },
   "options": [
    {
     "en": "5 : 4",
     "as": "৫ : ৪"
    },
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "7 : 5",
     "as": "৭ : ৫"
    },
    {
     "en": "4 : 3",
     "as": "৪ : ৩"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "After 4 years the ages are 28 and 20, so 28 : 20 = 7 : 5.",
    "as": "4 বছৰৰ পিছত বয়স 28 আৰু 20, গতিকে 28 : 20 = 7 : 5।"
   }
  },
  {
   "id": "problems-on-ages-002",
   "q": {
    "en": "The sum of the ages of a father and his son is 60 years. If the father is four times as old as the son, the son's age is —",
    "as": "পিতৃ আৰু পুত্ৰৰ বয়সৰ যোগফল 60 বছৰ। পিতৃ পুত্ৰতকৈ চাৰিগুণ ডাঙৰ হ'লে পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5x = 60, so x = 12 years.",
    "as": "5x = 60, গতিকে x = 12 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-003",
   "q": {
    "en": "A is 5 years older than B. Five years ago A was twice as old as B. The present age of A is —",
    "as": "A, B তকৈ 5 বছৰ ডাঙৰ। পাঁচ বছৰ আগতে A ৰ বয়স B ৰ দুগুণ আছিল। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Let B = x; x + 5 - 5 = 2(x - 5), so x = 10 and A is 15 years old.",
    "as": "B = x ধৰিলে; x + 5 - 5 = 2(x - 5), গতিকে x = 10 আৰু A ৰ বয়স 15 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-004",
   "q": {
    "en": "The present ages of A and B are in the ratio 4 : 5. After 6 years the ratio becomes 6 : 7. The present age of B is —",
    "as": "A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত 4 : 5। 6 বছৰৰ পিছত অনুপাত 6 : 7 হয়। B ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "(4x + 6) / (5x + 6) = 6/7 gives x = 3, so B is 15 years old.",
    "as": "(4x + 6) / (5x + 6) = 6/7 ৰ পৰা x = 3, গতিকে B ৰ বয়স 15 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-005",
   "q": {
    "en": "A mother is 24 years older than her daughter. After 6 years she will be three times as old as her daughter. The daughter's present age is —",
    "as": "এগৰাকী মাক তেওঁৰ জীয়েকতকৈ 24 বছৰ ডাঙৰ। 6 বছৰৰ পিছত তেওঁ জীয়েকতকৈ তিনিগুণ ডাঙৰ হ'ব। জীয়েকৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "x + 24 + 6 = 3(x + 6), so x = 6 years.",
    "as": "x + 24 + 6 = 3(x + 6), গতিকে x = 6 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-006",
   "q": {
    "en": "The average age of a family of 4 members is 25 years. A baby is then born into the family. The average age of the family of 5 members is now —",
    "as": "4 জনীয়া এটা পৰিয়ালৰ গড় বয়স 25 বছৰ। তাৰ পিছত পৰিয়ালটোত এটা শিশু জন্মিল। এতিয়া 5 জনীয়া পৰিয়ালৰ গড় বয়স —"
   },
   "options": [
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The four members total 100 years; the baby adds 0, so 100 / 5 = 20 years.",
    "as": "চাৰিজনৰ মুঠ 100 বছৰ; শিশুৱে 0 যোগ কৰে, গতিকে 100 / 5 = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-007",
   "q": {
    "en": "Ten years ago the age of A was 25 years. The present age of A is —",
    "as": "দহ বছৰ আগতে A ৰ বয়স 25 বছৰ আছিল। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Present age = 25 + 10 = 35 years.",
    "as": "বৰ্তমান বয়স = 25 + 10 = 35 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-008",
   "q": {
    "en": "The sum of the ages of A and B is 45 years. Five years ago the sum was —",
    "as": "A আৰু B ৰ বয়সৰ যোগফল 45 বছৰ। পাঁচ বছৰ আগতে যোগফল আছিল —"
   },
   "options": [
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Each is 5 years younger, so the sum was 45 - 10 = 35 years.",
    "as": "প্ৰত্যেক 5 বছৰ সৰু, গতিকে যোগফল 45 - 10 = 35 বছৰ আছিল।"
   }
  },
  {
   "id": "problems-on-ages-009",
   "q": {
    "en": "A father is 3 times as old as his son. After 12 years he will be twice as old as his son. The son's present age is —",
    "as": "এজন পিতৃ পুত্ৰতকৈ 3 গুণ ডাঙৰ। 12 বছৰৰ পিছত তেওঁ পুত্ৰতকৈ দুগুণ ডাঙৰ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "3x + 12 = 2(x + 12), so x = 12 years.",
    "as": "3x + 12 = 2(x + 12), গতিকে x = 12 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-010",
   "q": {
    "en": "Five years ago the ratio of the ages of A and B was 3 : 4. Five years hence the ratio will be 4 : 5. The present age of A is —",
    "as": "পাঁচ বছৰ আগতে A আৰু B ৰ বয়সৰ অনুপাত 3 : 4 আছিল। পাঁচ বছৰৰ পিছত অনুপাত 4 : 5 হ'ব। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Take the present ages as 3x+5 and 4x+5; (3x+10)/(4x+10) = 4/5 gives x = 10, so A is 35 years old.",
    "as": "বৰ্তমান বয়স 3x+5 আৰু 4x+5 ধৰিলে; (3x+10)/(4x+10) = 4/5 ৰ পৰা x = 10, গতিকে A ৰ বয়স 35 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-011",
   "q": {
    "en": "The average age of 8 members of a group is 40 years. If two members of ages 50 and 60 years leave, the average age of the remaining members is —",
    "as": "8 জনীয়া এটা গোটৰ গড় বয়স 40 বছৰ। 50 আৰু 60 বছৰ বয়সৰ দুজন আঁতৰি গ'লে বাকী সদস্যসকলৰ গড় বয়স —"
   },
   "options": [
    {
     "en": "37.5 years",
     "as": "৩৭.৫ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "32.5 years",
     "as": "৩২.৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total 320; remaining total 320 - 110 = 210 over 6 members, giving 35 years.",
    "as": "মুঠ 320; বাকী মুঠ 320 - 110 = 210, 6 জনত, গতিকে 35 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-012",
   "q": {
    "en": "The present age of a man is 3 times the age of his son. The product of their ages is 108. The son's age is —",
    "as": "এজন মানুহৰ বৰ্তমান বয়স পুত্ৰৰ বয়সৰ 3 গুণ। সিহঁতৰ বয়সৰ গুণফল 108। পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "9 years",
     "as": "৯ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3x^2 = 108, so x^2 = 36 and x = 6 years.",
    "as": "3x^2 = 108, গতিকে x^2 = 36 আৰু x = 6 বছৰ।"
   }
  }
 ],
 "profit-loss": [
  {
   "id": "profit-loss-001",
   "q": {
    "en": "An article bought for ₹400 is sold for ₹460. The profit per cent is —",
    "as": "₹400 ত কিনা এটা বস্তু ₹460 ত বিক্ৰী কৰিলে লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "18%",
     "as": "১৮%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "12%",
     "as": "১২%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Profit = 60 and 60 / 400 x 100 = 15%.",
    "as": "লাভ = 60 আৰু 60 / 400 x 100 = 15%।"
   }
  },
  {
   "id": "profit-loss-002",
   "q": {
    "en": "A man buys an article for ₹750 and sells it at a loss of 20%. The selling price is —",
    "as": "এজন মানুহে ₹750 ত এটা বস্তু কিনি 20% লোকচানত বিক্ৰী কৰিলে। বিক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹600",
     "as": "₹৬০০"
    },
    {
     "en": "₹650",
     "as": "₹৬৫০"
    },
    {
     "en": "₹700",
     "as": "₹৭০০"
    },
    {
     "en": "₹625",
     "as": "₹৬২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "750 - 20% of 750 = 600.",
    "as": "750 - 750 ৰ 20% = 600।"
   }
  },
  {
   "id": "profit-loss-003",
   "q": {
    "en": "By selling an article for ₹540 a shopkeeper gains 20%. The cost price is —",
    "as": "এটা বস্তু ₹540 ত বিক্ৰী কৰি এজন দোকানীয়ে 20% লাভ কৰিলে। ক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹450",
     "as": "₹৪৫০"
    },
    {
     "en": "₹480",
     "as": "₹৪৮০"
    },
    {
     "en": "₹420",
     "as": "₹৪২০"
    },
    {
     "en": "₹432",
     "as": "₹৪৩২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 540 x 100 / 120 = 450.",
    "as": "ক্ৰয়মূল্য = 540 x 100 / 120 = 450।"
   }
  },
  {
   "id": "profit-loss-004",
   "q": {
    "en": "If the cost price of 12 articles equals the selling price of 10 articles, the profit per cent is —",
    "as": "12 টা বস্তুৰ ক্ৰয়মূল্য 10 টা বস্তুৰ বিক্ৰয়মূল্যৰ সমান হ'লে লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "16 2/3%",
     "as": "১৬ ২/৩%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Let CP of one = 10 and SP of one = 12; profit = 20%.",
    "as": "এটাৰ ক্ৰয়মূল্য = 10 আৰু এটাৰ বিক্ৰয়মূল্য = 12 ধৰিলে; লাভ = 20%।"
   }
  },
  {
   "id": "profit-loss-005",
   "q": {
    "en": "A shopkeeper marks his goods 40% above cost and allows a discount of 10%. His profit per cent is —",
    "as": "এজন দোকানীয়ে ক্ৰয়মূল্যৰ ওপৰত 40% বেছি দাম লিখি 10% ৰেহাই দিয়ে। তেওঁৰ লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "26%",
     "as": "২৬%"
    },
    {
     "en": "24%",
     "as": "২৪%"
    },
    {
     "en": "28%",
     "as": "২৮%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Take CP = 100; MP = 140 and SP = 126, so profit = 26%.",
    "as": "ক্ৰয়মূল্য = 100 ধৰিলে; অংকিত মূল্য = 140 আৰু বিক্ৰয়মূল্য = 126, গতিকে লাভ = 26%।"
   }
  },
  {
   "id": "profit-loss-006",
   "q": {
    "en": "The selling price of an article is ₹1,140 after a discount of 5%. Its marked price is —",
    "as": "5% ৰেহাইৰ পিছত এটা বস্তুৰ বিক্ৰয়মূল্য ₹1,140। তাৰ অংকিত মূল্য —"
   },
   "options": [
    {
     "en": "₹1,190",
     "as": "₹১,১৯০"
    },
    {
     "en": "₹1,220",
     "as": "₹১,২২০"
    },
    {
     "en": "₹1,180",
     "as": "₹১,১৮০"
    },
    {
     "en": "₹1,200",
     "as": "₹১,২০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "MP = 1140 x 100 / 95 = 1200.",
    "as": "অংকিত মূল্য = 1140 x 100 / 95 = 1200।"
   }
  },
  {
   "id": "profit-loss-007",
   "q": {
    "en": "If the selling price is ₹990 and the loss is 10%, the cost price is —",
    "as": "বিক্ৰয়মূল্য ₹990 আৰু ক্ষতি 10% হ'লে ক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹1,120",
     "as": "₹১,১২০"
    },
    {
     "en": "₹1,090",
     "as": "₹১,০৯০"
    },
    {
     "en": "₹1,080",
     "as": "₹১,০৮০"
    },
    {
     "en": "₹1,100",
     "as": "₹১,১০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "CP = 990 x 100 / 90 = 1100.",
    "as": "ক্ৰয়মূল্য = 990 x 100 / 90 = 1100।"
   }
  },
  {
   "id": "profit-loss-008",
   "q": {
    "en": "The profit earned by selling an article for ₹1,150 is the same as the loss when it is sold for ₹850. The cost price is —",
    "as": "এটা বস্তু ₹1,150 ত বিক্ৰী কৰিলে যিমান লাভ হয়, ₹850 ত বিক্ৰী কৰিলে সিমান লোকচান হয়। ক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹950",
     "as": "₹৯৫০"
    },
    {
     "en": "₹1,050",
     "as": "₹১,০৫০"
    },
    {
     "en": "₹1,100",
     "as": "₹১,১০০"
    },
    {
     "en": "₹1,000",
     "as": "₹১,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "CP = (1150 + 850) / 2 = 1000.",
    "as": "ক্ৰয়মূল্য = (1150 + 850) / 2 = 1000।"
   }
  },
  {
   "id": "profit-loss-009",
   "q": {
    "en": "Two successive discounts of 10% and 20% are equivalent to a single discount of —",
    "as": "10% আৰু 20% ৰ দুটা ক্ৰমিক ৰেহাই এটা ৰেহাইৰ সমান —"
   },
   "options": [
    {
     "en": "28%",
     "as": "২৮%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "32%",
     "as": "৩২%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "0.9 x 0.8 = 0.72, so the single discount is 28%.",
    "as": "0.9 x 0.8 = 0.72, গতিকে এটা ৰেহাই 28%।"
   }
  },
  {
   "id": "profit-loss-010",
   "q": {
    "en": "If an article is sold at ₹320 at a profit of 60%, the cost price is —",
    "as": "60% লাভত এটা বস্তু ₹320 ত বিক্ৰী কৰিলে ক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹240",
     "as": "₹২৪০"
    },
    {
     "en": "₹192",
     "as": "₹১৯২"
    },
    {
     "en": "₹200",
     "as": "₹২০০"
    },
    {
     "en": "₹180",
     "as": "₹১৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 320 x 100 / 160 = 200.",
    "as": "ক্ৰয়মূল্য = 320 x 100 / 160 = 200।"
   }
  },
  {
   "id": "profit-loss-011",
   "q": {
    "en": "By selling 20 articles a man gains the cost price of 4 articles. His gain per cent is —",
    "as": "20 টা বস্তু বিক্ৰী কৰি এজনে 4 টা বস্তুৰ ক্ৰয়মূল্যৰ সমান লাভ কৰে। তেওঁৰ লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "16%",
     "as": "১৬%"
    },
    {
     "en": "20%",
     "as": "২০%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Gain / CP x 100 = 4 / 20 x 100 = 20%.",
    "as": "লাভ / ক্ৰয়মূল্য x 100 = 4 / 20 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-012",
   "q": {
    "en": "A dishonest dealer sells goods at cost price but uses a weight of 900 g for 1 kg. His gain per cent is —",
    "as": "এজন অসাধু ব্যৱসায়ীয়ে ক্ৰয়মূল্যতে সামগ্ৰী বিক্ৰী কৰে কিন্তু 1 কেজিৰ সলনি 900 গ্ৰাম ব্যৱহাৰ কৰে। তেওঁৰ লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "9%",
     "as": "৯%"
    },
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "11 1/9%",
     "as": "১১ ১/৯%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Gain = 100 / 900 x 100 = 11 1/9%.",
    "as": "লাভ = 100 / 900 x 100 = 11 1/9%।"
   }
  }
 ],
 "ranking-order": [
  {
   "id": "ranking-order-001",
   "q": {
    "en": "In a row, Ram is 7th from the left and 5th from the right. How many persons are in the row?",
    "as": "এটা শাৰীত ৰাম বাওঁৰ পৰা ৭ম আৰু সোঁৰ পৰা ৫ম। শাৰীত কিমানজন আছে?"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "13",
     "as": "১৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 7 + 5 − 1 = 11.",
    "as": "মুঠ = 7 + 5 − 1 = 11।"
   }
  },
  {
   "id": "ranking-order-002",
   "q": {
    "en": "In a class, Sita is 10th from the top and 20th from the bottom. How many students are there?",
    "as": "এখন শ্ৰেণীত সীতা ওপৰৰ পৰা ১০ম আৰু তলৰ পৰা ২০তম। মুঠ কিমানজন ছাত্ৰ আছে?"
   },
   "options": [
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "29",
     "as": "২৯"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "31",
     "as": "৩১"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 10 + 20 − 1 = 29.",
    "as": "মুঠ = 10 + 20 − 1 = 29।"
   }
  },
  {
   "id": "ranking-order-003",
   "q": {
    "en": "If Anil is 5th from the left in a row of 12, his position from the right is —",
    "as": "12 জনৰ এটা শাৰীত অনিল বাওঁৰ পৰা ৫ম হ'লে সোঁৰ পৰা তেওঁৰ স্থান —"
   },
   "options": [
    {
     "en": "6th",
     "as": "৬ষ্ঠ"
    },
    {
     "en": "7th",
     "as": "৭ম"
    },
    {
     "en": "8th",
     "as": "৮ম"
    },
    {
     "en": "9th",
     "as": "৯ম"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Position from the right = 12 − 5 + 1 = 8th.",
    "as": "সোঁৰ পৰা স্থান = 12 − 5 + 1 = ৮ম।"
   }
  },
  {
   "id": "ranking-order-004",
   "q": {
    "en": "In a row of 20, Mohan is 12th from the left. His position from the right is —",
    "as": "20 জনৰ এটা শাৰীত মোহন বাওঁৰ পৰা ১২তম। সোঁৰ পৰা তেওঁৰ স্থান —"
   },
   "options": [
    {
     "en": "8th",
     "as": "৮ম"
    },
    {
     "en": "9th",
     "as": "৯ম"
    },
    {
     "en": "10th",
     "as": "১০ম"
    },
    {
     "en": "11th",
     "as": "১১তম"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Position from the right = 20 − 12 + 1 = 9th.",
    "as": "সোঁৰ পৰা স্থান = 20 − 12 + 1 = ৯ম।"
   }
  }
 ],
 "ratio-proportion": [
  {
   "id": "ratio-proportion-001",
   "q": {
    "en": "If a : b = 3 : 4 and b : c = 2 : 5, then a : c is —",
    "as": "a : b = 3 : 4 আৰু b : c = 2 : 5 হ'লে a : c —"
   },
   "options": [
    {
     "en": "6 : 5",
     "as": "৬ : ৫"
    },
    {
     "en": "2 : 5",
     "as": "২ : ৫"
    },
    {
     "en": "3 : 10",
     "as": "৩ : ১০"
    },
    {
     "en": "3 : 5",
     "as": "৩ : ৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Make b common: a : b = 3 : 4 and b : c = 4 : 10, so a : c = 3 : 10.",
    "as": "b সাধাৰণ কৰক: a : b = 3 : 4 আৰু b : c = 4 : 10, গতিকে a : c = 3 : 10।"
   }
  },
  {
   "id": "ratio-proportion-002",
   "q": {
    "en": "If 5 : 8 = 20 : x, then x is —",
    "as": "5 : 8 = 20 : x হ'লে x —"
   },
   "options": [
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5x = 160, so x = 32.",
    "as": "5x = 160, গতিকে x = 32।"
   }
  },
  {
   "id": "ratio-proportion-003",
   "q": {
    "en": "₹1,200 is divided between A and B in the ratio 2 : 3. B's share is —",
    "as": "₹1,200 A আৰু B ৰ মাজত 2 : 3 অনুপাতত ভাগ কৰা হ'ল। B ৰ অংশ —"
   },
   "options": [
    {
     "en": "₹600",
     "as": "₹৬০০"
    },
    {
     "en": "₹480",
     "as": "₹৪৮০"
    },
    {
     "en": "₹800",
     "as": "₹৮০০"
    },
    {
     "en": "₹720",
     "as": "₹৭২০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B's share = 3/5 x 1200 = 720.",
    "as": "B ৰ অংশ = 3/5 x 1200 = 720।"
   }
  },
  {
   "id": "ratio-proportion-004",
   "q": {
    "en": "If 12 pencils cost ₹96, the cost of 20 such pencils is —",
    "as": "12 টা পেঞ্চিলৰ মূল্য ₹96 হ'লে 20 টা পেঞ্চিলৰ মূল্য —"
   },
   "options": [
    {
     "en": "₹180",
     "as": "₹১৮০"
    },
    {
     "en": "₹150",
     "as": "₹১৫০"
    },
    {
     "en": "₹160",
     "as": "₹১৬০"
    },
    {
     "en": "₹200",
     "as": "₹২০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Cost of one pencil = 8, so 20 x 8 = 160.",
    "as": "এটা পেঞ্চিলৰ মূল্য = 8, গতিকে 20 x 8 = 160।"
   }
  },
  {
   "id": "ratio-proportion-005",
   "q": {
    "en": "The ratio 45 minutes to 1.5 hours is —",
    "as": "45 মিনিট আৰু 1.5 ঘণ্টাৰ অনুপাত —"
   },
   "options": [
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "1 : 3",
     "as": "১ : ৩"
    },
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "3 : 4",
     "as": "৩ : ৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1.5 hours = 90 minutes, so 45 : 90 = 1 : 2.",
    "as": "1.5 ঘণ্টা = 90 মিনিট, গতিকে 45 : 90 = 1 : 2।"
   }
  },
  {
   "id": "ratio-proportion-006",
   "q": {
    "en": "The mean proportional between 4 and 25 is —",
    "as": "4 আৰু 25 ৰ মধ্যসমানুপাত —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "14.5",
     "as": "১৪.৫"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Mean proportional = sqrt(4 x 25) = 10.",
    "as": "মধ্যসমানুপাত = sqrt(4 x 25) = 10।"
   }
  },
  {
   "id": "ratio-proportion-007",
   "q": {
    "en": "If a : b = 2 : 3, then (3a + 2b) : (5a - b) is —",
    "as": "a : b = 2 : 3 হ'লে (3a + 2b) : (5a - b) —"
   },
   "options": [
    {
     "en": "7 : 12",
     "as": "৭ : ১২"
    },
    {
     "en": "5 : 7",
     "as": "৫ : ৭"
    },
    {
     "en": "2 : 1",
     "as": "২ : ১"
    },
    {
     "en": "12 : 7",
     "as": "১২ : ৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Let a = 2k, b = 3k: (6k + 6k) : (10k - 3k) = 12k : 7k = 12 : 7.",
    "as": "a = 2k, b = 3k ধৰিলে: (6k + 6k) : (10k - 3k) = 12k : 7k = 12 : 7।"
   }
  },
  {
   "id": "ratio-proportion-008",
   "q": {
    "en": "A sum of ₹3,600 is divided among A, B and C in the ratio 3 : 4 : 5. C's share is —",
    "as": "₹3,600 A, B আৰু C ৰ মাজত 3 : 4 : 5 অনুপাতত ভাগ কৰা হ'ল। C ৰ অংশ —"
   },
   "options": [
    {
     "en": "₹1,500",
     "as": "₹১,৫০০"
    },
    {
     "en": "₹900",
     "as": "₹৯০০"
    },
    {
     "en": "₹1,800",
     "as": "₹১,৮০০"
    },
    {
     "en": "₹1,200",
     "as": "₹১,২০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "C's share = 5/12 x 3600 = 1500.",
    "as": "C ৰ অংশ = 5/12 x 3600 = 1500।"
   }
  },
  {
   "id": "ratio-proportion-009",
   "q": {
    "en": "The ratio of 0.6 to 0.24 is —",
    "as": "0.6 আৰু 0.24 ৰ অনুপাত —"
   },
   "options": [
    {
     "en": "4 : 3",
     "as": "৪ : ৩"
    },
    {
     "en": "5 : 2",
     "as": "৫ : ২"
    },
    {
     "en": "2 : 5",
     "as": "২ : ৫"
    },
    {
     "en": "3 : 4",
     "as": "৩ : ৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "0.6 / 0.24 = 60 / 24 = 5 / 2.",
    "as": "0.6 / 0.24 = 60 / 24 = 5 / 2।"
   }
  },
  {
   "id": "ratio-proportion-010",
   "q": {
    "en": "In a class the ratio of boys to girls is 5 : 4. If there are 45 boys, the number of girls is —",
    "as": "এখন শ্ৰেণীত ল'ৰা আৰু ছোৱালীৰ অনুপাত 5 : 4। ল'ৰা 45 জন হ'লে ছোৱালীৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "45 / 5 = 9, so girls = 4 x 9 = 36.",
    "as": "45 / 5 = 9, গতিকে ছোৱালী = 4 x 9 = 36।"
   }
  },
  {
   "id": "ratio-proportion-011",
   "q": {
    "en": "If 8 workers earn ₹9,600 in a week, 12 workers will earn in a week —",
    "as": "8 জন শ্ৰমিকে এটা সপ্তাহত ₹9,600 উপাৰ্জন কৰিলে, 12 জনে এটা সপ্তাহত উপাৰ্জন কৰিব —"
   },
   "options": [
    {
     "en": "₹12,800",
     "as": "₹১২,৮০০"
    },
    {
     "en": "₹14,400",
     "as": "₹১৪,৪০০"
    },
    {
     "en": "₹16,200",
     "as": "₹১৬,২০০"
    },
    {
     "en": "₹14,000",
     "as": "₹১৪,০০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "One worker earns 1,200; 12 x 1,200 = 14,400.",
    "as": "এজন শ্ৰমিকে 1,200 উপাৰ্জন কৰে; 12 x 1,200 = 14,400।"
   }
  },
  {
   "id": "ratio-proportion-012",
   "q": {
    "en": "The compound ratio of 3 : 4 and 5 : 6 is —",
    "as": "3 : 4 আৰু 5 : 6 ৰ যৌগিক অনুপাত —"
   },
   "options": [
    {
     "en": "5 : 8",
     "as": "৫ : ৮"
    },
    {
     "en": "6 : 20",
     "as": "৬ : ২০"
    },
    {
     "en": "5 : 6",
     "as": "৫ : ৬"
    },
    {
     "en": "15 : 8",
     "as": "১৫ : ৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Compound ratio = (3 x 5) : (4 x 6) = 15 : 24 = 5 : 8.",
    "as": "যৌগিক অনুপাত = (3 x 5) : (4 x 6) = 15 : 24 = 5 : 8।"
   }
  }
 ],
 "sentence-rearrangement": [
  {
   "id": "sentence-rearrangement-001",
   "q": {
    "en": "Arrange: (P) is reading (Q) the boy (R) a book",
    "as": "সজাওক: (P) is reading (Q) the boy (R) a book"
   },
   "options": [
    {
     "en": "QPR",
     "as": "QPR"
    },
    {
     "en": "PQR",
     "as": "PQR"
    },
    {
     "en": "RPQ",
     "as": "RPQ"
    },
    {
     "en": "QRP",
     "as": "QRP"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The subject comes first, so the order is the boy, is reading, a book.",
    "as": "কৰ্তা প্ৰথমে আহে, গতিকে ক্ৰম the boy, is reading, a book।"
   }
  },
  {
   "id": "sentence-rearrangement-002",
   "q": {
    "en": "Arrange: (P) in the garden (Q) the children (R) are playing",
    "as": "সজাওক: (P) in the garden (Q) the children (R) are playing"
   },
   "options": [
    {
     "en": "PRQ",
     "as": "PRQ"
    },
    {
     "en": "QPR",
     "as": "QPR"
    },
    {
     "en": "QRP",
     "as": "QRP"
    },
    {
     "en": "RQP",
     "as": "RQP"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The subject and verb come first, then the place phrase.",
    "as": "কৰ্তা আৰু ক্ৰিয়া প্ৰথমে আহে, তাৰ পিছত স্থানৰ বাক্যাংশ।"
   }
  },
  {
   "id": "sentence-rearrangement-003",
   "q": {
    "en": "Arrange: (P) because it was raining (Q) we stayed at home (R) all day",
    "as": "সজাওক: (P) because it was raining (Q) we stayed at home (R) all day"
   },
   "options": [
    {
     "en": "PQR",
     "as": "PQR"
    },
    {
     "en": "QRP",
     "as": "QRP"
    },
    {
     "en": "RQP",
     "as": "RQP"
    },
    {
     "en": "QPR",
     "as": "QPR"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The main clause comes first and the reason follows.",
    "as": "মূল খণ্ডবাক্য প্ৰথমে আহে আৰু কাৰণ পিছত আহে।"
   }
  },
  {
   "id": "sentence-rearrangement-004",
   "q": {
    "en": "Arrange: (P) is the capital (Q) Dispur (R) of Assam",
    "as": "সজাওক: (P) is the capital (Q) Dispur (R) of Assam"
   },
   "options": [
    {
     "en": "PQR",
     "as": "PQR"
    },
    {
     "en": "QPR",
     "as": "QPR"
    },
    {
     "en": "QRP",
     "as": "QRP"
    },
    {
     "en": "RPQ",
     "as": "RPQ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The subject Dispur comes first, then the verb phrase.",
    "as": "কৰ্তা Dispur প্ৰথমে আহে, তাৰ পিছত ক্ৰিয়া বাক্যাংশ।"
   }
  }
 ],
 "simple-compound-interest": [
  {
   "id": "simple-compound-interest-001",
   "q": {
    "en": "The simple interest on ₹5,000 at 8% per annum for 3 years is —",
    "as": "₹5,000 ৰ ওপৰত বছৰি 8% হাৰত 3 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "₹1,000",
     "as": "₹১,০০০"
    },
    {
     "en": "₹1,800",
     "as": "₹১,৮০০"
    },
    {
     "en": "₹1,500",
     "as": "₹১,৫০০"
    },
    {
     "en": "₹1,200",
     "as": "₹১,২০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = P x R x T / 100 = 5000 x 8 x 3 / 100 = 1200.",
    "as": "সৰল সুত = P x R x T / 100 = 5000 x 8 x 3 / 100 = 1200।"
   }
  },
  {
   "id": "simple-compound-interest-002",
   "q": {
    "en": "The compound interest on ₹10,000 at 10% per annum for 2 years is —",
    "as": "₹10,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "₹2,100",
     "as": "₹২,১০০"
    },
    {
     "en": "₹2,310",
     "as": "₹২,৩১০"
    },
    {
     "en": "₹2,200",
     "as": "₹২,২০০"
    },
    {
     "en": "₹2,000",
     "as": "₹২,০০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 10000 x 1.1^2 = 12100, so CI = 2100.",
    "as": "মুঠ = 10000 x 1.1^2 = 12100, গতিকে চক্ৰবৃদ্ধি সুত = 2100।"
   }
  },
  {
   "id": "simple-compound-interest-003",
   "q": {
    "en": "At what rate per cent per annum will ₹4,000 yield a simple interest of ₹800 in 2 years?",
    "as": "বছৰি কিমান শতাংশ হাৰত ₹4,000 ৰ ওপৰত 2 বছৰত ₹800 সৰল সুত হ'ব?"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "8%",
     "as": "৮%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "R = 800 x 100 / (4000 x 2) = 10%.",
    "as": "হাৰ = 800 x 100 / (4000 x 2) = 10%।"
   }
  },
  {
   "id": "simple-compound-interest-004",
   "q": {
    "en": "In how many years will ₹2,500 amount to ₹3,000 at 5% per annum simple interest?",
    "as": "বছৰি 5% সৰল সুতত কিমান বছৰত ₹2,500 ৰাশি ₹3,000 হ'ব?"
   },
   "options": [
    {
     "en": "3 years",
     "as": "৩ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI = 500; T = 500 x 100 / (2500 x 5) = 4 years.",
    "as": "সৰল সুত = 500; সময় = 500 x 100 / (2500 x 5) = 4 বছৰ।"
   }
  },
  {
   "id": "simple-compound-interest-005",
   "q": {
    "en": "The difference between the compound interest and the simple interest on ₹1,000 at 10% per annum for 2 years is —",
    "as": "₹1,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "₹10",
     "as": "₹১০"
    },
    {
     "en": "₹20",
     "as": "₹২০"
    },
    {
     "en": "₹15",
     "as": "₹১৫"
    },
    {
     "en": "₹5",
     "as": "₹৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Difference = P (R/100)^2 = 1000 x 0.01 = 10.",
    "as": "পাৰ্থক্য = P (R/100)^2 = 1000 x 0.01 = 10।"
   }
  },
  {
   "id": "simple-compound-interest-006",
   "q": {
    "en": "A sum of money doubles itself in 8 years at simple interest. The rate of interest per annum is —",
    "as": "সৰল সুতত এটা ৰাশি 8 বছৰত দুগুণ হয়। বছৰি সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "12.5%",
     "as": "১২.৫%"
    },
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI equals P in 8 years, so R = 100 / 8 = 12.5%.",
    "as": "8 বছৰত সৰল সুত P ৰ সমান হয়, গতিকে হাৰ = 100 / 8 = 12.5%।"
   }
  },
  {
   "id": "simple-compound-interest-007",
   "q": {
    "en": "The compound interest on ₹8,000 at 5% per annum for 2 years is —",
    "as": "₹8,000 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "₹820",
     "as": "₹৮২০"
    },
    {
     "en": "₹810",
     "as": "₹৮১০"
    },
    {
     "en": "₹800",
     "as": "₹৮০০"
    },
    {
     "en": "₹840",
     "as": "₹৮৪০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 8000 x 1.05^2 = 8820, so CI = 820.",
    "as": "মুঠ = 8000 x 1.05^2 = 8820, গতিকে চক্ৰবৃদ্ধি সুত = 820।"
   }
  },
  {
   "id": "simple-compound-interest-008",
   "q": {
    "en": "The simple interest on a sum for 5 years at 6% per annum is ₹900. The sum is —",
    "as": "বছৰি 6% হাৰত 5 বছৰৰ সৰল সুত ₹900 হ'লে ৰাশিটো —"
   },
   "options": [
    {
     "en": "₹2,400",
     "as": "₹২,৪০০"
    },
    {
     "en": "₹3,600",
     "as": "₹৩,৬০০"
    },
    {
     "en": "₹3,000",
     "as": "₹৩,০০০"
    },
    {
     "en": "₹2,700",
     "as": "₹২,৭০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "P = 900 x 100 / (6 x 5) = 3000.",
    "as": "ৰাশি = 900 x 100 / (6 x 5) = 3000।"
   }
  },
  {
   "id": "simple-compound-interest-009",
   "q": {
    "en": "If ₹6,000 is invested at 10% per annum compounded annually, the amount after 2 years is —",
    "as": "বছৰি 10% চক্ৰবৃদ্ধি হাৰত ₹6,000 বিনিয়োগ কৰিলে 2 বছৰৰ পিছত মুঠ —"
   },
   "options": [
    {
     "en": "₹7,200",
     "as": "₹৭,২০০"
    },
    {
     "en": "₹7,260",
     "as": "₹৭,২৬০"
    },
    {
     "en": "₹7,400",
     "as": "₹৭,৪০০"
    },
    {
     "en": "₹7,300",
     "as": "₹৭,৩০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 6000 x 1.1^2 = 7260.",
    "as": "মুঠ = 6000 x 1.1^2 = 7260।"
   }
  },
  {
   "id": "simple-compound-interest-010",
   "q": {
    "en": "The rate per cent per annum at which a sum triples itself in 20 years at simple interest is —",
    "as": "সৰল সুতত এটা ৰাশি 20 বছৰত তিনিগুণ হ'বলৈ বছৰি হাৰ —"
   },
   "options": [
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "8%",
     "as": "৮%"
    },
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "12%",
     "as": "১২%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 2P in 20 years, so R = 200 / 20 = 10%.",
    "as": "20 বছৰত সৰল সুত = 2P, গতিকে হাৰ = 200 / 20 = 10%।"
   }
  },
  {
   "id": "simple-compound-interest-011",
   "q": {
    "en": "The simple interest on ₹12,000 at 7.5% per annum for 8 months is —",
    "as": "₹12,000 ৰ ওপৰত বছৰি 7.5% হাৰত 8 মাহৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "₹750",
     "as": "₹৭৫০"
    },
    {
     "en": "₹500",
     "as": "₹৫০০"
    },
    {
     "en": "₹600",
     "as": "₹৬০০"
    },
    {
     "en": "₹900",
     "as": "₹৯০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "T = 8/12 = 2/3 year; SI = 12000 x 7.5 x 2 / (100 x 3) = 600.",
    "as": "সময় = 8/12 = 2/3 বছৰ; সৰল সুত = 12000 x 7.5 x 2 / (100 x 3) = 600।"
   }
  },
  {
   "id": "simple-compound-interest-012",
   "q": {
    "en": "The difference between the compound interest and the simple interest on a sum at 5% per annum for 2 years is ₹25. The sum is —",
    "as": "বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য ₹25 হ'লে ৰাশিটো —"
   },
   "options": [
    {
     "en": "₹8,000",
     "as": "₹৮,০০০"
    },
    {
     "en": "₹15,000",
     "as": "₹১৫,০০০"
    },
    {
     "en": "₹12,000",
     "as": "₹১২,০০০"
    },
    {
     "en": "₹10,000",
     "as": "₹১০,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "P x (5/100)^2 = 25, so P = 10,000.",
    "as": "P x (5/100)^2 = 25, গতিকে P = 10,000।"
   }
  }
 ],
 "simplification-fractions": [
  {
   "id": "simplification-fractions-001",
   "q": {
    "en": "Simplify: 12 + 3 x 4 - 6 ÷ 2",
    "as": "সৰল কৰক: 12 + 3 x 4 - 6 ÷ 2"
   },
   "options": [
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "27",
     "as": "২৭"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "By BODMAS: 6/2 = 3, then 3 x 4 = 12, so 12 + 12 - 3 = 21.",
    "as": "BODMAS অনুসৰি: 6/2 = 3, তাৰপিছত 3 x 4 = 12, গতিকে 12 + 12 - 3 = 21।"
   }
  },
  {
   "id": "simplification-fractions-002",
   "q": {
    "en": "Simplify: (18 + 6) ÷ (7 - 4)",
    "as": "সৰল কৰক: (18 + 6) ÷ (7 - 4)"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "24 / 3 = 8.",
    "as": "24 / 3 = 8।"
   }
  },
  {
   "id": "simplification-fractions-003",
   "q": {
    "en": "Simplify: 2/3 + 3/4 - 1/6",
    "as": "সৰল কৰক: 2/3 + 3/4 - 1/6"
   },
   "options": [
    {
     "en": "5/12",
     "as": "৫/১২"
    },
    {
     "en": "5/4",
     "as": "৫/৪"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM of 3, 4 and 6 is 12: 8/12 + 9/12 - 2/12 = 15/12 = 5/4.",
    "as": "3, 4 আৰু 6 ৰ ল.সা.গু. 12: 8/12 + 9/12 - 2/12 = 15/12 = 5/4।"
   }
  },
  {
   "id": "simplification-fractions-004",
   "q": {
    "en": "Simplify: 5/6 ÷ 10/9",
    "as": "সৰল কৰক: 5/6 ÷ 10/9"
   },
   "options": [
    {
     "en": "4/3",
     "as": "৪/৩"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "25/27",
     "as": "২৫/২৭"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5/6 x 9/10 = 45/60 = 3/4.",
    "as": "5/6 x 9/10 = 45/60 = 3/4।"
   }
  },
  {
   "id": "simplification-fractions-005",
   "q": {
    "en": "The value of 0.4 x 0.02 is —",
    "as": "0.4 x 0.02 ৰ মান —"
   },
   "options": [
    {
     "en": "0.008",
     "as": "০.০০৮"
    },
    {
     "en": "0.8",
     "as": "০.৮"
    },
    {
     "en": "0.08",
     "as": "০.০৮"
    },
    {
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "4 x 2 = 8 with three decimal places, giving 0.008.",
    "as": "4 x 2 = 8, তিনি দশমিক স্থান, গতিকে 0.008।"
   }
  },
  {
   "id": "simplification-fractions-006",
   "q": {
    "en": "Simplify: sqrt(144) + sqrt(81)",
    "as": "সৰল কৰক: sqrt(144) + sqrt(81)"
   },
   "options": [
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "25",
     "as": "২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "sqrt(144) = 12 and sqrt(81) = 9, so 12 + 9 = 21.",
    "as": "sqrt(144) = 12 আৰু sqrt(81) = 9, গতিকে 12 + 9 = 21।"
   }
  },
  {
   "id": "simplification-fractions-007",
   "q": {
    "en": "Simplify: (3/5) of 45",
    "as": "সৰল কৰক: 45 ৰ (3/5)"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "27",
     "as": "২৭"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "45 / 5 = 9 and 9 x 3 = 27.",
    "as": "45 / 5 = 9 আৰু 9 x 3 = 27।"
   }
  },
  {
   "id": "simplification-fractions-008",
   "q": {
    "en": "If x = 3 and y = 2, the value of x^2 + y^2 is —",
    "as": "x = 3 আৰু y = 2 হ'লে x^2 + y^2 ৰ মান —"
   },
   "options": [
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "13",
     "as": "১৩"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "9 + 4 = 13.",
    "as": "9 + 4 = 13।"
   }
  },
  {
   "id": "simplification-fractions-009",
   "q": {
    "en": "Simplify: 0.75 + 0.5 - 0.25",
    "as": "সৰল কৰক: 0.75 + 0.5 - 0.25"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "0.75",
     "as": "০.৭৫"
    },
    {
     "en": "0.5",
     "as": "০.৫"
    },
    {
     "en": "1.5",
     "as": "১.৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "0.75 + 0.50 = 1.25, and 1.25 - 0.25 = 1.",
    "as": "0.75 + 0.50 = 1.25, আৰু 1.25 - 0.25 = 1।"
   }
  },
  {
   "id": "simplification-fractions-010",
   "q": {
    "en": "Simplify: 8 ÷ 2 x 3 + 4",
    "as": "সৰল কৰক: 8 ÷ 2 x 3 + 4"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Left to right for division and multiplication: 4 x 3 = 12, then 12 + 4 = 16.",
    "as": "হৰণ আৰু পূৰণ বাওঁৰপৰা সোঁলৈ: 4 x 3 = 12, তাৰপিছত 12 + 4 = 16।"
   }
  },
  {
   "id": "simplification-fractions-011",
   "q": {
    "en": "Simplify: 2 1/2 + 1 3/4",
    "as": "সৰল কৰক: 2 1/2 + 1 3/4"
   },
   "options": [
    {
     "en": "3 3/4",
     "as": "৩ ৩/৪"
    },
    {
     "en": "4 1/2",
     "as": "৪ ১/২"
    },
    {
     "en": "4 1/4",
     "as": "৪ ১/৪"
    },
    {
     "en": "4",
     "as": "৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5/2 + 7/4 = 10/4 + 7/4 = 17/4 = 4 1/4.",
    "as": "5/2 + 7/4 = 10/4 + 7/4 = 17/4 = 4 1/4।"
   }
  },
  {
   "id": "simplification-fractions-012",
   "q": {
    "en": "The value of (0.5)^3 is —",
    "as": "(0.5)^3 ৰ মান —"
   },
   "options": [
    {
     "en": "0.25",
     "as": "০.২৫"
    },
    {
     "en": "0.125",
     "as": "০.১২৫"
    },
    {
     "en": "1.5",
     "as": "১.৫"
    },
    {
     "en": "0.015",
     "as": "০.০১৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "0.5 x 0.5 x 0.5 = 0.125.",
    "as": "0.5 x 0.5 x 0.5 = 0.125।"
   }
  }
 ],
 "sports": [
  {
   "id": "sports-001",
   "q": {
    "en": "Which trophy is associated with cricket?",
    "as": "কোনটো ট্ৰফী ক্ৰিকেটৰ সৈতে জড়িত?"
   },
   "options": [
    {
     "en": "Santosh Trophy",
     "as": "সন্তোষ ট্ৰফী"
    },
    {
     "en": "Ranji Trophy",
     "as": "ৰঞ্জী ট্ৰফী"
    },
    {
     "en": "Durand Cup",
     "as": "ডুৰাণ্ড কাপ"
    },
    {
     "en": "Agha Khan Cup",
     "as": "আগা খান কাপ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Ranji Trophy is a first-class cricket tournament of India.",
    "as": "ৰঞ্জী ট্ৰফী ভাৰতৰ এটা প্ৰথম শ্ৰেণীৰ ক্ৰিকেট প্ৰতিযোগিতা।"
   }
  },
  {
   "id": "sports-002",
   "q": {
    "en": "The Santosh Trophy is associated with —",
    "as": "সন্তোষ ট্ৰফী কাৰ সৈতে জড়িত —"
   },
   "options": [
    {
     "en": "Football",
     "as": "ফুটবল"
    },
    {
     "en": "Hockey",
     "as": "হকী"
    },
    {
     "en": "Cricket",
     "as": "ক্ৰিকেট"
    },
    {
     "en": "Badminton",
     "as": "বেডমিণ্টন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Santosh Trophy is a football tournament in India.",
    "as": "সন্তোষ ট্ৰফী ভাৰতৰ এটা ফুটবল প্ৰতিযোগিতা।"
   }
  },
  {
   "id": "sports-003",
   "q": {
    "en": "The Olympic Games are held once in every —",
    "as": "অলিম্পিক খেল কিমান বছৰত এবাৰ অনুষ্ঠিত হয় —"
   },
   "options": [
    {
     "en": "Two years",
     "as": "দুই বছৰ"
    },
    {
     "en": "Three years",
     "as": "তিনি বছৰ"
    },
    {
     "en": "Four years",
     "as": "চাৰি বছৰ"
    },
    {
     "en": "Five years",
     "as": "পাঁচ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The Olympic Games are held once in four years.",
    "as": "অলিম্পিক খেল চাৰি বছৰত এবাৰ অনুষ্ঠিত হয়।"
   }
  },
  {
   "id": "sports-004",
   "q": {
    "en": "Which sport is regarded as the national game of India?",
    "as": "কোনটো খেলক ভাৰতৰ ৰাষ্ট্ৰীয় খেল হিচাপে গণ্য কৰা হয়?"
   },
   "options": [
    {
     "en": "Cricket",
     "as": "ক্ৰিকেট"
    },
    {
     "en": "Hockey",
     "as": "হকী"
    },
    {
     "en": "Kabaddi",
     "as": "কাবাডি"
    },
    {
     "en": "Football",
     "as": "ফুটবল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Hockey is regarded as the national game of India.",
    "as": "হকীক ভাৰতৰ ৰাষ্ট্ৰীয় খেল হিচাপে গণ্য কৰা হয়।"
   }
  }
 ],
 "subject-verb-agreement": [
  {
   "id": "subject-verb-agreement-001",
   "q": {
    "en": "The box of apples — heavy.",
    "as": "আপেলৰ বাকচটো —।"
   },
   "options": [
    {
     "en": "are",
     "as": "are"
    },
    {
     "en": "is",
     "as": "is"
    },
    {
     "en": "were",
     "as": "were"
    },
    {
     "en": "have",
     "as": "have"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The true subject is box, so the singular verb is is correct.",
    "as": "প্ৰকৃত কৰ্তা box, গতিকে একবচন ক্ৰিয়া is শুদ্ধ।"
   }
  },
  {
   "id": "subject-verb-agreement-002",
   "q": {
    "en": "Each of the boys — a book.",
    "as": "ল'ৰাবোৰৰ প্ৰত্যেকৰ ওচৰত এখন কিতাপ —।"
   },
   "options": [
    {
     "en": "have",
     "as": "have"
    },
    {
     "en": "has",
     "as": "has"
    },
    {
     "en": "are",
     "as": "are"
    },
    {
     "en": "were",
     "as": "were"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each takes a singular verb.",
    "as": "Each এ একবচন ক্ৰিয়া লয়।"
   }
  },
  {
   "id": "subject-verb-agreement-003",
   "q": {
    "en": "Bread and butter — my breakfast.",
    "as": "পাউৰুটী আৰু মাখন মোৰ ৰাতিপুৱাৰ আহাৰ —।"
   },
   "options": [
    {
     "en": "are",
     "as": "are"
    },
    {
     "en": "is",
     "as": "is"
    },
    {
     "en": "were",
     "as": "were"
    },
    {
     "en": "have",
     "as": "have"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Bread and butter is treated as a single idea.",
    "as": "Bread and butter ক এটা অখণ্ড ভাৱ হিচাপে গণ্য কৰা হয়।"
   }
  },
  {
   "id": "subject-verb-agreement-004",
   "q": {
    "en": "Neither of the two answers — correct.",
    "as": "দুটা উত্তৰৰ এটাও — নহয়।"
   },
   "options": [
    {
     "en": "are",
     "as": "are"
    },
    {
     "en": "is",
     "as": "is"
    },
    {
     "en": "were",
     "as": "were"
    },
    {
     "en": "have",
     "as": "have"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Neither takes a singular verb.",
    "as": "Neither এ একবচন ক্ৰিয়া লয়।"
   }
  }
 ],
 "syllogism": [
  {
   "id": "syllogism-001",
   "q": {
    "en": "Statements: All men are mortal. Ram is a man. Conclusion: Ram is mortal.",
    "as": "বিবৃতি: সকলো মানুহ মৰণশীল। ৰাম এজন মানুহ। সিদ্ধান্ত: ৰাম মৰণশীল।"
   },
   "options": [
    {
     "en": "Follows",
     "as": "ওলায়"
    },
    {
     "en": "Does not follow",
     "as": "ওলাই নাযায়"
    },
    {
     "en": "Cannot be determined",
     "as": "নিৰ্ণয় কৰিব নোৱাৰি"
    },
    {
     "en": "None of these",
     "as": "এটাও নহয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The conclusion follows directly from the two statements.",
    "as": "সিদ্ধান্ত দুটা বিবৃতিৰ পৰা পোনপটীয়াকৈ ওলায়।"
   }
  },
  {
   "id": "syllogism-002",
   "q": {
    "en": "Statements: All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly.",
    "as": "বিবৃতি: সকলো গোলাপ ফুল। কিছুমান ফুল সোনকালে শুকাই যায়। সিদ্ধান্ত: কিছুমান গোলাপ সোনকালে শুকাই যায়।"
   },
   "options": [
    {
     "en": "Follows",
     "as": "ওলায়"
    },
    {
     "en": "Does not follow",
     "as": "ওলাই নাযায়"
    },
    {
     "en": "Cannot be determined",
     "as": "নিৰ্ণয় কৰিব নোৱাৰি"
    },
    {
     "en": "None of these",
     "as": "এটাও নহয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The fading flowers need not be roses, so the conclusion does not follow.",
    "as": "শুকাই যোৱা ফুলবোৰ গোলাপ নহ'বও পাৰে, গতিকে সিদ্ধান্ত ওলাই নাযায়।"
   }
  },
  {
   "id": "syllogism-003",
   "q": {
    "en": "Statements: No cat is a dog. All dogs are animals. Conclusion: No cat is an animal.",
    "as": "বিবৃতি: কোনো মেকুৰী কুকুৰ নহয়। সকলো কুকুৰ প্ৰাণী। সিদ্ধান্ত: কোনো মেকুৰী প্ৰাণী নহয়।"
   },
   "options": [
    {
     "en": "Follows",
     "as": "ওলায়"
    },
    {
     "en": "Does not follow",
     "as": "ওলাই নাযায়"
    },
    {
     "en": "Cannot be determined",
     "as": "নিৰ্ণয় কৰিব নোৱাৰি"
    },
    {
     "en": "None of these",
     "as": "এটাও নহয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Cats may still be animals other than dogs, so the conclusion does not follow.",
    "as": "মেকুৰী কুকুৰৰ বাহিৰে আন প্ৰাণীও হ'ব পাৰে, গতিকে সিদ্ধান্ত ওলাই নাযায়।"
   }
  },
  {
   "id": "syllogism-004",
   "q": {
    "en": "Statements: All students are hardworking. Rina is a student. Conclusion: Rina is hardworking.",
    "as": "বিবৃতি: সকলো ছাত্ৰ পৰিশ্ৰমী। ৰীনা এগৰাকী ছাত্ৰী। সিদ্ধান্ত: ৰীনা পৰিশ্ৰমী।"
   },
   "options": [
    {
     "en": "Follows",
     "as": "ওলায়"
    },
    {
     "en": "Does not follow",
     "as": "ওলাই নাযায়"
    },
    {
     "en": "Cannot be determined",
     "as": "নিৰ্ণয় কৰিব নোৱাৰি"
    },
    {
     "en": "None of these",
     "as": "এটাও নহয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The conclusion follows directly from the two statements.",
    "as": "সিদ্ধান্ত দুটা বিবৃতিৰ পৰা পোনপটীয়াকৈ ওলায়।"
   }
  }
 ],
 "synonyms-antonyms": [
  {
   "id": "synonyms-antonyms-001",
   "q": {
    "en": "Choose the synonym of 'happy'.",
    "as": "'happy' ৰ সমাৰ্থক শব্দ বাছনি কৰক।"
   },
   "options": [
    {
     "en": "sad",
     "as": "sad"
    },
    {
     "en": "glad",
     "as": "glad"
    },
    {
     "en": "angry",
     "as": "angry"
    },
    {
     "en": "tired",
     "as": "tired"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Glad has nearly the same meaning as happy.",
    "as": "Glad ৰ অৰ্থ happy ৰ সৈতে প্ৰায় একেই।"
   }
  },
  {
   "id": "synonyms-antonyms-002",
   "q": {
    "en": "Choose the antonym of 'ancient'.",
    "as": "'ancient' ৰ বিপৰীত শব্দ বাছনি কৰক।"
   },
   "options": [
    {
     "en": "old",
     "as": "old"
    },
    {
     "en": "modern",
     "as": "modern"
    },
    {
     "en": "past",
     "as": "past"
    },
    {
     "en": "early",
     "as": "early"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Modern is the opposite of ancient.",
    "as": "Modern হৈছে ancient ৰ বিপৰীত।"
   }
  },
  {
   "id": "synonyms-antonyms-003",
   "q": {
    "en": "Choose the synonym of 'brave'.",
    "as": "'brave' ৰ সমাৰ্থক শব্দ বাছনি কৰক।"
   },
   "options": [
    {
     "en": "cowardly",
     "as": "cowardly"
    },
    {
     "en": "courageous",
     "as": "courageous"
    },
    {
     "en": "weak",
     "as": "weak"
    },
    {
     "en": "timid",
     "as": "timid"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Courageous means the same as brave.",
    "as": "Courageous ৰ অৰ্থ brave ৰ সৈতে একেই।"
   }
  },
  {
   "id": "synonyms-antonyms-004",
   "q": {
    "en": "Choose the antonym of 'victory'.",
    "as": "'victory' ৰ বিপৰীত শব্দ বাছনি কৰক।"
   },
   "options": [
    {
     "en": "success",
     "as": "success"
    },
    {
     "en": "defeat",
     "as": "defeat"
    },
    {
     "en": "win",
     "as": "win"
    },
    {
     "en": "triumph",
     "as": "triumph"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Defeat is the opposite of victory.",
    "as": "Defeat হৈছে victory ৰ বিপৰীত।"
   }
  }
 ],
 "tenses-rules": [
  {
   "id": "tenses-rules-001",
   "q": {
    "en": "She — to school every day.",
    "as": "তাই প্ৰতিদিনে স্কুললৈ —।"
   },
   "options": [
    {
     "en": "go",
     "as": "go"
    },
    {
     "en": "goes",
     "as": "goes"
    },
    {
     "en": "going",
     "as": "going"
    },
    {
     "en": "gone",
     "as": "gone"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A daily habit takes the simple present tense.",
    "as": "দৈনিক অভ্যাসৰ বাবে সৰল বৰ্তমান কাল লাগে।"
   }
  },
  {
   "id": "tenses-rules-002",
   "q": {
    "en": "He — here yesterday.",
    "as": "তেওঁ কালি ইয়াত —।"
   },
   "options": [
    {
     "en": "come",
     "as": "come"
    },
    {
     "en": "comes",
     "as": "comes"
    },
    {
     "en": "came",
     "as": "came"
    },
    {
     "en": "will come",
     "as": "will come"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Yesterday shows past time, so the simple past is used.",
    "as": "Yesterday এ অতীত কাল দেখুৱায়, গতিকে সৰল অতীত ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "tenses-rules-003",
   "q": {
    "en": "They — football now.",
    "as": "তেওঁলোকে এতিয়া ফুটবল —।"
   },
   "options": [
    {
     "en": "play",
     "as": "play"
    },
    {
     "en": "played",
     "as": "played"
    },
    {
     "en": "are playing",
     "as": "are playing"
    },
    {
     "en": "have played",
     "as": "have played"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "An action happening now takes the present continuous tense.",
    "as": "এতিয়া হোৱা ক্ৰিয়াৰ বাবে বৰ্তমান চলমান কাল ব্যৱহাৰ হয়।"
   }
  },
  {
   "id": "tenses-rules-004",
   "q": {
    "en": "I — in this town since 2010.",
    "as": "মই 2010 চনৰ পৰা এই চহৰত —।"
   },
   "options": [
    {
     "en": "live",
     "as": "live"
    },
    {
     "en": "lived",
     "as": "lived"
    },
    {
     "en": "have lived",
     "as": "have lived"
    },
    {
     "en": "am living",
     "as": "am living"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Since with a point of time takes the present perfect tense.",
    "as": "Since ৰ সৈতে এটা সময়বিন্দু থাকিলে বৰ্তমান পূৰ্ণ কাল ব্যৱহাৰ হয়।"
   }
  }
 ],
 "time-speed-distance": [
  {
   "id": "time-speed-distance-001",
   "q": {
    "en": "A car travels 240 km in 4 hours. Its speed is —",
    "as": "এখন গাড়ীয়ে 4 ঘণ্টাত 240 কিমি যায়। তাৰ বেগ —"
   },
   "options": [
    {
     "en": "65 km/h",
     "as": "৬৫ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = distance / time = 240 / 4 = 60 km/h.",
    "as": "বেগ = দূৰত্ব / সময় = 240 / 4 = 60 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-002",
   "q": {
    "en": "A speed of 72 km/h expressed in metres per second is —",
    "as": "72 কিমি/ঘণ্টা বেগক মিটাৰ/ছেকেণ্ডত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    },
    {
     "en": "22 m/s",
     "as": "২২ m/s"
    },
    {
     "en": "25 m/s",
     "as": "২৫ m/s"
    },
    {
     "en": "18 m/s",
     "as": "১৮ m/s"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Multiply by 5/18: 72 x 5 / 18 = 20 m/s.",
    "as": "5/18 ৰে পূৰণ কৰক: 72 x 5 / 18 = 20 m/s।"
   }
  },
  {
   "id": "time-speed-distance-003",
   "q": {
    "en": "A train 150 m long crosses a pole in 15 seconds. Its speed is —",
    "as": "150 মিটাৰ দীঘল এখন ৰে'লগাড়ীয়ে এটা খুঁটা 15 ছেকেণ্ডত পাৰ হয়। তাৰ বেগ —"
   },
   "options": [
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "10 m/s",
     "as": "১০ m/s"
    },
    {
     "en": "12 m/s",
     "as": "১২ m/s"
    },
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 150 / 15 = 10 m/s.",
    "as": "বেগ = 150 / 15 = 10 m/s।"
   }
  },
  {
   "id": "time-speed-distance-004",
   "q": {
    "en": "A train 200 m long running at 20 m/s crosses a platform 300 m long in —",
    "as": "20 m/s বেগত চলি থকা 200 মিটাৰ দীঘল এখন ৰে'লগাড়ীয়ে 300 মিটাৰ দীঘল প্লেটফৰ্ম পাৰ কৰিব —"
   },
   "options": [
    {
     "en": "35 seconds",
     "as": "৩৫ ছেকেণ্ড"
    },
    {
     "en": "25 seconds",
     "as": "২৫ ছেকেন্ড"
    },
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    },
    {
     "en": "30 seconds",
     "as": "৩০ ছেকেণ্ড"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total distance = 500 m; time = 500 / 20 = 25 s.",
    "as": "মুঠ দূৰত্ব = 500 মিটাৰ; সময় = 500 / 20 = 25 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-005",
   "q": {
    "en": "A man covers a distance of 15 km in 2 hours 30 minutes. His speed is —",
    "as": "এজনে 2 ঘণ্টা 30 মিনিটত 15 কিমি দূৰত্ব অতিক্ৰম কৰে। তেওঁৰ বেগ —"
   },
   "options": [
    {
     "en": "5 km/h",
     "as": "৫ কিমি/ঘণ্টা"
    },
    {
     "en": "8 km/h",
     "as": "৮ কিমি/ঘণ্টা"
    },
    {
     "en": "7.5 km/h",
     "as": "৭.৫ কিমি/ঘণ্টা"
    },
    {
     "en": "6 km/h",
     "as": "৬ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Time = 2.5 hours; speed = 15 / 2.5 = 6 km/h.",
    "as": "সময় = 2.5 ঘণ্টা; বেগ = 15 / 2.5 = 6 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-006",
   "q": {
    "en": "Two trains 100 m and 150 m long run in the same direction at 40 km/h and 30 km/h. The time taken by the faster train to cross the slower one is —",
    "as": "100 মিটাৰ আৰু 150 মিটাৰ দীঘল দুখন ৰে'লগাড়ী একে দিশত 40 কিমি/ঘণ্টা আৰু 30 কিমি/ঘণ্টা বেগত যায়। দ্ৰুতগামী ৰে'লগাড়ীয়ে লাহীখনক পাৰ হ'বলৈ লগা সময় —"
   },
   "options": [
    {
     "en": "150 seconds",
     "as": "১৫০ ছেকেণ্ড"
    },
    {
     "en": "120 seconds",
     "as": "১২০ ছেকেণ্ড"
    },
    {
     "en": "60 seconds",
     "as": "৬০ ছেকেণ্ড"
    },
    {
     "en": "90 seconds",
     "as": "৯০ ছেকেণ্ড"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Relative speed = 10 km/h = 25/9 m/s; distance 250 m; time = 90 s.",
    "as": "আপেক্ষিক বেগ = 10 কিমি/ঘণ্টা = 25/9 m/s; দূৰত্ব 250 মিটাৰ; সময় = 90 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-007",
   "q": {
    "en": "A boat covers 24 km downstream in 3 hours and the speed of the stream is 2 km/h. The speed of the boat in still water is —",
    "as": "এখন নাওৱে 3 ঘণ্টাত সোঁতৰ অনুকূলে 24 কিমি যায় আৰু সোঁতৰ বেগ 2 কিমি/ঘণ্টা। স্থিৰ পানীত নাওখনৰ বেগ —"
   },
   "options": [
    {
     "en": "4 km/h",
     "as": "৪ কিমি/ঘণ্টা"
    },
    {
     "en": "6 km/h",
     "as": "৬ কিমি/ঘণ্টা"
    },
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "8 km/h",
     "as": "৮ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Downstream speed = 8 km/h, so still-water speed = 8 - 2 = 6 km/h.",
    "as": "অনুকূল বেগ = 8 কিমি/ঘণ্টা, গতিকে স্থিৰ পানীৰ বেগ = 8 - 2 = 6 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-008",
   "q": {
    "en": "The speed of a boat in still water is 10 km/h and the speed of the stream is 2 km/h. The time taken to go 24 km downstream and return is —",
    "as": "স্থিৰ পানীত নাওৰ বেগ 10 কিমি/ঘণ্টা আৰু সোঁতৰ বেগ 2 কিমি/ঘণ্টা। 24 কিমি অনুকূলে গৈ ঘূৰি অহাৰ সময় —"
   },
   "options": [
    {
     "en": "4 hours",
     "as": "৪ ঘণ্টা"
    },
    {
     "en": "7 hours",
     "as": "৭ ঘণ্টা"
    },
    {
     "en": "6 hours",
     "as": "৬ ঘণ্টা"
    },
    {
     "en": "5 hours",
     "as": "৫ ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Downstream 24/12 = 2 h, upstream 24/8 = 3 h; total 5 h.",
    "as": "অনুকূল 24/12 = 2 ঘণ্টা, প্ৰতিকূল 24/8 = 3 ঘণ্টা; মুঠ 5 ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-009",
   "q": {
    "en": "Two trains start from stations 300 km apart towards each other at 40 km/h and 60 km/h. They meet after —",
    "as": "300 কিমি আঁতৰত থকা দুটা ষ্টেচনৰ পৰা দুখন ৰে'লগাড়ী 40 কিমি/ঘণ্টা আৰু 60 কিমি/ঘণ্টা বেগত ইখন-সিখনলৈ যায়। সিহঁত লগ হ'ব —"
   },
   "options": [
    {
     "en": "3 hours",
     "as": "৩ ঘণ্টা"
    },
    {
     "en": "2 hours",
     "as": "২ ঘণ্টা"
    },
    {
     "en": "2.5 hours",
     "as": "২.৫ ঘণ্টা"
    },
    {
     "en": "4 hours",
     "as": "৪ ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Relative speed = 100 km/h; time = 300 / 100 = 3 hours.",
    "as": "আপেক্ষিক বেগ = 100 কিমি/ঘণ্টা; সময় = 300 / 100 = 3 ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-010",
   "q": {
    "en": "A man walking at 5 km/h covers a certain distance in 48 minutes. The distance is —",
    "as": "5 কিমি/ঘণ্টা বেগে খোজ কাঢ়ি এজনে 48 মিনিটত এটা দূৰত্ব অতিক্ৰম কৰে। দূৰত্ব —"
   },
   "options": [
    {
     "en": "6 km",
     "as": "৬ কিমি"
    },
    {
     "en": "5 km",
     "as": "৫ কিমি"
    },
    {
     "en": "3 km",
     "as": "৩ কিমি"
    },
    {
     "en": "4 km",
     "as": "৪ কিমি"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "48 minutes = 0.8 hour; 5 x 0.8 = 4 km.",
    "as": "48 মিনিট = 0.8 ঘণ্টা; 5 x 0.8 = 4 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-011",
   "q": {
    "en": "A train running at 54 km/h crosses a 200 m long bridge in 20 seconds. The length of the train is —",
    "as": "54 কিমি/ঘণ্টা বেগত চলি থকা এখন ৰে'লগাড়ীয়ে 200 মিটাৰ দীঘল দলং 20 ছেকেণ্ডত পাৰ হয়। ৰে'লগাড়ীখনৰ দীঘ —"
   },
   "options": [
    {
     "en": "140 m",
     "as": "১৪০ মিটাৰ"
    },
    {
     "en": "80 m",
     "as": "৮০ মিটাৰ"
    },
    {
     "en": "100 m",
     "as": "১০০ মিটাৰ"
    },
    {
     "en": "120 m",
     "as": "১২০ মিটাৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 15 m/s; distance = 300 m; train = 300 - 200 = 100 m.",
    "as": "বেগ = 15 m/s; দূৰত্ব = 300 মিটাৰ; ৰে'লগাড়ী = 300 - 200 = 100 মিটাৰ।"
   }
  },
  {
   "id": "time-speed-distance-012",
   "q": {
    "en": "A person covers the first half of a journey at 30 km/h and the second half at 60 km/h. His average speed is —",
    "as": "এজনে যাত্ৰাৰ প্ৰথম আধা 30 কিমি/ঘণ্টা আৰু দ্বিতীয় আধা 60 কিমি/ঘণ্টা বেগত অতিক্ৰম কৰে। তেওঁৰ গড় বেগ —"
   },
   "options": [
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "40 km/h",
     "as": "৪০ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Average speed = 2 x 30 x 60 / 90 = 40 km/h.",
    "as": "গড় বেগ = 2 x 30 x 60 / 90 = 40 কিমি/ঘণ্টা।"
   }
  }
 ],
 "time-work": [
  {
   "id": "time-work-001",
   "q": {
    "en": "A can finish a work in 12 days and B in 18 days. Working together they finish it in —",
    "as": "A এ কাম এটা 12 দিনত আৰু B এ 18 দিনত শেষ কৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "9 days",
     "as": "৯ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "7.2 days",
     "as": "৭.২ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1/12 + 1/18 = 5/36, so together they take 36/5 = 7.2 days.",
    "as": "1/12 + 1/18 = 5/36, গতিকে একেলগে 36/5 = 7.2 দিন লাগে।"
   }
  },
  {
   "id": "time-work-002",
   "q": {
    "en": "A can do a piece of work in 10 days and B in 15 days. They work together for 4 days and then A leaves. The remaining work is finished by B in —",
    "as": "A এ এটা কাম 10 দিনত আৰু B এ 15 দিনত কৰে। দুয়ো 4 দিন একেলগে কাম কৰি A গুচি গ'ল। বাকী কাম B এ কৰিব —"
   },
   "options": [
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "In 4 days they finish 4 x 1/6 = 2/3; B does 1/3 in 5 days.",
    "as": "4 দিনত দুয়ো 4 x 1/6 = 2/3 কৰে; B এ 1/3 কাম 5 দিনত কৰে।"
   }
  },
  {
   "id": "time-work-003",
   "q": {
    "en": "If 12 men can complete a work in 15 days, 18 men can complete the same work in —",
    "as": "12 জন মানুহে এটা কাম 15 দিনত কৰিলে 18 জনে সেই কাম কৰিব —"
   },
   "options": [
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "14 days",
     "as": "১৪ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "12 x 15 = 18 x d, so d = 10 days.",
    "as": "12 x 15 = 18 x d, গতিকে d = 10 দিন।"
   }
  },
  {
   "id": "time-work-004",
   "q": {
    "en": "A and B together can do a work in 6 days and A alone in 10 days. B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 6 দিনত আৰু A অকলে 10 দিনত কৰে। B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/6 - 1/10 = 1/15, so B takes 15 days.",
    "as": "1/6 - 1/10 = 1/15, গতিকে B এ 15 দিন লয়।"
   }
  },
  {
   "id": "time-work-005",
   "q": {
    "en": "A is twice as efficient as B. If together they finish a work in 8 days, B alone will take —",
    "as": "A ৰ দক্ষতা B ৰ দুগুণ। একেলগে 8 দিনত কাম শেষ কৰিলে B অকলে ল'ব —"
   },
   "options": [
    {
     "en": "16 days",
     "as": "১৬ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "28 days",
     "as": "২৮ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Let B take x days and A take x/2; 1/x + 2/x = 1/8, so x = 24 days.",
    "as": "B এ x দিন আৰু A এ x/2 দিন লয়; 1/x + 2/x = 1/8, গতিকে x = 24 দিন।"
   }
  },
  {
   "id": "time-work-006",
   "q": {
    "en": "A, B and C can do a work in 6, 12 and 18 days respectively. Working together they finish it in —",
    "as": "A, B আৰু C এ এটা কাম ক্ৰমে 6, 12 আৰু 18 দিনত কৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "4 1/2 days",
     "as": "৪ ১/২ দিন"
    },
    {
     "en": "3 days",
     "as": "৩ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "3 3/11 days",
     "as": "৩ ৩/১১ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Sum = 6/18 + 3/18 + 2/18 = 11/18, so the time is 18/11 = 3 3/11 days.",
    "as": "যোগফল = 6/18 + 3/18 + 2/18 = 11/18, গতিকে সময় 18/11 = 3 3/11 দিন।"
   }
  },
  {
   "id": "time-work-007",
   "q": {
    "en": "A can do a work in 20 days. He works for 5 days and leaves. The fraction of the work left is —",
    "as": "A এ এটা কাম 20 দিনত কৰে। তেওঁ 5 দিন কাম কৰি গুচি গ'ল। বাকী থকা কামৰ ভগ্নাংশ —"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Work done = 5/20 = 1/4, so 3/4 is left.",
    "as": "কৰা কাম = 5/20 = 1/4, গতিকে 3/4 বাকী থাকে।"
   }
  },
  {
   "id": "time-work-008",
   "q": {
    "en": "10 men can build a wall in 8 days. How many men are needed to build it in 5 days?",
    "as": "10 জন মানুহে এটা দেৱাল 8 দিনত সাজে। 5 দিনত সাজিবলৈ কিমান মানুহ লাগিব?"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "10 x 8 = n x 5, so n = 16 men.",
    "as": "10 x 8 = n x 5, গতিকে n = 16 জন।"
   }
  },
  {
   "id": "time-work-009",
   "q": {
    "en": "A and B can do a work in 12 days, B and C in 15 days, and A and C in 20 days. A alone can do it in —",
    "as": "A আৰু B এ 12 দিনত, B আৰু C এ 15 দিনত, আৰু A আৰু C এ 20 দিনত এটা কাম কৰে। A অকলে কৰিব —"
   },
   "options": [
    {
     "en": "40 days",
     "as": "৪০ দিন"
    },
    {
     "en": "36 days",
     "as": "৩৬ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5, so A alone takes 30 days.",
    "as": "2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5, গতিকে A অকলে 30 দিন লয়।"
   }
  },
  {
   "id": "time-work-010",
   "q": {
    "en": "A can complete a work in 15 days. B is 50% more efficient than A. B alone can complete it in —",
    "as": "A এ এটা কাম 15 দিনত শেষ কৰে। B ৰ দক্ষতা A তকৈ 50% বেছি। B অকলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "9 days",
     "as": "৯ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "B's rate is 1.5 times A's, so B takes 15 / 1.5 = 10 days.",
    "as": "B ৰ হাৰ A ৰ 1.5 গুণ, গতিকে B এ 15 / 1.5 = 10 দিন লয়।"
   }
  },
  {
   "id": "time-work-011",
   "q": {
    "en": "Two pipes A and B can fill a tank in 12 and 18 hours respectively. Together they fill it in —",
    "as": "দুটা নল A আৰু B এ এটা টেংকী ক্ৰমে 12 আৰু 18 ঘণ্টাত ভৰে। একেলগে ভৰিব —"
   },
   "options": [
    {
     "en": "6 hours",
     "as": "৬ ঘণ্টা"
    },
    {
     "en": "7.2 hours",
     "as": "৭.২ ঘণ্টা"
    },
    {
     "en": "8 hours",
     "as": "৮ ঘণ্টা"
    },
    {
     "en": "9 hours",
     "as": "৯ ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/12 + 1/18 = 5/36, so 36/5 = 7.2 hours.",
    "as": "1/12 + 1/18 = 5/36, গতিকে 36/5 = 7.2 ঘণ্টা।"
   }
  },
  {
   "id": "time-work-012",
   "q": {
    "en": "A cistern is filled by a pipe in 6 hours and emptied by a leak in 9 hours. If both work together the cistern is filled in —",
    "as": "এটা হাউজ এটা নলে 6 ঘণ্টাত ভৰে আৰু এটা চিদ্ৰই 9 ঘণ্টাত ৰিক্ত কৰে। দুয়ো একেলগে কাম কৰিলে হাউজটো ভৰিব —"
   },
   "options": [
    {
     "en": "18 hours",
     "as": "১৮ ঘণ্টা"
    },
    {
     "en": "3 hours",
     "as": "৩ ঘণ্টা"
    },
    {
     "en": "15 hours",
     "as": "১৫ ঘণ্টা"
    },
    {
     "en": "4.5 hours",
     "as": "৪.৫ ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/6 - 1/9 = 1/18, so 18 hours.",
    "as": "1/6 - 1/9 = 1/18, গতিকে 18 ঘণ্টা।"
   }
  }
 ],
 "venn-diagrams": [
  {
   "id": "venn-diagrams-001",
   "q": {
    "en": "All cats are animals. Which relation is correct?",
    "as": "সকলো মেকুৰী প্ৰাণী। কোনটো সম্পৰ্ক শুদ্ধ?"
   },
   "options": [
    {
     "en": "Cats lie inside the circle of animals",
     "as": "মেকুৰীৰ বৃত্ত প্ৰাণীৰ ভিতৰত থাকে"
    },
    {
     "en": "Animals lie inside the circle of cats",
     "as": "প্ৰাণীৰ বৃত্ত মেকুৰীৰ ভিতৰত থাকে"
    },
    {
     "en": "The circles are separate",
     "as": "বৃত্ত দুটা বেলেগ"
    },
    {
     "en": "The circles are partly overlapping",
     "as": "বৃত্ত দুটা আংশিক ওপৰাওপৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "If all cats are animals, the circle of cats lies entirely inside the circle of animals.",
    "as": "সকলো মেকুৰী প্ৰাণী হ'লে মেকুৰীৰ বৃত্ত প্ৰাণীৰ বৃত্তৰ ভিতৰত সম্পূৰ্ণভাৱে থাকে।"
   }
  },
  {
   "id": "venn-diagrams-002",
   "q": {
    "en": "If no rose is a flower that is blue, the circles for 'rose' and 'blue flower' are —",
    "as": "'কোনো গোলাপ নীলা ফুল নহয়' হ'লে 'গোলাপ' আৰু 'নীলা ফুল' ৰ বৃত্ত দুটা —"
   },
   "options": [
    {
     "en": "Separate",
     "as": "বেলেগ"
    },
    {
     "en": "One inside the other",
     "as": "এটা আনটোৰ ভিতৰত"
    },
    {
     "en": "Overlapping",
     "as": "ওপৰাওপৰ"
    },
    {
     "en": "Identical",
     "as": "একে"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "When two classes have nothing in common, their circles are drawn separately.",
    "as": "দুটা শ্ৰেণীৰ মাজত একো সাধাৰণ নাথাকিলে তেওঁলোকৰ বৃত্ত বেলেগে অঁকা হয়।"
   }
  },
  {
   "id": "venn-diagrams-003",
   "q": {
    "en": "Some doctors are writers. The circles for 'doctors' and 'writers' are —",
    "as": "কিছুমান ডাক্তৰ লেখক। 'ডাক্তৰ' আৰু 'লেখক' ৰ বৃত্ত দুটা —"
   },
   "options": [
    {
     "en": "Separate",
     "as": "বেলেগ"
    },
    {
     "en": "Overlapping",
     "as": "ওপৰাওপৰ"
    },
    {
     "en": "Identical",
     "as": "একে"
    },
    {
     "en": "One inside the other",
     "as": "এটা আনটোৰ ভিতৰত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Some doctors are writers means the two classes partly overlap.",
    "as": "কিছুমান ডাক্তৰ লেখক মানে দুটা শ্ৰেণী আংশিকভাৱে ওপৰাওপৰ।"
   }
  },
  {
   "id": "venn-diagrams-004",
   "q": {
    "en": "All pens are tools and all tools are useful. Then —",
    "as": "সকলো কলম সঁজুলি আৰু সকলো সঁজুলি উপযোগী। তেন্তে —"
   },
   "options": [
    {
     "en": "all pens are useful",
     "as": "সকলো কলম উপযোগী"
    },
    {
     "en": "no pen is useful",
     "as": "কোনো কলম উপযোগী নহয়"
    },
    {
     "en": "some pens are not useful",
     "as": "কিছুমান কলম উপযোগী নহয়"
    },
    {
     "en": "cannot be determined",
     "as": "নিৰ্ণয় কৰিব নোৱাৰি"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Since all pens are tools and all tools are useful, all pens are useful.",
    "as": "সকলো কলম সঁজুলি আৰু সকলো সঁজুলি উপযোগী, গতিকে সকলো কলম উপযোগী।"
   }
  }
 ],
 "voice-change": [
  {
   "id": "voice-change-001",
   "q": {
    "en": "Change to passive: He writes a letter.",
    "as": "কৰ্মবাচ্যলৈ সলাওক: He writes a letter."
   },
   "options": [
    {
     "en": "A letter is written by him.",
     "as": "A letter is written by him."
    },
    {
     "en": "A letter was written by him.",
     "as": "A letter was written by him."
    },
    {
     "en": "A letter is wrote by him.",
     "as": "A letter is wrote by him."
    },
    {
     "en": "A letter written by him.",
     "as": "A letter written by him."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The object becomes the subject and the verb becomes is plus the past participle written.",
    "as": "কৰ্ম কৰ্তা হয় আৰু ক্ৰিয়া is আৰু অতীত কৃদন্ত written হয়।"
   }
  },
  {
   "id": "voice-change-002",
   "q": {
    "en": "Change to passive: She sang a song.",
    "as": "কৰ্মবাচ্যলৈ সলাওক: She sang a song."
   },
   "options": [
    {
     "en": "A song is sung by her.",
     "as": "A song is sung by her."
    },
    {
     "en": "A song was sung by her.",
     "as": "A song was sung by her."
    },
    {
     "en": "A song was sang by her.",
     "as": "A song was sang by her."
    },
    {
     "en": "A song sung by her.",
     "as": "A song sung by her."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The past tense becomes was with the past participle sung.",
    "as": "অতীত কাল was আৰু অতীত কৃদন্ত sung হয়।"
   }
  },
  {
   "id": "voice-change-003",
   "q": {
    "en": "Change to passive: They will finish the work.",
    "as": "কৰ্মবাচ্যলৈ সলাওক: They will finish the work."
   },
   "options": [
    {
     "en": "The work will be finished by them.",
     "as": "The work will be finished by them."
    },
    {
     "en": "The work will finished by them.",
     "as": "The work will finished by them."
    },
    {
     "en": "The work is finished by them.",
     "as": "The work is finished by them."
    },
    {
     "en": "The work was finished by them.",
     "as": "The work was finished by them."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "With will the passive is will be plus the past participle.",
    "as": "Will ৰ সৈতে কৰ্মবাচ্য will be আৰু অতীত কৃদন্তৰে হয়।"
   }
  },
  {
   "id": "voice-change-004",
   "q": {
    "en": "Which sentence is in the passive voice?",
    "as": "কোনটো বাক্য কৰ্মবাচ্যত আছে?"
   },
   "options": [
    {
     "en": "Rama killed Ravana.",
     "as": "Rama killed Ravana."
    },
    {
     "en": "Ravana was killed by Rama.",
     "as": "Ravana was killed by Rama."
    },
    {
     "en": "Rama is killing Ravana.",
     "as": "Rama is killing Ravana."
    },
    {
     "en": "Rama will kill Ravana.",
     "as": "Rama will kill Ravana."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "In a passive sentence the subject receives the action.",
    "as": "কৰ্মবাচ্যৰ বাক্যত কৰ্তাই ক্ৰিয়া গ্ৰহণ কৰে।"
   }
  }
 ],
 "word-formation-dictionary": [
  {
   "id": "word-formation-dictionary-001",
   "q": {
    "en": "Which word can be formed from the letters of 'TEACHER'?",
    "as": "'TEACHER' ৰ আখৰৰ পৰা কোনটো শব্দ গঠন কৰিব পাৰি?"
   },
   "options": [
    {
     "en": "CHEAT",
     "as": "CHEAT"
    },
    {
     "en": "MOUSE",
     "as": "MOUSE"
    },
    {
     "en": "TABLE",
     "as": "TABLE"
    },
    {
     "en": "CHAIR",
     "as": "CHAIR"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CHEAT can be formed from the letters of TEACHER.",
    "as": "TEACHER ৰ আখৰৰ পৰা CHEAT গঠন কৰিব পাৰি।"
   }
  },
  {
   "id": "word-formation-dictionary-002",
   "q": {
    "en": "Arrange in dictionary order: Cat, Car, Cap, Can",
    "as": "অভিধানৰ ক্ৰমত সজাওক: Cat, Car, Cap, Can"
   },
   "options": [
    {
     "en": "Can, Cap, Car, Cat",
     "as": "Can, Cap, Car, Cat"
    },
    {
     "en": "Cap, Can, Car, Cat",
     "as": "Cap, Can, Car, Cat"
    },
    {
     "en": "Car, Can, Cap, Cat",
     "as": "Car, Can, Cap, Cat"
    },
    {
     "en": "Cat, Car, Cap, Can",
     "as": "Cat, Car, Cap, Can"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Comparing the third letters n, p, r, t gives Can, Cap, Car, Cat.",
    "as": "তৃতীয় আখৰ n, p, r, t তুলনা কৰিলে Can, Cap, Car, Cat পোৱা যায়।"
   }
  },
  {
   "id": "word-formation-dictionary-003",
   "q": {
    "en": "Which word can be formed from the letters of 'NATION'?",
    "as": "'NATION' ৰ আখৰৰ পৰা কোনটো শব্দ গঠন কৰিব পাৰি?"
   },
   "options": [
    {
     "en": "NOTE",
     "as": "NOTE"
    },
    {
     "en": "BREAD",
     "as": "BREAD"
    },
    {
     "en": "TABLE",
     "as": "TABLE"
    },
    {
     "en": "CHAIR",
     "as": "CHAIR"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "NOTE can be formed from the letters of NATION.",
    "as": "NATION ৰ আখৰৰ পৰা NOTE গঠন কৰিব পাৰি।"
   }
  },
  {
   "id": "word-formation-dictionary-004",
   "q": {
    "en": "Arrange in dictionary order: Ball, Bell, Bill, Bull",
    "as": "অভিধানৰ ক্ৰমত সজাওক: Ball, Bell, Bill, Bull"
   },
   "options": [
    {
     "en": "Ball, Bell, Bill, Bull",
     "as": "Ball, Bell, Bill, Bull"
    },
    {
     "en": "Ball, Bill, Bell, Bull",
     "as": "Ball, Bill, Bell, Bull"
    },
    {
     "en": "Bell, Ball, Bill, Bull",
     "as": "Bell, Ball, Bill, Bull"
    },
    {
     "en": "Bull, Bill, Bell, Ball",
     "as": "Bull, Bill, Bell, Ball"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Comparing the second letters a, e, i, u gives Ball, Bell, Bill, Bull.",
    "as": "দ্বিতীয় আখৰ a, e, i, u তুলনা কৰিলে Ball, Bell, Bill, Bull পোৱা যায়।"
   }
  }
 ],
 "yandabo-british-rule": [
  {
   "id": "yandabo-british-rule-001",
   "q": {
    "en": "When was the Treaty of Yandabo signed?",
    "as": "য়াণ্ডাবু সন্ধি কেতিয়া স্বাক্ষৰিত হৈছিল?"
   },
   "options": [
    {
     "en": "24 February 1826",
     "as": "২৪ ফেব্ৰুৱাৰী ১৮২৬"
    },
    {
     "en": "24 February 1824",
     "as": "২৪ ফেব্ৰুৱাৰী ১৮২৪"
    },
    {
     "en": "24 March 1826",
     "as": "২৪ মাৰ্চ ১৮২৬"
    },
    {
     "en": "24 February 1836",
     "as": "২৪ ফেব্ৰুৱাৰী ১৮৩৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The Treaty of Yandabo was signed on 24 February 1826.",
    "as": "য়াণ্ডাবু সন্ধি ১৮২৬ চনৰ ২৪ ফেব্ৰুৱাৰীত স্বাক্ষৰিত হৈছিল।"
   }
  },
  {
   "id": "yandabo-british-rule-002",
   "q": {
    "en": "The Treaty of Yandabo was signed in —",
    "as": "য়াণ্ডাবু সন্ধি স্বাক্ষৰিত হৈছিল —"
   },
   "options": [
    {
     "en": "1824",
     "as": "১৮২৪"
    },
    {
     "en": "1826",
     "as": "১৮২৬"
    },
    {
     "en": "1828",
     "as": "১৮২৮"
    },
    {
     "en": "1836",
     "as": "১৮৩৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The Treaty of Yandabo was signed on 24 February 1826, ending the First Anglo-Burmese War.",
    "as": "১৮২৬ চনৰ ২৪ ফেব্ৰুৱাৰীত য়াণ্ডাবু সন্ধি স্বাক্ষৰিত হৈছিল, যিয়ে প্ৰথম ইংৰাজ-বাৰ্মা যুদ্ধৰ অন্ত পেলাইছিল।"
   }
  },
  {
   "id": "yandabo-british-rule-003",
   "q": {
    "en": "In which year did Assam become a separate Chief Commissioner's province?",
    "as": "কোন বছৰত অসম সুকীয়া মুখ্য আয়ুক্তৰ প্ৰদেশ হৈছিল?"
   },
   "options": [
    {
     "en": "1826",
     "as": "১৮২৬"
    },
    {
     "en": "1854",
     "as": "১৮৫৪"
    },
    {
     "en": "1874",
     "as": "১৮৭৪"
    },
    {
     "en": "1905",
     "as": "১৯০৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Assam became a separate Chief Commissioner's province in 1874.",
    "as": "১৮৭৪ চনত অসম সুকীয়া মুখ্য আয়ুক্তৰ প্ৰদেশ হয়।"
   }
  },
  {
   "id": "yandabo-british-rule-004",
   "q": {
    "en": "Which industry did the British introduce in Assam on a large scale?",
    "as": "ব্ৰিটিছে অসমত ডাঙৰ পৰিসৰত কোন উদ্যোগ আৰম্ভ কৰিছিল?"
   },
   "options": [
    {
     "en": "Tea plantations",
     "as": "চাহ বাগিচা"
    },
    {
     "en": "Steel plants",
     "as": "ইস্পাত কাৰখানা"
    },
    {
     "en": "Cotton mills",
     "as": "কপাহ মিল"
    },
    {
     "en": "Shipbuilding",
     "as": "জাহাজ নিৰ্মাণ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The British introduced large-scale tea plantations in Assam.",
    "as": "ব্ৰিটিছে অসমত ডাঙৰ পৰিসৰত চাহ বাগিচা আৰম্ভ কৰিছিল।"
   }
  }
 ]
};
