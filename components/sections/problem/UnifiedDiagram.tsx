"use client";

import { motion, type Variants } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Pillar } from "@/lib/content/home";
import { baseTransition, easeOutExpo, fadeUp, growDown, stagger } from "@/lib/motion";

type UnifiedDiagramProps = {
  eyebrow: string;
  title: string;
  input: string;
  roofTag: string;
  pillars: Pillar[];
  outputs: string[];
};

// Root fades up, then walks the flow top to bottom: brand → BADİ → outcomes.
const root: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

export function UnifiedDiagram({
  eyebrow,
  title,
  input,
  roofTag,
  pillars,
  outputs,
}: UnifiedDiagramProps) {
  return (
    <motion.figure
      variants={root}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      className="rounded-card border border-line bg-surface p-5 sm:p-8"
    >
      <figcaption>
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="mt-3 text-xl font-medium tracking-tight text-fg">{title}</p>
      </figcaption>

      <div className="mt-8 flex flex-col items-center">
        <motion.div
          variants={fadeUp}
          transition={baseTransition}
          className="rounded-full border border-line-strong bg-surface-raised px-4 py-2 text-sm text-fg"
        >
          {input}
        </motion.div>

        <Connector />

        <motion.div
          variants={fadeUp}
          transition={baseTransition}
          className="w-full rounded-xl border border-accent/40 bg-canvas p-3 shadow-glow sm:p-4"
        >
          <div className="flex items-center justify-between px-1 pb-3">
            <span className="text-sm font-semibold tracking-tight text-fg">BADİ</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {roofTag}
            </span>
          </div>

          <motion.ul variants={stagger(0.1)} className="grid gap-2 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <motion.li
                key={pillar.name}
                variants={fadeUp}
                transition={baseTransition}
                className="rounded-lg border border-line bg-surface p-4"
              >
                <p className="text-sm font-medium text-fg">{pillar.name}</p>
                <p className="mt-0.5 text-xs text-fg-muted">{pillar.scope}</p>
                <ul className="mt-3 flex flex-col gap-y-1.5 sm:mt-4 sm:gap-y-2">
                  {pillar.services.map((service) => (
                    <li key={service.title} className="flex items-start gap-2 text-xs text-fg-subtle">
                      <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70" />
                      {service.title}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <Connector />

        <motion.ul
          variants={fadeUp}
          transition={baseTransition}
          className="flex flex-wrap justify-center gap-2"
        >
          {outputs.map((output) => (
            <li
              key={output}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
            >
              {output}
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.figure>
  );
}

function Connector() {
  return (
    <motion.span
      aria-hidden="true"
      variants={growDown}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className="block h-8 w-px origin-top bg-linear-to-b from-line-strong to-accent/60"
    />
  );
}
