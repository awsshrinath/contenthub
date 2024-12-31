import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, MessageSquare } from 'lucide-react';

const SAMPLE_SUGGESTIONS = [
  {
    title: "AI in Business",
    description: "How artificial intelligence is transforming modern business operations",
    category: "Technology"
  },
  {
    title: "Remote Work Tips",
    description: "Essential productivity tips for remote teams",
    category: "Business"
  },
  {
    title: "Social Media Strategy",
    description: "Building an effective social media presence in 2024",
    category: "Marketing"
  }
];

export function ContentSuggestions() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
          Trending Topics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_SUGGESTIONS.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{suggestion.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
                {suggestion.category}
              </span>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Use This
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}