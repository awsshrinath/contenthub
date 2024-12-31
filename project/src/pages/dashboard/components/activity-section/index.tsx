import React from 'react';
import { RecentContent } from '@/components/dashboard/recent-content';
import { SocialConnections } from '@/components/dashboard/social-connections';
import { UpcomingSchedule } from '../upcoming-schedule';
import type { ContentItem, SocialConnection } from '@/types/dashboard';

interface ActivitySectionProps {
  recentContent?: ContentItem[];
  socialConnections?: SocialConnection[];
}

export function ActivitySection({ recentContent, socialConnections }: ActivitySectionProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recentContent && (
          <RecentContent
            items={recentContent}
            onEdit={(item) => console.log('Edit item:', item)}
          />
        )}
        {socialConnections && (
          <SocialConnections connections={socialConnections} />
        )}
      </div>
      <UpcomingSchedule />
    </div>
  );
}