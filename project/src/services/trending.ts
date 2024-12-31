import { TrendingTopic, TrendingSource, TrendingCategory } from '@/types/trending';

// Simulated API response
const MOCK_TOPICS: TrendingTopic[] = [
  {
    id: '1',
    title: '#AITechnology',
    source: 'twitter',
    category: 'technology',
    volume: 125000,
    description: 'Latest developments in artificial intelligence and machine learning',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Digital Marketing Trends',
    source: 'google',
    category: 'marketing',
    volume: 85000,
    description: 'Emerging trends in digital marketing and social media strategies',
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Remote Work Culture',
    source: 'reddit',
    category: 'business',
    volume: 45000,
    description: 'Discussions about remote work best practices and company culture',
    timestamp: new Date().toISOString(),
  },
];

export async function fetchTrendingTopics(params: {
  source?: TrendingSource;
  category?: TrendingCategory;
}): Promise<TrendingTopic[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  let filteredTopics = [...MOCK_TOPICS];

  if (params.source && params.source !== 'all') {
    filteredTopics = filteredTopics.filter(topic => topic.source === params.source);
  }

  if (params.category && params.category !== 'all') {
    filteredTopics = filteredTopics.filter(topic => topic.category === params.category);
  }

  return filteredTopics;
}