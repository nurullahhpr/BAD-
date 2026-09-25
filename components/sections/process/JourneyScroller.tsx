"use client";

import {
  AnimatePresence,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { JourneyStep } from "@/lib/content/process";
import { easeOutExpo, INACTIVE_OPACITY } from "@/lib/motion";

type JourneyScrollerProps = {
  steps: JourneyStep[];
  phaseNames: string[];
  totalDays: number;
};

// Scroll-driven journey. The step crossing the middle of the viewport becomes active;
// lg shows it in a sticky panel with a 0–90 day bar, and a rail fills beside the list.
export function JourneyScroller({ steps, phaseNames, totalDays }: JourneyScrollerProps) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.5", "end 0.5"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const step = steps[active] ?? steps[0]!;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28" aria-live="polite">
          <div className="rounded-panel border border-line bg-surface p-8">
            <div className="flex items-center justify-between font-mono text-xs text-fg-subtle">
              <span>
                Adım {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <span>{phaseNames[step.phase]}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
                className="mt-8 min-h-44"
              >
                <p className="font-mono text-display-sm font-medium tracking-tight text-accent">
                  {step.day}
                </p>
                <p className="mt-4 text-xl font-medium tracking-tight text-fg">{step.title}</p>
                <p className="mt-2 leading-relaxed text-fg-muted">{step.body}</p>
              </m.div>
            </AnimatePresence>

            <div aria-hidden="true" className="mt-8">
              <div className="relative h-1.5 rounded-full bg-line">
                <m.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  animate={{ width: `${(step.dayValue / totalDays) * 100}%` }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                />
                {[30, 60].map((day) => (
                  <span
                    key={day}
                    className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-line-strong"
                    style={{ left: `${(day / totalDays) * 100}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-subtle">
                <span>Gün 0</span>
                <span>Gün {totalDays}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-px bg-line-strong">
          <m.div
            className="absolute inset-0 origin-top bg-accent"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />
        </div>
        <ol ref={listRef} className="relative space-y-4 lg:space-y-0">
          {steps.map((item, index) => (
            <JourneyItem
              key={item.day}
              step={item}
              phaseName={phaseNames[item.phase] ?? ""}
              active={index === active}
              reached={index <= active}
              onActive={() => setActive(index)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

type JourneyItemProps = {
  step: JourneyStep;
  phaseName: string;
  active: boolean;
  reached: boolean;
  onActive: () => void;
};

function JourneyItem({ step, phaseName, active, reached, onActive }: JourneyItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  // A zero-height band in the middle of the viewport: the item crossing it is active.
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className="relative pl-12 lg:flex lg:min-h-[38vh] lg:items-center">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-4 left-0 flex size-6 items-center justify-center rounded-full border bg-canvas transition-colors duration-300 lg:top-1/2 lg:-translate-y-1/2",
          reached ? "border-accent" : "border-line-strong",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full transition-colors duration-300",
            reached ? "bg-accent" : "bg-line-strong",
          )}
        />
      </span>
      <m.div
        initial={false}
        animate={{ opacity: active ? 1 : INACTIVE_OPACITY }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className={cn(
          "w-full rounded-card border p-5 transition-colors duration-300 sm:p-6",
          active ? "border-accent/30 bg-surface" : "border-line bg-transparent",
        )}
      >
        <p className="flex flex-wrap items-center gap-x-3 font-mono text-xs uppercase tracking-[0.15em]">
          <span className="text-accent">{step.day}</span>
          <span className="text-fg-muted">{phaseName}</span>
        </p>
        <h3 className="mt-2 text-lg font-medium tracking-tight text-fg">{step.title}</h3>
        <p className="mt-1.5 leading-relaxed text-fg-muted">{step.body}</p>
      </m.div>
    </li>
  );
}
