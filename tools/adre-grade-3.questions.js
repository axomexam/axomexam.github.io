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
    "en": "The average of 5, 10, 15 and 20 is —",
    "as": "5, 10, 15 আৰু 20 ৰ গড় —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12.5",
     "as": "১২.৫"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "17.5",
     "as": "১৭.৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Sum = 50 and there are 4 values, so 50 / 4 = 12.5.",
    "as": "সমষ্টি = 50 আৰু 4 টা মান, গতিকে 50 / 4 = 12.5।"
   }
  },
  {
   "id": "average-002",
   "q": {
    "en": "The average of 12, 18, 24, 30 and 36 is —",
    "as": "12, 18, 24, 30 আৰু 36 ৰ গড় —"
   },
   "options": [
    {
     "en": "22",
     "as": "২২"
    },
    {
     "en": "26",
     "as": "২৬"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Sum = 120 and there are 5 values, so 120 / 5 = 24.",
    "as": "সমষ্টি = 120 আৰু 5 টা মান, গতিকে 120 / 5 = 24।"
   }
  },
  {
   "id": "average-003",
   "q": {
    "en": "The average of the first 10 natural numbers is —",
    "as": "প্ৰথম 10 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "5.5",
     "as": "৫.৫"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The average of the first n natural numbers is (n + 1)/2 = 5.5.",
    "as": "প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ গড় (n + 1)/2 = 5.5।"
   }
  },
  {
   "id": "average-004",
   "q": {
    "en": "The average of the first 20 natural numbers is —",
    "as": "প্ৰথম 20 টা স্বাভাৱিক সংখ্যাৰ গড় —"
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
     "en": "11",
     "as": "১১"
    },
    {
     "en": "10.5",
     "as": "১০.৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "(20 + 1)/2 = 10.5.",
    "as": "(20 + 1)/2 = 10.5।"
   }
  },
  {
   "id": "average-005",
   "q": {
    "en": "The average of the first 10 even numbers is —",
    "as": "প্ৰথম 10 টা যুগ্ম সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "13",
     "as": "১৩"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The average of the first n even numbers is n + 1 = 11.",
    "as": "প্ৰথম n টা যুগ্ম সংখ্যাৰ গড় n + 1 = 11।"
   }
  },
  {
   "id": "average-006",
   "q": {
    "en": "The average of the first 10 odd numbers is —",
    "as": "প্ৰথম 10 টা অযুগ্ম সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The average of the first n odd numbers is n = 10.",
    "as": "প্ৰথম n টা অযুগ্ম সংখ্যাৰ গড় n = 10।"
   }
  },
  {
   "id": "average-007",
   "q": {
    "en": "The average of 2, 4, 6, 8 and 10 is —",
    "as": "2, 4, 6, 8 আৰু 10 ৰ গড় —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Sum = 30 and there are 5 values, so 30 / 5 = 6.",
    "as": "সমষ্টি = 30 আৰু 5 টা মান, গতিকে 30 / 5 = 6।"
   }
  },
  {
   "id": "average-008",
   "q": {
    "en": "The average of 4 numbers is 15. If one number is 12, the average of the other three is —",
    "as": "4 টা সংখ্যাৰ গড় 15। এটা 12 হ'লে বাকী তিনিটাৰ গড় —"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "17",
     "as": "১৭"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 60; removing 12 leaves 48, and 48 / 3 = 16.",
    "as": "মুঠ = 60; 12 বাদ দিলে 48, আৰু 48 / 3 = 16।"
   }
  },
  {
   "id": "average-009",
   "q": {
    "en": "The average of 5 numbers is 20. If one number is 40, the average of the remaining four is —",
    "as": "5 টা সংখ্যাৰ গড় 20। এটা 40 হ'লে বাকী চাৰিটাৰ গড় —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "25",
     "as": "২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 100; removing 40 leaves 60, and 60 / 4 = 15.",
    "as": "মুঠ = 100; 40 বাদ দিলে 60, আৰু 60 / 4 = 15।"
   }
  },
  {
   "id": "average-010",
   "q": {
    "en": "If every value in a set is increased by 5, the average —",
    "as": "এটা গোটৰ প্ৰতিটো মান 5 ৰে বঢ়ালে গড় —"
   },
   "options": [
    {
     "en": "decreases by 5",
     "as": "৫ ৰে কমে"
    },
    {
     "en": "increases by 5",
     "as": "৫ ৰে বাঢ়ে"
    },
    {
     "en": "stays the same",
     "as": "একে থাকে"
    },
    {
     "en": "doubles",
     "as": "দুগুণ হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Adding a constant to every value increases the average by the same constant.",
    "as": "প্ৰতিটো মানত এটা স্থিৰ ৰাশি যোগ কৰিলে গড়ো সেই ৰাশিৰে বাঢ়ে।"
   }
  },
  {
   "id": "average-011",
   "q": {
    "en": "If every value in a set is multiplied by 3, the average —",
    "as": "এটা গোটৰ প্ৰতিটো মান 3 ৰে পূৰণ কৰিলে গড় —"
   },
   "options": [
    {
     "en": "is multiplied by 3",
     "as": "৩ ৰে পূৰণ হয়"
    },
    {
     "en": "increases by 3",
     "as": "৩ ৰে বাঢ়ে"
    },
    {
     "en": "stays the same",
     "as": "একে থাকে"
    },
    {
     "en": "is divided by 3",
     "as": "৩ ৰে ভাগ হয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Scaling every value scales the average by the same factor.",
    "as": "প্ৰতিটো মান স্কেল কৰিলে গড়ো একেই গুণকৰে স্কেল হয়।"
   }
  },
  {
   "id": "average-012",
   "q": {
    "en": "The average of 10 numbers is 25. If each number is decreased by 4, the new average is —",
    "as": "10 টা সংখ্যাৰ গড় 25। প্ৰতিটো সংখ্যা 4 ৰে কমালে নতুন গড় —"
   },
   "options": [
    {
     "en": "19",
     "as": "১৯"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "29",
     "as": "২৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "25 - 4 = 21.",
    "as": "25 - 4 = 21।"
   }
  },
  {
   "id": "average-013",
   "q": {
    "en": "The average age of 5 students is 12 years. The total age is —",
    "as": "5 জন ছাত্ৰৰ গড় বয়স 12 বছৰ। মুঠ বয়স —"
   },
   "options": [
    {
     "en": "60 years",
     "as": "৬০ বছৰ"
    },
    {
     "en": "58 years",
     "as": "৫৮ বছৰ"
    },
    {
     "en": "55 years",
     "as": "৫৫ বছৰ"
    },
    {
     "en": "65 years",
     "as": "৬৫ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 12 x 5 = 60 years.",
    "as": "মুঠ = 12 x 5 = 60 বছৰ।"
   }
  },
  {
   "id": "average-014",
   "q": {
    "en": "The average age of a family of 4 members is 25 years. If a member of 20 years leaves, the new average is —",
    "as": "4 জনীয়া এটা পৰিয়ালৰ গড় বয়স 25 বছৰ। 20 বছৰীয়া এজন সদস্য আঁতৰি গ'লে নতুন গড় —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "26.67",
     "as": "২৬.৬৭"
    },
    {
     "en": "27",
     "as": "২৭"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 100; removing 20 leaves 80, and 80 / 3 = 26.67.",
    "as": "মুঠ = 100; 20 বাদ দিলে 80, আৰু 80 / 3 = 26.67।"
   }
  },
  {
   "id": "average-015",
   "q": {
    "en": "The average of 15, 25, 35 and 45 is —",
    "as": "15, 25, 35 আৰু 45 ৰ গড় —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "28",
     "as": "২৮"
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
    "en": "Sum = 120 and there are 4 values, so 120 / 4 = 30.",
    "as": "সমষ্টি = 120 আৰু 4 টা মান, গতিকে 120 / 4 = 30।"
   }
  },
  {
   "id": "average-016",
   "q": {
    "en": "The average of the numbers 1, 2, 3, ..., 50 is —",
    "as": "1, 2, 3, ..., 50 সংখ্যাবোৰৰ গড় —"
   },
   "options": [
    {
     "en": "25.5",
     "as": "২৫.৫"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "24.5",
     "as": "২৪.৫"
    },
    {
     "en": "26",
     "as": "২৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "(50 + 1)/2 = 25.5.",
    "as": "(50 + 1)/2 = 25.5।"
   }
  },
  {
   "id": "average-017",
   "q": {
    "en": "The average of the squares of the first 5 natural numbers is —",
    "as": "প্ৰথম 5 টা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ গড় —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Squares are 1, 4, 9, 16, 25; sum = 55 and 55 / 5 = 11.",
    "as": "বৰ্গবোৰ 1, 4, 9, 16, 25; সমষ্টি = 55 আৰু 55 / 5 = 11।"
   }
  },
  {
   "id": "average-018",
   "q": {
    "en": "The average of three numbers is 18. If two of them are 15 and 21, the third is —",
    "as": "তিনিটা সংখ্যাৰ গড় 18। দুটা 15 আৰু 21 হ'লে তৃতীয়টো —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "20",
     "as": "২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 54 and 15 + 21 = 36, so the third is 18.",
    "as": "মুঠ = 54 আৰু 15 + 21 = 36, গতিকে তৃতীয়টো 18।"
   }
  },
  {
   "id": "average-019",
   "q": {
    "en": "The average weight of 8 students is 45 kg. If the weight of one student is 52 kg, the average of the rest is —",
    "as": "8 জন ছাত্ৰৰ গড় ওজন 45 কেজি। এজন ছাত্ৰৰ ওজন 52 কেজি হ'লে বাকীবোৰৰ গড় —"
   },
   "options": [
    {
     "en": "43 kg",
     "as": "৪৩ কেজি"
    },
    {
     "en": "44 kg",
     "as": "৪৪ কেজি"
    },
    {
     "en": "45 kg",
     "as": "৪৫ কেজি"
    },
    {
     "en": "46 kg",
     "as": "৪৬ কেজি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 360; removing 52 leaves 308, and 308 / 7 = 44 kg.",
    "as": "মুঠ = 360; 52 বাদ দিলে 308, আৰু 308 / 7 = 44 কেজি।"
   }
  },
  {
   "id": "average-020",
   "q": {
    "en": "The average of 6 numbers is 30. If the average of the first three is 24, the average of the remaining three is —",
    "as": "6 টা সংখ্যাৰ গড় 30। প্ৰথম তিনিটাৰ গড় 24 হ'লে বাকী তিনিটাৰ গড় —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "39",
     "as": "৩৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 180 and the first three sum to 72, so the rest average 108 / 3 = 36.",
    "as": "মুঠ = 180 আৰু প্ৰথম তিনিটাৰ সমষ্টি 72, গতিকে বাকীবোৰৰ গড় 108 / 3 = 36।"
   }
  },
  {
   "id": "average-021",
   "q": {
    "en": "The average of 11 results is 60. If the average of the first six is 55, the average of the last five is —",
    "as": "11 টা ফলাফলৰ গড় 60। প্ৰথম ছয়টাৰ গড় 55 হ'লে শেষৰ পাঁচটাৰ গড় —"
   },
   "options": [
    {
     "en": "62",
     "as": "৬২"
    },
    {
     "en": "66",
     "as": "৬৬"
    },
    {
     "en": "64",
     "as": "৬৪"
    },
    {
     "en": "68",
     "as": "৬৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 660 and the first six sum to 330, so the rest average 330 / 5 = 66.",
    "as": "মুঠ = 660 আৰু প্ৰথম ছয়টাৰ সমষ্টি 330, গতিকে বাকীবোৰৰ গড় 330 / 5 = 66।"
   }
  },
  {
   "id": "average-022",
   "q": {
    "en": "The average of 7 numbers is 35. A number 49 is added. The new average is —",
    "as": "7 টা সংখ্যাৰ গড় 35। এটা 49 যোগ কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "37",
     "as": "৩৭"
    },
    {
     "en": "36.75",
     "as": "৩৬.৭৫"
    },
    {
     "en": "37.5",
     "as": "৩৭.৫"
    },
    {
     "en": "38",
     "as": "৩৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 245; adding 49 gives 294 and 294 / 8 = 36.75.",
    "as": "মুঠ = 245; 49 যোগ কৰিলে 294 আৰু 294 / 8 = 36.75।"
   }
  },
  {
   "id": "average-023",
   "q": {
    "en": "The average of 4 numbers is 25. If the number 100 is added, the new average is —",
    "as": "4 টা সংখ্যাৰ গড় 25। 100 সংখ্যাটো যোগ কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 100; adding 100 gives 200 and 200 / 5 = 40.",
    "as": "মুঠ = 100; 100 যোগ কৰিলে 200 আৰু 200 / 5 = 40।"
   }
  },
  {
   "id": "average-024",
   "q": {
    "en": "The average of a batsman in 10 innings is 45. He scores 90 in the next innings. The new average is —",
    "as": "এজন বেটছমেনৰ 10 ইনিংছত গড় 45। পৰৱৰ্তী ইনিংছত 90 ৰান কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "49",
     "as": "৪৯"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "49.09",
     "as": "৪৯.০৯"
    },
    {
     "en": "51",
     "as": "৫১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 450; adding 90 gives 540 and 540 / 11 = 49.09.",
    "as": "মুঠ = 450; 90 যোগ কৰিলে 540 আৰু 540 / 11 = 49.09।"
   }
  },
  {
   "id": "average-025",
   "q": {
    "en": "The average of the first 5 multiples of 5 is —",
    "as": "5 ৰ প্ৰথম 5 টা গুণিতকৰ গড় —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12.5",
     "as": "১২.৫"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "17.5",
     "as": "১৭.৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "They are 5, 10, 15, 20, 25; sum = 75 and 75 / 5 = 15.",
    "as": "সেইবোৰ 5, 10, 15, 20, 25; সমষ্টি = 75 আৰু 75 / 5 = 15।"
   }
  },
  {
   "id": "average-026",
   "q": {
    "en": "The average of the first 4 multiples of 6 is —",
    "as": "6 ৰ প্ৰথম 4 টা গুণিতকৰ গড় —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "21",
     "as": "২১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "They are 6, 12, 18, 24; sum = 60 and 60 / 4 = 15.",
    "as": "সেইবোৰ 6, 12, 18, 24; সমষ্টি = 60 আৰু 60 / 4 = 15।"
   }
  },
  {
   "id": "average-027",
   "q": {
    "en": "The average of a set of numbers is 40. If each number is increased by 20% the new average is —",
    "as": "কেইটামান সংখ্যাৰ গড় 40। প্ৰতিটো সংখ্যা 20% বঢ়ালে নতুন গড় —"
   },
   "options": [
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "46",
     "as": "৪৬"
    },
    {
     "en": "44",
     "as": "৪৪"
    },
    {
     "en": "50",
     "as": "৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "40 x 1.2 = 48.",
    "as": "40 x 1.2 = 48।"
   }
  },
  {
   "id": "average-028",
   "q": {
    "en": "The average of 20 numbers is 15. If each is reduced by 5, the new average is —",
    "as": "20 টা সংখ্যাৰ গড় 15। প্ৰতিটো 5 ৰে কমালে নতুন গড় —"
   },
   "options": [
    {
     "en": "13",
     "as": "১৩"
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
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "15 - 5 = 10.",
    "as": "15 - 5 = 10।"
   }
  },
  {
   "id": "average-029",
   "q": {
    "en": "The average of 5 consecutive natural numbers is 12. The largest number is —",
    "as": "5 টা ক্ৰমিক স্বাভাৱিক সংখ্যাৰ গড় 12। আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
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
     "en": "17",
     "as": "১৭"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The numbers are 10, 11, 12, 13, 14, so the largest is 14.",
    "as": "সংখ্যাবোৰ 10, 11, 12, 13, 14, গতিকে ডাঙৰটো 14।"
   }
  },
  {
   "id": "average-030",
   "q": {
    "en": "The average of 7 consecutive odd numbers is 15. The smallest number is —",
    "as": "7 টা ক্ৰমিক অযুগ্ম সংখ্যাৰ গড় 15। আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The middle number is 15, so the numbers run from 9 to 21.",
    "as": "মাজৰ সংখ্যাটো 15, গতিকে সংখ্যাবোৰ 9 ৰ পৰা 21 লৈ।"
   }
  },
  {
   "id": "average-031",
   "q": {
    "en": "The average of 5 consecutive even numbers is 20. The largest number is —",
    "as": "5 টা ক্ৰমিক যুগ্ম সংখ্যাৰ গড় 20। আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "22",
     "as": "২২"
    },
    {
     "en": "26",
     "as": "২৬"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "28",
     "as": "২৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The numbers are 16, 18, 20, 22, 24.",
    "as": "সংখ্যাবোৰ 16, 18, 20, 22, 24।"
   }
  },
  {
   "id": "average-032",
   "q": {
    "en": "The average of 11 numbers is 50. If the average of the first six is 49 and of the last six is 52, the sixth number is —",
    "as": "11 টা সংখ্যাৰ গড় 50। প্ৰথম ছয়টাৰ গড় 49 আৰু শেষৰ ছয়টাৰ গড় 52 হ'লে ষষ্ঠ সংখ্যাটো —"
   },
   "options": [
    {
     "en": "54",
     "as": "৫৪"
    },
    {
     "en": "55",
     "as": "৫৫"
    },
    {
     "en": "56",
     "as": "৫৬"
    },
    {
     "en": "57",
     "as": "৫৭"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Sixth = (6 x 49) + (6 x 52) - (11 x 50) = 294 + 312 - 550 = 56.",
    "as": "ষষ্ঠ = (6 x 49) + (6 x 52) - (11 x 50) = 294 + 312 - 550 = 56।"
   }
  },
  {
   "id": "average-033",
   "q": {
    "en": "The average of a class of 30 students is 14 years. If the teacher's age is included, the average becomes 15 years. The teacher's age is —",
    "as": "30 জনীয়া এটা শ্ৰেণীৰ গড় বয়স 14 বছৰ। শিক্ষকৰ বয়স ধৰিলে গড় 15 বছৰ হয়। শিক্ষকৰ বয়স —"
   },
   "options": [
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "42 years",
     "as": "৪২ বছৰ"
    },
    {
     "en": "48 years",
     "as": "৪৮ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Teacher = (31 x 15) - (30 x 14) = 465 - 420 = 45 years.",
    "as": "শিক্ষক = (31 x 15) - (30 x 14) = 465 - 420 = 45 বছৰ।"
   }
  },
  {
   "id": "average-034",
   "q": {
    "en": "The average age of 10 students is 15 years. When the age of the teacher is added, the average becomes 17 years. The age of the teacher is —",
    "as": "10 জন ছাত্ৰৰ গড় বয়স 15 বছৰ। শিক্ষকৰ বয়স যোগ কৰিলে গড় 17 বছৰ হয়। শিক্ষকৰ বয়স —"
   },
   "options": [
    {
     "en": "37 years",
     "as": "৩৭ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "39 years",
     "as": "৩৯ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Teacher = (11 x 17) - (10 x 15) = 187 - 150 = 37 years.",
    "as": "শিক্ষক = (11 x 17) - (10 x 15) = 187 - 150 = 37 বছৰ।"
   }
  },
  {
   "id": "average-035",
   "q": {
    "en": "The average of 25 observations is 36. If the average of the first 13 is 32 and of the last 13 is 39, the 13th observation is —",
    "as": "25 টা পৰ্যবেক্ষণৰ গড় 36। প্ৰথম 13 টাৰ গড় 32 আৰু শেষৰ 13 টাৰ গড় 39 হ'লে 13 তম পৰ্যবেক্ষণ —"
   },
   "options": [
    {
     "en": "23",
     "as": "২৩"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "27",
     "as": "২৭"
    },
    {
     "en": "29",
     "as": "২৯"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "13th = (13 x 32) + (13 x 39) - (25 x 36) = 416 + 507 - 900 = 23.",
    "as": "13 তম = (13 x 32) + (13 x 39) - (25 x 36) = 416 + 507 - 900 = 23।"
   }
  },
  {
   "id": "average-036",
   "q": {
    "en": "The average of 6 numbers is 20. If one number is removed, the average becomes 18. The removed number is —",
    "as": "6 টা সংখ্যাৰ গড় 20। এটা সংখ্যা আঁতৰালে গড় 18 হয়। আঁতৰোৱা সংখ্যাটো —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Removed = (6 x 20) - (5 x 18) = 120 - 90 = 30.",
    "as": "আঁতৰোৱা = (6 x 20) - (5 x 18) = 120 - 90 = 30।"
   }
  },
  {
   "id": "average-037",
   "q": {
    "en": "The average of the ages of a father and his son is 35 years. If the father is 50 years old, the son's age is —",
    "as": "এজন পিতৃ আৰু তেওঁৰ পুত্ৰৰ বয়সৰ গড় 35 বছৰ। পিতৃৰ বয়স 50 হ'লে পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 70 and the son is 70 - 50 = 20 years.",
    "as": "মুঠ = 70 আৰু পুত্ৰ 70 - 50 = 20 বছৰ।"
   }
  },
  {
   "id": "average-038",
   "q": {
    "en": "The average of three numbers is 45. If two numbers are 40 and 50, the third is —",
    "as": "তিনিটা সংখ্যাৰ গড় 45। দুটা 40 আৰু 50 হ'লে তৃতীয়টো —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "55",
     "as": "৫৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 135 and 40 + 50 = 90, so the third is 45.",
    "as": "মুঠ = 135 আৰু 40 + 50 = 90, গতিকে তৃতীয়টো 45।"
   }
  },
  {
   "id": "average-039",
   "q": {
    "en": "The average marks of 40 students is 65. The average marks of 25 boys is 60. The average marks of the girls is —",
    "as": "40 জন ছাত্ৰৰ গড় নম্বৰ 65। 25 জন ল'ৰাৰ গড় 60 হ'লে ছোৱালীৰ গড় —"
   },
   "options": [
    {
     "en": "73.33",
     "as": "৭৩.৩৩"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "70",
     "as": "৭০"
    },
    {
     "en": "75",
     "as": "৭৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Girls = 15; total 2600 and boys 1500, so girls average 1100 / 15 = 73.33.",
    "as": "ছোৱালী = 15; মুঠ 2600 আৰু ল'ৰা 1500, গতিকে ছোৱালীৰ গড় 1100 / 15 = 73.33।"
   }
  },
  {
   "id": "average-040",
   "q": {
    "en": "The average of 100 numbers is 40. If one number 40 is replaced by 100, the new average is —",
    "as": "100 টা সংখ্যাৰ গড় 40। এটা 40 ক 100 ৰে সলনি কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "40.4",
     "as": "৪০.৪"
    },
    {
     "en": "40.8",
     "as": "৪০.৮"
    },
    {
     "en": "40.6",
     "as": "৪০.৬"
    },
    {
     "en": "41",
     "as": "৪১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Increase = 60 over 100 numbers, so the new average is 40 + 0.6 = 40.6.",
    "as": "100 টা সংখ্যাত 60 বৃদ্ধি, গতিকে নতুন গড় 40 + 0.6 = 40.6।"
   }
  },
  {
   "id": "average-041",
   "q": {
    "en": "The average of 10 numbers is 30. The average of the first 6 is 28 and of the last 5 is 32. The 6th number is —",
    "as": "10 টা সংখ্যাৰ গড় 30। প্ৰথম 6 টাৰ গড় 28 আৰু শেষৰ 5 টাৰ গড় 32 হ'লে 6 তম সংখ্যাটো —"
   },
   "options": [
    {
     "en": "26",
     "as": "২৬"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "6th = (6 x 28) + (5 x 32) - (10 x 30) = 168 + 160 - 300 = 28.",
    "as": "6 তম = (6 x 28) + (5 x 32) - (10 x 30) = 168 + 160 - 300 = 28।"
   }
  },
  {
   "id": "average-042",
   "q": {
    "en": "The average speed of a car that travels 120 km at 60 km/h and returns at 40 km/h is —",
    "as": "এখন গাড়ী 120 কিমি 60 কিমি/ঘণ্টাত গৈ 40 কিমি/ঘণ্টাত ঘূৰি আহিলে গড় গতি —"
   },
   "options": [
    {
     "en": "48 km/h",
     "as": "৪৮ কিমি/ঘণ্টা"
    },
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "52 km/h",
     "as": "৫২ কিমি/ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Average speed = 2xy/(x+y) = 2 x 60 x 40 / 100 = 48 km/h.",
    "as": "গড় গতি = 2xy/(x+y) = 2 x 60 x 40 / 100 = 48 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "average-043",
   "q": {
    "en": "A man travels the first half of a journey at 30 km/h and the second half at 20 km/h. His average speed is —",
    "as": "এজন মানুহে যাত্ৰাৰ প্ৰথম আধা 30 কিমি/ঘণ্টাত আৰু দ্বিতীয় আধা 20 কিমি/ঘণ্টাত গ'ল। তেওঁৰ গড় গতি —"
   },
   "options": [
    {
     "en": "26 km/h",
     "as": "২৬ কিমি/ঘণ্টা"
    },
    {
     "en": "25 km/h",
     "as": "২৫ কিমি/ঘণ্টা"
    },
    {
     "en": "24 km/h",
     "as": "২৪ কিমি/ঘণ্টা"
    },
    {
     "en": "27 km/h",
     "as": "২৭ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Average speed = 2 x 30 x 20 / 50 = 24 km/h.",
    "as": "গড় গতি = 2 x 30 x 20 / 50 = 24 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "average-044",
   "q": {
    "en": "The average of the first 15 natural numbers is —",
    "as": "প্ৰথম 15 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "7.5",
     "as": "৭.৫"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "8.5",
     "as": "৮.৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "(15 + 1)/2 = 8.",
    "as": "(15 + 1)/2 = 8।"
   }
  },
  {
   "id": "average-045",
   "q": {
    "en": "The average of 8 numbers is 42. If the average of the first four is 40, the average of the rest is —",
    "as": "8 টা সংখ্যাৰ গড় 42। প্ৰথম চাৰিটাৰ গড় 40 হ'লে বাকীবোৰৰ গড় —"
   },
   "options": [
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "43",
     "as": "৪৩"
    },
    {
     "en": "44",
     "as": "৪৪"
    },
    {
     "en": "45",
     "as": "৪৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 336 and the first four sum to 160, so the rest average 176 / 4 = 44.",
    "as": "মুঠ = 336 আৰু প্ৰথম চাৰিটাৰ সমষ্টি 160, গতিকে বাকীবোৰৰ গড় 176 / 4 = 44।"
   }
  },
  {
   "id": "average-046",
   "q": {
    "en": "The average of 5 numbers is 18. If each number is multiplied by 2, the new average is —",
    "as": "5 টা সংখ্যাৰ গড় 18। প্ৰতিটো সংখ্যা 2 ৰে পূৰণ কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "18 x 2 = 36.",
    "as": "18 x 2 = 36।"
   }
  },
  {
   "id": "average-047",
   "q": {
    "en": "The average of the first 6 prime numbers is —",
    "as": "প্ৰথম 6 টা মৌলিক সংখ্যাৰ গড় —"
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
     "en": "6.5",
     "as": "৬.৫"
    },
    {
     "en": "7.5",
     "as": "৭.৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "They are 2, 3, 5, 7, 11, 13; sum = 41 and 41 / 6 ≈ 6.83, nearest option 7.",
    "as": "সেইবোৰ 2, 3, 5, 7, 11, 13; সমষ্টি = 41 আৰু 41 / 6 ≈ 6.83, নিকটতম বিকল্প 7।"
   }
  },
  {
   "id": "average-048",
   "q": {
    "en": "The average of the first 5 composite numbers is —",
    "as": "প্ৰথম 5 টা যৌগিক সংখ্যাৰ গড় —"
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
     "en": "7",
     "as": "৭"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "They are 4, 6, 8, 9, 10; sum = 37 and 37 / 5 = 7.4, nearest option 7.",
    "as": "সেইবোৰ 4, 6, 8, 9, 10; সমষ্টি = 37 আৰু 37 / 5 = 7.4, নিকটতম বিকল্প 7।"
   }
  },
  {
   "id": "average-049",
   "q": {
    "en": "The average of the first 20 multiples of 3 is —",
    "as": "3 ৰ প্ৰথম 20 টা গুণিতকৰ গড় —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "31.5",
     "as": "৩১.৫"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "33",
     "as": "৩৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Average = 3 x (1 + 20)/2 = 3 x 10.5 = 31.5.",
    "as": "গড় = 3 x (1 + 20)/2 = 3 x 10.5 = 31.5।"
   }
  },
  {
   "id": "average-050",
   "q": {
    "en": "The average of 50 numbers is 38. If two numbers 45 and 55 are discarded, the average of the remaining numbers is —",
    "as": "50 টা সংখ্যাৰ গড় 38। 45 আৰু 55 আঁতৰালে বাকী সংখ্যাবোৰৰ গড় —"
   },
   "options": [
    {
     "en": "37",
     "as": "৩৭"
    },
    {
     "en": "38",
     "as": "৩৮"
    },
    {
     "en": "37.5",
     "as": "৩৭.৫"
    },
    {
     "en": "38.5",
     "as": "৩৮.৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 1900; removing 100 leaves 1800 and 1800 / 48 = 37.5.",
    "as": "মুঠ = 1900; 100 বাদ দিলে 1800 আৰু 1800 / 48 = 37.5।"
   }
  },
  {
   "id": "average-051",
   "q": {
    "en": "The average of 9 numbers is 20. The average of the first 5 is 18 and of the last 5 is 22. The 5th number is —",
    "as": "9 টা সংখ্যাৰ গড় 20। প্ৰথম 5 টাৰ গড় 18 আৰু শেষৰ 5 টাৰ গড় 22 হ'লে 5 তম সংখ্যাটো —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "22",
     "as": "২২"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5th = (5 x 18) + (5 x 22) - (9 x 20) = 90 + 110 - 180 = 20.",
    "as": "5 তম = (5 x 18) + (5 x 22) - (9 x 20) = 90 + 110 - 180 = 20।"
   }
  },
  {
   "id": "average-052",
   "q": {
    "en": "The average of the first 12 natural numbers is —",
    "as": "প্ৰথম 12 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "6.5",
     "as": "৬.৫"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "7.5",
     "as": "৭.৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "(12 + 1)/2 = 6.5.",
    "as": "(12 + 1)/2 = 6.5।"
   }
  },
  {
   "id": "average-053",
   "q": {
    "en": "The average of 7 numbers is 40. If the number 56 is added, the new average is —",
    "as": "7 টা সংখ্যাৰ গড় 40। 56 সংখ্যাটো যোগ কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "41",
     "as": "৪১"
    },
    {
     "en": "43",
     "as": "৪৩"
    },
    {
     "en": "44",
     "as": "৪৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 280; adding 56 gives 336 and 336 / 8 = 42.",
    "as": "মুঠ = 280; 56 যোগ কৰিলে 336 আৰু 336 / 8 = 42।"
   }
  },
  {
   "id": "average-054",
   "q": {
    "en": "The average monthly income of a family of 5 members is 8,000. The total monthly income is —",
    "as": "5 জনীয়া এটা পৰিয়ালৰ মাহেকীয়া গড় আয় 8,000। মুঠ মাহেকীয়া আয় —"
   },
   "options": [
    {
     "en": "32,000",
     "as": "৩২,০০০"
    },
    {
     "en": "35,000",
     "as": "৩৫,০০০"
    },
    {
     "en": "40,000",
     "as": "৪০,০০০"
    },
    {
     "en": "45,000",
     "as": "৪৫,০০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 8,000 x 5 = 40,000.",
    "as": "মুঠ = 8,000 x 5 = 40,000।"
   }
  },
  {
   "id": "average-055",
   "q": {
    "en": "The average of the first 25 natural numbers is —",
    "as": "প্ৰথম 25 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "12.5",
     "as": "১২.৫"
    },
    {
     "en": "13.5",
     "as": "১৩.৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "(25 + 1)/2 = 13.",
    "as": "(25 + 1)/2 = 13।"
   }
  },
  {
   "id": "average-056",
   "q": {
    "en": "The average of 4 numbers is 30. If a 5th number is added and the average becomes 32, the 5th number is —",
    "as": "4 টা সংখ্যাৰ গড় 30। 5 তম সংখ্যা যোগ কৰি গড় 32 হ'লে 5 তম সংখ্যাটো —"
   },
   "options": [
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "38",
     "as": "৩৮"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "42",
     "as": "৪২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5th = (5 x 32) - (4 x 30) = 160 - 120 = 40.",
    "as": "5 তম = (5 x 32) - (4 x 30) = 160 - 120 = 40।"
   }
  },
  {
   "id": "average-057",
   "q": {
    "en": "The average of 5 consecutive numbers is 27. The smallest number is —",
    "as": "5 টা ক্ৰমিক সংখ্যাৰ গড় 27। আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "23",
     "as": "২৩"
    },
    {
     "en": "25",
     "as": "২৫"
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
   "correct": 1,
   "explanation": {
    "en": "The numbers are 25, 26, 27, 28, 29.",
    "as": "সংখ্যাবোৰ 25, 26, 27, 28, 29।"
   }
  },
  {
   "id": "average-058",
   "q": {
    "en": "The average of 11 consecutive numbers is 50. The largest number is —",
    "as": "11 টা ক্ৰমিক সংখ্যাৰ গড় 50। আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "55",
     "as": "৫৫"
    },
    {
     "en": "56",
     "as": "৫৬"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "61",
     "as": "৬১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The numbers run from 45 to 55, so the largest is 55.",
    "as": "সংখ্যাবোৰ 45 ৰ পৰা 55 লৈ, গতিকে ডাঙৰটো 55।"
   }
  },
  {
   "id": "average-059",
   "q": {
    "en": "The average of a group of 12 numbers is 45. If two numbers 30 and 60 are removed, the average of the rest is —",
    "as": "12 টা সংখ্যাৰ এটা গোটৰ গড় 45। 30 আৰু 60 আঁতৰালে বাকীবোৰৰ গড় —"
   },
   "options": [
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "43",
     "as": "৪৩"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "48",
     "as": "৪৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 540; removing 90 leaves 450 and 450 / 10 = 45.",
    "as": "মুঠ = 540; 90 বাদ দিলে 450 আৰু 450 / 10 = 45।"
   }
  },
  {
   "id": "average-060",
   "q": {
    "en": "The average of 30 numbers is 24. If one number 75 is replaced by 45, the new average is —",
    "as": "30 টা সংখ্যাৰ গড় 24। এটা 75 ক 45 ৰে সলনি কৰিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "23.5",
     "as": "২৩.৫"
    },
    {
     "en": "23",
     "as": "২৩"
    },
    {
     "en": "24.5",
     "as": "২৪.৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Decrease = 30 over 30 numbers, so the new average is 24 - 1 = 23.",
    "as": "30 টা সংখ্যাত 30 হ্ৰাস, গতিকে নতুন গড় 24 - 1 = 23।"
   }
  },
  {
   "id": "average-061",
   "q": {
    "en": "The average of 9 numbers is 12. If the average of the first five is 10, the average of the last four is —",
    "as": "9 টা সংখ্যাৰ গড় 12। প্ৰথম পাঁচটাৰ গড় 10 হ'লে শেষৰ চাৰিটাৰ গড় —"
   },
   "options": [
    {
     "en": "14.5",
     "as": "১৪.৫"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 108 and the first five sum to 50, so the rest average 58 / 4 = 14.5.",
    "as": "মুঠ = 108 আৰু প্ৰথম পাঁচটাৰ সমষ্টি 50, গতিকে বাকীবোৰৰ গড় 58 / 4 = 14.5।"
   }
  },
  {
   "id": "average-062",
   "q": {
    "en": "The average of 6 numbers is 50. The average of the first three is 45 and of the last four is 52. The third number is —",
    "as": "6 টা সংখ্যাৰ গড় 50। প্ৰথম তিনিটাৰ গড় 45 আৰু শেষৰ চাৰিটাৰ গড় 52 হ'লে তৃতীয় সংখ্যাটো —"
   },
   "options": [
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "43",
     "as": "৪৩"
    },
    {
     "en": "47",
     "as": "৪৭"
    },
    {
     "en": "48",
     "as": "৪৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Third = (3 x 45) + (4 x 52) - (6 x 50) = 135 + 208 - 300 = 43.",
    "as": "তৃতীয় = (3 x 45) + (4 x 52) - (6 x 50) = 135 + 208 - 300 = 43।"
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
    "en": "The area of a square of side 12 m is —",
    "as": "12 মিটাৰ বাহুৰ বৰ্গৰ কালি —"
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
     "en": "144 sq m",
     "as": "১৪৪ sq m"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = side x side = 12 x 12 = 144 sq m.",
    "as": "কালি = বাহু x বাহু = 12 x 12 = 144 sq m।"
   }
  },
  {
   "id": "basic-mensuration-002",
   "q": {
    "en": "The area of a square of side 15 m is —",
    "as": "15 মিটাৰ বাহুৰ বৰ্গৰ কালি —"
   },
   "options": [
    {
     "en": "240 sq m",
     "as": "২৪০ sq m"
    },
    {
     "en": "215 sq m",
     "as": "২১৫ sq m"
    },
    {
     "en": "230 sq m",
     "as": "২৩০ sq m"
    },
    {
     "en": "225 sq m",
     "as": "২২৫ sq m"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 15 x 15 = 225 sq m.",
    "as": "কালি = 15 x 15 = 225 sq m।"
   }
  },
  {
   "id": "basic-mensuration-003",
   "q": {
    "en": "The perimeter of a square of side 9 m is —",
    "as": "9 মিটাৰ বাহুৰ বৰ্গৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "36 m",
     "as": "৩৬ m"
    },
    {
     "en": "27 m",
     "as": "২৭ m"
    },
    {
     "en": "45 m",
     "as": "৪৫ m"
    },
    {
     "en": "81 m",
     "as": "৮১ m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Perimeter = 4 x side = 36 m.",
    "as": "পৰিসীমা = 4 x বাহু = 36 m।"
   }
  },
  {
   "id": "basic-mensuration-004",
   "q": {
    "en": "The perimeter of a square of side 14 cm is —",
    "as": "14 চেমি বাহুৰ বৰ্গৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "48 cm",
     "as": "৪৮ cm"
    },
    {
     "en": "52 cm",
     "as": "৫২ cm"
    },
    {
     "en": "56 cm",
     "as": "৫৬ cm"
    },
    {
     "en": "60 cm",
     "as": "৬০ cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Perimeter = 4 x 14 = 56 cm.",
    "as": "পৰিসীমা = 4 x 14 = 56 cm।"
   }
  },
  {
   "id": "basic-mensuration-005",
   "q": {
    "en": "The area of a rectangle of length 15 m and breadth 8 m is —",
    "as": "15 মিটাৰ দীঘ আৰু 8 মিটাৰ প্ৰস্থৰ আয়তৰ কালি —"
   },
   "options": [
    {
     "en": "120 sq m",
     "as": "১২০ sq m"
    },
    {
     "en": "110 sq m",
     "as": "১১০ sq m"
    },
    {
     "en": "130 sq m",
     "as": "১৩০ sq m"
    },
    {
     "en": "140 sq m",
     "as": "১৪০ sq m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 15 x 8 = 120 sq m.",
    "as": "কালি = 15 x 8 = 120 sq m।"
   }
  },
  {
   "id": "basic-mensuration-006",
   "q": {
    "en": "The area of a rectangle of length 25 m and breadth 12 m is —",
    "as": "25 মিটাৰ দীঘ আৰু 12 মিটাৰ প্ৰস্থৰ আয়তৰ কালি —"
   },
   "options": [
    {
     "en": "300 sq m",
     "as": "৩০০ sq m"
    },
    {
     "en": "290 sq m",
     "as": "২৯০ sq m"
    },
    {
     "en": "280 sq m",
     "as": "২৮০ sq m"
    },
    {
     "en": "310 sq m",
     "as": "৩১০ sq m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 25 x 12 = 300 sq m.",
    "as": "কালি = 25 x 12 = 300 sq m।"
   }
  },
  {
   "id": "basic-mensuration-007",
   "q": {
    "en": "The perimeter of a rectangle of length 20 m and breadth 10 m is —",
    "as": "20 মিটাৰ দীঘ আৰু 10 মিটাৰ প্ৰস্থৰ আয়তৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "50 m",
     "as": "৫০ m"
    },
    {
     "en": "55 m",
     "as": "৫৫ m"
    },
    {
     "en": "70 m",
     "as": "৭০ m"
    },
    {
     "en": "60 m",
     "as": "৬০ m"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Perimeter = 2(l + b) = 2 x 30 = 60 m.",
    "as": "পৰিসীমা = 2(দীঘ + প্ৰস্থ) = 2 x 30 = 60 m।"
   }
  },
  {
   "id": "basic-mensuration-008",
   "q": {
    "en": "The perimeter of a rectangle of length 18 cm and breadth 12 cm is —",
    "as": "18 চেমি দীঘ আৰু 12 চেমি প্ৰস্থৰ আয়তৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "56 cm",
     "as": "৫৬ cm"
    },
    {
     "en": "58 cm",
     "as": "৫৮ cm"
    },
    {
     "en": "64 cm",
     "as": "৬৪ cm"
    },
    {
     "en": "60 cm",
     "as": "৬০ cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Perimeter = 2(18 + 12) = 60 cm.",
    "as": "পৰিসীমা = 2(18 + 12) = 60 cm।"
   }
  },
  {
   "id": "basic-mensuration-009",
   "q": {
    "en": "The area of a triangle with base 12 cm and height 8 cm is —",
    "as": "12 চেমি ভূমি আৰু 8 চেমি উচ্চতাৰ ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "48 sq cm",
     "as": "৪৮ sq cm"
    },
    {
     "en": "40 sq cm",
     "as": "৪০ sq cm"
    },
    {
     "en": "56 sq cm",
     "as": "৫৬ sq cm"
    },
    {
     "en": "96 sq cm",
     "as": "৯৬ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 1/2 x 12 x 8 = 48 sq cm.",
    "as": "কালি = 1/2 x 12 x 8 = 48 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-010",
   "q": {
    "en": "The area of a triangle with base 20 cm and height 15 cm is —",
    "as": "20 চেমি ভূমি আৰু 15 চেমি উচ্চতাৰ ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "150 sq cm",
     "as": "১৫০ sq cm"
    },
    {
     "en": "140 sq cm",
     "as": "১৪০ sq cm"
    },
    {
     "en": "160 sq cm",
     "as": "১৬০ sq cm"
    },
    {
     "en": "300 sq cm",
     "as": "৩০০ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 1/2 x 20 x 15 = 150 sq cm.",
    "as": "কালি = 1/2 x 20 x 15 = 150 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-011",
   "q": {
    "en": "The area of a circle of radius 7 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ কালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "168 sq cm",
     "as": "১৬৮ sq cm"
    },
    {
     "en": "144 sq cm",
     "as": "১৪৪ sq cm"
    },
    {
     "en": "154 sq cm",
     "as": "১৫৪ sq cm"
    },
    {
     "en": "176 sq cm",
     "as": "১৭৬ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = 22/7 x 7 x 7 = 154 sq cm.",
    "as": "কালি = 22/7 x 7 x 7 = 154 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-012",
   "q": {
    "en": "The circumference of a circle of radius 7 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ পৰিধি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "22 cm",
     "as": "২২ cm"
    },
    {
     "en": "49 cm",
     "as": "৪৯ cm"
    },
    {
     "en": "154 cm",
     "as": "১৫৪ cm"
    },
    {
     "en": "44 cm",
     "as": "৪৪ cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Circumference = 2 x 22/7 x 7 = 44 cm.",
    "as": "পৰিধি = 2 x 22/7 x 7 = 44 cm।"
   }
  },
  {
   "id": "basic-mensuration-013",
   "q": {
    "en": "The area of a circle of radius 14 cm (pi = 22/7) is —",
    "as": "14 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ কালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "516 sq cm",
     "as": "৫১৬ sq cm"
    },
    {
     "en": "616 sq cm",
     "as": "৬১৬ sq cm"
    },
    {
     "en": "716 sq cm",
     "as": "৭১৬ sq cm"
    },
    {
     "en": "816 sq cm",
     "as": "৮১৬ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Area = 22/7 x 14 x 14 = 616 sq cm.",
    "as": "কালি = 22/7 x 14 x 14 = 616 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-014",
   "q": {
    "en": "The circumference of a circle of diameter 14 cm (pi = 22/7) is —",
    "as": "14 চেমি ব্যাসৰ বৃত্তৰ পৰিধি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "56 cm",
     "as": "৫৬ cm"
    },
    {
     "en": "48 cm",
     "as": "৪৮ cm"
    },
    {
     "en": "44 cm",
     "as": "৪৪ cm"
    },
    {
     "en": "66 cm",
     "as": "৬৬ cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Circumference = 22/7 x 14 = 44 cm.",
    "as": "পৰিধি = 22/7 x 14 = 44 cm।"
   }
  },
  {
   "id": "basic-mensuration-015",
   "q": {
    "en": "The area of a parallelogram with base 12 cm and height 5 cm is —",
    "as": "12 চেমি ভূমি আৰু 5 চেমি উচ্চতাৰ সমান্তৰাল ভুজৰ কালি —"
   },
   "options": [
    {
     "en": "60 sq cm",
     "as": "৬০ sq cm"
    },
    {
     "en": "40 sq cm",
     "as": "৪০ sq cm"
    },
    {
     "en": "30 sq cm",
     "as": "৩০ sq cm"
    },
    {
     "en": "70 sq cm",
     "as": "৭০ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = base x height = 60 sq cm.",
    "as": "কালি = ভূমি x উচ্চতা = 60 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-016",
   "q": {
    "en": "The area of a parallelogram with base 15 m and height 8 m is —",
    "as": "15 মিটাৰ ভূমি আৰু 8 মিটাৰ উচ্চতাৰ সমান্তৰাল ভুজৰ কালি —"
   },
   "options": [
    {
     "en": "100 sq m",
     "as": "১০০ sq m"
    },
    {
     "en": "110 sq m",
     "as": "১১০ sq m"
    },
    {
     "en": "130 sq m",
     "as": "১৩০ sq m"
    },
    {
     "en": "120 sq m",
     "as": "১২০ sq m"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 15 x 8 = 120 sq m.",
    "as": "কালি = 15 x 8 = 120 sq m।"
   }
  },
  {
   "id": "basic-mensuration-017",
   "q": {
    "en": "The area of a trapezium with parallel sides 10 cm and 6 cm and height 4 cm is —",
    "as": "10 চেমি আৰু 6 চেমি সমান্তৰাল বাহু আৰু 4 চেমি উচ্চতাৰ ট্ৰেপিজিয়ামৰ কালি —"
   },
   "options": [
    {
     "en": "32 sq cm",
     "as": "৩২ sq cm"
    },
    {
     "en": "28 sq cm",
     "as": "২৮ sq cm"
    },
    {
     "en": "24 sq cm",
     "as": "২৪ sq cm"
    },
    {
     "en": "36 sq cm",
     "as": "৩৬ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 1/2 x (10 + 6) x 4 = 32 sq cm.",
    "as": "কালি = 1/2 x (10 + 6) x 4 = 32 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-018",
   "q": {
    "en": "The area of a trapezium with parallel sides 12 cm and 8 cm and height 5 cm is —",
    "as": "12 চেমি আৰু 8 চেমি সমান্তৰাল বাহু আৰু 5 চেমি উচ্চতাৰ ট্ৰেপিজিয়ামৰ কালি —"
   },
   "options": [
    {
     "en": "40 sq cm",
     "as": "৪০ sq cm"
    },
    {
     "en": "50 sq cm",
     "as": "৫০ sq cm"
    },
    {
     "en": "45 sq cm",
     "as": "৪৫ sq cm"
    },
    {
     "en": "55 sq cm",
     "as": "৫৫ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Area = 1/2 x 20 x 5 = 50 sq cm.",
    "as": "কালি = 1/2 x 20 x 5 = 50 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-019",
   "q": {
    "en": "The volume of a cube of side 4 cm is —",
    "as": "4 চেমি বাহুৰ ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "16 cubic cm",
     "as": "১৬ cubic cm"
    },
    {
     "en": "48 cubic cm",
     "as": "৪৮ cubic cm"
    },
    {
     "en": "96 cubic cm",
     "as": "৯৬ cubic cm"
    },
    {
     "en": "64 cubic cm",
     "as": "৬৪ cubic cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Volume = 4 x 4 x 4 = 64 cubic cm.",
    "as": "আয়তন = 4 x 4 x 4 = 64 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-020",
   "q": {
    "en": "The volume of a cube of side 5 cm is —",
    "as": "5 চেমি বাহুৰ ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "125 cubic cm",
     "as": "১২৫ cubic cm"
    },
    {
     "en": "75 cubic cm",
     "as": "৭৫ cubic cm"
    },
    {
     "en": "100 cubic cm",
     "as": "১০০ cubic cm"
    },
    {
     "en": "25 cubic cm",
     "as": "২৫ cubic cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Volume = 125 cubic cm.",
    "as": "আয়তন = 125 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-021",
   "q": {
    "en": "The total surface area of a cube of side 3 cm is —",
    "as": "3 চেমি বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "27 sq cm",
     "as": "২৭ sq cm"
    },
    {
     "en": "54 sq cm",
     "as": "৫৪ sq cm"
    },
    {
     "en": "36 sq cm",
     "as": "৩৬ sq cm"
    },
    {
     "en": "81 sq cm",
     "as": "৮১ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "TSA = 6 x side^2 = 6 x 9 = 54 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 6 x বাহু^2 = 6 x 9 = 54 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-022",
   "q": {
    "en": "The total surface area of a cube of side 6 cm is —",
    "as": "6 চেমি বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "144 sq cm",
     "as": "১৪৪ sq cm"
    },
    {
     "en": "196 sq cm",
     "as": "১৯৬ sq cm"
    },
    {
     "en": "216 sq cm",
     "as": "২১৬ sq cm"
    },
    {
     "en": "256 sq cm",
     "as": "২৫৬ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "TSA = 6 x 36 = 216 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 6 x 36 = 216 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-023",
   "q": {
    "en": "The volume of a cuboid of length 8 cm, breadth 5 cm and height 3 cm is —",
    "as": "8 চেমি দীঘ, 5 চেমি প্ৰস্থ আৰু 3 চেমি উচ্চতাৰ ঘনকীয় বস্তুৰ আয়তন —"
   },
   "options": [
    {
     "en": "100 cubic cm",
     "as": "১০০ cubic cm"
    },
    {
     "en": "120 cubic cm",
     "as": "১২০ cubic cm"
    },
    {
     "en": "110 cubic cm",
     "as": "১১০ cubic cm"
    },
    {
     "en": "130 cubic cm",
     "as": "১৩০ cubic cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Volume = 8 x 5 x 3 = 120 cubic cm.",
    "as": "আয়তন = 8 x 5 x 3 = 120 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-024",
   "q": {
    "en": "The volume of a cuboid of length 10 cm, breadth 6 cm and height 4 cm is —",
    "as": "10 চেমি দীঘ, 6 চেমি প্ৰস্থ আৰু 4 চেমি উচ্চতাৰ ঘনকীয় বস্তুৰ আয়তন —"
   },
   "options": [
    {
     "en": "240 cubic cm",
     "as": "২৪০ cubic cm"
    },
    {
     "en": "220 cubic cm",
     "as": "২২০ cubic cm"
    },
    {
     "en": "200 cubic cm",
     "as": "২০০ cubic cm"
    },
    {
     "en": "260 cubic cm",
     "as": "২৬০ cubic cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Volume = 10 x 6 x 4 = 240 cubic cm.",
    "as": "আয়তন = 10 x 6 x 4 = 240 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-025",
   "q": {
    "en": "The total surface area of a cuboid of length 8 cm, breadth 5 cm and height 4 cm is —",
    "as": "8 চেমি দীঘ, 5 চেমি প্ৰস্থ আৰু 4 চেমি উচ্চতাৰ ঘনকীয় বস্তুৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "164 sq cm",
     "as": "১৬৪ sq cm"
    },
    {
     "en": "184 sq cm",
     "as": "১৮৪ sq cm"
    },
    {
     "en": "174 sq cm",
     "as": "১৭৪ sq cm"
    },
    {
     "en": "194 sq cm",
     "as": "১৯৪ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "TSA = 2(lb + bh + hl) = 2(40 + 20 + 32) = 184 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 2(lb + bh + hl) = 2(40 + 20 + 32) = 184 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-026",
   "q": {
    "en": "The volume of a cylinder of radius 7 cm and height 10 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধ আৰু 10 চেমি উচ্চতাৰ চিলিণ্ডাৰৰ আয়তন (pi = 22/7) —"
   },
   "options": [
    {
     "en": "1440 cubic cm",
     "as": "১৪৪০ cubic cm"
    },
    {
     "en": "1640 cubic cm",
     "as": "১৬৪০ cubic cm"
    },
    {
     "en": "1540 cubic cm",
     "as": "১৫৪০ cubic cm"
    },
    {
     "en": "1740 cubic cm",
     "as": "১৭৪০ cubic cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Volume = 22/7 x 49 x 10 = 1540 cubic cm.",
    "as": "আয়তন = 22/7 x 49 x 10 = 1540 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-027",
   "q": {
    "en": "The curved surface area of a cylinder of radius 7 cm and height 10 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধ আৰু 10 চেমি উচ্চতাৰ চিলিণ্ডাৰৰ বক্ৰ পৃষ্ঠকালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "400 sq cm",
     "as": "৪০০ sq cm"
    },
    {
     "en": "420 sq cm",
     "as": "৪২০ sq cm"
    },
    {
     "en": "440 sq cm",
     "as": "৪৪০ sq cm"
    },
    {
     "en": "460 sq cm",
     "as": "৪৬০ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CSA = 2 x 22/7 x 7 x 10 = 440 sq cm.",
    "as": "বক্ৰ পৃষ্ঠকালি = 2 x 22/7 x 7 x 10 = 440 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-028",
   "q": {
    "en": "The area of a square of side 20 m is —",
    "as": "20 মিটাৰ বাহুৰ বৰ্গৰ কালি —"
   },
   "options": [
    {
     "en": "300 sq m",
     "as": "৩০০ sq m"
    },
    {
     "en": "350 sq m",
     "as": "৩৫০ sq m"
    },
    {
     "en": "400 sq m",
     "as": "৪০০ sq m"
    },
    {
     "en": "450 sq m",
     "as": "৪৫০ sq m"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = 400 sq m.",
    "as": "কালি = 400 sq m।"
   }
  },
  {
   "id": "basic-mensuration-029",
   "q": {
    "en": "The side of a square whose perimeter is 40 m is —",
    "as": "পৰিসীমা 40 মিটাৰ হোৱা বৰ্গৰ বাহু —"
   },
   "options": [
    {
     "en": "10 m",
     "as": "১০ m"
    },
    {
     "en": "9 m",
     "as": "৯ m"
    },
    {
     "en": "8 m",
     "as": "৮ m"
    },
    {
     "en": "12 m",
     "as": "১২ m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Side = 40 / 4 = 10 m.",
    "as": "বাহু = 40 / 4 = 10 m।"
   }
  },
  {
   "id": "basic-mensuration-030",
   "q": {
    "en": "The side of a square whose area is 169 sq m is —",
    "as": "কালি 169 বৰ্গমিটাৰ হোৱা বৰ্গৰ বাহু —"
   },
   "options": [
    {
     "en": "13 m",
     "as": "১৩ m"
    },
    {
     "en": "12 m",
     "as": "১২ m"
    },
    {
     "en": "11 m",
     "as": "১১ m"
    },
    {
     "en": "14 m",
     "as": "১৪ m"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Side = sqrt(169) = 13 m.",
    "as": "বাহু = sqrt(169) = 13 m।"
   }
  },
  {
   "id": "basic-mensuration-031",
   "q": {
    "en": "The length of a rectangle of area 120 sq m and breadth 8 m is —",
    "as": "কালি 120 বৰ্গমিটাৰ আৰু প্ৰস্থ 8 মিটাৰ হোৱা আয়তৰ দীঘ —"
   },
   "options": [
    {
     "en": "12 m",
     "as": "১২ m"
    },
    {
     "en": "13 m",
     "as": "১৩ m"
    },
    {
     "en": "15 m",
     "as": "১৫ m"
    },
    {
     "en": "16 m",
     "as": "১৬ m"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Length = 120 / 8 = 15 m.",
    "as": "দীঘ = 120 / 8 = 15 m।"
   }
  },
  {
   "id": "basic-mensuration-032",
   "q": {
    "en": "The breadth of a rectangle of area 180 sq m and length 15 m is —",
    "as": "কালি 180 বৰ্গমিটাৰ আৰু দীঘ 15 মিটাৰ হোৱা আয়তৰ প্ৰস্থ —"
   },
   "options": [
    {
     "en": "10 m",
     "as": "১০ m"
    },
    {
     "en": "11 m",
     "as": "১১ m"
    },
    {
     "en": "12 m",
     "as": "১২ m"
    },
    {
     "en": "13 m",
     "as": "১৩ m"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Breadth = 180 / 15 = 12 m.",
    "as": "প্ৰস্থ = 180 / 15 = 12 m।"
   }
  },
  {
   "id": "basic-mensuration-033",
   "q": {
    "en": "The perimeter of a rectangle whose length is 25 m and breadth is 15 m is —",
    "as": "দীঘ 25 মিটাৰ আৰু প্ৰস্থ 15 মিটাৰ হোৱা আয়তৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "70 m",
     "as": "৭০ m"
    },
    {
     "en": "80 m",
     "as": "৮০ m"
    },
    {
     "en": "75 m",
     "as": "৭৫ m"
    },
    {
     "en": "85 m",
     "as": "৮৫ m"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Perimeter = 2(25 + 15) = 80 m.",
    "as": "পৰিসীমা = 2(25 + 15) = 80 m।"
   }
  },
  {
   "id": "basic-mensuration-034",
   "q": {
    "en": "The area of a right triangle with legs 9 cm and 12 cm is —",
    "as": "9 চেমি আৰু 12 চেমি বাহুৰ সমকোণী ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "45 sq cm",
     "as": "৪৫ sq cm"
    },
    {
     "en": "48 sq cm",
     "as": "৪৮ sq cm"
    },
    {
     "en": "108 sq cm",
     "as": "১০৮ sq cm"
    },
    {
     "en": "54 sq cm",
     "as": "৫৪ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 1/2 x 9 x 12 = 54 sq cm.",
    "as": "কালি = 1/2 x 9 x 12 = 54 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-035",
   "q": {
    "en": "The hypotenuse of a right triangle with legs 3 cm and 4 cm is —",
    "as": "3 চেমি আৰু 4 চেমি বাহুৰ সমকোণী ত্ৰিভুজৰ অতিভুজ —"
   },
   "options": [
    {
     "en": "5 cm",
     "as": "৫ cm"
    },
    {
     "en": "6 cm",
     "as": "৬ cm"
    },
    {
     "en": "7 cm",
     "as": "৭ cm"
    },
    {
     "en": "12 cm",
     "as": "১২ cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Hypotenuse = sqrt(9 + 16) = 5 cm.",
    "as": "অতিভুজ = sqrt(9 + 16) = 5 cm।"
   }
  },
  {
   "id": "basic-mensuration-036",
   "q": {
    "en": "The hypotenuse of a right triangle with legs 6 cm and 8 cm is —",
    "as": "6 চেমি আৰু 8 চেমি বাহুৰ সমকোণী ত্ৰিভুজৰ অতিভুজ —"
   },
   "options": [
    {
     "en": "9 cm",
     "as": "৯ cm"
    },
    {
     "en": "10 cm",
     "as": "১০ cm"
    },
    {
     "en": "12 cm",
     "as": "১২ cm"
    },
    {
     "en": "14 cm",
     "as": "১৪ cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Hypotenuse = sqrt(36 + 64) = 10 cm.",
    "as": "অতিভুজ = sqrt(36 + 64) = 10 cm।"
   }
  },
  {
   "id": "basic-mensuration-037",
   "q": {
    "en": "The area of an equilateral triangle of side 4 cm is (sqrt(3) = 1.732) —",
    "as": "4 চেমি বাহুৰ সমবাহু ত্ৰিভুজৰ কালি (sqrt(3) = 1.732) —"
   },
   "options": [
    {
     "en": "5.928 sq cm",
     "as": "৫.৯২৮ sq cm"
    },
    {
     "en": "6.928 sq m",
     "as": "৬.৯২৮ sq m"
    },
    {
     "en": "4.928 sq cm",
     "as": "৪.৯২৮ sq cm"
    },
    {
     "en": "6.928 sq cm",
     "as": "৬.৯২৮ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = (sqrt(3)/4) x 16 = 6.928 sq cm.",
    "as": "কালি = (sqrt(3)/4) x 16 = 6.928 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-038",
   "q": {
    "en": "The area of an equilateral triangle of side 6 cm is (sqrt(3) = 1.732) —",
    "as": "6 চেমি বাহুৰ সমবাহু ত্ৰিভুজৰ কালি (sqrt(3) = 1.732) —"
   },
   "options": [
    {
     "en": "12.588 sq cm",
     "as": "১২.৫৮৮ sq cm"
    },
    {
     "en": "14.588 sq cm",
     "as": "১৪.৫৮৮ sq cm"
    },
    {
     "en": "15.588 sq cm",
     "as": "১৫.৫৮৮ sq cm"
    },
    {
     "en": "16.588 sq cm",
     "as": "১৬.৫৮৮ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = (sqrt(3)/4) x 36 = 15.588 sq cm.",
    "as": "কালি = (sqrt(3)/4) x 36 = 15.588 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-039",
   "q": {
    "en": "The area of a circle of radius 21 cm (pi = 22/7) is —",
    "as": "21 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ কালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "1386 sq cm",
     "as": "১৩৮৬ sq cm"
    },
    {
     "en": "1286 sq cm",
     "as": "১২৮৬ sq cm"
    },
    {
     "en": "1486 sq cm",
     "as": "১৪৮৬ sq cm"
    },
    {
     "en": "1586 sq cm",
     "as": "১৫৮৬ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 22/7 x 441 = 1386 sq cm.",
    "as": "কালি = 22/7 x 441 = 1386 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-040",
   "q": {
    "en": "The radius of a circle of diameter 20 cm is —",
    "as": "20 চেমি ব্যাসৰ বৃত্তৰ ব্যাসাৰ্ধ —"
   },
   "options": [
    {
     "en": "5 cm",
     "as": "৫ cm"
    },
    {
     "en": "8 cm",
     "as": "৮ cm"
    },
    {
     "en": "12 cm",
     "as": "১২ cm"
    },
    {
     "en": "10 cm",
     "as": "১০ cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Radius = 20 / 2 = 10 cm.",
    "as": "ব্যাসাৰ্ধ = 20 / 2 = 10 cm।"
   }
  },
  {
   "id": "basic-mensuration-041",
   "q": {
    "en": "The diameter of a circle of radius 15 cm is —",
    "as": "15 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ ব্যাস —"
   },
   "options": [
    {
     "en": "25 cm",
     "as": "২৫ cm"
    },
    {
     "en": "28 cm",
     "as": "২৮ cm"
    },
    {
     "en": "30 cm",
     "as": "৩০ cm"
    },
    {
     "en": "32 cm",
     "as": "৩২ cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Diameter = 2 x 15 = 30 cm.",
    "as": "ব্যাস = 2 x 15 = 30 cm।"
   }
  },
  {
   "id": "basic-mensuration-042",
   "q": {
    "en": "The circumference of a circle of radius 14 cm (pi = 22/7) is —",
    "as": "14 চেমি ব্যাসাৰ্ধৰ বৃত্তৰ পৰিধি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "66 cm",
     "as": "৬৬ cm"
    },
    {
     "en": "88 cm",
     "as": "৮৮ cm"
    },
    {
     "en": "77 cm",
     "as": "৭৭ cm"
    },
    {
     "en": "99 cm",
     "as": "৯৯ cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Circumference = 2 x 22/7 x 14 = 88 cm.",
    "as": "পৰিধি = 2 x 22/7 x 14 = 88 cm।"
   }
  },
  {
   "id": "basic-mensuration-043",
   "q": {
    "en": "The volume of a cube of side 10 cm is —",
    "as": "10 চেমি বাহুৰ ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "1000 cubic cm",
     "as": "১০০০ cubic cm"
    },
    {
     "en": "100 cubic cm",
     "as": "১০০ cubic cm"
    },
    {
     "en": "10000 cubic cm",
     "as": "১০০০০ cubic cm"
    },
    {
     "en": "100000 cubic cm",
     "as": "১০০০০০ cubic cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Volume = 1000 cubic cm.",
    "as": "আয়তন = 1000 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-044",
   "q": {
    "en": "The side of a cube whose volume is 216 cubic cm is —",
    "as": "আয়তন 216 ঘন চেমি হোৱা ঘনকৰ বাহু —"
   },
   "options": [
    {
     "en": "4 cm",
     "as": "৪ cm"
    },
    {
     "en": "5 cm",
     "as": "৫ cm"
    },
    {
     "en": "7 cm",
     "as": "৭ cm"
    },
    {
     "en": "6 cm",
     "as": "৬ cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Side = cube root of 216 = 6 cm.",
    "as": "বাহু = 216 ৰ ঘনমূল = 6 cm।"
   }
  },
  {
   "id": "basic-mensuration-045",
   "q": {
    "en": "The volume of a cuboid of length 12 cm, breadth 10 cm and height 5 cm is —",
    "as": "12 চেমি দীঘ, 10 চেমি প্ৰস্থ আৰু 5 চেমি উচ্চতাৰ ঘনকীয় বস্তুৰ আয়তন —"
   },
   "options": [
    {
     "en": "500 cubic cm",
     "as": "৫০০ cubic cm"
    },
    {
     "en": "600 cubic cm",
     "as": "৬০০ cubic cm"
    },
    {
     "en": "550 cubic cm",
     "as": "৫৫০ cubic cm"
    },
    {
     "en": "650 cubic cm",
     "as": "৬৫০ cubic cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Volume = 12 x 10 x 5 = 600 cubic cm.",
    "as": "আয়তন = 12 x 10 x 5 = 600 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-046",
   "q": {
    "en": "The total surface area of a cuboid of length 12 cm, breadth 10 cm and height 5 cm is —",
    "as": "12 চেমি দীঘ, 10 চেমি প্ৰস্থ আৰু 5 চেমি উচ্চতাৰ ঘনকীয় বস্তুৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "460 sq cm",
     "as": "৪৬০ sq cm"
    },
    {
     "en": "450 sq cm",
     "as": "৪৫০ sq cm"
    },
    {
     "en": "440 sq cm",
     "as": "৪৪০ sq cm"
    },
    {
     "en": "470 sq cm",
     "as": "৪৭০ sq cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "TSA = 2(120 + 50 + 60) = 460 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 2(120 + 50 + 60) = 460 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-047",
   "q": {
    "en": "The volume of a cylinder of radius 7 cm and height 20 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধ আৰু 20 চেমি উচ্চতাৰ চিলিণ্ডাৰৰ আয়তন (pi = 22/7) —"
   },
   "options": [
    {
     "en": "3080 cubic cm",
     "as": "৩০৮০ cubic cm"
    },
    {
     "en": "2980 cubic cm",
     "as": "২৯৮০ cubic cm"
    },
    {
     "en": "2880 cubic cm",
     "as": "২৮৮০ cubic cm"
    },
    {
     "en": "3180 cubic cm",
     "as": "৩১৮০ cubic cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Volume = 22/7 x 49 x 20 = 3080 cubic cm.",
    "as": "আয়তন = 22/7 x 49 x 20 = 3080 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-048",
   "q": {
    "en": "The curved surface area of a cylinder of radius 7 cm and height 5 cm (pi = 22/7) is —",
    "as": "7 চেমি ব্যাসাৰ্ধ আৰু 5 চেমি উচ্চতাৰ চিলিণ্ডাৰৰ বক্ৰ পৃষ্ঠকালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "200 sq cm",
     "as": "২০০ sq cm"
    },
    {
     "en": "210 sq cm",
     "as": "২১০ sq cm"
    },
    {
     "en": "230 sq cm",
     "as": "২৩০ sq cm"
    },
    {
     "en": "220 sq cm",
     "as": "২২০ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "CSA = 2 x 22/7 x 7 x 5 = 220 sq cm.",
    "as": "বক্ৰ পৃষ্ঠকালি = 2 x 22/7 x 7 x 5 = 220 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-049",
   "q": {
    "en": "The area of a square whose diagonal is 10 cm is —",
    "as": "কৰ্ণ 10 চেমি হোৱা বৰ্গৰ কালি —"
   },
   "options": [
    {
     "en": "40 sq cm",
     "as": "৪০ sq cm"
    },
    {
     "en": "45 sq cm",
     "as": "৪৫ sq cm"
    },
    {
     "en": "50 sq cm",
     "as": "৫০ sq cm"
    },
    {
     "en": "100 sq cm",
     "as": "১০০ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = diagonal^2 / 2 = 100 / 2 = 50 sq cm.",
    "as": "কালি = কৰ্ণ^2 / 2 = 100 / 2 = 50 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-050",
   "q": {
    "en": "The diagonal of a square of side 6 cm is —",
    "as": "6 চেমি বাহুৰ বৰ্গৰ কৰ্ণ —"
   },
   "options": [
    {
     "en": "12 cm",
     "as": "১২ cm"
    },
    {
     "en": "6 sqrt(2) cm",
     "as": "৬ sqrt(২) cm"
    },
    {
     "en": "8 cm",
     "as": "৮ cm"
    },
    {
     "en": "36 cm",
     "as": "৩৬ cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Diagonal = side x sqrt(2) = 6 sqrt(2) cm.",
    "as": "কৰ্ণ = বাহু x sqrt(2) = 6 sqrt(2) cm।"
   }
  },
  {
   "id": "basic-mensuration-051",
   "q": {
    "en": "The area of a rhombus with diagonals 10 cm and 8 cm is —",
    "as": "10 চেমি আৰু 8 চেমি কৰ্ণৰ ৰম্বাছৰ কালি —"
   },
   "options": [
    {
     "en": "30 sq cm",
     "as": "৩০ sq cm"
    },
    {
     "en": "50 sq cm",
     "as": "৫০ sq cm"
    },
    {
     "en": "40 sq cm",
     "as": "৪০ sq cm"
    },
    {
     "en": "80 sq cm",
     "as": "৮০ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = 1/2 x 10 x 8 = 40 sq cm.",
    "as": "কালি = 1/2 x 10 x 8 = 40 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-052",
   "q": {
    "en": "The area of a rhombus with diagonals 12 cm and 10 cm is —",
    "as": "12 চেমি আৰু 10 চেমি কৰ্ণৰ ৰম্বাছৰ কালি —"
   },
   "options": [
    {
     "en": "50 sq cm",
     "as": "৫০ sq cm"
    },
    {
     "en": "55 sq cm",
     "as": "৫৫ sq cm"
    },
    {
     "en": "65 sq cm",
     "as": "৬৫ sq cm"
    },
    {
     "en": "60 sq cm",
     "as": "৬০ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 1/2 x 12 x 10 = 60 sq cm.",
    "as": "কালি = 1/2 x 12 x 10 = 60 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-053",
   "q": {
    "en": "The area of a semicircle of radius 14 cm (pi = 22/7) is —",
    "as": "14 চেমি ব্যাসাৰ্ধৰ অৰ্ধবৃত্তৰ কালি (pi = 22/7) —"
   },
   "options": [
    {
     "en": "208 sq cm",
     "as": "২০৮ sq cm"
    },
    {
     "en": "508 sq cm",
     "as": "৫০৮ sq cm"
    },
    {
     "en": "408 sq cm",
     "as": "৪০৮ sq cm"
    },
    {
     "en": "308 sq cm",
     "as": "৩০৮ sq cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Area = 1/2 x 22/7 x 196 = 308 sq cm.",
    "as": "কালি = 1/2 x 22/7 x 196 = 308 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-054",
   "q": {
    "en": "The area of a rectangle is 96 sq m and its length is 12 m. Its perimeter is —",
    "as": "এটা আয়তৰ কালি 96 বৰ্গমিটাৰ আৰু দীঘ 12 মিটাৰ। ইয়াৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "36 m",
     "as": "৩৬ m"
    },
    {
     "en": "44 m",
     "as": "৪৪ m"
    },
    {
     "en": "40 m",
     "as": "৪০ m"
    },
    {
     "en": "48 m",
     "as": "৪৮ m"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Breadth = 8 m, so perimeter = 2(12 + 8) = 40 m.",
    "as": "প্ৰস্থ = 8 m, গতিকে পৰিসীমা = 2(12 + 8) = 40 m।"
   }
  },
  {
   "id": "basic-mensuration-055",
   "q": {
    "en": "The area of a square is 81 sq cm. Its perimeter is —",
    "as": "এটা বৰ্গৰ কালি 81 বৰ্গচেমি। ইয়াৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "36 cm",
     "as": "৩৬ cm"
    },
    {
     "en": "32 cm",
     "as": "৩২ cm"
    },
    {
     "en": "27 cm",
     "as": "২৭ cm"
    },
    {
     "en": "40 cm",
     "as": "৪০ cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Side = 9 cm, so perimeter = 36 cm.",
    "as": "বাহু = 9 cm, গতিকে পৰিসীমা = 36 cm।"
   }
  },
  {
   "id": "basic-mensuration-056",
   "q": {
    "en": "The perimeter of a square is 64 cm. Its area is —",
    "as": "এটা বৰ্গৰ পৰিসীমা 64 চেমি। ইয়াৰ কালি —"
   },
   "options": [
    {
     "en": "196 sq cm",
     "as": "১৯৬ sq cm"
    },
    {
     "en": "256 sq cm",
     "as": "২৫৬ sq cm"
    },
    {
     "en": "225 sq cm",
     "as": "২২৫ sq cm"
    },
    {
     "en": "289 sq cm",
     "as": "২৮৯ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Side = 16 cm, so area = 256 sq cm.",
    "as": "বাহু = 16 cm, গতিকে কালি = 256 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-057",
   "q": {
    "en": "The area of a circle is 616 sq cm (pi = 22/7). Its radius is —",
    "as": "এটা বৃত্তৰ কালি 616 বৰ্গচেমি (pi = 22/7)। ইয়াৰ ব্যাসাৰ্ধ —"
   },
   "options": [
    {
     "en": "14 cm",
     "as": "১৪ cm"
    },
    {
     "en": "10 cm",
     "as": "১০ cm"
    },
    {
     "en": "7 cm",
     "as": "৭ cm"
    },
    {
     "en": "21 cm",
     "as": "২১ cm"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "r^2 = 616 x 7 / 22 = 196, so r = 14 cm.",
    "as": "r^2 = 616 x 7 / 22 = 196, গতিকে r = 14 cm।"
   }
  },
  {
   "id": "basic-mensuration-058",
   "q": {
    "en": "The volume of a cuboid is 240 cubic cm. If its length is 8 cm and breadth is 6 cm, its height is —",
    "as": "এটা ঘনকীয় বস্তুৰ আয়তন 240 ঘনচেমি। দীঘ 8 চেমি আৰু প্ৰস্থ 6 চেমি হ'লে উচ্চতা —"
   },
   "options": [
    {
     "en": "4 cm",
     "as": "৪ cm"
    },
    {
     "en": "5 cm",
     "as": "৫ cm"
    },
    {
     "en": "6 cm",
     "as": "৬ cm"
    },
    {
     "en": "8 cm",
     "as": "৮ cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Height = 240 / (8 x 6) = 5 cm.",
    "as": "উচ্চতা = 240 / (8 x 6) = 5 cm।"
   }
  },
  {
   "id": "basic-mensuration-059",
   "q": {
    "en": "The area of the four walls of a room of length 8 m, breadth 6 m and height 4 m is —",
    "as": "8 মিটাৰ দীঘ, 6 মিটাৰ প্ৰস্থ আৰু 4 মিটাৰ উচ্চতাৰ এটা কোঠাৰ চাৰি বেৰৰ কালি —"
   },
   "options": [
    {
     "en": "104 sq m",
     "as": "১০৪ sq m"
    },
    {
     "en": "112 sq m",
     "as": "১১২ sq m"
    },
    {
     "en": "108 sq m",
     "as": "১০৮ sq m"
    },
    {
     "en": "116 sq m",
     "as": "১১৬ sq m"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Walls = 2(l + b) x h = 2 x 14 x 4 = 112 sq m.",
    "as": "বেৰ = 2(দীঘ + প্ৰস্থ) x উচ্চতা = 2 x 14 x 4 = 112 sq m।"
   }
  },
  {
   "id": "basic-mensuration-060",
   "q": {
    "en": "The area of a triangle whose base is 16 cm and area is 64 sq cm is —",
    "as": "ভূমি 16 চেমি আৰু কালি 64 বৰ্গচেমি হোৱা ত্ৰিভুজৰ উচ্চতা —"
   },
   "options": [
    {
     "en": "6 cm",
     "as": "৬ cm"
    },
    {
     "en": "7 cm",
     "as": "৭ cm"
    },
    {
     "en": "10 cm",
     "as": "১০ cm"
    },
    {
     "en": "8 cm",
     "as": "৮ cm"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "64 = 1/2 x 16 x h, so h = 8 cm.",
    "as": "64 = 1/2 x 16 x h, গতিকে h = 8 cm।"
   }
  },
  {
   "id": "basic-mensuration-061",
   "q": {
    "en": "The area of a trapezium is 60 sq cm. If the parallel sides are 10 cm and 5 cm, the height is —",
    "as": "এটা ট্ৰেপিজিয়ামৰ কালি 60 বৰ্গচেমি। সমান্তৰাল বাহু 10 চেমি আৰু 5 চেমি হ'লে উচ্চতা —"
   },
   "options": [
    {
     "en": "6 cm",
     "as": "৬ cm"
    },
    {
     "en": "7 cm",
     "as": "৭ cm"
    },
    {
     "en": "8 cm",
     "as": "৮ cm"
    },
    {
     "en": "9 cm",
     "as": "৯ cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "60 = 1/2 x 15 x h, so h = 8 cm.",
    "as": "60 = 1/2 x 15 x h, গতিকে h = 8 cm।"
   }
  },
  {
   "id": "basic-mensuration-062",
   "q": {
    "en": "The total surface area of a cube of side 10 cm is —",
    "as": "10 চেমি বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি —"
   },
   "options": [
    {
     "en": "400 sq cm",
     "as": "৪০০ sq cm"
    },
    {
     "en": "600 sq cm",
     "as": "৬০০ sq cm"
    },
    {
     "en": "500 sq cm",
     "as": "৫০০ sq cm"
    },
    {
     "en": "700 sq cm",
     "as": "৭০০ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "TSA = 6 x 100 = 600 sq cm.",
    "as": "মুঠ পৃষ্ঠকালি = 6 x 100 = 600 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-063",
   "q": {
    "en": "The area of a square of side 25 cm is —",
    "as": "25 চেমি বাহুৰ বৰ্গৰ কালি —"
   },
   "options": [
    {
     "en": "525 sq cm",
     "as": "৫২৫ sq cm"
    },
    {
     "en": "625 sq cm",
     "as": "৬২৫ sq cm"
    },
    {
     "en": "575 sq cm",
     "as": "৫৭৫ sq cm"
    },
    {
     "en": "675 sq cm",
     "as": "৬৭৫ sq cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Area = 625 sq cm.",
    "as": "কালি = 625 sq cm।"
   }
  },
  {
   "id": "basic-mensuration-064",
   "q": {
    "en": "The perimeter of a rectangle of length 30 cm and breadth 20 cm is —",
    "as": "30 চেমি দীঘ আৰু 20 চেমি প্ৰস্থৰ আয়তৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "90 cm",
     "as": "৯০ cm"
    },
    {
     "en": "100 cm",
     "as": "১০০ cm"
    },
    {
     "en": "95 cm",
     "as": "৯৫ cm"
    },
    {
     "en": "110 cm",
     "as": "১১০ cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Perimeter = 2(30 + 20) = 100 cm.",
    "as": "পৰিসীমা = 2(30 + 20) = 100 cm।"
   }
  },
  {
   "id": "basic-mensuration-065",
   "q": {
    "en": "The volume of a cube of side 3 cm is —",
    "as": "3 চেমি বাহুৰ ঘনকৰ আয়তন —"
   },
   "options": [
    {
     "en": "9 cubic cm",
     "as": "৯ cubic cm"
    },
    {
     "en": "27 cubic cm",
     "as": "২৭ cubic cm"
    },
    {
     "en": "18 cubic cm",
     "as": "১৮ cubic cm"
    },
    {
     "en": "36 cubic cm",
     "as": "৩৬ cubic cm"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Volume = 27 cubic cm.",
    "as": "আয়তন = 27 cubic cm।"
   }
  },
  {
   "id": "basic-mensuration-066",
   "q": {
    "en": "The area of a triangle with base 14 cm and height 10 cm is —",
    "as": "14 চেমি ভূমি আৰু 10 চেমি উচ্চতাৰ ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "60 sq cm",
     "as": "৬০ sq cm"
    },
    {
     "en": "65 sq cm",
     "as": "৬৫ sq cm"
    },
    {
     "en": "70 sq cm",
     "as": "৭০ sq cm"
    },
    {
     "en": "75 sq cm",
     "as": "৭৫ sq cm"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = 1/2 x 14 x 10 = 70 sq cm.",
    "as": "কালি = 1/2 x 14 x 10 = 70 sq cm।"
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
     "en": "6",
     "as": "৬"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "36 = 2^2 x 3^2 and 48 = 2^4 x 3, so HCF = 12.",
    "as": "36 = 2^2 x 3^2 আৰু 48 = 2^4 x 3, গতিকে গ.সা.উ. = 12।"
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
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "120",
     "as": "১২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "15 = 3x5, 20 = 2^2x5, 30 = 2x3x5, so LCM = 60.",
    "as": "15 = 3x5, 20 = 2^2x5, 30 = 2x3x5, গতিকে ল.সা.গু. = 60।"
   }
  },
  {
   "id": "lcm-hcf-003",
   "q": {
    "en": "The HCF of 24 and 36 is —",
    "as": "24 আৰু 36 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "24 = 2^3 x 3 and 36 = 2^2 x 3^2, so HCF = 12.",
    "as": "24 = 2^3 x 3 আৰু 36 = 2^2 x 3^2, গতিকে গ.সা.উ. = 12।"
   }
  },
  {
   "id": "lcm-hcf-004",
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
     "en": "6",
     "as": "৬"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "216",
     "as": "২১৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "12 = 2^2 x 3 and 18 = 2 x 3^2, so LCM = 2^2 x 3^2 = 36.",
    "as": "12 = 2^2 x 3 আৰু 18 = 2 x 3^2, গতিকে ল.সা.গু. = 36।"
   }
  },
  {
   "id": "lcm-hcf-005",
   "q": {
    "en": "The HCF of 16, 24 and 40 is —",
    "as": "16, 24 আৰু 40 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "8",
     "as": "৮"
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
   "correct": 1,
   "explanation": {
    "en": "16 = 2^4, 24 = 2^3 x 3, 40 = 2^3 x 5, so HCF = 2^3 = 8.",
    "as": "16 = 2^4, 24 = 2^3 x 3, 40 = 2^3 x 5, গতিকে গ.সা.উ. = 8।"
   }
  },
  {
   "id": "lcm-hcf-006",
   "q": {
    "en": "The LCM of 4, 6 and 8 is —",
    "as": "4, 6 আৰু 8 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "48",
     "as": "৪৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "4 = 2^2, 6 = 2x3, 8 = 2^3, so LCM = 2^3 x 3 = 24.",
    "as": "4 = 2^2, 6 = 2x3, 8 = 2^3, গতিকে ল.সা.গু. = 24।"
   }
  },
  {
   "id": "lcm-hcf-007",
   "q": {
    "en": "The HCF of 45 and 75 is —",
    "as": "45 আৰু 75 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "45 = 3^2 x 5 and 75 = 3 x 5^2, so HCF = 15.",
    "as": "45 = 3^2 x 5 আৰু 75 = 3 x 5^2, গতিকে গ.সা.উ. = 15।"
   }
  },
  {
   "id": "lcm-hcf-008",
   "q": {
    "en": "The LCM of 9 and 12 is —",
    "as": "9 আৰু 12 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "108",
     "as": "১০৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "9 = 3^2 and 12 = 2^2 x 3, so LCM = 36.",
    "as": "9 = 3^2 আৰু 12 = 2^2 x 3, গতিকে ল.সা.গু. = 36।"
   }
  },
  {
   "id": "lcm-hcf-009",
   "q": {
    "en": "The product of the HCF and the LCM of two numbers is always equal to —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. আৰু ল.সা.গু.ৰ গুণফল সদায় সমান —"
   },
   "options": [
    {
     "en": "the sum of the numbers",
     "as": "সংখ্যা দুটাৰ যোগফল"
    },
    {
     "en": "the difference of the numbers",
     "as": "সংখ্যা দুটাৰ পাৰ্থক্য"
    },
    {
     "en": "their average",
     "as": "সিহঁতৰ গড়"
    },
    {
     "en": "the product of the numbers",
     "as": "সংখ্যা দুটাৰ গুণফল"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "For any two numbers, HCF x LCM = product of the numbers.",
    "as": "যিকোনো দুটা সংখ্যাৰ বাবে, গ.সা.উ. x ল.সা.গু. = সংখ্যা দুটাৰ গুণফল।"
   }
  },
  {
   "id": "lcm-hcf-010",
   "q": {
    "en": "The HCF of two co-prime numbers is —",
    "as": "দুটা সহ-মৌলিক সংখ্যাৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
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
     "en": "the smaller number",
     "as": "সৰু সংখ্যাটো"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Co-prime numbers share no common factor other than 1.",
    "as": "সহ-মৌলিক সংখ্যাবোৰত 1 ৰ বাহিৰে কোনো সাধাৰণ উৎপাদক নাথাকে।"
   }
  },
  {
   "id": "lcm-hcf-011",
   "q": {
    "en": "The LCM of 7 and 11 is —",
    "as": "7 আৰু 11 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "77",
     "as": "৭৭"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "154",
     "as": "১৫৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Both are prime, so LCM = 7 x 11 = 77.",
    "as": "দুয়োটা মৌলিক, গতিকে ল.সা.গু. = 77।"
   }
  },
  {
   "id": "lcm-hcf-012",
   "q": {
    "en": "The LCM of two co-prime numbers is —",
    "as": "দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "their product",
     "as": "সিহঁতৰ গুণফল"
    },
    {
     "en": "their sum",
     "as": "সিহঁতৰ যোগফল"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "their difference",
     "as": "সিহঁতৰ পাৰ্থক্য"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Co-prime numbers have no common factor, so the LCM is their product.",
    "as": "সহ-মৌলিক সংখ্যাৰ সাধাৰণ উৎপাদক নাই, গতিকে ল.সা.গু. সিহঁতৰ গুণফল।"
   }
  },
  {
   "id": "lcm-hcf-013",
   "q": {
    "en": "The greatest number that divides 43, 91 and 183 leaving the same remainder 3 in each case is —",
    "as": "43, 91 আৰু 183 ক হৰণ কৰিলে প্ৰতিটোতে একে ভাগশেষ 3 এৰি যোৱা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "3",
     "as": "৩"
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
   "correct": 0,
   "explanation": {
    "en": "Subtracting 3 gives 40, 88 and 180; their HCF is 4.",
    "as": "3 বিয়োগ কৰিলে 40, 88 আৰু 180 পোৱা যায়; সিহঁতৰ গ.সা.উ. 4।"
   }
  },
  {
   "id": "lcm-hcf-014",
   "q": {
    "en": "The largest number that divides 62, 132 and 237 leaving the same remainder in each case is —",
    "as": "62, 132 আৰু 237 ক হৰণ কৰিলে প্ৰতিটোতে একে ভাগশেষ এৰি যোৱা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "7",
     "as": "৭"
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
   "id": "lcm-hcf-015",
   "q": {
    "en": "The least number which when divided by 12, 15 and 18 leaves a remainder 5 in each case is —",
    "as": "12, 15 আৰু 18 ৰে হৰণ কৰিলে প্ৰতিটোতে ভাগশেষ 5 এৰি যোৱা আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "175",
     "as": "১৭৫"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "195",
     "as": "১৯৫"
    },
    {
     "en": "185",
     "as": "১৮৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM of 12, 15, 18 = 180; add 5 to get 185.",
    "as": "12, 15, 18 ৰ ল.সা.গু. = 180; 5 যোগ কৰিলে 185।"
   }
  },
  {
   "id": "lcm-hcf-016",
   "q": {
    "en": "The least number which when divided by 6, 8 and 12 leaves a remainder 1 in each case is —",
    "as": "6, 8 আৰু 12 ৰে হৰণ কৰিলে প্ৰতিটোতে ভাগশেষ 1 এৰি যোৱা আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "23",
     "as": "২৩"
    },
    {
     "en": "49",
     "as": "৪৯"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM of 6, 8, 12 = 24; add 1 to get 25.",
    "as": "6, 8, 12 ৰ ল.সা.গু. = 24; 1 যোগ কৰিলে 25।"
   }
  },
  {
   "id": "lcm-hcf-017",
   "q": {
    "en": "Three bells toll at intervals of 6, 8 and 12 minutes. If they toll together at 8:00 a.m., they next toll together at —",
    "as": "তিনিটা ঘণ্টা 6, 8 আৰু 12 মিনিটৰ বিৰতিত বাজে। 8:00 বজাত একেলগে বাজিলে পুনৰ একেলগে বাজিব —"
   },
   "options": [
    {
     "en": "8:36 a.m.",
     "as": "৮:৩৬ a.m."
    },
    {
     "en": "8:24 a.m.",
     "as": "৮:২৪ a.m."
    },
    {
     "en": "8:48 a.m.",
     "as": "৮:৪৮ a.m."
    },
    {
     "en": "9:00 a.m.",
     "as": "৯:০০ a.m."
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM of 6, 8 and 12 is 24 minutes.",
    "as": "6, 8 আৰু 12 ৰ ল.সা.গু. 24 মিনিট।"
   }
  },
  {
   "id": "lcm-hcf-018",
   "q": {
    "en": "Two bells toll at intervals of 9 and 12 minutes. If they toll together now, they will toll together again after —",
    "as": "দুটা ঘণ্টা 9 আৰু 12 মিনিটৰ বিৰতিত বাজে। এতিয়া একেলগে বাজিলে পুনৰ একেলগে বাজিব —"
   },
   "options": [
    {
     "en": "18 minutes",
     "as": "১৮ মিনিট"
    },
    {
     "en": "24 minutes",
     "as": "২৪ মিনিট"
    },
    {
     "en": "36 minutes",
     "as": "৩৬ মিনিট"
    },
    {
     "en": "72 minutes",
     "as": "৭২ মিনিট"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM of 9 and 12 is 36 minutes.",
    "as": "9 আৰু 12 ৰ ল.সা.গু. 36 মিনিট।"
   }
  },
  {
   "id": "lcm-hcf-019",
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
   "id": "lcm-hcf-020",
   "q": {
    "en": "If the LCM of two numbers is 180 and their HCF is 6, then their product is —",
    "as": "দুটা সংখ্যাৰ ল.সা.গু. 180 আৰু গ.সা.উ. 6 হ'লে সিহঁতৰ গুণফল —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
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
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Product = HCF x LCM = 6 x 180 = 1080.",
    "as": "গুণফল = গ.সা.উ. x ল.সা.গু. = 6 x 180 = 1080।"
   }
  },
  {
   "id": "lcm-hcf-021",
   "q": {
    "en": "If the product of two numbers is 216 and their HCF is 6, their LCM is —",
    "as": "দুটা সংখ্যাৰ গুণফল 216 আৰু গ.সা.উ. 6 হ'লে ল.সা.গু. —"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "216",
     "as": "২১৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM = product / HCF = 216 / 6 = 36.",
    "as": "ল.সা.গু. = গুণফল / গ.সা.উ. = 216 / 6 = 36।"
   }
  },
  {
   "id": "lcm-hcf-022",
   "q": {
    "en": "The smallest square number that is divisible by 4, 6 and 10 is —",
    "as": "4, 6 আৰু 10 ৰে বিভাজ্য আটাইতকৈ সৰু বৰ্গ সংখ্যা —"
   },
   "options": [
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "3600",
     "as": "৩৬০০"
    },
    {
     "en": "900",
     "as": "৯০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM = 60 = 2^2 x 3 x 5; multiply by 15 to make a square, giving 900.",
    "as": "ল.সা.গু. = 60 = 2^2 x 3 x 5; 15 ৰে পূৰণ কৰিলে 900।"
   }
  },
  {
   "id": "lcm-hcf-023",
   "q": {
    "en": "The smallest square number divisible by 6, 9 and 15 is —",
    "as": "6, 9 আৰু 15 ৰে বিভাজ্য আটাইতকৈ সৰু বৰ্গ সংখ্যা —"
   },
   "options": [
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "225",
     "as": "২২৫"
    },
    {
     "en": "1800",
     "as": "১৮০০"
    },
    {
     "en": "900",
     "as": "৯০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM = 90 = 2 x 3^2 x 5; multiply by 2 x 5 = 10, giving 900.",
    "as": "ল.সা.গু. = 90 = 2 x 3^2 x 5; 2 x 5 = 10 ৰে পূৰণ কৰিলে 900।"
   }
  },
  {
   "id": "lcm-hcf-024",
   "q": {
    "en": "The greatest 4-digit number exactly divisible by 15 is —",
    "as": "15 ৰে নিখুঁতভাৱে বিভাজ্য আটাইতকৈ ডাঙৰ 4-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "9985",
     "as": "৯৯৮৫"
    },
    {
     "en": "9999",
     "as": "৯৯৯৯"
    },
    {
     "en": "9995",
     "as": "৯৯৯৫"
    },
    {
     "en": "9990",
     "as": "৯৯৯০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "9999 ÷ 15 leaves remainder 9, so 9999 - 9 = 9990.",
    "as": "9999 ÷ 15 ৰ ভাগশেষ 9, গতিকে 9999 - 9 = 9990।"
   }
  },
  {
   "id": "lcm-hcf-025",
   "q": {
    "en": "The greatest number of 5 digits exactly divisible by 12 is —",
    "as": "12 ৰে নিখুঁতভাৱে বিভাজ্য আটাইতকৈ ডাঙৰ 5-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "99988",
     "as": "৯৯৯৮৮"
    },
    {
     "en": "99984",
     "as": "৯৯৯৮৪"
    },
    {
     "en": "99996",
     "as": "৯৯৯৯৬"
    },
    {
     "en": "99990",
     "as": "৯৯৯৯০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "99999 ÷ 12 leaves remainder 3, so 99999 - 3 = 99996.",
    "as": "99999 ÷ 12 ৰ ভাগশেষ 3, গতিকে 99999 - 3 = 99996।"
   }
  },
  {
   "id": "lcm-hcf-026",
   "q": {
    "en": "The least number of 4 digits exactly divisible by 18 is —",
    "as": "18 ৰে নিখুঁতভাৱে বিভাজ্য আটাইতকৈ সৰু 4-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "1008",
     "as": "১০০৮"
    },
    {
     "en": "1000",
     "as": "১০০০"
    },
    {
     "en": "1010",
     "as": "১০১০"
    },
    {
     "en": "1080",
     "as": "১০৮০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1000 ÷ 18 leaves remainder 10, so 1000 + 8 = 1008.",
    "as": "1000 ÷ 18 ৰ ভাগশেষ 10, গতিকে 1000 + 8 = 1008।"
   }
  },
  {
   "id": "lcm-hcf-027",
   "q": {
    "en": "If two numbers are 24 and 36, the ratio of their HCF to their LCM is —",
    "as": "দুটা সংখ্যা 24 আৰু 36 হ'লে সিহঁতৰ গ.সা.উ. আৰু ল.সা.গু.ৰ অনুপাত —"
   },
   "options": [
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "1 : 12",
     "as": "১ : ১২"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "1 : 6",
     "as": "১ : ৬"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "HCF = 12 and LCM = 72, so 12 : 72 = 1 : 6.",
    "as": "গ.সা.উ. = 12 আৰু ল.সা.গু. = 72, গতিকে 12 : 72 = 1 : 6।"
   }
  },
  {
   "id": "lcm-hcf-028",
   "q": {
    "en": "The HCF of 12, 18 and 24 is —",
    "as": "12, 18 আৰু 24 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "12 = 2^2x3, 18 = 2x3^2, 24 = 2^3x3, so HCF = 2x3 = 6.",
    "as": "12 = 2^2x3, 18 = 2x3^2, 24 = 2^3x3, গতিকে গ.সা.উ. = 6।"
   }
  },
  {
   "id": "lcm-hcf-029",
   "q": {
    "en": "The LCM of 5, 10 and 15 is —",
    "as": "5, 10 আৰু 15 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM = 2 x 3 x 5 = 30.",
    "as": "ল.সা.গু. = 2 x 3 x 5 = 30।"
   }
  },
  {
   "id": "lcm-hcf-030",
   "q": {
    "en": "The HCF of two numbers is 8 and their LCM is 96. If one number is 24, the other is —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. 8 আৰু ল.সা.গু. 96। এটা 24 হ'লে আনটো —"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "64",
     "as": "৬৪"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Other = 8 x 96 / 24 = 32.",
    "as": "আনটো = 8 x 96 / 24 = 32।"
   }
  },
  {
   "id": "lcm-hcf-031",
   "q": {
    "en": "The largest number which divides 245 and 1029 leaving remainder 5 in each case is —",
    "as": "245 আৰু 1029 ক হৰণ কৰিলে প্ৰতিটোতে ভাগশেষ 5 এৰি যোৱা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "240 and 1024 have HCF 16.",
    "as": "240 আৰু 1024 ৰ গ.সা.উ. 16।"
   }
  },
  {
   "id": "lcm-hcf-032",
   "q": {
    "en": "The least number which is exactly divisible by 12, 15 and 20 is —",
    "as": "12, 15 আৰু 20 ৰে নিখুঁতভাৱে বিভাজ্য আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM of 12, 15 and 20 is 60.",
    "as": "12, 15 আৰু 20 ৰ ল.সা.গু. 60।"
   }
  },
  {
   "id": "lcm-hcf-033",
   "q": {
    "en": "The greatest common divisor of 84 and 126 is —",
    "as": "84 আৰু 126 ৰ আটাইতকৈ ডাঙৰ সাধাৰণ উৎপাদক —"
   },
   "options": [
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "63",
     "as": "৬৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "84 = 2^2x3x7 and 126 = 2x3^2x7, so the HCF is 2x3x7 = 42.",
    "as": "84 = 2^2x3x7 আৰু 126 = 2x3^2x7, গতিকে গ.সা.উ. = 42।"
   }
  },
  {
   "id": "lcm-hcf-034",
   "q": {
    "en": "The LCM of 16 and 20 is —",
    "as": "16 আৰু 20 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "80",
     "as": "৮০"
    },
    {
     "en": "320",
     "as": "৩২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "16 = 2^4 and 20 = 2^2 x 5, so LCM = 2^4 x 5 = 80.",
    "as": "16 = 2^4 আৰু 20 = 2^2 x 5, গতিকে ল.সা.গু. = 80।"
   }
  },
  {
   "id": "lcm-hcf-035",
   "q": {
    "en": "The HCF of 96 and 144 is —",
    "as": "96 আৰু 144 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "72",
     "as": "৭২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "96 = 2^5 x 3 and 144 = 2^4 x 3^2, so HCF = 2^4 x 3 = 48.",
    "as": "96 = 2^5 x 3 আৰু 144 = 2^4 x 3^2, গতিকে গ.সা.উ. = 48।"
   }
  },
  {
   "id": "lcm-hcf-036",
   "q": {
    "en": "The LCM of 3, 5 and 7 is —",
    "as": "3, 5 আৰু 7 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "105",
     "as": "১০৫"
    },
    {
     "en": "210",
     "as": "২১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "All three are prime, so LCM = 105.",
    "as": "তিনিওটা মৌলিক, গতিকে ল.সা.গু. = 105।"
   }
  },
  {
   "id": "lcm-hcf-037",
   "q": {
    "en": "If the HCF of two numbers is 1, the numbers are called —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. 1 হ'লে সংখ্যা দুটাক কোৱা হয় —"
   },
   "options": [
    {
     "en": "prime numbers",
     "as": "মৌলিক সংখ্যা"
    },
    {
     "en": "composite numbers",
     "as": "যৌগিক সংখ্যা"
    },
    {
     "en": "twin primes",
     "as": "যমজ মৌলিক"
    },
    {
     "en": "co-prime numbers",
     "as": "সহ-মৌলিক সংখ্যা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Numbers whose only common factor is 1 are co-prime.",
    "as": "যিবোৰ সংখ্যাৰ একমাত্ৰ সাধাৰণ উৎপাদক 1, সেইবোৰ সহ-মৌলিক।"
   }
  },
  {
   "id": "lcm-hcf-038",
   "q": {
    "en": "The smallest number that must be added to 1000 to make it divisible by 11 is —",
    "as": "1000 ক 11 ৰে বিভাজ্য কৰিবলৈ যোগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "11",
     "as": "১১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1001 = 11 x 91, so add 1.",
    "as": "1001 = 11 x 91, গতিকে 1 যোগ কৰিব লাগে।"
   }
  },
  {
   "id": "lcm-hcf-039",
   "q": {
    "en": "The number of common factors of 18 and 24 is —",
    "as": "18 আৰু 24 ৰ সাধাৰণ উৎপাদকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The common factors are 1, 2, 3 and 6, so there are 4.",
    "as": "সাধাৰণ উৎপাদকবোৰ 1, 2, 3 আৰু 6, গতিকে মুঠ 4।"
   }
  },
  {
   "id": "lcm-hcf-040",
   "q": {
    "en": "The HCF of 7, 14 and 21 is —",
    "as": "7, 14 আৰু 21 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "7",
     "as": "৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "All are multiples of 7 and 7 is prime.",
    "as": "সকলো 7 ৰ গুণিতক আৰু 7 মৌলিক।"
   }
  },
  {
   "id": "lcm-hcf-041",
   "q": {
    "en": "The LCM of 2, 4, 6 and 8 is —",
    "as": "2, 4, 6 আৰু 8 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "96",
     "as": "৯৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM = 2^3 x 3 = 24.",
    "as": "ল.সা.গু. = 2^3 x 3 = 24।"
   }
  },
  {
   "id": "lcm-hcf-042",
   "q": {
    "en": "The HCF of 121 and 33 is —",
    "as": "121 আৰু 33 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "121",
     "as": "১২১"
    },
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "11",
     "as": "১১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "121 = 11^2 and 33 = 3 x 11, so HCF = 11.",
    "as": "121 = 11^2 আৰু 33 = 3 x 11, গতিকে গ.সা.উ. = 11।"
   }
  },
  {
   "id": "lcm-hcf-043",
   "q": {
    "en": "The smallest number divisible by both 8 and 12 is —",
    "as": "8 আৰু 12 দুয়োটাৰে বিভাজ্য আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "96",
     "as": "৯৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM of 8 and 12 is 24.",
    "as": "8 আৰু 12 ৰ ল.সা.গু. 24।"
   }
  },
  {
   "id": "lcm-hcf-044",
   "q": {
    "en": "The HCF of 0.12 and 0.18 is —",
    "as": "0.12 আৰু 0.18 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "0.6",
     "as": "০.৬"
    },
    {
     "en": "0.006",
     "as": "০.০০৬"
    },
    {
     "en": "0.06",
     "as": "০.০৬"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Write as 12/100 and 18/100; HCF is 6/100 = 0.06.",
    "as": "12/100 আৰু 18/100 হিচাপে লিখিলে গ.সা.উ. 6/100 = 0.06।"
   }
  },
  {
   "id": "lcm-hcf-045",
   "q": {
    "en": "If a number is a multiple of 12, it is also a multiple of —",
    "as": "এটা সংখ্যা 12 ৰ গুণিতক হ'লে সেয়া অৱশ্যে গুণিতক —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "4 is a factor of 12, so every multiple of 12 is a multiple of 4.",
    "as": "4 হৈছে 12 ৰ উৎপাদক, গতিকে 12 ৰ প্ৰতিটো গুণিতক 4 ৰ গুণিতক।"
   }
  },
  {
   "id": "lcm-hcf-046",
   "q": {
    "en": "The LCM of 25 and 40 is —",
    "as": "25 আৰু 40 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "1000",
     "as": "১০০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "25 = 5^2 and 40 = 2^3 x 5, so LCM = 2^3 x 5^2 = 200.",
    "as": "25 = 5^2 আৰু 40 = 2^3 x 5, গতিকে ল.সা.গু. = 200।"
   }
  },
  {
   "id": "lcm-hcf-047",
   "q": {
    "en": "The HCF of 18, 27 and 36 is —",
    "as": "18, 27 আৰু 36 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "18 = 2x3^2, 27 = 3^3, 36 = 2^2x3^2, so HCF = 3^2 = 9.",
    "as": "18 = 2x3^2, 27 = 3^3, 36 = 2^2x3^2, গতিকে গ.সা.উ. = 9।"
   }
  },
  {
   "id": "lcm-hcf-048",
   "q": {
    "en": "The least common multiple of 6 and 15 is —",
    "as": "6 আৰু 15 ৰ লঘিষ্ঠ সাধাৰণ গুণিতক —"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "6 = 2x3 and 15 = 3x5, so LCM = 2x3x5 = 30.",
    "as": "6 = 2x3 আৰু 15 = 3x5, গতিকে ল.সা.গু. = 30।"
   }
  },
  {
   "id": "lcm-hcf-049",
   "q": {
    "en": "The number of times the HCF of 8 and 12 is contained in their LCM is —",
    "as": "8 আৰু 12 ৰ গ.সা.উ. সিহঁতৰ ল.সা.গু.ত যিমানবাৰ থাকে —"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "HCF = 4 and LCM = 24, and 24 / 4 = 6.",
    "as": "গ.সা.উ. = 4 আৰু ল.সা.গু. = 24, আৰু 24 / 4 = 6।"
   }
  },
  {
   "id": "lcm-hcf-050",
   "q": {
    "en": "The greatest number that divides 25 and 45 exactly is —",
    "as": "25 আৰু 45 ক নিখুঁতভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "25 = 5^2 and 45 = 3^2 x 5, so the HCF is 5.",
    "as": "25 = 5^2 আৰু 45 = 3^2 x 5, গতিকে গ.সা.উ. = 5।"
   }
  },
  {
   "id": "lcm-hcf-051",
   "q": {
    "en": "The LCM of 11 and 22 is —",
    "as": "11 আৰু 22 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "22",
     "as": "২২"
    },
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "242",
     "as": "২৪২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "22 is a multiple of 11, so the LCM is 22.",
    "as": "22 হৈছে 11 ৰ গুণিতক, গতিকে ল.সা.গু. 22।"
   }
  },
  {
   "id": "lcm-hcf-052",
   "q": {
    "en": "The HCF of two numbers is 6 and their LCM is 60. If one number is 12, the other is —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. 6 আৰু ল.সা.গু. 60। এটা 12 হ'লে আনটো —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Other = 6 x 60 / 12 = 30.",
    "as": "আনটো = 6 x 60 / 12 = 30।"
   }
  },
  {
   "id": "lcm-hcf-053",
   "q": {
    "en": "The smallest number that is divisible by 5, 10 and 15 is —",
    "as": "5, 10 আৰু 15 ৰে বিভাজ্য আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM of 5, 10 and 15 is 30.",
    "as": "5, 10 আৰু 15 ৰ ল.সা.গু. 30।"
   }
  },
  {
   "id": "lcm-hcf-054",
   "q": {
    "en": "The HCF of 64 and 80 is —",
    "as": "64 আৰু 80 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "64 = 2^6 and 80 = 2^4 x 5, so HCF = 2^4 = 16.",
    "as": "64 = 2^6 আৰু 80 = 2^4 x 5, গতিকে গ.সা.উ. = 16।"
   }
  },
  {
   "id": "lcm-hcf-055",
   "q": {
    "en": "The LCM of 14 and 21 is —",
    "as": "14 আৰু 21 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "84",
     "as": "৮৪"
    },
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "294",
     "as": "২৯৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "14 = 2x7 and 21 = 3x7, so LCM = 2x3x7 = 42.",
    "as": "14 = 2x7 আৰু 21 = 3x7, গতিকে ল.সা.গু. = 42।"
   }
  },
  {
   "id": "lcm-hcf-056",
   "q": {
    "en": "The smallest number which when divided by 8, 12 and 16 leaves no remainder is —",
    "as": "8, 12 আৰু 16 ৰে হৰণ কৰিলে কোনো ভাগশেষ নথকা আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "96",
     "as": "৯৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM of 8, 12 and 16 is 48.",
    "as": "8, 12 আৰু 16 ৰ ল.সা.গু. 48।"
   }
  },
  {
   "id": "lcm-hcf-057",
   "q": {
    "en": "The HCF of 105 and 154 is —",
    "as": "105 আৰু 154 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "7",
     "as": "৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "105 = 3x5x7 and 154 = 2x7x11, so HCF = 7.",
    "as": "105 = 3x5x7 আৰু 154 = 2x7x11, গতিকে গ.সা.উ. = 7।"
   }
  },
  {
   "id": "lcm-hcf-058",
   "q": {
    "en": "The LCM of 1/2 and 1/3 is —",
    "as": "1/2 আৰু 1/3 ৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM of fractions = LCM of numerators / HCF of denominators = 1/1 = 1.",
    "as": "ভগ্নাংশৰ ল.সা.গু. = লৱৰ ল.সা.গু. / হৰৰ গ.সা.উ. = 1/1 = 1।"
   }
  },
  {
   "id": "lcm-hcf-059",
   "q": {
    "en": "The HCF of 1/2 and 1/3 is —",
    "as": "1/2 আৰু 1/3 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "HCF of fractions = HCF of numerators / LCM of denominators = 1/6.",
    "as": "ভগ্নাংশৰ গ.সা.উ. = লৱৰ গ.সা.উ. / হৰৰ ল.সা.গু. = 1/6।"
   }
  },
  {
   "id": "lcm-hcf-060",
   "q": {
    "en": "The greatest number that divides 250 and 175 exactly is —",
    "as": "250 আৰু 175 ক নিখুঁতভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "50",
     "as": "৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "250 = 2 x 5^3 and 175 = 5^2 x 7, so the HCF is 25.",
    "as": "250 = 2 x 5^3 আৰু 175 = 5^2 x 7, গতিকে গ.সা.উ. 25।"
   }
  },
  {
   "id": "lcm-hcf-061",
   "q": {
    "en": "The HCF of 39 and 65 is —",
    "as": "39 আৰু 65 ৰ গ.সা.উ. —"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "39",
     "as": "৩৯"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "39 = 3 x 13 and 65 = 5 x 13, so the HCF is 13.",
    "as": "39 = 3 x 13 আৰু 65 = 5 x 13, গতিকে গ.সা.উ. 13।"
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
     "en": "7",
     "as": "৭"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "70000",
     "as": "৭০০০০"
    },
    {
     "en": "7000",
     "as": "৭০০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "7 stands in the ten-thousands place, so its place value is 70,000.",
    "as": "7 দহ-হাজাৰৰ স্থানত আছে, গতিকে স্থানীয় মান 70,000।"
   }
  },
  {
   "id": "number-system-002",
   "q": {
    "en": "The face value of the digit 8 in 5,863 is —",
    "as": "5,863 সংখ্যাটোত 8 অংকটোৰ অভিহিত মান —"
   },
   "options": [
    {
     "en": "8000",
     "as": "৮০০০"
    },
    {
     "en": "80",
     "as": "৮০"
    },
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Face value is the digit itself, so it is 8.",
    "as": "অভিহিত মান হৈছে অংকটো নিজেই, গতিকে 8।"
   }
  },
  {
   "id": "number-system-003",
   "q": {
    "en": "The natural numbers start from the number —",
    "as": "স্বাভাৱিক সংখ্যা কোনটো সংখ্যাৰ পৰা আৰম্ভ হয় —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
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
     "en": "-1",
     "as": "-১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Natural numbers begin at 1.",
    "as": "স্বাভাৱিক সংখ্যা 1 ৰ পৰা আৰম্ভ হয়।"
   }
  },
  {
   "id": "number-system-004",
   "q": {
    "en": "The whole numbers start from the number —",
    "as": "পূৰ্ণ সংখ্যা কোনটো সংখ্যাৰ পৰা আৰম্ভ হয় —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "-1",
     "as": "-১"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "2",
     "as": "২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Whole numbers begin at 0.",
    "as": "পূৰ্ণ সংখ্যা 0 ৰ পৰা আৰম্ভ হয়।"
   }
  },
  {
   "id": "number-system-005",
   "q": {
    "en": "The number of prime numbers between 1 and 20 is —",
    "as": "1 ৰ পৰা 20 ৰ ভিতৰত মৌলিক সংখ্যাৰ সংখ্যা —"
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
     "en": "7",
     "as": "৭"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "They are 2, 3, 5, 7, 11, 13, 17 and 19, so there are 8.",
    "as": "সেইবোৰ হৈছে 2, 3, 5, 7, 11, 13, 17 আৰু 19, গতিকে মুঠ 8।"
   }
  },
  {
   "id": "number-system-006",
   "q": {
    "en": "The smallest odd prime number is —",
    "as": "আটাইতকৈ সৰু অযুগ্ম মৌলিক সংখ্যা —"
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
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "2 is prime but even; the smallest odd prime is 3.",
    "as": "2 মৌলিক কিন্তু যুগ্ম; আটাইতকৈ সৰু অযুগ্ম মৌলিক 3।"
   }
  },
  {
   "id": "number-system-007",
   "q": {
    "en": "The number 1 is —",
    "as": "1 সংখ্যাটো —"
   },
   "options": [
    {
     "en": "a prime number",
     "as": "মৌলিক সংখ্যা"
    },
    {
     "en": "a composite number",
     "as": "যৌগিক সংখ্যা"
    },
    {
     "en": "an even number",
     "as": "যুগ্ম সংখ্যা"
    },
    {
     "en": "neither prime nor composite",
     "as": "মৌলিক বা যৌগিক দুয়োটাই নহয়"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1 has only one factor, so it is neither prime nor composite.",
    "as": "1 ৰ এটা উৎপাদকহে আছে, গতিকে ই মৌলিক বা যৌগিক দুয়োটাই নহয়।"
   }
  },
  {
   "id": "number-system-008",
   "q": {
    "en": "The sum of the first 20 natural numbers is —",
    "as": "প্ৰথম 20 টা স্বাভাৱিক সংখ্যাৰ যোগফল —"
   },
   "options": [
    {
     "en": "210",
     "as": "২১০"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "190",
     "as": "১৯০"
    },
    {
     "en": "220",
     "as": "২২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sum = n(n+1)/2 = 20 x 21 / 2 = 210.",
    "as": "যোগফল = n(n+1)/2 = 20 x 21 / 2 = 210।"
   }
  },
  {
   "id": "number-system-009",
   "q": {
    "en": "The sum of the first 10 even numbers is —",
    "as": "প্ৰথম 10 টা যুগ্ম সংখ্যাৰ যোগফল —"
   },
   "options": [
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "110",
     "as": "১১০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Sum = n(n+1) = 10 x 11 = 110.",
    "as": "যোগফল = n(n+1) = 10 x 11 = 110।"
   }
  },
  {
   "id": "number-system-010",
   "q": {
    "en": "The sum of the first 10 odd numbers is —",
    "as": "প্ৰথম 10 টা অযুগ্ম সংখ্যাৰ যোগফল —"
   },
   "options": [
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "121",
     "as": "১২১"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The sum of the first n odd numbers is n^2 = 100.",
    "as": "প্ৰথম n টা অযুগ্ম সংখ্যাৰ যোগফল n^2 = 100।"
   }
  },
  {
   "id": "number-system-011",
   "q": {
    "en": "Which of the numbers 87, 89, 91 and 93 is prime?",
    "as": "87, 89, 91 আৰু 93 ৰ ভিতৰত কোনটো মৌলিক সংখ্যা?"
   },
   "options": [
    {
     "en": "87",
     "as": "৮৭"
    },
    {
     "en": "89",
     "as": "৮৯"
    },
    {
     "en": "91",
     "as": "৯১"
    },
    {
     "en": "93",
     "as": "৯৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "89 has no divisor other than 1 and itself; 87 = 3 x 29 and 91 = 7 x 13.",
    "as": "89 ৰ 1 আৰু নিজৰ বাহিৰে কোনো ভাজক নাই; 87 = 3 x 29 আৰু 91 = 7 x 13।"
   }
  },
  {
   "id": "number-system-012",
   "q": {
    "en": "The largest two-digit prime number is —",
    "as": "আটাইতকৈ ডাঙৰ দুই-অংকৰ মৌলিক সংখ্যা —"
   },
   "options": [
    {
     "en": "89",
     "as": "৮৯"
    },
    {
     "en": "97",
     "as": "৯৭"
    },
    {
     "en": "91",
     "as": "৯১"
    },
    {
     "en": "99",
     "as": "৯৯"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "99, 98, 96 and 95 are composite; 97 is prime.",
    "as": "99, 98, 96 আৰু 95 যৌগিক; 97 মৌলিক।"
   }
  },
  {
   "id": "number-system-013",
   "q": {
    "en": "The number of prime numbers between 20 and 30 is —",
    "as": "20 আৰু 30 ৰ মাজত মৌলিক সংখ্যাৰ সংখ্যা —"
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
     "en": "4",
     "as": "৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "They are 23 and 29, so there are 2.",
    "as": "সেইবোৰ হৈছে 23 আৰু 29, গতিকে মুঠ 2।"
   }
  },
  {
   "id": "number-system-014",
   "q": {
    "en": "The number of factors of 36 is —",
    "as": "36 ৰ উৎপাদকৰ সংখ্যা —"
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
     "en": "6",
     "as": "৬"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "36 = 2^2 x 3^2, so the number of factors is (2+1)(2+1) = 9.",
    "as": "36 = 2^2 x 3^2, গতিকে উৎপাদকৰ সংখ্যা (2+1)(2+1) = 9।"
   }
  },
  {
   "id": "number-system-015",
   "q": {
    "en": "The number of factors of 48 is —",
    "as": "48 ৰ উৎপাদকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
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
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "48 = 2^4 x 3, so the number of factors is (4+1)(1+1) = 10.",
    "as": "48 = 2^4 x 3, গতিকে উৎপাদকৰ সংখ্যা (4+1)(1+1) = 10।"
   }
  },
  {
   "id": "number-system-016",
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
     "en": "7530",
     "as": "৭৫৩০"
    },
    {
     "en": "7350",
     "as": "৭৩৫০"
    },
    {
     "en": "7053",
     "as": "৭০৫৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Arranging the digits in descending order 7, 5, 3, 0 gives 7530.",
    "as": "অংকবোৰ অৱৰোহী ক্ৰমত 7, 5, 3, 0 সজালে 7530 পোৱা যায়।"
   }
  },
  {
   "id": "number-system-017",
   "q": {
    "en": "The smallest 4-digit number formed by the digits 3, 0, 7 and 5 (each used once) is —",
    "as": "3, 0, 7 আৰু 5 অংকৰে (প্ৰতিটো এবাৰ) গঠন কৰা আটাইতকৈ সৰু 4-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "0357",
     "as": "০৩৫৭"
    },
    {
     "en": "3057",
     "as": "৩০৫৭"
    },
    {
     "en": "3075",
     "as": "৩০৭৫"
    },
    {
     "en": "3507",
     "as": "৩৫০৭"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "0 cannot lead, so the smallest arrangement is 3057.",
    "as": "0 ৰে আৰম্ভ কৰিব নোৱাৰি, গতিকে আটাইতকৈ সৰু সজ্জা 3057।"
   }
  },
  {
   "id": "number-system-018",
   "q": {
    "en": "A number is divisible by 9 if —",
    "as": "এটা সংখ্যা 9 ৰে বিভাজ্য হ'ব যদিহে —"
   },
   "options": [
    {
     "en": "its last digit is 9",
     "as": "তাৰ শেষ অংকটো ৯ হয়"
    },
    {
     "en": "it is even",
     "as": "সেয়া যুগ্ম হয়"
    },
    {
     "en": "its last two digits form a multiple of 9",
     "as": "তাৰ শেষৰ দুটা অংক ৯ ৰ গুণিতক হয়"
    },
    {
     "en": "the sum of its digits is divisible by 9",
     "as": "তাৰ অংকবোৰৰ যোগফল ৯ ৰে বিভাজ্য হয়"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The divisibility rule for 9 checks the sum of the digits.",
    "as": "9 ৰ বিভাজ্যতাৰ নিয়মত অংকবোৰৰ যোগফল পৰীক্ষা কৰা হয়।"
   }
  },
  {
   "id": "number-system-019",
   "q": {
    "en": "A number is divisible by 4 if —",
    "as": "এটা সংখ্যা 4 ৰে বিভাজ্য হ'ব যদিহে —"
   },
   "options": [
    {
     "en": "its last digit is 4",
     "as": "তাৰ শেষ অংকটো ৪ হয়"
    },
    {
     "en": "the sum of its digits is divisible by 4",
     "as": "তাৰ অংকবোৰৰ যোগফল ৪ ৰে বিভাজ্য হয়"
    },
    {
     "en": "the number formed by its last two digits is divisible by 4",
     "as": "তাৰ শেষৰ দুটা অংকৰে গঠিত সংখ্যা ৪ ৰে বিভাজ্য হয়"
    },
    {
     "en": "it ends in 8",
     "as": "ই ৮ ৰে শেষ হয়"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Divisibility by 4 depends only on the last two digits.",
    "as": "4 ৰে বিভাজ্যতা কেৱল শেষৰ দুটা অংকৰ ওপৰত নিৰ্ভৰ কৰে।"
   }
  },
  {
   "id": "number-system-020",
   "q": {
    "en": "A number is divisible by 11 if —",
    "as": "এটা সংখ্যা 11 ৰে বিভাজ্য হ'ব যদিহে —"
   },
   "options": [
    {
     "en": "the sum of the digits in odd places minus the sum in even places is 0 or a multiple of 11",
     "as": "অযুগ্ম স্থানৰ অংকৰ যোগফলৰ পৰা যুগ্ম স্থানৰ যোগফল বিয়োগ কৰিলে ০ বা ১১ ৰ গুণিতক হয়"
    },
    {
     "en": "its last digit is 1",
     "as": "তাৰ শেষ অংকটো ১ হয়"
    },
    {
     "en": "it is odd",
     "as": "সেয়া অযুগ্ম হয়"
    },
    {
     "en": "the sum of its digits is 11",
     "as": "তাৰ অংকবোৰৰ যোগফল ১১ হয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The alternating-sum rule tests divisibility by 11.",
    "as": "পৰ্যায়ক্ৰমে যোগ-বিয়োগৰ নিয়মে 11 ৰে বিভাজ্যতা পৰীক্ষা কৰে।"
   }
  },
  {
   "id": "number-system-021",
   "q": {
    "en": "The smallest number that must be added to 1234 to make it divisible by 9 is —",
    "as": "1234 ক 9 ৰে বিভাজ্য কৰিবলৈ যোগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যা —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "2",
     "as": "২"
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
   "correct": 0,
   "explanation": {
    "en": "1+2+3+4 = 10; the next multiple of 9 is 18, so add 5.",
    "as": "1+2+3+4 = 10; 9 ৰ পৰৱৰ্তী গুণিতক 18, গতিকে 5 যোগ কৰিব লাগে।"
   }
  },
  {
   "id": "number-system-022",
   "q": {
    "en": "The largest 3-digit number divisible by 11 is —",
    "as": "11 ৰে বিভাজ্য আটাইতকৈ ডাঙৰ 3-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "979",
     "as": "৯৭৯"
    },
    {
     "en": "989",
     "as": "৯৮৯"
    },
    {
     "en": "990",
     "as": "৯৯০"
    },
    {
     "en": "999",
     "as": "৯৯৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "990 = 11 x 90 and is the greatest 3-digit multiple of 11.",
    "as": "990 = 11 x 90 আৰু 11 ৰ আটাইতকৈ ডাঙৰ 3-অংকৰ গুণিতক।"
   }
  },
  {
   "id": "number-system-023",
   "q": {
    "en": "The smallest 4-digit number divisible by 9 is —",
    "as": "9 ৰে বিভাজ্য আটাইতকৈ সৰু 4-অংকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "1008",
     "as": "১০০৮"
    },
    {
     "en": "1000",
     "as": "১০০০"
    },
    {
     "en": "1017",
     "as": "১০১৭"
    },
    {
     "en": "1026",
     "as": "১০২৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1008 ÷ 9 = 112 exactly, while 1000 gives remainder 1.",
    "as": "1008 ÷ 9 = 112 নিখুঁতভাৱে, আনহাতে 1000 ৰ ভাগশেষ 1।"
   }
  },
  {
   "id": "number-system-024",
   "q": {
    "en": "The decimal 0.625 expressed as a fraction in lowest terms is —",
    "as": "0.625 দশমিকক আটাইতকৈ সৰল ৰূপত ভগ্নাংশ হিচাপে প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "7/8",
     "as": "৭/৮"
    },
    {
     "en": "5/16",
     "as": "৫/১৬"
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
   "id": "number-system-025",
   "q": {
    "en": "The fraction 3/8 expressed as a decimal is —",
    "as": "3/8 ভগ্নাংশক দশমিকত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "0.125",
     "as": "০.১২৫"
    },
    {
     "en": "0.375",
     "as": "০.৩৭৫"
    },
    {
     "en": "0.625",
     "as": "০.৬২৫"
    },
    {
     "en": "0.875",
     "as": "০.৮৭৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "3 ÷ 8 = 0.375.",
    "as": "3 ÷ 8 = 0.375।"
   }
  },
  {
   "id": "number-system-026",
   "q": {
    "en": "The recurring decimal 0.333... expressed as a fraction is —",
    "as": "0.333... পুনৰাবৃত্ত দশমিকক ভগ্নাংশত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "1/30",
     "as": "১/৩০"
    },
    {
     "en": "3/10",
     "as": "৩/১০"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "3/100",
     "as": "৩/১০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "0.333... = 3/9 = 1/3.",
    "as": "0.333... = 3/9 = 1/3।"
   }
  },
  {
   "id": "number-system-027",
   "q": {
    "en": "Which of the following numbers is irrational?",
    "as": "তলৰ কোনটো সংখ্যা অপৰিমেয়?"
   },
   "options": [
    {
     "en": "sqrt(25)",
     "as": "sqrt(২৫)"
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
     "en": "sqrt(3)",
     "as": "sqrt(৩)"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "sqrt(3) has a non-terminating, non-repeating decimal expansion.",
    "as": "sqrt(3) ৰ দশমিক বিস্তৃতি অসসীম আৰু অপুনৰাবৃত্তি।"
   }
  },
  {
   "id": "number-system-028",
   "q": {
    "en": "Which of the numbers sqrt(2), pi, 22/7 and sqrt(5) is rational?",
    "as": "sqrt(2), pi, 22/7 আৰু sqrt(5) ৰ ভিতৰত কোনটো পৰিমেয় সংখ্যা?"
   },
   "options": [
    {
     "en": "sqrt(2)",
     "as": "sqrt(২)"
    },
    {
     "en": "pi",
     "as": "pi"
    },
    {
     "en": "sqrt(5)",
     "as": "sqrt(৫)"
    },
    {
     "en": "22/7",
     "as": "২২/৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "22/7 is a fraction of two integers, hence rational.",
    "as": "22/7 দুটা পূৰ্ণ সংখ্যাৰ ভগ্নাংশ, গতিকে পৰিমেয়।"
   }
  },
  {
   "id": "number-system-029",
   "q": {
    "en": "The decimal 2.75 expressed as a mixed fraction is —",
    "as": "2.75 দশমিকক মিশ্ৰ ভগ্নাংশত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "2 1/2",
     "as": "২ ১/২"
    },
    {
     "en": "2 4/5",
     "as": "২ ৪/৫"
    },
    {
     "en": "2 3/4",
     "as": "২ ৩/৪"
    },
    {
     "en": "2 7/10",
     "as": "২ ৭/১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "0.75 = 3/4, so 2.75 = 2 3/4.",
    "as": "0.75 = 3/4, গতিকে 2.75 = 2 3/4।"
   }
  },
  {
   "id": "number-system-030",
   "q": {
    "en": "Which is greater: 3/5 or 5/8?",
    "as": "কোনটো ডাঙৰ: 3/5 নে 5/8?"
   },
   "options": [
    {
     "en": "3/5",
     "as": "৩/৫"
    },
    {
     "en": "both are equal",
     "as": "দুয়োটা সমান"
    },
    {
     "en": "5/8",
     "as": "৫/৮"
    },
    {
     "en": "cannot be compared",
     "as": "তুলনা কৰিব নোৱাৰি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "3/5 = 0.6 and 5/8 = 0.625, so 5/8 is greater.",
    "as": "3/5 = 0.6 আৰু 5/8 = 0.625, গতিকে 5/8 ডাঙৰ।"
   }
  },
  {
   "id": "number-system-031",
   "q": {
    "en": "The largest of the fractions 1/2, 2/3, 3/4 and 4/5 is —",
    "as": "1/2, 2/3, 3/4 আৰু 4/5 ভগ্নাংশৰ আটাইতকৈ ডাঙৰটো —"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "4/5",
     "as": "৪/৫"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "As decimals they are 0.5, 0.67, 0.75 and 0.8, so 4/5 is largest.",
    "as": "দশমিকত সেইবোৰ 0.5, 0.67, 0.75 আৰু 0.8, গতিকে 4/5 আটাইতকৈ ডাঙৰ।"
   }
  },
  {
   "id": "number-system-032",
   "q": {
    "en": "The unit digit of 7^4 is —",
    "as": "7^4 ৰ একক স্থানৰ অংক —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "3",
     "as": "৩"
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
   "correct": 0,
   "explanation": {
    "en": "7^2 = 49, 7^4 = 2401, so the unit digit is 1.",
    "as": "7^2 = 49, 7^4 = 2401, গতিকে একক স্থানৰ অংক 1।"
   }
  },
  {
   "id": "number-system-033",
   "q": {
    "en": "The unit digit of 3^5 is —",
    "as": "3^5 ৰ একক স্থানৰ অংক —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "3",
     "as": "৩"
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
   "correct": 1,
   "explanation": {
    "en": "3, 9, 7, 1 repeats with period 4; 3^5 = 243, so the unit digit is 3.",
    "as": "3, 9, 7, 1 চাৰিৰ পৰ্যায়ত পুনৰাবৃত্তি হয়; 3^5 = 243, গতিকে একক অংক 3।"
   }
  },
  {
   "id": "number-system-034",
   "q": {
    "en": "The value of sqrt(1764) is —",
    "as": "sqrt(1764) ৰ মান —"
   },
   "options": [
    {
     "en": "38",
     "as": "৩৮"
    },
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "46",
     "as": "৪৬"
    },
    {
     "en": "48",
     "as": "৪৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "42 x 42 = 1764.",
    "as": "42 x 42 = 1764।"
   }
  },
  {
   "id": "number-system-035",
   "q": {
    "en": "The value of sqrt(0.0081) is —",
    "as": "sqrt(0.0081) ৰ মান —"
   },
   "options": [
    {
     "en": "0.09",
     "as": "০.০৯"
    },
    {
     "en": "0.009",
     "as": "০.০০৯"
    },
    {
     "en": "0.9",
     "as": "০.৯"
    },
    {
     "en": "0.03",
     "as": "০.০৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "sqrt(81) = 9 with four decimal places halved, giving 0.09.",
    "as": "sqrt(81) = 9, চাৰি দশমিক স্থান আধা কৰিলে 0.09।"
   }
  },
  {
   "id": "number-system-036",
   "q": {
    "en": "The value of sqrt(2.25) is —",
    "as": "sqrt(2.25) ৰ মান —"
   },
   "options": [
    {
     "en": "1.5",
     "as": "১.৫"
    },
    {
     "en": "1.25",
     "as": "১.২৫"
    },
    {
     "en": "1.15",
     "as": "১.১৫"
    },
    {
     "en": "2.5",
     "as": "২.৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1.5 x 1.5 = 2.25.",
    "as": "1.5 x 1.5 = 2.25।"
   }
  },
  {
   "id": "number-system-037",
   "q": {
    "en": "The cube of 12 is —",
    "as": "12 ৰ ঘন —"
   },
   "options": [
    {
     "en": "144",
     "as": "১৪৪"
    },
    {
     "en": "1331",
     "as": "১৩৩১"
    },
    {
     "en": "1728",
     "as": "১৭২৮"
    },
    {
     "en": "2197",
     "as": "২১৯৭"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "12 x 12 x 12 = 1728.",
    "as": "12 x 12 x 12 = 1728।"
   }
  },
  {
   "id": "number-system-038",
   "q": {
    "en": "The cube root of 343 is —",
    "as": "343 ৰ ঘনমূল —"
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
     "en": "7",
     "as": "৭"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "7 x 7 x 7 = 343.",
    "as": "7 x 7 x 7 = 343।"
   }
  },
  {
   "id": "number-system-039",
   "q": {
    "en": "The cube root of 1000 is —",
    "as": "1000 ৰ ঘনমূল —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "31.6",
     "as": "৩১.৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "10 x 10 x 10 = 1000.",
    "as": "10 x 10 x 10 = 1000।"
   }
  },
  {
   "id": "number-system-040",
   "q": {
    "en": "The smallest number by which 72 must be multiplied to make it a perfect square is —",
    "as": "72 ক পূৰ্ণ বৰ্গ কৰিবলৈ যি আটাইতকৈ সৰু সংখ্যাৰে পূৰণ কৰিব লাগে —"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "72 = 2^3 x 3^2; one 2 is unpaired, so multiply by 2.",
    "as": "72 = 2^3 x 3^2; এটা 2 ৰ যোৰ নাই, গতিকে 2 ৰে পূৰণ কৰিব লাগে।"
   }
  },
  {
   "id": "number-system-041",
   "q": {
    "en": "The smallest number by which 108 must be divided to make it a perfect square is —",
    "as": "108 ক পূৰ্ণ বৰ্গ কৰিবলৈ যি আটাইতকৈ সৰু সংখ্যাৰে হৰণ কৰিব লাগে —"
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
     "en": "6",
     "as": "৬"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "108 = 2^2 x 3^3; the unpaired 3 must go, so divide by 3.",
    "as": "108 = 2^2 x 3^3; যোৰহীন 3 আঁতৰাব লাগে, গতিকে 3 ৰে হৰণ কৰিব লাগে।"
   }
  },
  {
   "id": "number-system-042",
   "q": {
    "en": "The sum of the digits of 98765 is —",
    "as": "98765 ৰ অংকবোৰৰ যোগফল —"
   },
   "options": [
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "37",
     "as": "৩৭"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "39",
     "as": "৩৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "9+8+7+6+5 = 35.",
    "as": "9+8+7+6+5 = 35।"
   }
  },
  {
   "id": "number-system-043",
   "q": {
    "en": "The number of integers between -5 and 5 is —",
    "as": "-5 আৰু 5 ৰ মাজত থকা পূৰ্ণ সংখ্যাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "They are -4 to 4, which is 9 integers.",
    "as": "সেইবোৰ -4 ৰ পৰা 4 লৈকে, অৰ্থাৎ 9 টা পূৰ্ণ সংখ্যা।"
   }
  },
  {
   "id": "number-system-044",
   "q": {
    "en": "The value of | -15 | is —",
    "as": "| -15 | ৰ মান —"
   },
   "options": [
    {
     "en": "-15",
     "as": "-১৫"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The absolute value of a negative number is its positive value.",
    "as": "ঋণাত্মক সংখ্যাৰ নিখুঁত মান হৈছে তাৰ ধনাত্মক মান।"
   }
  },
  {
   "id": "number-system-045",
   "q": {
    "en": "What is the successor of 989?",
    "as": "989 ৰ পৰৱৰ্তী সংখ্যা কিমান?"
   },
   "options": [
    {
     "en": "988",
     "as": "৯৮৮"
    },
    {
     "en": "991",
     "as": "৯৯১"
    },
    {
     "en": "990",
     "as": "৯৯০"
    },
    {
     "en": "989",
     "as": "৯৮৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The successor is the number plus one, so 989 + 1 = 990.",
    "as": "পৰৱৰ্তী সংখ্যা হৈছে সংখ্যাটোৰ লগত এক যোগ কৰা মান, গতিকে 989 + 1 = 990।"
   }
  },
  {
   "id": "number-system-046",
   "q": {
    "en": "What is the predecessor of 1,000?",
    "as": "1,000 ৰ পূৰ্বৱৰ্তী সংখ্যা কিমান?"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "1,001",
     "as": "১,০০১"
    },
    {
     "en": "990",
     "as": "৯৯০"
    },
    {
     "en": "999",
     "as": "৯৯৯"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The predecessor is the number minus one, so 1,000 - 1 = 999.",
    "as": "পূৰ্বৱৰ্তী সংখ্যা হৈছে সংখ্যাটোৰ পৰা এক বিয়োগ কৰা মান, গতিকে 1,000 - 1 = 999।"
   }
  },
  {
   "id": "number-system-047",
   "q": {
    "en": "The number of two-digit numbers divisible by 7 is —",
    "as": "7 ৰে বিভাজ্য দুই-অংকৰ সংখ্যাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "15",
     "as": "১৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "They run from 14 to 98, giving 13 numbers.",
    "as": "সেইবোৰ 14 ৰ পৰা 98 লৈকে, মুঠ 13 টা।"
   }
  },
  {
   "id": "number-system-048",
   "q": {
    "en": "The sum 1 + 2 + 3 + ... + 50 is —",
    "as": "1 + 2 + 3 + ... + 50 যোগফল —"
   },
   "options": [
    {
     "en": "1275",
     "as": "১২৭৫"
    },
    {
     "en": "1250",
     "as": "১২৫০"
    },
    {
     "en": "1225",
     "as": "১২২৫"
    },
    {
     "en": "1300",
     "as": "১৩০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sum = 50 x 51 / 2 = 1275.",
    "as": "যোগফল = 50 x 51 / 2 = 1275।"
   }
  },
  {
   "id": "number-system-049",
   "q": {
    "en": "The sum of the squares of the first 10 natural numbers is —",
    "as": "প্ৰথম 10 টা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ যোগফল —"
   },
   "options": [
    {
     "en": "285",
     "as": "২৮৫"
    },
    {
     "en": "385",
     "as": "৩৮৫"
    },
    {
     "en": "330",
     "as": "৩৩০"
    },
    {
     "en": "440",
     "as": "৪৪০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Sum = n(n+1)(2n+1)/6 = 10 x 11 x 21 / 6 = 385.",
    "as": "যোগফল = n(n+1)(2n+1)/6 = 10 x 11 x 21 / 6 = 385।"
   }
  },
  {
   "id": "number-system-050",
   "q": {
    "en": "The sum of the cubes of the first 5 natural numbers is —",
    "as": "প্ৰথম 5 টা স্বাভাৱিক সংখ্যাৰ ঘনৰ যোগফল —"
   },
   "options": [
    {
     "en": "225",
     "as": "২২৫"
    },
    {
     "en": "125",
     "as": "১২৫"
    },
    {
     "en": "325",
     "as": "৩২৫"
    },
    {
     "en": "425",
     "as": "৪২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Sum = [n(n+1)/2]^2 = 15^2 = 225.",
    "as": "যোগফল = [n(n+1)/2]^2 = 15^2 = 225।"
   }
  },
  {
   "id": "number-system-051",
   "q": {
    "en": "The place value of the digit 0 in 5072 is —",
    "as": "5072 সংখ্যাটোত 0 অংকটোৰ স্থানীয় মান —"
   },
   "options": [
    {
     "en": "Thousands",
     "as": "হাজাৰ"
    },
    {
     "en": "Hundreds",
     "as": "শতক"
    },
    {
     "en": "Tens",
     "as": "দহক"
    },
    {
     "en": "0",
     "as": "০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The digit 0 contributes no value in any place.",
    "as": "0 অংকটোৱে যিকোনো স্থানত কোনো মান যোগ নকৰে।"
   }
  },
  {
   "id": "number-system-052",
   "q": {
    "en": "The pair of co-prime numbers is —",
    "as": "সহ-মৌলিক সংখ্যাৰ যোৰটো —"
   },
   "options": [
    {
     "en": "8 and 15",
     "as": "৮ আৰু ১৫"
    },
    {
     "en": "9 and 15",
     "as": "৯ আৰু ১৫"
    },
    {
     "en": "8 and 12",
     "as": "৮ আৰু ১২"
    },
    {
     "en": "14 and 21",
     "as": "১৪ আৰু ২১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "8 and 15 have no common factor other than 1.",
    "as": "8 আৰু 15 ৰ 1 ৰ বাহিৰে কোনো সাধাৰণ উৎপাদক নাই।"
   }
  },
  {
   "id": "number-system-053",
   "q": {
    "en": "Among the numbers 2, 3, 4 and 5, the composite number is —",
    "as": "2, 3, 4 আৰু 5 ৰ ভিতৰত যৌগিক সংখ্যা —"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "4",
     "as": "৪"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "4 = 2 x 2, so it has more than two factors.",
    "as": "4 = 2 x 2, গতিকে ইয়াৰ দুটাতকৈ বেছি উৎপাদক আছে।"
   }
  },
  {
   "id": "number-system-054",
   "q": {
    "en": "The number 3.746 rounded to two decimal places is —",
    "as": "3.746 ক দুই দশমিক স্থানলৈ ঘূৰণ কৰিলে —"
   },
   "options": [
    {
     "en": "3.74",
     "as": "৩.৭৪"
    },
    {
     "en": "3.7",
     "as": "৩.৭"
    },
    {
     "en": "3.76",
     "as": "৩.৭৬"
    },
    {
     "en": "3.75",
     "as": "৩.৭৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The third decimal 6 rounds the second digit 4 up to 5.",
    "as": "তৃতীয় দশমিক 6 এ দ্বিতীয় অংক 4 ক 5 লৈ ঘূৰণ কৰে।"
   }
  },
  {
   "id": "number-system-055",
   "q": {
    "en": "The value of 7/9 as a recurring decimal is —",
    "as": "7/9 ৰ পুনৰাবৃত্ত দশমিক মান —"
   },
   "options": [
    {
     "en": "0.7",
     "as": "০.৭"
    },
    {
     "en": "0.77",
     "as": "০.৭৭"
    },
    {
     "en": "0.79",
     "as": "০.৭৯"
    },
    {
     "en": "0.777...",
     "as": "০.৭৭৭..."
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "7 ÷ 9 gives a repeating 7.",
    "as": "7 ÷ 9 কৰিলে 7 পুনৰাবৃত্তি হয়।"
   }
  },
  {
   "id": "number-system-056",
   "q": {
    "en": "The square of 0.3 is —",
    "as": "0.3 ৰ বৰ্গ —"
   },
   "options": [
    {
     "en": "0.09",
     "as": "০.০৯"
    },
    {
     "en": "0.03",
     "as": "০.০৩"
    },
    {
     "en": "0.9",
     "as": "০.৯"
    },
    {
     "en": "0.009",
     "as": "০.০০৯"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "0.3 x 0.3 = 0.09.",
    "as": "0.3 x 0.3 = 0.09।"
   }
  },
  {
   "id": "number-system-057",
   "q": {
    "en": "The value of 1.5 x 0.2 is —",
    "as": "1.5 x 0.2 ৰ মান —"
   },
   "options": [
    {
     "en": "0.3",
     "as": "০.৩"
    },
    {
     "en": "0.03",
     "as": "০.০৩"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "0.003",
     "as": "০.০০৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "15 x 2 = 30 with two decimal places, giving 0.3.",
    "as": "15 x 2 = 30, দুই দশমিক স্থান, গতিকে 0.3।"
   }
  },
  {
   "id": "number-system-058",
   "q": {
    "en": "The value of 0.1 + 0.01 + 0.001 is —",
    "as": "0.1 + 0.01 + 0.001 ৰ মান —"
   },
   "options": [
    {
     "en": "0.3",
     "as": "০.৩"
    },
    {
     "en": "1.11",
     "as": "১.১১"
    },
    {
     "en": "0.101",
     "as": "০.১০১"
    },
    {
     "en": "0.111",
     "as": "০.১১১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Aligning the decimals gives 0.111.",
    "as": "দশমিকবোৰ শাৰী পাতিলে 0.111 পোৱা যায়।"
   }
  },
  {
   "id": "number-system-059",
   "q": {
    "en": "The additive identity for numbers is —",
    "as": "সংখ্যাৰ যোগাত্মক অভেদ —"
   },
   "options": [
    {
     "en": "-1",
     "as": "-১"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Adding 0 leaves a number unchanged.",
    "as": "0 যোগ কৰিলে সংখ্যা অপৰিৱৰ্তিত থাকে।"
   }
  },
  {
   "id": "number-system-060",
   "q": {
    "en": "The multiplicative identity for numbers is —",
    "as": "সংখ্যাৰ গুণাত্মক অভেদ —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "-1",
     "as": "-১"
    },
    {
     "en": "1",
     "as": "১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Multiplying by 1 leaves a number unchanged.",
    "as": "1 ৰে পূৰণ কৰিলে সংখ্যা অপৰিৱৰ্তিত থাকে।"
   }
  },
  {
   "id": "number-system-061",
   "q": {
    "en": "The product of a non-zero number and its reciprocal is —",
    "as": "এটা অশূন্য সংখ্যা আৰু তাৰ প্ৰতিক্ৰমৰ গুণফল —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "the number itself",
     "as": "সংখ্যাটো নিজেই"
    },
    {
     "en": "its square",
     "as": "তাৰ বৰ্গ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Any number multiplied by its reciprocal gives 1.",
    "as": "যিকোনো সংখ্যাক তাৰ প্ৰতিক্ৰমৰে পূৰণ কৰিলে 1 পোৱা যায়।"
   }
  },
  {
   "id": "number-system-062",
   "q": {
    "en": "If a number is divided by 15 the remainder is 0. The number must be divisible by —",
    "as": "এটা সংখ্যাক 15 ৰে হৰণ কৰিলে ভাগশেষ 0। সংখ্যাটো অৱশ্যে বিভাজ্য —"
   },
   "options": [
    {
     "en": "only by 5",
     "as": "কেৱল ৫ ৰে"
    },
    {
     "en": "both 3 and 5",
     "as": "৩ আৰু ৫ দুয়োটাৰে"
    },
    {
     "en": "only by 3",
     "as": "কেৱল ৩ ৰে"
    },
    {
     "en": "neither 3 nor 5",
     "as": "৩ বা ৫ এটাও নহয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "15 = 3 x 5 and both are factors.",
    "as": "15 = 3 x 5 আৰু দুয়োটা উৎপাদক।"
   }
  },
  {
   "id": "number-system-063",
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
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM of 2, 3, 6 is 6: 3/6 + 2/6 + 1/6 = 1.",
    "as": "2, 3, 6 ৰ ল.সা.গু. 6: 3/6 + 2/6 + 1/6 = 1।"
   }
  },
  {
   "id": "number-system-064",
   "q": {
    "en": "The number of integers from 1 to 100 that are divisible by 3 is —",
    "as": "1 ৰ পৰা 100 লৈকে 3 ৰে বিভাজ্য পূৰ্ণ সংখ্যাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "34",
     "as": "৩৪"
    },
    {
     "en": "33",
     "as": "৩৩"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "100 ÷ 3 = 33 remainder 1, so there are 33.",
    "as": "100 ÷ 3 = 33 ভাগশেষ 1, গতিকে 33 টা।"
   }
  },
  {
   "id": "number-system-065",
   "q": {
    "en": "The number of three-digit numbers divisible by 5 is —",
    "as": "5 ৰে বিভাজ্য তিনি-অংকৰ সংখ্যাৰ সংখ্যা —"
   },
   "options": [
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
    },
    {
     "en": "180",
     "as": "১৮০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "They run from 100 to 995, giving (995-100)/5 + 1 = 180.",
    "as": "সেইবোৰ 100 ৰ পৰা 995 লৈকে, (995-100)/5 + 1 = 180।"
   }
  },
  {
   "id": "number-system-066",
   "q": {
    "en": "The value of 8^2 - 6^2 is —",
    "as": "8^2 - 6^2 ৰ মান —"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "64 - 36 = 28, or (8+6)(8-6) = 14 x 2 = 28.",
    "as": "64 - 36 = 28, বা (8+6)(8-6) = 14 x 2 = 28।"
   }
  },
  {
   "id": "number-system-067",
   "q": {
    "en": "The number of multiples of 4 between 10 and 50 is —",
    "as": "10 আৰু 50 ৰ মাজত 4 ৰ গুণিতকৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "11",
     "as": "১১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "They run from 12 to 48, giving 10 numbers.",
    "as": "সেইবোৰ 12 ৰ পৰা 48 লৈকে, মুঠ 10 টা।"
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
    "en": "25% of 240 is —",
    "as": "240 ৰ 25% —"
   },
   "options": [
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "56",
     "as": "৫৬"
    },
    {
     "en": "64",
     "as": "৬৪"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "240 x 25 / 100 = 60.",
    "as": "240 x 25 / 100 = 60।"
   }
  },
  {
   "id": "percentage-002",
   "q": {
    "en": "40% of 350 is —",
    "as": "350 ৰ 40% —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "140",
     "as": "১৪০"
    },
    {
     "en": "130",
     "as": "১৩০"
    },
    {
     "en": "150",
     "as": "১৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "350 x 40 / 100 = 140.",
    "as": "350 x 40 / 100 = 140।"
   }
  },
  {
   "id": "percentage-003",
   "q": {
    "en": "The fraction 3/5 as a percentage is —",
    "as": "3/5 ভগ্নাংশ শতাংশ হিচাপে —"
   },
   "options": [
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "55%",
     "as": "৫৫%"
    },
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "65%",
     "as": "৬৫%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3/5 = 0.6 = 60%.",
    "as": "3/5 = 0.6 = 60%।"
   }
  },
  {
   "id": "percentage-004",
   "q": {
    "en": "The decimal 0.08 as a percentage is —",
    "as": "0.08 দশমিক শতাংশ হিচাপে —"
   },
   "options": [
    {
     "en": "0.8%",
     "as": "০.৮%"
    },
    {
     "en": "80%",
     "as": "৮০%"
    },
    {
     "en": "8%",
     "as": "৮%"
    },
    {
     "en": "0.08%",
     "as": "০.০৮%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "0.08 x 100 = 8%.",
    "as": "0.08 x 100 = 8%।"
   }
  },
  {
   "id": "percentage-005",
   "q": {
    "en": "12.5% as a fraction in lowest terms is —",
    "as": "12.5% আটাইতকৈ সৰল ভগ্নাংশ হিচাপে —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/8",
     "as": "১/৮"
    },
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "1/12",
     "as": "১/১২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "12.5% = 12.5/100 = 1/8.",
    "as": "12.5% = 12.5/100 = 1/8।"
   }
  },
  {
   "id": "percentage-006",
   "q": {
    "en": "If 20% of a number is 45, the number is —",
    "as": "এটা সংখ্যাৰ 20% যদি 45, সংখ্যাটো —"
   },
   "options": [
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "250",
     "as": "২৫০"
    },
    {
     "en": "225",
     "as": "২২৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Number = 45 x 100 / 20 = 225.",
    "as": "সংখ্যা = 45 x 100 / 20 = 225।"
   }
  },
  {
   "id": "percentage-007",
   "q": {
    "en": "If 15% of a number is 60, the number is —",
    "as": "এটা সংখ্যাৰ 15% যদি 60, সংখ্যাটো —"
   },
   "options": [
    {
     "en": "300",
     "as": "৩০০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "450",
     "as": "৪৫০"
    },
    {
     "en": "400",
     "as": "৪০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Number = 60 x 100 / 15 = 400.",
    "as": "সংখ্যা = 60 x 100 / 15 = 400।"
   }
  },
  {
   "id": "percentage-008",
   "q": {
    "en": "A number increased by 20% becomes 84. The original number is —",
    "as": "এটা সংখ্যা 20% বৃদ্ধি হ'লে 84 হয়। মূল সংখ্যাটো —"
   },
   "options": [
    {
     "en": "64",
     "as": "৬৪"
    },
    {
     "en": "68",
     "as": "৬৮"
    },
    {
     "en": "70",
     "as": "৭০"
    },
    {
     "en": "72",
     "as": "৭২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1.2x = 84, so x = 70.",
    "as": "1.2x = 84, গতিকে x = 70।"
   }
  },
  {
   "id": "percentage-009",
   "q": {
    "en": "A number decreased by 25% becomes 90. The original number is —",
    "as": "এটা সংখ্যা 25% হ্ৰাস হ'লে 90 হয়। মূল সংখ্যাটো —"
   },
   "options": [
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "115",
     "as": "১১৫"
    },
    {
     "en": "125",
     "as": "১২৫"
    },
    {
     "en": "120",
     "as": "১২০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "0.75x = 90, so x = 120.",
    "as": "0.75x = 90, গতিকে x = 120।"
   }
  },
  {
   "id": "percentage-010",
   "q": {
    "en": "The price of an article rises from 250 to 300. The percentage increase is —",
    "as": "এটা সামগ্ৰীৰ দাম 250 ৰ পৰা 300 লৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি —"
   },
   "options": [
    {
     "en": "16%",
     "as": "১৬%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "18%",
     "as": "১৮%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Increase = 50; 50 / 250 x 100 = 20%.",
    "as": "বৃদ্ধি = 50; 50 / 250 x 100 = 20%।"
   }
  },
  {
   "id": "percentage-011",
   "q": {
    "en": "The price of an article falls from 400 to 340. The percentage decrease is —",
    "as": "এটা সামগ্ৰীৰ দাম 400 ৰ পৰা 340 লৈ কমে। শতাংশ হ্ৰাস —"
   },
   "options": [
    {
     "en": "12%",
     "as": "১২%"
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
     "en": "20%",
     "as": "২০%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Decrease = 60; 60 / 400 x 100 = 15%.",
    "as": "হ্ৰাস = 60; 60 / 400 x 100 = 15%।"
   }
  },
  {
   "id": "percentage-012",
   "q": {
    "en": "If a number is increased by 10% and then decreased by 10%, the net change is —",
    "as": "এটা সংখ্যা 10% বৃদ্ধি কৰি তাৰপিছত 10% হ্ৰাস কৰিলে নিট পৰিৱৰ্তন —"
   },
   "options": [
    {
     "en": "no change",
     "as": "কোনো পৰিৱৰ্তন নাই"
    },
    {
     "en": "2% decrease",
     "as": "২% হ্ৰাস"
    },
    {
     "en": "1% increase",
     "as": "১% বৃদ্ধি"
    },
    {
     "en": "1% decrease",
     "as": "১% হ্ৰাস"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Net = 1 - (0.1)^2 = 0.99, a 1% decrease.",
    "as": "নিট = 1 - (0.1)^2 = 0.99, অৰ্থাৎ 1% হ্ৰাস।"
   }
  },
  {
   "id": "percentage-013",
   "q": {
    "en": "Two successive increases of 10% and 20% are equivalent to a single increase of —",
    "as": "10% আৰু 20% ৰ দুটা ক্ৰমিক বৃদ্ধি এটা বৃদ্ধিৰ সমান —"
   },
   "options": [
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "31%",
     "as": "৩১%"
    },
    {
     "en": "32%",
     "as": "৩২%"
    },
    {
     "en": "33%",
     "as": "৩৩%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1.1 x 1.2 = 1.32, a 32% increase.",
    "as": "1.1 x 1.2 = 1.32, অৰ্থাৎ 32% বৃদ্ধি।"
   }
  },
  {
   "id": "percentage-014",
   "q": {
    "en": "A student scored 480 marks out of 600. The percentage of marks is —",
    "as": "এজন ছাত্ৰই 600 ৰ ভিতৰত 480 নম্বৰ পায়। শতাংশ —"
   },
   "options": [
    {
     "en": "75%",
     "as": "৭৫%"
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
     "en": "82%",
     "as": "৮২%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "480 / 600 x 100 = 80%.",
    "as": "480 / 600 x 100 = 80%।"
   }
  },
  {
   "id": "percentage-015",
   "q": {
    "en": "A student scored 68 out of 80 in a test. The percentage of marks is —",
    "as": "এজন ছাত্ৰই এটা পৰীক্ষাত 80 ৰ ভিতৰত 68 নম্বৰ পায়। শতাংশ —"
   },
   "options": [
    {
     "en": "85%",
     "as": "৮৫%"
    },
    {
     "en": "82%",
     "as": "৮২%"
    },
    {
     "en": "80%",
     "as": "৮০%"
    },
    {
     "en": "88%",
     "as": "৮৮%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "68 / 80 x 100 = 85%.",
    "as": "68 / 80 x 100 = 85%।"
   }
  },
  {
   "id": "percentage-016",
   "q": {
    "en": "In an examination 60% of the students passed and 200 failed. The total number of students is —",
    "as": "এটা পৰীক্ষাত 60% ছাত্ৰ উত্তীৰ্ণ হ'ল আৰু 200 অনুত্তীৰ্ণ হ'ল। মুঠ ছাত্ৰ —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "450",
     "as": "৪৫০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "600",
     "as": "৬০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "40% = 200, so 100% = 500.",
    "as": "40% = 200, গতিকে 100% = 500।"
   }
  },
  {
   "id": "percentage-017",
   "q": {
    "en": "In a class of 50 students, 30 are girls. The percentage of girls is —",
    "as": "50 জনীয়া শ্ৰেণীত 30 জনী ছোৱালী। ছোৱালীৰ শতাংশ —"
   },
   "options": [
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "55%",
     "as": "৫৫%"
    },
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "65%",
     "as": "৬৫%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "30 / 50 x 100 = 60%.",
    "as": "30 / 50 x 100 = 60%।"
   }
  },
  {
   "id": "percentage-018",
   "q": {
    "en": "If 8% of a number is 72, then 25% of the same number is —",
    "as": "এটা সংখ্যাৰ 8% যদি 72, তেন্তে একেই সংখ্যাৰ 25% —"
   },
   "options": [
    {
     "en": "225",
     "as": "২২৫"
    },
    {
     "en": "215",
     "as": "২১৫"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "250",
     "as": "২৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Number = 900, and 25% of 900 = 225.",
    "as": "সংখ্যা = 900, আৰু 900 ৰ 25% = 225।"
   }
  },
  {
   "id": "percentage-019",
   "q": {
    "en": "A sum of 800 is increased by 15%. The new sum is —",
    "as": "800 ৰাশি 15% বৃদ্ধি হ'লে নতুন ৰাশি —"
   },
   "options": [
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "920",
     "as": "৯২০"
    },
    {
     "en": "940",
     "as": "৯৪০"
    },
    {
     "en": "950",
     "as": "৯৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "800 x 1.15 = 920.",
    "as": "800 x 1.15 = 920।"
   }
  },
  {
   "id": "percentage-020",
   "q": {
    "en": "The population of a town is 25,000. If it increases by 8%, the new population is —",
    "as": "এখন নগৰৰ জনসংখ্যা 25,000। 8% বৃদ্ধি হ'লে নতুন জনসংখ্যা —"
   },
   "options": [
    {
     "en": "26,500",
     "as": "২৬,৫০০"
    },
    {
     "en": "28,000",
     "as": "২৮,০০০"
    },
    {
     "en": "27,500",
     "as": "২৭,৫০০"
    },
    {
     "en": "27,000",
     "as": "২৭,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "25,000 x 1.08 = 27,000.",
    "as": "25,000 x 1.08 = 27,000।"
   }
  },
  {
   "id": "percentage-021",
   "q": {
    "en": "If a salary of 12,000 is reduced by 20%, the new salary is —",
    "as": "12,000 দৰমহা 20% হ্ৰাস হ'লে নতুন দৰমহা —"
   },
   "options": [
    {
     "en": "9,000",
     "as": "৯,০০০"
    },
    {
     "en": "10,000",
     "as": "১০,০০০"
    },
    {
     "en": "9,600",
     "as": "৯,৬০০"
    },
    {
     "en": "10,400",
     "as": "১০,৪০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "12,000 x 0.8 = 9,600.",
    "as": "12,000 x 0.8 = 9,600।"
   }
  },
  {
   "id": "percentage-022",
   "q": {
    "en": "A man spends 70% of his income and saves 4,500. His income is —",
    "as": "এজন মানুহে তেওঁৰ আয়ৰ 70% খৰচ কৰে আৰু 4,500 সাঁচে। তেওঁৰ আয় —"
   },
   "options": [
    {
     "en": "12,000",
     "as": "১২,০০০"
    },
    {
     "en": "13,500",
     "as": "১৩,৫০০"
    },
    {
     "en": "18,000",
     "as": "১৮,০০০"
    },
    {
     "en": "15,000",
     "as": "১৫,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "30% = 4,500, so 100% = 15,000.",
    "as": "30% = 4,500, গতিকে 100% = 15,000।"
   }
  },
  {
   "id": "percentage-023",
   "q": {
    "en": "A man saves 25% of his income. If his income is 24,000, his savings are —",
    "as": "এজন মানুহে তেওঁৰ আয়ৰ 25% সাঁচে। আয় 24,000 হ'লে সাঁচ —"
   },
   "options": [
    {
     "en": "4,000",
     "as": "৪,০০০"
    },
    {
     "en": "4,800",
     "as": "৪,৮০০"
    },
    {
     "en": "6,000",
     "as": "৬,০০০"
    },
    {
     "en": "5,000",
     "as": "৫,০০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "24,000 x 25 / 100 = 6,000.",
    "as": "24,000 x 25 / 100 = 6,000।"
   }
  },
  {
   "id": "percentage-024",
   "q": {
    "en": "40% of 40% of 500 is —",
    "as": "500 ৰ 40% ৰ 40% —"
   },
   "options": [
    {
     "en": "64",
     "as": "৬৪"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "96",
     "as": "৯৬"
    },
    {
     "en": "80",
     "as": "৮০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "40% of 500 = 200, and 40% of 200 = 80.",
    "as": "500 ৰ 40% = 200, আৰু 200 ৰ 40% = 80।"
   }
  },
  {
   "id": "percentage-025",
   "q": {
    "en": "The value of 15% of 200 + 20% of 150 is —",
    "as": "200 ৰ 15% + 150 ৰ 20% ৰ মান —"
   },
   "options": [
    {
     "en": "55",
     "as": "৫৫"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "58",
     "as": "৫৮"
    },
    {
     "en": "65",
     "as": "৬৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "30 + 30 = 60.",
    "as": "30 + 30 = 60।"
   }
  },
  {
   "id": "percentage-026",
   "q": {
    "en": "If 25% of x is 12.5, the value of x is —",
    "as": "x ৰ 25% যদি 12.5, x ৰ মান —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "55",
     "as": "৫৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "x = 12.5 x 100 / 25 = 50.",
    "as": "x = 12.5 x 100 / 25 = 50।"
   }
  },
  {
   "id": "percentage-027",
   "q": {
    "en": "A number is 20% more than 150. The number is —",
    "as": "এটা সংখ্যা 150 তকৈ 20% বেছি। সংখ্যাটো —"
   },
   "options": [
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "170",
     "as": "১৭০"
    },
    {
     "en": "190",
     "as": "১৯০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "150 x 1.2 = 180.",
    "as": "150 x 1.2 = 180।"
   }
  },
  {
   "id": "percentage-028",
   "q": {
    "en": "A number is 30% less than 200. The number is —",
    "as": "এটা সংখ্যা 200 তকৈ 30% কম। সংখ্যাটো —"
   },
   "options": [
    {
     "en": "130",
     "as": "১৩০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "140",
     "as": "১৪০"
    },
    {
     "en": "160",
     "as": "১৬০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "200 x 0.7 = 140.",
    "as": "200 x 0.7 = 140।"
   }
  },
  {
   "id": "percentage-029",
   "q": {
    "en": "In a basket 45% of the fruits are apples and the rest are oranges. If there are 220 fruits, the number of oranges is —",
    "as": "এটা ঝুৰিত 45% ফল আপেল আৰু বাকীবোৰ কমলা। 220 টা ফল থাকিলে কমলাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "99",
     "as": "৯৯"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "125",
     "as": "১২৫"
    },
    {
     "en": "121",
     "as": "১২১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Oranges = 55% of 220 = 121.",
    "as": "কমলা = 220 ৰ 55% = 121।"
   }
  },
  {
   "id": "percentage-030",
   "q": {
    "en": "If the price of sugar rises by 25%, by what percentage must consumption be reduced to keep the expenditure the same?",
    "as": "চেনিৰ দাম 25% বাঢ়িলে খৰচ একেই ৰাখিবলৈ ব্যৱহাৰ কিমান শতাংশ কমাব লাগে?"
   },
   "options": [
    {
     "en": "16%",
     "as": "১৬%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Reduction = 25/125 x 100 = 20%.",
    "as": "হ্ৰাস = 25/125 x 100 = 20%।"
   }
  },
  {
   "id": "percentage-031",
   "q": {
    "en": "If A's income is 20% more than B's, then B's income is less than A's by —",
    "as": "A ৰ আয় B তকৈ 20% বেছি হ'লে B ৰ আয় A তকৈ কম —"
   },
   "options": [
    {
     "en": "16.67%",
     "as": "১৬.৬৭%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Less = 20/120 x 100 = 16.67%.",
    "as": "কম = 20/120 x 100 = 16.67%।"
   }
  },
  {
   "id": "percentage-032",
   "q": {
    "en": "The marks obtained by a student in two subjects are 65 and 85 out of 100 each. The overall percentage is —",
    "as": "এজন ছাত্ৰই দুটা বিষয়ত 100 ৰ ভিতৰত ক্ৰমে 65 আৰু 85 নম্বৰ পায়। মুঠ শতাংশ —"
   },
   "options": [
    {
     "en": "75%",
     "as": "৭৫%"
    },
    {
     "en": "72%",
     "as": "৭২%"
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
    "en": "(65 + 85) / 200 x 100 = 75%.",
    "as": "(65 + 85) / 200 x 100 = 75%।"
   }
  },
  {
   "id": "percentage-033",
   "q": {
    "en": "A sum of 5,000 earns a simple interest of 800 in 2 years. The rate per annum is —",
    "as": "5,000 টকাই 2 বছৰত 800 সৰল সুত উপাৰ্জন কৰে। বছৰি সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "8%",
     "as": "৮%"
    },
    {
     "en": "7%",
     "as": "৭%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "9%",
     "as": "৯%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Rate = 800 x 100 / (5000 x 2) = 8%.",
    "as": "হাৰ = 800 x 100 / (5000 x 2) = 8%।"
   }
  },
  {
   "id": "percentage-034",
   "q": {
    "en": "If 60% of the employees in a company are men and there are 240 men, the total number of employees is —",
    "as": "এটা কোম্পানীৰ 60% কৰ্মচাৰী পুৰুষ আৰু 240 জন পুৰুষ থাকিলে মুঠ কৰ্মচাৰী —"
   },
   "options": [
    {
     "en": "360",
     "as": "৩৬০"
    },
    {
     "en": "380",
     "as": "৩৮০"
    },
    {
     "en": "420",
     "as": "৪২০"
    },
    {
     "en": "400",
     "as": "৪০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "60% = 240, so 100% = 400.",
    "as": "60% = 240, গতিকে 100% = 400।"
   }
  },
  {
   "id": "percentage-035",
   "q": {
    "en": "A candidate who scored 40% failed by 20 marks, while one who scored 60% got 30 marks more than the pass mark. The pass mark is —",
    "as": "40% নম্বৰ পোৱা এজন প্ৰাৰ্থী 20 নম্বৰৰ ব্যৱধানত অনুত্তীৰ্ণ হ'ল, আনহাতে 60% পোৱা এজনে উত্তীৰ্ণ নম্বৰতকৈ 30 নম্বৰ বেছি পালে। উত্তীৰ্ণ নম্বৰ —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "140",
     "as": "১৪০"
    },
    {
     "en": "160",
     "as": "১৬০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "20% of total = 20 + 30 = 50, so total = 250 and pass = 40% of 250 + 20 = 120.",
    "as": "মুঠৰ 20% = 20 + 30 = 50, গতিকে মুঠ = 250 আৰু উত্তীৰ্ণ = 250 ৰ 40% + 20 = 120।"
   }
  },
  {
   "id": "percentage-036",
   "q": {
    "en": "An article marked at 500 is sold at a discount of 12%. The selling price is —",
    "as": "500 চিহ্নিত মূল্যৰ সামগ্ৰী 12% ৰেহাইত বিক্ৰী হ'লে বিক্ৰী মূল্য —"
   },
   "options": [
    {
     "en": "425",
     "as": "৪২৫"
    },
    {
     "en": "435",
     "as": "৪৩৫"
    },
    {
     "en": "450",
     "as": "৪৫০"
    },
    {
     "en": "440",
     "as": "৪৪০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "500 x 0.88 = 440.",
    "as": "500 x 0.88 = 440।"
   }
  },
  {
   "id": "percentage-037",
   "q": {
    "en": "If 5% of a number is 12, then 35% of the same number is —",
    "as": "এটা সংখ্যাৰ 5% যদি 12, তেন্তে একেই সংখ্যাৰ 35% —"
   },
   "options": [
    {
     "en": "84",
     "as": "৮৪"
    },
    {
     "en": "78",
     "as": "৭৮"
    },
    {
     "en": "72",
     "as": "৭২"
    },
    {
     "en": "90",
     "as": "৯০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Number = 240, and 35% of 240 = 84.",
    "as": "সংখ্যা = 240, আৰু 240 ৰ 35% = 84।"
   }
  },
  {
   "id": "percentage-038",
   "q": {
    "en": "Two numbers are 25% and 40% of a third number. The first number as a percentage of the second is —",
    "as": "দুটা সংখ্যা তৃতীয় এটা সংখ্যাৰ 25% আৰু 40%। প্ৰথম সংখ্যাটো দ্বিতীয়টোৰ শতাংশ হিচাপে —"
   },
   "options": [
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "62.5%",
     "as": "৬২.৫%"
    },
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "55%",
     "as": "৫৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "25/40 x 100 = 62.5%.",
    "as": "25/40 x 100 = 62.5%।"
   }
  },
  {
   "id": "percentage-039",
   "q": {
    "en": "The value of 200% of 45 is —",
    "as": "45 ৰ 200% ৰ মান —"
   },
   "options": [
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "67.5",
     "as": "৬৭.৫"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "180",
     "as": "১৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "45 x 200 / 100 = 90.",
    "as": "45 x 200 / 100 = 90।"
   }
  },
  {
   "id": "percentage-040",
   "q": {
    "en": "If a number is multiplied by 1.25, the percentage increase is —",
    "as": "এটা সংখ্যাক 1.25 ৰে পূৰণ কৰিলে শতাংশ বৃদ্ধি —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "22%",
     "as": "২২%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1.25 = 125%, an increase of 25%.",
    "as": "1.25 = 125%, অৰ্থাৎ 25% বৃদ্ধি।"
   }
  },
  {
   "id": "percentage-041",
   "q": {
    "en": "A student needs 40% to pass. If he gets 175 marks and fails by 25 marks, the maximum marks are —",
    "as": "এজন ছাত্ৰই উত্তীৰ্ণ হ'বলৈ 40% লাগে। তেওঁ 175 নম্বৰ পাই 25 নম্বৰৰ ব্যৱধানত অনুত্তীৰ্ণ হ'লে সৰ্বোচ্চ নম্বৰ —"
   },
   "options": [
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "700",
     "as": "৭০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Pass mark = 175 + 25 = 200; since 200 is 40% of the total, total = 500.",
    "as": "উত্তীৰ্ণ নম্বৰ = 175 + 25 = 200; 200 মুঠৰ 40% হোৱাৰ বাবে মুঠ = 500।"
   }
  },
  {
   "id": "percentage-042",
   "q": {
    "en": "The number of boys in a school is 45% of the total. If there are 550 girls, the total number of students is —",
    "as": "এখন বিদ্যালয়ত ল'ৰাৰ সংখ্যা মুঠৰ 45%। 550 জনী ছোৱালী থাকিলে মুঠ ছাত্ৰ —"
   },
   "options": [
    {
     "en": "1000",
     "as": "১০০০"
    },
    {
     "en": "950",
     "as": "৯৫০"
    },
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "1100",
     "as": "১১০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Girls = 55%, so 55% = 550 and 100% = 1000.",
    "as": "ছোৱালী = 55%, গতিকে 55% = 550 আৰু 100% = 1000।"
   }
  },
  {
   "id": "percentage-043",
   "q": {
    "en": "If x is 150% of y, then y is what per cent of x?",
    "as": "x যদি y ৰ 150%, তেন্তে y, x ৰ কিমান শতাংশ?"
   },
   "options": [
    {
     "en": "66.67%",
     "as": "৬৬.৬৭%"
    },
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "75%",
     "as": "৭৫%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "y/x x 100 = 100/150 x 100 = 66.67%.",
    "as": "y/x x 100 = 100/150 x 100 = 66.67%।"
   }
  },
  {
   "id": "percentage-044",
   "q": {
    "en": "The value of 0.5% of 800 is —",
    "as": "800 ৰ 0.5% ৰ মান —"
   },
   "options": [
    {
     "en": "0.4",
     "as": "০.৪"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "0.04",
     "as": "০.০৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "800 x 0.5 / 100 = 4.",
    "as": "800 x 0.5 / 100 = 4।"
   }
  },
  {
   "id": "percentage-045",
   "q": {
    "en": "A property worth 5,00,000 appreciates by 10% each year. Its value after one year is —",
    "as": "5,00,000 মূল্যৰ সম্পত্তি বছৰি 10% বাঢ়ে। এবছৰৰ পিছত মূল্য —"
   },
   "options": [
    {
     "en": "5,25,000",
     "as": "৫,২৫,০০০"
    },
    {
     "en": "5,40,000",
     "as": "৫,৪০,০০০"
    },
    {
     "en": "5,60,000",
     "as": "৫,৬০,০০০"
    },
    {
     "en": "5,50,000",
     "as": "৫,৫০,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "5,00,000 x 1.10 = 5,50,000.",
    "as": "5,00,000 x 1.10 = 5,50,000।"
   }
  },
  {
   "id": "percentage-046",
   "q": {
    "en": "The strength of a school increases from 800 to 1000. The percentage increase is —",
    "as": "এখন বিদ্যালয়ৰ ছাত্ৰ সংখ্যা 800 ৰ পৰা 1000 লৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "22%",
     "as": "২২%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Increase = 200; 200 / 800 x 100 = 25%.",
    "as": "বৃদ্ধি = 200; 200 / 800 x 100 = 25%।"
   }
  },
  {
   "id": "percentage-047",
   "q": {
    "en": "If 90% of a number is 810, the number is —",
    "as": "এটা সংখ্যাৰ 90% যদি 810, সংখ্যাটো —"
   },
   "options": [
    {
     "en": "880",
     "as": "৮৮০"
    },
    {
     "en": "950",
     "as": "৯৫০"
    },
    {
     "en": "910",
     "as": "৯১০"
    },
    {
     "en": "900",
     "as": "৯০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Number = 810 x 100 / 90 = 900.",
    "as": "সংখ্যা = 810 x 100 / 90 = 900।"
   }
  },
  {
   "id": "percentage-048",
   "q": {
    "en": "A mixture has 30% milk and the rest water. In 40 litres of the mixture the quantity of water is —",
    "as": "এটা মিশ্ৰণত 30% গাখীৰ আৰু বাকী পানী। 40 লিটাৰ মিশ্ৰণত পানীৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "12 litres",
     "as": "১২ লিটাৰ"
    },
    {
     "en": "24 litres",
     "as": "২৪ লিটাৰ"
    },
    {
     "en": "26 litres",
     "as": "২৬ লিটাৰ"
    },
    {
     "en": "28 litres",
     "as": "২৮ লিটাৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Water = 70% of 40 = 28 litres.",
    "as": "পানী = 40 ৰ 70% = 28 লিটাৰ।"
   }
  },
  {
   "id": "percentage-049",
   "q": {
    "en": "If the numerator of a fraction is increased by 20% and the denominator by 10%, the fraction becomes —",
    "as": "এটা ভগ্নাংশৰ লৱ 20% আৰু হৰ 10% বৃদ্ধি কৰিলে ভগ্নাংশটো হয় —"
   },
   "options": [
    {
     "en": "increased by 10%",
     "as": "১০% বৃদ্ধি"
    },
    {
     "en": "decreased by 10%",
     "as": "১০% হ্ৰাস"
    },
    {
     "en": "increased by 9.09%",
     "as": "৯.০৯% বৃদ্ধি"
    },
    {
     "en": "unchanged",
     "as": "অপৰিৱৰ্তিত"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1.2/1.1 = 1.0909, an increase of 9.09%.",
    "as": "1.2/1.1 = 1.0909, অৰ্থাৎ 9.09% বৃদ্ধি।"
   }
  },
  {
   "id": "percentage-050",
   "q": {
    "en": "The value of 60% of 60 is —",
    "as": "60 ৰ 60% ৰ মান —"
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
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "42",
     "as": "৪২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "60 x 60 / 100 = 36.",
    "as": "60 x 60 / 100 = 36।"
   }
  },
  {
   "id": "percentage-051",
   "q": {
    "en": "A shopkeeper offers a discount of 20% on a marked price of 1,250. The discount amount is —",
    "as": "এজন দোকানীয়ে 1,250 চিহ্নিত মূল্যৰ ওপৰত 20% ৰেহাই দিয়ে। ৰেহাইৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "240",
     "as": "২৪০"
    },
    {
     "en": "275",
     "as": "২৭৫"
    },
    {
     "en": "250",
     "as": "২৫০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1,250 x 20 / 100 = 250.",
    "as": "1,250 x 20 / 100 = 250।"
   }
  },
  {
   "id": "percentage-052",
   "q": {
    "en": "The percentage of 45 in 180 is —",
    "as": "180 ত 45 ৰ শতাংশ —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "35%",
     "as": "৩৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "45 / 180 x 100 = 25%.",
    "as": "45 / 180 x 100 = 25%।"
   }
  },
  {
   "id": "percentage-053",
   "q": {
    "en": "If 20 litres of a 25% acid solution is mixed with 30 litres of a 10% acid solution, the acid content in the mixture is —",
    "as": "20 লিটাৰ 25% অম্লীয় দ্ৰৱ 30 লিটাৰ 10% অম্লীয় দ্ৰৱৰ সৈতে মিহলালে মিশ্ৰণত অম্লৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "9 litres",
     "as": "৯ লিটাৰ"
    },
    {
     "en": "8 litres",
     "as": "৮ লিটাৰ"
    },
    {
     "en": "10 litres",
     "as": "১০ লিটাৰ"
    },
    {
     "en": "12 litres",
     "as": "১২ লিটাৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Acid = 5 + 3 = 8 litres.",
    "as": "অম্ল = 5 + 3 = 8 লিটাৰ।"
   }
  },
  {
   "id": "percentage-054",
   "q": {
    "en": "If the price of an item is first increased by 25% and then reduced by 20%, the net change is —",
    "as": "এটা সামগ্ৰীৰ দাম প্ৰথমে 25% বৃদ্ধি আৰু তাৰপিছত 20% হ্ৰাস কৰিলে নিট পৰিৱৰ্তন —"
   },
   "options": [
    {
     "en": "5% increase",
     "as": "৫% বৃদ্ধি"
    },
    {
     "en": "no change",
     "as": "কোনো পৰিৱৰ্তন নাই"
    },
    {
     "en": "5% decrease",
     "as": "৫% হ্ৰাস"
    },
    {
     "en": "1% increase",
     "as": "১% বৃদ্ধি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1.25 x 0.8 = 1, so no change.",
    "as": "1.25 x 0.8 = 1, গতিকে কোনো পৰিৱৰ্তন নাই।"
   }
  },
  {
   "id": "percentage-055",
   "q": {
    "en": "The value of 33 1/3 % of 90 is —",
    "as": "90 ৰ 33 1/3 % ৰ মান —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "33",
     "as": "৩৩"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "33 1/3% = 1/3, and 90 / 3 = 30.",
    "as": "33 1/3% = 1/3, আৰু 90 / 3 = 30।"
   }
  },
  {
   "id": "percentage-056",
   "q": {
    "en": "The value of 66 2/3 % of 150 is —",
    "as": "150 ৰ 66 2/3 % ৰ মান —"
   },
   "options": [
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "95",
     "as": "৯৫"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "110",
     "as": "১১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "66 2/3% = 2/3, and 150 x 2 / 3 = 100.",
    "as": "66 2/3% = 2/3, আৰু 150 x 2 / 3 = 100।"
   }
  },
  {
   "id": "percentage-057",
   "q": {
    "en": "A reduction of 10% in the price of rice enables a man to buy 2 kg more for 720. The original price per kg is —",
    "as": "চাউলৰ দামত 10% হ্ৰাস হ'লে এজনে 720 টকাত 2 কেজি বেছি কিনিব পাৰে। প্ৰতি কেজিৰ মূল দাম —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "36",
     "as": "৩৬"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "10% of original amount buys 2 kg; solving gives the original rate 36 per kg.",
    "as": "মূল ৰাশিৰ 10% এ 2 কেজি কিনে; সমাধান কৰিলে মূল দাম 36 প্ৰতি কেজি।"
   }
  },
  {
   "id": "percentage-058",
   "q": {
    "en": "If the income of a person is 30,000 and he pays 12% as tax, the tax paid is —",
    "as": "এজন ব্যক্তিৰ আয় 30,000 আৰু তেওঁ 12% কৰ দিয়ে। দিয়া কৰ —"
   },
   "options": [
    {
     "en": "3,000",
     "as": "৩,০০০"
    },
    {
     "en": "3,600",
     "as": "৩,৬০০"
    },
    {
     "en": "3,400",
     "as": "৩,৪০০"
    },
    {
     "en": "3,800",
     "as": "৩,৮০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "30,000 x 12 / 100 = 3,600.",
    "as": "30,000 x 12 / 100 = 3,600।"
   }
  },
  {
   "id": "percentage-059",
   "q": {
    "en": "The value of 2.5% of 4,000 is —",
    "as": "4,000 ৰ 2.5% ৰ মান —"
   },
   "options": [
    {
     "en": "80",
     "as": "৮০"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "4,000 x 2.5 / 100 = 100.",
    "as": "4,000 x 2.5 / 100 = 100।"
   }
  },
  {
   "id": "percentage-060",
   "q": {
    "en": "Out of 1,500 candidates, 45% were selected. The number of candidates not selected is —",
    "as": "1,500 প্ৰাৰ্থীৰ ভিতৰত 45% নিৰ্বাচিত হ'ল। নিৰ্বাচিত নোহোৱা প্ৰাৰ্থীৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "750",
     "as": "৭৫০"
    },
    {
     "en": "825",
     "as": "৮২৫"
    },
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "850",
     "as": "৮৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "55% of 1,500 = 825.",
    "as": "1,500 ৰ 55% = 825।"
   }
  },
  {
   "id": "percentage-061",
   "q": {
    "en": "A number is first increased by 40% and then decreased by 40%. The net percentage change is —",
    "as": "এটা সংখ্যা প্ৰথমে 40% বৃদ্ধি আৰু তাৰপিছত 40% হ্ৰাস কৰিলে নিট শতাংশ পৰিৱৰ্তন —"
   },
   "options": [
    {
     "en": "no change",
     "as": "কোনো পৰিৱৰ্তন নাই"
    },
    {
     "en": "8% decrease",
     "as": "৮% হ্ৰাস"
    },
    {
     "en": "16% increase",
     "as": "১৬% বৃদ্ধি"
    },
    {
     "en": "16% decrease",
     "as": "১৬% হ্ৰাস"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1.4 x 0.6 = 0.84, a 16% decrease.",
    "as": "1.4 x 0.6 = 0.84, অৰ্থাৎ 16% হ্ৰাস।"
   }
  },
  {
   "id": "percentage-062",
   "q": {
    "en": "If 12% of a number is 96, then 5% of the same number is —",
    "as": "এটা সংখ্যাৰ 12% যদি 96, তেন্তে একেই সংখ্যাৰ 5% —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "38",
     "as": "৩৮"
    },
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "42",
     "as": "৪২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Number = 800, and 5% of 800 = 40.",
    "as": "সংখ্যা = 800, আৰু 800 ৰ 5% = 40।"
   }
  },
  {
   "id": "percentage-063",
   "q": {
    "en": "The pass percentage of a class is 75%. If 45 students passed, the class strength is —",
    "as": "এটা শ্ৰেণীৰ উত্তীৰ্ণৰ শতাংশ 75%। 45 জন ছাত্ৰ উত্তীৰ্ণ হ'লে শ্ৰেণীৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "55",
     "as": "৫৫"
    },
    {
     "en": "58",
     "as": "৫৮"
    },
    {
     "en": "65",
     "as": "৬৫"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "75% = 45, so 100% = 60.",
    "as": "75% = 45, গতিকে 100% = 60।"
   }
  },
  {
   "id": "percentage-064",
   "q": {
    "en": "A salesman earns a commission of 5% on sales of 40,000. His commission is —",
    "as": "এজন বিক্ৰেতাই 40,000 টকাৰ বিক্ৰীৰ ওপৰত 5% কমিছন পায়। তেওঁৰ কমিছন —"
   },
   "options": [
    {
     "en": "1,500",
     "as": "১,৫০০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "2,000",
     "as": "২,০০০"
    },
    {
     "en": "2,500",
     "as": "২,৫০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "40,000 x 5 / 100 = 2,000.",
    "as": "40,000 x 5 / 100 = 2,000।"
   }
  },
  {
   "id": "percentage-065",
   "q": {
    "en": "If the price of petrol increases from 80 to 92, the percentage increase is —",
    "as": "পেট্ৰলৰ দাম 80 ৰ পৰা 92 লৈ বাঢ়িলে শতাংশ বৃদ্ধি —"
   },
   "options": [
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "13%",
     "as": "১৩%"
    },
    {
     "en": "16%",
     "as": "১৬%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Increase = 12; 12 / 80 x 100 = 15%.",
    "as": "বৃদ্ধি = 12; 12 / 80 x 100 = 15%।"
   }
  },
  {
   "id": "percentage-066",
   "q": {
    "en": "The value of 250% of 60 is —",
    "as": "60 ৰ 250% ৰ মান —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "140",
     "as": "১৪০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "150",
     "as": "১৫০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "60 x 250 / 100 = 150.",
    "as": "60 x 250 / 100 = 150।"
   }
  },
  {
   "id": "percentage-067",
   "q": {
    "en": "A man's monthly income is 18,000. He spends 45% on food and 25% on rent. The amount left is —",
    "as": "এজন মানুহৰ মাহেকীয়া আয় 18,000। তেওঁ খাদ্যত 45% আৰু ভাড়াত 25% খৰচ কৰে। বাকী থকা ৰাশি —"
   },
   "options": [
    {
     "en": "4,500",
     "as": "৪,৫০০"
    },
    {
     "en": "5,000",
     "as": "৫,০০০"
    },
    {
     "en": "5,400",
     "as": "৫,৪০০"
    },
    {
     "en": "6,000",
     "as": "৬,০০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Remaining = 30% of 18,000 = 5,400.",
    "as": "বাকী = 18,000 ৰ 30% = 5,400।"
   }
  },
  {
   "id": "percentage-068",
   "q": {
    "en": "If 40% of the students in a school are girls and there are 480 girls, the number of boys is —",
    "as": "এখন বিদ্যালয়ৰ 40% ছাত্ৰী আৰু 480 জনী ছোৱালী থাকিলে ল'ৰাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "680",
     "as": "৬৮০"
    },
    {
     "en": "750",
     "as": "৭৫০"
    },
    {
     "en": "720",
     "as": "৭২০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Total = 1,200 and boys = 60% = 720.",
    "as": "মুঠ = 1,200 আৰু ল'ৰা = 60% = 720।"
   }
  },
  {
   "id": "percentage-069",
   "q": {
    "en": "The percentage of pure gold in 22-carat gold (out of 24) is approximately —",
    "as": "22 কেৰেট সোণত বিশুদ্ধ সোণৰ শতাংশ (24 ৰ ভিতৰত) প্ৰায় —"
   },
   "options": [
    {
     "en": "88%",
     "as": "৮৮%"
    },
    {
     "en": "91.67%",
     "as": "৯১.৬৭%"
    },
    {
     "en": "90%",
     "as": "৯০%"
    },
    {
     "en": "95%",
     "as": "৯৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "22 / 24 x 100 = 91.67%.",
    "as": "22 / 24 x 100 = 91.67%।"
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
    "en": "The present age of A is 25 years. His age after 5 years will be —",
    "as": "A ৰ বৰ্তমান বয়স 25 বছৰ। 5 বছৰৰ পিছত তেওঁৰ বয়স —"
   },
   "options": [
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "29 years",
     "as": "২৯ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "25 + 5 = 30 years.",
    "as": "25 + 5 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-002",
   "q": {
    "en": "The present age of B is 40 years. His age 10 years ago was —",
    "as": "B ৰ বৰ্তমান বয়স 40 বছৰ। 10 বছৰ আগতে তেওঁৰ বয়স —"
   },
   "options": [
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "40 - 10 = 30 years.",
    "as": "40 - 10 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-003",
   "q": {
    "en": "The sum of the ages of A and B is 50 years. If A is 26 years old, B is —",
    "as": "A আৰু B ৰ বয়সৰ যোগফল 50 বছৰ। A ৰ বয়স 26 হ'লে B —"
   },
   "options": [
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    },
    {
     "en": "26 years",
     "as": "২৬ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "B = 50 - 26 = 24 years.",
    "as": "B = 50 - 26 = 24 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-004",
   "q": {
    "en": "The difference between the ages of A and B is 8 years. If A is 30 years old, B could be —",
    "as": "A আৰু B ৰ বয়সৰ পাৰ্থক্য 8 বছৰ। A ৰ বয়স 30 হ'লে B হ'ব পাৰে —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "26 years",
     "as": "২৬ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B = 30 - 8 = 22 years.",
    "as": "B = 30 - 8 = 22 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-005",
   "q": {
    "en": "A father is 30 years older than his son. If the son is 10 years old, the father is —",
    "as": "এজন পিতৃ তেওঁৰ পুত্ৰতকৈ 30 বছৰ ডাঙৰ। পুত্ৰৰ বয়স 10 হ'লে পিতৃৰ বয়স —"
   },
   "options": [
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "38 years",
     "as": "৩৮ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Father = 10 + 30 = 40 years.",
    "as": "পিতৃ = 10 + 30 = 40 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-006",
   "q": {
    "en": "A father is 4 times as old as his son. If the son is 12 years old, the father is —",
    "as": "এজন পিতৃ তেওঁৰ পুত্ৰতকৈ 4 গুণ ডাঙৰ। পুত্ৰৰ বয়স 12 হ'লে পিতৃৰ বয়স —"
   },
   "options": [
    {
     "en": "48 years",
     "as": "৪৮ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "44 years",
     "as": "৪৪ বছৰ"
    },
    {
     "en": "36 years",
     "as": "৩৬ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Father = 4 x 12 = 48 years.",
    "as": "পিতৃ = 4 x 12 = 48 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-007",
   "q": {
    "en": "A is twice as old as B. If B is 15 years old, A is —",
    "as": "A B তকৈ দুগুণ ডাঙৰ। B ৰ বয়স 15 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A = 2 x 15 = 30 years.",
    "as": "A = 2 x 15 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-008",
   "q": {
    "en": "The sum of the ages of a father and his son is 60 years. If the father is 4 times as old as the son, the son's age is —",
    "as": "এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ যোগফল 60 বছৰ। পিতৃ পুত্ৰতকৈ 4 গুণ ডাঙৰ হ'লে পুত্ৰৰ বয়স —"
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
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5x = 60, so x = 12 years.",
    "as": "5x = 60, গতিকে x = 12 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-009",
   "q": {
    "en": "The sum of the ages of a mother and her daughter is 55 years. If the mother is 4 times as old as the daughter, the mother's age is —",
    "as": "এজনী মাক আৰু জীয়েকৰ বয়সৰ যোগফল 55 বছৰ। মাক জীয়েকতকৈ 4 গুণ ডাঙৰ হ'লে মাকৰ বয়স —"
   },
   "options": [
    {
     "en": "44 years",
     "as": "৪৪ বছৰ"
    },
    {
     "en": "42 years",
     "as": "৪২ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "5x = 55, so the daughter is 11 and the mother is 44.",
    "as": "5x = 55, গতিকে জীয়েক 11 আৰু মাক 44।"
   }
  },
  {
   "id": "problems-on-ages-010",
   "q": {
    "en": "The present age of A is 20 years and that of B is 30 years. The ratio of their ages is —",
    "as": "A ৰ বৰ্তমান বয়স 20 বছৰ আৰু B ৰ 30 বছৰ। সিহঁতৰ বয়সৰ অনুপাত —"
   },
   "options": [
    {
     "en": "2 : 5",
     "as": "২ : ৫"
    },
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "20 : 30 = 2 : 3.",
    "as": "20 : 30 = 2 : 3।"
   }
  },
  {
   "id": "problems-on-ages-011",
   "q": {
    "en": "The ages of A and B are in the ratio 3 : 5. If A is 18 years old, B is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 3 : 5। A ৰ বয়স 18 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "27 years",
     "as": "২৭ বছৰ"
    },
    {
     "en": "33 years",
     "as": "৩৩ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "B = 5/3 x 18 = 30 years.",
    "as": "B = 5/3 x 18 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-012",
   "q": {
    "en": "The ages of A and B are in the ratio 4 : 5 and their sum is 45. A's age is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 4 : 5 আৰু যোগফল 45। A ৰ বয়স —"
   },
   "options": [
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A = 4/9 x 45 = 20 years.",
    "as": "A = 4/9 x 45 = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-013",
   "q": {
    "en": "The ages of A and B are in the ratio 5 : 7 and their difference is 8 years. B's age is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 5 : 7 আৰু পাৰ্থক্য 8 বছৰ। B ৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each part = 4, so B = 7 x 4 = 28 years.",
    "as": "প্ৰতিটো অংশ = 4, গতিকে B = 7 x 4 = 28 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-014",
   "q": {
    "en": "A's age is 5 years more than B's age. If the sum of their ages is 45, A's age is —",
    "as": "A ৰ বয়স B ৰ বয়সতকৈ 5 বছৰ বেছি। সিহঁতৰ বয়সৰ যোগফল 45 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    },
    {
     "en": "27 years",
     "as": "২৭ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B + (B + 5) = 45 gives B = 20 and A = 25.",
    "as": "B + (B + 5) = 45 ৰ পৰা B = 20 আৰু A = 25 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-015",
   "q": {
    "en": "The age of A is 3 times the age of B. If the sum of their ages is 64, B's age is —",
    "as": "A ৰ বয়স B ৰ বয়সৰ 3 গুণ। সিহঁতৰ বয়সৰ যোগফল 64 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "4x = 64, so x = 16 years.",
    "as": "4x = 64, গতিকে x = 16 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-016",
   "q": {
    "en": "The present age of a man is 3 times his son's age. After 4 years, the man will be 2.5 times his son's age. The son's present age is —",
    "as": "এজন মানুহৰ বৰ্তমান বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 3 গুণ। 4 বছৰৰ পিছত তেওঁ পুত্ৰৰ বয়সৰ 2.5 গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "3x + 4 = 2.5(x + 4) gives 0.5x = 6, so x = 12.",
    "as": "3x + 4 = 2.5(x + 4) ৰ পৰা 0.5x = 6, গতিকে x = 12।"
   }
  },
  {
   "id": "problems-on-ages-017",
   "q": {
    "en": "A is 5 years older than B. After 10 years the sum of their ages will be 65. The present age of A is —",
    "as": "A B তকৈ 5 বছৰ ডাঙৰ। 10 বছৰৰ পিছত সিহঁতৰ বয়সৰ যোগফল 65 হ'ব। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Present sum = 45, so B = 20 and A = 25.",
    "as": "বৰ্তমান যোগফল = 45, গতিকে B = 20 আৰু A = 25।"
   }
  },
  {
   "id": "problems-on-ages-018",
   "q": {
    "en": "The ratio of the present ages of A and B is 2 : 3. After 6 years the ratio becomes 3 : 4. The present age of A is —",
    "as": "A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত 2 : 3। 6 বছৰৰ পিছত অনুপাত 3 : 4 হয়। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Solving (2x + 6)/(3x + 6) = 3/4 gives x = 6, so A = 12.",
    "as": "(2x + 6)/(3x + 6) = 3/4 সমাধান কৰিলে x = 6, গতিকে A = 12।"
   }
  },
  {
   "id": "problems-on-ages-019",
   "q": {
    "en": "The present ages of A and B are in the ratio 5 : 4. After 5 years the ratio becomes 6 : 5. The present age of B is —",
    "as": "A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত 5 : 4। 5 বছৰৰ পিছত অনুপাত 6 : 5 হয়। B ৰ বৰ্তমান বয়স —"
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
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Solving gives x = 5, so B = 20 years.",
    "as": "সমাধান কৰিলে x = 5, গতিকে B = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-020",
   "q": {
    "en": "A mother is 24 years older than her daughter. In 4 years the mother will be 3 times as old as her daughter. The daughter's present age is —",
    "as": "এজনী মাক তেওঁৰ জীয়েকতকৈ 24 বছৰ ডাঙৰ। 4 বছৰৰ পিছত মাক জীয়েকতকৈ 3 গুণ ডাঙৰ হ'ব। জীয়েকৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "x + 28 = 3(x + 4) gives x = 8.",
    "as": "x + 28 = 3(x + 4) ৰ পৰা x = 8 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-021",
   "q": {
    "en": "A father's age is 3 times his son's age. Five years ago the father was 4 times his son. The son's present age is —",
    "as": "এজন পিতৃৰ বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 3 গুণ। পাঁচ বছৰ আগতে পিতৃ পুত্ৰতকৈ 4 গুণ আছিল। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
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
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3x - 5 = 4(x - 5) gives x = 15.",
    "as": "3x - 5 = 4(x - 5) ৰ পৰা x = 15 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-022",
   "q": {
    "en": "The sum of the ages of a father and his son is 64 years. Six years ago the father was 3 times as old as the son. The son's present age is —",
    "as": "এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ যোগফল 64 বছৰ। ছয় বছৰ আগতে পিতৃ পুত্ৰতকৈ 3 গুণ আছিল। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "17 years",
     "as": "১৭ বছৰ"
    },
    {
     "en": "19 years",
     "as": "১৯ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Six years ago the sum was 52; with father = 3 x son, the son was 13, so he is now 19.",
    "as": "ছয় বছৰ আগতে যোগফল 52 আছিল; পিতৃ = 3 x পুত্ৰ হ'লে পুত্ৰ 13 আছিল, গতিকে এতিয়া 19।"
   }
  },
  {
   "id": "problems-on-ages-023",
   "q": {
    "en": "The average age of a family of 5 members is 30 years. The total age is —",
    "as": "5 জনীয়া এটা পৰিয়ালৰ গড় বয়স 30 বছৰ। মুঠ বয়স —"
   },
   "options": [
    {
     "en": "120 years",
     "as": "১২০ বছৰ"
    },
    {
     "en": "140 years",
     "as": "১৪০ বছৰ"
    },
    {
     "en": "150 years",
     "as": "১৫০ বছৰ"
    },
    {
     "en": "160 years",
     "as": "১৬০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Total = 30 x 5 = 150 years.",
    "as": "মুঠ = 30 x 5 = 150 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-024",
   "q": {
    "en": "The average age of 4 brothers is 15 years. If the youngest is 9 years old, the average age of the other three is —",
    "as": "4 জন ভাইৰ গড় বয়স 15 বছৰ। সৰুজনৰ বয়স 9 হ'লে বাকী তিনিজনৰ গড় বয়স —"
   },
   "options": [
    {
     "en": "17 years",
     "as": "১৭ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "19 years",
     "as": "১৯ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Total = 60; removing 9 leaves 51 and 51 / 3 = 17.",
    "as": "মুঠ = 60; 9 বাদ দিলে 51 আৰু 51 / 3 = 17।"
   }
  },
  {
   "id": "problems-on-ages-025",
   "q": {
    "en": "A man's age is 4 times his son's age. The sum of their ages is 50. The son's age is —",
    "as": "এজন মানুহৰ বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 4 গুণ। সিহঁতৰ বয়সৰ যোগফল 50। পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5x = 50, so x = 10.",
    "as": "5x = 50, গতিকে x = 10।"
   }
  },
  {
   "id": "problems-on-ages-026",
   "q": {
    "en": "The present age of A is 12 years and that of B is 18 years. After how many years will the ratio of their ages be 4 : 5?",
    "as": "A ৰ বৰ্তমান বয়স 12 বছৰ আৰু B ৰ 18 বছৰ। কিমান বছৰৰ পিছত সিহঁতৰ বয়সৰ অনুপাত 4 : 5 হ'ব?"
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
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "(12 + x)/(18 + x) = 4/5 gives x = 12.",
    "as": "(12 + x)/(18 + x) = 4/5 ৰ পৰা x = 12 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-027",
   "q": {
    "en": "Ten years ago the age of a father was 3 times the age of his son. Ten years hence the father will be twice the age of his son. The present age of the son is —",
    "as": "দহ বছৰ আগতে এজন পিতৃৰ বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 3 গুণ আছিল। দহ বছৰৰ পিছত পিতৃ পুত্ৰতকৈ দুগুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Solving the two equations gives the son's present age 30.",
    "as": "দুটা সমীকৰণ সমাধান কৰিলে পুত্ৰৰ বৰ্তমান বয়স 30 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-028",
   "q": {
    "en": "A is 4 years older than B and B is 6 years older than C. If the sum of their ages is 61, the age of A is —",
    "as": "A B তকৈ 4 বছৰ ডাঙৰ আৰু B C তকৈ 6 বছৰ ডাঙৰ। সিহঁতৰ বয়সৰ যোগফল 61 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "19 years",
     "as": "১৯ বছৰ"
    },
    {
     "en": "21 years",
     "as": "২১ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "23 years",
     "as": "২৩ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Let C = x; then x + (x + 6) + (x + 10) = 61 gives 3x = 45, so C = 15 and A = 25.",
    "as": "C = x ধৰিলে x + (x + 6) + (x + 10) = 61, 3x = 45, গতিকে C = 15 আৰু A = 25।"
   }
  },
  {
   "id": "problems-on-ages-029",
   "q": {
    "en": "The sum of the ages of A and B is 60. If A is twice as old as B, A's age is —",
    "as": "A আৰু B ৰ বয়সৰ যোগফল 60। A B তকৈ দুগুণ ডাঙৰ হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "3x = 60, so B = 20 and A = 40.",
    "as": "3x = 60, গতিকে B = 20 আৰু A = 40।"
   }
  },
  {
   "id": "problems-on-ages-030",
   "q": {
    "en": "The sum of the ages of A and B is 60. If A is twice as old as B, B's age is —",
    "as": "A আৰু B ৰ বয়সৰ যোগফল 60। A B তকৈ দুগুণ ডাঙৰ হ'লে B ৰ বয়স —"
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
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3x = 60, so x = 20 years.",
    "as": "3x = 60, গতিকে x = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-031",
   "q": {
    "en": "A man is 3 times as old as his son. The difference of their ages is 30 years. The son's age is —",
    "as": "এজন মানুহ তেওঁৰ পুত্ৰতকৈ 3 গুণ ডাঙৰ। সিহঁতৰ বয়সৰ পাৰ্থক্য 30 বছৰ। পুত্ৰৰ বয়স —"
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
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "2x = 30, so x = 15 years.",
    "as": "2x = 30, গতিকে x = 15 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-032",
   "q": {
    "en": "A man is 4 times as old as his son. The difference of their ages is 27 years. The son's age is —",
    "as": "এজন মানুহ তেওঁৰ পুত্ৰতকৈ 4 গুণ ডাঙৰ। সিহঁতৰ বয়সৰ পাৰ্থক্য 27 বছৰ। পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "7 years",
     "as": "৭ বছৰ"
    },
    {
     "en": "13 years",
     "as": "১৩ বছৰ"
    },
    {
     "en": "11 years",
     "as": "১১ বছৰ"
    },
    {
     "en": "9 years",
     "as": "৯ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3x = 27, so x = 9 years.",
    "as": "3x = 27, গতিকে x = 9 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-033",
   "q": {
    "en": "The present age of A is 24 years. In how many years will he be 36 years old?",
    "as": "A ৰ বৰ্তমান বয়স 24 বছৰ। কিমান বছৰৰ পিছত তেওঁ 36 বছৰ হ'ব?"
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
     "en": "11 years",
     "as": "১১ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "36 - 24 = 12 years.",
    "as": "36 - 24 = 12 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-034",
   "q": {
    "en": "A is 6 years older than B. In 4 years A will be twice as old as B. B's present age is —",
    "as": "A B তকৈ 6 বছৰ ডাঙৰ। 4 বছৰৰ পিছত A B তকৈ দুগুণ হ'ব। B ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "2 years",
     "as": "২ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "x + 10 = 2(x + 4) gives x = 2.",
    "as": "x + 10 = 2(x + 4) ৰ পৰা x = 2 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-035",
   "q": {
    "en": "The ratio of the ages of a father and his son is 7 : 2. If the son is 12 years old, the father is —",
    "as": "এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ অনুপাত 7 : 2। পুত্ৰৰ বয়স 12 হ'লে পিতৃৰ বয়স —"
   },
   "options": [
    {
     "en": "36 years",
     "as": "৩৬ বছৰ"
    },
    {
     "en": "38 years",
     "as": "৩৮ বছৰ"
    },
    {
     "en": "42 years",
     "as": "৪২ বছৰ"
    },
    {
     "en": "49 years",
     "as": "৪৯ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Father = 7/2 x 12 = 42 years.",
    "as": "পিতৃ = 7/2 x 12 = 42 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-036",
   "q": {
    "en": "The ages of A and B are in the ratio 2 : 3. If the sum of their ages is 40, the age of B is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 2 : 3। যোগফল 40 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "B = 3/5 x 40 = 24 years.",
    "as": "B = 3/5 x 40 = 24 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-037",
   "q": {
    "en": "A person's age is 32 years and his son's age is 8 years. The ratio of their ages is —",
    "as": "এজন ব্যক্তিৰ বয়স 32 বছৰ আৰু তেওঁৰ পুত্ৰৰ বয়স 8 বছৰ। সিহঁতৰ বয়সৰ অনুপাত —"
   },
   "options": [
    {
     "en": "1 : 3",
     "as": "১ : ৩"
    },
    {
     "en": "1 : 4",
     "as": "১ : ৪"
    },
    {
     "en": "3 : 1",
     "as": "৩ : ১"
    },
    {
     "en": "4 : 1",
     "as": "৪ : ১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "32 : 8 = 4 : 1.",
    "as": "32 : 8 = 4 : 1।"
   }
  },
  {
   "id": "problems-on-ages-038",
   "q": {
    "en": "The sum of the ages of a father and his son is 56 years. If the father is 3 times as old as the son, the father's age is —",
    "as": "এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ যোগফল 56 বছৰ। পিতৃ পুত্ৰতকৈ 3 গুণ ডাঙৰ হ'লে পিতৃৰ বয়স —"
   },
   "options": [
    {
     "en": "36 years",
     "as": "৩৬ বছৰ"
    },
    {
     "en": "42 years",
     "as": "৪২ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "38 years",
     "as": "৩৮ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "4x = 56, so the son is 14 and the father is 42.",
    "as": "4x = 56, গতিকে পুত্ৰ 14 আৰু পিতৃ 42।"
   }
  },
  {
   "id": "problems-on-ages-039",
   "q": {
    "en": "A man is 5 times as old as his son. The sum of their ages is 72. The son's age is —",
    "as": "এজন মানুহ তেওঁৰ পুত্ৰতকৈ 5 গুণ ডাঙৰ। সিহঁতৰ বয়সৰ যোগফল 72। পুত্ৰৰ বয়স —"
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
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "6x = 72, so x = 12 years.",
    "as": "6x = 72, গতিকে x = 12 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-040",
   "q": {
    "en": "The age of A is twice the age of B and B is twice the age of C. If C is 8 years old, A is —",
    "as": "A ৰ বয়স B ৰ দুগুণ আৰু B ৰ বয়স C ৰ দুগুণ। C ৰ বয়স 8 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B = 16 and A = 32 years.",
    "as": "B = 16 আৰু A = 32 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-041",
   "q": {
    "en": "The present age of a father is 3 times his son's age. In 5 years the father will be 2.5 times his son. The son's present age is —",
    "as": "এজন পিতৃৰ বৰ্তমান বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 3 গুণ। 5 বছৰৰ পিছত পিতৃ পুত্ৰতকৈ 2.5 গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
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
   "correct": 3,
   "explanation": {
    "en": "3x + 5 = 2.5(x + 5) gives x = 10.",
    "as": "3x + 5 = 2.5(x + 5) ৰ পৰা x = 10 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-042",
   "q": {
    "en": "A is 10 years older than B. If the sum of their ages is 50, B's age is —",
    "as": "A B তকৈ 10 বছৰ ডাঙৰ। যোগফল 50 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "22 years",
     "as": "২২ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "2B + 10 = 50 gives B = 20.",
    "as": "2B + 10 = 50 ৰ পৰা B = 20 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-043",
   "q": {
    "en": "A is 8 years older than B. After 2 years the sum of their ages will be 48. B's present age is —",
    "as": "A B তকৈ 8 বছৰ ডাঙৰ। 2 বছৰৰ পিছত সিহঁতৰ বয়সৰ যোগফল 48 হ'ব। B ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Present sum = 44, so 2B + 8 = 44 and B = 18.",
    "as": "বৰ্তমান যোগফল = 44, গতিকে 2B + 8 = 44 আৰু B = 18।"
   }
  },
  {
   "id": "problems-on-ages-044",
   "q": {
    "en": "The age of a man is 40 years and his son is 10 years. After how many years will the man be twice as old as his son?",
    "as": "এজন মানুহৰ বয়স 40 বছৰ আৰু পুত্ৰৰ 10 বছৰ। কিমান বছৰৰ পিছত মানুহজন পুত্ৰতকৈ দুগুণ হ'ব?"
   },
   "options": [
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "40 + x = 2(10 + x) gives x = 20.",
    "as": "40 + x = 2(10 + x) ৰ পৰা x = 20 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-045",
   "q": {
    "en": "The ratio of the ages of A and B is 3 : 4. After 4 years the ratio becomes 4 : 5. The present age of B is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 3 : 4। 4 বছৰৰ পিছত অনুপাত 4 : 5 হয়। B ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Solving (3x + 4)/(4x + 4) = 4/5 gives x = 4, so B = 16.",
    "as": "(3x + 4)/(4x + 4) = 4/5 সমাধান কৰিলে x = 4, গতিকে B = 16।"
   }
  },
  {
   "id": "problems-on-ages-046",
   "q": {
    "en": "A man is 30 years old and his son is 6 years old. In how many years will the man be 3 times as old as his son?",
    "as": "এজন মানুহৰ বয়স 30 বছৰ আৰু পুত্ৰৰ 6 বছৰ। কিমান বছৰৰ পিছত মানুহজন পুত্ৰতকৈ 3 গুণ হ'ব?"
   },
   "options": [
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "30 + x = 3(6 + x) gives x = 6.",
    "as": "30 + x = 3(6 + x) ৰ পৰা x = 6 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-047",
   "q": {
    "en": "The sum of the ages of A, B and C is 90 years. If B is twice A and C is three times A, the age of A is —",
    "as": "A, B আৰু C ৰ বয়সৰ যোগফল 90 বছৰ। B, A ৰ দুগুণ আৰু C, A ৰ তিনিগুণ হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "6x = 90, so A = 15.",
    "as": "6x = 90, গতিকে A = 15।"
   }
  },
  {
   "id": "problems-on-ages-048",
   "q": {
    "en": "The present age of A is 18 years and that of B is 24 years. Four years ago the ratio of their ages was —",
    "as": "A ৰ বৰ্তমান বয়স 18 বছৰ আৰু B ৰ 24 বছৰ। চাৰি বছৰ আগতে সিহঁতৰ বয়সৰ অনুপাত আছিল —"
   },
   "options": [
    {
     "en": "7 : 12",
     "as": "৭ : ১২"
    },
    {
     "en": "7 : 10",
     "as": "৭ : ১০"
    },
    {
     "en": "14 : 20",
     "as": "১৪ : ২০"
    },
    {
     "en": "6 : 10",
     "as": "৬ : ১০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Four years ago the ages were 14 and 20, so the ratio is 7 : 10.",
    "as": "চাৰি বছৰ আগতে বয়স 14 আৰু 20 আছিল, গতিকে অনুপাত 7 : 10।"
   }
  },
  {
   "id": "problems-on-ages-049",
   "q": {
    "en": "The age of A is 1/3 of the age of B. If A is 12 years old, B is —",
    "as": "A ৰ বয়স B ৰ 1/3। A ৰ বয়স 12 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    },
    {
     "en": "36 years",
     "as": "৩৬ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B = 3 x 12 = 36 years.",
    "as": "B = 3 x 12 = 36 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-050",
   "q": {
    "en": "A's age is 20% more than B's age. If B is 25 years old, A is —",
    "as": "A ৰ বয়স B ৰ বয়সতকৈ 20% বেছি। B ৰ বয়স 25 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A = 25 x 1.2 = 30 years.",
    "as": "A = 25 x 1.2 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-051",
   "q": {
    "en": "The sum of the ages of a father and his two sons is 80 years. If the father is 40 years old and the elder son is 24, the younger son's age is —",
    "as": "এজন পিতৃ আৰু তেওঁৰ দুজন পুত্ৰৰ বয়সৰ যোগফল 80 বছৰ। পিতৃৰ বয়স 40 আৰু ডাঙৰ পুত্ৰৰ 24 হ'লে সৰু পুত্ৰৰ বয়স —"
   },
   "options": [
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Younger = 80 - 40 - 24 = 16 years.",
    "as": "সৰু = 80 - 40 - 24 = 16 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-052",
   "q": {
    "en": "A man was 24 years old when his son was born. Now the man is 3 times as old as his son. The son's present age is —",
    "as": "পুত্ৰ জন্ম হোৱাৰ সময়ত এজন মানুহৰ বয়স 24 আছিল। এতিয়া মানুহজন পুত্ৰতকৈ 3 গুণ ডাঙৰ। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3x = x + 24 gives x = 12.",
    "as": "3x = x + 24 ৰ পৰা x = 12 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-053",
   "q": {
    "en": "The age of A is 3 years more than twice the age of B. If B is 9 years old, A is —",
    "as": "A ৰ বয়স B ৰ বয়সৰ দুগুণতকৈ 3 বছৰ বেছি। B ৰ বয়স 9 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "21 years",
     "as": "২১ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A = 2 x 9 + 3 = 21 years.",
    "as": "A = 2 x 9 + 3 = 21 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-054",
   "q": {
    "en": "The ratio of the ages of A and B is 6 : 5. If A is 30 years old, B is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 6 : 5। A ৰ বয়স 30 হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "B = 5/6 x 30 = 25 years.",
    "as": "B = 5/6 x 30 = 25 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-055",
   "q": {
    "en": "The present age of A is 15 years and that of B is 45 years. In how many years will B be twice as old as A?",
    "as": "A ৰ বৰ্তমান বয়স 15 বছৰ আৰু B ৰ 45 বছৰ। কিমান বছৰৰ পিছত B, A তকৈ দুগুণ হ'ব?"
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
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "45 + x = 2(15 + x) gives x = 15.",
    "as": "45 + x = 2(15 + x) ৰ পৰা x = 15 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-056",
   "q": {
    "en": "The average age of a group of 10 persons is 25 years. If a person of 35 years joins, the new average is —",
    "as": "10 জনীয়া এটা গোটৰ গড় বয়স 25 বছৰ। 35 বছৰীয়া এজন যোগ দিলে নতুন গড় —"
   },
   "options": [
    {
     "en": "25.5 years",
     "as": "২৫.৫ বছৰ"
    },
    {
     "en": "25.9 years",
     "as": "২৫.৯ বছৰ"
    },
    {
     "en": "26.4 years",
     "as": "২৬.৪ বছৰ"
    },
    {
     "en": "27 years",
     "as": "২৭ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total = 250 + 35 = 285 and 285 / 11 = 25.91 years.",
    "as": "মুঠ = 250 + 35 = 285 আৰু 285 / 11 = 25.91 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-057",
   "q": {
    "en": "A man's present age is 45 years. His age 15 years ago was —",
    "as": "এজন মানুহৰ বৰ্তমান বয়স 45 বছৰ। 15 বছৰ আগতে তেওঁৰ বয়স —"
   },
   "options": [
    {
     "en": "25 years",
     "as": "২৫ বছৰ"
    },
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "28 years",
     "as": "২৮ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "45 - 15 = 30 years.",
    "as": "45 - 15 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-058",
   "q": {
    "en": "The ages of A, B and C are in the ratio 2 : 3 : 4. If the sum of their ages is 45, the age of C is —",
    "as": "A, B আৰু C ৰ বয়সৰ অনুপাত 2 : 3 : 4। যোগফল 45 হ'লে C ৰ বয়স —"
   },
   "options": [
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "15 years",
     "as": "১৫ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "C = 4/9 x 45 = 20 years.",
    "as": "C = 4/9 x 45 = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-059",
   "q": {
    "en": "A is twice as old as B. If the difference of their ages is 18 years, B's age is —",
    "as": "A B তকৈ দুগুণ ডাঙৰ। সিহঁতৰ বয়সৰ পাৰ্থক্য 18 বছৰ হ'লে B ৰ বয়স —"
   },
   "options": [
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
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
     "en": "20 years",
     "as": "২০ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "2x - x = 18, so x = 18 years.",
    "as": "2x - x = 18, গতিকে x = 18 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-060",
   "q": {
    "en": "The present age of a man is 4 times his son's age. After 10 years the sum of their ages will be 80. The son's present age is —",
    "as": "এজন মানুহৰ বৰ্তমান বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 4 গুণ। 10 বছৰৰ পিছত সিহঁতৰ বয়সৰ যোগফল 80 হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Present sum = 60, so 5x = 60 and x = 12.",
    "as": "বৰ্তমান যোগফল = 60, গতিকে 5x = 60 আৰু x = 12।"
   }
  },
  {
   "id": "problems-on-ages-061",
   "q": {
    "en": "A's age is 2 years less than B's age. If the sum of their ages is 30, A's age is —",
    "as": "A ৰ বয়স B ৰ বয়সতকৈ 2 বছৰ কম। যোগফল 30 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "14 years",
     "as": "১৪ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "2B - 2 = 30 gives B = 16 and A = 14.",
    "as": "2B - 2 = 30 ৰ পৰা B = 16 আৰু A = 14 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-062",
   "q": {
    "en": "The sum of the ages of A and B is 40 years. If A is 3 times as old as B, the age of A is —",
    "as": "A আৰু B ৰ বয়সৰ যোগফল 40 বছৰ। A B তকৈ 3 গুণ ডাঙৰ হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "32 years",
     "as": "৩২ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "4x = 40, so B = 10 and A = 30.",
    "as": "4x = 40, গতিকে B = 10 আৰু A = 30।"
   }
  },
  {
   "id": "problems-on-ages-063",
   "q": {
    "en": "The present age of a father is 5 times his son's age. In 6 years the father will be 3 times his son. The son's present age is —",
    "as": "এজন পিতৃৰ বৰ্তমান বয়স তেওঁৰ পুত্ৰৰ বয়সৰ 5 গুণ। 6 বছৰৰ পিছত পিতৃ পুত্ৰতকৈ 3 গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "5x + 6 = 3(x + 6) gives x = 6.",
    "as": "5x + 6 = 3(x + 6) ৰ পৰা x = 6 পোৱা যায়।"
   }
  },
  {
   "id": "problems-on-ages-064",
   "q": {
    "en": "The ages of two persons are in the ratio 4 : 3. Four years hence their ages will be in the ratio 6 : 5. The present age of the younger person is —",
    "as": "দুজন ব্যক্তিৰ বয়সৰ অনুপাত 4 : 3। চাৰি বছৰৰ পিছত সিহঁতৰ বয়সৰ অনুপাত 6 : 5 হ'ব। সৰুজনৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "(4x + 4)/(3x + 4) = 6/5 gives 20x + 20 = 18x + 24, so x = 2 and the younger is 8.",
    "as": "(4x + 4)/(3x + 4) = 6/5 ৰ পৰা 20x + 20 = 18x + 24, গতিকে x = 2 আৰু সৰুজন 8।"
   }
  },
  {
   "id": "problems-on-ages-065",
   "q": {
    "en": "A man is 8 times as old as his son. In 3 years he will be 5 times as old. The son's present age is —",
    "as": "এজন মানুহ তেওঁৰ পুত্ৰতকৈ 8 গুণ ডাঙৰ। 3 বছৰৰ পিছত তেওঁ 5 গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    },
    {
     "en": "6 years",
     "as": "৬ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "8x + 3 = 5(x + 3) gives 3x = 12, so x = 4.",
    "as": "8x + 3 = 5(x + 3) ৰ পৰা 3x = 12, গতিকে x = 4।"
   }
  }
 ],
 "profit-loss": [
  {
   "id": "profit-loss-001",
   "q": {
    "en": "An article bought for 400 is sold for 460. The profit is —",
    "as": "400 টকাত কিনা সামগ্ৰী 460 টকাত বিক্ৰী হ'লে লাভ —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "70",
     "as": "৭০"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Profit = 460 - 400 = 60.",
    "as": "লাভ = 460 - 400 = 60।"
   }
  },
  {
   "id": "profit-loss-002",
   "q": {
    "en": "An article bought for 500 is sold for 450. The loss is —",
    "as": "500 টকাত কিনা সামগ্ৰী 450 টকাত বিক্ৰী হ'লে লোকচান —"
   },
   "options": [
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Loss = 500 - 450 = 50.",
    "as": "লোকচান = 500 - 450 = 50।"
   }
  },
  {
   "id": "profit-loss-003",
   "q": {
    "en": "The profit per cent when an article bought for 250 is sold for 300 is —",
    "as": "250 টকাত কিনা সামগ্ৰী 300 টকাত বিক্ৰী হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "16%",
     "as": "১৬%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "18%",
     "as": "১৮%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Profit = 50; 50 / 250 x 100 = 20%.",
    "as": "লাভ = 50; 50 / 250 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-004",
   "q": {
    "en": "The loss per cent when an article bought for 400 is sold for 360 is —",
    "as": "400 টকাত কিনা সামগ্ৰী 360 টকাত বিক্ৰী হ'লে শতকৰা লোকচান —"
   },
   "options": [
    {
     "en": "8%",
     "as": "৮%"
    },
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
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Loss = 40; 40 / 400 x 100 = 10%.",
    "as": "লোকচান = 40; 40 / 400 x 100 = 10%।"
   }
  },
  {
   "id": "profit-loss-005",
   "q": {
    "en": "If the cost price is 200 and the profit is 15%, the selling price is —",
    "as": "ক্ৰয় মূল্য 200 আৰু লাভ 15% হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "215",
     "as": "২১৫"
    },
    {
     "en": "230",
     "as": "২৩০"
    },
    {
     "en": "220",
     "as": "২২০"
    },
    {
     "en": "235",
     "as": "২৩৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SP = 200 x 1.15 = 230.",
    "as": "বিক্ৰয় মূল্য = 200 x 1.15 = 230।"
   }
  },
  {
   "id": "profit-loss-006",
   "q": {
    "en": "If the selling price is 240 and the profit is 20%, the cost price is —",
    "as": "বিক্ৰয় মূল্য 240 আৰু লাভ 20% হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "190",
     "as": "১৯০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "210",
     "as": "২১০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 240 / 1.2 = 200.",
    "as": "ক্ৰয় মূল্য = 240 / 1.2 = 200।"
   }
  },
  {
   "id": "profit-loss-007",
   "q": {
    "en": "If the selling price is 342 and the loss is 5%, the cost price is —",
    "as": "বিক্ৰয় মূল্য 342 আৰু লোকচান 5% হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "350",
     "as": "৩৫০"
    },
    {
     "en": "365",
     "as": "৩৬৫"
    },
    {
     "en": "360",
     "as": "৩৬০"
    },
    {
     "en": "370",
     "as": "৩৭০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 342 / 0.95 = 360.",
    "as": "ক্ৰয় মূল্য = 342 / 0.95 = 360।"
   }
  },
  {
   "id": "profit-loss-008",
   "q": {
    "en": "An article sold for 720 gives a profit of 20%. The cost price is —",
    "as": "720 টকাত বিক্ৰী কৰা সামগ্ৰীয়ে 20% লাভ দিয়ে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "580",
     "as": "৫৮০"
    },
    {
     "en": "560",
     "as": "৫৬০"
    },
    {
     "en": "620",
     "as": "৬২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 720 / 1.2 = 600.",
    "as": "ক্ৰয় মূল্য = 720 / 1.2 = 600।"
   }
  },
  {
   "id": "profit-loss-009",
   "q": {
    "en": "An article sold for 460 incurs a loss of 8%. The cost price is —",
    "as": "460 টকাত বিক্ৰী কৰা সামগ্ৰীয়ে 8% লোকচান দিয়ে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "480",
     "as": "৪৮০"
    },
    {
     "en": "490",
     "as": "৪৯০"
    },
    {
     "en": "520",
     "as": "৫২০"
    },
    {
     "en": "500",
     "as": "৫০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "CP = 460 / 0.92 = 500.",
    "as": "ক্ৰয় মূল্য = 460 / 0.92 = 500।"
   }
  },
  {
   "id": "profit-loss-010",
   "q": {
    "en": "By selling an article for 540 a man gains 12.5%. The cost price is —",
    "as": "এটা সামগ্ৰী 540 টকাত বিক্ৰী কৰি এজনে 12.5% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "460",
     "as": "৪৬০"
    },
    {
     "en": "480",
     "as": "৪৮০"
    },
    {
     "en": "470",
     "as": "৪৭০"
    },
    {
     "en": "490",
     "as": "৪৯০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP = 540 / 1.125 = 480.",
    "as": "ক্ৰয় মূল্য = 540 / 1.125 = 480।"
   }
  },
  {
   "id": "profit-loss-011",
   "q": {
    "en": "The marked price of an article is 800 and a discount of 15% is given. The selling price is —",
    "as": "এটা সামগ্ৰীৰ চিহ্নিত মূল্য 800 আৰু 15% ৰেহাই দিয়া হয়। বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "660",
     "as": "৬৬০"
    },
    {
     "en": "670",
     "as": "৬৭০"
    },
    {
     "en": "680",
     "as": "৬৮০"
    },
    {
     "en": "690",
     "as": "৬৯০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SP = 800 x 0.85 = 680.",
    "as": "বিক্ৰয় মূল্য = 800 x 0.85 = 680।"
   }
  },
  {
   "id": "profit-loss-012",
   "q": {
    "en": "The marked price is 500 and the discount is 20%. The discount amount is —",
    "as": "চিহ্নিত মূল্য 500 আৰু ৰেহাই 20%। ৰেহাইৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "80",
     "as": "৮০"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Discount = 500 x 20 / 100 = 100.",
    "as": "ৰেহাই = 500 x 20 / 100 = 100।"
   }
  },
  {
   "id": "profit-loss-013",
   "q": {
    "en": "A shopkeeper marks an article 25% above cost and gives a discount of 10%. His profit per cent is —",
    "as": "এজন দোকানীয়ে ক্ৰয় মূল্যতকৈ 25% বেছি চিহ্নিত কৰি 10% ৰেহাই দিয়ে। তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "12.5%",
     "as": "১২.৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 1.25 x 0.9 = 1.125, a profit of 12.5%.",
    "as": "বিক্ৰয় মূল্য = 1.25 x 0.9 = 1.125, লাভ 12.5%।"
   }
  },
  {
   "id": "profit-loss-014",
   "q": {
    "en": "A man buys an article for 600 and sells it at a loss of 10%. He sells it for —",
    "as": "এজনে 600 টকাত সামগ্ৰী কিনি 10% লোকচানত বিক্ৰী কৰে। বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "530",
     "as": "৫৩০"
    },
    {
     "en": "540",
     "as": "৫৪০"
    },
    {
     "en": "550",
     "as": "৫৫০"
    },
    {
     "en": "560",
     "as": "৫৬০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SP = 600 x 0.9 = 540.",
    "as": "বিক্ৰয় মূল্য = 600 x 0.9 = 540।"
   }
  },
  {
   "id": "profit-loss-015",
   "q": {
    "en": "If the cost price of 10 articles equals the selling price of 8 articles, the profit per cent is —",
    "as": "10 টা সামগ্ৰীৰ ক্ৰয় মূল্য 8 টা সামগ্ৰীৰ বিক্ৰয় মূল্যৰ সমান হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
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
     "en": "40%",
     "as": "৪০%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Profit% = (10 - 8)/8 x 100 = 25%.",
    "as": "লাভ% = (10 - 8)/8 x 100 = 25%।"
   }
  },
  {
   "id": "profit-loss-016",
   "q": {
    "en": "If the cost price of 12 pens equals the selling price of 15 pens, the loss per cent is —",
    "as": "12 টা কলমৰ ক্ৰয় মূল্য 15 টা কলমৰ বিক্ৰয় মূল্যৰ সমান হ'লে শতকৰা লোকচান —"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Loss% = (15 - 12)/15 x 100 = 20%.",
    "as": "লোকচান% = (15 - 12)/15 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-017",
   "q": {
    "en": "A trader sells two articles at 1,000 each, one at 20% profit and the other at 20% loss. His overall result is —",
    "as": "এজন ব্যৱসায়ীয়ে 1,000 টকাকৈ দুটা সামগ্ৰী বিক্ৰী কৰে, এটাত 20% লাভ আৰু আনটোত 20% লোকচান। তেওঁৰ মুঠ ফলাফল —"
   },
   "options": [
    {
     "en": "4% loss",
     "as": "৪% লোকচান"
    },
    {
     "en": "no profit no loss",
     "as": "লাভ-লোকচান নাই"
    },
    {
     "en": "4% profit",
     "as": "৪% লাভ"
    },
    {
     "en": "2% loss",
     "as": "২% লোকচান"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "For equal SP with equal gain and loss per cent, there is always a loss of (20^2)/100 = 4%.",
    "as": "সমান বিক্ৰয় মূল্য আৰু সমান লাভ-লোকচান শতাংশত সদায় (20^2)/100 = 4% লোকচান হয়।"
   }
  },
  {
   "id": "profit-loss-018",
   "q": {
    "en": "A shopkeeper sells an article at a profit of 25%. If the cost price is 320, the selling price is —",
    "as": "এজন দোকানীয়ে এটা সামগ্ৰী 25% লাভত বিক্ৰী কৰে। ক্ৰয় মূল্য 320 হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "380",
     "as": "৩৮০"
    },
    {
     "en": "390",
     "as": "৩৯০"
    },
    {
     "en": "410",
     "as": "৪১০"
    },
    {
     "en": "400",
     "as": "৪০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 320 x 1.25 = 400.",
    "as": "বিক্ৰয় মূল্য = 320 x 1.25 = 400।"
   }
  },
  {
   "id": "profit-loss-019",
   "q": {
    "en": "If an article is sold for 450 at a loss of 10%, the cost price is —",
    "as": "এটা সামগ্ৰী 450 টকাত 10% লোকচানত বিক্ৰী হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "490",
     "as": "৪৯০"
    },
    {
     "en": "495",
     "as": "৪৯৫"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "510",
     "as": "৫১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 450 / 0.9 = 500.",
    "as": "ক্ৰয় মূল্য = 450 / 0.9 = 500।"
   }
  },
  {
   "id": "profit-loss-020",
   "q": {
    "en": "A man sells a watch for 1,140 and gains 14%. The cost price is —",
    "as": "এজনে এটা ঘড়ী 1,140 টকাত বিক্ৰী কৰি 14% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "980",
     "as": "৯৮০"
    },
    {
     "en": "990",
     "as": "৯৯০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,020",
     "as": "১,০২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 1140 / 1.14 = 1,000.",
    "as": "ক্ৰয় মূল্য = 1140 / 1.14 = 1,000।"
   }
  },
  {
   "id": "profit-loss-021",
   "q": {
    "en": "The profit made by selling an article for 625 which cost 500 is —",
    "as": "500 টকাৰ সামগ্ৰী 625 টকাত বিক্ৰী কৰি পোৱা লাভ —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "115",
     "as": "১১৫"
    },
    {
     "en": "135",
     "as": "১৩৫"
    },
    {
     "en": "125",
     "as": "১২৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Profit = 125.",
    "as": "লাভ = 125।"
   }
  },
  {
   "id": "profit-loss-022",
   "q": {
    "en": "The profit per cent when an article bought for 80 is sold for 100 is —",
    "as": "80 টকাত কিনা সামগ্ৰী 100 টকাত বিক্ৰী হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "22%",
     "as": "২২%"
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
   "correct": 0,
   "explanation": {
    "en": "Profit = 20; 20 / 80 x 100 = 25%.",
    "as": "লাভ = 20; 20 / 80 x 100 = 25%।"
   }
  },
  {
   "id": "profit-loss-023",
   "q": {
    "en": "If a man sells an article at 5% loss and the cost price is 800, the selling price is —",
    "as": "এজনে 5% লোকচানত সামগ্ৰী বিক্ৰী কৰে আৰু ক্ৰয় মূল্য 800 হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "740",
     "as": "৭৪০"
    },
    {
     "en": "750",
     "as": "৭৫০"
    },
    {
     "en": "770",
     "as": "৭৭০"
    },
    {
     "en": "760",
     "as": "৭৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 800 x 0.95 = 760.",
    "as": "বিক্ৰয় মূল্য = 800 x 0.95 = 760।"
   }
  },
  {
   "id": "profit-loss-024",
   "q": {
    "en": "A dealer buys an article for 1,200 and sells it for 1,500. His profit per cent is —",
    "as": "এজন ব্যৱসায়ীয়ে 1,200 টকাত সামগ্ৰী কিনি 1,500 টকাত বিক্ৰী কৰে। তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "22%",
     "as": "২২%"
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
   "correct": 0,
   "explanation": {
    "en": "Profit = 300; 300 / 1200 x 100 = 25%.",
    "as": "লাভ = 300; 300 / 1200 x 100 = 25%।"
   }
  },
  {
   "id": "profit-loss-025",
   "q": {
    "en": "If the selling price of 15 articles equals the cost price of 12 articles, the loss per cent is —",
    "as": "15 টা সামগ্ৰীৰ বিক্ৰয় মূল্য 12 টা সামগ্ৰীৰ ক্ৰয় মূল্যৰ সমান হ'লে শতকৰা লোকচান —"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
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
    "en": "Loss% = (15 - 12)/15 x 100 = 20%.",
    "as": "লোকচান% = (15 - 12)/15 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-026",
   "q": {
    "en": "A man bought an article for 350 and sold it at a gain of 20%. The selling price is —",
    "as": "এজনে 350 টকাত সামগ্ৰী কিনি 20% লাভত বিক্ৰী কৰে। বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "410",
     "as": "৪১০"
    },
    {
     "en": "430",
     "as": "৪৩০"
    },
    {
     "en": "420",
     "as": "৪২০"
    },
    {
     "en": "440",
     "as": "৪৪০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SP = 350 x 1.2 = 420.",
    "as": "বিক্ৰয় মূল্য = 350 x 1.2 = 420।"
   }
  },
  {
   "id": "profit-loss-027",
   "q": {
    "en": "The cost price of an article sold for 966 at a loss of 8% is —",
    "as": "8% লোকচানত 966 টকাত বিক্ৰী হোৱা সামগ্ৰীৰ ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,040",
     "as": "১,০৪০"
    },
    {
     "en": "1,050",
     "as": "১,০৫০"
    },
    {
     "en": "1,060",
     "as": "১,০৬০"
    },
    {
     "en": "1,080",
     "as": "১,০৮০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP = 966 / 0.92 = 1,050.",
    "as": "ক্ৰয় মূল্য = 966 / 0.92 = 1,050।"
   }
  },
  {
   "id": "profit-loss-028",
   "q": {
    "en": "If an article is sold for 1,320 at a profit of 10%, the cost price is —",
    "as": "এটা সামগ্ৰী 1,320 টকাত 10% লাভত বিক্ৰী হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "1,180",
     "as": "১,১৮০"
    },
    {
     "en": "1,220",
     "as": "১,২২০"
    },
    {
     "en": "1,250",
     "as": "১,২৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 1320 / 1.1 = 1,200.",
    "as": "ক্ৰয় মূল্য = 1320 / 1.1 = 1,200।"
   }
  },
  {
   "id": "profit-loss-029",
   "q": {
    "en": "A shopkeeper allows a discount of 10% on a marked price of 1,200. The selling price is —",
    "as": "এজন দোকানীয়ে 1,200 চিহ্নিত মূল্যৰ ওপৰত 10% ৰেহাই দিয়ে। বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,060",
     "as": "১,০৬০"
    },
    {
     "en": "1,070",
     "as": "১,০৭০"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    },
    {
     "en": "1,080",
     "as": "১,০৮০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 1,200 x 0.9 = 1,080.",
    "as": "বিক্ৰয় মূল্য = 1,200 x 0.9 = 1,080।"
   }
  },
  {
   "id": "profit-loss-030",
   "q": {
    "en": "The profit per cent when the cost price is 640 and the selling price is 736 is —",
    "as": "ক্ৰয় মূল্য 640 আৰু বিক্ৰয় মূল্য 736 হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "14%",
     "as": "১৪%"
    },
    {
     "en": "16%",
     "as": "১৬%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Profit = 96; 96 / 640 x 100 = 15%.",
    "as": "লাভ = 96; 96 / 640 x 100 = 15%।"
   }
  },
  {
   "id": "profit-loss-031",
   "q": {
    "en": "A man buys 20 kg of rice at 30 per kg and sells it at 36 per kg. His total profit is —",
    "as": "এজনে 20 কেজি চাউল প্ৰতি কেজি 30 টকাত কিনি প্ৰতি কেজি 36 টকাত বিক্ৰী কৰে। তেওঁৰ মুঠ লাভ —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "130",
     "as": "১৩০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Profit per kg = 6, so total = 20 x 6 = 120.",
    "as": "প্ৰতি কেজি লাভ = 6, গতিকে মুঠ = 20 x 6 = 120।"
   }
  },
  {
   "id": "profit-loss-032",
   "q": {
    "en": "A dishonest dealer sells goods at cost price but uses a weight of 900 g instead of 1 kg. His gain per cent is —",
    "as": "এজন অসাধু ব্যৱসায়ীয়ে ক্ৰয় মূল্যত সামগ্ৰী বিক্ৰী কৰে কিন্তু 1 কেজিৰ সলনি 900 গ্ৰাম ওজন ব্যৱহাৰ কৰে। তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "11.11%",
     "as": "১১.১১%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "12%",
     "as": "১২%"
    },
    {
     "en": "12.5%",
     "as": "১২.৫%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Gain% = 100/900 x 100 = 11.11%.",
    "as": "লাভ% = 100/900 x 100 = 11.11%।"
   }
  },
  {
   "id": "profit-loss-033",
   "q": {
    "en": "A shopkeeper sells an article at a loss of 20%. If the cost price is 750, the selling price is —",
    "as": "এজন দোকানীয়ে এটা সামগ্ৰী 20% লোকচানত বিক্ৰী কৰে। ক্ৰয় মূল্য 750 হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "580",
     "as": "৫৮০"
    },
    {
     "en": "590",
     "as": "৫৯০"
    },
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "610",
     "as": "৬১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SP = 750 x 0.8 = 600.",
    "as": "বিক্ৰয় মূল্য = 750 x 0.8 = 600।"
   }
  },
  {
   "id": "profit-loss-034",
   "q": {
    "en": "The selling price of an article costing 1,600 sold at a profit of 12.5% is —",
    "as": "1,600 টকাৰ সামগ্ৰী 12.5% লাভত বিক্ৰী কৰিলে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,750",
     "as": "১,৭৫০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "1,780",
     "as": "১,৭৮০"
    },
    {
     "en": "1,850",
     "as": "১,৮৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SP = 1600 x 1.125 = 1,800.",
    "as": "বিক্ৰয় মূল্য = 1600 x 1.125 = 1,800।"
   }
  },
  {
   "id": "profit-loss-035",
   "q": {
    "en": "If an article sold for 240 gives a profit of 20%, then the cost price is —",
    "as": "এটা সামগ্ৰী 240 টকাত বিক্ৰী কৰি 20% লাভ হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "190",
     "as": "১৯০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "210",
     "as": "২১০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 240 / 1.2 = 200.",
    "as": "ক্ৰয় মূল্য = 240 / 1.2 = 200।"
   }
  },
  {
   "id": "profit-loss-036",
   "q": {
    "en": "A man sells an article at a gain of 10%. Had he sold it for 30 less, he would have gained 5%. The cost price is —",
    "as": "এজনে এটা সামগ্ৰী 10% লাভত বিক্ৰী কৰে। 30 টকা কমত বিক্ৰী কৰিলে 5% লাভ হ'লহেঁতেন। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "600",
     "as": "৬০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "5% of CP = 30, so CP = 600.",
    "as": "ক্ৰয় মূল্যৰ 5% = 30, গতিকে ক্ৰয় মূল্য = 600।"
   }
  },
  {
   "id": "profit-loss-037",
   "q": {
    "en": "A man sells an article at a loss of 5%. Had he sold it for 40 more, he would have gained 5%. The cost price is —",
    "as": "এজনে এটা সামগ্ৰী 5% লোকচানত বিক্ৰী কৰে। 40 টকা বেছিত বিক্ৰী কৰিলে 5% লাভ হ'লহেঁতেন। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "300",
     "as": "৩০০"
    },
    {
     "en": "350",
     "as": "৩৫০"
    },
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "450",
     "as": "৪৫০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "10% of CP = 40, so CP = 400.",
    "as": "ক্ৰয় মূল্যৰ 10% = 40, গতিকে ক্ৰয় মূল্য = 400।"
   }
  },
  {
   "id": "profit-loss-038",
   "q": {
    "en": "The marked price of an article is 25% above the cost price. If the selling price is equal to the marked price, the profit per cent is —",
    "as": "এটা সামগ্ৰীৰ চিহ্নিত মূল্য ক্ৰয় মূল্যতকৈ 25% বেছি। বিক্ৰয় মূল্য চিহ্নিত মূল্যৰ সমান হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "35%",
     "as": "৩৫%"
    },
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 1.25 CP, so the profit is 25%.",
    "as": "বিক্ৰয় মূল্য = 1.25 ক্ৰয় মূল্য, গতিকে লাভ 25%।"
   }
  },
  {
   "id": "profit-loss-039",
   "q": {
    "en": "A trader marks his goods at 40% above cost and allows a discount of 25%. His profit per cent is —",
    "as": "এজন ব্যৱসায়ীয়ে ক্ৰয় মূল্যতকৈ 40% বেছি চিহ্নিত কৰি 25% ৰেহাই দিয়ে। তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "12.5%",
     "as": "১২.৫%"
    },
    {
     "en": "7.5%",
     "as": "৭.৫%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "5%",
     "as": "৫%"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 1.4 x 0.75 = 1.05, a profit of 5%.",
    "as": "বিক্ৰয় মূল্য = 1.4 x 0.75 = 1.05, লাভ 5%।"
   }
  },
  {
   "id": "profit-loss-040",
   "q": {
    "en": "If the cost price of 25 articles is equal to the selling price of 20 articles, the profit per cent is —",
    "as": "25 টা সামগ্ৰীৰ ক্ৰয় মূল্য 20 টা সামগ্ৰীৰ বিক্ৰয় মূল্যৰ সমান হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
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
     "en": "33.33%",
     "as": "৩৩.৩৩%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Profit% = (25 - 20)/20 x 100 = 25%.",
    "as": "লাভ% = (25 - 20)/20 x 100 = 25%।"
   }
  },
  {
   "id": "profit-loss-041",
   "q": {
    "en": "A man purchases 12 articles for 60 and sells them at 6 each. His gain per cent is —",
    "as": "এজনে 12 টা সামগ্ৰী 60 টকাত কিনি প্ৰতিটো 6 টকাত বিক্ৰী কৰে। তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP each = 5 and SP each = 6, so gain = 1/5 x 100 = 20%.",
    "as": "প্ৰতিটোৰ ক্ৰয় মূল্য = 5 আৰু বিক্ৰয় মূল্য = 6, লাভ = 1/5 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-042",
   "q": {
    "en": "If the selling price of an article is 80% of its cost price, the loss per cent is —",
    "as": "এটা সামগ্ৰীৰ বিক্ৰয় মূল্য ক্ৰয় মূল্যৰ 80% হ'লে শতকৰা লোকচান —"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "18%",
     "as": "১৮%"
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
    "en": "Loss = 20% of CP.",
    "as": "লোকচান = ক্ৰয় মূল্যৰ 20%।"
   }
  },
  {
   "id": "profit-loss-043",
   "q": {
    "en": "An article is sold at 20% profit. If the cost price is 1,500, the profit amount is —",
    "as": "এটা সামগ্ৰী 20% লাভত বিক্ৰী হয়। ক্ৰয় মূল্য 1,500 হ'লে লাভৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "300",
     "as": "৩০০"
    },
    {
     "en": "250",
     "as": "২৫০"
    },
    {
     "en": "350",
     "as": "৩৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Profit = 1,500 x 20 / 100 = 300.",
    "as": "লাভ = 1,500 x 20 / 100 = 300।"
   }
  },
  {
   "id": "profit-loss-044",
   "q": {
    "en": "A shopkeeper sells a fan for 1,150 and earns a profit of 15%. The cost price is —",
    "as": "এজন দোকানীয়ে এটা ফেন 1,150 টকাত বিক্ৰী কৰি 15% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "950",
     "as": "৯৫০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "980",
     "as": "৯৮০"
    },
    {
     "en": "1,020",
     "as": "১,০২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP = 1150 / 1.15 = 1,000.",
    "as": "ক্ৰয় মূল্য = 1150 / 1.15 = 1,000।"
   }
  },
  {
   "id": "profit-loss-045",
   "q": {
    "en": "A man bought a bicycle for 2,400 and sold it for 2,100. His loss per cent is —",
    "as": "এজনে 2,400 টকাত চাইকেল কিনি 2,100 টকাত বিক্ৰী কৰে। তেওঁৰ শতকৰা লোকচান —"
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
     "en": "11.5%",
     "as": "১১.৫%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Loss = 300; 300 / 2400 x 100 = 12.5%.",
    "as": "লোকচান = 300; 300 / 2400 x 100 = 12.5%।"
   }
  },
  {
   "id": "profit-loss-046",
   "q": {
    "en": "If a man gains 25% by selling an article for 1,250, the cost price is —",
    "as": "এজনে 1,250 টকাত সামগ্ৰী বিক্ৰী কৰি 25% লাভ কৰিলে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "950",
     "as": "৯৫০"
    },
    {
     "en": "1,050",
     "as": "১,০৫০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 1250 / 1.25 = 1,000.",
    "as": "ক্ৰয় মূল্য = 1250 / 1.25 = 1,000।"
   }
  },
  {
   "id": "profit-loss-047",
   "q": {
    "en": "A shopkeeper bought 50 kg of sugar at 32 per kg and sold all at 28 per kg. His loss is —",
    "as": "এজন দোকানীয়ে 50 কেজি চেনি প্ৰতি কেজি 32 টকাত কিনি প্ৰতি কেজি 28 টকাত বিক্ৰী কৰে। তেওঁৰ লোকচান —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "220",
     "as": "২২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Loss per kg = 4, so total = 200.",
    "as": "প্ৰতি কেজি লোকচান = 4, গতিকে মুঠ = 200।"
   }
  },
  {
   "id": "profit-loss-048",
   "q": {
    "en": "If the cost price of an article is 40% of its selling price, the profit per cent is —",
    "as": "এটা সামগ্ৰীৰ ক্ৰয় মূল্য বিক্ৰয় মূল্যৰ 40% হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "150%",
     "as": "১৫০%"
    },
    {
     "en": "100%",
     "as": "১০০%"
    },
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "200%",
     "as": "২০০%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 0.4 SP, so profit = 0.6 SP; profit% = 0.6/0.4 x 100 = 150%.",
    "as": "ক্ৰয় মূল্য = 0.4 বিক্ৰয় মূল্য, লাভ = 0.6 বিক্ৰয় মূল্য; লাভ% = 0.6/0.4 x 100 = 150%।"
   }
  },
  {
   "id": "profit-loss-049",
   "q": {
    "en": "An article marked at 2,000 is sold after two successive discounts of 10% and 5%. The selling price is —",
    "as": "2,000 চিহ্নিত মূল্যৰ সামগ্ৰী 10% আৰু 5% ৰ দুটা ক্ৰমিক ৰেহাইৰ পিছত বিক্ৰী হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,690",
     "as": "১,৬৯০"
    },
    {
     "en": "1,700",
     "as": "১,৭০০"
    },
    {
     "en": "1,710",
     "as": "১,৭১০"
    },
    {
     "en": "1,720",
     "as": "১,৭২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SP = 2000 x 0.9 x 0.95 = 1,710.",
    "as": "বিক্ৰয় মূল্য = 2000 x 0.9 x 0.95 = 1,710।"
   }
  },
  {
   "id": "profit-loss-050",
   "q": {
    "en": "A man sells an article at a profit of 20%. If he had bought it at 20% less and sold it for 20 less, he would have gained 25%. The cost price is —",
    "as": "এজনে এটা সামগ্ৰী 20% লাভত বিক্ৰী কৰে। 20% কমত কিনি 20 কমত বিক্ৰী কৰিলে 25% লাভ হ'লহেঁতেন। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Solving gives the cost price 100.",
    "as": "সমাধান কৰিলে ক্ৰয় মূল্য 100 পোৱা যায়।"
   }
  },
  {
   "id": "profit-loss-051",
   "q": {
    "en": "The gain per cent when an article bought for 1,200 is sold for 1,500 is —",
    "as": "1,200 টকাত কিনা সামগ্ৰী 1,500 টকাত বিক্ৰী হ'লে শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "22%",
     "as": "২২%"
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
   "correct": 0,
   "explanation": {
    "en": "Gain = 300; 300 / 1200 x 100 = 25%.",
    "as": "লাভ = 300; 300 / 1200 x 100 = 25%।"
   }
  },
  {
   "id": "profit-loss-052",
   "q": {
    "en": "A man buys a table for 1,800 and spends 200 on repairs. If he sells it for 2,400, his gain per cent is —",
    "as": "এজনে 1,800 টকাত টেবুল কিনি 200 টকা মেৰামতত খৰচ কৰে। 2,400 টকাত বিক্ৰী কৰিলে তেওঁৰ শতকৰা লাভ —"
   },
   "options": [
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "18%",
     "as": "১৮%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Total CP = 2,000 and gain = 400, so 400 / 2000 x 100 = 20%.",
    "as": "মুঠ ক্ৰয় মূল্য = 2,000 আৰু লাভ = 400, গতিকে 400 / 2000 x 100 = 20%।"
   }
  },
  {
   "id": "profit-loss-053",
   "q": {
    "en": "A dealer sells an article at 25% profit. If the selling price is 875, the cost price is —",
    "as": "এজন ব্যৱসায়ীয়ে এটা সামগ্ৰী 25% লাভত বিক্ৰী কৰে। বিক্ৰয় মূল্য 875 হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "650",
     "as": "৬৫০"
    },
    {
     "en": "675",
     "as": "৬৭৫"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "725",
     "as": "৭২৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 875 / 1.25 = 700.",
    "as": "ক্ৰয় মূল্য = 875 / 1.25 = 700।"
   }
  },
  {
   "id": "profit-loss-054",
   "q": {
    "en": "A man sells an article at a loss of 12%. If the cost price is 900, the selling price is —",
    "as": "এজনে এটা সামগ্ৰী 12% লোকচানত বিক্ৰী কৰে। ক্ৰয় মূল্য 900 হ'লে বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "780",
     "as": "৭৮০"
    },
    {
     "en": "792",
     "as": "৭৯২"
    },
    {
     "en": "790",
     "as": "৭৯০"
    },
    {
     "en": "800",
     "as": "৮০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SP = 900 x 0.88 = 792.",
    "as": "বিক্ৰয় মূল্য = 900 x 0.88 = 792।"
   }
  },
  {
   "id": "profit-loss-055",
   "q": {
    "en": "A man sells a pen for 45 and gains 12.5%. The cost price is —",
    "as": "এজনে এটা কলম 45 টকাত বিক্ৰী কৰি 12.5% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "38",
     "as": "৩৮"
    },
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "44",
     "as": "৪৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 45 / 1.125 = 40.",
    "as": "ক্ৰয় মূল্য = 45 / 1.125 = 40।"
   }
  },
  {
   "id": "profit-loss-056",
   "q": {
    "en": "The difference between the cost price and the selling price is 120 and the profit per cent is 20%. The cost price is —",
    "as": "ক্ৰয় মূল্য আৰু বিক্ৰয় মূল্যৰ পাৰ্থক্য 120 আৰু শতকৰা লাভ 20%। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "550",
     "as": "৫৫০"
    },
    {
     "en": "650",
     "as": "৬৫০"
    },
    {
     "en": "600",
     "as": "৬০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "20% of CP = 120, so CP = 600.",
    "as": "ক্ৰয় মূল্যৰ 20% = 120, গতিকে ক্ৰয় মূল্য = 600।"
   }
  },
  {
   "id": "profit-loss-057",
   "q": {
    "en": "A shopkeeper earns a profit of 15% by selling an article for 690. The cost price is —",
    "as": "এজন দোকানীয়ে 690 টকাত সামগ্ৰী বিক্ৰী কৰি 15% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "580",
     "as": "৫৮০"
    },
    {
     "en": "590",
     "as": "৫৯০"
    },
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "620",
     "as": "৬২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 690 / 1.15 = 600.",
    "as": "ক্ৰয় মূল্য = 690 / 1.15 = 600।"
   }
  },
  {
   "id": "profit-loss-058",
   "q": {
    "en": "If an article is sold at 1,050 at a gain of 5%, the cost price is —",
    "as": "এটা সামগ্ৰী 1,050 টকাত 5% লাভত বিক্ৰী হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "980",
     "as": "৯৮০"
    },
    {
     "en": "990",
     "as": "৯৯০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,010",
     "as": "১,০১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "CP = 1050 / 1.05 = 1,000.",
    "as": "ক্ৰয় মূল্য = 1050 / 1.05 = 1,000।"
   }
  },
  {
   "id": "profit-loss-059",
   "q": {
    "en": "The profit per cent when the cost price of 8 articles equals the selling price of 10 articles is —",
    "as": "8 টা সামগ্ৰীৰ ক্ৰয় মূল্য 10 টা সামগ্ৰীৰ বিক্ৰয় মূল্যৰ সমান হ'লে শতকৰা —"
   },
   "options": [
    {
     "en": "20% profit",
     "as": "২০% লাভ"
    },
    {
     "en": "25% profit",
     "as": "২৫% লাভ"
    },
    {
     "en": "25% loss",
     "as": "২৫% লোকচান"
    },
    {
     "en": "20% loss",
     "as": "২০% লোকচান"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP < CP, so there is a loss of (10 - 8)/10 x 100 = 20%.",
    "as": "বিক্ৰয় মূল্য < ক্ৰয় মূল্য, গতিকে (10 - 8)/10 x 100 = 20% লোকচান।"
   }
  },
  {
   "id": "profit-loss-060",
   "q": {
    "en": "A man bought 3 dozen eggs at 5 each and sold them at 6 each. His total profit is —",
    "as": "এজনে প্ৰতিটো 5 টকাত 3 ডজন কণী কিনি প্ৰতিটো 6 টকাত বিক্ৰী কৰে। তেওঁৰ মুঠ লাভ —"
   },
   "options": [
    {
     "en": "36",
     "as": "৩৬"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3 dozen = 36 eggs and profit = 36 x 1 = 36.",
    "as": "3 ডজন = 36 টা কণী আৰু লাভ = 36 x 1 = 36।"
   }
  },
  {
   "id": "profit-loss-061",
   "q": {
    "en": "If a man sells an article for 1,380 at a profit of 15%, the cost price is —",
    "as": "এজনে 1,380 টকাত সামগ্ৰী 15% লাভত বিক্ৰী কৰিলে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,180",
     "as": "১,১৮০"
    },
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "1,190",
     "as": "১,১৯০"
    },
    {
     "en": "1,220",
     "as": "১,২২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP = 1380 / 1.15 = 1,200.",
    "as": "ক্ৰয় মূল্য = 1380 / 1.15 = 1,200।"
   }
  },
  {
   "id": "profit-loss-062",
   "q": {
    "en": "A trader sells an article at a loss of 15%. If the selling price is 1,020, the cost price is —",
    "as": "এজন ব্যৱসায়ীয়ে এটা সামগ্ৰী 15% লোকচানত বিক্ৰী কৰে। বিক্ৰয় মূল্য 1,020 হ'লে ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,100",
     "as": "১,১০০"
    },
    {
     "en": "1,150",
     "as": "১,১৫০"
    },
    {
     "en": "1,250",
     "as": "১,২৫০"
    },
    {
     "en": "1,200",
     "as": "১,২০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "CP = 1020 / 0.85 = 1,200.",
    "as": "ক্ৰয় মূল্য = 1020 / 0.85 = 1,200।"
   }
  },
  {
   "id": "profit-loss-063",
   "q": {
    "en": "A man sells two articles for 990 each, gaining 10% on one and losing 10% on the other. His overall loss per cent is —",
    "as": "এজনে 990 টকাকৈ দুটা সামগ্ৰী বিক্ৰী কৰে, এটাত 10% লাভ আৰু আনটোত 10% লোকচান। তেওঁৰ মুঠ শতকৰা লোকচান —"
   },
   "options": [
    {
     "en": "4%",
     "as": "৪%"
    },
    {
     "en": "2%",
     "as": "২%"
    },
    {
     "en": "1%",
     "as": "১%"
    },
    {
     "en": "5%",
     "as": "৫%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Overall loss% = (10^2)/100 = 1%.",
    "as": "মুঠ লোকচান% = (10^2)/100 = 1%।"
   }
  },
  {
   "id": "profit-loss-064",
   "q": {
    "en": "A dealer sells an article for 575 and gains 15%. The cost price is —",
    "as": "এজন ব্যৱসায়ীয়ে এটা সামগ্ৰী 575 টকাত বিক্ৰী কৰি 15% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "480",
     "as": "৪৮০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "490",
     "as": "৪৯০"
    },
    {
     "en": "510",
     "as": "৫১০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "CP = 575 / 1.15 = 500.",
    "as": "ক্ৰয় মূল্য = 575 / 1.15 = 500।"
   }
  },
  {
   "id": "profit-loss-065",
   "q": {
    "en": "A man sells an article for 1,368 and gains 14%. The cost price is —",
    "as": "এজনে এটা সামগ্ৰী 1,368 টকাত বিক্ৰী কৰি 14% লাভ কৰে। ক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "1,190",
     "as": "১,১৯০"
    },
    {
     "en": "1,180",
     "as": "১,১৮০"
    },
    {
     "en": "1,220",
     "as": "১,২২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "CP = 1368 / 1.14 = 1,200.",
    "as": "ক্ৰয় মূল্য = 1368 / 1.14 = 1,200।"
   }
  },
  {
   "id": "profit-loss-066",
   "q": {
    "en": "A man buys an article for 960 and sells it at a loss of 12.5%. The selling price is —",
    "as": "এজনে 960 টকাত সামগ্ৰী কিনি 12.5% লোকচানত বিক্ৰী কৰে। বিক্ৰয় মূল্য —"
   },
   "options": [
    {
     "en": "820",
     "as": "৮২০"
    },
    {
     "en": "830",
     "as": "৮৩০"
    },
    {
     "en": "850",
     "as": "৮৫০"
    },
    {
     "en": "840",
     "as": "৮৪০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SP = 960 x 0.875 = 840.",
    "as": "বিক্ৰয় মূল্য = 960 x 0.875 = 840।"
   }
  },
  {
   "id": "profit-loss-067",
   "q": {
    "en": "A shopkeeper marks an article at 500 and sells it at 460. The discount per cent is —",
    "as": "এজন দোকানীয়ে এটা সামগ্ৰী 500 টকাত চিহ্নিত কৰি 460 টকাত বিক্ৰী কৰে। শতকৰা ৰেহাই —"
   },
   "options": [
    {
     "en": "8%",
     "as": "৮%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "12%",
     "as": "১২%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Discount = 40; 40 / 500 x 100 = 8%.",
    "as": "ৰেহাই = 40; 40 / 500 x 100 = 8%।"
   }
  },
  {
   "id": "profit-loss-068",
   "q": {
    "en": "A man sells an article at 20% profit. If the cost price had been 10% less, the profit would have been —",
    "as": "এজনে এটা সামগ্ৰী 20% লাভত বিক্ৰী কৰে। ক্ৰয় মূল্য 10% কম হ'লে লাভ হ'লহেঁতেন —"
   },
   "options": [
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "33.33%",
     "as": "৩৩.৩৩%"
    },
    {
     "en": "32%",
     "as": "৩২%"
    },
    {
     "en": "35%",
     "as": "৩৫%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "New CP = 0.9 CP, SP = 1.2 CP, so profit% = 0.3/0.9 x 100 = 33.33%.",
    "as": "নতুন ক্ৰয় মূল্য = 0.9 ক্ৰয় মূল্য, বিক্ৰয় মূল্য = 1.2 ক্ৰয় মূল্য, লাভ% = 0.3/0.9 x 100 = 33.33%।"
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
    "en": "The ratio 24 : 36 in its simplest form is —",
    "as": "24 : 36 অনুপাত আটাইতকৈ সৰল ৰূপত —"
   },
   "options": [
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "4 : 6",
     "as": "৪ : ৬"
    },
    {
     "en": "6 : 9",
     "as": "৬ : ৯"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Dividing both terms by 12 gives 2 : 3.",
    "as": "দুয়োটা পদ 12 ৰে ভাগ কৰিলে 2 : 3 পোৱা যায়।"
   }
  },
  {
   "id": "ratio-proportion-002",
   "q": {
    "en": "If a : b = 3 : 4 and b : c = 6 : 7, then a : c is —",
    "as": "a : b = 3 : 4 আৰু b : c = 6 : 7 হ'লে a : c —"
   },
   "options": [
    {
     "en": "3 : 7",
     "as": "৩ : ৭"
    },
    {
     "en": "9 : 14",
     "as": "৯ : ১৪"
    },
    {
     "en": "18 : 28",
     "as": "১৮ : ২৮"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "a : c = (3 x 6) : (4 x 7) = 18 : 28 = 9 : 14.",
    "as": "a : c = (3 x 6) : (4 x 7) = 18 : 28 = 9 : 14।"
   }
  },
  {
   "id": "ratio-proportion-003",
   "q": {
    "en": "If 4 : 5 = 12 : x, then x is —",
    "as": "4 : 5 = 12 : x হ'লে x —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "20",
     "as": "২০"
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
   "correct": 3,
   "explanation": {
    "en": "x = 5 x 12 / 4 = 15.",
    "as": "x = 5 x 12 / 4 = 15।"
   }
  },
  {
   "id": "ratio-proportion-004",
   "q": {
    "en": "If 7 : x = 21 : 27, then x is —",
    "as": "7 : x = 21 : 27 হ'লে x —"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "x = 7 x 27 / 21 = 9.",
    "as": "x = 7 x 27 / 21 = 9।"
   }
  },
  {
   "id": "ratio-proportion-005",
   "q": {
    "en": "1,200 is divided between A and B in the ratio 2 : 3. A's share is —",
    "as": "1,200 টকা A আৰু B ৰ মাজত 2 : 3 অনুপাতত ভাগ কৰিলে A ৰ অংশ —"
   },
   "options": [
    {
     "en": "480",
     "as": "৪৮০"
    },
    {
     "en": "450",
     "as": "৪৫০"
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
   "correct": 0,
   "explanation": {
    "en": "A = 2/5 x 1200 = 480.",
    "as": "A = 2/5 x 1200 = 480।"
   }
  },
  {
   "id": "ratio-proportion-006",
   "q": {
    "en": "900 is divided between P and Q in the ratio 4 : 5. Q's share is —",
    "as": "900 টকা P আৰু Q ৰ মাজত 4 : 5 অনুপাতত ভাগ কৰিলে Q ৰ অংশ —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "450",
     "as": "৪৫০"
    },
    {
     "en": "540",
     "as": "৫৪০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Q = 5/9 x 900 = 500.",
    "as": "Q = 5/9 x 900 = 500।"
   }
  },
  {
   "id": "ratio-proportion-007",
   "q": {
    "en": "Two numbers are in the ratio 3 : 5 and their sum is 64. The larger number is —",
    "as": "দুটা সংখ্যা 3 : 5 অনুপাতত আৰু সিহঁতৰ যোগফল 64। ডাঙৰ সংখ্যাটো —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "48",
     "as": "৪৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "5/8 x 64 = 40.",
    "as": "5/8 x 64 = 40।"
   }
  },
  {
   "id": "ratio-proportion-008",
   "q": {
    "en": "Two numbers are in the ratio 5 : 7 and their difference is 12. The smaller number is —",
    "as": "দুটা সংখ্যা 5 : 7 অনুপাতত আৰু সিহঁতৰ পাৰ্থক্য 12। সৰু সংখ্যাটো —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "35",
     "as": "৩৫"
    },
    {
     "en": "42",
     "as": "৪২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each part = 12/2 = 6, so the smaller is 5 x 6 = 30.",
    "as": "প্ৰতিটো অংশ = 12/2 = 6, গতিকে সৰুটো 5 x 6 = 30।"
   }
  },
  {
   "id": "ratio-proportion-009",
   "q": {
    "en": "If a : b = 2 : 3 and b : c = 4 : 5, then a : b : c is —",
    "as": "a : b = 2 : 3 আৰু b : c = 4 : 5 হ'লে a : b : c —"
   },
   "options": [
    {
     "en": "2 : 3 : 5",
     "as": "২ : ৩ : ৫"
    },
    {
     "en": "2 : 4 : 5",
     "as": "২ : ৪ : ৫"
    },
    {
     "en": "8 : 12 : 15",
     "as": "৮ : ১২ : ১৫"
    },
    {
     "en": "6 : 9 : 10",
     "as": "৬ : ৯ : ১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Make b common: a : b = 8 : 12 and b : c = 12 : 15, so a : b : c = 8 : 12 : 15.",
    "as": "b সাধাৰণ কৰিলে: a : b = 8 : 12 আৰু b : c = 12 : 15, গতিকে 8 : 12 : 15।"
   }
  },
  {
   "id": "ratio-proportion-010",
   "q": {
    "en": "If x : y = 5 : 8, the value of (x + y) : y is —",
    "as": "x : y = 5 : 8 হ'লে (x + y) : y ৰ মান —"
   },
   "options": [
    {
     "en": "5 : 8",
     "as": "৫ : ৮"
    },
    {
     "en": "8 : 13",
     "as": "৮ : ১৩"
    },
    {
     "en": "13 : 5",
     "as": "১৩ : ৫"
    },
    {
     "en": "13 : 8",
     "as": "১৩ : ৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "(5 + 8) : 8 = 13 : 8.",
    "as": "(5 + 8) : 8 = 13 : 8।"
   }
  },
  {
   "id": "ratio-proportion-011",
   "q": {
    "en": "The ratio of 45 minutes to 2 hours is —",
    "as": "45 মিনিটৰ 2 ঘণ্টাৰ সৈতে অনুপাত —"
   },
   "options": [
    {
     "en": "3 : 4",
     "as": "৩ : ৪"
    },
    {
     "en": "3 : 8",
     "as": "৩ : ৮"
    },
    {
     "en": "9 : 16",
     "as": "৯ : ১৬"
    },
    {
     "en": "45 : 2",
     "as": "৪৫ : ২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "2 hours = 120 minutes, so 45 : 120 = 3 : 8.",
    "as": "2 ঘণ্টা = 120 মিনিট, গতিকে 45 : 120 = 3 : 8।"
   }
  },
  {
   "id": "ratio-proportion-012",
   "q": {
    "en": "The ratio of 50 paise to 2 rupees is —",
    "as": "50 পইচাৰ 2 টকাৰ সৈতে অনুপাত —"
   },
   "options": [
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "1 : 4",
     "as": "১ : ৪"
    },
    {
     "en": "25 : 1",
     "as": "২৫ : ১"
    },
    {
     "en": "50 : 2",
     "as": "৫০ : ২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "2 rupees = 200 paise, so 50 : 200 = 1 : 4.",
    "as": "2 টকা = 200 পইচা, গতিকে 50 : 200 = 1 : 4।"
   }
  },
  {
   "id": "ratio-proportion-013",
   "q": {
    "en": "The fourth proportional to 3, 8 and 15 is —",
    "as": "3, 8 আৰু 15 ৰ চতুৰ্থ সমানুপাতী —"
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
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3 : 8 = 15 : x, so x = 8 x 15 / 3 = 40.",
    "as": "3 : 8 = 15 : x, গতিকে x = 8 x 15 / 3 = 40।"
   }
  },
  {
   "id": "ratio-proportion-014",
   "q": {
    "en": "The mean proportional between 4 and 25 is —",
    "as": "4 আৰু 25 ৰ মধ্যসমানুপাতী —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "12.5",
     "as": "১২.৫"
    },
    {
     "en": "14.5",
     "as": "১৪.৫"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Mean proportional = sqrt(4 x 25) = 10.",
    "as": "মধ্যসমানুপাতী = sqrt(4 x 25) = 10।"
   }
  },
  {
   "id": "ratio-proportion-015",
   "q": {
    "en": "The third proportional to 9 and 12 is —",
    "as": "9 আৰু 12 ৰ তৃতীয় সমানুপাতী —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "9 : 12 = 12 : x, so x = 12 x 12 / 9 = 16.",
    "as": "9 : 12 = 12 : x, গতিকে x = 12 x 12 / 9 = 16।"
   }
  },
  {
   "id": "ratio-proportion-016",
   "q": {
    "en": "If 15 workers earn 9,000 in a day, 25 workers will earn —",
    "as": "15 জন শ্ৰমিকে এদিনত 9,000 উপাৰ্জন কৰিলে 25 জনে উপাৰ্জন কৰিব —"
   },
   "options": [
    {
     "en": "15,000",
     "as": "১৫,০০০"
    },
    {
     "en": "14,000",
     "as": "১৪,০০০"
    },
    {
     "en": "12,000",
     "as": "১২,০০০"
    },
    {
     "en": "18,000",
     "as": "১৮,০০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "One worker earns 9,000/15 = 600, so 25 x 600 = 15,000.",
    "as": "এজন শ্ৰমিকে 9,000/15 = 600 উপাৰ্জন কৰে, গতিকে 25 x 600 = 15,000।"
   }
  },
  {
   "id": "ratio-proportion-017",
   "q": {
    "en": "If 8 pens cost 96, the cost of 15 such pens is —",
    "as": "8 টা কলমৰ দাম 96 হ'লে 15 টা কলমৰ দাম —"
   },
   "options": [
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "180",
     "as": "১৮০"
    },
    {
     "en": "170",
     "as": "১৭০"
    },
    {
     "en": "190",
     "as": "১৯০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "One pen = 12, so 15 x 12 = 180.",
    "as": "এটা কলম = 12, গতিকে 15 x 12 = 180।"
   }
  },
  {
   "id": "ratio-proportion-018",
   "q": {
    "en": "If 6 men can do a work in 12 days, 9 men can do the same work in —",
    "as": "6 জন মানুহে এটা কাম 12 দিনত কৰিব পাৰিলে 9 জনে একেই কাম কৰিব —"
   },
   "options": [
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "9 days",
     "as": "৯ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Inverse proportion: 6 x 12 = 9 x d, so d = 8.",
    "as": "প্ৰতিক্ৰম অনুপাত: 6 x 12 = 9 x d, গতিকে d = 8।"
   }
  },
  {
   "id": "ratio-proportion-019",
   "q": {
    "en": "If 10 machines produce 500 items in 5 hours, 1 machine produces 500 items in —",
    "as": "10 টা যন্ত্ৰে 5 ঘণ্টাত 500 টা সামগ্ৰী উৎপাদন কৰিলে 1 টা যন্ত্ৰই 500 টা সামগ্ৰী উৎপাদন কৰিব —"
   },
   "options": [
    {
     "en": "25 hours",
     "as": "২৫ ঘণ্টা"
    },
    {
     "en": "50 hours",
     "as": "৫০ ঘণ্টা"
    },
    {
     "en": "40 hours",
     "as": "৪০ ঘণ্টা"
    },
    {
     "en": "60 hours",
     "as": "৬০ ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Inverse proportion: 10 x 5 = 1 x t, so t = 50 hours.",
    "as": "প্ৰতিক্ৰম অনুপাত: 10 x 5 = 1 x t, গতিকে t = 50 ঘণ্টা।"
   }
  },
  {
   "id": "ratio-proportion-020",
   "q": {
    "en": "If a car covers 240 km in 4 hours, it covers 360 km in —",
    "as": "এখন গাড়ীয়ে 4 ঘণ্টাত 240 কিমি অতিক্ৰম কৰিলে 360 কিমি অতিক্ৰম কৰিব —"
   },
   "options": [
    {
     "en": "5 hours",
     "as": "৫ ঘণ্টা"
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
     "en": "8 hours",
     "as": "৮ ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 60 km/h, so 360 / 60 = 6 hours.",
    "as": "গতি = 60 কিমি/ঘণ্টা, গতিকে 360 / 60 = 6 ঘণ্টা।"
   }
  },
  {
   "id": "ratio-proportion-021",
   "q": {
    "en": "A sum of 1,800 is divided among A, B and C in the ratio 2 : 3 : 4. B's share is —",
    "as": "1,800 টকা A, B আৰু C ৰ মাজত 2 : 3 : 4 অনুপাতত ভাগ কৰিলে B ৰ অংশ —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "600",
     "as": "৬০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "B = 3/9 x 1800 = 600.",
    "as": "B = 3/9 x 1800 = 600।"
   }
  },
  {
   "id": "ratio-proportion-022",
   "q": {
    "en": "A sum of 4,400 is divided among A, B and C in the ratio 2 : 3 : 6. C's share is —",
    "as": "4,400 টকা A, B আৰু C ৰ মাজত 2 : 3 : 6 অনুপাতত ভাগ কৰিলে C ৰ অংশ —"
   },
   "options": [
    {
     "en": "2,400",
     "as": "২,৪০০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "2,600",
     "as": "২,৬০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "C = 6/11 x 4400 = 2400.",
    "as": "C = 6/11 x 4400 = 2400।"
   }
  },
  {
   "id": "ratio-proportion-023",
   "q": {
    "en": "The compound ratio of 3 : 4 and 5 : 6 is —",
    "as": "3 : 4 আৰু 5 : 6 ৰ যৌগিক অনুপাত —"
   },
   "options": [
    {
     "en": "5 : 6",
     "as": "৫ : ৬"
    },
    {
     "en": "15 : 8",
     "as": "১৫ : ৮"
    },
    {
     "en": "6 : 20",
     "as": "৬ : ২০"
    },
    {
     "en": "5 : 8",
     "as": "৫ : ৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Compound ratio = (3 x 5) : (4 x 6) = 15 : 24 = 5 : 8.",
    "as": "যৌগিক অনুপাত = (3 x 5) : (4 x 6) = 15 : 24 = 5 : 8।"
   }
  },
  {
   "id": "ratio-proportion-024",
   "q": {
    "en": "The duplicate ratio of 2 : 7 is —",
    "as": "2 : 7 ৰ বৰ্গ অনুপাত —"
   },
   "options": [
    {
     "en": "4 : 14",
     "as": "৪ : ১৪"
    },
    {
     "en": "2 : 7",
     "as": "২ : ৭"
    },
    {
     "en": "8 : 343",
     "as": "৮ : ৩৪৩"
    },
    {
     "en": "4 : 49",
     "as": "৪ : ৪৯"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The duplicate ratio squares both terms: 4 : 49.",
    "as": "বৰ্গ অনুপাতে দুয়োটা পদৰ বৰ্গ কৰে: 4 : 49।"
   }
  },
  {
   "id": "ratio-proportion-025",
   "q": {
    "en": "The sub-duplicate ratio of 36 : 49 is —",
    "as": "36 : 49 ৰ বৰ্গমূল অনুপাত —"
   },
   "options": [
    {
     "en": "3 : 7",
     "as": "৩ : ৭"
    },
    {
     "en": "1296 : 2401",
     "as": "১২৯৬ : ২৪০১"
    },
    {
     "en": "18 : 24.5",
     "as": "১৮ : ২৪.৫"
    },
    {
     "en": "6 : 7",
     "as": "৬ : ৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The sub-duplicate ratio takes square roots: 6 : 7.",
    "as": "বৰ্গমূল অনুপাতে বৰ্গমূল লয়: 6 : 7।"
   }
  },
  {
   "id": "ratio-proportion-026",
   "q": {
    "en": "If a : b = 4 : 5, the value of (a + b) / (a - b) is —",
    "as": "a : b = 4 : 5 হ'লে (a + b) / (a - b) ৰ মান —"
   },
   "options": [
    {
     "en": "-1/9",
     "as": "-১/৯"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "-9",
     "as": "-৯"
    },
    {
     "en": "1/9",
     "as": "১/৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Let a = 4k and b = 5k; then (9k)/(-k) = -9.",
    "as": "a = 4k আৰু b = 5k ধৰিলে (9k)/(-k) = -9।"
   }
  },
  {
   "id": "ratio-proportion-027",
   "q": {
    "en": "If a : b = 7 : 9, the value of (2a + 3b) : (4a - b) is —",
    "as": "a : b = 7 : 9 হ'লে (2a + 3b) : (4a - b) ৰ মান —"
   },
   "options": [
    {
     "en": "41 : 19",
     "as": "৪১ : ১৯"
    },
    {
     "en": "19 : 41",
     "as": "১৯ : ৪১"
    },
    {
     "en": "41 : 37",
     "as": "৪১ : ৩৭"
    },
    {
     "en": "37 : 41",
     "as": "৩৭ : ৪১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "With a = 7k, b = 9k: (14 + 27) : (28 - 9) = 41 : 19.",
    "as": "a = 7k, b = 9k ধৰিলে: (14 + 27) : (28 - 9) = 41 : 19।"
   }
  },
  {
   "id": "ratio-proportion-028",
   "q": {
    "en": "If 3 : 5 :: 9 : x, the value of x is —",
    "as": "3 : 5 :: 9 : x হ'লে x ৰ মান —"
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
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "21",
     "as": "২১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "x = 5 x 9 / 3 = 15.",
    "as": "x = 5 x 9 / 3 = 15।"
   }
  },
  {
   "id": "ratio-proportion-029",
   "q": {
    "en": "The ratio of two numbers is 7 : 11. If their sum is 108, the numbers are —",
    "as": "দুটা সংখ্যাৰ অনুপাত 7 : 11। যোগফল 108 হ'লে সংখ্যা দুটা —"
   },
   "options": [
    {
     "en": "28 and 80",
     "as": "২৮ আৰু ৮০"
    },
    {
     "en": "35 and 73",
     "as": "৩৫ আৰু ৭৩"
    },
    {
     "en": "42 and 66",
     "as": "৪২ আৰু ৬৬"
    },
    {
     "en": "49 and 59",
     "as": "৪৯ আৰু ৫৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Each part = 108/18 = 6, giving 42 and 66.",
    "as": "প্ৰতিটো অংশ = 108/18 = 6, গতিকে 42 আৰু 66।"
   }
  },
  {
   "id": "ratio-proportion-030",
   "q": {
    "en": "If the ratio of two numbers is 4 : 7 and their difference is 33, the numbers are —",
    "as": "দুটা সংখ্যাৰ অনুপাত 4 : 7 আৰু পাৰ্থক্য 33 হ'লে সংখ্যা দুটা —"
   },
   "options": [
    {
     "en": "44 and 77",
     "as": "৪৪ আৰু ৭৭"
    },
    {
     "en": "40 and 73",
     "as": "৪০ আৰু ৭৩"
    },
    {
     "en": "48 and 81",
     "as": "৪৮ আৰু ৮১"
    },
    {
     "en": "52 and 85",
     "as": "৫২ আৰু ৮৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Each part = 33/3 = 11, giving 44 and 77.",
    "as": "প্ৰতিটো অংশ = 33/3 = 11, গতিকে 44 আৰু 77।"
   }
  },
  {
   "id": "ratio-proportion-031",
   "q": {
    "en": "If the ratio of ages of A and B is 3 : 4 and the sum of their ages is 42, the age of A is —",
    "as": "A আৰু B ৰ বয়সৰ অনুপাত 3 : 4 আৰু বয়সৰ যোগফল 42 হ'লে A ৰ বয়স —"
   },
   "options": [
    {
     "en": "18 years",
     "as": "১৮ বছৰ"
    },
    {
     "en": "16 years",
     "as": "১৬ বছৰ"
    },
    {
     "en": "20 years",
     "as": "২০ বছৰ"
    },
    {
     "en": "24 years",
     "as": "২৪ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A = 3/7 x 42 = 18 years.",
    "as": "A = 3/7 x 42 = 18 বছৰ।"
   }
  },
  {
   "id": "ratio-proportion-032",
   "q": {
    "en": "In a mixture of 60 litres, milk and water are in the ratio 7 : 5. The quantity of milk is —",
    "as": "60 লিটাৰ মিশ্ৰণত গাখীৰ আৰু পানী 7 : 5 অনুপাতত। গাখীৰৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "25 litres",
     "as": "২৫ লিটাৰ"
    },
    {
     "en": "35 litres",
     "as": "৩৫ লিটাৰ"
    },
    {
     "en": "30 litres",
     "as": "৩০ লিটাৰ"
    },
    {
     "en": "40 litres",
     "as": "৪০ লিটাৰ"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Milk = 7/12 x 60 = 35 litres.",
    "as": "গাখীৰ = 7/12 x 60 = 35 লিটাৰ।"
   }
  },
  {
   "id": "ratio-proportion-033",
   "q": {
    "en": "In a bag the ratio of 1 rupee, 50 paise and 25 paise coins is 3 : 4 : 5. If the number of 50 paise coins is 80, the total value of 1 rupee coins is —",
    "as": "এটা মোনত 1 টকা, 50 পইচা আৰু 25 পইচাৰ মুদ্ৰাৰ অনুপাত 3 : 4 : 5। 50 পইচাৰ মুদ্ৰা 80 টা হ'লে 1 টকাৰ মুদ্ৰাৰ মুঠ মূল্য —"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "72",
     "as": "৭২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Each part = 20, so 1-rupee coins number 60, worth 60.",
    "as": "প্ৰতিটো অংশ = 20, গতিকে 1 টকাৰ মুদ্ৰা 60 টা, মূল্য 60।"
   }
  },
  {
   "id": "ratio-proportion-034",
   "q": {
    "en": "If 5 kg of rice costs 250, the cost of 8 kg is —",
    "as": "5 কেজি চাউলৰ দাম 250 হ'লে 8 কেজিৰ দাম —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "380",
     "as": "৩৮০"
    },
    {
     "en": "350",
     "as": "৩৫০"
    },
    {
     "en": "420",
     "as": "৪২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1 kg = 50, so 8 x 50 = 400.",
    "as": "1 কেজি = 50, গতিকে 8 x 50 = 400।"
   }
  },
  {
   "id": "ratio-proportion-035",
   "q": {
    "en": "If 12 men can build a wall in 10 days, 15 men can build it in —",
    "as": "12 জন মানুহে এটা দেৱাল 10 দিনত সাজিব পাৰিলে 15 জনে সাজিব —"
   },
   "options": [
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "9 days",
     "as": "৯ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Inverse proportion: 12 x 10 = 15 x d, so d = 8.",
    "as": "প্ৰতিক্ৰম অনুপাত: 12 x 10 = 15 x d, গতিকে d = 8।"
   }
  },
  {
   "id": "ratio-proportion-036",
   "q": {
    "en": "If 4 taps fill a tank in 30 minutes, 6 taps of the same type fill it in —",
    "as": "4 টা কলৰ পৰা এটা টেংকি 30 মিনিটত ভৰ্তি হ'লে একে ধৰণৰ 6 টা কলৰ পৰা ভৰ্তি হ'ব —"
   },
   "options": [
    {
     "en": "15 minutes",
     "as": "১৫ মিনিট"
    },
    {
     "en": "20 minutes",
     "as": "২০ মিনিট"
    },
    {
     "en": "24 minutes",
     "as": "২৪ মিনিট"
    },
    {
     "en": "45 minutes",
     "as": "৪৫ মিনিট"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Inverse proportion: 4 x 30 = 6 x t, so t = 20.",
    "as": "প্ৰতিক্ৰম অনুপাত: 4 x 30 = 6 x t, গতিকে t = 20।"
   }
  },
  {
   "id": "ratio-proportion-037",
   "q": {
    "en": "The ratio of the incomes of A and B is 5 : 4 and the ratio of their expenditures is 3 : 2. If each saves 1,000, the income of A is —",
    "as": "A আৰু B ৰ আয়ৰ অনুপাত 5 : 4 আৰু খৰচৰ অনুপাত 3 : 2। প্ৰত্যেকে 1,000 সাঁচিলে A ৰ আয় —"
   },
   "options": [
    {
     "en": "3,000",
     "as": "৩,০০০"
    },
    {
     "en": "5,000",
     "as": "৫,০০০"
    },
    {
     "en": "4,000",
     "as": "৪,০০০"
    },
    {
     "en": "6,000",
     "as": "৬,০০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Solving 5x - 3y = 1000 and 4x - 2y = 1000 gives x = 1000, so A's income = 5,000.",
    "as": "5x - 3y = 1000 আৰু 4x - 2y = 1000 সমাধান কৰিলে x = 1000, গতিকে A ৰ আয় = 5,000।"
   }
  },
  {
   "id": "ratio-proportion-038",
   "q": {
    "en": "The ratio of two numbers is 3 : 4. If each is increased by 6, the ratio becomes 4 : 5. The smaller number is —",
    "as": "দুটা সংখ্যাৰ অনুপাত 3 : 4। প্ৰতিটোত 6 যোগ কৰিলে অনুপাত 4 : 5 হয়। সৰু সংখ্যাটো —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3x + 6 = 4k and 4x + 6 = 5k, giving x = 6 and the smaller number 18.",
    "as": "3x + 6 = 4k আৰু 4x + 6 = 5k, x = 6 পোৱা যায় আৰু সৰু সংখ্যা 18।"
   }
  },
  {
   "id": "ratio-proportion-039",
   "q": {
    "en": "If a : b = 2 : 3 and b : c = 6 : 7, then a : c is —",
    "as": "a : b = 2 : 3 আৰু b : c = 6 : 7 হ'লে a : c —"
   },
   "options": [
    {
     "en": "3 : 7",
     "as": "৩ : ৭"
    },
    {
     "en": "2 : 7",
     "as": "২ : ৭"
    },
    {
     "en": "12 : 21",
     "as": "১২ : ২১"
    },
    {
     "en": "4 : 7",
     "as": "৪ : ৭"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "a : c = (2 x 6) : (3 x 7) = 12 : 21 = 4 : 7.",
    "as": "a : c = (2 x 6) : (3 x 7) = 12 : 21 = 4 : 7।"
   }
  },
  {
   "id": "ratio-proportion-040",
   "q": {
    "en": "The ratio 0.5 : 0.05 in simplest form is —",
    "as": "0.5 : 0.05 অনুপাত আটাইতকৈ সৰল ৰূপত —"
   },
   "options": [
    {
     "en": "1 : 10",
     "as": "১ : ১০"
    },
    {
     "en": "5 : 1",
     "as": "৫ : ১"
    },
    {
     "en": "10 : 1",
     "as": "১০ : ১"
    },
    {
     "en": "1 : 5",
     "as": "১ : ৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "0.5 / 0.05 = 10, so the ratio is 10 : 1.",
    "as": "0.5 / 0.05 = 10, গতিকে অনুপাত 10 : 1।"
   }
  },
  {
   "id": "ratio-proportion-041",
   "q": {
    "en": "If x is directly proportional to y and x = 12 when y = 4, then x when y = 7 is —",
    "as": "x, y ৰ সৈতে সোজা সমানুপাতত আৰু y = 4 হ'লে x = 12, তেন্তে y = 7 হ'লে x —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
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
     "en": "28",
     "as": "২৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "k = 3, so x = 3 x 7 = 21.",
    "as": "k = 3, গতিকে x = 3 x 7 = 21।"
   }
  },
  {
   "id": "ratio-proportion-042",
   "q": {
    "en": "If x is inversely proportional to y and x = 6 when y = 8, then x when y = 12 is —",
    "as": "x, y ৰ সৈতে প্ৰতিক্ৰম সমানুপাতত আৰু y = 8 হ'লে x = 6, তেন্তে y = 12 হ'লে x —"
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
     "en": "4",
     "as": "৪"
    },
    {
     "en": "9",
     "as": "৯"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "xy = 48, so x = 48 / 12 = 4.",
    "as": "xy = 48, গতিকে x = 48 / 12 = 4।"
   }
  },
  {
   "id": "ratio-proportion-043",
   "q": {
    "en": "If 18 men can complete a work in 20 days, the number of men needed to finish it in 12 days is —",
    "as": "18 জন মানুহে এটা কাম 20 দিনত শেষ কৰিব পাৰিলে 12 দিনত শেষ কৰিবলৈ প্ৰয়োজনীয় মানুহ —"
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
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "36",
     "as": "৩৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Inverse proportion: 18 x 20 = m x 12, so m = 30.",
    "as": "প্ৰতিক্ৰম অনুপাত: 18 x 20 = m x 12, গতিকে m = 30।"
   }
  },
  {
   "id": "ratio-proportion-044",
   "q": {
    "en": "If 3 kg of a commodity costs 120, the quantity bought for 200 is —",
    "as": "3 কেজি সামগ্ৰীৰ দাম 120 হ'লে 200 টকাত কিনিব পৰা পৰিমাণ —"
   },
   "options": [
    {
     "en": "4 kg",
     "as": "৪ কেজি"
    },
    {
     "en": "5 kg",
     "as": "৫ কেজি"
    },
    {
     "en": "6 kg",
     "as": "৬ কেজি"
    },
    {
     "en": "7 kg",
     "as": "৭ কেজি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1 kg = 40, so 200 / 40 = 5 kg.",
    "as": "1 কেজি = 40, গতিকে 200 / 40 = 5 কেজি।"
   }
  },
  {
   "id": "ratio-proportion-045",
   "q": {
    "en": "If a train covers 180 km in 3 hours, the distance covered in 5 hours is —",
    "as": "এখন ৰে'লে 3 ঘণ্টাত 180 কিমি অতিক্ৰম কৰিলে 5 ঘণ্টাত অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "240 km",
     "as": "২৪০ কিমি"
    },
    {
     "en": "280 km",
     "as": "২৮০ কিমি"
    },
    {
     "en": "300 km",
     "as": "৩০০ কিমি"
    },
    {
     "en": "320 km",
     "as": "৩২০ কিমি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 60 km/h, so 5 x 60 = 300 km.",
    "as": "গতি = 60 কিমি/ঘণ্টা, গতিকে 5 x 60 = 300 কিমি।"
   }
  },
  {
   "id": "ratio-proportion-046",
   "q": {
    "en": "If 5 labourers earn 3,000 in 6 days, 1 labourer earns 3,000 in —",
    "as": "5 জন শ্ৰমিকে 6 দিনত 3,000 উপাৰ্জন কৰিলে 1 জনে 3,000 উপাৰ্জন কৰিব —"
   },
   "options": [
    {
     "en": "30 days",
     "as": "৩০ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "36 days",
     "as": "৩৬ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Inverse proportion: 5 x 6 = 1 x d, so d = 30 days.",
    "as": "প্ৰতিক্ৰম অনুপাত: 5 x 6 = 1 x d, গতিকে d = 30 দিন।"
   }
  },
  {
   "id": "ratio-proportion-047",
   "q": {
    "en": "A sum is divided between A and B in the ratio 5 : 7. If B gets 84 more than A, the total sum is —",
    "as": "এটা ৰাশি A আৰু B ৰ মাজত 5 : 7 অনুপাতত ভাগ কৰা হ'ল। B এ A তকৈ 84 বেছি পালে মুঠ ৰাশি —"
   },
   "options": [
    {
     "en": "420",
     "as": "৪২০"
    },
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "504",
     "as": "৫০৪"
    },
    {
     "en": "720",
     "as": "৭২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "2 parts = 84, so 1 part = 42 and 12 parts = 504.",
    "as": "2 অংশ = 84, গতিকে 1 অংশ = 42 আৰু 12 অংশ = 504।"
   }
  },
  {
   "id": "ratio-proportion-048",
   "q": {
    "en": "The ratio of boys to girls in a class is 5 : 4. If there are 36 students, the number of boys is —",
    "as": "এটা শ্ৰেণীত ল'ৰা আৰু ছোৱালীৰ অনুপাত 5 : 4। 36 জন ছাত্ৰ থাকিলে ল'ৰাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Boys = 5/9 x 36 = 20.",
    "as": "ল'ৰা = 5/9 x 36 = 20।"
   }
  },
  {
   "id": "ratio-proportion-049",
   "q": {
    "en": "The ratio of two numbers is 8 : 5 and their sum is 143. The smaller number is —",
    "as": "দুটা সংখ্যাৰ অনুপাত 8 : 5 আৰু যোগফল 143। সৰু সংখ্যাটো —"
   },
   "options": [
    {
     "en": "88",
     "as": "৮৮"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "65",
     "as": "৬৫"
    },
    {
     "en": "55",
     "as": "৫৫"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Each part = 11, so the smaller is 5 x 11 = 55.",
    "as": "প্ৰতিটো অংশ = 11, গতিকে সৰুটো 5 x 11 = 55।"
   }
  },
  {
   "id": "ratio-proportion-050",
   "q": {
    "en": "If 1/2 : x = 3 : 12, the value of x is —",
    "as": "1/2 : x = 3 : 12 হ'লে x ৰ মান —"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "2",
     "as": "২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3x = 6, so x = 2.",
    "as": "3x = 6, গতিকে x = 2।"
   }
  },
  {
   "id": "ratio-proportion-051",
   "q": {
    "en": "The ratio of the present ages of A and B is 4 : 5. After 10 years the ratio becomes 5 : 6. The present age of A is —",
    "as": "A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত 4 : 5। 10 বছৰৰ পিছত অনুপাত 5 : 6 হয়। A ৰ বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "30 years",
     "as": "৩০ বছৰ"
    },
    {
     "en": "35 years",
     "as": "৩৫ বছৰ"
    },
    {
     "en": "45 years",
     "as": "৪৫ বছৰ"
    },
    {
     "en": "40 years",
     "as": "৪০ বছৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Solving gives x = 10, so A = 40 years.",
    "as": "সমাধান কৰিলে x = 10, গতিকে A = 40 বছৰ।"
   }
  },
  {
   "id": "ratio-proportion-052",
   "q": {
    "en": "If 2A = 3B = 4C, then A : B : C is —",
    "as": "2A = 3B = 4C হ'লে A : B : C —"
   },
   "options": [
    {
     "en": "2 : 3 : 4",
     "as": "২ : ৩ : ৪"
    },
    {
     "en": "3 : 4 : 6",
     "as": "৩ : ৪ : ৬"
    },
    {
     "en": "6 : 4 : 3",
     "as": "৬ : ৪ : ৩"
    },
    {
     "en": "4 : 3 : 2",
     "as": "৪ : ৩ : ২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Taking the LCM 12: A = 6, B = 4, C = 3, so 6 : 4 : 3.",
    "as": "ল.সা.গু. 12 ধৰিলে: A = 6, B = 4, C = 3, গতিকে 6 : 4 : 3।"
   }
  },
  {
   "id": "ratio-proportion-053",
   "q": {
    "en": "If a : b = 5 : 6 and b : c = 3 : 4, then a : c is —",
    "as": "a : b = 5 : 6 আৰু b : c = 3 : 4 হ'লে a : c —"
   },
   "options": [
    {
     "en": "8 : 5",
     "as": "৮ : ৫"
    },
    {
     "en": "5 : 4",
     "as": "৫ : ৪"
    },
    {
     "en": "15 : 24",
     "as": "১৫ : ২৪"
    },
    {
     "en": "5 : 8",
     "as": "৫ : ৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "a : c = (5 x 3) : (6 x 4) = 15 : 24 = 5 : 8.",
    "as": "a : c = (5 x 3) : (6 x 4) = 15 : 24 = 5 : 8।"
   }
  },
  {
   "id": "ratio-proportion-054",
   "q": {
    "en": "A recipe needs flour and sugar in the ratio 5 : 2. If 350 g of flour is used, the sugar needed is —",
    "as": "এটা ৰেচিপিত ময়দা আৰু চেনিৰ অনুপাত 5 : 2। 350 গ্ৰাম ময়দা ব্যৱহাৰ কৰিলে প্ৰয়োজনীয় চেনি —"
   },
   "options": [
    {
     "en": "100 g",
     "as": "১০০ গ্ৰাম"
    },
    {
     "en": "175 g",
     "as": "১৭৫ গ্ৰাম"
    },
    {
     "en": "140 g",
     "as": "১৪০ গ্ৰাম"
    },
    {
     "en": "200 g",
     "as": "২০০ গ্ৰাম"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Sugar = 2/5 x 350 = 140 g.",
    "as": "চেনি = 2/5 x 350 = 140 গ্ৰাম।"
   }
  },
  {
   "id": "ratio-proportion-055",
   "q": {
    "en": "The ratio of the speeds of two cars is 3 : 4. If the slower car covers 180 km, the faster covers —",
    "as": "দুখন গাড়ীৰ গতিৰ অনুপাত 3 : 4। লেহেমীয়া গাড়ীয়ে 180 কিমি অতিক্ৰম কৰিলে দ্ৰুত গাড়ীয়ে অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "200 km",
     "as": "২০০ কিমি"
    },
    {
     "en": "220 km",
     "as": "২২০ কিমি"
    },
    {
     "en": "240 km",
     "as": "২৪০ কিমি"
    },
    {
     "en": "270 km",
     "as": "২৭০ কিমি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "4/3 x 180 = 240 km.",
    "as": "4/3 x 180 = 240 কিমি।"
   }
  },
  {
   "id": "ratio-proportion-056",
   "q": {
    "en": "If 15 kg of a mixture contains two ingredients in the ratio 2 : 3, the larger quantity is —",
    "as": "15 কেজি মিশ্ৰণত দুটা উপাদান 2 : 3 অনুপাতত থাকিলে ডাঙৰ পৰিমাণ —"
   },
   "options": [
    {
     "en": "6 kg",
     "as": "৬ কেজি"
    },
    {
     "en": "7.5 kg",
     "as": "৭.৫ কেজি"
    },
    {
     "en": "9 kg",
     "as": "৯ কেজি"
    },
    {
     "en": "10 kg",
     "as": "১০ কেজি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Larger = 3/5 x 15 = 9 kg.",
    "as": "ডাঙৰ = 3/5 x 15 = 9 কেজি।"
   }
  },
  {
   "id": "ratio-proportion-057",
   "q": {
    "en": "If a sum of 770 is divided in the ratio 5 : 6, the larger share is —",
    "as": "770 টকা 5 : 6 অনুপাতত ভাগ কৰিলে ডাঙৰ অংশ —"
   },
   "options": [
    {
     "en": "350",
     "as": "৩৫০"
    },
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "420",
     "as": "৪২০"
    },
    {
     "en": "440",
     "as": "৪৪০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Larger = 6/11 x 770 = 420.",
    "as": "ডাঙৰ = 6/11 x 770 = 420।"
   }
  },
  {
   "id": "ratio-proportion-058",
   "q": {
    "en": "The ratio of the number of 5-rupee coins to 2-rupee coins is 4 : 7. If there are 44 five-rupee coins, the number of 2-rupee coins is —",
    "as": "5 টকীয়া মুদ্ৰা আৰু 2 টকীয়া মুদ্ৰাৰ অনুপাত 4 : 7। 44 টা 5 টকীয়া মুদ্ৰা থাকিলে 2 টকীয়া মুদ্ৰাৰ সংখ্যা —"
   },
   "options": [
    {
     "en": "77",
     "as": "৭৭"
    },
    {
     "en": "70",
     "as": "৭০"
    },
    {
     "en": "66",
     "as": "৬৬"
    },
    {
     "en": "84",
     "as": "৮৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Each part = 11, so 2-rupee coins = 7 x 11 = 77.",
    "as": "প্ৰতিটো অংশ = 11, গতিকে 2 টকীয়া মুদ্ৰা = 7 x 11 = 77।"
   }
  },
  {
   "id": "ratio-proportion-059",
   "q": {
    "en": "If 3/4 of a number is equal to 5/6 of another number, the ratio of the numbers is —",
    "as": "এটা সংখ্যাৰ 3/4 আন এটা সংখ্যাৰ 5/6 ৰ সমান হ'লে সংখ্যা দুটাৰ অনুপাত —"
   },
   "options": [
    {
     "en": "9 : 10",
     "as": "৯ : ১০"
    },
    {
     "en": "10 : 9",
     "as": "১০ : ৯"
    },
    {
     "en": "5 : 6",
     "as": "৫ : ৬"
    },
    {
     "en": "6 : 5",
     "as": "৬ : ৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "(3/4)x = (5/6)y gives x : y = 10 : 9.",
    "as": "(3/4)x = (5/6)y ৰ পৰা x : y = 10 : 9 পোৱা যায়।"
   }
  },
  {
   "id": "ratio-proportion-060",
   "q": {
    "en": "The ratio of the angles of a triangle is 1 : 2 : 3. The largest angle is —",
    "as": "এটা ত্ৰিভুজৰ কোণবোৰৰ অনুপাত 1 : 2 : 3। আটাইতকৈ ডাঙৰ কোণ —"
   },
   "options": [
    {
     "en": "90 degrees",
     "as": "৯০ ডিগ্ৰী"
    },
    {
     "en": "60 degrees",
     "as": "৬০ ডিগ্ৰী"
    },
    {
     "en": "100 degrees",
     "as": "১০০ ডিগ্ৰী"
    },
    {
     "en": "120 degrees",
     "as": "১২০ ডিগ্ৰী"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Largest = 3/6 x 180 = 90 degrees.",
    "as": "ডাঙৰ = 3/6 x 180 = 90 ডিগ্ৰী।"
   }
  },
  {
   "id": "ratio-proportion-061",
   "q": {
    "en": "The ratio of the angles of a quadrilateral is 2 : 3 : 4 : 6. The largest angle is —",
    "as": "এটা চতুৰ্ভুজৰ কোণবোৰৰ অনুপাত 2 : 3 : 4 : 6। আটাইতকৈ ডাঙৰ কোণ —"
   },
   "options": [
    {
     "en": "120 degrees",
     "as": "১২০ ডিগ্ৰী"
    },
    {
     "en": "150 degrees",
     "as": "১৫০ ডিগ্ৰী"
    },
    {
     "en": "144 degrees",
     "as": "১৪৪ ডিগ্ৰী"
    },
    {
     "en": "160 degrees",
     "as": "১৬০ ডিগ্ৰী"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Largest = 6/15 x 360 = 144 degrees.",
    "as": "ডাঙৰ = 6/15 x 360 = 144 ডিগ্ৰী।"
   }
  },
  {
   "id": "ratio-proportion-062",
   "q": {
    "en": "If A : B = 3 : 4 and B : C = 8 : 9, then A : C is —",
    "as": "A : B = 3 : 4 আৰু B : C = 8 : 9 হ'লে A : C —"
   },
   "options": [
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "2 : 1",
     "as": "২ : ১"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "A : C = (3 x 8) : (4 x 9) = 24 : 36 = 2 : 3.",
    "as": "A : C = (3 x 8) : (4 x 9) = 24 : 36 = 2 : 3।"
   }
  },
  {
   "id": "ratio-proportion-063",
   "q": {
    "en": "If 20% of A = 30% of B, then A : B is —",
    "as": "A ৰ 20% = B ৰ 30% হ'লে A : B —"
   },
   "options": [
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "3 : 2",
     "as": "৩ : ২"
    },
    {
     "en": "2 : 1",
     "as": "২ : ১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A / B = 30 / 20 = 3 : 2.",
    "as": "A / B = 30 / 20 = 3 : 2।"
   }
  },
  {
   "id": "ratio-proportion-064",
   "q": {
    "en": "If the ratio of the sides of two squares is 2 : 3, the ratio of their areas is —",
    "as": "দুটা বৰ্গৰ বাহুৰ অনুপাত 2 : 3 হ'লে সিহঁতৰ কালিৰ অনুপাত —"
   },
   "options": [
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    },
    {
     "en": "4 : 9",
     "as": "৪ : ৯"
    },
    {
     "en": "8 : 27",
     "as": "৮ : ২৭"
    },
    {
     "en": "16 : 81",
     "as": "১৬ : ৮১"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The ratio of areas is the square of the ratio of sides: 4 : 9.",
    "as": "কালিৰ অনুপাত বাহুৰ অনুপাতৰ বৰ্গ: 4 : 9।"
   }
  },
  {
   "id": "ratio-proportion-065",
   "q": {
    "en": "If the ratio of the radii of two circles is 3 : 5, the ratio of their circumferences is —",
    "as": "দুটা বৃত্তৰ ব্যাসাৰ্ধৰ অনুপাত 3 : 5 হ'লে পৰিধিৰ অনুপাত —"
   },
   "options": [
    {
     "en": "6 : 10",
     "as": "৬ : ১০"
    },
    {
     "en": "9 : 25",
     "as": "৯ : ২৫"
    },
    {
     "en": "3 : 5",
     "as": "৩ : ৫"
    },
    {
     "en": "5 : 3",
     "as": "৫ : ৩"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Circumference is proportional to radius, so the ratio stays 3 : 5.",
    "as": "পৰিধি ব্যাসাৰ্ধৰ সমানুপাতী, গতিকে অনুপাত 3 : 5 থাকে।"
   }
  },
  {
   "id": "ratio-proportion-066",
   "q": {
    "en": "A sum of 9,000 is divided among A, B and C in the ratio 1 : 2 : 3. The difference between C's and A's share is —",
    "as": "9,000 টকা A, B আৰু C ৰ মাজত 1 : 2 : 3 অনুপাতত ভাগ কৰিলে C আৰু A ৰ অংশৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "1,500",
     "as": "১,৫০০"
    },
    {
     "en": "2,000",
     "as": "২,০০০"
    },
    {
     "en": "4,500",
     "as": "৪,৫০০"
    },
    {
     "en": "3,000",
     "as": "৩,০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A = 1,500 and C = 4,500, so the difference is 3,000.",
    "as": "A = 1,500 আৰু C = 4,500, গতিকে পাৰ্থক্য 3,000।"
   }
  },
  {
   "id": "ratio-proportion-067",
   "q": {
    "en": "If 5 : 8 :: 20 : x, the value of x is —",
    "as": "5 : 8 :: 20 : x হ'লে x ৰ মান —"
   },
   "options": [
    {
     "en": "24",
     "as": "২৪"
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
     "en": "36",
     "as": "৩৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "x = 8 x 20 / 5 = 32.",
    "as": "x = 8 x 20 / 5 = 32।"
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
    "en": "The simple interest on 5,000 at 8% per annum for 2 years is —",
    "as": "5,000 ৰ ওপৰত বছৰি 8% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "800",
     "as": "৮০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 5000 x 8 x 2 / 100 = 800.",
    "as": "সৰল সুত = 5000 x 8 x 2 / 100 = 800।"
   }
  },
  {
   "id": "simple-compound-interest-002",
   "q": {
    "en": "The simple interest on 2,000 at 5% per annum for 3 years is —",
    "as": "2,000 ৰ ওপৰত বছৰি 5% হাৰত 3 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "300",
     "as": "৩০০"
    },
    {
     "en": "250",
     "as": "২৫০"
    },
    {
     "en": "350",
     "as": "৩৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI = 2000 x 5 x 3 / 100 = 300.",
    "as": "সৰল সুত = 2000 x 5 x 3 / 100 = 300।"
   }
  },
  {
   "id": "simple-compound-interest-003",
   "q": {
    "en": "The simple interest on 1,500 at 4% per annum for 2 years is —",
    "as": "1,500 ৰ ওপৰত বছৰি 4% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "130",
     "as": "১৩০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 1500 x 4 x 2 / 100 = 120.",
    "as": "সৰল সুত = 1500 x 4 x 2 / 100 = 120।"
   }
  },
  {
   "id": "simple-compound-interest-004",
   "q": {
    "en": "The simple interest on 800 at 10% per annum for 6 months is —",
    "as": "800 ৰ ওপৰত বছৰি 10% হাৰত 6 মাহৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 800 x 10 x 0.5 / 100 = 40.",
    "as": "সৰল সুত = 800 x 10 x 0.5 / 100 = 40।"
   }
  },
  {
   "id": "simple-compound-interest-005",
   "q": {
    "en": "The simple interest on 12,000 at 6% per annum for 9 months is —",
    "as": "12,000 ৰ ওপৰত বছৰি 6% হাৰত 9 মাহৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "480",
     "as": "৪৮০"
    },
    {
     "en": "540",
     "as": "৫৪০"
    },
    {
     "en": "520",
     "as": "৫২০"
    },
    {
     "en": "600",
     "as": "৬০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI = 12000 x 6 x 9 / (100 x 12) = 540.",
    "as": "সৰল সুত = 12000 x 6 x 9 / (100 x 12) = 540।"
   }
  },
  {
   "id": "simple-compound-interest-006",
   "q": {
    "en": "The simple interest on 4,500 at 8% per annum for 3 years is —",
    "as": "4,500 ৰ ওপৰত বছৰি 8% হাৰত 3 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "1,080",
     "as": "১,০৮০"
    },
    {
     "en": "1,050",
     "as": "১,০৫০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 4500 x 8 x 3 / 100 = 1,080.",
    "as": "সৰল সুত = 4500 x 8 x 3 / 100 = 1,080।"
   }
  },
  {
   "id": "simple-compound-interest-007",
   "q": {
    "en": "The amount on 2,000 at 5% per annum for 2 years under simple interest is —",
    "as": "বছৰি 5% হাৰত 2,000 ৰ 2 বছৰৰ সৰল সুতৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "2,100",
     "as": "২,১০০"
    },
    {
     "en": "2,150",
     "as": "২,১৫০"
    },
    {
     "en": "2,200",
     "as": "২,২০০"
    },
    {
     "en": "2,250",
     "as": "২,২৫০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SI = 200, so amount = 2,200.",
    "as": "সৰল সুত = 200, গতিকে মুঠ ধন = 2,200।"
   }
  },
  {
   "id": "simple-compound-interest-008",
   "q": {
    "en": "The amount on 5,000 at 10% per annum for 3 years under simple interest is —",
    "as": "বছৰি 10% হাৰত 5,000 ৰ 3 বছৰৰ সৰল সুতৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "6,000",
     "as": "৬,০০০"
    },
    {
     "en": "6,200",
     "as": "৬,২০০"
    },
    {
     "en": "6,800",
     "as": "৬,৮০০"
    },
    {
     "en": "6,500",
     "as": "৬,৫০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 1,500, so amount = 6,500.",
    "as": "সৰল সুত = 1,500, গতিকে মুঠ ধন = 6,500।"
   }
  },
  {
   "id": "simple-compound-interest-009",
   "q": {
    "en": "The rate per cent per annum at which 1,000 gives 200 simple interest in 2 years is —",
    "as": "1,000 এ 2 বছৰত 200 সৰল সুত দিয়া বছৰি সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "8%",
     "as": "৮%"
    },
    {
     "en": "12%",
     "as": "১২%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "R = 200 x 100 / (1000 x 2) = 10%.",
    "as": "হাৰ = 200 x 100 / (1000 x 2) = 10%।"
   }
  },
  {
   "id": "simple-compound-interest-010",
   "q": {
    "en": "The rate per cent per annum at which 2,500 gives 375 simple interest in 3 years is —",
    "as": "2,500 এ 3 বছৰত 375 সৰল সুত দিয়া বছৰি সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "4%",
     "as": "৪%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "7%",
     "as": "৭%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "R = 375 x 100 / (2500 x 3) = 5%.",
    "as": "হাৰ = 375 x 100 / (2500 x 3) = 5%।"
   }
  },
  {
   "id": "simple-compound-interest-011",
   "q": {
    "en": "The time in which 4,000 gives 800 simple interest at 10% per annum is —",
    "as": "বছৰি 10% হাৰত 4,000 এ 800 সৰল সুত দিয়া সময় —"
   },
   "options": [
    {
     "en": "1 year",
     "as": "১ বছৰ"
    },
    {
     "en": "3 years",
     "as": "৩ বছৰ"
    },
    {
     "en": "2 years",
     "as": "২ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "T = 800 x 100 / (4000 x 10) = 2 years.",
    "as": "সময় = 800 x 100 / (4000 x 10) = 2 বছৰ।"
   }
  },
  {
   "id": "simple-compound-interest-012",
   "q": {
    "en": "The time in which 1,200 gives 216 simple interest at 6% per annum is —",
    "as": "বছৰি 6% হাৰত 1,200 এ 216 সৰল সুত দিয়া সময় —"
   },
   "options": [
    {
     "en": "2 years",
     "as": "২ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "3 years",
     "as": "৩ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "T = 216 x 100 / (1200 x 6) = 3 years.",
    "as": "সময় = 216 x 100 / (1200 x 6) = 3 বছৰ।"
   }
  },
  {
   "id": "simple-compound-interest-013",
   "q": {
    "en": "The principal that gives 900 simple interest at 5% per annum in 3 years is —",
    "as": "বছৰি 5% হাৰত 3 বছৰত 900 সৰল সুত দিয়া মূলধন —"
   },
   "options": [
    {
     "en": "5,000",
     "as": "৫,০০০"
    },
    {
     "en": "5,500",
     "as": "৫,৫০০"
    },
    {
     "en": "6,000",
     "as": "৬,০০০"
    },
    {
     "en": "6,500",
     "as": "৬,৫০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "P = 900 x 100 / (5 x 3) = 6,000.",
    "as": "মূলধন = 900 x 100 / (5 x 3) = 6,000।"
   }
  },
  {
   "id": "simple-compound-interest-014",
   "q": {
    "en": "The compound interest on 1,000 at 10% per annum for 2 years is —",
    "as": "1,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "210",
     "as": "২১০"
    },
    {
     "en": "220",
     "as": "২২০"
    },
    {
     "en": "230",
     "as": "২৩০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 1000 x 1.1^2 = 1,210, so CI = 210.",
    "as": "মুঠ ধন = 1000 x 1.1^2 = 1,210, গতিকে চক্ৰবৃদ্ধি সুত = 210।"
   }
  },
  {
   "id": "simple-compound-interest-015",
   "q": {
    "en": "The compound interest on 2,000 at 5% per annum for 2 years is —",
    "as": "2,000 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "205",
     "as": "২০৫"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "210",
     "as": "২১০"
    },
    {
     "en": "220",
     "as": "২২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 2000 x 1.05^2 = 2,205, so CI = 205.",
    "as": "মুঠ ধন = 2000 x 1.05^2 = 2,205, গতিকে চক্ৰবৃদ্ধি সুত = 205।"
   }
  },
  {
   "id": "simple-compound-interest-016",
   "q": {
    "en": "The compound interest on 5,000 at 10% per annum for 2 years is —",
    "as": "5,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,050",
     "as": "১,০৫০"
    },
    {
     "en": "1,025",
     "as": "১,০২৫"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 5000 x 1.21 = 6,050, so CI = 1,050.",
    "as": "মুঠ ধন = 5000 x 1.21 = 6,050, গতিকে চক্ৰবৃদ্ধি সুত = 1,050।"
   }
  },
  {
   "id": "simple-compound-interest-017",
   "q": {
    "en": "The compound interest on 8,000 at 5% per annum for 2 years is —",
    "as": "8,000 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "810",
     "as": "৮১০"
    },
    {
     "en": "840",
     "as": "৮৪০"
    },
    {
     "en": "820",
     "as": "৮২০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Amount = 8000 x 1.1025 = 8,820, so CI = 820.",
    "as": "মুঠ ধন = 8000 x 1.1025 = 8,820, গতিকে চক্ৰবৃদ্ধি সুত = 820।"
   }
  },
  {
   "id": "simple-compound-interest-018",
   "q": {
    "en": "The difference between the compound interest and the simple interest on 1,000 at 10% per annum for 2 years is —",
    "as": "1,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "20",
     "as": "২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Difference = P(R/100)^2 = 1000 x 0.01 = 10.",
    "as": "পাৰ্থক্য = P(R/100)^2 = 1000 x 0.01 = 10।"
   }
  },
  {
   "id": "simple-compound-interest-019",
   "q": {
    "en": "The difference between the compound interest and the simple interest on 5,000 at 4% per annum for 2 years is —",
    "as": "5,000 ৰ ওপৰত বছৰি 4% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Difference = 5000 x (0.04)^2 = 8.",
    "as": "পাৰ্থক্য = 5000 x (0.04)^2 = 8।"
   }
  },
  {
   "id": "simple-compound-interest-020",
   "q": {
    "en": "The compound interest on 1,000 at 20% per annum for 2 years is —",
    "as": "1,000 ৰ ওপৰত বছৰি 20% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "420",
     "as": "৪২০"
    },
    {
     "en": "440",
     "as": "৪৪০"
    },
    {
     "en": "460",
     "as": "৪৬০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 1000 x 1.44 = 1,440, so CI = 440.",
    "as": "মুঠ ধন = 1000 x 1.44 = 1,440, গতিকে চক্ৰবৃদ্ধি সুত = 440।"
   }
  },
  {
   "id": "simple-compound-interest-021",
   "q": {
    "en": "The compound interest on 4,000 at 10% per annum for 2 years is —",
    "as": "4,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "840",
     "as": "৮৪০"
    },
    {
     "en": "820",
     "as": "৮২০"
    },
    {
     "en": "860",
     "as": "৮৬০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 4000 x 1.21 = 4,840, so CI = 840.",
    "as": "মুঠ ধন = 4000 x 1.21 = 4,840, গতিকে চক্ৰবৃদ্ধি সুত = 840।"
   }
  },
  {
   "id": "simple-compound-interest-022",
   "q": {
    "en": "The amount on 2,000 at 10% per annum for 2 years compounded annually is —",
    "as": "বছৰি 10% হাৰত 2,000 ৰ 2 বছৰৰ বছৰি চক্ৰবৃদ্ধিৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "2,200",
     "as": "২,২০০"
    },
    {
     "en": "2,400",
     "as": "২,৪০০"
    },
    {
     "en": "2,420",
     "as": "২,৪২০"
    },
    {
     "en": "2,440",
     "as": "২,৪৪০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 2000 x 1.21 = 2,420.",
    "as": "মুঠ ধন = 2000 x 1.21 = 2,420।"
   }
  },
  {
   "id": "simple-compound-interest-023",
   "q": {
    "en": "The compound interest on 10,000 at 8% per annum for 2 years is —",
    "as": "10,000 ৰ ওপৰত বছৰি 8% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "1,600",
     "as": "১,৬০০"
    },
    {
     "en": "1,640",
     "as": "১,৬৪০"
    },
    {
     "en": "1,664",
     "as": "১,৬৬৪"
    },
    {
     "en": "1,680",
     "as": "১,৬৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 10000 x 1.1664 = 11,664, so CI = 1,664.",
    "as": "মুঠ ধন = 10000 x 1.1664 = 11,664, গতিকে চক্ৰবৃদ্ধি সুত = 1,664।"
   }
  },
  {
   "id": "simple-compound-interest-024",
   "q": {
    "en": "The compound interest on 1,600 at 5% per annum for 2 years is —",
    "as": "1,600 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "164",
     "as": "১৬৪"
    },
    {
     "en": "162",
     "as": "১৬২"
    },
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "166",
     "as": "১৬৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 1600 x 1.1025 = 1,764, so CI = 164.",
    "as": "মুঠ ধন = 1600 x 1.1025 = 1,764, গতিকে চক্ৰবৃদ্ধি সুত = 164।"
   }
  },
  {
   "id": "simple-compound-interest-025",
   "q": {
    "en": "The simple interest on a sum for 2 years at 10% per annum is 400. The sum is —",
    "as": "এটা ৰাশিৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ সৰল সুত 400। ৰাশিটো —"
   },
   "options": [
    {
     "en": "1,500",
     "as": "১,৫০০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "2,000",
     "as": "২,০০০"
    },
    {
     "en": "2,200",
     "as": "২,২০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "P = 400 x 100 / (10 x 2) = 2,000.",
    "as": "মূলধন = 400 x 100 / (10 x 2) = 2,000।"
   }
  },
  {
   "id": "simple-compound-interest-026",
   "q": {
    "en": "The simple interest on 6,000 at 7% per annum for 2 years is —",
    "as": "6,000 ৰ ওপৰত বছৰি 7% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "780",
     "as": "৭৮০"
    },
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "880",
     "as": "৮৮০"
    },
    {
     "en": "840",
     "as": "৮৪০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 6000 x 7 x 2 / 100 = 840.",
    "as": "সৰল সুত = 6000 x 7 x 2 / 100 = 840।"
   }
  },
  {
   "id": "simple-compound-interest-027",
   "q": {
    "en": "The amount on 3,000 at 6% per annum for 2 years under simple interest is —",
    "as": "বছৰি 6% হাৰত 3,000 ৰ 2 বছৰৰ সৰল সুতৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "3,320",
     "as": "৩,৩২০"
    },
    {
     "en": "3,340",
     "as": "৩,৩৪০"
    },
    {
     "en": "3,360",
     "as": "৩,৩৬০"
    },
    {
     "en": "3,380",
     "as": "৩,৩৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SI = 360, so amount = 3,360.",
    "as": "সৰল সুত = 360, গতিকে মুঠ ধন = 3,360।"
   }
  },
  {
   "id": "simple-compound-interest-028",
   "q": {
    "en": "The simple interest on 2,400 at 12% per annum for 6 months is —",
    "as": "2,400 ৰ ওপৰত বছৰি 12% হাৰত 6 মাহৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "120",
     "as": "১২০"
    },
    {
     "en": "132",
     "as": "১৩২"
    },
    {
     "en": "156",
     "as": "১৫৬"
    },
    {
     "en": "144",
     "as": "১৪৪"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 2400 x 12 x 0.5 / 100 = 144.",
    "as": "সৰল সুত = 2400 x 12 x 0.5 / 100 = 144।"
   }
  },
  {
   "id": "simple-compound-interest-029",
   "q": {
    "en": "The rate of simple interest at which a sum doubles itself in 10 years is —",
    "as": "এটা ৰাশি 10 বছৰত দুগুণ হোৱা সৰল সুতৰ হাৰ —"
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
    "en": "To double, SI = P, so R = 100/10 = 10%.",
    "as": "দুগুণ হ'বলৈ সৰল সুত = মূলধন, গতিকে হাৰ = 100/10 = 10%।"
   }
  },
  {
   "id": "simple-compound-interest-030",
   "q": {
    "en": "The rate of simple interest at which a sum doubles itself in 20 years is —",
    "as": "এটা ৰাশি 20 বছৰত দুগুণ হোৱা সৰল সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "4%",
     "as": "৪%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "10%",
     "as": "১০%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "R = 100/20 = 5%.",
    "as": "হাৰ = 100/20 = 5%।"
   }
  },
  {
   "id": "simple-compound-interest-031",
   "q": {
    "en": "The rate of simple interest at which a sum triples itself in 20 years is —",
    "as": "এটা ৰাশি 20 বছৰত তিনিগুণ হোৱা সৰল সুতৰ হাৰ —"
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
    "en": "To triple, SI = 2P, so R = 200/20 = 10%.",
    "as": "তিনিগুণ হ'বলৈ সৰল সুত = 2 মূলধন, গতিকে হাৰ = 200/20 = 10%।"
   }
  },
  {
   "id": "simple-compound-interest-032",
   "q": {
    "en": "If the simple interest on a sum for 5 years is 1/4 of the principal, the rate per annum is —",
    "as": "এটা ৰাশিৰ 5 বছৰৰ সৰল সুত মূলধনৰ 1/4 হ'লে বছৰি হাৰ —"
   },
   "options": [
    {
     "en": "4%",
     "as": "৪%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "8%",
     "as": "৮%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "R = 100 / (4 x 5) = 5%.",
    "as": "হাৰ = 100 / (4 x 5) = 5%।"
   }
  },
  {
   "id": "simple-compound-interest-033",
   "q": {
    "en": "The compound interest on 1,000 at 10% per annum for 3 years is —",
    "as": "1,000 ৰ ওপৰত বছৰি 10% হাৰত 3 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "300",
     "as": "৩০০"
    },
    {
     "en": "331",
     "as": "৩৩১"
    },
    {
     "en": "310",
     "as": "৩১০"
    },
    {
     "en": "340",
     "as": "৩৪০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 1000 x 1.331 = 1,331, so CI = 331.",
    "as": "মুঠ ধন = 1000 x 1.331 = 1,331, গতিকে চক্ৰবৃদ্ধি সুত = 331।"
   }
  },
  {
   "id": "simple-compound-interest-034",
   "q": {
    "en": "The amount on 2,000 at 10% per annum for 3 years compounded annually is —",
    "as": "বছৰি 10% হাৰত 2,000 ৰ 3 বছৰৰ বছৰি চক্ৰবৃদ্ধিৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "2,600",
     "as": "২,৬০০"
    },
    {
     "en": "2,620",
     "as": "২,৬২০"
    },
    {
     "en": "2,662",
     "as": "২,৬৬২"
    },
    {
     "en": "2,700",
     "as": "২,৭০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 2000 x 1.331 = 2,662.",
    "as": "মুঠ ধন = 2000 x 1.331 = 2,662।"
   }
  },
  {
   "id": "simple-compound-interest-035",
   "q": {
    "en": "The compound interest on 5,000 at 4% per annum for 2 years is —",
    "as": "5,000 ৰ ওপৰত বছৰি 4% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "400",
     "as": "৪০০"
    },
    {
     "en": "408",
     "as": "৪০৮"
    },
    {
     "en": "416",
     "as": "৪১৬"
    },
    {
     "en": "424",
     "as": "৪২৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 5000 x 1.0816 = 5,408, so CI = 408.",
    "as": "মুঠ ধন = 5000 x 1.0816 = 5,408, গতিকে চক্ৰবৃদ্ধি সুত = 408।"
   }
  },
  {
   "id": "simple-compound-interest-036",
   "q": {
    "en": "The simple interest on 9,000 at 5% per annum for 4 years is —",
    "as": "9,000 ৰ ওপৰত বছৰি 5% হাৰত 4 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "1,600",
     "as": "১,৬০০"
    },
    {
     "en": "1,700",
     "as": "১,৭০০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "1,900",
     "as": "১,৯০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SI = 9000 x 5 x 4 / 100 = 1,800.",
    "as": "সৰল সুত = 9000 x 5 x 4 / 100 = 1,800।"
   }
  },
  {
   "id": "simple-compound-interest-037",
   "q": {
    "en": "The principal that amounts to 2,400 in 2 years at 10% per annum simple interest is —",
    "as": "বছৰি 10% সৰল সুতত 2 বছৰত 2,400 হোৱা মূলধন —"
   },
   "options": [
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "1,900",
     "as": "১,৯০০"
    },
    {
     "en": "2,000",
     "as": "২,০০০"
    },
    {
     "en": "2,100",
     "as": "২,১০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "P x 1.2 = 2400, so P = 2,000.",
    "as": "মূলধন x 1.2 = 2400, গতিকে মূলধন = 2,000।"
   }
  },
  {
   "id": "simple-compound-interest-038",
   "q": {
    "en": "The difference between the compound interest and the simple interest on 10,000 at 10% per annum for 2 years is —",
    "as": "10,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "200",
     "as": "২০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Difference = 10000 x 0.01 = 100.",
    "as": "পাৰ্থক্য = 10000 x 0.01 = 100।"
   }
  },
  {
   "id": "simple-compound-interest-039",
   "q": {
    "en": "The compound interest on 500 at 10% per annum for 2 years is —",
    "as": "500 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "105",
     "as": "১০৫"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "115",
     "as": "১১৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 500 x 1.21 = 605, so CI = 105.",
    "as": "মুঠ ধন = 500 x 1.21 = 605, গতিকে চক্ৰবৃদ্ধি সুত = 105।"
   }
  },
  {
   "id": "simple-compound-interest-040",
   "q": {
    "en": "The simple interest on 7,500 at 8% per annum for 2 years is —",
    "as": "7,500 ৰ ওপৰত বছৰি 8% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "1,150",
     "as": "১,১৫০"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    },
    {
     "en": "1,250",
     "as": "১,২৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 7500 x 8 x 2 / 100 = 1,200.",
    "as": "সৰল সুত = 7500 x 8 x 2 / 100 = 1,200।"
   }
  },
  {
   "id": "simple-compound-interest-041",
   "q": {
    "en": "The rate of simple interest at which 800 gives 96 in 2 years is —",
    "as": "800 এ 2 বছৰত 96 দিয়া সৰল সুতৰ হাৰ —"
   },
   "options": [
    {
     "en": "4%",
     "as": "৪%"
    },
    {
     "en": "5%",
     "as": "৫%"
    },
    {
     "en": "6%",
     "as": "৬%"
    },
    {
     "en": "8%",
     "as": "৮%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "R = 96 x 100 / (800 x 2) = 6%.",
    "as": "হাৰ = 96 x 100 / (800 x 2) = 6%।"
   }
  },
  {
   "id": "simple-compound-interest-042",
   "q": {
    "en": "The time in which 5,000 gives 750 simple interest at 5% per annum is —",
    "as": "বছৰি 5% হাৰত 5,000 এ 750 সৰল সুত দিয়া সময় —"
   },
   "options": [
    {
     "en": "3 years",
     "as": "৩ বছৰ"
    },
    {
     "en": "2 years",
     "as": "২ বছৰ"
    },
    {
     "en": "4 years",
     "as": "৪ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "T = 750 x 100 / (5000 x 5) = 3 years.",
    "as": "সময় = 750 x 100 / (5000 x 5) = 3 বছৰ।"
   }
  },
  {
   "id": "simple-compound-interest-043",
   "q": {
    "en": "The simple interest on 1,000 at 5% per annum for 4 years is —",
    "as": "1,000 ৰ ওপৰত বছৰি 5% হাৰত 4 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "150",
     "as": "১৫০"
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
   "correct": 0,
   "explanation": {
    "en": "SI = 1000 x 5 x 4 / 100 = 200.",
    "as": "সৰল সুত = 1000 x 5 x 4 / 100 = 200।"
   }
  },
  {
   "id": "simple-compound-interest-044",
   "q": {
    "en": "The compound interest on 2,500 at 4% per annum for 2 years is —",
    "as": "2,500 ৰ ওপৰত বছৰি 4% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "204",
     "as": "২০৪"
    },
    {
     "en": "202",
     "as": "২০২"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "206",
     "as": "২০৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 2500 x 1.0816 = 2,704, so CI = 204.",
    "as": "মুঠ ধন = 2500 x 1.0816 = 2,704, গতিকে চক্ৰবৃদ্ধি সুত = 204।"
   }
  },
  {
   "id": "simple-compound-interest-045",
   "q": {
    "en": "The amount on 1,500 at 8% per annum for 2 years compounded annually is —",
    "as": "বছৰি 8% হাৰত 1,500 ৰ 2 বছৰৰ বছৰি চক্ৰবৃদ্ধিৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "1,700",
     "as": "১,৭০০"
    },
    {
     "en": "1,720",
     "as": "১,৭২০"
    },
    {
     "en": "1,740",
     "as": "১,৭৪০"
    },
    {
     "en": "1,749.60",
     "as": "১,৭৪৯.৬০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Amount = 1500 x 1.1664 = 1,749.60.",
    "as": "মুঠ ধন = 1500 x 1.1664 = 1,749.60।"
   }
  },
  {
   "id": "simple-compound-interest-046",
   "q": {
    "en": "The simple interest on 3,600 at 6% per annum for 5 years is —",
    "as": "3,600 ৰ ওপৰত বছৰি 6% হাৰত 5 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "1,080",
     "as": "১,০৮০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,100",
     "as": "১,১০০"
    },
    {
     "en": "1,200",
     "as": "১,২০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 3600 x 6 x 5 / 100 = 1,080.",
    "as": "সৰল সুত = 3600 x 6 x 5 / 100 = 1,080।"
   }
  },
  {
   "id": "simple-compound-interest-047",
   "q": {
    "en": "If the compound interest on a sum for 2 years at 10% per annum is 420, the sum is —",
    "as": "বছৰি 10% হাৰত এটা ৰাশিৰ 2 বছৰৰ চক্ৰবৃদ্ধি সুত 420 হ'লে ৰাশিটো —"
   },
   "options": [
    {
     "en": "2,000",
     "as": "২,০০০"
    },
    {
     "en": "1,900",
     "as": "১,৯০০"
    },
    {
     "en": "1,800",
     "as": "১,৮০০"
    },
    {
     "en": "2,100",
     "as": "২,১০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "P x 0.21 = 420, so P = 2,000.",
    "as": "মূলধন x 0.21 = 420, গতিকে মূলধন = 2,000।"
   }
  },
  {
   "id": "simple-compound-interest-048",
   "q": {
    "en": "The compound interest on 6,000 at 10% per annum for 2 years is —",
    "as": "6,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "1,200",
     "as": "১,২০০"
    },
    {
     "en": "1,240",
     "as": "১,২৪০"
    },
    {
     "en": "1,260",
     "as": "১,২৬০"
    },
    {
     "en": "1,280",
     "as": "১,২৮০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 6000 x 1.21 = 7,260, so CI = 1,260.",
    "as": "মুঠ ধন = 6000 x 1.21 = 7,260, গতিকে চক্ৰবৃদ্ধি সুত = 1,260।"
   }
  },
  {
   "id": "simple-compound-interest-049",
   "q": {
    "en": "The simple interest on 2,500 at 8% per annum for 3 years is —",
    "as": "2,500 ৰ ওপৰত বছৰি 8% হাৰত 3 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "550",
     "as": "৫৫০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "650",
     "as": "৬৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 2500 x 8 x 3 / 100 = 600.",
    "as": "সৰল সুত = 2500 x 8 x 3 / 100 = 600।"
   }
  },
  {
   "id": "simple-compound-interest-050",
   "q": {
    "en": "The difference between the compound interest and the simple interest on 2,000 at 5% per annum for 2 years is —",
    "as": "2,000 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
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
     "en": "5",
     "as": "৫"
    },
    {
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Difference = 2000 x (0.05)^2 = 5.",
    "as": "পাৰ্থক্য = 2000 x (0.05)^2 = 5।"
   }
  },
  {
   "id": "simple-compound-interest-051",
   "q": {
    "en": "The amount on 4,000 at 5% per annum for 2 years under compound interest is —",
    "as": "বছৰি 5% হাৰত 4,000 ৰ 2 বছৰৰ চক্ৰবৃদ্ধি সুতৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "4,410",
     "as": "৪,৪১০"
    },
    {
     "en": "4,400",
     "as": "৪,৪০০"
    },
    {
     "en": "4,420",
     "as": "৪,৪২০"
    },
    {
     "en": "4,450",
     "as": "৪,৪৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 4000 x 1.1025 = 4,410.",
    "as": "মুঠ ধন = 4000 x 1.1025 = 4,410।"
   }
  },
  {
   "id": "simple-compound-interest-052",
   "q": {
    "en": "The compound interest on 12,000 at 10% per annum for 2 years is —",
    "as": "12,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "2,400",
     "as": "২,৪০০"
    },
    {
     "en": "2,520",
     "as": "২,৫২০"
    },
    {
     "en": "2,480",
     "as": "২,৪৮০"
    },
    {
     "en": "2,600",
     "as": "২,৬০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Amount = 12000 x 1.21 = 14,520, so CI = 2,520.",
    "as": "মুঠ ধন = 12000 x 1.21 = 14,520, গতিকে চক্ৰবৃদ্ধি সুত = 2,520।"
   }
  },
  {
   "id": "simple-compound-interest-053",
   "q": {
    "en": "The simple interest on 640 at 12.5% per annum for 2 years is —",
    "as": "640 ৰ ওপৰত বছৰি 12.5% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "140",
     "as": "১৪০"
    },
    {
     "en": "170",
     "as": "১৭০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 640 x 12.5 x 2 / 100 = 160.",
    "as": "সৰল সুত = 640 x 12.5 x 2 / 100 = 160।"
   }
  },
  {
   "id": "simple-compound-interest-054",
   "q": {
    "en": "If a sum of money doubles itself at simple interest in 8 years, the rate per annum is —",
    "as": "এটা ৰাশি সৰল সুতত 8 বছৰত দুগুণ হ'লে বছৰি হাৰ —"
   },
   "options": [
    {
     "en": "12.5%",
     "as": "১২.৫%"
    },
    {
     "en": "10%",
     "as": "১০%"
    },
    {
     "en": "15%",
     "as": "১৫%"
    },
    {
     "en": "20%",
     "as": "২০%"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "R = 100/8 = 12.5%.",
    "as": "হাৰ = 100/8 = 12.5%।"
   }
  },
  {
   "id": "simple-compound-interest-055",
   "q": {
    "en": "The compound interest on 3,000 at 10% per annum for 2 years is —",
    "as": "3,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "600",
     "as": "৬০০"
    },
    {
     "en": "610",
     "as": "৬১০"
    },
    {
     "en": "650",
     "as": "৬৫০"
    },
    {
     "en": "630",
     "as": "৬৩০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Amount = 3000 x 1.21 = 3,630, so CI = 630.",
    "as": "মুঠ ধন = 3000 x 1.21 = 3,630, গতিকে চক্ৰবৃদ্ধি সুত = 630।"
   }
  },
  {
   "id": "simple-compound-interest-056",
   "q": {
    "en": "The simple interest on 1,250 at 4% per annum for 2 years is —",
    "as": "1,250 ৰ ওপৰত বছৰি 4% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "90",
     "as": "৯০"
    },
    {
     "en": "110",
     "as": "১১০"
    },
    {
     "en": "120",
     "as": "১২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "SI = 1250 x 4 x 2 / 100 = 100.",
    "as": "সৰল সুত = 1250 x 4 x 2 / 100 = 100।"
   }
  },
  {
   "id": "simple-compound-interest-057",
   "q": {
    "en": "The amount on 800 at 5% per annum for 3 years under simple interest is —",
    "as": "বছৰি 5% হাৰত 800 ৰ 3 বছৰৰ সৰল সুতৰ মুঠ ধন —"
   },
   "options": [
    {
     "en": "900",
     "as": "৯০০"
    },
    {
     "en": "910",
     "as": "৯১০"
    },
    {
     "en": "920",
     "as": "৯২০"
    },
    {
     "en": "930",
     "as": "৯৩০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "SI = 120, so amount = 920.",
    "as": "সৰল সুত = 120, গতিকে মুঠ ধন = 920।"
   }
  },
  {
   "id": "simple-compound-interest-058",
   "q": {
    "en": "The compound interest on 10,000 at 5% per annum for 2 years is —",
    "as": "10,000 ৰ ওপৰত বছৰি 5% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "1,025",
     "as": "১,০২৫"
    },
    {
     "en": "1,020",
     "as": "১,০২০"
    },
    {
     "en": "1,000",
     "as": "১,০০০"
    },
    {
     "en": "1,050",
     "as": "১,০৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Amount = 10000 x 1.1025 = 11,025, so CI = 1,025.",
    "as": "মুঠ ধন = 10000 x 1.1025 = 11,025, গতিকে চক্ৰবৃদ্ধি সুত = 1,025।"
   }
  },
  {
   "id": "simple-compound-interest-059",
   "q": {
    "en": "The time in which a sum doubles itself at 10% per annum simple interest is —",
    "as": "বছৰি 10% সৰল সুতত এটা ৰাশি দুগুণ হোৱা সময় —"
   },
   "options": [
    {
     "en": "10 years",
     "as": "১০ বছৰ"
    },
    {
     "en": "8 years",
     "as": "৮ বছৰ"
    },
    {
     "en": "5 years",
     "as": "৫ বছৰ"
    },
    {
     "en": "12 years",
     "as": "১২ বছৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "T = 100/10 = 10 years.",
    "as": "সময় = 100/10 = 10 বছৰ।"
   }
  },
  {
   "id": "simple-compound-interest-060",
   "q": {
    "en": "The simple interest on 4,800 at 7.5% per annum for 2 years is —",
    "as": "4,800 ৰ ওপৰত বছৰি 7.5% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "660",
     "as": "৬৬০"
    },
    {
     "en": "700",
     "as": "৭০০"
    },
    {
     "en": "750",
     "as": "৭৫০"
    },
    {
     "en": "720",
     "as": "৭২০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "SI = 4800 x 7.5 x 2 / 100 = 720.",
    "as": "সৰল সুত = 4800 x 7.5 x 2 / 100 = 720।"
   }
  },
  {
   "id": "simple-compound-interest-061",
   "q": {
    "en": "The compound interest on 2,000 at 20% per annum for 2 years is —",
    "as": "2,000 ৰ ওপৰত বছৰি 20% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি সুত —"
   },
   "options": [
    {
     "en": "800",
     "as": "৮০০"
    },
    {
     "en": "860",
     "as": "৮৬০"
    },
    {
     "en": "880",
     "as": "৮৮০"
    },
    {
     "en": "900",
     "as": "৯০০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Amount = 2000 x 1.44 = 2,880, so CI = 880.",
    "as": "মুঠ ধন = 2000 x 1.44 = 2,880, গতিকে চক্ৰবৃদ্ধি সুত = 880।"
   }
  },
  {
   "id": "simple-compound-interest-062",
   "q": {
    "en": "The difference between the compound interest and the simple interest on 20,000 at 10% per annum for 2 years is —",
    "as": "20,000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য —"
   },
   "options": [
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "150",
     "as": "১৫০"
    },
    {
     "en": "250",
     "as": "২৫০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Difference = 20000 x 0.01 = 200.",
    "as": "পাৰ্থক্য = 20000 x 0.01 = 200।"
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
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "27",
     "as": "২৭"
    },
    {
     "en": "21",
     "as": "২১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "BODMAS: 6/2 = 3, then 3 x 4 = 12, so 12 + 12 - 3 = 21.",
    "as": "BODMAS: 6/2 = 3, তাৰপিছত 3 x 4 = 12, গতিকে 12 + 12 - 3 = 21।"
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
    "en": "24 / 3 = 8.",
    "as": "24 / 3 = 8।"
   }
  },
  {
   "id": "simplification-fractions-003",
   "q": {
    "en": "Simplify: 8 ÷ 2 x 3 + 4",
    "as": "সৰল কৰক: 8 ÷ 2 x 3 + 4"
   },
   "options": [
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Left to right: 4 x 3 = 12, then 12 + 4 = 16.",
    "as": "বাওঁৰপৰা সোঁলৈ: 4 x 3 = 12, তাৰপিছত 12 + 4 = 16।"
   }
  },
  {
   "id": "simplification-fractions-004",
   "q": {
    "en": "Simplify: 15 - [3 + {4 - (6 - 5)}]",
    "as": "সৰল কৰক: 15 - [3 + {4 - (6 - 5)}]"
   },
   "options": [
    {
     "en": "7",
     "as": "৭"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "13",
     "as": "১৩"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Innermost first: 6-5 = 1; 4-1 = 3; 3+3 = 6; 15-6 = 9.",
    "as": "ভিতৰৰ পৰা: 6-5 = 1; 4-1 = 3; 3+3 = 6; 15-6 = 9।"
   }
  },
  {
   "id": "simplification-fractions-005",
   "q": {
    "en": "Simplify: 20 ÷ 4 + 3 x 2 - 5",
    "as": "সৰল কৰক: 20 ÷ 4 + 3 x 2 - 5"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "11",
     "as": "১১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5 + 6 - 5 = 6.",
    "as": "5 + 6 - 5 = 6।"
   }
  },
  {
   "id": "simplification-fractions-006",
   "q": {
    "en": "Simplify: 36 ÷ 6 x 2",
    "as": "সৰল কৰক: 36 ÷ 6 x 2"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Left to right: 6 x 2 = 12.",
    "as": "বাওঁৰপৰা সোঁলৈ: 6 x 2 = 12।"
   }
  },
  {
   "id": "simplification-fractions-007",
   "q": {
    "en": "Simplify: 100 - 25 x 2 + 10",
    "as": "সৰল কৰক: 100 - 25 x 2 + 10"
   },
   "options": [
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "160",
     "as": "১৬০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "100 - 50 + 10 = 60.",
    "as": "100 - 50 + 10 = 60।"
   }
  },
  {
   "id": "simplification-fractions-008",
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
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "5/4",
     "as": "৫/৪"
    },
    {
     "en": "1",
     "as": "১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM 12: 8/12 + 9/12 - 2/12 = 15/12 = 5/4.",
    "as": "ল.সা.গু. 12: 8/12 + 9/12 - 2/12 = 15/12 = 5/4।"
   }
  },
  {
   "id": "simplification-fractions-009",
   "q": {
    "en": "Simplify: 5/6 ÷ 10/9",
    "as": "সৰল কৰক: 5/6 ÷ 10/9"
   },
   "options": [
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "4/3",
     "as": "৪/৩"
    },
    {
     "en": "25/27",
     "as": "২৫/২৭"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "5/6 x 9/10 = 45/60 = 3/4.",
    "as": "5/6 x 9/10 = 45/60 = 3/4।"
   }
  },
  {
   "id": "simplification-fractions-010",
   "q": {
    "en": "Simplify: (3/5) of 45",
    "as": "সৰল কৰক: 45 ৰ (3/5)"
   },
   "options": [
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
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "45 / 5 = 9 and 9 x 3 = 27.",
    "as": "45 / 5 = 9 আৰু 9 x 3 = 27।"
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
     "en": "4 1/4",
     "as": "৪ ১/৪"
    },
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "4 1/2",
     "as": "৪ ১/২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "5/2 + 7/4 = 10/4 + 7/4 = 17/4 = 4 1/4.",
    "as": "5/2 + 7/4 = 10/4 + 7/4 = 17/4 = 4 1/4।"
   }
  },
  {
   "id": "simplification-fractions-012",
   "q": {
    "en": "Simplify: 7/8 - 1/4",
    "as": "সৰল কৰক: 7/8 - 1/4"
   },
   "options": [
    {
     "en": "5/8",
     "as": "৫/৮"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "7/8",
     "as": "৭/৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/4 = 2/8, so 7/8 - 2/8 = 5/8.",
    "as": "1/4 = 2/8, গতিকে 7/8 - 2/8 = 5/8।"
   }
  },
  {
   "id": "simplification-fractions-013",
   "q": {
    "en": "Simplify: 3/4 x 8/9",
    "as": "সৰল কৰক: 3/4 x 8/9"
   },
   "options": [
    {
     "en": "1/3",
     "as": "১/৩"
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
     "en": "5/6",
     "as": "৫/৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "24/36 = 2/3.",
    "as": "24/36 = 2/3।"
   }
  },
  {
   "id": "simplification-fractions-014",
   "q": {
    "en": "Simplify: 4/5 ÷ 8/15",
    "as": "সৰল কৰক: 4/5 ÷ 8/15"
   },
   "options": [
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "6/5",
     "as": "৬/৫"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    },
    {
     "en": "3/2",
     "as": "৩/২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "4/5 x 15/8 = 60/40 = 3/2.",
    "as": "4/5 x 15/8 = 60/40 = 3/2।"
   }
  },
  {
   "id": "simplification-fractions-015",
   "q": {
    "en": "Simplify: 1/2 + 1/4 + 1/8",
    "as": "সৰল কৰক: 1/2 + 1/4 + 1/8"
   },
   "options": [
    {
     "en": "7/8",
     "as": "৭/৮"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "5/8",
     "as": "৫/৮"
    },
    {
     "en": "1",
     "as": "১"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "LCM 8: 4/8 + 2/8 + 1/8 = 7/8.",
    "as": "ল.সা.গু. 8: 4/8 + 2/8 + 1/8 = 7/8।"
   }
  },
  {
   "id": "simplification-fractions-016",
   "q": {
    "en": "Simplify: 5 - 2 1/3",
    "as": "সৰল কৰক: 5 - 2 1/3"
   },
   "options": [
    {
     "en": "2 1/3",
     "as": "২ ১/৩"
    },
    {
     "en": "2 2/3",
     "as": "২ ২/৩"
    },
    {
     "en": "3 1/3",
     "as": "৩ ১/৩"
    },
    {
     "en": "3 2/3",
     "as": "৩ ২/৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "5 - 7/3 = 15/3 - 7/3 = 8/3 = 2 2/3.",
    "as": "5 - 7/3 = 15/3 - 7/3 = 8/3 = 2 2/3।"
   }
  },
  {
   "id": "simplification-fractions-017",
   "q": {
    "en": "The value of 0.4 x 0.02 is —",
    "as": "0.4 x 0.02 ৰ মান —"
   },
   "options": [
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "0.08",
     "as": "০.০৮"
    },
    {
     "en": "0.8",
     "as": "০.৮"
    },
    {
     "en": "0.008",
     "as": "০.০০৮"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "4 x 2 = 8 with three decimal places, giving 0.008.",
    "as": "4 x 2 = 8, তিনি দশমিক স্থান, গতিকে 0.008।"
   }
  },
  {
   "id": "simplification-fractions-018",
   "q": {
    "en": "Simplify: 0.75 + 0.5 - 0.25",
    "as": "সৰল কৰক: 0.75 + 0.5 - 0.25"
   },
   "options": [
    {
     "en": "0.5",
     "as": "০.৫"
    },
    {
     "en": "0.75",
     "as": "০.৭৫"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "1.5",
     "as": "১.৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "0.75 + 0.50 = 1.25, and 1.25 - 0.25 = 1.",
    "as": "0.75 + 0.50 = 1.25, আৰু 1.25 - 0.25 = 1।"
   }
  },
  {
   "id": "simplification-fractions-019",
   "q": {
    "en": "The value of (0.5)^3 is —",
    "as": "(0.5)^3 ৰ মান —"
   },
   "options": [
    {
     "en": "0.125",
     "as": "০.১২৫"
    },
    {
     "en": "0.015",
     "as": "০.০১৫"
    },
    {
     "en": "0.25",
     "as": "০.২৫"
    },
    {
     "en": "1.5",
     "as": "১.৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "0.5 x 0.5 x 0.5 = 0.125.",
    "as": "0.5 x 0.5 x 0.5 = 0.125।"
   }
  },
  {
   "id": "simplification-fractions-020",
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
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "25",
     "as": "২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "12 + 9 = 21.",
    "as": "12 + 9 = 21।"
   }
  },
  {
   "id": "simplification-fractions-021",
   "q": {
    "en": "If x = 3 and y = 2, the value of x^2 + y^2 is —",
    "as": "x = 3 আৰু y = 2 হ'লে x^2 + y^2 ৰ মান —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "25",
     "as": "২৫"
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
   "id": "simplification-fractions-022",
   "q": {
    "en": "Simplify: 25% of 80 + 50% of 40",
    "as": "সৰল কৰক: 80 ৰ 25% + 40 ৰ 50%"
   },
   "options": [
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "45",
     "as": "৪৫"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "60",
     "as": "৬০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "20 + 20 = 40.",
    "as": "20 + 20 = 40।"
   }
  },
  {
   "id": "simplification-fractions-023",
   "q": {
    "en": "Simplify: 6 x 6 ÷ 6 + 6",
    "as": "সৰল কৰক: 6 x 6 ÷ 6 + 6"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "42",
     "as": "৪২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "6 x 1 + 6 = 12.",
    "as": "6 x 1 + 6 = 12।"
   }
  },
  {
   "id": "simplification-fractions-024",
   "q": {
    "en": "Simplify: 45 ÷ 9 + 12 x 2",
    "as": "সৰল কৰক: 45 ÷ 9 + 12 x 2"
   },
   "options": [
    {
     "en": "19",
     "as": "১৯"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "29",
     "as": "২৯"
    },
    {
     "en": "34",
     "as": "৩৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5 + 24 = 29.",
    "as": "5 + 24 = 29।"
   }
  },
  {
   "id": "simplification-fractions-025",
   "q": {
    "en": "Simplify: 96 ÷ 8 ÷ 3",
    "as": "সৰল কৰক: 96 ÷ 8 ÷ 3"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "32",
     "as": "৩২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Left to right: 96 / 8 = 12, then 12 / 3 = 4.",
    "as": "বাওঁৰপৰা সোঁলৈ: 96 / 8 = 12, তাৰপিছত 12 / 3 = 4।"
   }
  },
  {
   "id": "simplification-fractions-026",
   "q": {
    "en": "Simplify: 2^3 + 3^2",
    "as": "সৰল কৰক: 2^3 + 3^2"
   },
   "options": [
    {
     "en": "17",
     "as": "১৭"
    },
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "25",
     "as": "২৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "8 + 9 = 17.",
    "as": "8 + 9 = 17।"
   }
  },
  {
   "id": "simplification-fractions-027",
   "q": {
    "en": "Simplify: (5 + 3)^2 ÷ 16",
    "as": "সৰল কৰক: (5 + 3)^2 ÷ 16"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "4",
     "as": "৪"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "64 / 16 = 4.",
    "as": "64 / 16 = 4।"
   }
  },
  {
   "id": "simplification-fractions-028",
   "q": {
    "en": "Simplify: 1 - 1/2 - 1/4",
    "as": "সৰল কৰক: 1 - 1/2 - 1/4"
   },
   "options": [
    {
     "en": "1/8",
     "as": "১/৮"
    },
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
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "LCM 4: 4/4 - 2/4 - 1/4 = 1/4.",
    "as": "ল.সা.গু. 4: 4/4 - 2/4 - 1/4 = 1/4।"
   }
  },
  {
   "id": "simplification-fractions-029",
   "q": {
    "en": "Simplify: 2/5 + 1/10",
    "as": "সৰল কৰক: 2/5 + 1/10"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "3/10",
     "as": "৩/১০"
    },
    {
     "en": "2/5",
     "as": "২/৫"
    },
    {
     "en": "1/5",
     "as": "১/৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "4/10 + 1/10 = 5/10 = 1/2.",
    "as": "4/10 + 1/10 = 5/10 = 1/2।"
   }
  },
  {
   "id": "simplification-fractions-030",
   "q": {
    "en": "Simplify: 9 1/2 ÷ 3 1/6",
    "as": "সৰল কৰক: 9 1/2 ÷ 3 1/6"
   },
   "options": [
    {
     "en": "2",
     "as": "২"
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
     "en": "5",
     "as": "৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "19/2 ÷ 19/6 = 19/2 x 6/19 = 3.",
    "as": "19/2 ÷ 19/6 = 19/2 x 6/19 = 3।"
   }
  },
  {
   "id": "simplification-fractions-031",
   "q": {
    "en": "Simplify: 0.25 x 0.4",
    "as": "সৰল কৰক: 0.25 x 0.4"
   },
   "options": [
    {
     "en": "0.01",
     "as": "০.০১"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "0.1",
     "as": "০.১"
    },
    {
     "en": "0.001",
     "as": "০.০০১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "25 x 4 = 100 with three decimal places, giving 0.1.",
    "as": "25 x 4 = 100, তিনি দশমিক স্থান, গতিকে 0.1।"
   }
  },
  {
   "id": "simplification-fractions-032",
   "q": {
    "en": "Simplify: 3.6 ÷ 0.9",
    "as": "সৰল কৰক: 3.6 ÷ 0.9"
   },
   "options": [
    {
     "en": "0.4",
     "as": "০.৪"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "4",
     "as": "৪"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "36 / 9 = 4.",
    "as": "36 / 9 = 4।"
   }
  },
  {
   "id": "simplification-fractions-033",
   "q": {
    "en": "Simplify: 10 - 3 x 2 + 4 ÷ 2",
    "as": "সৰল কৰক: 10 - 3 x 2 + 4 ÷ 2"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "6",
     "as": "৬"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "10 - 6 + 2 = 6.",
    "as": "10 - 6 + 2 = 6।"
   }
  },
  {
   "id": "simplification-fractions-034",
   "q": {
    "en": "Simplify: 1/3 of 3/4",
    "as": "সৰল কৰক: 3/4 ৰ 1/3"
   },
   "options": [
    {
     "en": "4/3",
     "as": "৪/৩"
    },
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
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/3 x 3/4 = 1/4.",
    "as": "1/3 x 3/4 = 1/4।"
   }
  },
  {
   "id": "simplification-fractions-035",
   "q": {
    "en": "Simplify: 5/8 + 3/8 - 1/2",
    "as": "সৰল কৰক: 5/8 + 3/8 - 1/2"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "5/8",
     "as": "৫/৮"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "8/8 - 4/8 = 4/8 = 1/2.",
    "as": "8/8 - 4/8 = 4/8 = 1/2।"
   }
  },
  {
   "id": "simplification-fractions-036",
   "q": {
    "en": "The value of 12 1/2 % of 96 is —",
    "as": "96 ৰ 12 1/2 % ৰ মান —"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "12.5% = 1/8, and 96 / 8 = 12.",
    "as": "12.5% = 1/8, আৰু 96 / 8 = 12।"
   }
  },
  {
   "id": "simplification-fractions-037",
   "q": {
    "en": "Simplify: 1000 - 999 ÷ 999",
    "as": "সৰল কৰক: 1000 - 999 ÷ 999"
   },
   "options": [
    {
     "en": "999",
     "as": "৯৯৯"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "0",
     "as": "০"
    },
    {
     "en": "1000",
     "as": "১০০০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "999 / 999 = 1, so 1000 - 1 = 999.",
    "as": "999 / 999 = 1, গতিকে 1000 - 1 = 999।"
   }
  },
  {
   "id": "simplification-fractions-038",
   "q": {
    "en": "Simplify: (2 + 3) x (7 - 4)",
    "as": "সৰল কৰক: (2 + 3) x (7 - 4)"
   },
   "options": [
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "5 x 3 = 15.",
    "as": "5 x 3 = 15।"
   }
  },
  {
   "id": "simplification-fractions-039",
   "q": {
    "en": "Simplify: 2.5 x 4 - 3.5",
    "as": "সৰল কৰক: 2.5 x 4 - 3.5"
   },
   "options": [
    {
     "en": "6.5",
     "as": "৬.৫"
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
     "en": "7.5",
     "as": "৭.৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "10 - 3.5 = 6.5.",
    "as": "10 - 3.5 = 6.5।"
   }
  },
  {
   "id": "simplification-fractions-040",
   "q": {
    "en": "Simplify: 1/2 + 2/3 - 1/6",
    "as": "সৰল কৰক: 1/2 + 2/3 - 1/6"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM 6: 3/6 + 4/6 - 1/6 = 6/6 = 1.",
    "as": "ল.সা.গু. 6: 3/6 + 4/6 - 1/6 = 6/6 = 1।"
   }
  },
  {
   "id": "simplification-fractions-041",
   "q": {
    "en": "Simplify: 16 ÷ 4 x 2 ÷ 8",
    "as": "সৰল কৰক: 16 ÷ 4 x 2 ÷ 8"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
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
     "en": "8",
     "as": "৮"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Left to right: 4 x 2 = 8, 8 / 8 = 1.",
    "as": "বাওঁৰপৰা সোঁলৈ: 4 x 2 = 8, 8 / 8 = 1।"
   }
  },
  {
   "id": "simplification-fractions-042",
   "q": {
    "en": "Simplify: 9/10 - 2/5",
    "as": "সৰল কৰক: 9/10 - 2/5"
   },
   "options": [
    {
     "en": "2/5",
     "as": "২/৫"
    },
    {
     "en": "3/10",
     "as": "৩/১০"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "7/10",
     "as": "৭/১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "2/5 = 4/10, so 9/10 - 4/10 = 5/10 = 1/2.",
    "as": "2/5 = 4/10, গতিকে 9/10 - 4/10 = 5/10 = 1/2।"
   }
  },
  {
   "id": "simplification-fractions-043",
   "q": {
    "en": "Simplify: 3/7 x 14/9",
    "as": "সৰল কৰক: 3/7 x 14/9"
   },
   "options": [
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "14/21",
     "as": "১৪/২১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "42/63 = 2/3.",
    "as": "42/63 = 2/3।"
   }
  },
  {
   "id": "simplification-fractions-044",
   "q": {
    "en": "Simplify: 0.125 x 8",
    "as": "সৰল কৰক: 0.125 x 8"
   },
   "options": [
    {
     "en": "0.1",
     "as": "০.১"
    },
    {
     "en": "0.01",
     "as": "০.০১"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "1",
     "as": "১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "125 x 8 = 1000 with three decimal places, giving 1.",
    "as": "125 x 8 = 1000, তিনি দশমিক স্থান, গতিকে 1।"
   }
  },
  {
   "id": "simplification-fractions-045",
   "q": {
    "en": "Simplify: 7.2 ÷ 1.2",
    "as": "সৰল কৰক: 7.2 ÷ 1.2"
   },
   "options": [
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "0.6",
     "as": "০.৬"
    },
    {
     "en": "60",
     "as": "৬০"
    },
    {
     "en": "0.06",
     "as": "০.০৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "72 / 12 = 6.",
    "as": "72 / 12 = 6।"
   }
  },
  {
   "id": "simplification-fractions-046",
   "q": {
    "en": "Simplify: 5^2 - 4^2",
    "as": "সৰল কৰক: 5^2 - 4^2"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "9",
     "as": "৯"
    },
    {
     "en": "41",
     "as": "৪১"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "25 - 16 = 9.",
    "as": "25 - 16 = 9।"
   }
  },
  {
   "id": "simplification-fractions-047",
   "q": {
    "en": "Simplify: 1/4 + 1/5",
    "as": "সৰল কৰক: 1/4 + 1/5"
   },
   "options": [
    {
     "en": "2/9",
     "as": "২/৯"
    },
    {
     "en": "1/9",
     "as": "১/৯"
    },
    {
     "en": "9/20",
     "as": "৯/২০"
    },
    {
     "en": "4/20",
     "as": "৪/২০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "LCM 20: 5/20 + 4/20 = 9/20.",
    "as": "ল.সা.গু. 20: 5/20 + 4/20 = 9/20।"
   }
  },
  {
   "id": "simplification-fractions-048",
   "q": {
    "en": "Simplify: 6 ÷ 0.5",
    "as": "সৰল কৰক: 6 ÷ 0.5"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "6",
     "as": "৬"
    },
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "0.12",
     "as": "০.১২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "6 / (1/2) = 12.",
    "as": "6 / (1/2) = 12।"
   }
  },
  {
   "id": "simplification-fractions-049",
   "q": {
    "en": "Simplify: 0.6 + 0.06 + 0.006",
    "as": "সৰল কৰক: 0.6 + 0.06 + 0.006"
   },
   "options": [
    {
     "en": "0.6666",
     "as": "০.৬৬৬৬"
    },
    {
     "en": "0.66",
     "as": "০.৬৬"
    },
    {
     "en": "0.666",
     "as": "০.৬৬৬"
    },
    {
     "en": "6.66",
     "as": "৬.৬৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Aligning the decimals gives 0.666.",
    "as": "দশমিকবোৰ শাৰী পাতিলে 0.666 পোৱা যায়।"
   }
  },
  {
   "id": "simplification-fractions-050",
   "q": {
    "en": "Simplify: 100 ÷ 25 ÷ 4",
    "as": "সৰল কৰক: 100 ÷ 25 ÷ 4"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "100",
     "as": "১০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Left to right: 4 / 4 = 1.",
    "as": "বাওঁৰপৰা সোঁলৈ: 4 / 4 = 1।"
   }
  },
  {
   "id": "simplification-fractions-051",
   "q": {
    "en": "Simplify: 3/4 of 2/3",
    "as": "সৰল কৰক: 2/3 ৰ 3/4"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "3/4 x 2/3 = 6/12 = 1/2.",
    "as": "3/4 x 2/3 = 6/12 = 1/2।"
   }
  },
  {
   "id": "simplification-fractions-052",
   "q": {
    "en": "Simplify: 11/4 - 1 1/2",
    "as": "সৰল কৰক: 11/4 - 1 1/2"
   },
   "options": [
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "1 1/4",
     "as": "১ ১/৪"
    },
    {
     "en": "1 1/2",
     "as": "১ ১/২"
    },
    {
     "en": "2",
     "as": "২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "11/4 - 3/2 = 11/4 - 6/4 = 5/4 = 1 1/4.",
    "as": "11/4 - 3/2 = 11/4 - 6/4 = 5/4 = 1 1/4।"
   }
  },
  {
   "id": "simplification-fractions-053",
   "q": {
    "en": "The value of sqrt(1.44) is —",
    "as": "sqrt(1.44) ৰ মান —"
   },
   "options": [
    {
     "en": "0.12",
     "as": "০.১২"
    },
    {
     "en": "0.012",
     "as": "০.০১২"
    },
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "1.2",
     "as": "১.২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1.2 x 1.2 = 1.44.",
    "as": "1.2 x 1.2 = 1.44।"
   }
  },
  {
   "id": "simplification-fractions-054",
   "q": {
    "en": "Simplify: 2^4 ÷ 2^2",
    "as": "সৰল কৰক: 2^4 ÷ 2^2"
   },
   "options": [
    {
     "en": "4",
     "as": "৪"
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
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "16 / 4 = 4.",
    "as": "16 / 4 = 4।"
   }
  },
  {
   "id": "simplification-fractions-055",
   "q": {
    "en": "Simplify: 45 - 15 ÷ 3 + 6 x 2",
    "as": "সৰল কৰক: 45 - 15 ÷ 3 + 6 x 2"
   },
   "options": [
    {
     "en": "37",
     "as": "৩৭"
    },
    {
     "en": "52",
     "as": "৫২"
    },
    {
     "en": "42",
     "as": "৪২"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "45 - 5 + 12 = 52.",
    "as": "45 - 5 + 12 = 52।"
   }
  },
  {
   "id": "simplification-fractions-056",
   "q": {
    "en": "Simplify: 1/8 of 64",
    "as": "সৰল কৰক: 64 ৰ 1/8"
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
   "correct": 1,
   "explanation": {
    "en": "64 / 8 = 8.",
    "as": "64 / 8 = 8।"
   }
  },
  {
   "id": "simplification-fractions-057",
   "q": {
    "en": "Simplify: 0.9 x 0.9",
    "as": "সৰল কৰক: 0.9 x 0.9"
   },
   "options": [
    {
     "en": "0.18",
     "as": "০.১৮"
    },
    {
     "en": "8.1",
     "as": "৮.১"
    },
    {
     "en": "0.9",
     "as": "০.৯"
    },
    {
     "en": "0.81",
     "as": "০.৮১"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "9 x 9 = 81 with two decimal places, giving 0.81.",
    "as": "9 x 9 = 81, দুই দশমিক স্থান, গতিকে 0.81।"
   }
  },
  {
   "id": "simplification-fractions-058",
   "q": {
    "en": "Simplify: 5/6 + 1/6 - 1/3",
    "as": "সৰল কৰক: 5/6 + 1/6 - 1/3"
   },
   "options": [
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "5/6",
     "as": "৫/৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "6/6 - 2/6 = 4/6 = 2/3.",
    "as": "6/6 - 2/6 = 4/6 = 2/3।"
   }
  },
  {
   "id": "simplification-fractions-059",
   "q": {
    "en": "Simplify: 200 ÷ 8 x 5",
    "as": "সৰল কৰক: 200 ÷ 8 x 5"
   },
   "options": [
    {
     "en": "125",
     "as": "১২৫"
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
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Left to right: 25 x 5 = 125.",
    "as": "বাওঁৰপৰা সোঁলৈ: 25 x 5 = 125।"
   }
  },
  {
   "id": "simplification-fractions-060",
   "q": {
    "en": "Simplify: 3 - 3 ÷ 3",
    "as": "সৰল কৰক: 3 - 3 ÷ 3"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
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
     "en": "3",
     "as": "৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "3 - 1 = 2.",
    "as": "3 - 1 = 2।"
   }
  },
  {
   "id": "simplification-fractions-061",
   "q": {
    "en": "Simplify: 1/2 x 1/2 x 1/2",
    "as": "সৰল কৰক: 1/2 x 1/2 x 1/2"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "1/8",
     "as": "১/৮"
    },
    {
     "en": "3/2",
     "as": "৩/২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1/2 x 1/2 x 1/2 = 1/8.",
    "as": "1/2 x 1/2 x 1/2 = 1/8।"
   }
  },
  {
   "id": "simplification-fractions-062",
   "q": {
    "en": "Simplify: 48 ÷ (2 x 3) + 4",
    "as": "সৰল কৰক: 48 ÷ (2 x 3) + 4"
   },
   "options": [
    {
     "en": "12",
     "as": "১২"
    },
    {
     "en": "10",
     "as": "১০"
    },
    {
     "en": "8",
     "as": "৮"
    },
    {
     "en": "28",
     "as": "২৮"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "48 / 6 = 8, then 8 + 4 = 12.",
    "as": "48 / 6 = 8, তাৰপিছত 8 + 4 = 12।"
   }
  },
  {
   "id": "simplification-fractions-063",
   "q": {
    "en": "The value of 0.75 ÷ 0.25 is —",
    "as": "0.75 ÷ 0.25 ৰ মান —"
   },
   "options": [
    {
     "en": "3",
     "as": "৩"
    },
    {
     "en": "0.3",
     "as": "০.৩"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "0.03",
     "as": "০.০৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "75 / 25 = 3.",
    "as": "75 / 25 = 3।"
   }
  },
  {
   "id": "simplification-fractions-064",
   "q": {
    "en": "Simplify: 1.2 x 1.2 - 0.44",
    "as": "সৰল কৰক: 1.2 x 1.2 - 0.44"
   },
   "options": [
    {
     "en": "0.9",
     "as": "০.৯"
    },
    {
     "en": "1",
     "as": "১"
    },
    {
     "en": "1.1",
     "as": "১.১"
    },
    {
     "en": "1.44",
     "as": "১.৪৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1.44 - 0.44 = 1.",
    "as": "1.44 - 0.44 = 1।"
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
    "en": "A car covers 240 km in 4 hours. Its speed is —",
    "as": "এখন গাড়ীয়ে 4 ঘণ্টাত 240 কিমি অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "65 km/h",
     "as": "৬৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Speed = 240 / 4 = 60 km/h.",
    "as": "গতি = 240 / 4 = 60 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-002",
   "q": {
    "en": "A train covers 300 km in 5 hours. Its speed is —",
    "as": "এখন ৰে'লে 5 ঘণ্টাত 300 কিমি অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "65 km/h",
     "as": "৬৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Speed = 300 / 5 = 60 km/h.",
    "as": "গতি = 300 / 5 = 60 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-003",
   "q": {
    "en": "A man walks 12 km in 3 hours. His speed is —",
    "as": "এজন মানুহে 3 ঘণ্টাত 12 কিমি খোজ কাঢ়ে। তেওঁৰ গতি —"
   },
   "options": [
    {
     "en": "3 km/h",
     "as": "৩ কিমি/ঘণ্টা"
    },
    {
     "en": "6 km/h",
     "as": "৬ কিমি/ঘণ্টা"
    },
    {
     "en": "5 km/h",
     "as": "৫ কিমি/ঘণ্টা"
    },
    {
     "en": "4 km/h",
     "as": "৪ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Speed = 12 / 3 = 4 km/h.",
    "as": "গতি = 12 / 3 = 4 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-004",
   "q": {
    "en": "A car travels at 60 km/h for 3 hours. The distance covered is —",
    "as": "এখন গাড়ী 60 কিমি/ঘণ্টা বেগত 3 ঘণ্টা চলে। অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "180 km",
     "as": "১৮০ কিমি"
    },
    {
     "en": "160 km",
     "as": "১৬০ কিমি"
    },
    {
     "en": "150 km",
     "as": "১৫০ কিমি"
    },
    {
     "en": "200 km",
     "as": "২০০ কিমি"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Distance = 60 x 3 = 180 km.",
    "as": "দূৰত্ব = 60 x 3 = 180 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-005",
   "q": {
    "en": "A train travels at 80 km/h for 2.5 hours. The distance covered is —",
    "as": "এখন ৰে'ল 80 কিমি/ঘণ্টা বেগত 2.5 ঘণ্টা চলে। অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "180 km",
     "as": "১৮০ কিমি"
    },
    {
     "en": "190 km",
     "as": "১৯০ কিমি"
    },
    {
     "en": "210 km",
     "as": "২১০ কিমি"
    },
    {
     "en": "200 km",
     "as": "২০০ কিমি"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Distance = 80 x 2.5 = 200 km.",
    "as": "দূৰত্ব = 80 x 2.5 = 200 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-006",
   "q": {
    "en": "A man covers 150 km at 50 km/h. The time taken is —",
    "as": "এজন মানুহে 50 কিমি/ঘণ্টা বেগত 150 কিমি অতিক্ৰম কৰে। লগা সময় —"
   },
   "options": [
    {
     "en": "2 hours",
     "as": "২ ঘণ্টা"
    },
    {
     "en": "2.5 hours",
     "as": "২.৫ ঘণ্টা"
    },
    {
     "en": "3.5 hours",
     "as": "৩.৫ ঘণ্টা"
    },
    {
     "en": "3 hours",
     "as": "৩ ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Time = 150 / 50 = 3 hours.",
    "as": "সময় = 150 / 50 = 3 ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-007",
   "q": {
    "en": "A speed of 36 km/h expressed in m/s is —",
    "as": "36 কিমি/ঘণ্টা বেগক m/s ত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "8 m/s",
     "as": "৮ m/s"
    },
    {
     "en": "12 m/s",
     "as": "১২ m/s"
    },
    {
     "en": "10 m/s",
     "as": "১০ m/s"
    },
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "36 x 5/18 = 10 m/s.",
    "as": "36 x 5/18 = 10 m/s।"
   }
  },
  {
   "id": "time-speed-distance-008",
   "q": {
    "en": "A speed of 72 km/h expressed in m/s is —",
    "as": "72 কিমি/ঘণ্টা বেগক m/s ত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    },
    {
     "en": "18 m/s",
     "as": "১৮ m/s"
    },
    {
     "en": "25 m/s",
     "as": "২৫ m/s"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "72 x 5/18 = 20 m/s.",
    "as": "72 x 5/18 = 20 m/s।"
   }
  },
  {
   "id": "time-speed-distance-009",
   "q": {
    "en": "A speed of 54 km/h expressed in m/s is —",
    "as": "54 কিমি/ঘণ্টা বেগক m/s ত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "12 m/s",
     "as": "১২ m/s"
    },
    {
     "en": "18 m/s",
     "as": "১৮ m/s"
    },
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "54 x 5/18 = 15 m/s.",
    "as": "54 x 5/18 = 15 m/s।"
   }
  },
  {
   "id": "time-speed-distance-010",
   "q": {
    "en": "A speed of 20 m/s expressed in km/h is —",
    "as": "20 m/s বেগক কিমি/ঘণ্টাত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "66 km/h",
     "as": "৬৬ কিমি/ঘণ্টা"
    },
    {
     "en": "80 km/h",
     "as": "৮০ কিমি/ঘণ্টা"
    },
    {
     "en": "72 km/h",
     "as": "৭২ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "20 x 18/5 = 72 km/h.",
    "as": "20 x 18/5 = 72 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-011",
   "q": {
    "en": "A speed of 15 m/s expressed in km/h is —",
    "as": "15 m/s বেগক কিমি/ঘণ্টাত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "54 km/h",
     "as": "৫৪ কিমি/ঘণ্টা"
    },
    {
     "en": "52 km/h",
     "as": "৫২ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "56 km/h",
     "as": "৫৬ কিমি/ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "15 x 18/5 = 54 km/h.",
    "as": "15 x 18/5 = 54 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-012",
   "q": {
    "en": "A man covers 600 m in 2 minutes. His speed in km/h is —",
    "as": "এজন মানুহে 2 মিনিটত 600 মিটাৰ অতিক্ৰম কৰে। তেওঁৰ কিমি/ঘণ্টাত গতি —"
   },
   "options": [
    {
     "en": "18 km/h",
     "as": "১৮ কিমি/ঘণ্টা"
    },
    {
     "en": "16 km/h",
     "as": "১৬ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    },
    {
     "en": "20 km/h",
     "as": "২০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "600/120 = 5 m/s = 18 km/h.",
    "as": "600/120 = 5 m/s = 18 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-013",
   "q": {
    "en": "A train 120 m long crosses a pole in 12 seconds. Its speed is —",
    "as": "120 মিটাৰ দীঘল ৰে'লে এটা খুঁটা 12 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "8 m/s",
     "as": "৮ m/s"
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
     "en": "15 m/s",
     "as": "১৫ m/s"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 120 / 12 = 10 m/s.",
    "as": "গতি = 120 / 12 = 10 m/s।"
   }
  },
  {
   "id": "time-speed-distance-014",
   "q": {
    "en": "A train 150 m long crosses a pole in 15 seconds. Its speed is —",
    "as": "150 মিটাৰ দীঘল ৰে'লে এটা খুঁটা 15 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "8 m/s",
     "as": "৮ m/s"
    },
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "12 m/s",
     "as": "১২ m/s"
    },
    {
     "en": "10 m/s",
     "as": "১০ m/s"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Speed = 150 / 15 = 10 m/s.",
    "as": "গতি = 150 / 15 = 10 m/s।"
   }
  },
  {
   "id": "time-speed-distance-015",
   "q": {
    "en": "A train 200 m long crosses a pole in 20 seconds. Its speed is —",
    "as": "200 মিটাৰ দীঘল ৰে'লে এটা খুঁটা 20 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "9 m/s",
     "as": "৯ m/s"
    },
    {
     "en": "10 m/s",
     "as": "১০ m/s"
    },
    {
     "en": "11 m/s",
     "as": "১১ m/s"
    },
    {
     "en": "12 m/s",
     "as": "১২ m/s"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 200 / 20 = 10 m/s.",
    "as": "গতি = 200 / 20 = 10 m/s।"
   }
  },
  {
   "id": "time-speed-distance-016",
   "q": {
    "en": "A train 300 m long crosses a platform 200 m long in 25 seconds. Its speed is —",
    "as": "300 মিটাৰ দীঘল ৰে'লে 200 মিটাৰ দীঘল প্লেটফৰ্ম 25 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    },
    {
     "en": "18 m/s",
     "as": "১৮ m/s"
    },
    {
     "en": "25 m/s",
     "as": "২৫ m/s"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Distance = 300 + 200 = 500 m, so speed = 500 / 25 = 20 m/s.",
    "as": "দূৰত্ব = 300 + 200 = 500 মিটাৰ, গতিকে গতি = 500 / 25 = 20 m/s।"
   }
  },
  {
   "id": "time-speed-distance-017",
   "q": {
    "en": "A train 250 m long crosses a bridge 150 m long in 20 seconds. Its speed is —",
    "as": "250 মিটাৰ দীঘল ৰে'লে 150 মিটাৰ দীঘল দলং 20 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "15 m/s",
     "as": "১৫ m/s"
    },
    {
     "en": "18 m/s",
     "as": "১৮ m/s"
    },
    {
     "en": "20 m/s",
     "as": "২০ m/s"
    },
    {
     "en": "22 m/s",
     "as": "২২ m/s"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Distance = 400 m, so speed = 400 / 20 = 20 m/s.",
    "as": "দূৰত্ব = 400 মিটাৰ, গতিকে গতি = 400 / 20 = 20 m/s।"
   }
  },
  {
   "id": "time-speed-distance-018",
   "q": {
    "en": "A train 180 m long running at 54 km/h crosses a pole in —",
    "as": "180 মিটাৰ দীঘল ৰে'ল 54 কিমি/ঘণ্টা বেগত চলি এটা খুঁটা অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "10 seconds",
     "as": "১০ ছেকেণ্ড"
    },
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "12 seconds",
     "as": "১২ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 15 m/s, so time = 180 / 15 = 12 seconds.",
    "as": "গতি = 15 m/s, গতিকে সময় = 180 / 15 = 12 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-019",
   "q": {
    "en": "A train 240 m long running at 72 km/h crosses a platform 160 m long in —",
    "as": "240 মিটাৰ দীঘল ৰে'ল 72 কিমি/ঘণ্টা বেগত চলি 160 মিটাৰ দীঘল প্লেটফৰ্ম অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    },
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "22 seconds",
     "as": "২২ ছেকেণ্ড"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Speed = 20 m/s and distance = 400 m, so time = 20 seconds.",
    "as": "গতি = 20 m/s আৰু দূৰত্ব = 400 মিটাৰ, গতিকে সময় = 20 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-020",
   "q": {
    "en": "Two trains move towards each other at 40 km/h and 50 km/h. Their relative speed is —",
    "as": "দুখন ৰে'ল পৰস্পৰৰ ফালে 40 কিমি/ঘণ্টা আৰু 50 কিমি/ঘণ্টা বেগত গৈ আছে। সিহঁতৰ আপেক্ষিক গতি —"
   },
   "options": [
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "90 km/h",
     "as": "৯০ কিমি/ঘণ্টা"
    },
    {
     "en": "200 km/h",
     "as": "২০০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "For opposite directions, relative speed is the sum: 90 km/h.",
    "as": "বিপৰীত দিশত আপেক্ষিক গতি যোগফল: 90 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-021",
   "q": {
    "en": "Two trains move in the same direction at 60 km/h and 45 km/h. Their relative speed is —",
    "as": "দুখন ৰে'ল একে দিশত 60 কিমি/ঘণ্টা আৰু 45 কিমি/ঘণ্টা বেগত গৈ আছে। সিহঁতৰ আপেক্ষিক গতি —"
   },
   "options": [
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "105 km/h",
     "as": "১০৫ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "For the same direction, relative speed is the difference: 15 km/h.",
    "as": "একে দিশত আপেক্ষিক গতি পাৰ্থক্য: 15 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-022",
   "q": {
    "en": "Two trains 100 m and 150 m long run towards each other at 20 m/s and 30 m/s. They cross each other in —",
    "as": "100 মিটাৰ আৰু 150 মিটাৰ দীঘল দুখন ৰে'ল পৰস্পৰৰ ফালে 20 m/s আৰু 30 m/s বেগত চলি পৰস্পৰক অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "5 seconds",
     "as": "৫ ছেকেণ্ড"
    },
    {
     "en": "4 seconds",
     "as": "৪ ছেকেণ্ড"
    },
    {
     "en": "6 seconds",
     "as": "৬ ছেকেণ্ড"
    },
    {
     "en": "10 seconds",
     "as": "১০ ছেকেণ্ড"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Relative speed = 50 m/s and distance = 250 m, so time = 5 seconds.",
    "as": "আপেক্ষিক গতি = 50 m/s আৰু দূৰত্ব = 250 মিটাৰ, গতিকে সময় = 5 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-023",
   "q": {
    "en": "A boat travels 24 km downstream in 3 hours and the same distance upstream in 4 hours. The speed of the stream is —",
    "as": "এখন নাওৱে 3 ঘণ্টাত 24 কিমি সোঁতেৰে আৰু 4 ঘণ্টাত একেই দূৰত্ব বিৰুদ্ধে যায়। সোঁতৰ গতি —"
   },
   "options": [
    {
     "en": "3 km/h",
     "as": "৩ কিমি/ঘণ্টা"
    },
    {
     "en": "1.5 km/h",
     "as": "১.৫ কিমি/ঘণ্টা"
    },
    {
     "en": "2 km/h",
     "as": "২ কিমি/ঘণ্টা"
    },
    {
     "en": "1 km/h",
     "as": "১ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Downstream 8 and upstream 6, so stream = (8 - 6)/2 = 1 km/h.",
    "as": "সোঁতেৰে 8 আৰু বিৰুদ্ধে 6, গতিকে সোঁত = (8 - 6)/2 = 1 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-024",
   "q": {
    "en": "A boat travels 30 km downstream in 2 hours and 30 km upstream in 3 hours. The speed of the boat in still water is —",
    "as": "এখন নাওৱে 2 ঘণ্টাত 30 কিমি সোঁতেৰে আৰু 3 ঘণ্টাত 30 কিমি বিৰুদ্ধে যায়। স্থিৰ পানীত নাওৱৰ গতি —"
   },
   "options": [
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    },
    {
     "en": "12.5 km/h",
     "as": "১২.৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Downstream 15 and upstream 10, so boat speed = (15 + 10)/2 = 12.5 km/h.",
    "as": "সোঁতেৰে 15 আৰু বিৰুদ্ধে 10, গতিকে নাওৱৰ গতি = (15 + 10)/2 = 12.5 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-025",
   "q": {
    "en": "The speed of a boat in still water is 10 km/h and the speed of the stream is 2 km/h. The downstream speed is —",
    "as": "স্থিৰ পানীত নাওৱৰ গতি 10 কিমি/ঘণ্টা আৰু সোঁতৰ গতি 2 কিমি/ঘণ্টা। সোঁতেৰে গতি —"
   },
   "options": [
    {
     "en": "8 km/h",
     "as": "৮ কিমি/ঘণ্টা"
    },
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    },
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "20 km/h",
     "as": "২০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Downstream = 10 + 2 = 12 km/h.",
    "as": "সোঁতেৰে = 10 + 2 = 12 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-026",
   "q": {
    "en": "The speed of a boat in still water is 12 km/h and the speed of the stream is 3 km/h. The upstream speed is —",
    "as": "স্থিৰ পানীত নাওৱৰ গতি 12 কিমি/ঘণ্টা আৰু সোঁতৰ গতি 3 কিমি/ঘণ্টা। বিৰুদ্ধে গতি —"
   },
   "options": [
    {
     "en": "8 km/h",
     "as": "৮ কিমি/ঘণ্টা"
    },
    {
     "en": "9 km/h",
     "as": "৯ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    },
    {
     "en": "36 km/h",
     "as": "৩৬ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Upstream = 12 - 3 = 9 km/h.",
    "as": "বিৰুদ্ধে = 12 - 3 = 9 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-027",
   "q": {
    "en": "A man covers 60 km at 30 km/h and returns at 20 km/h. His average speed for the whole journey is —",
    "as": "এজন মানুহে 30 কিমি/ঘণ্টাত 60 কিমি গৈ 20 কিমি/ঘণ্টাত ঘূৰি আহে। গোটেই যাত্ৰাৰ গড় গতি —"
   },
   "options": [
    {
     "en": "22 km/h",
     "as": "২২ কিমি/ঘণ্টা"
    },
    {
     "en": "24 km/h",
     "as": "২৪ কিমি/ঘণ্টা"
    },
    {
     "en": "25 km/h",
     "as": "২৫ কিমি/ঘণ্টা"
    },
    {
     "en": "26 km/h",
     "as": "২৬ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Average speed = 2 x 30 x 20 / 50 = 24 km/h.",
    "as": "গড় গতি = 2 x 30 x 20 / 50 = 24 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-028",
   "q": {
    "en": "A man covers the first half of a journey at 40 km/h and the second half at 60 km/h. His average speed is —",
    "as": "এজন মানুহে যাত্ৰাৰ প্ৰথম আধা 40 কিমি/ঘণ্টাত আৰু দ্বিতীয় আধা 60 কিমি/ঘণ্টাত যায়। তেওঁৰ গড় গতি —"
   },
   "options": [
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "52 km/h",
     "as": "৫২ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "48 km/h",
     "as": "৪৮ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Average speed = 2 x 40 x 60 / 100 = 48 km/h.",
    "as": "গড় গতি = 2 x 40 x 60 / 100 = 48 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-029",
   "q": {
    "en": "A car travels 100 km in 2 hours and the next 150 km in 3 hours. Its average speed is —",
    "as": "এখন গাড়ী 2 ঘণ্টাত 100 কিমি আৰু পৰৱৰ্তী 3 ঘণ্টাত 150 কিমি যায়। ইয়াৰ গড় গতি —"
   },
   "options": [
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Average speed = 250 / 5 = 50 km/h.",
    "as": "গড় গতি = 250 / 5 = 50 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-030",
   "q": {
    "en": "A man walks at 5 km/h and covers 15 km. The time taken is —",
    "as": "এজন মানুহে 5 কিমি/ঘণ্টা বেগত খোজ কাঢ়ি 15 কিমি অতিক্ৰম কৰে। লগা সময় —"
   },
   "options": [
    {
     "en": "3 hours",
     "as": "৩ ঘণ্টা"
    },
    {
     "en": "2.5 hours",
     "as": "২.৫ ঘণ্টা"
    },
    {
     "en": "2 hours",
     "as": "২ ঘণ্টা"
    },
    {
     "en": "3.5 hours",
     "as": "৩.৫ ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Time = 15 / 5 = 3 hours.",
    "as": "সময় = 15 / 5 = 3 ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-031",
   "q": {
    "en": "A train running at 90 km/h covers a distance in 4 hours. The distance is —",
    "as": "90 কিমি/ঘণ্টা বেগত চলা ৰে'লে 4 ঘণ্টাত অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "360 km",
     "as": "৩৬০ কিমি"
    },
    {
     "en": "320 km",
     "as": "৩২০ কিমি"
    },
    {
     "en": "300 km",
     "as": "৩০০ কিমি"
    },
    {
     "en": "400 km",
     "as": "৪০০ কিমি"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Distance = 90 x 4 = 360 km.",
    "as": "দূৰত্ব = 90 x 4 = 360 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-032",
   "q": {
    "en": "A cyclist covers 45 km in 3 hours. His speed is —",
    "as": "এজন চাইকেল চলোৱাই 3 ঘণ্টাত 45 কিমি অতিক্ৰম কৰে। তেওঁৰ গতি —"
   },
   "options": [
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    },
    {
     "en": "18 km/h",
     "as": "১৮ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    },
    {
     "en": "20 km/h",
     "as": "২০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 45 / 3 = 15 km/h.",
    "as": "গতি = 45 / 3 = 15 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-033",
   "q": {
    "en": "A man running at 8 m/s covers 400 m in —",
    "as": "8 m/s বেগত দৌৰা এজনে 400 মিটাৰ অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "40 seconds",
     "as": "৪০ ছেকেণ্ড"
    },
    {
     "en": "45 seconds",
     "as": "৪৫ ছেকেণ্ড"
    },
    {
     "en": "50 seconds",
     "as": "৫০ ছেকেণ্ড"
    },
    {
     "en": "55 seconds",
     "as": "৫৫ ছেকেণ্ড"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Time = 400 / 8 = 50 seconds.",
    "as": "সময় = 400 / 8 = 50 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-034",
   "q": {
    "en": "A train 150 m long running at 90 km/h crosses a platform 300 m long in —",
    "as": "150 মিটাৰ দীঘল ৰে'ল 90 কিমি/ঘণ্টা বেগত চলি 300 মিটাৰ দীঘল প্লেটফৰ্ম অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    },
    {
     "en": "22 seconds",
     "as": "২২ ছেকেণ্ড"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 25 m/s and distance = 450 m, so time = 18 seconds.",
    "as": "গতি = 25 m/s আৰু দূৰত্ব = 450 মিটাৰ, গতিকে সময় = 18 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-035",
   "q": {
    "en": "Two cars start from the same point in opposite directions at 50 km/h and 60 km/h. After 2 hours the distance between them is —",
    "as": "দুখন গাড়ী একে বিন্দুৰ পৰা বিপৰীত দিশত 50 কিমি/ঘণ্টা আৰু 60 কিমি/ঘণ্টা বেগত আৰম্ভ কৰে। 2 ঘণ্টাৰ পিছত সিহঁতৰ মাজৰ দূৰত্ব —"
   },
   "options": [
    {
     "en": "200 km",
     "as": "২০০ কিমি"
    },
    {
     "en": "220 km",
     "as": "২২০ কিমি"
    },
    {
     "en": "210 km",
     "as": "২১০ কিমি"
    },
    {
     "en": "240 km",
     "as": "২৪০ কিমি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Relative speed = 110 km/h, so 2 x 110 = 220 km.",
    "as": "আপেক্ষিক গতি = 110 কিমি/ঘণ্টা, গতিকে 2 x 110 = 220 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-036",
   "q": {
    "en": "A train 200 m long crosses a man walking at 4 km/h in the same direction at 40 km/h in —",
    "as": "200 মিটাৰ দীঘল ৰে'ল একে দিশত 4 কিমি/ঘণ্টা বেগত খোজ কাঢ়ি যোৱা এজনক 40 কিমি/ঘণ্টা বেগত অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    },
    {
     "en": "25 seconds",
     "as": "২৫ ছেকেণ্ড"
    },
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Relative speed = 36 km/h = 10 m/s, so time = 200 / 10 = 20 seconds.",
    "as": "আপেক্ষিক গতি = 36 কিমি/ঘণ্টা = 10 m/s, গতিকে সময় = 200 / 10 = 20 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-037",
   "q": {
    "en": "A man covers a certain distance at 20 km/h and returns at 30 km/h. If the total time is 5 hours, the distance one way is —",
    "as": "এজন মানুহে এটা দূৰত্ব 20 কিমি/ঘণ্টাত গৈ 30 কিমি/ঘণ্টাত ঘূৰি আহে। মুঠ সময় 5 ঘণ্টা হ'লে একমুখী দূৰত্ব —"
   },
   "options": [
    {
     "en": "50 km",
     "as": "৫০ কিমি"
    },
    {
     "en": "55 km",
     "as": "৫৫ কিমি"
    },
    {
     "en": "65 km",
     "as": "৬৫ কিমি"
    },
    {
     "en": "60 km",
     "as": "৬০ কিমি"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "d/20 + d/30 = 5, so d = 60 km.",
    "as": "d/20 + d/30 = 5, গতিকে d = 60 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-038",
   "q": {
    "en": "A car covers 180 km in 2.5 hours. Its speed is —",
    "as": "এখন গাড়ীয়ে 2.5 ঘণ্টাত 180 কিমি অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "66 km/h",
     "as": "৬৬ কিমি/ঘণ্টা"
    },
    {
     "en": "70 km/h",
     "as": "৭০ কিমি/ঘণ্টা"
    },
    {
     "en": "72 km/h",
     "as": "৭২ কিমি/ঘণ্টা"
    },
    {
     "en": "75 km/h",
     "as": "৭৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 180 / 2.5 = 72 km/h.",
    "as": "গতি = 180 / 2.5 = 72 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-039",
   "q": {
    "en": "A train travels at 60 km/h and covers 15 km in —",
    "as": "এখন ৰে'ল 60 কিমি/ঘণ্টা বেগত চলি 15 কিমি অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "10 minutes",
     "as": "১০ মিনিট"
    },
    {
     "en": "15 minutes",
     "as": "১৫ মিনিট"
    },
    {
     "en": "12 minutes",
     "as": "১২ মিনিট"
    },
    {
     "en": "20 minutes",
     "as": "২০ মিনিট"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Time = 15 / 60 = 0.25 hours = 15 minutes.",
    "as": "সময় = 15 / 60 = 0.25 ঘণ্টা = 15 মিনিট।"
   }
  },
  {
   "id": "time-speed-distance-040",
   "q": {
    "en": "A man covers 1 km in 5 minutes. His speed in km/h is —",
    "as": "এজন মানুহে 5 মিনিটত 1 কিমি অতিক্ৰম কৰে। তেওঁৰ কিমি/ঘণ্টাত গতি —"
   },
   "options": [
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    },
    {
     "en": "11 km/h",
     "as": "১১ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "5 minutes for 1 km means 12 km in 60 minutes.",
    "as": "1 কিমিৰ বাবে 5 মিনিট মানে 60 মিনিটত 12 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-041",
   "q": {
    "en": "A bus covers 90 km in 1 hour 30 minutes. Its speed is —",
    "as": "এখন বাছে 1 ঘণ্টা 30 মিনিটত 90 কিমি অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "65 km/h",
     "as": "৬৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1.5 hours for 90 km gives 60 km/h.",
    "as": "90 কিমিৰ বাবে 1.5 ঘণ্টা মানে 60 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-042",
   "q": {
    "en": "A train 100 m long crosses a bridge 400 m long at 25 m/s in —",
    "as": "100 মিটাৰ দীঘল ৰে'ল 25 m/s বেগত 400 মিটাৰ দীঘল দলং অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    },
    {
     "en": "25 seconds",
     "as": "২৫ ছেকেণ্ড"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Distance = 500 m, so time = 500 / 25 = 20 seconds.",
    "as": "দূৰত্ব = 500 মিটাৰ, গতিকে সময় = 500 / 25 = 20 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-043",
   "q": {
    "en": "A boat covers 18 km downstream in 3 hours. If the stream flows at 1 km/h, the boat speed in still water is —",
    "as": "এখন নাওৱে 3 ঘণ্টাত 18 কিমি সোঁতেৰে যায়। সোঁতৰ গতি 1 কিমি/ঘণ্টা হ'লে স্থিৰ পানীত নাওৱৰ গতি —"
   },
   "options": [
    {
     "en": "4 km/h",
     "as": "৪ কিমি/ঘণ্টা"
    },
    {
     "en": "7 km/h",
     "as": "৭ কিমি/ঘণ্টা"
    },
    {
     "en": "6 km/h",
     "as": "৬ কিমি/ঘণ্টা"
    },
    {
     "en": "5 km/h",
     "as": "৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Downstream = 6, so boat speed = 6 - 1 = 5 km/h.",
    "as": "সোঁতেৰে = 6, গতিকে নাওৱৰ গতি = 6 - 1 = 5 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-044",
   "q": {
    "en": "A man covers 3 km in 30 minutes. His speed in m/s is —",
    "as": "এজন মানুহে 30 মিনিটত 3 কিমি অতিক্ৰম কৰে। তেওঁৰ m/s ত গতি —"
   },
   "options": [
    {
     "en": "1.5 m/s",
     "as": "১.৫ m/s"
    },
    {
     "en": "3 m/s",
     "as": "৩ m/s"
    },
    {
     "en": "2 m/s",
     "as": "২ m/s"
    },
    {
     "en": "1.67 m/s",
     "as": "১.৬৭ m/s"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3000 / 1800 = 1.67 m/s.",
    "as": "3000 / 1800 = 1.67 m/s।"
   }
  },
  {
   "id": "time-speed-distance-045",
   "q": {
    "en": "Two trains of equal length 120 m each run towards each other at 15 m/s and 25 m/s. They cross each other in —",
    "as": "120 মিটাৰ দীঘল দুখন ৰে'ল পৰস্পৰৰ ফালে 15 m/s আৰু 25 m/s বেগত চলি পৰস্পৰক অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "6 seconds",
     "as": "৬ ছেকেণ্ড"
    },
    {
     "en": "5 seconds",
     "as": "৫ ছেকেণ্ড"
    },
    {
     "en": "4 seconds",
     "as": "৪ ছেকেণ্ড"
    },
    {
     "en": "8 seconds",
     "as": "৮ ছেকেণ্ড"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Relative speed = 40 m/s and distance = 240 m, so time = 6 seconds.",
    "as": "আপেক্ষিক গতি = 40 m/s আৰু দূৰত্ব = 240 মিটাৰ, গতিকে সময় = 6 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-046",
   "q": {
    "en": "A car covers 45 km in 45 minutes. Its speed is —",
    "as": "এখন গাড়ীয়ে 45 মিনিটত 45 কিমি অতিক্ৰম কৰে। ইয়াৰ গতি —"
   },
   "options": [
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "45 km in 45 minutes means 60 km in 60 minutes.",
    "as": "45 মিনিটত 45 কিমি মানে 60 মিনিটত 60 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-047",
   "q": {
    "en": "A train 400 m long crosses a pole in 20 seconds. Its speed in km/h is —",
    "as": "400 মিটাৰ দীঘল ৰে'লে এটা খুঁটা 20 ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ কিমি/ঘণ্টাত গতি —"
   },
   "options": [
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "72 km/h",
     "as": "৭২ কিমি/ঘণ্টা"
    },
    {
     "en": "66 km/h",
     "as": "৬৬ কিমি/ঘণ্টা"
    },
    {
     "en": "80 km/h",
     "as": "৮০ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 20 m/s = 72 km/h.",
    "as": "গতি = 20 m/s = 72 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-048",
   "q": {
    "en": "A man travels 600 km partly by train at 80 km/h and partly by car at 40 km/h. If the total time is 10 hours, the distance by train is —",
    "as": "এজন মানুহে 600 কিমিৰ অংশ 80 কিমি/ঘণ্টা বেগত ৰে'লেৰে আৰু অংশ 40 কিমি/ঘণ্টা বেগত গাড়ীৰে যায়। মুঠ সময় 10 ঘণ্টা হ'লে ৰে'লেৰে যোৱা দূৰত্ব —"
   },
   "options": [
    {
     "en": "300 km",
     "as": "৩০০ কিমি"
    },
    {
     "en": "320 km",
     "as": "৩২০ কিমি"
    },
    {
     "en": "480 km",
     "as": "৪৮০ কিমি"
    },
    {
     "en": "400 km",
     "as": "৪০০ কিমি"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Solving t/80 + (600-t)/40 = 10 gives t = 400 km.",
    "as": "t/80 + (600-t)/40 = 10 সমাধান কৰিলে t = 400 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-049",
   "q": {
    "en": "A man covers 24 km in 3 hours and the next 36 km in 3 hours. His average speed is —",
    "as": "এজন মানুহে 3 ঘণ্টাত 24 কিমি আৰু পৰৱৰ্তী 3 ঘণ্টাত 36 কিমি অতিক্ৰম কৰে। তেওঁৰ গড় গতি —"
   },
   "options": [
    {
     "en": "9 km/h",
     "as": "৯ কিমি/ঘণ্টা"
    },
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "11 km/h",
     "as": "১১ কিমি/ঘণ্টা"
    },
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Average speed = 60 / 6 = 10 km/h.",
    "as": "গড় গতি = 60 / 6 = 10 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-050",
   "q": {
    "en": "A train running at 36 km/h crosses a pole in 25 seconds. The length of the train is —",
    "as": "36 কিমি/ঘণ্টা বেগত চলা ৰে'লে এটা খুঁটা 25 ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লৰ দীঘ —"
   },
   "options": [
    {
     "en": "200 m",
     "as": "২০০ মিটাৰ"
    },
    {
     "en": "225 m",
     "as": "২২৫ মিটাৰ"
    },
    {
     "en": "275 m",
     "as": "২৭৫ মিটাৰ"
    },
    {
     "en": "250 m",
     "as": "২৫০ মিটাৰ"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Speed = 10 m/s, so length = 10 x 25 = 250 m.",
    "as": "গতি = 10 m/s, গতিকে দীঘ = 10 x 25 = 250 মিটাৰ।"
   }
  },
  {
   "id": "time-speed-distance-051",
   "q": {
    "en": "A man walks at 6 km/h for 2 hours and then at 4 km/h for 3 hours. The total distance covered is —",
    "as": "এজন মানুহে 6 কিমি/ঘণ্টা বেগত 2 ঘণ্টা আৰু তাৰপিছত 4 কিমি/ঘণ্টা বেগত 3 ঘণ্টা খোজ কাঢ়ে। মুঠ অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "20 km",
     "as": "২০ কিমি"
    },
    {
     "en": "22 km",
     "as": "২২ কিমি"
    },
    {
     "en": "24 km",
     "as": "২৪ কিমি"
    },
    {
     "en": "26 km",
     "as": "২৬ কিমি"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "12 + 12 = 24 km.",
    "as": "12 + 12 = 24 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-052",
   "q": {
    "en": "A train 180 m long crosses another train 120 m long running in the opposite direction at 54 km/h and 36 km/h. They cross each other in —",
    "as": "180 মিটাৰ দীঘল ৰে'ল 120 মিটাৰ দীঘল আন এখন ৰে'ল বিপৰীত দিশত 54 কিমি/ঘণ্টা আৰু 36 কিমি/ঘণ্টা বেগত চলি অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "12 seconds",
     "as": "১২ ছেকেণ্ড"
    },
    {
     "en": "10 seconds",
     "as": "১০ ছেকেণ্ড"
    },
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    },
    {
     "en": "18 seconds",
     "as": "১৮ ছেকেণ্ড"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Relative speed = 90 km/h = 25 m/s and distance = 300 m, so time = 12 seconds.",
    "as": "আপেক্ষিক গতি = 90 কিমি/ঘণ্টা = 25 m/s আৰু দূৰত্ব = 300 মিটাৰ, গতিকে সময় = 12 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-053",
   "q": {
    "en": "A man covers a distance of 120 km at 40 km/h. If he increases his speed by 20 km/h, the time saved is —",
    "as": "এজন মানুহে 120 কিমি 40 কিমি/ঘণ্টা বেগত অতিক্ৰম কৰে। গতি 20 কিমি/ঘণ্টা বঢ়ালে ৰাহি হোৱা সময় —"
   },
   "options": [
    {
     "en": "1 hour",
     "as": "১ ঘণ্টা"
    },
    {
     "en": "45 minutes",
     "as": "৪৫ মিনিট"
    },
    {
     "en": "30 minutes",
     "as": "৩০ মিনিট"
    },
    {
     "en": "1.5 hours",
     "as": "১.৫ ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Old time 3 hours and new time 2 hours, so 1 hour is saved.",
    "as": "পুৰণি সময় 3 ঘণ্টা আৰু নতুন সময় 2 ঘণ্টা, গতিকে 1 ঘণ্টা ৰাহি হয়।"
   }
  },
  {
   "id": "time-speed-distance-054",
   "q": {
    "en": "A speed of 45 km/h expressed in m/s is —",
    "as": "45 কিমি/ঘণ্টা বেগক m/s ত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "12.5 m/s",
     "as": "১২.৫ m/s"
    },
    {
     "en": "11 m/s",
     "as": "১১ m/s"
    },
    {
     "en": "10 m/s",
     "as": "১০ m/s"
    },
    {
     "en": "13.5 m/s",
     "as": "১৩.৫ m/s"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "45 x 5/18 = 12.5 m/s.",
    "as": "45 x 5/18 = 12.5 m/s।"
   }
  },
  {
   "id": "time-speed-distance-055",
   "q": {
    "en": "A man covers 2 km in 10 minutes. His speed in km/h is —",
    "as": "এজন মানুহে 10 মিনিটত 2 কিমি অতিক্ৰম কৰে। তেওঁৰ কিমি/ঘণ্টাত গতি —"
   },
   "options": [
    {
     "en": "10 km/h",
     "as": "১০ কিমি/ঘণ্টা"
    },
    {
     "en": "11 km/h",
     "as": "১১ কিমি/ঘণ্টা"
    },
    {
     "en": "15 km/h",
     "as": "১৫ কিমি/ঘণ্টা"
    },
    {
     "en": "12 km/h",
     "as": "১২ কিমি/ঘণ্টা"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "2 km in 10 minutes means 12 km in 60 minutes.",
    "as": "10 মিনিটত 2 কিমি মানে 60 মিনিটত 12 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-056",
   "q": {
    "en": "A train travels the first 100 km at 50 km/h and the next 100 km at 25 km/h. Its average speed is —",
    "as": "এখন ৰে'ল প্ৰথম 100 কিমি 50 কিমি/ঘণ্টা বেগত আৰু পৰৱৰ্তী 100 কিমি 25 কিমি/ঘণ্টা বেগত যায়। ইয়াৰ গড় গতি —"
   },
   "options": [
    {
     "en": "30 km/h",
     "as": "৩০ কিমি/ঘণ্টা"
    },
    {
     "en": "35 km/h",
     "as": "৩৫ কিমি/ঘণ্টা"
    },
    {
     "en": "33.33 km/h",
     "as": "৩৩.৩৩ কিমি/ঘণ্টা"
    },
    {
     "en": "37.5 km/h",
     "as": "৩৭.৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Average speed = 2 x 50 x 25 / 75 = 33.33 km/h.",
    "as": "গড় গতি = 2 x 50 x 25 / 75 = 33.33 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-057",
   "q": {
    "en": "A car covers 210 km in 3 hours. The distance it covers in 5 hours at the same speed is —",
    "as": "এখন গাড়ীয়ে 3 ঘণ্টাত 210 কিমি অতিক্ৰম কৰে। একেই গতিত 5 ঘণ্টাত অতিক্ৰম কৰা দূৰত্ব —"
   },
   "options": [
    {
     "en": "300 km",
     "as": "৩০০ কিমি"
    },
    {
     "en": "350 km",
     "as": "৩৫০ কিমি"
    },
    {
     "en": "320 km",
     "as": "৩২০ কিমি"
    },
    {
     "en": "400 km",
     "as": "৪০০ কিমি"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 70 km/h, so 5 x 70 = 350 km.",
    "as": "গতি = 70 কিমি/ঘণ্টা, গতিকে 5 x 70 = 350 কিমি।"
   }
  },
  {
   "id": "time-speed-distance-058",
   "q": {
    "en": "A man travels 90 km in 2 hours 15 minutes. His speed is —",
    "as": "এজন মানুহে 2 ঘণ্টা 15 মিনিটত 90 কিমি অতিক্ৰম কৰে। তেওঁৰ গতি —"
   },
   "options": [
    {
     "en": "36 km/h",
     "as": "৩৬ কিমি/ঘণ্টা"
    },
    {
     "en": "38 km/h",
     "as": "৩৮ কিমি/ঘণ্টা"
    },
    {
     "en": "40 km/h",
     "as": "৪০ কিমি/ঘণ্টা"
    },
    {
     "en": "45 km/h",
     "as": "৪৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "2.25 hours for 90 km gives 40 km/h.",
    "as": "90 কিমিৰ বাবে 2.25 ঘণ্টা মানে 40 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-059",
   "q": {
    "en": "A train 200 m long running at 72 km/h crosses a man standing on a platform in —",
    "as": "200 মিটাৰ দীঘল ৰে'ল 72 কিমি/ঘণ্টা বেগত চলি প্লেটফৰ্মত থিয় হৈ থকা এজনক অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "8 seconds",
     "as": "৮ ছেকেণ্ড"
    },
    {
     "en": "12 seconds",
     "as": "১২ ছেকেণ্ড"
    },
    {
     "en": "10 seconds",
     "as": "১০ ছেকেণ্ড"
    },
    {
     "en": "15 seconds",
     "as": "১৫ ছেকেণ্ড"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Speed = 20 m/s, so time = 200 / 20 = 10 seconds.",
    "as": "গতি = 20 m/s, গতিকে সময় = 200 / 20 = 10 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-060",
   "q": {
    "en": "A man covers 150 km in 2 hours 30 minutes. His speed is —",
    "as": "এজন মানুহে 2 ঘণ্টা 30 মিনিটত 150 কিমি অতিক্ৰম কৰে। তেওঁৰ গতি —"
   },
   "options": [
    {
     "en": "50 km/h",
     "as": "৫০ কিমি/ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কিমি/ঘণ্টা"
    },
    {
     "en": "55 km/h",
     "as": "৫৫ কিমি/ঘণ্টা"
    },
    {
     "en": "65 km/h",
     "as": "৬৫ কিমি/ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "2.5 hours for 150 km gives 60 km/h.",
    "as": "150 কিমিৰ বাবে 2.5 ঘণ্টা মানে 60 কিমি/ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-061",
   "q": {
    "en": "A train 120 m long running at 36 km/h crosses a bridge 180 m long in —",
    "as": "120 মিটাৰ দীঘল ৰে'ল 36 কিমি/ঘণ্টা বেগত চলি 180 মিটাৰ দীঘল দলং অতিক্ৰম কৰে —"
   },
   "options": [
    {
     "en": "20 seconds",
     "as": "২০ ছেকেণ্ড"
    },
    {
     "en": "30 seconds",
     "as": "৩০ ছেকেণ্ড"
    },
    {
     "en": "25 seconds",
     "as": "২৫ ছেকেণ্ড"
    },
    {
     "en": "36 seconds",
     "as": "৩৬ ছেকেণ্ড"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = 10 m/s and distance = 300 m, so time = 30 seconds.",
    "as": "গতি = 10 m/s আৰু দূৰত্ব = 300 মিটাৰ, গতিকে সময় = 30 ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-062",
   "q": {
    "en": "A boat travels 36 km downstream in 4 hours. If the boat speed in still water is 7 km/h, the stream speed is —",
    "as": "এখন নাওৱে 4 ঘণ্টাত 36 কিমি সোঁতেৰে যায়। স্থিৰ পানীত নাওৱৰ গতি 7 কিমি/ঘণ্টা হ'লে সোঁতৰ গতি —"
   },
   "options": [
    {
     "en": "2 km/h",
     "as": "২ কিমি/ঘণ্টা"
    },
    {
     "en": "1 km/h",
     "as": "১ কিমি/ঘণ্টা"
    },
    {
     "en": "3 km/h",
     "as": "৩ কিমি/ঘণ্টা"
    },
    {
     "en": "4 km/h",
     "as": "৪ কিমি/ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Downstream = 9, so stream = 9 - 7 = 2 km/h.",
    "as": "সোঁতেৰে = 9, গতিকে সোঁত = 9 - 7 = 2 কিমি/ঘণ্টা।"
   }
  }
 ],
 "time-work": [
  {
   "id": "time-work-001",
   "q": {
    "en": "A can do a work in 10 days. His one day's work is —",
    "as": "A এটা কাম 10 দিনত কৰিব পাৰে। তেওঁৰ এদিনৰ কাম —"
   },
   "options": [
    {
     "en": "1/5",
     "as": "১/৫"
    },
    {
     "en": "1/15",
     "as": "১/১৫"
    },
    {
     "en": "1/10",
     "as": "১/১০"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "One day's work is the reciprocal of the number of days: 1/10.",
    "as": "এদিনৰ কাম হৈছে দিনৰ সংখ্যাৰ প্ৰতিক্ৰম: 1/10।"
   }
  },
  {
   "id": "time-work-002",
   "q": {
    "en": "A can do a work in 12 days and B in 6 days. Working together, they finish it in —",
    "as": "A এটা কাম 12 দিনত আৰু B 6 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "3 days",
     "as": "৩ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/12 + 1/6 = 3/12 = 1/4, so 4 days.",
    "as": "1/12 + 1/6 = 3/12 = 1/4, গতিকে 4 দিন।"
   }
  },
  {
   "id": "time-work-003",
   "q": {
    "en": "A can do a work in 8 days and B in 12 days. Working together, they finish it in —",
    "as": "A এটা কাম 8 দিনত আৰু B 12 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "4.8 days",
     "as": "৪.৮ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "5.2 days",
     "as": "৫.২ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/8 + 1/12 = 5/24, so 24/5 = 4.8 days.",
    "as": "1/8 + 1/12 = 5/24, গতিকে 24/5 = 4.8 দিন।"
   }
  },
  {
   "id": "time-work-004",
   "q": {
    "en": "A can do a work in 15 days and B in 10 days. Working together, they finish it in —",
    "as": "A এটা কাম 15 দিনত আৰু B 10 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "7 days",
     "as": "৭ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/15 + 1/10 = 1/6, so 6 days.",
    "as": "1/15 + 1/10 = 1/6, গতিকে 6 দিন।"
   }
  },
  {
   "id": "time-work-005",
   "q": {
    "en": "A and B together can do a work in 6 days. A alone can do it in 10 days. B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 6 দিনত কৰিব পাৰে। A অকলে 10 দিনত কৰিব পাৰে। B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/6 - 1/10 = 1/15, so 15 days.",
    "as": "1/6 - 1/10 = 1/15, গতিকে 15 দিন।"
   }
  },
  {
   "id": "time-work-006",
   "q": {
    "en": "A and B together can do a work in 8 days. B alone can do it in 12 days. A alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 8 দিনত কৰিব পাৰে। B অকলে 12 দিনত কৰিব পাৰে। A অকলে কৰিব —"
   },
   "options": [
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    },
    {
     "en": "28 days",
     "as": "২৮ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/8 - 1/12 = 1/24, so 24 days.",
    "as": "1/8 - 1/12 = 1/24, গতিকে 24 দিন।"
   }
  },
  {
   "id": "time-work-007",
   "q": {
    "en": "A can do a work in 20 days, B in 30 days and C in 60 days. Working together, they finish it in —",
    "as": "A এটা কাম 20 দিনত, B 30 দিনত আৰু C 60 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "1/20 + 1/30 + 1/60 = 6/60 = 1/10, so 10 days.",
    "as": "1/20 + 1/30 + 1/60 = 6/60 = 1/10, গতিকে 10 দিন।"
   }
  },
  {
   "id": "time-work-008",
   "q": {
    "en": "A can do a work in 4 days, B in 6 days and C in 12 days. Working together, they finish it in —",
    "as": "A এটা কাম 4 দিনত, B 6 দিনত আৰু C 12 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "1 day",
     "as": "১ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "3 days",
     "as": "৩ দিন"
    },
    {
     "en": "2 days",
     "as": "২ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/4 + 1/6 + 1/12 = 6/12 = 1/2, so 2 days.",
    "as": "1/4 + 1/6 + 1/12 = 6/12 = 1/2, গতিকে 2 দিন।"
   }
  },
  {
   "id": "time-work-009",
   "q": {
    "en": "If A can do a work in 15 days, the work done by him in 5 days is —",
    "as": "A এটা কাম 15 দিনত কৰিব পাৰিলে 5 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/5",
     "as": "১/৫"
    },
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5 x 1/15 = 1/3.",
    "as": "5 x 1/15 = 1/3।"
   }
  },
  {
   "id": "time-work-010",
   "q": {
    "en": "A can do a work in 12 days. The work done by him in 8 days is —",
    "as": "A এটা কাম 12 দিনত কৰিব পাৰে। 8 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "8 x 1/12 = 2/3.",
    "as": "8 x 1/12 = 2/3।"
   }
  },
  {
   "id": "time-work-011",
   "q": {
    "en": "A does 1/4 of a work in 5 days. He can finish the whole work in —",
    "as": "A এটা কামৰ 1/4 5 দিনত কৰে। তেওঁ গোটেই কাম শেষ কৰিব —"
   },
   "options": [
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "25 days",
     "as": "২৫ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Whole work = 5 x 4 = 20 days.",
    "as": "গোটেই কাম = 5 x 4 = 20 দিন।"
   }
  },
  {
   "id": "time-work-012",
   "q": {
    "en": "A does 2/5 of a work in 8 days. He can finish the whole work in —",
    "as": "A এটা কামৰ 2/5 8 দিনত কৰে। তেওঁ গোটেই কাম শেষ কৰিব —"
   },
   "options": [
    {
     "en": "16 days",
     "as": "১৬ দিন"
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
     "en": "22 days",
     "as": "২২ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Whole work = 8 x 5/2 = 20 days.",
    "as": "গোটেই কাম = 8 x 5/2 = 20 দিন।"
   }
  },
  {
   "id": "time-work-013",
   "q": {
    "en": "If 5 men can do a work in 12 days, 10 men can do it in —",
    "as": "5 জন মানুহে এটা কাম 12 দিনত কৰিব পাৰিলে 10 জনে কৰিব —"
   },
   "options": [
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Inverse proportion: 5 x 12 = 10 x d, so d = 6 days.",
    "as": "প্ৰতিক্ৰম অনুপাত: 5 x 12 = 10 x d, গতিকে d = 6 দিন।"
   }
  },
  {
   "id": "time-work-014",
   "q": {
    "en": "If 8 men can do a work in 15 days, 12 men can do it in —",
    "as": "8 জন মানুহে এটা কাম 15 দিনত কৰিব পাৰিলে 12 জনে কৰিব —"
   },
   "options": [
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Inverse proportion: 8 x 15 = 12 x d, so d = 10 days.",
    "as": "প্ৰতিক্ৰম অনুপাত: 8 x 15 = 12 x d, গতিকে d = 10 দিন।"
   }
  },
  {
   "id": "time-work-015",
   "q": {
    "en": "If 15 workers can finish a job in 20 days, 25 workers can finish it in —",
    "as": "15 জন শ্ৰমিকে এটা কাম 20 দিনত শেষ কৰিব পাৰিলে 25 জনে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "10 days",
     "as": "১০ দিন"
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
     "en": "16 days",
     "as": "১৬ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Inverse proportion: 15 x 20 = 25 x d, so d = 12 days.",
    "as": "প্ৰতিক্ৰম অনুপাত: 15 x 20 = 25 x d, গতিকে d = 12 দিন।"
   }
  },
  {
   "id": "time-work-016",
   "q": {
    "en": "If 6 men can build a wall in 8 days, the number of men needed to build it in 4 days is —",
    "as": "6 জন মানুহে এটা দেৱাল 8 দিনত সাজিব পাৰিলে 4 দিনত সাজিবলৈ প্ৰয়োজনীয় মানুহ —"
   },
   "options": [
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
    },
    {
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Inverse proportion: 6 x 8 = m x 4, so m = 12.",
    "as": "প্ৰতিক্ৰম অনুপাত: 6 x 8 = m x 4, গতিকে m = 12।"
   }
  },
  {
   "id": "time-work-017",
   "q": {
    "en": "A can do a work in 10 days and B in 15 days. They work together for 3 days and then A leaves. B finishes the rest in —",
    "as": "A এটা কাম 10 দিনত আৰু B 15 দিনত কৰিব পাৰে। সিহঁতে 3 দিন একেলগে কাম কৰি A আঁতৰি যায়। B বাকী কাম শেষ কৰিব —"
   },
   "options": [
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "7.5 days",
     "as": "৭.৫ দিন"
    },
    {
     "en": "7 days",
     "as": "৭ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Together 3 days do 1/2, so B does 1/2 in 7.5 days.",
    "as": "একেলগে 3 দিনত 1/2 কৰে, গতিকে B এ 1/2 কাম 7.5 দিনত কৰে।"
   }
  },
  {
   "id": "time-work-018",
   "q": {
    "en": "A and B together can do a work in 12 days. A alone can do it in 20 days. B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 12 দিনত কৰিব পাৰে। A অকলে 20 দিনত কৰিব পাৰে। B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "28 days",
     "as": "২৮ দিন"
    },
    {
     "en": "36 days",
     "as": "৩৬ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/12 - 1/20 = 1/30, so 30 days.",
    "as": "1/12 - 1/20 = 1/30, গতিকে 30 দিন।"
   }
  },
  {
   "id": "time-work-019",
   "q": {
    "en": "A is twice as efficient as B. If A can do a work in 12 days, B can do it in —",
    "as": "A B তকৈ দুগুণ দক্ষ। A এটা কাম 12 দিনত কৰিব পাৰিলে B কৰিব —"
   },
   "options": [
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Half the efficiency means twice the time: 24 days.",
    "as": "আধা দক্ষতা মানে দুগুণ সময়: 24 দিন।"
   }
  },
  {
   "id": "time-work-020",
   "q": {
    "en": "A is thrice as efficient as B. If B can do a work in 30 days, A can do it in —",
    "as": "A B তকৈ তিনিগুণ দক্ষ। B এটা কাম 30 দিনত কৰিব পাৰিলে A কৰিব —"
   },
   "options": [
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Thrice the efficiency means one-third the time: 10 days.",
    "as": "তিনিগুণ দক্ষতা মানে এক-তৃতীয়াংশ সময়: 10 দিন।"
   }
  },
  {
   "id": "time-work-021",
   "q": {
    "en": "A and B together can do a work in 8 days. A is twice as efficient as B. A alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 8 দিনত কৰিব পাৰে। A B তকৈ দুগুণ দক্ষ। A অকলে কৰিব —"
   },
   "options": [
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "16 days",
     "as": "১৬ দিন"
    },
    {
     "en": "14 days",
     "as": "১৪ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A : B = 2 : 1 and together 1/8, so A alone takes 12 days.",
    "as": "A : B = 2 : 1 আৰু একেলগে 1/8, গতিকে A অকলে 12 দিন লয়।"
   }
  },
  {
   "id": "time-work-022",
   "q": {
    "en": "If 6 men and 8 women can do a work in 10 days and 1 man does the work of 2 women, then 10 men alone can do the work in —",
    "as": "6 জন পুৰুষ আৰু 8 জনী মহিলাই এটা কাম 10 দিনত কৰিব পাৰে আৰু 1 জন পুৰুষে 2 জনী মহিলাৰ কাম কৰে, তেন্তে 10 জন পুৰুষে অকলে কামটো কৰিব —"
   },
   "options": [
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
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "8 women = 4 men, so 6 men + 8 women = 10 men, who take 10 days. Hence 10 men take 10 days.",
    "as": "8 জনী মহিলা = 4 জন পুৰুষ, গতিকে 6 জন পুৰুষ + 8 জনী মহিলা = 10 জন পুৰুষ, যিয়ে 10 দিন লয়।"
   }
  },
  {
   "id": "time-work-023",
   "q": {
    "en": "A can do a work in 9 days and B in 18 days. Working together, they finish it in —",
    "as": "A এটা কাম 9 দিনত আৰু B 18 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
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
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "3 days",
     "as": "৩ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/9 + 1/18 = 1/6, so 6 days.",
    "as": "1/9 + 1/18 = 1/6, গতিকে 6 দিন।"
   }
  },
  {
   "id": "time-work-024",
   "q": {
    "en": "A can do a work in 24 days and B in 8 days. Working together, they finish it in —",
    "as": "A এটা কাম 24 দিনত আৰু B 8 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "7 days",
     "as": "৭ দিন"
    },
    {
     "en": "6 days",
     "as": "৬ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/24 + 1/8 = 4/24 = 1/6, so 6 days.",
    "as": "1/24 + 1/8 = 4/24 = 1/6, গতিকে 6 দিন।"
   }
  },
  {
   "id": "time-work-025",
   "q": {
    "en": "A pipe fills a tank in 6 hours and another in 12 hours. Together they fill it in —",
    "as": "এটা নলে এটা টেংকি 6 ঘণ্টাত আৰু আনটোৱে 12 ঘণ্টাত ভৰ্তি কৰে। একেলগে ভৰ্তি কৰিব —"
   },
   "options": [
    {
     "en": "4 hours",
     "as": "৪ ঘণ্টা"
    },
    {
     "en": "3 hours",
     "as": "৩ ঘণ্টা"
    },
    {
     "en": "5 hours",
     "as": "৫ ঘণ্টা"
    },
    {
     "en": "6 hours",
     "as": "৬ ঘণ্টা"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/6 + 1/12 = 1/4, so 4 hours.",
    "as": "1/6 + 1/12 = 1/4, গতিকে 4 ঘণ্টা।"
   }
  },
  {
   "id": "time-work-026",
   "q": {
    "en": "A pipe fills a tank in 10 hours and a leak empties it in 15 hours. With both open, the tank fills in —",
    "as": "এটা নলে এটা টেংকি 10 ঘণ্টাত ভৰ্তি কৰে আৰু এটা ফুটাই 15 ঘণ্টাত খালী কৰে। দুয়োটা খোলা থাকিলে টেংকি ভৰ্তি হ'ব —"
   },
   "options": [
    {
     "en": "20 hours",
     "as": "২০ ঘণ্টা"
    },
    {
     "en": "30 hours",
     "as": "৩০ ঘণ্টা"
    },
    {
     "en": "25 hours",
     "as": "২৫ ঘণ্টা"
    },
    {
     "en": "35 hours",
     "as": "৩৫ ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/10 - 1/15 = 1/30, so 30 hours.",
    "as": "1/10 - 1/15 = 1/30, গতিকে 30 ঘণ্টা।"
   }
  },
  {
   "id": "time-work-027",
   "q": {
    "en": "Two pipes fill a tank in 12 and 18 hours. Together they fill it in —",
    "as": "দুটা নলে এটা টেংকি 12 আৰু 18 ঘণ্টাত ভৰ্তি কৰে। একেলগে ভৰ্তি কৰিব —"
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
   "id": "time-work-028",
   "q": {
    "en": "A can do 1/3 of a work in 4 days. He can do the whole work in —",
    "as": "A এটা কামৰ 1/3 4 দিনত কৰিব পাৰে। তেওঁ গোটেই কাম কৰিব —"
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
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Whole work = 4 x 3 = 12 days.",
    "as": "গোটেই কাম = 4 x 3 = 12 দিন।"
   }
  },
  {
   "id": "time-work-029",
   "q": {
    "en": "If A and B together do a work in 6 days and A alone in 9 days, B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 6 দিনত আৰু A অকলে 9 দিনত কৰিলে B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/6 - 1/9 = 1/18, so 18 days.",
    "as": "1/6 - 1/9 = 1/18, গতিকে 18 দিন।"
   }
  },
  {
   "id": "time-work-030",
   "q": {
    "en": "A can do a work in 5 days, B in 10 days and C in 15 days. Working together, they finish it in —",
    "as": "A এটা কাম 5 দিনত, B 10 দিনত আৰু C 15 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "2 days",
     "as": "২ দিন"
    },
    {
     "en": "2 8/11 days",
     "as": "২ ৮/১১ দিন"
    },
    {
     "en": "3 days",
     "as": "৩ দিন"
    },
    {
     "en": "3 1/3 days",
     "as": "৩ ১/৩ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/5 + 1/10 + 1/15 = 11/30, so 30/11 = 2 8/11 days.",
    "as": "1/5 + 1/10 + 1/15 = 11/30, গতিকে 30/11 = 2 8/11 দিন।"
   }
  },
  {
   "id": "time-work-031",
   "q": {
    "en": "A works twice as fast as B. If together they finish a work in 4 days, B alone can do it in —",
    "as": "A B তকৈ দুগুণ বেগত কাম কৰে। একেলগে 4 দিনত কাম শেষ কৰিলে B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "9 days",
     "as": "৯ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "A : B = 2 : 1 and together 1/4, so B alone takes 12 days.",
    "as": "A : B = 2 : 1 আৰু একেলগে 1/4, গতিকে B অকলে 12 দিন লয়।"
   }
  },
  {
   "id": "time-work-032",
   "q": {
    "en": "If 20 men can do a work in 15 days, the number of men needed to finish it in 10 days is —",
    "as": "20 জন মানুহে এটা কাম 15 দিনত কৰিব পাৰিলে 10 দিনত শেষ কৰিবলৈ প্ৰয়োজনীয় মানুহ —"
   },
   "options": [
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "35",
     "as": "৩৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Inverse proportion: 20 x 15 = m x 10, so m = 30.",
    "as": "প্ৰতিক্ৰম অনুপাত: 20 x 15 = m x 10, গতিকে m = 30।"
   }
  },
  {
   "id": "time-work-033",
   "q": {
    "en": "A and B can do a work in 15 days and 10 days. They work together for 3 days. The fraction of work done is —",
    "as": "A আৰু B এটা কাম 15 আৰু 10 দিনত কৰিব পাৰে। সিহঁতে 3 দিন একেলগে কাম কৰিলে কৰা কামৰ ভগ্নাংশ —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3 x (1/15 + 1/10) = 3 x 1/6 = 1/2.",
    "as": "3 x (1/15 + 1/10) = 3 x 1/6 = 1/2।"
   }
  },
  {
   "id": "time-work-034",
   "q": {
    "en": "A can do a work in 20 days. He works for 5 days and leaves. The work remaining is —",
    "as": "A এটা কাম 20 দিনত কৰিব পাৰে। তেওঁ 5 দিন কাম কৰি আঁতৰি যায়। বাকী থকা কাম —"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
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
     "en": "4/5",
     "as": "৪/৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Work done = 5/20 = 1/4, so remaining = 3/4.",
    "as": "কৰা কাম = 5/20 = 1/4, গতিকে বাকী = 3/4।"
   }
  },
  {
   "id": "time-work-035",
   "q": {
    "en": "A and B together can do a work in 8 days. If A alone can do it in 24 days, the work done by B in 6 days is —",
    "as": "A আৰু B একেলগে এটা কাম 8 দিনত কৰিব পাৰে। A অকলে 24 দিনত কৰিব পাৰিলে B এ 6 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "B alone takes 12 days, so in 6 days B does 6/12 = 1/2.",
    "as": "B অকলে 12 দিন লয়, গতিকে 6 দিনত B এ 6/12 = 1/2 কৰে।"
   }
  },
  {
   "id": "time-work-036",
   "q": {
    "en": "If 12 men can do a work in 10 days, the work done by 12 men in 5 days is —",
    "as": "12 জন মানুহে এটা কাম 10 দিনত কৰিব পাৰিলে 12 জনে 5 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "5/10 = 1/2.",
    "as": "5/10 = 1/2।"
   }
  },
  {
   "id": "time-work-037",
   "q": {
    "en": "A and B together can do a work in 10 days. A alone in 15 days. B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 10 দিনত কৰিব পাৰে। A অকলে 15 দিনত কৰিব পাৰে। B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "35 days",
     "as": "৩৫ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/10 - 1/15 = 1/30, so 30 days.",
    "as": "1/10 - 1/15 = 1/30, গতিকে 30 দিন।"
   }
  },
  {
   "id": "time-work-038",
   "q": {
    "en": "A can do a work in 16 days and B in 24 days. Working together, they finish it in —",
    "as": "A এটা কাম 16 দিনত আৰু B 24 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "9.6 days",
     "as": "৯.৬ দিন"
    },
    {
     "en": "8 days",
     "as": "৮ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/16 + 1/24 = 5/48, so 48/5 = 9.6 days.",
    "as": "1/16 + 1/24 = 5/48, গতিকে 48/5 = 9.6 দিন।"
   }
  },
  {
   "id": "time-work-039",
   "q": {
    "en": "If A, B and C together can do a work in 6 days and A and B together in 10 days, C alone can do it in —",
    "as": "A, B আৰু C একেলগে এটা কাম 6 দিনত আৰু A আৰু B একেলগে 10 দিনত কৰিব পাৰিলে C অকলে কৰিব —"
   },
   "options": [
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/6 - 1/10 = 1/15, so 15 days.",
    "as": "1/6 - 1/10 = 1/15, গতিকে 15 দিন।"
   }
  },
  {
   "id": "time-work-040",
   "q": {
    "en": "A does half as much work as B in the same time. If B alone can do a work in 12 days, A alone can do it in —",
    "as": "A একেই সময়ত B তকৈ আধা কাম কৰে। B অকলে এটা কাম 12 দিনত কৰিব পাৰিলে A অকলে কৰিব —"
   },
   "options": [
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Half efficiency means double time: 24 days.",
    "as": "আধা দক্ষতা মানে দুগুণ সময়: 24 দিন।"
   }
  },
  {
   "id": "time-work-041",
   "q": {
    "en": "If 4 men or 6 women can do a work in 12 days, then 2 men and 3 women can do it in —",
    "as": "4 জন পুৰুষ বা 6 জনী মহিলাই এটা কাম 12 দিনত কৰিব পাৰিলে 2 জন পুৰুষ আৰু 3 জনী মহিলাই কৰিব —"
   },
   "options": [
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "14 days",
     "as": "১৪ দিন"
    },
    {
     "en": "16 days",
     "as": "১৬ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "2 men = 3 women, so 2 men + 3 women = 6 women, who take 12 days.",
    "as": "2 জন পুৰুষ = 3 জনী মহিলা, গতিকে 2 জন পুৰুষ + 3 জনী মহিলা = 6 জনী মহিলা, তেওঁলোকে 12 দিন লয়।"
   }
  },
  {
   "id": "time-work-042",
   "q": {
    "en": "A and B can do a work in 12 days, B and C in 15 days, and A and C in 20 days. Working together, they finish it in —",
    "as": "A আৰু B এটা কাম 12 দিনত, B আৰু C 15 দিনত আৰু A আৰু C 20 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
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
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Adding the pairs gives 2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5, so together they take 10 days.",
    "as": "যোৰবোৰ যোগ কৰিলে 2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5, গতিকে একেলগে 10 দিন লয়।"
   }
  },
  {
   "id": "time-work-043",
   "q": {
    "en": "A can do a work in 30 days. After working for 10 days he leaves. The remaining work is —",
    "as": "A এটা কাম 30 দিনত কৰিব পাৰে। 10 দিন কাম কৰি তেওঁ আঁতৰি যায়। বাকী থকা কাম —"
   },
   "options": [
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Work done = 10/30 = 1/3, so remaining = 2/3.",
    "as": "কৰা কাম = 10/30 = 1/3, গতিকে বাকী = 2/3।"
   }
  },
  {
   "id": "time-work-044",
   "q": {
    "en": "A pipe fills a tank in 20 minutes and another in 30 minutes. Together they fill it in —",
    "as": "এটা নলে এটা টেংকি 20 মিনিটত আৰু আনটোৱে 30 মিনিটত ভৰ্তি কৰে। একেলগে ভৰ্তি কৰিব —"
   },
   "options": [
    {
     "en": "10 minutes",
     "as": "১০ মিনিট"
    },
    {
     "en": "12 minutes",
     "as": "১২ মিনিট"
    },
    {
     "en": "15 minutes",
     "as": "১৫ মিনিট"
    },
    {
     "en": "18 minutes",
     "as": "১৮ মিনিট"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/20 + 1/30 = 1/12, so 12 minutes.",
    "as": "1/20 + 1/30 = 1/12, গতিকে 12 মিনিট।"
   }
  },
  {
   "id": "time-work-045",
   "q": {
    "en": "Two pipes fill a tank in 15 and 20 hours while a third empties it in 30 hours. With all open, the tank fills in —",
    "as": "দুটা নলে এটা টেংকি 15 আৰু 20 ঘণ্টাত ভৰ্তি কৰে আৰু তৃতীয়টোৱে 30 ঘণ্টাত খালী কৰে। তিনিওটা খোলা থাকিলে টেংকি ভৰ্তি হ'ব —"
   },
   "options": [
    {
     "en": "10 hours",
     "as": "১০ ঘণ্টা"
    },
    {
     "en": "12 hours",
     "as": "১২ ঘণ্টা"
    },
    {
     "en": "15 hours",
     "as": "১৫ ঘণ্টা"
    },
    {
     "en": "20 hours",
     "as": "২০ ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/15 + 1/20 - 1/30 = 5/60 = 1/12, so 12 hours.",
    "as": "1/15 + 1/20 - 1/30 = 5/60 = 1/12, গতিকে 12 ঘণ্টা।"
   }
  },
  {
   "id": "time-work-046",
   "q": {
    "en": "A and B can do a work in 8 days. A alone in 12 days. They work together for 4 days; the work remaining is —",
    "as": "A আৰু B এটা কাম 8 দিনত কৰিব পাৰে। A অকলে 12 দিনত কৰিব পাৰে। সিহঁতে 4 দিন একেলগে কাম কৰিলে বাকী থকা কাম —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "In 4 days they do 4/8 = 1/2, so 1/2 remains.",
    "as": "4 দিনত সিহঁতে 4/8 = 1/2 কৰে, গতিকে 1/2 বাকী থাকে।"
   }
  },
  {
   "id": "time-work-047",
   "q": {
    "en": "If 25 men can do a work in 30 days, the work done by them in 12 days is —",
    "as": "25 জন মানুহে এটা কাম 30 দিনত কৰিব পাৰিলে 12 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "2/5",
     "as": "২/৫"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "3/5",
     "as": "৩/৫"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "12/30 = 2/5.",
    "as": "12/30 = 2/5।"
   }
  },
  {
   "id": "time-work-048",
   "q": {
    "en": "A can do a work in 18 days and B in 9 days. Working together, they finish it in —",
    "as": "A এটা কাম 18 দিনত আৰু B 9 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "6 days",
     "as": "৬ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "7 days",
     "as": "৭ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/18 + 1/9 = 3/18 = 1/6, so 6 days.",
    "as": "1/18 + 1/9 = 3/18 = 1/6, গতিকে 6 দিন।"
   }
  },
  {
   "id": "time-work-049",
   "q": {
    "en": "A is 25% more efficient than B. If B can do a work in 25 days, A can do it in —",
    "as": "A B তকৈ 25% বেছি দক্ষ। B এটা কাম 25 দিনত কৰিব পাৰিলে A কৰিব —"
   },
   "options": [
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "22 days",
     "as": "২২ দিন"
    },
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "A does 5/4 of B's work, so A takes 25 x 4/5 = 20 days.",
    "as": "A এ B ৰ 5/4 কাম কৰে, গতিকে A এ 25 x 4/5 = 20 দিন লয়।"
   }
  },
  {
   "id": "time-work-050",
   "q": {
    "en": "A and B together can do a work in 4 days. If A alone can do it in 6 days, B alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 4 দিনত কৰিব পাৰে। A অকলে 6 দিনত কৰিব পাৰিলে B অকলে কৰিব —"
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
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "14 days",
     "as": "১৪ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "1/4 - 1/6 = 1/12, so 12 days.",
    "as": "1/4 - 1/6 = 1/12, গতিকে 12 দিন।"
   }
  },
  {
   "id": "time-work-051",
   "q": {
    "en": "A can do a work in 7 days and B in 14 days. Working together, they finish it in —",
    "as": "A এটা কাম 7 দিনত আৰু B 14 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "3 days",
     "as": "৩ দিন"
    },
    {
     "en": "4 days",
     "as": "৪ দিন"
    },
    {
     "en": "5 days",
     "as": "৫ দিন"
    },
    {
     "en": "4 2/3 days",
     "as": "৪ ২/৩ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/7 + 1/14 = 3/14, so 14/3 = 4 2/3 days.",
    "as": "1/7 + 1/14 = 3/14, গতিকে 14/3 = 4 2/3 দিন।"
   }
  },
  {
   "id": "time-work-052",
   "q": {
    "en": "If 9 men can do a work in 8 days, the number of men needed to do it in 6 days is —",
    "as": "9 জন মানুহে এটা কাম 8 দিনত কৰিব পাৰিলে 6 দিনত কৰিবলৈ প্ৰয়োজনীয় মানুহ —"
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
     "en": "14",
     "as": "১৪"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "Inverse proportion: 9 x 8 = m x 6, so m = 12.",
    "as": "প্ৰতিক্ৰম অনুপাত: 9 x 8 = m x 6, গতিকে m = 12।"
   }
  },
  {
   "id": "time-work-053",
   "q": {
    "en": "A does a work in 24 days. The work done in 18 days is —",
    "as": "A এটা কাম 24 দিনত কৰে। 18 দিনত কৰা কাম —"
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
     "en": "5/8",
     "as": "৫/৮"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "18/24 = 3/4.",
    "as": "18/24 = 3/4।"
   }
  },
  {
   "id": "time-work-054",
   "q": {
    "en": "A and B can do a work in 9 days and A alone in 18 days. B alone can do it in —",
    "as": "A আৰু B এটা কাম 9 দিনত আৰু A অকলে 18 দিনত কৰিব পাৰে। B অকলে কৰিব —"
   },
   "options": [
    {
     "en": "18 days",
     "as": "১৮ দিন"
    },
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "21 days",
     "as": "২১ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "1/9 - 1/18 = 1/18, so 18 days.",
    "as": "1/9 - 1/18 = 1/18, গতিকে 18 দিন।"
   }
  },
  {
   "id": "time-work-055",
   "q": {
    "en": "A can do a work in 40 days and B in 60 days. Working together, they finish it in —",
    "as": "A এটা কাম 40 দিনত আৰু B 60 দিনত কৰিব পাৰে। একেলগে কাম কৰিলে শেষ কৰিব —"
   },
   "options": [
    {
     "en": "20 days",
     "as": "২০ দিন"
    },
    {
     "en": "30 days",
     "as": "৩০ দিন"
    },
    {
     "en": "25 days",
     "as": "২৫ দিন"
    },
    {
     "en": "24 days",
     "as": "২৪ দিন"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "1/40 + 1/60 = 5/120 = 1/24, so 24 days.",
    "as": "1/40 + 1/60 = 5/120 = 1/24, গতিকে 24 দিন।"
   }
  },
  {
   "id": "time-work-056",
   "q": {
    "en": "A can complete 1/5 of a work in 3 days. He can complete the whole work in —",
    "as": "A এটা কামৰ 1/5 3 দিনত সম্পূৰ্ণ কৰে। তেওঁ গোটেই কাম সম্পূৰ্ণ কৰিব —"
   },
   "options": [
    {
     "en": "15 days",
     "as": "১৫ দিন"
    },
    {
     "en": "12 days",
     "as": "১২ দিন"
    },
    {
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "18 days",
     "as": "১৮ দিন"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Whole work = 3 x 5 = 15 days.",
    "as": "গোটেই কাম = 3 x 5 = 15 দিন।"
   }
  },
  {
   "id": "time-work-057",
   "q": {
    "en": "A and B together can do a work in 5 days, B and C in 6 days and C and A in 7.5 days. A alone can do it in —",
    "as": "A আৰু B একেলগে এটা কাম 5 দিনত, B আৰু C 6 দিনত আৰু C আৰু A 7.5 দিনত কৰিব পাৰে। A অকলে কৰিব —"
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
     "en": "10 days",
     "as": "১০ দিন"
    },
    {
     "en": "9 days",
     "as": "৯ দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "2(A+B+C) = 1/5 + 1/6 + 1/7.5 = 1/2, so A+B+C = 1/4 and A = 1/4 - 1/6 = 1/12, giving 12 days.",
    "as": "2(A+B+C) = 1/5 + 1/6 + 1/7.5 = 1/2, গতিকে A+B+C = 1/4 আৰু A = 1/4 - 1/6 = 1/12, অৰ্থাৎ 12 দিন।"
   }
  },
  {
   "id": "time-work-058",
   "q": {
    "en": "A can do a work in 6 days and B in 12 days. They work together for 2 days; the work remaining is —",
    "as": "A এটা কাম 6 দিনত আৰু B 12 দিনত কৰিব পাৰে। সিহঁতে 2 দিন একেলগে কাম কৰিলে বাকী থকা কাম —"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "3/4",
     "as": "৩/৪"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "In 2 days they do 2 x (1/6 + 1/12) = 2 x 1/4 = 1/2, so 1/2 remains.",
    "as": "2 দিনত সিহঁতে 2 x (1/6 + 1/12) = 2 x 1/4 = 1/2 কৰে, গতিকে 1/2 বাকী থাকে।"
   }
  },
  {
   "id": "time-work-059",
   "q": {
    "en": "If 14 men can do a work in 12 days, the number of men needed to do it in 8 days is —",
    "as": "14 জন মানুহে এটা কাম 12 দিনত কৰিব পাৰিলে 8 দিনত কৰিবলৈ প্ৰয়োজনীয় মানুহ —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "21",
     "as": "২১"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "24",
     "as": "২৪"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Inverse proportion: 14 x 12 = m x 8, so m = 21.",
    "as": "প্ৰতিক্ৰম অনুপাত: 14 x 12 = m x 8, গতিকে m = 21।"
   }
  },
  {
   "id": "time-work-060",
   "q": {
    "en": "If 16 men can do a work in 9 days, the work done by them in 3 days is —",
    "as": "16 জন মানুহে এটা কাম 9 দিনত কৰিব পাৰিলে 3 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/4",
     "as": "১/৪"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "3/9 = 1/3.",
    "as": "3/9 = 1/3।"
   }
  },
  {
   "id": "time-work-061",
   "q": {
    "en": "A can do a work in 25 days. He works for 5 days. The work remaining is —",
    "as": "A এটা কাম 25 দিনত কৰিব পাৰে। তেওঁ 5 দিন কাম কৰে। বাকী থকা কাম —"
   },
   "options": [
    {
     "en": "1/5",
     "as": "১/৫"
    },
    {
     "en": "4/5",
     "as": "৪/৫"
    },
    {
     "en": "3/5",
     "as": "৩/৫"
    },
    {
     "en": "2/5",
     "as": "২/৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Work done = 5/25 = 1/5, so remaining = 4/5.",
    "as": "কৰা কাম = 5/25 = 1/5, গতিকে বাকী = 4/5।"
   }
  },
  {
   "id": "time-work-062",
   "q": {
    "en": "A and B can do a work in 10 days. If A alone can do it in 15 days, the work done by B in 5 days is —",
    "as": "A আৰু B এটা কাম 10 দিনত কৰিব পাৰে। A অকলে 15 দিনত কৰিব পাৰিলে B এ 5 দিনত কৰা কাম —"
   },
   "options": [
    {
     "en": "1/5",
     "as": "১/৫"
    },
    {
     "en": "1/6",
     "as": "১/৬"
    },
    {
     "en": "1/3",
     "as": "১/৩"
    },
    {
     "en": "1/2",
     "as": "১/২"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "B alone takes 30 days, so in 5 days B does 5/30 = 1/6.",
    "as": "B অকলে 30 দিন লয়, গতিকে 5 দিনত B এ 5/30 = 1/6 কৰে।"
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
