"use client";

import { motion } from "framer-motion";
import { Compass, Eye, Target, Gem, Leaf, Shield, Heart, Award } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

const valueIcons = [Award, Leaf, Shield, Heart];

export function About() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].about;

  return (
    <section id="about" className="relative bg-obsidian py-32">
      {/* Decorative element */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="badge-premium mb-6">{c.tag}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
                <RevealWords text={c.title} />
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.2}>
              <p className="text-lg font-medium text-gold">{c.lead}</p>
            </Reveal>
            <div className="mt-6 space-y-4">
              {c.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.3 + i * 0.1}>
                  <p className="text-base leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-coal p-10 card-lift">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <Target className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ivory">{c.mission.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{c.mission.text}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-coal p-10 card-lift">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-copper/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-copper/10">
                  <Eye className="h-6 w-6 text-copper-light" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ivory">{c.vision.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{c.vision.text}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-24">
          <Reveal>
            <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display text-3xl font-bold text-ivory md:text-4xl">
                Nos Valeurs / Our Values
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent md:mb-3" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                [ 04 pillars ]
              </span>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-coal/50 p-6 transition-all duration-500 hover:border-gold/40 hover:bg-coal">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 ring-1 ring-gold/20">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-ivory">{v.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                    {/* Hover line */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-copper transition-all duration-500 group-hover:w-full" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
