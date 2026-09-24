import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  withArrow?: boolean;
};

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-300",
  secondary: "border border-line-strong text-fg hover:border-fg-subtle hover:bg-surface-raised",
} as const;

export function ButtonLink({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowIcon />}
    </Link>
  );
}

function ArrowIcon() {
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
