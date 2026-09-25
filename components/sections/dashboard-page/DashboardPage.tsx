import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dashboardPage, demoRequestHref } from "@/lib/content/dashboard-page";
import { DashboardApp } from "./DashboardApp";
import { DashboardTabProvider, PANEL_ID } from "./DashboardTabs";
import { FeatureBento } from "./FeatureBento";
import { IntegrationHub } from "./IntegrationHub";

/** /dashboard page body: hero + live mockup, modules, integrations, demo CTA. */
export function DashboardPage() {
  const { hero, integrations, cta } = dashboardPage;

  return (
    <DashboardTabProvider>
      <section aria-labelledby="page-title" className="relative overflow-hidden">
        <GridBackdrop from="top" />
        <Container className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1
              id="page-title"
              className="mt-6 text-balance text-display-sm font-medium text-fg sm:text-display-md xl:text-display-lg"
            >
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
              {hero.body}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={demoRequestHref} withArrow>
                {hero.primary}
              </ButtonLink>
              <ButtonLink href={`#${PANEL_ID}`} variant="secondary">
                {hero.secondary}
              </ButtonLink>
            </div>
          </Reveal>

          <div id={PANEL_ID} className="mt-16 scroll-mt-24 sm:mt-20">
            <h2 className="sr-only">{dashboardPage.panelHeading}</h2>
            <Reveal delay={0.15}>
              <p className="mb-4 text-center text-xs text-fg-subtle">{hero.hint}</p>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[10%] -top-10 h-48 bg-accent-glow opacity-70 blur-2xl"
                />
                <div className="relative">
                  <DashboardApp />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureBento />

      <Section id="entegrasyonlar" aria-labelledby="integrations-title">
        <Container>
          <SectionHeader
            eyebrow={integrations.eyebrow}
            title={integrations.title}
            titleId="integrations-title"
            body={integrations.body}
            align="center"
          />
          <Reveal className="mt-12 sm:mt-16">
            <IntegrationHub />
          </Reveal>
        </Container>
      </Section>

      <CtaPanel id="iletisim" title={cta.title} body={cta.body} cta={cta.label} href={demoRequestHref} />
    </DashboardTabProvider>
  );
}
