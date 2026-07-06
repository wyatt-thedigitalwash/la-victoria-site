import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | La Victoria",
  description:
    "Apply to join the La Victoria team. Now hiring servers, bartenders, line cooks, prep cooks, and more.",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
