import type { ReactNode } from "react";
import type { SocialNetwork } from "@/lib/site";

// Simplified line marks, drawn on a 24px grid to match the rest of the icon set.
const paths: Record<SocialNetwork, ReactNode> = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10.5V16M8 7.5v.01M12 16v-5.5M12 13c0-1.7 1-2.7 2.3-2.7S16.5 11.3 16.5 13v3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
  x: <path d="M4 4h4.5L20 20h-4.5zM20 4l-6.7 7.3M10.7 12.7L4 20" />,
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10.5 9.5v5l4-2.5z" />
    </>
  ),
};

export function SocialIcon({ network }: { network: SocialNetwork }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[network]}
    </svg>
  );
}
