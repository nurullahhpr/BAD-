import { contactPage } from "@/lib/content/contact";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ — Teklif Al";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: contactPage.eyebrow, title: contactPage.title });
}
