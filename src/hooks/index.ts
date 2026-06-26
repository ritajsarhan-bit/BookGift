// BookGift Custom React Hooks
// Reusable hooks for data fetching, state management, and UI interactions

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ─── useLocalStorage ─────────────────────────────────────────────────────────

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// ─── useDebounce ──────────────────────────────────────────────────────────────

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useClickOutside ──────────────────────────────────────────────────────────

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}

// ─── useWindowSize ────────────────────────────────────────────────────────────

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const isDesktop = size.width >= 1024;

  return { ...size, isMobile, isTablet, isDesktop };
}

// ─── useScrollPosition ────────────────────────────────────────────────────────

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrollDirection(current > prevScrollY.current ? 'down' : 'up');
      prevScrollY.current = current;
      setScrollY(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollDirection, isScrolled: scrollY > 0 };
}

// ─── useMediaQuery ────────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// ─── useRequireAuth ───────────────────────────────────────────────────────────

export function useRequireAuth(redirectTo = '/login') {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [status, router, redirectTo]);

  return { session, status, isLoading: status === 'loading' };
}

// ─── useRequireAdmin ──────────────────────────────────────────────────────────

export function useRequireAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !isAdmin) router.replace('/login');
  }, [session, status, isAdmin, router]);

  return { session, isAdmin, isLoading: status === 'loading' };
}

// ─── useFetch ─────────────────────────────────────────────────────────────────

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => { if (!cancelled) { setData(json); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [url, trigger]);

  return { data, loading, error, refetch };
}

// ─── usePagination ────────────────────────────────────────────────────────────

export function usePagination<T>(items: T[], pageSize: number = 12) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedItems = useMemo(() => items.slice(start, start + pageSize), [items, start, pageSize]);

  const goToPage = useCallback((p: number) => setPage(Math.max(1, Math.min(p, totalPages))), [totalPages]);
  const nextPage = useCallback(() => goToPage(page + 1), [page, goToPage]);
  const prevPage = useCallback(() => goToPage(page - 1), [page, goToPage]);

  useEffect(() => { setPage(1); }, [items.length]);

  return {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    total: items.length,
    start: start + 1,
    end: Math.min(start + pageSize, items.length),
  };
}

// ─── useSearch ────────────────────────────────────────────────────────────────

export function useSearch<T>(items: T[], keys: (keyof T)[], delay = 300) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, delay);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const lower = debouncedQuery.toLowerCase();
    return items.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(lower))
    );
  }, [items, keys, debouncedQuery]);

  return { query, setQuery, results, hasQuery: !!debouncedQuery.trim() };
}

// ─── useToggle ────────────────────────────────────────────────────────────────

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse] as const;
}

// ─── useCountdown ─────────────────────────────────────────────────────────────

export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || remaining <= 0) return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [active, remaining]);

  useEffect(() => {
    if (remaining <= 0) setActive(false);
  }, [remaining]);

  const start = useCallback(() => { setRemaining(seconds); setActive(true); }, [seconds]);
  const stop = useCallback(() => setActive(false), []);
  const reset = useCallback(() => { setRemaining(seconds); setActive(false); }, [seconds]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return { remaining, formatted, active, start, stop, reset, done: remaining <= 0 };
}

// ─── useCopyToClipboard ───────────────────────────────────────────────────────

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch {
      return false;
    }
  }, [timeout]);

  return { copied, copy };
}

// ─── useWishlist ──────────────────────────────────────────────────────────────

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('bookgift-wishlist', []);

  const toggle = useCallback((bookId: string) => {
    setWishlist((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  }, [setWishlist]);

  const isWishlisted = useCallback((bookId: string) => wishlist.includes(bookId), [wishlist]);
  const clear = useCallback(() => setWishlist([]), [setWishlist]);

  return { wishlist, toggle, isWishlisted, clear, count: wishlist.length };
}

// ─── useRecentlyViewed ────────────────────────────────────────────────────────

export function useRecentlyViewed(maxItems = 8) {
  const [viewed, setViewed] = useLocalStorage<string[]>('bookgift-recently-viewed', []);

  const addViewed = useCallback((bookId: string) => {
    setViewed((prev) => {
      const filtered = prev.filter((id) => id !== bookId);
      return [bookId, ...filtered].slice(0, maxItems);
    });
  }, [setViewed, maxItems]);

  return { viewed, addViewed };
}
