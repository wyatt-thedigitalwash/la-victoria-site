import type { Metadata } from "next";
import PhotoField from "@/components/PhotoField";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "See the food, cocktails, and dining room at La Victoria, upscale Mexican dining in downtown Tampa.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  return (
    <main id="main-content" className="overflow-x-clip pt-[96px]" style={{ background: "#221A0E" }}>
      <h1 className="sr-only">Photos of La Victoria</h1>

      {/* Two hand-placed compositions: only the one that fits the screen renders */}
      <PhotoField layout="desktop" className="hidden md:block" />
      <PhotoField layout="mobile" className="md:hidden" />

      <p className="text-center font-body text-[14px] px-6 pt-14 pb-20" style={{ color: "rgba(252, 233, 199, 0.7)" }}>
        Follow along on{" "}
        <a
          href="https://www.instagram.com/lavictoriatampa/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-opacity duration-300 hover:opacity-80"
          style={{ color: "#F4D47C" }}
        >
          Instagram<span className="sr-only"> (opens in new tab)</span>
        </a>
      </p>

      <SiteFooter />
    </main>
  );
}
