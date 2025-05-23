/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generate a fully static site
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
