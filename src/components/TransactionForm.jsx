import { useState, useCallback } from 'react';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { useForm } from '../hooks/useForm';
import { getCategoriesForType } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../utils/constants';
import { format } from 'date-fns';

// ── Validation ───────────────────────────────────────────────────────────────
function validate(values) {
  const errors = {};
  if (!values.description.trim()) errors.description = 'Description is required';
  if (!values.amount || isNaN(values.amount) || Number(values.amount) <= 0)
    errors.amount = 'Enter a valid positive amount';
  if (!values.category) errors.category = 'Please select a category';
  if (!values.date) errors.date = 'Date is required';
  return errors;
}

const todayStr = format(new Date(), 'yyyy-MM-dd');

const INITIAL_VALUES = {
  type: TRANSACTION_TYPES.EXPENSE,
  description: '',
  amount: '',
  category: '',
  date: todayStr,
};

// ── Field ────────────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#5a5749] dark:text-[#8f8b7e] uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#d45e47] mt-0.5">{error}</p>
      )}
    </div>
  );
}

// ── Input classes ─────────────────────────────────────────────────────────────
const inputClass = (hasError) => `
  w-full px-3 py-2.5 rounded-xl text-sm outline-none
  bg-[#f5f4f0] dark:bg-[#1c1b18]
  text-[#1c1b18] dark:text-[#fafaf9]
  border transition-all duration-150
  placeholder:text-[#8f8b7e]
  ${hasError
    ? 'border-[#d45e47] focus:border-[#d45e47] focus:ring-2 focus:ring-[#d45e47]/20'
    : 'border-transparent focus:border-[#567049] focus:ring-2 focus:ring-[#567049]/20 dark:border-[#2a2925]'}
`;

export default function TransactionForm() {
  const { addTransaction, theme } = useExpense();
  const [showSuccess, setShowSuccess] = useState(false);
  const isDark = theme === 'dark';

  const handleSubmit = useCallback((values) => {
    addTransaction({
      type: values.type,
      description: values.description.trim(),
      amount: parseFloat(values.amount),
      category: values.category,
      date: new Date(values.date + 'T12:00:00').toISOString(),
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }, [addTransaction]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
    setFieldValue,
  } = useForm(INITIAL_VALUES, validate, handleSubmit);

  const categories = getCategoriesForType(values.type);
  const isIncome = values.type === TRANSACTION_TYPES.INCOME;

  return (
    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#1c1b18]' : 'bg-white'} border ${isDark ? 'border-[#2a2925]' : 'border-[#e8e6df]'}`}>
      <h2 className={`text-base font-semibold mb-5 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
        New Transaction
      </h2>

      <form onSubmit={submitForm} noValidate className="space-y-4">
        {/* Type toggle */}
        <div className={`flex rounded-xl p-1 ${isDark ? 'bg-[#111009]' : 'bg-[#f5f4f0]'}`}>
          {[TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.INCOME].map((type) => {
            const active = values.type === type;
            const isInc = type === TRANSACTION_TYPES.INCOME;
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setFieldValue('type', type);
                  setFieldValue('category', '');
                }}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${active
                    ? isInc
                      ? 'bg-[#567049] text-white shadow-sm'
                      : 'bg-[#d45e47] text-white shadow-sm'
                    : isDark
                      ? 'text-[#8f8b7e] hover:text-[#fafaf9]'
                      : 'text-[#5a5749] hover:text-[#1c1b18]'
                  }
                `}
              >
                {isInc ? <Plus size={14} /> : <Minus size={14} />}
                {isInc ? 'Income' : 'Expense'}
              </button>
            );
          })}
        </div>

        {/* Description */}
        <Field label="Description" error={touched.description && errors.description}>
          <input
            type="text"
            name="description"
            placeholder="e.g. Coffee, Salary, Netflix…"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass(touched.description && errors.description)}
          />
        </Field>

        {/* Amount + Date row */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount (₹)" error={touched.amount && errors.amount}>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass(touched.amount && errors.amount)}
            />
          </Field>
          <Field label="Date" error={touched.date && errors.date}>
            <input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              max={todayStr}
              className={inputClass(touched.date && errors.date)}
            />
          </Field>
        </div>

        {/* Category */}
        <Field label="Category" error={touched.category && errors.category}>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass(touched.category && errors.category)}
          >
            <option value="">Select category…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-2.5 px-4 rounded-xl text-sm font-semibold
            flex items-center justify-center gap-2
            transition-all duration-200 cursor-pointer
            disabled:opacity-60 disabled:cursor-not-allowed
            ${showSuccess
              ? 'bg-[#738f66] text-white'
              : isIncome
                ? 'bg-[#567049] hover:bg-[#3f5434] text-white'
                : 'bg-[#d45e47] hover:bg-[#b84330] text-white'
            }
          `}
        >
          {showSuccess ? (
            <>
              <CheckCircle size={15} />
              Added!
            </>
          ) : (
            <>
              <Plus size={15} />
              Add {isIncome ? 'Income' : 'Expense'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
