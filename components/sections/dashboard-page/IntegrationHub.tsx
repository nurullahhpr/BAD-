"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { IconChip } from "@/components/ui/IconChip";
import { cn } from "@/lib/cn";
import { dashboardPage, type Integration } from "@/lib/content/dashboard-page";
import { AppIcon } from "./AppIcon";

type Side = "left" | "right";

// Sources on both sides feed the hub in the middle. On lg a short line joins every tile
// to the hub, and a dot travels along it toward the hub: data flows in, one direction.
export function IntegrationHub() {
  const { groups, hubTitle, hubBody, hubModules } = dashboardPage.integrations;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const animate = inView && !reduceMotion;
  const sourceCount = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div
      ref={ref}
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem_minmax(0,1fr)] lg:items-stretch lg:gap-0"
    >
      <SourceGroup label={groups[0]!.label} items={groups[0]!.items} side="left" animate={animate} />

      <div className="order-first lg:order-none">
        <div className="flex h-full flex-col items-center justify-center rounded-panel bg-surface p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-sm font-semibold tracking-tight text-accent">
            BADİ
          </span>
          <p className="mt-5 text-lg font-medium tracking-tight text-fg">{hubTitle}</p>
          <p className="mt-1 text-sm text-fg-muted">{hubBody}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-1.5">
            {hubModules.map((module) => (
              <li key={module} className="rounded-md bg-surface-overlay px-2 py-0.5 text-xs font-medium text-fg-muted">
                {module}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs text-fg-subtle">{sourceCount} kaynak · 1 ekran</p>
        </div>
      </div>

      <SourceGroup label={groups[1]!.label} items={groups[1]!.items} side="right" animate={animate} />
    </div>
  );
}

type SourceGroupProps = {
  label: string;
  items: Integration[];
  side: Side;
  animate: boolean;
};

function SourceGroup({ label, items, side, animate }: SourceGroupProps) {
  return (
    <div className="flex flex-col">
      <h3
        className={cn(
          "mb-4 text-xs uppercase tracking-wider font-medium text-fg-subtle",
          side === "left" ? "lg:pr-14" : "lg:pl-14 lg:text-right",
        )}
      >
        {label}
      </h3>
      <ul className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:content-around">
        {items.map((item, index) => (
          <li key={item.name} className={cn("flex items-center", side === "right" && "lg:flex-row-reverse")}>
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-surface px-4 py-3">
              <IconChip>
                <AppIcon name={item.icon} />
              </IconChip>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-fg">{item.name}</span>
                <span className="block truncate text-xs text-fg-subtle">{item.detail}</span>
              </span>
            </div>
            <Connector side={side} animate={animate} delay={index * 0.4} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const LINE = 56;

function Connector({ side, animate, delay }: { side: Side; animate: boolean; delay: number }) {
  // Same number of keyframes for x and opacity so one `times` array fits both.
  const travel = LINE - 6;
  const path = [0, travel * 0.2, travel * 0.8, travel];
  const x = side === "left" ? path : [...path].reverse();

  return (
    <span aria-hidden="true" className="relative hidden h-px shrink-0 bg-line-strong lg:block" style={{ width: LINE }}>
      {animate && (
        <m.span
          className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-accent"
          initial={{ x: x[0], opacity: 0 }}
          animate={{ x, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 1.2, delay, times: [0, 0.2, 0.8, 1] }}
        />
      )}
    </span>
  );
}
