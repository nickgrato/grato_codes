/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  async rewrites() {
    return [
      {
        source: '/', // Proxy all API requests
        destination: 'http://127.0.0.1:3111', // Adjust the URL and path as needed
      },
      // Add more rewrites as needed for different paths or endpoints
    ]
  },
}

module.exports = nextConfig
