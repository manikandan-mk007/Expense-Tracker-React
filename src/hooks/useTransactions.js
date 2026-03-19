import { useMemo } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { filterByPeriod, getTotals, getExpensesByCategory, getDailySpending, sortByDateDesc } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../utils/constants';

/**
 * Custom hook that returns derived/filtered transaction data.
 * Centralizes all filtering and computation logic.
 */
export function useTransactions() {
  const { transactions, filter } = useExpense();

  // Apply all filters
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Filter by period
    result = filterByPeriod(result, filter.period);

    // Filter by type (income / expense / all)
    if (filter.type !== 'all') {
      result = result.filter((t) => t.type === filter.type);
    }

    // Filter by category
    if (filter.category !== 'all') {
      result = result.filter((t) => t.category === filter.category);
    }

    // Search filter (description)
    if (filter.search.trim()) {
      const query = filter.search.toLowerCase();
      result = result.filter((t) =>
        t.description.toLowerCase().includes(query)
      );
    }

    return sortByDateDesc(result);
  }, [transactions, filter]);

  // Totals for ALL transactions (for summary cards — ignore filters except period)
  const periodTransactions = useMemo(
    () => filterByPeriod(transactions, filter.period),
    [transactions, filter.period]
  );

  const totals = useMemo(() => getTotals(periodTransactions), [periodTransactions]);

  // Chart data derived from period transactions (unfiltered by type/category)
  const expensesByCategory = useMemo(
    () => getExpensesByCategory(periodTransactions),
    [periodTransactions]
  );

  const dailySpending = useMemo(
    () => getDailySpending(transactions, 14),
    [transactions]
  );

  // Quick stats
  const transactionCount = filteredTransactions.length;
  const hasTransactions = transactions.length > 0;
  const hasFilteredTransactions = filteredTransactions.length > 0;

  return {
    filteredTransactions,
    totals,
    expensesByCategory,
    dailySpending,
    transactionCount,
    hasTransactions,
    hasFilteredTransactions,
  };
}
