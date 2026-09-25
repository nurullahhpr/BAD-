"use client";

import { LineChart } from "@/components/charts/LineChart";
import { Breakdown } from "@/components/sections/dashboard/Breakdown";
import { appMeta, overview, type RecentOrder } from "@/lib/content/dashboard-app";
import { formatNumber } from "@/lib/format";
import { AppCard } from "../AppCard";
import { DataTable, type Column } from "../DataTable";
import { StatusPill, type Status } from "../StatusPill";
import { DAY_TICKS, KpiGrid } from "./KpiGrid";

const orderStatus: Record<RecentOrder["status"], Status> = {
  Hazırlanıyor: "neutral",
  Kargoda: "neutral",
  "Teslim edildi": "positive",
  "İade talebi": "negative",
};

const columns: Column<RecentOrder>[] = [
  { key: "id", header: "Sipariş", render: (row) => <span className="font-mono text-xs text-fg">{row.id}</span> },
  { key: "channel", header: "Kanal", sortValue: (row) => row.channel, render: (row) => <span className="text-fg-muted">{row.channel}</span> },
  { key: "amount", header: "Tutar", align: "right", sortValue: (row) => row.amount, render: (row) => <span className="text-fg">{formatNumber(row.amount)} ₺</span> },
  { key: "status", header: "Durum", render: (row) => <StatusPill status={orderStatus[row.status]} label={row.status} /> },
  { key: "time", header: "Zaman", align: "right", render: (row) => <span className="text-fg-subtle">{row.time}</span> },
];

export function OverviewPanel() {
  return (
    <div className="space-y-3">
      <KpiGrid kpis={overview.kpis} />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <AppCard title={overview.revenue.title} subtitle="₺, günlük">
          <LineChart title={overview.revenue.title} values={overview.revenue.values} labels={appMeta.days} xTicks={DAY_TICKS} />
        </AppCard>
        <Breakdown title={overview.channels.title} items={overview.channels.items} />
      </div>
      <AppCard title="Son siparişler" subtitle="Tüm kanallardan, en yeni en üstte">
        <DataTable caption="Son siparişler" columns={columns} rows={overview.orders} rowKey={(row) => row.id} />
      </AppCard>
    </div>
  );
}
