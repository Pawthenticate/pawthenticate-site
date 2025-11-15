-- =====================================================
-- Setup Document Storage Bucket for Pawthenticate
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to create
-- the pet-documents storage bucket and policies
-- =====================================================

-- Step 1: Create the pet-documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pet-documents',
  'pet-documents',
  true,  -- Public bucket (so landlords can view certificates)
  5242880,  -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Apply Storage Policies

-- Policy 1: Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload their own pet documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pet-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy 2: Allow authenticated users to update their own documents
CREATE POLICY "Users can update their own pet documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'pet-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy 3: Allow authenticated users to delete their own documents
CREATE POLICY "Users can delete their own pet documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'pet-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy 4: Allow everyone (including landlords) to view documents
CREATE POLICY "Anyone can view pet documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pet-documents');

-- =====================================================
-- Verification Query
-- =====================================================
-- Run this to verify the bucket was created:

SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE name = 'pet-documents';

-- Expected output:
-- id: pet-documents
-- name: pet-documents
-- public: true
-- file_size_limit: 5242880
-- allowed_mime_types: {image/jpeg, image/png, ...}

-- =====================================================
-- Check Policies
-- =====================================================
-- Run this to verify policies were created:

SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%pet documents%';

-- Expected: 4 policies (INSERT, UPDATE, DELETE, SELECT)

-- =====================================================
-- ✅ Setup Complete!
-- =====================================================
-- After running this script:
-- 1. Refresh your app (Ctrl+R or Cmd+R)
-- 2. Try uploading documents again
-- 3. They should now upload successfully! 🎉
-- =====================================================


