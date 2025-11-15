/**
 * Home Page - Coming Soon
 * 
 * Shows the coming soon page with MailerLite waitlist form
 */

import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the static HTML page using Next.js server redirect
  redirect('/coming-soon.html');
}
