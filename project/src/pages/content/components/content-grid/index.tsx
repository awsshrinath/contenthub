import React from 'react';
import { ImageGrid } from './image-grid';
import { VideoGrid } from './video-grid';
import { SocialPostGrid } from './social-post-grid';

export function ContentGrid() {
  return (
    <div className="space-y-8">
      <ImageGrid />
      <VideoGrid />
      <SocialPostGrid />
    </div>
  );
}