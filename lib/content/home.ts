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

export type Pillar = {
  id: PillarId;
  name: string;
  scope: string;
  description: string;
  /** Short labels for compact views such as the problem/solution diagram. */
  tags: string[];
  /** Full sub-service list for the architecture cards. */
  services: string[];
};

export type ComparisonRow = {
  criterion: string;
  traditional: string;
  badi: string;
};

// DRAFT: descriptions and services are placeholders until the client's original copy arrives.
export const pillars: Pillar[] = [
  {
    id: "administration",
    name: "Administration",
    scope: "Operasyon",
    description: "Satışın arka planını yönetir. Siparişten teslimata her adım takip edilir.",
    tags: ["Pazar yerleri", "Sipariş ve stok", "Müşteri hizmetleri"],
    services: [
      "Pazar yeri yönetimi",
      "Sipariş ve stok yönetimi",
      "Kargo ve iade süreçleri",
      "Müşteri hizmetleri",
    ],
  },
  {
    id: "development",
    name: "Development",
    scope: "Pazarlama / Büyüme",
    description: "Trafiği satışa, satışı tekrar eden müşteriye çevirir.",
    tags: ["Reklam", "CRM", "İçerik"],
    services: [
      "Performans reklamları",
      "CRM ve e-posta pazarlaması",
      "İçerik ve sosyal medya",
      "Dönüşüm oranı optimizasyonu",
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    scope: "Teknoloji / Altyapı",
    description: "Satışın üzerinde durduğu zemini kurar ve ayakta tutar.",
    tags: ["Web sitesi", "Entegrasyonlar", "Veri"],
    services: [
      "E-ticaret sitesi kurulumu ve geliştirme",
      "Pazar yeri ve ERP entegrasyonları",
      "Veri, raporlama ve dashboard",
      "Hız, güvenlik ve bakım",
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
  traditionalLabel: "Geleneksel ajans",
  badiLabel: "BADİ",
  // DRAFT: cell copy is a placeholder until the client's original table arrives.
  rows: [
    {
      criterion: "Sorumluluk Alanı",
      traditional: "Tek bir alan. Ya reklam ya yazılım.",
      badi: "Uçtan uca. Operasyon, pazarlama ve altyapı tek ekipte.",
    },
    {
      criterion: "Odak Noktası",
      traditional: "Tıklama, gösterim ve teslim edilen iş.",
      badi: "Ciro, kârlılık ve büyüme hızı.",
    },
    {
      criterion: "Teknoloji & Operasyon",
      traditional: "Kapsam dışı. Başka tedarikçiye bırakılır.",
      badi: "Kendi ekibimiz kurar, entegre eder ve işletir.",
    },
    {
      criterion: "İş Ortaklığı Modeli",
      traditional: "Hizmet sağlayıcı. İş teslim edilir, sonuç müşteride kalır.",
      badi: "Dışarıdan departman. Ortak hedef, tek rapor, tek muhatap.",
    },
  ] satisfies ComparisonRow[],
};

export type ProgramPhase = {
  name: string;
  startDay: number;
  endDay: number;
  summary: string;
  deliverables: string[];
};

export const program = {
  eyebrow: "Nasıl çalışıyoruz",
  title: "90 Günlük Program",
  body: "Üç faz, net çıktılar. Her fazın sonunda neyin değiştiğini rakamla görürsünüz.",
  totalDays: 90,
  // DRAFT: summaries and deliverables await the client's original copy.
  phases: [
    {
      name: "Analiz & Teşhis",
      startDay: 0,
      endDay: 30,
      summary: "Mevcut durumu rakamlarla çıkarırız. Nerede para kaybettiğinizi netleştiririz.",
      deliverables: ["Dijital Röntgen raporu", "Kanal ve maliyet analizi", "90 günlük hedefler ve KPI'lar"],
    },
    {
      name: "Aktivasyon & Satış",
      startDay: 30,
      endDay: 60,
      summary: "Planı sahaya indiririz. İlk satış etkisi bu fazda görülür.",
      deliverables: ["Reklam ve kampanya kurulumu", "Site ve pazar yeri düzenlemeleri", "Performans takibinin başlaması"],
    },
    {
      name: "Optimizasyon & Scale",
      startDay: 60,
      endDay: 90,
      summary: "Çalışanı büyütür, çalışmayanı keseriz. Bütçe sonuca göre yeniden dağılır.",
      deliverables: ["Bütçe ve kanal optimizasyonu", "Dönüşüm testleri", "Ölçekleme planı"],
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
