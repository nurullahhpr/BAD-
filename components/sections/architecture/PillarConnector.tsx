"use client";

import { motion, type Transition } from "framer-motion";
import { baseTransition, easeOutExpo, fadeUp, growDown, growX } from "@/lib/motion";

type PillarConnectorProps = {
  hub: string;
};

function line(delay: number): Transition {
  return { duration: 0.5, ease: easeOutExpo, delay };
}

/**
 * Hub → stem → bar → three drops, landing on the centers of the pillar cards.
 * Desktop only. Its grid must match the card grid gap (`gap-6`).
 */
export function PillarConnector({ hub }: PillarConnectorProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="hidden lg:block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <div className="flex flex-col items-center">
        <motion.span
          variants={fadeUp}
          transition={baseTransition}
          className="rounded-full border border-accent/40 bg-canvas px-4 py-1.5 text-sm font-semibold tracking-tight text-fg shadow-glow"
        >
          {hub}
        </motion.span>
        <motion.span
          variants={growDown}
          transition={line(0.3)}
          className="block h-10 w-px origin-top bg-accent/50"
        />
      </div>

      <div className="relative grid grid-cols-3 gap-6">
        {/* Spans from the first card center to the last: half a column in from each side. */}
        <motion.span
          variants={growX}
          transition={line(0.6)}
          className="absolute inset-x-[calc((100%_-_3rem)/6)] top-0 h-px bg-accent/50"
        />
        {[0, 1, 2].map((column) => (
          <div key={column} className="flex justify-center">
            <motion.span
              variants={growDown}
              transition={line(0.9)}
              className="block h-10 w-px origin-top bg-linear-to-b from-accent/50 to-line-strong"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
