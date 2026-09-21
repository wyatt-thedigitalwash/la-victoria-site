export interface LockerRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_contact: string;
  notes: string;
}

/** User input lands inside HTML emails, so it has to be escaped first. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const shell = (body: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#1A1508;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#1A1508;">
    <tr>
      <td align="center" style="padding:48px 24px 0;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="https://lavictoriatampa.com/assets/La-Victoria-title-only.svg" alt="La Victoria" width="240" style="display:block;width:240px;height:auto;" />
            </td>
          </tr>
          <!-- Subtitle -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#F4D47C;letter-spacing:3px;text-transform:uppercase;">Tequila Lockers</span>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="width:60px;max-width:60px;height:1px;background-color:#F4D47C;opacity:0.3;margin:0 auto;"></div>
            </td>
          </tr>
          ${body}
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid rgba(244,212,124,0.1);">
                <tr>
                  <td align="center" style="padding-top:32px;">
                    <a style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-decoration:none;">105 W Tyler Street, Tampa, FL 33602</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:24px 0 0;">
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#504328;margin:0;">&copy; 2026 La Victoria</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:32px;"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const detailRow = (label: string, value: string) => `
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">${label}</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;line-height:1.6;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);">${value}</td>
                </tr>`;

/** Internal notification sent to the restaurant when a request comes in. */
export function lockerNotificationEmail(request: LockerRequest): string {
  const name = escapeHtml(`${request.first_name} ${request.last_name}`);
  const email = escapeHtml(request.email);
  const phone = escapeHtml(request.phone);
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  });

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
                ${request.notes ? detailRow("Notes", escapeHtml(request.notes).replace(/\n/g, "<br />")) : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 0 0;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;margin:0;">Submitted ${submittedAt} ET</p>
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
