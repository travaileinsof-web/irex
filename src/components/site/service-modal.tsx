"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, LucideIcon, CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";

export interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
  image: string;
  IconComponent: LucideIcon;
  features?: string[];
}

interface Props {
  service: ServiceItem | null;
  onClose: () => void;
  onContact: () => void;
}

export function ServiceModal({ service, onClose, onContact }: Props) {
  const lang = useSiteStore((s) => s.lang);
  
  if (!service) return null;

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-coal shadow-2xl overflow-hidden border border-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-obsidian/60 text-ivory/80 hover:bg-gold hover:text-obsidian transition-colors backdrop-blur-md"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[2fr_3fr] h-full">
              {/* Image Section */}
              <div className="relative h-72 lg:h-full min-h-[400px] overflow-hidden group">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-coal/90" />
                
                {/* Icon overlay */}
                <div className="absolute bottom-8 left-8">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-gold/30 bg-coal/80 backdrop-blur-md shadow-2xl">
                    <service.IconComponent className="h-10 w-10 text-gold" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col p-8 md:p-12 justify-center bg-gradient-to-br from-coal to-graphite/50">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-ivory tracking-tight">
                      {service.title}
                    </h2>
                    <div className="mt-4 h-1 w-20 bg-gradient-to-r from-gold to-copper rounded-full" />
                  </div>
                  
                  <div className="prose prose-invert prose-gold">
                    <p className="text-lg md:text-xl text-ivory/80 leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gold mb-6">
                        {lang === "fr" ? "Points Clés" : "Key Features"}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            key={idx} 
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                            <span className="text-sm text-ivory/90 leading-tight">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-10 mt-10 border-t border-gold/10">
                    <button
                      onClick={() => {
                        onClose();
                        onContact();
                      }}
                      className="group flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold to-copper px-8 py-4 text-sm uppercase tracking-wider font-bold text-obsidian transition-all hover:from-gold-bright hover:to-copper-light hover:shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)]"
                    >
                      {lang === "fr" ? "Demander ce service" : "Request this service"}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
