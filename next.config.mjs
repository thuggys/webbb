/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
