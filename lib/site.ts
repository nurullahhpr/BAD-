export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "BADİ",
  tagline: "Dijital Ticaret Hızlandırıcı",
  description:
    "BADİ, Türkiye pazarına adapte edilmiş global modelle e-ticaret markalarının operasyonunu, büyümesini ve altyapısını hızlandırır.",
  locale: "tr_TR",
} as const;

// Homepage section anchors for now. Switch to routes once the pages exist.
export const mainNav: NavItem[] = [
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Nasıl Çalışıyoruz", href: "/#nasil-calisiyoruz" },
  { label: "Sonuçlar", href: "/#sonuclar" },
  { label: "Dashboard", href: "/#dashboard" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "İletişim", href: "/#iletisim" },
];
