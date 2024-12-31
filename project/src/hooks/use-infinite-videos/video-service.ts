import { 
  db, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs 
} from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/firebase/schema';
import { toggleFavorite } from '@/services/favorites';
import type { Video } from './types';

const BATCH_SIZE = 6;

// Sample data for development
const SAMPLE_VIDEOS = [
  {
    id: '1',
    title: 'Getting Started with React',
    thumbnail: 'https://source.unsplash.com/random/800x600?react',
    duration: 320,
    category: 'Tutorial',
    visibility: 'public'
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    thumbnail: 'https://source.unsplash.com/random/800x600?typescript',
    duration: 450,
    category: 'Tutorial',
    visibility: 'public'
  },
  // Add more sample videos...
];

function mapVideoDocument(doc: any): Video {
  const data = doc.data?.() || doc;
  return {
    id: doc.id || data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    duration: formatDuration(data.duration),
    category: data.category,
    watched: 0,
    isFavorite: false,
  };
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export async function fetchVideos(params: {
  category: string;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  page: number;
  limit: number;
}): Promise<{ videos: Video[]; hasMore: boolean }> {
  try {
    // For development, use sample data
    if (process.env.NODE_ENV === 'development') {
      let filteredVideos = [...SAMPLE_VIDEOS];
      
      if (params.category !== 'All') {
        filteredVideos = filteredVideos.filter(v => v.category === params.category);
      }
      
      if (params.searchQuery) {
        filteredVideos = filteredVideos.filter(v => 
          v.title.toLowerCase().includes(params.searchQuery.toLowerCase())
        );
      }

      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;
      const paginatedVideos = filteredVideos.slice(start, end);

      return {
        videos: paginatedVideos.map(v => mapVideoDocument({ data: () => v, id: v.id })),
        hasMore: end < filteredVideos.length,
      };
    }

    // Production code using Firestore
    const videosRef = collection(db, COLLECTIONS.VIDEOS);
    let baseQuery = query(
      videosRef,
      where('visibility', '==', 'public'),
      orderBy('title', params.sortOrder)
    );

    if (params.category !== 'All') {
      baseQuery = query(baseQuery, where('category', '==', params.category));
    }

    if (params.searchQuery) {
      baseQuery = query(
        baseQuery,
        where('title', '>=', params.searchQuery),
        where('title', '<=', params.searchQuery + '\uf8ff')
      );
    }

    const finalQuery = query(baseQuery, limit(params.limit + 1));
    const snapshot = await getDocs(finalQuery);
    
    const videos = snapshot.docs
      .slice(0, params.limit)
      .map(doc => mapVideoDocument(doc));

    return {
      videos,
      hasMore: snapshot.docs.length > params.limit,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Failed to fetch videos');
  }
}

export async function toggleVideoFavorite(videoId: string): Promise<void> {
  return toggleFavorite('video', videoId);
}