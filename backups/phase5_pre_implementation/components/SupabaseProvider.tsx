/**
 * Supabase Provider Component
 * 
 * Client-side provider that wraps the app and manages Supabase sessions.
 * This ensures sessions persist across page navigations and refreshes.
 * 
 * Features:
 * - Automatic session refresh
 * - Auth state change listeners
 * - Cookie-based session storage
 * - Console logging for debugging
 * 
 * Usage:
 * Wrap your app in this provider at the root layout level.
 */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Create context types
type SupabaseContextType = {
  supabase: SupabaseClient<Database> | null;
  session: Session | null;
  user: User | null;
  loading: boolean;
};

// Create the context
const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  session: null,
  user: null,
  loading: true,
});

// Custom hook to use the Supabase context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Provider component
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.warn('[SupabaseProvider] Supabase client not available');
      setLoading(false);
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('[SupabaseProvider] Initializing auth state...');
        
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[SupabaseProvider] Error getting initial session:', error);
        } else if (initialSession) {
          console.log('[SupabaseProvider] Found existing session:', {
            userId: initialSession.user.id,
            email: initialSession.user.email,
            expiresAt: new Date(initialSession.expires_at! * 1000).toISOString(),
          });
          setSession(initialSession);
          setUser(initialSession.user);
        } else {
          console.log('[SupabaseProvider] No existing session found');
        }
      } catch (err) {
        console.error('[SupabaseProvider] Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('[SupabaseProvider] Auth state changed:', {
        event,
        userId: newSession?.user.id,
        email: newSession?.user.email,
      });

      setSession(newSession);
      setUser(newSession?.user ?? null);

      // Handle specific events
      if (event === 'SIGNED_IN') {
        console.log('[SupabaseProvider] ✅ User signed in successfully');
      } else if (event === 'SIGNED_OUT') {
        console.log('[SupabaseProvider] 🚪 User signed out');
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('[SupabaseProvider] 🔄 Session token refreshed');
      } else if (event === 'USER_UPDATED') {
        console.log('[SupabaseProvider] 👤 User profile updated');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      console.log('[SupabaseProvider] Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = {
    supabase,
    session,
    user,
    loading,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

