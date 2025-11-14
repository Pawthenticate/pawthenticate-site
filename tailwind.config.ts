/**
 * Tailwind CSS Configuration
 * 
 * This file configures Tailwind CSS with custom colors from the Pawthenticate brand palette.
 * Colors are organized by purpose: primary (coral), secondary (orange), accent (brown), 
 * neutral (dark grays), and background (light grays).
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (Coral/Red) - used for main CTAs and important elements
        primary: {
          50: '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFA8A8',
          300: '#FF8F8F',
          400: '#FF6B6B', // Base
          500: '#E05C5C',
          600: '#B84B4B',
          700: '#8A3838',
          800: '#5C2525',
          900: '#2E1212',
        },
        // Secondary colors (Orange) - used for accents and highlights
        secondary: {
          50: '#FFF9F0',
          100: '#FFF0DD',
          200: '#FFD699',
          300: '#FFC670',
          400: '#FFB347', // Base
          500: '#E09E3E',
          600: '#B76F2B',
          700: '#8A5320',
          800: '#5C3715',
          900: '#2E1B0A',
        },
        // Accent colors (Brown) - used for subtle emphasis
        accent: {
          50: '#FAF8F6',
          100: '#F5F0EC',
          200: '#C0916A',
          300: '#A37568',
          400: '#8F6548', // Base
          500: '#734F3E',
          600: '#5A3E2F',
          700: '#432F23',
          800: '#2D1F17',
          900: '#16100C',
        },
        // Neutral colors (Dark) - used for text and dark UI elements
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#3B4667',
          800: '#2A3450',
          900: '#1F2937', // Base
          950: '#191F2E',
        },
        // Background colors - used for page backgrounds
        background: {
          50: '#FFFFFF',
          100: '#FCFCFD',
          200: '#F9FAFB', // Base
          300: '#F2F4F7',
          400: '#E5E7EB',
        },
      },
      fontFamily: {
        display: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

