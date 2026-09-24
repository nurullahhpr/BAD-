import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { problemSolution } from "@/lib/content/home";
import { PainPointList } from "./PainPointList";
import { UnifiedDiagram } from "./UnifiedDiagram";

export function ProblemSolution() {
  const { eyebrow, title, body, painPoints, diagram } = problemSolution;

  return (
    <Section id="yaklasim" aria-labelledby="problem-title">
      <Container className="grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-16">
        <div className="space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} titleId="problem-title" body={body} />
          <PainPointList items={painPoints} />
        </div>

        <UnifiedDiagram {...diagram} />
      </Container>
    </Section>
  );
}
