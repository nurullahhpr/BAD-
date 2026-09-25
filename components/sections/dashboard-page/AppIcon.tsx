import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Line icons for the dashboard product page, drawn on a 24px grid.
const paths = {
  overview: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />,
  ads: <path d="M4 10v4h3l6 4V6L7 10zM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11" />,
  marketplaces: <path d="M4 9l1.5-4h13L20 9M4 9h16M4 9v10h16V9M9 19v-5h6v5M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" />,
  stock: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  reports: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 15.5h5M10 9h2" />,
  search: <path d="M10.5 4.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM15 15l5 5" />,
  window: <path d="M4 5h16v14H4zM4 9h16M7 7h.01M9.5 7h.01" />,
  database: <path d="M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />,
  users: <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c.8-3.2 3.2-5 6-5s5.2 1.8 6 5M16 4.3a3.5 3.5 0 0 1 0 6.4M17.5 15c2 .6 3.1 2.3 3.5 5" />,
  card: <path d="M3 6h18v12H3zM3 10h18M7 14.5h4" />,
  truck: <path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7M7 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM17 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />,
  chevron: <path d="M8 10l4 4 4-4" />,
  sort: <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />,
  share: <path d="M8 12l8-5M8 12l8 5M6 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  download: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14" />,
} satisfies Record<string, ReactNode>;

export type AppIconName = keyof typeof paths;

export function AppIcon({ name, className }: { name: AppIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      {paths[name]}
    </svg>
  );
}
