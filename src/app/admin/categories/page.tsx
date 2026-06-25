'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  nameHe?: string | null;
  slug: string;
  _count: { books: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', nameHe: '', slug: '', description: '' });
  const [saving, setSaving] = useState(false);

  const fetch_cats = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  };

  useEffect(() => { fetch_cats(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { toast.error('Failed to add category'); return; }
      toast.success('Category added!');
      setForm({ name: '', nameHe: '', slug: '', description: '' });
      fetch_cats();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>

      {/* Add form */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4">Add Category</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN) *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (Hebrew)</label>
            <input type="text" value={form.nameHe} onChange={(e) => setForm({ ...form, nameHe: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug * (URL-friendly, e.g. "sci-fi")</label>
            <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </div>
          <div className="col-span-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Adding…' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>

      {/* Category list */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Name</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Hebrew</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Slug</th>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Books</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">Loading…</td></tr>
            ) : categories.map((cat) => (
              <tr key={cat.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{cat.name}</td>
                <td className="px-5 py-3 text-gray-600" dir="rtl">{cat.nameHe || '—'}</td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">{cat.slug}</td>
                <td className="px-5 py-3 text-gray-600">{cat._count.books}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
