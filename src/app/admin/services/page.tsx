"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { useCrud } from "@/hooks/use-crud";
import { DeleteConfirmModal, EntityModal, Field, Input, Textarea } from "@/components/admin/entity-modal";

interface Service {
  id: string;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  icon: string | null;
  image: string | null;
  features: string;
  featuresEn: string | null;
  published: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const { items, loading, create, update, remove } = useCrud<Service>("/api/services");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<Service>>({});
  const [pendingDelete, setPendingDelete] = useState<Service | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({
      published: true,
      order: 0,
      features: "",
    });
    setModalOpen(true);
  };

  const openEdit = (p: Service) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await update(editing.id, form);
    } else {
      await create(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    const deleted = await remove(pendingDelete.id);
    if (deleted) setPendingDelete(null);
  };

  const filtered = items.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Services / Expertises</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} items — manage your expertise domains
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-coal py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-coal">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-obsidian/50">
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Image</th>
                  <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-ivory">{p.title}</div>
                      {p.titleEn && <div className="text-xs text-muted-foreground">{p.titleEn}</div>}
                    </td>
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="h-14 w-20 rounded-lg border border-border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-border bg-obsidian px-2 text-center text-[10px] text-muted-foreground">
                          {p.icon || "No image"}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block h-2 w-2 rounded-full ${p.published ? "bg-emerald-400" : "bg-muted-foreground"}`} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-gold hover:text-gold transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setPendingDelete(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-red-500 hover:text-red-400 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        open={pendingDelete !== null}
        itemName={pendingDelete?.title || "this service"}
        itemType="service"
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
      />

      {/* Modal */}
      <EntityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Service" : "Add Service"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title (FR)" required>
              <Input
                required
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Exploration & Recherche"
              />
            </Field>
            <Field label="Title (EN)">
              <Input
                value={form.titleEn || ""}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                placeholder="Exploration & Research"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Description (FR)" required>
              <Textarea
                required
                rows={3}
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description en français..."
              />
            </Field>
            <Field label="Description (EN)">
              <Textarea
                rows={3}
                value={form.descriptionEn || ""}
                onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                placeholder="English description..."
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Features (FR) - One per line" required>
              <Textarea
                required
                rows={4}
                value={form.features || ""}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="Cartographie géologique&#10;Forage et échantillonnage"
              />
            </Field>
            <Field label="Features (EN) - One per line">
              <Textarea
                rows={4}
                value={form.featuresEn || ""}
                onChange={(e) => setForm({ ...form, featuresEn: e.target.value })}
                placeholder="Geological mapping&#10;Drilling and sampling"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Icon Name (lucide-react)">
              <Input
                value={form.icon || ""}
                onChange={(e) => setForm({ ...form, icon: e.target.value || null })}
                placeholder="compass, hard-hat, etc."
              />
            </Field>
            <Field label="Order">
              <Input
                type="number"
                value={form.order || 0}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              />
            </Field>
            <Field label="Image URL">
              <Input
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value || null })}
                placeholder="https://..."
              />
            </Field>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ivory">
              <input
                type="checkbox"
                checked={form.published ?? true}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-gold"
              />
              Published
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full border border-border px-5 py-2 text-sm text-ivory hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
            >
              {editing ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </EntityModal>
    </div>
  );
}
