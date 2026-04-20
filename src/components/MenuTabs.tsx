"use client";

import { useState, useEffect, useCallback } from "react";

const TABS = [
  { label: "Kitchen", id: "kitchen" },
  { label: "Crudo", id: "crudo" },
  { label: "Cantina", id: "cantina" },
] as const;

const NAV_HEIGHT = 60;

export default function MenuTabs() {
  const [active, setActive] = useState("kitchen");

  useEffect(() => {
    const onScroll = () => {
      for (let i = TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TABS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= NAV_HEIGHT + 80) {
            setActive(TABS[i].id);
            return;
          }
        }
      }
      setActive(TABS[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 56;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
      else if (e.key === "ArrowLeft") nextIndex = (index - 1 + TABS.length) % TABS.length;
      else if (e.key === "Home") nextIndex = 0;
      else if (e.key === "End") nextIndex = TABS.length - 1;

      if (nextIndex !== null) {
        e.preventDefault();
        const nextId = TABS[nextIndex].id;
        handleClick(nextId);
        const btn = document.getElementById(`tab-${nextId}`);
        btn?.focus();
      }
    },
    [handleClick]
  );

  return (
    <div
      role="tablist"
      aria-label="Menu sections"
      className="sticky z-30 bg-deep border-b border-brass/10 flex justify-center"
      style={{ top: `${NAV_HEIGHT}px` }}
    >
      {TABS.map((tab, i) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={tab.id}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => handleClick(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`font-mono text-[12px] tracking-[2.5px] uppercase px-5 md:px-8 py-4 cursor-pointer transition-colors duration-300 border-b-2 ${
            active === tab.id
              ? "text-cream border-terracotta"
              : "text-sand border-transparent hover:text-cream"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
