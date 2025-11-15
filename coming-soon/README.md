<div align="center">

# 🐾 Pawthenticate Coming Soon Landing Page

### *Where your pet's story lives*

[![Deploy Status](https://img.shields.io/badge/status-coming%20soon-orange)](https://pawthenticate.com)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

</div>

---

## 📁 What's Inside

This folder contains everything you need for your stunning coming soon landing page:

| File | Purpose |
|------|---------|
| **`index.html`** | Your main landing page (upload this to hosting) |
| **`coming-soon.html`** | Original backup version |
| **`DEPLOYMENT_GUIDE.md`** | Deploy to Netlify, Vercel, or GitHub Pages |
| **`SUBSCRIPTION_SETUP.md`** | Set up MailerLite email subscriptions |

---

## 🚀 Quick Start

### ✉️ Step 1: Set Up MailerLite Email Subscriptions

**Why MailerLite?** ⭐  
- ✅ **FREE forever** up to 1,000 subscribers
- ✅ Send beautiful newsletters to your waitlist
- ✅ Automated welcome emails
- ✅ Professional email campaigns
- ✅ Track opens, clicks, and engagement
- ✅ Drag & drop email designer

**Setup Steps:**

1. **Sign up for MailerLite:**
   - Go to [mailerlite.com](https://www.mailerlite.com)
   - Create FREE account with **hello@pawthenticate.com**
   - Verify your email

2. **Create a subscriber group:**
   - Click **"Subscribers"** → **"Groups"**
   - Create new group: `Pawthenticate Waitlist`

3. **Create an embedded form:**
   - Go to **"Forms"** → **"Embedded forms"**
   - Click **"Create embedded form"**
   - Choose **"Inline"** form type
   - Customize design to match your brand (or use default)
   - Click **"Done"** and copy the form code

4. **Get your form code:**
   - You'll get a code snippet like:
   ```html
   <div class="ml-embedded" data-form="ABC123"></div>
   <script src="https://assets.mailerlite.com/js/universal.js"></script>
   ```
   - Copy the entire code

5. **Update `index.html`:**
   - Open `index.html`
   - Find the subscription form section (around line 577)
   - Replace the existing form with your MailerLite code
   - Save the file

📖 **Detailed instructions:** See [`SUBSCRIPTION_SETUP.md`](SUBSCRIPTION_SETUP.md)

---

### 🌐 Step 2: Deploy Your Site

**Easiest Method - Netlify Drop (2 minutes):**

```bash
1. Go to app.netlify.com/drop
2. Drag and drop index.html
3. Connect your domain pawthenticate.com
4. Done! 🎉
```

📖 **Full deployment guide:** See [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

---

## 💝 Support This Project

<div align="center">

### Help us bring Pawthenticate to life!

**Love what we're building?** Your support helps us develop features, maintain servers, and keep Pawthenticate free for Australian renters and their pets.

<a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID">
  <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge&logo=paypal" alt="Donate with PayPal" />
</a>

**Or send directly to:** `hello@pawthenticate.com` via PayPal

---

### 🐾 Every contribution helps!

| Donation | What it supports |
|----------|------------------|
| ☕ **$5** | Covers hosting for 1 month |
| 🎨 **$10** | Funds design improvements |
| 🚀 **$25** | Enables new features |
| 💎 **$50+** | Accelerates full launch |

*All contributions are deeply appreciated but never required. Pawthenticate will always be free for pet owners!*

</div>

---

## 📧 How MailerLite Works

```
1. User enters email → Clicks "Notify Me!"
   ↓
2. MailerLite captures subscriber
   ↓
3. Subscriber added to your "Pawthenticate Waitlist" group
   ↓
4. You can send them newsletters & updates
   ↓
5. Automated welcome email sent (optional)
```

**Free Plan:** Up to **1,000 subscribers** + **12,000 emails/month** ✨

---

## ✅ Pre-Launch Checklist

Before you deploy, make sure you've:

- [ ] Created MailerLite account with **hello@pawthenticate.com**
- [ ] Created "Pawthenticate Waitlist" subscriber group
- [ ] Generated embedded form code
- [ ] Updated `index.html` with MailerLite form
- [ ] Updated PayPal button ID with your own
- [ ] Tested the form locally
- [ ] Deployed to your hosting service
- [ ] Connected your domain `pawthenticate.com`
- [ ] Tested live form submission
- [ ] Verified subscriber appears in MailerLite

---

## 🎨 What's Included

<table>
<tr>
<td>

### Design Features
- ✅ Beautiful brand-matched design
- ✅ Animated logo and paw prints
- ✅ Gradient backgrounds
- ✅ Glassmorphism effects
- ✅ Floating background shapes
- ✅ Smooth animations

</td>
<td>

### Functionality
- ✅ MailerLite email subscription
- ✅ PayPal donation integration
- ✅ Mobile responsive
- ✅ Success/error messages
- ✅ Contact email link
- ✅ Loading states

</td>
</tr>
</table>

---

## 📝 Customization Guide

### Change Email Address
**Location:** Line ~589 in `index.html`
```html
<a href="mailto:hello@pawthenticate.com" class="email-link">
  hello@pawthenticate.com
</a>
```

### Change Subscription Box Text
**Heading** (Line ~574):
```html
<h2>🐾 Get Early Access!</h2>
```

**Description** (Line ~575):
```html
<p>Be the first to know when Pawthenticate launches. Join our waitlist!</p>
```

### Update PayPal Button
**Location:** Donation section
```html
<!-- Replace YOUR_PAYPAL_BUTTON_ID with your actual button ID -->
<a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_BUTTON_ID">
```

---

## 🎯 Next Steps After Launch

1. **Send welcome email** to all waitlist subscribers
2. **Announce launch date** via MailerLite campaign
3. **Share launch link** in follow-up email
4. **Thank donors** with personalized messages
5. **Collect feedback** from early users

---

## 🆘 Need Help?

<div align="center">

**Questions? Stuck? We're here to help!**

📧 Email: [hello@pawthenticate.com](mailto:hello@pawthenticate.com)

📖 Read the guides:
- [`SUBSCRIPTION_SETUP.md`](SUBSCRIPTION_SETUP.md) - MailerLite setup
- [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) - Hosting & domain

</div>

---

<div align="center">

## 🌟 Made with ❤️ for Australian Pet Owners

**Pawthenticate** helps renters create beautiful, professional pet resumes that landlords love.

*Your support makes this dream a reality* 🐾

---

[![MailerLite](https://img.shields.io/badge/Email-MailerLite-green)](https://www.mailerlite.com)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue)](https://www.paypal.com)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7)](https://www.netlify.com)

</div>
