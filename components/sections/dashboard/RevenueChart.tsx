import { LineChart } from "@/components/charts/LineChart";

type RevenueChartProps = {
  title: string;
  values: number[];
  days: string[];
};

// Fewer date labels on narrow plots so they never touch.
const X_TICKS = { wide: [0, 7, 14, 21, 29], narrow: [0, 14, 29] };

/** Daily revenue line for the dashboard showcase. */
export function RevenueChart({ title, values, days }: RevenueChartProps) {
  return <LineChart title={title} values={values} labels={days} format="lira" xTicks={X_TICKS} />;
}
