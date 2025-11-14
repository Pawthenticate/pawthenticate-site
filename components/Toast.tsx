'use client';

/**
 * Toast Notification Component
 * 
 * A mobile-friendly toast notification system for success/error feedback.
 * Automatically dismisses after a timeout and supports manual dismissal.
 */

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number; // Auto-dismiss after this many milliseconds
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Styling based on type
  const getStyles = () => {
    const baseStyles = 'flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border-2';
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-300 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-300 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-300 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-300 text-blue-800`;
    }
  };

  return (
    <div 
      className={`${getStyles()} animate-fadeIn touch-manipulation`}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {getIcon()}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-medium leading-tight">
        {message}
      </p>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label="Close notification"
        style={{ minWidth: '44px', minHeight: '44px' }} // Touch-friendly tap target
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

