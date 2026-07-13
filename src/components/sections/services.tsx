"use client";

import { motion } from "framer-motion";
import {
  Compass,
  HardHat,
  Pickaxe,
  Leaf,
  Shield,
  Truck,
  GraduationCap,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

const iconMap: Record<string, typeof Compass> = {
  compass: Compass,
  "hard-hat": HardHat,
  pickaxe: Pickaxe,
  leaf: Leaf,
  shield: Shield,
  truck: Truck,
  graduation: GraduationCap,
  clipboard: ClipboardCheck,
};

export function Services() {
  const { lang, setSection } = useSiteStore();
  const c = content[lang].services;

  return (
    <section id="services" className="relative bg-coal py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
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

        {/* Services grid */}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {c.items.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Compass;
            return (
              <Reveal key={i} delay={(i % 4) * 0.08}>
                <button
                  onClick={() => setSection("contact")}
                  data-cursor="hover"
                  className="group relative flex h-full w-full flex-col items-start gap-6 bg-coal p-8 text-left transition-all duration-500 hover:bg-obsidian"
                >
                  {/* Number */}
                  <div className="flex w-full items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-gold">
                      [ {String(i + 1).padStart(2, "0")} ]
                    </span>
                    <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 text-gold" />
                  </div>

                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-copper/5 transition-all duration-500 group-hover:border-gold/40 group-hover:from-gold/15 group-hover:to-copper/15">
                      <Icon className="h-6 w-6 text-gold transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-ivory transition-colors group-hover:text-gold">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold to-copper transition-all duration-500 group-hover:w-full" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
