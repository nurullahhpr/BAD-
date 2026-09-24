import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { results } from "@/lib/content/home";
import { CaseCard } from "./CaseCard";

export function Results() {
  const { eyebrow, title, body, cases, allLabel, allHref } = results;

  return (
    <Section id="sonuclar" aria-labelledby="results-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="results-title" body={body} />
        <RevealGroup as="ul" gap={0.12} className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {cases.map((study) => (
            <RevealItem as="li" key={study.slug}>
              <CaseCard study={study} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={allHref} variant="secondary" withArrow>
            {allLabel}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
