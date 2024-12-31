import React from 'react';
import { SearchBar } from '@/components/dashboard/filters/search-bar';
import { FilterBar } from '@/components/dashboard/filters/filter-bar';
import { VideoGrid } from '@/components/dashboard/video-grid/video-grid';
import { useVideoHandlers } from '../../hooks/useVideoHandlers';
import type { Video } from '@/types/dashboard';

interface ContentLibraryProps {
  videos: Video[];
  loading: boolean;
  hasMore: boolean;
  selectedCategory: string;
  sortOrder: 'asc' | 'desc';
  onLoadMore: () => void;
  onCategoryChange: (category: string) => void;
  onSortChange: () => void;
  onSearchChange: (query: string) => void;
  onToggleFavorite: (id: string) => void;
}

const CATEGORIES = ['All', 'Tutorial', 'Product', 'Marketing', 'Social'];

export function ContentLibrary({
  videos,
  loading,
  hasMore,
  selectedCategory,
  sortOrder,
  onLoadMore,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onToggleFavorite,
}: ContentLibraryProps) {
  const { handleVideoClick } = useVideoHandlers();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Content Library
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-96">
          <SearchBar onSearch={onSearchChange} />
        </div>
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          sortOrder={sortOrder}
          onCategoryChange={onCategoryChange}
          onSortChange={onSortChange}
        />
      </div>

      <VideoGrid
        videos={videos}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        onVideoClick={handleVideoClick}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}