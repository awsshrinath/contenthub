import React from 'react';
import { MediaCard } from './media-card';

const SAMPLE_VIDEOS = [
  {
    id: '1',
    url: 'https://example.com/video1.mp4',
    title: 'Product Demo',
    caption: 'See our latest features in action'
  },
  {
    id: '2',
    url: 'https://example.com/video2.mp4',
    title: 'Tutorial Series',
    caption: 'Learn how to maximize your productivity'
  }
];

export function VideoGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_VIDEOS.map((video) => (
          <MediaCard
            key={video.id}
            type="video"
            url={video.url}
            title={video.title}
            caption={video.caption}
          />
        ))}
      </div>
    </div>
  );
}