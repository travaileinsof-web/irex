"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteStore } from "@/lib/store";

// Premium UX components
import { CustomCursor } from "@/components/site/custom-cursor";
import { PageLoader } from "@/components/site/page-loader";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";

// Sections
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Projects } from "@/components/sections/projects";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Partners } from "@/components/sections/partners";
import { Blog } from "@/components/sections/blog";
import { Events } from "@/components/sections/events";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Careers } from "@/components/sections/careers";
import { Donations } from "@/components/sections/donations";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  const section = useSiteStore((s) => s.section);
  const isLoaded = useSiteStore((s) => s.isLoaded);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section]);

  return (
    <>
      <CustomCursor />
      <PageLoader />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen"
        >
          {section === "home" && (
            <>
              <Hero />
              <Partners />
              <About />
              <Services />
              <Stats />
              <Products />
              <Projects />
              <Testimonials />
              <Team />
              <Blog />
              <Events />
              <CtaBanner />
              <FAQ />
              <Contact />
            </>
          )}
          {section === "about" && (
            <>
              <About />
              <Stats />
              <Team />
              <Partners />
            </>
          )}
          {section === "services" && (
            <>
              <div className="pt-20" />
              <Services />
              <Products />
              <Projects />
              <CtaBanner />
            </>
          )}
          {section === "products" && (
            <>
              <div className="pt-20" />
              <Products />
              <CtaBanner />
              <FAQ />
            </>
          )}
          {section === "projects" && (
            <>
              <div className="pt-20" />
              <Projects />
              <Stats />
              <Testimonials />
            </>
          )}
          {section === "team" && (
            <>
              <div className="pt-20" />
              <Team />
              <Partners />
              <Careers />
            </>
          )}
          {section === "blog" && (
            <>
              <div className="pt-20" />
              <Blog />
              <Events />
            </>
          )}
          {section === "events" && (
            <>
              <div className="pt-20" />
              <Events />
              <Blog />
            </>
          )}
          {section === "careers" && (
            <>
              <div className="pt-20" />
              <Careers />
              <CtaBanner />
            </>
          )}
          {section === "donations" && (
            <>
              <div className="pt-20" />
              <Donations />
              <Testimonials />
            </>
          )}
          {section === "faq" && (
            <>
              <div className="pt-20" />
              <FAQ />
              <Contact />
            </>
          )}
          {section === "contact" && (
            <>
              <div className="pt-20" />
              <Contact />
              <CtaBanner />
            </>
          )}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <Chatbot />
    </>
  );
}
