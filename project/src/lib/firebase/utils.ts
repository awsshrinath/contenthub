import { db } from './config';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { BaseDocument, FirestoreTimestamp } from './schema';

export function createTimestamp(): FirestoreTimestamp {
  return {
    seconds: Math.floor(Date.now() / 1000),
    nanoseconds: 0,
  };
}

export function timestampToDate(timestamp: FirestoreTimestamp): Date {
  return new Date(timestamp.seconds * 1000);
}

export function createBaseDocument(id?: string): BaseDocument {
  const timestamp = createTimestamp();
  return {
    id: id || crypto.randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export async function createDocument<T extends BaseDocument>(
  collectionName: string,
  data: Omit<T, keyof BaseDocument>
): Promise<T> {
  const baseDoc = createBaseDocument();
  const fullDoc = { ...baseDoc, ...data } as T;
  
  const docRef = await addDoc(collection(db, collectionName), fullDoc);
  return { ...fullDoc, id: docRef.id };
}

export async function updateDocument<T extends BaseDocument>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: createTimestamp(),
  });
}

export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as T : null;
}