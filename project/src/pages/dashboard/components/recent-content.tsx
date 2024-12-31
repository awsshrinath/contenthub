import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Send, Edit2 } from 'lucide-react';
import type { ContentItem } from '@/types/dashboard';

interface RecentContentProps {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
}

export function RecentContent({ items, onEdit }: RecentContentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Content</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            {item.type === 'draft' ? (
              <FileText className="w-5 h-5 text-gray-500" />
            ) : (
              <Send className="w-5 h-5 text-green-500" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
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
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}