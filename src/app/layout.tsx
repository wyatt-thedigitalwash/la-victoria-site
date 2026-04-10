import type { Metadata } from "next";
import { Montserrat, Space_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
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
  title: "La Victoria",
  description: "Upscale Mexican dining in Tampa — Kitchen, Crudo, Cantina.",
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
          <Navigation />
          {children}
        </body>
    </html>
  );
}
