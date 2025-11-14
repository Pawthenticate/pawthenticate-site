/**
 * PWA Install Prompt Component
 * 
 * This component shows a prompt to install the app on the home screen.
 * It appears for users who haven't installed the app yet and hides
 * automatically after installation or dismissal.
 * 
 * Features:
 * - Auto-detect install capability
 * - Beautiful iOS-style prompt
 * - Dismissible with localStorage persistence
 * - Different messaging for iOS vs Android
 */

'use client';

import { useEffect, useState } from 'react';
import { useInstallPrompt, useIsStandalone } from '@/lib/hooks/useServiceWorker';

export default function PWAInstallPrompt() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const isStandalone = useIsStandalone();
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Show prompt if installable and not in standalone mode
    if ((isInstallable || iOS) && !isStandalone) {
      // Delay showing the prompt by 3 seconds for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isStandalone]);

  const handleInstall = async () => {
    if (isIOS) {
      // iOS doesn't support programmatic install, just show the prompt
      return;
    }

    const installed = await promptInstall();
    if (installed) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
              🐾
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Install Pawthenticate</h3>
              <p className="text-sm text-white/90">Quick access from your home screen</p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isIOS ? (
            // iOS-specific instructions
            <div className="space-y-3 text-sm text-gray-700">
              <p className="font-medium">To install this app on your iPhone:</p>
              <ol className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-500">1.</span>
                  <span>Tap the <strong>Share</strong> button 
                    <svg className="inline w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    in Safari
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-500">2.</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-500">3.</span>
                  <span>Tap <strong>Add</strong> in the top right</span>
                </li>
              </ol>
            </div>
          ) : (
            // Android/Desktop install
            <div className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Works offline</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Faster loading</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Native app experience</span>
                </li>
              </ul>

              <button
                onClick={handleInstall}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Install App
              </button>

              <button
                onClick={handleDismiss}
                className="w-full text-gray-600 text-sm py-2 hover:text-gray-800 transition-colors"
              >
                Maybe later
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

