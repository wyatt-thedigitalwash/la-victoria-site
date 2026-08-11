import type { Metadata } from "next";

/**
 * The login page is a client component, so its metadata lives here.
 * `absolute` opts out of the root layout's "%s | La Victoria — Tampa"
 * template, which would otherwise double up the brand name.
 */
export const metadata: Metadata = {
  title: { absolute: "Private Preview | La Victoria" },
};

export default function PreviewLoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
