# 📧 Pawthenticate Email Setup Guide

This guide will help you set up custom email templates for Pawthenticate using `no-reply@pawthenticate.com` as your sender email.

## 📁 What's Included

We've created three beautiful email templates that match your landing page design:

1. **`confirm-email.html`** - Email confirmation/verification
2. **`welcome-email.html`** - Welcome email after confirmation
3. **`password-reset.html`** - Password reset requests

All templates feature:
- ✅ Your brand colors (coral #FF6B6B and orange #FFB347)
- ✅ Gradient backgrounds and buttons
- ✅ Paw print decorations 🐾
- ✅ Glassmorphism design elements
- ✅ Mobile-responsive layouts
- ✅ Professional typography

---

## 🚀 Setup Options

You have two main options for implementing these emails:

### **Option 1: Custom SMTP (Recommended)**
Use your own email service (Gmail, SendGrid, AWS SES) with Supabase

### **Option 2: Supabase Email Templates**
Customize Supabase's built-in email templates

---

## 📮 Option 1: Custom SMTP Setup

### Step 1: Choose an Email Service

**Recommended Services:**

#### A) **Mailgun** ⭐ RECOMMENDED for Production
- **Cost:** 
  - Free: 5,000 emails/month for 3 months
  - Pay-as-you-go: $0.80 per 1,000 emails
  - Plan: $35/month for 50,000 emails
- **Best for:** Startups with unpredictable growth
- **Why:** Only pay for what you use, no surprise bills
- **Website:** [mailgun.com](https://mailgun.com)

#### B) **SendGrid** (Good for consistent volume)
- **Cost:** 
  - Free tier: 100 emails/day (3,000/month) forever
  - Paid: $15/month for 40,000 emails
- **Best for:** Consistent low-medium volume
- **Why:** Permanent free tier, easy setup
- **Website:** [sendgrid.com](https://sendgrid.com)

#### C) **AWS SES** (Enterprise scale)
- **Cost:** $0.10 per 1,000 emails
- **Best for:** High volume (100k+ emails/month)
- **Why:** Cheapest at scale, but complex setup
- **Website:** [aws.amazon.com/ses](https://aws.amazon.com/ses)

#### D) **Gmail SMTP** (Testing only)
- **Cost:** Free
- **Limit:** ~500 emails/day
- **Best for:** Development/testing ONLY
- **Why:** Easy but unreliable for production

---

### Step 2: Configure Your Email Service

#### **Option A: Mailgun (Recommended for Production)**

1. **Sign up for Mailgun:**
   - Go to [signup.mailgun.com](https://signup.mailgun.com/new/signup)
   - Choose "Free" plan (5,000 emails/month for 3 months)
   - Verify your email

2. **Get SMTP credentials:**
   - Go to **Sending** → **Overview**
   - Scroll to **SMTP** section
   - Click on your sandbox domain OR add your own domain
   - Find your **SMTP credentials**:
     - Host: `smtp.mailgun.org`
     - Port: 587
     - Username: `postmaster@sandboxxxxx.mailgun.org`
     - Password: Click "Reset password" to generate

3. **Verify your domain (for production):**
   - Go to **Sending** → **Domains**
   - Click **Add New Domain**
   - Enter `pawthenticate.com`
   - Add the DNS records provided (MX, TXT for SPF, DKIM)
   - Wait 24-48 hours for verification

4. **SMTP Credentials:**
   - **SMTP Server:** `smtp.mailgun.org`
   - **Port:** 587 (TLS)
   - **Username:** `postmaster@pawthenticate.com` (after domain verification)
   - **Password:** Your domain SMTP password

**Pricing after free trial:**
- Pay-as-you-go: $0.80 per 1,000 emails
- Or subscribe to a plan for better rates

---

#### **Option B: SendGrid (Good Alternative)**

1. **Sign up for SendGrid:**
   - Go to [sendgrid.com/pricing](https://sendgrid.com/pricing)
   - Choose Free plan or higher
   - Verify your account

2. **Verify your domain (pawthenticate.com):**
   - Go to **Settings** → **Sender Authentication**
   - Click **Authenticate Your Domain**
   - Follow instructions to add DNS records:
     ```
     CNAME: em1234.pawthenticate.com → u1234567.wl.sendgrid.net
     CNAME: s1._domainkey.pawthenticate.com → s1.domainkey.u1234567.wl.sendgrid.net
     CNAME: s2._domainkey.pawthenticate.com → s2.domainkey.u1234567.wl.sendgrid.net
     ```
   - Wait 24-48 hours for DNS propagation

3. **Create API Key:**
   - Go to **Settings** → **API Keys**
   - Click **Create API Key**
   - Name: `Pawthenticate Production`
   - Permissions: **Full Access** or **Mail Send**
   - Copy the API key (you'll only see it once!)

4. **Get SMTP Credentials:**
   - **SMTP Server:** `smtp.sendgrid.net`
   - **Port:** 587 (TLS) or 465 (SSL)
   - **Username:** `apikey` (literally the word "apikey")
   - **Password:** Your API key from step 3

---

#### **Option B: Gmail SMTP (For Testing)**

1. **Enable 2-Factor Authentication:**
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Enable 2FA if not already enabled

2. **Create App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select **Mail** and your device
   - Click **Generate**
   - Copy the 16-character password

3. **SMTP Credentials:**
   - **SMTP Server:** `smtp.gmail.com`
   - **Port:** 587
   - **Username:** Your Gmail address
   - **Password:** The app password from step 2

⚠️ **Note:** Gmail SMTP is NOT recommended for production due to sending limits.

---

### Step 3: Configure Supabase to Use Custom SMTP

Unfortunately, Supabase doesn't directly support custom SMTP in the Auth system. You'll need to:

**Option A: Use Supabase Edge Functions** (Advanced)

1. Create a Supabase Edge Function to handle custom emails
2. Trigger it after user signup/password reset
3. Use your SMTP service via API

**Option B: Disable Supabase Emails & Use Backend** (Recommended)

1. **Disable Supabase email confirmations:**
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Authentication** → **Email Templates**
   - Toggle off **Enable email confirmations** temporarily

2. **Create a backend email service:**
   - Use Node.js with `nodemailer` or `@sendgrid/mail`
   - Send emails from your backend after signup/password reset
   - See implementation example below

---

### Step 4: Backend Email Implementation

Create a new file: `lib/emailService.ts`

```typescript
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.sendgrid.net
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER, // e.g., 'apikey' for SendGrid
    pass: process.env.SMTP_PASSWORD, // Your API key
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  template: 'confirm-email' | 'welcome-email' | 'password-reset';
  variables: Record<string, string>;
}

export async function sendEmail(options: EmailOptions) {
  // Load HTML template
  const templatePath = path.join(
    process.cwd(),
    'email-templates',
    `${options.template}.html`
  );
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Replace variables (e.g., {% raw %}{{ .ConfirmationURL }}{% endraw %})
  Object.entries(options.variables).forEach(([key, value]) => {
    const regex = new RegExp(`{% raw %}{{ \\.${key} }}{% endraw %}`, 'g');
    html = html.replace(regex, value);
  });

  // Send email
  const info = await transporter.sendMail({
    from: '"Pawthenticate" <no-reply@pawthenticate.com>',
    to: options.to,
    subject: options.subject,
    html: html,
  });

  console.log('Email sent:', info.messageId);
  return info;
}

// Usage examples:

// Send confirmation email
export async function sendConfirmationEmail(email: string, confirmUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Verify your email - Pawthenticate',
    template: 'confirm-email',
    variables: {
      ConfirmationURL: confirmUrl,
    },
  });
}

// Send welcome email
export async function sendWelcomeEmail(email: string, dashboardUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Pawthenticate! 🎉',
    template: 'welcome-email',
    variables: {
      SiteURL: dashboardUrl,
    },
  });
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  return sendEmail({
    to: email,
    subject: 'Reset your password - Pawthenticate',
    template: 'password-reset',
    variables: {
      ConfirmationURL: resetUrl,
    },
  });
}
```

Add to your `.env.local`:

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key_here
```

---

## 📝 Option 2: Supabase Email Templates (Simpler)

If you want to keep using Supabase's built-in email system:

### Step 1: Configure Custom Email Templates in Supabase

1. **Go to Supabase Dashboard:**
   - [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Navigate to Email Templates:**
   - **Authentication** → **Email Templates**

3. **Customize each template:**

   #### Confirmation Email Template:
   - Click **"Confirm signup"**
   - Replace the HTML with content from `confirm-email.html`
   - Available variables in Supabase:
     - {% raw %}`{{ .ConfirmationURL }}`{% endraw %} - Confirmation link
     - {% raw %}`{{ .Token }}`{% endraw %} - Raw token
     - {% raw %}`{{ .TokenHash }}`{% endraw %} - Token hash
     - {% raw %}`{{ .SiteURL }}`{% endraw %} - Your site URL

   #### Password Recovery Template:
   - Click **"Reset password"**
   - Replace with content from `password-reset.html`

4. **Save each template**

### Step 2: Configure Sender Email

⚠️ **Important Limitation:** 

Supabase's free tier sends emails from `noreply@mail.app.supabase.io`. To use `no-reply@pawthenticate.com`, you need:

**Option A: Upgrade to Supabase Pro** ($25/month)
- Includes custom SMTP configuration
- Full control over sender email

**Option B: Use Custom SMTP** (see Option 1 above)

---

## 🎨 Customizing the Templates

### Variables Available:

All templates use these variable formats:

{% raw %}
```html
{{ .ConfirmationURL }}  <!-- Supabase format -->
{{ .SiteURL }}
{{ .Token }}
{{ .TokenHash }}
```
{% endraw %}

If using custom backend (nodemailer), you can use any variables you want!

### Updating Colors:

To change colors in the templates:

1. **Primary Color (Coral):** Search for `#FF6B6B` and `#FFA8A8`
2. **Secondary Color (Orange):** Search for `#FFB347` and `#FFC670`
3. **Gradients:** Update `linear-gradient` values

### Adding Your Logo:

The templates include an inline SVG paw print. To use your actual logo:

```html
<!-- Replace the SVG with: -->
<img src="https://pawthenticate.com/logo.png" alt="Pawthenticate" width="60" height="60">
```

---

## ✅ Testing Your Emails

### 1. Test Locally (Development)

Use a tool like [Mailtrap](https://mailtrap.io) or [Ethereal Email](https://ethereal.email):

```typescript
// Development SMTP (catches all emails)
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'your-ethereal-user',
    pass: 'your-ethereal-pass',
  },
});
```

### 2. Test Email Rendering

Use these tools to preview:
- [Litmus](https://litmus.com) - Professional testing
- [Email on Acid](https://www.emailonacid.com)
- [Mailtrap Email Preview](https://mailtrap.io)

### 3. Test Deliverability

Send test emails to:
- Gmail
- Outlook
- Yahoo Mail
- Your own email

Check spam folders!

---

## 🔧 Troubleshooting

### Emails Going to Spam?

**Solutions:**
1. ✅ **Verify your domain** with your email provider (SPF, DKIM, DMARC records)
2. ✅ Use a professional email service (SendGrid, AWS SES)
3. ✅ Add `no-reply@pawthenticate.com` to your domain's SPF record
4. ✅ Warm up your sending domain (send gradually increasing volumes)

### Emails Not Sending?

**Check:**
1. ✅ SMTP credentials are correct
2. ✅ Port is correct (587 for TLS, 465 for SSL)
3. ✅ Firewall isn't blocking SMTP ports
4. ✅ API key has correct permissions

### Templates Not Displaying Correctly?

**Common Issues:**
1. ✅ Some email clients don't support CSS - use inline styles
2. ✅ Gmail clips emails over 102KB - optimize images
3. ✅ Outlook has limited CSS support - test thoroughly

---

## 📊 Recommended Setup for Production

**Best Practice Stack:**

1. **Email Service:** SendGrid (Free tier → Paid as you grow)
2. **DNS Configuration:** Proper SPF, DKIM, DMARC records
3. **Sender Email:** `no-reply@pawthenticate.com`
4. **Reply-to Email:** `hello@pawthenticate.com`
5. **Backend:** Next.js API route or Supabase Edge Function
6. **Monitoring:** Track delivery rates, opens, clicks

---

## 🔐 Security Best Practices

1. ✅ **Never commit SMTP credentials** to Git
2. ✅ Use environment variables for all secrets
3. ✅ Rotate API keys regularly
4. ✅ Use HTTPS for all confirmation links
5. ✅ Set expiration times on confirmation tokens
6. ✅ Rate-limit email sending to prevent abuse

---

## 📦 Required npm Packages

If implementing custom email backend:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Or for SendGrid:

```bash
npm install @sendgrid/mail
```

---

## 🎯 Next Steps

1. ✅ Choose your email service (SendGrid recommended)
2. ✅ Set up domain authentication (SPF, DKIM)
3. ✅ Configure SMTP credentials
4. ✅ Test email sending in development
5. ✅ Deploy and test in production
6. ✅ Monitor delivery rates

---

## 💡 Need Help?

- **Supabase Docs:** [supabase.com/docs/guides/auth/auth-smtp](https://supabase.com/docs/guides/auth/auth-smtp)
- **SendGrid Docs:** [docs.sendgrid.com](https://docs.sendgrid.com)
- **Nodemailer Docs:** [nodemailer.com](https://nodemailer.com)

---

## 📧 Example Email Preview

Your confirmation emails will look like this:

- 🎨 Beautiful gradient header with paw prints
- 🐾 Animated logo with your branding
- 🎯 Clear call-to-action button
- 📱 Mobile-responsive design
- ✨ Professional footer with trust signals

Perfect for making a great first impression! 🎉

---

**Made with ❤️ for Pawthenticate**

