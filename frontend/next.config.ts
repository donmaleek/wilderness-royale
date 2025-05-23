
module.exports = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '/',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
  }
}