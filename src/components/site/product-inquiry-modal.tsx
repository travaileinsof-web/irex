"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, ShoppingBag } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { toast } from "sonner";

export interface ApiProduct {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  descriptionEn: string | null;
  price: number;
  badge: string | null;
  image: string | null;
  type: string;
}

interface Props {
  product: ApiProduct | null;
  onClose: () => void;
}

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function ProductInquiryModal({ product, onClose }: Props) {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].contact;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  if (!product) return null;

  const productName = lang === "fr" ? product.name : (product.nameEn || product.name);
  const productDesc = lang === "fr" ? product.description : (product.descriptionEn || product.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "product_inquiry",
          productId: product.id,
          ...form,
          subject: `Inquiry: ${productName}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success(
        lang === "fr"
          ? "Demande envoyée ! L'administrateur vous contactera sous 48h."
          : "Request sent! The administrator will contact you within 48h."
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
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/80"
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
              {/* Image */}
              <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={productName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-graphite to-coal flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-gold/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />
                {product.badge && (
                  <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-gold to-copper px-3 py-1 text-xs font-bold uppercase tracking-wider text-obsidian shadow-lg">
                    {product.badge}
                  </div>
                )}
                {/* Price overlay */}
                <div className="absolute bottom-4 left-4">
                  <div className="rounded-2xl bg-obsidian/80 px-4 py-2 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-wider text-gold">
                      {lang === "fr" ? "Prix" : "Price"}
                    </div>
                    <div className="font-mono text-lg font-bold text-ivory">
                      {formatPrice(product.price, lang)}
                    </div>
                  </div>
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
                        ? "Votre demande a été transmise à notre équipe. Nous vous recontactons sous 48h."
                        : "Your request has been sent to our team. We will contact you within 48h."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-wider text-emerald font-medium">
                      {product.type}
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-bold text-obsidian">
                      {productName}
                    </h2>
                    <div className="mt-4 prose prose-sm max-w-none text-graphite/80 leading-relaxed whitespace-pre-wrap">
                      {productDesc}
                    </div>

                    <div className="my-5 h-px bg-obsidian/10" />

                    <h3 className="font-display text-base font-bold text-obsidian mb-3">
                      {lang === "fr" ? "Demander une information" : "Request information"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder={c.form.name}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-2">
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
                        required
                        rows={3}
                        placeholder={c.form.message}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-lg border border-obsidian/15 bg-cream px-3 py-2 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-obsidian/30 border-t-obsidian animate-spin" />
                            {lang === "fr" ? "Envoi..." : "Sending..."}
                          </>
                        ) : (
                          <>
                            {lang === "fr" ? "Envoyer ma demande" : "Submit request"}
                            <Send className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-graphite/50">
                        {lang === "fr"
                          ? "Réponse sous 48h ouvrées"
                          : "Response within 48 business hours"}
                      </p>
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
