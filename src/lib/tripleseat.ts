/**
 * Sends leads to TripleSeat Dynamic Lead Form 7051. Server only: import this
 * from API routes, never from client components.
 *
 * The request copies what TripleSeat's own embedded form sends: a multipart
 * POST with fields named form_data[...], answered with 201 + JSON on success.
 * Dates are YYYY-MM-DD (what the form's native date input submits) and times
 * look like "7:00pm" (what its time picker writes).
 *
 * TRIPLESEAT_PUBLIC_KEY turns sending on. Leave it out of .env.local so local
 * testing never creates real leads. TRIPLESEAT_VALIDATE_ONLY=true asks
 * TripleSeat to check the lead without saving it. That flag works on the
 * older v1 API; it isn't confirmed yet for this endpoint.
 */

const ENDPOINT = "https://api.tripleseat.com/ts/dynamic_leads.js";
const FORM_ID = "7051";
export const TRIPLESEAT_LOCATION_ID = "38115";

export interface TripleseatLeadFields {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  location_id: string;
  event_style: string;
  nature_of_event: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  guest_count: string;
  additional_information?: string;
  referral_source_id?: string;
  referral_source_other?: string;
  campaign_source?: string;
  campaign_medium?: string;
  campaign_name?: string;
  campaign_term?: string;
  campaign_content?: string;
  gclid?: string;
}

export type TripleseatResult =
  | { status: "sent"; leadId: string | null }
  | { status: "skipped"; reason: string }
  | { status: "failed"; error: string };

export async function submitTripleseatLead(
  fields: TripleseatLeadFields
): Promise<TripleseatResult> {
  const publicKey = process.env.TRIPLESEAT_PUBLIC_KEY;
  if (!publicKey) {
    return { status: "skipped", reason: "TRIPLESEAT_PUBLIC_KEY is not set" };
  }

  const body = new FormData();
  body.append("dynamic_lead_form_id", FORM_ID);
  body.append("public_key", publicKey);
  for (const [key, value] of Object.entries(fields)) {
    if (value) body.append(`form_data[${key}]`, value);
  }
  if (process.env.TRIPLESEAT_VALIDATE_ONLY === "true") {
    body.append("validate_only", "true");
  }

  const url = `${ENDPOINT}?dynamic_lead_form_id=${FORM_ID}&public_key=${encodeURIComponent(publicKey)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const json = await res.json().catch(() => null);

    if (res.ok && json?.success !== false) {
      const leadId = json?.lead_id ?? json?.id ?? null;
      return { status: "sent", leadId: leadId == null ? null : String(leadId) };
    }

    const detail = Array.isArray(json?.errors) ? json.errors.join("; ") : json?.message;
    return { status: "failed", error: `HTTP ${res.status}: ${detail || "unexpected response"}` };
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error.message : "Request to TripleSeat failed",
    };
  }
}
