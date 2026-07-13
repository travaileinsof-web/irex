"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { teamAvatars } from "@/lib/images";

export function Team() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].team;

  return (
    <section id="team" className="relative bg-ivory py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-40" />

      {/* Floating decorations */}
      <motion.div
        className="absolute top-32 right-10 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <span className="badge-premium mb-6">{c.tag}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight text-obsidian md:text-5xl lg:text-6xl">
                <RevealWords text={c.title} />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-base text-graphite/70">{c.subtitle}</p>
          </Reveal>
        </div>

        {/* Team grid with real photos */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.members.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift"
              >
                {/* Photo */}
                <div className="relative h-80 overflow-hidden">
                  <img src={teamAvatars[i % teamAvatars.length]} alt={m.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  {/* Social icons */}
                  <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm text-obsidian hover:bg-gold transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm text-obsidian hover:bg-gold transition-colors">
                      <Twitter className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-emerald font-medium">{m.role}</div>
                  <h3 className="mt-2 font-display text-xl font-bold text-obsidian">{m.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-graphite/70">{m.expertise}</p>
                    <ArrowUpRight className="h-4 w-4 text-graphite/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-copper" />
                  </div>
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-emerald transition-all duration-500 group-hover:w-full" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
