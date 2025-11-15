/**
 * Coming Soon Page - Temporary Landing
 * 
 * Shows coming soon message with MailerLite waitlist
 */

import Script from 'next/script';
import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC] relative overflow-hidden flex items-center justify-center p-5">
        {/* Animated background shapes */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#FF6B6B] rounded-full opacity-15 animate-float" />
        <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#FFB347] rounded-full opacity-15 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[50%] right-[10%] w-[150px] h-[150px] bg-[#8F6548] rounded-full opacity-15 animate-float" style={{ animationDelay: '6s' }} />

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-[800px] bg-white rounded-[30px] shadow-[0_20px_60px_rgba(255,107,107,0.15)] p-10 sm:p-[60px_40px] text-center">
          {/* Full Logo */}
          <div className="mb-10">
            <Image
              src="/svg/pawthenticate-logo-complete.svg"
              alt="Pawthenticate - Where your pet's story lives"
              width={450}
              height={150}
              className="w-full max-w-[450px] h-auto mx-auto"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F2937] mb-5 leading-tight">
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-[#8F6548] mb-8 font-normal italic">
            🐾 Something paw-some is on the way!
          </p>

          {/* Description */}
          <p className="text-lg text-[#6B7280] leading-relaxed mb-10">
            We&apos;re working hard to bring you an amazing experience where your pet&apos;s story comes to life. 
            Create beautiful, professional resumes for your furry friends that showcase their unique personality, 
            skills, and adventures.
          </p>

          {/* Paw Print Divider */}
          <div className="flex justify-center gap-8 mt-10 mb-10">
            {[0, 1, 2].map((i) => (
              <svg key={i} className="w-10 h-10 opacity-30 animate-heartbeat" style={{ animationDelay: `${i * 0.3}s` }} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 25)">
                  <ellipse cx="0" cy="0" rx="8" ry="7" fill={i === 0 ? '#FF6B6B' : i === 1 ? '#FFB347' : '#8F6548'} />
                  <circle cx="-6" cy="-9" r="4" fill={i === 0 ? '#FFB347' : i === 1 ? '#FF6B6B' : '#A0826D'} />
                  <circle cx="6" cy="-9" r="4" fill={i === 0 ? '#FFB347' : i === 1 ? '#FF6B6B' : '#A0826D'} />
                  <circle cx="0" cy="-13" r="4.5" fill={i === 0 ? '#FF6B6B' : i === 1 ? '#FFB347' : '#8F6548'} />
                </g>
              </svg>
            ))}
          </div>

          {/* MailerLite Form */}
          <div id="mlb2-33378216" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-33378216">
            <div className="ml-form-align-center">
              <div className="ml-form-embedWrapper embedForm">
                <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
                  <div className="ml-form-embedContent">
                    <h4>🐾 Get Early Access!</h4>
                    <p>Be the first to know when Pawthenticate launches. Join our waitlist!</p>
                  </div>
                  <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/subscribe" data-code="" method="post" target="_blank">
                    <div className="ml-form-formContent horozintalForm">
                      <div className="ml-form-horizontalRow">
                        <div className="ml-input-horizontal">
                          <div style={{ width: '100%' }} className="horizontal-fields">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input type="email" className="form-control" data-inputmask="" name="fields[email]" placeholder="Email address" autoComplete="email" />
                            </div>
                          </div>
                        </div>
                        <div className="ml-button-horizontal primary">
                          <button type="submit" className="primary">Notify Me! 🚀</button>
                          <button disabled style={{ display: 'none' }} type="button" className="loading">
                            <div className="ml-form-embedSubmitLoad"></div>
                            <span className="sr-only">Loading...</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="ml-form-checkboxRow ml-validate-required">
                      <label className="checkbox">
                        <input type="checkbox" />
                        <div className="label-description">
                          <p>I agree to receive occasional email updates about Pawthenticate. No spam, ever. 🐾</p>
                        </div>
                      </label>
                    </div>
                    <input type="hidden" name="ml-submit" value="1" />
                    <div className="ml-mobileButton-horizontal">
                      <button type="submit" className="primary">Notify Me! 🚀</button>
                      <button disabled style={{ display: 'none' }} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                    <input type="hidden" name="anticsrf" value="true" />
                  </form>
                </div>
                <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                  <div className="ml-form-successContent">
                    <h4>Thank you! 🎉</h4>
                    <p>You have successfully joined our waitlist. We&apos;ll notify you as soon as we launch!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-[#F9FAFB]">
            <p className="text-[#6B7280] mb-3">Want to be notified when we launch?</p>
            <a
              href="mailto:hello@pawthenticate.com"
              className="text-[#FF6B6B] hover:text-[#FFB347] no-underline font-bold text-lg transition-colors duration-300"
            >
              hello@pawthenticate.com
            </a>
          </div>
        </div>
      </div>

      {/* MailerLite JavaScript */}
      <Script id="mailerlite-script" strategy="afterInteractive" src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" />
      <Script id="mailerlite-fetch-script" strategy="afterInteractive">
        {`
          function ml_webform_success_33378216() {
            var $ = ml_jQuery || jQuery;
            $('.ml-subscribe-form-33378216 .row-success').show();
            $('.ml-subscribe-form-33378216 .row-form').hide();
          }
          fetch("https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/takel");
        `}
      </Script>
    </>
  );
}

 * Coming Soon Page - Temporary Landing
 * 
 * Shows coming soon message with MailerLite waitlist
 */

import Script from 'next/script';
import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC] relative overflow-hidden flex items-center justify-center p-5">
        {/* Animated background shapes */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#FF6B6B] rounded-full opacity-15 animate-float" />
        <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#FFB347] rounded-full opacity-15 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[50%] right-[10%] w-[150px] h-[150px] bg-[#8F6548] rounded-full opacity-15 animate-float" style={{ animationDelay: '6s' }} />

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-[800px] bg-white rounded-[30px] shadow-[0_20px_60px_rgba(255,107,107,0.15)] p-10 sm:p-[60px_40px] text-center">
          {/* Full Logo */}
          <div className="mb-10">
            <Image
              src="/svg/pawthenticate-logo-complete.svg"
              alt="Pawthenticate - Where your pet's story lives"
              width={450}
              height={150}
              className="w-full max-w-[450px] h-auto mx-auto"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F2937] mb-5 leading-tight">
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-[#8F6548] mb-8 font-normal italic">
            🐾 Something paw-some is on the way!
          </p>

          {/* Description */}
          <p className="text-lg text-[#6B7280] leading-relaxed mb-10">
            We&apos;re working hard to bring you an amazing experience where your pet&apos;s story comes to life. 
            Create beautiful, professional resumes for your furry friends that showcase their unique personality, 
            skills, and adventures.
          </p>

          {/* Paw Print Divider */}
          <div className="flex justify-center gap-8 mt-10 mb-10">
            {[0, 1, 2].map((i) => (
              <svg key={i} className="w-10 h-10 opacity-30 animate-heartbeat" style={{ animationDelay: `${i * 0.3}s` }} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(20, 25)">
                  <ellipse cx="0" cy="0" rx="8" ry="7" fill={i === 0 ? '#FF6B6B' : i === 1 ? '#FFB347' : '#8F6548'} />
                  <circle cx="-6" cy="-9" r="4" fill={i === 0 ? '#FFB347' : i === 1 ? '#FF6B6B' : '#A0826D'} />
                  <circle cx="6" cy="-9" r="4" fill={i === 0 ? '#FFB347' : i === 1 ? '#FF6B6B' : '#A0826D'} />
                  <circle cx="0" cy="-13" r="4.5" fill={i === 0 ? '#FF6B6B' : i === 1 ? '#FFB347' : '#8F6548'} />
                </g>
              </svg>
            ))}
          </div>

          {/* MailerLite Form */}
          <div id="mlb2-33378216" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-33378216">
            <div className="ml-form-align-center">
              <div className="ml-form-embedWrapper embedForm">
                <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
                  <div className="ml-form-embedContent">
                    <h4>🐾 Get Early Access!</h4>
                    <p>Be the first to know when Pawthenticate launches. Join our waitlist!</p>
                  </div>
                  <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/subscribe" data-code="" method="post" target="_blank">
                    <div className="ml-form-formContent horozintalForm">
                      <div className="ml-form-horizontalRow">
                        <div className="ml-input-horizontal">
                          <div style={{ width: '100%' }} className="horizontal-fields">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input type="email" className="form-control" data-inputmask="" name="fields[email]" placeholder="Email address" autoComplete="email" />
                            </div>
                          </div>
                        </div>
                        <div className="ml-button-horizontal primary">
                          <button type="submit" className="primary">Notify Me! 🚀</button>
                          <button disabled style={{ display: 'none' }} type="button" className="loading">
                            <div className="ml-form-embedSubmitLoad"></div>
                            <span className="sr-only">Loading...</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="ml-form-checkboxRow ml-validate-required">
                      <label className="checkbox">
                        <input type="checkbox" />
                        <div className="label-description">
                          <p>I agree to receive occasional email updates about Pawthenticate. No spam, ever. 🐾</p>
                        </div>
                      </label>
                    </div>
                    <input type="hidden" name="ml-submit" value="1" />
                    <div className="ml-mobileButton-horizontal">
                      <button type="submit" className="primary">Notify Me! 🚀</button>
                      <button disabled style={{ display: 'none' }} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                    <input type="hidden" name="anticsrf" value="true" />
                  </form>
                </div>
                <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                  <div className="ml-form-successContent">
                    <h4>Thank you! 🎉</h4>
                    <p>You have successfully joined our waitlist. We&apos;ll notify you as soon as we launch!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t-2 border-[#F9FAFB]">
            <p className="text-[#6B7280] mb-3">Want to be notified when we launch?</p>
            <a
              href="mailto:hello@pawthenticate.com"
              className="text-[#FF6B6B] hover:text-[#FFB347] no-underline font-bold text-lg transition-colors duration-300"
            >
              hello@pawthenticate.com
            </a>
          </div>
        </div>
      </div>

      {/* MailerLite JavaScript */}
      <Script id="mailerlite-script" strategy="afterInteractive" src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" />
      <Script id="mailerlite-fetch-script" strategy="afterInteractive">
        {`
          function ml_webform_success_33378216() {
            var $ = ml_jQuery || jQuery;
            $('.ml-subscribe-form-33378216 .row-success').show();
            $('.ml-subscribe-form-33378216 .row-form').hide();
          }
          fetch("https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/takel");
        `}
      </Script>
    </>
  );
}

