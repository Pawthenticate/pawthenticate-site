-- =====================================================
-- Database Migration: Add Form Logic Fields
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to add
-- new form logic fields to the pets table
-- =====================================================
--
-- Date: 2025-11-14
-- Purpose: Add support for conditional form fields:
--          - noise_level_description (for when noise level is not Low)
--          - separation_anxiety_description (for when separation anxiety is not None)
--          - safe_places (new field for describing safe spots)
--
-- =====================================================

-- Add noise_level_description column (TEXT to store description)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS noise_level_description TEXT DEFAULT NULL;

-- Add separation_anxiety_description column (TEXT to store behavioral description)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS separation_anxiety_description TEXT DEFAULT NULL;

-- Add safe_places column (TEXT to store safe spots/areas)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS safe_places TEXT DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.pets.noise_level_description IS 'Description of when/why pet is noisy (shown when noise level is Medium or High)';
COMMENT ON COLUMN public.pets.separation_anxiety_description IS 'Description of behaviors when left alone (shown when separation anxiety is not None)';
COMMENT ON COLUMN public.pets.safe_places IS 'Description of spots/areas where the pet feels safe';

-- =====================================================
-- Verification Query
-- =====================================================
-- Run this to verify the columns were added:

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'pets' 
  AND column_name IN ('noise_level_description', 'separation_anxiety_description', 'safe_places')
ORDER BY column_name;

-- Expected output:
-- noise_level_description           | text | YES | NULL
-- safe_places                        | text | YES | NULL
-- separation_anxiety_description    | text | YES | NULL

-- =====================================================
-- Test Query (Optional)
-- =====================================================
-- Test updating a pet with the new fields:
/*
UPDATE public.pets
SET 
  noise_level_description = 'Barks at doorbell and when people walk by the window',
  separation_anxiety_description = 'Mild whining for first 10 minutes, then settles down',
  safe_places = 'Under the bed, crate, corner behind the couch'
WHERE id = 'YOUR_PET_ID_HERE';
*/

-- =====================================================
-- ✅ Migration Complete!
-- =====================================================
-- After running this script:
-- 1. Refresh your app
-- 2. The 500 errors should be resolved
-- 3. Edit or create pets with the new conditional fields
-- 4. They should now save to the database! 🎉
-- =====================================================

