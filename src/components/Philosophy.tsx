"use client";

import { useEffect, useRef } from "react";

const LINES = [
  "Rooted in tradition.",
  "Refined by fire.",
  "Served with reverence.",
];

/**
 * `bare` drops the section's own fade, divider and full-height layout so it can
 * sit directly on the page background under another section.
 */
export default function Philosophy({ bare = false }: { bare?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("philosophy-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      data-bg={bare ? undefined : "deep"}
      className={`relative flex flex-col items-center justify-center px-6 ${
        bare ? "pb-[120px]" : "min-h-screen py-[120px]"
      }`}
    >
      {/* Top gradient fade for seamless blend */}
      {!bare && (
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-deep to-transparent" />
      )}

      <div ref={containerRef} className="relative z-10 flex flex-col items-center text-center">
        {LINES.map((line, i) => (
          <p
            key={i}
            data-reveal
            className={`philosophy-line font-body font-light text-cream text-[clamp(24px,7.4vw,32px)] md:text-[clamp(32px,5vw,64px)] leading-[1.4] mb-4 ${bare ? "" : "italic"}`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            {line}
          </p>
        ))}

        {!bare && (
          <div
            data-reveal
            className="philosophy-divider mt-10 h-px w-[60px] bg-brass"
            style={{ transitionDelay: "600ms" }}
          />
        )}
      </div>
    </section>
  );
}
