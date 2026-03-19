import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SEED_TRANSACTIONS } from '../utils/constants';
import { sortByDateDesc } from '../utils/helpers';

// ─── Storage key ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'flowfunds_transactions';
const THEME_KEY   = 'flowfunds_theme';

// ─── Initial state ───────────────────────────────────────────────────────────
const loadTransactions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Seed with example data on first load
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TRANSACTIONS));
  return SEED_TRANSACTIONS;
};

const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
};

const initialState = {
  transactions: loadTransactions(),
  theme: loadTheme(),
  filter: {
    period: 'all',
    type: 'all',
    category: 'all',
    search: '',
  },
};

// ─── Action types ─────────────────────────────────────────────────────────────
export const ACTIONS = {
  ADD_TRANSACTION:    'ADD_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_FILTER:         'SET_FILTER',
  RESET_FILTERS:      'RESET_FILTERS',
  TOGGLE_THEME:       'TOGGLE_THEME',
  CLEAR_ALL:          'CLEAR_ALL',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TRANSACTION: {
      const newTransaction = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      const updated = sortByDateDesc([newTransaction, ...state.transactions]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, transactions: updated };
    }

    case ACTIONS.DELETE_TRANSACTION: {
      const updated = state.transactions.filter((t) => t.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...state, transactions: updated };
    }

    case ACTIONS.SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filter: { period: 'all', type: 'all', category: 'all', search: '' },
      };

    case ACTIONS.TOGGLE_THEME: {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, newTheme);
      return { ...state, theme: newTheme };
    }

    case ACTIONS.CLEAR_ALL: {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return { ...state, transactions: [] };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply/remove dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  // ── Action creators ──────────────────────────────────────────────────────
  const addTransaction = useCallback((transaction) => {
    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  }, []);

  const setFilter = useCallback((filterUpdates) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filterUpdates });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ALL });
  }, []);

  const value = {
    transactions: state.transactions,
    filter: state.filter,
    theme: state.theme,
    addTransaction,
    deleteTransaction,
    setFilter,
    resetFilters,
    toggleTheme,
    clearAll,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpense must be used within ExpenseProvider');
  return ctx;
}
