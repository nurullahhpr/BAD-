import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { pillars } from "@/lib/content/home";
import { mainNav, siteConfig } from "@/lib/site";

const linkClass = "text-sm text-fg-muted transition-colors hover:text-fg";
const headingClass = "font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="max-w-sm space-y-5">
          <Logo />
          <p className="text-sm leading-relaxed text-fg-muted">{siteConfig.description}</p>
          <ul className="flex gap-2">
            {social.map((item) => (
              <li key={item.network}>
                <a
                  href={item.href}
                  aria-label={`${siteConfig.name} ${item.label}`}
                  className="flex size-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <SocialIcon network={item.network} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={headingClass}>
            Hızlı linkler
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Hizmetler</h2>
          <ul className="mt-5 space-y-3">
            {pillars.map((pillar) => (
              <li key={pillar.id}>
                <Link href="/#hizmetler" className={linkClass}>
                  {pillar.name}
                  <span className="text-fg-subtle"> · {pillar.scope}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>İletişim</h2>
          <address className="mt-5 space-y-3 not-italic">
            <p>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </p>
            <p>
              <a href={contact.phoneHref} className={linkClass}>
                {contact.phone}
              </a>
            </p>
            <p className="text-sm text-fg-muted">{contact.address}</p>
          </address>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-2 border-t border-line/60 py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
