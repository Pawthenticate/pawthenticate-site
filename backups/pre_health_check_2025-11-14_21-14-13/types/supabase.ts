/**
 * Supabase Database Types
 * 
 * Auto-generated TypeScript types for the Supabase database schema.
 * These types ensure type safety when querying the database.
 * 
 * To regenerate these types after schema changes:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string
          user_id: string
          pet_name: string
          species: string
          breed: string | null
          color: string | null
          date_of_birth: string | null
          manual_age: number | null
          manual_age_unit: string | null
          size: string | null
          weight_kg: number | null
          photo_url: string | null
          microchip_number: string
          council_registration_number: string | null
          desexed: string
          vaccinations_up_to_date: string
          flea_worm_treatment_status: string | null
          last_flea_worm_treatment_date: string | null
          has_pet_insurance: string
          pet_insurance_provider: string | null
          temperament_summary: string
          living_location: string
          good_with: string[] | null
          noise_level: string
          house_training_status: string
          // Home Behaviour
          home_behaviour_summary: string | null
          // Social Behaviour
          good_with_kids: string | null
          good_with_dogs: string | null
          good_with_cats: string | null
          // Landlord Reassurance
          property_damage_history: string | null
          rental_specific_notes: string | null
          // Feeding & Treats
          food_type: string | null
          feeding_schedule: string | null
          portion_size: string | null
          treats_allowed: string | null
          food_allergies: string | null
          // Health & Medications
          health_conditions: string | null
          medications: string | null
          vet_clinic_name: string | null
          vet_clinic_phone: string | null
          emergency_vet_details: string | null
          // Daily Routine
          wake_time: string | null
          walk_play_times: string | null
          nap_times: string | null
          bedtime: string | null
          // Exercise & Play
          exercise_level: string | null
          daily_exercise_amount: string | null
          off_lead_allowed: string | null
          favourite_games: string | null
          // Training & Commands
          training_level: string | null
          commands_known: string | null
          walking_style: string | null
          // Alone Time & Comfort
          max_alone_hours: number | null
          separation_anxiety_level: string | null
          safe_spaces: string | null
          escape_risk: string | null
          // Sleeping & House Rules
          sleeping_location: string | null
          furniture_rules: string | null
          bedtime_rituals: string | null
          // Triggers & Safety
          fears_and_triggers: string | null
          reactivity_notes: string | null
          bite_history: string | null
          // Grooming & Handling
          brushing_preferences: string | null
          bathing_preferences: string | null
          sensitive_areas: string | null
          // Emergency Plan
          emergency_contacts: string | null
          vet_spend_limit: string | null
          insurance_details: string | null
          // Extra Notes
          carer_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_name: string
          species: string
          breed?: string | null
          color?: string | null
          date_of_birth?: string | null
          manual_age?: number | null
          manual_age_unit?: string | null
          size?: string | null
          weight_kg?: number | null
          photo_url?: string | null
          microchip_number: string
          council_registration_number?: string | null
          desexed?: string
          vaccinations_up_to_date?: string
          flea_worm_treatment_status?: string | null
          last_flea_worm_treatment_date?: string | null
          has_pet_insurance?: string
          pet_insurance_provider?: string | null
          temperament_summary: string
          living_location: string
          good_with?: string[] | null
          noise_level: string
          house_training_status: string
          // Home Behaviour
          home_behaviour_summary?: string | null
          // Social Behaviour
          good_with_kids?: string | null
          good_with_dogs?: string | null
          good_with_cats?: string | null
          // Landlord Reassurance
          property_damage_history?: string | null
          rental_specific_notes?: string | null
          // Feeding & Treats
          food_type?: string | null
          feeding_schedule?: string | null
          portion_size?: string | null
          treats_allowed?: string | null
          food_allergies?: string | null
          // Health & Medications
          health_conditions?: string | null
          medications?: string | null
          vet_clinic_name?: string | null
          vet_clinic_phone?: string | null
          emergency_vet_details?: string | null
          // Daily Routine
          wake_time?: string | null
          walk_play_times?: string | null
          nap_times?: string | null
          bedtime?: string | null
          // Exercise & Play
          exercise_level?: string | null
          daily_exercise_amount?: string | null
          off_lead_allowed?: string | null
          favourite_games?: string | null
          // Training & Commands
          training_level?: string | null
          commands_known?: string | null
          walking_style?: string | null
          // Alone Time & Comfort
          max_alone_hours?: number | null
          separation_anxiety_level?: string | null
          safe_spaces?: string | null
          escape_risk?: string | null
          // Sleeping & House Rules
          sleeping_location?: string | null
          furniture_rules?: string | null
          bedtime_rituals?: string | null
          // Triggers & Safety
          fears_and_triggers?: string | null
          reactivity_notes?: string | null
          bite_history?: string | null
          // Grooming & Handling
          brushing_preferences?: string | null
          bathing_preferences?: string | null
          sensitive_areas?: string | null
          // Emergency Plan
          emergency_contacts?: string | null
          vet_spend_limit?: string | null
          insurance_details?: string | null
          // Extra Notes
          carer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_name?: string
          species?: string
          breed?: string | null
          date_of_birth?: string | null
          manual_age?: number | null
          manual_age_unit?: string | null
          size?: string | null
          weight_kg?: number | null
          photo_url?: string | null
          microchip_number?: string
          council_registration_number?: string | null
          desexed?: boolean
          vaccinations_up_to_date?: boolean
          last_flea_worm_treatment_date?: string | null
          has_pet_insurance?: boolean
          pet_insurance_provider?: string | null
          temperament_summary?: string
          living_location?: string
          good_with?: string[] | null
          noise_level?: string
          house_training_status?: string
          // Home Behaviour
          home_behaviour_summary?: string | null
          // Social Behaviour
          good_with_kids?: string | null
          good_with_dogs?: string | null
          good_with_cats?: string | null
          // Landlord Reassurance
          property_damage_history?: string | null
          rental_specific_notes?: string | null
          // Feeding & Treats
          food_type?: string | null
          feeding_schedule?: string | null
          portion_size?: string | null
          treats_allowed?: string | null
          food_allergies?: string | null
          // Health & Medications
          health_conditions?: string | null
          medications?: string | null
          vet_clinic_name?: string | null
          vet_clinic_phone?: string | null
          emergency_vet_details?: string | null
          // Daily Routine
          wake_time?: string | null
          walk_play_times?: string | null
          nap_times?: string | null
          bedtime?: string | null
          // Exercise & Play
          exercise_level?: string | null
          daily_exercise_amount?: string | null
          off_lead_allowed?: string | null
          favourite_games?: string | null
          // Training & Commands
          training_level?: string | null
          commands_known?: string | null
          walking_style?: string | null
          // Alone Time & Comfort
          max_alone_hours?: number | null
          separation_anxiety_level?: string | null
          safe_spaces?: string | null
          escape_risk?: string | null
          // Sleeping & House Rules
          sleeping_location?: string | null
          furniture_rules?: string | null
          bedtime_rituals?: string | null
          // Triggers & Safety
          fears_and_triggers?: string | null
          reactivity_notes?: string | null
          bite_history?: string | null
          // Grooming & Handling
          brushing_preferences?: string | null
          bathing_preferences?: string | null
          sensitive_areas?: string | null
          // Emergency Plan
          emergency_contacts?: string | null
          vet_spend_limit?: string | null
          insurance_details?: string | null
          // Extra Notes
          carer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pet_documents: {
        Row: {
          id: string
          pet_id: string
          type: string
          file_path: string
          file_name: string
          file_size: number
          mime_type: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          type: string
          file_path: string
          file_name: string
          file_size: number
          mime_type: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          type?: string
          file_path?: string
          file_name?: string
          file_size?: number
          mime_type?: string
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

