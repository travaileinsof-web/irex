"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";

export function CtaBanner() {
  const lang = useSiteStore((s) => s.lang);
  const setSection = useSiteStore((s) => s.setSection);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-obsidian via-coal to-obsidian py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      {/* Floating hexagons */}
      <motion.div
        className="absolute left-10 top-10 hexagon h-16 w-16 border border-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 hexagon h-24 w-24 border border-copper/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <span className="badge-premium mb-6 mx-auto">
            {lang === "fr" ? "Démarrons ensemble" : "Let's start together"}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
            {lang === "fr" ? (
              <>
                Transformez vos projets miniers en{" "}
                <span className="text-gradient-gold">succès durables</span>
              </>
            ) : (
              <>
                Turn your mining projects into{" "}
                <span className="text-gradient-gold">sustainable successes</span>
              </>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {lang === "fr"
              ? "Notre équipe d'experts vous accompagne de l'exploration à l'exploitation, avec excellence, sécurité et responsabilité."
              : "Our team of experts supports you from exploration to operations, with excellence, safety and responsibility."}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setSection("contact")}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-7 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light hover:shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)]"
            >
              {content[lang].common.requestQuote}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <a
              href="tel:626683232"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-medium text-gold transition-all hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" />
              626 68 32 32
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
