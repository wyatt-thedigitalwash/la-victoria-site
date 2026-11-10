"use client";

import { useEffect, useRef } from "react";
import Hours from "@/components/Hours";
import BrandBorder from "@/components/BrandBorder";
import { ReserveButton } from "@/components/BrandButton";
import HeroBackground from "@/components/HeroBackground";
import HeroLogo from "@/components/HeroLogo";
import Triptych from "@/components/Triptych";
import Philosophy from "@/components/Philosophy";
import PhotoWall from "@/components/PhotoWall";
import MenuHighlights from "@/components/MenuHighlights";
import HomeReservation from "@/components/HomeReservation";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  /* Lock hero height on mount so mobile browser chrome changes don't cause reflow.
     The 16px keeps the whole border above the fold. */
  useEffect(() => {
    if (heroRef.current) heroRef.current.style.minHeight = `${window.innerHeight - 16}px`;
  }, []);

  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      {/* ── Hero ── */}
      <section ref={heroRef} data-nav-hero className="csb-hero relative flex items-center justify-center overflow-hidden" style={{ minHeight: "calc(100dvh - 16px)", paddingTop: "calc(var(--banner-height, 0px) + 56px)" }}>
        <HeroBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="sr-only">La Victoria</h1>
          <HeroLogo />

          {/* Hours + reservations */}
          <div className="csb-notify mt-10 flex flex-col items-center">
            <Hours variant="hero" />

            <ReserveButton className="mt-10" />
          </div>
        </div>
      </section>

      <BrandBorder />

      {/* ── Triptych ── */}
      <Triptych />

      {/* ── Philosophy ── */}
      <Philosophy bare />

      {/* ── Photo wall ── */}
      <PhotoWall />

      {/* ── Menu highlights ── */}
      <MenuHighlights />

      {/* ── Reservation ── */}
      <HomeReservation />

      {/* ── Footer ── */}
      <SiteFooter />

    </main>
  );
}
