import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import { fetchTrendingTopics } from '@/services/trending';
import type { TrendingTopic } from '@/types/trending';

interface TrendingTopicsModalProps {
  onSelect: (topic: TrendingTopic) => void;
  onClose: () => void;
}

export function TrendingTopicsModal({ onSelect, onClose }: TrendingTopicsModalProps) {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTrendingTopics({ source: 'all', category: 'all' });
        setTopics(data);
      } catch (error) {
        console.error('Failed to load trending topics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Topics</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          ) : (
            <div className="grid gap-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors"
                  onClick={() => onSelect(topic)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                    <span className="text-sm text-primary-600 dark:text-primary-400">
                      {topic.volume.toLocaleString()} mentions
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{topic.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                      {topic.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      {topic.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}