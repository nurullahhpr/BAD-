import type { AppTabId } from "@/lib/content/dashboard-app";
import { siteConfig } from "@/lib/site";

// Copy for /dashboard. The product scope follows the approved Infrastructure text
// (channels, ad spend with ROAS/CPA, stock, one screen) and the approved
// "düzenli şeffaf raporlama". Everything else here is DRAFT until the content pass.

export type IntegrationIcon = "marketplaces" | "ads" | "window" | "database" | "users" | "card" | "truck";

export type Integration = {
  name: string;
  detail: string;
  icon: IntegrationIcon;
};

export type Feature = {
  tab: AppTabId;
  title: string;
  body: string;
};

// DRAFT: all copy below awaits client approval.
export const dashboardPage = {
  hero: {
    eyebrow: "BADİ Dashboard",
    title: "Tüm Satış Kanallarınız Tek Ekranda",
    body: "Pazar yerleri, web sitesi, reklam hesapları ve stok tek panelde. Ekibiniz her gün aynı rakama bakar.",
    primary: "Demo Talep Et",
    secondary: "Paneli keşfet",
    hint: "Aşağıdaki panel örnek verilerle çalışır. Modüller arasında gezinin, tabloları sıralayın.",
  },
  panelHeading: "Etkileşimli panel önizlemesi",
  features: {
    eyebrow: "Modüller",
    title: "Her ekip aynı rakama bakar",
    body: "Beş modül, tek veri kaynağı. Her kart panelde ilgili modülü açar.",
    cta: "Panelde göster",
    items: [
      { tab: "genel", title: "Tüm kanallar, tek liste", body: "Pazar yerleri ve web sitesi aynı tabloda. Hangi kanalın ne getirdiği tek bakışta görünür." },
      { tab: "reklamlar", title: "ROAS ve CPA, kampanya bazında", body: "Meta Ads ve Google Ads harcaması, getirdiği satışla aynı ekranda." },
      { tab: "stok", title: "Stok bitmeden görün", body: "Kalan gün hesabı, tükenmek üzere olan ürünleri öne çıkarır." },
      { tab: "pazar-yerleri", title: "Pazar yeri sağlığı", body: "İade ve buybox oranı kanal bazında." },
      { tab: "raporlar", title: "Düzenli ve şeffaf raporlama", body: "Haftalık ve aylık raporlar aynı veriden hazırlanır." },
    ] satisfies Feature[],
  },
  integrations: {
    eyebrow: "Entegrasyonlar",
    title: "Kullandığınız sistemlere bağlanır",
    body: "Pazar yeri, reklam, ERP, CRM, ödeme ve kargo verisi tek panelde birleşir.",
    hubTitle: "BADİ Dashboard",
    hubBody: "Tek veri katmanı",
    hubModules: ["Satış", "Reklam", "Stok", "Rapor"],
    groups: [
      {
        label: "Satış ve reklam kanalları",
        items: [
          { name: "Trendyol", detail: "Pazar yeri", icon: "marketplaces" },
          { name: "Hepsiburada", detail: "Pazar yeri", icon: "marketplaces" },
          { name: "Amazon", detail: "Pazar yeri", icon: "marketplaces" },
          { name: "Meta Ads", detail: "Reklam", icon: "ads" },
          { name: "Google Ads", detail: "Reklam", icon: "ads" },
        ],
      },
      {
        label: "Altyapı ve operasyon",
        items: [
          { name: "Web siteniz", detail: "E-ticaret altyapısı", icon: "window" },
          { name: "ERP", detail: "Stok ve fatura", icon: "database" },
          { name: "CRM", detail: "Müşteri verisi", icon: "users" },
          { name: "Ödeme sistemleri", detail: "Tahsilat", icon: "card" },
          { name: "Kargo firmaları", detail: "Gönderi takibi", icon: "truck" },
        ],
      },
    ] satisfies { label: string; items: Integration[] }[],
  },
  cta: {
    title: "Dashboard Demosu Talep Edin",
    body: "Paneli sizin kanallarınız üzerinden birlikte inceleyelim.",
    label: "Demo Talep Et",
  },
};

export const demoRequestHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
  "BADİ Dashboard demo talebi",
)}`;
