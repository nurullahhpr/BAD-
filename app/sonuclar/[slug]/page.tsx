import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/sections/cases/CaseDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { cases, getCase } from "@/lib/content/cases";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Only known cases exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sonuclar/[slug]">): Promise<Metadata> {
  const study = getCase((await params).slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.client} — ${study.title}`,
    description: study.summary,
    path: `/sonuclar/${study.slug}`,
  });
}

export default async function CasePage({ params }: PageProps<"/sonuclar/[slug]">) {
  const study = getCase((await params).slug);
  if (!study) notFound();
  const crumbs = [
    { label: "Ana sayfa", href: "/" },
    { label: "Sonuçlar", href: "/sonuclar" },
    { label: study.client },
  ];
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema(crumbs, `/sonuclar/${study.slug}`)]} />
      <CaseDetail study={study} />
    </>
  );
}
