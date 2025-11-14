/**
 * PetMasthead Component
 * 
 * A premium, print-friendly masthead for displaying pet profile information.
 * Features a vibrant coral-to-orange gradient background, circular avatar, and clear typographic hierarchy.
 * 
 * Design goals:
 * - Professional, polished appearance with vibrant brand colors
 * - Dark text on saturated gradient for strong visual impact
 * - Responsive layout (stacked on mobile, row on desktop)
 * - Testimonial-style temperament summary
 * 
 * Colors: Uses coral (#FF8585) to peach-orange (#FFB865) gradient
 */

import Image from 'next/image';
import { cleanSummaryText } from '@/lib/resumeConfig';

export interface PetMastheadProps {
  name: string;
  species: string;
  breed?: string;
  color?: string;
  ageLabel: string;
  sizeLabel?: string;
  weightLabel?: string;
  summary: string;
  photoUrl?: string;
}

export function PetMasthead(props: PetMastheadProps) {
  const {
    name,
    species,
    breed,
    color,
    ageLabel,
    sizeLabel,
    weightLabel,
    summary,
    photoUrl,
  } = props;

  // Use centralized cleaner to remove any spec text
  const cleanSummary = cleanSummaryText(summary || '');

  return (
    <section
      className="relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10 print:py-6 print:px-8"
      style={{ 
        background: 'linear-gradient(to right, #FF8585, #FFAA66, #FFB865)',
        color: '#5A3E2F'
      }}
    >
      {/* Subtle overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-orange-400/10" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-row items-center text-left gap-5 sm:gap-6 print:gap-6">
        {/* Avatar */}
        <div className="shrink-0 flex justify-start">
          {photoUrl ? (
            <div 
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full ring-4 shadow-md overflow-hidden bg-white/20 print:w-24 print:h-24 print:ring-3"
              style={{ borderColor: '#5A3E2F', borderWidth: '4px', borderStyle: 'solid' }}
            >
              <Image
                src={photoUrl}
                alt={`${name} the ${species}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div 
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full ring-4 bg-white/10 flex items-center justify-center text-2xl sm:text-3xl print:w-24 print:h-24 print:ring-3 print:text-3xl"
              style={{ borderColor: '#5A3E2F', borderWidth: '4px', borderStyle: 'solid' }}
            >
              🐾
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="space-y-2 sm:space-y-3 max-w-xl print:space-y-1">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight print:text-3xl" style={{ color: '#5A3E2F' }}>
              {name}
            </h1>

            <p className="mt-1 flex flex-wrap items-center justify-start gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-base font-medium print:mt-0.5" style={{ color: '#5A3E2F' }}>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span className="text-lg">
                  {species.toLowerCase() === 'dog' && '🐶'}
                  {species.toLowerCase() === 'cat' && '🐱'}
                  {species.toLowerCase() === 'rabbit' && '🐰'}
                  {species.toLowerCase() === 'bird' && '🦜'}
                  {!['dog', 'cat', 'rabbit', 'bird'].includes(species.toLowerCase()) && '🐾'}
                </span>
                <span className="capitalize">{species}</span>
              </span>
              {breed && (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <span aria-hidden="true">•</span>
                  <span>{breed}</span>
                </span>
              )}
              {color && (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <span aria-hidden="true">•</span>
                  <span>{color}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <span aria-hidden="true">•</span>
                <span>{ageLabel}</span>
              </span>
              {sizeLabel && (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <span aria-hidden="true">•</span>
                  <span>{sizeLabel}</span>
                </span>
              )}
              {weightLabel && (
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <span aria-hidden="true">•</span>
                  <span>{weightLabel}</span>
                </span>
              )}
            </p>
          </div>

          <p className="mt-2 text-xs sm:text-[0.95rem] leading-relaxed max-w-xl italic print:mt-1 print:text-sm print:leading-snug" style={{ color: '#5A3E2F' }}>
            &ldquo;{cleanSummary}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

