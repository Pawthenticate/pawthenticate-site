/**
 * Resume Configuration - Single Source of Truth
 * 
 * This file defines EXACTLY which sections appear in which mode.
 * NO section can bypass these rules.
 */

export type ResumeMode = 'rental' | 'pet_sitter';

export interface SectionConfig {
  id: string;
  label: string;
  mode: 'both' | 'rental_only' | 'pet_sitter_only';
  showWhenEmpty?: boolean; // If true, show even if no data
}

/**
 * MASTER SECTION CONFIGURATION
 * This is the single source of truth for what appears in each mode
 */
export const SECTION_CONFIG: SectionConfig[] = [
  // ALWAYS SHOW (BOTH MODES, EVEN IF EMPTY)
  {
    id: 'key_facts',
    label: 'Key Facts',
    mode: 'both',
    showWhenEmpty: true,
  },
  {
    id: 'behaviour',
    label: 'Behaviour & Temperament',
    mode: 'both',
    showWhenEmpty: true,
  },
  {
    id: 'documents',
    label: 'Supporting Documents',
    mode: 'both',
    showWhenEmpty: true,
  },

  // CONDITIONAL (BOTH MODES, ONLY IF HAS DATA)
  {
    id: 'home_behaviour',
    label: 'Home Behaviour',
    mode: 'both',
    showWhenEmpty: false,
  },
  {
    id: 'social_behaviour',
    label: 'Social Behaviour',
    mode: 'both',
    showWhenEmpty: false,
  },
  {
    id: 'landlord_reassurance',
    label: 'Landlord Reassurance',
    mode: 'both',
    showWhenEmpty: false,
  },

  // PET SITTER MODE ONLY - CARE SECTIONS
  {
    id: 'feeding',
    label: 'Feeding & Treats',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'health_medications',
    label: 'Health & Medications',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'daily_routine',
    label: 'Daily Routine',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'exercise_play',
    label: 'Exercise & Play',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'training_commands',
    label: 'Training & Commands',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'alone_time',
    label: 'Alone Time & Comfort',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'sleeping_house_rules',
    label: 'Sleeping & House Rules',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'triggers_safety',
    label: 'Triggers & Safety',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'grooming_handling',
    label: 'Grooming & Handling',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'emergency_plan',
    label: 'Emergency Plan',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'extra_notes',
    label: 'Extra Notes for Carer',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
  {
    id: 'species_specific',
    label: 'Species-Specific Notes',
    mode: 'pet_sitter_only',
    showWhenEmpty: false,
  },
];

/**
 * BULLETPROOF SECTION VISIBILITY CHECK
 * 
 * @param sectionId - The section identifier
 * @param currentMode - Current resume mode ('rental' or 'pet_sitter')
 * @param hasData - Whether the section has any data to display
 * @returns true if section should be visible, false otherwise
 */
export function shouldShowSection(
  sectionId: string,
  currentMode: ResumeMode,
  hasData: boolean = true
): boolean {
  const config = SECTION_CONFIG.find(s => s.id === sectionId);
  
  if (!config) {
    console.warn(`[shouldShowSection] Unknown section: ${sectionId}`);
    return false;
  }

  // Check mode compatibility
  if (config.mode === 'rental_only' && currentMode !== 'rental') {
    return false;
  }
  
  if (config.mode === 'pet_sitter_only' && currentMode !== 'pet_sitter') {
    console.log(`[shouldShowSection] Blocking ${sectionId} - pet_sitter_only but mode is ${currentMode}`);
    return false;
  }

  // Check data requirement
  if (!config.showWhenEmpty && !hasData) {
    return false;
  }

  return true;
}

/**
 * Get all sections that should be visible for a given mode
 */
export function getVisibleSections(mode: ResumeMode): SectionConfig[] {
  return SECTION_CONFIG.filter(section => {
    if (section.mode === 'rental_only' && mode !== 'rental') return false;
    if (section.mode === 'pet_sitter_only' && mode !== 'pet_sitter') return false;
    return true;
  });
}

/**
 * AGGRESSIVE SUMMARY TEXT CLEANER
 * Removes all spec/technical text from temperament summaries
 */
export function cleanSummaryText(text: string): string {
  if (!text || text.trim() === '') {
    return 'A wonderful pet looking for a great home.';
  }

  let cleaned = text;

  // Remove entire sentences containing technical terms
  const technicalTerms = [
    'template_id',
    'field_groups',
    'includes_field_groups',
    'generate the PDF',
    'rental_resume_template',
    'pet_care_resume_template',
    'Option 1:',
    'Option 2:',
    'mode =',
    'template_id =',
  ];

  technicalTerms.forEach(term => {
    // Remove sentences containing these terms
    const regex = new RegExp(`[^.]*${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^.]*\\.`, 'gi');
    cleaned = cleaned.replace(regex, '');
  });

  // Clean up extra spaces and dots
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .replace(/\.+/g, '.')
    .replace(/\s+\./g, '.')
    .trim();

  // If we cleaned everything out, provide a fallback
  if (cleaned.length < 10) {
    return 'A wonderful pet looking for a great home.';
  }

  return cleaned;
}

/**
 * Get mode display information
 */
export function getModeInfo(mode: ResumeMode) {
  return mode === 'rental'
    ? {
        icon: '🏠',
        title: 'Rental Application Resume',
        subtitle: 'Landlord-focused information',
        color: 'primary',
      }
    : {
        icon: '🐾',
        title: 'Pet Sitter / Boarding Resume',
        subtitle: 'Complete care instructions',
        color: 'secondary',
      };
}

