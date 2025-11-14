/**
 * PostCSS Configuration
 * 
 * PostCSS processes CSS files and applies Tailwind CSS transformations.
 * Required for Tailwind to work properly with Next.js.
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

