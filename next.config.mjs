/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'sb-auth-token',
          }
        ]
      },
      {
        source: '/profile',
        destination: '/',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'sb-auth-token',
          }
        ]
      }
    ]
  }
}

export default nextConfig
