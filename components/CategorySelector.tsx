import React from 'react';
import { MediaCategory, CATEGORIES } from '../types';

interface CategorySelectorProps {
  activeCategory: MediaCategory;
  onSelectCategory: (category: MediaCategory) => void;
}

const categoryNames: Record<MediaCategory, string> = {
    anime: "🌸 Anime",
    movies: "🎬 Movies",
    music: "🎵 Music",
    webSeries: "🌐 Web-Series"
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <nav className="mt-6">
      <ul className="flex flex-wrap items-center gap-2 md:gap-3">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-blue-400 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {categoryNames[category]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategorySelector;