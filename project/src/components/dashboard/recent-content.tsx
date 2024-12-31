import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Send } from 'lucide-react';
import type { ContentItem } from '@/types/dashboard';

interface RecentContentProps {
  items: ContentItem[];
}

export function RecentContent({ items }: RecentContentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Content</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
          >
            {item.type === 'draft' ? (
              <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Send className="w-5 h-5 text-green-500" />
            )}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                {item.platform && (
                  <span className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 px-2 py-0.5 rounded-full">
                    {item.platform}
                  </span>
                )}
                {item.status && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}