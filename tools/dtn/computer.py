"""Section: Computer Knowledge - 60 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Fundamentals & hardware ----
    A(R("What does CPU stand for in computing?",
        "কম্পিউটাৰত CPU ৰ পূৰ্ণ ৰূপ কি?",
        [("Central Processing Unit", "চেণ্ট্ৰেল প্ৰচেছিং ইউনিট"), ("Computer Personal Unit", "কম্পিউটাৰ পাৰ্চনেল ইউনিট"), ("Central Program Unit", "চেণ্ট্ৰেল প্ৰ'গ্ৰাম ইউনিট"), ("Control Processing Unit", "কণ্ট্ৰ'ল প্ৰচেছিং ইউনিট")], 0,
        "CPU stands for Central Processing Unit.",
        "CPU ৰ অৰ্থ চেণ্ট্ৰেল প্ৰচেছিং ইউনিট।"))
    A(R("Which unit is known as the brain of a computer?",
        "কোনটোক কম্পিউটাৰৰ মগজু বুলি জনা যায়?",
        [("CPU", "চি.পি.ইউ."), ("Monitor", "মনিটৰ"), ("Keyboard", "কীবৰ্ড"), ("Printer", "প্ৰিণ্টাৰ")], 0,
        "The CPU is known as the brain of a computer.",
        "চি.পি.ইউ.ক কম্পিউটাৰৰ মগজু বুলি জনা যায়।"))
    A(R("Name the device among these that feeds data into a computer.",
        "তলৰ কোনটো ইনপুট সঁজুলি?",
        [("Keyboard", "কীবৰ্ড"), ("Monitor", "মনিটৰ"), ("Printer", "প্ৰিণ্টাৰ"), ("Speaker", "স্পীকাৰ")], 0,
        "A keyboard is an input device.",
        "কীবৰ্ড এটা ইনপুট সঁজুলি।"))
    A(R("Name the device among these that gives out processed results.",
        "তলৰ কোনটো আউটপুট সঁজুলি?",
        [("Printer", "প্ৰিণ্টাৰ"), ("Mouse", "মাউছ"), ("Scanner", "স্কেনাৰ"), ("Joystick", "জয়ষ্টিক")], 0,
        "A printer is an output device.",
        "প্ৰিণ্টাৰ এটা আউটপুট সঁজুলি।"))
    A(R("Which type of memory is directly accessible by the CPU?",
        "কোন প্ৰকাৰৰ মেম'ৰী চি.পি.ইউ. য়ে পোনপটীয়াকৈ ব্যৱহাৰ কৰিব পাৰে?",
        [("Primary memory", "প্ৰাথমিক মেম'ৰী"), ("Secondary memory", "গৌণ মেম'ৰী"), ("Tertiary memory", "তৃতীয় মেম'ৰী"), ("Virtual memory", "ভাৰ্চুৱেল মেম'ৰী")], 0,
        "Primary memory is directly accessible by the CPU.",
        "প্ৰাথমিক মেম'ৰী চি.পি.ইউ. য়ে পোনপটীয়াকৈ ব্যৱহাৰ কৰিব পাৰে।"))
    A(R("What is the full form of RAM?",
        "RAM ৰ পূৰ্ণ ৰূপ কি?",
        [("Random Access Memory", "ৰেণ্ডম এক্সেছ মেম'ৰী"), ("Read Access Memory", "ৰিড এক্সেছ মেম'ৰী"), ("Rapid Access Memory", "ৰেপিড এক্সেছ মেম'ৰী"), ("Ready Access Memory", "ৰেডি এক্সেছ মেম'ৰী")], 0,
        "RAM stands for Random Access Memory.",
        "RAM ৰ অৰ্থ ৰেণ্ডম এক্সেছ মেম'ৰী।"))
    A(R("Which memory is non-volatile and retains data when power is off?",
        "কোন মেম'ৰী অস্থিৰ আৰু বিদ্যুৎ বন্ধ হ'লেও তথ্য ৰাখে?",
        [("ROM", "ৰম"), ("RAM", "ৰেম"), ("Cache", "কেশ"), ("Register", "ৰেজিষ্টাৰ")], 0,
        "ROM is non-volatile memory that retains data without power.",
        "ৰম অস্থিৰ মেম'ৰী যি বিদ্যুৎ নথকাতো তথ্য ৰাখে।"))
    A(R("What does the ALU in a CPU do?",
        "চি.পি.ইউ. ৰ ALU য়ে কি কৰে?",
        [("Performs arithmetic and logic operations", "গাণিতিক আৰু তৰ্ক কাৰ্য সম্পাদন কৰে"), ("Stores data permanently", "তথ্য স্থায়ীভাৱে সঞ্চয় কৰে"), ("Displays output", "আউটপুট দেখুৱায়"), ("Connects to the internet", "ইণ্টাৰনেটৰ সৈতে সংযোগ কৰে")], 0,
        "The ALU performs arithmetic and logical operations.",
        "ALU য়ে গাণিতিক আৰু তৰ্ক কাৰ্য সম্পাদন কৰে।"))
    A(R("Which of these is a secondary storage device?",
        "এইবোৰৰ কোনটো গৌণ সঞ্চয় সঁজুলি?",
        [("Hard disk", "হাৰ্ড ডিস্ক"), ("RAM", "ৰেম"), ("ROM", "ৰম"), ("Cache", "কেশ")], 0,
        "A hard disk is a secondary storage device.",
        "হাৰ্ড ডিস্ক এটা গৌণ সঞ্চয় সঁজুলি।"))
    A(R("What is the full form of USB?",
        "USB ৰ পূৰ্ণ ৰূপ কি?",
        [("Universal Serial Bus", "ইউনিভাৰ্ছেল ছিৰিয়েল বাছ"), ("Universal System Bus", "ইউনিভাৰ্ছেল চিষ্টেম বাছ"), ("United Serial Bus", "ইউনাইটেড ছিৰিয়েল বাছ"), ("Universal Serial Base", "ইউনিভাৰ্ছেল ছিৰিয়েল বেছ")], 0,
        "USB stands for Universal Serial Bus.",
        "USB ৰ অৰ্থ ইউনিভাৰ্ছেল ছিৰিয়েল বাছ।"))
    A(R("Which device is used to convert hard copy into a digital file?",
        "কোন সঁজুলিয়ে কাগজৰ কপিক ডিজিটেল ফাইললৈ সলনি কৰে?",
        [("Scanner", "স্কেনাৰ"), ("Printer", "প্ৰিণ্টাৰ"), ("Plotter", "প্লটাৰ"), ("Monitor", "মনিটৰ")], 0,
        "A scanner converts a hard copy into a digital file.",
        "স্কেনাৰে কাগজৰ কপিক ডিজিটেল ফাইললৈ সলনি কৰে।"))
    A(R("What is the smallest unit of data in a computer?",
        "কম্পিউটাৰত তথ্যৰ আটাইতকৈ সৰু একক কি?",
        [("Bit", "বিট"), ("Byte", "বাইট"), ("Kilobyte", "কিল'বাইট"), ("Nibble", "নিবল")], 0,
        "A bit is the smallest unit of data.",
        "বিট তথ্যৰ আটাইতকৈ সৰু একক।"))
    A(R("A single byte is made up of how many bits?",
        "কিমান বিটে এটা বাইট গঠন কৰে?",
        [("Eight", "আঠ"), ("Four", "চাৰি"), ("Sixteen", "ষোল্ল"), ("Two", "দুই")], 0,
        "Eight bits make one byte.",
        "আঠ বিটে এটা বাইট গঠন কৰে।"))
    A(R("Which of these is an example of system software?",
        "তলৰ কোনটো চিষ্টেম ছফ্টৱেৰ?",
        [("Operating system", "অপাৰেটিং চিষ্টেম"), ("Word processor", "ৱৰ্ড প্ৰচেছৰ"), ("Spreadsheet", "স্প্ৰেডশ্বীট"), ("Photo editor", "ফটো এডিটৰ")], 0,
        "An operating system is system software.",
        "অপাৰেটিং চিষ্টেম চিষ্টেম ছফ্টৱেৰ।"))
    A(R("Which of these is an example of application software?",
        "তলৰ কোনটো এপ্লিকেচন ছফ্টৱেৰ?",
        [("Web browser", "ৱেব ব্ৰাউজাৰ"), ("Windows", "ৱিণ্ড'জ"), ("Linux", "লিনাক্স"), ("Device driver", "ডিভাইচ ড্ৰাইভাৰ")], 0,
        "A web browser is application software.",
        "ৱেব ব্ৰাউজাৰ এপ্লিকেচন ছফ্টৱেৰ।"))

    # ---- Operating systems ----
    A(R("Which of these is an example of an operating system?",
        "তলৰ কোনটো অপাৰেটিং চিষ্টেম?",
        [("Linux", "লিনাক্স"), ("MS Word", "এম.এছ. ৱৰ্ড"), ("Photoshop", "ফট'শ্বপ"), ("Chrome", "ক্ৰ'ম")], 0,
        "Linux is an operating system.",
        "লিনাক্স এটা অপাৰেটিং চিষ্টেম।"))
    A(R("What does GUI stand for?",
        "GUI ৰ পূৰ্ণ ৰূপ কি?",
        [("Graphical User Interface", "গ্ৰাফিকেল ইউজাৰ ইণ্টাৰফেচ"), ("General User Interface", "জেনেৰেল ইউজাৰ ইণ্টাৰফেচ"), ("Graphical Utility Interface", "গ্ৰাফিকেল ইউটিলিটি ইণ্টাৰফেচ"), ("Global User Interface", "গ্ল'বেল ইউজাৰ ইণ্টাৰফেচ")], 0,
        "GUI stands for Graphical User Interface.",
        "GUI ৰ অৰ্থ গ্ৰাফিকেল ইউজাৰ ইণ্টাৰফেচ।"))
    A(R("Which of these is a command-line operating system interface?",
        "এইবোৰৰ কোনটো কামাণ্ড-লাইন অপাৰেটিং চিষ্টেম ইণ্টাৰফেচ?",
        [("MS-DOS", "এম.এছ.-ডছ"), ("Windows 11", "ৱিণ্ড'জ ১১"), ("Ubuntu Desktop", "উবুন্টু ডেস্কটপ"), ("macOS Finder", "মেকঅ'এছ ফাইণ্ডাৰ")], 0,
        "MS-DOS is a command-line interface.",
        "এম.এছ.-ডছ এটা কামাণ্ড-লাইন ইণ্টাৰফেচ।"))
    A(R("What is the primary function of an operating system?",
        "অপাৰেটিং চিষ্টেমৰ প্ৰধান কাৰ্য কি?",
        [("Managing hardware and software resources", "হাৰ্ডৱেৰ আৰু ছফ্টৱেৰ সম্পদ পৰিচালনা কৰা"), ("Editing photographs", "ফটোগ্ৰাফ এডিট কৰা"), ("Designing web pages", "ৱেব পেজ ডিজাইন কৰা"), ("Sending emails", "ইমেইল পঠিওৱা")], 0,
        "An operating system manages the hardware and software resources of a computer.",
        "অপাৰেটিং চিষ্টেমে কম্পিউটাৰৰ হাৰ্ডৱেৰ আৰু ছফ্টৱেৰ সম্পদ পৰিচালনা কৰে।"))
    A(R("Which key combination is commonly used to copy in Windows?",
        "ৱিণ্ড'জত কপি কৰিবলৈ সাধাৰণতে কোন কীবৰ্ড সংযোগ ব্যৱহাৰ কৰা হয়?",
        [("Ctrl + C", "Ctrl + C"), ("Ctrl + V", "Ctrl + V"), ("Ctrl + X", "Ctrl + X"), ("Ctrl + P", "Ctrl + P")], 0,
        "Ctrl + C is used to copy.",
        "কপি কৰিবলৈ Ctrl + C ব্যৱহাৰ কৰা হয়।"))
    A(R("Which key combination is used to paste in Windows?",
        "ৱিণ্ড'জত পে'ষ্ট কৰিবলৈ কোন কীবৰ্ড সংযোগ ব্যৱহাৰ কৰা হয়?",
        [("Ctrl + V", "Ctrl + V"), ("Ctrl + C", "Ctrl + C"), ("Ctrl + Z", "Ctrl + Z"), ("Ctrl + S", "Ctrl + S")], 0,
        "Ctrl + V is used to paste.",
        "পে'ষ্ট কৰিবলৈ Ctrl + V ব্যৱহাৰ কৰা হয়।"))
    A(R("What does the Ctrl + Z shortcut usually do?",
        "Ctrl + Z সংযোগে সাধাৰণতে কি কৰে?",
        [("Undo the last action", "শেষ কাৰ্য বাতিল কৰে"), ("Redo an action", "কাৰ্য পুনৰ কৰে"), ("Save the file", "ফাইল সঞ্চয় কৰে"), ("Close the window", "ৱিণ্ড' বন্ধ কৰে")], 0,
        "Ctrl + Z undoes the last action.",
        "Ctrl + Z য়ে শেষ কাৰ্য বাতিল কৰে।"))
    A(R("Which file extension indicates a text document in Word?",
        "কোন ফাইল এক্সটেনচনে ৱৰ্ডৰ লিখনী দস্তাবেজ সূচায়?",
        [(".docx", ".docx"), (".xlsx", ".xlsx"), (".pptx", ".pptx"), (".mp3", ".mp3")], 0,
        ".docx is the Word document extension.",
        ".docx ৱৰ্ড দস্তাবেজৰ এক্সটেনচন।"))
    A(R("Which file extension is used for a spreadsheet file?",
        "স্প্ৰেডশ্বীট ফাইলৰ বাবে কোন ফাইল এক্সটেনচন ব্যৱহাৰ হয়?",
        [(".xlsx", ".xlsx"), (".docx", ".docx"), (".txt", ".txt"), (".jpg", ".jpg")], 0,
        ".xlsx is the Excel spreadsheet extension.",
        ".xlsx এক্সেল স্প্ৰেডশ্বীটৰ এক্সটেনচন।"))
    A(R("Which file extension indicates a presentation file?",
        "কোন ফাইল এক্সটেনচনে প্ৰেজেণ্টেচন ফাইল সূচায়?",
        [(".pptx", ".pptx"), (".docx", ".docx"), (".xlsx", ".xlsx"), (".pdf", ".pdf")], 0,
        ".pptx is the PowerPoint presentation extension.",
        ".pptx পাওৱাৰপইণ্ট প্ৰেজেণ্টেচনৰ এক্সটেনচন।"))

    # ---- MS Office ----
    A(R("In MS Word, which shortcut is used to save a document?",
        "এম.এছ. ৱৰ্ডত দস্তাবেজ সঞ্চয় কৰিবলৈ কোন চৰ্টকাট ব্যৱহাৰ হয়?",
        [("Ctrl + S", "Ctrl + S"), ("Ctrl + P", "Ctrl + P"), ("Ctrl + O", "Ctrl + O"), ("Ctrl + N", "Ctrl + N")], 0,
        "Ctrl + S saves the document.",
        "Ctrl + S য়ে দস্তাবেজ সঞ্চয় কৰে।"))
    A(R("In MS Word, what does Ctrl + P do?",
        "এম.এছ. ৱৰ্ডত Ctrl + P য়ে কি কৰে?",
        [("Opens the print dialog", "প্ৰিণ্ট ডায়লগ খোলে"), ("Saves the file", "ফাইল সঞ্চয় কৰে"), ("Pastes text", "লিখনী পে'ষ্ট কৰে"), ("Closes the file", "ফাইল বন্ধ কৰে")], 0,
        "Ctrl + P opens the print dialog.",
        "Ctrl + P য়ে প্ৰিণ্ট ডায়লগ খোলে।"))
    A(R("In MS Excel, which function adds a range of numbers?",
        "এম.এছ. এক্সেলত কোন ফলনে সংখ্যাৰ পৰিসৰ যোগ কৰে?",
        [("SUM", "SUM"), ("COUNT", "COUNT"), ("AVERAGE", "AVERAGE"), ("MAX", "MAX")], 0,
        "The SUM function adds a range of numbers.",
        "SUM ফলনে সংখ্যাৰ পৰিসৰ যোগ কৰে।"))
    A(R("In MS Excel, which function finds the average of a range?",
        "এম.এছ. এক্সেলত কোন ফলনে এটা পৰিসৰৰ গড় নিৰ্ণয় কৰে?",
        [("AVERAGE", "AVERAGE"), ("SUM", "SUM"), ("MIN", "MIN"), ("TOTAL", "TOTAL")], 0,
        "The AVERAGE function returns the mean of a range.",
        "AVERAGE ফলনে পৰিসৰৰ গড় ঘূৰাই দিয়ে।"))
    A(R("In MS Excel, what is a cell reference like A1 called?",
        "এম.এছ. এক্সেলত A1 ৰ দৰে এটা চেল সন্দৰ্ভক কি বোলা হয়?",
        [("Relative reference", "সম্বন্ধীয় সন্দৰ্ভ"), ("Absolute name", "চিৰস্থায়ী নাম"), ("Named range", "নামাকৰণ পৰিসৰ"), ("Formula bar", "ফৰ্মুলা বাৰ")], 0,
        "A1 is a relative reference by default.",
        "A1 সাধাৰণতে এটা সম্বন্ধীয় সন্দৰ্ভ।"))
    A(R("In MS PowerPoint, what is a single page of a presentation called?",
        "এম.এছ. পাওৱাৰপইণ্টত প্ৰেজেণ্টেচনৰ এটা পৃষ্ঠাক কি বোলা হয়?",
        [("Slide", "স্লাইড"), ("Sheet", "শ্বীট"), ("Page", "পৃষ্ঠা"), ("Frame", "ফ্ৰেম")], 0,
        "A single page of a presentation is called a slide.",
        "প্ৰেজেণ্টেচনৰ এটা পৃষ্ঠাক স্লাইড বোলা হয়।"))
    A(R("Which software is used for creating spreadsheets?",
        "স্প্ৰেডশ্বীট তৈয়াৰ কৰিবলৈ কোন ছফ্টৱেৰ ব্যৱহাৰ কৰা হয়?",
        [("MS Excel", "এম.এছ. এক্সেল"), ("MS Word", "এম.এছ. ৱৰ্ড"), ("MS Paint", "এম.এছ. পেইণ্ট"), ("MS Access", "এম.এছ. এক্সেছ")], 0,
        "MS Excel is used for creating spreadsheets.",
        "এম.এছ. এক্সেল স্প্ৰেডশ্বীট তৈয়াৰ কৰিবলৈ ব্যৱহাৰ কৰা হয়।"))
    A(R("Which software is a database management system?",
        "কোন ছফ্টৱেৰ এটা ডাটাবেছ মেনেজমেণ্ট চিষ্টেম?",
        [("MS Access", "এম.এছ. এক্সেছ"), ("MS Word", "এম.এছ. ৱৰ্ড"), ("MS Excel", "এম.এছ. এক্সেল"), ("MS Paint", "এম.এছ. পেইণ্ট")], 0,
        "MS Access is a database management system.",
        "এম.এছ. এক্সেছ এটা ডাটাবেছ মেনেজমেণ্ট চিষ্টেম।"))
    A(R("In MS Word, which feature checks spelling and grammar?",
        "এম.এছ. ৱৰ্ডত কোন বৈশিষ্ট্যই বানান আৰু ব্যাকৰণ পৰীক্ষা কৰে?",
        [("Spelling and Grammar check", "বানান আৰু ব্যাকৰণ পৰীক্ষা"), ("Mail merge", "মেইল মাৰ্জ"), ("Track changes", "পৰিৱৰ্তন ট্ৰেক"), ("Word count", "শব্দ গণনা")], 0,
        "The Spelling and Grammar check verifies spelling and grammar.",
        "বানান আৰু ব্যাকৰণ পৰীক্ষাই বানান আৰু ব্যাকৰণ পৰীক্ষা কৰে।"))

    # ---- Networking & internet ----
    A(R("What does WWW stand for?",
        "WWW ৰ পূৰ্ণ ৰূপ কি?",
        [("World Wide Web", "ৱৰ্ল্ড ৱাইড ৱেব"), ("World Web Wide", "ৱৰ্ল্ড ৱেব ৱাইড"), ("Wide World Web", "ৱাইড ৱৰ্ল্ড ৱেব"), ("Web World Wide", "ৱেব ৱৰ্ল্ড ৱাইড")], 0,
        "WWW stands for World Wide Web.",
        "WWW ৰ অৰ্থ ৱৰ্ল্ড ৱাইড ৱেব।"))
    A(R("Which protocol is used to transfer web pages?",
        "ৱেব পেজ স্থানান্তৰ কৰিবলৈ কোন প্ৰট'কল ব্যৱহাৰ কৰা হয়?",
        [("HTTP", "HTTP"), ("FTP", "FTP"), ("SMTP", "SMTP"), ("POP3", "POP3")], 0,
        "HTTP is used to transfer web pages.",
        "ৱেব পেজ স্থানান্তৰ কৰিবলৈ HTTP ব্যৱহাৰ কৰা হয়।"))
    A(R("Which protocol is used for sending email?",
        "ইমেইল পঠিওৱাৰ বাবে কোন প্ৰট'কল ব্যৱহাৰ কৰা হয়?",
        [("SMTP", "SMTP"), ("HTTP", "HTTP"), ("FTP", "FTP"), ("SNMP", "SNMP")], 0,
        "SMTP is used for sending email.",
        "ইমেইল পঠিওৱাৰ বাবে SMTP ব্যৱহাৰ কৰা হয়।"))
    A(R("What does IP stand for in networking?",
        "নেটৱৰ্কিঙত IP ৰ পূৰ্ণ ৰূপ কি?",
        [("Internet Protocol", "ইণ্টাৰনেট প্ৰট'কল"), ("Internal Protocol", "ইণ্টাৰ্নেল প্ৰট'কল"), ("Internet Provider", "ইণ্টাৰনেট প্ৰ'ভাইডাৰ"), ("Information Protocol", "ইনফৰ্মেচন প্ৰট'কল")], 0,
        "IP stands for Internet Protocol.",
        "IP ৰ অৰ্থ ইণ্টাৰনেট প্ৰট'কল।"))
    A(R("Which of these is an example of a web browser?",
        "তলৰ কোনটো এটা ৱেব ব্ৰাউজাৰ?",
        [("Google Chrome", "গুগল ক্ৰ'ম"), ("Windows 11", "ৱিণ্ড'জ ১১"), ("MS Excel", "এম.এছ. এক্সেল"), ("Adobe Reader", "এড'বি ৰিডাৰ")], 0,
        "Google Chrome is a web browser.",
        "গুগল ক্ৰ'ম এটা ৱেব ব্ৰাউজাৰ।"))
    A(R("What is a URL?",
        "URL কি?",
        [("The address of a resource on the web", "ৱেবত এটা সম্পদৰ ঠিকনা"), ("A type of computer virus", "এবিধ কম্পিউটাৰ ভাইৰাছ"), ("A programming language", "এটা প্ৰ'গ্ৰামিং ভাষা"), ("A storage device", "এটা সঞ্চয় সঁজুলি")], 0,
        "A URL is the address of a resource on the web.",
        "URL ৱেবত এটা সম্পদৰ ঠিকনা।"))
    A(R("Which device connects a local network to the internet?",
        "কোন সঁজুলিয়ে স্থানীয় নেটৱৰ্কক ইণ্টাৰনেটৰ সৈতে সংযোগ কৰে?",
        [("Router", "ৰাউটাৰ"), ("Printer", "প্ৰিণ্টাৰ"), ("Scanner", "স্কেনাৰ"), ("Monitor", "মনিটৰ")], 0,
        "A router connects a local network to the internet.",
        "ৰাউটাৰে স্থানীয় নেটৱৰ্কক ইণ্টাৰনেটৰ সৈতে সংযোগ কৰে।"))
    A(R("What does LAN stand for?",
        "LAN ৰ পূৰ্ণ ৰূপ কি?",
        [("Local Area Network", "ল'কেল এৰিয়া নেটৱৰ্ক"), ("Long Area Network", "লং এৰিয়া নেটৱৰ্ক"), ("Large Area Network", "লাৰ্জ এৰিয়া নেটৱৰ্ক"), ("Local Access Network", "ল'কেল এক্সেছ নেটৱৰ্ক")], 0,
        "LAN stands for Local Area Network.",
        "LAN ৰ অৰ্থ ল'কেল এৰিয়া নেটৱৰ্ক।"))
    A(R("Which of these is an example of cloud storage?",
        "এইবোৰৰ কোনটো ক্লাউড সঞ্চয়ৰ উদাহৰণ?",
        [("Google Drive", "গুগল ড্ৰাইভ"), ("Notepad", "ন'টপেড"), ("Calculator", "কেলকুলেটৰ"), ("Paint", "পেইণ্ট")], 0,
        "Google Drive is an example of cloud storage.",
        "গুগল ড্ৰাইভ ক্লাউড সঞ্চয়ৰ এটা উদাহৰণ।"))
    A(R("What is the full form of FTP?",
        "FTP ৰ পূৰ্ণ ৰূপ কি?",
        [("File Transfer Protocol", "ফাইল ট্ৰেন্সফাৰ প্ৰট'কল"), ("File Test Protocol", "ফাইল টেষ্ট প্ৰট'কল"), ("Fast Transfer Protocol", "ফাষ্ট ট্ৰেন্সফাৰ প্ৰট'কল"), ("Folder Transfer Protocol", "ফল্ডাৰ ট্ৰেন্সফাৰ প্ৰট'কল")], 0,
        "FTP stands for File Transfer Protocol.",
        "FTP ৰ অৰ্থ ফাইল ট্ৰেন্সফাৰ প্ৰট'কল।"))

    # ---- Cyber security & shortcuts ----
    A(R("What is a computer virus?",
        "কম্পিউটাৰ ভাইৰাছ কি?",
        [("A malicious program that damages data", "তথ্য নষ্ট কৰা এটা ক্ষতিকাৰক প্ৰ'গ্ৰাম"), ("A hardware component", "এটা হাৰ্ডৱেৰ অংশ"), ("A type of printer", "এবিধ প্ৰিণ্টাৰ"), ("An internet browser", "এটা ইণ্টাৰনেট ব্ৰাউজাৰ")], 0,
        "A computer virus is a malicious program that damages data.",
        "কম্পিউটাৰ ভাইৰাছ তথ্য নষ্ট কৰা এটা ক্ষতিকাৰক প্ৰ'গ্ৰাম।"))
    A(R("Which of the following is a strong password practice?",
        "তলৰ কোনটো শক্তিশালী পাছৱৰ্ডৰ অভ্যাস?",
        [("Using a mix of letters, digits and symbols", "আখৰ, অংক আৰু চিহ্ন মিহলাই ব্যৱহাৰ কৰা"), ("Using your birth date", "জন্ম তাৰিখ ব্যৱহাৰ কৰা"), ("Using '12345'", "'12345' ব্যৱহাৰ কৰা"), ("Sharing it with friends", "বন্ধুবৰ্গৰ সৈতে ভাগ কৰা")], 0,
        "A strong password mixes letters, digits and symbols.",
        "শক্তিশালী পাছৱৰ্ডে আখৰ, অংক আৰু চিহ্ন মিহলায়।"))
    A(R("What is phishing?",
        "ফিছিং কি?",
        [("Tricking users into revealing personal information", "ব্যক্তিগত তথ্য প্ৰকাশ কৰাবলৈ ব্যৱহাৰকাৰীক ঠগাই দিয়া"), ("Installing an antivirus", "এণ্টিভাইৰাছ ইনষ্টল কৰা"), ("Sending a valid email", "বৈধ ইমেইল পঠিওৱা"), ("Scanning a document", "দস্তাবেজ স্কেন কৰা")], 0,
        "Phishing tricks users into revealing personal information.",
        "ফিছিঙে ব্যক্তিগত তথ্য প্ৰকাশ কৰাবলৈ ব্যৱহাৰকাৰীক ঠগায়।"))
    A(R("Which shortcut is used to refresh a web page?",
        "ৱেব পেজ ৰিফ্ৰেছ কৰিবলৈ কোন চৰ্টকাট ব্যৱহাৰ হয়?",
        [("F5", "F5"), ("F1", "F1"), ("F2", "F2"), ("F3", "F3")], 0,
        "F5 refreshes a web page.",
        "F5 য়ে ৱেব পেজ ৰিফ্ৰেছ কৰে।"))
    A(R("Which shortcut key opens the Help menu in many applications?",
        "অনেক এপ্লিকেচনত কোন চৰ্টকাট কীয়ে সহায়িকা মেনু খোলে?",
        [("F1", "F1"), ("F5", "F5"), ("F10", "F10"), ("F12", "F12")], 0,
        "F1 usually opens the Help menu.",
        "F1 য়ে সাধাৰণতে সহায়িকা মেনু খোলে।"))
    A(R("Which of the following is an example of an operating system for mobile devices?",
        "তলৰ কোনটো ম'বাইল সঁজুলিৰ বাবে অপাৰেটিং চিষ্টেমৰ উদাহৰণ?",
        [("Android", "এণ্ড্ৰয়ড"), ("MS Word", "এম.এছ. ৱৰ্ড"), ("MS Excel", "এম.এছ. এক্সেল"), ("Photoshop", "ফট'শ্বপ")], 0,
        "Android is a mobile operating system.",
        "এণ্ড্ৰয়ড এটা ম'বাইল অপাৰেটিং চিষ্টেম।"))
    A(R("What does a firewall do?",
        "ফায়াৰৱালে কি কৰে?",
        [("Monitors and controls incoming and outgoing network traffic", "আগমন আৰু প্ৰস্থান কৰা নেটৱৰ্ক ট্ৰেফিক নিৰীক্ষণ আৰু নিয়ন্ত্ৰণ কৰে"), ("Prints documents", "দস্তাবেজ প্ৰিণ্ট কৰে"), ("Stores files permanently", "ফাইল স্থায়ীভাৱে সঞ্চয় কৰে"), ("Increases screen brightness", "পৰ্দাৰ উজ্জ্বলতা বঢ়ায়")], 0,
        "A firewall monitors and controls network traffic.",
        "ফায়াৰৱালে নেটৱৰ্ক ট্ৰেফিক নিৰীক্ষণ আৰু নিয়ন্ত্ৰণ কৰে।"))
    A(R("Which key is used to delete the character to the left of the cursor?",
        "কাৰ্ছৰৰ বাওঁফালৰ আখৰ মচিবলৈ কোন কীয়ে ব্যৱহাৰ কৰা হয়?",
        [("Backspace", "বেকস্পেছ"), ("Delete", "ডিলিট"), ("Enter", "এণ্টাৰ"), ("Shift", "শ্বিফ্ট")], 0,
        "Backspace deletes the character to the left of the cursor.",
        "বেকস্পেছে কাৰ্ছৰৰ বাওঁফালৰ আখৰ মচে।"))
    A(R("Which key is used to create a new line while typing?",
        "টাইপ কৰাৰ সময়ত নতুন শাৰী সৃষ্টি কৰিবলৈ কোন কীয়ে ব্যৱহাৰ কৰা হয়?",
        [("Enter", "এণ্টাৰ"), ("Tab", "টেব"), ("Esc", "এস্কেপ"), ("Ctrl", "কণ্ট্ৰ'ল")], 0,
        "The Enter key creates a new line.",
        "এণ্টাৰ কীয়ে নতুন শাৰী সৃষ্টি কৰে।"))
    A(R("What is the full form of PDF?",
        "PDF ৰ পূৰ্ণ ৰূপ কি?",
        [("Portable Document Format", "প'ৰ্টেবল ডকুমেণ্ট ফৰ্মেট"), ("Personal Data File", "পাৰ্চনেল ডাটা ফাইল"), ("Printed Document File", "প্ৰিণ্টেড ডকুমেণ্ট ফাইল"), ("Public Document Format", "পাব্লিক ডকুমেণ্ট ফৰ্মেট")], 0,
        "PDF stands for Portable Document Format.",
        "PDF ৰ অৰ্থ প'ৰ্টেবল ডকুমেণ্ট ফৰ্মেট।"))
    A(R("Which one of these is an example of an email service?",
        "এইবোৰৰ কোনটো ইমেইল সেৱাৰ উদাহৰণ?",
        [("Gmail", "জিমেইল"), ("Google Docs", "গুগল ডকছ"), ("Google Maps", "গুগল মেপছ"), ("Google Photos", "গুগল ফটছ")], 0,
        "Gmail is an email service.",
        "জিমেইল এটা ইমেইল সেৱা।"))
    A(R("What does an antivirus program do?",
        "এণ্টিভাইৰাছ প্ৰ'গ্ৰামে কি কৰে?",
        [("Detects and removes malicious software", "ক্ষতিকাৰক ছফ্টৱেৰ চিনাক্ত আৰু আঁতৰ কৰে"), ("Increases internet speed", "ইণ্টাৰনেট গতি বঢ়ায়"), ("Edits photographs", "ফটোগ্ৰাফ এডিট কৰে"), ("Plays music", "সংগীত বজায়")], 0,
        "An antivirus program detects and removes malicious software.",
        "এণ্টিভাইৰাছ প্ৰ'গ্ৰামে ক্ষতিকাৰক ছফ্টৱেৰ চিনাক্ত আৰু আঁতৰ কৰে।"))

    # ---- Misc & digital awareness ----
    A(R("What is the full form of ICT?",
        "ICT ৰ পূৰ্ণ ৰূপ কি?",
        [("Information and Communication Technology", "ইনফৰ্মেচন এণ্ড কমিউনিকেচন টেকন'লজি"), ("Internet and Computer Technology", "ইণ্টাৰনেট এণ্ড কম্পিউটাৰ টেকন'লজি"), ("Information and Computer Training", "ইনফৰ্মেচন এণ্ড কম্পিউটাৰ ট্ৰেইনিং"), ("Integrated Communication Tool", "ইণ্টিগ্ৰেটেড কমিউনিকেচন টুল")], 0,
        "ICT stands for Information and Communication Technology.",
        "ICT ৰ অৰ্থ ইনফৰ্মেচন এণ্ড কমিউনিকেচন টেকন'লজি।"))
    A(R("Which of the following is used to store data permanently inside a computer?",
        "কম্পিউটাৰৰ ভিতৰত তথ্য স্থায়ীভাৱে সঞ্চয় কৰিবলৈ তলৰ কোনটো ব্যৱহাৰ কৰা হয়?",
        [("Hard disk", "হাৰ্ড ডিস্ক"), ("RAM", "ৰেম"), ("Cache", "কেশ"), ("Register", "ৰেজিষ্টাৰ")], 0,
        "A hard disk stores data permanently.",
        "হাৰ্ড ডিস্কে তথ্য স্থায়ীভাৱে সঞ্চয় কৰে।"))
    A(R("What does e-governance refer to?",
        "ই-গভাৰ্নেন্সে কি সূচায়?",
        [("Use of information technology in government services", "চৰকাৰী সেৱাত তথ্য প্ৰযুক্তিৰ ব্যৱহাৰ"), ("Online shopping", "অনলাইন ক্ৰয়"), ("Online gaming", "অনলাইন খেল"), ("Digital photography", "ডিজিটেল ফটোগ্ৰাফী")], 0,
        "E-governance refers to the use of information technology in government services.",
        "ই-গভাৰ্নেন্সে চৰকাৰী সেৱাত তথ্য প্ৰযুক্তিৰ ব্যৱহাৰ সূচায়।"))
    A(R("What is the purpose of a QR code?",
        "QR কোডৰ উদ্দেশ্য কি?",
        [("To store information that can be scanned", "স্কেন কৰিব পৰা তথ্য সঞ্চয় কৰা"), ("To increase battery life", "বেটাৰী জীৱন বঢ়োৱা"), ("To cool the processor", "প্ৰচেছৰ ঠাণ্ডা কৰা"), ("To print documents", "দস্তাবেজ প্ৰিণ্ট কৰা")], 0,
        "A QR code stores information that can be scanned.",
        "QR কোডে স্কেন কৰিব পৰা তথ্য সঞ্চয় কৰে।"))
    A(R("Which of the following is an example of digital payment?",
        "তলৰ কোনটো ডিজিটেল পেমেণ্টৰ উদাহৰণ?",
        [("UPI transfer", "UPI স্থানান্তৰ"), ("Cash payment", "নগদ পৰিশোধ"), ("Cheque payment", "চেক পৰিশোধ"), ("Barter exchange", "বিনিময়")], 0,
        "A UPI transfer is an example of digital payment.",
        "UPI স্থানান্তৰ ডিজিটেল পেমেণ্টৰ এটা উদাহৰণ।"))
    A(R("What is a spreadsheet primarily used for?",
        "স্প্ৰেডশ্বীট প্ৰধানকৈ কিৰ বাবে ব্যৱহাৰ কৰা হয়?",
        [("Organising and calculating data", "তথ্য সজোৱা আৰু গণনা কৰা"), ("Editing videos", "ভিডিঅ' এডিট কৰা"), ("Composing music", "সংগীত ৰচনা কৰা"), ("Designing buildings", "অট্টালিকা ডিজাইন কৰা")], 0,
        "A spreadsheet is primarily used to organise and calculate data.",
        "স্প্ৰেডশ্বীট প্ৰধানকৈ তথ্য সজোৱা আৰু গণনা কৰিবলৈ ব্যৱহাৰ কৰা হয়।"))
    A(R("Which one is a binary number?",
        "কোনটো এটা দ্বি-আধাৰ সংখ্যা?",
        [("1011", "1011"), ("1298", "1298"), ("A1B2", "A1B2"), ("XYZ", "XYZ")], 0,
        "1011 uses only the digits 0 and 1, so it is a binary number.",
        "1011 য়ে কেৱল ০ আৰু ১ অংক ব্যৱহাৰ কৰে, সেয়ে ই দ্বি-আধাৰ সংখ্যা।"))
    A(R("What does a file name extension usually indicate?",
        "ফাইল নামৰ এক্সটেনচনে সাধাৰণতে কি সূচায়?",
        [("The type of the file", "ফাইলৰ প্ৰকাৰ"), ("The file's size", "ফাইলৰ আকাৰ"), ("The file's author", "ফাইলৰ লেখক"), ("The file's location", "ফাইলৰ অৱস্থান")], 0,
        "A file name extension indicates the type of the file.",
        "ফাইল নামৰ এক্সটেনচনে ফাইলৰ প্ৰকাৰ সূচায়।"))
    A(R("What is the primary use of a printer?",
        "প্ৰিণ্টাৰৰ প্ৰধান ব্যৱহাৰ কি?",
        [("To produce a hard copy of a document", "দস্তাবেজৰ কাগজৰ কপি উৎপাদন কৰা"), ("To scan images", "ছবি স্কেন কৰা"), ("To store files", "ফাইল সঞ্চয় কৰা"), ("To connect to the internet", "ইণ্টাৰনেটৰ সৈতে সংযোগ কৰা")], 0,
        "A printer produces a hard copy of a document.",
        "প্ৰিণ্টাৰে দস্তাবেজৰ কাগজৰ কপি উৎপাদন কৰে।"))
    A(R("Which of the following best describes software?",
        "তলৰ কোনটোৱে ছফ্টৱেৰক সৰ্বোত্তমভাৱে বৰ্ণনা কৰে?",
        [("A set of instructions that tells a computer what to do", "কম্পিউটাৰক কি কৰিব লাগে কোৱা নিৰ্দেশনাৰ সংহতি"), ("The physical parts of a computer", "কম্পিউটাৰৰ ভৌতিক অংশ"), ("A type of cable", "এবিধ কেবল"), ("A storage medium", "এটা সঞ্চয় মাধ্যম")], 0,
        "Software is a set of instructions that tells a computer what to do.",
        "ছফ্টৱেৰ হ'ল কম্পিউটাৰক কি কৰিব লাগে কোৱা নিৰ্দেশনাৰ সংহতি।"))
    A(R("Which of these is an example of a spreadsheet formula?",
        "এইবোৰৰ কোনটো স্প্ৰেডশ্বীট ফৰ্মুলাৰ উদাহৰণ?",
        [("=A1+B1", "=A1+B1"), ("@A1+B1", "@A1+B1"), ("#A1+B1", "#A1+B1"), ("&A1+B1", "&A1+B1")], 0,
        "A spreadsheet formula begins with an equals sign, as in =A1+B1.",
        "স্প্ৰেডশ্বীট ফৰ্মুলা সমান চিহ্নৰে আৰম্ভ হয়, যেনে =A1+B1।"))

    return r
