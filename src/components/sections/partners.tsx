"use client";

import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";

interface ApiPartner {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
}

export function Partners() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].partners;
  const { data: items } = useFetch<ApiPartner[]>("/api/partners");
  const list = (items || []).map(p => p.name);
  const marqueeItems = list.length > 0 ? [...list, ...list] : [];

  return (
    <section className="relative border-y border-obsidian/10 bg-bone py-20 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="badge-premium mb-4 mx-auto">{c.tag}</span>
            <h2 className="font-display text-2xl font-bold text-obsidian md:text-3xl">{c.title}</h2>
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-bone to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-bone to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-16 py-6">
          {marqueeItems.map((name, i) => {
            const partner = (items || []).find(p => p.name === name);
            return (
              <div
                key={i}
                className="group flex items-center gap-3 opacity-60 transition-all duration-500 hover:opacity-100"
                data-cursor="hover"
              >
                {partner?.logo ? (
                  <img src={partner.logo} alt={name} className="h-8 w-auto object-contain" />
                ) : (
                  <>
                    <div className="hexagon h-8 w-8 bg-gradient-to-br from-gold/30 to-emerald/30 flex items-center justify-center group-hover:from-gold group-hover:to-emerald transition-all">
                      <div className="hexagon h-7 w-7 bg-bone flex items-center justify-center">
                        <span className="font-display text-[10px] font-bold text-copper">{name.charAt(0)}</span>
                      </div>
                    </div>
                    <span className="font-display text-lg font-semibold tracking-wide text-obsidian whitespace-nowrap group-hover:text-copper transition-colors">
                      {name}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
