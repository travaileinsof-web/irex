"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { toast } from "sonner";

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
    <section id="contact" className="relative bg-coal py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

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

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Info side */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {infoItems.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-obsidian p-5 transition-colors hover:border-gold/30"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-copper/10 ring-1 ring-gold/20">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </div>
                    <p className="mt-1 whitespace-pre-line text-sm font-medium text-ivory">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Map placeholder */}
              <div className="relative mt-2 h-48 overflow-hidden rounded-2xl border border-border bg-obsidian">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="relative">
                    <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-gold/30" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold">
                      <MapPin className="h-5 w-5 text-obsidian" />
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Conakry, Guinea
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form side */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-border bg-obsidian p-8 md:p-10"
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />

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
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {c.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-coal px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    data-cursor="hover"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
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
      <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-coal px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
      />
    </div>
  );
}
