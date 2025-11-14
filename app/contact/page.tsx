import Link from 'next/link';

export default function Contact() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact & Support</h1>
          <p className="text-gray-600 mb-8">We're here to help! Get in touch with us.</p>

          <div className="space-y-8">
            {/* Contact Options */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* General Inquiries */}
                <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE8CC] p-6 rounded-xl border-2 border-[#FFB347]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">General Inquiries</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Questions about our service or features?
                  </p>
                  <a href="mailto:dev@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347] font-semibold">
                    dev@pawthenticate.com
                  </a>
                </div>

                {/* Technical Support */}
                <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE8CC] p-6 rounded-xl border-2 border-[#FFB347]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FFB347] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Technical Support</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Need help with a bug or technical issue?
                  </p>
                  <a href="mailto:support@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347] font-semibold">
                    support@pawthenticate.com
                  </a>
                </div>

                {/* Privacy & Data */}
                <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE8CC] p-6 rounded-xl border-2 border-[#FFB347]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#8F6548] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Privacy & Data</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Questions about your data or privacy?
                  </p>
                  <a href="mailto:privacy@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347] font-semibold">
                    privacy@pawthenticate.com
                  </a>
                </div>

                {/* Legal Matters */}
                <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE8CC] p-6 rounded-xl border-2 border-[#FFB347]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#6B7280] rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Legal Matters</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Legal inquiries or terms questions?
                  </p>
                  <a href="mailto:legal@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347] font-semibold">
                    legal@pawthenticate.com
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {/* FAQ 1 */}
                <div className="border-l-4 border-[#FF6B6B] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I create a pet resume?</h3>
                  <p className="text-gray-700">
                    Sign up for a free account, create a pet profile with your pet's information, and then generate a 
                    professional PDF resume from the preview page. You can choose between rental and pet sitter templates.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="border-l-4 border-[#FFB347] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is Pawthenticate free to use?</h3>
                  <p className="text-gray-700">
                    Yes! Pawthenticate is completely free to use. You can create unlimited pet profiles and generate 
                    as many resumes as you need.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="border-l-4 border-[#8F6548] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I manage multiple pets?</h3>
                  <p className="text-gray-700">
                    Absolutely! You can create profiles for all your pets and easily switch between them in your dashboard.
                  </p>
                </div>

                {/* FAQ 4 */}
                <div className="border-l-4 border-[#FF6B6B] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I delete my account?</h3>
                  <p className="text-gray-700">
                    Go to your Account Settings and click "Delete Account." All your data will be permanently removed 
                    within 30 days. You can also email us at{' '}
                    <a href="mailto:privacy@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">
                      privacy@pawthenticate.com
                    </a>
                  </p>
                </div>

                {/* FAQ 5 */}
                <div className="border-l-4 border-[#FFB347] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I export my pet data?</h3>
                  <p className="text-gray-700">
                    Yes! You have the right to export all your pet data. Contact us at{' '}
                    <a href="mailto:privacy@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">
                      privacy@pawthenticate.com
                    </a>{' '}
                    and we'll send you a complete export within 48 hours.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div className="border-l-4 border-[#8F6548] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">I found a bug. How do I report it?</h3>
                  <p className="text-gray-700">
                    Thank you for helping us improve! Email us at{' '}
                    <a href="mailto:support@pawthenticate.com" className="text-[#FF6B6B] hover:text-[#FFB347]">
                      support@pawthenticate.com
                    </a>{' '}
                    with details about the issue and we'll investigate immediately.
                  </p>
                </div>

                {/* FAQ 7 */}
                <div className="border-l-4 border-[#FF6B6B] pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my pet's data secure?</h3>
                  <p className="text-gray-700">
                    Yes! We use industry-standard encryption and security practices. Your data is stored securely, 
                    and only you can access your pet profiles. Read our{' '}
                    <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFB347]">
                      Privacy Policy
                    </Link>{' '}
                    for more details.
                  </p>
                </div>
              </div>
            </section>

            {/* Response Time */}
            <section className="mt-12 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFB347]/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-3">📬 Response Times</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>General inquiries:</strong> Within 48 hours</li>
                <li><strong>Technical support:</strong> Within 24 hours</li>
                <li><strong>Privacy requests:</strong> Within 48 hours</li>
                <li><strong>Critical bugs:</strong> Within 12 hours</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                * Response times are estimates. We typically respond much faster, but these are our maximum timeframes.
              </p>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFB347]">Privacy Policy</Link>
              <span className="text-gray-400">•</span>
              <Link href="/terms" className="text-[#FF6B6B] hover:text-[#FFB347]">Terms of Service</Link>
              <span className="text-gray-400">•</span>
              <Link href="/" className="text-[#FF6B6B] hover:text-[#FFB347]">Home</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

