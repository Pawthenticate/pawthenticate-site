'use client';

/**
 * Offline Banner Component
 * 
 * Displays a banner when the user goes offline.
 * Automatically hides when connection is restored.
 */

import { useOnline } from '@/lib/hooks/useOnline';

export default function OfflineBanner() {
  const { isOnline, wasOffline } = useOnline();

  // Show reconnection success message temporarily
  if (wasOffline && isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9997] bg-green-600 text-white py-3 px-4 text-center animate-fadeIn">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-base">Connection restored</span>
        </div>
      </div>
    );
  }

  // Show offline warning
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9997] bg-red-600 text-white py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-medium text-base">You're offline. Some features may not work.</span>
        </div>
      </div>
    );
  }

  return null;
}

