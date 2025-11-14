import Link from 'next/link';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: November 14, 2025</p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Pawthenticate ("Service," "we," "our," or "us"), you agree to be bound by these Terms of Service 
                ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p className="text-gray-700 mb-4">
                You must be at least 18 years old to use this Service. By using the Service, you represent that you are of legal age 
                to form a binding contract.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Pawthenticate is a web application that allows users to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Create and manage pet profiles</li>
                <li>Generate professional pet resumes for rental applications or pet care services</li>
                <li>Store pet photos and documentation</li>
                <li>Export pet resumes as PDF documents</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700 mb-4">
                You must create an account to use our Service. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Termination</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account if you violate these Terms or engage in any conduct 
                we deem harmful to other users, us, or third parties.
              </p>
              <p className="text-gray-700 mb-4">
                You may delete your account at any time through the account settings page. Upon deletion, all your data will be 
                permanently removed within 30 days.
              </p>
            </section>

            {/* Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Provide false or misleading information about your pets</li>
                <li>Upload content that is illegal, offensive, or violates intellectual property rights</li>
                <li>Use the Service for any fraudulent or deceptive purpose</li>
                <li>Attempt to gain unauthorized access to other users' accounts or data</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated tools (bots, scrapers) without our permission</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Remove or modify any copyright, trademark, or proprietary notices</li>
              </ul>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Your Content</h3>
              <p className="text-gray-700 mb-4">
                You retain all ownership rights to the content you upload (photos, pet information, etc.). By uploading content, 
                you grant us a limited license to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Store and display your content within the Service</li>
                <li>Generate PDF resumes from your content</li>
                <li>Make backups for data recovery purposes</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This license terminates when you delete your content or account.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Our Intellectual Property</h3>
              <p className="text-gray-700 mb-4">
                The Service itself (including design, code, features, logos, and trademarks) is owned by Pawthenticate and 
                protected by copyright and trademark laws. You may not copy, modify, or distribute our intellectual property 
                without written permission.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Service "As Is"</h3>
              <p className="text-gray-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Not Professional Advice</h3>
              <p className="text-gray-700 mb-4">
                Pawthenticate is a resume-building tool only. We do not provide:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Veterinary or medical advice</li>
                <li>Legal advice regarding rental agreements or pet laws</li>
                <li>Guarantees that your pet will be accepted by landlords or pet care services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 No Guarantee of Availability</h3>
              <p className="text-gray-700 mb-4">
                We do not guarantee uninterrupted or error-free service. We may perform maintenance, updates, or modifications 
                that temporarily disrupt access.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PAWTHENTICATE SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or business opportunities</li>
                <li>Damages resulting from use or inability to use the Service</li>
                <li>Actions taken based on information in pet resumes</li>
                <li>Decisions made by landlords, property managers, or pet care providers</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Our total liability shall not exceed the amount you paid for the Service in the past 12 months (or $100, 
                whichever is greater).
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold Pawthenticate harmless from any claims, damages, losses, or expenses (including 
                legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Content you upload or share</li>
              </ul>
            </section>

            {/* Data and Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your use of the Service is also governed by our{' '}
                <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFB347]">Privacy Policy</Link>, 
                which explains how we collect, use, and protect your data.
              </p>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email 
                or a notice on the website. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access immediately, without notice, for any violation of these Terms or for 
                any other reason we deem necessary.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Service will cease immediately. Sections that by nature should survive 
                termination (including indemnification, limitations of liability, and dispute resolution) will remain in effect.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law and Disputes</h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by and construed in accordance with the laws of your jurisdiction, without regard to 
                conflict of law principles.
              </p>
              <p className="text-gray-700 mb-4">
                Any disputes arising from these Terms or the Service shall be resolved through good-faith negotiation. If 
                negotiation fails, disputes may be resolved through binding arbitration or small claims court.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or 
                eliminated to the minimum extent necessary, and the remaining provisions will remain in full force.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Entire Agreement</h2>
              <p className="text-gray-700 mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Pawthenticate 
                regarding the Service and supersede all prior agreements.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms:
              </p>
              <ul className="list-none mb-4 text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:legal@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">legal@pawthenticate.com</a></li>
                <li><strong>General inquiries:</strong> <a href="mailto:dev@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">dev@pawthenticate.com</a></li>
              </ul>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFB347]">Privacy Policy</Link>
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

