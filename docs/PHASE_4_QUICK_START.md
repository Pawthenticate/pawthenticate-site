# Phase 4 Quick Start Guide

**🎉 Phase 4 is complete! Here's how to test it.**

---

## ⚡ Quick Test (5 minutes)

### Already Working (No Setup Needed)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open any pet preview:**
   - Go to Dashboard
   - Click "View" on any pet
   - You'll see the preview page

3. **Test template switcher:**
   - Look for "Resume Type:" toggle at the top
   - Click "🏠 Rental" - See landlord-focused resume
   - Click "🐾 Pet Sitter" - See complete care instructions
   - Watch the content change instantly!

4. **Test dynamic filename:**
   - Click "Print / Save PDF"
   - Look at the filename in print dialog
   - Should be: `PetName_Rental_Resume_2024-11-14.pdf`
   - Switch to Pet Sitter mode
   - Print again - filename updates to `PetName_PetSitter_Resume_...`

✅ **That's it!** These features work immediately.

---

## 🗄️ Database Migration (15 minutes)

To enable **template preference persistence**, run the migration:

### Step 1: Open Supabase

1. Go to https://supabase.com
2. Select your Pawthenticate project
3. Navigate to **SQL Editor** in the left menu

### Step 2: Run Migration

1. Click **"New query"**
2. Open `DATABASE_MIGRATION_TEMPLATE_PREFERENCE.sql` in your editor
3. Copy the entire contents
4. Paste into Supabase SQL Editor
5. Click **"Run"**
6. ✅ Should see "Success. No rows returned"

### Step 3: Verify

Run this verification query:
```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'pets' AND column_name = 'preferred_template';
```

Expected result:
```
column_name       | data_type | column_default
preferred_template| text      | 'rental'::text
```

✅ **Migration complete!**

---

## 🧪 Test Template Preference Persistence

Now that migration is done, test the new feature:

### Test Scenario

1. **Edit any pet** (from dashboard, click Edit)
2. **Save and go to preview**
3. **Switch to Pet Sitter mode** (click "🐾 Pet Sitter")
4. **Check console:** Should see `✅ Template preference saved: pet_sitter`
5. **Go back to dashboard**
6. **View the same pet again**
7. **Verify:** Preview should open in Pet Sitter mode (not Rental)
8. **Success!** The preference was saved and restored

### What to Look For

**Browser Console Messages:**
```
[Preview] 📋 Loading saved template preference: pet_sitter
[Preview] 🎯 RESUME MODE CHANGED TO: pet_sitter
[Preview] ✅ Template preference saved: pet_sitter
```

**Visual Confirmation:**
- Pet Sitter button is highlighted (white background)
- Extended sections are visible (Feeding, Health, Daily Routine, etc.)
- Resume says "🐾 Pet Sitter / Boarding Resume" at the top

---

## 🖨️ Test A4 Print Optimization

### Desktop Testing

1. **Open preview page**
2. **Click "Print / Save PDF"**
3. **In print preview:**
   - Content should fit within margins
   - No horizontal scrolling
   - Text readable, not too small
   - Sections well-spaced
4. **Change settings:**
   - Paper size: A4
   - Margins: Default
   - Scale: 100%
5. **Save as PDF**
6. **Open PDF and verify quality**

### What to Check

✅ **Good signs:**
- Professional appearance
- Content centered on page
- No cutoff text or images
- Multi-page flow is smooth (Pet Sitter mode)
- Gradients and colors print correctly

❌ **Issues to watch for:**
- Content too wide (overflow)
- Text too small or large
- Awkward page breaks
- Missing colors/backgrounds

**Solution if issues:**
- Check browser print settings (must be A4, not Letter)
- Try different browser (Chrome recommended)
- Verify CSS loaded correctly (hard refresh)

---

## 🎯 Full Feature Checklist

Copy this checklist and test each item:

### Basic Functionality
- [ ] Template switcher UI displays at top of preview
- [ ] Rental mode button works (shows landlord-focused content)
- [ ] Pet Sitter mode button works (shows all extended fields)
- [ ] Mode indicator shows current template name
- [ ] Content updates instantly when switching (no page reload)

### Dynamic Filename
- [ ] Print dialog shows pet name in filename
- [ ] Filename includes template mode (Rental or PetSitter)
- [ ] Filename includes current date (YYYY-MM-DD)
- [ ] Filename updates when switching modes

### Template Preference (After Migration)
- [ ] Switch to Pet Sitter mode → Console confirms save
- [ ] Navigate away and come back → Preference restored
- [ ] Different pets can have different preferences
- [ ] Default is Rental mode for new pets

### A4 Print Output
- [ ] Print preview looks professional
- [ ] Content fits within page boundaries
- [ ] Headers and footers display correctly
- [ ] Multi-page PDFs flow naturally
- [ ] Colors and gradients print correctly

### Cross-Browser Testing
- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Mobile-responsive toggle buttons

---

## 🐛 Common Issues & Fixes

### Issue: "Template preference not saving"

**Console shows:** `⚠️ Failed to save template preference`

**Fix:**
1. Verify migration was run successfully
2. Check you're logged in (authentication required)
3. Verify you're editing a saved pet (has petId)

### Issue: "Opens in wrong mode"

**Symptom:** Always opens in Rental mode even after saving preference

**Fix:**
1. Check browser console for preference loading log
2. Verify database has correct value:
   ```sql
   SELECT pet_name, preferred_template FROM pets;
   ```
3. Hard refresh page (Ctrl+Shift+R)
4. Try re-saving preference

### Issue: "PDF filename is generic"

**Symptom:** Shows "Untitled" or browser default filename

**Fix:**
1. Check console for: `📄 PDF filename set to:`
2. Verify pet has a name (petName field populated)
3. Try different browser (Chrome works best)
4. Some browsers ignore document.title - this is expected

### Issue: "Print layout looks wrong"

**Symptom:** Content cutoff, wrong size, or poor formatting

**Fix:**
1. **Change print settings:**
   - Paper size: A4 (not Letter!)
   - Margins: Default
   - Scale: 100%
   - Background graphics: On
2. **Try different browser** (Chrome recommended)
3. **Clear cache** and hard refresh

---

## 📞 Need Help?

1. **Check console logs** - All operations log detailed messages
2. **Read error messages** - They're designed to be helpful
3. **Review documentation:**
   - `PHASE_4_IMPLEMENTATION_SUMMARY.md` - Technical details
   - `DATABASE_MIGRATION_TEMPLATE_PREFERENCE.sql` - Migration code
4. **Common issues are usually:**
   - Migration not run (95% of issues)
   - Wrong browser print settings
   - Cache not cleared

---

## 🎊 Congratulations!

If all tests pass, **Phase 4 is working perfectly!** 

You now have:
- ✅ Two professional resume templates
- ✅ Instant template switching
- ✅ Smart PDF filenames
- ✅ Persistent user preferences
- ✅ A4-optimized print output

**Ready for Phase 5?** Enhanced PDF generation with more features!

---

**Quick Start Guide**  
**Version:** 1.0  
**Updated:** November 14, 2025  
**Status:** Phase 4 Complete ✅

