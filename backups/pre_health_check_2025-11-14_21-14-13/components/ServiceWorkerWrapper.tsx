/**
 * Service Worker Wrapper Component
 * 
 * This component handles:
 * - Service worker registration on app load
 * - Update notifications when new version is available
 * - Offline/online status monitoring
 * 
 * Place this component in the root layout to enable PWA functionality
 */

'use client';

import { useEffect } from 'react';
import { useServiceWorker } from '@/lib/hooks/useServiceWorker';
import { useToast } from '@/components/ToastContainer';

export default function ServiceWorkerWrapper() {
  const { 
    isSupported, 
    isRegistered, 
    isUpdateAvailable, 
    isOfflineReady,
    updateServiceWorker 
  } = useServiceWorker();
  
  const { success, info } = useToast();

  // Notify when offline-ready
  useEffect(() => {
    if (isOfflineReady && isRegistered) {
      console.log('[PWA] App is ready to work offline');
      
      // Only show notification once per session
      const hasShownOfflineReady = sessionStorage.getItem('offline-ready-shown');
      if (!hasShownOfflineReady) {
        info('App is ready to work offline! 🚀');
        sessionStorage.setItem('offline-ready-shown', 'true');
      }
    }
  }, [isOfflineReady, isRegistered, info]);

  // Notify when update is available
  useEffect(() => {
    if (isUpdateAvailable) {
      console.log('[PWA] Update available');
      
      // Show update notification with action
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-slide-in';
      notification.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-900">Update Available</p>
            <p class="mt-1 text-sm text-gray-600">A new version of Pawthenticate is ready!</p>
            <div class="mt-3 flex gap-2">
              <button id="pwa-update-btn" class="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                Update Now
              </button>
              <button id="pwa-dismiss-btn" class="text-sm font-medium text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Later
              </button>
            </div>
          </div>
          <button id="pwa-close-btn" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      `;

      document.body.appendChild(notification);

      // Add event listeners
      const updateBtn = document.getElementById('pwa-update-btn');
      const dismissBtn = document.getElementById('pwa-dismiss-btn');
      const closeBtn = document.getElementById('pwa-close-btn');

      const removeNotification = () => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => {
          notification.remove();
        }, 300);
      };

      updateBtn?.addEventListener('click', () => {
        updateServiceWorker();
        success('Updating app...');
        removeNotification();
      });

      dismissBtn?.addEventListener('click', removeNotification);
      closeBtn?.addEventListener('click', removeNotification);

      // Auto-dismiss after 10 seconds
      const autoDismissTimer = setTimeout(removeNotification, 10000);

      return () => {
        clearTimeout(autoDismissTimer);
        notification.remove();
      };
    }
  }, [isUpdateAvailable, updateServiceWorker, success]);

  // Log service worker status
  useEffect(() => {
    if (isSupported) {
      console.log('[PWA] Service Worker supported:', {
        isRegistered,
        isOfflineReady,
        isUpdateAvailable,
      });
    } else {
      console.log('[PWA] Service Worker not supported in this browser');
    }
  }, [isSupported, isRegistered, isOfflineReady, isUpdateAvailable]);

  // This component doesn't render anything visible
  return null;
}

