/**
 * Password gate for the private client preview at /preview.
 *
 * Runs in both the Edge middleware and Node route handlers, so everything here
 * uses Web Crypto only — no node:crypto imports.
 *
 * The cookie never holds the password. It holds an HMAC of a fixed message,
 * keyed by the server-side secret, so a stolen cookie reveals nothing and
 * rotating PREVIEW_PASSWORD invalidates every outstanding session.
 */

export const PREVIEW_COOKIE = "lv_preview";

const TOKEN_MESSAGE = "la-victoria-preview-v1";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export const PREVIEW_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: THIRTY_DAYS,
} as const;

function getSecret(): string | null {
  const secret = process.env.PREVIEW_SECRET || process.env.PREVIEW_PASSWORD;
  return secret ? secret : null;
}

export function isPreviewConfigured(): boolean {
  return Boolean(process.env.PREVIEW_PASSWORD);
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Compare two equal-length hex digests without leaking position via timing. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createPreviewToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  return hmacHex(secret, TOKEN_MESSAGE);
}

export async function verifyPreviewToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await createPreviewToken();
  if (!expected) return false;
  return safeEqual(token, expected);
}

/**
 * Check a submitted password. Both sides are hashed first so the comparison is
 * over fixed-length digests and reveals nothing about the real password's length.
 */
export async function checkPassword(submitted: string): Promise<boolean> {
  const expected = process.env.PREVIEW_PASSWORD;
  if (!expected || !submitted) return false;
  const [a, b] = await Promise.all([
    hmacHex(TOKEN_MESSAGE, submitted),
    hmacHex(TOKEN_MESSAGE, expected),
  ]);
  return safeEqual(a, b);
}
