import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

export type StackedSegment = {
  label: string;
  value: number;
  /** Background class for the segment and its legend swatch. */
  color: string;
};

type StackedBarProps = {
  segments: StackedSegment[];
  unit: string;
};

/**
 * One 100% bar split into parts, 2px surface gaps between segments.
 * The legend below repeats every label and value, so colour is never the only key.
 */
export function StackedBar({ segments, unit }: StackedBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div>
      <div aria-hidden="true" className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {segments.map((segment) => (
          <span
            key={segment.label}
            className={cn("h-full min-w-1", segment.color)}
            style={{ flexGrow: segment.value, flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
        {segments.map((segment) => (
          <li key={segment.label} className="text-xs">
            <span className="flex items-center gap-2 text-fg-muted">
              <span aria-hidden="true" className={cn("size-2 rounded-sm", segment.color)} />
              {segment.label}
            </span>
            <span className="mt-1 block pl-4 font-medium tabular-nums text-fg">
              {formatNumber(segment.value)} {unit}
              <span className="text-fg-subtle"> · %{formatNumber((segment.value / total) * 100, 1)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
