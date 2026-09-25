import {
  dailySeries,
  dashboardTabs,
  demoPeriod,
  lira,
  type BreakdownItem,
  type Kpi,
} from "@/lib/content/dashboard-demo";
import { formatLiraCompact, formatNumber } from "@/lib/format";

// Demo data for the /dashboard product page. It extends the homepage demo and stays
// internally consistent: campaign spend sums to platform spend, ROAS and CPA are
// computed, marketplace rates are order-weighted, stock buckets sum to the SKU count.

export type AppTabId = "genel" | "reklamlar" | "pazar-yerleri" | "stok" | "raporlar";

export type AppTab = {
  id: AppTabId;
  label: string;
  /** Short line under the panel title. */
  summary: string;
  /** Small count shown next to the tab, e.g. critical stock. */
  badge?: number;
};

const [homeOverview, homeMarketplaces] = dashboardTabs;
const AVERAGE_BASKET = 399;
const last = <T,>(values: T[], count: number) => values.slice(-count);

/** Deterministic rate series that averages `mean` and drifts by `drift` over the month. */
function rateSeries(mean: number, seed: number, drift: number): number[] {
  return Array.from({ length: 30 }, (_, i) => {
    const wave = 0.05 * Math.sin(((i + seed) / 7) * Math.PI * 2);
    const noise = 0.03 * Math.sin(i * 12.9898 + seed * 78.233);
    const trend = drift * (i / 29 - 0.5);
    return mean * (1 + wave + noise + trend);
  });
}

// ---------------------------------------------------------------- Overview

const revenueDaily = homeOverview!.series.values;
const ordersDaily = dailySeries(6_212, 2, 0.28);

export type RecentOrder = {
  id: string;
  channel: string;
  amount: number;
  status: "Hazırlanıyor" | "Kargoda" | "Teslim edildi" | "İade talebi";
  time: string;
};

export const overview = {
  kpis: homeOverview!.kpis.map((kpi, index): Kpi => {
    const trends = [
      revenueDaily,
      ordersDaily,
      revenueDaily.map((value, i) => value / (ordersDaily[i] ?? 1)),
      rateSeries(2.6, 3, 0.15),
    ];
    return { ...kpi, trend: last(trends[index] ?? revenueDaily, 14) };
  }),
  revenue: { title: "Günlük ciro", values: revenueDaily },
  channels: homeOverview!.breakdown,
  orders: [
    { id: "#BD-10482", channel: "Trendyol", amount: 1_249, status: "Kargoda", time: "2 dk önce" },
    { id: "#BD-10481", channel: "Web sitesi", amount: 389, status: "Hazırlanıyor", time: "6 dk önce" },
    { id: "#BD-10480", channel: "Hepsiburada", amount: 2_140, status: "Hazırlanıyor", time: "11 dk önce" },
    { id: "#BD-10479", channel: "Amazon", amount: 699, status: "Kargoda", time: "24 dk önce" },
    { id: "#BD-10478", channel: "Web sitesi", amount: 1_050, status: "Teslim edildi", time: "1 sa önce" },
    { id: "#BD-10477", channel: "Trendyol", amount: 459, status: "İade talebi", time: "2 sa önce" },
  ] satisfies RecentOrder[],
};

// ---------------------------------------------------------------- Ads

export type Campaign = {
  name: string;
  platform: "Meta Ads" | "Google Ads";
  spend: number;
  revenue: number;
  conversions: number;
  roas: number;
  cpa: number;
  status: "Aktif" | "Duraklatıldı";
};

function campaign(
  name: string,
  platform: Campaign["platform"],
  spend: number,
  roas: number,
  status: Campaign["status"] = "Aktif",
): Campaign {
  const revenue = spend * roas;
  const conversions = Math.round(revenue / AVERAGE_BASKET);
  return { name, platform, spend, revenue, conversions, roas, cpa: spend / conversions, status };
}

// Meta Ads spend = 236 bin ₺, Google Ads = 176 bin ₺, ad revenue ≈ 1,73 Mn ₺ (as on the home page).
const campaigns: Campaign[] = [
  campaign("Sonbahar Koleksiyonu — Satış", "Meta Ads", 98_000, 4.6),
  campaign("Yeniden Pazarlama — Sepet", "Meta Ads", 64_000, 6.1),
  campaign("Yeni Kitle — Genişletme", "Meta Ads", 52_000, 2.4),
  campaign("Katalog — Dinamik Ürün", "Meta Ads", 22_000, 3.8),
  campaign("Alışveriş — Tüm Ürünler", "Google Ads", 88_000, 4.3),
  campaign("Arama — Kategori", "Google Ads", 42_000, 2.1),
  campaign("Arama — Marka", "Google Ads", 26_000, 7.5),
  campaign("Performance Max — Test", "Google Ads", 20_000, 0.9, "Duraklatıldı"),
];

const adSpend = campaigns.reduce((sum, item) => sum + item.spend, 0);
const adRevenue = campaigns.reduce((sum, item) => sum + item.revenue, 0);
const adConversions = campaigns.reduce((sum, item) => sum + item.conversions, 0);
const spendDaily = dailySeries(adSpend, 7, 0.1);
const adRevenueDaily = dashboardTabs[2]!.series.values;
const roasDaily = adRevenueDaily.map((value, i) => value / (spendDaily[i] ?? 1));

function platformSpend(platform: Campaign["platform"]): BreakdownItem {
  return lira(platform, campaigns.filter((c) => c.platform === platform).reduce((s, c) => s + c.spend, 0));
}

export const ads = {
  kpis: [
    { label: "Reklam harcaması", display: formatLiraCompact(adSpend), delta: { value: 9.2, unit: "%" }, better: "neutral", trend: last(spendDaily, 14) },
    { label: "ROAS", display: `${formatNumber(adRevenue / adSpend, 1)}x`, delta: { value: 0.6, unit: "x" }, better: "higher", trend: last(roasDaily, 14) },
    { label: "CPA", display: `${formatNumber(adSpend / adConversions)} ₺`, delta: { value: -6.8, unit: "%" }, better: "lower", trend: last(spendDaily.map((s, i) => s / ((adRevenueDaily[i] ?? 1) / AVERAGE_BASKET)), 14) },
    { label: "Reklam kaynaklı ciro", display: formatLiraCompact(adRevenue), delta: { value: 27.1, unit: "%" }, better: "higher", trend: last(adRevenueDaily, 14) },
  ] satisfies Kpi[],
  roas: { title: "Günlük ROAS", values: roasDaily },
  platforms: { title: "Platform bazında harcama", items: [platformSpend("Meta Ads"), platformSpend("Google Ads")] },
  campaigns,
};

// ---------------------------------------------------------------- Marketplaces

export type MarketplaceRow = {
  channel: string;
  revenue: number;
  orders: number;
  returnRate: number;
  buybox: number;
};

// Orders sum to 4.105; order-weighted return ≈ %3,1 and buybox ≈ %82 (home KPIs).
const marketplaceRows: MarketplaceRow[] = [
  { channel: "Trendyol", revenue: 719_200, orders: 1_948, returnRate: 2.8, buybox: 84 },
  { channel: "Hepsiburada", revenue: 520_800, orders: 1_379, returnRate: 3.2, buybox: 81 },
  { channel: "Amazon", revenue: 297_600, orders: 778, returnRate: 3.6, buybox: 78 },
];

const marketplaceDaily = homeMarketplaces!.series.values;

export const marketplaces = {
  kpis: homeMarketplaces!.kpis.map((kpi, index): Kpi => {
    const trends = [
      marketplaceDaily,
      dailySeries(4_105, 4, 0.3),
      rateSeries(3.1, 6, -0.2),
      rateSeries(82, 8, 0.08),
    ];
    return { ...kpi, trend: last(trends[index] ?? marketplaceDaily, 14) };
  }),
  revenue: { title: "Günlük pazar yeri cirosu", values: marketplaceDaily },
  rows: marketplaceRows,
};

// ---------------------------------------------------------------- Stock

export type StockRow = {
  product: string;
  sku: string;
  onHand: number;
  dailySales: number;
};

export type StockLevel = "Kritik" | "Azalıyor" | "Yeterli";

export function daysOfCover(row: StockRow): number {
  return row.onHand / row.dailySales;
}

export function stockLevel(days: number): StockLevel {
  if (days < 7) return "Kritik";
  if (days < 14) return "Azalıyor";
  return "Yeterli";
}

const stockRows: StockRow[] = [
  { product: "Basic Tişört — Siyah / M", sku: "BT-001-SM", onHand: 42, dailySales: 9.1 },
  { product: "Slim Jean — Lacivert / 32", sku: "SJ-114-L32", onHand: 18, dailySales: 3.2 },
  { product: "Keten Gömlek — Beyaz / L", sku: "KG-207-BL", onHand: 25, dailySales: 4 },
  { product: "Oversize Sweatshirt — Gri / M", sku: "OS-310-GM", onHand: 64, dailySales: 5.8 },
  { product: "Kanvas Çanta — Bej", sku: "KC-045-BJ", onHand: 51, dailySales: 4.1 },
  { product: "Yün Atkı — Bordo", sku: "YA-088-BR", onHand: 96, dailySales: 1.9 },
  { product: "Deri Kemer — Kahve / 90", sku: "DK-512-K90", onHand: 130, dailySales: 2.2 },
];

// SKU buckets: 1.110 + 84 + 3 + 87 = 1.284; "in stock" = 1.197.
const stockBuckets = { enough: 1_110, low: 84, critical: 3, out: 87 };
const totalSku = stockBuckets.enough + stockBuckets.low + stockBuckets.critical + stockBuckets.out;
const inStock = totalSku - stockBuckets.out;

export const stock = {
  kpis: [
    { label: "Stok doluluk oranı", display: `%${formatNumber((inStock / totalSku) * 100, 1)}`, delta: { value: 1.4, unit: "puan" }, better: "higher", trend: last(rateSeries((inStock / totalSku) * 100, 2, 0.02), 14) },
    { label: "Kritik stok", display: `${stockBuckets.critical} ürün`, delta: { value: -4, unit: "adet" }, better: "lower", trend: last(rateSeries(5, 9, -0.6), 14) },
    { label: "Stokta yok", display: `${stockBuckets.out} ürün`, delta: { value: -12, unit: "adet" }, better: "lower", trend: last(rateSeries(95, 5, -0.15), 14) },
    { label: "Ortalama kalan gün", display: "38 gün", delta: { value: 3, unit: "gün" }, better: "higher", trend: last(rateSeries(38, 11, 0.1), 14) },
  ] satisfies Kpi[],
  buckets: stockBuckets,
  rows: stockRows,
};

export const stockAlertCount = stockBuckets.critical;

// ---------------------------------------------------------------- Reports

export type Report = {
  id: string;
  title: string;
  period: string;
  schedule: string;
  figures: { label: string; value: string }[];
  chart: { title: string; labels: string[]; values: number[]; format: "lira" | "number" };
};

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
// Full seven-day weeks only, so the bars compare like with like.
const weekRanges: [number, number, string][] = [
  [0, 7, "1–7"],
  [7, 14, "8–14"],
  [14, 21, "15–21"],
  [21, 28, "22–28"],
];
const lastWeek = [21, 28] as const;
const weekSpend = sum(spendDaily.slice(...lastWeek));
const weekAdRevenue = sum(adRevenueDaily.slice(...lastWeek));

export const reports: Report[] = [
  {
    id: "eylul-ozet",
    title: "Eylül performans özeti",
    period: demoPeriod.label,
    schedule: "Otomatik · Aylık",
    figures: [
      { label: "Ciro", value: formatLiraCompact(sum(revenueDaily)) },
      { label: "Sipariş", value: formatNumber(6_212) },
      { label: "ROAS", value: `${formatNumber(adRevenue / adSpend, 1)}x` },
    ],
    chart: {
      title: "Haftalık ciro (tam haftalar)",
      labels: weekRanges.map(([, , label]) => label),
      values: weekRanges.map(([from, to]) => sum(revenueDaily.slice(from, to))),
      format: "lira",
    },
  },
  {
    id: "haftalik-reklam",
    title: "Haftalık reklam raporu",
    period: "22–28 Eylül",
    schedule: "Otomatik · Haftalık",
    figures: [
      { label: "Harcama", value: formatLiraCompact(weekSpend) },
      { label: "ROAS", value: `${formatNumber(weekAdRevenue / weekSpend, 1)}x` },
      { label: "Reklam kaynaklı ciro", value: formatLiraCompact(weekAdRevenue) },
    ],
    chart: {
      title: "Günlük harcama (Eylül)",
      labels: ["22", "23", "24", "25", "26", "27", "28"],
      values: spendDaily.slice(...lastWeek),
      format: "lira",
    },
  },
  {
    id: "pazar-yeri",
    title: "Pazar yeri karşılaştırması",
    period: demoPeriod.label,
    schedule: "Manuel",
    figures: marketplaceRows.map((row) => ({ label: row.channel, value: formatLiraCompact(row.revenue) })),
    chart: {
      title: "Kanal bazında ciro",
      labels: marketplaceRows.map((row) => row.channel),
      values: marketplaceRows.map((row) => row.revenue),
      format: "lira",
    },
  },
  {
    id: "stok-durumu",
    title: "Stok durumu raporu",
    period: "30 Eylül",
    schedule: "Otomatik · Haftalık",
    figures: [
      { label: "Stokta", value: `${formatNumber(inStock)} ürün` },
      { label: "Kritik", value: `${stockBuckets.critical} ürün` },
      { label: "Stokta yok", value: `${stockBuckets.out} ürün` },
    ],
    chart: {
      title: "Ürün sayısı",
      labels: ["Yeterli", "Azalıyor", "Kritik", "Yok"],
      values: [stockBuckets.enough, stockBuckets.low, stockBuckets.critical, stockBuckets.out],
      format: "number",
    },
  },
];

// ---------------------------------------------------------------- Shell

export const appTabs: AppTab[] = [
  { id: "genel", label: "Genel Bakış", summary: "Tüm kanalların satış özeti" },
  { id: "reklamlar", label: "Reklamlar", summary: "Meta Ads ve Google Ads kampanyaları" },
  { id: "pazar-yerleri", label: "Pazar Yerleri", summary: "Trendyol, Hepsiburada ve Amazon" },
  { id: "stok", label: "Stok", summary: "Kalan gün ve kritik ürünler", badge: stockAlertCount },
  { id: "raporlar", label: "Raporlar", summary: "Düzenli ve şeffaf raporlama" },
];

export const connectedSources = ["Trendyol", "Hepsiburada", "Amazon", "Web sitesi", "Meta Ads", "Google Ads"];

export const appMeta = {
  workspace: "Örnek Marka",
  initials: "ÖM",
  period: demoPeriod.label,
  compareLabel: demoPeriod.compareLabel,
  days: demoPeriod.days,
};
