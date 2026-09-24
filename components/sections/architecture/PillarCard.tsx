"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/ui/icons";
import type { Pillar } from "@/lib/content/home";
import { baseTransition, easeOutExpo, fadeUp } from "@/lib/motion";
import { PillarGlyph } from "./PillarGlyph";

type PillarCardProps = {
  pillar: Pillar;
  index: number;
};

// Entrance comes from the parent RevealGroup; hover lifts the card.
// lg: the card spans four subgrid rows so descriptions and service lists line up across cards.
export function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      transition={baseTransition}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: easeOutExpo } }}
      className="flex flex-col rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/30 sm:p-8 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
    >
      <div className="h-28 overflow-hidden rounded-xl border border-line bg-canvas px-4 py-3">
        <PillarGlyph id={pillar.id} />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-medium tracking-tight text-fg">{pillar.name}</h3>
          <span className="font-mono text-xs text-fg-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {pillar.scope}
        </p>
      </div>
      <p className="mt-4 leading-relaxed text-fg-muted">{pillar.description}</p>

      <ul className="mt-6 space-y-3 border-t border-line pt-6">
        {pillar.services.map((service) => (
          <li key={service} className="flex gap-3 text-sm text-fg">
            <CheckIcon className="mt-0.5 shrink-0 text-accent" />
            {service}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
