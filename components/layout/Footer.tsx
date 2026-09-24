import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="max-w-sm space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-fg-muted">
            {siteConfig.tagline}. Türkiye pazarına adapte edilmiş global model.
          </p>
        </div>

        <nav aria-label="Alt menü">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container>
        <p className="border-t border-line/60 py-6 text-xs text-fg-subtle">
          © {year} {siteConfig.name}. Tüm hakları saklıdır.
        </p>
      </Container>
    </footer>
  );
}
