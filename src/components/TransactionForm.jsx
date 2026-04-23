import { useState, useCallback } from 'react';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { useForm } from '../hooks/useForm';
import { getCategoriesForType } from '../utils/helpers';
import { TRANSACTION_TYPES } from '../utils/constants';
import { format } from 'date-fns';

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

function Field({ label, error, isDark, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-xs font-medium uppercase tracking-wide
        ${isDark ? 'text-[#7B7F85]' : 'text-[#A56E08]'}`}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[#C95050] mt-0.5">{error}</p>}
    </div>
  );
}

const inputClass = (hasError, isDark) => `
  w-full px-3 py-2.5 rounded-xl text-sm outline-none
  border transition-all duration-150
  ${isDark
    ? `bg-[#2B2E33] text-[#F5F6F7] placeholder:text-[#7B7F85]
       ${hasError
         ? 'border-[#C95050] focus:border-[#C95050] focus:ring-2 focus:ring-[#C95050]/20'
         : 'border-[#363A40] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/20'}`
    : `bg-[#FFF8E7] text-[#3D2300] placeholder:text-[#A56E08]
       ${hasError
         ? 'border-[#C95050] focus:border-[#C95050] focus:ring-2 focus:ring-[#C95050]/20'
         : 'border-[#FFD77A] focus:border-[#E6A520] focus:ring-2 focus:ring-[#E6A520]/30'}`
  }
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
    values, errors, touched, isSubmitting,
    handleChange, handleBlur, handleSubmit: submitForm, setFieldValue,
  } = useForm(INITIAL_VALUES, validate, handleSubmit);

  const categories = getCategoriesForType(values.type);
  const isIncome = values.type === TRANSACTION_TYPES.INCOME;

  return (
    <div className={`rounded-2xl p-5 border
      ${isDark ? 'bg-[#1E2025] border-[#363A40]' : 'bg-white border-[#FFD77A]'}`}>
      <h2
        className={`text-base font-semibold mb-5 ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
      >
        New Transaction
      </h2>

      <form onSubmit={submitForm} noValidate className="space-y-4">
        {/* Type toggle */}
        <div className={`flex rounded-xl p-1 ${isDark ? 'bg-[#13151A]' : 'bg-[#FFF0C4]'}`}>
          {[TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.INCOME].map((type) => {
            const active = values.type === type;
            const isInc = type === TRANSACTION_TYPES.INCOME;
            return (
              <button
                key={type}
                type="button"
                onClick={() => { setFieldValue('type', type); setFieldValue('category', ''); }}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${active
                    ? isInc
                      ? 'bg-[#E6A520] text-white shadow-sm'
                      : 'bg-[#C95050] text-white shadow-sm'
                    : isDark
                      ? 'text-[#7B7F85] hover:text-[#F5F6F7]'
                      : 'text-[#A56E08] hover:text-[#3D2300]'}
                `}
              >
                {isInc ? <Plus size={14} /> : <Minus size={14} />}
                {isInc ? 'Income' : 'Expense'}
              </button>
            );
          })}
        </div>

        {/* Description */}
        <Field label="Description" error={touched.description && errors.description} isDark={isDark}>
          <input
            type="text"
            name="description"
            placeholder="e.g. Coffee, Salary, Netflix…"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass(touched.description && errors.description, isDark)}
          />
        </Field>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount (₹)" error={touched.amount && errors.amount} isDark={isDark}>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass(touched.amount && errors.amount, isDark)}
            />
          </Field>
          <Field label="Date" error={touched.date && errors.date} isDark={isDark}>
            <input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              max={todayStr}
              className={inputClass(touched.date && errors.date, isDark)}
            />
          </Field>
        </div>

        {/* Category */}
        <Field label="Category" error={touched.category && errors.category} isDark={isDark}>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass(touched.category && errors.category, isDark)}
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
              ? 'bg-[#E6A520] text-white'
              : isIncome
                ? 'bg-[#E6A520] hover:bg-[#C98A10] text-white'
                : 'bg-[#C95050] hover:bg-[#A03838] text-white'}
          `}
        >
          {showSuccess
            ? <><CheckCircle size={15} /> Added!</>
            : <><Plus size={15} /> Add {isIncome ? 'Income' : 'Expense'}</>}
        </button>
      </form>
    </div>
  );
}