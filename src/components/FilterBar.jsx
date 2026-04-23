import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { FILTER_PERIODS, EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from '../utils/constants';

export default function FilterBar() {
  const { filter, setFilter, resetFilters, theme } = useExpense();
  const isDark = theme === 'dark';

  const hasActiveFilters =
    filter.period !== 'all' ||
    filter.type !== 'all' ||
    filter.category !== 'all' ||
    filter.search.trim() !== '';

  const categoryOptions =
    filter.type === TRANSACTION_TYPES.INCOME
      ? INCOME_CATEGORIES
      : filter.type === TRANSACTION_TYPES.EXPENSE
        ? EXPENSE_CATEGORIES
        : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  const selectClass = `
    px-3 py-2 rounded-xl text-sm outline-none cursor-pointer
    border transition-all duration-150
    ${isDark
      ? 'bg-[#2B2E33] text-[#F5F6F7] border-[#363A40] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/20'
      : 'bg-[#FFF0C4] text-[#3D2300] border-[#FFD77A] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/30'}
  `;

  return (
    <div className={`
      rounded-2xl p-4 space-y-3 border
      ${isDark
        ? 'bg-[#1E2025] border-[#363A40]'
        : 'bg-white border-[#FFD77A]'}
    `}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={14}
            className={isDark ? 'text-[#7B7F85]' : 'text-[#A56E08]'}
          />
          <span className={`text-sm font-medium ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}>
            Filters
          </span>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-[#E6A520] text-white">
              !
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className={`text-xs flex items-center gap-1 cursor-pointer transition-colors
              ${isDark
                ? 'text-[#7B7F85] hover:text-[#F5F6F7]'
                : 'text-[#A56E08] hover:text-[#3D2300]'}
            `}
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className={`absolute left-3 top-1/2 -translate-y-1/2
            ${isDark ? 'text-[#7B7F85]' : 'text-[#A56E08]'}`}
        />
        <input
          type="text"
          placeholder="Search transactions…"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className={`
            w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none
            border transition-all duration-150
            placeholder:opacity-60
            ${isDark
              ? 'bg-[#2B2E33] text-[#F5F6F7] border-[#363A40] placeholder:text-[#7B7F85] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/20'
              : 'bg-[#FFF8E7] text-[#3D2300] border-[#FFD77A] placeholder:text-[#A56E08] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/30'}
          `}
        />
        {filter.search && (
          <button
            onClick={() => setFilter({ search: '' })}
            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors
              ${isDark
                ? 'text-[#7B7F85] hover:text-[#F5F6F7]'
                : 'text-[#A56E08] hover:text-[#3D2300]'}
            `}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Filter selects */}
      <div className="grid grid-cols-3 gap-2">
        {/* Period */}
        <select
          value={filter.period}
          onChange={(e) => setFilter({ period: e.target.value })}
          className={selectClass}
        >
          {FILTER_PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        {/* Type */}
        <select
          value={filter.type}
          onChange={(e) => setFilter({ type: e.target.value, category: 'all' })}
          className={selectClass}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filter.category}
          onChange={(e) => setFilter({ category: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}