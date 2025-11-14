/**
 * Pets Service Layer
 * 
 * Handles all CRUD operations for pets in the Supabase database.
 * Provides type-safe methods for managing pet data.
 * 
 * Features:
 * - Create new pet
 * - Get all pets for a user
 * - Get single pet by ID
 * - Update existing pet
 * - Delete pet
 * - Duplicate pet
 */

import { createBrowserSupabaseClient, handleSupabaseError } from './supabaseClient';
import type { Database } from '@/types/supabase';
import type { PetData } from '@/types/pet';

type PetRow = Database['public']['Tables']['pets']['Row'];
type PetInsert = Database['public']['Tables']['pets']['Insert'];
type PetUpdate = Database['public']['Tables']['pets']['Update'];

// Helper to get a fresh Supabase client instance
const getSupabase = () => createBrowserSupabaseClient();

/**
 * Console Logger for Pet Operations
 */
const logPets = (action: string, status: 'success' | 'error' | 'warn' | 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[Pets ${timestamp}]`;
  
  if (status === 'error') {
    console.error(prefix, action, data);
  } else if (status === 'warn') {
    console.warn(prefix, action, data);
  } else if (status === 'info') {
    console.info(prefix, action, data);
  } else {
    console.log(prefix, action, data);
  }
};

/**
 * Service Result Type
 * 
 * Standardized return type for all pet operations.
 */
export type PetServiceResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Convert PetData (frontend format) to Database Insert format
 */
function petDataToInsert(petData: Partial<PetData>, userId: string): any {
  return {
    // Metadata
    preferred_template: (petData as any).preferredTemplate || 'rental',
    
    // Core fields
    user_id: userId,
    pet_name: petData.petName || '',
    species: petData.species || 'dog',
    breed: petData.breed || null,
    color: petData.color || null,
    date_of_birth: petData.dateOfBirth || null,
    manual_age: petData.manualAge || null,
    manual_age_unit: petData.manualAgeUnit || null,
    size: petData.size || null,
    weight_kg: petData.weightKg || null,
    photo_url: petData.photo || null,
    microchip_number: petData.microchipNumber || '',
    council_registration_number: petData.councilRegistrationNumber || null,
    desexed: petData.desexed || '',
    vaccinations_up_to_date: petData.vaccinationsUpToDate || '',
    flea_worm_treatment_status: petData.fleaWormTreatmentStatus || null,
    last_flea_worm_treatment_date: petData.lastFleaWormTreatmentDate || null,
    has_pet_insurance: petData.hasPetInsurance || '',
    pet_insurance_provider: petData.petInsuranceProvider || null,
    temperament_summary: petData.temperamentSummary || '',
    living_location: petData.livingLocation || 'indoors',
    good_with: petData.goodWith || null,
    noise_level: petData.noiseLevel || 'low',
    noise_level_description: petData.noiseLevelDescription || null,
    house_training_status: petData.houseTrainingStatus || 'fully-house-trained',
    
    // Extended fields (optional, only saved if provided)
    home_behaviour_summary: petData.homeBehaviourSummary || null,
    good_with_kids: petData.goodWithKids || null,
    good_with_dogs: petData.goodWithDogs || null,
    good_with_cats: petData.goodWithCats || null,
    property_damage_history: petData.propertyDamageHistory || null,
    rental_specific_notes: petData.rentalSpecificNotes || null,
    food_type: petData.foodType || null,
    feeding_schedule: petData.feedingSchedule || null,
    portion_size: petData.portionSize || null,
    treats_allowed: petData.treatsAllowed || null,
    food_allergies: petData.foodAllergies || null,
    health_conditions: petData.healthConditions || null,
    medications: petData.medications || null,
    vet_clinic_name: petData.vetClinicName || null,
    vet_clinic_phone: petData.vetClinicPhone || null,
    emergency_vet_details: petData.emergencyVetDetails || null,
    wake_time: petData.wakeTime || null,
    walk_play_times: petData.walkPlayTimes || null,
    nap_times: petData.napTimes || null,
    bedtime: petData.bedtime || null,
    exercise_level: petData.exerciseLevel || null,
    daily_exercise_amount: petData.dailyExerciseAmount || null,
    off_lead_allowed: petData.offLeadAllowed || null,
    favourite_games: petData.favouriteGames || null,
    training_level: petData.trainingLevel || null,
    commands_known: petData.commandsKnown || null,
    walking_style: petData.walkingStyle || null,
    max_alone_hours: petData.maxAloneHours || null,
    separation_anxiety_level: petData.separationAnxietyLevel || null,
    separation_anxiety_description: petData.separationAnxietyDescription || null,
    safe_places: petData.safePlaces || null,
    safe_spaces: petData.safeSpaces || null,
    escape_risk: petData.escapeRisk || null,
    sleeping_location: petData.sleepingLocation || null,
    furniture_rules: petData.furnitureRules || null,
    bedtime_rituals: petData.bedtimeRituals || null,
    fears_and_triggers: petData.fearsAndTriggers || null,
    reactivity_notes: petData.reactivityNotes || null,
    bite_history: petData.biteHistory || null,
    brushing_preferences: petData.brushingPreferences || null,
    bathing_preferences: petData.bathingPreferences || null,
    sensitive_areas: petData.sensitiveAreas || null,
    emergency_contacts: petData.emergencyContacts || null,
    vet_spend_limit: petData.vetSpendLimit || null,
    insurance_details: petData.insuranceDetails || null,
    carer_notes: petData.carerNotes || null,
    
    // Species-specific fields
    dog_off_lead_in_dog_parks: petData.dogOffLeadInDogParks || null,
    dog_prey_drive: petData.dogPreyDrive || null,
    dog_breed_work_level: petData.dogBreedWorkLevel || null,
    cat_litter_type: petData.catLitterType || null,
    cat_litter_tray_count: petData.catLitterTrayCount || null,
    cat_indoor_outdoor: petData.catIndoorOutdoor || null,
    cat_scratching_surfaces: petData.catScratchingSurfaces || null,
    cat_scratching_rules: petData.catScratchingRules || null,
    cat_vertical_space: petData.catVerticalSpace || null,
    small_pet_enclosure_type: petData.smallPetEnclosureType || null,
    small_pet_enclosure_location: petData.smallPetEnclosureLocation || null,
    small_pet_time_outside_enclosure: petData.smallPetTimeOutsideEnclosure || null,
    small_pet_chewing_safety: petData.smallPetChewingSafety || null,
    bird_cage_size: petData.birdCageSize || null,
    bird_cage_location: petData.birdCageLocation || null,
    bird_time_out_of_cage: petData.birdTimeOutOfCage || null,
    bird_noise_level: petData.birdNoiseLevel || null,
    reptile_species_full: petData.reptileSpeciesFull || null,
    reptile_enclosure_size: petData.reptileEnclosureSize || null,
    reptile_heat_sources: petData.reptileHeatSources || null,
    reptile_uvb_lighting: petData.reptileUvbLighting || null,
    reptile_temperature_humidity: petData.reptileTemperatureHumidity || null,
    
    // Document fields (stored as TEXT - public URLs from Supabase Storage)
    // Ensure we extract the URL string if an UploadedFile object is passed
    vaccination_certificate: typeof petData.vaccinationCertificate === 'string' 
      ? petData.vaccinationCertificate 
      : (petData.vaccinationCertificate as any)?.publicUrl || null,
    desexing_certificate: typeof petData.desexingCertificate === 'string' 
      ? petData.desexingCertificate 
      : (petData.desexingCertificate as any)?.publicUrl || null,
  };
}

/**
 * Convert Database Row to PetData (frontend format)
 */
function rowToPetData(row: PetRow): any {
  return {
    // Metadata
    preferredTemplate: ((row as any).preferred_template as 'rental' | 'pet_sitter') || 'rental',
    
    // Core fields
    id: row.id,
    petName: row.pet_name,
    species: row.species as any,
    breed: row.breed || undefined,
    color: (row as any).color || undefined,
    dateOfBirth: row.date_of_birth || undefined,
    manualAge: row.manual_age || undefined,
    manualAgeUnit: row.manual_age_unit as any,
    size: row.size as any,
    weightKg: row.weight_kg || undefined,
    photo: row.photo_url || undefined,
    microchipNumber: row.microchip_number,
    councilRegistrationNumber: row.council_registration_number || undefined,
    desexed: row.desexed,
    vaccinationsUpToDate: row.vaccinations_up_to_date,
    fleaWormTreatmentStatus: (row as any).flea_worm_treatment_status || undefined,
    lastFleaWormTreatmentDate: row.last_flea_worm_treatment_date || undefined,
    hasPetInsurance: row.has_pet_insurance,
    petInsuranceProvider: row.pet_insurance_provider || undefined,
    temperamentSummary: row.temperament_summary,
    livingLocation: row.living_location as any,
    goodWith: (row.good_with as any) || [],
    noiseLevel: row.noise_level as any,
    noiseLevelDescription: (row as any).noise_level_description || undefined,
    houseTrainingStatus: row.house_training_status as any,
    
    // Extended fields (from database, may not exist yet)
    homeBehaviourSummary: (row as any).home_behaviour_summary || undefined,
    goodWithKids: (row as any).good_with_kids || undefined,
    goodWithDogs: (row as any).good_with_dogs || undefined,
    goodWithCats: (row as any).good_with_cats || undefined,
    propertyDamageHistory: (row as any).property_damage_history || undefined,
    rentalSpecificNotes: (row as any).rental_specific_notes || undefined,
    foodType: (row as any).food_type || undefined,
    feedingSchedule: (row as any).feeding_schedule || undefined,
    portionSize: (row as any).portion_size || undefined,
    treatsAllowed: (row as any).treats_allowed || undefined,
    foodAllergies: (row as any).food_allergies || undefined,
    healthConditions: (row as any).health_conditions || undefined,
    medications: (row as any).medications || undefined,
    vetClinicName: (row as any).vet_clinic_name || undefined,
    vetClinicPhone: (row as any).vet_clinic_phone || undefined,
    emergencyVetDetails: (row as any).emergency_vet_details || undefined,
    wakeTime: (row as any).wake_time || undefined,
    walkPlayTimes: (row as any).walk_play_times || undefined,
    napTimes: (row as any).nap_times || undefined,
    bedtime: (row as any).bedtime || undefined,
    exerciseLevel: (row as any).exercise_level || undefined,
    dailyExerciseAmount: (row as any).daily_exercise_amount || undefined,
    offLeadAllowed: (row as any).off_lead_allowed || undefined,
    favouriteGames: (row as any).favourite_games || undefined,
    trainingLevel: (row as any).training_level || undefined,
    commandsKnown: (row as any).commands_known || undefined,
    walkingStyle: (row as any).walking_style || undefined,
    maxAloneHours: (row as any).max_alone_hours || undefined,
    separationAnxietyLevel: (row as any).separation_anxiety_level || undefined,
    separationAnxietyDescription: (row as any).separation_anxiety_description || undefined,
    safePlaces: (row as any).safe_places || undefined,
    safeSpaces: (row as any).safe_spaces || undefined,
    escapeRisk: (row as any).escape_risk || undefined,
    sleepingLocation: (row as any).sleeping_location || undefined,
    furnitureRules: (row as any).furniture_rules || undefined,
    bedtimeRituals: (row as any).bedtime_rituals || undefined,
    fearsAndTriggers: (row as any).fears_and_triggers || undefined,
    reactivityNotes: (row as any).reactivity_notes || undefined,
    biteHistory: (row as any).bite_history || undefined,
    brushingPreferences: (row as any).brushing_preferences || undefined,
    bathingPreferences: (row as any).bathing_preferences || undefined,
    sensitiveAreas: (row as any).sensitive_areas || undefined,
    emergencyContacts: (row as any).emergency_contacts || undefined,
    vetSpendLimit: (row as any).vet_spend_limit || undefined,
    insuranceDetails: (row as any).insurance_details || undefined,
    carerNotes: (row as any).carer_notes || undefined,
    
    // Species-specific fields
    dogOffLeadInDogParks: (row as any).dog_off_lead_in_dog_parks || undefined,
    dogPreyDrive: (row as any).dog_prey_drive || undefined,
    dogBreedWorkLevel: (row as any).dog_breed_work_level || undefined,
    catLitterType: (row as any).cat_litter_type || undefined,
    catLitterTrayCount: (row as any).cat_litter_tray_count || undefined,
    catIndoorOutdoor: (row as any).cat_indoor_outdoor || undefined,
    catScratchingSurfaces: (row as any).cat_scratching_surfaces || undefined,
    catScratchingRules: (row as any).cat_scratching_rules || undefined,
    catVerticalSpace: (row as any).cat_vertical_space || undefined,
    smallPetEnclosureType: (row as any).small_pet_enclosure_type || undefined,
    smallPetEnclosureLocation: (row as any).small_pet_enclosure_location || undefined,
    smallPetTimeOutsideEnclosure: (row as any).small_pet_time_outside_enclosure || undefined,
    smallPetChewingSafety: (row as any).small_pet_chewing_safety || undefined,
    birdCageSize: (row as any).bird_cage_size || undefined,
    birdCageLocation: (row as any).bird_cage_location || undefined,
    birdTimeOutOfCage: (row as any).bird_time_out_of_cage || undefined,
    birdNoiseLevel: (row as any).bird_noise_level || undefined,
    reptileSpeciesFull: (row as any).reptile_species_full || undefined,
    reptileEnclosureSize: (row as any).reptile_enclosure_size || undefined,
    reptileHeatSources: (row as any).reptile_heat_sources || undefined,
    reptileUvbLighting: (row as any).reptile_uvb_lighting || undefined,
    reptileTemperatureHumidity: (row as any).reptile_temperature_humidity || undefined,
    
    // Document fields (stored as JSONB in database)
    vaccinationCertificate: (row as any).vaccination_certificate || undefined,
    desexingCertificate: (row as any).desexing_certificate || undefined,
    
    // Timestamps
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Create a New Pet
 * 
 * @param petData - Pet data to create
 * @param userId - ID of the user creating the pet
 */
export async function createPet(
  petData: Partial<PetData>,
  userId: string
): Promise<PetServiceResult<PetRow>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('createPet', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('createPet', 'info', { userId, petName: petData.petName });

    const insertData = petDataToInsert(petData, userId);

    const { data, error } = await supabase
      .from('pets')
      .insert(insertData)
      .select()
      .single<PetRow>();

    if (error) {
      const friendlyError = handleSupabaseError(error, 'createPet', { userId });
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logPets('createPet', 'error', { error: 'No data returned' });
      return { success: false, error: 'Failed to create pet. Please try again.' };
    }

    logPets('createPet', 'success', {
      petId: data.id,
      petName: data.pet_name
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    logPets('createPet', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred creating pet' };
  }
}

/**
 * Get All Pets for a User
 * 
 * @param userId - ID of the user
 */
export async function getUserPets(userId: string): Promise<PetServiceResult<PetRow[]>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('getUserPets', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('getUserPets', 'info', { userId });

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'getUserPets', { userId });
      return { success: false, error: friendlyError };
    }

    logPets('getUserPets', 'success', {
      userId,
      count: data?.length || 0
    });

    return {
      success: true,
      data: data || []
    };
  } catch (error) {
    logPets('getUserPets', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred fetching pets' };
  }
}

/**
 * Get a Single Pet by ID
 * 
 * @param petId - ID of the pet
 * @param userId - ID of the user (for security check)
 */
export async function getPetById(
  petId: string,
  userId: string
): Promise<PetServiceResult<PetRow>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('getPetById', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('getPetById', 'info', { petId, userId });

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .eq('user_id', userId)
      .single<PetRow>();

    if (error) {
      if (error.code === 'PGRST116') {
        return { success: false, error: 'Pet not found' };
      }
      const friendlyError = handleSupabaseError(error, 'getPetById', { petId, userId });
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logPets('getPetById', 'error', { error: 'No data returned' });
      return { success: false, error: 'Pet not found' };
    }

    logPets('getPetById', 'success', {
      petId: data.id,
      petName: data.pet_name
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    logPets('getPetById', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred fetching pet' };
  }
}

/**
 * Update an Existing Pet
 * 
 * @param petId - ID of the pet to update
 * @param petData - Updated pet data
 * @param userId - ID of the user (for security check)
 */
export async function updatePet(
  petId: string,
  petData: Partial<PetData>,
  userId: string
): Promise<PetServiceResult<PetRow>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('updatePet', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('updatePet', 'info', { petId, userId, petName: petData.petName });

    // Use the same comprehensive mapping as petDataToInsert for ALL fields
    const updateData: Partial<PetUpdate> = {
      // Core fields
      pet_name: petData.petName,
      species: petData.species,
      breed: petData.breed || null,
      date_of_birth: petData.dateOfBirth || null,
      manual_age: petData.manualAge || null,
      manual_age_unit: petData.manualAgeUnit || null,
      size: petData.size || null,
      weight_kg: petData.weightKg || null,
      photo_url: petData.photo || null,
      microchip_number: petData.microchipNumber,
      council_registration_number: petData.councilRegistrationNumber || null,
      // Health/Insurance fields are stored as strings ('yes', 'no', 'n/a'), not booleans
      desexed: petData.desexed as any || null,
      vaccinations_up_to_date: petData.vaccinationsUpToDate as any || null,
      last_flea_worm_treatment_date: petData.lastFleaWormTreatmentDate || null,
      has_pet_insurance: petData.hasPetInsurance as any || null,
      pet_insurance_provider: petData.petInsuranceProvider || null,
      temperament_summary: petData.temperamentSummary,
      living_location: petData.livingLocation,
      good_with: petData.goodWith || null,
      noise_level: petData.noiseLevel,
      house_training_status: petData.houseTrainingStatus,
      
      // Extended fields (NOW INCLUDED - will sync across devices!)
      home_behaviour_summary: petData.homeBehaviourSummary || null,
      good_with_kids: petData.goodWithKids || null,
      good_with_dogs: petData.goodWithDogs || null,
      good_with_cats: petData.goodWithCats || null,
      property_damage_history: petData.propertyDamageHistory || null,
      rental_specific_notes: petData.rentalSpecificNotes || null,
      food_type: petData.foodType || null,
      feeding_schedule: petData.feedingSchedule || null,
      portion_size: petData.portionSize || null,
      treats_allowed: petData.treatsAllowed || null,
      food_allergies: petData.foodAllergies || null,
      health_conditions: petData.healthConditions || null,
      medications: petData.medications || null,
      vet_clinic_name: petData.vetClinicName || null,
      vet_clinic_phone: petData.vetClinicPhone || null,
      emergency_vet_details: petData.emergencyVetDetails || null,
      wake_time: petData.wakeTime || null,
      walk_play_times: petData.walkPlayTimes || null,
      nap_times: petData.napTimes || null,
      bedtime: petData.bedtime || null,
      exercise_level: petData.exerciseLevel || null,
      daily_exercise_amount: petData.dailyExerciseAmount || null,
      off_lead_allowed: petData.offLeadAllowed || null,
      favourite_games: petData.favouriteGames || null,
      training_level: petData.trainingLevel || null,
      commands_known: petData.commandsKnown || null,
      walking_style: petData.walkingStyle || null,
      max_alone_hours: petData.maxAloneHours || null,
      separation_anxiety_level: petData.separationAnxietyLevel || null,
      safe_spaces: petData.safeSpaces || null,
      escape_risk: petData.escapeRisk || null,
      sleeping_location: petData.sleepingLocation || null,
      furniture_rules: petData.furnitureRules || null,
      bedtime_rituals: petData.bedtimeRituals || null,
      fears_and_triggers: petData.fearsAndTriggers || null,
      reactivity_notes: petData.reactivityNotes || null,
      bite_history: petData.biteHistory || null,
      brushing_preferences: petData.brushingPreferences || null,
      bathing_preferences: petData.bathingPreferences || null,
      sensitive_areas: petData.sensitiveAreas || null,
      emergency_contacts: petData.emergencyContacts || null,
      vet_spend_limit: petData.vetSpendLimit || null,
      insurance_details: petData.insuranceDetails || null,
      carer_notes: petData.carerNotes || null,
      
      updated_at: new Date().toISOString(),
    };
    
    // Add species-specific fields and other fields that TypeScript complains about
    // Using 'as any' to bypass type checking since these fields exist in the database
    const fullUpdateData = {
      ...updateData,
      // Add color field
      color: petData.color || null,
      // Persist template preference only when provided
      ...((petData as any).preferredTemplate
        ? { preferred_template: (petData as any).preferredTemplate }
        : {}),
      // Add flea/worm treatment status (missing from generated types)
      flea_worm_treatment_status: petData.fleaWormTreatmentStatus || null,
      // Document fields (TEXT - public URLs from Supabase Storage)
      // Ensure we extract the URL string if an UploadedFile object is passed
      vaccination_certificate: typeof petData.vaccinationCertificate === 'string' 
        ? petData.vaccinationCertificate 
        : (petData.vaccinationCertificate as any)?.publicUrl || null,
      desexing_certificate: typeof petData.desexingCertificate === 'string' 
        ? petData.desexingCertificate 
        : (petData.desexingCertificate as any)?.publicUrl || null,
      // Add species-specific fields for dogs
      dog_off_lead_in_dog_parks: petData.dogOffLeadInDogParks || null,
      dog_prey_drive: petData.dogPreyDrive || null,
      dog_breed_work_level: petData.dogBreedWorkLevel || null,
      // Add species-specific fields for cats
      cat_litter_type: petData.catLitterType || null,
      cat_litter_tray_count: petData.catLitterTrayCount || null,
      cat_indoor_outdoor: petData.catIndoorOutdoor || null,
      cat_scratching_surfaces: petData.catScratchingSurfaces || null,
      cat_scratching_rules: petData.catScratchingRules || null,
      cat_vertical_space: petData.catVerticalSpace || null,
      // Add species-specific fields for small pets
      small_pet_enclosure_type: petData.smallPetEnclosureType || null,
      small_pet_enclosure_location: petData.smallPetEnclosureLocation || null,
      small_pet_time_outside_enclosure: petData.smallPetTimeOutsideEnclosure || null,
      small_pet_chewing_safety: petData.smallPetChewingSafety || null,
      // Add species-specific fields for birds
      bird_cage_size: petData.birdCageSize || null,
      bird_cage_location: petData.birdCageLocation || null,
      bird_time_out_of_cage: petData.birdTimeOutOfCage || null,
      bird_noise_level: petData.birdNoiseLevel || null,
      // Add species-specific fields for reptiles
      reptile_species_full: petData.reptileSpeciesFull || null,
      reptile_enclosure_size: petData.reptileEnclosureSize || null,
      reptile_heat_sources: petData.reptileHeatSources || null,
      reptile_uvb_lighting: petData.reptileUvbLighting || null,
      reptile_temperature_humidity: petData.reptileTemperatureHumidity || null,
    };

    const result = await supabase
      .from('pets')
      // @ts-ignore - Type mismatch due to outdated generated types
      .update(fullUpdateData as any)
      .eq('id', petId)
      .eq('user_id', userId)
      .select()
      .single();
    
    const { data, error } = result as { data: PetRow | null; error: any };

    if (error) {
      const friendlyError = handleSupabaseError(error, 'updatePet', { petId, userId });
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logPets('updatePet', 'error', { error: 'No data returned' });
      return { success: false, error: 'Failed to update pet. Please try again.' };
    }

    logPets('updatePet', 'success', {
      petId: data.id,
      petName: data.pet_name,
      extendedFieldsSaved: true
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    logPets('updatePet', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred updating pet' };
  }
}

/**
 * Delete a Pet
 * 
 * @param petId - ID of the pet to delete
 * @param userId - ID of the user (for security check)
 */
export async function deletePet(
  petId: string,
  userId: string
): Promise<PetServiceResult<void>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('deletePet', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('deletePet', 'info', { petId, userId });

    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', petId)
      .eq('user_id', userId);

    if (error) {
      const friendlyError = handleSupabaseError(error, 'deletePet', { petId, userId });
      return { success: false, error: friendlyError };
    }

    logPets('deletePet', 'success', { petId });

    return { success: true };
  } catch (error) {
    logPets('deletePet', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred deleting pet' };
  }
}

/**
 * Duplicate a Pet
 * 
 * Creates a copy of an existing pet with a new name.
 * 
 * @param petId - ID of the pet to duplicate
 * @param userId - ID of the user (for security check)
 * @param newName - Optional new name for the duplicate (defaults to "Copy of [original name]")
 */
export async function duplicatePet(
  petId: string,
  userId: string,
  newName?: string
): Promise<PetServiceResult<PetRow>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logPets('duplicatePet', 'error', { error });
    return { success: false, error: 'Database service unavailable' };
  }

  try {
    logPets('duplicatePet', 'info', { petId, userId, newName });

    // First, get the original pet
    const { data: originalPet, error: fetchError } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .eq('user_id', userId)
      .single<PetRow>();

    if (fetchError || !originalPet) {
      const friendlyError = fetchError 
        ? handleSupabaseError(fetchError, 'duplicatePet', { petId, userId })
        : 'Pet not found';
      return { success: false, error: friendlyError };
    }

    // Create a copy with ALL fields from the original pet
    const { id, created_at, updated_at, ...originalFields } = originalPet as any;
    
    const duplicateData = {
      ...originalFields,
      user_id: userId,
      pet_name: newName || `Copy of ${originalPet.pet_name}`,
      // Don't copy timestamps - let database set them
      created_at: undefined,
      updated_at: undefined,
    };

    const { data, error: insertError } = await supabase
      .from('pets')
      // @ts-ignore - Type mismatch due to outdated generated types
      .insert(duplicateData as any)
      .select()
      .single<PetRow>();

    if (insertError) {
      const friendlyError = handleSupabaseError(insertError, 'duplicatePet', { petId, userId });
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logPets('duplicatePet', 'error', { error: 'No data returned' });
      return { success: false, error: 'Failed to duplicate pet. Please try again.' };
    }

    logPets('duplicatePet', 'success', {
      originalPetId: petId,
      newPetId: data.id,
      newPetName: data.pet_name
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    logPets('duplicatePet', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred duplicating pet' };
  }
}

/**
 * Convert Database Row to Frontend PetData format
 * 
 * Helper function to convert database format to frontend format.
 */
export function convertRowToPetData(row: PetRow): PetData & { id: string; createdAt: string; updatedAt: string } {
  return rowToPetData(row);
}

