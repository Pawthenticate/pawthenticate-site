export default function BackgroundDecorations() {
  return (
    <>
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 -z-10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Paw Prints Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🐾</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float animation-delay-1000">🐾</div>
        <div className="absolute bottom-40 left-1/4 text-5xl opacity-10 animate-float animation-delay-2000">🐾</div>
        <div className="absolute bottom-20 right-1/3 text-3xl opacity-10 animate-float animation-delay-3000">🐾</div>
      </div>
    </>
  );
}

