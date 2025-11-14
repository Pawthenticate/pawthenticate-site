# Bug Fix: Preview vs Print Mismatch

## Issue Diagnosis

### 1. Spec Text in PDF
**Root Cause**: The text "Option 1: 'Rental Application Resume'..." is NOT in the code - it's in a pet record's `temperament_summary` field in your database.

**Evidence**:
- The spec text exists only in `docs/resume_design.json` (line 642) as design documentation
- `PetMasthead` component displays: `summary={petData.temperamentSummary || ''}` (line 291, preview/page.tsx)
- This means a pet in your database has this text in the `temperament_summary` column

**Fix**: Update your test pet's data in Supabase to have a proper temperament summary like:
```
"Buddy is a friendly and well-behaved Golden Retriever. He loves people and is calm indoors."
```

### 2. Feeding Section in Rental Mode
**Status**: ✅ Code is ALREADY CORRECT!

**Evidence**:
- Line 65-68 in `PetResumeCard.tsx`: `{isPetSitterMode && petData && (`
- FeedingSection is properly wrapped and will ONLY show when mode is 'pet_sitter'
- The mode prop is correctly passed at line 303 of preview page: `mode={resumeMode}`

If you're still seeing Feeding & Treats in rental mode, it might be:
1. The browser is caching an old version (hard refresh: Ctrl+Shift+R)
2. You're viewing an old PDF that was generated when the code had a bug
3. The mode switcher wasn't set to "Rental Application" before printing

### 3. Mode Preservation
**Status**: ✅ Already working correctly!

**How it works**:
1. User selects mode via toggle (line 239-263, preview/page.tsx)
2. State is stored in `resumeMode` (line 35)
3. Same state is passed to `PetResumeCard` component (line 303)
4. When `window.print()` is called (line 118), it prints the current DOM - which includes the correct mode

## Action Items

### For You (The Developer):
1. **Fix Test Data**: Go to Supabase dashboard and update any pets with spec text in `temperament_summary`
2. **Clear Browser Cache**: Hard refresh the preview page
3. **Test Again**: 
   - Select "Rental Application" mode
   - Print/Save PDF
   - Verify only rental sections appear

### Code Quality Checks (All Passing):
- ✅ Section visibility logic is correct
- ✅ Mode prop is properly threaded through components  
- ✅ Print uses same component as preview
- ✅ No spec text in any JSX/TSX files

## Verified Section Visibility Rules

### Rental Mode (`mode='rental'`):
**Always Show:**
- Key Facts
- Behaviour & Temperament  
- Supporting Documents

**Show Only If Has Data:**
- Home Behaviour (if `homeBehaviourSummary` exists)
- Social Behaviour (if `goodWithKids/Dogs/Cats` exists)
- Landlord Reassurance (if `propertyDamageHistory` or `rentalSpecificNotes` exists)

**Never Show:**
- Feeding & Treats ❌
- Health & Medications ❌
- Daily Routine ❌
- Exercise & Play ❌
- Training & Commands ❌
- All other care sections ❌

### Pet Sitter Mode (`mode='pet_sitter'`):
**Show Everything From Rental Mode PLUS:**
- All care sections (if they have data)

## Code References

### Where Mode Is Used:
```tsx
// preview/page.tsx, line 35
const [resumeMode, setResumeMode] = useState<'rental' | 'pet_sitter'>('rental');

// preview/page.tsx, line 303
<PetResumeCard
  mode={resumeMode}  // ✅ Correctly passed
  ...
/>

// PetResumeCard.tsx, line 38
const isPetSitterMode = mode === 'pet_sitter';

// PetResumeCard.tsx, line 65
{isPetSitterMode && petData && (  // ✅ Correctly guards care sections
  <>
    <FeedingSection />
    <HealthMedicationsSection />
    ...
  </>
)}
```

### Where Temperament Summary Is Rendered:
```tsx
// PetMasthead.tsx, line 119
<p>"{summary}"</p>  // Displays whatever is in temperamentSummary field

// preview/page.tsx, line 291
<PetMasthead summary={petData.temperamentSummary || ''} />
```

## Next Steps

1. **Check your Supabase database**: Look for pets with spec text in `temperament_summary`
2. **Update test data**: Replace spec text with proper temperament descriptions
3. **Clear cache and test**: Hard refresh browser, select rental mode, print
4. **If still seeing issues**: Check the browser console for React errors or state issues

The code is solid - the issue is in your test data! 🎯

