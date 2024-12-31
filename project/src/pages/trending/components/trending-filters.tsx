import React from 'react';
import { Button } from '@/components/ui/button';
import type { TrendingSource, TrendingCategory } from '../types';

const SOURCES: { value: TrendingSource; label: string }[] = [
  { value: 'all', label: 'All Sources' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'google', label: 'Google Trends' },
  { value: 'reddit', label: 'Reddit' },
];

const CATEGORIES: { value: TrendingCategory; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'business', label: 'Business' },
  { value: 'ai', label: 'AI' },
];

interface TrendingFiltersProps {
  selectedSource: TrendingSource;
  selectedCategory: TrendingCategory;
  onSourceChange: (source: TrendingSource) => void;
  onCategoryChange: (category: TrendingCategory) => void;
}

export function TrendingFilters({
  selectedSource,
  selectedCategory,
  onSourceChange,
  onCategoryChange,
}: TrendingFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Source
          </label>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map(({ value, label }) => (
              <Button
                key={value}
                variant={selectedSource === value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onSourceChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ value, label }) => (
              <Button
                key={value}
                variant={selectedCategory === value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}