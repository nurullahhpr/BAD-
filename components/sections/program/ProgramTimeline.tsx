"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ProgramPhase } from "@/lib/content/home";
import { easeOutExpo } from "@/lib/motion";

type ProgramTimelineProps = {
  phases: ProgramPhase[];
  totalDays: number;
};

/**
 * Day 0 → 90 track whose fill follows the scroll. A phase lights up once the
 * fill reaches its start day. lg: horizontal track over three columns;
 * below lg: vertical track beside stacked phases.
 */
export function ProgramTimeline({ phases, totalDays }: ProgramTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [position, setPosition] = useState(0);

  // Follow the smoothed value so dots light up exactly when the fill reaches them.
  useMotionValueEvent(progress, "change", (value) => {
    setPosition(Math.round(value * 100) / 100);
  });

  const current = reduceMotion ? 1 : position;
  const fill = reduceMotion ? 1 : progress;
  const ticks = [...phases.map((phase) => phase.startDay), totalDays];
  // Clamp so day 0 needs a little scroll and the last day is reachable.
  const isReached = (day: number) => current >= Math.min(Math.max(day / totalDays, 0.02), 0.98);

  return (
    <div ref={ref} className="relative">
      {/* Horizontal track, lg+. Day 0/30/60/90 dots sit on the column dividers (no column gap). */}
      <div aria-hidden="true" className="relative hidden pb-8 lg:block">
        <div className="relative h-px bg-line-strong">
          <motion.div className="absolute inset-0 origin-left bg-accent" style={{ scaleX: fill }} />
          {ticks.map((day) => (
            <span
              key={day}
              className={cn(
                "absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500",
                isReached(day) ? "border-accent bg-accent"
                  : "border-line-strong bg-canvas",
              )}
              style={{ left: `${(day / totalDays) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Vertical track, below lg. */}
      <div aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-px bg-line-strong lg:hidden">
        <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY: fill }} />
      </div>

      <ol className="grid gap-12 lg:grid-cols-3 lg:gap-0">
        {phases.map((phase, index) => {
          const active = isReached(phase.startDay);
          return (
            <li
              key={phase.name}
              className={cn(
                "relative pl-12 lg:pr-8",
                index === 0 ? "lg:pl-0" : "lg:border-l lg:border-line lg:pl-8",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-0.5 left-0 flex size-6 items-center justify-center rounded-full border bg-canvas transition-colors duration-500 lg:hidden",
                  active ? "border-accent" : "border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors duration-500",
                    active ? "bg-accent" : "bg-line-strong",
                  )}
                />
              </span>

              <motion.div
                initial={false}
                animate={{ opacity: active ? 1 : 0.45 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {String(index + 1).padStart(2, "0")} · Gün {phase.startDay}–{phase.endDay}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-fg">{phase.name}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{phase.summary}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
