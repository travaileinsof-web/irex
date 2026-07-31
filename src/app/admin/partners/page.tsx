"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { useCrud } from "@/hooks/use-crud";
import { EntityModal, Field, Input, Textarea, Select } from "@/components/admin/entity-modal";
import { Entity, inputValue } from "@/types/entity";

type Item = Entity;


export default function AdminPartnersPage() {
  const { items, loading, create, update, remove } = useCrud<Item>("/api/partners");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<Item>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ published: true, order: 0 });
    setModalOpen(true);
  };

  const openEdit = (p: Item) => {
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

  const filtered = items.filter(
    (p) => !search || JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Partners</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-coal py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none"
        />
      </div>

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
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-sm text-ivory">{item.name || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-gold hover:text-gold transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ivory hover:border-red-500 hover:text-red-400 transition-colors"
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

      <EntityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit" : "Add"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" required>
            <Input
              required
              value={inputValue(form.name)}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Logo URL" >
            <Input
              
              value={inputValue(form.logo)}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
            />
          </Field>
          <Field label="Website URL" >
            <Input
              
              value={inputValue(form.website)}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </Field>
          <Field label="Order" >
            <Input
              type="number"
              
              value={inputValue(form.order)}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
            />
          </Field>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ivory">
              <input
                type="checkbox"
                checked={(form.published as boolean) || false}
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
              {editing ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </EntityModal>
    </div>
  );
}
