"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAdminAuth();
  const [email, setEmail] = useState("admin@irexmining.com");
  const [password, setPassword] = useState("admin123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await login(email, password);
    if (result.ok) {
      router.push("/admin");
    } else {
      setError(result.error || "Login failed");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-2xl animate-blob-1 gpu"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
      />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-2xl animate-blob-2 gpu"
        style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }}
      />

      {/* Login card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-gold/15 bg-coal/80 p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <Logo size={48} />
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-ivory">Admin Dashboard</h1>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                IREX Mining — Sign in
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-obsidian py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  placeholder="admin@irexmining.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-obsidian py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-copper px-6 py-3 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-muted-foreground/60">
            Default credentials: admin@irexmining.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
