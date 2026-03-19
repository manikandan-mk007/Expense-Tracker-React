import { Trash2 } from 'lucide-react';
import { getCategoryMeta, formatCurrency, formatDate } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../utils/constants';
import { useExpense } from '../context/ExpenseContext';

export default function TransactionItem({ transaction, onDelete }) {
  const { theme } = useExpense();
  const isDark = theme === 'dark';
  const isIncome = transaction.type === TRANSACTION_TYPES.INCOME;
  const meta = getCategoryMeta(transaction.category, transaction.type);

  return (
    <div className={`
      group flex items-center gap-3 px-4 py-3 rounded-xl
      transition-all duration-150
      ${isDark
        ? 'hover:bg-[#1c1b18]'
        : 'hover:bg-[#fafaf9]'}
    `}>
      {/* Category dot / badge */}
      <div
        className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-semibold"
        style={{ backgroundColor: meta.bg, color: meta.color }}
      >
        {meta.label.slice(0, 1).toUpperCase()}
      </div>

      {/* Description + meta */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}>
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[11px] font-medium px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
          <span className={`text-[11px] ${isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'}`}>
            {formatDate(transaction.date, 'MMM d')}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-sm font-semibold ${isIncome ? 'text-[#738f66]' : 'text-[#d45e47]'}`}>
          {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
        </span>

        {/* Delete button - visible on hover */}
        <button
          onClick={() => onDelete(transaction.id)}
          aria-label="Delete transaction"
          className={`
            w-7 h-7 rounded-lg flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer
            ${isDark
              ? 'text-[#5a5749] hover:text-[#d45e47] hover:bg-[#2a2925]'
              : 'text-[#d4d0c5] hover:text-[#d45e47] hover:bg-[#fdf0ee]'}
          `}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
