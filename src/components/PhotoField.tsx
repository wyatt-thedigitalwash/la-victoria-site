"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FIELD_GROUPS, FIELD_SIZE, fieldAlt, type Layout } from "@/lib/photo-field";

const unit = (value: number) => `calc(var(--u) * ${value})`;

export default function PhotoField({ layout, className }: { layout: Layout; className: string }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { columns, rows } = FIELD_SIZE[layout];

  useEffect(() => {
    const field = fieldRef.current;
    // Both layouts are in the page; only the visible one should load or animate.
    if (!field || field.offsetParent === null) return;

    /* Start every download now, so photos are ready before they scroll into view */
    field.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });

    /* Fade photos and headings in the moment any part is in frame. Watching the tile,
       not the sliding layer inside it, keeps the start offset from delaying this. */
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const layer = entry.target.matches("li") ? entry.target.querySelector(".scroll-reveal") : entry.target;
        layer?.classList.add("scroll-reveal-visible");
        observer.unobserve(entry.target);
      }
    });
    field.querySelectorAll("li, h2").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={fieldRef}
      className={`relative ${className}`}
      style={{ "--u": `calc(100vw / ${columns})`, height: unit(rows) } as React.CSSProperties}
    >
      {FIELD_GROUPS.map((group) => {
        const { slot, size } = group.heading[layout];
        return (
          <section key={group.title} aria-label={group.title}>
            <h2
              className="absolute flex items-center justify-center font-display font-normal leading-none whitespace-nowrap text-cream"
              style={{
                left: unit(slot[0]),
                top: unit(slot[1]),
                width: unit(slot[2]),
                height: unit(slot[3]),
                fontSize: unit(size),
              }}
            >
              <span className="triptych-line" style={{ transitionDuration: "800ms" }}>
                {group.title}
              </span>
            </h2>
            <ul>
              {group.photos.map((photo) => {
                const [x, y, w, h] = photo[layout];
                return (
                  <li
                    key={photo.file}
                    className="absolute"
                    style={{ left: unit(x), top: unit(y), width: unit(w), height: unit(h) }}
                  >
                    <div
                      className="scroll-reveal relative h-full overflow-hidden"
                      style={{ transitionDuration: "500ms" }}
                    >
                      <Image
                        src={`/assets/photos/${photo.file}`}
                        alt={fieldAlt(photo.file)}
                        fill
                        sizes={`${Math.ceil((w / columns) * 100)}vw`}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
