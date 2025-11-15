/**
 * Home Page - Coming Soon
 * 
 * Simple redirect message - actual coming soon page is at /coming-soon.html
 */

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC]">
      <div className="text-center max-w-md p-8">
        <div className="text-6xl mb-6">🐾</div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Coming Soon!</h1>
        <p className="text-lg text-neutral-700 mb-6">
          We're working on something paw-some. Visit our waitlist page to be notified when we launch!
        </p>
        <a 
          href="/coming-soon.html"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFB347] to-[#FF6B6B] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300"
        >
          Join Waitlist 🚀
        </a>
      </div>
    </div>
  );
}
