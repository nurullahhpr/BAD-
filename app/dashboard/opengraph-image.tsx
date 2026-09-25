import { dashboardPage } from "@/lib/content/dashboard-page";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "BADİ Dashboard";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: dashboardPage.hero.eyebrow, title: dashboardPage.hero.title });
}
