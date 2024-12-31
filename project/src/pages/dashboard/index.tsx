import React from 'react';
import { Loader2 } from 'lucide-react';
import { useDashboardData } from './hooks/useDashboardData';
import { OverviewSection } from './components/overview-section';
import { ActivitySection } from './components/activity-section';
import { ContentLibrary } from './components/content-library';
import { useVideoLibrary } from './hooks/useVideoLibrary';

export function Dashboard() {
  const { data, isLoading, error } = useDashboardData();
  const {
    videos,
    loading: videosLoading,
    hasMore,
    selectedCategory,
    sortOrder,
    searchQuery,
    handleCategoryChange,
    handleSortChange,
    handleSearchChange,
    handleLoadMore,
    handleToggleFavorite,
  } = useVideoLibrary();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <OverviewSection stats={data?.stats} />
      
      <ActivitySection 
        recentContent={data?.recentContent}
        socialConnections={data?.socialConnections}
      />

      <ContentLibrary
        videos={videos}
        loading={videosLoading}
        hasMore={hasMore}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        onLoadMore={handleLoadMore}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}