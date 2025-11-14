import Link from 'next/link';

interface FormNavigationBarProps {
  showExtendedDetails: boolean;
  setShowExtendedDetails: (show: boolean) => void;
  validationErrors: Record<string, string>;
  position?: 'top' | 'bottom';
}

export default function FormNavigationBar({
  showExtendedDetails,
  setShowExtendedDetails,
  validationErrors,
  position = 'top'
}: FormNavigationBarProps) {
  return (
    <div className={`relative ${position === 'top' ? 'py-6 my-8' : 'pt-6 mt-8 border-t-2 border-neutral-200'}`}>
      {/* Horizontal line decoration - only show at top */}
      {position === 'top' && (
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-neutral-200"></div>
        </div>
      )}
      
      <div className="relative flex flex-col sm:flex-row gap-4 justify-between items-center max-w-6xl mx-auto">
        {/* Back to Home Button */}
        <Link 
          href="/"
          className="group px-8 py-4 text-base font-bold text-neutral-700 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-neutral-200 hover:border-primary-300 w-full sm:w-auto text-center order-1 sm:order-1"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </span>
        </Link>

        {/* Extended Details Toggle - Only show at top position */}
        {position === 'top' && (
          <button
            type="button"
            onClick={() => setShowExtendedDetails(!showExtendedDetails)}
            className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-white order-2 sm:order-2"
          >
            <span className="flex items-center gap-3">
              <span className="text-base font-bold text-neutral-700">
                ✨ Extended Details (Optional)
              </span>
              <svg 
                className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${showExtendedDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <p className="text-xs text-neutral-500 mt-1 text-center whitespace-nowrap">Perfect for pet sitters, boarding & daycare</p>
          </button>
        )}

        {/* Save & Preview Resume Button */}
        <button
          type="submit"
          form="pet-resume-form"
          disabled={Object.keys(validationErrors).length > 0}
          className="group relative px-10 py-4 text-base font-black text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto overflow-hidden order-3 sm:order-3"
          style={{
            background: Object.keys(validationErrors).length > 0 
              ? '#9CA3AF' 
              : 'linear-gradient(135deg, #FF8585 0%, #FFAA66 50%, #FFB865 100%)'
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-lg">💾</span>
            Save & Preview Resume
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>
    </div>
  );
}

