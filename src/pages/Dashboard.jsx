import BalanceCard from '../components/BalanceCard';
import TransactionForm from '../components/TransactionForm';
import FilterBar from '../components/FilterBar';
import TransactionList from '../components/TransactionList';
import { SpendingChart, CategoryChart } from '../components/Charts';
import { useExpense } from '../context/ExpenseContext';

export default function Dashboard() {
  const { theme } = useExpense();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#111009]' : 'bg-[#f5f4f0]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
            style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
          >
            Dashboard
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-[#5a5749]' : 'text-[#8f8b7e]'}`}>
            Track your income and spending in one place
          </p>
        </div>

        {/* Main grid: left sidebar + right content */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr] gap-6 items-start">

          {/* ── Left column ── */}
          <div className="space-y-6">
            <BalanceCard />
            <TransactionForm />
          </div>

          {/* ── Right column ── */}
          <div className="space-y-6">
            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SpendingChart />
              <CategoryChart />
            </div>

            {/* Filter + Transactions */}
            <FilterBar />
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}
