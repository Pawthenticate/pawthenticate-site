'use client';

/**
 * Online/Offline Detection Hook
 * 
 * Detects when the user goes offline/online and provides status.
 * Useful for showing connection warnings and disabling features.
 */

import { useState, useEffect } from 'react';

export function useOnline() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Initial state
    setIsOnline(navigator.onLine);

    // Handlers
    const handleOnline = () => {
      console.log('[Online] Connection restored');
      setIsOnline(true);
      setWasOffline(true);
      
      // Reset wasOffline after showing reconnection message
      setTimeout(() => setWasOffline(false), 3000);
    };

    const handleOffline = () => {
      console.log('[Offline] Connection lost');
      setIsOnline(false);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, wasOffline };
}

