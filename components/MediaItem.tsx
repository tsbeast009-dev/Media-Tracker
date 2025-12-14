import React, { useState } from 'react';
import { MediaItemType, MediaStatus } from '../types';

interface MediaItemProps {
  item: MediaItemType;
  onUpdateStatus: (id: number, status: MediaStatus) => void;
  onUpdateNotes: (id: number, notes: string) => void;
  onDeleteItem: (id: number) => void;
}

const statusStyles: Record<MediaStatus, { badge: string; border: string }> = {
  [MediaStatus.WillWatch]: {
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    border: 'border-purple-400 dark:border-purple-500',
  },
  [MediaStatus.Watching]: {
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    border: 'border-blue-400 dark:border-blue-500',
  },
  [MediaStatus.Completed]: {
    badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    border: 'border-green-400 dark:border-green-500',
  },
  [MediaStatus.OnHold]: {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    border: 'border-amber-400 dark:border-amber-500',
  },
};

const StatusButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, isActive, children, className }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 rounded-md text-xs transition-colors ${
      isActive ? 'bg-slate-200 dark:bg-slate-600 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-700'
    } ${className}`}
  >
    {children}
  </button>
);


const MediaItem: React.FC<MediaItemProps> = ({ item, onUpdateStatus, onUpdateNotes, onDeleteItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');

  const handleSaveNotes = () => {
    onUpdateNotes(item.id, notes);
    setIsExpanded(false);
  };
  
  const handleCancel = () => {
    setNotes(item.notes || ''); // Reset notes to original
    setIsExpanded(false);
  }

  const styles = statusStyles[item.status];
  
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm transition-all duration-300 border-l-4 ${styles.border}`}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`notes-section-${item.id}`}
      >
        <div className="flex-grow mb-3 sm:mb-0">
          <p className="text-slate-800 dark:text-slate-100 font-semibold">{item.title}</p>
          <span
            className={`mt-1 inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles.badge}`}
          >
            {item.status}
          </span>
        </div>
        
        <div 
            className="flex items-center gap-2 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1 p-1 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
             <StatusButton 
              onClick={() => onUpdateStatus(item.id, MediaStatus.WillWatch)}
              isActive={item.status === MediaStatus.WillWatch}
              className="text-purple-600 dark:text-purple-400"
              >
              Plan
             </StatusButton>
             <StatusButton 
              onClick={() => onUpdateStatus(item.id, MediaStatus.Watching)}
              isActive={item.status === MediaStatus.Watching}
              className="text-blue-600 dark:text-blue-400"
              >
              Watching
             </StatusButton>
             <StatusButton 
              onClick={() => onUpdateStatus(item.id, MediaStatus.Completed)}
              isActive={item.status === MediaStatus.Completed}
              className="text-green-600 dark:text-green-400"
              >
              Done
             </StatusButton>
             <StatusButton 
              onClick={() => onUpdateStatus(item.id, MediaStatus.OnHold)}
              isActive={item.status === MediaStatus.OnHold}
              className="text-amber-600 dark:text-amber-400"
              >
              Hold
             </StatusButton>
          </div>
          <button
            onClick={() => onDeleteItem(item.id)}
            className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 dark:hover:text-red-400 rounded-full transition-colors"
            aria-label="Delete item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <div className="hidden sm:block sm:ml-4 text-slate-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>
       {isExpanded && (
        <div 
            id={`notes-section-${item.id}`}
            className="p-4 pt-2 border-t border-slate-200/80 dark:border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor={`notes-${item.id}`} className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">My Notes</label>
          <textarea
            id={`notes-${item.id}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you like? Any observations..."
            className="w-full p-2 text-slate-700 bg-slate-50 dark:bg-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow dark:placeholder-slate-400"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
                onClick={handleCancel}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-slate-400 transition-all dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
            >
                Cancel
            </button>
            <button
              onClick={handleSaveNotes}
              className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaItem;