import { useState, useEffect, useCallback } from 'react';
import { InfiniteVideosParams, InfiniteVideosState } from './types';
import { useLoadVideos } from './useLoadVideos';
import { useFavoriteToggle } from './useFavoriteToggle';
import { useParamsEffect } from './useParamsEffect';

export function useInfiniteVideos(params: InfiniteVideosParams) {
  const [state, setState] = useState<InfiniteVideosState>({
    videos: [],
    loading: false,
    hasMore: true,
    error: null,
  });
  const [page, setPage] = useState(1);

  const loadVideos = useLoadVideos(params, page);
  const toggleFavorite = useFavoriteToggle();

  const handleParamsChange = useCallback(() => {
    setPage(1);
    loadVideos(setState, true);
  }, [loadVideos]);

  useParamsEffect(params, handleParamsChange);

  // Initial load
  useEffect(() => {
    if (page === 1 && !state.loading && state.videos.length === 0) {
      loadVideos(setState);
    }
  }, [page, loadVideos, state.loading, state.videos.length]);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      setPage(prev => prev + 1);
    }
  }, [state.loading, state.hasMore]);

  return {
    videos: state.videos,
    loading: state.loading,
    hasMore: state.hasMore,
    error: state.error,
    loadMore,
    toggleFavorite: (videoId: string) => toggleFavorite(videoId, setState),
  };
}