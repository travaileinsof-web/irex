"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Field, Input, Textarea } from "@/components/admin/entity-modal";

export default function AdminAboutPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((json) => {
        // Convert paragraphs arrays to newline-separated strings for editing
        json.fr.paragraphsStr = json.fr.paragraphs.join("\n\n");
        json.en.paragraphsStr = json.en.paragraphs.join("\n\n");
        setData(json);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    // Convert paragraphsStr back to arrays
    const payload = JSON.parse(JSON.stringify(data));
    payload.fr.paragraphs = payload.fr.paragraphsStr.split("\n\n").filter(Boolean);
    payload.en.paragraphs = payload.en.paragraphsStr.split("\n\n").filter(Boolean);
    delete payload.fr.paragraphsStr;
    delete payload.en.paragraphsStr;

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("Contenu mis à jour avec succès !");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Erreur lors de la sauvegarde.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur de connexion.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (fieldPath: string, value: string) => {
    const keys = fieldPath.split(".");
    setData((prev: any) => {
      const newData = { ...prev };
      let current = newData[lang];
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  const d = data[lang];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Page "À Propos"</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modifiez le contenu textuel de la section À Propos.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg bg-obsidian p-1">
            <button
              onClick={() => setLang("fr")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                lang === "fr" ? "bg-coal text-gold" : "text-muted-foreground hover:text-ivory"
              }`}
            >
              Français
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                lang === "en" ? "bg-coal text-gold" : "text-muted-foreground hover:text-ivory"
              }`}
            >
              English
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Sauvegarder
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400">
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* General Info */}
        <div className="rounded-2xl border border-border bg-coal p-6">
          <h2 className="mb-4 text-lg font-bold text-gold">Informations Générales</h2>
          <div className="grid gap-4">
            <Field label="Tag (Badge)">
              <Input value={d.tag} onChange={(e) => handleChange("tag", e.target.value)} />
            </Field>
            <Field label="Titre">
              <Input value={d.title} onChange={(e) => handleChange("title", e.target.value)} />
            </Field>
            <Field label="Sous-titre (Lead)">
              <Textarea rows={2} value={d.lead} onChange={(e) => handleChange("lead", e.target.value)} />
            </Field>
            <Field label="Paragraphes (sauter une ligne entre chaque)">
              <Textarea rows={6} value={d.paragraphsStr} onChange={(e) => handleChange("paragraphsStr", e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-coal p-6">
            <h2 className="mb-4 text-lg font-bold text-gold">Mission</h2>
            <div className="grid gap-4">
              <Field label="Titre">
                <Input value={d.mission.title} onChange={(e) => handleChange("mission.title", e.target.value)} />
              </Field>
              <Field label="Texte">
                <Textarea rows={3} value={d.mission.text} onChange={(e) => handleChange("mission.text", e.target.value)} />
              </Field>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-coal p-6">
            <h2 className="mb-4 text-lg font-bold text-gold">Vision</h2>
            <div className="grid gap-4">
              <Field label="Titre">
                <Input value={d.vision.title} onChange={(e) => handleChange("vision.title", e.target.value)} />
              </Field>
              <Field label="Texte">
                <Textarea rows={3} value={d.vision.text} onChange={(e) => handleChange("vision.text", e.target.value)} />
              </Field>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="rounded-2xl border border-border bg-coal p-6">
          <h2 className="mb-4 text-lg font-bold text-gold">Nos Valeurs (4 piliers)</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-obsidian/50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-ivory/60">Valeur 0{i + 1}</h3>
                <div className="grid gap-3">
                  <Field label="Titre">
                    <Input
                      value={d.values[i].title}
                      onChange={(e) => handleChange(`values.${i}.title`, e.target.value)}
                    />
                  </Field>
                  <Field label="Description">
                    <Textarea
                      rows={2}
                      value={d.values[i].desc}
                      onChange={(e) => handleChange(`values.${i}.desc`, e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
