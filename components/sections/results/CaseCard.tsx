import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { TrendIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { caseHref, type CaseMetric, type CaseStudy } from "@/lib/content/cases";
import { formatNumber, formatSignedPercent } from "@/lib/format";
import { CompareBars } from "./CompareBars";

type CaseCardProps = {
  study: CaseStudy;
  /** Heading level inside the page outline. */
  headingLevel?: "h2" | "h3";
};

// The whole card links to the case detail page. The parent decides the list item and motion.
// sm–lg: story left, metrics right. lg+: stacked, metrics pinned to the bottom so they
// line up across cards in a row.
export function CaseCard({ study, headingLevel = "h3" }: CaseCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={caseHref(study.slug)}
      className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-x-10 sm:p-8 lg:flex"
    >
      <div className="lg:flex-1">
        <div className="flex items-center justify-between gap-4">
          <div
            aria-hidden="true"
            className="flex h-10 w-28 items-center justify-center rounded-lg border border-dashed border-line-strong font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle"
          >
            Logo
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-muted">
            {study.sector}
          </span>
        </div>
        <p className="mt-6 text-sm text-fg-subtle">
          {study.client} · {study.period}
        </p>
        <Heading className="mt-2 text-balance text-lg font-medium tracking-tight text-fg">
          {study.title}
        </Heading>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors group-hover:text-fg">
          Vakayı incele <span aria-hidden="true">→</span>
        </p>
      </div>

      <div className="mt-8 space-y-7 border-t border-line pt-6 sm:mt-0 sm:border-t-0 sm:pt-0 lg:mt-8 lg:border-t lg:pt-6">
        {study.metrics.map((metric) => (
          <MetricRow key={metric.label} metric={metric} />
        ))}
      </div>
    </Link>
  );
}

export function MetricRow({ metric }: { metric: CaseMetric }) {
  const { label, before, after, decimals = 0, prefix = "", suffix = "", better } = metric;
  const change = ((after - before) / before) * 100;
  const improved = better === "higher" ? change > 0 : change < 0;
  const format = (value: number) => `${prefix}${formatNumber(value, decimals)}${suffix}`;
  const changeText = formatSignedPercent(change);

  return (
    <div>
      <p className="text-sm text-fg-muted">{label}</p>
      <p className="sr-only">
        Önce {format(before)}, sonra {format(after)}. Değişim {changeText}.
      </p>
      <div aria-hidden="true" className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-baseline gap-2.5">
          <span className="text-base text-fg-subtle">{format(before)}</span>
          <span className="text-fg-subtle">→</span>
          <span className="text-3xl font-semibold tracking-tight text-fg">
            {prefix}
            <CountUp from={before} value={after} decimals={decimals} delay={0.3} />
            {suffix}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs",
            improved ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative",
          )}
        >
          <TrendIcon direction={change > 0 ? "up" : "down"} />
          {changeText}
        </span>
      </div>
      <CompareBars before={before} after={after} />
    </div>
  );
}
