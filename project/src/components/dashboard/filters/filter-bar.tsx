import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: 'asc' | 'desc';
  onCategoryChange: (category: string) => void;
  onSortChange: () => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onSortChange}
      >
        {sortOrder === 'asc' ? (
          <SortAsc className="w-4 h-4 mr-2" />
        ) : (
          <SortDesc className="w-4 h-4 mr-2" />
        )}
        Sort
      </Button>
    </div>
  );
}