"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface Photo {
  src: string;
  alt: string;
  label: string;
  caption: string;
  /** Photos flagged wide span both columns on desktop. */
  wide?: boolean;
}

export default function PhotoGrid({ photos }: { photos: readonly Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + delta + photos.length) % photos.length
      ),
    [photos.length]
  );

  // Keyboard control for the lightbox, plus a scroll lock while it is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-6 md:grid-cols-2 md:gap-6 md:px-12">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`View larger: ${photo.label}`}
            className={`group relative block h-[52vh] min-h-[320px] w-full overflow-hidden rounded-sm md:h-[62vh] ${
              photo.wide ? "md:col-span-2" : ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={photo.wide ? "(max-width: 768px) 100vw, 1400px" : "(max-width: 768px) 100vw, 50vw"}
              loading={index < 2 ? "eager" : "lazy"}
              className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-deep/85 via-transparent to-transparent"
              aria-hidden="true"
            />

            <span className="absolute right-6 top-5 font-mono text-[11px] tracking-[2px] text-smoke">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>

            <span className="absolute bottom-6 left-6 right-6 text-left">
              <span className="block font-body text-[22px] font-light italic text-cream md:text-[26px]">
                {photo.label}
              </span>
              <span className="mt-1 block font-body text-[13px] leading-relaxed text-sand opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {photo.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onClick={close}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-deep/97 px-4 py-16 backdrop-blur-sm"
        >
          <div
            className="relative h-full w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="mt-6 text-center" onClick={(event) => event.stopPropagation()}>
            <p className="font-body text-[20px] font-light italic text-cream">
              {active.label}
            </p>
            <p className="mt-1 font-body text-[13px] text-sand">{active.caption}</p>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 font-mono text-[11px] uppercase tracking-[2px] text-sand transition-colors duration-300 hover:text-cream"
          >
            Close &times;
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-4 font-mono text-[20px] text-sand transition-colors duration-300 hover:text-cream"
          >
            &larr;
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-4 font-mono text-[20px] text-sand transition-colors duration-300 hover:text-cream"
          >
            &rarr;
          </button>
        </div>
      )}
    </>
  );
}
