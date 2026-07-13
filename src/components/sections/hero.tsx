"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ArrowDown, Play } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { RevealWords } from "@/components/site/reveal";
import { MagneticButton } from "@/components/site/magnetic-button";

/**
 * Hero — full-screen premium intro with parallax, particle field, animated headline
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const { lang, setSection } = useSiteStore();
  const c = content[lang].hero;

  // Particle field state
  const [particles] = useState(() =>
    Array.from({ length: 24 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }))
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-obsidian"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 165, 71, 0.12), transparent 70%)",
          scale,
        }}
      />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--gold), transparent 70%)",
          animate: { x: [0, 50, 0], y: [0, -30, 0] },
        }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--copper), transparent 70%)" }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vertical side rails */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground [writing-mode:vertical-rl]">
            Est. 2024 — Guinea
          </span>
          <div className="h-20 w-px bg-gradient-to-t from-transparent to-gold/40" />
        </div>
      </div>
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground [writing-mode:vertical-rl]">
            PRD-35BF1B52BE0E
          </span>
          <div className="h-20 w-px bg-gradient-to-t from-transparent to-gold/40" />
        </div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 py-32 text-center lg:px-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="badge-premium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          {c.badge}
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-ivory">
          <span className="block overflow-hidden">
            <RevealWords text={c.title1} delay={0.6} />
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-gradient-gold"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {c.title2}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <RevealWords text={c.title3} delay={1.2} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          {c.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton variant="primary" onClick={() => setSection("services")}>
            {c.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="outline" onClick={() => setSection("projects")}>
            <Play className="h-3.5 w-3.5" />
            {c.secondaryCta}
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-border/50 pt-12 md:grid-cols-4"
        >
          {c.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl font-bold text-ivory md:text-5xl stat-glow">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
