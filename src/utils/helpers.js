import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from './constants';

/**
 * Format a number as currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch {
    return 'Invalid date';
  }
};

/**
 * Get category metadata by id and transaction type
 */
export const getCategoryMeta = (categoryId, type) => {
  const list = type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return list.find((c) => c.id === categoryId) || list[list.length - 1];
};

/**
 * Get all categories for a given type
 */
export const getCategoriesForType = (type) => {
  return type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
};

/**
 * Filter transactions by time period
 */
export const filterByPeriod = (transactions, period) => {
  if (period === 'all') return transactions;

  return transactions.filter((t) => {
    const date = parseISO(t.date);
    switch (period) {
      case 'today':   return isToday(date);
      case 'week':    return isThisWeek(date, { weekStartsOn: 1 });
      case 'month':   return isThisMonth(date);
      case 'year':    return isThisYear(date);
      default:        return true;
    }
  });
};

/**
 * Calculate totals from a list of transactions
 */
export const calculateTotals = (transactions) => {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === TRANSACTION_TYPES.INCOME) {
        acc.income += t.amount;
      } else {
        acc.expenses += t.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );
  // balance computed after
};

export const getTotals = (transactions) => {
  const { income, expenses } = calculateTotals(transactions);
  return { income, expenses, balance: income - expenses };
};

/**
 * Group transactions by category for chart data
 */
export const getExpensesByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === TRANSACTION_TYPES.EXPENSE);
  const grouped = expenses.reduce((acc, t) => {
    const meta = getCategoryMeta(t.category, TRANSACTION_TYPES.EXPENSE);
    const key = meta.label;
    acc[key] = (acc[key] || 0) + t.amount;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([name, value]) => {
      const meta = EXPENSE_CATEGORIES.find((c) => c.label === name) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
      return { name, value, color: meta.color, bg: meta.bg };
    })
    .sort((a, b) => b.value - a.value);
};

/**
 * Get daily spending for the last N days (for line/area chart)
 */
export const getDailySpending = (transactions, days = 14) => {
  const result = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = format(d, 'MMM d');
    const dayStr = format(d, 'yyyy-MM-dd');

    const income = transactions
      .filter((t) => t.type === TRANSACTION_TYPES.INCOME && t.date.startsWith(dayStr))
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE && t.date.startsWith(dayStr))
      .reduce((sum, t) => sum + t.amount, 0);

    result.push({ date: label, income, expenses });
  }
  return result;
};

/**
 * Sort transactions by date descending
 */
export const sortByDateDesc = (transactions) =>
  [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Generate a simple unique ID (fallback if uuid not available)
 */
export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
