"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const EXPERIENCES = [
  {
    title: "Kitchen",
    description:
      "A space where Mexican culinary tradition is honored through refined technique and contemporary execution. It embodies craftsmanship, depth of flavor, and the transformation of heritage recipes into elevated dining experiences. Kitchen reflects the discipline, warmth, and artistry behind every plate.",
  },
  {
    title: "Crudo",
    description:
      "Captures the essence of purity and immediacy. Rooted in coastal Mexican traditions, Crudo celebrates fresh ingredients presented with restraint and precision. It conveys bold simplicity, vibrant textures, and the raw elegance of flavors served at their peak.",
  },
  {
    title: "Cantina",
    description:
      "Evokes the spirit of gathering. Inspired by the timeless Mexican cantina, it represents conviviality, storytelling, and ritual. Cantina reflects curated spirits, artisanal cocktails, and the celebratory energy that turns a meal into an experience, where heritage meets modern refinement.",
  },
] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  const addRevealRef = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  /* Lock hero height on mount so mobile browser chrome changes don't cause reflow */
  useEffect(() => {
    if (heroRef.current) heroRef.current.style.minHeight = `${window.innerHeight}px`;
  }, []);

  /* Scroll-driven text reveal: opacity and translateY based on viewport center proximity */
  useEffect(() => {
    const elements = revealRefs.current;
    if (!elements.length) return;

    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const revealRange = window.innerHeight * 0.45;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elCenter);
        const progress = Math.max(0, 1 - distance / revealRange);

        // Map progress: 0 → opacity 0.1, translateY 20px; 1 → opacity 1, translateY 0
        const opacity = 0.1 + progress * 0.9;
        const translateY = (1 - progress) * 20;

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${translateY}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      {/* ── Hero ── */}
      <section ref={heroRef} className="csb-hero relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", paddingTop: "calc(var(--banner-height, 0px) + 56px)" }}>
        {/* Background image */}
        <Image
          src="/assets/cactus-video.png"
          alt="Desert cactus landscape in warm golden light"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#221A0E]/55" />
        {/* Warm atmospheric glows */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Title */}
          <h1 className="sr-only">La Victoria</h1>
          <div className="csb-logo">
            <Image
              src="/assets/La-Victoria-title-only.svg"
              alt="La Victoria"
              width={600}
              height={133}
              priority
              className="w-[438px] md:w-[703px] h-auto"
            />
          </div>

          {/* Subtitle */}
          <p className="csb-subtitle font-mono text-[12px] tracking-[6px] uppercase text-brass mt-5"
             style={{ color: "#F4D47C" }}>
            Kitchen&ensp;&middot;&ensp;Crudo&ensp;&middot;&ensp;Cantina
          </p>

          {/* Now open */}
          <p
            className="csb-notify font-mono text-[12px] tracking-[3px] uppercase mt-10"
            style={{ color: "#FCE8C7" }}
          >
            Now Open
          </p>
        </div>
      </section>

      {/* ── Text Reveal Sections ── */}
      <div
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 30% 20%, rgba(80, 67, 40, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 70% 50%, rgba(124, 101, 51, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 40% 80%, rgba(77, 24, 7, 0.14) 0%, transparent 70%),
            #221A0E
          `,
        }}
      >
      {EXPERIENCES.map((exp, i) => (
        <div key={exp.title}>
          {/* Diamond spacer */}
          <div
            className="flex items-center justify-center py-4"
            style={{ color: "rgba(244, 212, 124, 0.2)" }}
            aria-hidden="true"
          >
            <span className="text-[10px]">&#9670;</span>
          </div>

          {/* Experience section */}
          <section className="flex min-h-screen items-center justify-center px-6">
            <div className="max-w-[700px] text-center">
              {/* Title */}
              <h2
                ref={addRevealRef}
                className="font-mono text-[14px] font-bold uppercase tracking-[4px] transition-none"
                style={{ color: "#F4D47C", opacity: 0.1 }}
              >
                {exp.title}
              </h2>

              {/* Divider line */}
              <div
                ref={addRevealRef}
                className="mx-auto mt-6 mb-6 transition-none"
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(244, 212, 124, 0.3)",
                  opacity: 0.1,
                }}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                ref={addRevealRef}
                className="font-body text-[20px] md:text-[24px] italic font-light leading-[1.7] transition-none"
                style={{ color: "#FCE9C7", opacity: 0.1 }}
              >
                {exp.description}
              </p>
            </div>
          </section>
        </div>
      ))}
      </div>

      {/* ── Footer ── */}
      <footer className="flex flex-col items-center text-center px-6 pt-20 pb-10">
        {/* Separator */}
        <div
          className="w-full max-w-[200px] mb-20"
          style={{ height: "1px", background: "rgba(124, 101, 51, 0.15)" }}
          aria-hidden="true"
        />

        {/* Icon */}
        <Image
          src="/assets/La-Victoria-icon-beige.webp"
          alt="La Victoria icon"
          width={40}
          height={40}
          loading="lazy"
          className="mb-6"
        />

        {/* Social links */}
        <a
          href="https://www.instagram.com/lavictoriatampa/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
          style={{ color: "#F4D47C" }}
          aria-label="Follow La Victoria on Instagram (opens in new tab)"
        >
          Instagram
        </a>

        {/* Address */}
        <p
          className="font-body text-[13px] font-normal mt-4"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          105 W Tyler Street, Tampa, FL 33602
        </p>

        {/* Email */}
        <a
          href="mailto:operations@lavictoriatampa.com"
          className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          operations@lavictoriatampa.com
        </a>

        {/* Copyright */}
        <p
          className="font-body text-[13px] font-normal mt-6"
          style={{ color: "rgba(252, 233, 199, 0.4)" }}
        >
          &copy; 2026 La Victoria
        </p>

        {/* Credit */}
        <p
          className="font-body text-[10px] font-normal mt-5"
          style={{ color: "rgba(252, 233, 199, 0.3)" }}
        >
          Site by{" "}
          <a
            href="https://thedigitalwash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[rgba(252,233,199,0.6)]"
            style={{ color: "inherit" }}
          >
            The Digital Wash<span className="sr-only"> (opens in new tab)</span>
          </a>
        </p>
      </footer>

      <style jsx>{`
        /* ── Hero animations ── */
        .csb-logo {
          opacity: 0;
          animation: csb-logo-in 2s cubic-bezier(0, 0, 0.25, 1) forwards;
        }

        @keyframes csb-logo-in {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        .csb-subtitle {
          opacity: 0;
          animation: csb-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 1.2s forwards;
        }

        .csb-notify {
          opacity: 0;
          animation: csb-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 2s forwards;
        }

        @keyframes csb-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
