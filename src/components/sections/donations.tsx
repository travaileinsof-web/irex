"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check, ArrowRight, HandHeart } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { toast } from "sonner";
import { images } from "@/lib/images";

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
 <section id="donations" className="relative overflow-hidden py-32">
 {/* Background image with emerald overlay */}
 <img
 src={images.nature[2]}
 alt="Community landscape"
 loading="lazy" decoding="async"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep via-emerald-deep/95 to-emerald/85" />
 <div className="absolute inset-0 grid-pattern opacity-30" />

 {/* Floating hearts background — pure CSS animation */}
 <div className="pointer-events-none absolute inset-0 overflow-hidden">
 {[...Array(8)].map((_, i) => (
 <div
 key={i}
 className="absolute text-gold/10 animate-heart gpu"
 style={{
 left: `${(i * 12) % 100}%`,
 top: `${(i * 17) % 100}%`,
 "--h-duration": `${6 + i}s`,
 "--h-delay": `${i * 0.5}s`,
 } as React.CSSProperties}
 >
 <Heart className="h-12 w-12 fill-current" />
 </div>
 ))}
 </div>

 <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
 {/* Header */}
 <div className="mb-16 text-center">
 <Reveal>
 <span
 className="badge-premium mb-6 mx-auto"
 style={{ background: "rgba(245,200,66,0.15)", borderColor: "rgba(245,200,66,0.4)", color: "#f5c842" }}
 >
 {c.tag}
 </span>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl">
 <RevealWords text={c.title} />
 </h2>
 </Reveal>
 <Reveal delay={0.2}>
 <p className="mx-auto mt-6 max-w-2xl text-base text-ivory/80 md:text-lg">
 {c.subtitle}
 </p>
 </Reveal>
 </div>

 {/* Tiers */}
 <div className="grid gap-5 md:grid-cols-3">
 {c.tiers.map((tier, i) => (
 <Reveal key={i} delay={i * 0.1}>
 <motion.div
 className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-all ${
 i === 1
 ? "border-gold/50 bg-gradient-to-br from-gold/15 via-emerald-deep/80 to-emerald-deep/80 shadow-2xl"
 : "border-ivory/15 bg-emerald-deep/60 hover:border-gold/30"
 }`}
 >
 {i === 1 && (
 <div className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian">
 {lang === "fr" ? "Populaire" : "Popular"}
 </div>
 )}

 {/* Icon */}
 <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 ring-1 ring-gold/40">
 <HandHeart className="h-6 w-6 text-gold-bright" />
 </div>

 {/* Amount */}
 <div className="mb-2">
 <span className="font-display text-4xl font-bold text-gradient-gold">
 {formatPrice(tier.amount, lang)}
 </span>
 </div>
 <div className="text-xs uppercase tracking-wider text-ivory/60">
 {lang === "fr" ? "Contribution unique" : "One-time contribution"}
 </div>

 {/* Divider */}
 <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

 {/* Perks */}
 <ul className="flex-1 space-y-3">
 {tier.perks.map((perk, j) => (
 <li key={j} className="flex items-start gap-3 text-sm text-ivory">
 <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/20">
 <Check className="h-3 w-3 text-gold-bright" />
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
 : "border border-gold/50 text-gold hover:bg-gold hover:text-obsidian"
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
 <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ivory/70">
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
