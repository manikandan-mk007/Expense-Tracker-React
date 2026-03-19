import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen font-sans">
        <Navbar />
        <main>
          <Dashboard />
        </main>
      </div>
    </ExpenseProvider>
  );
}
