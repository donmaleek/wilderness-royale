/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static HTML export

  assetPrefix: './', // Ensures static assets are referenced correctly in export

  trailingSlash: true, // Optional: for consistent URL structures like /about/

  experimental: {
    appDir: true,       // Enables the /app directory if you're using it
    optimizeCss: true,  // Recommended when using Tailwind for CSS optimization
  },
};

module.exports = nextConfig;
