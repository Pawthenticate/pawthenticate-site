# Supabase Storage Setup Guide

**Required for:** Phase 3 - Multi-Pet Management  
**Time to Complete:** 5-10 minutes

---

## 📦 Overview

Phase 3 requires two Supabase Storage buckets to store pet photos and documents. This guide walks you through creating and configuring these buckets.

---

## 🪣 Step 1: Create Storage Buckets

### Option A: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Navigate to Storage**
   - Click "Storage" in the left sidebar
   - Click "Buckets" tab

3. **Create "pet-photos" Bucket**
   - Click "New bucket" button
   - **Bucket name:** `pet-photos`
   - **Public bucket:** ✅ **Check this box**
   - **File size limit:** `5` MB (5242880 bytes)
   - **Allowed MIME types:** Leave blank or add `image/*`
   - Click "Create bucket"

4. **Create "pet-documents" Bucket** (Optional - for future use)
   - Click "New bucket" button again
   - **Bucket name:** `pet-documents`
   - **Public bucket:** ✅ **Check this box**
   - **File size limit:** `5` MB (5242880 bytes)
   - **Allowed MIME types:** `image/*,application/pdf`
   - Click "Create bucket"

### Option B: Using SQL (Advanced)

Run this SQL in the Supabase SQL Editor:

```sql
-- Create pet-photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-photos', 'pet-photos', true);

-- Create pet-documents bucket (optional)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-documents', 'pet-documents', true);
```

---

## 🔐 Step 2: Configure Storage Policies

### Why Policies Are Needed

Storage policies control who can upload, view, update, and delete files. We need:
- Users can only upload files to their own folders
- Users can only delete their own files
- Everyone can view files (public bucket)

### Apply Policies

Go to **Storage > Policies** in Supabase Dashboard and apply these policies:

#### For `pet-photos` Bucket

**1. Allow Users to Upload Their Own Files**
```sql
CREATE POLICY "Users can upload their own pet photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'pet-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**2. Allow Users to Update Their Own Files**
```sql
CREATE POLICY "Users can update their own pet photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'pet-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**3. Allow Users to Delete Their Own Files**
```sql
CREATE POLICY "Users can delete their own pet photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'pet-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**4. Allow Public Read Access**
```sql
CREATE POLICY "Anyone can view pet photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'pet-photos');
```

#### For `pet-documents` Bucket (Optional)

Repeat the same policies, but replace `'pet-photos'` with `'pet-documents'`.

---

## ✅ Step 3: Verify Setup

### Using the App

1. **Test Photo Upload**
   - Log in to Pawthenticate
   - Go to "Create Pet Resume"
   - Upload a pet photo
   - Click "Save & Preview Resume"
   - ✅ **Expected:** Photo uploads successfully, preview shows photo

2. **Check Console Logs**
   - Open browser DevTools (F12)
   - Look for `[Storage]` logs
   - ✅ **Expected:** Success messages like:
     ```
     [Storage] Photo uploaded successfully
     [Storage] Public URL: https://...
     ```

### Using Supabase Dashboard

1. **Check Storage Contents**
   - Go to Storage > Buckets
   - Click "pet-photos"
   - ✅ **Expected:** See folder structure like `{user_id}/{filename}.jpg`

2. **Test Public URL**
   - Click any uploaded file
   - Click "Get public URL"
   - Open URL in new tab
   - ✅ **Expected:** Image loads publicly

---

## 🐛 Troubleshooting

### Issue 1: "Storage service unavailable"

**Cause:** Buckets not created

**Solution:**
1. Check if `pet-photos` bucket exists in dashboard
2. Create bucket following Step 1
3. Refresh app and try again

### Issue 2: "Failed to upload photo: permission denied"

**Cause:** Storage policies not configured

**Solution:**
1. Go to Storage > Policies
2. Apply all 4 policies from Step 2
3. Make sure `auth.uid()` is not null (user must be logged in)

### Issue 3: "403 Forbidden" when viewing photo

**Cause:** Bucket is not public or missing SELECT policy

**Solution:**
1. Go to Storage > Buckets
2. Edit `pet-photos` bucket
3. Check "Public bucket" option
4. Apply "Anyone can view pet photos" policy

### Issue 4: Photos not showing in preview

**Cause:** Public URL not accessible

**Solution:**
1. Check bucket is public
2. Verify SELECT policy exists
3. Check photo URL in console logs
4. Try accessing URL directly in browser

---

## 🔍 Debugging Tips

### Check Bucket Configuration

Run this SQL to see bucket settings:

```sql
SELECT * FROM storage.buckets WHERE name IN ('pet-photos', 'pet-documents');
```

Expected output:
```
id           | name          | public
-------------|---------------|--------
pet-photos   | pet-photos    | true
pet-documents| pet-documents | true
```

### Check Storage Policies

Run this SQL to see active policies:

```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';
```

You should see at least 4 policies for pet-photos.

### Test Upload Permissions

In the app console, run:

```javascript
// Check if storage buckets exist
import { checkStorageBuckets } from '@/lib/petStorage';
const result = await checkStorageBuckets();
console.log(result);
```

Expected output:
```javascript
{
  success: true,
  data: {
    petPhotos: true,
    petDocuments: true
  }
}
```

---

## 📁 File Structure

After uploading files, your storage will look like this:

```
pet-photos/
├── {user_id_1}/
│   ├── {pet_id_1}_1234567890.jpg
│   ├── {pet_id_2}_1234567891.jpg
│   └── temp_1234567892.jpg (temporary uploads)
├── {user_id_2}/
│   └── {pet_id_3}_1234567893.jpg
└── ...

pet-documents/ (optional)
├── {user_id_1}/
│   └── {pet_id_1}/
│       ├── vaccination_1234567890.pdf
│       ├── desexing_1234567891.pdf
│       └── microchip_1234567892.pdf
└── ...
```

**Path Format:**
- Photos: `{user_id}/{pet_id}_{timestamp}.jpg`
- Documents: `{user_id}/{pet_id}/{type}_{timestamp}.pdf`

---

## 🚀 Next Steps

After setting up storage:

1. ✅ **Test the app** - Upload photos and verify they work
2. ✅ **Check dashboard** - View files in Supabase Storage
3. ✅ **Monitor usage** - Keep an eye on storage quota
4. 🔜 **Phase 4** - Ready for template system implementation

---

## 📊 Storage Quotas (Supabase Free Tier)

- **Storage:** 1GB total
- **Bandwidth:** 2GB/month
- **File size limit:** Set to 5MB in app
- **Number of files:** Unlimited

**Tip:** Average compressed pet photo is ~100KB, so you can store ~10,000 photos on free tier.

---

## 💡 Advanced Configuration (Optional)

### Enable Automatic Image Transformation

Supabase can automatically resize/optimize images:

```javascript
const { data } = supabase.storage
  .from('pet-photos')
  .getPublicUrl(filePath, {
    transform: {
      width: 800,
      height: 800,
      resize: 'cover',
      quality: 80
    }
  });
```

### Set Up Storage Webhooks

Get notified when files are uploaded:

1. Go to Database > Webhooks
2. Create webhook for `storage.objects` table
3. Listen for INSERT events
4. Send to your endpoint for processing

---

**Last Updated:** November 13, 2025  
**For Phase:** 3 - Multi-Pet Management  
**Status:** ✅ Required Setup

