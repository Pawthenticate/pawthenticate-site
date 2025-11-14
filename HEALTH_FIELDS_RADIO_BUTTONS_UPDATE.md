# Health Fields Radio Buttons Update

## Summary
Converted health, safety, and insurance fields from checkboxes to radio buttons with Yes/No/N/A options. Also merged the Required Documents section into the Health section for better organization.

## Changes Made

### 1. Form Structure (`app/create/page.tsx`)
- ✅ **Merged Sections 3 and 5**: Combined "Health, Safety & Insurance" with "Required Documents" into a single cohesive section
- ✅ **Converted to Radio Buttons**: Changed all health fields from checkboxes to radio buttons with three options:
  - **Yes**
  - **No**
  - **N/A** (Not Applicable)

### 2. Fields Updated

#### Radio Button Fields:
1. **Desexed (spayed/neutered)** - Required field
2. **Vaccinations up to date** - Required field
3. **Flea/Worm Treatment Current** - Optional field (NEW!)
4. **My pet has insurance** - Optional field

#### Additional Fields (Conditional):
- **Last Flea/Worm Treatment** (text input for date) - Only appears when "Flea/Worm Treatment Current" = "Yes"
- **Insurance Provider** (text input) - Only appears when "My pet has insurance" = "Yes" - Required if shown

#### Document Uploads (Conditional):
- **Vaccination Certificate** - Only appears when "Vaccinations up to date" = "Yes"
- **Desexing Certificate** - Only appears when "Desexed" = "Yes"

Document upload section only displays when at least one certificate is required (based on the radio button selections).

### 3. Type Definitions (`types/pet.ts`)
```typescript
// Changed from boolean to string
desexed: string;                    // 'yes' | 'no' | 'n/a'
vaccinationsUpToDate: string;       // 'yes' | 'no' | 'n/a'
hasPetInsurance: string;            // 'yes' | 'no' | 'n/a'

// NEW field
fleaWormTreatmentStatus?: string;   // 'yes' | 'no' | 'n/a'
```

### 4. Database Schema (`types/supabase.ts`)
Updated both `Row` and `Insert` interfaces to use `string` instead of `boolean`:
- `desexed: string`
- `vaccinations_up_to_date: string`
- `has_pet_insurance: string`
- `flea_worm_treatment_status: string | null` (NEW)

### 5. Database Layer (`lib/pets.ts`)
Updated all CRUD operations to handle the new string-based fields:
- `petDataToInsert()` - Maps form data to database format
- `rowToPetData()` - Maps database rows to application format
- `updatePet()` - Includes all new fields in updates

### 6. Validation (`app/create/page.tsx`)
Updated validation logic:
```typescript
// Insurance provider is required when insurance = 'yes'
if (formData.hasPetInsurance === 'yes' && !formData.petInsuranceProvider?.trim()) {
  errors.petInsuranceProvider = 'Please enter your pet insurance provider';
}
```

## Database Migration

**IMPORTANT**: You need to run the SQL migration to update your database schema.

### Migration File: `DATABASE_MIGRATION_HEALTH_FIELDS.sql`

This migration will:
1. Add the new `flea_worm_treatment_status` column
2. Convert `desexed` from boolean to TEXT (preserving existing data)
3. Convert `vaccinations_up_to_date` from boolean to TEXT (preserving existing data)
4. Convert `has_pet_insurance` from boolean to TEXT (preserving existing data)

**How to run:**
1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `DATABASE_MIGRATION_HEALTH_FIELDS.sql`
4. Paste and run the migration
5. Verify the changes were applied successfully

## User Benefits

1. **More Flexibility**: Radio buttons allow users to indicate "Not Applicable" for situations where yes/no doesn't fit
2. **Better Organization**: Health information and related documents are now together in one section
3. **Clearer UI**: Radio buttons are more intuitive than checkboxes for mutually exclusive options
4. **Print-Ready**: All document uploads and health status will be properly reflected in the printed resume

## UI Improvements

- Radio buttons use consistent styling with primary color accent
- Clear labels with required/optional indicators
- Document upload section has a visual separator (border-top)
- All radio options are clearly labeled: Yes, No, N/A
- Insurance provider field only shows when "Yes" is selected for insurance
- **Conditional Fields**: All follow-up fields only appear when relevant (reduces form clutter)
  - Desexing certificate upload only shows if user selects "Yes" for desexed
  - Vaccination certificate upload only shows if user selects "Yes" for vaccinations
  - Last Flea/Worm Treatment date only shows if user selects "Yes" for flea/worm treatment current
  - Insurance provider field only shows if user selects "Yes" for has insurance
- Removed microchip paperwork upload (not needed as microchip number is already captured in text field)

## Testing Checklist

- [ ] Run the database migration in Supabase
- [ ] Create a new pet profile and verify all radio buttons work
- [ ] Edit an existing pet profile (existing checkbox values should be converted)
- [ ] Verify "N/A" option works for all fields
- [ ] **Conditional Fields Testing**:
  - [ ] Select "Yes" for insurance → Insurance provider field should appear (and is required)
  - [ ] Select "No" or "N/A" for insurance → Insurance provider field should disappear
  - [ ] Select "Yes" for flea/worm treatment → Last treatment date field should appear
  - [ ] Select "No" or "N/A" for flea/worm treatment → Last treatment date field should disappear
- [ ] **Conditional Uploads Testing**:
  - [ ] Select "Yes" for desexed → Desexing certificate upload should appear
  - [ ] Select "No" or "N/A" for desexed → Desexing certificate upload should disappear
  - [ ] Select "Yes" for vaccinations → Vaccination certificate upload should appear
  - [ ] Select "No" or "N/A" for vaccinations → Vaccination certificate upload should disappear
  - [ ] Verify document section is hidden when both desexed and vaccinations are "No" or "N/A"
- [ ] Upload test documents (vaccination cert, desexing cert)
- [ ] Generate a resume and verify all health information displays correctly
- [ ] Test print output to ensure documents are noted on the resume
- [ ] Test on mobile device to ensure radio buttons are touch-friendly

## Notes

- The change from checkboxes to radio buttons is a breaking change that requires database migration
- Existing data will be converted: `true` → `'yes'`, `false` → `'no'`
- New profiles will have empty strings by default until a radio option is selected
- The form will enforce selection of required fields (desexed, vaccinations)

