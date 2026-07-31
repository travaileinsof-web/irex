"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";
import { useSiteStore } from "@/lib/store";

export interface ApiProject {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  descriptionEn: string | null;
  sector: string;
  year: string;
  status: string;
  image: string | null;
  client: string | null;
  location: string | null;
}

interface Props {
  project: ApiProject | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const lang = useSiteStore((s) => s.lang);

  if (!project) return null;

  const projectName = lang === "fr" ? project.name : (project.nameEn || project.name);
  const projectDesc = lang === "fr" ? project.description : (project.descriptionEn || project.description);
  const isDelivered = project.status === "Livré" || project.status === "Delivered";

  return (
    <AnimatePresence>
      {project && (
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-coal border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-obsidian/50 text-ivory hover:bg-gold hover:text-obsidian transition-colors backdrop-blur-md"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col">
              {project.image && (
                <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
                  <img
                    src={project.image}
                    alt={projectName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal to-transparent" />
                </div>
              )}
              
              <div className="p-8 md:p-12 -mt-10 relative z-10">
                 <div className="mb-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border ${
                    isDelivered
                      ? "bg-emerald-950/80 text-emerald-light border-emerald/40"
                      : "bg-gold/20 text-gold-bright border-gold/40"
                  } backdrop-blur-md`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      isDelivered ? "bg-emerald-light" : "bg-gold animate-pulse"
                    }`} />
                    {project.status}
                  </span>
                 </div>

                <h2 className="font-display text-3xl md:text-5xl font-bold text-ivory mb-4">
                  {projectName}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-wider text-ivory/60 mb-8 pb-8 border-b border-white/5">
                  <span className="text-gold font-medium">{project.sector}</span>
                  <span className="h-1 w-1 rounded-full bg-ivory/20" />
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {project.year}
                  </span>
                  {project.location && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-ivory/20" />
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </span>
                    </>
                  )}
                  {project.client && (
                    <>
                       <span className="h-1 w-1 rounded-full bg-ivory/20" />
                       <span className="flex items-center gap-1.5 text-ivory/80">
                         {lang === "fr" ? "Client :" : "Client:"} <strong className="text-ivory font-semibold">{project.client}</strong>
                       </span>
                    </>
                  )}
                </div>

                <div className="text-base md:text-lg leading-relaxed text-ivory/80 whitespace-pre-wrap">
                  {projectDesc}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
