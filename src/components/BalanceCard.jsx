import { TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useExpense } from '../context/ExpenseContext';
import { useTransactions } from '../hooks/useTransactions';

function StatCard({ label, value, icon: Icon, colorClass, bgClass, darkBgClass, isDark }) {
  return (
    <div className={`
      rounded-2xl p-5 flex flex-col gap-3
      ${isDark ? darkBgClass : bgClass}
    `}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium
          ${isDark ? 'text-[#7B7F85]' : 'text-[#A56E08]'}`}>
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon size={15} className="text-white" />
        </div>
      </div>
      <p
        className={`text-2xl font-semibold tracking-tight
          ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
      >
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export default function BalanceCard() {
  const { theme } = useExpense();
  const { totals } = useTransactions();
  const isDark = theme === 'dark';
  const isNegative = totals.balance < 0;

  return (
    <div className="space-y-4">
      {/* Main balance banner */}
      <div className={`
        rounded-2xl p-6 relative overflow-hidden
        ${isDark
          ? 'bg-gradient-to-br from-[#7A4A00] to-[#5C3600]'
          : 'bg-gradient-to-br from-[#E6A520] to-[#C98A10]'}
      `}>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-4 w-24 h-24 rounded-full bg-white/10" />

        <div className="relative">
          <p className="text-sm font-medium text-white/70 mb-1">Net Balance</p>
          <p
            className="text-4xl font-semibold tracking-tight text-white mb-3"
            style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
          >
            {isNegative ? '−' : ''}{formatCurrency(Math.abs(totals.balance))}
          </p>
          <div className="flex items-center gap-2">
            <Scale size={13} className="text-white/60" />
            <span className="text-xs text-white/60">Income minus expenses</span>
          </div>
        </div>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Total Income"
          value={totals.income}
          icon={TrendingUp}
          colorClass="bg-[#E6A520]"
          bgClass="bg-[#FFF0C4] border border-[#FFD77A]"
          darkBgClass="bg-[#2B2E33] border border-[#363A40]"
          isDark={isDark}
        />
        <StatCard
          label="Total Expenses"
          value={totals.expenses}
          icon={TrendingDown}
          colorClass="bg-[#C95050]"
          bgClass="bg-[#FDF0EE] border border-[#F0C4C4]"
          darkBgClass="bg-[#2B2020] border border-[#3D2828]"
          isDark={isDark}
        />
      </div>
    </div>
  );
}