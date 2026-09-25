"use client";

import { useState } from "react";
import { StackedBar } from "@/components/charts/StackedBar";
import { cn } from "@/lib/cn";
import { daysOfCover, stock, stockLevel, type StockLevel, type StockRow } from "@/lib/content/dashboard-app";
import { formatNumber } from "@/lib/format";
import { AppCard } from "../AppCard";
import { DataTable, type Column } from "../DataTable";
import { Segmented } from "../Segmented";
import { StatusPill, type Status } from "../StatusPill";
import { KpiGrid } from "./KpiGrid";

const levelStatus: Record<StockLevel, Status> = { Kritik: "negative", Azalıyor: "warning", Yeterli: "positive" };
const levelBar: Record<StockLevel, string> = { Kritik: "bg-negative", Azalıyor: "bg-warning", Yeterli: "bg-positive" };
const COVER_SCALE = 60;

const columns: Column<StockRow>[] = [
  {
    key: "product",
    header: "Ürün",
    sortValue: (row) => row.product,
    render: (row) => (
      <span>
        <span className="block text-fg">{row.product}</span>
        <span className="block font-mono text-xs text-fg-subtle">{row.sku}</span>
      </span>
    ),
  },
  { key: "onHand", header: "Stok", align: "right", sortValue: (row) => row.onHand, render: (row) => `${formatNumber(row.onHand)} adet` },
  { key: "sales", header: "Günlük satış", align: "right", sortValue: (row) => row.dailySales, render: (row) => formatNumber(row.dailySales, 1) },
  {
    key: "cover",
    header: "Kalan gün",
    align: "right",
    sortValue: daysOfCover,
    render: (row) => {
      const days = daysOfCover(row);
      return (
        <span className="inline-flex items-center justify-end gap-2">
          <span aria-hidden="true" className="hidden h-1 w-16 rounded-full bg-line sm:block">
            <span
              className={cn("block h-full rounded-full", levelBar[stockLevel(days)])}
              style={{ width: `${Math.min(days / COVER_SCALE, 1) * 100}%` }}
            />
          </span>
          <span className="text-fg">{formatNumber(days, 1)} gün</span>
        </span>
      );
    },
  },
  {
    key: "level",
    header: "Durum",
    render: (row) => {
      const level = stockLevel(daysOfCover(row));
      return <StatusPill status={levelStatus[level]} label={level} />;
    },
  },
];

type StockFilter = "all" | "attention";

export function StockPanel() {
  const [filter, setFilter] = useState<StockFilter>("attention");
  const attention = stock.rows.filter((row) => stockLevel(daysOfCover(row)) !== "Yeterli");
  const rows = filter === "all" ? stock.rows : attention;
  const { buckets } = stock;

  return (
    <div className="space-y-3">
      <KpiGrid kpis={stock.kpis} />
      <AppCard title="Stok durumu" subtitle="Ürün sayısı, kalan güne göre">
        <StackedBar
          unit="ürün"
          segments={[
            { label: "Yeterli (14+ gün)", value: buckets.enough, color: "bg-positive" },
            { label: "Azalıyor (7–14 gün)", value: buckets.low, color: "bg-warning" },
            { label: "Kritik (7 günden az)", value: buckets.critical, color: "bg-negative" },
            { label: "Stokta yok", value: buckets.out, color: "bg-fg-subtle" },
          ]}
        />
      </AppCard>
      <AppCard
        title="Ürünler"
        subtitle="Kalan gün = stok ÷ günlük satış"
        actions={
          <Segmented
            label="Ürünleri filtrele"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "attention", label: "Dikkat gerektiren", count: attention.length },
              { value: "all", label: "Tümü", count: stock.rows.length },
            ]}
          />
        }
      >
        <DataTable
          caption="Ürün stok durumu"
          columns={columns}
          rows={rows}
          rowKey={(row) => row.sku}
          initialSort={{ key: "cover", direction: "asc" }}
        />
      </AppCard>
    </div>
  );
}
