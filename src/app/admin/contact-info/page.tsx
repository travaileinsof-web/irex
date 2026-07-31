"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Field, Input, Textarea } from "@/components/admin/entity-modal";
import { toast } from "sonner";

interface SocialLink {
  platform: string;
  url: string;
}

interface ContactInfo {
  id: string;
  address: string;
  phones: string[];
  emails: string[];
  socials: SocialLink[];
  hours: string;
  hoursEn: string;
  mapUrl: string;
}

const PLATFORMS = ["LinkedIn", "Facebook", "Twitter", "Instagram", "YouTube", "WhatsApp"];

export default function AdminContactInfoPage() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/contact-info?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          if (!data.phones) data.phones = [];
          if (!data.emails) data.emails = [];
          if (!data.socials) data.socials = [];
          setInfo(data);
        } else {
          setInfo({ id: "", address: "", phones: [""], emails: [""], socials: [], hours: "", hoursEn: "", mapUrl: "" });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    
    // Clean up empty fields
    const cleanedInfo = {
      ...info,
      phones: info.phones.filter(p => p.trim() !== ""),
      emails: info.emails.filter(em => em.trim() !== ""),
      socials: info.socials.filter(s => s.platform && s.url.trim() !== ""),
    };

    setSaving(true);
    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedInfo),
      });
      if (!res.ok) throw new Error();
      setInfo(await res.json());
      toast.success("Contact info saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const updateArray = (field: "phones" | "emails", index: number, value: string) => {
    if (!info) return;
    const newArr = [...info[field]];
    newArr[index] = value;
    setInfo({ ...info, [field]: newArr });
  };

  const removeArrayItem = (field: "phones" | "emails", index: number) => {
    if (!info) return;
    const newArr = info[field].filter((_, i) => i !== index);
    setInfo({ ...info, [field]: newArr });
  };

  const addArrayItem = (field: "phones" | "emails") => {
    if (!info) return;
    setInfo({ ...info, [field]: [...info[field], ""] });
  };

  // Socials
  const updateSocial = (index: number, key: "platform" | "url", value: string) => {
    if (!info) return;
    const newArr = [...info.socials];
    newArr[index] = { ...newArr[index], [key]: value };
    setInfo({ ...info, socials: newArr });
  };
  const removeSocial = (index: number) => {
    if (!info) return;
    const newArr = info.socials.filter((_, i) => i !== index);
    setInfo({ ...info, socials: newArr });
  };
  const addSocial = () => {
    if (!info) return;
    setInfo({ ...info, socials: [...info.socials, { platform: "LinkedIn", url: "" }] });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ivory">Contact Information</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the contact details shown on your website
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl space-y-8">
        {/* Address & Hours */}
        <div className="space-y-5 rounded-2xl border border-obsidian bg-graphite/10 p-6">
          <h2 className="text-sm font-semibold tracking-wide text-ivory uppercase">Adresse & Horaires</h2>
          <Field label="Address" required>
            <Textarea
              required
              rows={2}
              value={info?.address || ""}
              onChange={(e) => setInfo(info ? { ...info, address: e.target.value } : null)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Hours (FR)" required>
              <Textarea
                required
                rows={2}
                value={info?.hours || ""}
                onChange={(e) => setInfo(info ? { ...info, hours: e.target.value } : null)}
              />
            </Field>
            <Field label="Hours (EN)">
              <Textarea
                rows={2}
                value={info?.hoursEn || ""}
                onChange={(e) => setInfo(info ? { ...info, hoursEn: e.target.value } : null)}
              />
            </Field>
          </div>
        </div>

        {/* Phones & Emails */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Phones */}
          <div className="space-y-4 rounded-2xl border border-obsidian bg-graphite/10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-ivory uppercase">Téléphones</h2>
              <button type="button" onClick={() => addArrayItem("phones")} className="text-gold hover:text-gold-bright"><Plus className="h-4 w-4" /></button>
            </div>
            {info?.phones.map((phone, i) => (
              <div key={i} className="flex gap-2">
                <Input value={phone} onChange={(e) => updateArray("phones", i, e.target.value)} placeholder="+224 ..." />
                <button type="button" onClick={() => removeArrayItem("phones", i)} className="text-copper hover:text-red-400 p-2"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            {info?.phones.length === 0 && <p className="text-xs text-muted-foreground">Aucun numéro</p>}
          </div>

          {/* Emails */}
          <div className="space-y-4 rounded-2xl border border-obsidian bg-graphite/10 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-ivory uppercase">Emails</h2>
              <button type="button" onClick={() => addArrayItem("emails")} className="text-gold hover:text-gold-bright"><Plus className="h-4 w-4" /></button>
            </div>
            {info?.emails.map((email, i) => (
              <div key={i} className="flex gap-2">
                <Input type="email" value={email} onChange={(e) => updateArray("emails", i, e.target.value)} placeholder="contact@..." />
                <button type="button" onClick={() => removeArrayItem("emails", i)} className="text-copper hover:text-red-400 p-2"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            {info?.emails.length === 0 && <p className="text-xs text-muted-foreground">Aucun e-mail</p>}
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4 rounded-2xl border border-obsidian bg-graphite/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-ivory uppercase">Réseaux Sociaux</h2>
            <button type="button" onClick={addSocial} className="text-gold hover:text-gold-bright flex items-center gap-1 text-xs font-semibold"><Plus className="h-3 w-3" /> Ajouter</button>
          </div>
          <div className="space-y-3">
            {info?.socials.map((social, i) => (
              <div key={i} className="flex items-center gap-2">
                <select 
                  className="rounded-xl border border-border bg-obsidian px-3 py-2.5 text-sm text-ivory outline-none focus:border-gold"
                  value={social.platform} 
                  onChange={(e) => updateSocial(i, "platform", e.target.value)}
                >
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <div className="flex-1">
                  <Input value={social.url} onChange={(e) => updateSocial(i, "url", e.target.value)} placeholder="URL (https://...)" />
                </div>
                <button type="button" onClick={() => removeSocial(i)} className="text-copper hover:text-red-400 p-2"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            {info?.socials.length === 0 && <p className="text-xs text-muted-foreground">Aucun réseau social</p>}
          </div>
        </div>

        {/* Map */}
        <div className="space-y-4 rounded-2xl border border-obsidian bg-graphite/10 p-6">
          <Field label="Google Maps Embed URL">
            <Input
              value={info?.mapUrl || ""}
              onChange={(e) => setInfo(info ? { ...info, mapUrl: e.target.value } : null)}
              placeholder="https://www.google.com/maps?q=...&output=embed"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Go to Google Maps → search your address → Share → Embed map → copy the src URL
            </p>
          </Field>
          {info?.mapUrl && (
            <div className="rounded-xl border border-border bg-obsidian p-3 mt-4">
              <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Preview</div>
              <iframe
                src={info.mapUrl}
                className="h-64 w-full rounded-lg"
                style={{ border: 0 }}
                loading="lazy"
                title="Map preview"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-border pt-5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
          >
            {saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Enregistrement...</>
            ) : (
              <><Save className="h-4 w-4" /> Sauvegarder</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
