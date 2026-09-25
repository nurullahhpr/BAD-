import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AppCardProps = {
  title: string;
  subtitle?: string;
  /** Controls shown on the right of the title row. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Card inside the dashboard mockup: title row, optional actions, content. */
export function AppCard({ title, subtitle, actions, className, children }: AppCardProps) {
  return (
    <div className={cn("rounded-xl bg-surface p-4 sm:p-5", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-fg">{title}</p>
          {subtitle && <p className="text-xs text-fg-subtle">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
