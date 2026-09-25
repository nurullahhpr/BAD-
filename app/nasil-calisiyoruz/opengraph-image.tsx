import { processPage } from "@/lib/content/process";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ — Nasıl çalışıyoruz";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: processPage.eyebrow, title: processPage.title });
}
