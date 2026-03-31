import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ci.encar.com',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
}

export default withPayload(nextConfig)
