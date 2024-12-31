import { useState } from 'react';
import type { Article, Platform, GeneratedPost } from '../types';

export function usePostGeneration() {
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);

  const generatePost = async (article: Article, platform: Platform) => {
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article, platform }),
      });
      
      if (!response.ok) throw new Error('Failed to generate post');
      
      const data = await response.json();
      setGeneratedPost(data);
    } catch (error) {
      console.error('Error generating post:', error);
    }
  };

  return { generatedPost, generatePost };
}