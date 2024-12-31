import React, { useState } from 'react';
import { Play, Image, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  type: 'image' | 'video';
  url: string;
  title: string;
  caption: string;
}

export function MediaCard({ type, url, title, caption }: MediaCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={cn(
        "relative aspect-[3/2] bg-gray-100 dark:bg-gray-700",
        loading && "animate-pulse"
      )}>
        {type === 'image' ? (
          <img
            src={url}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
              loading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{caption}</p>
      </div>

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
          View {type === 'image' ? 'Image' : 'Video'}
        </button>
      </div>
    </div>
  );
}