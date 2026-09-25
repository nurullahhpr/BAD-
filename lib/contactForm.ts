import type { ContactTopic } from "@/lib/contactHref";
import { budgetOptions, contactPage, PROBLEM_MAX } from "@/lib/content/contact";

/** Field order on the page; the first invalid one gets focus. */
export const fieldOrder = ["name", "company", "email", "phone", "budget", "problem"] as const;

export type FieldName = (typeof fieldOrder)[number];
export type ContactValues = Record<FieldName, string>;
export type ContactErrors = Partial<Record<FieldName, string>>;

export type ContactRequest = ContactValues & {
  topic: ContactTopic | null;
  submittedAt: string;
};

export const emptyValues: ContactValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  problem: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Turkish numbers: 10 digits (5xx…), 11 with the leading 0, or 12 with the 90 country code. */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11 || (digits.length === 12 && digits.startsWith("90"));
}

export function validateContact(values: ContactValues): ContactErrors {
  const messages = contactPage.form.errors;
  const errors: ContactErrors = {};
  const email = values.email.trim();
  const problem = values.problem.trim();

  if (!values.name.trim()) errors.name = messages.name;
  if (!values.company.trim()) errors.company = messages.company;
  if (!email) errors.email = messages.emailMissing;
  else if (!EMAIL.test(email)) errors.email = messages.emailInvalid;
  if (values.phone.trim() && !isValidPhone(values.phone)) errors.phone = messages.phone;
  if (!(budgetOptions as readonly string[]).includes(values.budget)) errors.budget = messages.budget;
  if (!problem || problem.length > PROBLEM_MAX) errors.problem = messages.problem;

  return errors;
}

/** Trimmed copy of the form, ready to send. */
export function toRequest(values: ContactValues, topic: ContactTopic | null): ContactRequest {
  const trimmed = Object.fromEntries(
    fieldOrder.map((field) => [field, values[field].trim()]),
  ) as ContactValues;
  return { ...trimmed, topic, submittedAt: new Date().toISOString() };
}
