interface PageHeaderProps {
  petId: string | null;
  isVisible: boolean;
}

export default function PageHeader({ petId, isVisible }: PageHeaderProps) {
  return (
    <div className={`mb-8 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {/* Floating Icon */}
      <div className="mb-6 flex justify-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <span className="text-5xl">📝</span>
          </div>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 mb-4 leading-tight">
        {petId ? 'Edit' : 'Create Your'}
        <span className="block mt-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent animate-gradient">
          Pet Resume
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto">
        {petId 
          ? 'Update your pet\'s information below.'
          : 'Fill in the details below. Your progress is automatically saved.'
        }
      </p>
      
      {/* Progress indicator */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          <span className="text-2xl">⚡</span>
          <span className="text-sm font-semibold text-neutral-700">Takes 5 minutes</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          <span className="text-2xl">🎯</span>
          <span className="text-sm font-semibold text-neutral-700">Professional results</span>
        </div>
      </div>
    </div>
  );
}

