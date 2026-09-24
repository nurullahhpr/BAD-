import { RevealGroup } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { results } from "@/lib/content/home";
import { CaseCard } from "./CaseCard";

export function Results() {
  const { eyebrow, title, body, cases } = results;

  return (
    <Section id="sonuclar" aria-labelledby="results-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="results-title" body={body} />
        <RevealGroup as="ul" gap={0.12} className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {cases.map((study) => (
            <CaseCard key={study.client} study={study} />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
