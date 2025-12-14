export enum MediaStatus {
  Watching = 'Watching',
  Completed = 'Completed',
  OnHold = 'On Hold',
  WillWatch = 'Will Watch',
}

export const CATEGORIES = ['anime', 'movies', 'music', 'webSeries'] as const;
export type MediaCategory = typeof CATEGORIES[number];

export interface MediaItemType {
  id: number;
  title: string;
  status: MediaStatus;
  notes?: string;
}