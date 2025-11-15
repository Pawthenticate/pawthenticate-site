-- =====================================================
-- Database Migration: Add Document Certificate Fields
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to add
-- document certificate columns to the pets table
-- =====================================================
--
-- Date: 2025-11-14
-- Purpose: Add support for storing uploaded document certificates
--          (vaccination and desexing certificates) as TEXT URLs
--
-- =====================================================

-- Add vaccination_certificate column (TEXT to store public URL)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS vaccination_certificate TEXT DEFAULT NULL;

-- Add desexing_certificate column (TEXT to store public URL)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS desexing_certificate TEXT DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.pets.vaccination_certificate IS 'Vaccination certificate public URL from Supabase Storage';
COMMENT ON COLUMN public.pets.desexing_certificate IS 'Desexing certificate public URL from Supabase Storage';

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
  AND column_name IN ('vaccination_certificate', 'desexing_certificate')
ORDER BY column_name;

-- Expected output:
-- vaccination_certificate | text | YES | NULL
-- desexing_certificate    | text | YES | NULL

-- =====================================================
-- Test Query (Optional)
-- =====================================================
-- Test updating a pet with document data:
/*
UPDATE public.pets
SET 
  vaccination_certificate = 'https://yzpbcjxpnflxehybndko.supabase.co/storage/v1/object/public/pet-documents/user-id/pet-id/vaccination_1234567890.pdf',
  desexing_certificate = 'https://yzpbcjxpnflxehybndko.supabase.co/storage/v1/object/public/pet-documents/user-id/pet-id/desexing_1234567890.pdf'
WHERE id = 'YOUR_PET_ID_HERE';
*/

-- =====================================================
-- ✅ Migration Complete!
-- =====================================================
-- After running this script:
-- 1. Refresh your app
-- 2. Upload documents in the create form
-- 3. They should now save to the database! 🎉
-- =====================================================

