"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin, Briefcase, Send, Sparkles, Loader2, X, CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { motion, AnimatePresence } from "framer-motion";

interface ApiJobOpening {
  id: string;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  location: string;
  type: string;
  dept: string;
}

export function Careers() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].careers;
  const { data: items, loading } = useFetch<ApiJobOpening[]>("/api/careers");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [applyTarget, setApplyTarget] = useState<string>(""); // Job title or "Spontaneous"

  // Form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleApply = (jobTitle?: string) => {
    setApplyTarget(jobTitle || (lang === "fr" ? "Candidature Spontanée" : "Spontaneous Application"));
    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitted(false);
    setError(false);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          subject: applyTarget,
          ...form,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="careers" className="relative bg-coal py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full opacity-15 blur-2xl animate-blob-2 gpu"
          style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Reveal><span className="badge-premium mb-6">{c.tag}</span></Reveal>
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

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          )}

          {!loading && (
            <div className="grid gap-3">
              {(items || []).map((job, i) => {
                const title = lang === "fr" ? job.title : (job.titleEn || job.title);
                const desc = lang === "fr" ? job.description : (job.descriptionEn || job.description);
                return (
                  <Reveal key={job.id} delay={i * 0.06}>
                    <button
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      data-cursor="hover"
                      className="group flex w-full flex-col gap-4 rounded-2xl border border-gold/15 bg-gradient-to-r from-graphite to-coal p-6 text-left transition-colors hover:border-gold/40 hover-lift-xs"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-emerald/20 ring-1 ring-gold/30">
                          <Briefcase className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ivory transition-colors group-hover:text-gold">
                            {title}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ivory/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-ivory/40" />
                            <span className="text-emerald-light">{job.dept}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 self-end">
                        <span className="rounded-full border border-ivory/20 px-3 py-1 text-[10px] uppercase tracking-wider text-ivory">
                          {job.type}
                        </span>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian ${expandedJob === job.id ? 'bg-gold text-obsidian border-gold rotate-45' : ''}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 rounded-2xl border border-gold/10 bg-obsidian/40 p-6 text-sm leading-relaxed text-ivory/80">
                            <div className="whitespace-pre-wrap">{desc}</div>
                            <button
                              onClick={() => handleApply(title)}
                              className="mt-6 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light inline-flex items-center gap-2"
                            >
                              {lang === "fr" ? "Postuler pour ce poste" : "Apply for this position"}
                              <Send className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-emerald/30 bg-gradient-to-r from-emerald-deep via-emerald to-emerald-deep p-10 md:flex-row">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/20">
                  <Sparkles className="h-5 w-5 text-gold-bright" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ivory">
                    {lang === "fr" ? "Candidature spontanée" : "Spontaneous application"}
                  </h3>
                  <p className="mt-2 text-sm text-ivory/80">
                    {lang === "fr"
                      ? "Vous ne trouvez pas le poste idéal ? Envoyez-nous votre profil."
                      : "Can't find the ideal position? Send us your profile."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleApply()}
                data-cursor="hover"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
              >
                {lang === "fr" ? "Envoyer ma candidature" : "Submit application"}
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-coal p-6 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-6 top-6 text-ivory/50 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ivory">
                    {lang === "fr" ? "Candidature envoyée !" : "Application sent!"}
                  </h3>
                  <p className="mt-2 text-sm text-ivory/70">
                    {lang === "fr"
                      ? "Merci pour votre intérêt. Notre équipe RH étudiera votre profil et vous recontactera."
                      : "Thank you for your interest. Our HR team will review your profile and get back to you."}
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-8 rounded-full border border-border px-6 py-2 text-sm font-medium text-ivory hover:bg-white/5"
                  >
                    {lang === "fr" ? "Fermer" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-ivory">
                      {lang === "fr" ? "Postuler" : "Apply"}
                    </h3>
                    <p className="mt-1 text-sm text-gold">
                      {applyTarget}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-ivory/80 uppercase tracking-wider">
                        {lang === "fr" ? "Nom complet *" : "Full Name *"}
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-obsidian px-4 py-3 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-ivory/80 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-xl border border-border bg-obsidian px-4 py-3 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-ivory/80 uppercase tracking-wider">
                          {lang === "fr" ? "Téléphone" : "Phone"}
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-border bg-obsidian px-4 py-3 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold focus:outline-none"
                          placeholder="+224 ..."
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-ivory/80 uppercase tracking-wider">
                        {lang === "fr" ? "Message / Lien LinkedIn / Portfolio *" : "Message / LinkedIn link / Portfolio *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl border border-border bg-obsidian px-4 py-3 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold focus:outline-none"
                        placeholder={lang === "fr" ? "Présentez-vous brièvement ou collez le lien vers votre CV en ligne..." : "Introduce yourself briefly or paste a link to your online CV..."}
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">
                        {lang === "fr" ? "Une erreur est survenue." : "An error occurred."}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-copper py-3 text-sm font-medium text-obsidian transition-all hover:opacity-90 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {lang === "fr" ? "Envoyer la candidature" : "Send application"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
