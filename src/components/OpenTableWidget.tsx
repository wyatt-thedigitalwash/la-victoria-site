"use client";

import { useEffect, useRef } from "react";

/**
 * OpenTable's reservation widget. Their loader script injects the booking
 * iframe next to itself, so it has to be appended at runtime: a <script> tag
 * rendered by React never executes.
 */
export default function OpenTableWidget({ rid }: { rid: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params = new URLSearchParams({
      rid,
      type: "standard",
      theme: "tall",
      color: "1",
      dark: "true",
      iframe: "true",
      domain: "com",
      lang: "en-US",
      newtab: "false",
      ot_source: "Restaurant website",
      cfe: "true",
    });

    const script = document.createElement("script");
    script.src = `https://www.opentable.com/widget/reservation/loader?${params}`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [rid]);

  return <div ref={containerRef} className="flex justify-center min-h-[480px]" />;
}
