"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId: string): void;
      remove(widgetId: string): void;
    };
  }
}

/** Public key. Without it the widget doesn't render and forms submit as before. */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Cloudflare Turnstile bot check. It runs invisibly for most visitors and only
 * shows a checkbox when Cloudflare isn't sure.
 *
 * `onToken` must be stable (a state setter is ideal). Bump `resetSignal` after
 * a failed submit, because each token can only be used once.
 */
export default function Turnstile({
  onToken,
  resetSignal,
}: {
  onToken: (token: string) => void;
  resetSignal: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !container.current || !window.turnstile) return;
    const id = window.turnstile.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      appearance: "interaction-only",
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
    widgetId.current = id;
    return () => {
      window.turnstile?.remove(id);
      widgetId.current = null;
    };
  }, [ready, onToken]);

  useEffect(() => {
    if (resetSignal && widgetId.current) {
      onToken("");
      window.turnstile?.reset(widgetId.current);
    }
  }, [resetSignal, onToken]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="flex justify-center [&:not(:empty)]:mt-4" />
    </>
  );
}
