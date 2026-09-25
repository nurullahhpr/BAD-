import type { Metadata } from "next";
import { ProcessPage } from "@/components/sections/process/ProcessPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { processPage } from "@/lib/content/process";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/nasil-calisiyoruz";

export const metadata: Metadata = pageMetadata({
  title: `${processPage.title} — ${processPage.eyebrow}`,
  description: processPage.body,
  path,
});

export default function NasilCalisiyoruzPage() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ label: "Ana sayfa", href: "/" }, { label: processPage.eyebrow }], path)]} />
      <ProcessPage />
    </>
  );
}
