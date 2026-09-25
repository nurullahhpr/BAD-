import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { Glyph } from "@/components/ui/icons";
import { contactPage } from "@/lib/content/contact";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/**
 * /iletisim page body. Desktop: intro and next steps on the left, form on the right.
 * Mobile: intro, form, then the details, so the form comes right after the promise.
 */
export function ContactPage() {
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden">
      <GridBackdrop from="top" />
      <Container className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pt-20">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 [grid-template-areas:'intro'_'form'_'details'] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:[grid-template-areas:'intro_form'_'details_form']">
          <div className="[grid-area:intro]">
            <Reveal>
              <nav aria-label="Sayfa konumu">
                <ol className="flex items-center gap-2 text-xs text-fg-subtle">
                  <li>
                    <Link href="/" className="transition-colors hover:text-fg">
                      Ana sayfa
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-fg-muted">
                    {contactPage.eyebrow}
                  </li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <Eyebrow>{contactPage.eyebrow}</Eyebrow>
              <h1
                id="page-title"
                className="mt-5 text-balance text-display-sm font-medium text-fg sm:text-display-md lg:text-display-sm xl:text-display-md"
              >
                {contactPage.title}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">{contactPage.body}</p>
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              <ul className="space-y-5">
                {contactPage.trust.map((note) => (
                  <li key={note.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Glyph name={note.icon} />
                    </span>
                    <span>
                      <span className="block font-medium text-fg">{note.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{note.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            className="[grid-area:form] lg:self-start lg:pt-2 lg:[@media(min-height:56rem)]:sticky lg:[@media(min-height:56rem)]:top-20"
          >
            <ContactForm />
          </Reveal>

          <div className="space-y-12 [grid-area:details] lg:border-t lg:border-line lg:pt-10">
            <Reveal>
              <h2 className="text-lg font-medium tracking-tight text-fg">{contactPage.stepsTitle}</h2>
              <ol className="mt-6 space-y-5">
                {contactPage.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs tabular-nums text-fg-muted">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-fg">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="text-lg font-medium tracking-tight text-fg">{contactPage.contactTitle}</h2>
              <address className="mt-6 space-y-3 text-sm not-italic">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                >
                  <Glyph name="mail" className="text-fg-subtle" />
                  {contact.email}
                </a>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                >
                  <Glyph name="phone" className="text-fg-subtle" />
                  {contact.phone}
                </a>
                <p className="flex items-center gap-3 text-fg-muted">
                  <Glyph name="pin" className="text-fg-subtle" />
                  {contact.address}
                </p>
              </address>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
