"use client";

import { useReducedMotion } from "framer-motion";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { AppTabId } from "@/lib/content/dashboard-app";

type TabState = {
  tab: AppTabId;
  setTab: (tab: AppTabId) => void;
};

const TabContext = createContext<TabState | null>(null);

/** Shares the active panel tab between the app mockup and the feature cards. */
export function DashboardTabProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<AppTabId>("genel");
  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
}

export function useDashboardTab(): TabState {
  const state = useContext(TabContext);
  if (!state) throw new Error("useDashboardTab must be used inside DashboardTabProvider.");
  return state;
}

export const PANEL_ID = "panel";

/** Switches the mockup to `tab` and scrolls it into view. */
export function ShowInPanelButton({ tab, label }: { tab: AppTabId; label: string }) {
  const { setTab } = useDashboardTab();
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => {
        setTab(tab);
        document
          .getElementById(PANEL_ID)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
    >
      {label}
      <span aria-hidden="true">↑</span>
    </button>
  );
}
