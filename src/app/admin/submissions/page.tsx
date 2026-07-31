"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Building, MessageSquare, Trash2, Loader2, Filter, CheckCircle, Circle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  type: string;
  productId: string | null;
  product?: { name: string } | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const statusConfig = {
  new: { label: "New", color: "text-gold", bg: "bg-gold/15", icon: Circle },
  read: { label: "Read", color: "text-blue-400", bg: "bg-blue-500/15", icon: Clock },
  handled: { label: "Handled", color: "text-emerald-400", bg: "bg-emerald-500/15", icon: CheckCircle },
};

const typeLabels: Record<string, string> = {
  product_inquiry: "Product Inquiry",
  contact: "Contact Form",
  career: "Career Application",
  donation: "Donation",
};

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Defer to avoid a synchronous setState during the effect commit phase.
    Promise.resolve().then(() => fetchItems());
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setItems((items) =>
        items.map((it) => (it.id === id ? { ...it, status } : it))
      );
      if (selected?.id === id) {
        setSelected({ ...selected, status });
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((items) => items.filter((it) => it.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = items.filter((s) => filter === "all" || s.status === filter);

  const counts = {
    all: items.length,
    new: items.filter((s) => s.status === "new").length,
    read: items.filter((s) => s.status === "read").length,
    handled: items.filter((s) => s.status === "handled").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ivory">Inbox</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Form submissions from your website visitors
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-2">
        {(["all", "new", "read", "handled"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
              filter === status
                ? "bg-gradient-to-r from-gold to-copper text-obsidian"
                : "border border-border text-ivory/70 hover:border-gold/30 hover:text-ivory"
            }`}
          >
            {status === "all" ? "All" : statusConfig[status as keyof typeof statusConfig]?.label}
            <span className="ml-2 opacity-60">{counts[status]}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-coal p-20 text-center">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No submissions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub) => {
            const cfg = statusConfig[sub.status as keyof typeof statusConfig] || statusConfig.new;
            return (
              <div
                key={sub.id}
                className={`rounded-2xl border bg-coal p-5 transition-all hover:border-gold/30 cursor-pointer ${
                  sub.status === "new" ? "border-gold/30" : "border-border"
                }`}
                onClick={() => {
                  setSelected(sub);
                  if (sub.status === "new") updateStatus(sub.id, "read");
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.bg} ${cfg.color}`}>
                        <cfg.icon className="h-3 w-3" />
                        {cfg.label}
                      </span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {typeLabels[sub.type] || sub.type}
                      </span>
                      {sub.product && (
                        <span className="text-xs text-gold">Product: {sub.product.name}</span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-ivory">
                      {sub.subject || sub.message.slice(0, 80) + "..."}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> {sub.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {sub.email}
                      </span>
                      {sub.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {sub.phone}
                        </span>
                      )}
                      {sub.company && (
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" /> {sub.company}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-ivory/80 line-clamp-2">{sub.message}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {sub.status !== "handled" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(sub.id, "handled");
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-emerald hover:text-emerald transition-colors"
                        title="Mark as handled"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(sub.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-red-500 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-obsidian/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl my-8 rounded-2xl border border-border bg-coal shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-border p-6">
              <h2 className="font-display text-xl font-bold text-ivory">
                {selected.subject || "Submission detail"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Type</div>
                  <div className="mt-1 text-ivory">{typeLabels[selected.type] || selected.type}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</div>
                  <div className="mt-1 text-ivory">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Name</div>
                  <div className="mt-1 text-ivory">{selected.name}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href={`mailto:${selected.email}`} className="mt-1 text-gold hover:underline">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</div>
                    <a href={`tel:${selected.phone}`} className="mt-1 text-gold hover:underline">{selected.phone}</a>
                  </div>
                )}
                {selected.company && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Company</div>
                    <div className="mt-1 text-ivory">{selected.company}</div>
                  </div>
                )}
                {selected.product && (
                  <div className="col-span-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Product Interest</div>
                    <div className="mt-1 text-gold">{selected.product.name}</div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Message</div>
                <div className="mt-2 rounded-lg border border-border bg-obsidian p-4 text-sm text-ivory whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
              <div className="flex justify-between gap-3 border-t border-border pt-4">
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="rounded-lg border border-border bg-obsidian px-3 py-2 text-sm text-ivory focus:border-gold focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="handled">Handled</option>
                </select>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Your inquiry")}`}
                  className="rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2 text-sm font-medium text-obsidian hover:from-gold-bright hover:to-copper-light"
                >
                  Reply by Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
