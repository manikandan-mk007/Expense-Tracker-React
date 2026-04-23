import { Sun, Moon, Wallet } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export default function Navbar() {
  const { theme, toggleTheme } = useExpense();
  const isDark = theme === 'dark';

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b backdrop-blur-md
      ${isDark
        ? 'bg-[#13151A]/90 border-[#363A40]'
        : 'bg-[#FFF8E7]/90 border-[#FFD77A]'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${isDark ? 'bg-[#7A4A00]' : 'bg-[#E6A520]'}
            `}>
              <Wallet size={16} className="text-white" />
            </div>
            <span
              className={`text-xl font-semibold tracking-tight
                ${isDark ? 'text-[#F5F6F7]' : 'text-[#3D2300]'}`}
              style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
            >
              Rupees Tracker
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${isDark
                  ? 'text-[#7B7F85] hover:text-[#F5F6F7] hover:bg-[#2B2E33]'
                  : 'text-[#A56E08] hover:text-[#3D2300] hover:bg-[#FFD77A]'}
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