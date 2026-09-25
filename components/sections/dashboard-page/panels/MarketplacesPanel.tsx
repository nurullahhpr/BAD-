"use client";

import { LineChart } from "@/components/charts/LineChart";
import { appMeta, marketplaces, type MarketplaceRow } from "@/lib/content/dashboard-app";
import { formatLiraCompact, formatNumber } from "@/lib/format";
import { AppCard } from "../AppCard";
import { DataTable, type Column } from "../DataTable";
import { DAY_TICKS, KpiGrid } from "./KpiGrid";

/** Rate with a thin meter; the number always carries the value. */
function RateCell({ value, max }: { value: number; max: number }) {
  return (
    <span className="inline-flex items-center justify-end gap-2">
      <span aria-hidden="true" className="hidden h-1 w-12 rounded-full bg-line sm:block">
        <span className="block h-full rounded-full bg-fg-subtle" style={{ width: `${(value / max) * 100}%` }} />
      </span>
      <span className="text-fg">%{formatNumber(value, Number.isInteger(value) ? 0 : 1)}</span>
    </span>
  );
}

const columns: Column<MarketplaceRow>[] = [
  { key: "channel", header: "Pazar yeri", sortValue: (row) => row.channel, render: (row) => <span className="font-medium text-fg">{row.channel}</span> },
  { key: "revenue", header: "Ciro", align: "right", sortValue: (row) => row.revenue, render: (row) => formatLiraCompact(row.revenue) },
  { key: "orders", header: "Sipariş", align: "right", sortValue: (row) => row.orders, render: (row) => formatNumber(row.orders) },
  { key: "basket", header: "Ort. sepet", align: "right", sortValue: (row) => row.revenue / row.orders, render: (row) => `${formatNumber(row.revenue / row.orders)} ₺` },
  { key: "return", header: "İade oranı", align: "right", sortValue: (row) => row.returnRate, render: (row) => <RateCell value={row.returnRate} max={10} /> },
  { key: "buybox", header: "Buybox", align: "right", sortValue: (row) => row.buybox, render: (row) => <RateCell value={row.buybox} max={100} /> },
];

export function MarketplacesPanel() {
  return (
    <div className="space-y-3">
      <KpiGrid kpis={marketplaces.kpis} />
      <AppCard title={marketplaces.revenue.title} subtitle="₺, günlük · Trendyol, Hepsiburada ve Amazon toplamı">
        <LineChart
          title={marketplaces.revenue.title}
          values={marketplaces.revenue.values}
          labels={appMeta.days}
          xTicks={DAY_TICKS}
        />
      </AppCard>
      <AppCard title="Kanal karşılaştırması" subtitle="Sütun başlığına tıklayarak sıralayın">
        <DataTable
          caption="Pazar yeri karşılaştırması"
          columns={columns}
          rows={marketplaces.rows}
          rowKey={(row) => row.channel}
          initialSort={{ key: "revenue", direction: "desc" }}
        />
      </AppCard>
    </div>
  );
}
