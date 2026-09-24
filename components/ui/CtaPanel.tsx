import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";

type CtaPanelProps = {
  id?: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  fineprint?: string[];
};

/** Closing call-to-action panel shared by the home page and the service pages. */
export function CtaPanel({ id, title, body, cta, href, fineprint = [] }: CtaPanelProps) {
  const titleId = `${id ?? "cta"}-title`;

  return (
    <Section id={id} aria-labelledby={titleId}>
      <Container>
        <Reveal className="relative overflow-hidden rounded-panel border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
          <GridBackdrop from="bottom" />
          <div className="relative">
            <h2
              id={titleId}
              className="mx-auto max-w-3xl text-balance text-display-sm font-medium text-fg sm:text-display-md"
            >
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
              {body}
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href={href} withArrow className="w-full sm:w-auto">
                {cta}
              </ButtonLink>
            </div>
            {fineprint.length > 0 && (
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-fg-subtle">
                {fineprint.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
