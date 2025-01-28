/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
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
