import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  EVENT_STYLE,
  MAX_GUESTS,
  NOTES_MAX_LENGTH,
  OCCASIONS,
  OTHER_REFERRAL_ID,
  REFERRAL_SOURCES,
  TIME_SLOTS,
  todayInTampa,
} from "@/lib/private-dining";
import {
  privateDiningConfirmationEmail,
  privateDiningNotificationEmail,
  type PrivateDiningInquiry,
} from "@/lib/private-dining-emails";
import { submitTripleseatLead, TRIPLESEAT_LOCATION_ID } from "@/lib/tripleseat";
import { clientIp, verifyTurnstile } from "@/lib/turnstile";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = "operations@lavictoriatampa.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Set to false if TripleSeat's own auto-response email turns out to reach
 * guests, so they don't get two confirmations.
 */
const SEND_GUEST_CONFIRMATION = true;

const field = (value: unknown, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });

/** Resend reports API errors in its result but throws on network failures. */
async function sendEmail(
  label: string,
  options: Parameters<typeof resend.emails.send>[0]
): Promise<boolean> {
  try {
    const { error } = await resend.emails.send(options);
    if (!error) return true;
    console.error(`Private dining ${label} email failed:`, error);
  } catch (error) {
    console.error(`Private dining ${label} email failed:`, error);
  }
  return false;
}

/** True for a real calendar date between today and two years out. */
function isBookableDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return false;
  const today = todayInTampa();
  const latest = `${Number(today.slice(0, 4)) + 2}${today.slice(4)}`;
  return value >= today && value <= latest;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: real visitors never see this field, so anything in it is a bot.
    // Answer as if it worked so the bot has nothing to adapt to.
    if (field(body.website, 200)) {
      return NextResponse.json({ success: true });
    }

    const first_name = field(body.first_name, 80);
    const last_name = field(body.last_name, 80);
    const email = field(body.email, 200);
    const phone = field(body.phone, 40);
    const company = field(body.company, 120);
    const occasion = OCCASIONS.find((o) => o === body.occasion);
    const event_date = field(body.event_date, 10);
    const startSlot = TIME_SLOTS.findIndex((t) => t.value === body.start_time);
    const endSlot = body.end_time ? TIME_SLOTS.findIndex((t) => t.value === body.end_time) : null;
    const guest_count = Number(body.guest_count);
    const notes = field(body.notes, NOTES_MAX_LENGTH);
    const referral = body.referral_source_id
      ? REFERRAL_SOURCES.find((r) => r.id === body.referral_source_id)
      : null;
    const referralOther = referral?.id === OTHER_REFERRAL_ID ? field(body.referral_source_other, 200) : "";

    if (!first_name || !last_name || !email || !phone) {
      return badRequest("Name, email, and phone are required.");
    }
    if (!EMAIL_PATTERN.test(email)) {
      return badRequest("Please enter a valid email address.");
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return badRequest("Please enter a valid phone number.");
    }
    if (!occasion) return badRequest("Please choose the occasion.");
    if (!isBookableDate(event_date)) {
      return badRequest("Please choose a date between today and two years from now.");
    }
    if (startSlot === -1) return badRequest("Please choose a start time.");
    if (endSlot === -1 || (endSlot !== null && endSlot <= startSlot)) {
      return badRequest("Please choose an end time after the start time.");
    }
    if (!Number.isInteger(guest_count) || guest_count < 1 || guest_count > MAX_GUESTS) {
      return badRequest(`Please enter a guest count between 1 and ${MAX_GUESTS}.`);
    }
    if (referral === undefined) {
      return badRequest("Please choose one of the listed options.");
    }

    // Bot check last, so a guest who mistyped a field doesn't use up their token.
    if (!(await verifyTurnstile(field(body.turnstile_token, 2048), clientIp(request)))) {
      return NextResponse.json(
        { error: "We couldn't verify your submission. Please try again." },
        { status: 403 }
      );
    }

    const start = TIME_SLOTS[startSlot];
    const end = endSlot === null ? null : TIME_SLOTS[endSlot];

    const inquiry: PrivateDiningInquiry = {
      first_name,
      last_name,
      email,
      phone,
      company,
      occasion,
      event_date,
      start_time: start.label,
      end_time: end?.label ?? "",
      guest_count,
      notes,
      referral_source: referral
        ? referralOther ? `${referral.label}: ${referralOther}` : referral.label
        : "",
    };

    const utm = {
      campaign_source: field(body.utm_source, 200),
      campaign_medium: field(body.utm_medium, 200),
      campaign_name: field(body.utm_campaign, 200),
      campaign_term: field(body.utm_term, 200),
      campaign_content: field(body.utm_content, 200),
      gclid: field(body.gclid, 300),
    };

    const tripleseat = await submitTripleseatLead({
      first_name,
      last_name,
      email,
      phone,
      company,
      location_id: TRIPLESEAT_LOCATION_ID,
      event_style: EVENT_STYLE,
      nature_of_event: occasion,
      event_date,
      start_time: start.value,
      end_time: end?.value,
      guest_count: String(guest_count),
      additional_information: notes,
      referral_source_id: referral?.id,
      referral_source_other: referralOther,
      ...utm,
    });

    if (tripleseat.status !== "sent") {
      console.error("Private dining TripleSeat submission not sent:", tripleseat);
    }

    // The team always gets a copy by email. It doubles as the backup: if
    // TripleSeat didn't take the lead, the email says to add it by hand.
    const notified = await sendEmail("notification", {
      from: "La Victoria Private Dining <noreply@thedigitalwash.com>",
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Private Dining Inquiry: ${first_name} ${last_name} (${guest_count} guests)`,
      html: privateDiningNotificationEmail(inquiry, tripleseat),
    });

    // The inquiry counts as received if it reached TripleSeat or the team's inbox.
    if (tripleseat.status !== "sent" && !notified) {
      return NextResponse.json(
        { error: "We couldn't send your inquiry. Please try again or call us." },
        { status: 500 }
      );
    }

    if (SEND_GUEST_CONFIRMATION) {
      await sendEmail("confirmation", {
        from: "La Victoria <noreply@lavictoriatampa.com>",
        to: email,
        subject: "We received your private dining inquiry",
        html: privateDiningConfirmationEmail(inquiry),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return badRequest("Invalid request.");
  }
}
