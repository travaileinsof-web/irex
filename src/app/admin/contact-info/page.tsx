"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Field, Input, Textarea } from "@/components/admin/entity-modal";
import { toast } from "sonner";

interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  hoursEn: string;
  mapUrl: string;
}

export default function AdminContactInfoPage() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact-info")
      .then((r) => r.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    setSaving(true);
    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) throw new Error();
      toast.success("Contact info saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
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

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <Field label="Address" required>
          <Textarea
            required
            rows={2}
            value={info?.address || ""}
            onChange={(e) => setInfo(info ? { ...info, address: e.target.value } : null)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" required>
            <Input
              required
              value={info?.phone || ""}
              onChange={(e) => setInfo(info ? { ...info, phone: e.target.value } : null)}
            />
          </Field>
          <Field label="Email" required>
            <Input
              type="email"
              required
              value={info?.email || ""}
              onChange={(e) => setInfo(info ? { ...info, email: e.target.value } : null)}
            />
          </Field>
        </div>

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
          <div className="rounded-xl border border-border bg-obsidian p-3">
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

        <div className="flex justify-end border-t border-border pt-5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
