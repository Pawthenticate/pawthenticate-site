import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-[#FF6B6B] hover:text-[#FFB347] transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 14, 2025</p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Pawthenticate ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our pet resume builder service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Account Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Email address (for account creation and authentication)</li>
                <li>Password (encrypted and securely stored)</li>
                <li>Account creation and last login dates</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Pet Profile Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Pet name, species, breed, date of birth</li>
                <li>Physical characteristics (size, weight, appearance)</li>
                <li>Medical information (vaccinations, microchip number, insurance details)</li>
                <li>Behavioral information (temperament, training status)</li>
                <li>Photos and documents you upload</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address (anonymized)</li>
                <li>Usage data (pages visited, features used)</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>To provide our service:</strong> Create, store, and manage pet profiles and resumes</li>
                <li><strong>To authenticate you:</strong> Secure login and account management</li>
                <li><strong>To communicate:</strong> Send important updates, password resets, and service notifications</li>
                <li><strong>To improve our service:</strong> Analyze usage patterns to enhance features</li>
                <li><strong>To ensure security:</strong> Prevent fraud and protect user data</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-700 mb-4">
                Your data is stored securely using Supabase (PostgreSQL database and storage), hosted on AWS infrastructure with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>End-to-end encryption for data in transit (HTTPS/TLS)</li>
                <li>Encrypted storage for data at rest</li>
                <li>Row-Level Security (RLS) policies ensuring users can only access their own data</li>
                <li>Regular automated backups</li>
                <li>Industry-standard authentication protocols</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Third Parties</h2>
              <p className="text-gray-700 mb-4">
                <strong>We do NOT sell your personal data to anyone.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                We only share data with trusted service providers who help us operate:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>Vercel:</strong> Hosting and content delivery</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These providers are contractually obligated to protect your data and cannot use it for their own purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR Compliance)</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
                <li><strong>Rectification:</strong> Correct any inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your account and all associated data</li>
                <li><strong>Portability:</strong> Export your pet data in a machine-readable format</li>
                <li><strong>Object:</strong> Opt-out of certain data processing activities</li>
                <li><strong>Withdraw consent:</strong> Remove permission for data collection at any time</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">
                  privacy@pawthenticate.com
                </a>
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use essential cookies for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Authentication (keeping you logged in)</li>
                <li>Session management</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We do not use tracking cookies for advertising purposes.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is intended for users 18 years and older. We do not knowingly collect data from children under 18. 
                If you believe we have inadvertently collected such data, please contact us immediately.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your data for as long as your account is active. When you delete your account:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>All pet profiles are permanently deleted within 30 days</li>
                <li>Uploaded photos and documents are permanently deleted within 30 days</li>
                <li>Your email and account information are permanently deleted within 30 days</li>
                <li>Anonymized usage statistics may be retained for analytical purposes</li>
              </ul>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your data may be transferred to and stored on servers located outside your country. We ensure appropriate 
                safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of significant changes via email 
                or a prominent notice on our website. Your continued use of the service after changes constitutes acceptance.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this privacy policy or our data practices:
              </p>
              <ul className="list-none mb-4 text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:privacy@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">privacy@pawthenticate.com</a></li>
                <li><strong>General inquiries:</strong> <a href="mailto:dev@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">dev@pawthenticate.com</a></li>
              </ul>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/terms" className="text-[#FF6B6B] hover:text-[#FFB347]">Terms of Service</Link>
              <span className="text-gray-400">•</span>
              <Link href="/contact" className="text-[#FF6B6B] hover:text-[#FFB347]">Contact Us</Link>
              <span className="text-gray-400">•</span>
              <Link href="/" className="text-[#FF6B6B] hover:text-[#FFB347]">Home</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

