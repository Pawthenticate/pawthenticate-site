'use client';

import React from 'react';
import Script from 'next/script';
import './coming_soon.css';

export default function Page() {
  return (
    <>
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>

      {/* Main Container */}
      <div className="container">
        <div className="main-card">
          {/* Logo */}
          <div className="logo-container">
            <img src="/svg/pawthenticate-logo-complete.svg" alt="Pawthenticate - Where your pet's story lives" />
          </div>

          {/* Main Heading */}
          <h1>Coming Soon</h1>

          {/* Subtitle */}
          <p className="subtitle">🐾 Something paw-some is on the way!</p>

          {/* Description */}
          <p className="description">
            We're working hard to bring you an amazing experience where your pet's story comes to life.
            Create beautiful, professional resumes for your furry friends that showcase their unique personality,
            skills, and adventures.
          </p>

          {/* Paw Divider */}
          <div className="paw-divider">
            <svg className="paw-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(20, 25)">
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="#FF6B6B" />
                <circle cx="-6" cy="-9" r="4" fill="#FFB347" />
                <circle cx="6" cy="-9" r="4" fill="#FFB347" />
                <circle cx="0" cy="-13" r="4.5" fill="#FF6B6B" />
              </g>
            </svg>
            <svg className="paw-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(20, 25)">
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="#FFB347" />
                <circle cx="-6" cy="-9" r="4" fill="#FF6B6B" />
                <circle cx="6" cy="-9" r="4" fill="#FF6B6B" />
                <circle cx="0" cy="-13" r="4.5" fill="#FFB347" />
              </g>
            </svg>
            <svg className="paw-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(20, 25)">
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="#8F6548" />
                <circle cx="-6" cy="-9" r="4" fill="#A0826D" />
                <circle cx="6" cy="-9" r="4" fill="#A0826D" />
                <circle cx="0" cy="-13" r="4.5" fill="#8F6548" />
              </g>
            </svg>
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

                  <form
                    className="ml-block-form"
                    action="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/subscribe"
                    data-code=""
                    method="post"
                  >
                    <div className="ml-form-formContent horozintalForm">
                      <div className="ml-form-horizontalRow">
                        <div className="ml-input-horizontal">
                          <div style={{ width: '100%' }} className="horizontal-fields">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input
                                type="email"
                                className="form-control"
                                data-inputmask=""
                                name="fields[email]"
                                placeholder="Email address"
                                autoComplete="email"
                              />
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
                    <p>You have successfully joined our waitlist. We'll notify you as soon as we launch!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Have questions or want to get in touch?</p>
            <a href="mailto:hello@pawthenticate.com">hello@pawthenticate.com</a>
          </div>
        </div>
      </div>

      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            (window as any).ml_webform_success_33378216 = function () {
              const $ = (window as any).ml_jQuery || (window as any).jQuery;
              if ($) {
                $('.ml-subscribe-form-33378216 .row-success').show();
                $('.ml-subscribe-form-33378216 .row-form').hide();
              }
            };
          }
        }}
      />

      <Script
        src="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/takel"
        strategy="afterInteractive"
      />
    </>
  );
}
