import React, { useState, useEffect } from 'react';
import { TrendingCard } from './components/trending-card';
import { TrendingFilters } from './components/trending-filters';
import { useTrendingTopics } from './hooks/use-trending-topics';
import { Loader2 } from 'lucide-react';
import type { TrendingSource, TrendingCategory } from './types';

export function TrendingTopics() {
  const [selectedSource, setSelectedSource] = useState<TrendingSource>('all');
  const [selectedCategory, setSelectedCategory] = useState<TrendingCategory>('all');
  const { topics, loading, error, fetchTopics } = useTrendingTopics();

  useEffect(() => {
    fetchTopics({ source: selectedSource, category: selectedCategory });
  }, [selectedSource, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        What's Trending Now
      </h1>

      <TrendingFilters
        selectedSource={selectedSource}
        selectedCategory={selectedCategory}
        onSourceChange={setSelectedSource}
        onCategoryChange={setSelectedCategory}
      />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TrendingCard
            key={topic.id}
            topic={topic}
            onGeneratePost={() => {
              // Handle post generation
              console.log('Generate post for topic:', topic);
            }}
          />
        ))}
      </div>

      {!loading && topics.length === 0 && !error && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          No trending topics found for the selected filters.
        </div>
      )}
    </div>
  );
}