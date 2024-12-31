import React from 'react';
import { TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TRENDING_TOPICS = [
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

export function TrendingSidebar() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg sticky top-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Topics</h2>
      </div>

      <div className="space-y-4">
        {TRENDING_TOPICS.map((topic, index) => (
          <div
            key={index}
            className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{topic.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
                {topic.category}
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