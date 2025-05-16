import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Critical for static export
  distDir: 'build',  // Matches your existing build directory
  images: {
    unoptimized: true  // Required for static export
  }
};

export default nextConfig;