import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { comparison } from "@/lib/content/home";
import { ComparisonTable } from "./ComparisonTable";

export function Comparison() {
  const { eyebrow, title, criterionLabel, traditionalLabel, badiLabel, rows } = comparison;

  return (
    <Section id="neden-badi" aria-labelledby="comparison-title" className="border-t border-line/60">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id="comparison-title"
            className="mt-5 text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-10">
          <ComparisonTable
            label={title}
            criterionLabel={criterionLabel}
            traditionalLabel={traditionalLabel}
            badiLabel={badiLabel}
            rows={rows}
          />
        </div>
      </Container>
    </Section>
  );
}
