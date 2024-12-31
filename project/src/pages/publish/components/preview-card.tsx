import React from 'react';
import { Image } from 'lucide-react';

interface PreviewCardProps {
  content?: {
    text?: string;
    mediaUrl?: string;
    hashtags?: string[];
  };
  platforms: string[];
}

export function PreviewCard({ content, platforms }: PreviewCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
      
      <div className="space-y-4">
        {/* Content Preview */}
        {content?.text && (
          <div className="text-gray-900 dark:text-white">
            <p>{content.text}</p>
            {content.hashtags && content.hashtags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {content.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-primary-600 dark:text-primary-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media Preview */}
        {content?.mediaUrl ? (
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {content.mediaUrl.endsWith('.mp4') ? (
              <video src={content.mediaUrl} controls className="w-full h-full object-cover" />
            ) : (
              <img src={content.mediaUrl} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-gray-400">
              <Image className="w-12 h-12 mx-auto mb-2" />
              <p>Content Preview</p>
            </div>
          </div>
        )}

        {/* Selected Platforms */}
        {platforms.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Publishing to:
            </h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}