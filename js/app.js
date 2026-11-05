(()=>{"use strict";const u={categories:[],topicMap:{},topicIndex:[],ready:!1,page:0,lang:"as",uiLang:"en",mock:null,isGeneratingPdf:!1,mockSetCache:{},mockSetCount:{},mockLiveCounts:{},exams:null,examQuestionTotal:0,examTotalLoaded:!1,examTotalPromise:null,counts:null,topicsTotal:0,caCounts:null,caQuestionTotal:0,caTotalPromise:null,searchCorpusReady:!1},Ve=20,Ea=5,$t=21,g=(e,t=document)=>t.querySelector(e),P=(e,t=document)=>Array.from(t.querySelectorAll(e));let Pe=null,Ee=null,Me=null;function Ke(e,t){return new Promise((a,n)=>{const s=document.createElement("script");let i=!1;const o=c=>{i||(i=!0,clearTimeout(l),s.onload=s.onerror=null,c?(s.parentNode&&s.parentNode.removeChild(s),n(c)):a())},l=setTimeout(()=>o(new Error("Timed out loading "+e)),t||15e3);s.src=e,s.async=!0,s.onload=()=>o(),s.onerror=()=>o(new Error("Failed to load "+e)),document.head.appendChild(s)})}async function At(e,t){let a=null;for(let n=0;n<e.length;n++)try{await Ke(e[n],t);return}catch(s){a=s}throw a||new Error("Failed to load script")}function Ma(e,t){if(document.getElementById(e))return;const a=document.createElement("link");a.id=e,a.rel="stylesheet",a.href=t,document.head.appendChild(a)}function Ta(){return typeof window.renderMathInElement=="function"?Promise.resolve():(Me||(Ma("katex-css","https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"),Me=Ke("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js").then(()=>Ke("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js")).catch(e=>{throw Me=null,e})),Me)}const La=["https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js","https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"],Ia=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"];function Ct(){return window.html2canvas?Promise.resolve():(Ee||(Ee=At(La,15e3).catch(e=>{throw Ee=null,e})),Ee)}function Da(){return window.jspdf&&window.html2canvas?Promise.resolve():(Pe||(Pe=(async()=>{window.html2canvas||await Ct(),window.jspdf||await At(Ia,15e3)})().catch(e=>{throw Pe=null,e})),Pe)}const ao=`
    <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="8" fill="url(#gradLogo)"/>
      <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
      <text x="38" y="21" fill="currentColor" style="color:var(--ink, #0f172a);" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#3b82f6">.in</tspan></text>
    </svg>
  `,St=`
    <svg width="146" height="28" viewBox="0 0 146 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogoPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#gradLogoPdf)"/>
      <text x="14" y="19.5" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">A</text>
      <text x="36" y="19.5" fill="#0f172a" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="-0.3">axomexam<tspan fill="#2563eb">.in</tspan></text>
    </svg>
  `;function r(e){if(typeof I18N<"u"){const t=I18N[u.uiLang]||I18N.en||I18N.as;if(t&&t[e])return t[e];if(I18N.en&&I18N.en[e])return I18N.en[e]}return e}function Je(e){if(typeof I18N<"u"){const t=u.lang||"en",a=I18N[t];if(a&&a[e])return a[e];if(I18N.en&&I18N.en[e])return I18N.en[e]}return e}function v(e){if(e==null)return"";if(typeof e=="string")return e;const t=u.lang||"en";return e[t]||e.en||e.as||""}function Q(e){if(e==null)return"";if(typeof e=="string")return e;const t=u.uiLang||"en";return e[t]||e.en||e.as||""}function qt(e){const t=k(e,"en"),a=k(e,"as"),n=a&&a!==t?`<span class="cat-as">${d(a)}</span>`:"";return`<b>${d(t)}</b>${n}`}function Xe(e,t){const a=k(e,"en"),n=k(e,"as"),s=n&&n!==a?`<span class="sub-as">${d(n)}</span>`:"";return`<span style="font-weight:600; font-size:${t}; color:var(--ink,#0f172a);">${d(a)}</span>${s}`}const Ra={gk:"General Knowledge carries a large weight in almost every Assam recruitment examination. It combines Assam-specific history, literature, geography, art and culture with Indian polity, history, geography and economics. Because the section is factual and predictable, consistent revision usually converts into a high, reliable score in ADRE, Assam Police and APSC papers.","assam-history":"Assam History covers the ancient Kamarupa kingdom and its rulers, the medieval Ahom and Koch dynasties, the Burmese invasions and the Treaty of Yandabo, and the colonial and freedom-struggle period. Questions generally test dynasties, capitals, battles, treaties and administrative reforms.","assam-literature":"Assam Literature spans the pre-Vaishnavite period, Sankaradeva and the Vaishnavite age, the Ahom-era chronicles, and the modern era from Arunodoi to Jonaki. Aspirants are asked about authors, works, literary movements and major awards.","indian-history":"Indian History covers ancient civilisations, the Mauryas and Guptas, medieval Sultanates and the Mughals, and the modern freedom movement. Questions focus on timelines, personalities, administrative systems and landmark events.",polity:"Political Science covers the Indian Constitution, fundamental rights and duties, the Union and State machinery, panchayati raj, and Assam-specific provisions such as the Sixth Schedule and Article 371B. It is a high-scoring, factual section.",geography:"Geography covers physical, economic and social geography with dedicated blocks on the rivers, hills, climate and resources of Assam, alongside Indian and world geography. Map-based and location questions are common.",economics:"Economics covers basic economic concepts, Indian economic policy and planning, budgeting and banking, along with the agriculture and industry of Assam. Questions are mostly conceptual and current-affairs linked.","art-culture":"Art and Culture covers the festivals, dance, music, crafts, temples and heritage of Assam and India. Questions test classical dances, musical instruments, festivals, monuments and folk traditions.",math:"Mathematics tests numerical ability and quantitative aptitude and is one of the biggest scoring areas in ADRE, Assam Police, SSC and Railway tests. It brings together arithmetic, advanced math and statistics with data interpretation.",arithmetic:"Arithmetic covers percentages, profit and loss, ratio and proportion, averages, time-speed-distance, time and work, simple and compound interest, and mensuration. These topics carry the largest number of questions in state recruitment papers.","advanced-math":"Advanced Math covers algebra, geometry, trigonometry, number systems and higher-level problem solving. It is especially useful for APSC, SSC and technical posts.","statistics-and-data-interpretation":"Statistics and Data Interpretation covers averages, measures of central tendency, tables, bar and pie charts, and line graphs. The focus is on fast calculation and reading data accurately.",science:"General Science covers Physics, Chemistry and Biology at a Class 6 to 10 level, which is the standard followed by Assam government recruitment tests. Questions test everyday science, definitions, units and simple applications.",physics:"Physics covers motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and the basics of modern physics. Units, definitions and simple numericals are frequently asked.",chemistry:"Chemistry covers matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry. Chemical formulae and common reactions are important.",biology:"Biology covers the human body and its systems, nutrition and health, plants, cell biology, ecology and the environment. Health and disease questions are common in Assam Police and ADRE tests.",reasoning:"Reasoning Ability tests logical and analytical thinking through verbal, non-verbal and critical reasoning questions. Because speed and accuracy decide the score, timed practice is essential.","verbal-reasoning":"Verbal Reasoning covers series, coding-decoding, blood relations, direction sense, analogy and classification. Most questions become quick to solve with regular practice.","analytical-critical-reasoning":"Analytical and Critical Reasoning covers statements and conclusions, assumptions, syllogism, seating arrangement and puzzles. It rewards careful reading over guesswork.","non-verbal-reasoning":"Non-Verbal Reasoning covers figure series, mirror and water images, paper folding, embedded figures and pattern completion. Spatial visualisation is the main skill tested.",english:"General English tests grammar, vocabulary, sentence structure and comprehension. It appears in ADRE, Assam Police, SSC and Railway exams and is relatively easy to score with steady revision.","parts-of-speech":"Parts of Speech covers nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections, and how each of them functions inside a sentence.",grammar:"Grammar covers tenses, articles, subject-verb agreement, active and passive voice, direct and indirect speech, and common error spotting.","sentence-structure":"Sentence Structure covers sentence types, phrases and clauses, sentence correction, and paragraph organisation and ordering.",vocabulary:"Vocabulary covers synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling. Regular reading and short word lists help the most.",computer:"Computer Awareness tests the fundamentals of computers, software and operating systems, MS Office, networking and the internet, cyber security, DBMS and number systems. It is a quick-scoring section in ADRE and other state tests.","fundamentals-hardware":"Computer Fundamentals and Hardware covers input and output devices, memory, storage, the CPU and the generations of computers.","software-os":"Software and Operating Systems covers types of software, the functions of an operating system, file management, and common Windows and Linux features.","ms-office-suite":"MS Office Suite covers Microsoft Word, Excel and PowerPoint, including commonly used menu options, shortcuts and formulas.","networking-internet":"Networking and Internet covers network types and topologies, IP addresses, protocols such as HTTP and FTP, browsers, email and internet services.","cyber-security":"Cyber Security covers online threats such as viruses, malware, phishing and hacking, along with passwords, encryption and safe internet practices.","dbms-number-shortcuts":"DBMS, Number System and Shortcuts covers database basics, number system conversions, and keyboard shortcuts with their common uses.",articles:"Articles are long-form, easy-reading study pieces that explain a topic in depth and in simple bilingual language, so you can build conceptual clarity before attempting questions.","assam-police":"Assam Police previous year papers help you understand the actual question pattern, difficulty level and frequently repeated topics for Sub-Inspector and Constable recruitment conducted by SLPRB.","dhs-dme":"DHS and DME previous year papers cover the question patterns for Directorate of Health Services and Directorate of Medical Education recruitment in Assam.","guwahati-hc":"Guwahati High Court previous year papers cover the pattern for Grade III, Grade IV, Junior Assistant (JAA) and related recruitment under the High Court of Assam.",railway:"Railway previous year papers cover NTPB, Group D, ALP and related central railway recruitment patterns, including the computer-based test structure.",ssc:"SSC previous year papers cover CGL, CHSL, MTS and related central government recruitment patterns, useful for candidates preparing for both central and state posts."},Pt={gk:"প্ৰায় প্ৰতিটো অসম নিয়োগ পৰীক্ষাত সাধাৰণ জ্ঞানৰ ভাৰ যথেষ্ট বেছি। ইয়াত অসম-নিৰ্দিষ্ট ইতিহাস, সাহিত্য, ভূগোল, কলা-সংস্কৃতিৰ লগতে ভাৰতীয় ৰাজনীতি, ইতিহাস, ভূগোল আৰু অৰ্থনীতি সন্নিৱিষ্ট। শিতানটো তথ্যভিত্তিক আৰু পূৰ্বানুমেয় হোৱাৰ বাবে নিয়মীয়া পুনৰালোচনাই ADRE, অসম আৰক্ষী আৰু APSC ৰ প্ৰশ্নকাকতত উচ্চ আৰু নিৰ্ভৰযোগ্য নম্বৰলৈ ৰূপান্তৰিত হয়।","assam-history":"অসমৰ ইতিহাসত প্ৰাচীন কামৰূপ ৰাজ্য আৰু তাৰ শাসকসকল, মধ্যযুগীয় আহোম আৰু কোচ ৰাজবংশ, বৰ্মী আক্ৰমণ আৰু য়াণ্ডাবু সন্ধি, লগতে উপনিবেশিক আৰু স্বাধীনতা-সংগ্ৰামৰ কাল সামৰি লোৱা হৈছে। প্ৰশ্নত সাধাৰণতে ৰাজবংশ, ৰাজধানী, যুদ্ধ, সন্ধি আৰু প্ৰশাসনিক সংস্কাৰৰ ওপৰত গুৰুত্ব দিয়া হয়।","assam-literature":"অসমীয়া সাহিত্যই প্ৰাক-বৈষ্ণৱ যুগ, শংকৰদেৱ আৰু বৈষ্ণৱ যুগ, আহোম-যুগৰ বুৰঞ্জী, আৰু অৰুণোদয়ৰ পৰা জোনাকীলৈকে আধুনিক যুগ সামৰি লৈছে। প্ৰাৰ্থীসকলক লেখক, ৰচনা, সাহিত্যিক আন্দোলন আৰু প্ৰধান বঁটাৰ বিষয়ে সোধা হয়।","indian-history":"ভাৰতৰ ইতিহাসত প্ৰাচীন সভ্যতা, মৌৰ্য আৰু গুপ্ত, মধ্যযুগীয় চুলতানী আৰু মোগল, আৰু আধুনিক স্বাধীনতা আন্দোলন সামৰি লোৱা হৈছে। প্ৰশ্নত সময়ৰেখা, ব্যক্তিত্ব, প্ৰশাসনিক ব্যৱস্থা আৰু যুগান্তকাৰী ঘটনাৰ ওপৰত গুৰুত্ব দিয়া হয়।",polity:"ৰাজনীতি বিজ্ঞানত ভাৰতীয় সংবিধান, মৌলিক অধিকাৰ আৰু কৰ্তব্য, সংঘ আৰু ৰাজ্যৰ শাসন-ব্যৱস্থা, পঞ্চায়তী ৰাজ, আৰু ষষ্ঠ অনুসূচী তথা অনুচ্ছেদ 371B ৰ দৰে অসম-নিৰ্দিষ্ট বিধান সামৰি লোৱা হৈছে। ই এক উচ্চ নম্বৰ দিয়া, তথ্যভিত্তিক শিতান।",geography:"ভূগোলত ভৌতিক, অৰ্থনৈতিক আৰু সামাজিক ভূগোল সামৰি লোৱা হৈছে, লগতে অসমৰ নদ-নদী, পাহাৰ, জলবায়ু আৰু সম্পদৰ ওপৰত সুকীয়া অংশ, আৰু ভাৰতীয় তথা বিশ্ব ভূগোল। মানচিত্ৰভিত্তিক আৰু স্থান-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",economics:"অৰ্থনীতিত মূল অৰ্থনৈতিক ধাৰণা, ভাৰতীয় অৰ্থনৈতিক নীতি আৰু পৰিকল্পনা, বাজেট আৰু বেংকিং, লগতে অসমৰ কৃষি আৰু উদ্যোগ সামৰি লোৱা হৈছে। প্ৰশ্নবোৰ বেছিভাগ ধাৰণাগত আৰু চলিত ঘটনাৱলীৰ সৈতে সংযুক্ত।","art-culture":"কলা আৰু সংস্কৃতিত অসম আৰু ভাৰতৰ উৎসৱ, নৃত্য, সংগীত, হস্তশিল্প, মন্দিৰ আৰু ঐতিহ্য সামৰি লোৱা হৈছে। প্ৰশ্নত শাস্ত্ৰীয় নৃত্য, সংগীত-যন্ত্ৰ, উৎসৱ, স্মৃতিস্তম্ভ আৰু লোক-পৰম্পৰা পৰীক্ষা কৰা হয়।",math:"গণিতে সংখ্যাগত দক্ষতা আৰু পৰিমাণগত অভিৰুচি পৰীক্ষা কৰে আৰু ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ আটাইতকৈ বেছি নম্বৰ দিয়া ক্ষেত্ৰসমূহৰ এটা। ইয়াত পাটিগণিত, উচ্চ গণিত আৰু তথ্য বিশ্লেষণসহ পৰিসংখ্যা একত্ৰিত কৰা হৈছে।",arithmetic:"পাটিগণিতত শতকৰা, লাভ-লোকচান, অনুপাত আৰু সমানুপাত, গড়, সময়-দূৰত্ব, সময় আৰু কাম, সৰল আৰু যৌগিক সুত, আৰু ক্ষেত্ৰমিতি সামৰি লোৱা হৈছে। ৰাজ্যিক নিয়োগৰ প্ৰশ্নকাকতত এই বিষয়বোৰৰ পৰাই আটাইতকৈ বেছি প্ৰশ্ন আহে।","advanced-math":"উচ্চ গণিতত বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা প্ৰণালী আৰু উচ্চস্তৰৰ সমস্যা সমাধান সামৰি লোৱা হৈছে। ই বিশেষকৈ APSC, SSC আৰু কাৰিকৰী পদৰ বাবে উপযোগী।","statistics-and-data-interpretation":"পৰিসংখ্যা আৰু তথ্য বিশ্লেষণত গড়, কেন্দ্ৰীয় প্ৰৱণতাৰ মাপ, তালিকা, দণ্ড আৰু পাই চিত্ৰ, আৰু ৰৈখিক লেখ সামৰি লোৱা হৈছে। ইয়াৰ মূল লক্ষ্য দ্ৰুত গণনা আৰু তথ্য শুদ্ধভাৱে পঢ়া।",science:"সাধাৰণ বিজ্ঞানত ষষ্ঠৰ পৰা দশম শ্ৰেণীৰ স্তৰত পদাৰ্থ বিজ্ঞান, ৰসায়ন বিজ্ঞান আৰু জীৱ বিজ্ঞান সামৰি লোৱা হৈছে, যি অসম চৰকাৰৰ নিয়োগ পৰীক্ষাত অনুসৰণ কৰা মান। প্ৰশ্নত দৈনন্দিন বিজ্ঞান, সংজ্ঞা, একক আৰু সৰল প্ৰয়োগ পৰীক্ষা কৰা হয়।",physics:"পদাৰ্থ বিজ্ঞানত গতি, বল, কাম আৰু শক্তি, মহাকৰ্ষণ, তাপ, পোহৰ, ধ্বনি, বিদ্যুৎ আৰু চুম্বকত্ব, আৰু আধুনিক পদাৰ্থ বিজ্ঞানৰ মূল কথা সামৰি লোৱা হৈছে। একক, সংজ্ঞা আৰু সৰল সংখ্যাগত প্ৰশ্ন সঘনাই সোধা হয়।",chemistry:"ৰসায়ন বিজ্ঞানত পদাৰ্থ, পৰমাণু আৰু অণু, পৰ্যায়বৃত্ত তালিকা, অম্ল আৰু ক্ষাৰক, ধাতু আৰু অধাতু, আৰু দৈনন্দিন ৰসায়ন সামৰি লোৱা হৈছে। ৰাসায়নিক সংকেত আৰু সাধাৰণ বিক্ৰিয়া গুৰুত্বপূৰ্ণ।",biology:"জীৱ বিজ্ঞানত মানৱ শৰীৰ আৰু তাৰ তন্ত্ৰ, পুষ্টি আৰু স্বাস্থ্য, উদ্ভিদ, কোষ বিজ্ঞান, পৰিৱেশ বিজ্ঞান আৰু পৰিৱেশ সামৰি লোৱা হৈছে। অসম আৰক্ষী আৰু ADRE পৰীক্ষাত স্বাস্থ্য আৰু ৰোগ-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",reasoning:"যুক্তি আৰু মানসিক ক্ষমতাই ভাষিক, চিত্ৰভিত্তিক আৰু বিশ্লেষণাত্মক যুক্তিতৰ্কৰ জৰিয়তে যুক্তি আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে বাবে সময়বদ্ধ অনুশীলন অতি প্ৰয়োজনীয়।","verbal-reasoning":"ভাষিক যুক্তিতৰ্কত শ্ৰেণী, সংকেত-আবোৰণ, ৰক্তসম্পৰ্ক, দিশ-জ্ঞান, সাদৃশ্য আৰু শ্ৰেণীবিভাজন সামৰি লোৱা হৈছে। নিয়মীয়া অনুশীলনৰ লগে লগে বেছিভাগ প্ৰশ্ন দ্ৰুতভাৱে সমাধান কৰিব পৰা যায়।","analytical-critical-reasoning":"বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্কত উক্তি আৰু সিদ্ধান্ত, অনুমান, ন্যায়-নিৰ্ণয়, আসন-বিন্যাস আৰু ধাঁধা সামৰি লোৱা হৈছে। ই অনুমানতকৈ সাৱধানে পঢ়াৰ ওপৰত গুৰুত্ব দিয়ে।","non-verbal-reasoning":"চিত্ৰভিত্তিক যুক্তিতৰ্কত চিত্ৰ শ্ৰেণী, দাপোণ আৰু জল প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ আৰু আৰ্হি সম্পূৰ্ণ কৰা সামৰি লোৱা হৈছে। ইয়াত মূলত স্থানিক কল্পনাশক্তি পৰীক্ষা কৰা হয়।",english:"সাধাৰণ ইংৰাজীয়ে ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বুজি-পঢ়াৰ ক্ষমতা পৰীক্ষা কৰে। ই ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাত আহে আৰু নিয়মীয়া পুনৰালোচনাৰে তুলনামূলকভাৱে সহজে নম্বৰ পোৱা যায়।","parts-of-speech":"পদ প্ৰকাৰণত বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া-বিশেষণ, সম্বন্ধবাচক, সংযোজক আৰু আবেগসূচক সামৰি লোৱা হৈছে, আৰু বাক্যত প্ৰতিটোৰ কাৰ্য বৰ্ণনা কৰা হৈছে।",grammar:"ব্যাকৰণত কাল, নিৰ্দেশক, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, প্ৰত্যক্ষ আৰু পৰোক্ষ উক্তি, আৰু সাধাৰণ ভুল চিনাক্তকৰণ সামৰি লোৱা হৈছে।","sentence-structure":"বাক্য গঠনত বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন, আৰু অনুচ্ছেদ সংগঠন আৰু ক্ৰমবিন্যাস সামৰি লোৱা হৈছে।",vocabulary:"শব্দভাণ্ডাৰত সমাৰ্থক শব্দ, বিপৰীত শব্দ, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বাক্যাংশ, আৰু বানান সামৰি লোৱা হৈছে। নিয়মীয়া পঢ়া আৰু চুটি শব্দ-তালিকাই আটাইতকৈ বেছি সহায় কৰে।",computer:"কম্পিউটাৰ সজাগতাই কম্পিউটাৰৰ মূল কথা, ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা প্ৰণালী পৰীক্ষা কৰে। ADRE আৰু অন্যান্য ৰাজ্যিক পৰীক্ষাত ই দ্ৰুত নম্বৰ দিয়া শিতান।","fundamentals-hardware":"কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰত ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ, CPU আৰু কম্পিউটাৰৰ প্ৰজন্ম সামৰি লোৱা হৈছে।","software-os":"ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেমত ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং চিষ্টেমৰ কাৰ্য, ফাইল পৰিচালনা, আৰু Windows আৰু Linux ৰ সাধাৰণ বৈশিষ্ট্য সামৰি লোৱা হৈছে।","ms-office-suite":"MS Office Suite ত Microsoft Word, Excel আৰু PowerPoint সামৰি লোৱা হৈছে, লগতে সঘনাই ব্যৱহৃত মেনু বিকল্প, চৰ্টকাট আৰু সূত্ৰ।","networking-internet":"নেটৱৰ্কিং আৰু ইণ্টাৰনেটত নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'পলজি, IP ঠিকনা, HTTP আৰু FTP ৰ দৰে প্ৰট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা সামৰি লোৱা হৈছে।","cyber-security":"চাইবাৰ সুৰক্ষাত ভাইৰাছ, মেলৱেৰ, ফিশ্বিং আৰু হেকিঙৰ দৰে অনলাইন ভাবুকি, লগতে সুৰক্ষিত ইণ্টাৰনেট অভ্যাস সামৰি লোৱা হৈছে।","dbms-number-shortcuts":"DBMS, সংখ্যা প্ৰণালী আৰু চৰ্টকাটত ডাটাবেছৰ মূল কথা, সংখ্যা প্ৰণালীৰ ৰূপান্তৰ, আৰু কীব'ৰ্ড চৰ্টকাট সামৰি লোৱা হৈছে।",articles:"প্ৰবন্ধবোৰ হৈছে দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন ৰচনা যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লৈছে।","assam-police":"অসম আৰক্ষীৰ বিগত বছৰৰ প্ৰশ্নকাকতে প্ৰকৃত প্ৰশ্নৰ আৰ্হি, কঠিনতা আৰু বাৰে বাৰে অহা বিষয়সমূহ বুজিবলৈ সহায় কৰে। এই পৃষ্ঠাৰ পৰা আপুনি প্ৰশ্নকাকত ডাউনলোড কৰি পৰীক্ষাৰ আগতে অনুশীলন কৰিব পাৰে।","dhs-dme":"DHS আৰু DME ৰ বিগত বছৰৰ প্ৰশ্নকাকতে স্বাস্থ্য সেৱা সঞ্চালকালয় (DHS) আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় (DME) ৰ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।","guwahati-hc":"গুৱাহাটী উচ্চ ন্যায়ালয়ৰ বিগত বছৰৰ প্ৰশ্নকাকতে গ্ৰেড III, গ্ৰেড IV, জুনিয়ৰ সহায়ক আৰু অন্যান্য পদৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।",railway:"ৰে'লৱেৰ বিগত বছৰৰ প্ৰশ্নকাকতে NTPC, Group D, ALP আৰু সম্পৰ্কিত কেন্দ্ৰীয় ৰে'লৱে নিয়োগ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।"},Et={arithmetic:{title:"Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam",meta:"Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.",lead:["Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.","On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."],sections:[{h:"Why arithmetic decides your mathematics score",p:["Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."]},{h:"Arithmetic chapters covered on axomexam",list:["Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.","Percentage — increase and decrease, successive change and percentage-based word problems.","Ratio and Proportion — direct and inverse proportion and division of quantities.","Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.","Average — simple average, weighted average and average age and speed problems.","Time and Work — efficiency, work and wages and pipes and cisterns.","Time, Speed and Distance — relative speed, problems on trains, boats and streams.","Simple and Compound Interest — instalments, growth and depreciation.","Mensuration — area, perimeter, volume and surface area of standard shapes.","Problems on Ages, Partnership and Mixture and Alligation."]},{h:"Most repeated arithmetic chapters in ADRE and Assam Police",p:["Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."]},{h:"How to prepare arithmetic for Assam exams",list:["Learn the formula or short method for a chapter before attempting its questions.","Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.","Keep a formula notebook and revise it for five minutes before each practice session.","Read the explanation for every wrong answer and note the exact reason for the mistake.","Re-attempt the same set after three days and check whether your accuracy has improved.","Take a full timed mock test every week to get used to exam-day pressure."]},{h:"Common mistakes to avoid",list:["Rushing through reading and misreading values such as 'less than' and 'more than'.","Skipping the units and mixing percentages with absolute numbers.","Solving every question the long way instead of using short tricks.","Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."]}],faqs:[{q:"Which arithmetic topics are most important for ADRE 2.0?",a:"Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters."},{q:"How can I improve my speed in arithmetic calculations?",a:"Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it."},{q:"Is arithmetic in Assam Police exams difficult?",a:"No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably."},{q:"Can I practise arithmetic in Assamese on axomexam?",a:"Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages."},{q:"How much time should I give to arithmetic every day?",a:"One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review."},{q:"Is arithmetic practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}]},"non-verbal-reasoning":{title:"Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam",meta:"Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.",lead:["Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.","This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."],sections:[{h:"What non-verbal reasoning actually tests",p:["Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."]},{h:"Non-verbal reasoning chapters covered on axomexam",list:["Image Series — find the next figure by tracking rotation, growth and shading.","Image Analogy — apply the same relationship between a pair of figures.","Image Classification — pick the figure that does not fit the group.","Mirror Images — reflect a figure across a vertical mirror line.","Water Images — reflect a figure across a horizontal water line.","Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.","Embedded Figures — locate a smaller figure hidden inside a larger one.","Completion of Incomplete Pattern — identify the missing piece of a design.","Figure Matrix — follow the row and column logic of a matrix of figures.","Counting of Figures — count triangles, squares or straight lines in a complex figure.","Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.","Rule Detection and Shape Construction."]},{h:"Non-verbal reasoning preparation strategy",list:["Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.","For series questions, check rotation, number of elements, shading and symmetry one by one.","Memorise the dice rule and opposite-face tricks for cube and dice questions.","Solve at least 20 figures a day and note down the rule you missed for each wrong answer.","Use a mirror or folded paper for the first few mirror, water and paper-folding questions.","Attempt figure-based sets in timed blocks to build visual speed."]},{h:"Common mistakes to avoid",list:["Guessing the rule from the first two figures instead of checking it against all figures.","Confusing clockwise and anticlockwise rotation.","Losing track of the number of dots, lines or shaded parts.","Rushing through counting-figures questions, which need a systematic point-by-point count."]}],faqs:[{q:"Is non-verbal reasoning hard to prepare?",a:"No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical."},{q:"Which non-verbal topics are most important for ADRE and Assam Police?",a:"Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently."},{q:"How do I solve cube and dice questions quickly?",a:"Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds."},{q:"Can I practise non-verbal reasoning in Assamese?",a:"Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want."},{q:"How much daily practice does non-verbal reasoning need?",a:"Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning."},{q:"Is non-verbal reasoning practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"verbal-reasoning":{title:"Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam",meta:"Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.",lead:["Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.","This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."],sections:[{h:"Why verbal reasoning is high-scoring",p:["Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."]},{h:"Verbal reasoning chapters covered on axomexam",list:["Analogy — identify the relationship between a given pair of words or numbers.","Classification and Odd One Out — find the item that does not belong to the group.","Number Series, Alphabet Series and Alpha-Numeric Series.","Coding-Decoding — letter, number and symbol based coding rules.","Blood Relations — family trees, generations and coded relationships.","Direction and Distance Test — track movement and find the final direction.","Order and Ranking — arrange people by height, age, marks or position.","Alphabet Test and Word Formation.","Logical Venn Diagrams — decide the correct relationship between sets.","Syllogism — draw valid conclusions from given statements.","Clock and Calendar — angle, hands, odd days and day-of-the-week problems.","Mathematical Operations, Data Sufficiency and Input-Output."]},{h:"Verbal reasoning preparation strategy",list:["Learn the standard rule for each chapter, then solve fifty questions of that chapter.","For series, always check difference, ratio, square, cube and alternating patterns in order.","Draw blood-relation and direction questions on paper instead of solving them mentally.","Memorise the Venn diagram combinations and the odd-days table for calendar questions.","Maintain a log of every question where you guessed, and revise it before the exam.","Practise mixed sets so you learn to switch logic quickly under time pressure."]},{h:"Common mistakes to avoid",list:["Not reading the question carefully — one changed word can change the whole logic.","Assuming extra information that is not given, especially in syllogism.","Mixing up the direction of movement in direction-sense questions.","Spending too long on one puzzle instead of moving on and returning later."]}],faqs:[{q:"Which verbal reasoning topics are most important for ADRE?",a:"Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers."},{q:"Is verbal reasoning easier than non-verbal reasoning?",a:"Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster."},{q:"How do I solve coding-decoding questions quickly?",a:"Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word."},{q:"Can I prepare verbal reasoning in Assamese?",a:"Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading."},{q:"How many reasoning questions should I solve daily?",a:"Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake."},{q:"Is verbal reasoning practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription."}]},"analytical-critical-reasoning":{title:"Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam",meta:"Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.",lead:["Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.","This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."],sections:[{h:"What the analytical and critical section demands",p:["Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."]},{h:"Analytical and critical reasoning chapters covered on axomexam",list:["Seating Arrangement — linear, circular and square arrangements with mixed clues.","Complex Puzzles — floor, box, scheduling, month and category based puzzles.","Inequality — direct and coded inequalities with all possible conclusions.","Statement and Assumptions — identify the implicit assumption behind a statement.","Statement and Conclusions — decide which conclusion logically follows.","Statement and Arguments — judge the strength of arguments for and against.","Statement and Course of Action — choose the most practical response.","Cause and Effect — separate the cause from the effect.","Assertion and Reason — evaluate the link between an assertion and its reason.","Decision Making, Drawing Inferences and Data Sufficiency."]},{h:"Analytical and critical reasoning preparation strategy",list:["For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.","Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.","For assumption and conclusion questions, separate what is stated from what is only implied.","Practise puzzles of increasing difficulty instead of jumping straight to complex sets.","Review the full solution even when your answer was correct, to confirm the reasoning.","Attempt one full puzzle set under a timer every day to build stamina."]},{h:"Common mistakes to avoid",list:["Adding real-world knowledge that is not part of the given passage.","Assuming a conclusion is valid when it is only probably true.","Making a single wrong placement early in a puzzle and then continuing with it.","Spending a large amount of time on one puzzle and losing easy marks elsewhere."]}],faqs:[{q:"Are puzzles and seating arrangement important for ADRE?",a:"Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers."},{q:"How do I improve in statement and conclusion questions?",a:"Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid."},{q:"What is the difference between assumption and conclusion?",a:"An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information."},{q:"How much time should I spend on one puzzle?",a:"If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions."},{q:"Can I practise analytical reasoning in Assamese?",a:"Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer."},{q:"Is analytical reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},science:{title:"General Science Questions for ADRE, Assam Police and SSC | axomexam",meta:"Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.",lead:["General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.","On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."],sections:[{h:"Which science questions are asked",p:["Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."]},{h:"Science chapters covered on axomexam",list:["Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.","Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.","Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."]},{h:"Most repeated science topics in Assam exams",list:["Units and measurements of physical quantities.","Human body systems, especially the digestive, circulatory and nervous systems.","Vitamins, their sources and deficiency diseases.","Common chemical formulae and everyday chemical reactions.","Scientific names, plant and animal classification.","Environment, pollution and ecological terms."]},{h:"General science preparation strategy",list:["Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.","Make short notes of definitions, units and formulae — these are asked directly.","Memorise common abbreviations, vitamins and deficiency diseases in table form.","Practise physics numericals separately, since they need formula application.","Revise the diagrams of important systems and experiments.","Attempt a mixed science set every week to check retention."]},{h:"Common mistakes to avoid",list:["Skipping Biology as 'easy' and losing direct-mark questions.","Confusing units and symbols of similar physical quantities.","Studying from too many sources instead of mastering one standard textbook.","Ignoring everyday-science questions that are based on daily-life observations."]}],faqs:[{q:"What is the standard of science questions in ADRE and Assam Police?",a:"Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus."},{q:"Which science subject is most important for Assam exams?",a:"All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry."},{q:"Do I need to memorise formulas for general science?",a:"Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual."},{q:"Can I study general science in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"How should I revise science before the exam?",a:"Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat."},{q:"Is general science practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},english:{title:"General English Grammar and Vocabulary for ADRE, Assam Police | axomexam",meta:"Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.",lead:["General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.","On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."],sections:[{h:"What general English tests",p:["The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."]},{h:"English chapters covered on axomexam",list:["Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.","Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.","Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.","Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."]},{h:"Most repeated English topics",list:["Subject-verb agreement and common error spotting.","Tenses and their correct usage.","Prepositions and articles.","Synonyms, antonyms and one-word substitutions.","Idioms and phrases with their meanings.","Fill in the blanks and cloze tests."]},{h:"General English preparation strategy",list:["Revise one grammar rule at a time and then solve twenty questions on it.","Read one short passage daily and note unfamiliar words with their meanings.","Learn five new words, five synonyms and three idioms every day.","Practise error-spotting by reading a sentence as a whole before choosing an option.","Revise the rules of articles, prepositions and subject-verb agreement most often.","Attempt a full English set weekly to track your accuracy."]},{h:"Common mistakes to avoid",list:["Choosing an option because it 'sounds correct' instead of applying the rule.","Ignoring articles and prepositions, which are asked every year.","Learning words without usage or example sentences.","Reading the entire comprehension passage before looking at the questions."]}],faqs:[{q:"Is general English easy to score in ADRE?",a:"Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section."},{q:"Which grammar topics are most important?",a:"Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often."},{q:"How can I improve my vocabulary quickly?",a:"Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly."},{q:"Can I study English in Assamese on axomexam?",a:"The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern."},{q:"Is comprehension asked in these exams?",a:"Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions."},{q:"Is general English practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},articles:{title:"Study Articles and Notes for Assam Competitive Exams | axomexam",meta:"Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.",lead:["Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.","The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."],sections:[{h:"How to use the articles section",p:["Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."]},{h:"Article categories available",list:["General Knowledge — Assam history, literature, geography, polity, economy and art and culture.","Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.","General Science — physics, chemistry and biology topics in everyday language.","Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.","General English — grammar rules, vocabulary building and common error patterns.","Computer Awareness — fundamentals, software, MS Office, networking and cyber security."]},{h:"How articles help your exam preparation",list:["They explain the 'why' behind a rule, which helps you apply it to new questions.","They are ideal revision material in the final weeks before the exam.","They connect theory with solved examples from previous papers.","They build the reading habit needed for comprehension and general awareness."]},{h:"Tips to get the most from study articles",list:["Read with a pen and note down key points and formulas.","Attempt the linked practice set immediately after reading.","Revisit the article after a week to test your retention.","Use the bilingual view to strengthen terminology in both English and Assamese."]}],faqs:[{q:"What kind of articles are published on axomexam?",a:"Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams."},{q:"Are the articles useful for ADRE and APSC?",a:"Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers."},{q:"Should I read articles before or after practice questions?",a:"Read the article first to understand the concept, then attempt the linked practice set and review your mistakes."},{q:"Are the articles available in Assamese?",a:"The content is designed to support both Assamese and English readers, and the key terms are explained in both languages."},{q:"How often are new articles added?",a:"New articles are added regularly, so check the page again as you progress through your syllabus."},{q:"Is the articles section free to use?",a:"Yes. Every article and study resource on axomexam.in is completely free with no login or subscription."}]},math:{title:"Mathematics for ADRE, APSC and Assam Police Exams | axomexam",meta:"Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.",lead:["Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.","On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."],sections:[{h:"Why mathematics matters in Assam exams",p:["Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."]},{h:"Mathematics sections covered on axomexam",list:["Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.","Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.","Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."]},{h:"Mathematics preparation strategy",list:["Master the basics of a chapter before moving to its advanced questions.","Learn and apply short tricks instead of solving every question the long way.","Practise with a timer to build the speed the exam demands.","Keep a formula notebook and revise it regularly.","Analyse every wrong answer to find whether the mistake was conceptual or careless.","Take a full maths mock test every week and track your accuracy."]},{h:"Common mistakes to avoid",list:["Attempting advanced questions without clear basics.","Ignoring data interpretation, which offers easy marks for careful readers.","Making calculation errors under time pressure because of skipped approximation practice.","Not practising enough variety of question types."]}],faqs:[{q:"Which mathematics topics are most important for ADRE?",a:"Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks."},{q:"Is advanced math needed for Assam Police and ADRE?",a:"Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math."},{q:"How can I increase my calculation speed?",a:"Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets."},{q:"How much time should I spend on mathematics daily?",a:"One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests."},{q:"Can I practise mathematics in Assamese?",a:"Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English."},{q:"Is mathematics practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},reasoning:{title:"Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam",meta:"Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.",lead:["Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.","Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."],sections:[{h:"Why reasoning is a high-scoring section",p:["Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."]},{h:"Reasoning branches covered on axomexam",list:["Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.","Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.","Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."]},{h:"Reasoning preparation strategy",list:["Learn the rule for a chapter, then solve a set of at least twenty questions on it.","Draw diagrams for arrangements, blood relations and directions instead of solving mentally.","Practise mixed sets to get used to switching logic quickly.","Time every set so that speed improves along with accuracy.","Review wrong answers immediately and note the rule you missed.","Attempt a full reasoning mock test every week."]},{h:"Common mistakes to avoid",list:["Guessing the logic instead of checking it against every part of the question.","Getting stuck on a single puzzle while easier questions wait.","Ignoring non-verbal reasoning because it looks unfamiliar.","Not practising enough variety, so unfamiliar patterns feel difficult in the exam."]}],faqs:[{q:"How many reasoning questions come in ADRE and Assam Police?",a:"The reasoning section usually carries between 15 and 25 questions depending on the post and paper."},{q:"Which reasoning branch is most important?",a:"All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning."},{q:"How can I improve reasoning speed?",a:"Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time."},{q:"Is reasoning difficult for beginners?",a:"No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly."},{q:"Can I prepare reasoning in Assamese?",a:"Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading."},{q:"Is reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},computer:{title:"Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam",meta:"Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.",lead:["Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.","On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."],sections:[{h:"What computer awareness covers",p:["The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."]},{h:"Computer chapters covered on axomexam",list:["Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.","Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.","MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.","Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.","Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.","DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."]},{h:"Most repeated computer topics in Assam exams",list:["Generations of computers and their characteristics.","Input, output and storage devices with examples.","Keyboard shortcuts for common operations.","Basic MS Word and MS Excel functions and formulas.","Full forms of common computer abbreviations.","Types of computer viruses and cyber safety tips."]},{h:"Computer awareness preparation strategy",list:["Make a one-page list of full forms and abbreviations and revise it daily.","Learn the keyboard shortcuts by actually using them on a computer.","Prepare a small table of input, output and storage devices.","Practise basic Excel formulas and Word menu options.","Revise number system conversions with a few examples each.","Attempt a chapter-wise set after studying each topic."]},{h:"Common mistakes to avoid",list:["Ignoring the topic because it seems easy, and then forgetting the full forms.","Mixing up similar terms such as RAM and ROM, or hardware and software.","Not practising shortcuts, which are asked directly every year.","Studying advanced topics while the basics remain unclear."]}],faqs:[{q:"Is computer awareness asked in ADRE and Assam Police?",a:"Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual."},{q:"How much time is needed to prepare computer awareness?",a:"A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual."},{q:"Which computer topics are most important?",a:"Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often."},{q:"Do I need a computer to prepare this section?",a:"A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device."},{q:"Can I study computer awareness in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"Is computer awareness practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]}},za={arithmetic:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে গণিতৰ প্ৰশ্ন আৰু চুটি কৌশল | axomexam",meta:"ADRE 2.0, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া গণিত অনুশীলন। শতাংশ, লাভ-ক্ষতি, অনুপাত, গড়, সময় আৰু কাম, SI আৰু CI — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["প্ৰায় প্ৰতিটো অসম চৰকাৰী নিযুক্তি পৰীক্ষাৰ পৰিমাণাত্মক যোগ্যতা শিতানৰ মূল ভেটি হৈছে গণিত। ADRE গ্ৰেড ৩ আৰু গ্ৰেড ৪, অসম আৰক্ষী কনষ্টেবল আৰু চাব-ইন্সপেক্টৰ, APSC CCE, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয়, SSC আৰু ৰে'লৱেৰ প্ৰশ্নকাকতত একেই মূল গণিত অধ্যায়বোৰ পৰীক্ষা কৰা হয়, আৰু এই প্ৰশ্নবোৰেই প্ৰায়ে নিৰ্ধাৰণ কৰে এজন প্ৰাৰ্থীয়ে কাট-অফ পাৰ কৰিব নে নাই।","axomexam ত বিষয়টো অধ্যায় অনুসৰি সজোৱা হৈছে, যাতে আপুনি ধাপে ধাপে গতি আৰু শুদ্ধতা গঢ়ি তুলিব পাৰে। প্ৰতিটো বিষয় ইংৰাজী আৰু অসমীয়াত সমাধানৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি বেলেগ বেলেগ উত্তৰ মনত ৰখাৰ পৰিৱৰ্তে পৰীক্ষকে বিচৰা সঠিক পদ্ধতিটো শিকে।"],sections:[{h:"কিয় গণিতেই আপোনাৰ নম্বৰ নিৰ্ধাৰণ কৰে",p:["অসমৰ নিযুক্তি প্ৰশ্নকাকতত সংখ্যাগত ক্ষমতাই সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন বহন কৰে আৰু সেই অংশৰ আটাইতকৈ ডাঙৰ ভাগটো গণিতেই। প্ৰশ্নবোৰ সূত্ৰভিত্তিক আৰু পুনৰাবৃত্তিমূলক, যাৰ অৰ্থ হ'ল এজন ভালদৰে অনুশীলন কৰা প্ৰাৰ্থীয়ে ইয়াক দ্ৰুতভাৱে সমাধান কৰি নিৰ্ভৰযোগ্যভাৱে নম্বৰ পাব পাৰে। ৰাজ্যিক আৰু কেন্দ্ৰীয় পৰীক্ষাত একেই অধ্যায়বোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতৰ এটা ভাল প্ৰস্তুতিয়ে একেসময়তে কেইবাটাও পৰীক্ষাত লাভ দিয়ে।"]},{h:"axomexam ত সামৰি লোৱা গণিতৰ অধ্যায়বোৰ",list:["সংখ্যা পদ্ধতি আৰু সৰলীকৰণ — বিভাজ্যতাৰ নিয়ম, HCF, LCM, ভাগশেষ, কৰণী আৰু দ্ৰুত গণনা।","শতাংশ — বৃদ্ধি আৰু হ্ৰাস, ক্ৰমিক পৰিৱৰ্তন আৰু শতাংশভিত্তিক শব্দ সমস্যা।","অনুপাত আৰু সমানুপাত — প্ৰত্যক্ষ আৰু ব্যস্ত সমানুপাত আৰু ৰাশিৰ ভাগ।","লাভ, ক্ষতি আৰু ৰেহাই — ক্ৰয়মূল্য, বিক্ৰয়মূল্য, চিহ্নিত মূল্য, ক্ৰমিক ৰেহাই আৰু অসাধু ব্যৱসায়ীৰ সমস্যা।","গড় — সৰল গড়, ভাৰিত গড় আৰু গড় বয়স তথা গড় বেগৰ সমস্যা।","সময় আৰু কাম — দক্ষতা, কাম আৰু মজুৰি, আৰু নল আৰু চৌবাচ্চা।","সময়, বেগ আৰু দূৰত্ব — আপেক্ষিক বেগ, ৰে'লৰ সমস্যা, নাৱ আৰু সোঁত।","সৰল আৰু চক্ৰবৃদ্ধি সুত — কিস্তি, বৃদ্ধি আৰু অৱক্ষয়।","ক্ষেত্ৰমিতি — প্ৰামাণ্য আকৃতিৰ কালি, পৰিসীমা, আয়তন আৰু পৃষ্ঠকালি।","বয়স, ভাগীদাৰী আৰু মিশ্ৰণ তথা এ্যালিগেচনৰ সমস্যা।"]},{h:"ADRE আৰু অসম আৰক্ষীত সৰ্বাধিক পুনৰাবৃত্তি হোৱা অধ্যায়বোৰ",p:["বিগত প্ৰশ্নকাকতৰ ভিত্তিত তলৰ অধ্যায়বোৰ বাৰে বাৰে আহে আৰু ইয়াক অতিৰিক্তভাৱে পুনৰাবৃত্তি কৰা উচিত: শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত, আৰু ক্ষেত্ৰমিতি। যদি সময় কম, তেন্তে প্ৰথমে এই আঠটা আয়ত্ত কৰক।"]},{h:"অসম পৰীক্ষাৰ বাবে গণিত কেনেদৰে প্ৰস্তুতি কৰিব",list:["এটা অধ্যায়ৰ প্ৰশ্ন কৰাৰ আগতে তাৰ সূত্ৰ বা চুটি পদ্ধতি শিকক।","প্ৰতিদিনে প্ৰতিটো বিষয়ৰ ১৫ৰ পৰা ২০ টা প্ৰশ্ন সমাধান কৰক আৰু ষ্টপৱাচ লৈ নিজৰ সময় জুখক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু প্ৰতিটো অনুশীলনৰ আগতে পাঁচ মিনিট পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু ভুলৰ সঠিক কাৰণটো টুকি লওক।","তিনি দিনৰ পিছত একেই ছেট আকৌ চেষ্টা কৰক আৰু আপোনাৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।","পৰীক্ষাৰ দিনৰ চাপৰ অভ্যাস কৰিবলৈ সপ্তাহে এটা সম্পূৰ্ণ সময়বদ্ধ মক টেষ্ট লওক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["খৰখেদাকৈ পঢ়ি 'কম' আৰু 'বেছি'ৰ দৰে মান ভুলকৈ পঢ়া।","একক এৰি দিয়া আৰু শতাংশক নিৰপেক্ষ সংখ্যাৰ সৈতে মিহলাই পেলোৱা।","চুটি কৌশল ব্যৱহাৰ নকৰি প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান কৰা।","কঠিন যেন লাগে বুলি ক্ষেত্ৰমিতি এৰি দিয়া — ই আটাইতকৈ অনুমানযোগ্য অধ্যায়বোৰৰ এটা।"]}],faqs:[{q:"ADRE 2.0 ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত আৰু ক্ষেত্ৰমিতিয়ে সৰ্বাধিক নম্বৰ বহন কৰে। কমকৈ সোধা অধ্যায়বোৰৰ আগতে এইবোৰ অনুশীলন কৰক।"},{q:"গণিতৰ গণনাত মই মোৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"২০ লৈকে নামতা, ৩০ লৈকে বৰ্গ আৰু শতাংশৰ পৰা ভগ্নাংশলৈ ৰূপান্তৰ ব্যৱহাৰ কৰক। টাইমাৰ লৈ অনুশীলন কৰক আৰু য'ত বিকল্পই অনুমতি দিয়ে ত'ত আসন্ন মান ব্যৱহাৰ কৰক।"},{q:"অসম আৰক্ষীৰ পৰীক্ষাত গণিত কঠিন নেকি?",a:"নহয়। অসম আৰক্ষীৰ গণিত মানক আৰ্হিৰ ওচৰতেই থাকে। নিয়মীয়া অনুশীলন আৰু সঠিক ভেটিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে সম্পূৰ্ণ শিতানটো আৰামেৰে কৰিব পাৰে।"},{q:"axomexam ত অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। আপুনি যিকোনো সময়তে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।"},{q:"প্ৰতিদিনে গণিতক কিমান সময় দিয়া উচিত?",a:"বেছিভাগ প্ৰাৰ্থীৰ বাবে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট। প্ৰথম ২০ মিনিট সূত্ৰত আৰু বাকীখিনি সময়বদ্ধ প্ৰশ্ন তথা ভুল পৰ্যালোচনাত খৰচ কৰক।"},{q:"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।"}]},"non-verbal-reasoning":{title:"ADRE আৰু APSC ৰ বাবে উত্তৰসহ অ-মৌখিক যুক্তি প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে অ-মৌখিক যুক্তি অনুশীলন। চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, ঘনক আৰু পাশা।",lead:["অ-মৌখিক যুক্তিয়ে জুখে আপুনি চিত্ৰ, আৰ্হি, আকৃতি আৰু স্থানিক বিন্যাসৰ দৰে দৃশ্যমান তথ্য কিমান দ্ৰুতভাৱে পঢ়িব পাৰে। ই ভাষা বা শব্দভাণ্ডাৰৰ ওপৰত নিৰ্ভৰ নকৰে, গতিকে নম্বৰ সম্পূৰ্ণৰূপে আপোনাৰ পৰ্যবেক্ষণ শক্তি আৰু অনুশীলনৰ ওপৰত নিৰ্ধাৰিত হয়।","এই শিতান ADRE, অসম আৰক্ষী, APSC CCE, SSC, ৰে'লৱে আৰু বহু অন্য নিযুক্তি পৰীক্ষাত আহে। axomexam ত প্ৰতিটো অধ্যায় স্পষ্ট দৃশ্যমান ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো চিত্ৰৰ পিছৰ নিয়মটো দ্ৰুতভাৱে ধৰা পেলাবলৈ চকু প্ৰশিক্ষণ দিব পাৰে।"],sections:[{h:"অ-মৌখিক যুক্তিয়ে প্ৰকৃততে কি পৰীক্ষা কৰে",p:["প্ৰতিটো প্ৰশ্নই এটা ক্ৰম বা চিত্ৰৰ এটা গোট দেখুৱায় আৰু আপোনাক পৰৱৰ্তী চিত্ৰ, অদ্ভুত চিত্ৰ বা লুকাই থকা চিত্ৰ বিচাৰিবলৈ কয়। অন্তৰ্নিহিত নিয়মটোত ঘূৰ্ণন, প্ৰতিফলন, অংশ যোগ বা বাদ, ছাঁ দিয়া, বা উপাদানৰ গতি জড়িত থাকিব পাৰে। এবাৰ নিয়মটো চিনি পোৱাৰ পিছত উত্তৰটো প্ৰায় যান্ত্ৰিকভাৱে আহে — সেয়ে এই শিতানটো অতি উচ্চ-নম্বৰ হ'ব পাৰে।"]},{h:"axomexam ত সামৰি লোৱা অ-মৌখিক যুক্তিৰ অধ্যায়বোৰ",list:["চিত্ৰ শ্ৰেণী — ঘূৰ্ণন, বৃদ্ধি আৰু ছাঁ ট্ৰেক কৰি পৰৱৰ্তী চিত্ৰ বিচাৰক।","চিত্ৰ সাদৃশ্য — চিত্ৰৰ এযোৰৰ মাজৰ একেই সম্পৰ্ক প্ৰয়োগ কৰক।","চিত্ৰ শ্ৰেণীবিভাগ — গোটত নিমিলা চিত্ৰটো বাছনি কৰক।","দাপোনৰ প্ৰতিবিম্ব — উলম্ব দাপোন ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","পানীৰ প্ৰতিবিম্ব — অনুভূমিক পানী ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","কাগজ ভাঁজ আৰু কাগজ কটা — মেলি দিয়াৰ পিছত ফুটাৰ আৰ্হিটো কল্পনা কৰক।","অন্তৰ্নিহিত চিত্ৰ — ডাঙৰ চিত্ৰ এটাত লুকাই থকা সৰু চিত্ৰটো বিচাৰক।","অসম্পূৰ্ণ আৰ্হিৰ সম্পূৰ্ণতা — এটা আৰ্হিৰ নোহোৱা টুকুৰাটো চিনি পেলাওক।","চিত্ৰ মেট্ৰিক্স — চিত্ৰৰ মেট্ৰিক্স এটাৰ শাৰী আৰু স্তম্ভৰ যুক্তি অনুসৰণ কৰক।","চিত্ৰ গণনা — এটা জটিল চিত্ৰত ত্ৰিভুজ, বৰ্গ বা সৰল ৰেখা গণনা কৰক।","ঘনক আৰু পাশা — ৰঙ কৰা ঘনক, পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ সমস্যা সমাধান কৰক।","নিয়ম চিনাক্তকৰণ আৰু আকৃতি নিৰ্মাণ।"]},{h:"অ-মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো অধ্যায় চিত্ৰ নিজে আঁকি অনুশীলন কৰক; চকুৰ দৰেই হাতেও আৰ্হিটো শিকে।","শ্ৰেণীৰ প্ৰশ্নৰ বাবে এটা এটাকৈ ঘূৰ্ণন, উপাদানৰ সংখ্যা, ছাঁ আৰু প্ৰতিসমতা পৰীক্ষা কৰক।","ঘনক আৰু পাশাৰ প্ৰশ্নৰ বাবে পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ কৌশল মনত ৰাখক।","প্ৰতিদিনে অন্ততঃ ২০ টা চিত্ৰ সমাধান কৰক আৰু প্ৰতিটো ভুল উত্তৰৰ বাবে হেৰুওৱা নিয়মটো টুকি লওক।","প্ৰথম কেইটা দাপোন, পানী আৰু কাগজ ভাঁজৰ প্ৰশ্নৰ বাবে এখন দাপোন বা ভাঁজ কৰা কাগজ ব্যৱহাৰ কৰক।","দৃশ্যমান গতি গঢ়িবলৈ চিত্ৰভিত্তিক ছেট সময়বদ্ধ খণ্ডত চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["সকলো চিত্ৰৰ সৈতে পৰীক্ষা নকৰি প্ৰথম দুটা চিত্ৰৰ পৰা নিয়ম অনুমান কৰা।","ঘড়ীৰ কাঁটাৰ দিশ আৰু বিপৰীত দিশ লৈ খেলিমেলি কৰা।","বিন্দু, ৰেখা বা ছাঁ দিয়া অংশৰ সংখ্যাৰ হিচাপ হেৰুওৱা।","চিত্ৰ গণনাৰ প্ৰশ্নত খৰখেদা কৰা, যিবোৰত পদ্ধতিগতভাৱে বিন্দু-বিন্দু গননা প্ৰয়োজন।"]}],faqs:[{q:"অ-মৌখিক যুক্তি প্ৰস্তুতি কৰা কঠিন নেকি?",a:"নহয়। ই প্ৰতিভাতকৈ ধাৰাবাহিক অনুশীলনক পুৰস্কৃত কৰে। এবাৰ মানক নিয়মৰ প্ৰকাৰবোৰ শিকিলে বেছিভাগ প্ৰশ্ন দ্ৰুত আৰু যান্ত্ৰিক হৈ পৰে।"},{q:"ADRE আৰু অসম আৰক্ষীৰ বাবে কোনবোৰ অ-মৌখিক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"চিত্ৰ শ্ৰেণী, সাদৃশ্য, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ আৰু চিত্ৰ গণনা সৰ্বাধিক বাৰে সোধা হয়।"},{q:"ঘনক আৰু পাশাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"সংলগ্ন আৰু বিপৰীত পৃষ্ঠৰ বাবে পাশাৰ নিয়ম আৰু ৰঙ কৰা ঘনকৰ বাবে গণনাৰ নিয়ম শিকক। এই দুটা পদ্ধতিৰে বেছিভাগ প্ৰশ্ন কেইছেকেণ্ডতে সমাধান কৰিব পাৰি।"},{q:"মই অসমীয়াত অ-মৌখিক যুক্তি অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে আৰু যেতিয়া বিচাৰে সলনি কৰিব পাৰে।"},{q:"অ-মৌখিক যুক্তিৰ বাবে দৈনিক কিমান অনুশীলন প্ৰয়োজন?",a:"প্ৰতিদিনে বিশৰ পৰা ত্ৰিশটা চিত্ৰ যথেষ্ট। দৃশ্যমান যুক্তিৰ বাবে নিয়মীয়া চুটি অৱস্থান মাজে মাজে দীঘল অৱস্থানতকৈ ভাল কাম কৰে।"},{q:"axomexam ত অ-মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"verbal-reasoning":{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে মৌখিক যুক্তি প্ৰশ্ন আৰু অনুশীলন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া মৌখিক যুক্তি অনুশীলন। সাদৃশ্য, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।",lead:["মৌখিক যুক্তিয়ে পৰীক্ষা কৰে আপুনি শব্দ, সংখ্যা আৰু আখৰৰ আৰ্হি কিমান ভালদৰে বিচাৰি পায় আৰু এটা বিবৃতিৰ সংহতি কিমান যুক্তিসংগতভাৱে অনুসৰণ কৰিব পাৰে। যুক্তিৰ শিতানৰ আটাইতকৈ নিৰ্ভৰযোগ্য নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা, কাৰণ আৰ্হিবোৰ বছৰৰ পিছত বছৰ পুনৰাবৃত্তি হয়।","এই পৃষ্ঠাই ADRE, অসম আৰক্ষী, APSC CCE, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে সম্পূৰ্ণ মৌখিক যুক্তিৰ পাঠ্যক্ৰম সামৰি লয়। প্ৰতিটো অধ্যায় ধাপে ধাপে দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো উত্তৰৰ পিছৰ যুক্তিটো বুজি পায়।"],sections:[{h:"কিয় মৌখিক যুক্তি উচ্চ-নম্বৰ",p:["বেছিভাগ মৌখিক যুক্তি প্ৰশ্নই এক নিৰ্দিষ্ট নিয়মৰ গোট অনুসৰণ কৰে — বিগত প্ৰশ্নকাকতত অহা একেই যুক্তি। বিশেষকৈ সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ আৰু শ্ৰেণী মুষ্টিমেয় কৌশলৰে আয়ত্ত কৰিব পাৰি। এবাৰ নিয়মবোৰ স্পষ্ট হ'লে এই প্ৰশ্নবোৰে কম সময় লয় আৰু কেতিয়াও ভুল নহয়।"]},{h:"axomexam ত সামৰি লোৱা মৌখিক যুক্তিৰ অধ্যায়বোৰ",list:["সাদৃশ্য — শব্দ বা সংখ্যাৰ এযোৰৰ মাজৰ সম্পৰ্ক চিনি পেলাওক।","শ্ৰেণীবিভাগ আৰু অদ্ভুত এটাক বাছনি কৰা — গোটত নিমিলা বস্তুটো বিচাৰক।","সংখ্যা শ্ৰেণী, বৰ্ণমালা শ্ৰেণী আৰু বৰ্ণ-সংখ্যা শ্ৰেণী।","সংকেত-অৱগুঞ্জন — আখৰ, সংখ্যা আৰু সংকেতভিত্তিক সংকেতৰ নিয়ম।","ৰক্তসম্পৰ্ক — পৰিয়াল বৃক্ষ, প্ৰজন্ম আৰু সংকেতযুক্ত সম্পৰ্ক।","দিশ আৰু দূৰত্ব পৰীক্ষা — গতি ট্ৰেক কৰক আৰু চূড়ান্ত দিশ বিচাৰক।","ক্ৰম আৰু স্থান — উচ্চতা, বয়স, নম্বৰ বা অৱস্থান অনুসৰি মানুহ সজাওক।","বৰ্ণমালা পৰীক্ষা আৰু শব্দ গঠন।","যুক্তিসংগত ভেন ডায়াগ্ৰাম — গোটৰ মাজৰ সঠিক সম্পৰ্ক নিৰ্ণয় কৰক।","ন্যায়বাক্য — দিয়া বিবৃতিবোৰৰ পৰা বৈধ সিদ্ধান্ত উলিয়াওক।","ঘড়ী আৰু পঞ্জিকা — কোণ, কাঁটা, অদ্ভুত দিন আৰু সপ্তাহৰ দিনৰ সমস্যা।","গাণিতিক কাৰ্য, তথ্য পৰ্যাপ্ততা আৰু ইনপুট-আউটপুট।"]},{h:"মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো অধ্যায়ৰ মানক নিয়ম শিকক, তাৰ পিছত সেই অধ্যায়ৰ পঞ্চাশটা প্ৰশ্ন সমাধান কৰক।","শ্ৰেণীৰ বাবে সদায় ক্ৰমে পাৰ্থক্য, অনুপাত, বৰ্গ, ঘনক আৰু পৰ্যায়ক্ৰমে সলনি হোৱা আৰ্হি পৰীক্ষা কৰক।","ৰক্তসম্পৰ্ক আৰু দিশৰ প্ৰশ্ন মনত সমাধান নকৰি কাগজত আঁকক।","ভেন ডায়াগ্ৰামৰ সংযোগ আৰু পঞ্জিকাৰ প্ৰশ্নৰ বাবে অদ্ভুত দিনৰ তালিকা মনত ৰাখক।","য'ত অনুমান কৰিছে তেনে প্ৰতিটো প্ৰশ্নৰ এখন লগ ৰাখক আৰু পৰীক্ষাৰ আগতে পুনৰাবৃত্তি কৰক।","মিশ্ৰ ছেট অনুশীলন কৰক, যাতে সময়ৰ চাপত যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ শিকে।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["প্ৰশ্নটো মন কৰি নপঢ়া — এটা শব্দ সলনি হ'লে গোটেই যুক্তিটো সলনি হ'ব পাৰে।","বিশেষকৈ ন্যায়বাক্যত নিদিয়া অতিৰিক্ত তথ্য ধৰি লোৱা।","দিশ অনুভৱৰ প্ৰশ্নত গতিৰ দিশ ওলোটাই পেলোৱা।","এটা ধাঁধাত বেছি সময় খৰচ কৰা, পিছত ঘূৰি অহাৰ পৰিৱৰ্তে।"]}],faqs:[{q:"ADRE ৰ বাবে কোনবোৰ মৌখিক যুক্তিৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, সাদৃশ্য আৰু শ্ৰেণীবিভাগ ADRE আৰু অসম আৰক্ষীৰ প্ৰশ্নকাকতত সৰ্বাধিক বাৰে সোধা হয়।"},{q:"মৌখিক যুক্তি অ-মৌখিক যুক্তিতকৈ সহজ নেকি?",a:"বহু প্ৰাৰ্থীয়ে মৌখিক যুক্তিক সহজ পায় কাৰণ নিয়মবোৰ স্পষ্টভাৱে নিৰ্ধাৰিত। ব্যক্তিগত শক্তি বেলেগ বেলেগ, গতিকে দুয়োটা অনুশীলন কৰি দেখক আপুনি ক'ত দ্ৰুত নম্বৰ পায়।"},{q:"সংকেত-অৱগুঞ্জনৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"দিয়া শব্দটো তাৰ সংকেতৰ সৈতে তুলনা কৰক আৰু আখৰ তথা সংখ্যাৰ অৱস্থানৰ পৰিৱৰ্তন মন কৰক। এবাৰ পৰিৱৰ্তনটো চিনি পোৱাৰ পিছত নতুন শব্দত প্ৰয়োগ কৰক।"},{q:"মই অসমীয়াত মৌখিক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত উপলব্ধ, আৰু পঢ়ি থাকোঁতে আপুনি ভাষা সলনি কৰিব পাৰে।"},{q:"প্ৰতিদিনে কিমান যুক্তিৰ প্ৰশ্ন সমাধান কৰা উচিত?",a:"দুই বা তিনি অধ্যায়ৰ পঞ্চাশৰ পৰা ষাঠিটা প্ৰশ্ন এটা সুস্থ দৈনিক লক্ষ্য, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{q:"axomexam ত মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"analytical-critical-reasoning":{title:"ADRE আৰু APSC ৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন | axomexam",meta:"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন। আসন বিন্যাস, ধাঁধা, বিবৃতি আৰু ধাৰণা, সিদ্ধান্ত, দাবী আৰু কাৰণ।",lead:["বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিয়ে জুখে আপুনি তথ্য কিমান ভালদৰে সজাই ৰাখিব পাৰে আৰু তৰ্ক কিমান ভালদৰে বিচাৰ কৰিব পাৰে। ইয়াত আসন বিন্যাস, জটিল ধাঁধা, সংকেতযুক্ত অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়বোৰ সামৰি লোৱা হয়।","যুক্তিৰ এই অংশটোৱেই সেই ঠাই য'ত খৰখেদাকৈ অনুমান কৰাতকৈ সাৱধানে পঢ়াটো বেছি গুৰুত্বপূৰ্ণ। axomexam ত প্ৰতিটো অধ্যায়ত সমাধান কৰা উদাহৰণ আৰু বিশদ দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেট আছে, যাতে দিয়া বিবৃতিবোৰৰ পৰা এটা সিদ্ধান্ত কেনেদৰে ওলায় আপুনি সঠিকভাৱে দেখিব পাৰে।"],sections:[{h:"বিশ্লেষণাত্মক আৰু সমালোচনাত্মক শিতানে কি বিচাৰে",p:["ধাঁধা আৰু বিন্যাসৰ প্ৰশ্নই চৰ্তৰ এটা গোট অনুসৰি মানুহ বা বস্তু ৰাখিবলৈ আপোনাৰ ক্ষমতা পৰীক্ষা কৰে। বিবৃতিভিত্তিক অধ্যায়বোৰে কি বুজোৱা হৈছে, কি ধৰি লোৱা হৈছে, কি শক্তিশালী বা দুৰ্বল কৰা হৈছে সেই বিষয়ে আপোনাৰ বিচাৰ পৰীক্ষা কৰে।"]},{h:"axomexam ত সামৰি লোৱা বিশ্লেষণাত্মক যুক্তিৰ অধ্যায়বোৰ",list:["আসন বিন্যাস — ৰৈখিক, বৃত্তাকাৰ আৰু জটিল শাৰী বিন্যাস।","ধাঁধা — বিষয়ভিত্তিক বিন্যাস, গোট আৰু দিন-ভিত্তিক ধাঁধা।","সংকেতযুক্ত অসমতা আৰু গাণিতিক অসমতা।","বিবৃতি আৰু ধাৰণা — লুকাই থকা ধাৰণাটো চিনি পেলাওক।","বিবৃতি আৰু সিদ্ধান্ত, বিবৃতি আৰু কাৰ্যপন্থা।","তৰ্ক — শক্তিশালী আৰু দুৰ্বল তৰ্ক চিনাক্ত কৰক।","কাৰণ আৰু প্ৰভাৱ, আৰু উপযুক্ত যুক্তি।"]},{h:"বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো ধাঁধাৰ চৰ্তবোৰ তালিকাত লিখি চিত্ৰ বা টেবুল হিচাপে সজাওক।","সম্ভাৱ্য অৱস্থানবোৰ বাদ দি আগবাঢ়ক, যাতে এটা সঠিক বিন্যাসত উপনীত হয়।","বিবৃতিভিত্তিক প্ৰশ্নৰ বাবে প্ৰদত্ত তথ্যৰ বাহিৰে আন একো ধৰি নল'ব।","তৰ্কৰ প্ৰশ্নত দাবীটো আৰু তাৰ কাৰণ সুকীয়াকৈ চিনি পেলাওক।","প্ৰতিদিনে এটা জটিল ধাঁধা সময়বদ্ধভাৱে সমাধান কৰক।","ভুল উত্তৰবোৰ বিশ্লেষণ কৰি কি চৰ্ত হেৰুওৱা হ'ল চিনি পেলাওক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["চৰ্তবোৰ মনত ৰাখি সমাধান কৰাৰ পৰিৱৰ্তে প্ৰথম অৱস্থানতে অনুমান কৰা।","বিবৃতিভিত্তিক প্ৰশ্নত নিদিয়া তথ্য ধৰি লোৱা।","ধাঁধাৰ এটা অংশ পাহৰি গৈ ভুল বিন্যাসত উপনীত হোৱা।","এটা কঠিন ধাঁধাত বেছি সময় খৰচ কৰি সহজ প্ৰশ্ন এৰি দিয়া।"]}],faqs:[{q:"বিশ্লেষণাত্মক যুক্তি কঠিন নেকি?",a:"ই ধৈৰ্য আৰু পদ্ধতিগত চিন্তাৰ ওপৰত নিৰ্ভৰ কৰে। নিয়মীয়া অনুশীলনৰ সৈতে ই যুক্তিৰ শিতানৰ এটা নিৰ্ভৰযোগ্য নম্বৰৰ উৎস হৈ পৰে।"},{q:"ADRE আৰু APSC ৰ বাবে কোনবোৰ বিশ্লেষণাত্মক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"আসন বিন্যাস, ধাঁধা, সংকেতযুক্ত অসমতা, বিবৃতি-সিদ্ধান্ত আৰু তৰ্ক সৰ্বাধিক বাৰে সোধা হয়।"},{q:"ধাঁধাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"চৰ্তবোৰ এটা টেবুলত লিখক আৰু প্ৰতিটো সম্ভাৱনা বাদ দি আগবাঢ়ক। এটা বা দুটা সম্ভাৱনা আঁচি ল'লে বাকীখিনি সহজে ওলায়।"},{q:"মই অসমীয়াত বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{q:"দৈনিক কিমান সময় দিয়া উচিত?",a:"দিনে এঘণ্টা ধাঁধা আৰু বিবৃতিভিত্তিক প্ৰশ্নত দিয়া উচিত, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{q:"axomexam ত বিশ্লেষণাত্মক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},science:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে সাধাৰণ বিজ্ঞান প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া সাধাৰণ বিজ্ঞান অনুশীলন। পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["সাধাৰণ বিজ্ঞান ADRE, অসম আৰক্ষী, APSC, SSC, ৰে'লৱে আৰু প্ৰায় প্ৰতিটো অসম ৰাজ্যিক নিযুক্তি পৰীক্ষাৰ সাধাৰণ জ্ঞান শিতানৰ এটা নিশ্চিত অংশ। প্ৰশ্নবোৰ সাধাৰণতে ধাৰণাভিত্তিক আৰু দৈনন্দিন জীৱনৰ সৈতে জড়িত, গতিকে সঠিক প্ৰস্তুতিৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ বিজ্ঞানত বিভক্ত। প্ৰতিটো অধ্যায়ৰ প্ৰশ্নৰ সৈতে স্পষ্ট দ্বিভাষিক ব্যাখ্যা আছে, যাতে আপুনি কেৱল উত্তৰ মনত নৰখি ধাৰণাটোও বুজি পায়।"],sections:[{h:"কিয় সাধাৰণ বিজ্ঞান গুৰুত্বপূৰ্ণ",p:["অসমৰ নিযুক্তি পৰীক্ষাত সাধাৰণ বিজ্ঞানৰ প্ৰশ্নই সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ গঠন কৰে। প্ৰশ্নবোৰ সাধাৰণতে দৈনন্দিন পৰিঘটনা, স্বাস্থ্য, খাদ্য, শক্তি আৰু পৰিৱেশৰ ওপৰত আধাৰিত, গতিকে সাধাৰণ বুজবুজৰ সৈতে বেছিভাগ প্ৰশ্নৰ উত্তৰ দিব পাৰি।"]},{h:"axomexam ত সামৰি লোৱা বিজ্ঞানৰ অধ্যায়বোৰ",list:["পদাৰ্থ বিজ্ঞান — গতি, বল, শক্তি, কাম, তাপ, পোহৰ, শব্দ আৰু বিদ্যুৎ।","ৰসায়ন — পদাৰ্থৰ প্ৰকাৰ, পৰমাণু, অণু, মৌল, যৌগ, মিশ্ৰণ আৰু দৈনন্দিন ৰসায়ন।","জীৱ বিজ্ঞান — কোষ, উদ্ভিদ, প্ৰাণী, মানৱ শৰীৰ, ৰোগ আৰু পুষ্টি।","পৰিৱেশ বিজ্ঞান — পৰিৱেশ তন্ত্ৰ, প্ৰদূষণ, জৈৱ বৈচিত্ৰ্য আৰু সংৰক্ষণ।","বৈজ্ঞানিক যন্ত্ৰ আৰু একক, আৰু আৱিষ্কাৰ তথা আৱিষ্কাৰক।"]},{h:"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা বিজ্ঞানৰ বিষয়",list:["মানৱ শৰীৰৰ অংগ আৰু তন্ত্ৰ।","ৰোগ আৰু সিহঁতৰ কাৰণ তথা প্ৰতিষেধক।","পুষ্টি, ভিটামিন আৰু সিহঁতৰ অভাৱজনিত ৰোগ।","বিদ্যুৎ আৰু চুম্বকত্বৰ মূল ধাৰণা।","দৈনন্দিন জীৱনত ব্যৱহৃত ৰাসায়নিক যৌগ।","প্ৰদূষণৰ প্ৰকাৰ আৰু ইয়াৰ প্ৰভাৱ।"]},{h:"বিজ্ঞান প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো ধাৰণা দৈনন্দিন জীৱনৰ উদাহৰণৰ সৈতে সংযোগ কৰক।","গুৰুত্বপূৰ্ণ সূত্ৰ, একক আৰু প্ৰতীকৰ এখন চুটি টোকা প্ৰস্তুত কৰক।","ভিটামিন, ৰোগ আৰু যন্ত্ৰৰ তালিকা টেবুল হিচাপে বনাই পুনৰাবৃত্তি কৰক।","প্ৰতিদিনে এটা অধ্যায়ৰ প্ৰশ্ন অনুশীলন কৰক।","ভুল উত্তৰবোৰৰ কাৰণ বিশ্লেষণ কৰক।","সাপ্তাহিকভাৱে এটা মিশ্ৰ ছেট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["একক আৰু জোখ-মাখৰ প্ৰতি মন নিদিয়া।","পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ ধাৰণা মিহলাই পেলোৱা।","কেৱল তথ্য মনত ৰখা, ধাৰণাটো নুবুজা।","দৈনন্দিন বিজ্ঞানৰ প্ৰশ্নক হেয়জ্ঞান কৰা — এইবোৰেই সৰ্বাধিক বাৰে আহে।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত সাধাৰণ বিজ্ঞান কিমান গুৰুত্বপূৰ্ণ?",a:"সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ সাধাৰণ বিজ্ঞানৰ, আৰু ই সহজে নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা।"},{q:"বিজ্ঞানৰ বাবে কোনবোৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"মানৱ শৰীৰ, পুষ্টি আৰু ভিটামিন, ৰোগ, বিদ্যুৎৰ মূল ধাৰণা আৰু প্ৰদূৰ্ণ সৰ্বাধিক বাৰে সোধা হয়।"},{q:"বিজ্ঞান প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?",a:"সঠিক ধাৰণাৰ সৈতে দুইৰ পৰা তিনিটা সপ্তাহৰ নিয়মীয়া পুনৰাবৃত্তি বেছিভাগ প্ৰাৰ্থীৰ বাবে যথেষ্ট।"},{q:"মই অসমীয়াত বিজ্ঞান পঢ়িব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{q:"ৰসায়নৰ বাবে পৃথক প্ৰস্তুতি প্ৰয়োজন নেকি?",a:"পৃথকভাৱে বেছি নহয়, কিন্তু দৈনন্দিন ৰসায়ন আৰু মূল মৌল তথা যৌগবোৰ ভালদৰে জনাটো প্ৰয়োজন।"},{q:"axomexam ত বিজ্ঞানৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},english:{title:"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে সাধাৰণ ইংৰাজী | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া সাধাৰণ ইংৰাজী অনুশীলন। ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বোধগম্যতা — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["সাধাৰণ ইংৰাজী ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা স্থিৰ আৰু কম-ঝুঁকিৰ নম্বৰ দিয়া শিতান। ইয়াত ব্যাকৰণ, শব্দভাণ্ডাৰ আৰু বোধগম্যতা পৰীক্ষা কৰা হয়, আৰু নিয়মবোৰ জনাৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো ব্যাকৰণ, বক্তৃতাৰ অংশ, বাক্য গঠন আৰু শব্দভাণ্ডাৰত সজোৱা হৈছে, অনুশীলন প্ৰশ্ন আৰু স্পষ্ট ব্যাখ্যাৰ সৈতে।"],sections:[{h:"সাধাৰণ ইংৰাজীয়ে কি পৰীক্ষা কৰে",p:["এই শিতানে পৰীক্ষা কৰে আপুনি ব্যৱহাৰত থকা সঠিক ব্যাকৰণ চিনি পায় নেকি, খালী ঠাইত সঠিক শব্দ বাছনি কৰিব পাৰে নেকি, বাক্যত ভুল ধৰা পেলাব পাৰে নেকি, আৰু এটা অনুচ্ছেদৰ অৰ্থ বুজিব পাৰে নেকি।"]},{h:"axomexam ত সামৰি লোৱা ইংৰাজীৰ অধ্যায়বোৰ",list:["ব্যাকৰণ — কাল, articles, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি।","বক্তৃতাৰ অংশ — বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া বিশেষণ, পূৰ্বসৰ্গ, সংযোজক আৰু আবেগসূচক।","বাক্য গঠন — বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন আৰু অনুচ্ছেদ ক্ৰম।","শব্দভাণ্ডাৰ — সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বানান।"]},{h:"সৰ্বাধিক পুনৰাবৃত্তি হোৱা ইংৰাজীৰ বিষয়",list:["কৰ্তা-ক্ৰিয়াৰ মিল আৰু সাধাৰণ ভুল চিনাক্তকৰণ।","কাল আৰু সিহঁতৰ সঠিক ব্যৱহাৰ।","পূৰ্বসৰ্গ আৰু articles।","সমাৰ্থক, বিপৰীত আৰু এক-শব্দ প্ৰতিস্থাপন।","বাগধাৰা আৰু সিহঁতৰ অৰ্থ।","খালী ঠাই পূৰণ আৰু ক্ল'জ টেষ্ট।"]},{h:"সাধাৰণ ইংৰাজী প্ৰস্তুতিৰ কৌশল",list:["এক সময়ত এটা ব্যাকৰণৰ নিয়ম পুনৰাবৃত্তি কৰক আৰু তাৰ ওপৰত বিশটা প্ৰশ্ন সমাধান কৰক।","প্ৰতিদিনে এটা চুটি অনুচ্ছেদ পঢ়ক আৰু অপৰিচিত শব্দ আৰু সিহঁতৰ অৰ্থ টুকি লওক।","প্ৰতিদিনে পাঁচটা নতুন শব্দ, পাঁচটা সমাৰ্থক আৰু তিনিটা বাগধাৰা শিকক।","বিকল্প বাছনি কৰাৰ আগতে বাক্যটো সম্পূৰ্ণ পঢ়ি ভুল চিনাক্তকৰণৰ অভ্যাস কৰক।","articles, পূৰ্বসৰ্গ আৰু কৰ্তা-ক্ৰিয়াৰ মিলৰ নিয়ম সৰ্বাধিক বাৰে পুনৰাবৃত্তি কৰক।","আপোনাৰ শুদ্ধতা জুখিবলৈ সপ্তাহে এটা সম্পূৰ্ণ ইংৰাজী ছেট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["নিয়ম প্ৰয়োগ নকৰি 'শুদ্ধ যেন শুনা যায়' বুলি বিকল্প বাছনি কৰা।","articles আৰু পূৰ্বসৰ্গ এৰি দিয়া, যিবোৰ প্ৰতি বছৰে সোধা হয়।","ব্যৱহাৰ বা উদাহৰণ বাক্য নোহোৱাকৈ শব্দ শিকা।","প্ৰশ্ন চোৱাৰ আগতে গোটেই বোধগম্যতাৰ অনুচ্ছেদ পঢ়া।"]}],faqs:[{q:"ADRE ত সাধাৰণ ইংৰাজীত নম্বৰ লাভ কৰা সহজ নেকি?",a:"হয়। পাঠ্যক্ৰম সীমিত আৰু নিয়মভিত্তিক, গতিকে নিয়মীয়া পুনৰাবৃত্তিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে এই শিতানত গড়তকৈ ভাল নম্বৰ পাব পাৰে।"},{q:"কোনবোৰ ব্যাকৰণৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"কাল, কৰ্তা-ক্ৰিয়াৰ মিল, articles, পূৰ্বসৰ্গ, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি সৰ্বাধিক বাৰে সোধা হয়।"},{q:"মই শব্দভাণ্ডাৰ দ্ৰুতভাৱে কেনেদৰে উন্নত কৰিম?",a:"প্ৰতিদিনে সৰু সৰু গোটত শব্দ আৰু সিহঁতৰ ব্যৱহাৰ শিকক, আৰু সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন তথা বাগধাৰা নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।"},{q:"axomexam ত অসমীয়াত ইংৰাজী পঢ়িব পাৰিম নেকি?",a:"ব্যাখ্যাবোৰ দ্বিভাষিক, যাতে দুয়ো ভাষাত নিয়মটো স্পষ্ট হয়, আৰু প্ৰশ্নবোৰে ইংৰাজী পৰীক্ষাৰ আৰ্হি অনুসৰণ কৰে।"},{q:"এই পৰীক্ষাবোৰত বোধগম্যতা সোধা হয় নেকি?",a:"হয়, বহু প্ৰশ্নকাকতত প্ৰত্যক্ষ ব্যাকৰণ আৰু শব্দভাণ্ডাৰৰ প্ৰশ্নৰ লগতে এটা চুটি পঢ়া-বোধগম্যতাৰ অনুচ্ছেদও থাকে।"},{q:"axomexam ত সাধাৰণ ইংৰাজীৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},articles:{title:"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া অধ্যয়ন প্ৰবন্ধ | axomexam",meta:"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া উচ্চমানৰ অধ্যয়ন প্ৰবন্ধ পঢ়ক। সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰৰ দীঘলীয়া টোকা।",lead:["axomexam ৰ প্ৰবন্ধবোৰ হৈছে দীঘলীয়া অধ্যয়ন সামগ্ৰী, যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। এইবোৰ প্ৰশ্ন কৰাৰ আগতে ধাৰণাগত স্পষ্টতা গঢ়িবলৈ লিখা হয়, যাৰ ফলত নতুন বিষয় আৰম্ভ কৰিবলৈ বা বাৰে বাৰে ভুল হোৱা বিষয় পুনৰাবৃত্তি কৰিবলৈ এইবোৰ উপযুক্ত।","সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তিৰ ক্ষমতা, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লয়, গতিকে দুৰ্বল ক্ষেত্ৰ শক্তিশালী কৰিবলৈ বা চিনাকি বিষয়ৰ দ্ৰুত পুনৰাবৃত্তিৰ বাবে উপযুক্ত প্ৰবন্ধ সদায় থাকে।"],sections:[{h:"প্ৰবন্ধ শিতান কেনেদৰে ব্যৱহাৰ কৰিব",p:["ধাৰণাটো বুজিবলৈ এবাৰ প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক। প্ৰবন্ধবোৰ জাণী সৰল আৰু উদাহৰণমুখী ৰখা হয়, যাতে পৰীক্ষাত এটা একেধৰণৰ প্ৰশ্ন দেখিলে ধাৰণাটো আপোনাৰ লগত থাকে।"]},{h:"উপলব্ধ প্ৰবন্ধৰ শ্ৰেণীবোৰ",list:["সাধাৰণ জ্ঞান — অসমৰ ইতিহাস, সাহিত্য, ভূগোল, ৰাজনীতি, অৰ্থনীতি আৰু কলা তথা সংস্কৃতি।","গণিত — পাটিগণিত, উন্নত গণিত আৰু তথ্য বিশ্লেষণৰ ধাৰণা ধাপে ধাপে ব্যাখ্যা।","সাধাৰণ বিজ্ঞান — পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ বিষয় দৈনন্দিন ভাষাত।","যুক্তিৰ ক্ষমতা — মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিৰ কৌশল।","সাধাৰণ ইংৰাজী — ব্যাকৰণৰ নিয়ম, শব্দভাণ্ডাৰ গঢ়া আৰু সাধাৰণ ভুলৰ আৰ্হি।","কম্পিউটাৰ সজাগতা — মূল কথা, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং আৰু চাইবাৰ সুৰক্ষা।"]},{h:"প্ৰবন্ধই আপোনাৰ প্ৰস্তুতিত কেনেদৰে সহায় কৰে",list:["ই এটা নিয়মৰ পিছৰ 'কিয়'টো ব্যাখ্যা কৰে, যি নতুন প্ৰশ্নত প্ৰয়োগ কৰিবলৈ সহায় কৰে।","পৰীক্ষাৰ আগৰ শেষ সপ্তাহবোৰত এইবোৰ আদৰ্শ পুনৰাবৃত্তিৰ সামগ্ৰী।","ই তত্ত্বক বিগত প্ৰশ্নকাকতৰ সমাধান কৰা উদাহৰণৰ সৈতে সংযোগ কৰে।","ই বোধগম্যতা আৰু সাধাৰণ সজাগতাৰ বাবে প্ৰয়োজনীয় পঢ়াৰ অভ্যাস গঢ়ে।"]},{h:"অধ্যয়ন প্ৰবন্ধৰ পৰা সৰ্বাধিক লাভ কৰাৰ টিপছ",list:["কলম লৈ পঢ়ক আৰু মূল কথাবোৰ তথা সূত্ৰ টুকি লওক।","পঢ়াৰ লগে লগে সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক।","আপোনাৰ মনত ৰখাৰ ক্ষমতা পৰীক্ষা কৰিবলৈ এসপ্তাহৰ পিছত প্ৰবন্ধটো আকৌ চাওক।","ইংৰাজী আৰু অসমীয়া দুয়ো ভাষাত পৰিভাষা শক্তিশালী কৰিবলৈ দ্বিভাষিক দৃশ্য ব্যৱহাৰ কৰক।"]}],faqs:[{q:"axomexam ত কেনেধৰণৰ প্ৰবন্ধ প্ৰকাশ কৰা হয়?",a:"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰ সজাগতাৰ দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন সামগ্ৰী।"},{q:"প্ৰবন্ধবোৰ ADRE আৰু APSC ৰ বাবে উপযোগী নেকি?",a:"হয়। প্ৰবন্ধবোৰে ADRE, APSC CCE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে প্ৰশ্নকাকতত অহা ধাৰণা আৰু তথ্য সামৰি লয়।"},{q:"অনুশীলন প্ৰশ্নৰ আগতে নে পিছত প্ৰবন্ধ পঢ়া উচিত?",a:"ধাৰণাটো বুজিবলৈ আগতে প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰি আপোনাৰ ভুল পৰ্যালোচনা কৰক।"},{q:"প্ৰবন্ধবোৰ অসমীয়াত উপলব্ধ নেকি?",a:"সামগ্ৰীখন অসমীয়া আৰু ইংৰাজী দুয়ো পঢ়ুৱৈক সহায় কৰিবলৈ সজোৱা হৈছে, আৰু মূল পৰিভাষাবোৰ দুয়ো ভাষাত ব্যাখ্যা কৰা হয়।"},{q:"নতুন প্ৰবন্ধ কিমান সঘনাই যোগ কৰা হয়?",a:"নতুন প্ৰবন্ধ নিয়মীয়াকৈ যোগ কৰা হয়, গতিকে আপোনাৰ পাঠ্যক্ৰম আগবাঢ়ি যোৱাৰ লগে লগে পৃষ্ঠাটো আকৌ চাওক।"},{q:"প্ৰবন্ধ শিতান বিনামূলীয়াকৈ ব্যৱহাৰ কৰিব পাৰি নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো প্ৰবন্ধ আৰু অধ্যয়ন সমল সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},math:{title:"ADRE, APSC আৰু অসম আৰক্ষী পৰীক্ষাৰ বাবে গণিত | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া গণিত অনুশীলন। পাটিগণিত, উন্নত গণিত, পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — দ্বিভাষিক ধাপে ধাপে সমাধানৰ সৈতে।",lead:["গণিত বা পৰিমাণাত্মক যোগ্যতা ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ সৰ্বাধিক নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা। বিষয়টোৱে অনুশীলনক পুৰস্কৃত কৰে: যিমান বেছি আৰ্হি আপুনি দেখিছে, সিমান দ্ৰুত আৰু শুদ্ধভাৱে পৰীক্ষাৰ দিনা সমাধান কৰিব।","axomexam ত গণিতক পাটিগণিত, উন্নত গণিত, আৰু পৰিসংখ্যা তথা তথ্য বিশ্লেষণত ভাগ কৰা হৈছে। প্ৰতিটো শিতান ভেটিৰ পৰা পৰীক্ষাৰ স্তৰৰ প্ৰশ্নলৈ গঢ়ি উঠে, যাতে আপুনি এক সময়ত এটা ক্ষেত্ৰ শক্তিশালী কৰিব পাৰে।"],sections:[{h:"অসম পৰীক্ষাত গণিত কিয় গুৰুত্বপূৰ্ণ",p:["সংখ্যাগত ক্ষমতাই বহু প্ৰশ্ন বহন কৰে আৰু সাধাৰণতে এই শিতানটোৱেই সেই ঠাই য'ত ভালদৰে প্ৰস্তুত প্ৰাৰ্থীয়ে আগবাঢ়ি যায়। ধাৰণাবোৰ নিৰ্দিষ্ট আৰু আৰ্হিবোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতে বেছিভাগ অন্য বিষয়তকৈ প্ৰস্তুতিৰ সময়ত ভাল প্ৰতিদান দিয়ে।"]},{h:"axomexam ত সামৰি লোৱা গণিতৰ শিতানবোৰ",list:["পাটিগণিত — সংখ্যা পদ্ধতি, শতাংশ, অনুপাত, লাভ-ক্ষতি, গড়, সময় আৰু কাম, সময় আৰু দূৰত্ব, আৰু সৰল তথা চক্ৰবৃদ্ধি সুত।","উন্নত গণিত — বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা পদ্ধতি আৰু উচ্চ স্তৰৰ সমস্যা সমাধান।","পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — গড়, টেবুল, বাৰ চাৰ্ট, পাই চাৰ্ট আৰু ৰেখা লেখ।"]},{h:"গণিত প্ৰস্তুতিৰ কৌশল",list:["এটা অধ্যায়ৰ উন্নত প্ৰশ্নলৈ যোৱাৰ আগতে ভেটিটো আয়ত্ত কৰক।","প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান নকৰি চুটি কৌশল শিকি প্ৰয়োগ কৰক।","পৰীক্ষাই দাবী কৰা গতি গঢ়িবলৈ টাইমাৰ লৈ অনুশীলন কৰক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰ বিশ্লেষণ কৰি ভুলটো ধাৰণাগত নে অসাৱধানতাৰ পৰা হ'ল বিচাৰক।","সপ্তাহে এটা সম্পূৰ্ণ গণিতৰ মক টেষ্ট লৈ আপোনাৰ শুদ্ধতা জুখক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["স্পষ্ট ভেটি নোহোৱাকৈ উন্নত প্ৰশ্ন চেষ্টা কৰা।","তথ্য বিশ্লেষণ এৰি দিয়া, যি সাৱধান পঢ়ুৱৈৰ বাবে সহজ নম্বৰ দিয়ে।","আসন্ন মানৰ অভ্যাস নকৰাৰ বাবে সময়ৰ চাপত গণনাৰ ভুল কৰা।","প্ৰশ্নৰ প্ৰকাৰৰ পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা।"]}],faqs:[{q:"ADRE ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"পাটিগণিতেই মূল, বিশেষকৈ শতাংশ, অনুপাত, গড়, লাভ-ক্ষতি, সময় আৰু কাম আৰু সময়-বেগ-দূৰত্ব। উন্নত গণিত আৰু তথ্য বিশ্লেষণে বাকী নম্বৰবোৰ যোগ কৰে।"},{q:"অসম আৰক্ষী আৰু ADRE ৰ বাবে উন্নত গণিত প্ৰয়োজন নেকি?",a:"মৌলিক বীজগণিত আৰু জ্যামিতি উপযোগী, কিন্তু গুৰুত্ব পাটিগণিতৰ ওপৰতেই থাকে। APSC আৰু কাৰিকৰী পদৰ বাবে উন্নত গণিতত বেছি দখল প্ৰয়োজন।"},{q:"মই মোৰ গণনাৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"নামতা, বৰ্গ, ঘনক আৰু শতাংশৰ পৰা ভগ্নাংশলৈ মান মনত ৰাখক, আৰু সময়বদ্ধ ছেটৰ সৈতে আসন্ন মানৰ কৌশল অনুশীলন কৰক।"},{q:"প্ৰতিদিনে গণিতত কিমান সময় দিয়া উচিত?",a:"নিয়মীয়া ভুল পৰ্যালোচনা আৰু সাপ্তাহিক মক টেষ্টৰ সৈতে দিনে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট।"},{q:"মই অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। সকলো অনুশীলন ছেট আৰু ধাপে ধাপে ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{q:"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},reasoning:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে যুক্তিৰ ক্ষমতাৰ প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া যুক্তি অনুশীলন। মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তি — দ্বিভাষিক ধাপে ধাপে ব্যাখ্যা আৰু সময়বদ্ধ ছেটৰ সৈতে।",lead:["যুক্তিৰ ক্ষমতাই মনত ৰখা তথ্যৰ পৰিৱৰ্তে যুক্তিসংগত আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। ই মৌখিক যুক্তি, অ-মৌখিক যুক্তি আৰু বিশ্লেষণাত্মক তথা সমালোচনাত্মক যুক্তিত বিভক্ত, আৰু একেলগে এইবোৰে ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা নম্বৰ দিয়া শিতান গঠন কৰে।","যুক্তিত গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে, গতিকে সময়বদ্ধ অনুশীলন অপৰিহাৰ্য। axomexam ত তিনিওটা শাখাৰ অধ্যায়ভিত্তিক ছেটৰ পিছত বিশদ ব্যাখ্যা আছে, যাতে আপুনি যুক্তি আৰু গতি দুয়োটা প্ৰশিক্ষণ দিব পাৰে।"],sections:[{h:"কিয় যুক্তি উচ্চ-নম্বৰ শিতান",p:["যুক্তিৰ প্ৰশ্নবোৰে নিৰ্দিষ্ট আৰ্হি অনুসৰণ কৰে, যিবোৰ প্ৰশ্নকাকতবোৰত পুনৰাবৃত্তি হয়। এবাৰ প্ৰাৰ্থীয়ে শ্ৰেণী, সংকেত, বিন্যাস আৰু বিবৃতিভিত্তিক প্ৰশ্নৰ মানক নিয়ম শিকিলে শিতানটো দ্ৰুত আৰু নিৰ্ভৰযোগ্য হৈ পৰে। ইয়াত নিয়মীয়া অনুশীলনৰ বাহিৰে অন্য অধ্যয়ন সামগ্ৰীৰ প্ৰয়োজন নাই।"]},{h:"axomexam ত সামৰি লোৱা যুক্তিৰ শাখাবোৰ",list:["মৌখিক যুক্তি — সাদৃশ্য, শ্ৰেণীবিভাগ, শ্ৰেণী, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, স্থান নিৰ্ণয়, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।","অ-মৌখিক যুক্তি — চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, চিত্ৰ গণনা আৰু ঘনক তথা পাশা।","বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি — আসন বিন্যাস, ধাঁধা, অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়।"]},{h:"যুক্তি প্ৰস্তুতিৰ কৌশল",list:["এটা অধ্যায়ৰ নিয়ম শিকক, তাৰ পিছত তাৰ ওপৰত অন্ততঃ বিশটা প্ৰশ্নৰ ছেট সমাধান কৰক।","বিন্যাস, ৰক্তসম্পৰ্ক আৰু দিশৰ বাবে মনত সমাধান নকৰি চিত্ৰ আঁকক।","যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ অভ্যস্ত হ'বলৈ মিশ্ৰ ছেট অনুশীলন কৰক।","শুদ্ধতাৰ লগে লগে গতি বাঢ়িবলৈ প্ৰতিটো ছেট সময় জুখক।","ভুল উত্তৰবোৰ তৎক্ষণাত পৰ্যালোচনা কৰি হেৰুওৱা নিয়মটো টুকি লওক।","সপ্তাহে এটা সম্পূৰ্ণ যুক্তিৰ মক টেষ্ট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["প্ৰশ্নৰ প্ৰতিটো অংশৰ সৈতে পৰীক্ষা নকৰি যুক্তিটো অনুমান কৰা।","সহজ প্ৰশ্ন ৰৈ থকাৰ সময়ত এটা ধাঁধাত আটকি থকা।","অচিনাকি যেন লাগে বুলি অ-মৌখিক যুক্তি এৰি দিয়া।","পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা, যাৰ ফলত পৰীক্ষাত অচিনাকি আৰ্হিবোৰ কঠিন যেন লাগে।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত কিমান যুক্তিৰ প্ৰশ্ন আহে?",a:"পদ আৰু প্ৰশ্নকাকতৰ ওপৰত নিৰ্ভৰ কৰি যুক্তিৰ শিতানত সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন থাকে।"},{q:"কোনটো যুক্তিৰ শাখা আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"তিনিওটা সোধা হয়, কিন্তু মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিত সাধাৰণতে অ-মৌখিক যুক্তিতকৈ বেছি প্ৰশ্ন থাকে।"},{q:"মই যুক্তিৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"মানক নিয়মবোৰ শিকি তাৰ পিছত সময়বদ্ধ ছেট অনুশীলন কৰক। বিন্যাস আৰু ধাঁধাৰ বাবে চিত্ৰ আঁকিলেও বহু সময় ৰাহি হয়।"},{q:"নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীৰ বাবে যুক্তি কঠিন নেকি?",a:"নহয়। ই আটাইতকৈ অনুশীলন-বান্ধৱ শিতানবোৰৰ এটা। ধাৰাবাহিক দৈনিক অনুশীলনৰ সৈতে নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীয়ে দ্ৰুতভাৱে উন্নতি কৰে।"},{q:"মই অসমীয়াত যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক আৰু পঢ়ি থাকোঁতে আপুনি অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে।"},{q:"axomexam ত যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},computer:{title:"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে কম্পিউটাৰ সজাগতা প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া কম্পিউটাৰ সজাগতা অনুশীলন। মূল কথা, হাৰ্ডৱেৰ, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা পদ্ধতি।",lead:["কম্পিউটাৰ সজাগতা ADRE, অসম আৰক্ষী, APSC, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয় আৰু অন্য ৰাজ্যিক নিযুক্তি পৰীক্ষাত প্ৰস্তুতি তথা নম্বৰ লাভ কৰিবলৈ আটাইতকৈ দ্ৰুত শিতানবোৰৰ এটা। বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক, গতিকে চুটি, একাগ্ৰ পুনৰাবৃত্তিৰ সৈতে প্ৰায় সম্পূৰ্ণ নম্বৰ নিশ্চিত কৰিব পাৰি।","axomexam ত বিষয়টো মূল কথা আৰু হাৰ্ডৱেৰ, ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, আৰু DBMS তথা সংখ্যা পদ্ধতি আৰু চুটি কৌশলত বিভক্ত। প্ৰতিটো অধ্যায় স্পষ্ট ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত।"],sections:[{h:"কম্পিউটাৰ সজাগতাই কি সামৰি লয়",p:["পাঠ্যক্ৰম আৰম্ভ হয় কম্পিউটাৰৰ মূল কথা, সিহঁতৰ প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ আৰু স্মৃতিৰ পৰা, তাৰ পিছত ছফ্টৱেৰ, অপাৰেটিং ছিষ্টেম আৰু এপ্লিকেচন পেকেজলৈ যায়। নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা আৰু ডেটাবেছৰ ধাৰণাই শিতানটো সম্পূৰ্ণ কৰে।"]},{h:"axomexam ত সামৰি লোৱা কম্পিউটাৰৰ অধ্যায়বোৰ",list:["কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰ — প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ আৰু CPU।","ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম — ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং ছিষ্টেমৰ কাম, ফাইল পৰিচালনা আৰু সাধাৰণ Windows তথা Linux বৈশিষ্ট্য।","MS Office ছুইট — Word, Excel আৰু PowerPoint, মেনু বিকল্প, চুটি কৌশল আৰু সূত্ৰসহ।","নেটৱৰ্কিং আৰু ইণ্টাৰনেট — নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'প'লজি, IP ঠিকনা, প্ৰ'ট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা।","চাইবাৰ সুৰক্ষা — ভাইৰাছ, মেলৱেৰ, ফিছিং, হেকিং, পাছৱৰ্ড, এনক্ৰিপচন আৰু সুৰক্ষিত ইণ্টাৰনেট অভ্যাস।","DBMS, সংখ্যা পদ্ধতি আৰু চুটি কৌশল — ডেটাবেছৰ মূল কথা, সংখ্যা পদ্ধতিৰ ৰূপান্তৰ আৰু কীবৰ্ড চুটি কৌশল।"]},{h:"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা কম্পিউটাৰৰ বিষয়",list:["কম্পিউটাৰৰ প্ৰজন্ম আৰু সিহঁতৰ বৈশিষ্ট্য।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰ উদাহৰণসহ।","সাধাৰণ কাৰ্যৰ বাবে কীবৰ্ড চুটি কৌশল।","মৌলিক MS Word আৰু MS Excel ফলন আৰু সূত্ৰ।","সাধাৰণ কম্পিউটাৰ সংক্ষিপ্ত ৰূপৰ সম্পূৰ্ণ ৰূপ।","কম্পিউটাৰ ভাইৰাছৰ প্ৰকাৰ আৰু চাইবাৰ সুৰক্ষাৰ টিপছ।"]},{h:"কম্পিউটাৰ সজাগতা প্ৰস্তুতিৰ কৌশল",list:["সংক্ষিপ্ত ৰূপ আৰু সম্পূৰ্ণ ৰূপৰ এপৃষ্ঠাৰ তালিকা বনাই প্ৰতিদিনে পুনৰাবৃত্তি কৰক।","কীবৰ্ড চুটি কৌশল কম্পিউটাৰত প্ৰকৃততে ব্যৱহাৰ কৰি শিকক।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰৰ এটা সৰু টেবুল প্ৰস্তুত কৰক।","মৌলিক Excel সূত্ৰ আৰু Word মেনু বিকল্প অনুশীলন কৰক।","সংখ্যা পদ্ধতিৰ ৰূপান্তৰ কেইটামান উদাহৰণৰ সৈতে পুনৰাবৃত্তি কৰক।","প্ৰতিটো বিষয় পঢ়াৰ পিছত অধ্যায়ভিত্তিক ছেট এটা চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["সহজ যেন লাগে বুলি বিষয়টো এৰি দিয়া, আৰু পিছত সম্পূৰ্ণ ৰূপবোৰ পাহৰি যোৱা।","RAM আৰু ROM, বা হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ দৰে একেধৰণৰ শব্দ মিহলাই পেলোৱা।","চুটি কৌশল অনুশীলন নকৰা, যিবোৰ প্ৰতি বছৰে প্ৰত্যক্ষভাৱে সোধা হয়।","ভেটি অস্পষ্ট ৰাখি উন্নত বিষয় পঢ়া।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত কম্পিউটাৰ সজাগতা সোধা হয় নেকি?",a:"হয়। ই সাধাৰণ সজাগতা শিতানৰ অংশ আৰু নম্বৰ লাভ কৰিবলৈ আটাইতকৈ সহজ ক্ষেত্ৰবোৰৰ এটা, কাৰণ বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক।"},{q:"কম্পিউটাৰ সজাগতা প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?",a:"পাঠ্যক্ৰম সৰু আৰু বেছিভাগ তথ্যভিত্তিক হোৱাৰ বাবে এৰ পৰা দুই সপ্তাহৰ একাগ্ৰ পুনৰাবৃত্তি সাধাৰণতে যথেষ্ট।"},{q:"কোনবোৰ কম্পিউটাৰৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"মূল কথা, হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ পাৰ্থক্য, MS Office চুটি কৌশল আৰু সূত্ৰ, নেটৱৰ্কিংৰ মূল কথা আৰু চাইবাৰ সুৰক্ষা সৰ্বাধিক বাৰে সোধা হয়।"},{q:"এই শিতান প্ৰস্তুতি কৰিবলৈ কম্পিউটাৰ প্ৰয়োজন নেকি?",a:"চুটি কৌশল আৰু MS Office ৰ বাবে কম্পিউটাৰে সহায় কৰে, কিন্তু তত্ত্বখন টোকা আৰু অনুশীলন প্ৰশ্নৰ পৰা যিকোনো যন্ত্ৰত প্ৰস্তুতি কৰিব পাৰি।"},{q:"মই অসমীয়াত কম্পিউটাৰ সজাগতা পঢ়িব পাৰিম নেকি?",a:"হয়। axomexam ৰ অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{q:"axomexam ত কম্পিউটাৰ সজাগতাৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]}};function Ha(e){return u.lang==="as"&&Pt[e]?Pt[e]:Ra[e]||""}const Mt={quant:["অনুশীলন আৰম্ভ কৰাৰ আগতে এই শিতানৰ মূল সূত্ৰ আৰু ধাৰণাসমূহ পুনৰালোচনা কৰক।","ঘড়ী লগাই প্ৰশ্ন সমাধান কৰক, যাতে পৰীক্ষাৰ দিনা প্ৰয়োজনীয় গতিত অভ্যস্ত হয়।","প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু কিয় ভুল কৰিছিল সেইটো টুকি লওক।","কেইদিনমানৰ পিছত একেখিনি ছেটলৈ ঘূৰি আহি নিজৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।"],general:["প্ৰথমে বিষয়ৰ টোকা এবাৰ পঢ়ক, তাৰ পিছত সম্পৰ্কিত প্ৰশ্ন সমাধান কৰি নিজৰ স্মৃতি পৰীক্ষা কৰক।","যি তথ্যবোৰ বাৰে বাৰে পাহৰি যাই সেইবোৰ চিহ্নিত কৰি চুটি চুটি অধিবেশনত পুনৰালোচনা কৰক।","দুয়োটা ভাষাত অনুশীলন কৰক, যাতে একেখিনি তথ্য অসমীয়া আৰু ইংৰাজী দুয়োতে চিনি পায়।","শুদ্ধ উত্তৰ দিয়া প্ৰশ্নৰো ব্যাখ্যা পঢ়ক, যাতে মনত ৰখাৰ শক্তি বাঢ়ে।"]};function ja(e){const a=["math","arithmetic","advanced-math","statistics-and-data-interpretation","science","physics","chemistry","biology","reasoning","verbal-reasoning","analytical-critical-reasoning","non-verbal-reasoning","computer","dbms-number-shortcuts"].indexOf(e)!==-1;return u.lang==="as"?a?Mt.quant:Mt.general:a?["Revise the basic formulas and concepts of this section before you begin practising.","Attempt the questions under a timer so that you get used to the speed expected on exam day.","Read the explanation for every wrong answer and note down exactly why you missed it.","Return to the same sets after a few days and check whether your accuracy has improved."]:["Read the topic notes once, then attempt the related questions to test your recall.","Mark the facts you keep forgetting and revise them in short, repeated sessions.","Practise in both languages so you can recognise the same fact in Assamese and English.","Review the explanations even for questions you answered correctly to strengthen retention."]}function Ba(e){const t=e.info||"",a=e.items||[],n=e.tips||[],s=e.faqs||[],i=u.lang==="as",o=a.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${d(i?"ইয়াত কি কি সামৰি লোৱা হৈছে":"What is covered here")}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${a.map(p=>`<li><strong>${d(p.name)}</strong>${p.count?` &mdash; ${p.count} ${d(p.unit||"topics")}`:""}</li>`).join("")}</ul>`:"",l=n.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${d((i?"কেনেকৈ প্ৰস্তুতি ল'ব: ":"How to prepare ")+(e.name||""))}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${n.map(p=>`<li>${d(p)}</li>`).join("")}</ul>`:"",c=s.length?`<h3 style="color:var(--ink,#0f172a); margin-top:24px;">${d(i?"সঘনাই সোধা প্ৰশ্ন":"Frequently Asked Questions")}</h3><div class="seo-faq">${s.map(p=>`<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">${d(p.q)}</summary><p style="margin:8px 0 0;">${d(p.a)}</p></details>`).join("")}</div>`:"";return`
      <section class="section seo-deep" style="padding-bottom:48px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${d(e.h2||e.name||"")}</h2>
          ${t?`<p>${d(t)}</p>`:""}
          ${o}
          ${l}
          ${c}
        </div>
      </section>`}function Fa(e,t){if(!e||!t)return;const a=document.createElement("div");a.innerHTML=Ba(t),a.firstElementChild&&e.appendChild(a.firstElementChild)}function Oa(e){return!e||!e.length?"":'<h3 style="color:var(--ink,#0f172a); margin-top:22px;">'+(u.lang==="as"?"সঘনাই সোধা প্ৰশ্ন":"Frequently Asked Questions")+'</h3><div class="seo-faq">'+e.map(a=>'<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">'+d(a.q)+'</summary><p style="margin:8px 0 0;">'+d(a.a)+"</p></details>").join("")+"</div>"}function Na(e){return(e||[]).map(t=>{let a='<h3 style="color:var(--ink,#0f172a); margin-top:22px;">'+d(t.h)+"</h3>";return t.p&&t.p.length&&(a+=t.p.map(n=>"<p>"+d(n)+"</p>").join("")),t.list&&t.list.length&&(a+='<ul style="margin:8px 0 0 20px; line-height:1.9;">'+t.list.map(n=>"<li>"+d(n)+"</li>").join("")+"</ul>"),a}).join("")}function Ga(e){const t=(e.lead||[]).map(n=>"<p>"+d(n)+"</p>").join(""),a=e.h2||String(e.title||"").replace(/\s*\|\s*axomexam\s*$/i,"");return'<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;"><div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;"><h2 style="margin-top:0; color:var(--ink,#0f172a);">'+d(a)+"</h2>"+t+Na(e.sections)+Oa(e.faqs)+"</div></section>"}function O(e,t){const a=t&&t.id?u.lang==="as"&&za[t.id]||Et[t.id]:null;if(a){const c=document.createElement("div");c.innerHTML=Ga(a),c.firstElementChild&&e.appendChild(c.firstElementChild);return}const n=t.name||"",s=t.info||Ha(t.id)||"",i=(t.faqs||[]).slice(),o=t.count||0,l=t.total||0;if(!t.noDefaults){const c=u.lang==="as";i.push({q:c?n+" axomexam ত বিনামূলীয়া নেকি?":"Is "+n+" available for free on axomexam?",a:c?"হয়। axomexam.in ৰ প্ৰতিটো মক টেষ্ট, প্ৰশ্ন-সংগ্ৰহ, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।":"Yes. Every mock test, question bank, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}),i.push({q:c?n+" অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত পঢ়িব পাৰিম নেকি?":"Can I study "+n+" in Assamese as well as English?",a:c?"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। পঢ়ি থাকোঁতে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।":"Yes. Questions and explanations are bilingual. You can switch between Assamese and English while reading so the same concept is reinforced in both languages."}),o>0&&i.push({q:c?n+" ৰ বাবে কিমান সমল উপলব্ধ?":"How much material is available for "+n+"?",a:c?"এই শিতানত এতিয়া "+o+" টা বিষয়"+(l>0?" আৰু প্ৰায় "+l+" টা প্ৰশ্ন":"")+" আছে, নতুন প্ৰশ্ন যোগ হোৱাৰ লগে লগে নিয়মীয়াকৈ হালনাগাদ কৰা হয়।":"This section currently offers "+o+" topics"+(l>0?" with around "+l+" questions":"")+" and is updated regularly as new questions are added."})}Fa(e,{h2:t.h2||n+(u.lang==="as"?" — পৰিচয়":" - Overview"),name:n,info:s,items:t.items||[],tips:t.tips||ja(t.id),faqs:i})}function q(e){if(e==null)return"";let t=String(e);return/\$[^$]+\$|\\\([^\\]+\\\)/.test(t)||(t=d(t),t=t.replace(/sqrt\(([^)]+)\)/gi,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/√\(([^)]+)\)/g,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/\^{([^}]+)}/g,"<sup>$1</sup>"),t=t.replace(/\^\(([^)]+)\)/g,"<sup>$1</sup>"),t=t.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sup>$1</sup>"),t=t.replace(/_{([^}]+)}/g,"<sub>$1</sub>"),t=t.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sub>$1</sub>"),t=t.replace(/\+\/-/g,"&plusmn;"),t=t.replace(/&lt;=/g,"&le;").replace(/&gt;=/g,"&ge;")),t}function ee(e){return!e||!/\$|\\\(|\\\[/.test(e.textContent||"")?Promise.resolve():Ta().then(function(){if(typeof renderMathInElement=="function")try{renderMathInElement(e,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}],throwOnError:!1})}catch{}}).catch(function(){})}function T(e,t,a){if(!e)return"";const n=a||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),s=n==="en"?"english":"assamese",i=m=>m==null?"":Array.isArray(m)?m.map(x=>`<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${q(x)}</div>`).join(""):typeof m=="object"?i(m[n]||m.as||m.en||Object.values(m)[0]||""):String(m),o=m=>t==="answer"?Ze(e,m,n):m;if(t==="answer"){const m=_a(e),x=F(e,n),y=e.answer!==void 0?e.answer:e.a,b=Array.isArray(y)||y&&typeof y=="object"&&Object.keys(y).some(w=>Array.isArray(y[w]));if(m>=0&&m<x.length&&x[m]!==void 0&&String(x[m]).trim()!==""&&!b)return i(Ze(e,m,n))}if(e[s]&&typeof e[s]=="object"){if(e[s][t]!==void 0)return i(o(e[s][t]));const m=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(m&&e[s][m]!==void 0)return i(o(e[s][m]))}const l=`${t}_${n}`;if(e[l]!==void 0&&e[l]!==null)return i(o(e[l]));const c=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(c){const m=`${c}_${n}`;if(e[m]!==void 0&&e[m]!==null)return i(o(e[m]))}const p=[t];t==="question"&&p.push("q","question_text","headline","title"),t==="answer"&&p.push("a","ans","content","body","description"),t==="explanation"&&p.push("exp","desc","key_points","summary");for(const m of p){const x=e[m];if(x!=null)return i(o(x))}if(t==="answer"){const m=Number.isInteger(e.answer)?e.answer:Number.isInteger(e.correct)?e.correct:Number.isInteger(e.correct_index)?e.correct_index:-1;if(m>=0&&F(e,n)[m]!==void 0)return i(Ze(e,m,n))}const h=`${t}_as`,f=`${t}_en`;return e[h]!==void 0&&e[h]!==null?i(e[h]):e[f]!==void 0&&e[f]!==null?i(e[f]):""}function te(e,t){if(e==null)return"";if(typeof e=="string")return e;if(Array.isArray(e))return e.join(`
`);const a=t||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),n=e[a]||e.as||e.en||"";return Array.isArray(n)?n.join(`
`):String(n)}function F(e,t){if(!e)return[];const a=t||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),n=a==="en"?"english":"assamese";if(e[n]&&Array.isArray(e[n].options))return e[n].options.map(String);if(e.options&&typeof e.options=="object"&&!Array.isArray(e.options)){const i=e.options[a]||e.options.as||e.options.en;if(Array.isArray(i))return i.map(String)}if(Array.isArray(e.options)&&e.options.length)return e.options.map(i=>typeof i=="string"?i:typeof i=="object"&&i!==null?i[a]||i.as||i.en||"":String(i));const s=e[`options_${a}`];return Array.isArray(s)&&s.length?s.map(String):Array.isArray(e.options_as)&&e.options_as.length?e.options_as.map(String):Array.isArray(e.options_en)&&e.options_en.length?e.options_en.map(String):[]}function Ze(e,t,a){const n=F(e,a);if(!n||!n.length)return t;const s="ABCDEFGHIJ";let i=-1;if(Number.isInteger(t))i=t;else if(typeof t=="string"){const c=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(t.trim());c&&(i=s.indexOf(c[1].toUpperCase()))}if(i<0||i>=n.length)return t;const o=s[i]||"",l=n[i];return l==null||String(l).trim()===""?o||t:o?`(${o}) ${l}`:String(l)}function _a(e){if(!e)return-1;const t=[e.correct,e.correct_index,e.answer,e.a];for(const a of t){if(Number.isInteger(a))return a;if(typeof a=="string"){const n=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(a.trim());if(n)return"ABCDEFGHIJ".indexOf(n[1].toUpperCase())}}return-1}function et(e){return e==null?"":String(e).replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi,"").replace(/<\s*script[\s\S]*$/gi,"").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi,"").replace(/\son[a-z]+\s*=\s*'[^']*'/gi,"").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi,"").replace(/javascript\s*:/gi,"")}function Wa(e){if(!e)return"";const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{rows:e},a=Array.isArray(t.head)?t.head:Array.isArray(t.headers)?t.headers:[],n=Array.isArray(t.rows)?t.rows:[];if(!a.length&&!n.length)return"";const s=o=>o==null?"":q(te(o));return`
      <div class="nv-table-wrap">${t.caption?`<div class="nv-table-cap">${d(te(t.caption))}</div>`:""}
        <table class="nv-table">
          ${a.length?`<thead><tr>${a.map(o=>`<th>${s(o)}</th>`).join("")}</tr></thead>`:""}
          <tbody>${n.map(o=>`<tr>${(Array.isArray(o)?o:[]).map(l=>`<td>${s(l)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`}function re(e){if(!e)return"";const t=[];return e.fig&&t.push(`<div class="nv-media">${et(e.fig)}</div>`),e.table&&t.push(Wa(e.table)),t.join("")}function le(e){return!e||!Array.isArray(e.options)||!e.options.some(t=>t&&typeof t=="object"&&t.fig)?null:e.options.map((t,a)=>{const s=t&&typeof t=="object"&&t.option?String(t.option):"ABCDEFGHIJ"[a]||"";return!t||typeof t!="object"?{letter:s,fig:"",text:String(t||"")}:{letter:s,fig:et(t.fig||""),text:te(t)||""}})}function K(e,{compact:t}={}){const a=le(e);return a?`
      <div class="nv-fig-grid${t?" nv-fig-grid-compact":""}">
        ${a.map(n=>`
          <div class="nv-fig-item">
            <div class="nv-fig-key">(${n.letter})</div>
            <div class="nv-fig-box">${n.fig||(n.text?`<span class="nv-fig-textonly">${q(n.text)}</span>`:"")}</div>
            ${n.fig&&n.text?`<div class="nv-fig-cap">${q(n.text)}</div>`:""}
          </div>`).join("")}
      </div>`:""}function Te(e){return e==null?"":typeof e=="object"?te(e):String(e)}function Le(e){return e&&typeof e=="object"&&typeof e.fig=="string"?et(e.fig):""}function Qa(){const e=g("footer.site-footer")||g("footer");if(!e)return;const t=u.uiLang==="as";e.innerHTML=`
      <div style="max-width:1100px; margin:0 auto; padding:32px 16px 20px; box-sizing:border-box; color:#ffffff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.15);">
          <div style="flex:1; min-width:240px; text-align:left;">
            <div style="margin-bottom:10px; color:#ffffff;">
              <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
                <defs>
                  <linearGradient id="gradLogoFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="30" height="30" rx="8" fill="url(#gradLogoFooter)"/>
                <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
                <text x="38" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#38bdf8">.in</tspan></text>
              </svg>
            </div>
            <p style="font-size:0.86rem; color:#f8fafc; line-height:1.55; margin:0; max-width:320px; font-weight:400;">
              ${t?"অসমৰ সৰ্ববৃহৎ দ্বিভাষিক প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি মঞ্চ। ADRE, অসম আৰক্ষী, APSC আদি পৰীক্ষাৰ বিনামূলীয়া সমল।":"Assam's premier bilingual competitive exam preparation portal. Free study notes, mock tests and previous papers."}
            </p>
            <p class="footer-contact">
              ${t?"যোগাযোগ:":"Contact:"} <a href="mailto:contact@axomexam.in">contact@axomexam.in</a>
            </p>
          </div>
          
          <div style="display:flex; gap:40px; flex-wrap:wrap;">
            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${t?"দ্ৰুত লিংক":"Quick Links"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"গৃহপৃষ্ঠা":"Home"}</a></li>
                <li><a href="/previous-year" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"বিগত বৰ্ষৰ প্ৰশ্ন":"Previous Papers"}</a></li>
                <li><a href="/editorial-policy/" class="axo-editorial-link">${t?"সম্পাদকীয় নীতি":"Editorial Policy"}</a></li>
                <li><a href="/editorial-team/" class="axo-editorial-link">${t?"সম্পাদকীয় দল":"Editorial Team"}</a></li>
                <li><a href="/sources/" class="axo-editorial-link">${t?"চৰকাৰী উৎস":"Official Sources"}</a></li>
                <li><a href="/updates/" class="axo-editorial-link">${t?"সমল হালনাগাদ":"Content Updates"}</a></li>
                <li><a href="/download-app" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"এপ ডাউনলোড":"Download App"}</a></li>
                <li><a href="/submit" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"প্ৰশ্ন প্ৰেৰণ কৰক":"Submit Q&A"}</a></li>
              </ul>
            </div>

            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${t?"আইনী নীতি":"Legal & Info"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/about" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"আমাৰ বিষয়ে":"About Us"}</a></li>
                <li><a href="/contact" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"যোগাযোগ কৰক":"Contact Us"}</a></li>
                <li><a href="/privacy" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"গোপনীয়তা নীতি":"Privacy Policy"}</a></li>
                <li><a href="/terms" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"নীতি আৰু চৰ্তসমূহ":"Terms & Conditions"}</a></li>
                <li><a href="/disclaimer" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"দাবীত্যাগ":"Disclaimer"}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <span class="fbb-made">Made for Assam Competitive Aspirants</span>
          <span class="fbb-contact">${t?"যোগাযোগ কৰক :":"Contact us :"} <a href="mailto:contact@axomexam.in">contact@axomexam.in</a></span>
          <span class="fbb-copy">© ${new Date().getFullYear()} <strong>axomexam.in</strong>. All Rights Reserved.</span>
        </div>
      </div>
    `}function Ie(){const e=g("#master-search");e&&(e.placeholder=r("search.placeholder")),P("[aria-label]").forEach(t=>{const a=t.getAttribute("data-aria-i18n");a&&t.setAttribute("aria-label",r(a))}),Qa(),Ua()}let Y=null,fe=null,Tt=!1;function Lt(){const e=typeof CONFIG<"u"&&CONFIG.WHATSAPP||{},t=String(e.PHONE||"").replace(/[^\d]/g,"");if(!t)return"";const a=r("wa.prefill")||e.MESSAGE||"";return"https://wa.me/"+t+(a?"?text="+encodeURIComponent(a):"")}function Ya(){if(Y)return Y;const e=Lt();if(!e)return null;const t=document.createElement("a");return t.id="wa-chat",t.className="wa-chat",t.href=e,t.target="_blank",t.rel="noopener noreferrer",t.setAttribute("aria-label",r("wa.chatHint")),t.innerHTML=`<span class="wa-chat-ico" aria-hidden="true">${va()}</span><span class="wa-chat-text" data-wa-text>${d(r("wa.chat"))}</span>`,document.body.appendChild(t),Y=t,t}function Ua(){if(!Y)return;const e=Lt();e&&(Y.href=e),Y.setAttribute("aria-label",r("wa.chatHint"));const t=Y.querySelector("[data-wa-text]");t&&(t.textContent=r("wa.chat"))}function It(){Y&&Y.classList.toggle("is-hidden",Tt)}function De(e){Tt=!!e,It()}function Va(){const e=Ya();if(!e)return;const t=g("footer.site-footer")||g("footer");if(fe&&(fe.disconnect(),fe=null),!("IntersectionObserver"in window)||!t){e.classList.add("is-visible");return}fe=new IntersectionObserver(a=>{a.forEach(n=>e.classList.toggle("is-visible",n.isIntersecting))},{threshold:0,rootMargin:"0px 0px -10% 0px"}),fe.observe(t),It()}function Ka(){const e=document.querySelector(".header-center .theme-toggle")||document.querySelector(".site-header .theme-toggle");if(e&&!document.querySelector(".desktop-lang-toggle")){const t=document.createElement("div");t.className="desktop-lang-toggle",t.style.cssText="display:inline-flex;align-items:center;background:var(--bg-subtle,#f1f5f9);border:1px solid var(--border,#e2e8f0);border-radius:20px;padding:2px;margin-right:8px;",t.innerHTML=`
        <button type="button" class="glang-btn ${u.uiLang==="en"?"active":""}" data-glang="en" style="border:none;background:${u.uiLang==="en"?"var(--primary,#0ea5e9)":"transparent"};color:${u.uiLang==="en"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">EN</button>
        <button type="button" class="glang-btn ${u.uiLang==="as"?"active":""}" data-glang="as" style="border:none;background:${u.uiLang==="as"?"var(--primary,#0ea5e9)":"transparent"};color:${u.uiLang==="as"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">অসমীয়া</button>
      `,e.insertAdjacentElement("beforebegin",t)}P(".glang-btn").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();const n=t.dataset.glang;if(u.uiLang!==n){u.uiLang=n,document.body.setAttribute("data-ui-lang",n);try{localStorage.setItem("axomexam-ui-lang",n)}catch{}P(".glang-btn").forEach(s=>{const i=s.dataset.glang===u.uiLang;s.classList.toggle("active",i),s.style.background=i?"var(--primary,#0ea5e9)":"transparent",s.style.color=i?"#fff":"var(--ink-soft,#64748b)"}),Ie(),Re(),He(),Fe()}})})}function Ja(e){const t=[],a={},n=[],s=(o,l,c,p)=>{const h=[l.id,c?c.id:"",p?p.id:""].filter(Boolean).concat([o.id]).join("/"),f={path:h,cat:l,sub:c,section:p,topic:o,title:o.title||o.name,desc:o.description,tags:o.tags||[],nQuestions:(o.questions||[]).length,pdf:o.pdf||null,popularity:Number(o.popularity)||0};a[h]=f,n.push(f)},i=o=>{o.name=o.name||{en:o.id,as:o.id},o.description=o.description||{};const l=o.subcategories||[];if(l.length)l.forEach(c=>{c.name=c.name||{en:c.id,as:c.id};const p=c.sections||[];if(p.length)p.forEach(h=>{h.name=h.name||{en:h.id,as:h.id},(h.topics||[]).forEach(f=>s(f,o,c,h))});else if((c.topics||[]).length)(c.topics||[]).forEach(h=>s(h,o,c,null));else{const h={id:c.id,name:c.name,description:c.description,popularity:Number(c.popularity)||0},f=[o.id,c.id].join("/"),m={path:f,cat:o,sub:c,section:null,topic:h,title:h.name,desc:h.description,tags:[],nQuestions:0,pdf:null,popularity:h.popularity};a[f]=m,n.push(m)}});else{const c=o.sections||[];c.length?c.forEach(p=>{p.name=p.name||{en:p.id,as:p.id},(p.topics||[]).forEach(h=>s(h,o,null,p))}):(o.topics||[]).forEach(p=>s(p,o,null,null))}t.push(o)};return(e.categories||[]).forEach(i),{categories:t,topicMap:a,topicIndex:n}}function Xa(e){if(!e||typeof e!="object")return;u.counts=e;const t=e.topicCounts||{};u.topicIndex.forEach(a=>{Object.prototype.hasOwnProperty.call(t,a.path)&&(a.nQuestions=Number(t[a.path])||0)}),typeof e.examsTotal=="number"&&(u.examQuestionTotal=e.examsTotal,u.examTotalLoaded=!0),typeof e.topicsTotal=="number"&&(u.topicsTotal=e.topicsTotal)}function z(e){const t=u.categories.find(a=>a.id===e);return t&&t.color||(typeof CATEGORY_COLORS<"u"?CATEGORY_COLORS[e]||CATEGORY_COLORS.default:"#0ea5e9")}function Za(e){const t=u.categories.find(a=>a.id===e);return t&&t.icon||(typeof CATEGORY_ICONS<"u"?CATEGORY_ICONS[e]:"A")||"A"}function ae(e){const t=typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG[e];return t?`<span class="cat-svg">${t}</span>`:d(Za(e))}function ce(e,t){const a=String(e||"");if(typeof TOPIC_ICON_RULES<"u"){for(const[n,s]of TOPIC_ICON_RULES)if(n.test(a))return`<span class="cat-svg">${s}</span>`}return ae(t)}function ge(e){return u.topicIndex.filter(t=>t.cat.id===e.id).length}function Dt(){const e=u.categories.slice(),t=e.findIndex(a=>a.id==="articles");if(t!==-1){const[a]=e.splice(t,1),n=e.findIndex(s=>s.id==="computer");n!==-1?e.splice(n+1,0,a):e.push(a)}return e}function en(e,t){const a=e.subcategories||e.sections||[],n=!!(a&&a.length),s=t&&t.split("/")[0]===e.id;return`
      <li class="${n?"has-drop":""}">
        <a class="nav-link ${s?"active":""}" href="/category/${e.id}">
          <span>${d(Q(e.name))}</span>
          ${n?'<span class="caret"></span>':""}
        </a>
        ${n?tn(e,t):""}
      </li>`}function tn(e,t){return`
      <div class="dropdown">
        ${(e.subcategories||e.sections||[]).map(n=>{const s=n.sections;return s&&s.length?`
              <div class="has-drop">
                <a href="/category/${e.id}/${n.id}">
                  <span>${d(Q(n.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${s.map(l=>`
                    <a href="/category/${e.id}/${n.id}/${l.id}">
                      <span>${d(Q(l.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`:`<a href="${!(n.topics&&n.topics.length)?`/topic/${e.id}/${n.id}`:`/category/${e.id}/${n.id}`}">${d(Q(n.name))}</a>`}).join("")}
      </div>`}const tt=["gk","science","math","history","reasoning"];function Re(){const e=g("#nav-list");if(!e)return;const t=Rt(),a=u.categories.filter(i=>tt.includes(i.id)),n=u.categories.filter(i=>!tt.includes(i.id)),s=[];s.push(ze("/",r("nav.home"),t)),a.forEach(i=>s.push(en(i,t))),s.push(ze("/mock-test",r("nav.mock"),t)),s.push(ze("/exams",r("nav.exams"),t)),s.push(ze("/downloads",r("nav.downloads"),t)),s.push(an(n,t)),e.innerHTML=s.join("")}function ze(e,t,a){return`<li><a class="nav-link ${a.split("/")[0]===e.replace(/^\//,"")?"active":""}" href="${e}">${d(t)}</a></li>`}function an(e,t){const a=t.split("/")[0],n=e.some(m=>m.id===a)||["submit","previous-year","ebooks","exams","download-app","contact","about","privacy","privacy-policy","terms","disclaimer"].includes(a),s=e.map(m=>`<a class="${a===m.id?"active":""}" href="/category/${m.id}">${d(Q(m.name))}</a>`),o=`
      <a class="ebook-nav-link ${a==="ebooks"?"active":""}" href="/ebooks">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        <span>${d(r("nav.ebooks"))}</span>
      </a>`,c=`
      <a class="ebook-nav-link ${a==="exams"?"active":""}" href="/exams">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${d(r("nav.exams"))}</span>
      </a>`,p=e.findIndex(m=>m.id==="articles");p!==-1?s.splice(p+1,0,o,c):s.push(o,c);const h=s.join(""),f=[["/previous-year",r("nav.previousYear")],["/submit",r("nav.submit")],["/contact",r("nav.contact")],["/download-app",r("nav.downloadApp")]].map(([m,x])=>`<a class="${a===m.replace(/^\//,"")?"active":""}" href="${m}">${d(x)}</a>`).join("");return`
      <li class="has-drop">
        <a class="nav-link ${n?"active":""}" href="/categories">
          <span>${d(r("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${h?`<div class="d-label">${d(r("nav.categories"))}</div>${h}`:""}
          <div class="d-label">${d(r("mmenu.extra"))}</div>
          ${f}
        </div>
      </li>`}function He(){const e=g("#mobile-nav");if(!e)return;const t=Rt(),n=Dt().slice(),s=n.findIndex(b=>b.id==="articles"),i=n.findIndex(b=>b.id==="computer");if(s!==-1&&i!==-1&&s!==i-1){const[b]=n.splice(s,1);n.splice(n.findIndex(w=>w.id==="computer"),0,b)}const o=be(),l=b=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`,c=(b,w)=>`<span class="m-ico" style="--mc:${w}">${/^\s*<(?:svg|span)\b/i.test(b)?b:l(b)}</span>`,p=b=>{const w=b.replace(/^\//,"").replace(/\/$/,"");return w==="mock-test"?o[0]==="mock-test":t===w||t.split("/")[0]===w},h=n.map(b=>{const w=b.subcategories||b.sections||[];return`
        <li class="m-cat">
          <div class="m-row">
            <a class="m-item ${t.split("/")[0]===b.id?"active":""}" href="/category/${b.id}">
              ${c(ae(b.id),z(b.id))}
              <span class="m-txt">
                <b>${d(Q(b.name))}</b>
                <small>${ge(b)} ${d(r("cat.topics"))}</small>
              </span>
            </a>
            ${w.length?`<button class="m-toggle" data-toggle data-target="${b.id}" aria-label="toggle"><span class="caret"></span></button>`:""}
          </div>
          ${w.length?`<div class="m-sub" id="msub-${b.id}">${w.map(A=>{const C=A.sections;return C&&C.length?`
                <div class="m-row m-sub-row">
                  <a class="m-sub-link" href="/category/${b.id}/${A.id}">${d(Q(A.name))}</a>
                  <button class="m-toggle m-toggle-sm" data-toggle data-target="${b.id}-${A.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${b.id}-${A.id}">
                  ${C.map(E=>`<a class="m-sub-link" href="/category/${b.id}/${A.id}/${E.id}">${d(Q(E.name))}</a>`).join("")}
                </div>`:`<a class="m-sub-link" href="${!(A.topics&&A.topics.length)?`/topic/${b.id}/${A.id}`:`/category/${b.id}/${A.id}`}">${d(Q(A.name))}</a>`}).join("")}</div>`:""}
        </li>`}),m=[{href:"/mock-test",key:"nav.mock",color:"#0ea5e9",svg:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>'},{href:"/ebooks",key:"nav.ebooks",color:"#f59e0b",svg:'<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>'},{href:"/exams",key:"nav.exams",color:"#8b5cf6",svg:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',isNew:!0},{href:"/downloads",key:"nav.downloads",color:"#0d9488",svg:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'}].map(b=>`
      <a class="m-tile ${p(b.href)?"active":""}" href="${b.href}" style="--mc:${b.color}">
        ${b.isNew?`<span class="m-new">${u.uiLang==="as"?"নতুন":"NEW"}</span>`:""}
        ${c(b.svg,b.color)}
        <b>${d(r(b.key))}</b>
      </a>`),y=[{href:"/previous-year",key:"nav.previousYear",color:"#10b981",svg:'<path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>'},{href:"/download-app",key:"nav.downloadApp",color:"#16a34a",svg:'<rect x="7" y="2" width="10" height="20" rx="2.2"/><path d="M12 7v7"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/>'},{href:"/submit",key:"nav.submit",color:"#e11d48",svg:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'},{href:"/contact",label:u.uiLang==="as"?"যোগাযোগ":"Contact Us",color:"#64748b",svg:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'}].map(b=>`
      <a class="m-more ${p(b.href)?"active":""}" href="${b.href}" style="--mc:${b.color}">
        ${c(b.svg,b.color)}
        <span>${d(b.label||r(b.key))}</span>
      </a>`);e.innerHTML=`
      <li class="m-block">
        <p class="m-label">${d(r("nav.quickStart"))}</p>
        <div class="m-tiles">${m.join("")}</div>
      </li>
      <li class="m-block">
        <p class="m-label">${d(r("nav.categories"))}</p>
        <ul class="m-cats">${h.join("")}</ul>
      </li>
      <li class="m-block">
        <p class="m-label">${d(r("mmenu.extra"))}</p>
        <div class="m-more-grid">${y.join("")}</div>
      </li>`,P("[data-toggle]",e).forEach(b=>{b.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();const A=g(`#msub-${b.dataset.target}`);A&&(A.classList.toggle("open"),b.classList.toggle("open"))})})}function be(){let e=window.location.pathname.replace(/^\/|\/$/g,"");return e=e.replace(/^as(?:\/|$)/,""),window.location.search&&window.location.search.startsWith("?/")&&(e=window.location.search.slice(2).replace(/~and~/g,"&"),window.history.replaceState(null,null,"/"+e)),e.split("/").filter(Boolean)}function at(){return/^\/as(\/|$)/.test(window.location.pathname)}function nn(){const e=window.location.pathname,t=e.match(/^\/as(\/.*)?$/);return t?t[1]||"/":"/as"+e}function Rt(){return be().filter(e=>e!=="category"&&e!=="topic"&&e!=="mock-test").join("/")}function je(e){window.history.pushState(null,null,e),Re(),He(),Fe()}function nt(){const e=document.documentElement,t=e.style.scrollBehavior;e.style.scrollBehavior="auto",window.scrollTo(0,0),e.style.scrollBehavior=t}function Be(e,t){if(!e)return!1;let a=null;try{a=document.getElementById(e)||document.querySelector(`[name="${CSS.escape(e)}"]`)}catch{a=document.getElementById(e)}if(!a)return!1;const n=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h"))||0,s=a.getBoundingClientRect().top+window.pageYOffset-n-16,i=document.documentElement,o=i.style.scrollBehavior;return i.style.scrollBehavior=t?"smooth":"auto",window.scrollTo(0,Math.max(0,s)),t?setTimeout(()=>{i.style.scrollBehavior=o},600):i.style.scrollBehavior=o,!0}function sn(){const e=window.location.hash;if(!e||e==="#")return;let t=e.slice(1);try{t=decodeURIComponent(t)}catch{}if(Be(t,!1))try{history.replaceState(history.state,"",window.location.pathname+window.location.search)}catch{}}function on(){try{const e=be();let t="axomexam | Assam Exam Preparation – Mock Tests, Previous Papers & PDF Notes",a="Free bilingual (Assamese & English) Q&A, mock tests and PDF notes for Assam exam, ADRE, APSC and Assam Police preparation.";if(e[0]==="topic"){const o=u.topicMap[e.slice(1).join("/")];if(o){const l=v(o.topic.title||o.title);t=l?l+" | axomexam":t;const c=v(o.topic.description||o.desc);c&&(a=c)}}else if(e[0]==="category"&&e[1]){const o=u.categories.find(l=>l.id===e[1]);if(o){const l=v(o.name);t=l?l+" | axomexam":t;const c=v(o.description);c&&(a=c)}}else if(e[0]==="mock-test"){const o=u.categories.find(c=>c.id===e[1]),l=o?v(o.name):"";t=(l?l+" ":"")+"Mock Test | axomexam"}else if(e[0]==="previous-year")t="Previous Year Question Papers | axomexam";else if(e[0]==="trending")t="Trending Topics | axomexam";else if(e[0]==="downloads")t="Download Free PDF Notes | axomexam";else if(e[0]==="download-app")t="Download axomexam App (APK) | axomexam",a="Download the free axomexam Android app (APK, v2.1) — mock tests, bilingual Q&A practice, e-books and previous year papers for ADRE, APSC, Assam Police, SSC & Railway exams.";else if(e[0]==="ebooks")t=e[1]?"Read E-Book Online | axomexam":"E-Books Library | axomexam",a="Free online e-books for Assam competitive exams (ADRE, APSC, Assam Police) — Assam History, Indian History, Art & Culture, Polity, Economy and Geography. Read online in English and Assamese, no PDF download.";else if(e[0]==="exams"){const o=(u.exams||[]).find(m=>m.id===e[1]),l=o?v(o.title):"",c=o&&e[2]?(o.sections||[]).find(m=>m.id===e[2]):null,p=c?v(c.title):"",h=c&&e[3]?(c.subcategories||[]).find(m=>m.id===e[3]):null,f=h?v(h.title):"";f?(t=f+(p?" — "+p:"")+" | axomexam",a="Practise "+f+" MCQs with answers and explanations for Assam Police Constable (AB & UB) and other competitive exams in Assam."):p?t=p+(l?" — "+l:"")+" | axomexam":e[1]?t=(l?l+" ":"")+"Exam Book | axomexam":t="Your Exams | axomexam",f||(a="Choose your exam and prepare subject-wise — syllabus, Elementary Mathematics, General English, Logical Reasoning & Mental Ability, Assam's History, Geography & Culture and General Knowledge & Current Affairs. Read online in English and Assamese.")}else if(e[0]==="current-affairs"){const o=(e[1]||"").replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase());o?(t=o+" Current Affairs Q&A | axomexam",a="Free "+o+" current affairs questions with explained answers in Assamese and English — updated regularly by the axomexam team."):(t="Free Current Affairs Questions & Answers | axomexam",a="Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more, updated by the axomexam team.")}else e[0]==="categories"?t="All Categories | axomexam":["about","privacy","privacy-policy","terms","disclaimer","contact","submit","editorial-policy","editorial-team","sources","updates"].includes(e[0])&&(t=({about:"About Us",privacy:"Privacy Policy","privacy-policy":"Privacy Policy",terms:"Terms & Conditions",disclaimer:"Disclaimer",contact:"Contact Us",submit:"Submit Q&A","editorial-policy":"Editorial Policy","editorial-team":"Editorial Team",sources:"Official Sources",updates:"Content Updates"}[e[0]]||"axomexam")+" | axomexam");document.title=t;let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content=a;let s=window.location.pathname;s.endsWith("/")||(s+="/");const i=document.querySelector('link[rel="canonical"]');i&&(i.href=window.location.origin+s)}catch{}}const zt=Object.create(null);let Ht=null;function rn(){const e=document.querySelector("section.ca-rich");return e?e.getAttribute("data-ca-rich"):null}function jt(){const e=document.querySelector("section.ca-rich");e&&e.remove();const t=Array.from(document.head.childNodes),a=t.findIndex(n=>n.nodeType===8&&/ca-rich-schema:/.test(n.nodeValue||""));if(a!==-1)for(let n=a;n<t.length;n++){const s=t[n],i=s.nodeType===8&&/\/ca-rich-schema/.test(s.nodeValue||"");if(s.parentNode&&s.parentNode.removeChild(s),i)break}}async function ln(e){const t=Ht={},a=rn();if(!e){a!==null&&jt();return}if(a===e)return;const n=e==="index"?"/current-affairs/":"/current-affairs/"+encodeURIComponent(e)+"/";let s=zt[n];if(s===void 0)try{const b=await fetch(n,{cache:"no-store"});if(!b.ok)return;s=zt[n]=await b.text()}catch{return}if(Ht!==t)return;let i;try{i=new DOMParser().parseFromString(s,"text/html")}catch{return}const o=i.querySelector("section.ca-rich");if(!o)return;const l=Array.from(i.head.childNodes),c=l.findIndex(b=>b.nodeType===8&&/ca-rich-schema:/.test(b.nodeValue||"")),p=[];if(c!==-1)for(let b=c;b<l.length;b++){const w=l[b],A=w.nodeType===8&&/\/ca-rich-schema/.test(w.nodeValue||"");if(p.push(document.importNode(w,!0)),A)break}jt();const h=document.getElementById("app"),f=document.importNode(o,!0);h&&h.parentNode?h.parentNode.insertBefore(f,h.nextSibling):document.body.appendChild(f),p.forEach(b=>document.head.appendChild(b));const m=i.querySelector("title");m&&m.textContent&&(document.title=m.textContent);const x=i.querySelector('meta[name="description"]'),y=document.querySelector('meta[name="description"]');x&&y&&y.setAttribute("content",x.getAttribute("content")||"")}const Bt=Object.create(null);let Ft=null;function Ot(e){return e?e.length>1&&e.charAt(e.length-1)!=="/"?e+"/":e:"/"}async function cn(e){const t=Ft={},a=document.querySelector("section.axo-extra-content"),n=document.querySelector("[data-axo-editorial-credit]"),s=a?Ot(a.getAttribute("data-axo-path")):null,i=()=>{a&&a.remove(),n&&n.remove()};if(!e){i();return}const o=Ot(e);if(s===o)return;let l=Bt[o];if(l===void 0)try{const m=await fetch(o,{cache:"no-store"});l=Bt[o]=m.ok?await m.text():""}catch{return}if(Ft!==t)return;if(!l){i();return}let c;try{c=new DOMParser().parseFromString(l,"text/html")}catch{return}const p=c.querySelector("section.axo-extra-content"),h=c.querySelector("[data-axo-editorial-credit]"),f=document.getElementById("app");if(p){const m=document.importNode(p,!0);if(m.style.display="",a)a.replaceWith(m);else{const x=document.querySelector("[data-axo-editorial-credit]");let y,b;x?(y=x.parentNode,b=x):f?(y=f.parentNode,b=f.nextSibling):(y=null,b=null),y?y.insertBefore(m,b):document.body.appendChild(m)}}else a&&a.remove();if(h){const m=document.importNode(h,!0);if(n)n.replaceWith(m);else{const x=document.querySelector("section.axo-extra-content");let y,b;x?(y=x.parentNode,b=x.nextSibling):f?(y=f.parentNode,b=f.nextSibling):(y=null,b=null),y?y.insertBefore(m,b):document.body.appendChild(m)}}else n&&n.remove()}async function Fe(){const e=await dn();return sn(),e}async function dn(){if(!u.ready)return;const e=be(),t=g("#app");if(xe(),it(),Ks(e),nt(),on(),ln(e[0]==="current-affairs"?e[1]||"index":null),cn(e.length?window.location.pathname:null),aa(),e[0]!=="mock-test"&&u.mock&&u.mock.timerId&&(Ge(),u.mock=null,ht()),e[0]!=="mock-test"&&De(!1),u.lang=at()?"as":"en",document.body.setAttribute("data-lang",u.lang),e.length===0)return pn(t);if(e[0]==="category"){const a=u.categories.find(n=>n.id===e[1]);return a?e.length>=2&&e[2]?mn(t,e):hn(t,a):G(t)}if(e[0]==="topic"){const a=e.slice(1).join("/"),n=u.topicMap[a];return n?_t(t,n):G(t)}if(["about","privacy","privacy-policy","terms","disclaimer","editorial-policy","editorial-team","sources","updates"].includes(e[0])){const a=e[0]==="privacy-policy"?"privacy":e[0];return kn(t,a)}return e[0]==="contact"?$n(t):e[0]==="trending"?wn(t):e[0]==="previous-year"?es(t,e):e[0]==="categories"?Sn(t):e[0]==="search"?Cn(t):e[0]==="downloads"?Pn(t):e[0]==="download-app"?Zn(t):e[0]==="ebooks"?e[1]?Ln(t,e[1]):En(t):e[0]==="exams"?e[1]&&e[2]&&e[3]&&e[4]?Xn(t,e[1],e[2],e[3],e[4]):e[1]&&e[2]&&e[3]?Jn(t,e[1],e[2],e[3]):e[1]&&e[2]?Kn(t,e[1],e[2]):e[1]?Qn(t,e[1]):Bn(t):e[0]==="current-affairs"?e[1]?jn(t,e[1]):Hn(t):e[0]==="submit"?ns(t):e[0]==="mock-test"?rs(t,e):G(t)}function pn(e){const t=u.topicIndex.reduce((o,l)=>o+(l.nQuestions||0),0)+(u.examQuestionTotal||0)+(u.caQuestionTotal||0),a=u.topicsTotal||u.topicIndex.length,n=$t,s=Nt(u.topicIndex).slice(0,typeof CONFIG<"u"?CONFIG.TRENDING_COUNT:6);e.innerHTML=`
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${r("hero.daily")} • ADRE 3.0 / RRB
          </a>
          <h1>${r("hero.title")||"Crack Assam Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${r("hero.sub")||"Practice thousands of questions for Assam competitive exams and download printable PDF notes in both Assamese and English — for ADRE 3.0, APSC, Assam Police, SSC, Railway & more."}</p>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${t.toLocaleString()}+</b><span>${r("stat.questions")}</span></div>
            <div class="stat"><b id="stat-total-topics">${a.toLocaleString()}+</b><span>${r("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${n}+</b><span>${r("stat.pdfs")}</span></div>
          </div>
        </div>
        ${un()}
      </section>

      <section class="section feat-sec">
        <div class="section-head reveal">
          <div>
            <h2>${u.uiLang==="as"?"সুবিধাসমূহ":"Features"}</h2>
            <p class="sec-sub">${u.uiLang==="as"?"আৰম্ভ কৰিবলৈ এটা বিকল্প বাছনি কৰক":"Quick ways to start your preparation"}</p>
          </div>
        </div>
        <div class="feat-grid">
          <a class="feat-card reveal" href="/categories/" style="--fc:#4f46e5">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়াকৈ অনুশীলন আৰম্ভ কৰক":"Free Practicing"}</b><span>${u.uiLang==="as"?"বিষয়ভিত্তিক প্ৰশ্ন অনুশীলন":"Practice Q&A by subject"}</span></span>
          </a>
          <a class="feat-card reveal" href="/mock-test" style="--fc:#0ea5e9">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়াকৈ মক টেষ্ট দিয়ক":"Free Mock Test"}</b><span>${u.uiLang==="as"?"সময়বদ্ধ পৰীক্ষা-ধৰণৰ টেষ্ট":"Timed exam-pattern tests"}</span></span>
          </a>
          <a class="feat-card reveal" href="/ebooks" style="--fc:#f59e0b">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া ই-বুক":"Free eBooks"}</b><span>${u.uiLang==="as"?"যিকোনো সময়ত অনলাইন পঢ়ক":"Read online, anytime"}</span></span>
          </a>
          <a class="feat-card feat-new reveal" href="/exams" style="--fc:#8b5cf6">
            <span class="feat-new-badge"><span class="fnb-dot"></span>${u.uiLang==="as"?"নতুন":"NEW"}</span>
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া পৰীক্ষা-বহী":"Free Exam Books"}</b><span>${u.uiLang==="as"?"পৰীক্ষা-ভিত্তিক প্ৰস্তুতি":"Exam-wise preparation"}</span></span>
          </a>
          <a class="feat-card reveal" href="/previous-year" style="--fc:#10b981">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"পূৰ্ববৰ্তী বছৰৰ প্ৰশ্ন":"Previous Year Questions"}</b><span>${u.uiLang==="as"?"পূৰ্বৰ প্ৰশ্নপত্ৰসমূহ":"Solved past papers"}</span></span>
          </a>
          <a class="feat-card reveal" href="/category/articles" style="--fc:#e11d48">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া সবিশেষ প্ৰবন্ধ":"Free Detailed Articles"}</b><span>${u.uiLang==="as"?"অধ্যয়ন প্ৰবন্ধ":"Study articles"}</span></span>
          </a>
          <a class="feat-card reveal" href="/downloads" style="--fc:#0d9488">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া PDF টোকা":"Free PDF Notes"}</b><span>${u.uiLang==="as"?"প্ৰিন্ট কৰিব পৰা PDF নোট":"Printable PDF notes"}</span></span>
          </a>
          <a class="feat-card reveal" href="/current-affairs" style="--fc:#ef4444">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া চলিত ঘটনাৱলী":"Free Current Affairs"}</b><span>${u.uiLang==="as"?"আপডেট: ১ অক্টোবৰ ২০২৬ • দৈনিক প্ৰশ্ন আৰু ব্যাখ্যা":"Updated: 1 October 2026 • Q&A with answers"}</span></span>
          </a>
          <a class="feat-card feat-app reveal" href="/download-app/" style="--fc:#16a34a">
            <span class="feat-ico feat-ico-app"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v7"/><path d="m9 7 3 3 3-3"/><path d="M4 15.5c2.5-1.3 5.5-1.3 8 0 2.5-1.3 5.5-1.3 8 0"/><path d="M4 19c2.5-1.3 5.5-1.3 8 0 2.5-1.3 5.5-1.3 8 0"/></svg></span>
            <span class="feat-body"><b>${u.uiLang==="as"?"বিনামূলীয়া এপ ডাউনলোড কৰক":"Download Free App"}</b><span>${u.uiLang==="as"?"এণ্ড্ৰইড APK • v2.1":"Android APK • v2.1"}</span></span>
          </a>
        </div>
        <style>
          .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .feat-card { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 20px 16px; border-radius: 18px; border: 1px solid var(--line); background: radial-gradient(140% 140% at 100% 0%, color-mix(in srgb, var(--fc) 13%, transparent), transparent 58%), linear-gradient(180deg, var(--bg), var(--bg-soft)); box-shadow: var(--card-shadow); overflow: hidden; isolation: isolate; transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s, border-color .28s; }
          .feat-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, color-mix(in srgb, var(--fc) 78%, transparent), transparent 46%, color-mix(in srgb, var(--fc) 45%, transparent)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: 0; transition: opacity .28s; pointer-events: none; }
          .feat-card::after { content: ""; position: absolute; top: 0; bottom: 0; left: -120%; width: 55%; background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--fc) 26%, transparent), transparent); transform: skewX(-18deg); transition: left .75s cubic-bezier(.22, .61, .36, 1); pointer-events: none; }
          .feat-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--fc) 42%, var(--line)); box-shadow: 0 20px 42px -20px color-mix(in srgb, var(--fc) 60%, transparent), var(--card-shadow-hover); }
          .feat-card:hover::before { opacity: 1; }
          .feat-card:hover::after { left: 145%; }
          .feat-card:active { transform: translateY(-2px) scale(.99); }
          .feat-ico { flex: 0 0 auto; width: 50px; height: 50px; border-radius: 15px; display: grid; place-items: center; color: #fff; background: linear-gradient(145deg, color-mix(in srgb, var(--fc) 82%, #fff), var(--fc) 52%, color-mix(in srgb, var(--fc) 68%, #000)); box-shadow: 0 12px 24px -12px color-mix(in srgb, var(--fc) 90%, transparent), inset 0 1px 0 rgba(255, 255, 255, .4); transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s; }
          .feat-new-badge { position: absolute; top: 8px; right: 8px; z-index: 2; display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px 3px 7px; border-radius: 999px; font-size: .58rem; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: #fff; background: linear-gradient(120deg, #ff4d6d, #f43f5e 46%, #d90429); box-shadow: 0 6px 16px -6px rgba(217, 4, 41, .85), inset 0 1px 0 rgba(255, 255, 255, .45); animation: fnbPulse 1.9s ease-in-out infinite; }
          .feat-new-badge .fnb-dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 0 rgba(255, 255, 255, .75); animation: fnbDot 1.9s ease-out infinite; }
          .feat-card:hover .feat-new-badge { animation-play-state: paused; transform: scale(1.06); }
          @keyframes fnbPulse { 0%, 100% { box-shadow: 0 6px 16px -6px rgba(217, 4, 41, .85), inset 0 1px 0 rgba(255, 255, 255, .45), 0 0 0 0 rgba(244, 63, 94, .5); } 50% { box-shadow: 0 8px 20px -6px rgba(217, 4, 41, .95), inset 0 1px 0 rgba(255, 255, 255, .55), 0 0 0 6px rgba(244, 63, 94, 0); } }
          @keyframes fnbDot { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, .8); } 70%, 100% { box-shadow: 0 0 0 5px rgba(255, 255, 255, 0); } }
          @media (prefers-reduced-motion: reduce) { .feat-new-badge, .feat-new-badge .fnb-dot { animation: none; } }
          .feat-card:hover .feat-ico { transform: scale(1.07) rotate(-4deg); box-shadow: 0 16px 30px -12px color-mix(in srgb, var(--fc) 95%, transparent), inset 0 1px 0 rgba(255, 255, 255, .5); }
          .feat-ico svg { width: 23px; height: 23px; }
          .feat-ico-app { position: relative; overflow: hidden; border-radius: 14px; background: linear-gradient(150deg, #4ade80, #22c55e 42%, #15803d); box-shadow: 0 12px 24px -12px rgba(22, 163, 74, .95), inset 0 1px 0 rgba(255, 255, 255, .55), inset 0 -8px 16px -8px rgba(0, 0, 0, .28); }
          .feat-ico-app::before { content: ""; position: absolute; inset: 2px 2px auto; height: 46%; border-radius: 12px 12px 50% 50%; background: linear-gradient(180deg, rgba(255, 255, 255, .4), transparent); pointer-events: none; }
          .feat-ico-app::after { content: ""; position: absolute; right: -9px; bottom: -9px; width: 26px; height: 26px; border-radius: 50%; background: rgba(255, 255, 255, .18); pointer-events: none; }
          .feat-ico-app svg { position: relative; z-index: 1; width: 26px; height: 26px; filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .2)); }
          .feat-body { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; min-width: 0; }
          .feat-body b { font-size: .98rem; font-weight: 700; letter-spacing: -.2px; color: var(--ink); }
          .feat-body span { font-size: .775rem; line-height: 1.35; color: var(--ink-faint); }
          @media (max-width: 640px) {
            .feat-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
            .feat-card { gap: 9px; padding: 16px 12px; border-radius: 16px; min-height: 118px; }
            .feat-ico { width: 44px; height: 44px; border-radius: 13px; }
            .feat-ico svg { width: 21px; height: 21px; }
            .feat-body b { font-size: .9rem; }
            .feat-body span { font-size: .71rem; }
          }
        </style>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <div>
            <h2>${r("home.categories")}</h2>
            <p class="sec-sub">${r("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${Dt().map((o,l)=>{const c=z(o.id);return`
              <a class="cat-card reveal" href="/category/${o.id}" data-cat="${o.id}" style="--cat:${c}" data-delay="${l*60}">
                <span class="cat-ico">${ae(o.id)}</span>
                <span class="cat-meta">
                  ${qt(o.name)}
                  <span><span class="cat-count">${ge(o)}</span> ${o.id==="study-guides"?u.uiLang==="as"?"টা গাইড":"Guides":r("cat.topics")}</span>
                </span>
              </a>`}).join("")}
        </div>
        <style>
          @media (min-width: 544px) and (max-width: 799px) {
            .cat-card[data-cat="articles"] { grid-column: 2; }
          }
        </style>
      </section>

      <section class="section" style="padding-bottom: 40px;">
        <div class="section-head reveal">
          <div>
            <h2>${r("home.trending")}</h2>
            <p class="sec-sub">${r("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="/trending">${r("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${s.map((o,l)=>`
            <a class="topic-card reveal" href="/topic/${o.path}" style="--cat:${z(o.cat.id)}" data-delay="${l*50}">
              <span class="topic-ico">${ce(o.topic.id,o.cat.id)}</span>
              <span class="rank">${l+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${d(v(o.title))}</span>
                <span id="trend-count-${o.path.replace(/\//g,"-")}">${d(v(o.cat.name))} • ${o.cat.id==="study-guides"?u.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${o.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
              <span class="trend-flame">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </span>
            </a>`).join("")}
        </div>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Assam Exam Preparation at Your Fingertips</h2>
            <p class="sec-sub">Free mock tests, previous year papers & study notes for every Assam competitive exam</p>
          </div>
        </div>
        <style>
          .seo-read-more { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          .seo-read-more.expanded { display:block; -webkit-line-clamp:unset; }
        </style>
        <div style="max-width:860px; margin:0 auto; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:26px 28px; box-shadow:0 6px 20px -8px rgba(15,23,42,0.06); text-align:left;">
          <div class="seo-read-more" id="seo-read-more">
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              <b style="color:var(--ink,#0f172a);">axomexam</b> is a free bilingual study platform built for <b>Assam exam</b> aspirants — however you search for it, whether <b>axom exam</b>, <b>assam exam</b> or <b>assamexam</b>. Whether you are preparing for the <b>ADRE</b> (Assam Direct Recruitment Examination), <b>APSC</b>, <b>Assam Police</b>, or central exams like SSC and Railway, you will find thousands of practice questions, mock tests and previous year papers — all available in both English and Assamese. Many students look for the <b>exam Assam</b> or <b>exam Axom</b> (অসম পৰীক্ষা), and <b>axomexam</b> makes sure every major Assam government recruitment exam is covered here.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              From Assam General Knowledge, Assam History and Assam Geography to Indian Polity, Mathematics, Reasoning, General English and Science, the question bank is organised subject-wise so you can practise topic by topic. Each question includes a clear answer and explanation, and every mock test runs on a live timer just like the real exam — completely free, with no registration needed.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0;">
              Get started with a <a href="/mock-test" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">free mock test</a>, go through the <a href="/previous-year" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">previous year solved papers</a>, or download <a href="/downloads" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">PDF study notes</a> for offline practice.
            </p>
          </div>
          <button id="seo-read-more-btn" type="button" style="margin-top:14px; padding:8px 18px; border-radius:99px; font-weight:800; font-size:0.85rem; cursor:pointer; color:var(--primary,#2563eb); background:var(--primary-soft,#eff6ff); border:1px solid var(--border,#cbd5e1);">Read More</button>
        </div>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p class="sec-sub">Everything you need to know about practising on axomexam</p>
          </div>
        </div>
        <div style="max-width:860px; margin:0 auto; text-align:left;">
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Is axomexam free to use?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam is completely free. All mock tests, previous year solved papers and PDF notes are available without registration or payment.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Which exams does axomexam cover?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">axomexam covers Assam state exams such as ADRE (Assam Direct Recruitment Examination), APSC, Assam Police / SLPRB, DHS and DME/DTE, as well as central exams including SSC (CGL, CHSL, GD) and Railway (RRB NTPC, Group D).</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Are the questions available in Assamese as well as English?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. Every question, answer and explanation on axomexam is bilingual, so you can practise in both Assamese and English.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Does axomexam provide timed mock tests?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam mock tests run on a live timer and follow the real exam pattern, with instant results and answer explanations.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Can I download PDF notes and previous year papers?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. PDF study notes, e-books and previous year solved papers can be downloaded for offline practice.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Do I need an account to practise on axomexam?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">No. You can start practising mock tests and questions immediately without creating an account.</p>
          </details>
        </div>
      </section>`;const i=g("#seo-read-more-btn");i&&i.addEventListener("click",()=>{const o=g("#seo-read-more");if(!o)return;const l=o.classList.contains("expanded");o.classList.toggle("expanded",!l),i.textContent=l?"Read More":"Read Less"}),L(),Wn(),ia()}function un(){const e=typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_NAME||"ADRE / Assam Police",t=new Date(typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_DATE||"2026-12-31").getTime(),a=Date.now(),n=t>a?Math.max(0,Math.ceil((t-a)/864e5)):0;return`
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${(314*(1-(t>a?Math.min(1,n/365):0))).toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${n}</span>
            <span class="ring-label">${r("hero.days")}</span>
            <span class="ring-label">${d(e)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
      </div>`}function Nt(e){return e.slice().sort((t,a)=>!!t.extra!=!!a.extra?t.extra?-1:1:t.popularity!==a.popularity?a.popularity-t.popularity:(a.nQuestions||0)-(t.nQuestions||0))}function hn(e,t){const a=t.subcategories||t.sections||[],n=t.topics||[],s=t.id==="articles";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${d(v(t.description))||d(v(t.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((c,p)=>{const h=!s&&!(c.sections&&c.sections.length)&&!(c.topics&&c.topics.length),f=h?u.topicMap[`${t.id}/${c.id}`]:null,m=s?`/category/${t.id}/${c.id}/read`:h?`/topic/${t.id}/${c.id}`:`/category/${t.id}/${c.id}`,x=s?u.uiLang==="as"?"প্ৰবন্ধ পঢ়ক →":"Read Articles →":h?`<span id="count-${f?f.path.replace(/\//g,"-"):`${t.id}-${c.id}`}">${f&&f.nQuestions>0?`${f.nQuestions} ${r("topic.questions")}`:r("btn.practice")}</span>`:`${(c.sections?c.sections.length:0)||(c.topics?c.topics.length:0)} ${c.sections?r("cat.subsections"):r("cat.topics")}`;return`
              <a class="sub-card reveal" href="${m}" style="--cat:${z(t.id)}" data-delay="${p*50}">
                <span class="sub-ico">${ce(c.id,t.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${Xe(c.name,"0.94rem")}
                  <span style="font-size:0.75rem; font-weight:${s?"700":"400"}; color:${s?z(t.id):"var(--ink-soft,#64748b)"};">${x}</span>
                </span>
              </a>`}).join("")}
          </div>`:n.length?st(t,null,null,n):ot()}
      </section>`,L();const o=u.topicIndex.filter(c=>c.cat&&c.cat.id===t.id).reduce((c,p)=>c+(p.nQuestions||0),0),l=a.map(c=>({name:v(c.name),count:c.sections&&c.sections.length||c.topics&&c.topics.length||0}));O(e,{id:t.id,name:v(t.name),count:a.length,total:o,h2:v(t.name)+" preparation for Assam exams",items:l})}function mn(e,t){const a=u.categories.find(p=>p.id===t[1]),n=(a.subcategories||a.sections||[]).find(p=>p.id===t[2]);if(!n)return G(e);if(a.id==="articles")return gn(e,a,n);if(t[3]){const p=(n.sections||[]).find(h=>h.id===t[3]);return p?fn(e,a,n,p):G(e)}if(!(n.sections&&n.sections.length)&&!(n.topics&&n.topics.length)){const p=u.topicMap[`${a.id}/${n.id}`];if(p)return _t(e,p)}const s=n.sections,i=n.topics;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${a.id}">${d(v(a.name))}</a>
          <span class="bc-sep">/</span><span>${d(v(n.name))}</span>
        </nav>
        <h1>${d(v(n.name))}</h1>
        <p class="page-desc">${d(v(n.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${s&&s.length?`
          <div class="sub-grid">
            ${s.map((p,h)=>`
              <a class="sub-card reveal" href="/category/${a.id}/${n.id}/${p.id}" style="--cat:${z(a.id)}" data-delay="${h*50}">
                <span class="sub-ico">${ce(p.id,a.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${Xe(p.name,"0.94rem")}
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(p.topics||[]).length} ${r("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>`:i&&i.length?st(a,n,null,i):ot()}
      </section>`,L();const l=u.topicIndex.filter(p=>p.cat&&p.cat.id===a.id&&p.sub&&p.sub.id===n.id).reduce((p,h)=>p+(h.nQuestions||0),0),c=(s&&s.length?s:i||[]).map(p=>({name:v(p.name),count:p.topics&&p.topics.length||0}));O(e,{id:n.id,name:v(n.name),count:c.length,total:l,h2:v(n.name)+" - topics and practice questions",items:c})}function fn(e,t,a,n){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}">${d(v(t.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}/${a.id}">${d(v(a.name))}</a>
          <span class="bc-sep">/</span><span>${d(v(n.name))}</span>
        </nav>
        <h1>${d(v(n.name))}</h1>
        <p class="page-desc">${d(v(n.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${st(t,a,n,n.topics||[])}
      </section>`,L();const i=u.topicIndex.filter(o=>o.cat&&o.cat.id===t.id&&o.sub&&o.sub.id===a.id&&o.section&&o.section.id===n.id).reduce((o,l)=>o+(l.nQuestions||0),0);O(e,{id:n.id,name:v(n.name),count:(n.topics||[]).length,total:i,h2:v(n.name)+" - practice questions and revision",items:(n.topics||[]).map(o=>({name:v(o.name),count:(u.topicMap[[t.id,a.id,n.id,o.id].join("/")]||{}).nQuestions||0,unit:"questions"}))})}function st(e,t,a,n){if(!n.length)return ot();const s=e.id==="study-guides",i=u.uiLang==="as"?"পঢ়ক (Read Guide) →":"Read Guide →";return`
      <div class="sub-grid">
        ${n.map((o,l)=>{const c=[e.id,t?t.id:"",a?a.id:""].filter(Boolean).concat([o.id]).join("/"),p=u.topicMap[c],h=p&&p.nQuestions>0?p.nQuestions:(o.questions||[]).length,f=s?i:h>0?`${h} ${r("topic.questions")}`:r("btn.practice");return`
            <a class="sub-card reveal" href="/topic/${c}" style="--cat:${z(e.id)}" data-delay="${l*50}">
              <span class="sub-ico">${ce(o.id,e.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                ${Xe(o.name,"0.91rem")}
                <span id="count-${c.replace(/\//g,"-")}" style="${s?"color:var(--primary,#2563eb); font-weight:700;":""}">${f}</span>
              </span>
            </a>`}).join("")}
      </div>`}function ot(){return`<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${r("search.noresult")}</p></div>`}async function gn(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let n=null;try{n=await API.getArticles(a.id)}catch{n=null}if(!n||!(n.articles||n.questions||[]).length){const i=u.lang==="as";e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${d(v(a.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${i?"এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।":"No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${t.id}">${i?"পিছলৈ যাওক":"Go Back"}</a></div>
        </div>`;return}const s={path:`articles/${a.id}`,cat:t,sub:a,section:null,topic:{id:a.id,title:n&&n.title||a.name,description:n&&n.description||a.description||{},questions:n&&(n.articles||n.questions)||[]}};Wt(e,s)}function Gt(e){const t=[`<a href="/">${r("breadcrumb.home")}</a>`];return t.push(`<a href="/category/${e.cat.id}">${d(v(e.cat.name))}</a>`),e.sub&&t.push(`<a href="/category/${e.cat.id}/${e.sub.id}">${d(v(e.sub.name))}</a>`),e.section&&t.push(`<a href="/category/${e.cat.id}/${e.sub?e.sub.id+"/":""}${e.section.id}">${d(v(e.section.name))}</a>`),t.map((a,n)=>(n?'<span class="bc-sep">/</span>':"")+a).join("")}async function _t(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;try{const n=await API.getTopic(t.cat.id,t.topic.id,t.sub&&t.sub.id,t.cat&&t.cat.contentLayout);n&&(t.topic=Object.assign({},t.topic,n),t.topic.title=t.topic.title||t.title,t.nQuestions=(n.questions||[]).length)}catch{}if(t.cat.id==="study-guides")return Wt(e,t);const a=t.topic.questions||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">${Gt(t)}</nav>
        <h1>${d(v(t.topic.title))}</h1>
        <p class="page-desc">${d(v(t.topic.description))||""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${a.length} ${r("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${u.lang==="as"?"active":""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${r("topic.lang.as")}</button>
                <button class="lang-btn ${u.lang==="en"?"active":""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${r("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
        </div>
      </div>
    `,bn(),ne(z(t.cat.id)),g("#qa-reading").addEventListener("click",xn),P(".lang-btn").forEach(n=>{n.addEventListener("click",()=>{u.lang=n.dataset.lang,document.body.setAttribute("data-lang",u.lang),P(".lang-btn").forEach(s=>s.classList.toggle("active",s.dataset.lang===u.lang)),yn()})})}function Wt(e,t){const a=t.topic.questions||t.topic.sections||[],n=u.lang==="as",i=t.cat&&t.cat.id==="articles"?n?"প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ":"Read Articles • Reading Only":n?"সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)":"Complete In-Depth Study Guide";e.innerHTML=`
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${Gt(t)}</nav>
        <h1 class="art-main-title">${d(v(t.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${d(v(t.topic.description))||""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${i}
          </span>
          <div class="art-lang-switch-box" role="group" aria-label="Article Language">
            <button class="art-glang-btn ${u.lang==="as"?"active":""}" type="button" data-lang="as">
              <span class="active-dot"></span>অসমীয়া
            </button>
            <button class="art-glang-btn ${u.lang==="en"?"active":""}" type="button" data-lang="en">
              <span class="active-dot"></span>English
            </button>
          </div>
        </div>
      </div>

      <div class="article-wrapper" style="max-width:860px; margin:0 auto; padding:0 16px 50px 16px; box-sizing:border-box;">
        <article id="article-body-content" class="article-card-box"></article>
      </div>

      <style>
        .art-main-title { font-size: 1.8rem; font-weight: 900; line-height: 1.35; color: var(--ink, #0f172a); margin-bottom: 10px; letter-spacing: -0.3px; }
        .art-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border, #e2e8f0); border-bottom: 1px solid var(--border, #e2e8f0); padding: 12px 0; }
        .art-lang-switch-box { display: inline-flex; background: var(--bg-subtle, #f1f5f9); border: 1.5px solid var(--border, #cbd5e1); border-radius: 24px; padding: 3px; gap: 2px; }
        .art-glang-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; font-weight: 700; font-size: 0.82rem; border-radius: 20px; border: none; cursor: pointer; transition: all 0.2s ease-in-out; background: transparent; color: var(--ink-soft, #64748b); }
        .art-glang-btn .active-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: none; }
        .art-glang-btn.active { background: #2563eb !important; color: #ffffff !important; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }
        .art-glang-btn.active .active-dot { display: inline-block; }
        .article-card-box { background: var(--card-bg, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 20px; padding: 36px 32px; box-shadow: 0 10px 30px -6px rgba(15,23,42,0.04); text-align: left; }
        .article-part-block { margin-bottom: 34px; padding-bottom: 26px; border-bottom: 1px dashed var(--border, #e2e8f0); }
        .article-part-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .art-headline { font-size: 1.3rem; font-weight: 800; color: var(--ink, #0f172a); margin: 0 0 14px 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
        .art-paragraph { font-size: 1.02rem; line-height: 1.85; color: var(--ink-soft, #334155); margin: 0 0 16px 0; text-align: left; word-break: break-word; font-weight: 400; }
        .art-keynote { background: var(--bg-subtle, #f8fafc); border-left: 4px solid var(--primary, #2563eb); padding: 14px 18px; border-radius: 10px; font-size: 0.92rem; line-height: 1.65; color: var(--ink-muted, #475569); border-top: 1px solid var(--border, #f1f5f9); border-right: 1px solid var(--border, #f1f5f9); border-bottom: 1px solid var(--border, #f1f5f9); }
        
        @media (max-width: 640px) {
          .art-main-title { font-size: 1.35rem !important; line-height: 1.35 !important; }
          .article-card-box { padding: 20px 16px !important; border-radius: 14px !important; }
          .art-headline { font-size: 1.12rem !important; }
          .art-paragraph { font-size: 0.95rem !important; line-height: 1.75 !important; }
          .art-top-bar { justify-content: center !important; flex-direction: column !important; text-align: center !important; gap: 10px !important; }
          .art-lang-switch-box { width: 100% !important; justify-content: center !important; }
          .art-glang-btn { flex: 1 !important; justify-content: center !important; padding: 8px 0 !important; }
        }

        [data-theme="dark"] .article-card-box { background: var(--bg-soft, #0f172a) !important; border-color: var(--border, #2b3a55) !important; }
        [data-theme="dark"] .art-lang-switch-box { background: #0f172a !important; border-color: #334155 !important; }
        [data-theme="dark"] .art-glang-btn { color: #94a3b8 !important; }
        [data-theme="dark"] .art-keynote { background: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
      </style>
    `,(()=>{const l=g("#article-body-content");l&&(l.innerHTML=["en","as"].map(c=>{const p=c==="as"?"গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)":"Key Highlights";return`<div data-axo-lang="${c}">${a.map(h=>{const f=T(h,"question",c),m=T(h,"answer",c),x=T(h,"explanation",c);return`
            <div class="article-part-block">
              <h2 class="art-headline">
                <span>${q(f)}</span>
              </h2>
              <div class="art-paragraph">${q(m)}</div>
              ${x?`
                <div class="art-keynote">
                  <b style="color:var(--primary,#2563eb);">${p}:</b> ${q(x)}
                </div>`:""}
            </div>
          `}).join("")}</div>`}).join(""),ee(l))})(),ne(z(t.cat&&t.cat.id)),P(".art-glang-btn").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.lang;u.lang!==c&&(u.lang=c,document.body.setAttribute("data-lang",u.lang),P(".art-glang-btn").forEach(p=>{p.classList.toggle("active",p.dataset.lang===u.lang)}))})})}function bn(){const e=rt();if(!e)return;const t=e.topic.questions||[],a=0,n=t,s=g("#qa-list"),i=/(?:^|\/)(image-series|image-analogy)$/.test(e.path||"");s.classList.toggle("nv-fig-wide",i),n.length?(s.innerHTML=n.map((o,l)=>{const c=a+l+1,p=u.mock&&u.mock.testLang?u.mock.testLang:u.lang,h=p==="as"?"en":"as";return`<div data-axo-lang="${p}">${Qt(o,c,p)}</div><div data-axo-lang="${h}">${Qt(o,c,h)}</div>`}).join(""),ee(s)):s.innerHTML=`<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${r("toast.noquestions")}</p></div>`}function Qt(e,t,a){{const n=T(e,"question",a),s=T(e,"answer",a),i=F(e,a),o=T(e,"explanation",a),l=re(e),c=le(e),p=a,h=e.a&&typeof e.a=="object"&&e.a[p]||e.a||e.answer;return Array.isArray(h)||s.includes("qa-step-line")?`
            <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${t}. ${q(n)}
              </div>
              ${l}
              ${c?K(e,{compact:!0}):i.length?`
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-direction:column; gap:6px; font-weight:500; text-align:left; align-items:flex-start;">
                  ${i.map((m,x)=>{const y=`(${String.fromCharCode(65+x)}) ${m}`;return`<span>${q(y)}</span>`}).join("")}
                </div>`:""}
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${s}</div>
                ${o?`
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${o}
                  </div>`:""}
              </div>
            </article>`:`
            <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${t}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${q(n)}</span>
              </div>
              ${l}
              ${c?K(e):i.length?`
                <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${i.map((m,x)=>`
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+x)})</b> 
                      <span style="flex:1; line-height:1.4;">${q(m)}</span>
                    </div>
                  `).join("")}
                </div>`:""}
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${r("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${q(s)}</span>
              </div>
              ${o?`
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${q(o)}
                </div>`:""}
            </article>`}}function vn(){let e=g("#read-modal");return e||(e=document.createElement("div"),e.id="read-modal",e.className="read-modal",e.hidden=!0,e.innerHTML=`
      <div class="read-modal-backdrop" id="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" aria-modal="true" style="max-width:760px; width:92%; margin:auto; border-radius:18px; text-align:left; background:var(--bg,#ffffff);">
        <div class="read-modal-head" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border,#e2e8f0);">
          <div class="read-modal-titles" style="text-align:left;">
            <span class="read-modal-title" style="font-size:1.15rem; font-weight:800; display:block; color:var(--ink,#0f172a);"></span>
            <span class="read-modal-sub" style="font-size:0.82rem; color:var(--ink-muted,#64748b);"></span>
          </div>
          <button id="read-modal-close" class="read-close" type="button" aria-label="Close" style="background:transparent; border:none; cursor:pointer; padding:6px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="read-modal-body" id="read-modal-body" style="padding:20px; max-height:70vh; overflow-y:auto; text-align:left; box-sizing:border-box;"></div>
      </div>`,document.body.appendChild(e),g("#read-modal-close",e).addEventListener("click",it),g("#read-modal-backdrop",e).addEventListener("click",it),e)}function xn(){const e=rt();if(!e)return;const t=vn(),a=e.topic.questions||[];g(".read-modal-title",t).textContent=v(e.topic.title),g(".read-modal-sub",t).textContent=`${a.length} ${r("topic.questions")} • ${u.lang==="as"?r("topic.lang.as"):r("topic.lang.en")}`,t.hidden=!1,Yt()}function it(){const e=g("#read-modal");e&&(e.hidden=!0)}function Yt(){const e=rt(),t=g("#read-modal");if(!e||!t||t.hidden)return;const a=e.topic.questions||[];g(".read-modal-sub",t).textContent=`${a.length} ${r("topic.questions")} • ${u.lang==="as"?r("topic.lang.as"):r("topic.lang.en")}`;const n=g("#read-modal-body",t);n.innerHTML=a.map((s,i)=>{const o=i+1,l=T(s,"question"),c=T(s,"answer"),p=F(s),h=re(s),f=le(s),m=u.mock&&u.mock.testLang?u.mock.testLang:u.lang,x=s.a&&typeof s.a=="object"&&s.a[m]||s.a||s.answer;return Array.isArray(x)||c.includes("qa-step-line")?`
          <article class="qa-card read-item" data-n="${o}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${o}. ${q(l)}
            </div>
            ${h}
            ${f?K(s,{compact:!0}):p.length?`
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; align-items:flex-start;">
                ${p.map((b,w)=>{const A=`(${String.fromCharCode(65+w)}) ${b}`;return`<span>${q(A)}</span>`}).join("")}
              </div>`:""}
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${c}</div>
            </div>
          </article>`:`
          <article class="qa-card read-item" data-n="${o}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${o}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${q(l)}</span>
            </div>
            ${h}
            ${f?K(s):p.length?`
              <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                ${p.map((b,w)=>`
                  <div style="font-size:0.86rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:7px 10px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                    <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+w)})</b>
                    <span style="flex:1; line-height:1.4;">${q(b)}</span>
                  </div>
                `).join("")}
              </div>`:""}
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${r("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${q(c)}</span>
            </div>
          </article>`}).join(""),ee(n)}function yn(){const e=g("#read-modal");!e||e.hidden||Yt()}function rt(){const e=be();return e[0]!=="topic"?null:u.topicMap[e.slice(1).join("/")]}function wn(e){const t=Nt(u.topicIndex);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("page.trending.title")}</span></nav>
        <h1>${r("page.trending.title")}</h1>
        <p class="page-desc">${r("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${t.map((a,n)=>`
            <a class="topic-card reveal" href="/topic/${a.path}" style="--cat:${z(a.cat.id)}" data-delay="${n%10*40}">
              <span class="topic-ico">${ce(a.topic.id,a.cat.id)}</span>
              <span class="rank">${n+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${d(v(a.title))}</span>
                <span id="trend-count-${a.path.replace(/\//g,"-")}">${d(v(a.cat.name))}${a.sub?" • "+d(v(a.sub.name)):""} • ${a.cat.id==="study-guides"?u.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${a.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,L()}function kn(e,t){const a=u.lang==="as";let n="",s="",i="";t==="about"?(n=a?"axomexam সম্পৰ্কে":"About axomexam",s=a?"আমি কোন, আমাৰ অধ্যয়ন সামগ্ৰী কেনেদৰে প্ৰস্তুত কৰা হয়, আৰু অসমৰ প্ৰতিজন পৰীক্ষাৰ্থীৰ বাবে ইয়াক কেনেদৰে বিনামূলীয়া আৰু নিৰ্ভুল ৰখা হয়।":"Who we are, how our study material is prepared, and how we keep it free and accurate for every Assam exam aspirant.",i=a?`
        <p><strong>axomexam.in</strong> হৈছে অসমৰ চৰকাৰী নিযুক্তি পৰীক্ষা আৰু ৰাজ্যখনত জনপ্ৰিয় কেন্দ্ৰীয় পৰীক্ষাসমূহৰ বাবে প্ৰস্তুতি চলাই থকা প্ৰাৰ্থীসকলৰ বাবে এখন স্বতন্ত্ৰ, বিনামূলীয়া অধ্যয়ন মঞ্চ। ই দ্বিভাষিক অনুশীলন প্ৰশ্নৰ এখন সৰু সংগ্ৰহ হিচাপে আৰম্ভ হৈছিল আৰু এতিয়া সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি এটা সংগঠিত লাইব্ৰেৰী হৈ পৰিছে — য'ত প্ৰতিটো প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত উপলব্ধ।</p>

        <h2>আমাৰ লক্ষ্য</h2>
        <p>আমাৰ বিশ্বাস যে সৰু চহৰত পঢ়া এজন প্ৰাৰ্থীয়ে চহৰৰ কোচিং কেন্দ্ৰৰ প্ৰাৰ্থীৰ দৰেই একে মানৰ অনুশীলন সমল পোৱা উচিত — কোনো মাচুল নিদিয়াকৈ আৰু একাউণ্ট নখুলাকৈ। axomexam.in ৰ প্ৰতিটো অংশ পঢ়া, অনুশীলন কৰা আৰু ডাউনল'ড কৰা বিনামূলীয়া, আৰু ভাষা কেতিয়াও প্ৰস্তুতিৰ বাধা নহয়।</p>

        <h2>আমি কি আগবঢ়াওঁ</h2>
        <ul>
          <li><strong>বিষয়ভিত্তিক প্ৰশ্ন-সংগ্ৰহ:</strong> সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি আৰু ইংৰাজীত, প্ৰতিটোৰ উত্তৰ আৰু প্ৰয়োজনত ধাপে ধাপে সমাধানসহ।</li>
          <li><strong>সময় নিৰ্ধাৰিত মক টেষ্ট:</strong> প্ৰকৃত প্ৰশ্নকাকতৰ আৰ্হি অনুসৰি, লাইভ কাউণ্টডাউন, তৎক্ষণাত ফলাফল আৰু উত্তৰ পুনৰীক্ষণসহ।</li>
          <li><strong>বিগত বৰ্ষৰ সমাধান কৰা প্ৰশ্নকাকত:</strong> SSC, ৰে'লৱে, অসম আৰক্ষী, গুৱাহাটী উচ্চ ন্যায়ালয়, DHS আৰু DME আদি পৰীক্ষাৰ বাবে।</li>
          <li><strong>ই-বুক আৰু PDF নোট:</strong> পুনৰাবৃত্তিৰ বাবে, অসমৰ ইতিহাস, ভাৰতীয় ৰাজনীতি, ভূগোল, অৰ্থনীতি, কলা আৰু সংস্কৃতি আদি সামৰি।</li>
          <li><strong>এখন বিনামূলীয়া Android এপ:</strong> যাতে অনুশীলন সামগ্ৰী য'ত-ত'ৱে অফলাইনত ব্যৱহাৰ কৰিব পাৰি।</li>
        </ul>

        <h2>আমাৰ সমল কেনেদৰে প্ৰস্তুত কৰা হয়</h2>
        <p>প্ৰতিটো বিষয় প্ৰথমে সংশ্লিষ্ট পৰীক্ষাৰ চৰকাৰী পাঠ্যক্ৰম অনুসৰি শিতান আৰু বিষয়ত ভাগ কৰা হয়। তাৰ পিছত বিষয় অনুসৰি প্ৰশ্ন যোগ কৰি সত্যতা, বানান আৰু স্পষ্টতা পৰীক্ষা কৰা হয়। যি প্ৰাৰ্থীয়ে এটা প্ৰশ্ন ভুল কৰিছে তেওঁ উত্তৰটো মুখস্থ নকৰি ধাৰণাটো বুজি পোৱাৰ বাবে সহজ ভাষাত ব্যাখ্যা লিখা হয়। প্ৰকাশৰ আগতে তথ্যসমূহ চৰকাৰী জাননী, মানক প্ৰসংগ পুথি আৰু ৰাজহুৱাভাৱে উপলব্ধ চৰকাৰী উৎসৰ সৈতে মিলাই পৰীক্ষা কৰা হয়।</p>

        <h2>সম্পাদকীয় মান</h2>
        <p>সকলো সামগ্ৰী axomexam সম্পাদকীয় দলৰ দ্বাৰা প্ৰস্তুত আৰু পৰ্যালোচনা কৰা হয়, যিয়ে কেৱল এই মঞ্চৰ অধ্যয়ন সমলত কাম কৰে। কোনো পৰীক্ষা, কোচিং প্ৰতিষ্ঠান বা সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বাবে আমি ধন লোৱা নাই, আৰু পৃষ্ঠপোষকতা কৰা সামগ্ৰী কেতিয়াও অধ্যয়ন সমল হিচাপে প্ৰকাশ নকৰা হয়। পাঠ্যক্ৰম, পৰীক্ষাৰ আৰ্হি বা তথ্য সলনি হ'লে পৃষ্ঠাসমূহ নিয়মীয়াকৈ পৰ্যালোচনা আৰু হালনাগাদ কৰা হয়।</p>

        <h2>শুদ্ধতা আৰু সংশোধন</h2>
        <p>আমি প্ৰতিটো তথ্য সঠিক ৰাখিবলৈ চেষ্টা কৰোঁ, কিন্তু পৰীক্ষাৰ আৰ্হি, পাঠ্যক্ৰমৰ বিৱৰণ আৰু চৰকাৰী জাননী সলনি হ'ব পাৰে। axomexam.in এখন স্বতন্ত্ৰ অধ্যয়ন সহায়িকা, চৰকাৰী প'ৰ্টেল নহয় — তাৰিখ, যোগ্যতা আৰু পৰীক্ষাৰ আৰ্হি সদায় চৰকাৰী জাননীৰ পৰা নিশ্চিত কৰক। আপুনি কিবা ভুল বা ভাঙা লিংক পালে পৃষ্ঠাৰ লিংক আৰু সঠিক তথ্যসহ আমালৈ লিখক, আমি যাচাই কৰি সংশোধন কৰিম। সংশোধন আৰু অৱদান কেতিয়াও কোনো বাণিজ্যিক উদ্দেশ্যত ব্যৱহাৰ কৰা নহয়।</p>

        <h2>axomexam কাৰ দ্বাৰা পৰিচালিত</h2>
        <p>axomexam.in প্ৰতিষ্ঠা আৰু সম্পাদনা কৰে <strong>axomexam সম্পাদকীয় দলে</strong>। সম্পাদকীয় দলত আছে <strong>হৰ্ষ বৰ্মন</strong> (দল পৰিচালক, ইতিহাসত M.A.), <strong>অভিক ৰয়</strong> (দল সদস্য, MBA) আৰু <strong>গৌতম দাস</strong> (দল সদস্য, B.Sc.)। তেওঁলোকৰ ভূমিকা আৰু পৰ্যালোচনাৰ কাৰ্যপ্ৰবাহ <a href="/editorial-team/">সম্পাদকীয় দল পৃষ্ঠা</a>ত বৰ্ণনা কৰা হৈছে।</p>

        <h2>এই ছাইট কাৰ বাবে</h2>
        <p>এই সামগ্ৰী ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণী, অসম আৰক্ষী উপ-পৰিদৰ্শক আৰু কনিষ্টবল, APSC, পঞ্চায়ত আৰু গ্ৰামোন্নয়ন, বন বিভাগ, DHS আৰু DME, লগতে SSC CGL, CHSL আৰু GD, আৰু RRB NTPC আৰু Group D ৰ দৰে কেন্দ্ৰীয় পৰীক্ষাৰ প্ৰাৰ্থীসকলৰ বাবে ডিজাইন কৰা হৈছে। আপুনি আৰম্ভণিৰ পৰা শিকিছে নে চূড়ান্ত পুনৰাবৃত্তি কৰিছে, বিষয়ভিত্তিক গাঁথনিয়ে আপোনাক নিজৰ গতিত অধ্যয়ন কৰিবলৈ দিয়ে।</p>

        <h2>যোগাযোগ কৰক</h2>
        <p>প্ৰশ্ন, সংশোধন আৰু পৰামৰ্শ সদায় স্বাগতম। <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ ইমেইল কৰক বা আমাৰ <a href="/contact/">যোগাযোগ পৃষ্ঠা</a> ব্যৱহাৰ কৰক। আমি সাধাৰণতে দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত উত্তৰ দিওঁ।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p><strong>axomexam.in</strong> is an independent, free study platform for candidates preparing for government recruitment examinations in Assam and for central examinations that are popular in the state. It began as a small collection of bilingual practice questions and has grown into a structured library that covers General Knowledge, Mathematics, General Science, Reasoning Ability, General English and Computer Awareness — with every question, answer and explanation available in both English and Assamese.</p>

        <h2>Our Mission</h2>
        <p>We believe that a candidate studying in a small town should have access to the same quality of practice material as a candidate in a city coaching centre — without paying a fee and without creating an account. Every part of axomexam.in is free to read, practise and download, and language is never a barrier to preparation.</p>

        <h2>What We Offer</h2>
        <ul>
          <li><strong>Topic-wise question banks</strong> in General Knowledge, Mathematics, General Science, Reasoning and English, each with answers and, wherever needed, step-by-step working.</li>
          <li><strong>Timed mock tests</strong> that follow the real paper pattern, with a live countdown, instant results and answer review.</li>
          <li><strong>Previous year solved papers</strong> for exams such as SSC, Railway, Assam Police, Guwahati High Court, DHS and DME.</li>
          <li><strong>E-books and PDF notes</strong> for revision, covering Assam History, Indian Polity, Geography, Economy, Art and Culture, and more.</li>
          <li><strong>A free Android app</strong> so practice material can be used offline on the go.</li>
        </ul>

        <h2>How Our Content Is Prepared</h2>
        <p>Each subject is first divided into sections and topics that follow the official syllabus of the relevant examination. Questions are then added topic by topic and checked for factual accuracy, spelling and clarity. Explanations are written in plain language so that a candidate who answered a question incorrectly can understand the concept instead of simply memorising the answer. Facts are cross-checked against official notifications, standard reference books and publicly available government sources before publishing.</p>

        <h2>Editorial Standards</h2>
        <p>All material is prepared and reviewed by the axomexam editorial team, which works only on study content for this platform. We do not accept payment for including any exam, coaching institute or product, and sponsored material is never published as study content. Pages are reviewed periodically and updated whenever a syllabus, exam pattern or fact changes.</p>

        <h2>Accuracy and Corrections</h2>
        <p>We try to keep every fact correct, but examination patterns, syllabus details and official notifications can change. axomexam.in is an independent study aid and not a government portal — always confirm dates, eligibility and exam patterns from the official notification. If you find an error or a broken link, write to us with the page link and the correct information, and we will verify it and make the correction. Corrections and contributions are never used for any commercial purpose.</p>

        <h2>Who This Site Is For</h2>
        <p>The material is designed for aspirants of ADRE Grade III and IV, Assam Police Sub-Inspector and Constable, APSC, Panchayat and Rural Development, Forest Department, DHS and DME, and for central exams such as SSC CGL, CHSL and GD, and RRB NTPC and Group D. Whether you are starting from the basics or doing a final revision, the topic-wise structure lets you study at your own pace.</p>

        <h2>Contact Us</h2>
        <p>Questions, corrections and suggestions are always welcome. Email <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> or use our <a href="/contact/">contact page</a>. We usually reply within two to three working days.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `):t==="privacy"||t==="privacy-policy"?(n=a?"গোপনীয়তা নীতি":"Privacy Policy",s=a?"axomexam.in এ আপোনাৰ তথ্য কেনেকৈ সংগ্ৰহ, ব্যৱহাৰ আৰু সুৰক্ষিত কৰা হয়, কুকিজ, Google AdSense বিজ্ঞাপন আৰু আপোনাৰ অধিকাৰসমূহ।":"How axomexam.in collects, uses and protects information, how cookies and Google AdSense advertising work, and the choices and rights you have.",i=a?`
        <p>এই গোপনীয়তা নীতিয়ে ব্যাখ্যা কৰে যে আপুনি <strong>axomexam.in</strong> পৰিদৰ্শন বা ব্যৱহাৰ কৰোঁতে — আমাৰ ৱেবছাইট, অধ্যয়ন সামগ্ৰী, মক টেষ্ট, ই-বুক, ডাউনল'ডযোগ্য PDF টোকা আৰু আমাৰ Android এপ ব্যৱহাৰ কৰোঁতে — আমি কেনেকৈ তথ্য সংগ্ৰহ, ব্যৱহাৰ, সংৰক্ষণ আৰু ভাগ-বাটোৱাৰা কৰোঁ। ই আপোনাৰ ওচৰত থকা বিকল্পসমূহো ব্যাখ্যা কৰে।</p>
        <p>axomexam.in ব্যৱহাৰ কৰিলে আপুনি এই গোপনীয়তা নীতিত সন্মতি জনোৱা বুলি ধৰা হয়। কোনো অংশত সন্মত নহ'লে অনুগ্ৰহ কৰি ৱেবছাইট ব্যৱহাৰ নকৰিব।</p>

        <h3>১. আমি সংগ্ৰহ কৰা তথ্য</h3>
        <p><strong>১.১ আপুনি আমাক দিয়া তথ্য।</strong> প্ৰায় সকলো অধ্যয়ন সামগ্ৰী একাউণ্ট নাখুলাকৈ পঢ়িব, অনুশীলন কৰিব আৰু ডাউনল'ড কৰিব পাৰি। সমল পাবলৈ আমি নাম, ঠিকনা, জন্ম তাৰিখ বা পেমেন্ট তথ্য নিবিচাৰোঁ। আপুনি স্বইচ্ছাৰে দিয়া তথ্যহে সংগ্ৰহ কৰা হয় — যোগাযোগ ফৰ্ম বা ইমেইলত নাম, ইমেইল আৰু বাৰ্তা; প্ৰশ্ন আগবঢ়োৱা ফৰ্মত দিয়া নাম, ইমেইল আৰু প্ৰশ্ন; আৰু কপিৰাইট বা টেকডাউন অনুৰোধৰ সপক্ষে দিয়া তথ্য।</p>
        <p><strong>১.২ স্বয়ংক্ৰিয়ভাৱে সংগ্ৰহ কৰা তথ্য।</strong> বেছিভাগ ৱেবছাইটৰ দৰেই আমি আৰু আমাৰ তৃতীয় পক্ষৰ সেৱা প্ৰদানকাৰীয়ে কিছু কাৰিকৰী তথ্য স্বয়ংক্ৰিয়ভাৱে লিপিবদ্ধ কৰোঁ — IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ আৰু সংস্কৰণ, ডিভাইচ আৰু অপাৰেটিং চিষ্টেম, ভাষা, পৰিদৰ্শিত পৃষ্ঠা, পৰিদৰ্শনৰ তাৰিখ আৰু সময়, ব্যয় কৰা সময় আৰু প্ৰেৰণকাৰী লিংক। এই তথ্য সামগ্ৰিকভাৱে সুৰক্ষা, ত্ৰুটি-সমাধান, কাৰ্যক্ষমতা আৰু ব্যৱহাৰ বিশ্লেষণৰ বাবে ব্যৱহাৰ কৰা হয় আৰু ই আপোনাক পোনপটীয়াকৈ চিনাক্ত নকৰে।</p>
        <p><strong>১.৩ আপোনাৰ ডিভাইচত সংৰক্ষিত পছন্দ।</strong> আপুনি বাছনি কৰা ভাষা (ইংৰাজী বা অসমীয়া) আৰু লাইট বা ডাৰ্ক থীম মনত ৰাখিবলৈ আমি ব্ৰাউজাৰৰ লোকেল ষ্ট'ৰেজ ব্যৱহাৰ কৰোঁ। এই সেটিংসমূহ আপোনাৰ ডিভাইচতে থাকে আৰু আপোনাক চিনাক্ত কৰিবলৈ ব্যৱহাৰ নহয়।</p>

        <h3>২. কুকিজ আৰু একেধৰণৰ প্ৰযুক্তি</h3>
        <p>কুকিজ হৈছে ৱেবছাইটে আপোনাৰ ডিভাইচত ৰখা সৰু টেক্সট ফাইল। আমি আৰু আমাৰ তৃতীয় পক্ষৰ অংশীদাৰসকলে তলত দিয়া উদ্দেশ্যত কুকি, ৱেব বিকন, পিক্সেল আৰু একেধৰণৰ প্ৰযুক্তি ব্যৱহাৰ কৰোঁ।</p>
        <ul>
          <li><strong>অত্যাৱশ্যকীয় / পছন্দ কুকি:</strong> ছাইট কাৰ্যক্ষম ৰাখিবলৈ আৰু আপোনাৰ থীম আৰু ভাষাৰ বাছনি মনত ৰাখিবলৈ।</li>
          <li><strong>এনালিটিক্স কুকি:</strong> দৰ্শকে ছাইট কেনেকৈ ব্যৱহাৰ কৰে বুজি সমল আৰু গতি উন্নত কৰিবলৈ।</li>
          <li><strong>বিজ্ঞাপন কুকি:</strong> Google আৰু অন্য বিজ্ঞাপন অংশীদাৰসকলে বিজ্ঞাপন দেখুৱাব আৰু জোখ ল'বলৈ, লগতে ব্যক্তিগতকৃত বিজ্ঞাপনৰ বাবেও।</li>
        </ul>
        <p>ব্ৰাউজাৰৰ সেটিঙৰ জৰিয়তে আপুনি কুকি নিয়ন্ত্ৰণ বা মচিব পাৰে। কুকি অক্ষম কৰিলে ৱেবছাইটৰ কিছুমান অংশ (যেনে থীম আৰু ভাষাৰ স্মৃতি) ইচ্ছামতে কাম নকৰিব পাৰে।</p>

        <h3>৩. Google AdSense আৰু তৃতীয় পক্ষৰ বিজ্ঞাপন</h3>
        <p>অধ্যয়ন সামগ্ৰী বিনামূলীয়া ৰাখিবলৈ axomexam.in বিজ্ঞাপনেৰে চলি থাকে। আমি <strong>Google AdSense</strong> ব্যৱহাৰ কৰোঁ আৰু অন্য তৃতীয় পক্ষৰ বিজ্ঞাপন নেটৱৰ্কৰ সৈতেও কাম কৰিব পাৰোঁ।</p>
        <ul>
          <li>তৃতীয় পক্ষৰ বিক্ৰেতা, <strong>Google সহ</strong>, এই ৱেবছাইট আৰু/বা ইণ্টাৰনেটৰ অন্য ৱেবছাইটলৈ আপোনাৰ আগৰ ভ্ৰমণৰ ভিত্তিত বিজ্ঞাপন দেখুৱাবলৈ কুকি ব্যৱহাৰ কৰে।</li>
          <li>Google এ বিজ্ঞাপন কুকি (যেনে <strong>DoubleClick DART কুকি</strong>) ব্যৱহাৰ কৰি আপোনালৈ প্ৰাসংগিক বিজ্ঞাপন দেখুৱাব পাৰে।</li>
          <li>আপোনাৰ অঞ্চল আৰু সন্মতিৰ ওপৰত নিৰ্ভৰ কৰি Google এ <strong>ব্যক্তিগতকৃত</strong> বা <strong>অ-ব্যক্তিগতকৃত</strong> বিজ্ঞাপন দেখুৱাব পাৰে। অ-ব্যক্তিগতকৃত বিজ্ঞাপন পৃষ্ঠাৰ সমলৰ ওপৰত আধাৰিত, আপোনাৰ আগৰ আচৰণৰ ওপৰত নহয়।</li>
          <li>তৃতীয় পক্ষৰ বিজ্ঞাপন নেটৱৰ্কে তেওঁলোকৰ নিজা কুকি বা একেধৰণৰ প্ৰযুক্তিৰ জৰিয়তে তথ্য সংগ্ৰহ কৰিব পাৰে, আৰু সেই তথ্যৰ ব্যৱহাৰ তেওঁলোকৰ নিজা গোপনীয়তা নীতিয়ে নিয়ন্ত্ৰণ কৰে।</li>
        </ul>
        <p><strong>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকাৰ উপায়:</strong></p>
        <ul>
          <li>Google এ কৰা ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থাকিবলৈ <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">Google Ads Settings</a> লৈ যাওক।</li>
          <li>কিছুমান তৃতীয় পক্ষৰ বিক্ৰেতাৰ কুকি ব্যৱহাৰৰ পৰা আঁতৰি থাকিবলৈ <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener nofollow">www.aboutads.info</a> লৈ যাওক।</li>
          <li>ইউৰোপীয় অৰ্থনৈতিক অঞ্চল, যুক্তৰাজ্য বা ছুইজাৰলেণ্ডত থাকিলে <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener nofollow">www.youronlinechoices.eu</a> লৈ গৈ বিজ্ঞাপনৰ পছন্দ নিয়ন্ত্ৰণ কৰক।</li>
          <li>Google এ তেওঁৰ সেৱা ব্যৱহাৰ কৰা ছাইটৰ পৰা তথ্য কেনেকৈ ব্যৱহাৰ কৰে জানিবলৈ <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">policies.google.com/technologies/ads</a> চাওক।</li>
        </ul>
        <p>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকাৰ অৰ্থ এইটো নহয় যে আপুনি বিজ্ঞাপন নেদেখিব; ইয়াৰ অৰ্থ হ'ল আপুনি দেখা বিজ্ঞাপনবোৰ আপোনাৰ আগ্ৰহৰ সৈতে কম প্ৰাসংগিক হ'ব পাৰে।</p>

        <h3>৪. আমি তথ্য কেনেকৈ ব্যৱহাৰ কৰোঁ</h3>
        <ul>
          <li>ৱেবছাইট, সমল আৰু এপ পৰিচালনা, ৰক্ষণাবেক্ষণ আৰু উন্নত কৰিবলৈ।</li>
          <li>আপোনাৰ প্ৰশ্ন, সংশোধন, অৱদান আৰু টেকডাউন অনুৰোধৰ উত্তৰ দিবলৈ।</li>
          <li>মঞ্চখন বিনামূলীয়া ৰখা বিজ্ঞাপন দেখুৱাব আৰু জোখ ল'বলৈ।</li>
          <li>সুৰক্ষা ঘটনা, অপব্যৱহাৰ, স্পাম আৰু কাৰিকৰী ত্ৰুটি নিৰীক্ষণ কৰিবলৈ।</li>
          <li>কোন বিষয় আৰু সুবিধা আটাইতকৈ উপযোগী বুজি নতুন সমলৰ পৰিকল্পনা কৰিবলৈ।</li>
          <li>প্ৰযোজ্য আইনী দায়িত্ব পালন কৰিবলৈ।</li>
        </ul>

        <h3>৫. তথ্য ভাগ-বাটোৱাৰা আৰু প্ৰকাশ</h3>
        <p>আমি আপোনাৰ ব্যক্তিগত তথ্য বিক্ৰী নকৰোঁ। কেৱল তলত দিয়া সীমিত অৱস্থাতহে তথ্য ভাগ কৰিব পাৰোঁ:</p>
        <ul>
          <li><strong>সেৱা প্ৰদানকাৰী আৰু বিজ্ঞাপন অংশীদাৰ:</strong> যেনে Google AdSense, হোষ্টিং, এনালিটিক্স আৰু ইমেইল প্ৰদানকাৰী, যিসকলে আমাৰ হৈ তথ্য প্ৰক্ৰিয়া কৰে।</li>
          <li><strong>আইনী প্ৰয়োজন:</strong> আইন, নিয়ম বা বলবৎ চৰকাৰী অনুৰোধ মানিবলৈ তথ্য প্ৰকাশ কৰিবলগীয়া হ'লে।</li>
          <li><strong>অধিকাৰ সুৰক্ষা:</strong> আমাৰ অধিকাৰ, ব্যৱহাৰকাৰী বা ৰাইজৰ সুৰক্ষা, বা জালিয়াতি আৰু সুৰক্ষা বিষয়ৰ তদন্তৰ বাবে প্ৰয়োজন হ'লে।</li>
          <li><strong>ব্যৱসায় হস্তান্তৰ:</strong> ৱেবছাইট বা ইয়াৰ সম্পদ হস্তান্তৰ বা একত্ৰীকৰণ হ'লে তথ্য সেই লেনদেনৰ অংশ হিচাপে হস্তান্তৰ হ'ব পাৰে।</li>
        </ul>

        <h3>৬. তথ্য সংৰক্ষণ</h3>
        <p>যোগাযোগ আৰু অৱদানৰ বাৰ্তা কেৱল উত্তৰ দি সমাধান কৰিবলৈ যিমান প্ৰয়োজন তিমান সময় ৰাখোঁ, তাৰ পিছত ৰেকৰ্ড ৰাখিবলৈ এক যুক্তিসংগত সময়লৈ। স্বয়ংক্ৰিয়ভাৱে সংগ্ৰহ কৰা কাৰিকৰী আৰু এনালিটিক্স তথ্য এই নীতিত উল্লেখ কৰা উদ্দেশ্যৰ বাবে যিমান প্ৰয়োজন তিমান সময় সামগ্ৰিক ৰূপত সংৰক্ষণ কৰা হয়। বিজ্ঞাপন অংশীদাৰসকলে তেওঁলোকৰ নিজা নীতি অনুসৰি তথ্য সংৰক্ষণ কৰে।</p>

        <h3>৭. তথ্য সুৰক্ষা</h3>
        <p>তথ্য সুৰক্ষিত ৰাখিবলৈ আমি যুক্তিসংগত কাৰিকৰী আৰু সাংগঠনিক ব্যৱস্থা লওঁ, য'ত ৱেবছাইট HTTPS ৰ জৰিয়তে পৰিৱেশন কৰাও অন্তৰ্ভুক্ত। তথাপিও ইণ্টাৰনেটত প্ৰেৰণ বা ইলেক্ট্ৰনিক সংৰক্ষণৰ কোনো পদ্ধতিয়েই সম্পূৰ্ণ নিৰাপদ নহয়, আৰু আমি সম্পূৰ্ণ নিৰাপত্তাৰ নিশ্চয়তা দিব নোৱাৰোঁ।</p>

        <h3>৮. আপোনাৰ অধিকাৰ আৰু বিকল্প</h3>
        <p>আপোনাৰ অৱস্থানৰ ওপৰত নিৰ্ভৰ কৰি আপোনাৰ তলত দিয়া অধিকাৰ থাকিব পাৰে:</p>
        <ul>
          <li>আমাৰ ওচৰত থকা আপোনাৰ ব্যক্তিগত তথ্য চাবলৈ অনুৰোধ কৰা।</li>
          <li>আপোনাৰ ব্যক্তিগত তথ্য শুধৰোৱা বা মচিবলৈ অনুৰোধ কৰা।</li>
          <li>কিছুমান প্ৰক্ৰিয়াৰ বিৰোধিতা বা সীমাবদ্ধতা, আৰু সন্মতিভিত্তিক প্ৰক্ৰিয়াৰ সন্মতি প্ৰত্যাহাৰ।</li>
          <li>ব্যক্তিগতকৃত বিজ্ঞাপনৰ পৰা আঁতৰি থকা (ধাৰা ৩ চাওক)।</li>
          <li>আপোনাৰ স্থানীয় তথ্য সুৰক্ষা কৰ্তৃপক্ষৰ ওচৰত অভিযোগ কৰা।</li>
        </ul>
        <p>এই অধিকাৰসমূহ ব্যৱহাৰ কৰিবলৈ <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ ইমেইল কৰক। আমি যুক্তিসংগত সময়ৰ ভিতৰত উত্তৰ দিম আৰু আপোনাৰ অনুৰোধ যাচাই কৰিবলগীয়া হ'ব পাৰে।</p>

        <h3>৯. শিশুৰ গোপনীয়তা</h3>
        <p>axomexam.in প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰাৰ্থীসকলৰ বাবে। আমি ১৩ বছৰৰ তলৰ (বা আপোনাৰ দেশত প্ৰযোজ্য ন্যূনতম বয়সৰ তলৰ) শিশুৰ পৰা সজ্ঞানে ব্যক্তিগত তথ্য সংগ্ৰহ নকৰোঁ। অভিভাৱকে এনে তথ্য দিয়া হৈছে বুলি ভাবিলে আমাক জনাওক, আমি মচি দিম।</p>

        <h3>১০. তৃতীয় পক্ষৰ লিংক</h3>
        <p>কিছুমান পৃষ্ঠাই চৰকাৰী নিয়োগ প'ৰ্টেল, এপ ষ্ট'ৰ বা প্ৰসংগ উৎসৰ দৰে বাহ্যিক ৱেবছাইটলৈ লিংক দিয়ে। সেই ৱেবছাইটসমূহৰ গোপনীয়তা পদ্ধতি বা সমলৰ বাবে আমি দায়বদ্ধ নহয়, আৰু ব্যৱহাৰ কৰাৰ আগতে তেওঁলোকৰ গোপনীয়তা নীতি পঢ়িবলৈ পৰামৰ্শ দিওঁ।</p>

        <h3>১১. আন্তৰ্জাতিক তথ্য স্থানান্তৰ</h3>
        <p>Google সহ আমাৰ সেৱা প্ৰদানকাৰীসকলে আপোনাৰ দেশৰ বাহিৰে অন্য দেশত তথ্য প্ৰক্ৰিয়া আৰু সংৰক্ষণ কৰিব পাৰে। প্ৰয়োজন হ'লে এনে স্থানান্তৰ তেওঁলোকৰ নিজা গোপনীয়তা নীতিত বৰ্ণনা কৰা উপযুক্ত সুৰক্ষাৰে কৰা হয়।</p>

        <h3>১২. এই নীতিত পৰিৱৰ্তন</h3>
        <p>আমাৰ পদ্ধতি, প্ৰযুক্তি বা আইনী প্ৰয়োজনৰ পৰিৱৰ্তন প্ৰতিফলিত কৰিবলৈ আমি সময়ে সময়ে এই নীতি হালনাগাদ কৰিব পাৰোঁ। শেহতীয়া সংস্কৰণ সদায় এই পৃষ্ঠাত উপলব্ধ থাকিব আৰু তলৰ "শেষ হালনাগাদ" তাৰিখ সংশোধন কৰা হ'ব। পৰিৱৰ্তনৰ পিছত ৱেবছাইট ব্যৱহাৰ কৰি থাকিলে আপুনি হালনাগাদ নীতিত সন্মতি জনোৱা বুলি ধৰা হ'ব।</p>

        <h3>১৩. আমাৰ সৈতে যোগাযোগ</h3>
        <p>এই গোপনীয়তা নীতি বা আপোনাৰ তথ্যৰ বিষয়ে কোনো প্ৰশ্ন, চিন্তা বা অনুৰোধ থাকিলে যোগাযোগ কৰক:</p>
        <ul>
          <li><strong>ইমেইল:</strong> <a href="mailto:contact@axomexam.in">contact@axomexam.in</a></li>
          <li><strong>যোগাযোগ পৃষ্ঠা:</strong> <a href="/contact/">axomexam.in/contact</a></li>
        </ul>
        <p style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>This Privacy Policy explains how <strong>axomexam.in</strong> ("we", "us", "our") collects, uses, stores and shares information when you visit or use our website, study material, mock tests, e-books, downloadable PDF notes and our Android app. It also describes the choices you have and how you can control the information connected with your use of the platform.</p>
        <p>By accessing or using axomexam.in you agree to this Privacy Policy. If you do not agree with any part of it, please do not use the website.</p>

        <h3>1. Information We Collect</h3>
        <p><strong>1.1 Information you give us.</strong> You can read, practise and download almost all study material without creating an account. We do not ask for your name, address, date of birth or payment details to access content. Personal information is collected only when you choose to provide it: your name, email address, subject and message through the contact form or email; any name, email and questions you submit through the Submit Q&amp;A form; and the details you provide to support a copyright or takedown request.</p>
        <p><strong>1.2 Information collected automatically.</strong> Like most websites, when you visit axomexam.in our servers and third-party service providers automatically record certain technical information, including IP address, browser type and version, device type and operating system, language, the pages you visit, the date and time of your visit, the time spent and the referring page or link. This information is used in aggregate for security, troubleshooting, performance and usage analysis and does not directly identify you.</p>
        <p><strong>1.3 Preferences stored on your device.</strong> We use your browser's local storage to remember choices such as your selected language (English or Assamese) and light or dark theme. These settings stay on your device and are not used to identify you.</p>

        <h3>2. Cookies and Similar Technologies</h3>
        <p>Cookies are small text files placed on your device by a website. We and our third-party partners use cookies, web beacons, pixels and similar technologies for the purposes described below.</p>
        <ul>
          <li><strong>Strictly necessary / preference cookies:</strong> to keep the site working and remember your theme and language choices.</li>
          <li><strong>Analytics cookies:</strong> to understand how visitors use the site so that we can improve content and speed.</li>
          <li><strong>Advertising cookies:</strong> set by Google and other advertising partners to display and measure advertisements, including personalised advertising.</li>
        </ul>
        <p>You can control or delete cookies through your browser settings. If you disable cookies, some parts of the website (for example theme and language memory) may not work as intended.</p>

        <h3>3. Google AdSense and Third-Party Advertising</h3>
        <p>axomexam.in is supported by advertising so that the study material can remain free. We use <strong>Google AdSense</strong> and may also work with other third-party advertising networks and vendors.</p>
        <ul>
          <li>Third-party vendors, <strong>including Google</strong>, use cookies to serve ads based on your prior visits to this website and/or other websites on the internet.</li>
          <li>Google's use of advertising cookies (including the <strong>DoubleClick DART cookie</strong>) enables Google and its partners to serve ads to you based on your visit to our site and/or other sites on the internet.</li>
          <li>Depending on your region and consent choices, Google may serve either <strong>personalised</strong> or <strong>non-personalised</strong> ads. Non-personalised ads are based on the content of the page rather than your past behaviour.</li>
          <li>Third-party ad networks may collect information directly through their own cookies, web beacons or similar technologies, and their handling of that information is governed by their own privacy policies, not ours.</li>
        </ul>
        <p><strong>How to opt out of personalised advertising:</strong></p>
        <ul>
          <li>Visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">Google Ads Settings</a> to opt out of personalised advertising by Google.</li>
          <li>Visit <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener nofollow">www.aboutads.info</a> to opt out of some third-party vendors' use of cookies for personalised advertising.</li>
          <li>If you are in the European Economic Area, the United Kingdom or Switzerland, visit <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener nofollow">www.youronlinechoices.eu</a> to manage your advertising preferences.</li>
          <li>Learn more about how Google uses information from sites that use its services at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">policies.google.com/technologies/ads</a>.</li>
        </ul>
        <p>Opting out of personalised advertising does not mean you will stop seeing ads; it means the ads you see may be less relevant to your interests.</p>

        <h3>4. How We Use Information</h3>
        <ul>
          <li>To operate, maintain and improve the website, content and app.</li>
          <li>To respond to your queries, corrections, contributions and takedown requests.</li>
          <li>To display and measure advertising that keeps the platform free.</li>
          <li>To monitor for security incidents, abuse, spam and technical errors.</li>
          <li>To understand which subjects and features are most useful and to plan new content.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>

        <h3>5. Sharing and Disclosure of Information</h3>
        <p>We do not sell your personal information. We may share information only in the following limited situations:</p>
        <ul>
          <li><strong>Service providers and advertising partners:</strong> such as Google AdSense, hosting, analytics and email providers, who process information on our behalf or as independent controllers under their own policies.</li>
          <li><strong>Legal requirements:</strong> where we are required to disclose information to comply with a law, regulation, legal process or enforceable government request.</li>
          <li><strong>Protection of rights:</strong> where disclosure is necessary to protect our rights, the safety of users or the public, or to investigate fraud or security issues.</li>
          <li><strong>Business transfer:</strong> if the website or its assets are transferred or merged, information may be transferred as part of that transaction.</li>
        </ul>

        <h3>6. Data Retention</h3>
        <p>We keep contact and contribution messages only for as long as needed to respond to and resolve them, and then for a reasonable period for record-keeping. Automatically collected technical and analytics data is retained in aggregate form for as long as necessary for the purposes described in this policy. Advertising partners retain data according to their own retention policies.</p>

        <h3>7. Data Security</h3>
        <p>We take reasonable technical and organisational measures to protect information, including serving the website over HTTPS. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

        <h3>8. Your Rights and Choices</h3>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Request access to the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>Object to or restrict certain processing, and withdraw consent where processing is based on consent.</li>
          <li>Opt out of personalised advertising (see section 3).</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:contact@axomexam.in">contact@axomexam.in</a>. We will respond within a reasonable period and may need to verify your request.</p>

        <h3>9. Children's Privacy</h3>
        <p>axomexam.in is intended for candidates preparing for competitive examinations. We do not knowingly collect personal information from children under 13 (or the minimum age applicable in your country). If a parent or guardian believes that a child has provided personal information, please contact us and we will delete it.</p>

        <h3>10. Third-Party Links</h3>
        <p>Some pages link to external websites such as official recruitment portals, app stores or reference sources. We are not responsible for the privacy practices or content of those websites, and we encourage you to read their privacy policies before using them.</p>

        <h3>11. International Data Transfers</h3>
        <p>Our service providers, including Google, may process and store information in countries other than your own. Where required, such transfers are carried out using appropriate safeguards as described in the providers' own privacy policies.</p>

        <h3>12. Changes to This Privacy Policy</h3>
        <p>We may update this policy from time to time to reflect changes in our practices, technology or legal requirements. The latest version will always be available on this page, and the "Last updated" date below will be revised. Continued use of the website after changes means you accept the updated policy.</p>

        <h3>13. Contact Us</h3>
        <p>If you have any questions, concerns or requests about this Privacy Policy or your information, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:contact@axomexam.in">contact@axomexam.in</a></li>
          <li><strong>Contact page:</strong> <a href="/contact/">axomexam.in/contact</a></li>
        </ul>
        <p style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `):t==="terms"?(n=a?"নীতি আৰু চৰ্তসমূহ":"Terms & Conditions",s=a?"axomexam.in ৰ ৱেবছাইট, অধ্যয়ন টোকা, মক টেষ্ট আৰু ডাউনল'ডসমূহ ব্যৱহাৰ কৰাৰ নিয়ম আৰু চৰ্তসমূহ।":"The rules and conditions for using the axomexam.in website, study notes, mock tests and downloads.",i=a?`
        <p>এই ৱেবছাইটত প্ৰৱেশ কৰি ব্ৰাউজ কৰিলে আপুনি তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ মানি লোৱা বুলি ধৰা হয়। এই চৰ্তসমূহে আপুনি সামগ্ৰীৰ সৈতে কি কৰিব পাৰে, ছাইটে কি নিশ্চয়তা দিয়ে আৰু কি নিদিয়ে, আৰু বিজ্ঞাপন তথা বাহ্যিক লিংকৰ সৈতে সম্পৰ্ক কেনেকুৱা তাক ব্যাখ্যা কৰে।</p>

        <h3>১. সামগ্ৰীৰ ব্যৱহাৰ</h3>
        <ul>
          <li>অনুশীলন প্ৰশ্ন, টোকা আৰু মক টেষ্ট নিজৰ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে পঢ়িব আৰু ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া।</li>
          <li>ব্যক্তিগত অধ্যয়নৰ বাবে আপুনি পৃষ্ঠা ছপা বা সংৰক্ষণ কৰিব পাৰে।</li>
          <li>লিখিত অনুমতি অবিহনে সমল অন্য ৱেবছাইট বা এপত পুনৰ প্ৰকাশ কৰা বা বিক্ৰী কৰা নিষিদ্ধ।</li>
          <li>সমলৰ কোনো অংশ পুনৰ লিখি বা সম্পাদনা কৰি নিজৰ নামত প্ৰকাশ কৰা নিষিদ্ধ।</li>
        </ul>

        <h3>২. তথ্যৰ শুদ্ধতা আৰু দায়বদ্ধতা</h3>
        <ul>
          <li>উত্তৰ আৰু ব্যাখ্যা শুদ্ধ ৰাখিবলৈ প্ৰতিটো প্ৰচেষ্টা কৰা হয়, তথাপিও ত্ৰুটি থাকিব পাৰে।</li>
          <li>সামগ্ৰী সাধাৰণ প্ৰস্তুতিৰ বাবে দিয়া হয়, ই কোনো চৰকাৰী প্ৰশ্নকাকত নহয়।</li>
          <li>কোনো প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেটৰ ওপৰত নিৰ্ভৰ কৰক।</li>
          <li>সামগ্ৰীৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</li>
        </ul>

        <h3>৩. বিজ্ঞাপন আৰু বাহ্যিক লিংক</h3>
        <ul>
          <li>ছাইটখন বিজ্ঞাপনেৰে চলি থাকে, যিয়ে অধ্যয়ন সামগ্ৰী বিনামূলীয়া ৰাখে।</li>
          <li>বিজ্ঞাপন আৰু সম্পাদকীয় সিদ্ধান্ত সম্পূৰ্ণ পৃথক; কোনো বিজ্ঞাপনদাতাক সমলত স্থান দিয়া নহয়।</li>
          <li>অন্য ৱেবছাইটলৈ লিংক কেৱল সুবিধাৰ বাবে দিয়া হয়; তেওঁলোকৰ সমল বা নীতি axomexam ৰ নিয়ন্ত্ৰণত নাই।</li>
        </ul>

        <h3>৪. প্ৰায়ে সোধা প্ৰশ্ন</h3>
        <p><strong>axomexam ব্যৱহাৰ কৰিবলৈ মই পইচা দিব লাগিব নেকি?</strong> নালাগে। অনুশীলন প্ৰশ্ন, টোকা, মক টেষ্ট আৰু PDF বিনামূলীয়া। ছাইটখন বিজ্ঞাপনেৰে চলি থাকে, যিয়ে সামগ্ৰী বিনামূলীয়া ৰাখে।</p>
        <p><strong>মই মোৰ নিজা ছাইট বা এপত সমল পুনৰ ব্যৱহাৰ কৰিব পাৰিম নেকি?</strong> নিজৰ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে আপুনি পৃষ্ঠা পঢ়িব, ছপা কৰিব আৰু সংৰক্ষণ কৰিব পাৰে। সমল পুনৰ প্ৰকাশ বা বিক্ৰী কৰিবলৈ প্ৰথমে লিখিত অনুমতি লাগে।</p>
        <p><strong>একাউণ্ট লাগে নেকি?</strong> ছাইটৰ কোনো অংশৰ বাবেই একাউণ্ট নালাগে। ছাইন আপ বা লগইন কৰিবলৈ একো নাই।</p>
        <p><strong>ভুল পালে মই কি কৰিম?</strong> পৃষ্ঠাৰ লিংক আৰু সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াওক। সংশোধনসমূহ যাচাই কৰি নিশ্চিত হ'লে প্ৰয়োগ কৰা হয়।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>By accessing and browsing <strong>axomexam.in</strong>, you accept and agree to the following Terms and Conditions. These terms explain what you may do with the material and what the site does and does not promise.</p>

        <h3>1. Content Usage</h3>
        <ul>
          <li>Practice questions, notes and mock tests are free to read and use for your own exam preparation.</li>
          <li>You may print or save pages for personal study.</li>
          <li>Republishing the content on another website or app, or selling it, is not allowed without written permission.</li>
        </ul>

        <h3>2. Accuracy &amp; Liability</h3>
        <ul>
          <li>Every effort is made to keep answers and explanations correct, but errors can still occur.</li>
          <li>The material is provided for general preparation and is not an official question paper.</li>
          <li>For anything authoritative, always rely on the official notification or gazette.</li>
        </ul>

        <h3>3. Advertising and Links</h3>
        <ul>
          <li>The site is supported by advertising, which keeps the material free.</li>
          <li>Links to other websites are provided for convenience; their content is not controlled by axomexam.</li>
        </ul>

        <h3>4. Frequently Asked Questions</h3>
        <p><strong>Do I have to pay to use axomexam?</strong> No. The practice questions, notes, mock tests and PDFs are free. The site is supported by advertising, which is what keeps the material free.</p>
        <p><strong>Can I reuse the content on my own site or app?</strong> You may read, print and save pages for your own exam preparation. Republishing or selling the content needs written permission first.</p>
        <p><strong>Do I need an account?</strong> No account is needed for any part of the site. There is nothing to sign up for and no login.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `):t==="disclaimer"?(n=a?"দায়মুক্তি":"Disclaimer",s=a?"axomexam.in ৰ সীমা, চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা আৰু অধ্যয়ন সামগ্ৰী ব্যৱহাৰৰ চৰ্তসমূহ।":"The scope of axomexam.in, its non-affiliation with government bodies, and the terms on which its study material is used.",i=a?`
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো সমল আৰু প্ৰশ্ন-সংগ্ৰহ সৎ বিশ্বাসেৰে আৰু কেৱল সাধাৰণ শিক্ষা, একাডেমিক আৰু প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতিৰ উদ্দেশ্যত প্ৰকাশ কৰা হৈছে। তলৰ দায়মুক্তিয়ে ইয়াত প্ৰকাশিত সামগ্ৰীৰ সীমা স্পষ্ট কৰে।</p>

        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in এক স্বতন্ত্ৰ ব্যক্তিগত শিক্ষামূলক ৱেবছাইট। ই অসম চৰকাৰ, APSC, SLPRB, ৰাজ্যিক নিয়োগ পৰিষদ বা কোনো চৰকাৰী পৰীক্ষা সংস্থাৰ সৈতে সংযুক্ত, পৃষ্ঠপোষিত বা অনুমোদিত <strong>নহয়</strong>। পৰীক্ষাৰ্থীসকলে সদায় চৰকাৰী নিয়োগ গেজেটৰ সৈতে মিলাই পৰীক্ষা কৰিব লাগে।</p>

        <h3>২. শিক্ষামূলক ব্যৱহাৰ</h3>
        <ul>
          <li>অনুশীলন প্ৰশ্ন আৰু টোকা কেৱল সাধাৰণ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে প্ৰকাশ কৰা হয়।</li>
          <li>এইবোৰ চৰকাৰী প্ৰশ্নকাকত নহয় আৰু পৰীক্ষাত অহাৰ কোনো নিশ্চয়তা নাই।</li>
          <li>পৰীক্ষাৰ ধৰণ বা পাঠ্যক্ৰম সলনি হ'লে পুৰণি তথ্য ভুল হ'ব পাৰে।</li>
          <li>কোনো প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেট চাওক।</li>
        </ul>

        <h3>৩. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <ul>
          <li>প্ৰকাশৰ আগতে সমল মানক প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰা হয়।</li>
          <li>তথাপিও ত্ৰুটি থাকিব পাৰে; সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াব পাৰে।</li>
          <li>অধ্যয়ন সামগ্ৰী আৰু মক অনুশীলনৰ ব্যৱহাৰ আপোনাৰ নিজা বিবেচনাধীন।</li>
        </ul>

        <h3>৪. প্ৰায়ে সোধা প্ৰশ্ন</h3>
        <p><strong>axomexam এখন চৰকাৰী ৱেবছাইট নেকি?</strong> নহয়। axomexam এখন স্বতন্ত্ৰ অধ্যয়ন ছাইট। ই অসম চৰকাৰ, APSC, SLPRB বা কোনো নিয়োগ পৰিষদৰ সৈতে সংযুক্ত বা অনুমোদিত নহয়।</p>
        <p><strong>অনুশীলন প্ৰশ্নবোৰ চৰকাৰী প্ৰশ্নকাকত নেকি?</strong> নহয়। এইবোৰ অনুশীলনৰ বাবে লিখা আৰু চৰকাৰী প্ৰশ্নকাকত নহয়। প্ৰামাণিক তথ্যৰ বাবে সদায় চৰকাৰী জাননী বা গেজেট চাওক।</p>
        <p><strong>ভুল পালে মই কি কৰিম?</strong> পৃষ্ঠাৰ লিংক আৰু সংশোধন <a href="/submit/">প্ৰশ্ন আগবঢ়াওক</a> পৃষ্ঠাৰ জৰিয়তে পঠিয়াওক। জনোৱা সংশোধনসমূহ মানক প্ৰসংগৰ সৈতে মিলাই যাচাই কৰি নিশ্চিত হ'লে প্ৰয়োগ কৰা হয়।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational and competitive examination preparation purposes.</p>

        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is <strong>NOT</strong> affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>

        <h3>2. Educational Use</h3>
        <ul>
          <li>Practice questions and notes are published for general exam preparation only.</li>
          <li>They are not official question papers and carry no guarantee of appearing in an exam.</li>
          <li>For anything authoritative, always check the official notification or gazette.</li>
          <li>Use of the study material and mock practice is at your own discretion.</li>
        </ul>

        <h3>3. Frequently Asked Questions</h3>
        <p><strong>Is axomexam an official government website?</strong> No. axomexam is an independent study site. It is not run by, connected to, or endorsed by the Government of Assam, APSC, SLPRB or any recruitment board.</p>
        <p><strong>Are the practice questions official question papers?</strong> No. They are written for practice and are not official papers. For anything authoritative, always check the official notification or gazette.</p>
        <p><strong>What should I do if I find a mistake?</strong> Send the page link and the correction through the <a href="/submit/">Submit Q&amp;A</a> page. Reported corrections are checked against standard reference material and applied once confirmed.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `):t==="editorial-policy"?(n=a?"সম্পাদকীয় নীতি":"Editorial Policy",s=a?"অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে axomexam.in ৰ দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেনেদৰে পৰিকল্পনা, লিখন, তথ্য-যাচাই, পৰ্যালোচনা আৰু সংশোধন কৰা হয়।":"How axomexam.in plans, writes, fact-checks, reviews and corrects its bilingual study material for Assam competitive examinations.",i=a?`
        <p><strong>axomexam.in</strong> এ অসম ৰাজ্যিক নিযুক্তি পৰীক্ষা আৰু অসমত জনপ্ৰিয় কেন্দ্ৰীয় পৰীক্ষাসমূহৰ বাবে বিনামূলীয়া দ্বিভাষিক অধ্যয়ন সামগ্ৰী প্ৰকাশ কৰে। এই পৃষ্ঠাই ব্যাখ্যা কৰে যে সামগ্ৰী কেৱে প্ৰস্তুত কৰে, কেনেদৰে পৰীক্ষা কৰা হয়, কি উৎস ব্যৱহাৰ কৰা হয়, ভুল কেনেদৰে সংশোধন কৰা হয়, আৰু বিজ্ঞাপনক সম্পাদকীয় সিদ্ধান্তৰ পৰা কেনেদৰে পৃথক ৰখা হয়। এই নীতি এই ৱেবছাইটত প্ৰকাশিত প্ৰতিটো প্ৰশ্ন-সংগ্ৰহ, মক টেষ্ট, বিগত বৰ্ষৰ প্ৰশ্নকাকত, ই-বুক, PDF নোট আৰু প্ৰবন্ধৰ ক্ষেত্ৰত প্ৰযোজ্য।</p>

        <h2>সামগ্ৰী কেৱে প্ৰস্তুত কৰে</h2>
        <p>সামগ্ৰী <a href="/editorial-team/">axomexam সম্পাদকীয় দল</a>এ পৰিকল্পনা আৰু পৰ্যালোচনা কৰে, যিয়ে কেৱল এই মঞ্চৰ অধ্যয়ন সামগ্ৰীত কাম কৰে। প্ৰকাশৰ আগতে প্ৰতিটো পৃষ্ঠা এজন বিষয়-পৰ্যালোচকে আৰু অসমীয়া পাঠৰ বাবে এজন ভাষা-পৰ্যালোচকে পৰীক্ষা কৰে। কোনো কোচিং প্ৰতিষ্ঠান, প্ৰকাশক বা পৰীক্ষা প'ৰ্টেলৰ সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বিনিময়ত আমি ধন লোৱা নাই, আৰু কোনো পৃষ্ঠপোষকতা কৰা পৃষ্ঠাক অধ্যয়ন সামগ্ৰী হিচাপে উপস্থাপন কৰা নহয়।</p>

        <h2>এখন পৃষ্ঠা কেনেদৰে সৃষ্টি কৰা হয়</h2>
        <ol>
          <li><strong>পাঠ্যক্ৰমৰ মিল।</strong> প্ৰতিটো শিতান প্ৰথমে সংশ্লিষ্ট পৰীক্ষাৰ চৰকাৰী পাঠ্যক্ৰম বা জাননীৰ সৈতে মিলাই লোৱা হয়, যাতে পৃষ্ঠাত থকা বিষয়বোৰ প্ৰকৃততে প্ৰশ্নকাকতত অহা বিষয় হয়।</li>
          <li><strong>খচৰা প্ৰস্তুত।</strong> প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা সহজ ভাষাত লিখা হয়। সংখ্যাগত বা যুক্তিৰ প্ৰশ্নত কেৱল চূড়ান্ত উত্তৰ নহয়, কামৰ ধাপবোৰো দেখুওৱা হয়। ইংৰাজী আৰু অসমীয়া সংস্কৰণ একেলগে প্ৰস্তুত কৰা হয় যাতে দুয়োটা সংস্কৰণে একে সামগ্ৰী সামৰি লয়।</li>
          <li><strong>তথ্য-যাচাই।</strong> তথ্য, তাৰিখ, নাম আৰু সংখ্যাগত উত্তৰ চৰকাৰী জাননী আৰু চৰকাৰী প'ৰ্টেল, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত, আৰু মানক বিদ্যালয় বা প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰা হয়। যি তথ্য যাচাই কৰিব নোৱাৰি, তাক সত্য হিচাপে প্ৰকাশ কৰা নহয়।</li>
          <li><strong>ভাষা পৰ্যালোচনা।</strong> অসমীয়া সংস্কৰণ শুদ্ধ পাৰিভাষিক শব্দ, বানান আৰু স্বাভাৱিক প্ৰয়োগৰ বাবে পঢ়া হয়, কেৱল শব্দে শব্দে অনুবাদ নহয়। কাৰিকৰী শব্দবোৰ অসমীয়া প্ৰশ্নকাকতত ব্যৱহৃত ৰূপতেই ৰখা হয়।</li>
          <li><strong>প্ৰকাশ আৰু পুনৰ পৰ্যালোচনা।</strong> প্ৰতিটো পৃষ্ঠাত প্ৰকাশৰ তাৰিখ আৰু শেষ হালনাগাদৰ তাৰিখ থাকে। পাঠ্যক্ৰম, পৰীক্ষাৰ আৰ্হি বা চৰকাৰী জাননী সলনি হ'লে সামগ্ৰী পুনৰ পৰ্যালোচনা কৰা হয়।</li>
        </ol>

        <h2>আমি ব্যৱহাৰ কৰা উৎস</h2>
        <p>আমি প্ৰাথমিক আৰু ৰাজহুৱাভাৱে উপলব্ধ সামগ্ৰীৰ ওপৰত নিৰ্ভৰ কৰোঁ: চৰকাৰী নিযুক্তি জাননী আৰু সংশোধনী, চৰকাৰী পৰীক্ষা প'ৰ্টেল, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত, আৰু মানক বিদ্যালয়-স্তৰৰ পাঠ্যপুথি। আমি অনুসৰণ কৰা চৰকাৰী প'ৰ্টেলৰ তালিকা <a href="/sources/">চৰকাৰী উৎস পৃষ্ঠা</a>ত ৰখা হৈছে।</p>
        <p>আমি বাণিজ্যিক পুথিৰ অধ্যায়, প্ৰশ্ন-সংগ্ৰহ বা ব্যাখ্যামূলক পাঠ পুনৰুত্পাদন নকৰোঁ। যি বিষয় সাধাৰণতে এটা নিৰ্দিষ্ট ধৰণে ব্যাখ্যা কৰা হয়, আমি নিজৰ ব্যাখ্যা লিখি পাঠ্যক্ৰম আৰু ৰাজহুৱা সামগ্ৰীৰ সৈতে মিলাই পৰীক্ষা কৰোঁ। তৃতীয় পক্ষৰ প্ৰকাশনৰ উল্লেখ আমাৰ নিজৰ যাচাইৰ বিকল্প নহয়।</p>

        <h2>AI সহায়ক সঁজুলিৰ ব্যৱহাৰ</h2>
        <p>অন্যান্য আধুনিক প্ৰকাশকৰ দৰেই আমি পাঠ খচৰা, সজ্জিত কৰা আৰু অনুবাদ কৰাত সহায় কৰিবলৈ ছফ্টৱেৰ, যাৰ ভিতৰত AI ভাষা সঁজুলিও আছে, ব্যৱহাৰ কৰোঁ। এই সঁজুলিবোৰ কেৱল খচৰা সহায়ক হিচাপেহে ব্যৱহাৰ কৰা হয়। প্ৰতিটো প্ৰকাশিত পৃষ্ঠা লাইভ হোৱাৰ আগতে এজন ব্যক্তিয়ে পৰ্যালোচনা কৰে, তথ্য ওপৰত বৰ্ণনা কৰা উৎসৰ সৈতে যাচাই কৰা হয়, আৰু প্ৰকাশিত সমলৰ দায়িত্ব সম্পাদকীয় দলৰ। আমি পৰ্যালোচনা নকৰা যন্ত্ৰ-আউটপুট স্বয়ংক্ৰিয়ভাৱে প্ৰকাশ নকৰোঁ, আৰু পৰীক্ষাৰ জাননী, তাৰিখ বা ফলাফল সৃষ্টি কৰিবলৈ AI সঁজুলি ব্যৱহাৰ নকৰোঁ।</p>

        <h2>শুদ্ধতা, সংশোধন আৰু হালনাগাদ</h2>
        <p>পৰীক্ষাৰ বিৱৰণ সঘনাই সলনি হয়। যদি আপুনি ভুল উত্তৰ, পুৰণি তথ্য, ভাঙা লিংক বা অনুবাদৰ ভুল পায়, তেন্তে পৃষ্ঠাৰ ঠিকনা আৰু শুদ্ধ তথ্যসহ <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ লিখক। আমি প্ৰতিটো অভিযোগ উৎসৰ সৈতে যাচাই কৰি পৃষ্ঠা সলনি কৰোঁ, আৰু দুই-তিনি কৰ্মদিৱসৰ ভিতৰত উত্তৰ দিবলৈ চেষ্টা কৰোঁ। সংশোধন লাইভ পৃষ্ঠাত কৰা হয় আৰু শেষ হালনাগাদৰ তাৰিখ সলনি কৰা হয়। প্ৰধান পৰিৱৰ্তনৰ ৰেকৰ্ড <a href="/updates/">সমল হালনাগাদ পৃষ্ঠা</a>ত ৰখা হয়।</p>
        <p>axomexam.in এখন স্বতন্ত্ৰ অধ্যয়ন সহায়িকা। ই চৰকাৰী প'ৰ্টেল নহয় আৰু কোনো নিযুক্তি ব'ৰ্ডক প্ৰতিনিধিত্ব নকৰে। আবেদন কৰাৰ আগতে যোগ্যতা, তাৰিখ আৰু পৰীক্ষাৰ আৰ্হি চৰকাৰী জাননীৰ পৰা সদায় নিশ্চিত কৰক।</p>

        <h2>বিজ্ঞাপন আৰু সম্পাদকীয় স্বাধীনতা</h2>
        <p>ৱেবছাইটটো ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া আৰু বিজ্ঞাপনৰ দ্বাৰা সমৰ্থিত। বিজ্ঞাপন তৃতীয় পক্ষৰ নেটৱৰ্কে পৰিবেশন কৰে আৰু সম্পাদকীয় সমলৰ পৰা স্পষ্টভাৱে পৃথক থাকে। বিজ্ঞাপনদাতাই অধ্যয়ন সামগ্ৰী পৰ্যালোচনা, অনুমোদন বা প্ৰভাৱিত নকৰে, আৰু বিজ্ঞাপনৰ উপস্থিতি বিজ্ঞাপিত সামগ্ৰীৰ অনুমোদন নহয়।</p>
        <p>আমি ভুল পৃষ্ঠা, ৰিডাইৰেক্ট পৃষ্ঠা, সন্ধান ফলাফল বা অধ্যয়ন সামগ্ৰী নথকা অন্য স্ক্ৰীনত বিজ্ঞাপন নৰখোঁ। বিজ্ঞাপন থকা পৃষ্ঠাত ওপৰত বৰ্ণনা কৰা সম্পূৰ্ণ বিষয়বস্তু থাকে, কেৱল বিজ্ঞাপন দেখুওৱাৰ বাবে লিখা সাৰাংশ নহয়।</p>

        <h2>যোগাযোগ</h2>
        <p>এই নীতিৰ বিষয়ে প্ৰশ্ন, সংশোধনৰ অনুৰোধ আৰু অৱদান <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ বা <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ৰ জৰিয়তে পঠিয়াব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p><strong>axomexam.in</strong> publishes free bilingual study material for Assam state recruitment examinations and for central examinations that are popular in Assam. This page explains who prepares that material, how it is checked, which sources are used, how errors are corrected, and how advertising is kept separate from editorial decisions. It applies to every question bank, mock test, previous year paper, e-book, PDF note and article published on this website.</p>

        <h2>Who prepares the content</h2>
        <p>Content is planned and reviewed by the <a href="/editorial-team/">Axomexam Editorial Team</a>, which works only on study material for this platform. Every page is checked by a subject reviewer and, for Assamese text, by a language reviewer before it is published. We do not accept payment from coaching institutes, publishers or exam portals in exchange for including their material, and no sponsored page is presented as study content.</p>

        <h2>How a page is created</h2>
        <ol>
          <li><strong>Syllabus mapping.</strong> Each section is first matched to the official syllabus or notification of the examination it supports, so that the topics on the page are the topics that the paper actually tests.</li>
          <li><strong>Drafting.</strong> Questions, answers and explanations are written in plain language. Wherever a numerical or reasoning question needs working, the steps are shown instead of only the final answer. English and Assamese versions are prepared together so that the two versions cover the same material.</li>
          <li><strong>Fact-checking.</strong> Facts, dates, names and numerical answers are cross-checked against official notifications and government portals, public previous year question papers, and standard school or reference material. A statement that cannot be verified is not published as fact.</li>
          <li><strong>Language review.</strong> The Assamese version is read for correct terminology, spelling and natural usage, not merely translated word for word. Technical terms are kept in the form used in Assamese exam papers.</li>
          <li><strong>Publishing and review.</strong> Each page carries a published date and a last-updated date. Content is reviewed again when a syllabus, exam pattern or official notification changes.</li>
        </ol>

        <h2>Sources we use</h2>
        <p>We rely on primary and publicly available material: official recruitment notifications and corrigenda, official exam portals, public previous year question papers, and standard school-level textbooks. A list of the official portals we monitor is maintained on the <a href="/sources/">official sources page</a>.</p>
        <p>We do not reproduce chapters, question banks or explanatory text from commercial books. Where a topic is commonly explained in a particular way, we write our own explanation and check it against the syllabus and public material. References to third-party publications are not used as a substitute for our own verification.</p>

        <h2>Use of AI-assisted tools</h2>
        <p>Like many modern publishers, we use software, including AI language tools, to help draft, format and translate text. These tools are used as drafting aids only. Every published page is reviewed by a person before it goes live, facts are checked against the sources described above, and the editorial team is responsible for what is published. We do not auto-publish unreviewed machine output, and we do not use AI tools to invent exam notifications, dates or results.</p>

        <h2>Accuracy, corrections and updates</h2>
        <p>Examination details change often. If you find a wrong answer, an outdated fact, a broken link or a translation error, write to <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> with the page address and the correct information. We verify every report against a source before changing a page, and we aim to reply within two to three working days. Corrections are made on the live page and the last-updated date is changed. A record of major changes is kept on the <a href="/updates/">content updates page</a>.</p>
        <p>axomexam.in is an independent study aid. It is not a government portal and does not represent any recruitment board. Always confirm eligibility, dates and the exam pattern from the official notification before applying.</p>

        <h2>Advertising and editorial independence</h2>
        <p>The website is free to use and is supported by advertising. Advertising is served by third-party networks and is clearly distinguishable from editorial content. Advertisers do not review, approve or influence study material, and the presence of an advertisement is not an endorsement of the advertised product.</p>
        <p>We do not place advertising on error pages, redirect pages, search results or other screens that contain no study content. Pages that carry advertising contain the full topic material described above, not a summary written only to host ads.</p>

        <h2>Contact</h2>
        <p>Questions about this policy, correction requests and contributions can be sent to <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> or through the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `):t==="editorial-team"?(n=a?"সম্পাদকীয় দল":"Editorial Team",s=a?"axomexam সম্পাদকীয় দল: axomexam.in ত প্ৰকাশিত দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেৱে পৰিকল্পনা, লিখন, তথ্য-যাচাই আৰু পৰ্যালোচনা কৰে।":"The Axomexam Editorial Team: who plans, writes, fact-checks and reviews the bilingual study material published on axomexam.in.",i=a?`
        <p>axomexam.in ৰ প্ৰতিটো পৃষ্ঠা axomexam সম্পাদকীয় দলে প্ৰস্তুত আৰু পৰীক্ষা কৰে। দলটো সৰু আৰু কেৱল এই মঞ্চৰ অধ্যয়ন সামগ্ৰীত কাম কৰে। এই পৃষ্ঠাই জড়িত ভূমিকা, পৰ্যালোচনাৰ কাৰ্যপ্ৰবাহ, আৰু প্ৰতিজন অৱদানকাৰীয়ে মানি চলিবলগীয়া মানদণ্ড ব্যাখ্যা কৰে।</p>

        <h2>সম্পাদকীয় দলৰ ভূমিকা</h2>
        <ul>
          <li><strong>সমল পৰিকল্পনা আৰু পাঠ্যক্ৰমৰ মিল।</strong> চৰকাৰী জাননী আৰু পাঠ্যক্ৰম অনুসৰণ কৰে, কোন বিষয় কোন পৰীক্ষাৰ শিতানত পৰে নিৰ্ধাৰণ কৰে, আৰু পাঠ্যক্ৰমৰ পৰা বাদ পৰা সামগ্ৰী আঁতৰায়।</li>
          <li><strong>বিষয় লেখক।</strong> সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী, কম্পিউটাৰ সজাগতা আৰু চলিত ঘটনাৱলীত প্ৰশ্ন, উত্তৰ আৰু ধাপে ধাপে ব্যাখ্যা প্ৰস্তুত কৰে।</li>
          <li><strong>অসমীয়া ভাষা পৰ্যালোচক।</strong> অসমীয়া সংস্কৰণৰ শুদ্ধ পাৰিভাষিক শব্দ, বানান আৰু স্বাভাৱিক প্ৰয়োগ পৰীক্ষা কৰে, আৰু ইয়াৰ পৰিসৰ ইংৰাজী সংস্কৰণৰ সৈতে মিলে নে নাই নিশ্চিত কৰে।</li>
          <li><strong>তথ্য-যাচাই আৰু গুণগত পৰ্যালোচনা।</strong> প্ৰকাশৰ আগতে তথ্য, তাৰিখ, নাম আৰু সংখ্যাগত উত্তৰ চৰকাৰী জাননী, ৰাজহুৱা প্ৰশ্নকাকত আৰু মানক প্ৰসংগ সামগ্ৰীৰ সৈতে যাচাই কৰে।</li>
          <li><strong>কাৰিকৰী পৰ্যালোচনা।</strong> পৃষ্ঠাৰ গাঁথনি, ম'বাইলত পঢ়নক্ষমতা, সন্ধান, ডাউনল'ডযোগ্য ফাইল আৰু প্ৰকাশিত পৃষ্ঠাৰ অভিগম্যতা পৰীক্ষা কৰে।</li>
        </ul>

        <h2>এখন পৃষ্ঠা কেনেদৰে পৰ্যালোচনা কৰা হয়</h2>
        <ol>
          <li>বিষয়টো চৰকাৰী পাঠ্যক্ৰম বা জাননীৰ সৈতে মিলাই লোৱা হয়।</li>
          <li>উত্তৰ আৰু ব্যাখ্যাসহ ইংৰাজী আৰু অসমীয়াত খচৰা লিখা হয়।</li>
          <li>দ্বিতীয় এজন পৰ্যালোচকে তথ্য আৰু প্ৰতিটো সংখ্যাগত বা যুক্তিৰ প্ৰশ্নৰ কাম পৰীক্ষা কৰে।</li>
          <li>অসমীয়া পাঠৰ ভাষাৰ গুণ পৰ্যালোচনা কৰা হয়।</li>
          <li>প্ৰকাশৰ তাৰিখ আৰু শেষ হালনাগাদৰ তাৰিখসহ পৃষ্ঠা প্ৰকাশ কৰা হয়, আৰু পৰীক্ষাৰ আৰ্হি সলনি হ'লে পুনৰ পৰ্যালোচনা কৰা হয়।</li>
        </ol>
        <p>AI সহায়ক খচৰাৰ নীতিকে ধৰি সম্পূৰ্ণ প্ৰক্ৰিয়া <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>ত বৰ্ণনা কৰা হৈছে।</p>

        <h2>প্ৰতিজন অৱদানকাৰীয়ে মানি চলা মানদণ্ড</h2>
        <ul>
          <li>মৌলিক ব্যাখ্যা লিখক; বাণিজ্যিক পুথি বা অন্য ৱেবছাইটৰ পাঠ, প্ৰশ্ন বা নোট কপি নকৰিব।</li>
          <li>তথ্য চৰকাৰী বা ৰাজহুৱা উৎসৰ সৈতে যাচাই কৰক আৰু অযাচিত দাবীক সত্য হিচাপে উপস্থাপন নকৰিব।</li>
          <li>সংখ্যাগত আৰু যুক্তিৰ প্ৰশ্নত কেৱল উত্তৰ নহয়, কামৰ ধাপো দেখুওৱাক।</li>
          <li>ইংৰাজী আৰু অসমীয়া সংস্কৰণৰ পৰিসৰ আৰু কাঠিন্য সমান ৰাখক।</li>
          <li>জনোৱা ভুলসমূহ সময়মতে সংশোধন কৰক আৰু পৰিৱৰ্তন লিপিবদ্ধ কৰক।</li>
          <li>বিজ্ঞাপন আৰু সম্পাদকীয় সিদ্ধান্ত পৃথক ৰাখক।</li>
        </ul>

        <h2>স্বাধীনতা আৰু পুঁজি</h2>
        <p>axomexam.in স্বাধীনভাৱে পৰিচালিত আৰু ব্যৱহাৰ কৰিবলৈ বিনামূলীয়া। ই বিজ্ঞাপনৰ দ্বাৰা পুঁজিৰ যোগান ধৰে আৰু নিজৰ অধ্যয়ন সামগ্ৰীত কোনো পৰীক্ষা, কোচিং প্ৰতিষ্ঠান, পুথি বা সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বাবে ধন লোৱা নাই। দলৰ সদস্যসকলে পৃষ্ঠপোষকতা কৰা সামগ্ৰী সম্পাদকীয় সমল হিচাপে প্ৰকাশ নকৰে।</p>

        <h2>অৱদান আৰু সংশোধন</h2>
        <p>শিক্ষক, বিষয় বিশেষজ্ঞ আৰু ভুল ধৰা পেলোৱা পৰীক্ষাৰ্থীসকলক <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ লিখিবলৈ আমন্ত্ৰণ জনাইছোঁ। সোনকালে যাচাই কৰিব পৰাকৈ পৃষ্ঠাৰ ঠিকনা আৰু সংশোধনৰ উৎস অন্তৰ্ভুক্ত কৰিব। আপুনি <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ও ব্যৱহাৰ কৰিব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>Every page on axomexam.in is produced and checked by the Axomexam Editorial Team. The team is small and works only on study material for this platform. This page explains the roles involved, the review workflow, and the standards every contributor agrees to follow.</p>

        <h2>Roles in the editorial team</h2>
        <ul>
          <li><strong>Content planning and syllabus mapping.</strong> Tracks official notifications and syllabi, decides which topics belong to which exam section, and retires material that is no longer part of the syllabus.</li>
          <li><strong>Subject writers.</strong> Prepare questions, answers and step-by-step explanations in General Knowledge, Mathematics, General Science, Reasoning, General English, Computer Awareness and current affairs.</li>
          <li><strong>Assamese language reviewer.</strong> Checks the Assamese version for correct terminology, spelling and natural usage, and makes sure it matches the English version in scope.</li>
          <li><strong>Fact-check and quality review.</strong> Verifies facts, dates, names and numerical answers against official notifications, public question papers and standard reference material before publishing.</li>
          <li><strong>Technical review.</strong> Checks page structure, mobile readability, search, downloadable files and accessibility of the published page.</li>
        </ul>

        <h2>How a page is reviewed</h2>
        <ol>
          <li>The topic is matched to the official syllabus or notification.</li>
          <li>A draft is written in English and Assamese with answers and explanations.</li>
          <li>A second reviewer checks the facts and the working of every numerical or reasoning question.</li>
          <li>The Assamese text is reviewed for language quality.</li>
          <li>The page is published with a published date and a last-updated date, and is revisited when the exam pattern changes.</li>
        </ol>
        <p>The full process, including our policy on AI-assisted drafting, is described in the <a href="/editorial-policy/">editorial policy</a>.</p>

        <h2>Standards every contributor follows</h2>
        <ul>
          <li>Write original explanations; do not copy text, questions or notes from commercial books or other websites.</li>
          <li>Check facts against official or public sources and do not present an unverified claim as fact.</li>
          <li>Show the working for numerical and reasoning questions, not only the answer.</li>
          <li>Keep the English and Assamese versions equivalent in coverage and difficulty.</li>
          <li>Correct reported errors promptly and record the change.</li>
          <li>Keep advertising and editorial decisions separate.</li>
        </ul>

        <h2>Independence and funding</h2>
        <p>axomexam.in is independently run and free to use. It is funded by advertising and does not accept payment for including any exam, coaching institute, book or product in its study material. Team members do not publish sponsored material as editorial content.</p>

        <h2>Contributions and corrections</h2>
        <p>Teachers, subject experts and candidates who spot an error are welcome to write to <a href="mailto:contact@axomexam.in">contact@axomexam.in</a>. Please include the page address and the source for the correction so that it can be verified quickly. You can also use the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `):t==="sources"?(n=a?"চৰকাৰী উৎস আৰু তথ্যসূত্ৰ":"Official Sources & References",s=a?"axomexam.in ৰ অধ্যয়ন সামগ্ৰী প্ৰস্তুত আৰু যাচাই কৰিবলৈ ব্যৱহৃত চৰকাৰী পৰীক্ষা প'ৰ্টেল, জাননী যাচাই আৰু প্ৰসংগ সামগ্ৰী।":"Official exam portals, notification checks and reference material used to prepare and verify study content on axomexam.in.",i=a?`
        <p>অধ্যয়ন সামগ্ৰী তেতিয়াহে উপযোগী হয় যেতিয়া ই চৰকাৰী পৰীক্ষাৰ সৈতে মিলে। এই পৃষ্ঠাই আমি অনুসৰণ কৰা চৰকাৰী প'ৰ্টেলৰ তালিকা দিয়ে আৰু axomexam.in ৰ সমলত প্ৰভাৱ পেলোৱাৰ আগতে এখন জাননী কেনেদৰে যাচাই কৰা হয় তাক ব্যাখ্যা কৰে। আমি এখন স্বতন্ত্ৰ ৱেবছাইট আৰু এই কোনো সংস্থাৰ সৈতে সংযুক্ত নহয়।</p>

        <h2>চৰকাৰী পৰীক্ষা প'ৰ্টেল</h2>
        <div class="axo-sources-table-wrap" style="overflow-x:auto;">
          <table class="axo-sources-table" style="width:100%; border-collapse:collapse; font-size:0.95rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">পৰীক্ষা সংস্থা</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">তাত কি চাব</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">চৰকাৰী প'ৰ্টেল</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLPRB অসম</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">অসম আৰক্ষী কনিষ্টবল আৰু উপ-পৰিদৰ্শকৰ জাননী, পাঠ্যক্ৰম, প্ৰৱেশপত্ৰ আৰু ফলাফল</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slprbassam.in/" rel="noopener nofollow" target="_blank">slprbassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLRC অসম</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণীৰ জাননী, পৰীক্ষাৰ আৰ্হি আৰু ফলাফল</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slrcassam.in/" rel="noopener nofollow" target="_blank">slrcassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">APSC</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">সংযুক্ত প্ৰতিযোগিতামূলক পৰীক্ষা আৰু আয়োগৰ অন্যান্য পৰীক্ষা</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://apsc.nic.in/" rel="noopener nofollow" target="_blank">apsc.nic.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">কৰ্মচাৰী নিৰ্বাচন আয়োগ</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">CGL, CHSL, GD, MTS আৰু অন্যান্য কেন্দ্ৰীয় জাননী আৰু উত্তৰ-কুঞ্জিকা</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://ssc.gov.in/" rel="noopener nofollow" target="_blank">ssc.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ভাৰতীয় ৰে'লৱে</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">RRB NTPC, Group D, ALP আৰু অন্যান্য ৰে'লৱে নিযুক্তি জাননী</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://www.indianrailways.gov.in/" rel="noopener nofollow" target="_blank">indianrailways.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px;">গুৱাহাটী উচ্চ ন্যায়ালয়</td>
                <td style="padding:10px;">তৃতীয় আৰু চতুৰ্থ শ্ৰেণীৰ নিযুক্তি জাননী আৰু ফলাফল</td>
                <td style="padding:10px;"><a href="https://ghconline.gov.in/" rel="noopener nofollow" target="_blank">ghconline.gov.in</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>এখন জাননী কেনেদৰে যাচাই কৰা হয়</h2>
        <ol>
          <li>আমি জাননীখন নিযুক্তি সংস্থাৰ চৰকাৰী প'ৰ্টেলত খোলোঁ, কোনো কোচিং বা বাতৰি ৱেবছাইটত নহয়।</li>
          <li>বিজ্ঞাপন নম্বৰ, পদ, খালী পদৰ সংখ্যা আৰু শেষ তাৰিখ নিযুক্তি সংস্থাই প্ৰকাশ কৰা PDF ৰ সৈতে মিলাই পৰীক্ষা কৰোঁ।</li>
          <li>প্ৰথম বিজ্ঞাপনৰ পিছত কোনো সংশোধনী বা সময় বঢ়োৱা জাননী জাৰি হৈছে নেকি পৰীক্ষা কৰোঁ।</li>
          <li>বিৱৰণ চৰকাৰী নথিপত্ৰৰ সৈতে মিলাৰ পিছতহে সংশ্লিষ্ট পৃষ্ঠা হালনাগাদ কৰোঁ।</li>
          <li>চৰকাৰী তথ্য অস্পষ্ট হ'লে অনুমানেৰে পূৰণ নকৰি পৃষ্ঠাত সেই কথা উল্লেখ কৰোঁ।</li>
        </ol>

        <h2>প্ৰসংগ সামগ্ৰী</h2>
        <p>চৰকাৰী জাননীৰ উপৰিও আমাৰ ব্যাখ্যা মানক বিদ্যালয়-স্তৰৰ পাঠ্যপুথি, ৰাজহুৱা বিগত বৰ্ষৰ প্ৰশ্নকাকত আৰু বহুলভাৱে স্বীকৃত বিষয়-প্ৰসংগৰ সৈতে যাচাই কৰা হয়। প্ৰশ্ন আৰু ব্যাখ্যা আমাৰ নিজৰ শব্দত লিখা হয়। আমি বাণিজ্যিক পুথিৰ অধ্যায় পুনৰুত্পাদন নকৰোঁ, আৰু ছাইটৰ অন্য ঠাইত কোনো পুথিৰ উল্লেখ কৰাৰ অৰ্থ ইয়াৰ পাঠ কপি কৰা বুলি দাবী নহয়।</p>

        <h2>উৎসৰ সমস্যা জনোৱা</h2>
        <p>যদি কোনো লিংক ভাঙি গৈছে, জাননী সলনি হৈছে বা কোনো পৃষ্ঠাই উৎস ভুলকৈ উল্লেখ কৰিছে, তেন্তে পৃষ্ঠাৰ ঠিকনাসহ <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> লৈ লিখক। সংশোধন কেনেদৰে কৰা হয়, সেই বিষয়ে <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>ত চাওক।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>Study material is only useful if it matches the official examination. This page lists the official portals we monitor and explains how a notification is verified before it affects the content on axomexam.in. We are an independent website and are not connected to any of these organisations.</p>

        <h2>Official exam portals</h2>
        <div class="axo-sources-table-wrap" style="overflow-x:auto;">
          <table class="axo-sources-table" style="width:100%; border-collapse:collapse; font-size:0.95rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Exam body</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">What to check there</th>
                <th style="text-align:left; padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Official portal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLPRB Assam</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Assam Police constable and sub-inspector notifications, syllabus, admit cards and results</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slprbassam.in/" rel="noopener nofollow" target="_blank">slprbassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">SLRC Assam</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">ADRE Grade III and Grade IV notifications, exam pattern and results</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://slrcassam.in/" rel="noopener nofollow" target="_blank">slrcassam.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">APSC</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Combined Competitive Examination and other commission examinations</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://apsc.nic.in/" rel="noopener nofollow" target="_blank">apsc.nic.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Staff Selection Commission</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">CGL, CHSL, GD, MTS and other central notifications and answer keys</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://ssc.gov.in/" rel="noopener nofollow" target="_blank">ssc.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">Indian Railways</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);">RRB NTPC, Group D, ALP and other railway recruitment notices</td>
                <td style="padding:10px; border-bottom:1px solid var(--border,#e2e8f0);"><a href="https://www.indianrailways.gov.in/" rel="noopener nofollow" target="_blank">indianrailways.gov.in</a></td>
              </tr>
              <tr>
                <td style="padding:10px;">Gauhati High Court</td>
                <td style="padding:10px;">Grade III and Grade IV recruitment notices and results</td>
                <td style="padding:10px;"><a href="https://ghconline.gov.in/" rel="noopener nofollow" target="_blank">ghconline.gov.in</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How a notification is verified</h2>
        <ol>
          <li>We open the notice on the official portal of the recruiting body, not on a coaching or news website.</li>
          <li>We check the advertisement number, the post, the number of vacancies and the last date against the PDF published by the recruiting body.</li>
          <li>We check whether a corrigendum or extension notice has been issued after the first advertisement.</li>
          <li>We update the relevant page only after the details match the official document.</li>
          <li>Where the official information is unclear, the page says so instead of filling the gap with a guess.</li>
        </ol>

        <h2>Reference material</h2>
        <p>Besides official notifications, our explanations are checked against standard school-level textbooks, public previous year question papers and widely accepted subject references. Questions and explanations are written in our own words. We do not reproduce chapters from commercial books, and the mention of any book elsewhere on the site is not a claim that its text has been copied.</p>

        <h2>Reporting a source problem</h2>
        <p>If a link is broken, a notification has changed or a page cites a source incorrectly, write to <a href="mailto:contact@axomexam.in">contact@axomexam.in</a> with the page address. See the <a href="/editorial-policy/">editorial policy</a> for how corrections are handled.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `):t==="updates"?(n=a?"সমল হালনাগাদ":"Content Updates",s=a?"axomexam.in ৰ অধ্যয়ন সামগ্ৰীত কৰা সংশোধন, পাঠ্যক্ৰমৰ হালনাগাদ, নতুন শিতান আৰু সম্পাদকীয় পৰিৱৰ্তনৰ তাৰিখসহ ৰেকৰ্ড।":"A dated record of corrections, syllabus updates, new sections and editorial changes made to axomexam.in study material.",i=a?`
        <p>এই পৃষ্ঠাই অধ্যয়ন সামগ্ৰী আৰু ছাইট পৰিচালনাৰ পদ্ধতিত কৰা উল্লেখযোগ্য পৰিৱৰ্তন লিপিবদ্ধ কৰে। সৰু বানান সংশোধন তালিকাভুক্ত নকৰা হয়, কিন্তু পাঠ্যক্ৰমৰ পৰিৱৰ্তন, নতুন শিতান, উত্তৰৰ সংশোধন আৰু নীতিৰ পৰিৱৰ্তন লিপিবদ্ধ কৰা হয়। নতুন ভুক্তি প্ৰথমে দেখুওৱা হয়।</p>

        <h2>৫ নৱেম্বৰ ২০২৬ &mdash; এঘাৰখন বিষয় পৃষ্ঠাত অসমীয়া টোকা</h2>
        <ul>
          <li>কেৱল ইংৰাজী প্ৰবন্ধ থকা এঘাৰখন বিষয় পৃষ্ঠাত অসমীয়া অধ্যয়ন টোকা যোগ কৰা হৈছে, যাতে প্ৰতিখন পৃষ্ঠা আৰু তাৰ অসমীয়া সংস্কৰণত দুয়োটা ভাষাৰ সমল থাকে।</li>
          <li>সেই অসমীয়া টোকা লিখা build ধাপটোও যোগ কৰা হৈছে, যাতে ভৱিষ্যতে পুনৰ নিৰ্মাণ কৰিলেও সেয়া হেৰাই নাযায়।</li>
        </ul>

        <h2>৪ নৱেম্বৰ ২০২৬ &mdash; প্ৰতিখন সূচী পৃষ্ঠাত অধ্যয়ন সামগ্ৰী যোগ</h2>
        <ul>
          <li>শ্ৰেণী, পৰীক্ষা, মক-টেষ্ট, পূৰ্বৰ বছৰৰ প্ৰশ্ন আৰু বিষয় সূচী পৃষ্ঠাসমূহক চমু লিংক-তালিকাৰ পৰা বিষয়ভিত্তিক পৰিসৰ, জীৱন্ত প্ৰশ্নসংখ্যা, সমাধান কৰা নমুনা প্ৰশ্ন আৰু পুনৰালোচনা টোকাসহ সম্পূৰ্ণ অধ্যয়ন পৃষ্ঠালৈ বৃদ্ধি কৰা হৈছে।</li>
          <li>একেই পৃষ্ঠাসমূহত অসমীয়া আৰু ইংৰাজী দুয়োটা ভাষাত চমু সঘনাই সোধা প্ৰশ্ন শিতান যোগ কৰা হৈছে।</li>
          <li>এই পৃষ্ঠাসমূহৰ অসমীয়া সংস্কৰণ পুনৰ নিৰ্মাণ কৰা হৈছে যাতে দুয়োটা ভাষাই একে সামগ্ৰী বহন কৰে।</li>
        </ul>

        <h2>৩ নৱেম্বৰ ২০২৬ &mdash; প্ৰতিষ্ঠাপকৰ পৰিচয় আৰু সম্পাদকীয় স্বচ্ছতা</h2>
        <ul>
          <li>প্ৰতিষ্ঠাপক আৰু মুখ্য সম্পাদক বপন বৰ্মনক সম্পাদকীয় দল পৃষ্ঠাত দৃশ্যমান পৰিচয় আৰু ৰাজহুৱা যোগাযোগ লিংকসহ যোগ কৰা হৈছে।</li>
          <li>প্ৰতিষ্ঠাপকক ছাইটৰ Organization structured data ত এজন ব্যক্তি হিচাপে লিপিবদ্ধ কৰা হৈছে আৰু তেওঁৰ পৰিচয় পৃষ্ঠাৰ সৈতে সংযোগ কৰা হৈছে, যাতে ছাইট এজন নামযুক্ত আৰু দায়বদ্ধ প্ৰকাশকৰ নামত চলিব পাৰে।</li>
          <li>সম্পাদকীয় নীতি, সংশোধন নীতি আৰু প্ৰকাশকৰ যোগাযোগৰ তথ্য Organization structured data ত প্ৰকাশ কৰা হৈছে, যাতে সন্ধান ইঞ্জিনে ছাইটৰ দায়িত্ব কাৰ ওপৰত আছে সেয়া যাচাই কৰিব পাৰে।</li>
        </ul>


        <h2>২৩ অক্টোবৰ ২০২৬ &mdash; সম্পাদকীয় গুণগত পৰ্যালোচনা</h2>
        <ul>
          <li>লেখক পৰিচয়, উৎসৰ টোকা আৰু শেষ হালনাগাদৰ তাৰিখকে ধৰি প্ৰতিটো বিষয় পৃষ্ঠাৰ সম্পাদকীয় উপস্থাপন পৰ্যালোচনা কৰা হৈছে।</li>
          <li>সন্ধান ইঞ্জিনে ব্যৱহাৰ নকৰা আৰু পাঠকক সহায় নকৰা keyword meta টেগ আঁতৰোৱা হৈছে।</li>
          <li>বাণিজ্যিক প্ৰসংগ পুথিৰ উল্লেখ চৰকাৰী পাঠ্যক্ৰম আৰু ৰাজহুৱা উৎসৰ উল্লেখেৰে সলনি কৰা হৈছে, আৰু প্ৰভাৱিত বাক্যবোৰ নিজৰ শব্দত পুনৰ লিখা হৈছে।</li>
          <li>এই পৰিৱৰ্তন-তালিকা, <a href="/editorial-policy/">সম্পাদকীয় নীতি</a>, <a href="/editorial-team/">সম্পাদকীয় দল</a> পৃষ্ঠা আৰু <a href="/sources/">চৰকাৰী উৎস</a> পৃষ্ঠা যোগ কৰা হৈছে।</li>
          <li>ভুল পৃষ্ঠা, ৰিডাইৰেক্ট পৃষ্ঠা, সন্ধান পৃষ্ঠা আৰু অধ্যয়ন সামগ্ৰী নথকা অন্য স্ক্ৰীনৰ পৰা বিজ্ঞাপন আঁতৰোৱা হৈছে।</li>
        </ul>

        <h2>২২ অক্টোবৰ ২০২৬ &mdash; নকল বিৱৰণৰ সংশোধন</h2>
        <ul>
          <li>সন্ধান ইঞ্জিনৰ ছাইট স্কেনত ধৰা পৰা এখন নকল meta description টেগ আঁতৰোৱা হৈছে।</li>
        </ul>

        <h2>২ অক্টোবৰ ২০২৬ &mdash; চলিত ঘটনাৱলীৰ হালনাগাদ</h2>
        <ul>
          <li>অৰ্থনীতি আৰু বেংকিং, পৰিৱেশ আৰু পৰিৱেশ বিজ্ঞান, শীৰ্ষ সন্মিলন, ৰেংকিং আৰু প্ৰতিবেদন, আৰু মৃতকৰ্মকে ধৰি চলিত ঘটনাৱলীৰ শিতানসমূহ হালনাগাদ কৰা হৈছে।</li>
        </ul>

        <h2>১৮ ছেপ্তেম্বৰ ২০২৬ &mdash; ছাইট প্ৰকাশ</h2>
        <ul>
          <li>অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিষয়ভিত্তিক দ্বিভাষিক প্ৰশ্ন-সংগ্ৰহ, মক টেষ্ট, বিগত বৰ্ষৰ প্ৰশ্নকাকত আৰু PDF নোট প্ৰকাশ কৰা হৈছে।</li>
        </ul>

        <h2>হালনাগাদ কেনেদৰে লিপিবদ্ধ কৰা হয়</h2>
        <p>কোনো পৃষ্ঠা সংশোধন কৰিলে তাৰ শেষ হালনাগাদৰ তাৰিখ সলনি হয়, আৰু পাঠকে শিকা বা নিৰ্ভৰ কৰা তথ্যত প্ৰভাৱ পৰিলে পৰিৱৰ্তনৰ সাৰাংশ ইয়াত দিয়া হয়। পৰীক্ষাৰ জাননী, পাঠ্যক্ৰমৰ পৰিৱৰ্তন আৰু উত্তৰৰ সংশোধন সদায় লিপিবদ্ধ কৰা হয়। নতুন সামগ্ৰী <a href="/feed.xml">RSS ফীড</a>ৰ জৰিয়তে অনুসৰণ কৰিব পাৰে বা <a href="/contact/">যোগাযোগ পৃষ্ঠা</a>ৰ জৰিয়তে প্ৰয়োজনীয় সংশোধন জনাব পাৰে।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ৫ নৱেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>This page records substantive changes to the study material and to the way the site is run. Small spelling fixes are not listed, but syllabus changes, new sections, corrections to answers and policy changes are. The newest entries appear first.</p>

        <h2>5 November 2026 &mdash; Assamese notes on eleven topic pages</h2>
        <ul>
          <li>Added Assamese study notes to eleven topic pages that carried only the English article, so each page and its Assamese version now show content in both languages.</li>
          <li>Added the build step that writes those Assamese notes, so a future rebuild cannot drop them again.</li>
        </ul>

        <h2>4 November 2026 &mdash; Study content added to every index page</h2>
        <ul>
          <li>Expanded the category, exam, mock-test, previous-year and topic index pages from short link lists into full study pages with topic-wise coverage, live question counts, worked sample questions and revision notes.</li>
          <li>Added a short frequently-asked-questions section to the same pages, written in both English and Assamese.</li>
          <li>Rebuilt the Assamese versions of those pages so the two languages carry the same content.</li>
        </ul>

        <h2>3 November 2026 &mdash; Founder attribution and editorial transparency</h2>
        <ul>
          <li>Added the founder and editor-in-chief, Bapon Barmon, to the editorial team page with a visible profile and a public contact link.</li>
          <li>Recorded the founder in the site&#39;s Organization structured data as a Person, linked to the founder&#39;s profile page, so that the site is attributed to a named and accountable publisher.</li>
          <li>Published the editorial policy, corrections policy and publisher contact details in the Organization structured data so that search engines can verify who is responsible for the site.</li>
        </ul>


        <h2>23 October 2026 &mdash; Editorial quality review</h2>
        <ul>
          <li>Reviewed the editorial presentation of every topic page, including author attribution, source notes and last-updated dates.</li>
          <li>Removed keyword meta tags that were not used by search engines and did not help readers.</li>
          <li>Replaced references to commercial reference books with official syllabus and public-source references, and rewrote the affected sentences in our own words.</li>
          <li>Added this changelog, the <a href="/editorial-policy/">editorial policy</a>, the <a href="/editorial-team/">editorial team</a> page and the <a href="/sources/">official sources</a> page.</li>
          <li>Removed advertising from error pages, redirect pages, search pages and other screens without study content.</li>
        </ul>

        <h2>22 October 2026 &mdash; Duplicate description fix</h2>
        <ul>
          <li>Removed a duplicate meta description tag that had been flagged during a search-engine site scan.</li>
        </ul>

        <h2>2 October 2026 &mdash; Current affairs update</h2>
        <ul>
          <li>Updated the current affairs sections, including economy and banking, environment and ecology, summits and conferences, rankings and reports, and obituaries.</li>
        </ul>

        <h2>18 September 2026 &mdash; Site published</h2>
        <ul>
          <li>Published the topic-wise bilingual question banks, mock tests, previous year papers and PDF notes for Assam competitive examinations.</li>
        </ul>

        <h2>How updates are recorded</h2>
        <p>When a page is corrected, its last-updated date changes and the change is summarised here if it affects what a reader learns or relies on. Exam notifications, syllabus changes and corrections to answers are always recorded. You can follow new material through the <a href="/feed.xml">RSS feed</a> or report a needed correction through the <a href="/contact/">contact page</a>.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 5 November 2026 &middot; Publisher: axomexam.in</p>
      `):i=`<p>${r(`page.${t}.p1`)}</p>`,["editorial-policy","editorial-team","sources","updates"].includes(t)&&(i+=`
        <p class="axo-editorial-links" style="margin-top:26px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); line-height:2;">
          <strong>Axomexam Editorial:</strong>
          ${[["/editorial-policy/",a?"সম্পাদকীয় নীতি":"Editorial Policy"],["/editorial-team/",a?"সম্পাদকীয় দল":"Editorial Team"],["/sources/",a?"চৰকাৰী উৎস":"Official Sources"],["/updates/",a?"সমল হালনাগাদ":"Content Updates"]].map(([l,c])=>`<a href="${l}">${c}</a>`).join(" &middot; ")}
        </p>`),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${a?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${d(n)}</span></nav>
        <h1>${d(n)}</h1>
        ${s?`<p class="page-desc">${d(s)}</p>`:""}
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel${["editorial-policy","editorial-team","sources","updates"].includes(t)?" axo-editorial-page":""}" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:860px; margin:0 auto; text-align:left;">
          ${i}
        </div>
      </section>`,Ie(),window.scrollTo(0,0)}function $n(e){const t=u.lang==="as",a=t?["সমল সংশোধন","ভাঙা লিংক বা ডাউনল'ড সমস্যা","নতুন বিষয়ৰ অনুৰোধ","প্ৰশ্ন আগবঢ়াওক","কপিৰাইট / টেকডাউন অনুৰোধ","অন্যান্য"]:["Content correction","Broken link or download problem","New topic request","Contribute questions","Copyright / takedown request","Other"];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${t?"যোগাযোগ কৰক":"Contact Us"}</span></nav>
        <h1>${t?"যোগাযোগ কৰক":"Contact Us"}</h1>
        <p class="page-desc">${t?"ভুল উত্তৰ জনাওক, নতুন বিষয় বিচাৰক, প্ৰশ্ন আগবঢ়াওক, বা পৰীক্ষাৰ প্ৰস্তুতিত সহায় বিচাৰক।":"Report a wrong answer, request a topic, contribute questions, or ask for help with your exam preparation."}</p>
      </div>

      <section class="section" style="padding-bottom:40px;">
        <article style="max-width:860px; margin:0 auto; line-height:1.85; color:var(--ink-soft,#475569); text-align:left;">
          <p>${t?"আমি লাভ কৰা প্ৰতিটো বাৰ্তা পঢ়োঁ আৰু সেই প্ৰতিক্ৰিয়া axomexam.in ৰ প্ৰশ্ন-সংগ্ৰহ, নোট আৰু মক টেষ্ট উন্নত কৰিবলৈ ব্যৱহাৰ কৰোঁ। আপুনি এটা ভুল উত্তৰ জনাব, নতুন এটা বিষয়ৰ পৰামৰ্শ দিব, প্ৰশ্ন আগবঢ়াব বা অধ্যয়ন সামগ্ৰীৰ বিষয়ে সোধা-পোছা কৰিব বিচাৰে নে নাই — এই পৃষ্ঠাই আমাৰ সৈতে যোগাযোগ কৰাৰ আটাইতকৈ ভাল উপায় ব্যাখ্যা কৰে।":"We read every message we receive and use the feedback to improve the question banks, notes and mock tests on axomexam.in. Whether you want to report a wrong answer, suggest a new topic, contribute questions or ask about study material, this page explains the best way to reach us."}</p>

          <h2>${t?"ইমেইল সহায়":"Email Support"}</h2>
          <p>${t?"যোগাযোগৰ আটাইতকৈ দ্ৰুত উপায় হ'ল":"The fastest way to contact us is by email at"} <a href="mailto:support@axomexam.in">support@axomexam.in</a>${t?" লৈ ইমেইল। আমাক উত্তৰ দিবলৈ অনুগ্ৰহ কৰি এটা বৈধ ইমেইল ঠিকনাৰ পৰা লিখক। আমি সাধাৰণতে":". Please write from a valid email address so that we can reply. We usually respond within"} <strong>${t?"দুৰৰ পৰা তিনি কৰ্মদিৱসৰ":"two to three working days"}</strong>${t?" ভিতৰত উত্তৰ দিওঁ।":"."}</p>

          <form id="contact-form" action="mailto:support@axomexam.in" method="post" enctype="text/plain" style="margin:22px 0 10px; padding:22px; border:1px solid var(--border,#e2e8f0); border-radius:16px; background:var(--card-bg,#fff);">
            <h3 style="margin-top:0; color:var(--ink,#0f172a);">${t?"আমাক এটা বাৰ্তা পঠিয়াওক":"Send us a message"}</h3>
            <div style="margin-bottom:12px;">
              <label for="c-name" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"আপোনাৰ নাম":"Your name"}</label>
              <input id="c-name" name="name" type="text" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-email" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"আপোনাৰ ইমেইল":"Your email"}</label>
              <input id="c-email" name="email" type="email" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-subject" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"বিষয়":"Subject"}</label>
              <select id="c-subject" name="subject" style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;">
                ${a.map(s=>`<option>${s}</option>`).join("")}
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label for="c-message" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"বাৰ্তা":"Message"}</label>
              <textarea id="c-message" name="message" rows="5" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">${t?"বাৰ্তা পঠিয়াওক":"Send message"}</button>
            <p style="font-size:0.82rem; color:#64748b; margin:10px 0 0;">${t?"ই আপোনাৰ ইমেইল এপটো তথ্য ভৰাই খুলিব। যদি নুখুলে, তেন্তে পোনপটীয়াকৈ":"This opens your email app with the details filled in. If it does not open, simply email us directly at"} <a href="mailto:support@axomexam.in">support@axomexam.in</a>${t?" লৈ ইমেইল কৰক।":"."}</p>
          </form>

          <h2>${t?"আপোনাৰ বাৰ্তাত কি অন্তৰ্ভুক্ত কৰিব":"What to Include in Your Message"}</h2>
          <ul>
            <li>${t?"<strong>সমল সংশোধনৰ বাবে:</strong> পৃষ্ঠাৰ সঠিক লিংক, প্ৰশ্ন নম্বৰ, আপুনি ভুল বুলি ভবা কথাটো, আৰু এটা চুটি কাৰণ বা উৎসসহ সঠিক উত্তৰ।":"<strong>For a content correction:</strong> the exact page link, the question number, what you believe is wrong, and the correct answer with a short reason or source."}</li>
            <li>${t?"<strong>ভাঙা লিংক বা ডাউনল'ড সমস্যাৰ বাবে:</strong> লিংকটো দেখা পোৱা পৃষ্ঠা আৰু ফাইল বা প্ৰশ্নকাকতৰ নাম।":"<strong>For a broken link or download problem:</strong> the page where the link appears and the name of the file or paper."}</li>
            <li>${t?"<strong>নতুন বিষয় অনুৰোধৰ বাবে:</strong> পৰীক্ষাৰ নাম, বিষয় আৰু আমি যোগ কৰিবলগীয়া নিৰ্দিষ্ট বিষয়টো।":"<strong>For a new topic request:</strong> the exam name, subject and the specific topic you would like us to add."}</li>
            <li>${t?"<strong>প্ৰশ্ন আগবঢ়োৱাৰ বাবে:</strong> বিষয়, প্ৰশ্ন চাৰিটা বিকল্পসহ, সঠিক বিকল্প আৰু এটা চুটি ব্যাখ্যা।":"<strong>For contributing questions:</strong> the subject, topic, questions with four options, the correct option and a brief explanation."}</li>
          </ul>

          <h2>${t?"উত্তৰৰ সময়":"Response Time"}</h2>
          <p>${t?"আমি প্ৰতিটো প্ৰামাণিক বাৰ্তাৰ উত্তৰ দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত দিবলৈ চেষ্টা কৰোঁ। বাৰ্তাসমূহ অহা ক্ৰমত পৰিচালনা কৰা হয়, আৰু যাচাইযোগ্য উৎসসহ সমল সংশোধনসমূহ সাধাৰণতে আগতে প্ৰক্ৰিয়া কৰা হয়।":"We aim to reply to every genuine message within two to three working days. Messages are handled in the order they arrive, and content corrections that include a verifiable source are usually processed first."}</p>

          <h2>${t?"কপিৰাইট সমল জনাওক":"Report Copyright Content"}</h2>
          <p>${t?"যদি আপুনি বিশ্বাস কৰে যে axomexam.in ৰ কোনো সামগ্ৰীয়ে আপোনাৰ কপিৰাইট উলংঘা কৰিছে, পৃষ্ঠাৰ লিংক আৰু মালিকীস্বত্বৰ প্ৰমাণসহ আমালৈ ইমেইল কৰক। আমি অনুৰোধ পৰ্যালোচনা কৰি প্ৰয়োজন হ'লে সামগ্ৰী আঁতৰাব। আমি বৌদ্ধিক সম্পত্তিক সন্মান কৰোঁ আৰু বৈধ টেকডাউন অনুৰোধসমূহ তৎক্ষণাত পালন কৰোঁ।":"If you believe any material on axomexam.in infringes your copyright, email us with the page link and proof of ownership. We will review the request and remove the material if required. We respect intellectual property and act on valid takedown requests promptly."}</p>

          <h2>${t?"সাধাৰণ প্ৰশ্ন":"Common Questions"}</h2>
          <p>${t?'<strong>ফোন নম্বৰ বা লাইভ চেট আছে নেকি?</strong> ফোন নম্বৰ নাই। প্ৰতিটো পৃষ্ঠাৰ তলত থকা "আমাৰ সৈতে কথা পাতক" বুটাম ব্যৱহাৰ কৰি WhatsAppত আমাৰ সৈতে যোগাযোগ কৰিব পাৰে, অথবা সবিশেষ বা কপিৰাইট সম্পৰ্কীয় অনুসন্ধানৰ বাবে ইমেইল কৰিব পাৰে।':'<strong>Is there a phone number or live chat?</strong> There is no phone line. You can reach us on WhatsApp using the "Chat with us" button at the bottom of every page, or by email for detailed or copyright-related queries.'}</p>
          <p>${t?"<strong>মই অধ্যয়ন পৰিকল্পনা বিচাৰিব পাৰোঁ নেকি?</strong> হয়। আপুনি যি পৰীক্ষাৰ বাবে প্ৰস্তুতি চলাইছে আৰু পৰীক্ষাৰ তাৰিখ কওক, আমি আপোনাক আটাইতকৈ প্ৰাসংগিক শিতান আৰু অধ্যয়নৰ পৰামৰ্শিত ক্ৰমলৈ নিৰ্দেশ কৰিম।":"<strong>Can I request a study plan?</strong> Yes. Tell us the exam you are preparing for and the date of the exam, and we will point you to the most relevant sections and a suggested order of study."}</p>
          <p>${t?'<strong>আপোনালোকে মোৰ তথ্য শ্বেয়াৰ বা বিক্ৰী কৰে নেকি?</strong> কেতিয়াও নহয়। আপোনাৰ ইমেইল কেৱল আপোনাৰ অনুসন্ধানৰ উত্তৰ দিবলৈ ব্যৱহাৰ কৰা হয়, আমাৰ <a href="/privacy/">গোপনীয়তা নীতি</a>ত ব্যাখ্যা কৰাৰ দৰে।':'<strong>Do you share or sell my details?</strong> Never. Your email is used only to reply to your query, as explained in our <a href="/privacy/">Privacy Policy</a>.'}</p>
          <p>${t?"<strong>মই ছাইটলৈ প্ৰশ্ন আগবঢ়াব পাৰোঁ নেকি?</strong> হয়। চাৰিটা বিকল্প আৰু এটা চুটি ব্যাখ্যাসহ পঠিয়াওক, আমাৰ দলে প্ৰকাশৰ আগতে পৰ্যালোচনা কৰিব।":"<strong>Can I contribute questions to the site?</strong> Yes. Send them with four options and a short explanation, and our team will review them before publishing."}</p>

          <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>${t?"শেষ হালনাগাদ:":"Last updated:"}</strong> ${t?"২০ ছেপ্তেম্বৰ ২০২৬":"20 September 2026"} &middot; ${t?"প্ৰকাশক:":"Publisher:"} axomexam.in</p>
        </article>
      </section>
    `;const n=document.getElementById("contact-form");n&&n.addEventListener("submit",function(s){s.preventDefault();const i=(document.getElementById("c-name")||{}).value||"",o=(document.getElementById("c-email")||{}).value||"",l=(document.getElementById("c-subject")||{}).value||"Website enquiry",c=(document.getElementById("c-message")||{}).value||"",p="Name: "+i+`
Email: `+o+`

`+c;window.location.href="mailto:support@axomexam.in?subject="+encodeURIComponent("[axomexam] "+l)+"&body="+encodeURIComponent(p)}),Ie(),L(),window.scrollTo(0,0)}function N(e){return(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Oe(e){return e==null?"":typeof e=="string"?e:Array.isArray(e)?e.join(" "):[e.en,e.as].filter(Boolean).map(t=>Array.isArray(t)?t.join(" "):t).join(" ")}function Ut(e){const t=N(e);if(t.length<2)return[];const a=[],n=typeof CONFIG<"u"?CONFIG.SEARCH_LIMIT:20;for(const s of u.topicIndex){const i=N(v({en:s.title.en})),o=N(v({as:s.title.as})),l=(s.tags||[]).filter(h=>N(h).includes(t)),c=(s.topic.questions||[]).filter(h=>{const f=typeof h.q=="object"?Oe(h.q):(h.q||h.question_en||"")+" "+(h.question_as||""),m=typeof h.a=="object"?Oe(h.a):(h.a||h.answer_en||"")+" "+(h.answer_as||"");return N(f).includes(t)||N(m).includes(t)});let p=0;i.includes(t)&&(p+=5),o.includes(t)&&(p+=5),p+=l.length*3,p+=c.length*1.5,p>0&&a.push({rec:s,score:p,matchCount:c.length+l.length})}return a.sort((s,i)=>i.score-s.score).slice(0,n)}let ve=null;function Vt(){return u.searchCorpusReady?Promise.resolve():ve||(ve=(async()=>{const e=u.topicIndex.filter(n=>!(n.topic&&Array.isArray(n.topic.questions)&&n.topic.questions.length)),t=async()=>{for(;e.length;){const n=e.shift();try{const s=await API.getTopic(n.cat.id,n.topic.id,n.sub&&n.sub.id,n.cat&&n.cat.contentLayout);if(s){const i=Array.isArray(s)?s:Array.isArray(s.questions)?s.questions:[];n.topic.questions=i,n.nQuestions||(n.nQuestions=i.length)}}catch{}}},a=Math.min(8,e.length);await Promise.all(Array.from({length:a},t)),u.searchCorpusReady=!0})().finally(()=>{ve=null}),ve)}function An(){const e=g("#master-search"),t=g("#search-results");if(!e||!t)return;let a;const n=()=>{t.hidden=!0,t.innerHTML=""},s=o=>{const l=Ut(o);l.length?(t.innerHTML=`
          <div class="sr-head">${r("search.results")} (${l.length})</div>
          ${l.map((c,p)=>`
            <a class="sr-item" href="/topic/${c.rec.path}" data-idx="${p}">
              <span class="chip">${d(v(c.rec.cat.name))}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span class="sr-title">${d(v(c.rec.title))}</span>
                <span class="sr-sub">${d(v(c.rec.section?c.rec.section.name:c.rec.sub?c.rec.sub.name:""))} • ${c.rec.cat.id==="study-guides"?u.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${c.rec.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
            </a>`).join("")}`,t.innerHTML+=`<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${r("see.all")}</a>`):t.innerHTML=`<div class="sr-empty">${r("search.noresult")}</div>`,t.hidden=!1},i=o=>{clearTimeout(a);const l=o.target.value;if(l.trim().length<2){n();return}a=setTimeout(()=>{s(l),Vt().then(()=>{!t.hidden&&e.value.trim()===l.trim()&&s(l)})},180)};e.addEventListener("input",i),e.addEventListener("focus",()=>{e.value.trim().length>=2&&i({target:e})}),document.addEventListener("click",o=>{o.target.closest(".search-wrap")||n()}),t.addEventListener("click",o=>{o.target.closest("a.sr-item")&&(e.value="",n())})}function Cn(e){const a=tt.map(h=>u.categories.find(f=>f.id===h)).filter(Boolean).slice(0,6).map(h=>`<a class="sp-chip" href="/category/${h.id}">${d(v(h.name))}</a>`).join(""),n=()=>`
      <div class="sp-empty">
        <span class="sp-empty-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <span>${r("search.hint")}</span>
      </div>`,s=()=>`
      <div class="sp-empty">
        <span class="sp-empty-ico is-warn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
        </span>
        <span>${r("search.noresult")}</span>
      </div>`;e.innerHTML=`
      <div class="page-head sp-page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("tab.search")}</span></nav>
      </div>
      <div class="search-page">
        <div class="sp-hero">
          <span class="sp-hero-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <h1 class="sp-hero-title">${r("tab.search")}</h1>
          <p class="sp-hero-sub">${r("search.hint")}</p>
        </div>
        <div class="sp-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${r("search.placeholder")}" aria-label="${r("tab.search")}" />
          <button type="button" class="sp-clear" id="page-search-clear" aria-label="Clear search" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        ${a?`<div class="sp-sugg"><span class="sp-sugg-label">${r("search.popular")}</span><div class="sp-sugg-list">${a}</div></div>`:""}
        <div class="sp-results" id="page-search-results">${n()}</div>
      </div>`;const i=g("#page-search"),o=g("#page-search-results"),l=g("#page-search-clear");let c;const p=()=>{const h=i.value.trim();if(l&&(l.hidden=!h),h.length<2){o.innerHTML=n();return}const f=Ut(h);if(!f.length){o.innerHTML=s();return}o.innerHTML=f.map(m=>`
        <a class="sp-topic" href="/topic/${m.rec.path}">
          <span class="sp-topic-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
          </span>
          <span class="sp-topic-body">
            <span class="sp-topic-title">${d(v(m.rec.title))}</span>
            <span class="sp-topic-meta">${d(v(m.rec.section?m.rec.section.name:m.rec.sub?m.rec.sub.name:""))} • ${m.rec.cat.id==="study-guides"?u.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${m.rec.nQuestions||0} ${r("topic.questions")}`}</span>
          </span>
          <span class="chip">${d(v(m.rec.cat.name))}</span>
        </a>`).join("")};l&&l.addEventListener("click",()=>{i.value="",l.hidden=!0,i.focus(),o.innerHTML=n()}),i.addEventListener("input",()=>{clearTimeout(c);const h=i.value;l&&(l.hidden=!h.trim()),c=setTimeout(()=>{p(),Vt().then(()=>{i.value.trim()===h.trim()&&p()})},180)})}function xe(){const e=g("#mobile-menu"),t=g("#mobile-backdrop"),a=g("#hamburger");e&&(e.classList.remove("open"),e.hidden=!0),t&&(t.classList.remove("open"),t.hidden=!0),a&&(a.classList.remove("open"),a.setAttribute("aria-expanded","false"))}function Kt(){const e=g("#mobile-menu"),t=g("#mobile-backdrop"),a=g("#hamburger");e&&(e.hidden=!1),t&&(t.hidden=!1),requestAnimationFrame(()=>{e&&e.classList.add("open"),t&&t.classList.add("open")}),a&&(a.classList.add("open"),a.setAttribute("aria-expanded","true"))}let ye;function L(){ye&&ye.disconnect();const e=P(".reveal");if(!("IntersectionObserver"in window)){e.forEach(t=>t.classList.add("visible"));return}e.forEach(t=>{const a=parseInt(t.dataset.delay||"0",10);a&&(t.style.transitionDelay=`${a}ms`)}),ye=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),ye.unobserve(a.target))})},{threshold:.08,rootMargin:"0px 0px -30px 0px"}),e.forEach(t=>ye.observe(t))}function d(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function G(e){e.innerHTML=`
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${r("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${r("page.error.btn")}</a></div>
      </div>`}function B(e){const t=g("#toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.remove("show"),2400))}function Sn(e){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("tab.categories")}</span></nav>
        <h1>${r("tab.categories")}</h1>
        <p class="page-desc">${r("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${u.categories.map((t,a)=>{const n=z(t.id);return`
              <a class="cat-card reveal" href="/category/${t.id}" style="--cat:${n}" data-delay="${a*50}">
                <span class="cat-ico">${ae(t.id)}</span>
                <span class="cat-meta">
                  ${qt(t.name)}
                  <span><span class="cat-count">${ge(t)}</span> ${t.id==="study-guides"?u.uiLang==="as"?"টা গাইড":"Guides":r("cat.topics")}</span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,L()}function Jt(e){let t=g("#pdf-loading-overlay");t?(g("#pdf-spinner-text").textContent=e||"Generating PDF...",t.style.display="flex"):(t=document.createElement("div"),t.id="pdf-loading-overlay",t.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;backdrop-filter:blur(4px);",t.innerHTML=`
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;flex:0 0 auto;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;line-height:1.6;text-align:center;max-width:min(92vw,460px);margin:0 auto;padding:0 4px;font-family:'Plus Jakarta Sans',sans-serif;word-break:break-word;overflow-wrap:anywhere;">${d(e||"Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `,document.body.appendChild(t))}function Xt(){const e=g("#pdf-loading-overlay");e&&(e.style.display="none")}function qn(e){const t=g("#pdf-lang-modal");t&&t.remove();const a=document.createElement("div");a.id="pdf-lang-modal",a.className="read-modal",a.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;",a.innerHTML=`
      <div class="read-modal-backdrop" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);"></div>
      <div class="read-modal-box pdf-pop-box" role="dialog" style="position:relative; z-index:2; width:90%; max-width:340px; padding:24px 20px; text-align:center; background:var(--bg,#ffffff); color:var(--ink,#0f172a); border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); border:1px solid var(--border,#e2e8f0); animation:popIn 0.22s cubic-bezier(0.16,1,0.3,1); box-sizing:border-box; display:flex; flex-direction:column; align-items:center;">
        
        <div style="width:52px; height:52px; background:rgba(37,99,235,0.1); color:#2563eb; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; font-size:1.6rem;">
          📄
        </div>

        <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 6px 0; color:var(--ink,#0f172a); letter-spacing:-0.2px; text-align:center; width:100%;">Select PDF Language</h3>
        <p style="color:var(--ink-soft,#64748b); font-size:0.84rem; margin:0 0 20px 0; line-height:1.4; padding:0 4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-align:center; width:100%;">
          <b>${d(v(e.title))}</b>
        </p>

        <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <button type="button" class="pdf-action-btn pdf-btn-as-action" id="pdf-btn-as">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot"></span>
              অসমীয়া মাধ্যম (Assamese)
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" class="pdf-action-btn pdf-btn-en-action" id="pdf-btn-en">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot" style="background:#0ea5e9;"></span>
              English Medium
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" id="pdf-btn-cancel" style="border:none; background:transparent; padding:8px; font-size:0.82rem; margin-top:4px; color:var(--ink-muted,#94a3b8); font-weight:700; cursor:pointer; transition:color 0.2s;">
            Cancel
          </button>
        </div>
      </div>
      
      <style>
        @keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pdf-action-btn { width: 100%; padding: 13px 16px; font-weight: 700; font-size: 0.92rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease-in-out; outline: none; box-sizing: border-box; user-select: none; }
        .pdf-btn-as-action { background: #2563eb; color: #ffffff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); }
        .pdf-btn-as-action:hover { background: #1d4ed8; transform: translateY(-1px); }
        .pdf-btn-as-action:active { transform: scale(0.96); }
        .pdf-btn-en-action { background: var(--bg-subtle, #f8fafc); color: var(--ink, #0f172a); border-color: var(--border, #cbd5e1); }
        .pdf-btn-en-action:hover { background: var(--bg-soft, #f1f5f9); border-color: #2563eb; color: #2563eb; transform: translateY(-1px); }
        .pdf-btn-en-action:active { transform: scale(0.96); }
        .btn-indicator-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; }
        [data-theme="dark"] .pdf-pop-box { background: #0f172a !important; border-color: #334155 !important; color: #f8fafc !important; }
        [data-theme="dark"] .pdf-btn-en-action { background: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
        [data-theme="dark"] .pdf-btn-en-action:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }
      </style>
    `,document.body.appendChild(a);const n=()=>a.remove();g("#pdf-btn-cancel",a).addEventListener("click",n),g(".read-modal-backdrop",a).addEventListener("click",n),g("#pdf-btn-as",a).addEventListener("click",s=>{s.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{n(),Zt(e,"as")},100)}),g("#pdf-btn-en",a).addEventListener("click",s=>{s.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{n(),Zt(e,"en")},100)})}async function Zt(e,t){if(u.isGeneratingPdf)return;u.isGeneratingPdf=!0,Jt(t==="as"?"PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি অপেক্ষা কৰক...":"Generating PDF, please wait..."),await new Promise($=>setTimeout($,40));let n=e.topic.questions||[];if(!n.length)try{const $=await API.getTopic(e.cat.id,e.topic.id,e.sub&&e.sub.id,e.cat&&e.cat.contentLayout);$&&(n=Array.isArray($)?$:$.questions||[],e.topic.questions=n)}catch($){console.error("PDF fetch error:",$)}if(!n.length){Xt(),u.isGeneratingPdf=!1,B(t==="as"?"এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!":"No questions available in this topic!");return}const s=e.title[t]||e.title.as||e.title.en||e.topic.id,i=e.cat.name[t]||e.cat.name.as||e.cat.name.en||"",o=t==="as"?"অসমীয়া মাধ্যম":"English Medium",l=t==="as"?"উত্তৰ":"Answer",c=t==="as"?"ব্যাখ্যা":"Explanation",p=t==="as"?"'Noto Serif Bengali', serif":"'Plus Jakarta Sans', sans-serif",h=document.createElement("div");h.style.cssText="position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:"+p+";",document.body.appendChild(h);const f=n.map(($,E)=>{const M=T($,"question",t),I=T($,"answer",t),D=T($,"explanation",t),j=F($,t),J=re($),se=le($),oe=t,Ce=$.a&&typeof $.a=="object"&&$.a[oe]||$.a||$.answer,Se=Array.isArray(Ce)||I.includes("qa-step-line"),V=document.createElement("div");return V.className="qa-row",V.style.cssText="border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;",Se?V.innerHTML=`
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${E+1}. ${q(M)}</div>
          ${J}
          ${se?K($,{compact:!0}):j.length?`
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${j.map((qe,R)=>{const ie=`(${String.fromCharCode(65+R)}) ${qe}`;return`<span>${q(ie)}</span>`}).join("")}
            </div>`:""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${I}</div>
          ${D?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${D}</div>`:""}
        `:V.innerHTML=`
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${E+1}. ${q(M)}</div>
          ${J}
          ${se?K($,{compact:!0}):""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${l}: ${q(I)}</div>
          ${D?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${D}</div>`:""}
        `,h.appendChild(V),V});await ee(h),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise($=>setTimeout($,3e3))]);const m=f.map($=>({html:$.outerHTML,height:$.offsetHeight+7}));h.remove();const x=[];let y=[],b=0;const w=1010;m.forEach($=>{b+$.height>w&&y.length>0?(x.push(y),y=[$.html],b=$.height):(y.push($.html),b+=$.height)}),y.length>0&&x.push(y);const A=x.length,C=document.createElement("div");C.id="dynamic-pdf-export-container",C.style.cssText="position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;";function S($,E){const M=E===1,I=document.createElement("div");I.className="pdf-page-node",I.style.cssText=`
        width: 794px;
        height: 1122px;
        max-height: 1122px;
        background: #ffffff;
        color: #0f172a;
        padding: 20px 34px 14px 34px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: ${p};
      `;const D=M?`
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${d(s)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${d(i)} • ${t==="as"?"মুঠ বিষয়":"Total Content"}: ${n.length} | ${o}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${St}
              </td>
            </tr>
          </table>
        </div>
      `:`
        <div style="border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; margin-bottom:4px; height:36px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td></td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${St}
              </td>
            </tr>
          </table>
        </div>
      `;return I.innerHTML=`
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${D}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${$.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${E} of ${A} —</span>
          <span>axomexam.in</span>
        </div>
      `,I}document.body.appendChild(C);try{if(await Da(),!window.jspdf||!window.html2canvas)throw new Error("jsPDF or html2canvas library is missing.");document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(R=>setTimeout(R,3e3))]);const{jsPDF:$}=window.jspdf,E=new $("p","mm","a4"),M=window.matchMedia?window.matchMedia("(max-width: 820px)").matches:!1,I=typeof navigator.deviceMemory=="number"&&navigator.deviceMemory<=4,D=M||I?1.5:2,j=x.length,J=794*1122*D*D,oe=Math.max(1,Math.min(4,Math.floor((M||I?8e6:16e6)/J))),Ce=Math.round(1122*D);for(let R=0;R<j;R+=oe){const ie=Math.min(oe,j-R);Jt(t==="as"?`PDF প্ৰস্তুত হৈ আছে (${R+1}/${j}), অনুগ্ৰহ কৰি অপেক্ষা কৰক...`:`Generating PDF (${R+1}/${j}), please wait...`),await new Promise(W=>setTimeout(W,0));const H=document.createElement("div");H.style.cssText="width:794px; background:#ffffff;";for(let W=0;W<ie;W++){const Z=S(x[R+W],R+W+1);Z.style.margin="0",H.appendChild(Z)}C.appendChild(H);let X;try{X=await window.html2canvas(H,{scale:D,useCORS:!0,allowTaint:!1,logging:!1,backgroundColor:"#ffffff"});const W=X.width;for(let Z=0;Z<ie;Z++){const Ue=Math.min(Ce,X.height-Z*Ce);if(Ue<=0)break;const me=document.createElement("canvas");me.width=W,me.height=Ue,me.getContext("2d").drawImage(X,0,Z*Ce,W,Ue,0,0,W,Ue);const to=me.toDataURL("image/jpeg",.9);me.width=0,me.height=0,R+Z>0&&E.addPage("a4","p"),E.addImage(to,"JPEG",0,0,210,297,void 0,"FAST")}}finally{X&&(X.width=0,X.height=0),X=null,H.parentNode&&H.remove()}}const Se=`${e.topic.id}-${t}.pdf`;let V=!1;const qe=window.AxoApp;if(qe&&typeof qe.savePdf=="function")try{const R=String(E.output("datauristring")||"");qe.savePdf(R.substring(R.indexOf(",")+1),Se),V=!0}catch(R){console.error("App PDF bridge failed:",R)}if(!V)if(Pa())B(t==="as"?"অ্যাপত PDF ছেভ কৰিব নোৱাৰি। Chrome ত axomexam.in খুলি ডাউনলোড কৰক।":"Can't save PDF inside the app. Open axomexam.in in Chrome and download there.");else{try{E.save(Se)}catch{const ie=E.output("bloburl"),H=document.createElement("a");H.href=ie,H.download=Se,H.rel="noopener",document.body.appendChild(H),H.click(),setTimeout(()=>{H.parentNode&&H.parentNode.removeChild(H),URL.revokeObjectURL(ie)},4e3)}B(t==="as"?"PDF ডাউনলোড সফল হ'ল!":"PDF downloaded successfully!")}}catch($){console.error("PDF generation failed:",$),B(t==="as"?"PDF বনাব পৰা নগ'ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।":"Failed to generate PDF. Please try again.")}finally{C.parentNode&&C.remove(),Xt(),u.isGeneratingPdf=!1}}async function Pn(e){const t=u.lang==="as";e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let a=[];try{a=await API.listDownloads()}catch{}e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${Je("page.downloads.title")}</span></nav>
        <h1>${Je("page.downloads.title")}</h1>
        <p class="page-desc">${d(Je("page.downloads.desc"))}</p>
      </div>

      <section class="section" style="padding-bottom:28px;">
        <div class="section-head" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <h2>${t?"বিষয়ভিত্তিক প্ৰশ্ন-উত্তৰ PDF টোকা":"Topic-wise Q&A PDF Notes"}</h2>
            <p class="sec-sub">${t?"প্ৰতিটো বিষয়ৰ সম্পূৰ্ণ দ্বিভাষিক প্ৰশ্ন আৰু উত্তৰ PDF ৰূপত ডাউনলোড কৰক।":"Download complete bilingual questions & answers for each topic in PDF format."}</p>
          </div>
          <div style="width:100%; max-width:320px; margin:0 auto; position:relative;">
            <input type="search" id="dl-search-input" placeholder="${t?"বিষয়ৰ নামেৰে PDF সন্ধান কৰক...":"Search PDF by topic name..."}" autocomplete="off" spellcheck="false"
                   style="width:100%; padding:9px 12px 9px 36px; border-radius:20px; border:1px solid var(--border,#cbd5e1); background:var(--bg,#ffffff); color:var(--ink,#0f172a); font-size:0.85rem; outline:none; box-sizing:border-box; box-shadow:0 1px 3px rgba(0,0,0,0.05);" />
            <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:var(--ink-soft,#64748b);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="dl-list" id="topic-pdf-list">
          ${u.topicIndex.map((o,l)=>`
            <div class="dl-item reveal topic-dl-card" data-title="${d(Oe(o.title))}" data-cat="${d(Oe(o.cat.name))}" data-delay="${l%12*30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${d(v(o.title))}</b>
                <span>${d(v(o.cat.name))}${o.sub?" • "+d(v(o.sub.name)):""} • <span id="dl-count-${o.path.replace(/\//g,"-")}">${o.nQuestions||0}</span> ${o.cat.id==="study-guides"?t?"অধ্যায়":"Chapters":t?"প্ৰশ্ন":"Questions"}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${d(o.path)}" type="button" style="text-transform:none;">${t?"ডাউনলোড":"Download"}</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${t?"মিল থকা PDF বিষয় পোৱা নগ'ল।":"No matching PDF topic found."}</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>${t?"বিশেষ ই-বুক আৰু হাতে লিখা টোকা":"Special E-Books & Hand-written Notes"}</h2><p class="sec-sub">${t?"প্ৰত্যক্ষ চৰকাৰী PDF আৰু নিৰ্বাচিত অধ্যয়ন সামগ্ৰী।":"Direct official PDFs and curated study materials."}</p></div></div>
        ${a.length?`
          <div class="dl-list">
            ${a.map(o=>`
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${d(o.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>${t?"PDF দস্তাবেজ":"PDF Document"}</span></span>
                <a class="dl-btn dl-save" href="${o.url}" download target="_blank" rel="noopener" style="text-transform:none;">${t?"ডাউনলোড":"Download"}</a>
              </div>`).join("")}
          </div>`:`<div class="info-panel"><p>${t?"এতিয়ালৈ কোনো অতিৰিক্ত PDF আপলোড কৰা নাই।":"No extra manual PDF uploaded yet."}</p></div>`}
      </section>`,P(".topic-pdf-btn",e).forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.path,c=u.topicMap[l];c&&qn(c)})});const n=g("#dl-search-input"),s=P(".topic-dl-card",e),i=g("#dl-no-match");n&&n.addEventListener("input",o=>{const l=N(o.target.value);let c=0;s.forEach(p=>{const h=N(p.dataset.title),f=N(p.dataset.cat);h.includes(l)||f.includes(l)?(p.style.display="",c++):p.style.display="none"}),i&&(i.style.display=c===0?"block":"none")}),L()}function ea(e){const t=e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(t||"")?t:"#4f46e5"}function k(e,t){if(e==null)return"";if(typeof e=="string")return e;const a=t||u.lang||"en";return e[a]&&String(e[a]).trim()?e[a]:e.en||e.as||""}function ta(e){if(e==null)return"";const t=String(e).split(`
`);let a="",n=!1;const s=()=>{n&&(a+="</ul>",n=!1)};return t.forEach(i=>{const o=(i||"").trim();if(!o){s();return}const l=o.match(/^[-•*]\s+(.*)$/);l?(n||(a+='<ul class="ebk-list">',n=!0),a+=`<li>${q(l[1])}</li>`):(s(),a+=`<p class="ebk-para">${q(o)}</p>`)}),s(),a}async function En(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let t=[];try{t=await API.listBooks()}catch{t=[]}const a=s=>{e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("ebooks.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${d(s||r("ebooks.empty"))}</p></div>`};if(!t.length)return a();const n=t.slice().sort((s,i)=>k(s.title,"en").localeCompare(k(i.title,"en")));e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.ebooks")}</span>
        </nav>
        <h1>${r("ebooks.title")}</h1>
        <p class="page-desc">${r("ebooks.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid">
          ${n.map((s,i)=>{const o=(s.chapters||[]).length,l=ea(s),c=k(s.title,"en"),p=k(s.subject,"en"),h=s.cover?String(s.cover):"",f=k(s.coverAlt,u.lang)||c+" e-book cover",m=h?`<img class="ebook-cover-img" src="${d(h)}" alt="${d(f)}" loading="lazy" decoding="async">`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
                  <span class="ebook-cover-top">
                    <span class="ebook-cover-publisher">axomexam</span>
                    <span class="ebook-cover-tag">E-Book</span>
                  </span>
                  <span class="ebook-cover-title">
                    <span class="ebk-tt-en">${d(c)}</span>
                  </span>
                  <span class="ebook-cover-subject">${d(p)}</span>`;return`
              <a class="ebook-card reveal" href="/ebooks/${encodeURIComponent(s.id)}" style="--ebk:${l}" data-delay="${i*60}">
                <span class="ebook-cover${h?" has-photo":""}">${m}</span>
                <span class="ebook-meta">
                  <b>${d(c)}</b>
                  <span class="ebook-meta-sub"><span>${o} ${r("ebooks.chapters")}</span></span>
                  <span class="ebook-read-btn">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
                    ${r("ebooks.readNow")}
                  </span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,L()}function Mn(e,t,a){const n=e.chapters||[],s=String(a||"ebk-ch").replace(/[^A-Za-z0-9_-]/g,""),i=n.map((l,c)=>`
      <a class="ebk-toc-item" href="#${s}-${c}">
        <span class="ebk-toc-no">${c+1}</span>
        <span>${d(k(l.title,t))}</span>
      </a>`).join(""),o=n.map((l,c)=>`
      <section class="ebk-chapter" id="${s}-${c}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${c+1}</span>${d(k(l.title,t))}</h3>
        <div class="ebk-ch-body">${ta(k(l.content,t))}</div>
      </section>`).join("");return`
      ${n.length>1?`<nav class="ebk-toc" aria-label="${d(r("ebooks.toc"))}"><h4>${r("ebooks.toc")}</h4>${i}</nav>`:""}
      <div class="ebk-chapters">${o}</div>`}let de=null;function _(){de||(de=requestAnimationFrame(Tn))}function Tn(){de=null;const e=document.getElementById("ebk-progress-fill");if(!e)return;const t=document.documentElement,a=t.scrollHeight-window.innerHeight,n=window.pageYOffset||t.scrollTop||0,s=a>0?Math.min(100,Math.max(0,n/a*100)):0;e.style.width=s.toFixed(2)+"%",e.parentElement.setAttribute("aria-valuenow",String(Math.round(s)))}function aa(){const e=document.getElementById("ebk-progress");e&&e.remove(),window.removeEventListener("scroll",_),window.removeEventListener("resize",_),de&&(cancelAnimationFrame(de),de=null)}function ne(e){aa();const t=document.createElement("div");t.id="ebk-progress",t.className="ebk-progress",t.setAttribute("role","progressbar"),t.setAttribute("aria-label",r("readProgress.label")||"Reading progress"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","100"),t.setAttribute("aria-valuenow","0"),e&&t.style.setProperty("--ebk",e);const a=document.createElement("span");a.id="ebk-progress-fill",t.appendChild(a),document.body.appendChild(t),window.addEventListener("scroll",_,{passive:!0}),window.addEventListener("resize",_),_()}async function Ln(e,t){const a=String(t||"").replace(/[^A-Za-z0-9_-]/g,"");if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,!a)return G(e);let n=null;try{n=await API.getBook(a)}catch{n=null}if(!n||!n.title||!(n.chapters&&n.chapters.length)){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("ebooks.empty")}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/ebooks">${r("ebooks.backToLib")}</a></div>
        </div>`;return}const s=n.chapters||[];let i=u.lang==="as"?"as":"en";const o=k(n.title,"en"),l=k(n.title,"as"),c=k(n.subject,"en"),p=k(n.subject,"as"),h=ea(n),f=l&&l!==o;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/ebooks">${r("nav.ebooks")}</a><span class="bc-sep">/</span>
          <span>${d(o)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${h};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(c)}${p&&p!==c?`<span class="ebk-chip-as"> ${d(p)}</span>`:""}</span>
            </div>
            <h2 class="ebk-head-title">${d(o)}${f?`<span class="ebk-head-title-as">${d(l)}</span>`:""}</h2>
            ${n.description?`<p class="ebk-desc">${d(v(n.description)).replace(/\n/g,"<br>")}</p>`:""}
            <div class="ebk-head-meta">
              ${n.author?`<span><b>${d(v(n.author))}</b></span>`:""}
              <span>${s.length} ${r("ebooks.chapters")}</span>
              ${n.updated?`<span>${r("ebooks.updated")}: ${d(n.updated)}</span>`:""}
            </div>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${i==="as"?"active":""}" data-ebklang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${i==="en"?"active":""}" data-ebklang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ebk-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/ebooks">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("ebooks.backToLib")}
          </a>
        </div>
      </div>`;const m=g("#ebk-body");m&&(m.innerHTML=["en","as"].map(x=>`<div data-axo-lang="${x}">${Mn(n,x,x==="en"?"ebk-ch":"ebk-ch-as")}</div>`).join("")),ne(h),P(".lang-btn",e).forEach(x=>{x.addEventListener("click",()=>{const y=x.dataset.ebklang;i!==y&&(i=y,u.lang=i,document.body.setAttribute("data-lang",i),P(".lang-btn",e).forEach(b=>b.classList.toggle("active",b.dataset.ebklang===i)),_())})})}const pe={syllabus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>',"elementary-mathematics":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/></svg>',"general-english":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>',"logical-reasoning":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',"assam-history-geography-culture":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/></svg>',"general-knowledge-current-affairs":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',default:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>'};function In(e){const t=e&&e.id||"";return pe[t]?pe[t]:e&&e.type==="syllabus"?pe.syllabus:pe.default}function U(e,t){const a=t&&t.color||e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(a||"")?a:"#4f46e5"}async function ue(){if(Array.isArray(u.exams))return u.exams;let e=[];try{e=await API.listExams()}catch{e=[]}return u.exams=Array.isArray(e)?e:[],u.exams}function Ne(e){return(u.exams||[]).find(t=>t.id===e)||null}function we(e){return!!(e&&e.status==="available"&&(e.sections||[]).length)}function na(e,t){return k(e&&e.coverAlt,t)||k(e&&e.title,t)||"Exam book cover"}function Dn(e,t){const a=U(e),n=k(e.title,"en"),s=k(e.title,"as"),i=k(e.subtitle,"en"),o=we(e),l=r(o?"exams.readNow":"exams.comingSoon"),c=N(n+" "+s+" "+i),p=e.cover?String(e.cover):"",h=o?"":`<span class="exam-soon-badge">${d(r("exams.comingSoon"))}</span>`,f=p?`<img class="ebook-cover-img" src="${d(p)}" alt="${d(na(e,u.lang))}" loading="lazy" decoding="async">${h}`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
          <span class="ebook-cover-top">
            <span class="ebook-cover-publisher">axomexam</span>
            <span class="ebook-cover-tag">${d(r(o?"nav.exams":"exams.comingSoon"))}</span>
          </span>
          <span class="ebook-cover-title">
            <span class="ebk-tt-en">${d(n)}</span>
            ${s&&s!==n?`<span class="ebk-tt-as">${d(s)}</span>`:""}
          </span>
          <span class="ebook-cover-subject">${d(i)}</span>
          ${h}`;return`
      <a class="ebook-card reveal exam-card ${o?"":"is-soon"}" href="/exams/${encodeURIComponent(e.id)}" style="--ebk:${a}" data-name="${d(c)}" data-delay="${t%8*50}">
        <span class="ebook-cover${p?" has-photo":""}">${f}</span>
        <span class="ebook-meta">
          <b>${d(n)}</b>
          <span class="ebook-meta-sub">${s&&s!==n?`<span class="ebk-tt-as">${d(s)}</span>`:`<span>${d(i)}</span>`}</span>
          <span class="ebook-read-btn">${d(l)}</span>
        </span>
      </a>`}const lt={trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>',award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',atom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.6c2.4.5 4 2.1 4 4.4"/></svg>',flower:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M12 16a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M2 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/><path d="M16 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/></svg>'};function Rn(e){const t=e&&e.icon||"";if(lt[t])return lt[t];if(typeof TOPIC_ICON_RULES<"u"){const a=(e&&e.id||"")+" "+(e&&e.title&&e.title.en||"");for(const[n,s]of TOPIC_ICON_RULES)if(n.test(a))return s}return typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG["current-affairs"]||lt.globe}function zn(e,t){const a=e.color||"#ef4444",n=k(e.title,"en"),s=k(e.title,"as");return`
      <a class="sub-card reveal exam-sec-card" href="/current-affairs/${encodeURIComponent(e.id)}" style="--cat:${a}" data-delay="${t%8*40}">
        <span class="sub-ico"><span class="cat-svg">${Rn(e)}</span></span>
        <span class="exam-sec-txt">
          <b>${d(n)}</b>
          ${s&&s!==n?`<span class="exam-sec-as">${d(s)}</span>`:""}
          <span class="exam-sec-count" data-ca-count="${d(e.id)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}async function Hn(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let t=[];try{t=await API.listCurrentAffairs()}catch{t=[]}Array.isArray(t)||(t=[]),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.currentAffairs")}</span>
        </nav>
        <h1>${r("ca.title")}</h1>
        <p class="page-desc">${r("ca.sub")}</p>
        <p class="exams-choose">${r("ca.choose")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        ${t.length?`<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">${t.map((a,n)=>zn(a,n)).join("")}</div>`:`<div class="qa-empty"><div class="big">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/></svg>
            </div><p>${d(r("ca.empty"))}</p></div>`}
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${d(r("ca.note"))}
        </p>
      </section>`,L(),oa(),ia()}async function jn(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let a=null,n=[];try{a=await API.getCurrentAffairsCategory(t)}catch{a=null}try{n=await API.listCurrentAffairsQuestions(t)}catch{n=[]}if(Array.isArray(n)||(n=[]),!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ca.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(r("ca.noCategory"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/current-affairs">${r("ca.back")}</a></div>
        </div>`;return}const s=a.color||"#ef4444",i=k(a.title,"en")||t,o=k(a.title,"as"),l=u.lang==="as"?"as":"en",c=n.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/current-affairs">${r("nav.currentAffairs")}</a><span class="bc-sep">/</span>
          <span>${d(i)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${s};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${r("nav.currentAffairs")}</span>
              <span class="ebk-chip">${r("ca.questions")}</span>
            </div>
            <h2 class="ebk-head-title">${d(i)}${o&&o!==i?`<span class="ebk-head-title-as">${d(o)}</span>`:""}</h2>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${r("ca.uploadedBy")}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${l==="as"?"active":""}" data-calang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${l==="en"?"active":""}" data-calang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ca-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/current-affairs">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("ca.back")}
          </a>
        </div>
      </div>`;const p=g("#ca-body"),h=a.updated||"",f=a.uploadedBy||"axomexam team";(()=>{if(!p)return;const x=["en","as"].map(w=>{const A=k(a.intro,w);return A?`<div data-axo-lang="${w}"><div class="ca-intro" style="margin:0 0 14px; padding:14px 16px; border-radius:14px; border:1px solid var(--border,#e2e8f0); background:linear-gradient(180deg, color-mix(in srgb, ${s} 9%, transparent), transparent); font-size:.92rem; line-height:1.65; color:var(--ink-soft,#334155); text-align:left;">${d(A)}</div></div>`:""}).join(""),y=["en","as"].map(w=>`
        <div data-axo-lang="${w}"><div class="ca-meta" style="display:flex; flex-wrap:wrap; gap:6px 18px; margin:0 0 18px; font-size:.78rem; color:var(--ink-muted,#64748b);">
          ${h?`<span><b>${w==="as"?"আপডেট":"Updated"}:</b> ${d(h)}</span>`:""}
          <span><b>${w==="as"?"আপলোড কৰিছে":"Uploaded by"}:</b> ${d(f)}</span>
        </div></div>`).join(""),b=c?ca(n,0,!0):`<div class="qa-empty"><p>${d(r("ca.noContent"))}</p></div>`;p.innerHTML=x+y+b})(),ne(s),P(".lang-btn",e).forEach(x=>{x.addEventListener("click",()=>{const y=x.dataset.calang;u.lang=y==="en"?"en":"as",document.body.setAttribute("data-lang",u.lang),P(".lang-btn",e).forEach(b=>b.classList.toggle("active",b.dataset.calang===u.lang)),_()})})}async function Bn(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;const t=await ue();if(!t.length){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("exams.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div><p>${d(r("exams.empty"))}</p></div>`;return}const a=t.slice().sort((o,l)=>{const c=we(o)?0:1,p=we(l)?0:1;return c!==p?c-p:k(o.title,"en").localeCompare(k(l.title,"en"))});e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.exams")}</span>
        </nav>
        <h1>${r("exams.title")}</h1>
        <p class="page-desc">${r("exams.sub")}</p>
        <p class="exams-choose">${r("exams.choose")}</p>
        <div class="exams-search-wrap">
          <svg class="exams-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="exam-search" type="search" autocomplete="off" spellcheck="false" placeholder="${d(r("exams.search.ph"))}" aria-label="${d(r("exams.search.ph"))}" />
        </div>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid" id="exams-grid">${a.map((o,l)=>Dn(o,l)).join("")}</div>
        <div id="exams-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${d(r("exams.noMatch"))}</p></div>
      </section>`;const n=g("#exam-search"),s=P(".exam-card",e),i=g("#exams-no-match");n&&n.addEventListener("input",()=>{const o=N(n.value);let l=0;s.forEach(c=>{const p=!o||(c.dataset.name||"").indexOf(o)!==-1;c.style.display=p?"":"none",p&&l++}),i&&(i.style.display=l?"none":"block")}),L()}function Fn(e,t,a){const n=U(e,t),s=k(t.title,"en"),i=k(t.title,"as"),o=t.type==="syllabus";return`
      <a class="sub-card reveal exam-sec-card" href="/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}" style="--cat:${n}" data-delay="${a%8*40}">
        <span class="sub-ico">${In(t)}</span>
        <span class="exam-sec-txt">
          <b>${d(s)}</b>
          ${i&&i!==s?`<span class="exam-sec-as">${d(i)}</span>`:""}
          ${o?"":`<span class="exam-sec-count" data-count-exam="${d(e.id)}" data-count-section="${d(t.id)}" hidden></span>`}
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function On(e){const t=(e&&e.id||"").toLowerCase(),a=String(k(e&&e.title,"en")||"").toLowerCase(),n=t+" "+a;if(typeof TOPIC_ICON_RULES<"u"){for(const[s,i]of TOPIC_ICON_RULES)if(s.test(n))return i}return pe.default}function sa(e,t,a,n,s){const i=U(e,t),o=k(a.title,"en"),l=k(a.title,"as"),c=`/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}/${s?encodeURIComponent(s)+"/":""}${encodeURIComponent(a.id)}`,p=s?`${s}/${a.id}`:a.id;return`
      <a class="sub-card reveal exam-sec-card" href="${c}" style="--cat:${i}" data-delay="${n%8*40}">
        <span class="sub-ico">${On(a)}</span>
        <span class="exam-sec-txt">
          <b>${d(o)}</b>
          ${l&&l!==o?`<span class="exam-sec-as">${d(l)}</span>`:""}
          <span class="exam-sec-count" data-count-exam="${d(e.id)}" data-count-section="${d(t.id)}" data-count-path="${d(p)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function Nn(e,t){let a=e||[],n=null;for(const s of t){if(n=a.find(i=>i&&i.id===s)||null,!n)return null;a=n.subcategories||[]}return n}async function ct(e,t,a,n){const s=n&&Array.isArray(n.subcategories)?n.subcategories:[];return s.length?(await Promise.all(s.map(l=>ct(e,t,a.concat(l.id),l)))).reduce((l,c)=>l+c,0):(await API.listExamQuestions(e,t,a[0],a[1])).length}async function dt(e,t){const a=Array.isArray(t.subcategories)?t.subcategories:[];if(a.length)return(await Promise.all(a.map(i=>ct(e,t.id,[i.id],i)))).reduce((i,o)=>i+o,0);const n=await API.getExamSection(e,t.id);return(n&&n.questions||[]).length}async function pt(e,t){if(!e||!t)return;const a=Array.from(e.querySelectorAll(".exam-sec-count")),n=u.counts&&u.counts.examSectionCounts;await Promise.all(a.map(async s=>{const i=s.dataset.countExam||t.id,o=s.dataset.countSection,l=(t.sections||[]).find(h=>h.id===o);if(!l||l.type==="syllabus")return;const c=s.dataset.countPath||"";if(n){const h=c?`${i}/${o}/${c}`:`${i}/${o}`;if(Object.prototype.hasOwnProperty.call(n,h)){const f=Number(n[h])||0;f>0&&(s.textContent=`${f} ${r("topic.questions")}`,s.hidden=!1);return}}let p=0;try{if(c){const h=c.split("/").filter(Boolean),f=Nn(l.subcategories||[],h);p=await ct(i,o,h,f)}else p=await dt(i,l)}catch{p=0}p>0&&(s.textContent=`${p} ${r("topic.questions")}`,s.hidden=!1)}))}async function Gn(e){if(!e)return 0;const t=u.counts&&u.counts.examSectionCounts;if(t){let s=0,i=!1;if(Object.keys(t).forEach(o=>{const l=o.split("/");if(l[0]!==e.id||l.length!==2)return;const c=(e.sections||[]).find(p=>p.id===l[1]);!c||c.type==="syllabus"||(i=!0,s+=Number(t[o])||0)}),i)return s}const a=(e.sections||[]).filter(s=>s.type!=="syllabus");return(await Promise.all(a.map(s=>dt(e.id,s).catch(()=>0)))).reduce((s,i)=>s+i,0)}async function _n(e,t){const a=e&&e.querySelector(".exam-book-total");if(!a)return;const n=await Gn(t);if(!n)return;const s=n.toLocaleString("en-IN");a.textContent=`${s} ${r("exams.totalQuestions")}`,a.hidden=!1}function ke(){const e=g("#stat-total-questions");if(e){const n=u.topicIndex.reduce((s,i)=>s+(i.nQuestions||0),0)+(u.examQuestionTotal||0)+(u.caQuestionTotal||0);e.textContent=`${n.toLocaleString()}+`}const t=g("#stat-total-pdfs");t&&(t.textContent=`${$t}+`);const a=g("#stat-total-topics");if(a){const n=u.topicsTotal||u.topicIndex.length;a.textContent=`${n.toLocaleString()}+`}}function Wn(){return u.counts&&typeof u.counts.examsTotal=="number"?(u.examQuestionTotal=u.counts.examsTotal,u.examTotalLoaded=!0,ke(),Promise.resolve(u.examQuestionTotal)):(u.examTotalPromise||(u.examTotalPromise=(async()=>{try{await ue();const e=(u.exams||[]).filter(a=>we(a));let t=0;for(const a of e){const n=Array.isArray(a.sections)?a.sections:[],s=await Promise.all(n.map(i=>!i||i.type==="syllabus"?Promise.resolve(0):dt(a.id,i).catch(()=>0)));t+=s.reduce((i,o)=>i+o,0),u.examQuestionTotal=t,ke()}u.examQuestionTotal=t,u.examTotalLoaded=!0}catch{}return ke(),u.examQuestionTotal})()),u.examTotalPromise)}function oa(){const e=u.caCounts||{};P(".exam-sec-count[data-ca-count]").forEach(t=>{const a=t.dataset.caCount;if(!a||!Object.prototype.hasOwnProperty.call(e,a))return;const n=Number(e[a])||0;n>0&&(t.textContent=`${n} ${r("topic.questions")}`,t.hidden=!1)})}function ia(){return u.caTotalPromise||(u.caTotalPromise=(async()=>{try{const e=await API.getCurrentAffairsCounts();u.caCounts=e&&e.counts||{},u.caQuestionTotal=e&&e.total||0,ke(),oa()}catch{}return u.caQuestionTotal})()),u.caTotalPromise}async function Qn(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await ue();const a=Ne(t);if(!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const n=U(a),s=k(a.title,"en"),i=k(a.title,"as"),o=k(a.subtitle,"en"),l=k(a.subtitle,"as");if(!we(a)){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <span>${d(s)}</span>
          </nav>
        </div>
        <div class="exam-soon-panel" style="--ebk:${n}">
          <span class="exam-soon-ico">${pe.default}</span>
          <h1>${d(s)}${i&&i!==s?` <span class="exam-soon-as">${d(i)}</span>`:""}</h1>
          ${o?`<p class="exam-soon-sub">${d(o)}</p>`:""}
          <span class="exam-soon-chip">${r("exams.comingSoon")}</span>
          <p class="exam-soon-msg">${d(r("exams.comingSoonMsg"))}</p>
          <a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a>
        </div>`;return}const p=a.sections||[],h=a.cover?String(a.cover):"",f=`${d(s)}${i&&i!==s?` <span class="exam-head-as">${d(i)}</span>`:""}`,m=`${d(o)}${l&&l!==o?` &bull; ${d(l)}`:""}`,x=`
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${d(s)}</span>`,y=h?`<div class="page-head">
          <nav class="breadcrumb">${x}</nav>
        </div>
        <section class="exam-cover-hero" style="--ebk:${n}">
          <div class="exam-cover-hero-media">
            <img src="${d(h)}" alt="${d(na(a,u.lang))}" width="912" height="1166" loading="eager" decoding="async">
          </div>
          <div class="exam-cover-hero-info">
            <h1>${f}</h1>
            <p class="page-desc">${m}</p>
            <p class="exam-book-total" hidden></p>
            <p class="exams-choose">${r("exams.subjects")}</p>
          </div>
        </section>`:`<div class="page-head">
          <nav class="breadcrumb">${x}</nav>
          <h1>${f}</h1>
          <p class="page-desc">${m}</p>
          <p class="exam-book-total" hidden></p>
          <p class="exams-choose">${r("exams.subjects")}</p>
        </div>`;e.innerHTML=`
      ${y}
      <section class="section" style="padding-bottom:46px;">
        <div class="sub-grid exam-sec-grid" style="--cat:${n}">
          ${p.map((b,w)=>Fn(a,b,w)).join("")}
        </div>
      </section>`,L(),pt(e,a),_n(e,a)}function ra(e,t){const a=F(e,t);return a.length?`
      <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
        ${a.map((n,s)=>`
          <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
            <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+s)})</b>
            <span style="flex:1; line-height:1.4;">${q(n)}</span>
          </div>
        `).join("")}
      </div>`:""}function Yn(e,t,a){const n=String(a||"").replace(/<[^>]+>/g,"").trim();if(n){const i=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(n);if(!i)return a;const o=F(e,t),l=i[1].toLowerCase().charCodeAt(0)-97;return o[l]===void 0||o[l]===""?a:`${i[1].toUpperCase()}) ${o[l]}`}const s=le(e);if(s&&s.length){const i=e&&e.correct!==void 0?e.correct:e?e.answer:void 0;if(Number.isInteger(i)){if(i>=0&&i<s.length)return s[i].letter||String.fromCharCode(65+i)}else if(typeof i=="string"){const o=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(i.trim());if(o)return o[1].toUpperCase()}}return a}function la(e,t,a,n){const s=n?"":k(e.category,a),i=T(e,"question",a),o=Yn(e,a,T(e,"answer",a)),l=T(e,"explanation",a),c=re(e),p=le(e),h=e.a&&typeof e.a=="object"&&e.a[a]||e.a||e.answer,f=Array.isArray(h)||o.includes("qa-step-line"),m=s?`<span style="display:block; margin-bottom:4px; font-size:.68rem; font-weight:800; letter-spacing:.4px; text-transform:uppercase; color:var(--ebk,#4f46e5);">${d(s)}</span>`:"";return f?`
        <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
          <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
            ${m}${t}. ${q(i)}
          </div>
          ${c}
          ${p?K(e,{compact:!0}):ra(e,a)}
          <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
            <div class="a-body" style="margin:0; padding:0; text-align:left;">${o}</div>
            ${l?`
              <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${l}
              </div>`:""}
          </div>
        </article>`:`
      <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
        <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
          <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${t}</span>
          <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${m}${q(i)}</span>
        </div>
        ${c}
        ${p?K(e):ra(e,a)}
        ${o?`<div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
          <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${r("topic.answer")}:</span>
          <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${q(o)}</span>
        </div>`:""}
        ${l?`
          <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
            <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${q(l)}
          </div>`:""}
      </article>`}function ca(e,t,a){const n=Array.isArray(e)?e:[],s=Number.isInteger(t)?t:0;return`<div class="qa-list">${n.map((i,o)=>["en","as"].map(l=>`<div data-axo-lang="${l}">${la(i,s+o+1,l,!!a)}</div>`).join("")).join("")}</div>`}function ut(e,t,a){const n=Array.isArray(t)?t:[];return()=>{if(e){if(!n.length){e.innerHTML=a||`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`;return}e.innerHTML=ca(n,0,!1)}}}function Un(e,t,a,n){const s=e.type||t&&t.type||"qa",i=String(n||"exam-ch").replace(/[^A-Za-z0-9_-]/g,"");if(s==="syllabus"||e.chapters&&e.chapters.length){const l=e.chapters||[];return l.length?`<div class="ebk-chapters">${l.map((c,p)=>`
        <section class="ebk-chapter" id="${i}-${p}">
          <h3 class="ebk-ch-title"><span class="ebk-ch-no">${p+1}</span>${d(k(c.title,a))}</h3>
          <div class="ebk-ch-body">${ta(k(c.content,a))}</div>
        </section>`).join("")}</div>`:`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`}const o=Array.isArray(e.questions)?e.questions:[];return o.length?`<div class="qa-list">${o.map((l,c)=>la(l,c+1,a)).join("")}</div>`:`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`}function Vn(e,t){return["en","as"].map(a=>`<div data-axo-lang="${a}">${Un(e,t,a,a==="en"?"exam-ch":"exam-ch-as")}</div>`).join("")}async function Kn(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await ue();const n=Ne(t),s=n?(n.sections||[]).find(S=>S.id===a):null;if(!n||!s){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const i=Array.isArray(s.subcategories)?s.subcategories:[];if(i.length){const S=U(n,s),$=k(n.title,"en"),E=k(s.title,"en"),M=k(s.title,"as");e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d($)}</a><span class="bc-sep">/</span>
            <span>${d(E)}</span>
          </nav>
          <h1>${d(E)}${M&&M!==E?` <span class="exam-head-as">${d(M)}</span>`:""}</h1>
          <p class="exams-choose">${r("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${S}">
            ${i.map((I,D)=>sa(n,s,I,D)).join("")}
          </div>
        </section>`,L(),pt(e,n);return}let o=null;try{o=await API.getExamSection(t,a)}catch{o=null}const l=U(n,s),c=k(n.title,"en"),p=k(s.title,"en");if(!o){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d(c)}</a><span class="bc-sep">/</span>
            <span>${d(p)}</span>
          </nav>
          <h1>${d(p)}</h1>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${d(r("exams.noContent"))}</p>
        <div style="margin-top:16px;"><a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">${r("exams.backToExams")}</a></div></div>`;return}const h=u.lang==="as"?"as":"en",f=k(o.title,"en")||p,m=k(o.title,"as")||k(s.title,"as"),x=v(o.description),y=(o.type||s.type)==="syllabus";e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(c)}</a><span class="bc-sep">/</span>
          <span>${d(f)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${l};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(c)}</span>
              <span class="ebk-chip">${d(r(y?"exams.syllabus":"exams.questions"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(f)}${m&&m!==f?`<span class="ebk-head-title-as">${d(m)}</span>`:""}</h2>
            ${x?`<p class="ebk-desc">${d(x).replace(/\n/g,"<br>")}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${h==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${h==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("exams.backToExams")}
          </a>
        </div>
      </div>`;const b=g("#exam-body");((o.type||s&&s.type)==="syllabus"||o.chapters&&o.chapters.length?()=>{b&&(b.innerHTML=Vn(o,s))}:ut(b,Array.isArray(o.questions)?o.questions:[],`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`))(),ne(l),P(".lang-btn",e).forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.exlang;u.lang=$,document.body.setAttribute("data-lang",$),Array.from(e.querySelectorAll(".lang-btn")).forEach(E=>E.classList.toggle("active",E.dataset.exlang===$)),_()})})}async function Jn(e,t,a,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await ue();const s=Ne(t),i=s?(s.sections||[]).find(S=>S.id===a):null,o=i?(i.subcategories||[]).find(S=>S.id===n):null;if(!s||!i||!o){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const l=Array.isArray(o.subcategories)?o.subcategories:[];if(l.length){const S=U(s,i),$=k(s.title,"en"),E=k(i.title,"en"),M=k(o.title,"en"),I=k(o.title,"as"),D=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d($)}</a><span class="bc-sep">/</span>
            <a href="${D}">${d(E)}</a><span class="bc-sep">/</span>
            <span>${d(M)}</span>
          </nav>
          <h1>${d(M)}${I&&I!==M?` <span class="exam-head-as">${d(I)}</span>`:""}</h1>
          <p class="exams-choose">${r("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${S}">
            ${l.map((j,J)=>sa(s,i,j,J,o.id)).join("")}
          </div>
        </section>`,L(),pt(e,s);return}const c=U(s,i),p=k(s.title,"en"),h=k(i.title,"en"),f=k(o.title,"en"),m=k(o.title,"as"),x=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;let y=[];try{y=await API.listExamQuestions(t,a,n)}catch{y=[]}Array.isArray(y)||(y=[]);const b=u.lang==="as"?"as":"en",w=y.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(p)}</a><span class="bc-sep">/</span>
          <a href="${x}">${d(h)}</a><span class="bc-sep">/</span>
          <span>${d(f)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${c};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(p)}</span>
              <span class="ebk-chip">${d(r("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(f)}${m&&m!==f?`<span class="ebk-head-title-as">${d(m)}</span>`:""}</h2>
            ${w?`<p class="ebk-desc">${w} ${d(r("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${b==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${b==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${x}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("exams.backToSection")}
          </a>
        </div>
      </div>`;const A=g("#exam-body");ut(A,y,`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`)(),ne(c),P(".lang-btn",e).forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.exlang;u.lang=$,document.body.setAttribute("data-lang",$),Array.from(e.querySelectorAll(".lang-btn")).forEach(E=>E.classList.toggle("active",E.dataset.exlang===$)),_()})})}async function Xn(e,t,a,n,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await ue();const i=Ne(t),o=i?(i.sections||[]).find(M=>M.id===a):null,l=o?(o.subcategories||[]).find(M=>M.id===n):null,c=l?(l.subcategories||[]).find(M=>M.id===s):null;if(!i||!o||!l||!c){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const p=U(i,o),h=k(i.title,"en"),f=k(o.title,"en"),m=k(l.title,"en"),x=k(c.title,"en"),y=k(c.title,"as"),b=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`,w=`${b}/${encodeURIComponent(n)}`;let A=[];try{A=await API.listExamQuestions(t,a,n,s)}catch{A=[]}Array.isArray(A)||(A=[]);const C=u.lang==="as"?"as":"en",S=A.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(h)}</a><span class="bc-sep">/</span>
          <a href="${b}">${d(f)}</a><span class="bc-sep">/</span>
          <a href="${w}">${d(m)}</a><span class="bc-sep">/</span>
          <span>${d(x)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${p};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(h)}</span>
              <span class="ebk-chip">${d(r("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(x)}${y&&y!==x?`<span class="ebk-head-title-as">${d(y)}</span>`:""}</h2>
            ${S?`<p class="ebk-desc">${S} ${d(r("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${C==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${C==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${w}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${d(r("exams.backToSection"))}
          </a>
        </div>
      </div>`;const $=g("#exam-body");ut($,A,`<div class="qa-empty"><p>${d(r("exams.noContent"))}</p></div>`)(),ne(p),P(".lang-btn",e).forEach(M=>{M.addEventListener("click",()=>{const I=M.dataset.exlang;u.lang=I,document.body.setAttribute("data-lang",I),Array.from(e.querySelectorAll(".lang-btn")).forEach(D=>D.classList.toggle("active",D.dataset.exlang===I)),_()})})}function Zn(e){const t=u.lang==="as",n=(t?[["সকলো মক টেষ্ট","অধ্যায়ভিত্তিক সময়সীমাযুক্ত মক টেষ্ট, তাৎক্ষণিক স্ক'ৰ আৰু পৰ্যালোচনাৰ সৈতে — প্ৰকৃত পৰীক্ষাৰ দৰেই।"],["দ্বিভাষিক প্ৰশ্ন-উত্তৰ অনুশীলন","ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা।"],["য'ত-ত'ত ই-বুক","এপৰ ভিতৰতে প্ৰতিটো বিষয়ৰ ই-বুক পঢ়ক — অসমৰ ইতিহাস, ৰাজনীতি, ভূগোল আৰু অধিক।"],["পূৰ্ববৰ্তী বছৰৰ প্ৰশ্নপত্ৰ","পৰীক্ষা আৰু বছৰ অনুসৰি সজোৱা সমাধানসহ পূৰ্ববৰ্তী প্ৰশ্নপত্ৰ।"],["PDF টোকা আৰু ডাউনল'ড","অধ্যয়ন সামগ্ৰী সংৰক্ষণ কৰি অফলাইন পুনৰীক্ষণৰ বাবে সাজু ৰাখক।"],["হালধীয়া আৰু দ্ৰুত","সম্পূৰ্ণ axomexam অভিজ্ঞতা এক সৰু ১.৩২ MB এপত।"]]:[["All Mock Tests","Timed chapter-wise mock tests with instant score and review, exactly like the real exam."],["Bilingual Q&A Practice","Practice questions, answers and explanations in both English and Assamese."],["E-Books On the Go","Read every subject e-book right inside the app — Assam History, Polity, Geography and more."],["Previous Year Papers","Solved past papers organised by exam and year for focused revision."],["PDF Notes & Downloads","Save study material and keep it ready for offline revision."],["Lightweight & Fast","The complete axomexam experience in a compact 1.32 MB app."]]).map(([l,c])=>`
        <div class="appdl-feature">
          <span class="appdl-ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
          <h3>${l}</h3>
          <p>${c}</p>
        </div>`).join(""),i=(t?[["axomexam এপ বিনামূলীয়া নেকি?","হয়। এপটো ১০০% বিনামূলীয়া, কোনো ছাইন-আপ, চাবোন বা লুকুৱা শুল্ক নাই।"],["ইয়াক Google Play Store ত কিয় নাই?","প্ৰতিজন প্ৰাৰ্থীৰ বাবে বিনামূলীয়া ৰাখিবলৈ আমি এপটো প্ৰত্যক্ষ APK ডাউনল'ড হিচাপে বিতৰণ কৰোঁ। পিছত Play Store ত মুকলি কৰিব পাৰি।"],["ইণ্টাৰনেট সংযোগ লাগে নেকি?","হয়। অধ্যয়ন সামগ্ৰী, মক টেষ্ট আৰু টোকা অনলাইনত ল'ড হয়, গতিকে সক্ৰিয় সংযোগ প্ৰয়োজন।"],["ইনষ্টল কৰা নিৰাপদ নেকি?","হয়। এইটো আমাৰ নিজা চৰকাৰী বিল্ড। সুৰক্ষাৰ বাবে কেৱল এই পৃষ্ঠাৰ পৰা (axomexam.in) ডাউনল'ড কৰক।"],["কোনবোৰ Android সংস্কৰণ সমৰ্থিত?","এপটো শেহতীয়া Android System WebView থকা আধুনিক Android ফোনত কাম কৰে।"]]:[["Is the axomexam app free?","Yes. The app is 100% free with no sign-up, subscription or hidden charges."],["Why is it not on the Google Play Store?","We distribute the app as a direct APK download so it stays free for every aspirant. A Play Store release may come later."],["Do I need an internet connection?","Yes. Study content, mock tests and notes are loaded online, so an active connection is required."],["Is it safe to install?","Yes. This is our own official build. For your safety, download it only from this page (axomexam.in)."],["Which Android versions are supported?","The app works on modern Android phones with an up-to-date Android System WebView."]]).map(([l,c])=>`
        <details class="appdl-faq">
          <summary>${l}</summary>
          <p>${c}</p>
        </details>`).join("");e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${t?"এপ ডাউনলোড":"Download App"}</span></nav>
        <h1>${t?"axomexam এপ ডাউনলোড কৰক":"Download the axomexam App"}</h1>
        <p class="page-desc">${t?"axomexam Android এপ লাভ কৰক — সকলো মক টেষ্ট, দ্বিভাষিক প্ৰশ্ন-উত্তৰ অনুশীলন, ই-বুক আৰু পূৰ্ববৰ্তী বছৰৰ প্ৰশ্নপত্ৰ এক হালধীয়া এপত। বিনামূলীয়া, ছাইন-আপ নালাগে।":"Get the axomexam Android app — all mock tests, bilingual Q&amp;A practice, e-books and previous year papers in one lightweight app. Free, no sign-up."}</p>
      </div>

      <section class="section appdl-hero">
        <div class="appdl-card">
          <img class="appdl-logo" src="/app/axomexam-icon.png" alt="axomexam app logo" width="104" height="104" />
          <div class="appdl-body">
            <h2 class="appdl-title">axomexam — Exam Prep App</h2>
            <p class="appdl-tag">${t?"অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি, এতিয়া আপোনাৰ ফোনত।":"Assam competitive exam preparation, now on your phone."}</p>
            <ul class="appdl-meta">
              <li><b>${t?"সংস্কৰণ":"Version"}</b> 2.1</li>
              <li><b>${t?"আকাৰ":"Size"}</b> 1.32 MB</li>
              <li><b>${t?"আপডেট":"Updated"}</b> ${t?"১৭ অক্টোবৰ ২০২৬":"17 Oct 2026"}</li>
              <li><b>${t?"ফৰ্মেট":"Format"}</b> APK</li>
              <li><b>${t?"পেকেজ":"Package"}</b> in.axomexam.app</li>
              <li><b>${t?"মূল্য":"Price"}</b> ${t?"বিনামূলীয়া":"Free"}</li>
            </ul>
            <div class="appdl-actions">
              <a class="btn btn-accent appdl-download" href="/app/axomexam-v2.1.apk" download>${t?"APK ডাউনলোড কৰক (1.32 MB)":"Download APK (1.32 MB)"}</a>
              <a class="btn btn-outline" href="#install">${t?"কেনেকৈ ইনষ্টল কৰিব":"How to install"}</a>
            </div>
            <p class="appdl-note">${t?"প্ৰত্যক্ষ ডাউনল'ড · ছাইন-আপ নালাগে · ১০০% বিনামূলীয়া":"Direct download · No sign-up · 100% free"}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${t?"এপৰ ভিতৰত কি আছে":"What's inside the app"}</h2>
        <div class="appdl-grid">${n}</div>
      </section>

      <section class="section" id="install">
        <h2 class="appdl-section-title">${t?"APK কেনেকৈ ইনষ্টল কৰিব":"How to install the APK"}</h2>
        <ol class="appdl-steps">
          ${t?`<li><b>APK ডাউনলোড কৰক।</b> ওপৰৰ ডাউনলোড বুটামত টিপক। <code>axomexam-v2.1.apk</code> ফাইলটো আপোনাৰ ফোনত সংৰক্ষিত হ'ব।</li>
          <li><b>ইনষ্টলৰ অনুমতি দিয়ক।</b> Android এ বাধা দিলে, Settings খুলি আপোনাৰ ব্ৰাউজাৰৰ বাবে “Install unknown apps” (বা “Unknown sources”) সক্ৰিয় কৰক।</li>
          <li><b>এপটো ইনষ্টল কৰক।</b> ডাউনল'ড কৰা ফাইলটো Downloads বা জাননীৰ পৰা খুলি <b>Install</b> টিপক।</li>
          <li><b>খুলি শিকা আৰম্ভ কৰক।</b> আপোনাৰ এপ ড্ৰয়াৰৰ পৰা <b>axomexam</b> আৰম্ভ কৰি অনুশীলন আৰম্ভ কৰক।</li>`:`<li><b>Download the APK.</b> Tap the Download button above. The file <code>axomexam-v2.1.apk</code> will be saved to your phone.</li>
          <li><b>Allow the install.</b> If Android blocks it, open Settings and enable “Install unknown apps” (or “Unknown sources”) for your browser.</li>
          <li><b>Install the app.</b> Open the downloaded file from Downloads or the notification, then tap <b>Install</b>.</li>
          <li><b>Open and start learning.</b> Launch <b>axomexam</b> from your app drawer and begin practising.</li>`}
        </ol>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${t?"ছিষ্টেমৰ প্ৰয়োজনীয়তা":"System requirements"}</h2>
        <ul class="appdl-meta">
          <li><b>${t?"প্লেটফৰ্ম":"Platform"}</b> Android</li>
          <li><b>${t?"এপ সংস্কৰণ":"App version"}</b> 2.1</li>
          <li><b>${t?"ফাইলৰ আকাৰ":"File size"}</b> 1.32 MB</li>
          <li><b>${t?"ইণ্টাৰনেট":"Internet"}</b> ${t?"প্ৰয়োজন":"Required"}</li>
          <li><b>${t?"মূল্য":"Price"}</b> ${t?"বিনামূলীয়া":"Free"}</li>
        </ul>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">${t?"প্ৰায়ে সোধা প্ৰশ্ন":"Frequently asked questions"}</h2>
        <div class="appdl-faqs">${i}</div>
      </section>

      <section class="section">
        <div class="appdl-safety">
          ${t?"<b>সুৰক্ষা আৰু দায়মুক্তি:</b> আপোনাৰ সুৰক্ষাৰ বাবে কেৱল এই চৰকাৰী পৃষ্ঠাৰ পৰা (axomexam.in) এপটো ডাউনল'ড কৰক। axomexam APSC, অসম আৰক্ষী, SSC, ৰে'লৱে, ADRE বা কোনো চৰকাৰী সংস্থাৰ চৰকাৰী এপ <b>নহয়</b>। সকলো পৰীক্ষাৰ নাম আৰু ট্ৰেডমাৰ্ক তেওঁলোকৰ নিজৰ মালিকৰ। এইটো এক স্বতন্ত্ৰ অধ্যয়ন সহায়ক।":"<b>Safety &amp; disclaimer:</b> For your security, download the app only from this official page (axomexam.in). axomexam is NOT an official app of APSC, Assam Police, SSC, Railway, ADRE or any government body. All exam names and trademarks belong to their respective owners. This is an independent study aid."}
        </div>
      </section>`;const o=e.querySelector(".appdl-download");o&&o.addEventListener("click",Xs),L()}async function es(e,t){if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,t.length===1)return as(e);const a=(typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[]).find(l=>l.id===t[1]);if(!a)return G(e);const n=Array.isArray(a.children)?a.children:[];if(n.length>0){if(t.length===2)return ts(e,a,n);const l=n.find(h=>h.id===t[2]);if(!l)return G(e);if(t.length===3){const h=await API.listPreviousYearYears(a.id,l.id);return da(e,l,h,a)}const c=t[3],p=await API.listPreviousYearPdfs(a.id,c,l.id);return pa(e,l,c,p,a)}if(t.length===2){const l=await API.listPreviousYearYears(a.id);return da(e,a,l)}const i=t[2],o=await API.listPreviousYearPdfs(a.id,i);pa(e,a,i,o)}function ts(e,t,a){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${r("pyear.chooseSection.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="section-head"><div><h2>${r("pyear.chooseSection")}</h2></div></div>
        <div class="sub-grid">
          ${a.map((n,s)=>`
            <a class="sub-card reveal" href="/previous-year/${t.id}/${n.id}" style="--cat:${n.color||t.color}" data-delay="${s*40}">
              <span class="sub-ico">${d(n.icon||n.id.slice(0,2).toUpperCase())}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(v(n.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.years")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,L(),O(e,{id:t.id,name:v(t.name)+" Previous Year Papers",count:a.length,h2:v(t.name)+" Previous Year Question Papers",items:a.map(n=>({name:v(n.name),count:0}))})}function as(e){const t=typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("page.previous-year.title")}</span></nav>
        <h1>${r("page.previous-year.title")}</h1>
        <p class="page-desc">${r("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${t.length?`
          <div class="section-head"><div><h2>${r("pyear.choose")}</h2><p class="sec-sub">${r("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${t.map((a,n)=>`
              <a class="sub-card reveal" href="/previous-year/${a.id}" style="--cat:${a.color}" data-delay="${n*40}">
                <span class="sub-ico">${d(a.icon||a.id.slice(0,2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(v(a.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${r("downloads.none")}</p></div>`}
      </section>`,L(),O(e,{name:"Previous Year Question Papers",noDefaults:!0,h2:"Previous Year Question Papers for Assam and Central Exams",info:"Solving previous year papers is the fastest way to understand the real difficulty of an examination. On this page you can download original question papers year by year for Assam Police, DHS and DME, Guwahati High Court, Railway and SSC recruitment. Use them to identify repeated topics, judge the weight of each section and plan your revision with evidence rather than guesswork.",items:t.map(a=>({name:v(a.name),count:0})),tips:["Attempt the paper once under a timer without looking at any notes.","Compare your answers with the official key and list every repeated topic.","Shortlist the two or three sections where you lost the most marks.","Reattempt the same paper after two weeks to confirm real improvement."],faqs:[{q:"Are these the original previous year question papers?",a:"Yes. Each PDF is a compiled question paper for the mentioned exam and year, provided for practice and revision."},{q:"Can I download the papers for offline practice?",a:"Yes. Every paper can be downloaded as a PDF and used on a mobile or printed copy for offline practice."},{q:"Do previous year papers repeat in the actual exam?",a:"Exact questions rarely repeat, but the topics, difficulty level and question style repeat often. That is why solving them is so useful."}]})}function da(e,t,a,n){const s=n?`<a href="/previous-year/${n.id}">${d(v(n.name))}</a><span class="bc-sep">/</span>`:"";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${s}
          <span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${r("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((i,o)=>`
              <a class="sub-card reveal" href="/previous-year/${n?n.id+"/":""}${t.id}/${i}" style="--cat:${t.color}" data-delay="${o*50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(i)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${r("pyear.noYears")}</p></div>`}
      </section>`,L(),O(e,{id:t.id,name:v(t.name)+" previous year papers",count:a.length,h2:v(t.name)+" Previous Year Papers by Year",items:a.map(i=>({name:String(i),count:0}))})}function pa(e,t,a,n,s){const i=s?`/previous-year/${s.id}/${t.id}`:`/previous-year/${t.id}`,o=s?`<a href="/previous-year/${s.id}">${d(v(s.name))}</a><span class="bc-sep">/</span>`:"",l=c=>`
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${d(c.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>${d(v(t.name))} • ${d(a)}</span></span>
        <a class="dl-btn dl-save" href="${c.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${o}
          <a href="${i}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <span>${d(a)}</span>
        </nav>
        <h1>${d(v(t.name))} — ${d(a)}</h1>
        <p class="page-desc">${r("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${n.length?`<div class="dl-list">${n.map(l).join("")}</div>`:`<div class="info-panel"><p>${r("pyear.none")}</p></div>`}
      </section>`,O(e,{id:t.id,name:v(t.name)+" "+a+" question paper",count:n.length,h2:v(t.name)+" "+a+" Question Paper",items:n.map(c=>({name:c.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "),count:0})),faqs:[{q:"Is the "+v(t.name)+" "+a+" paper a solved or unsolved paper?",a:"The PDF contains the question paper for practice. Attempt it first, then cross-check your answers with the relevant answer key or study notes on axomexam.in."},{q:"Can I download the "+v(t.name)+" "+a+" paper?",a:"Yes. Use the download button beside the paper to save the PDF for offline practice."}]})}function ns(e){const t=u.lang==="as";e.innerHTML=`
      <div class="success-modal-overlay" id="successPopup" style="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(5px);display:none;place-items:center;z-index:99999;opacity:0;transition:opacity 0.2s ease;">
        <div class="success-modal-card" style="background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:24px;padding:30px 24px;width:82%;max-width:300px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);border:1px solid var(--line,#e2e8f0);">
          <div class="tick-circle" style="width:68px;height:68px;background:#10b981;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px -4px rgba(16,185,129,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 id="pop-title" style="font-size:1.25rem;font-weight:800;color:var(--ink,#0f172a);margin-bottom:4px;">${t?"সফলতাৰে প্ৰেৰণ হ'ল!":"Sent Successfully!"}</h3>
          <p id="pop-desc" style="font-size:0.84rem;color:var(--ink-soft,#64748b);font-weight:600;">${t?"আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।":"Your message has been received."}</p>
        </div>
      </div>

      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${t?"প্ৰশ্ন আগবঢ়াওক":"Submit Q&A"}</span></nav>
        <h1>${t?"প্ৰশ্ন আগবঢ়াওক":"Submit Q&A"}</h1>
      </div>

      <section class="section axo-main-content" data-axo-main-content="1" style="padding-bottom:24px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          ${t?`<h2 style="margin-top:0; color:var(--ink,#0f172a);">axomexam লৈ প্ৰশ্ন আগবঢ়াওক</h2>
          <p>axomexam এ পঢ়ুৱৈসকলে পঠিওৱা অনুশীলন প্ৰশ্ন গ্ৰহণ কৰে, সেই অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাসমূহৰ বাবে যিবোৰ ইয়াৰ পৰিসৰত আছে। প্ৰকাশৰ আগতে জমা দিয়া প্ৰশ্ন পৰ্যালোচনা কৰা হয়, গতিকে প্ৰশ্ন-সংগ্ৰহত একে মানদণ্ড বজাই ৰখা হয় আৰু প্ৰতিটো প্ৰকাশিত প্ৰশ্নৰ সৈতে উত্তৰ আৰু এটা ব্যাখ্যা থাকে।</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">কি পঠিয়াব</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>প্ৰশ্নৰ লিখনি, অনুগ্ৰহ কৰি অসমীয়া সংস্কৰণটো লগত ৰাখি।</li>
            <li>চাৰিটা বিকল্প, শুদ্ধ বিকল্পটো স্পষ্টভাৱে চিহ্নিত কৰি।</li>
            <li>কিয় সেই বিকল্পটো শুদ্ধ তাৰ এটা চুটি ব্যাখ্যা।</li>
            <li>প্ৰশ্নটো যি পৰীক্ষা আৰু বিষয়ৰ, তাৰ নাম।</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">ইয়াৰ পিছত কি হয়</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>মানক প্ৰসংগ সামগ্ৰীৰ সৈতে মিলাই জমা দিয়া প্ৰশ্নৰ শুদ্ধতা পৰীক্ষা কৰা হয়।</li>
            <li>গ্ৰহণ কৰা প্ৰশ্নসমূহ মিল থকা বিষয় বা পৰীক্ষাৰ শিতানত যোগ কৰা হয়।</li>
            <li>শুধৰণিৰ প্ৰয়োজন থকা প্ৰশ্ন এটা টোকাসহ ঘূৰাই দিয়া হয়।</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">এটা ভাল প্ৰশ্ন লিখা</h3>
          <p>এটা উপযোগী অনুশীলন প্ৰশ্নই এটা স্পষ্ট তথ্য বা এটা স্পষ্ট পদক্ষেপ পৰীক্ষা কৰে, আৰু ভুল বিকল্পসমূহ স্পষ্টভাৱে ভুল নহৈ যুক্তিসংগত হোৱা উচিত। এটা তথ্যত সংখ্যা, তাৰিখ বা নাম থাকিলে, পঠিওৱাৰ আগতে মানক প্ৰসংগৰ সৈতে মিলাই চাওক, আৰু কোনটো প্ৰসংগ ব্যৱহাৰ কৰিলে তাক কওক। দুয়োটা ভাষাত লিখা একে প্ৰশ্ন বিশেষভাৱে স্বাগতম, কাৰণ ইয়াক অসমীয়া আৰু ইংৰাজী পৃষ্ঠাত একেলগে প্ৰকাশ কৰিব পাৰি।</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">সংশোধন</h3>
          <p>প্ৰকাশিত প্ৰশ্নত ভুল দেখা পাইলে, পৃষ্ঠাৰ লিংক আৰু সংশোধন যোগাযোগ ফৰ্মৰ জৰিয়তে পঠিয়াওক। সংশোধনসমূহ নতুন প্ৰশ্নৰ দৰেই পৰীক্ষা কৰা হয় আৰু সাধাৰণতে কেইদিনমানৰ ভিতৰত প্ৰয়োগ কৰা হয়।</p>`:`<h2 style="margin-top:0; color:var(--ink,#0f172a);">Contributing questions to axomexam</h2>
          <p>axomexam accepts reader-submitted practice questions for the Assam competitive exams it covers. A submission is reviewed before it is published, so the question bank keeps a consistent standard and every published question carries an answer and an explanation.</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What to send</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>The question text, ideally with the Assamese version alongside it.</li>
            <li>Four options with the correct one clearly marked.</li>
            <li>A short explanation of why that option is correct.</li>
            <li>The exam and subject the question belongs to.</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">What happens next</h3>
          <ul style="margin:8px 0 0 20px; line-height:1.9;">
            <li>The submission is checked for accuracy against standard reference material.</li>
            <li>Accepted questions are added to the matching topic or exam section.</li>
            <li>Questions that need correction are returned with a note.</li>
          </ul>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Writing a good question</h3>
          <p>A useful practice question tests one clear fact or one clear step, and the wrong options should be plausible rather than obviously wrong. Where a fact has a number, a date or a name, check it against a standard reference before sending it, and say which reference you used. The same question written in both languages is especially welcome, because it can be published to the Assamese and English versions of the page together.</p>
          <h3 style="color:var(--ink,#0f172a); margin-top:22px;">Corrections</h3>
          <p>If you spot a mistake in a published question, send the page link and the correction through the contact form. Corrections are checked the same way as new questions and are usually applied within a few days.</p>`}
        </div>
      </section>

      <div class="form-wrapper" style="width:100%;max-width:540px;margin:20px auto 40px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:20px;border:1px solid var(--line,#e2e8f0);box-shadow:var(--card-shadow, 0 12px 36px -8px rgba(15,23,42,0.08));padding:30px 24px;display:flex;flex-direction:column;box-sizing:border-box;">
        <div class="form-header" style="display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;gap:12px;">
          <div class="lang-toggle" style="display:inline-flex;background:var(--bg-soft,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:99px;padding:3px;">
            <button type="button" class="lang-btn active" id="btn-en" style="border:none;background:#2563eb;color:#ffffff;padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">EN</button>
            <button type="button" class="lang-btn" id="btn-as" style="border:none;background:transparent;color:var(--ink-soft,#64748b);padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">অসমীয়া</button>
          </div>
          <div class="form-title" style="text-align:center;width:100%;">
            <h2 id="txt-title" style="font-size:1.35rem;font-weight:800;color:var(--ink,#0f172a);letter-spacing:-0.4px;">Submit Q&A Note</h2>
            <p id="txt-desc" style="margin-top:4px;font-size:0.84rem;color:var(--ink-soft,#64748b);">Contribute notes or feedback for aspirants.</p>
          </div>
        </div>

        <form id="qaForm" class="form-body" style="display:flex;flex-direction:column;gap:14px;">
          <input type="hidden" name="apiKey" value="sf_304846a9720d7354070bd57c">
          <input type="hidden" name="replyTo" value="support@axomexam.in">
          <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">

          <div class="field">
            <label id="lbl-name" for="name" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Your Name</label>
            <input type="text" id="name" name="name" placeholder="e.g. Rahul Borah" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-email" for="email" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-topic" for="subject" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Subject / Topic (Optional)</label>
            <input type="text" id="subject" name="subject" placeholder="e.g. Assam History, Science" style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-question" for="question" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Question (Optional)</label>
            <textarea id="question" name="question" rows="2" placeholder="Type the question here..." style="width:100%;min-height:55px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>
          <div class="field">
            <label id="lbl-answer" for="answer" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Answer / Message (Optional)</label>
            <textarea id="answer" name="answer" rows="3" placeholder="Provide complete answer, steps or message..." style="width:100%;min-height:90px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>

          <div class="captcha-container" style="background:var(--bg-soft,#f8fafc);border:1.5px solid var(--line,#e2e8f0);border-radius:12px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div class="captcha-left" style="display:flex;align-items:center;gap:8px;">
              <span class="captcha-label" id="lbl-captcha" style="font-size:0.8rem;font-weight:700;color:var(--ink-soft,#64748b);">Security:</span>
              <div class="captcha-badge-wrap" style="display:inline-flex;align-items:center;gap:4px;background:var(--bg,#ffffff);padding:3px 6px 3px 8px;border-radius:8px;border:1px solid var(--line,#cbd5e1);">
                <span class="captcha-math" id="math-expression" style="font-size:0.92rem;font-weight:800;color:#2563eb;user-select:none;">2 + 3 = ?</span>
                <button type="button" class="captcha-refresh-btn" id="btn-refresh-captcha" title="Change Captcha" style="border:none;background:transparent;color:var(--ink-faint,#94a3b8);width:24px;height:24px;display:grid;place-items:center;cursor:pointer;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                </button>
              </div>
            </div>
            <input type="number" id="captcha-answer" placeholder="Ans" required style="width:80px;text-align:center;font-weight:700;font-size:0.92rem;padding:7px 8px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border:1.5px solid var(--line,#cbd5e1);border-radius:8px;outline:none;-moz-appearance:textfield;">
          </div>

          <button type="submit" id="submitBtn" style="width:100%;padding:14px 20px;font-size:0.95rem;font-weight:700;border-radius:12px;margin-top:4px;cursor:pointer;border:none;background:#2563eb !important;color:#ffffff !important;box-shadow:0 6px 16px -4px rgba(37,99,235,0.45);transition:all 0.2s ease;">
            <span id="txt-btn">Submit</span>
          </button>

          <div id="form-error" class="error-msg" style="padding:10px 12px;border-radius:12px;font-size:0.84rem;font-weight:600;display:none;text-align:center;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;"></div>
        </form>
      </div>
    `;const a={en:{title:"Submit Q&A Note",desc:"Contribute notes or feedback for aspirants.",name:"Your Name",namePh:"e.g. Rahul Borah",email:"Email Address",emailPh:"name@example.com",topic:"Subject / Topic (Optional)",topicPh:"e.g. Assam History, Science",question:"Question (Optional)",questionPh:"Type the question here...",answer:"Answer / Message (Optional)",answerPh:"Provide complete answer, steps or message...",captcha:"Security:",captchaPh:"Ans",btn:"Submit",submitting:"Submitting...",captchaError:"Incorrect math answer! Please try again.",popTitle:"Sent Successfully!",popDesc:"Your message has been received."},as:{title:"প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)",desc:"প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",name:"আপোনাৰ নাম",namePh:"যেনে: ৰাহুল বৰা",email:"ইমেইল ঠিকনা",emailPh:"name@example.com",topic:"বিষয় / অধ্যায় (ঐচ্ছিক)",topicPh:"যেনে: অসম বুৰঞ্জী, বিজ্ঞান",question:"প্ৰশ্ন (ঐচ্ছিক)",questionPh:"প্ৰশ্নটো ইয়াত লিখক...",answer:"উত্তৰ বা বাৰ্তা (ঐচ্ছিক)",answerPh:"সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",captcha:"সুৰক্ষা:",captchaPh:"উত্তৰ",btn:"জমা দিয়ক",submitting:"প্ৰেৰণ হৈ আছে...",captchaError:"অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।",popTitle:"সফলতাৰে প্ৰেৰণ হ'ল!",popDesc:"আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"}};let n=u.lang==="as"?"as":"en",s=0;function i(){const c=Math.floor(Math.random()*9)+1,p=Math.floor(Math.random()*9)+1;s=c+p,g("#math-expression").textContent=`${c} + ${p} = ?`,g("#captcha-answer").value=""}function o(c){n=c;const p=g("#btn-en"),h=g("#btn-as");c==="en"?(p.style.background="#2563eb",p.style.color="#ffffff",h.style.background="transparent",h.style.color="var(--ink-soft,#64748b)"):(h.style.background="#2563eb",h.style.color="#ffffff",p.style.background="transparent",p.style.color="var(--ink-soft,#64748b)");const f=a[c];g("#txt-title").textContent=f.title,g("#txt-desc").textContent=f.desc,g("#lbl-name").textContent=f.name,g("#name").placeholder=f.namePh,g("#lbl-email").textContent=f.email,g("#email").placeholder=f.emailPh,g("#lbl-topic").textContent=f.topic,g("#subject").placeholder=f.topicPh,g("#lbl-question").textContent=f.question,g("#question").placeholder=f.questionPh,g("#lbl-answer").textContent=f.answer,g("#answer").placeholder=f.answerPh,g("#lbl-captcha").textContent=f.captcha,g("#captcha-answer").placeholder=f.captchaPh,g("#txt-btn").textContent=f.btn,g("#pop-title").textContent=f.popTitle,g("#pop-desc").textContent=f.popDesc}function l(){const c=g("#successPopup");c.style.display="grid",c.style.opacity="1",setTimeout(()=>{c.style.opacity="0",setTimeout(()=>{c.style.display="none"},200)},2e3)}g("#btn-en").addEventListener("click",()=>o("en")),g("#btn-as").addEventListener("click",()=>o("as")),g("#btn-refresh-captcha").addEventListener("click",i),o(n),g("#qaForm").addEventListener("submit",async function(c){c.preventDefault();const p=g("#form-error");if(p.style.display="none",parseInt(g("#captcha-answer").value,10)!==s){p.textContent=a[n].captchaError,p.style.display="block",i();return}const f=g("#submitBtn"),m=g("#txt-btn");f.disabled=!0,m.textContent=a[n].submitting;const x=g("#subject").value.trim()||"General Note",y=g("#question").value.trim()||"N/A",b=g("#answer").value.trim()||"N/A",w={apiKey:"sf_304846a9720d7354070bd57c",replyTo:"support@axomexam.in",name:g("#name").value.trim(),email:g("#email").value.trim(),subject:`[axomexam Submission] ${x}`,message:`Topic: ${x}

Question:
${y}

Answer/Message:
${b}

Sent to: support@axomexam.in`};try{const C=await(await fetch("https://api.staticforms.dev/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(w)})).json();C.success?(g("#qaForm").reset(),i(),l()):(p.textContent=C.message||"Failed to submit. Please try again.",p.style.display="block")}catch{p.textContent="Network error. Please check your connection.",p.style.display="block"}finally{f.disabled=!1,m.textContent=a[n].btn}}),i()}function ss(e,t,a,n){const s=[];return u.topicIndex.forEach(i=>{i.cat.id===e.id&&(t&&t!=="all"&&(!i.sub||i.sub.id!==t)||a&&(!i.section||i.section.id!==a)||n&&i.topic.id!==n||s.push(i))}),s}async function os(e,t,a,n){const s=ss(e,t,a,n);if(!s.length)return[];const i=await Promise.all(s.map(l=>API.getTopic(l.cat.id,l.topic.id,l.sub&&l.sub.id,l.cat&&l.cat.contentLayout).then(c=>({d:c,rec:l})).catch(()=>null))),o=[];return i.forEach(l=>{if(!l||!l.d)return;(Array.isArray(l.d)?l.d:Array.isArray(l.d.questions)?l.d.questions:[]).forEach(p=>{const h={en:T(p,"question","en"),as:T(p,"question","as")},f={en:T(p,"answer","en"),as:T(p,"answer","as")},m=F(p,"en"),x=F(p,"as"),y=Array.isArray(p.options)?p.options:[];let b=[];if(m.length||x.length){const A=Math.max(m.length,x.length);for(let C=0;C<A;C++){const S=y[C];b.push({en:m[C]||"",as:x[C]||"",fig:S&&typeof S=="object"&&typeof S.fig=="string"?S.fig:""})}}let w=0;if(typeof p.correct=="string"){const C=p.correct.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else if(typeof p.a=="string"){const C=p.a.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else Number.isInteger(p.correct_index)?w=p.correct_index:Number.isInteger(p.correct)?w=p.correct:Number.isInteger(p.answer)&&(w=p.answer);o.push({q:h,a:f,fig:typeof p.fig=="string"?p.fig:"",table:p.table||null,options:b.length>=2?b:null,correct:w,topicTitle:l.rec.title,catId:l.rec.cat.id})})}),o}function ua(e){const t=e.slice();for(let a=t.length-1;a>0;a--){const n=Math.floor(Math.random()*(a+1));[t[a],t[n]]=[t[n],t[a]]}return t}function Ge(){u.mock&&u.mock.timerId&&(clearInterval(u.mock.timerId),u.mock.timerId=null)}let _e=!1,$e="";function ha(){if(!_e){_e=!0,$e=location.href;try{history.pushState({axoMockGuard:Date.now()},"",$e)}catch{}}}function ht(){_e=!1}function ma(){if(ht(),Ge(),u.mock=null,De(!1),history.state&&history.state.axoMockGuard){history.back();return}if($e){je($e);return}je("/mock-test")}function is(){if(!_e||!u.mock||!u.mock.started)return!1;const e=!!document.getElementById("confirm-modal");try{history.pushState({axoMockGuard:Date.now()},"",$e||location.href)}catch{}return e||We({title:"Leave Mock Test?",message:"Are you sure you want to leave the mock test? Your current progress will be lost.",confirmText:"Yes, Leave",cancelText:"Stay",onConfirm:ma}),!0}function We({title:e,message:t,confirmText:a,cancelText:n,onConfirm:s}){const i=g("#confirm-modal");i&&i.remove();const o=document.createElement("div");o.id="confirm-modal",o.className="read-modal",o.innerHTML=`
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box confirm-modal-box" role="dialog">
        <h3 style="font-size:1.12rem; margin-bottom:9px;">${d(e)}</h3>
        <p style="color:var(--ink-soft); font-size:.9rem; margin-bottom:18px; line-height:1.55;">${d(t)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${d(n||"Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${d(a||"Confirm")}</button>
        </div>
      </div>`,document.body.appendChild(o),g("#modal-cancel-btn",o).addEventListener("click",()=>o.remove()),g(".read-modal-backdrop",o).addEventListener("click",()=>o.remove()),g("#modal-confirm-btn",o).addEventListener("click",()=>{o.remove(),s&&s()})}function mt(e){return e?e.id==="english"?[{id:"grammar",name:{en:"Grammar",as:"ব্যাকৰণ"}},{id:"vocabulary",name:{en:"Vocabulary",as:"শব্দভাণ্ডাৰ"}}]:e.id==="computer"?[{id:"comp-fundamentals",name:{en:"Fundamentals",as:"মৌলিক"}},{id:"ms-office",name:{en:"MS Office",as:"MS Office"}}]:e.subcategories||[]:[]}function no(e){return!e||!e.length?!1:!!(e[0]==="category"&&e[1]==="english"||e[0]==="topic"&&e[1]==="english"||e[0]==="mock-test"&&e[1]==="english"||e[0]==="category"&&e[1]==="articles"&&e[2]==="english"||e[0]==="exams"&&/english/i.test(e[2]||""))}function rs(e,t){if(t.length===1)return bs(e);const a=t[1],n=u.categories.find(c=>c.id===a);if(!n)return G(e);const s=t[2],i=t[3],o=t[4];if(s&&s.startsWith("topic-")||t.includes("start"))return Qe(e,n,s,i,o);const l=mt(n);if(!s&&l.length)return vs(e,n);if(s&&!i){const c=l.find(p=>p.id===s);return c?ls(e,n,c):Qe(e,n,s,null,null)}if(s&&i){const c=l.find(h=>h.id===s);if(!c)return G(e);if(/^set-\d+$/.test(i)){const h=parseInt(i.replace("set-",""),10);return h>=1&&h<=Ve?Cs(e,n,c,h):G(e)}const p=(c.sections||[]).find(h=>h.id===i);return p&&p.topics&&p.topics.length?xs(e,n,c,p):Qe(e,n,s,i,null)}return Qe(e,n,null,null,null)}async function ls(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const n=await ys(t.id,a.id);return As(e,t,a,n)}const ft={gk:{sets:70,q:1750},math:{sets:30,q:750},science:{sets:15,q:375},reasoning:{sets:15,q:375},english:{sets:10,q:250},computer:{sets:10,q:250}};function cs(e,t,a){return CONFIG.USE_REMOTE?`${CONFIG.RAW_BASE}/${CONFIG.OWNER}/${CONFIG.REPO}/${CONFIG.BRANCH}/${CONFIG.PATHS.MOCKSETS}/${e}/${t}/set-${a}.json`:`${CONFIG.FALLBACK.MOCKSETS_BASE}${e}/${t}/set-${a}.json`}async function ds(e,t,a){try{const n=await fetch(cs(e,t,a),{method:"HEAD",cache:"no-store"});return n.status===405||n.status===501?xt(await API.getMockSet(e,t,a)):n.ok}catch{return!1}}async function ps(e,t){const a=e+"/"+t;if(Object.prototype.hasOwnProperty.call(u.mockSetCount,a))return u.mockSetCount[a];let n=0;for(let s=1;s<=Ve&&await ds(e,t,s);s++)n++;return u.mockSetCount[a]=n,n}async function us(e){const a=(await Promise.all(mt(e).map(i=>ps(e.id,i.id)))).reduce((i,o)=>i+o,0),n=ft[e.id],s=n&&n.sets?Math.round(n.q/n.sets):25;return{sets:a,questions:a*s}}function hs(e){e.forEach(t=>{us(t).then(a=>{if(!a.sets)return;u.mockLiveCounts[t.id]=a;const n=document.querySelector(`.mv-card[data-mock-cat="${t.id}"]`),s=n&&n.querySelector(".mv-card-meta");s&&(s.textContent=`${a.sets} sets · ${a.questions} questions`),ms()}).catch(()=>{})})}function ms(){const e=u.categories.filter(o=>o.id!=="study-guides"&&o.id!=="articles");let t=0,a=0,n=!1;if(e.forEach(o=>{const l=u.mockLiveCounts[o.id];l&&(t+=l.sets,a+=l.questions,n=!0)}),!n)return;const s=g("#mock-stat-sets"),i=g("#mock-stat-questions");s&&(s.textContent=String(t)),i&&(i.textContent=String(a))}function fs(){let e=0,t=0;return u.categories.forEach(a=>{const n=ft[a.id];n&&(e+=n.sets,t+=n.q)}),{sets:e,questions:t}}function gt(e){if(e==null)return{en:"",as:""};if(typeof e=="string")return{en:e,as:""};const t=e.en||e.as||"",a=e.as&&e.as!==t?e.as:"";return{en:t,as:a}}function bt(e){const t=e.color||z(e.catId),a=e.delay||0,n=e.as?`<span class="mt-tile-as">${d(e.as)}</span>`:"",s=e.meta?`<span class="mt-tile-meta">${e.meta}</span>`:"",i=e.iconHtml||ce(e.id,e.catId);return`<a class="mt-tile reveal" href="${e.href}" style="--c:${t}" data-delay="${a}">
        <span class="mt-tile-ico">${i}</span>
        <span class="mt-tile-en">${d(e.en)}</span>
        ${n}
        ${s}
      </a>`}function vt(e){return`<div class="mt-topics-head">
        <h2>${d(e)} Mock Test</h2>
        <p>Choose a topic below to begin your timed mock test.</p>
      </div>`}function gs(e,t){const a=z(e.id),n=e.name,s=typeof n=="string"?n:n&&n.en||"",i=typeof n=="string"?"":n&&n.as||"",o=ft[e.id],l=o?`${o.sets} sets · ${o.q} questions`:`${ge(e)} topics`;return`
      <a class="mv-card reveal" style="--c:${a}" data-delay="${t*50}" data-mock-cat="${e.id}" href="/mock-test/${e.id}">
        <span class="mv-card-ico">${ae(e.id)}</span>
        <span class="mv-card-body">
          <span class="mv-card-title">${d(s)}</span>
          ${i?`<span class="mv-card-as">${d(i)}</span>`:""}
          <span class="mv-card-meta">${l}</span>
        </span>
        <span class="mv-card-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
      </a>`}function bs(e){const t=u.categories.filter(n=>n.id!=="study-guides"&&n.id!=="articles"),a=fs();e.innerHTML=`
      <section class="mv-landing">
        <div class="mv-hero">
          <span class="mv-badge"><span class="dot"></span>100% Free · English &amp; Assamese</span>
          <h1>${r("mock.title")} for Competitive Exams</h1>
          <p class="mv-hero-sub">Take timed mock tests designed exactly like the real exam to build speed, accuracy and confidence for ADRE 3.0, Assam Police, APSC, Gauhati High Court, SSC and Railway exams.</p>
          <div class="mv-stats">
            <div class="mv-stat"><b>100+</b><span>Subjects</span></div>
            <div class="mv-stat"><b id="mock-stat-sets">${a.sets}</b><span>Practice Sets</span></div>
            <div class="mv-stat"><b id="mock-stat-questions">${a.questions}</b><span>Questions</span></div>
            <div class="mv-stat"><b>100%</b><span>Free Forever</span></div>
          </div>
          <div class="mv-cta">
            <a class="mv-btn mv-btn-primary" href="#subjects">Start Mock Test
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <div class="mv-exams reveal">
          <div class="mv-exams-head">
            <h2>Which exams do these Mock Tests cover?</h2>
            <p class="mv-exams-as">এই মক টেষ্টবোৰে কোন কোন পৰীক্ষা সামৰি লয়?</p>
            <p class="mv-exams-sub">Timed mock tests built on the exact syllabus &amp; pattern of:<br>তলত দিয়া পৰীক্ষাসমূহৰ পাঠ্যক্ৰম আৰু আৰ্হি অনুসৰি প্ৰস্তুত কৰা সময়সীমা থকা মক টেষ্ট:</p>
          </div>
          <ul class="mv-exams-list">
            <li><b>Assam Police</b><span>অসম আৰক্ষী</span></li>
            <li><b>ADRE 3.0</b><span>ADRE ৩.০</span></li>
            <li><b>APSC</b><span>এ পি এছ চি</span></li>
            <li><b>Gauhati High Court</b><span>গুৱাহাটী উচ্চ ন্যায়ালয়</span></li>
            <li><b>SSC</b><span>এছ এছ চি</span></li>
            <li><b>Railway (RRB)</b><span>ৰে'লৱে (RRB)</span></li>
            <li><b>DHS &amp; DME</b><span>ডি এইচ এছ আৰু ডি এম ই</span></li>
            <li><b>And many more...</b><span>আৰু অন্যান্য প্ৰতিযোগিতামূলক পৰীক্ষা</span></li>
          </ul>
        </div>

        <div class="mv-section" id="subjects">
          <div class="mv-head"><h2>${r("mock.pick")}</h2><p>${r("mock.pick.sub")}</p></div>
          <div class="mv-grid">
            ${t.map((n,s)=>gs(n,s)).join("")}
          </div>
        </div>

        <div class="mv-section">
          <div class="mv-head"><h2>Why practise with axomexam?</h2><p>Everything you need to simulate the real exam</p></div>
          <div class="mv-features">
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
              <b>Live Timer</b><p>Every test runs on a real exam-style countdown so you learn to manage your time.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span>
              <b>Instant Scoring</b><p>Your score and accuracy are calculated the moment you submit the paper.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
              <b>Answer Review</b><p>See the correct answer and a clear explanation for every question you attempt.</p>
            </div>
            <div class="mv-feature">
              <span class="mv-feature-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
              <b>Bilingual</b><p>Practise in both English and Assamese — switch anytime during the test.</p>
            </div>
          </div>
        </div>

        <div class="mv-section">
          <div class="mv-head"><h2>How it works</h2><p>Three simple steps to test yourself</p></div>
          <div class="mv-steps">
            <div class="mv-step"><span class="mv-step-num">1</span><b>Pick a subject</b><p>Choose the subject and paper you want to practise from the grid above.</p></div>
            <div class="mv-step"><span class="mv-step-num">2</span><b>Attempt the test</b><p>Answer the questions within the live timer just like the real examination hall.</p></div>
            <div class="mv-step"><span class="mv-step-num">3</span><b>Review &amp; improve</b><p>Study the instant result and explanations, then reattempt to track your progress.</p></div>
          </div>
        </div>
      </section>`,L(),O(e,{name:"Mock Tests",noDefaults:!0,h2:"Timed Mock Tests for Assam Competitive Exams",info:"Each mock test on axomexam.in works like the real examination. A live timer runs while you attempt the questions, your score is calculated instantly, and every question is followed by a clear bilingual explanation. The sets are arranged subject-wise and paper-wise so you can practise exactly the section you are preparing for.",items:t.map(n=>({name:v(n.name),count:ge(n)})),tips:["Start with the subject you find hardest, so you have the most time to improve it.","Attempt one full set under the timer before checking any answer.","Maintain an error log of every wrong answer and revise it weekly.","Increase the number of questions gradually once your accuracy is stable."],faqs:[{q:"How does the online mock test work?",a:"Choose a subject, pick a paper and attempt the questions within the timer. Once you submit, you immediately see your score along with the correct answers and explanations."},{q:"Can I attempt the mock tests more than once?",a:"Yes. All mock tests are unlimited. You can reattempt any set as many times as you like at no cost."},{q:"Are the mock tests suitable for ADRE and Assam Police?",a:"Yes. The subjects and question patterns follow the syllabus of ADRE 3.0, Assam Police, APSC, Gauhati High Court, SSC and Railway recruitment exams."}]}),hs(t)}function vs(e,t){const a=mt(t);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">Choose a paper to begin your timed mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${vt(v(t.name))}
        <div class="mt-tile-grid">
          ${a.map((s,i)=>{const o=gt(s.name),l=(s.sections||[]).reduce((p,h)=>p+(h.topics||[]).length,0)||(s.topics||[]).length,c=l?`${l} ${l===1?"topic":"topics"}`:"Timed practice sets";return bt({href:`/mock-test/${t.id}/${s.id}`,catId:t.id,id:s.id,en:o.en,as:o.as,meta:c,delay:i*40})}).join("")}
        </div>
      </section>`,L();const n=u.topicIndex.filter(s=>s.cat&&s.cat.id===t.id);O(e,{id:t.id,name:v(t.name)+" Mock Test",count:a.length,total:n.reduce((s,i)=>s+(i.nQuestions||0),0),h2:v(t.name)+" Mock Tests with Answers",items:a.map(s=>({name:v(s.name),count:0}))})}function so(e,t,a){const n=a.sections||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <span>${d(v(a.name))}</span>
        </nav>
        <h1>${d(v(a.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${vt(v(a.name))}
        <div class="mt-tile-grid">
          ${n.map((s,i)=>{const o=gt(s.name),l=(s.topics||[]).length;return bt({href:`/mock-test/${t.id}/${a.id}/${s.id}`,catId:t.id,id:s.id,en:o.en,as:o.as,meta:`${l} ${l===1?"topic":"topics"}`,delay:i*50})}).join("")}
        </div>
      </section>`,L(),O(e,{id:a.id,name:v(a.name)+" Mock Test",count:n.length,h2:v(a.name)+" Mock Test - "+v(t.name),items:n.map(s=>({name:v(s.name),count:(s.topics||[]).length}))})}function xs(e,t,a,n){const s=n.topics||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${d(v(a.name))}</a><span class="bc-sep">/</span>
          <span>${d(v(n.name))}</span>
        </nav>
        <h1>${d(v(n.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${vt(v(n.name))}
        <div class="mt-tile-grid">
          ${s.map((i,o)=>{const l=gt(i.name);return bt({href:`/mock-test/${t.id}/start`,catId:t.id,id:i.id,en:l.en,as:l.as,meta:"Take Mock Test",delay:o*40})}).join("")}
        </div>
      </section>`,L(),O(e,{id:n.id,name:v(n.name)+" Mock Test",count:s.length,h2:v(n.name)+" Mock Test Questions",items:s.map(i=>({name:v(i.name),count:0}))})}function xt(e){return e?Array.isArray(e)?e.length>0:Array.isArray(e.questions)&&e.questions.length>0:!1}async function ys(e,t){const a=e+"/"+t;if(u.mockSetCache[a])return u.mockSetCache[a];const n=[];for(let s=1;s<=Ve;s++){const i=await API.getMockSet(e,t,s);if(xt(i))n.push(s);else break}return u.mockSetCache[a]=n,n}function ws(e){if(!e||typeof e!="object")return null;const t={en:T(e,"question","en"),as:T(e,"question","as")};if(!t.en&&!t.as)return null;const a={en:T(e,"answer","en"),as:T(e,"answer","as")},n=F(e,"en"),s=F(e,"as"),i=Array.isArray(e.options)?e.options:[];let o=[];if(n.length||s.length){const h=Math.max(n.length,s.length);for(let f=0;f<h;f++){const m=i[f];o.push({en:n[f]||"",as:s[f]||"",fig:m&&typeof m=="object"&&typeof m.fig=="string"?m.fig:""})}}let l=0;if(typeof e.correct=="string"){const f=e.correct.trim().toLowerCase().charCodeAt(0);f>=97&&f<=101&&(l=f-97)}else if(typeof e.a=="string"){const f=e.a.trim().toLowerCase().charCodeAt(0);f>=97&&f<=101&&(l=f-97)}else Number.isInteger(e.correct_index)?l=e.correct_index:Number.isInteger(e.correct)?l=e.correct:Number.isInteger(e.answer)&&(l=e.answer);let c=String(e.difficulty||"medium").toLowerCase().trim();c!=="easy"&&c!=="hard"&&(c="medium");const p={en:T(e,"explanation","en"),as:T(e,"explanation","as")};return{q:t,a,fig:typeof e.fig=="string"?e.fig:"",table:e.table||null,options:o.length>=2?o:null,correct:l,difficulty:c,explanation:{en:p.en,as:p.as}}}async function ks(e,t,a){const n=await API.getMockSet(e.id,t.id,a);if(!xt(n))return null;const i=(Array.isArray(n)?n:Array.isArray(n.questions)?n.questions:[]).map(ws).filter(Boolean);return i.length?{setNumber:a,title:n&&n.title||`Set ${a}`,subject:n&&n.subject||t&&t.name||"",questions:i}:null}function oo(e){const t={easy:[],medium:[],hard:[]};return(e||[]).forEach(a=>{!a.options||a.options.length<2||(t[a.difficulty]=t[a.difficulty]||[],t[a.difficulty].push(a))}),t}function $s(e,t){const a=t||u.uiLang;return e==="easy"?a==="as"?"সহজ":"Easy":e==="hard"?a==="as"?"কঠিন":"Hard":a==="as"?"মধ্যম":"Medium"}function As(e,t,a,n){const s=new Set(n),i=Math.max(Ea,...n);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <span>${d(v(a.name))}</span>
        </nav>
        <h1>${d(v(a.name))}</h1>
        <p class="page-desc">Pick a set to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="set-grid">
          ${Array.from({length:i},(o,l)=>{const c=l+1;return s.has(c)?`
              <a class="set-card reveal" href="/mock-test/${t.id}/${a.id}/set-${c}" style="--cat:${z(t.id)}" data-delay="${l*40}">
                <span class="set-card-head">
                  <span class="set-num">${String(c).padStart(2,"0")}</span>
                  <span class="set-status">Available</span>
                </span>
                <span class="set-name">Mock Test Set ${c}</span>
                <span class="set-meta">Full paper • Instant scoring</span>
                <span class="set-go">
                  <span>Start Test</span>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </a>`:`
              <div class="set-card set-card-locked reveal" style="--cat:${z(t.id)}" data-delay="${l*40}">
                <span class="set-card-head">
                  <span class="set-num">${String(c).padStart(2,"0")}</span>
                  <span class="set-status set-status-locked">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Coming Soon
                  </span>
                </span>
                <span class="set-name">Mock Test Set ${c}</span>
                <span class="set-meta">Not published yet</span>
              </div>`}).join("")}
        </div>
      </section>`,L()}async function Cs(e,t,a,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const s=await ks(t,a,n);if(!s){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>Questions for Set ${n} have not been uploaded yet. Please check back soon.</p>
          <div style="margin-top:18px;">
            <a class="btn btn-outline" href="/mock-test/${t.id}/${a.id}">← Back to Sets</a>
          </div>
        </div>`;return}const i=s.questions.filter(f=>f.options&&f.options.length>=2),o=i.length?i:s.questions,l=[10,15,20,25].filter(f=>f<=o.length);l.length||l.push(o.length);const c=l.includes(25)?25:l[l.length-1];u.mock={cat:t,pool:o,configured:!1,count:c,testLang:t.id==="english"?"en":"as",setInfo:{setNumber:n,title:s.title,subject:v(a.name)}},e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${d(v(a.name))}</a><span class="bc-sep">/</span>
          <span>${d(s.title)}</span>
        </nav>
        <h1>${d(s.title)} — ${d(v(a.name))}</h1>
        <p class="page-desc">Choose your language and start when ready.</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${z(t.id)}">
          <span class="mt-hero-icon">${ae(t.id)}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${d(v(t.name))}</span>
            <span class="mt-hero-title">${d(s.title)} • ${d(v(a.name))}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${u.mock.pool.length} ${r("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="mt-block">
          <div class="mt-label">Question Language <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn ${u.mock.testLang==="as"?"active":""}" data-mocklang="as">
              <span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)
            </button>
            <button type="button" class="mt-seg-btn ${u.mock.testLang==="en"?"active":""}" data-mocklang="en">
              <span class="mt-seg-ico">A</span> English
            </button>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">Number of Questions <span>প্ৰশ্নৰ সংখ্যা</span></div>
          <div class="count-picker" id="set-count-picker" style="margin:0;">
            ${l.map(f=>`<button type="button" data-count="${f}" class="${f===c?"active":""}">${f}</button>`).join("")}
          </div>
        </div>

        <button class="btn mt-start" id="mock-begin-btn">${r("mock.begin")} →</button>

        <div class="mt-block">
          <div class="mt-label">Instructions <span>নিৰ্দেশনা</span></div>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>This is a timed test — a stopwatch tracks your total time.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>Choose the best answer. Results are graded instantly on submit.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>You can quit anytime — your current progress will be lost.</li>
          </ul>
        </div>
      </div>`,P("[data-mocklang]").forEach(f=>{f.addEventListener("click",()=>{P("[data-mocklang]").forEach(m=>m.classList.remove("active")),f.classList.add("active"),u.mock.testLang=f.dataset.mocklang})});let p=c;const h=g("#set-count-picker");h&&P("button",h).forEach(f=>{f.addEventListener("click",()=>{P("button",h).forEach(m=>m.classList.remove("active")),f.classList.add("active"),p=parseInt(f.dataset.count,10),u.mock.count=p})}),g("#mock-begin-btn").addEventListener("click",()=>{We({title:`Start ${s.title}?`,message:`You are about to start a ${p} question mock test in ${u.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>Ss(p)})})}function Ss(e){if(!u.mock)return;const t=u.mock.pool.filter(s=>s.options&&s.options.length>=2),a=t.length?t:u.mock.pool,n=Math.min(e||a.length,a.length);u.mock=Object.assign(u.mock,{pool:ua(a).slice(0,n),count:n,idx:0,answers:[],elapsedSec:0,started:!0,introPending:!0,timerId:null}),yt()}async function Qe(e,t,a,n,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const i=await os(t,a,n,s);if(!i.length){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${r("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;return}u.mock={cat:t,pool:i,configured:!1,count:0,testLang:t.id==="english"?"en":"as"};const o=[10,20,50,100].filter(p=>p<=i.length);o.includes(i.length)||o.push(i.length),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${d(v(t.name))}</span></nav>
        <h1>${r("mock.setup.title")}</h1>
        <p class="page-desc">${d(v(t.name))} • ${i.length} ${r("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${z(t.id)};width:40px;height:40px;border-radius:11px;">${ae(t.id)}</span>
          <b>${d(v(t.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${u.mock.testLang==="as"?"active":""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${u.mock.testLang==="en"?"active":""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${r("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${o.map((p,h)=>`<button type="button" data-count="${p}" class="${h===0?"active":""}">${p}</button>`).join("")}
        </div>

        <button class="btn btn-begin" id="mock-begin-btn">${r("mock.begin")}</button>
        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
      </div>`,P("[data-mocklang]").forEach(p=>{p.addEventListener("click",()=>{P("[data-mocklang]").forEach(h=>h.classList.remove("active")),p.classList.add("active"),u.mock.testLang=p.dataset.mocklang})});const l=g("#count-picker");let c=o[0]||i.length;P("button",l).forEach(p=>{p.addEventListener("click",()=>{P("button",l).forEach(h=>h.classList.remove("active")),p.classList.add("active"),c=parseInt(p.dataset.count,10)})}),g("#mock-begin-btn").addEventListener("click",()=>{We({title:"Start Mock Test?",message:`You are about to start a ${c} question test in ${u.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>fa(c)})})}function fa(e){if(!u.mock)return;const t=ua(u.mock.pool).slice(0,e);u.mock=Object.assign(u.mock,{pool:t,idx:0,answers:[],elapsedSec:0,started:!0,introPending:!0,timerId:null}),yt()}function yt(){const e=u.mock,t=e.pool[e.idx];if(!t)return ba();De(!0);const a=g("#app"),n=e.answers[e.idx]!==void 0,s=["A","B","C","D","E"],i=te(t.q),o=t.options||[],l=re(t),c=e.setInfo?`${d(v(e.cat.name))} • ${d(e.setInfo.title)}`:`${d(v(e.cat.name))}`;a.innerHTML=`
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${c} • Question ${e.idx+1}/${e.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed"><span id="quiz-timer-val">${Ye(e.elapsedSec)}</span></span>
          <button class="quiz-quit" id="quiz-quit-btn">${r("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${(e.idx/e.pool.length*100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${e.idx+1}</div>
          <div class="quiz-qtext">${q(i)}</div>
          ${l}

          <div class="quiz-options" id="quiz-options">
            ${o.map((f,m)=>{const x=Te(f),y=Le(f);return`
              <button class="quiz-option${y?" quiz-option-fig":""}" data-opt="${m}" ${n?"disabled":""}>
                <span class="opt-key">${s[m]}</span>
                <span class="opt-main">${y?`<span class="opt-fig">${y}</span>`:""}${x?`<span class="opt-text">${q(x)}</span>`:""}</span>
              </button>`}).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" type="button">
            ${e.idx+1===e.pool.length?"Final Submit":n?r("mock.next")+" →":r("mock.skip")+" →"}
          </button>
        </div>
      </div>`,nt();const p=g(".quiz-card");p&&ee(p);const h=g("#quiz-options");h&&P(".quiz-option",h).forEach(f=>{f.addEventListener("click",()=>{if(e.answers[e.idx]!==void 0)return;const m=parseInt(f.dataset.opt,10);e.answers[e.idx]=m,P(".quiz-option",h).forEach(C=>{C.disabled=!0;const S=parseInt(C.dataset.opt,10);S===t.correct?C.classList.add("correct"):S===m&&C.classList.add("wrong"),S===m&&C.classList.add("selected")});const x=g("#quiz-feedback");x.classList.add(m===t.correct?"good":"bad"),x.style.display="block";const y=o[t.correct],b=y&&typeof y=="object"&&y.option?String(y.option):s[t.correct]||"",w=`${b?`<b>(${b})</b> `:""}${Le(y)?`<span class="opt-fig fb-fig">${Le(y)}</span>`:""}${Te(y)?q(Te(y)):""}`;x.innerHTML=m===t.correct?r("mock.revealCorrect"):`${r("mock.correctAnswer")}: ${w||b||""}`,ee(x);const A=g("#quiz-next");A&&(A.disabled=!1,A.textContent=e.idx+1===e.pool.length?"Final Submit":r("mock.next")+" →")})}),g("#quiz-next").addEventListener("click",()=>{e.idx++,e.idx>=e.pool.length?(Ge(),ba()):yt()}),g("#quiz-quit-btn").addEventListener("click",()=>{We({title:"Quit Mock Test?",message:"Are you sure you want to quit the mock test? Your current progress will be lost.",confirmText:"Yes, Quit",cancelText:"Resume Test",onConfirm:()=>ma()})}),e.introPending?(e.introPending=!1,ha(),qs(()=>ga())):(e.timerId||ga(),ha())}function qs(e){const t=document.getElementById("mock-intro");t&&t.remove();const a=document.createElement("div");a.className="mock-intro",a.id="mock-intro",a.innerHTML=`
      <div class="mi-backdrop"></div>
      <div class="mi-stage">
        <div class="mi-ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <linearGradient id="mi-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#6366f1"></stop>
                <stop offset="1" stop-color="#22d3ee"></stop>
              </linearGradient>
            </defs>
            <circle class="mi-ring-bg" cx="100" cy="100" r="88"></circle>
            <circle class="mi-ring-fg" cx="100" cy="100" r="88"></circle>
          </svg>
          <div class="mi-core"><div class="mi-count" id="mi-count">3</div></div>
        </div>
        <div class="mi-text">
          <span class="mi-title">Test Started</span>
          <span class="mi-line"></span>
          <span class="mi-sub">All the best • শুভকামনা</span>
        </div>
      </div>`,document.body.appendChild(a);const n=a.querySelector(".mi-stage"),s=a.querySelector(".mi-ring-fg"),i=a.querySelector("#mi-count"),o=3,l=600;n&&n.style.setProperty("--ring-dur",l+"ms"),requestAnimationFrame(()=>{a.classList.add("in")});const c=f=>{i.textContent=String(f),i.classList.remove("tick"),i.offsetWidth,i.classList.add("tick"),s&&(s.classList.remove("fill"),s.getBoundingClientRect(),s.classList.add("fill"))};c(o);let p=o;const h=setInterval(()=>{if(p--,p>=0){c(p);return}clearInterval(h),a.classList.add("go"),i.outerHTML='<div class="mi-check" id="mi-count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg></div>',setTimeout(()=>{a.classList.add("out"),setTimeout(()=>{a.remove(),e&&e()},520)},880)},l)}function ga(){const e=u.mock,t=()=>{if(!e||!e.started||e.timerId===null)return;e.elapsedSec++;const a=g("#quiz-timer-val");a&&(a.textContent=Ye(e.elapsedSec))};e.timerId=setInterval(t,1e3)}function Ye(e){const t=Math.max(0,e);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function ba(){const e=u.mock;if(Ge(),ht(),De(!1),!e)return;let t=0,a=0,n=0;const s=e.pool.map((b,w)=>{const A=e.answers[w];let C=!1;return A===void 0?n++:A===b.correct?(C=!0,t++):a++,{q:b,a:A,ok:C}}),i=e.elapsedSec,o=e.pool.length?Math.round(t/e.pool.length*100):0,l=o>=80?"mock.result.msgExcellent":o>=55?"mock.result.msgGood":o>=35?"mock.result.msgAverage":"mock.result.msgPoor",c=52.5,p=2*Math.PI*c,h=p*(1-o/100),f=g("#app");f.innerHTML=`
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${c}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${c}" stroke-dasharray="${p.toFixed(1)}" stroke-dashoffset="${p.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${o}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${r("mock.result.title")}</h2>
          ${e.setInfo?`<p style="font-size:.85rem; color:var(--ink-soft,#64748b); margin:2px 0 0;">${d(e.setInfo.title)}${e.setInfo.difficulty?" • "+$s(e.setInfo.difficulty):""}</p>`:""}
          <p class="result-msg">${r(l)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${t}</b><span>${r("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${a}</b><span>${r("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${n}</b><span>${r("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${Ye(i)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-accent" id="mock-share-btn">${Ps()} ${r("mock.result.share")}</button>
            <button class="btn btn-outline" id="mock-retry">${r("mock.result.retry")}</button>
            <a class="btn btn-outline" href="/mock-test">${r("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${r("mock.result.review")}</button>
            <a class="btn btn-outline" href="/mock-test">${r("mock.result.exit")}</a>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${s.map((b,w)=>{const A=b.q,C=b.a===void 0?`<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${r("mock.result.skipped")}</span>`:`<span class="rv-badge ${b.ok?"good":"bad"}">${b.ok?"✓ "+r("mock.result.correct"):"✕ "+r("mock.result.wrong")}</span>`,S=A.options||[],$=j=>{if(!S[j])return"";const J=String.fromCharCode(65+j),se=Le(S[j]),oe=Te(S[j]);return`<b>(${J})</b> ${se?`<span class="rv-fig">${se}</span>`:""}${oe?q(oe):se?"":"(No text)"}`};let E="";b.a!==void 0&&S.length?(E=`<div class="rv-ans"><b>${r("mock.answer")}:</b> ${$(b.a)}</div>`,b.ok||(E+=`<div class="rv-ans correct-line"><b>${r("mock.correctAnswer")}:</b> ${$(A.correct)}</div>`)):S.length&&(E=`<div class="rv-ans correct-line"><b>${r("mock.correctAnswer")}:</b> ${$(A.correct)}</div>`);const M=te(A.explanation),I=u.mock&&u.mock.testLang==="as"?"ব্যাখ্যা":"Explanation",D=M?`<div class="rv-exp"><b>${I}:</b> ${q(M)}</div>`:"";return`
              <div class="review-item">
                <div class="rv-q">Q${w+1}. ${q(te(A.q))}</div>
                ${re(A)}
                ${C}
                ${E}
                ${D}
              </div>`}).join("")}
        </div>
      </div>`,nt();const m=g("#review-list");m&&ee(m),requestAnimationFrame(()=>{const b=g(".result-ring .r-fg");b&&(b.style.strokeDashoffset=h.toFixed(1))}),g("#mock-retry").addEventListener("click",()=>fa(e.pool.length));const x=g("#mock-share-btn");x&&x.addEventListener("click",ka);const y=g("#mock-review-toggle");y.addEventListener("click",()=>{const b=g("#review-list"),w=b.hidden;b.hidden=!w,y.textContent=r(w?"mock.result.hideReview":"mock.result.review")}),e.timerId&&(clearInterval(e.timerId),e.timerId=null)}const wt="https://axomexam.in";function Ps(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function va(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'}function Es(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'}function Ms(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'}function Ts(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'}function Ls(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function Is(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'}function Ds(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'}function Rs(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'}function xa(){return'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}function zs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'}function Hs(){const e=u.mock;if(!e)return null;let t=0,a=0,n=0;e.pool.forEach((h,f)=>{const m=e.answers[f];m===void 0?n++:m===h.correct?t++:a++});const s=e.pool.length?Math.round(t/e.pool.length*100):0,i=s>=80?"mock.result.msgExcellent":s>=55?"mock.result.msgGood":s>=35?"mock.result.msgAverage":"mock.result.msgPoor";let o="/mock-test";location.pathname&&location.pathname.indexOf("/mock-test/")===0&&(o=location.pathname.replace(/\/index\.html$/,""));const l=e.setInfo&&e.setInfo.title?e.setInfo.title:"",c=e.setInfo&&e.setInfo.subject?e.setInfo.subject:v(e.cat&&e.cat.name),p=l?c?c+" • "+l:l:v(e.cat&&e.cat.name)+" Mock Test";return{correct:t,wrong:a,skipped:n,pct:s,msgKey:i,url:wt+o,title:p,time:Ye(e.elapsedSec),count:e.pool.length}}function js(e){return r("share.text").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{url}",e.url).replace("{site}",wt)}function Bs(e){const t=String(e).split(","),a=t[0].match(/:(.*?);/),n=a?a[1]:"image/png",s=atob(t[1]),i=new Uint8Array(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return new Blob([i],{type:n})}function ya(e,t,a,n,s,i){const o=Math.min(i,n/2,s/2);e.beginPath(),e.moveTo(t+o,a),e.arcTo(t+n,a,t+n,a+s,o),e.arcTo(t+n,a+s,t,a+s,o),e.arcTo(t,a+s,t,a,o),e.arcTo(t,a,t+n,a,o),e.closePath()}function Fs(){const n="'Plus Jakarta Sans','Inter',Arial,sans-serif",s=document.createElement("canvas");s.width=372,s.height=68;const i=s.getContext("2d");return i.scale(2,2),i.fillStyle="rgba(255,255,255,0.18)",ya(i,0,0,34,34,9),i.fill(),i.fillStyle="#ffffff",i.textAlign="center",i.textBaseline="middle",i.font="900 18px "+n,i.fillText("A",17,17),i.textAlign="left",i.font="800 21px "+n,i.fillText("axomexam.in",46,17),s.toDataURL("image/png")}function Os(e){const s="'Plus Jakarta Sans','Inter',Arial,sans-serif",i=document.createElement("canvas").getContext("2d");i.font="800 11px "+s;const o=Math.ceil(i.measureText(e).width+32),l=document.createElement("canvas");l.width=o*2,l.height=56;const c=l.getContext("2d");return c.scale(2,2),c.fillStyle="rgba(255,255,255,0.16)",ya(c,.5,.5,o-1,27,99),c.fill(),c.strokeStyle="rgba(255,255,255,0.28)",c.lineWidth=1,c.stroke(),c.fillStyle="#ffffff",c.textAlign="center",c.textBaseline="middle",c.font="800 11px "+s,c.fillText(e,o/2,28/2),l.toDataURL("image/png")}async function Ns(e,t,a){try{await document.fonts.ready}catch{}const n=52.5,s=2*Math.PI*n,i=s*(1-Math.max(0,Math.min(100,e.pct))/100),o=(String(t||"").trim().charAt(0)||"A").toUpperCase(),l="font-family:'Plus Jakarta Sans','Inter',Arial,sans-serif",c=Fs(),p=Os(r("share.reportBadge")),h=a?'<img src="'+a+'" alt="" />':'<svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true"><text x="42" y="56.5" text-anchor="middle" fill="#ffffff" font-size="40" font-weight="800" style="'+l+'">'+d(o)+"</text></svg>",f=[{v:e.correct,l:r("mock.result.correct")},{v:e.wrong,l:r("mock.result.wrong")},{v:e.skipped,l:r("mock.result.skipped")},{v:e.time,l:r("mock.result.time")}],m=document.createElement("div");m.className="report-card",m.innerHTML='<div class="rc-top"><div class="rc-brand"><img src="'+c+'" alt="" /></div><div class="rc-badge"><img src="'+p+'" alt="" /></div></div><div class="rc-user"><div class="rc-avatar'+(a?" has-photo":"")+'">'+h+'</div><div><div class="rc-name">'+d(t)+'</div><div class="rc-test">'+d(e.title)+'</div></div></div><div class="rc-score-row"><div class="rc-ring"><svg class="rc-ring-arc" viewBox="0 0 120 120"><circle class="rc-r-bg" cx="60" cy="60" r="'+n+'"></circle><circle class="rc-r-fg" cx="60" cy="60" r="'+n+'" stroke-dasharray="'+s.toFixed(1)+'" stroke-dashoffset="'+i.toFixed(1)+'"></circle></svg><svg class="rc-ring-label" viewBox="0 0 120 120" aria-hidden="true"><text x="60" y="71" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="800" style="'+l+'">'+e.pct+'%</text><text x="60" y="88" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-size="9" font-weight="700" style="'+l+'">'+d(r("share.score"))+'</text></svg></div><div class="rc-msg"><div class="rc-msg-title">'+d(r(e.msgKey))+'</div><div class="rc-msg-sub">'+d(e.correct+" "+r("mock.result.correct")+"  •  "+e.wrong+" "+r("mock.result.wrong")+"  •  "+e.skipped+" "+r("mock.result.skipped"))+'</div></div></div><div class="rc-stats">'+f.map(function(y){return'<div class="rc-stat"><b>'+d(String(y.v))+"</b><span>"+d(y.l)+"</span></div>"}).join("")+'</div><div class="rc-challenge"><div class="rc-challenge-ico">'+zs()+'</div><div><div class="rc-challenge-title">'+d(r("share.challenge"))+'</div><div class="rc-challenge-link">'+d(e.url)+'</div></div></div><div class="rc-foot"><div class="rc-foot-line">'+d(r("share.cardLine1").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{site}",wt+"/"))+'</div><div class="rc-foot-line rc-foot-link">'+d(e.url)+"</div></div>";const x=document.createElement("div");x.className="report-card-holder",x.appendChild(m),document.body.appendChild(x);try{if(await Ct(),!window.html2canvas)throw new Error("html2canvas unavailable");return(await window.html2canvas(m,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#4f46e5"})).toDataURL("image/png")}finally{x.remove()}}function he(e,t){const a=document.createElement("a");a.href=e,a.download=t,document.body.appendChild(a),a.click(),a.remove()}async function Ae(e,t){if(navigator.canShare&&navigator.canShare({files:[e]}))try{return await navigator.share({files:[e],text:t,title:"axomexam Result"}),!0}catch(a){if(a&&a.name==="AbortError")return!0}return!1}async function wa(e){try{await navigator.clipboard.writeText(e),B(r("share.linkCopied"))}catch{const a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select();try{document.execCommand("copy"),B(r("share.linkCopied"))}catch{}a.remove()}}function ka(){const e=Hs();if(!e)return;const t=g("#share-modal");t&&t.remove();const a=document.createElement("div");a.id="share-modal",a.className="read-modal share-modal",a.innerHTML='<div class="read-modal-backdrop"></div><div class="read-modal-box" role="dialog" aria-modal="true"><div class="read-modal-head"><div class="read-modal-titles"><span class="read-modal-title" id="share-modal-title">'+d(r("share.title"))+'</span><span class="read-modal-sub" id="share-modal-sub">'+d(r("share.subtitle"))+'</span></div><button class="read-close" id="share-close" type="button" aria-label="Close">✕</button></div><div class="read-modal-body" id="share-body"><form class="share-form" id="share-form" novalidate><div><label for="share-name">'+d(r("share.nameLabel"))+'</label><input type="text" id="share-name" maxlength="40" autocomplete="name" placeholder="'+d(r("share.namePlaceholder"))+'" /></div><div><label>'+d(r("share.photoLabel"))+'</label><div class="share-photo-row"><div class="share-photo-preview" id="share-photo-preview">'+xa()+'</div><div class="share-photo-actions"><label class="share-file-btn" for="share-photo-input">'+Rs()+" "+d(r("share.photoChoose"))+'</label><input type="file" id="share-photo-input" accept="image/*" hidden /><button type="button" class="share-photo-remove" id="share-photo-remove" hidden>'+d(r("share.photoRemove"))+'</button></div></div></div><div style="display:flex; gap:10px; margin-top:6px;"><button type="button" class="btn btn-outline" id="share-cancel">'+d(r("share.cancel"))+'</button><button type="submit" class="btn btn-primary" id="share-generate">'+d(r("share.generate"))+"</button></div></form></div></div>",document.body.appendChild(a);let n="";const s=()=>a.remove();g("#share-close",a).addEventListener("click",s),g(".read-modal-backdrop",a).addEventListener("click",s),g("#share-cancel",a).addEventListener("click",s);const i=g("#share-photo-input",a),o=g("#share-photo-preview",a),l=g("#share-photo-remove",a);i.addEventListener("change",()=>{const c=i.files&&i.files[0];if(!c)return;const p=new FileReader;p.onload=()=>{n=String(p.result||""),o.innerHTML='<img src="'+n+'" alt="" />',l.hidden=!1},p.readAsDataURL(c)}),l.addEventListener("click",()=>{n="",i.value="",o.innerHTML=xa(),l.hidden=!0}),g("#share-form",a).addEventListener("submit",async c=>{c.preventDefault();const p=g("#share-name",a),h=(p.value||"").trim();if(!h){B(r("share.nameRequired")),p.focus();return}const f=g("#share-generate",a);f.disabled=!0,f.textContent=r("share.generating");let m="";try{m=await Ns(e,h,n)}catch(x){console.error("Report card generation failed:",x),f.disabled=!1,f.textContent=r("share.generate"),B(r("share.error"));return}Gs(a,{S:e,name:h,dataUrl:m})})}function Gs(e,t){const a=t.S,n=t.dataUrl,s=js(a),i="axomexam-report-"+a.pct+"percent.png",o=g("#share-body",e);if(!o)return;const l=(x,y,b,w)=>'<button type="button" class="share-target '+x+'" data-share="'+y+'">'+w+"<span>"+d(r(b))+"</span></button>";o.innerHTML='<img class="share-preview-img" src="'+n+'" alt="'+d(r("share.previewTitle"))+'" /><div class="share-targets">'+l("wa","whatsapp","share.whatsapp",va())+l("fb","facebook","share.facebook",Es())+l("tg","telegram","share.telegram",Ms())+l("tw","twitter","share.twitter",Ts())+l("more","more","share.more",Ls())+l("dl","dl","share.download",Is())+l("copy","copy","share.copy",Ds())+'</div><button type="button" class="btn btn-outline" id="share-back" style="width:100%;">← '+d(r("share.back"))+"</button>";const c=g("#share-modal-title",e);c&&(c.textContent=r("share.previewTitle"));const p=g("#share-modal-sub",e);p&&(p.textContent=r("share.shareNow"));const h=Bs(n);let f=h;try{f=new File([h],i,{type:"image/png"})}catch{f=h}const m=!!(navigator.canShare&&navigator.canShare({files:[f]}));g("#share-back",e).addEventListener("click",()=>{e.remove(),ka()}),P("[data-share]",e).forEach(x=>{x.addEventListener("click",async()=>{const y=x.dataset.share,b=encodeURIComponent;if(y==="whatsapp"){if(m&&await Ae(f,s))return;he(n,i),B(r("share.imageSaved")),window.open("https://wa.me/?text="+b(s),"_blank")}else if(y==="facebook"){if(m&&await Ae(f,s))return;he(n,i),B(r("share.imageSaved")),window.open("https://www.facebook.com/sharer/sharer.php?u="+b(a.url)+"&quote="+b(s),"_blank")}else if(y==="telegram"){if(m&&await Ae(f,s))return;he(n,i),B(r("share.imageSaved")),window.open("https://t.me/share/url?url="+b(a.url)+"&text="+b(s),"_blank")}else if(y==="twitter"){if(m&&await Ae(f,s))return;he(n,i),B(r("share.imageSaved")),window.open("https://twitter.com/intent/tweet?url="+b(a.url)+"&text="+b(s),"_blank")}else if(y==="more"){if(m&&await Ae(f,s))return;he(n,i),await wa(s)}else y==="dl"?(he(n,i),B(r("share.downloaded"))):y==="copy"&&await wa(s)})})}function _s(e){const t={id:"trending",name:{en:"Trending",as:"জনপ্ৰিয়"},color:"#f97316",icon:"↗"};e.forEach(a=>{if(!a||!a.id)return;const n=`trending/${a.id}`,s={path:n,cat:t,sub:null,section:null,topic:a,title:a.title||a.name,desc:a.description,tags:a.tags||[],nQuestions:(a.questions||[]).length,pdf:a.pdf||null,popularity:Number(a.popularity)||0,extra:!0};u.topicMap[n]=s,u.topicIndex.push(s)})}function Ws(){const e="[data-lang],[data-ebklang],[data-exlang],[data-calang]";document.addEventListener("click",t=>{const a=t.target.closest(e);if(!a||a.tagName!=="BUTTON")return;const n=a.getAttribute("data-lang")||a.getAttribute("data-ebklang")||a.getAttribute("data-exlang")||a.getAttribute("data-calang");if(n!=="en"&&n!=="as")return;const s=at();n==="as"&&s||n==="en"&&!s||document.querySelector(`link[rel="alternate"][hreflang="${n}"]`)&&(t.preventDefault(),t.stopPropagation(),window.location.href=nn()+window.location.search+window.location.hash)},!0)}function Qs(){document.addEventListener("click",e=>{const t=e.target.closest("a");if(!t)return;const a=t.getAttribute("href");if(a&&!a.startsWith("/topic/")){if(a.startsWith("#")){const n=a.slice(1);n&&(e.preventDefault(),Be(n,!0));return}if(a.startsWith("/")&&!a.startsWith("//")&&!t.hasAttribute("download")&&t.target!=="_blank"){e.preventDefault();const n=a.indexOf("#");if(n>-1){const s=a.slice(0,n),i=a.slice(n+1),o=window.location.pathname.replace(/\/index\.html$/,"");if(s===o||s===o+"/"||s.replace(/\/$/,"")===o.replace(/\/$/,"")){Be(i,!0);return}je(s),setTimeout(()=>Be(i,!0),0);return}je(a)}}})}async function Ys(){const e=g("#preloader");u.lang=at()?"as":"en";try{const s=localStorage.getItem("axomexam-ui-lang");s?u.uiLang=s:u.uiLang="en"}catch{u.uiLang="en"}document.body.setAttribute("data-lang",u.lang),document.body.setAttribute("data-ui-lang",u.uiLang),Ie(),Zs(),Va();const[t,a,n]=await Promise.all([API.getCategories().catch(s=>(console.error("Failed to load categories:",s),null)),API.getCounts().catch(()=>null),API.getTrendingTopics().catch(s=>(console.error("Failed to load extra trending topics:",s),null))]);t&&Object.assign(u,Ja(t)),a&&Xa(a),n&&_s(n),u.categories.length?(u.ready=!0,Re(),He(),An(),Ka(),Ws(),Qs(),window.addEventListener("popstate",()=>{is()||(Re(),He(),Fe())}),Fe(),ke()):g("#app").innerHTML=`<div class="loader"><p>${r("load.error")}</p></div>`,e&&setTimeout(()=>e.classList.add("done"),350)}function $a(){const e=g("#app");if(!e)return;const t=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readMore"]||"Read More",a=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readLess"]||"Show Less";e.querySelectorAll(".page-desc").forEach(n=>{if(n.dataset.enhanced==="1")return;n.dataset.enhanced="1";const s=n.textContent||"";if(!s.includes(`
`))return;const i=s.split(`
`).map(x=>x.trim()).filter(Boolean);let o="",l=!1;i.forEach(x=>{const y=x.match(/^[•\-*]\s*(.*)$/);y?(l||(o+="<ul>",l=!0),o+="<li>"+d(y[1])+"</li>"):(l&&(o+="</ul>",l=!1),o+="<p>"+d(x)+"</p>")}),l&&(o+="</ul>");const c=document.createElement("div");c.className="page-desc desc-expandable",c.dataset.enhanced="1",c.innerHTML='<div class="desc-inner">'+o+"</div>",n.replaceWith(c);const p=c.querySelector(".desc-inner"),h=parseFloat(getComputedStyle(p).lineHeight)||24,f=Math.round(h*3.2);if(p.scrollHeight<=f)return;p.style.setProperty("--desc-max",f+"px"),c.classList.add("is-collapsed");const m=document.createElement("button");m.type="button",m.className="desc-toggle",m.setAttribute("aria-expanded","false"),m.innerHTML=t+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',m.addEventListener("click",()=>{const x=c.classList.toggle("is-collapsed");p.style.maxHeight="",m.innerHTML=(x?t:a)+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',m.setAttribute("aria-expanded",x?"false":"true")}),c.appendChild(m)})}function Us(){const e=g("#app");if(!e)return;$a(),new MutationObserver(()=>$a()).observe(e,{childList:!0,subtree:!0})}function Vs(){const e=g("#hamburger");if(!e)return;e.addEventListener("click",()=>{const n=g("#mobile-menu");n&&n.classList.contains("open")?xe():Kt()});const t=g("#mobile-backdrop");t&&t.addEventListener("click",xe);const a=g("#mobile-close");a&&a.addEventListener("click",xe),document.addEventListener("keydown",n=>{if(n.key==="Escape"){xe();const s=g("#search-results");s&&(s.hidden=!0)}})}function Ks(e){const t=P("#tabbar .tab-item");let a="home";e[0]==="mock-test"?a="mock":e[0]==="categories"||e[0]==="category"||e[0]==="topic"?a="categories":e[0]==="exams"?a="exams":e[0]==="search"?a="search":e[0]&&e[0]!==""&&(a=""),t.forEach(n=>n.classList.toggle("active",n.dataset.tab===a))}function Js(){const e=g("#tab-menu");e&&e.addEventListener("click",()=>Kt())}function Aa(e){const a=e==="dark"?`
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="12" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `:`
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;P(".theme-toggle").forEach(n=>{n.innerHTML=a,n.style.cssText="display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; border:1px solid var(--border,#e2e8f0); background:var(--bg-subtle,#f8fafc); color:var(--ink,#0f172a); cursor:pointer; padding:0; outline:none; transition:all 0.2s ease;"})}const Ca="axomexam-app-prompt-done";let Sa=!1;function qa(){try{return localStorage.getItem(Ca)==="1"}catch{return!1}}function kt(){Sa=!0;const e=document.getElementById("app-prompt");e&&(e.classList.remove("show"),window.setTimeout(()=>{e&&(e.hidden=!0)},300))}function Xs(){try{localStorage.setItem(Ca,"1")}catch{}kt()}function Pa(){try{if(window.axomexamApp||window.__AXOMEXAM_APP__||window.AxomexamApp)return!0;const e=(navigator.userAgent||"").toLowerCase();if(e.indexOf("axomexam")!==-1||/(^|[;( ])wv([; )]|$)/.test(e))return!0}catch{}return!1}function Zs(){if(Pa()||window.matchMedia&&!window.matchMedia("(max-width: 900px)").matches||qa())return;const e=document.createElement("div");e.id="app-prompt",e.className="app-prompt",e.hidden=!0,e.innerHTML=`
      <a class="app-prompt-link" href="/download-app">
        <img class="app-prompt-icon" src="/app/axomexam-icon.png" alt="" width="40" height="40" />
        <span class="app-prompt-text">
          <b>${d(r("appPrompt.title"))}</b>
          <span>${d(r("appPrompt.msg"))}</span>
        </span>
      </a>
      <button class="app-prompt-close" type="button" aria-label="${d(r("appPrompt.close"))}" title="${d(r("appPrompt.close"))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>`,document.body.appendChild(e),e.querySelector(".app-prompt-close").addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),kt()}),e.querySelector(".app-prompt-link").addEventListener("click",()=>{kt()}),window.setTimeout(()=>{Sa||qa()||(e.hidden=!1,e.classList.add("show"))},5e3)}function eo(){const e=document.documentElement;let t="light";try{t=localStorage.getItem("axomexam-theme")||"light"}catch{}t==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme"),Aa(t);const a=n=>{n==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme");try{localStorage.setItem("axomexam-theme",n)}catch{}Aa(n)};P(".theme-toggle").forEach(n=>{n.dataset.themeBound||(n.dataset.themeBound="1",n.addEventListener("click",()=>{const s=e.getAttribute("data-theme")==="dark";a(s?"light":"dark")}))})}document.addEventListener("DOMContentLoaded",()=>{Vs(),Js(),eo(),Us(),Ys()})})();
