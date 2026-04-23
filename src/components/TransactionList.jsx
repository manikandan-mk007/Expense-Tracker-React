import { useCallback } from 'react';
import { Receipt, SearchX } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { useTransactions } from '../hooks/useTransactions';
import TransactionItem from './TransactionItem';
import { formatDate } from '../utils/helpers';

function groupByDate(transactions) {
  return transactions.reduce((groups, t) => {
    const key = formatDate(t.date, 'EEEE, MMMM d');
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
    return groups;
  }, {});
}

function EmptyState({ hasFilters, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
        ${isDark ? 'bg-[#2B2E33]' : 'bg-[#FFF0C4]'}`}>
        {hasFilters
          ? <SearchX size={22} className={isDark ? 'text-[#5E6268]' : 'text-[#A56E08]'} />
          : <Receipt  size={22} className={isDark ? 'text-[#5E6268]' : 'text-[#A56E08]'} />}
      </div>
      <div className="text-center">
        <p className={`text-sm font-medium ${isDark ? 'text-[#7B7F85]' : 'text-[#A56E08]'}`}>
          {hasFilters ? 'No matching transactions' : 'No transactions yet'}
        </p>
        <p className={`text-xs mt-1 ${isDark ? 'text-[#5E6268]' : 'text-[#C98A10]'}`}>
          {hasFilters ? 'Try adjusting your filters' : 'Add your first income or expense above'}
        </p>
      </div>
    </div>
  );
}

export default function TransactionList() {
  const { deleteTransaction, theme, filter } = useExpense();
  const { filteredTransactions, hasFilteredTransactions, transactionCount } = useTransactions();
  const isDark = theme === 'dark';

  const hasFilters =
    filter.period !== 'all' ||
    filter.type !== 'all' ||
    filter.category !== 'all' ||
    filter.search.trim() !== '';

  const handleDelete = useCallback((id) => {
    if (window.confirm('Remove this transaction?')) deleteTransaction(id);
  }, [deleteTransaction]);

  const grouped = groupByDate(filteredTransactions);

  return (
    <div className={`rounded-2xl border
      ${isDark ? 'bg-[#1E2025] border-[#363A40]' : 'bg-white border-[#FFD77A]'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-4 border-b
        ${isDark ? 'border-[#363A40]' : 'border-[#FFD77A]'}`}>
        <h2
          className={`text-base font-semibold ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}
          style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
        >
          Transactions
        </h2>
        {transactionCount > 0 && (
          <span className={`text-xs px-2 py-1 rounded-full
            ${isDark ? 'bg-[#2B2E33] text-[#7B7F85]' : 'bg-[#FFF0C4] text-[#A56E08]'}`}>
            {transactionCount} {transactionCount === 1 ? 'entry' : 'entries'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2">
        {!hasFilteredTransactions ? (
          <EmptyState hasFilters={hasFilters} isDark={isDark} />
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([dateLabel, items]) => (
              <div key={dateLabel}>
                <p className={`text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5
                  ${isDark ? 'text-[#5E6268]' : 'text-[#A56E08]'}`}>
                  {dateLabel}
                </p>
                <div>
                  {items.map((t) => (
                    <TransactionItem key={t.id} transaction={t} onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}