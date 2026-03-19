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
        <span className={`text-sm font-medium ${isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'}`}>
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon size={15} className="text-white" />
        </div>
      </div>
      <p className={`text-2xl font-semibold tracking-tight ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
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
      {/* Main balance */}
      <div className={`
        rounded-2xl p-6 relative overflow-hidden
        ${isDark ? 'bg-[#567049]' : 'bg-[#567049]'}
      `}>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -right-4 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-sm font-medium text-white/70 mb-1">Net Balance</p>
          <p
            className={`text-4xl font-semibold tracking-tight text-white mb-3`}
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
          colorClass="bg-[#738f66]"
          bgClass="bg-[#f2f6f0]"
          darkBgClass="bg-[#1e2a1b]"
          isDark={isDark}
        />
        <StatCard
          label="Total Expenses"
          value={totals.expenses}
          icon={TrendingDown}
          colorClass="bg-[#d45e47]"
          bgClass="bg-[#fdf0ee]"
          darkBgClass="bg-[#2a1e1b]"
          isDark={isDark}
        />
      </div>
    </div>
  );
}
