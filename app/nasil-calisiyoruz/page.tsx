import type { Metadata } from "next";
import { ProcessPage } from "@/components/sections/process/ProcessPage";
import { processPage } from "@/lib/content/process";

export const metadata: Metadata = {
  title: `${processPage.title} — ${processPage.eyebrow}`,
  description: processPage.body,
};

export default function NasilCalisiyoruzPage() {
  return <ProcessPage />;
}
