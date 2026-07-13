"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { productImages } from "@/lib/images";

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function Products() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].products;
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredItems = activeCategory
    ? c.items.filter((item) => item.category === c.categories[activeCategory].name)
    : c.items;

  return (
    <section id="products" className="relative bg-cream py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern-dark opacity-40" />
      <motion.div
        className="absolute top-20 right-10 h-72 w-72 rounded-full opacity-15 blur-3xl"
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

        {/* Category filter chips */}
        <Reveal delay={0.3}>
          <div className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              data-cursor="hover"
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === null
                  ? "border-obsidian bg-obsidian text-ivory"
                  : "border-obsidian/20 text-graphite hover:border-gold hover:text-copper"
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
                    ? "border-emerald bg-emerald text-ivory"
                    : "border-obsidian/20 text-graphite hover:border-emerald hover:text-emerald"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={productImages[i % productImages.length]} alt={item.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-gold to-copper px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian shadow-lg">
                      {item.badge}
                    </div>
                  )}
                  {/* Quick add button */}
                  <button
                    data-cursor="hover"
                    className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper text-obsidian opacity-0 shadow-xl transition-all duration-500 hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider text-emerald font-medium">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-obsidian group-hover:text-copper transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-obsidian/5 pt-4">
                    <span className="font-mono text-sm font-bold text-copper">
                      {formatPrice(item.price, lang)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-graphite/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-copper" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-emerald/20 bg-gradient-to-r from-emerald-deep via-emerald to-emerald-deep p-10 md:flex-row">
            <div>
              <h3 className="font-display text-2xl font-bold text-ivory">
                {lang === "fr" ? "Besoin d'une solution sur-mesure ?" : "Need a custom solution?"}
              </h3>
              <p className="mt-2 text-sm text-ivory/80">
                {lang === "fr"
                  ? "Notre équipe conçoit des produits adaptés à vos contraintes opérationnelles."
                  : "Our team designs products tailored to your operational constraints."}
              </p>
            </div>
            <button
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light hover:shadow-[0_8px_20px_-8px_rgba(212,165,71,0.6)]"
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
