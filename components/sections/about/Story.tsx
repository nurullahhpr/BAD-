import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { aboutPage } from "@/lib/content/about";
import { ChaosToOrder } from "./ChaosToOrder";

/** Why BADİ exists: three chapters next to the chaos-to-order diagram. */
export function Story() {
  const { story } = aboutPage;
  const last = story.chapters.length - 1;

  return (
    <Section id="hikaye" aria-labelledby="story-title">
      <Container>
        <SectionHeader eyebrow={story.eyebrow} title={story.title} titleId="story-title" body={story.body} />
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 sm:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <RevealGroup as="ol" className="relative space-y-10">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-3.5 w-px bg-line" />
            {story.chapters.map((chapter, index) => (
              <RevealItem as="li" key={chapter.label} className="relative pl-12">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 flex size-7 items-center justify-center rounded-full border bg-canvas font-mono text-xs tabular-nums",
                    index === last ? "border-accent/50 text-accent" : "border-line-strong text-fg-subtle",
                  )}
                >
                  {index + 1}
                </span>
                <p className="text-xs uppercase tracking-wider font-medium text-fg-subtle">{chapter.label}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-fg">{chapter.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-fg-muted">{chapter.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
            <ChaosToOrder
              labels={story.nodes}
              toggle={story.toggle}
              captions={story.captions}
              description={story.diagramLabel}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
