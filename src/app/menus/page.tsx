import type { Metadata } from "next";
import SimpleFooter from "@/components/SimpleFooter";
import { DINNER_MENU, RAW_ADVISORY, type MenuItem } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menus",
  description:
    "The dinner menu at La Victoria in downtown Tampa: botanas, crudo, tacos clásicos, platos fuertes, and postres.",
  alternates: { canonical: "/menus" },
};

const CREAM = "#FCE9C7";
const GOLD = "#F4D47C";
const MUTED = "rgba(252, 233, 199, 0.6)";

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="py-4" style={{ borderBottom: "1px solid rgba(124, 101, 51, 0.12)" }}>
      <div className="flex items-baseline gap-3">
        <span className="font-body text-[17px] font-normal" style={{ color: CREAM }}>
          {item.name}
          {item.raw && <span style={{ color: GOLD }}>*</span>}
        </span>
        {item.price && (
          <>
            <span
              className="flex-1 min-w-[20px] -translate-y-1 border-b border-dotted"
              style={{ borderColor: "rgba(244, 212, 124, 0.2)" }}
              aria-hidden="true"
            />
            <span className="font-body text-[16px] font-medium whitespace-nowrap" style={{ color: GOLD }}>
              {item.price}
            </span>
          </>
        )}
      </div>

      {item.options && (
        <p className="font-mono text-[11px] tracking-[1.5px] uppercase mt-1.5" style={{ color: GOLD }}>
          {item.options.map((o, i) => (
            <span key={o.name}>
              {i > 0 && <span aria-hidden="true">&ensp;&middot;&ensp;</span>}
              {o.name} {o.price}
            </span>
          ))}
        </p>
      )}

      {item.desc && (
        <p className="font-body text-[14px] font-normal leading-[1.5] mt-1" style={{ color: MUTED }}>
          {item.desc}
        </p>
      )}

      {item.addOns?.map((a) => (
        <p key={a.name} className="font-body text-[13px] italic mt-1" style={{ color: MUTED }}>
          {a.name} <span style={{ color: GOLD }}>{a.price}</span>
        </p>
      ))}
    </li>
  );
}

export default function MenusPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden px-6"
        style={{ minHeight: "40vh", paddingTop: "calc(var(--banner-height, 0px) + 56px)" }}
      >
        {/* Glows fade out at the bottom so the hero melts into the menu */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center">
          <p className="font-mono text-[11px] tracking-[4px] uppercase mb-5" style={{ color: GOLD }}>
            Menus
          </p>
          <h1
            className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3]"
            style={{ color: CREAM }}
          >
            Dinner
          </h1>
        </div>
      </section>

      {/* ── Menu ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[720px]">
          {DINNER_MENU.map((section) => (
            <div key={section.title} className="mt-16 first:mt-4">
              <h2
                className="font-mono text-[13px] tracking-[4px] uppercase text-center"
                style={{ color: GOLD }}
              >
                {section.title}
                {section.price && <span style={{ color: MUTED }}>&ensp;{section.price}</span>}
              </h2>
              <div
                className="mx-auto mt-4 mb-2 w-10 h-px"
                style={{ background: "rgba(244, 212, 124, 0.3)" }}
                aria-hidden="true"
              />
              <ul>
                {section.items.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </ul>
            </div>
          ))}

          <p className="font-body text-[12px] italic leading-[1.6] text-center mt-12" style={{ color: MUTED }}>
            <span style={{ color: GOLD }}>*</span> {RAW_ADVISORY}
          </p>
        </div>
      </section>

      <SimpleFooter />
    </main>
  );
}
