const launchProducts = [
  {
    id: "colorful-star-set",
    titleAr: "طقم نجوم ملوّن",
    titleEn: "Colorful Star Set",
    category: "Set",
    collection: "Colorful Star Collection",
    collectionAr: "كولرفل ستار",
    image: "/images/habba/products/hbb-colorful-star-set-card.png",
    descriptionAr: "طقم خرز ملوّن بتفاصيل نجوم مرحة، خفيف ومناسب للطلعات اليومية والهدايا اللطيفة.",
    descriptionEn: "A playful colorful bead set with star details, light for everyday wear and gifting.",
    featured: true
  },
  {
    id: "green-speckle-bracelet",
    titleAr: "إسورة جرين سبيكل",
    titleEn: "Green Speckle Bracelet",
    category: "Bracelet",
    collection: "Green Mood Collection",
    collectionAr: "جرين مود",
    image: "/images/habba/products/hbb-green-speckle-bracelet-card.png",
    descriptionAr: "إسورة بدرجات أخضر هادية تعطي إحساس fresh وسهل تنسيقها يوميًا.",
    descriptionEn: "A calm green-toned bracelet with a fresh everyday mood.",
    featured: true
  },
  {
    id: "lavender-rose-bracelet",
    titleAr: "إسورة لافندر روز",
    titleEn: "Lavender Rose Bracelet",
    category: "Bracelet",
    collection: "Cute Gift Collection",
    collectionAr: "هدايا صغيرة",
    image: "/images/habba/products/hbb-lavender-rose-bracelet-card.png",
    descriptionAr: "إسورة ناعمة بألوان لافندر لطيفة، مناسبة كهدية بسيطة ومبهجة.",
    descriptionEn: "A soft lavender bracelet made to feel sweet and gift-ready.",
    featured: true
  },
  {
    id: "aqua-speckle-bracelet",
    titleAr: "إسورة أكوا سبيكل",
    titleEn: "Aqua Speckle Bracelet",
    category: "Bracelet",
    collection: "Green Mood Collection",
    collectionAr: "جرين مود",
    image: "/images/habba/products/hbb-aqua-speckle-bracelet-card.png",
    descriptionAr: "تفاصيل أكوا خفيفة مع خرز بسيط لستايل clean ومرح.",
    descriptionEn: "Light aqua details and simple beads for a clean playful look.",
    featured: true
  },
  {
    id: "pastel-candy-bracelet",
    titleAr: "إسورة باستيل كاندي",
    titleEn: "Pastel Candy Bracelet",
    category: "Bracelet",
    collection: "Cute Gift Collection",
    collectionAr: "هدايا صغيرة",
    image: "/images/habba/products/hbb-pastel-candy-bracelet-card.png",
    descriptionAr: "ألوان باستيل مبهجة بتفصيلة مرحة، خفيفة وريحة هدية جميلة.",
    descriptionEn: "Pastel playful tones in a light bracelet perfect for gifting.",
    featured: true
  },
  {
    id: "pink-smiley-bracelet",
    titleAr: "إسورة بينك سمايلي",
    titleEn: "Pink Smiley Bracelet",
    category: "Bracelet",
    collection: "Cute Gift Collection",
    collectionAr: "هدايا صغيرة",
    image: "/images/habba/products/hbb-pink-smiley-bracelet-card.png",
    descriptionAr: "سمايلي صغيرة مع درجات بينك لطيفة تضيف روح playful بدون مبالغة.",
    descriptionEn: "Tiny smiley details with pink tones for an easy playful feel.",
    featured: true
  },
  {
    id: "blue-star-heishi-bracelet",
    titleAr: "إسورة بلو ستار",
    titleEn: "Blue Star Heishi Bracelet",
    category: "Bracelet",
    collection: "Colorful Star Collection",
    collectionAr: "كولرفل ستار",
    image: "/images/habba/products/hbb-blue-star-heishi-bracelet-card.png",
    descriptionAr: "إسورة نجوم بدرجات أزرق منعشة، مناسبة للبس اليومي الخفيف.",
    descriptionEn: "Blue star bracelet with a fresh, lightweight everyday vibe.",
    featured: true
  },
  {
    id: "colorful-flower-bracelet",
    titleAr: "إسورة ورد ملوّنة",
    titleEn: "Colorful Flower Bracelet",
    category: "Bracelet",
    collection: "Colorful Star Collection",
    collectionAr: "كولرفل ستار",
    image: "/images/habba/products/hbb-colorful-flower-bracelet-card.png",
    descriptionAr: "ألوان زهور ملوّنة وتفاصيل مرحة لقطعة تفرّح أي إطلالة يومية.",
    descriptionEn: "Colorful flower details that brighten simple everyday outfits.",
    featured: true
  }
];

const whatsappNumber = "20XXXXXXXXXX";

function buildWhatsAppLink(productNameAr) {
  const message = `أهلًا، حابة أسأل عن ${productNameAr} — هل متاحة؟ وسعرها كام؟`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
