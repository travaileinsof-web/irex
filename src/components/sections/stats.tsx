"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { Reveal } from "@/components/site/reveal";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].stats;

  return (
    <section ref={ref} className="relative overflow-hidden bg-obsidian py-32">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      </motion.div>

      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Decorative top hexagons */}
      <div className="absolute left-10 top-10 hidden lg:block">
        <div className="hexagon h-16 w-16 border border-gold/20 bg-gold/5" />
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="hexagon h-24 w-24 border border-copper/20 bg-copper/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="badge-premium mb-6 mx-auto">{c.tag}</span>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl">
              {c.title}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {c.items.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative flex flex-col items-center justify-center bg-coal p-10 text-center transition-colors duration-500 hover:bg-obsidian">
                <div className="font-display text-5xl font-bold text-gradient-gold md:text-6xl lg:text-7xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
                {/* Hover line */}
                <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 group-hover:w-3/4" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
