/**
 * Email Service for Pawthenticate
 * 
 * Handles sending transactional emails using nodemailer and custom SMTP.
 * Supports Mailgun, SendGrid, Gmail, AWS SES, or any SMTP provider.
 * 
 * Recommended: Use Mailgun for production (better pricing for startups)
 * 
 * Required environment variables:
 * - SMTP_HOST: SMTP server hostname (e.g., smtp.mailgun.org)
 * - SMTP_PORT: SMTP port (587 for TLS, 465 for SSL)
 * - SMTP_USER: SMTP username (e.g., postmaster@sandboxxxxx.mailgun.org)
 * - SMTP_PASSWORD: SMTP password
 * - SMTP_FROM: Sender email (e.g., no-reply@pawthenticate.com)
 */

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Create reusable SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailgun.org',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Verify SMTP connection on startup (optional, for debugging)
if (process.env.NODE_ENV === 'development') {
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ SMTP Connection Error:', error);
    } else {
      console.log('✅ SMTP Server is ready to send emails');
    }
  });
}

interface EmailOptions {
  to: string;
  subject: string;
  template: 'confirm-email' | 'welcome-email' | 'password-reset';
  variables: Record<string, string>;
}

/**
 * Send an email using a template
 * 
 * @param options - Email options including recipient, subject, template, and variables
 * @returns Promise with email info
 */
export async function sendEmail(options: EmailOptions) {
  try {
    // Load HTML template
    const templatePath = path.join(
      process.cwd(),
      'email-templates',
      `${options.template}.html`
    );
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found: ${options.template}`);
    }

    let html = fs.readFileSync(templatePath, 'utf-8');

    // Replace template variables (e.g., {{ .ConfirmationURL }} → actual URL)
    Object.entries(options.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{ \\.${key} }}`, 'g');
      html = html.replace(regex, value);
    });

    // Send email
    const info = await transporter.sendMail({
      from: {
        name: 'Pawthenticate',
        address: process.env.SMTP_FROM || 'no-reply@pawthenticate.com',
      },
      to: options.to,
      subject: options.subject,
      html: html,
      // Optional: Add plain text version
      text: stripHtml(html),
    });

    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      to: options.to,
      subject: options.subject,
    });

    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

/**
 * Send email confirmation/verification email
 * 
 * @param email - User's email address
 * @param confirmUrl - Confirmation URL with token
 * @returns Promise with email info
 */
export async function sendConfirmationEmail(
  email: string,
  confirmUrl: string
): Promise<any> {
  return sendEmail({
    to: email,
    subject: 'Verify your email - Pawthenticate 🐾',
    template: 'confirm-email',
    variables: {
      ConfirmationURL: confirmUrl,
    },
  });
}

/**
 * Send welcome email after successful confirmation
 * 
 * @param email - User's email address
 * @param siteUrl - Base URL of the site
 * @returns Promise with email info
 */
export async function sendWelcomeEmail(
  email: string,
  siteUrl?: string
): Promise<any> {
  const baseUrl = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://pawthenticate.com';
  
  return sendEmail({
    to: email,
    subject: 'Welcome to Pawthenticate! 🎉',
    template: 'welcome-email',
    variables: {
      SiteURL: baseUrl,
    },
  });
}

/**
 * Send password reset email
 * 
 * @param email - User's email address
 * @param resetUrl - Password reset URL with token
 * @returns Promise with email info
 */
export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<any> {
  return sendEmail({
    to: email,
    subject: 'Reset your password - Pawthenticate 🔐',
    template: 'password-reset',
    variables: {
      ConfirmationURL: resetUrl,
    },
  });
}

/**
 * Helper: Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Test email function - sends a test email to verify configuration
 */
export async function sendTestEmail(to: string): Promise<any> {
  return transporter.sendMail({
    from: {
      name: 'Pawthenticate',
      address: process.env.SMTP_FROM || 'no-reply@pawthenticate.com',
    },
    to,
    subject: 'Test Email from Pawthenticate',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #FF6B6B;">✅ Email Configuration Working!</h1>
        <p>This is a test email from your Pawthenticate email service.</p>
        <p>If you're seeing this, your SMTP configuration is working correctly! 🎉</p>
      </div>
    `,
    text: 'Test email from Pawthenticate - Email configuration is working!',
  });
}

