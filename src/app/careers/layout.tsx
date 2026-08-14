import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | La Victoria",
  description:
    "Join the La Victoria team. Now hiring line cooks, prep cooks, baristas, guest services, and more for our new upscale Mexican restaurant in downtown Tampa.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
