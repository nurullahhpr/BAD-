import { notFound } from "next/navigation";
import { cases, getCase } from "@/lib/content/cases";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ vaka çalışması";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCase((await params).slug);
  if (!study) notFound();
  return renderOgImage({ eyebrow: `${study.client} · ${study.sector}`, title: study.title });
}
