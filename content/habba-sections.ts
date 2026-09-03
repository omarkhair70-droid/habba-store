export type HabbaCollectionCard = {
  key: 'green-mood' | 'cute-gift' | 'sets';
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const habbaCollections: HabbaCollectionCard[] = [
  {
    key: 'green-mood',
    href: '/shop?filter=green-mood',
    title: 'قطع يومية',
    description: 'أساور وعقود بسيطة وسهلة اللبس.',
    image: '/images/habba/products/hbb-green-flower-necklace-card.png',
    imageAlt: 'Green Mood collection'
  },
  {
    key: 'cute-gift',
    href: '/shop?filter=cute-gift',
    title: 'هدايا صغيرة',
    description: 'اختيارات لطيفة للهدايا البسيطة.',
    image: '/images/habba/products/hbb-pink-smiley-bracelet-card.png',
    imageAlt: 'Cute Gift collection'
  },
  {
    key: 'sets',
    href: '/shop?filter=sets',
    title: 'أطقم مبهجة',
    description: 'أطقم خرز خفيفة بتفاصيل مرحة.',
    image: '/images/habba/products/hbb-colorful-star-set-card.png',
    imageAlt: 'Colorful Star collection'
  }
];

export const habbaOrderSteps = ['اختاري القطعة', 'اضغطي اسأل على واتساب', 'نأكد التوفر والتفاصيل', 'نتفق على الاستلام أو التوصيل'] as const;

export const habbaTrustNotes = [
  'كل قطعة handmade',
  'التوفر حسب الخامات المتاحة',
  'الألوان ممكن تختلف اختلاف بسيط حسب الإضاءة',
  'الطلب حاليًا عبر واتساب فقط'
] as const;

export const habbaBrandTags = ['handmade', 'ألوان خفيفة', 'مناسبة كهدايا بسيطة'] as const;
