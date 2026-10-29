import type { Metadata } from "next";
import OpenTableWidget from "@/components/OpenTableWidget";
import { OPENTABLE_RID, OPENTABLE_URL } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at La Victoria in downtown Tampa. Book dinner online through OpenTable.",
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20"
        style={{ paddingTop: "calc(var(--banner-height, 0px) + 96px)" }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full text-center max-w-[600px]">
          <p
            className="font-mono text-[11px] tracking-[4px] uppercase mb-5"
            style={{ color: "#F4D47C" }}
          >
            Reservations
          </p>
          <h1
            className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3] mb-10"
            style={{ color: "#FCE9C7" }}
          >
            Reserve a Table
          </h1>

          {OPENTABLE_RID ? (
            <>
              <OpenTableWidget rid={OPENTABLE_RID} />
              <p className="font-body text-[13px] font-normal mt-8" style={{ color: "rgba(252, 233, 199, 0.6)" }}>
                Trouble booking?{" "}
                <a
                  href={OPENTABLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-opacity duration-300 hover:opacity-80"
                  style={{ color: "#F4D47C" }}
                >
                  Reserve on OpenTable
                </a>
              </p>
            </>
          ) : (
            <a
              href={OPENTABLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reserve a table on OpenTable (opens in new tab)"
              className="group relative inline-block font-mono text-[11px] tracking-[3px] uppercase border border-[rgba(244,212,124,0.4)] px-8 py-3.5 overflow-hidden"
              style={{ color: "#FCE9C7", background: "#4D1807" }}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#5e1e0a] transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              <span className="relative">Reserve on OpenTable</span>
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
