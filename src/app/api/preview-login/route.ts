import { NextResponse } from "next/server";
import {
  PREVIEW_COOKIE,
  PREVIEW_COOKIE_OPTIONS,
  checkPassword,
  createPreviewToken,
  isPreviewConfigured,
} from "@/lib/preview-auth";

export async function POST(request: Request) {
  if (!isPreviewConfigured()) {
    return NextResponse.json(
      { error: "The preview is not configured on this deployment." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    // Malformed body falls through to the empty-password rejection below.
  }

  if (!(await checkPassword(password))) {
    return NextResponse.json({ error: "That password isn't right." }, { status: 401 });
  }

  const token = await createPreviewToken();
  if (!token) {
    return NextResponse.json(
      { error: "The preview is not configured on this deployment." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(PREVIEW_COOKIE, token, PREVIEW_COOKIE_OPTIONS);
  return response;
}

/** Sign out of the preview. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(PREVIEW_COOKIE, "", { ...PREVIEW_COOKIE_OPTIONS, maxAge: 0 });
  return response;
}
