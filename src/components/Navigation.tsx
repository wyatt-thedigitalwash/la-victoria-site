"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Menus", href: "/menus" },
  { label: "The Space", href: "/the-space" },
  { label: "Private Events", href: "/private-events" },
  { label: "Visit", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage, scroll to hash if present (handles /#space, /#story arrivals)
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      const target = document.querySelector(hash);
      target?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMobileOpen(false);

      // If already on homepage and clicking a homepage hash link, smooth scroll
      if (pathname === "/" && href.startsWith("/#")) {
        const hash = href.slice(1); // "/#space" -> "#space"
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [pathname]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color] duration-[600ms] ${
          scrolled
            ? "bg-deep/85 border-b border-brass/10"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background-color 600ms cubic-bezier(0.25,0.1,0.25,1), border-color 600ms cubic-bezier(0.25,0.1,0.25,1), backdrop-filter 600ms cubic-bezier(0.25,0.1,0.25,1), -webkit-backdrop-filter 600ms cubic-bezier(0.25,0.1,0.25,1)",
        }}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-[1400px] md:px-10">
          {/* Wordmark */}
          <Link
            href="/"
            className={`transition-opacity duration-[600ms] ${
              isHome && !scrolled ? "opacity-0" : "opacity-100"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
          >
            <Image
              src="/assets/La-Victoria-09.png"
              alt="La Victoria"
              width={140}
              height={32}
              className="h-[28px] w-auto"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="group relative font-body text-[11px] font-medium tracking-[2.5px] uppercase text-sand transition-colors duration-300 hover:text-cream"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="relative font-body text-[11px] font-medium tracking-[2.5px] uppercase text-cream border border-brass/40 px-5 py-2.5 transition-all duration-300 hover:bg-terracotta hover:border-terracotta"
              >
                Reserve
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-px bg-cream transition-transform duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-cream transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-deep/98 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-body text-[13px] font-medium tracking-[3px] uppercase text-sand transition-colors duration-300 hover:text-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="#"
          onClick={() => setMobileOpen(false)}
          className="mt-12 font-body text-[13px] font-medium tracking-[3px] uppercase text-cream border border-brass/40 px-8 py-3.5 transition-all duration-300 hover:bg-terracotta hover:border-terracotta"
        >
          Reserve a Table
        </a>
      </div>
    </>
  );
}