(()=>{"use strict";const u={categories:[],topicMap:{},topicIndex:[],ready:!1,page:0,lang:"as",uiLang:"en",mock:null,isGeneratingPdf:!1,mockSetCache:{},mockSetCount:{},mockLiveCounts:{},exams:null,examQuestionTotal:0,examTotalLoaded:!1,examTotalPromise:null,counts:null,topicsTotal:0,caCounts:null,caQuestionTotal:0,caTotalPromise:null,searchCorpusReady:!1},We=20,wa=5,xt=21,b=(e,t=document)=>t.querySelector(e),M=(e,t=document)=>Array.from(t.querySelectorAll(e));let Se=null,Ee=null,Me=null;function Ye(e,t){return new Promise((a,s)=>{const n=document.createElement("script");let o=!1;const i=c=>{o||(o=!0,clearTimeout(r),n.onload=n.onerror=null,c?(n.parentNode&&n.parentNode.removeChild(n),s(c)):a())},r=setTimeout(()=>i(new Error("Timed out loading "+e)),t||15e3);n.src=e,n.async=!0,n.onload=()=>i(),n.onerror=()=>i(new Error("Failed to load "+e)),document.head.appendChild(n)})}async function yt(e,t){let a=null;for(let s=0;s<e.length;s++)try{await Ye(e[s],t);return}catch(n){a=n}throw a||new Error("Failed to load script")}function ka(e,t){if(document.getElementById(e))return;const a=document.createElement("link");a.id=e,a.rel="stylesheet",a.href=t,document.head.appendChild(a)}function $a(){return typeof window.renderMathInElement=="function"?Promise.resolve():(Me||(ka("katex-css","https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"),Me=Ye("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js").then(()=>Ye("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js")).catch(e=>{throw Me=null,e})),Me)}const Aa=["https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js","https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js","https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"],Ca=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js","https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"];function wt(){return window.html2canvas?Promise.resolve():(Ee||(Ee=yt(Aa,15e3).catch(e=>{throw Ee=null,e})),Ee)}function Sa(){return window.jspdf&&window.html2canvas?Promise.resolve():(Se||(Se=(async()=>{window.html2canvas||await wt(),window.jspdf||await yt(Ca,15e3)})().catch(e=>{throw Se=null,e})),Se)}const Wn=`
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
  `,kt=`
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
  `;function l(e){if(typeof I18N<"u"){const t=I18N[u.uiLang]||I18N.en||I18N.as;if(t&&t[e])return t[e];if(I18N.en&&I18N.en[e])return I18N.en[e]}return e}function v(e){if(e==null)return"";if(typeof e=="string")return e;const t=u.lang||"en";return e[t]||e.en||e.as||""}function W(e){if(e==null)return"";if(typeof e=="string")return e;const t=u.uiLang||"en";return e[t]||e.en||e.as||""}function $t(e){const t=k(e,"en"),a=k(e,"as"),s=a&&a!==t?`<span class="cat-as">${d(a)}</span>`:"";return`<b>${d(t)}</b>${s}`}function Ue(e,t){const a=k(e,"en"),s=k(e,"as"),n=s&&s!==a?`<span class="sub-as">${d(s)}</span>`:"";return`<span style="font-weight:600; font-size:${t}; color:var(--ink,#0f172a);">${d(a)}</span>${n}`}const Ea={gk:"General Knowledge carries a large weight in almost every Assam recruitment examination. It combines Assam-specific history, literature, geography, art and culture with Indian polity, history, geography and economics. Because the section is factual and predictable, consistent revision usually converts into a high, reliable score in ADRE, Assam Police and APSC papers.","assam-history":"Assam History covers the ancient Kamarupa kingdom and its rulers, the medieval Ahom and Koch dynasties, the Burmese invasions and the Treaty of Yandabo, and the colonial and freedom-struggle period. Questions generally test dynasties, capitals, battles, treaties and administrative reforms.","assam-literature":"Assam Literature spans the pre-Vaishnavite period, Sankaradeva and the Vaishnavite age, the Ahom-era chronicles, and the modern era from Arunodoi to Jonaki. Aspirants are asked about authors, works, literary movements and major awards.","indian-history":"Indian History covers ancient civilisations, the Mauryas and Guptas, medieval Sultanates and the Mughals, and the modern freedom movement. Questions focus on timelines, personalities, administrative systems and landmark events.",polity:"Political Science covers the Indian Constitution, fundamental rights and duties, the Union and State machinery, panchayati raj, and Assam-specific provisions such as the Sixth Schedule and Article 371B. It is a high-scoring, factual section.",geography:"Geography covers physical, economic and social geography with dedicated blocks on the rivers, hills, climate and resources of Assam, alongside Indian and world geography. Map-based and location questions are common.",economics:"Economics covers basic economic concepts, Indian economic policy and planning, budgeting and banking, along with the agriculture and industry of Assam. Questions are mostly conceptual and current-affairs linked.","art-culture":"Art and Culture covers the festivals, dance, music, crafts, temples and heritage of Assam and India. Questions test classical dances, musical instruments, festivals, monuments and folk traditions.",math:"Mathematics tests numerical ability and quantitative aptitude and is one of the biggest scoring areas in ADRE, Assam Police, SSC and Railway tests. It brings together arithmetic, advanced math and statistics with data interpretation.",arithmetic:"Arithmetic covers percentages, profit and loss, ratio and proportion, averages, time-speed-distance, time and work, simple and compound interest, and mensuration. These topics carry the largest number of questions in state recruitment papers.","advanced-math":"Advanced Math covers algebra, geometry, trigonometry, number systems and higher-level problem solving. It is especially useful for APSC, SSC and technical posts.","statistics-and-data-interpretation":"Statistics and Data Interpretation covers averages, measures of central tendency, tables, bar and pie charts, and line graphs. The focus is on fast calculation and reading data accurately.",science:"General Science covers Physics, Chemistry and Biology at a Class 6 to 10 level, which is the standard followed by Assam government recruitment tests. Questions test everyday science, definitions, units and simple applications.",physics:"Physics covers motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and the basics of modern physics. Units, definitions and simple numericals are frequently asked.",chemistry:"Chemistry covers matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry. Chemical formulae and common reactions are important.",biology:"Biology covers the human body and its systems, nutrition and health, plants, cell biology, ecology and the environment. Health and disease questions are common in Assam Police and ADRE tests.",reasoning:"Reasoning Ability tests logical and analytical thinking through verbal, non-verbal and critical reasoning questions. Because speed and accuracy decide the score, timed practice is essential.","verbal-reasoning":"Verbal Reasoning covers series, coding-decoding, blood relations, direction sense, analogy and classification. Most questions become quick to solve with regular practice.","analytical-critical-reasoning":"Analytical and Critical Reasoning covers statements and conclusions, assumptions, syllogism, seating arrangement and puzzles. It rewards careful reading over guesswork.","non-verbal-reasoning":"Non-Verbal Reasoning covers figure series, mirror and water images, paper folding, embedded figures and pattern completion. Spatial visualisation is the main skill tested.",english:"General English tests grammar, vocabulary, sentence structure and comprehension. It appears in ADRE, Assam Police, SSC and Railway exams and is relatively easy to score with steady revision.","parts-of-speech":"Parts of Speech covers nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections, and how each of them functions inside a sentence.",grammar:"Grammar covers tenses, articles, subject-verb agreement, active and passive voice, direct and indirect speech, and common error spotting.","sentence-structure":"Sentence Structure covers sentence types, phrases and clauses, sentence correction, and paragraph organisation and ordering.",vocabulary:"Vocabulary covers synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling. Regular reading and short word lists help the most.",computer:"Computer Awareness tests the fundamentals of computers, software and operating systems, MS Office, networking and the internet, cyber security, DBMS and number systems. It is a quick-scoring section in ADRE and other state tests.","fundamentals-hardware":"Computer Fundamentals and Hardware covers input and output devices, memory, storage, the CPU and the generations of computers.","software-os":"Software and Operating Systems covers types of software, the functions of an operating system, file management, and common Windows and Linux features.","ms-office-suite":"MS Office Suite covers Microsoft Word, Excel and PowerPoint, including commonly used menu options, shortcuts and formulas.","networking-internet":"Networking and Internet covers network types and topologies, IP addresses, protocols such as HTTP and FTP, browsers, email and internet services.","cyber-security":"Cyber Security covers online threats such as viruses, malware, phishing and hacking, along with passwords, encryption and safe internet practices.","dbms-number-shortcuts":"DBMS, Number System and Shortcuts covers database basics, number system conversions, and keyboard shortcuts with their common uses.",articles:"Articles are long-form, easy-reading study pieces that explain a topic in depth and in simple bilingual language, so you can build conceptual clarity before attempting questions.","assam-police":"Assam Police previous year papers help you understand the actual question pattern, difficulty level and frequently repeated topics for Sub-Inspector and Constable recruitment conducted by SLPRB.","dhs-dme":"DHS and DME previous year papers cover the question patterns for Directorate of Health Services and Directorate of Medical Education recruitment in Assam.","guwahati-hc":"Guwahati High Court previous year papers cover the pattern for Grade III, Grade IV, Junior Assistant (JAA) and related recruitment under the High Court of Assam.",railway:"Railway previous year papers cover NTPB, Group D, ALP and related central railway recruitment patterns, including the computer-based test structure.",ssc:"SSC previous year papers cover CGL, CHSL, MTS and related central government recruitment patterns, useful for candidates preparing for both central and state posts."},At={gk:"প্ৰায় প্ৰতিটো অসম নিয়োগ পৰীক্ষাত সাধাৰণ জ্ঞানৰ ভাৰ যথেষ্ট বেছি। ইয়াত অসম-নিৰ্দিষ্ট ইতিহাস, সাহিত্য, ভূগোল, কলা-সংস্কৃতিৰ লগতে ভাৰতীয় ৰাজনীতি, ইতিহাস, ভূগোল আৰু অৰ্থনীতি সন্নিৱিষ্ট। শিতানটো তথ্যভিত্তিক আৰু পূৰ্বানুমেয় হোৱাৰ বাবে নিয়মীয়া পুনৰালোচনাই ADRE, অসম আৰক্ষী আৰু APSC ৰ প্ৰশ্নকাকতত উচ্চ আৰু নিৰ্ভৰযোগ্য নম্বৰলৈ ৰূপান্তৰিত হয়।","assam-history":"অসমৰ ইতিহাসত প্ৰাচীন কামৰূপ ৰাজ্য আৰু তাৰ শাসকসকল, মধ্যযুগীয় আহোম আৰু কোচ ৰাজবংশ, বৰ্মী আক্ৰমণ আৰু য়াণ্ডাবু সন্ধি, লগতে উপনিবেশিক আৰু স্বাধীনতা-সংগ্ৰামৰ কাল সামৰি লোৱা হৈছে। প্ৰশ্নত সাধাৰণতে ৰাজবংশ, ৰাজধানী, যুদ্ধ, সন্ধি আৰু প্ৰশাসনিক সংস্কাৰৰ ওপৰত গুৰুত্ব দিয়া হয়।","assam-literature":"অসমীয়া সাহিত্যই প্ৰাক-বৈষ্ণৱ যুগ, শংকৰদেৱ আৰু বৈষ্ণৱ যুগ, আহোম-যুগৰ বুৰঞ্জী, আৰু অৰুণোদয়ৰ পৰা জোনাকীলৈকে আধুনিক যুগ সামৰি লৈছে। প্ৰাৰ্থীসকলক লেখক, ৰচনা, সাহিত্যিক আন্দোলন আৰু প্ৰধান বঁটাৰ বিষয়ে সোধা হয়।","indian-history":"ভাৰতৰ ইতিহাসত প্ৰাচীন সভ্যতা, মৌৰ্য আৰু গুপ্ত, মধ্যযুগীয় চুলতানী আৰু মোগল, আৰু আধুনিক স্বাধীনতা আন্দোলন সামৰি লোৱা হৈছে। প্ৰশ্নত সময়ৰেখা, ব্যক্তিত্ব, প্ৰশাসনিক ব্যৱস্থা আৰু যুগান্তকাৰী ঘটনাৰ ওপৰত গুৰুত্ব দিয়া হয়।",polity:"ৰাজনীতি বিজ্ঞানত ভাৰতীয় সংবিধান, মৌলিক অধিকাৰ আৰু কৰ্তব্য, সংঘ আৰু ৰাজ্যৰ শাসন-ব্যৱস্থা, পঞ্চায়তী ৰাজ, আৰু ষষ্ঠ অনুসূচী তথা অনুচ্ছেদ 371B ৰ দৰে অসম-নিৰ্দিষ্ট বিধান সামৰি লোৱা হৈছে। ই এক উচ্চ নম্বৰ দিয়া, তথ্যভিত্তিক শিতান।",geography:"ভূগোলত ভৌতিক, অৰ্থনৈতিক আৰু সামাজিক ভূগোল সামৰি লোৱা হৈছে, লগতে অসমৰ নদ-নদী, পাহাৰ, জলবায়ু আৰু সম্পদৰ ওপৰত সুকীয়া অংশ, আৰু ভাৰতীয় তথা বিশ্ব ভূগোল। মানচিত্ৰভিত্তিক আৰু স্থান-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",economics:"অৰ্থনীতিত মূল অৰ্থনৈতিক ধাৰণা, ভাৰতীয় অৰ্থনৈতিক নীতি আৰু পৰিকল্পনা, বাজেট আৰু বেংকিং, লগতে অসমৰ কৃষি আৰু উদ্যোগ সামৰি লোৱা হৈছে। প্ৰশ্নবোৰ বেছিভাগ ধাৰণাগত আৰু চলিত ঘটনাৱলীৰ সৈতে সংযুক্ত।","art-culture":"কলা আৰু সংস্কৃতিত অসম আৰু ভাৰতৰ উৎসৱ, নৃত্য, সংগীত, হস্তশিল্প, মন্দিৰ আৰু ঐতিহ্য সামৰি লোৱা হৈছে। প্ৰশ্নত শাস্ত্ৰীয় নৃত্য, সংগীত-যন্ত্ৰ, উৎসৱ, স্মৃতিস্তম্ভ আৰু লোক-পৰম্পৰা পৰীক্ষা কৰা হয়।",math:"গণিতে সংখ্যাগত দক্ষতা আৰু পৰিমাণগত অভিৰুচি পৰীক্ষা কৰে আৰু ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ আটাইতকৈ বেছি নম্বৰ দিয়া ক্ষেত্ৰসমূহৰ এটা। ইয়াত পাটিগণিত, উচ্চ গণিত আৰু তথ্য বিশ্লেষণসহ পৰিসংখ্যা একত্ৰিত কৰা হৈছে।",arithmetic:"পাটিগণিতত শতকৰা, লাভ-লোকচান, অনুপাত আৰু সমানুপাত, গড়, সময়-দূৰত্ব, সময় আৰু কাম, সৰল আৰু যৌগিক সুত, আৰু ক্ষেত্ৰমিতি সামৰি লোৱা হৈছে। ৰাজ্যিক নিয়োগৰ প্ৰশ্নকাকতত এই বিষয়বোৰৰ পৰাই আটাইতকৈ বেছি প্ৰশ্ন আহে।","advanced-math":"উচ্চ গণিতত বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা প্ৰণালী আৰু উচ্চস্তৰৰ সমস্যা সমাধান সামৰি লোৱা হৈছে। ই বিশেষকৈ APSC, SSC আৰু কাৰিকৰী পদৰ বাবে উপযোগী।","statistics-and-data-interpretation":"পৰিসংখ্যা আৰু তথ্য বিশ্লেষণত গড়, কেন্দ্ৰীয় প্ৰৱণতাৰ মাপ, তালিকা, দণ্ড আৰু পাই চিত্ৰ, আৰু ৰৈখিক লেখ সামৰি লোৱা হৈছে। ইয়াৰ মূল লক্ষ্য দ্ৰুত গণনা আৰু তথ্য শুদ্ধভাৱে পঢ়া।",science:"সাধাৰণ বিজ্ঞানত ষষ্ঠৰ পৰা দশম শ্ৰেণীৰ স্তৰত পদাৰ্থ বিজ্ঞান, ৰসায়ন বিজ্ঞান আৰু জীৱ বিজ্ঞান সামৰি লোৱা হৈছে, যি অসম চৰকাৰৰ নিয়োগ পৰীক্ষাত অনুসৰণ কৰা মান। প্ৰশ্নত দৈনন্দিন বিজ্ঞান, সংজ্ঞা, একক আৰু সৰল প্ৰয়োগ পৰীক্ষা কৰা হয়।",physics:"পদাৰ্থ বিজ্ঞানত গতি, বল, কাম আৰু শক্তি, মহাকৰ্ষণ, তাপ, পোহৰ, ধ্বনি, বিদ্যুৎ আৰু চুম্বকত্ব, আৰু আধুনিক পদাৰ্থ বিজ্ঞানৰ মূল কথা সামৰি লোৱা হৈছে। একক, সংজ্ঞা আৰু সৰল সংখ্যাগত প্ৰশ্ন সঘনাই সোধা হয়।",chemistry:"ৰসায়ন বিজ্ঞানত পদাৰ্থ, পৰমাণু আৰু অণু, পৰ্যায়বৃত্ত তালিকা, অম্ল আৰু ক্ষাৰক, ধাতু আৰু অধাতু, আৰু দৈনন্দিন ৰসায়ন সামৰি লোৱা হৈছে। ৰাসায়নিক সংকেত আৰু সাধাৰণ বিক্ৰিয়া গুৰুত্বপূৰ্ণ।",biology:"জীৱ বিজ্ঞানত মানৱ শৰীৰ আৰু তাৰ তন্ত্ৰ, পুষ্টি আৰু স্বাস্থ্য, উদ্ভিদ, কোষ বিজ্ঞান, পৰিৱেশ বিজ্ঞান আৰু পৰিৱেশ সামৰি লোৱা হৈছে। অসম আৰক্ষী আৰু ADRE পৰীক্ষাত স্বাস্থ্য আৰু ৰোগ-সংক্ৰান্ত প্ৰশ্ন সঘনাই আহে।",reasoning:"যুক্তি আৰু মানসিক ক্ষমতাই ভাষিক, চিত্ৰভিত্তিক আৰু বিশ্লেষণাত্মক যুক্তিতৰ্কৰ জৰিয়তে যুক্তি আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে বাবে সময়বদ্ধ অনুশীলন অতি প্ৰয়োজনীয়।","verbal-reasoning":"ভাষিক যুক্তিতৰ্কত শ্ৰেণী, সংকেত-আবোৰণ, ৰক্তসম্পৰ্ক, দিশ-জ্ঞান, সাদৃশ্য আৰু শ্ৰেণীবিভাজন সামৰি লোৱা হৈছে। নিয়মীয়া অনুশীলনৰ লগে লগে বেছিভাগ প্ৰশ্ন দ্ৰুতভাৱে সমাধান কৰিব পৰা যায়।","analytical-critical-reasoning":"বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিতৰ্কত উক্তি আৰু সিদ্ধান্ত, অনুমান, ন্যায়-নিৰ্ণয়, আসন-বিন্যাস আৰু ধাঁধা সামৰি লোৱা হৈছে। ই অনুমানতকৈ সাৱধানে পঢ়াৰ ওপৰত গুৰুত্ব দিয়ে।","non-verbal-reasoning":"চিত্ৰভিত্তিক যুক্তিতৰ্কত চিত্ৰ শ্ৰেণী, দাপোণ আৰু জল প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ আৰু আৰ্হি সম্পূৰ্ণ কৰা সামৰি লোৱা হৈছে। ইয়াত মূলত স্থানিক কল্পনাশক্তি পৰীক্ষা কৰা হয়।",english:"সাধাৰণ ইংৰাজীয়ে ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বুজি-পঢ়াৰ ক্ষমতা পৰীক্ষা কৰে। ই ADRE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাত আহে আৰু নিয়মীয়া পুনৰালোচনাৰে তুলনামূলকভাৱে সহজে নম্বৰ পোৱা যায়।","parts-of-speech":"পদ প্ৰকাৰণত বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া-বিশেষণ, সম্বন্ধবাচক, সংযোজক আৰু আবেগসূচক সামৰি লোৱা হৈছে, আৰু বাক্যত প্ৰতিটোৰ কাৰ্য বৰ্ণনা কৰা হৈছে।",grammar:"ব্যাকৰণত কাল, নিৰ্দেশক, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, প্ৰত্যক্ষ আৰু পৰোক্ষ উক্তি, আৰু সাধাৰণ ভুল চিনাক্তকৰণ সামৰি লোৱা হৈছে।","sentence-structure":"বাক্য গঠনত বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন, আৰু অনুচ্ছেদ সংগঠন আৰু ক্ৰমবিন্যাস সামৰি লোৱা হৈছে।",vocabulary:"শব্দভাণ্ডাৰত সমাৰ্থক শব্দ, বিপৰীত শব্দ, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বাক্যাংশ, আৰু বানান সামৰি লোৱা হৈছে। নিয়মীয়া পঢ়া আৰু চুটি শব্দ-তালিকাই আটাইতকৈ বেছি সহায় কৰে।",computer:"কম্পিউটাৰ সজাগতাই কম্পিউটাৰৰ মূল কথা, ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা প্ৰণালী পৰীক্ষা কৰে। ADRE আৰু অন্যান্য ৰাজ্যিক পৰীক্ষাত ই দ্ৰুত নম্বৰ দিয়া শিতান।","fundamentals-hardware":"কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰত ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ, CPU আৰু কম্পিউটাৰৰ প্ৰজন্ম সামৰি লোৱা হৈছে।","software-os":"ছফ্টৱেৰ আৰু অপাৰেটিং চিষ্টেমত ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং চিষ্টেমৰ কাৰ্য, ফাইল পৰিচালনা, আৰু Windows আৰু Linux ৰ সাধাৰণ বৈশিষ্ট্য সামৰি লোৱা হৈছে।","ms-office-suite":"MS Office Suite ত Microsoft Word, Excel আৰু PowerPoint সামৰি লোৱা হৈছে, লগতে সঘনাই ব্যৱহৃত মেনু বিকল্প, চৰ্টকাট আৰু সূত্ৰ।","networking-internet":"নেটৱৰ্কিং আৰু ইণ্টাৰনেটত নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'পলজি, IP ঠিকনা, HTTP আৰু FTP ৰ দৰে প্ৰট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা সামৰি লোৱা হৈছে।","cyber-security":"চাইবাৰ সুৰক্ষাত ভাইৰাছ, মেলৱেৰ, ফিশ্বিং আৰু হেকিঙৰ দৰে অনলাইন ভাবুকি, লগতে সুৰক্ষিত ইণ্টাৰনেট অভ্যাস সামৰি লোৱা হৈছে।","dbms-number-shortcuts":"DBMS, সংখ্যা প্ৰণালী আৰু চৰ্টকাটত ডাটাবেছৰ মূল কথা, সংখ্যা প্ৰণালীৰ ৰূপান্তৰ, আৰু কীব'ৰ্ড চৰ্টকাট সামৰি লোৱা হৈছে।",articles:"প্ৰবন্ধবোৰ হৈছে দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন ৰচনা যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লৈছে।","assam-police":"অসম আৰক্ষীৰ বিগত বছৰৰ প্ৰশ্নকাকতে প্ৰকৃত প্ৰশ্নৰ আৰ্হি, কঠিনতা আৰু বাৰে বাৰে অহা বিষয়সমূহ বুজিবলৈ সহায় কৰে। এই পৃষ্ঠাৰ পৰা আপুনি প্ৰশ্নকাকত ডাউনলোড কৰি পৰীক্ষাৰ আগতে অনুশীলন কৰিব পাৰে।","dhs-dme":"DHS আৰু DME ৰ বিগত বছৰৰ প্ৰশ্নকাকতে স্বাস্থ্য সেৱা সঞ্চালকালয় (DHS) আৰু চিকিৎসা শিক্ষা সঞ্চালকালয় (DME) ৰ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।","guwahati-hc":"গুৱাহাটী উচ্চ ন্যায়ালয়ৰ বিগত বছৰৰ প্ৰশ্নকাকতে গ্ৰেড III, গ্ৰেড IV, জুনিয়ৰ সহায়ক আৰু অন্যান্য পদৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।",railway:"ৰে'লৱেৰ বিগত বছৰৰ প্ৰশ্নকাকতে NTPC, Group D, ALP আৰু সম্পৰ্কিত কেন্দ্ৰীয় ৰে'লৱে নিয়োগ পৰীক্ষাৰ প্ৰশ্নৰ আৰ্হি সামৰি লৈছে। এই প্ৰশ্নকাকতসমূহে প্ৰকৃত পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে সহায় কৰে।"},Ct={arithmetic:{title:"Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam",meta:"Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.",lead:["Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.","On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."],sections:[{h:"Why arithmetic decides your mathematics score",p:["Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."]},{h:"Arithmetic chapters covered on axomexam",list:["Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.","Percentage — increase and decrease, successive change and percentage-based word problems.","Ratio and Proportion — direct and inverse proportion and division of quantities.","Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.","Average — simple average, weighted average and average age and speed problems.","Time and Work — efficiency, work and wages and pipes and cisterns.","Time, Speed and Distance — relative speed, problems on trains, boats and streams.","Simple and Compound Interest — instalments, growth and depreciation.","Mensuration — area, perimeter, volume and surface area of standard shapes.","Problems on Ages, Partnership and Mixture and Alligation."]},{h:"Most repeated arithmetic chapters in ADRE and Assam Police",p:["Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."]},{h:"How to prepare arithmetic for Assam exams",list:["Learn the formula or short method for a chapter before attempting its questions.","Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.","Keep a formula notebook and revise it for five minutes before each practice session.","Read the explanation for every wrong answer and note the exact reason for the mistake.","Re-attempt the same set after three days and check whether your accuracy has improved.","Take a full timed mock test every week to get used to exam-day pressure."]},{h:"Common mistakes to avoid",list:["Rushing through reading and misreading values such as 'less than' and 'more than'.","Skipping the units and mixing percentages with absolute numbers.","Solving every question the long way instead of using short tricks.","Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."]}],faqs:[{q:"Which arithmetic topics are most important for ADRE 2.0?",a:"Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters."},{q:"How can I improve my speed in arithmetic calculations?",a:"Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it."},{q:"Is arithmetic in Assam Police exams difficult?",a:"No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably."},{q:"Can I practise arithmetic in Assamese on axomexam?",a:"Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages."},{q:"How much time should I give to arithmetic every day?",a:"One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review."},{q:"Is arithmetic practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}]},"non-verbal-reasoning":{title:"Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam",meta:"Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.",lead:["Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.","This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."],sections:[{h:"What non-verbal reasoning actually tests",p:["Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."]},{h:"Non-verbal reasoning chapters covered on axomexam",list:["Image Series — find the next figure by tracking rotation, growth and shading.","Image Analogy — apply the same relationship between a pair of figures.","Image Classification — pick the figure that does not fit the group.","Mirror Images — reflect a figure across a vertical mirror line.","Water Images — reflect a figure across a horizontal water line.","Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.","Embedded Figures — locate a smaller figure hidden inside a larger one.","Completion of Incomplete Pattern — identify the missing piece of a design.","Figure Matrix — follow the row and column logic of a matrix of figures.","Counting of Figures — count triangles, squares or straight lines in a complex figure.","Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.","Rule Detection and Shape Construction."]},{h:"Non-verbal reasoning preparation strategy",list:["Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.","For series questions, check rotation, number of elements, shading and symmetry one by one.","Memorise the dice rule and opposite-face tricks for cube and dice questions.","Solve at least 20 figures a day and note down the rule you missed for each wrong answer.","Use a mirror or folded paper for the first few mirror, water and paper-folding questions.","Attempt figure-based sets in timed blocks to build visual speed."]},{h:"Common mistakes to avoid",list:["Guessing the rule from the first two figures instead of checking it against all figures.","Confusing clockwise and anticlockwise rotation.","Losing track of the number of dots, lines or shaded parts.","Rushing through counting-figures questions, which need a systematic point-by-point count."]}],faqs:[{q:"Is non-verbal reasoning hard to prepare?",a:"No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical."},{q:"Which non-verbal topics are most important for ADRE and Assam Police?",a:"Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently."},{q:"How do I solve cube and dice questions quickly?",a:"Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds."},{q:"Can I practise non-verbal reasoning in Assamese?",a:"Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want."},{q:"How much daily practice does non-verbal reasoning need?",a:"Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning."},{q:"Is non-verbal reasoning practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"verbal-reasoning":{title:"Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam",meta:"Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.",lead:["Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.","This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."],sections:[{h:"Why verbal reasoning is high-scoring",p:["Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."]},{h:"Verbal reasoning chapters covered on axomexam",list:["Analogy — identify the relationship between a given pair of words or numbers.","Classification and Odd One Out — find the item that does not belong to the group.","Number Series, Alphabet Series and Alpha-Numeric Series.","Coding-Decoding — letter, number and symbol based coding rules.","Blood Relations — family trees, generations and coded relationships.","Direction and Distance Test — track movement and find the final direction.","Order and Ranking — arrange people by height, age, marks or position.","Alphabet Test and Word Formation.","Logical Venn Diagrams — decide the correct relationship between sets.","Syllogism — draw valid conclusions from given statements.","Clock and Calendar — angle, hands, odd days and day-of-the-week problems.","Mathematical Operations, Data Sufficiency and Input-Output."]},{h:"Verbal reasoning preparation strategy",list:["Learn the standard rule for each chapter, then solve fifty questions of that chapter.","For series, always check difference, ratio, square, cube and alternating patterns in order.","Draw blood-relation and direction questions on paper instead of solving them mentally.","Memorise the Venn diagram combinations and the odd-days table for calendar questions.","Maintain a log of every question where you guessed, and revise it before the exam.","Practise mixed sets so you learn to switch logic quickly under time pressure."]},{h:"Common mistakes to avoid",list:["Not reading the question carefully — one changed word can change the whole logic.","Assuming extra information that is not given, especially in syllogism.","Mixing up the direction of movement in direction-sense questions.","Spending too long on one puzzle instead of moving on and returning later."]}],faqs:[{q:"Which verbal reasoning topics are most important for ADRE?",a:"Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers."},{q:"Is verbal reasoning easier than non-verbal reasoning?",a:"Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster."},{q:"How do I solve coding-decoding questions quickly?",a:"Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word."},{q:"Can I prepare verbal reasoning in Assamese?",a:"Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading."},{q:"How many reasoning questions should I solve daily?",a:"Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake."},{q:"Is verbal reasoning practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription."}]},"analytical-critical-reasoning":{title:"Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam",meta:"Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.",lead:["Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.","This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."],sections:[{h:"What the analytical and critical section demands",p:["Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."]},{h:"Analytical and critical reasoning chapters covered on axomexam",list:["Seating Arrangement — linear, circular and square arrangements with mixed clues.","Complex Puzzles — floor, box, scheduling, month and category based puzzles.","Inequality — direct and coded inequalities with all possible conclusions.","Statement and Assumptions — identify the implicit assumption behind a statement.","Statement and Conclusions — decide which conclusion logically follows.","Statement and Arguments — judge the strength of arguments for and against.","Statement and Course of Action — choose the most practical response.","Cause and Effect — separate the cause from the effect.","Assertion and Reason — evaluate the link between an assertion and its reason.","Decision Making, Drawing Inferences and Data Sufficiency."]},{h:"Analytical and critical reasoning preparation strategy",list:["For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.","Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.","For assumption and conclusion questions, separate what is stated from what is only implied.","Practise puzzles of increasing difficulty instead of jumping straight to complex sets.","Review the full solution even when your answer was correct, to confirm the reasoning.","Attempt one full puzzle set under a timer every day to build stamina."]},{h:"Common mistakes to avoid",list:["Adding real-world knowledge that is not part of the given passage.","Assuming a conclusion is valid when it is only probably true.","Making a single wrong placement early in a puzzle and then continuing with it.","Spending a large amount of time on one puzzle and losing easy marks elsewhere."]}],faqs:[{q:"Are puzzles and seating arrangement important for ADRE?",a:"Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers."},{q:"How do I improve in statement and conclusion questions?",a:"Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid."},{q:"What is the difference between assumption and conclusion?",a:"An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information."},{q:"How much time should I spend on one puzzle?",a:"If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions."},{q:"Can I practise analytical reasoning in Assamese?",a:"Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer."},{q:"Is analytical reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},science:{title:"General Science Questions for ADRE, Assam Police and SSC | axomexam",meta:"Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.",lead:["General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.","On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."],sections:[{h:"Which science questions are asked",p:["Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."]},{h:"Science chapters covered on axomexam",list:["Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.","Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.","Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."]},{h:"Most repeated science topics in Assam exams",list:["Units and measurements of physical quantities.","Human body systems, especially the digestive, circulatory and nervous systems.","Vitamins, their sources and deficiency diseases.","Common chemical formulae and everyday chemical reactions.","Scientific names, plant and animal classification.","Environment, pollution and ecological terms."]},{h:"General science preparation strategy",list:["Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.","Make short notes of definitions, units and formulae — these are asked directly.","Memorise common abbreviations, vitamins and deficiency diseases in table form.","Practise physics numericals separately, since they need formula application.","Revise the diagrams of important systems and experiments.","Attempt a mixed science set every week to check retention."]},{h:"Common mistakes to avoid",list:["Skipping Biology as 'easy' and losing direct-mark questions.","Confusing units and symbols of similar physical quantities.","Studying from too many sources instead of mastering one standard textbook.","Ignoring everyday-science questions that are based on daily-life observations."]}],faqs:[{q:"What is the standard of science questions in ADRE and Assam Police?",a:"Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus."},{q:"Which science subject is most important for Assam exams?",a:"All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry."},{q:"Do I need to memorise formulas for general science?",a:"Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual."},{q:"Can I study general science in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"How should I revise science before the exam?",a:"Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat."},{q:"Is general science practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},english:{title:"General English Grammar and Vocabulary for ADRE, Assam Police | axomexam",meta:"Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.",lead:["General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.","On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."],sections:[{h:"What general English tests",p:["The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."]},{h:"English chapters covered on axomexam",list:["Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.","Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.","Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.","Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."]},{h:"Most repeated English topics",list:["Subject-verb agreement and common error spotting.","Tenses and their correct usage.","Prepositions and articles.","Synonyms, antonyms and one-word substitutions.","Idioms and phrases with their meanings.","Fill in the blanks and cloze tests."]},{h:"General English preparation strategy",list:["Revise one grammar rule at a time and then solve twenty questions on it.","Read one short passage daily and note unfamiliar words with their meanings.","Learn five new words, five synonyms and three idioms every day.","Practise error-spotting by reading a sentence as a whole before choosing an option.","Revise the rules of articles, prepositions and subject-verb agreement most often.","Attempt a full English set weekly to track your accuracy."]},{h:"Common mistakes to avoid",list:["Choosing an option because it 'sounds correct' instead of applying the rule.","Ignoring articles and prepositions, which are asked every year.","Learning words without usage or example sentences.","Reading the entire comprehension passage before looking at the questions."]}],faqs:[{q:"Is general English easy to score in ADRE?",a:"Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section."},{q:"Which grammar topics are most important?",a:"Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often."},{q:"How can I improve my vocabulary quickly?",a:"Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly."},{q:"Can I study English in Assamese on axomexam?",a:"The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern."},{q:"Is comprehension asked in these exams?",a:"Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions."},{q:"Is general English practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},articles:{title:"Study Articles and Notes for Assam Competitive Exams | axomexam",meta:"Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.",lead:["Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.","The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."],sections:[{h:"How to use the articles section",p:["Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."]},{h:"Article categories available",list:["General Knowledge — Assam history, literature, geography, polity, economy and art and culture.","Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.","General Science — physics, chemistry and biology topics in everyday language.","Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.","General English — grammar rules, vocabulary building and common error patterns.","Computer Awareness — fundamentals, software, MS Office, networking and cyber security."]},{h:"How articles help your exam preparation",list:["They explain the 'why' behind a rule, which helps you apply it to new questions.","They are ideal revision material in the final weeks before the exam.","They connect theory with solved examples from previous papers.","They build the reading habit needed for comprehension and general awareness."]},{h:"Tips to get the most from study articles",list:["Read with a pen and note down key points and formulas.","Attempt the linked practice set immediately after reading.","Revisit the article after a week to test your retention.","Use the bilingual view to strengthen terminology in both English and Assamese."]}],faqs:[{q:"What kind of articles are published on axomexam?",a:"Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams."},{q:"Are the articles useful for ADRE and APSC?",a:"Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers."},{q:"Should I read articles before or after practice questions?",a:"Read the article first to understand the concept, then attempt the linked practice set and review your mistakes."},{q:"Are the articles available in Assamese?",a:"The content is designed to support both Assamese and English readers, and the key terms are explained in both languages."},{q:"How often are new articles added?",a:"New articles are added regularly, so check the page again as you progress through your syllabus."},{q:"Is the articles section free to use?",a:"Yes. Every article and study resource on axomexam.in is completely free with no login or subscription."}]},math:{title:"Mathematics for ADRE, APSC and Assam Police Exams | axomexam",meta:"Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.",lead:["Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.","On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."],sections:[{h:"Why mathematics matters in Assam exams",p:["Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."]},{h:"Mathematics sections covered on axomexam",list:["Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.","Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.","Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."]},{h:"Mathematics preparation strategy",list:["Master the basics of a chapter before moving to its advanced questions.","Learn and apply short tricks instead of solving every question the long way.","Practise with a timer to build the speed the exam demands.","Keep a formula notebook and revise it regularly.","Analyse every wrong answer to find whether the mistake was conceptual or careless.","Take a full maths mock test every week and track your accuracy."]},{h:"Common mistakes to avoid",list:["Attempting advanced questions without clear basics.","Ignoring data interpretation, which offers easy marks for careful readers.","Making calculation errors under time pressure because of skipped approximation practice.","Not practising enough variety of question types."]}],faqs:[{q:"Which mathematics topics are most important for ADRE?",a:"Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks."},{q:"Is advanced math needed for Assam Police and ADRE?",a:"Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math."},{q:"How can I increase my calculation speed?",a:"Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets."},{q:"How much time should I spend on mathematics daily?",a:"One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests."},{q:"Can I practise mathematics in Assamese?",a:"Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English."},{q:"Is mathematics practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},reasoning:{title:"Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam",meta:"Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.",lead:["Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.","Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."],sections:[{h:"Why reasoning is a high-scoring section",p:["Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."]},{h:"Reasoning branches covered on axomexam",list:["Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.","Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.","Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."]},{h:"Reasoning preparation strategy",list:["Learn the rule for a chapter, then solve a set of at least twenty questions on it.","Draw diagrams for arrangements, blood relations and directions instead of solving mentally.","Practise mixed sets to get used to switching logic quickly.","Time every set so that speed improves along with accuracy.","Review wrong answers immediately and note the rule you missed.","Attempt a full reasoning mock test every week."]},{h:"Common mistakes to avoid",list:["Guessing the logic instead of checking it against every part of the question.","Getting stuck on a single puzzle while easier questions wait.","Ignoring non-verbal reasoning because it looks unfamiliar.","Not practising enough variety, so unfamiliar patterns feel difficult in the exam."]}],faqs:[{q:"How many reasoning questions come in ADRE and Assam Police?",a:"The reasoning section usually carries between 15 and 25 questions depending on the post and paper."},{q:"Which reasoning branch is most important?",a:"All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning."},{q:"How can I improve reasoning speed?",a:"Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time."},{q:"Is reasoning difficult for beginners?",a:"No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly."},{q:"Can I prepare reasoning in Assamese?",a:"Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading."},{q:"Is reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},computer:{title:"Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam",meta:"Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.",lead:["Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.","On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."],sections:[{h:"What computer awareness covers",p:["The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."]},{h:"Computer chapters covered on axomexam",list:["Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.","Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.","MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.","Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.","Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.","DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."]},{h:"Most repeated computer topics in Assam exams",list:["Generations of computers and their characteristics.","Input, output and storage devices with examples.","Keyboard shortcuts for common operations.","Basic MS Word and MS Excel functions and formulas.","Full forms of common computer abbreviations.","Types of computer viruses and cyber safety tips."]},{h:"Computer awareness preparation strategy",list:["Make a one-page list of full forms and abbreviations and revise it daily.","Learn the keyboard shortcuts by actually using them on a computer.","Prepare a small table of input, output and storage devices.","Practise basic Excel formulas and Word menu options.","Revise number system conversions with a few examples each.","Attempt a chapter-wise set after studying each topic."]},{h:"Common mistakes to avoid",list:["Ignoring the topic because it seems easy, and then forgetting the full forms.","Mixing up similar terms such as RAM and ROM, or hardware and software.","Not practising shortcuts, which are asked directly every year.","Studying advanced topics while the basics remain unclear."]}],faqs:[{q:"Is computer awareness asked in ADRE and Assam Police?",a:"Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual."},{q:"How much time is needed to prepare computer awareness?",a:"A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual."},{q:"Which computer topics are most important?",a:"Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often."},{q:"Do I need a computer to prepare this section?",a:"A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device."},{q:"Can I study computer awareness in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"Is computer awareness practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]}},Ma={arithmetic:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে গণিতৰ প্ৰশ্ন আৰু চুটি কৌশল | axomexam",meta:"ADRE 2.0, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া গণিত অনুশীলন। শতাংশ, লাভ-ক্ষতি, অনুপাত, গড়, সময় আৰু কাম, SI আৰু CI — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["প্ৰায় প্ৰতিটো অসম চৰকাৰী নিযুক্তি পৰীক্ষাৰ পৰিমাণাত্মক যোগ্যতা শিতানৰ মূল ভেটি হৈছে গণিত। ADRE গ্ৰেড ৩ আৰু গ্ৰেড ৪, অসম আৰক্ষী কনষ্টেবল আৰু চাব-ইন্সপেক্টৰ, APSC CCE, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয়, SSC আৰু ৰে'লৱেৰ প্ৰশ্নকাকতত একেই মূল গণিত অধ্যায়বোৰ পৰীক্ষা কৰা হয়, আৰু এই প্ৰশ্নবোৰেই প্ৰায়ে নিৰ্ধাৰণ কৰে এজন প্ৰাৰ্থীয়ে কাট-অফ পাৰ কৰিব নে নাই।","axomexam ত বিষয়টো অধ্যায় অনুসৰি সজোৱা হৈছে, যাতে আপুনি ধাপে ধাপে গতি আৰু শুদ্ধতা গঢ়ি তুলিব পাৰে। প্ৰতিটো বিষয় ইংৰাজী আৰু অসমীয়াত সমাধানৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি বেলেগ বেলেগ উত্তৰ মনত ৰখাৰ পৰিৱৰ্তে পৰীক্ষকে বিচৰা সঠিক পদ্ধতিটো শিকে।"],sections:[{h:"কিয় গণিতেই আপোনাৰ নম্বৰ নিৰ্ধাৰণ কৰে",p:["অসমৰ নিযুক্তি প্ৰশ্নকাকতত সংখ্যাগত ক্ষমতাই সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন বহন কৰে আৰু সেই অংশৰ আটাইতকৈ ডাঙৰ ভাগটো গণিতেই। প্ৰশ্নবোৰ সূত্ৰভিত্তিক আৰু পুনৰাবৃত্তিমূলক, যাৰ অৰ্থ হ'ল এজন ভালদৰে অনুশীলন কৰা প্ৰাৰ্থীয়ে ইয়াক দ্ৰুতভাৱে সমাধান কৰি নিৰ্ভৰযোগ্যভাৱে নম্বৰ পাব পাৰে। ৰাজ্যিক আৰু কেন্দ্ৰীয় পৰীক্ষাত একেই অধ্যায়বোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতৰ এটা ভাল প্ৰস্তুতিয়ে একেসময়তে কেইবাটাও পৰীক্ষাত লাভ দিয়ে।"]},{h:"axomexam ত সামৰি লোৱা গণিতৰ অধ্যায়বোৰ",list:["সংখ্যা পদ্ধতি আৰু সৰলীকৰণ — বিভাজ্যতাৰ নিয়ম, HCF, LCM, ভাগশেষ, কৰণী আৰু দ্ৰুত গণনা।","শতাংশ — বৃদ্ধি আৰু হ্ৰাস, ক্ৰমিক পৰিৱৰ্তন আৰু শতাংশভিত্তিক শব্দ সমস্যা।","অনুপাত আৰু সমানুপাত — প্ৰত্যক্ষ আৰু ব্যস্ত সমানুপাত আৰু ৰাশিৰ ভাগ।","লাভ, ক্ষতি আৰু ৰেহাই — ক্ৰয়মূল্য, বিক্ৰয়মূল্য, চিহ্নিত মূল্য, ক্ৰমিক ৰেহাই আৰু অসাধু ব্যৱসায়ীৰ সমস্যা।","গড় — সৰল গড়, ভাৰিত গড় আৰু গড় বয়স তথা গড় বেগৰ সমস্যা।","সময় আৰু কাম — দক্ষতা, কাম আৰু মজুৰি, আৰু নল আৰু চৌবাচ্চা।","সময়, বেগ আৰু দূৰত্ব — আপেক্ষিক বেগ, ৰে'লৰ সমস্যা, নাৱ আৰু সোঁত।","সৰল আৰু চক্ৰবৃদ্ধি সুত — কিস্তি, বৃদ্ধি আৰু অৱক্ষয়।","ক্ষেত্ৰমিতি — প্ৰামাণ্য আকৃতিৰ কালি, পৰিসীমা, আয়তন আৰু পৃষ্ঠকালি।","বয়স, ভাগীদাৰী আৰু মিশ্ৰণ তথা এ্যালিগেচনৰ সমস্যা।"]},{h:"ADRE আৰু অসম আৰক্ষীত সৰ্বাধিক পুনৰাবৃত্তি হোৱা অধ্যায়বোৰ",p:["বিগত প্ৰশ্নকাকতৰ ভিত্তিত তলৰ অধ্যায়বোৰ বাৰে বাৰে আহে আৰু ইয়াক অতিৰিক্তভাৱে পুনৰাবৃত্তি কৰা উচিত: শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত, আৰু ক্ষেত্ৰমিতি। যদি সময় কম, তেন্তে প্ৰথমে এই আঠটা আয়ত্ত কৰক।"]},{h:"অসম পৰীক্ষাৰ বাবে গণিত কেনেদৰে প্ৰস্তুতি কৰিব",list:["এটা অধ্যায়ৰ প্ৰশ্ন কৰাৰ আগতে তাৰ সূত্ৰ বা চুটি পদ্ধতি শিকক।","প্ৰতিদিনে প্ৰতিটো বিষয়ৰ ১৫ৰ পৰা ২০ টা প্ৰশ্ন সমাধান কৰক আৰু ষ্টপৱাচ লৈ নিজৰ সময় জুখক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু প্ৰতিটো অনুশীলনৰ আগতে পাঁচ মিনিট পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু ভুলৰ সঠিক কাৰণটো টুকি লওক।","তিনি দিনৰ পিছত একেই ছেট আকৌ চেষ্টা কৰক আৰু আপোনাৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।","পৰীক্ষাৰ দিনৰ চাপৰ অভ্যাস কৰিবলৈ সপ্তাহে এটা সম্পূৰ্ণ সময়বদ্ধ মক টেষ্ট লওক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["খৰখেদাকৈ পঢ়ি 'কম' আৰু 'বেছি'ৰ দৰে মান ভুলকৈ পঢ়া।","একক এৰি দিয়া আৰু শতাংশক নিৰপেক্ষ সংখ্যাৰ সৈতে মিহলাই পেলোৱা।","চুটি কৌশল ব্যৱহাৰ নকৰি প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান কৰা।","কঠিন যেন লাগে বুলি ক্ষেত্ৰমিতি এৰি দিয়া — ই আটাইতকৈ অনুমানযোগ্য অধ্যায়বোৰৰ এটা।"]}],faqs:[{q:"ADRE 2.0 ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"শতাংশ, লাভ-ক্ষতি, অনুপাত আৰু সমানুপাত, গড়, সময় আৰু কাম, সময়-বেগ-দূৰত্ব, সৰল আৰু চক্ৰবৃদ্ধি সুত আৰু ক্ষেত্ৰমিতিয়ে সৰ্বাধিক নম্বৰ বহন কৰে। কমকৈ সোধা অধ্যায়বোৰৰ আগতে এইবোৰ অনুশীলন কৰক।"},{q:"গণিতৰ গণনাত মই মোৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"২০ লৈকে নামতা, ৩০ লৈকে বৰ্গ আৰু শতাংশৰ পৰা ভগ্নাংশলৈ ৰূপান্তৰ ব্যৱহাৰ কৰক। টাইমাৰ লৈ অনুশীলন কৰক আৰু য'ত বিকল্পই অনুমতি দিয়ে ত'ত আসন্ন মান ব্যৱহাৰ কৰক।"},{q:"অসম আৰক্ষীৰ পৰীক্ষাত গণিত কঠিন নেকি?",a:"নহয়। অসম আৰক্ষীৰ গণিত মানক আৰ্হিৰ ওচৰতেই থাকে। নিয়মীয়া অনুশীলন আৰু সঠিক ভেটিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে সম্পূৰ্ণ শিতানটো আৰামেৰে কৰিব পাৰে।"},{q:"axomexam ত অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। আপুনি যিকোনো সময়তে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।"},{q:"প্ৰতিদিনে গণিতক কিমান সময় দিয়া উচিত?",a:"বেছিভাগ প্ৰাৰ্থীৰ বাবে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট। প্ৰথম ২০ মিনিট সূত্ৰত আৰু বাকীখিনি সময়বদ্ধ প্ৰশ্ন তথা ভুল পৰ্যালোচনাত খৰচ কৰক।"},{q:"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।"}]},"non-verbal-reasoning":{title:"ADRE আৰু APSC ৰ বাবে উত্তৰসহ অ-মৌখিক যুক্তি প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে অ-মৌখিক যুক্তি অনুশীলন। চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, ঘনক আৰু পাশা।",lead:["অ-মৌখিক যুক্তিয়ে জুখে আপুনি চিত্ৰ, আৰ্হি, আকৃতি আৰু স্থানিক বিন্যাসৰ দৰে দৃশ্যমান তথ্য কিমান দ্ৰুতভাৱে পঢ়িব পাৰে। ই ভাষা বা শব্দভাণ্ডাৰৰ ওপৰত নিৰ্ভৰ নকৰে, গতিকে নম্বৰ সম্পূৰ্ণৰূপে আপোনাৰ পৰ্যবেক্ষণ শক্তি আৰু অনুশীলনৰ ওপৰত নিৰ্ধাৰিত হয়।","এই শিতান ADRE, অসম আৰক্ষী, APSC CCE, SSC, ৰে'লৱে আৰু বহু অন্য নিযুক্তি পৰীক্ষাত আহে। axomexam ত প্ৰতিটো অধ্যায় স্পষ্ট দৃশ্যমান ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো চিত্ৰৰ পিছৰ নিয়মটো দ্ৰুতভাৱে ধৰা পেলাবলৈ চকু প্ৰশিক্ষণ দিব পাৰে।"],sections:[{h:"অ-মৌখিক যুক্তিয়ে প্ৰকৃততে কি পৰীক্ষা কৰে",p:["প্ৰতিটো প্ৰশ্নই এটা ক্ৰম বা চিত্ৰৰ এটা গোট দেখুৱায় আৰু আপোনাক পৰৱৰ্তী চিত্ৰ, অদ্ভুত চিত্ৰ বা লুকাই থকা চিত্ৰ বিচাৰিবলৈ কয়। অন্তৰ্নিহিত নিয়মটোত ঘূৰ্ণন, প্ৰতিফলন, অংশ যোগ বা বাদ, ছাঁ দিয়া, বা উপাদানৰ গতি জড়িত থাকিব পাৰে। এবাৰ নিয়মটো চিনি পোৱাৰ পিছত উত্তৰটো প্ৰায় যান্ত্ৰিকভাৱে আহে — সেয়ে এই শিতানটো অতি উচ্চ-নম্বৰ হ'ব পাৰে।"]},{h:"axomexam ত সামৰি লোৱা অ-মৌখিক যুক্তিৰ অধ্যায়বোৰ",list:["চিত্ৰ শ্ৰেণী — ঘূৰ্ণন, বৃদ্ধি আৰু ছাঁ ট্ৰেক কৰি পৰৱৰ্তী চিত্ৰ বিচাৰক।","চিত্ৰ সাদৃশ্য — চিত্ৰৰ এযোৰৰ মাজৰ একেই সম্পৰ্ক প্ৰয়োগ কৰক।","চিত্ৰ শ্ৰেণীবিভাগ — গোটত নিমিলা চিত্ৰটো বাছনি কৰক।","দাপোনৰ প্ৰতিবিম্ব — উলম্ব দাপোন ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","পানীৰ প্ৰতিবিম্ব — অনুভূমিক পানী ৰেখাৰ ওপৰত চিত্ৰটো প্ৰতিফলিত কৰক।","কাগজ ভাঁজ আৰু কাগজ কটা — মেলি দিয়াৰ পিছত ফুটাৰ আৰ্হিটো কল্পনা কৰক।","অন্তৰ্নিহিত চিত্ৰ — ডাঙৰ চিত্ৰ এটাত লুকাই থকা সৰু চিত্ৰটো বিচাৰক।","অসম্পূৰ্ণ আৰ্হিৰ সম্পূৰ্ণতা — এটা আৰ্হিৰ নোহোৱা টুকুৰাটো চিনি পেলাওক।","চিত্ৰ মেট্ৰিক্স — চিত্ৰৰ মেট্ৰিক্স এটাৰ শাৰী আৰু স্তম্ভৰ যুক্তি অনুসৰণ কৰক।","চিত্ৰ গণনা — এটা জটিল চিত্ৰত ত্ৰিভুজ, বৰ্গ বা সৰল ৰেখা গণনা কৰক।","ঘনক আৰু পাশা — ৰঙ কৰা ঘনক, পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ সমস্যা সমাধান কৰক।","নিয়ম চিনাক্তকৰণ আৰু আকৃতি নিৰ্মাণ।"]},{h:"অ-মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো অধ্যায় চিত্ৰ নিজে আঁকি অনুশীলন কৰক; চকুৰ দৰেই হাতেও আৰ্হিটো শিকে।","শ্ৰেণীৰ প্ৰশ্নৰ বাবে এটা এটাকৈ ঘূৰ্ণন, উপাদানৰ সংখ্যা, ছাঁ আৰু প্ৰতিসমতা পৰীক্ষা কৰক।","ঘনক আৰু পাশাৰ প্ৰশ্নৰ বাবে পাশাৰ নিয়ম আৰু বিপৰীত পৃষ্ঠৰ কৌশল মনত ৰাখক।","প্ৰতিদিনে অন্ততঃ ২০ টা চিত্ৰ সমাধান কৰক আৰু প্ৰতিটো ভুল উত্তৰৰ বাবে হেৰুওৱা নিয়মটো টুকি লওক।","প্ৰথম কেইটা দাপোন, পানী আৰু কাগজ ভাঁজৰ প্ৰশ্নৰ বাবে এখন দাপোন বা ভাঁজ কৰা কাগজ ব্যৱহাৰ কৰক।","দৃশ্যমান গতি গঢ়িবলৈ চিত্ৰভিত্তিক ছেট সময়বদ্ধ খণ্ডত চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["সকলো চিত্ৰৰ সৈতে পৰীক্ষা নকৰি প্ৰথম দুটা চিত্ৰৰ পৰা নিয়ম অনুমান কৰা।","ঘড়ীৰ কাঁটাৰ দিশ আৰু বিপৰীত দিশ লৈ খেলিমেলি কৰা।","বিন্দু, ৰেখা বা ছাঁ দিয়া অংশৰ সংখ্যাৰ হিচাপ হেৰুওৱা।","চিত্ৰ গণনাৰ প্ৰশ্নত খৰখেদা কৰা, যিবোৰত পদ্ধতিগতভাৱে বিন্দু-বিন্দু গননা প্ৰয়োজন।"]}],faqs:[{q:"অ-মৌখিক যুক্তি প্ৰস্তুতি কৰা কঠিন নেকি?",a:"নহয়। ই প্ৰতিভাতকৈ ধাৰাবাহিক অনুশীলনক পুৰস্কৃত কৰে। এবাৰ মানক নিয়মৰ প্ৰকাৰবোৰ শিকিলে বেছিভাগ প্ৰশ্ন দ্ৰুত আৰু যান্ত্ৰিক হৈ পৰে।"},{q:"ADRE আৰু অসম আৰক্ষীৰ বাবে কোনবোৰ অ-মৌখিক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"চিত্ৰ শ্ৰেণী, সাদৃশ্য, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ আৰু চিত্ৰ গণনা সৰ্বাধিক বাৰে সোধা হয়।"},{q:"ঘনক আৰু পাশাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"সংলগ্ন আৰু বিপৰীত পৃষ্ঠৰ বাবে পাশাৰ নিয়ম আৰু ৰঙ কৰা ঘনকৰ বাবে গণনাৰ নিয়ম শিকক। এই দুটা পদ্ধতিৰে বেছিভাগ প্ৰশ্ন কেইছেকেণ্ডতে সমাধান কৰিব পাৰি।"},{q:"মই অসমীয়াত অ-মৌখিক যুক্তি অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে আৰু যেতিয়া বিচাৰে সলনি কৰিব পাৰে।"},{q:"অ-মৌখিক যুক্তিৰ বাবে দৈনিক কিমান অনুশীলন প্ৰয়োজন?",a:"প্ৰতিদিনে বিশৰ পৰা ত্ৰিশটা চিত্ৰ যথেষ্ট। দৃশ্যমান যুক্তিৰ বাবে নিয়মীয়া চুটি অৱস্থান মাজে মাজে দীঘল অৱস্থানতকৈ ভাল কাম কৰে।"},{q:"axomexam ত অ-মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"verbal-reasoning":{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে মৌখিক যুক্তি প্ৰশ্ন আৰু অনুশীলন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া মৌখিক যুক্তি অনুশীলন। সাদৃশ্য, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।",lead:["মৌখিক যুক্তিয়ে পৰীক্ষা কৰে আপুনি শব্দ, সংখ্যা আৰু আখৰৰ আৰ্হি কিমান ভালদৰে বিচাৰি পায় আৰু এটা বিবৃতিৰ সংহতি কিমান যুক্তিসংগতভাৱে অনুসৰণ কৰিব পাৰে। যুক্তিৰ শিতানৰ আটাইতকৈ নিৰ্ভৰযোগ্য নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা, কাৰণ আৰ্হিবোৰ বছৰৰ পিছত বছৰ পুনৰাবৃত্তি হয়।","এই পৃষ্ঠাই ADRE, অসম আৰক্ষী, APSC CCE, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে সম্পূৰ্ণ মৌখিক যুক্তিৰ পাঠ্যক্ৰম সামৰি লয়। প্ৰতিটো অধ্যায় ধাপে ধাপে দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত, যাতে আপুনি প্ৰতিটো উত্তৰৰ পিছৰ যুক্তিটো বুজি পায়।"],sections:[{h:"কিয় মৌখিক যুক্তি উচ্চ-নম্বৰ",p:["বেছিভাগ মৌখিক যুক্তি প্ৰশ্নই এক নিৰ্দিষ্ট নিয়মৰ গোট অনুসৰণ কৰে — বিগত প্ৰশ্নকাকতত অহা একেই যুক্তি। বিশেষকৈ সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ আৰু শ্ৰেণী মুষ্টিমেয় কৌশলৰে আয়ত্ত কৰিব পাৰি। এবাৰ নিয়মবোৰ স্পষ্ট হ'লে এই প্ৰশ্নবোৰে কম সময় লয় আৰু কেতিয়াও ভুল নহয়।"]},{h:"axomexam ত সামৰি লোৱা মৌখিক যুক্তিৰ অধ্যায়বোৰ",list:["সাদৃশ্য — শব্দ বা সংখ্যাৰ এযোৰৰ মাজৰ সম্পৰ্ক চিনি পেলাওক।","শ্ৰেণীবিভাগ আৰু অদ্ভুত এটাক বাছনি কৰা — গোটত নিমিলা বস্তুটো বিচাৰক।","সংখ্যা শ্ৰেণী, বৰ্ণমালা শ্ৰেণী আৰু বৰ্ণ-সংখ্যা শ্ৰেণী।","সংকেত-অৱগুঞ্জন — আখৰ, সংখ্যা আৰু সংকেতভিত্তিক সংকেতৰ নিয়ম।","ৰক্তসম্পৰ্ক — পৰিয়াল বৃক্ষ, প্ৰজন্ম আৰু সংকেতযুক্ত সম্পৰ্ক।","দিশ আৰু দূৰত্ব পৰীক্ষা — গতি ট্ৰেক কৰক আৰু চূড়ান্ত দিশ বিচাৰক।","ক্ৰম আৰু স্থান — উচ্চতা, বয়স, নম্বৰ বা অৱস্থান অনুসৰি মানুহ সজাওক।","বৰ্ণমালা পৰীক্ষা আৰু শব্দ গঠন।","যুক্তিসংগত ভেন ডায়াগ্ৰাম — গোটৰ মাজৰ সঠিক সম্পৰ্ক নিৰ্ণয় কৰক।","ন্যায়বাক্য — দিয়া বিবৃতিবোৰৰ পৰা বৈধ সিদ্ধান্ত উলিয়াওক।","ঘড়ী আৰু পঞ্জিকা — কোণ, কাঁটা, অদ্ভুত দিন আৰু সপ্তাহৰ দিনৰ সমস্যা।","গাণিতিক কাৰ্য, তথ্য পৰ্যাপ্ততা আৰু ইনপুট-আউটপুট।"]},{h:"মৌখিক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো অধ্যায়ৰ মানক নিয়ম শিকক, তাৰ পিছত সেই অধ্যায়ৰ পঞ্চাশটা প্ৰশ্ন সমাধান কৰক।","শ্ৰেণীৰ বাবে সদায় ক্ৰমে পাৰ্থক্য, অনুপাত, বৰ্গ, ঘনক আৰু পৰ্যায়ক্ৰমে সলনি হোৱা আৰ্হি পৰীক্ষা কৰক।","ৰক্তসম্পৰ্ক আৰু দিশৰ প্ৰশ্ন মনত সমাধান নকৰি কাগজত আঁকক।","ভেন ডায়াগ্ৰামৰ সংযোগ আৰু পঞ্জিকাৰ প্ৰশ্নৰ বাবে অদ্ভুত দিনৰ তালিকা মনত ৰাখক।","য'ত অনুমান কৰিছে তেনে প্ৰতিটো প্ৰশ্নৰ এখন লগ ৰাখক আৰু পৰীক্ষাৰ আগতে পুনৰাবৃত্তি কৰক।","মিশ্ৰ ছেট অনুশীলন কৰক, যাতে সময়ৰ চাপত যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ শিকে।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["প্ৰশ্নটো মন কৰি নপঢ়া — এটা শব্দ সলনি হ'লে গোটেই যুক্তিটো সলনি হ'ব পাৰে।","বিশেষকৈ ন্যায়বাক্যত নিদিয়া অতিৰিক্ত তথ্য ধৰি লোৱা।","দিশ অনুভৱৰ প্ৰশ্নত গতিৰ দিশ ওলোটাই পেলোৱা।","এটা ধাঁধাত বেছি সময় খৰচ কৰা, পিছত ঘূৰি অহাৰ পৰিৱৰ্তে।"]}],faqs:[{q:"ADRE ৰ বাবে কোনবোৰ মৌখিক যুক্তিৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, শ্ৰেণী, সাদৃশ্য আৰু শ্ৰেণীবিভাগ ADRE আৰু অসম আৰক্ষীৰ প্ৰশ্নকাকতত সৰ্বাধিক বাৰে সোধা হয়।"},{q:"মৌখিক যুক্তি অ-মৌখিক যুক্তিতকৈ সহজ নেকি?",a:"বহু প্ৰাৰ্থীয়ে মৌখিক যুক্তিক সহজ পায় কাৰণ নিয়মবোৰ স্পষ্টভাৱে নিৰ্ধাৰিত। ব্যক্তিগত শক্তি বেলেগ বেলেগ, গতিকে দুয়োটা অনুশীলন কৰি দেখক আপুনি ক'ত দ্ৰুত নম্বৰ পায়।"},{q:"সংকেত-অৱগুঞ্জনৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"দিয়া শব্দটো তাৰ সংকেতৰ সৈতে তুলনা কৰক আৰু আখৰ তথা সংখ্যাৰ অৱস্থানৰ পৰিৱৰ্তন মন কৰক। এবাৰ পৰিৱৰ্তনটো চিনি পোৱাৰ পিছত নতুন শব্দত প্ৰয়োগ কৰক।"},{q:"মই অসমীয়াত মৌখিক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত উপলব্ধ, আৰু পঢ়ি থাকোঁতে আপুনি ভাষা সলনি কৰিব পাৰে।"},{q:"প্ৰতিদিনে কিমান যুক্তিৰ প্ৰশ্ন সমাধান কৰা উচিত?",a:"দুই বা তিনি অধ্যায়ৰ পঞ্চাশৰ পৰা ষাঠিটা প্ৰশ্ন এটা সুস্থ দৈনিক লক্ষ্য, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{q:"axomexam ত মৌখিক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},"analytical-critical-reasoning":{title:"ADRE আৰু APSC ৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন | axomexam",meta:"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱেৰ বাবে বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি অনুশীলন। আসন বিন্যাস, ধাঁধা, বিবৃতি আৰু ধাৰণা, সিদ্ধান্ত, দাবী আৰু কাৰণ।",lead:["বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তিয়ে জুখে আপুনি তথ্য কিমান ভালদৰে সজাই ৰাখিব পাৰে আৰু তৰ্ক কিমান ভালদৰে বিচাৰ কৰিব পাৰে। ইয়াত আসন বিন্যাস, জটিল ধাঁধা, সংকেতযুক্ত অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়বোৰ সামৰি লোৱা হয়।","যুক্তিৰ এই অংশটোৱেই সেই ঠাই য'ত খৰখেদাকৈ অনুমান কৰাতকৈ সাৱধানে পঢ়াটো বেছি গুৰুত্বপূৰ্ণ। axomexam ত প্ৰতিটো অধ্যায়ত সমাধান কৰা উদাহৰণ আৰু বিশদ দ্বিভাষিক ব্যাখ্যাৰ সৈতে অনুশীলন ছেট আছে, যাতে দিয়া বিবৃতিবোৰৰ পৰা এটা সিদ্ধান্ত কেনেদৰে ওলায় আপুনি সঠিকভাৱে দেখিব পাৰে।"],sections:[{h:"বিশ্লেষণাত্মক আৰু সমালোচনাত্মক শিতানে কি বিচাৰে",p:["ধাঁধা আৰু বিন্যাসৰ প্ৰশ্নই চৰ্তৰ এটা গোট অনুসৰি মানুহ বা বস্তু ৰাখিবলৈ আপোনাৰ ক্ষমতা পৰীক্ষা কৰে। বিবৃতিভিত্তিক অধ্যায়বোৰে কি বুজোৱা হৈছে, কি ধৰি লোৱা হৈছে, কি শক্তিশালী বা দুৰ্বল কৰা হৈছে সেই বিষয়ে আপোনাৰ বিচাৰ পৰীক্ষা কৰে।"]},{h:"axomexam ত সামৰি লোৱা বিশ্লেষণাত্মক যুক্তিৰ অধ্যায়বোৰ",list:["আসন বিন্যাস — ৰৈখিক, বৃত্তাকাৰ আৰু জটিল শাৰী বিন্যাস।","ধাঁধা — বিষয়ভিত্তিক বিন্যাস, গোট আৰু দিন-ভিত্তিক ধাঁধা।","সংকেতযুক্ত অসমতা আৰু গাণিতিক অসমতা।","বিবৃতি আৰু ধাৰণা — লুকাই থকা ধাৰণাটো চিনি পেলাওক।","বিবৃতি আৰু সিদ্ধান্ত, বিবৃতি আৰু কাৰ্যপন্থা।","তৰ্ক — শক্তিশালী আৰু দুৰ্বল তৰ্ক চিনাক্ত কৰক।","কাৰণ আৰু প্ৰভাৱ, আৰু উপযুক্ত যুক্তি।"]},{h:"বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো ধাঁধাৰ চৰ্তবোৰ তালিকাত লিখি চিত্ৰ বা টেবুল হিচাপে সজাওক।","সম্ভাৱ্য অৱস্থানবোৰ বাদ দি আগবাঢ়ক, যাতে এটা সঠিক বিন্যাসত উপনীত হয়।","বিবৃতিভিত্তিক প্ৰশ্নৰ বাবে প্ৰদত্ত তথ্যৰ বাহিৰে আন একো ধৰি নল'ব।","তৰ্কৰ প্ৰশ্নত দাবীটো আৰু তাৰ কাৰণ সুকীয়াকৈ চিনি পেলাওক।","প্ৰতিদিনে এটা জটিল ধাঁধা সময়বদ্ধভাৱে সমাধান কৰক।","ভুল উত্তৰবোৰ বিশ্লেষণ কৰি কি চৰ্ত হেৰুওৱা হ'ল চিনি পেলাওক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["চৰ্তবোৰ মনত ৰাখি সমাধান কৰাৰ পৰিৱৰ্তে প্ৰথম অৱস্থানতে অনুমান কৰা।","বিবৃতিভিত্তিক প্ৰশ্নত নিদিয়া তথ্য ধৰি লোৱা।","ধাঁধাৰ এটা অংশ পাহৰি গৈ ভুল বিন্যাসত উপনীত হোৱা।","এটা কঠিন ধাঁধাত বেছি সময় খৰচ কৰি সহজ প্ৰশ্ন এৰি দিয়া।"]}],faqs:[{q:"বিশ্লেষণাত্মক যুক্তি কঠিন নেকি?",a:"ই ধৈৰ্য আৰু পদ্ধতিগত চিন্তাৰ ওপৰত নিৰ্ভৰ কৰে। নিয়মীয়া অনুশীলনৰ সৈতে ই যুক্তিৰ শিতানৰ এটা নিৰ্ভৰযোগ্য নম্বৰৰ উৎস হৈ পৰে।"},{q:"ADRE আৰু APSC ৰ বাবে কোনবোৰ বিশ্লেষণাত্মক বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"আসন বিন্যাস, ধাঁধা, সংকেতযুক্ত অসমতা, বিবৃতি-সিদ্ধান্ত আৰু তৰ্ক সৰ্বাধিক বাৰে সোধা হয়।"},{q:"ধাঁধাৰ প্ৰশ্ন দ্ৰুতভাৱে কেনেদৰে সমাধান কৰিম?",a:"চৰ্তবোৰ এটা টেবুলত লিখক আৰু প্ৰতিটো সম্ভাৱনা বাদ দি আগবাঢ়ক। এটা বা দুটা সম্ভাৱনা আঁচি ল'লে বাকীখিনি সহজে ওলায়।"},{q:"মই অসমীয়াত বিশ্লেষণাত্মক যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{q:"দৈনিক কিমান সময় দিয়া উচিত?",a:"দিনে এঘণ্টা ধাঁধা আৰু বিবৃতিভিত্তিক প্ৰশ্নত দিয়া উচিত, লগতে প্ৰতিটো ভুলৰ পৰ্যালোচনা।"},{q:"axomexam ত বিশ্লেষণাত্মক যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},science:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে সাধাৰণ বিজ্ঞান প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া সাধাৰণ বিজ্ঞান অনুশীলন। পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["সাধাৰণ বিজ্ঞান ADRE, অসম আৰক্ষী, APSC, SSC, ৰে'লৱে আৰু প্ৰায় প্ৰতিটো অসম ৰাজ্যিক নিযুক্তি পৰীক্ষাৰ সাধাৰণ জ্ঞান শিতানৰ এটা নিশ্চিত অংশ। প্ৰশ্নবোৰ সাধাৰণতে ধাৰণাভিত্তিক আৰু দৈনন্দিন জীৱনৰ সৈতে জড়িত, গতিকে সঠিক প্ৰস্তুতিৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো পদাৰ্থ বিজ্ঞান, ৰসায়ন, জীৱ বিজ্ঞান আৰু পৰিৱেশ বিজ্ঞানত বিভক্ত। প্ৰতিটো অধ্যায়ৰ প্ৰশ্নৰ সৈতে স্পষ্ট দ্বিভাষিক ব্যাখ্যা আছে, যাতে আপুনি কেৱল উত্তৰ মনত নৰখি ধাৰণাটোও বুজি পায়।"],sections:[{h:"কিয় সাধাৰণ বিজ্ঞান গুৰুত্বপূৰ্ণ",p:["অসমৰ নিযুক্তি পৰীক্ষাত সাধাৰণ বিজ্ঞানৰ প্ৰশ্নই সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ গঠন কৰে। প্ৰশ্নবোৰ সাধাৰণতে দৈনন্দিন পৰিঘটনা, স্বাস্থ্য, খাদ্য, শক্তি আৰু পৰিৱেশৰ ওপৰত আধাৰিত, গতিকে সাধাৰণ বুজবুজৰ সৈতে বেছিভাগ প্ৰশ্নৰ উত্তৰ দিব পাৰি।"]},{h:"axomexam ত সামৰি লোৱা বিজ্ঞানৰ অধ্যায়বোৰ",list:["পদাৰ্থ বিজ্ঞান — গতি, বল, শক্তি, কাম, তাপ, পোহৰ, শব্দ আৰু বিদ্যুৎ।","ৰসায়ন — পদাৰ্থৰ প্ৰকাৰ, পৰমাণু, অণু, মৌল, যৌগ, মিশ্ৰণ আৰু দৈনন্দিন ৰসায়ন।","জীৱ বিজ্ঞান — কোষ, উদ্ভিদ, প্ৰাণী, মানৱ শৰীৰ, ৰোগ আৰু পুষ্টি।","পৰিৱেশ বিজ্ঞান — পৰিৱেশ তন্ত্ৰ, প্ৰদূষণ, জৈৱ বৈচিত্ৰ্য আৰু সংৰক্ষণ।","বৈজ্ঞানিক যন্ত্ৰ আৰু একক, আৰু আৱিষ্কাৰ তথা আৱিষ্কাৰক।"]},{h:"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা বিজ্ঞানৰ বিষয়",list:["মানৱ শৰীৰৰ অংগ আৰু তন্ত্ৰ।","ৰোগ আৰু সিহঁতৰ কাৰণ তথা প্ৰতিষেধক।","পুষ্টি, ভিটামিন আৰু সিহঁতৰ অভাৱজনিত ৰোগ।","বিদ্যুৎ আৰু চুম্বকত্বৰ মূল ধাৰণা।","দৈনন্দিন জীৱনত ব্যৱহৃত ৰাসায়নিক যৌগ।","প্ৰদূষণৰ প্ৰকাৰ আৰু ইয়াৰ প্ৰভাৱ।"]},{h:"বিজ্ঞান প্ৰস্তুতিৰ কৌশল",list:["প্ৰতিটো ধাৰণা দৈনন্দিন জীৱনৰ উদাহৰণৰ সৈতে সংযোগ কৰক।","গুৰুত্বপূৰ্ণ সূত্ৰ, একক আৰু প্ৰতীকৰ এখন চুটি টোকা প্ৰস্তুত কৰক।","ভিটামিন, ৰোগ আৰু যন্ত্ৰৰ তালিকা টেবুল হিচাপে বনাই পুনৰাবৃত্তি কৰক।","প্ৰতিদিনে এটা অধ্যায়ৰ প্ৰশ্ন অনুশীলন কৰক।","ভুল উত্তৰবোৰৰ কাৰণ বিশ্লেষণ কৰক।","সাপ্তাহিকভাৱে এটা মিশ্ৰ ছেট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["একক আৰু জোখ-মাখৰ প্ৰতি মন নিদিয়া।","পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ ধাৰণা মিহলাই পেলোৱা।","কেৱল তথ্য মনত ৰখা, ধাৰণাটো নুবুজা।","দৈনন্দিন বিজ্ঞানৰ প্ৰশ্নক হেয়জ্ঞান কৰা — এইবোৰেই সৰ্বাধিক বাৰে আহে।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত সাধাৰণ বিজ্ঞান কিমান গুৰুত্বপূৰ্ণ?",a:"সাধাৰণ জ্ঞান শিতানৰ এটা উল্লেখযোগ্য অংশ সাধাৰণ বিজ্ঞানৰ, আৰু ই সহজে নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা।"},{q:"বিজ্ঞানৰ বাবে কোনবোৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"মানৱ শৰীৰ, পুষ্টি আৰু ভিটামিন, ৰোগ, বিদ্যুৎৰ মূল ধাৰণা আৰু প্ৰদূৰ্ণ সৰ্বাধিক বাৰে সোধা হয়।"},{q:"বিজ্ঞান প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?",a:"সঠিক ধাৰণাৰ সৈতে দুইৰ পৰা তিনিটা সপ্তাহৰ নিয়মীয়া পুনৰাবৃত্তি বেছিভাগ প্ৰাৰ্থীৰ বাবে যথেষ্ট।"},{q:"মই অসমীয়াত বিজ্ঞান পঢ়িব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক, গতিকে আপুনি অসমীয়া বা ইংৰাজীত পঢ়িব পাৰে।"},{q:"ৰসায়নৰ বাবে পৃথক প্ৰস্তুতি প্ৰয়োজন নেকি?",a:"পৃথকভাৱে বেছি নহয়, কিন্তু দৈনন্দিন ৰসায়ন আৰু মূল মৌল তথা যৌগবোৰ ভালদৰে জনাটো প্ৰয়োজন।"},{q:"axomexam ত বিজ্ঞানৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},english:{title:"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে সাধাৰণ ইংৰাজী | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া সাধাৰণ ইংৰাজী অনুশীলন। ব্যাকৰণ, শব্দভাণ্ডাৰ, বাক্য গঠন আৰু বোধগম্যতা — দ্বিভাষিক ব্যাখ্যাৰ সৈতে।",lead:["সাধাৰণ ইংৰাজী ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা স্থিৰ আৰু কম-ঝুঁকিৰ নম্বৰ দিয়া শিতান। ইয়াত ব্যাকৰণ, শব্দভাণ্ডাৰ আৰু বোধগম্যতা পৰীক্ষা কৰা হয়, আৰু নিয়মবোৰ জনাৰ সৈতে এই শিতানৰ নম্বৰ সহজে লাভ কৰিব পাৰি।","axomexam ত বিষয়টো ব্যাকৰণ, বক্তৃতাৰ অংশ, বাক্য গঠন আৰু শব্দভাণ্ডাৰত সজোৱা হৈছে, অনুশীলন প্ৰশ্ন আৰু স্পষ্ট ব্যাখ্যাৰ সৈতে।"],sections:[{h:"সাধাৰণ ইংৰাজীয়ে কি পৰীক্ষা কৰে",p:["এই শিতানে পৰীক্ষা কৰে আপুনি ব্যৱহাৰত থকা সঠিক ব্যাকৰণ চিনি পায় নেকি, খালী ঠাইত সঠিক শব্দ বাছনি কৰিব পাৰে নেকি, বাক্যত ভুল ধৰা পেলাব পাৰে নেকি, আৰু এটা অনুচ্ছেদৰ অৰ্থ বুজিব পাৰে নেকি।"]},{h:"axomexam ত সামৰি লোৱা ইংৰাজীৰ অধ্যায়বোৰ",list:["ব্যাকৰণ — কাল, articles, কৰ্তা-ক্ৰিয়াৰ মিল, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি।","বক্তৃতাৰ অংশ — বিশেষ্য, সৰ্বনাম, ক্ৰিয়া, বিশেষণ, ক্ৰিয়া বিশেষণ, পূৰ্বসৰ্গ, সংযোজক আৰু আবেগসূচক।","বাক্য গঠন — বাক্যৰ প্ৰকাৰ, বাক্যাংশ আৰু উপবাক্য, বাক্য সংশোধন আৰু অনুচ্ছেদ ক্ৰম।","শব্দভাণ্ডাৰ — সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন, বাগধাৰা আৰু বানান।"]},{h:"সৰ্বাধিক পুনৰাবৃত্তি হোৱা ইংৰাজীৰ বিষয়",list:["কৰ্তা-ক্ৰিয়াৰ মিল আৰু সাধাৰণ ভুল চিনাক্তকৰণ।","কাল আৰু সিহঁতৰ সঠিক ব্যৱহাৰ।","পূৰ্বসৰ্গ আৰু articles।","সমাৰ্থক, বিপৰীত আৰু এক-শব্দ প্ৰতিস্থাপন।","বাগধাৰা আৰু সিহঁতৰ অৰ্থ।","খালী ঠাই পূৰণ আৰু ক্ল'জ টেষ্ট।"]},{h:"সাধাৰণ ইংৰাজী প্ৰস্তুতিৰ কৌশল",list:["এক সময়ত এটা ব্যাকৰণৰ নিয়ম পুনৰাবৃত্তি কৰক আৰু তাৰ ওপৰত বিশটা প্ৰশ্ন সমাধান কৰক।","প্ৰতিদিনে এটা চুটি অনুচ্ছেদ পঢ়ক আৰু অপৰিচিত শব্দ আৰু সিহঁতৰ অৰ্থ টুকি লওক।","প্ৰতিদিনে পাঁচটা নতুন শব্দ, পাঁচটা সমাৰ্থক আৰু তিনিটা বাগধাৰা শিকক।","বিকল্প বাছনি কৰাৰ আগতে বাক্যটো সম্পূৰ্ণ পঢ়ি ভুল চিনাক্তকৰণৰ অভ্যাস কৰক।","articles, পূৰ্বসৰ্গ আৰু কৰ্তা-ক্ৰিয়াৰ মিলৰ নিয়ম সৰ্বাধিক বাৰে পুনৰাবৃত্তি কৰক।","আপোনাৰ শুদ্ধতা জুখিবলৈ সপ্তাহে এটা সম্পূৰ্ণ ইংৰাজী ছেট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["নিয়ম প্ৰয়োগ নকৰি 'শুদ্ধ যেন শুনা যায়' বুলি বিকল্প বাছনি কৰা।","articles আৰু পূৰ্বসৰ্গ এৰি দিয়া, যিবোৰ প্ৰতি বছৰে সোধা হয়।","ব্যৱহাৰ বা উদাহৰণ বাক্য নোহোৱাকৈ শব্দ শিকা।","প্ৰশ্ন চোৱাৰ আগতে গোটেই বোধগম্যতাৰ অনুচ্ছেদ পঢ়া।"]}],faqs:[{q:"ADRE ত সাধাৰণ ইংৰাজীত নম্বৰ লাভ কৰা সহজ নেকি?",a:"হয়। পাঠ্যক্ৰম সীমিত আৰু নিয়মভিত্তিক, গতিকে নিয়মীয়া পুনৰাবৃত্তিৰ সৈতে বেছিভাগ প্ৰাৰ্থীয়ে এই শিতানত গড়তকৈ ভাল নম্বৰ পাব পাৰে।"},{q:"কোনবোৰ ব্যাকৰণৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"কাল, কৰ্তা-ক্ৰিয়াৰ মিল, articles, পূৰ্বসৰ্গ, কৰ্তৃবাচ্য আৰু কৰ্মবাচ্য, আৰু প্ৰত্যক্ষ তথা পৰোক্ষ উক্তি সৰ্বাধিক বাৰে সোধা হয়।"},{q:"মই শব্দভাণ্ডাৰ দ্ৰুতভাৱে কেনেদৰে উন্নত কৰিম?",a:"প্ৰতিদিনে সৰু সৰু গোটত শব্দ আৰু সিহঁতৰ ব্যৱহাৰ শিকক, আৰু সমাৰ্থক, বিপৰীত, এক-শব্দ প্ৰতিস্থাপন তথা বাগধাৰা নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।"},{q:"axomexam ত অসমীয়াত ইংৰাজী পঢ়িব পাৰিম নেকি?",a:"ব্যাখ্যাবোৰ দ্বিভাষিক, যাতে দুয়ো ভাষাত নিয়মটো স্পষ্ট হয়, আৰু প্ৰশ্নবোৰে ইংৰাজী পৰীক্ষাৰ আৰ্হি অনুসৰণ কৰে।"},{q:"এই পৰীক্ষাবোৰত বোধগম্যতা সোধা হয় নেকি?",a:"হয়, বহু প্ৰশ্নকাকতত প্ৰত্যক্ষ ব্যাকৰণ আৰু শব্দভাণ্ডাৰৰ প্ৰশ্নৰ লগতে এটা চুটি পঢ়া-বোধগম্যতাৰ অনুচ্ছেদও থাকে।"},{q:"axomexam ত সাধাৰণ ইংৰাজীৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},articles:{title:"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে বিনামূলীয়া অধ্যয়ন প্ৰবন্ধ | axomexam",meta:"ADRE, APSC, অসম আৰক্ষী, SSC আৰু ৰে'লৱে পৰীক্ষাৰ বাবে বিনামূলীয়া উচ্চমানৰ অধ্যয়ন প্ৰবন্ধ পঢ়ক। সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰৰ দীঘলীয়া টোকা।",lead:["axomexam ৰ প্ৰবন্ধবোৰ হৈছে দীঘলীয়া অধ্যয়ন সামগ্ৰী, যিয়ে এটা বিষয় গভীৰভাৱে আৰু সৰল ভাষাত ব্যাখ্যা কৰে। এইবোৰ প্ৰশ্ন কৰাৰ আগতে ধাৰণাগত স্পষ্টতা গঢ়িবলৈ লিখা হয়, যাৰ ফলত নতুন বিষয় আৰম্ভ কৰিবলৈ বা বাৰে বাৰে ভুল হোৱা বিষয় পুনৰাবৃত্তি কৰিবলৈ এইবোৰ উপযুক্ত।","সংগ্ৰহটোৱে সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তিৰ ক্ষমতা, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি লয়, গতিকে দুৰ্বল ক্ষেত্ৰ শক্তিশালী কৰিবলৈ বা চিনাকি বিষয়ৰ দ্ৰুত পুনৰাবৃত্তিৰ বাবে উপযুক্ত প্ৰবন্ধ সদায় থাকে।"],sections:[{h:"প্ৰবন্ধ শিতান কেনেদৰে ব্যৱহাৰ কৰিব",p:["ধাৰণাটো বুজিবলৈ এবাৰ প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক। প্ৰবন্ধবোৰ জাণী সৰল আৰু উদাহৰণমুখী ৰখা হয়, যাতে পৰীক্ষাত এটা একেধৰণৰ প্ৰশ্ন দেখিলে ধাৰণাটো আপোনাৰ লগত থাকে।"]},{h:"উপলব্ধ প্ৰবন্ধৰ শ্ৰেণীবোৰ",list:["সাধাৰণ জ্ঞান — অসমৰ ইতিহাস, সাহিত্য, ভূগোল, ৰাজনীতি, অৰ্থনীতি আৰু কলা তথা সংস্কৃতি।","গণিত — পাটিগণিত, উন্নত গণিত আৰু তথ্য বিশ্লেষণৰ ধাৰণা ধাপে ধাপে ব্যাখ্যা।","সাধাৰণ বিজ্ঞান — পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱ বিজ্ঞানৰ বিষয় দৈনন্দিন ভাষাত।","যুক্তিৰ ক্ষমতা — মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিৰ কৌশল।","সাধাৰণ ইংৰাজী — ব্যাকৰণৰ নিয়ম, শব্দভাণ্ডাৰ গঢ়া আৰু সাধাৰণ ভুলৰ আৰ্হি।","কম্পিউটাৰ সজাগতা — মূল কথা, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং আৰু চাইবাৰ সুৰক্ষা।"]},{h:"প্ৰবন্ধই আপোনাৰ প্ৰস্তুতিত কেনেদৰে সহায় কৰে",list:["ই এটা নিয়মৰ পিছৰ 'কিয়'টো ব্যাখ্যা কৰে, যি নতুন প্ৰশ্নত প্ৰয়োগ কৰিবলৈ সহায় কৰে।","পৰীক্ষাৰ আগৰ শেষ সপ্তাহবোৰত এইবোৰ আদৰ্শ পুনৰাবৃত্তিৰ সামগ্ৰী।","ই তত্ত্বক বিগত প্ৰশ্নকাকতৰ সমাধান কৰা উদাহৰণৰ সৈতে সংযোগ কৰে।","ই বোধগম্যতা আৰু সাধাৰণ সজাগতাৰ বাবে প্ৰয়োজনীয় পঢ়াৰ অভ্যাস গঢ়ে।"]},{h:"অধ্যয়ন প্ৰবন্ধৰ পৰা সৰ্বাধিক লাভ কৰাৰ টিপছ",list:["কলম লৈ পঢ়ক আৰু মূল কথাবোৰ তথা সূত্ৰ টুকি লওক।","পঢ়াৰ লগে লগে সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰক।","আপোনাৰ মনত ৰখাৰ ক্ষমতা পৰীক্ষা কৰিবলৈ এসপ্তাহৰ পিছত প্ৰবন্ধটো আকৌ চাওক।","ইংৰাজী আৰু অসমীয়া দুয়ো ভাষাত পৰিভাষা শক্তিশালী কৰিবলৈ দ্বিভাষিক দৃশ্য ব্যৱহাৰ কৰক।"]}],faqs:[{q:"axomexam ত কেনেধৰণৰ প্ৰবন্ধ প্ৰকাশ কৰা হয়?",a:"অসম প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে সাধাৰণ জ্ঞান, গণিত, বিজ্ঞান, যুক্তি, ইংৰাজী আৰু কম্পিউটাৰ সজাগতাৰ দীঘলীয়া, সহজ-পঢ়া অধ্যয়ন সামগ্ৰী।"},{q:"প্ৰবন্ধবোৰ ADRE আৰু APSC ৰ বাবে উপযোগী নেকি?",a:"হয়। প্ৰবন্ধবোৰে ADRE, APSC CCE, অসম আৰক্ষী, SSC আৰু ৰে'লৱে প্ৰশ্নকাকতত অহা ধাৰণা আৰু তথ্য সামৰি লয়।"},{q:"অনুশীলন প্ৰশ্নৰ আগতে নে পিছত প্ৰবন্ধ পঢ়া উচিত?",a:"ধাৰণাটো বুজিবলৈ আগতে প্ৰবন্ধটো পঢ়ক, তাৰ পিছত সম্পৰ্কিত অনুশীলন ছেটটো চেষ্টা কৰি আপোনাৰ ভুল পৰ্যালোচনা কৰক।"},{q:"প্ৰবন্ধবোৰ অসমীয়াত উপলব্ধ নেকি?",a:"সামগ্ৰীখন অসমীয়া আৰু ইংৰাজী দুয়ো পঢ়ুৱৈক সহায় কৰিবলৈ সজোৱা হৈছে, আৰু মূল পৰিভাষাবোৰ দুয়ো ভাষাত ব্যাখ্যা কৰা হয়।"},{q:"নতুন প্ৰবন্ধ কিমান সঘনাই যোগ কৰা হয়?",a:"নতুন প্ৰবন্ধ নিয়মীয়াকৈ যোগ কৰা হয়, গতিকে আপোনাৰ পাঠ্যক্ৰম আগবাঢ়ি যোৱাৰ লগে লগে পৃষ্ঠাটো আকৌ চাওক।"},{q:"প্ৰবন্ধ শিতান বিনামূলীয়াকৈ ব্যৱহাৰ কৰিব পাৰি নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো প্ৰবন্ধ আৰু অধ্যয়ন সমল সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},math:{title:"ADRE, APSC আৰু অসম আৰক্ষী পৰীক্ষাৰ বাবে গণিত | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া গণিত অনুশীলন। পাটিগণিত, উন্নত গণিত, পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — দ্বিভাষিক ধাপে ধাপে সমাধানৰ সৈতে।",lead:["গণিত বা পৰিমাণাত্মক যোগ্যতা ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাৰ সৰ্বাধিক নম্বৰ দিয়া ক্ষেত্ৰবোৰৰ এটা। বিষয়টোৱে অনুশীলনক পুৰস্কৃত কৰে: যিমান বেছি আৰ্হি আপুনি দেখিছে, সিমান দ্ৰুত আৰু শুদ্ধভাৱে পৰীক্ষাৰ দিনা সমাধান কৰিব।","axomexam ত গণিতক পাটিগণিত, উন্নত গণিত, আৰু পৰিসংখ্যা তথা তথ্য বিশ্লেষণত ভাগ কৰা হৈছে। প্ৰতিটো শিতান ভেটিৰ পৰা পৰীক্ষাৰ স্তৰৰ প্ৰশ্নলৈ গঢ়ি উঠে, যাতে আপুনি এক সময়ত এটা ক্ষেত্ৰ শক্তিশালী কৰিব পাৰে।"],sections:[{h:"অসম পৰীক্ষাত গণিত কিয় গুৰুত্বপূৰ্ণ",p:["সংখ্যাগত ক্ষমতাই বহু প্ৰশ্ন বহন কৰে আৰু সাধাৰণতে এই শিতানটোৱেই সেই ঠাই য'ত ভালদৰে প্ৰস্তুত প্ৰাৰ্থীয়ে আগবাঢ়ি যায়। ধাৰণাবোৰ নিৰ্দিষ্ট আৰু আৰ্হিবোৰ পুনৰাবৃত্তি হয়, গতিকে গণিতে বেছিভাগ অন্য বিষয়তকৈ প্ৰস্তুতিৰ সময়ত ভাল প্ৰতিদান দিয়ে।"]},{h:"axomexam ত সামৰি লোৱা গণিতৰ শিতানবোৰ",list:["পাটিগণিত — সংখ্যা পদ্ধতি, শতাংশ, অনুপাত, লাভ-ক্ষতি, গড়, সময় আৰু কাম, সময় আৰু দূৰত্ব, আৰু সৰল তথা চক্ৰবৃদ্ধি সুত।","উন্নত গণিত — বীজগণিত, জ্যামিতি, ত্ৰিকোণমিতি, সংখ্যা পদ্ধতি আৰু উচ্চ স্তৰৰ সমস্যা সমাধান।","পৰিসংখ্যা আৰু তথ্য বিশ্লেষণ — গড়, টেবুল, বাৰ চাৰ্ট, পাই চাৰ্ট আৰু ৰেখা লেখ।"]},{h:"গণিত প্ৰস্তুতিৰ কৌশল",list:["এটা অধ্যায়ৰ উন্নত প্ৰশ্নলৈ যোৱাৰ আগতে ভেটিটো আয়ত্ত কৰক।","প্ৰতিটো প্ৰশ্ন দীঘল পদ্ধতিত সমাধান নকৰি চুটি কৌশল শিকি প্ৰয়োগ কৰক।","পৰীক্ষাই দাবী কৰা গতি গঢ়িবলৈ টাইমাৰ লৈ অনুশীলন কৰক।","এখন সূত্ৰৰ টোকাবহী ৰাখক আৰু নিয়মীয়াকৈ পুনৰাবৃত্তি কৰক।","প্ৰতিটো ভুল উত্তৰ বিশ্লেষণ কৰি ভুলটো ধাৰণাগত নে অসাৱধানতাৰ পৰা হ'ল বিচাৰক।","সপ্তাহে এটা সম্পূৰ্ণ গণিতৰ মক টেষ্ট লৈ আপোনাৰ শুদ্ধতা জুখক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["স্পষ্ট ভেটি নোহোৱাকৈ উন্নত প্ৰশ্ন চেষ্টা কৰা।","তথ্য বিশ্লেষণ এৰি দিয়া, যি সাৱধান পঢ়ুৱৈৰ বাবে সহজ নম্বৰ দিয়ে।","আসন্ন মানৰ অভ্যাস নকৰাৰ বাবে সময়ৰ চাপত গণনাৰ ভুল কৰা।","প্ৰশ্নৰ প্ৰকাৰৰ পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা।"]}],faqs:[{q:"ADRE ৰ বাবে কোনবোৰ গণিতৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"পাটিগণিতেই মূল, বিশেষকৈ শতাংশ, অনুপাত, গড়, লাভ-ক্ষতি, সময় আৰু কাম আৰু সময়-বেগ-দূৰত্ব। উন্নত গণিত আৰু তথ্য বিশ্লেষণে বাকী নম্বৰবোৰ যোগ কৰে।"},{q:"অসম আৰক্ষী আৰু ADRE ৰ বাবে উন্নত গণিত প্ৰয়োজন নেকি?",a:"মৌলিক বীজগণিত আৰু জ্যামিতি উপযোগী, কিন্তু গুৰুত্ব পাটিগণিতৰ ওপৰতেই থাকে। APSC আৰু কাৰিকৰী পদৰ বাবে উন্নত গণিতত বেছি দখল প্ৰয়োজন।"},{q:"মই মোৰ গণনাৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"নামতা, বৰ্গ, ঘনক আৰু শতাংশৰ পৰা ভগ্নাংশলৈ মান মনত ৰাখক, আৰু সময়বদ্ধ ছেটৰ সৈতে আসন্ন মানৰ কৌশল অনুশীলন কৰক।"},{q:"প্ৰতিদিনে গণিতত কিমান সময় দিয়া উচিত?",a:"নিয়মীয়া ভুল পৰ্যালোচনা আৰু সাপ্তাহিক মক টেষ্টৰ সৈতে দিনে এঘণ্টাৰ পৰা দেৰ ঘণ্টা একাগ্ৰ অনুশীলন যথেষ্ট।"},{q:"মই অসমীয়াত গণিত অনুশীলন কৰিব পাৰিম নেকি?",a:"হয়। সকলো অনুশীলন ছেট আৰু ধাপে ধাপে ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{q:"axomexam ত গণিতৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},reasoning:{title:"ADRE, APSC আৰু অসম আৰক্ষীৰ বাবে যুক্তিৰ ক্ষমতাৰ প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া যুক্তি অনুশীলন। মৌখিক, অ-মৌখিক আৰু বিশ্লেষণাত্মক যুক্তি — দ্বিভাষিক ধাপে ধাপে ব্যাখ্যা আৰু সময়বদ্ধ ছেটৰ সৈতে।",lead:["যুক্তিৰ ক্ষমতাই মনত ৰখা তথ্যৰ পৰিৱৰ্তে যুক্তিসংগত আৰু বিশ্লেষণাত্মক চিন্তা পৰীক্ষা কৰে। ই মৌখিক যুক্তি, অ-মৌখিক যুক্তি আৰু বিশ্লেষণাত্মক তথা সমালোচনাত্মক যুক্তিত বিভক্ত, আৰু একেলগে এইবোৰে ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱে পৰীক্ষাত এটা নম্বৰ দিয়া শিতান গঠন কৰে।","যুক্তিত গতি আৰু শুদ্ধতাই নম্বৰ নিৰ্ধাৰণ কৰে, গতিকে সময়বদ্ধ অনুশীলন অপৰিহাৰ্য। axomexam ত তিনিওটা শাখাৰ অধ্যায়ভিত্তিক ছেটৰ পিছত বিশদ ব্যাখ্যা আছে, যাতে আপুনি যুক্তি আৰু গতি দুয়োটা প্ৰশিক্ষণ দিব পাৰে।"],sections:[{h:"কিয় যুক্তি উচ্চ-নম্বৰ শিতান",p:["যুক্তিৰ প্ৰশ্নবোৰে নিৰ্দিষ্ট আৰ্হি অনুসৰণ কৰে, যিবোৰ প্ৰশ্নকাকতবোৰত পুনৰাবৃত্তি হয়। এবাৰ প্ৰাৰ্থীয়ে শ্ৰেণী, সংকেত, বিন্যাস আৰু বিবৃতিভিত্তিক প্ৰশ্নৰ মানক নিয়ম শিকিলে শিতানটো দ্ৰুত আৰু নিৰ্ভৰযোগ্য হৈ পৰে। ইয়াত নিয়মীয়া অনুশীলনৰ বাহিৰে অন্য অধ্যয়ন সামগ্ৰীৰ প্ৰয়োজন নাই।"]},{h:"axomexam ত সামৰি লোৱা যুক্তিৰ শাখাবোৰ",list:["মৌখিক যুক্তি — সাদৃশ্য, শ্ৰেণীবিভাগ, শ্ৰেণী, সংকেত-অৱগুঞ্জন, ৰক্তসম্পৰ্ক, দিশ অনুভৱ, স্থান নিৰ্ণয়, ন্যায়বাক্য আৰু ঘড়ী-পঞ্জিকা।","অ-মৌখিক যুক্তি — চিত্ৰ শ্ৰেণী, দাপোন আৰু পানীৰ প্ৰতিবিম্ব, কাগজ ভাঁজ আৰু কটা, অন্তৰ্নিহিত চিত্ৰ, চিত্ৰ মেট্ৰিক্স, চিত্ৰ গণনা আৰু ঘনক তথা পাশা।","বিশ্লেষণাত্মক আৰু সমালোচনাত্মক যুক্তি — আসন বিন্যাস, ধাঁধা, অসমতা, আৰু ধাৰণা, সিদ্ধান্ত, তৰ্ক আৰু কাৰ্যপন্থাৰ দৰে বিবৃতিভিত্তিক অধ্যায়।"]},{h:"যুক্তি প্ৰস্তুতিৰ কৌশল",list:["এটা অধ্যায়ৰ নিয়ম শিকক, তাৰ পিছত তাৰ ওপৰত অন্ততঃ বিশটা প্ৰশ্নৰ ছেট সমাধান কৰক।","বিন্যাস, ৰক্তসম্পৰ্ক আৰু দিশৰ বাবে মনত সমাধান নকৰি চিত্ৰ আঁকক।","যুক্তি দ্ৰুতভাৱে সলনি কৰিবলৈ অভ্যস্ত হ'বলৈ মিশ্ৰ ছেট অনুশীলন কৰক।","শুদ্ধতাৰ লগে লগে গতি বাঢ়িবলৈ প্ৰতিটো ছেট সময় জুখক।","ভুল উত্তৰবোৰ তৎক্ষণাত পৰ্যালোচনা কৰি হেৰুওৱা নিয়মটো টুকি লওক।","সপ্তাহে এটা সম্পূৰ্ণ যুক্তিৰ মক টেষ্ট চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["প্ৰশ্নৰ প্ৰতিটো অংশৰ সৈতে পৰীক্ষা নকৰি যুক্তিটো অনুমান কৰা।","সহজ প্ৰশ্ন ৰৈ থকাৰ সময়ত এটা ধাঁধাত আটকি থকা।","অচিনাকি যেন লাগে বুলি অ-মৌখিক যুক্তি এৰি দিয়া।","পৰ্যাপ্ত বৈচিত্ৰ্য অনুশীলন নকৰা, যাৰ ফলত পৰীক্ষাত অচিনাকি আৰ্হিবোৰ কঠিন যেন লাগে।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত কিমান যুক্তিৰ প্ৰশ্ন আহে?",a:"পদ আৰু প্ৰশ্নকাকতৰ ওপৰত নিৰ্ভৰ কৰি যুক্তিৰ শিতানত সাধাৰণতে ১৫ৰ পৰা ২৫ টা প্ৰশ্ন থাকে।"},{q:"কোনটো যুক্তিৰ শাখা আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"তিনিওটা সোধা হয়, কিন্তু মৌখিক আৰু বিশ্লেষণাত্মক যুক্তিত সাধাৰণতে অ-মৌখিক যুক্তিতকৈ বেছি প্ৰশ্ন থাকে।"},{q:"মই যুক্তিৰ গতি কেনেদৰে বঢ়াব পাৰোঁ?",a:"মানক নিয়মবোৰ শিকি তাৰ পিছত সময়বদ্ধ ছেট অনুশীলন কৰক। বিন্যাস আৰু ধাঁধাৰ বাবে চিত্ৰ আঁকিলেও বহু সময় ৰাহি হয়।"},{q:"নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীৰ বাবে যুক্তি কঠিন নেকি?",a:"নহয়। ই আটাইতকৈ অনুশীলন-বান্ধৱ শিতানবোৰৰ এটা। ধাৰাবাহিক দৈনিক অনুশীলনৰ সৈতে নতুনকৈ আৰম্ভ কৰা প্ৰাৰ্থীয়ে দ্ৰুতভাৱে উন্নতি কৰে।"},{q:"মই অসমীয়াত যুক্তি প্ৰস্তুতি কৰিব পাৰিম নেকি?",a:"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক আৰু পঢ়ি থাকোঁতে আপুনি অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে।"},{q:"axomexam ত যুক্তিৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]},computer:{title:"ADRE, অসম আৰক্ষী আৰু APSC ৰ বাবে কম্পিউটাৰ সজাগতা প্ৰশ্ন | axomexam",meta:"ADRE, অসম আৰক্ষী, APSC, SSC আৰু ৰে'লৱেৰ বাবে বিনামূলীয়া কম্পিউটাৰ সজাগতা অনুশীলন। মূল কথা, হাৰ্ডৱেৰ, ছফ্টৱেৰ, MS Office, নেটৱৰ্কিং, চাইবাৰ সুৰক্ষা, DBMS আৰু সংখ্যা পদ্ধতি।",lead:["কম্পিউটাৰ সজাগতা ADRE, অসম আৰক্ষী, APSC, DHS, DME, গুৱাহাটী উচ্চ ন্যায়ালয় আৰু অন্য ৰাজ্যিক নিযুক্তি পৰীক্ষাত প্ৰস্তুতি তথা নম্বৰ লাভ কৰিবলৈ আটাইতকৈ দ্ৰুত শিতানবোৰৰ এটা। বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক, গতিকে চুটি, একাগ্ৰ পুনৰাবৃত্তিৰ সৈতে প্ৰায় সম্পূৰ্ণ নম্বৰ নিশ্চিত কৰিব পাৰি।","axomexam ত বিষয়টো মূল কথা আৰু হাৰ্ডৱেৰ, ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম, MS Office, নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা, আৰু DBMS তথা সংখ্যা পদ্ধতি আৰু চুটি কৌশলত বিভক্ত। প্ৰতিটো অধ্যায় স্পষ্ট ব্যাখ্যাৰ সৈতে অনুশীলন ছেটলৈ সংযুক্ত।"],sections:[{h:"কম্পিউটাৰ সজাগতাই কি সামৰি লয়",p:["পাঠ্যক্ৰম আৰম্ভ হয় কম্পিউটাৰৰ মূল কথা, সিহঁতৰ প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ আৰু স্মৃতিৰ পৰা, তাৰ পিছত ছফ্টৱেৰ, অপাৰেটিং ছিষ্টেম আৰু এপ্লিকেচন পেকেজলৈ যায়। নেটৱৰ্কিং আৰু ইণ্টাৰনেট, চাইবাৰ সুৰক্ষা আৰু ডেটাবেছৰ ধাৰণাই শিতানটো সম্পূৰ্ণ কৰে।"]},{h:"axomexam ত সামৰি লোৱা কম্পিউটাৰৰ অধ্যায়বোৰ",list:["কম্পিউটাৰৰ মূল কথা আৰু হাৰ্ডৱেৰ — প্ৰজন্ম, ইনপুট আৰু আউটপুট যন্ত্ৰ, স্মৃতি, সংৰক্ষণ আৰু CPU।","ছফ্টৱেৰ আৰু অপাৰেটিং ছিষ্টেম — ছফ্টৱেৰৰ প্ৰকাৰ, অপাৰেটিং ছিষ্টেমৰ কাম, ফাইল পৰিচালনা আৰু সাধাৰণ Windows তথা Linux বৈশিষ্ট্য।","MS Office ছুইট — Word, Excel আৰু PowerPoint, মেনু বিকল্প, চুটি কৌশল আৰু সূত্ৰসহ।","নেটৱৰ্কিং আৰু ইণ্টাৰনেট — নেটৱৰ্কৰ প্ৰকাৰ আৰু ট'প'লজি, IP ঠিকনা, প্ৰ'ট'কল, ব্ৰাউজাৰ, ইমেইল আৰু ইণ্টাৰনেট সেৱা।","চাইবাৰ সুৰক্ষা — ভাইৰাছ, মেলৱেৰ, ফিছিং, হেকিং, পাছৱৰ্ড, এনক্ৰিপচন আৰু সুৰক্ষিত ইণ্টাৰনেট অভ্যাস।","DBMS, সংখ্যা পদ্ধতি আৰু চুটি কৌশল — ডেটাবেছৰ মূল কথা, সংখ্যা পদ্ধতিৰ ৰূপান্তৰ আৰু কীবৰ্ড চুটি কৌশল।"]},{h:"অসম পৰীক্ষাত সৰ্বাধিক পুনৰাবৃত্তি হোৱা কম্পিউটাৰৰ বিষয়",list:["কম্পিউটাৰৰ প্ৰজন্ম আৰু সিহঁতৰ বৈশিষ্ট্য।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰ উদাহৰণসহ।","সাধাৰণ কাৰ্যৰ বাবে কীবৰ্ড চুটি কৌশল।","মৌলিক MS Word আৰু MS Excel ফলন আৰু সূত্ৰ।","সাধাৰণ কম্পিউটাৰ সংক্ষিপ্ত ৰূপৰ সম্পূৰ্ণ ৰূপ।","কম্পিউটাৰ ভাইৰাছৰ প্ৰকাৰ আৰু চাইবাৰ সুৰক্ষাৰ টিপছ।"]},{h:"কম্পিউটাৰ সজাগতা প্ৰস্তুতিৰ কৌশল",list:["সংক্ষিপ্ত ৰূপ আৰু সম্পূৰ্ণ ৰূপৰ এপৃষ্ঠাৰ তালিকা বনাই প্ৰতিদিনে পুনৰাবৃত্তি কৰক।","কীবৰ্ড চুটি কৌশল কম্পিউটাৰত প্ৰকৃততে ব্যৱহাৰ কৰি শিকক।","ইনপুট, আউটপুট আৰু সংৰক্ষণ যন্ত্ৰৰ এটা সৰু টেবুল প্ৰস্তুত কৰক।","মৌলিক Excel সূত্ৰ আৰু Word মেনু বিকল্প অনুশীলন কৰক।","সংখ্যা পদ্ধতিৰ ৰূপান্তৰ কেইটামান উদাহৰণৰ সৈতে পুনৰাবৃত্তি কৰক।","প্ৰতিটো বিষয় পঢ়াৰ পিছত অধ্যায়ভিত্তিক ছেট এটা চেষ্টা কৰক।"]},{h:"যিবোৰ সাধাৰণ ভুল এৰাই চলিব লাগে",list:["সহজ যেন লাগে বুলি বিষয়টো এৰি দিয়া, আৰু পিছত সম্পূৰ্ণ ৰূপবোৰ পাহৰি যোৱা।","RAM আৰু ROM, বা হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ দৰে একেধৰণৰ শব্দ মিহলাই পেলোৱা।","চুটি কৌশল অনুশীলন নকৰা, যিবোৰ প্ৰতি বছৰে প্ৰত্যক্ষভাৱে সোধা হয়।","ভেটি অস্পষ্ট ৰাখি উন্নত বিষয় পঢ়া।"]}],faqs:[{q:"ADRE আৰু অসম আৰক্ষীত কম্পিউটাৰ সজাগতা সোধা হয় নেকি?",a:"হয়। ই সাধাৰণ সজাগতা শিতানৰ অংশ আৰু নম্বৰ লাভ কৰিবলৈ আটাইতকৈ সহজ ক্ষেত্ৰবোৰৰ এটা, কাৰণ বেছিভাগ প্ৰশ্ন প্ৰত্যক্ষ আৰু তথ্যভিত্তিক।"},{q:"কম্পিউটাৰ সজাগতা প্ৰস্তুতি কৰিবলৈ কিমান সময় লাগে?",a:"পাঠ্যক্ৰম সৰু আৰু বেছিভাগ তথ্যভিত্তিক হোৱাৰ বাবে এৰ পৰা দুই সপ্তাহৰ একাগ্ৰ পুনৰাবৃত্তি সাধাৰণতে যথেষ্ট।"},{q:"কোনবোৰ কম্পিউটাৰৰ বিষয় আটাইতকৈ গুৰুত্বপূৰ্ণ?",a:"মূল কথা, হাৰ্ডৱেৰ আৰু ছফ্টৱেৰৰ পাৰ্থক্য, MS Office চুটি কৌশল আৰু সূত্ৰ, নেটৱৰ্কিংৰ মূল কথা আৰু চাইবাৰ সুৰক্ষা সৰ্বাধিক বাৰে সোধা হয়।"},{q:"এই শিতান প্ৰস্তুতি কৰিবলৈ কম্পিউটাৰ প্ৰয়োজন নেকি?",a:"চুটি কৌশল আৰু MS Office ৰ বাবে কম্পিউটাৰে সহায় কৰে, কিন্তু তত্ত্বখন টোকা আৰু অনুশীলন প্ৰশ্নৰ পৰা যিকোনো যন্ত্ৰত প্ৰস্তুতি কৰিব পাৰি।"},{q:"মই অসমীয়াত কম্পিউটাৰ সজাগতা পঢ়িব পাৰিম নেকি?",a:"হয়। axomexam ৰ অনুশীলন ছেট আৰু ব্যাখ্যা দ্বিভাষিক আৰু অসমীয়া বা ইংৰাজীত পঢ়িব পাৰি।"},{q:"axomexam ত কম্পিউটাৰ সজাগতাৰ অনুশীলন বিনামূলীয়া নেকি?",a:"হয়। axomexam.in ৰ প্ৰতিটো অনুশীলন ছেট, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া, কোনো লগইন বা চাবস্ক্ৰিপচন নাই।"}]}};function qa(e){return u.lang==="as"&&At[e]?At[e]:Ea[e]||""}const St={quant:["অনুশীলন আৰম্ভ কৰাৰ আগতে এই শিতানৰ মূল সূত্ৰ আৰু ধাৰণাসমূহ পুনৰালোচনা কৰক।","ঘড়ী লগাই প্ৰশ্ন সমাধান কৰক, যাতে পৰীক্ষাৰ দিনা প্ৰয়োজনীয় গতিত অভ্যস্ত হয়।","প্ৰতিটো ভুল উত্তৰৰ ব্যাখ্যা পঢ়ক আৰু কিয় ভুল কৰিছিল সেইটো টুকি লওক।","কেইদিনমানৰ পিছত একেখিনি ছেটলৈ ঘূৰি আহি নিজৰ শুদ্ধতা বাঢ়িছে নে নাই পৰীক্ষা কৰক।"],general:["প্ৰথমে বিষয়ৰ টোকা এবাৰ পঢ়ক, তাৰ পিছত সম্পৰ্কিত প্ৰশ্ন সমাধান কৰি নিজৰ স্মৃতি পৰীক্ষা কৰক।","যি তথ্যবোৰ বাৰে বাৰে পাহৰি যাই সেইবোৰ চিহ্নিত কৰি চুটি চুটি অধিবেশনত পুনৰালোচনা কৰক।","দুয়োটা ভাষাত অনুশীলন কৰক, যাতে একেখিনি তথ্য অসমীয়া আৰু ইংৰাজী দুয়োতে চিনি পায়।","শুদ্ধ উত্তৰ দিয়া প্ৰশ্নৰো ব্যাখ্যা পঢ়ক, যাতে মনত ৰখাৰ শক্তি বাঢ়ে।"]};function Pa(e){const a=["math","arithmetic","advanced-math","statistics-and-data-interpretation","science","physics","chemistry","biology","reasoning","verbal-reasoning","analytical-critical-reasoning","non-verbal-reasoning","computer","dbms-number-shortcuts"].indexOf(e)!==-1;return u.lang==="as"?a?St.quant:St.general:a?["Revise the basic formulas and concepts of this section before you begin practising.","Attempt the questions under a timer so that you get used to the speed expected on exam day.","Read the explanation for every wrong answer and note down exactly why you missed it.","Return to the same sets after a few days and check whether your accuracy has improved."]:["Read the topic notes once, then attempt the related questions to test your recall.","Mark the facts you keep forgetting and revise them in short, repeated sessions.","Practise in both languages so you can recognise the same fact in Assamese and English.","Review the explanations even for questions you answered correctly to strengthen retention."]}function Ta(e){const t=e.info||"",a=e.items||[],s=e.tips||[],n=e.faqs||[],o=u.lang==="as",i=a.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${d(o?"ইয়াত কি কি সামৰি লোৱা হৈছে":"What is covered here")}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${a.map(p=>`<li><strong>${d(p.name)}</strong>${p.count?` &mdash; ${p.count} ${d(p.unit||"topics")}`:""}</li>`).join("")}</ul>`:"",r=s.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${d((o?"কেনেকৈ প্ৰস্তুতি ল'ব: ":"How to prepare ")+(e.name||""))}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${s.map(p=>`<li>${d(p)}</li>`).join("")}</ul>`:"",c=n.length?`<h3 style="color:var(--ink,#0f172a); margin-top:24px;">${d(o?"সঘনাই সোধা প্ৰশ্ন":"Frequently Asked Questions")}</h3><div class="seo-faq">${n.map(p=>`<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">${d(p.q)}</summary><p style="margin:8px 0 0;">${d(p.a)}</p></details>`).join("")}</div>`:"";return`
      <section class="section seo-deep" style="padding-bottom:48px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${d(e.h2||e.name||"")}</h2>
          ${t?`<p>${d(t)}</p>`:""}
          ${i}
          ${r}
          ${c}
        </div>
      </section>`}function La(e,t){if(!e||!t)return;const a=document.createElement("div");a.innerHTML=Ta(t),a.firstElementChild&&e.appendChild(a.firstElementChild)}function Ia(e){return!e||!e.length?"":'<h3 style="color:var(--ink,#0f172a); margin-top:22px;">'+(u.lang==="as"?"সঘনাই সোধা প্ৰশ্ন":"Frequently Asked Questions")+'</h3><div class="seo-faq">'+e.map(a=>'<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">'+d(a.q)+'</summary><p style="margin:8px 0 0;">'+d(a.a)+"</p></details>").join("")+"</div>"}function Ra(e){return(e||[]).map(t=>{let a='<h3 style="color:var(--ink,#0f172a); margin-top:22px;">'+d(t.h)+"</h3>";return t.p&&t.p.length&&(a+=t.p.map(s=>"<p>"+d(s)+"</p>").join("")),t.list&&t.list.length&&(a+='<ul style="margin:8px 0 0 20px; line-height:1.9;">'+t.list.map(s=>"<li>"+d(s)+"</li>").join("")+"</ul>"),a}).join("")}function Da(e){const t=(e.lead||[]).map(s=>"<p>"+d(s)+"</p>").join(""),a=e.h2||String(e.title||"").replace(/\s*\|\s*axomexam\s*$/i,"");return'<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;"><div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;"><h2 style="margin-top:0; color:var(--ink,#0f172a);">'+d(a)+"</h2>"+t+Ra(e.sections)+Ia(e.faqs)+"</div></section>"}function O(e,t){const a=t&&t.id?u.lang==="as"&&Ma[t.id]||Ct[t.id]:null;if(a){const c=document.createElement("div");c.innerHTML=Da(a),c.firstElementChild&&e.appendChild(c.firstElementChild);return}const s=t.name||"",n=t.info||qa(t.id)||"",o=(t.faqs||[]).slice(),i=t.count||0,r=t.total||0;if(!t.noDefaults){const c=u.lang==="as";o.push({q:c?s+" axomexam ত বিনামূলীয়া নেকি?":"Is "+s+" available for free on axomexam?",a:c?"হয়। axomexam.in ৰ প্ৰতিটো মক টেষ্ট, প্ৰশ্ন-সংগ্ৰহ, ব্যাখ্যা আৰু PDF টোকা সম্পূৰ্ণ বিনামূলীয়া। কোনো লগইন, চাবস্ক্ৰিপচন বা গুপুত মাচুল নাই।":"Yes. Every mock test, question bank, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}),o.push({q:c?s+" অসমীয়া আৰু ইংৰাজী দুয়ো ভাষাত পঢ়িব পাৰিম নেকি?":"Can I study "+s+" in Assamese as well as English?",a:c?"হয়। প্ৰশ্ন আৰু ব্যাখ্যা দ্বিভাষিক। পঢ়ি থাকোঁতে অসমীয়া আৰু ইংৰাজীৰ মাজত সলনি কৰিব পাৰে, যাৰ ফলত একেখিনি ধাৰণা দুয়ো ভাষাত দৃঢ় হয়।":"Yes. Questions and explanations are bilingual. You can switch between Assamese and English while reading so the same concept is reinforced in both languages."}),i>0&&o.push({q:c?s+" ৰ বাবে কিমান সমল উপলব্ধ?":"How much material is available for "+s+"?",a:c?"এই শিতানত এতিয়া "+i+" টা বিষয়"+(r>0?" আৰু প্ৰায় "+r+" টা প্ৰশ্ন":"")+" আছে, নতুন প্ৰশ্ন যোগ হোৱাৰ লগে লগে নিয়মীয়াকৈ হালনাগাদ কৰা হয়।":"This section currently offers "+i+" topics"+(r>0?" with around "+r+" questions":"")+" and is updated regularly as new questions are added."})}La(e,{h2:t.h2||s+(u.lang==="as"?" — পৰিচয়":" - Overview"),name:s,info:n,items:t.items||[],tips:t.tips||Pa(t.id),faqs:o})}function E(e){if(e==null)return"";let t=String(e);return/\$[^$]+\$|\\\([^\\]+\\\)/.test(t)||(t=d(t),t=t.replace(/sqrt\(([^)]+)\)/gi,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/√\(([^)]+)\)/g,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/\^{([^}]+)}/g,"<sup>$1</sup>"),t=t.replace(/\^\(([^)]+)\)/g,"<sup>$1</sup>"),t=t.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sup>$1</sup>"),t=t.replace(/_{([^}]+)}/g,"<sub>$1</sub>"),t=t.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sub>$1</sub>"),t=t.replace(/\+\/-/g,"&plusmn;"),t=t.replace(/&lt;=/g,"&le;").replace(/&gt;=/g,"&ge;")),t}function Z(e){return!e||!/\$|\\\(|\\\[/.test(e.textContent||"")?Promise.resolve():$a().then(function(){if(typeof renderMathInElement=="function")try{renderMathInElement(e,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}],throwOnError:!1})}catch{}}).catch(function(){})}function T(e,t,a){if(!e)return"";const s=a||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),n=s==="en"?"english":"assamese",o=h=>h==null?"":Array.isArray(h)?h.map(x=>`<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${E(x)}</div>`).join(""):typeof h=="object"?o(h[s]||h.as||h.en||Object.values(h)[0]||""):String(h),i=h=>t==="answer"?Ve(e,h,s):h;if(t==="answer"){const h=za(e),x=F(e,s),y=e.answer!==void 0?e.answer:e.a,g=Array.isArray(y)||y&&typeof y=="object"&&Object.keys(y).some(w=>Array.isArray(y[w]));if(h>=0&&h<x.length&&x[h]!==void 0&&String(x[h]).trim()!==""&&!g)return o(Ve(e,h,s))}if(e[n]&&typeof e[n]=="object"){if(e[n][t]!==void 0)return o(i(e[n][t]));const h=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(h&&e[n][h]!==void 0)return o(i(e[n][h]))}const r=`${t}_${s}`;if(e[r]!==void 0&&e[r]!==null)return o(i(e[r]));const c=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(c){const h=`${c}_${s}`;if(e[h]!==void 0&&e[h]!==null)return o(i(e[h]))}const p=[t];t==="question"&&p.push("q","question_text","headline","title"),t==="answer"&&p.push("a","ans","content","body","description"),t==="explanation"&&p.push("exp","desc","key_points","summary");for(const h of p){const x=e[h];if(x!=null)return o(i(x))}if(t==="answer"){const h=Number.isInteger(e.answer)?e.answer:Number.isInteger(e.correct)?e.correct:Number.isInteger(e.correct_index)?e.correct_index:-1;if(h>=0&&F(e,s)[h]!==void 0)return o(Ve(e,h,s))}const m=`${t}_as`,f=`${t}_en`;return e[m]!==void 0&&e[m]!==null?o(e[m]):e[f]!==void 0&&e[f]!==null?o(e[f]):""}function ee(e,t){if(e==null)return"";if(typeof e=="string")return e;if(Array.isArray(e))return e.join(`
`);const a=t||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),s=e[a]||e.as||e.en||"";return Array.isArray(s)?s.join(`
`):String(s)}function F(e,t){if(!e)return[];const a=t||(u.mock&&u.mock.testLang?u.mock.testLang:u.lang),s=a==="en"?"english":"assamese";if(e[s]&&Array.isArray(e[s].options))return e[s].options.map(String);if(e.options&&typeof e.options=="object"&&!Array.isArray(e.options)){const o=e.options[a]||e.options.as||e.options.en;if(Array.isArray(o))return o.map(String)}if(Array.isArray(e.options)&&e.options.length)return e.options.map(o=>typeof o=="string"?o:typeof o=="object"&&o!==null?o[a]||o.as||o.en||"":String(o));const n=e[`options_${a}`];return Array.isArray(n)&&n.length?n.map(String):Array.isArray(e.options_as)&&e.options_as.length?e.options_as.map(String):Array.isArray(e.options_en)&&e.options_en.length?e.options_en.map(String):[]}function Ve(e,t,a){const s=F(e,a);if(!s||!s.length)return t;const n="ABCDEFGHIJ";let o=-1;if(Number.isInteger(t))o=t;else if(typeof t=="string"){const c=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(t.trim());c&&(o=n.indexOf(c[1].toUpperCase()))}if(o<0||o>=s.length)return t;const i=n[o]||"",r=s[o];return r==null||String(r).trim()===""?i||t:i?`(${i}) ${r}`:String(r)}function za(e){if(!e)return-1;const t=[e.correct,e.correct_index,e.answer,e.a];for(const a of t){if(Number.isInteger(a))return a;if(typeof a=="string"){const s=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(a.trim());if(s)return"ABCDEFGHIJ".indexOf(s[1].toUpperCase())}}return-1}function Ke(e){return e==null?"":String(e).replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi,"").replace(/<\s*script[\s\S]*$/gi,"").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi,"").replace(/\son[a-z]+\s*=\s*'[^']*'/gi,"").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi,"").replace(/javascript\s*:/gi,"")}function ja(e){if(!e)return"";const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{rows:e},a=Array.isArray(t.head)?t.head:Array.isArray(t.headers)?t.headers:[],s=Array.isArray(t.rows)?t.rows:[];if(!a.length&&!s.length)return"";const n=i=>i==null?"":E(ee(i));return`
      <div class="nv-table-wrap">${t.caption?`<div class="nv-table-cap">${d(ee(t.caption))}</div>`:""}
        <table class="nv-table">
          ${a.length?`<thead><tr>${a.map(i=>`<th>${n(i)}</th>`).join("")}</tr></thead>`:""}
          <tbody>${s.map(i=>`<tr>${(Array.isArray(i)?i:[]).map(r=>`<td>${n(r)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`}function ie(e){if(!e)return"";const t=[];return e.fig&&t.push(`<div class="nv-media">${Ke(e.fig)}</div>`),e.table&&t.push(ja(e.table)),t.join("")}function re(e){return!e||!Array.isArray(e.options)||!e.options.some(t=>t&&typeof t=="object"&&t.fig)?null:e.options.map((t,a)=>{const n=t&&typeof t=="object"&&t.option?String(t.option):"ABCDEFGHIJ"[a]||"";return!t||typeof t!="object"?{letter:n,fig:"",text:String(t||"")}:{letter:n,fig:Ke(t.fig||""),text:ee(t)||""}})}function V(e,{compact:t}={}){const a=re(e);return a?`
      <div class="nv-fig-grid${t?" nv-fig-grid-compact":""}">
        ${a.map(s=>`
          <div class="nv-fig-item">
            <div class="nv-fig-key">(${s.letter})</div>
            <div class="nv-fig-box">${s.fig||(s.text?`<span class="nv-fig-textonly">${E(s.text)}</span>`:"")}</div>
            ${s.fig&&s.text?`<div class="nv-fig-cap">${E(s.text)}</div>`:""}
          </div>`).join("")}
      </div>`:""}function qe(e){return e==null?"":typeof e=="object"?ee(e):String(e)}function Pe(e){return e&&typeof e=="object"&&typeof e.fig=="string"?Ke(e.fig):""}function Ha(){const e=b("footer.site-footer")||b("footer");if(!e)return;const t=u.uiLang==="as";e.innerHTML=`
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
    `}function Te(){const e=b("#master-search");e&&(e.placeholder=l("search.placeholder")),M("[aria-label]").forEach(t=>{const a=t.getAttribute("data-aria-i18n");a&&t.setAttribute("aria-label",l(a))}),Ha()}function Ba(){const e=document.querySelector(".header-center .theme-toggle")||document.querySelector(".site-header .theme-toggle");if(e&&!document.querySelector(".desktop-lang-toggle")){const t=document.createElement("div");t.className="desktop-lang-toggle",t.style.cssText="display:inline-flex;align-items:center;background:var(--bg-subtle,#f1f5f9);border:1px solid var(--border,#e2e8f0);border-radius:20px;padding:2px;margin-right:8px;",t.innerHTML=`
        <button type="button" class="glang-btn ${u.uiLang==="en"?"active":""}" data-glang="en" style="border:none;background:${u.uiLang==="en"?"var(--primary,#0ea5e9)":"transparent"};color:${u.uiLang==="en"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">EN</button>
        <button type="button" class="glang-btn ${u.uiLang==="as"?"active":""}" data-glang="as" style="border:none;background:${u.uiLang==="as"?"var(--primary,#0ea5e9)":"transparent"};color:${u.uiLang==="as"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">অসমীয়া</button>
      `,e.insertAdjacentElement("beforebegin",t)}M(".glang-btn").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();const s=t.dataset.glang;if(u.uiLang!==s){u.uiLang=s,document.body.setAttribute("data-ui-lang",s);try{localStorage.setItem("axomexam-ui-lang",s)}catch{}M(".glang-btn").forEach(n=>{const o=n.dataset.glang===u.uiLang;n.classList.toggle("active",o),n.style.background=o?"var(--primary,#0ea5e9)":"transparent",n.style.color=o?"#fff":"var(--ink-soft,#64748b)"}),Te(),Le(),Re(),je()}})})}function Fa(e){const t=[],a={},s=[],n=(i,r,c,p)=>{const m=[r.id,c?c.id:"",p?p.id:""].filter(Boolean).concat([i.id]).join("/"),f={path:m,cat:r,sub:c,section:p,topic:i,title:i.title||i.name,desc:i.description,tags:i.tags||[],nQuestions:(i.questions||[]).length,pdf:i.pdf||null,popularity:Number(i.popularity)||0};a[m]=f,s.push(f)},o=i=>{i.name=i.name||{en:i.id,as:i.id},i.description=i.description||{};const r=i.subcategories||[];if(r.length)r.forEach(c=>{c.name=c.name||{en:c.id,as:c.id};const p=c.sections||[];if(p.length)p.forEach(m=>{m.name=m.name||{en:m.id,as:m.id},(m.topics||[]).forEach(f=>n(f,i,c,m))});else if((c.topics||[]).length)(c.topics||[]).forEach(m=>n(m,i,c,null));else{const m={id:c.id,name:c.name,description:c.description,popularity:Number(c.popularity)||0},f=[i.id,c.id].join("/"),h={path:f,cat:i,sub:c,section:null,topic:m,title:m.name,desc:m.description,tags:[],nQuestions:0,pdf:null,popularity:m.popularity};a[f]=h,s.push(h)}});else{const c=i.sections||[];c.length?c.forEach(p=>{p.name=p.name||{en:p.id,as:p.id},(p.topics||[]).forEach(m=>n(m,i,null,p))}):(i.topics||[]).forEach(p=>n(p,i,null,null))}t.push(i)};return(e.categories||[]).forEach(o),{categories:t,topicMap:a,topicIndex:s}}function Oa(e){if(!e||typeof e!="object")return;u.counts=e;const t=e.topicCounts||{};u.topicIndex.forEach(a=>{Object.prototype.hasOwnProperty.call(t,a.path)&&(a.nQuestions=Number(t[a.path])||0)}),typeof e.examsTotal=="number"&&(u.examQuestionTotal=e.examsTotal,u.examTotalLoaded=!0),typeof e.topicsTotal=="number"&&(u.topicsTotal=e.topicsTotal)}function z(e){const t=u.categories.find(a=>a.id===e);return t&&t.color||(typeof CATEGORY_COLORS<"u"?CATEGORY_COLORS[e]||CATEGORY_COLORS.default:"#0ea5e9")}function Na(e){const t=u.categories.find(a=>a.id===e);return t&&t.icon||(typeof CATEGORY_ICONS<"u"?CATEGORY_ICONS[e]:"A")||"A"}function te(e){const t=typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG[e];return t?`<span class="cat-svg">${t}</span>`:d(Na(e))}function le(e,t){const a=String(e||"");if(typeof TOPIC_ICON_RULES<"u"){for(const[s,n]of TOPIC_ICON_RULES)if(s.test(a))return`<span class="cat-svg">${n}</span>`}return te(t)}function he(e){return u.topicIndex.filter(t=>t.cat.id===e.id).length}function Et(){const e=u.categories.slice(),t=e.findIndex(a=>a.id==="articles");if(t!==-1){const[a]=e.splice(t,1),s=e.findIndex(n=>n.id==="computer");s!==-1?e.splice(s+1,0,a):e.push(a)}return e}function Ga(e,t){const a=e.subcategories||e.sections||[],s=!!(a&&a.length),n=t&&t.split("/")[0]===e.id;return`
      <li class="${s?"has-drop":""}">
        <a class="nav-link ${n?"active":""}" href="/category/${e.id}">
          <span>${d(W(e.name))}</span>
          ${s?'<span class="caret"></span>':""}
        </a>
        ${s?_a(e,t):""}
      </li>`}function _a(e,t){return`
      <div class="dropdown">
        ${(e.subcategories||e.sections||[]).map(s=>{const n=s.sections;return n&&n.length?`
              <div class="has-drop">
                <a href="/category/${e.id}/${s.id}">
                  <span>${d(W(s.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${n.map(r=>`
                    <a href="/category/${e.id}/${s.id}/${r.id}">
                      <span>${d(W(r.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`:`<a href="${!(s.topics&&s.topics.length)?`/topic/${e.id}/${s.id}`:`/category/${e.id}/${s.id}`}">${d(W(s.name))}</a>`}).join("")}
      </div>`}const Je=["gk","science","math","history","reasoning"];function Le(){const e=b("#nav-list");if(!e)return;const t=Mt(),a=u.categories.filter(o=>Je.includes(o.id)),s=u.categories.filter(o=>!Je.includes(o.id)),n=[];n.push(Ie("/",l("nav.home"),t)),a.forEach(o=>n.push(Ga(o,t))),n.push(Ie("/mock-test",l("nav.mock"),t)),n.push(Ie("/exams",l("nav.exams"),t)),n.push(Ie("/downloads",l("nav.downloads"),t)),n.push(Qa(s,t)),e.innerHTML=n.join("")}function Ie(e,t,a){return`<li><a class="nav-link ${a.split("/")[0]===e.replace(/^\//,"")?"active":""}" href="${e}">${d(t)}</a></li>`}function Qa(e,t){const a=t.split("/")[0],s=e.some(h=>h.id===a)||["submit","previous-year","ebooks","exams","download-app","contact","about","privacy","privacy-policy","terms","disclaimer"].includes(a),n=e.map(h=>`<a class="${a===h.id?"active":""}" href="/category/${h.id}">${d(W(h.name))}</a>`),i=`
      <a class="ebook-nav-link ${a==="ebooks"?"active":""}" href="/ebooks">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        <span>${d(l("nav.ebooks"))}</span>
      </a>`,c=`
      <a class="ebook-nav-link ${a==="exams"?"active":""}" href="/exams">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${d(l("nav.exams"))}</span>
      </a>`,p=e.findIndex(h=>h.id==="articles");p!==-1?n.splice(p+1,0,i,c):n.push(i,c);const m=n.join(""),f=[["/previous-year",l("nav.previousYear")],["/submit",l("nav.submit")],["/contact",l("nav.contact")],["/download-app",l("nav.downloadApp")]].map(([h,x])=>`<a class="${a===h.replace(/^\//,"")?"active":""}" href="${h}">${d(x)}</a>`).join("");return`
      <li class="has-drop">
        <a class="nav-link ${s?"active":""}" href="/categories">
          <span>${d(l("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${m?`<div class="d-label">${d(l("nav.categories"))}</div>${m}`:""}
          <div class="d-label">${d(l("mmenu.extra"))}</div>
          ${f}
        </div>
      </li>`}function Re(){const e=b("#mobile-nav");if(!e)return;const t=Mt(),s=Et().slice(),n=s.findIndex(g=>g.id==="articles"),o=s.findIndex(g=>g.id==="computer");if(n!==-1&&o!==-1&&n!==o-1){const[g]=s.splice(n,1);s.splice(s.findIndex(w=>w.id==="computer"),0,g)}const i=fe(),r=g=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g}</svg>`,c=(g,w)=>`<span class="m-ico" style="--mc:${w}">${/^\s*<(?:svg|span)\b/i.test(g)?g:r(g)}</span>`,p=g=>{const w=g.replace(/^\//,"").replace(/\/$/,"");return w==="mock-test"?i[0]==="mock-test":t===w||t.split("/")[0]===w},m=s.map(g=>{const w=g.subcategories||g.sections||[];return`
        <li class="m-cat">
          <div class="m-row">
            <a class="m-item ${t.split("/")[0]===g.id?"active":""}" href="/category/${g.id}">
              ${c(te(g.id),z(g.id))}
              <span class="m-txt">
                <b>${d(W(g.name))}</b>
                <small>${he(g)} ${d(l("cat.topics"))}</small>
              </span>
            </a>
            ${w.length?`<button class="m-toggle" data-toggle data-target="${g.id}" aria-label="toggle"><span class="caret"></span></button>`:""}
          </div>
          ${w.length?`<div class="m-sub" id="msub-${g.id}">${w.map(A=>{const C=A.sections;return C&&C.length?`
                <div class="m-row m-sub-row">
                  <a class="m-sub-link" href="/category/${g.id}/${A.id}">${d(W(A.name))}</a>
                  <button class="m-toggle m-toggle-sm" data-toggle data-target="${g.id}-${A.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${g.id}-${A.id}">
                  ${C.map(q=>`<a class="m-sub-link" href="/category/${g.id}/${A.id}/${q.id}">${d(W(q.name))}</a>`).join("")}
                </div>`:`<a class="m-sub-link" href="${!(A.topics&&A.topics.length)?`/topic/${g.id}/${A.id}`:`/category/${g.id}/${A.id}`}">${d(W(A.name))}</a>`}).join("")}</div>`:""}
        </li>`}),h=[{href:"/mock-test",key:"nav.mock",color:"#0ea5e9",svg:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>'},{href:"/ebooks",key:"nav.ebooks",color:"#f59e0b",svg:'<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>'},{href:"/exams",key:"nav.exams",color:"#8b5cf6",svg:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',isNew:!0},{href:"/downloads",key:"nav.downloads",color:"#0d9488",svg:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'}].map(g=>`
      <a class="m-tile ${p(g.href)?"active":""}" href="${g.href}" style="--mc:${g.color}">
        ${g.isNew?`<span class="m-new">${u.uiLang==="as"?"নতুন":"NEW"}</span>`:""}
        ${c(g.svg,g.color)}
        <b>${d(l(g.key))}</b>
      </a>`),y=[{href:"/previous-year",key:"nav.previousYear",color:"#10b981",svg:'<path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>'},{href:"/download-app",key:"nav.downloadApp",color:"#16a34a",svg:'<rect x="7" y="2" width="10" height="20" rx="2.2"/><path d="M12 7v7"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/>'},{href:"/submit",key:"nav.submit",color:"#e11d48",svg:'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'},{href:"/contact",label:u.uiLang==="as"?"যোগাযোগ":"Contact Us",color:"#64748b",svg:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'}].map(g=>`
      <a class="m-more ${p(g.href)?"active":""}" href="${g.href}" style="--mc:${g.color}">
        ${c(g.svg,g.color)}
        <span>${d(g.label||l(g.key))}</span>
      </a>`);e.innerHTML=`
      <li class="m-block">
        <p class="m-label">${d(l("nav.quickStart"))}</p>
        <div class="m-tiles">${h.join("")}</div>
      </li>
      <li class="m-block">
        <p class="m-label">${d(l("nav.categories"))}</p>
        <ul class="m-cats">${m.join("")}</ul>
      </li>
      <li class="m-block">
        <p class="m-label">${d(l("mmenu.extra"))}</p>
        <div class="m-more-grid">${y.join("")}</div>
      </li>`,M("[data-toggle]",e).forEach(g=>{g.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();const A=b(`#msub-${g.dataset.target}`);A&&(A.classList.toggle("open"),g.classList.toggle("open"))})})}function fe(){let e=window.location.pathname.replace(/^\/|\/$/g,"");return e=e.replace(/^as(?:\/|$)/,""),window.location.search&&window.location.search.startsWith("?/")&&(e=window.location.search.slice(2).replace(/~and~/g,"&"),window.history.replaceState(null,null,"/"+e)),e.split("/").filter(Boolean)}function Xe(){return/^\/as(\/|$)/.test(window.location.pathname)}function Wa(){const e=window.location.pathname,t=e.match(/^\/as(\/.*)?$/);return t?t[1]||"/":"/as"+e}function Mt(){return fe().filter(e=>e!=="category"&&e!=="topic"&&e!=="mock-test").join("/")}function De(e){window.history.pushState(null,null,e),Le(),Re(),je()}function Ze(){const e=document.documentElement,t=e.style.scrollBehavior;e.style.scrollBehavior="auto",window.scrollTo(0,0),e.style.scrollBehavior=t}function ze(e,t){if(!e)return!1;let a=null;try{a=document.getElementById(e)||document.querySelector(`[name="${CSS.escape(e)}"]`)}catch{a=document.getElementById(e)}if(!a)return!1;const s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h"))||0,n=a.getBoundingClientRect().top+window.pageYOffset-s-16,o=document.documentElement,i=o.style.scrollBehavior;return o.style.scrollBehavior=t?"smooth":"auto",window.scrollTo(0,Math.max(0,n)),t?setTimeout(()=>{o.style.scrollBehavior=i},600):o.style.scrollBehavior=i,!0}function Ya(){const e=window.location.hash;if(!e||e==="#")return;let t=e.slice(1);try{t=decodeURIComponent(t)}catch{}if(ze(t,!1))try{history.replaceState(history.state,"",window.location.pathname+window.location.search)}catch{}}function Ua(){try{const e=fe();let t="axomexam | Assam Exam Preparation – Mock Tests, Previous Papers & PDF Notes",a="Free bilingual (Assamese & English) Q&A, mock tests and PDF notes for Assam exam, ADRE, APSC and Assam Police preparation.";if(e[0]==="topic"){const i=u.topicMap[e.slice(1).join("/")];if(i){const r=v(i.topic.title||i.title);t=r?r+" | axomexam":t;const c=v(i.topic.description||i.desc);c&&(a=c)}}else if(e[0]==="category"&&e[1]){const i=u.categories.find(r=>r.id===e[1]);if(i){const r=v(i.name);t=r?r+" | axomexam":t;const c=v(i.description);c&&(a=c)}}else if(e[0]==="mock-test"){const i=u.categories.find(c=>c.id===e[1]),r=i?v(i.name):"";t=(r?r+" ":"")+"Mock Test | axomexam"}else if(e[0]==="previous-year")t="Previous Year Question Papers | axomexam";else if(e[0]==="trending")t="Trending Topics | axomexam";else if(e[0]==="downloads")t="Download Free PDF Notes | axomexam";else if(e[0]==="download-app")t="Download axomexam App (APK) | axomexam",a="Download the free axomexam Android app (APK, v2.1) — mock tests, bilingual Q&A practice, e-books and previous year papers for ADRE, APSC, Assam Police, SSC & Railway exams.";else if(e[0]==="ebooks")t=e[1]?"Read E-Book Online | axomexam":"E-Books Library | axomexam",a="Free online e-books for Assam competitive exams (ADRE, APSC, Assam Police) — Assam History, Indian History, Art & Culture, Polity, Economy and Geography. Read online in English and Assamese, no PDF download.";else if(e[0]==="exams"){const i=(u.exams||[]).find(h=>h.id===e[1]),r=i?v(i.title):"",c=i&&e[2]?(i.sections||[]).find(h=>h.id===e[2]):null,p=c?v(c.title):"",m=c&&e[3]?(c.subcategories||[]).find(h=>h.id===e[3]):null,f=m?v(m.title):"";f?(t=f+(p?" — "+p:"")+" | axomexam",a="Practise "+f+" MCQs with answers and explanations for Assam Police Constable (AB & UB) and other competitive exams in Assam."):p?t=p+(r?" — "+r:"")+" | axomexam":e[1]?t=(r?r+" ":"")+"Exam Book | axomexam":t="Your Exams | axomexam",f||(a="Choose your exam and prepare subject-wise — syllabus, Elementary Mathematics, General English, Logical Reasoning & Mental Ability, Assam's History, Geography & Culture and General Knowledge & Current Affairs. Read online in English and Assamese.")}else if(e[0]==="current-affairs"){const i=(e[1]||"").replace(/-/g," ").replace(/\b\w/g,r=>r.toUpperCase());i?(t=i+" Current Affairs Q&A | axomexam",a="Free "+i+" current affairs questions with explained answers in Assamese and English — updated regularly by the axomexam team."):(t="Free Current Affairs Questions & Answers | axomexam",a="Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more, updated by the axomexam team.")}else e[0]==="categories"?t="All Categories | axomexam":["about","privacy","privacy-policy","terms","disclaimer","contact","submit","editorial-policy","editorial-team","sources","updates"].includes(e[0])&&(t=({about:"About Us",privacy:"Privacy Policy","privacy-policy":"Privacy Policy",terms:"Terms & Conditions",disclaimer:"Disclaimer",contact:"Contact Us",submit:"Submit Q&A","editorial-policy":"Editorial Policy","editorial-team":"Editorial Team",sources:"Official Sources",updates:"Content Updates"}[e[0]]||"axomexam")+" | axomexam");document.title=t;let s=document.querySelector('meta[name="description"]');s||(s=document.createElement("meta"),s.name="description",document.head.appendChild(s)),s.content=a;let n=window.location.pathname;n.endsWith("/")||(n+="/");const o=document.querySelector('link[rel="canonical"]');o&&(o.href=window.location.origin+n)}catch{}}const qt=Object.create(null);let Pt=null;function Va(){const e=document.querySelector("section.ca-rich");return e?e.getAttribute("data-ca-rich"):null}function Tt(){const e=document.querySelector("section.ca-rich");e&&e.remove();const t=Array.from(document.head.childNodes),a=t.findIndex(s=>s.nodeType===8&&/ca-rich-schema:/.test(s.nodeValue||""));if(a!==-1)for(let s=a;s<t.length;s++){const n=t[s],o=n.nodeType===8&&/\/ca-rich-schema/.test(n.nodeValue||"");if(n.parentNode&&n.parentNode.removeChild(n),o)break}}async function Ka(e){const t=Pt={},a=Va();if(!e){a!==null&&Tt();return}if(a===e)return;const s=e==="index"?"/current-affairs/":"/current-affairs/"+encodeURIComponent(e)+"/";let n=qt[s];if(n===void 0)try{const g=await fetch(s,{cache:"no-store"});if(!g.ok)return;n=qt[s]=await g.text()}catch{return}if(Pt!==t)return;let o;try{o=new DOMParser().parseFromString(n,"text/html")}catch{return}const i=o.querySelector("section.ca-rich");if(!i)return;const r=Array.from(o.head.childNodes),c=r.findIndex(g=>g.nodeType===8&&/ca-rich-schema:/.test(g.nodeValue||"")),p=[];if(c!==-1)for(let g=c;g<r.length;g++){const w=r[g],A=w.nodeType===8&&/\/ca-rich-schema/.test(w.nodeValue||"");if(p.push(document.importNode(w,!0)),A)break}Tt();const m=document.getElementById("app"),f=document.importNode(i,!0);m&&m.parentNode?m.parentNode.insertBefore(f,m.nextSibling):document.body.appendChild(f),p.forEach(g=>document.head.appendChild(g));const h=o.querySelector("title");h&&h.textContent&&(document.title=h.textContent);const x=o.querySelector('meta[name="description"]'),y=document.querySelector('meta[name="description"]');x&&y&&y.setAttribute("content",x.getAttribute("content")||"")}const Lt=Object.create(null);let It=null;function Rt(e){return e?e.length>1&&e.charAt(e.length-1)!=="/"?e+"/":e:"/"}async function Ja(e){const t=It={},a=document.querySelector("section.axo-extra-content"),s=document.querySelector("[data-axo-editorial-credit]"),n=a?Rt(a.getAttribute("data-axo-path")):null,o=()=>{a&&a.remove(),s&&s.remove()};if(!e){o();return}const i=Rt(e);if(n===i)return;let r=Lt[i];if(r===void 0)try{const h=await fetch(i,{cache:"no-store"});r=Lt[i]=h.ok?await h.text():""}catch{return}if(It!==t)return;if(!r){o();return}let c;try{c=new DOMParser().parseFromString(r,"text/html")}catch{return}const p=c.querySelector("section.axo-extra-content"),m=c.querySelector("[data-axo-editorial-credit]"),f=document.getElementById("app");if(p){const h=document.importNode(p,!0);if(h.style.display="",a)a.replaceWith(h);else{const x=document.querySelector("[data-axo-editorial-credit]");let y,g;x?(y=x.parentNode,g=x):f?(y=f.parentNode,g=f.nextSibling):(y=null,g=null),y?y.insertBefore(h,g):document.body.appendChild(h)}}else a&&a.remove();if(m){const h=document.importNode(m,!0);if(s)s.replaceWith(h);else{const x=document.querySelector("section.axo-extra-content");let y,g;x?(y=x.parentNode,g=x.nextSibling):f?(y=f.parentNode,g=f.nextSibling):(y=null,g=null),y?y.insertBefore(h,g):document.body.appendChild(h)}}else s&&s.remove()}async function je(){const e=await Xa();return Ya(),e}async function Xa(){if(!u.ready)return;const e=fe(),t=b("#app");if(be(),at(),Fn(e),Ze(),Ua(),Ka(e[0]==="current-affairs"?e[1]||"index":null),Ja(e.length?window.location.pathname:null),Vt(),e[0]!=="mock-test"&&u.mock&&u.mock.timerId&&(Fe(),u.mock=null,ct()),u.lang=Xe()?"as":"en",document.body.setAttribute("data-lang",u.lang),e.length===0)return Za(t);if(e[0]==="category"){const a=u.categories.find(s=>s.id===e[1]);return a?e.length>=2&&e[2]?as(t,e):ts(t,a):G(t)}if(e[0]==="topic"){const a=e.slice(1).join("/"),s=u.topicMap[a];return s?jt(t,s):G(t)}if(["about","privacy","privacy-policy","terms","disclaimer","editorial-policy","editorial-team","sources","updates"].includes(e[0])){const a=e[0]==="privacy-policy"?"privacy":e[0];return ds(t,a)}return e[0]==="contact"?ps(t):e[0]==="trending"?cs(t):e[0]==="previous-year"?Ns(t,e):e[0]==="categories"?hs(t):e[0]==="search"?ms(t):e[0]==="downloads"?gs(t):e[0]==="download-app"?Os(t):e[0]==="ebooks"?e[1]?ys(t,e[1]):bs(t):e[0]==="exams"?e[1]&&e[2]&&e[3]&&e[4]?Fs(t,e[1],e[2],e[3],e[4]):e[1]&&e[2]&&e[3]?Bs(t,e[1],e[2],e[3]):e[1]&&e[2]?Hs(t,e[1],e[2]):e[1]?Rs(t,e[1]):Es(t):e[0]==="current-affairs"?e[1]?Ss(t,e[1]):Cs(t):e[0]==="submit"?Qs(t):e[0]==="mock-test"?Vs(t,e):G(t)}function Za(e){const t=u.topicIndex.reduce((i,r)=>i+(r.nQuestions||0),0)+(u.examQuestionTotal||0)+(u.caQuestionTotal||0),a=u.topicsTotal||u.topicIndex.length,s=xt,n=Dt(u.topicIndex).slice(0,typeof CONFIG<"u"?CONFIG.TRENDING_COUNT:6);e.innerHTML=`
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${l("hero.daily")} • ADRE 3.0 / RRB
          </a>
          <h1>${l("hero.title")||"Crack Assam Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${l("hero.sub")||"Practice thousands of questions for Assam competitive exams and download printable PDF notes in both Assamese and English — for ADRE 3.0, APSC, Assam Police, SSC, Railway & more."}</p>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${t.toLocaleString()}+</b><span>${l("stat.questions")}</span></div>
            <div class="stat"><b id="stat-total-topics">${a.toLocaleString()}+</b><span>${l("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${s}+</b><span>${l("stat.pdfs")}</span></div>
          </div>
        </div>
        ${es()}
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
            <h2>${l("home.categories")}</h2>
            <p class="sec-sub">${l("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${Et().map((i,r)=>{const c=z(i.id);return`
              <a class="cat-card reveal" href="/category/${i.id}" data-cat="${i.id}" style="--cat:${c}" data-delay="${r*60}">
                <span class="cat-ico">${te(i.id)}</span>
                <span class="cat-meta">
                  ${$t(i.name)}
                  <span><span class="cat-count">${he(i)}</span> ${i.id==="study-guides"?u.uiLang==="as"?"টা গাইড":"Guides":l("cat.topics")}</span>
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
            <h2>${l("home.trending")}</h2>
            <p class="sec-sub">${l("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="/trending">${l("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${n.map((i,r)=>`
            <a class="topic-card reveal" href="/topic/${i.path}" style="--cat:${z(i.cat.id)}" data-delay="${r*50}">
              <span class="topic-ico">${le(i.topic.id,i.cat.id)}</span>
              <span class="rank">${r+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${d(v(i.title))}</span>
                <span id="trend-count-${i.path.replace(/\//g,"-")}">${d(v(i.cat.name))} • ${i.cat.id==="study-guides"?u.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${i.nQuestions||0} ${l("topic.questions")}`}</span>
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
      </section>`;const o=b("#seo-read-more-btn");o&&o.addEventListener("click",()=>{const i=b("#seo-read-more");if(!i)return;const r=i.classList.contains("expanded");i.classList.toggle("expanded",!r),o.textContent=r?"Read More":"Read Less"}),L(),Is(),Zt()}function es(){const e=typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_NAME||"ADRE / Assam Police",t=new Date(typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_DATE||"2026-12-31").getTime(),a=Date.now(),s=t>a?Math.max(0,Math.ceil((t-a)/864e5)):0;return`
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${(314*(1-(t>a?Math.min(1,s/365):0))).toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${s}</span>
            <span class="ring-label">${l("hero.days")}</span>
            <span class="ring-label">${d(e)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
      </div>`}function Dt(e){return e.slice().sort((t,a)=>!!t.extra!=!!a.extra?t.extra?-1:1:t.popularity!==a.popularity?a.popularity-t.popularity:(a.nQuestions||0)-(t.nQuestions||0))}function ts(e,t){const a=t.subcategories||t.sections||[],s=t.topics||[],n=t.id==="articles";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${d(v(t.description))||d(v(t.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((c,p)=>{const m=!n&&!(c.sections&&c.sections.length)&&!(c.topics&&c.topics.length),f=m?u.topicMap[`${t.id}/${c.id}`]:null,h=n?`/category/${t.id}/${c.id}/read`:m?`/topic/${t.id}/${c.id}`:`/category/${t.id}/${c.id}`,x=n?u.uiLang==="as"?"প্ৰবন্ধ পঢ়ক →":"Read Articles →":m?`<span id="count-${f?f.path.replace(/\//g,"-"):`${t.id}-${c.id}`}">${f&&f.nQuestions>0?`${f.nQuestions} ${l("topic.questions")}`:l("btn.practice")}</span>`:`${(c.sections?c.sections.length:0)||(c.topics?c.topics.length:0)} ${c.sections?l("cat.subsections"):l("cat.topics")}`;return`
              <a class="sub-card reveal" href="${h}" style="--cat:${z(t.id)}" data-delay="${p*50}">
                <span class="sub-ico">${le(c.id,t.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${Ue(c.name,"0.94rem")}
                  <span style="font-size:0.75rem; font-weight:${n?"700":"400"}; color:${n?z(t.id):"var(--ink-soft,#64748b)"};">${x}</span>
                </span>
              </a>`}).join("")}
          </div>`:s.length?et(t,null,null,s):tt()}
      </section>`,L();const i=u.topicIndex.filter(c=>c.cat&&c.cat.id===t.id).reduce((c,p)=>c+(p.nQuestions||0),0),r=a.map(c=>({name:v(c.name),count:c.sections&&c.sections.length||c.topics&&c.topics.length||0}));O(e,{id:t.id,name:v(t.name),count:a.length,total:i,h2:v(t.name)+" preparation for Assam exams",items:r})}function as(e,t){const a=u.categories.find(p=>p.id===t[1]),s=(a.subcategories||a.sections||[]).find(p=>p.id===t[2]);if(!s)return G(e);if(a.id==="articles")return ns(e,a,s);if(t[3]){const p=(s.sections||[]).find(m=>m.id===t[3]);return p?ss(e,a,s,p):G(e)}if(!(s.sections&&s.sections.length)&&!(s.topics&&s.topics.length)){const p=u.topicMap[`${a.id}/${s.id}`];if(p)return jt(e,p)}const n=s.sections,o=s.topics;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${a.id}">${d(v(a.name))}</a>
          <span class="bc-sep">/</span><span>${d(v(s.name))}</span>
        </nav>
        <h1>${d(v(s.name))}</h1>
        <p class="page-desc">${d(v(s.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${n&&n.length?`
          <div class="sub-grid">
            ${n.map((p,m)=>`
              <a class="sub-card reveal" href="/category/${a.id}/${s.id}/${p.id}" style="--cat:${z(a.id)}" data-delay="${m*50}">
                <span class="sub-ico">${le(p.id,a.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  ${Ue(p.name,"0.94rem")}
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(p.topics||[]).length} ${l("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>`:o&&o.length?et(a,s,null,o):tt()}
      </section>`,L();const r=u.topicIndex.filter(p=>p.cat&&p.cat.id===a.id&&p.sub&&p.sub.id===s.id).reduce((p,m)=>p+(m.nQuestions||0),0),c=(n&&n.length?n:o||[]).map(p=>({name:v(p.name),count:p.topics&&p.topics.length||0}));O(e,{id:s.id,name:v(s.name),count:c.length,total:r,h2:v(s.name)+" - topics and practice questions",items:c})}function ss(e,t,a,s){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}">${d(v(t.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}/${a.id}">${d(v(a.name))}</a>
          <span class="bc-sep">/</span><span>${d(v(s.name))}</span>
        </nav>
        <h1>${d(v(s.name))}</h1>
        <p class="page-desc">${d(v(s.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${et(t,a,s,s.topics||[])}
      </section>`,L();const o=u.topicIndex.filter(i=>i.cat&&i.cat.id===t.id&&i.sub&&i.sub.id===a.id&&i.section&&i.section.id===s.id).reduce((i,r)=>i+(r.nQuestions||0),0);O(e,{id:s.id,name:v(s.name),count:(s.topics||[]).length,total:o,h2:v(s.name)+" - practice questions and revision",items:(s.topics||[]).map(i=>({name:v(i.name),count:(u.topicMap[[t.id,a.id,s.id,i.id].join("/")]||{}).nQuestions||0,unit:"questions"}))})}function et(e,t,a,s){if(!s.length)return tt();const n=e.id==="study-guides",o=u.uiLang==="as"?"পঢ়ক (Read Guide) →":"Read Guide →";return`
      <div class="sub-grid">
        ${s.map((i,r)=>{const c=[e.id,t?t.id:"",a?a.id:""].filter(Boolean).concat([i.id]).join("/"),p=u.topicMap[c],m=p&&p.nQuestions>0?p.nQuestions:(i.questions||[]).length,f=n?o:m>0?`${m} ${l("topic.questions")}`:l("btn.practice");return`
            <a class="sub-card reveal" href="/topic/${c}" style="--cat:${z(e.id)}" data-delay="${r*50}">
              <span class="sub-ico">${le(i.id,e.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                ${Ue(i.name,"0.91rem")}
                <span id="count-${c.replace(/\//g,"-")}" style="${n?"color:var(--primary,#2563eb); font-weight:700;":""}">${f}</span>
              </span>
            </a>`}).join("")}
      </div>`}function tt(){return`<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${l("search.noresult")}</p></div>`}async function ns(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;let s=null;try{s=await API.getArticles(a.id)}catch{s=null}if(!s||!(s.articles||s.questions||[]).length){const o=u.lang==="as";e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${d(v(a.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${o?"এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।":"No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${t.id}">${o?"পিছলৈ যাওক":"Go Back"}</a></div>
        </div>`;return}const n={path:`articles/${a.id}`,cat:t,sub:a,section:null,topic:{id:a.id,title:s&&s.title||a.name,description:s&&s.description||a.description||{},questions:s&&(s.articles||s.questions)||[]}};Ht(e,n)}function zt(e){const t=[`<a href="/">${l("breadcrumb.home")}</a>`];return t.push(`<a href="/category/${e.cat.id}">${d(v(e.cat.name))}</a>`),e.sub&&t.push(`<a href="/category/${e.cat.id}/${e.sub.id}">${d(v(e.sub.name))}</a>`),e.section&&t.push(`<a href="/category/${e.cat.id}/${e.sub?e.sub.id+"/":""}${e.section.id}">${d(v(e.section.name))}</a>`),t.map((a,s)=>(s?'<span class="bc-sep">/</span>':"")+a).join("")}async function jt(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;try{const s=await API.getTopic(t.cat.id,t.topic.id,t.sub&&t.sub.id,t.cat&&t.cat.contentLayout);s&&(t.topic=Object.assign({},t.topic,s),t.topic.title=t.topic.title||t.title,t.nQuestions=(s.questions||[]).length)}catch{}if(t.cat.id==="study-guides")return Ht(e,t);const a=t.topic.questions||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">${zt(t)}</nav>
        <h1>${d(v(t.topic.title))}</h1>
        <p class="page-desc">${d(v(t.topic.description))||""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${a.length} ${l("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${u.lang==="as"?"active":""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${l("topic.lang.as")}</button>
                <button class="lang-btn ${u.lang==="en"?"active":""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${l("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
        </div>
      </div>
    `,os(),ae(z(t.cat.id)),b("#qa-reading").addEventListener("click",rs),M(".lang-btn").forEach(s=>{s.addEventListener("click",()=>{u.lang=s.dataset.lang,document.body.setAttribute("data-lang",u.lang),M(".lang-btn").forEach(n=>n.classList.toggle("active",n.dataset.lang===u.lang)),ls()})})}function Ht(e,t){const a=t.topic.questions||t.topic.sections||[],s=u.lang==="as",o=t.cat&&t.cat.id==="articles"?s?"প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ":"Read Articles • Reading Only":s?"সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)":"Complete In-Depth Study Guide";e.innerHTML=`
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${zt(t)}</nav>
        <h1 class="art-main-title">${d(v(t.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${d(v(t.topic.description))||""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${o}
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
    `,(()=>{const r=b("#article-body-content");r&&(r.innerHTML=["en","as"].map(c=>{const p=c==="as"?"গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)":"Key Highlights";return`<div data-axo-lang="${c}">${a.map(m=>{const f=T(m,"question",c),h=T(m,"answer",c),x=T(m,"explanation",c);return`
            <div class="article-part-block">
              <h2 class="art-headline">
                <span>${E(f)}</span>
              </h2>
              <div class="art-paragraph">${E(h)}</div>
              ${x?`
                <div class="art-keynote">
                  <b style="color:var(--primary,#2563eb);">${p}:</b> ${E(x)}
                </div>`:""}
            </div>
          `}).join("")}</div>`}).join(""),Z(r))})(),ae(z(t.cat&&t.cat.id)),M(".art-glang-btn").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.lang;u.lang!==c&&(u.lang=c,document.body.setAttribute("data-lang",u.lang),M(".art-glang-btn").forEach(p=>{p.classList.toggle("active",p.dataset.lang===u.lang)}))})})}function os(){const e=st();if(!e)return;const t=e.topic.questions||[],a=0,s=t,n=b("#qa-list"),o=/(?:^|\/)(image-series|image-analogy)$/.test(e.path||"");n.classList.toggle("nv-fig-wide",o),s.length?(n.innerHTML=s.map((i,r)=>{const c=a+r+1,p=u.mock&&u.mock.testLang?u.mock.testLang:u.lang,m=p==="as"?"en":"as";return`<div data-axo-lang="${p}">${Bt(i,c,p)}</div><div data-axo-lang="${m}">${Bt(i,c,m)}</div>`}).join(""),Z(n)):n.innerHTML=`<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${l("toast.noquestions")}</p></div>`}function Bt(e,t,a){{const s=T(e,"question",a),n=T(e,"answer",a),o=F(e,a),i=T(e,"explanation",a),r=ie(e),c=re(e),p=a,m=e.a&&typeof e.a=="object"&&e.a[p]||e.a||e.answer;return Array.isArray(m)||n.includes("qa-step-line")?`
            <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${t}. ${E(s)}
              </div>
              ${r}
              ${c?V(e,{compact:!0}):o.length?`
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-direction:column; gap:6px; font-weight:500; text-align:left; align-items:flex-start;">
                  ${o.map((h,x)=>{const y=`(${String.fromCharCode(65+x)}) ${h}`;return`<span>${E(y)}</span>`}).join("")}
                </div>`:""}
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${n}</div>
                ${i?`
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${i}
                  </div>`:""}
              </div>
            </article>`:`
            <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${t}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${E(s)}</span>
              </div>
              ${r}
              ${c?V(e):o.length?`
                <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${o.map((h,x)=>`
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+x)})</b> 
                      <span style="flex:1; line-height:1.4;">${E(h)}</span>
                    </div>
                  `).join("")}
                </div>`:""}
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${l("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${E(n)}</span>
              </div>
              ${i?`
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${E(i)}
                </div>`:""}
            </article>`}}function is(){let e=b("#read-modal");return e||(e=document.createElement("div"),e.id="read-modal",e.className="read-modal",e.hidden=!0,e.innerHTML=`
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
      </div>`,document.body.appendChild(e),b("#read-modal-close",e).addEventListener("click",at),b("#read-modal-backdrop",e).addEventListener("click",at),e)}function rs(){const e=st();if(!e)return;const t=is(),a=e.topic.questions||[];b(".read-modal-title",t).textContent=v(e.topic.title),b(".read-modal-sub",t).textContent=`${a.length} ${l("topic.questions")} • ${u.lang==="as"?l("topic.lang.as"):l("topic.lang.en")}`,t.hidden=!1,Ft()}function at(){const e=b("#read-modal");e&&(e.hidden=!0)}function Ft(){const e=st(),t=b("#read-modal");if(!e||!t||t.hidden)return;const a=e.topic.questions||[];b(".read-modal-sub",t).textContent=`${a.length} ${l("topic.questions")} • ${u.lang==="as"?l("topic.lang.as"):l("topic.lang.en")}`;const s=b("#read-modal-body",t);s.innerHTML=a.map((n,o)=>{const i=o+1,r=T(n,"question"),c=T(n,"answer"),p=F(n),m=ie(n),f=re(n),h=u.mock&&u.mock.testLang?u.mock.testLang:u.lang,x=n.a&&typeof n.a=="object"&&n.a[h]||n.a||n.answer;return Array.isArray(x)||c.includes("qa-step-line")?`
          <article class="qa-card read-item" data-n="${i}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${i}. ${E(r)}
            </div>
            ${m}
            ${f?V(n,{compact:!0}):p.length?`
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; align-items:flex-start;">
                ${p.map((g,w)=>{const A=`(${String.fromCharCode(65+w)}) ${g}`;return`<span>${E(A)}</span>`}).join("")}
              </div>`:""}
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${c}</div>
            </div>
          </article>`:`
          <article class="qa-card read-item" data-n="${i}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${i}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${E(r)}</span>
            </div>
            ${m}
            ${f?V(n):p.length?`
              <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                ${p.map((g,w)=>`
                  <div style="font-size:0.86rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:7px 10px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                    <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+w)})</b>
                    <span style="flex:1; line-height:1.4;">${E(g)}</span>
                  </div>
                `).join("")}
              </div>`:""}
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${l("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${E(c)}</span>
            </div>
          </article>`}).join(""),Z(s)}function ls(){const e=b("#read-modal");!e||e.hidden||Ft()}function st(){const e=fe();return e[0]!=="topic"?null:u.topicMap[e.slice(1).join("/")]}function cs(e){const t=Dt(u.topicIndex);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("page.trending.title")}</span></nav>
        <h1>${l("page.trending.title")}</h1>
        <p class="page-desc">${l("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${t.map((a,s)=>`
            <a class="topic-card reveal" href="/topic/${a.path}" style="--cat:${z(a.cat.id)}" data-delay="${s%10*40}">
              <span class="topic-ico">${le(a.topic.id,a.cat.id)}</span>
              <span class="rank">${s+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${d(v(a.title))}</span>
                <span id="trend-count-${a.path.replace(/\//g,"-")}">${d(v(a.cat.name))}${a.sub?" • "+d(v(a.sub.name)):""} • ${a.cat.id==="study-guides"?u.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${a.nQuestions||0} ${l("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,L()}function ds(e,t){const a=u.lang==="as";let s="",n="",o="";t==="about"?(s=a?"axomexam সম্পৰ্কে":"About axomexam",n=a?"আমি কোন, আমাৰ অধ্যয়ন সামগ্ৰী কেনেদৰে প্ৰস্তুত কৰা হয়, আৰু অসমৰ প্ৰতিজন পৰীক্ষাৰ্থীৰ বাবে ইয়াক কেনেদৰে বিনামূলীয়া আৰু নিৰ্ভুল ৰখা হয়।":"Who we are, how our study material is prepared, and how we keep it free and accurate for every Assam exam aspirant.",o=a?`
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
      `):t==="privacy"||t==="privacy-policy"?(s=a?"গোপনীয়তা নীতি":"Privacy Policy",o=a?`
        <p><strong>axomexam.in</strong> ত আপোনাৰ ব্যক্তিগত তথ্যৰ সুৰক্ষা আৰু গোপনীয়তা ৰক্ষা কৰাটো আমাৰ অন্যতম অগ্ৰাধিকাৰ। এই নথিয়ে আমি কি তথ্য সংগ্ৰহ কৰোঁ আৰু সেয়া কেনেদৰে ব্যৱহাৰ কৰোঁ তাৰ স্পষ্ট বিৱৰণ দিয়ে।</p>
        <h3>১. আমি সংগ্ৰহ কৰা তথ্যসমূহ</h3>
        <p>আমি আমাৰ ব্যৱহাৰকাৰীৰ পৰা কোনো গোপনীয় ব্যক্তিগত তথ্য (যেনে বেংক বিৱৰণ, পাছৱৰ্ড আদি) সংগ্ৰহ নকৰোঁ। ব্যৱহাৰকাৰীয়ে যেতিয়া Contact বা Submit ফৰ্ম ব্যৱহাৰ কৰে, তেতিয়া কেৱল নাম আৰু ইমেইল ঠিকনাহে প্ৰয়োজন সাপেক্ষে সংগ্ৰহ কৰা হয়।</p>
        <h3>২. ল'গ ফাইল আৰু এনালিটিক্স</h3>
        <p>আন সকলো ষ্টেণ্ডাৰ্ড ৱেবছাইটৰ দৰে, axomexam.in এ ছাইটৰ কাৰ্যক্ষমতা আৰু ব্যৱহাৰকাৰীৰ অভিজ্ঞতা উন্নত কৰিবলৈ ল’গ ফাইল ব্যৱহাৰ কৰে (যেনে IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ, পৃষ্ঠা পৰিদৰ্শনৰ সময়)। এইবোৰ কোনো ব্যক্তিবিশেষৰ পৰিচয়ৰ সৈতে সংযুক্ত নহয়।</p>
        <h3>৩. গুগল ডাবল-ক্লিক DART কুকিজ আৰু বিজ্ঞাপন</h3>
        <p>Google আমাৰ ৱেবছাইটৰ এজন অন্যতম তৃতীয় পক্ষৰ বিজ্ঞাপনদাতা। Google-এ ব্যৱহাৰকাৰীৰ পূৰ্বৰ ইণ্টাৰনেট কাৰ্যকলাপৰ ওপৰত ভিত্তি কৰি প্ৰাসংগিক বিজ্ঞাপন প্ৰদৰ্শন কৰিবলৈ DART কুকিজ ব্যৱহাৰ কৰিব পাৰে। ব্যৱহাৰকাৰীয়ে Google Privacy & Terms পৃষ্ঠালৈ গৈ এই বিজ্ঞাপন ব্যক্তিগতকৰণ নিয়ন্ত্ৰণ কৰিব পাৰে।</p>
        <h3>৪. নীতিৰ সন্মতি</h3>
        <p>আমাৰ ৱেবছাইট ব্যৱহাৰ কৰাৰ জৰিয়তে আপুনি আমাৰ গোপনীয়তা নীতিৰ চৰ্তসমূহত সন্মতি প্ৰকাশ কৰা বুলি গণ্য কৰা হ'ব।</p>
      `:`
        <p>At <strong>axomexam.in</strong> (accessible via https://axomexam.in), the privacy of our visitors is of paramount importance. This document outlines the types of personal and analytical information received and collected by our platform.</p>
        <h3>1. Information Collection and Handling</h3>
        <p>We do not mandate personal account creation or collect sensitive personal identification details. Information submitted via contact or feedback forms (such as Name and Email) is used strictly to respond to user inquiries.</p>
        <h3>2. Log Files & Standard Analytics</h3>
        <p>Like standard web portals, axomexam.in utilizes standard log files. The data inside includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click metrics. This data is non-personally identifiable and used purely for site maintenance.</p>
        <h3>3. Google AdSense & Third-Party Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve contextual advertisements on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to axomexam.in and other sites across the web. You can opt out of personalized advertising by visiting Google Ad Settings.</p>
        <h3>4. Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to all its operational terms.</p>
      `):t==="terms"?(s=a?"নীতি আৰু চৰ্তসমূহ":"Terms & Conditions",o=a?`
        <p><strong>axomexam.in</strong> লৈ স্বাগতম। এই ৱেবছাইটটো ব্যৱহাৰ কৰাৰ ক্ষেত্ৰত তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ প্ৰযোজ্য হ'ব:</p>
        <h3>১. বৌদ্ধিক সম্পত্তি আৰু ব্যৱহাৰৰ নিয়ম</h3>
        <p>axomexam.in ত প্ৰকাশিত সকলো পাঠ্যক্ৰম, প্ৰশ্নোত্তৰ, মক টেষ্ট আৰু PDF সমল কেৱল ছাত্ৰ-ছাত্ৰী আৰু পৰীক্ষাৰ্থীৰ ব্যক্তিগত শিক্ষাৰ বাবেহে অনুমোদিত। আমাৰ অনুমতি অবিহনে কোনো সমল ব্যৱসায়িক স্বাৰ্থত পুনৰ প্ৰকাশ, বিক্ৰী বা অনৈতিকভাৱে ব্যৱহাৰ কৰা নিষিদ্ধ।</p>
        <h3>২. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <p>আমি সকলো প্ৰশ্ন আৰু উত্তৰ নিৰ্ভুলভাৱে যুগুত কৰিবলৈ যথাসম্ভৱ চেষ্টা কৰোঁ। তথাপিও কোনো তথ্যৰ অনিচ্ছাকৃত ত্ৰুটিৰ বাবে হোৱা শৈক্ষিক বা আনুসংগিক ক্ষতিৰ বাবে ৱেবছাইট প্ৰশাসক আইনগতভাৱে দায়বদ্ধ নহ’ব।</p>
        <h3>৩. বাহ্যিক লিংক</h3>
        <p>আমাৰ ৱেবছাইটত তৃতীয় পক্ষৰ লিংক (যেনে চৰকাৰী জাননী, অফিচিয়েল পৰীক্ষা প’ৰ্টেল আদি) থাকিব পাৰে। সেই বাহ্যিক ৱেবছাইটসমূহৰ সমল বা নীতিৰ বাবে আমি দায়বদ্ধ নহওঁ।</p>
      `:`
        <p>Welcome to <strong>axomexam.in</strong>. By accessing and browsing this website, you accept and agree to comply with the following Terms and Conditions.</p>
        <h3>1. Content Usage & Intellectual Property</h3>
        <p>All materials, structured questions, study notes, and downloadable assets published on axomexam.in are intended strictly for educational, personal, and non-commercial usage. Redistribution, commercial reproduction, or resale without written permission is strictly prohibited.</p>
        <h3>2. Accuracy & Limitation of Liability</h3>
        <p>While our editorial team endeavors to ensure absolute factual correctness across all subjects, study materials are provided on an 'as-is' basis. axomexam.in does not warrant the completeness or absolute infallibility of contents for official evaluation criteria.</p>
        <h3>3. External Hyperlinks</h3>
        <p>Our pages may occasionally contain links to official external sites or reference sources. We hold no responsibility for the content, privacy guidelines, or accuracy of third-party platforms.</p>
      `):t==="disclaimer"?(s=a?"দাবীত্যাগ (Disclaimer)":"Disclaimer",o=a?`
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো তথ্য কেৱল সাধাৰণ শিক্ষা আৰু জ্ঞান আহৰণৰ উদ্দেশ্যতহে আগবঢ়োৱা হৈছে।</p>
        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in কোনো চৰকাৰী সংস্থা, অসম লোকসেৱা আয়োগ (APSC), বা কোনো পৰীক্ষা পৰিচালনা কৰা চৰকাৰী নিগমৰ অফিচিয়েল ৱেবছাইট নহয়। ই এক স্বতন্ত্ৰ শিক্ষামূলক প’ৰ্টেল। অফিচিয়েল জাননীৰ বাবে পৰীক্ষাৰ্থীসকলক সদায় চৰকাৰী গেজেট বা অফিচিয়েল প’ৰ্টেল অনুসৰণ কৰিবলৈ পৰামৰ্শ দিয়া হয়।</p>
        <h3>২. পেছাদাৰী পৰামৰ্শ নহয়</h3>
        <p>আমাৰ ৱেবছাইটত উপলব্ধ সমলসমূহ পৰীক্ষাৰ্থীৰ অনুশীলনৰ সহায়ৰ বাবেহে তৈয়াৰ কৰা হৈছে। ইয়াৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</p>
      `:`
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational, academic, and competitive examination preparation purposes.</p>
        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is NOT affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>
        <h3>2. Educational Warranties</h3>
        <p>We make no absolute warranties regarding test pattern guarantees or exam success outcomes. Use of study resources and mock practices is at the user's sole discretion.</p>
      `):t==="editorial-policy"?(s=a?"সম্পাদকীয় নীতি":"Editorial Policy",n=a?"অসমৰ প্ৰতিযোগিতামূলক পৰীক্ষাৰ বাবে axomexam.in ৰ দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেনেদৰে পৰিকল্পনা, লিখন, তথ্য-যাচাই, পৰ্যালোচনা আৰু সংশোধন কৰা হয়।":"How axomexam.in plans, writes, fact-checks, reviews and corrects its bilingual study material for Assam competitive examinations.",o=a?`
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
      `):t==="editorial-team"?(s=a?"সম্পাদকীয় দল":"Editorial Team",n=a?"axomexam সম্পাদকীয় দল: axomexam.in ত প্ৰকাশিত দ্বিভাষিক অধ্যয়ন সামগ্ৰী কেৱে পৰিকল্পনা, লিখন, তথ্য-যাচাই আৰু পৰ্যালোচনা কৰে।":"The Axomexam Editorial Team: who plans, writes, fact-checks and reviews the bilingual study material published on axomexam.in.",o=a?`
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
      `):t==="sources"?(s=a?"চৰকাৰী উৎস আৰু তথ্যসূত্ৰ":"Official Sources & References",n=a?"axomexam.in ৰ অধ্যয়ন সামগ্ৰী প্ৰস্তুত আৰু যাচাই কৰিবলৈ ব্যৱহৃত চৰকাৰী পৰীক্ষা প'ৰ্টেল, জাননী যাচাই আৰু প্ৰসংগ সামগ্ৰী।":"Official exam portals, notification checks and reference material used to prepare and verify study content on axomexam.in.",o=a?`
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
      `):t==="updates"?(s=a?"সমল হালনাগাদ":"Content Updates",n=a?"axomexam.in ৰ অধ্যয়ন সামগ্ৰীত কৰা সংশোধন, পাঠ্যক্ৰমৰ হালনাগাদ, নতুন শিতান আৰু সম্পাদকীয় পৰিৱৰ্তনৰ তাৰিখসহ ৰেকৰ্ড।":"A dated record of corrections, syllabus updates, new sections and editorial changes made to axomexam.in study material.",o=a?`
        <p>এই পৃষ্ঠাই অধ্যয়ন সামগ্ৰী আৰু ছাইট পৰিচালনাৰ পদ্ধতিত কৰা উল্লেখযোগ্য পৰিৱৰ্তন লিপিবদ্ধ কৰে। সৰু বানান সংশোধন তালিকাভুক্ত নকৰা হয়, কিন্তু পাঠ্যক্ৰমৰ পৰিৱৰ্তন, নতুন শিতান, উত্তৰৰ সংশোধন আৰু নীতিৰ পৰিৱৰ্তন লিপিবদ্ধ কৰা হয়। নতুন ভুক্তি প্ৰথমে দেখুওৱা হয়।</p>

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

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২৩ অক্টোবৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p>This page records substantive changes to the study material and to the way the site is run. Small spelling fixes are not listed, but syllabus changes, new sections, corrections to answers and policy changes are. The newest entries appear first.</p>

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

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 23 October 2026 &middot; Publisher: axomexam.in</p>
      `):o=`<p>${l(`page.${t}.p1`)}</p>`,["editorial-policy","editorial-team","sources","updates"].includes(t)&&(o+=`
        <p class="axo-editorial-links" style="margin-top:26px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); line-height:2;">
          <strong>Axomexam Editorial:</strong>
          ${[["/editorial-policy/",a?"সম্পাদকীয় নীতি":"Editorial Policy"],["/editorial-team/",a?"সম্পাদকীয় দল":"Editorial Team"],["/sources/",a?"চৰকাৰী উৎস":"Official Sources"],["/updates/",a?"সমল হালনাগাদ":"Content Updates"]].map(([r,c])=>`<a href="${r}">${c}</a>`).join(" &middot; ")}
        </p>`),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${a?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${d(s)}</span></nav>
        <h1>${d(s)}</h1>
        ${n?`<p class="page-desc">${d(n)}</p>`:""}
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel${["editorial-policy","editorial-team","sources","updates"].includes(t)?" axo-editorial-page":""}" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:860px; margin:0 auto; text-align:left;">
          ${o}
        </div>
      </section>`,Te(),window.scrollTo(0,0)}function ps(e){const t=u.lang==="as",a=t?["সমল সংশোধন","ভাঙা লিংক বা ডাউনল'ড সমস্যা","নতুন বিষয়ৰ অনুৰোধ","প্ৰশ্ন আগবঢ়াওক","কপিৰাইট / টেকডাউন অনুৰোধ","অন্যান্য"]:["Content correction","Broken link or download problem","New topic request","Contribute questions","Copyright / takedown request","Other"];e.innerHTML=`
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
                ${a.map(n=>`<option>${n}</option>`).join("")}
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
          <p>${t?"<strong>ফোন নম্বৰ বা লাইভ চেট আছে নেকি?</strong> নাই। মঞ্চখন বিনামূলীয়া আৰু সমল-কেন্দ্ৰিত ৰাখিবলৈ সহায় সম্পূৰ্ণৰূপে ইমেইলৰ জৰিয়তে কৰা হয়।":"<strong>Is there a phone number or live chat?</strong> No. To keep the platform free and focused on content, support is handled by email only."}</p>
          <p>${t?"<strong>মই অধ্যয়ন পৰিকল্পনা বিচাৰিব পাৰোঁ নেকি?</strong> হয়। আপুনি যি পৰীক্ষাৰ বাবে প্ৰস্তুতি চলাইছে আৰু পৰীক্ষাৰ তাৰিখ কওক, আমি আপোনাক আটাইতকৈ প্ৰাসংগিক শিতান আৰু অধ্যয়নৰ পৰামৰ্শিত ক্ৰমলৈ নিৰ্দেশ কৰিম।":"<strong>Can I request a study plan?</strong> Yes. Tell us the exam you are preparing for and the date of the exam, and we will point you to the most relevant sections and a suggested order of study."}</p>
          <p>${t?'<strong>আপোনালোকে মোৰ তথ্য শ্বেয়াৰ বা বিক্ৰী কৰে নেকি?</strong> কেতিয়াও নহয়। আপোনাৰ ইমেইল কেৱল আপোনাৰ অনুসন্ধানৰ উত্তৰ দিবলৈ ব্যৱহাৰ কৰা হয়, আমাৰ <a href="/privacy/">গোপনীয়তা নীতি</a>ত ব্যাখ্যা কৰাৰ দৰে।':'<strong>Do you share or sell my details?</strong> Never. Your email is used only to reply to your query, as explained in our <a href="/privacy/">Privacy Policy</a>.'}</p>
          <p>${t?"<strong>মই ছাইটলৈ প্ৰশ্ন আগবঢ়াব পাৰোঁ নেকি?</strong> হয়। চাৰিটা বিকল্প আৰু এটা চুটি ব্যাখ্যাসহ পঠিয়াওক, আমাৰ দলে প্ৰকাশৰ আগতে পৰ্যালোচনা কৰিব।":"<strong>Can I contribute questions to the site?</strong> Yes. Send them with four options and a short explanation, and our team will review them before publishing."}</p>

          <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>${t?"শেষ হালনাগাদ:":"Last updated:"}</strong> ${t?"২০ ছেপ্তেম্বৰ ২০২৬":"20 September 2026"} &middot; ${t?"প্ৰকাশক:":"Publisher:"} axomexam.in</p>
        </article>
      </section>
    `;const s=document.getElementById("contact-form");s&&s.addEventListener("submit",function(n){n.preventDefault();const o=(document.getElementById("c-name")||{}).value||"",i=(document.getElementById("c-email")||{}).value||"",r=(document.getElementById("c-subject")||{}).value||"Website enquiry",c=(document.getElementById("c-message")||{}).value||"",p="Name: "+o+`
Email: `+i+`

`+c;window.location.href="mailto:support@axomexam.in?subject="+encodeURIComponent("[axomexam] "+r)+"&body="+encodeURIComponent(p)}),Te(),L(),window.scrollTo(0,0)}function N(e){return(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function He(e){return e==null?"":typeof e=="string"?e:Array.isArray(e)?e.join(" "):[e.en,e.as].filter(Boolean).map(t=>Array.isArray(t)?t.join(" "):t).join(" ")}function Ot(e){const t=N(e);if(t.length<2)return[];const a=[],s=typeof CONFIG<"u"?CONFIG.SEARCH_LIMIT:20;for(const n of u.topicIndex){const o=N(v({en:n.title.en})),i=N(v({as:n.title.as})),r=(n.tags||[]).filter(m=>N(m).includes(t)),c=(n.topic.questions||[]).filter(m=>{const f=typeof m.q=="object"?He(m.q):(m.q||m.question_en||"")+" "+(m.question_as||""),h=typeof m.a=="object"?He(m.a):(m.a||m.answer_en||"")+" "+(m.answer_as||"");return N(f).includes(t)||N(h).includes(t)});let p=0;o.includes(t)&&(p+=5),i.includes(t)&&(p+=5),p+=r.length*3,p+=c.length*1.5,p>0&&a.push({rec:n,score:p,matchCount:c.length+r.length})}return a.sort((n,o)=>o.score-n.score).slice(0,s)}let ge=null;function Nt(){return u.searchCorpusReady?Promise.resolve():ge||(ge=(async()=>{const e=u.topicIndex.filter(s=>!(s.topic&&Array.isArray(s.topic.questions)&&s.topic.questions.length)),t=async()=>{for(;e.length;){const s=e.shift();try{const n=await API.getTopic(s.cat.id,s.topic.id,s.sub&&s.sub.id,s.cat&&s.cat.contentLayout);if(n){const o=Array.isArray(n)?n:Array.isArray(n.questions)?n.questions:[];s.topic.questions=o,s.nQuestions||(s.nQuestions=o.length)}}catch{}}},a=Math.min(8,e.length);await Promise.all(Array.from({length:a},t)),u.searchCorpusReady=!0})().finally(()=>{ge=null}),ge)}function us(){const e=b("#master-search"),t=b("#search-results");if(!e||!t)return;let a;const s=()=>{t.hidden=!0,t.innerHTML=""},n=i=>{const r=Ot(i);r.length?(t.innerHTML=`
          <div class="sr-head">${l("search.results")} (${r.length})</div>
          ${r.map((c,p)=>`
            <a class="sr-item" href="/topic/${c.rec.path}" data-idx="${p}">
              <span class="chip">${d(v(c.rec.cat.name))}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span class="sr-title">${d(v(c.rec.title))}</span>
                <span class="sr-sub">${d(v(c.rec.section?c.rec.section.name:c.rec.sub?c.rec.sub.name:""))} • ${c.rec.cat.id==="study-guides"?u.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${c.rec.nQuestions||0} ${l("topic.questions")}`}</span>
              </span>
            </a>`).join("")}`,t.innerHTML+=`<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${l("see.all")}</a>`):t.innerHTML=`<div class="sr-empty">${l("search.noresult")}</div>`,t.hidden=!1},o=i=>{clearTimeout(a);const r=i.target.value;if(r.trim().length<2){s();return}a=setTimeout(()=>{n(r),Nt().then(()=>{!t.hidden&&e.value.trim()===r.trim()&&n(r)})},180)};e.addEventListener("input",o),e.addEventListener("focus",()=>{e.value.trim().length>=2&&o({target:e})}),document.addEventListener("click",i=>{i.target.closest(".search-wrap")||s()}),t.addEventListener("click",i=>{i.target.closest("a.sr-item")&&(e.value="",s())})}function ms(e){const a=Je.map(m=>u.categories.find(f=>f.id===m)).filter(Boolean).slice(0,6).map(m=>`<a class="sp-chip" href="/category/${m.id}">${d(v(m.name))}</a>`).join(""),s=()=>`
      <div class="sp-empty">
        <span class="sp-empty-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <span>${l("search.hint")}</span>
      </div>`,n=()=>`
      <div class="sp-empty">
        <span class="sp-empty-ico is-warn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
        </span>
        <span>${l("search.noresult")}</span>
      </div>`;e.innerHTML=`
      <div class="page-head sp-page-head">
        <nav class="breadcrumb"><a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("tab.search")}</span></nav>
      </div>
      <div class="search-page">
        <div class="sp-hero">
          <span class="sp-hero-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <h1 class="sp-hero-title">${l("tab.search")}</h1>
          <p class="sp-hero-sub">${l("search.hint")}</p>
        </div>
        <div class="sp-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${l("search.placeholder")}" aria-label="${l("tab.search")}" />
          <button type="button" class="sp-clear" id="page-search-clear" aria-label="Clear search" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        ${a?`<div class="sp-sugg"><span class="sp-sugg-label">${l("search.popular")}</span><div class="sp-sugg-list">${a}</div></div>`:""}
        <div class="sp-results" id="page-search-results">${s()}</div>
      </div>`;const o=b("#page-search"),i=b("#page-search-results"),r=b("#page-search-clear");let c;const p=()=>{const m=o.value.trim();if(r&&(r.hidden=!m),m.length<2){i.innerHTML=s();return}const f=Ot(m);if(!f.length){i.innerHTML=n();return}i.innerHTML=f.map(h=>`
        <a class="sp-topic" href="/topic/${h.rec.path}">
          <span class="sp-topic-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
          </span>
          <span class="sp-topic-body">
            <span class="sp-topic-title">${d(v(h.rec.title))}</span>
            <span class="sp-topic-meta">${d(v(h.rec.section?h.rec.section.name:h.rec.sub?h.rec.sub.name:""))} • ${h.rec.cat.id==="study-guides"?u.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${h.rec.nQuestions||0} ${l("topic.questions")}`}</span>
          </span>
          <span class="chip">${d(v(h.rec.cat.name))}</span>
        </a>`).join("")};r&&r.addEventListener("click",()=>{o.value="",r.hidden=!0,o.focus(),i.innerHTML=s()}),o.addEventListener("input",()=>{clearTimeout(c);const m=o.value;r&&(r.hidden=!m.trim()),c=setTimeout(()=>{p(),Nt().then(()=>{o.value.trim()===m.trim()&&p()})},180)})}function be(){const e=b("#mobile-menu"),t=b("#mobile-backdrop"),a=b("#hamburger");e&&(e.classList.remove("open"),e.hidden=!0),t&&(t.classList.remove("open"),t.hidden=!0),a&&(a.classList.remove("open"),a.setAttribute("aria-expanded","false"))}function Gt(){const e=b("#mobile-menu"),t=b("#mobile-backdrop"),a=b("#hamburger");e&&(e.hidden=!1),t&&(t.hidden=!1),requestAnimationFrame(()=>{e&&e.classList.add("open"),t&&t.classList.add("open")}),a&&(a.classList.add("open"),a.setAttribute("aria-expanded","true"))}let ve;function L(){ve&&ve.disconnect();const e=M(".reveal");if(!("IntersectionObserver"in window)){e.forEach(t=>t.classList.add("visible"));return}e.forEach(t=>{const a=parseInt(t.dataset.delay||"0",10);a&&(t.style.transitionDelay=`${a}ms`)}),ve=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),ve.unobserve(a.target))})},{threshold:.08,rootMargin:"0px 0px -30px 0px"}),e.forEach(t=>ve.observe(t))}function d(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function G(e){e.innerHTML=`
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${l("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${l("page.error.btn")}</a></div>
      </div>`}function B(e){const t=b("#toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.remove("show"),2400))}function hs(e){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("tab.categories")}</span></nav>
        <h1>${l("tab.categories")}</h1>
        <p class="page-desc">${l("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${u.categories.map((t,a)=>{const s=z(t.id);return`
              <a class="cat-card reveal" href="/category/${t.id}" style="--cat:${s}" data-delay="${a*50}">
                <span class="cat-ico">${te(t.id)}</span>
                <span class="cat-meta">
                  ${$t(t.name)}
                  <span><span class="cat-count">${he(t)}</span> ${t.id==="study-guides"?u.uiLang==="as"?"টা গাইড":"Guides":l("cat.topics")}</span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,L()}function _t(e){let t=b("#pdf-loading-overlay");t?(b("#pdf-spinner-text").textContent=e||"Generating PDF...",t.style.display="flex"):(t=document.createElement("div"),t.id="pdf-loading-overlay",t.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;backdrop-filter:blur(4px);",t.innerHTML=`
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;flex:0 0 auto;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;line-height:1.6;text-align:center;max-width:min(92vw,460px);margin:0 auto;padding:0 4px;font-family:'Plus Jakarta Sans',sans-serif;word-break:break-word;overflow-wrap:anywhere;">${d(e||"Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `,document.body.appendChild(t))}function Qt(){const e=b("#pdf-loading-overlay");e&&(e.style.display="none")}function fs(e){const t=b("#pdf-lang-modal");t&&t.remove();const a=document.createElement("div");a.id="pdf-lang-modal",a.className="read-modal",a.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;",a.innerHTML=`
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
    `,document.body.appendChild(a);const s=()=>a.remove();b("#pdf-btn-cancel",a).addEventListener("click",s),b(".read-modal-backdrop",a).addEventListener("click",s),b("#pdf-btn-as",a).addEventListener("click",n=>{n.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{s(),Wt(e,"as")},100)}),b("#pdf-btn-en",a).addEventListener("click",n=>{n.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{s(),Wt(e,"en")},100)})}async function Wt(e,t){if(u.isGeneratingPdf)return;u.isGeneratingPdf=!0,_t(t==="as"?"PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি অপেক্ষা কৰক...":"Generating PDF, please wait..."),await new Promise($=>setTimeout($,40));let s=e.topic.questions||[];if(!s.length)try{const $=await API.getTopic(e.cat.id,e.topic.id,e.sub&&e.sub.id,e.cat&&e.cat.contentLayout);$&&(s=Array.isArray($)?$:$.questions||[],e.topic.questions=s)}catch($){console.error("PDF fetch error:",$)}if(!s.length){Qt(),u.isGeneratingPdf=!1,B(t==="as"?"এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!":"No questions available in this topic!");return}const n=e.title[t]||e.title.as||e.title.en||e.topic.id,o=e.cat.name[t]||e.cat.name.as||e.cat.name.en||"",i=t==="as"?"অসমীয়া মাধ্যম":"English Medium",r=t==="as"?"উত্তৰ":"Answer",c=t==="as"?"ব্যাখ্যা":"Explanation",p=t==="as"?"'Noto Serif Bengali', serif":"'Plus Jakarta Sans', sans-serif",m=document.createElement("div");m.style.cssText="position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:"+p+";",document.body.appendChild(m);const f=s.map(($,q)=>{const P=T($,"question",t),I=T($,"answer",t),R=T($,"explanation",t),H=F($,t),K=ie($),se=re($),ne=t,$e=$.a&&typeof $.a=="object"&&$.a[ne]||$.a||$.answer,Ae=Array.isArray($e)||I.includes("qa-step-line"),U=document.createElement("div");return U.className="qa-row",U.style.cssText="border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;",Ae?U.innerHTML=`
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${q+1}. ${E(P)}</div>
          ${K}
          ${se?V($,{compact:!0}):H.length?`
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${H.map((Ce,D)=>{const oe=`(${String.fromCharCode(65+D)}) ${Ce}`;return`<span>${E(oe)}</span>`}).join("")}
            </div>`:""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${I}</div>
          ${R?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${R}</div>`:""}
        `:U.innerHTML=`
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${q+1}. ${E(P)}</div>
          ${K}
          ${se?V($,{compact:!0}):""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${r}: ${E(I)}</div>
          ${R?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${R}</div>`:""}
        `,m.appendChild(U),U});await Z(m),document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise($=>setTimeout($,3e3))]);const h=f.map($=>({html:$.outerHTML,height:$.offsetHeight+7}));m.remove();const x=[];let y=[],g=0;const w=1010;h.forEach($=>{g+$.height>w&&y.length>0?(x.push(y),y=[$.html],g=$.height):(y.push($.html),g+=$.height)}),y.length>0&&x.push(y);const A=x.length,C=document.createElement("div");C.id="dynamic-pdf-export-container",C.style.cssText="position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;";function S($,q){const P=q===1,I=document.createElement("div");I.className="pdf-page-node",I.style.cssText=`
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
      `;const R=P?`
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${d(n)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${d(o)} • ${t==="as"?"মুঠ বিষয়":"Total Content"}: ${s.length} | ${i}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${kt}
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
                ${kt}
              </td>
            </tr>
          </table>
        </div>
      `;return I.innerHTML=`
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${R}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${$.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${q} of ${A} —</span>
          <span>axomexam.in</span>
        </div>
      `,I}document.body.appendChild(C);try{if(await Sa(),!window.jspdf||!window.html2canvas)throw new Error("jsPDF or html2canvas library is missing.");document.fonts&&document.fonts.ready&&await Promise.race([document.fonts.ready,new Promise(D=>setTimeout(D,3e3))]);const{jsPDF:$}=window.jspdf,q=new $("p","mm","a4"),P=window.matchMedia?window.matchMedia("(max-width: 820px)").matches:!1,I=typeof navigator.deviceMemory=="number"&&navigator.deviceMemory<=4,R=P||I?1.5:2,H=x.length,K=794*1122*R*R,ne=Math.max(1,Math.min(4,Math.floor((P||I?8e6:16e6)/K))),$e=Math.round(1122*R);for(let D=0;D<H;D+=ne){const oe=Math.min(ne,H-D);_t(t==="as"?`PDF প্ৰস্তুত হৈ আছে (${D+1}/${H}), অনুগ্ৰহ কৰি অপেক্ষা কৰক...`:`Generating PDF (${D+1}/${H}), please wait...`),await new Promise(Q=>setTimeout(Q,0));const j=document.createElement("div");j.style.cssText="width:794px; background:#ffffff;";for(let Q=0;Q<oe;Q++){const X=S(x[D+Q],D+Q+1);X.style.margin="0",j.appendChild(X)}C.appendChild(j);let J;try{J=await window.html2canvas(j,{scale:R,useCORS:!0,allowTaint:!1,logging:!1,backgroundColor:"#ffffff"});const Q=J.width;for(let X=0;X<oe;X++){const Qe=Math.min($e,J.height-X*$e);if(Qe<=0)break;const me=document.createElement("canvas");me.width=Q,me.height=Qe,me.getContext("2d").drawImage(J,0,X*$e,Q,Qe,0,0,Q,Qe);const Qn=me.toDataURL("image/jpeg",.9);me.width=0,me.height=0,D+X>0&&q.addPage("a4","p"),q.addImage(Qn,"JPEG",0,0,210,297,void 0,"FAST")}}finally{J&&(J.width=0,J.height=0),J=null,j.parentNode&&j.remove()}}const Ae=`${e.topic.id}-${t}.pdf`;let U=!1;const Ce=window.AxoApp;if(Ce&&typeof Ce.savePdf=="function")try{const D=String(q.output("datauristring")||"");Ce.savePdf(D.substring(D.indexOf(",")+1),Ae),U=!0}catch(D){console.error("App PDF bridge failed:",D)}if(!U)if(ya())B(t==="as"?"অ্যাপত PDF ছেভ কৰিব নোৱাৰি। Chrome ত axomexam.in খুলি ডাউনলোড কৰক।":"Can't save PDF inside the app. Open axomexam.in in Chrome and download there.");else{try{q.save(Ae)}catch{const oe=q.output("bloburl"),j=document.createElement("a");j.href=oe,j.download=Ae,j.rel="noopener",document.body.appendChild(j),j.click(),setTimeout(()=>{j.parentNode&&j.parentNode.removeChild(j),URL.revokeObjectURL(oe)},4e3)}B(t==="as"?"PDF ডাউনলোড সফল হ'ল!":"PDF downloaded successfully!")}}catch($){console.error("PDF generation failed:",$),B(t==="as"?"PDF বনাব পৰা নগ'ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।":"Failed to generate PDF. Please try again.")}finally{C.parentNode&&C.remove(),Qt(),u.isGeneratingPdf=!1}}async function gs(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;let t=[];try{t=await API.listDownloads()}catch{}e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("page.downloads.title")}</span></nav>
        <h1>${l("page.downloads.title")}</h1>
        <p class="page-desc">${d(l("page.downloads.desc"))}</p>
      </div>

      <section class="section" style="padding-bottom:28px;">
        <div class="section-head" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <h2>Topic-wise Q&A PDF Notes</h2>
            <p class="sec-sub">Download complete bilingual questions & answers for each topic in PDF format.</p>
          </div>
          <div style="width:100%; max-width:320px; margin:0 auto; position:relative;">
            <input type="search" id="dl-search-input" placeholder="Search PDF by topic name..." autocomplete="off" spellcheck="false"
                   style="width:100%; padding:9px 12px 9px 36px; border-radius:20px; border:1px solid var(--border,#cbd5e1); background:var(--bg,#ffffff); color:var(--ink,#0f172a); font-size:0.85rem; outline:none; box-sizing:border-box; box-shadow:0 1px 3px rgba(0,0,0,0.05);" />
            <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:var(--ink-soft,#64748b);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="dl-list" id="topic-pdf-list">
          ${u.topicIndex.map((o,i)=>`
            <div class="dl-item reveal topic-dl-card" data-title="${d(He(o.title))}" data-cat="${d(He(o.cat.name))}" data-delay="${i%12*30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${d(v(o.title))}</b>
                <span>${d(v(o.cat.name))}${o.sub?" • "+d(v(o.sub.name)):""} • <span id="dl-count-${o.path.replace(/\//g,"-")}">${o.nQuestions||0}</span> ${o.cat.id==="study-guides"?"Chapters":"Questions"}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${d(o.path)}" type="button" style="text-transform:none;">Download</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>No matching PDF topic found.</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>Special E-Books & Hand-written Notes</h2><p class="sec-sub">Direct official PDFs and curated study materials.</p></div></div>
        ${t.length?`
          <div class="dl-list">
            ${t.map(o=>`
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${d(o.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>PDF Document</span></span>
                <a class="dl-btn dl-save" href="${o.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
              </div>`).join("")}
          </div>`:'<div class="info-panel"><p>No extra manual PDF uploaded yet.</p></div>'}
      </section>`,M(".topic-pdf-btn",e).forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.path,r=u.topicMap[i];r&&fs(r)})});const a=b("#dl-search-input"),s=M(".topic-dl-card",e),n=b("#dl-no-match");a&&a.addEventListener("input",o=>{const i=N(o.target.value);let r=0;s.forEach(c=>{const p=N(c.dataset.title),m=N(c.dataset.cat);p.includes(i)||m.includes(i)?(c.style.display="",r++):c.style.display="none"}),n&&(n.style.display=r===0?"block":"none")}),L()}function Yt(e){const t=e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(t||"")?t:"#4f46e5"}function k(e,t){if(e==null)return"";if(typeof e=="string")return e;const a=t||u.lang||"en";return e[a]&&String(e[a]).trim()?e[a]:e.en||e.as||""}function Ut(e){if(e==null)return"";const t=String(e).split(`
`);let a="",s=!1;const n=()=>{s&&(a+="</ul>",s=!1)};return t.forEach(o=>{const i=(o||"").trim();if(!i){n();return}const r=i.match(/^[-•*]\s+(.*)$/);r?(s||(a+='<ul class="ebk-list">',s=!0),a+=`<li>${E(r[1])}</li>`):(n(),a+=`<p class="ebk-para">${E(i)}</p>`)}),n(),a}async function bs(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;let t=[];try{t=await API.listBooks()}catch{t=[]}const a=n=>{e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l("ebooks.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${d(n||l("ebooks.empty"))}</p></div>`};if(!t.length)return a();const s=t.slice().sort((n,o)=>k(n.title,"en").localeCompare(k(o.title,"en")));e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("nav.ebooks")}</span>
        </nav>
        <h1>${l("ebooks.title")}</h1>
        <p class="page-desc">${l("ebooks.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid">
          ${s.map((n,o)=>{const i=(n.chapters||[]).length,r=Yt(n),c=k(n.title,"en"),p=k(n.subject,"en"),m=n.cover?String(n.cover):"",f=k(n.coverAlt,u.lang)||c+" e-book cover",h=m?`<img class="ebook-cover-img" src="${d(m)}" alt="${d(f)}" loading="lazy" decoding="async">`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
                  <span class="ebook-cover-top">
                    <span class="ebook-cover-publisher">axomexam</span>
                    <span class="ebook-cover-tag">E-Book</span>
                  </span>
                  <span class="ebook-cover-title">
                    <span class="ebk-tt-en">${d(c)}</span>
                  </span>
                  <span class="ebook-cover-subject">${d(p)}</span>`;return`
              <a class="ebook-card reveal" href="/ebooks/${encodeURIComponent(n.id)}" style="--ebk:${r}" data-delay="${o*60}">
                <span class="ebook-cover${m?" has-photo":""}">${h}</span>
                <span class="ebook-meta">
                  <b>${d(c)}</b>
                  <span class="ebook-meta-sub"><span>${i} ${l("ebooks.chapters")}</span></span>
                  <span class="ebook-read-btn">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
                    ${l("ebooks.readNow")}
                  </span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,L()}function vs(e,t,a){const s=e.chapters||[],n=String(a||"ebk-ch").replace(/[^A-Za-z0-9_-]/g,""),o=s.map((r,c)=>`
      <a class="ebk-toc-item" href="#${n}-${c}">
        <span class="ebk-toc-no">${c+1}</span>
        <span>${d(k(r.title,t))}</span>
      </a>`).join(""),i=s.map((r,c)=>`
      <section class="ebk-chapter" id="${n}-${c}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${c+1}</span>${d(k(r.title,t))}</h3>
        <div class="ebk-ch-body">${Ut(k(r.content,t))}</div>
      </section>`).join("");return`
      ${s.length>1?`<nav class="ebk-toc" aria-label="${d(l("ebooks.toc"))}"><h4>${l("ebooks.toc")}</h4>${o}</nav>`:""}
      <div class="ebk-chapters">${i}</div>`}let ce=null;function _(){ce||(ce=requestAnimationFrame(xs))}function xs(){ce=null;const e=document.getElementById("ebk-progress-fill");if(!e)return;const t=document.documentElement,a=t.scrollHeight-window.innerHeight,s=window.pageYOffset||t.scrollTop||0,n=a>0?Math.min(100,Math.max(0,s/a*100)):0;e.style.width=n.toFixed(2)+"%",e.parentElement.setAttribute("aria-valuenow",String(Math.round(n)))}function Vt(){const e=document.getElementById("ebk-progress");e&&e.remove(),window.removeEventListener("scroll",_),window.removeEventListener("resize",_),ce&&(cancelAnimationFrame(ce),ce=null)}function ae(e){Vt();const t=document.createElement("div");t.id="ebk-progress",t.className="ebk-progress",t.setAttribute("role","progressbar"),t.setAttribute("aria-label",l("readProgress.label")||"Reading progress"),t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax","100"),t.setAttribute("aria-valuenow","0"),e&&t.style.setProperty("--ebk",e);const a=document.createElement("span");a.id="ebk-progress-fill",t.appendChild(a),document.body.appendChild(t),window.addEventListener("scroll",_,{passive:!0}),window.addEventListener("resize",_),_()}async function ys(e,t){const a=String(t||"").replace(/[^A-Za-z0-9_-]/g,"");if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,!a)return G(e);let s=null;try{s=await API.getBook(a)}catch{s=null}if(!s||!s.title||!(s.chapters&&s.chapters.length)){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l("ebooks.empty")}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/ebooks">${l("ebooks.backToLib")}</a></div>
        </div>`;return}const n=s.chapters||[];let o=u.lang==="as"?"as":"en";const i=k(s.title,"en"),r=k(s.title,"as"),c=k(s.subject,"en"),p=k(s.subject,"as"),m=Yt(s),f=r&&r!==i;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/ebooks">${l("nav.ebooks")}</a><span class="bc-sep">/</span>
          <span>${d(i)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${m};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(c)}${p&&p!==c?`<span class="ebk-chip-as"> ${d(p)}</span>`:""}</span>
            </div>
            <h2 class="ebk-head-title">${d(i)}${f?`<span class="ebk-head-title-as">${d(r)}</span>`:""}</h2>
            ${s.description?`<p class="ebk-desc">${d(v(s.description)).replace(/\n/g,"<br>")}</p>`:""}
            <div class="ebk-head-meta">
              ${s.author?`<span><b>${d(v(s.author))}</b></span>`:""}
              <span>${n.length} ${l("ebooks.chapters")}</span>
              ${s.updated?`<span>${l("ebooks.updated")}: ${d(s.updated)}</span>`:""}
            </div>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${o==="as"?"active":""}" data-ebklang="as">${l("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${o==="en"?"active":""}" data-ebklang="en">${l("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ebk-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/ebooks">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${l("ebooks.backToLib")}
          </a>
        </div>
      </div>`;const h=b("#ebk-body");h&&(h.innerHTML=["en","as"].map(x=>`<div data-axo-lang="${x}">${vs(s,x,x==="en"?"ebk-ch":"ebk-ch-as")}</div>`).join("")),ae(m),M(".lang-btn",e).forEach(x=>{x.addEventListener("click",()=>{const y=x.dataset.ebklang;o!==y&&(o=y,u.lang=o,document.body.setAttribute("data-lang",o),M(".lang-btn",e).forEach(g=>g.classList.toggle("active",g.dataset.ebklang===o)),_())})})}const de={syllabus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>',"elementary-mathematics":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/></svg>',"general-english":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>',"logical-reasoning":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',"assam-history-geography-culture":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/></svg>',"general-knowledge-current-affairs":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',default:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>'};function ws(e){const t=e&&e.id||"";return de[t]?de[t]:e&&e.type==="syllabus"?de.syllabus:de.default}function Y(e,t){const a=t&&t.color||e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(a||"")?a:"#4f46e5"}async function pe(){if(Array.isArray(u.exams))return u.exams;let e=[];try{e=await API.listExams()}catch{e=[]}return u.exams=Array.isArray(e)?e:[],u.exams}function Be(e){return(u.exams||[]).find(t=>t.id===e)||null}function xe(e){return!!(e&&e.status==="available"&&(e.sections||[]).length)}function Kt(e,t){return k(e&&e.coverAlt,t)||k(e&&e.title,t)||"Exam book cover"}function ks(e,t){const a=Y(e),s=k(e.title,"en"),n=k(e.title,"as"),o=k(e.subtitle,"en"),i=xe(e),r=l(i?"exams.readNow":"exams.comingSoon"),c=N(s+" "+n+" "+o),p=e.cover?String(e.cover):"",m=i?"":`<span class="exam-soon-badge">${d(l("exams.comingSoon"))}</span>`,f=p?`<img class="ebook-cover-img" src="${d(p)}" alt="${d(Kt(e,u.lang))}" loading="lazy" decoding="async">${m}`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
          <span class="ebook-cover-top">
            <span class="ebook-cover-publisher">axomexam</span>
            <span class="ebook-cover-tag">${d(l(i?"nav.exams":"exams.comingSoon"))}</span>
          </span>
          <span class="ebook-cover-title">
            <span class="ebk-tt-en">${d(s)}</span>
            ${n&&n!==s?`<span class="ebk-tt-as">${d(n)}</span>`:""}
          </span>
          <span class="ebook-cover-subject">${d(o)}</span>
          ${m}`;return`
      <a class="ebook-card reveal exam-card ${i?"":"is-soon"}" href="/exams/${encodeURIComponent(e.id)}" style="--ebk:${a}" data-name="${d(c)}" data-delay="${t%8*50}">
        <span class="ebook-cover${p?" has-photo":""}">${f}</span>
        <span class="ebook-meta">
          <b>${d(s)}</b>
          <span class="ebook-meta-sub">${n&&n!==s?`<span class="ebk-tt-as">${d(n)}</span>`:`<span>${d(o)}</span>`}</span>
          <span class="ebook-read-btn">${d(r)}</span>
        </span>
      </a>`}const nt={trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>',award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',atom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.6c2.4.5 4 2.1 4 4.4"/></svg>',flower:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M12 16a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M2 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/><path d="M16 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/></svg>'};function $s(e){const t=e&&e.icon||"";if(nt[t])return nt[t];if(typeof TOPIC_ICON_RULES<"u"){const a=(e&&e.id||"")+" "+(e&&e.title&&e.title.en||"");for(const[s,n]of TOPIC_ICON_RULES)if(s.test(a))return n}return typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG["current-affairs"]||nt.globe}function As(e,t){const a=e.color||"#ef4444",s=k(e.title,"en"),n=k(e.title,"as");return`
      <a class="sub-card reveal exam-sec-card" href="/current-affairs/${encodeURIComponent(e.id)}" style="--cat:${a}" data-delay="${t%8*40}">
        <span class="sub-ico"><span class="cat-svg">${$s(e)}</span></span>
        <span class="exam-sec-txt">
          <b>${d(s)}</b>
          ${n&&n!==s?`<span class="exam-sec-as">${d(n)}</span>`:""}
          <span class="exam-sec-count" data-ca-count="${d(e.id)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}async function Cs(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;let t=[];try{t=await API.listCurrentAffairs()}catch{t=[]}Array.isArray(t)||(t=[]),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("nav.currentAffairs")}</span>
        </nav>
        <h1>${l("ca.title")}</h1>
        <p class="page-desc">${l("ca.sub")}</p>
        <p class="exams-choose">${l("ca.choose")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        ${t.length?`<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">${t.map((a,s)=>As(a,s)).join("")}</div>`:`<div class="qa-empty"><div class="big">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/></svg>
            </div><p>${d(l("ca.empty"))}</p></div>`}
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${d(l("ca.note"))}
        </p>
      </section>`,L(),Xt(),Zt()}async function Ss(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;let a=null,s=[];try{a=await API.getCurrentAffairsCategory(t)}catch{a=null}try{s=await API.listCurrentAffairsQuestions(t)}catch{s=[]}if(Array.isArray(s)||(s=[]),!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("ca.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(l("ca.noCategory"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/current-affairs">${l("ca.back")}</a></div>
        </div>`;return}const n=a.color||"#ef4444",o=k(a.title,"en")||t,i=k(a.title,"as"),r=u.lang==="as"?"as":"en",c=s.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/current-affairs">${l("nav.currentAffairs")}</a><span class="bc-sep">/</span>
          <span>${d(o)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${n};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${l("nav.currentAffairs")}</span>
              <span class="ebk-chip">${l("ca.questions")}</span>
            </div>
            <h2 class="ebk-head-title">${d(o)}${i&&i!==o?`<span class="ebk-head-title-as">${d(i)}</span>`:""}</h2>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l("ca.uploadedBy")}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${r==="as"?"active":""}" data-calang="as">${l("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${r==="en"?"active":""}" data-calang="en">${l("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ca-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/current-affairs">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${l("ca.back")}
          </a>
        </div>
      </div>`;const p=b("#ca-body"),m=a.updated||"",f=a.uploadedBy||"axomexam team";(()=>{if(!p)return;const x=["en","as"].map(w=>{const A=k(a.intro,w);return A?`<div data-axo-lang="${w}"><div class="ca-intro" style="margin:0 0 14px; padding:14px 16px; border-radius:14px; border:1px solid var(--border,#e2e8f0); background:linear-gradient(180deg, color-mix(in srgb, ${n} 9%, transparent), transparent); font-size:.92rem; line-height:1.65; color:var(--ink-soft,#334155); text-align:left;">${d(A)}</div></div>`:""}).join(""),y=["en","as"].map(w=>`
        <div data-axo-lang="${w}"><div class="ca-meta" style="display:flex; flex-wrap:wrap; gap:6px 18px; margin:0 0 18px; font-size:.78rem; color:var(--ink-muted,#64748b);">
          ${m?`<span><b>${w==="as"?"আপডেট":"Updated"}:</b> ${d(m)}</span>`:""}
          <span><b>${w==="as"?"আপলোড কৰিছে":"Uploaded by"}:</b> ${d(f)}</span>
        </div></div>`).join(""),g=c?aa(s,0,!0):`<div class="qa-empty"><p>${d(l("ca.noContent"))}</p></div>`;p.innerHTML=x+y+g})(),ae(n),M(".lang-btn",e).forEach(x=>{x.addEventListener("click",()=>{const y=x.dataset.calang;u.lang=y==="en"?"en":"as",document.body.setAttribute("data-lang",u.lang),M(".lang-btn",e).forEach(g=>g.classList.toggle("active",g.dataset.calang===u.lang)),_()})})}async function Es(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`;const t=await pe();if(!t.length){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l("exams.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div><p>${d(l("exams.empty"))}</p></div>`;return}const a=t.slice().sort((i,r)=>{const c=xe(i)?0:1,p=xe(r)?0:1;return c!==p?c-p:k(i.title,"en").localeCompare(k(r.title,"en"))});e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("nav.exams")}</span>
        </nav>
        <h1>${l("exams.title")}</h1>
        <p class="page-desc">${l("exams.sub")}</p>
        <p class="exams-choose">${l("exams.choose")}</p>
        <div class="exams-search-wrap">
          <svg class="exams-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="exam-search" type="search" autocomplete="off" spellcheck="false" placeholder="${d(l("exams.search.ph"))}" aria-label="${d(l("exams.search.ph"))}" />
        </div>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid" id="exams-grid">${a.map((i,r)=>ks(i,r)).join("")}</div>
        <div id="exams-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${d(l("exams.noMatch"))}</p></div>
      </section>`;const s=b("#exam-search"),n=M(".exam-card",e),o=b("#exams-no-match");s&&s.addEventListener("input",()=>{const i=N(s.value);let r=0;n.forEach(c=>{const p=!i||(c.dataset.name||"").indexOf(i)!==-1;c.style.display=p?"":"none",p&&r++}),o&&(o.style.display=r?"none":"block")}),L()}function Ms(e,t,a){const s=Y(e,t),n=k(t.title,"en"),o=k(t.title,"as"),i=t.type==="syllabus";return`
      <a class="sub-card reveal exam-sec-card" href="/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}" style="--cat:${s}" data-delay="${a%8*40}">
        <span class="sub-ico">${ws(t)}</span>
        <span class="exam-sec-txt">
          <b>${d(n)}</b>
          ${o&&o!==n?`<span class="exam-sec-as">${d(o)}</span>`:""}
          ${i?"":`<span class="exam-sec-count" data-count-exam="${d(e.id)}" data-count-section="${d(t.id)}" hidden></span>`}
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function qs(e){const t=(e&&e.id||"").toLowerCase(),a=String(k(e&&e.title,"en")||"").toLowerCase(),s=t+" "+a;if(typeof TOPIC_ICON_RULES<"u"){for(const[n,o]of TOPIC_ICON_RULES)if(n.test(s))return o}return de.default}function Jt(e,t,a,s,n){const o=Y(e,t),i=k(a.title,"en"),r=k(a.title,"as"),c=`/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}/${n?encodeURIComponent(n)+"/":""}${encodeURIComponent(a.id)}`,p=n?`${n}/${a.id}`:a.id;return`
      <a class="sub-card reveal exam-sec-card" href="${c}" style="--cat:${o}" data-delay="${s%8*40}">
        <span class="sub-ico">${qs(a)}</span>
        <span class="exam-sec-txt">
          <b>${d(i)}</b>
          ${r&&r!==i?`<span class="exam-sec-as">${d(r)}</span>`:""}
          <span class="exam-sec-count" data-count-exam="${d(e.id)}" data-count-section="${d(t.id)}" data-count-path="${d(p)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function Ps(e,t){let a=e||[],s=null;for(const n of t){if(s=a.find(o=>o&&o.id===n)||null,!s)return null;a=s.subcategories||[]}return s}async function ot(e,t,a,s){const n=s&&Array.isArray(s.subcategories)?s.subcategories:[];return n.length?(await Promise.all(n.map(r=>ot(e,t,a.concat(r.id),r)))).reduce((r,c)=>r+c,0):(await API.listExamQuestions(e,t,a[0],a[1])).length}async function it(e,t){const a=Array.isArray(t.subcategories)?t.subcategories:[];if(a.length)return(await Promise.all(a.map(o=>ot(e,t.id,[o.id],o)))).reduce((o,i)=>o+i,0);const s=await API.getExamSection(e,t.id);return(s&&s.questions||[]).length}async function rt(e,t){if(!e||!t)return;const a=Array.from(e.querySelectorAll(".exam-sec-count")),s=u.counts&&u.counts.examSectionCounts;await Promise.all(a.map(async n=>{const o=n.dataset.countExam||t.id,i=n.dataset.countSection,r=(t.sections||[]).find(m=>m.id===i);if(!r||r.type==="syllabus")return;const c=n.dataset.countPath||"";if(s){const m=c?`${o}/${i}/${c}`:`${o}/${i}`;if(Object.prototype.hasOwnProperty.call(s,m)){const f=Number(s[m])||0;f>0&&(n.textContent=`${f} ${l("topic.questions")}`,n.hidden=!1);return}}let p=0;try{if(c){const m=c.split("/").filter(Boolean),f=Ps(r.subcategories||[],m);p=await ot(o,i,m,f)}else p=await it(o,r)}catch{p=0}p>0&&(n.textContent=`${p} ${l("topic.questions")}`,n.hidden=!1)}))}async function Ts(e){if(!e)return 0;const t=u.counts&&u.counts.examSectionCounts;if(t){let n=0,o=!1;if(Object.keys(t).forEach(i=>{const r=i.split("/");if(r[0]!==e.id||r.length!==2)return;const c=(e.sections||[]).find(p=>p.id===r[1]);!c||c.type==="syllabus"||(o=!0,n+=Number(t[i])||0)}),o)return n}const a=(e.sections||[]).filter(n=>n.type!=="syllabus");return(await Promise.all(a.map(n=>it(e.id,n).catch(()=>0)))).reduce((n,o)=>n+o,0)}async function Ls(e,t){const a=e&&e.querySelector(".exam-book-total");if(!a)return;const s=await Ts(t);if(!s)return;const n=s.toLocaleString("en-IN");a.textContent=`${n} ${l("exams.totalQuestions")}`,a.hidden=!1}function ye(){const e=b("#stat-total-questions");if(e){const s=u.topicIndex.reduce((n,o)=>n+(o.nQuestions||0),0)+(u.examQuestionTotal||0)+(u.caQuestionTotal||0);e.textContent=`${s.toLocaleString()}+`}const t=b("#stat-total-pdfs");t&&(t.textContent=`${xt}+`);const a=b("#stat-total-topics");if(a){const s=u.topicsTotal||u.topicIndex.length;a.textContent=`${s.toLocaleString()}+`}}function Is(){return u.counts&&typeof u.counts.examsTotal=="number"?(u.examQuestionTotal=u.counts.examsTotal,u.examTotalLoaded=!0,ye(),Promise.resolve(u.examQuestionTotal)):(u.examTotalPromise||(u.examTotalPromise=(async()=>{try{await pe();const e=(u.exams||[]).filter(a=>xe(a));let t=0;for(const a of e){const s=Array.isArray(a.sections)?a.sections:[],n=await Promise.all(s.map(o=>!o||o.type==="syllabus"?Promise.resolve(0):it(a.id,o).catch(()=>0)));t+=n.reduce((o,i)=>o+i,0),u.examQuestionTotal=t,ye()}u.examQuestionTotal=t,u.examTotalLoaded=!0}catch{}return ye(),u.examQuestionTotal})()),u.examTotalPromise)}function Xt(){const e=u.caCounts||{};M(".exam-sec-count[data-ca-count]").forEach(t=>{const a=t.dataset.caCount;if(!a||!Object.prototype.hasOwnProperty.call(e,a))return;const s=Number(e[a])||0;s>0&&(t.textContent=`${s} ${l("topic.questions")}`,t.hidden=!1)})}function Zt(){return u.caTotalPromise||(u.caTotalPromise=(async()=>{try{const e=await API.getCurrentAffairsCounts();u.caCounts=e&&e.counts||{},u.caQuestionTotal=e&&e.total||0,ye(),Xt()}catch{}return u.caQuestionTotal})()),u.caTotalPromise}async function Rs(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,await pe();const a=Be(t);if(!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(l("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${l("exams.backToExams")}</a></div>
        </div>`;return}const s=Y(a),n=k(a.title,"en"),o=k(a.title,"as"),i=k(a.subtitle,"en"),r=k(a.subtitle,"as");if(!xe(a)){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
            <span>${d(n)}</span>
          </nav>
        </div>
        <div class="exam-soon-panel" style="--ebk:${s}">
          <span class="exam-soon-ico">${de.default}</span>
          <h1>${d(n)}${o&&o!==n?` <span class="exam-soon-as">${d(o)}</span>`:""}</h1>
          ${i?`<p class="exam-soon-sub">${d(i)}</p>`:""}
          <span class="exam-soon-chip">${l("exams.comingSoon")}</span>
          <p class="exam-soon-msg">${d(l("exams.comingSoonMsg"))}</p>
          <a class="btn btn-accent" href="/exams">${l("exams.backToExams")}</a>
        </div>`;return}const p=a.sections||[],m=a.cover?String(a.cover):"",f=`${d(n)}${o&&o!==n?` <span class="exam-head-as">${d(o)}</span>`:""}`,h=`${d(i)}${r&&r!==i?` &bull; ${d(r)}`:""}`,x=`
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${d(n)}</span>`,y=m?`<div class="page-head">
          <nav class="breadcrumb">${x}</nav>
        </div>
        <section class="exam-cover-hero" style="--ebk:${s}">
          <div class="exam-cover-hero-media">
            <img src="${d(m)}" alt="${d(Kt(a,u.lang))}" width="912" height="1166" loading="eager" decoding="async">
          </div>
          <div class="exam-cover-hero-info">
            <h1>${f}</h1>
            <p class="page-desc">${h}</p>
            <p class="exam-book-total" hidden></p>
            <p class="exams-choose">${l("exams.subjects")}</p>
          </div>
        </section>`:`<div class="page-head">
          <nav class="breadcrumb">${x}</nav>
          <h1>${f}</h1>
          <p class="page-desc">${h}</p>
          <p class="exam-book-total" hidden></p>
          <p class="exams-choose">${l("exams.subjects")}</p>
        </div>`;e.innerHTML=`
      ${y}
      <section class="section" style="padding-bottom:46px;">
        <div class="sub-grid exam-sec-grid" style="--cat:${s}">
          ${p.map((g,w)=>Ms(a,g,w)).join("")}
        </div>
      </section>`,L(),rt(e,a),Ls(e,a)}function ea(e,t){const a=F(e,t);return a.length?`
      <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
        ${a.map((s,n)=>`
          <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
            <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+n)})</b>
            <span style="flex:1; line-height:1.4;">${E(s)}</span>
          </div>
        `).join("")}
      </div>`:""}function Ds(e,t,a){const s=String(a||"").replace(/<[^>]+>/g,"").trim();if(s){const o=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(s);if(!o)return a;const i=F(e,t),r=o[1].toLowerCase().charCodeAt(0)-97;return i[r]===void 0||i[r]===""?a:`${o[1].toUpperCase()}) ${i[r]}`}const n=re(e);if(n&&n.length){const o=e&&e.correct!==void 0?e.correct:e?e.answer:void 0;if(Number.isInteger(o)){if(o>=0&&o<n.length)return n[o].letter||String.fromCharCode(65+o)}else if(typeof o=="string"){const i=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(o.trim());if(i)return i[1].toUpperCase()}}return a}function ta(e,t,a,s){const n=s?"":k(e.category,a),o=T(e,"question",a),i=Ds(e,a,T(e,"answer",a)),r=T(e,"explanation",a),c=ie(e),p=re(e),m=e.a&&typeof e.a=="object"&&e.a[a]||e.a||e.answer,f=Array.isArray(m)||i.includes("qa-step-line"),h=n?`<span style="display:block; margin-bottom:4px; font-size:.68rem; font-weight:800; letter-spacing:.4px; text-transform:uppercase; color:var(--ebk,#4f46e5);">${d(n)}</span>`:"";return f?`
        <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
          <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
            ${h}${t}. ${E(o)}
          </div>
          ${c}
          ${p?V(e,{compact:!0}):ea(e,a)}
          <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
            <div class="a-body" style="margin:0; padding:0; text-align:left;">${i}</div>
            ${r?`
              <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${r}
              </div>`:""}
          </div>
        </article>`:`
      <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
        <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
          <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${t}</span>
          <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${h}${E(o)}</span>
        </div>
        ${c}
        ${p?V(e):ea(e,a)}
        ${i?`<div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
          <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${l("topic.answer")}:</span>
          <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${E(i)}</span>
        </div>`:""}
        ${r?`
          <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
            <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${E(r)}
          </div>`:""}
      </article>`}function aa(e,t,a){const s=Array.isArray(e)?e:[],n=Number.isInteger(t)?t:0;return`<div class="qa-list">${s.map((o,i)=>["en","as"].map(r=>`<div data-axo-lang="${r}">${ta(o,n+i+1,r,!!a)}</div>`).join("")).join("")}</div>`}function lt(e,t,a){const s=Array.isArray(t)?t:[];return()=>{if(e){if(!s.length){e.innerHTML=a||`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`;return}e.innerHTML=aa(s,0,!1)}}}function zs(e,t,a,s){const n=e.type||t&&t.type||"qa",o=String(s||"exam-ch").replace(/[^A-Za-z0-9_-]/g,"");if(n==="syllabus"||e.chapters&&e.chapters.length){const r=e.chapters||[];return r.length?`<div class="ebk-chapters">${r.map((c,p)=>`
        <section class="ebk-chapter" id="${o}-${p}">
          <h3 class="ebk-ch-title"><span class="ebk-ch-no">${p+1}</span>${d(k(c.title,a))}</h3>
          <div class="ebk-ch-body">${Ut(k(c.content,a))}</div>
        </section>`).join("")}</div>`:`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`}const i=Array.isArray(e.questions)?e.questions:[];return i.length?`<div class="qa-list">${i.map((r,c)=>ta(r,c+1,a)).join("")}</div>`:`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`}function js(e,t){return["en","as"].map(a=>`<div data-axo-lang="${a}">${zs(e,t,a,a==="en"?"exam-ch":"exam-ch-as")}</div>`).join("")}async function Hs(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,await pe();const s=Be(t),n=s?(s.sections||[]).find(S=>S.id===a):null;if(!s||!n){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(l("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${l("exams.backToExams")}</a></div>
        </div>`;return}const o=Array.isArray(n.subcategories)?n.subcategories:[];if(o.length){const S=Y(s,n),$=k(s.title,"en"),q=k(n.title,"en"),P=k(n.title,"as");e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d($)}</a><span class="bc-sep">/</span>
            <span>${d(q)}</span>
          </nav>
          <h1>${d(q)}${P&&P!==q?` <span class="exam-head-as">${d(P)}</span>`:""}</h1>
          <p class="exams-choose">${l("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${S}">
            ${o.map((I,R)=>Jt(s,n,I,R)).join("")}
          </div>
        </section>`,L(),rt(e,s);return}let i=null;try{i=await API.getExamSection(t,a)}catch{i=null}const r=Y(s,n),c=k(s.title,"en"),p=k(n.title,"en");if(!i){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d(c)}</a><span class="bc-sep">/</span>
            <span>${d(p)}</span>
          </nav>
          <h1>${d(p)}</h1>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${d(l("exams.noContent"))}</p>
        <div style="margin-top:16px;"><a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">${l("exams.backToExams")}</a></div></div>`;return}const m=u.lang==="as"?"as":"en",f=k(i.title,"en")||p,h=k(i.title,"as")||k(n.title,"as"),x=v(i.description),y=(i.type||n.type)==="syllabus";e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(c)}</a><span class="bc-sep">/</span>
          <span>${d(f)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${r};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(c)}</span>
              <span class="ebk-chip">${d(l(y?"exams.syllabus":"exams.questions"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(f)}${h&&h!==f?`<span class="ebk-head-title-as">${d(h)}</span>`:""}</h2>
            ${x?`<p class="ebk-desc">${d(x).replace(/\n/g,"<br>")}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${m==="as"?"active":""}" data-exlang="as">${l("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${m==="en"?"active":""}" data-exlang="en">${l("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${l("exams.backToExams")}
          </a>
        </div>
      </div>`;const g=b("#exam-body");((i.type||n&&n.type)==="syllabus"||i.chapters&&i.chapters.length?()=>{g&&(g.innerHTML=js(i,n))}:lt(g,Array.isArray(i.questions)?i.questions:[],`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`))(),ae(r),M(".lang-btn",e).forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.exlang;u.lang=$,document.body.setAttribute("data-lang",$),Array.from(e.querySelectorAll(".lang-btn")).forEach(q=>q.classList.toggle("active",q.dataset.exlang===$)),_()})})}async function Bs(e,t,a,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,await pe();const n=Be(t),o=n?(n.sections||[]).find(S=>S.id===a):null,i=o?(o.subcategories||[]).find(S=>S.id===s):null;if(!n||!o||!i){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(l("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${l("exams.backToExams")}</a></div>
        </div>`;return}const r=Array.isArray(i.subcategories)?i.subcategories:[];if(r.length){const S=Y(n,o),$=k(n.title,"en"),q=k(o.title,"en"),P=k(i.title,"en"),I=k(i.title,"as"),R=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${d($)}</a><span class="bc-sep">/</span>
            <a href="${R}">${d(q)}</a><span class="bc-sep">/</span>
            <span>${d(P)}</span>
          </nav>
          <h1>${d(P)}${I&&I!==P?` <span class="exam-head-as">${d(I)}</span>`:""}</h1>
          <p class="exams-choose">${l("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${S}">
            ${r.map((H,K)=>Jt(n,o,H,K,i.id)).join("")}
          </div>
        </section>`,L(),rt(e,n);return}const c=Y(n,o),p=k(n.title,"en"),m=k(o.title,"en"),f=k(i.title,"en"),h=k(i.title,"as"),x=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;let y=[];try{y=await API.listExamQuestions(t,a,s)}catch{y=[]}Array.isArray(y)||(y=[]);const g=u.lang==="as"?"as":"en",w=y.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(p)}</a><span class="bc-sep">/</span>
          <a href="${x}">${d(m)}</a><span class="bc-sep">/</span>
          <span>${d(f)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${c};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(p)}</span>
              <span class="ebk-chip">${d(l("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(f)}${h&&h!==f?`<span class="ebk-head-title-as">${d(h)}</span>`:""}</h2>
            ${w?`<p class="ebk-desc">${w} ${d(l("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${g==="as"?"active":""}" data-exlang="as">${l("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${g==="en"?"active":""}" data-exlang="en">${l("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${x}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${l("exams.backToSection")}
          </a>
        </div>
      </div>`;const A=b("#exam-body");lt(A,y,`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`)(),ae(c),M(".lang-btn",e).forEach(S=>{S.addEventListener("click",()=>{const $=S.dataset.exlang;u.lang=$,document.body.setAttribute("data-lang",$),Array.from(e.querySelectorAll(".lang-btn")).forEach(q=>q.classList.toggle("active",q.dataset.exlang===$)),_()})})}async function Fs(e,t,a,s,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,await pe();const o=Be(t),i=o?(o.sections||[]).find(P=>P.id===a):null,r=i?(i.subcategories||[]).find(P=>P.id===s):null,c=r?(r.subcategories||[]).find(P=>P.id===n):null;if(!o||!i||!r||!c){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${d(l("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${l("exams.backToExams")}</a></div>
        </div>`;return}const p=Y(o,i),m=k(o.title,"en"),f=k(i.title,"en"),h=k(r.title,"en"),x=k(c.title,"en"),y=k(c.title,"as"),g=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`,w=`${g}/${encodeURIComponent(s)}`;let A=[];try{A=await API.listExamQuestions(t,a,s,n)}catch{A=[]}Array.isArray(A)||(A=[]);const C=u.lang==="as"?"as":"en",S=A.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${l("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${d(m)}</a><span class="bc-sep">/</span>
          <a href="${g}">${d(f)}</a><span class="bc-sep">/</span>
          <a href="${w}">${d(h)}</a><span class="bc-sep">/</span>
          <span>${d(x)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${p};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${d(m)}</span>
              <span class="ebk-chip">${d(l("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${d(x)}${y&&y!==x?`<span class="ebk-head-title-as">${d(y)}</span>`:""}</h2>
            ${S?`<p class="ebk-desc">${S} ${d(l("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${C==="as"?"active":""}" data-exlang="as">${l("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${C==="en"?"active":""}" data-exlang="en">${l("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${w}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${d(l("exams.backToSection"))}
          </a>
        </div>
      </div>`;const $=b("#exam-body");lt($,A,`<div class="qa-empty"><p>${d(l("exams.noContent"))}</p></div>`)(),ae(p),M(".lang-btn",e).forEach(P=>{P.addEventListener("click",()=>{const I=P.dataset.exlang;u.lang=I,document.body.setAttribute("data-lang",I),Array.from(e.querySelectorAll(".lang-btn")).forEach(R=>R.classList.toggle("active",R.dataset.exlang===I)),_()})})}function Os(e){const a=[["All Mock Tests","Timed chapter-wise mock tests with instant score and review, exactly like the real exam."],["Bilingual Q&A Practice","Practice questions, answers and explanations in both English and Assamese."],["E-Books On the Go","Read every subject e-book right inside the app — Assam History, Polity, Geography and more."],["Previous Year Papers","Solved past papers organised by exam and year for focused revision."],["PDF Notes & Downloads","Save study material and keep it ready for offline revision."],["Lightweight & Fast","The complete axomexam experience in a compact 1.32 MB app."]].map(([i,r])=>`
        <div class="appdl-feature">
          <span class="appdl-ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
          <h3>${i}</h3>
          <p>${r}</p>
        </div>`).join(""),n=[["Is the axomexam app free?","Yes. The app is 100% free with no sign-up, subscription or hidden charges."],["Why is it not on the Google Play Store?","We distribute the app as a direct APK download so it stays free for every aspirant. A Play Store release may come later."],["Do I need an internet connection?","Yes. Study content, mock tests and notes are loaded online, so an active connection is required."],["Is it safe to install?","Yes. This is our own official build. For your safety, download it only from this page (axomexam.in)."],["Which Android versions are supported?","The app works on modern Android phones with an up-to-date Android System WebView."]].map(([i,r])=>`
        <details class="appdl-faq">
          <summary>${i}</summary>
          <p>${r}</p>
        </details>`).join("");e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><span>Download App</span></nav>
        <h1>Download the axomexam App</h1>
        <p class="page-desc">Get the axomexam Android app — all mock tests, bilingual Q&amp;A practice, e-books and previous year papers in one lightweight app. Free, no sign-up.</p>
      </div>

      <section class="section appdl-hero">
        <div class="appdl-card">
          <img class="appdl-logo" src="/app/axomexam-icon.png" alt="axomexam app logo" width="104" height="104" />
          <div class="appdl-body">
            <h2 class="appdl-title">axomexam — Exam Prep App</h2>
            <p class="appdl-tag">Assam competitive exam preparation, now on your phone.</p>
            <ul class="appdl-meta">
              <li><b>Version</b> 2.1</li>
              <li><b>Size</b> 1.32 MB</li>
              <li><b>Updated</b> 17 Oct 2026</li>
              <li><b>Format</b> APK</li>
              <li><b>Package</b> in.axomexam.app</li>
              <li><b>Price</b> Free</li>
            </ul>
            <div class="appdl-actions">
              <a class="btn btn-accent appdl-download" href="/app/axomexam-v2.1.apk" download>Download APK (1.32 MB)</a>
              <a class="btn btn-outline" href="#install">How to install</a>
            </div>
            <p class="appdl-note">Direct download · No sign-up · 100% free</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">What's inside the app</h2>
        <div class="appdl-grid">${a}</div>
      </section>

      <section class="section" id="install">
        <h2 class="appdl-section-title">How to install the APK</h2>
        <ol class="appdl-steps">
          <li><b>Download the APK.</b> Tap the Download button above. The file <code>axomexam-v2.1.apk</code> will be saved to your phone.</li>
          <li><b>Allow the install.</b> If Android blocks it, open Settings and enable “Install unknown apps” (or “Unknown sources”) for your browser.</li>
          <li><b>Install the app.</b> Open the downloaded file from Downloads or the notification, then tap <b>Install</b>.</li>
          <li><b>Open and start learning.</b> Launch <b>axomexam</b> from your app drawer and begin practising.</li>
        </ol>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">System requirements</h2>
        <ul class="appdl-meta">
          <li><b>Platform</b> Android</li>
          <li><b>App version</b> 2.1</li>
          <li><b>File size</b> 1.32 MB</li>
          <li><b>Internet</b> Required</li>
          <li><b>Price</b> Free</li>
        </ul>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">Frequently asked questions</h2>
        <div class="appdl-faqs">${n}</div>
      </section>

      <section class="section">
        <div class="appdl-safety">
          <b>Safety &amp; disclaimer:</b> For your security, download the app only from this official page (axomexam.in). axomexam is NOT an official app of APSC, Assam Police, SSC, Railway, ADRE or any government body. All exam names and trademarks belong to their respective owners. This is an independent study aid.
        </div>
      </section>`;const o=e.querySelector(".appdl-download");o&&o.addEventListener("click",Nn),L()}async function Ns(e,t){if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("load.loading")}</p></div>`,t.length===1)return _s(e);const a=(typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[]).find(r=>r.id===t[1]);if(!a)return G(e);const s=Array.isArray(a.children)?a.children:[];if(s.length>0){if(t.length===2)return Gs(e,a,s);const r=s.find(m=>m.id===t[2]);if(!r)return G(e);if(t.length===3){const m=await API.listPreviousYearYears(a.id,r.id);return sa(e,r,m,a)}const c=t[3],p=await API.listPreviousYearPdfs(a.id,c,r.id);return na(e,r,c,p,a)}if(t.length===2){const r=await API.listPreviousYearYears(a.id);return sa(e,a,r)}const o=t[2],i=await API.listPreviousYearPdfs(a.id,o);na(e,a,o,i)}function Gs(e,t,a){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${l("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${l("pyear.chooseSection.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="section-head"><div><h2>${l("pyear.chooseSection")}</h2></div></div>
        <div class="sub-grid">
          ${a.map((s,n)=>`
            <a class="sub-card reveal" href="/previous-year/${t.id}/${s.id}" style="--cat:${s.color||t.color}" data-delay="${n*40}">
              <span class="sub-ico">${d(s.icon||s.id.slice(0,2).toUpperCase())}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(v(s.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${l("pyear.years")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,L(),O(e,{id:t.id,name:v(t.name)+" Previous Year Papers",count:a.length,h2:v(t.name)+" Previous Year Question Papers",items:a.map(s=>({name:v(s.name),count:0}))})}function _s(e){const t=typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${l("page.previous-year.title")}</span></nav>
        <h1>${l("page.previous-year.title")}</h1>
        <p class="page-desc">${l("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${t.length?`
          <div class="section-head"><div><h2>${l("pyear.choose")}</h2><p class="sec-sub">${l("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${t.map((a,s)=>`
              <a class="sub-card reveal" href="/previous-year/${a.id}" style="--cat:${a.color}" data-delay="${s*40}">
                <span class="sub-ico">${d(a.icon||a.id.slice(0,2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(v(a.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${l("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${l("downloads.none")}</p></div>`}
      </section>`,L(),O(e,{name:"Previous Year Question Papers",noDefaults:!0,h2:"Previous Year Question Papers for Assam and Central Exams",info:"Solving previous year papers is the fastest way to understand the real difficulty of an examination. On this page you can download original question papers year by year for Assam Police, DHS and DME, Guwahati High Court, Railway and SSC recruitment. Use them to identify repeated topics, judge the weight of each section and plan your revision with evidence rather than guesswork.",items:t.map(a=>({name:v(a.name),count:0})),tips:["Attempt the paper once under a timer without looking at any notes.","Compare your answers with the official key and list every repeated topic.","Shortlist the two or three sections where you lost the most marks.","Reattempt the same paper after two weeks to confirm real improvement."],faqs:[{q:"Are these the original previous year question papers?",a:"Yes. Each PDF is a compiled question paper for the mentioned exam and year, provided for practice and revision."},{q:"Can I download the papers for offline practice?",a:"Yes. Every paper can be downloaded as a PDF and used on a mobile or printed copy for offline practice."},{q:"Do previous year papers repeat in the actual exam?",a:"Exact questions rarely repeat, but the topics, difficulty level and question style repeat often. That is why solving them is so useful."}]})}function sa(e,t,a,s){const n=s?`<a href="/previous-year/${s.id}">${d(v(s.name))}</a><span class="bc-sep">/</span>`:"";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${l("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${n}
          <span>${d(v(t.name))}</span>
        </nav>
        <h1>${d(v(t.name))}</h1>
        <p class="page-desc">${l("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((o,i)=>`
              <a class="sub-card reveal" href="/previous-year/${s?s.id+"/":""}${t.id}/${o}" style="--cat:${t.color}" data-delay="${i*50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${d(o)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${l("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${l("pyear.noYears")}</p></div>`}
      </section>`,L(),O(e,{id:t.id,name:v(t.name)+" previous year papers",count:a.length,h2:v(t.name)+" Previous Year Papers by Year",items:a.map(o=>({name:String(o),count:0}))})}function na(e,t,a,s,n){const o=n?`/previous-year/${n.id}/${t.id}`:`/previous-year/${t.id}`,i=n?`<a href="/previous-year/${n.id}">${d(v(n.name))}</a><span class="bc-sep">/</span>`:"",r=c=>`
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${d(c.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>${d(v(t.name))} • ${d(a)}</span></span>
        <a class="dl-btn dl-save" href="${c.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${l("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${l("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${i}
          <a href="${o}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <span>${d(a)}</span>
        </nav>
        <h1>${d(v(t.name))} — ${d(a)}</h1>
        <p class="page-desc">${l("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${s.length?`<div class="dl-list">${s.map(r).join("")}</div>`:`<div class="info-panel"><p>${l("pyear.none")}</p></div>`}
      </section>`,O(e,{id:t.id,name:v(t.name)+" "+a+" question paper",count:s.length,h2:v(t.name)+" "+a+" Question Paper",items:s.map(c=>({name:c.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "),count:0})),faqs:[{q:"Is the "+v(t.name)+" "+a+" paper a solved or unsolved paper?",a:"The PDF contains the question paper for practice. Attempt it first, then cross-check your answers with the relevant answer key or study notes on axomexam.in."},{q:"Can I download the "+v(t.name)+" "+a+" paper?",a:"Yes. Use the download button beside the paper to save the PDF for offline practice."}]})}function Qs(e){e.innerHTML=`
      <div class="success-modal-overlay" id="successPopup" style="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(5px);display:none;place-items:center;z-index:99999;opacity:0;transition:opacity 0.2s ease;">
        <div class="success-modal-card" style="background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:24px;padding:30px 24px;width:82%;max-width:300px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);border:1px solid var(--line,#e2e8f0);">
          <div class="tick-circle" style="width:68px;height:68px;background:#10b981;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px -4px rgba(16,185,129,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 id="pop-title" style="font-size:1.25rem;font-weight:800;color:var(--ink,#0f172a);margin-bottom:4px;">Sent Successfully!</h3>
          <p id="pop-desc" style="font-size:0.84rem;color:var(--ink-soft,#64748b);font-weight:600;">Your message has been received.</p>
        </div>
      </div>

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
    `;const t={en:{title:"Submit Q&A Note",desc:"Contribute notes or feedback for aspirants.",name:"Your Name",namePh:"e.g. Rahul Borah",email:"Email Address",emailPh:"name@example.com",topic:"Subject / Topic (Optional)",topicPh:"e.g. Assam History, Science",question:"Question (Optional)",questionPh:"Type the question here...",answer:"Answer / Message (Optional)",answerPh:"Provide complete answer, steps or message...",captcha:"Security:",captchaPh:"Ans",btn:"Submit",submitting:"Submitting...",captchaError:"Incorrect math answer! Please try again.",popTitle:"Sent Successfully!",popDesc:"Your message has been received."},as:{title:"প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)",desc:"প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",name:"আপোনাৰ নাম",namePh:"যেনে: ৰাহুল বৰা",email:"ইমেইল ঠিকনা",emailPh:"name@example.com",topic:"বিষয় / অধ্যায় (ঐচ্ছিক)",topicPh:"যেনে: অসম বুৰঞ্জী, বিজ্ঞান",question:"প্ৰশ্ন (ঐচ্ছিক)",questionPh:"প্ৰশ্নটো ইয়াত লিখক...",answer:"উত্তৰ বা বাৰ্তা (ঐচ্ছিক)",answerPh:"সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",captcha:"সুৰক্ষা:",captchaPh:"উত্তৰ",btn:"জমা দিয়ক",submitting:"প্ৰেৰণ হৈ আছে...",captchaError:"অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।",popTitle:"সফলতাৰে প্ৰেৰণ হ'ল!",popDesc:"আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"}};let a="en",s=0;function n(){const r=Math.floor(Math.random()*9)+1,c=Math.floor(Math.random()*9)+1;s=r+c,b("#math-expression").textContent=`${r} + ${c} = ?`,b("#captcha-answer").value=""}function o(r){a=r;const c=b("#btn-en"),p=b("#btn-as");r==="en"?(c.style.background="#2563eb",c.style.color="#ffffff",p.style.background="transparent",p.style.color="var(--ink-soft,#64748b)"):(p.style.background="#2563eb",p.style.color="#ffffff",c.style.background="transparent",c.style.color="var(--ink-soft,#64748b)");const m=t[r];b("#txt-title").textContent=m.title,b("#txt-desc").textContent=m.desc,b("#lbl-name").textContent=m.name,b("#name").placeholder=m.namePh,b("#lbl-email").textContent=m.email,b("#email").placeholder=m.emailPh,b("#lbl-topic").textContent=m.topic,b("#subject").placeholder=m.topicPh,b("#lbl-question").textContent=m.question,b("#question").placeholder=m.questionPh,b("#lbl-answer").textContent=m.answer,b("#answer").placeholder=m.answerPh,b("#lbl-captcha").textContent=m.captcha,b("#captcha-answer").placeholder=m.captchaPh,b("#txt-btn").textContent=m.btn,b("#pop-title").textContent=m.popTitle,b("#pop-desc").textContent=m.popDesc}function i(){const r=b("#successPopup");r.style.display="grid",r.style.opacity="1",setTimeout(()=>{r.style.opacity="0",setTimeout(()=>{r.style.display="none"},200)},2e3)}b("#btn-en").addEventListener("click",()=>o("en")),b("#btn-as").addEventListener("click",()=>o("as")),b("#btn-refresh-captcha").addEventListener("click",n),b("#qaForm").addEventListener("submit",async function(r){r.preventDefault();const c=b("#form-error");if(c.style.display="none",parseInt(b("#captcha-answer").value,10)!==s){c.textContent=t[a].captchaError,c.style.display="block",n();return}const m=b("#submitBtn"),f=b("#txt-btn");m.disabled=!0,f.textContent=t[a].submitting;const h=b("#subject").value.trim()||"General Note",x=b("#question").value.trim()||"N/A",y=b("#answer").value.trim()||"N/A",g={apiKey:"sf_304846a9720d7354070bd57c",replyTo:"support@axomexam.in",name:b("#name").value.trim(),email:b("#email").value.trim(),subject:`[axomexam Submission] ${h}`,message:`Topic: ${h}

Question:
${x}

Answer/Message:
${y}

Sent to: support@axomexam.in`};try{const A=await(await fetch("https://api.staticforms.dev/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})).json();A.success?(b("#qaForm").reset(),n(),i()):(c.textContent=A.message||"Failed to submit. Please try again.",c.style.display="block")}catch{c.textContent="Network error. Please check your connection.",c.style.display="block"}finally{m.disabled=!1,f.textContent=t[a].btn}}),n()}function Ws(e,t,a,s){const n=[];return u.topicIndex.forEach(o=>{o.cat.id===e.id&&(t&&t!=="all"&&(!o.sub||o.sub.id!==t)||a&&(!o.section||o.section.id!==a)||s&&o.topic.id!==s||n.push(o))}),n}async function Ys(e,t,a,s){const n=Ws(e,t,a,s);if(!n.length)return[];const o=await Promise.all(n.map(r=>API.getTopic(r.cat.id,r.topic.id,r.sub&&r.sub.id,r.cat&&r.cat.contentLayout).then(c=>({d:c,rec:r})).catch(()=>null))),i=[];return o.forEach(r=>{if(!r||!r.d)return;(Array.isArray(r.d)?r.d:Array.isArray(r.d.questions)?r.d.questions:[]).forEach(p=>{const m={en:T(p,"question","en"),as:T(p,"question","as")},f={en:T(p,"answer","en"),as:T(p,"answer","as")},h=F(p,"en"),x=F(p,"as"),y=Array.isArray(p.options)?p.options:[];let g=[];if(h.length||x.length){const A=Math.max(h.length,x.length);for(let C=0;C<A;C++){const S=y[C];g.push({en:h[C]||"",as:x[C]||"",fig:S&&typeof S=="object"&&typeof S.fig=="string"?S.fig:""})}}let w=0;if(typeof p.correct=="string"){const C=p.correct.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else if(typeof p.a=="string"){const C=p.a.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else Number.isInteger(p.correct_index)?w=p.correct_index:Number.isInteger(p.correct)?w=p.correct:Number.isInteger(p.answer)&&(w=p.answer);i.push({q:m,a:f,fig:typeof p.fig=="string"?p.fig:"",table:p.table||null,options:g.length>=2?g:null,correct:w,topicTitle:r.rec.title,catId:r.rec.cat.id})})}),i}function oa(e){const t=e.slice();for(let a=t.length-1;a>0;a--){const s=Math.floor(Math.random()*(a+1));[t[a],t[s]]=[t[s],t[a]]}return t}function Fe(){u.mock&&u.mock.timerId&&(clearInterval(u.mock.timerId),u.mock.timerId=null)}let Oe=!1,we="";function ia(){if(!Oe){Oe=!0,we=location.href;try{history.pushState({axoMockGuard:Date.now()},"",we)}catch{}}}function ct(){Oe=!1}function ra(){if(ct(),Fe(),u.mock=null,history.state&&history.state.axoMockGuard){history.back();return}if(we){De(we);return}De("/mock-test")}function Us(){if(!Oe||!u.mock||!u.mock.started)return!1;const e=!!document.getElementById("confirm-modal");try{history.pushState({axoMockGuard:Date.now()},"",we||location.href)}catch{}return e||Ne({title:"Leave Mock Test?",message:"Are you sure you want to leave the mock test? Your current progress will be lost.",confirmText:"Yes, Leave",cancelText:"Stay",onConfirm:ra}),!0}function Ne({title:e,message:t,confirmText:a,cancelText:s,onConfirm:n}){const o=b("#confirm-modal");o&&o.remove();const i=document.createElement("div");i.id="confirm-modal",i.className="read-modal",i.innerHTML=`
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box confirm-modal-box" role="dialog">
        <h3 style="font-size:1.12rem; margin-bottom:9px;">${d(e)}</h3>
        <p style="color:var(--ink-soft); font-size:.9rem; margin-bottom:18px; line-height:1.55;">${d(t)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${d(s||"Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${d(a||"Confirm")}</button>
        </div>
      </div>`,document.body.appendChild(i),b("#modal-cancel-btn",i).addEventListener("click",()=>i.remove()),b(".read-modal-backdrop",i).addEventListener("click",()=>i.remove()),b("#modal-confirm-btn",i).addEventListener("click",()=>{i.remove(),n&&n()})}function dt(e){return e?e.id==="english"?[{id:"grammar",name:{en:"Grammar",as:"ব্যাকৰণ"}},{id:"vocabulary",name:{en:"Vocabulary",as:"শব্দভাণ্ডাৰ"}}]:e.id==="computer"?[{id:"comp-fundamentals",name:{en:"Fundamentals",as:"মৌলিক"}},{id:"ms-office",name:{en:"MS Office",as:"MS Office"}}]:e.subcategories||[]:[]}function Yn(e){return!e||!e.length?!1:!!(e[0]==="category"&&e[1]==="english"||e[0]==="topic"&&e[1]==="english"||e[0]==="mock-test"&&e[1]==="english"||e[0]==="category"&&e[1]==="articles"&&e[2]==="english"||e[0]==="exams"&&/english/i.test(e[2]||""))}function Vs(e,t){if(t.length===1)return on(e);const a=t[1],s=u.categories.find(c=>c.id===a);if(!s)return G(e);const n=t[2],o=t[3],i=t[4];if(n&&n.startsWith("topic-")||t.includes("start"))return Ge(e,s,n,o,i);const r=dt(s);if(!n&&r.length)return rn(e,s);if(n&&!o){const c=r.find(p=>p.id===n);return c?Ks(e,s,c):Ge(e,s,n,null,null)}if(n&&o){const c=r.find(m=>m.id===n);if(!c)return G(e);if(/^set-\d+$/.test(o)){const m=parseInt(o.replace("set-",""),10);return m>=1&&m<=We?hn(e,s,c,m):G(e)}const p=(c.sections||[]).find(m=>m.id===o);return p&&p.topics&&p.topics.length?ln(e,s,c,p):Ge(e,s,n,o,null)}return Ge(e,s,null,null,null)}async function Ks(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("mock.loading")}</p></div>`;const s=await cn(t.id,a.id);return mn(e,t,a,s)}const pt={gk:{sets:70,q:1750},math:{sets:30,q:750},science:{sets:15,q:375},reasoning:{sets:15,q:375},english:{sets:10,q:250},computer:{sets:10,q:250}};function Js(e,t,a){return CONFIG.USE_REMOTE?`${CONFIG.RAW_BASE}/${CONFIG.OWNER}/${CONFIG.REPO}/${CONFIG.BRANCH}/${CONFIG.PATHS.MOCKSETS}/${e}/${t}/set-${a}.json`:`${CONFIG.FALLBACK.MOCKSETS_BASE}${e}/${t}/set-${a}.json`}async function Xs(e,t,a){try{const s=await fetch(Js(e,t,a),{method:"HEAD",cache:"no-store"});return s.status===405||s.status===501?ft(await API.getMockSet(e,t,a)):s.ok}catch{return!1}}async function Zs(e,t){const a=e+"/"+t;if(Object.prototype.hasOwnProperty.call(u.mockSetCount,a))return u.mockSetCount[a];let s=0;for(let n=1;n<=We&&await Xs(e,t,n);n++)s++;return u.mockSetCount[a]=s,s}async function en(e){const a=(await Promise.all(dt(e).map(o=>Zs(e.id,o.id)))).reduce((o,i)=>o+i,0),s=pt[e.id],n=s&&s.sets?Math.round(s.q/s.sets):25;return{sets:a,questions:a*n}}function tn(e){e.forEach(t=>{en(t).then(a=>{if(!a.sets)return;u.mockLiveCounts[t.id]=a;const s=document.querySelector(`.mv-card[data-mock-cat="${t.id}"]`),n=s&&s.querySelector(".mv-card-meta");n&&(n.textContent=`${a.sets} sets · ${a.questions} questions`),an()}).catch(()=>{})})}function an(){const e=u.categories.filter(i=>i.id!=="study-guides"&&i.id!=="articles");let t=0,a=0,s=!1;if(e.forEach(i=>{const r=u.mockLiveCounts[i.id];r&&(t+=r.sets,a+=r.questions,s=!0)}),!s)return;const n=b("#mock-stat-sets"),o=b("#mock-stat-questions");n&&(n.textContent=String(t)),o&&(o.textContent=String(a))}function sn(){let e=0,t=0;return u.categories.forEach(a=>{const s=pt[a.id];s&&(e+=s.sets,t+=s.q)}),{sets:e,questions:t}}function ut(e){if(e==null)return{en:"",as:""};if(typeof e=="string")return{en:e,as:""};const t=e.en||e.as||"",a=e.as&&e.as!==t?e.as:"";return{en:t,as:a}}function mt(e){const t=e.color||z(e.catId),a=e.delay||0,s=e.as?`<span class="mt-tile-as">${d(e.as)}</span>`:"",n=e.meta?`<span class="mt-tile-meta">${e.meta}</span>`:"",o=e.iconHtml||le(e.id,e.catId);return`<a class="mt-tile reveal" href="${e.href}" style="--c:${t}" data-delay="${a}">
        <span class="mt-tile-ico">${o}</span>
        <span class="mt-tile-en">${d(e.en)}</span>
        ${s}
        ${n}
      </a>`}function ht(e){return`<div class="mt-topics-head">
        <h2>${d(e)} Mock Test</h2>
        <p>Choose a topic below to begin your timed mock test.</p>
      </div>`}function nn(e,t){const a=z(e.id),s=e.name,n=typeof s=="string"?s:s&&s.en||"",o=typeof s=="string"?"":s&&s.as||"",i=pt[e.id],r=i?`${i.sets} sets · ${i.q} questions`:`${he(e)} topics`;return`
      <a class="mv-card reveal" style="--c:${a}" data-delay="${t*50}" data-mock-cat="${e.id}" href="/mock-test/${e.id}">
        <span class="mv-card-ico">${te(e.id)}</span>
        <span class="mv-card-body">
          <span class="mv-card-title">${d(n)}</span>
          ${o?`<span class="mv-card-as">${d(o)}</span>`:""}
          <span class="mv-card-meta">${r}</span>
        </span>
        <span class="mv-card-go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
      </a>`}function on(e){const t=u.categories.filter(s=>s.id!=="study-guides"&&s.id!=="articles"),a=sn();e.innerHTML=`
      <section class="mv-landing">
        <div class="mv-hero">
          <span class="mv-badge"><span class="dot"></span>100% Free · English &amp; Assamese</span>
          <h1>${l("mock.title")} for Competitive Exams</h1>
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
          <div class="mv-head"><h2>${l("mock.pick")}</h2><p>${l("mock.pick.sub")}</p></div>
          <div class="mv-grid">
            ${t.map((s,n)=>nn(s,n)).join("")}
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
      </section>`,L(),O(e,{name:"Mock Tests",noDefaults:!0,h2:"Timed Mock Tests for Assam Competitive Exams",info:"Each mock test on axomexam.in works like the real examination. A live timer runs while you attempt the questions, your score is calculated instantly, and every question is followed by a clear bilingual explanation. The sets are arranged subject-wise and paper-wise so you can practise exactly the section you are preparing for.",items:t.map(s=>({name:v(s.name),count:he(s)})),tips:["Start with the subject you find hardest, so you have the most time to improve it.","Attempt one full set under the timer before checking any answer.","Maintain an error log of every wrong answer and revise it weekly.","Increase the number of questions gradually once your accuracy is stable."],faqs:[{q:"How does the online mock test work?",a:"Choose a subject, pick a paper and attempt the questions within the timer. Once you submit, you immediately see your score along with the correct answers and explanations."},{q:"Can I attempt the mock tests more than once?",a:"Yes. All mock tests are unlimited. You can reattempt any set as many times as you like at no cost."},{q:"Are the mock tests suitable for ADRE and Assam Police?",a:"Yes. The subjects and question patterns follow the syllabus of ADRE 3.0, Assam Police, APSC, Gauhati High Court, SSC and Railway recruitment exams."}]}),tn(t)}function rn(e,t){const a=dt(t);e.innerHTML=`
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
        ${ht(v(t.name))}
        <div class="mt-tile-grid">
          ${a.map((n,o)=>{const i=ut(n.name),r=(n.sections||[]).reduce((p,m)=>p+(m.topics||[]).length,0)||(n.topics||[]).length,c=r?`${r} ${r===1?"topic":"topics"}`:"Timed practice sets";return mt({href:`/mock-test/${t.id}/${n.id}`,catId:t.id,id:n.id,en:i.en,as:i.as,meta:c,delay:o*40})}).join("")}
        </div>
      </section>`,L();const s=u.topicIndex.filter(n=>n.cat&&n.cat.id===t.id);O(e,{id:t.id,name:v(t.name)+" Mock Test",count:a.length,total:s.reduce((n,o)=>n+(o.nQuestions||0),0),h2:v(t.name)+" Mock Tests with Answers",items:a.map(n=>({name:v(n.name),count:0}))})}function Un(e,t,a){const s=a.sections||[];e.innerHTML=`
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
        ${ht(v(a.name))}
        <div class="mt-tile-grid">
          ${s.map((n,o)=>{const i=ut(n.name),r=(n.topics||[]).length;return mt({href:`/mock-test/${t.id}/${a.id}/${n.id}`,catId:t.id,id:n.id,en:i.en,as:i.as,meta:`${r} ${r===1?"topic":"topics"}`,delay:o*50})}).join("")}
        </div>
      </section>`,L(),O(e,{id:a.id,name:v(a.name)+" Mock Test",count:s.length,h2:v(a.name)+" Mock Test - "+v(t.name),items:s.map(n=>({name:v(n.name),count:(n.topics||[]).length}))})}function ln(e,t,a,s){const n=s.topics||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${d(v(a.name))}</a><span class="bc-sep">/</span>
          <span>${d(v(s.name))}</span>
        </nav>
        <h1>${d(v(s.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${ht(v(s.name))}
        <div class="mt-tile-grid">
          ${n.map((o,i)=>{const r=ut(o.name);return mt({href:`/mock-test/${t.id}/start`,catId:t.id,id:o.id,en:r.en,as:r.as,meta:"Take Mock Test",delay:i*40})}).join("")}
        </div>
      </section>`,L(),O(e,{id:s.id,name:v(s.name)+" Mock Test",count:n.length,h2:v(s.name)+" Mock Test Questions",items:n.map(o=>({name:v(o.name),count:0}))})}function ft(e){return e?Array.isArray(e)?e.length>0:Array.isArray(e.questions)&&e.questions.length>0:!1}async function cn(e,t){const a=e+"/"+t;if(u.mockSetCache[a])return u.mockSetCache[a];const s=[];for(let n=1;n<=We;n++){const o=await API.getMockSet(e,t,n);if(ft(o))s.push(n);else break}return u.mockSetCache[a]=s,s}function dn(e){if(!e||typeof e!="object")return null;const t={en:T(e,"question","en"),as:T(e,"question","as")};if(!t.en&&!t.as)return null;const a={en:T(e,"answer","en"),as:T(e,"answer","as")},s=F(e,"en"),n=F(e,"as"),o=Array.isArray(e.options)?e.options:[];let i=[];if(s.length||n.length){const m=Math.max(s.length,n.length);for(let f=0;f<m;f++){const h=o[f];i.push({en:s[f]||"",as:n[f]||"",fig:h&&typeof h=="object"&&typeof h.fig=="string"?h.fig:""})}}let r=0;if(typeof e.correct=="string"){const f=e.correct.trim().toLowerCase().charCodeAt(0);f>=97&&f<=101&&(r=f-97)}else if(typeof e.a=="string"){const f=e.a.trim().toLowerCase().charCodeAt(0);f>=97&&f<=101&&(r=f-97)}else Number.isInteger(e.correct_index)?r=e.correct_index:Number.isInteger(e.correct)?r=e.correct:Number.isInteger(e.answer)&&(r=e.answer);let c=String(e.difficulty||"medium").toLowerCase().trim();c!=="easy"&&c!=="hard"&&(c="medium");const p={en:T(e,"explanation","en"),as:T(e,"explanation","as")};return{q:t,a,fig:typeof e.fig=="string"?e.fig:"",table:e.table||null,options:i.length>=2?i:null,correct:r,difficulty:c,explanation:{en:p.en,as:p.as}}}async function pn(e,t,a){const s=await API.getMockSet(e.id,t.id,a);if(!ft(s))return null;const o=(Array.isArray(s)?s:Array.isArray(s.questions)?s.questions:[]).map(dn).filter(Boolean);return o.length?{setNumber:a,title:s&&s.title||`Set ${a}`,subject:s&&s.subject||t&&t.name||"",questions:o}:null}function Vn(e){const t={easy:[],medium:[],hard:[]};return(e||[]).forEach(a=>{!a.options||a.options.length<2||(t[a.difficulty]=t[a.difficulty]||[],t[a.difficulty].push(a))}),t}function un(e,t){const a=t||u.uiLang;return e==="easy"?a==="as"?"সহজ":"Easy":e==="hard"?a==="as"?"কঠিন":"Hard":a==="as"?"মধ্যম":"Medium"}function mn(e,t,a,s){const n=new Set(s),o=Math.max(wa,...s);e.innerHTML=`
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
          ${Array.from({length:o},(i,r)=>{const c=r+1;return n.has(c)?`
              <a class="set-card reveal" href="/mock-test/${t.id}/${a.id}/set-${c}" style="--cat:${z(t.id)}" data-delay="${r*40}">
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
              <div class="set-card set-card-locked reveal" style="--cat:${z(t.id)}" data-delay="${r*40}">
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
      </section>`,L()}async function hn(e,t,a,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("mock.loading")}</p></div>`;const n=await pn(t,a,s);if(!n){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>Questions for Set ${s} have not been uploaded yet. Please check back soon.</p>
          <div style="margin-top:18px;">
            <a class="btn btn-outline" href="/mock-test/${t.id}/${a.id}">← Back to Sets</a>
          </div>
        </div>`;return}const o=n.questions.filter(f=>f.options&&f.options.length>=2),i=o.length?o:n.questions,r=[10,15,20,25].filter(f=>f<=i.length);r.length||r.push(i.length);const c=r.includes(25)?25:r[r.length-1];u.mock={cat:t,pool:i,configured:!1,count:c,testLang:t.id==="english"?"en":"as",setInfo:{setNumber:s,title:n.title,subject:v(a.name)}},e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${d(v(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${d(v(a.name))}</a><span class="bc-sep">/</span>
          <span>${d(n.title)}</span>
        </nav>
        <h1>${d(n.title)} — ${d(v(a.name))}</h1>
        <p class="page-desc">Choose your language and start when ready.</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${z(t.id)}">
          <span class="mt-hero-icon">${te(t.id)}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${d(v(t.name))}</span>
            <span class="mt-hero-title">${d(n.title)} • ${d(v(a.name))}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${u.mock.pool.length} ${l("mock.questions")}</span>
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
            ${r.map(f=>`<button type="button" data-count="${f}" class="${f===c?"active":""}">${f}</button>`).join("")}
          </div>
        </div>

        <button class="btn mt-start" id="mock-begin-btn">${l("mock.begin")} →</button>

        <div class="mt-block">
          <div class="mt-label">Instructions <span>নিৰ্দেশনা</span></div>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>This is a timed test — a stopwatch tracks your total time.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>Choose the best answer. Results are graded instantly on submit.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>You can quit anytime — your current progress will be lost.</li>
          </ul>
        </div>
      </div>`,M("[data-mocklang]").forEach(f=>{f.addEventListener("click",()=>{M("[data-mocklang]").forEach(h=>h.classList.remove("active")),f.classList.add("active"),u.mock.testLang=f.dataset.mocklang})});let p=c;const m=b("#set-count-picker");m&&M("button",m).forEach(f=>{f.addEventListener("click",()=>{M("button",m).forEach(h=>h.classList.remove("active")),f.classList.add("active"),p=parseInt(f.dataset.count,10),u.mock.count=p})}),b("#mock-begin-btn").addEventListener("click",()=>{Ne({title:`Start ${n.title}?`,message:`You are about to start a ${p} question mock test in ${u.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>fn(p)})})}function fn(e){if(!u.mock)return;const t=u.mock.pool.filter(n=>n.options&&n.options.length>=2),a=t.length?t:u.mock.pool,s=Math.min(e||a.length,a.length);u.mock=Object.assign(u.mock,{pool:oa(a).slice(0,s),count:s,idx:0,answers:[],elapsedSec:0,started:!0,introPending:!0,timerId:null}),gt()}async function Ge(e,t,a,s,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${l("mock.loading")}</p></div>`;const o=await Ys(t,a,s,n);if(!o.length){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${l("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;return}u.mock={cat:t,pool:o,configured:!1,count:0,testLang:t.id==="english"?"en":"as"};const i=[10,20,50,100].filter(p=>p<=o.length);i.includes(o.length)||i.push(o.length),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${d(v(t.name))}</span></nav>
        <h1>${l("mock.setup.title")}</h1>
        <p class="page-desc">${d(v(t.name))} • ${o.length} ${l("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${z(t.id)};width:40px;height:40px;border-radius:11px;">${te(t.id)}</span>
          <b>${d(v(t.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${u.mock.testLang==="as"?"active":""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${u.mock.testLang==="en"?"active":""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${l("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${i.map((p,m)=>`<button type="button" data-count="${p}" class="${m===0?"active":""}">${p}</button>`).join("")}
        </div>

        <button class="btn btn-begin" id="mock-begin-btn">${l("mock.begin")}</button>
        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
      </div>`,M("[data-mocklang]").forEach(p=>{p.addEventListener("click",()=>{M("[data-mocklang]").forEach(m=>m.classList.remove("active")),p.classList.add("active"),u.mock.testLang=p.dataset.mocklang})});const r=b("#count-picker");let c=i[0]||o.length;M("button",r).forEach(p=>{p.addEventListener("click",()=>{M("button",r).forEach(m=>m.classList.remove("active")),p.classList.add("active"),c=parseInt(p.dataset.count,10)})}),b("#mock-begin-btn").addEventListener("click",()=>{Ne({title:"Start Mock Test?",message:`You are about to start a ${c} question test in ${u.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>la(c)})})}function la(e){if(!u.mock)return;const t=oa(u.mock.pool).slice(0,e);u.mock=Object.assign(u.mock,{pool:t,idx:0,answers:[],elapsedSec:0,started:!0,introPending:!0,timerId:null}),gt()}function gt(){const e=u.mock,t=e.pool[e.idx];if(!t)return da();const a=b("#app"),s=e.answers[e.idx]!==void 0,n=["A","B","C","D","E"],o=ee(t.q),i=t.options||[],r=ie(t),c=e.setInfo?`${d(v(e.cat.name))} • ${d(e.setInfo.title)}`:`${d(v(e.cat.name))}`;a.innerHTML=`
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${c} • Question ${e.idx+1}/${e.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed"><span id="quiz-timer-val">${_e(e.elapsedSec)}</span></span>
          <button class="quiz-quit" id="quiz-quit-btn">${l("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${(e.idx/e.pool.length*100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${e.idx+1}</div>
          <div class="quiz-qtext">${E(o)}</div>
          ${r}

          <div class="quiz-options" id="quiz-options">
            ${i.map((f,h)=>{const x=qe(f),y=Pe(f);return`
              <button class="quiz-option${y?" quiz-option-fig":""}" data-opt="${h}" ${s?"disabled":""}>
                <span class="opt-key">${n[h]}</span>
                <span class="opt-main">${y?`<span class="opt-fig">${y}</span>`:""}${x?`<span class="opt-text">${E(x)}</span>`:""}</span>
              </button>`}).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" type="button">
            ${e.idx+1===e.pool.length?"Final Submit":s?l("mock.next")+" →":l("mock.skip")+" →"}
          </button>
        </div>
      </div>`,Ze();const p=b(".quiz-card");p&&Z(p);const m=b("#quiz-options");m&&M(".quiz-option",m).forEach(f=>{f.addEventListener("click",()=>{if(e.answers[e.idx]!==void 0)return;const h=parseInt(f.dataset.opt,10);e.answers[e.idx]=h,M(".quiz-option",m).forEach(C=>{C.disabled=!0;const S=parseInt(C.dataset.opt,10);S===t.correct?C.classList.add("correct"):S===h&&C.classList.add("wrong"),S===h&&C.classList.add("selected")});const x=b("#quiz-feedback");x.classList.add(h===t.correct?"good":"bad"),x.style.display="block";const y=i[t.correct],g=y&&typeof y=="object"&&y.option?String(y.option):n[t.correct]||"",w=`${g?`<b>(${g})</b> `:""}${Pe(y)?`<span class="opt-fig fb-fig">${Pe(y)}</span>`:""}${qe(y)?E(qe(y)):""}`;x.innerHTML=h===t.correct?l("mock.revealCorrect"):`${l("mock.correctAnswer")}: ${w||g||""}`,Z(x);const A=b("#quiz-next");A&&(A.disabled=!1,A.textContent=e.idx+1===e.pool.length?"Final Submit":l("mock.next")+" →")})}),b("#quiz-next").addEventListener("click",()=>{e.idx++,e.idx>=e.pool.length?(Fe(),da()):gt()}),b("#quiz-quit-btn").addEventListener("click",()=>{Ne({title:"Quit Mock Test?",message:"Are you sure you want to quit the mock test? Your current progress will be lost.",confirmText:"Yes, Quit",cancelText:"Resume Test",onConfirm:()=>ra()})}),e.introPending?(e.introPending=!1,ia(),gn(()=>ca())):(e.timerId||ca(),ia())}function gn(e){const t=document.getElementById("mock-intro");t&&t.remove();const a=document.createElement("div");a.className="mock-intro",a.id="mock-intro",a.innerHTML=`
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
      </div>`,document.body.appendChild(a);const s=a.querySelector(".mi-stage"),n=a.querySelector(".mi-ring-fg"),o=a.querySelector("#mi-count"),i=3,r=600;s&&s.style.setProperty("--ring-dur",r+"ms"),requestAnimationFrame(()=>{a.classList.add("in")});const c=f=>{o.textContent=String(f),o.classList.remove("tick"),o.offsetWidth,o.classList.add("tick"),n&&(n.classList.remove("fill"),n.getBoundingClientRect(),n.classList.add("fill"))};c(i);let p=i;const m=setInterval(()=>{if(p--,p>=0){c(p);return}clearInterval(m),a.classList.add("go"),o.outerHTML='<div class="mi-check" id="mi-count"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg></div>',setTimeout(()=>{a.classList.add("out"),setTimeout(()=>{a.remove(),e&&e()},520)},880)},r)}function ca(){const e=u.mock,t=()=>{if(!e||!e.started||e.timerId===null)return;e.elapsedSec++;const a=b("#quiz-timer-val");a&&(a.textContent=_e(e.elapsedSec))};e.timerId=setInterval(t,1e3)}function _e(e){const t=Math.max(0,e);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function da(){const e=u.mock;if(Fe(),ct(),!e)return;let t=0,a=0,s=0;const n=e.pool.map((g,w)=>{const A=e.answers[w];let C=!1;return A===void 0?s++:A===g.correct?(C=!0,t++):a++,{q:g,a:A,ok:C}}),o=e.elapsedSec,i=e.pool.length?Math.round(t/e.pool.length*100):0,r=i>=80?"mock.result.msgExcellent":i>=55?"mock.result.msgGood":i>=35?"mock.result.msgAverage":"mock.result.msgPoor",c=52.5,p=2*Math.PI*c,m=p*(1-i/100),f=b("#app");f.innerHTML=`
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${c}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${c}" stroke-dasharray="${p.toFixed(1)}" stroke-dashoffset="${p.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${i}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${l("mock.result.title")}</h2>
          ${e.setInfo?`<p style="font-size:.85rem; color:var(--ink-soft,#64748b); margin:2px 0 0;">${d(e.setInfo.title)}${e.setInfo.difficulty?" • "+un(e.setInfo.difficulty):""}</p>`:""}
          <p class="result-msg">${l(r)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${t}</b><span>${l("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${a}</b><span>${l("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${s}</b><span>${l("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${_e(o)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-accent" id="mock-share-btn">${bn()} ${l("mock.result.share")}</button>
            <button class="btn btn-outline" id="mock-retry">${l("mock.result.retry")}</button>
            <a class="btn btn-outline" href="/mock-test">${l("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${l("mock.result.review")}</button>
            <a class="btn btn-outline" href="/mock-test">${l("mock.result.exit")}</a>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${n.map((g,w)=>{const A=g.q,C=g.a===void 0?`<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${l("mock.result.skipped")}</span>`:`<span class="rv-badge ${g.ok?"good":"bad"}">${g.ok?"✓ "+l("mock.result.correct"):"✕ "+l("mock.result.wrong")}</span>`,S=A.options||[],$=H=>{if(!S[H])return"";const K=String.fromCharCode(65+H),se=Pe(S[H]),ne=qe(S[H]);return`<b>(${K})</b> ${se?`<span class="rv-fig">${se}</span>`:""}${ne?E(ne):se?"":"(No text)"}`};let q="";g.a!==void 0&&S.length?(q=`<div class="rv-ans"><b>${l("mock.answer")}:</b> ${$(g.a)}</div>`,g.ok||(q+=`<div class="rv-ans correct-line"><b>${l("mock.correctAnswer")}:</b> ${$(A.correct)}</div>`)):S.length&&(q=`<div class="rv-ans correct-line"><b>${l("mock.correctAnswer")}:</b> ${$(A.correct)}</div>`);const P=ee(A.explanation),I=u.mock&&u.mock.testLang==="as"?"ব্যাখ্যা":"Explanation",R=P?`<div class="rv-exp"><b>${I}:</b> ${E(P)}</div>`:"";return`
              <div class="review-item">
                <div class="rv-q">Q${w+1}. ${E(ee(A.q))}</div>
                ${ie(A)}
                ${C}
                ${q}
                ${R}
              </div>`}).join("")}
        </div>
      </div>`,Ze();const h=b("#review-list");h&&Z(h),requestAnimationFrame(()=>{const g=b(".result-ring .r-fg");g&&(g.style.strokeDashoffset=m.toFixed(1))}),b("#mock-retry").addEventListener("click",()=>la(e.pool.length));const x=b("#mock-share-btn");x&&x.addEventListener("click",ha);const y=b("#mock-review-toggle");y.addEventListener("click",()=>{const g=b("#review-list"),w=g.hidden;g.hidden=!w,y.textContent=l(w?"mock.result.hideReview":"mock.result.review")}),e.timerId&&(clearInterval(e.timerId),e.timerId=null)}const bt="https://axomexam.in";function bn(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function vn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'}function xn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'}function yn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'}function wn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'}function kn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function $n(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'}function An(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'}function Cn(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'}function pa(){return'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}function Sn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'}function En(){const e=u.mock;if(!e)return null;let t=0,a=0,s=0;e.pool.forEach((m,f)=>{const h=e.answers[f];h===void 0?s++:h===m.correct?t++:a++});const n=e.pool.length?Math.round(t/e.pool.length*100):0,o=n>=80?"mock.result.msgExcellent":n>=55?"mock.result.msgGood":n>=35?"mock.result.msgAverage":"mock.result.msgPoor";let i="/mock-test";location.pathname&&location.pathname.indexOf("/mock-test/")===0&&(i=location.pathname.replace(/\/index\.html$/,""));const r=e.setInfo&&e.setInfo.title?e.setInfo.title:"",c=e.setInfo&&e.setInfo.subject?e.setInfo.subject:v(e.cat&&e.cat.name),p=r?c?c+" • "+r:r:v(e.cat&&e.cat.name)+" Mock Test";return{correct:t,wrong:a,skipped:s,pct:n,msgKey:o,url:bt+i,title:p,time:_e(e.elapsedSec),count:e.pool.length}}function Mn(e){return l("share.text").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{url}",e.url).replace("{site}",bt)}function qn(e){const t=String(e).split(","),a=t[0].match(/:(.*?);/),s=a?a[1]:"image/png",n=atob(t[1]),o=new Uint8Array(n.length);for(let i=0;i<n.length;i++)o[i]=n.charCodeAt(i);return new Blob([o],{type:s})}function ua(e,t,a,s,n,o){const i=Math.min(o,s/2,n/2);e.beginPath(),e.moveTo(t+i,a),e.arcTo(t+s,a,t+s,a+n,i),e.arcTo(t+s,a+n,t,a+n,i),e.arcTo(t,a+n,t,a,i),e.arcTo(t,a,t+s,a,i),e.closePath()}function Pn(){const s="'Plus Jakarta Sans','Inter',Arial,sans-serif",n=document.createElement("canvas");n.width=372,n.height=68;const o=n.getContext("2d");return o.scale(2,2),o.fillStyle="rgba(255,255,255,0.18)",ua(o,0,0,34,34,9),o.fill(),o.fillStyle="#ffffff",o.textAlign="center",o.textBaseline="middle",o.font="900 18px "+s,o.fillText("A",17,17),o.textAlign="left",o.font="800 21px "+s,o.fillText("axomexam.in",46,17),n.toDataURL("image/png")}function Tn(e){const n="'Plus Jakarta Sans','Inter',Arial,sans-serif",o=document.createElement("canvas").getContext("2d");o.font="800 11px "+n;const i=Math.ceil(o.measureText(e).width+32),r=document.createElement("canvas");r.width=i*2,r.height=56;const c=r.getContext("2d");return c.scale(2,2),c.fillStyle="rgba(255,255,255,0.16)",ua(c,.5,.5,i-1,27,99),c.fill(),c.strokeStyle="rgba(255,255,255,0.28)",c.lineWidth=1,c.stroke(),c.fillStyle="#ffffff",c.textAlign="center",c.textBaseline="middle",c.font="800 11px "+n,c.fillText(e,i/2,28/2),r.toDataURL("image/png")}async function Ln(e,t,a){try{await document.fonts.ready}catch{}const s=52.5,n=2*Math.PI*s,o=n*(1-Math.max(0,Math.min(100,e.pct))/100),i=(String(t||"").trim().charAt(0)||"A").toUpperCase(),r="font-family:'Plus Jakarta Sans','Inter',Arial,sans-serif",c=Pn(),p=Tn(l("share.reportBadge")),m=a?'<img src="'+a+'" alt="" />':'<svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true"><text x="42" y="56.5" text-anchor="middle" fill="#ffffff" font-size="40" font-weight="800" style="'+r+'">'+d(i)+"</text></svg>",f=[{v:e.correct,l:l("mock.result.correct")},{v:e.wrong,l:l("mock.result.wrong")},{v:e.skipped,l:l("mock.result.skipped")},{v:e.time,l:l("mock.result.time")}],h=document.createElement("div");h.className="report-card",h.innerHTML='<div class="rc-top"><div class="rc-brand"><img src="'+c+'" alt="" /></div><div class="rc-badge"><img src="'+p+'" alt="" /></div></div><div class="rc-user"><div class="rc-avatar'+(a?" has-photo":"")+'">'+m+'</div><div><div class="rc-name">'+d(t)+'</div><div class="rc-test">'+d(e.title)+'</div></div></div><div class="rc-score-row"><div class="rc-ring"><svg class="rc-ring-arc" viewBox="0 0 120 120"><circle class="rc-r-bg" cx="60" cy="60" r="'+s+'"></circle><circle class="rc-r-fg" cx="60" cy="60" r="'+s+'" stroke-dasharray="'+n.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"></circle></svg><svg class="rc-ring-label" viewBox="0 0 120 120" aria-hidden="true"><text x="60" y="71" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="800" style="'+r+'">'+e.pct+'%</text><text x="60" y="88" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-size="9" font-weight="700" style="'+r+'">'+d(l("share.score"))+'</text></svg></div><div class="rc-msg"><div class="rc-msg-title">'+d(l(e.msgKey))+'</div><div class="rc-msg-sub">'+d(e.correct+" "+l("mock.result.correct")+"  •  "+e.wrong+" "+l("mock.result.wrong")+"  •  "+e.skipped+" "+l("mock.result.skipped"))+'</div></div></div><div class="rc-stats">'+f.map(function(y){return'<div class="rc-stat"><b>'+d(String(y.v))+"</b><span>"+d(y.l)+"</span></div>"}).join("")+'</div><div class="rc-challenge"><div class="rc-challenge-ico">'+Sn()+'</div><div><div class="rc-challenge-title">'+d(l("share.challenge"))+'</div><div class="rc-challenge-link">'+d(e.url)+'</div></div></div><div class="rc-foot"><div class="rc-foot-line">'+d(l("share.cardLine1").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{site}",bt+"/"))+'</div><div class="rc-foot-line rc-foot-link">'+d(e.url)+"</div></div>";const x=document.createElement("div");x.className="report-card-holder",x.appendChild(h),document.body.appendChild(x);try{if(await wt(),!window.html2canvas)throw new Error("html2canvas unavailable");return(await window.html2canvas(h,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#4f46e5"})).toDataURL("image/png")}finally{x.remove()}}function ue(e,t){const a=document.createElement("a");a.href=e,a.download=t,document.body.appendChild(a),a.click(),a.remove()}async function ke(e,t){if(navigator.canShare&&navigator.canShare({files:[e]}))try{return await navigator.share({files:[e],text:t,title:"axomexam Result"}),!0}catch(a){if(a&&a.name==="AbortError")return!0}return!1}async function ma(e){try{await navigator.clipboard.writeText(e),B(l("share.linkCopied"))}catch{const a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select();try{document.execCommand("copy"),B(l("share.linkCopied"))}catch{}a.remove()}}function ha(){const e=En();if(!e)return;const t=b("#share-modal");t&&t.remove();const a=document.createElement("div");a.id="share-modal",a.className="read-modal share-modal",a.innerHTML='<div class="read-modal-backdrop"></div><div class="read-modal-box" role="dialog" aria-modal="true"><div class="read-modal-head"><div class="read-modal-titles"><span class="read-modal-title" id="share-modal-title">'+d(l("share.title"))+'</span><span class="read-modal-sub" id="share-modal-sub">'+d(l("share.subtitle"))+'</span></div><button class="read-close" id="share-close" type="button" aria-label="Close">✕</button></div><div class="read-modal-body" id="share-body"><form class="share-form" id="share-form" novalidate><div><label for="share-name">'+d(l("share.nameLabel"))+'</label><input type="text" id="share-name" maxlength="40" autocomplete="name" placeholder="'+d(l("share.namePlaceholder"))+'" /></div><div><label>'+d(l("share.photoLabel"))+'</label><div class="share-photo-row"><div class="share-photo-preview" id="share-photo-preview">'+pa()+'</div><div class="share-photo-actions"><label class="share-file-btn" for="share-photo-input">'+Cn()+" "+d(l("share.photoChoose"))+'</label><input type="file" id="share-photo-input" accept="image/*" hidden /><button type="button" class="share-photo-remove" id="share-photo-remove" hidden>'+d(l("share.photoRemove"))+'</button></div></div></div><div style="display:flex; gap:10px; margin-top:6px;"><button type="button" class="btn btn-outline" id="share-cancel">'+d(l("share.cancel"))+'</button><button type="submit" class="btn btn-primary" id="share-generate">'+d(l("share.generate"))+"</button></div></form></div></div>",document.body.appendChild(a);let s="";const n=()=>a.remove();b("#share-close",a).addEventListener("click",n),b(".read-modal-backdrop",a).addEventListener("click",n),b("#share-cancel",a).addEventListener("click",n);const o=b("#share-photo-input",a),i=b("#share-photo-preview",a),r=b("#share-photo-remove",a);o.addEventListener("change",()=>{const c=o.files&&o.files[0];if(!c)return;const p=new FileReader;p.onload=()=>{s=String(p.result||""),i.innerHTML='<img src="'+s+'" alt="" />',r.hidden=!1},p.readAsDataURL(c)}),r.addEventListener("click",()=>{s="",o.value="",i.innerHTML=pa(),r.hidden=!0}),b("#share-form",a).addEventListener("submit",async c=>{c.preventDefault();const p=b("#share-name",a),m=(p.value||"").trim();if(!m){B(l("share.nameRequired")),p.focus();return}const f=b("#share-generate",a);f.disabled=!0,f.textContent=l("share.generating");let h="";try{h=await Ln(e,m,s)}catch(x){console.error("Report card generation failed:",x),f.disabled=!1,f.textContent=l("share.generate"),B(l("share.error"));return}In(a,{S:e,name:m,dataUrl:h})})}function In(e,t){const a=t.S,s=t.dataUrl,n=Mn(a),o="axomexam-report-"+a.pct+"percent.png",i=b("#share-body",e);if(!i)return;const r=(x,y,g,w)=>'<button type="button" class="share-target '+x+'" data-share="'+y+'">'+w+"<span>"+d(l(g))+"</span></button>";i.innerHTML='<img class="share-preview-img" src="'+s+'" alt="'+d(l("share.previewTitle"))+'" /><div class="share-targets">'+r("wa","whatsapp","share.whatsapp",vn())+r("fb","facebook","share.facebook",xn())+r("tg","telegram","share.telegram",yn())+r("tw","twitter","share.twitter",wn())+r("more","more","share.more",kn())+r("dl","dl","share.download",$n())+r("copy","copy","share.copy",An())+'</div><button type="button" class="btn btn-outline" id="share-back" style="width:100%;">← '+d(l("share.back"))+"</button>";const c=b("#share-modal-title",e);c&&(c.textContent=l("share.previewTitle"));const p=b("#share-modal-sub",e);p&&(p.textContent=l("share.shareNow"));const m=qn(s);let f=m;try{f=new File([m],o,{type:"image/png"})}catch{f=m}const h=!!(navigator.canShare&&navigator.canShare({files:[f]}));b("#share-back",e).addEventListener("click",()=>{e.remove(),ha()}),M("[data-share]",e).forEach(x=>{x.addEventListener("click",async()=>{const y=x.dataset.share,g=encodeURIComponent;if(y==="whatsapp"){if(h&&await ke(f,n))return;ue(s,o),B(l("share.imageSaved")),window.open("https://wa.me/?text="+g(n),"_blank")}else if(y==="facebook"){if(h&&await ke(f,n))return;ue(s,o),B(l("share.imageSaved")),window.open("https://www.facebook.com/sharer/sharer.php?u="+g(a.url)+"&quote="+g(n),"_blank")}else if(y==="telegram"){if(h&&await ke(f,n))return;ue(s,o),B(l("share.imageSaved")),window.open("https://t.me/share/url?url="+g(a.url)+"&text="+g(n),"_blank")}else if(y==="twitter"){if(h&&await ke(f,n))return;ue(s,o),B(l("share.imageSaved")),window.open("https://twitter.com/intent/tweet?url="+g(a.url)+"&text="+g(n),"_blank")}else if(y==="more"){if(h&&await ke(f,n))return;ue(s,o),await ma(n)}else y==="dl"?(ue(s,o),B(l("share.downloaded"))):y==="copy"&&await ma(n)})})}function Rn(e){const t={id:"trending",name:{en:"Trending",as:"জনপ্ৰিয়"},color:"#f97316",icon:"↗"};e.forEach(a=>{if(!a||!a.id)return;const s=`trending/${a.id}`,n={path:s,cat:t,sub:null,section:null,topic:a,title:a.title||a.name,desc:a.description,tags:a.tags||[],nQuestions:(a.questions||[]).length,pdf:a.pdf||null,popularity:Number(a.popularity)||0,extra:!0};u.topicMap[s]=n,u.topicIndex.push(n)})}function Dn(){const e="[data-lang],[data-ebklang],[data-exlang],[data-calang]";document.addEventListener("click",t=>{const a=t.target.closest(e);if(!a||a.tagName!=="BUTTON")return;const s=a.getAttribute("data-lang")||a.getAttribute("data-ebklang")||a.getAttribute("data-exlang")||a.getAttribute("data-calang");if(s!=="en"&&s!=="as")return;const n=Xe();s==="as"&&n||s==="en"&&!n||document.querySelector(`link[rel="alternate"][hreflang="${s}"]`)&&(t.preventDefault(),t.stopPropagation(),window.location.href=Wa()+window.location.search+window.location.hash)},!0)}function zn(){document.addEventListener("click",e=>{const t=e.target.closest("a");if(!t)return;const a=t.getAttribute("href");if(a&&!a.startsWith("/topic/")){if(a.startsWith("#")){const s=a.slice(1);s&&(e.preventDefault(),ze(s,!0));return}if(a.startsWith("/")&&!a.startsWith("//")&&!t.hasAttribute("download")&&t.target!=="_blank"){e.preventDefault();const s=a.indexOf("#");if(s>-1){const n=a.slice(0,s),o=a.slice(s+1),i=window.location.pathname.replace(/\/index\.html$/,"");if(n===i||n===i+"/"||n.replace(/\/$/,"")===i.replace(/\/$/,"")){ze(o,!0);return}De(n),setTimeout(()=>ze(o,!0),0);return}De(a)}}})}async function jn(){const e=b("#preloader");u.lang=Xe()?"as":"en";try{const n=localStorage.getItem("axomexam-ui-lang");n?u.uiLang=n:u.uiLang="en"}catch{u.uiLang="en"}document.body.setAttribute("data-lang",u.lang),document.body.setAttribute("data-ui-lang",u.uiLang),Te(),Gn();const[t,a,s]=await Promise.all([API.getCategories().catch(n=>(console.error("Failed to load categories:",n),null)),API.getCounts().catch(()=>null),API.getTrendingTopics().catch(n=>(console.error("Failed to load extra trending topics:",n),null))]);t&&Object.assign(u,Fa(t)),a&&Oa(a),s&&Rn(s),u.categories.length?(u.ready=!0,Le(),Re(),us(),Ba(),Dn(),zn(),window.addEventListener("popstate",()=>{Us()||(Le(),Re(),je())}),je(),ye()):b("#app").innerHTML=`<div class="loader"><p>${l("load.error")}</p></div>`,e&&setTimeout(()=>e.classList.add("done"),350)}function fa(){const e=b("#app");if(!e)return;const t=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readMore"]||"Read More",a=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readLess"]||"Show Less";e.querySelectorAll(".page-desc").forEach(s=>{if(s.dataset.enhanced==="1")return;s.dataset.enhanced="1";const n=s.textContent||"";if(!n.includes(`
`))return;const o=n.split(`
`).map(x=>x.trim()).filter(Boolean);let i="",r=!1;o.forEach(x=>{const y=x.match(/^[•\-*]\s*(.*)$/);y?(r||(i+="<ul>",r=!0),i+="<li>"+d(y[1])+"</li>"):(r&&(i+="</ul>",r=!1),i+="<p>"+d(x)+"</p>")}),r&&(i+="</ul>");const c=document.createElement("div");c.className="page-desc desc-expandable",c.dataset.enhanced="1",c.innerHTML='<div class="desc-inner">'+i+"</div>",s.replaceWith(c);const p=c.querySelector(".desc-inner"),m=parseFloat(getComputedStyle(p).lineHeight)||24,f=Math.round(m*3.2);if(p.scrollHeight<=f)return;p.style.setProperty("--desc-max",f+"px"),c.classList.add("is-collapsed");const h=document.createElement("button");h.type="button",h.className="desc-toggle",h.setAttribute("aria-expanded","false"),h.innerHTML=t+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',h.addEventListener("click",()=>{const x=c.classList.toggle("is-collapsed");p.style.maxHeight="",h.innerHTML=(x?t:a)+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',h.setAttribute("aria-expanded",x?"false":"true")}),c.appendChild(h)})}function Hn(){const e=b("#app");if(!e)return;fa(),new MutationObserver(()=>fa()).observe(e,{childList:!0,subtree:!0})}function Bn(){const e=b("#hamburger");if(!e)return;e.addEventListener("click",()=>{const s=b("#mobile-menu");s&&s.classList.contains("open")?be():Gt()});const t=b("#mobile-backdrop");t&&t.addEventListener("click",be);const a=b("#mobile-close");a&&a.addEventListener("click",be),document.addEventListener("keydown",s=>{if(s.key==="Escape"){be();const n=b("#search-results");n&&(n.hidden=!0)}})}function Fn(e){const t=M("#tabbar .tab-item");let a="home";e[0]==="mock-test"?a="mock":e[0]==="categories"||e[0]==="category"||e[0]==="topic"?a="categories":e[0]==="exams"?a="exams":e[0]==="search"?a="search":e[0]&&e[0]!==""&&(a=""),t.forEach(s=>s.classList.toggle("active",s.dataset.tab===a))}function On(){const e=b("#tab-menu");e&&e.addEventListener("click",()=>Gt())}function ga(e){const a=e==="dark"?`
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
    `;M(".theme-toggle").forEach(s=>{s.innerHTML=a,s.style.cssText="display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; border:1px solid var(--border,#e2e8f0); background:var(--bg-subtle,#f8fafc); color:var(--ink,#0f172a); cursor:pointer; padding:0; outline:none; transition:all 0.2s ease;"})}const ba="axomexam-app-prompt-done";let va=!1;function xa(){try{return localStorage.getItem(ba)==="1"}catch{return!1}}function vt(){va=!0;const e=document.getElementById("app-prompt");e&&(e.classList.remove("show"),window.setTimeout(()=>{e&&(e.hidden=!0)},300))}function Nn(){try{localStorage.setItem(ba,"1")}catch{}vt()}function ya(){try{if(window.axomexamApp||window.__AXOMEXAM_APP__||window.AxomexamApp)return!0;const e=(navigator.userAgent||"").toLowerCase();if(e.indexOf("axomexam")!==-1||/(^|[;( ])wv([; )]|$)/.test(e))return!0}catch{}return!1}function Gn(){if(ya()||window.matchMedia&&!window.matchMedia("(max-width: 900px)").matches||xa())return;const e=document.createElement("div");e.id="app-prompt",e.className="app-prompt",e.hidden=!0,e.innerHTML=`
      <a class="app-prompt-link" href="/download-app">
        <img class="app-prompt-icon" src="/app/axomexam-icon.png" alt="" width="40" height="40" />
        <span class="app-prompt-text">
          <b>${d(l("appPrompt.title"))}</b>
          <span>${d(l("appPrompt.msg"))}</span>
        </span>
      </a>
      <button class="app-prompt-close" type="button" aria-label="${d(l("appPrompt.close"))}" title="${d(l("appPrompt.close"))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>`,document.body.appendChild(e),e.querySelector(".app-prompt-close").addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),vt()}),e.querySelector(".app-prompt-link").addEventListener("click",()=>{vt()}),window.setTimeout(()=>{va||xa()||(e.hidden=!1,e.classList.add("show"))},5e3)}function _n(){const e=document.documentElement;let t="light";try{t=localStorage.getItem("axomexam-theme")||"light"}catch{}t==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme"),ga(t);const a=s=>{s==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme");try{localStorage.setItem("axomexam-theme",s)}catch{}ga(s)};M(".theme-toggle").forEach(s=>{s.dataset.themeBound||(s.dataset.themeBound="1",s.addEventListener("click",()=>{const n=e.getAttribute("data-theme")==="dark";a(n?"light":"dark")}))})}document.addEventListener("DOMContentLoaded",()=>{Bn(),On(),_n(),Hn(),jn()})})();
