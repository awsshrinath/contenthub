import type { BaseDocument } from '@/lib/firebase/schema';

export interface FavoriteDocument extends BaseDocument {
  userId: string;
  itemId: string;
  type: 'video' | 'template' | 'content';
}