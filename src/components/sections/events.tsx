"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

const typeColors: Record<string, string> = {
  "Sommet": "bg-gold/20 text-gold",
  "Summit": "bg-gold/20 text-gold",
  "Formation": "bg-emerald-500/20 text-emerald-300",
  "Training": "bg-emerald-500/20 text-emerald-300",
  "Conférence": "bg-rose-500/20 text-rose-300",
  "Conference": "bg-rose-500/20 text-rose-300",
  "Workshop": "bg-cyan-500/20 text-cyan-300",
};

export function Events() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].events;

  return (
    <section id="events" className="relative bg-coal py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <span className="badge-premium mb-6">{c.tag}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
                <RevealWords text={c.title} />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-base text-muted-foreground">{c.subtitle}</p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8">
            {c.items.map((event, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 0 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[8px] md:left-1/2 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:-translate-x-1/2">
                    <span className="absolute h-4 w-4 rounded-full bg-gold/20 animate-ping" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-gold" />
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="group overflow-hidden rounded-2xl border border-border bg-obsidian p-6 card-lift"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${typeColors[event.type] ?? "bg-gold/20 text-gold"}`}>
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-ivory transition-colors group-hover:text-gold">
                        {event.name}
                      </h3>
                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-gold" />
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="link-underline">
                          {lang === "fr" ? "S'inscrire" : "Register"}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for the other half */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
