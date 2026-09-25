import Link from "next/link";
import { RevealItem } from "@/components/motion/RevealGroup";
import { CheckIcon } from "@/components/ui/icons";
import type { Pillar } from "@/lib/content/home";
import { pillarHref } from "@/lib/content/services";
import { pillarTheme } from "@/lib/pillarTheme";
import { PillarGlyph } from "./PillarGlyph";

type PillarCardProps = {
  pillar: Pillar;
  index: number;
};

// Server component. Entrance comes from the parent RevealGroup via RevealItem; the inner
// card lifts on hover with CSS (the outer transform belongs to the entrance animation).
// lg: both layers span four subgrid rows so headers, service lists and links line up across cards.
export function PillarCard({ pillar, index }: PillarCardProps) {
  const tone = pillarTheme[pillar.id];

  return (
    <RevealItem className="lg:row-span-4 lg:grid lg:grid-rows-subgrid">
      <article className="flex h-full flex-col rounded-card bg-surface p-6 transition-[translate,background-color] duration-300 ease-out-expo hover:bg-surface-raised motion-safe:hover:-translate-y-1.5 sm:p-8 lg:row-span-4 lg:grid lg:grid-rows-subgrid">
        <div className="h-28 overflow-hidden rounded-xl bg-canvas px-4 py-3">
          <PillarGlyph id={pillar.id} />
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-xl font-medium tracking-tight text-fg">{pillar.name}</h3>
            <span className="font-mono text-xs text-fg-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className={`mt-1 text-xs uppercase tracking-wider font-medium ${tone.text}`}>
            {pillar.scope}
          </p>
        </div>
        <ul className="mt-6 space-y-5 border-t border-line pt-6">
          {pillar.services.map((service) => (
            <li key={service.title} className="flex gap-3">
              <CheckIcon className={`mt-1 shrink-0 ${tone.text}`} />
              <div>
                <h4 className="text-sm font-medium text-fg">{service.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{service.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href={pillarHref(pillar.id)}
          className="mt-8 inline-flex min-h-6 items-center gap-2 self-start text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          {pillar.name} detayları
          <span aria-hidden="true">→</span>
        </Link>
      </article>
    </RevealItem>
  );
}
