import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PillarId } from "@/lib/content/home";
import type { PillarPage } from "@/lib/content/services";
import { pillarTheme } from "@/lib/pillarTheme";
import { ServiceIcon } from "./ServiceIcon";

type ServiceDetailProps = {
  pillarId: PillarId;
  service: PillarPage["services"][number];
  index: number;
};

const blockLabel = "text-xs uppercase tracking-wider font-medium text-fg-subtle";

// lg: header sticks on the left while the three blocks scroll past on the right.
export function ServiceDetail({ pillarId, service, index }: ServiceDetailProps) {
  const tone = pillarTheme[pillarId];
  const titleId = `${service.slug}-title`;

  return (
    <Section id={service.slug} aria-labelledby={titleId}>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ServiceIcon pillar={pillarId} service={service.slug} size="lg" className="mb-6" />
          <SectionHeader
            eyebrow={`Hizmet ${String(index + 1).padStart(2, "0")}`}
            title={service.title}
            titleId={titleId}
            body={service.body}
            tone={tone.text}
          />
        </div>

        <RevealGroup className="divide-y divide-line border-y border-line">
          <RevealItem className="py-8">
            <h3 className={blockLabel}>Ne yapıyoruz</h3>
            <ul className="mt-5 space-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex gap-3 text-fg">
                  <CheckIcon className={`mt-1 shrink-0 ${tone.text}`} />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="py-8">
            <h3 className={blockLabel}>Nasıl çalışıyoruz</h3>
            <ol className="mt-5 space-y-5">
              {service.process.map((step, stepIndex) => {
                const [label, ...rest] = step.split(": ");
                return (
                  <li key={step} className="flex gap-4">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${tone.border} ${tone.text}`}
                    >
                      {stepIndex + 1}
                    </span>
                    <p className="pt-0.5 leading-relaxed text-fg-muted">
                      <span className="font-medium text-fg">{label}</span>
                      {rest.length > 0 && <>: {rest.join(": ")}</>}
                    </p>
                  </li>
                );
              })}
            </ol>
          </RevealItem>

          {service.tools.length > 0 && (
            <RevealItem className="py-8">
              <h3 className={blockLabel}>Araçlar</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.tools.map((tool) => (
                  <li key={tool.name} className="rounded-xl bg-surface p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-fg">
                      <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.dot}`} />
                      {tool.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{tool.use}</p>
                  </li>
                ))}
              </ul>
            </RevealItem>
          )}
        </RevealGroup>
      </Container>
    </Section>
  );
}
