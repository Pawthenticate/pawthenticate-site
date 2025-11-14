# 🚨 CRITICAL: Database Migration Required

## The Problem
Your documents are uploading to storage successfully, but the database columns to store the URLs **don't exist yet**. This is why documents show as `undefined` in the preview.

## The Solution
Run the SQL migration to add the missing columns.

---

## 📋 Step-by-Step Instructions

### 1. Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: **Pawthenticate** (yzpbcjxpnflxehybndko)

### 2. Open SQL Editor
1. Click **SQL Editor** in the left sidebar
2. Click **New Query** button

### 3. Copy and Run the Migration
1. Open the file: `DATABASE_MIGRATION_DOCUMENT_FIELDS.sql`
2. Copy lines **14-24** (the ALTER TABLE and COMMENT statements)
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter / Cmd+Enter)

### 4. Verify the Migration
1. In the same SQL Editor, paste the verification query (lines **31-39** from the migration file)
2. Click **Run**
3. You should see:
   ```
   column_name              | data_type | is_nullable | column_default
   ------------------------|-----------|-------------|---------------
   desexing_certificate    | text      | YES         | NULL
   vaccination_certificate | text      | YES         | NULL
   ```

---

## ✅ After Running the Migration

1. **No need to refresh or restart** - Supabase changes are instant
2. **Go back to your app** at http://localhost:3000/create
3. **Upload the documents again** (vaccination and desexing certificates)
4. **Click "Save & Continue to Preview"**
5. **Check the preview page** - documents should now display! 🎉

---

## 📝 What This Migration Does

Adds two new columns to your `pets` table:
- `vaccination_certificate` (TEXT) - stores the public URL of the vaccination certificate
- `desexing_certificate` (TEXT) - stores the public URL of the desexing certificate

---

## 🔍 Expected Console Logs After Migration

When you upload and save again, you'll see:
```
[Form] 📄 Document data being saved: {
  vaccinationCert: 'https://...', 
  desexingCert: 'https://...', 
  vaccinationType: 'string', 
  desexingType: 'string'
}
[Form] ✅ Pet updated successfully
```

And in the preview:
```
[Preview] 📄 Documents loaded from database: {
  vaccinationCert: 'https://...', 
  vaccinationType: 'string', 
  desexingCert: 'https://...', 
  desexingType: 'string'
}
[Preview] 📄 Total documents to display: 2  ← Should be 2 now!
```

---

## ⚠️ Important Notes

- This migration is **safe** - it only adds columns, doesn't modify existing data
- The `IF NOT EXISTS` clause means it won't error if columns already exist
- This is a one-time migration
- All your existing pet data will remain unchanged

---

## 🆘 If You Have Issues

1. Make sure you're running the SQL in the correct project
2. Check that your user has permission to alter tables
3. If columns already exist, the migration will skip them (no error)
4. Share any error messages and I'll help troubleshoot

---

## 🎯 Quick Copy-Paste (Just the SQL)

```sql
-- Add vaccination_certificate column (TEXT to store public URL)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS vaccination_certificate TEXT DEFAULT NULL;

-- Add desexing_certificate column (TEXT to store public URL)
ALTER TABLE public.pets
ADD COLUMN IF NOT EXISTS desexing_certificate TEXT DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.pets.vaccination_certificate IS 'Vaccination certificate public URL from Supabase Storage';
COMMENT ON COLUMN public.pets.desexing_certificate IS 'Desexing certificate public URL from Supabase Storage';
```

---

✨ **That's it!** Once you run this migration, your document uploads will persist to the database and display in the preview.


