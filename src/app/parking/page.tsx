import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Parking",
  description:
    "Parking information for La Victoria in downtown Tampa. Details on nearby lots and valet will be available before opening day.",
  alternates: { canonical: "/parking" },
};

export default function ParkingPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <PageHero title="Planning Your Visit" tall border={false}>
        <p className="font-body text-[16px] font-normal leading-[1.8] max-w-[560px]" style={{ color: "rgba(252, 233, 199, 0.85)" }}>
          We&apos;re finalizing the details to make your arrival as smooth as possible. Parking information will be available before opening day.
        </p>
      </PageHero>
    </main>
  );
}
