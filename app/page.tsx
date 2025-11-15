/**
 * Home Page Component - Ultra Modern Redesign
 * 
 * Stunning landing page for Pawthenticate featuring:
 * - Animated hero section with floating elements
 * - Enhanced Before/After comparison with modern design
 * - Interactive feature showcase
 * - Trust signals and social proof
 * - Smooth animations and micro-interactions
 * 
 * Design: Modern, creative, engaging - showcasing the app's awesomeness
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {/* Floating Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 py-4 px-4 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative z-10 w-10 h-10 bg-white rounded-full p-1 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/svg/pawthenticate-icon-only.svg" 
                  alt="Pawthenticate Logo" 
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Pawthenticate</h1>
              <p className="text-xs text-neutral-600 italic">Where your pet's story lives</p>
            </div>
          </div>

          {/* Auth Navigation */}
          <div className="flex items-center gap-3">
            {authLoading ? (
              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-400 transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/account"
                  className="px-4 py-2 text-sm font-medium border-2 border-primary-400 text-primary-400 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-400 transition-colors hidden sm:block"
                >
                  Log In
                </Link>
                <Link 
                  href="/auth/signup"
                  className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 pt-20">
        {/* Ultra Modern Hero Section with Animated Background */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
          </div>

          {/* Floating Paw Prints Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🐾</div>
            <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float animation-delay-1000">🐾</div>
            <div className="absolute bottom-40 left-1/4 text-5xl opacity-10 animate-float animation-delay-2000">🐾</div>
            <div className="absolute bottom-20 right-1/3 text-3xl opacity-10 animate-float animation-delay-3000">🐾</div>
          </div>

          {/* Hero Content */}
          <div className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Floating Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <img 
                    src="/svg/pawthenticate-icon-only.svg" 
                    alt="Pawthenticate" 
                    className="h-24 w-24 sm:h-32 sm:w-32"
                  />
                </div>
              </div>
            </div>

            {/* Main Heading with Gradient Text */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-neutral-900 mb-6 leading-tight">
              Your Pet Deserves a
              <span className="block mt-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent animate-gradient">
                Professional Resume
              </span>
            </h1>

            {/* Subheading with better emphasis */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-700 mb-4 max-w-3xl mx-auto font-medium">
              Stand out in rental applications with a <span className="text-primary-500 font-bold">landlord-ready</span> pet profile
            </p>

            <p className="text-base sm:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
              Create a professional, standardised resume that Australian property managers actually want to see.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/auth/login"
                className="group relative px-10 py-5 text-lg font-bold text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Create Free Resume
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <a 
                href="#before-after"
                className="group px-8 py-5 text-lg font-bold text-neutral-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-neutral-200 hover:border-primary-300"
              >
                See the Difference
                <svg className="inline-block w-5 h-5 ml-2 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Ready in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-2xl">🇦🇺</span>
                <span className="font-semibold">Made for Australia</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-2xl">🐾</span>
                <span className="font-semibold">Professional Results</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Enhanced Before/After Section with Modern Design */}
        <section id="before-after" className="relative bg-gradient-to-br from-[#1F2937] via-[#1a2332] to-[#1F2937] py-16 md:py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Enhanced Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#FFC670]/20 to-[#FF8F8F]/20 backdrop-blur-sm rounded-full border border-[#FFC670]/30">
                <p className="text-xs tracking-[0.3em] uppercase text-[#FFC670] font-bold">
                  Before vs After
                </p>
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                See the <span className="bg-gradient-to-r from-[#FFC670] to-[#FF8F8F] bg-clip-text text-transparent">Difference</span>
                <span className="block mt-2">in One Application</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                From scrappy Word docs to a polished, <span className="text-[#FFC670] font-semibold">landlord-ready</span> pet resume in minutes.
              </p>
            </div>

            {/* Enhanced Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Before Card - Enhanced with more drama */}
              <div className="group relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 rounded-3xl blur-xl transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-[#191F2E] to-[#0f1419] border border-red-500/20 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/60 transform hover:scale-[1.02] transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-3">
                    😩 The Old Way
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    Before Pawthenticate
                  </h3>
                  <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                    Every rental application feels like starting from scratch.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-gray-200 font-medium">Scrappy Word docs</p>
                        <p className="text-sm text-gray-400 mt-1">Inconsistent formatting and unprofessional appearance</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-gray-200 font-medium">Forgot vet records</p>
                        <p className="text-sm text-gray-400 mt-1">Missing important documentation every time</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-gray-200 font-medium">Different info every time</p>
                        <p className="text-sm text-gray-400 mt-1">No consistency across applications</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-red-500/20">
                    <p className="text-sm text-gray-400 italic flex items-center gap-2">
                      <span className="text-xl">😰</span>
                      Feels messy and inconsistent.
                    </p>
                  </div>
                </div>
              </div>

              {/* After Card - Enhanced with success vibes */}
              <div className="group relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFC670]/20 to-[#FF8F8F]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow"></div>
                
                <div className="relative bg-gradient-to-br from-[#3B4667] via-[#2d3651] to-[#3B4667] border-2 border-[#FFC670]/40 rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#FFC670]/20 transform hover:scale-[1.02] hover:border-[#FFC670]/60 transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FFC670] to-[#FF8F8F] text-[#1F2937] px-6 py-2 rounded-full text-sm font-bold shadow-xl transform -rotate-3">
                    ✨ The New Way
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    After Pawthenticate
                  </h3>
                  <p className="text-base md:text-lg text-gray-100 mb-6 leading-relaxed">
                    You send one clean, consistent pet resume that works <span className="text-[#FFC670] font-bold">everywhere</span>.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFC670]/30 flex items-center justify-center animate-pulse-slow">
                        <svg className="w-5 h-5 text-[#FFC670]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-white font-bold">One reusable pet profile</p>
                        <p className="text-sm text-gray-300 mt-1">Create once, use forever across all applications</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF8F8F]/30 flex items-center justify-center animate-pulse-slow animation-delay-1000">
                        <svg className="w-5 h-5 text-[#FF8F8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-white font-bold">2-click PDF downloads</p>
                        <p className="text-sm text-gray-300 mt-1">Instant professional PDFs ready to send</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start group/item">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFC670]/30 flex items-center justify-center animate-pulse-slow animation-delay-2000">
                        <svg className="w-5 h-5 text-[#FFC670]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base md:text-lg text-white font-bold">Looks like a pro designed it</p>
                        <p className="text-sm text-gray-300 mt-1">Beautiful, modern design that impresses</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#FFC670]/20">
                    <p className="text-sm text-gray-200 font-medium flex items-center gap-2">
                      <span className="text-xl">🎉</span>
                      Landlords remember your pet for the <span className="text-[#FFC670] font-bold">right reasons</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tagline with Visual Emphasis */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-[#FFC670]/10 to-[#FF8F8F]/10 backdrop-blur-sm px-8 py-6 rounded-2xl border border-[#FFC670]/20">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  Landlords want <span className="text-[#FFC670] font-black text-2xl md:text-3xl">clarity</span>. 
                  <br className="sm:hidden" />
                  <span className="mx-2">•</span>
                  You give them <span className="text-[#FF8F8F] font-black text-2xl md:text-3xl">confidence</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Feature Showcase */}
        <section className="relative bg-gradient-to-b from-white via-gray-50 to-white px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
                <p className="text-xs tracking-[0.3em] uppercase text-primary-600 font-bold">
                  How It Works
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-4">
                Three Simple Steps to
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Pet Resume Success
                </span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
                No design skills needed. No complicated software. Just a beautiful result.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-primary-200">
                  {/* Step Number */}
                  <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    1
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Fill the Form</h3>
                  <p className="text-base text-neutral-600 text-center leading-relaxed">
                    Answer simple questions about your pet. We guide you through exactly what landlords want to know.
                  </p>
                  
                  {/* Feature Details */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Smart guided questions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Takes 5 minutes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Mobile-friendly</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-secondary-200">
                  {/* Step Number */}
                  <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    2
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <svg className="w-10 h-10 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Preview & Perfect</h3>
                  <p className="text-base text-neutral-600 text-center leading-relaxed">
                    See your professional resume in real-time. Make edits until it's perfect, right from your browser.
                  </p>
                  
                  {/* Feature Details */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Live preview</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Easy editing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Professional design</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-primary-200">
                  {/* Step Number */}
                  <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    3
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 text-center">Download & Send</h3>
                  <p className="text-base text-neutral-600 text-center leading-relaxed">
                    Get your professional PDF instantly. Print it, email it, or attach it to rental applications.
                  </p>
                  
                  {/* Feature Details */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Instant PDF download</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Print-optimized</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Reuse anytime</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section - Enhanced */}
        <section className="relative bg-gray-50 px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
          
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-white rounded-full shadow-md">
                <p className="text-xs tracking-[0.3em] uppercase text-primary-600 font-bold">
                  Complete Package
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-4">
                Everything Landlords
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Want to See
                </span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Your pet resume includes all the essential information that property managers look for.
              </p>
            </div>

            {/* Enhanced Grid with Icons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: '🐕', title: 'Pet Basics', desc: 'Name, species, breed, age, size, weight' },
                { icon: '💉', title: 'Health Records', desc: 'Vaccinations, desexing, medical info' },
                { icon: '🏷️', title: 'Registration', desc: 'Microchip & council registration details' },
                { icon: '🛡️', title: 'Insurance', desc: 'Pet insurance coverage information' },
                { icon: '😊', title: 'Temperament', desc: 'Behaviour, personality, training level' },
                { icon: '🏠', title: 'Living Situation', desc: 'Indoor/outdoor, noise level, habits' },
                { icon: '🚽', title: 'House Training', desc: 'Toilet training and cleanliness status' },
                { icon: '📎', title: 'Documents', desc: 'Vet certificates & supporting docs' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gray-100 hover:border-primary-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {item.desc}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Stats Section */}
        <section className="relative bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 px-4 sm:px-6 py-16 md:py-20 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center mb-12">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-black text-white mb-2">
                  🎯
                </div>
                <div className="text-xl md:text-2xl font-bold text-white/90 mb-2">
                  Easy to Use
                </div>
                <div className="text-base text-white/80">
                  Simple, intuitive interface
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-black text-white mb-2">
                  5 min
                </div>
                <div className="text-xl md:text-2xl font-bold text-white/90 mb-2">
                  Average Time
                </div>
                <div className="text-base text-white/80">
                  From start to professional PDF
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl md:text-6xl font-black text-white mb-2">
                  🇦🇺
                </div>
                <div className="text-xl md:text-2xl font-bold text-white/90 mb-2">
                  Made for Australia
                </div>
                <div className="text-base text-white/80">
                  Designed for Aussie rental market
                </div>
              </div>
            </div>

            {/* Trust Message */}
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="text-4xl mb-4">🐾</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Built by Pet Owners, for Pet Owners
              </h3>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We know the struggle of finding pet-friendly rentals in Australia. 
                That's why we created a tool that makes <span className="font-bold">your pet look as amazing as they are</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="relative bg-white px-4 sm:px-6 py-20 md:py-28 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-300 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* CTA Badge */}
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full border-2 border-primary-200">
              <p className="text-sm font-bold text-primary-600">
                ⚡ Get Started Today
              </p>
            </div>

            {/* Main CTA Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6 leading-tight">
              Ready to Impress
              <span className="block mt-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent">
                Your Next Landlord?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-neutral-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of pet owners creating professional resumes. 
              <span className="block mt-2 font-semibold text-primary-600">Start for free in under 5 minutes.</span>
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link 
                href="/auth/login"
                className="group relative px-12 py-6 text-xl font-black text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <span>Create Your Pet Resume</span>
                  <svg className="w-7 h-7 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-600">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Professional Results</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Easy to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Ready in Minutes</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-white rounded-full p-1 shadow-md">
                  <img 
                    src="/svg/pawthenticate-icon-only.svg" 
                    alt="Pawthenticate" 
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Pawthenticate
                </div>
                <div className="text-xs text-gray-400 italic">
                  Where your pet's story lives
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base text-gray-400 max-w-md mb-6">
              Helping Australian renters and their pets find homes with professional, landlord-ready pet resumes.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <Link href="/auth/login" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                Create Resume
              </Link>
              <a href="#before-after" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                See Examples
              </a>
              <Link href="/auth/signup" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                Sign Up
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>© 2025 Pawthenticate</span>
                <span>•</span>
                <span>V1 MVP</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>for pet owners in Australia</span>
                <span className="ml-1">🇦🇺</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

