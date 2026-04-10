"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

const ITEMS = [
  {
    label: "The Cantina Bar",
    image: "/assets/cantina-bar.jpg",
    alt: "The green marble cantina bar with backlit bottle wall and ribbed glass pendants",
  },
  {
    label: "The Crudo Counter",
    image: "/assets/crudo-counter.jpg",
    alt: "The crudo counter with fresh seafood display and chefs preparing dishes",
  },
  {
    label: "The Dining Room",
    image: "/assets/the-dining-room.jpg",
    alt: "The main dining room with dark marble tables, scalloped ceiling tiles, and candlelight",
  },
  {
    label: "Private Dining",
    image: "/assets/private-dining.jpg",
    alt: "The private dining room with sheer curtain dividers and intimate table setting",
  },
] as const;

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  }, []);

  const onMouseUp = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.isDown) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
  }, []);

  return (
    <section id="space" data-bg="deep" className="pt-[100px] pb-0">
      {/* Header */}
      <div className="text-center px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-5">
          The Space
        </p>
        <h2 className="font-body font-light italic text-cream text-[clamp(28px,4vw,48px)] leading-[1.3]">
          An atmosphere you feel before you see
        </h2>
      </div>

      {/* Gallery */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        className="gallery-scroll mt-[60px] flex gap-6 overflow-x-auto px-6 md:px-12 cursor-grab select-none"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            className="group relative flex-shrink-0 w-[85vw] md:w-[70vw] md:max-w-[900px] h-[55vh] min-h-[400px] overflow-hidden rounded-sm"
            style={{ scrollSnapAlign: "center" }}
          >
            {/* Photo */}
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 85vw, 70vw"
              className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />

            {/* Bottom gradient for label readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" />

            {/* Number label */}
            <span className="absolute top-5 right-6 font-mono text-[11px] tracking-[2px] text-smoke">
              {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
            </span>

            {/* Descriptive label */}
            <span className="absolute bottom-6 left-6 font-body font-light italic text-[24px] text-cream">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center py-20 font-mono text-[11px] tracking-[2px] uppercase text-smoke">
        Scroll to explore{" "}
        <span className="inline-block gallery-arrow-slide">&rarr;</span>
      </p>
    </section>
  );
}
