"""Technical-science / Physics - 130 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Units & measurement ----
    A(R("Which of the following is the SI unit of length?",
        "তলৰ কোনটো দীঘৰ SI একক?",
        [("Metre", "মিটাৰ"), ("Centimetre", "চেণ্টিমিটাৰ"), ("Kilometre", "কিল'মিটাৰ"), ("Foot", "ফুট")], 0,
        "The SI unit of length is the metre.",
        "দীঘৰ SI একক হৈছে মিটাৰ।"))
    A(R("Which of the following is the SI unit of mass?",
        "তলৰ কোনটো ভৰৰ SI একক?",
        [("Kilogram", "কিল'গ্ৰাম"), ("Gram", "গ্ৰাম"), ("Newton", "নিউটন"), ("Pound", "পাউণ্ড")], 0,
        "The SI unit of mass is the kilogram.",
        "ভৰৰ SI একক হৈছে কিল'গ্ৰাম।"))
    A(R("Which of the following is the SI unit of time?",
        "তলৰ কোনটো সময়ৰ SI একক?",
        [("Second", "ছেকেণ্ড"), ("Minute", "মিনিট"), ("Hour", "ঘণ্টা"), ("Day", "দিন")], 0,
        "The SI unit of time is the second.",
        "সময়ৰ SI একক হৈছে ছেকেণ্ড।"))
    A(R("Which of the following is the SI unit of temperature?",
        "তলৰ কোনটো উষ্ণতাৰ SI একক?",
        [("Kelvin", "কেলভিন"), ("Celsius", "চেলছিয়াছ"), ("Fahrenheit", "ফাৰেনহাইট"), ("Joule", "জুল")], 0,
        "The SI unit of temperature is the kelvin.",
        "উষ্ণতাৰ SI একক হৈছে কেলভিন।"))
    A(R("Which of the following is the SI unit of force?",
        "তলৰ কোনটো বলৰ SI একক?",
        [("Newton", "নিউটন"), ("Joule", "জুল"), ("Watt", "ৱাট"), ("Pascal", "পাস্কেল")], 0,
        "The SI unit of force is the newton.",
        "বলৰ SI একক হৈছে নিউটন।"))
    A(R("Which of the following is the SI unit of work?",
        "তলৰ কোনটো কাৰ্যৰ SI একক?",
        [("Joule", "জুল"), ("Newton", "নিউটন"), ("Watt", "ৱাট"), ("Pascal", "পাস্কেল")], 0,
        "The SI unit of work is the joule.",
        "কাৰ্যৰ SI একক হৈছে জুল।"))
    A(R("Which of the following is the SI unit of power?",
        "তলৰ কোনটো ক্ষমতাৰ SI একক?",
        [("Watt", "ৱাট"), ("Joule", "জুল"), ("Newton", "নিউটন"), ("Ampere", "এম্পিয়াৰ")], 0,
        "The SI unit of power is the watt.",
        "ক্ষমতাৰ SI একক হৈছে ৱাট।"))

    # ---- Motion ----
    A(R("The rate of change of displacement is called?",
        "সৰণৰ পৰিৱৰ্তনৰ হাৰক কি বোলা হয়?",
        [("Velocity", "বেগ"), ("Speed", "দ্ৰুতি"), ("Acceleration", "ত্বৰণ"), ("Momentum", "ভৰবেগ")], 0,
        "Velocity is the rate of change of displacement.",
        "বেগ হৈছে সৰণৰ পৰিৱৰ্তনৰ হাৰ।"))
    A(R("The rate of change of velocity is called?",
        "বেগৰ পৰিৱৰ্তনৰ হাৰক কি বোলা হয়?",
        [("Acceleration", "ত্বৰণ"), ("Speed", "দ্ৰুতি"), ("Momentum", "ভৰবেগ"), ("Force", "বল")], 0,
        "Acceleration is the rate of change of velocity.",
        "ত্বৰণ হৈছে বেগৰ পৰিৱৰ্তনৰ হাৰ।"))
    A(R("The acceleration due to gravity on Earth is approximately?",
        "পৃথিৱীত মাধ্যাকৰ্ষণ ত্বৰণ প্ৰায় কিমান?",
        [("9.8 m/s²", "৯.৮ মি/ছে²"), ("6.7 m/s²", "৬.৭ মি/ছে²"), ("3.8 m/s²", "৩.৮ মি/ছে²"), ("12 m/s²", "১২ মি/ছে²")], 0,
        "The acceleration due to gravity is about 9.8 m/s².",
        "মাধ্যাকৰ্ষণ ত্বৰণ প্ৰায় ৯.৮ মি/ছে²।"))
    A(R("The first equation of motion relates velocity, acceleration and?",
        "গতিৰ প্ৰথম সমীকৰণে বেগ, ত্বৰণ আৰু কিৰ মাজৰ সম্পৰ্ক দিয়ে?",
        [("Time", "সময়"), ("Distance", "দূৰত্ব"), ("Force", "বল"), ("Mass", "ভৰ")], 0,
        "The first equation of motion is v = u + at, relating velocity, acceleration and time.",
        "গতিৰ প্ৰথম সমীকৰণ v = u + at, যি বেগ, ত্বৰণ আৰু সময়ৰ সম্পৰ্ক দিয়ে।"))
    A(R("The slope of a distance-time graph gives?",
        "দূৰত্ব-সময় লেখৰ ঢালে কি দিয়ে?",
        [("Speed", "দ্ৰুতি"), ("Acceleration", "ত্বৰণ"), ("Force", "বল"), ("Momentum", "ভৰবেগ")], 0,
        "The slope of a distance-time graph gives speed.",
        "দূৰত্ব-সময় লেখৰ ঢালে দ্ৰুতি দিয়ে।"))
    A(R("The area under a velocity-time graph gives?",
        "বেগ-সময় লেখৰ তলৰ কালি কি দিয়ে?",
        [("Displacement", "সৰণ"), ("Acceleration", "ত্বৰণ"), ("Speed", "দ্ৰুতি"), ("Force", "বল")], 0,
        "The area under a velocity-time graph gives displacement.",
        "বেগ-সময় লেখৰ তলৰ কালিয়ে সৰণ দিয়ে।"))
    A(R("A body moving in a circular path with constant speed has?",
        "স্থিৰ দ্ৰুতিৰে বৃত্তীয় পথত ঘূৰি থকা বস্তুৰ কি থাকে?",
        [("Changing velocity", "পৰিৱৰ্তনশীল বেগ"), ("Zero acceleration", "শূন্য ত্বৰণ"), ("Constant velocity", "স্থিৰ বেগ"), ("Zero speed", "শূন্য দ্ৰুতি")], 0,
        "Velocity changes because direction changes, so acceleration is non-zero.",
        "দিশ সলনি হোৱাৰ বাবে বেগ সলনি হয়, সেয়ে ত্বৰণ শূন্য নহয়।"))

    # ---- Force & laws of motion ----
    A(R("Newton's first law of motion is also known as the law of?",
        "নিউটনৰ গতিৰ প্ৰথম বিধিক কিৰ বিধি বুলিও জনা যায়?",
        [("Inertia", "জড়তা"), ("Momentum", "ভৰবেগ"), ("Gravitation", "মাধ্যাকৰ্ষণ"), ("Acceleration", "ত্বৰণ")], 0,
        "Newton's first law is called the law of inertia.",
        "নিউটনৰ প্ৰথম বিধিক জড়তাৰ বিধি বোলা হয়।"))
    A(R("The inertia of a body depends on its?",
        "বস্তুৰ জড়তা কিৰ ওপৰত নিৰ্ভৰ কৰে?",
        [("Mass", "ভৰ"), ("Velocity", "বেগ"), ("Colour", "ৰং"), ("Shape", "আকৃতি")], 0,
        "Inertia depends on mass.",
        "জড়তা ভৰৰ ওপৰত নিৰ্ভৰ কৰে।"))
    A(R("Newton's second law of motion gives the relation between force, mass and?",
        "নিউটনৰ গতিৰ দ্বিতীয় বিধিয়ে বল, ভৰ আৰু কিৰ সম্পৰ্ক দিয়ে?",
        [("Acceleration", "ত্বৰণ"), ("Time", "সময়"), ("Distance", "দূৰত্ব"), ("Work", "কাৰ্য")], 0,
        "Force equals mass times acceleration.",
        "বল ভৰ আৰু ত্বৰণৰ গুণফলৰ সমান।"))
    A(R("Newton's third law states that every action has an equal and opposite?",
        "নিউটনৰ তৃতীয় বিধি অনুসৰি প্ৰতিটো ক্ৰিয়াৰ সমান আৰু বিপৰীত কি থাকে?",
        [("Reaction", "প্ৰতিক্ৰিয়া"), ("Force", "বল"), ("Motion", "গতি"), ("Energy", "শক্তি")], 0,
        "For every action there is an equal and opposite reaction.",
        "প্ৰতিটো ক্ৰিয়াৰ সমান আৰু বিপৰীত প্ৰতিক্ৰিয়া থাকে।"))
    A(R("The product of mass and velocity is called?",
        "ভৰ আৰু বেগৰ গুণফলক কি বোলা হয়?",
        [("Momentum", "ভৰবেগ"), ("Force", "বল"), ("Energy", "শক্তি"), ("Power", "ক্ষমতা")], 0,
        "Momentum is the product of mass and velocity.",
        "ভৰবেগ হৈছে ভৰ আৰু বেগৰ গুণফল।"))
    A(R("The momentum of a body at rest is?",
        "বিশ্ৰামত থকা বস্তুৰ ভৰবেগ কিমান?",
        [("Zero", "শূন্য"), ("Maximum", "সৰ্বাধিক"), ("Equal to mass", "ভৰৰ সমান"), ("Infinite", "অসীম")], 0,
        "At rest, velocity is zero, so momentum is zero.",
        "বিশ্ৰামত বেগ শূন্য, সেয়ে ভৰবেগও শূন্য।"))

    # ---- Gravitation & pressure ----
    A(R("The force of attraction between two bodies is given by?",
        "দুটা বস্তুৰ মাজৰ আকৰ্ষণ বল কিৰ দ্বাৰা দিয়া হয়?",
        [("Newton's law of gravitation", "নিউটনৰ মাধ্যাকৰ্ষণ বিধি"), ("Ohm's law", "ও'মৰ বিধি"), ("Boyle's law", "বয়লৰ বিধি"), ("Pascal's law", "পাস্কেলৰ বিধি")], 0,
        "Newton's law of gravitation gives the force between two masses.",
        "নিউটনৰ মাধ্যাকৰ্ষণ বিধিয়ে দুটা ভৰৰ মাজৰ বল দিয়ে।"))
    A(R("Which of the following is the SI unit of pressure?",
        "তলৰ কোনটো চাপৰ SI একক?",
        [("Pascal", "পাস্কেল"), ("Newton", "নিউটন"), ("Joule", "জুল"), ("Watt", "ৱাট")], 0,
        "The SI unit of pressure is the pascal.",
        "চাপৰ SI একক হৈছে পাস্কেল।"))
    A(R("The weight of a body is maximum at the?",
        "বস্তুৰ ওজন ক'ত সৰ্বাধিক হয়?",
        [("Poles", "মেৰু"), ("Equator", "বিষুৱ ৰেখা"), ("Centre of Earth", "পৃথিৱীৰ কেন্দ্ৰ"), ("Top of a mountain", "পৰ্বতৰ শিখৰ")], 0,
        "The value of g is greatest at the poles, so weight is maximum there.",
        "মেৰুত g ৰ মান সৰ্বাধিক, সেয়ে তাত ওজন সৰ্বাধিক হয়।"))
    A(R("Which instrument is used to measure atmospheric pressure?",
        "বায়ুমণ্ডলীয় চাপ জুখিবলৈ কোন যন্ত্ৰ ব্যৱহৃত হয়?",
        [("Barometer", "বেৰ'মিটাৰ"), ("Thermometer", "থাৰ্ম'মিটাৰ"), ("Ammeter", "এমিটাৰ"), ("Voltmeter", "ভল্টমিটাৰ")], 0,
        "A barometer measures atmospheric pressure.",
        "বেৰ'মিটাৰে বায়ুমণ্ডলীয় চাপ জুখে।"))
    A(R("Archimedes' principle is related to?",
        "আৰ্কিমিডিছৰ নীতি কিৰ সৈতে জড়িত?",
        [("Buoyancy", "উন্মেষণ"), ("Electricity", "বিদ্যুৎ"), ("Light", "পোহৰ"), ("Sound", "শব্দ")], 0,
        "Archimedes' principle explains buoyancy or upthrust.",
        "আৰ্কিমিডিছৰ নীতিয়ে উন্মেষণ বা উৰ্ধমুখী বল ব্যাখ্যা কৰে।"))
    A(R("A body floats in a liquid when the buoyant force is?",
        "উন্মেষণ বল কি হ'লে বস্তু তৰলত ওপঙে?",
        [("Equal to its weight", "ইয়াৰ ওজনৰ সমান"), ("Less than its weight", "ইয়াৰ ওজনতকৈ কম"), ("Zero", "শূন্য"), ("More than twice its weight", "ইয়াৰ ওজনৰ দুগুণতকৈ বেছি")], 0,
        "A body floats when the buoyant force equals its weight.",
        "উন্মেষণ বল ওজনৰ সমান হ'লে বস্তু ওপঙে।"))
    A(R("The density of water is maximum at?",
        "পানীৰ ঘনত্ব ক'ত সৰ্বাধিক হয়?",
        [("4 degrees C", "৪ ডিগ্ৰী চে"), ("0 degrees C", "০ ডিগ্ৰী চে"), ("100 degrees C", "১০০ ডিগ্ৰী চে"), ("10 degrees C", "১০ ডিগ্ৰী চে")], 0,
        "Water has maximum density at 4 degrees Celsius.",
        "৪ ডিগ্ৰী চেলছিয়াছত পানীৰ ঘনত্ব সৰ্বাধিক।"))

    # ---- Work, energy & power ----
    A(R("The law of conservation of energy states that energy can neither be created nor?",
        "শক্তি সংৰক্ষণ বিধি অনুসৰি শক্তি সৃষ্টি নহয় আৰু কি নহয়?",
        [("Destroyed", "ধ্বংস"), ("Transferred", "স্থানান্তৰিত"), ("Converted", "ৰূপান্তৰিত"), ("Stored", "সঞ্চিত")], 0,
        "Energy can neither be created nor destroyed, only transformed.",
        "শক্তি সৃষ্টি বা ধ্বংস নহয়, কেৱল ৰূপান্তৰিত হয়।"))
    A(R("The kinetic energy of a moving body depends on its mass and?",
        "গতিশীল বস্তুৰ গতিশক্তি ইয়াৰ ভৰ আৰু কিৰ ওপৰত নিৰ্ভৰ কৰে?",
        [("Velocity", "বেগ"), ("Colour", "ৰং"), ("Temperature", "উষ্ণতা"), ("Volume", "আয়তন")], 0,
        "Kinetic energy is half the product of mass and square of velocity.",
        "গতিশক্তি ভৰ আৰু বেগৰ বৰ্গৰ গুণফলৰ আধা।"))
    A(R("1 horsepower is approximately equal to?",
        "১ অশ্বশক্তি প্ৰায় কিমানৰ সমান?",
        [("746 watt", "৭৪৬ ৱাট"), ("1000 watt", "১০০০ ৱাট"), ("500 watt", "৫০০ ৱাট"), ("100 watt", "১০০ ৱাট")], 0,
        "1 horsepower is about 746 watts.",
        "১ অশ্বশক্তি প্ৰায় ৭৪৬ ৱাট।"))
    A(R("Work done is zero when the angle between force and displacement is?",
        "বল আৰু সৰণৰ মাজৰ কোণ কিমান হ'লে কাৰ্য শূন্য হয়?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("0 degrees", "০ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী"), ("45 degrees", "৪৫ ডিগ্ৰী")], 0,
        "Work is zero when force is perpendicular to displacement.",
        "বল সৰণৰ লম্ব হ'লে কাৰ্য শূন্য হয়।"))

    # ---- Light ----
    A(R("The phenomenon of splitting of white light into its component colours is called?",
        "শ্বেত পোহৰ ইয়াৰ উপাদান ৰঙত বিভক্ত হোৱা পৰিঘটনাক কি বোলা হয়?",
        [("Dispersion", "বিচ্ছুৰণ"), ("Reflection", "প্ৰতিফলন"), ("Refraction", "প্ৰতিসৰণ"), ("Diffraction", "বিৱৰ্তন")], 0,
        "Dispersion is the splitting of white light into its colours.",
        "বিচ্ছুৰণ হৈছে শ্বেত পোহৰ উপাদান ৰঙত বিভক্ত হোৱা।"))
    A(R("A rainbow is formed due to?",
        "ৰামধেনু কিৰ বাবে গঠন হয়?",
        [("Dispersion of light", "পোহৰৰ বিচ্ছুৰণ"), ("Reflection of sound", "শব্দৰ প্ৰতিফলন"), ("Refraction of sound", "শব্দৰ প্ৰতিসৰণ"), ("Absorption of heat", "তাপ শোষণ")], 0,
        "A rainbow forms due to dispersion of sunlight by water droplets.",
        "পানীৰ টোপালত সূৰ্যৰ পোহৰ বিচ্ছুৰিত হৈ ৰামধেনু গঠন হয়।"))
    A(R("The image formed by a plane mirror is?",
        "সমতল দাপোণত গঠিত প্ৰতিবিম্ব কি ধৰণৰ?",
        [("Virtual and erect", "অৱাস্তৱ আৰু সোজা"), ("Real and inverted", "বাস্তৱ আৰু ওলোটা"), ("Real and erect", "বাস্তৱ আৰু সোজা"), ("Virtual and inverted", "অৱাস্তৱ আৰু ওলোটা")], 0,
        "A plane mirror forms a virtual, erect image.",
        "সমতল দাপোণে অৱাস্তৱ আৰু সোজা প্ৰতিবিম্ব গঠন কৰে।"))
    A(R("Which type of lens is used to correct myopia?",
        "মায়'পিয়া শুধৰাবলৈ কোন ধৰণৰ লেন্ছ ব্যৱহৃত হয়?",
        [("Concave lens", "অৱতল লেন্ছ"), ("Convex lens", "উত্তল লেন্ছ"), ("Cylindrical lens", "বেলনীয় লেন্ছ"), ("Plane lens", "সমতল লেন্ছ")], 0,
        "Myopia is corrected using a concave lens.",
        "মায়'পিয়া অৱতল লেন্ছেৰে শুধৰোৱা হয়।"))
    A(R("Which type of lens is used to correct hypermetropia?",
        "হাইপাৰমেট্ৰ'পিয়া শুধৰাবলৈ কোন ধৰণৰ লেন্ছ ব্যৱহৃত হয়?",
        [("Convex lens", "উত্তল লেন্ছ"), ("Concave lens", "অৱতল লেন্ছ"), ("Plane lens", "সমতল লেন্ছ"), ("Cylindrical lens", "বেলনীয় লেন্ছ")], 0,
        "Hypermetropia is corrected using a convex lens.",
        "হাইপাৰমেট্ৰ'পিয়া উত্তল লেন্ছেৰে শুধৰোৱা হয়।"))
    A(R("The speed of light in vacuum is approximately?",
        "শূন্যস্থানত পোহৰৰ গতি প্ৰায় কিমান?",
        [("3 × 10^8 m/s", "৩ × ১০⁸ মি/ছে"), ("3 × 10^6 m/s", "৩ × ১০⁶ মি/ছে"), ("3 × 10^5 m/s", "৩ × ১০⁵ মি/ছে"), ("3 × 10^10 m/s", "৩ × ১০¹⁰ মি/ছে")], 0,
        "The speed of light in vacuum is about 3 × 10^8 m/s.",
        "শূন্যস্থানত পোহৰৰ গতি প্ৰায় ৩ × ১০⁸ মি/ছে।"))
    A(R("The sky appears blue because of?",
        "আকাশ নীলা দেখায় কিৰ বাবে?",
        [("Scattering of light", "পোহৰৰ বিক্ষেপণ"), ("Reflection of light", "পোহৰৰ প্ৰতিফলন"), ("Dispersion of light", "পোহৰৰ বিচ্ছুৰণ"), ("Absorption of light", "পোহৰৰ শোষণ")], 0,
        "Blue light is scattered more, making the sky appear blue.",
        "নীলা পোহৰ বেছি বিক্ষিপ্ত হয়, সেয়ে আকাশ নীলা দেখায়।"))
    A(R("Optical fibre works on the principle of?",
        "অপটিকেল ফাইবাৰ কি নীতিত কাম কৰে?",
        [("Total internal reflection", "সম্পূৰ্ণ আভ্যন্তৰীণ প্ৰতিফলন"), ("Dispersion", "বিচ্ছুৰণ"), ("Diffraction", "বিৱৰ্তন"), ("Polarisation", "ধ্ৰুৱকৰণ")], 0,
        "Optical fibre works on total internal reflection.",
        "অপটিকেল ফাইবাৰ সম্পূৰ্ণ আভ্যন্তৰীণ প্ৰতিফলন নীতিত কাম কৰে।"))

    # ---- Sound ----
    A(R("Sound cannot travel through?",
        "শব্দ কিৰ মাজেদি যাব নোৱাৰে?",
        [("Vacuum", "শূন্যস্থান"), ("Solid", "কঠিন"), ("Liquid", "তৰল"), ("Gas", "গেছ")], 0,
        "Sound needs a medium and cannot travel through vacuum.",
        "শব্দৰ মাধ্যম প্ৰয়োজন, সেয়ে শূন্যস্থানত যাব নোৱাৰে।"))
    A(R("The speed of sound is maximum in?",
        "শব্দৰ গতি ক'ত সৰ্বাধিক?",
        [("Solids", "কঠিন"), ("Liquids", "তৰল"), ("Gases", "গেছ"), ("Vacuum", "শূন্যস্থান")], 0,
        "Sound travels fastest in solids.",
        "শব্দ কঠিনত আটাইতকৈ দ্ৰুত গতিত চলে।"))
    A(R("The unit of frequency of a sound wave is?",
        "শব্দ তৰংগৰ কম্পনাংকৰ একক কি?",
        [("Hertz", "হাৰ্টজ"), ("Decibel", "ডেচিবেল"), ("Newton", "নিউটন"), ("Joule", "জুল")], 0,
        "Frequency is measured in hertz.",
        "কম্পনাংক হাৰ্টজত জোখা হয়।"))
    A(R("The loudness of sound is measured in?",
        "শব্দৰ প্ৰাবল্য কিৰ দ্বাৰা জোখা হয়?",
        [("Decibel", "ডেচিবেল"), ("Hertz", "হাৰ্টজ"), ("Metre", "মিটাৰ"), ("Watt", "ৱাট")], 0,
        "Loudness of sound is measured in decibels.",
        "শব্দৰ প্ৰাবল্য ডেচিবেলত জোখা হয়।"))
    A(R("Echo is caused by?",
        "প্ৰতিধ্বনি কিৰ বাবে হয়?",
        [("Reflection of sound", "শব্দৰ প্ৰতিফলন"), ("Refraction of sound", "শব্দৰ প্ৰতিসৰণ"), ("Dispersion of sound", "শব্দৰ বিচ্ছুৰণ"), ("Absorption of sound", "শব্দৰ শোষণ")], 0,
        "Echo is caused by the reflection of sound waves.",
        "শব্দ তৰংগৰ প্ৰতিফলনৰ বাবে প্ৰতিধ্বনি হয়।"))
    A(R("The audible range of frequency for a normal human ear is?",
        "এখন স্বাভাৱিক মানৱ কাণৰ শ্ৰৱণ কম্পনাংকৰ পৰিসৰ কিমান?",
        [("20 Hz to 20000 Hz", "২০ হাৰ্টজৰ পৰা ২০০০০ হাৰ্টজ"), ("1 Hz to 100 Hz", "১ হাৰ্টজৰ পৰা ১০০ হাৰ্টজ"), ("20000 Hz to 40000 Hz", "২০০০০ হাৰ্টজৰ পৰা ৪০০০০ হাৰ্টজ"), ("0 Hz to 20 Hz", "০ হাৰ্টজৰ পৰা ২০ হাৰ্টজ")], 0,
        "Humans can hear frequencies from about 20 Hz to 20000 Hz.",
        "মানুহে প্ৰায় ২০ হাৰ্টজৰ পৰা ২০০০০ হাৰ্টজলৈ শুনিব পাৰে।"))

    # ---- Heat ----
    A(R("Heat is a form of?",
        "তাপ কিৰ এটা ৰূপ?",
        [("Energy", "শক্তি"), ("Force", "বল"), ("Mass", "ভৰ"), ("Pressure", "চাপ")], 0,
        "Heat is a form of energy.",
        "তাপ শক্তিৰ এটা ৰূপ।"))
    A(R("The boiling point of water at normal atmospheric pressure is?",
        "সাধাৰণ বায়ুমণ্ডলীয় চাপত পানীৰ উতলাংক কিমান?",
        [("100 degrees C", "১০০ ডিগ্ৰী চে"), ("0 degrees C", "০ ডিগ্ৰী চে"), ("50 degrees C", "৫০ ডিগ্ৰী চে"), ("212 degrees C", "২১২ ডিগ্ৰী চে")], 0,
        "Water boils at 100 degrees Celsius at normal pressure.",
        "সাধাৰণ চাপত পানী ১০০ ডিগ্ৰী চেলছিয়াছত উতলে।"))
    A(R("The transfer of heat in liquids mainly takes place by?",
        "তৰলত তাপৰ স্থানান্তৰণ মূলতঃ কিৰ জৰিয়তে হয়?",
        [("Convection", "পৰিবহন"), ("Conduction", "পৰিবাহন"), ("Radiation", "বিকিৰণ"), ("Evaporation", "বাষ্পীভৱন")], 0,
        "Heat transfer in liquids occurs mainly by convection.",
        "তৰলত তাপ স্থানান্তৰণ মূলতঃ পৰিবহনৰ জৰিয়তে হয়।"))
    A(R("The transfer of heat without any medium is called?",
        "কোনো মাধ্যম নোহোৱাকৈ তাপৰ স্থানান্তৰণক কি বোলা হয়?",
        [("Radiation", "বিকিৰণ"), ("Conduction", "পৰিবাহন"), ("Convection", "পৰিবহন"), ("Evaporation", "বাষ্পীভৱন")], 0,
        "Radiation transfers heat without a medium.",
        "বিকিৰণে মাধ্যম নোহোৱাকৈ তাপ স্থানান্তৰ কৰে।"))
    A(R("Which of the following is a good conductor of heat?",
        "তলৰ কোনটো তাপৰ সুপৰিবাহী?",
        [("Copper", "তাম"), ("Wood", "কাঠ"), ("Air", "বায়ু"), ("Plastic", "প্লাষ্টিক")], 0,
        "Copper is a good conductor of heat.",
        "তাম তাপৰ সুপৰিবাহী।"))

    # ---- Electricity & magnetism ----
    A(R("The SI unit of electric current is?",
        "বিদ্যুৎ প্ৰৱাহৰ SI একক কি?",
        [("Ampere", "এম্পিয়াৰ"), ("Volt", "ভল্ট"), ("Ohm", "ও'ম"), ("Watt", "ৱাট")], 0,
        "The SI unit of electric current is the ampere.",
        "বিদ্যুৎ প্ৰৱাহৰ SI একক হৈছে এম্পিয়াৰ।"))
    A(R("The SI unit of electric charge is?",
        "বিদ্যুৎ আধানৰ SI একক কি?",
        [("Coulomb", "কুলম্ব"), ("Ampere", "এম্পিয়াৰ"), ("Volt", "ভল্ট"), ("Ohm", "ও'ম")], 0,
        "The SI unit of electric charge is the coulomb.",
        "বিদ্যুৎ আধানৰ SI একক হৈছে কুলম্ব।"))
    A(R("Ohm's law states that current is directly proportional to?",
        "ও'মৰ বিধি অনুসৰি প্ৰৱাহ কিৰ সৈতে সমানুপাতিক?",
        [("Potential difference", "বিভৱ পাৰ্থক্য"), ("Resistance", "ৰোধ"), ("Charge", "আধান"), ("Power", "ক্ষমতা")], 0,
        "Current is directly proportional to potential difference at constant temperature.",
        "স্থিৰ উষ্ণতাত প্ৰৱাহ বিভৱ পাৰ্থক্যৰ সৈতে সমানুপাতিক।"))
    A(R("The device used to measure electric current is?",
        "বিদ্যুৎ প্ৰৱাহ জুখিবলৈ ব্যৱহৃত যন্ত্ৰ কি?",
        [("Ammeter", "এমিটাৰ"), ("Voltmeter", "ভল্টমিটাৰ"), ("Barometer", "বেৰ'মিটাৰ"), ("Thermometer", "থাৰ্ম'মিটাৰ")], 0,
        "An ammeter measures electric current.",
        "এমিটাৰে বিদ্যুৎ প্ৰৱাহ জুখে।"))
    A(R("The device used to measure potential difference is?",
        "বিভৱ পাৰ্থক্য জুখিবলৈ ব্যৱহৃত যন্ত্ৰ কি?",
        [("Voltmeter", "ভল্টমিটাৰ"), ("Ammeter", "এমিটাৰ"), ("Galvanometer", "গেলভান'মিটাৰ"), ("Barometer", "বেৰ'মিটাৰ")], 0,
        "A voltmeter measures potential difference.",
        "ভল্টমিটাৰে বিভৱ পাৰ্থক্য জুখে।"))
    A(R("In household wiring, appliances are connected in?",
        "ঘৰুৱা তাৰত সঁজুলিবোৰ কি সংযোগত লগোৱা হয়?",
        [("Parallel", "সমান্তৰাল"), ("Series", "শ্ৰেণী"), ("Mixed", "মিশ্ৰ"), ("Star", "তাৰকা")], 0,
        "Household appliances are connected in parallel.",
        "ঘৰুৱা সঁজুলিবোৰ সমান্তৰাল সংযোগত লগোৱা হয়।"))
    A(R("A fuse wire is used in an electric circuit to?",
        "বিদ্যুৎ বৰ্তনীত ফিউজ তাৰ কিৰ বাবে ব্যৱহৃত হয়?",
        [("Prevent excessive current", "অত্যধিক প্ৰৱাহ প্ৰতিৰোধ কৰিবলৈ"), ("Increase current", "প্ৰৱাহ বঢ়াবলৈ"), ("Store charge", "আধান সঞ্চয় কৰিবলৈ"), ("Reduce voltage", "ভল্টেজ কমাবলৈ")], 0,
        "A fuse melts and breaks the circuit when current is too high.",
        "প্ৰৱাহ অতি বেছি হ'লে ফিউজ গলি বৰ্তনী ভাঙি দিয়ে।"))
    A(R("The commercial unit of electrical energy is?",
        "বিদ্যুৎ শক্তিৰ ব্যৱসায়িক একক কি?",
        [("Kilowatt-hour", "কিল'ৱাট-ঘণ্টা"), ("Joule", "জুল"), ("Watt", "ৱাট"), ("Newton", "নিউটন")], 0,
        "Electrical energy is measured in kilowatt-hours.",
        "বিদ্যুৎ শক্তি কিল'ৱাট-ঘণ্টাত জোখা হয়।"))
    A(R("The device that converts electrical energy into mechanical energy is?",
        "বিদ্যুৎ শক্তিক যান্ত্ৰিক শক্তিলৈ ৰূপান্তৰ কৰা যন্ত্ৰ কি?",
        [("Electric motor", "বিদ্যুৎ মটৰ"), ("Electric generator", "বিদ্যুৎ জেনেৰেটৰ"), ("Transformer", "ট্ৰান্সফৰ্মাৰ"), ("Battery", "বেটেৰী")], 0,
        "An electric motor converts electrical energy into mechanical energy.",
        "বিদ্যুৎ মটৰে বিদ্যুৎ শক্তিক যান্ত্ৰিক শক্তিলৈ ৰূপান্তৰ কৰে।"))
    A(R("The device that converts mechanical energy into electrical energy is?",
        "যান্ত্ৰিক শক্তিক বিদ্যুৎ শক্তিলৈ ৰূপান্তৰ কৰা যন্ত্ৰ কি?",
        [("Electric generator", "বিদ্যুৎ জেনেৰেটৰ"), ("Electric motor", "বিদ্যুৎ মটৰ"), ("Transformer", "ট্ৰান্সফৰ্মাৰ"), ("Fuse", "ফিউজ")], 0,
        "An electric generator converts mechanical energy into electrical energy.",
        "বিদ্যুৎ জেনেৰেটৰে যান্ত্ৰিক শক্তিক বিদ্যুৎ শক্তিলৈ ৰূপান্তৰ কৰে।"))
    A(R("The direction of the magnetic field around a straight current-carrying conductor is given by?",
        "সৰল প্ৰৱাহ-বহনকাৰী পৰিবাহীৰ চাৰিওফালে চুম্বক ক্ষেত্ৰৰ দিশ কিৰ দ্বাৰা দিয়া হয়?",
        [("Right-hand thumb rule", "সোঁহাতৰ বুঢ়া আঙুলিৰ নিয়ম"), ("Ohm's law", "ও'মৰ বিধি"), ("Boyle's law", "বয়লৰ বিধি"), ("Pascal's law", "পাস্কেলৰ বিধি")], 0,
        "The right-hand thumb rule gives the magnetic field direction.",
        "সোঁহাতৰ বুঢ়া আঙুলিৰ নিয়মে চুম্বক ক্ষেত্ৰৰ দিশ দিয়ে।"))
    A(R("The filament of an electric bulb is made of?",
        "বিদ্যুৎ বাল্বৰ ফিলামেণ্ট কিৰে তৈয়াৰী?",
        [("Tungsten", "টাংষ্টেন"), ("Copper", "তাম"), ("Aluminium", "এলুমিনিয়াম"), ("Iron", "লো")], 0,
        "The filament is made of tungsten due to its high melting point.",
        "উচ্চ গলনাংকৰ বাবে ফিলামেণ্ট টাংষ্টেনেৰে তৈয়াৰী।"))
    A(R("A transformer works on the principle of?",
        "ট্ৰান্সফৰ্মাৰ কি নীতিত কাম কৰে?",
        [("Mutual induction", "পাৰস্পৰিক আবেশ"), ("Self induction", "স্ব-আবেশ"), ("Ohm's law", "ও'মৰ বিধি"), ("Heating effect", "তাপীয় প্ৰভাৱ")], 0,
        "A transformer works on mutual induction.",
        "ট্ৰান্সফৰ্মাৰ পাৰস্পৰিক আবেশত কাম কৰে।"))
    A(R("The heating effect of current is used in?",
        "প্ৰৱাহৰ তাপীয় প্ৰভাৱ কিৰ বাবে ব্যৱহৃত হয়?",
        [("Electric heater", "বিদ্যুৎ হিটাৰ"), ("Electric fan", "বিদ্যুৎ ফেন"), ("Electric bell", "বিদ্যুৎ ঘণ্টা"), ("Loudspeaker", "লাউডস্পিকাৰ")], 0,
        "Electric heaters use the heating effect of current.",
        "বিদ্যুৎ হিটাৰে প্ৰৱাহৰ তাপীয় প্ৰভাৱ ব্যৱহাৰ কৰে।"))
    A(R("The magnetic effect of current is used in?",
        "প্ৰৱাহৰ চুম্বকীয় প্ৰভাৱ কিৰ বাবে ব্যৱহৃত হয়?",
        [("Electric bell", "বিদ্যুৎ ঘণ্টা"), ("Electric heater", "বিদ্যুৎ হিটাৰ"), ("Electric bulb", "বিদ্যুৎ বাল্ব"), ("Immersion rod", "ইমাৰ্চন ৰড")], 0,
        "An electric bell uses the magnetic effect of current.",
        "বিদ্যুৎ ঘণ্টাই প্ৰৱাহৰ চুম্বকীয় প্ৰভাৱ ব্যৱহাৰ কৰে।"))
    A(R("The strength of an electromagnet can be increased by?",
        "তড়িৎ চুম্বকৰ শক্তি কিৰ জৰিয়তে বঢ়াব পাৰি?",
        [("Increasing the current", "প্ৰৱাহ বঢ়াই"), ("Decreasing the turns", "কুণ্ডলীৰ পাক কমাই"), ("Removing the core", "ক'ৰ আঁতৰাই"), ("Cooling the coil", "কুণ্ডলী ঠাণ্ডা কৰি")], 0,
        "Increasing current increases the strength of an electromagnet.",
        "প্ৰৱাহ বঢ়ালে তড়িৎ চুম্বকৰ শক্তি বাঢ়ে।"))

    # ---- Modern physics ----
    A(R("X-rays were discovered by?",
        "এক্স-ৰশ্মি কোনে আৱিষ্কাৰ কৰিছিল?",
        [("Wilhelm Roentgen", "ভিলহেল্ম ৰণ্টজেন"), ("Isaac Newton", "আইজাক নিউটন"), ("Albert Einstein", "আলবাৰ্ট আইনষ্টাইন"), ("Marie Curie", "মেৰী কুৰী")], 0,
        "X-rays were discovered by Wilhelm Roentgen.",
        "এক্স-ৰশ্মি ভিলহেল্ম ৰণ্টজেনে আৱিষ্কাৰ কৰিছিল।"))
    A(R("Radioactivity was discovered by?",
        "ৰেডিঅ'সক্ৰিয়তা কোনে আৱিষ্কাৰ কৰিছিল?",
        [("Henri Becquerel", "হেনৰী বেকৰেল"), ("Isaac Newton", "আইজাক নিউটন"), ("Galileo", "গেলিলিঅ'"), ("Faraday", "ফেৰাডে")], 0,
        "Radioactivity was discovered by Henri Becquerel.",
        "ৰেডিঅ'সক্ৰিয়তা হেনৰী বেকৰেলে আৱিষ্কাৰ কৰিছিল।"))
    A(R("Which particle has no charge?",
        "কোন কণিকাৰ কোনো আধান নাই?",
        [("Neutron", "নিউট্ৰন"), ("Proton", "প্ৰ'টন"), ("Electron", "ইলেক্ট্ৰন"), ("Ion", "আয়ন")], 0,
        "A neutron is electrically neutral.",
        "নিউট্ৰন বৈদ্যুতিকভাৱে প্ৰশম।"))
    A(R("The energy of the Sun is produced by?",
        "সূৰ্যৰ শক্তি কিৰ দ্বাৰা উৎপন্ন হয়?",
        [("Nuclear fusion", "পাৰমাণৱিক সংযোজন"), ("Nuclear fission", "পাৰমাণৱিক বিভাজন"), ("Combustion", "দহন"), ("Chemical reaction", "ৰাসায়নিক বিক্ৰিয়া")], 0,
        "The Sun's energy comes from nuclear fusion of hydrogen.",
        "সূৰ্যৰ শক্তি হাইড্ৰ'জেনৰ পাৰমাণৱিক সংযোজনৰ পৰা আহে।"))
    A(R("The first Indian satellite was?",
        "প্ৰথম ভাৰতীয় উপগ্ৰহ কি আছিল?",
        [("Aryabhata", "আৰ্যভট্ট"), ("Rohini", "ৰোহিণী"), ("INSAT-1A", "ইনছেট-১এ"), ("Bhaskara", "ভাস্কৰ")], 0,
        "Aryabhata was India's first satellite, launched in 1975.",
        "আৰ্যভট্ট ভাৰতৰ প্ৰথম উপগ্ৰহ, ১৯৭৫ চনত উৎক্ষেপণ কৰা হৈছিল।"))
    A(R("ISRO was established in which year?",
        "ইছৰ' কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
        [("1969", "১৯৬৯"), ("1975", "১৯৭৫"), ("1962", "১৯৬২"), ("1980", "১৯৮০")], 0,
        "ISRO was established in 1969.",
        "ইছৰ' ১৯৬৯ চনত প্ৰতিষ্ঠা হৈছিল।"))
    A(R("The time period of a geostationary satellite is about?",
        "ভূ-স্থিৰ উপগ্ৰহৰ আবৰ্তন কাল প্ৰায় কিমান?",
        [("24 hours", "২৪ ঘণ্টা"), ("12 hours", "১২ ঘণ্টা"), ("48 hours", "৪৮ ঘণ্টা"), ("1 hour", "১ ঘণ্টা")], 0,
        "A geostationary satellite takes 24 hours to orbit the Earth.",
        "ভূ-স্থিৰ উপগ্ৰহে পৃথিৱী প্ৰদক্ষিণ কৰিবলৈ ২৪ ঘণ্টা লয়।"))
    A(R("Which radiation has the highest penetrating power?",
        "কোন বিকিৰণৰ ভেদন ক্ষমতা সৰ্বাধিক?",
        [("Gamma rays", "গামা ৰশ্মি"), ("Alpha particles", "আলফা কণিকা"), ("Beta particles", "বিটা কণিকা"), ("Ultraviolet rays", "অতিবেঙুনীয় ৰশ্মি")], 0,
        "Gamma rays have the highest penetrating power.",
        "গামা ৰশ্মিৰ ভেদন ক্ষমতা সৰ্বাধিক।"))
    A(R("Which of the following is used in solar cells?",
        "তলৰ কোনটো ছ'লাৰ চেলত ব্যৱহৃত হয়?",
        [("Silicon", "ছিলিকন"), ("Copper", "তাম"), ("Iron", "লো"), ("Zinc", "জিংক")], 0,
        "Silicon is a semiconductor used in solar cells.",
        "ছিলিকন ছ'লাৰ চেলত ব্যৱহৃত এটা অৰ্ধপৰিবাহী।"))
    A(R("Which of the following is a semiconductor?",
        "তলৰ কোনটো এটা অৰ্ধপৰিবাহী?",
        [("Silicon", "ছিলিকন"), ("Copper", "তাম"), ("Silver", "ৰূপ"), ("Rubber", "ৰবৰ")], 0,
        "Silicon is a semiconductor.",
        "ছিলিকন এটা অৰ্ধপৰিবাহী।"))

    # ---- Simple machines & misc ----
    A(R("Friction can be reduced by?",
        "ঘৰ্ষণ কিৰ জৰিয়তে কমাব পাৰি?",
        [("Using lubricants", "লুব্ৰিকেণ্ট ব্যৱহাৰ কৰি"), ("Increasing the load", "ভাৰ বঢ়াই"), ("Increasing roughness", "খহটা ভাব বঢ়াই"), ("Removing lubrication", "লুব্ৰিকেণ্ট আঁতৰাই")], 0,
        "Lubricants reduce friction between surfaces.",
        "লুব্ৰিকেণ্টে পৃষ্ঠৰ মাজৰ ঘৰ্ষণ কমায়।"))
    A(R("Which of the following is a unit of energy?",
        "তলৰ কোনটো শক্তিৰ একক?",
        [("Joule", "জুল"), ("Newton", "নিউটন"), ("Pascal", "পাস্কেল"), ("Ampere", "এম্পিয়াৰ")], 0,
        "The joule is a unit of energy.",
        "জুল শক্তিৰ একক।"))
    A(R("A lever is a simple machine that helps to?",
        "লিভাৰ এটা সৰল যন্ত্ৰ যি কিৰ সহায় কৰে?",
        [("Multiply force", "বল বহুগুণ কৰিবলৈ"), ("Store energy", "শক্তি সঞ্চয় কৰিবলৈ"), ("Create energy", "শক্তি সৃষ্টি কৰিবলৈ"), ("Reduce mass", "ভৰ কমাবলৈ")], 0,
        "A lever helps to multiply the applied force.",
        "লিভাৰে প্ৰয়োগ কৰা বল বহুগুণ কৰাত সহায় কৰে।"))
    A(R("Which of the following is the correct unit of density?",
        "তলৰ কোনটো ঘনত্বৰ শুদ্ধ একক?",
        [("kg/m³", "কিল'গ্ৰাম/মি³"), ("kg/m", "কিল'গ্ৰাম/মি"), ("kg·m", "কিল'গ্ৰাম·মি"), ("m/s", "মি/ছে")], 0,
        "Density is mass per unit volume, measured in kg/m³.",
        "ঘনত্ব হৈছে একক আয়তনৰ ভৰ, কিল'গ্ৰাম/মি³ ত জোখা হয়।"))

    # ---- Additional physics ----
    A(R("Which of the following is a scalar quantity?",
        "তলৰ কোনটো এটা স্কেলাৰ ৰাশি?",
        [("Speed", "দ্ৰুতি"), ("Velocity", "বেগ"), ("Force", "বল"), ("Acceleration", "ত্বৰণ")], 0,
        "Speed has magnitude only, so it is a scalar quantity.",
        "দ্ৰুতিৰ কেৱল মান আছে, সেয়ে ই স্কেলাৰ ৰাশি।"))
    A(R("Which of the following is a vector quantity?",
        "তলৰ কোনটো এটা ভেক্টৰ ৰাশি?",
        [("Velocity", "বেগ"), ("Speed", "দ্ৰুতি"), ("Mass", "ভৰ"), ("Time", "সময়")], 0,
        "Velocity has both magnitude and direction, so it is a vector.",
        "বেগৰ মান আৰু দিশ দুয়োটা আছে, সেয়ে ই ভেক্টৰ।"))
    A(R("The momentum of a body of mass 2 kg moving at 3 m/s is?",
        "৩ মি/ছে বেগেৰে গতি কৰা ২ কিল'গ্ৰাম ভৰৰ বস্তুৰ ভৰবেগ কিমান?",
        [("6 kg·m/s", "৬ কিল'গ্ৰাম·মি/ছে"), ("1.5 kg·m/s", "১.৫ কিল'গ্ৰাম·মি/ছে"), ("5 kg·m/s", "৫ কিল'গ্ৰাম·মি/ছে"), ("9 kg·m/s", "৯ কিল'গ্ৰাম·মি/ছে")], 0,
        "Momentum = mass × velocity = 2 × 3 = 6 kg·m/s.",
        "ভৰবেগ = ভৰ × বেগ = ২ × ৩ = ৬ কিল'গ্ৰাম·মি/ছে।"))
    A(R("The work done when a force of 10 N moves a body 5 m in its direction is?",
        "১০ নিউটন বল বস্তুৰ দিশত ৫ মিটাৰ চলালে কাৰ্য কিমান?",
        [("50 J", "৫০ জুল"), ("2 J", "২ জুল"), ("15 J", "১৫ জুল"), ("5 J", "৫ জুল")], 0,
        "Work = force × distance = 10 × 5 = 50 J.",
        "কাৰ্য = বল × দূৰত্ব = ১০ × ৫ = ৫০ জুল।"))
    A(R("Which of the following is the correct relation between wave speed, frequency and wavelength?",
        "তৰংগ গতি, কম্পনাংক আৰু তৰংগদৈৰ্ঘ্যৰ মাজৰ শুদ্ধ সম্পৰ্ক কোনটো?",
        [("v = f × λ", "v = f × λ"), ("v = f / λ", "v = f / λ"), ("v = λ / f", "v = λ / f"), ("v = f + λ", "v = f + λ")], 0,
        "Wave speed equals frequency times wavelength.",
        "তৰংগ গতি কম্পনাংক আৰু তৰংগদৈৰ্ঘ্যৰ গুণফলৰ সমান।"))
    A(R("A light year is a unit of?",
        "পোহৰ-বৰ্ষ কিৰ একক?",
        [("Distance", "দূৰত্ব"), ("Time", "সময়"), ("Speed", "দ্ৰুতি"), ("Mass", "ভৰ")], 0,
        "A light year is the distance light travels in one year.",
        "পোহৰ-বৰ্ষ হৈছে এটা বছৰত পোহৰে অতিক্ৰম কৰা দূৰত্ব।"))
    A(R("The nearest star to the Earth after the Sun is?",
        "সূৰ্যৰ পিছত পৃথিৱীৰ আটাইতকৈ ওচৰৰ তৰা কোনটো?",
        [("Proxima Centauri", "প্ৰক্সিমা চেণ্টৰি"), ("Sirius", "ছিৰিয়াছ"), ("Polaris", "ধ্ৰুৱতৰা"), ("Vega", "ভেগা")], 0,
        "Proxima Centauri is the nearest star after the Sun.",
        "প্ৰক্সিমা চেণ্টৰি সূৰ্যৰ পিছত আটাইতকৈ ওচৰৰ তৰা।"))
    A(R("The value of g is zero at the?",
        "g ৰ মান ক'ত শূন্য হয়?",
        [("Centre of the Earth", "পৃথিৱীৰ কেন্দ্ৰ"), ("Poles", "মেৰু"), ("Equator", "বিষুৱ ৰেখা"), ("Sea level", "সাগৰ পৃষ্ঠ")], 0,
        "The value of g is zero at the centre of the Earth.",
        "পৃথিৱীৰ কেন্দ্ৰত g ৰ মান শূন্য।"))
    A(R("Which of the following is not a unit of energy?",
        "তলৰ কোনটো শক্তিৰ একক নহয়?",
        [("Newton", "নিউটন"), ("Joule", "জুল"), ("Calorie", "কেলৰি"), ("Kilowatt-hour", "কিল'ৱাট-ঘণ্টা")], 0,
        "The newton is a unit of force, not energy.",
        "নিউটন বলৰ একক, শক্তিৰ নহয়।"))
    A(R("1 kWh is equal to?",
        "১ কিল'ৱাট-ঘণ্টা কিমানৰ সমান?",
        [("3.6 × 10^6 J", "৩.৬ × ১০⁶ জুল"), ("1000 J", "১০০০ জুল"), ("3600 J", "৩৬০০ জুল"), ("3.6 × 10^3 J", "৩.৬ × ১০³ জুল")], 0,
        "1 kWh equals 3.6 × 10^6 joules.",
        "১ কিল'ৱাট-ঘণ্টা ৩.৬ × ১০⁶ জুলৰ সমান।"))
    A(R("Which of the following is a non-renewable source of energy?",
        "তলৰ কোনটো অ-নৱীকৰণযোগ্য শক্তিৰ উৎস?",
        [("Coal", "কয়লা"), ("Solar energy", "সৌৰ শক্তি"), ("Wind energy", "বায়ু শক্তি"), ("Hydro energy", "জল শক্তি")], 0,
        "Coal is a non-renewable fossil fuel.",
        "কয়লা এটা অ-নৱীকৰণযোগ্য জীৱাশ্ম ইন্ধন।"))
    A(R("The unit of power in the CGS system is?",
        "CGS পদ্ধতিত ক্ষমতাৰ একক কি?",
        [("Erg per second", "এৰ্গ প্ৰতি ছেকেণ্ড"), ("Watt", "ৱাট"), ("Joule", "জুল"), ("Newton", "নিউটন")], 0,
        "In the CGS system, power is measured in erg per second.",
        "CGS পদ্ধতিত ক্ষমতা এৰ্গ প্ৰতি ছেকেণ্ডত জোখা হয়।"))
    A(R("Which of the following is used to measure the relative density of a liquid?",
        "তৰলৰ আপেক্ষিক ঘনত্ব জুখিবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Hydrometer", "হাইড্ৰ'মিটাৰ"), ("Barometer", "বেৰ'মিটাৰ"), ("Thermometer", "থাৰ্ম'মিটাৰ"), ("Ammeter", "এমিটাৰ")], 0,
        "A hydrometer measures the relative density of a liquid.",
        "হাইড্ৰ'মিটাৰে তৰলৰ আপেক্ষিক ঘনত্ব জুখে।"))
    A(R("The refractive index of a medium is the ratio of the speed of light in vacuum to the speed of light in?",
        "মাধ্যমৰ প্ৰতিসৰণাংক শূন্যস্থানত পোহৰৰ গতি আৰু কিৰ মাজৰ অনুপাত?",
        [("The medium", "মাধ্যমত পোহৰৰ গতি"), ("Air only", "কেৱল বায়ুত"), ("Water only", "কেৱল পানীত"), ("Glass only", "কেৱল কাচত")], 0,
        "Refractive index is the ratio of the speed of light in vacuum to that in the medium.",
        "প্ৰতিসৰণাংক হৈছে শূন্যস্থানত পোহৰৰ গতি আৰু মাধ্যমত ইয়াৰ গতিৰ অনুপাত।"))
    A(R("The power of a lens is measured in?",
        "লেন্ছৰ ক্ষমতা কিৰ দ্বাৰা জোখা হয়?",
        [("Dioptre", "ডায়'প্টাৰ"), ("Watt", "ৱাট"), ("Newton", "নিউটন"), ("Joule", "জুল")], 0,
        "The power of a lens is measured in dioptres.",
        "লেন্ছৰ ক্ষমতা ডায়'প্টাৰত জোখা হয়।"))
    A(R("The SI unit of magnetic field is?",
        "চুম্বক ক্ষেত্ৰৰ SI একক কি?",
        [("Tesla", "টেছলা"), ("Weber", "ৱেবাৰ"), ("Henry", "হেনৰী"), ("Farad", "ফেৰাড")], 0,
        "The SI unit of magnetic field is the tesla.",
        "চুম্বক ক্ষেত্ৰৰ SI একক হৈছে টেছলা।"))
    A(R("The AC supply in Indian households has a frequency of about?",
        "ভাৰতীয় ঘৰুৱা AC যোগানৰ কম্পনাংক প্ৰায় কিমান?",
        [("50 Hz", "৫০ হাৰ্টজ"), ("60 Hz", "৬০ হাৰ্টজ"), ("100 Hz", "১০০ হাৰ্টজ"), ("25 Hz", "২৫ হাৰ্টজ")], 0,
        "Indian household AC supply has a frequency of 50 Hz.",
        "ভাৰতীয় ঘৰুৱা AC যোগানৰ কম্পনাংক ৫০ হাৰ্টজ।"))
    A(R("The voltage of household AC supply in India is about?",
        "ভাৰতত ঘৰুৱা AC যোগানৰ ভল্টেজ প্ৰায় কিমান?",
        [("220 V", "২২০ ভল্ট"), ("110 V", "১১০ ভল্ট"), ("440 V", "৪৪০ ভল্ট"), ("12 V", "১২ ভল্ট")], 0,
        "Household AC supply in India is about 220 V.",
        "ভাৰতত ঘৰুৱা AC যোগান প্ৰায় ২২০ ভল্ট।"))
    A(R("Which colour of visible light has the longest wavelength?",
        "দৃশ্যমান পোহৰৰ কোন ৰঙৰ তৰংগদৈৰ্ঘ্য সৰ্বাধিক?",
        [("Red", "ৰঙা"), ("Violet", "বেঙুনীয়া"), ("Green", "সেউজীয়া"), ("Blue", "নীলা")], 0,
        "Red light has the longest wavelength in the visible spectrum.",
        "দৃশ্যমান বৰ্ণালীত ৰঙা পোহৰৰ তৰংগদৈৰ্ঘ্য সৰ্বাধিক।"))
    A(R("Which colour of visible light has the shortest wavelength?",
        "দৃশ্যমান পোহৰৰ কোন ৰঙৰ তৰংগদৈৰ্ঘ্য সৰ্বনিম্ন?",
        [("Violet", "বেঙুনীয়া"), ("Red", "ৰঙা"), ("Yellow", "হালধীয়া"), ("Orange", "কমলা")], 0,
        "Violet light has the shortest wavelength in the visible spectrum.",
        "দৃশ্যমান বৰ্ণালীত বেঙুনীয়া পোহৰৰ তৰংগদৈৰ্ঘ্য সৰ্বনিম্ন।"))
    A(R("The time period of a simple pendulum depends on its?",
        "সৰল দোলকৰ আবৰ্তন কাল কিৰ ওপৰত নিৰ্ভৰ কৰে?",
        [("Length", "দীঘ"), ("Mass", "ভৰ"), ("Colour", "ৰং"), ("Material", "উপাদান")], 0,
        "The time period of a simple pendulum depends on its length.",
        "সৰল দোলকৰ আবৰ্তন কাল ইয়াৰ দীঘৰ ওপৰত নিৰ্ভৰ কৰে।"))
    A(R("If the length of a simple pendulum is increased, its time period?",
        "সৰল দোলকৰ দীঘ বঢ়ালে ইয়াৰ আবৰ্তন কাল কি হয়?",
        [("Increases", "বাঢ়ে"), ("Decreases", "কমে"), ("Remains same", "একে থাকে"), ("Becomes zero", "শূন্য হয়")], 0,
        "Time period increases with the square root of length.",
        "আবৰ্তন কাল দীঘৰ বৰ্গমূলৰ সৈতে বাঢ়ে।"))
    A(R("The slope of a velocity-time graph gives?",
        "বেগ-সময় লেখৰ ঢালে কি দিয়ে?",
        [("Acceleration", "ত্বৰণ"), ("Displacement", "সৰণ"), ("Speed", "দ্ৰুতি"), ("Momentum", "ভৰবেগ")], 0,
        "The slope of a velocity-time graph gives acceleration.",
        "বেগ-সময় লেখৰ ঢালে ত্বৰণ দিয়ে।"))
    A(R("In a series combination of resistors, the current is?",
        "ৰোধকৰ শ্ৰেণী সংযোগত প্ৰৱাহ কেনেকুৱা?",
        [("Same through each resistor", "প্ৰতিটো ৰোধকৰ মাজেৰে একে"), ("Different in each", "প্ৰতিটোত বেলেগ"), ("Zero", "শূন্য"), ("Infinite", "অসীম")], 0,
        "In a series circuit, the same current flows through each resistor.",
        "শ্ৰেণী বৰ্তনীত প্ৰতিটো ৰোধকৰ মাজেৰে একে প্ৰৱাহ যায়।"))
    A(R("In a parallel combination of resistors, the potential difference is?",
        "ৰোধকৰ সমান্তৰাল সংযোগত বিভৱ পাৰ্থক্য কেনেকুৱা?",
        [("Same across each", "প্ৰতিটোৰ মাজেৰে একে"), ("Different across each", "প্ৰতিটোৰ মাজেৰে বেলেগ"), ("Zero", "শূন্য"), ("Infinite", "অসীম")], 0,
        "In a parallel circuit, the same voltage is applied across each resistor.",
        "সমান্তৰাল বৰ্তনীত প্ৰতিটো ৰোধকৰ ওপৰত একে ভল্টেজ প্ৰয়োগ হয়।"))
    A(R("The instrument used to detect electric charge is?",
        "বিদ্যুৎ আধান ধৰা পেলাবলৈ ব্যৱহৃত যন্ত্ৰ কি?",
        [("Electroscope", "ইলেক্ট্ৰ'স্ক'প"), ("Barometer", "বেৰ'মিটাৰ"), ("Ammeter", "এমিটাৰ"), ("Hydrometer", "হাইড্ৰ'মিটাৰ")], 0,
        "An electroscope detects electric charge.",
        "ইলেক্ট্ৰ'স্ক'পে বিদ্যুৎ আধান ধৰা পেলায়।"))
    A(R("The process by which a liquid changes into vapour at any temperature is called?",
        "যিকোনো উষ্ণতাত তৰল বাষ্পলৈ পৰিণত হোৱা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Evaporation", "বাষ্পীভৱন"), ("Condensation", "ঘনীভৱন"), ("Sublimation", "উৰ্ধপাতন"), ("Freezing", "জমা")], 0,
        "Evaporation is the change of a liquid into vapour at any temperature.",
        "বাষ্পীভৱন হৈছে যিকোনো উষ্ণতাত তৰলৰ বাষ্পলৈ পৰিৱৰ্তন।"))
    A(R("Absolute zero temperature in degrees Celsius is?",
        "চেলছিয়াছ ডিগ্ৰীত নিখুঁত শূন্য উষ্ণতা কিমান?",
        [("-273.15 degrees C", "-২৭৩.১৫ ডিগ্ৰী চে"), ("0 degrees C", "০ ডিগ্ৰী চে"), ("-100 degrees C", "-১০০ ডিগ্ৰী চে"), ("273 degrees C", "২৭৩ ডিগ্ৰী চে")], 0,
        "Absolute zero is -273.15 degrees Celsius.",
        "নিখুঁত শূন্য হৈছে -২৭৩.১৫ ডিগ্ৰী চেলছিয়াছ।"))
    A(R("Which of the following is a unit of temperature?",
        "তলৰ কোনটো উষ্ণতাৰ একক?",
        [("Degree Celsius", "ডিগ্ৰী চেলছিয়াছ"), ("Newton", "নিউটন"), ("Joule", "জুল"), ("Watt", "ৱাট")], 0,
        "Temperature is measured in degrees Celsius.",
        "উষ্ণতা ডিগ্ৰী চেলছিয়াছত জোখা হয়।"))

    # ---- Additional physics ----
    A(R("Which of the following is the SI unit of frequency?",
        "তলৰ কোনটো কম্পনাংকৰ SI একক?",
        [("Hertz", "হাৰ্টজ"), ("Second", "ছেকেণ্ড"), ("Metre", "মিটাৰ"), ("Newton", "নিউটন")], 0,
        "The SI unit of frequency is the hertz.",
        "কম্পনাংকৰ SI একক হৈছে হাৰ্টজ।"))
    A(R("Which of the following is the SI unit of wavelength?",
        "তলৰ কোনটো তৰংগদৈৰ্ঘ্যৰ SI একক?",
        [("Metre", "মিটাৰ"), ("Hertz", "হাৰ্টজ"), ("Second", "ছেকেণ্ড"), ("Newton", "নিউটন")], 0,
        "Wavelength is measured in metres.",
        "তৰংগদৈৰ্ঘ্য মিটাৰত জোখা হয়।"))
    A(R("Which of the following is the SI unit of electric resistance?",
        "তলৰ কোনটো বিদ্যুৎ ৰোধৰ SI একক?",
        [("Ohm", "ও'ম"), ("Volt", "ভল্ট"), ("Ampere", "এম্পিয়াৰ"), ("Watt", "ৱাট")], 0,
        "The SI unit of resistance is the ohm.",
        "ৰোধৰ SI একক হৈছে ও'ম।"))
    A(R("Which of the following is the SI unit of potential difference?",
        "তলৰ কোনটো বিভৱ পাৰ্থক্যৰ SI একক?",
        [("Volt", "ভল্ট"), ("Ampere", "এম্পিয়াৰ"), ("Ohm", "ও'ম"), ("Coulomb", "কুলম্ব")], 0,
        "Potential difference is measured in volts.",
        "বিভৱ পাৰ্থক্য ভল্টত জোখা হয়।"))
    A(R("Which of the following is the SI unit of momentum?",
        "তলৰ কোনটো ভৰবেগৰ SI একক?",
        [("kg·m/s", "কিল'গ্ৰাম·মি/ছে"), ("kg·m/s²", "কিল'গ্ৰাম·মি/ছে²"), ("kg/m", "কিল'গ্ৰাম/মি"), ("kg·m²", "কিল'গ্ৰাম·মি²")], 0,
        "Momentum is measured in kg·m/s.",
        "ভৰবেগ কিল'গ্ৰাম·মি/ছে ত জোখা হয়।"))
    A(R("The gravitational force between two bodies is inversely proportional to the square of the?",
        "দুটা বস্তুৰ মাজৰ মাধ্যাকৰ্ষণ বল কিৰ বৰ্গৰ সৈতে ব্যস্তানুপাতিক?",
        [("Distance between them", "তেওঁলোকৰ মাজৰ দূৰত্ব"), ("Product of masses", "ভৰৰ গুণফল"), ("Time", "সময়"), ("Velocity", "বেগ")], 0,
        "Gravitational force is inversely proportional to the square of the distance.",
        "মাধ্যাকৰ্ষণ বল দূৰত্বৰ বৰ্গৰ সৈতে ব্যস্তানুপাতিক।"))
    A(R("Which scientist gave the universal law of gravitation?",
        "কোন বিজ্ঞানীয়ে সাৰ্বজনীন মাধ্যাকৰ্ষণ বিধি দিছিল?",
        [("Isaac Newton", "আইজাক নিউটন"), ("Albert Einstein", "আলবাৰ্ট আইনষ্টাইন"), ("Galileo", "গেলিলিঅ'"), ("Kepler", "কেপলাৰ")], 0,
        "Isaac Newton gave the universal law of gravitation.",
        "আইজাক নিউটনে সাৰ্বজনীন মাধ্যাকৰ্ষণ বিধি দিছিল।"))
    A(R("The unit of radioactivity is?",
        "ৰেডিঅ'সক্ৰিয়তাৰ একক কি?",
        [("Becquerel", "বেকৰেল"), ("Newton", "নিউটন"), ("Tesla", "টেছলা"), ("Watt", "ৱাট")], 0,
        "Radioactivity is measured in becquerels.",
        "ৰেডিঅ'সক্ৰিয়তা বেকৰেলত জোখা হয়।"))
    A(R("Alpha particles are?",
        "আলফা কণিকা কি?",
        [("Positively charged", "ধনাত্মক আধানযুক্ত"), ("Negatively charged", "ঋণাত্মক আধানযুক্ত"), ("Neutral", "প্ৰশম"), ("Massless", "ভৰহীন")], 0,
        "Alpha particles are helium nuclei and carry a positive charge.",
        "আলফা কণিকা হিলিয়াম নিউক্লিয়াছ আৰু ধনাত্মক আধান বহন কৰে।"))
    A(R("Beta particles are?",
        "বিটা কণিকা কি?",
        [("Negatively charged", "ঋণাত্মক আধানযুক্ত"), ("Positively charged", "ধনাত্মক আধানযুক্ত"), ("Neutral", "প্ৰশম"), ("Massless", "ভৰহীন")], 0,
        "Beta particles are fast electrons and carry a negative charge.",
        "বিটা কণিকা দ্ৰুত ইলেক্ট্ৰন আৰু ঋণাত্মক আধান বহন কৰে।"))
    A(R("Nuclear fission is the?",
        "পাৰমাণৱিক বিভাজন হৈছে কি?",
        [("Splitting of a heavy nucleus", "এটা গধুৰ নিউক্লিয়াছৰ বিভাজন"), ("Joining of light nuclei", "পাতল নিউক্লিয়াছৰ সংযোগ"), ("Loss of electrons", "ইলেক্ট্ৰনৰ ক্ষয়"), ("Gain of protons", "প্ৰ'টনৰ লাভ")], 0,
        "Nuclear fission is the splitting of a heavy nucleus with release of energy.",
        "পাৰমাণৱিক বিভাজন হৈছে গধুৰ নিউক্লিয়াছৰ বিভাজন, য'ত শক্তি নিৰ্গত হয়।"))
    A(R("Which of the following converts solar energy directly into electrical energy?",
        "তলৰ কোনটোৱে সৌৰ শক্তিক পোনপটীয়াকৈ বিদ্যুৎ শক্তিলৈ ৰূপান্তৰ কৰে?",
        [("Solar cell", "ছ'লাৰ চেল"), ("Solar cooker", "ছ'লাৰ কুকাৰ"), ("Solar heater", "ছ'লাৰ হিটাৰ"), ("Battery", "বেটেৰী")], 0,
        "A solar cell converts solar energy directly into electricity.",
        "ছ'লাৰ চেলে সৌৰ শক্তিক পোনপটীয়াকৈ বিদ্যুৎলৈ ৰূপান্তৰ কৰে।"))
    A(R("Which of the following is used to measure very high temperatures of a furnace?",
        "ভাটীৰ অতি উচ্চ উষ্ণতা জুখিবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Pyrometer", "পায়্ৰ'মিটাৰ"), ("Clinical thermometer", "ক্লিনিকেল থাৰ্ম'মিটাৰ"), ("Barometer", "বেৰ'মিটাৰ"), ("Hydrometer", "হাইড্ৰ'মিটাৰ")], 0,
        "A pyrometer measures very high temperatures.",
        "পায়্ৰ'মিটাৰে অতি উচ্চ উষ্ণতা জুখে।"))
    A(R("Which of the following is the correct unit of power in SI?",
        "তলৰ কোনটো SI ত ক্ষমতাৰ শুদ্ধ একক?",
        [("Watt", "ৱাট"), ("Joule", "জুল"), ("Newton", "নিউটন"), ("Pascal", "পাস্কেল")], 0,
        "The SI unit of power is the watt.",
        "ক্ষমতাৰ SI একক হৈছে ৱাট।"))
    A(R("Which of the following instruments is used to measure electric current in a circuit?",
        "বৰ্তনীত বিদ্যুৎ প্ৰৱাহ জুখিবলৈ তলৰ কোনটো যন্ত্ৰ ব্যৱহৃত হয়?",
        [("Ammeter", "এমিটাৰ"), ("Voltmeter", "ভল্টমিটাৰ"), ("Potentiometer", "পটেনচিঅ'মিটাৰ"), ("Galvanometer", "গেলভান'মিটাৰ")], 0,
        "An ammeter is connected in series to measure current.",
        "প্ৰৱাহ জুখিবলৈ এমিটাৰ শ্ৰেণীত সংযোগ কৰা হয়।"))
    A(R("The ideal resistance of an ammeter should be?",
        "এমিটাৰৰ আদৰ্শ ৰোধ কিমান হ'ব লাগে?",
        [("Zero", "শূন্য"), ("Very high", "অতি উচ্চ"), ("Infinite", "অসীম"), ("Equal to circuit resistance", "বৰ্তনীৰ ৰোধৰ সমান")], 0,
        "An ideal ammeter has zero resistance.",
        "আদৰ্শ এমিটাৰৰ ৰোধ শূন্য।"))
    A(R("The ideal resistance of a voltmeter should be?",
        "ভল্টমিটাৰৰ আদৰ্শ ৰোধ কিমান হ'ব লাগে?",
        [("Very high", "অতি উচ্চ"), ("Zero", "শূন্য"), ("Very low", "অতি কম"), ("Equal to circuit resistance", "বৰ্তনীৰ ৰোধৰ সমান")], 0,
        "An ideal voltmeter has very high resistance.",
        "আদৰ্শ ভল্টমিটাৰৰ ৰোধ অতি উচ্চ।"))
    A(R("Which of the following is the correct unit of force in the CGS system?",
        "CGS পদ্ধতিত বলৰ শুদ্ধ একক কি?",
        [("Dyne", "ডাইন"), ("Newton", "নিউটন"), ("Joule", "জুল"), ("Pascal", "পাস্কেল")], 0,
        "In the CGS system, force is measured in dynes.",
        "CGS পদ্ধতিত বল ডাইনত জোখা হয়।"))
    A(R("Which of the following is the correct unit of pressure in the CGS system?",
        "CGS পদ্ধতিত চাপৰ শুদ্ধ একক কি?",
        [("Barye", "বেৰি"), ("Pascal", "পাস্কেল"), ("Newton", "নিউটন"), ("Watt", "ৱাট")], 0,
        "In the CGS system, pressure is measured in barye.",
        "CGS পদ্ধতিত চাপ বেৰিত জোখা হয়।"))
    A(R("The phenomenon of bending of light when it passes from one medium to another is called?",
        "এটা মাধ্যমৰ পৰা আন এটা মাধ্যমলৈ যাওঁতে পোহৰ বেঁকা হোৱা পৰিঘটনাক কি বোলা হয়?",
        [("Refraction", "প্ৰতিসৰণ"), ("Reflection", "প্ৰতিফলন"), ("Dispersion", "বিচ্ছুৰণ"), ("Diffraction", "বিৱৰ্তন")], 0,
        "Refraction is the bending of light at the boundary of two media.",
        "প্ৰতিসৰণ হৈছে দুটা মাধ্যমৰ সীমাত পোহৰ বেঁকা হোৱা।"))
    A(R("A concave mirror is also known as a?",
        "অৱতল দাপোণক কি বুলিও জনা যায়?",
        [("Converging mirror", "অভিসাৰী দাপোণ"), ("Diverging mirror", "অপসাৰী দাপোণ"), ("Plane mirror", "সমতল দাপোণ"), ("Cylindrical mirror", "বেলনীয় দাপোণ")], 0,
        "A concave mirror converges light rays, so it is a converging mirror.",
        "অৱতল দাপোণে পোহৰ ৰশ্মি অভিসৃত কৰে, সেয়ে ই অভিসাৰী দাপোণ।"))

    return r
