import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PREVIEW_COOKIE, verifyPreviewToken } from "@/lib/preview-auth";

const PUBLIC_PATHS = new Set([
  "/",
  "/careers",
  "/apply",
  "/menus",
  "/photos",
  "/parking",
  "/private-dining",
  "/reservations",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/og-image.png",
  "/site.webmanifest",
  "/sitemap.xml",
  "/robots.txt",
]);

const PUBLIC_PREFIXES = ["/_next", "/api", "/assets"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Private client preview: password gated, never public ---
  if (pathname === "/preview" || pathname.startsWith("/preview/")) {
    // The login screen itself has to stay reachable.
    if (pathname === "/preview/login") {
      return NextResponse.next();
    }

    const authorized = await verifyPreviewToken(
      request.cookies.get(PREVIEW_COOKIE)?.value
    );

    if (!authorized) {
      const loginUrl = new URL("/preview/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Belt-and-braces alongside the noindex metadata on the preview layout.
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // --- Public site ---
  if (
    PUBLIC_PATHS.has(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.next();
  }

  // Everything else on the public site falls back to the landing page.
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
