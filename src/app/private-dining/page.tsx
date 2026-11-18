import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PrivateDiningForm from "@/components/PrivateDiningForm";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";

const DESCRIPTION =
  "Private dining at La Victoria in downtown Tampa. A semi-private dining room for up to 36 and large party tables. For parties larger than 12, send an inquiry.";

export const metadata: Metadata = {
  title: "Private Dining",
  description: DESCRIPTION,
  alternates: { canonical: "/private-dining" },
  openGraph: {
    title: "Private Dining | La Victoria — Tampa",
    description: DESCRIPTION,
    url: "/private-dining",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://lavictoriatampa.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Private Dining",
      item: "https://lavictoriatampa.com/private-dining",
    },
  ],
};

export default function PrivateDiningPage() {
  return (
    <main id="main-content" style={{ background: "#221A0E" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero title="Celebrate With Us" />

      <section
        id="inquire"
        data-bg="dark"
        className="px-6 pt-16 pb-24 md:pt-24 md:pb-32"
        style={{ scrollMarginTop: "80px" }}
      >
        <div className="mx-auto max-w-[880px]">
          <ScrollReveal className="triptych-heading text-center">
            <p
              className="triptych-line font-body text-[16px] leading-[1.8] mx-auto max-w-[600px]"
              style={{ color: "rgba(252, 233, 199, 0.7)" }}
            >
              For reservations larger than 12, please fill out the form below
              and our private dining manager will be in touch.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <PrivateDiningForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
