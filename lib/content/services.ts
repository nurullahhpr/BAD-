import { pillars, type Pillar, type PillarId } from "@/lib/content/home";

// Detail pages under /hizmetler/[pillar]. Service titles and one-line bodies come from
// the approved `pillars` copy; everything added here is marked DRAFT until approved.

export type ServiceDetail = {
  /** Anchor id inside the pillar page. */
  slug: string;
  whatWeDo: string[];
  process: string[];
  tools: string[];
};

export type PillarPage = {
  pillar: Pillar;
  index: number;
  intro: string;
  services: (Pillar["services"][number] & ServiceDetail)[];
};

type PillarDetail = {
  intro: string;
  services: ServiceDetail[];
};

// DRAFT: intros, "ne yapıyoruz", "nasıl çalışıyoruz" and tool lists await client approval.
const details: Record<PillarId, PillarDetail> = {
  administration: {
    intro:
      "Satışın ticari ve operasyonel tarafını yönetiriz. Pazar yerlerinden müşteri operasyonuna, stratejiden raporlamaya kadar.",
    services: [
      {
        slug: "pazar-yeri-yonetimi",
        whatWeDo: [
          "Mağaza kurulumu ve hesap sağlığı takibi",
          "Ürün başlığı, görsel ve özellik optimizasyonu",
          "Fiyat, kampanya ve kupon stratejisi",
          "Stok ve buybox takibi",
        ],
        process: [
          "Kanal denetimi: mevcut mağaza ve listeleri puanlarız.",
          "Düzenleme: listeleri, fiyatları ve kampanyaları yeniden kurarız.",
          "Takip: satış ve sıralamayı düzenli ölçer, aksiyon alırız.",
        ],
        tools: ["Trendyol Satıcı Paneli", "Hepsiburada Satıcı Paneli", "Amazon Seller Central", "Google Merchant Center"],
      },
      {
        slug: "crm-musteri-operasyonu",
        whatWeDo: [
          "Müşteri segmentasyonu",
          "Sadakat ve tekrar satın alma kurguları",
          "Sipariş, iade ve müşteri hizmetleri akışlarının takibi",
        ],
        process: [
          "Veri: müşteri ve sipariş verisini tek yerde toplarız.",
          "Kurgu: segmentleri ve otomatik akışları kurarız.",
          "Ölçüm: tekrar satın alma oranını takip ederiz.",
        ],
        tools: ["Klaviyo", "Insider", "HubSpot", "WhatsApp Business"],
      },
      {
        slug: "ticari-strateji-raporlama",
        whatWeDo: [
          "Büyüme hedefi ve bütçe planı",
          "Stok-satış analizi",
          "Düzenli ve şeffaf raporlama",
        ],
        process: [
          "Hedef: KPI'ları ve bütçeyi birlikte belirleriz.",
          "Analiz: stok ve satış verisini birlikte okuruz.",
          "Rapor: sonuçları ve sonraki adımları düzenli paylaşırız.",
        ],
        tools: ["BADİ Dashboard", "Looker Studio", "Google Sheets", "ERP raporları"],
      },
    ],
  },
  development: {
    intro:
      "Trafiği satışa çeviririz. Reklam, arama ve yeni pazarlarla büyümeyi yönetiriz.",
    services: [
      {
        slug: "performans-pazarlamasi",
        whatWeDo: [
          "Hesap yapısı ve dönüşüm ölçümü kurulumu",
          "Kampanya ve kreatif testleri",
          "ROAS ve CPA hedefine göre bütçe dağılımı",
        ],
        process: [
          "Ölçüm: piksel, Conversions API ve etiketleri doğrularız.",
          "Test: kitle, kreatif ve teklif stratejilerini deneriz.",
          "Ölçekleme: kazanan kampanyalara bütçe kaydırırız.",
        ],
        tools: ["Meta Ads", "Google Ads", "TikTok Ads", "Google Tag Manager", "Google Analytics 4"],
      },
      {
        slug: "arama-motoru-icerik",
        whatWeDo: [
          "Teknik ve içerik SEO",
          "E-posta ve SMS otomasyonları",
          "Dönüşüm oranı optimizasyonu (CRO)",
        ],
        process: [
          "Denetim: site, içerik ve akışları tararız.",
          "Önceliklendirme: etkisi en yüksek işleri sıraya koyarız.",
          "Test: değişiklikleri A/B testleriyle ölçeriz.",
        ],
        tools: ["Google Search Console", "Ahrefs", "Klaviyo", "Microsoft Clarity", "Hotjar"],
      },
      {
        slug: "pazar-genisletme",
        whatWeDo: [
          "Yeni müşteri kitlelerinin tespiti",
          "Marka konumlandırması",
          "E-ihracat stratejisi",
        ],
        process: [
          "Araştırma: pazar ve kitle verisini inceleriz.",
          "Test: küçük bütçeli kampanyalarla talebi ölçeriz.",
          "Açılış: kanıtlanan pazara kanal ve bütçe açarız.",
        ],
        tools: ["Google Trends", "Similarweb", "Amazon Global Selling", "Google Merchant Center"],
      },
    ],
  },
  infrastructure: {
    intro:
      "Satışın üzerinde durduğu teknolojiyi kurarız. Site, entegrasyon ve tek ekrandan kontrol.",
    services: [
      {
        slug: "e-ticaret-sistemleri",
        whatWeDo: [
          "Platform seçimi ve kurulum",
          "Dönüşüm odaklı tema ve kullanıcı deneyimi",
          "Hız, güvenlik ve bakım",
        ],
        process: [
          "İhtiyaç analizi: ürün, kanal ve ölçek ihtiyacını çıkarırız.",
          "Kurulum: siteyi kurar, varsa veriyi taşırız.",
          "Yayın: test eder, yayına alır, izlemeye başlarız.",
        ],
        tools: ["Shopify", "ikas", "Ticimax", "WooCommerce"],
      },
      {
        slug: "entegrasyonlar",
        whatWeDo: [
          "ERP ve muhasebe entegrasyonu",
          "Ödeme ve kargo entegrasyonu",
          "Pazar yeri API bağlantıları",
        ],
        process: [
          "Harita: sipariş, stok ve fatura akışını çizeriz.",
          "Bağlantı: entegrasyonları kurar, test ederiz.",
          "İzleme: hataları takip eder, akışı canlı tutarız.",
        ],
        tools: ["Logo", "Mikro", "Paraşüt", "iyzico", "PayTR", "Pazar yeri API'leri"],
      },
      {
        slug: "badi-dashboard",
        whatWeDo: [
          "Tüm satış kanallarını tek panelde toplama",
          "Reklam harcaması, ROAS ve CPA takibi",
          "Stok durumunun anlık görünümü",
        ],
        process: [
          "Bağlantı: kanalları ve reklam hesaplarını panele bağlarız.",
          "Tanım: takip edilecek metrikleri birlikte seçeriz.",
          "Kullanım: ekibiniz her gün aynı ekrana bakar.",
        ],
        tools: ["BADİ Dashboard", "BigQuery", "Looker Studio", "Pazar yeri ve reklam API'leri"],
      },
    ],
  },
};

export const pillarIds = pillars.map((pillar) => pillar.id);

export function getPillarPage(id: string): PillarPage | undefined {
  const index = pillars.findIndex((pillar) => pillar.id === id);
  const pillar = pillars[index];
  if (!pillar) return undefined;
  const detail = details[pillar.id];
  return {
    pillar,
    index,
    intro: detail.intro,
    services: pillar.services.map((service, i) => ({ ...service, ...detail.services[i]! })),
  };
}

export function pillarHref(id: PillarId): string {
  return `/hizmetler/${id}`;
}

// DRAFT: body copy awaits client approval; the title is approved.
export const serviceCta = {
  title: "Bu Hizmeti Konuşalım",
  body: "Mevcut durumunuzu birlikte inceleyelim. İlk adımları rakamlarla planlayalım.",
  cta: "Görüşme Talep Et",
};
