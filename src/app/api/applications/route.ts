import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx"];

const NOTIFICATION_EMAIL = "operations@lavictoriatampa.com";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const first_name = String(formData.get("first_name") || "").trim();
    const last_name = String(formData.get("last_name") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const resume = formData.get("resume");

    if (!first_name || !last_name || !position || !email || !phone) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "A resume file is required." },
        { status: 400 }
      );
    }

    const extension = (resume.name.split(".").pop() || "").toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { error: "Resume must be a PDF, DOC, or DOCX file." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file exceeds the 5MB limit." },
        { status: 400 }
      );
    }

    // Upload resume to Supabase Storage
    const sanitize = (s: string) => s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const timestamp = Date.now();
    const fileName = `${timestamp}-${sanitize(last_name)}-${sanitize(first_name)}.${extension}`;

    const arrayBuffer = await resume.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(fileName, arrayBuffer, {
        contentType: resume.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload failed:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload resume." },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl: resume_url },
    } = supabaseAdmin.storage.from("resumes").getPublicUrl(fileName);

    // Insert application row
    const { error: insertError } = await supabaseAdmin
      .from("applications")
      .insert({
        first_name,
        last_name,
        position,
        email,
        phone,
        notes: notes || null,
        resume_url,
      });

    if (insertError) {
      console.error("Application insert failed:", insertError);
      return NextResponse.json(
        { error: "Failed to save application." },
        { status: 500 }
      );
    }

    // Send notification email (non-blocking — don't fail the response if this errors)
    try {
      const submittedAt = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "long",
        timeStyle: "short",
      });

      await resend.emails.send({
        from: "La Victoria Careers <noreply@thedigitalwash.com>",
        to: NOTIFICATION_EMAIL,
        subject: `New Application: ${position}`,
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
          <!-- Heading -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;color:#FCE9C7;line-height:1.6;margin:0;">New Application Received</p>
            </td>
          </tr>
          <!-- Details -->
          <tr>
            <td style="padding:0 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:8px 0 2px;">Name</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);">${first_name} ${last_name}</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">Position</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);">${position}</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">Email</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);"><a href="mailto:${email}" style="color:#F4D47C;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">Phone</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);"><a href="tel:${phone}" style="color:#F4D47C;text-decoration:none;">${phone}</a></td>
                </tr>
                ${
                  notes
                    ? `<tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;text-transform:uppercase;letter-spacing:1px;padding:12px 0 2px;">Notes</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#FCE9C7;line-height:1.6;padding-bottom:12px;border-bottom:1px solid rgba(244,212,124,0.1);">${notes.replace(/\n/g, "<br />")}</td>
                </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>
          <!-- Resume button -->
          <tr>
            <td align="center" style="padding:32px 0 8px;">
              <a href="${resume_url}" target="_blank" rel="noopener noreferrer" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#FCE9C7;background:#4D1807;text-decoration:none;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;">Download Resume</a>
            </td>
          </tr>
          <!-- Timestamp -->
          <tr>
            <td align="center" style="padding:16px 0 0;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7C6533;margin:0;">Submitted ${submittedAt} ET</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:56px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid rgba(244,212,124,0.1);">
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
</html>`,
      });
    } catch (emailError) {
      console.error("Failed to send application notification email:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
