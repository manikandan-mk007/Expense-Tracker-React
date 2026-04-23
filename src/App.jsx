import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen font-sans bg-topaz-50 dark:bg-mist-950 text-topaz-800 dark:text-mist-100">
        <Navbar />
        <main>
          <Dashboard />
        </main>
      </div>
    </ExpenseProvider>
  );
}