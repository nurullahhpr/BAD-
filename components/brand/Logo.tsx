import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

// Text wordmark until the final logo asset is ready.
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} ana sayfa`}
      className={cn("inline-flex min-h-8 items-center text-lg font-semibold tracking-tight text-fg", className)}
    >
      {siteConfig.name}
    </Link>
  );
}
