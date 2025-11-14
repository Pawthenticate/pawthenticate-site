# Phase 1 & 2 Testing Checklist

## Pre-Testing Setup

Before running tests, ensure:
- [ ] `.env.local` file exists with valid Supabase credentials
- [ ] Supabase project is created and database tables are set up
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser console is open (F12) to monitor errors

## Phase 1: Backend Infrastructure Tests

### ✅ Supabase Client Initialization
- [ ] Open browser console
- [ ] Navigate to http://localhost:3000
- [ ] Check for any "Supabase" error logs
- [ ] Verify no red errors about missing environment variables
- [ ] **Expected:** Clean console with successful Supabase client initialization log

### ✅ Environment Variable Validation
- [ ] Remove `.env.local` temporarily
- [ ] Refresh page
- [ ] Check console for detailed error about missing variables
- [ ] **Expected:** Clear error message with setup instructions
- [ ] Restore `.env.local`

### ✅ Health Check
- [ ] Open browser dev tools console
- [ ] Run: `window.supabaseHealth = await import('/lib/supabaseClient').then(m => m.checkSupabaseHealth())`
- [ ] **Expected:** `{ healthy: true, latencyMs: <some number> }`

## Phase 2: Authentication System Tests

### Test 1: Sign Up Flow (Happy Path)
- [ ] Navigate to http://localhost:3000
- [ ] Click "Sign Up" in header
- [ ] Fill in:
  - Name: Test User
  - Email: test@example.com
  - Password: testpass123
  - Confirm: testpass123
- [ ] Click "Create Account"
- [ ] **Expected:** Success message + redirect to dashboard (or email confirmation message)
- [ ] If email confirmation required, check email inbox/spam
- [ ] Click confirmation link
- [ ] **Expected:** Redirect to dashboard

### Test 2: Sign Up Flow (Error Cases)
**Test 2a: Password Mismatch**
- [ ] Go to /auth/signup
- [ ] Enter different passwords in Password and Confirm fields
- [ ] Click "Create Account"
- [ ] **Expected:** Error message "Passwords do not match"

**Test 2b: Short Password**
- [ ] Enter password less than 6 characters
- [ ] **Expected:** Error message "Password must be at least 6 characters"

**Test 2c: Duplicate Email**
- [ ] Try signing up with same email again
- [ ] **Expected:** Error message about email already in use

**Test 2d: Invalid Email**
- [ ] Enter "notanemail" without @
- [ ] **Expected:** Browser validation error or Supabase error

### Test 3: Sign In Flow (Happy Path)
- [ ] Navigate to /auth/login
- [ ] Select "Password" tab
- [ ] Enter email: test@example.com
- [ ] Enter password: testpass123
- [ ] Click "Sign In"
- [ ] **Expected:** Success message + redirect to dashboard

### Test 4: Sign In Flow (Error Cases)
**Test 4a: Wrong Password**
- [ ] Enter correct email, wrong password
- [ ] **Expected:** "Invalid email or password" error

**Test 4b: Non-existent Email**
- [ ] Enter email that doesn't exist
- [ ] **Expected:** "Invalid email or password" error (shouldn't reveal if email exists)

**Test 4c: Empty Fields**
- [ ] Leave fields empty, try to submit
- [ ] **Expected:** Browser validation prevents submission

### Test 5: Magic Link Authentication
- [ ] Go to /auth/login
- [ ] Select "Magic Link" tab
- [ ] Enter email: test@example.com
- [ ] Click "Send Magic Link"
- [ ] **Expected:** Success message "Check your email for the magic link!"
- [ ] Check email inbox
- [ ] Click magic link
- [ ] **Expected:** Redirect to dashboard, logged in

### Test 6: Password Reset Flow
**Test 6a: Request Reset**
- [ ] Go to /auth/login
- [ ] Click "Forgot password?"
- [ ] Enter email: test@example.com
- [ ] Click "Send Reset Instructions"
- [ ] **Expected:** Success screen "Check Your Email"
- [ ] Check email inbox for reset link

**Test 6b: Complete Reset**
- [ ] Click reset link in email
- [ ] **Expected:** Redirect to /auth/reset-password
- [ ] Enter new password: newpass123
- [ ] Confirm: newpass123
- [ ] Click "Update Password"
- [ ] **Expected:** Success message + redirect to login
- [ ] Try logging in with new password
- [ ] **Expected:** Successful login

**Test 6c: Invalid/Expired Reset Link**
- [ ] Go to /auth/reset-password directly (without token)
- [ ] **Expected:** "Invalid Reset Link" error with button to request new one

**Test 6d: Password Mismatch on Reset**
- [ ] Get valid reset link
- [ ] Enter different passwords
- [ ] **Expected:** "Passwords do not match" error

### Test 7: Authentication State Persistence
- [ ] Log in successfully
- [ ] Note: Should be on /dashboard
- [ ] Refresh the page (F5)
- [ ] **Expected:** Still logged in, still on dashboard (no redirect to login)
- [ ] Open new tab, go to http://localhost:3000
- [ ] **Expected:** Header shows "Dashboard" and "Account" links (logged in state)

### Test 8: Middleware Protection
**Test 8a: Protected Routes When Not Logged In**
- [ ] Log out if logged in
- [ ] Try to visit /dashboard directly
- [ ] **Expected:** Redirect to /auth/login with redirectTo param
- [ ] Try to visit /account directly
- [ ] **Expected:** Redirect to /auth/login

**Test 8b: Auth Routes When Logged In**
- [ ] Log in successfully
- [ ] Try to visit /auth/login
- [ ] **Expected:** Redirect to /dashboard
- [ ] Try to visit /auth/signup
- [ ] **Expected:** Redirect to /dashboard

### Test 9: Account Page
- [ ] Log in
- [ ] Go to /account (or click "Account" in header)
- [ ] **Expected:** See account info (email, user ID, creation date)

**Test 9a: Change Password**
- [ ] Enter new password: anotherpass123
- [ ] Confirm: anotherpass123
- [ ] Click "Update Password"
- [ ] **Expected:** Success message "Password updated successfully!"
- [ ] Sign out
- [ ] Sign in with new password
- [ ] **Expected:** Successful login

**Test 9b: Sign Out**
- [ ] Click "Sign Out" button
- [ ] **Expected:** Redirect to home page
- [ ] Check header
- [ ] **Expected:** Shows "Log In" and "Sign Up" (logged out state)
- [ ] Try to visit /dashboard
- [ ] **Expected:** Redirect to /auth/login

### Test 10: Dashboard Page
- [ ] Log in
- [ ] Go to /dashboard
- [ ] **Expected:** Welcome message with email username
- [ ] **Expected:** Quick action cards: "Create Pet Resume" and "Account Settings"
- [ ] **Expected:** "Phase 3 Coming Soon" message
- [ ] Click "Create Pet Resume"
- [ ] **Expected:** Navigate to /create
- [ ] Go back to dashboard
- [ ] Click "Account Settings"
- [ ] **Expected:** Navigate to /account

### Test 11: Header Auth State
**Test 11a: Logged Out State**
- [ ] Log out
- [ ] Go to home page
- [ ] Check header
- [ ] **Expected:** Shows "Log In" link and "Sign Up" button

**Test 11b: Logged In State**
- [ ] Log in
- [ ] Go to home page
- [ ] Check header
- [ ] **Expected:** Shows "Dashboard" link and "Account" button

**Test 11c: Loading State**
- [ ] Clear browser cache
- [ ] Refresh page
- [ ] Watch header carefully
- [ ] **Expected:** Brief loading skeleton (gray box) before showing auth buttons

## Edge Cases & Error Handling Tests

### Test 12: Network Errors
- [ ] Open DevTools → Network tab
- [ ] Set throttling to "Offline"
- [ ] Try to log in
- [ ] **Expected:** User-friendly error about network connection
- [ ] Set back to "Online"

### Test 13: Session Expiration
- [ ] Log in
- [ ] Go to Supabase dashboard → Authentication
- [ ] Delete the user's session manually
- [ ] In app, try to access /dashboard
- [ ] **Expected:** Redirect to login (session invalid)

### Test 14: Concurrent Sessions
- [ ] Log in on Chrome
- [ ] Log in on Firefox (or Incognito) with same account
- [ ] **Expected:** Both sessions should work independently

### Test 15: Browser Back/Forward
- [ ] Log in, go to dashboard
- [ ] Navigate: Dashboard → Account → Dashboard
- [ ] Click browser back button
- [ ] **Expected:** Smooth navigation, no errors
- [ ] Click forward button
- [ ] **Expected:** Works correctly

### Test 16: Missing Supabase Configuration
- [ ] Stop dev server
- [ ] Rename `.env.local` to `.env.local.backup`
- [ ] Start dev server
- [ ] Open app
- [ ] **Expected:** Console shows clear error about missing configuration
- [ ] **Expected:** App doesn't crash, shows helpful setup instructions
- [ ] Restore `.env.local`

## Console Error Check

During all tests, monitor browser console for:
- [ ] No unhandled promise rejections
- [ ] No React errors
- [ ] No TypeScript errors
- [ ] No "undefined" or "null" errors
- [ ] All auth operations logged with timestamps
- [ ] Errors have clear, user-friendly messages

## Bug Report Template

If you find a bug, document it with:

```markdown
### Bug: [Short Description]

**Severity:** Critical / High / Medium / Low
**Test:** [Test number where found]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**


**Actual Behavior:**


**Console Errors:**


**Screenshots:** (if applicable)


**Environment:**
- Browser: 
- OS: 
- Supabase Project Status: 
```

## Success Criteria

Phase 1 & 2 are considered **COMPLETE** when:
- [ ] All happy path tests pass
- [ ] All error case tests show appropriate error messages
- [ ] No critical or high severity bugs
- [ ] Console is clean (no errors in normal flows)
- [ ] Auth state persists across refreshes
- [ ] Middleware correctly protects routes
- [ ] User experience is smooth and intuitive

## Known Limitations (Not Bugs)

These are expected limitations of Phase 1 & 2:
- Pet data still saves to localStorage (Phase 3 will migrate to Supabase)
- No multi-pet management yet (Phase 3)
- No template selector yet (Phase 4)
- Create/Preview pages don't require auth yet (will be protected in Phase 3)

## Next Steps After Testing

1. Document any bugs found
2. Fix critical and high priority bugs
3. Create Phase 3 implementation plan (Multi-Pet Management)
4. Celebrate! 🎉 Phase 1 & 2 complete!

