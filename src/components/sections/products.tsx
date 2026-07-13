"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowUpRight, Check } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function Products() {
  const { lang } = useSiteStore();
  const c = content[lang].products;
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredItems = activeCategory
    ? c.items.filter((item) => item.category === c.categories[activeCategory].name)
    : c.items;

  return (
    <section id="products" className="relative bg-obsidian py-32">
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

        {/* Category filter chips */}
        <Reveal delay={0.3}>
          <div className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              data-cursor="hover"
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === null
                  ? "border-gold bg-gold text-obsidian"
                  : "border-border text-ivory/70 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {lang === "fr" ? "Tout" : "All"}
            </button>
            {c.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                data-cursor="hover"
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  activeCategory === i
                    ? "border-gold bg-gold text-obsidian"
                    : "border-border text-ivory/70 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-coal card-lift"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-graphite to-coal">
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-gold/10 transition-transform duration-700 group-hover:scale-110">
                      IREX
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian">
                      {item.badge}
                    </div>
                  )}
                  {/* Quick add button */}
                  <button
                    data-cursor="hover"
                    className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gold text-obsidian opacity-0 transition-all duration-500 hover:bg-gold-bright group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-ivory group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-gold">
                      {formatPrice(item.price, lang)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gold/20 bg-gradient-to-r from-gold/5 via-transparent to-copper/5 p-10 md:flex-row">
            <div>
              <h3 className="font-display text-2xl font-bold text-ivory">
                {lang === "fr" ? "Besoin d'une solution sur-mesure ?" : "Need a custom solution?"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "fr"
                  ? "Notre équipe conçoit des produits adaptés à vos contraintes opérationnelles."
                  : "Our team designs products tailored to your operational constraints."}
              </p>
            </div>
            <button
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
            >
              {lang === "fr" ? "Contacter un expert" : "Contact an expert"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
