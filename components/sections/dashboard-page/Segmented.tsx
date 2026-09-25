"use client";

import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string; count?: number };

type SegmentedProps<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

/** Small toggle group for filtering a card's content. */
export function Segmented<T extends string>({ label, options, value, onChange }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg bg-canvas p-0.5">
      {options.map((option) => {
        const pressed = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
              pressed ? "bg-surface-overlay text-fg" : "text-fg-subtle hover:text-fg-muted",
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={cn("font-mono", pressed ? "text-accent" : "text-fg-subtle")}>{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
