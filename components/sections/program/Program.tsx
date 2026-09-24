import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { program } from "@/lib/content/home";
import { ProgramTimeline } from "./ProgramTimeline";

export function Program() {
  const { eyebrow, title, body, phases, totalDays } = program;

  return (
    <Section id="nasil-calisiyoruz" aria-labelledby="program-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="program-title" body={body} />
        <div className="mt-12 sm:mt-16">
          <ProgramTimeline phases={phases} totalDays={totalDays} />
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/nasil-calisiyoruz" variant="secondary" withArrow>
            Programın detayları
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
