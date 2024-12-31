import React from 'react';
import { useInView } from 'react-intersection-observer';
import { VideoCard } from './video-card';
import { Loader2 } from 'lucide-react';
import type { Video } from '@/hooks/use-infinite-videos/types';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onVideoClick: (video: Video) => void;
  onToggleFavorite: (id: string) => void;
}

export function VideoGrid({
  videos,
  loading,
  hasMore,
  onLoadMore,
  onVideoClick,
  onToggleFavorite,
}: VideoGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        onLoadMore();
      }
    },
  });

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            onClick={() => onVideoClick(video)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={ref} className="h-4" />
    </div>
  );
}