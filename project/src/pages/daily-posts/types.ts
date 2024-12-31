export type Platform = 'linkedin' | 'twitter';

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  url: string;
  source: string;
}

export interface GeneratedPost {
  content: string;
  hashtags: string[];
  imagePrompt?: string;
}