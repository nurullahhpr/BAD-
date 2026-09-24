import { siteConfig } from "@/lib/site";

// Decorative app frame around the showcase: window bar and sidebar.

export function WindowBar() {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-line px-4">
      <div aria-hidden="true" className="flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-2.5 rounded-full bg-line-strong" />
        ))}
      </div>
      <p className="text-xs text-fg-muted">{siteConfig.name} Dashboard</p>
      <span className="ml-auto rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
        Demo
      </span>
    </div>
  );
}

const sidebarItems = [
  { label: "Panel", icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
  { label: "Siparişler", icon: "M4 7h16l-1.5 12h-13zM9 7a3 3 0 0 1 6 0" },
  { label: "Ürünler & Stok", icon: "M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" },
  { label: "Raporlar", icon: "M5 20V10M12 20V4M19 20v-7" },
  { label: "Entegrasyonlar", icon: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" },
];

const connectedChannels = ["Trendyol", "Hepsiburada", "Amazon", "Web sitesi"];

export function Sidebar() {
  return (
    <aside aria-hidden="true" className="hidden flex-col gap-6 border-r border-line p-4 lg:flex">
      <ul className="space-y-1">
        {sidebarItems.map((item, index) => (
          <li
            key={item.label}
            className={
              index === 0
                ? "flex items-center gap-3 rounded-md bg-surface-overlay px-3 py-2 text-sm text-fg"
                : "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-fg-subtle"
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path
                d={item.icon}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item.label}
          </li>
        ))}
      </ul>

      <div className="mt-auto rounded-lg border border-line p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-subtle">
          Bağlı kanallar
        </p>
        <ul className="mt-3 space-y-2">
          {connectedChannels.map((channel) => (
            <li key={channel} className="flex items-center gap-2 text-xs text-fg-muted">
              <span className="size-1.5 rounded-full bg-positive" />
              {channel}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
