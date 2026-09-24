import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { architecture } from "@/lib/content/home";
import { PillarCard } from "./PillarCard";
import { PillarConnector } from "./PillarConnector";

export function Architecture() {
  const { eyebrow, title, body, hub, pillars } = architecture;

  return (
    <Section id="hizmetler" aria-labelledby="architecture-title" className="border-t border-line/60">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id="architecture-title"
            className="mt-5 text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-5 leading-relaxed text-fg-muted">{body}</p>
        </Reveal>

        <div className="mt-14 lg:mt-12">
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
