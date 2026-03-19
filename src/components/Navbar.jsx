import { Sun, Moon, Wallet } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export default function Navbar() {
  const { theme, toggleTheme } = useExpense();
  const isDark = theme === 'dark';

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b backdrop-blur-md
      ${isDark
        ? 'bg-[#111009]/90 border-[#2a2925]'
        : 'bg-[#fafaf9]/90 border-[#e8e6df]'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${isDark ? 'bg-[#567049]' : 'bg-[#567049]'}
            `}>
              <Wallet size={16} className="text-white" />
            </div>
            <div>
              <span
                className={`text-xl font-semibold tracking-tight ${isDark ? 'text-[#fafaf9]' : 'text-[#1c1b18]'}`}
                style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
              >
                Rupees Tracker
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${isDark
                  ? 'text-[#8f8b7e] hover:text-[#fafaf9] hover:bg-[#2a2925]'
                  : 'text-[#8f8b7e] hover:text-[#1c1b18] hover:bg-[#e8e6df]'}
              `}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
