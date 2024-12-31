import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Sparkles } from 'lucide-react';

interface ContentInputProps {
  value: string;
  onChange: (value: string) => void;
  onTrendingClick: () => void;
}

export function ContentInput({ value, onChange, onTrendingClick }: ContentInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Content Description
        </label>
        <Button
          variant="outline"
          size="sm"
          onClick={onTrendingClick}
          className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-300"
        >
          <TrendingUp className="w-4 h-4 mr-2 text-primary-500" />
          Trending Topics
        </Button>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your content idea or enter a topic... (e.g., Write about trending AI technologies)"
          className="w-full min-h-[120px] rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-inner focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
          rows={4}
        />
        <Sparkles className="absolute right-3 top-3 w-5 h-5 text-primary-500/50" />
      </div>

      {/* AI Writing Tips */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <span className="w-1 h-1 rounded-full bg-primary-500 mr-2" />
          Be specific and descriptive
        </div>
        <div className="flex items-center">
          <span className="w-1 h-1 rounded-full bg-primary-500 mr-2" />
          Include target audience
        </div>
        <div className="flex items-center">
          <span className="w-1 h-1 rounded-full bg-primary-500 mr-2" />
          Mention key points
        </div>
      </div>
    </div>
  );
}