module.exports = {
  output: 'export',
  // Add this experimental config:
  experimental: {
    appDir: true,
    // If using Tailwind:
    optimizeCss: true, 
  },
  // Ensure static assets are properly referenced:
  assetPrefix: './',
}