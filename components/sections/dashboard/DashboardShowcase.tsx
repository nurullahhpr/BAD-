import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dashboardShowcase } from "@/lib/content/home";
import { DashboardMock } from "./DashboardMock";

// Short homepage version; the full product page lives at /dashboard.
export function DashboardShowcase() {
  const { eyebrow, title, body, note } = dashboardShowcase;

  return (
    <Section id="dashboard" aria-labelledby="dashboard-title" className="relative overflow-hidden">
      <Container className="relative">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="dashboard-title"
          body={body}
          align="center"
        />
        <Reveal className="mt-12 sm:mt-16" delay={0.1}>
          <DashboardMock />
        </Reveal>
        <p className="mt-6 text-center text-xs text-fg-subtle">{note}</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/dashboard" variant="secondary" withArrow>
            Dashboard&apos;u keşfedin
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
