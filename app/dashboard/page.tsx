import type { Metadata } from "next";
import { DashboardPage } from "@/components/sections/dashboard-page/DashboardPage";
import { dashboardPage } from "@/lib/content/dashboard-page";

export const metadata: Metadata = {
  title: `${dashboardPage.hero.eyebrow} — ${dashboardPage.hero.title}`,
  description: dashboardPage.hero.body,
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
