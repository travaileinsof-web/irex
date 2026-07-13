"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Briefcase, Send, Sparkles } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

export function Careers() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].careers;

  return (
    <section id="careers" className="relative bg-obsidian py-32">
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

        {/* Openings */}
        <div className="grid gap-3">
          {c.openings.map((job, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.button
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                data-cursor="hover"
                className="group flex w-full flex-col gap-4 rounded-2xl border border-border bg-coal p-6 text-left transition-colors hover:border-gold/40 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 ring-1 ring-gold/20">
                    <Briefcase className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ivory transition-colors group-hover:text-gold">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span className="text-gold">{job.dept}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-wider text-ivory">
                    {job.type}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ivory transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA — spontaneous application */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gold/20 bg-gradient-to-r from-gold/5 via-transparent to-copper/5 p-10 md:flex-row">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <Sparkles className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ivory">
                  {lang === "fr" ? "Candidature spontanée" : "Spontaneous application"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "fr"
                    ? "Vous ne trouvez pas le poste idéal ? Envoyez-nous votre profil, nous étudions toutes les candidatures."
                    : "Can't find the ideal position? Send us your profile, we review all applications."}
                </p>
              </div>
            </div>
            <button
              data-cursor="hover"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
            >
              {lang === "fr" ? "Envoyer ma candidature" : "Submit application"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
