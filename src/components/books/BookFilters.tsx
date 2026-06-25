'use client';

import { useLanguage } from '@/context/LanguageContext';

interface Category {
  id: string;
  name: string;
  nameHe?: string | null;
  slug: string;
}

interface Filters {
  search: string;
  category: string;
  language: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface Props {
  categories: Category[];
  filters: Filters;
  onChange: (filters: Partial<Filters>) => void;
  onClear: () => void;
}

export default function BookFilters({ categories, filters, onChange, onClear }: Props) {
  const { t, language: uiLang } = useLanguage();

  return (
    <aside className="card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">{t.filters.title}</h2>
        <button onClick={onClear} className="text-xs text-blue-600 hover:underline">
          {t.filters.clear}
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters.category}</label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="input text-sm"
        >
          <option value="">{t.filters.all_categories}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {uiLang === 'he' && cat.nameHe ? cat.nameHe : cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters.language}</label>
        <select
          value={filters.language}
          onChange={(e) => onChange({ language: e.target.value })}
          className="input text-sm"
        >
          <option value="">{t.filters.all_languages}</option>
          <option value="en">{t.filters.english}</option>
          <option value="he">{t.filters.hebrew}</option>
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters.price_range}</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="input text-sm w-full"
            min="0"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="input text-sm w-full"
            min="0"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters.sort_by}</label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="input text-sm"
        >
          <option value="newest">{t.filters.sort_newest}</option>
          <option value="price_asc">{t.filters.sort_price_asc}</option>
          <option value="price_desc">{t.filters.sort_price_desc}</option>
          <option value="rating">{t.filters.sort_rating}</option>
        </select>
      </div>
    </aside>
  );
}
