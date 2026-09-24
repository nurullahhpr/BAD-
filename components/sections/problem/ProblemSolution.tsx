import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { problemSolution } from "@/lib/content/home";
import { PainPointList } from "./PainPointList";
import { UnifiedDiagram } from "./UnifiedDiagram";

export function ProblemSolution() {
  const { eyebrow, title, body, painPoints, diagram } = problemSolution;

  return (
    <Section id="yaklasim" aria-labelledby="problem-title" className="border-t border-line/60">
      <Container className="grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center xl:gap-16">
        <div className="space-y-10">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="problem-title"
              className="mt-5 text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-fg-muted">{body}</p>
          </Reveal>
          <PainPointList items={painPoints} />
        </div>

        <UnifiedDiagram {...diagram} />
      </Container>
    </Section>
  );
}
