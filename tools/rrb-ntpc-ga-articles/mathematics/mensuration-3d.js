"use strict";

/* RRB NTPC Mathematics — Mensuration (3D). Rendered by tools/rrb-ntpc.ga-extra.js. */

module.exports = {
  h2: { en: "Mensuration (3D) for the RRB NTPC CBT", as: "RRB NTPC CBT ৰ বাবে ক্ষেত্ৰমিতি (ত্ৰিমাত্ৰিক)" },
  p: {
    en: [
      "Mensuration is the chapter that measures figures, and the three-dimensional part of it deals with solids, the objects that have length, breadth and height. It appears in the RRB NTPC Mathematics paper with a dependable number of questions every year. The chapter has a small number of solids, each with a pair of formulas, one for the volume and one for the surface area, and most of the paper is the arithmetic of substituting the given dimensions into these formulas.",
      "The cube is the simplest solid, with all its edges equal. Its volume is the cube of the edge, and its total surface area is six times the square of the edge, because a cube has six equal square faces. The diagonal of a cube, the longest straight line inside it, is the edge times the square root of three. The reverse questions give the volume or the surface area and ask for the edge, and they are solved by taking a cube root or a square root.",
      "The cuboid, also called the rectangular box, has three different dimensions. Its volume is the product of the three, and its total surface area is twice the sum of the products of each pair of dimensions, because the six faces come in three pairs of equal rectangles. The lateral surface area, the area of the four side faces excluding the top and bottom, is twice the height times the sum of the length and the breadth. The volume is also the base area times the height, which is the form used when the base area is given.",
      "The cylinder is the solid formed by a rectangle rotating about one side, and its base is a circle. Its volume is pi times the square of the radius times the height, and its curved surface area is two pi times the radius times the height, which is the circumference of the base multiplied by the height. The total surface area adds the two circular ends, so it is the curved surface area plus two pi r squared, which simplifies to two pi r times the sum of the radius and the height.",
      "The cone is the solid with a circular base tapering to a point, and its volume is one third of the volume of a cylinder with the same base and height. The slant height, the distance from the vertex to a point on the rim of the base, is the square root of the sum of the squares of the height and the radius. The curved surface area is pi times the radius times the slant height, and the total surface area adds the base, giving pi times the radius times the sum of the slant height and the radius.",
      "The sphere is the solid every point of which is the same distance from the centre. Its volume is four thirds of pi times the cube of the radius, and its surface area is four pi times the square of the radius. A hemisphere, half a sphere, has half the volume and a curved surface area of two pi r squared; its total surface area adds the flat circular face, giving three pi r squared. The sphere questions often give the diameter, so the first step is to halve it.",
      "The constants worth memorising are the standard values that make the arithmetic clean. With pi taken as twenty-two over seven, the volume of a sphere of radius twenty-one is thirty-eight thousand eight hundred and eight cubic centimetres, and the surface area of a sphere of radius seven is six hundred and sixteen square centimetres. Recognising these values in a question saves the multiplication, and they recur because the paper prefers numbers that cancel the seven in pi.",
      "The questions on the effect of changing a dimension follow from the formulas. The volume of a sphere is proportional to the cube of the radius, so doubling the radius multiplies the volume by eight, and the surface area, being proportional to the square of the radius, is multiplied by four. For a cylinder, doubling the radius and halving the height leaves the volume doubled, because the radius appears squared. Writing the new formula beside the old one shows the factor at once.",
      "The comparison questions relate two solids. A cone, a hemisphere and a cylinder of the same base radius and the same height have volumes in the ratio one to two to three, a fact worth remembering because it is asked directly. A cylinder and a cone with the same base and height have volumes in the ratio three to one. The largest sphere that can be carved from a cube of side a has radius a over two, and the largest cube that can be cut from a sphere of radius r has edge two r over the square root of three.",
      "The cutting and melting questions rest on the conservation of volume. When a solid is melted and recast into smaller solids, the total volume is unchanged, so the number of small solids is the volume of the large one divided by the volume of one small one. When a solid is cut into smaller cubes, the number is the volume of the large solid divided by the volume of one cube, provided the dimensions divide exactly. These questions are a single division once the two volumes are written.",
      "The capacity questions convert a volume into litres. One cubic metre is a thousand litres, and one cubic centimetre is one millilitre, so a cuboidal tank of dimensions two metres by one and a half metres by one metre has a volume of three cubic metres and a capacity of three thousand litres. A cylindrical vessel of radius seven centimetres and height twenty centimetres has a volume of three thousand and eighty cubic centimetres, which is three point zero eight litres.",
      "The questions that combine a solid with a plane figure are the last family. A cylindrical vessel is a cylinder whose volume is found from the plane circle; a conical tent uses the curved surface area of the cone for the canvas; a capsule is a cylinder with two hemispherical ends. Recognising the component solids in the object, and adding their volumes or surface areas as the question requires, is the whole method for this family.",
      "Finally, the chapter rewards two habits. The first is to write the formula before substituting, so that the power of the radius or the factor of one third is not forgotten, because the commonest error in the chapter is using the volume formula of a cylinder for a cone or forgetting the factor of four thirds for a sphere. The second is to keep the units consistent, converting all the dimensions to the same unit before substituting. With these habits the mensuration questions become among the most certain in the paper.",
    ],
    as: [
      "ক্ষেত্ৰমিতি হৈছে আকৃতি জোখা অধ্যায়, আৰু ইয়াৰ ত্ৰিমাত্ৰিক অংশই ঘনবস্তুবোৰ লয়, সেইবোৰ বস্তু যাৰ দীঘ, প্ৰস্থ আৰু উচ্চতা আছে। RRB NTPC ৰ গণিত প্ৰশ্নপত্ৰত প্ৰতি বছৰে ই এটা নিৰ্ভৰযোগ্য সংখ্যক প্ৰশ্নত দেখা দিয়ে। অধ্যায়টোত অলপ সংখ্যক ঘনবস্তু আছে, প্ৰতিটোৰ দুটা সূত্ৰ, এটা আয়তনৰ আৰু এটা পৃষ্ঠকালিৰ, আৰু বেছিভাগ প্ৰশ্ন এই সূত্ৰত দিয়া জোখবোৰ বহুওৱাৰ গণনা।",
      "ঘনক হৈছে আটাইতকৈ সৰল ঘনবস্তু, যাৰ সকলো কাষ সমান। আয়তন = কাষ³, আৰু মুঠ পৃষ্ঠকালি = ৬ × কাষ², কাৰণ ঘনকৰ ছটা সমান বৰ্গাকাৰ পৃষ্ঠ আছে। ঘনকৰ কৰ্ণ = কাষ × √৩। উলটি প্ৰশ্নই আয়তন বা পৃষ্ঠকালি দি কাষ সোধে, আৰু সেয়া ঘনমূল বা বৰ্গমূল লৈ সমাধান কৰা হয়।",
      "ঘনকীয় আয়তৰ তিনিটা বেলেগ জোখ থাকে। আয়তন = তিনিওৰ গুণফল, আৰু মুঠ পৃষ্ঠকালি = ২(lb + bh + hl), কাৰণ ছটা পৃষ্ঠ তিনিযোৰ সমান আয়ত হিচাপে আহে। পাৰ্শ্ব পৃষ্ঠকালি = ২h(l + b), ওপৰ আৰু তল বাদ দি চাৰিটা কাষৰ পৃষ্ঠ। আয়তন = ভূমি কালি × উচ্চতা, যি ভূমি কালি দিয়া থাকিলে ব্যৱহাৰ কৰা ৰূপ।",
      "চিলিণ্ডাৰ হৈছে এটা বাহুৰ চাৰিওফালে ঘূৰোৱা আয়তৰ পৰা গঠিত ঘনবস্তু, আৰু তাৰ ভূমি এটা বৃত্ত। আয়তন = πr²h, আৰু বক্ৰ পৃষ্ঠকালি = 2πrh, যি ভূমিৰ পৰিধি গুণ উচ্চতা। মুঠ পৃষ্ঠকালি = 2πrh + 2πr² = 2πr(r + h), য'ত দুটা বৃত্তীয় মূৰ যোগ হয়।",
      "শঙ্কু হৈছে বৃত্তীয় ভূমিৰ পৰা এটা বিন্দুলৈ ঠেক হোৱা ঘনবস্তু, আৰু আয়তন একেই ভূমি আৰু উচ্চতাৰ চিলিণ্ডাৰৰ এক-তৃতীয়াংশ। হেলনীয়া উচ্চতা l = √(r² + h²)। বক্ৰ পৃষ্ঠকালি = πrl, আৰু মুঠ পৃষ্ঠকালি = πrl + πr² = πr(l + r)।",
      "গোলক হৈছে এনে ঘনবস্তু যাৰ প্ৰতিটো বিন্দু কেন্দ্ৰৰ পৰা একেই দূৰত্বত। আয়তন = (৪/৩)πr³, আৰু পৃষ্ঠকালি = 4πr²। অৰ্ধগোলকৰ আয়তন আধা আৰু বক্ৰ পৃষ্ঠকালি 2πr²; মুঠ পৃষ্ঠকালি = 3πr², য'ত সমতল বৃত্তীয় পৃষ্ঠ যোগ হয়। গোলকৰ প্ৰশ্নত প্ৰায়ে ব্যাস দিয়া থাকে, গতিকে প্ৰথমে আধা কৰিব লাগে।",
      "মনত ৰখাৰ যোগ্য ধ্ৰুৱকবোৰ হ'ল সেই প্ৰামাণিক মান যিবোৰে গণনা পৰিষ্কাৰ কৰে। π = ২২/৭ লৈ, ২১ ব্যাসাৰ্ধৰ গোলকৰ আয়তন ৩৮৮০৮ ঘনছে.মি., আৰু ৭ ব্যাসাৰ্ধৰ গোলকৰ পৃষ্ঠকালি ৬১৬ বৰ্গছে.মি.। এই মানবোৰ চিনি পোৱাটোৱে পূৰণ ৰাহি কৰে, আৰু প্ৰশ্নপত্ৰই সাতক কটা যোৱা সংখ্যা পছন্দ কৰাৰ বাবে এইবোৰ সঘনে আহে।",
      "জোখ সলনি কৰাৰ প্ৰভাৱৰ প্ৰশ্ন সূত্ৰৰ পৰাই ওলায়। গোলকৰ আয়তন r³ ৰ সমানুপাতত, গতিকে r দুগুণ কৰিলে আয়তন ৮ গুণ, আৰু পৃষ্ঠকালি r² ৰ সমানুপাতত, গতিকে ৪ গুণ। চিলিণ্ডাৰৰ ক্ষেত্ৰত r দুগুণ আৰু h আধা কৰিলে আয়তন দুগুণ হয়, কাৰণ r বৰ্গত আছে। নতুন সূত্ৰ পুৰণিৰ কাষত লিখিলে গুণকটো তৎক্ষণাৎ ওলায়।",
      "তুলনাৰ প্ৰশ্নই দুটা ঘনবস্তুক জড়িত কৰে। একেই ভূমি ব্যাসাৰ্ধ আৰু উচ্চতাৰ শঙ্কু, অৰ্ধগোলক আৰু চিলিণ্ডাৰৰ আয়তন ১ : ২ : ৩ অনুপাতত, যি পোনপটীয়াকৈ সোধা হয় বাবে মনত ৰখা ভাল। একেই ভূমি আৰু উচ্চতাৰ চিলিণ্ডাৰ আৰু শঙ্কুৰ আয়তন ৩ : ১। a বাহুৰ ঘনকৰ পৰা কাটিব পৰা আটাইতকৈ ডাঙৰ গোলকৰ ব্যাসাৰ্ধ a/২।",
      "কটা আৰু গলোৱা প্ৰশ্ন আয়তনৰ সংৰক্ষণৰ ওপৰত ৰয়। এটা ঘনবস্তু গলাই সৰু ঘনবস্তু বনালে মুঠ আয়তন একেই থাকে, গতিকে সৰু ঘনবস্তুৰ সংখ্যা = ডাঙৰৰ আয়তন ÷ এটা সৰুৰ আয়তন। ঘনক কাটিলে সংখ্যা = ডাঙৰৰ আয়তন ÷ এটা ঘনকৰ আয়তন, যদি জোখবোৰ শুদ্ধভাৱে ভাগ হয়। এই প্ৰশ্নবোৰ দুয়ো আয়তন লিখাৰ পিছত এটা হৰণ মাত্ৰ।",
      "ধাৰণক্ষমতাৰ প্ৰশ্নই আয়তন লিটাৰলৈ সলনি কৰে। ১ ঘনমি. = ১০০০ লিটাৰ, আৰু ১ ঘনছে.মি. = ১ মিলিলিটাৰ। ২ মি. × ১.৫ মি. × ১ মি. ঘনকীয় টেংকীৰ আয়তন ৩ ঘনমি. আৰু ধাৰণক্ষমতা ৩০০০ লিটাৰ। ৭ ছে.মি. ব্যাসাৰ্ধ আৰু ২০ ছে.মি. উচ্চতাৰ চিলিণ্ডাৰ পাত্ৰৰ আয়তন ৩০৮০ ঘনছে.মি., যি ৩.০৮ লিটাৰ।",
      "সমতল আকৃতিৰ সৈতে ঘনবস্তু লগোৱা প্ৰশ্ন শেষৰ পৰিয়াল। চিলিণ্ডাৰ পাত্ৰ এটা চিলিণ্ডাৰ যাৰ আয়তন সমতল বৃত্তৰ পৰা পোৱা যায়; শঙ্কুাকাৰ তম্বুৰ কাপোৰৰ বাবে শঙ্কুৰ বক্ৰ পৃষ্ঠকালি লাগে; কেপচুল এটা চিলিণ্ডাৰ যাৰ দুটা মূৰত অৰ্ধগোলক। বস্তুটোৰ ভিতৰত থকা ঘনবস্তুবোৰ চিনি পাই, প্ৰশ্নই বিচৰা মতে আয়তন বা পৃষ্ঠকালি যোগ কৰাটোৱেই এই পৰিয়ালৰ গোটেই পদ্ধতি।",
      "শেষত, অধ্যায়টোৱে দুটা অভ্যাসক পুৰস্কৃত কৰে। প্ৰথমটো হ'ল প্ৰতিস্থাপনৰ আগতে সূত্ৰটো লিখা, যাতে ব্যাসাৰ্ধৰ ঘাত বা এক-তৃতীয়াংশৰ গুণকটো পাহৰি নাযায়, কাৰণ অধ্যায়টোৰ আটাইতকৈ সচৰাচৰ ভুলটো হ'ল শঙ্কুৰ বাবে চিলিণ্ডাৰৰ আয়তন সূত্ৰ ব্যৱহাৰ কৰা। দ্বিতীয়টো হ'ল একক একে ৰখা। এই অভ্যাসৰ সৈতে ক্ষেত্ৰমিতিৰ প্ৰশ্নবোৰ আটাইতকৈ নিশ্চিতবোৰৰ এটা হৈ পৰে।",
      "কিছুমান প্ৰশ্নত এটা ঘনকৰ পৃষ্ঠকালি দি আয়তন সোধা হয়, বা উলটো। এনে প্ৰশ্নত প্ৰথমে পৃষ্ঠকালিৰ সূত্ৰ 6a² = S ৰ পৰা a = √(S/৬) বিচাৰি, তাৰ পিছত আয়তন a³ পোৱা যায়। যদি পৃষ্ঠকালি ১৫০ হয়, a = ৫ আৰু আয়তন ১২৫; আয়তন ৫১২ হ'লে a = ৮। এই প্ৰশ্নবোৰ দুই শাৰীত সমাধান হয়।",
      "আন এটা সচৰাচৰ ৰূপত এটা ঘনকীয় আয়তৰ আয়তন আৰু ভূমি কালি দি উচ্চতা সোধা হয়। এনে প্ৰশ্নত উচ্চতা = আয়তন ÷ ভূমি কালি। যদি আয়তন ৯০০ আৰু ভূমি ১৫ × ১০ = ১৫০ হয়, উচ্চতা = ৬ ছে.মি.। এই প্ৰশ্নবোৰত ভূমি কালি প্ৰথমে বিচৰাটোৱেই মূল, আৰু তাৰ পিছত এটা হৰণেই উত্তৰ দিয়ে।",
      "আন এটা গুৰুত্বপূৰ্ণ ৰূপ হ'ল পৃষ্ঠকালি দি চিলিণ্ডাৰৰ আয়তন বা উলটো সোধা প্ৰশ্ন। এনে প্ৰশ্নত দিয়া জোখৰ পৰা πr²h বা 2πrh লিখি অজ্ঞাতটো বিচৰা হয়। যদি ৭ ছে.মি. ব্যাসাৰ্ধ আৰু ১০ ছে.মি. উচ্চতা হয়, বক্ৰ পৃষ্ঠকালি ৪৪০ বৰ্গছে.মি. আৰু আয়তন ১৫৪০ ঘনছে.মি.। সূত্ৰ লিখি প্ৰতিস্থাপন কৰিলেই উত্তৰ নিশ্চিতভাৱে ওলায়।",
      "শেষত এটা কথা স্মৰণ কৰা ভাল: ক্ষেত্ৰমিতিৰ ত্ৰিমাত্ৰিক আৰু দ্বিমাত্ৰিক দুয়ো অংশ ঘনিষ্ঠভাৱে জড়িত, কাৰণ ঘনবস্তুৰ পৃষ্ঠসমূহ সমতল আকৃতি। গতিকে সমতল আকৃতিৰ কালি স্পষ্ট হ'লে ত্ৰিমাত্ৰিক সূত্ৰবোৰ সহজে মনত থাকে, আৰু দুয়ো অধ্যায় একেলগে চৰ্চা কৰিলে পৰীক্ষাত সময় ৰাহি হয় আৰু ভুল কমি যায়।",
      "আন এটা সচৰাচৰ ৰূপত এটা গোলক গলাই সৰু গুলি বা ঘনক বনোৱাৰ প্ৰশ্ন আহে। এনে প্ৰশ্নত প্ৰথমে ডাঙৰ গোলকৰ আয়তন (৪/৩)πr³ বিচাৰি, তাৰ পিছত এটা সৰু গুলিৰ আয়তন বিচাৰি, হৰণ কৰি সংখ্যা পোৱা যায়। ৩ ছে.মি. গোলকৰ পৰা ১ ছে.মি. গুলি ২৭ টা ওলায়, কাৰণ আয়তনৰ অনুপাত ৩³ : ১³ = ২৭ : ১।",
      "আন এটা সচৰাচৰ ৰূপ হ'ল এটা ঘনকীয় আয়তৰ পৰা শুদ্ধ জোখৰ ঘনক কাটি সংখ্যা সোধা প্ৰশ্ন। এনে প্ৰশ্নত ডাঙৰৰ আয়তনক এটা ঘনকৰ আয়তনেৰে হৰণ কৰা হয়, যদি জোখবোৰ শুদ্ধভাৱে ভাগ হয়। ৯ × ৬ × ৩ ঘনকীয় আয়তৰ পৰা ৩ ছে.মি. ঘনক ৬ টা ওলায়, কাৰণ ১৬২ ÷ ২৭ = ৬। জোখবোৰ ভাগ হয় নে নাই সেয়া প্ৰথমে চোৱা উচিত।",
      "শেষত আৰু এটা কথা: ঘনবস্তুৰ প্ৰশ্নত এককৰ পৰিৱৰ্তন প্ৰায়ে প্ৰয়োজন হয়। ১ মি. = ১০০ ছে.মি., ১ ঘনমি. = ১০ লাখ ঘনছে.মি. = ১০০০ লিটাৰ, আৰু ১ লিটাৰ = ১০০০ ঘনছে.মি.। এই ৰূপান্তৰবোৰ স্পষ্ট হ'লে ধাৰণক্ষমতা আৰু আয়তনৰ প্ৰশ্নত এককৰ ভুল নহয় আৰু উত্তৰ নিশ্চিতভাৱে ওলায়।",
    ],
  },
  list: {
    en: [
      "Cube: volume = a³; surface area = 6a²; diagonal = a√3.",
      "Cuboid: volume = l × b × h; surface area = 2(lb + bh + hl); lateral = 2h(l + b).",
      "Cylinder: volume = πr²h; curved surface = 2πrh; total = 2πr(r + h).",
      "Cone: volume = (1/3)πr²h; slant l = √(r² + h²); curved surface = πrl; total = πr(l + r).",
      "Sphere: volume = (4/3)πr³; surface area = 4πr².",
      "Hemisphere: volume = (2/3)πr³; curved surface = 2πr²; total = 3πr².",
      "Cone : hemisphere : cylinder (equal base and height) = 1 : 2 : 3.",
      "Cylinder : cone (equal base and height) = 3 : 1.",
      "1 m³ = 1000 litres; 1 litre = 1000 cm³.",
      "Melting or recasting keeps the total volume unchanged.",
    ],
    as: [
      "ঘনক: আয়তন = a³; পৃষ্ঠকালি = 6a²; কৰ্ণ = a√৩।",
      "ঘনকীয় আয়ত: আয়তন = l × b × h; পৃষ্ঠকালি = ২(lb + bh + hl); পাৰ্শ্ব = ২h(l + b)।",
      "চিলিণ্ডাৰ: আয়তন = πr²h; বক্ৰ পৃষ্ঠ = 2πrh; মুঠ = 2πr(r + h)।",
      "শঙ্কু: আয়তন = (১/৩)πr²h; হেলনীয়া l = √(r² + h²); বক্ৰ পৃষ্ঠ = πrl; মুঠ = πr(l + r)।",
      "গোলক: আয়তন = (৪/৩)πr³; পৃষ্ঠকালি = 4πr²।",
      "অৰ্ধগোলক: আয়তন = (২/৩)πr³; বক্ৰ পৃষ্ঠ = 2πr²; মুঠ = 3πr²।",
      "শঙ্কু : অৰ্ধগোলক : চিলিণ্ডাৰ (সমান ভূমি আৰু উচ্চতা) = ১ : ২ : ৩।",
      "চিলিণ্ডাৰ : শঙ্কু (সমান ভূমি আৰু উচ্চতা) = ৩ : ১।",
      "১ ঘনমি. = ১০০০ লিটাৰ; ১ লিটাৰ = ১০০০ ঘনছে.মি.।",
      "গলোৱা বা পুনৰ ঢালাই কৰিলে মুঠ আয়তন অপৰিৱৰ্তিত থাকে।",
    ],
  },
  faqs: [
    {
      q: { en: "How do I remember the volume formulas of a cylinder and a cone?", as: "চিলিণ্ডাৰ আৰু শঙ্কুৰ আয়তন সূত্ৰ কেনেকৈ মনত ৰাখিম?" },
      a: {
        en: "The cylinder is πr²h, the base area times the height. The cone is exactly one third of that, (1/3)πr²h, because a cone fits three times into a cylinder of the same base and height. Their volumes are therefore in the ratio 3 : 1.",
        as: "চিলিণ্ডাৰ = πr²h, ভূমি কালি গুণ উচ্চতা। শঙ্কু তাৰ এক-তৃতীয়াংশ, (১/৩)πr²h, কাৰণ একেই ভূমি আৰু উচ্চতাৰ চিলিণ্ডাৰত শঙ্কু তিনিবাৰ সোমায়। গতিকে সিহঁতৰ আয়তনৰ অনুপাত ৩ : ১।",
      },
    },
    {
      q: { en: "What happens to the volume of a sphere if its radius is doubled?", as: "গোলকৰ ব্যাসাৰ্ধ দুগুণ কৰিলে আয়তনৰ কি হয়?" },
      a: {
        en: "The volume becomes eight times, because the volume is proportional to the cube of the radius. The surface area, being proportional to the square of the radius, becomes four times.",
        as: "আয়তন আঠগুণ হয়, কাৰণ আয়তন ব্যাসাৰ্ধৰ ঘনৰ সমানুপাতত। পৃষ্ঠকালি ব্যাসাৰ্ধৰ বৰ্গৰ সমানুপাতত, গতিকে চাৰিগুণ হয়।",
      },
    },
    {
      q: { en: "How do I convert a volume into litres?", as: "আয়তন কেনেকৈ লিটাৰলৈ সলনি কৰিম?" },
      a: {
        en: "One cubic metre is 1000 litres and one cubic centimetre is one millilitre, so one litre is 1000 cubic centimetres. A tank of volume 3 m³ therefore holds 3000 litres, and a vessel of 3080 cm³ holds 3.08 litres.",
        as: "১ ঘনমি. = ১০০০ লিটাৰ আৰু ১ ঘনছে.মি. = ১ মিলিলিটাৰ, গতিকে ১ লিটাৰ = ১০০০ ঘনছে.মি.। ৩ ঘনমি. আয়তনৰ টেংকীত ৩০০০ লিটাৰ ধৰে, আৰু ৩০৮০ ঘনছে.মি.ৰ পাত্ৰত ৩.০৮ লিটাৰ ধৰে।",
      },
    },
    {
      q: { en: "How do I find the number of small solids formed by melting a large one?", as: "ডাঙৰ এটা ঘনবস্তু গলাই কিমান সৰু ঘনবস্তু হয় কেনেকৈ বিচাৰিম?" },
      a: {
        en: "Melting keeps the total volume unchanged, so divide: number = volume of the large solid ÷ volume of one small solid. A sphere of radius 3 cm gives 27 spheres of radius 1 cm, since the volume ratio is 27 : 1.",
        as: "গলালে মুঠ আয়তন অপৰিৱৰ্তিত থাকে, গতিকে হৰণ কৰক: সংখ্যা = ডাঙৰ ঘনবস্তুৰ আয়তন ÷ এটা সৰু ঘনবস্তুৰ আয়তন। ৩ ছে.মি. ব্যাসাৰ্ধৰ গোলকে ১ ছে.মি. ব্যাসাৰ্ধৰ ২৭ টা গোলক দিয়ে, কাৰণ আয়তনৰ অনুপাত ২৭ : ১।",
      },
    },
    {
      q: { en: "How do I find the slant height of a cone?", as: "শঙ্কুৰ হেলনীয়া উচ্চতা কেনেকৈ বিচাৰিম?" },
      a: {
        en: "The slant height, the height and the radius form a right triangle with the slant height as hypotenuse, so slant = √(r² + h²). For radius 7 cm and height 24 cm the slant height is √(49 + 576) = 25 cm.",
        as: "হেলনীয়া উচ্চতা, উচ্চতা আৰু ব্যাসাৰ্ধে এটা সমকোণী ত্ৰিভুজ গঠন কৰে যাৰ কৰ্ণ হেলনীয়া উচ্চতা, গতিকে l = √(r² + h²)। ৭ ছে.মি. ব্যাসাৰ্ধ আৰু ২৪ ছে.মি. উচ্চতাৰ বাবে l = √(৪৯ + ৫৭৬) = ২৫ ছে.মি.।",
      },
    },
  ],
};
