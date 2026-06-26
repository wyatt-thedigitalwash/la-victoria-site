import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reservations at La Victoria will open closer to our grand opening. Follow along as we prepare to welcome you.",
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center max-w-[600px]">
          <p
            className="font-mono text-[11px] tracking-[4px] uppercase mb-5"
            style={{ color: "#F4D47C" }}
          >
            Reservations
          </p>
          <h1
            className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3] mb-6"
            style={{ color: "#FCE9C7" }}
          >
            We&apos;ll Save You a Seat
          </h1>
          <p
            className="font-body text-[16px] font-normal leading-[1.8]"
            style={{ color: "rgba(252, 233, 199, 0.7)" }}
          >
            Reservations will open closer to our grand opening. Follow along as we prepare to welcome you to La Victoria.
          </p>
        </div>
      </section>
    </main>
  );
}
