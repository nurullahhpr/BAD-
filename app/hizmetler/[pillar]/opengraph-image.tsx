import { notFound } from "next/navigation";
import { getPillarPage, pillarIds } from "@/lib/content/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ hizmet sütunu";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return pillarIds.map((pillar) => ({ pillar }));
}

export default async function Image({ params }: { params: Promise<{ pillar: string }> }) {
  const page = getPillarPage((await params).pillar);
  if (!page) notFound();
  return renderOgImage({ eyebrow: page.pillar.scope, title: page.pillar.name, pillar: page.pillar.id });
}
