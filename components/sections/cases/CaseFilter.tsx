"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CaseCard } from "@/components/sections/results/CaseCard";
import { cn } from "@/lib/cn";
import type { CaseStudy, Sector } from "@/lib/content/cases";
import { baseTransition, easeOutExpo } from "@/lib/motion";

type CaseFilterProps = {
  cases: CaseStudy[];
  sectors: readonly Sector[];
  label: string;
  allLabel: string;
};

type Choice = Sector | "all";

// Toggle buttons filter the grid by sector; cards re-flow with a layout animation.
export function CaseFilter({ cases, sectors, label, allLabel }: CaseFilterProps) {
  const [choice, setChoice] = useState<Choice>("all");
  const visible = choice === "all" ? cases : cases.filter((study) => study.sector === choice);
  const options: { value: Choice; label: string; count: number }[] = [
    { value: "all", label: allLabel, count: cases.length },
    ...sectors.map((sector) => ({
      value: sector,
      label: sector,
      count: cases.filter((study) => study.sector === sector).length,
    })),
  ];

  return (
    <div>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = option.value === choice;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => setChoice(option.value)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                pressed
                  ? "border-accent/40 bg-accent/10 text-fg"
                  : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {option.label}
              <span className={cn("font-mono text-xs", pressed ? "text-accent" : "text-fg-subtle")}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-fg-subtle">
        {visible.length} vaka gösteriliyor
      </p>

      <ul className="mt-6 grid gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study) => (
            <motion.li
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: easeOutExpo } }}
              transition={baseTransition}
            >
              <CaseCard study={study} headingLevel="h2" />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
