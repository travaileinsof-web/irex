"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { eventImages } from "@/lib/images";

const typeColors: Record<string, string> = {
 "Sommet": "bg-gold/20 text-gold border-gold/40",
 "Summit": "bg-gold/20 text-gold border-gold/40",
 "Formation": "bg-emerald-500/20 text-emerald-light border-emerald/40",
 "Training": "bg-emerald-500/20 text-emerald-light border-emerald/40",
 "Conférence": "bg-copper/20 text-copper-light border-copper/40",
 "Conference": "bg-copper/20 text-copper-light border-copper/40",
 "Workshop": "bg-cyan-500/20 text-cyan-300 border-cyan/40",
};

export function Events() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].events;

 return (
 <section id="events" className="relative bg-cream py-32 overflow-hidden">
 <div className="absolute inset-0 grid-pattern-dark opacity-40" />
 <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }} />

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

 {/* Timeline with images */}
 <div className="relative">
 {/* Vertical line */}
 <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:-translate-x-1/2" />

 <div className="space-y-8">
 {c.items.map((event, i) => (
 <Reveal key={i} delay={i * 0.1}>
 <motion.div
 className={`relative flex items-start gap-6 md:gap-0 ${
 i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
 }`}
 >
 {/* Dot */}
 <div className="absolute left-[8px] md:left-1/2 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:-translate-x-1/2">
 <span className="absolute h-4 w-4 rounded-full bg-gold/30 animate-ping" />
 <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold to-copper" />
 </div>

 {/* Card */}
 <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
 <motion.div
 className="group overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift"
 >
 {/* Image */}
 <div className="relative h-32 overflow-hidden">
 <img src={eventImages[i % eventImages.length]} alt={event.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
 {/* Type badge */}
 <div className="absolute left-3 top-3">
 <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${typeColors[event.type] ?? "bg-gold/20 text-gold border-gold/40"}`}>
 {event.type}
 </span>
 </div>
 </div>

 {/* Content */}
 <div className="p-5">
 <h3 className="font-display text-lg font-bold text-obsidian transition-colors group-hover:text-copper">
 {event.name}
 </h3>
 <div className="mt-3 space-y-1.5 text-sm text-graphite/70">
 <div className="flex items-center gap-2">
 <Calendar className="h-3.5 w-3.5 text-emerald" />
 {event.date}
 </div>
 <div className="flex items-center gap-2">
 <MapPin className="h-3.5 w-3.5 text-emerald" />
 {event.location}
 </div>
 </div>
 <div className="mt-3 flex items-center gap-2 text-sm text-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
 <span className="link-underline">
 {lang === "fr" ? "S'inscrire" : "Register"}
 </span>
 <ArrowUpRight className="h-3.5 w-3.5" />
 </div>
 </div>
 </motion.div>
 </div>

 {/* Spacer for the other half */}
 <div className="hidden md:block md:w-1/2" />
 </motion.div>
 </Reveal>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
