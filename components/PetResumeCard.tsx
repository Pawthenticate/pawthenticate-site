/**
 * PetResumeCard Component
 * 
 * Main white content card that displays all pet resume information.
 * Contains Key Facts, Behaviour & Temperament, and Supporting Documents sections.
 * Plus optional extended sections for Pet Sitter mode.
 * 
 * Design goals:
 * - Clean, professional white sheet with colored accents
 * - Beautiful layout matching reference design
 * - Two-column grid layout with visual separators
 * - Colored box for temperament quote
 * - Print-optimized spacing
 */

import { PetData } from '@/types/pet';
import { shouldShowSection, ResumeMode } from '@/lib/resumeConfig';

export interface PetResumeCardProps {
  keyFacts: { label: string; value: string }[];
  behaviour: {
    goodWith: string;
    noiseLevel: string;
    usuallyStays: string;
    houseTraining: string;
  };
  documents: string[];
  documentsNote?: string;
  temperamentQuote?: string;
  // Extended data for pet sitter mode
  petData?: Partial<PetData>;
  mode?: ResumeMode; // Which resume mode to display
}

export function PetResumeCard(props: PetResumeCardProps) {
  const { keyFacts, behaviour, documents, documentsNote, temperamentQuote, petData, mode = 'rental' } = props;

  // Define section visibility based on mode
  const isRentalMode = mode === 'rental';
  const isPetSitterMode = mode === 'pet_sitter';

  // CRITICAL: Debug logging to verify mode
  if (typeof window !== 'undefined') {
    console.log('🔍 [PetResumeCard] CURRENT MODE:', mode);
    console.log('🔍 [PetResumeCard] Mode flags:', { isRentalMode, isPetSitterMode });
  }

  return (
    <section className="bg-white px-6 py-8 sm:px-10 sm:py-10 print:px-8 print:py-7">
      <div className="space-y-8 sm:space-y-10 print:space-y-6">
        {/* ===== CORE SECTIONS (ALWAYS VISIBLE IN BOTH MODES) ===== */}
        {shouldShowSection('key_facts', mode, true) && (
          <KeyFactsSection items={keyFacts} />
        )}
        
        {shouldShowSection('behaviour', mode, true) && (
          <BehaviourSection behaviour={behaviour} quote={temperamentQuote} />
        )}
        
        {/* ===== CONDITIONAL SECTIONS (BOTH MODES, SHOW IF HAS DATA) ===== */}
        {shouldShowSection('home_behaviour', mode, !!petData?.homeBehaviourSummary) && petData && (
          <HomeBehaviourSection petData={petData} />
        )}
        
        {shouldShowSection('social_behaviour', mode, hasAnyData(petData || {}, ['goodWithKids', 'goodWithDogs', 'goodWithCats'])) && petData && (
          <SocialBehaviourSection petData={petData} />
        )}
        
        {shouldShowSection('landlord_reassurance', mode, hasAnyData(petData || {}, ['propertyDamageHistory', 'rentalSpecificNotes'])) && petData && (
          <LandlordReassuranceSection petData={petData} />
        )}
        
        {/* ===== CARE SECTIONS (PET SITTER MODE ONLY) ===== */}
        {shouldShowSection('feeding', mode, hasAnyData(petData || {}, ['foodType', 'feedingSchedule', 'portionSize', 'treatsAllowed', 'foodAllergies'])) && petData && (
          <FeedingSection petData={petData} />
        )}
        
        {shouldShowSection('health_medications', mode, hasAnyData(petData || {}, ['healthConditions', 'medications', 'vetClinicName', 'vetClinicPhone', 'emergencyVetDetails'])) && petData && (
          <HealthMedicationsSection petData={petData} />
        )}
        
        {shouldShowSection('daily_routine', mode, hasAnyData(petData || {}, ['wakeTime', 'walkPlayTimes', 'napTimes', 'bedtime'])) && petData && (
          <DailyRoutineSection petData={petData} />
        )}
        
        {shouldShowSection('exercise_play', mode, hasAnyData(petData || {}, ['exerciseLevel', 'dailyExerciseAmount', 'offLeadAllowed', 'favouriteGames'])) && petData && (
          <ExercisePlaySection petData={petData} />
        )}
        
        {shouldShowSection('training_commands', mode, hasAnyData(petData || {}, ['trainingLevel', 'commandsKnown', 'walkingStyle'])) && petData && (
          <TrainingCommandsSection petData={petData} />
        )}
        
        {shouldShowSection('alone_time', mode, hasAnyData(petData || {}, ['maxAloneHours', 'separationAnxietyLevel', 'safeSpaces', 'escapeRisk'])) && petData && (
          <AloneTimeSection petData={petData} />
        )}
        
        {shouldShowSection('sleeping_house_rules', mode, hasAnyData(petData || {}, ['sleepingLocation', 'furnitureRules', 'bedtimeRituals'])) && petData && (
          <SleepingHouseRulesSection petData={petData} />
        )}
        
        {shouldShowSection('triggers_safety', mode, hasAnyData(petData || {}, ['fearsAndTriggers', 'reactivityNotes', 'biteHistory'])) && petData && (
          <TriggersSafetySection petData={petData} />
        )}
        
        {shouldShowSection('grooming_handling', mode, hasAnyData(petData || {}, ['brushingPreferences', 'bathingPreferences', 'sensitiveAreas'])) && petData && (
          <GroomingHandlingSection petData={petData} />
        )}
        
        {shouldShowSection('emergency_plan', mode, hasAnyData(petData || {}, ['emergencyContacts', 'vetSpendLimit', 'insuranceDetails'])) && petData && (
          <EmergencyPlanSection petData={petData} />
        )}
        
        {shouldShowSection('extra_notes', mode, !!petData?.carerNotes) && petData && (
          <ExtraNotesSection petData={petData} />
        )}
        
        {/* ===== SPECIES-SPECIFIC SECTIONS ===== */}
        {shouldShowSection('species_specific', mode, petData?.species === 'dog' && hasAnyData(petData || {}, ['dogOffLeadInDogParks', 'dogPreyDrive', 'dogBreedWorkLevel'])) && petData && (
          <DogSpecificSection petData={petData} />
        )}
        
        {shouldShowSection('species_specific', mode, petData?.species === 'cat' && hasAnyData(petData || {}, ['catLitterType', 'catLitterTrayCount', 'catIndoorOutdoor'])) && petData && (
          <>
            {hasAnyData(petData, ['catLitterType', 'catLitterTrayCount', 'catIndoorOutdoor']) && (
              <CatLitterSection petData={petData} />
            )}
            {hasAnyData(petData, ['catScratchingSurfaces', 'catScratchingRules', 'catVerticalSpace']) && (
              <CatScratchingSection petData={petData} />
            )}
          </>
        )}
        
        {shouldShowSection('species_specific', mode, (petData?.species === 'rabbit' || petData?.species === 'small-mammal') && hasAnyData(petData || {}, ['smallPetEnclosureType', 'smallPetEnclosureLocation', 'smallPetTimeOutsideEnclosure', 'smallPetChewingSafety'])) && petData && (
          <SmallPetHousingSection petData={petData} />
        )}
        
        {shouldShowSection('species_specific', mode, petData?.species === 'bird' && hasAnyData(petData || {}, ['birdCageSize', 'birdCageLocation', 'birdTimeOutOfCage', 'birdNoiseLevel'])) && petData && (
          <BirdCageSection petData={petData} />
        )}
        
        {shouldShowSection('species_specific', mode, petData?.species === 'reptile' && hasAnyData(petData || {}, ['reptileSpeciesFull', 'reptileEnclosureSize', 'reptileHeatSources', 'reptileUvbLighting', 'reptileTemperatureHumidity'])) && petData && (
          <ReptileEnclosureSection petData={petData} />
        )}
        
        {/* ===== DOCUMENTS (ALWAYS VISIBLE) ===== */}
        {shouldShowSection('documents', mode, true) && (
          <DocumentsSection documents={documents} note={documentsNote} />
        )}
      </div>
    </section>
  );
}

/**
 * Helper function to check if any of the specified fields have data
 */
function hasAnyData(petData: Partial<PetData>, fields: string[]): boolean {
  return fields.some(field => {
    const value = petData[field as keyof PetData];
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Section Heading Component
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight mb-4 pb-3 border-b-2 border-neutral-100 print:mb-5 print:pb-3">
      {children}
    </h2>
  );
}

/**
 * Key Facts Section - Clean 2-column grid with label/value stacked
 */
function KeyFactsSection({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section aria-labelledby="key-facts-heading" className="print-section">
      <SectionHeading>Key Facts</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem] print:gap-y-5 print:gap-x-12">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-3 mb-1.5 print:mb-2">
              <span className="text-emerald-500 text-base" aria-hidden="true">
                ✓
              </span>
              <span className="font-bold text-neutral-900 uppercase text-xs tracking-wide">
                {item.label}
              </span>
            </div>
            <div className="ml-7 text-neutral-700 font-medium">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Behaviour & Temperament Section - With beautiful beige quote box
 */
interface BehaviourProps {
  behaviour: {
    goodWith: string;
    noiseLevel: string;
    usuallyStays: string;
    houseTraining: string;
  };
  quote?: string;
}

function BehaviourSection({ behaviour, quote }: BehaviourProps) {
  const { goodWith, noiseLevel, usuallyStays, houseTraining } = behaviour;

  return (
    <section aria-labelledby="behaviour-heading" className="print-section">
      <SectionHeading>Behaviour &amp; Temperament</SectionHeading>

      {/* Behaviour Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem] print:gap-y-5 print:gap-x-12">
        <BehaviourRow label="GOOD WITH" value={goodWith} />
        <BehaviourRow label="USUALLY STAYS" value={usuallyStays} />
        <BehaviourRow label="NOISE LEVEL" value={noiseLevel} />
        <BehaviourRow label="HOUSE TRAINING" value={houseTraining} />
      </div>
    </section>
  );
}

function BehaviourRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1.5 print:mb-2">
        <span className="text-emerald-500 text-base" aria-hidden="true">
          ✓
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-neutral-900">
          {label}
        </span>
      </div>
      <div className="ml-7 text-neutral-700 font-medium">{value}</div>
    </div>
  );
}

/**
 * Supporting Documents Section - Clean list with better styling
 */
interface DocumentsProps {
  documents: string[];
  note?: string;
}

function DocumentsSection({ documents, note }: DocumentsProps) {
  return (
    <section aria-labelledby="documents-heading" className="print-section">
      <SectionHeading>Supporting Documents</SectionHeading>
      {documents.length > 0 ? (
        <>
          <ul className="space-y-3 text-sm sm:text-[0.95rem] print:space-y-3">
            {documents.map((doc) => (
              <li key={doc} className="flex items-start gap-3">
                <span className="mt-0.5 text-emerald-500 text-base" aria-hidden="true">
                  ✓
                </span>
                <span className="text-neutral-800 font-medium">{doc}</span>
              </li>
            ))}
          </ul>
          {note && (
            <p className="mt-4 text-xs sm:text-[0.8rem] font-medium print:mt-3" style={{ color: '#FF8585' }}>
              {note}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-neutral-500 italic">No documents uploaded yet</p>
      )}
    </section>
  );
}

/**
 * Home Behaviour Section - Shows in BOTH modes
 */
function HomeBehaviourSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="home-behaviour-heading" className="print-section">
      <SectionHeading>Home Behaviour</SectionHeading>
      <div className="text-sm sm:text-[0.95rem]">
        {petData.homeBehaviourSummary && (
          <div>
            <div className="font-bold text-xs uppercase tracking-wide text-neutral-900 mb-2">
              SUMMARY
            </div>
            <p className="text-neutral-700 leading-relaxed">{petData.homeBehaviourSummary}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Social Behaviour Section - Shows in BOTH modes
 */
function SocialBehaviourSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="social-behaviour-heading" className="print-section">
      <SectionHeading>Social Behaviour</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem]">
        {petData.goodWithKids && <InfoRow label="GOOD WITH KIDS" value={petData.goodWithKids} />}
        {petData.goodWithDogs && <InfoRow label="GOOD WITH DOGS" value={petData.goodWithDogs} />}
        {petData.goodWithCats && <InfoRow label="GOOD WITH CATS" value={petData.goodWithCats} />}
      </div>
    </section>
  );
}

/**
 * Landlord Reassurance Section - Rental mode only
 */
function LandlordReassuranceSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="landlord-heading" className="print-section">
      <SectionHeading>Landlord Reassurance</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.propertyDamageHistory && (
          <InfoRow label="PROPERTY DAMAGE HISTORY" value={petData.propertyDamageHistory} />
        )}
        {petData.rentalSpecificNotes && (
          <div>
            <div className="font-bold text-xs uppercase tracking-wide text-neutral-900 mb-2">
              RENTAL NOTES
            </div>
            <p className="text-neutral-700 leading-relaxed">{petData.rentalSpecificNotes}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Feeding & Treats Section
 */
function FeedingSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="feeding-heading" className="print-section">
      <SectionHeading>Feeding &amp; Treats</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem]">
        {petData.foodType && <InfoRow label="FOOD TYPE & BRAND" value={petData.foodType} />}
        {petData.feedingSchedule && <InfoRow label="FEEDING TIMES" value={petData.feedingSchedule} />}
        {petData.portionSize && <InfoRow label="PORTION SIZE" value={petData.portionSize} />}
        {petData.treatsAllowed && <InfoRow label="TREATS ALLOWED" value={petData.treatsAllowed} />}
        {petData.foodAllergies && <InfoRow label="FOOD ALLERGIES / SENSITIVITIES" value={petData.foodAllergies} />}
      </div>
    </section>
  );
}

/**
 * Health & Medications Section
 */
function HealthMedicationsSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="health-heading" className="print-section">
      <SectionHeading>Health &amp; Medications</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.healthConditions && <InfoRow label="EXISTING HEALTH CONDITIONS" value={petData.healthConditions} />}
        {petData.medications && <InfoRow label="MEDICATIONS" value={petData.medications} />}
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5">
          {petData.vetClinicName && <InfoRow label="VET CLINIC NAME" value={petData.vetClinicName} />}
          {petData.vetClinicPhone && <InfoRow label="VET CLINIC PHONE" value={petData.vetClinicPhone} />}
        </div>
        {petData.emergencyVetDetails && <InfoRow label="EMERGENCY VET (IF DIFFERENT)" value={petData.emergencyVetDetails} />}
      </div>
    </section>
  );
}

/**
 * Daily Routine Section
 */
function DailyRoutineSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="routine-heading" className="print-section">
      <SectionHeading>Daily Routine</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem]">
        {petData.wakeTime && <InfoRow label="TYPICAL WAKE TIME" value={petData.wakeTime} />}
        {petData.bedtime && <InfoRow label="BEDTIME" value={petData.bedtime} />}
        {petData.walkPlayTimes && <InfoRow label="USUAL WALK / PLAY TIMES" value={petData.walkPlayTimes} />}
        {petData.napTimes && <InfoRow label="USUAL NAP TIMES" value={petData.napTimes} />}
      </div>
    </section>
  );
}

/**
 * Exercise & Play Section
 */
function ExercisePlaySection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="exercise-heading" className="print-section">
      <SectionHeading>Exercise &amp; Play</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem]">
        {petData.exerciseLevel && <InfoRow label="EXERCISE LEVEL" value={petData.exerciseLevel} />}
        {petData.dailyExerciseAmount && <InfoRow label="DAILY EXERCISE AMOUNT" value={petData.dailyExerciseAmount} />}
        {petData.offLeadAllowed && <InfoRow label="OFF-LEAD ALLOWED" value={petData.offLeadAllowed} />}
        {petData.favouriteGames && <InfoRow label="FAVOURITE GAMES" value={petData.favouriteGames} />}
      </div>
    </section>
  );
}

/**
 * Training & Commands Section
 */
function TrainingCommandsSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="training-heading" className="print-section">
      <SectionHeading>Training &amp; Commands</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.trainingLevel && <InfoRow label="TRAINING LEVEL" value={petData.trainingLevel} />}
        {petData.commandsKnown && <InfoRow label="COMMANDS KNOWN" value={petData.commandsKnown} />}
        {petData.walkingStyle && <InfoRow label="WALKING STYLE" value={petData.walkingStyle} />}
      </div>
    </section>
  );
}

/**
 * Alone Time & Comfort Section
 */
function AloneTimeSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="alone-heading" className="print-section">
      <SectionHeading>Alone Time &amp; Comfort</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-5 text-sm sm:text-[0.95rem]">
        {petData.maxAloneHours !== undefined && <InfoRow label="MAX TIME ALONE" value={`${petData.maxAloneHours} hours`} />}
        {petData.separationAnxietyLevel && <InfoRow label="SEPARATION ANXIETY" value={petData.separationAnxietyLevel} />}
        {petData.safeSpaces && <InfoRow label="WHERE COMFORTABLE BEING LEFT" value={petData.safeSpaces} />}
        {petData.escapeRisk && <InfoRow label="ESCAPE RISK / NOTES" value={petData.escapeRisk} />}
      </div>
    </section>
  );
}

/**
 * Sleeping & House Rules Section
 */
function SleepingHouseRulesSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="sleeping-heading" className="print-section">
      <SectionHeading>Sleeping &amp; House Rules</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.sleepingLocation && <InfoRow label="USUAL SLEEPING LOCATION" value={petData.sleepingLocation} />}
        {petData.furnitureRules && <InfoRow label="FURNITURE RULES" value={petData.furnitureRules} />}
        {petData.bedtimeRituals && <InfoRow label="BEDTIME RITUALS" value={petData.bedtimeRituals} />}
      </div>
    </section>
  );
}

/**
 * Triggers & Safety Section
 */
function TriggersSafetySection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="triggers-heading" className="print-section">
      <SectionHeading>Triggers &amp; Safety</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.fearsAndTriggers && <InfoRow label="FEARS & TRIGGERS" value={petData.fearsAndTriggers} />}
        {petData.reactivityNotes && <InfoRow label="REACTIVITY NOTES" value={petData.reactivityNotes} />}
        {petData.biteHistory && <InfoRow label="BITE HISTORY" value={petData.biteHistory} />}
      </div>
    </section>
  );
}

/**
 * Grooming & Handling Section
 */
function GroomingHandlingSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="grooming-heading" className="print-section">
      <SectionHeading>Grooming &amp; Handling</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.brushingPreferences && <InfoRow label="BRUSHING" value={petData.brushingPreferences} />}
        {petData.bathingPreferences && <InfoRow label="BATHING" value={petData.bathingPreferences} />}
        {petData.sensitiveAreas && <InfoRow label="SENSITIVE AREAS" value={petData.sensitiveAreas} />}
      </div>
    </section>
  );
}

/**
 * Emergency Plan Section
 */
function EmergencyPlanSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="emergency-heading" className="print-section">
      <SectionHeading>Emergency Plan</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.emergencyContacts && <InfoRow label="EMERGENCY CONTACTS" value={petData.emergencyContacts} />}
        {petData.vetSpendLimit && <InfoRow label="VET SPEND LIMIT WITHOUT PRIOR APPROVAL" value={petData.vetSpendLimit} />}
        {petData.insuranceDetails && <InfoRow label="INSURANCE DETAILS" value={petData.insuranceDetails} />}
      </div>
    </section>
  );
}

/**
 * Extra Notes for Carer Section
 */
function ExtraNotesSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="extra-notes-heading" className="print-section">
      <SectionHeading>Extra Notes for Carer</SectionHeading>
      <div className="text-sm sm:text-[0.95rem]">
        <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">{petData.carerNotes}</p>
      </div>
    </section>
  );
}

/**
 * Reusable Info Row Component
 */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1.5 print:mb-2">
        <span className="text-emerald-500 text-base" aria-hidden="true">
          ✓
        </span>
        <span className="font-bold text-xs uppercase tracking-wide text-neutral-900">
          {label}
        </span>
      </div>
      <div className="ml-7 text-neutral-700 font-medium whitespace-pre-wrap">{value}</div>
    </div>
  );
}

/**
 * Dog-Specific Section
 */
function DogSpecificSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="dog-specific-heading" className="print-section">
      <SectionHeading>Dog-Specific Notes</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.dogOffLeadInDogParks && <InfoRow label="DOG PARKS / OFF-LEAD" value={petData.dogOffLeadInDogParks} />}
        {petData.dogPreyDrive && <InfoRow label="PREY DRIVE" value={petData.dogPreyDrive} />}
        {petData.dogBreedWorkLevel && <InfoRow label="WORKING / HIGH-ENERGY BREED NOTES" value={petData.dogBreedWorkLevel} />}
      </div>
    </section>
  );
}

/**
 * Cat Litter & Toilet Section
 */
function CatLitterSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="cat-litter-heading" className="print-section">
      <SectionHeading>Litter &amp; Toilet (Cats)</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.catLitterType && <InfoRow label="LITTER TYPE" value={petData.catLitterType} />}
        {petData.catLitterTrayCount !== undefined && <InfoRow label="NUMBER OF LITTER TRAYS" value={String(petData.catLitterTrayCount)} />}
        {petData.catIndoorOutdoor && <InfoRow label="INDOOR / OUTDOOR" value={petData.catIndoorOutdoor} />}
      </div>
    </section>
  );
}

/**
 * Cat Scratching & Environment Section
 */
function CatScratchingSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="cat-scratching-heading" className="print-section">
      <SectionHeading>Scratching &amp; Environment (Cats)</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.catScratchingSurfaces && <InfoRow label="APPROVED SCRATCHING SURFACES" value={petData.catScratchingSurfaces} />}
        {petData.catScratchingRules && <InfoRow label="SCRATCHING RULES" value={petData.catScratchingRules} />}
        {petData.catVerticalSpace && <InfoRow label="VERTICAL SPACE / HIDING SPOTS" value={petData.catVerticalSpace} />}
      </div>
    </section>
  );
}

/**
 * Small Pet Housing & Enrichment Section
 */
function SmallPetHousingSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="small-pet-housing-heading" className="print-section">
      <SectionHeading>Housing &amp; Enrichment (Rabbits / Small Animals)</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.smallPetEnclosureType && <InfoRow label="ENCLOSURE TYPE" value={petData.smallPetEnclosureType} />}
        {petData.smallPetEnclosureLocation && <InfoRow label="ENCLOSURE LOCATION" value={petData.smallPetEnclosureLocation} />}
        {petData.smallPetTimeOutsideEnclosure && <InfoRow label="TIME OUT OF ENCLOSURE" value={petData.smallPetTimeOutsideEnclosure} />}
        {petData.smallPetChewingSafety && <InfoRow label="CHEWING & SAFETY NOTES" value={petData.smallPetChewingSafety} />}
      </div>
    </section>
  );
}

/**
 * Bird Cage & Environment Section
 */
function BirdCageSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="bird-cage-heading" className="print-section">
      <SectionHeading>Cage &amp; Environment (Birds)</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.birdCageSize && <InfoRow label="CAGE SIZE & TYPE" value={petData.birdCageSize} />}
        {petData.birdCageLocation && <InfoRow label="CAGE LOCATION" value={petData.birdCageLocation} />}
        {petData.birdTimeOutOfCage && <InfoRow label="TIME OUT OF CAGE" value={petData.birdTimeOutOfCage} />}
        {petData.birdNoiseLevel && <InfoRow label="NOISE LEVEL" value={petData.birdNoiseLevel} />}
      </div>
    </section>
  );
}

/**
 * Reptile Enclosure, Heat & Lighting Section
 */
function ReptileEnclosureSection({ petData }: { petData: Partial<PetData> }) {
  return (
    <section aria-labelledby="reptile-enclosure-heading" className="print-section">
      <SectionHeading>Enclosure, Heat &amp; Lighting (Reptiles)</SectionHeading>
      <div className="space-y-5 text-sm sm:text-[0.95rem]">
        {petData.reptileSpeciesFull && <InfoRow label="REPTILE SPECIES" value={petData.reptileSpeciesFull} />}
        {petData.reptileEnclosureSize && <InfoRow label="ENCLOSURE SIZE & TYPE" value={petData.reptileEnclosureSize} />}
        {petData.reptileHeatSources && <InfoRow label="HEAT SOURCES" value={petData.reptileHeatSources} />}
        {petData.reptileUvbLighting && <InfoRow label="UVB LIGHTING" value={petData.reptileUvbLighting} />}
        {petData.reptileTemperatureHumidity && <InfoRow label="TEMPERATURE & HUMIDITY REQUIREMENTS" value={petData.reptileTemperatureHumidity} />}
      </div>
    </section>
  );
}

