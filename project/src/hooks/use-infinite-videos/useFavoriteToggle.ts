import { useCallback } from 'react';
import { InfiniteVideosState } from './types';
import { toggleVideoFavorite } from './video-service';

export function useFavoriteToggle() {
  return useCallback(async (
    videoId: string,
    setState: React.Dispatch<React.SetStateAction<InfiniteVideosState>>
  ) => {
    setState(prev => ({
      ...prev,
      videos: prev.videos.map(video =>
        video.id === videoId
          ? { ...video, isFavorite: !video.isFavorite }
          : video
      ),
    }));

    try {
      await toggleVideoFavorite(videoId);
    } catch (error) {
      // Revert on error
      setState(prev => ({
        ...prev,
        videos: prev.videos.map(video =>
          video.id === videoId
            ? { ...video, isFavorite: !video.isFavorite }
            : video
        ),
      }));
    }
  }, []);
}