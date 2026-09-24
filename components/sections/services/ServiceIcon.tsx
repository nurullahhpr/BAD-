import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PillarId } from "@/lib/content/home";
import { pillarTheme } from "@/lib/pillarTheme";

// One icon set per pillar: the frame shape tells the pillar apart
// (square = Administration, circle = Development, hexagon = Infrastructure),
// the inner mark names the service and takes the pillar's tone.

const frames: Record<PillarId, ReactNode> = {
  administration: <rect x="3" y="3" width="18" height="18" rx="4" />,
  development: <circle cx="12" cy="12" r="9" />,
  infrastructure: <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />,
};

const marks: Record<string, ReactNode> = {
  "pazar-yeri-yonetimi": <path d="M8 10.5h8l-.8 5h-6.4zM9.8 10.5a2.2 2.2 0 0 1 4.4 0" />,
  "crm-musteri-operasyonu": (
    <>
      <circle cx="12" cy="10" r="2" />
      <path d="M8.5 16c.6-1.7 2-2.7 3.5-2.7s2.9 1 3.5 2.7" />
    </>
  ),
  "ticari-strateji-raporlama": <path d="M9 16v-3M12 16V8.5M15 16v-5" />,
  "performans-pazarlamasi": (
    <>
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  "arama-motoru-icerik": <path d="M11.5 8.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM13.7 13.7L16 16" />,
  "pazar-genisletme": <path d="M8.5 15.5l7-7M11 8.5h4.5V13" />,
  "e-ticaret-sistemleri": <path d="M8 8.5h8v7H8zM8 10.5h8" />,
  entegrasyonlar: <path d="M10 8v2.5M14 8v2.5M8.5 10.5h7v1.2a3.5 3.5 0 0 1-7 0zM12 15.2V17" />,
  "badi-dashboard": <path d="M8.5 8.5h3v3h-3zM12.5 8.5h3v3h-3zM8.5 12.5h3v3h-3zM12.5 12.5h3v3h-3z" />,
};

type ServiceIconProps = {
  pillar: PillarId;
  /** Service slug; omit for a frame-only pillar mark. */
  service?: string;
  className?: string;
};

export function ServiceIcon({ pillar, service, className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-10 shrink-0", className)}
    >
      <g className="stroke-line-strong">{frames[pillar]}</g>
      {service && <g className={pillarTheme[pillar].stroke}>{marks[service]}</g>}
    </svg>
  );
}
