# Supabase Setup Guide

This guide will walk you through setting up Supabase for Pawthenticate (Phases 1 & 2).

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in with GitHub
4. Click "New Project"
5. Fill in:
   - **Project Name:** pawthenticate (or your choice)
   - **Database Password:** Generate a strong password (SAVE THIS!)
   - **Region:** Choose closest to you (e.g., Sydney for Australia)
   - **Pricing Plan:** Free tier is perfect for MVP
6. Click "Create new project" (takes ~2 minutes to provision)

## Step 2: Get Your API Keys

1. Once your project is ready, go to **Settings** (⚙️ icon in sidebar)
2. Click on **API** in the left menu
3. You'll see:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** A long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Copy both of these - you'll need them next!

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add the following (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

3. Save the file
4. **IMPORTANT:** This file is already in `.gitignore` - never commit it to git!

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, click on **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic Info
  pet_name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  
  -- Age/DOB
  date_of_birth DATE,
  manual_age NUMERIC,
  manual_age_unit TEXT,
  
  -- Physical
  size TEXT,
  weight_kg NUMERIC,
  photo_url TEXT,
  
  -- Identification & Legal
  microchip_number TEXT NOT NULL,
  council_registration_number TEXT,
  
  -- Health & Safety
  desexed BOOLEAN DEFAULT false NOT NULL,
  vaccinations_up_to_date BOOLEAN DEFAULT false NOT NULL,
  last_flea_worm_treatment_date TEXT,
  has_pet_insurance BOOLEAN DEFAULT false NOT NULL,
  pet_insurance_provider TEXT,
  
  -- Behaviour & Living
  temperament_summary TEXT NOT NULL,
  living_location TEXT NOT NULL,
  good_with TEXT[],
  noise_level TEXT NOT NULL,
  house_training_status TEXT NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create pet_documents table for file attachments
CREATE TABLE IF NOT EXISTS pet_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS pets_user_id_idx ON pets(user_id);
CREATE INDEX IF NOT EXISTS pets_created_at_idx ON pets(created_at DESC);
CREATE INDEX IF NOT EXISTS pet_documents_pet_id_idx ON pet_documents(pet_id);

-- Enable Row Level Security (RLS)
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pets table
CREATE POLICY "Users can view their own pets"
  ON pets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pets"
  ON pets FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for pet_documents table
CREATE POLICY "Users can view documents for their pets"
  ON pet_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_documents.pet_id
      AND pets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert documents for their pets"
  ON pet_documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_documents.pet_id
      AND pets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete documents for their pets"
  ON pet_documents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_documents.pet_id
      AND pets.user_id = auth.uid()
    )
  );

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click **RUN** (or press `Ctrl+Enter`)
5. You should see "Success. No rows returned" - that's perfect!

## Step 5: Configure Authentication

1. Go to **Authentication** in the left sidebar
2. Click on **Providers**
3. Enable **Email** provider (should be enabled by default)
4. Configure settings:
   - **Enable email confirmations:** Toggle ON (recommended)
   - **Enable email signup:** Toggle ON
   - **Minimum password length:** 6 characters
5. Click **Save**

## Step 6: Set Up Storage (for pet photos)

1. Go to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it: `pet-photos`
4. Set **Public bucket:** Toggle ON (so photos can be displayed)
5. Click **Create bucket**

6. Click on the `pet-photos` bucket
7. Click **Policies** tab
8. Add these policies:

**Policy 1 - Allow authenticated users to upload:**
- **Policy name:** "Users can upload pet photos"
- **Allowed operation:** INSERT
- **Policy definition:**
```sql
(auth.uid() IS NOT NULL)
```

**Policy 2 - Allow public read access:**
- **Policy name:** "Anyone can view pet photos"
- **Allowed operation:** SELECT
- **Policy definition:**
```sql
true
```

**Policy 3 - Users can delete their own uploads:**
- **Policy name:** "Users can delete their own photos"
- **Allowed operation:** DELETE
- **Policy definition:**
```sql
(auth.uid() IS NOT NULL)
```

## Step 7: Restart Your Dev Server

```bash
# Stop your dev server (Ctrl+C)
# Start it again
npm run dev
```

## Step 8: Test Authentication

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click **Sign Up** in the header
3. Create a new account
4. Check your email for confirmation (check spam folder!)
5. Click the confirmation link
6. You should be redirected to the dashboard

## Verification Checklist

- [ ] Supabase project created
- [ ] API keys copied to `.env.local`
- [ ] Database tables created (run SQL script)
- [ ] RLS policies enabled
- [ ] Email authentication configured
- [ ] Storage bucket created for photos
- [ ] Dev server restarted
- [ ] Successfully signed up and logged in

## Troubleshooting

### "Supabase client not initialized" error
- Check that `.env.local` exists in project root
- Verify environment variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server after creating `.env.local`

### Email confirmation not arriving
- Check spam/junk folder
- In Supabase dashboard, go to Authentication → Settings
- Look for "SMTP Settings" - by default, Supabase uses their email service
- For development, you can disable email confirmation temporarily

### "relation pets does not exist" error
- SQL script wasn't run successfully
- Go back to Step 4 and run the SQL again
- Check for any error messages in the SQL Editor

### Photos not uploading
- Check Storage bucket is created and named `pet-photos`
- Verify bucket is set to Public
- Check RLS policies are set up correctly

### Session expires immediately
- Clear browser localStorage and cookies
- Try incognito/private browsing mode
- Check Supabase project isn't paused (free tier auto-pauses after 7 days inactivity)

## Next Steps

Once Supabase is set up, you're ready for **Phase 3: Multi-Pet Management** which will connect the form to save pets to the database instead of localStorage.

## Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)

