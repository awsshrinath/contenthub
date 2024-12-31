import { ContentOptions } from '@/types/content';

interface HashtagRecommendation {
  tag: string;
  score: number;
  category?: string;
}

// Fallback sample hashtags when API is not available
const SAMPLE_HASHTAGS: HashtagRecommendation[] = [
  { tag: 'AIinBusiness', score: 0.95, category: 'Technology' },
  { tag: 'ArtificialIntelligence', score: 0.92, category: 'Technology' },
  { tag: 'BusinessTech', score: 0.88, category: 'Business' },
  { tag: 'Innovation', score: 0.85, category: 'Technology' },
  { tag: 'DigitalTransformation', score: 0.82, category: 'Business' },
  { tag: 'FutureOfWork', score: 0.78, category: 'Business' },
];

export async function getHashtagRecommendations(
  content: string,
  options: ContentOptions
): Promise<HashtagRecommendation[]> {
  try {
    // Attempt to fetch from API
    const response = await fetch('/api/hashtags/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, options }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.log('Using sample hashtags due to API error:', error);
    return SAMPLE_HASHTAGS;
  }
}