"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface CrudState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Reusable CRUD hook for admin entities
 */
export function useCrud<T extends { id: string }>(endpoint: string) {
  const [state, setState] = useState<CrudState<T>>({
    items: [],
    loading: true,
    error: null,
  });

  const fetchItems = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const url = endpoint.includes("?") ? `${endpoint}&t=${Date.now()}` : `${endpoint}?t=${Date.now()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const items = await res.json();
      setState({ items, loading: false, error: null });
    } catch (err) {
      setState({ items: [], loading: false, error: err instanceof Error ? err.message : "Unknown error" });
    }
  }, [endpoint]);

  useEffect(() => {
    // Defer to avoid a synchronous setState during the effect commit phase.
    Promise.resolve().then(() => fetchItems());
  }, [fetchItems]);

  // Re-fetch silently when the window regains focus, so the dashboard stays
  // in sync with changes made elsewhere (e.g. the public site or another tab).
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchItems();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, [fetchItems]);

  const create = async (data: Partial<T>): Promise<T | null> => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create");
      }
      const item = await res.json();
      setState((s) => ({ ...s, items: [...s.items, item] }));
      toast.success("Created successfully");
      return item;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create");
      return null;
    }
  };

  const update = async (id: string, data: Partial<T>): Promise<T | null> => {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }
      const item = await res.json();
      setState((s) => ({
        ...s,
        items: s.items.map((it) => (it.id === id ? item : it)),
      }));
      toast.success("Updated successfully");
      return item;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
      return null;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setState((s) => ({ ...s, items: s.items.filter((it) => it.id !== id) }));
      toast.success("Deleted successfully");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
      return false;
    }
  };

  return {
    ...state,
    refetch: fetchItems,
    create,
    update,
    remove,
  };
}
