<div align="center">

# 📧 Pawthenticate Email Templates

### *Beautiful, responsive emails that match your brand*

[![MailerLite](https://img.shields.io/badge/Platform-MailerLite-green)](https://www.mailerlite.com)
[![Responsive](https://img.shields.io/badge/design-responsive-blue)](.)

</div>

---

## 🎨 Templates Included

<table>
<tr>
<td width="33%">

### ✅ **Confirm Email**
`confirm-email.html`

Email verification when users sign up

**Use for:**
- Account activation
- Email verification
- Welcome confirmation

</td>
<td width="33%">

### 🎉 **Welcome Email**
`welcome-email.html`

Welcome message after confirmation

**Use for:**
- Onboarding new users
- First-time greetings
- Feature introduction

</td>
<td width="33%">

### 🔐 **Password Reset**
`password-reset.html`

Password reset requests

**Use for:**
- Forgot password flow
- Security updates
- Account recovery

</td>
</tr>
</table>

---

## 🌟 Design Features

All templates include:

✨ **Your brand colors** (coral #FF6B6B and orange #FFB347)  
🎨 **Gradient backgrounds** and buttons  
🐾 **Paw print decorations** for personality  
💎 **Glassmorphism design** elements  
📱 **Mobile-responsive** layouts  
✍️ **Professional typography** (Lato & Merriweather)  

---

## 🚀 Quick Start

### Option 1: Use with MailerLite (Recommended)

MailerLite makes it easy to send beautiful campaigns to your subscribers!

#### Step 1: Upload Templates to MailerLite

1. **Go to MailerLite dashboard:**
   - Click **"Campaigns"** → **"Email templates"**

2. **Create new template:**
   - Click **"Create template"**
   - Choose **"Custom HTML"**

3. **Import template:**
   - Open `confirm-email.html` in a text editor
   - Copy the entire HTML
   - Paste into MailerLite's HTML editor

4. **Customize variables:**
   - Replace placeholders:
     - `{{ .ConfirmationURL }}` → MailerLite merge tag
     - `{{ .SiteURL }}` → `https://pawthenticate.com`

5. **Save template:**
   - Name it: `Pawthenticate - Email Confirmation`
   - Save for future campaigns

6. **Repeat for other templates:**
   - Welcome email
   - Password reset

#### Step 2: Send Campaigns

```
1. Create campaign → Select template
2. Choose recipients (Pawthenticate Waitlist)
3. Preview & test
4. Send or schedule!
```

**Benefit:** Manage all emails from one dashboard, track opens/clicks, A/B test!

---

### Option 2: Use with Custom Backend (Advanced)

For developers who want full control with Supabase authentication.

#### Install Dependencies

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

#### Environment Variables

Add to `.env.local`:

```bash
# MailerLite API (for transactional emails)
MAILERLITE_API_KEY=your_mailerlite_api_key

# OR use custom SMTP
SMTP_HOST=smtp.mailerlite.com
SMTP_PORT=587
SMTP_USER=your_mailerlite_username
SMTP_PASSWORD=your_mailerlite_password
SMTP_FROM=no-reply@pawthenticate.com
```

#### Use the Email Service

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

---

### Option 3: Use with Supabase Email Templates

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication** → **Email Templates**
3. Copy HTML from each template file
4. Paste into corresponding Supabase template
5. Save

⚠️ **Note:** Free Supabase emails come from `noreply@mail.app.supabase.io`.  
To use `no-reply@pawthenticate.com`, you need Supabase Pro ($25/month).

---

## 📖 Full Setup Guides

<div align="center">

| Guide | Purpose |
|-------|---------|
| **[`QUICK_START.md`](QUICK_START.md)** | Get running in 5 minutes |
| **[`SETUP_GUIDE.md`](SETUP_GUIDE.md)** | Production setup with MailerLite |
| **[`MAILERLITE_GUIDE.md`](MAILERLITE_GUIDE.md)** | Complete MailerLite integration |

</div>

---

## 📊 MailerLite vs. Other Services

<table>
<thead>
<tr>
<th>Feature</th>
<th>MailerLite ⭐</th>
<th>Mailgun</th>
<th>SendGrid</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Free Tier</strong></td>
<td>1,000 subscribers<br/>12,000 emails/month</td>
<td>5,000 emails/month<br/>(3 months)</td>
<td>100 emails/day</td>
</tr>
<tr>
<td><strong>After Free</strong></td>
<td>$9/month (1,000 subs)</td>
<td>$0.80/1,000 emails</td>
<td>$15/month (40k)</td>
</tr>
<tr>
<td><strong>Best For</strong></td>
<td>Newsletters + forms</td>
<td>High volume transactional</td>
<td>Consistent volume</td>
</tr>
<tr>
<td><strong>Email Builder</strong></td>
<td>✅ Drag & drop</td>
<td>❌ None</td>
<td>✅ Basic</td>
</tr>
<tr>
<td><strong>Landing Pages</strong></td>
<td>✅ Included</td>
<td>❌ None</td>
<td>❌ None</td>
</tr>
<tr>
<td><strong>Automation</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>✅ Limited</td>
</tr>
<tr>
<td><strong>Forms/Pop-ups</strong></td>
<td>✅ Unlimited</td>
<td>❌ None</td>
<td>❌ None</td>
</tr>
</tbody>
</table>

### Why MailerLite for Pawthenticate?

✅ **All-in-one solution:** Forms, emails, automation  
✅ **Free forever** for up to 1,000 subscribers  
✅ **Beautiful templates** and drag & drop builder  
✅ **Easy to use** even for non-developers  
✅ **Perfect for launch:** Build waitlist + send newsletters  

**Use MailerLite for marketing** (waitlist, newsletters, announcements)  
**Use Supabase for transactional** (signup, password resets) [optional]

---

## 🎨 Customization

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

```html
{{ .ConfirmationURL }}  <!-- Confirmation/reset link -->
{{ .SiteURL }}           <!-- Your website URL -->
{{ .Token }}             <!-- Raw token (if needed) -->
```

In MailerLite, use their merge tags:
- `{$url}` for links
- `{$email}` for subscriber email
- `{$name}` for subscriber name

---

## ✅ Testing Your Emails

### 1. Test in MailerLite

```
1. Open campaign → Click "Preview"
2. Send test email to yourself
3. Check inbox (and spam folder)
4. Open on mobile phone
5. Test all links and buttons
```

### 2. Test Rendering

Use these tools:
- [Litmus](https://litmus.com) - Professional testing (paid)
- [Email on Acid](https://www.emailonacid.com) - Cross-client testing
- [Mail Tester](https://www.mail-tester.com) - Free spam score check

### 3. Test on Multiple Clients

Send test emails to:
- ✅ Gmail (desktop & mobile)
- ✅ Outlook (desktop & web)
- ✅ Apple Mail (iPhone & Mac)
- ✅ Yahoo Mail
- ✅ ProtonMail

---

## 💝 Support Section in Emails

Add PayPal donation link to your email footer:

```html
<div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
  <p style="color: #6B7280; font-size: 14px; margin-bottom: 10px;">
    ❤️ Love Pawthenticate? Support the project!
  </p>
  <a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID" 
     style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%); 
            color: white; text-decoration: none; border-radius: 8px; font-weight: 700;">
    Donate via PayPal
  </a>
  <p style="color: #9CA3AF; font-size: 12px; margin-top: 10px;">
    All donations help us keep Pawthenticate free for everyone! 🐾
  </p>
</div>
```

**Remember to replace `YOUR_BUTTON_ID` with your actual PayPal button ID!**

---

## 🔐 Security Best Practices

### Email Security Checklist

- [x] **Use HTTPS** for all links
- [x] **Set token expiration** times (24-48 hours)
- [x] **Validate email** addresses before sending
- [x] **Rate limit** sending to prevent abuse
- [x] **Never expose** API keys in client code
- [x] **Use environment** variables for secrets
- [x] **Enable 2FA** on MailerLite account
- [x] **Rotate API keys** regularly

### Compliance

- [x] **Include unsubscribe** link (MailerLite adds automatically)
- [x] **Add physical address** in footer (required for commercial emails)
- [x] **Honor opt-outs** immediately
- [x] **GDPR compliant** (MailerLite is)
- [x] **Privacy policy** link in emails

---

## 📝 Email Content Best Practices

### ✅ DO

- Keep subject lines under 50 characters
- Include plain text alternative
- Use alt text for images
- Test on multiple email clients
- Personalize with subscriber name
- Mobile-first design
- Clear call-to-action
- Include unsubscribe option

### ❌ DON'T

- Use excessive images (Gmail clips at 102KB)
- Rely on CSS positioning
- Use JavaScript (most clients block it)
- Send without authentication (SPF/DKIM)
- Use "no-reply" without good reason
- Forget to test before sending

---

## 🐛 Troubleshooting

### Emails Going to Spam?

**Solutions:**

1. **Verify your domain** in MailerLite:
   - Settings → Domains
   - Add `pawthenticate.com`
   - Add SPF and DKIM records to DNS

2. **Avoid spam trigger words:**
   - "FREE", "WIN", "CLICK NOW", "ACT NOW"
   - Excessive punctuation!!!
   - ALL CAPS SUBJECT LINES

3. **Warm up your sending:**
   - Start with 50-100 emails
   - Gradually increase volume
   - Monitor bounce/spam rates

4. **Test your emails:**
   - Use [mail-tester.com](https://www.mail-tester.com)
   - Aim for 8/10 or higher score

### Variables Not Replacing?

**Check:**
- Variable format is correct
- Variables are passed to template
- No typos in variable names
- Using correct merge tag syntax for your platform

### Template Not Displaying Correctly?

**Fix:**
- Use inline CSS only
- Test in multiple email clients
- Validate HTML structure
- Check file encoding (UTF-8)
- Reduce image sizes

---

## 🎯 Launch Day Email Sequence

### Email 1: Welcome (Immediate)
```
Subject: Welcome to Pawthenticate! 🐾
Content: Thank you for joining, what to expect
```

### Email 2: Behind the Scenes (Week 1)
```
Subject: We're building something special for you
Content: Development updates, sneak peeks
```

### Email 3: Feature Preview (Week 3)
```
Subject: Sneak peek: Your pet's resume will look amazing! ✨
Content: Screenshots, feature highlights
```

### Email 4: Launch Countdown (Week 5)
```
Subject: 7 days until launch! 🚀
Content: Final countdown, prepare for launch
```

### Email 5: WE'RE LIVE! (Launch Day)
```
Subject: 🎉 Pawthenticate is LIVE! Create your pet's resume now
Content: Launch announcement, call-to-action, early access link
```

---

<div align="center">

## 💝 Support Pawthenticate

**Love these email templates?** Help us continue improving!

<a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID">
  <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge&logo=paypal" alt="Donate with PayPal" />
</a>

*Or send directly to:* **hello@pawthenticate.com** via PayPal

---

## 🆘 Need Help?

**Questions about email setup?**

📧 **Email:** [hello@pawthenticate.com](mailto:hello@pawthenticate.com)

📚 **Resources:**
- [MailerLite Help Center](https://www.mailerlite.com/help)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Nodemailer Docs](https://nodemailer.com)

---

## 🌟 Made with ❤️ for Pawthenticate

**Where your pet's story lives** 🐾

[![MailerLite](https://img.shields.io/badge/Email-MailerLite-green)](https://www.mailerlite.com)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue)](https://www.paypal.com)

</div>
