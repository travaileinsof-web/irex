"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

const hidableSections = [
  { id: "products", label: "Products" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "partners", label: "Partners" },
  { id: "blog", label: "Blog" },
  { id: "events", label: "Events" },
  { id: "careers", label: "Careers" },
  { id: "donations", label: "Donations" },
  { id: "faq", label: "FAQ" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/settings?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage("Settings saved successfully.");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Pages Visibility</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Show or hide specific pages/sections on the frontend.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
          Save Changes
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-coal p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="space-y-6">
            {message && (
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-green-400">
                {message}
              </div>
            )}
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hidableSections.map((section) => (
                <div key={section.id} className="flex items-center justify-between rounded-xl border border-border bg-obsidian/50 p-4">
                  <span className="font-medium text-ivory">{section.label}</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={settings[section.id] !== false} // Default to true if undefined
                      onChange={(e) => handleToggle(section.id, e.target.checked)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted-foreground/30 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gold peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold/50"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
