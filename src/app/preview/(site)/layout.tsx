import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PreviewBadge from "@/components/PreviewBadge";

/**
 * Chrome for the full-site walkthrough: the real Navigation and Footer that the
 * public "coming soon" site doesn't use yet, plus the preview marker.
 */
export default function PreviewSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <PreviewBadge />
    </>
  );
}
