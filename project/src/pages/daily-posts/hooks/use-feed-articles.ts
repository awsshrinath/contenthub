import { useState } from 'react';
import type { Article } from '../types';

export function useFeedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (params: { category?: string; url?: string }) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (params.category) searchParams.append('category', params.category);
      if (params.url) searchParams.append('url', params.url);

      const response = await fetch(`/api/rss-feed?${searchParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, fetchArticles };
}