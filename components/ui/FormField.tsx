import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  /** Shown after the label for the few fields that may stay empty. */
  optionalLabel?: string;
  /** Helper text; read out through the control's aria-describedby. */
  hint?: ReactNode;
  error?: string;
  /** Right-aligned extra under the control, e.g. a character counter. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

export const hintId = (id: string) => `${id}-hint`;
export const errorId = (id: string) => `${id}-error`;

/** Ids a control should list in aria-describedby for its hint and current error. */
export function describedBy(id: string, hasHint: boolean, hasError: boolean): string | undefined {
  const ids = [hasHint && hintId(id), hasError && errorId(id)].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/** Shared look for inputs, selects and textareas. `muted` greys out a select still on its placeholder. */
export function controlClass(invalid: boolean, muted = false) {
  return cn(
    "block w-full rounded-xl border bg-canvas px-4 text-base transition-colors duration-200 placeholder:text-fg-subtle sm:text-sm",
    muted ? "text-fg-subtle" : "text-fg",
    "focus:outline-none focus-visible:outline-none focus:ring-2",
    invalid
      ? "border-negative/70 focus:border-negative focus:ring-negative/25"
      : "border-line hover:border-line-strong focus:border-accent focus:ring-accent/25",
  );
}

/** Label, control, hint and inline error for one form field. */
export function FormField({ id, label, optionalLabel, hint, error, aside, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm font-medium text-fg">
        {label}
        {optionalLabel && <span className="text-xs font-normal text-fg-subtle">({optionalLabel})</span>}
      </label>
      <div className="mt-2">{children}</div>
      {(hint || error || aside) && (
        <div className="mt-2 flex items-start justify-between gap-4 text-xs">
          <div className="space-y-1">
            {error && (
              <p id={errorId(id)} className="flex items-start gap-1.5 text-negative">
                <ErrorDot />
                {error}
              </p>
            )}
            {hint && (
              <p id={hintId(id)} className="text-fg-subtle">
                {hint}
              </p>
            )}
          </div>
          {aside}
        </div>
      )}
    </div>
  );
}

// Status is carried by the icon and the text, not by colour alone.
function ErrorDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-px shrink-0">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="7" cy="9.75" r="0.75" fill="currentColor" />
    </svg>
  );
}
