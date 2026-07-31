"use client";

import { create } from "zustand";
import type { Lang, Section } from "./content";

interface SiteState {
  lang: Lang;
  section: Section;
  isMenuOpen: boolean;
  isChatbotOpen: boolean;
  isLoaded: boolean;
  visibleSections: Record<string, boolean>;
  setLang: (lang: Lang) => void;
  setSection: (section: Section) => void;
  setMenuOpen: (open: boolean) => void;
  setChatbotOpen: (open: boolean) => void;
  setLoaded: (loaded: boolean) => void;
  setVisibleSections: (sections: Record<string, boolean>) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  lang: "fr",
  section: "home",
  isMenuOpen: false,
  isChatbotOpen: false,
  isLoaded: false,
  visibleSections: {}, // By default, all sections are visible unless specified false
  setLang: (lang) => set({ lang }),
  setSection: (section) => set({ section, isMenuOpen: false }),
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  setChatbotOpen: (isChatbotOpen) => set({ isChatbotOpen }),
  setLoaded: (isLoaded) => set({ isLoaded }),
  setVisibleSections: (visibleSections) => set({ visibleSections }),
}));
