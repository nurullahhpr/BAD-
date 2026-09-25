import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/content/about";
import { TeamCard } from "./TeamCard";

/** Team grid. Members are PLACEHOLDER until the real names, roles and photos arrive. */
export function Team() {
  const { team } = aboutPage;

  return (
    <Section id="ekip" aria-labelledby="team-title">
      <Container>
        <SectionHeader eyebrow={team.eyebrow} title={team.title} titleId="team-title" body={team.body} />
        <RevealGroup as="ul" gap={0.06} className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
          {team.members.map((member, index) => (
            <RevealItem as="li" key={`${member.role}-${index}`}>
              <TeamCard member={member} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
