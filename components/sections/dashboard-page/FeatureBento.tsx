import type { ReactNode } from "react";
import { Sparkline } from "@/components/charts/Sparkline";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import {
  ads,
  daysOfCover,
  marketplaces,
  overview,
  reports,
  stock,
  stockLevel,
  type AppTabId,
} from "@/lib/content/dashboard-app";
import { dashboardPage } from "@/lib/content/dashboard-page";
import { formatNumber } from "@/lib/format";
import { ShowInPanelButton } from "./DashboardTabs";

// Each preview is built from the same demo data as the panel, so the numbers match.

function ChannelsPreview() {
  const total = overview.channels.items.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...overview.channels.items.map((item) => item.value));
  return (
    <ul className="space-y-3">
      {overview.channels.items.map((item) => (
        <li key={item.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 text-xs">
          <span className="text-fg-muted">{item.label}</span>
          <span className="h-1.5 rounded-full bg-line">
            <span className="block h-full rounded-r-full bg-accent" style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <span className="tabular-nums text-fg">%{formatNumber((item.value / total) * 100)}</span>
        </li>
      ))}
    </ul>
  );
}

function AdsPreview() {
  const [spend, roas, cpa] = ads.kpis;
  return (
    <div className="flex h-full items-end justify-between gap-6">
      <div>
        <p className="text-xs text-fg-muted">ROAS</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-fg">{roas!.display}</p>
        <p className="mt-3 text-xs text-fg-subtle">
          CPA <span className="text-fg">{cpa!.display}</span> · Harcama <span className="text-fg">{spend!.display}</span>
        </p>
      </div>
      <Sparkline values={ads.roas.values} className="h-16 w-40 max-w-[50%]" />
    </div>
  );
}

function StockPreview() {
  const rows = stock.rows.filter((row) => stockLevel(daysOfCover(row)) === "Kritik");
  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const days = daysOfCover(row);
        return (
          <li key={row.sku} className="text-xs">
            <span className="flex justify-between gap-3">
              <span className="truncate text-fg-muted">{row.product}</span>
              <span className="shrink-0 tabular-nums text-negative">{formatNumber(days, 1)} gün</span>
            </span>
            <span className="mt-1.5 block h-1 rounded-full bg-line">
              <span className="block h-full rounded-full bg-negative" style={{ width: `${(days / 14) * 100}%` }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function MarketplacePreview() {
  const picks = [marketplaces.kpis[2]!, marketplaces.kpis[3]!];
  return (
    <div className="grid h-full grid-cols-2 gap-4">
      {picks.map((kpi) => (
        <div key={kpi.label} className="flex flex-col justify-end">
          <p className="text-xs text-fg-muted">{kpi.label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-fg">{kpi.display}</p>
          {kpi.trend && <Sparkline values={kpi.trend} className="mt-3 h-8 w-full" />}
        </div>
      ))}
    </div>
  );
}

function ReportsPreview() {
  return (
    <ul className="space-y-2">
      {reports.slice(0, 3).map((report) => (
        <li key={report.id} className="flex items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2 text-xs">
          <span className="truncate text-fg">{report.title}</span>
          <span className="shrink-0 text-fg-subtle">{report.schedule.replace("Otomatik · ", "")}</span>
        </li>
      ))}
    </ul>
  );
}

const previews: Record<AppTabId, () => ReactNode> = {
  genel: ChannelsPreview,
  reklamlar: AdsPreview,
  stok: StockPreview,
  "pazar-yerleri": MarketplacePreview,
  raporlar: ReportsPreview,
};

export function FeatureBento() {
  const { eyebrow, title, body, cta, items } = dashboardPage.features;

  return (
    <Section id="ozellikler" aria-labelledby="features-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="features-title" body={body} />
        <RevealGroup as="ul" gap={0.08} className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-16 md:grid-cols-6">
          {items.map((item, index) => {
            const Preview = previews[item.tab];
            return (
              <RevealItem
                as="li"
                key={item.tab}
                className={cn(
                  "flex flex-col rounded-card bg-surface p-5 sm:p-6",
                  index < 2 ? "md:col-span-3" : "md:col-span-2",
                )}
              >
                <div aria-hidden="true" className="h-40 rounded-xl bg-canvas p-4">
                  <Preview />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-fg">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{item.body}</p>
                <div className="mt-auto pt-6">
                  <ShowInPanelButton tab={item.tab} label={cta} />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
