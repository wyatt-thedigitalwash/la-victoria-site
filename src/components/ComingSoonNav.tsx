"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ReserveButton } from "@/components/BrandButton";
import HeroBackground from "@/components/HeroBackground";
import { NAV_LINKS, RESERVE } from "@/lib/restaurant";

const NAV_HEIGHT = 64;

const PAGE_LINKS = NAV_LINKS.filter((link) => link.href !== RESERVE.href);

export default function ComingSoonNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // The private /preview walkthrough renders the full-site Navigation instead.
  const isPreview = pathname.startsWith("/preview");
  const [scrollState, setScrollState] = useState({ path: pathname, scrolled: false });
  // A page change snaps straight to its new state instead of fading into it.
  const settled = scrollState.path === pathname;
  const scrolled = settled && scrollState.scrolled;
  // The menu belongs to the page it was opened on, so a route change closes it in
  // the same commit that shows the new page. Closing on tap would flash the old page.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const mobileOpen = menuPath === pathname;
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Intro animations are for arriving at the site. After the first page change
  // they're switched off, so moving between pages is one clean swap.
  const firstPath = useRef(pathname);
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.dataset.navigated = "";
  }, [pathname]);

  // Show a background once the page has scrolled past its hero. Re-checked on
  // every route change, because arriving at the top of a page fires no scroll event.
  useEffect(() => {
    const getThreshold = () => {
      const hero = document.querySelector("[data-nav-hero]");
      if (!hero) return 40;
      return hero.getBoundingClientRect().bottom + window.scrollY - NAV_HEIGHT;
    };

    const onScroll = () => setScrollState({ path: pathname, scrolled: window.scrollY > getThreshold() });
    onScroll();
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuPath(null);
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

  // Keep the page still behind the open menu, and close it if the screen outgrows it
  useEffect(() => {
    if (!mobileOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setMenuPath(null);
    document.documentElement.style.overflow = "hidden";
    desktop.addEventListener("change", onChange);
    return () => {
      document.documentElement.style.overflow = "";
      desktop.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const hideLogo = isHome && !scrolled && !mobileOpen;
  const solid = scrolled && !mobileOpen;
  const followLink = useCallback(
    (href: string) => (href === pathname ? setMenuPath(null) : setPendingHref(href)),
    [pathname]
  );

  // Declared after every hook so hook order stays stable across routes.
  if (isPreview) return null;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="cs-nav fixed left-0 w-full z-50"
        style={{
          top: "var(--banner-height, 0px)",
          backgroundColor: solid ? "rgba(34, 26, 14, 0.96)" : "transparent",
          borderBottom: solid ? "1px solid rgba(244, 212, 124, 0.15)" : "1px solid transparent",
          transition: settled ? "background-color 300ms ease-out, border-color 300ms ease-out" : "none",
        }}
      >
        <div className="flex items-center justify-between h-16 px-6 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="La Victoria — Home"
            style={{
              transition: settled ? "opacity 300ms ease-out" : "none",
              opacity: hideLogo ? 0 : 1,
              pointerEvents: hideLogo ? "none" : "auto",
            }}
          >
            <Image
              src="/assets/la-victoria-horizontal-cream.svg"
              alt="La Victoria"
              width={99}
              height={32}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            <ul className="flex items-center gap-6 xl:gap-8">
              {PAGE_LINKS.map((link) => {
                const current = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className="group relative font-body text-[11px] font-medium tracking-[1px] uppercase whitespace-nowrap transition-colors duration-300"
                      style={{ color: current ? "#F4D47C" : "#FCE9C7" }}
                    >
                      {link.label}
                      <span
                        className={`absolute left-0 -bottom-1.5 h-px w-full origin-left transition-transform duration-300 group-hover:scale-x-100 ${
                          current ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ background: "#F4D47C" }}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ReserveButton small />
          </div>

          {/* Mobile hamburger */}

          <button
            ref={hamburgerRef}
            onClick={() => {
              setPendingHref(null);
              setMenuPath(mobileOpen ? null : pathname);
            }}
            className="flex lg:hidden flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2.5 cursor-pointer"
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

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        id="cs-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        inert={!mobileOpen}
        className={`fixed inset-0 z-40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "#221A0E", WebkitTapHighlightColor: "transparent" }}
      >
        <HeroBackground lazy />
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex min-h-full flex-col items-center justify-center px-6 pt-20 pb-8 text-center">
            <ul className="flex flex-col items-center gap-1">
              {[{ label: "Home", href: "/" }, ...PAGE_LINKS].map((link) => {
                // The tapped link lights up right away, while the new page loads
                const active = (pendingHref ?? pathname) === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => followLink(link.href)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="inline-block py-2 font-body text-[22px] font-medium leading-[1.3]"
                      style={{ color: active ? "#F4D47C" : "#FCE9C7" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ReserveButton className="mt-8" onClick={() => followLink(RESERVE.href)} />

            <div
              className="mt-8 flex flex-col gap-1 font-body text-[13px]"
              style={{ color: "rgba(252, 233, 199, 0.85)" }}
            >
              <p>105 W Tyler Street, Tampa, FL 33602</p>
              <a
                href="https://www.instagram.com/lavictoriatampa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow La Victoria on Instagram (opens in new tab)"
              >
                @lavictoriatampa
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
