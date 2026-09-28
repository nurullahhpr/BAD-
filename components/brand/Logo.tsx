import Image from "next/image";
import Link from "next/link";
import logoLight from "@/public/brand/badi-logo-light.png";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Header logo loads eagerly; the footer one can wait. */
  priority?: boolean;
};

// Official lockup (tile + "badi"), white lettering for the dark theme.
// Source file: public/brand/badi-logo-light.png. Tile-only icons live in app/ (icon, apple-icon, favicon).
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} ana sayfa`}
      className={cn("inline-flex min-h-8 items-center", className)}
    >
      <Image src={logoLight} alt="" priority={priority} className="h-8 w-auto" sizes="96px" />
    </Link>
  );
}
