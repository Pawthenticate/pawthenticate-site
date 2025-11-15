-- ====================================================================
-- DATABASE MIGRATION: Add Template Preference Field
-- ====================================================================
-- Purpose: Allow users to save their preferred resume template (rental vs pet_sitter)
--          so it persists when they revisit the preview page
-- 
-- Date: November 14, 2025
-- Phase: 4 - Template System
-- ====================================================================

-- Add preferred_template column to pets table
ALTER TABLE pets ADD COLUMN IF NOT EXISTS preferred_template TEXT DEFAULT 'rental';

-- Add check constraint to ensure only valid values
ALTER TABLE pets 
DROP CONSTRAINT IF EXISTS pets_preferred_template_check;

ALTER TABLE pets 
ADD CONSTRAINT pets_preferred_template_check 
CHECK (preferred_template IN ('rental', 'pet_sitter'));

-- Add comment for documentation
COMMENT ON COLUMN pets.preferred_template IS 
'User''s preferred resume template mode. Values: rental (landlord-focused) or pet_sitter (complete care instructions). Defaults to rental.';

-- ====================================================================
-- VERIFICATION QUERY
-- ====================================================================
-- Run this to verify the column was added successfully:
-- 
-- SELECT column_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'pets' AND column_name = 'preferred_template';
-- 
-- Expected result:
-- column_name: preferred_template
-- data_type: text
-- column_default: 'rental'::text
-- is_nullable: YES
-- ====================================================================

-- ====================================================================
-- ROLLBACK (if needed)
-- ====================================================================
-- To remove this column:
-- ALTER TABLE pets DROP COLUMN IF EXISTS preferred_template;
-- ====================================================================

