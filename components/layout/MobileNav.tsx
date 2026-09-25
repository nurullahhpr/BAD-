"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import type { NavItem } from "@/lib/site";

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:text-fg"
      >
        <MenuIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <m.nav
            id={panelId}
            aria-label="Mobil menü"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
            className="absolute inset-x-0 top-16 border-b border-line bg-canvas"
          >
            <ul className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-content flex-col overflow-y-auto px-4 py-4 sm:px-6">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-1 space-y-1 border-l border-line pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                          >
                            <span aria-hidden="true" className={cn("size-1.5 rounded-full", child.dot)} />
                            {child.label}
                            <span className="text-xs text-fg-subtle">{child.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <m.path
        d="M3 6L17 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: "M5 5L15 15" } : { d: "M3 6L17 6" }}
        transition={{ duration: 0.2, ease: easeOutExpo }}
      />
      <m.path
        d="M3 14L17 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: "M5 15L15 5" } : { d: "M3 14L17 14" }}
        transition={{ duration: 0.2, ease: easeOutExpo }}
      />
    </svg>
  );
}
