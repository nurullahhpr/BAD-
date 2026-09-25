import type { PillarId } from "@/lib/content/home";

/** Where a visitor came from, passed to the contact form as `?kaynak=`. */
export type ContactTopic = "rontgen" | "dashboard" | PillarId;

export const CONTACT_PATH = "/iletisim";

// Kept free of runtime imports so content files can use it without an import cycle.
/** Link to the contact page, optionally telling the form where the visitor came from. */
export function contactHref(topic?: ContactTopic): string {
  return topic ? `${CONTACT_PATH}?kaynak=${topic}` : CONTACT_PATH;
}
