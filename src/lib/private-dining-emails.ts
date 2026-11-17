import { detailRow, emailShell, escapeHtml, multiline, submittedAt } from "@/lib/email-layout";
import type { TripleseatResult } from "@/lib/tripleseat";

export interface PrivateDiningInquiry {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  event_style: string;
  occasion: string;
  event_date: string;
  start_time: string;
  end_time: string;
  guest_count: number;
  space_preference: string;
  notes: string;
  referral_source: string;
}

const shell = (body: string) => emailShell("Private Dining", body);

/** "2026-12-12" → "Saturday, December 12, 2026" */
export function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Tells the team whether the lead reached TripleSeat or has to be entered by hand. */
function tripleseatNotice(result: TripleseatResult): string {
  const [color, text] =
    result.status === "sent"
      ? ["#9FBF8F", "Added to TripleSeat."]
      : result.status === "skipped"
        ? ["#E8C27A", `Not sent to TripleSeat (${result.reason}). Please add this lead manually.`]
        : ["#E8A08A", `TripleSeat did not accept this lead (${result.error}). Please add it manually.`];

  return `
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${color};line-height:1.6;margin:0;">${escapeHtml(text)}</p>
            </td>
          </tr>`;
}

/** Internal notification sent to the restaurant when an inquiry comes in. */
export function privateDiningNotificationEmail(
  inquiry: PrivateDiningInquiry,
  tripleseat: TripleseatResult
): string {
  const name = escapeHtml(`${inquiry.first_name} ${inquiry.last_name}`);
  const email = escapeHtml(inquiry.email);
  const phone = escapeHtml(inquiry.phone);
  const time = inquiry.end_time
    ? `${inquiry.start_time} – ${inquiry.end_time}`
    : inquiry.start_time;

  return shell(`
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">New Private Dining Inquiry</p>
            </td>
          </tr>
          ${tripleseatNotice(tripleseat)}
          <tr>
            <td style="padding:0 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${detailRow("Name", name)}
                ${detailRow("Email", `<a href="mailto:${email}" style="color:#F4D47C;text-decoration:none;">${email}</a>`)}
                ${detailRow("Phone", `<a href="tel:${phone}" style="color:#F4D47C;text-decoration:none;">${phone}</a>`)}
                ${inquiry.company ? detailRow("Company", escapeHtml(inquiry.company)) : ""}
                ${detailRow("Event", escapeHtml(`${inquiry.occasion} · ${inquiry.event_style}`))}
                ${detailRow("Date", escapeHtml(formatEventDate(inquiry.event_date)))}
                ${detailRow("Time", escapeHtml(time))}
                ${detailRow("Guests", String(inquiry.guest_count))}
                ${inquiry.space_preference ? detailRow("Space", escapeHtml(inquiry.space_preference)) : ""}
                ${inquiry.notes ? detailRow("Details", multiline(inquiry.notes)) : ""}
                ${inquiry.referral_source ? detailRow("Heard About Us", escapeHtml(inquiry.referral_source)) : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 0 0;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;margin:0;">Submitted ${submittedAt()} ET</p>
            </td>
          </tr>`);
}

/** Confirmation sent to the guest. */
export function privateDiningConfirmationEmail(inquiry: PrivateDiningInquiry): string {
  return shell(`
          <tr>
            <td align="center">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">Thank you, ${escapeHtml(inquiry.first_name)}.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:16px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:400;color:#C4A882;line-height:1.6;margin:0;">We have your inquiry for ${escapeHtml(formatEventDate(inquiry.event_date))}, ${inquiry.guest_count} guests. Our events team will be in touch soon with availability and next steps.</p>
            </td>
          </tr>`);
}
