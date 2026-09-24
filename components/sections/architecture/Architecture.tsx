import { RevealGroup } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { architecture } from "@/lib/content/home";
import { PillarCard } from "./PillarCard";
import { PillarConnector } from "./PillarConnector";

export function Architecture() {
  const { eyebrow, title, body, hub, pillars } = architecture;

  return (
    <Section id="hizmetler" aria-labelledby="architecture-title">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="architecture-title"
          body={body}
          align="center"
        />

        <div className="mt-12 sm:mt-16">
          <PillarConnector hub={hub} />
          <RevealGroup gap={0.12} className="grid gap-6 lg:grid-cols-3 lg:gap-y-0">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.id} pillar={pillar} index={index} />
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
