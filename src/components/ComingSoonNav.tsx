"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Menus", href: "/menus" },
  { label: "Photos", href: "/photos" },
  { label: "Parking", href: "/parking" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Careers", href: "/careers" },
  { label: "Reservations", href: "/reservations" },
];

export default function ComingSoonNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCareers = pathname === "/careers";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Show background after scrolling past the hero
  useEffect(() => {
    const getThreshold = () => {
      if (isHome) return window.innerHeight * 0.85;
      // Find the first section/hero and use its bottom edge
      const hero = document.querySelector("section");
      if (hero) return hero.offsetTop + hero.offsetHeight - 60;
      return 100;
    };

    const onScroll = () => setScrolled(window.scrollY > getThreshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Focus trap in mobile menu
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const menu = mobileMenuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    menu.addEventListener("keydown", onKeyDown);
    return () => menu.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const hideLogo = (isHome || isCareers) && !scrolled;
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`cs-nav fixed left-0 w-full z-50${scrolled ? " backdrop-blur-md" : ""}`}
        style={{
          top: "var(--banner-height, 0px)",
          backgroundColor: scrolled ? "rgba(26, 21, 8, 0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(244, 212, 124, 0.1)" : "1px solid transparent",
          transition: "background-color 600ms cubic-bezier(0.25,0.1,0.25,1), border-color 600ms cubic-bezier(0.25,0.1,0.25,1), top 300ms ease",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="La Victoria — Home"
            className="transition-opacity duration-500"
            style={{
              opacity: hideLogo ? 0 : 1,
              pointerEvents: hideLogo ? "none" : "auto",
            }}
          >
            <Image
              src="/assets/La-Victoria-09.webp"
              alt="La Victoria"
              width={100}
              height={24}
              className="h-[24px] w-auto"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative font-body text-[10px] font-medium tracking-[2px] uppercase transition-colors duration-300"
                  style={{ color: "rgba(252, 233, 199, 0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FCE9C7")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(252, 233, 199, 0.7)")}
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "#F4D47C" }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer"
            style={{ background: "none", border: "none" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="cs-mobile-menu"
          >
            <span
              className="block w-6 h-px transition-transform duration-300"
              style={{
                background: "#FCE9C7",
                transform: mobileOpen ? "translateY(3.5px) rotate(45deg)" : "none",
              }}
              aria-hidden="true"
            />
            <span
              className="block w-6 h-px transition-transform duration-300"
              style={{
                background: "#FCE9C7",
                transform: mobileOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
              }}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={mobileMenuRef}
        id="cs-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(16, 14, 4, 0.98)", backdropFilter: "blur(4px)" }}
      >
        <ul className="flex flex-col items-center gap-8">
          <li>
            <Link
              href="/"
              onClick={closeMobile}
              className="font-body text-[13px] font-medium tracking-[3px] uppercase transition-colors duration-300"
              style={{ color: "#C4A882" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FCE9C7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C4A882")}
            >
              Home
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={closeMobile}
                className="font-body text-[13px] font-medium tracking-[3px] uppercase transition-colors duration-300"
                style={{ color: "#C4A882" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FCE9C7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#C4A882")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
