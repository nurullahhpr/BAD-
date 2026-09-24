import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pillars, type PillarId } from "@/lib/content/home";
import { pillarHref } from "@/lib/content/services";
import { pillarTheme } from "@/lib/pillarTheme";
import { ServiceIcon } from "./ServiceIcon";

export function OtherPillars({ currentId }: { currentId: PillarId }) {
  const others = pillars.filter((pillar) => pillar.id !== currentId);

  return (
    <Section aria-labelledby="other-pillars-title">
      <Container>
        <SectionHeader eyebrow="BADİ Mimarisi" title="Diğer hizmet sütunları" titleId="other-pillars-title" />
        <RevealGroup as="ul" className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2">
          {others.map((pillar) => (
            <RevealItem as="li" key={pillar.id}>
              <Link
                href={pillarHref(pillar.id)}
                className="group flex h-full items-start gap-5 rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <ServiceIcon pillar={pillar.id} />
                <div className="flex-1">
                  <p className="text-xl font-medium tracking-tight text-fg">{pillar.name}</p>
                  <p className={`mt-1 font-mono text-xs uppercase tracking-[0.15em] ${pillarTheme[pillar.id].text}`}>
                    {pillar.scope}
                  </p>
                  <p className="mt-4 text-sm text-fg-muted">
                    {pillar.services.map((service) => service.title).join(" · ")}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-fg-subtle transition-colors group-hover:text-fg"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
