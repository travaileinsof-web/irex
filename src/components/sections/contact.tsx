"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { toast } from "sonner";
import { images } from "@/lib/images";

export function Contact() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].contact;
 const [submitted, setSubmitted] = useState(false);
 const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 toast.success(c.form.success);
 setTimeout(() => {
 setSubmitted(false);
 setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
 }, 4000);
 };

 const infoItems = [
 { icon: MapPin, label: lang === "fr" ? "Adresse" : "Address", value: c.info.address },
 { icon: Phone, label: lang === "fr" ? "Téléphone" : "Phone", value: c.info.phone },
 { icon: Mail, label: "Email", value: c.info.email },
 { icon: Clock, label: lang === "fr" ? "Horaires" : "Hours", value: c.info.hours },
 ];

 return (
 <section id="contact" className="relative bg-ivory py-32 overflow-hidden">
 <div className="absolute inset-0 grid-pattern-dark opacity-40" />
 <div className="absolute top-20 left-10 h-72 w-72 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }} />

 <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
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
 <Reveal delay={0.2}>
 <p className="mx-auto mt-6 max-w-2xl text-base text-graphite/70 md:text-lg">
 {c.subtitle}
 </p>
 </Reveal>
 </div>

 <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
 {/* Info side */}
 <Reveal>
 <div className="flex h-full flex-col gap-4">
 {infoItems.map((item, i) => (
 <motion.div
 key={i}
 className="group flex items-start gap-4 rounded-2xl border border-obsidian/10 bg-white p-5 shadow-sm transition-colors hover:border-gold/30"
 >
 <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-emerald/15 ring-1 ring-gold/20">
 <item.icon className="h-5 w-5 text-copper" />
 </div>
 <div>
 <div className="text-[10px] uppercase tracking-[0.2em] text-emerald">
 {item.label}
 </div>
 <p className="mt-1 whitespace-pre-line text-sm font-medium text-obsidian">
 {item.value}
 </p>
 </div>
 </motion.div>
 ))}

 {/* Map with image */}
 <div className="relative mt-2 h-56 overflow-hidden rounded-2xl border border-obsidian/10 shadow-sm">
 <img
 src={images.office[0]}
 alt="IREX Mining office location"
 loading="lazy" decoding="async"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent" />
 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
 <div className="relative">
 <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-gold/40" />
 <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper shadow-lg">
 <MapPin className="h-5 w-5 text-obsidian" />
 </div>
 </div>
 <span className="text-sm uppercase tracking-wider text-ivory font-medium">
 Matoto Centre, Conakry
 </span>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Form side */}
 <Reveal delay={0.2}>
 <form
 onSubmit={handleSubmit}
 className="relative overflow-hidden rounded-3xl border border-obsidian/10 bg-white p-8 shadow-xl md:p-10"
 >
 <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-2xl" />

 <div className="relative grid gap-5 sm:grid-cols-2">
 <Field
 label={c.form.name}
 value={form.name}
 onChange={(v) => setForm({ ...form, name: v })}
 required
 />
 <Field
 label={c.form.email}
 type="email"
 value={form.email}
 onChange={(v) => setForm({ ...form, email: v })}
 required
 />
 <Field
 label={c.form.phone}
 value={form.phone}
 onChange={(v) => setForm({ ...form, phone: v })}
 />
 <Field
 label={c.form.company}
 value={form.company}
 onChange={(v) => setForm({ ...form, company: v })}
 />
 <div className="sm:col-span-2">
 <Field
 label={c.form.subject}
 value={form.subject}
 onChange={(v) => setForm({ ...form, subject: v })}
 required
 />
 </div>
 <div className="sm:col-span-2">
 <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-emerald">
 {c.form.message}
 </label>
 <textarea
 required
 rows={5}
 value={form.message}
 onChange={(e) => setForm({ ...form, message: e.target.value })}
 className="w-full resize-none rounded-xl border border-obsidian/15 bg-cream px-4 py-3 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
 />
 </div>
 <div className="sm:col-span-2">
 <button
 type="submit"
 disabled={submitted}
 data-cursor="hover"
 className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50 hover:shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)]"
 >
 {submitted ? (
 <>
 <CheckCircle2 className="h-4 w-4" />
 {lang === "fr" ? "Message envoyé !" : "Message sent!"}
 </>
 ) : (
 <>
 {c.form.submit}
 <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
 </>
 )}
 </button>
 </div>
 </div>
 </form>
 </Reveal>
 </div>
 </div>
 </section>
 );
}

function Field({
 label,
 value,
 onChange,
 type = "text",
 required = false,
}: {
 label: string;
 value: string;
 onChange: (v: string) => void;
 type?: string;
 required?: boolean;
}) {
 return (
 <div>
 <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-emerald">
 {label}
 {required && <span className="text-copper"> *</span>}
 </label>
 <input
 type={type}
 required={required}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 className="w-full rounded-xl border border-obsidian/15 bg-cream px-4 py-3 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
 />
 </div>
 );
}
