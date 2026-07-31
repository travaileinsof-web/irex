import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative z-10">
        <p className="font-display text-[120px] font-bold leading-none text-gradient-gold md:text-[180px]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ivory md:text-3xl">
          Page introuvable — Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
          <br />
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil — Back home
        </Link>
      </div>
    </div>
  );
}
