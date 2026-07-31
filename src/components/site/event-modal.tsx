"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { toast } from "sonner";

export interface ApiEvent {
  id: string;
  name: string;
  nameEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  date: string;
  location: string;
  type: string;
  image: string | null;
  registerUrl: string | null;
}

interface Props {
  event: ApiEvent | null;
  onClose: () => void;
}

export function EventModal({ event, onClose }: Props) {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].contact;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  if (!event) return null;

  const eventName = lang === "fr" ? event.name : (event.nameEn || event.name);
  const eventDesc = lang === "fr" ? event.description : (event.descriptionEn || event.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event", // Inbox submission type
          ...form,
          subject: `Registration: ${eventName} (${event.date})`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success(
        lang === "fr"
          ? "Inscription envoyée ! L'administrateur vous contactera sous 48h."
          : "Registration sent! The administrator will contact you within 48h."
      );
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      }, 3000);
    } catch {
      toast.error(lang === "fr" ? "Erreur d'envoi" : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-ivory shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-obsidian/10 text-obsidian hover:bg-obsidian hover:text-ivory transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Event Info */}
              <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden bg-cream border-r border-obsidian/10">
                {event.image && (
                  <img
                    src={event.image}
                    alt={eventName}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian/80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-3">
                    <span className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-gold/20 text-gold-bright border-gold/40">
                      {event.type}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ivory mb-4">
                    {eventName}
                  </h2>
                  <div className="flex flex-col gap-2 text-sm text-ivory/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-light" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-light" />
                      {event.location}
                    </div>
                  </div>
                  {eventDesc && (
                    <p className="mt-4 text-sm text-ivory/70 line-clamp-4">
                      {eventDesc}
                    </p>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="p-8">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center text-center py-12">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15">
                      <CheckCircle2 className="h-8 w-8 text-emerald" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-obsidian">
                      {lang === "fr" ? "Merci !" : "Thank you!"}
                    </h3>
                    <p className="mt-2 text-sm text-graphite/70 max-w-xs">
                      {lang === "fr"
                        ? "Votre demande d'inscription a été transmise à notre équipe. Nous vous recontactons sous peu."
                        : "Your registration request has been sent to our team. We will contact you shortly."}
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-2xl font-bold text-obsidian mb-6">
                      {lang === "fr" ? "S'inscrire à l'événement" : "Register for event"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        required
                        placeholder={c.form.name}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="email"
                          required
                          placeholder={c.form.email}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder={c.form.phone}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder={c.form.company}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                      />
                      <textarea
                        rows={3}
                        placeholder={lang === "fr" ? "Message (optionnel)" : "Message (optional)"}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50 mt-2"
                      >
                        {submitting ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-obsidian/30 border-t-obsidian animate-spin" />
                            {lang === "fr" ? "Envoi..." : "Sending..."}
                          </>
                        ) : (
                          <>
                            {lang === "fr" ? "S'inscrire" : "Register"}
                            <Send className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
