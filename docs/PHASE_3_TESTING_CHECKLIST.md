# Phase 3 Testing Checklist

**Version:** 1.0  
**Date:** November 13, 2025  
**Status:** Ready for Testing

Use this checklist to verify Phase 3 implementation is working correctly.

---

## ⚙️ Prerequisites

Before testing, ensure:

- [ ] **Supabase project is set up** (Phase 1)
- [ ] **Authentication is working** (Phase 2)
- [ ] **Storage buckets are created**
  - [ ] `pet-photos` bucket exists and is public
  - [ ] Storage policies are configured
  - [ ] See `SUPABASE_STORAGE_SETUP.md` for instructions
- [ ] **Environment variables are set**
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` is correct
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- [ ] **Development server is running**
  - [ ] Run `npm run dev`
  - [ ] App loads at `http://localhost:3000`

---

## 🧪 Test Suite

### Test 1: Initial Dashboard View
**Objective:** Verify dashboard loads and shows empty state for new users

**Steps:**
1. [ ] Log in with a new user account
2. [ ] Navigate to `/dashboard`
3. [ ] Observe the page loads

**Expected Results:**
- [ ] ✅ Dashboard loads without errors
- [ ] ✅ Shows "No Pets Yet!" empty state
- [ ] ✅ Shows "Create First Pet Resume" button
- [ ] ✅ Header shows user email
- [ ] ✅ Account settings button is visible

**Console Logs:**
```
[Dashboard] ✅ User authenticated: {...}
[Dashboard] Fetching pets for user: {...}
[Dashboard] ✅ Fetched pets: 0
```

---

### Test 2: Create First Pet
**Objective:** Verify pet creation flow works end-to-end

**Steps:**
1. [ ] From dashboard, click "Add New Pet" or "Create First Pet Resume"
2. [ ] Fill in required fields:
   - [ ] Pet name: "Buddy"
   - [ ] Species: Dog
   - [ ] Breed: "Golden Retriever"
   - [ ] Age: 3 years
   - [ ] Upload photo (< 5MB)
   - [ ] Microchip number: "123456789"
   - [ ] Check "Desexed"
   - [ ] Check "Vaccinations up to date"
   - [ ] Temperament: "Friendly and calm"
   - [ ] Living location: Indoors
   - [ ] Noise level: Low
   - [ ] House training: Fully house-trained
3. [ ] Click "Save & Preview Resume"
4. [ ] Wait for save to complete

**Expected Results:**
- [ ] ✅ Form auto-saves to localStorage (see "Saved" indicator)
- [ ] ✅ Photo upload shows preview
- [ ] ✅ No validation errors
- [ ] ✅ Button shows "Saving..." during upload
- [ ] ✅ Redirects to preview page with petId in URL
- [ ] ✅ Preview page shows all pet data correctly
- [ ] ✅ Photo is visible and loads from Supabase

**Console Logs:**
```
[Form] Form submitted, validating...
[Form] Validation passed, saving to database...
[Form] Uploading photo to storage...
[Storage] Photo uploaded successfully
[Form] Creating new pet...
[Form] ✅ Pet created successfully: {id}
```

---

### Test 3: Dashboard Shows Pet
**Objective:** Verify pet appears in dashboard after creation

**Steps:**
1. [ ] Navigate back to `/dashboard`
2. [ ] Observe the pet list

**Expected Results:**
- [ ] ✅ Pet card appears in grid
- [ ] ✅ Shows pet photo
- [ ] ✅ Shows pet name ("Buddy")
- [ ] ✅ Shows breed ("Golden Retriever")
- [ ] ✅ Shows age ("3 years old")
- [ ] ✅ Has 4 action buttons: View, Edit, Duplicate, Delete

**Console Logs:**
```
[Dashboard] Fetching pets for user: {...}
[Dashboard] ✅ Fetched pets: 1
```

---

### Test 4: View Pet Resume
**Objective:** Verify preview page loads pet from database

**Steps:**
1. [ ] From dashboard, click "View" button on pet card
2. [ ] Observe the preview page

**Expected Results:**
- [ ] ✅ URL includes `?petId={uuid}`
- [ ] ✅ Preview page loads
- [ ] ✅ All pet data displays correctly
- [ ] ✅ Photo loads from Supabase Storage
- [ ] ✅ "Edit" button is visible
- [ ] ✅ "Dashboard" button is visible
- [ ] ✅ "Print / Save PDF" button works

**Console Logs:**
```
[Preview] Loading pet from database: {petId}
[Preview] ✅ Pet loaded successfully
```

---

### Test 5: Edit Existing Pet
**Objective:** Verify edit mode loads and updates pet

**Steps:**
1. [ ] From dashboard, click "Edit" button on pet card
2. [ ] Observe form loads with existing data
3. [ ] Change pet name to "Buddy Jr."
4. [ ] Click "Update Pet"
5. [ ] Wait for update to complete

**Expected Results:**
- [ ] ✅ URL includes `?petId={uuid}`
- [ ] ✅ Form title says "Edit Pet Resume"
- [ ] ✅ All fields are pre-populated with existing data
- [ ] ✅ Photo shows existing photo
- [ ] ✅ Submit button says "Update Pet"
- [ ] ✅ Update saves successfully
- [ ] ✅ Redirects to preview with updated data
- [ ] ✅ Dashboard shows updated name

**Console Logs:**
```
[Form] Edit mode - loading pet from database: {petId}
[Form] ✅ Pet loaded successfully
[Form] Updating existing pet: {petId}
[Form] ✅ Pet updated successfully
```

---

### Test 6: Duplicate Pet
**Objective:** Verify duplicate creates copy of pet

**Steps:**
1. [ ] From dashboard, click duplicate button (📋) on pet card
2. [ ] Wait for duplication to complete
3. [ ] Observe dashboard

**Expected Results:**
- [ ] ✅ New pet card appears
- [ ] ✅ New pet name is "Copy of Buddy Jr."
- [ ] ✅ All other data is identical to original
- [ ] ✅ Photo is the same (same URL)
- [ ] ✅ Dashboard shows 2 pets total

**Console Logs:**
```
[Dashboard] Duplicating pet: {petId}
[Dashboard] ✅ Pet duplicated successfully
```

---

### Test 7: Delete Pet
**Objective:** Verify delete removes pet with confirmation

**Steps:**
1. [ ] From dashboard, click delete button (🗑️) on "Copy of Buddy Jr."
2. [ ] Observe confirmation dialog appears
3. [ ] Click "Yes, Delete"
4. [ ] Wait for deletion to complete

**Expected Results:**
- [ ] ✅ Confirmation dialog shows: "Delete Copy of Buddy Jr.?"
- [ ] ✅ Has "Yes, Delete" and "Cancel" buttons
- [ ] ✅ After clicking "Yes, Delete":
   - [ ] Button shows "Deleting..."
   - [ ] Pet card disappears from grid
   - [ ] Dashboard shows 1 pet remaining
- [ ] ✅ No errors in console

**Console Logs:**
```
[Dashboard] Deleting pet: {petId}
[Dashboard] ✅ Pet deleted successfully
```

**Cancel Test:**
1. [ ] Click delete on a pet
2. [ ] Click "Cancel"
3. [ ] Pet remains in list (not deleted)

---

### Test 8: Create Multiple Pets
**Objective:** Verify multiple pets can be managed

**Steps:**
1. [ ] Create 5 different pets with varying data:
   - [ ] Dog: "Max" (German Shepherd)
   - [ ] Cat: "Whiskers" (Siamese)
   - [ ] Cat: "Luna" (Domestic Shorthair)
   - [ ] Dog: "Charlie" (Labrador)
   - [ ] Rabbit: "Flopsy" (Holland Lop)
2. [ ] Go to dashboard
3. [ ] Verify all 6 pets display (including original "Buddy Jr.")

**Expected Results:**
- [ ] ✅ All 6 pets appear in grid
- [ ] ✅ Grid is responsive (3 columns on desktop, 2 on tablet, 1 on mobile)
- [ ] ✅ Each pet shows correct photo, name, breed, age
- [ ] ✅ All action buttons work on each pet
- [ ] ✅ No performance issues with 6 pets

---

### Test 9: Photo Upload Edge Cases
**Objective:** Test various photo upload scenarios

**Test 9a: Large File (> 5MB)**
1. [ ] Try to upload a file > 5MB
2. [ ] **Expected:** Alert shows "File too large! Please choose a file smaller than 5MB."

**Test 9b: Non-Image File**
1. [ ] Try to upload a PDF or text file
2. [ ] **Expected:** File picker only shows images (or shows error)

**Test 9c: Very Small Image**
1. [ ] Upload a 100x100px image
2. [ ] **Expected:** Image uploads and displays correctly

**Test 9d: High-Resolution Photo**
1. [ ] Upload a 4000x3000px photo (< 5MB)
2. [ ] **Expected:** 
   - [ ] Photo compresses to ~1200px width
   - [ ] File size reduces significantly
   - [ ] Console shows compression ratio
   - [ ] Upload succeeds

---

### Test 10: Multi-Device Sync
**Objective:** Verify data syncs across devices

**Steps:**
1. [ ] Log in on Device 1 (e.g., laptop)
2. [ ] Create a pet named "Test Device Sync"
3. [ ] Log in with same account on Device 2 (e.g., phone)
4. [ ] Navigate to dashboard

**Expected Results:**
- [ ] ✅ "Test Device Sync" pet appears on Device 2
- [ ] ✅ All data is identical
- [ ] ✅ Photo loads correctly on Device 2
- [ ] ✅ Edit on Device 2 reflects on Device 1 (after refresh)

---

### Test 11: Print/PDF Generation
**Objective:** Verify print functionality works

**Steps:**
1. [ ] View any pet resume
2. [ ] Click "Print / Save PDF"
3. [ ] Observe print dialog

**Expected Results:**
- [ ] ✅ Browser print dialog opens
- [ ] ✅ Print preview shows:
   - [ ] Pet photo
   - [ ] Pet name and info
   - [ ] All sections (Key Facts, Behaviour, etc.)
   - [ ] Footer with Pawthenticate branding
- [ ] ✅ No navigation buttons in print preview
- [ ] ✅ Layout is A4-optimized
- [ ] ✅ Can save as PDF successfully

---

### Test 12: Error Handling
**Objective:** Test app behavior with errors

**Test 12a: Load Non-Existent Pet**
1. [ ] Navigate to `/preview?petId=invalid-uuid`
2. [ ] **Expected:**
   - [ ] Shows error message
   - [ ] Redirects to dashboard after 3 seconds

**Test 12b: Load Pet from Another User**
1. [ ] Copy a pet ID from User A
2. [ ] Log in as User B
3. [ ] Navigate to `/preview?petId={user_a_pet_id}`
4. [ ] **Expected:**
   - [ ] Shows "Failed to load pet" error
   - [ ] Redirects to dashboard
   - [ ] User B cannot see User A's pet

**Test 12c: Network Offline**
1. [ ] Open DevTools → Network
2. [ ] Set throttling to "Offline"
3. [ ] Try to save a pet
4. [ ] **Expected:**
   - [ ] Shows "Network error" or timeout
   - [ ] User-friendly error message

---

### Test 13: Validation & Edge Cases
**Objective:** Test form validation

**Test 13a: Submit Empty Form**
1. [ ] Go to create page
2. [ ] Click submit without filling anything
3. [ ] **Expected:**
   - [ ] Validation errors appear
   - [ ] Red borders on invalid fields
   - [ ] Scrolls to first error
   - [ ] Does not save

**Test 13b: Invalid Microchip Number**
1. [ ] Fill form but leave microchip number empty
2. [ ] Click submit
3. [ ] **Expected:**
   - [ ] Error: "Please enter your pet's microchip number"
   - [ ] Does not save

**Test 13c: Date of Birth in Future**
1. [ ] Select DOB as tomorrow's date
2. [ ] Click submit
3. [ ] **Expected:**
   - [ ] Error: "Date of birth cannot be in the future"
   - [ ] Does not save

---

### Test 14: Browser Compatibility
**Objective:** Test on different browsers

**Test on Chrome:**
- [ ] ✅ All features work
- [ ] ✅ Photo upload works
- [ ] ✅ Print works

**Test on Firefox:**
- [ ] ✅ All features work
- [ ] ✅ Photo upload works
- [ ] ✅ Print works

**Test on Safari (if available):**
- [ ] ✅ All features work
- [ ] ✅ Photo upload works
- [ ] ✅ Print works

**Test on Mobile Chrome:**
- [ ] ✅ Responsive layout works
- [ ] ✅ Photo upload from camera works
- [ ] ✅ All buttons are tap-friendly (≥44px)

---

### Test 15: Performance & UX
**Objective:** Ensure good user experience

**Load Times:**
- [ ] ✅ Dashboard loads in < 2 seconds
- [ ] ✅ Preview loads in < 1 second
- [ ] ✅ Photo upload completes in < 5 seconds

**Animations:**
- [ ] ✅ Loading spinners show during operations
- [ ] ✅ Hover effects work on buttons
- [ ] ✅ Transitions are smooth

**Feedback:**
- [ ] ✅ Save button shows "Saving..." state
- [ ] ✅ Success/error messages appear
- [ ] ✅ Console logs are helpful for debugging

---

## ✅ Final Checklist

After completing all tests:

- [ ] **All 15 test cases passed**
- [ ] **No console errors** (warnings are OK)
- [ ] **Storage buckets are configured**
- [ ] **RLS policies are working**
- [ ] **Photos upload and display correctly**
- [ ] **Multi-pet CRUD operations work**
- [ ] **Cross-device sync works**
- [ ] **Print/PDF works**
- [ ] **Responsive on mobile**
- [ ] **Error handling is user-friendly**

---

## 🐛 Known Issues Log

Document any issues found during testing:

| Issue # | Description | Severity | Status |
|---------|-------------|----------|--------|
| Example | Photo doesn't load on iOS Safari | Medium | Open |

---

## 📊 Test Results Summary

**Date Tested:** _____________  
**Tester:** _____________  
**Environment:** _____________

**Results:**
- Tests Passed: ___ / 15
- Tests Failed: ___ / 15
- Bugs Found: ___
- Critical Bugs: ___

**Overall Status:** ⬜ PASS | ⬜ PASS WITH ISSUES | ⬜ FAIL

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

**Next Steps After Testing:**
1. ✅ Fix any critical bugs
2. ✅ Document known limitations
3. ✅ Prepare for Phase 4: Template System
4. 🎉 Celebrate successful Phase 3 implementation!

---

**Last Updated:** November 13, 2025  
**Version:** 1.0  
**Phase:** 3 - Multi-Pet Management

