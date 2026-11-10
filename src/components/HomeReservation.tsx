import ReservationForm from "@/components/ReservationForm";
import ScrollReveal from "@/components/ScrollReveal";
import { OPENTABLE_URL } from "@/lib/restaurant";

export default function HomeReservation() {
  return (
    <section id="reserve" className="px-6 pt-16 pb-24" style={{ scrollMarginTop: "80px" }}>
      <div className="mx-auto max-w-[880px] text-center">
        <ScrollReveal className="triptych-heading">
          <h2 className="flex flex-col items-center font-normal">
            <span className="triptych-line font-display text-[clamp(36px,11.8vw,46px)] md:text-[64px] leading-[1.2] text-cream">
              Your Table Awaits
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-10">
          <ReservationForm />
        </div>

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
  );
}
