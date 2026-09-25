import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
};

// Flat, solid fills: no border, shadow, glow or gradient.
const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-300",
  secondary: "bg-surface-raised text-fg hover:bg-surface-overlay",
} as const;

const sizes = {
  sm: "h-9 rounded-[0.625rem] px-4",
  md: "h-12 rounded-xl px-6",
} as const;

/** Shared button look, also used by real `<button>` elements such as form submits. */
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200",
    sizes[size],
    variants[variant],
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClass(variant, size), className)} {...props}>
      {children}
      {withArrow && <ArrowIcon />}
    </Link>
  );
}

export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
