import type { Metadata } from "next";
import { CasesIndex } from "@/components/sections/cases/CasesIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { casesPage } from "@/lib/content/cases";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/sonuclar";

export const metadata: Metadata = pageMetadata({
  title: `${casesPage.title} — ${casesPage.eyebrow}`,
  description: casesPage.body,
  path,
});

export default function SonuclarPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ label: "Ana sayfa", href: "/" }, { label: casesPage.title }], path)]} />
      <CasesIndex />
    </>
  );
}
