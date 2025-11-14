/**
 * Service Worker Registration Hook
 * 
 * This hook handles service worker registration and updates for the PWA.
 * It provides methods to:
 * - Register the service worker
 * - Check for updates
 * - Skip waiting and activate new versions
 * - Handle registration lifecycle events
 */

'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null;
  isSupported: boolean;
  isRegistered: boolean;
  isUpdateAvailable: boolean;
  isOfflineReady: boolean;
}

interface UseServiceWorkerReturn extends ServiceWorkerState {
  updateServiceWorker: () => void;
  unregister: () => Promise<boolean>;
}

export function useServiceWorker(): UseServiceWorkerReturn {
  const [state, setState] = useState<ServiceWorkerState>({
    registration: null,
    isSupported: false,
    isRegistered: false,
    isUpdateAvailable: false,
    isOfflineReady: false,
  });

  useEffect(() => {
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('[PWA] Service Workers not supported');
      return;
    }

    setState((prev) => ({ ...prev, isSupported: true }));

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('[PWA] Service Worker registered:', registration);

        setState((prev) => ({
          ...prev,
          registration,
          isRegistered: true,
          isOfflineReady: !!registration.active,
        }));

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (!newWorker) return;

          console.log('[PWA] New Service Worker found');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('[PWA] New Service Worker available');
              setState((prev) => ({ ...prev, isUpdateAvailable: true }));
            }

            if (newWorker.state === 'activated') {
              console.log('[PWA] New Service Worker activated');
              setState((prev) => ({ 
                ...prev, 
                isOfflineReady: true,
                isUpdateAvailable: false,
              }));
            }
          });
        });

        // Check for updates every hour
        const updateInterval = setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Cleanup interval on unmount
        return () => clearInterval(updateInterval);
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    };

    // Check if already registered
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        setState((prev) => ({
          ...prev,
          registration,
          isRegistered: true,
          isOfflineReady: !!registration.active,
        }));
      } else {
        // Register new service worker
        registerServiceWorker();
      }
    });

    // Listen for controller change (new service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] Controller changed, reloading page');
      window.location.reload();
    });
  }, []);

  // Update service worker (skip waiting and activate)
  const updateServiceWorker = () => {
    if (state.registration?.waiting) {
      console.log('[PWA] Activating new Service Worker');
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Unregister service worker
  const unregister = async (): Promise<boolean> => {
    if (state.registration) {
      const success = await state.registration.unregister();
      if (success) {
        setState({
          registration: null,
          isSupported: state.isSupported,
          isRegistered: false,
          isUpdateAvailable: false,
          isOfflineReady: false,
        });
      }
      return success;
    }
    return false;
  };

  return {
    ...state,
    updateServiceWorker,
    unregister,
  };
}

/**
 * Hook to check if app is in standalone mode (installed as PWA)
 */
export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone // iOS Safari
      || document.referrer.includes('android-app://'); // Android TWA

    setIsStandalone(standalone);
  }, []);

  return isStandalone;
}

/**
 * Hook to detect if PWA install prompt is available
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      console.log('[PWA] Install prompt available');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect if app was installed
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App was installed');
      setDeferredPrompt(null);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`[PWA] User response to install prompt: ${outcome}`);

    // Clear the prompt
    setDeferredPrompt(null);
    setIsInstallable(false);

    return outcome === 'accepted';
  };

  return {
    isInstallable,
    promptInstall,
  };
}

