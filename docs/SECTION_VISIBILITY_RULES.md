# Pet Resume Section Visibility Rules

## 🎯 Overview

The pet resume has **two modes** with different visibility rules:

1. **Rental Application Mode** - Minimal, landlord-focused sections only
2. **Pet Sitter / Boarding Mode** - Comprehensive care instructions (includes rental sections + extended care)

---

## 📋 Section Visibility Matrix

| Section | Rental Mode | Pet Sitter Mode | Visibility Rule |
|---------|-------------|-----------------|-----------------|
| **Key Facts** | ✅ Always | ✅ Always | Always visible |
| **Behaviour & Temperament** | ✅ Always | ✅ Always | Always visible |
| **Home Behaviour** | ✅ If data exists | ✅ If data exists | Conditional (both modes) |
| **Social Behaviour** | ✅ If data exists | ✅ If data exists | Conditional (both modes) |
| **Landlord Reassurance** | ✅ If data exists | ✅ If data exists | Conditional (both modes) |
| **Supporting Documents** | ✅ Always | ✅ Always | Always visible (with placeholder) |
| **Feeding & Treats** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Health & Medications** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Daily Routine** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Exercise & Play** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Training & Commands** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Alone Time & Comfort** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Sleeping & House Rules** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Triggers & Safety** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Grooming & Handling** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Emergency Plan** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Extra Notes for Carer** | ❌ Never | ✅ If data exists | Pet Sitter only |
| **Dog-Specific Notes** | ❌ Never | ✅ If data exists & species=dog | Pet Sitter only |
| **Cat Litter & Toilet** | ❌ Never | ✅ If data exists & species=cat | Pet Sitter only |
| **Cat Scratching & Environment** | ❌ Never | ✅ If data exists & species=cat | Pet Sitter only |
| **Small Pet Housing** | ❌ Never | ✅ If data exists & species=rabbit | Pet Sitter only |
| **Bird Cage & Environment** | ❌ Never | ✅ If data exists & species=bird | Pet Sitter only |
| **Reptile Enclosure & Heat** | ❌ Never | ✅ If data exists & species=reptile | Pet Sitter only |

---

## 🏠 Rental Application Mode

### Purpose
For real estate applications, landlords, and property managers. Focus on risk reduction and home behavior.

### Sections Shown (Maximum 6 sections)

1. ✅ **Key Facts** (always)
2. ✅ **Behaviour & Temperament** (always)
3. ✅ **Home Behaviour** (if filled)
4. ✅ **Social Behaviour** (if filled)
5. ✅ **Landlord Reassurance** (if filled)
6. ✅ **Supporting Documents** (always, with placeholder if empty)

### What's Hidden
- ❌ All pet care sections (Feeding, Health, Daily Routine, etc.)
- ❌ All species-specific sections
- ❌ Extra notes for carer

### Typical Length
**1-2 pages** - Clean, concise, professional

---

## 🐾 Pet Sitter / Boarding Mode

### Purpose
For pet sitters, house sitters, boarding kennels, and daycare. Comprehensive care instructions.

### Sections Shown (Maximum 24 sections)

**Core Sections (always visible):**
1. ✅ Key Facts
2. ✅ Behaviour & Temperament
3. ✅ Supporting Documents

**Rental Sections (if data exists):**
4. ✅ Home Behaviour (if filled)
5. ✅ Social Behaviour (if filled)
6. ✅ Landlord Reassurance (if filled)

**Extended Care Sections (if data exists):**
7. ✅ Feeding & Treats (if filled)
8. ✅ Health & Medications (if filled)
9. ✅ Daily Routine (if filled)
10. ✅ Exercise & Play (if filled)
11. ✅ Training & Commands (if filled)
12. ✅ Alone Time & Comfort (if filled)
13. ✅ Sleeping & House Rules (if filled)
14. ✅ Triggers & Safety (if filled)
15. ✅ Grooming & Handling (if filled)
16. ✅ Emergency Plan (if filled)
17. ✅ Extra Notes for Carer (if filled)

**Species-Specific Sections (if data exists):**
18. ✅ Dog-Specific Notes (if dog & filled)
19. ✅ Cat Litter & Toilet (if cat & filled)
20. ✅ Cat Scratching & Environment (if cat & filled)
21. ✅ Small Pet Housing (if rabbit & filled)
22. ✅ Bird Cage & Environment (if bird & filled)
23. ✅ Reptile Enclosure & Heat (if reptile & filled)

### What's Hidden
- Nothing! If it's filled and relevant to pet sitting, it shows.

### Typical Length
**2-4 pages** - Comprehensive, detailed care instructions

---

## 🔄 Key Principles

### 1. Mode Independence
Switching modes **never** affects the stored pet data. It only changes which sections are displayed.

### 2. Data-Driven Visibility
A section appears only if:
- It belongs to the current mode's `includes_field_groups`
- At least one field in that section has data
- **Exception**: Key Facts, Behaviour & Temperament, and Supporting Documents always show

### 3. Pet Sitter Mode = Rental + Extended
Pet Sitter mode shows **everything that Rental mode shows** PLUS extended care sections.

**This means:**
- If you fill out "Landlord Reassurance", it appears in BOTH modes
- If you fill out "Feeding & Treats", it ONLY appears in Pet Sitter mode

---

## 💻 Implementation Details

### Updated Files

#### 1. `resume_design.json`

```json
{
  "resume_modes": [
    {
      "id": "rental",
      "includes_field_groups": [
        "core_profile",
        "behaviour_and_temperament",
        "home_behaviour",
        "social_behaviour",
        "landlord_reassurance",
        "supporting_documents"
      ],
      "always_visible": [
        "core_profile", 
        "behaviour_and_temperament", 
        "supporting_documents"
      ],
      "conditional_visible": [
        "home_behaviour", 
        "social_behaviour", 
        "landlord_reassurance"
      ]
    },
    {
      "id": "pet_sitter",
      "includes_field_groups": [
        "core_profile",
        "behaviour_and_temperament",
        "home_behaviour",
        "social_behaviour",
        "landlord_reassurance",
        "feeding_and_treats",
        "health_and_meds",
        "daily_routine",
        "exercise_and_play",
        "training_and_commands",
        "alone_time_and_comfort",
        "sleeping_and_house_rules",
        "triggers_and_safety",
        "grooming_and_handling",
        "emergency_plan",
        "extra_notes_for_carer",
        "dog_specific_notes",
        "cat_litter_and_toilet",
        "scratching_and_environment",
        "small_pet_housing_and_enrichment",
        "bird_cage_and_environment",
        "reptile_enclosure_and_heat",
        "supporting_documents"
      ],
      "always_visible": [
        "core_profile", 
        "behaviour_and_temperament", 
        "supporting_documents"
      ],
      "conditional_visible": [
        "home_behaviour", 
        "social_behaviour", 
        "landlord_reassurance",
        /* ... all care sections ... */
      ]
    }
  ]
}
```

#### 2. `components/PetResumeCard.tsx`

**Key Changes:**

```tsx
export function PetResumeCard(props: PetResumeCardProps) {
  const { mode = 'rental', petData } = props;
  
  // Define mode checks
  const isRentalMode = mode === 'rental';
  const isPetSitterMode = mode === 'pet_sitter';

  return (
    <section>
      {/* ===== ALWAYS VISIBLE (BOTH MODES) ===== */}
      <KeyFactsSection items={keyFacts} />
      <BehaviourSection behaviour={behaviour} quote={temperamentQuote} />
      
      {/* ===== CONDITIONAL SECTIONS (BOTH MODES) ===== */}
      {petData?.homeBehaviourSummary && (
        <HomeBehaviourSection petData={petData} />
      )}
      
      {hasAnyData(petData, ['goodWithKids', 'goodWithDogs', 'goodWithCats']) && (
        <SocialBehaviourSection petData={petData} />
      )}
      
      {hasAnyData(petData, ['propertyDamageHistory', 'rentalSpecificNotes']) && (
        <LandlordReassuranceSection petData={petData} />
      )}
      
      {/* ===== PET SITTER MODE ONLY ===== */}
      {isPetSitterMode && petData && (
        <>
          {hasAnyData(petData, ['foodType', ...]) && (
            <FeedingSection petData={petData} />
          )}
          {/* ... all other care sections ... */}
        </>
      )}
      
      {/* ===== ALWAYS VISIBLE (BOTH MODES) ===== */}
      <DocumentsSection documents={documents} note={documentsNote} />
    </section>
  );
}
```

**Logic:**
- `isRentalMode` / `isPetSitterMode` flags for clarity
- Sections organized into three groups:
  1. Always visible (both modes)
  2. Conditional (both modes, if data exists)
  3. Pet Sitter only (if data exists)

---

## ✅ Testing Checklist

### Rental Mode Tests

- [ ] Key Facts always visible (even with minimal data)
- [ ] Behaviour & Temperament always visible
- [ ] Home Behaviour appears when filled, hidden when empty
- [ ] Social Behaviour appears when filled, hidden when empty
- [ ] Landlord Reassurance appears when filled, hidden when empty
- [ ] Supporting Documents always visible (shows placeholder if empty)
- [ ] Feeding & Treats NEVER appears (even if filled)
- [ ] Health & Medications NEVER appears (even if filled)
- [ ] All other care sections NEVER appear
- [ ] Species-specific sections NEVER appear

### Pet Sitter Mode Tests

- [ ] All rental sections appear (if data exists)
- [ ] Landlord Reassurance appears if filled (not hidden in pet sitter mode)
- [ ] Feeding & Treats appears when filled
- [ ] Health & Medications appears when filled
- [ ] All extended care sections appear when filled
- [ ] Species-specific sections appear for matching species when filled
- [ ] Supporting Documents always visible

### Mode Switching Tests

- [ ] Switching from Rental to Pet Sitter shows more sections (care sections appear)
- [ ] Switching from Pet Sitter to Rental hides care sections
- [ ] Landlord Reassurance persists in both modes if filled
- [ ] No data is lost when switching modes
- [ ] Console shows no errors when switching modes

---

## 🎉 Summary

### ✅ What's Fixed

1. **Rental mode** now correctly shows ONLY landlord-focused sections
2. **Pet Sitter mode** now shows rental sections PLUS care sections
3. **Landlord Reassurance** appears in BOTH modes if filled (previously only in rental)
4. **Supporting Documents** always appears in BOTH modes (with placeholder if empty)
5. Clear separation: care sections NEVER appear in rental mode

### 🎯 User Experience

**Rental Application:**
- Clean, concise, professional
- 1-2 pages maximum
- Only shows what landlords care about

**Pet Sitter / Boarding:**
- Comprehensive care instructions
- 2-4+ pages typical
- Shows everything filled out (rental info + care details)

### 📊 Expected Behavior

| Scenario | Rental Mode | Pet Sitter Mode |
|----------|-------------|-----------------|
| User fills only core fields | Shows 3 sections | Shows 3 sections |
| User fills Landlord Reassurance | Shows 4 sections | Shows 4 sections |
| User fills Feeding & Treats | Shows 3-4 sections (no feeding) | Shows 4-5 sections (includes feeding) |
| User fills everything | Shows max 6 sections | Shows max 24 sections |

---

## 🚀 Ready to Use!

The section visibility logic now works correctly:
- ✅ Rental mode = minimal and focused
- ✅ Pet Sitter mode = comprehensive and complete
- ✅ No unexpected sections appearing/disappearing
- ✅ Always shows core sections and documents
- ✅ Smart data-driven conditional rendering

