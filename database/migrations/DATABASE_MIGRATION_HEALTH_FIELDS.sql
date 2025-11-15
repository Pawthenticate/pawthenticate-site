-- Migration: Update health fields from boolean to string and add flea/worm treatment status
-- Run this in your Supabase SQL Editor

-- Step 1: Add the new flea_worm_treatment_status column
ALTER TABLE pets ADD COLUMN IF NOT EXISTS flea_worm_treatment_status TEXT;

-- Step 2: Convert desexed from boolean to TEXT
-- First, add a temporary column
ALTER TABLE pets ADD COLUMN IF NOT EXISTS desexed_temp TEXT;

-- Copy data, converting boolean to 'yes'/'no'
UPDATE pets SET desexed_temp = CASE 
  WHEN desexed = true THEN 'yes'
  WHEN desexed = false THEN 'no'
  ELSE ''
END;

-- Drop the old column and rename the new one
ALTER TABLE pets DROP COLUMN IF EXISTS desexed;
ALTER TABLE pets RENAME COLUMN desexed_temp TO desexed;

-- Step 3: Convert vaccinations_up_to_date from boolean to TEXT
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vaccinations_up_to_date_temp TEXT;

UPDATE pets SET vaccinations_up_to_date_temp = CASE 
  WHEN vaccinations_up_to_date = true THEN 'yes'
  WHEN vaccinations_up_to_date = false THEN 'no'
  ELSE ''
END;

ALTER TABLE pets DROP COLUMN IF EXISTS vaccinations_up_to_date;
ALTER TABLE pets RENAME COLUMN vaccinations_up_to_date_temp TO vaccinations_up_to_date;

-- Step 4: Convert has_pet_insurance from boolean to TEXT
ALTER TABLE pets ADD COLUMN IF NOT EXISTS has_pet_insurance_temp TEXT;

UPDATE pets SET has_pet_insurance_temp = CASE 
  WHEN has_pet_insurance = true THEN 'yes'
  WHEN has_pet_insurance = false THEN 'no'
  ELSE ''
END;

ALTER TABLE pets DROP COLUMN IF EXISTS has_pet_insurance;
ALTER TABLE pets RENAME COLUMN has_pet_insurance_temp TO has_pet_insurance;

-- Done! All health fields are now TEXT fields that can store 'yes', 'no', or 'n/a'


