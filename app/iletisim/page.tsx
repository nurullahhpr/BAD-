import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact/ContactPage";
import { contactPage } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: `${contactPage.eyebrow} — ${contactPage.title}`,
  description: contactPage.body,
};

export default function ContactRoute() {
  return <ContactPage />;
}
