import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dashboardShowcase } from "@/lib/content/home";
import { DashboardMock } from "./DashboardMock";

// Short homepage version. The full dashboard gets its own page later.
export function DashboardShowcase() {
  const { eyebrow, title, body, note } = dashboardShowcase;

  return (
    <Section id="dashboard" aria-labelledby="dashboard-title" className="relative overflow-hidden">
      <GridBackdrop from="top" />
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
      </Container>
    </Section>
  );
}
