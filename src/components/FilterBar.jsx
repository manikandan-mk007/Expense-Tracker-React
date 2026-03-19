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

  // Merge categories based on selected type
  const categoryOptions =
    filter.type === TRANSACTION_TYPES.INCOME
      ? INCOME_CATEGORIES
      : filter.type === TRANSACTION_TYPES.EXPENSE
        ? EXPENSE_CATEGORIES
        : [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  const selectClass = `
    px-3 py-2 rounded-xl text-sm outline-none cursor-pointer
    border transition-all duration-150
    bg-[#f5f4f0] dark:bg-[#1c1b18]
    text-[#1c1b18] dark:text-[#fafaf9]
    border-transparent dark:border-[#2a2925]
    focus:border-[#567049] focus:ring-2 focus:ring-[#567049]/20
  `;

  return (
    <div className={`
      rounded-2xl p-4 space-y-3
      ${isDark ? 'bg-[#1c1b18] border border-[#2a2925]' : 'bg-white border border-[#e8e6df]'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className={isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'} />
          <span className={`text-sm font-medium ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}>Filters</span>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-[#567049] text-white">
              !
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className={`text-xs flex items-center gap-1 cursor-pointer
              ${isDark ? 'text-[#8f8b7e] hover:text-[#fafaf9]' : 'text-[#5a5749] hover:text-[#1c1b18]'}
            `}
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8b7e]" />
        <input
          type="text"
          placeholder="Search transactions…"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className={`
            w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none
            bg-[#f5f4f0] dark:bg-[#111009]
            text-[#1c1b18] dark:text-[#fafaf9]
            border border-transparent dark:border-[#2a2925]
            placeholder:text-[#8f8b7e]
            focus:border-[#567049] focus:ring-2 focus:ring-[#567049]/20
            transition-all duration-150
          `}
        />
        {filter.search && (
          <button
            onClick={() => setFilter({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f8b7e] hover:text-[#1c1b18] dark:hover:text-[#fafaf9] cursor-pointer"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Filter row */}
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
