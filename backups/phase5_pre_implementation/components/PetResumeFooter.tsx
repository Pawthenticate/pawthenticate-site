/**
 * PetResumeFooter Component
 * 
 * Footer bar with Pawthenticate branding.
 * Simple, clean design that works well in print (lighter, less ink).
 */

export function PetResumeFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 text-xs sm:text-[0.8rem] px-6 py-4 text-center print:bg-white print:text-neutral-600 print:py-3 print:px-4">
      <span className="opacity-80 print:text-[0.8rem]">
        Created with{" "}
        <span className="font-semibold text-white print:text-neutral-900">
          Pawthenticate
        </span>
        {" • "}
        <span className="italic">Where your pet&apos;s story lives</span>
      </span>
      <div className="mt-1 text-[0.7rem] opacity-60 print:mt-0 print:hidden">
        pawthenticate.com
      </div>
    </footer>
  );
}

