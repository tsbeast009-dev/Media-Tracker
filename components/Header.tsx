import React from 'react';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-start pb-4 border-b border-slate-200/80 dark:border-slate-700/50">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-wider">
          Anime<span className="text-blue-500">Track</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your personal media collection.</p>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-offset-slate-900 transition-colors"
        aria-label="Toggle theme"
      >
        <span className="relative h-6 w-6 block">
            <span className={`absolute inset-0 transition-all duration-300 transform ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
            <span className={`absolute inset-0 transition-all duration-300 transform ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </span>
        </span>
      </button>
    </header>
  );
};

export default Header;