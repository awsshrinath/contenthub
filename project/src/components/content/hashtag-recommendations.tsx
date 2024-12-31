import React from 'react';
import { Button } from '@/components/ui/button';
import { Hash, Sparkles } from 'lucide-react';

interface HashtagRecommendation {
  tag: string;
  score: number;
  category?: string;
}

interface HashtagRecommendationsProps {
  hashtags: HashtagRecommendation[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  loading?: boolean;
}

export function HashtagRecommendations({
  hashtags,
  selectedTags,
  onToggleTag,
  loading = false,
}: HashtagRecommendationsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
          AI-Suggested Hashtags
        </h3>
        {loading && (
          <span className="text-xs text-gray-500 animate-pulse">
            Analyzing content...
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {hashtags.map(({ tag, score, category }) => (
          <Button
            key={tag}
            size="sm"
            variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
            onClick={() => onToggleTag(tag)}
            className="group relative"
          >
            <Hash className="w-3 h-3 mr-1" />
            {tag}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {category && <span className="block">{category}</span>}
              <span className="block">Relevance: {Math.round(score * 100)}%</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}