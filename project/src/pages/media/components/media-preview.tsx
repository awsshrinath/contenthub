import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { GeneratedMedia } from '@/types/media';

interface MediaPreviewProps {
  media: GeneratedMedia;
  onNext: () => void;
}

export function MediaPreview({ media, onNext }: MediaPreviewProps) {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
      
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt="Generated content"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={media.url}
            controls
            className="w-full h-full"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {Object.entries(media.metadata).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300"
            >
              {key}: {value}
            </span>
          ))}
        </div>
        <Button onClick={onNext}>
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}