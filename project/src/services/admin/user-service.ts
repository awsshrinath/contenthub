import { User } from '@/types/admin';
import { db } from '@/lib/firebase';

export async function assignTokens(userId: string, tokens: number): Promise<void> {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      tokens: tokens,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error assigning tokens:', error);
    throw new Error('Failed to assign tokens');
  }
}

export async function getTestUsers(): Promise<User[]> {
  try {
    const snapshot = await db.collection('users')
      .where('role', '==', 'test')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as User));
  } catch (error) {
    console.error('Error fetching test users:', error);
    throw new Error('Failed to fetch test users');
  }
}