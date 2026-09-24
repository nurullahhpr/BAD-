import { Container } from "@/components/ui/Container";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journey, processPage, processPhases } from "@/lib/content/process";
import { siteConfig } from "@/lib/site";
import { JourneyScroller } from "./JourneyScroller";
import { PhaseDetail } from "./PhaseDetail";

/** /nasil-calisiyoruz page body. */
export function ProcessPage() {
  const phaseNames = processPhases.map((phase) => phase.name);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: processPage.eyebrow }]}
        eyebrow={processPage.eyebrow}
        title={processPage.title}
        body={processPage.body}
      >
        <ol className="grid gap-3 sm:grid-cols-3">
          {processPhases.map((phase, index) => (
            <li key={phase.id}>
              <a
                href={`#${phase.id}`}
                className="flex h-full flex-col rounded-card border border-line bg-surface/70 p-5 transition-colors hover:border-line-strong"
              >
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  Faz {index + 1} · Gün {phase.startDay}–{phase.endDay}
                </span>
                <span className="mt-2 text-lg font-medium tracking-tight text-fg">{phase.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {processPhases.map((phase, index) => (
        <PhaseDetail key={phase.id} phase={phase} index={index} />
      ))}

      <Section id="musteri-yolculugu" aria-labelledby="journey-title">
        <Container>
          <SectionHeader
            eyebrow={processPage.journey.eyebrow}
            title={processPage.journey.title}
            titleId="journey-title"
            body={processPage.journey.body}
          />
          <div className="mt-12 sm:mt-16">
            <JourneyScroller steps={journey} phaseNames={phaseNames} totalDays={processPage.totalDays} />
          </div>
        </Container>
      </Section>

      <CtaPanel
        id="iletisim"
        title={processPage.cta.title}
        body={processPage.cta.body}
        cta={processPage.cta.label}
        href={siteConfig.ctaHref}
      />
    </>
  );
}
