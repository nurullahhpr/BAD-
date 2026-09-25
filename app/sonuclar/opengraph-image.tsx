import { casesPage } from "@/lib/content/cases";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ — Sonuçlar";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: casesPage.eyebrow, title: casesPage.body });
}
