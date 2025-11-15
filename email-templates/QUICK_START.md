# 🚀 Quick Start - Email Setup in 5 Minutes

Get your Pawthenticate confirmation emails running quickly!

## ✅ What You're Getting

Beautiful email templates that match your landing page:
- Email confirmation when users sign up
- Welcome email after verification
- Password reset emails

All featuring your brand colors (coral & orange), paw prints, and modern design! 🐾

---

## 📦 Installation (2 minutes)

### Step 1: Install Dependencies

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Add Environment Variables

Add to your `.env.local` file:

```bash
# Mailgun (Recommended - Better for scaling)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@sandboxxxxx.mailgun.org
SMTP_PASSWORD=your_mailgun_password_here
SMTP_FROM=no-reply@pawthenticate.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Don't have Mailgun yet? See **"Get Mailgun Credentials"** below.

---

## 🎯 Get Mailgun Credentials (2 minutes)

1. **Sign up for Mailgun:**
   - Go to [signup.mailgun.com](https://signup.mailgun.com/new/signup)
   - Click "Try for Free"
   - Fill in your details and verify email

2. **Get SMTP credentials:**
   - After login, go to **Sending** → **Overview**
   - Scroll to **Sending** → **Domain settings**
   - Click on your sandbox domain (looks like: `sandboxxxxx.mailgun.org`)
   - Find the **SMTP credentials** section:
     - **Host:** `smtp.mailgun.org`
     - **Port:** 587
     - **Username:** `postmaster@sandboxxxxx.mailgun.org` (copy this)
     - **Password:** Click "Reset password" to generate a new one

3. **Add to `.env.local`:**
   ```bash
   SMTP_USER=postmaster@sandboxxxxx.mailgun.org
   SMTP_PASSWORD=your_mailgun_password_here
   ```

4. **Free tier:** 5,000 emails/month for 3 months, then $0.80 per 1,000 emails

**Alternative: SendGrid** (100 emails/day forever free)
- Simpler but lower volume
- See SETUP_GUIDE.md for SendGrid instructions

---

## ✨ Usage (1 minute)

### Send Confirmation Email

In your signup handler (e.g., `app/auth/signup/page.tsx`):

```typescript
import { sendConfirmationEmail } from '@/lib/emailService';

// After user signs up
const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?token=${token}`;
await sendConfirmationEmail(user.email, confirmUrl);
```

### Send Welcome Email

After email is confirmed:

```typescript
import { sendWelcomeEmail } from '@/lib/emailService';

await sendWelcomeEmail(user.email);
```

### Send Password Reset

```typescript
import { sendPasswordResetEmail } from '@/lib/emailService';

const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset?token=${token}`;
await sendPasswordResetEmail(user.email, resetUrl);
```

---

## 🧪 Test It!

### Option 1: Test API Endpoint

```bash
# Start your dev server
npm run dev

# In another terminal, test the email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","template":"confirm"}'
```

### Option 2: Test in Browser

Visit: `http://localhost:3000/api/test-email` to check configuration status.

### Option 3: Test Directly

Create `scripts/test-email.ts`:

```typescript
import { sendConfirmationEmail } from '../lib/emailService';

sendConfirmationEmail(
  'your-email@example.com',
  'http://localhost:3000/auth/confirm?token=test123'
).then(() => {
  console.log('✅ Email sent!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
```

Run: `npx tsx scripts/test-email.ts`

---

## 🎨 What Your Emails Look Like

### Confirmation Email
```
┌─────────────────────────────────┐
│  🎨 Gradient Header (Coral→Orange)
│     🐾 Paw Logo 🐾
│      Pawthenticate
│  
│  🎉 Welcome to Pawthenticate!
│  
│  Verify Your Email
│  
│  [Confirm My Account ✨] ← Big button
│  
│  What's Next? 🚀
│  📝 Create Resume  📄 Download PDF
│  🏠 Impress Landlords  💯 Free Forever
│  
│  🇦🇺 Made in Australia  🎉 100% Free
└─────────────────────────────────┘
```

Professional, modern, and on-brand! 🎉

---

## 🔧 Troubleshooting

### "SMTP Connection Error"

**Check:**
1. ✅ Is `SMTP_HOST` correct? (`smtp.sendgrid.net`)
2. ✅ Is `SMTP_USER` set to `apikey` (literally the word "apikey")?
3. ✅ Is `SMTP_PASSWORD` your SendGrid API key?
4. ✅ Did you restart your dev server after adding .env variables?

### "Authentication failed"

- Your API key is wrong or expired
- Create a new API key in SendGrid dashboard
- Make sure you copied it correctly (no extra spaces)

### Emails going to spam?

For testing, this is normal. For production:
1. Verify your domain with SendGrid (SPF/DKIM records)
2. Use `no-reply@pawthenticate.com` as sender
3. See full guide in `SETUP_GUIDE.md`

### Variables not replacing (showing {% raw %}`{{ .ConfirmationURL }}`{% endraw %})?

- Make sure you're passing the URL to the function:
  ```typescript
  await sendConfirmationEmail(email, confirmUrl); // ✅ Correct
  await sendConfirmationEmail(email); // ❌ Missing URL
  ```

---

## 💰 Pricing Comparison

### **Mailgun** (⭐ Recommended)
**Free Trial:**
- 5,000 emails/month for first 3 months
- Then requires payment

**Pay-as-you-go:**
- $0.80 per 1,000 emails (after free trial)
- No monthly commitment
- Only pay for what you use

**Monthly Plans:**
- $35/month = 50,000 emails
- $80/month = 100,000 emails

**Best for:** Startups that might scale quickly

---

### **SendGrid** (Alternative)
**Free Forever:**
- 100 emails/day (3,000/month)
- Limited but permanent

**Paid Plans:**
- $15/month = 40,000 emails
- $20/month = 100,000 emails

**Best for:** Consistent low volume

---

### **Cost Example Scenarios:**

| Monthly Signups | Mailgun Cost | SendGrid Cost |
|-----------------|--------------|---------------|
| 100 signups | Free (trial) | Free |
| 1,000 signups | Free (trial) | $15/month |
| 5,000 signups | $0.80 | $15/month |
| 10,000 signups | $8 | $20/month |
| 50,000 signups | $35 (plan) | $20/month |

💡 **Mailgun is cheaper for unpredictable growth** - you only pay for what you use!

---

## 🎯 Next Steps

### For Development:
1. ✅ Install nodemailer
2. ✅ Add SendGrid API key to `.env.local`
3. ✅ Test with `/api/test-email`
4. ✅ Use in your signup flow

### For Production:
1. ✅ Verify your domain `pawthenticate.com` in SendGrid
2. ✅ Add SPF/DKIM DNS records
3. ✅ Update `SMTP_FROM` to `no-reply@pawthenticate.com`
4. ✅ Set production URL in `NEXT_PUBLIC_SITE_URL`
5. ✅ Remove/protect the test endpoint
6. ✅ Monitor delivery rates in SendGrid dashboard

---

## 💡 Pro Tips

1. **Test in multiple email clients:**
   - Gmail ✅
   - Outlook ✅
   - Apple Mail ✅
   - Mobile ✅

2. **Use Mailtrap for development:**
   - Catches all emails in a sandbox
   - [mailtrap.io](https://mailtrap.io) (free tier available)

3. **Monitor your emails:**
   - Check SendGrid dashboard for delivery rates
   - Track opens/clicks (optional)
   - Review bounce/spam reports

4. **Customize the templates:**
   - Edit HTML files in `email-templates/`
   - Change colors, text, layout
   - Add your logo image URL

---

## 📞 Need More Help?

- 📖 **Full Guide:** Read `SETUP_GUIDE.md`
- 🔧 **Troubleshooting:** Check `README.md`
- 📧 **SendGrid Docs:** [docs.sendgrid.com](https://docs.sendgrid.com)
- 🎓 **Nodemailer Docs:** [nodemailer.com](https://nodemailer.com)

---

## ✅ Checklist

Before you deploy to production:

- [ ] SendGrid account created
- [ ] API key added to `.env.local` (and production env)
- [ ] Domain verified with SendGrid
- [ ] SPF/DKIM DNS records added
- [ ] Tested emails in development
- [ ] Tested on multiple email clients
- [ ] Updated `SMTP_FROM` to `no-reply@pawthenticate.com`
- [ ] Removed or protected `/api/test-email` route
- [ ] Emails going to inbox (not spam)
- [ ] Links in emails work correctly

---

**That's it! You're all set! 🎉**

Your users will now receive beautiful, branded confirmation emails that match your Pawthenticate landing page perfectly.

🐾 Where your pet's story lives

