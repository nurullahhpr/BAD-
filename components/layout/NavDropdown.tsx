"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import type { NavChild } from "@/lib/site";

type NavDropdownProps = {
  label: string;
  /** Overview link shown under the children. */
  href: string;
  items: NavChild[];
};

const CLOSE_DELAY = 120;

// Disclosure menu: opens on hover and on click (keyboard/touch toggle it), closes on
// Escape, outside click, focus leaving the menu, or choosing a link.
export function NavDropdown({ label, href, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // True while a mouse is over the menu, so a click there does not close what hover opened.
  const hovering = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function show() {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hideSoon() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        hovering.current = true;
        show();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        hovering.current = false;
        hideSoon();
      }}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => (hovering.current ? true : !value))}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors duration-200 hover:text-fg",
          open ? "text-fg" : "text-fg-muted",
        )}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: easeOutExpo }}
            className="absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 pt-4"
          >
            <div className="rounded-card border border-line-strong bg-surface p-2 shadow-window">
              <ul>
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-raised focus-visible:bg-surface-raised"
                    >
                      <span aria-hidden="true" className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.dot)} />
                      <span>
                        <span className="block text-sm font-medium text-fg">{item.label}</span>
                        <span className="block text-xs text-fg-muted">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between border-t border-line px-3 pt-3 pb-2 text-xs text-fg-muted transition-colors hover:text-fg"
              >
                BADİ Mimarisi&apos;ne genel bakış
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
