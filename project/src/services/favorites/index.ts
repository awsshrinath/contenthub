import { db, createDocument, updateDocument, deleteDocument } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/firebase/schema';
import type { FavoriteDocument } from './types';

export async function toggleFavorite(
  type: 'video' | 'template' | 'content',
  itemId: string,
  userId: string = 'current-user' // Replace with actual user ID from auth
): Promise<void> {
  try {
    const favoriteRef = db.collection(COLLECTIONS.FAVORITES)
      .where('userId', '==', userId)
      .where('itemId', '==', itemId)
      .where('type', '==', type)
      .limit(1);

    const snapshot = await favoriteRef.get();

    if (snapshot.empty) {
      // Create new favorite
      await createDocument<FavoriteDocument>(COLLECTIONS.FAVORITES, {
        userId,
        itemId,
        type,
      });
    } else {
      // Remove existing favorite
      await deleteDocument(COLLECTIONS.FAVORITES, snapshot.docs[0].id);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to toggle favorite');
  }
}

export async function getFavorites(
  type: 'video' | 'template' | 'content',
  userId: string = 'current-user'
): Promise<string[]> {
  try {
    const snapshot = await db.collection(COLLECTIONS.FAVORITES)
      .where('userId', '==', userId)
      .where('type', '==', type)
      .get();

    return snapshot.docs.map(doc => doc.data().itemId);
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw new Error('Failed to get favorites');
  }
}