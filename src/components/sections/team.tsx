"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

const avatarGradients = [
  "from-amber-700 to-orange-900",
  "from-emerald-700 to-teal-900",
  "from-rose-700 to-pink-900",
  "from-yellow-700 to-amber-900",
  "from-cyan-700 to-blue-900",
  "from-orange-700 to-red-900",
];

export function Team() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].team;

  return (
    <section id="team" className="relative bg-coal py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
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

        {/* Team grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.members.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-obsidian card-lift"
              >
                {/* Avatar area */}
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]}`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  {/* Initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-8xl font-bold text-ivory/20 transition-transform duration-700 group-hover:scale-110">
                      {m.role.charAt(0)}
                    </span>
                  </div>
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                  {/* Social icons */}
                  <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian/60 backdrop-blur-sm text-ivory hover:bg-gold hover:text-obsidian transition-colors">
                      <Linkedin className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian/60 backdrop-blur-sm text-ivory hover:bg-gold hover:text-obsidian transition-colors">
                      <Twitter className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{m.role}</div>
                  <h3 className="mt-2 font-display text-xl font-bold text-ivory">{m.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{m.expertise}</p>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
