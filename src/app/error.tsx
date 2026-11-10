'use client';

import BrandButton, { BUTTON_CLASS, ButtonFace } from "@/components/BrandButton";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-deep">
      <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-brass mb-4">
        Error
      </p>
      <h1 className="font-body font-light italic text-cream text-[clamp(32px,5vw,48px)] leading-[1.2] mb-4">
        Something went wrong
      </h1>
      <p className="font-body text-[15px] text-sand mb-10">
        An unexpected error occurred.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className={BUTTON_CLASS}>
          <ButtonFace>Try Again</ButtonFace>
        </button>
        <BrandButton href="/">Go Home</BrandButton>
      </div>
    </main>
  );
}
