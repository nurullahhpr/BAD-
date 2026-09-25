import { formatLiraCompact, formatNumber } from "@/lib/format";

// Demo data for the homepage dashboard showcase. Internally consistent on purpose:
// channel shares sum to revenue, ROAS = ad revenue / ad spend, daily series sum to totals.

export type Direction = "higher" | "lower" | "neutral";

export type Kpi = {
  label: string;
  display: string;
  delta: { value: number; unit: "%" | "puan" | "x" | "adet" | "gün" };
  /** Which direction counts as good; neutral deltas stay grey. */
  better: Direction;
  /** Optional recent values for a sparkline, oldest first. */
  trend?: number[];
};

export type BreakdownItem = {
  label: string;
  value: number;
  display: string;
};

export type DashboardTab = {
  id: string;
  label: string;
  kpis: Kpi[];
  series: { title: string; values: number[] };
  breakdown: { title: string; items: BreakdownItem[] };
};

export const demoPeriod = {
  label: "1–30 Eylül",
  compareLabel: "Değişimler önceki 30 güne göre",
  days: Array.from({ length: 30 }, (_, i) => `${i + 1} Eyl`),
};

/** Deterministic 30-day series (same on server and client) that sums to `total`. */
export function dailySeries(total: number, seed: number, growth: number): number[] {
  const raw = Array.from({ length: 30 }, (_, i) => {
    const weekly = 1 + 0.12 * Math.sin(((i + seed) / 7) * Math.PI * 2);
    const noise = 1 + 0.07 * Math.sin(i * 12.9898 + seed * 78.233);
    const trend = 1 + growth * (i / 29);
    return trend * weekly * noise;
  });
  const sum = raw.reduce((acc, value) => acc + value, 0);
  return raw.map((value) => (value / sum) * total);
}

export function lira(label: string, value: number): BreakdownItem {
  return { label, value, display: formatLiraCompact(value) };
}

export const dashboardTabs: DashboardTab[] = [
  {
    id: "genel",
    label: "Genel Bakış",
    kpis: [
      { label: "Ciro", display: formatLiraCompact(2_480_000), delta: { value: 18.4, unit: "%" }, better: "higher" },
      { label: "Sipariş", display: formatNumber(6_212), delta: { value: 12.1, unit: "%" }, better: "higher" },
      { label: "Ortalama sepet", display: "399 ₺", delta: { value: 5.6, unit: "%" }, better: "higher" },
      { label: "Dönüşüm oranı", display: "%2,6", delta: { value: 0.4, unit: "puan" }, better: "higher" },
    ],
    series: { title: "Günlük ciro", values: dailySeries(2_480_000, 1, 0.35) },
    breakdown: {
      title: "Kanal dağılımı",
      items: [
        lira("Web sitesi", 942_400),
        lira("Trendyol", 719_200),
        lira("Hepsiburada", 520_800),
        lira("Amazon", 297_600),
      ],
    },
  },
  {
    id: "pazar-yerleri",
    label: "Pazar Yerleri",
    kpis: [
      { label: "Pazar yeri cirosu", display: formatLiraCompact(1_537_600), delta: { value: 22.8, unit: "%" }, better: "higher" },
      { label: "Sipariş", display: formatNumber(4_105), delta: { value: 15.3, unit: "%" }, better: "higher" },
      { label: "İade oranı", display: "%3,1", delta: { value: -0.8, unit: "puan" }, better: "lower" },
      { label: "Buybox oranı", display: "%82", delta: { value: 6, unit: "puan" }, better: "higher" },
    ],
    series: { title: "Günlük pazar yeri cirosu", values: dailySeries(1_537_600, 3, 0.45) },
    breakdown: {
      title: "Pazar yeri bazında ciro",
      items: [lira("Trendyol", 719_200), lira("Hepsiburada", 520_800), lira("Amazon", 297_600)],
    },
  },
  {
    id: "reklam",
    label: "Reklam",
    kpis: [
      { label: "Reklam harcaması", display: formatLiraCompact(412_000), delta: { value: 9.2, unit: "%" }, better: "neutral" },
      { label: "ROAS", display: "4,2x", delta: { value: 0.6, unit: "x" }, better: "higher" },
      { label: "Tıklama başı maliyet", display: "3,84 ₺", delta: { value: -7.5, unit: "%" }, better: "lower" },
      { label: "Reklam kaynaklı ciro", display: formatLiraCompact(1_730_400), delta: { value: 27.1, unit: "%" }, better: "higher" },
    ],
    series: { title: "Günlük reklam kaynaklı ciro", values: dailySeries(1_730_400, 5, 0.4) },
    breakdown: {
      title: "Platform bazında harcama",
      items: [
        lira("Meta Ads", 236_000),
        lira("Google Ads", 176_000),
      ],
    },
  },
];
