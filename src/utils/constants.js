// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Expense categories with colors and icons
export const EXPENSE_CATEGORIES = [
  { id: 'food',          label: 'Food & Dining',     color: '#e8826e', bg: '#fdf0ee' },
  { id: 'transport',     label: 'Transport',          color: '#6aaac4', bg: '#eef5f9' },
  { id: 'housing',       label: 'Housing',            color: '#8f7ac4', bg: '#f4f0fa' },
  { id: 'entertainment', label: 'Entertainment',      color: '#e8b84a', bg: '#fdf6e3' },
  { id: 'health',        label: 'Health',             color: '#96b089', bg: '#f2f6f0' },
  { id: 'shopping',      label: 'Shopping',           color: '#d4971f', bg: '#fdf3e0' },
  { id: 'utilities',     label: 'Utilities',          color: '#738f66', bg: '#eef3ec' },
  { id: 'education',     label: 'Education',          color: '#5a7ec4', bg: '#eef2fb' },
  { id: 'travel',        label: 'Travel',             color: '#c47a6a', bg: '#faf0ee' },
  { id: 'other',         label: 'Other',              color: '#8f8b7e', bg: '#f5f4f0' },
];

// Income categories
export const INCOME_CATEGORIES = [
  { id: 'salary',     label: 'Salary',        color: '#738f66', bg: '#eef3ec' },
  { id: 'freelance',  label: 'Freelance',     color: '#96b089', bg: '#f2f6f0' },
  { id: 'investment', label: 'Investment',    color: '#6aaac4', bg: '#eef5f9' },
  { id: 'gift',       label: 'Gift',          color: '#e8b84a', bg: '#fdf6e3' },
  { id: 'other',      label: 'Other Income',  color: '#8f8b7e', bg: '#f5f4f0' },
];

// Filter options
export const FILTER_PERIODS = [
  { value: 'all',     label: 'All Time' },
  { value: 'today',   label: 'Today' },
  { value: 'week',    label: 'This Week' },
  { value: 'month',   label: 'This Month' },
  { value: 'year',    label: 'This Year' },
];

// Sample seed transactions (used if localStorage is empty)
export const SEED_TRANSACTIONS = [
  {
    id: 'seed-1',
    type: 'income',
    category: 'salary',
    description: 'Monthly Salary',
    amount: 5200,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-2',
    type: 'expense',
    category: 'housing',
    description: 'Rent Payment',
    amount: 1400,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-3',
    type: 'expense',
    category: 'food',
    description: 'Weekly Groceries',
    amount: 120,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-4',
    type: 'expense',
    category: 'transport',
    description: 'Monthly Bus Pass',
    amount: 85,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-5',
    type: 'income',
    category: 'freelance',
    description: 'Website Design Project',
    amount: 850,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-6',
    type: 'expense',
    category: 'entertainment',
    description: 'Streaming Subscriptions',
    amount: 42,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-7',
    type: 'expense',
    category: 'health',
    description: 'Gym Membership',
    amount: 60,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-8',
    type: 'expense',
    category: 'shopping',
    description: 'New Laptop Stand',
    amount: 75,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
