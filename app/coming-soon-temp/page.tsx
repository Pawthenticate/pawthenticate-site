'use client';

import Script from 'next/script';

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
@import url("https://assets.mlcdn.com/fonts.css?version=1762785");

/* ===== RESET & BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 50%, #fff0dc 100%);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ===== ANIMATIONS ===== */
@keyframes float {
  0%,
  100% {
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
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.1);
  }
}

/* ===== BACKGROUND SHAPES ===== */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s ease-in-out infinite;
}

.bg-shape-1 {
  top: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: #ff6b6b;
}

.bg-shape-2 {
  bottom: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: #ffb347;
  animation-delay: 3s;
}

.bg-shape-3 {
  top: 50%;
  right: 10%;
  width: 150px;
  height: 150px;
  background: #8f6548;
  animation-delay: 6s;
}

/* ===== MAIN CONTAINER ===== */
.container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.main-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(255, 107, 107, 0.15);
  padding: 60px 40px;
  text-align: center;
}

/* ===== LOGO ===== */
.logo-container {
  margin-bottom: 40px;
}

.logo-container img {
  max-width: 800px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}

/* ===== TYPOGRAPHY ===== */
h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffb347 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.75rem;
  color: #8f6548;
  margin-bottom: 30px;
  font-style: italic;
  font-weight: 400;
}

.description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.8;
  margin-bottom: 40px;
}

/* ===== PAW DIVIDER ===== */
.paw-divider {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
}

.paw-icon {
  width: 40px;
  height: 40px;
  opacity: 0.3;
  animation: heartbeat 2s ease-in-out infinite;
}

.paw-icon:nth-child(2) {
  animation-delay: 0.3s;
}

.paw-icon:nth-child(3) {
  animation-delay: 0.6s;
}

/* ===== MAILERLITE FORM STYLES (from your HTML) ===== */
.ml-form-embedSubmitLoad {
  display: inline-block;
  width: 20px;
  height: 20px;
}

.g-recaptcha {
  transform: scale(1);
  -webkit-transform: scale(1);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

.ml-form-embedSubmitLoad:after {
  content: " ";
  display: block;
  width: 11px;
  height: 11px;
  margin: 1px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-color: #ffffff #ffffff #ffffff transparent;
  animation: ml-form-embedSubmitLoad 1.2s linear infinite;
}

@keyframes ml-form-embedSubmitLoad {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#mlb2-33378216.ml-form-embedContainer {
  box-sizing: border-box;
  display: table;
  margin: 0 auto;
  position: static;
  width: 100% !important;
}

#mlb2-33378216.ml-form-embedContainer h4,
#mlb2-33378216.ml-form-embedContainer p,
#mlb2-33378216.ml-form-embedContainer span,
#mlb2-33378216.ml-form-embedContainer button {
  text-transform: none !important;
  letter-spacing: normal !important;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper {
  background-color: #FFF5E6;
  border-width: 0px;
  border-color: transparent;
  border-radius: 40px;
  border-style: solid;
  box-sizing: border-box;
  display: inline-block !important;
  margin: 0;
  padding: 0;
  position: relative;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedDefault {
  width: 700px;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedForm {
  max-width: 700px;
  width: 100%;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-align-left { text-align: left; }
#mlb2-33378216.ml-form-embedContainer .ml-form-align-center { text-align: center; }
#mlb2-33378216.ml-form-embedContainer .ml-form-align-default {
  display: table-cell !important;
  vertical-align: middle !important;
  text-align: center !important;
}
#mlb2-33378216.ml-form-embedContainer .ml-form-align-right { text-align: right; }

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
  padding: 20px 20px 0 20px;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
  padding-bottom: 0;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
  text-align: left;
  margin: 0 0 20px 0;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
  color: #1F2937;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-align: center;
  word-break: break-word;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
  color: #4B5563;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 0 10px 0;
  text-align: center;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
  text-align: left!important;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
  margin-bottom: 5px;
  color: #4B5563;
  font-size: 12px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-weight: normal;
  display: inline-block;
  line-height: 18px;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
  margin: 0;
  width: 100%;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
  margin: 0 0 20px 0;
  width: 100%;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
  float: left;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
  margin: 0;
  padding: 0 0 20px 0;
  width: 100%;
  height: auto;
  float: left;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
  margin: 0 0 10px 0;
  width: 100%;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
  margin: 0;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
  background-color: #ffffff !important;
  color: #1F2937 !important;
  border-color: #FFE0C0;
  border-radius: 25px !important;
  border-style: solid !important;
  border-width: 1px !important;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px !important;
  height: auto;
  line-height: 21px !important;
  margin-bottom: 0;
  margin-top: 0;
  padding: 10px 10px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  max-width: 100% !important;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow {
  height: auto;
  width: 100%;
  float: left;
}

.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal {
  width: 70%;
  float: left;
}

.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal {
  width: 30%;
  float: left;
}

.ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn {
  padding-top: 23px;
}

.ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields {
  box-sizing: border-box;
  float: left;
  padding-right: 10px;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
  background-color: #ffffff;
  color: #1F2937;
  border-color: #FFE0C0;
  border-radius: 25px;
  border-style: solid;
  border-width: 1px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0;
  margin-top: 0;
  padding: 10px 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: initial;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
  background-color: #FFB347 !important;
  border-color: #FFB347;
  border-style: solid;
  border-width: 1px;
  border-radius: 25px;
  box-shadow: none;
  color: #ffffff !important;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px !important;
  font-weight: 700;
  line-height: 20px;
  margin: 0 !important;
  padding: 10px !important;
  width: 100%;
  height: auto;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
  background-color: #FF6B6B !important;
  border-color: #FF6B6B !important;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin-top: 5px;
  margin-left: -1.5rem;
  overflow: visible;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description {
  color: #000000;
  display: block;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-align: left;
  margin-bottom: 0;
  position: relative;
  vertical-align: top;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label {
  font-weight: normal;
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
  min-height: 24px;
  padding-left: 24px;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label a {
  color: #000000;
  text-decoration: underline;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p {
  color: #000000 !important;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
  font-size: 12px !important;
  font-weight: normal !important;
  line-height: 18px !important;
  padding: 0 !important;
  margin: 0 5px 0 0 !important;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
  margin: 0 0 20px 0;
  float: left;
  width: 100%;
}

#mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
  background-color: #FFB347 !important;
  border: none !important;
  border-radius: 25px !important;
  box-shadow: none !important;
  color: #ffffff !important;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 21px !important;
  height: auto;
  padding: 10px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.ml-mobileButton-horizontal { display: none; }

#mlb2-33378216 .ml-mobileButton-horizontal button {
  background-color: #FFB347 !important;
  border-color: #FFB347 !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-radius: 25px !important;
  box-shadow: none !important;
  color: #ffffff !important;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  padding: 10px !important;
  width: 100% !important;
}

@media only screen and (max-width: 700px) {
  #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
    padding: 0 0 10px 0 !important;
  }
  .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup {
    width: 100%!important;
  }
  .ml-form-formContent.horozintalForm { float: left!important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow { height: auto!important; width: 100%!important; float: left!important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 100%!important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-right: 0px!important; padding-bottom: 10px; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { width: 100%!important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn { padding-top: 0px!important; }
  .ml-hide-horizontal { display: none !important; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { display: none!important; }
  .ml-mobileButton-horizontal { display: inline-block !important; margin-bottom: 20px;width:100%; }
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-bottom: 0px !important; }
}

@media only screen and (max-width: 700px) {
  .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields {
    margin-bottom: 10px !important;
    width: 100% !important;
  }
}

/* ===== FOOTER ===== */
.footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 2px solid #f9fafb;
}

.footer p {
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.footer a {
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #ffb347;
}

/* ===== RESPONSIVE (non-form layout) ===== */
@media (max-width: 768px) {
  .main-card {
    padding: 40px 25px;
  }
  h1 {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.35rem;
  }
  .description {
    font-size: 1rem;
  }
  .logo-container img {
    max-width: 400px;
  }
  .paw-divider {
    gap: 20px;
  }
  .paw-icon {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .main-card {
    padding: 30px 20px;
  }
  h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1.1rem;
  }
  .logo-container img {
    max-width: 350px;
  }
}
`;

export default function ComingSoonPage() {
  return (
    <>
      {/* Global CSS (no styled-jsx) */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Background shapes */}
      <div className="bg-shape bg-shape-1" />
      <div className="bg-shape bg-shape-2" />
      <div className="bg-shape bg-shape-3" />

      {/* Main content */}
      <div className="container">
        <div className="main-card">
          {/* Logo */}
          <div className="logo-container">
            <img
              src="/svg/pawthenticate-logo-complete.svg"
              alt="Pawthenticate - Where your pet's story lives"
            />
          </div>

          <h1>Coming Soon</h1>
          <p className="subtitle">🐾 Something paw-some is on the way!</p>
          <p className="description">
            We&apos;re working hard to bring you an amazing experience where your pet&apos;s story
            comes to life. Create beautiful, professional resumes for your furry friends that
            showcase their unique personality, skills, and adventures.
          </p>

          {/* Paw divider */}
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

          {/* MailerLite form (HTML kept the same as your snippet) */}
          <div
            id="mlb2-33378216"
            className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-33378216"
          >
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
                    target="_blank"
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
                          <button type="submit" className="primary">
                            Notify Me! 🚀
                          </button>
                          <button
                            disabled
                            style={{ display: 'none' }}
                            type="button"
                            className="loading"
                          >
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
                          <p>
                            I agree to receive occasional email updates about Pawthenticate. No spam,
                            ever. 🐾
                          </p>
                        </div>
                      </label>
                    </div>

                    <input type="hidden" name="ml-submit" value="1" />

                    <div className="ml-mobileButton-horizontal">
                      <button type="submit" className="primary">
                        Notify Me! 🚀
                      </button>
                      <button
                        disabled
                        style={{ display: 'none' }}
                        type="button"
                        className="loading"
                      >
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>

                    <input type="hidden" name="anticsrf" value="true" />
                  </form>
                </div>

                <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                  <div className="ml-form-successContent">
                    <h4>Thank you!</h4>
                    <p>You have successfully joined our subscriber list.</p>
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

      {/* MailerLite scripts – embed version only */}
      <Script
        id="mailerlite-webforms"
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
        strategy="afterInteractive"
      />
      <Script id="mailerlite-inline" strategy="afterInteractive">
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
