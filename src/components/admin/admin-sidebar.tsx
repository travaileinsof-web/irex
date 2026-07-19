"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
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
  BarChart3,
  Inbox,
  MapPin,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "./admin-auth-provider";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Inbox", icon: Inbox, badgeKey: "newSubmissions" },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/careers", label: "Careers", icon: Megaphone },
  { href: "/admin/donations", label: "Donations", icon: HeartHandshake },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/contact-info", label: "Contact Info", icon: MapPin },
];

export function AdminSidebar({ counts }: { counts?: Record<string, number> }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-coal">
      {/* Logo */}
      <div className="border-b border-border p-6">
        <Link href="/admin" className="inline-block">
          <Logo size={36} />
        </Link>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Admin Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const badge = item.badgeKey && counts?.[item.badgeKey]
            ? counts[item.badgeKey]
            : null;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group mb-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-gradient-to-r from-gold to-copper font-medium text-obsidian"
                  : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
              )}
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
              {badge && (
                <span className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                  isActive ? "bg-obsidian text-gold" : "bg-gold text-obsidian"
                )}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ivory/70 hover:bg-white/5 hover:text-ivory transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-ivory/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
