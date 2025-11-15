# Database Migrations

This folder contains SQL migration scripts for setting up and updating the Pawthenticate database schema.

## How to Run Migrations

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to the SQL Editor
4. Copy and paste the SQL from each migration file
5. Execute the script

## Migration Files

Run these migrations in order:

1. **DATABASE_MIGRATION_EXTENDED_FIELDS.sql** - Adds extended pet profile fields
2. **DATABASE_MIGRATION_HEALTH_FIELDS.sql** - Adds health-related fields
3. **DATABASE_MIGRATION_ADD_COLOR.sql** - Adds pet color field
4. **DATABASE_MIGRATION_TEMPLATE_PREFERENCE.sql** - Adds template preference field
5. **DATABASE_MIGRATION_DOCUMENT_FIELDS.sql** - Adds document management fields
6. **DATABASE_MIGRATION_FORM_LOGIC_FIELDS.sql** - Adds conditional form logic fields
7. **SETUP_DOCUMENT_STORAGE.sql** - Sets up document storage buckets

## Verification

Each migration file includes verification queries to confirm the migration was successful. Run the verification query after executing the migration.

## Notes

- All migrations use `IF NOT EXISTS` or `ADD COLUMN IF NOT EXISTS` to prevent errors if run multiple times
- Migrations are idempotent (safe to run multiple times)
- Each migration includes comments explaining what it does

