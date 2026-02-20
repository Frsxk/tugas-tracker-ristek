'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

/**
 * Hydration-safe hook for reading auth state from localStorage.
 * Centralizes the `!!localStorage.getItem('user')` pattern
 * scattered across 5+ components.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, isLoggedIn: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed: User = JSON.parse(raw);
        setState({ user: parsed, isLoggedIn: true });
      }
    } catch {
      // Malformed JSON in localStorage — clear it silently
      localStorage.removeItem('user');
    }
  }, []);

  return state;
}
