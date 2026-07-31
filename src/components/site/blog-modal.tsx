"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSiteStore } from "@/lib/store";

export interface ApiBlogPost {
  id: string;
  title: string;
  titleEn: string | null;
  excerpt: string | null;
  excerptEn: string | null;
  content: string;
  contentEn: string | null;
  category: string;
  coverImage: string | null;
  author: string | null;
  readTime: string | null;
  publishedAt: string;
}

interface Props {
  post: ApiBlogPost | null;
  onClose: () => void;
}

export function BlogModal({ post, onClose }: Props) {
  const lang = useSiteStore((s) => s.lang);

  if (!post) return null;

  const title = lang === "fr" ? post.title : (post.titleEn || post.title);
  const content = lang === "fr" ? post.content : (post.contentEn || post.content);
  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <AnimatePresence>
      {post && (
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-coal border border-border shadow-2xl"
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
              {post.coverImage && (
                <div className="relative h-56 md:h-72 w-full overflow-hidden shrink-0">
                  <img
                    src={post.coverImage}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal to-transparent" />
                </div>
              )}

              <div className={`p-8 md:p-12 ${post.coverImage ? "-mt-12 relative z-10" : "pt-14"}`}>
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-gold/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-bright border border-gold/40">
                    {post.category}
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-ivory mb-4 leading-tight">
                  {title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-ivory/60 mb-8 pb-8 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {date}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  )}
                  {post.author && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                  )}
                </div>

                <article className="max-w-none text-ivory/85 [&_a]:text-gold [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-ivory [&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_h1]:font-display [&_h1]:text-2xl [&_h1]:text-ivory [&_h1]:mt-8 [&_h1]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ivory [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:font-display [&_h3]:text-lg [&_h3]:text-ivory [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-ivory/70 [&_code]:rounded [&_code]:bg-obsidian/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-gold-bright [&_img]:rounded-xl [&_img]:my-4">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </article>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
