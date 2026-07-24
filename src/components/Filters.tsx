import type { FiltersState } from '../types/camp';
import { categories, conciliationOptions } from '../data/camps';

interface FiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const update = (partial: Partial<FiltersState>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <label htmlFor="filter-category" className="block text-sm font-medium text-slate-700 mb-1">
            Categoria
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={e => update({ category: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-cost" className="block text-sm font-medium text-slate-700 mb-1">
            Cost màxim: {filters.maxCost} €
          </label>
          <input
            id="filter-cost"
            type="range"
            min={0}
            max={600}
            step={10}
            value={filters.maxCost}
            onChange={e => update({ maxCost: Number(e.target.value) })}
            className="w-full accent-sky-500"
          />
        </div>

        <div>
          <label htmlFor="filter-conciliation" className="block text-sm font-medium text-slate-700 mb-1">
            Conciliació
          </label>
          <select
            id="filter-conciliation"
            value={filters.conciliation}
            onChange={e => update({ conciliation: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {conciliationOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-age" className="block text-sm font-medium text-slate-700 mb-1">
            Rang d'edat
          </label>
          <select
            id="filter-age"
            value={filters.ageRange}
            onChange={e => update({ ageRange: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Totes les edats</option>
            <option value="3-6">3-6 anys</option>
            <option value="6-10">6-10 anys</option>
            <option value="10-14">10-14 anys</option>
            <option value="14-16">14-16 anys</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-rating" className="block text-sm font-medium text-slate-700 mb-1">
            Rànquing mínim: {filters.minRating}
          </label>
          <input
            id="filter-rating"
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={filters.minRating}
            onChange={e => update({ minRating: Number(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyWithFriends}
              onChange={e => update({ onlyWithFriends: e.target.checked })}
              className="w-5 h-5 rounded accent-sky-500"
            />
            <span className="text-sm font-medium text-slate-700">Només casals amb amics</span>
          </label>
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-slate-700">Al·lèrgies compatibles:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {['Sense gluten', 'Sense lactosa', 'Fruits secs', 'Vegetarià', 'Vegà', 'Menú adaptat'].map(allergy => (
            <button
              key={allergy}
              onClick={() => {
                const current = filters.compatibleAllergies;
                const next = current.includes(allergy)
                  ? current.filter(a => a !== allergy)
                  : [...current, allergy];
                update({ compatibleAllergies: next });
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                filters.compatibleAllergies.includes(allergy)
                  ? 'bg-orange-100 border-orange-300 text-orange-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-orange-200'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
