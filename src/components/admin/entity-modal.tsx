"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { type ReactNode } from "react";

interface EntityModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function EntityModal({ open, onClose, title, children, size = "lg" }: EntityModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-obsidian/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${sizeMap[size]} my-8 rounded-2xl border border-border bg-coal shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <h2 className="font-display text-xl font-bold text-ivory">{title}</h2>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ivory hover:bg-red-500/20 hover:text-red-400 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DeleteConfirmModalProps {
  open: boolean;
  itemName: string;
  itemType: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export function DeleteConfirmModal({
  open,
  itemName,
  itemType,
  onClose,
  onConfirm,
  title = "Confirm deletion",
  description = `You are about to permanently delete this ${itemType}.`,
  confirmLabel = "Delete permanently",
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] flex items-center justify-center bg-obsidian/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirmation-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-coal to-graphite shadow-[0_24px_80px_-24px_rgba(212,165,71,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-gradient-to-r from-gold via-copper to-emerald" />
            <div className="p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-400/10">
                  <AlertTriangle className="h-5 w-5 text-red-300" />
                </div>
                <div className="pr-8">
                  <h2 id="delete-confirmation-title" className="font-display text-xl font-bold text-ivory">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/65">
                    {description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-gold/15 bg-obsidian/50 px-4 py-3">
                <p className="truncate text-sm font-medium text-gold" title={itemName}>
                  {itemName}
                </p>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-gold/60 hover:text-gold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="rounded-full bg-gradient-to-r from-red-500 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition-all hover:from-red-400 hover:to-red-600"
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reusable form field components
export function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputClass = "w-full rounded-lg border border-border bg-obsidian px-3 py-2 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none`} />;
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={inputClass}>{children}</select>;
}
