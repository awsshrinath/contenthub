import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Twitter, Search, MessageCircle } from 'lucide-react';
import type { TrendingTopic } from '../types';

interface TrendingCardProps {
  topic: TrendingTopic;
  onGeneratePost: (topic: TrendingTopic) => void;
}

export function TrendingCard({ topic, onGeneratePost }: TrendingCardProps) {
  const SourceIcon = {
    twitter: Twitter,
    google: Search,
    reddit: MessageCircle,
  }[topic.source] || Search;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <SourceIcon className="w-5 h-5 text-primary-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
        </div>
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {topic.volume.toLocaleString()} mentions
        </span>
      </div>

      {topic.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {topic.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
            {topic.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {topic.source}
          </span>
        </div>

        <div className="flex space-x-2">
          {topic.url && (
            <Button variant="outline" size="sm" onClick={() => window.open(topic.url, '_blank')}>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          )}
          <Button size="sm" onClick={() => onGeneratePost(topic)}>
            Generate Post
          </Button>
        </div>
      </div>
    </div>
  );
}