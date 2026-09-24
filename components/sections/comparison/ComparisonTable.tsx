import { Reveal } from "@/components/motion/Reveal";
import { CheckIcon, MinusIcon } from "@/components/ui/icons";
import type { ComparisonRow } from "@/lib/content/home";

type ComparisonTableProps = {
  label: string;
  criterionLabel: string;
  traditionalLabel: string;
  badiLabel: string;
  rows: ComparisonRow[];
};

/**
 * md+: three-column grid; rows use subgrid so cells line up, and one panel
 * highlights the whole BADİ column. Below md: every row becomes a card.
 * ARIA table roles keep it readable as a table in both layouts.
 */
export function ComparisonTable({
  label,
  criterionLabel,
  traditionalLabel,
  badiLabel,
  rows,
}: ComparisonTableProps) {
  return (
    <div
      role="table"
      aria-label={label}
      className="relative space-y-4 md:grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:space-y-0"
    >
      {/* BADİ column highlight. Width matches the 1fr of a 2.8fr grid with no column gap. */}
      <Reveal className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc(100%/2.8)] rounded-card border border-accent/30 bg-accent/[0.05] shadow-glow md:block" />

      <div role="row" className="relative hidden md:col-span-3 md:grid md:grid-cols-subgrid">
        <div role="columnheader" className="px-6 pt-8 pb-5">
          <span className="sr-only">{criterionLabel}</span>
        </div>
        <div role="columnheader" className="px-6 pt-8 pb-5 text-sm font-medium text-fg-subtle">
          {traditionalLabel}
        </div>
        <div
          role="columnheader"
          className="px-6 pt-7 pb-5 text-lg font-semibold tracking-tight text-accent"
        >
          {badiLabel}
        </div>
      </div>

      {rows.map((row, index) => (
        <Reveal
          key={row.criterion}
          role="row"
          delay={index * 0.1}
          className="relative rounded-card border border-line bg-surface p-5 md:col-span-3 md:grid md:grid-cols-subgrid md:rounded-none md:border-0 md:bg-transparent md:p-0"
        >
          <div
            role="rowheader"
            className="text-base font-medium text-fg md:border-t md:border-line md:px-6 md:py-6"
          >
            {row.criterion}
          </div>

          <div
            role="cell"
            className="mt-4 md:mt-0 md:border-t md:border-line md:px-6 md:py-6"
          >
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle md:hidden">
              {traditionalLabel}
            </p>
            <p className="flex gap-3 text-sm leading-relaxed text-fg-subtle">
              <MinusIcon className="mt-0.5 shrink-0" />
              {row.traditional}
            </p>
          </div>

          <div
            role="cell"
            className="mt-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-4 md:mt-0 md:rounded-none md:border-0 md:border-t md:border-accent/15 md:bg-transparent md:px-6 md:py-6"
          >
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent md:hidden">
              {badiLabel}
            </p>
            <p className="flex gap-3 text-sm leading-relaxed text-fg">
              <CheckIcon className="mt-0.5 shrink-0 text-accent" />
              {row.badi}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
