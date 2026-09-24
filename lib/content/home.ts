// User-facing copy for the home page. Turkish only.

export type HeadlineOption = {
  lead: string;
  trail: string;
};

export type Stat = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  unit?: string;
};

export type PainPoint = {
  title: string;
  body: string;
  pillar: string;
};

export type Pillar = {
  name: string;
  scope: string;
  items: string[];
};

// Headline candidates awaiting approval. `hero.headline` uses the first one.
export const heroHeadlineOptions: HeadlineOption[] = [
  {
    lead: "Tam kapsamlı dijital ticaret departmanınız.",
    trail: "Dışarıdan yönetilir, içeriden çalışır.",
  },
  {
    lead: "E-ticaret departmanı kurmayın.",
    trail: "Tam kapsamlısını dışarıdan alın.",
  },
  {
    lead: "Operasyon, pazarlama, altyapı.",
    trail: "Tek ekipten yönetilen dijital ticaret departmanınız.",
  },
];

export const hero = {
  eyebrow: "Dijital ticaret hızlandırıcı",
  headline: heroHeadlineOptions[0],
  subtitle: "Operasyonu, büyümeyi ve altyapıyı tek ekip ve tek raporla yönetiyoruz.",
  cta: { label: "Ücretsiz Dijital Röntgen Al", href: "/#iletisim" },
  statsTitle: "Rakamlarla BADİ",
  // PLACEHOLDER: replace with verified figures before launch.
  stats: [
    { label: "Yönetilen toplam reklam bütçesi", value: 120, unit: "milyon ₺" },
    { label: "Ortalama ciro artışı", value: 38, prefix: "%" },
    { label: "Aktif müşteri", value: 46 },
  ] satisfies Stat[],
};

export const problemSolution = {
  eyebrow: "Geleneksel yaklaşım",
  title: "Üç ayrı ekip. Üç ayrı rapor. Tek sorumlu yok.",
  body: "Çoğu marka e-ticareti parça parça yönetir. Herkes kendi işine bakar. Bütün resmi gören kimse yoktur.",
  painPoints: [
    {
      title: "Kopuk yazılımcı",
      body: "Site değişikliği haftalar sürer. Kampanya takviminden habersizdir.",
      pillar: "Infrastructure",
    },
    {
      title: "Ayrı reklam ajansı",
      body: "Bütçeyi harcar. Stoktan ve kârlılıktan habersizdir.",
      pillar: "Development",
    },
    {
      title: "Ayrı pazar yeri yönetimi",
      body: "Her kanal ayrı panelde, ayrı fiyatla, ayrı raporla yürür.",
      pillar: "Administration",
    },
  ] satisfies PainPoint[],
  diagram: {
    eyebrow: "BADİ Mimarisi",
    title: "Üç iş, tek çatı altında.",
    input: "Markanız",
    roofTag: "Tek çatı",
    pillars: [
      {
        name: "Administration",
        scope: "Operasyon",
        items: ["Pazar yerleri", "Sipariş ve stok", "Müşteri hizmetleri"],
      },
      {
        name: "Development",
        scope: "Pazarlama / Büyüme",
        items: ["Reklam", "CRM", "İçerik"],
      },
      {
        name: "Infrastructure",
        scope: "Teknoloji / Altyapı",
        items: ["Web sitesi", "Entegrasyonlar", "Veri"],
      },
    ] satisfies Pillar[],
    outputs: ["Tek ekip", "Tek rapor", "Tek sorumlu"],
  },
};
