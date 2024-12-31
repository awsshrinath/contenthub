import React, { useState } from 'react';
import { FeedSelector } from './components/feed-selector';
import { ArticleList } from './components/article-list';
import { PostEditor } from './components/post-editor';
import { ImageGenerator } from './components/image-generator';
import { PublishScheduler } from './components/publish-scheduler';
import { useFeedArticles } from './hooks/use-feed-articles';
import { usePostGeneration } from './hooks/use-post-generation';
import type { Article, Platform } from './types';

export function DailyPostGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { articles, loading, fetchArticles } = useFeedArticles();
  const { generatedPost, generatePost } = usePostGeneration();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Daily Post Generator
      </h1>

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
    </div>
  );
}