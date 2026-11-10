import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/ReservationForm";
import { OPENTABLE_URL } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at La Victoria in downtown Tampa. Book dinner online through OpenTable.",
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <main
      id="main-content"
      className="flex flex-col"
      style={{ background: "#221A0E", minHeight: "100dvh" }}
    >
      <PageHero title="Reserve a Table" />

      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[880px] text-center">
          <ReservationForm />
          <p className="font-body text-[13px] mt-6" style={{ color: "rgba(252, 233, 199, 0.7)" }}>
            You&apos;ll finish booking on{" "}
            <a
              href={OPENTABLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-opacity duration-300 hover:opacity-80"
              style={{ color: "#F4D47C" }}
            >
              OpenTable<span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
