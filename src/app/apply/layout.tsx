import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | La Victoria",
  description:
    "Apply to join the La Victoria team. Now hiring line cooks, prep cooks, baristas, guest services, and more.",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
