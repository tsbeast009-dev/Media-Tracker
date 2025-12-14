import React from 'react';
import { MediaItemType, MediaStatus } from '../types';
import MediaItem from './MediaItem';

interface MediaListProps {
  items: MediaItemType[];
  onUpdateStatus: (id: number, status: MediaStatus) => void;
  onUpdateNotes: (id: number, notes: string) => void;
  onDeleteItem: (id: number) => void;
}

const MediaList: React.FC<MediaListProps> = ({ items, onUpdateStatus, onUpdateNotes, onDeleteItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <p className="text-slate-500 dark:text-slate-400">This collection is empty.</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm">Add a new title to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pr-2">
      {items.map((item) => (
        <MediaItem
          key={item.id}
          item={item}
          onUpdateStatus={onUpdateStatus}
          onUpdateNotes={onUpdateNotes}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
};

export default MediaList;