import React from 'react';
import { MediaCard } from './media-card';

const SAMPLE_IMAGES = [
  {
    id: '1',
    url: 'https://source.unsplash.com/600x400?technology',
    title: 'Tech Innovation',
    caption: 'Exploring the future of technology'
  },
  {
    id: '2',
    url: 'https://source.unsplash.com/600x400?business',
    title: 'Modern Business',
    caption: 'Business trends in 2024'
  },
  {
    id: '3',
    url: 'https://source.unsplash.com/600x400?marketing',
    title: 'Digital Marketing',
    caption: 'Marketing strategies that work'
  }
];

export function ImageGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Featured Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_IMAGES.map((image) => (
          <MediaCard
            key={image.id}
            type="image"
            url={image.url}
            title={image.title}
            caption={image.caption}
          />
        ))}
      </div>
    </div>
  );
}