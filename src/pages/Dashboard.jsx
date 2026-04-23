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
    <div className={`min-h-screen ${isDark ? 'bg-[#13151A]' : 'bg-[#FFF8E7]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-semibold tracking-tight
              ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}
            style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
          >
            Dashboard
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-[#5E6268]' : 'text-[#A56E08]'}`}>
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