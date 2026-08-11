"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Only allow same-site redirects back into the preview.
  const requested = searchParams.get("next");
  const destination =
    requested && requested.startsWith("/preview") && !requested.startsWith("//")
      ? requested
      : "/preview";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/preview-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.replace(destination);
        router.refresh();
        return;
      }

      const data = await response.json().catch(() => ({}));
      setError(data?.error ?? "Something went wrong. Try again.");
      setSubmitting(false);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[380px]">
      <label
        htmlFor="preview-password"
        className="block font-mono text-[11px] tracking-[4px] uppercase mb-4"
        style={{ color: "#F4D47C" }}
      >
        Password
      </label>

      <input
        id="preview-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "preview-error" : undefined}
        className="w-full bg-transparent border text-cream font-body text-[15px] px-5 py-4 outline-none transition-colors duration-300"
        style={{
          borderColor: error ? "rgba(184,90,74,0.7)" : "rgba(244,212,124,0.25)",
          color: "#FCE9C7",
        }}
      />

      {error && (
        <p
          id="preview-error"
          role="alert"
          className="font-body text-[13px] mt-3"
          style={{ color: "#D98A7A" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || password.length === 0}
        className="w-full mt-6 font-body text-[11px] font-medium tracking-[3px] uppercase text-cream border px-8 py-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ borderColor: "rgba(244,212,124,0.4)" }}
      >
        {submitting ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

export default function PreviewLoginPage() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "#221A0E" }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,_rgba(77,24,7,0.18)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_30%,_rgba(124,101,51,0.12)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_80%,_rgba(244,212,124,0.08)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          src="/assets/La-Victoria-icon-beige.webp"
          alt="La Victoria"
          width={72}
          height={72}
          priority
          className="w-[72px] h-auto mb-10"
        />

        <p
          className="font-mono text-[11px] tracking-[4px] uppercase mb-5"
          style={{ color: "#F4D47C" }}
        >
          Private Preview
        </p>

        <h1
          className="font-body text-[clamp(28px,4vw,40px)] font-light italic leading-[1.3] mb-5"
          style={{ color: "#FCE9C7" }}
        >
          This page isn&apos;t public yet
        </h1>

        <p
          className="font-body text-[15px] font-normal leading-[1.8] max-w-[420px] mb-10"
          style={{ color: "rgba(252, 233, 199, 0.7)" }}
        >
          Enter the password you were given to view the in-progress design for
          La Victoria.
        </p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
