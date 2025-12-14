import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import AddItemForm from './components/AddItemForm';
import MediaList from './components/MediaList';
import { MediaCategory, MediaItemType, MediaStatus, CATEGORIES } from './types';

const initialData: Record<MediaCategory, MediaItemType[]> = {
  anime: [],
  movies: [],
  music: [],
  webSeries: [],
};

const AnimeSilhouette: React.FC = () => (
    <svg
      viewBox="0 0 512 512"
      className="absolute bottom-0 right-0 h-2/3 w-2/3 max-w-lg max-h-lg text-slate-200/20 dark:text-slate-200/5 opacity-50 z-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
        <path d="M304.2,352.8c-12.8,1-25.7-3.8-35.7-12.8c-23.2-20.9-29.4-54.8-15.6-82.5c1.9-3.8,4.3-7.4,7-10.8c2.9-3.6,6.2-7,9.7-10.2
        c1.9-1.7,3.9-3.4,5.9-5c0.8-0.6,1.6-1.2,2.4-1.8c1.5-1.1,3-2.1,4.5-3.2c-1-2.2-2-4.5-3.1-6.7c-5.3-10.9-12.3-21.2-20.4-30.2
        c-10.6-11.8-22.8-21.7-36.9-29.2c-2.7,4-4.8,8.2-6.5,12.5c-3.1,8.1-4.1,16.7-2.6,25.2c1.4,7.8,5.1,15.1,10.7,20.8
        c9.1,9.1,21,13.8,33.5,13.1c1.2-0.1,2.5-0.2,3.7-0.4c-8.9,13.9-14.2,29.9-15,46.5c-0.3,6.3,0.5,12.7,2.2,18.8
        c-20.2-1.3-40-7.8-57.6-18.7c-2.6-1.6-5.1-3.4-7.5-5.3c-1.1-0.9-2.2-1.8-3.3-2.7c-19-16.5-33.1-38.3-39.6-62.8
        c-3.2-12.1-4-24.6-2.4-36.9c1.6-12.3,5.6-24.1,11.8-34.9c4.2-7.2,9.3-13.9,15.2-19.9c5.9-6,12.6-11.2,19.9-15.5
        c11-6.4,23.1-10.8,35.8-12.9c-2.3-13.1,1.1-26.6,9.2-37.5c6.1-8.3,15.2-13.9,25.4-16c-3.6-7.3-6.5-14.8-8.5-22.5
        c-1.4-5.3-2.2-10.7-2.3-16.1c0-11,4.5-21,12.5-28.3c9.7-8.8,23.1-12.5,36.2-10.1c13.1,2.4,24.6,9.6,32.3,20.2
        c7.7,10.6,11.1,23.7,9.5,36.7c-1.5,12.4-7.6,23.8-16.9,32c-6.8,6-15,9.9-23.9,11.6c-4-4.3-8.6-8.1-13.7-11.2
        c-10.9-6.7-23-10.9-35.8-12.3c-12.8-1.4-25.6,0.3-37.6,4.9c-12,4.6-22.8,12-31.4,21.6c-8.7,9.6-15,21.2-18.3,33.7
        c-3.3,12.5-3.5,25.6-0.6,38.1c2.9,12.5,8.8,24.1,16.9,33.9c8.1,9.8,18.4,17.6,30,22.8c1,0.4,2,0.9,3,1.3
        c12.2,5.5,25.4,8.4,38.8,8.4c12.1,0,24.2-2.3,35.5-6.8c11.9-4.8,22.7-11.9,31.7-20.7c0.8-0.8,1.6-1.6,2.4-2.4
        c12.2-13.1,19.6-29.6,21.1-47.3c0.1-1,0.1-2,0.2-3c4.2-0.2,8.4-0.8,12.6-1.8c13-3.1,24.8-9,34.8-17.2c1.4-1.2,2.8-2.4,4.1-3.6
        c7.4-7.2,13-15.8,16.5-25.2c2.9-7.9,3.9-16.3,2.7-24.5c-1.2-8.3-4.6-16.1-9.8-22.7c-5.2-6.5-12-11.6-19.8-14.7
        c-5.1-2-10.5-3.2-15.9-3.5c1.8-10.4-0.6-21-6.8-29.7c-4.3-6-10-10.8-16.7-13.9c-4.1,0.8-8.1,2.3-11.9,4.4
        c-10.2,5.6-18.1,13.9-22.9,23.8c-4.8,9.9-6.3,20.9-4.3,31.5c1.1,5.8,3.3,11.3,6.3,16.4c5.1,8.6,12,15.7,20.2,20.8
        c1.3,0.8,2.6,1.5,3.9,2.3c10.4,6.2,22,9.8,34,10.6c12.8,0.8,25.6-1.3,37.3-6c11.7-4.7,22.2-11.9,30.6-21
        c8.4-9.1,14.4-20.1,17.4-31.9c3-11.8,2.8-24.1-0.5-35.8c-3.3-11.7-9.6-22.4-18.2-31.3c-2.4-2.5-5-4.8-7.7-6.9
        c-5.4-4.2-11.3-7.8-17.6-10.7c-5.9-2.7-12-4.7-18.3-5.8c0-3.3,0.1-6.7,0.4-10c0.6-7,2.4-13.8,5.4-20.1
        c5.7-12.1,15.1-21.8,26.8-28.1c11.8-6.3,25.2-8.9,38.3-7.3c13.1,1.6,25.4,7.4,35.3,16.5c9.9,9.1,17,21,20.3,34.1
        c3.3,13.1,2.6,26.9-2,39.6c-4.6,12.7-12.8,23.9-23.5,32.4c-4.1,3.2-8.4,6.1-12.9,8.5c-9.2,5-19.3,8.2-29.8,9.4
        c-2.7,0.3-5.3,0.5-8,0.6c-1,10.1-4.4,19.7-9.8,28.1c-10,15.3-25.2,26.6-43,32.1c-17.8,5.5-36.8,4.8-54.2-1.9
        c-2.8-1.1-5.6-2.3-8.3-3.6c-10.1-4.9-19-11.7-26.2-19.8c-1.3-1.5-2.6-3-3.8-4.5c-9.5-11.9-14.8-26.5-15.1-41.7
        c-0.1-4.7,0.7-9.4,2.3-13.9c-10.9,13-17,28.8-17.1,45.2c0,10.5,2.4,20.8,7,30.2c7.6,15.4,19.8,28,35.1,35.9
        C285.4,351.4,294.8,353.1,304.2,352.8z"/>
    </svg>
);


const App: React.FC = () => {
  const [mediaCollection, setMediaCollection] = useState<Record<MediaCategory, MediaItemType[]>>(initialData);
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('anime');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme as 'light' | 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleAddItem = useCallback((title: string, status: MediaStatus) => {
    if (!title.trim()) return;
    const newItem: MediaItemType = {
      id: Date.now(),
      title,
      status,
      notes: '',
    };
    setMediaCollection(prev => ({
      ...prev,
      [activeCategory]: [...prev[activeCategory], newItem],
    }));
  }, [activeCategory]);

  const handleUpdateStatus = useCallback((id: number, status: MediaStatus) => {
    setMediaCollection(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(item =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  }, [activeCategory]);

  const handleUpdateNotes = useCallback((id: number, notes: string) => {
    setMediaCollection(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(item =>
        item.id === id ? { ...item, notes } : item
      ),
    }));
  }, [activeCategory]);

  const handleDeleteItem = useCallback((id: number) => {
    setMediaCollection(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(item => item.id !== id),
    }));
  }, [activeCategory]);
  
  const currentList = useMemo(() => mediaCollection[activeCategory], [mediaCollection, activeCategory]);

  return (
    <div className="min-h-screen font-sans bg-slate-100 dark:bg-slate-950 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black sm:flex sm:items-center sm:justify-center transition-colors duration-300 p-4">
      <main className="relative w-full max-w-2xl min-h-screen sm:min-h-fit sm:max-h-[90vh] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl shadow-2xl shadow-blue-200/40 dark:shadow-blue-950/20 sm:rounded-2xl p-6 md:p-8 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        <AnimeSilhouette />
        <div className="relative z-10 flex flex-col h-full">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <CategorySelector
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            <div className="mt-8">
              <AddItemForm onAddItem={handleAddItem} />
            </div>
            <div className="mt-6 border-t border-slate-200/80 dark:border-slate-700/50 pt-6 flex-1 overflow-y-auto">
              <MediaList
                items={currentList}
                onUpdateStatus={handleUpdateStatus}
                onDeleteItem={handleDeleteItem}
                onUpdateNotes={handleUpdateNotes}
              />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;