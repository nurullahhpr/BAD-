import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { comparison } from "@/lib/content/home";
import { ComparisonTable } from "./ComparisonTable";

export function Comparison() {
  const { eyebrow, title, criterionLabel, traditionalLabel, badiLabel, rows } = comparison;

  return (
    <Section id="neden-badi" aria-labelledby="comparison-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="comparison-title" />

        <div className="mt-12 sm:mt-16">
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
