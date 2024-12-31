import React from 'react';
import { SocialPostCard } from './social-post-card';

const SAMPLE_POSTS = [
  {
    id: '1',
    content: 'Exciting news! Our latest AI feature is now live 🚀',
    platform: 'twitter',
    engagement: { likes: 245, shares: 89 }
  },
  {
    id: '2',
    content: 'Check out our new guide to digital transformation',
    platform: 'linkedin',
    engagement: { likes: 156, shares: 45 }
  },
  {
    id: '3',
    content: 'Behind the scenes at our latest product launch',
    platform: 'instagram',
    engagement: { likes: 1203, shares: 67 }
  },
  {
    id: '4',
    content: 'Join us for our upcoming webinar on AI trends',
    platform: 'facebook',
    engagement: { likes: 342, shares: 78 }
  }
];

export function SocialPostGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Social Media Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_POSTS.map((post) => (
          <SocialPostCard
            key={post.id}
            content={post.content}
            platform={post.platform}
            engagement={post.engagement}
          />
        ))}
      </div>
    </div>
  );
}