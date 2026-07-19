"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  Briefcase,
  Users,
  FileText,
  Calendar,
  Megaphone,
  HeartHandshake,
  HelpCircle,
  Handshake,
  Inbox,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "@/components/site/logo";

interface DashboardStats {
  products: number;
  categories: number;
  projects: number;
  teamMembers: number;
  blogPosts: number;
  events: number;
  jobOpenings: number;
  donationTiers: number;
  faqItems: number;
  partners: number;
  submissions: number;
  newSubmissions: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Submissions", value: stats?.submissions ?? 0, icon: Inbox, href: "/admin/submissions", color: "from-red-500/20 to-orange-500/20", accent: "text-red-400", badge: stats?.newSubmissions ? `${stats.newSubmissions} new` : null },
    { label: "Products", value: stats?.products ?? 0, icon: Package, href: "/admin/products", color: "from-gold/20 to-copper/20", accent: "text-gold" },
    { label: "Categories", value: stats?.categories ?? 0, icon: FolderTree, href: "/admin/categories", color: "from-emerald/20 to-teal/20", accent: "text-emerald-light" },
    { label: "Projects", value: stats?.projects ?? 0, icon: Briefcase, href: "/admin/projects", color: "from-cyan/20 to-blue/20", accent: "text-cyan-300" },
    { label: "Team Members", value: stats?.teamMembers ?? 0, icon: Users, href: "/admin/team", color: "from-purple/20 to-pink/20", accent: "text-purple-300" },
    { label: "Blog Posts", value: stats?.blogPosts ?? 0, icon: FileText, href: "/admin/blog", color: "from-amber/20 to-yellow/20", accent: "text-amber-300" },
    { label: "Events", value: stats?.events ?? 0, icon: Calendar, href: "/admin/events", color: "from-rose/20 to-red/20", accent: "text-rose-300" },
    { label: "Job Openings", value: stats?.jobOpenings ?? 0, icon: Megaphone, href: "/admin/careers", color: "from-lime/20 to-green/20", accent: "text-lime-300" },
    { label: "Donation Tiers", value: stats?.donationTiers ?? 0, icon: HeartHandshake, href: "/admin/donations", color: "from-pink/20 to-rose/20", accent: "text-pink-300" },
    { label: "FAQ Items", value: stats?.faqItems ?? 0, icon: HelpCircle, href: "/admin/faq", color: "from-indigo/20 to-purple/20", accent: "text-indigo-300" },
    { label: "Partners", value: stats?.partners ?? 0, icon: Handshake, href: "/admin/partners", color: "from-teal/20 to-cyan/20", accent: "text-teal-300" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your IREX Mining website content in real-time
          </p>
        </div>
        <div className="hidden md:block">
          <Logo size={36} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-coal p-6 transition-all hover:border-gold/30 hover-lift"
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.color} blur-2xl opacity-50 transition-opacity group-hover:opacity-100`} />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {card.label}
                </div>
                <div className="mt-2 font-display text-4xl font-bold text-ivory">
                  {card.value}
                </div>
                {card.badge && (
                  <div className="mt-2 inline-block rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                    {card.badge}
                  </div>
                )}
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${card.accent}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="relative mt-4 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-gold transition-colors">
              Manage <ArrowUpRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10 rounded-3xl border border-border bg-coal p-8">
        <div className="mb-4 flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-gold" />
          <h2 className="font-display text-xl font-bold text-ivory">Quick Actions</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/products" className="flex items-center gap-3 rounded-xl border border-border bg-obsidian p-4 text-sm text-ivory hover:border-gold/30 transition-colors">
            <Package className="h-4 w-4 text-gold" /> Add Product
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 rounded-xl border border-border bg-obsidian p-4 text-sm text-ivory hover:border-gold/30 transition-colors">
            <Briefcase className="h-4 w-4 text-emerald-light" /> Add Project
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 rounded-xl border border-border bg-obsidian p-4 text-sm text-ivory hover:border-gold/30 transition-colors">
            <FileText className="h-4 w-4 text-amber-300" /> Write Article
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 rounded-xl border border-border bg-obsidian p-4 text-sm text-ivory hover:border-gold/30 transition-colors">
            <Users className="h-4 w-4 text-purple-300" /> Add Member
          </Link>
        </div>
      </div>
    </div>
  );
}
