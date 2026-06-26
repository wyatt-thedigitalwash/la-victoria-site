import type { Metadata, Viewport } from "next";
import { Montserrat, Space_Mono } from "next/font/google";
import NowHiringBanner from "@/components/NowHiringBanner";
import ComingSoonNav from "@/components/ComingSoonNav";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lavictoriatampa.com"),
  title: {
    default: "La Victoria | Upscale Mexican Dining in Tampa",
    template: "%s | La Victoria — Tampa",
  },
  description:
    "La Victoria brings upscale Mexican dining to downtown Tampa. Three experiences — Kitchen, Crudo, Cantina — at 105 W Tyler Street. Coming Summer 2026.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "La Victoria",
    title: "La Victoria | Upscale Mexican Dining in Tampa",
    description:
      "Three experiences — Kitchen, Crudo, Cantina — at 105 W Tyler Street in downtown Tampa. Coming Summer 2026.",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Victoria | Upscale Mexican Dining in Tampa",
    description:
      "Three experiences — Kitchen, Crudo, Cantina — at 105 W Tyler Street in downtown Tampa. Coming Summer 2026.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#100E04",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Restaurant",
                name: "La Victoria",
                description:
                  "Upscale Mexican dining in downtown Tampa featuring three experiences: Kitchen, Crudo, and Cantina.",
                url: "https://lavictoriatampa.com",
                telephone: "(813) 555-0100",
                email: "info@lavictoriatampa.com",
                servesCuisine: "Mexican",
                priceRange: "$$$",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "105 W Tyler Street",
                  addressLocality: "Tampa",
                  addressRegion: "FL",
                  postalCode: "33602",
                  addressCountry: "US",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 27.9506,
                  longitude: -82.4572,
                },
                areaServed: {
                  "@type": "City",
                  name: "Tampa",
                },
                image: "https://lavictoriatampa.com/og-image.png",
                sameAs: [
                  "https://www.instagram.com/lavictoriatampa/",
                ],
              }),
            }}
          />
          <NowHiringBanner />
          <ComingSoonNav />
          {children}
        </body>
    </html>
  );
}
