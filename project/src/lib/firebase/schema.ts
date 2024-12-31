export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface BaseDocument {
  id: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export const COLLECTIONS = {
  USERS: 'users',
  VIDEOS: 'videos',
  TEMPLATES: 'templates',
  CONTENT: 'content',
  SOCIAL_CONNECTIONS: 'social_connections',
  SUBSCRIPTIONS: 'subscriptions',
  PUBLISHING_HISTORY: 'publishing_history',
  FAVORITES: 'favorites',
} as const;

// Collection schemas
export interface UserDocument extends BaseDocument {
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin' | 'test';
  tokens: number;
}

export interface VideoDocument extends BaseDocument {
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  category: string;
  visibility: 'public' | 'private';
  userId: string;
}

export interface TemplateDocument extends BaseDocument {
  title: string;
  description: string;
  category: string;
  style: string;
  contentType: 'image' | 'video';
  fileUrl: string;
  userId: string;
}

// Add more collection schemas as needed