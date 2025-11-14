# ⚡ Quick Start Guide

Get Pawthenticate running in 3 minutes!

## 🚀 Steps

### 1. Install Dependencies (30 seconds)

Open your terminal in this folder and run:

```bash
npm install
```

This downloads all the code libraries the app needs.

---

### 2. Start the App (10 seconds)

```bash
npm run dev
```

You should see:
```
- Local: http://localhost:3000
```

---

### 3. Open in Browser (10 seconds)

Click the link or open your browser and go to:
```
http://localhost:3000
```

You should see the Pawthenticate home page! 🎉

---

## ✅ What to Do Next

1. **Click "Create Pet Resume"** button
2. **Fill out the form** with test data (or real pet data!)
3. **Watch the top-right corner** - you'll see "💾 Saving..." then "✓ Saved"
4. **Click "Save & Preview Resume"** at the bottom
5. **Click "Print / Save as PDF"** button
6. **Choose "Save as PDF"** in the print dialog
7. **Done!** You've created your first pet resume 🐾

---

## 🐛 Troubleshooting

### Problem: `npm install` fails

**Try:**
```bash
# Delete node_modules and try again
rm -rf node_modules
npm install
```

---

### Problem: Port 3000 is already in use

**Solution:** Use a different port:
```bash
npm run dev -- -p 3001
```

Then open: `http://localhost:3001`

---

### Problem: Changes don't show up

**Solution:** Hard refresh the browser:
- **Windows/Linux:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R

---

### Problem: Console shows errors

**Check:**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. See DEBUGGING.md for solutions

---

## 📱 Testing on Mobile

### Option 1: Use Your Computer's IP (Same Network)

1. Find your computer's IP address:

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" (e.g., 192.168.1.100)

2. On your phone's browser, go to:
```
http://YOUR_IP:3000
```
Example: `http://192.168.1.100:3000`

### Option 2: Use Browser DevTools

1. Open Chrome DevTools (F12)
2. Click the device toggle icon (top-left)
3. Choose a phone model from dropdown
4. See mobile view instantly!

---

## 📁 What Files Do What?

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/create/page.tsx` | Form page |
| `app/preview/page.tsx` | Preview/print page |
| `lib/storage.ts` | Saves data to browser |
| `types/pet.ts` | Defines data structure |
| `tailwind.config.ts` | Color settings |

Want more details? Read **BEGINNER_GUIDE.md**!

---

## 🎨 Customizing

### Change Colors

Edit `tailwind.config.ts`:
```typescript
primary: {
  400: '#FF6B6B', // ← Change this!
}
```

### Change Text

Edit any `.tsx` file:
```tsx
<h1>Pawthenticate</h1>
// Change to:
<h1>My Pet App</h1>
```

Save the file and it updates instantly in the browser! ✨

---

## 🎓 Learning Resources

- **New to coding?** → Read `BEGINNER_GUIDE.md`
- **Having issues?** → Read `DEBUGGING.md`
- **Want details?** → Read `README.md`
- **See what's built?** → Read `PROJECT_SUMMARY.md`

---

## 💡 Tips

### Tip 1: Keep Console Open
Press F12 and keep the Console tab open. You'll see helpful logs as you use the app!

### Tip 2: Use Auto-Save
Don't worry about saving manually - the form auto-saves every time you type!

### Tip 3: Test in Incognito
If something seems broken, try opening the app in an Incognito/Private window to rule out browser extension issues.

### Tip 4: Clear Data for Fresh Start
If you want to start over:
1. Press F12 (open console)
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh page (F5)

---

## 🎉 You're Ready!

That's it! You now have a fully functional pet resume builder running on your computer.

**Have fun creating pet resumes!** 🐾

---

**Need help?** Check the other guide files or open an issue on GitHub!

