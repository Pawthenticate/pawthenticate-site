-- Migration: Add color field to pets table
-- Date: 2024
-- Description: Adds a 'color' column to store pet color/markings information

-- Add color column to pets table
ALTER TABLE pets
ADD COLUMN IF NOT EXISTS color TEXT;

-- Add comment to document the field
COMMENT ON COLUMN pets.color IS 'Pet color or markings (e.g., Black, White, Tri-color, etc.)';

-- Update RLS policies if needed (color should follow same rules as other pet fields)
-- No changes needed as existing RLS policies apply to all columns

-- Example usage after migration:
-- UPDATE pets SET color = 'Black & White' WHERE id = 'some-pet-id';


