export type TrendingSource = 'all' | 'twitter' | 'google' | 'reddit';
export type TrendingCategory = 'all' | 'technology' | 'marketing' | 'business' | 'ai';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  source: TrendingSource;
  category: TrendingCategory;
  volume: number;
  timestamp: string;
}