// next.config.js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: './',
  experimental: {
    // appDir: true,  // Remove this as it's now stable
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (
    config: any,
    { isServer }: { isServer: boolean }
  ) => {
    if (!isServer) {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false
      }
    }
    return config
  }
}

export default nextConfig