"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/ButtonLink";
import { controlClass, describedBy, FormField } from "@/components/ui/FormField";
import { cn } from "@/lib/cn";
import {
  emptyValues,
  fieldOrder,
  toRequest,
  validateContact,
  type ContactRequest,
  type ContactValues,
  type FieldName,
} from "@/lib/contactForm";
import { budgetOptions, contactPage, parseTopic, PROBLEM_MAX, topicLabel } from "@/lib/content/contact";
import { easeOutExpo } from "@/lib/motion";
import { submitContactRequest } from "@/lib/submitContact";
import { useQueryParam } from "@/lib/useQueryParam";
import { FormSuccess } from "./FormSuccess";

type Status = "idle" | "submitting" | "success";

const copy = contactPage.form;
const swap = { duration: 0.3, ease: easeOutExpo };
const controlId = (field: FieldName) => `iletisim-${field}`;
const focusField = (field: FieldName) => document.getElementById(controlId(field))?.focus();

/** Quote request form. Validates on the client and hands the request to `submitContactRequest`. */
export function ContactForm() {
  const topic = parseTopic(useQueryParam("kaynak"));
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<ContactRequest | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // After "Yeni talep gönder", focus the first field once the form is back.
  const refocus = useRef(false);

  const errors = validateContact(values);
  const visible = (field: FieldName) => (attempted || touched[field] ? errors[field] : undefined);
  const invalidCount = fieldOrder.filter((field) => visible(field)).length;

  // Props every control shares: value binding, blur tracking and error wiring.
  const bind = (field: FieldName, options: { hint?: boolean; muted?: boolean; className?: string } = {}) => {
    const error = visible(field);
    return {
      id: controlId(field),
      name: field,
      value: values[field],
      onChange: (event: { target: { value: string } }) =>
        setValues((current) => ({ ...current, [field]: event.target.value })),
      // Only flag a field once something was typed, so tabbing through stays quiet.
      onBlur: () => {
        if (values[field].trim()) setTouched((current) => ({ ...current, [field]: true }));
      },
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy(controlId(field), Boolean(options.hint), Boolean(error)),
      className: cn(controlClass(Boolean(error), options.muted), options.className),
    };
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setAttempted(true);

    const firstInvalid = fieldOrder.find((field) => errors[field]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setStatus("submitting");
    const request = toRequest(values, topic);
    await submitContactRequest(request);
    setSent(request);
    setStatus("success");
  }

  function reset() {
    refocus.current = true;
    setValues(emptyValues);
    setTouched({});
    setAttempted(false);
    setSent(null);
    setStatus("idle");
  }

  const submitting = status === "submitting";

  return (
    <div
      ref={cardRef}
      className="scroll-mt-24 rounded-panel border border-line bg-surface p-5 shadow-window sm:p-8"
    >
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (!refocus.current) return;
          refocus.current = false;
          requestAnimationFrame(() => focusField(fieldOrder[0]));
        }}
      >
        {status === "success" && sent ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={swap}
          >
            <FormSuccess request={sent} scrollTarget={cardRef} onReset={reset} />
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            aria-labelledby="iletisim-form-title"
            aria-busy={submitting}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={swap}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="iletisim-form-title" className="text-lg font-medium tracking-tight text-fg">
                {copy.title}
              </h2>
              {topic && (
                <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {copy.topicPrefix}: {topicLabel(topic)}
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField id={controlId("name")} label={copy.labels.name} error={visible("name")}>
                <input
                  {...bind("name", { className: "h-12" })}
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={copy.placeholders.name}
                />
              </FormField>
              <FormField id={controlId("company")} label={copy.labels.company} error={visible("company")}>
                <input
                  {...bind("company", { className: "h-12" })}
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder={copy.placeholders.company}
                />
              </FormField>
              <FormField id={controlId("email")} label={copy.labels.email} error={visible("email")}>
                <input
                  {...bind("email", { className: "h-12" })}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  placeholder={copy.placeholders.email}
                />
              </FormField>
              <FormField
                id={controlId("phone")}
                label={copy.labels.phone}
                optionalLabel={copy.optional}
                error={visible("phone")}
              >
                <input
                  {...bind("phone", { className: "h-12" })}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={copy.placeholders.phone}
                />
              </FormField>

              <FormField
                id={controlId("budget")}
                label={copy.labels.budget}
                error={visible("budget")}
                className="sm:col-span-2"
              >
                <div className="relative">
                  <select
                    {...bind("budget", { muted: values.budget === "", className: "h-12 appearance-none pr-10" })}
                    required
                  >
                    <option value="" disabled>
                      {copy.placeholders.budget}
                    </option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option} className="text-fg">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </FormField>

              <FormField
                id={controlId("problem")}
                label={copy.labels.problem}
                hint={copy.problemHint}
                error={visible("problem")}
                className="sm:col-span-2"
                aside={
                  <span
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 font-mono tabular-nums",
                      values.problem.length >= PROBLEM_MAX * 0.9 ? "text-warning" : "text-fg-subtle",
                    )}
                  >
                    {values.problem.length} / {PROBLEM_MAX}
                  </span>
                }
              >
                <textarea
                  {...bind("problem", { hint: true, className: "min-h-28 resize-y py-3 leading-relaxed" })}
                  required
                  rows={4}
                  maxLength={PROBLEM_MAX}
                  placeholder={copy.placeholders.problem}
                />
              </FormField>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-fg-subtle sm:max-w-xs">{copy.privacyNote}</p>
              <button
                type="submit"
                disabled={submitting}
                className={cn(buttonClass(), "w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto")}
              >
                {submitting ? (
                  <>
                    <Spinner />
                    {copy.submitting}
                  </>
                ) : (
                  copy.submit
                )}
              </button>
            </div>
            <div aria-live="polite">
              {attempted && invalidCount > 0 && (
                <p className="mt-4 text-sm text-negative">{copy.errors.summary}</p>
              )}
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-subtle"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-spin motion-reduce:animate-none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
