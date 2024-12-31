import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Send } from 'lucide-react';
import type { Platform, GeneratedPost } from '../types';

interface PublishSchedulerProps {
  platform: Platform;
  post: GeneratedPost | null;
}

export function PublishScheduler({ platform, post }: PublishSchedulerProps) {
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');

  const handlePublish = async (schedule?: boolean) => {
    if (!post) return;

    const endpoint = schedule ? '/api/schedule-post' : '/api/publish-post';
    const body = {
      platform,
      content: post.content,
      hashtags: post.hashtags,
      scheduledTime: schedule
        ? new Date(`${scheduleDate}T${scheduleTime}`).toISOString()
        : undefined,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to publish post');
      
      // Handle success (e.g., show notification, redirect)
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Publishing Options
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Schedule Date
          </label>
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Schedule Time
          </label>
          <input
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => handlePublish(true)}
          disabled={!scheduleDate || !scheduleTime}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Post
        </Button>
        <Button
          className="flex-1"
          onClick={() => handlePublish()}
        >
          <Send className="w-4 h-4 mr-2" />
          Publish Now
        </Button>
      </div>
    </div>
  );
}