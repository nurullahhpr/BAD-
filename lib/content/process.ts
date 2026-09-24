import { program } from "@/lib/content/home";

// /nasil-calisiyoruz. Phase names, day ranges and summaries come from the approved
// `program` copy; everything added here is DRAFT until the content pass.

export type PhaseDetail = {
  goals: string[];
  outputs: string[];
  clientSees: string[];
};

export type JourneyStep = {
  /** Day label, e.g. "Gün 14" or "Gün 31–45". */
  day: string;
  /** Position on the 0–90 day scale, for the progress marker. */
  dayValue: number;
  /** Index into program.phases. */
  phase: number;
  title: string;
  body: string;
};

// DRAFT: goals, outputs and "what you will see" await client approval.
const phaseDetails: PhaseDetail[] = [
  {
    goals: [
      "Mevcut durumun rakamla fotoğrafını çekmek",
      "Kayıp ve fırsat noktalarını bulmak",
      "90 günlük hedefleri netleştirmek",
    ],
    outputs: [
      "Dijital Röntgen raporu",
      "Eksiksiz veri takip kurulumu",
      "Yapılandırılmış reklam hesapları ve satış kanalları",
    ],
    clientSees: [
      "Erişim ve bilgi talepleri",
      "Röntgen sunumu ve hedef toplantısı",
      "Ölçümün doğru çalıştığını gösteren ilk panel",
    ],
  },
  {
    goals: [
      "Kampanyaları ve satış kanallarını devreye almak",
      "İlk ciro sıçramasını yakalamak",
      "Hangi kanalın ne getirdiğini ölçmek",
    ],
    outputs: [
      "Yayında Meta Ads ve Google Ads kampanyaları",
      "Aktif pazar yeri ve site satışları",
      "Kanal bazında performans raporu",
    ],
    clientSees: [
      "Düzenli performans raporları",
      "Satış ve cirodaki ilk değişim",
      "Bütçenin nereye harcandığının tam görünümü",
    ],
  },
  {
    goals: [
      "Bütçeyi veriye göre yeniden dağıtmak",
      "Entegrasyon ve otomasyonlarla ölçeklemek",
      "Sürdürülebilir büyüme planı kurmak",
    ],
    outputs: [
      "Optimize edilmiş kampanya ve kanal yapısı",
      "Kurulmuş entegrasyon ve otomasyonlar",
      "90 gün sonuç raporu ve ölçekleme planı",
    ],
    clientSees: [
      "Kanal bazında maliyet ve satış değişimi",
      "BADİ Dashboard'da tüm kanalların tek ekranda takibi",
      "Sonraki dönemin rakamlı yol haritası",
    ],
  },
];

// DRAFT: journey steps and day markers await client approval.
export const journey: JourneyStep[] = [
  { day: "Gün 0", dayValue: 0, phase: 0, title: "Tanışma", body: "İşinizi ve hedeflerinizi dinleriz. Erişimleri birlikte planlarız." },
  { day: "Gün 1–7", dayValue: 4, phase: 0, title: "Erişim ve veri toplama", body: "Reklam hesapları, site ve pazar yeri panellerine erişim alınır." },
  { day: "Gün 14", dayValue: 14, phase: 0, title: "Dijital Röntgen", body: "Eksikler ve fırsatlar rakamlarla önünüze gelir." },
  { day: "Gün 30", dayValue: 30, phase: 0, title: "Kurulumlar tamam", body: "Takip kodları, reklam hesapları ve kanallar hazırdır. Faz raporu paylaşılır." },
  { day: "Gün 31–45", dayValue: 38, phase: 1, title: "Kampanyalar yayında", body: "Performans pazarlaması ve satış kanalları devreye girer." },
  { day: "Gün 60", dayValue: 60, phase: 1, title: "İlk sonuçlar", body: "Hangi kanalın ne getirdiği raporlanır. Bütçe kararları netleşir." },
  { day: "Gün 61–89", dayValue: 75, phase: 2, title: "Optimizasyon", body: "Çalışan kampanyalar büyür, çalışmayanlar durur. Otomasyonlar kurulur." },
  { day: "Gün 90", dayValue: 90, phase: 2, title: "Sonuç ve ölçekleme planı", body: "90 günün sonuçları ve sonraki dönemin planı sunulur." },
];

export const processPhases = program.phases.map((phase, index) => ({
  ...phase,
  id: `faz-${index + 1}`,
  ...phaseDetails[index]!,
}));

export const processPage = {
  eyebrow: "Nasıl çalışıyoruz",
  title: program.title,
  // DRAFT: intro and section copy await client approval.
  body: "Üç faz, net hedefler ve her fazın sonunda ölçülebilir çıktılar.",
  totalDays: program.totalDays,
  phaseLabels: { goals: "Hedefler", outputs: "Çıktılar", clientSees: "Ne göreceksiniz" },
  journey: {
    eyebrow: "Müşteri yolculuğu",
    title: "90 gün boyunca sizin tarafınızda ne olur?",
    body: "İlk görüşmeden sonuç raporuna kadar her adım.",
  },
  cta: {
    title: "İlk 30 Günü Birlikte Planlayalım",
    body: "Dijital Röntgen ile başlayalım. Programın ilk adımını rakamlarla atalım.",
    label: "Ücretsiz Dijital Röntgen Al",
  },
};
