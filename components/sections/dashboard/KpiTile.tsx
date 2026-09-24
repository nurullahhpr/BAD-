import { TrendIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Kpi } from "@/lib/content/dashboard-demo";
import { formatNumber, formatSignedPercent } from "@/lib/format";

function formatDelta({ value, unit }: Kpi["delta"]): string {
  const decimals = Number.isInteger(value) ? 0 : 1;
  if (unit === "%") return formatSignedPercent(value, decimals);
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  const amount = formatNumber(Math.abs(value), decimals);
  return unit === "x" ? `${sign}${amount}x` : `${sign}${amount} puan`;
}

// Stat tile: label · value · signed delta. Delta colour = direction × whether up is good.
export function KpiTile({ kpi }: { kpi: Kpi }) {
  const { value } = kpi.delta;
  const good = kpi.better === "neutral" ? null : (kpi.better === "higher") === value > 0;

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-fg-muted">{kpi.label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{kpi.display}</p>
      <p
        className={cn(
          "mt-2 inline-flex items-center gap-1 font-mono text-xs",
          good === null ? "text-fg-subtle" : good ? "text-positive" : "text-negative",
        )}
      >
        <TrendIcon direction={value > 0 ? "up" : "down"} />
        {formatDelta(kpi.delta)}
      </p>
    </div>
  );
}
