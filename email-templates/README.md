# 📧 Pawthenticate Email Templates

Beautiful, responsive email templates that match your landing page design!

## 🎨 Templates Included

1. **`confirm-email.html`** - Email verification when users sign up
2. **`welcome-email.html`** - Welcome message after confirmation
3. **`password-reset.html`** - Password reset requests

## 🚀 Quick Start

### Option 1: Use with Custom Backend (Recommended)

1. **Install dependencies:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Add environment variables to `.env.local`:**
   ```bash
   # Mailgun (Recommended for Production)
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=postmaster@sandboxxxxx.mailgun.org
   SMTP_PASSWORD=your_mailgun_password
   SMTP_FROM=no-reply@pawthenticate.com
   
   # OR Gmail (Testing only)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_FROM=no-reply@pawthenticate.com
   ```

3. **Use the email service:**
   ```typescript
   import { sendConfirmationEmail, sendWelcomeEmail } from '@/lib/emailService';

   // After user signs up
   await sendConfirmationEmail(
     user.email,
     `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token=${token}`
   );

   // After email is confirmed
   await sendWelcomeEmail(user.email);
   ```

### Option 2: Use with Supabase Email Templates

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication** → **Email Templates**
3. Copy the HTML from each template file
4. Paste into the corresponding Supabase template
5. Save

⚠️ **Note:** Free Supabase emails come from `noreply@mail.app.supabase.io`. To use `no-reply@pawthenticate.com`, you need Supabase Pro ($25/month).

## 📖 Full Setup Guide

See these guides for complete instructions:
- **`QUICK_START.md`** - Get running in 5 minutes
- **`SETUP_GUIDE.md`** - Production setup (Mailgun, SendGrid, AWS SES)
- **`MAILGUN_VS_SENDGRID.md`** - Detailed pricing comparison
- Domain authentication (SPF, DKIM)
- Testing and troubleshooting
- Production deployment

## 🎨 Design Features

All templates include:
- ✅ Coral (#FF6B6B) and Orange (#FFB347) brand colors
- ✅ Gradient backgrounds matching your landing page
- ✅ Animated paw print decorations 🐾
- ✅ Inline SVG logo
- ✅ Mobile-responsive layout
- ✅ Accessible HTML structure
- ✅ Professional typography

## 🔧 Customization

### Change Colors

Search and replace:
- Primary: `#FF6B6B` → your color
- Secondary: `#FFB347` → your color
- Gradients: `linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)`

### Add Your Logo

Replace the inline SVG with:
```html
<img src="https://pawthenticate.com/logo.png" alt="Pawthenticate" width="60" height="60">
```

### Modify Variables

Templates use these variables:
- `{{ .ConfirmationURL }}` - Confirmation/reset link
- `{{ .SiteURL }}` - Your website URL
- `{{ .Token }}` - Raw token (if needed)

## ✅ Testing

Send a test email:

```typescript
import { sendTestEmail } from '@/lib/emailService';

await sendTestEmail('your-email@example.com');
```

## 📊 Email Service Comparison

| Service | Free Tier | Pay-As-You-Go | Best For |
|---------|-----------|---------------|----------|
| **Mailgun** ⭐ | 5k/mo (3 months) | $0.80/1000 emails | Unpredictable growth, startups |
| **SendGrid** | 100/day forever | $15/mo for 40k | Consistent low volume |
| **AWS SES** | None | $0.10/1000 emails | High volume (100k+/month) |
| **Gmail** | ~500/day | Free | Testing only |

### Why Mailgun for Production?
- ✅ **Pay only for what you use** - No wasted money on unused quota
- ✅ **Better free trial** - 5,000 emails vs 3,000 (SendGrid)
- ✅ **Flexible scaling** - Handles viral growth without plan changes
- ✅ **Cost-effective** - $0.80/1000 is cheaper than SendGrid at low-medium volume
- ✅ **Developer-friendly** - Great API and documentation

## 🔐 Security

- ✅ Never commit SMTP credentials to Git
- ✅ Use environment variables for secrets
- ✅ Enable 2FA on email service accounts
- ✅ Rotate API keys regularly
- ✅ Use HTTPS for all links
- ✅ Set token expiration times

## 📝 Email Content Guidelines

**DO:**
- ✅ Keep subject lines under 50 characters
- ✅ Include plain text alternative
- ✅ Use alt text for images
- ✅ Test on multiple email clients
- ✅ Include unsubscribe option (for marketing emails)

**DON'T:**
- ❌ Use excessive images (Gmail clips at 102KB)
- ❌ Rely on CSS positioning
- ❌ Use JavaScript
- ❌ Send without authentication (SPF/DKIM)

## 🐛 Troubleshooting

### Emails going to spam?
- Verify your domain with SPF/DKIM records
- Use a reputable email service
- Avoid spam trigger words
- Test with [mail-tester.com](https://www.mail-tester.com)

### Variables not replacing?
- Check variable format: `{{ .VariableName }}`
- Ensure variables are passed to `sendEmail()`
- Check for typos in variable names

### Template not displaying correctly?
- Test in multiple email clients
- Use inline CSS only
- Validate HTML structure
- Check file encoding (should be UTF-8)

## 📧 Need Help?

- Read the full **`SETUP_GUIDE.md`**
- Check [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- Visit [Nodemailer Docs](https://nodemailer.com)
- Test emails at [Mailtrap.io](https://mailtrap.io)

---

**Made with ❤️ for Pawthenticate**

🐾 Where your pet's story lives

