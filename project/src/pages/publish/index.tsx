import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SocialAccounts } from './components/social-accounts';
import { PostScheduler } from './components/post-scheduler';
import { PreviewCard } from './components/preview-card';
import { publishContent, schedulePost, getPublishingStatus } from '@/services/publishing';
import { Send, Loader2 } from 'lucide-react';
import type { PublishingStatus } from '@/types/publishing';

interface LocationState {
  content: {
    text?: string;
    mediaUrl?: string;
    hashtags?: string[];
  };
}

export function Publish() {
  const location = useLocation();
  const { content } = (location.state as LocationState) || {};
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishingStatus, setPublishingStatus] = useState<PublishingStatus[]>([]);

  useEffect(() => {
    loadPublishingStatus();
  }, []);

  const loadPublishingStatus = async () => {
    try {
      const status = await getPublishingStatus('user123');
      setPublishingStatus(status);
    } catch (error) {
      console.error('Failed to load publishing status:', error);
    }
  };

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) return;

    setPublishing(true);
    try {
      for (const platform of selectedPlatforms) {
        if (scheduledTime) {
          await schedulePost('user123', platform, content, scheduledTime);
        } else {
          await publishContent(platform, content, 'user-token');
        }
      }

      await loadPublishingStatus();
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Publish Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Social Media Accounts */}
          <SocialAccounts
            selected={selectedPlatforms}
            onSelect={setSelectedPlatforms}
          />

          {/* Scheduling */}
          <PostScheduler
            value={scheduledTime}
            onChange={setScheduledTime}
          />

          {/* Publishing Status */}
          {publishingStatus.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Publishing Status</h2>
              <div className="space-y-4">
                {publishingStatus.map((status) => (
                  <div
                    key={status.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{status.platform}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {status.status === 'published' 
                          ? `Published at ${new Date(status.timestamp).toLocaleString()}`
                          : `Scheduled for ${new Date(status.scheduledTime!).toLocaleString()}`
                        }
                      </p>
                    </div>
                    {status.publishedUrl && (
                      <a
                        href={status.publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline"
                      >
                        View Post
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publish Button */}
          <Button 
            onClick={handlePublish} 
            className="w-full" 
            disabled={publishing || selectedPlatforms.length === 0}
          >
            {publishing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {publishing 
              ? 'Publishing...' 
              : scheduledTime 
                ? 'Schedule Post' 
                : 'Publish Now'
            }
          </Button>
        </div>

        {/* Preview */}
        <PreviewCard 
          content={content}
          platforms={selectedPlatforms} 
        />
      </div>
    </div>
  );
}