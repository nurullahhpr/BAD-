import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/sections/cases/CaseDetail";
import { cases, getCase } from "@/lib/content/cases";

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
  return { title: `${study.client} — ${study.title}`, description: study.summary };
}

export default async function CasePage({ params }: PageProps<"/sonuclar/[slug]">) {
  const study = getCase((await params).slug);
  if (!study) notFound();
  return <CaseDetail study={study} />;
}
