import { cn } from "@/lib/cn";

export type Status = "positive" | "warning" | "negative" | "neutral";

const styles: Record<Status, { pill: string; dot: string }> = {
  positive: { pill: "bg-positive/10 text-positive", dot: "bg-positive" },
  warning: { pill: "bg-warning/10 text-warning", dot: "bg-warning" },
  negative: { pill: "bg-negative/10 text-negative", dot: "bg-negative" },
  neutral: { pill: "bg-surface-overlay text-fg-muted", dot: "bg-fg-subtle" },
};

/** State label: always a word plus a dot, never colour alone. */
export function StatusPill({ status, label }: { status: Status; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        styles[status].pill,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", styles[status].dot)} />
      {label}
    </span>
  );
}
