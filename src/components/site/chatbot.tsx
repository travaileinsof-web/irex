"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";

interface Message {
  role: "bot" | "user";
  text: string;
}

export function Chatbot() {
  const lang = useSiteStore((s) => s.lang);
  const isChatbotOpen = useSiteStore((s) => s.isChatbotOpen);
  const setChatbotOpen = useSiteStore((s) => s.setChatbotOpen);
  const c = content[lang].chatbot;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggle = () => {
    if (!isChatbotOpen && messages.length === 0) {
      // First open: seed greeting
      setMessages([{ role: "bot", text: c.greeting }]);
    }
    setChatbotOpen(!isChatbotOpen);
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: c.response }]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={handleToggle}
        data-cursor="hover"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper text-obsidian shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)] transition-all hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat"
      >
        <AnimatePresence mode="wait">
          {isChatbotOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Ping animation when closed */}
        {!isChatbotOpen && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40 opacity-60" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-gold/20 bg-coal shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-gold/10 to-copper/10 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper">
                    <Bot className="h-5 w-5 text-obsidian" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-coal bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ivory">{c.title}</h3>
                  <p className="text-[10px] text-emerald-300">{c.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setChatbotOpen(false)}
                data-cursor="hover"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5 hover:text-ivory transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                    msg.role === "bot"
                      ? "bg-gradient-to-br from-gold to-copper"
                      : "bg-border"
                  }`}>
                    {msg.role === "bot" ? (
                      <Bot className="h-3.5 w-3.5 text-obsidian" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-ivory" />
                    )}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "bot"
                      ? "rounded-tl-sm bg-coal text-ivory border border-border"
                      : "rounded-tr-sm bg-gradient-to-br from-gold to-copper text-obsidian font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && messages.length > 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {c.quick.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q)}
                    data-cursor="hover"
                    className="rounded-full border border-border bg-coal px-3 py-1.5 text-xs text-ivory transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-obsidian p-1.5 pl-4 focus-within:border-gold/40 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={c.placeholder}
                  className="flex-1 bg-transparent text-sm text-ivory placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold to-copper text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
