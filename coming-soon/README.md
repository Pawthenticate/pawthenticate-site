# 🐾 Pawthenticate Coming Soon Landing Page

This folder contains everything you need for your coming soon landing page.

## 📁 Files

- **`index.html`** - Your main landing page (upload this to GitHub/hosting)
- **`coming-soon.html`** - Original version (backup, you don't need this)
- **`DEPLOYMENT_GUIDE.md`** - How to deploy to Netlify, Vercel, or GitHub Pages
- **`SUBSCRIPTION_SETUP.md`** - How to set up the email subscription form

## 🚀 Quick Start

### 1. Set Up Email Subscriptions

**Important:** When people submit their email, you'll receive it at **hello@pawthenticate.com**

**Steps:**
1. Go to [formspree.io](https://formspree.io)
2. **Sign up using hello@pawthenticate.com** ← This is the email that will receive submissions!
3. Create a new form called "Pawthenticate Waitlist"
4. Copy your form ID (looks like `xpznabcd`)
5. Open `index.html` and find line 563
6. Replace `YOUR_FORM_ID` with your actual form ID
7. Save the file

### 2. Deploy Your Site

**Easiest Method - Netlify Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop `index.html`
3. Connect your domain `pawthenticate.com`
4. Done! 🎉

**See `DEPLOYMENT_GUIDE.md` for more detailed instructions.**

## 📧 How Email Works

1. User enters email on your website → Clicks "Notify Me!"
2. Formspree receives the submission
3. **You get an email at hello@pawthenticate.com** with the subscriber's email address
4. User sees success message on your site

**Free Plan:** Up to 50 submissions per month

## ✅ Before You Upload

Make sure you've:
- [ ] Created Formspree account with **hello@pawthenticate.com**
- [ ] Updated the form ID in `index.html` (line 563)
- [ ] Tested the form locally (optional)
- [ ] Uploaded to your hosting service
- [ ] Connected your domain `pawthenticate.com`

## 🎨 What's Included

- ✅ Beautiful brand-matched design
- ✅ Animated logo and paw prints
- ✅ Email subscription form
- ✅ Mobile responsive
- ✅ Success/error messages
- ✅ Contact email link

## 📝 Customization

To change text, edit these sections in `index.html`:

**Email address** (appears at bottom):
- Line 580: Change `hello@pawthenticate.com` to your preferred contact email

**Subscription box text**:
- Line 560: Heading
- Line 561: Description
- Line 572: Button text

## 🆘 Need Help?

Check the detailed guides:
- `DEPLOYMENT_GUIDE.md` - For hosting/domain setup
- `SUBSCRIPTION_SETUP.md` - For email form setup

---

**Note:** The email subscription form requires a Formspree account. Sign up with **hello@pawthenticate.com** so that all subscriber emails come to that address!


