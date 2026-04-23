import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone } = body;

    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("leads")
      .insert({ first_name, last_name, email, phone: phone || null });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save lead." },
        { status: 500 }
      );
    }

    // Send confirmation email (non-blocking — don't fail the response if this errors)
    try {
      await resend.emails.send({
        from: "La Victoria <noreply@lavictoriatampa.com>",
        to: email,
        subject: "You're In",
        html: `
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
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#F4D47C;letter-spacing:3px;text-transform:uppercase;">Kitchen &middot; Crudo &middot; Cantina</span>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="width:60px;max-width:60px;height:1px;background-color:#F4D47C;opacity:0.3;margin:0 auto;"></div>
            </td>
          </tr>
          <!-- Main message -->
          <tr>
            <td align="center">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">Thanks for signing up, ${first_name}.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:16px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:400;color:#C4A882;line-height:1.6;margin:0;">We&rsquo;ll let you know when we&rsquo;re ready to open.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:64px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid rgba(244,212,124,0.1);">
                <tr>
                  <td align="center" style="padding-top:32px;">
                    <a style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-decoration:none;">105 W Tyler Street, Tampa, FL 33602</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:16px;">
                    <a href="https://www.instagram.com/lavictoriatampa/" target="_blank" rel="noopener noreferrer" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#F4D47C;text-decoration:none;letter-spacing:1px;">Instagram</a>
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
          <!-- Bottom padding -->
          <tr>
            <td style="height:32px;"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
