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
      ${isDark ? 'hover:bg-[#2B2E33]' : 'hover:bg-[#FFF8E7]'}
    `}>
      {/* Category badge */}
      <div
        className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-semibold"
        style={{ backgroundColor: meta.bg, color: meta.color }}
      >
        {meta.label.slice(0, 1).toUpperCase()}
      </div>

      {/* Description + meta */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}>
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[11px] font-medium px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
          <span className={`text-[11px] ${isDark ? 'text-[#5E6268]' : 'text-[#A56E08]'}`}>
            {formatDate(transaction.date, 'MMM d')}
          </span>
        </div>
      </div>

      {/* Amount + delete */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-sm font-semibold
          ${isIncome ? 'text-[#E6A520]' : 'text-[#C95050]'}`}>
          {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          aria-label="Delete transaction"
          className={`
            w-7 h-7 rounded-lg flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer
            ${isDark
              ? 'text-[#5E6268] hover:text-[#C95050] hover:bg-[#363A40]'
              : 'text-[#FFD77A] hover:text-[#C95050] hover:bg-[#FFF0C4]'}
          `}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}