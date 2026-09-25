import { CountUp } from "@/components/motion/CountUp";
import { hero, type Stat } from "@/lib/content/home";
import { formatNumber } from "@/lib/format";

export function HeroStats() {
  return (
    <div className="rounded-card bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-5 py-4 sm:px-6">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        <p className="text-xs uppercase tracking-wider font-medium text-fg-muted">
          {hero.statsTitle}
        </p>
      </div>

      <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
        {hero.stats.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} delay={0.5 + index * 0.15} />
        ))}
      </dl>
    </div>
  );
}

type StatItemProps = {
  stat: Stat;
  delay: number;
};

function StatItem({ stat, delay }: StatItemProps) {
  const { value, decimals = 0, prefix = "", unit } = stat;
  const finalText = `${prefix}${formatNumber(value, decimals)}`;

  return (
    // Visual order: value above label. DOM order keeps label first for screen readers.
    <div className="flex flex-col-reverse justify-end gap-2 px-5 py-5 sm:px-6 sm:py-6">
      <dt className="text-sm text-fg-muted">{stat.label}</dt>
      <dd className="flex items-baseline gap-1.5 font-semibold tracking-tight text-fg">
        <span className="sr-only">{unit ? `${finalText} ${unit}` : finalText}</span>
        <span aria-hidden="true" className="text-4xl lg:text-5xl">
          {prefix}
          <CountUp value={value} decimals={decimals} delay={delay} />
        </span>
        {unit && (
          <span aria-hidden="true" className="text-base font-medium text-fg-muted">
            {unit}
          </span>
        )}
      </dd>
    </div>
  );
}
