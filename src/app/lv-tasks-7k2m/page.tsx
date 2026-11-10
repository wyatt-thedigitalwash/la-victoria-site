import type { Metadata } from "next";
import ListingTasks from "@/components/tasks/ListingTasks";
import { DETAILS } from "@/lib/listing-tasks";

/**
 * The restaurant's listings to-do list at an unlisted address: linked from
 * nowhere, kept out of the sitemap, and noindex, nofollow. Unlisted is not
 * private; nothing confidential goes on it.
 */
export const metadata: Metadata = {
  title: { absolute: "Your to-do list | La Victoria" },
  description: "The directory listings to claim and complete for La Victoria in downtown Tampa.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: {},
  openGraph: undefined,
  twitter: undefined,
};

const CREAM = "#FCE9C7";
const INK = "#100E04";

export default function ListingTasksPage() {
  return (
    <main id="main-content" style={{ background: "#FFFFFF" }}>
      {/* Dark band, like every page's hero, so the fixed header reads. */}
      <section
        data-bg="dark"
        className="relative overflow-hidden px-6 pb-16"
        style={{ background: "#221A0E", paddingTop: "calc(var(--banner-height, 0px) + 128px)" }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_0%,_rgba(77,24,7,0.22)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[720px]">
          <p className="font-mono text-[11px] tracking-[4px] uppercase mb-5" style={{ color: "#F4D47C" }}>
            Listings
          </p>
          <h1
            className="font-body text-[clamp(32px,5vw,48px)] font-light italic leading-[1.3]"
            style={{ color: CREAM }}
          >
            Your to-do list
          </h1>
          <p className="mt-5 font-body text-[16px] font-normal leading-[1.8]" style={{ color: "rgba(252, 233, 199, 0.7)" }}>
            Click the button, make the change, tick the box. The profile picture and cover for each
            platform are in the brand kit under <span style={{ color: CREAM }}>06 Directories</span>, already sized.
          </p>
        </div>
      </section>

      <section data-bg="white" className="px-6 pt-12 pb-24" style={{ background: "#FFFFFF", color: INK }}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="p-6" style={{ border: "1px solid rgba(16, 14, 4, 0.15)", background: "rgba(255, 255, 255, 0.35)" }}>
            <p className="font-body text-[13px] mb-4" style={{ color: "rgba(16, 14, 4, 0.6)" }}>
              Use exactly this everywhere:
            </p>
            <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[max-content_1fr] sm:gap-x-8 sm:gap-y-2">
              {DETAILS.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-mono text-[11px] tracking-[3px] uppercase pt-[3px]" style={{ color: "#7C6533" }}>
                    {k}
                  </dt>
                  <dd className="font-body text-[15px] font-medium" style={{ color: INK }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12">
            <ListingTasks />
          </div>
        </div>
      </section>
    </main>
  );
}
