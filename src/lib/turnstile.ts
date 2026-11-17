/**
 * Server-side check for Cloudflare Turnstile tokens. Server only.
 *
 * TURNSTILE_SECRET_KEY turns the check on. Without it, every submission
 * passes, so forms keep working before the keys are set up.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The visitor's IP as Vercel reports it, passed along to help Cloudflare judge the token. */
export function clientIp(request: Request): string | null {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

export async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    const result = await res.json();
    if (!result.success) {
      console.error("Turnstile rejected a submission:", result["error-codes"]);
    }
    return result.success === true;
  } catch (error) {
    // If Cloudflare itself can't be reached, let the inquiry through: losing a
    // real guest's request is worse than the odd spam lead during an outage.
    console.error("Turnstile verification unavailable:", error);
    return true;
  }
}
