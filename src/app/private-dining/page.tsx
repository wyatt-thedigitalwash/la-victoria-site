import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Private Dining",
  description:
    "From intimate dinners to special occasions, La Victoria is creating a space worth gathering in. Private dining details coming soon.",
  alternates: { canonical: "/private-dining" },
};

export default function PrivateDiningPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <PageHero title="Celebrate With Us" tall border={false}>
        <p className="font-body text-[16px] font-normal leading-[1.8] max-w-[560px]" style={{ color: "rgba(252, 233, 199, 0.85)" }}>
          From intimate dinners to special occasions, we&apos;re creating a space worth gathering in. Private dining details are coming soon.
        </p>
      </PageHero>
    </main>
  );
}
