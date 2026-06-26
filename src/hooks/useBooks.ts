import { useState, useEffect, useCallback, useRef } from 'react';

export interface BookFilters {
  search: string;
  category: string;
  language: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  page: number;
  limit: number;
}

export const defaultFilters: BookFilters = {
  search: '',
  category: '',
  language: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
  page: 1,
  limit: 12,
};

export interface BooksResult {
  books: any[];
  total: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
}

/** Fetch books from the API with filters */
export function useBooks(initialFilters?: Partial<BookFilters>): BooksResult & {
  filters: BookFilters;
  setFilters: (f: Partial<BookFilters>) => void;
  reset: () => void;
  refetch: () => void;
} {
  const [filters, setFiltersState] = useState<BookFilters>({ ...defaultFilters, ...initialFilters });
  const [books, setBooks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchBooks = useCallback(async (f: BookFilters) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (f.search)   params.set('search', f.search);
    if (f.category) params.set('category', f.category);
    if (f.language) params.set('lang', f.language);
    if (f.minPrice) params.set('minPrice', f.minPrice);
    if (f.maxPrice) params.set('maxPrice', f.maxPrice);
    params.set('sort', f.sort);
    params.set('page', String(f.page));
    params.set('limit', String(f.limit));

    try {
      const res = await fetch(`/api/books?${params}`, { signal: abortRef.current.signal });
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data.books || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (e: any) {
      if (e.name !== 'AbortError') setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(filters);
  }, [filters, fetchBooks]);

  const setFilters = useCallback((patch: Partial<BookFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  }, []);

  const reset = useCallback(() => setFiltersState({ ...defaultFilters }), []);
  const refetch = useCallback(() => fetchBooks(filters), [filters, fetchBooks]);

  return { books, total, totalPages, page: filters.page, loading, error, filters, setFilters, reset, refetch };
}

/** Fetch a single book by id */
export function useBook(id: string | null): { book: any | null; loading: boolean; error: string | null } {
  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/books/${id}`)
      .then((r) => r.ok ? r.json() : Promise.reject('Not found'))
      .then((d) => setBook(d.book || null))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  return { book, loading, error };
}

/** Fetch related books for a given category */
export function useRelatedBooks(category: string, excludeId: string, limit = 4): any[] {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    if (!category) return;
    fetch(`/api/books?category=${encodeURIComponent(category)}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) => setBooks((d.books || []).filter((b: any) => b.id !== excludeId)))
      .catch(() => setBooks([]));
  }, [category, excludeId, limit]);

  return books;
}

/** Fetch categories */
export function useCategories(): { categories: any[]; loading: boolean } {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}

/** Track recently viewed books in localStorage */
export function useRecentlyViewed(currentId?: string, limit = 6): any[] {
  const KEY = 'bookgift_recently_viewed';
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
      setRecent(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (!currentId) return;
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');
      const next = [currentId, ...stored.filter((id) => id !== currentId)].slice(0, limit);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, [currentId, limit]);

  return recent.filter((id) => id !== currentId);
}

/** Persist and retrieve search history */
export function useSearchHistory(maxItems = 8) {
  const KEY = 'bookgift_search_history';

  const getHistory = (): string[] => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  };

  const addSearch = (term: string) => {
    if (!term.trim()) return;
    const history = getHistory();
    const next = [term, ...history.filter((h) => h !== term)].slice(0, maxItems);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const clearHistory = () => localStorage.removeItem(KEY);

  return { getHistory, addSearch, clearHistory };
}

/** Book comparison hook — compare up to 3 books */
export function useBookComparison(max = 3) {
  const [compared, setCompared] = useState<any[]>([]);

  const add = (book: any) => {
    setCompared((prev) => {
      if (prev.find((b) => b.id === book.id)) return prev;
      if (prev.length >= max) return prev;
      return [...prev, book];
    });
  };

  const remove = (id: string) => setCompared((prev) => prev.filter((b) => b.id !== id));
  const clear = () => setCompared([]);
  const isComparing = (id: string) => compared.some((b) => b.id === id);
  const isFull = compared.length >= max;

  return { compared, add, remove, clear, isComparing, isFull };
}
