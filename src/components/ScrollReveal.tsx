"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("scroll-reveal-visible");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      // threshold 0 so tall content reveals as soon as any edge enters the
      // viewport; 0.15 could never be met on elements taller than the
      // viewport, leaving them stuck at opacity 0 on small screens.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);

    // Safety net: reveal after a short delay if the observer never fires.
    const fallback = setTimeout(reveal, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
