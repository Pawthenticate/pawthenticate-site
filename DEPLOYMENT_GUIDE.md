# 🚀 Deploy Your Coming Soon Page

## Quick Start: Deploy to Netlify (5 minutes)

### Step 1: Prepare Your File
1. Rename `coming-soon.html` to `index.html`
2. Update the email address in the file to your actual email

### Step 2: Deploy to Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your `index.html` file into the box
3. Wait a few seconds - you'll get a live URL!

### Step 3: Connect Your Domain
1. Click on your new site in Netlify dashboard
2. Go to "Domain settings"
3. Click "Add custom domain"
4. Enter your domain (e.g., `yourdomain.com`)
5. Netlify will check if you own it

### Step 4: Update DNS Settings
You need to point your domain to Netlify. You'll do this at your domain registrar (where you bought the domain - GoDaddy, Namecheap, Google Domains, etc.)

**Option A: Use Netlify DNS (Easiest)**
1. Netlify will give you nameservers like:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - etc.
2. Go to your domain registrar
3. Find "DNS Settings" or "Nameservers"
4. Replace existing nameservers with Netlify's
5. Wait 5-30 minutes for DNS to update

**Option B: Keep Your DNS, Add Records**
1. In your domain's DNS settings, add these records:
   - **A Record**: Points `@` (root domain) to Netlify's IP: `75.2.60.5`
   - **CNAME Record**: Points `www` to your Netlify URL (e.g., `random-name-123.netlify.app`)
2. Wait 5-30 minutes for DNS to update

### Step 5: Enable HTTPS
1. Once DNS is connected, go back to Netlify
2. Under "Domain settings" → "HTTPS"
3. Click "Verify DNS configuration"
4. Enable HTTPS (free SSL certificate)
5. Wait a few minutes for certificate to activate

### Done! ✨
Your site will be live at `https://yourdomain.com`

---

## Alternative: Deploy to Vercel

### Quick Deploy
1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign up with GitHub/Email
3. Upload your `index.html` file
4. Click "Deploy"
5. Add your custom domain in project settings
6. Update DNS similar to Netlify instructions above

---

## Alternative: GitHub Pages

### Quick Deploy
1. Create GitHub account
2. Create repository: `username.github.io`
3. Upload your `index.html` file
4. Go to Settings → Pages
5. Enable Pages from main branch
6. Add custom domain
7. Update DNS:
   - **A Records** pointing to GitHub IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record**: `www` → `username.github.io`

---

## 📝 Before Deploying

Don't forget to update the contact email in `coming-soon.html`:

```html
<a href="mailto:hello@pawthenticate.com" class="email-link">hello@pawthenticate.com</a>
```

Change `hello@pawthenticate.com` to your actual email address.

---

## 🆘 Common Issues

**"DNS not updating"**
- DNS can take 5-60 minutes to propagate
- Clear your browser cache
- Try in incognito/private mode
- Check DNS with: [dnschecker.org](https://dnschecker.org)

**"Site not loading"**
- Make sure file is named `index.html` (not `coming-soon.html`)
- Check DNS records are correct
- Wait at least 15 minutes after DNS changes

**"Not secure" warning**
- Enable HTTPS/SSL in your hosting settings
- May take a few minutes to activate after DNS connects

---

## 💡 Tips

- **Netlify** and **Vercel** are the easiest for beginners
- Both offer free plans that are more than enough for a coming soon page
- Both give you HTTPS automatically
- Both are blazing fast with global CDN
- You can update your site anytime by uploading a new file

---

## 📧 Need Help?

If you get stuck, most hosting providers have excellent docs:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)


