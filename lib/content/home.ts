// User-facing copy for the home page. Turkish only.

export type Headline = {
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

export type PillarId = "administration" | "development" | "infrastructure";

export type PillarService = {
  title: string;
  body: string;
};

export type Pillar = {
  id: PillarId;
  name: string;
  scope: string;
  services: PillarService[];
};

export type ComparisonRow = {
  criterion: string;
  traditional: string;
  badi: string;
};

export const pillars: Pillar[] = [
  {
    id: "administration",
    name: "Administration",
    scope: "Ticari Yönetim & Operasyon",
    services: [
      {
        title: "Pazar Yeri Yönetimi",
        body: "Trendyol, Hepsiburada, Amazon gibi kanallarda mağaza kurulumu, liste optimizasyonu, satış stratejileri.",
      },
      {
        title: "CRM & Müşteri Operasyonu",
        body: "Müşteri sadakati oluşturma, tekrarlayan satış kurguları, sipariş süreçlerinin takibi.",
      },
      {
        title: "Ticari Strateji & Raporlama",
        body: "Büyüme hedeflerine uygun iş geliştirme, stok-satış analizi, düzenli şeffaf raporlama.",
      },
    ],
  },
  {
    id: "development",
    name: "Development",
    scope: "Pazarlama & Büyüme",
    services: [
      {
        title: "Performans Pazarlaması",
        body: "Meta ve Google Ads hesaplarının satışa dönüşecek şekilde kurgulanması ve yönetimi.",
      },
      {
        title: "Arama Motoru & İçerik",
        body: "SEO, e-posta/SMS pazarlama otomasyonları, dönüşüm odaklı kampanya kurguları (CRO).",
      },
      {
        title: "Pazar Genişletme",
        body: "Yeni müşteri kitlelerinin tespiti, marka konumlandırması, e-ihracat stratejileri.",
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    scope: "Teknoloji & Altyapı",
    services: [
      {
        title: "E-Ticaret Sistemleri",
        body: "Yüksek dönüşüm oranlı modern web sitesi ve e-ticaret altyapısı kurulumu.",
      },
      {
        title: "Entegrasyonlar",
        body: "ERP, CRM, ödeme sistemleri, kargo ve pazar yeri API entegrasyonları.",
      },
      {
        title: "Merkezi Kontrol Paneli (BADİ Dashboard)",
        body: "Tüm satış kanallarının, reklam harcamalarının (ROAS/CPA) ve stok durumunun tek ekrandan takibi.",
      },
    ],
  },
];

export const hero = {
  eyebrow: "Dijital ticaret hızlandırıcı",
  headline: {
    lead: "Tam kapsamlı dijital ticaret departmanınız.",
    trail: "Dışarıdan yönetilir, içeriden çalışır.",
  } satisfies Headline,
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
    pillars,
    outputs: ["Tek ekip", "Tek rapor", "Tek sorumlu"],
  },
};

export const architecture = {
  eyebrow: "Hizmetler",
  title: "BADİ Mimarisi",
  body: "Üç sütun, tek ekip. Her sütun kendi işini yapar, hepsi aynı hedefe bağlanır.",
  hub: "BADİ",
  pillars,
};

export const comparison = {
  eyebrow: "Karşılaştırma",
  title: "Neden Geleneksel Ajanslar Değil de BADİ?",
  criterionLabel: "Kriter",
  traditionalLabel: "Geleneksel Ajanslar",
  badiLabel: "BADİ",
  rows: [
    {
      criterion: "Sorumluluk Alanı",
      traditional: "Sadece web sitesi yapar veya reklam yayınlar",
      badi: "Tüm dijital ticaret departmanınızı uçtan uca yönetir",
    },
    {
      criterion: "Odak Noktası",
      traditional: "Tıklama, gösterim ve soyut raporlar",
      badi: "Net Satış, Ciro Artışı ve Sürdürülebilir Büyüme",
    },
    {
      criterion: "Teknoloji & Operasyon",
      traditional: "Altyapı ve pazar yeri sorunlarına karışmaz",
      badi: "Entegrasyon, ERP, pazar yeri ve yazılım altyapısını çözer",
    },
    {
      criterion: "İş Ortaklığı Modeli",
      traditional: "Müşteri-Tedarikçi ilişkisi",
      badi: "Büyümeden pay alan, aynı hedef için çalışan stratejik ortak",
    },
  ] satisfies ComparisonRow[],
};

export type ProgramPhase = {
  name: string;
  startDay: number;
  endDay: number;
  summary: string;
};

export const program = {
  eyebrow: "Nasıl çalışıyoruz",
  title: "90 Günlük Program",
  body: "Üç faz, net çıktılar. Her fazın sonunda neyin değiştiğini rakamla görürsünüz.",
  totalDays: 90,
  phases: [
    {
      name: "Analiz & Teşhis",
      startDay: 0,
      endDay: 30,
      summary:
        "İşletmenin dijital röntgenini çekme; web altyapısı, veri takip kodları, reklam hesapları ve satış kanallarının eksiksiz kurulumu.",
    },
    {
      name: "Aktivasyon & Satış",
      startDay: 30,
      endDay: 60,
      summary:
        "Performans pazarlamasını ve satış kanallarını devreye alarak ilk ciro sıçramasını gerçekleştirme.",
    },
    {
      name: "Optimizasyon & Scale",
      startDay: 60,
      endDay: 90,
      summary:
        "Verilerle sistemi optimize etme; pazar yerleri, entegrasyonlar ve otomasyonlarla ölçeklenebilir satış makinesine dönüştürme.",
    },
  ] satisfies ProgramPhase[],
};

export type CaseMetric = {
  label: string;
  before: number;
  after: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Which direction counts as an improvement. */
  better: "higher" | "lower";
};

export type CaseStudy = {
  client: string;
  sector: string;
  title: string;
  period: string;
  metrics: CaseMetric[];
};

export const results = {
  eyebrow: "Sonuçlar",
  title: "Önce ve sonra, rakamlarla.",
  body: "Her vaka aynı soruyu cevaplar: 90 günün sonunda ne değişti?",
  // PLACEHOLDER: client names and every figure are examples until real cases are provided.
  cases: [
    {
      client: "Müşteri A",
      sector: "Moda & Giyim",
      title: "ROAS 2,3 katına çıktı.",
      period: "90 gün",
      metrics: [
        { label: "ROAS", before: 1.8, after: 4.2, decimals: 1, suffix: "x", better: "higher" },
        { label: "Aylık sipariş", before: 1240, after: 3180, better: "higher" },
      ],
    },
    {
      client: "Müşteri B",
      sector: "Kozmetik",
      title: "Dönüşüm oranı iki katını geçti.",
      period: "90 gün",
      metrics: [
        { label: "Dönüşüm oranı", before: 1.2, after: 2.7, decimals: 1, prefix: "%", better: "higher" },
        { label: "Sepet ortalaması", before: 420, after: 585, suffix: " ₺", better: "higher" },
      ],
    },
    {
      client: "Müşteri C",
      sector: "Ev & Yaşam",
      title: "Sipariş başı reklam maliyeti yarıya indi.",
      period: "90 gün",
      metrics: [
        { label: "Sipariş başı maliyet", before: 142, after: 68, suffix: " ₺", better: "lower" },
        { label: "Aktif satış kanalı", before: 1, after: 4, better: "higher" },
      ],
    },
  ] satisfies CaseStudy[],
};

export const dashboardShowcase = {
  eyebrow: "BADİ Dashboard",
  title: "Tüm kanallarınız tek ekranda",
  body: "Pazar yerleri, web sitesi ve reklam hesapları tek panelde. Herkes aynı rakama bakar.",
  note: "Görseldeki veriler örnektir.",
};

export const finalCta = {
  title: "Dijital Ticaretinizi Hızlandırmaya Hazır mısınız?",
  body: "Dijital Röntgen ile kanallarınızı, maliyetlerinizi ve büyüme fırsatlarınızı rakamlarla görün.",
  cta: "Ücretsiz Dijital Röntgen Al",
  fineprint: ["Ücretsiz", "Bağlayıcı değil"],
};
