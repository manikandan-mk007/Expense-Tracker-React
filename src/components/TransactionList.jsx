import { useCallback } from 'react';
import { Receipt, SearchX } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { useTransactions } from '../hooks/useTransactions';
import TransactionItem from './TransactionItem';
import { formatDate } from '../utils/helpers';

// Group transactions by date
function groupByDate(transactions) {
  return transactions.reduce((groups, t) => {
    const key = formatDate(t.date, 'EEEE, MMMM d');
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
    return groups;
  }, {});
}

// Empty state component
function EmptyState({ hasFilters, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-[#1c1b18]' : 'bg-[#f5f4f0]'}`}>
        {hasFilters
          ? <SearchX size={22} className={isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'} />
          : <Receipt size={22} className={isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'} />}
      </div>
      <div className="text-center">
        <p className={`text-sm font-medium ${isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'}`}>
          {hasFilters ? 'No matching transactions' : 'No transactions yet'}
        </p>
        <p className={`text-xs mt-1 ${isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'}`}>
          {hasFilters
            ? 'Try adjusting your filters'
            : 'Add your first income or expense above'}
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
    if (window.confirm('Remove this transaction?')) {
      deleteTransaction(id);
    }
  }, [deleteTransaction]);

  const grouped = groupByDate(filteredTransactions);

  return (
    <div className={`
      rounded-2xl
      ${isDark ? 'bg-[#1c1b18] border border-[#2a2925]' : 'bg-white border border-[#e8e6df]'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#f5f4f0] dark:border-[#2a2925]">
        <h2
          className={`text-base font-semibold ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
          style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
        >
          Transactions
        </h2>
        {transactionCount > 0 && (
          <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-[#2a2925] text-[#8f8b7e]' : 'bg-[#f5f4f0] text-[#5a5749]'}`}>
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
                {/* Date group header */}
                <p className={`text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 ${isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'}`}>
                  {dateLabel}
                </p>
                <div>
                  {items.map((t) => (
                    <TransactionItem
                      key={t.id}
                      transaction={t}
                      onDelete={handleDelete}
                    />
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
