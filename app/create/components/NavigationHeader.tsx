import Link from 'next/link';

interface NavigationHeaderProps {
  autoSaveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export default function NavigationHeader({ autoSaveStatus }: NavigationHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 py-4 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative z-10 w-10 h-10 bg-white rounded-full p-1 shadow-md transform group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/svg/pawthenticate-icon-only.svg" 
                alt="Pawthenticate Logo" 
                className="w-full h-full"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Pawthenticate</h1>
            <p className="text-xs text-neutral-600 italic hidden sm:block">Where your pet's story lives</p>
          </div>
        </Link>
        
        {/* Auto-save indicator */}
        <div className="flex items-center gap-4">
          <div className="text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            {autoSaveStatus === 'saving' && (
              <span className="text-neutral-500 flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-neutral-500"></div>
                <span className="hidden sm:inline">Saving...</span>
              </span>
            )}
            {autoSaveStatus === 'saved' && (
              <span className="text-secondary-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Saved</span>
              </span>
            )}
            {autoSaveStatus === 'error' && (
              <span className="text-red-500 flex items-center gap-2" title="Failed to save. Check if localStorage is available.">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Save failed</span>
              </span>
            )}
            {autoSaveStatus === 'idle' && (
              <span className="text-neutral-400 hidden sm:inline">Ready</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

