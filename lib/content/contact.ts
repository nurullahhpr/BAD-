import type { GlyphName } from "@/components/ui/icons";
import type { ContactTopic } from "@/lib/contactHref";
import { pillars, type PillarId } from "@/lib/content/home";

// /iletisim (Teklif Al). The first two trust-note titles come from the client brief;
// everything else (including their bodies) is DRAFT until the content pass.

const topicLabels: Record<ContactTopic, string> = {
  rontgen: "Ücretsiz Dijital Röntgen",
  dashboard: "BADİ Dashboard demosu",
  ...(Object.fromEntries(pillars.map((pillar) => [pillar.id, `${pillar.name} hizmeti`])) as Record<
    PillarId,
    string
  >),
};

/** Validates a `?kaynak=` value; unknown values are ignored. */
export function parseTopic(value: string | null): ContactTopic | null {
  return value && Object.hasOwn(topicLabels, value) ? (value as ContactTopic) : null;
}

export function topicLabel(topic: ContactTopic): string {
  return topicLabels[topic];
}

export const budgetOptions = [
  "Henüz reklam vermiyoruz",
  "50.000 ₺'den az",
  "50.000 – 150.000 ₺",
  "150.000 – 500.000 ₺",
  "500.000 – 1.000.000 ₺",
  "1.000.000 ₺ ve üzeri",
] as const;

export const PROBLEM_MAX = 280;

export const contactPage = {
  eyebrow: "Teklif Al",
  // DRAFT: title, intro, steps and form helper copy await client approval.
  title: "Ücretsiz analiz görüşmesi planlayalım",
  body: "Formu doldurun. Mevcut durumunuzu inceleyip görüşmeye rakamlarla gelelim.",
  trust: [
    // Title approved (client brief), body DRAFT.
    { icon: "clock", title: "30 dakikalık ücretsiz analiz görüşmesi", body: "Kanallarınızı ve rakamlarınızı birlikte inceleriz." },
    // Title approved (client brief), body DRAFT.
    { icon: "shield", title: "Gizlilik sözleşmesi ile korunur", body: "Paylaştığınız veriler görüşme öncesi imzalanan sözleşmeyle korunur." },
    // DRAFT
    { icon: "check", title: "Bağlayıcı değil", body: "Görüşme sonunda karar tamamen sizindir." },
  ] satisfies { icon: GlyphName; title: string; body: string }[],
  steps: [
    { title: "Formu gönderin", body: "Birkaç soruyla mevcut durumunuzu anlatın." },
    { title: "Sizi arayalım", body: "Uygun bir zaman için sizinle iletişime geçeriz." },
    { title: "Analiz görüşmesi", body: "30 dakikada kanallarınızı ve ilk fırsatları konuşuruz." },
  ],
  stepsTitle: "Sonra ne olur?",
  contactTitle: "Doğrudan ulaşın",
  form: {
    title: "Teklif formu",
    submit: "Talebi gönder",
    submitting: "Gönderiliyor…",
    optional: "isteğe bağlı",
    problemHint: `En fazla ${PROBLEM_MAX} karakter.`,
    privacyNote: "Bilgileriniz yalnızca bu talebe yanıt vermek için kullanılır.",
    topicPrefix: "Konu",
    labels: {
      name: "Ad soyad",
      company: "Şirket",
      email: "E-posta",
      phone: "Telefon",
      budget: "Mevcut aylık reklam bütçesi",
      problem: "En büyük dijital sorununuz",
    },
    placeholders: {
      name: "Adınız ve soyadınız",
      company: "Şirketinizin adı",
      email: "ornek@sirket.com",
      phone: "05xx xxx xx xx",
      budget: "Bir aralık seçin",
      problem: "Örn. reklam harcıyoruz ama hangi kanalın satış getirdiğini bilmiyoruz.",
    },
    errors: {
      name: "Adınızı yazın.",
      company: "Şirket adını yazın.",
      emailMissing: "E-posta adresinizi yazın.",
      emailInvalid: "Geçerli bir e-posta adresi yazın. Örn. ad@sirket.com",
      phone: "Telefonu 10 veya 11 haneli yazın. Örn. 0532 123 45 67",
      budget: "Bir bütçe aralığı seçin.",
      problem: "Sorununuzu kısaca yazın.",
      summary: "Formda düzeltilmesi gereken alanlar var.",
    },
  },
  success: {
    title: "Talebiniz alındı",
    body: "Teşekkürler. Sizinle en kısa sürede iletişime geçeceğiz.",
    summaryTitle: "Gönderdiğiniz bilgiler",
    again: "Yeni talep gönder",
  },
};
