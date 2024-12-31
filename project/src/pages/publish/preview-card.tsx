import React from 'react';
import { Image } from 'lucide-react';

interface PreviewCardProps {
  platforms: string[];
}

export function PreviewCard({ platforms }: PreviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
      
      <div className="space-y-4">
        {/* Preview Image */}
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-400">
            <Image className="w-12 h-12 mx-auto mb-2" />
            <p>Content Preview</p>
          </div>
        </div>

        {/* Selected Platforms */}
        {platforms.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Publishing to:
            </h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
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