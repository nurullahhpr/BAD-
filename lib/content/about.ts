import type { PillarId } from "@/lib/content/home";

// /hakkimizda. The founding idea ("karmaşayı sona erdirmek için kuruldu") comes from the
// client brief; this is an expansion of it and stays DRAFT until the content pass.
// Team entries are PLACEHOLDER.

export type Principle = {
  title: string;
  body: string;
};

export type TeamMember = {
  name: string;
  role: string;
  /** Pillar the person leads or works in, for the tone tag. */
  pillar?: PillarId;
  /** Real portrait later; rendered with next/image when present. */
  photo?: { src: string; alt: string };
};

// DRAFT: story, mission and principles await client approval.
export const aboutPage = {
  hero: {
    eyebrow: "Hakkımızda",
    title: "Karmaşayı sona erdirmek için kurulduk.",
    body: "E-ticaret markalarının yazılımcı, reklam ajansı ve pazar yeri yönetimi arasında kaybolduğunu gördük. BADİ, bu işleri tek ekipte toplamak için kuruldu.",
  },
  story: {
    eyebrow: "Hikayemiz",
    title: "Üç ayrı tedarikçi, tek bir sorun",
    body: "Sorun hizmetlerin kalitesi değildi. Sorun, bütün resmi gören kimsenin olmamasıydı.",
    chapters: [
      {
        label: "Gördüğümüz",
        title: "Parça parça yönetim",
        body: "Site bir yazılımcıda, reklam bir ajansta, pazar yerleri şirket içinde birinde. Herkes kendi rakamını raporluyordu.",
      },
      {
        label: "Fark ettiğimiz",
        title: "Sorumlu yoktu",
        body: "Satış düştüğünde herkes diğerini işaret ediyordu. Marka, ekiplerin arasındaki boşlukta para kaybediyordu.",
      },
      {
        label: "Kurduğumuz",
        title: "Tek ekip, tek rapor",
        body: "Operasyon, pazarlama ve altyapıyı tek çatı altında topladık. Global modeli Türkiye pazarına uyarladık.",
      },
    ],
    toggle: { chaos: "Karmaşa", order: "BADİ ile" },
    captions: {
      chaos: "Dokuz iş, üç ayrı tedarikçi. Bağlantılar birbirine karışmış.",
      order: "Aynı dokuz iş, üç sütun, tek ekip.",
    },
    /** Short labels for the nine sub-services, in pillar order (3 each). */
    nodes: [
      "Pazar yeri", "CRM", "Raporlama",
      "Performans", "SEO & içerik", "Yeni pazarlar",
      "E-ticaret sitesi", "Entegrasyon", "Dashboard",
    ],
    diagramLabel: "Dağınık tedarikçilerin BADİ Mimarisi altında üç sütunda toplanmasını gösteren diyagram",
  },
  mission: {
    eyebrow: "Misyonumuz",
    statement:
      "Türkiye'deki e-ticaret markalarına, dışarıdan yönetilen tam kapsamlı bir dijital ticaret departmanı sunmak.",
    body: "Ayrı ayrı tedarikçi yerine tek ekip. Ayrı ayrı rapor yerine tek rakam seti.",
    facts: [
      { value: "3", label: "hizmet sütunu" },
      { value: "1", label: "ekip ve rapor" },
      { value: "90", label: "günlük program" },
    ],
  },
  principles: {
    eyebrow: "İlkelerimiz",
    title: "Nasıl çalıştığımızı belirleyen kurallar",
    items: [
      { title: "Rakamla konuşuruz", body: "Her karar ve her rapor ölçülebilir veriye dayanır. Soyut iddia yok." },
      { title: "Tek sorumlu", body: "Sonucun sahibi biziz. Sorun çıktığında başka bir tedarikçiyi işaret etmeyiz." },
      { title: "Şeffaflık", body: "Harcanan her lira ve getirdiği sonuç düzenli raporda görünür." },
      { title: "Ortak hedef", body: "Büyümeden pay alan, aynı hedef için çalışan bir ortak gibi çalışırız." },
      { title: "Global model, yerel uygulama", body: "Kanıtlanmış yöntemleri Türkiye pazarının kanallarına uyarlarız." },
      { title: "Önce ölçüm", body: "Ölçmediğimiz bir işi büyütmeyiz. Her program veri kurulumuyla başlar." },
    ] satisfies Principle[],
  },
  team: {
    eyebrow: "Ekip",
    title: "Her sütunun arkasında bir uzman",
    body: "Operasyon, pazarlama ve teknoloji aynı ekipte, aynı hedefe çalışır.",
    // PLACEHOLDER: names, roles and photos until the real team is provided.
    members: [
      { name: "Ad Soyad", role: "Kurucu & Genel Müdür" },
      { name: "Ad Soyad", role: "Operasyon Lideri", pillar: "administration" },
      { name: "Ad Soyad", role: "Büyüme Lideri", pillar: "development" },
      { name: "Ad Soyad", role: "Teknoloji Lideri", pillar: "infrastructure" },
      { name: "Ad Soyad", role: "Performans Pazarlama Uzmanı", pillar: "development" },
      { name: "Ad Soyad", role: "Pazar Yeri Uzmanı", pillar: "administration" },
      { name: "Ad Soyad", role: "Entegrasyon Uzmanı", pillar: "infrastructure" },
      { name: "Ad Soyad", role: "Veri & Raporlama Uzmanı", pillar: "administration" },
    ] satisfies TeamMember[],
  },
  cta: {
    title: "Ekibimizle Tanışın",
    body: "30 dakikalık ücretsiz analiz görüşmesinde markanızı birlikte inceleyelim.",
    label: "Teklif Al",
  },
};
