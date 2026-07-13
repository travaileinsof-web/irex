"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";

export function FAQ() {
    const lang = useSiteStore((s) => s.lang);
  const c = content[lang].faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-obsidian py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
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
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {c.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isOpen
                      ? "border-gold/40 bg-coal"
                      : "border-border bg-coal/50 hover:border-gold/20"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="hover"
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs transition-colors ${isOpen ? "text-gold" : "text-muted-foreground"}`}>
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <h3 className={`font-display text-lg font-bold transition-colors md:text-xl ${
                        isOpen ? "text-gold" : "text-ivory"
                      }`}>
                        {item.q}
                      </h3>
                    </div>
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-gold bg-gold text-obsidian rotate-180"
                        : "border-border text-ivory"
                    }`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pl-[60px] text-sm leading-relaxed text-muted-foreground md:text-base">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
