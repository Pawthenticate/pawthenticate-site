# Phase 7: PWA Testing Guide

**Last Updated:** November 14, 2025  
**Phase:** 7 - Progressive Web App (PWA)

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Testing](#local-development-testing)
3. [Service Worker Testing](#service-worker-testing)
4. [Offline Mode Testing](#offline-mode-testing)
5. [Install Testing (Desktop)](#install-testing-desktop)
6. [Install Testing (Mobile)](#install-testing-mobile)
7. [Lighthouse PWA Audit](#lighthouse-pwa-audit)
8. [Icon Validation](#icon-validation)
9. [Update Flow Testing](#update-flow-testing)
10. [Common Issues & Solutions](#common-issues--solutions)

---

## Prerequisites

### 1. Generate App Icons

Before testing, you MUST generate app icons:

```bash
# Option 1: Online tool (fastest)
# Go to: https://www.pwabuilder.com/imageGenerator
# Upload: public/svg/pawthenticate-icon-only.svg
# Download and extract to: public/icons/

# Option 2: ImageMagick (command line)
# See GENERATE_PWA_ICONS.md for full instructions
```

### 2. Start Development Server

```bash
npm run dev
```

Server should start at: http://localhost:3000

### 3. Get Local IP (for mobile testing)

**Windows:**
```powershell
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
# Look for your local IP (usually 192.168.x.x)
```

**Mobile Access:**
```
http://YOUR_IP:3000
Example: http://192.168.1.100:3000
```

---

## Local Development Testing

### Step 1: Verify Service Worker Registration

1. Open http://localhost:3000
2. Open Chrome DevTools (F12)
3. Navigate to **Application** tab
4. Click **Service Workers** in the left sidebar

**Expected Results:**
- ✅ Service worker should be listed: `http://localhost:3000/sw.js`
- ✅ Status: "activated and running" (green circle)
- ✅ Registration time shown
- ✅ "Update on reload" checkbox available

**Console Logs:**
```
[Service Worker] Loaded successfully
[Service Worker] Installing...
[Service Worker] Caching static assets
[Service Worker] Activating...
[PWA] Service Worker registered: ServiceWorkerRegistration {…}
[PWA] App is ready to work offline
```

### Step 2: Verify Manifest

1. In DevTools → **Application** tab
2. Click **Manifest** in the left sidebar

**Expected Results:**
- ✅ App name: "Pawthenticate - Pet Resume Builder"
- ✅ Short name: "Pawthenticate"
- ✅ Start URL: "/"
- ✅ Theme color: "#FF6B35" (orange)
- ✅ Background color: "#ffffff" (white)
- ✅ Display: "standalone"
- ✅ Orientation: "portrait-primary"

**Icons Section:**
- ✅ 10 icons listed (72px to 512px)
- ⚠️ If icons show errors, they need to be generated

**Shortcuts Section:**
- ✅ "Create New Pet" → /create
- ✅ "My Pets" → /dashboard

### Step 3: Check Cache Storage

1. DevTools → **Application** tab
2. Click **Cache Storage** in the left sidebar
3. Expand the caches

**Expected Caches:**
1. `pawthenticate-v1.0.0` (static assets)
2. `pawthenticate-runtime-v1.0.0` (runtime cache)

**Expected Cached Files (static):**
- `/` (homepage)
- `/dashboard`
- `/create`
- `/offline.html`
- SVG logos
- CSS files
- JS bundles (after navigation)

---

## Service Worker Testing

### Test 1: Service Worker Lifecycle

#### A. Install Event
1. DevTools → Application → Service Workers
2. Click **Unregister** (if registered)
3. Refresh page (Ctrl+R)

**Expected:**
- Console: `[Service Worker] Installing...`
- Console: `[Service Worker] Caching static assets`
- Status changes to "installed"
- Then "activated and running"

#### B. Activate Event
**Expected:**
- Console: `[Service Worker] Activating...`
- Old caches deleted (if any)
- Status: "activated and running"

#### C. Fetch Event
1. Navigate to different pages
2. Open Network tab (DevTools)
3. Look for "(ServiceWorker)" in Size column

**Expected:**
- Static assets show "(ServiceWorker)" or "disk cache"
- Pages may show network request (network-first strategy)

### Test 2: Cache Strategies

#### Cache-First (Static Assets)
1. Load homepage
2. DevTools → Network tab
3. Filter by "JS" or "CSS"
4. Refresh page

**Expected:**
- First load: Files from network (status 200)
- Second load: Files from service worker (size shows "from ServiceWorker")

#### Network-First (Pages)
1. Navigate to /dashboard
2. Go offline (see Offline Testing)
3. Navigate to /dashboard again

**Expected:**
- Online: Fresh page from network
- Offline: Cached page from service worker

---

## Offline Mode Testing

### Test 1: Simulate Offline (DevTools)

1. Open DevTools (F12)
2. Go to **Application** tab → **Service Workers**
3. Check the **Offline** checkbox
4. Navigate between pages

**Expected Results:**
- ✅ Previously visited pages load from cache
- ✅ Unvisited pages show offline.html fallback
- ✅ Static assets (images, CSS) load from cache
- ✅ Supabase calls fail gracefully

### Test 2: Real Network Disconnection

#### Disconnect WiFi/Ethernet
1. Visit several pages online: `/`, `/dashboard`, `/create`
2. Disconnect from internet
3. Refresh current page
4. Try navigating to visited pages

**Expected Results:**
- ✅ Current page reloads from cache
- ✅ Previously visited pages load
- ✅ Offline banner appears (from Phase 6)
- ✅ offline.html for unvisited pages

#### Reconnect
1. Reconnect to internet
2. Page should auto-reload (offline.html feature)
3. Green "Connection restored" toast

**Expected:**
- ✅ Network requests resume
- ✅ Supabase data loads
- ✅ Toast notification: "Connection restored"

### Test 3: Offline Functionality Limits

**What SHOULD work offline:**
- ✅ View cached pages (home, dashboard, create)
- ✅ See previously loaded pet cards
- ✅ View offline.html fallback
- ✅ UI interactions (buttons, forms)

**What WON'T work offline:**
- ❌ Supabase authentication
- ❌ Loading pet data (first time)
- ❌ Uploading photos
- ❌ Saving pet profiles
- ❌ PDF generation (requires external assets)

---

## Install Testing (Desktop)

### Chrome/Edge (Windows/Mac)

#### Method 1: Address Bar
1. Visit http://localhost:3000
2. Wait 3 seconds for install prompt (bottom sheet)
3. Click **Install App**

**Alternative:**
1. Look for install icon (⊕) in address bar
2. Click icon → Install

#### Method 2: Menu
1. Click Menu (⋮) → More Tools → Install Pawthenticate
2. Confirm installation

**Expected Results:**
- ✅ Installation dialog appears
- ✅ App installs as separate window
- ✅ Icon appears in start menu/dock
- ✅ App opens in standalone mode (no browser UI)
- ✅ App can be launched from desktop

**Verify Installation:**
1. Launch app from start menu/dock
2. Check address bar: Should NOT show browser UI
3. Check window: Should be standalone
4. Try shortcuts:
   - Windows: Right-click app icon
   - Mac: Command+click app in dock
5. Should see: "Create New Pet", "My Pets"

### Test Uninstall
1. Chrome: Settings → Apps → Pawthenticate → Uninstall
2. Edge: Settings → Apps → Installed apps → Pawthenticate → Remove

**Expected:**
- ✅ App removed from system
- ✅ Icon removed from start menu/dock
- ✅ Install prompt reappears on next visit

---

## Install Testing (Mobile)

### Android (Chrome)

#### Setup
1. Ensure icons are generated in `public/icons/`
2. Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac)
3. Open http://YOUR_IP:3000 on Android phone
4. Must be on same WiFi network

#### Method 1: Custom Install Prompt
1. Load homepage
2. Wait 3 seconds
3. Custom prompt appears (bottom sheet)

**Expected:**
- ✅ Orange/pink gradient header
- ✅ "Install Pawthenticate" title
- ✅ Benefits list (offline, fast, native)
- ✅ "Install App" button

**Test Install:**
1. Tap **Install App**
2. Native install dialog appears
3. Tap **Install**

**Expected Results:**
- ✅ App icon appears on home screen
- ✅ App opens in fullscreen (standalone)
- ✅ Status bar themed orange
- ✅ App appears in app drawer

#### Method 2: Chrome Menu
1. Menu (⋮) → "Add to Home screen"
2. Enter app name (or keep default)
3. Tap "Add"

**Same results as Method 1**

#### Test Shortcuts (Android)
1. Long-press app icon
2. Should see shortcuts menu:
   - Create New Pet
   - My Pets
3. Tap shortcut → Navigate to page

**Expected:**
- ✅ Shortcuts appear on long-press
- ✅ Tapping shortcut opens app to that page
- ✅ Shortcuts work even when app not running

#### Test Offline (Android)
1. Install app
2. Visit all pages online
3. Enable Airplane Mode
4. Open app from home screen

**Expected:**
- ✅ App opens (standalone)
- ✅ Cached pages load
- ✅ Offline banner shows
- ✅ Navigation works (cached pages)

### iOS (Safari)

#### Setup
1. Must use Safari (not Chrome or other browsers)
2. Open http://YOUR_IP:3000 in Safari
3. Must be on same WiFi network

#### Install Process
1. Load homepage
2. Wait 3 seconds for custom prompt

**Expected:**
- ✅ Custom prompt with iOS-specific instructions
- ✅ Orange/pink gradient header
- ✅ Step-by-step guide:
  1. Tap Share button (🔗)
  2. Scroll → "Add to Home Screen"
  3. Tap "Add"

**Manual Install (since iOS doesn't support auto-prompt):**
1. Tap **Share** button (bottom toolbar)
2. Scroll down
3. Tap **Add to Home Screen**
4. Edit name if desired (default: "Pawthenticate")
5. Tap **Add** (top-right)

**Expected Results:**
- ✅ Icon appears on home screen
- ✅ Opens in standalone mode (no Safari UI)
- ✅ Status bar themed (default style)
- ✅ Splash screen briefly shown

**Known Limitations (iOS):**
- ❌ No automatic install prompt (platform limitation)
- ❌ No shortcuts support (long-press icon)
- ❌ Limited cache (50MB max)
- ❌ Service worker limitations
- ⚠️ Must use Safari (not Chrome/Firefox)

#### Test Offline (iOS)
1. Install app
2. Visit pages online
3. Enable Airplane Mode
4. Open app from home screen

**Expected:**
- ✅ App opens
- ✅ Cached pages load
- ⚠️ Less reliable than Android (iOS limits)

---

## Lighthouse PWA Audit

### Run Audit

1. **Build Production Version:**
   ```bash
   npm run build
   npm run start
   ```
   Note: Service workers behave differently in dev vs production

2. **Open Lighthouse:**
   - Chrome DevTools (F12)
   - Click **Lighthouse** tab
   - Select **Progressive Web App**
   - Choose **Desktop** or **Mobile**
   - Click **Generate report**

### Expected Results

#### PWA Score: 100/100 ✅

**Installability (3 checks):**
- ✅ Registers a service worker
- ✅ Responds with 200 when offline
- ✅ Has a web app manifest

**PWA Optimized (6 checks):**
- ✅ Viewport configured
- ✅ Theme color set
- ✅ Icons provided
- ✅ Maskable icon provided
- ✅ Content sized correctly
- ✅ Splash screen

**Additional Checks:**
- ✅ HTTPS (in production)
- ✅ Redirects HTTP to HTTPS (in production)
- ✅ Service worker controls page

### Common Warnings

**Warning: "Icons not found"**
- **Cause:** Icons not generated yet
- **Fix:** Follow `GENERATE_PWA_ICONS.md`

**Warning: "HTTPS required"**
- **Cause:** Testing on http:// (not localhost)
- **Fix:** Test on localhost or deploy with HTTPS

**Warning: "Service worker too old"**
- **Cause:** Service worker not updated in 24+ hours
- **Fix:** Change `CACHE_NAME` version and reload

---

## Icon Validation

### Visual Check

#### Inspect in Manifest
1. DevTools → Application → Manifest
2. Scroll to Icons section
3. Click each icon

**Expected:**
- ✅ All 10 icons load without errors
- ✅ Icons look crisp (no pixelation)
- ✅ Logo clearly visible
- ✅ Orange color (#FF6B35) prominent

#### Test on Home Screen
1. Install app on mobile/desktop
2. Check app icon

**Expected:**
- ✅ Icon displays correctly
- ✅ No blank/generic icon
- ✅ Clear and recognizable

### Maskable Icon Test

Use Google's Maskable Icon Editor:
https://maskable.app/editor

1. Upload `public/icons/icon-maskable-512x512.png`
2. Enable "Minimum Safe Area"

**Expected:**
- ✅ Logo stays within safe zone (white circle)
- ✅ No important parts cut off
- ✅ Looks good in all shapes (circle, rounded square, squircle)

### File Size Check

```bash
# Check icon file sizes
ls -lh public/icons/
```

**Expected Sizes:**
- 72x72: 2-5 KB
- 192x192: 5-15 KB
- 512x512: 15-50 KB

**Warnings:**
- ⚠️ Too small (<1 KB): Likely corrupt or low quality
- ⚠️ Too large (>100 KB): Consider optimization

---

## Update Flow Testing

### Test Service Worker Update

#### Step 1: Trigger Update
1. Open `public/sw.js`
2. Change `CACHE_NAME`:
   ```javascript
   const CACHE_NAME = 'pawthenticate-v1.0.1'; // Changed from v1.0.0
   ```
3. Save file

#### Step 2: Reload Page
1. Wait 5-10 seconds (service worker checks for updates)
2. Or force: DevTools → Application → Service Workers → Update

**Expected:**
- Console: `[PWA] New Service Worker found`
- Console: `[PWA] New Service Worker available`

#### Step 3: Update Notification
1. Update notification appears (top-right)
2. Shows: "Update Available" with orange background

**Expected UI:**
- ✅ Notification with update icon
- ✅ "A new version of Pawthenticate is ready!"
- ✅ "Update Now" button (blue)
- ✅ "Later" button (gray)
- ✅ Close button (X)

#### Step 4: Apply Update
1. Click **Update Now**
2. Toast: "Updating app..."
3. Page reloads

**Expected:**
- ✅ Service worker activates
- ✅ Page reloads automatically
- ✅ New cache version active
- Console: `[PWA] New Service Worker activated`

#### Step 5: Verify
1. DevTools → Application → Cache Storage
2. Old cache deleted: `pawthenticate-v1.0.0` (gone)
3. New cache exists: `pawthenticate-v1.0.1` ✅

### Test Dismiss Update

1. Trigger update (as above)
2. Click **Later** or **X**

**Expected:**
- ✅ Notification dismisses
- ✅ Old version continues to run
- ✅ Update applies on next page reload

---

## Common Issues & Solutions

### Issue: Service Worker Not Registering

**Symptoms:**
- No service worker in DevTools
- Console error: Registration failed

**Debugging:**
1. Check console for errors
2. Verify `public/sw.js` exists
3. Check network tab: sw.js should return 200
4. Clear site data: DevTools → Application → Clear storage

**Solutions:**
- Ensure HTTPS (localhost is ok)
- Check file path: `/sw.js` (not `/public/sw.js`)
- Look for JavaScript syntax errors in `sw.js`

### Issue: Install Prompt Not Showing

**Symptoms:**
- No install prompt after 3 seconds
- Install icon not in address bar

**Debugging:**
1. DevTools → Console: Look for errors
2. DevTools → Application → Manifest: Check for errors
3. Check: `localStorage.getItem('pwa-install-dismissed')`

**Solutions:**
- Generate icons (prompt won't show without valid icons)
- Clear localStorage: `localStorage.removeItem('pwa-install-dismissed')`
- Check manifest is valid: https://manifest-validator.appspot.com/
- Try different browser (Firefox doesn't support install prompts)
- iOS: Must use Safari, manual install only

### Issue: Icons Not Loading

**Symptoms:**
- Broken icon images in manifest
- Lighthouse error: "Icons not found"

**Solutions:**
1. **Generate icons first:**
   ```bash
   # See GENERATE_PWA_ICONS.md
   ```

2. **Check file paths:**
   ```
   public/icons/icon-72x72.png
   public/icons/icon-96x96.png
   # ... etc
   ```

3. **Verify in browser:**
   ```
   http://localhost:3000/icons/icon-192x192.png
   ```
   Should display the icon (not 404)

4. **Check manifest paths:**
   ```json
   "icons": [
     {
       "src": "/icons/icon-192x192.png", // Must start with /
       ...
     }
   ]
   ```

### Issue: Offline Mode Not Working

**Symptoms:**
- White screen when offline
- "No internet" error
- Pages don't load offline

**Debugging:**
1. DevTools → Application → Service Workers
   - Check status: Should be "activated and running"
2. DevTools → Application → Cache Storage
   - Check caches exist and have content

**Solutions:**
1. **Visit pages online first** (to cache them):
   - Visit `/`, `/dashboard`, `/create` while online
   - Then test offline

2. **Check service worker active:**
   ```javascript
   // Console
   navigator.serviceWorker.controller
   // Should return ServiceWorker object (not null)
   ```

3. **Force refresh cache:**
   - DevTools → Application → Service Workers
   - Check "Update on reload"
   - Refresh page

4. **Clear and re-register:**
   - Unregister service worker
   - Clear all caches
   - Reload page
   - Visit pages to cache them

### Issue: Updates Not Applying

**Symptoms:**
- Still seeing old version
- Cache version unchanged

**Solutions:**
1. **Hard refresh (bypass cache):**
   ```
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

2. **Force update:**
   - DevTools → Application → Service Workers
   - Click "Update"

3. **Manual cleanup:**
   - Application → Service Workers → Unregister
   - Application → Cache Storage → Delete all
   - Reload page

4. **Check version changed:**
   ```javascript
   // public/sw.js
   const CACHE_NAME = 'pawthenticate-v1.0.1'; // New version
   ```

### Issue: iOS Install Not Working

**Symptoms:**
- Can't install on iOS
- Icon doesn't appear

**Solutions:**
1. **Must use Safari:**
   - Not Chrome, Firefox, or in-app browsers
   - Open in Safari directly

2. **Manual install:**
   - Share button → Add to Home Screen
   - No automatic prompt (iOS limitation)

3. **Check manifest:**
   - DevTools → Application → Manifest (use Safari remote debugging)
   - Must have valid apple-touch-icon

4. **Icons must exist:**
   - Generate all icons (especially 192x192)
   - Test: `http://YOUR_IP:3000/icons/icon-192x192.png`

---

## Testing Checklist

Use this checklist to verify Phase 7 is complete:

### Pre-Testing
- [ ] App icons generated (10 sizes)
- [ ] Icons placed in `public/icons/`
- [ ] Development server running (`npm run dev`)
- [ ] Local IP identified for mobile testing

### Service Worker
- [ ] Service worker registers successfully
- [ ] Status: "activated and running"
- [ ] Console logs show successful registration
- [ ] Cache storage contains 2 caches
- [ ] Static assets cached correctly

### Manifest
- [ ] Manifest loads without errors
- [ ] All 10 icons load correctly
- [ ] Theme color: #FF6B35
- [ ] Display: standalone
- [ ] 2 shortcuts defined

### Offline Mode
- [ ] Offline toggle in DevTools works
- [ ] Cached pages load offline
- [ ] offline.html shows for uncached pages
- [ ] Reconnection auto-reloads page
- [ ] Offline banner appears (Phase 6 feature)

### Installation (Desktop)
- [ ] Install prompt appears
- [ ] Install from address bar works
- [ ] Install from menu works
- [ ] App opens in standalone mode
- [ ] App icon in start menu/dock
- [ ] Shortcuts work (right-click icon)
- [ ] Uninstall works

### Installation (Mobile - Android)
- [ ] Custom install prompt appears
- [ ] Install works via prompt
- [ ] Install works via Chrome menu
- [ ] App icon on home screen
- [ ] Standalone mode (fullscreen)
- [ ] Shortcuts work (long-press)
- [ ] Offline functionality works

### Installation (Mobile - iOS)
- [ ] Custom prompt shows iOS instructions
- [ ] Manual install works (Safari)
- [ ] App icon on home screen
- [ ] Standalone mode works
- [ ] Basic offline works (limited)

### Lighthouse Audit
- [ ] PWA score: 100/100 (or close)
- [ ] Installability checks pass
- [ ] Service worker checks pass
- [ ] Manifest checks pass
- [ ] No major errors

### Icons
- [ ] All 10 icons load
- [ ] Icons look crisp (not pixelated)
- [ ] Maskable icons have proper padding
- [ ] Icons display correctly when installed
- [ ] File sizes reasonable (<100 KB)

### Updates
- [ ] Update notification appears
- [ ] "Update Now" applies update
- [ ] Page reloads after update
- [ ] New cache version active
- [ ] Old caches deleted

### Final Verification
- [ ] No console errors
- [ ] No 404 errors
- [ ] All features work as expected
- [ ] Documentation reviewed
- [ ] Phase 7 marked complete

---

## Next Steps After Testing

Once all tests pass:

1. ✅ **Mark Phase 7 Complete**
   - Update `docs/TODO.md`
   - Create `PHASE_7_COMPLETE.md`

2. **Deploy to Production** (Phase 10)
   - Deploy to Vercel with HTTPS
   - Test in production environment
   - Verify service worker on real domain

3. **Choose Next Phase:**
   - **Phase 8:** Resume tracking & history
   - **Phase 9:** Shareable public links
   - **Phase 10:** Production deployment

---

## Support & Resources

### Documentation
- `docs/PHASE_7_IMPLEMENTATION_SUMMARY.md` - Technical details
- `GENERATE_PWA_ICONS.md` - Icon generation guide
- `public/manifest.json` - App manifest
- `public/sw.js` - Service worker code

### External Resources
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker Lifecycle](https://web.dev/service-worker-lifecycle/)
- [Maskable Icon Editor](https://maskable.app/editor)
- [Manifest Validator](https://manifest-validator.appspot.com/)

---

**Happy Testing!** 🧪🐾

If you encounter issues not covered here, check the Implementation Summary or create an issue.

