/**
 * TypeScript Type Definitions for Pet Data
 * 
 * This file contains all the types used throughout the Pawthenticate app.
 * These types match the data model defined in the PRD (Product Requirements Document).
 * 
 * Each field is documented with:
 * - Whether it's required or optional
 * - What format it expects
 * - Why it's needed (for landlord screening)
 */

// Species options for the pet - expanded for more common pet types
export type PetSpecies = 
  | 'dog' 
  | 'cat' 
  | 'rabbit' 
  | 'bird' 
  | 'reptile' 
  | 'small-mammal' 
  | 'fish'
  | 'other';

// Size options for the pet
export type PetSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

// Age unit options for manual age entry
export type AgeUnit = 'weeks' | 'months' | 'years';

// Living location options
export type LivingLocation = 'indoors' | 'outdoors' | 'mix';

// Noise level options
export type NoiseLevel = 'low' | 'medium' | 'high';

// House training status options
export type HouseTrainingStatus = 
  | 'fully-house-trained' 
  | 'crate-trained' 
  | 'still-learning' 
  | 'not-yet-trained';

// Options for "good with" multi-select
export type GoodWithOption = 
  | 'kids' 
  | 'babies' 
  | 'dogs' 
  | 'cats' 
  | 'elderly' 
  | 'tradespeople';

/**
 * Main Pet Data Interface
 * 
 * This interface represents all the data we collect about a pet.
 * It's stored in localStorage and used to generate the PDF resume.
 * 
 * Supports two resume modes:
 * - Rental mode: Core fields for landlord applications
 * - Pet Sitter mode: Extended fields for pet care providers
 */
export interface PetData {
  // === METADATA ===
  preferredTemplate?: 'rental' | 'pet_sitter'; // Optional: User's preferred resume template
  
  // === CORE PROFILE (used in both modes) ===
  petName: string;                    // Required: The pet's name
  species: PetSpecies;                // Required: Dog, Cat, Rabbit, Bird, etc.
  breed?: string;                     // Optional but recommended: Specific breed (from dropdown or custom)
  color?: string;                     // Optional but recommended: Pet's color/markings
  
  // Age/DOB - User can provide either DOB or manual age
  dateOfBirth?: string;               // Optional: Date of birth (YYYY-MM-DD format)
  manualAge?: number;                 // Optional: Manual age entry (if DOB not provided)
  manualAgeUnit?: AgeUnit;           // Optional: Unit for manual age (weeks/months/years)
  
  // Size and Weight - separate fields
  size?: PetSize;                     // Recommended: Size category (XS/Small/Medium/Large/XL)
  weightKg?: number;                  // Recommended: Weight in kilograms
  
  photo?: string;                     // Required: Base64 encoded image or data URL
  
  // === IDENTIFICATION & LEGAL ===
  microchipNumber: string;            // Required: Legal requirement in Australia
  councilRegistrationNumber?: string; // Optional: Council registration if available
  
  // === HEALTH, SAFETY & INSURANCE ===
  desexed: string;                    // Required: 'yes' | 'no' | 'n/a' - important for landlords
  vaccinationsUpToDate: string;       // Required: 'yes' | 'no' | 'n/a' - health screening
  fleaWormTreatmentStatus?: string;   // Optional: 'yes' | 'no' | 'n/a' - current treatment status
  lastFleaWormTreatmentDate?: string; // Optional: Last flea/worm treatment (date or month/year)
  hasPetInsurance: string;            // Required: 'yes' | 'no' | 'n/a' - Whether pet has insurance
  petInsuranceProvider?: string;      // Required if hasPetInsurance is 'yes'
  
  // === HOME BEHAVIOUR (used in both modes) ===
  houseTrainingStatus: HouseTrainingStatus; // Required: Training status
  noiseLevel: NoiseLevel;             // Required: How loud the pet is
  noiseLevelDescription?: string;     // Optional: Description of when/why pet is noisy (if noise level is not low)
  homeBehaviourSummary?: string;      // Optional: Short summary focused on being calm, clean, respectful
  
  // === SOCIAL BEHAVIOUR (used in both modes) ===
  goodWith: GoodWithOption[];         // Multi-select: Who the pet gets along with
  goodWithKids?: string;              // Optional: Yes / With supervision / Prefer adults only
  goodWithDogs?: string;              // Optional: Yes / No / Sometimes
  goodWithCats?: string;              // Optional: Yes / No / Sometimes
  temperamentSummary: string;         // Required: Friendly, calm, shy, energetic, etc.
  
  // === LANDLORD REASSURANCE (rental mode only) ===
  livingLocation: LivingLocation;     // Required: Where the pet stays (indoors/outdoors/mix)
  propertyDamageHistory?: string;     // Optional: No damage / Minor wear only
  rentalSpecificNotes?: string;       // Optional: Cleanliness, routine, responsible ownership
  
  // === FEEDING & TREATS (pet sitter mode only) ===
  foodType?: string;                  // Food type & brand
  feedingSchedule?: string;           // Feeding times (e.g. 7am and 6pm)
  portionSize?: string;               // Cups or grams per meal
  treatsAllowed?: string;             // Which treats are okay and which to avoid
  foodAllergies?: string;             // Food allergies / sensitivities
  
  // === HEALTH & MEDICATIONS (pet sitter mode only) ===
  healthConditions?: string;          // Existing health conditions
  medications?: string;               // Medications (name, dose, time, how to give)
  vetClinicName?: string;             // Vet clinic name
  vetClinicPhone?: string;            // Vet clinic phone
  emergencyVetDetails?: string;       // Emergency vet (if different)
  
  // === DAILY ROUTINE (pet sitter mode only) ===
  wakeTime?: string;                  // Typical wake time
  walkPlayTimes?: string;             // Usual walk / play times
  napTimes?: string;                  // Usual nap times
  bedtime?: string;                   // Bedtime
  
  // === EXERCISE & PLAY (pet sitter mode only) ===
  exerciseLevel?: string;             // Low / Moderate / High
  dailyExerciseAmount?: string;       // e.g. 2 x 20 minute walks
  offLeadAllowed?: string;            // Yes / No / Only in secure areas
  favouriteGames?: string;            // Favourite games
  
  // === TRAINING & COMMANDS (pet sitter mode only) ===
  trainingLevel?: string;             // Puppy / Basic / Advanced / Still learning
  commandsKnown?: string;             // List of commands (Sit, Drop, Stay, Come, etc.)
  walkingStyle?: string;              // Pulls on leash, needs harness, reacts to other dogs, etc.
  
  // === ALONE TIME & COMFORT (pet sitter mode only) ===
  maxAloneHours?: number;             // Max time alone (hours)
  separationAnxietyLevel?: string;    // None / Mild / Moderate / Severe
  separationAnxietyDescription?: string; // Optional: Description of behaviors when left alone (if not None)
  safePlaces?: string;                // Safe places/spots where the pet feels safe
  safeSpaces?: string;                // Where they're comfortable being left
  escapeRisk?: string;                // Fence jumper, door dasher, digger, etc.
  
  // === SLEEPING & HOUSE RULES (pet sitter mode only) ===
  sleepingLocation?: string;          // Crate / Dog bed / Owner's bed / Couch / Other
  furnitureRules?: string;            // Allowed on couch, bed, only by invitation, not allowed, etc.
  bedtimeRituals?: string;            // Bedtime rituals
  
  // === TRIGGERS & SAFETY (pet sitter mode only) ===
  fearsAndTriggers?: string;          // Thunder, fireworks, loud trucks, certain people, etc.
  reactivityNotes?: string;           // On-leash reactivity, resource guarding, etc.
  biteHistory?: string;               // Bite history (if any, context only)
  
  // === GROOMING & HANDLING (pet sitter mode only) ===
  brushingPreferences?: string;       // Brushing (how often, okay with it?)
  bathingPreferences?: string;        // Bathing (how often, any special shampoo?)
  sensitiveAreas?: string;            // Paws, ears, tail, etc.
  
  // === EMERGENCY PLAN (pet sitter mode only) ===
  emergencyContacts?: string;         // Emergency contacts (order of contact)
  vetSpendLimit?: string;             // Vet spend limit without prior approval
  insuranceDetails?: string;          // Insurance details (policy, provider)
  
  // === EXTRA NOTES FOR CARER (pet sitter mode only) ===
  carerNotes?: string;                // Anything else you should know
  
  // === DOG-SPECIFIC FIELDS ===
  dogOffLeadInDogParks?: string;      // Loves dog parks / Only with calm dogs / Prefer on-lead walks
  dogPreyDrive?: string;              // Low / Moderate / High
  dogBreedWorkLevel?: string;         // Working / High-energy breed notes
  
  // === CAT-SPECIFIC FIELDS ===
  catLitterType?: string;             // Clumping, recycled paper, crystals, etc.
  catLitterTrayCount?: number;        // Number of litter trays
  catIndoorOutdoor?: string;          // Indoor only / Indoor with supervised outdoor time / Indoor/outdoor / Outdoor only
  catScratchingSurfaces?: string;     // Approved scratching surfaces
  catScratchingRules?: string;        // Scratching rules
  catVerticalSpace?: string;          // Cat trees, window perches, hiding spots
  
  // === SMALL PET (RABBIT) SPECIFIC FIELDS ===
  smallPetEnclosureType?: string;     // Indoor pen, hutch, C&C cage, etc.
  smallPetEnclosureLocation?: string; // Room, noise level, drafts
  smallPetTimeOutsideEnclosure?: string; // How long, which rooms/areas
  smallPetChewingSafety?: string;     // Cables, skirting boards, safe chew toys
  
  // === BIRD-SPECIFIC FIELDS ===
  birdCageSize?: string;              // Cage size & type
  birdCageLocation?: string;          // Room, light, drafts, other pets
  birdTimeOutOfCage?: string;         // How often they come out, safe areas
  birdNoiseLevel?: string;            // Very quiet / Moderate / Loud / vocal
  
  // === REPTILE-SPECIFIC FIELDS ===
  reptileSpeciesFull?: string;        // e.g. Central bearded dragon, carpet python
  reptileEnclosureSize?: string;      // Enclosure size & type
  reptileHeatSources?: string;        // Heat mat, heat lamp, ceramic heater, thermostat settings
  reptileUvbLighting?: string;        // Type of bulb, schedule, distance from basking spot
  reptileTemperatureHumidity?: string; // Temperature & humidity requirements
  
  // === REQUIRED UPLOADS (DOCUMENTS) ===
  vaccinationCertificate?: UploadedFile | string; // File upload: Vaccination certificate (can be UploadedFile object or just URL string)
  desexingCertificate?: UploadedFile | string;    // File upload: Desexing certificate (can be UploadedFile object or just URL string)
}

/**
 * Uploaded File Interface
 * 
 * Represents a file uploaded by the user.
 * For V1 MVP, we store files as base64 data URLs in localStorage.
 */
export interface UploadedFile {
  name: string;        // Original filename
  type: string;        // MIME type (e.g., "application/pdf", "image/jpeg")
  size: number;        // File size in bytes
  dataUrl?: string;    // Base64 encoded data URL (for storing in localStorage) - optional now
  publicUrl?: string;  // Public URL from Supabase Storage (after upload) - optional
  uploadedAt: string;  // ISO timestamp of when file was uploaded
}

/**
 * Form Validation Error Interface
 * 
 * Used to track validation errors in the form.
 * Helps users fix issues before generating the PDF.
 */
export interface ValidationError {
  field: keyof PetData;  // Which field has the error
  message: string;       // Human-readable error message
}

/**
 * localStorage Storage Key
 * 
 * The key used to store pet data in browser localStorage.
 * Exporting this ensures we use the same key everywhere.
 */
export const STORAGE_KEY = 'pawthenticate_pet_data';

/**
 * Popular Breeds by Species
 * 
 * Used to populate the breed dropdown based on selected species.
 * Easy to extend with more breeds or species.
 */
export const POPULAR_BREEDS: Record<PetSpecies, string[]> = {
  dog: [
    'Mixed Breed',
    'Akita',
    'Alaskan Malamute',
    'Australian Cattle Dog',
    'Australian Shepherd',
    'Australian Terrier',
    'Beagle',
    'Bernese Mountain Dog',
    'Bichon Frise',
    'Border Collie',
    'Boston Terrier',
    'Boxer',
    'Bull Terrier',
    'Bulldog',
    'Cairn Terrier',
    'Cavalier King Charles Spaniel',
    'Cavoodle (Cavalier x Poodle)',
    'Chihuahua',
    'Cockapoo (Cocker Spaniel x Poodle)',
    'Cocker Spaniel',
    'Dachshund',
    'Dalmatian',
    'Doberman Pinscher',
    'English Springer Spaniel',
    'French Bulldog',
    'German Shepherd',
    'German Shorthaired Pointer',
    'Golden Retriever',
    'Great Dane',
    'Groodle / Goldendoodle (Golden Retriever x Poodle)',
    'Jack Russell Terrier',
    'Kelpie',
    'Labradoodle (Labrador x Poodle)',
    'Labrador Retriever',
    'Maltese',
    'Mastiff',
    'Miniature Schnauzer',
    'Moodle (Maltese x Poodle)',
    'Pembroke Welsh Corgi',
    'Pomeranian',
    'Poodle',
    'Pug',
    'Pugalier (Pug x Cavalier)',
    'Rhodesian Ridgeback',
    'Rottweiler',
    'Saint Bernard',
    'Samoyed',
    'Scottish Terrier',
    'Shetland Sheepdog',
    'Shiba Inu',
    'Shih Tzu',
    'Siberian Husky',
    'Spoodle (Springer Spaniel x Poodle)',
    'Staffordshire Bull Terrier',
    'Vizsla',
    'Weimaraner',
    'West Highland White Terrier',
    'Yorkshire Terrier',
    'Other'
  ],
  cat: [
    'Mixed Breed / Domestic',
    'Domestic Shorthair',
    'Domestic Longhair',
    'Siamese',
    'Persian',
    'Maine Coon',
    'Ragdoll',
    'Bengal',
    'Abyssinian',
    'Birman',
    'Oriental Shorthair',
    'Sphynx',
    'Devon Rex',
    'British Shorthair',
    'Scottish Fold',
    'Burmese',
    'Russian Blue',
    'Other'
  ],
  rabbit: [
    'Mixed Breed',
    'Holland Lop',
    'Mini Lop',
    'Netherland Dwarf',
    'Lionhead',
    'Flemish Giant',
    'Rex',
    'Mini Rex',
    'Dutch',
    'English Lop',
    'French Lop',
    'Angora',
    'Other'
  ],
  bird: [
    'Budgerigar (Budgie)',
    'Cockatiel',
    'Galah',
    'Sulphur-crested Cockatoo',
    'Rainbow Lorikeet',
    'Eclectus Parrot',
    'African Grey Parrot',
    'Conure',
    'Lovebird',
    'Canary',
    'Finch',
    'Cockatoo',
    'Macaw',
    'Other'
  ],
  reptile: [
    'Bearded Dragon',
    'Blue Tongue Lizard',
    'Carpet Python',
    'Children\'s Python',
    'Green Tree Python',
    'Gecko',
    'Water Dragon',
    'Monitor Lizard',
    'Turtle',
    'Tortoise',
    'Snake',
    'Other'
  ],
  'small-mammal': [
    'Guinea Pig',
    'Hamster',
    'Mouse',
    'Rat',
    'Ferret',
    'Chinchilla',
    'Gerbil',
    'Degu',
    'Sugar Glider',
    'Other'
  ],
  fish: [
    'Goldfish',
    'Betta (Siamese Fighting Fish)',
    'Guppy',
    'Tetra',
    'Angelfish',
    'Cichlid',
    'Molly',
    'Platy',
    'Koi',
    'Tropical Fish',
    'Other'
  ],
  other: [
    'Other / Not Listed'
  ]
};

/**
 * Popular Colors by Species
 * 
 * Used to populate the color dropdown based on selected species.
 * Users can select from common colors or choose "Other" to enter custom colors.
 */
export const POPULAR_COLORS: Record<PetSpecies, string[]> = {
  dog: [
    'Black',
    'White',
    'Brown',
    'Golden / Yellow',
    'Cream',
    'Red',
    'Blue / Grey',
    'Tan',
    'Black & White',
    'Black & Tan',
    'Brown & White',
    'Tri-color',
    'Brindle',
    'Merle',
    'Sable',
    'Apricot',
    'Chocolate',
    'Fawn',
    'Other'
  ],
  cat: [
    'Black',
    'White',
    'Orange / Ginger',
    'Grey / Blue',
    'Brown / Chocolate',
    'Cream',
    'Calico',
    'Tortoiseshell',
    'Tabby (Brown)',
    'Tabby (Orange)',
    'Tabby (Grey)',
    'Tuxedo (Black & White)',
    'Black & White',
    'Grey & White',
    'Seal Point',
    'Blue Point',
    'Flame Point',
    'Lilac',
    'Other'
  ],
  rabbit: [
    'White',
    'Black',
    'Brown',
    'Grey',
    'Fawn',
    'Orange',
    'Cream',
    'Black & White',
    'Brown & White',
    'Grey & White',
    'Spotted',
    'Agouti',
    'Sable',
    'Blue',
    'Chocolate',
    'Lilac',
    'Other'
  ],
  bird: [
    'Green',
    'Blue',
    'Yellow',
    'Red',
    'Orange',
    'White',
    'Grey',
    'Black',
    'Multi-colored',
    'Green & Yellow',
    'Blue & White',
    'Blue & Yellow',
    'Red & Green',
    'Rainbow',
    'Cockatiel Grey',
    'Cockatiel White',
    'Other'
  ],
  reptile: [
    'Green',
    'Brown',
    'Tan',
    'Olive',
    'Yellow',
    'Orange',
    'Red',
    'Black',
    'Grey',
    'Blue',
    'Patterned',
    'Spotted',
    'Striped',
    'Multi-colored',
    'Albino',
    'Other'
  ],
  'small-mammal': [
    'White',
    'Brown',
    'Black',
    'Grey',
    'Tan',
    'Cream',
    'Golden',
    'Agouti',
    'Black & White',
    'Brown & White',
    'Spotted',
    'Sable',
    'Cinnamon',
    'Silver',
    'Other'
  ],
  fish: [
    'Gold',
    'Orange',
    'White',
    'Black',
    'Red',
    'Blue',
    'Yellow',
    'Silver',
    'Green',
    'Multi-colored',
    'Calico',
    'Koi Patterned',
    'Striped',
    'Spotted',
    'Other'
  ],
  other: [
    'Other / Not Listed'
  ]
};

/**
 * Default Empty Pet Data
 * 
 * Used when initializing a new pet resume.
 * All required booleans are set to false by default.
 */
export const DEFAULT_PET_DATA: Partial<PetData> = {
  species: 'dog',
  manualAgeUnit: 'years',
  desexed: '',
  vaccinationsUpToDate: '',
  hasPetInsurance: '',
  fleaWormTreatmentStatus: '',
  goodWith: [],
  noiseLevel: 'low',
  houseTrainingStatus: 'fully-house-trained',
  livingLocation: 'indoors',
};

/**
 * Helper function to calculate age from date of birth
 */
export const calculateAge = (dateOfBirth: string): string => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // If less than 1 year old, show months
  if (years === 0) {
    if (months === 0) {
      const days = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
      if (days < 7) {
        return `${days} day${days !== 1 ? 's' : ''} old`;
      }
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''} old`;
    }
    return `${months} month${months !== 1 ? 's' : ''} old`;
  }
  
  // If 1-2 years old, show years and months
  if (years < 2 && months > 0) {
    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''} old`;
  }
  
  // Otherwise just show years
  return `${years} year${years !== 1 ? 's' : ''} old`;
};

/**
 * Helper function to format age display
 */
export const formatAge = (data: Partial<PetData>): string => {
  if (data.dateOfBirth) {
    return calculateAge(data.dateOfBirth);
  } else if (data.manualAge && data.manualAgeUnit) {
    return `${data.manualAge} ${data.manualAgeUnit} old`;
  }
  return 'Age not specified';
};
