import type { Metadata } from "next";
import { DashboardPage } from "@/components/sections/dashboard-page/DashboardPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { dashboardPage } from "@/lib/content/dashboard-page";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/dashboard";

export const metadata: Metadata = pageMetadata({
  title: `Dashboard — ${dashboardPage.hero.title}`,
  description: dashboardPage.hero.body,
  path,
});

export default function DashboardRoute() {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ label: "Ana sayfa", href: "/" }, { label: "Dashboard" }], path)]} />
      <DashboardPage />
    </>
  );
}
