"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

const blogGradients = [
  "from-amber-900/30 to-coal",
  "from-emerald-900/30 to-coal",
  "from-orange-900/30 to-coal",
  "from-yellow-900/30 to-coal",
];

export function Blog() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].blog;

  return (
    <section id="blog" className="relative bg-obsidian py-32">
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
            <div className="flex items-center gap-4">
              <p className="max-w-xs text-sm text-muted-foreground">{c.subtitle}</p>
            </div>
          </Reveal>
        </div>

        {/* Blog grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {c.items.map((post, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                data-cursor="hover"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-coal"
              >
                {/* Image area */}
                <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${blogGradients[i % blogGradients.length]}`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl font-bold text-gold/10 transition-transform duration-700 group-hover:scale-110">
                      0{i + 1}
                    </span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute left-3 top-3 rounded-full bg-obsidian/80 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-gold">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-ivory transition-colors group-hover:text-gold">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-gold">
                    <span className="link-underline">
                      {lang === "fr" ? "Lire l'article" : "Read article"}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
