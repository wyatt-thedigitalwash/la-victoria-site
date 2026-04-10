import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-deep">
      <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-4">
        404
      </p>
      <h1 className="font-body font-light italic text-cream text-[clamp(32px,5vw,48px)] leading-[1.2] mb-4">
        Page not found
      </h1>
      <p className="font-body text-[15px] text-sand mb-10">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block font-mono text-[11px] tracking-[2.5px] uppercase text-cream border border-brass/40 px-8 py-3.5 transition-all duration-300 hover:bg-terracotta hover:border-terracotta"
      >
        Go Home
      </Link>
    </main>
  );
}
