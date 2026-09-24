import { Reveal } from "@/components/motion/Reveal";
import { Parallax, ScrollScene } from "@/components/motion/ScrollScene";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/lib/content/home";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroStats } from "./HeroStats";

export function Hero() {
  const { headline } = hero;

  return (
    <ScrollScene aria-labelledby="hero-title" className="relative overflow-hidden">
      <HeroBackdrop />

      <Container className="relative grid gap-14 pt-16 pb-12 sm:pt-24 sm:pb-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center lg:gap-16 lg:pt-32 lg:pb-28">
        <Parallax y={-80} fade>
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-display-sm font-medium text-fg sm:text-display-md xl:text-display-lg"
            >
              {headline.lead} <span className="text-fg-muted">{headline.trail}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10">
            <ButtonLink href={hero.cta.href} withArrow className="w-full sm:w-auto">
              {hero.cta.label}
            </ButtonLink>
          </Reveal>
        </Parallax>

        {/* No fade here: on mobile the card sits low and must stay readable while scrolling to it. */}
        <Parallax y={-30}>
          <Reveal delay={0.32}>
            <HeroStats />
          </Reveal>
        </Parallax>
      </Container>
    </ScrollScene>
  );
}
