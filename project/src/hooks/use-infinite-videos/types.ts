export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  watched: number;
  isFavorite: boolean;
}

export interface InfiniteVideosParams {
  category: string;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}

export interface InfiniteVideosState {
  videos: Video[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
}