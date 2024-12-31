import { useCallback, useRef } from 'react';
import { InfiniteVideosState, InfiniteVideosParams } from './types';
import { fetchVideos } from './video-service';

const ITEMS_PER_PAGE = 6;

export function useLoadVideos(params: InfiniteVideosParams, page: number) {
  const loadingRef = useRef(false);

  return useCallback(async (
    setState: React.Dispatch<React.SetStateAction<InfiniteVideosState>>,
    resetPage = false
  ) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const currentPage = resetPage ? 1 : page;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { videos, hasMore } = await fetchVideos({
        ...params,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      setState(prev => ({
        videos: currentPage === 1 ? videos : [...prev.videos, ...videos],
        loading: false,
        hasMore,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load videos',
      }));
    } finally {
      loadingRef.current = false;
    }
  }, [params, page]);
}