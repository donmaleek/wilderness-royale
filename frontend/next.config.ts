// next.config.js
import type { NextConfig } from 'next'
import { Configuration } from 'webpack'

/** 
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: './',
  images: {
    unoptimized: true,
  },
  webpack: (
    config: Configuration, 
    { isServer }: { isServer: boolean }
  ) => {
    if (!isServer) {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      }
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 
}

module.exports = nextConfig