import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Sector,
} from 'recharts';
import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/helpers';

// ── Custom Tooltip for area chart ─────────────────────────────────────────────
function AreaTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`
      rounded-xl px-3 py-2 shadow-lg text-xs
      ${isDark ? 'bg-[#2a2925] border border-[#3a3930]' : 'bg-white border border-[#e8e6df]'}
    `}>
      <p className={`font-semibold mb-1 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === 'income' ? 'Income' : 'Expenses'}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

// ── Custom Pie active shape ────────────────────────────────────────────────────
function ActiveShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.95}
      />
    </g>
  );
}

// ── Spending Trend Chart ──────────────────────────────────────────────────────
export function SpendingChart() {
  const { theme } = useExpense();
  const { dailySpending } = useTransactions();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#2a2925' : '#e8e6df';
  const axisColor = isDark ? '#5a5749' : '#8f8b7e';

  return (
    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#1c1b18] border border-[#2a2925]' : 'bg-white border border-[#e8e6df]'}`}>
      <h3
        className={`text-base font-semibold mb-4 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
      >
        14-Day Overview
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={dailySpending} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#738f66" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#738f66" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d45e47" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#d45e47" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: axisColor }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: axisColor }} tickLine={false} axisLine={false} />
          <Tooltip content={<AreaTooltip isDark={isDark} />} />
          <Area type="monotone" dataKey="income" stroke="#738f66" strokeWidth={2} fill="url(#gradIncome)" dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#d45e47" strokeWidth={2} fill="url(#gradExpense)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-center">
        {[{ color: '#738f66', label: 'Income' }, { color: '#d45e47', label: 'Expenses' }].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
            <span className={`text-xs ${isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'}`}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Category Breakdown Pie ────────────────────────────────────────────────────
export function CategoryChart() {
  const { theme } = useExpense();
  const { expensesByCategory } = useTransactions();
  const isDark = theme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);

  if (expensesByCategory.length === 0) {
    return (
      <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#1c1b18] border border-[#2a2925]' : 'bg-white border border-[#e8e6df]'}`}>
        <h3
          className={`text-base font-semibold mb-4 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
          style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
        >
          Expense Breakdown
        </h3>
        <p className={`text-sm text-center py-10 ${isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'}`}>
          No expense data available
        </p>
      </div>
    );
  }

  const totalExpenses = expensesByCategory.reduce((s, c) => s + c.value, 0);
  const active = expensesByCategory[activeIndex] || expensesByCategory[0];

  return (
    <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#1c1b18] border border-[#2a2925]' : 'bg-white border border-[#e8e6df]'}`}>
      <h3
        className={`text-base font-semibold mb-4 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
      >
        Expense Breakdown
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Pie */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%" cy="50%"
                innerRadius={50}
                outerRadius={72}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={<ActiveShape />}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {expensesByCategory.map((entry, i) => (
                  <Cell key={entry.name} fill={entry.color} opacity={i === activeIndex ? 1 : 0.55} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className={`text-[11px] ${isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'}`}>
              {active?.name?.split(' ')[0]}
            </p>
            <p className={`text-sm font-bold ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
              style={{ color: active?.color }}>
              {totalExpenses > 0 ? Math.round((active?.value / totalExpenses) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {expensesByCategory.slice(0, 6).map((item, i) => (
            <div
              key={item.name}
              className={`flex items-center gap-2 cursor-default rounded-lg px-2 py-1 transition-colors
                ${i === activeIndex
                  ? isDark ? 'bg-[#2a2925]' : 'bg-[#f5f4f0]'
                  : ''}
              `}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className={`text-xs flex-1 truncate ${isDark ? 'text-[#8f8b7e]' : 'text-[#5a5749]'}`}>
                {item.name}
              </span>
              <span className={`text-xs font-medium flex-shrink-0 ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
