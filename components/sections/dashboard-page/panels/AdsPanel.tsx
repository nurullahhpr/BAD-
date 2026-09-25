"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Breakdown } from "@/components/sections/dashboard/Breakdown";
import { ads, appMeta, type Campaign } from "@/lib/content/dashboard-app";
import { formatLiraCompact, formatNumber } from "@/lib/format";
import { AppCard } from "../AppCard";
import { DataTable, type Column } from "../DataTable";
import { Segmented } from "../Segmented";
import { StatusPill } from "../StatusPill";
import { DAY_TICKS, KpiGrid } from "./KpiGrid";

type PlatformFilter = "all" | Campaign["platform"];

const columns: Column<Campaign>[] = [
  {
    key: "name",
    header: "Kampanya",
    sortValue: (row) => row.name,
    render: (row) => (
      <span>
        <span className="block text-fg">{row.name}</span>
        <span className="block text-xs text-fg-subtle">{row.platform}</span>
      </span>
    ),
  },
  {
    key: "status",
    header: "Durum",
    render: (row) => <StatusPill status={row.status === "Aktif" ? "positive" : "neutral"} label={row.status} />,
  },
  { key: "spend", header: "Harcama", align: "right", sortValue: (row) => row.spend, render: (row) => formatLiraCompact(row.spend) },
  { key: "revenue", header: "Ciro", align: "right", sortValue: (row) => row.revenue, render: (row) => formatLiraCompact(row.revenue) },
  { key: "roas", header: "ROAS", align: "right", sortValue: (row) => row.roas, render: (row) => <span className="font-medium text-fg">{formatNumber(row.roas, 1)}x</span> },
  { key: "cpa", header: "CPA", align: "right", sortValue: (row) => row.cpa, render: (row) => `${formatNumber(row.cpa)} ₺` },
  { key: "conversions", header: "Sipariş", align: "right", sortValue: (row) => row.conversions, render: (row) => formatNumber(row.conversions) },
];

export function AdsPanel() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const rows = platform === "all" ? ads.campaigns : ads.campaigns.filter((row) => row.platform === platform);
  const count = (value: Campaign["platform"]) => ads.campaigns.filter((row) => row.platform === value).length;

  return (
    <div className="space-y-3">
      <KpiGrid kpis={ads.kpis} />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <AppCard title={ads.roas.title} subtitle="Reklam kaynaklı ciro ÷ harcama">
          <LineChart title={ads.roas.title} values={ads.roas.values} labels={appMeta.days} format="ratio" xTicks={DAY_TICKS} />
        </AppCard>
        <Breakdown title={ads.platforms.title} items={ads.platforms.items} />
      </div>
      <AppCard
        title="Kampanyalar"
        subtitle="Sütun başlığına tıklayarak sıralayın"
        actions={
          <Segmented
            label="Platforma göre filtrele"
            value={platform}
            onChange={setPlatform}
            options={[
              { value: "all", label: "Tümü", count: ads.campaigns.length },
              { value: "Meta Ads", label: "Meta Ads", count: count("Meta Ads") },
              { value: "Google Ads", label: "Google Ads", count: count("Google Ads") },
            ]}
          />
        }
      >
        <DataTable
          caption="Kampanyalar"
          columns={columns}
          rows={rows}
          rowKey={(row) => row.name}
          initialSort={{ key: "spend", direction: "desc" }}
        />
      </AppCard>
    </div>
  );
}
