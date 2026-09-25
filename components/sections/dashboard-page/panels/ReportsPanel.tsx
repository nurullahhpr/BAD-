"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { cn } from "@/lib/cn";
import { reports } from "@/lib/content/dashboard-app";
import { easeOutExpo } from "@/lib/motion";
import { AppIcon } from "../AppIcon";

export function ReportsPanel() {
  const [selectedId, setSelectedId] = useState(reports[0]!.id);
  const report = reports.find((item) => item.id === selectedId) ?? reports[0]!;

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="rounded-xl border border-line bg-surface p-2">
        <p className="px-3 pt-2 pb-3 text-sm font-medium text-fg">Raporlar</p>
        <ul className="space-y-1">
          {reports.map((item) => {
            const selected = item.id === selectedId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors",
                    selected ? "bg-surface-overlay" : "hover:bg-surface-raised",
                  )}
                >
                  <AppIcon name="reports" className={cn("mt-0.5", selected ? "text-accent" : "text-fg-subtle")} />
                  <span className="min-w-0">
                    <span className="block text-sm text-fg">{item.title}</span>
                    <span className="block text-xs text-fg-subtle">
                      {item.period} · {item.schedule}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-line bg-surface p-4 sm:p-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-base font-medium text-fg">{report.title}</p>
                <p className="text-xs text-fg-subtle">
                  {report.period} · {report.schedule}
                </p>
              </div>
              <div className="flex gap-2" title="Demo sürümünde kapalı">
                {(["share", "download"] as const).map((icon) => (
                  <span
                    key={icon}
                    aria-hidden="true"
                    className="flex size-8 items-center justify-center rounded-lg border border-line text-fg-subtle"
                  >
                    <AppIcon name={icon} />
                  </span>
                ))}
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-3">
              {report.figures.map((figure) => (
                <div key={figure.label} className="rounded-lg border border-line bg-canvas p-3">
                  <dt className="truncate text-xs text-fg-muted">{figure.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-fg sm:text-base">{figure.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-xs text-fg-subtle">{report.chart.title}</p>
            <div className="mt-2">
              <BarChart
                title={report.chart.title}
                values={report.chart.values}
                labels={report.chart.labels}
                format={report.chart.format}
                height={200}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
