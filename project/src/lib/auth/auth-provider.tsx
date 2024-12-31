import React, { useState, useEffect } from 'react';
import { AuthContext } from './auth-context';
import { auth } from '@/lib/firebase/config';
import type { User } from './types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid || 'demo-user',
          email: firebaseUser.email || 'demo@example.com',
          displayName: firebaseUser.displayName || 'Demo User',
          photoURL: firebaseUser.photoURL,
          isAdmin: false,
          role: 'user'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signIn: async () => {}, // Implement these methods as needed
    signInWithGoogle: async () => {},
    signInWithFacebook: async () => {},
    signOut: async () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}