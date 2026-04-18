import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  output: 'export',
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
