import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw } from 'lucide-react';
import type { ContentType } from '@/types/admin';

interface ContentPreviewProps {
  contentType: ContentType;
  prompt: string;
  mediaUrl?: string;
  onRegenerate: () => void;
  onSave: () => void;
  loading?: boolean;
}

export function ContentPreview({
  contentType,
  prompt,
  mediaUrl,
  onRegenerate,
  onSave,
  loading = false,
}: ContentPreviewProps) {
  return (
    <div className="space-y-6 bg-dark-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-200">Preview</h3>

      <div className="space-y-4">
        <div className="bg-dark-card-hover p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Generated Prompt</h4>
          <p className="text-gray-200">{prompt}</p>
        </div>

        {mediaUrl && (
          <div className="aspect-video bg-dark-card-hover rounded-lg overflow-hidden">
            {contentType === 'image' ? (
              <img
                src={mediaUrl}
                alt="Generated content"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={mediaUrl}
                controls
                className="w-full h-full"
              />
            )}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onRegenerate}
            disabled={loading}
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button
            onClick={onSave}
            disabled={loading || !mediaUrl}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}