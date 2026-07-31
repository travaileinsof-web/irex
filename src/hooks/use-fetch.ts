"use client";

import { useEffect, useRef, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  /** Re-fetch when the window regains focus (default: true) */
  refetchOnFocus?: boolean;
}

/**
 * Simple fetch hook for client-side data fetching.
 *
 * By default it re-fetches when the browser tab/window regains focus. This
 * keeps the public site and the admin dashboard in sync after content changes,
 * without needing WebSockets or polling.
 */
export function useFetch<T>(
  url: string | null,
  options: UseFetchOptions = {}
): FetchState<T> & { refetch: () => void } {
  const { refetchOnFocus = true } = options;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: url !== null,
    error: null,
  });
  const [refetchCount, setRefetchCount] = useState(0);
  const currentUrl = useRef<string | null>(url);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    currentUrl.current = url;
    if (!url) return;

    let cancelled = false;

    // Use a microtask to defer the setState to avoid synchronous state update in effect
    Promise.resolve().then(() => {
      if (cancelled) return;
      setState((s) => ({ ...s, loading: true, error: null }));
    });

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
          hasLoadedOnce.current = true;
        }
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error: error.message });
      });

    return () => {
      cancelled = true;
    };
  }, [url, refetchCount]);

  // Re-fetch silently when the tab/window regains focus (only after the first load)
  useEffect(() => {
    if (!url || !refetchOnFocus) return;
    const onVisibility = () => {
      if (document.visibilityState === "visible" && hasLoadedOnce.current) {
        setRefetchCount((c) => c + 1);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, [url, refetchOnFocus]);

  return {
    ...state,
    refetch: () => setRefetchCount((c) => c + 1),
  };
}
