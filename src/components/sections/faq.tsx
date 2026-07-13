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
 <section id="faq" className="relative bg-ivory py-32 overflow-hidden">
 <div className="absolute inset-0 grid-pattern-dark opacity-40" />

 {/* Floating decorations */}
 <div className="absolute top-32 left-10 h-72 w-72 rounded-full opacity-10 blur-2xl" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />

 <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
 {/* Header */}
 <div className="mb-16 text-center">
 <Reveal>
 <span className="badge-premium mb-6 mx-auto">{c.tag}</span>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-4xl font-bold text-obsidian md:text-5xl lg:text-6xl">
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
 className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-500 ${
 isOpen
 ? "border-gold/40 shadow-lg"
 : "border-obsidian/10 hover:border-gold/30"
 }`}
 >
 <button
 onClick={() => setOpen(isOpen ? null : i)}
 data-cursor="hover"
 className="flex w-full items-center justify-between gap-6 p-6 text-left"
 >
 <div className="flex items-center gap-4">
 <span className={`font-mono text-xs transition-colors ${isOpen ? "text-gold" : "text-emerald"}`}>
 [{String(i + 1).padStart(2, "0")}]
 </span>
 <h3 className={`font-display text-lg font-bold transition-colors md:text-xl ${
 isOpen ? "text-copper" : "text-obsidian"
 }`}>
 {item.q}
 </h3>
 </div>
 <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
 isOpen
 ? "border-gold bg-gradient-to-br from-gold to-copper text-obsidian rotate-180"
 : "border-obsidian/20 text-obsidian"
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
 <div className="px-6 pb-6 pl-[60px] text-sm leading-relaxed text-graphite/80 md:text-base">
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
