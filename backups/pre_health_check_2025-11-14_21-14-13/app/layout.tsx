/**
 * Root Layout Component
 * 
 * This is the main layout that wraps all pages in the app.
 * It sets up the HTML structure, metadata, and global styles.
 * 
 * IMPORTANT: This layout wraps the app in SupabaseProvider for session management.
 * The provider is a client component that manages auth state across the entire app.
 * 
 * Next.js App Router uses this layout for all pages.
 */

import type { Metadata, Viewport } from 'next';
import { SupabaseProvider } from '@/components/SupabaseProvider';
import { ToastProvider } from '@/components/ToastContainer';
import OfflineBanner from '@/components/OfflineBanner';
import ServiceWorkerWrapper from '@/components/ServiceWorkerWrapper';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pawthenticate - Where Your Pet\'s Story Lives',
  description: 'Create landlord-ready pet resumes for Australian renters. Quick, professional, and mobile-friendly.',
  keywords: ['pet resume', 'rental application', 'pet friendly', 'australia', 'landlord', 'pet profile'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pawthenticate',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Pawthenticate',
    title: 'Pawthenticate - Where Your Pet\'s Story Lives',
    description: 'Create landlord-ready pet resumes for Australian renters. Quick, professional, and mobile-friendly.',
  },
  twitter: {
    card: 'summary',
    title: 'Pawthenticate - Where Your Pet\'s Story Lives',
    description: 'Create landlord-ready pet resumes for Australian renters. Quick, professional, and mobile-friendly.',
  },
};

export const viewport: Viewport = {
  themeColor: '#FF6B35',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
        
        {/* PWA Splash Screens for iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pawthenticate" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#FF6B35" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        {/* SupabaseProvider manages authentication state across the app */}
        <SupabaseProvider>
          {/* ToastProvider enables toast notifications throughout the app */}
          <ToastProvider>
            {/* ServiceWorkerWrapper handles PWA functionality */}
            <ServiceWorkerWrapper />
            
            {/* PWAInstallPrompt shows install prompt for users */}
            <PWAInstallPrompt />
            
            {/* OfflineBanner shows when user loses internet connection */}
            <OfflineBanner />
            
            {children}
          </ToastProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

