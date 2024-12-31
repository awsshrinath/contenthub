import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import type { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  selectedArticle: Article | null;
  onSelect: (article: Article) => void;
}

export function ArticleList({
  articles,
  loading,
  selectedArticle,
  onSelect,
}: ArticleListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 text-center">
        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          No articles found. Try a different category or feed URL.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm divide-y dark:divide-gray-700">
      {articles.map((article) => (
        <div
          key={article.id}
          className={`p-4 hover:bg-gray-50 dark:hover:bg-dark-card-hover transition-colors ${
            selectedArticle?.id === article.id ? 'bg-primary/5' : ''
          }`}
        >
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {article.summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <Button
              size="sm"
              variant={selectedArticle?.id === article.id ? 'primary' : 'outline'}
              onClick={() => onSelect(article)}
            >
              {selectedArticle?.id === article.id ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}