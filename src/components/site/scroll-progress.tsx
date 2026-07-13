"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar — uses native scroll event + CSS transform (no Framer Motion)
 * Throttled via requestAnimationFrame for max performance
 */
export function ScrollProgress() {
 const barRef = useRef<HTMLDivElement>(null);
 const ticking = useRef(false);

 useEffect(() => {
 const update = () => {
 const scrollTop = window.scrollY;
 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
 if (barRef.current) {
 // Use transform instead of width for GPU acceleration
 barRef.current.style.transform = `scaleX(${progress})`;
 }
 ticking.current = false;
 };

 const onScroll = () => {
 if (!ticking.current) {
 window.requestAnimationFrame(update);
 ticking.current = true;
 }
 };

 window.addEventListener("scroll", onScroll, { passive: true });
 update(); // initial

 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 return (
 <div
 ref={barRef}
 className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-gold via-gold-bright to-copper gpu"
 style={{ transform: "scaleX(0)", willChange: "transform" }}
 />
 );
}
