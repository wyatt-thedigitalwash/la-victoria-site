"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NowHiringBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // The private /preview walkthrough shows the full-site design, not the
  // public coming-soon chrome.
  const hidden =
    !visible || pathname === "/careers" || pathname.startsWith("/preview");

  // Set CSS variable for banner height so nav and hero can offset
  useEffect(() => {
    if (hidden) {
      document.documentElement.style.setProperty("--banner-height", "0px");
      return;
    }

    const updateHeight = () => {
      if (bannerRef.current) {
        const h = bannerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--banner-height", `${h}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 w-full z-[60] transition-colors duration-300 hover:bg-[#5e1e0a]"
      style={{ background: "#4D1807" }}
    >
      <Link href="/careers" className="block px-10 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <p
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[1.5px]"
              style={{ color: "#FCE9C7" }}
            >
              NOW HIRING! Think you have what it takes to help bring this vision to life?
            </p>
            <p
              className="font-body text-[9px] md:text-[10px] font-normal"
              style={{ color: "rgba(252, 233, 199, 0.7)" }}
            >
              Applications Open: Monday, June 29th @ 10am | Applications Close: Monday, August 24th @ 5pm
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 font-body text-[16px] font-light transition-opacity duration-300 hover:opacity-70 cursor-pointer"
        style={{ color: "rgba(252, 233, 199, 0.6)", background: "none", border: "none" }}
        aria-label="Close hiring banner"
      >
        &times;
      </button>
    </div>
  );
}
