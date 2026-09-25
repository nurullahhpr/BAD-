"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { buttonClass } from "@/components/ui/ButtonLink";
import type { ContactRequest } from "@/lib/contactForm";
import { contactPage, topicLabel } from "@/lib/content/contact";
import { easeOutExpo } from "@/lib/motion";

type FormSuccessProps = {
  request: ContactRequest;
  /** Card to bring back into view if the swap left it above the viewport. */
  scrollTarget: RefObject<HTMLElement | null>;
  onReset: () => void;
};

const HEADER_OFFSET = 80;

/** Confirmation shown in place of the form: animated check, message and a summary of what was sent. */
export function FormSuccess({ request, scrollTarget, onReset }: FormSuccessProps) {
  const { success, form } = contactPage;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  // Screen readers hear the confirmation; sighted users on a phone are scrolled up to it.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    const card = scrollTarget.current;
    if (card && card.getBoundingClientRect().top < HEADER_OFFSET) {
      card.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [scrollTarget, reduceMotion]);

  const rows = [
    [form.labels.name, request.name],
    [form.labels.company, request.company],
    [form.labels.email, request.email],
    [form.labels.phone, request.phone],
    [form.labels.budget, request.budget],
    [form.labels.problem, request.problem],
    [form.topicPrefix, request.topic ? topicLabel(request.topic) : ""],
  ].filter(([, value]) => value);

  const timing = (delay: number, duration: number) => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: easeOutExpo,
  });

  return (
    <div className="py-4 sm:py-8">
      <div className="text-center">
        <div className="relative mx-auto size-16">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent/25"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={timing(0.4, 0.9)}
          />
          <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="relative size-16">
            <circle cx="32" cy="32" r="30" className="fill-accent/10" />
            <g transform="rotate(-90 32 32)">
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                strokeWidth="2"
                className="stroke-accent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={timing(0, 0.6)}
              />
            </g>
            <motion.path
              d="M21 33l7.5 7.5L44 25"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-accent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={timing(0.35, 0.45)}
            />
          </svg>
        </div>

        <h2
          id="iletisim-success-title"
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 text-2xl font-medium tracking-tight text-fg outline-none"
        >
          {success.title}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-fg-muted">{success.body}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={timing(0.5, 0.5)}
        className="mt-8 rounded-card border border-line bg-canvas p-5"
      >
        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">{success.summaryTitle}</h3>
        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-fg-subtle">{label}</dt>
              <dd className="-mt-2 break-words text-fg sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <button type="button" onClick={onReset} className={buttonClass("secondary")}>
          {success.again}
        </button>
      </div>
    </div>
  );
}
