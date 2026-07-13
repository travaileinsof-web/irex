"use client";


import { ArrowUpRight, Calendar } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { projectImages } from "@/lib/images";

export function Projects() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].projects;

 return (
 <section id="projects" className="relative bg-obsidian py-32 overflow-hidden">
 <div className="absolute inset-0 grid-pattern opacity-30" />
 <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

 {/* Background floating blobs */}
 <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }} />

 <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
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
 <p className="max-w-md text-base text-ivory/70">{c.subtitle}</p>
 </Reveal>
 </div>

 {/* Projects grid with images */}
 <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
 {c.items.map((p, i) => (
 <Reveal key={i} delay={(i % 3) * 0.1}>
 <article
 data-cursor="hover"
 className="group relative h-96 overflow-hidden rounded-2xl border border-gold/15"
 >
 {/* Image */}
 <img src={projectImages[i % projectImages.length]} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
 {/* Gradient overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/20" />

 {/* Big number watermark */}
 <div className="absolute -right-4 top-0 select-none font-display text-[10rem] font-bold leading-none text-ivory/5 transition-all duration-700 group-hover:translate-x-2 group-hover:text-ivory/10">
 {String(i + 1).padStart(2, "0")}
 </div>

 {/* Status badge */}
 <div className="absolute left-4 top-4 flex items-center gap-2">
 <span
 className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
 p.status === "Livré" || p.status === "Delivered"
 ? "bg-emerald/30 text-emerald-light border border-emerald/40"
 : "bg-gold/30 text-gold-bright border border-gold/40"
 }`}
 >
 <span className={`h-1.5 w-1.5 rounded-full ${
 p.status === "Livré" || p.status === "Delivered" ? "bg-emerald-light" : "bg-gold animate-pulse"
 }`} />
 {p.status}
 </span>
 </div>

 {/* Content */}
 <div className="absolute bottom-0 left-0 right-0 p-6">
 <div className="mb-2 flex items-center gap-3 text-[11px] uppercase tracking-wider text-ivory/70">
 <span className="text-gold font-medium">{p.sector}</span>
 <span className="h-1 w-1 rounded-full bg-ivory/40" />
 <span className="flex items-center gap-1">
 <Calendar className="h-3 w-3" />
 {p.year}
 </span>
 </div>
 <h3 className="font-display text-xl font-bold text-ivory transition-colors group-hover:text-gold">
 {p.name}
 </h3>
 <div className="mt-3 flex items-center gap-2 text-sm text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
 <span className="link-underline">{lang === "fr" ? "Voir l'étude de cas" : "View case study"}</span>
 <ArrowUpRight className="h-3.5 w-3.5" />
 </div>
 </div>

 {/* Border glow on hover */}
 <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-gold/40 transition-opacity duration-500 group-hover:opacity-100" />
 </article>
 </Reveal>
 ))}
 </div>
 </div>
 </section>
 );
}
