import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OtherPillars } from "@/components/sections/services/OtherPillars";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { getPillarPage, pillarIds, serviceCta } from "@/lib/content/services";
import { contactHref } from "@/lib/contactHref";

// Only the three pillars exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return pillarIds.map((pillar) => ({ pillar }));
}

export async function generateMetadata({
  params,
}: PageProps<"/hizmetler/[pillar]">): Promise<Metadata> {
  const page = getPillarPage((await params).pillar);
  if (!page) return {};
  return {
    title: `${page.pillar.name} — ${page.pillar.scope}`,
    description: page.intro,
  };
}

export default async function PillarPage({ params }: PageProps<"/hizmetler/[pillar]">) {
  const page = getPillarPage((await params).pillar);
  if (!page) notFound();

  const { pillar, services } = page;
  return (
    <>
      <ServiceHero page={page} />
      {services.map((service, index) => (
        <ServiceDetail key={service.slug} pillarId={pillar.id} service={service} index={index} />
      ))}
      <OtherPillars currentId={pillar.id} />
      <CtaPanel
        id="iletisim"
        title={serviceCta.title}
        body={serviceCta.body}
        cta={serviceCta.cta}
        href={contactHref(pillar.id)}
      />
    </>
  );
}
