import type { Metadata } from "next";

/**
 * Everything under /preview is a private client walkthrough. It is password
 * gated in middleware and must never be indexed, so the robots directives are
 * declared once here and inherited by every page below.
 */
export const metadata: Metadata = {
  title: {
    default: "Private Preview | La Victoria",
    template: "%s | La Victoria Preview",
  },
  description: "Private design preview for La Victoria. Not for public distribution.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: {},
  openGraph: undefined,
  twitter: undefined,
};

export default function PreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
