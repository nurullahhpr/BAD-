import type { Metadata } from "next";
import { CasesIndex } from "@/components/sections/cases/CasesIndex";
import { casesPage } from "@/lib/content/cases";

export const metadata: Metadata = {
  title: `${casesPage.title} — ${casesPage.eyebrow}`,
  description: casesPage.body,
};

export default function SonuclarPage() {
  return <CasesIndex />;
}
