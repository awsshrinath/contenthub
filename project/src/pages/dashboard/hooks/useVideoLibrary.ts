import { useState } from 'react';
import { useInfiniteVideos } from '@/hooks/use-infinite-videos';

export function useVideoLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    videos,
    loading,
    hasMore,
    loadMore,
    toggleFavorite,
  } = useInfiniteVideos({
    category: selectedCategory,
    sortOrder,
    searchQuery,
  });

  const handleCategoryChange = (category: string) => setSelectedCategory(category);
  const handleSortChange = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  const handleSearchChange = (query: string) => setSearchQuery(query);

  return {
    videos,
    loading,
    hasMore,
    selectedCategory,
    sortOrder,
    searchQuery,
    handleCategoryChange,
    handleSortChange,
    handleSearchChange,
    handleLoadMore: loadMore,
    handleToggleFavorite: toggleFavorite,
  };
}