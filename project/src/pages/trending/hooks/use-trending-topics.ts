import { useState } from 'react';
import { fetchTrendingTopics } from '@/services/trending';
import type { TrendingTopic, TrendingSource, TrendingCategory } from '../types';

interface FetchParams {
  source: TrendingSource;
  category: TrendingCategory;
}

export function useTrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async (params: FetchParams) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTrendingTopics({
        source: params.source,
        category: params.category,
      });
      setTopics(data);
    } catch (err) {
      console.error('Error fetching trending topics:', err);
      setError('Failed to load trending topics. Please try again later.');
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  return { topics, loading, error, fetchTopics };
}