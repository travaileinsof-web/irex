"use client";


import { ArrowUpRight, Clock } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { blogImages } from "@/lib/images";

export function Blog() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].blog;

 return (
 <section id="blog" className="relative bg-coal py-32 overflow-hidden">
 <div className="absolute inset-0 grid-pattern opacity-30" />
 <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

 {/* Floating blobs */}
 <div className="absolute top-20 left-10 h-72 w-72 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, var(--copper), transparent 70%)" }} />

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
 <p className="max-w-xs text-sm text-ivory/70">{c.subtitle}</p>
 </Reveal>
 </div>

 {/* Blog grid with images */}
 <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
 {c.items.map((post, i) => (
 <Reveal key={i} delay={(i % 4) * 0.08}>
 <article
 data-cursor="hover"
 className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-b from-graphite to-coal transition-all duration-500 hover:border-gold/40"
 >
 {/* Image */}
 <div className="relative aspect-[16/10] overflow-hidden">
 <img src={blogImages[i % blogImages.length]} alt={post.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />
 {/* Category badge */}
 <div className="absolute left-3 top-3 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian">
 {post.category}
 </div>
 </div>

 {/* Content */}
 <div className="flex flex-1 flex-col p-5">
 <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-wider text-ivory/60">
 <span>{post.date}</span>
 <span className="h-1 w-1 rounded-full bg-ivory/40" />
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
 </article>
 </Reveal>
 ))}
 </div>
 </div>
 </section>
 );
}
