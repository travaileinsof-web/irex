"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check, Heart } from "lucide-react";
import { toast } from "sonner";
import { useSiteStore } from "@/lib/store";

export interface DonationTierInfo {
  id: string;
  amount: number;
  title: string | null;
  titleEn: string | null;
}

interface Props {
  tier: DonationTierInfo | null;
  onClose: () => void;
}

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function DonationModal({ tier, onClose }: Props) {
  const lang = useSiteStore((s) => s.lang);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!tier) return null;

  const title = lang === "fr" ? (tier.title || "Don") : (tier.titleEn || tier.title || "Donation");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email) {
      toast.error(lang === "fr" ? "Veuillez remplir votre nom et email." : "Please fill in your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "donation",
          name,
          email,
          phone: phone || undefined,
          message: message || `${lang === "fr" ? "Don" : "Donation"}: ${formatPrice(tier.amount, lang)} — ${title}`,
          subject: `${formatPrice(tier.amount, lang)} — ${title}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast.success(
        lang === "fr"
          ? "Merci ! Votre demande de don a bien été enregistrée."
          : "Thank you! Your donation request has been recorded."
      );
    } catch {
      toast.error(lang === "fr" ? "Erreur lors de l'envoi. Réessayez." : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {tier && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-coal border border-gold/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-obsidian/50 text-ivory hover:bg-gold hover:text-obsidian transition-colors backdrop-blur-md"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8 md:p-10">
              {done ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/40">
                    <Check className="h-8 w-8 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ivory mb-3">
                    {lang === "fr" ? "Demande envoyée !" : "Request sent!"}
                  </h2>
                  <p className="text-sm text-ivory/70 max-w-sm">
                    {lang === "fr"
                      ? "Notre équipe vous contactera très prochainement pour finaliser votre don."
                      : "Our team will contact you shortly to finalize your donation."}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
                  >
                    {lang === "fr" ? "Fermer" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 ring-1 ring-gold/40">
                    <Heart className="h-5 w-5 text-gold-bright" />
                  </div>
                  <div className="mb-1 font-display text-xs font-bold uppercase tracking-wider text-gold-bright">
                    {title}
                  </div>
                  <h2 className="font-display text-3xl font-bold text-gradient-gold mb-1">
                    {formatPrice(tier.amount, lang)}
                  </h2>
                  <p className="text-sm text-ivory/60 mb-6">
                    {lang === "fr"
                      ? "Remplissez ce formulaire, notre équipe vous contactera pour finaliser votre contribution."
                      : "Fill in this form, our team will contact you to finalize your contribution."}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={lang === "fr" ? "Nom complet *" : "Full name *"} name="name" required />
                      <Field label={lang === "fr" ? "Email *" : "Email *"} name="email" type="email" required />
                    </div>
                    <Field label={lang === "fr" ? "Téléphone" : "Phone"} name="phone" type="tel" />
                    <div>
                      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/70">
                        {lang === "fr" ? "Message (optionnel)" : "Message (optional)"}
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder={lang === "fr" ? "Un mot pour la communauté..." : "A word for the community..."}
                        className="w-full rounded-xl border border-border bg-obsidian/40 px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor="hover"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {lang === "fr" ? "Envoi..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          {lang === "fr" ? "Confirmer ma demande" : "Confirm my request"}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/70">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-obsidian/40 px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
      />
    </div>
  );
}
