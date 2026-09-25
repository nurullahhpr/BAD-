"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { appMeta, appTabs, connectedSources, type AppTabId } from "@/lib/content/dashboard-app";
import { easeOutExpo } from "@/lib/motion";
import { AppIcon, type AppIconName } from "./AppIcon";
import { useDashboardTab } from "./DashboardTabs";
import { AdsPanel } from "./panels/AdsPanel";
import { MarketplacesPanel } from "./panels/MarketplacesPanel";
import { OverviewPanel } from "./panels/OverviewPanel";
import { ReportsPanel } from "./panels/ReportsPanel";
import { StockPanel } from "./panels/StockPanel";

const tabIcons: Record<AppTabId, AppIconName> = {
  genel: "overview",
  reklamlar: "ads",
  "pazar-yerleri": "marketplaces",
  stok: "stock",
  raporlar: "reports",
};

const panels: Record<AppTabId, () => ReactNode> = {
  genel: () => <OverviewPanel />,
  reklamlar: () => <AdsPanel />,
  "pazar-yerleri": () => <MarketplacesPanel />,
  stok: () => <StockPanel />,
  raporlar: () => <ReportsPanel />,
};

// Interactive product mockup: window bar, module sidebar (a tablist) and the active panel.
// Demo data only; nothing here talks to a backend.
export function DashboardApp() {
  const { tab, setTab } = useDashboardTab();
  const baseId = useId();
  const tabRefs = useRef<Partial<Record<AppTabId, HTMLButtonElement | null>>>({});
  const active = appTabs.find((item) => item.id === tab) ?? appTabs[0]!;

  function focusTab(index: number) {
    const next = appTabs[(index + appTabs.length) % appTabs.length]!;
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const index = appTabs.findIndex((item) => item.id === tab);
    // Vertical on desktop, horizontal on phones: accept both axes.
    if (event.key === "ArrowDown" || event.key === "ArrowRight") focusTab(index + 1);
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") focusTab(index - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(appTabs.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className="overflow-hidden rounded-panel border border-line-strong bg-surface text-left shadow-window">
      {/* Window bar */}
      <div className="flex h-12 items-center gap-3 border-b border-line px-4">
        <div aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-line-strong" />
          ))}
        </div>
        <p className="hidden text-xs text-fg-subtle sm:block">
          {appMeta.workspace} <span aria-hidden="true">/</span>{" "}
          <span className="text-fg-muted">{active.label}</span>
        </p>
        <div
          aria-hidden="true"
          className="ml-auto hidden w-56 items-center gap-2 rounded-md border border-line bg-canvas px-2.5 py-1 text-xs text-fg-subtle md:flex"
        >
          <AppIcon name="search" className="size-3.5" />
          Ara
          <kbd className="ml-auto font-mono text-[10px]">⌘K</kbd>
        </div>
        <span className="ml-auto rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle md:ml-0">
          Demo
        </span>
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-full bg-surface-overlay font-mono text-[10px] text-fg-muted"
        >
          {appMeta.initials}
        </span>
      </div>

      {/* minmax(0,1fr) on phones too: wide tables must scroll inside, not stretch the grid. */}
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Sidebar */}
        <div className="flex min-w-0 flex-col border-b border-line lg:border-r lg:border-b-0">
          <div aria-hidden="true" className="hidden items-center gap-3 px-4 pt-5 pb-3 lg:flex">
            <span className="flex size-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-[10px] text-accent">
              {appMeta.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-fg">{appMeta.workspace}</span>
              <span className="block text-xs text-fg-subtle">BADİ Dashboard</span>
            </span>
            <AppIcon name="chevron" className="text-fg-subtle" />
          </div>

          <div
            role="tablist"
            aria-label="Panel modülleri"
            aria-orientation="vertical"
            onKeyDown={handleKey}
            className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:px-3 lg:py-2"
          >
            {appTabs.map((item) => {
              const selected = item.id === tab;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[item.id] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                    selected ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId={`${baseId}-active`}
                      className="absolute inset-0 rounded-lg bg-surface-overlay"
                      transition={{ duration: 0.3, ease: easeOutExpo }}
                    />
                  )}
                  <AppIcon name={tabIcons[item.id]} className={cn("relative", selected && "text-accent")} />
                  <span className="relative">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="relative ml-auto rounded-full bg-negative/15 px-1.5 font-mono text-[10px] text-negative">
                      {item.badge}
                      <span className="sr-only"> kritik ürün</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-auto hidden p-4 lg:block">
            <div className="rounded-lg border border-line p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">Bağlı kaynaklar</p>
              <ul className="mt-3 space-y-2">
                {connectedSources.map((source) => (
                  <li key={source} className="flex items-center gap-2 text-xs text-fg-muted">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-positive" />
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="min-w-0 bg-canvas p-4 sm:p-6 lg:min-h-[52rem]"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium tracking-tight text-fg">{active.label}</h3>
              <p className="text-sm text-fg-subtle">{active.summary}</p>
            </div>
            <div className="flex flex-col items-start gap-0.5 sm:items-end">
              <span className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted">
                {appMeta.period}
              </span>
              <span className="text-[11px] text-fg-subtle">{appMeta.compareLabel}</span>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
            >
              {panels[tab]()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
