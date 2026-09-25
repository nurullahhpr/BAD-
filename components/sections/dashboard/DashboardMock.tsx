"use client";

import { m } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { dashboardTabs, demoPeriod } from "@/lib/content/dashboard-demo";
import { easeOutExpo } from "@/lib/motion";
import { Breakdown } from "./Breakdown";
import { Sidebar, WindowBar } from "./DashboardChrome";
import { KpiTile } from "./KpiTile";
import { RevenueChart } from "./RevenueChart";

// Static but clickable preview of the BADİ Dashboard. Tabs swap every number on the
// screen together; the chart line morphs instead of remounting.
export function DashboardMock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tab = dashboardTabs[activeIndex] ?? dashboardTabs[0]!;

  function select(index: number) {
    const next = (index + dashboardTabs.length) % dashboardTabs.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") select(activeIndex + 1);
    else if (event.key === "ArrowLeft") select(activeIndex - 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(dashboardTabs.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className="overflow-hidden rounded-panel bg-surface text-left">
      <WindowBar />
      <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        <Sidebar />

        <div className="min-w-0 bg-canvas p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Dashboard görünümü"
              onKeyDown={handleKey}
              className="flex gap-1 rounded-lg bg-surface p-1"
            >
              {dashboardTabs.map((item, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                      selected ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                    )}
                  >
                    {selected && (
                      <m.span
                        layoutId={`${baseId}-indicator`}
                        className="absolute inset-0 rounded-md bg-surface-overlay"
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-start gap-0.5 sm:items-end">
              <span className="rounded-md bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted">
                {demoPeriod.label}
              </span>
              <span className="text-[11px] text-fg-subtle">{demoPeriod.compareLabel}</span>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            className="mt-5 space-y-3"
          >
            <m.div
              key={tab.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
              className="grid grid-cols-2 gap-3 lg:grid-cols-4"
            >
              {tab.kpis.map((kpi) => (
                <KpiTile key={kpi.label} kpi={kpi} />
              ))}
            </m.div>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
              <div className="rounded-xl bg-surface p-4 sm:p-5">
                <p className="text-sm font-medium text-fg">{tab.series.title}</p>
                <p className="text-xs text-fg-subtle">₺, günlük</p>
                <div className="mt-4">
                  <RevenueChart title={tab.series.title} values={tab.series.values} days={demoPeriod.days} />
                </div>
              </div>
              <Breakdown key={tab.id} title={tab.breakdown.title} items={tab.breakdown.items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
