import React from 'react';
import { Play, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  watched: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  category,
  watched,
  isFavorite,
  onToggleFavorite,
  onClick,
}: VideoCardProps) {
  return (
    <div 
      className="group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-sm flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {duration}
        </div>

        {/* Progress Bar */}
        {watched > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${watched}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
              {title}
            </h3>
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
              {category}
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className="text-gray-400 hover:text-primary-500 transition-colors"
          >
            {isFavorite ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}