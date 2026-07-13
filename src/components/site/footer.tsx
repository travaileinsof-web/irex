"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content, type Section } from "@/lib/content";
import { toast } from "sonner";

export function Footer() {
  const lang = useSiteStore((s) => s.lang);
  const setSection = useSiteStore((s) => s.setSection);
  const c = content[lang].footer;

  const go = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const columns: { title: string; links: { label: string; section?: Section }[] }[] = [
    {
      title: c.columns.company,
      links: [
        { label: content[lang].nav.about, section: "about" },
        { label: content[lang].nav.team, section: "team" },
        { label: content[lang].nav.careers, section: "careers" },
        { label: content[lang].nav.contact, section: "contact" },
      ],
    },
    {
      title: c.columns.services,
      links: [
        { label: content[lang].nav.services, section: "services" },
        { label: content[lang].nav.projects, section: "projects" },
        { label: content[lang].nav.blog, section: "blog" },
        { label: content[lang].nav.events, section: "events" },
      ],
    },
    {
      title: c.columns.shop,
      links: [
        { label: content[lang].nav.products, section: "products" },
        { label: content[lang].nav.donations, section: "donations" },
      ],
    },
    {
      title: c.columns.resources,
      links: [
        { label: content[lang].nav.faq, section: "faq" },
        { label: c.legal[0] },
        { label: c.legal[1] },
        { label: c.legal[2] },
      ],
    },
  ];

  return (
    <footer className="relative bg-obsidian pt-20">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Top section */}
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_2fr_1fr]">
          {/* Brand */}
          <div>
            <button onClick={() => go("home")} className="group flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 hexagon bg-gradient-to-br from-gold to-copper" />
                <div className="absolute inset-[2px] hexagon bg-obsidian flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-gradient-gold">I</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-sm font-bold tracking-[0.25em] text-ivory">IREX</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground">Mining</span>
              </div>
            </button>
            <p className="mt-2 font-display text-sm font-medium text-gold">{c.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{c.description}</p>

            {/* Contact info */}
            <div className="mt-6 space-y-2 text-sm">
              <a href="tel:626683232" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors" data-cursor="hover">
                <Phone className="h-3.5 w-3.5" />
                626 68 32 32
              </a>
              <a href="mailto:irexmine1@outlook.com" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors" data-cursor="hover">
                <Mail className="h-3.5 w-3.5" />
                irexmine1@outlook.com
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>Matoto Centre, Conakry — Guinea</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col, i) => (
              <div key={i}>
                <h4 className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gold">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => link.section && go(link.section)}
                        data-cursor="hover"
                        className="text-sm text-muted-foreground transition-colors hover:text-ivory gold-underline"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-2 font-display text-lg font-bold text-ivory">{c.newsletter.title}</h4>
            <p className="mb-4 text-sm text-muted-foreground">{c.newsletter.text}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(lang === "fr" ? "Inscription confirmée !" : "Subscription confirmed!");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-coal p-1.5 pl-4 focus-within:border-gold/40 transition-colors">
                <input
                  type="email"
                  required
                  placeholder={c.newsletter.placeholder}
                  className="flex-1 bg-transparent text-sm text-ivory placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold to-copper text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
                  aria-label={c.newsletter.cta}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

            {/* Back to top */}
            <button
              onClick={scrollTop}
              data-cursor="hover"
              className="mt-6 group flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-gold/40 transition-colors">
                <ArrowUp className="h-3 w-3" />
              </span>
              {lang === "fr" ? "Haut de page" : "Back to top"}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IREX Mining. {c.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {c.legal.map((l, i) => (
              <button
                key={i}
                data-cursor="hover"
                className="text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Designed by</span>
            <span className="font-display font-bold text-gold">EINSOF DIGIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
