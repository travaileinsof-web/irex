"use client";

import { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
 children: ReactNode;
 className?: string;
 onClick?: () => void;
 variant?: "primary" | "outline" | "ghost";
 strength?: number;
 type?: "button" | "submit";
}

/**
 * Magnetic button — moves slightly toward the cursor for premium tactile feel
 */
export function MagneticButton({
 children,
 className = "",
 onClick,
 variant = "primary",
 strength = 0.3,
 type = "button",
}: MagneticButtonProps) {
 const ref = useRef<HTMLButtonElement>(null);
 const [transform, setTransform] = useState({ x: 0, y: 0 });

 const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
 if (!ref.current) return;
 const rect = ref.current.getBoundingClientRect();
 const relX = e.clientX - rect.left - rect.width / 2;
 const relY = e.clientY - rect.top - rect.height / 2;
 setTransform({ x: relX * strength, y: relY * strength });
 };

 const handleLeave = () => setTransform({ x: 0, y: 0 });

 const base =
 "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 overflow-hidden";
 const variants = {
 primary:
 "bg-gradient-to-r from-gold to-copper text-obsidian hover:from-gold-bright hover:to-copper-light shadow-[0_8px_30px_-8px_rgba(212,165,71,0.5)]",
 outline:
 "border border-gold/40 text-gold hover:border-gold hover:bg-gold/5",
 ghost: "text-ivory hover:text-gold",
 };

 return (
 <motion.button
 ref={ref}
 type={type}
 className={`${base} ${variants[variant]} ${className}`}
 onMouseMove={handleMove}
 onMouseLeave={handleLeave}
 onClick={onClick}
 animate={{ x: transform.x, y: transform.y }}
 transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
 whileTap={{ scale: 0.96 }}
 >
 {/* Shimmer overlay for primary */}
 {variant === "primary" && (
 <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
 )}
 <span className="relative z-10 flex items-center gap-2">{children}</span>
 </motion.button>
 );
}
