export type HabbaProduct = {
  slug: string;
  titleAr: string;
  titleEn: string;
  category: 'Bracelet' | 'Necklace' | 'Set' | 'Accessory';
  collection: string;
  collectionAr: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  featured: boolean;
};

export const whatsappNumber = '201011549509';

export const launchProducts: HabbaProduct[] = [
  { slug: 'colorful-star-set', titleAr: 'طقم نجوم ملوّن', titleEn: 'Colorful Star Set', category: 'Set', collection: 'Colorful Star Collection', collectionAr: 'كولرفل ستار', image: '/images/habba/products/hbb-colorful-star-set-card.png', descriptionAr: 'طقم خرز ملوّن وخفيف بتفاصيل نجوم مرحة مناسب للبس اليومي.', descriptionEn: 'A lightweight colorful bead set with playful star details.', featured: true },
  { slug: 'green-speckle-bracelet', titleAr: 'إسورة جرين سبيكل', titleEn: 'Green Speckle Bracelet', category: 'Bracelet', collection: 'Green Mood Collection', collectionAr: 'جرين مود', image: '/images/habba/products/hbb-green-speckle-bracelet-card.png', descriptionAr: 'درجات أخضر هادية بإحساس clean وfresh للبس اليومي.', descriptionEn: 'Calm green tones with a clean fresh everyday mood.', featured: true },
  { slug: 'lavender-rose-bracelet', titleAr: 'إسورة لافندر روز', titleEn: 'Lavender Rose Bracelet', category: 'Bracelet', collection: 'Cute Gift Collection', collectionAr: 'هدايا صغيرة', image: '/images/habba/products/hbb-lavender-rose-bracelet-card.png', descriptionAr: 'قطعة ناعمة ولطيفة كهدية بسيطة ومبهجة.', descriptionEn: 'A soft and sweet bracelet that feels gift-ready.', featured: true },
  { slug: 'blue-star-heishi-bracelet', titleAr: 'إسورة بلو ستار', titleEn: 'Blue Star Heishi Bracelet', category: 'Bracelet', collection: 'Colorful Star Collection', collectionAr: 'كولرفل ستار', image: '/images/habba/products/hbb-blue-star-heishi-bracelet-card.png', descriptionAr: 'نجوم صغيرة بدرجات أزرق منعشة وخفيفة.', descriptionEn: 'Small star details in fresh blue tones.', featured: true },
  { slug: 'aqua-speckle-bracelet', titleAr: 'إسورة أكوا سبيكل', titleEn: 'Aqua Speckle Bracelet', category: 'Bracelet', collection: 'Green Mood Collection', collectionAr: 'جرين مود', image: '/images/habba/products/hbb-aqua-speckle-bracelet-card.png', descriptionAr: 'ألوان أكوا مريحة وتفاصيل بسيطة بروح مرحة.', descriptionEn: 'Relaxed aqua tones with simple playful details.', featured: true },
  { slug: 'pink-smiley-bracelet', titleAr: 'إسورة بينك سمايلي', titleEn: 'Pink Smiley Bracelet', category: 'Bracelet', collection: 'Cute Gift Collection', collectionAr: 'هدايا صغيرة', image: '/images/habba/products/hbb-pink-smiley-bracelet-card.png', descriptionAr: 'تفصيلة سمايلي لطيفة مع بينك خفيف ومبهج.', descriptionEn: 'A tiny smiley detail in soft cheerful pink.', featured: true },
  { slug: 'pastel-candy-bracelet', titleAr: 'إسورة باستيل كاندي', titleEn: 'Pastel Candy Bracelet', category: 'Bracelet', collection: 'Cute Gift Collection', collectionAr: 'هدايا صغيرة', image: '/images/habba/products/hbb-pastel-candy-bracelet-card.png', descriptionAr: 'ألوان باستيل حلوة لقطعة خفيفة وسهلة التحب.', descriptionEn: 'Sweet pastel tones in an easy-to-love bracelet.', featured: true },
  { slug: 'colorful-flower-bracelet', titleAr: 'إسورة ورد ملوّنة', titleEn: 'Colorful Flower Bracelet', category: 'Bracelet', collection: 'Colorful Star Collection', collectionAr: 'كولرفل ستار', image: '/images/habba/products/hbb-colorful-flower-bracelet-card.png', descriptionAr: 'تفاصيل زهور ملوّنة تضيف بهجة بسيطة لأي لوك.', descriptionEn: 'Colorful flower details that brighten everyday looks.', featured: true },
  { slug: 'green-flower-necklace', titleAr: 'عقد ورد أخضر', titleEn: 'Green Flower Necklace', category: 'Necklace', collection: 'Green Mood Collection', collectionAr: 'جرين مود', image: '/images/habba/products/hbb-green-flower-necklace-card.png', descriptionAr: 'عقد خرز خفيف بدرجات أخضر وورود بسيطة.', descriptionEn: 'A light beaded necklace with green floral touches.', featured: false },
  { slug: 'white-daisy-smile-necklace', titleAr: 'عقد ديزي وسمايل', titleEn: 'White Daisy Smile Necklace', category: 'Necklace', collection: 'Cute Gift Collection', collectionAr: 'هدايا صغيرة', image: '/images/habba/products/hbb-white-daisy-smile-necklace-card.png', descriptionAr: 'عقد لطيف بتفاصيل ديزي وسمايل لروح مرحة وناعمة.', descriptionEn: 'A cute daisy and smile detail necklace.', featured: false },
  { slug: 'red-flower-necklace', titleAr: 'عقد ورد أحمر', titleEn: 'Red Flower Necklace', category: 'Necklace', collection: 'Colorful Star Collection', collectionAr: 'كولرفل ستار', image: '/images/habba/products/hbb-red-flower-necklace-card.png', descriptionAr: 'عقد خرز ملوّن بتفاصيل ورد أحمر واضحة ومبهجة.', descriptionEn: 'A colorful beaded necklace with red flower accents.', featured: false },
  { slug: 'sage-neutral-bracelet', titleAr: 'إسورة سيج نيوترل', titleEn: 'Sage Neutral Bracelet', category: 'Bracelet', collection: 'Green Mood Collection', collectionAr: 'جرين مود', image: '/images/habba/products/hbb-sage-neutral-bracelet-card.png', descriptionAr: 'ألوان هادية ومحايدة مناسبة لكل يوم.', descriptionEn: 'Neutral sage tones made for daily wear.', featured: false }
];

export const createWhatsAppLink = (productNameAr: string) => {
  const msg = `أهلًا، حابة أسأل عن ${productNameAr} — هل متاحة؟ وسعرها كام؟`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
