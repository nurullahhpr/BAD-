import { KpiTile } from "@/components/sections/dashboard/KpiTile";
import type { Kpi } from "@/lib/content/dashboard-demo";

export function KpiGrid({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiTile key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}

export const DAY_TICKS = { wide: [0, 7, 14, 21, 29], narrow: [0, 14, 29] };
