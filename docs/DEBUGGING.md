# 🐛 Debugging Guide for Pawthenticate

This guide helps you debug common issues in the Pawthenticate app.

## 🔍 Console Logging System

The app includes comprehensive console logging to help track down bugs. All logs are prefixed for easy filtering.

### Log Prefixes

- **`[Pawthenticate Storage <timestamp>]`** - localStorage operations
- **`[Form]`** - Form state changes and user interactions
- **`[Preview]`** - Preview page data loading and rendering

### How to Use Console Logs

1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to the "Console" tab
3. Filter by typing the prefix (e.g., `[Form]`)

### Example Console Output

```
[Pawthenticate Storage 2024-11-13T10:30:45.123Z] savePetData success: Pet data saved successfully
[Form] Field updated: petName Buddy
[Form] Auto-saving form data...
[Preview] Loading pet data...
[Preview] Pet data loaded successfully
```

## 🚨 Common Errors & Solutions

### Error: "localStorage not available"

**Symptoms:**
- Form data doesn't save
- Console shows: `localStorage not available`

**Causes:**
1. Browser in private/incognito mode
2. Browser security settings blocking localStorage
3. Site data cleared while app is open

**Solutions:**
1. Exit private browsing mode
2. Check browser security settings (allow cookies/site data)
3. Refresh the page

**Debug Steps:**
```javascript
// Open browser console and run:
console.log(localStorage);
// If it throws an error, localStorage is blocked
```

---

### Error: "Quota exceeded"

**Symptoms:**
- File upload fails
- Console shows: `localStorage quota exceeded`

**Causes:**
1. Files too large (especially photos)
2. Multiple large documents uploaded
3. localStorage limit reached (usually 5-10MB)

**Solutions:**
1. Compress photos before uploading (use online tools)
2. Limit file sizes to < 2MB each
3. Clear old data from localStorage

**Debug Steps:**
```javascript
// Check current storage usage (in browser console):
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length;
  }
}
console.log(`Total localStorage: ${(total / 1024).toFixed(2)} KB`);
```

---

### Error: Form data disappears after refresh

**Symptoms:**
- Fill form, refresh page, data is gone
- Console shows: `No saved data found`

**Causes:**
1. localStorage disabled (see above)
2. Browser cleared site data
3. Different browser/device being used
4. Auto-save failed silently

**Solutions:**
1. Check auto-save indicator in top-right (should show "✓ Saved")
2. Verify localStorage is working (see localStorage availability check above)
3. Don't clear browser data while using the app

**Debug Steps:**
```javascript
// Check if data exists in localStorage (browser console):
console.log(localStorage.getItem('pawthenticate_pet_data'));
// Should show JSON string with your pet data
```

---

### Error: Images not displaying on preview

**Symptoms:**
- Preview page shows no pet photo
- Broken image icon appears

**Causes:**
1. Image upload failed
2. Image data corrupted in localStorage
3. Browser doesn't support image format

**Solutions:**
1. Try uploading a different image
2. Use common formats (JPG, PNG)
3. Ensure image is under 5MB
4. Check console for upload errors

**Debug Steps:**
```javascript
// Check if photo data exists (browser console):
const data = JSON.parse(localStorage.getItem('pawthenticate_pet_data'));
console.log(data.photo ? 'Photo exists' : 'No photo');
console.log(data.photo?.substring(0, 50)); // Show first 50 chars
```

---

### Error: Print layout looks wrong

**Symptoms:**
- PDF doesn't match preview
- UI buttons appear in PDF
- Multiple pages instead of one

**Causes:**
1. Print styles not loading
2. Browser zoom not at 100%
3. Custom page margins in print dialog

**Solutions:**
1. Reset browser zoom to 100% (Ctrl+0)
2. Use "Save as PDF" as printer in print dialog
3. Set margins to "Default" in print dialog
4. Select "Background graphics" option

**Debug Steps:**
1. Open print preview (Ctrl/Cmd + P)
2. Check "More settings" → "Background graphics" should be ON
3. Margins should be set to "Default"
4. Scale should be 100%

---

## 🧪 Testing Scenarios

### Test 1: Basic Form Submission

**Steps:**
1. Go to home page
2. Click "Create Pet Resume"
3. Fill in pet name: "Test Dog"
4. Fill in microchip: "123456789"
5. Fill in temperament: "Friendly and calm"
6. Click "Save & Preview"

**Expected Result:**
- Form saves successfully
- Redirects to preview page
- All data appears correctly

**Debug If Fails:**
- Check console for `[Form]` errors
- Verify auto-save indicator showed "✓ Saved"

---

### Test 2: Auto-Save Functionality

**Steps:**
1. Open form page
2. Type pet name
3. Wait 1 second
4. Check top-right corner

**Expected Result:**
- "💾 Saving..." appears briefly
- Changes to "✓ Saved" after ~500ms

**Debug If Fails:**
- Check console for `[Form] Auto-saving` message
- Check for localStorage errors

---

### Test 3: File Upload

**Steps:**
1. Open form
2. Upload a photo (under 5MB)
3. Wait for preview to appear

**Expected Result:**
- Image preview shows below upload button
- "✓ Photo uploaded" message appears

**Debug If Fails:**
- Check console for file size error
- Verify file is JPG or PNG
- Try smaller file

---

### Test 4: Form Persistence

**Steps:**
1. Fill in form partially
2. Refresh page (F5)
3. Check if data is still there

**Expected Result:**
- All previously entered data appears
- Form fields populated correctly

**Debug If Fails:**
- Run localStorage check (see above)
- Check console for storage errors

---

### Test 5: Print to PDF

**Steps:**
1. Complete form and go to preview
2. Click "Print / Save as PDF"
3. Choose "Save as PDF" as printer
4. Save file

**Expected Result:**
- PDF opens in new tab/window
- Single-page layout
- No UI buttons visible
- Gradient header appears correctly

**Debug If Fails:**
- Check browser zoom (should be 100%)
- Enable "Background graphics" in print dialog
- Try different browser (Chrome works best)

---

## 🔧 Advanced Debugging

### Inspect localStorage Data

Open browser console and run:

```javascript
// Get all pet data
const data = JSON.parse(localStorage.getItem('pawthenticate_pet_data'));
console.table(data); // Shows data in table format

// Check specific fields
console.log('Pet Name:', data.petName);
console.log('Species:', data.species);
console.log('Has Photo:', !!data.photo);
console.log('Has Vaccination Cert:', !!data.vaccinationCertificate);
```

### Clear All Data (Fresh Start)

```javascript
// Clear Pawthenticate data
localStorage.removeItem('pawthenticate_pet_data');
console.log('Data cleared!');
// Refresh page to start fresh
```

### Check Storage Size

```javascript
// Get storage info
const jsonString = localStorage.getItem('pawthenticate_pet_data');
if (jsonString) {
  const sizeKB = (new Blob([jsonString]).size / 1024).toFixed(2);
  console.log(`Current data size: ${sizeKB} KB`);
  console.log(`Estimated remaining: ${(5120 - parseFloat(sizeKB)).toFixed(2)} KB`);
}
```

### Monitor Form Changes

```javascript
// Add this to browser console while on form page
window.addEventListener('input', (e) => {
  console.log('Field changed:', e.target.id || e.target.name);
});
```

---

## 📊 Error Tracking Checklist

When reporting a bug or investigating an issue, gather this info:

- [ ] Browser and version (e.g., Chrome 119)
- [ ] Device type (desktop/mobile)
- [ ] Page where error occurred (home/create/preview)
- [ ] Console error messages (copy full text)
- [ ] Steps to reproduce
- [ ] Screenshot of console logs
- [ ] localStorage data size (run size check above)
- [ ] Was the user in private browsing mode?

---

## 🛠️ Quick Fixes

### "Nothing is working!"

1. Clear localStorage: `localStorage.clear()`
2. Refresh page (Ctrl + F5 / Cmd + Shift + R)
3. Check console for errors
4. Try different browser

### "Form won't submit!"

1. Check for red error alerts
2. Fill in all required fields (marked with *)
3. Check console for validation errors
4. Try clicking submit again

### "PDF looks weird!"

1. Reset zoom to 100%
2. Use Chrome/Edge browser
3. Enable background graphics in print settings
4. Try "Save as PDF" instead of "Print"

---

## 📞 Getting Help

If you're still stuck:

1. **Check Console First**: 90% of issues show clear errors in console
2. **Try Incognito Mode**: Isolates browser extension issues
3. **Clear Data & Retry**: Fresh start often fixes weird bugs
4. **Check README.md**: Covers common setup issues
5. **File an Issue**: Include console logs and steps to reproduce

---

**Remember**: The app logs everything to the console to help you debug!
Press F12 and check the Console tab whenever something seems wrong.

