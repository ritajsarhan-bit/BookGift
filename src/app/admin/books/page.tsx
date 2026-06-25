'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  language: string;
  published: boolean;
  coverImage?: string | null;
  category?: { name: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const EMPTY_FORM = {
  title: '', titleHe: '', author: '', authorHe: '',
  description: '', descriptionHe: '', price: '', discountPrice: '',
  priceILS: '',
  coverImage: '', isbn: '', language: 'en', stock: '10',
  pages: '', publisher: '', categoryId: '', featured: false, published: true,
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchBooks = async () => {
    const [bRes, cRes] = await Promise.all([
      fetch('/api/books?limit=100'),
      fetch('/api/categories'),
    ]);
    const bData = await bRes.json();
    const cData = await cRes.json();
    setBooks(bData.books || []);
    setCategories(cData.categories || []);
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (book: any) => {
    setEditingId(book.id);
    setForm({
      title: book.title || '', titleHe: book.titleHe || '',
      author: book.author || '', authorHe: book.authorHe || '',
      description: book.description || '', descriptionHe: book.descriptionHe || '',
      price: String(book.price), discountPrice: book.discountPrice ? String(book.discountPrice) : '',
      priceILS: book.priceILS ? String(book.priceILS) : '',
      coverImage: book.coverImage || '', isbn: book.isbn || '',
      language: book.language, stock: String(book.stock),
      pages: book.pages ? String(book.pages) : '', publisher: book.publisher || '',
      categoryId: book.categoryId || '', featured: book.featured, published: book.published,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : null,
        priceILS: form.priceILS ? parseFloat(form.priceILS) : null,
        stock: parseInt(form.stock),
        pages: form.pages ? parseInt(form.pages) : null,
      };

      const res = editingId
        ? await fetch(`/api/books/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/books', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (!res.ok) { toast.error('Failed to save'); return; }
      toast.success(editingId ? 'Book updated!' : 'Book added!');
      setShowForm(false);
      fetchBooks();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    toast.success('Book deleted');
    fetchBooks();
  };

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Books ({books.length})</h1>
        <button onClick={openAdd} className="btn-primary">+ Add Book</button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Book' : 'Add New Book'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title (EN)" value={form.title} onChange={f('title')} required />
            <Field label="Title (Hebrew)" value={form.titleHe} onChange={f('titleHe')} />
            <Field label="Author (EN)" value={form.author} onChange={f('author')} required />
            <Field label="Author (Hebrew)" value={form.authorHe} onChange={f('authorHe')} />
            <TextArea label="Description (EN)" value={form.description} onChange={f('description')} required />
            <TextArea label="Description (Hebrew)" value={form.descriptionHe} onChange={f('descriptionHe')} />
            <Field label="Price (USD)" value={form.price} onChange={f('price')} type="number" step="0.01" required />
            <Field label="Discount Price (optional)" value={form.discountPrice} onChange={f('discountPrice')} type="number" step="0.01" />
            <Field label="Price in ₪ Shekel (shown in Hebrew mode)" value={form.priceILS} onChange={f('priceILS')} type="number" step="0.01" />
            <Field label="Cover Image URL" value={form.coverImage} onChange={f('coverImage')} />
            <Field label="ISBN" value={form.isbn} onChange={f('isbn')} />
            <Field label="Stock" value={form.stock} onChange={f('stock')} type="number" required />
            <Field label="Pages" value={form.pages} onChange={f('pages')} type="number" />
            <Field label="Publisher" value={form.publisher} onChange={f('publisher')} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select value={form.language} onChange={f('language')} className="input">
                <option value="en">English</option>
                <option value="he">Hebrew</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select value={form.categoryId} onChange={f('categoryId')} className="input" required>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={f('featured')} className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={f('published')} className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : editingId ? 'Update Book' : 'Add Book'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Books table */}
      {loading ? (
        <p className="text-gray-500">Loading books…</p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Book</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">Price</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden lg:table-cell">Lang</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {book.coverImage && !book.coverImage.startsWith('C:') && !book.coverImage.startsWith('D:') && (
                          <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[160px]">{book.title}</p>
                        <p className="text-xs text-gray-400">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{book.category?.name}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="font-medium">{formatPrice(book.discountPrice ?? book.price)}</span>
                    {book.discountPrice && <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(book.price)}</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={book.stock === 0 ? 'text-red-500' : 'text-gray-700'}>{book.stock}</span>
                  </td>
                  <td className="px-4 py-3 uppercase text-xs text-gray-500 hidden lg:table-cell">{book.language}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${book.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {book.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(book)} className="text-xs text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(book.id, book.title)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Small reusable field components for the form
function Field({ label, value, onChange, type = 'text', required = false, step }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
      <input type={type} value={value} onChange={onChange} required={required} step={step} className="input" />
    </div>
  );
}

function TextArea({ label, value, onChange, required = false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && ' *'}</label>
      <textarea value={value} onChange={onChange} required={required} rows={3} className="input" />
    </div>
  );
}
