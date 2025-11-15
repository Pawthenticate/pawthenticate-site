/**
 * Test Email API Route
 * 
 * This endpoint allows you to test your email configuration.
 * 
 * Usage:
 *   POST /api/test-email
 *   Body: { "email": "your-email@example.com" }
 * 
 * IMPORTANT: Remove or protect this route in production!
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail, sendConfirmationEmail, sendWelcomeEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    );
  }

  try {
    const { email, template } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    let result;

    // Send different templates based on request
    switch (template) {
      case 'confirm':
        result = await sendConfirmationEmail(
          email,
          'http://localhost:3000/auth/confirm?token=test_token_12345'
        );
        break;

      case 'welcome':
        result = await sendWelcomeEmail(email);
        break;

      case 'test':
      default:
        result = await sendTestEmail(email);
        break;
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${email}`,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check email configuration
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    );
  }

  const config = {
    configured: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
    ),
    host: process.env.SMTP_HOST || 'Not configured',
    port: process.env.SMTP_PORT || 'Not configured',
    from: process.env.SMTP_FROM || 'Not configured',
    user: process.env.SMTP_USER ? '✓ Configured' : '✗ Not configured',
    password: process.env.SMTP_PASSWORD ? '✓ Configured' : '✗ Not configured',
  };

  return NextResponse.json({
    message: 'Email configuration status',
    config,
  });
}

