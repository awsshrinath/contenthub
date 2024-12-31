import React, { useState } from 'react';
import { FeedSelector } from './feed-selector';
import { ArticleList } from './article-list';
import { PostEditor } from './post-editor';
import { ImageGenerator } from './image-generator';
import { PublishScheduler } from './publish-scheduler';
import { useFeedArticles } from '../hooks/use-feed-articles';
import { usePostGeneration } from '../hooks/use-post-generation';
import type { Article, Platform } from '../types';

export function DailyPostGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { articles, loading, fetchArticles } = useFeedArticles();
  const { generatedPost, generatePost } = usePostGeneration();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <FeedSelector 
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          onFetch={fetchArticles}
        />

        <ArticleList
          articles={articles}
          loading={loading}
          selectedArticle={selectedArticle}
          onSelect={setSelectedArticle}
        />
      </div>

      {selectedArticle && (
        <div className="space-y-6">
          <PostEditor
            platform={selectedPlatform}
            article={selectedArticle}
            generatedPost={generatedPost}
            onRegenerate={() => generatePost(selectedArticle, selectedPlatform)}
          />

          <ImageGenerator article={selectedArticle} />

          <PublishScheduler
            platform={selectedPlatform}
            post={generatedPost}
          />
        </div>
      )}
    </div>
  );
}