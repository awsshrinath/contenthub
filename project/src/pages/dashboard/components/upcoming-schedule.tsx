import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit2 } from 'lucide-react';

interface ScheduledPost {
  id: string;
  title: string;
  platform: string;
  scheduledFor: string;
}

const scheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    title: 'Marketing Strategy 2024',
    platform: 'LinkedIn',
    scheduledFor: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Product Launch Video',
    platform: 'YouTube',
    scheduledFor: '2024-03-21T15:30:00Z',
  },
];

export function UpcomingSchedule() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Schedule</h2>
        <Button variant="outline" size="sm">View Calendar</Button>
      </div>

      <div className="space-y-4">
        {scheduledPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{post.title}</h3>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.scheduledFor).toLocaleDateString()}
                <Clock className="w-4 h-4 ml-4 mr-1" />
                {new Date(post.scheduledFor).toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full">
                {post.platform}
              </span>
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}