"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/15 blur-3xl" />
      <div className="relative z-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/20 ring-1 ring-copper/40">
          <AlertTriangle className="h-8 w-8 text-copper-light" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ivory md:text-3xl">
          Une erreur est survenue — Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Une erreur inattendue s'est produite. Veuillez réessayer.
          <br />
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
        >
          <RotateCcw className="h-4 w-4" />
          Réessayer — Try again
        </button>
      </div>
    </div>
  );
}
