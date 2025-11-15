/**
 * Coming Soon Page with MailerLite Waitlist
 * 
 * Main landing page while the full site is under construction.
 * Includes email subscription form for early access notifications.
 */

'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

export default function ComingSoonPage() {
  useEffect(() => {
    // Ensure MailerLite scripts load properly
    if (typeof window !== 'undefined') {
      const trackingScript = document.createElement('script');
      trackingScript.innerHTML = `
        fetch("https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/takel")
      `;
      document.body.appendChild(trackingScript);
    }
  }, []);

  return (
    <>
      <Script 
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" 
        strategy="afterInteractive"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] via-[#FFE8CC] to-[#FFF0DC] relative overflow-hidden flex items-center justify-center p-5">
        {/* Animated background shapes */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#FF6B6B] rounded-full opacity-15 animate-float" />
        <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#FFB347] rounded-full opacity-15 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[50%] right-[10%] w-[150px] h-[150px] bg-[#8F6548] rounded-full opacity-15 animate-float" style={{ animationDelay: '6s' }} />

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-[800px] bg-white rounded-[30px] shadow-[0_20px_60px_rgba(255,107,107,0.15)] p-10 sm:p-[60px_40px] text-center">
          {/* Logo Container */}
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
          <div 
            id="mlb2-33378216" 
            className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-33378216"
            dangerouslySetInnerHTML={{
              __html: `
                <div class="ml-form-align-center">
                  <div class="ml-form-embedWrapper embedForm">
                    <div class="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
                      <div class="ml-form-embedContent">
                        <h4>🐾 Get Early Access!</h4>
                        <p>Be the first to know when Pawthenticate launches. Join our waitlist!</p>
                      </div>
                      
                      <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/subscribe" data-code="" method="post" target="_blank">
                        <div class="ml-form-formContent horozintalForm">
                          <div class="ml-form-horizontalRow">
                            <div class="ml-input-horizontal">
                              <div style="width: 100%;" class="horizontal-fields">
                                <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                  <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email address" autocomplete="email">
                                </div>
                              </div>
                            </div>
                            
                            <div class="ml-button-horizontal primary">
                              <button type="submit" class="primary">Notify Me! 🚀</button>
                              <button disabled="disabled" style="display: none;" type="button" class="loading">
                                <div class="ml-form-embedSubmitLoad"></div>
                                <span class="sr-only">Loading...</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div class="ml-form-checkboxRow ml-validate-required">
                          <label class="checkbox">
                            <input type="checkbox">
                            <div class="label-description">
                              <p>I agree to receive occasional email updates about Pawthenticate. No spam, ever. 🐾</p>
                            </div>
                          </label>
                        </div>
                        
                        <input type="hidden" name="ml-submit" value="1">
                        
                        <div class="ml-mobileButton-horizontal">
                          <button type="submit" class="primary">Notify Me! 🚀</button>
                          <button disabled="disabled" style="display: none;" type="button" class="loading">
                            <div class="ml-form-embedSubmitLoad"></div>
                            <span class="sr-only">Loading...</span>
                          </button>
                        </div>
                        <input type="hidden" name="anticsrf" value="true">
                      </form>
                    </div>
                    
                    <div class="ml-form-successBody row-success" style="display: none">
                      <div class="ml-form-successContent">
                        <h4>Thank you! 🎉</h4>
                        <p>You have successfully joined our waitlist. We'll notify you as soon as we launch!</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <script>
                  function ml_webform_success_33378216() {
                    var $ = ml_jQuery || jQuery;
                    $('.ml-subscribe-form-33378216 .row-success').show();
                    $('.ml-subscribe-form-33378216 .row-form').hide();
                  }
                </script>
              `
            }}
          />

          {/* Footer */}
          <div className="mt-10 pt-8 border-t-2 border-[#F9FAFB]">
            <p className="text-[#6B7280] mb-3">Have questions or want to get in touch?</p>
            <a 
              href="mailto:hello@pawthenticate.com" 
              className="text-[#FF6B6B] hover:text-[#FFB347] no-underline font-bold text-lg transition-colors duration-300"
            >
              hello@pawthenticate.com
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-30px, 30px) scale(0.95);
            }
          }
          
          @keyframes heartbeat {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-5px) scale(1.1);
            }
          }
          
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
          
          .animate-heartbeat {
            animation: heartbeat 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
