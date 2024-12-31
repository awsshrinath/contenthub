import { useCallback } from 'react';
import type { Video } from '@/hooks/use-infinite-videos/types';

export function useVideoHandlers() {
  const handleVideoClick = useCallback((video: Video) => {
    console.log('Video clicked:', video);
  }, []);

  const handleCategoryChange = useCallback((setSelectedCategory: (category: string) => void) => 
    (category: string) => {
      setSelectedCategory(category);
    }, []);

  const handleSortChange = useCallback((setSortOrder: (value: React.SetStateAction<'asc' | 'desc'>) => void) => 
    () => {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }, []);

  const handleSearch = useCallback((setSearchQuery: (query: string) => void) => 
    (query: string) => {
      setSearchQuery(query);
    }, []);

  return {
    handleVideoClick,
    handleCategoryChange,
    handleSortChange,
    handleSearch,
  };
}