"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Loader2, Star } from "lucide-react";
import { useCrud } from "@/hooks/use-crud";
import { EntityModal, Field, Input, Textarea, Select } from "@/components/admin/entity-modal";
import { useFetch } from "@/hooks/use-fetch";

interface Product {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  descriptionEn: string | null;
  price: number;
  badge: string | null;
  image: string | null;
  type: string;
  categoryId: string;
  published: boolean;
  featured: boolean;
  order: number;
  category?: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price) + " GNF";
}

export default function AdminProductsPage() {
  const { items, loading, create, update, remove } = useCrud<Product>("/api/products");
  const { data: categories } = useFetch<Category[]>("/api/categories?all=true");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<Product>>({});

  const openCreate = () => {
    setEditing(null);
    setForm({
      type: "product",
      published: true,
      featured: false,
      order: 0,
      price: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
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
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} items — manage your shop inventory
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
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
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Image</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-obsidian flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">N/A</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ivory">{p.name}</span>
                        {p.featured && <Star className="h-3 w-3 fill-gold text-gold" />}
                        {p.badge && (
                          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold">{p.badge}</span>
                        )}
                      </div>
                      {p.nameEn && <div className="text-xs text-muted-foreground">{p.nameEn}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.category?.name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-ivory">{p.type}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-gold">{formatPrice(p.price)}</td>
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
                          onClick={() => remove(p.id)}
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

      {/* Modal */}
      <EntityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Product" : "Add Product"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name (FR)" required>
              <Input
                required
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Kit EPI Premium"
              />
            </Field>
            <Field label="Name (EN)">
              <Input
                value={form.nameEn || ""}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                placeholder="Premium PPE Kit"
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

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Price (GNF)" required>
              <Input
                type="number"
                required
                value={form.price || 0}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
              />
            </Field>
            <Field label="Category" required>
              <Select
                required
                value={form.categoryId || ""}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">— Select —</option>
                {(categories || []).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Type">
              <Select
                value={form.type || "product"}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="software">Software</option>
              </Select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Badge">
              <Input
                value={form.badge || ""}
                onChange={(e) => setForm({ ...form, badge: e.target.value || null })}
                placeholder="Best-seller, Nouveau..."
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
                checked={form.published || false}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-gold"
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm text-ivory">
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-gold"
              />
              Featured
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
              {editing ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </EntityModal>
    </div>
  );
}
