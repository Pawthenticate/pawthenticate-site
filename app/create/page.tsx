/**
 * Create Pet Resume - Form Page
 * 
 * This is the main form where users input their pet's information.
 * 
 * Features:
 * - Multi-section guided form
 * - Auto-save to localStorage on each change
 * - Mobile-first responsive design
 * - Clear validation messages
 * - Progress tracking
 * 
 * Form Sections (matching PRD):
 * 1. Pet Basics
 * 2. Identification & Legal
 * 3. Health, Safety & Insurance
 * 4. Behaviour & Living Situation
 * 5. Required Document Uploads
 */

'use client';

import { useState, useEffect, ChangeEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PetData, DEFAULT_PET_DATA, GoodWithOption, PetSpecies, LivingLocation, NoiseLevel, HouseTrainingStatus, UploadedFile, POPULAR_BREEDS, POPULAR_COLORS, PetSize, AgeUnit } from '@/types/pet';
import { savePetData, loadPetData, clearPetData } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import { getPetById, createPet, updatePet, convertRowToPetData } from '@/lib/pets';
import { uploadPetPhoto, uploadPetDocument } from '@/lib/petStorage';
import { useToast } from '@/components/ToastContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { User } from '@supabase/supabase-js';
import NavigationHeader from './components/NavigationHeader';
import BackgroundDecorations from './components/BackgroundDecorations';
import PageHeader from './components/PageHeader';
import FormNavigationBar from './components/FormNavigationBar';

function CreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get('petId'); // For edit mode
  const { success, error: showError } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<Partial<PetData>>({
    ...DEFAULT_PET_DATA
  });

  // Loading state for auto-save feedback
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // Form validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // File upload loading state
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showExtendedDetails, setShowExtendedDetails] = useState(false);
  
  // Custom input states (for "Other" selections)
  const [customBreed, setCustomBreed] = useState<string>('');
  const [customColor, setCustomColor] = useState<string>('');
  const [customSpecies, setCustomSpecies] = useState<string>('');
  const [customSleepingLocation, setCustomSleepingLocation] = useState<string>('');

  // Initialize custom breed text when loading existing pet data
  useEffect(() => {
    if (formData.breed) {
      // Check if breed contains custom text in parentheses (e.g., "Mixed Breed (Labrador x Poodle)")
      const mixedBreedMatch = formData.breed.match(/^Mixed Breed \((.*)\)$/);
      if (mixedBreedMatch) {
        setCustomBreed(mixedBreedMatch[1]);
      }
      // If breed is not in the popular breeds list and not "Other", it's a custom breed
      else if (formData.species && POPULAR_BREEDS[formData.species]) {
        const isInList = POPULAR_BREEDS[formData.species].includes(formData.breed);
        if (!isInList && formData.breed !== 'Other' && !formData.breed.startsWith('Mixed Breed')) {
          setCustomBreed(formData.breed);
        }
      }
    }
  }, [formData.breed, formData.species]);

  // Initialize custom sleeping location when loading existing pet data
  useEffect(() => {
    if (formData.sleepingLocation && formData.sleepingLocation.startsWith('Other: ')) {
      const customValue = formData.sleepingLocation.replace('Other: ', '');
      setCustomSleepingLocation(customValue);
    }
  }, [formData.sleepingLocation]);

  // Auto-expand extended details if pet has any extended data (EDIT MODE)
  useEffect(() => {
    if (!petId) return; // Only in edit mode
    
    // Check if any extended fields have data
    const hasExtendedData = !!(
      formData.homeBehaviourSummary ||
      formData.goodWithKids ||
      formData.goodWithDogs ||
      formData.goodWithCats ||
      formData.propertyDamageHistory ||
      formData.rentalSpecificNotes ||
      formData.foodType ||
      formData.feedingSchedule ||
      formData.portionSize ||
      formData.treatsAllowed ||
      formData.foodAllergies ||
      formData.healthConditions ||
      formData.medications ||
      formData.vetClinicName ||
      formData.vetClinicPhone ||
      formData.emergencyVetDetails ||
      formData.wakeTime ||
      formData.walkPlayTimes ||
      formData.napTimes ||
      formData.bedtime ||
      formData.exerciseLevel ||
      formData.dailyExerciseAmount ||
      formData.offLeadAllowed ||
      formData.favouriteGames ||
      formData.trainingLevel ||
      formData.commandsKnown ||
      formData.walkingStyle ||
      formData.maxAloneHours ||
      formData.separationAnxietyLevel ||
      formData.safeSpaces ||
      formData.escapeRisk ||
      formData.furnitureRules ||
      formData.bedtimeRituals ||
      formData.fearsAndTriggers ||
      formData.reactivityNotes ||
      formData.biteHistory ||
      formData.brushingPreferences ||
      formData.bathingPreferences ||
      formData.sensitiveAreas ||
      formData.emergencyContacts ||
      formData.vetSpendLimit ||
      formData.insuranceDetails ||
      formData.carerNotes ||
      formData.dogOffLeadInDogParks ||
      formData.dogPreyDrive ||
      formData.dogBreedWorkLevel ||
      formData.catLitterType ||
      formData.catLitterTrayCount ||
      formData.catIndoorOutdoor ||
      formData.catScratchingSurfaces ||
      formData.catScratchingRules ||
      formData.catVerticalSpace ||
      formData.smallPetEnclosureType ||
      formData.smallPetEnclosureLocation ||
      formData.smallPetTimeOutsideEnclosure ||
      formData.smallPetChewingSafety ||
      formData.birdCageSize ||
      formData.birdCageLocation ||
      formData.birdTimeOutOfCage ||
      formData.birdNoiseLevel ||
      formData.reptileSpeciesFull ||
      formData.reptileEnclosureSize ||
      formData.reptileHeatSources ||
      formData.reptileUvbLighting ||
      formData.reptileTemperatureHumidity
    );
    
    if (hasExtendedData) {
      console.log('[Form] Edit mode: Auto-expanding extended details (pet has extended data)');
      setShowExtendedDetails(true);
    }
  }, [petId, formData]);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          // User is not logged in, redirect to login page
          console.log('[Create] User not authenticated, redirecting to login...');
          router.push('/auth/login');
          return;
        }
        setUser(currentUser);
        console.log('[Create] User authenticated:', currentUser.email);
      } catch (err) {
        console.error('[Create] Error checking auth:', err);
        router.push('/auth/login');
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Load pet data (either from database for edit, or localStorage for recovery)
  useEffect(() => {
    // Don't load data until auth is checked
    if (authLoading || !user) return;

    let isMounted = true; // Prevent state updates if component unmounts

    const fetchPetData = async () => {
      // EDIT MODE: Load from database if petId is provided
      if (petId) {
        console.log('[Form] Edit mode - loading pet from database:', petId);
        const result = await getPetById(petId, user.id);
        
        if (!isMounted) return;
        
        if (result.success && result.data) {
          console.log('[Form] ✅ Pet loaded successfully');
          const petData = convertRowToPetData(result.data);
          console.log('[Form] ✅ All fields loaded from database (including extended fields)');
          
          setFormData(petData);
          setIsVisible(true);
        } else {
          console.error('[Form] ❌ Failed to load pet:', result.error);
          showError(`Failed to load pet: ${result.error}`);
          router.push('/dashboard');
        }
      } 
      // CREATE MODE: Try to load from localStorage (auto-save recovery)
      else {
        console.log('[Form] Create mode - checking for auto-saved data...');
        const savedData = loadPetData(); // This calls the imported function from @/lib/storage
        
        if (!isMounted) return;
        
        if (savedData) {
          console.log('[Form] Found auto-saved data, restoring form state');
          setFormData({ ...DEFAULT_PET_DATA, ...savedData });
        } else {
          console.log('[Form] No saved data found, using default values');
        }
        
        setIsVisible(true);
      }
    };

    fetchPetData();

    return () => {
      isMounted = false; // Cleanup function
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, petId]); // Removed 'user' and 'router' to prevent re-runs

  // Auto-save whenever form data changes (only in CREATE mode, not EDIT mode)
  useEffect(() => {
    // CRITICAL: Don't auto-save in EDIT mode - only save when user clicks "Update Pet"
    // This prevents overwriting data with partial/empty state during initial load
    if (petId) {
      console.log('[Form] Edit mode: Auto-save disabled (will save to database on submit)');
      return;
    }

    const autoSave = () => {
      // Don't save if form is completely empty
      if (!formData.petName && !formData.breed) {
        return;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[Form] Auto-saving form data to localStorage...');
      }
      setAutoSaveStatus('saving');
      
      const success = savePetData(formData);
      
      if (success) {
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('[Form] Auto-save failed');
        }
        setAutoSaveStatus('error');
        setTimeout(() => setAutoSaveStatus('idle'), 3000);
      }
    };

    // Debounce auto-save by 500ms
    const timeoutId = setTimeout(autoSave, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData, petId]);

  // Update form field handler
  const updateField = <K extends keyof PetData>(field: K, value: PetData[K]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Form] Field updated: ${field}`, value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle text input changes
  const handleTextChange = (field: keyof PetData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateField(field, e.target.value as any);
  };

  // Handle select changes
  const handleSelectChange = (field: keyof PetData) => (e: ChangeEvent<HTMLSelectElement>) => {
    updateField(field, e.target.value as any);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field: keyof PetData) => (e: ChangeEvent<HTMLInputElement>) => {
    updateField(field, e.target.checked as any);
  };

  // Handle "Good With" multi-select
  const toggleGoodWith = (option: GoodWithOption) => {
    const current = formData.goodWith || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    updateField('goodWith', updated);
  };

  // Handle file upload
  const handleFileUpload = (field: 'photo' | 'vaccinationCertificate' | 'desexingCertificate') => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Form] Uploading file for ${field}:`, file.name, `(${(file.size / 1024).toFixed(2)} KB)`);
    }

    // Check file size (max 5MB for localStorage)
    if (file.size > 5 * 1024 * 1024) {
      showError('File too large! Please choose a file smaller than 5MB.');
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Form] File too large: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      }
      return;
    }

    // Set loading state
    setUploadingFile(field);

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      
      if (field === 'photo') {
        // For photo, just store the data URL
        updateField('photo', dataUrl);
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Form] Photo uploaded successfully`);
        }
      } else {
        // For documents, store as UploadedFile object
        const uploadedFile: UploadedFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: dataUrl,
          uploadedAt: new Date().toISOString(),
        };
        updateField(field, uploadedFile);
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Form] Document uploaded successfully: ${field}`);
        }
      }
      
      // Clear loading state
      setUploadingFile(null);
    };

    reader.onerror = (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Form] Error reading file:`, error);
      }
      showError('Error uploading file. Please try again.');
      setUploadingFile(null);
    };

    reader.readAsDataURL(file);
  };

  // Helper to convert data URL to File
  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Validate form and return errors
  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!formData.petName?.trim()) {
      errors.petName = 'Please enter your pet\'s name';
    }

    // Validate age: must have either DOB or manual age
    if (!formData.dateOfBirth && (!formData.manualAge || formData.manualAge <= 0)) {
      errors.age = 'Please provide either a date of birth or manual age';
    }

    // Validate DOB is not in the future
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        errors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    if (!formData.microchipNumber?.trim()) {
      errors.microchipNumber = 'Please enter your pet\'s microchip number';
    }

    if (!formData.temperamentSummary?.trim()) {
      errors.temperamentSummary = 'Please provide a temperament summary';
    }

    // Validate photo
    if (!formData.photo) {
      errors.photo = 'Please upload a photo of your pet';
    }

    // Validate insurance provider if insurance is 'yes'
    if (formData.hasPetInsurance === 'yes' && !formData.petInsuranceProvider?.trim()) {
      errors.petInsuranceProvider = 'Please enter your pet insurance provider';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showError('You must be logged in to save pets');
      return;
    }
    
    console.log('[Form] Form submitted, validating...');

    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      
      return;
    }

    // Clear any previous errors
    setValidationErrors({});

    console.log('[Form] Validation passed, saving to database...');
    setAutoSaveStatus('saving');

    try {
      // Upload photo to Supabase Storage if it's a data URL (not already uploaded)
      let photoUrl = formData.photo;
      if (formData.photo && formData.photo.startsWith('data:')) {
        console.log('[Form] Uploading photo to storage...');
        console.log('[Form] Photo size:', (formData.photo.length / 1024).toFixed(2), 'KB (base64)');
        
        const uploadResult = await uploadPetPhoto(formData.photo, user.id, petId || undefined);
        
        if (uploadResult.success && uploadResult.data) {
          photoUrl = uploadResult.data;
          console.log('[Form] ✅ Photo uploaded successfully');
          console.log('[Form] Photo URL:', uploadResult.data);
        } else {
          console.error('[Form] ❌ Failed to upload photo:', uploadResult.error);
          
          // Show detailed error to user
          const errorMessage = uploadResult.error || 'Unknown error occurred';
          showError(`Failed to upload photo: ${errorMessage}`);
          
          setAutoSaveStatus('error');
          return;
        }
      }

      // Generate a temporary pet ID for document uploads if creating new pet
      const tempPetId = petId || `temp_${Date.now()}`;

      // Upload vaccination certificate to Supabase Storage if it exists
      let vaccinationCertificate = formData.vaccinationCertificate;
      if (vaccinationCertificate && vaccinationCertificate.dataUrl) {
        console.log('[Form] Uploading vaccination certificate to storage...');
        console.log('[Form] Document size:', (vaccinationCertificate.size / 1024).toFixed(2), 'KB');
        
        const file = dataURLtoFile(vaccinationCertificate.dataUrl, vaccinationCertificate.name);
        const uploadResult = await uploadPetDocument(file, user.id, tempPetId, 'vaccination');
        
        if (uploadResult.success && uploadResult.data) {
          // RADICAL SIMPLIFICATION: Just store the URL string, not the whole object
          vaccinationCertificate = uploadResult.data as any;  // Store as simple string URL
          console.log('[Form] ✅ Vaccination certificate uploaded successfully');
          console.log('[Form] Public URL:', uploadResult.data);
        } else {
          console.error('[Form] ❌ Failed to upload vaccination certificate:', uploadResult.error);
          
          const errorMessage = uploadResult.error || 'Unknown error occurred';
          showError(`Failed to upload vaccination certificate: ${errorMessage}`);
          
          setAutoSaveStatus('error');
          return;
        }
      }

      // Upload desexing certificate to Supabase Storage if it exists
      let desexingCertificate = formData.desexingCertificate;
      if (desexingCertificate && desexingCertificate.dataUrl) {
        console.log('[Form] Uploading desexing certificate to storage...');
        console.log('[Form] Document size:', (desexingCertificate.size / 1024).toFixed(2), 'KB');
        
        const file = dataURLtoFile(desexingCertificate.dataUrl, desexingCertificate.name);
        const uploadResult = await uploadPetDocument(file, user.id, tempPetId, 'desexing');
        
        if (uploadResult.success && uploadResult.data) {
          // RADICAL SIMPLIFICATION: Just store the URL string, not the whole object
          desexingCertificate = uploadResult.data as any;  // Store as simple string URL
          console.log('[Form] ✅ Desexing certificate uploaded successfully');
          console.log('[Form] Public URL:', uploadResult.data);
        } else {
          console.error('[Form] ❌ Failed to upload desexing certificate:', uploadResult.error);
          
          const errorMessage = uploadResult.error || 'Unknown error occurred';
          showError(`Failed to upload desexing certificate: ${errorMessage}`);
          
          setAutoSaveStatus('error');
          return;
        }
      }

      // Prepare data for saving (replace photo and documents with uploaded URLs)
      const dataToSave = {
        ...formData,
        photo: photoUrl,
        vaccinationCertificate,
        desexingCertificate,
      };
      
      // Debug: Log document data being saved (now just URL strings)
      console.log('[Form] 📄 Document data being saved:', {
        vaccinationCert: vaccinationCertificate,
        desexingCert: desexingCertificate,
        vaccinationType: typeof vaccinationCertificate,
        desexingType: typeof desexingCertificate
      });

      // EDIT MODE: Update existing pet
      if (petId) {
        console.log('[Form] ===== UPDATING EXISTING PET =====');
        console.log('[Form] Pet ID:', petId);
        console.log('[Form] Total fields to save:', Object.keys(dataToSave).length);
        console.log('[Form] Fields:', Object.keys(dataToSave));
        console.log('[Form] Sample data:', {
          petName: dataToSave.petName,
          species: dataToSave.species,
          breed: dataToSave.breed,
          color: dataToSave.color,
          hasExtendedDetails: !!(dataToSave.homeBehaviourSummary || dataToSave.foodType || dataToSave.healthConditions)
        });
        
        const result = await updatePet(petId, dataToSave, user.id);
        
        if (result.success) {
          console.log('[Form] ✅ Pet updated successfully - ALL fields saved to database!');
          console.log('[Form] ✅ Extended fields now sync across devices!');
          
          setAutoSaveStatus('saved');
          success('Pet updated successfully!');
          // Clear localStorage auto-save
          clearPetData();
          // Navigate to preview
          router.push(`/preview?petId=${petId}`);
        } else {
          console.error('[Form] ❌ Failed to update pet:', result.error);
          showError(`Failed to update pet: ${result.error}`);
          setAutoSaveStatus('error');
        }
      }
      // CREATE MODE: Create new pet
      else {
        console.log('[Form] Creating new pet...');
        const result = await createPet(dataToSave, user.id);
        
        if (result.success && result.data) {
          console.log('[Form] ✅ Pet created successfully:', result.data.id);
          setAutoSaveStatus('saved');
          success('Pet created successfully!');
          // Clear localStorage auto-save
          clearPetData();
          // Navigate to preview with new pet ID
          router.push(`/preview?petId=${result.data.id}`);
        } else {
          console.error('[Form] ❌ Failed to create pet:', result.error);
          showError(`Failed to create pet: ${result.error}`);
          setAutoSaveStatus('error');
        }
      }
    } catch (error) {
      console.error('[Form] ❌ Unexpected error:', error);
      showError('An unexpected error occurred. Please try again.');
      setAutoSaveStatus('error');
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <LoadingSpinner size="lg" text="Checking authentication..." overlay={false} />
      </div>
    );
  }

  // Don't render form until authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <BackgroundDecorations />
      
      <NavigationHeader autoSaveStatus={autoSaveStatus} />

      {/* Main Form */}
      <main id="main-content" className="flex-1 pt-24 px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <PageHeader petId={petId} isVisible={isVisible} />

          <form id="pet-resume-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Pet Basics */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
              <h2 className="section-heading">
                1. Pet Basics
              </h2>
              
              <div className="space-y-4">
                {/* Pet Name */}
                <div>
                  <label htmlFor="petName" className="label">
                    Pet Name <span className="text-primary-400">*</span>
                  </label>
                  <input
                    id="petName"
                    type="text"
                    className={`input ${validationErrors.petName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    value={formData.petName || ''}
                    onChange={(e) => {
                      handleTextChange('petName')(e);
                      // Clear error when user starts typing
                      if (validationErrors.petName) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.petName;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder="e.g., Buddy"
                    required
                    aria-invalid={!!validationErrors.petName}
                    aria-describedby={validationErrors.petName ? 'petName-error' : undefined}
                  />
                  {validationErrors.petName && (
                    <p id="petName-error" className="text-red-500 text-sm mt-1" role="alert">
                      {validationErrors.petName}
                    </p>
                  )}
                </div>

                {/* Species */}
                <div>
                  <label htmlFor="species" className="label">
                    Species <span className="text-primary-400">*</span>
                  </label>
                  <select
                    id="species"
                    className="input"
                    value={formData.species || 'dog'}
                    onChange={(e) => {
                      const selectedSpecies = e.target.value;
                      handleSelectChange('species')(e);
                      // Clear custom species when switching away from "other"
                      if (selectedSpecies !== 'other') {
                        setCustomSpecies('');
                      }
                    }}
                    required
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="small-mammal">Small Mammal (Guinea Pig, Hamster, etc.)</option>
                    <option value="fish">Fish</option>
                    <option value="other">Other</option>
                  </select>
                  
                  {/* Show custom species input when "other" is selected */}
                  {formData.species === 'other' && (
                    <input
                      id="customSpecies"
                      type="text"
                      className="input mt-2"
                      value={customSpecies}
                      onChange={(e) => {
                        setCustomSpecies(e.target.value);
                      }}
                      placeholder="Please specify the species (e.g., Ferret, Hedgehog, etc.)"
                    />
                  )}
                </div>

                {/* Breed - Dependent on Species */}
                <div>
                  <label htmlFor="breed" className="label">
                    Breed <span className="text-neutral-400">(Recommended)</span>
                  </label>
                  {formData.species && POPULAR_BREEDS[formData.species] ? (
                    <>
                      <select
                        id="breed"
                        className="input"
                        value={
                          formData.breed && POPULAR_BREEDS[formData.species].includes(formData.breed)
                            ? formData.breed
                            : formData.breed?.startsWith('Mixed Breed')
                            ? 'Mixed Breed'
                            : customBreed
                            ? 'Other'
                            : formData.breed || ''
                        }
                        onChange={(e) => {
                          const selectedBreed = e.target.value;
                          handleSelectChange('breed')(e);
                          // Clear custom breed when switching away from "Other" or "Mixed Breed"
                          if (selectedBreed !== 'Other' && selectedBreed !== 'Mixed Breed') {
                            setCustomBreed('');
                          }
                        }}
                      >
                        <option value="">Select breed...</option>
                        {POPULAR_BREEDS[formData.species].map((breed) => (
                          <option key={breed} value={breed}>
                            {breed}
                          </option>
                        ))}
                      </select>
                      
                      {/* Show custom breed input when "Other" or "Mixed Breed" is selected or custom breed exists */}
                      {(formData.breed === 'Other' || formData.breed === 'Mixed Breed' || 
                        formData.breed?.startsWith('Mixed Breed (') ||
                        (customBreed && !POPULAR_BREEDS[formData.species].includes(formData.breed || ''))) && (
                        <input
                          id="customBreed"
                          type="text"
                          className="input mt-2"
                          value={customBreed}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCustomBreed(value);
                            // Update the actual breed field with the custom value
                            const species = formData.species as keyof typeof POPULAR_BREEDS;
                            const currentSelection = species && POPULAR_BREEDS[species]?.includes(formData.breed || '') 
                              ? formData.breed 
                              : formData.breed?.startsWith('Mixed Breed') 
                              ? 'Mixed Breed' 
                              : 'Other';
                            
                            if (value.trim()) {
                              updateField('breed', currentSelection === 'Mixed Breed' ? `Mixed Breed (${value})` : value);
                            } else {
                              updateField('breed', currentSelection);
                            }
                          }}
                          placeholder={
                            formData.breed?.startsWith('Mixed Breed') || formData.breed === 'Mixed Breed'
                              ? "Enter specific breeds (e.g., Labrador x Poodle)" 
                              : "Enter specific breed name"
                          }
                        />
                      )}
                    </>
                  ) : (
                    <input
                      id="breed"
                      type="text"
                      className="input"
                      value={formData.breed || ''}
                      onChange={handleTextChange('breed')}
                      placeholder="Enter breed"
                    />
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    {(formData.breed === 'Other' || formData.breed === 'Mixed Breed' || 
                      formData.breed?.startsWith('Mixed Breed (') || customBreed)
                      ? "Please specify the breed details in the text box above"
                      : "Choose from popular breeds or select 'Other' or 'Mixed Breed' to enter your own"
                    }
                  </p>
                </div>

                {/* Color - Dependent on Species */}
                <div>
                  <label htmlFor="color" className="label">
                    Color / Markings <span className="text-neutral-400">(Recommended)</span>
                  </label>
                  {formData.species && POPULAR_COLORS[formData.species] ? (
                    <>
                      <select
                        id="color"
                        className="input"
                        value={
                          formData.color && POPULAR_COLORS[formData.species].includes(formData.color)
                            ? formData.color
                            : customColor
                            ? 'Other'
                            : formData.color || ''
                        }
                        onChange={(e) => {
                          const selectedColor = e.target.value;
                          handleSelectChange('color')(e);
                          // Clear custom color when switching away from "Other"
                          if (selectedColor !== 'Other') {
                            setCustomColor('');
                          }
                        }}
                      >
                        <option value="">Select color...</option>
                        {POPULAR_COLORS[formData.species].map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                      
                      {/* Show custom color input when "Other" is selected or custom color exists */}
                      {(formData.color === 'Other' || (customColor && !POPULAR_COLORS[formData.species].includes(formData.color || ''))) && (
                        <input
                          id="customColor"
                          type="text"
                          className="input mt-2"
                          value={customColor}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCustomColor(value);
                            // Keep the actual color value updated
                            if (value.trim()) {
                              updateField('color', value);
                            } else {
                              updateField('color', 'Other');
                            }
                          }}
                          placeholder="Enter specific color or markings (e.g., White with black spots)"
                        />
                      )}
                    </>
                  ) : (
                    <input
                      id="color"
                      type="text"
                      className="input"
                      value={formData.color || ''}
                      onChange={handleTextChange('color')}
                      placeholder="Enter color or markings"
                    />
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    {(formData.color === 'Other' || customColor)
                      ? "Please specify the color or markings in the text box above"
                      : "Choose from popular colors or select 'Other' to enter your own"
                    }
                  </p>
                </div>

                {/* Age/DOB Section with Radio Buttons */}
                <div className={`p-4 rounded-lg space-y-4 ${validationErrors.age || validationErrors.dateOfBirth ? 'bg-red-50 border-2 border-red-200' : 'bg-secondary-50'}`}>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      Date of Birth / Age <span className="text-primary-400">*</span>
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Choose how you'd like to provide your pet's age
                    </p>
                  </div>

                  {(validationErrors.age || validationErrors.dateOfBirth) && (
                    <p className="text-red-500 text-sm font-medium" role="alert">
                      {validationErrors.age || validationErrors.dateOfBirth}
                    </p>
                  )}

                  {/* Radio Button Selection */}
                  <div className="space-y-3">
                    {/* Option 1: Date of Birth (Calendar) - DEFAULT */}
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="age-option-dob"
                        name="age-option"
                        checked={!!formData.dateOfBirth || (!formData.manualAge && !formData.dateOfBirth)}
                        onChange={() => {
                          // Clear manual age when selecting DOB option
                          updateField('manualAge', undefined);
                          updateField('manualAgeUnit', undefined);
                        }}
                        className="mt-1 w-4 h-4 text-primary-400 focus:ring-primary-400"
                      />
                      <div className="flex-1">
                        <label htmlFor="age-option-dob" className="font-medium text-neutral-900 cursor-pointer block mb-2">
                          📅 Date of Birth (Calendar)
                        </label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          disabled={!!formData.manualAge}
                          className={`input ${
                            formData.manualAge ? 'opacity-50 cursor-not-allowed' : ''
                          } ${validationErrors.dateOfBirth ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                          value={formData.dateOfBirth || ''}
                          onChange={(e) => {
                            updateField('dateOfBirth', e.target.value);
                            // Clear manual age if DOB is provided
                            if (e.target.value) {
                              updateField('manualAge', undefined);
                              updateField('manualAgeUnit', undefined);
                            }
                            // Clear errors when user changes value
                            if (validationErrors.dateOfBirth || validationErrors.age) {
                              setValidationErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors.dateOfBirth;
                                delete newErrors.age;
                                return newErrors;
                              });
                            }
                          }}
                          onClick={() => {
                            // Auto-select this radio when clicking date input
                            if (formData.manualAge) {
                              updateField('manualAge', undefined);
                              updateField('manualAgeUnit', undefined);
                            }
                          }}
                          aria-invalid={!!validationErrors.dateOfBirth}
                          aria-describedby={validationErrors.dateOfBirth ? 'dateOfBirth-error' : undefined}
                        />
                        <p className="text-xs text-neutral-500 mt-1">
                          We'll automatically calculate your pet's age
                        </p>
                      </div>
                    </div>

                    {/* Option 2: Manual Age Entry */}
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="age-option-manual"
                        name="age-option"
                        checked={!!formData.manualAge}
                        onChange={() => {
                          // Clear DOB when selecting manual age option
                          updateField('dateOfBirth', undefined);
                        }}
                        className="mt-1 w-4 h-4 text-primary-400 focus:ring-primary-400"
                      />
                      <div className="flex-1">
                        <label htmlFor="age-option-manual" className="font-medium text-neutral-900 cursor-pointer block mb-2">
                          ✍️ Enter Age Manually
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            disabled={!!formData.dateOfBirth}
                            className={`input w-28 ${
                              formData.dateOfBirth ? 'opacity-50 cursor-not-allowed' : ''
                            } ${validationErrors.age ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                            value={formData.manualAge || ''}
                            onChange={(e) => {
                              const value = e.target.value ? parseFloat(e.target.value) : undefined;
                              updateField('manualAge', value);
                              // Clear DOB if manual age is provided
                              if (value) {
                                updateField('dateOfBirth', undefined);
                              }
                              // Clear errors when user changes value
                              if (validationErrors.age) {
                                setValidationErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.age;
                                  return newErrors;
                                });
                              }
                            }}
                            onClick={() => {
                              // Auto-select this radio when clicking input
                              if (formData.dateOfBirth) {
                                updateField('dateOfBirth', undefined);
                              }
                            }}
                            onFocus={() => {
                              // Auto-select this radio when focusing input
                              if (formData.dateOfBirth) {
                                updateField('dateOfBirth', undefined);
                              }
                            }}
                            placeholder="e.g., 3"
                            min="0"
                            step="0.1"
                            aria-invalid={!!validationErrors.age}
                            aria-describedby={validationErrors.age ? 'age-error' : undefined}
                          />
                          <select
                            disabled={!!formData.dateOfBirth}
                            className={`input flex-1 max-w-[140px] ${formData.dateOfBirth ? 'opacity-50 cursor-not-allowed' : ''}`}
                            value={formData.manualAgeUnit || 'years'}
                            onChange={(e) => {
                              handleSelectChange('manualAgeUnit')(e);
                              // Auto-select this radio when changing unit
                              if (formData.dateOfBirth) {
                                updateField('dateOfBirth', undefined);
                              }
                            }}
                            onFocus={() => {
                              // Auto-select this radio when focusing dropdown
                              if (formData.dateOfBirth) {
                                updateField('dateOfBirth', undefined);
                              }
                            }}
                          >
                            <option value="weeks">Week(s)</option>
                            <option value="months">Month(s)</option>
                            <option value="years">Year(s)</option>
                          </select>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          For approximate ages or if you don't know the exact date
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label htmlFor="size" className="label">
                    Size <span className="text-neutral-400">(Recommended)</span>
                  </label>
                  <select
                    id="size"
                    className="input"
                    value={formData.size || ''}
                    onChange={handleSelectChange('size')}
                  >
                    <option value="">Select size...</option>
                    <option value="xs">Extra Small (XS)</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large (XL)</option>
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weightKg" className="label">
                    Weight (kg) <span className="text-neutral-400">(Recommended)</span>
                  </label>
                  <input
                    id="weightKg"
                    type="number"
                    className="input"
                    value={formData.weightKg || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      updateField('weightKg', value);
                    }}
                    placeholder="e.g., 15.5"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Enter weight in kilograms
                  </p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label htmlFor="photo" className="label">
                    Pet Photo <span className="text-primary-400">*</span>
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className={`input ${validationErrors.photo ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''} ${uploadingFile === 'photo' ? 'opacity-50 cursor-wait' : ''}`}
                    onChange={(e) => {
                      handleFileUpload('photo')(e);
                      if (validationErrors.photo) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.photo;
                          return newErrors;
                        });
                      }
                    }}
                    disabled={uploadingFile === 'photo'}
                    aria-invalid={!!validationErrors.photo}
                    aria-describedby={validationErrors.photo ? 'photo-error' : undefined}
                    aria-busy={uploadingFile === 'photo'}
                  />
                  {uploadingFile === 'photo' && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-400"></div>
                      <span>Uploading photo...</span>
                    </div>
                  )}
                  {validationErrors.photo && (
                    <p id="photo-error" className="text-red-500 text-sm mt-1" role="alert">
                      {validationErrors.photo}
                    </p>
                  )}
                  {formData.photo && uploadingFile !== 'photo' && (
                    <div className="mt-2">
                      <img 
                        src={formData.photo} 
                        alt="Pet preview" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-primary-200"
                      />
                      <p className="text-xs text-secondary-600 mt-1">✓ Photo uploaded</p>
                    </div>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    Clear, recent photo of your pet (max 5MB)
                  </p>
                </div>
              </div>
              </div>
            </section>

            {/* Section 2: Identification & Legal */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
              <h2 className="section-heading">
                2. Identification & Legal
              </h2>
              
              <div className="space-y-4">
                {/* Microchip Number */}
                <div>
                  <label htmlFor="microchipNumber" className="label">
                    Microchip Number <span className="text-primary-400">*</span>
                  </label>
                  <input
                    id="microchipNumber"
                    type="text"
                    className={`input ${validationErrors.microchipNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    value={formData.microchipNumber || ''}
                    onChange={(e) => {
                      handleTextChange('microchipNumber')(e);
                      if (validationErrors.microchipNumber) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.microchipNumber;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder="e.g., 900123456789012"
                    required
                    aria-invalid={!!validationErrors.microchipNumber}
                    aria-describedby={validationErrors.microchipNumber ? 'microchipNumber-error' : undefined}
                  />
                  {validationErrors.microchipNumber && (
                    <p id="microchipNumber-error" className="text-red-500 text-sm mt-1" role="alert">
                      {validationErrors.microchipNumber}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    Required by law in Australia
                  </p>
                </div>

                {/* Council Registration */}
                <div>
                  <label htmlFor="councilRegistrationNumber" className="label">
                    Council Registration Number <span className="text-neutral-400">(Optional)</span>
                  </label>
                  <input
                    id="councilRegistrationNumber"
                    type="text"
                    className="input"
                    value={formData.councilRegistrationNumber || ''}
                    onChange={handleTextChange('councilRegistrationNumber')}
                    placeholder="e.g., CR123456"
                  />
                </div>
              </div>
              </div>
            </section>

            {/* Section 3: Health, Safety & Insurance + Documents */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
              <h2 className="section-heading">
                3. Health, Safety & Insurance
              </h2>
              
              <div className="space-y-6">
                {/* Desexed (spayed/neutered) */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    My pet is desexed (spayed/neutered) <span className="text-primary-400">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="desexed"
                        value="yes"
                        checked={formData.desexed === 'yes'}
                        onChange={(e) => updateField('desexed', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="desexed"
                        value="no"
                        checked={formData.desexed === 'no'}
                        onChange={(e) => updateField('desexed', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="desexed"
                        value="n/a"
                        checked={formData.desexed === 'n/a'}
                        onChange={(e) => updateField('desexed', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">N/A</span>
                    </label>
                  </div>
                </div>

                {/* Vaccinations Up to Date */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Vaccinations are up to date <span className="text-primary-400">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="vaccinationsUpToDate"
                        value="yes"
                        checked={formData.vaccinationsUpToDate === 'yes'}
                        onChange={(e) => updateField('vaccinationsUpToDate', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="vaccinationsUpToDate"
                        value="no"
                        checked={formData.vaccinationsUpToDate === 'no'}
                        onChange={(e) => updateField('vaccinationsUpToDate', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="vaccinationsUpToDate"
                        value="n/a"
                        checked={formData.vaccinationsUpToDate === 'n/a'}
                        onChange={(e) => updateField('vaccinationsUpToDate', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">N/A</span>
                    </label>
                  </div>
                </div>

                {/* Flea/Worm Treatment Status */}
                <div className="p-4 bg-primary-50 rounded-lg">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Flea/Worm Treatment Current <span className="text-neutral-400">(Optional)</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fleaWormTreatmentStatus"
                        value="yes"
                        checked={formData.fleaWormTreatmentStatus === 'yes'}
                        onChange={(e) => updateField('fleaWormTreatmentStatus', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fleaWormTreatmentStatus"
                        value="no"
                        checked={formData.fleaWormTreatmentStatus === 'no'}
                        onChange={(e) => updateField('fleaWormTreatmentStatus', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fleaWormTreatmentStatus"
                        value="n/a"
                        checked={formData.fleaWormTreatmentStatus === 'n/a'}
                        onChange={(e) => updateField('fleaWormTreatmentStatus', e.target.value)}
                        className="w-4 h-4 text-primary-400"
                      />
                      <span className="text-sm">N/A</span>
                    </label>
                  </div>
                </div>

                {/* Last Flea/Worm Treatment Date - Only shows if treatment status = yes */}
                {formData.fleaWormTreatmentStatus === 'yes' && (
                  <div>
                    <label htmlFor="lastFleaWormTreatmentDate" className="label">
                      Last Flea/Worm Treatment <span className="text-neutral-400">(Optional)</span>
                    </label>
                    <input
                      id="lastFleaWormTreatmentDate"
                      type="text"
                      className="input"
                      value={formData.lastFleaWormTreatmentDate || ''}
                      onChange={handleTextChange('lastFleaWormTreatmentDate')}
                      placeholder="e.g., November 2024"
                    />
                  </div>
                )}

                {/* Pet Insurance */}
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    My pet has insurance <span className="text-neutral-400">(Optional)</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasPetInsurance"
                        value="yes"
                        checked={formData.hasPetInsurance === 'yes'}
                        onChange={(e) => updateField('hasPetInsurance', e.target.value)}
                        className="w-4 h-4 text-secondary-400"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasPetInsurance"
                        value="no"
                        checked={formData.hasPetInsurance === 'no'}
                        onChange={(e) => updateField('hasPetInsurance', e.target.value)}
                        className="w-4 h-4 text-secondary-400"
                      />
                      <span className="text-sm">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasPetInsurance"
                        value="n/a"
                        checked={formData.hasPetInsurance === 'n/a'}
                        onChange={(e) => updateField('hasPetInsurance', e.target.value)}
                        className="w-4 h-4 text-secondary-400"
                      />
                      <span className="text-sm">N/A</span>
                    </label>
                  </div>
                </div>

                {/* Insurance Provider (conditional) */}
                {formData.hasPetInsurance === 'yes' && (
                  <div>
                    <label htmlFor="petInsuranceProvider" className="label">
                      Insurance Provider <span className="text-primary-400">*</span>
                    </label>
                    <input
                      id="petInsuranceProvider"
                      type="text"
                      className={`input ${validationErrors.petInsuranceProvider ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                      value={formData.petInsuranceProvider || ''}
                      onChange={(e) => {
                        handleTextChange('petInsuranceProvider')(e);
                        if (validationErrors.petInsuranceProvider) {
                          setValidationErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.petInsuranceProvider;
                            return newErrors;
                          });
                        }
                      }}
                      placeholder="e.g., RSPCA Pet Insurance, PetSure"
                      required
                      aria-invalid={!!validationErrors.petInsuranceProvider}
                      aria-describedby={validationErrors.petInsuranceProvider ? 'petInsuranceProvider-error' : undefined}
                    />
                    {validationErrors.petInsuranceProvider && (
                      <p id="petInsuranceProvider-error" className="text-red-500 text-sm mt-1" role="alert">
                        {validationErrors.petInsuranceProvider}
                    </p>
                  )}
                  </div>
                )}

                {/* Conditional Document Uploads */}
                {(formData.desexed === 'yes' || formData.vaccinationsUpToDate === 'yes') && (
                  <div className="pt-6 border-t border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Required Documents
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      Upload certificates for verification. These will be noted on your resume (full documents can be sent separately to landlords).
                    </p>
                    
                    <div className="space-y-4">
                      {/* Desexing Certificate - Only shows if desexed = yes */}
                      {formData.desexed === 'yes' && (
                        <div>
                          <label htmlFor="desexingCertificate" className="label">
                            Desexing Certificate
                          </label>
                          <input
                            id="desexingCertificate"
                            type="file"
                            accept="image/*,application/pdf"
                            className="input"
                            onChange={handleFileUpload('desexingCertificate')}
                          />
                          {formData.desexingCertificate && (
                            <p className="text-xs text-secondary-600 mt-1">
                              ✓ {formData.desexingCertificate.name}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Vaccination Certificate - Only shows if vaccinations = yes */}
                      {formData.vaccinationsUpToDate === 'yes' && (
                        <div>
                          <label htmlFor="vaccinationCertificate" className="label">
                            Vaccination Certificate
                          </label>
                          <input
                            id="vaccinationCertificate"
                            type="file"
                            accept="image/*,application/pdf"
                            className="input"
                            onChange={handleFileUpload('vaccinationCertificate')}
                          />
                          {formData.vaccinationCertificate && (
                            <p className="text-xs text-secondary-600 mt-1">
                              ✓ {formData.vaccinationCertificate.name}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              </div>
            </section>

            {/* Section 4: Behaviour & Living Situation */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
              <h2 className="section-heading">
                4. Behaviour & Living Situation
              </h2>
              
              <div className="space-y-4">
                {/* Temperament Summary */}
                <div>
                  <label htmlFor="temperamentSummary" className="label">
                    Temperament Summary <span className="text-primary-400">*</span>
                  </label>
                  <textarea
                    id="temperamentSummary"
                    className={`textarea ${validationErrors.temperamentSummary ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    value={formData.temperamentSummary || ''}
                    onChange={(e) => {
                      handleTextChange('temperamentSummary')(e);
                      if (validationErrors.temperamentSummary) {
                        setValidationErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.temperamentSummary;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder="Describe your pet's personality in 2-3 sentences. E.g., 'Buddy is a friendly, calm dog who loves people. He's well-behaved indoors and rarely barks. Great with children and other pets.'"
                    rows={4}
                    required
                    aria-invalid={!!validationErrors.temperamentSummary}
                    aria-describedby={validationErrors.temperamentSummary ? 'temperamentSummary-error' : undefined}
                  />
                  {validationErrors.temperamentSummary && (
                    <p id="temperamentSummary-error" className="text-red-500 text-sm mt-1" role="alert">
                      {validationErrors.temperamentSummary}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    2-3 sentences about your pet's personality and behaviour
                  </p>
                </div>

                {/* Living Location */}
                <div>
                  <label htmlFor="livingLocation" className="label">
                    Where does your pet usually stay? <span className="text-primary-400">*</span>
                  </label>
                  <select
                    id="livingLocation"
                    className="input"
                    value={formData.livingLocation || 'indoors'}
                    onChange={handleSelectChange('livingLocation')}
                    required
                  >
                    <option value="indoors">Indoors</option>
                    <option value="outdoors">Outdoors</option>
                    <option value="mix">Mix (Indoor & Outdoor)</option>
                  </select>
                </div>

                {/* Good With (Multi-select) */}
                <div>
                  <label className="label">
                    Good With <span className="text-neutral-400">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(['kids', 'babies', 'dogs', 'cats', 'elderly', 'tradespeople'] as GoodWithOption[]).map((option) => (
                      <div 
                        key={option}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.goodWith?.includes(option)
                            ? 'border-primary-400 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-200'
                        }`}
                        onClick={() => toggleGoodWith(option)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.goodWith?.includes(option) || false}
                            onChange={() => toggleGoodWith(option)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium capitalize">
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Noise Level */}
                <div>
                  <label htmlFor="noiseLevel" className="label">
                    Noise Level <span className="text-primary-400">*</span>
                  </label>
                  <select
                    id="noiseLevel"
                    className="input"
                    value={formData.noiseLevel || 'low'}
                    onChange={handleSelectChange('noiseLevel')}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  
                  {/* Conditional: Show description field if noise level is not Low */}
                  {formData.noiseLevel && formData.noiseLevel !== 'low' && (
                    <div className="mt-3">
                      <label htmlFor="noiseLevelDescription" className="label">
                        Please briefly describe when/why your pet is noisy
                      </label>
                      <textarea
                        id="noiseLevelDescription"
                        className="input min-h-[80px]"
                        value={formData.noiseLevelDescription || ''}
                        onChange={handleTextChange('noiseLevelDescription')}
                        placeholder="E.g., barks at doorbell, meows when hungry, chirps in the morning..."
                        rows={2}
                      />
                    </div>
                  )}
                </div>

                {/* House Training Status */}
                <div>
                  <label htmlFor="houseTrainingStatus" className="label">
                    House Training Status <span className="text-primary-400">*</span>
                  </label>
                  <select
                    id="houseTrainingStatus"
                    className="input"
                    value={formData.houseTrainingStatus || 'fully-house-trained'}
                    onChange={handleSelectChange('houseTrainingStatus')}
                    required
                  >
                    <option value="fully-house-trained">Fully House-Trained</option>
                    <option value="crate-trained">Crate-Trained</option>
                    <option value="still-learning">Still Learning</option>
                    <option value="not-yet-trained">Not Yet Trained</option>
                    <option value="not-applicable">Not applicable</option>
                  </select>
                </div>
              </div>
              </div>
            </section>

            {/* Navigation Bar with Extended Details Toggle */}
            <FormNavigationBar 
              showExtendedDetails={showExtendedDetails}
              setShowExtendedDetails={setShowExtendedDetails}
              validationErrors={validationErrors}
              position="top"
            />

            {/* Extended Sections - Collapsible */}
            {showExtendedDetails && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-gradient-to-r from-primary-100/50 to-secondary-100/50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-neutral-700">
                    <strong>📋 Tip:</strong> These fields are optional but highly valuable for pet sitters and boarding facilities. Fill out what you can!
                  </p>
                </div>

            {/* Section 6: Landlord Reassurance (Rental Specific) */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  5. Landlord Reassurance <span className="text-neutral-400 text-sm font-normal">(Optional - for rentals)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Additional information to reassure property managers and landlords.
                </p>
                
                <div className="space-y-4">
                  {/* Property Damage History */}
                  <div>
                    <label htmlFor="propertyDamageHistory" className="label">
                      Property Damage History
                    </label>
                    <select
                      id="propertyDamageHistory"
                      className="input"
                      value={formData.propertyDamageHistory || ''}
                      onChange={handleSelectChange('propertyDamageHistory')}
                    >
                      <option value="">Select...</option>
                      <option value="No damage">No damage</option>
                      <option value="Minor wear only">Minor wear only</option>
                    </select>
                    <p className="text-xs text-neutral-500 mt-1">
                      Landlords want to see that the pet is low-risk
                    </p>
                  </div>

                  {/* Rental Specific Notes */}
                  <div>
                    <label htmlFor="rentalSpecificNotes" className="label">
                      Rental Notes
                    </label>
                    <textarea
                      id="rentalSpecificNotes"
                      className="input min-h-[100px]"
                      value={formData.rentalSpecificNotes || ''}
                      onChange={handleTextChange('rentalSpecificNotes')}
                      placeholder="Short, positive note emphasising cleanliness, routine, and responsible ownership..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Feeding & Treats */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  6. Feeding & Treats <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Tell pet sitters what, when, and how much to feed.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Food Type */}
                    <div>
                      <label htmlFor="foodType" className="label">
                        Food Type & Brand
                      </label>
                      <input
                        id="foodType"
                        type="text"
                        className="input"
                        value={formData.foodType || ''}
                        onChange={handleTextChange('foodType')}
                        placeholder="e.g., Royal Canin Adult Dry Food"
                      />
                    </div>

                    {/* Feeding Schedule */}
                    <div>
                      <label htmlFor="feedingSchedule" className="label">
                        Feeding Times
                      </label>
                      <input
                        id="feedingSchedule"
                        type="text"
                        className="input"
                        value={formData.feedingSchedule || ''}
                        onChange={handleTextChange('feedingSchedule')}
                        placeholder="e.g., 7am and 6pm"
                      />
                    </div>
                  </div>

                  {/* Portion Size */}
                  <div>
                    <label htmlFor="portionSize" className="label">
                      Portion Size
                    </label>
                    <input
                      id="portionSize"
                      type="text"
                      className="input"
                      value={formData.portionSize || ''}
                      onChange={handleTextChange('portionSize')}
                      placeholder="Cups or grams per meal"
                    />
                  </div>

                  {/* Treats Allowed */}
                  <div>
                    <label htmlFor="treatsAllowed" className="label">
                      Treats Allowed
                    </label>
                    <textarea
                      id="treatsAllowed"
                      className="input min-h-[80px]"
                      value={formData.treatsAllowed || ''}
                      onChange={handleTextChange('treatsAllowed')}
                      placeholder="Which treats are okay and which to avoid..."
                      rows={2}
                    />
                  </div>

                  {/* Food Allergies */}
                  <div>
                    <label htmlFor="foodAllergies" className="label">
                      Food Allergies / Sensitivities
                    </label>
                    <textarea
                      id="foodAllergies"
                      className="input min-h-[80px]"
                      value={formData.foodAllergies || ''}
                      onChange={handleTextChange('foodAllergies')}
                      placeholder="Any foods to avoid..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Health & Medications */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  7. Health & Medications <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Help sitters manage your pet's health safely.
                </p>
                
                <div className="space-y-4">
                  {/* Health Conditions */}
                  <div>
                    <label htmlFor="healthConditions" className="label">
                      Existing Health Conditions
                    </label>
                    <textarea
                      id="healthConditions"
                      className="input min-h-[80px]"
                      value={formData.healthConditions || ''}
                      onChange={handleTextChange('healthConditions')}
                      placeholder="Any ongoing health issues..."
                      rows={2}
                    />
                  </div>

                  {/* Medications */}
                  <div>
                    <label htmlFor="medications" className="label">
                      Medications (name, dose, time, how to give)
                    </label>
                    <textarea
                      id="medications"
                      className="input min-h-[100px]"
                      value={formData.medications || ''}
                      onChange={handleTextChange('medications')}
                      placeholder="List medications with dosage and timing..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vet Clinic Name */}
                    <div>
                      <label htmlFor="vetClinicName" className="label">
                        Vet Clinic Name
                      </label>
                      <input
                        id="vetClinicName"
                        type="text"
                        className="input"
                        value={formData.vetClinicName || ''}
                        onChange={handleTextChange('vetClinicName')}
                        placeholder="Your regular vet clinic"
                      />
                    </div>

                    {/* Vet Clinic Phone */}
                    <div>
                      <label htmlFor="vetClinicPhone" className="label">
                        Vet Clinic Phone
                      </label>
                      <input
                        id="vetClinicPhone"
                        type="tel"
                        className="input"
                        value={formData.vetClinicPhone || ''}
                        onChange={handleTextChange('vetClinicPhone')}
                        placeholder="0412 345 678"
                      />
                    </div>
                  </div>

                  {/* Emergency Vet Details */}
                  <div>
                    <label htmlFor="emergencyVetDetails" className="label">
                      Emergency Vet (if different)
                    </label>
                    <textarea
                      id="emergencyVetDetails"
                      className="input min-h-[80px]"
                      value={formData.emergencyVetDetails || ''}
                      onChange={handleTextChange('emergencyVetDetails')}
                      placeholder="After-hours emergency vet contact..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Daily Routine */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  8. Daily Routine <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Help sitters keep your pet's day predictable.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Wake Time */}
                  <div>
                    <label htmlFor="wakeTime" className="label">
                      Typical Wake Time
                    </label>
                    <input
                      id="wakeTime"
                      type="text"
                      className="input"
                      value={formData.wakeTime || ''}
                      onChange={handleTextChange('wakeTime')}
                      placeholder="e.g., 7:00 AM"
                    />
                  </div>

                  {/* Bedtime */}
                  <div>
                    <label htmlFor="bedtime" className="label">
                      Bedtime
                    </label>
                    <input
                      id="bedtime"
                      type="text"
                      className="input"
                      value={formData.bedtime || ''}
                      onChange={handleTextChange('bedtime')}
                      placeholder="e.g., 9:30 PM"
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  {/* Walk/Play Times */}
                  <div>
                    <label htmlFor="walkPlayTimes" className="label">
                      Usual Walk / Play Times
                    </label>
                    <textarea
                      id="walkPlayTimes"
                      className="input min-h-[80px]"
                      value={formData.walkPlayTimes || ''}
                      onChange={handleTextChange('walkPlayTimes')}
                      placeholder="When does your pet typically get exercise?"
                      rows={2}
                    />
                  </div>

                  {/* Nap Times */}
                  <div>
                    <label htmlFor="napTimes" className="label">
                      Usual Nap Times
                    </label>
                    <textarea
                      id="napTimes"
                      className="input min-h-[80px]"
                      value={formData.napTimes || ''}
                      onChange={handleTextChange('napTimes')}
                      placeholder="When does your pet usually rest?"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10: Exercise & Play */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  9. Exercise & Play <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Help sitters provide the right amount and type of exercise.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Exercise Level */}
                    <div>
                      <label htmlFor="exerciseLevel" className="label">
                        Exercise Level
                      </label>
                      <select
                        id="exerciseLevel"
                        className="input"
                        value={formData.exerciseLevel || ''}
                        onChange={handleSelectChange('exerciseLevel')}
                      >
                        <option value="">Select...</option>
                        <option value="Low">Low</option>
                        <option value="Low-Moderate">Low-Moderate</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Moderate-High">Moderate-High</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    {/* Off-Lead Allowed */}
                    <div>
                      <label htmlFor="offLeadAllowed" className="label">
                        Off-lead Allowed
                      </label>
                      <select
                        id="offLeadAllowed"
                        className="input"
                        value={formData.offLeadAllowed || ''}
                        onChange={handleSelectChange('offLeadAllowed')}
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Only in secure areas">Only in secure areas</option>
                        <option value="Not applicable">Not applicable</option>
                      </select>
                    </div>
                  </div>

                  {/* Daily Exercise Amount */}
                  <div>
                    <label htmlFor="dailyExerciseAmount" className="label">
                      Daily Exercise Amount
                    </label>
                    <input
                      id="dailyExerciseAmount"
                      type="text"
                      className="input"
                      value={formData.dailyExerciseAmount || ''}
                      onChange={handleTextChange('dailyExerciseAmount')}
                      placeholder="e.g., 2 x 20 minute walks"
                    />
                  </div>

                  {/* Favourite Games */}
                  <div>
                    <label htmlFor="favouriteGames" className="label">
                      Favourite Games
                    </label>
                    <textarea
                      id="favouriteGames"
                      className="input min-h-[80px]"
                      value={formData.favouriteGames || ''}
                      onChange={handleTextChange('favouriteGames')}
                      placeholder="What games does your pet enjoy?"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 11: Training & Commands */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  10. Training & Commands <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Help sitters communicate effectively with your pet.
                </p>
                
                <div className="space-y-4">
                  {/* Training Level */}
                  <div>
                    <label htmlFor="trainingLevel" className="label">
                      Training Level
                    </label>
                    <select
                      id="trainingLevel"
                      className="input"
                      value={formData.trainingLevel || ''}
                      onChange={handleSelectChange('trainingLevel')}
                    >
                      <option value="">Select...</option>
                      {formData.species === 'dog' && (
                        <option value="Puppy">Puppy</option>
                      )}
                      <option value="Basic">Basic</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Still learning">Still learning</option>
                    </select>
                  </div>

                  {/* Commands Known */}
                  <div>
                    <label htmlFor="commandsKnown" className="label">
                      Commands Known
                    </label>
                    <textarea
                      id="commandsKnown"
                      className="input min-h-[80px]"
                      value={formData.commandsKnown || ''}
                      onChange={handleTextChange('commandsKnown')}
                      placeholder="List commands like Sit, Drop, Stay, Come, Leave it, etc."
                      rows={2}
                    />
                  </div>

                  {/* Walking Style */}
                  <div>
                    <label htmlFor="walkingStyle" className="label">
                      Walking Style
                    </label>
                    <textarea
                      id="walkingStyle"
                      className="input min-h-[80px]"
                      value={formData.walkingStyle || ''}
                      onChange={handleTextChange('walkingStyle')}
                      placeholder="Pulls on leash, needs harness, reacts to other dogs, etc."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 12: Alone Time & Comfort */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  11. Alone Time & Comfort <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Important information about leaving your pet alone.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Max Alone Hours */}
                    <div>
                      <label htmlFor="maxAloneHours" className="label">
                        Max Time Alone (hours)
                      </label>
                      <input
                        id="maxAloneHours"
                        type="number"
                        min="0"
                        max="24"
                        className="input"
                        value={formData.maxAloneHours || ''}
                        onChange={(e) => updateField('maxAloneHours', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="e.g., 6"
                      />
                    </div>

                    {/* Separation Anxiety Level */}
                    <div>
                      <label htmlFor="separationAnxietyLevel" className="label">
                        Separation Anxiety
                      </label>
                      <select
                        id="separationAnxietyLevel"
                        className="input"
                        value={formData.separationAnxietyLevel || ''}
                        onChange={handleSelectChange('separationAnxietyLevel')}
                      >
                        <option value="">Select...</option>
                        <option value="None">None</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional: Show description field if separation anxiety is not None */}
                  {formData.separationAnxietyLevel && formData.separationAnxietyLevel !== 'None' && formData.separationAnxietyLevel !== '' && (
                    <div>
                      <label htmlFor="separationAnxietyDescription" className="label">
                        What happens when they're left alone? (describe behaviours)
                      </label>
                      <textarea
                        id="separationAnxietyDescription"
                        className="input min-h-[80px]"
                        value={formData.separationAnxietyDescription || ''}
                        onChange={handleTextChange('separationAnxietyDescription')}
                        placeholder="E.g., whining, pacing, destructive behavior, excessive barking..."
                        rows={2}
                      />
                    </div>
                  )}

                  {/* Safe Places */}
                  <div>
                    <label htmlFor="safePlaces" className="label">
                      Safe Places
                    </label>
                    <textarea
                      id="safePlaces"
                      className="input min-h-[80px]"
                      value={formData.safePlaces || ''}
                      onChange={handleTextChange('safePlaces')}
                      placeholder="Describe spots/areas where your pet feels safe (e.g., under the bed, crate, favorite corner...)"
                      rows={2}
                    />
                  </div>

                  {/* Safe Spaces (Where They're Comfortable Being Left) */}
                  <div>
                    <label htmlFor="safeSpaces" className="label">
                      Where They're Comfortable Being Left
                    </label>
                    <textarea
                      id="safeSpaces"
                      className="input min-h-[80px]"
                      value={formData.safeSpaces || ''}
                      onChange={handleTextChange('safeSpaces')}
                      placeholder="Crate, laundry, free roam, backyard, etc."
                      rows={2}
                    />
                  </div>

                  {/* Escape Risk */}
                  <div>
                    <label htmlFor="escapeRisk" className="label">
                      Escape Risk / Notes
                    </label>
                    <textarea
                      id="escapeRisk"
                      className="input min-h-[80px]"
                      value={formData.escapeRisk || ''}
                      onChange={handleTextChange('escapeRisk')}
                      placeholder="Fence jumper, door dasher, digger, etc."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 13: Sleeping & House Rules */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  12. Sleeping & House Rules <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Where and how your pet sleeps, and any house rules.
                </p>
                
                <div className="space-y-4">
                  {/* Sleeping Location */}
                  <div>
                    <label htmlFor="sleepingLocation" className="label">
                      Usual Sleeping Location
                    </label>
                    <select
                      id="sleepingLocation"
                      className="input"
                      value={
                        formData.sleepingLocation?.startsWith('Other:')
                          ? 'Other'
                          : customSleepingLocation
                          ? 'Other'
                          : formData.sleepingLocation || ''
                      }
                      onChange={(e) => {
                        const selectedLocation = e.target.value;
                        handleSelectChange('sleepingLocation')(e);
                        // Clear custom sleeping location when switching away from "Other"
                        if (selectedLocation !== 'Other') {
                          setCustomSleepingLocation('');
                        }
                      }}
                    >
                      <option value="">Select...</option>
                      
                      {/* Species-specific options */}
                      {formData.species === 'dog' && (
                        <>
                          <option value="Crate">Crate</option>
                          <option value="Dog bed">Dog bed</option>
                          <option value="Owner's bed">Owner's bed</option>
                          <option value="Couch">Couch</option>
                        </>
                      )}
                      
                      {formData.species === 'cat' && (
                        <>
                          <option value="Cat bed">Cat bed</option>
                          <option value="Owner's bed">Owner's bed</option>
                          <option value="Cat tree">Cat tree</option>
                          <option value="Couch">Couch</option>
                        </>
                      )}
                      
                      {formData.species === 'bird' && (
                        <>
                          <option value="Cage">Cage</option>
                          <option value="Sleep perch">Sleep perch</option>
                        </>
                      )}
                      
                      {(formData.species === 'rabbit' || formData.species === 'guinea-pig' || formData.species === 'hamster') && (
                        <>
                          <option value="Hutch/Enclosure">Hutch/Enclosure</option>
                          <option value="Indoor pen">Indoor pen</option>
                          <option value="Owner's bed">Owner's bed</option>
                        </>
                      )}
                      
                      {/* For reptiles, fish, and other species without specific sleeping locations */}
                      {(formData.species === 'reptile' || formData.species === 'fish') && (
                        <>
                          <option value="Enclosure">Enclosure</option>
                          <option value="Tank">Tank</option>
                        </>
                      )}
                      
                      {/* Common options for species not covered above or no species selected */}
                      {!formData.species && (
                        <>
                          <option value="Crate">Crate</option>
                          <option value="Pet bed">Pet bed</option>
                          <option value="Owner's bed">Owner's bed</option>
                          <option value="Couch">Couch</option>
                        </>
                      )}
                      
                      {/* Always available options */}
                      <option value="Not applicable">Not applicable</option>
                      <option value="Other">Other</option>
                    </select>
                    
                    {/* Show custom sleeping location input when "Other" is selected */}
                    {(formData.sleepingLocation === 'Other' || formData.sleepingLocation?.startsWith('Other:') || customSleepingLocation) && (
                      <input
                        id="customSleepingLocation"
                        type="text"
                        className="input mt-2"
                        value={customSleepingLocation}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomSleepingLocation(value);
                          // Update the actual sleeping location field with the custom value
                          if (value.trim()) {
                            updateField('sleepingLocation', `Other: ${value}`);
                          } else {
                            updateField('sleepingLocation', 'Other');
                          }
                        }}
                        placeholder="Please specify the sleeping location"
                      />
                    )}
                  </div>

                  {/* Furniture Rules */}
                  <div>
                    <label htmlFor="furnitureRules" className="label">
                      Furniture Rules
                    </label>
                    <textarea
                      id="furnitureRules"
                      className="input min-h-[80px]"
                      value={formData.furnitureRules || ''}
                      onChange={handleTextChange('furnitureRules')}
                      placeholder="Allowed on couch, bed, only by invitation, not allowed, etc."
                      rows={2}
                    />
                  </div>

                  {/* Bedtime Rituals */}
                  <div>
                    <label htmlFor="bedtimeRituals" className="label">
                      Bedtime Rituals
                    </label>
                    <textarea
                      id="bedtimeRituals"
                      className="input min-h-[80px]"
                      value={formData.bedtimeRituals || ''}
                      onChange={handleTextChange('bedtimeRituals')}
                      placeholder="Any bedtime routines or habits?"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 14: Triggers & Safety */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  13. Triggers & Safety <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Important safety information about fears and triggers.
                </p>
                
                <div className="space-y-4">
                  {/* Fears and Triggers */}
                  <div>
                    <label htmlFor="fearsAndTriggers" className="label">
                      Fears & Triggers
                    </label>
                    <textarea
                      id="fearsAndTriggers"
                      className="input min-h-[100px]"
                      value={formData.fearsAndTriggers || ''}
                      onChange={handleTextChange('fearsAndTriggers')}
                      placeholder="Thunder, fireworks, loud trucks, certain people, etc."
                      rows={3}
                    />
                  </div>

                  {/* Reactivity Notes */}
                  <div>
                    <label htmlFor="reactivityNotes" className="label">
                      Reactivity Notes
                    </label>
                    <textarea
                      id="reactivityNotes"
                      className="input min-h-[100px]"
                      value={formData.reactivityNotes || ''}
                      onChange={handleTextChange('reactivityNotes')}
                      placeholder="On-leash reactivity, resource guarding, etc."
                      rows={3}
                    />
                  </div>

                  {/* Bite History */}
                  <div>
                    <label htmlFor="biteHistory" className="label">
                      Bite History (if any, context only)
                    </label>
                    <textarea
                      id="biteHistory"
                      className="input min-h-[80px]"
                      value={formData.biteHistory || ''}
                      onChange={handleTextChange('biteHistory')}
                      placeholder="Any bite incidents and context..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 15: Grooming & Handling */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  14. Grooming & Handling <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Grooming routine and any sensitive areas.
                </p>
                
                <div className="space-y-4">
                  {/* Brushing Preferences */}
                  <div>
                    <label htmlFor="brushingPreferences" className="label">
                      Brushing (how often, okay with it?)
                    </label>
                    <textarea
                      id="brushingPreferences"
                      className="input min-h-[80px]"
                      value={formData.brushingPreferences || ''}
                      onChange={handleTextChange('brushingPreferences')}
                      placeholder="Frequency and preferences..."
                      rows={2}
                    />
                  </div>

                  {/* Bathing Preferences */}
                  <div>
                    <label htmlFor="bathingPreferences" className="label">
                      Bathing (how often, any special shampoo?)
                    </label>
                    <textarea
                      id="bathingPreferences"
                      className="input min-h-[80px]"
                      value={formData.bathingPreferences || ''}
                      onChange={handleTextChange('bathingPreferences')}
                      placeholder="Bath schedule and preferences..."
                      rows={2}
                    />
                  </div>

                  {/* Sensitive Areas */}
                  <div>
                    <label htmlFor="sensitiveAreas" className="label">
                      Sensitive Areas
                    </label>
                    <textarea
                      id="sensitiveAreas"
                      className="input min-h-[80px]"
                      value={formData.sensitiveAreas || ''}
                      onChange={handleTextChange('sensitiveAreas')}
                      placeholder="Paws, ears, tail, etc."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 16: Emergency Plan */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  15. Emergency Plan <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Important emergency contact and spending information.
                </p>
                
                <div className="space-y-4">
                  {/* Emergency Contacts */}
                  <div>
                    <label htmlFor="emergencyContacts" className="label">
                      Emergency Contacts (order of contact)
                    </label>
                    <textarea
                      id="emergencyContacts"
                      className="input min-h-[120px]"
                      value={formData.emergencyContacts || ''}
                      onChange={handleTextChange('emergencyContacts')}
                      placeholder="1. Name - Phone&#10;2. Name - Phone&#10;3. Name - Phone"
                      rows={4}
                    />
                  </div>

                  {/* Vet Spend Limit */}
                  <div>
                    <label htmlFor="vetSpendLimit" className="label">
                      Vet Spend Limit Without Prior Approval
                    </label>
                    <input
                      id="vetSpendLimit"
                      type="text"
                      className="input"
                      value={formData.vetSpendLimit || ''}
                      onChange={handleTextChange('vetSpendLimit')}
                      placeholder="e.g., Up to $300 if urgent"
                    />
                  </div>

                  {/* Insurance Details */}
                  <div>
                    <label htmlFor="insuranceDetails" className="label">
                      Insurance Details (policy, provider)
                    </label>
                    <textarea
                      id="insuranceDetails"
                      className="input min-h-[80px]"
                      value={formData.insuranceDetails || ''}
                      onChange={handleTextChange('insuranceDetails')}
                      placeholder="Policy number and provider details..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 17: Extra Notes for Carer */}
            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                <h2 className="section-heading">
                  16. Extra Notes for Carer <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                </h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Anything else that would help a pet sitter care for your pet.
                </p>
                
                <div>
                  <label htmlFor="carerNotes" className="label">
                    Anything Else You Should Know
                  </label>
                  <textarea
                    id="carerNotes"
                    className="input min-h-[150px]"
                    value={formData.carerNotes || ''}
                    onChange={handleTextChange('carerNotes')}
                    placeholder="Any additional information that would be helpful..."
                    rows={5}
                  />
                </div>
              </div>
            </section>

            {/* Species-Specific Sections */}
            {formData.species === 'dog' && (
              <section className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                  <h2 className="section-heading">
                    🐕 Dog-Specific Notes <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                  </h2>
                  <p className="text-sm text-neutral-600 mb-4">
                    Additional information specific to dogs.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="dogOffLeadInDogParks" className="label">
                        Dog Parks / Off-lead
                      </label>
                      <textarea
                        id="dogOffLeadInDogParks"
                        className="input min-h-[100px]"
                        value={formData.dogOffLeadInDogParks || ''}
                        onChange={handleTextChange('dogOffLeadInDogParks')}
                        placeholder="e.g., Loves dog parks, only with calm dogs, prefer on-lead walks, etc."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="dogPreyDrive" className="label">
                        Prey Drive
                      </label>
                      <textarea
                        id="dogPreyDrive"
                        className="input min-h-[100px]"
                        value={formData.dogPreyDrive || ''}
                        onChange={handleTextChange('dogPreyDrive')}
                        placeholder="Describe prey drive behavior (e.g., chases birds, cats, wildlife, bikes, etc.)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="dogBreedWorkLevel" className="label">
                        Working / High-energy Breed Notes
                      </label>
                      <textarea
                        id="dogBreedWorkLevel"
                        className="input min-h-[100px]"
                        value={formData.dogBreedWorkLevel || ''}
                        onChange={handleTextChange('dogBreedWorkLevel')}
                        placeholder="e.g., Kelpie, cattle dog – needs more mental and physical exercise..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {formData.species === 'cat' && (
              <>
                <section className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                    <h2 className="section-heading">
                      🐱 Litter & Toilet (Cats) <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="catLitterType" className="label">
                          Litter Type
                        </label>
                        <input
                          id="catLitterType"
                          type="text"
                          className="input"
                          value={formData.catLitterType || ''}
                          onChange={handleTextChange('catLitterType')}
                          placeholder="Clumping, recycled paper, crystals, etc."
                        />
                      </div>

                      <div>
                        <label htmlFor="catLitterTrayCount" className="label">
                          Number of Litter Trays
                        </label>
                        <input
                          id="catLitterTrayCount"
                          type="number"
                          min="0"
                          className="input"
                          value={formData.catLitterTrayCount || ''}
                          onChange={(e) => updateField('catLitterTrayCount', e.target.value ? parseInt(e.target.value) : undefined)}
                          placeholder="e.g., 2"
                        />
                      </div>

                      <div>
                        <label htmlFor="catIndoorOutdoor" className="label">
                          Indoor / Outdoor
                        </label>
                        <textarea
                          id="catIndoorOutdoor"
                          className="input min-h-[100px]"
                          value={formData.catIndoorOutdoor || ''}
                          onChange={handleTextChange('catIndoorOutdoor')}
                          placeholder="e.g., Indoor only, indoor with supervised outdoor time, indoor/outdoor, outdoor only, etc."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                    <h2 className="section-heading">
                      🐱 Scratching & Environment (Cats) <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="catScratchingSurfaces" className="label">
                          Approved Scratching Surfaces
                        </label>
                        <textarea
                          id="catScratchingSurfaces"
                          className="input min-h-[80px]"
                          value={formData.catScratchingSurfaces || ''}
                          onChange={handleTextChange('catScratchingSurfaces')}
                          placeholder="Scratching post, cardboard, cat tree, etc."
                          rows={2}
                        />
                      </div>

                      <div>
                        <label htmlFor="catScratchingRules" className="label">
                          Scratching Rules
                        </label>
                        <textarea
                          id="catScratchingRules"
                          className="input min-h-[80px]"
                          value={formData.catScratchingRules || ''}
                          onChange={handleTextChange('catScratchingRules')}
                          placeholder="Allowed on certain furniture, not allowed on couch, etc."
                          rows={2}
                        />
                      </div>

                      <div>
                        <label htmlFor="catVerticalSpace" className="label">
                          Vertical Space / Hiding Spots
                        </label>
                        <textarea
                          id="catVerticalSpace"
                          className="input min-h-[80px]"
                          value={formData.catVerticalSpace || ''}
                          onChange={handleTextChange('catVerticalSpace')}
                          placeholder="Cat trees, window perches, favourite hiding spots..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {(formData.species === 'rabbit' || formData.species === 'small-mammal') && (
              <section className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                  <h2 className="section-heading">
                    🐰 Housing & Enrichment (Rabbits / Small Animals) <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="smallPetEnclosureType" className="label">
                        Enclosure Type
                      </label>
                      <input
                        id="smallPetEnclosureType"
                        type="text"
                        className="input"
                        value={formData.smallPetEnclosureType || ''}
                        onChange={handleTextChange('smallPetEnclosureType')}
                        placeholder="Indoor pen, hutch, C&C cage, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="smallPetEnclosureLocation" className="label">
                        Enclosure Location
                      </label>
                      <input
                        id="smallPetEnclosureLocation"
                        type="text"
                        className="input"
                        value={formData.smallPetEnclosureLocation || ''}
                        onChange={handleTextChange('smallPetEnclosureLocation')}
                        placeholder="Room, noise level, drafts, other pets nearby..."
                      />
                    </div>

                    <div>
                      <label htmlFor="smallPetTimeOutsideEnclosure" className="label">
                        Time Out of Enclosure
                      </label>
                      <textarea
                        id="smallPetTimeOutsideEnclosure"
                        className="input min-h-[80px]"
                        value={formData.smallPetTimeOutsideEnclosure || ''}
                        onChange={handleTextChange('smallPetTimeOutsideEnclosure')}
                        placeholder="How long, which rooms/areas, any supervision rules..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <label htmlFor="smallPetChewingSafety" className="label">
                        Chewing & Safety Notes
                      </label>
                      <textarea
                        id="smallPetChewingSafety"
                        className="input min-h-[80px]"
                        value={formData.smallPetChewingSafety || ''}
                        onChange={handleTextChange('smallPetChewingSafety')}
                        placeholder="Cables, skirting boards, safe chew toys, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {formData.species === 'bird' && (
              <section className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                  <h2 className="section-heading">
                    🦜 Cage & Environment (Birds) <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="birdCageSize" className="label">
                        Cage Size & Type
                      </label>
                      <input
                        id="birdCageSize"
                        type="text"
                        className="input"
                        value={formData.birdCageSize || ''}
                        onChange={handleTextChange('birdCageSize')}
                        placeholder="e.g., Large flight cage, 120cm x 80cm x 150cm"
                      />
                    </div>

                    <div>
                      <label htmlFor="birdCageLocation" className="label">
                        Cage Location
                      </label>
                      <input
                        id="birdCageLocation"
                        type="text"
                        className="input"
                        value={formData.birdCageLocation || ''}
                        onChange={handleTextChange('birdCageLocation')}
                        placeholder="Room, light, drafts, other pets..."
                      />
                    </div>

                    <div>
                      <label htmlFor="birdTimeOutOfCage" className="label">
                        Time Out of Cage
                      </label>
                      <textarea
                        id="birdTimeOutOfCage"
                        className="input min-h-[80px]"
                        value={formData.birdTimeOutOfCage || ''}
                        onChange={handleTextChange('birdTimeOutOfCage')}
                        placeholder="How often they come out, safe areas, supervision rules..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <label htmlFor="birdNoiseLevel" className="label">
                        Noise Level
                      </label>
                      <textarea
                        id="birdNoiseLevel"
                        className="input min-h-[100px]"
                        value={formData.birdNoiseLevel || ''}
                        onChange={handleTextChange('birdNoiseLevel')}
                        placeholder="Describe noise level (e.g., very quiet, moderate, loud/vocal, times of day when most vocal, etc.)"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {formData.species === 'reptile' && (
              <section className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative card bg-white/90 backdrop-blur-xl border-2 border-white/50">
                  <h2 className="section-heading">
                    🦎 Enclosure, Heat & Lighting (Reptiles) <span className="text-neutral-400 text-sm font-normal">(Optional)</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="reptileSpeciesFull" className="label">
                        Reptile Species
                      </label>
                      <input
                        id="reptileSpeciesFull"
                        type="text"
                        className="input"
                        value={formData.reptileSpeciesFull || ''}
                        onChange={handleTextChange('reptileSpeciesFull')}
                        placeholder="e.g., Central bearded dragon, carpet python"
                      />
                    </div>

                    <div>
                      <label htmlFor="reptileEnclosureSize" className="label">
                        Enclosure Size & Type
                      </label>
                      <input
                        id="reptileEnclosureSize"
                        type="text"
                        className="input"
                        value={formData.reptileEnclosureSize || ''}
                        onChange={handleTextChange('reptileEnclosureSize')}
                        placeholder="e.g., 120cm x 60cm x 60cm glass terrarium"
                      />
                    </div>

                    <div>
                      <label htmlFor="reptileHeatSources" className="label">
                        Heat Sources
                      </label>
                      <textarea
                        id="reptileHeatSources"
                        className="input min-h-[100px]"
                        value={formData.reptileHeatSources || ''}
                        onChange={handleTextChange('reptileHeatSources')}
                        placeholder="Heat mat, heat lamp, ceramic heater, thermostat settings..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="reptileUvbLighting" className="label">
                        UVB Lighting
                      </label>
                      <textarea
                        id="reptileUvbLighting"
                        className="input min-h-[100px]"
                        value={formData.reptileUvbLighting || ''}
                        onChange={handleTextChange('reptileUvbLighting')}
                        placeholder="Type of bulb, schedule, distance from basking spot..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="reptileTemperatureHumidity" className="label">
                        Temperature & Humidity Requirements
                      </label>
                      <textarea
                        id="reptileTemperatureHumidity"
                        className="input min-h-[100px]"
                        value={formData.reptileTemperatureHumidity || ''}
                        onChange={handleTextChange('reptileTemperatureHumidity')}
                        placeholder="Basking temp, cool end temp, humidity levels..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

                {/* Bottom Navigation Buttons - Show when Extended Details is open */}
                <FormNavigationBar 
                  showExtendedDetails={showExtendedDetails}
                  setShowExtendedDetails={setShowExtendedDetails}
                  validationErrors={validationErrors}
                  position="bottom"
                />

              </div>
            )}

          </form>
        </div>
      </main>
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
                <span className="text-5xl">🐾</span>
              </div>
            </div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-400 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-neutral-700">Loading form...</p>
        </div>
      </div>
    }>
      <CreatePageContent />
    </Suspense>
  );
}
