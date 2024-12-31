import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Rss } from 'lucide-react';
import type { Platform } from '../types';

const CATEGORIES = ['Technology', 'Marketing', 'Finance', 'Business', 'AI'];

interface FeedSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  onFetch: (params: { category?: string; url?: string }) => void;
}

export function FeedSelector({
  selectedPlatform,
  onPlatformChange,
  onFetch,
}: FeedSelectorProps) {
  const [category, setCategory] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Platform
        </label>
        <div className="flex gap-4">
          <Button
            variant={selectedPlatform === 'linkedin' ? 'primary' : 'outline'}
            onClick={() => onPlatformChange('linkedin')}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            variant={selectedPlatform === 'twitter' ? 'primary' : 'outline'}
            onClick={() => onPlatformChange('twitter')}
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Feed Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Custom Feed URL
        </label>
        <div className="flex gap-4">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://example.com/feed.xml"
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          <Button
            onClick={() => onFetch({ url: customUrl })}
            disabled={!customUrl && !category}
          >
            <Rss className="w-4 h-4 mr-2" />
            Fetch Articles
          </Button>
        </div>
      </div>
    </div>
  );
}