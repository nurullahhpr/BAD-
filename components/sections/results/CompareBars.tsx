"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type CompareBarsProps = {
  before: number;
  after: number;
};

// Two bars on one scale so the size of the change reads at a glance.
// Grey = before, accent = after, both labelled so identity is never colour alone.
export function CompareBars({ before, after }: CompareBarsProps) {
  const max = Math.max(before, after);
  const bars = [
    { label: "Önce", value: before, className: "bg-line-strong" },
    { label: "Sonra", value: after, className: "bg-accent" },
  ];

  return (
    <div aria-hidden="true" className="mt-4 space-y-2">
      {bars.map((bar, index) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="w-10 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
            {bar.label}
          </span>
          <div className="h-1.5 flex-1">
            <motion.div
              className={`h-full origin-left rounded-r-full ${bar.className}`}
              style={{ width: `${(bar.value / max) * 100}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 + index * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
