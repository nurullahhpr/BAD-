import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/content/about";

/** Mission statement with the three structural facts behind it. */
export function Mission() {
  const { mission } = aboutPage;

  return (
    <Section id="misyon" aria-labelledby="mission-title">
      <Container>
        <SectionHeader
          eyebrow={mission.eyebrow}
          title={mission.statement}
          titleId="mission-title"
          body={mission.body}
          align="center"
          className="max-w-3xl"
        />
        <RevealGroup
          as="ul"
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-line rounded-panel border border-line bg-surface sm:mt-16"
        >
          {mission.facts.map((fact) => (
            <RevealItem as="li" key={fact.label} className="px-3 py-8 text-center sm:px-6 sm:py-10">
              <span className="block font-mono text-4xl font-medium tabular-nums text-fg sm:text-5xl">
                {fact.value}
              </span>
              <span className="mt-3 block text-xs text-fg-muted sm:text-sm">{fact.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
