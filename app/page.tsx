/**
 * Home Page - Redirect to Coming Soon
 * 
 * Temporarily redirects to static coming soon page while
 * we work on the full application in the background.
 */

'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Redirect to the static coming soon page
    window.location.replace('/coming-soon.html');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC]">
      <div className="text-center">
        <div className="text-5xl mb-4">🐾</div>
        <p className="text-xl text-neutral-700">Redirecting...</p>
      </div>
    </div>
  );
}
