"use client";

import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";

function subscribeEnabled(callback: () => void) {
 if (typeof window === "undefined") return () => {};
 const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
 mq.addEventListener("change", callback);
 return () => mq.removeEventListener("change", callback);
}
function getEnabledSnapshot() {
 if (typeof window === "undefined") return false;
 return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
function getServerSnapshot() {
 return false;
}

/**
 * Premium custom cursor — magnetic dot + outline ring
 * Tracks mouse, expands on interactive elements, hides on touch devices
 */
export function CustomCursor() {
 const enabled = useSyncExternalStore(subscribeEnabled, getEnabledSnapshot, getServerSnapshot);
 const hoveringRef = useRef(false);
 const downRef = useRef(false);
 const dotRef = useRef<HTMLDivElement>(null);
 const ringRef = useRef<HTMLDivElement>(null);
 const pos = useRef({ x: 0, y: 0 });
 const ringPos = useRef({ x: 0, y: 0 });
 const raf = useRef<number>(0);

 useEffect(() => {
 if (!enabled) return;
 document.body.classList.add("custom-cursor-active");

 const onMove = (e: MouseEvent) => {
 pos.current = { x: e.clientX, y: e.clientY };
 if (dotRef.current) {
 dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
 }
 const target = e.target as HTMLElement;
 const interactive = target.closest("a, button, [data-cursor='hover'], input, textarea, select, [role='button']");
 hoveringRef.current = Boolean(interactive);
 if (ringRef.current) {
 const isHovering = hoveringRef.current;
 ringRef.current.style.borderColor = isHovering ? "var(--gold-bright)" : "rgba(212, 165, 71, 0.5)";
 ringRef.current.style.backgroundColor = isHovering ? "rgba(212, 165, 71, 0.08)" : "transparent";
 }
 if (dotRef.current) {
 const isHovering = hoveringRef.current;
 dotRef.current.style.backgroundColor = isHovering ? "transparent" : "var(--gold)";
 }
 };
 const onDown = () => {
 downRef.current = true;
 if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace("scale(1)", "scale(0.7)");
 };
 const onUp = () => {
 downRef.current = false;
 };

 window.addEventListener("mousemove", onMove);
 window.addEventListener("mousedown", onDown);
 window.addEventListener("mouseup", onUp);

 const loop = () => {
 ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
 ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
 if (ringRef.current) {
 const size = hoveringRef.current ? 56 : 32;
 ringRef.current.style.transform = `translate3d(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px, 0) ${downRef.current ? "scale(0.7)" : "scale(1)"}`;
 ringRef.current.style.width = `${size}px`;
 ringRef.current.style.height = `${size}px`;
 }
 raf.current = requestAnimationFrame(loop);
 };
 loop();

 return () => {
 window.removeEventListener("mousemove", onMove);
 window.removeEventListener("mousedown", onDown);
 window.removeEventListener("mouseup", onUp);
 cancelAnimationFrame(raf.current);
 document.body.classList.remove("custom-cursor-active");
 };
 }, [enabled]);

 if (!enabled) return null;

 return (
 <>
 <div
 ref={dotRef}
 className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
 style={{
 backgroundColor: "var(--gold)",
 transition: "background-color 0.2s ease",
 mixBlendMode: "difference",
 }}
 />
 <div
 ref={ringRef}
 className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
 style={{
 border: "1px solid rgba(212, 165, 71, 0.5)",
 transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background-color 0.3s ease",
 }}
 />
 </>
 );
}
