/**
 * localStorage Utility with Error Handling
 * 
 * This file provides safe functions to read/write pet data to browser localStorage.
 * It includes comprehensive error handling and console logging to help debug issues.
 * 
 * Why localStorage?
 * - V1 MVP is local-only (no backend/database)
 * - Data persists when user refreshes the page
 * - User doesn't need to create an account
 * 
 * Error Handling:
 * - All errors are logged to console with context
 * - Functions gracefully return null/false on errors
 * - Errors include timestamps and error details
 */

import { PetData, STORAGE_KEY } from '@/types/pet';

/**
 * Console Logger with Timestamps
 * 
 * Helper function to log storage operations with timestamps.
 * Makes it easy to debug issues in the browser console.
 */
const logStorage = (action: string, status: 'success' | 'error' | 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[Pawthenticate Storage ${timestamp}]`;
  
  if (status === 'error') {
    console.error(prefix, action, data);
  } else if (status === 'info') {
    console.info(prefix, action, data);
  } else {
    console.log(prefix, action, data);
  }
};

/**
 * Check if localStorage is Available
 * 
 * Some browsers disable localStorage in private/incognito mode.
 * This function tests if localStorage is actually usable.
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__pawthenticate_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    logStorage('localStorage availability check', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      note: 'localStorage may be disabled (private browsing mode?) or quota exceeded'
    });
    return false;
  }
};

/**
 * Save Pet Data to localStorage
 * 
 * Saves the complete pet data object to localStorage.
 * Returns true if successful, false if failed.
 * 
 * Common Errors:
 * - localStorage not available (private browsing)
 * - Quota exceeded (data too large)
 * - Invalid JSON (shouldn't happen with our types)
 */
export const savePetData = (data: Partial<PetData>): boolean => {
  try {
    // Check if localStorage is available
    if (!isLocalStorageAvailable()) {
      logStorage('savePetData', 'error', {
        reason: 'localStorage not available',
        suggestion: 'Check if browser is in private/incognito mode'
      });
      return false;
    }

    // Convert data to JSON string
    const jsonString = JSON.stringify(data);
    
    // Log the data size (helpful for debugging quota issues)
    const dataSizeKB = (new Blob([jsonString]).size / 1024).toFixed(2);
    logStorage('savePetData', 'info', {
      fields: Object.keys(data),
      sizeKB: dataSizeKB
    });

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, jsonString);
    
    logStorage('savePetData', 'success', {
      message: 'Pet data saved successfully'
    });
    
    return true;
  } catch (error) {
    logStorage('savePetData', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      data: data,
      possibleCauses: [
        'localStorage quota exceeded (usually 5-10MB)',
        'Files too large (try smaller images)',
        'localStorage disabled by browser'
      ]
    });
    return false;
  }
};

/**
 * Load Pet Data from localStorage
 * 
 * Retrieves pet data from localStorage and parses it.
 * Returns the data object if found, or null if not found/error.
 * 
 * This is used when:
 * - User refreshes the page
 * - User navigates between form and preview
 * - App initializes
 */
export const loadPetData = (): Partial<PetData> | null => {
  try {
    // Check if localStorage is available
    if (!isLocalStorageAvailable()) {
      logStorage('loadPetData', 'error', {
        reason: 'localStorage not available'
      });
      return null;
    }

    // Get data from localStorage
    const jsonString = localStorage.getItem(STORAGE_KEY);
    
    // No data found (first time user)
    if (!jsonString) {
      logStorage('loadPetData', 'info', {
        message: 'No saved data found (new user or cleared data)'
      });
      return null;
    }

    // Parse JSON
    const data = JSON.parse(jsonString) as Partial<PetData>;
    
    logStorage('loadPetData', 'success', {
      message: 'Pet data loaded successfully',
      fields: Object.keys(data),
      petName: data.petName || 'Not set'
    });
    
    return data;
  } catch (error) {
    logStorage('loadPetData', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      possibleCauses: [
        'Corrupted data in localStorage',
        'Invalid JSON format',
        'localStorage disabled'
      ],
      solution: 'Try clearing browser data for this site'
    });
    return null;
  }
};

/**
 * Clear Pet Data from localStorage
 * 
 * Removes all saved pet data.
 * Used when user wants to start fresh or reset the form.
 */
export const clearPetData = (): boolean => {
  try {
    if (!isLocalStorageAvailable()) {
      logStorage('clearPetData', 'error', {
        reason: 'localStorage not available'
      });
      return false;
    }

    localStorage.removeItem(STORAGE_KEY);
    
    logStorage('clearPetData', 'success', {
      message: 'Pet data cleared successfully'
    });
    
    return true;
  } catch (error) {
    logStorage('clearPetData', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
};

/**
 * Get Storage Info
 * 
 * Returns information about the current storage state.
 * Useful for debugging and showing users their data status.
 */
export const getStorageInfo = () => {
  try {
    if (!isLocalStorageAvailable()) {
      return {
        available: false,
        hasData: false,
        sizeKB: 0
      };
    }

    const jsonString = localStorage.getItem(STORAGE_KEY);
    const hasData = !!jsonString;
    const sizeKB = jsonString 
      ? (new Blob([jsonString]).size / 1024).toFixed(2)
      : 0;

    return {
      available: true,
      hasData,
      sizeKB: parseFloat(sizeKB as string)
    };
  } catch (error) {
    logStorage('getStorageInfo', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return {
      available: false,
      hasData: false,
      sizeKB: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

