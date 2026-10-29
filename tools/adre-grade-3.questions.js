#!/usr/bin/env node
"use strict";
/* ============================================================
   axomexam — tools/adre-grade-3.questions.js
   Question banks for the ADRE 3.0 Grade III book, keyed by leaf
   sub-category id. Every topic carries one question file per
   question; tools/build-adre-grade-3.js writes each entry as
   data/exams/adre-grade-3/<section>/<topic>/question-NNN.json.
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
    "en": "The sum is 50 and the number of values is 4, so the average is 12.5.",
    "as": "সমষ্টি 50 আৰু মানৰ সংখ্যা 4, গতিকে গড় 12.5।"
   }
  },
  {
   "id": "average-002",
   "q": {
    "en": "The average of the first 10 natural numbers is —",
    "as": "প্ৰথম 10 টা স্বাভাৱিক সংখ্যাৰ গড় —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "5.5",
     "as": "৫.৫"
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
   "correct": 1,
   "explanation": {
    "en": "The average of the first n natural numbers is (n + 1)/2 = 5.5.",
    "as": "প্ৰথম n টা স্বাভাৱিক সংখ্যাৰ গড় (n + 1)/2 = 5.5।"
   }
  },
  {
   "id": "average-003",
   "q": {
    "en": "The average of 4 numbers is 15. If one number is 12, the average of the other three is —",
    "as": "4 টা সংখ্যাৰ গড় 15। এটা 12 হ'লে বাকী তিনিটাৰ গড় —"
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
     "en": "17",
     "as": "১৭"
    },
    {
     "en": "18",
     "as": "১৮"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The total is 60; removing 12 leaves 48, and 48 ÷ 3 = 16.",
    "as": "মুঠ 60; 12 বাদ দিলে 48, আৰু 48 ÷ 3 = 16।"
   }
  },
  {
   "id": "average-004",
   "q": {
    "en": "If every value in a set is increased by 5, the average —",
    "as": "এটা গোটৰ প্ৰতিটো মান 5 ৰে বঢ়ালে গড় —"
   },
   "options": [
    {
     "en": "increases by 5",
     "as": "5 ৰে বাঢ়ে"
    },
    {
     "en": "decreases by 5",
     "as": "5 ৰে কমে"
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
   "correct": 0,
   "explanation": {
    "en": "Adding a constant to every value increases the average by the same constant.",
    "as": "প্ৰতিটো মানত এটা স্থিৰ ৰাশি যোগ কৰিলে গড়ো সেই ৰাশিৰে বাঢ়ে।"
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
    "en": "The area of a rectangle 12 m long and 5 m broad is —",
    "as": "12 মিটাৰ দীঘ আৰু 5 মিটাৰ প্ৰস্থৰ আয়তক্ষেত্ৰৰ কালি —"
   },
   "options": [
    {
     "en": "17 sq m",
     "as": "১৭ বৰ্গ মিটাৰ"
    },
    {
     "en": "34 sq m",
     "as": "৩৪ বৰ্গ মিটাৰ"
    },
    {
     "en": "60 sq m",
     "as": "৬০ বৰ্গ মিটাৰ"
    },
    {
     "en": "120 sq m",
     "as": "১২০ বৰ্গ মিটাৰ"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Area = length × breadth = 12 × 5 = 60 square metres.",
    "as": "কালি = দীঘ × প্ৰস্থ = 12 × 5 = 60 বৰ্গ মিটাৰ।"
   }
  },
  {
   "id": "basic-mensuration-002",
   "q": {
    "en": "The area of a triangle with base 10 cm and height 6 cm is —",
    "as": "ভূমি 10 ছে.মি. আৰু উচ্চতা 6 ছে.মি.ৰ ত্ৰিভুজৰ কালি —"
   },
   "options": [
    {
     "en": "30 sq cm",
     "as": "৩০ বৰ্গ ছে.মি."
    },
    {
     "en": "60 sq cm",
     "as": "৬০ বৰ্গ ছে.মি."
    },
    {
     "en": "16 sq cm",
     "as": "১৬ বৰ্গ ছে.মি."
    },
    {
     "en": "20 sq cm",
     "as": "২০ বৰ্গ ছে.মি."
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Area = 1/2 × base × height = 30 square cm.",
    "as": "কালি = 1/2 × ভূমি × উচ্চতা = 30 বৰ্গ ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-003",
   "q": {
    "en": "The perimeter of a square of side 7 cm is —",
    "as": "7 ছে.মি. বাহুৰ বৰ্গক্ষেত্ৰৰ পৰিসীমা —"
   },
   "options": [
    {
     "en": "14 cm",
     "as": "১৪ ছে.মি."
    },
    {
     "en": "21 cm",
     "as": "২১ ছে.মি."
    },
    {
     "en": "28 cm",
     "as": "২৮ ছে.মি."
    },
    {
     "en": "49 cm",
     "as": "৪৯ ছে.মি."
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Perimeter of a square = 4 × side = 28 cm.",
    "as": "বৰ্গক্ষেত্ৰৰ পৰিসীমা = 4 × বাহু = 28 ছে.মি.।"
   }
  },
  {
   "id": "basic-mensuration-004",
   "q": {
    "en": "In a right-angled triangle, the square of the hypotenuse equals —",
    "as": "সমকোণী ত্ৰিভুজত কৰ্ণৰ বৰ্গ সমান —"
   },
   "options": [
    {
     "en": "the sum of the other two sides",
     "as": "আন দুটা বাহুৰ সমষ্টি"
    },
    {
     "en": "the sum of the squares of the other two sides",
     "as": "আন দুটা বাহুৰ বৰ্গৰ সমষ্টি"
    },
    {
     "en": "the product of the other two sides",
     "as": "আন দুটা বাহুৰ গুণফল"
    },
    {
     "en": "the difference of the other two sides",
     "as": "আন দুটা বাহুৰ পাৰ্থক্য"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "By the Pythagoras theorem, the square of the hypotenuse equals the sum of the squares of the other two sides.",
    "as": "পাইথাগোৰাছৰ উপপাদ্য অনুসৰি কৰ্ণৰ বৰ্গ আন দুটা বাহুৰ বৰ্গৰ সমষ্টিৰ সমান।"
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
    "en": "The HCF of 12 and 18 is —",
    "as": "12 আৰু 18 ৰ গ.সা.উ. —"
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
     "en": "36",
     "as": "৩৬"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The common factors of 12 and 18 are 1, 2, 3 and 6, so the HCF is 6.",
    "as": "12 আৰু 18 ৰ সাধাৰণ উৎপাদক 1, 2, 3 আৰু 6, গতিকে গ.সা.উ. 6।"
   }
  },
  {
   "id": "lcm-hcf-002",
   "q": {
    "en": "The LCM of 4 and 6 is —",
    "as": "4 আৰু 6 ৰ ল.সা.গু. —"
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
     "en": "6",
     "as": "৬"
    },
    {
     "en": "2",
     "as": "২"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The smallest common multiple of 4 and 6 is 12.",
    "as": "4 আৰু 6 ৰ আটাইতকৈ সৰু সাধাৰণ গুণিতক 12।"
   }
  },
  {
   "id": "lcm-hcf-003",
   "q": {
    "en": "If the HCF of two numbers is 4 and their LCM is 24, the product of the numbers is —",
    "as": "দুটা সংখ্যাৰ গ.সা.উ. 4 আৰু ল.সা.গু. 24 হ'লে গুণফল —"
   },
   "options": [
    {
     "en": "28",
     "as": "২৮"
    },
    {
     "en": "96",
     "as": "৯৬"
    },
    {
     "en": "48",
     "as": "৪৮"
    },
    {
     "en": "120",
     "as": "১২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "HCF × LCM = 4 × 24 = 96.",
    "as": "গ.সা.উ. × ল.সা.গু. = 4 × 24 = 96।"
   }
  },
  {
   "id": "lcm-hcf-004",
   "q": {
    "en": "The LCM of two co-prime numbers is —",
    "as": "দুটা সহ-মৌলিক সংখ্যাৰ ল.সা.গু. —"
   },
   "options": [
    {
     "en": "their sum",
     "as": "তেওঁলোকৰ যোগফল"
    },
    {
     "en": "their product",
     "as": "তেওঁলোকৰ গুণফল"
    },
    {
     "en": "one",
     "as": "এক"
    },
    {
     "en": "their difference",
     "as": "তেওঁলোকৰ পাৰ্থক্য"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Two co-prime numbers have no common factor, so their LCM is their product.",
    "as": "দুটা সহ-মৌলিক সংখ্যাৰ সাধাৰণ উৎপাদক নাই, গতিকে ল.সা.গু. গুণফল।"
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
    "en": "The place value of the digit 0 in the number 5072 is —",
    "as": "5072 সংখ্যাটোত 0 অংকটোৰ স্থানীয় মান —"
   },
   "options": [
    {
     "en": "0",
     "as": "০"
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
     "en": "Thousands",
     "as": "হাজাৰ"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The digit 0 contributes no value, so its place value is 0 in any position.",
    "as": "0 অংকটোৱে কোনো মান যোগ নকৰে, গতিকে যিকোনো স্থানত ইয়াৰ স্থানীয় মান 0।"
   }
  },
  {
   "id": "number-system-002",
   "q": {
    "en": "The number of prime numbers between 1 and 20 is —",
    "as": "1 ৰ পৰা 20 লৈকে মূৰব সংখ্যাৰ সংখ্যা —"
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
    "en": "They are 2, 3, 5, 7, 11, 13, 17 and 19, so there are eight primes.",
    "as": "সেইবোৰ 2, 3, 5, 7, 11, 13, 17 আৰু 19, গতিকে মুঠ আঠটা মূৰব সংখ্যা।"
   }
  },
  {
   "id": "number-system-003",
   "q": {
    "en": "In the number 5060, the place value of the digit 5 is —",
    "as": "5060 সংখ্যাটোত 5 অংকটোৰ স্থানীয় মান —"
   },
   "options": [
    {
     "en": "5",
     "as": "৫"
    },
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "500",
     "as": "৫০০"
    },
    {
     "en": "5000",
     "as": "৫০০০"
    }
   ],
   "correct": 3,
   "explanation": {
    "en": "The digit 5 stands in the thousands place, so its place value is 5000.",
    "as": "5 অংকটো হাজাৰৰ স্থানত আছে, গতিকে ইয়াৰ স্থানীয় মান 5000।"
   }
  },
  {
   "id": "number-system-004",
   "q": {
    "en": "The number of factors of 36 is —",
    "as": "36 ৰ উৎপাদকৰ সংখ্যা —"
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
     "en": "9",
     "as": "৯"
    },
    {
     "en": "12",
     "as": "১২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "36 = 2 squared x 3 squared, so the number of factors is (2+1)(2+1) = 9.",
    "as": "36 = 2 ৰ বৰ্গ x 3 ৰ বৰ্গ, গতিকে উৎপাদকৰ সংখ্যা (2+1)(2+1) = 9।"
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
    "en": "25% of 400 is —",
    "as": "400 ৰ 25% —"
   },
   "options": [
    {
     "en": "50",
     "as": "৫০"
    },
    {
     "en": "75",
     "as": "৭৫"
    },
    {
     "en": "100",
     "as": "১০০"
    },
    {
     "en": "125",
     "as": "১২৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "25% of 400 = 400 × 25/100 = 100.",
    "as": "400 ৰ 25% = 400 × 25/100 = 100।"
   }
  },
  {
   "id": "percentage-002",
   "q": {
    "en": "If a number is increased by 10% and then decreased by 10%, the final value is —",
    "as": "এটা সংখ্যা 10% বৃদ্ধি কৰি তাৰ পিছত 10% হ্ৰাস কৰিলে চূড়ান্ত মান —"
   },
   "options": [
    {
     "en": "the same as the original",
     "as": "মূলৰ সমান"
    },
    {
     "en": "1% less than the original",
     "as": "মূলতকৈ 1% কম"
    },
    {
     "en": "1% more than the original",
     "as": "মূলতকৈ 1% বেছি"
    },
    {
     "en": "10% less",
     "as": "মূলতকৈ 10% কম"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The value becomes 1.1 × 0.9 = 0.99 of the original, that is 1% less.",
    "as": "মানটো মূলৰ 1.1 × 0.9 = 0.99 হয়, অৰ্থাৎ 1% কম।"
   }
  },
  {
   "id": "percentage-003",
   "q": {
    "en": "The fraction 3/5 as a percentage is —",
    "as": "3/5 ভগ্নাংশক শতাংশত প্ৰকাশ কৰিলে —"
   },
   "options": [
    {
     "en": "30%",
     "as": "৩০%"
    },
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "60%",
     "as": "৬০%"
    },
    {
     "en": "75%",
     "as": "৭৫%"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "3/5 = 0.6 and 0.6 × 100 = 60%.",
    "as": "3/5 = 0.6 আৰু 0.6 × 100 = 60%।"
   }
  },
  {
   "id": "percentage-004",
   "q": {
    "en": "If 40% of a number is 80, the number is —",
    "as": "এটা সংখ্যাৰ 40% 80 হ'লে সংখ্যাটো —"
   },
   "options": [
    {
     "en": "160",
     "as": "১৬০"
    },
    {
     "en": "200",
     "as": "২০০"
    },
    {
     "en": "240",
     "as": "২৪০"
    },
    {
     "en": "320",
     "as": "৩২০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The number is 80 × 100/40 = 200.",
    "as": "সংখ্যাটো 80 × 100/40 = 200।"
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
    "en": "A father is 30 years older than his son. If the son is 10, the father is —",
    "as": "এজন দেউতাক পুত্ৰতকৈ 30 বছৰ ডাঙৰ। পুত্ৰ 10 হ'লে দেউতাক —"
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
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "45",
     "as": "৪৫"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "The father's age is 10 + 30 = 40 years.",
    "as": "দেউতাকৰ বয়স 10 + 30 = 40 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-002",
   "q": {
    "en": "The sum of the ages of a mother and daughter is 50. If the mother is 30, the daughter is —",
    "as": "মাক আৰু জীয়েকৰ বয়সৰ যোগফল 50। মাক 30 হ'লে জীয়েক —"
   },
   "options": [
    {
     "en": "15",
     "as": "১৫"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "25",
     "as": "২৫"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The daughter's age is 50 − 30 = 20 years.",
    "as": "জীয়েকৰ বয়স 50 − 30 = 20 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-003",
   "q": {
    "en": "Five years ago a man was 25. His present age is —",
    "as": "পাঁচ বছৰ আগতে এজন মানুহ 25 বছৰৰ আছিল। বৰ্তমান বয়স —"
   },
   "options": [
    {
     "en": "20",
     "as": "২০"
    },
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
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "Adding five years gives the present age, 25 + 5 = 30 years.",
    "as": "পাঁচ বছৰ যোগ কৰিলে বৰ্তমান বয়স, 25 + 5 = 30 বছৰ।"
   }
  },
  {
   "id": "problems-on-ages-004",
   "q": {
    "en": "In an age problem, what stays constant over time?",
    "as": "বয়সৰ প্ৰশ্নত সময়ৰ লগে লগে কি স্থিৰ থাকে?"
   },
   "options": [
    {
     "en": "The ratio of the ages",
     "as": "বয়সৰ অনুপাত"
    },
    {
     "en": "The difference between the ages",
     "as": "বয়সৰ পাৰ্থক্য"
    },
    {
     "en": "The sum of the ages",
     "as": "বয়সৰ যোগফল"
    },
    {
     "en": "The product of the ages",
     "as": "বয়সৰ গুণফল"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The difference between the ages of two persons stays constant.",
    "as": "দুজন ব্যক্তিৰ বয়সৰ পাৰ্থক্য স্থিৰ থাকে।"
   }
  }
 ],
 "profit-loss": [
  {
   "id": "profit-loss-001",
   "q": {
    "en": "An article bought for ₹200 is sold for ₹250. The profit per cent is —",
    "as": "₹200 ত কিনা এটা বস্তু ₹250 ত বিক্ৰী কৰিলে লাভ শতাংশ —"
   },
   "options": [
    {
     "en": "20%",
     "as": "২০%"
    },
    {
     "en": "25%",
     "as": "২৫%"
    },
    {
     "en": "50%",
     "as": "৫০%"
    },
    {
     "en": "10%",
     "as": "১০%"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Profit is ₹50 on a cost of ₹200, so the profit per cent is 25%.",
    "as": "₹200 ক্ৰয়মূল্যত লাভ ₹50, গতিকে লাভ শতাংশ 25%।"
   }
  },
  {
   "id": "profit-loss-002",
   "q": {
    "en": "If the cost price is ₹500 and the loss is 10%, the selling price is —",
    "as": "ক্ৰয়মূল্য ₹500 আৰু ক্ষতি 10% হ'লে বিক্ৰয়মূল্য —"
   },
   "options": [
    {
     "en": "₹450",
     "as": "₹৪৫০"
    },
    {
     "en": "₹490",
     "as": "₹৪৯০"
    },
    {
     "en": "₹510",
     "as": "₹৫১০"
    },
    {
     "en": "₹550",
     "as": "₹৫৫০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "A loss of 10% means the selling price is 90% of ₹500, that is ₹450.",
    "as": "10% ক্ষতি মানে বিক্ৰয়মূল্য ₹500 ৰ 90%, অৰ্থাৎ ₹450।"
   }
  },
  {
   "id": "profit-loss-003",
   "q": {
    "en": "Discount is always calculated on the —",
    "as": "ৰেহাই সদায় হিচাপ কৰা হয় —"
   },
   "options": [
    {
     "en": "cost price",
     "as": "ক্ৰয়মূল্যত"
    },
    {
     "en": "marked price",
     "as": "চিহ্নিত মূল্যত"
    },
    {
     "en": "selling price",
     "as": "বিক্ৰয়মূল্যত"
    },
    {
     "en": "profit",
     "as": "লাভত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Discount is a reduction allowed on the marked price.",
    "as": "ৰেহাই হৈছে চিহ্নিত মূল্যৰ ওপৰত দিয়া হ্ৰাস।"
   }
  },
  {
   "id": "profit-loss-004",
   "q": {
    "en": "If the selling price is less than the cost price, the result is a —",
    "as": "বিক্ৰয়মূল্য ক্ৰয়মূল্যতকৈ কম হ'লে ফলাফল —"
   },
   "options": [
    {
     "en": "profit",
     "as": "লাভ"
    },
    {
     "en": "loss",
     "as": "ক্ষতি"
    },
    {
     "en": "discount",
     "as": "ৰেহাই"
    },
    {
     "en": "commission",
     "as": "কমিচন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "When the selling price is less than the cost price there is a loss.",
    "as": "বিক্ৰয়মূল্য ক্ৰয়মূল্যতকৈ কম হ'লে ক্ষতি হয়।"
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
    "en": "If two numbers are in the ratio 3 : 5 and their sum is 64, the smaller number is —",
    "as": "দুটা সংখ্যা 3 : 5 অনুপাতত আৰু যোগফল 64 হ'লে সৰু সংখ্যাটো —"
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
     "en": "40",
     "as": "৪০"
    },
    {
     "en": "16",
     "as": "১৬"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The parts are 3x and 5x; 8x = 64 gives x = 8, so the smaller number is 24.",
    "as": "অংশবোৰ 3x আৰু 5x; 8x = 64 ৰ পৰা x = 8, গতিকে সৰু সংখ্যা 24।"
   }
  },
  {
   "id": "ratio-proportion-002",
   "q": {
    "en": "The ratio 15 : 25 in its lowest terms is —",
    "as": "15 : 25 অনুপাতৰ লঘিষ্ঠ ৰূপ —"
   },
   "options": [
    {
     "en": "5 : 3",
     "as": "৫ : ৩"
    },
    {
     "en": "3 : 5",
     "as": "৩ : ৫"
    },
    {
     "en": "15 : 25",
     "as": "১৫ : ২৫"
    },
    {
     "en": "1 : 5",
     "as": "১ : ৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Dividing both terms by their HCF 5 gives 3 : 5.",
    "as": "দুয়োটা পদক গ.সা.উ. 5 ৰে ভাগ কৰিলে 3 : 5 পোৱা যায়।"
   }
  },
  {
   "id": "ratio-proportion-003",
   "q": {
    "en": "If 5 pens cost ₹40, the cost of 8 pens is —",
    "as": "5 টা কলমৰ দাম ₹40 হ'লে 8 টা কলমৰ দাম —"
   },
   "options": [
    {
     "en": "₹56",
     "as": "₹৫৬"
    },
    {
     "en": "₹60",
     "as": "₹৬০"
    },
    {
     "en": "₹64",
     "as": "₹৬৪"
    },
    {
     "en": "₹72",
     "as": "₹৭২"
    }
   ],
   "correct": 2,
   "explanation": {
    "en": "One pen costs ₹8, so 8 pens cost ₹64.",
    "as": "এটা কলমৰ দাম ₹8, গতিকে 8 টা কলমৰ দাম ₹64।"
   }
  },
  {
   "id": "ratio-proportion-004",
   "q": {
    "en": "If a : b = 2 : 3 and b : c = 3 : 4, then a : c is —",
    "as": "a : b = 2 : 3 আৰু b : c = 3 : 4 হ'লে a : c —"
   },
   "options": [
    {
     "en": "1 : 2",
     "as": "১ : ২"
    },
    {
     "en": "2 : 4",
     "as": "২ : ৪"
    },
    {
     "en": "1 : 1",
     "as": "১ : ১"
    },
    {
     "en": "2 : 3",
     "as": "২ : ৩"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The b terms match, so a : c = 2 : 4 = 1 : 2.",
    "as": "b ৰ পদ মিলে, গতিকে a : c = 2 : 4 = 1 : 2।"
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
    "en": "The simple interest on ₹1000 at 10% per annum for 2 years is —",
    "as": "₹1000 ৰ ওপৰত বছৰি 10% হাৰত 2 বছৰৰ সৰল সুত —"
   },
   "options": [
    {
     "en": "₹100",
     "as": "₹১০০"
    },
    {
     "en": "₹200",
     "as": "₹২০০"
    },
    {
     "en": "₹210",
     "as": "₹২১০"
    },
    {
     "en": "₹1200",
     "as": "₹১২০০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI = (1000 × 10 × 2)/100 = ₹200.",
    "as": "সৰল সুত = (1000 × 10 × 2)/100 = ₹200।"
   }
  },
  {
   "id": "simple-compound-interest-002",
   "q": {
    "en": "For which period are simple interest and compound interest equal?",
    "as": "কিমান সময়ছোৱাৰ বাবে সৰল সুত আৰু চক্ৰবৃদ্ধি সুত সমান?"
   },
   "options": [
    {
     "en": "First year only",
     "as": "কেৱল প্ৰথম বছৰ"
    },
    {
     "en": "Two years",
     "as": "দুই বছৰ"
    },
    {
     "en": "Three years",
     "as": "তিনি বছৰ"
    },
    {
     "en": "Never",
     "as": "কেতিয়াও নহয়"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "In the first year there is no interest on interest, so the two are equal.",
    "as": "প্ৰথম বছৰত সুতৰ ওপৰত সুত নাথাকে, গতিকে দুয়োটা সমান।"
   }
  },
  {
   "id": "simple-compound-interest-003",
   "q": {
    "en": "The amount on ₹500 at 5% simple interest for 4 years is —",
    "as": "₹500 ৰ ওপৰত 5% সৰল সুতত 4 বছৰৰ ৰাশি —"
   },
   "options": [
    {
     "en": "₹525",
     "as": "₹৫২৫"
    },
    {
     "en": "₹600",
     "as": "₹৬০০"
    },
    {
     "en": "₹550",
     "as": "₹৫৫০"
    },
    {
     "en": "₹625",
     "as": "₹৬২৫"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "SI = (500 × 5 × 4)/100 = ₹100, so the amount is ₹600.",
    "as": "সৰল সুত = (500 × 5 × 4)/100 = ₹100, গতিকে ৰাশি ₹600।"
   }
  },
  {
   "id": "simple-compound-interest-004",
   "q": {
    "en": "Compound interest is calculated on —",
    "as": "চক্ৰবৃদ্ধি সুত হিচাপ কৰা হয় —"
   },
   "options": [
    {
     "en": "the principal only",
     "as": "কেৱল মূলধনৰ ওপৰত"
    },
    {
     "en": "the principal plus the interest already added",
     "as": "মূলধন আৰু যোগ হোৱা সুতৰ ওপৰত"
    },
    {
     "en": "the interest only",
     "as": "কেৱল সুতৰ ওপৰত"
    },
    {
     "en": "the time only",
     "as": "কেৱল সময়ৰ ওপৰত"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Compound interest is calculated on the principal plus the interest already added.",
    "as": "চক্ৰবৃদ্ধি সুত মূলধন আৰু যোগ হোৱা সুতৰ ওপৰত হিচাপ কৰা হয়।"
   }
  }
 ],
 "simplification-fractions": [
  {
   "id": "simplification-fractions-001",
   "q": {
    "en": "Simplify: 12 + 8 ÷ 4 × 2 − 6",
    "as": "সৰল কৰক: 12 + 8 ÷ 4 × 2 − 6"
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
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "20",
     "as": "২০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "By BODMAS, 8 ÷ 4 = 2, then 2 × 2 = 4, so 12 + 4 − 6 = 10.",
    "as": "BODMAS অনুসৰি 8 ÷ 4 = 2, তাৰ পিছত 2 × 2 = 4, গতিকে 12 + 4 − 6 = 10।"
   }
  },
  {
   "id": "simplification-fractions-002",
   "q": {
    "en": "Simplify: 5/6 + 1/3",
    "as": "সৰল কৰক: 5/6 + 1/3"
   },
   "options": [
    {
     "en": "1/2",
     "as": "১/২"
    },
    {
     "en": "7/6",
     "as": "৭/৬"
    },
    {
     "en": "6/9",
     "as": "৬/৯"
    },
    {
     "en": "2/3",
     "as": "২/৩"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "LCM of 6 and 3 is 6, so 5/6 + 2/6 = 7/6.",
    "as": "6 আৰু 3 ৰ ল.সা.গু. 6, গতিকে 5/6 + 2/6 = 7/6।"
   }
  },
  {
   "id": "simplification-fractions-003",
   "q": {
    "en": "Simplify: (15 − 5) × 3 + 10 ÷ 5",
    "as": "সৰল কৰক: (15 − 5) × 3 + 10 ÷ 5"
   },
   "options": [
    {
     "en": "32",
     "as": "৩২"
    },
    {
     "en": "34",
     "as": "৩৪"
    },
    {
     "en": "30",
     "as": "৩০"
    },
    {
     "en": "40",
     "as": "৪০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "The bracket gives 10, then 10 × 3 = 30 and 10 ÷ 5 = 2, so 30 + 2 = 32.",
    "as": "বন্ধনীয়ে 10 দিয়ে, তাৰ পিছত 10 × 3 = 30 আৰু 10 ÷ 5 = 2, গতিকে 30 + 2 = 32।"
   }
  },
  {
   "id": "simplification-fractions-004",
   "q": {
    "en": "Simplify: 20 ÷ 4 + 3 × 2",
    "as": "সৰল কৰক: 20 ÷ 4 + 3 × 2"
   },
   "options": [
    {
     "en": "11",
     "as": "১১"
    },
    {
     "en": "13",
     "as": "১৩"
    },
    {
     "en": "16",
     "as": "১৬"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "20 ÷ 4 = 5 and 3 × 2 = 6, so the value is 11.",
    "as": "20 ÷ 4 = 5 আৰু 3 × 2 = 6, গতিকে মান 11।"
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
    "en": "A speed of 72 km/h in metres per second is —",
    "as": "72 কি.মি./ঘণ্টা গতিবেগ মিটাৰ/ছেকেণ্ডত —"
   },
   "options": [
    {
     "en": "18",
     "as": "১৮"
    },
    {
     "en": "20",
     "as": "২০"
    },
    {
     "en": "24",
     "as": "২৪"
    },
    {
     "en": "30",
     "as": "৩০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "72 × 5/18 = 20 metres per second.",
    "as": "72 × 5/18 = 20 মিটাৰ প্ৰতি ছেকেণ্ড।"
   }
  },
  {
   "id": "time-speed-distance-002",
   "q": {
    "en": "A train travels 180 km in 3 hours. Its speed is —",
    "as": "এখন ৰে'লে 3 ঘণ্টাত 180 কি.মি. যায়। গতিবেগ —"
   },
   "options": [
    {
     "en": "50 km/h",
     "as": "৫০ কি.মি./ঘণ্টা"
    },
    {
     "en": "60 km/h",
     "as": "৬০ কি.মি./ঘণ্টা"
    },
    {
     "en": "70 km/h",
     "as": "৭০ কি.মি./ঘণ্টা"
    },
    {
     "en": "90 km/h",
     "as": "৯০ কি.মি./ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Speed = distance ÷ time = 180 ÷ 3 = 60 km/h.",
    "as": "গতিবেগ = দূৰত্ব ÷ সময় = 180 ÷ 3 = 60 কি.মি./ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-003",
   "q": {
    "en": "A car covers 150 km at 50 km/h. The time taken is —",
    "as": "এখন গাড়ীয়ে 50 কি.মি./ঘণ্টা গতিবেগে 150 কি.মি. যায়। সময় —"
   },
   "options": [
    {
     "en": "2 hours",
     "as": "2 ঘণ্টা"
    },
    {
     "en": "3 hours",
     "as": "3 ঘণ্টা"
    },
    {
     "en": "4 hours",
     "as": "4 ঘণ্টা"
    },
    {
     "en": "5 hours",
     "as": "5 ঘণ্টা"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Time = distance ÷ speed = 150 ÷ 50 = 3 hours.",
    "as": "সময় = দূৰত্ব ÷ গতিবেগ = 150 ÷ 50 = 3 ঘণ্টা।"
   }
  },
  {
   "id": "time-speed-distance-004",
   "q": {
    "en": "To convert kilometres per hour into metres per second, multiply by —",
    "as": "কিলোমিটাৰ প্ৰতি ঘণ্টাক মিটাৰ প্ৰতি ছেকেণ্ডলৈ সলাবলৈ পূৰণ কৰক —"
   },
   "options": [
    {
     "en": "5/18",
     "as": "5/18"
    },
    {
     "en": "18/5",
     "as": "18/5"
    },
    {
     "en": "1000",
     "as": "1000"
    },
    {
     "en": "3600",
     "as": "3600"
    }
   ],
   "correct": 0,
   "explanation": {
    "en": "Multiplying by 5/18 converts kilometres per hour into metres per second.",
    "as": "5/18 ৰে পূৰণ কৰিলে কিলোমিটাৰ প্ৰতি ঘণ্টা মিটাৰ প্ৰতি ছেকেণ্ডলৈ ৰূপান্তৰ হয়।"
   }
  }
 ],
 "time-work": [
  {
   "id": "time-work-001",
   "q": {
    "en": "A can finish a work in 10 days. The part of the work he does in one day is —",
    "as": "A এ 10 দিনত এটা কাম শেষ কৰে। এদিনত কৰা কামৰ অংশ —"
   },
   "options": [
    {
     "en": "1/5",
     "as": "১/৫"
    },
    {
     "en": "1/10",
     "as": "১/১০"
    },
    {
     "en": "1/20",
     "as": "১/২০"
    },
    {
     "en": "10",
     "as": "১০"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Taking the whole work as one, one day's work is 1/10.",
    "as": "গোটেই কাম এক ধৰিলে এদিনৰ কাম 1/10।"
   }
  },
  {
   "id": "time-work-002",
   "q": {
    "en": "A does a work in 12 days and B in 6 days. Working together they finish it in —",
    "as": "A এ 12 দিনত আৰু B এ 6 দিনত কাম কৰে। একেলগে শেষ কৰে —"
   },
   "options": [
    {
     "en": "3 days",
     "as": "3 দিন"
    },
    {
     "en": "4 days",
     "as": "4 দিন"
    },
    {
     "en": "6 days",
     "as": "6 দিন"
    },
    {
     "en": "9 days",
     "as": "9 দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "One day's work is 1/12 + 1/6 = 1/4, so together they need 4 days.",
    "as": "এদিনৰ কাম 1/12 + 1/6 = 1/4, গতিকে একেলগে 4 দিন লাগে।"
   }
  },
  {
   "id": "time-work-003",
   "q": {
    "en": "If 6 men can do a work in 8 days, 12 men can do it in —",
    "as": "6 জনে 8 দিনত কাম কৰিলে 12 জনে কৰিব —"
   },
   "options": [
    {
     "en": "2 days",
     "as": "2 দিন"
    },
    {
     "en": "4 days",
     "as": "4 দিন"
    },
    {
     "en": "6 days",
     "as": "6 দিন"
    },
    {
     "en": "16 days",
     "as": "16 দিন"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "Men and days are in inverse proportion, so 6 × 8 = 12 × 4, that is 4 days.",
    "as": "মানুহ আৰু দিন ব্যস্ত সমানুপাতত, গতিকে 6 × 8 = 12 × 4, অৰ্থাৎ 4 দিন।"
   }
  },
  {
   "id": "time-work-004",
   "q": {
    "en": "When two persons work together, their one-day rates are —",
    "as": "দুজন লোকে একেলগে কাম কৰিলে তেওঁলোকৰ এদিনৰ হাৰ —"
   },
   "options": [
    {
     "en": "subtracted",
     "as": "বিয়োগ কৰা হয়"
    },
    {
     "en": "added",
     "as": "যোগ কৰা হয়"
    },
    {
     "en": "multiplied",
     "as": "পূৰণ কৰা হয়"
    },
    {
     "en": "ignored",
     "as": "আওকাণ কৰা হয়"
    }
   ],
   "correct": 1,
   "explanation": {
    "en": "The combined rate is the sum of the individual one-day rates.",
    "as": "সংযুক্ত হাৰ হৈছে ব্যক্তিগত এদিনৰ হাৰবোৰৰ সমষ্টি।"
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
