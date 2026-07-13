"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check, ArrowRight, HandHeart } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { toast } from "sonner";

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function Donations() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].donations;
  const [selected, setSelected] = useState<number | null>(null);

  const handleDonate = (amount: number) => {
    setSelected(amount);
    toast.success(
      lang === "fr"
        ? `Merci ! Votre don de ${formatPrice(amount, lang)} soutient nos communautés.`
        : `Thank you! Your donation of ${formatPrice(amount, lang)} supports our communities.`
    );
  };

  return (
    <section id="donations" className="relative overflow-hidden bg-coal py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Floating hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/5"
            style={{ left: `${(i * 13) % 100}%`, top: `${(i * 17) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            <Heart className="h-12 w-12 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <Reveal>
            <span className="badge-premium mb-6 mx-auto">{c.tag}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl">
              <RevealWords text={c.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {c.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Tiers */}
        <div className="grid gap-5 md:grid-cols-3">
          {c.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-all ${
                  i === 1
                    ? "border-gold/50 bg-gradient-to-br from-gold/10 via-coal to-coal"
                    : "border-border bg-obsidian hover:border-gold/30"
                }`}
              >
                {i === 1 && (
                  <div className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian">
                    {lang === "fr" ? "Populaire" : "Popular"}
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/20">
                  <HandHeart className="h-6 w-6 text-gold" />
                </div>

                {/* Amount */}
                <div className="mb-2">
                  <span className="font-display text-4xl font-bold text-gradient-gold">
                    {formatPrice(tier.amount, lang)}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {lang === "fr" ? "Contribution unique" : "One-time contribution"}
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* Perks */}
                <ul className="flex-1 space-y-3">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-ivory">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/20">
                        <Check className="h-3 w-3 text-gold" />
                      </div>
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleDonate(tier.amount)}
                  data-cursor="hover"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                    i === 1
                      ? "bg-gradient-to-r from-gold to-copper text-obsidian hover:from-gold-bright hover:to-copper-light"
                      : "border border-gold/40 text-gold hover:bg-gold hover:text-obsidian"
                  }`}
                >
                  {selected === tier.amount ? (
                    <>
                      <Check className="h-4 w-4" />
                      {lang === "fr" ? "Merci !" : "Thank you!"}
                    </>
                  ) : (
                    <>
                      {lang === "fr" ? "Contribuer" : "Contribute"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Trust line */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" />
              {lang === "fr" ? "100% reversé aux communautés" : "100% distributed to communities"}
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" />
              {lang === "fr" ? "Rapport d'impact annuel" : "Annual impact report"}
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-gold" />
              {lang === "fr" ? "Reconnaissance transparente" : "Transparent recognition"}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
