import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/content/about";

/** Working principles as a numbered card grid. */
export function Principles() {
  const { principles } = aboutPage;

  return (
    <Section id="ilkeler" aria-labelledby="principles-title">
      <Container>
        <SectionHeader eyebrow={principles.eyebrow} title={principles.title} titleId="principles-title" />
        <RevealGroup as="ol" gap={0.06} className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {principles.items.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className="rounded-card bg-surface p-6 transition-colors duration-200 hover:bg-surface-raised sm:p-7"
            >
              <span aria-hidden="true" className="font-mono text-xs tabular-nums text-fg-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight text-fg">{item.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
