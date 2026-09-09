/**
 * Submission adapters.
 *
 * No backend or API credentials were supplied with this project, so every
 * submit path funnels through the two functions below. Point them at the real
 * endpoint (a route handler, a CRM, a form service) and the UI needs no change.
 *
 * These deliberately do NOT fake a success response — build spec §14.
 */

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const NOT_CONNECTED =
  "This form is not connected yet. Please call 305-845-0757 or email sales@hunterhexcapital.com and we will respond right away.";

export async function submitContactRequest(
  _payload: ContactPayload,
): Promise<SubmitResult> {
  // TODO(backend): POST to the real endpoint and return { ok: true } on 2xx.
  return { ok: false, error: NOT_CONNECTED };
}

export async function submitEmailCapture(
  _email: string,
  _source: "newsletter" | "investment-guide",
): Promise<SubmitResult> {
  // TODO(backend): wire to the mailing-list provider.
  return { ok: false, error: NOT_CONNECTED };
}
