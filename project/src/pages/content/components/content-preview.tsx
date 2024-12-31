import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { HashtagRecommendations } from '@/components/content/hashtag-recommendations';
import { getHashtagRecommendations } from '@/services/hashtags';
import type { ContentOptions } from '@/types/content';

interface ContentPreviewProps {
  content: string;
  options: ContentOptions;
  onSave: () => void;
  onRegenerate: () => void;
}

export function ContentPreview({
  content,
  options,
  onSave,
  onRegenerate
}: ContentPreviewProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHashtags = async () => {
      setLoading(true);
      try {
        const recommendations = await getHashtagRecommendations(content, options);
        setHashtags(recommendations);
      } catch (error) {
        console.error('Failed to load hashtag recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHashtags();
  }, [content, options]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h2>
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div className="min-h-[200px] p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600">
          {content}
          
          {selectedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {selectedTags.map(tag => `#${tag}`).join(' ')}
            </div>
          )}
        </div>
      </div>

      <HashtagRecommendations
        hashtags={hashtags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        loading={loading}
      />

      <Button onClick={onSave} className="w-full bg-gradient-to-r from-primary-500 to-primary-600">
        Continue to Media
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}