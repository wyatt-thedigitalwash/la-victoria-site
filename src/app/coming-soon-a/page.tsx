"use client";

import { useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const PANELS = [
  {
    title: "Kitchen",
    description:
      "A space where Mexican culinary tradition is honored through refined technique and contemporary execution. It embodies craftsmanship, depth of flavor, and the transformation of heritage recipes into elevated dining experiences. Kitchen reflects the discipline, warmth, and artistry behind every plate.",
    image: "/assets/kitchen.jpg",
    alt: "Wood-fired kitchen with open flames and plated dishes at La Victoria",
  },
  {
    title: "Crudo",
    description:
      "Captures the essence of purity and immediacy. Rooted in coastal Mexican traditions, Crudo celebrates fresh ingredients presented with restraint and precision. It conveys bold simplicity, vibrant textures, and the raw elegance of flavors served at their peak.",
    image: "/assets/crudo.jpg",
    alt: "Fresh crudo preparations with citrus and microgreens at the raw bar",
  },
  {
    title: "Cantina",
    description:
      "Evokes the spirit of gathering. Inspired by the timeless Mexican cantina, it represents conviviality, storytelling, and ritual. Cantina reflects curated spirits, artisanal cocktails, and the celebratory energy that turns a meal into an experience, where heritage meets modern refinement.",
    image: "/assets/cantina.jpg",
    alt: "Mezcal cocktails and agave spirits at the green marble cantina bar",
  },
] as const;

export default function ComingSoonA() {
  /* Hide the global Navigation on this route */
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    return () => {
      if (nav) nav.style.display = "";
    };
  }, []);

  return (
    <main
      className="coming-soon-page"
      style={{ background: "#1A1508" }}
    >
      {/* ── Hero ── */}
      <section className="cs-hero relative flex min-h-screen items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-[#1A1508]/65" />
        {/* Warm atmospheric glows */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo */}
          <Image
            src="/assets/La-Victoria-09.webp"
            alt="La Victoria"
            width={280}
            height={280}
            priority
            className="cs-logo w-[100px] md:w-[140px] h-auto"
          />

          {/* Subtitle */}
          <p className="cs-subtitle font-mono text-[11px] md:text-[12px] tracking-[3px] uppercase mt-6"
             style={{ color: "#F4D47C" }}>
            Kitchen&ensp;&middot;&ensp;Crudo&ensp;&middot;&ensp;Cantina
          </p>

          {/* Coming soon line */}
          <p className="cs-date font-body text-[18px] md:text-[20px] italic font-light mt-4"
             style={{ color: "rgba(252, 233, 199, 0.7)" }}>
            Coming Summer 2026
          </p>

          {/* Email capture */}
          <form
            className="cs-form flex flex-col sm:flex-row items-center gap-3 mt-10 w-full max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 w-full sm:w-auto px-4 py-3 text-[14px] font-body rounded-none outline-none placeholder:opacity-50"
              style={{
                background: "#221C10",
                border: "1px solid rgba(124, 101, 51, 0.3)",
                color: "#FCE9C7",
              }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-80"
              style={{
                background: "#4D1807",
                color: "#FCE9C7",
              }}
            >
              Notify Me
            </button>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="cs-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-[#F4D47C]/60 to-transparent scroll-pulse" />
        </div>
      </section>

      {/* ── Triptych ── */}
      <section
        className="px-6"
        style={{
          background: "#221C10",
          paddingTop: "100px",
          paddingBottom: "120px",
        }}
      >
        <p
          className="font-mono text-[11px] tracking-[3px] uppercase text-center mb-16"
          style={{ color: "#F4D47C" }}
        >
          Three Experiences, One Destination
        </p>

        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {PANELS.map((panel, i) => (
            <ScrollReveal key={panel.title} delay={i * 150}>
              <div
                className="relative overflow-hidden flex flex-col justify-end"
                style={{
                  height: "clamp(450px, 50vh, 70vh)",
                  minHeight: "450px",
                }}
              >
                {/* Panel image */}
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover object-center"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1508] via-[#1A1508]/70 to-transparent" />

                {/* Panel content */}
                <div className="relative z-10 p-6 pb-8">
                  <h3
                    className="font-mono text-[22px] md:text-[24px] font-bold uppercase tracking-[2px]"
                    style={{ color: "#F4D47C" }}
                  >
                    {panel.title}
                  </h3>
                  <div
                    className="mt-3 mb-4"
                    style={{
                      height: "1px",
                      background: "rgba(244, 212, 124, 0.3)",
                    }}
                  />
                  <p
                    className="font-body text-[14px] md:text-[15px] italic font-light leading-[1.7]"
                    style={{ color: "#FCE9C7" }}
                  >
                    {panel.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="flex flex-col items-center text-center px-6"
        style={{
          background: "#1A1508",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        {/* Icon */}
        <Image
          src="/assets/La-Victoria-icon-beige.webp"
          alt="La Victoria icon"
          loading="lazy"
          width={40}
          height={40}
          className="mb-6"
        />

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ color: "#F4D47C" }}
            aria-label="Follow La Victoria on Instagram"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[2px] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{ color: "#F4D47C" }}
            aria-label="Follow La Victoria on Facebook"
          >
            Facebook
          </a>
        </div>

        {/* Address */}
        <p
          className="font-body text-[13px] font-normal mt-4"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          105 W Tyler Street, Tampa, FL 33602
        </p>

        {/* Email */}
        <a
          href="mailto:info@lavictoriatampa.com"
          className="font-body text-[13px] font-normal mt-1 transition-opacity duration-300 hover:opacity-80"
          style={{ color: "rgba(252, 233, 199, 0.6)" }}
        >
          info@lavictoriatampa.com
        </a>

        {/* Copyright */}
        <p
          className="font-body text-[13px] font-normal mt-6"
          style={{ color: "rgba(252, 233, 199, 0.4)" }}
        >
          &copy; 2026 La Victoria
        </p>
      </footer>

      <style jsx>{`
        /* ── Hero animations ── */
        .cs-logo {
          opacity: 0;
          animation: cs-blur-in 2s cubic-bezier(0, 0, 0.25, 1) forwards;
        }

        @keyframes cs-blur-in {
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

        .cs-subtitle {
          opacity: 0;
          animation: cs-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 1.2s forwards;
        }

        .cs-date {
          opacity: 0;
          animation: cs-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 1.6s forwards;
        }

        .cs-form {
          opacity: 0;
          animation: cs-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 2s forwards;
        }

        .cs-scroll {
          opacity: 0;
          animation: cs-fade-up 1s cubic-bezier(0, 0, 0.25, 1) 2.5s forwards;
        }

        @keyframes cs-fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Triptych panel heights ── */
        @media (min-width: 768px) {
          .coming-soon-page .grid > div > div {
            height: 70vh !important;
          }
        }
      `}</style>
    </main>
  );
}
