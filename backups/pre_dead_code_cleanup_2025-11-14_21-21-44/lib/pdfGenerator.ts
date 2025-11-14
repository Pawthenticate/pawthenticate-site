/**
 * PDF Generator Utility for Pawthenticate
 * 
 * Generates professional PDFs from pet resume HTML using jsPDF + html2canvas
 * 
 * Features:
 * - Optimized file size (<500KB target)
 * - Multi-page support for long resumes
 * - Mobile-friendly generation
 * - Error handling and recovery
 * - Loading states and progress tracking
 * - Custom PDF metadata
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// PDF Configuration
const PDF_CONFIG = {
  // A4 dimensions in mm
  PAGE_WIDTH: 210,
  PAGE_HEIGHT: 297,
  
  // Margins in mm
  MARGIN_TOP: 15,
  MARGIN_BOTTOM: 15,
  MARGIN_LEFT: 10,
  MARGIN_RIGHT: 10,
  
  // Canvas settings (balance quality vs file size)
  CANVAS_SCALE: 3, // 3x for high quality (was 2x)
  IMAGE_QUALITY: 0.95, // JPEG quality (0-1) - higher for better quality
  
  // File size targets
  MAX_FILE_SIZE_KB: 500,
  TARGET_FILE_SIZE_KB: 300,
};

/**
 * PDF Generation Options
 */
export interface PDFGenerationOptions {
  filename: string;
  petName: string;
  templateMode: 'rental' | 'pet_sitter';
  metadata?: {
    title?: string;
    subject?: string;
    author?: string;
    keywords?: string;
  };
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}

/**
 * PDF Generation Result
 */
export interface PDFGenerationResult {
  success: boolean;
  filename?: string;
  fileSizeKB?: number;
  pageCount?: number;
  error?: string;
}

/**
 * Wait for all images to load in the element
 */
async function waitForImagesToLoad(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');
  
  console.log('[PDF] 🖼️ Found', images.length, 'images to load');
  
  const imagePromises = Array.from(images).map((img, index) => {
    // If image is already complete and has dimensions, it's loaded
    if (img.complete && img.naturalHeight !== 0) {
      console.log(`[PDF] ✅ Image ${index + 1} already loaded:`, img.src.substring(0, 60));
      return Promise.resolve();
    }
    
    console.log(`[PDF] ⏳ Waiting for image ${index + 1}:`, img.src.substring(0, 60));
    
    return new Promise<void>((resolve) => {
      img.onload = () => {
        console.log(`[PDF] ✅ Image ${index + 1} loaded successfully`);
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`[PDF] ⚠️ Image ${index + 1} failed to load:`, img.src);
        resolve(); // Continue even if image fails
      };
      
      // Longer timeout for Supabase images (15 seconds)
      setTimeout(() => {
        console.warn(`[PDF] ⏰ Image ${index + 1} load timeout:`, img.src);
        resolve();
      }, 15000);
      
      // Force reload if image isn't loading
      if (!img.complete) {
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
      }
    });
  });
  
  await Promise.all(imagePromises);
  console.log('[PDF] ✅ All images loaded (or timed out)');
}

/**
 * Wait for fonts to be ready
 */
async function waitForFonts(): Promise<void> {
  try {
    await document.fonts.ready;
    console.log('[PDF] ✅ Fonts loaded');
  } catch (error) {
    console.warn('[PDF] ⚠️ Font loading check failed:', error);
    // Continue anyway
  }
}

/**
 * Calculate optimal canvas scale based on content size
 */
function calculateOptimalScale(element: HTMLElement): number {
  const contentHeight = element.scrollHeight;
  const contentWidth = element.scrollWidth;
  
  // For very large content, reduce scale slightly to avoid memory issues
  // But maintain quality - don't go below 2x
  if (contentHeight > 5000 || contentWidth > 1500) {
    console.log('[PDF] Very large content detected, using scale 2.5');
    return 2.5;
  }
  
  if (contentHeight > 3000 || contentWidth > 1000) {
    console.log('[PDF] Large content detected, using scale 2.5');
    return 2.5;
  }
  
  // Default scale for high quality (3x)
  console.log('[PDF] Using high quality scale:', PDF_CONFIG.CANVAS_SCALE);
  return PDF_CONFIG.CANVAS_SCALE;
}

/**
 * Generate PDF from HTML element
 * 
 * @param elementId - ID of the HTML element to convert to PDF
 * @param options - PDF generation options
 * @returns Promise with generation result
 */
export async function generatePDF(
  elementId: string,
  options: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  const startTime = performance.now();
  console.log('[PDF] 🚀 Starting PDF generation for:', options.filename);
  
  try {
    // Report initial progress
    options.onProgress?.(10);
    
    // Get the element to convert
    const element = document.getElementById(elementId) || document.querySelector('.resume-print-root');
    
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error('Resume content element not found');
    }
    
    console.log('[PDF] 📄 Element found:', element.className);
    
    // Wait for all resources to load
    options.onProgress?.(20);
    await Promise.all([
      waitForImagesToLoad(element),
      waitForFonts(),
    ]);
    
    // Calculate optimal scale
    const scale = calculateOptimalScale(element);
    console.log('[PDF] 📊 Using canvas scale:', scale);
    
    // Generate canvas from HTML
    options.onProgress?.(40);
    console.log('[PDF] 🎨 Generating canvas...');
    
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true, // Allow cross-origin images (Supabase storage)
      backgroundColor: '#ffffff',
      logging: false, // Disable for better performance
      imageTimeout: 15000, // Wait up to 15 seconds for images
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      // Optimize for print quality
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId) || clonedDoc.querySelector('.resume-print-root');
        if (clonedElement && clonedElement instanceof HTMLElement) {
          // Remove overflow hidden and constraints that might cut content
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.maxHeight = 'none';
          clonedElement.style.height = 'auto';
          
          // Remove rounded corners and shadows for clean capture
          clonedElement.style.borderRadius = '0';
          clonedElement.style.boxShadow = 'none';
          
          // Hide the footer during PDF generation (we'll add it to each page separately)
          const footerToHide = clonedElement.querySelector('.pdf-hide-footer');
          if (footerToHide && footerToHide instanceof HTMLElement) {
            footerToHide.style.display = 'none';
            console.log('[PDF] 🚫 Footer hidden from canvas capture');
          }
          
          // Ensure images are visible
          const images = clonedElement.querySelectorAll('img');
          images.forEach((img: any) => {
            img.style.display = 'block';
            img.style.visibility = 'visible';
            img.style.opacity = '1';
          });
        }
      },
    });
    
    console.log('[PDF] ✅ Canvas generated:', canvas.width, 'x', canvas.height);
    console.log('[PDF] 📐 Element dimensions:', {
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
    });
    options.onProgress?.(60);
    
    // Calculate PDF dimensions
    const imgWidth = PDF_CONFIG.PAGE_WIDTH - PDF_CONFIG.MARGIN_LEFT - PDF_CONFIG.MARGIN_RIGHT;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = PDF_CONFIG.PAGE_HEIGHT - PDF_CONFIG.MARGIN_TOP - PDF_CONFIG.MARGIN_BOTTOM;
    
    console.log('[PDF] 📄 PDF dimensions:', {
      imgWidth: imgWidth + 'mm',
      imgHeight: imgHeight + 'mm',
      pageHeight: pageHeight + 'mm',
      estimatedPages: Math.ceil(imgHeight / pageHeight),
    });
    
    // Create PDF
    console.log('[PDF] 📑 Creating PDF document...');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true, // Enable compression
    });
    
    // Add metadata
    const metadata = options.metadata || {};
    pdf.setProperties({
      title: metadata.title || `${options.petName} Pet Resume`,
      subject: metadata.subject || `Pet resume for ${options.petName} (${options.templateMode === 'rental' ? 'Rental Application' : 'Pet Sitter Instructions'})`,
      author: metadata.author || 'Pawthenticate',
      keywords: metadata.keywords || `pet resume, ${options.petName}, ${options.templateMode}, pet profile`,
      creator: 'Pawthenticate - Pet Resume Generator',
    });
    
    console.log('[PDF] ✅ Metadata added');
    options.onProgress?.(70);
    
    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/jpeg', PDF_CONFIG.IMAGE_QUALITY);
    
    console.log('[PDF] 📐 Calculating page layout...');
    
    // Add the image to the PDF - let it flow naturally across pages
    // This prevents the duplication issue where content appears twice
    let yPosition = PDF_CONFIG.MARGIN_TOP;
    let heightRemaining = imgHeight;
    let pageCount = 0;
    
    while (heightRemaining > 0) {
      pageCount++;
      
      if (pageCount > 1) {
        pdf.addPage();
      }
      
      // Add the full image, positioned so the correct portion shows
      const offsetY = yPosition - ((pageCount - 1) * pageHeight);
      
      console.log(`[PDF] 📄 Adding page ${pageCount}:`, {
        yPosition: Math.round(yPosition),
        offsetY: Math.round(offsetY),
        heightRemaining: Math.round(heightRemaining),
      });
      
      pdf.addImage(
        imgData,
        'JPEG',
        PDF_CONFIG.MARGIN_LEFT,
        offsetY,
        imgWidth,
        imgHeight,
        `page-${pageCount}`, // Alias to avoid duplication
        'FAST'
      );
      
      // Add footer to this page
      const footerY = PDF_CONFIG.PAGE_HEIGHT - 10;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        'Created with Pawthenticate • Where your pet\'s story lives',
        PDF_CONFIG.PAGE_WIDTH / 2,
        footerY,
        { align: 'center' }
      );
      
      console.log(`[PDF] ✅ Page ${pageCount} complete with footer`);
      
      // Move to next page
      heightRemaining -= pageHeight;
      yPosition -= pageHeight;
      
      // Safety limit: max 10 pages
      if (pageCount >= 10) {
        console.warn('[PDF] ⚠️ Reached maximum page limit (10 pages)');
        break;
      }
    }
    
    console.log('[PDF] ✅ PDF created with', pageCount, 'page(s)');
    options.onProgress?.(85);
    
    // Calculate file size
    const pdfBlob = pdf.output('blob');
    const fileSizeKB = Math.round(pdfBlob.size / 1024);
    
    console.log('[PDF] 📦 File size:', fileSizeKB, 'KB');
    
    // Warn if file size is large
    if (fileSizeKB > PDF_CONFIG.MAX_FILE_SIZE_KB) {
      console.warn('[PDF] ⚠️ File size exceeds target:', fileSizeKB, 'KB >', PDF_CONFIG.MAX_FILE_SIZE_KB, 'KB');
    }
    
    // Save PDF
    console.log('[PDF] 💾 Saving PDF:', options.filename);
    pdf.save(options.filename);
    
    options.onProgress?.(100);
    
    // Clean up canvas
    canvas.remove();
    
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    
    console.log('[PDF] ✅ PDF generated successfully in', duration, 'ms');
    console.log('[PDF] 📊 Stats:', {
      filename: options.filename,
      pages: pageCount,
      sizeKB: fileSizeKB,
      duration: `${duration}ms`,
    });
    
    return {
      success: true,
      filename: options.filename,
      fileSizeKB,
      pageCount,
    };
    
  } catch (error) {
    console.error('[PDF] ❌ PDF generation failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Call error handler if provided
    if (options.onError) {
      options.onError(error instanceof Error ? error : new Error(errorMessage));
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Generate filename for PDF
 */
export function generatePDFFilename(
  petName: string,
  templateMode: 'rental' | 'pet_sitter'
): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const modeLabel = templateMode === 'rental' ? 'Rental' : 'PetSitter';
  const sanitizedName = petName.replace(/[^a-zA-Z0-9]/g, '_'); // Remove special chars
  
  return `${sanitizedName}_${modeLabel}_Resume_${today}.pdf`;
}

/**
 * Check if PDF generation is supported in current browser
 */
export function isPDFGenerationSupported(): boolean {
  try {
    // Check for required APIs
    const hasCanvas = typeof HTMLCanvasElement !== 'undefined';
    const hasBlob = typeof Blob !== 'undefined';
    const hasURL = typeof URL !== 'undefined';
    
    return hasCanvas && hasBlob && hasURL;
  } catch (error) {
    return false;
  }
}

/**
 * Get estimated PDF generation time based on content size
 */
export function getEstimatedGenerationTime(element: HTMLElement | null): number {
  if (!element) return 2000; // Default 2 seconds
  
  const contentHeight = element.scrollHeight;
  const imageCount = element.querySelectorAll('img').length;
  
  // Base time: 2 seconds
  let estimatedTime = 2000;
  
  // Add time for large content (500ms per 1000px)
  estimatedTime += Math.floor(contentHeight / 1000) * 500;
  
  // Add time for images (200ms per image)
  estimatedTime += imageCount * 200;
  
  return Math.min(estimatedTime, 10000); // Cap at 10 seconds
}

/**
 * Export for testing
 */
export const __testing = {
  waitForImagesToLoad,
  waitForFonts,
  calculateOptimalScale,
  PDF_CONFIG,
};

