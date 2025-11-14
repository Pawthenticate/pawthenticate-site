# Testing Guide: New Resume Fields

## Quick Start Testing

### 1. View the Changes
Navigate to the preview page of any existing pet to see the new mode switcher:

```bash
npm run dev
# Then navigate to: http://localhost:3000/preview?petId=YOUR_PET_ID
```

### 2. Test Mode Switching
In the preview page header, you'll see a new toggle:
- **🏠 Rental Application** - Shows core fields + landlord reassurance
- **🐾 Pet Sitter / Boarding** - Shows all fields including extended care details

Click each button to switch between modes and see different sections appear.

### 3. What You'll See (Current Data)

With existing pets (created before this update):
- ✅ **Rental mode** - All existing sections display normally
- ✅ **Pet Sitter mode** - Same as rental mode (no extended data yet)

The new sections will only appear once you add data for those fields.

## Testing with Sample Data (Manual)

To see ALL new sections, you can manually add sample data to test the display.

### Option A: Using Browser Console (Quick Test)

1. Open preview page
2. Open browser DevTools (F12)
3. In the Console, paste:

```javascript
// This won't persist, but you can see the UI layout
const testData = {
  // Existing core fields (keep as is)
  petName: "Buddy",
  species: "dog",
  breed: "Golden Retriever",
  temperamentSummary: "Friendly and energetic",
  
  // NEW: Landlord Reassurance
  propertyDamageHistory: "No damage",
  rentalSpecificNotes: "Buddy is house-trained and very calm indoors. Regular grooming keeps shedding minimal.",
  
  // NEW: Feeding & Treats
  foodType: "Royal Canin Adult Dry Food",
  feedingSchedule: "7:00 AM and 6:00 PM",
  portionSize: "2 cups per meal",
  treatsAllowed: "Carrots, apple slices (no core), dental chews. Avoid chocolate and grapes.",
  foodAllergies: "None known",
  
  // NEW: Health & Medications
  healthConditions: "Mild hip dysplasia (managed with supplements)",
  medications: "Glucosamine chondroitin - 1 tablet daily with breakfast",
  vetClinicName: "Happy Paws Veterinary Clinic",
  vetClinicPhone: "0412 345 678",
  emergencyVetDetails: "After Hours Animal Hospital - 0412 999 888",
  
  // NEW: Daily Routine
  wakeTime: "6:30 AM",
  walkPlayTimes: "Morning walk at 7 AM (30 min), Evening walk at 5 PM (45 min)",
  napTimes: "Usually naps 11 AM - 1 PM and after dinner",
  bedtime: "9:30 PM",
  
  // NEW: Exercise & Play
  exerciseLevel: "Moderate",
  dailyExerciseAmount: "2 walks per day, total 1.5 hours",
  offLeadAllowed: "Yes, in secure dog parks only",
  favouriteGames: "Fetch, tug-of-war, swimming",
  
  // NEW: Training & Commands
  trainingLevel: "Advanced",
  commandsKnown: "Sit, Stay, Drop, Come, Heel, Leave it, Shake, Roll over",
  walkingStyle: "Walks well on leash with occasional pulling when excited. Use harness, not collar.",
  
  // NEW: Alone Time & Comfort
  maxAloneHours: 6,
  separationAnxietyLevel: "Mild",
  safeSpaces: "Free roam of house, prefers the living room couch",
  escapeRisk: "None - doesn't jump fences or dig",
  
  // NEW: Sleeping & House Rules
  sleepingLocation: "Dog bed in bedroom",
  furnitureRules: "Allowed on couch, not on beds unless invited",
  bedtimeRituals: "Last bathroom break, small treat, then settles in bed",
  
  // NEW: Triggers & Safety
  fearsAndTriggers: "Thunder, fireworks, and vacuum cleaner. Provide quiet safe space during storms.",
  reactivityNotes: "Friendly with all dogs. May bark at the doorbell but calms quickly.",
  biteHistory: "No bite history. Has never shown aggression.",
  
  // NEW: Grooming & Handling
  brushingPreferences: "Brush 3x per week, enjoys it. Use slicker brush.",
  bathingPreferences: "Bath monthly, uses oatmeal shampoo for sensitive skin",
  sensitiveAreas: "Prefers gentle handling of paws and ears",
  
  // NEW: Emergency Plan
  emergencyContacts: "1. Jane Smith (owner) - 0412 123 456\n2. John Smith (partner) - 0412 654 321\n3. Sarah Lee (neighbor) - 0412 789 012",
  vetSpendLimit: "Up to $500 for emergency treatment without prior approval",
  insuranceDetails: "PetSure Insurance - Policy #PS123456"
};

console.log("Sample data ready for testing", testData);
```

### Option B: Test Individual Sections

Each section appears only when it has data. Test by checking:

| Section | Check if displays when... |
|---------|---------------------------|
| Landlord Reassurance | `propertyDamageHistory` OR `rentalSpecificNotes` exists |
| Feeding & Treats | Any of: `foodType`, `feedingSchedule`, `portionSize`, `treatsAllowed`, `foodAllergies` |
| Health & Medications | Any of: `healthConditions`, `medications`, `vetClinicName`, `vetClinicPhone`, `emergencyVetDetails` |
| Daily Routine | Any of: `wakeTime`, `walkPlayTimes`, `napTimes`, `bedtime` |
| Exercise & Play | Any of: `exerciseLevel`, `dailyExerciseAmount`, `offLeadAllowed`, `favouriteGames` |
| Training & Commands | Any of: `trainingLevel`, `commandsKnown`, `walkingStyle` |
| Alone Time & Comfort | Any of: `maxAloneHours`, `separationAnxietyLevel`, `safeSpaces`, `escapeRisk` |
| Sleeping & House Rules | Any of: `sleepingLocation`, `furnitureRules`, `bedtimeRituals` |
| Triggers & Safety | Any of: `fearsAndTriggers`, `reactivityNotes`, `biteHistory` |
| Grooming & Handling | Any of: `brushingPreferences`, `bathingPreferences`, `sensitiveAreas` |
| Emergency Plan | Any of: `emergencyContacts`, `vetSpendLimit`, `insuranceDetails` |
| Extra Notes | `carerNotes` exists |

## Visual Checks

### ✅ Rental Mode Should Show:
1. Pet Masthead (existing)
2. Key Facts (existing)
3. Behaviour & Temperament (existing)
4. **Landlord Reassurance** (NEW - if data exists)
5. Supporting Documents (existing)

### ✅ Pet Sitter Mode Should Show:
1. Pet Masthead (existing)
2. Key Facts (existing)
3. Behaviour & Temperament (existing)
4. **All 12 new sections** (if data exists for each)
5. Supporting Documents (existing)

## Expected Behavior

### Mode Switcher:
- ✅ Sticky header with toggle buttons
- ✅ Active mode has white background with colored text
- ✅ Smooth transition when switching modes
- ✅ Hidden when printing (CSS `no-print` class)

### Section Rendering:
- ✅ Sections use same styling as existing sections
- ✅ Green checkmarks for each field label
- ✅ Two-column grid layout (responsive)
- ✅ Clean typography and spacing
- ✅ Print-optimized layout

### Responsive Design:
- ✅ Mobile: Stacked layout, readable fonts
- ✅ Tablet: Two-column grid where appropriate
- ✅ Desktop: Full two-column layout
- ✅ Print: Optimized spacing and sizing

## Common Issues & Solutions

### Issue: New sections not appearing
**Solution**: Check that:
1. Mode is set to "Pet Sitter" (for extended sections)
2. Pet data includes values for those fields
3. Values are not empty strings or null

### Issue: Mode switcher not visible
**Solution**: Check that you're on the preview page, not the create page

### Issue: Styling looks off
**Solution**: Clear browser cache and refresh

## Next Steps After Testing

Once visual testing is complete:

1. **Database Migration** - Add new columns to `pets` table
2. **Update Create Form** - Add input fields for all new data
3. **Update Edit Form** - Enable editing of new fields
4. **Update `lib/pets.ts`** - Handle new fields in data conversion
5. **Integration Testing** - Full end-to-end test with database

## Manual Database Testing (Advanced)

If you want to test with real database data:

```sql
-- Add one test field to an existing pet (example)
UPDATE pets 
SET 
  food_type = 'Royal Canin Adult Dry Food',
  feeding_schedule = '7:00 AM and 6:00 PM'
WHERE id = 'YOUR_PET_ID';
```

Then reload the preview page to see those fields appear.

## Report Issues

If you find any visual bugs or layout issues:
1. Note which section has the issue
2. Note which mode (Rental or Pet Sitter)
3. Note screen size/device
4. Take screenshot if helpful

---

**Happy Testing!** 🐾

The resume system is now ready to capture comprehensive pet information for both rental applications and pet care scenarios.

