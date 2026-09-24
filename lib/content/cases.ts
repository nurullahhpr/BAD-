import type { PillarId } from "@/lib/content/home";

// PLACEHOLDER: every client, sector, text and figure in this file is an example.
// Replace with verified cases before launch. Chart series are derived from the
// numbers below so a card and its detail page never disagree.

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

export type StrategyStep = {
  pillar: PillarId;
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  sector: Sector;
  title: string;
  period: string;
  summary: string;
  metrics: CaseMetric[];
  problem: string[];
  solution: string[];
  strategy: StrategyStep[];
  /** Monthly orders and average basket, three months before and three after the start. */
  series: { ordersBefore: number; ordersAfter: number; basketBefore: number; basketAfter: number };
};

export const sectors = ["Elektronik", "Kozmetik", "Gıda", "Moda & Giyim", "Ev & Yaşam"] as const;
export type Sector = (typeof sectors)[number];

export const cases: CaseStudy[] = [
  {
    slug: "musteri-a",
    client: "Müşteri A",
    sector: "Moda & Giyim",
    title: "ROAS 2,3 katına çıktı.",
    period: "90 gün",
    summary: "Dağınık reklam hesapları tek yapıya toplandı. Bütçe kârlı kampanyalara kaydı.",
    metrics: [
      { label: "ROAS", before: 1.8, after: 4.2, decimals: 1, suffix: "x", better: "higher" },
      { label: "Aylık sipariş", before: 1240, after: 3180, better: "higher" },
    ],
    problem: [
      "Reklam bütçesi üç ayrı hesapta, ortak bir hedef olmadan harcanıyordu.",
      "Dönüşüm ölçümü eksikti. Hangi kampanyanın satış getirdiği bilinmiyordu.",
    ],
    solution: [
      "Ölçüm altyapısı yeniden kuruldu. Tüm kampanyalar tek hesap yapısında toplandı.",
      "Bütçe, ROAS hedefini tutan kampanyalara haftalık olarak kaydırıldı.",
    ],
    strategy: [
      { pillar: "infrastructure", title: "Ölçüm kurulumu", body: "Piksel ve Conversions API ile satışlar doğru kanala yazıldı." },
      { pillar: "development", title: "Kampanya yapısı", body: "Meta Ads ve Google Ads hesapları ürün gruplarına göre yeniden kuruldu." },
      { pillar: "administration", title: "Stok uyumu", body: "Stokta olmayan ürünlere reklam harcaması durduruldu." },
    ],
    series: { ordersBefore: 1240, ordersAfter: 3180, basketBefore: 640, basketAfter: 690 },
  },
  {
    slug: "musteri-b",
    client: "Müşteri B",
    sector: "Kozmetik",
    title: "Dönüşüm oranı iki katını geçti.",
    period: "90 gün",
    summary: "Site deneyimi ve e-posta akışları yenilendi. Aynı trafik daha fazla satışa döndü.",
    metrics: [
      { label: "Dönüşüm oranı", before: 1.2, after: 2.7, decimals: 1, prefix: "%", better: "higher" },
      { label: "Sepet ortalaması", before: 420, after: 585, suffix: " ₺", better: "higher" },
    ],
    problem: [
      "Mobil ödeme adımı uzundu. Ziyaretçilerin çoğu sepette ayrılıyordu.",
      "Terk edilen sepetler için hiçbir hatırlatma yoktu.",
    ],
    solution: [
      "Ödeme adımları kısaltıldı ve mobil deneyim sadeleştirildi.",
      "Sepet terki ve tamamlayıcı ürün için otomatik e-posta akışları kuruldu.",
    ],
    strategy: [
      { pillar: "infrastructure", title: "Ödeme akışı", body: "Ödeme adımı üç ekrandan bire indi." },
      { pillar: "development", title: "Dönüşüm testleri", body: "Ürün sayfası ve sepet için A/B testleri yapıldı." },
      { pillar: "administration", title: "Sadakat kurgusu", body: "Tekrar satın alma için segment bazlı kampanyalar kuruldu." },
    ],
    series: { ordersBefore: 900, ordersAfter: 1650, basketBefore: 420, basketAfter: 585 },
  },
  {
    slug: "musteri-c",
    client: "Müşteri C",
    sector: "Ev & Yaşam",
    title: "Sipariş başı reklam maliyeti yarıya indi.",
    period: "90 gün",
    summary: "Tek kanala bağımlı satış dört kanala yayıldı. Reklam verimliliği arttı.",
    metrics: [
      { label: "Sipariş başı maliyet", before: 142, after: 68, suffix: " ₺", better: "lower" },
      { label: "Aktif satış kanalı", before: 1, after: 4, better: "higher" },
    ],
    problem: [
      "Satışın tamamı tek bir web sitesinden geliyordu.",
      "Reklam maliyeti yükseliyor, sipariş sayısı yerinde sayıyordu.",
    ],
    solution: [
      "Üç pazar yerinde mağaza açıldı ve stok tek merkezden bağlandı.",
      "Reklam bütçesi en düşük maliyetle satış getiren kanallara yönlendirildi.",
    ],
    strategy: [
      { pillar: "administration", title: "Pazar yeri açılışı", body: "Üç pazar yerinde mağaza kurulumu ve liste optimizasyonu yapıldı." },
      { pillar: "infrastructure", title: "Stok entegrasyonu", body: "Tüm kanallar tek stok kaynağına bağlandı." },
      { pillar: "development", title: "Bütçe dağılımı", body: "Google Ads bütçesi CPA hedefine göre yeniden dağıtıldı." },
    ],
    series: { ordersBefore: 700, ordersAfter: 1240, basketBefore: 520, basketAfter: 540 },
  },
  {
    slug: "musteri-d",
    client: "Müşteri D",
    sector: "Elektronik",
    title: "İade oranı yarıya yakın düştü.",
    period: "90 gün",
    summary: "Ürün bilgileri düzeltildi. Doğru beklentiyle alınan ürün daha az iade edildi.",
    metrics: [
      { label: "İade oranı", before: 8.4, after: 4.9, decimals: 1, prefix: "%", better: "lower" },
      { label: "Aylık sipariş", before: 860, after: 1940, better: "higher" },
    ],
    problem: [
      "Ürün sayfalarındaki teknik bilgiler eksik ve tutarsızdı.",
      "Yanlış beklentiyle alınan ürünler yüksek iade oranı yaratıyordu.",
    ],
    solution: [
      "Tüm ürün listeleri teknik özellik ve görsellerle yeniden yazıldı.",
      "İade nedenleri aylık raporlanıp ürün sayfalarına geri beslendi.",
    ],
    strategy: [
      { pillar: "administration", title: "Liste optimizasyonu", body: "Pazar yeri listeleri teknik özelliklerle tamamlandı." },
      { pillar: "administration", title: "İade raporu", body: "İade nedenleri ürün bazında takip edilmeye başlandı." },
      { pillar: "development", title: "Kampanya kurgusu", body: "Meta Ads kampanyaları ürün karşılaştırma içerikleriyle yenilendi." },
    ],
    series: { ordersBefore: 860, ordersAfter: 1940, basketBefore: 2400, basketAfter: 2550 },
  },
  {
    slug: "musteri-e",
    client: "Müşteri E",
    sector: "Gıda",
    title: "Tekrar satın alma oranı iki katını geçti.",
    period: "90 gün",
    summary: "Tek seferlik alıcılar düzenli müşteriye döndü. Sepet de büyüdü.",
    metrics: [
      { label: "Tekrar satın alma oranı", before: 14, after: 31, prefix: "%", better: "higher" },
      { label: "Sepet ortalaması", before: 310, after: 395, suffix: " ₺", better: "higher" },
    ],
    problem: [
      "Müşterilerin çoğu yalnızca bir kez alışveriş yapıyordu.",
      "Müşteri verisi segmentlere ayrılmamıştı.",
    ],
    solution: [
      "Satın alma sıklığına göre segmentler oluşturuldu.",
      "Tüketim süresine göre hatırlatma ve paket kampanyaları kuruldu.",
    ],
    strategy: [
      { pillar: "administration", title: "Müşteri segmentleri", body: "Alışveriş sıklığı ve sepet tutarına göre segmentler kuruldu." },
      { pillar: "development", title: "Hatırlatma akışları", body: "Ürün bitiş süresine göre e-posta ve SMS akışları devreye alındı." },
      { pillar: "infrastructure", title: "Paket ürünler", body: "Sitede paket ve abonelik seçenekleri açıldı." },
    ],
    series: { ordersBefore: 2100, ordersAfter: 2900, basketBefore: 310, basketAfter: 395 },
  },
  {
    slug: "musteri-f",
    client: "Müşteri F",
    sector: "Elektronik",
    title: "Dönüşüm oranı iki katına çıktı.",
    period: "90 gün",
    summary: "Yavaş site hızlandırıldı. Reklam trafiği satışa daha kolay döndü.",
    metrics: [
      { label: "Dönüşüm oranı", before: 0.9, after: 1.8, decimals: 1, prefix: "%", better: "higher" },
      { label: "Sipariş başı maliyet", before: 210, after: 118, suffix: " ₺", better: "lower" },
    ],
    problem: [
      "Mobilde sayfa açılışı çok yavaştı.",
      "Reklamdan gelen ziyaretçilerin büyük kısmı sayfa yüklenmeden çıkıyordu.",
    ],
    solution: [
      "Site altyapısı yenilendi ve sayfa hızı iyileştirildi.",
      "Reklam trafiği hızlı açılan kampanya sayfalarına yönlendirildi.",
    ],
    strategy: [
      { pillar: "infrastructure", title: "Site hızı", body: "Görseller ve altyapı mobil hız için yeniden düzenlendi." },
      { pillar: "development", title: "Kampanya sayfaları", body: "Google Ads trafiği için ayrı kampanya sayfaları kuruldu." },
      { pillar: "administration", title: "Haftalık rapor", body: "Dönüşüm ve maliyet haftalık olarak raporlandı." },
    ],
    series: { ordersBefore: 520, ordersAfter: 980, basketBefore: 3100, basketAfter: 3150 },
  },
];

/** Relative month labels: three months before the start, then the program months. */
export const caseMonths = ["−3", "−2", "−1", "1", "2", "3"];
export const caseSplitIndex = 3;

/** Deterministic monthly series: flat-ish before the start, then a ramp to the "after" value. */
function ramp(before: number, after: number): number[] {
  const wobble = [0.97, 1.02, 1];
  const pre = wobble.map((w) => before * w);
  const post = [0.45, 0.78, 1].map((t) => before + (after - before) * t);
  return [...pre, ...post];
}

export function caseSeries(study: CaseStudy) {
  const { ordersBefore, ordersAfter, basketBefore, basketAfter } = study.series;
  const orders = ramp(ordersBefore, ordersAfter).map(Math.round);
  const basket = ramp(basketBefore, basketAfter);
  const revenue = orders.map((count, i) => count * (basket[i] ?? basketBefore));
  return { orders, revenue };
}

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((study) => study.slug === slug);
}

export function caseHref(slug: string): string {
  return `/sonuclar/${slug}`;
}

export const casesPage = {
  eyebrow: "Vaka çalışmaları",
  title: "Sonuçlar",
  body: "Her vaka aynı soruyu cevaplar: 90 günün sonunda ne değişti?",
  filterLabel: "Sektöre göre filtrele",
  allLabel: "Tümü",
};
