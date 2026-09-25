import { pillars } from "@/lib/content/home";
import { pillarTheme } from "@/lib/pillarTheme";

export type NavChild = {
  label: string;
  href: string;
  description: string;
  /** Tone dot class shown next to the label. */
  dot: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export type SocialNetwork = "linkedin" | "instagram" | "x" | "youtube";

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  href: string;
};

// PLACEHOLDER: contact details and social URLs until the real ones are provided.
const contact = {
  email: "iletisim@example.com",
  phone: "+90 212 000 00 00",
  phoneHref: "tel:+902120000000",
  address: "İstanbul, Türkiye",
};

export const siteConfig = {
  name: "BADİ",
  tagline: "Dijital Ticaret Hızlandırıcı",
  description:
    "BADİ, Türkiye pazarına adapte edilmiş global modelle e-ticaret markalarının operasyonunu, büyümesini ve altyapısını hızlandırır.",
  locale: "tr_TR",
  contact,
  // Primary conversion target until a dedicated form exists.
  ctaHref: `mailto:${contact.email}?subject=${encodeURIComponent("Dijital Röntgen talebi")}`,
  social: [
    { network: "linkedin", label: "LinkedIn", href: "#" },
    { network: "instagram", label: "Instagram", href: "#" },
    { network: "x", label: "X", href: "#" },
    { network: "youtube", label: "YouTube", href: "#" },
  ] satisfies readonly SocialLink[],
} as const;

// Pages where they exist, homepage section anchors for the rest.
export const mainNav: NavItem[] = [
  {
    label: "Hizmetler",
    href: "/#hizmetler",
    children: pillars.map((pillar) => ({
      label: pillar.name,
      href: `/hizmetler/${pillar.id}`,
      description: pillar.scope,
      dot: pillarTheme[pillar.id].dot,
    })),
  },
  { label: "Nasıl Çalışıyoruz", href: "/nasil-calisiyoruz" },
  { label: "Sonuçlar", href: "/sonuclar" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "İletişim", href: "/#iletisim" },
];
