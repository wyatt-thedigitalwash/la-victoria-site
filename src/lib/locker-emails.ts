import { detailRow, emailShell, escapeHtml, multiline, submittedAt } from "@/lib/email-layout";

export interface LockerRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_contact: string;
  notes: string;
}

const shell = (body: string) => emailShell("Tequila Lockers", body);

/** Internal notification sent to the restaurant when a request comes in. */
export function lockerNotificationEmail(request: LockerRequest): string {
  const name = escapeHtml(`${request.first_name} ${request.last_name}`);
  const email = escapeHtml(request.email);
  const phone = escapeHtml(request.phone);

  return shell(`
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">New Locker Request</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${detailRow("Name", name)}
                ${detailRow("Email", `<a href="mailto:${email}" style="color:#F4D47C;text-decoration:none;">${email}</a>`)}
                ${detailRow("Phone", `<a href="tel:${phone}" style="color:#F4D47C;text-decoration:none;">${phone}</a>`)}
                ${detailRow("Prefers", escapeHtml(request.preferred_contact))}
                ${request.notes ? detailRow("Notes", multiline(request.notes)) : ""}
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
export function lockerConfirmationEmail(firstName: string): string {
  return shell(`
          <tr>
            <td align="center">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">We have your request, ${escapeHtml(firstName)}.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:16px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:400;color:#C4A882;line-height:1.6;margin:0;">Lockers are limited, so a member of our team will reach out personally with availability and next steps.</p>
            </td>
          </tr>`);
}
