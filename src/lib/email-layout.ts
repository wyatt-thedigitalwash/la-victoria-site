/** Shared building blocks for the site's branded transactional emails. */

/** User input lands inside HTML emails, so it has to be escaped first. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes text and keeps the guest's line breaks. */
export const multiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

/** Logo, a subtitle such as "Tequila Lockers", the body rows, and the footer. */
export const emailShell = (subtitle: string, body: string) => `
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
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#F4D47C;letter-spacing:3px;text-transform:uppercase;">${subtitle}</span>
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

/** A label/value pair in a details table. The value must already be escaped. */
export const detailRow = (label: string, value: string) => `
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">${label}</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;line-height:1.6;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);">${value}</td>
                </tr>`;

/** "Submitted November 17, 2026 at 3:10 PM" in Tampa time. */
export const submittedAt = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  });
