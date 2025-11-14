'use client';

/**
 * Toast Container Component
 * 
 * Manages multiple toast notifications and their positioning.
 * Displays toasts in a fixed position on the screen (top-right on desktop, top-center on mobile).
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast, { ToastType } from './Toast';

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: ToastType, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastData = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration || 4000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const success = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const contextValue: ToastContextType = {
    showToast,
    success,
    error,
    info,
    warning,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast container - fixed position, responsive */}
      <div 
        className="fixed z-[9999] pointer-events-none"
        style={{
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          // On mobile: center at top
          // On desktop: move to top-right
        }}
      >
        <div className="flex flex-col gap-3 items-center sm:items-end pointer-events-auto">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
              duration={0} // We handle auto-dismiss in showToast
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

