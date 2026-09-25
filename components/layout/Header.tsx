import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-canvas">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <NavDropdown label={item.label} href={item.href} items={item.children} />
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={siteConfig.cta.href} size="sm">
            {siteConfig.cta.label}
          </ButtonLink>
          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  );
}
