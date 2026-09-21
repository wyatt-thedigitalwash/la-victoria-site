import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import {
  lockerConfirmationEmail,
  lockerNotificationEmail,
} from "@/lib/locker-emails";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = "operations@lavictoriatampa.com";
const CONTACT_METHODS = ["Call", "Text", "Email"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = (value: unknown, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

/** Resend reports API errors in its result but throws on network failures. */
async function sendEmail(
  label: string,
  options: Parameters<typeof resend.emails.send>[0]
): Promise<boolean> {
  try {
    const { error } = await resend.emails.send(options);
    if (!error) return true;
    console.error(`Locker request ${label} email failed:`, error);
  } catch (error) {
    console.error(`Locker request ${label} email failed:`, error);
  }
  return false;
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
    const preferred_contact = field(body.preferred_contact, 20);
    const notes = field(body.notes, 1000);

    if (!first_name || !last_name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (!CONTACT_METHODS.includes(preferred_contact)) {
      return NextResponse.json(
        { error: "Please choose how you would like us to reach you." },
        { status: 400 }
      );
    }

    if (body.age_confirmed !== true) {
      return NextResponse.json(
        { error: "You must be 21 or older to request a locker." },
        { status: 400 }
      );
    }

    const lockerRequest = {
      first_name,
      last_name,
      email,
      phone,
      preferred_contact,
      notes,
    };

    // The request is recorded in two places: the database and the team's inbox.
    // Either one is enough for the team to follow up, so only fail the
    // submission if both of them fail.
    const { error: insertError } = await supabaseAdmin
      .from("locker_requests")
      .insert({ ...lockerRequest, notes: notes || null });

    if (insertError) {
      console.error("Locker request insert failed:", insertError);
    }

    const notified = await sendEmail("notification", {
      from: "La Victoria Tequila Lockers <noreply@thedigitalwash.com>",
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Locker Request: ${first_name} ${last_name}`,
      html: lockerNotificationEmail(lockerRequest),
    });

    if (insertError && !notified) {
      return NextResponse.json(
        { error: "We couldn't save your request. Please try again." },
        { status: 500 }
      );
    }

    // Guest confirmation (non-blocking — don't fail the response if this errors)
    await sendEmail("confirmation", {
      from: "La Victoria <noreply@lavictoriatampa.com>",
      to: email,
      subject: "We have your locker request",
      html: lockerConfirmationEmail(first_name),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
