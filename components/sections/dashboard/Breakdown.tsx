"use client";

import { m } from "framer-motion";
import type { BreakdownItem } from "@/lib/content/dashboard-demo";
import { formatLiraCompact, formatNumber } from "@/lib/format";
import { easeOutExpo } from "@/lib/motion";

type BreakdownProps = {
  title: string;
  items: BreakdownItem[];
};

// Ranked bars on one scale. Every value is labelled at the row, so no tooltip is needed.
export function Breakdown({ title, items }: BreakdownProps) {
  const max = Math.max(...items.map((item) => item.value));
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col rounded-xl bg-surface p-4 sm:p-5">
      <p className="text-sm font-medium text-fg">{title}</p>
      <ul className="mt-5 space-y-4">
        {items.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-fg-muted">{item.label}</span>
              <span className="tabular-nums text-fg">
                {item.display}
                <span className="text-fg-subtle"> · %{formatNumber((item.value / total) * 100)}</span>
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-line/70">
              <m.div
                className="h-full rounded-r-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.06 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4 text-xs lg:mt-auto">
        <span className="text-fg-muted">Toplam</span>
        <span className="font-medium text-fg">{formatLiraCompact(total)}</span>
      </div>
    </div>
  );
}
