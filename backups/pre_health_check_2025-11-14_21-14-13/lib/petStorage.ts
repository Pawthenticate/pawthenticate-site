/**
 * Pet Storage Service
 * 
 * Handles file uploads to Supabase Storage for pet photos and documents.
 * Provides methods for uploading, deleting, and getting public URLs.
 * 
 * Storage Bucket Structure:
 * - pet-photos/{userId}/{petId}/photo.jpg
 * - pet-documents/{userId}/{petId}/{documentType}.pdf
 * 
 * Features:
 * - Upload pet photo
 * - Upload pet documents
 * - Delete files
 * - Get public URLs
 * - Automatic file compression for photos
 */

import { createBrowserSupabaseClient, handleSupabaseError } from './supabaseClient';

// Helper to get a fresh Supabase client instance
const getSupabase = () => createBrowserSupabaseClient();

/**
 * Console Logger for Storage Operations
 */
const logStorage = (action: string, status: 'success' | 'error' | 'warn' | 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[Storage ${timestamp}]`;
  
  if (status === 'error') {
    console.error(prefix, action, data);
  } else if (status === 'warn') {
    console.warn(prefix, action, data);
  } else if (status === 'info') {
    console.info(prefix, action, data);
  } else {
    console.log(prefix, action, data);
  }
};

/**
 * Storage Result Type
 */
export type StorageResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Convert Data URL to Blob
 * 
 * Helper function to convert base64 data URL to Blob for uploading.
 */
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Compress Image
 * 
 * Compresses an image to reduce file size before uploading.
 * 
 * @param dataURL - Base64 data URL of the image
 * @param maxWidth - Maximum width in pixels (default: 1200)
 * @param quality - JPEG quality 0-1 (default: 0.8)
 */
async function compressImage(
  dataURL: string,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with quality compression
      const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataURL);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataURL;
  });
}

/**
 * Upload Pet Photo
 * 
 * Uploads a pet photo to Supabase Storage.
 * Automatically compresses the image before uploading.
 * 
 * @param dataURL - Base64 data URL of the photo
 * @param userId - ID of the user
 * @param petId - ID of the pet (optional, generated if not provided)
 * @returns Public URL of the uploaded photo
 */
export async function uploadPetPhoto(
  dataURL: string,
  userId: string,
  petId?: string
): Promise<StorageResult<string>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logStorage('uploadPetPhoto', 'error', { error });
    return { success: false, error: 'Storage service unavailable' };
  }

  try {
    logStorage('uploadPetPhoto', 'info', { userId, petId });

    // Compress the image
    const compressedDataURL = await compressImage(dataURL, 1200, 0.8);
    
    // Convert to blob
    const blob = dataURLtoBlob(compressedDataURL);
    const originalSize = dataURLtoBlob(dataURL).size;
    const compressedSize = blob.size;
    
    logStorage('uploadPetPhoto', 'info', {
      originalSize: `${(originalSize / 1024).toFixed(2)} KB`,
      compressedSize: `${(compressedSize / 1024).toFixed(2)} KB`,
      compressionRatio: `${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`
    });

    // Generate filename
    const timestamp = Date.now();
    const filename = petId ? `${petId}_${timestamp}.jpg` : `temp_${timestamp}.jpg`;
    const filePath = `${userId}/${filename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pet-photos')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true, // Replace if exists
      });

    if (error) {
      logStorage('uploadPetPhoto', 'error', {
        error: error.message || 'Unknown error',
        code: error.name,
        statusCode: (error as any).statusCode,
        details: error,
        filePath,
        blobSize: blob.size,
        userId,
        petId
      });
      
      // Provide more specific error messages
      let friendlyError = 'Failed to upload photo';
      if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
        friendlyError = 'Storage bucket "pet-photos" not found. Please create it in Supabase dashboard.';
      } else if (error.message?.includes('permission') || error.message?.includes('policy')) {
        friendlyError = 'Permission denied. Please check storage policies in Supabase.';
      } else if (error.message?.includes('size') || error.message?.includes('too large')) {
        friendlyError = 'File is too large. Maximum size is 5MB.';
      } else {
        friendlyError = `Upload failed: ${error.message || 'Unknown error'}`;
      }
      
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logStorage('uploadPetPhoto', 'error', { error: 'No data returned' });
      return { success: false, error: 'Failed to upload photo. Please try again.' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pet-photos')
      .getPublicUrl(filePath);

    logStorage('uploadPetPhoto', 'success', {
      filePath: data.path,
      publicUrl,
      size: `${(compressedSize / 1024).toFixed(2)} KB`
    });

    return {
      success: true,
      data: publicUrl
    };
  } catch (error) {
    logStorage('uploadPetPhoto', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred uploading photo' };
  }
}

/**
 * Delete Pet Photo
 * 
 * Deletes a pet photo from Supabase Storage.
 * 
 * @param photoUrl - Public URL of the photo to delete
 * @param userId - ID of the user (for security check)
 */
export async function deletePetPhoto(
  photoUrl: string,
  userId: string
): Promise<StorageResult<void>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logStorage('deletePetPhoto', 'error', { error });
    return { success: false, error: 'Storage service unavailable' };
  }

  try {
    logStorage('deletePetPhoto', 'info', { photoUrl, userId });

    // Extract file path from URL
    // URL format: https://xxx.supabase.co/storage/v1/object/public/pet-photos/{userId}/{filename}
    const urlParts = photoUrl.split('/pet-photos/');
    if (urlParts.length < 2) {
      return { success: false, error: 'Invalid photo URL' };
    }
    const filePath = urlParts[1];

    // Security check: ensure file path starts with userId
    if (!filePath.startsWith(userId + '/')) {
      logStorage('deletePetPhoto', 'error', {
        error: 'Security violation: file path does not match user ID',
        filePath,
        userId
      });
      return { success: false, error: 'You do not have permission to delete this photo' };
    }

    const { error } = await supabase.storage
      .from('pet-photos')
      .remove([filePath]);

    if (error) {
      const friendlyError = handleSupabaseError(error, 'deletePetPhoto', { photoUrl, userId });
      return { success: false, error: friendlyError };
    }

    logStorage('deletePetPhoto', 'success', { filePath });

    return { success: true };
  } catch (error) {
    logStorage('deletePetPhoto', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred deleting photo' };
  }
}

/**
 * Upload Pet Document
 * 
 * Uploads a pet document (vaccination certificate, etc.) to Supabase Storage.
 * 
 * @param file - File object to upload
 * @param userId - ID of the user
 * @param petId - ID of the pet
 * @param documentType - Type of document (vaccination, desexing, microchip)
 */
export async function uploadPetDocument(
  file: File,
  userId: string,
  petId: string,
  documentType: 'vaccination' | 'desexing' | 'microchip'
): Promise<StorageResult<string>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logStorage('uploadPetDocument', 'error', { error });
    return { success: false, error: 'Storage service unavailable' };
  }

  try {
    logStorage('uploadPetDocument', 'info', {
      userId,
      petId,
      documentType,
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`
    });

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 5MB.' };
    }

    // Generate filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'pdf';
    const filename = `${documentType}_${timestamp}.${extension}`;
    const filePath = `${userId}/${petId}/${filename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pet-documents')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'uploadPetDocument', {
        userId,
        petId,
        documentType
      });
      return { success: false, error: friendlyError };
    }

    if (!data) {
      logStorage('uploadPetDocument', 'error', { error: 'No data returned' });
      return { success: false, error: 'Failed to upload document. Please try again.' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pet-documents')
      .getPublicUrl(filePath);

    logStorage('uploadPetDocument', 'success', {
      filePath: data.path,
      publicUrl,
      size: `${(file.size / 1024).toFixed(2)} KB`
    });

    return {
      success: true,
      data: publicUrl
    };
  } catch (error) {
    logStorage('uploadPetDocument', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred uploading document' };
  }
}

/**
 * Check if Storage Buckets Exist
 * 
 * Helper function to check if required storage buckets exist.
 * Useful for debugging storage configuration issues.
 */
export async function checkStorageBuckets(): Promise<StorageResult<{
  petPhotos: boolean;
  petDocuments: boolean;
}>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      return { success: false, error: handleSupabaseError(error, 'checkStorageBuckets') };
    }

    const bucketNames = data?.map(b => b.name) || [];
    const hasPetPhotos = bucketNames.includes('pet-photos');
    const hasPetDocuments = bucketNames.includes('pet-documents');

    logStorage('checkStorageBuckets', 'info', {
      petPhotos: hasPetPhotos ? '✓' : '✗',
      petDocuments: hasPetDocuments ? '✓' : '✗',
      allBuckets: bucketNames
    });

    return {
      success: true,
      data: {
        petPhotos: hasPetPhotos,
        petDocuments: hasPetDocuments
      }
    };
  } catch (error) {
    logStorage('checkStorageBuckets', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return { success: false, error: 'Failed to check storage buckets' };
  }
}

