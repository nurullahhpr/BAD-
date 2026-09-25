import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { processPhases } from "@/lib/content/process";
import { processPage } from "@/lib/content/process";

type Phase = (typeof processPhases)[number];

const blockLabel = "font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle";

// Same layout as the service pages: sticky header left, three blocks right.
export function PhaseDetail({ phase, index }: { phase: Phase; index: number }) {
  const titleId = `${phase.id}-title`;
  const labels = processPage.phaseLabels;
  const blocks = [
    { label: labels.goals, items: phase.goals },
    { label: labels.outputs, items: phase.outputs },
    { label: labels.clientSees, items: phase.clientSees },
  ];

  return (
    <Section id={phase.id} aria-labelledby={titleId}>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p aria-hidden="true" className="mb-6 font-mono text-5xl font-medium tracking-tight text-fg-muted/55">
            {String(index + 1).padStart(2, "0")}
          </p>
          <SectionHeader
            eyebrow={`Faz ${index + 1} · Gün ${phase.startDay}–${phase.endDay}`}
            title={phase.name}
            titleId={titleId}
            body={phase.summary}
          />
        </div>

        <RevealGroup className="divide-y divide-line border-y border-line">
          {blocks.map((block) => (
            <RevealItem key={block.label} className="py-8">
              <h3 className={blockLabel}>{block.label}</h3>
              <ul className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-fg">
                    <CheckIcon className="mt-1 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
