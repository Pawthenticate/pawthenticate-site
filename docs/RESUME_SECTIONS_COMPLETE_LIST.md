# Complete Pet Resume Sections - All Modes

This document lists **ALL** sections that appear in the pet resume, organized by mode. The resume will display all filled sections, spanning multiple pages if needed.

---

## 📄 Core Sections (Always Displayed)

These appear in **BOTH** Rental Application and Pet Sitter modes:

1. **Pet Masthead** *(Header with photo, name, age, breed)*
2. **Key Facts** *(Age, breed, weight, spayed/neutered, microchipped)*
3. **Behaviour & Temperament** *(Good with, noise level, usually stays, house training, temperament quote)*
4. **Home Behaviour** *(Summary of calm, clean, respectful behavior at home)*
5. **Social Behaviour** *(Good with kids, dogs, cats)*
6. **Supporting Documents** *(List of uploaded proof documents)*

---

## 🏠 Rental Application Mode - Additional Sections

When mode is set to "Rental Application", these sections appear **in addition** to core sections:

7. **Landlord Reassurance**
   - Property damage history
   - Rental-specific notes (cleanliness, routine, responsible ownership)

**Total Rental Mode Sections:** 7 sections

---

## 🐾 Pet Sitter / Boarding Mode - Additional Sections

When mode is set to "Pet Sitter / Boarding", these sections appear **in addition** to core sections:

### General Care Sections (All Species)

7. **Feeding & Treats**
   - Food type & brand
   - Feeding times
   - Portion size
   - Treats allowed
   - Food allergies / sensitivities

8. **Health & Medications**
   - Existing health conditions
   - Medications
   - Vet clinic name & phone
   - Emergency vet details

9. **Daily Routine**
   - Wake time
   - Walk/play times
   - Nap times
   - Bedtime

10. **Exercise & Play**
    - Exercise level
    - Daily exercise amount
    - Off-lead allowed
    - Favourite games & toys

11. **Training & Commands**
    - Training level
    - Commands known
    - Walking style

12. **Alone Time & Comfort**
    - Maximum hours alone
    - Separation anxiety level
    - Safe spaces
    - Escape risk

13. **Sleeping & House Rules**
    - Sleeping location
    - Furniture rules
    - Bedtime rituals

14. **Triggers & Safety**
    - Fears & triggers
    - Reactivity notes
    - Bite history

15. **Grooming & Handling**
    - Brushing preferences
    - Bathing preferences
    - Sensitive areas

16. **Emergency Plan**
    - Emergency contacts
    - Vet spending limit
    - Insurance details

17. **Extra Notes for Carer**
    - Any additional notes for pet sitters

### Species-Specific Sections

#### 🐕 Dog-Specific (Only for Dogs)

18. **Dog-Specific Notes**
    - Dog parks / off-lead behavior
    - Prey drive
    - Working / high-energy breed notes

#### 🐱 Cat-Specific (Only for Cats)

19. **Cat Litter & Toilet**
    - Litter type
    - Number of litter trays
    - Indoor / outdoor

20. **Scratching & Environment**
    - Approved scratching surfaces
    - Scratching rules
    - Vertical space / hiding spots

#### 🐰 Small Pet-Specific (Only for Rabbits / Small Mammals)

21. **Small Pet Housing & Enrichment**
    - Enclosure type
    - Enclosure location
    - Time outside enclosure
    - Chewing & safety notes

#### 🦜 Bird-Specific (Only for Birds)

22. **Bird Cage & Environment**
    - Cage size & type
    - Cage location
    - Time out of cage
    - Noise level

#### 🦎 Reptile-Specific (Only for Reptiles)

23. **Reptile Enclosure, Heat & Lighting**
    - Reptile species (full name)
    - Enclosure size & type
    - Heat sources
    - UVB lighting
    - Temperature & humidity requirements

**Total Pet Sitter Mode Sections (Maximum):** Up to 24 sections
- 6 core sections
- 11 general care sections
- Up to 5 species-specific sections (depending on species)
- 1 documents section
- 1 footer section

---

## 📊 Display Logic

### Section Visibility Rules

1. **Core sections (1-6):** Always visible in both modes
2. **Landlord Reassurance (7):** Only in Rental mode, only if data exists
3. **Extended care sections (7-17):** Only in Pet Sitter mode, only if data exists
4. **Species-specific sections (18-23):** Only in Pet Sitter mode, only for matching species, only if data exists

### Empty Field Handling

- If a field has no data (`undefined`, `null`, or empty string), it won't display
- If an entire section has no data, the section won't display
- This keeps the resume clean and relevant

### Multi-Page Support

✅ **The resume will automatically span multiple pages** if needed
- Print CSS handles page breaks gracefully
- Sections use `break-inside-avoid` to prevent splitting mid-section
- PDF export will capture all pages

---

## 🧪 Testing Checklist

To verify all sections are working:

### Rental Mode Test
- [ ] Fill out Sections 1-6 (core)
- [ ] Fill out Section 7 (Landlord Reassurance)
- [ ] Switch to Rental mode in preview
- [ ] Verify all 7 sections appear
- [ ] Verify extended pet sitter sections do NOT appear

### Pet Sitter Mode Test
- [ ] Fill out Sections 1-6 (core)
- [ ] Expand "Extended Details (Optional)"
- [ ] Fill out Sections 8-18 (extended care)
- [ ] Fill out species-specific section for your pet's species
- [ ] Switch to Pet Sitter mode in preview
- [ ] Verify ALL filled sections appear (should be 20+ sections)
- [ ] Verify Landlord Reassurance does NOT appear

### Multi-Page Test
- [ ] Fill out ALL extended fields
- [ ] Preview in Pet Sitter mode
- [ ] Print to PDF or use Print Preview
- [ ] Verify resume spans 2-3+ pages
- [ ] Verify sections don't split awkwardly

### Species-Specific Test
For each species you support:
- [ ] Create a pet of that species
- [ ] Fill out species-specific fields
- [ ] Verify species-specific section appears in Pet Sitter mode
- [ ] Verify other species' sections do NOT appear

---

## 🎯 Summary

| Mode | Minimum Sections | Maximum Sections |
|------|------------------|------------------|
| **Rental Application** | 6 (core only) | 7 (core + landlord) |
| **Pet Sitter / Boarding** | 6 (core only) | 24 (core + all extended + species) |

**Multi-page resumes are fully supported and expected** when all extended details are filled out. This ensures pet sitters have complete care instructions! 🎉

---

## 📝 Developer Notes

### Code Locations

**Display Logic:**
- `components/PetResumeCard.tsx` - Lines 39-137
  - Core sections: Lines 40-41
  - Home & Social Behaviour: Lines 44-51
  - Mode-specific sections: Lines 54-132
  - Documents: Line 135

**Form Sections:**
- `app/create/page.tsx` - Lines 450-2450
  - Core sections: Lines 450-900
  - Extended sections (collapsible): Lines 950-2400

**Data Mapping:**
- `lib/pets.ts` - `petDataToInsert()` and `rowToPetData()`
- `types/pet.ts` - `PetData` interface with all fields

### Recent Changes

✅ **Added in this session:**
- Home Behaviour section (displays `homeBehaviourSummary`)
- Social Behaviour section (displays `goodWithKids`, `goodWithDogs`, `goodWithCats`)
- These sections now appear in BOTH modes (rental and pet sitter)

✅ **Already implemented:**
- All 11 extended care sections for Pet Sitter mode
- All 5 species-specific sections
- Conditional rendering based on mode and data presence
- localStorage fallback until database migration

