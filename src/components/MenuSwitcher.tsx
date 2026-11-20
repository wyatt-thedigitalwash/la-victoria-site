"use client";

import { useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);

/**
 * Switches between the dinner, drinks and café menus. The open tab lives in
 * the URL hash (/menus#drinks), so each menu can be linked and Back works.
 * Every panel is in the HTML; the closed ones are only hidden.
 */
export default function MenuSwitcher({ tabs }: { tabs: Tab[] }) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  // Course links such as #botanas aren't tabs; they belong to the first menu.
  const active = tabs.find((t) => t.id === hash)?.id ?? tabs[0].id;

  const open = (id: string) => {
    window.location.assign(`#${id}`);
  };

  // Arrow keys move between tabs, as screen reader users expect.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    open(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <>
      <div className="px-6 pt-12 md:pt-16">
        {/* A segmented control in the site's outlined-button style: the open
            menu is filled gold, the others are outlined and tint on hover. */}
        <div
          role="tablist"
          aria-label="Menus"
          className="mx-auto grid w-full max-w-[600px] grid-cols-3 border border-[#F4D47C]"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => open(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`py-4 md:py-5 font-display text-[20px] md:text-[28px] tracking-[1.5px] uppercase leading-none transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4D47C] ${
                  i > 0 ? "border-l border-[#F4D47C]" : ""
                } ${
                  selected
                    ? "bg-[#F4D47C] text-[#221A0E] cursor-default"
                    : "text-[#FCE9C7] cursor-pointer hover:bg-[#F4D47C]/15 hover:text-[#F4D47C]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
