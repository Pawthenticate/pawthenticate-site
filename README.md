# 🐾 Pawthenticate

**Where your pet's story lives**

Pawthenticate is a mobile-first web app that helps Australian renters quickly create professional, landlord-ready pet resumes.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A modern web browser

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure (Beginner-Friendly!)

```
Pawthenticate_v1/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page (landing)
│   ├── create/
│   │   └── page.tsx         # Pet resume form
│   ├── preview/
│   │   └── page.tsx         # Preview & print page
│   ├── layout.tsx           # Root layout wrapper
│   └── globals.css          # Global styles + print styles
│
├── components/              # Reusable UI components (future use)
│
├── lib/                     # Utility functions
│   └── storage.ts          # localStorage helpers with error handling
│
├── types/                   # TypeScript type definitions
│   └── pet.ts              # Pet data types and interfaces
│
├── public/                  # Static assets
│   └── svg/                # Pawthenticate logos and icons
│
├── tailwind.config.ts      # Tailwind CSS configuration (custom colors!)
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Features (V1 MVP)

### ✅ What's Included
- **Guided Form**: Multi-section form that collects all necessary pet information
- **Auto-Save**: Form data automatically saves to browser localStorage
- **Mobile-First**: Optimized for phones, works great on desktop too
- **Professional PDF**: Print-to-PDF via browser with beautiful formatting
- **No Login Required**: Local-only storage, no accounts needed
- **Australian Focus**: Fields match what Aussie landlords want to see

### 📋 Pet Resume Sections
1. **Pet Basics**: Name, species, breed, age, size, photo
2. **Identification & Legal**: Microchip number, council registration
3. **Health & Insurance**: Desexed status, vaccinations, pet insurance
4. **Behaviour**: Temperament, noise level, house training, compatibility
5. **Documents**: Upload vaccination, desexing, and microchip certificates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom color palette)
- **Storage**: Browser localStorage (no backend)
- **PDF Export**: Browser print dialog (File → Print → Save as PDF)

## 🎨 Design System

### Color Palette
- **Primary (Coral)**: `#FF6B6B` - Main CTAs and important elements
- **Secondary (Orange)**: `#FFB347` - Accents and highlights
- **Accent (Brown)**: `#8F6548` - Subtle emphasis
- **Neutral (Dark)**: `#1F2937` - Text and dark UI elements
- **Background (Light)**: `#F9FAFB` - Page backgrounds

### Typography
- **Display Text**: Merriweather (serif) - Used for pet name and headings
- **Body Text**: Lato (sans-serif) - Used for all body content

## 📝 How It Works

### User Flow
1. **Home Page** → User reads about Pawthenticate and clicks "Create Pet Resume"
2. **Form Page** → User fills in pet details across 5 sections (auto-saved)
3. **Preview Page** → User sees their resume as it will print
4. **Export** → User clicks "Print / Save as PDF" and saves/prints

### Data Storage
- All data stored in browser's `localStorage`
- Data persists across page refreshes
- No external backend or database
- User can clear data by clearing browser storage

### Error Handling & Debugging
- All localStorage operations include comprehensive console logging
- Errors are logged with timestamps and context
- Check browser console (F12) to see detailed logs:
  - `[Pawthenticate Storage]` - Storage operations
  - `[Form]` - Form state changes and auto-save
  - `[Preview]` - Preview page data loading

### Common Issues & Solutions

**Problem**: Form data disappears after refresh
- **Cause**: localStorage not available (private browsing mode)
- **Solution**: Use regular browsing mode, check console for errors

**Problem**: File upload fails
- **Cause**: File too large (>5MB)
- **Solution**: Use smaller images, compress photos before uploading

**Problem**: Print layout looks wrong
- **Cause**: Browser not applying print styles
- **Solution**: Use "Save as PDF" instead of "Print" in the print dialog

## 🚧 What's NOT in V1 (Coming Later)

- Multiple pets per user
- User accounts / login
- Cloud storage / database
- Shareable links
- Multiple template designs
- Owner contact information sections

## 📱 Browser Support

Works best on:
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## 🤝 Contributing

This is a learning project for V1 MVP. Feel free to:
- Report bugs via issues
- Suggest features for future versions
- Fork and experiment

## 📄 License

ISC License - Free to use and modify

## 💡 Tips for Developers

### Adding New Form Fields
1. Add the field to `types/pet.ts` interface
2. Add input in `app/create/page.tsx`
3. Display the field in `app/preview/page.tsx`
4. The auto-save will handle storage automatically!

### Customizing Colors
Edit `tailwind.config.ts` - all color values are centralized there

### Debugging Storage Issues
Open browser console and look for `[Pawthenticate Storage]` logs
All storage operations are logged with detailed context

### Testing Print Layout
Use Chrome's print preview (Ctrl/Cmd + P) to see PDF output without printing

---

Made with ❤️ for Australian pet owners and renters

