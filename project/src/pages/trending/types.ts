export type TrendingSource = 'all' | 'twitter' | 'google' | 'reddit';
export type TrendingCategory = 'all' | 'technology' | 'marketing' | 'business' | 'ai';

export interface TrendingTopic {
  id: string;
  title: string;
  source: TrendingSource;
  category: TrendingCategory;
  volume: number;
  description?: string;
  url?: string;
  timestamp: string;
}