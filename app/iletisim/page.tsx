import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_PATH } from "@/lib/contactHref";
import { contactPage } from "@/lib/content/contact";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Canonical is the bare path: "?kaynak=" variants are the same page.
export const metadata: Metadata = pageMetadata({
  title: `${contactPage.eyebrow} — ${contactPage.title}`,
  description: contactPage.body,
  path: CONTACT_PATH,
});

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        nodes={[breadcrumbSchema([{ label: "Ana sayfa", href: "/" }, { label: contactPage.eyebrow }], CONTACT_PATH)]}
      />
      <ContactPage />
    </>
  );
}
