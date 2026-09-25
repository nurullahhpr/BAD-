import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PillarGlyph } from "@/components/sections/architecture/PillarGlyph";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { pillars } from "@/lib/content/home";
import type { PillarPage } from "@/lib/content/services";
import { pillarTheme } from "@/lib/pillarTheme";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceHero({ page }: { page: PillarPage }) {
  const { pillar, index, intro, services } = page;
  const tone = pillarTheme[pillar.id];

  return (
    <section aria-labelledby="service-hero-title" className="relative overflow-hidden">
      <GridBackdrop from="top" />
      <Container className="relative grid gap-12 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16 lg:pt-20">
        <div>
          <nav aria-label="Sayfa konumu">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
              <li>
                <Link href="/" className="inline-block py-1 transition-colors hover:text-fg">
                  Ana sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#hizmetler" className="inline-block py-1 transition-colors hover:text-fg">
                  Hizmetler
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg-muted">
                {pillar.name}
              </li>
            </ol>
          </nav>
          <div className="mt-10">
            <Eyebrow tone={tone.text}>{pillar.scope}</Eyebrow>
            <h1
              id="service-hero-title"
              className="mt-5 text-display-sm font-medium text-fg sm:text-display-md xl:text-display-lg"
            >
              {pillar.name}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">{intro}</p>
          </div>
          <Reveal delay={0.08} className="mt-10">
            <p className="sr-only">Bu sayfadaki hizmetler</p>
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-1.5 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <ServiceIcon pillar={pillar.id} service={service.slug} className="size-7" />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-panel border border-line bg-surface/80 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between font-mono text-xs text-fg-subtle">
              <span>BADİ Mimarisi</span>
              <span>
                {String(index + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 h-40 rounded-xl border border-line bg-canvas px-4 py-3">
              <PillarGlyph id={pillar.id} standalone />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
