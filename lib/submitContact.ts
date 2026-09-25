import type { ContactRequest } from "@/lib/contactForm";

const FAKE_LATENCY_MS = 600;

/**
 * Sends a contact request. Backend integration is pending: for now the request is
 * only logged, after a short delay so the loading state can be seen.
 */
export async function submitContactRequest(request: ContactRequest): Promise<void> {
  console.log("[BADİ] Teklif talebi", request);
  await new Promise((resolve) => window.setTimeout(resolve, FAKE_LATENCY_MS));
}
