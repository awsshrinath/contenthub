import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Hash } from 'lucide-react';
import type { Article, Platform, GeneratedPost } from '../types';

interface PostEditorProps {
  platform: Platform;
  article: Article;
  generatedPost: GeneratedPost | null;
  onRegenerate: () => void;
}

export function PostEditor({
  platform,
  article,
  generatedPost,
  onRegenerate,
}: PostEditorProps) {
  const [content, setContent] = useState(generatedPost?.content || '');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(generatedPost?.hashtags || []);

  const maxLength = platform === 'twitter' ? 280 : 3000;

  const toggleHashtag = (tag: string) => {
    setSelectedHashtags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Generated Post
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          maxLength={maxLength}
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover"
          placeholder="Your post content..."
        />
        <div className="text-sm text-gray-500 mt-1">
          {content.length}/{maxLength} characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Hashtags
        </label>
        <div className="flex flex-wrap gap-2">
          {generatedPost?.hashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleHashtag(tag)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                selectedHashtags.includes(tag)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-dark-card-hover dark:text-gray-300'
              }`}
            >
              <Hash className="w-3 h-3 mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}