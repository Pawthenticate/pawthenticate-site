-- ============================================================================
-- PAWTHENTICATE DATABASE MIGRATION: Extended & Species-Specific Fields
-- ============================================================================
-- This migration adds all extended and species-specific fields to the pets table.
-- Run this SQL in Supabase SQL Editor to persist extended data in the database.
--
-- IMPORTANT: Until you run this migration, extended data will be saved to
-- localStorage only and will not persist across devices/browsers.
-- ============================================================================

-- Add Extended Fields (Sections 6-17 from resume_design.json)

-- Section: Home Behaviour (used in both modes)
ALTER TABLE pets ADD COLUMN IF NOT EXISTS home_behaviour_summary TEXT;

-- Section: Social Behaviour (used in both modes)
ALTER TABLE pets ADD COLUMN IF NOT EXISTS good_with_kids TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS good_with_dogs TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS good_with_cats TEXT;

-- Section: Landlord Reassurance (rental mode only)
ALTER TABLE pets ADD COLUMN IF NOT EXISTS property_damage_history TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS rental_specific_notes TEXT;

-- Section: Feeding & Treats (pet sitter mode only)
ALTER TABLE pets ADD COLUMN IF NOT EXISTS food_type TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS feeding_schedule TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS portion_size TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS treats_allowed TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS food_allergies TEXT;

-- Section: Health & Medications
ALTER TABLE pets ADD COLUMN IF NOT EXISTS health_conditions TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS medications TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vet_clinic_name TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vet_clinic_phone TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS emergency_vet_details TEXT;

-- Section: Daily Routine
ALTER TABLE pets ADD COLUMN IF NOT EXISTS wake_time TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS walk_play_times TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS nap_times TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bedtime TEXT;

-- Section: Exercise & Play
ALTER TABLE pets ADD COLUMN IF NOT EXISTS exercise_level TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS daily_exercise_amount TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS off_lead_allowed TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS favourite_games TEXT;

-- Section: Training & Commands
ALTER TABLE pets ADD COLUMN IF NOT EXISTS training_level TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS commands_known TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS walking_style TEXT;

-- Section: Alone Time & Comfort
ALTER TABLE pets ADD COLUMN IF NOT EXISTS max_alone_hours TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS separation_anxiety_level TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS safe_spaces TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS escape_risk TEXT;

-- Section: Sleeping & House Rules
ALTER TABLE pets ADD COLUMN IF NOT EXISTS sleeping_location TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS furniture_rules TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bedtime_rituals TEXT;

-- Section: Triggers & Safety
ALTER TABLE pets ADD COLUMN IF NOT EXISTS fears_and_triggers TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reactivity_notes TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bite_history TEXT;

-- Section: Grooming & Handling
ALTER TABLE pets ADD COLUMN IF NOT EXISTS brushing_preferences TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bathing_preferences TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS sensitive_areas TEXT;

-- Section: Emergency Plan
ALTER TABLE pets ADD COLUMN IF NOT EXISTS emergency_contacts TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vet_spend_limit TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS insurance_details TEXT;

-- Section: Extra Notes for Carer
ALTER TABLE pets ADD COLUMN IF NOT EXISTS carer_notes TEXT;

-- ============================================================================
-- Add Species-Specific Fields
-- ============================================================================

-- Dog-Specific Fields
ALTER TABLE pets ADD COLUMN IF NOT EXISTS dog_off_lead_in_dog_parks TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS dog_prey_drive TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS dog_breed_work_level TEXT;

-- Cat-Specific Fields
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_litter_type TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_litter_tray_count INTEGER;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_indoor_outdoor TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_scratching_surfaces TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_scratching_rules TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS cat_vertical_space TEXT;

-- Small Pet (Rabbit) Fields
ALTER TABLE pets ADD COLUMN IF NOT EXISTS small_pet_enclosure_type TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS small_pet_enclosure_location TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS small_pet_time_outside_enclosure TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS small_pet_chewing_safety TEXT;

-- Bird-Specific Fields
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bird_cage_size TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bird_cage_location TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bird_time_out_of_cage TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS bird_noise_level TEXT;

-- Reptile-Specific Fields
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reptile_species_full TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reptile_enclosure_size TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reptile_heat_sources TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reptile_uvb_lighting TEXT;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS reptile_temperature_humidity TEXT;

-- ============================================================================
-- Add indexes for commonly queried fields (optional, for performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_pets_species ON pets(species);
CREATE INDEX IF NOT EXISTS idx_pets_user_id_species ON pets(user_id, species);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- After running this migration:
-- 1. Extended fields will persist to the database instead of localStorage
-- 2. Data will sync across devices/browsers
-- 3. You can optionally clean up localStorage keys: pet_extended_*
-- ============================================================================

