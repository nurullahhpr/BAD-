import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export type Status = "positive" | "warning" | "negative" | "neutral";

const styles: Record<Status, { tone: BadgeTone; dot: string }> = {
  positive: { tone: "positive", dot: "bg-positive" },
  warning: { tone: "warning", dot: "bg-warning" },
  negative: { tone: "negative", dot: "bg-negative" },
  neutral: { tone: "neutral", dot: "bg-fg-subtle" },
};

/** State label: always a word plus a dot, never colour alone. */
export function StatusPill({ status, label }: { status: Status; label: string }) {
  return (
    <Badge tone={styles[status].tone}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", styles[status].dot)} />
      {label}
    </Badge>
  );
}
