import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage } from "@/lib/content/about";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/hakkimizda";

export const metadata: Metadata = pageMetadata({
  title: `${aboutPage.hero.eyebrow} — ${aboutPage.hero.title}`,
  description: aboutPage.hero.body,
  path,
});

export default function AboutRoute() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ label: "Ana sayfa", href: "/" }, { label: aboutPage.hero.eyebrow }], path)]} />
      <AboutPage />
    </>
  );
}
